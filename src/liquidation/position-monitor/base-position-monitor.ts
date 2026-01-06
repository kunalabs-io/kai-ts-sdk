import { Logger } from 'pino'
import { Interval } from '../interval'
import * as metrics from '../metrics'
import { SuiPriceServiceConnection } from '@pythnetwork/pyth-sui-js'
import { SuiClient } from '@mysten/sui/client'
import { PositionInfo } from './utils'
import { PriceCache } from '../../price-cache'
import { CoinInfo, SUI } from '../../coin-info'
import { PhantomTypeArgument } from '../../gen/_framework/reified'
import { POSITION_CONFIG_INFOS } from '../../lp/config'

const DEFAULT_PRICE_CACHE_REFRESH_INTERVAL_MS = 60 * 60 * 1000 // 1 hour

export interface PositionMonitor {
  onLiquidationNeeded(observer: (positions: Map<string, PositionInfo>) => Promise<void>): void
  updateSkipList(newSkipList: string[]): void
}

export interface PositionMonitorConfig {
  includeDeleveragePositions?: boolean
  minAssetValue?: number
  priceCacheRefreshIntervalMs?: number
  assetValueCoin?: CoinInfo<PhantomTypeArgument>
  positionSkipList?: string[]
}

export abstract class BasePositionMonitor extends Interval implements PositionMonitor {
  protected pythConnection: SuiPriceServiceConnection
  protected client: SuiClient
  protected config: PositionMonitorConfig
  public priceCache: PriceCache
  private lastPriceCacheRefresh: number = 0
  private liquidationObservers: ((positions: Map<string, PositionInfo>) => Promise<void>)[] = []

  constructor(
    pollIntervalMs: number,
    logger: Logger,
    pythConnection: SuiPriceServiceConnection,
    client: SuiClient,
    config: PositionMonitorConfig = {
      includeDeleveragePositions: false,
      minAssetValue: 0.01,
      priceCacheRefreshIntervalMs: DEFAULT_PRICE_CACHE_REFRESH_INTERVAL_MS,
      assetValueCoin: SUI,
      positionSkipList: [],
    }
  ) {
    super(pollIntervalMs, logger.child({ task: 'position_monitor' }))
    this.pythConnection = pythConnection
    this.client = client
    this.config = config
    this.priceCache = new PriceCache(60 * 60 * 24 * 20) // 20 days TTL
  }

  protected async poll(): Promise<void> {
    const logger = this.logger.child({ operation: 'poll' })
    logger.info('Polling...')

    metrics.monitorPollRunCount?.add(1)

    const start = Date.now()

    try {
      if (this.shouldRefreshPriceCache()) {
        this.refreshPriceCache()
      }

      const positions = await this.getPositionsToLiquidateAndDeleverage()

      if (positions.size === 0) {
        logger.info('No positions to liquidate found')

        const duration = Date.now() - start
        logger.info({ duration }, `Poll finished in ${duration}ms`)

        metrics.monitorPollRunSuccessDurationMs?.record(duration)
        return
      }

      logger.info({ positionIds: Array.from(positions.keys()) }, 'Found positions to liquidate')

      await this.notifyLiquidationNeeded(positions)
    } catch (error) {
      logger.error(error, 'Error polling for positions')
      metrics.monitorPollRunFailuresCount?.add(1)
    }

    const duration = Date.now() - start
    logger.info({ duration }, `Poll finished in ${duration}ms`)

    metrics.monitorPollRunSuccessDurationMs?.record(duration)
  }

  public onLiquidationNeeded(
    observer: (positions: Map<string, PositionInfo>) => Promise<void>
  ): void {
    this.liquidationObservers.push(observer)
  }

  public updateSkipList(newSkipList: string[]) {
    this.config.positionSkipList = newSkipList
    this.logger.info(`Updated skip list with ${newSkipList.length} positions`)
  }

  protected abstract getPositionsToLiquidateAndDeleverage(): Promise<Map<string, PositionInfo>>

  private async notifyLiquidationNeeded(positions: Map<string, PositionInfo>): Promise<void> {
    await Promise.all(this.liquidationObservers.map(observer => observer(positions)))
  }

  private shouldRefreshPriceCache(): boolean {
    const now = Date.now()
    const refreshInterval =
      this.config.priceCacheRefreshIntervalMs || DEFAULT_PRICE_CACHE_REFRESH_INTERVAL_MS
    return now - this.lastPriceCacheRefresh >= refreshInterval
  }

  private refreshPriceCache(): void {
    const logger = this.logger.child({ operation: 'refresh_price_cache' })

    const uniqueCoins = new Set<CoinInfo<PhantomTypeArgument>>()
    for (const config of POSITION_CONFIG_INFOS) {
      uniqueCoins.add(config.X)
      uniqueCoins.add(config.Y)
    }

    for (const coinInfo of uniqueCoins) {
      this.priceCache
        .getFreshPrice(coinInfo, this.config.assetValueCoin || SUI)
        .then(() => {
          logger.info({ token: coinInfo.typeName }, 'Updated price in cache')
        })
        .catch(error => {
          logger.error(error, 'Failed to fetch price')
        })
    }

    this.lastPriceCacheRefresh = Date.now()
  }
}
