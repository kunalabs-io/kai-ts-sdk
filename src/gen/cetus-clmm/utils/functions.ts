import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { Transaction, TransactionArgument } from '@mysten/sui/transactions'

export function str(tx: Transaction, num: bigint | TransactionArgument) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::utils::str`, arguments: [pure(tx, num, `u64`)] })
}
