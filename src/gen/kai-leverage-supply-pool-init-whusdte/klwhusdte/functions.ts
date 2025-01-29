import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export function init(tx: Transaction, w: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::klwhusdte::init`, arguments: [obj(tx, w)] })
}
