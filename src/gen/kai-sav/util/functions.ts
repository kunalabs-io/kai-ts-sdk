import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Get current clock timestamp in seconds. */
export function timestampSec(tx: Transaction, clock: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::util::timestamp_sec`,
    arguments: [obj(tx, clock)],
  })
}

export interface MuldivArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

/** Multiply and divide u64 values. */
export function muldiv(tx: Transaction, args: MuldivArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::util::muldiv`,
    arguments: [
      pure(tx, args.a, `u64`),
      pure(tx, args.b, `u64`),
      pure(tx, args.c, `u64`),
    ],
  })
}

export interface MuldivRoundUpArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

/** Multiply and divide with rounding up. */
export function muldivRoundUp(tx: Transaction, args: MuldivRoundUpArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::util::muldiv_round_up`,
    arguments: [
      pure(tx, args.a, `u64`),
      pure(tx, args.b, `u64`),
      pure(tx, args.c, `u64`),
    ],
  })
}
