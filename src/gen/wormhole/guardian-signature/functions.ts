import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function index(tx: Transaction, guardianSignature: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::index`,
    arguments: [obj(tx, guardianSignature)],
  })
}

export function indexAsU64(tx: Transaction, guardianSignature: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::index_as_u64`,
    arguments: [obj(tx, guardianSignature)],
  })
}

export interface NewArgs {
  bytes321: TransactionObjectInput
  bytes322: TransactionObjectInput
  u81: number | TransactionArgument
  u82: number | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::new`,
    arguments: [
      obj(tx, args.bytes321),
      obj(tx, args.bytes322),
      pure(tx, args.u81, `u8`),
      pure(tx, args.u82, `u8`),
    ],
  })
}

export function r(tx: Transaction, guardianSignature: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::r`,
    arguments: [obj(tx, guardianSignature)],
  })
}

export function recoveryId(tx: Transaction, guardianSignature: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::recovery_id`,
    arguments: [obj(tx, guardianSignature)],
  })
}

export function s(tx: Transaction, guardianSignature: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::s`,
    arguments: [obj(tx, guardianSignature)],
  })
}

export function toRsv(tx: Transaction, guardianSignature: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::to_rsv`,
    arguments: [obj(tx, guardianSignature)],
  })
}
