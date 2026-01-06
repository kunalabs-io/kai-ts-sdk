import { PhantomTypeArgument } from '../gen/_framework/reified'
import { CoinInfo, SUI } from '../coin-info'
import { Amount } from '../amount'
import Decimal from 'decimal.js'
import { PriceCache } from 'price-cache'

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
