import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj } from '../../_framework/util'

export interface AddArgs {
  object: TransactionObjectInput
  name: GenericArg
  value: GenericArg
}

/**
 * Adds a dynamic object field to the object `object: &mut UID` at field specified by `name: Name`.
 * Aborts with `EFieldAlreadyExists` if the object already has that field with that name.
 */
export function add(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::add`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
      generic(tx, `${typeArgs[1]}`, args.value),
    ],
  })
}

export interface BorrowArgs {
  object: TransactionObjectInput
  name: GenericArg
}

/**
 * Immutably borrows the `object`s dynamic object field with the name specified by `name: Name`.
 * Aborts with `EFieldDoesNotExist` if the object does not have a field with that name.
 * Aborts with `EFieldTypeMismatch` if the field exists, but the value object does not have the
 * specified type.
 */
export function borrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: BorrowArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::borrow`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}

export interface BorrowMutArgs {
  object: TransactionObjectInput
  name: GenericArg
}

/**
 * Mutably borrows the `object`s dynamic object field with the name specified by `name: Name`.
 * Aborts with `EFieldDoesNotExist` if the object does not have a field with that name.
 * Aborts with `EFieldTypeMismatch` if the field exists, but the value object does not have the
 * specified type.
 */
export function borrowMut(
  tx: Transaction,
  typeArgs: [string, string],
  args: BorrowMutArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::borrow_mut`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}

export interface RemoveArgs {
  object: TransactionObjectInput
  name: GenericArg
}

/**
 * Removes the `object`s dynamic object field with the name specified by `name: Name` and returns
 * the bound object.
 * Aborts with `EFieldDoesNotExist` if the object does not have a field with that name.
 * Aborts with `EFieldTypeMismatch` if the field exists, but the value object does not have the
 * specified type.
 */
export function remove(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::remove`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}

export interface ExistsArgs {
  object: TransactionObjectInput
  name: GenericArg
}

/**
 * Returns true if and only if the `object` has a dynamic object field with the name specified by
 * `name: Name`.
 */
export function exists(
  tx: Transaction,
  typeArg: string,
  args: ExistsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::exists`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArg}`, args.name),
    ],
  })
}

export interface ExistsWithTypeArgs {
  object: TransactionObjectInput
  name: GenericArg
}

/**
 * Returns true if and only if the `object` has a dynamic field with the name specified by
 * `name: Name` with an assigned value of type `Value`.
 */
export function existsWithType(
  tx: Transaction,
  typeArgs: [string, string],
  args: ExistsWithTypeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::exists_with_type`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}

export interface IdArgs {
  object: TransactionObjectInput
  name: GenericArg
}

/**
 * Returns the ID of the object associated with the dynamic object field
 * Returns none otherwise
 */
export function id(
  tx: Transaction,
  typeArg: string,
  args: IdArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::id`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArg}`, args.name),
    ],
  })
}

export interface RemoveOptArgs {
  object: TransactionObjectInput
  name: GenericArg
}

/**
 * Removes the dynamic object field if it exists. Returns `some(Value)` if it exists or `none`
 * otherwise.
 * Aborts with `EFieldTypeMismatch` if the field exists, but the value object does not have the
 * specified type.
 */
export function removeOpt(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveOptArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::remove_opt`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}

export interface ReplaceArgs {
  object: TransactionObjectInput
  name: GenericArg
  value: GenericArg
}

/**
 * Removes the existing value at `name` (if any) and adds `value` in its place.
 * Returns the old value if it existed, or `none` otherwise.
 * Note: the old and new value types may differ.
 * Aborts with `EFieldTypeMismatch` if the field exists, but the value object does not have the
 * specified `ValueOld` type.
 */
export function replace(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: ReplaceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::replace`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
      generic(tx, `${typeArgs[1]}`, args.value),
    ],
  })
}

export interface Exists_Args {
  object: TransactionObjectInput
  name: GenericArg
}

/** @deprecated Renamed to `exists` */
export function exists_(
  tx: Transaction,
  typeArg: string,
  args: Exists_Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::exists_`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArg}`, args.name),
    ],
  })
}

export interface InternalAddArgs {
  object: TransactionObjectInput
  name: GenericArg
  value: GenericArg
}

export function internalAdd(
  tx: Transaction,
  typeArgs: [string, string],
  args: InternalAddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::internal_add`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
      generic(tx, `${typeArgs[1]}`, args.value),
    ],
  })
}

export interface InternalBorrowArgs {
  object: TransactionObjectInput
  name: GenericArg
}

export function internalBorrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: InternalBorrowArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::internal_borrow`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}

export interface InternalBorrowMutArgs {
  object: TransactionObjectInput
  name: GenericArg
}

export function internalBorrowMut(
  tx: Transaction,
  typeArgs: [string, string],
  args: InternalBorrowMutArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::internal_borrow_mut`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}

export interface InternalRemoveArgs {
  object: TransactionObjectInput
  name: GenericArg
}

export function internalRemove(
  tx: Transaction,
  typeArgs: [string, string],
  args: InternalRemoveArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::dynamic_object_field::internal_remove`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}

export interface InternalExistsWithTypeArgs {
  object: TransactionObjectInput
  name: GenericArg
}

export function internalExistsWithType(
  tx: Transaction,
  typeArgs: [string, string],
  args: InternalExistsWithTypeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('sui', options?.env)
    }::dynamic_object_field::internal_exists_with_type`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.object),
      generic(tx, `${typeArgs[0]}`, args.name),
    ],
  })
}
