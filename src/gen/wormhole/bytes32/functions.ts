import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function length(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::length`, arguments: [] })
}

export function new_(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::new`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

export function default_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::default`, arguments: [] })
}

export function data(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::data`, arguments: [obj(tx, self)] })
}

export function fromU256Be(tx: Transaction, value: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_u256_be`,
    arguments: [pure(tx, value, `u256`)],
  })
}

export function toU256Be(tx: Transaction, value: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::to_u256_be`,
    arguments: [obj(tx, value)],
  })
}

export function fromU64Be(tx: Transaction, value: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_u64_be`,
    arguments: [pure(tx, value, `u64`)],
  })
}

export function toU64Be(tx: Transaction, value: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::to_u64_be`, arguments: [obj(tx, value)] })
}

export function fromBytes(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_bytes`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}

export function toBytes(tx: Transaction, value: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::to_bytes`, arguments: [obj(tx, value)] })
}

export function takeBytes(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::take_bytes`, arguments: [obj(tx, cur)] })
}

export function toAddress(tx: Transaction, value: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::to_address`,
    arguments: [obj(tx, value)],
  })
}

export function fromAddress(tx: Transaction, addr: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_address`,
    arguments: [pure(tx, addr, `address`)],
  })
}

export function fromUtf8(tx: Transaction, str: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_utf8`,
    arguments: [pure(tx, str, `${String.$typeName}`)],
  })
}

export function toUtf8(tx: Transaction, value: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::to_utf8`, arguments: [obj(tx, value)] })
}

export function isNonzero(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::is_nonzero`, arguments: [obj(tx, self)] })
}

export function isValid(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::is_valid`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

export interface PadLeftArgs {
  data: Array<number | TransactionArgument> | TransactionArgument
  dataReversed: boolean | TransactionArgument
}

export function padLeft(tx: Transaction, args: PadLeftArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::pad_left`,
    arguments: [pure(tx, args.data, `vector<u8>`), pure(tx, args.dataReversed, `bool`)],
  })
}

export function trimNonzeroLeft(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::trim_nonzero_left`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}
