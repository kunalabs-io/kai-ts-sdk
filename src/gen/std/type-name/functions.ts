import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

/**
 * Return a value representation of the type `T`. Package IDs that appear in fully qualified type
 * names in the output from this function are defining IDs (the ID of the package in storage that
 * first introduced the type).
 */
export function withDefiningIds(tx: Transaction, typeArg: string): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::with_defining_ids`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

/**
 * Return a value representation of the type `T`. Package IDs that appear in fully qualified type
 * names in the output from this function are original IDs (the ID of the first version of
 * the package, even if the type in question was introduced in a later upgrade).
 */
export function withOriginalIds(tx: Transaction, typeArg: string): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::with_original_ids`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

/**
 * Returns true iff the TypeName represents a primitive type, i.e. one of
 * u8, u16, u32, u64, u128, u256, bool, address, vector.
 */
export function isPrimitive(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::is_primitive`,
    arguments: [obj(tx, self)],
  })
}

/** Get the String representation of `self` */
export function asString(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::as_string`,
    arguments: [obj(tx, self)],
  })
}

/**
 * Get Address string (Base16 encoded), first part of the TypeName.
 * Aborts if given a primitive type.
 */
export function addressString(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::address_string`,
    arguments: [obj(tx, self)],
  })
}

/**
 * Get name of the module.
 * Aborts if given a primitive type.
 */
export function moduleString(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::module_string`,
    arguments: [obj(tx, self)],
  })
}

/** Convert `self` into its inner String */
export function intoString(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::into_string`,
    arguments: [obj(tx, self)],
  })
}

/** @deprecated Renamed to `with_defining_ids` for clarity. */
export function get(tx: Transaction, typeArg: string): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::get`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

/** @deprecated Renamed to `with_original_ids` for clarity. */
export function getWithOriginalIds(tx: Transaction, typeArg: string): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::get_with_original_ids`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

/** @deprecated Renamed to `as_string` for consistency. */
export function borrowString(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::borrow_string`,
    arguments: [obj(tx, self)],
  })
}

/** @deprecated Renamed to `address_string` for consistency. */
export function getAddress(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::get_address`,
    arguments: [obj(tx, self)],
  })
}

/** @deprecated Renamed to `module_string` for consistency. */
export function getModule(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std')}::type_name::get_module`,
    arguments: [obj(tx, self)],
  })
}
