import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, pure } from '../../_framework/util'
import { Option } from '../../move-stdlib/option/structs'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function aDeleverage(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::position_core_clmm::a_deleverage`, arguments: [] })
}

export function aRebalance(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::position_core_clmm::a_rebalance`, arguments: [] })
}

export interface AddAmountToMapArgs {
  map: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function addAmountToMap(tx: Transaction, typeArg: string, args: AddAmountToMapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::add_amount_to_map`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.map), pure(tx, args.amount, `u64`)],
  })
}

export interface AddCollateralXArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
}

export function addCollateralX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddCollateralXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::add_collateral_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.cap), obj(tx, args.balance)],
  })
}

export interface AddCollateralYArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
}

export function addCollateralY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddCollateralYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::add_collateral_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.cap), obj(tx, args.balance)],
  })
}

export interface AddLiquidityInfoConstructorArgs {
  positionId: string | TransactionArgument
  sqrtPoolPriceX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
  deltaX: bigint | TransactionArgument
  deltaY: bigint | TransactionArgument
}

export function addLiquidityInfoConstructor(
  tx: Transaction,
  args: AddLiquidityInfoConstructorArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::add_liquidity_info_constructor`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.sqrtPoolPriceX64, `u128`),
      pure(tx, args.deltaL, `u128`),
      pure(tx, args.deltaX, `u64`),
      pure(tx, args.deltaY, `u64`),
    ],
  })
}

export function aliDeltaL(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::ali_delta_l`,
    arguments: [obj(tx, self)],
  })
}

export function aliDeltaX(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::ali_delta_x`,
    arguments: [obj(tx, self)],
  })
}

export function aliDeltaY(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::ali_delta_y`,
    arguments: [obj(tx, self)],
  })
}

export function aliEmit(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::ali_emit`,
    arguments: [obj(tx, info)],
  })
}

export function allowNewPositions(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::allow_new_positions`,
    arguments: [obj(tx, config)],
  })
}

export function allowedOracles(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::allowed_oracles`,
    arguments: [obj(tx, config)],
  })
}

export function baseDeleverageFactorBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::base_deleverage_factor_bps`,
    arguments: [obj(tx, config)],
  })
}

export function baseLiqFactorBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::base_liq_factor_bps`,
    arguments: [obj(tx, config)],
  })
}

export function borrowedX(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::borrowed_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function borrowedXMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::borrowed_x_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function borrowedY(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::borrowed_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function borrowedYMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::borrowed_y_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export interface CalcBorrowAmtArgs {
  principal: bigint | TransactionArgument
  needForPosition: bigint | TransactionArgument
}

export function calcBorrowAmt(tx: Transaction, args: CalcBorrowAmtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::calc_borrow_amt`,
    arguments: [pure(tx, args.principal, `u64`), pure(tx, args.needForPosition, `u64`)],
  })
}

export interface CalcLiqFeeFromRewardArgs {
  config: TransactionObjectInput
  rewardAmt: bigint | TransactionArgument
}

export function calcLiqFeeFromReward(tx: Transaction, args: CalcLiqFeeFromRewardArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::calc_liq_fee_from_reward`,
    arguments: [obj(tx, args.config), pure(tx, args.rewardAmt, `u64`)],
  })
}

export function checkConfigVersion(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::check_config_version`,
    arguments: [obj(tx, config)],
  })
}

export function checkPositionVersion(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::check_position_version`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export interface CheckVersionsArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
}

export function checkVersions(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CheckVersionsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::check_versions`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.config)],
  })
}

export function colX(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::col_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function colXMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::col_x_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function colY(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::col_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function colYMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::col_y_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function collectDeletedPositionFees(tx: Transaction, fees: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::collect_deleted_position_fees`,
    arguments: [obj(tx, fees)],
  })
}

export interface CollectProtocolFeesArgs {
  position: TransactionObjectInput
  amount: bigint | TransactionArgument | TransactionArgument | null
}

export function collectProtocolFees(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: CollectProtocolFeesArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::collect_protocol_fees`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), pure(tx, args.amount, `${Option.$typeName}<u64>`)],
  })
}

export function collectedAmmRewardsMut(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::collected_amm_rewards_mut`,
    arguments: [obj(tx, self)],
  })
}

export function collectedFeesMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::collected_fees_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function configAddEmptyPythConfig(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::config_add_empty_pyth_config`,
    arguments: [obj(tx, config)],
  })
}

export interface ConsumeRebalanceReceiptArgs {
  position: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function consumeRebalanceReceipt(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ConsumeRebalanceReceiptArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::consume_rebalance_receipt`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.receipt)],
  })
}

export function cptConfigId(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::cpt_config_id`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function cptDebtBag(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::cpt_debt_bag`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function cptDebtBagMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::cpt_debt_bag_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function createEmptyConfig(tx: Transaction, poolObjectId: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::create_empty_config`,
    arguments: [pure(tx, poolObjectId, `${ID.$typeName}`)],
  })
}

export interface CreateRebalanceReceiptArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
}

export function createRebalanceReceipt(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CreateRebalanceReceiptArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::create_rebalance_receipt`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.config)],
  })
}

export function currentGlobalL(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::current_global_l`,
    arguments: [obj(tx, config)],
  })
}

export interface DecreaseCurrentGlobalLArgs {
  config: TransactionObjectInput
  deltaL: bigint | TransactionArgument
}

export function decreaseCurrentGlobalL(tx: Transaction, args: DecreaseCurrentGlobalLArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::decrease_current_global_l`,
    arguments: [obj(tx, args.config), pure(tx, args.deltaL, `u128`)],
  })
}

export interface DeleverageInfoConstructorArgs {
  positionId: string | TransactionArgument
  model: TransactionObjectInput
  oraclePriceX128: bigint | TransactionArgument
  sqrtPoolPriceX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
  deltaX: bigint | TransactionArgument
  deltaY: bigint | TransactionArgument
  xRepaid: bigint | TransactionArgument
  yRepaid: bigint | TransactionArgument
}

export function deleverageInfoConstructor(tx: Transaction, args: DeleverageInfoConstructorArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::deleverage_info_constructor`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.model),
      pure(tx, args.oraclePriceX128, `u256`),
      pure(tx, args.sqrtPoolPriceX64, `u128`),
      pure(tx, args.deltaL, `u128`),
      pure(tx, args.deltaX, `u64`),
      pure(tx, args.deltaY, `u64`),
      pure(tx, args.xRepaid, `u64`),
      pure(tx, args.yRepaid, `u64`),
    ],
  })
}

export function deleverageMarginBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::deleverage_margin_bps`,
    arguments: [obj(tx, config)],
  })
}

export interface DeleverageTicketConstructorArgs {
  positionId: string | TransactionArgument
  canRepayX: boolean | TransactionArgument
  canRepayY: boolean | TransactionArgument
  info: TransactionObjectInput
}

export function deleverageTicketConstructor(
  tx: Transaction,
  args: DeleverageTicketConstructorArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::deleverage_ticket_constructor`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.canRepayX, `bool`),
      pure(tx, args.canRepayY, `bool`),
      obj(tx, args.info),
    ],
  })
}

export interface DeleverageTicketRepayXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function deleverageTicketRepayX(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: DeleverageTicketRepayXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::deleverage_ticket_repay_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface DeleverageTicketRepayYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function deleverageTicketRepayY(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: DeleverageTicketRepayYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::deleverage_ticket_repay_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export function deltaL(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::delta_l`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function destroyCreatePositionTicket(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::destroy_create_position_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export interface DestroyDeleverageTicketArgs {
  position: TransactionObjectInput
  ticket: TransactionObjectInput
}

export function destroyDeleverageTicket(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: DestroyDeleverageTicketArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::destroy_deleverage_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.ticket)],
  })
}

export function destroyReductionTicket(
  tx: Transaction,
  typeArgs: [string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::destroy_reduction_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function dx(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::dx`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function dy(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::dy`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export interface EmitDeletePositionInfoArgs {
  positionId: string | TransactionArgument
  capId: string | TransactionArgument
}

export function emitDeletePositionInfo(tx: Transaction, args: EmitDeletePositionInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::emit_delete_position_info`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.capId, `${ID.$typeName}`),
    ],
  })
}

export interface EmitLiquidationInfoArgs {
  positionId: string | TransactionArgument
  model: TransactionObjectInput
  oraclePriceX128: bigint | TransactionArgument
  xRepaid: bigint | TransactionArgument
  yRepaid: bigint | TransactionArgument
  liquidatorRewardX: bigint | TransactionArgument
  liquidatorRewardY: bigint | TransactionArgument
  liquidationFeeX: bigint | TransactionArgument
  liquidationFeeY: bigint | TransactionArgument
}

export function emitLiquidationInfo(tx: Transaction, args: EmitLiquidationInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::emit_liquidation_info`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.model),
      pure(tx, args.oraclePriceX128, `u256`),
      pure(tx, args.xRepaid, `u64`),
      pure(tx, args.yRepaid, `u64`),
      pure(tx, args.liquidatorRewardX, `u64`),
      pure(tx, args.liquidatorRewardY, `u64`),
      pure(tx, args.liquidationFeeX, `u64`),
      pure(tx, args.liquidationFeeY, `u64`),
    ],
  })
}

export interface EmitOwnerCollectFeeInfoArgs {
  positionId: string | TransactionArgument
  collectedXAmt: bigint | TransactionArgument
  collectedYAmt: bigint | TransactionArgument
  feeAmtX: bigint | TransactionArgument
  feeAmtY: bigint | TransactionArgument
}

export function emitOwnerCollectFeeInfo(tx: Transaction, args: EmitOwnerCollectFeeInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::emit_owner_collect_fee_info`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.collectedXAmt, `u64`),
      pure(tx, args.collectedYAmt, `u64`),
      pure(tx, args.feeAmtX, `u64`),
      pure(tx, args.feeAmtY, `u64`),
    ],
  })
}

export interface EmitOwnerCollectRewardInfoArgs {
  positionId: string | TransactionArgument
  collectedRewardAmt: bigint | TransactionArgument
  feeAmt: bigint | TransactionArgument
}

export function emitOwnerCollectRewardInfo(
  tx: Transaction,
  typeArg: string,
  args: EmitOwnerCollectRewardInfoArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::emit_owner_collect_reward_info`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.collectedRewardAmt, `u64`),
      pure(tx, args.feeAmt, `u64`),
    ],
  })
}

export interface EmitPositionCreationInfoArgs {
  positionId: string | TransactionArgument
  configId: string | TransactionArgument
  sqrtPaX64: bigint | TransactionArgument
  sqrtPbX64: bigint | TransactionArgument
  l: bigint | TransactionArgument
  x0: bigint | TransactionArgument
  y0: bigint | TransactionArgument
  cx: bigint | TransactionArgument
  cy: bigint | TransactionArgument
  dx: bigint | TransactionArgument
  dy: bigint | TransactionArgument
  creationFeeAmtSui: bigint | TransactionArgument
}

export function emitPositionCreationInfo(tx: Transaction, args: EmitPositionCreationInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::emit_position_creation_info`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.configId, `${ID.$typeName}`),
      pure(tx, args.sqrtPaX64, `u128`),
      pure(tx, args.sqrtPbX64, `u128`),
      pure(tx, args.l, `u128`),
      pure(tx, args.x0, `u64`),
      pure(tx, args.y0, `u64`),
      pure(tx, args.cx, `u64`),
      pure(tx, args.cy, `u64`),
      pure(tx, args.dx, `u64`),
      pure(tx, args.dy, `u64`),
      pure(tx, args.creationFeeAmtSui, `u64`),
    ],
  })
}

export interface IncreaseCollectedAmmFeeXArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseCollectedAmmFeeX(tx: Transaction, args: IncreaseCollectedAmmFeeXArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::increase_collected_amm_fee_x`,
    arguments: [obj(tx, args.self), pure(tx, args.delta, `u64`)],
  })
}

export interface IncreaseCollectedAmmFeeYArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseCollectedAmmFeeY(tx: Transaction, args: IncreaseCollectedAmmFeeYArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::increase_collected_amm_fee_y`,
    arguments: [obj(tx, args.self), pure(tx, args.delta, `u64`)],
  })
}

export interface IncreaseCurrentGlobalLArgs {
  config: TransactionObjectInput
  deltaL: bigint | TransactionArgument
}

export function increaseCurrentGlobalL(tx: Transaction, args: IncreaseCurrentGlobalLArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::increase_current_global_l`,
    arguments: [obj(tx, args.config), pure(tx, args.deltaL, `u128`)],
  })
}

export interface IncreaseDeltaLArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseDeltaL(tx: Transaction, args: IncreaseDeltaLArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::increase_delta_l`,
    arguments: [obj(tx, args.self), pure(tx, args.delta, `u128`)],
  })
}

export interface IncreaseDeltaXArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseDeltaX(tx: Transaction, args: IncreaseDeltaXArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::increase_delta_x`,
    arguments: [obj(tx, args.self), pure(tx, args.delta, `u64`)],
  })
}

export interface IncreaseDeltaYArgs {
  self: TransactionObjectInput
  delta: bigint | TransactionArgument
}

export function increaseDeltaY(tx: Transaction, args: IncreaseDeltaYArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::increase_delta_y`,
    arguments: [obj(tx, args.self), pure(tx, args.delta, `u64`)],
  })
}

export interface InitMarginIsValidArgs {
  config: TransactionObjectInput
  model: TransactionObjectInput
  p0MinX128: bigint | TransactionArgument
  p0MaxX128: bigint | TransactionArgument
}

export function initMarginIsValid(tx: Transaction, args: InitMarginIsValidArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::init_margin_is_valid`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.model),
      pure(tx, args.p0MinX128, `u256`),
      pure(tx, args.p0MaxX128, `u256`),
    ],
  })
}

export function lendFacilCap(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::lend_facil_cap`,
    arguments: [obj(tx, config)],
  })
}

export function liqBonusBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::liq_bonus_bps`,
    arguments: [obj(tx, config)],
  })
}

export function liqFeeBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::liq_fee_bps`,
    arguments: [obj(tx, config)],
  })
}

export function liqMarginBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::liq_margin_bps`,
    arguments: [obj(tx, config)],
  })
}

export interface LiqMarginIsValidArgs {
  config: TransactionObjectInput
  model: TransactionObjectInput
  p0MinX128: bigint | TransactionArgument
  p0MaxX128: bigint | TransactionArgument
}

export function liqMarginIsValid(tx: Transaction, args: LiqMarginIsValidArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::liq_margin_is_valid`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.model),
      pure(tx, args.p0MinX128, `u256`),
      pure(tx, args.p0MaxX128, `u256`),
    ],
  })
}

export function lpPosition(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::lp_position`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function lpPositionMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::lp_position_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function maxGlobalL(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::max_global_l`,
    arguments: [obj(tx, config)],
  })
}

export function maxPositionL(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::max_position_l`,
    arguments: [obj(tx, config)],
  })
}

export function migrateConfig(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::migrate_config`,
    arguments: [obj(tx, config)],
  })
}

export function migratePosition(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::migrate_position`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function minInitMarginBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::min_init_margin_bps`,
    arguments: [obj(tx, config)],
  })
}

export function minLiqStartPriceDeltaBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::min_liq_start_price_delta_bps`,
    arguments: [obj(tx, config)],
  })
}

export interface NewCreatePositionTicketArgs {
  configId: string | TransactionArgument
  tickA: GenericArg
  tickB: GenericArg
  dx: bigint | TransactionArgument
  dy: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
  principalX: TransactionObjectInput
  principalY: TransactionObjectInput
  borrowedX: TransactionObjectInput
  borrowedY: TransactionObjectInput
  debtBag: TransactionObjectInput
}

export function newCreatePositionTicket(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: NewCreatePositionTicketArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::new_create_position_ticket`,
    typeArguments: typeArgs,
    arguments: [
      pure(tx, args.configId, `${ID.$typeName}`),
      generic(tx, `${typeArgs[2]}`, args.tickA),
      generic(tx, `${typeArgs[2]}`, args.tickB),
      pure(tx, args.dx, `u64`),
      pure(tx, args.dy, `u64`),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.principalX),
      obj(tx, args.principalY),
      obj(tx, args.borrowedX),
      obj(tx, args.borrowedY),
      obj(tx, args.debtBag),
    ],
  })
}

export interface OwnerTakeStashedRewardsArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  amount: bigint | TransactionArgument | TransactionArgument | null
}

export function ownerTakeStashedRewards(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: OwnerTakeStashedRewardsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::owner_take_stashed_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      pure(tx, args.amount, `${Option.$typeName}<u64>`),
    ],
  })
}

export function pcPositionId(tx: Transaction, cap: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::pc_position_id`,
    arguments: [obj(tx, cap)],
  })
}

export function poolObjectId(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::pool_object_id`,
    arguments: [obj(tx, config)],
  })
}

export function positionCapConstructor(tx: Transaction, positionId: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_cap_constructor`,
    arguments: [pure(tx, positionId, `${ID.$typeName}`)],
  })
}

export function positionCapDeconstructor(tx: Transaction, cap: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_cap_deconstructor`,
    arguments: [obj(tx, cap)],
  })
}

export function positionConfigId(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_config_id`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export interface PositionConstructorArgs {
  configId: string | TransactionArgument
  lpPosition: GenericArg
  colX: TransactionObjectInput
  colY: TransactionObjectInput
  debtBag: TransactionObjectInput
  collectedFees: TransactionObjectInput
  ownerRewardStash: TransactionObjectInput
}

export function positionConstructor(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: PositionConstructorArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_constructor`,
    typeArguments: typeArgs,
    arguments: [
      pure(tx, args.configId, `${ID.$typeName}`),
      generic(tx, `${typeArgs[2]}`, args.lpPosition),
      obj(tx, args.colX),
      obj(tx, args.colY),
      obj(tx, args.debtBag),
      obj(tx, args.collectedFees),
      obj(tx, args.ownerRewardStash),
    ],
  })
}

export function positionCreationFeeSui(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_creation_fee_sui`,
    arguments: [obj(tx, config)],
  })
}

export function positionDebtBag(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_debt_bag`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function positionDebtBagMut(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_debt_bag_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function positionDeconstructor(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_deconstructor`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function positionShareObject(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::position_share_object`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export function principalX(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::principal_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export function principalY(
  tx: Transaction,
  typeArgs: [string, string, string],
  ticket: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::principal_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, ticket)],
  })
}

export interface PythConfigAllowPioArgs {
  config: TransactionObjectInput
  coinType: TransactionObjectInput
  pioId: string | TransactionArgument
}

export function pythConfigAllowPio(tx: Transaction, args: PythConfigAllowPioArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::pyth_config_allow_pio`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.coinType),
      pure(tx, args.pioId, `${ID.$typeName}`),
    ],
  })
}

export interface PythConfigDisallowPioArgs {
  config: TransactionObjectInput
  coinType: TransactionObjectInput
}

export function pythConfigDisallowPio(tx: Transaction, args: PythConfigDisallowPioArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::pyth_config_disallow_pio`,
    arguments: [obj(tx, args.config), obj(tx, args.coinType)],
  })
}

export function rebalanceFeeBps(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::rebalance_fee_bps`,
    arguments: [obj(tx, config)],
  })
}

export interface RebalanceRepayDebtXArgs {
  position: TransactionObjectInput
  balance: TransactionObjectInput
  receipt: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceRepayDebtX(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RebalanceRepayDebtXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::rebalance_repay_debt_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.balance),
      obj(tx, args.receipt),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceRepayDebtYArgs {
  position: TransactionObjectInput
  balance: TransactionObjectInput
  receipt: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceRepayDebtY(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RebalanceRepayDebtYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::rebalance_repay_debt_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.balance),
      obj(tx, args.receipt),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceStashRewardsArgs {
  position: TransactionObjectInput
  receipt: TransactionObjectInput
  rewards: TransactionObjectInput
}

export function rebalanceStashRewards(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RebalanceStashRewardsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::rebalance_stash_rewards`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.receipt), obj(tx, args.rewards)],
  })
}

export interface ReductionInfoConstructorArgs {
  positionId: string | TransactionArgument
  model: TransactionObjectInput
  oraclePriceX128: bigint | TransactionArgument
  sqrtPoolPriceX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
  deltaX: bigint | TransactionArgument
  deltaY: bigint | TransactionArgument
  withdrawnX: bigint | TransactionArgument
  withdrawnY: bigint | TransactionArgument
  xRepaid: bigint | TransactionArgument
  yRepaid: bigint | TransactionArgument
}

export function reductionInfoConstructor(tx: Transaction, args: ReductionInfoConstructorArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::reduction_info_constructor`,
    arguments: [
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.model),
      pure(tx, args.oraclePriceX128, `u256`),
      pure(tx, args.sqrtPoolPriceX64, `u128`),
      pure(tx, args.deltaL, `u128`),
      pure(tx, args.deltaX, `u64`),
      pure(tx, args.deltaY, `u64`),
      pure(tx, args.withdrawnX, `u64`),
      pure(tx, args.withdrawnY, `u64`),
      pure(tx, args.xRepaid, `u64`),
      pure(tx, args.yRepaid, `u64`),
    ],
  })
}

export interface ReductionRepaymentTicketConstructorArgs {
  sx: TransactionObjectInput
  sy: TransactionObjectInput
  info: TransactionObjectInput
}

export function reductionRepaymentTicketConstructor(
  tx: Transaction,
  typeArgs: [string, string],
  args: ReductionRepaymentTicketConstructorArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::reduction_repayment_ticket_constructor`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.sx), obj(tx, args.sy), obj(tx, args.info)],
  })
}

export interface ReductionTicketCalcRepayAmtXArgs {
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function reductionTicketCalcRepayAmtX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReductionTicketCalcRepayAmtXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::reduction_ticket_calc_repay_amt_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.ticket), obj(tx, args.supplyPool), obj(tx, args.clock)],
  })
}

export interface ReductionTicketCalcRepayAmtYArgs {
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function reductionTicketCalcRepayAmtY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReductionTicketCalcRepayAmtYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::reduction_ticket_calc_repay_amt_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.ticket), obj(tx, args.supplyPool), obj(tx, args.clock)],
  })
}

export interface ReductionTicketRepayXArgs {
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

export function reductionTicketRepayX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReductionTicketRepayXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::reduction_ticket_repay_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface ReductionTicketRepayYArgs {
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

export function reductionTicketRepayY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReductionTicketRepayYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::reduction_ticket_repay_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayDebtXArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function repayDebtX(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RepayDebtXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::repay_debt_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      obj(tx, args.balance),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayDebtYArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function repayDebtY(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: RepayDebtYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::repay_debt_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      obj(tx, args.balance),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export function rrPositionId(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::rr_position_id`,
    arguments: [obj(tx, self)],
  })
}

export interface SetAllowNewPositionsArgs {
  config: TransactionObjectInput
  value: boolean | TransactionArgument
}

export function setAllowNewPositions(tx: Transaction, args: SetAllowNewPositionsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_allow_new_positions`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `bool`)],
  })
}

export interface SetBaseDeleverageFactorBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setBaseDeleverageFactorBps(tx: Transaction, args: SetBaseDeleverageFactorBpsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_base_deleverage_factor_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetBaseLiqFactorBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setBaseLiqFactorBps(tx: Transaction, args: SetBaseLiqFactorBpsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_base_liq_factor_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetDeleverageMarginBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setDeleverageMarginBps(tx: Transaction, args: SetDeleverageMarginBpsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_deleverage_margin_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetDeltaLArgs {
  info: TransactionObjectInput
  deltaL: bigint | TransactionArgument
}

export function setDeltaL(tx: Transaction, args: SetDeltaLArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_delta_l`,
    arguments: [obj(tx, args.info), pure(tx, args.deltaL, `u128`)],
  })
}

export interface SetDeltaXArgs {
  info: TransactionObjectInput
  deltaX: bigint | TransactionArgument
}

export function setDeltaX(tx: Transaction, args: SetDeltaXArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_delta_x`,
    arguments: [obj(tx, args.info), pure(tx, args.deltaX, `u64`)],
  })
}

export interface SetDeltaYArgs {
  info: TransactionObjectInput
  deltaY: bigint | TransactionArgument
}

export function setDeltaY(tx: Transaction, args: SetDeltaYArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_delta_y`,
    arguments: [obj(tx, args.info), pure(tx, args.deltaY, `u64`)],
  })
}

export interface SetLiqBonusBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setLiqBonusBps(tx: Transaction, args: SetLiqBonusBpsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_liq_bonus_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetLiqFeeBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setLiqFeeBps(tx: Transaction, args: SetLiqFeeBpsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_liq_fee_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetLiqMarginBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setLiqMarginBps(tx: Transaction, args: SetLiqMarginBpsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_liq_margin_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetMaxGlobalLArgs {
  config: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function setMaxGlobalL(tx: Transaction, args: SetMaxGlobalLArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_max_global_l`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u128`)],
  })
}

export interface SetMaxPositionLArgs {
  config: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function setMaxPositionL(tx: Transaction, args: SetMaxPositionLArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_max_position_l`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u128`)],
  })
}

export interface SetMinInitMarginBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setMinInitMarginBps(tx: Transaction, args: SetMinInitMarginBpsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_min_init_margin_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetMinLiqStartPriceDeltaBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setMinLiqStartPriceDeltaBps(
  tx: Transaction,
  args: SetMinLiqStartPriceDeltaBpsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_min_liq_start_price_delta_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetPositionCreationFeeSuiArgs {
  config: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function setPositionCreationFeeSui(tx: Transaction, args: SetPositionCreationFeeSuiArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_position_creation_fee_sui`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u64`)],
  })
}

export interface SetPythConfigMaxAgeSecsArgs {
  config: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
}

export function setPythConfigMaxAgeSecs(tx: Transaction, args: SetPythConfigMaxAgeSecsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_pyth_config_max_age_secs`,
    arguments: [obj(tx, args.config), pure(tx, args.maxAgeSecs, `u64`)],
  })
}

export interface SetRebalanceFeeBpsArgs {
  config: TransactionObjectInput
  value: number | TransactionArgument
}

export function setRebalanceFeeBps(tx: Transaction, args: SetRebalanceFeeBpsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_rebalance_fee_bps`,
    arguments: [obj(tx, args.config), pure(tx, args.value, `u16`)],
  })
}

export interface SetTicketActiveArgs {
  position: TransactionObjectInput
  value: boolean | TransactionArgument
}

export function setTicketActive(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SetTicketActiveArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::set_ticket_active`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), pure(tx, args.value, `bool`)],
  })
}

export interface ShareDeletedPositionCollectedFeesArgs {
  positionId: string | TransactionArgument
  balanceBag: TransactionObjectInput
}

export function shareDeletedPositionCollectedFees(
  tx: Transaction,
  args: ShareDeletedPositionCollectedFeesArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::share_deleted_position_collected_fees`,
    arguments: [pure(tx, args.positionId, `${ID.$typeName}`), obj(tx, args.balanceBag)],
  })
}

export interface TakeRebalanceFeeArgs {
  position: TransactionObjectInput
  feeBps: number | TransactionArgument
  balance: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function takeRebalanceFee(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: TakeRebalanceFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::take_rebalance_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.feeBps, `u16`),
      obj(tx, args.balance),
      obj(tx, args.receipt),
    ],
  })
}

export function ticketActive(
  tx: Transaction,
  typeArgs: [string, string, string],
  position: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::ticket_active`,
    typeArguments: typeArgs,
    arguments: [obj(tx, position)],
  })
}

export interface ValidateDebtInfoArgs {
  config: TransactionObjectInput
  debtInfo: TransactionObjectInput
}

export function validateDebtInfo(tx: Transaction, args: ValidateDebtInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::validate_debt_info`,
    arguments: [obj(tx, args.config), obj(tx, args.debtInfo)],
  })
}

export interface ValidatePriceInfoArgs {
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
}

export function validatePriceInfo(tx: Transaction, args: ValidatePriceInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_core_clmm::validate_price_info`,
    arguments: [obj(tx, args.config), obj(tx, args.priceInfo)],
  })
}
