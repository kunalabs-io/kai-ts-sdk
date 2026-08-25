import { Logger } from 'pino'
import { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import { isSuiGrpcClient } from '@mysten/sui/grpc'
import { Transaction } from '@mysten/sui/transactions'
import { bcs } from '@mysten/sui/bcs'
import { toBase64 } from '@mysten/sui/utils'
import { Position } from '../../lp/position'
import { PhantomTypeArgument, TypeArgument } from '../../gen/_framework/reified'
import { ProtocolHandler, CetusProtocolHandler, BluefinProtocolHandler } from './handlers'
import { PositionInfo } from '../position-monitor/utils'
import { TransactionExecutor, ExecutionResult } from './transaction-executor'
import { ExecutionOutcome } from './types'
import {
  CongestionError,
  InsufficientGasError,
  ExecutionFailureError,
  isDeterministicBuildFailure,
} from './errors'

export interface DryRunResult {
  suggestedGasPrice: bigint | null
  computationCost: bigint | null
  storageCost: bigint | null
  dryRunGasPrice: bigint | null
  /** Dry run events when the simulation succeeded, null when dry run failed or was unreliable. */
  events: SuiClientTypes.Event[] | null
  /** Dry run balance changes when the simulation succeeded, null otherwise. */
  balanceChanges: SuiClientTypes.BalanceChange[] | null
}

export interface DryRunOptions {
  /**
   * When true, any dry-run failure (including transient congestion/gas failures
   * and RPC errors) throws instead of proceeding — for paths where the dry run
   * is a mandatory gate rather than a best-effort gas estimate.
   */
  strict?: boolean
  /**
   * Placeholder budget for the simulation clone. Gas selection must find
   * coins covering it, so it also bounds how much SUI the wallet needs to
   * hold — low-funded wallets (dust sweep) should pass their gas cap here.
   */
  gasBudget?: bigint
}

export interface LiquidationExecutor {
  execute(info: PositionInfo, executor: TransactionExecutor): Promise<ExecutionOutcome | null>
}

export abstract class BaseLiquidationExecutor implements LiquidationExecutor {
  private readonly cetusHandler: CetusProtocolHandler
  private readonly bluefinHandler: BluefinProtocolHandler

  constructor(
    protected readonly client: ClientWithCoreApi,
    protected logger: Logger
  ) {
    this.cetusHandler = new CetusProtocolHandler()
    this.bluefinHandler = new BluefinProtocolHandler()
  }

  protected getProtocolHandler(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  ): ProtocolHandler {
    if (position.isCetus()) return this.cetusHandler
    if (position.isBluefin()) return this.bluefinHandler
    throw new Error('Unknown protocol type')
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
   * With `strict: true`, every failure class throws instead (mandatory-gate semantics).
   */
  protected async performDryRun(
    tx: Transaction,
    executor: TransactionExecutor,
    logger: Logger,
    options?: DryRunOptions
  ): Promise<DryRunResult> {
    const strict = options?.strict ?? false
    let txBytes: Uint8Array | undefined
    try {
      // Clone tx and set temp gas budget so the SDK skips its internal dry-run.
      // The original tx is not modified — applyGasEstimate() handles that.
      const dryRunTx = Transaction.from(tx)
      dryRunTx.setGasBudget(options?.gasBudget ?? 50_000_000_000n)

      txBytes = await executor.buildTransaction(dryRunTx)

      // Simulate for status/gas/events (transport-agnostic), read the congestion-elevated
      // suggested gas price from the raw gRPC response (null on non-gRPC clients), and the
      // reference gas price as the budget-scaling baseline — all in parallel.
      const [result, suggestedGasPrice, refGasPrice] = await Promise.all([
        this.client.core.simulateTransaction({
          transaction: txBytes,
          include: { effects: true, events: true, balanceChanges: true },
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

        if (isTransientDryRunFailure && !strict) {
          logger.warn(
            { error: errorStr },
            'Dry run indicates transient failure, proceeding with execution'
          )
        } else {
          logger.warn(
            { error: errorStr, serializedTx: txBytes ? toBase64(txBytes) : null },
            'Dry run failed, aborting execution'
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
        balanceChanges: status.success ? (txResult.balanceChanges ?? null) : null,
      }
    } catch (error) {
      if (error instanceof ExecutionFailureError) {
        throw error
      }
      if (isDeterministicBuildFailure(error)) {
        // The build resolved against the node and the PTB aborted. Executing would
        // rebuild the identical transaction and hit the identical abort, so treat it
        // as a persistent failure regardless of `strict` — the controller needs to
        // count it toward exclusion instead of retrying it indefinitely.
        logger.warn(
          { err: error, serializedTx: txBytes ? toBase64(txBytes) : null },
          'Dry run failed with a deterministic on-chain error, aborting execution'
        )
        throw new ExecutionFailureError('Dry run', (error as Error).message)
      }
      if (strict) {
        logger.warn(
          { err: error, serializedTx: txBytes ? toBase64(txBytes) : null },
          'Dry run failed, aborting execution'
        )
        throw new ExecutionFailureError(
          'Dry run',
          error instanceof Error ? error.message : String(error)
        )
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
        balanceChanges: null,
      }
    }
  }

  abstract execute(
    info: PositionInfo,
    executor: TransactionExecutor
  ): Promise<ExecutionOutcome | null>
}
