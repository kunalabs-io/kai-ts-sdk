import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function newDataSourceRegistry(
  tx: Transaction,
  parentId: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::data_source::new_data_source_registry`,
    arguments: [obj(tx, parentId)],
  })
}

export interface AddArgs {
  parentId: TransactionObjectInput
  dataSource: TransactionObjectInput
}

export function add(tx: Transaction, args: AddArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::data_source::add`,
    arguments: [
      obj(tx, args.parentId),
      obj(tx, args.dataSource),
    ],
  })
}

export function empty(tx: Transaction, parentId: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::data_source::empty`,
    arguments: [obj(tx, parentId)],
  })
}

export interface ContainsArgs {
  parentId: TransactionObjectInput
  dataSource: TransactionObjectInput
}

export function contains(tx: Transaction, args: ContainsArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::data_source::contains`,
    arguments: [
      obj(tx, args.parentId),
      obj(tx, args.dataSource),
    ],
  })
}

export interface NewArgs {
  emitterChain: bigint | TransactionArgument
  emitterAddress: TransactionObjectInput
}

export function new_(tx: Transaction, args: NewArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::data_source::new`,
    arguments: [
      pure(tx, args.emitterChain, `u64`),
      obj(tx, args.emitterAddress),
    ],
  })
}

export function emitterChain(
  tx: Transaction,
  dataSource: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::data_source::emitter_chain`,
    arguments: [obj(tx, dataSource)],
  })
}

export function emitterAddress(
  tx: Transaction,
  dataSource: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::data_source::emitter_address`,
    arguments: [obj(tx, dataSource)],
  })
}
