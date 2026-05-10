import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'

export function currentVersion(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::version_control::current_version`,
    arguments: [],
  })
}

export function previousVersion(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::version_control::previous_version`,
    arguments: [],
  })
}
