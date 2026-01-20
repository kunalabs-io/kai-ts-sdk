import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function fromU64(tx: Transaction, status: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_status::from_u64`,
    arguments: [pure(tx, status, `u64`)],
  })
}

export function getStatus(tx: Transaction, priceStatus: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_status::get_status`,
    arguments: [obj(tx, priceStatus)],
  })
}

export function newUnknown(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_status::new_unknown`,
    arguments: [],
  })
}

export function newTrading(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_status::new_trading`,
    arguments: [],
  })
}
