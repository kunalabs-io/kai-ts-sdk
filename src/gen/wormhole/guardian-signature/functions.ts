import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  r: TransactionObjectInput
  s: TransactionObjectInput
  recoveryId: number | TransactionArgument
  index: number | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::new`,
    arguments: [
      obj(tx, args.r),
      obj(tx, args.s),
      pure(tx, args.recoveryId, `u8`),
      pure(tx, args.index, `u8`),
    ],
  })
}

export function r(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::r`,
    arguments: [obj(tx, self)],
  })
}

export function s(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::s`,
    arguments: [obj(tx, self)],
  })
}

export function recoveryId(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::recovery_id`,
    arguments: [obj(tx, self)],
  })
}

export function index(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::index`,
    arguments: [obj(tx, self)],
  })
}

export function indexAsU64(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::index_as_u64`,
    arguments: [obj(tx, self)],
  })
}

export function toRsv(tx: Transaction, gs: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_signature::to_rsv`,
    arguments: [obj(tx, gs)],
  })
}
