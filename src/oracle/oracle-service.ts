import { PriceUpdate, SuiPriceServiceConnection } from '@pythnetwork/pyth-sui-js'
import { normalizeSuiAddress } from '@mysten/sui/utils'
import { ClientWithCoreApi } from '@mysten/sui/client'
import Decimal from 'decimal.js'
import { Logger } from 'pino'
import { Counter, Gauge, Meter } from '@opentelemetry/api'
import { POSITION_CONFIG_INFOS, PositionConfigInfo } from '../lp/config'
import { Position } from '../lp/position'
import { SupplyPool } from '../lp/supply-pool'
import { Price } from '../price'
import { Amount } from '../amount'
import { CoinInfo, USDC } from '../coin-info'
import { PhantomTypeArgument, TypeArgument } from '../gen/_framework/reified'
import { State } from '../gen/pyth/state/structs'
import { PriceInfoObject as PriceInfoObject_ } from '../gen/pyth/price-info/structs'
import { PYTH_STATE_ID } from '../protocol-infra'
import { PriceFeedUpdateInfo } from '../liquidation/position-monitor/utils'
import { PriceFeedInfo, PriceInfoObject, pythPrice } from '../pyth'

type ParsedPriceFeed = NonNullable<PriceUpdate['parsed']>[number]
type PriceUpdatesStream = Awaited<ReturnType<SuiPriceServiceConnection['getPriceUpdatesStream']>>

// ============================================================================
// Types (merged from types.ts)
// ============================================================================

export interface OracleServiceConfig {
  /** Sui client for on-chain queries */
  client: ClientWithCoreApi
  /** Logger for warnings and debug info */
  logger: Logger
  /** Pyth Hermes endpoint URL. Default: https://hermes.pyth.network */
  pythHermesUrl?: string
  /** Pyth Hermes API key (Bearer token). Required by authenticated Hermes endpoints. */
  pythHermesApiKey?: string
  /**
   * Price fetch mode. Default: 'streaming'.
   * - 'streaming': Hermes SSE stream
   * - 'polling': Hermes REST polling
   * - 'onchain': read prices from the on-chain PriceInfoObjects (kept fresh by
   *   Pyth's sponsored pusher) — no Hermes connection at all. Price updates
   *   cannot be built in this mode ({@link OracleService.supportsPriceUpdates}).
   */
  mode?: 'streaming' | 'polling' | 'onchain'
  /** Polling interval in milliseconds (polling mode only). Default: 1000 */
  pollingIntervalMs?: number
  /** On-chain staleness check interval in milliseconds. Default: 10000 */
  onChainPollIntervalMs?: number
  /** Max allowed price staleness in seconds. Default: 60. Throws if price older. */
  maxPriceStalenessSec?: number
  /** OpenTelemetry Meter for Prometheus metrics. Optional - metrics disabled if not provided. */
  meter?: Meter
}

export interface OracleMetrics {
  /** Whether WebSocket is connected (streaming mode) */
  websocketConnected: boolean
  /** Total price updates received */
  priceUpdateCount: number
  /** Per-feed staleness in seconds */
  feedStaleness: Map<string, number>
  /** Per-feed on-chain staleness in seconds */
  onChainStaleness: Map<string, number>
  /** Number of times on-chain update was triggered */
  updateTriggeredCount: number
  /** Whether service is healthy */
  healthy: boolean
}

interface CachedOnChainPriceData {
  /** Arrival time of the price on-chain in seconds */
  arrivalTimeSec: number
  /** When this data was fetched */
  fetchedAtMs: number
}

/**
 * Result of fetching fresh on-chain PIO data
 */
export interface OnChainPriceData {
  pioX: PriceInfoObject<PhantomTypeArgument>
  pioY: PriceInfoObject<PhantomTypeArgument>
  stalenessXSec: number
  stalenessYSec: number
  price: Price<PhantomTypeArgument, PhantomTypeArgument>
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_PYTH_HERMES_URL = 'https://hermes.pyth.network'
const DEFAULT_POLLING_INTERVAL_MS = 1000
const DEFAULT_ON_CHAIN_POLL_INTERVAL_MS = 10000
const DEFAULT_MAX_PRICE_STALENESS_SEC = 60
const HEALTH_CHECK_MAX_STALE_MS = 30000 // 30 seconds
const HEALTH_CHECK_INTERVAL_MS = 30000 // 30 seconds

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extracts price from a Pyth price feed as a Decimal USD value
 */
function getPriceUsdFromFeed(feed: ParsedPriceFeed): Decimal {
  const price = feed.price
  return new Decimal(price.price).mul(new Decimal(10).pow(price.expo))
}

/**
 * Converts an on-chain PriceInfoObject to the Hermes ParsedPriceFeed shape so
 * the rest of the service is agnostic to where the price came from.
 * Exported for testing.
 */
export function parsedFeedFromPio(feedId: string, pio: PriceInfoObject_): ParsedPriceFeed {
  const toRpcPrice = (p: PriceInfoObject_['priceInfo']['priceFeed']['price']) => ({
    price: `${p.price.negative && p.price.magnitude !== 0n ? '-' : ''}${p.price.magnitude}`,
    conf: p.conf.toString(),
    expo: Number(p.expo.magnitude) * (p.expo.negative ? -1 : 1),
    publish_time: Number(p.timestamp),
  })

  const priceFeed = pio.priceInfo.priceFeed
  return {
    id: feedId,
    price: toRpcPrice(priceFeed.price),
    ema_price: toRpcPrice(priceFeed.emaPrice),
    metadata: {},
  }
}

/**
 * Converts two Pyth price feeds to a Price<X, Y> object
 */
function priceFromPythFeeds<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
  feedX: ParsedPriceFeed,
  infoX: CoinInfo<X>,
  feedY: ParsedPriceFeed,
  infoY: CoinInfo<Y>
): Price<X, Y> {
  const priceX = getPriceUsdFromFeed(feedX) // USD / X
  const priceY = getPriceUsdFromFeed(feedY) // USD / Y
  return Price.fromHuman(infoX, infoY, priceX.div(priceY))
}

// ============================================================================
// Prometheus Metrics
// ============================================================================

interface OraclePrometheusMetrics {
  websocketConnected: Gauge
  priceUpdateCount: Counter
  priceAgeSec: Gauge
  onChainStalenessSec: Gauge
  updateTriggeredCount: Counter
  health: Gauge
}

function createOracleMetrics(meter: Meter): OraclePrometheusMetrics {
  return {
    websocketConnected: meter.createGauge('oracle_websocket_connected', {
      description: 'Whether WebSocket is connected to Pyth',
    }),
    priceUpdateCount: meter.createCounter('oracle_price_update_count', {
      description: 'Total price updates received',
    }),
    priceAgeSec: meter.createGauge('oracle_price_age_sec', {
      description: 'Age of price feed in seconds',
    }),
    onChainStalenessSec: meter.createGauge('oracle_on_chain_staleness_sec', {
      description: 'On-chain staleness in seconds',
    }),
    updateTriggeredCount: meter.createCounter('oracle_update_triggered_count', {
      description: 'Number of times on-chain update was triggered',
    }),
    health: meter.createGauge('oracle_health', {
      description: 'Whether oracle service is healthy (1=healthy, 0=unhealthy)',
    }),
  }
}

// ============================================================================
// OracleService
// ============================================================================

/**
 * OracleService provides centralized price management for the liquidation system.
 *
 * Features:
 * - Streams prices via WebSocket from Pyth (with polling fallback), or reads
 *   them from the on-chain PriceInfoObjects ('onchain' mode, no Hermes at all)
 * - Provides fresh margin level calculation at execution time
 * - Tracks on-chain price staleness for update decisions
 * - Uses Pyth as single source for both margin and asset value calculations
 * - Per-feed staleness checking (only update feeds that are actually stale)
 * - Stale price protection (throws if prices are too old)
 * - Internal health monitoring with Prometheus metrics
 *
 * @example
 * ```typescript
 * const oracleService = new OracleService({
 *   client: suiClient,
 *   logger: logger,
 *   mode: 'streaming',
 * })
 * await oracleService.start()
 *
 * // Get fresh price for a position (throws if stale)
 * const price = oracleService.getPrice(position.configInfo)
 *
 * // Calculate margin level with fresh prices (throws if stale)
 * const marginLevel = oracleService.calcMarginLevel(position, supplyPoolX, supplyPoolY)
 *
 * // Get price update data for feeds
 * const updateInfo = await oracleService.getPriceFeedUpdateInfo([
 *   position.configInfo.pioInfoX,
 *   position.configInfo.pioInfoY,
 * ])
 * ```
 */
export class OracleService {
  private readonly config: Required<Omit<OracleServiceConfig, 'meter' | 'pythHermesApiKey'>> & {
    meter?: Meter
    pythHermesApiKey?: string
  }
  private readonly logger: Logger
  /** null in 'onchain' mode — no Hermes connection is made at all. */
  private readonly pythConnection: SuiPriceServiceConnection | null
  private readonly feedIds: string[]
  private readonly feedIdToPioMap: Map<string, string>
  private readonly coinTypeToFeedId: Map<string, string> = new Map()

  // Price state
  private priceFeeds: Map<string, ParsedPriceFeed> = new Map()
  private lastUpdateTime: Map<string, number> = new Map()

  // On-chain staleness tracking
  private onChainData: Map<string, CachedOnChainPriceData> = new Map()
  private pythBaseUpdateFee: bigint = 0n

  // Service state
  private mode: 'streaming' | 'polling' | 'onchain'
  private running = false
  private pollingInterval: ReturnType<typeof setInterval> | null = null
  private onChainPollInterval: ReturnType<typeof setInterval> | null = null
  private healthCheckInterval: ReturnType<typeof setInterval> | null = null
  private eventSource: PriceUpdatesStream | null = null
  private priceUpdateCount = 0
  private updateTriggeredCount = 0

  // Prometheus metrics
  private prometheusMetrics?: OraclePrometheusMetrics

  constructor(config: OracleServiceConfig) {
    this.logger = config.logger.child({ task: 'oracle_service' })

    this.config = {
      client: config.client,
      logger: config.logger,
      pythHermesUrl: config.pythHermesUrl ?? DEFAULT_PYTH_HERMES_URL,
      pythHermesApiKey: config.pythHermesApiKey,
      mode: config.mode ?? 'streaming',
      pollingIntervalMs: config.pollingIntervalMs ?? DEFAULT_POLLING_INTERVAL_MS,
      onChainPollIntervalMs: config.onChainPollIntervalMs ?? DEFAULT_ON_CHAIN_POLL_INTERVAL_MS,
      maxPriceStalenessSec: config.maxPriceStalenessSec ?? DEFAULT_MAX_PRICE_STALENESS_SEC,
      meter: config.meter,
    }

    this.mode = this.config.mode

    // Create Pyth connection internally ('onchain' mode never talks to Hermes)
    this.pythConnection =
      this.mode === 'onchain'
        ? null
        : new SuiPriceServiceConnection(this.config.pythHermesUrl, {
            accessToken: this.config.pythHermesApiKey,
          })

    // Collect all unique feed IDs from position configs
    const { feedIds, feedIdToPioMap } = this.collectFeedInfo()
    this.feedIds = feedIds
    this.feedIdToPioMap = feedIdToPioMap

    // Initialize Prometheus metrics if meter provided
    if (this.config.meter) {
      this.prometheusMetrics = createOracleMetrics(this.config.meter)
    }
  }

  /**
   * Collects all unique price feed IDs and their corresponding PriceInfoObject IDs
   * from the position configuration. Also builds coinInfo lookup by feed ID.
   */
  private collectFeedInfo(): { feedIds: string[]; feedIdToPioMap: Map<string, string> } {
    const feedIdSet = new Set<string>()
    const feedIdToPioMap = new Map<string, string>()

    for (const config of POSITION_CONFIG_INFOS) {
      const feedIdX = normalizeSuiAddress(config.pioInfoX.priceFeedId)
      const feedIdY = normalizeSuiAddress(config.pioInfoY.priceFeedId)

      feedIdSet.add(feedIdX)
      feedIdSet.add(feedIdY)

      feedIdToPioMap.set(feedIdX, config.pioInfoX.priceInfoObjectId)
      feedIdToPioMap.set(feedIdY, config.pioInfoY.priceInfoObjectId)

      // Build coin type -> feed ID lookup (supports multiple coins sharing one feed)
      this.coinTypeToFeedId.set(config.X.typeName, feedIdX)
      this.coinTypeToFeedId.set(config.Y.typeName, feedIdY)
    }

    return {
      feedIds: Array.from(feedIdSet),
      feedIdToPioMap,
    }
  }

  /**
   * Starts the oracle service.
   * Begins streaming/polling prices and tracking on-chain staleness.
   */
  async start(): Promise<void> {
    if (this.running) {
      return
    }

    this.running = true

    if (this.mode === 'onchain') {
      // On-chain polling is the price source; fail loudly if the initial
      // fetch doesn't cover every feed. The base update fee is not needed
      // since price updates can't be built in this mode.
      await this.fetchOnChainDataOnce()
      for (const feedId of this.feedIds) {
        if (!this.priceFeeds.has(feedId)) {
          throw new Error(`Failed to fetch initial on-chain price for feed ${feedId}`)
        }
      }
    } else {
      // Fetch initial prices and base update fee
      await Promise.all([this.fetchInitialPrices(), this.fetchPythBaseUpdateFee()])

      // Start price streaming/polling
      if (this.mode === 'streaming') {
        await this.startStreaming()
      } else {
        this.startPolling()
      }
    }

    // Start on-chain staleness tracking (and, in 'onchain' mode, prices)
    this.startOnChainPolling()

    // Start internal health monitoring
    this.startHealthMonitoring()

    this.logger.info({ mode: this.mode, feedCount: this.feedIds.length }, 'OracleService started')
  }

  /**
   * Stops the oracle service and cleans up resources.
   */
  stop(): void {
    this.running = false

    // Stop polling if active
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
    }

    if (this.onChainPollInterval) {
      clearInterval(this.onChainPollInterval)
      this.onChainPollInterval = null
    }

    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
      this.healthCheckInterval = null
    }

    // Close the Pyth SSE stream
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }

    this.logger.info('OracleService stopped')
  }

  /**
   * Fetches initial prices from Pyth before starting streaming/polling.
   */
  private async fetchInitialPrices(): Promise<void> {
    if (!this.pythConnection) {
      throw new Error('No Hermes connection in onchain mode')
    }
    const feeds = (await this.pythConnection.getLatestPriceUpdates(this.feedIds, { parsed: true }))
      .parsed

    if (!feeds) {
      throw new Error('Failed to fetch initial price feeds from Pyth')
    }

    const now = Date.now()
    for (const feed of feeds) {
      const normalizedId = normalizeSuiAddress(feed.id)
      this.priceFeeds.set(normalizedId, feed)
      this.lastUpdateTime.set(normalizedId, now)
    }
  }

  /**
   * Fetches the Pyth base update fee from on-chain state.
   */
  private async fetchPythBaseUpdateFee(): Promise<void> {
    const pythState = await State.fetch(this.config.client, PYTH_STATE_ID)

    this.pythBaseUpdateFee = pythState.baseUpdateFee
  }

  /**
   * Starts WebSocket streaming for price updates.
   */
  private async startStreaming(): Promise<void> {
    if (!this.pythConnection) {
      throw new Error('No Hermes connection in onchain mode')
    }
    // pyth-sui-js v3 streams via Hermes SSE (EventSource); each message is a PriceUpdate.
    const eventSource = await this.pythConnection.getPriceUpdatesStream(this.feedIds, {
      parsed: true,
    })
    eventSource.onmessage = event => {
      const update = JSON.parse(event.data) as PriceUpdate
      const now = Date.now()
      for (const priceFeed of update.parsed ?? []) {
        const normalizedId = normalizeSuiAddress(priceFeed.id)
        this.priceFeeds.set(normalizedId, priceFeed)
        this.lastUpdateTime.set(normalizedId, now)
        this.priceUpdateCount++
        this.prometheusMetrics?.priceUpdateCount.add(1)
      }
    }
    eventSource.onerror = error => {
      this.logger.warn({ err: error }, 'Pyth price stream error')
    }
    this.eventSource = eventSource
  }

  /**
   * Starts periodic polling for price updates.
   */
  private startPolling(): void {
    const pythConnection = this.pythConnection
    if (!pythConnection) {
      throw new Error('No Hermes connection in onchain mode')
    }
    this.pollingInterval = setInterval(async () => {
      try {
        const feeds = (await pythConnection.getLatestPriceUpdates(this.feedIds, { parsed: true }))
          .parsed

        if (feeds) {
          const now = Date.now()
          for (const feed of feeds) {
            const normalizedId = normalizeSuiAddress(feed.id)
            this.priceFeeds.set(normalizedId, feed)
            this.lastUpdateTime.set(normalizedId, now)
            this.priceUpdateCount++
            this.prometheusMetrics?.priceUpdateCount.add(1)
          }
        }
      } catch (error) {
        this.logger.warn({ err: error }, 'Failed to poll price feeds')
      }
    }, this.config.pollingIntervalMs)
  }

  /**
   * Starts periodic polling for on-chain staleness data.
   */
  private startOnChainPolling(): void {
    // Initial fetch
    void this.fetchOnChainData()

    this.onChainPollInterval = setInterval(async () => {
      await this.fetchOnChainData()
    }, this.config.onChainPollIntervalMs)
  }

  /**
   * Starts internal health monitoring with Prometheus metrics.
   */
  private startHealthMonitoring(): void {
    this.healthCheckInterval = setInterval(() => {
      const healthy = this.isHealthy()
      this.prometheusMetrics?.health.record(healthy ? 1 : 0)

      if (!healthy) {
        this.logger.warn('OracleService health check failed - prices may be stale')
      }

      // Update per-feed staleness metrics
      const now = Date.now()
      for (const feedId of this.feedIds) {
        const lastUpdate = this.lastUpdateTime.get(feedId)
        const ageMs = lastUpdate ? now - lastUpdate : Infinity
        const ageSec = ageMs === Infinity ? -1 : ageMs / 1000
        this.prometheusMetrics?.priceAgeSec.record(ageSec, { feedId })

        try {
          const onChainAge = this.getOnChainStaleness(feedId)
          this.prometheusMetrics?.onChainStalenessSec.record(onChainAge, { feedId })
        } catch {
          // Skip if no on-chain data yet
        }
      }

      this.prometheusMetrics?.websocketConnected.record(
        this.mode === 'streaming' && this.running ? 1 : 0
      )
    }, HEALTH_CHECK_INTERVAL_MS)
  }

  /**
   * Fetches on-chain arrival times for all tracked price feeds.
   * In 'onchain' mode this is also the price source: each PIO's price is
   * converted to the Hermes feed shape and stored in the price cache.
   * Throws on fetch failure (the polling wrapper catches).
   */
  private async fetchOnChainDataOnce(): Promise<void> {
    const pioIds = Array.from(this.feedIdToPioMap.values())
    const uniquePioIds = [...new Set(pioIds)]

    const { objects } = await this.config.client.core.getObjects({
      objectIds: uniquePioIds,
      include: { content: true },
    })

    const now = Date.now()

    for (let i = 0; i < uniquePioIds.length; i++) {
      const obj = objects[i]
      if (obj instanceof Error) {
        continue
      }

      const pio = PriceInfoObject_.fromCoreObject(obj)
      const arrivalTime = pio.priceInfo.arrivalTime

      // Find which feed ID(s) map to this PIO
      for (const [feedId, pioId] of this.feedIdToPioMap.entries()) {
        if (pioId === uniquePioIds[i]) {
          this.onChainData.set(feedId, {
            arrivalTimeSec: Number(arrivalTime),
            fetchedAtMs: now,
          })

          if (this.mode === 'onchain') {
            const feed = parsedFeedFromPio(feedId, pio)
            const prev = this.priceFeeds.get(feedId)
            this.priceFeeds.set(feedId, feed)
            // Freshness is the on-chain publish time, so staleness checks
            // measure the actual price age the contract will see.
            this.lastUpdateTime.set(feedId, feed.price.publish_time * 1000)
            if (prev?.price.publish_time !== feed.price.publish_time) {
              this.priceUpdateCount++
              this.prometheusMetrics?.priceUpdateCount.add(1)
            }
          }
        }
      }
    }
  }

  private async fetchOnChainData(): Promise<void> {
    try {
      await this.fetchOnChainDataOnce()
    } catch (error) {
      this.logger.warn({ err: error }, 'Failed to fetch on-chain price data')
    }
  }

  /**
   * Switches between streaming and polling modes.
   * Useful for incident response when WebSocket has issues.
   * Not available for services constructed in 'onchain' mode (no Hermes
   * connection exists), and 'onchain' cannot be switched to.
   */
  async switchMode(mode: 'streaming' | 'polling'): Promise<void> {
    if (this.mode === 'onchain') {
      throw new Error('Cannot switch mode: service was constructed in onchain mode')
    }
    if (mode === this.mode) {
      return
    }

    // Stop current mode
    if (this.mode === 'streaming') {
      if (this.eventSource) {
        this.eventSource.close()
        this.eventSource = null
      }
    } else {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval)
        this.pollingInterval = null
      }
    }

    // Start new mode
    this.mode = mode
    if (mode === 'streaming') {
      await this.startStreaming()
    } else {
      this.startPolling()
    }

    this.logger.info({ mode }, 'OracleService switched mode')
  }

  /**
   * Validates that a price feed is fresh enough for use.
   * Throws if the price is stale.
   */
  private assertPriceFresh(feedId: string): void {
    const normalizedId = normalizeSuiAddress(feedId)
    const lastUpdate = this.lastUpdateTime.get(normalizedId)

    if (!lastUpdate) {
      throw new Error(`No price data available for feed ${feedId}`)
    }

    const ageMs = Date.now() - lastUpdate
    const ageSec = ageMs / 1000

    if (ageSec > this.config.maxPriceStalenessSec) {
      throw new Error(
        `Price feed ${feedId} is stale: ${ageSec.toFixed(1)}s old, max allowed ${this.config.maxPriceStalenessSec}s`
      )
    }
  }

  /**
   * Gets the cached price feed for a given feed ID.
   * Throws if the feed is not available.
   */
  getPriceFeed(feedId: string): ParsedPriceFeed {
    const normalizedId = normalizeSuiAddress(feedId)
    const feed = this.priceFeeds.get(normalizedId)
    if (!feed) {
      throw new Error(`Price feed not found for ${feedId}`)
    }
    return feed
  }

  /**
   * Gets the pool price (X/Y) for a position config using cached Pyth feeds.
   * Throws if either price feed is stale.
   */
  getPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    configInfo: PositionConfigInfo<X, Y, TypeArgument>
  ): Price<X, Y> {
    const feedIdX = normalizeSuiAddress(configInfo.pioInfoX.priceFeedId)
    const feedIdY = normalizeSuiAddress(configInfo.pioInfoY.priceFeedId)

    // Validate freshness before returning
    this.assertPriceFresh(feedIdX)
    this.assertPriceFresh(feedIdY)

    const feedX = this.priceFeeds.get(feedIdX)
    const feedY = this.priceFeeds.get(feedIdY)

    if (!feedX) {
      throw new Error(`Price feed X not found for config ${configInfo.name}`)
    }
    if (!feedY) {
      throw new Error(`Price feed Y not found for config ${configInfo.name}`)
    }

    return priceFromPythFeeds(feedX, configInfo.X, feedY, configInfo.Y)
  }

  /**
   * Gets the USD price for a coin using cached Pyth feeds.
   * Throws if the price feed is stale.
   * Returns the price in USD as a Decimal.
   */
  getAssetPriceUsd<T extends PhantomTypeArgument>(coinInfo: CoinInfo<T>): Decimal {
    const feedId = this.coinTypeToFeedId.get(coinInfo.typeName)
    if (!feedId) {
      throw new Error(`No Pyth feed found for coin ${coinInfo.typeName}`)
    }

    this.assertPriceFresh(feedId)

    const feed = this.priceFeeds.get(feedId)
    if (!feed) {
      throw new Error(`Price feed data not available for ${feedId}`)
    }

    return getPriceUsdFromFeed(feed)
  }

  /**
   * Calculates the margin level for a position using fresh prices.
   * This should be called at execution time for the most accurate result.
   * Throws if prices are stale.
   */
  calcMarginLevel<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    position: Position<X, Y, TypeArgument>,
    supplyPoolX: SupplyPool<X, PhantomTypeArgument>,
    supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  ): Decimal {
    // getPrice already validates freshness
    const currentPrice = this.getPrice(position.configInfo)

    return position.calcMarginLevel({
      currentPrice,
      supplyPoolX,
      supplyPoolY,
      timestampMs: Date.now(),
    })
  }

  /**
   * Calculates the asset value of a position in USD using fresh Pyth prices.
   * Throws if prices are stale.
   *
   * Note: Uses oracle (Pyth) price as the X/Y exchange rate, not the pool (CLMM) price.
   * The pool price determines the true asset ratio in a concentrated liquidity position,
   * but we use oracle price for simplicity.
   */
  calcAssetValueUsd<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    position: Position<X, Y, TypeArgument>
  ): Decimal {
    const poolPrice = this.getPrice(position.configInfo)
    const xPriceUsd = this.getAssetPriceUsd(position.X)
    const yPriceUsd = this.getAssetPriceUsd(position.Y)

    const xPriceT = Price.fromHuman(position.X, USDC, xPriceUsd)
    const yPriceT = Price.fromHuman(position.Y, USDC, yPriceUsd)

    const assetValue = position.calcAssetValue({
      poolPrice,
      xPriceT,
      yPriceT,
    })

    return Amount.fromInt(assetValue, USDC.decimals).toDecimal()
  }

  /**
   * Gets price feed update info for the specified feeds.
   * Async because it fetches update data from Pyth.
   *
   * @param feeds - PriceFeedInfo objects to get update data for
   * @returns Price feed update info for building transactions
   */
  async getPriceFeedUpdateInfo(
    feeds: PriceFeedInfo<PhantomTypeArgument>[]
  ): Promise<PriceFeedUpdateInfo> {
    const pythConnection = this.pythConnection
    if (!pythConnection) {
      throw new Error('Price feed updates are not available in onchain mode (no Hermes connection)')
    }
    if (feeds.length === 0) {
      throw new Error('No feeds to update')
    }

    const feedIds = feeds.map(f => normalizeSuiAddress(f.priceFeedId))
    const priceInfoObjectIds = feeds.map(f => f.priceInfoObjectId)

    const priceFeeds: ParsedPriceFeed[] = []
    for (const feedId of feedIds) {
      const feed = this.priceFeeds.get(feedId)
      if (!feed) {
        throw new Error(`Price feed not found for ${feedId}`)
      }
      priceFeeds.push(feed)
    }

    const priceFeedsUpdateData = await this.pythConnection.getPriceFeedsUpdateData(feedIds)

    return {
      feedIds,
      priceInfoObjectIds,
      priceFeeds,
      priceFeedsUpdateData,
      baseUpdateFee: this.pythBaseUpdateFee,
    }
  }

  /**
   * Whether this service can build price feed update data for transactions.
   * False in 'onchain' mode — callers must rely on the sponsored pusher
   * keeping the on-chain feeds fresh.
   */
  get supportsPriceUpdates(): boolean {
    return this.pythConnection !== null
  }

  /**
   * Fetches fresh on-chain PIO data for a position config.
   * This bypasses the cached on-chain data and fetches directly from RPC.
   */
  async fetchFreshOnChainPrices<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    configInfo: PositionConfigInfo<X, Y, TypeArgument>
  ): Promise<OnChainPriceData> {
    const [pioX, pioY] = await Promise.all([
      configInfo.pioInfoX.fetchPioData(this.config.client),
      configInfo.pioInfoY.fetchPioData(this.config.client),
    ])

    const nowSec = Math.floor(Date.now() / 1000)
    const stalenessXSec = nowSec - Number(pioX.data.priceInfo.priceFeed.price.timestamp)
    const stalenessYSec = nowSec - Number(pioY.data.priceInfo.priceFeed.price.timestamp)

    const price = pythPrice(pioX, pioY)

    return {
      pioX: pioX as PriceInfoObject<PhantomTypeArgument>,
      pioY: pioY as PriceInfoObject<PhantomTypeArgument>,
      stalenessXSec,
      stalenessYSec,
      price: price as Price<PhantomTypeArgument, PhantomTypeArgument>,
    }
  }

  /**
   * Calculates margin level using on-chain PIO data (not streaming prices).
   */
  calcMarginLevelFromOnChain<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    position: Position<X, Y, TypeArgument>,
    supplyPoolX: SupplyPool<X, PhantomTypeArgument>,
    supplyPoolY: SupplyPool<Y, PhantomTypeArgument>,
    onChainData: OnChainPriceData
  ): Decimal {
    return position.calcMarginLevel({
      currentPrice: onChainData.price as Price<X, Y>,
      supplyPoolX,
      supplyPoolY,
      timestampMs: Date.now(),
    })
  }

  /**
   * Gets the on-chain staleness (in seconds) for a specific feed.
   * Returns how long ago the price was updated on-chain.
   * Throws if no on-chain data is available.
   */
  getOnChainStaleness(feedId: string): number {
    const normalizedId = normalizeSuiAddress(feedId)
    const data = this.onChainData.get(normalizedId)

    if (!data) {
      throw new Error(
        `No on-chain data available for feed ${feedId}. Has fetchOnChainData() completed?`
      )
    }

    const nowSec = Math.floor(Date.now() / 1000)
    return nowSec - data.arrivalTimeSec
  }

  /**
   * Checks if the oracle service is healthy.
   * Returns false if any price feed hasn't updated in 30 seconds (Hermes
   * modes) or is older than the max staleness ('onchain' mode, where normal
   * age is pusher heartbeat + poll interval).
   */
  isHealthy(): boolean {
    if (!this.running) {
      return false
    }

    const maxStaleMs =
      this.mode === 'onchain' ? this.config.maxPriceStalenessSec * 1000 : HEALTH_CHECK_MAX_STALE_MS
    const now = Date.now()

    for (const feedId of this.feedIds) {
      const lastUpdate = this.lastUpdateTime.get(feedId)
      if (!lastUpdate || now - lastUpdate > maxStaleMs) {
        return false
      }
    }

    return true
  }

  /**
   * Gets metrics about the oracle service state.
   */
  getMetrics(): OracleMetrics {
    const feedStaleness = new Map<string, number>()
    const onChainStaleness = new Map<string, number>()
    const now = Date.now()

    for (const feedId of this.feedIds) {
      const lastUpdate = this.lastUpdateTime.get(feedId)
      feedStaleness.set(feedId, lastUpdate ? (now - lastUpdate) / 1000 : Infinity)

      try {
        const onChainStale = this.getOnChainStaleness(feedId)
        onChainStaleness.set(feedId, onChainStale)
      } catch {
        onChainStaleness.set(feedId, Infinity)
      }
    }

    return {
      websocketConnected: this.mode === 'streaming' && this.running,
      priceUpdateCount: this.priceUpdateCount,
      feedStaleness,
      onChainStaleness,
      updateTriggeredCount: this.updateTriggeredCount,
      healthy: this.isHealthy(),
    }
  }
}
