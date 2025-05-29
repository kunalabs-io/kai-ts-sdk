import { fisherYatesShuffle, PositionInfo } from '../position-monitor/utils'
import { LRUCache } from 'lru-cache'
import { Logger } from 'pino'
import { LiquidationExecutor } from '../executor/liquidation-executor'
import * as metrics from '../metrics'

export class LiquidationController {
  private readonly MAX_FAILURE_COUNT = 5
  private readonly EXCLUDED_POSITIONS_TTL = 1800000 // 30 minutes

  // prevents processing the same position multiple times successively
  private recentlyProcessedPositions = new LRUCache<string, boolean>({
    ttl: 15000, // 15 seconds to accommodate for potential indexer lag
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

  constructor(
    private readonly logger: Logger,
    private readonly liquidationExecutor: LiquidationExecutor
  ) {
    this.logger = this.logger.child({ task: 'liquidation_controller' })
  }

  async handleNewPositions(positions: Map<string, PositionInfo>): Promise<void> {
    const start = Date.now()

    metrics.recentlyProcessedPositionsCount.record(this.recentlyProcessedPositions.size)
    metrics.excludedPositionsCount.record(this.excludedPositions.size)
    metrics.positionsToProcessCount.record(positions.size)

    // Shuffle positions randomly and remove positions that are excluded,
    // recently processed, or currently being processed
    const positionsToProcess = fisherYatesShuffle(Array.from(positions.entries())).filter(
      ([positionId]) =>
        !this.recentlyProcessedPositions.has(positionId) &&
        !this.excludedPositions.has(positionId) &&
        !this.processingPositions.has(positionId)
    )

    this.logger.info(
      {
        positionsToProcess: Array.from(positionsToProcess.map(([id]) => id)),
      },
      'Processing positions'
    )

    if (Array.from(this.excludedPositions.keys()).length > 0) {
      this.logger.info(
        { excludedPositions: Array.from(this.excludedPositions.keys()) },
        'Excluded positions'
      )
    }

    if (Array.from(this.recentlyProcessedPositions.keys()).length > 0) {
      this.logger.info(
        {
          recentlyProcessedPositions: Array.from(this.recentlyProcessedPositions.keys()),
        },
        'Recently processed positions'
      )
    }

    await Promise.all(
      positionsToProcess.map(([positionId, positionInfo]) =>
        this.processPosition(positionId, positionInfo)
      )
    )

    metrics.liquidateOrDeleveragePositionDurationMs.record(Date.now() - start)
  }

  private async processPosition(positionId: string, positionInfo: PositionInfo): Promise<void> {
    const positionLogger = this.logger.child({
      positionId: positionId,
    })
    positionLogger.info(`Processing position ${positionId}`)

    try {
      this.processingPositions.add(positionId)

      await this.liquidationExecutor.execute(positionInfo)

      this.logger.info({ positionId }, 'Position processed successfully')
      metrics.workerLiquidateOrDeleverageCallAttemptsCount.add(1)

      this.recentlyProcessedPositions.set(positionId, true)
      this.positionFailureCounts.delete(positionId)
    } catch (error) {
      metrics.workerLiquidateOrDeleverageCallFailuresCount.add(1)

      this.logger.error({ positionId, error }, `Failed to process position ${positionId}: ${error}`)

      const failureCount = (this.positionFailureCounts.get(positionId) ?? 0) + 1
      this.positionFailureCounts.set(positionId, failureCount)

      if (failureCount > this.MAX_FAILURE_COUNT) {
        this.logger.error(
          `Position ${positionId} has failed too many times, excluding from processing`
        )
        this.excludedPositions.set(positionId, true)
        this.positionFailureCounts.delete(positionId)
      }
    } finally {
      this.processingPositions.delete(positionId)
    }
  }
}
