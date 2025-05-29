import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function timestampSec(tx: Transaction, clock: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::timestamp_sec`,
    arguments: [obj(tx, clock)],
  })
}

export interface MuldivArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

export function muldiv(tx: Transaction, args: MuldivArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::muldiv`,
    arguments: [pure(tx, args.a, `u64`), pure(tx, args.b, `u64`), pure(tx, args.c, `u64`)],
  })
}

export interface MuldivRoundUpArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

export function muldivRoundUp(tx: Transaction, args: MuldivRoundUpArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::muldiv_round_up`,
    arguments: [pure(tx, args.a, `u64`), pure(tx, args.b, `u64`), pure(tx, args.c, `u64`)],
  })
}
