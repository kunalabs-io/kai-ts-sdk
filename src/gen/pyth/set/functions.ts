import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj } from '../../_framework/util'

/** Create a new Set. */
export function new_(tx: Transaction, typeArg: string): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::set::new`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface AddArgs {
  set: TransactionObjectInput
  key: GenericArg
}

/**
 * Add a new element to the set.
 * Aborts if the element already exists
 */
export function add(tx: Transaction, typeArg: string, args: AddArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::set::add`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.set),
      generic(tx, `${typeArg}`, args.key),
    ],
  })
}

export interface ContainsArgs {
  set: TransactionObjectInput
  key: GenericArg
}

/** Returns true iff `set` contains an entry for `key`. */
export function contains(tx: Transaction, typeArg: string, args: ContainsArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::set::contains`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.set),
      generic(tx, `${typeArg}`, args.key),
    ],
  })
}

/** Removes all elements from the set */
export function empty(
  tx: Transaction,
  typeArg: string,
  set: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::set::empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, set)],
  })
}
