import { compressSuiType } from '../gen/_framework/util'

import { LRUCache } from 'lru-cache'
import { PhantomTypeArgument } from '../gen/_framework/reified'
import { Price } from '../price'
import { CoinInfo, SUI } from '../coin-info'
import { normalizeStructTag } from '@mysten/sui/utils'
import { Amount } from '../amount'
import Decimal from 'decimal.js'

interface TokenPrice {
  price: number | null
  lastUpdated: number
}

async function getTokenPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
  x: CoinInfo<X>,
  y: CoinInfo<Y>
): Promise<Price<X, Y>> {
  const typeX = normalizeStructTag(x.typeName)
  const typeY = normalizeStructTag(y.typeName)

  const response = await fetch(`https://prices.7k.ag/price?ids=${typeX}&vsCoin=${typeY}`)
  const prices = (await response.json()) as Record<string, TokenPrice>

  const price = prices?.[typeX]?.price
  if (!price) {
    throw new Error(`error fetching price for X: "${x.typeName}" Y: "${y.typeName}"`)
  }

  return Price.fromHuman(x, y, price)
}

interface PriceCacheEntry {
  price: Price<PhantomTypeArgument, PhantomTypeArgument>
}

export class PriceCache {
  private cache: LRUCache<string, PriceCacheEntry>

  constructor(private readonly ttlSecs: number) {
    this.cache = new LRUCache({
      max: 100000, // Adjust this value based on your needs
      ttl: this.ttlSecs * 1000,
      ttlAutopurge: true,
    })
  }

  async get<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    tokenX: CoinInfo<X>,
    tokenY: CoinInfo<Y>
  ): Promise<Price<X, Y>> {
    const cacheKey = `${compressSuiType(tokenX.typeName)}-${compressSuiType(tokenY.typeName)}`
    let entry = this.cache.get(cacheKey)

    if (!entry) {
      const inverseCacheKey = `${compressSuiType(tokenY.typeName)}-${compressSuiType(tokenX.typeName)}`
      const inverseEntry = this.cache.get(inverseCacheKey)
      if (inverseEntry) {
        entry = { price: inverseEntry.price.inverted() }
      }
    }

    if (!entry) {
      const price = await getTokenPrice(tokenX, tokenY)
      this.cache.set(cacheKey, { price })
      return price
    }

    return entry.price as Price<X, Y>
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
  ): Promise<Price<X, Y> | undefined> {
    const cacheKey = `${compressSuiType(tokenX.typeName)}-${compressSuiType(tokenY.typeName)}`
    const price = await getTokenPrice(tokenX, tokenY)
    if (price) {
      this.cache.set(cacheKey, { price })
      return price
    }

    return undefined
  }
}

const PRICE_CACHE = new PriceCache(60 * 60)

export async function getMinSwapAmount(
  coinInfo: CoinInfo<PhantomTypeArgument>,
  suiThreshold: Amount | bigint = 20000n
) {
  if (typeof suiThreshold !== 'bigint') {
    suiThreshold = suiThreshold.int
  }

  const price = await PRICE_CACHE.get(SUI, coinInfo)
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
