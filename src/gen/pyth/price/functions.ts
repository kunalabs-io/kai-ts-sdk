import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface NewArgs {
  price: TransactionObjectInput
  conf: bigint | TransactionArgument
  expo: TransactionObjectInput
  timestamp: bigint | TransactionArgument
}

export function new_(
  tx: Transaction,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price::new`,
    arguments: [
      obj(tx, args.price),
      pure(tx, args.conf, `u64`),
      obj(tx, args.expo),
      pure(tx, args.timestamp, `u64`),
    ],
  })
}

export function getPrice(
  tx: Transaction,
  price: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price::get_price`,
    arguments: [obj(tx, price)],
  })
}

export function getConf(
  tx: Transaction,
  price: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price::get_conf`,
    arguments: [obj(tx, price)],
  })
}

export function getTimestamp(
  tx: Transaction,
  price: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price::get_timestamp`,
    arguments: [obj(tx, price)],
  })
}

export function getExpo(
  tx: Transaction,
  price: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::price::get_expo`,
    arguments: [obj(tx, price)],
  })
}
