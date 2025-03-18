import * as acl from './acl/structs'
import * as config from './config/structs'
import * as factory from './factory/structs'
import * as partner from './partner/structs'
import * as pool from './pool/structs'
import * as position from './position/structs'
import * as rewarder from './rewarder/structs'
import * as tick from './tick/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(acl.ACL)
  loader.register(acl.Member)
  loader.register(config.AddFeeTierEvent)
  loader.register(config.AddRoleEvent)
  loader.register(config.AdminCap)
  loader.register(config.DeleteFeeTierEvent)
  loader.register(config.FeeTier)
  loader.register(config.GlobalConfig)
  loader.register(config.InitConfigEvent)
  loader.register(config.ProtocolFeeClaimCap)
  loader.register(config.RemoveMemberEvent)
  loader.register(config.RemoveRoleEvent)
  loader.register(config.SetPackageVersion)
  loader.register(config.SetRolesEvent)
  loader.register(config.UpdateFeeRateEvent)
  loader.register(config.UpdateFeeTierEvent)
  loader.register(factory.CreatePoolEvent)
  loader.register(factory.InitFactoryEvent)
  loader.register(factory.PoolSimpleInfo)
  loader.register(factory.Pools)
  loader.register(partner.ClaimRefFeeEvent)
  loader.register(partner.CreatePartnerEvent)
  loader.register(partner.InitPartnerEvent)
  loader.register(partner.Partner)
  loader.register(partner.PartnerCap)
  loader.register(partner.Partners)
  loader.register(partner.ReceiveRefFeeEvent)
  loader.register(partner.UpdateRefFeeRateEvent)
  loader.register(partner.UpdateTimeRangeEvent)
  loader.register(pool.AddLiquidityEvent)
  loader.register(pool.AddLiquidityReceipt)
  loader.register(pool.AddRewarderEvent)
  loader.register(pool.CalculatedSwapResult)
  loader.register(pool.ClosePositionEvent)
  loader.register(pool.CollectFeeEvent)
  loader.register(pool.CollectProtocolFeeEvent)
  loader.register(pool.CollectRewardEvent)
  loader.register(pool.FlashSwapReceipt)
  loader.register(pool.OpenPositionEvent)
  loader.register(pool.POOL)
  loader.register(pool.Pool)
  loader.register(pool.RemoveLiquidityEvent)
  loader.register(pool.SwapEvent)
  loader.register(pool.SwapResult)
  loader.register(pool.SwapStepResult)
  loader.register(pool.UpdateEmissionEvent)
  loader.register(pool.UpdateFeeRateEvent)
  loader.register(position.POSITION)
  loader.register(position.Position)
  loader.register(position.PositionInfo)
  loader.register(position.PositionManager)
  loader.register(position.PositionReward)
  loader.register(rewarder.DepositEvent)
  loader.register(rewarder.EmergentWithdrawEvent)
  loader.register(rewarder.Rewarder)
  loader.register(rewarder.RewarderGlobalVault)
  loader.register(rewarder.RewarderInitEvent)
  loader.register(rewarder.RewarderManager)
  loader.register(tick.Tick)
  loader.register(tick.TickManager)
}
