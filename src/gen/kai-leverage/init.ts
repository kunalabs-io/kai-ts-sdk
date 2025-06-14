import * as accessInit from './access-init/structs'
import * as balanceBag from './balance-bag/structs'
import * as debtBag from './debt-bag/structs'
import * as debtInfo from './debt-info/structs'
import * as debt from './debt/structs'
import * as equity from './equity/structs'
import * as piecewise from './piecewise/structs'
import * as positionCoreClmm from './position-core-clmm/structs'
import * as positionModelClmm from './position-model-clmm/structs'
import * as pyth from './pyth/structs'
import * as supplyPool from './supply-pool/structs'
import { StructClassLoader } from '../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(accessInit.ACCESS_INIT)
  loader.register(balanceBag.BalanceBag)
  loader.register(debt.DebtShareBalance)
  loader.register(debt.DebtRegistry)
  loader.register(debt.DebtTreasury)
  loader.register(debtBag.Info)
  loader.register(debtBag.DebtBag)
  loader.register(debtBag.Key)
  loader.register(debtInfo.DebtInfoEntry)
  loader.register(debtInfo.DebtInfo)
  loader.register(debtInfo.ValidatedDebtInfo)
  loader.register(equity.EquityShareBalance)
  loader.register(equity.EquityRegistry)
  loader.register(equity.EquityTreasury)
  loader.register(piecewise.Section)
  loader.register(piecewise.Piecewise)
  loader.register(positionCoreClmm.ACreateConfig)
  loader.register(positionCoreClmm.AModifyConfig)
  loader.register(positionCoreClmm.AMigrate)
  loader.register(positionCoreClmm.ADeleverage)
  loader.register(positionCoreClmm.ARebalance)
  loader.register(positionCoreClmm.ACollectProtocolFees)
  loader.register(positionCoreClmm.CreatePositionTicket)
  loader.register(positionCoreClmm.Position)
  loader.register(positionCoreClmm.PositionCap)
  loader.register(positionCoreClmm.PythConfig)
  loader.register(positionCoreClmm.PositionConfig)
  loader.register(positionCoreClmm.DeleverageTicket)
  loader.register(positionCoreClmm.ReductionRepaymentTicket)
  loader.register(positionCoreClmm.RebalanceReceipt)
  loader.register(positionCoreClmm.DeletedPositionCollectedFees)
  loader.register(positionCoreClmm.PositionCreationInfo)
  loader.register(positionCoreClmm.DeleverageInfo)
  loader.register(positionCoreClmm.LiquidationInfo)
  loader.register(positionCoreClmm.ReductionInfo)
  loader.register(positionCoreClmm.AddCollateralInfo)
  loader.register(positionCoreClmm.AddLiquidityInfo)
  loader.register(positionCoreClmm.RepayDebtInfo)
  loader.register(positionCoreClmm.OwnerCollectFeeInfo)
  loader.register(positionCoreClmm.OwnerCollectRewardInfo)
  loader.register(positionCoreClmm.OwnerTakeStashedRewardsInfo)
  loader.register(positionCoreClmm.DeletePositionInfo)
  loader.register(positionCoreClmm.RebalanceInfo)
  loader.register(positionCoreClmm.CollectProtocolFeesInfo)
  loader.register(positionCoreClmm.DeletedPositionCollectedFeesInfo)
  loader.register(positionModelClmm.PositionModel)
  loader.register(pyth.PythPriceInfo)
  loader.register(pyth.ValidatedPythPriceInfo)
  loader.register(supplyPool.ACreatePool)
  loader.register(supplyPool.AConfigLendFacil)
  loader.register(supplyPool.AConfigFees)
  loader.register(supplyPool.ATakeFees)
  loader.register(supplyPool.ADeposit)
  loader.register(supplyPool.AMigrate)
  loader.register(supplyPool.SupplyInfo)
  loader.register(supplyPool.WithdrawInfo)
  loader.register(supplyPool.LendFacilCap)
  loader.register(supplyPool.LendFacilInfo)
  loader.register(supplyPool.FacilDebtShare)
  loader.register(supplyPool.FacilDebtBag)
  loader.register(supplyPool.SupplyPool)
}
