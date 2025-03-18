import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { Transaction, TransactionArgument } from '@mysten/sui/transactions'

export interface AddCheckArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function addCheck(tx: Transaction, args: AddCheckArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u64::add_check`,
    arguments: [pure(tx, args.n1, `u64`), pure(tx, args.n2, `u64`)],
  })
}

export interface CarryAddArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
  carry: bigint | TransactionArgument
}

export function carryAdd(tx: Transaction, args: CarryAddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u64::carry_add`,
    arguments: [pure(tx, args.n1, `u64`), pure(tx, args.n2, `u64`), pure(tx, args.carry, `u64`)],
  })
}

export interface OverflowingAddArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function overflowingAdd(tx: Transaction, args: OverflowingAddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u64::overflowing_add`,
    arguments: [pure(tx, args.n1, `u64`), pure(tx, args.n2, `u64`)],
  })
}

export interface OverflowingMulArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function overflowingMul(tx: Transaction, args: OverflowingMulArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u64::overflowing_mul`,
    arguments: [pure(tx, args.n1, `u64`), pure(tx, args.n2, `u64`)],
  })
}

export interface OverflowingSubArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function overflowingSub(tx: Transaction, args: OverflowingSubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u64::overflowing_sub`,
    arguments: [pure(tx, args.n1, `u64`), pure(tx, args.n2, `u64`)],
  })
}

export interface WrappingAddArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function wrappingAdd(tx: Transaction, args: WrappingAddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u64::wrapping_add`,
    arguments: [pure(tx, args.n1, `u64`), pure(tx, args.n2, `u64`)],
  })
}

export interface WrappingMulArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function wrappingMul(tx: Transaction, args: WrappingMulArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u64::wrapping_mul`,
    arguments: [pure(tx, args.n1, `u64`), pure(tx, args.n2, `u64`)],
  })
}

export interface WrappingSubArgs {
  n1: bigint | TransactionArgument
  n2: bigint | TransactionArgument
}

export function wrappingSub(tx: Transaction, args: WrappingSubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u64::wrapping_sub`,
    arguments: [pure(tx, args.n1, `u64`), pure(tx, args.n2, `u64`)],
  })
}
