import * as kaiLeverageSupplyPool from './kai-leverage-supply-pool/structs'
import * as scallopSuiProper from './scallop-sui-proper/structs'
import * as scallopSui from './scallop-sui/structs'
import * as scallopWhusdce from './scallop-whusdce/structs'
import * as scallopWhusdteProper from './scallop-whusdte-proper/structs'
import * as scallopWhusdte from './scallop-whusdte/structs'
import * as timeLockedBalance from './time-locked-balance/structs'
import * as vault from './vault/structs'
import * as ysui from './ysui/structs'
import * as ywhusdce from './ywhusdce/structs'
import * as ywhusdte from './ywhusdte/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(timeLockedBalance.TimeLockedBalance)
  loader.register(vault.AdminCap)
  loader.register(vault.DepositEvent)
  loader.register(vault.RebalanceAmounts)
  loader.register(vault.RebalanceInfo)
  loader.register(vault.StrategyLossEvent)
  loader.register(vault.StrategyProfitEvent)
  loader.register(vault.StrategyRemovalTicket)
  loader.register(vault.StrategyState)
  loader.register(vault.StrategyWithdrawInfo)
  loader.register(vault.Vault)
  loader.register(vault.VaultAccess)
  loader.register(vault.WithdrawEvent)
  loader.register(vault.WithdrawTicket)
  loader.register(kaiLeverageSupplyPool.AdminCap)
  loader.register(kaiLeverageSupplyPool.IncentiveInjectInfo)
  loader.register(kaiLeverageSupplyPool.Strategy)
  loader.register(ysui.YSUI)
  loader.register(scallopSui.AdminCap)
  loader.register(scallopSui.Strategy)
  loader.register(scallopSuiProper.AdminCap)
  loader.register(scallopSuiProper.Strategy)
  loader.register(ywhusdce.YWHUSDCE)
  loader.register(scallopWhusdce.AdminCap)
  loader.register(scallopWhusdce.Strategy)
  loader.register(ywhusdte.YWHUSDTE)
  loader.register(scallopWhusdte.AdminCap)
  loader.register(scallopWhusdte.Strategy)
  loader.register(scallopWhusdteProper.AdminCap)
  loader.register(scallopWhusdteProper.Strategy)
}
