import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function init(
  tx: Transaction,
  otw: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::access_init::init`,
    arguments: [obj(tx, otw)],
  })
}
