import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

/** Convert u64 to String. */
export function str(
  tx: Transaction,
  num: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::utils::str`,
    arguments: [pure(tx, num, `u64`)],
  })
}
