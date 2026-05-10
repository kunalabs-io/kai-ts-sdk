import { Position } from '../../lp/position'
import { TypeArgument, PhantomTypeArgument } from '../../gen/_framework/reified'
import { PositionConfig } from '../../lp/config'
import { SupplyPool } from '../../lp/supply-pool'
import { ALL_POSITION_CONFIG_INFOS, SUPPLY_POOL_INFOS } from '../../lp'
import { BasePositionMonitor, PositionMonitorConfig } from './base-position-monitor'
import { Logger } from 'pino'
import { Histogram } from '@opentelemetry/api'
import { LiqudationBackendClient } from '../client'
import { SuiClient } from '@mysten/sui/client'
import { normalizeSuiObjectId } from '@mysten/sui/utils'
import * as metrics from '../metrics'
import {
  PositionInfo,
  calcPositionMarginLevelWithOracle,
  isPositionActive,
  calcPositionAssetValueWithOracle,
} from './utils'
import { LRUCache } from 'lru-cache'
import { OracleService } from '../../oracle'

export class RpcPositionMonitor extends BasePositionMonitor {
  private inactivePositions = new LRUCache<string, boolean>({
    ttl: 24 * 60 * 60 * 1000, // 24 hours
    ttlAutopurge: true,
  })

  constructor(
    pollIntervalMs: number,
    logger: Logger,
    private backendClient: LiqudationBackendClient,
    client: SuiClient,
    oracleService: OracleService,
    config?: PositionMonitorConfig
  ) {
    super(pollIntervalMs, logger, client, oracleService, config)
  }

  protected async fetchPositions(): Promise<
    Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>[]
  > {
    const existingPositionsIds = await this.backendClient.getExistingPositions()
    const filteredPositionIds = existingPositionsIds.filter(id => !this.inactivePositions.get(id))
    const positions = await this.getPositions(filteredPositionIds)

    return positions.filter(position => {
      const isActive = isPositionActive(position)
      if (!isActive) {
        this.inactivePositions.set(position.id, true)
      }
      return isActive
    })
  }

  protected async fetchConfigsAndSupplyPools(): Promise<{
    configs: Map<string, PositionConfig<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>>
    supplyPools: Map<string, SupplyPool<PhantomTypeArgument, PhantomTypeArgument>>
  }> {
    const configs = new Map<
      string,
      PositionConfig<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
    >()
    const supplyPools = new Map<string, SupplyPool<PhantomTypeArgument, PhantomTypeArgument>>()

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
        configs.set(configIds[index], config)
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
      supplyPools.set(
        supplyPoolIds[index],
        supplyPool as SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
      )
    })

    return { configs, supplyPools }
  }

  protected getFetchLatencyHistogram(): Histogram | undefined {
    return metrics.getActivePositionInfosRpcFetchLatencyMs
  }

  async getPositionConfig(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  ): Promise<PositionConfig<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>> {
    const configId = normalizeSuiObjectId(position.configInfo.configId)
    const cachedConfig = this.cachedConfigs.get(configId)

    if (cachedConfig) {
      return cachedConfig
    }

    const config = await position.configInfo.fetchConfig(this.client)
    this.cachedConfigs.set(configId, config)
    return config
  }

  async getSupplyPools(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  ): Promise<{
    supplyPoolX: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
    supplyPoolY: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  }> {
    const supplyPoolX = this.cachedSupplyPools.get(
      normalizeSuiObjectId(position.configInfo.supplyPoolXInfo.id)
    )
    const supplyPoolY = this.cachedSupplyPools.get(
      normalizeSuiObjectId(position.configInfo.supplyPoolYInfo.id)
    )

    if (!supplyPoolX || !supplyPoolY) {
      const [fetchedX, fetchedY] = await Promise.all([
        position.configInfo.supplyPoolXInfo.fetch(this.client),
        position.configInfo.supplyPoolYInfo.fetch(this.client),
      ])

      this.cachedSupplyPools.set(
        normalizeSuiObjectId(position.configInfo.supplyPoolXInfo.id),
        fetchedX
      )
      this.cachedSupplyPools.set(
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

  public async getPositionInfo(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  ): Promise<PositionInfo | null> {
    const [config, supplyPools] = await Promise.all([
      this.getPositionConfig(position),
      this.getSupplyPools(position),
    ])

    const { supplyPoolX, supplyPoolY } = supplyPools

    const marginLevel = calcPositionMarginLevelWithOracle(
      position,
      supplyPoolX,
      supplyPoolY,
      this.oracleService
    )

    const assetValue = calcPositionAssetValueWithOracle(position, this.oracleService)

    return {
      position,
      config,
      marginLevel,
      assetValue,
      supplyPoolX,
      supplyPoolY,
    }
  }
}
