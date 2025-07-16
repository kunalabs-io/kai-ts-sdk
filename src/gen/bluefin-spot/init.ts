import * as admin from './admin/structs'
import * as config from './config/structs'
import * as events from './events/structs'
import * as oracle from './oracle/structs'
import * as pool from './pool/structs'
import * as position from './position/structs'
import * as tick from './tick/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(admin.AdminCap)
  loader.register(admin.ProtocolFeeCap)
  loader.register(config.GlobalConfig)
  loader.register(events.AdminCapTransferred)
  loader.register(events.ProtocolFeeCapTransferred)
  loader.register(events.PoolCreated)
  loader.register(events.PositionOpened)
  loader.register(events.PositionClosed)
  loader.register(events.AssetSwap)
  loader.register(events.FlashSwap)
  loader.register(events.ProtocolFeeCollected)
  loader.register(events.UserFeeCollected)
  loader.register(events.UserRewardCollected)
  loader.register(events.LiquidityProvided)
  loader.register(events.LiquidityRemoved)
  loader.register(events.UpdatePoolRewardEmissionEvent)
  loader.register(events.SupportedVersionUpdate)
  loader.register(events.TickUpdate)
  loader.register(events.PoolPauseStatusUpdate)
  loader.register(events.RewardsManagerUpdate)
  loader.register(events.PoolTickUpdate)
  loader.register(events.ProtocolFeeShareUpdated)
  loader.register(events.ObservationCardinalityUpdated)
  loader.register(events.PoolManagerUpdate)
  loader.register(events.PoolCreationFeeUpdate)
  loader.register(events.PoolCreationFeePaid)
  loader.register(events.PoolCreationFeeClaimed)
  loader.register(oracle.ObservationManager)
  loader.register(oracle.Observation)
  loader.register(pool.Pool)
  loader.register(pool.PoolRewardInfo)
  loader.register(pool.SwapResult)
  loader.register(pool.SwapStepResult)
  loader.register(pool.FlashSwapReceipt)
  loader.register(position.Position)
  loader.register(position.PositionRewardInfo)
  loader.register(tick.TickManager)
  loader.register(tick.TickInfo)
}
