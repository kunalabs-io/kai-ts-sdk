import { fisherYatesShuffle, PositionInfo } from '../position-monitor/utils'
import { LRUCache } from 'lru-cache'
import { Logger } from 'pino'
import { LiquidationExecutor } from '../executor/liquidation-executor'
import { TransactionExecutor } from '../executor/transaction-executor'
import {
  CongestionError,
  InsufficientGasError,
  ExecutionFailureError,
  isDeterministicBuildFailure,
} from '../executor/errors'
import * as metrics from '../metrics'

export type ExecutionMode = 'parallel' | 'sequential'

/**
 * Controls the processing of positions that need liquidation or deleveraging.
 *
 * Uses a queue-based approach to handle incoming positions from the position monitor.
 * When `handleNewPositions` is called (potentially multiple times concurrently),
 * positions are added to a pending queue. A single processing loop drains the queue,
 * preventing race conditions from concurrent calls.
 *
 * Supports two execution modes:
 * - `sequential`: Processes one position at a time. Safer for avoiding wallet locking issues.
 * - `parallel`: Processes all pending positions concurrently using Promise.all.
 *   Relies on SerialTransactionExecutor for internal transaction queueing.
 *
 * Tracks position state to avoid redundant processing:
 * - Recently processed positions (15s TTL)
 * - Currently processing positions
 * - Excluded positions that failed too many times (30min TTL)
 */
export class LiquidationController {
  private readonly MAX_FAILURE_COUNT = 5
  private readonly EXCLUDED_POSITIONS_TTL = 1800000 // 30 minutes
  private readonly RETRY_BASE_DELAY_MS = 1000
  private readonly RETRY_MAX_DELAY_MS = 10_000
  private readonly CONTROLLER_SUMMARY_INTERVAL_MS = 60_000
  private lastControllerSummaryAt = Date.now()

  // prevents processing the same position multiple times successively
  private recentlyProcessedPositions = new LRUCache<string, boolean>({
    ttl: 30000, // align with monitor's positionCacheTtlMs (30s)
    ttlAutopurge: true,
  })
  // positions that have failed too many times we should skip
  private excludedPositions = new LRUCache<string, boolean>({
    ttl: this.EXCLUDED_POSITIONS_TTL,
    ttlAutopurge: true,
  })

  private positionFailureCounts = new LRUCache<string, number>({
    ttl: this.EXCLUDED_POSITIONS_TTL,
    ttlAutopurge: true,
  })

  // Currently processing positions
  private processingPositions = new Set<string>()

  // Retry backoff state for transient errors (congestion, insufficient gas)
  private retryState = new Map<string, { retryAfter: number; retryCount: number }>()

  // Queue and processing state (used by both modes)
  private pendingPositions: Map<string, PositionInfo> = new Map()
  private isProcessing = false

  constructor(
    private readonly logger: Logger,
    private readonly liquidationExecutor: LiquidationExecutor,
    private readonly transactionExecutor: TransactionExecutor,
    private readonly executionMode: ExecutionMode = 'sequential'
  ) {
    this.logger = this.logger.child({ task: 'liquidation_controller' })
  }

  async handleNewPositions(positions: Map<string, PositionInfo>): Promise<void> {
    // Clean up state for positions no longer reported by the monitor
    // (recovered above margin threshold, liquidated by someone else, etc.)
    for (const id of this.retryState.keys()) {
      if (!positions.has(id)) {
        this.retryState.delete(id)
      }
    }
    for (const id of this.excludedPositions.keys()) {
      if (!positions.has(id)) {
        this.excludedPositions.delete(id)
      }
    }
    for (const id of this.positionFailureCounts.keys()) {
      if (!positions.has(id)) {
        this.positionFailureCounts.delete(id)
      }
    }
    for (const id of this.pendingPositions.keys()) {
      if (!positions.has(id)) {
        this.pendingPositions.delete(id)
      }
    }

    metrics.recentlyProcessedPositionsCount?.record(this.recentlyProcessedPositions.size)
    metrics.excludedPositionsCount?.record(this.excludedPositions.size)
    metrics.retryPositionsCount?.record(this.retryState.size)
    metrics.positionsToProcessCount?.record(positions.size)

    // Add to queue (same for both modes)
    let addedCount = 0
    for (const [id, info] of positions) {
      if (!this.shouldSkipPosition(id)) {
        this.pendingPositions.set(id, info)
        addedCount++
      }
    }

    if (addedCount > 0) {
      this.logger.info(
        {
          addedCount,
          pendingCount: this.pendingPositions.size,
          isProcessing: this.isProcessing,
          executionMode: this.executionMode,
        },
        'Added positions to pending queue'
      )
    }

    if (Date.now() - this.lastControllerSummaryAt >= this.CONTROLLER_SUMMARY_INTERVAL_MS) {
      this.logger.info(
        {
          excludedPositions:
            this.excludedPositions.size > 0 ? Array.from(this.excludedPositions.keys()) : undefined,
          excludedCount: this.excludedPositions.size,
          retryPositions: this.retryState.size > 0 ? Array.from(this.retryState.keys()) : undefined,
          retryCount: this.retryState.size,
          pendingCount: this.pendingPositions.size,
          recentlyProcessedCount: this.recentlyProcessedPositions.size,
        },
        'Controller summary'
      )
      this.lastControllerSummaryAt = Date.now()
    }

    // Start processing if not already running (fire-and-forget so poll() is non-blocking)
    if (!this.isProcessing) {
      this.processQueue().catch(error => {
        this.logger.error(error, 'Unexpected error in processQueue')
      })
    }
  }

  /**
   * Process the pending queue.
   * Both modes use this single loop - only the drain strategy differs.
   */
  private async processQueue(): Promise<void> {
    this.isProcessing = true
    const start = Date.now()
    try {
      while (this.pendingPositions.size > 0) {
        if (this.executionMode === 'parallel') {
          await this.processBatchParallel()
        } else {
          await this.processOneSequential()
        }
      }
    } finally {
      this.isProcessing = false
      metrics.liquidateOrDeleveragePositionDurationMs?.record(Date.now() - start)
    }
  }

  /**
   * PARALLEL: Take all pending positions and process concurrently.
   * SerialTransactionExecutor handles internal queueing of transactions.
   */
  private async processBatchParallel(): Promise<void> {
    // Take ALL pending positions
    const batch = fisherYatesShuffle([...this.pendingPositions.entries()])
    this.pendingPositions.clear()

    // Filter (state may have changed since queueing)
    const toProcess = batch.filter(([id]) => !this.shouldSkipPosition(id))

    this.logPositionsState(toProcess)

    await Promise.all(toProcess.map(([id, info]) => this.processPosition(id, info)))
  }

  /**
   * SEQUENTIAL: Take one position and process it.
   * Re-shuffles remaining positions for fairness.
   */
  private async processOneSequential(): Promise<void> {
    // Shuffle and take one position
    const entries = fisherYatesShuffle([...this.pendingPositions.entries()])
    const [positionId, positionInfo] = entries[0]
    this.pendingPositions.delete(positionId)

    // Re-check skip conditions (state may have changed)
    if (this.shouldSkipPosition(positionId)) {
      this.logger.debug({ positionId }, 'Skipping position (state changed)')
      return
    }

    this.logger.info(
      {
        positionId,
        remainingCount: this.pendingPositions.size,
      },
      'Processing position from queue'
    )

    await this.processPosition(positionId, positionInfo)
  }

  private shouldSkipPosition(positionId: string): boolean {
    if (
      this.recentlyProcessedPositions.has(positionId) ||
      this.excludedPositions.has(positionId) ||
      this.processingPositions.has(positionId)
    ) {
      return true
    }

    const retry = this.retryState.get(positionId)
    if (retry && Date.now() < retry.retryAfter) return true

    return false
  }

  private scheduleRetry(positionId: string): void {
    const existing = this.retryState.get(positionId)
    const retryCount = (existing?.retryCount ?? 0) + 1
    const delay = Math.min(
      this.RETRY_BASE_DELAY_MS * Math.pow(2, retryCount - 1),
      this.RETRY_MAX_DELAY_MS
    )
    this.retryState.set(positionId, {
      retryAfter: Date.now() + delay,
      retryCount,
    })
  }

  private logPositionsState(positionsToProcess: Array<[string, PositionInfo]>): void {
    this.logger.info(
      {
        positionsToProcess: positionsToProcess.map(([id]) => id),
        executionMode: this.executionMode,
      },
      'Processing positions'
    )

    if (this.excludedPositions.size > 0) {
      this.logger.info(
        { excludedPositions: Array.from(this.excludedPositions.keys()) },
        'Excluded positions'
      )
    }

    if (this.recentlyProcessedPositions.size > 0) {
      this.logger.info(
        { recentlyProcessedPositions: Array.from(this.recentlyProcessedPositions.keys()) },
        'Recently processed positions'
      )
    }
  }

  private async processPosition(positionId: string, positionInfo: PositionInfo): Promise<void> {
    try {
      this.processingPositions.add(positionId)

      const outcome = await this.liquidationExecutor.execute(positionInfo, this.transactionExecutor)

      if (outcome === null) {
        // Position no longer needs action (pre-execution recovery)
        this.logger.info({ positionId }, 'Position no longer needs action')
      } else {
        if (outcome.liquidated || outcome.deleveraged) {
          metrics.workerLiquidateOrDeleverageCallAttemptsCount?.add(1)
        }
      }

      // Reset failure count and retry state on any successful outcome (including no action needed)
      this.positionFailureCounts.delete(positionId)
      this.retryState.delete(positionId)
      this.recentlyProcessedPositions.set(positionId, true)
    } catch (error) {
      // Only actual errors reach here
      this.handleProcessingError(positionId, error)
    } finally {
      this.processingPositions.delete(positionId)
    }
  }

  private handleProcessingError(positionId: string, error: unknown): void {
    metrics.workerLiquidateOrDeleverageCallFailuresCount?.add(1)

    if (error instanceof CongestionError) {
      this.scheduleRetry(positionId)
      const retry = this.retryState.get(positionId)!
      this.logger.warn(
        {
          positionId,
          congestedObjects: error.congestedObjects,
          retryCount: retry.retryCount,
          retryDelayMs: retry.retryAfter - Date.now(),
          err: error,
        },
        'Congestion on shared objects, will retry with backoff'
      )
      return
    }

    if (error instanceof InsufficientGasError) {
      this.scheduleRetry(positionId)
      const retry = this.retryState.get(positionId)!
      this.logger.warn(
        {
          positionId,
          retryCount: retry.retryCount,
          retryDelayMs: retry.retryAfter - Date.now(),
          err: error,
        },
        'Insufficient gas, will retry with backoff'
      )
      return
    }

    // A PTB that aborts on chain can surface either as an ExecutionFailureError or,
    // when it aborts while `Transaction.build()` resolves it against the node, as a
    // plain Error. Both are persistent: the same transaction rebuilt against the same
    // state fails the same way, so both must count toward exclusion. Treating the
    // build-time variant as transient is what let a single position retry ~85k times.
    const errorKind =
      error instanceof ExecutionFailureError
        ? error.errorKind
        : isDeterministicBuildFailure(error)
          ? 'BuildAbort'
          : null

    if (errorKind !== null) {
      // Persistent on-chain failure — backoff + count toward exclusion
      this.scheduleRetry(positionId)
      const retry = this.retryState.get(positionId)!

      const failureCount = (this.positionFailureCounts.get(positionId) ?? 0) + 1
      this.positionFailureCounts.set(positionId, failureCount)

      if (failureCount > this.MAX_FAILURE_COUNT) {
        this.logger.error(
          { positionId, errorKind, failureCount },
          `Position ${positionId} has failed too many times, excluding from processing`
        )
        this.excludedPositions.set(positionId, true)
        this.positionFailureCounts.delete(positionId)
      } else {
        this.logger.error(
          {
            positionId,
            errorKind,
            failureCount,
            retryCount: retry.retryCount,
            retryDelayMs: retry.retryAfter - Date.now(),
            err: error,
          },
          'Persistent execution failure, will retry with backoff'
        )
      }
      return
    }

    // Transient infrastructure/network error — backoff without exclusion
    this.scheduleRetry(positionId)
    const retry = this.retryState.get(positionId)!
    this.logger.warn(
      {
        positionId,
        retryCount: retry.retryCount,
        retryDelayMs: retry.retryAfter - Date.now(),
        err: error,
      },
      'Transient error, will retry with backoff'
    )
  }
}
