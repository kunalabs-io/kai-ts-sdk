import { PhantomTypeArgument } from './gen/_framework/reified'
import { CoinInfo, SUI } from './coin-info'
import { Amount } from './amount'
import { Price } from './price'
import { PriceCache } from './price-cache'
import Decimal from 'decimal.js'

/**
 * A price source returning the price of X in terms of Y. The SDK's active
 * source (see {@link getActivePriceProvider}) backs the swap-sizing helpers
 * below; override it with {@link setActivePriceProvider} — e.g. in hermetic
 * tests where the external aggregators have no quote for a locally-published
 * coin.
 */
export type PriceProviderFn = <X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
  x: CoinInfo<X>,
  y: CoinInfo<Y>
) => Promise<Price<X, Y>>

// Default source: the cached aggregator (Aftermath router; see PriceCache's default
// provider). The cache amortizes external HTTP for the same pair; a custom provider
// set below bypasses it entirely.
const defaultPriceCache = new PriceCache(60 * 60)

function cachedAggregatorPriceProvider<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
>(x: CoinInfo<X>, y: CoinInfo<Y>): Promise<Price<X, Y>> {
  return defaultPriceCache.get(x, y)
}

let activePriceProvider: PriceProviderFn = cachedAggregatorPriceProvider

/**
 * Override the SDK's price source for swap sizing (used by {@link getMinSwapAmount}
 * and the position methods that rely on it). Process-global, mirroring
 * `setActiveProtocolInfra`. The default source is the cached aggregator.
 */
export function setActivePriceProvider(fn: PriceProviderFn): void {
  activePriceProvider = fn
}

/**
 * @returns the active price source (defaults to the cached aggregator).
 */
export function getActivePriceProvider(): PriceProviderFn {
  return activePriceProvider
}

export async function getMinSwapAmount(
  coinInfo: CoinInfo<PhantomTypeArgument>,
  suiThreshold: Amount | bigint = 20000n
): Promise<bigint> {
  if (typeof suiThreshold !== 'bigint') {
    suiThreshold = suiThreshold.int
  }

  const price = await getActivePriceProvider()(SUI, coinInfo)
  const amountOut = BigInt(
    price.numeric.mul(suiThreshold.toString()).toFixed(0, Decimal.ROUND_DOWN)
  )

  return amountOut
}

export async function getMinSwapAmountBatch(
  coinInfos: CoinInfo<PhantomTypeArgument>[],
  suiThreshold: Amount | bigint = 20000n
): Promise<Map<string, bigint>> {
  const ret = new Map<string, bigint>()

  await Promise.all(
    coinInfos.map(async coinInfo => {
      ret.set(coinInfo.typeName, await getMinSwapAmount(coinInfo, suiThreshold))
    })
  )

  return ret
}
