import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Create an empty `BalanceBag`. */
export function empty(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::balance_bag::empty`,
    arguments: [],
  })
}

/** Get a read-only map of amounts per coin type. */
export function amounts(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::balance_bag::amounts`,
    arguments: [obj(tx, self)],
  })
}

export interface AddArgs {
  self: TransactionObjectInput
  balance: TransactionObjectInput
}

/** Add a `Balance<T>` to the bag, joining with existing balance if present. */
export function add(tx: Transaction, typeArg: string, args: AddArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::balance_bag::add`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.balance),
    ],
  })
}

/** Remove and return the entire `Balance<T>` for type `T`. Returns zero if absent. */
export function takeAll(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::balance_bag::take_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface TakeAmountArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Remove and return `amount` of `Balance<T>`. Returns zero if `amount` is 0. */
export function takeAmount(
  tx: Transaction,
  typeArg: string,
  args: TakeAmountArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::balance_bag::take_amount`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      pure(tx, args.amount, `u64`),
    ],
  })
}

/** True if the bag contains no balances. */
export function isEmpty(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::balance_bag::is_empty`,
    arguments: [obj(tx, self)],
  })
}

/** Destroy an empty bag. */
export function destroyEmpty(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::balance_bag::destroy_empty`,
    arguments: [obj(tx, self)],
  })
}
