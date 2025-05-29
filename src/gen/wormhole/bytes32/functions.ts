import { PUBLISHED_AT } from '..'
import { String } from '../../_dependencies/onchain/0x1/string/structs'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function length(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::length`, arguments: [] })
}

export function new_(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::new`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export function default_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::default`, arguments: [] })
}

export function data(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::data`, arguments: [obj(tx, bytes32)] })
}

export function fromU256Be(tx: Transaction, u256: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_u256_be`,
    arguments: [pure(tx, u256, `u256`)],
  })
}

export function toU256Be(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::to_u256_be`,
    arguments: [obj(tx, bytes32)],
  })
}

export function fromU64Be(tx: Transaction, u64: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_u64_be`,
    arguments: [pure(tx, u64, `u64`)],
  })
}

export function toU64Be(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::to_u64_be`,
    arguments: [obj(tx, bytes32)],
  })
}

export function fromBytes(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_bytes`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export function toBytes(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::to_bytes`,
    arguments: [obj(tx, bytes32)],
  })
}

export function takeBytes(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::take_bytes`,
    arguments: [obj(tx, cursor)],
  })
}

export function toAddress(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::to_address`,
    arguments: [obj(tx, bytes32)],
  })
}

export function fromAddress(tx: Transaction, address: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_address`,
    arguments: [pure(tx, address, `address`)],
  })
}

export function fromUtf8(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::from_utf8`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export function toUtf8(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes32::to_utf8`, arguments: [obj(tx, bytes32)] })
}

export function isNonzero(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::is_nonzero`,
    arguments: [obj(tx, bytes32)],
  })
}

export function isValid(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::is_valid`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export interface PadLeftArgs {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  bool: boolean | TransactionArgument
}

export function padLeft(tx: Transaction, args: PadLeftArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::pad_left`,
    arguments: [pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.bool, `bool`)],
  })
}

export function trimNonzeroLeft(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes32::trim_nonzero_left`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}
