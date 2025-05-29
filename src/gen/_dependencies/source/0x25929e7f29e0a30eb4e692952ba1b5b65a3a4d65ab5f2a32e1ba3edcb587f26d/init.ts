import * as adminCap from './admin-cap/structs'
import * as comparator from './comparator/structs'
import * as i128 from './i128/structs'
import * as i32 from './i32/structs'
import * as i64 from './i64/structs'
import * as oracle from './oracle/structs'
import * as poolManager from './pool-manager/structs'
import * as pool from './pool/structs'
import * as positionManager from './position-manager/structs'
import * as position from './position/structs'
import * as tick from './tick/structs'
import * as versioned from './versioned/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(adminCap.AdminCap)
  loader.register(comparator.Result)
  loader.register(i128.I128)
  loader.register(i32.I32)
  loader.register(i64.I64)
  loader.register(oracle.Observation)
  loader.register(pool.PoolRewardCustodianDfKey)
  loader.register(pool.Pool)
  loader.register(pool.PoolRewardInfo)
  loader.register(pool.SwapState)
  loader.register(pool.SwapStepComputations)
  loader.register(pool.SwapReceipt)
  loader.register(pool.FlashReceipt)
  loader.register(pool.ModifyLiquidity)
  loader.register(pool.Swap)
  loader.register(pool.Flash)
  loader.register(pool.Pay)
  loader.register(pool.Collect)
  loader.register(pool.CollectProtocolFee)
  loader.register(pool.SetProtocolFeeRate)
  loader.register(pool.Initialize)
  loader.register(pool.IncreaseObservationCardinalityNext)
  loader.register(pool.InitializePoolReward)
  loader.register(pool.UpdatePoolRewardEmission)
  loader.register(pool.CollectPoolReward)
  loader.register(poolManager.PoolDfKey)
  loader.register(poolManager.PoolRegistry)
  loader.register(poolManager.PoolCreated)
  loader.register(poolManager.FeeRateEnabled)
  loader.register(position.POSITION)
  loader.register(position.Position)
  loader.register(position.PositionRewardInfo)
  loader.register(positionManager.PositionRegistry)
  loader.register(positionManager.Open)
  loader.register(positionManager.Close)
  loader.register(positionManager.IncreaseLiquidity)
  loader.register(positionManager.DecreaseLiquidity)
  loader.register(positionManager.Collect)
  loader.register(tick.TickInfo)
  loader.register(versioned.Versioned)
  loader.register(versioned.Upgraded)
}
