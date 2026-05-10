import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj } from '../../_framework/util'

/** Create a new Set. */
export function new_(
  tx: Transaction,
  typeArg: string,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::set::new`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface AddArgs {
  self: TransactionObjectInput
  key: GenericArg
}

/**
 * Add a new element to the set.
 * Aborts if the element already exists
 */
export function add(
  tx: Transaction,
  typeArg: string,
  args: AddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::set::add`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      generic(tx, `${typeArg}`, args.key),
    ],
  })
}

export interface ContainsArgs {
  self: TransactionObjectInput
  key: GenericArg
}

/** Returns true iff `set` contains an entry for `key`. */
export function contains(
  tx: Transaction,
  typeArg: string,
  args: ContainsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::set::contains`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      generic(tx, `${typeArg}`, args.key),
    ],
  })
}

export interface RemoveArgs {
  self: TransactionObjectInput
  key: GenericArg
}

export function remove(
  tx: Transaction,
  typeArg: string,
  args: RemoveArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::set::remove`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      generic(tx, `${typeArg}`, args.key),
    ],
  })
}
