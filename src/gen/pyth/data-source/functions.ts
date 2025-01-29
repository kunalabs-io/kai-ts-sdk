import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface ContainsArgs {
  parentId: TransactionObjectInput
  dataSource: TransactionObjectInput
}

export function contains(tx: Transaction, args: ContainsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::data_source::contains`,
    arguments: [obj(tx, args.parentId), obj(tx, args.dataSource)],
  })
}

export function empty(tx: Transaction, parentId: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::data_source::empty`,
    arguments: [obj(tx, parentId)],
  })
}

export interface NewArgs {
  emitterChain: bigint | TransactionArgument
  emitterAddress: TransactionObjectInput
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::data_source::new`,
    arguments: [pure(tx, args.emitterChain, `u64`), obj(tx, args.emitterAddress)],
  })
}

export interface AddArgs {
  parentId: TransactionObjectInput
  dataSource: TransactionObjectInput
}

export function add(tx: Transaction, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::data_source::add`,
    arguments: [obj(tx, args.parentId), obj(tx, args.dataSource)],
  })
}

export function emitterAddress(tx: Transaction, dataSource: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::data_source::emitter_address`,
    arguments: [obj(tx, dataSource)],
  })
}

export function emitterChain(tx: Transaction, dataSource: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::data_source::emitter_chain`,
    arguments: [obj(tx, dataSource)],
  })
}

export function newDataSourceRegistry(tx: Transaction, parentId: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::data_source::new_data_source_registry`,
    arguments: [obj(tx, parentId)],
  })
}
