import { Logger } from 'pino'
import { Interval } from '../interval'
import * as metrics from '../metrics'
import { SuiPriceServiceConnection } from '@pythnetwork/pyth-sui-js'
import { SuiClient } from '@mysten/sui/client'
import { PositionInfo } from './utils'

export interface PositionMonitor {
  onLiquidationNeeded(observer: (positions: Map<string, PositionInfo>) => Promise<void>): void
}

export interface PositionMonitorConfig {
  includeDeleveragePositions?: boolean
}

export abstract class BasePositionMonitor extends Interval implements PositionMonitor {
  protected pythConnection: SuiPriceServiceConnection
  protected client: SuiClient
  protected config: PositionMonitorConfig

  private liquidationObservers: ((positions: Map<string, PositionInfo>) => Promise<void>)[] = []

  constructor(
    pollIntervalMs: number,
    logger: Logger,
    pythConnection: SuiPriceServiceConnection,
    client: SuiClient,
    config: PositionMonitorConfig = { includeDeleveragePositions: false }
  ) {
    super(pollIntervalMs, logger.child({ task: 'position_monitor' }))
    this.pythConnection = pythConnection
    this.client = client
    this.config = config
  }

  protected async poll(): Promise<void> {
    const logger = this.logger.child({ operation: 'poll' })
    logger.info('Polling...')

    metrics.monitorPollRunCount?.add(1)

    const start = Date.now()

    try {
      const positions = await this.getPositionsToLiquidateAndDeleverage()

      if (positions.size === 0) {
        logger.info('No positions to liquidate found')

        const duration = Date.now() - start
        logger.info({ duration }, 'Poll finished in %dms')

        metrics.monitorPollRunSuccessDurationMs?.record(duration)
        return
      }

      logger.info({ positionIds: Array.from(positions.keys()) }, 'Found positions to liquidate')

      await this.notifyLiquidationNeeded(positions)
    } catch (error) {
      logger.error(error, 'Error polling for positions')
    }

    const duration = Date.now() - start
    logger.info({ duration }, 'Poll finished in %dms')

    metrics.monitorPollRunSuccessDurationMs?.record(duration)
  }

  public onLiquidationNeeded(
    observer: (positions: Map<string, PositionInfo>) => Promise<void>
  ): void {
    this.liquidationObservers.push(observer)
  }

  protected abstract getPositionsToLiquidateAndDeleverage(): Promise<Map<string, PositionInfo>>

  private async notifyLiquidationNeeded(positions: Map<string, PositionInfo>): Promise<void> {
    await Promise.all(this.liquidationObservers.map(observer => observer(positions)))
  }
}
