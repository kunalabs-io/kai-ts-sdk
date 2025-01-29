import { SuiClient, SuiObjectData } from '@mysten/sui/client'
import { PhantomTypeArgument } from './gen/_framework/reified'
import { PriceInfoObject as PriceInfoObject_ } from './gen/pyth/price-info/structs'
import { CoinInfo, SUI, suiUSDT, USDC, whUSDCe, whUSDTe } from './coin-info'
import { Price } from './price'
import Decimal from 'decimal.js'

export class PriceFeedInfo<T extends PhantomTypeArgument> {
  readonly priceFeedId: string
  readonly priceInfoObjectId: string
  readonly T: CoinInfo<T>

  constructor(args: { priceFeedId: string; priceInfoObjectId: string; T: CoinInfo<T> }) {
    this.priceFeedId = args.priceFeedId
    this.priceInfoObjectId = args.priceInfoObjectId
    this.T = args.T
  }

  async fetchPioData(client: SuiClient) {
    const data = await PriceInfoObject_.r.fetch(client, this.priceInfoObjectId)
    return new PriceInfoObject(data, this.T)
  }

  pioFromSuiObjectData(data: SuiObjectData) {
    const data_ = PriceInfoObject_.r.fromSuiObjectData(data)
    return new PriceInfoObject(data_, this.T)
  }
}

export class PriceInfoObject<T extends PhantomTypeArgument> {
  constructor(
    public readonly data: PriceInfoObject_,
    public readonly T: CoinInfo<T>
  ) {}
}

export const suiPioInfo = new PriceFeedInfo({
  priceFeedId: '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
  priceInfoObjectId: '0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37',
  T: SUI,
})

export const whUSDCePioInfo = new PriceFeedInfo({
  priceFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
  priceInfoObjectId: '0x5dec622733a204ca27f5a90d8c2fad453cc6665186fd5dff13a83d0b6c9027ab',
  T: whUSDCe,
})

export const whUSDTePioInfo = new PriceFeedInfo({
  priceFeedId: '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
  priceInfoObjectId: '0x985e3db9f93f76ee8bace7c3dd5cc676a096accd5d9e09e9ae0fb6e492b14572',
  T: whUSDTe,
})

export const USDCPioInfo = new PriceFeedInfo({
  priceFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
  priceInfoObjectId: '0x5dec622733a204ca27f5a90d8c2fad453cc6665186fd5dff13a83d0b6c9027ab',
  T: USDC,
})

export const suiUsdtPioInfo = new PriceFeedInfo({
  priceFeedId: '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
  priceInfoObjectId: '0x985e3db9f93f76ee8bace7c3dd5cc676a096accd5d9e09e9ae0fb6e492b14572',
  T: suiUSDT,
})

export function pythPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
  x: PriceInfoObject<X>,
  y: PriceInfoObject<Y>
) {
  const getPrice = (pio: PriceInfoObject<PhantomTypeArgument>) => {
    const price = pio.data.priceInfo.priceFeed.price

    const expo = new Decimal(price.expo.magnitude.toString()).mul(price.expo.negative ? -1 : 1)
    return new Decimal(price.price.magnitude.toString())
      .mul(new Decimal(10).pow(expo))
      .mul(price.price.negative ? -1 : 1)
  }

  const priceX = getPrice(x) // USD / X
  const priceY = getPrice(y) // USD / Y

  return Price.fromHuman(x.T, y.T, priceX.div(priceY))
}
