import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function authorizeGovernance(tx: Transaction, wormholeState: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_fee::authorize_governance`,
    arguments: [obj(tx, wormholeState)],
  })
}

export interface SetFeeArgs {
  wormholeState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function setFee(tx: Transaction, args: SetFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_fee::set_fee`,
    arguments: [obj(tx, args.wormholeState), obj(tx, args.receipt)],
  })
}

export function deserialize(
  tx: Transaction,
  payload: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_fee::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
