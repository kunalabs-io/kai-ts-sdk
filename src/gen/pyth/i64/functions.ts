import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  magnitude: bigint | TransactionArgument
  negative: boolean | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64::new`,
    arguments: [pure(tx, args.magnitude, `u64`), pure(tx, args.negative, `bool`)],
  })
}

export function getIsNegative(tx: Transaction, i: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i64::get_is_negative`, arguments: [obj(tx, i)] })
}

export function getMagnitudeIfPositive(tx: Transaction, in_: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64::get_magnitude_if_positive`,
    arguments: [obj(tx, in_)],
  })
}

export function getMagnitudeIfNegative(tx: Transaction, in_: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64::get_magnitude_if_negative`,
    arguments: [obj(tx, in_)],
  })
}

export function fromU64(tx: Transaction, from: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64::from_u64`,
    arguments: [pure(tx, from, `u64`)],
  })
}

export interface ParseMagnitudeArgs {
  from: bigint | TransactionArgument
  negative: boolean | TransactionArgument
}

export function parseMagnitude(tx: Transaction, args: ParseMagnitudeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64::parse_magnitude`,
    arguments: [pure(tx, args.from, `u64`), pure(tx, args.negative, `bool`)],
  })
}
