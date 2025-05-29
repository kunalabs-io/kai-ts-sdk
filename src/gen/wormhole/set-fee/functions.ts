import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function authorizeGovernance(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_fee::authorize_governance`,
    arguments: [obj(tx, state)],
  })
}

export interface SetFeeArgs {
  state: TransactionObjectInput
  decreeReceipt: TransactionObjectInput
}

export function setFee(tx: Transaction, args: SetFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_fee::set_fee`,
    arguments: [obj(tx, args.state), obj(tx, args.decreeReceipt)],
  })
}

export function deserialize(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_fee::deserialize`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}
