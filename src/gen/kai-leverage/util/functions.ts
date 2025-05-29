import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

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

export interface MuldivU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

export function muldivU128(tx: Transaction, args: MuldivU128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::muldiv_u128`,
    arguments: [pure(tx, args.a, `u128`), pure(tx, args.b, `u128`), pure(tx, args.c, `u128`)],
  })
}

export interface MuldivRoundUpU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

export function muldivRoundUpU128(tx: Transaction, args: MuldivRoundUpU128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::muldiv_round_up_u128`,
    arguments: [pure(tx, args.a, `u128`), pure(tx, args.b, `u128`), pure(tx, args.c, `u128`)],
  })
}

export interface SaturatingMuldivRoundUpU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

export function saturatingMuldivRoundUpU128(
  tx: Transaction,
  args: SaturatingMuldivRoundUpU128Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::saturating_muldiv_round_up_u128`,
    arguments: [pure(tx, args.a, `u128`), pure(tx, args.b, `u128`), pure(tx, args.c, `u128`)],
  })
}

export interface DivideAndRoundUpU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

export function divideAndRoundUpU128(tx: Transaction, args: DivideAndRoundUpU128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::divide_and_round_up_u128`,
    arguments: [pure(tx, args.a, `u128`), pure(tx, args.b, `u128`)],
  })
}

export interface DivideAndRoundUpU256Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

export function divideAndRoundUpU256(tx: Transaction, args: DivideAndRoundUpU256Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::divide_and_round_up_u256`,
    arguments: [pure(tx, args.a, `u256`), pure(tx, args.b, `u256`)],
  })
}

export interface AbsDiffArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

export function absDiff(tx: Transaction, args: AbsDiffArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::abs_diff`,
    arguments: [pure(tx, args.a, `u64`), pure(tx, args.b, `u64`)],
  })
}

export interface MinU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

export function minU128(tx: Transaction, args: MinU128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::min_u128`,
    arguments: [pure(tx, args.a, `u128`), pure(tx, args.b, `u128`)],
  })
}

export interface MaxU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

export function maxU128(tx: Transaction, args: MaxU128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::max_u128`,
    arguments: [pure(tx, args.a, `u128`), pure(tx, args.b, `u128`)],
  })
}

export interface MinU256Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

export function minU256(tx: Transaction, args: MinU256Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::min_u256`,
    arguments: [pure(tx, args.a, `u256`), pure(tx, args.b, `u256`)],
  })
}

export interface MaxU256Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

export function maxU256(tx: Transaction, args: MaxU256Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::max_u256`,
    arguments: [pure(tx, args.a, `u256`), pure(tx, args.b, `u256`)],
  })
}

export function log2U256(tx: Transaction, x: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::log2_u256`,
    arguments: [pure(tx, x, `u256`)],
  })
}

export function sqrtU256(tx: Transaction, x: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::sqrt_u256`,
    arguments: [pure(tx, x, `u256`)],
  })
}

export function timestampSec(tx: Transaction, clock: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::timestamp_sec`,
    arguments: [obj(tx, clock)],
  })
}
