import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { Section } from './structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreateArgs {
  start: bigint | TransactionArgument
  startVal: bigint | TransactionArgument
  sections: Array<TransactionObjectInput> | TransactionArgument
}

export function create(tx: Transaction, args: CreateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::piecewise::create`,
    arguments: [
      pure(tx, args.start, `u64`),
      pure(tx, args.startVal, `u64`),
      vector(tx, `${Section.$typeName}`, args.sections),
    ],
  })
}

export function range(tx: Transaction, pw: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::piecewise::range`, arguments: [obj(tx, pw)] })
}

export interface SectionArgs {
  end: bigint | TransactionArgument
  endVal: bigint | TransactionArgument
}

export function section(tx: Transaction, args: SectionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::piecewise::section`,
    arguments: [pure(tx, args.end, `u64`), pure(tx, args.endVal, `u64`)],
  })
}

export interface ValueAtArgs {
  pw: TransactionObjectInput
  x: bigint | TransactionArgument
}

export function valueAt(tx: Transaction, args: ValueAtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::piecewise::value_at`,
    arguments: [obj(tx, args.pw), pure(tx, args.x, `u64`)],
  })
}
