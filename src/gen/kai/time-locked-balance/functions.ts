import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function destroyEmpty(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::destroy_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface CreateArgs {
  lockedBalance: TransactionObjectInput
  unlockStartTsSec: bigint | TransactionArgument
  unlockPerSecond: bigint | TransactionArgument
}

export function create(tx: Transaction, typeArg: string, args: CreateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::create`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.lockedBalance),
      pure(tx, args.unlockStartTsSec, `u64`),
      pure(tx, args.unlockPerSecond, `u64`),
    ],
  })
}

export interface WithdrawAllArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

export function withdrawAll(tx: Transaction, typeArg: string, args: WithdrawAllArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::withdraw_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.clock)],
  })
}

export interface WithdrawArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function withdraw(tx: Transaction, typeArg: string, args: WithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::withdraw`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), pure(tx, args.amount, `u64`), obj(tx, args.clock)],
  })
}

export interface CalcFinalUnlockTsSecArgs {
  startTs: bigint | TransactionArgument
  amountToIssue: bigint | TransactionArgument
  unlockPerSecond: bigint | TransactionArgument
}

export function calcFinalUnlockTsSec(tx: Transaction, args: CalcFinalUnlockTsSecArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::calc_final_unlock_ts_sec`,
    arguments: [
      pure(tx, args.startTs, `u64`),
      pure(tx, args.amountToIssue, `u64`),
      pure(tx, args.unlockPerSecond, `u64`),
    ],
  })
}

export function unlockPerSecond(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::unlock_per_second`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface ChangeUnlockPerSecondArgs {
  self: TransactionObjectInput
  newUnlockPerSecond: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function changeUnlockPerSecond(
  tx: Transaction,
  typeArg: string,
  args: ChangeUnlockPerSecondArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::change_unlock_per_second`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), pure(tx, args.newUnlockPerSecond, `u64`), obj(tx, args.clock)],
  })
}

export interface ChangeUnlockStartTsSecArgs {
  self: TransactionObjectInput
  newUnlockStartTsSec: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function changeUnlockStartTsSec(
  tx: Transaction,
  typeArg: string,
  args: ChangeUnlockStartTsSecArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::change_unlock_start_ts_sec`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), pure(tx, args.newUnlockStartTsSec, `u64`), obj(tx, args.clock)],
  })
}

export function unlockStartTsSec(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::unlock_start_ts_sec`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function extraneousLockedAmount(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::extraneous_locked_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function finalUnlockTsSec(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::final_unlock_ts_sec`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function getValues(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::get_values`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface MaxWithdrawableArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

export function maxWithdrawable(tx: Transaction, typeArg: string, args: MaxWithdrawableArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::max_withdrawable`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.clock)],
  })
}

export interface RemainingUnlockArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

export function remainingUnlock(tx: Transaction, typeArg: string, args: RemainingUnlockArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::remaining_unlock`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.clock)],
  })
}

export function skimExtraneousBalance(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::skim_extraneous_balance`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface TopUpArgs {
  self: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

export function topUp(tx: Transaction, typeArg: string, args: TopUpArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::top_up`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.balance), obj(tx, args.clock)],
  })
}

export interface UnlockArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

export function unlock(tx: Transaction, typeArg: string, args: UnlockArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::unlock`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.clock)],
  })
}

export interface UnlockableAmountArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

export function unlockableAmount(tx: Transaction, typeArg: string, args: UnlockableAmountArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::time_locked_balance::unlockable_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.clock)],
  })
}
