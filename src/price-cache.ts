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

export class PriceCache {
  private cache: LRUCache<string, PriceCacheEntry>
  private _afRouter?: AfRouterAdapter
  private _cetusRouter?: CetusAggregatorAdapter
  private pending: Map<string, Promise<Price<PhantomTypeArgument, PhantomTypeArgument>>>

  constructor(
    private readonly ttlSecs: number,
    private readonly priceProvider: PriceProvider = 'af'
  ) {
    this.cache = new LRUCache({
      max: 100000, // Adjust this value based on your needs
      ttl: this.ttlSecs * 1000,
      ttlAutopurge: true,
    })
    this.pending = new Map()
  }

  private get afRouter(): AfRouterAdapter {
    if (!this._afRouter) this._afRouter = new AfRouterAdapter()
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

    // Otherwise, fetch and cache
    const promise = (async () => {
      const price = await this.getPrice(tokenX, tokenY)
      this.cache.set(cacheKey, { price })
      return price
    })().finally(() => {
      this.pending.delete(cacheKey)
    }) as Promise<Price<X, Y>>

    this.pending.set(cacheKey, promise)
    return promise
  }

  private async getPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    x: CoinInfo<X>,
    y: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    if (this.priceProvider === 'af') {
      return this.getPriceAf(x, y)
    } else if (this.priceProvider === 'cetus') {
      return this.getPriceCetus(x, y)
    } else if (this.priceProvider === '7k') {
      return this.getPrice7k(x, y)
    } else {
      throw new Error(`Invalid price provider: ${this.priceProvider}`)
    }
  }

  private async getPriceAf<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    x: CoinInfo<X>,
    y: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    const amountIn = 10n ** BigInt(y.decimals) * 100n
    return this.afRouter.getPrice({ X: x, Y: y, amountIn, xToY: false })
  }

  private async getPriceCetus<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    x: CoinInfo<X>,
    y: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    const amountIn = 10n ** BigInt(y.decimals) * 100n
    return this.cetusRouter.getPrice({ X: x, Y: y, amountIn, xToY: false })
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
