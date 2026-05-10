import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { String } from '../../std/string/structs'

export function length(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::length`,
    arguments: [],
  })
}

/** Create new `Bytes32`, which checks the length of input `data`. */
export function new_(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::new`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

/** Create new `Bytes20` of all zeros. */
export function default_(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::default`,
    arguments: [],
  })
}

/** Retrieve underlying `data`. */
export function data(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::data`,
    arguments: [obj(tx, self)],
  })
}

/** Serialize `u256` as big-endian format in zero-padded `Bytes32`. */
export function fromU256Be(
  tx: Transaction,
  value: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::from_u256_be`,
    arguments: [pure(tx, value, `u256`)],
  })
}

/** Deserialize from big-endian `u256`. */
export function toU256Be(
  tx: Transaction,
  value: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::to_u256_be`,
    arguments: [obj(tx, value)],
  })
}

/** Serialize `u64` as big-endian format in zero-padded `Bytes32`. */
export function fromU64Be(
  tx: Transaction,
  value: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::from_u64_be`,
    arguments: [pure(tx, value, `u64`)],
  })
}

/**
 * Deserialize from big-endian `u64` as long as the data does not
 * overflow.
 */
export function toU64Be(
  tx: Transaction,
  value: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::to_u64_be`,
    arguments: [obj(tx, value)],
  })
}

/**
 * Either trim or pad (depending on length of the input `vector<u8>`) to 32
 * bytes.
 */
export function fromBytes(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::from_bytes`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}

/** Destroy `Bytes32` for its underlying data. */
export function toBytes(
  tx: Transaction,
  value: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::to_bytes`,
    arguments: [obj(tx, value)],
  })
}

/** Drain 32 elements of `Cursor<u8>` to create `Bytes32`. */
export function takeBytes(
  tx: Transaction,
  cur: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::take_bytes`,
    arguments: [obj(tx, cur)],
  })
}

/** Destroy `Bytes32` to represent its underlying data as `address`. */
export function toAddress(
  tx: Transaction,
  value: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::to_address`,
    arguments: [obj(tx, value)],
  })
}

/** Create `Bytes32` from `address`. */
export function fromAddress(
  tx: Transaction,
  addr: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::from_address`,
    arguments: [pure(tx, addr, `address`)],
  })
}

export function fromUtf8(
  tx: Transaction,
  str: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::from_utf8`,
    arguments: [pure(tx, str, `${String.$typeName}`)],
  })
}

/**
 * Even if the input is valid utf8, the result might be shorter than 32
 * bytes, because the original string might have a multi-byte utf8
 * character at the 32 byte boundary, which, when split, results in an
 * invalid code point, so we remove it.
 */
export function toUtf8(
  tx: Transaction,
  value: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::to_utf8`,
    arguments: [obj(tx, value)],
  })
}

/** Validate that any of the bytes in underlying data is non-zero. */
export function isNonzero(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::is_nonzero`,
    arguments: [obj(tx, self)],
  })
}

/** Check that the input data is correct length. */
export function isValid(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::is_valid`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

export interface PadLeftArgs {
  data: Array<number | TransactionArgument> | TransactionArgument
  dataReversed: boolean | TransactionArgument
}

/** For vector size less than 32, add zeros to the left. */
export function padLeft(
  tx: Transaction,
  args: PadLeftArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::pad_left`,
    arguments: [
      pure(tx, args.data, `vector<u8>`),
      pure(tx, args.dataReversed, `bool`),
    ],
  })
}

/**
 * Trim bytes from the left if they are zero. If any of these bytes
 * are non-zero, abort.
 */
export function trimNonzeroLeft(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::bytes32::trim_nonzero_left`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}
