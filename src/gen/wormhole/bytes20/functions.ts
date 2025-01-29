import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function length(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::length`, arguments: [] })
}

export function toBytes(tx: Transaction, bytes20: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::to_bytes`,
    arguments: [obj(tx, bytes20)],
  })
}

export function new_(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::new`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export function fromBytes(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::from_bytes`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export function data(tx: Transaction, bytes20: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::data`, arguments: [obj(tx, bytes20)] })
}

export function take(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::take`, arguments: [obj(tx, cursor)] })
}

export function default_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::default`, arguments: [] })
}

export function isNonzero(tx: Transaction, bytes20: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::is_nonzero`,
    arguments: [obj(tx, bytes20)],
  })
}

export function isValid(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::is_valid`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export interface PadLeftArgs {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  bool: boolean | TransactionArgument
}

export function padLeft(tx: Transaction, args: PadLeftArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::pad_left`,
    arguments: [pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.bool, `bool`)],
  })
}

export function trimNonzeroLeft(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::trim_nonzero_left`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}
