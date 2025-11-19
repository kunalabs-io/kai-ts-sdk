import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(
  tx: Transaction,
  pubkey: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian::new`,
    arguments: [pure(tx, pubkey, `vector<u8>`)],
  })
}

export function pubkey(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::guardian::pubkey`, arguments: [obj(tx, self)] })
}

export function asBytes(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::guardian::as_bytes`, arguments: [obj(tx, self)] })
}

export interface VerifyArgs {
  self: TransactionObjectInput
  signature: TransactionObjectInput
  messageHash: Array<number | TransactionArgument> | TransactionArgument
}

export function verify(tx: Transaction, args: VerifyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian::verify`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.signature),
      pure(tx, args.messageHash, `vector<u8>`),
    ],
  })
}

export interface EcrecoverArgs {
  message: Array<number | TransactionArgument> | TransactionArgument
  sig: Array<number | TransactionArgument> | TransactionArgument
}

export function ecrecover(tx: Transaction, args: EcrecoverArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian::ecrecover`,
    arguments: [pure(tx, args.message, `vector<u8>`), pure(tx, args.sig, `vector<u8>`)],
  })
}
