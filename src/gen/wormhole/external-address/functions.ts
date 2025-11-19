import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(tx: Transaction, value: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::new`,
    arguments: [obj(tx, value)],
  })
}

export function default_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::external_address::default`, arguments: [] })
}

export function newNonzero(tx: Transaction, value: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::new_nonzero`,
    arguments: [obj(tx, value)],
  })
}

export function toBytes(tx: Transaction, ext: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::to_bytes`,
    arguments: [obj(tx, ext)],
  })
}

export function toBytes32(tx: Transaction, ext: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::to_bytes32`,
    arguments: [obj(tx, ext)],
  })
}

export function takeBytes(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::take_bytes`,
    arguments: [obj(tx, cur)],
  })
}

export function takeNonzero(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::take_nonzero`,
    arguments: [obj(tx, cur)],
  })
}

export function toAddress(tx: Transaction, ext: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::to_address`,
    arguments: [obj(tx, ext)],
  })
}

export function fromAddress(tx: Transaction, addr: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::from_address`,
    arguments: [pure(tx, addr, `address`)],
  })
}

export function fromId(tx: Transaction, id: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::from_id`,
    arguments: [pure(tx, id, `${ID.$typeName}`)],
  })
}

export function isNonzero(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::external_address::is_nonzero`,
    arguments: [obj(tx, self)],
  })
}
