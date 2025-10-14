import { Position } from '../../lp/position'
import { TypeArgument, PhantomTypeArgument } from '../../gen/_framework/reified'
import { PositionConfig } from '../../lp/config'
import { SupplyPool } from '../../lp/supply-pool'
import { ALL_POSITION_CONFIG_INFOS, SUPPLY_POOL_INFOS } from '../../lp'
import { BasePositionMonitor } from './base-position-monitor'
import { Logger } from 'pino'
import { LiqudationBackendClient } from '../client'
import { SuiClient } from '@mysten/sui/client'
import { SuiPriceServiceConnection } from '@pythnetwork/pyth-sui-js'
import { normalizeSuiObjectId } from '@mysten/sui/utils'
import * as metrics from '../metrics'
import {
  filterByLiquidationAndDeleverageNeeded,
  getPriceFeedUpdateInfo,
  PriceFeedUpdateInfo,
  PositionInfo,
  calcPositionMarginLevel,
  isPositionActive,
  calcPositionAssetValue,
} from './utils'
import { LRUCache } from 'lru-cache'
import { PositionMonitorConfig } from './base-position-monitor'
import { Price } from './../../price'
import { SUI } from './../../coin-info'

interface CacheEntry {
  allConfigs: Map<string, PositionConfig<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>>
  allSupplyPools: Map<string, SupplyPool<PhantomTypeArgument, PhantomTypeArgument>>
}

export class RpcPositionMonitor extends BasePositionMonitor {
  private cache: CacheEntry

  private inactivePositions = new LRUCache<string, boolean>({
    ttl: 24 * 60 * 60 * 1000, // 24 hours
    ttlAutopurge: true,
  })

  constructor(
    pollIntervalMs: number,
    logger: Logger,
    private backendClient: LiqudationBackendClient,
    client: SuiClient,
    pythConnection: SuiPriceServiceConnection,
    config?: PositionMonitorConfig
  ) {
    super(pollIntervalMs, logger, pythConnection, client, config)
    this.cache = this.createNewCache()
  }

  protected async getPositionsToLiquidateAndDeleverage(): Promise<Map<string, PositionInfo>> {
    const start = Date.now()

    await this.updateCache()

    const existingPositionsIds = await this.backendClient.getExistingPositions()

    const filteredPositionIds = existingPositionsIds.filter(id => !this.inactivePositions.get(id))

    const positions = await this.getPositions(filteredPositionIds)

    const activePositions = positions.filter(position => {
      const isActive = isPositionActive(position)
      if (!isActive) {
        this.inactivePositions.set(position.id, true)
      }
      return isActive
    })

    const priceFeedUpdateInfo = await getPriceFeedUpdateInfo(
      activePositions,
      this.pythConnection,
      this.client
    )

    const positionInfos: PositionInfo[] = []

    for (const position of activePositions) {
      const xPrice = this.priceCache.getCachedPrice(position.X, this.config.assetValueCoin || SUI)
      const yPrice = this.priceCache.getCachedPrice(position.Y, this.config.assetValueCoin || SUI)
      const prices = { x: xPrice, y: yPrice }

      const info = await this.getPositionInfo(position, priceFeedUpdateInfo, prices)
      if (info !== null) {
        positionInfos.push(info)
      }
    }

    metrics.getActivePositionInfosRpcFetchLatencyMs?.record(Date.now() - start)

    return filterByLiquidationAndDeleverageNeeded(
      positionInfos,
      this.logger,
      this.config.includeDeleveragePositions,
      this.config.minAssetValue,
      this.config.positionSkipList
    )
  }

  async getPositionConfig(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  ): Promise<PositionConfig<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>> {
    const configId = normalizeSuiObjectId(position.configInfo.configId)
    const cachedConfig = this.cache.allConfigs.get(configId)

    if (cachedConfig) {
      return cachedConfig
    }

    const config = await position.configInfo.fetchConfig(this.client)
    this.cache.allConfigs.set(configId, config)
    return config
  }

  async getSupplyPools(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  ): Promise<{
    supplyPoolX: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
    supplyPoolY: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  }> {
    const supplyPoolX = this.cache.allSupplyPools.get(
      normalizeSuiObjectId(position.configInfo.supplyPoolXInfo.id)
    )
    const supplyPoolY = this.cache.allSupplyPools.get(
      normalizeSuiObjectId(position.configInfo.supplyPoolYInfo.id)
    )

    if (!supplyPoolX || !supplyPoolY) {
      const [fetchedX, fetchedY] = await Promise.all([
        position.configInfo.supplyPoolXInfo.fetch(this.client),
        position.configInfo.supplyPoolYInfo.fetch(this.client),
      ])

      this.cache.allSupplyPools.set(
        normalizeSuiObjectId(position.configInfo.supplyPoolXInfo.id),
        fetchedX
      )
      this.cache.allSupplyPools.set(
        normalizeSuiObjectId(position.configInfo.supplyPoolYInfo.id),
        fetchedY
      )

      return { supplyPoolX: fetchedX, supplyPoolY: fetchedY }
    }

    return { supplyPoolX, supplyPoolY }
  }

  async getPositions(
    ids: string[]
  ): Promise<Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>[]> {
    const batchSize = 50
    const results: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>[] = []

    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize)
      const batchRes = await this.client.multiGetObjects({
        ids: batch,
        options: {
          showBcs: true,
        },
      })

      for (const obj of batchRes) {
        if (!obj.data) {
          throw new Error(`No data found in response for a Position`)
        }
        results.push(Position.fromSuiObjectData(obj.data))
      }
    }

    return results
  }

  private createNewCache(): CacheEntry {
    return {
      allConfigs: new Map(),
      allSupplyPools: new Map(),
    }
  }

  private async populateCache(): Promise<void> {
    const configIds = Array.from(ALL_POSITION_CONFIG_INFOS.values()).map(info =>
      normalizeSuiObjectId(info.configId)
    )
    const supplyPoolIds = Object.values(SUPPLY_POOL_INFOS).map(info =>
      normalizeSuiObjectId(info.id)
    )

    const [configObjects, supplyPoolObjects] = await Promise.all([
      this.client.multiGetObjects({
        ids: configIds,
        options: { showContent: true, showBcs: true },
      }),
      this.client.multiGetObjects({
        ids: supplyPoolIds,
        options: { showContent: true },
      }),
    ])

    configObjects.forEach((obj, index) => {
      if (!obj.data) {
        throw new Error(`No data found in response for a Position Config`)
      }

      const configInfo = ALL_POSITION_CONFIG_INFOS.get(configIds[index])
      if (!configInfo) {
        throw new Error(`No config info found for config ${configIds[index]}`)
      }

      const config = PositionConfig.fromSuiObjectData(obj.data)
      if (config) {
        this.cache.allConfigs.set(configIds[index], config)
      }
    })

    supplyPoolObjects.forEach((obj, index) => {
      if (!obj.data) {
        throw new Error(`No data found in response for a Supply Pool`)
      }

      const supplyPoolInfo = Object.values(SUPPLY_POOL_INFOS).find(
        info => normalizeSuiObjectId(info.id) === supplyPoolIds[index]
      )
      if (!supplyPoolInfo) {
        throw new Error(`No supply pool info found for supply pool ${supplyPoolIds[index]}`)
      }

      const supplyPool = supplyPoolInfo.fromSuiObjectData(obj.data)
      this.cache.allSupplyPools.set(
        supplyPoolIds[index],
        supplyPool as SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
      )
    })
  }

  private async updateCache(): Promise<void> {
    this.cache = this.createNewCache()
    await this.populateCache()
  }

  public async getPositionInfo(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceFeedUpdateInfo: PriceFeedUpdateInfo,
    prices: {
      x: Price<PhantomTypeArgument, PhantomTypeArgument> | undefined
      y: Price<PhantomTypeArgument, PhantomTypeArgument> | undefined
    }
  ): Promise<PositionInfo | null> {
    const [config, supplyPools] = await Promise.all([
      this.getPositionConfig(position),
      this.getSupplyPools(position),
    ])

    const { supplyPoolX, supplyPoolY } = supplyPools

    const marginLevel = calcPositionMarginLevel({
      position,
      supplyPoolX,
      supplyPoolY,
      allPriceFeeds: priceFeedUpdateInfo.priceFeeds,
    })

    const assetValue = calcPositionAssetValue(
      position,
      priceFeedUpdateInfo.priceFeeds,
      this.config.assetValueCoin || SUI,
      prices
    )

    return {
      position,
      config,
      marginLevel,
      assetValue,
      priceFeedUpdateInfo,
    }
  }
}
