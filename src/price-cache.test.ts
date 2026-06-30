import { describe, it, expect, vi } from 'vitest'
import { PriceCache, PriceFallbackEvent } from './price-cache'
import { COIN_INFO_MAP } from './coin-info'
import { compressSuiType } from './gen/_framework/util'
import { Price } from './price'

const SUI = COIN_INFO_MAP.get(compressSuiType('0x2::sui::SUI'))!
const USDC = COIN_INFO_MAP.get(
  compressSuiType('0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC')
)!

const priceVal = (v: number) => Price.fromHuman(SUI, USDC, v)
type Px = ReturnType<typeof priceVal>

// Mock the per-provider dispatch so the fallback logic is tested without any network.
const mockProvider = (cache: PriceCache, fn: (provider: string) => Promise<Px>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vi.spyOn(cache as any, 'getPriceFromProvider').mockImplementation((p: any) => fn(p))

describe('PriceCache provider fallback', () => {
  it('falls back af → cetus when af throws', async () => {
    const events: PriceFallbackEvent[] = []
    const cache = new PriceCache(60, { providerTimeoutMs: 50, onFallback: e => events.push(e) })
    mockProvider(cache, p =>
      p === 'af' ? Promise.reject(new Error('af down')) : Promise.resolve(priceVal(0.75))
    )
    const price = await cache.get(SUI, USDC)
    expect(price.human.toNumber()).toBeCloseTo(0.75)
    expect(events).toContainEqual(
      expect.objectContaining({ kind: 'provider-failed', provider: 'af', reason: 'error' })
    )
  })

  it('treats a hanging provider as a timeout failure and advances', async () => {
    const events: PriceFallbackEvent[] = []
    const cache = new PriceCache(60, { providerTimeoutMs: 50, onFallback: e => events.push(e) })
    mockProvider(cache, p =>
      p === 'af' ? new Promise<Px>(() => {}) : Promise.resolve(priceVal(0.75))
    )
    const price = await cache.get(SUI, USDC)
    expect(price.human.toNumber()).toBeCloseTo(0.75)
    expect(events).toContainEqual(expect.objectContaining({ provider: 'af', reason: 'timeout' }))
  })

  it('treats a degenerate (<= 0) price as a failure and advances', async () => {
    const cache = new PriceCache(60, { providerTimeoutMs: 50 })
    mockProvider(cache, p => Promise.resolve(p === 'af' ? priceVal(0) : priceVal(0.75)))
    const price = await cache.get(SUI, USDC)
    expect(price.human.toNumber()).toBeCloseTo(0.75)
  })

  it('serves last-known-good when all providers fail, within maxStaleMs', async () => {
    const events: PriceFallbackEvent[] = []
    const cache = new PriceCache(60, {
      providerTimeoutMs: 50,
      maxStaleMs: 60_000,
      onFallback: e => events.push(e),
    })
    const spy = mockProvider(cache, p =>
      p === 'af' ? Promise.resolve(priceVal(0.8)) : Promise.reject(new Error('x'))
    )
    await cache.get(SUI, USDC) // success → populates last-known-good
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(cache as any).cache.clear() // simulate TTL expiry; lastGood (separate map) is retained
    spy.mockImplementation(() => Promise.reject(new Error('all down')))
    const price = await cache.get(SUI, USDC)
    expect(price.human.toNumber()).toBeCloseTo(0.8)
    expect(events).toContainEqual(expect.objectContaining({ kind: 'served-stale' }))
  })

  it('throws when all providers fail and there is no fresh-enough cached price', async () => {
    const cache = new PriceCache(60, { providerTimeoutMs: 50 })
    mockProvider(cache, () => Promise.reject(new Error('all down')))
    await expect(cache.get(SUI, USDC)).rejects.toThrow(/All price providers/)
  })

  it('opens the breaker after N consecutive failures and stops calling the provider', async () => {
    const events: PriceFallbackEvent[] = []
    const cache = new PriceCache(60, {
      providerTimeoutMs: 50,
      breakerThreshold: 2,
      breakerCooldownMs: 60_000,
      onFallback: e => events.push(e),
    })
    const calls: string[] = []
    mockProvider(cache, p => {
      calls.push(p)
      return p === 'af' ? Promise.reject(new Error('af down')) : Promise.resolve(priceVal(0.75))
    })
    for (let i = 0; i < 3; i++) {
      await cache.get(SUI, USDC)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(cache as any).cache.clear() // simulate TTL expiry so the chain re-runs
    }
    // af is tried only until the breaker opens (threshold 2), then skipped; cetus serves all 3.
    expect(calls.filter(p => p === 'af')).toHaveLength(2)
    expect(calls.filter(p => p === 'cetus')).toHaveLength(3)
    expect(events).toContainEqual(
      expect.objectContaining({ kind: 'breaker-opened', provider: 'af' })
    )
  })

  it('half-opens after cooldown, probes the provider, and closes on success', async () => {
    const events: PriceFallbackEvent[] = []
    const cache = new PriceCache(60, {
      providerTimeoutMs: 50,
      breakerThreshold: 1,
      breakerCooldownMs: 20,
      onFallback: e => events.push(e),
    })
    let afHealthy = false
    mockProvider(cache, p => {
      if (p === 'af')
        return afHealthy ? Promise.resolve(priceVal(0.9)) : Promise.reject(new Error('af down'))
      return Promise.resolve(priceVal(0.75))
    })
    await cache.get(SUI, USDC) // af fails → breaker opens; cetus serves
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(cache as any).cache.clear()
    afHealthy = true
    await new Promise(r => setTimeout(r, 35)) // wait out the 20ms cooldown
    const price = await cache.get(SUI, USDC) // half-open probe hits af again
    expect(price.human.toNumber()).toBeCloseTo(0.9) // af served
    expect(events).toContainEqual(
      expect.objectContaining({ kind: 'breaker-closed', provider: 'af' })
    )
  })
})
