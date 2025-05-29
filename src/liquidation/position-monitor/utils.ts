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
import { Logger } from 'pino'
import { normalizeSuiAddress } from '@mysten/sui/utils'

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
  priceFeedUpdateInfo: PriceFeedUpdateInfo
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
  logger: Logger,
  includeDeleveragePositions: boolean = false
): Map<string, PositionInfo> {
  const positionsToProcess = new Map<string, PositionInfo>()

  for (const info of positionInfos) {
    const { position, config, marginLevel } = info

    if (marginLevel.eq(0)) {
      logger.info(
        `Position ${position.id} margin level is ${marginLevel.toDP(6).toString()}, skipping`
      )
      continue
    }

    if (position.isCetus()) {
      // Skipping position because it is a Cetus position due to incident
      continue
    }

    if (marginLevel.lt(config.liqMargin)) {
      positionsToProcess.set(position.id, info)
      logger.info(
        `Position ${position.id} margin level ${marginLevel.toDP(6).toString()} is below liquidation margin ${config.liqMargin.toDP(6).toString()}, adding to positions to process`
      )
      continue
    }

    if (includeDeleveragePositions && marginLevel.lt(config.deleverageMargin)) {
      const hasNothingToDeleverage =
        position.lpLiquidity === 0n &&
        ((position.colX.int === 0n && position.colY.int === 0n) ||
          (position.colX.int > 0n && position.debtSharesX === 0n) ||
          (position.colY.int > 0n && position.debtSharesY === 0n))

      if (hasNothingToDeleverage) {
        logger.info(
          `Position ${position.id} margin level ${marginLevel.toDP(6).toString()} is below deleverage margin ${config.deleverageMargin.toDP(6).toString()} and above liquidation margin ${config.liqMargin.toDP(6).toString()},
            but there's nothing to deleverage`
        )
        continue
      }

      positionsToProcess.set(position.id, info)
      logger.info(
        `Position ${position.id} margin level ${marginLevel.toDP(6).toString()} is below deleverage margin ${config.deleverageMargin.toDP(6).toString()},
          adding to positions to process`
      )
    }
  }

  return positionsToProcess
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
) {
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
}: CalcPositionMarginLevelParams) {
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
