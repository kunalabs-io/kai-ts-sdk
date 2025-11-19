import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function length(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::length`, arguments: [] })
}

export function new_(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::new`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

export function default_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::default`, arguments: [] })
}

export function data(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::data`, arguments: [obj(tx, self)] })
}

export function fromBytes(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::from_bytes`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}

export function toBytes(tx: Transaction, value: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::to_bytes`, arguments: [obj(tx, value)] })
}

export function take(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::take`, arguments: [obj(tx, cur)] })
}

export function isNonzero(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes20::is_nonzero`, arguments: [obj(tx, self)] })
}

export function isValid(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::is_valid`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

export interface PadLeftArgs {
  data: Array<number | TransactionArgument> | TransactionArgument
  dataReversed: boolean | TransactionArgument
}

export function padLeft(tx: Transaction, args: PadLeftArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::pad_left`,
    arguments: [pure(tx, args.data, `vector<u8>`), pure(tx, args.dataReversed, `bool`)],
  })
}

export function trimNonzeroLeft(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes20::trim_nonzero_left`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}
