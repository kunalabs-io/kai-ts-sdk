import * as acl from './acl/structs'
import * as config from './config/structs'
import * as pool from './pool/structs'
import * as rewarder from './rewarder/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(acl.ACL)
  loader.register(acl.Member)
  loader.register(config.AddOperatorEvent)
  loader.register(config.AddRoleEvent)
  loader.register(config.AdminCap)
  loader.register(config.GlobalConfig)
  loader.register(config.InitConfigEvent)
  loader.register(config.OperatorCap)
  loader.register(config.RemoveMemberEvent)
  loader.register(config.RemoveRoleEvent)
  loader.register(config.SetPackageVersion)
  loader.register(config.SetRolesEvent)
  loader.register(pool.AccumulatedPositionRewardsEvent)
  loader.register(pool.AddLiquidityEvent)
  loader.register(pool.AddLiquidityFixCoinEvent)
  loader.register(pool.AddRewardEvent)
  loader.register(pool.CreatePoolEvent)
  loader.register(pool.DepositEvent)
  loader.register(pool.HarvestEvent)
  loader.register(pool.POOL)
  loader.register(pool.Pool)
  loader.register(pool.PositionRewardInfo)
  loader.register(pool.RemoveLiquidityEvent)
  loader.register(pool.UpdateEffectiveTickRangeEvent)
  loader.register(pool.UpdatePoolAllocatePointEvent)
  loader.register(pool.WithdrawEvent)
  loader.register(pool.WrappedPositionInfo)
  loader.register(pool.WrappedPositionNFT)
  loader.register(rewarder.CreateRewarderEvent)
  loader.register(rewarder.DepositEvent)
  loader.register(rewarder.EmergentWithdrawEvent)
  loader.register(rewarder.InitRewarderManagerEvent)
  loader.register(rewarder.PoolRewarderInfo)
  loader.register(rewarder.Rewarder)
  loader.register(rewarder.RewarderManager)
  loader.register(rewarder.UpdateRewarderEvent)
}
