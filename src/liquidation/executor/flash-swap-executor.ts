import { BaseLiquidationExecutor } from './liquidation-executor'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'
import { TransactionExecutor } from './transaction-executor'
import { ExecutionOutcome } from './types'
import { Position } from '../../lp/position'
import { PhantomTypeArgument, TypeArgument } from '../../gen/_framework/reified'
import { updatePriceFeeds } from '../pyth'
import { buildPriceCollection } from '../../pyth'
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import {
  isDeleverageInfo,
  isLiquidationInfo,
} from '../../gen/kai-leverage/position-core-clmm/structs'
import * as debtInfo from '../../gen/kai-leverage/debt-info/functions'
import { KaiRouterUtil } from '../../router'
import * as balance from '../../gen/sui/balance/functions'
import * as coin from '../../gen/sui/coin/functions'
import * as metrics from '../metrics'
import { Logger } from 'pino'
import Decimal from 'decimal.js'
import { ClientWithCoreApi } from '@mysten/sui/client'
import { PositionInfo } from '../position-monitor/utils'
import { OracleService, OnChainPriceData } from '../../oracle'

interface PriceUpdateNeeded {
  needsUpdate: boolean
  reason?: 'stale_x' | 'stale_y' | 'stale_both' | 'price_divergence'
}

interface PreparedExecution {
  tx: Transaction
  priceInfo: TransactionObjectInput
  streamingMarginLevel: Decimal
  onChainMarginLevel: Decimal
  priceUpdateIncluded: boolean
  logger: Logger
}

const STALENESS_BUFFER_SEC = 10

export interface FlashSwapExecutorOptions {
  skipDryRun?: boolean
}

export class FlashSwapExecutor extends BaseLiquidationExecutor {
  protected readonly oracleService: OracleService
  protected readonly skipDryRun: boolean

  constructor(
    client: ClientWithCoreApi,
    logger: Logger,
    oracleService: OracleService,
    options?: FlashSwapExecutorOptions
  ) {
    super(client, logger)
    this.logger = this.logger.child({ task: 'flash_swap_executor' })
    this.oracleService = oracleService
    this.skipDryRun = options?.skipDryRun ?? false
  }

  protected needsPriceUpdate(
    onChainData: OnChainPriceData,
    streamingBelowThreshold: boolean,
    onChainAboveThreshold: boolean,
    contractMaxAgeSec = 60
  ): PriceUpdateNeeded {
    const threshold = contractMaxAgeSec - STALENESS_BUFFER_SEC

    const xStale = onChainData.stalenessXSec > threshold
    const yStale = onChainData.stalenessYSec > threshold

    if (xStale && yStale) {
      return { needsUpdate: true, reason: 'stale_both' }
    }
    if (xStale) {
      return { needsUpdate: true, reason: 'stale_x' }
    }
    if (yStale) {
      return { needsUpdate: true, reason: 'stale_y' }
    }

    // Neither stale, but prices diverged:
    // Streaming says position is underwater, on-chain says it's OK
    if (streamingBelowThreshold && onChainAboveThreshold) {
      this.logger.info(
        { streamingBelowThreshold, onChainAboveThreshold },
        'Price divergence: streaming shows underwater but on-chain shows OK'
      )
      return { needsUpdate: true, reason: 'price_divergence' }
    }

    return { needsUpdate: false }
  }

  protected async prepareExecution(
    info: PositionInfo,
    marginThreshold: Decimal
  ): Promise<PreparedExecution | null> {
    const { position, supplyPoolX, supplyPoolY } = info
    const logger = this.logger.child({ positionId: position.id })

    // Step 1: Quick check with streaming prices (fast filter)
    const streamingMarginLevel = this.oracleService.calcMarginLevel(
      position,
      supplyPoolX,
      supplyPoolY
    )

    if (streamingMarginLevel.gte(marginThreshold)) {
      logger.info(
        { streamingMarginLevel: streamingMarginLevel.toDP(6).toString() },
        'Position OK based on streaming prices, skipping'
      )
      return null
    }

    // Step 2: Streaming says NOT OK - fetch data in PARALLEL
    // (update data only when the oracle has a Hermes connection)
    const canUpdatePrices = this.oracleService.supportsPriceUpdates
    const [pythUpdateData, onChainData] = await Promise.all([
      canUpdatePrices
        ? this.oracleService.getPriceFeedUpdateInfo([
            position.configInfo.pioInfoX,
            position.configInfo.pioInfoY,
          ])
        : null,
      this.oracleService.fetchFreshOnChainPrices(position.configInfo),
    ])

    // Step 3: Calculate margin level using ON-CHAIN prices (what contract will see)
    const onChainMarginLevel = this.oracleService.calcMarginLevelFromOnChain(
      position,
      supplyPoolX,
      supplyPoolY,
      onChainData
    )

    // Step 4: Determine if we need to update prices
    const priceUpdate = this.needsPriceUpdate(
      onChainData,
      streamingMarginLevel.lt(marginThreshold),
      onChainMarginLevel.gte(marginThreshold),
      60
    )

    // Step 5: If on-chain says OK and no price update needed (or none can be
    // made), skip
    if (onChainMarginLevel.gte(marginThreshold) && (!priceUpdate.needsUpdate || !canUpdatePrices)) {
      logger.info(
        {
          streamingMarginLevel: streamingMarginLevel.toDP(6).toString(),
          onChainMarginLevel: onChainMarginLevel.toDP(6).toString(),
        },
        'Position OK based on on-chain prices, skipping'
      )
      return null
    }

    // Without a Hermes connection stale feeds can't be refreshed — the
    // contract's max-age check would reject the tx. Skip and retry next
    // cycle; the sponsored pusher normally lands updates every ~10-15s, so
    // seeing this repeatedly means the pusher is stalled.
    if (priceUpdate.needsUpdate && !canUpdatePrices) {
      logger.warn(
        {
          stalenessX: onChainData.stalenessXSec,
          stalenessY: onChainData.stalenessYSec,
          reason: priceUpdate.reason,
          onChainMarginLevel: onChainMarginLevel.toDP(6).toString(),
        },
        'On-chain price feeds are stale and no Hermes connection to refresh them, skipping'
      )
      return null
    }

    // Step 6: Build transaction with price updates + Pyth references
    const tx = new Transaction()

    const priceUpdateIncluded = priceUpdate.needsUpdate
    if (priceUpdateIncluded && pythUpdateData) {
      logger.info(
        {
          stalenessX: onChainData.stalenessXSec,
          stalenessY: onChainData.stalenessYSec,
          reason: priceUpdate.reason,
        },
        'Including price feed updates in transaction'
      )
      updatePriceFeeds(tx, pythUpdateData)
    }

    const priceInfo = buildPriceCollection(tx, [
      position.configInfo.pioInfoX,
      position.configInfo.pioInfoY,
    ])

    return {
      tx,
      priceInfo,
      streamingMarginLevel,
      onChainMarginLevel,
      priceUpdateIncluded,
      logger,
    }
  }

  async execute(
    info: PositionInfo,
    executor: TransactionExecutor
  ): Promise<ExecutionOutcome | null> {
    const prepared = await this.prepareExecution(info, info.config.liqMargin)
    if (!prepared) return null

    const { tx, priceInfo, onChainMarginLevel, logger } = prepared
    logger.info(
      { onChainMarginLevel: onChainMarginLevel.toDP(6).toString() },
      'Proceeding with liquidation'
    )
    return this.liquidate(tx, info.position, priceInfo, executor, logger)
  }

  async liquidate(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    executor: TransactionExecutor,
    logger: Logger
  ): Promise<ExecutionOutcome | null> {
    const protocolHandler = this.getProtocolHandler(position)

    logger.info('Attempting to liquidate position')

    metrics.liquidatePositionAttemptCount?.add(1)

    const di = debtInfo.empty(tx, position.configInfo.lendFacilCap)
    debtInfo.addFromSupplyPool(
      tx,
      [position.X.typeName, position.configInfo.supplyPoolXInfo.ST.typeName],
      {
        self: di,
        pool: position.configInfo.supplyPoolXInfo.id,
        clock: SUI_CLOCK_OBJECT_ID,
      }
    )
    debtInfo.addFromSupplyPool(
      tx,
      [position.Y.typeName, position.configInfo.supplyPoolYInfo.ST.typeName],
      {
        self: di,
        pool: position.configInfo.supplyPoolYInfo.id,
        clock: SUI_CLOCK_OBJECT_ID,
      }
    )

    // deleverage if necessary
    protocolHandler.deleverageForLiquidation(tx, position, priceInfo)

    // liquidate
    this.addLiquidateColXCalls(tx, position, priceInfo, di, executor.sender)

    this.addLiquidateColYCalls(tx, position, priceInfo, di, executor.sender)

    // Dry run to set gas price and budget (unless skipped)
    if (!this.skipDryRun) {
      const dryRunResult = await this.performDryRun(tx, executor, logger)
      this.applyGasEstimate(tx, dryRunResult)

      // If dry run succeeded but shows no action events, skip execution to save gas
      if (dryRunResult.events !== null) {
        const hasActionEvents = dryRunResult.events.some(
          e => isLiquidationInfo(e.eventType) || isDeleverageInfo(e.eventType)
        )
        if (!hasActionEvents) {
          logger.info('Dry run shows no action events, skipping execution')
          metrics.liquidationNoActionCount?.add(1)
          return null
        }
      }
    }

    // Execute
    const res = await executor.executeTransaction(tx, {
      events: true,
    })
    this.assertExecutionSuccess(res, 'Liquidation')

    const events = res.data.events ?? []
    const liquidated = events.some(e => isLiquidationInfo(e.eventType))
    const deleveraged = events.some(e => isDeleverageInfo(e.eventType))

    if (liquidated || deleveraged) {
      logger.info({ txDigest: res.digest, liquidated, deleveraged }, 'Position processed')
      if (liquidated) metrics.liquidatePositionSuccessCount?.add(1)
    } else {
      logger.info(
        { txDigest: res.digest },
        'Transaction succeeded but no action occurred - position no longer underwater'
      )
      metrics.liquidationNoActionCount?.add(1)
    }

    return { txDigest: res.digest, liquidated, deleveraged }
  }

  private addLiquidateColXCalls(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    di: TransactionObjectInput,
    rewardRecipient: string
  ) {
    const protocolHandler = this.getProtocolHandler(position)

    // calculate the amount of debt Y that can be repaid
    const [maxRepaymentAmtY] = protocolHandler.calcLiquidateColX(tx, position, priceInfo, di)

    // flash swap X for the needed amount of Y
    const {
      balanceOut: repayYBalance,
      repayAmount: flashRepayXAmt,
      receipt,
    } = KaiRouterUtil.bluefin.flashSwap(tx, {
      coinInInfo: position.X,
      coinOutInfo: position.Y,
      amount: maxRepaymentAmtY,
      byAmountIn: false,
    })

    // repay the debt Y and get reward in X
    const rewardX = protocolHandler.liquidateColX(tx, position, priceInfo, di, repayYBalance)

    // repay the flash swap
    const flashRepayX = balance.split(tx, position.X.typeName, {
      self: rewardX,
      value: flashRepayXAmt,
    })

    KaiRouterUtil.bluefin.repayFlashSwap(tx, flashRepayX, receipt)

    // `liquidate_col_x` repays through `supply_pool::repay_max_possible`, which is
    // capped at the debt the pool computes from the position's shares, and joins
    // whatever it could not consume back into the repayment balance. The model's
    // `repayment_amt_y` rounds up and is bounded by the debt only up to that
    // rounding, so the remainder is dust — but it is not always zero, and
    // `destroy_zero` on it aborted the whole PTB, leaving such positions
    // permanently unliquidatable. Send it back instead of asserting it away.
    balance.sendFunds(tx, position.Y.typeName, {
      balance: repayYBalance,
      recipient: rewardRecipient,
    })

    // transfer the remaining reward X to the wallet
    const rewardXCoin = coin.fromBalance(tx, position.X.typeName, rewardX)
    tx.transferObjects([rewardXCoin], rewardRecipient)
  }

  private addLiquidateColYCalls(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    di: TransactionObjectInput,
    rewardRecipient: string
  ) {
    const protocolHandler = this.getProtocolHandler(position)

    // calculate the amount of debt X that can be repaid
    const [maxRepaymentAmtX] = protocolHandler.calcLiquidateColY(tx, position, priceInfo, di)

    // flash swap Y for the needed amount of X
    const {
      balanceOut: repayXBalance,
      repayAmount: flashRepayYAmt,
      receipt,
    } = KaiRouterUtil.bluefin.flashSwap(tx, {
      coinInInfo: position.Y,
      coinOutInfo: position.X,
      amount: maxRepaymentAmtX,
      byAmountIn: false,
    })

    // repay the debt X and get reward in Y
    const rewardY = protocolHandler.liquidateColY(tx, position, priceInfo, di, repayXBalance)

    // repay the flash swap
    const flashRepayY = balance.split(tx, position.Y.typeName, {
      self: rewardY,
      value: flashRepayYAmt,
    })
    KaiRouterUtil.bluefin.repayFlashSwap(tx, flashRepayY, receipt)

    // See `addLiquidateColXCalls` — the repayment balance can come back non-empty.
    balance.sendFunds(tx, position.X.typeName, {
      balance: repayXBalance,
      recipient: rewardRecipient,
    })

    const rewardYCoin = coin.fromBalance(tx, position.Y.typeName, rewardY)
    tx.transferObjects([rewardYCoin], rewardRecipient)
  }
}
