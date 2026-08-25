import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, pure } from '../../_framework/util'

/**
 * Issues a `Permit<K>` from the privileged `internal::Permit<K>`, granting access to the
 * scratch entries keyed by values of type `K`.
 */
export function permit(
  tx: Transaction,
  typeArg: string,
  permit: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::permit`,
    typeArguments: [typeArg],
    arguments: [obj(tx, permit)],
  })
}

export interface AddArgs {
  permit: TransactionObjectInput
  key: GenericArg
  value: GenericArg
}

/**
 * Adds the `key`-`value` pair to the scratch store. Requires a `Permit<K>` for the key type.
 * Aborts with `EEntryAlreadyExists` if there is already an entry for `key`, regardless of its
 * value type.
 */
export function add(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::add`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
      generic(tx, `${typeArgs[1]}`, args.value),
    ],
  })
}

export interface ReadArgs {
  permit: TransactionObjectInput
  key: GenericArg
}

/**
 * Returns a copy of the value bound to `key`. Requires a `Permit<K>` for the key type.
 * Aborts with `EEntryDoesNotExist` if there is no entry for `key`.
 * Aborts with `EEntryTypeMismatch` if the entry exists, but its value is not of type `V`.
 */
export function read(
  tx: Transaction,
  typeArgs: [string, string],
  args: ReadArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::read`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
    ],
  })
}

export interface RemoveArgs {
  permit: TransactionObjectInput
  key: GenericArg
}

/**
 * Removes the entry bound to `key` and returns its value. Requires a `Permit<K>` for the key type.
 * Aborts with `EEntryDoesNotExist` if there is no entry for `key`.
 * Aborts with `EEntryTypeMismatch` if the entry exists, but its value is not of type `V`.
 */
export function remove(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::remove`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
    ],
  })
}

export interface ExistsArgs {
  permit: TransactionObjectInput
  key: GenericArg
}

/**
 * Returns true if and only if the scratch store has an entry for `key`, without regard to the
 * value type. Requires a `Permit<K>` for the key type.
 */
export function exists(
  tx: Transaction,
  typeArg: string,
  args: ExistsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::exists`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArg}`, args.key),
    ],
  })
}

export interface ExistsWithTypeArgs {
  permit: TransactionObjectInput
  key: GenericArg
}

/**
 * Returns true if and only if the scratch store has an entry for `key` whose value is of type `V`.
 * Requires a `Permit<K>` for the key type.
 */
export function existsWithType(
  tx: Transaction,
  typeArgs: [string, string],
  args: ExistsWithTypeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::exists_with_type`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
    ],
  })
}

export interface ReadOptArgs {
  permit: TransactionObjectInput
  key: GenericArg
}

/**
 * Returns a copy of the value bound to `key` as `some(value)` if it exists, or `none` otherwise.
 * Aborts with `EEntryTypeMismatch` if the entry exists, but its value is not of type `V`.
 */
export function readOpt(
  tx: Transaction,
  typeArgs: [string, string],
  args: ReadOptArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::read_opt`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
    ],
  })
}

export interface RemoveOptArgs {
  permit: TransactionObjectInput
  key: GenericArg
}

/**
 * Removes the entry bound to `key` if it exists, returning `some(value)`, or `none` otherwise.
 * Aborts with `EEntryTypeMismatch` if the entry exists, but its value is not of type `V`.
 */
export function removeOpt(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveOptArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::remove_opt`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
    ],
  })
}

export interface ReplaceArgs {
  permit: TransactionObjectInput
  key: GenericArg
  value: GenericArg
}

/**
 * Removes the existing value at `key` (if any) and adds `value` in its place.
 * Returns the old value if it existed, or `none` otherwise.
 * Note: the old and new value types may differ.
 * Aborts with `EEntryTypeMismatch` if the entry exists, but its value is not of type `VOld`.
 */
export function replace(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReplaceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::replace`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
      generic(tx, `${typeArgs[1]}`, args.value),
    ],
  })
}

export interface BeginBorrowArgs {
  permit: TransactionObjectInput
  key: GenericArg
}

/**
 * Not intended for direct usage. Instead, call `get_do`, `get_fold`, or their mutable variants,
 * which handle the borrow-style usage of the value.
 * Begins a "borrow" of `key`: removes and returns its value, leaving a unique `BorrowMarker` in
 * the slot so nothing can add to or read it until `end_borrow` restores the value. Returns the
 * value and the marker, which must be passed to `end_borrow`.
 * While it is not verified that the same value is restored, the intended usage is guaranteed
 * by the borrow-style macros (`get_do`, `get_fold`, and their mutable variants).
 * Aborts with `EEntryDoesNotExist` if there is no entry for `key`.
 * Aborts with `EEntryTypeMismatch` if the entry exists, but its value is not of type `V`.
 */
export function beginBorrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: BeginBorrowArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::begin_borrow`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
    ],
  })
}

export interface EndBorrowArgs {
  permit: TransactionObjectInput
  key: GenericArg
  value: GenericArg
  marker: TransactionObjectInput
}

/**
 * Not intended for direct usage. Instead, call `get_do`, `get_fold`, or their mutable variants,
 * which handle the borrow-style usage of the value.
 * Ends a "borrow" begun by `begin_borrow`: removes the `BorrowMarker` from `key`'s slot and
 * restores `value`.
 * While it is not verified that the same value is restored, the intended usage is guaranteed
 * by the borrow-style macros (`get_do`, `get_fold`, and their mutable variants).
 * Aborts with `EEntryDoesNotExist` if the borrow was already ended.
 * Aborts with `EEntryTypeMismatch` if the entry exists, but its value is not a `BorrowMarker<V>`.
 * Aborts with `EBorrowMarkerMismatch` unless the slot still holds `marker`.
 */
export function endBorrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: EndBorrowArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::end_borrow`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.permit),
      generic(tx, `${typeArgs[0]}`, args.key),
      generic(tx, `${typeArgs[1]}`, args.value),
      obj(tx, args.marker),
    ],
  })
}

/**
 * Returns a fresh `BorrowMarker<V>`, unique within the transaction, from a monotonic counter kept
 * in its own scratch entry.
 */
export function borrowMarker(
  tx: Transaction,
  typeArg: string,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::borrow_marker`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

/**
 * Hashes the type and value of `k` against `DUMMY_ROOT` to produce the address identifying its
 * scratch entry.
 */
export function hashTypeAndKey(
  tx: Transaction,
  typeArg: string,
  k: GenericArg,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::hash_type_and_key`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, k)],
  })
}

export interface AddImplArgs {
  key: string | TransactionArgument
  value: GenericArg
}

/**
 * Aborts with `EEntryAlreadyExists` if there is an entry already for `key`, regardless of the
 * type of `V`
 */
export function addImpl(
  tx: Transaction,
  typeArg: string,
  args: AddImplArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::add_impl`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.key, `address`),
      generic(tx, `${typeArg}`, args.value),
    ],
  })
}

/**
 * Aborts with `EEntryDoesNotExist` if there is no entry for `key`.
 * Aborts with `EEntryTypeMismatch` if there is an entry for `key` but it is not of type `V`.
 */
export function readImpl(
  tx: Transaction,
  typeArg: string,
  key: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::read_impl`,
    typeArguments: [typeArg],
    arguments: [pure(tx, key, `address`)],
  })
}

/**
 * Aborts with `EEntryDoesNotExist` if there is no entry for `key`.
 * Aborts with `EEntryTypeMismatch` if there is an entry for `key` but it is not of type `V`.
 */
export function removeImpl(
  tx: Transaction,
  typeArg: string,
  key: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::remove_impl`,
    typeArguments: [typeArg],
    arguments: [pure(tx, key, `address`)],
  })
}

export function existsImpl(
  tx: Transaction,
  key: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::exists_impl`,
    arguments: [pure(tx, key, `address`)],
  })
}

export function existsWithTypeImpl(
  tx: Transaction,
  typeArg: string,
  key: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::scratch::exists_with_type_impl`,
    typeArguments: [typeArg],
    arguments: [pure(tx, key, `address`)],
  })
}
