import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function length(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::length`,
    arguments: [],
  })
}

/** Create new `Bytes20`, which checks the length of input `data`. */
export function new_(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::new`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

/** Create new `Bytes20` of all zeros. */
export function default_(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::default`,
    arguments: [],
  })
}

/** Retrieve underlying `data`. */
export function data(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::data`,
    arguments: [obj(tx, self)],
  })
}

/**
 * Either trim or pad (depending on length of the input `vector<u8>`) to 20
 * bytes.
 */
export function fromBytes(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::from_bytes`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}

/** Destroy `Bytes20` for its underlying data. */
export function toBytes(tx: Transaction, value: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::to_bytes`,
    arguments: [obj(tx, value)],
  })
}

/** Drain 20 elements of `Cursor<u8>` to create `Bytes20`. */
export function take(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::take`,
    arguments: [obj(tx, cur)],
  })
}

/** Validate that any of the bytes in underlying data is non-zero. */
export function isNonzero(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::is_nonzero`,
    arguments: [obj(tx, self)],
  })
}

/** Check that the input data is correct length. */
export function isValid(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::is_valid`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

export interface PadLeftArgs {
  data: Array<number | TransactionArgument> | TransactionArgument
  dataReversed: boolean | TransactionArgument
}

/** For vector size less than 20, add zeros to the left. */
export function padLeft(tx: Transaction, args: PadLeftArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::pad_left`,
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
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes20::trim_nonzero_left`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}
