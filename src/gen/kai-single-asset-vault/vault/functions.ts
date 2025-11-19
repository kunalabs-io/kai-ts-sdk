import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, pure } from '../../_framework/util'
import { Option } from '../../move-stdlib/option/structs'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function vaultAccessId(tx: Transaction, access: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::vault_access_id`,
    arguments: [obj(tx, access)],
  })
}

export interface NewStrategyRemovalTicketArgs {
  access: TransactionObjectInput
  returnedBalance: TransactionObjectInput
}

export function newStrategyRemovalTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: NewStrategyRemovalTicketArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::new_strategy_removal_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.access), obj(tx, args.returnedBalance)],
  })
}

export interface WithdrawTicketToWithdrawArgs {
  ticket: TransactionObjectInput
  access: TransactionObjectInput
}

export function withdrawTicketToWithdraw(
  tx: Transaction,
  typeArgs: [string, string],
  args: WithdrawTicketToWithdrawArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::withdraw_ticket_to_withdraw`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.ticket), obj(tx, args.access)],
  })
}

export interface RebalanceAmountsGetArgs {
  amounts: TransactionObjectInput
  access: TransactionObjectInput
}

export function rebalanceAmountsGet(tx: Transaction, args: RebalanceAmountsGetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::rebalance_amounts_get`,
    arguments: [obj(tx, args.amounts), obj(tx, args.access)],
  })
}

export function new_(
  tx: Transaction,
  typeArgs: [string, string],
  lpTreasury: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::new`,
    typeArguments: typeArgs,
    arguments: [obj(tx, lpTreasury)],
  })
}

export function assertUpgradeCap(tx: Transaction, cap: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::assert_upgrade_cap`,
    arguments: [obj(tx, cap)],
  })
}

export interface NewWithUpgradeCapArgs {
  cap: TransactionObjectInput
  lpTreasury: TransactionObjectInput
}

export function newWithUpgradeCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: NewWithUpgradeCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::new_with_upgrade_cap`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.lpTreasury)],
  })
}

export function assertVersion(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::assert_version`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export function freeBalance(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::free_balance`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export function tvlCap(tx: Transaction, typeArgs: [string, string], vault: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::tvl_cap`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface TotalAvailableBalanceArgs {
  vault: TransactionObjectInput
  clock: TransactionObjectInput
}

export function totalAvailableBalance(
  tx: Transaction,
  typeArgs: [string, string],
  args: TotalAvailableBalanceArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::total_available_balance`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.vault), obj(tx, args.clock)],
  })
}

export function totalYtSupply(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::total_yt_supply`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface SetTvlCapArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  tvlCap: bigint | TransactionArgument | TransactionArgument | null
}

export function setTvlCap(tx: Transaction, typeArgs: [string, string], args: SetTvlCapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::set_tvl_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      pure(tx, args.tvlCap, `${Option.$typeName}<u64>`),
    ],
  })
}

export interface SetProfitUnlockDurationSecArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  profitUnlockDurationSec: bigint | TransactionArgument
}

export function setProfitUnlockDurationSec(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetProfitUnlockDurationSecArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::set_profit_unlock_duration_sec`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      pure(tx, args.profitUnlockDurationSec, `u64`),
    ],
  })
}

export interface SetPerformanceFeeBpsArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  performanceFeeBps: bigint | TransactionArgument
}

export function setPerformanceFeeBps(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetPerformanceFeeBpsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::set_performance_fee_bps`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.vault), pure(tx, args.performanceFeeBps, `u64`)],
  })
}

export interface WithdrawPerformanceFeeArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function withdrawPerformanceFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: WithdrawPerformanceFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::withdraw_performance_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.vault), pure(tx, args.amount, `u64`)],
  })
}

export interface PullUnlockedProfitsToFreeBalanceArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  clock: TransactionObjectInput
}

export function pullUnlockedProfitsToFreeBalance(
  tx: Transaction,
  typeArgs: [string, string],
  args: PullUnlockedProfitsToFreeBalanceArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::pull_unlocked_profits_to_free_balance`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.vault), obj(tx, args.clock)],
  })
}

export interface AddStrategyArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
}

export function addStrategy(tx: Transaction, typeArgs: [string, string], args: AddStrategyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::add_strategy`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.vault)],
  })
}

export interface SetStrategyMaxBorrowArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  strategyId: string | TransactionArgument
  maxBorrow: bigint | TransactionArgument | TransactionArgument | null
}

export function setStrategyMaxBorrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetStrategyMaxBorrowArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::set_strategy_max_borrow`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      pure(tx, args.strategyId, `${ID.$typeName}`),
      pure(tx, args.maxBorrow, `${Option.$typeName}<u64>`),
    ],
  })
}

export interface SetStrategyTargetAllocWeightsBpsArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  ids: Array<string | TransactionArgument> | TransactionArgument
  weightsBps: Array<bigint | TransactionArgument> | TransactionArgument
}

export function setStrategyTargetAllocWeightsBps(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetStrategyTargetAllocWeightsBpsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::set_strategy_target_alloc_weights_bps`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      pure(tx, args.ids, `vector<${ID.$typeName}>`),
      pure(tx, args.weightsBps, `vector<u64>`),
    ],
  })
}

export interface RemoveStrategyArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  ticket: TransactionObjectInput
  idsForWeights: Array<string | TransactionArgument> | TransactionArgument
  weightsBps: Array<bigint | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function removeStrategy(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveStrategyArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::remove_strategy`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      obj(tx, args.ticket),
      pure(tx, args.idsForWeights, `vector<${ID.$typeName}>`),
      pure(tx, args.weightsBps, `vector<u64>`),
      obj(tx, args.clock),
    ],
  })
}

export interface SetWithdrawalsDisabledArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  withdrawalsDisabled: boolean | TransactionArgument
}

export function setWithdrawalsDisabled(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetWithdrawalsDisabledArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::set_withdrawals_disabled`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.vault), pure(tx, args.withdrawalsDisabled, `bool`)],
  })
}

export function withdrawalsDisabled(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::withdrawals_disabled`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface SetRateLimiterArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  rateLimiter: GenericArg
}

export function setRateLimiter(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SetRateLimiterArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::set_rate_limiter`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      generic(tx, `${typeArgs[2]}`, args.rateLimiter),
    ],
  })
}

export interface RemoveRateLimiterArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
}

export function removeRateLimiter(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveRateLimiterArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::remove_rate_limiter`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.vault)],
  })
}

export function hasRateLimiter(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::has_rate_limiter`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export function rateLimiterMut(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::rate_limiter_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface SetMaxInflowAndOutflowLimitsArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  maxInflowLimit: bigint | TransactionArgument | TransactionArgument | null
  maxOutflowLimit: bigint | TransactionArgument | TransactionArgument | null
}

export function setMaxInflowAndOutflowLimits(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetMaxInflowAndOutflowLimitsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::set_max_inflow_and_outflow_limits`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      pure(tx, args.maxInflowLimit, `${Option.$typeName}<u256>`),
      pure(tx, args.maxOutflowLimit, `${Option.$typeName}<u256>`),
    ],
  })
}

export interface MigrateArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
}

export function migrate(tx: Transaction, typeArgs: [string, string], args: MigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::migrate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.vault)],
  })
}

export interface DepositArgs {
  vault: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

export function deposit(tx: Transaction, typeArgs: [string, string], args: DepositArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::deposit`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.vault), obj(tx, args.balance), obj(tx, args.clock)],
  })
}

export function createWithdrawTicket(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::create_withdraw_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface WithdrawArgs {
  vault: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

export function withdraw(tx: Transaction, typeArgs: [string, string], args: WithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::withdraw`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.vault), obj(tx, args.balance), obj(tx, args.clock)],
  })
}

export interface RedeemWithdrawTicketArgs {
  vault: TransactionObjectInput
  ticket: TransactionObjectInput
}

export function redeemWithdrawTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: RedeemWithdrawTicketArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::redeem_withdraw_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.vault), obj(tx, args.ticket)],
  })
}

export interface WithdrawTAmtArgs {
  vault: TransactionObjectInput
  tAmt: bigint | TransactionArgument
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

export function withdrawTAmt(tx: Transaction, typeArgs: [string, string], args: WithdrawTAmtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::withdraw_t_amt`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      pure(tx, args.tAmt, `u64`),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface StrategyWithdrawToTicketArgs {
  ticket: TransactionObjectInput
  access: TransactionObjectInput
  balance: TransactionObjectInput
}

export function strategyWithdrawToTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: StrategyWithdrawToTicketArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::strategy_withdraw_to_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.ticket), obj(tx, args.access), obj(tx, args.balance)],
  })
}

export interface CalcRebalanceAmountsArgs {
  vault: TransactionObjectInput
  clock: TransactionObjectInput
}

export function calcRebalanceAmounts(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcRebalanceAmountsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::calc_rebalance_amounts`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.vault), obj(tx, args.clock)],
  })
}

export interface StrategyRepayArgs {
  vault: TransactionObjectInput
  access: TransactionObjectInput
  balance: TransactionObjectInput
}

export function strategyRepay(
  tx: Transaction,
  typeArgs: [string, string],
  args: StrategyRepayArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::strategy_repay`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.vault), obj(tx, args.access), obj(tx, args.balance)],
  })
}

export interface StrategyBorrowArgs {
  vault: TransactionObjectInput
  access: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function strategyBorrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: StrategyBorrowArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::strategy_borrow`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.vault), obj(tx, args.access), pure(tx, args.amount, `u64`)],
  })
}

export interface StrategyHandOverProfitArgs {
  vault: TransactionObjectInput
  access: TransactionObjectInput
  profit: TransactionObjectInput
  clock: TransactionObjectInput
}

export function strategyHandOverProfit(
  tx: Transaction,
  typeArgs: [string, string],
  args: StrategyHandOverProfitArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vault::strategy_hand_over_profit`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.access),
      obj(tx, args.profit),
      obj(tx, args.clock),
    ],
  })
}
