import { BaseLiquidationExecutor } from './liquidation-executor'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'
import { TransactionExecutor, ExecutionResult } from './transaction-executor'
import { ExecutionOutcome } from './types'
import { CongestionError, InsufficientGasError, ExecutionFailureError } from './errors'
import { bcs } from '@mysten/sui/bcs'
import { Position } from '../../lp/position'
import { PhantomTypeArgument, TypeArgument } from '../../gen/_framework/reified'
import { updatePriceFeeds } from '../pyth'
import * as pyth from '../../gen/kai-leverage/pyth/functions'
import { SUI_CLOCK_OBJECT_ID, toBase64 } from '@mysten/sui/utils'
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
import { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import { isSuiGrpcClient } from '@mysten/sui/grpc'
import { PositionInfo } from '../position-monitor/utils'
import { OracleService, OnChainPriceData } from '../../oracle'

export interface DryRunResult {
  suggestedGasPrice: bigint | null
  computationCost: bigint | null
  storageCost: bigint | null
  dryRunGasPrice: bigint | null
  /** Dry run events when the simulation succeeded, null when dry run failed or was unreliable. */
  events: SuiClientTypes.Event[] | null
}

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

  /**
   * Applies gas estimate from a dry run to the transaction.
   * Scales computation cost by suggestedGasPrice/dryRunGasPrice so the budget
   * covers execution at the congestion-elevated gas price. Storage cost is not
   * scaled since it's independent of gas price.
   */
  protected applyGasEstimate(tx: Transaction, estimate: DryRunResult): void {
    const MIN_GAS_BUDGET = 100_000_000n // 100M MIST = 0.1 SUI
    const { suggestedGasPrice, computationCost, storageCost, dryRunGasPrice } = estimate

    if (suggestedGasPrice) {
      tx.setGasPrice(suggestedGasPrice)
    }

    if (computationCost && storageCost && dryRunGasPrice && dryRunGasPrice > 0n) {
      const effectivePrice = suggestedGasPrice ?? dryRunGasPrice
      const scaledComputation = (computationCost * effectivePrice) / dryRunGasPrice
      const budget = (scaledComputation + storageCost) * 2n
      tx.setGasBudget(budget > MIN_GAS_BUDGET ? budget : MIN_GAS_BUDGET)
    } else {
      tx.setGasBudget(MIN_GAS_BUDGET)
    }
  }

  /**
   * Validates execution success. Does NOT log - caller is responsible for logging.
   * Throws on transaction failure.
   */
  protected assertExecutionSuccess(result: ExecutionResult, context: string): void {
    const effects = bcs.TransactionEffects.fromBase64(result.effects)
    const status = effects.V1?.status || effects.V2?.status

    if (status?.Failure) {
      const error = status.Failure.error
      const executionError = error as Record<string, unknown>

      if (error.$kind === 'ExecutionCancelledDueToSharedObjectCongestion') {
        const congestedObjects =
          error.ExecutionCancelledDueToSharedObjectCongestion.congested_objects
        throw new CongestionError(context, congestedObjects, result.digest, executionError)
      }

      if (error.$kind === 'InsufficientGas') {
        throw new InsufficientGasError(context, result.digest, executionError)
      }

      throw new ExecutionFailureError(context, error.$kind, result.digest, executionError)
    }
  }

  /**
   * Reads the congestion-elevated `suggested_gas_price` from the raw gRPC SimulateTransaction
   * response — the transport-agnostic core API drops it. Returns null for non-gRPC clients
   * (where the caller falls back to the reference gas price); a gRPC read that fails is logged
   * and treated as null so it can't take down the core dry run, but isn't silently swallowed.
   */
  protected async readSuggestedGasPrice(txBytes: Uint8Array): Promise<bigint | null> {
    const client = this.client
    if (!isSuiGrpcClient(client)) {
      return null
    }
    try {
      const { response } = await client.transactionExecutionService.simulateTransaction({
        transaction: { bcs: { value: txBytes } },
        readMask: { paths: ['suggested_gas_price'] },
      })
      return response.suggestedGasPrice ?? null
    } catch (err) {
      this.logger.warn(
        { err },
        'Failed to read suggested gas price from gRPC; falling back to reference price'
      )
      return null
    }
  }

  /**
   * Performs a dry run of the transaction.
   * Returns suggested gas price and budget on success, nulls on failure.
   * Throws ExecutionFailureError for persistent dry-run failures (e.g. MoveAbort).
   * Transient dry-run failures (congestion, gas) proceed to execution.
   * RPC/network failures return null estimates and proceed to execution.
   */
  protected async performDryRun(
    tx: Transaction,
    executor: TransactionExecutor,
    logger: Logger
  ): Promise<DryRunResult> {
    let txBytes: Uint8Array | undefined
    try {
      // Clone tx and set temp gas budget so the SDK skips its internal dry-run.
      // The original tx is not modified — applyGasEstimate() handles that.
      const dryRunTx = Transaction.from(tx)
      dryRunTx.setGasBudget(50_000_000_000n)

      txBytes = await executor.buildTransaction(dryRunTx)

      // Simulate for status/gas/events (transport-agnostic), read the congestion-elevated
      // suggested gas price from the raw gRPC response (null on non-gRPC clients), and the
      // reference gas price as the budget-scaling baseline — all in parallel.
      const [result, suggestedGasPrice, refGasPrice] = await Promise.all([
        this.client.core.simulateTransaction({
          transaction: txBytes,
          include: { effects: true, events: true },
        }),
        this.readSuggestedGasPrice(txBytes),
        this.client.core.getReferenceGasPrice(),
      ])

      const txResult = result.Transaction ?? result.FailedTransaction
      const status = txResult.status

      if (!status.success) {
        const errorStr = status.error.message ?? ''

        const isTransientDryRunFailure =
          status.error.$kind === 'CongestedObjects' ||
          errorStr.startsWith('ExecutionCancelledDueToSharedObjectCongestion') ||
          errorStr.startsWith('InsufficientGas')

        if (isTransientDryRunFailure) {
          logger.warn(
            { error: errorStr },
            'Dry run indicates transient failure, proceeding with execution'
          )
        } else {
          logger.warn(
            { error: errorStr, serializedTx: txBytes ? toBase64(txBytes) : null },
            'Dry run indicates persistent failure, aborting execution'
          )
          throw new ExecutionFailureError('Dry run', errorStr)
        }
      }

      const gasUsed = txResult.effects?.gasUsed
      const computationCost = gasUsed ? BigInt(gasUsed.computationCost) : null
      const storageCost = gasUsed ? BigInt(gasUsed.storageCost) : null
      const dryRunGasPrice = BigInt(refGasPrice.referenceGasPrice)

      if (status.success) {
        logger.info(
          {
            suggestedGasPrice: suggestedGasPrice?.toString(),
            computationCost: computationCost?.toString(),
            storageCost: storageCost?.toString(),
            dryRunGasPrice: dryRunGasPrice.toString(),
          },
          'Dry run successful'
        )
      }

      return {
        suggestedGasPrice,
        computationCost,
        storageCost,
        dryRunGasPrice,
        events: status.success ? (txResult.events ?? null) : null,
      }
    } catch (error) {
      if (error instanceof ExecutionFailureError) {
        throw error
      }
      logger.warn(
        { err: error, serializedTx: txBytes ? toBase64(txBytes) : null },
        'Dry run failed, proceeding with execution'
      )
      return {
        suggestedGasPrice: null,
        computationCost: null,
        storageCost: null,
        dryRunGasPrice: null,
        events: null,
      }
    }
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
    const [pythUpdateData, onChainData] = await Promise.all([
      this.oracleService.getPriceFeedUpdateInfo([
        position.configInfo.pioInfoX,
        position.configInfo.pioInfoY,
      ]),
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

    // Step 5: If on-chain says OK and no price update needed, skip
    if (onChainMarginLevel.gte(marginThreshold) && !priceUpdate.needsUpdate) {
      logger.info(
        {
          streamingMarginLevel: streamingMarginLevel.toDP(6).toString(),
          onChainMarginLevel: onChainMarginLevel.toDP(6).toString(),
        },
        'Position OK based on on-chain prices, skipping'
      )
      return null
    }

    // Step 6: Build transaction with price updates + Pyth references
    const tx = new Transaction()

    const priceUpdateIncluded = priceUpdate.needsUpdate
    if (priceUpdateIncluded) {
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

    const priceInfo = pyth.create(tx, SUI_CLOCK_OBJECT_ID)
    pyth.add(tx, { self: priceInfo, info: position.configInfo.pioInfoX.priceInfoObjectId })
    pyth.add(tx, { self: priceInfo, info: position.configInfo.pioInfoY.priceInfoObjectId })

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

    // transfer the remaining reward X to the wallet
    balance.destroyZero(tx, position.Y.typeName, repayYBalance)

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

    balance.destroyZero(tx, position.X.typeName, repayXBalance)

    const rewardYCoin = coin.fromBalance(tx, position.Y.typeName, rewardY)
    tx.transferObjects([rewardYCoin], rewardRecipient)
  }
}
