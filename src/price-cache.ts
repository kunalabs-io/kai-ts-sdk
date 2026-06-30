import { PhantomTypeArgument } from './gen/_framework/reified'
import { compressSuiType } from './gen/_framework/util'

import { LRUCache } from 'lru-cache'
import { normalizeStructTag } from '@mysten/sui/utils'
import { AfRouterAdapter } from './router'
import { CetusAggregatorAdapter } from './router/cetus'
import { AggregatorClient as CetusAggregatorClient } from '@cetusprotocol/aggregator-sdk'
import Decimal from 'decimal.js'
import { Price } from './price'
import { CoinInfo } from './coin-info'

const SEVK_PRICES_API = 'https://lp-pro-api.7k.ag/price'

export interface PriceCacheEntry {
  price: Price<PhantomTypeArgument, PhantomTypeArgument>
}

export type PriceProvider = 'af' | 'cetus' | '7k'

/** Why a provider was skipped during fallback. */
export type PriceFallbackReason = 'error' | 'timeout' | 'degenerate'

/** Emitted on each fallback transition so callers can log / meter provider health. */
export type PriceFallbackEvent =
  | {
      kind: 'provider-failed'
      pair: string
      provider: PriceProvider
      reason: PriceFallbackReason
      error?: unknown
    }
  | { kind: 'breaker-opened'; provider: PriceProvider; cooldownMs: number }
  | { kind: 'breaker-closed'; provider: PriceProvider }
  | { kind: 'served-stale'; pair: string; ageMs: number }
  | { kind: 'exhausted'; pair: string }

export interface PriceCacheOptions {
  /**
   * Ordered provider fallback chain — each is tried until one returns a finite,
   * positive price. Default: ['af', 'cetus'] (Aftermath then Cetus router; both real,
   * executable, price-equivalent quotes on independent infra). Switched off the 7k
   * price API, which mispriced suiUSDT ~1% off peg and intermittently failed. See
   * plans/price-service-cache-rework.md.
   */
  providers?: PriceProvider[]
  /** Per-provider call timeout (ms); a slower call is treated as a failure and the next provider tried. Default 3000. */
  providerTimeoutMs?: number
  /** On total provider failure, serve the last-known-good price for the pair if no older than this (ms), else throw. Default 10 min. */
  maxStaleMs?: number
  /** Consecutive failures before a provider's circuit breaker opens (it's then skipped until cooldown). Default 3. */
  breakerThreshold?: number
  /** How long a provider's breaker stays open before a half-open probe retries it (ms). Default 30s. */
  breakerCooldownMs?: number
  /** Invoked on each fallback transition (also always `console.warn`'d). Wire to OTEL/alerts at the service layer. */
  onFallback?: (event: PriceFallbackEvent) => void
}

const DEFAULT_PROVIDERS: PriceProvider[] = ['af', 'cetus']
const DEFAULT_PROVIDER_TIMEOUT_MS = 3000
const DEFAULT_MAX_STALE_MS = 10 * 60 * 1000
const DEFAULT_BREAKER_THRESHOLD = 3
const DEFAULT_BREAKER_COOLDOWN_MS = 30 * 1000

class TimeoutError extends Error {}

export class PriceCache {
  private cache: LRUCache<string, PriceCacheEntry>
  private _afRouter?: AfRouterAdapter
  private _cetusRouter?: CetusAggregatorAdapter
  private pending: Map<string, Promise<Price<PhantomTypeArgument, PhantomTypeArgument>>>
  /** Last successful price per pair, retained past the serve-TTL to back stale-serve on total provider failure. */
  private lastGood: Map<
    string,
    { price: Price<PhantomTypeArgument, PhantomTypeArgument>; fetchedAt: number }
  >
  /** Per-provider circuit-breaker state (provider-global, not per-pair). */
  private breakers: Map<PriceProvider, { failures: number; openUntil: number }>

  private readonly providers: PriceProvider[]
  private readonly providerTimeoutMs: number
  private readonly maxStaleMs: number
  private readonly breakerThreshold: number
  private readonly breakerCooldownMs: number
  private readonly onFallback?: (event: PriceFallbackEvent) => void

  constructor(
    private readonly ttlSecs: number,
    opts: PriceCacheOptions = {}
  ) {
    this.providers = opts.providers ?? DEFAULT_PROVIDERS
    this.providerTimeoutMs = opts.providerTimeoutMs ?? DEFAULT_PROVIDER_TIMEOUT_MS
    this.maxStaleMs = opts.maxStaleMs ?? DEFAULT_MAX_STALE_MS
    this.breakerThreshold = opts.breakerThreshold ?? DEFAULT_BREAKER_THRESHOLD
    this.breakerCooldownMs = opts.breakerCooldownMs ?? DEFAULT_BREAKER_COOLDOWN_MS
    this.onFallback = opts.onFallback
    this.cache = new LRUCache({
      max: 100000, // Adjust this value based on your needs
      ttl: this.ttlSecs * 1000,
      ttlAutopurge: true,
    })
    this.pending = new Map()
    this.lastGood = new Map()
    this.breakers = new Map()
  }

  private async getAfRouter(): Promise<AfRouterAdapter> {
    if (!this._afRouter) this._afRouter = await AfRouterAdapter.create()
    return this._afRouter
  }

  private get cetusRouter(): CetusAggregatorAdapter {
    if (!this._cetusRouter)
      this._cetusRouter = new CetusAggregatorAdapter(new CetusAggregatorClient({}))
    return this._cetusRouter
  }

  async get<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    tokenX: CoinInfo<X>,
    tokenY: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    const cached = this.getCachedPrice(tokenX, tokenY)
    if (cached) {
      return cached
    }

    return this.getFreshPrice(tokenX, tokenY)
  }

  getCachedPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    tokenX: CoinInfo<X>,
    tokenY: CoinInfo<Y>
  ): Price<X, Y> | undefined {
    const cacheKey = `${compressSuiType(tokenX.typeName)}-${compressSuiType(tokenY.typeName)}`
    let entry = this.cache.get(cacheKey)

    if (!entry) {
      const inverseCacheKey = `${compressSuiType(tokenY.typeName)}-${compressSuiType(tokenX.typeName)}`
      const inverseEntry = this.cache.get(inverseCacheKey)
      if (inverseEntry) {
        entry = { price: inverseEntry.price.inverted() }
      } else {
        return undefined
      }
    }

    return entry.price as Price<X, Y>
  }

  async getFreshPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    tokenX: CoinInfo<X>,
    tokenY: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    const cacheKey = `${compressSuiType(tokenX.typeName)}-${compressSuiType(tokenY.typeName)}`

    // Check if a request is already pending for this key
    if (this.pending.has(cacheKey)) {
      const price = await this.pending.get(cacheKey)!
      return price as Price<X, Y>
    }

    // Check if a request is already pending for the inverse key
    const inverseCacheKey = `${compressSuiType(tokenY.typeName)}-${compressSuiType(tokenX.typeName)}`
    if (this.pending.has(inverseCacheKey)) {
      const inversePrice = await this.pending.get(inverseCacheKey)!
      return inversePrice.inverted() as Price<X, Y>
    }

    // Otherwise, run the provider fallback chain and cache the result. Stale-served
    // prices are cached too (for one TTL) so we don't re-run the whole chain on every
    // request during an outage; lastGood (and thus the staleness cap) is only advanced
    // on a genuine fresh fetch, inside getPriceWithFallback.
    const promise = (async () => {
      const price = await this.getPriceWithFallback(tokenX, tokenY, cacheKey, inverseCacheKey)
      this.cache.set(cacheKey, { price })
      return price
    })().finally(() => {
      this.pending.delete(cacheKey)
    }) as Promise<Price<X, Y>>

    this.pending.set(cacheKey, promise)
    return promise
  }

  /**
   * Run the provider chain for a pair, advancing on failure/timeout/degenerate value.
   * On total failure, serve the last-known-good price if it's within `maxStaleMs`, else throw.
   */
  private async getPriceWithFallback<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    x: CoinInfo<X>,
    y: CoinInfo<Y>,
    cacheKey: string,
    inverseCacheKey: string
  ): Promise<Price<X, Y>> {
    for (const provider of this.providers) {
      // Circuit breaker: skip a provider that's been failing until its cooldown
      // elapses; the first attempt after cooldown is a half-open probe. This bounds
      // the timeout cost during an extended outage to ~one probe per cooldown,
      // instead of paying it on every request.
      if (Date.now() < this.getBreaker(provider).openUntil) {
        continue
      }
      try {
        const price = await this.withTimeout(this.getPriceFromProvider(provider, x, y))
        if (!price.numeric.isFinite() || price.numeric.lte(0)) {
          this.recordFailure(provider, cacheKey, 'degenerate')
          continue
        }
        this.recordSuccess(provider)
        this.lastGood.set(cacheKey, { price, fetchedAt: Date.now() })
        return price
      } catch (e) {
        const reason: PriceFallbackReason = e instanceof TimeoutError ? 'timeout' : 'error'
        this.recordFailure(provider, cacheKey, reason, e)
      }
    }

    // Every provider failed — serve the last-known-good price if it's fresh enough.
    const stale = this.getLastGood<X, Y>(cacheKey, inverseCacheKey)
    if (stale) {
      const ageMs = Date.now() - stale.fetchedAt
      if (ageMs <= this.maxStaleMs) {
        this.emitFallback({ kind: 'served-stale', pair: cacheKey, ageMs })
        return stale.price
      }
    }
    this.emitFallback({ kind: 'exhausted', pair: cacheKey })
    throw new Error(
      `All price providers [${this.providers.join(', ')}] failed for ${cacheKey} and no cached price within ${this.maxStaleMs}ms`
    )
  }

  private getPriceFromProvider<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    provider: PriceProvider,
    x: CoinInfo<X>,
    y: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    switch (provider) {
      case 'af':
        return this.getPriceAf(x, y)
      case 'cetus':
        return this.getPriceCetus(x, y)
      case '7k':
        return this.getPrice7k(x, y)
      default:
        throw new Error(`Invalid price provider: ${provider}`)
    }
  }

  /** Race a provider call against the per-provider timeout; a timeout rejects with TimeoutError. */
  private async withTimeout<T>(p: Promise<T>): Promise<T> {
    // Swallow a late rejection from a timed-out call to avoid an unhandled rejection.
    p.catch(() => {})
    let timer: ReturnType<typeof setTimeout> | undefined
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () =>
          reject(new TimeoutError(`price provider timed out after ${this.providerTimeoutMs}ms`)),
        this.providerTimeoutMs
      )
    })
    try {
      return await Promise.race([p, timeout])
    } finally {
      if (timer) clearTimeout(timer)
    }
  }

  private getLastGood<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    cacheKey: string,
    inverseCacheKey: string
  ): { price: Price<X, Y>; fetchedAt: number } | undefined {
    const direct = this.lastGood.get(cacheKey)
    if (direct) return direct as { price: Price<X, Y>; fetchedAt: number }
    const inverse = this.lastGood.get(inverseCacheKey)
    if (inverse)
      return { price: inverse.price.inverted() as Price<X, Y>, fetchedAt: inverse.fetchedAt }
    return undefined
  }

  private emitFallback(event: PriceFallbackEvent): void {
    console.warn(
      '[PriceCache] price fallback',
      JSON.stringify(event, (k, v) => (k === 'error' ? ((v as Error)?.message ?? v) : v))
    )
    this.onFallback?.(event)
  }

  private getBreaker(provider: PriceProvider): { failures: number; openUntil: number } {
    let b = this.breakers.get(provider)
    if (!b) {
      b = { failures: 0, openUntil: 0 }
      this.breakers.set(provider, b)
    }
    return b
  }

  /** Reset a provider's breaker on success; emit breaker-closed if it had been open. */
  private recordSuccess(provider: PriceProvider): void {
    const b = this.getBreaker(provider)
    const wasOpen = b.openUntil > 0
    b.failures = 0
    b.openUntil = 0
    if (wasOpen) this.emitFallback({ kind: 'breaker-closed', provider })
  }

  /** Record a provider failure; open its breaker once consecutive failures hit the threshold. */
  private recordFailure(
    provider: PriceProvider,
    pair: string,
    reason: PriceFallbackReason,
    error?: unknown
  ): void {
    this.emitFallback({ kind: 'provider-failed', pair, provider, reason, error })
    const b = this.getBreaker(provider)
    b.failures += 1
    if (b.failures >= this.breakerThreshold) {
      b.openUntil = Date.now() + this.breakerCooldownMs
      this.emitFallback({ kind: 'breaker-opened', provider, cooldownMs: this.breakerCooldownMs })
    }
  }

  private async getPriceAf<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    x: CoinInfo<X>,
    y: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    const amountIn = 10n ** BigInt(y.decimals) * 100n
    const afRouter = await this.getAfRouter()
    return afRouter.getPrice({ X: x, Y: y, amountIn, xToY: false })
  }

  private async getPriceCetus<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    x: CoinInfo<X>,
    y: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    const amountIn = 10n ** BigInt(y.decimals) * 100n
    const cetusRouter = this.cetusRouter
    return cetusRouter.getPrice({ X: x, Y: y, amountIn, xToY: false })
  }

  private async getPrice7k<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    x: CoinInfo<X>,
    y: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    const typeX = normalizeStructTag(x.typeName)
    const typeY = normalizeStructTag(y.typeName)
    const timestamp = Math.floor(Date.now() / 1000).toString()

    const response = await fetch(`${SEVK_PRICES_API}/prices/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp, token_ids: [typeX, typeY] }),
    })

    if (!response.ok) {
      throw new Error(`7k price API returned status ${response.status}`)
    }

    const results = (await response.json()) as { token_id: string; price: number }[]
    const priceMap = new Map(results.map(r => [r.token_id, r.price]))

    const priceX = priceMap.get(typeX)
    const priceY = priceMap.get(typeY)

    if (priceX == null || priceY == null) {
      throw new Error(`7k price not found for X: "${x.typeName}" or Y: "${y.typeName}"`)
    }

    return Price.fromHuman(x, y, new Decimal(priceX).div(priceY))
  }
}
