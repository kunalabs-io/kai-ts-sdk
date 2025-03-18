import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Option } from '../../move-stdlib/option/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  balanceX: TransactionObjectInput
  balanceY: TransactionObjectInput
  clock: TransactionObjectInput
}

export function addLiquidity(tx: Transaction, typeArgs: [string, string], args: AddLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.balanceX),
      obj(tx, args.balanceY),
      obj(tx, args.clock),
    ],
  })
}

export interface BorrowForPositionXArgs {
  ticket: TransactionObjectInput
  config: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function borrowForPositionX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: BorrowForPositionXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::borrow_for_position_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.config),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface BorrowForPositionYArgs {
  ticket: TransactionObjectInput
  config: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function borrowForPositionY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: BorrowForPositionYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::borrow_for_position_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.config),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface CalcDepositAmountsByLiquidityArgs {
  pool: TransactionObjectInput
  tickA: TransactionObjectInput
  tickB: TransactionObjectInput
  deltaL: bigint | TransactionArgument
}

export function calcDepositAmountsByLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcDepositAmountsByLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::calc_deposit_amounts_by_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.tickA),
      obj(tx, args.tickB),
      pure(tx, args.deltaL, `u128`),
    ],
  })
}

export interface CalcLiquidateColXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  maxRepaymentAmtY: bigint | TransactionArgument
}

export function calcLiquidateColX(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcLiquidateColXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::calc_liquidate_col_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      pure(tx, args.maxRepaymentAmtY, `u64`),
    ],
  })
}

export interface CalcLiquidateColYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  maxRepaymentAmtX: bigint | TransactionArgument
}

export function calcLiquidateColY(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcLiquidateColYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::calc_liquidate_col_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      pure(tx, args.maxRepaymentAmtX, `u64`),
    ],
  })
}

export interface CreateDeleverageTicketArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinGlobalConfig: TransactionObjectInput
  maxDeltaL: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function createDeleverageTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreateDeleverageTicketArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::create_deleverage_ticket`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinGlobalConfig),
      pure(tx, args.maxDeltaL, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreateDeleverageTicketForLiquidationArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinGlobalConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

export function createDeleverageTicketForLiquidation(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreateDeleverageTicketForLiquidationArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::create_deleverage_ticket_for_liquidation`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinGlobalConfig),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePositionArgs {
  config: TransactionObjectInput
  ticket: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinGlobalConfig: TransactionObjectInput
  creationFee: TransactionObjectInput
  clock: TransactionObjectInput
}

export function createPosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePositionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::create_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.ticket),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinGlobalConfig),
      obj(tx, args.creationFee),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePositionTicketArgs {
  bluefinPool: TransactionObjectInput
  config: TransactionObjectInput
  tickA: TransactionObjectInput
  tickB: TransactionObjectInput
  principalX: TransactionObjectInput
  principalY: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  priceInfo: TransactionObjectInput
}

export function createPositionTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePositionTicketArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::create_position_ticket`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.bluefinPool),
      obj(tx, args.config),
      obj(tx, args.tickA),
      obj(tx, args.tickB),
      obj(tx, args.principalX),
      obj(tx, args.principalY),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.priceInfo),
    ],
  })
}

export interface DeletePositionArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

export function deletePosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: DeletePositionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::delete_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.clock),
    ],
  })
}

export interface DeleverageArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  supplyPoolX: TransactionObjectInput
  supplyPoolY: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinGlobalConfig: TransactionObjectInput
  maxDeltaL: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function deleverage(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: DeleverageArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::deleverage`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.supplyPoolX),
      obj(tx, args.supplyPoolY),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinGlobalConfig),
      pure(tx, args.maxDeltaL, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface DeleverageForLiquidationArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  supplyPoolX: TransactionObjectInput
  supplyPoolY: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinGlobalConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

export function deleverageForLiquidation(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: DeleverageForLiquidationArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::deleverage_for_liquidation`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.supplyPoolX),
      obj(tx, args.supplyPoolY),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinGlobalConfig),
      obj(tx, args.clock),
    ],
  })
}

export interface LiquidateColXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  repayment: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function liquidateColX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: LiquidateColXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::liquidate_col_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.repayment),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface LiquidateColYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  repayment: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function liquidateColY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: LiquidateColYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::liquidate_col_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.repayment),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface OwnerCollectFeeArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

export function ownerCollectFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: OwnerCollectFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::owner_collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.clock),
    ],
  })
}

export interface OwnerCollectRewardArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

export function ownerCollectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: OwnerCollectRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::owner_collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.clock),
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
  typeArgs: [string, string, string],
  args: OwnerTakeStashedRewardsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::owner_take_stashed_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      pure(tx, args.amount, `${Option.$typeName}<u64>`),
    ],
  })
}

export interface PositionModelArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  debtInfo: TransactionObjectInput
}

export function positionModel(
  tx: Transaction,
  typeArgs: [string, string],
  args: PositionModelArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::position_model`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.config), obj(tx, args.debtInfo)],
  })
}

export function positionTickRange(tx: Transaction, position: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::position_tick_range`,
    arguments: [obj(tx, position)],
  })
}

export interface RebalanceAddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  receipt: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  balanceX: TransactionObjectInput
  balanceY: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceAddLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.balanceX),
      obj(tx, args.balanceY),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceCollectFeeArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  receipt: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceCollectFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceCollectFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceCollectRewardArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  receipt: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceCollectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RebalanceCollectRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.clock),
    ],
  })
}

export interface ReduceArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  priceInfo: TransactionObjectInput
  supplyPoolX: TransactionObjectInput
  supplyPoolY: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinGlobalConfig: TransactionObjectInput
  factorX64: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function reduce(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: ReduceArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::reduce`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.priceInfo),
      obj(tx, args.supplyPoolX),
      obj(tx, args.supplyPoolY),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinGlobalConfig),
      pure(tx, args.factorX64, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface RemoveLiquidityArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  lpPosition: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function removeLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::remove_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.lpPosition),
      pure(tx, args.deltaL, `u128`),
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
  typeArgs: [string, string, string],
  args: RepayDebtXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::repay_debt_x`,
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
  typeArgs: [string, string, string],
  args: RepayDebtYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::repay_debt_y`,
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

export interface SlippageToleranceAssertionArgs {
  pool: TransactionObjectInput
  p0DesiredX128: bigint | TransactionArgument
  maxSlippageBps: number | TransactionArgument
}

export function slippageToleranceAssertion(
  tx: Transaction,
  typeArgs: [string, string],
  args: SlippageToleranceAssertionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::slippage_tolerance_assertion`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.p0DesiredX128, `u256`),
      pure(tx, args.maxSlippageBps, `u16`),
    ],
  })
}
