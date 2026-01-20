import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, pure } from '../../_framework/util'
import { Option } from '../../std/option/structs'
import { ID } from '../../sui/object/structs'

export function vaultAccessId(tx: Transaction, access: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::vault_access_id`,
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
  args: NewStrategyRemovalTicketArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::new_strategy_removal_ticket`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.access),
      obj(tx, args.returnedBalance),
    ],
  })
}

export interface WithdrawTicketToWithdrawArgs {
  ticket: TransactionObjectInput
  access: TransactionObjectInput
}

export function withdrawTicketToWithdraw(
  tx: Transaction,
  typeArgs: [string, string],
  args: WithdrawTicketToWithdrawArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::withdraw_ticket_to_withdraw`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.access),
    ],
  })
}

export interface RebalanceAmountsGetArgs {
  amounts: TransactionObjectInput
  access: TransactionObjectInput
}

export function rebalanceAmountsGet(
  tx: Transaction,
  args: RebalanceAmountsGetArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::rebalance_amounts_get`,
    arguments: [
      obj(tx, args.amounts),
      obj(tx, args.access),
    ],
  })
}

/**
 * Creates a new vault and admin cap for the given yield token.
 * Fails if the treasury cap has a nonzero supply.
 */
export function new_(
  tx: Transaction,
  typeArgs: [string, string],
  lpTreasury: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::new`,
    typeArguments: typeArgs,
    arguments: [obj(tx, lpTreasury)],
  })
}

export function assertUpgradeCap(tx: Transaction, cap: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::assert_upgrade_cap`,
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
  args: NewWithUpgradeCapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::new_with_upgrade_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.lpTreasury),
    ],
  })
}

export function assertVersion(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::assert_version`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

/** Returns the vault's free (unallocated) balance. */
export function freeBalance(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::free_balance`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

/** Get the vault's TVL cap. Returns `None` if there is no cap. */
export function tvlCap(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::tvl_cap`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface TotalAvailableBalanceArgs {
  vault: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Returns the total available balance in the vault, including free, unlocked profit, and strategy allocations. */
export function totalAvailableBalance(
  tx: Transaction,
  typeArgs: [string, string],
  args: TotalAvailableBalanceArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::total_available_balance`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.clock),
    ],
  })
}

/** Returns the total supply of LP tokens for the vault. */
export function totalYtSupply(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::total_yt_supply`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface SetTvlCapArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  tvlCap: bigint | TransactionArgument | null
}

/** Set the vault's TVL cap. Only callable by admin. */
export function setTvlCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetTvlCapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::set_tvl_cap`,
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

/** Set the profit unlock duration (seconds). Admin only. */
export function setProfitUnlockDurationSec(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetProfitUnlockDurationSecArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::set_profit_unlock_duration_sec`,
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

/** Set the performance fee in basis points. Admin only. */
export function setPerformanceFeeBps(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetPerformanceFeeBpsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::set_performance_fee_bps`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      pure(tx, args.performanceFeeBps, `u64`),
    ],
  })
}

export interface WithdrawPerformanceFeeArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Withdraws the specified amount of performance fees. Admin only. */
export function withdrawPerformanceFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: WithdrawPerformanceFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::withdraw_performance_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface PullUnlockedProfitsToFreeBalanceArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Move all unlocked profits to the vault's free balance. Admin only. */
export function pullUnlockedProfitsToFreeBalance(
  tx: Transaction,
  typeArgs: [string, string],
  args: PullUnlockedProfitsToFreeBalanceArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::pull_unlocked_profits_to_free_balance`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      obj(tx, args.clock),
    ],
  })
}

export interface AddStrategyArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
}

/** Add a new strategy to the vault. */
export function addStrategy(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddStrategyArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::add_strategy`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
    ],
  })
}

export interface SetStrategyMaxBorrowArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  strategyId: string | TransactionArgument
  maxBorrow: bigint | TransactionArgument | null
}

/** Set the maximum borrow amount for a strategy. Admin only. */
export function setStrategyMaxBorrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetStrategyMaxBorrowArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::set_strategy_max_borrow`,
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

/** Set target allocation weights (in BPS) for all strategies. Admin only. */
export function setStrategyTargetAllocWeightsBps(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetStrategyTargetAllocWeightsBpsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::set_strategy_target_alloc_weights_bps`,
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

/** Remove a strategy from the vault and update allocation weights. Admin only. */
export function removeStrategy(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveStrategyArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::remove_strategy`,
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

/** Disable or enable withdrawals from the vault. Admin only. */
export function setWithdrawalsDisabled(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetWithdrawalsDisabledArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::set_withdrawals_disabled`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
      pure(tx, args.withdrawalsDisabled, `bool`),
    ],
  })
}

/** Returns true if withdrawals are currently disabled for the vault. */
export function withdrawalsDisabled(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::withdrawals_disabled`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface SetRateLimiterArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  rateLimiter: GenericArg
}

/** Set the rate limiter for the vault. Admin only. */
export function setRateLimiter(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SetRateLimiterArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::set_rate_limiter`,
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

/** Remove the rate limiter from the vault. Admin only. */
export function removeRateLimiter(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveRateLimiterArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::remove_rate_limiter`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
    ],
  })
}

export function hasRateLimiter(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::has_rate_limiter`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export function rateLimiterMut(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::rate_limiter_mut`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface SetMaxInflowAndOutflowLimitsArgs {
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  maxInflowLimit: bigint | TransactionArgument | null
  maxOutflowLimit: bigint | TransactionArgument | null
}

/** Sets the maximum inflow and outflow limits for the vault's rate limiter. Admin only. */
export function setMaxInflowAndOutflowLimits(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetMaxInflowAndOutflowLimitsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::set_max_inflow_and_outflow_limits`,
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

/** Upgrade the vault to the latest module version. Admin only. */
export function migrate(
  tx: Transaction,
  typeArgs: [string, string],
  args: MigrateArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::migrate`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.vault),
    ],
  })
}

export interface DepositArgs {
  vault: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Deposit tokens into the vault and receive LP shares. */
export function deposit(
  tx: Transaction,
  typeArgs: [string, string],
  args: DepositArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::deposit`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export function createWithdrawTicket(
  tx: Transaction,
  typeArgs: [string, string],
  vault: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::create_withdraw_ticket`,
    typeArguments: typeArgs,
    arguments: [obj(tx, vault)],
  })
}

export interface WithdrawArgs {
  vault: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Withdraws assets from the vault by burning LP tokens and issues a withdraw ticket.
 *
 * This function processes a withdrawal request by burning the specified LP token balance,
 * joining any unlocked profits to the free balance, and calculating the withdrawable amount.
 * If the free balance is insufficient, it initiates withdrawals from strategies according to
 * the configured priority order. Withdrawals may be subject to rate limiting and time locks.
 * The returned `WithdrawTicket` must be used to call withdrawal for each strategy that needs to be withdrawn from
 * before the withdrawal can be fully claimed.
 */
export function withdraw(
  tx: Transaction,
  typeArgs: [string, string],
  args: WithdrawArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::withdraw`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface RedeemWithdrawTicketArgs {
  vault: TransactionObjectInput
  ticket: TransactionObjectInput
}

/** Redeems a withdraw ticket, finalizing the withdrawal and burning the corresponding LP tokens. */
export function redeemWithdrawTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: RedeemWithdrawTicketArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::redeem_withdraw_ticket`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.ticket),
    ],
  })
}

export interface WithdrawTAmtArgs {
  vault: TransactionObjectInput
  tAmt: bigint | TransactionArgument
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Withdraws a specified amount of the underlying token from the vault, burning the corresponding amount of LP tokens.
 * Returns a `WithdrawTicket` representing the withdrawal.
 */
export function withdrawTAmt(
  tx: Transaction,
  typeArgs: [string, string],
  args: WithdrawTAmtArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::withdraw_t_amt`,
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

/** Makes the strategy deposit the withdrawn balance into the `WithdrawTicket`. */
export function strategyWithdrawToTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: StrategyWithdrawToTicketArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::strategy_withdraw_to_ticket`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.access),
      obj(tx, args.balance),
    ],
  })
}

export interface CalcRebalanceAmountsArgs {
  vault: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Get the target rebalance amounts the strategies should repay or can borrow.
 * It takes into account strategy target allocation weights and max borrow limits
 * and calculates the values so that the vault's balance allocations are kept
 * at the target weights and all of the vault's balance is allocated.
 * This function is idempotent in the sense that if you rebalance the pool with
 * the returned amounts and call it again, the result will require no further
 * rebalancing.
 * The strategies are not expected to repay / borrow the exact amounts suggested
 * as this may be dictated by their internal logic, but they should try to
 * get as close as possible. Since the strategies are trusted, there are no
 * explicit checks for this within the vault.
 */
export function calcRebalanceAmounts(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcRebalanceAmountsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::calc_rebalance_amounts`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.clock),
    ],
  })
}

export interface StrategyRepayArgs {
  vault: TransactionObjectInput
  access: TransactionObjectInput
  balance: TransactionObjectInput
}

/** Strategies call this to repay loaned amounts. */
export function strategyRepay(
  tx: Transaction,
  typeArgs: [string, string],
  args: StrategyRepayArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::strategy_repay`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.access),
      obj(tx, args.balance),
    ],
  })
}

export interface StrategyBorrowArgs {
  vault: TransactionObjectInput
  access: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Strategies call this to borrow additional funds from the vault. Always returns
 * exact amount requested or aborts.
 */
export function strategyBorrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: StrategyBorrowArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::strategy_borrow`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.access),
      pure(tx, args.amount, `u64`),
    ],
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
  args: StrategyHandOverProfitArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::vault::strategy_hand_over_profit`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.access),
      obj(tx, args.profit),
      obj(tx, args.clock),
    ],
  })
}
