import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { Transaction, TransactionArgument } from '@mysten/sui/transactions'

export interface FullMulArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function fullMul(tx: Transaction, args: FullMulArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::full_mul`,
    arguments: [pure(tx, args.n1, `u128`), pure(tx, args.n2, `u128`)],
  })
}

export interface MaxArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
}

export function max(tx: Transaction, args: MaxArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::max`,
    arguments: [pure(tx, args.num1, `u128`), pure(tx, args.num2, `u128`)],
  })
}

export interface MinArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
}

export function min(tx: Transaction, args: MinArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::min`,
    arguments: [pure(tx, args.num1, `u128`), pure(tx, args.num2, `u128`)],
  })
}

export interface OverflowingAddArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function overflowingAdd(tx: Transaction, args: OverflowingAddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::overflowing_add`,
    arguments: [pure(tx, args.n1, `u128`), pure(tx, args.n2, `u128`)],
  })
}

export interface OverflowingSubArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function overflowingSub(tx: Transaction, args: OverflowingSubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::overflowing_sub`,
    arguments: [pure(tx, args.n1, `u128`), pure(tx, args.n2, `u128`)],
  })
}

export interface WrappingAddArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function wrappingAdd(tx: Transaction, args: WrappingAddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::wrapping_add`,
    arguments: [pure(tx, args.n1, `u128`), pure(tx, args.n2, `u128`)],
  })
}

export interface WrappingSubArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function wrappingSub(tx: Transaction, args: WrappingSubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::wrapping_sub`,
    arguments: [pure(tx, args.n1, `u128`), pure(tx, args.n2, `u128`)],
  })
}

export interface AddCheckArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
}

export function addCheck(tx: Transaction, args: AddCheckArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::add_check`,
    arguments: [pure(tx, args.num1, `u128`), pure(tx, args.num2, `u128`)],
  })
}

export interface OverflowingMulArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function overflowingMul(tx: Transaction, args: OverflowingMulArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::overflowing_mul`,
    arguments: [pure(tx, args.n1, `u128`), pure(tx, args.n2, `u128`)],
  })
}

export interface WrappingMulArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function wrappingMul(tx: Transaction, args: WrappingMulArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::wrapping_mul`,
    arguments: [pure(tx, args.n1, `u128`), pure(tx, args.n2, `u128`)],
  })
}

export interface CheckedDivRoundArgs {
  num: bigint | TransactionArgument
  denom: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

export function checkedDivRound(tx: Transaction, args: CheckedDivRoundArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::checked_div_round`,
    arguments: [
      pure(tx, args.num, `u128`),
      pure(tx, args.denom, `u128`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface FromLoHiArgs {
  lo: bigint | TransactionArgument
  hi: bigint | TransactionArgument
}

export function fromLoHi(tx: Transaction, args: FromLoHiArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::from_lo_hi`,
    arguments: [pure(tx, args.lo, `u64`), pure(tx, args.hi, `u64`)],
  })
}

export function lo(tx: Transaction, n: bigint | TransactionArgument) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::math_u128::lo`, arguments: [pure(tx, n, `u128`)] })
}

export function hi(tx: Transaction, n: bigint | TransactionArgument) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::math_u128::hi`, arguments: [pure(tx, n, `u128`)] })
}

export function hiU128(tx: Transaction, n: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::hi_u128`,
    arguments: [pure(tx, n, `u128`)],
  })
}

export function loU128(tx: Transaction, n: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u128::lo_u128`,
    arguments: [pure(tx, n, `u128`)],
  })
}
