import { PUBLISHED_AT } from '..'
import { ID } from '../../_dependencies/onchain/0x2/object/structs'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::new`,
    arguments: [obj(tx, bytes32)],
  })
}

export function default_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::external_address::default`, arguments: [] })
}

export function newNonzero(tx: Transaction, bytes32: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::new_nonzero`,
    arguments: [obj(tx, bytes32)],
  })
}

export function toBytes(tx: Transaction, externalAddress: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::to_bytes`,
    arguments: [obj(tx, externalAddress)],
  })
}

export function toBytes32(tx: Transaction, externalAddress: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::to_bytes32`,
    arguments: [obj(tx, externalAddress)],
  })
}

export function takeBytes(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::take_bytes`,
    arguments: [obj(tx, cursor)],
  })
}

export function takeNonzero(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::take_nonzero`,
    arguments: [obj(tx, cursor)],
  })
}

export function toAddress(tx: Transaction, externalAddress: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::to_address`,
    arguments: [obj(tx, externalAddress)],
  })
}

export function fromAddress(tx: Transaction, address: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::from_address`,
    arguments: [pure(tx, address, `address`)],
  })
}

export function fromId(tx: Transaction, id: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::from_id`,
    arguments: [pure(tx, id, `${ID.$typeName}`)],
  })
}

export function isNonzero(tx: Transaction, externalAddress: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::is_nonzero`,
    arguments: [obj(tx, externalAddress)],
  })
}
