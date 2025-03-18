import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export function init(tx: Transaction, witness: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::ywhusdte::init`, arguments: [obj(tx, witness)] })
}
