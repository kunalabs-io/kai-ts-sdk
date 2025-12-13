import { Counter, Histogram, Meter, Gauge } from '@opentelemetry/api'

export let monitorPollRunCount: Counter | undefined
export let monitorPollRunFailuresCount: Counter | undefined
export let monitorPollRunSuccessDurationMs: Histogram | undefined
export let getActivePositionInfosRpcFetchLatencyMs: Histogram | undefined
export let positionsToProcessCount: Gauge | undefined
export let excludedPositionsCount: Gauge | undefined
export let recentlyProcessedPositionsCount: Gauge | undefined
export let liquidateOrDeleveragePositionDurationMs: Histogram | undefined
export let workerLiquidateOrDeleverageCallAttemptsCount: Counter | undefined
export let workerLiquidateOrDeleverageCallFailuresCount: Counter | undefined
export let liquidatePositionAttemptCount: Counter | undefined
export let liquidatePositionSuccessCount: Counter | undefined
export let liquidatePositionSkippedLowAssetValueCount: Gauge | undefined
export let deleveragePositionSkippedLowAssetValueCount: Gauge | undefined

const IO_LATENCY_BUCKETS_MS = [10, 50, 100, 150, 200, 300, 400, 500, 750, 1000, 2000, 3000, 5000]

function createHistogram(meter: Meter, name: string, description: string) {
  return meter.createHistogram(name, {
    description,
    unit: 'ms',
    advice: {
      explicitBucketBoundaries: IO_LATENCY_BUCKETS_MS,
    },
  })
}

function createCounter(meter: Meter, name: string, description: string) {
  const counter = meter.createCounter(name, {
    description,
  })
  counter.add(0)
  return counter
}

function createGauge(meter: Meter, name: string, description: string) {
  const gauge = meter.createGauge(name, {
    description,
  })
  gauge.record(0)
  return gauge
}

/**
 * Registers all metrics using the provided Meter.
 * Call this function once at startup with your Meter instance.
 */
export function registerAll(meter: Meter) {
  monitorPollRunCount = createCounter(
    meter,
    'monitor_poll_run_count',
    'Number of times the monitor poll has been run'
  )
  monitorPollRunFailuresCount = createCounter(
    meter,
    'monitor_poll_run_failures_count',
    'Monitor poll callback failed with an exception'
  )
  monitorPollRunSuccessDurationMs = createHistogram(
    meter,
    'monitor_poll_run_success_duration_ms',
    'Duration of the monitor poll in milliseconds (only for successful runs)'
  )
  getActivePositionInfosRpcFetchLatencyMs = createHistogram(
    meter,
    'get_active_position_infos_rpc_fetch_latency_ms',
    'Duration of the RPC fetch for active position infos in milliseconds'
  )
  positionsToProcessCount = createGauge(
    meter,
    'positions_to_process_count',
    'Number of positions currently in the positions to process set'
  )
  excludedPositionsCount = createGauge(
    meter,
    'excluded_positions_count',
    'Number of positions currently excluded from processing due to too many failures'
  )
  recentlyProcessedPositionsCount = createGauge(
    meter,
    'recently_processed_positions_count',
    'Number of positions currently in the recently processed positions cache'
  )
  liquidateOrDeleveragePositionDurationMs = createHistogram(
    meter,
    'liquidate_or_deleverage_position_duration_ms',
    'Duration of the liquidation or deleverage process in milliseconds'
  )
  workerLiquidateOrDeleverageCallAttemptsCount = createCounter(
    meter,
    'worker_liquidate_or_deleverage_call_attempts_count',
    'Number of attempts to liquidate or deleverage a position within a worker task'
  )
  workerLiquidateOrDeleverageCallFailuresCount = createCounter(
    meter,
    'worker_liquidate_or_deleverage_call_failures_count',
    'Number of times the liquidate or deleverage position call failed within a worker task'
  )
  liquidatePositionAttemptCount = createCounter(
    meter,
    'liquidate_position_attempt_count',
    'Number of attempts to liquidate a position'
  )
  liquidatePositionSuccessCount = createCounter(
    meter,
    'liquidate_position_success_count',
    'Number of successful liquidation transactions'
  )
  liquidatePositionSkippedLowAssetValueCount = createGauge(
    meter,
    'liquidate_position_skipped_low_asset_value_count',
    'Number of liquidation positions skipped due to asset value below minimum threshold in current poll cycle'
  )
  deleveragePositionSkippedLowAssetValueCount = createGauge(
    meter,
    'deleverage_position_skipped_low_asset_value_count',
    'Number of deleverage positions skipped due to asset value below minimum threshold in current poll cycle'
  )
}
