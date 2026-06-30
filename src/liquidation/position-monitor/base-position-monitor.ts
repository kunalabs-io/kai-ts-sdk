import { Logger } from 'pino'
import { Histogram } from '@opentelemetry/api'
import { Interval } from '../interval'
import * as metrics from '../metrics'
import { ClientWithCoreApi } from '@mysten/sui/client'
import {
  PositionInfo,
  calcPositionMarginLevelWithOracle,
  calcPositionAssetValueWithOracle,
  filterByLiquidationAndDeleverageNeeded,
} from './utils'
import { PhantomTypeArgument, TypeArgument } from '../../gen/_framework/reified'
import { Position } from '../../lp/position'
import { PositionConfig } from '../../lp/config'
import { SupplyPool } from '../../lp/supply-pool'
import { OracleService } from '../../oracle'

export interface PositionMonitor {
  onLiquidationNeeded(observer: (positions: Map<string, PositionInfo>) => Promise<void>): void
  updateSkipList(newSkipList: string[]): void
}

export interface PositionMonitorConfig {
  includeDeleveragePositions?: boolean
  minAssetValue?: number
  positionSkipList?: string[]
}

export abstract class BasePositionMonitor extends Interval implements PositionMonitor {
  protected readonly oracleService: OracleService
  protected client: ClientWithCoreApi
  protected config: PositionMonitorConfig
  private liquidationObservers: ((positions: Map<string, PositionInfo>) => Promise<void>)[] = []

  // Time-based caches
  protected cachedPositions: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>[] = []
  private cachedPositionsUpdatedAt = 0
  private readonly positionCacheTtlMs = 30_000

  protected cachedConfigs: Map<
    string,
    PositionConfig<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  > = new Map()
  protected cachedSupplyPools: Map<string, SupplyPool<PhantomTypeArgument, PhantomTypeArgument>> =
    new Map()
  private supplyPoolCacheUpdatedAt = 0
  private readonly supplyPoolCacheTtlMs = 10_000

  // Periodic summary counters
  private pollsSinceLastSummary = 0
  private positionsFoundSinceLastSummary = 0
  private errorsSinceLastSummary = 0
  private readonly SUMMARY_INTERVAL_MS = 60_000
  private lastSummaryAt = Date.now()

  // Missing registry tracking (accumulated across polls)
  private skippedDueToMissingRegistrySinceLastSummary = 0
  private missingRegistryKeysSinceLastSummary = new Set<string>()

  // Filter stats (accumulated across polls)
  private liquidateAddedIdsSinceLastSummary = new Set<string>()
  private deleverageAddedIdsSinceLastSummary = new Set<string>()
  private liquidateSkippedLowValueIdsSinceLastSummary = new Set<string>()
  private deleverageSkippedLowValueIdsSinceLastSummary = new Set<string>()
  private nothingToDeleverageIdsSinceLastSummary = new Set<string>()
  private skipListHitIdsSinceLastSummary = new Set<string>()

  constructor(
    pollIntervalMs: number,
    logger: Logger,
    client: ClientWithCoreApi,
    oracleService: OracleService,
    config: PositionMonitorConfig = {
      includeDeleveragePositions: false,
      minAssetValue: 0.01,
      positionSkipList: [],
    }
  ) {
    super(pollIntervalMs, logger.child({ task: 'position_monitor' }))
    this.oracleService = oracleService
    this.client = client
    this.config = config
  }

  protected async poll(): Promise<void> {
    const logger = this.logger.child({ operation: 'poll' })
    logger.debug('Polling...')

    metrics.monitorPollRunCount?.add(1)

    const start = Date.now()

    try {
      const positions = await this.getPositionsToLiquidateAndDeleverage()

      if (positions.size === 0) {
        logger.debug('No positions to liquidate found')
      } else {
        this.positionsFoundSinceLastSummary++
        logger.debug({ positionIds: Array.from(positions.keys()) }, 'Found positions to liquidate')
      }

      await this.notifyLiquidationNeeded(positions)

      metrics.monitorPollRunSuccessDurationMs?.record(Date.now() - start)
    } catch (error) {
      logger.error(error, 'Error polling for positions')
      metrics.monitorPollRunFailuresCount?.add(1)
      this.errorsSinceLastSummary++
    } finally {
      const duration = Date.now() - start
      logger.debug({ duration }, `Poll finished in ${duration}ms`)

      this.pollsSinceLastSummary++
      if (Date.now() - this.lastSummaryAt >= this.SUMMARY_INTERVAL_MS) {
        const setOrUndefined = (s: Set<string>) => (s.size > 0 ? Array.from(s) : undefined)

        const logMethod = this.missingRegistryKeysSinceLastSummary.size > 0 ? 'warn' : 'info'

        this.logger[logMethod](
          {
            polls: this.pollsSinceLastSummary,
            withPositions: this.positionsFoundSinceLastSummary,
            errors: this.errorsSinceLastSummary,
            lastPollMs: duration,
            skippedDueToMissingRegistry: this.skippedDueToMissingRegistrySinceLastSummary,
            missingKeys: setOrUndefined(this.missingRegistryKeysSinceLastSummary),
            filter: {
              liquidateAdded: setOrUndefined(this.liquidateAddedIdsSinceLastSummary),
              deleverageAdded: setOrUndefined(this.deleverageAddedIdsSinceLastSummary),
              liquidateSkippedLowValue: setOrUndefined(
                this.liquidateSkippedLowValueIdsSinceLastSummary
              ),
              deleverageSkippedLowValue: setOrUndefined(
                this.deleverageSkippedLowValueIdsSinceLastSummary
              ),
              nothingToDeleverage: this.nothingToDeleverageIdsSinceLastSummary.size || undefined,
              skipListHits: setOrUndefined(this.skipListHitIdsSinceLastSummary),
            },
          },
          'Monitor summary'
        )

        this.pollsSinceLastSummary = 0
        this.positionsFoundSinceLastSummary = 0
        this.errorsSinceLastSummary = 0
        this.skippedDueToMissingRegistrySinceLastSummary = 0
        this.missingRegistryKeysSinceLastSummary.clear()
        this.liquidateAddedIdsSinceLastSummary.clear()
        this.deleverageAddedIdsSinceLastSummary.clear()
        this.liquidateSkippedLowValueIdsSinceLastSummary.clear()
        this.deleverageSkippedLowValueIdsSinceLastSummary.clear()
        this.nothingToDeleverageIdsSinceLastSummary.clear()
        this.skipListHitIdsSinceLastSummary.clear()
        this.lastSummaryAt = Date.now()
      }
    }
  }

  public onLiquidationNeeded(
    observer: (positions: Map<string, PositionInfo>) => Promise<void>
  ): void {
    this.liquidationObservers.push(observer)
  }

  public updateSkipList(newSkipList: string[]): void {
    this.config.positionSkipList = newSkipList
    this.logger.info(`Updated skip list with ${newSkipList.length} positions`)
  }

  protected abstract fetchPositions(): Promise<
    Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>[]
  >

  protected abstract fetchConfigsAndSupplyPools(
    positions: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>[]
  ): Promise<{
    configs: Map<string, PositionConfig<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>>
    supplyPools: Map<string, SupplyPool<PhantomTypeArgument, PhantomTypeArgument>>
  }>

  protected abstract getFetchLatencyHistogram(): Histogram | undefined

  protected async getPositionsToLiquidateAndDeleverage(): Promise<Map<string, PositionInfo>> {
    const start = Date.now()
    const now = Date.now()

    // Refresh positions if stale (30s TTL)
    let positionsRefreshed = false
    if (now - this.cachedPositionsUpdatedAt > this.positionCacheTtlMs) {
      this.cachedPositions = await this.fetchPositions()
      this.cachedPositionsUpdatedAt = now
      positionsRefreshed = true
      metrics.positionCacheRefreshCount?.add(1)
      this.logger.debug({ count: this.cachedPositions.length }, 'Refreshed position cache')
    }

    // Refresh supply pools + configs if stale (10s TTL) or if positions just changed
    if (positionsRefreshed || now - this.supplyPoolCacheUpdatedAt > this.supplyPoolCacheTtlMs) {
      const { configs, supplyPools } = await this.fetchConfigsAndSupplyPools(this.cachedPositions)
      this.cachedConfigs = configs
      this.cachedSupplyPools = supplyPools
      this.supplyPoolCacheUpdatedAt = now
      metrics.supplyPoolCacheRefreshCount?.add(1)
      this.logger.debug('Refreshed supply pool / config cache')
    }

    // Every poll: recompute margins using cached data + streaming prices
    const positionInfos: PositionInfo[] = []
    let skippedDueToMissingRegistry = 0

    for (const position of this.cachedPositions) {
      const config = this.cachedConfigs.get(position.data.configId)
      const supplyPoolX = this.cachedSupplyPools.get(position.configInfo.supplyPoolXInfo.id)
      const supplyPoolY = this.cachedSupplyPools.get(position.configInfo.supplyPoolYInfo.id)

      if (!config || !supplyPoolX || !supplyPoolY) {
        skippedDueToMissingRegistry++
        if (!config) this.missingRegistryKeysSinceLastSummary.add(position.data.configId)
        if (!supplyPoolX)
          this.missingRegistryKeysSinceLastSummary.add(position.configInfo.supplyPoolXInfo.id)
        if (!supplyPoolY)
          this.missingRegistryKeysSinceLastSummary.add(position.configInfo.supplyPoolYInfo.id)
        continue
      }

      const marginLevel = calcPositionMarginLevelWithOracle(
        position,
        supplyPoolX,
        supplyPoolY,
        this.oracleService
      )

      const assetValue = calcPositionAssetValueWithOracle(position, this.oracleService)

      positionInfos.push({
        position,
        config,
        marginLevel,
        assetValue,
        supplyPoolX,
        supplyPoolY,
      })
    }

    this.getFetchLatencyHistogram()?.record(Date.now() - start)
    this.skippedDueToMissingRegistrySinceLastSummary += skippedDueToMissingRegistry
    metrics.positionsSkippedMissingRegistryCount?.record(skippedDueToMissingRegistry)

    const filterResult = filterByLiquidationAndDeleverageNeeded(
      positionInfos,
      this.config.includeDeleveragePositions,
      this.config.minAssetValue,
      this.config.positionSkipList
    )

    metrics.liquidatePositionSkippedLowAssetValueCount?.record(
      filterResult.liquidateSkippedLowAssetValueIds.size
    )
    metrics.deleveragePositionSkippedLowAssetValueCount?.record(
      filterResult.deleverageSkippedLowAssetValueIds.size
    )

    for (const id of filterResult.liquidateAddedIds) this.liquidateAddedIdsSinceLastSummary.add(id)
    for (const id of filterResult.deleverageAddedIds)
      this.deleverageAddedIdsSinceLastSummary.add(id)
    for (const id of filterResult.liquidateSkippedLowAssetValueIds)
      this.liquidateSkippedLowValueIdsSinceLastSummary.add(id)
    for (const id of filterResult.deleverageSkippedLowAssetValueIds)
      this.deleverageSkippedLowValueIdsSinceLastSummary.add(id)
    for (const id of filterResult.nothingToDeleverageIds)
      this.nothingToDeleverageIdsSinceLastSummary.add(id)
    for (const id of filterResult.skipListIds) this.skipListHitIdsSinceLastSummary.add(id)

    return filterResult.positionsToProcess
  }

  private async notifyLiquidationNeeded(positions: Map<string, PositionInfo>): Promise<void> {
    await Promise.all(this.liquidationObservers.map(observer => observer(positions)))
  }
}
