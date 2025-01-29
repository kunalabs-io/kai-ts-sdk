import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function asBytes(tx: Transaction, guardian: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian::as_bytes`,
    arguments: [obj(tx, guardian)],
  })
}

export function new_(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian::new`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export function pubkey(tx: Transaction, guardian: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian::pubkey`,
    arguments: [obj(tx, guardian)],
  })
}

export interface VerifyArgs {
  guardian: TransactionObjectInput
  guardianSignature: TransactionObjectInput
  vecU8: Array<number | TransactionArgument> | TransactionArgument
}

export function verify(tx: Transaction, args: VerifyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian::verify`,
    arguments: [
      obj(tx, args.guardian),
      obj(tx, args.guardianSignature),
      pure(tx, args.vecU8, `vector<u8>`),
    ],
  })
}

export interface EcrecoverArgs {
  vecU81: Array<number | TransactionArgument> | TransactionArgument
  vecU82: Array<number | TransactionArgument> | TransactionArgument
}

export function ecrecover(tx: Transaction, args: EcrecoverArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian::ecrecover`,
    arguments: [pure(tx, args.vecU81, `vector<u8>`), pure(tx, args.vecU82, `vector<u8>`)],
  })
}
