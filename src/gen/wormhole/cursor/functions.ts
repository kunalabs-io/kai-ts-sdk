import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, vector } from '../../_framework/util'

/** Initialises a cursor from a vector. */
export function new_(
  tx: Transaction,
  typeArg: string,
  data: Array<GenericArg> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::cursor::new`,
    typeArguments: [typeArg],
    arguments: [vector(tx, `${typeArg}`, data)],
  })
}

/** Retrieve underlying data. */
export function data(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::cursor::data`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/**
 * Check whether the underlying data is empty. This method is useful for
 * iterating over a `Cursor` to exhaust its contents.
 */
export function isEmpty(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::cursor::is_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/** Destroys an empty cursor. This method aborts if the cursor is not empty. */
export function destroyEmpty(
  tx: Transaction,
  typeArg: string,
  cursor: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::cursor::destroy_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, cursor)],
  })
}

/**
 * Consumes the rest of the cursor (thus destroying it) and returns the
 * remaining bytes.
 *
 * NOTE: Only use this function if you intend to consume the rest of the
 * bytes. Since the result is a vector, which can be dropped, it is not
 * possible to statically guarantee that the rest will be used.
 */
export function takeRest(
  tx: Transaction,
  typeArg: string,
  cursor: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::cursor::take_rest`,
    typeArguments: [typeArg],
    arguments: [obj(tx, cursor)],
  })
}

/** Retrieve the first element of the cursor and advances it. */
export function poke(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::cursor::poke`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}
