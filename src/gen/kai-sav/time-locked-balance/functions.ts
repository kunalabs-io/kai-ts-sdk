import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Get the unlock start timestamp in seconds. */
export function unlockStartTsSec(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::unlock_start_ts_sec`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/** Get the unlock rate per second. */
export function unlockPerSecond(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::unlock_per_second`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/** Get the final unlock timestamp in seconds. */
export function finalUnlockTsSec(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::final_unlock_ts_sec`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/** Get unlock configuration values. */
export function getValues(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::get_values`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface CreateArgs {
  lockedBalance: TransactionObjectInput
  unlockStartTsSec: bigint | TransactionArgument
  unlockPerSecond: bigint | TransactionArgument
}

/**
 * Creates a new `TimeLockedBalance<T>` that will start unlocking at `unlock_start_ts_sec` and
 * unlock `unlock_per_second` of balance per second.
 */
export function create(tx: Transaction, typeArg: string, args: CreateArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::create`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.lockedBalance),
      pure(tx, args.unlockStartTsSec, `u64`),
      pure(tx, args.unlockPerSecond, `u64`),
    ],
  })
}

/**
 * Returns the value of extraneous balance.
 * Since `locked_balance` amount might not be evenly divisible by `unlock_per_second`, there will
 * be some
 * extraneous balance. E.g. if `locked_balance` is 21 and `unlock_per_second` is 10, this function
 * will
 * return 1. Extraneous balance can be withdrawn by calling `skim_extraneous_balance` at any time.
 * When `unlock_per_second` is 0, all balance in `locked_balance` is considered extraneous. This
 * makes
 * it possible to empty the `locked_balance` by setting `unlock_per_second` to 0 and then skimming.
 */
export function extraneousLockedAmount(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::extraneous_locked_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface MaxWithdrawableArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Get the maximum withdrawable amount at current time. */
export function maxWithdrawable(
  tx: Transaction,
  typeArg: string,
  args: MaxWithdrawableArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::max_withdrawable`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.clock),
    ],
  })
}

export interface RemainingUnlockArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Returns the total amount of balance that is yet to be unlocked. */
export function remainingUnlock(
  tx: Transaction,
  typeArg: string,
  args: RemainingUnlockArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::remaining_unlock`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.clock),
    ],
  })
}

export interface WithdrawArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/** Withdraws the specified (unlocked) amount. Errors if amount exceeds max. withdrawable. */
export function withdraw(tx: Transaction, typeArg: string, args: WithdrawArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::withdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      pure(tx, args.amount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface WithdrawAllArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Withdraw all available unlocked balance. */
export function withdrawAll(
  tx: Transaction,
  typeArg: string,
  args: WithdrawAllArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::withdraw_all`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.clock),
    ],
  })
}

export interface TopUpArgs {
  self: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Adds additional balance to be distributed (i.e. prolongs the duration of distribution). */
export function topUp(tx: Transaction, typeArg: string, args: TopUpArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::top_up`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface ChangeUnlockPerSecondArgs {
  self: TransactionObjectInput
  newUnlockPerSecond: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Changes `unlock_per_second` to a new value. New value is effective starting from the
 * current timestamp (unlocks up to and including the current timestamp are based on the previous
 * value).
 */
export function changeUnlockPerSecond(
  tx: Transaction,
  typeArg: string,
  args: ChangeUnlockPerSecondArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::change_unlock_per_second`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      pure(tx, args.newUnlockPerSecond, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface ChangeUnlockStartTsSecArgs {
  self: TransactionObjectInput
  newUnlockStartTsSec: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Changes `unlock_start_ts_sec` to a new value. If the new value is in the past, it will be set to
 * the current time.
 */
export function changeUnlockStartTsSec(
  tx: Transaction,
  typeArg: string,
  args: ChangeUnlockStartTsSecArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::change_unlock_start_ts_sec`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      pure(tx, args.newUnlockStartTsSec, `u64`),
      obj(tx, args.clock),
    ],
  })
}

/**
 * Skims extraneous balance. Since `locked_balance` might not be evenly divisible by, and balance
 * is unlocked only in the multiples of `unlock_per_second`, there might be some extra balance that
 * will
 * not be distributed (e.g. if `locked_balance` is 20 `unlock_per_second` is 10, the extraneous
 * balance will be 1). This balance can be retrieved using this function.
 * When `unlock_per_second` is set to 0, all of the balance in `locked_balance` is considered
 * extraneous.
 */
export function skimExtraneousBalance(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::skim_extraneous_balance`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/** Destroys the `TimeLockedBalance<T>` when its balances are empty. */
export function destroyEmpty(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::destroy_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface CalcFinalUnlockTsSecArgs {
  startTs: bigint | TransactionArgument
  amountToIssue: bigint | TransactionArgument
  unlockPerSecond: bigint | TransactionArgument
}

/** Helper function to calculate the `final_unlock_ts_sec`. Returns 0 when `unlock_per_second` is 0. */
export function calcFinalUnlockTsSec(
  tx: Transaction,
  args: CalcFinalUnlockTsSecArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::calc_final_unlock_ts_sec`,
    arguments: [
      pure(tx, args.startTs, `u64`),
      pure(tx, args.amountToIssue, `u64`),
      pure(tx, args.unlockPerSecond, `u64`),
    ],
  })
}

export interface UnlockableAmountArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Returns the amount of `locked_balance` that can be unlocked at this time. */
export function unlockableAmount(
  tx: Transaction,
  typeArg: string,
  args: UnlockableAmountArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::unlockable_amount`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.clock),
    ],
  })
}

export interface UnlockArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Unlocks the balance that is unlockable based on the time passed since previous unlock.
 * Moves the amount from `locked_balance` to `unlocked_balance`.
 */
export function unlock(tx: Transaction, typeArg: string, args: UnlockArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::time_locked_balance::unlock`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.clock),
    ],
  })
}
