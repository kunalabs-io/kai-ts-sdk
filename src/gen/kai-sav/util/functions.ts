import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Get current clock timestamp in seconds. */
export function timestampSec(
  tx: Transaction,
  clock: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::util::timestamp_sec`,
    arguments: [obj(tx, clock)],
  })
}

export interface MuldivArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

/** Multiply and divide u64 values. */
export function muldiv(
  tx: Transaction,
  args: MuldivArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::util::muldiv`,
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
export function muldivRoundUp(
  tx: Transaction,
  args: MuldivRoundUpArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::util::muldiv_round_up`,
    arguments: [
      pure(tx, args.a, `u64`),
      pure(tx, args.b, `u64`),
      pure(tx, args.c, `u64`),
    ],
  })
}
