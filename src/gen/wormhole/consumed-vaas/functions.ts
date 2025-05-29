import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::consumed_vaas::new`, arguments: [] })
}

export interface ConsumeArgs {
  consumedVaAs: TransactionObjectInput
  bytes32: TransactionObjectInput
}

export function consume(tx: Transaction, args: ConsumeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::consumed_vaas::consume`,
    arguments: [obj(tx, args.consumedVaAs), obj(tx, args.bytes32)],
  })
}
