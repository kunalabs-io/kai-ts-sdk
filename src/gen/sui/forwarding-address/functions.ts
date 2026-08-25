import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'

/**
 * Create and share the `ForwardingAddressRegistry` object. This function is called exactly
 * once, when the registry object is first created. Can only be called by genesis or
 * change_epoch transactions.
 */
export function create(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::forwarding_address::create`,
    arguments: [],
  })
}
