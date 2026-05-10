import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

export interface MulDivFloorArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
  denom: bigint | TransactionArgument
}

export function mulDivFloor(
  tx: Transaction,
  args: MulDivFloorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate', options?.env)}::full_math_u64::mul_div_floor`,
    arguments: [
      pure(tx, args.num1, `u64`),
      pure(tx, args.num2, `u64`),
      pure(tx, args.denom, `u64`),
    ],
  })
}

export interface MulDivRoundArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
  denom: bigint | TransactionArgument
}

export function mulDivRound(
  tx: Transaction,
  args: MulDivRoundArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate', options?.env)}::full_math_u64::mul_div_round`,
    arguments: [
      pure(tx, args.num1, `u64`),
      pure(tx, args.num2, `u64`),
      pure(tx, args.denom, `u64`),
    ],
  })
}

export interface MulDivCeilArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
  denom: bigint | TransactionArgument
}

export function mulDivCeil(
  tx: Transaction,
  args: MulDivCeilArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate', options?.env)}::full_math_u64::mul_div_ceil`,
    arguments: [
      pure(tx, args.num1, `u64`),
      pure(tx, args.num2, `u64`),
      pure(tx, args.denom, `u64`),
    ],
  })
}

export interface MulShrArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
  shift: number | TransactionArgument
}

export function mulShr(
  tx: Transaction,
  args: MulShrArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate', options?.env)}::full_math_u64::mul_shr`,
    arguments: [
      pure(tx, args.num1, `u64`),
      pure(tx, args.num2, `u64`),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface MulShlArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
  shift: number | TransactionArgument
}

/** @deprecated This function converts num1 and num2 to u128, multiplies them, then left-shifts the result by the specified number of bits, and finally coerces the result into u64. The left shift does not perform overflow checks, so it is recommended not to use this function to avoid unexpected results. */
export function mulShl(
  tx: Transaction,
  args: MulShlArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate', options?.env)}::full_math_u64::mul_shl`,
    arguments: [
      pure(tx, args.num1, `u64`),
      pure(tx, args.num2, `u64`),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface FullMulArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
}

export function fullMul(
  tx: Transaction,
  args: FullMulArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate', options?.env)}::full_math_u64::full_mul`,
    arguments: [
      pure(tx, args.num1, `u64`),
      pure(tx, args.num2, `u64`),
    ],
  })
}
