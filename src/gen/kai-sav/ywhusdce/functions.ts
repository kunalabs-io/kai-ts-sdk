import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function init(tx: Transaction, witness: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav')}::ywhusdce::init`,
    arguments: [obj(tx, witness)],
  })
}
