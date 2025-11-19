import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function authorizeGovernance(tx: Transaction, wormholeState: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::transfer_fee::authorize_governance`,
    arguments: [obj(tx, wormholeState)],
  })
}

export interface TransferFeeArgs {
  wormholeState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function transferFee(tx: Transaction, args: TransferFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::transfer_fee::transfer_fee`,
    arguments: [obj(tx, args.wormholeState), obj(tx, args.receipt)],
  })
}

export interface HandleTransferFeeArgs {
  latestOnly: TransactionObjectInput
  wormholeState: TransactionObjectInput
  governancePayload: Array<number | TransactionArgument> | TransactionArgument
}

export function handleTransferFee(tx: Transaction, args: HandleTransferFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::transfer_fee::handle_transfer_fee`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.wormholeState),
      pure(tx, args.governancePayload, `vector<u8>`),
    ],
  })
}

export function deserialize(
  tx: Transaction,
  payload: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::transfer_fee::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
