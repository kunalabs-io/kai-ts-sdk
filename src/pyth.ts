import { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData } from '@mysten/sui/jsonRpc'
import { Transaction, TransactionResult } from '@mysten/sui/transactions'
import { SUI_CLOCK_OBJECT_ID, normalizeSuiAddress } from '@mysten/sui/utils'
import { PhantomTypeArgument } from './gen/_framework/reified'
import { PriceInfoObject as PriceInfoObject_ } from './gen/pyth/price-info/structs'
import * as oraclePrice from './gen/kai-leverage/oracle-price/functions'
import {
  CoinInfo,
  SUI,
  suiUSDT,
  USDC,
  USDY,
  whUSDCe,
  whUSDTe,
  DEEP,
  wBTC,
  LBTC,
  WAL,
  xBTC,
  USDSUI,
} from './coin-info'
import { Price } from './price'
import Decimal from 'decimal.js'

/**
 * Per-coin oracle registry entry for the Pyth Pro price rail.
 *
 * - `priceFeedId` — the Pyth price feed ID (unchanged from the legacy rail;
 *   multiple coins can share one feed, e.g. wBTC/LBTC/xBTC all use the BTC feed).
 * - `priceInfoObjectId` — the Pyth Pro package's `PriceInfoObject` for the feed
 *   (package `0x55300367…`; these are NEW objects, distinct from the legacy
 *   pyth package's PIOs).
 * - `currencyObjectId` — the coin's canonical `Currency<T>` object in the system
 *   coin registry (shared object `0xc`), consumed by `oracle_price::add_currency`.
 *   Registration is permissionless (`coin_registry::migrate_legacy_metadata`),
 *   so every environment — including test ones — is expected to provide it.
 */
export class PriceFeedInfo<T extends PhantomTypeArgument> {
  readonly priceFeedId: string
  readonly priceInfoObjectId: string
  readonly currencyObjectId: string
  readonly T: CoinInfo<T>

  constructor(args: {
    priceFeedId: string
    priceInfoObjectId: string
    currencyObjectId: string
    T: CoinInfo<T>
  }) {
    this.priceFeedId = args.priceFeedId
    this.priceInfoObjectId = args.priceInfoObjectId
    this.currencyObjectId = args.currencyObjectId
    this.T = args.T
  }

  async fetchPioData(client: ClientWithCoreApi): Promise<PriceInfoObject<T>> {
    const data = await PriceInfoObject_.r.fetch(client, this.priceInfoObjectId)
    return new PriceInfoObject(data, this.T)
  }

  pioFromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PriceInfoObject<T> {
    const data_ = PriceInfoObject_.r.fromCoreObject(obj)
    return new PriceInfoObject(data_, this.T)
  }

  /** @deprecated Use {@link PriceFeedInfo.pioFromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  pioFromSuiObjectData(data: SuiObjectData): PriceInfoObject<T> {
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

export const suiPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744',
  priceInfoObjectId: '0x89b2add829cb6fcd017153fff428bc9faec4d06d643ecfc435af5b55a9e987f0',
  currencyObjectId: '0xf256d3fb6a50eaa748d94335b34f2982fbc3b63ceec78cafaa29ebc9ebaf2bbc',
  T: SUI,
})

export const whUSDCePioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
  priceInfoObjectId: '0x6ddfc6f9921e55998cbc2e68f78eba897981d79ac17f66c5277bc38954a2a3f8',
  currencyObjectId: '0xa55995e8ee66630a47fc72f649c86699153a2fe6d8349d38b86f9d72a5918f67',
  T: whUSDCe,
})

export const whUSDTePioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
  priceInfoObjectId: '0x939e666c48cfac89418f69a24cb857263d4c520f90d94ea0770e295b9857961e',
  currencyObjectId: '0xc693c67e0d48b0105bbdcb4bc8390018109ddb98ca928ef4b1a9afc7e4d77b29',
  T: whUSDTe,
})

export const USDCPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
  priceInfoObjectId: '0x6ddfc6f9921e55998cbc2e68f78eba897981d79ac17f66c5277bc38954a2a3f8',
  currencyObjectId: '0x75cfbbf8c962d542e99a1d15731e6069f60a00db895407785b15d14f606f2b4a',
  T: USDC,
})

export const suiUsdtPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
  priceInfoObjectId: '0x939e666c48cfac89418f69a24cb857263d4c520f90d94ea0770e295b9857961e',
  currencyObjectId: '0x26070cbac76990b29efd9a8d0d663bf25f12a530715b5b3dc3b7141657080be8',
  T: suiUSDT,
})

export const USDYPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0xe393449f6aff8a4b6d3e1165a7c9ebec103685f3b41e60db4277b5b6d10e7326',
  priceInfoObjectId: '0xc2510434d7228514383b8ed25aff3f50a7ba58df50345f8fc3b06bf64e4e1397',
  currencyObjectId: '0x81b008387aa52c1a18d3db8e51d1d78d31dbea6295b3cabddbe1fa3c5c00e9c4',
  T: USDY,
})

export const DEEPPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0x29bdd5248234e33bd93d3b81100b5fa32eaa5997843847e2c2cb16d7c6d9f7ff',
  priceInfoObjectId: '0x562957f70afaf8a0870e2959abc3e3f327a8159f803d8c56cff27ac2df260477',
  currencyObjectId: '0x3f2afb7c5f245870a8b8a3808e6dd7042446a0e7504e9d2795372da053858cd9',
  T: DEEP,
})

export const WALPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0xeba0732395fae9dec4bae12e52760b35fc1c5671e2da8b449c9af4efe5d54341',
  priceInfoObjectId: '0xdbea8600eeeb0399df58c28e73b8201ae880a954813131d33bfa6902ccdadd24',
  currencyObjectId: '0xb6a0c0bacb1c87c3be4dff20c22ef1012125b5724b5b0ff424f852a2651b23fa',
  T: WAL,
})

export const wBTCPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  priceInfoObjectId: '0xe64832d1b4c9a75139a7313aee69da891297d8397fda2863b5bdcc4af0b79758',
  currencyObjectId: '0x690aeaa96cf94be7e8ffcab05a3d0a790a476ded18aaadcf02082e5191e5434c',
  T: wBTC,
})

export const LBTCPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  priceInfoObjectId: '0xe64832d1b4c9a75139a7313aee69da891297d8397fda2863b5bdcc4af0b79758',
  currencyObjectId: '0xcace3558c4434fa5402fbe57840e4889c6ae71b79d9b0bd5c42c3b9986b42900',
  T: LBTC,
})

export const xBTCPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  priceInfoObjectId: '0xe64832d1b4c9a75139a7313aee69da891297d8397fda2863b5bdcc4af0b79758',
  currencyObjectId: '0x907bb173bffab7c57bbd3350a633aa32c8770937b496d7d88874087b59200bcc',
  T: xBTC,
})

export const USDSUIPioInfo: PriceFeedInfo<PhantomTypeArgument> = new PriceFeedInfo({
  priceFeedId: '0xd510fcdb3a63f35d3bb118d5db3afc5815a3f13bc55d48abb893b63f0315902a',
  priceInfoObjectId: '0x6896ccc8c08a84e47f0ab8affbd3fce2623a72c76f9092e59f8f6ece450119cd',
  currencyObjectId: '0x535e826a2acddab687c81cb6c6166553b479f61a9023800ec0020baba8d94731',
  T: USDSUI,
})

/**
 * Minimal shape {@link buildPriceCollection} needs per feed — every
 * {@link PriceFeedInfo} satisfies it.
 */
export interface PriceCollectionFeedEntry {
  priceInfoObjectId: string
  currencyObjectId: string
  T: { typeName: string }
}

/**
 * Assemble a rail-agnostic `oracle_price::PriceCollection` for the given feeds:
 * `create(clock)`, then per feed `add_pyth_pro` with its Pyth Pro
 * `PriceInfoObject` and `add_currency` with the coin's registry `Currency<T>`.
 * The returned handle is the `priceInfo` argument the `_v2`/`_v3` kai-leverage
 * entry points take (the old `PythPriceInfo`-taking entry points are deprecated
 * aborts on-chain).
 *
 * Duplicate feeds/coins are fine — `add_pyth_pro` and `add_currency` are
 * idempotent on-chain (relevant for pairs sharing one feed, e.g. LBTC/wBTC).
 */
export function buildPriceCollection(
  tx: Transaction,
  feeds: readonly PriceCollectionFeedEntry[]
): TransactionResult {
  const collection = oraclePrice.create(tx, SUI_CLOCK_OBJECT_ID)
  // The Move-side adds are idempotent, but shared-feed pairs (e.g. wBTC/LBTC
  // both on the BTC feed) would still emit redundant PTB commands — dedupe
  // on both object ids.
  const seenPios = new Set<string>()
  const seenCurrencies = new Set<string>()
  for (const feed of feeds) {
    const pioId = normalizeSuiAddress(feed.priceInfoObjectId)
    if (!seenPios.has(pioId)) {
      seenPios.add(pioId)
      oraclePrice.addPythPro(tx, { self: collection, info: feed.priceInfoObjectId })
    }
    const currencyId = normalizeSuiAddress(feed.currencyObjectId)
    if (!seenCurrencies.has(currencyId)) {
      seenCurrencies.add(currencyId)
      oraclePrice.addCurrency(tx, feed.T.typeName, {
        self: collection,
        currency: feed.currencyObjectId,
      })
    }
  }
  return collection
}

export function getPriceFromPio(pioData: PriceInfoObject_): Decimal {
  const price = pioData.priceInfo.priceFeed.price

  const expo = new Decimal(price.expo.magnitude.toString()).mul(price.expo.negative ? -1 : 1)
  return new Decimal(price.price.magnitude.toString())
    .mul(new Decimal(10).pow(expo))
    .mul(price.price.negative ? -1 : 1)
}

export function pythPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
  x: PriceInfoObject<X>,
  y: PriceInfoObject<Y>
): Price<X, Y> {
  const priceX = getPriceFromPio(x.data) // USD / X
  const priceY = getPriceFromPio(y.data) // USD / Y

  return Price.fromHuman(x.T, y.T, priceX.div(priceY))
}
