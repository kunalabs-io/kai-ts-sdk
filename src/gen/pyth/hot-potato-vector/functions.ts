import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, pure, vector } from '../../_framework/util'

export function destroy(
  tx: Transaction,
  typeArg: string,
  hotPotatoVector: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::hot_potato_vector::destroy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, hotPotatoVector)],
  })
}

export function new_(
  tx: Transaction,
  typeArg: string,
  vec: Array<GenericArg> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::hot_potato_vector::new`,
    typeArguments: [typeArg],
    arguments: [vector(tx, `${typeArg}`, vec)],
  })
}

export function length(
  tx: Transaction,
  typeArg: string,
  potato: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::hot_potato_vector::length`,
    typeArguments: [typeArg],
    arguments: [obj(tx, potato)],
  })
}

export function isEmpty(
  tx: Transaction,
  typeArg: string,
  potato: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::hot_potato_vector::is_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, potato)],
  })
}

export interface BorrowArgs {
  potato: TransactionObjectInput
  i: bigint | TransactionArgument
}

export function borrow(
  tx: Transaction,
  typeArg: string,
  args: BorrowArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::hot_potato_vector::borrow`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.potato),
      pure(tx, args.i, `u64`),
    ],
  })
}

export function popBack(
  tx: Transaction,
  typeArg: string,
  hotPotatoVector: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::hot_potato_vector::pop_back`,
    typeArguments: [typeArg],
    arguments: [obj(tx, hotPotatoVector)],
  })
}
