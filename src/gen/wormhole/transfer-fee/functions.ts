import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function authorizeGovernance(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::transfer_fee::authorize_governance`,
    arguments: [obj(tx, state)],
  })
}

export interface TransferFeeArgs {
  state: TransactionObjectInput
  decreeReceipt: TransactionObjectInput
}

export function transferFee(tx: Transaction, args: TransferFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::transfer_fee::transfer_fee`,
    arguments: [obj(tx, args.state), obj(tx, args.decreeReceipt)],
  })
}

export interface HandleTransferFeeArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  vecU8: Array<number | TransactionArgument> | TransactionArgument
}

export function handleTransferFee(tx: Transaction, args: HandleTransferFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::transfer_fee::handle_transfer_fee`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state), pure(tx, args.vecU8, `vector<u8>`)],
  })
}

export function deserialize(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::transfer_fee::deserialize`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}
