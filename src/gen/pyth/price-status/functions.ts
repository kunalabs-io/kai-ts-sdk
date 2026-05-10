import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function fromU64(
  tx: Transaction,
  status: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price_status::from_u64`,
    arguments: [pure(tx, status, `u64`)],
  })
}

export function getStatus(
  tx: Transaction,
  priceStatus: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price_status::get_status`,
    arguments: [obj(tx, priceStatus)],
  })
}

export function newUnknown(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price_status::new_unknown`,
    arguments: [],
  })
}

export function newTrading(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price_status::new_trading`,
    arguments: [],
  })
}
