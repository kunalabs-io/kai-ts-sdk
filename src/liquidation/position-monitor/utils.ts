import { Position } from '../../lp/position'
import { PhantomTypeArgument, TypeArgument } from '../../gen/_framework/reified'
import { SupplyPool } from '../../lp/supply-pool'
import { CoinInfo } from '../../coin-info'
import { Price } from '../../price'
import { PositionConfig } from '../../lp/config'
import { PriceFeed, SuiPriceServiceConnection } from '@pythnetwork/pyth-sui-js'
import { PYTH_STATE_ID } from '../pyth'
import { State } from '../../gen/pyth/state/structs'
import { SuiClient } from '@mysten/sui/client'
import { Decimal } from 'decimal.js'
import { normalizeSuiAddress } from '@mysten/sui/utils'
import { Amount } from '../../amount'
import { OracleService } from '../../oracle'

export interface PriceFeedUpdateInfo {
  feedIds: string[]
  priceInfoObjectIds: string[]
  priceFeeds: PriceFeed[]
  priceFeedsUpdateData: Buffer[]
  baseUpdateFee: bigint
}

export interface PositionInfo {
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  config: PositionConfig<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  marginLevel: Decimal
  assetValue: Decimal | undefined
  supplyPoolX: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  supplyPoolY: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
}

export interface FilterResult {
  positionsToProcess: Map<string, PositionInfo>
  liquidateSkippedLowAssetValueIds: Set<string>
  deleverageSkippedLowAssetValueIds: Set<string>
  nothingToDeleverageIds: Set<string>
  skipListIds: Set<string>
  liquidateAddedIds: Set<string>
  deleverageAddedIds: Set<string>
}

interface CalcPositionMarginLevelParams {
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  supplyPoolX: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  supplyPoolY: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  allPriceFeeds: PriceFeed[]
}

export function isPositionActive(
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
): boolean {
  return (
    position.debtSharesX > 0n ||
    position.debtSharesY > 0n ||
    position.lpLiquidity > 0n ||
    position.colX.int > 0n ||
    position.colY.int > 0n
  )
}

export async function getPriceFeedUpdateInfo(
  positions: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>[],
  pythConnection: SuiPriceServiceConnection,
  client: SuiClient
): Promise<PriceFeedUpdateInfo> {
  const needPriceFeedSet = new Set<string>()
  const priceFeedToPioMap = new Map<string, string>()

  for (const position of positions) {
    needPriceFeedSet.add(position.configInfo.pioInfoX.priceFeedId)
    needPriceFeedSet.add(position.configInfo.pioInfoY.priceFeedId)
    priceFeedToPioMap.set(
      position.configInfo.pioInfoX.priceFeedId,
      position.configInfo.pioInfoX.priceInfoObjectId
    )
    priceFeedToPioMap.set(
      position.configInfo.pioInfoY.priceFeedId,
      position.configInfo.pioInfoY.priceInfoObjectId
    )
  }

  const priceFeedIds = Array.from(needPriceFeedSet)
  const priceInfoObjectIds = priceFeedIds.map(pf => priceFeedToPioMap.get(pf)!)

  const [priceFeedsRes, priceFeedsUpdateData, pythStateRes] = await Promise.all([
    pythConnection.getLatestPriceFeeds(priceFeedIds),
    pythConnection.getPriceFeedsUpdateData(priceFeedIds),
    client.getObject({
      id: PYTH_STATE_ID,
      options: { showBcs: true },
    }),
  ])

  if (priceFeedsRes === undefined) {
    throw new Error('Pyth price feeds response is undefined')
  }

  if (pythStateRes.error || !pythStateRes.data) {
    throw new Error(`Failed to get pyth state: ${pythStateRes.error}`)
  }

  const pythBaseUpdateFee = State.fromSuiObjectData(pythStateRes.data).baseUpdateFee

  return {
    feedIds: priceFeedIds,
    priceFeeds: priceFeedsRes,
    priceFeedsUpdateData,
    priceInfoObjectIds,
    baseUpdateFee: pythBaseUpdateFee,
  }
}

export function filterByLiquidationAndDeleverageNeeded(
  positionInfos: PositionInfo[],
  includeDeleveragePositions: boolean = false,
  minAssetValue: number = 0.01,
  positionSkipList: string[] = []
): FilterResult {
  const positionsToProcess = new Map<string, PositionInfo>()
  const liquidateSkippedLowAssetValueIds = new Set<string>()
  const deleverageSkippedLowAssetValueIds = new Set<string>()
  const nothingToDeleverageIds = new Set<string>()
  const skipListIds = new Set<string>()
  const liquidateAddedIds = new Set<string>()
  const deleverageAddedIds = new Set<string>()

  for (const info of positionInfos) {
    const { position, config, marginLevel, assetValue } = info

    if (positionSkipList.includes(position.id)) {
      skipListIds.add(position.id)
      continue
    }

    if (marginLevel.eq(0)) {
      continue
    }

    if (marginLevel.lt(config.liqMargin)) {
      if (assetValue?.lt(minAssetValue)) {
        liquidateSkippedLowAssetValueIds.add(position.id)
        continue
      }

      positionsToProcess.set(position.id, info)
      liquidateAddedIds.add(position.id)
      continue
    }

    if (includeDeleveragePositions && marginLevel.lt(config.deleverageMargin)) {
      const hasNothingToDeleverage =
        position.lpLiquidity === 0n &&
        ((position.colX.int === 0n && position.colY.int === 0n) ||
          (position.colX.int > 0n && position.debtSharesX === 0n) ||
          (position.colY.int > 0n && position.debtSharesY === 0n))

      if (hasNothingToDeleverage) {
        nothingToDeleverageIds.add(position.id)
        continue
      }

      if (assetValue?.lt(minAssetValue)) {
        deleverageSkippedLowAssetValueIds.add(position.id)
        continue
      }

      positionsToProcess.set(position.id, info)
      deleverageAddedIds.add(position.id)
    }
  }

  return {
    positionsToProcess,
    liquidateSkippedLowAssetValueIds,
    deleverageSkippedLowAssetValueIds,
    nothingToDeleverageIds,
    skipListIds,
    liquidateAddedIds,
    deleverageAddedIds,
  }
}

export function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function priceFromPythFeedPrice<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
>(
  x: {
    feed: PriceFeed
    info: CoinInfo<X>
  },
  y: {
    feed: PriceFeed
    info: CoinInfo<Y>
  }
): Price<X, Y> {
  const getPrice = (feed: PriceFeed) => {
    const price = feed.getPriceUnchecked()
    return new Decimal(price.price).mul(new Decimal(10).pow(price.expo))
  }

  const priceX = getPrice(x.feed)
  const priceY = getPrice(y.feed)

  return Price.fromHuman(x.info, y.info, priceX.div(priceY))
}

export function calcPositionMarginLevel({
  position,
  supplyPoolX,
  supplyPoolY,
  allPriceFeeds,
}: CalcPositionMarginLevelParams): Decimal {
  const feedX = allPriceFeeds.find(
    pf => normalizeSuiAddress(pf.id) === position.configInfo.pioInfoX.priceFeedId
  )
  const feedY = allPriceFeeds.find(
    pf => normalizeSuiAddress(pf.id) === position.configInfo.pioInfoY.priceFeedId
  )
  if (!feedX) {
    throw new Error(`Price feed X for position ${position.id} not found`)
  }
  if (!feedY) {
    throw new Error(`Price feed Y for position ${position.id} not found`)
  }

  const currentPrice = priceFromPythFeedPrice(
    { feed: feedX, info: position.X },
    { feed: feedY, info: position.Y }
  )

  return position.calcMarginLevel({
    currentPrice,
    supplyPoolX,
    supplyPoolY,
    timestampMs: Date.now(),
  })
}

export function calcPositionAssetValue(
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
  allPriceFeeds: PriceFeed[],
  assetValueCoin: CoinInfo<PhantomTypeArgument>,
  prices: {
    x: Price<PhantomTypeArgument, PhantomTypeArgument> | undefined
    y: Price<PhantomTypeArgument, PhantomTypeArgument> | undefined
  }
): Decimal | undefined {
  const feedX = allPriceFeeds.find(
    pf => normalizeSuiAddress(pf.id) === position.configInfo.pioInfoX.priceFeedId
  )
  const feedY = allPriceFeeds.find(
    pf => normalizeSuiAddress(pf.id) === position.configInfo.pioInfoY.priceFeedId
  )
  if (!feedX) {
    throw new Error(`Price feed X for position ${position.id} not found`)
  }
  if (!feedY) {
    throw new Error(`Price feed Y for position ${position.id} not found`)
  }

  const currentPrice = priceFromPythFeedPrice(
    { feed: feedX, info: position.X },
    { feed: feedY, info: position.Y }
  )

  if (!prices.x || !prices.y) {
    return undefined
  }

  const positionAssetValue = position.calcAssetValue({
    poolPrice: currentPrice,
    xPriceT: prices.x,
    yPriceT: prices.y,
  })

  return Amount.fromInt(positionAssetValue, assetValueCoin.decimals).toDecimal()
}

/**
 * Calculates position margin level using OracleService for fresh prices.
 */
export function calcPositionMarginLevelWithOracle(
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
  supplyPoolX: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>,
  supplyPoolY: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>,
  oracleService: OracleService
): Decimal {
  return oracleService.calcMarginLevel(position, supplyPoolX, supplyPoolY)
}

/**
 * Calculates position asset value in USD using OracleService for fresh prices.
 */
export function calcPositionAssetValueWithOracle(
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
  oracleService: OracleService
): Decimal {
  return oracleService.calcAssetValueUsd(position)
}
