import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

/** Convert u64 to String. */
export function str(tx: Transaction, num: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::utils::str`,
    arguments: [pure(tx, num, `u64`)],
  })
}
