import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { Transaction, TransactionArgument } from '@mysten/sui/transactions'

export interface MulDivFloorArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
  denom: bigint | TransactionArgument
}

export function mulDivFloor(tx: Transaction, args: MulDivFloorArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::full_math_u64::mul_div_floor`,
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

export function mulDivRound(tx: Transaction, args: MulDivRoundArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::full_math_u64::mul_div_round`,
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

export function mulDivCeil(tx: Transaction, args: MulDivCeilArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::full_math_u64::mul_div_ceil`,
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

export function mulShr(tx: Transaction, args: MulShrArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::full_math_u64::mul_shr`,
    arguments: [pure(tx, args.num1, `u64`), pure(tx, args.num2, `u64`), pure(tx, args.shift, `u8`)],
  })
}

export interface MulShlArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
  shift: number | TransactionArgument
}

export function mulShl(tx: Transaction, args: MulShlArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::full_math_u64::mul_shl`,
    arguments: [pure(tx, args.num1, `u64`), pure(tx, args.num2, `u64`), pure(tx, args.shift, `u8`)],
  })
}

export interface FullMulArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
}

export function fullMul(tx: Transaction, args: FullMulArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::full_math_u64::full_mul`,
    arguments: [pure(tx, args.num1, `u64`), pure(tx, args.num2, `u64`)],
  })
}
