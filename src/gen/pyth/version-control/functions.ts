import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'

export function currentVersion(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::version_control::current_version`,
    arguments: [],
  })
}

export function previousVersion(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::version_control::previous_version`,
    arguments: [],
  })
}
