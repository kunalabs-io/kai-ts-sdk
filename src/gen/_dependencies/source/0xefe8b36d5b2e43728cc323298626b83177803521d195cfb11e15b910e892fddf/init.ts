import * as app from './app/structs'
import * as assetActiveState from './asset-active-state/structs'
import * as borrowDynamics from './borrow-dynamics/structs'
import * as borrowReferral from './borrow-referral/structs'
import * as borrow from './borrow/structs'
import * as collateralStats from './collateral-stats/structs'
import * as depositCollateral from './deposit-collateral/structs'
import * as flashLoan from './flash-loan/structs'
import * as incentiveRewards from './incentive-rewards/structs'
import * as interestModel from './interest-model/structs'
import * as limiter from './limiter/structs'
import * as liquidate from './liquidate/structs'
import * as lockObligation from './lock-obligation/structs'
import * as marketDynamicKeys from './market-dynamic-keys/structs'
import * as market from './market/structs'
import * as mint from './mint/structs'
import * as obligationAccess from './obligation-access/structs'
import * as obligationCollaterals from './obligation-collaterals/structs'
import * as obligationDebts from './obligation-debts/structs'
import * as obligation from './obligation/structs'
import * as openObligation from './open-obligation/structs'
import * as redeem from './redeem/structs'
import * as repay from './repay/structs'
import * as reserve from './reserve/structs'
import * as riskModel from './risk-model/structs'
import * as version from './version/structs'
import * as withdrawCollateral from './withdraw-collateral/structs'
import { StructClassLoader } from '../../../_framework/loader'

export function registerClasses(loader: StructClassLoader) {
  loader.register(app.APP)
  loader.register(app.AdminCap)
  loader.register(assetActiveState.BaseAssetActiveStates)
  loader.register(assetActiveState.CollateralActiveStates)
  loader.register(assetActiveState.AssetActiveStates)
  loader.register(borrow.BorrowEvent)
  loader.register(borrow.BorrowEventV2)
  loader.register(borrow.BorrowEventV3)
  loader.register(borrowDynamics.BorrowDynamics)
  loader.register(borrowDynamics.BorrowDynamic)
  loader.register(borrowReferral.BorrowReferral)
  loader.register(borrowReferral.BorrowReferralCfgKey)
  loader.register(borrowReferral.BorrowedKey)
  loader.register(borrowReferral.ReferralFeeKey)
  loader.register(borrowReferral.AuthorizedWitnessList)
  loader.register(collateralStats.CollateralStats)
  loader.register(collateralStats.CollateralStat)
  loader.register(depositCollateral.CollateralDepositEvent)
  loader.register(flashLoan.BorrowFlashLoanEvent)
  loader.register(flashLoan.RepayFlashLoanEvent)
  loader.register(flashLoan.BorrowFlashLoanV2Event)
  loader.register(flashLoan.RepayFlashLoanV2Event)
  loader.register(incentiveRewards.RewardFactors)
  loader.register(incentiveRewards.RewardFactor)
  loader.register(interestModel.InterestModel)
  loader.register(interestModel.InterestModelChangeCreated)
  loader.register(interestModel.InterestModelAdded)
  loader.register(interestModel.InterestModels)
  loader.register(limiter.Limiter)
  loader.register(limiter.Limiters)
  loader.register(limiter.Segment)
  loader.register(limiter.LimiterUpdateLimitChangeCreatedEvent)
  loader.register(limiter.LimiterUpdateParamsChangeCreatedEvent)
  loader.register(limiter.LimiterLimitChangeAppliedEvent)
  loader.register(limiter.LimiterParamsChangeAppliedEvent)
  loader.register(limiter.LimiterUpdateLimitChange)
  loader.register(limiter.LimiterUpdateParamsChange)
  loader.register(liquidate.LiquidateEvent)
  loader.register(liquidate.LiquidateEventV2)
  loader.register(lockObligation.ObligationUnhealthyUnlocked)
  loader.register(market.Market)
  loader.register(marketDynamicKeys.BorrowFeeKey)
  loader.register(marketDynamicKeys.BorrowFeeRecipientKey)
  loader.register(marketDynamicKeys.SupplyLimitKey)
  loader.register(mint.MintEvent)
  loader.register(obligation.Obligation)
  loader.register(obligation.ObligationOwnership)
  loader.register(obligation.ObligationKey)
  loader.register(obligation.ObligationRewardsPointRedeemed)
  loader.register(obligation.ObligationLocked)
  loader.register(obligation.ObligationUnlocked)
  loader.register(obligationAccess.ObligationAccessStore)
  loader.register(obligationCollaterals.Collateral)
  loader.register(obligationCollaterals.ObligationCollaterals)
  loader.register(obligationDebts.Debt)
  loader.register(obligationDebts.ObligationDebts)
  loader.register(openObligation.ObligationHotPotato)
  loader.register(openObligation.ObligationCreatedEvent)
  loader.register(redeem.RedeemEvent)
  loader.register(repay.RepayEvent)
  loader.register(reserve.BalanceSheets)
  loader.register(reserve.BalanceSheet)
  loader.register(reserve.FlashLoanFees)
  loader.register(reserve.FlashLoan)
  loader.register(reserve.MarketCoin)
  loader.register(reserve.Reserve)
  loader.register(riskModel.RiskModels)
  loader.register(riskModel.RiskModel)
  loader.register(riskModel.RiskModelChangeCreated)
  loader.register(riskModel.RiskModelAdded)
  loader.register(version.Version)
  loader.register(version.VersionCap)
  loader.register(withdrawCollateral.CollateralWithdrawEvent)
}
