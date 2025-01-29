import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function deserializeI32(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::deserialize::deserialize_i32`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeI64(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::deserialize::deserialize_i64`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeU16(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::deserialize::deserialize_u16`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeU32(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::deserialize::deserialize_u32`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeU64(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::deserialize::deserialize_u64`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeU8(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::deserialize::deserialize_u8`,
    arguments: [obj(tx, cur)],
  })
}

export interface DeserializeVectorArgs {
  cur: TransactionObjectInput
  n: bigint | TransactionArgument
}

export function deserializeVector(tx: Transaction, args: DeserializeVectorArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::deserialize::deserialize_vector`,
    arguments: [obj(tx, args.cur), pure(tx, args.n, `u64`)],
  })
}
