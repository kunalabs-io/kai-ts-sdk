import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

/**
 * Returns the bitwise not of the value.
 * Each bit that is 1 becomes 0. Each bit that is 0 becomes 1.
 */
export function bitwiseNot(
  tx: Transaction,
  x: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::bitwise_not`,
    arguments: [pure(tx, x, `u256`)],
  })
}

export interface MaxArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/** Return the larger of `x` and `y` */
export function max(
  tx: Transaction,
  args: MaxArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::max`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface MinArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/** Return the smaller of `x` and `y` */
export function min(
  tx: Transaction,
  args: MinArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::min`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface DiffArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/** Return the absolute value of x - y */
export function diff(
  tx: Transaction,
  args: DiffArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::diff`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface DivCeilArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/** Calculate x / y, but round up the result. */
export function divCeil(
  tx: Transaction,
  args: DivCeilArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::div_ceil`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface PowArgs {
  base: bigint | TransactionArgument
  exponent: number | TransactionArgument
}

/** Return the value of a base raised to a power */
export function pow(
  tx: Transaction,
  args: PowArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::pow`,
    arguments: [
      pure(tx, args.base, `u256`),
      pure(tx, args.exponent, `u8`),
    ],
  })
}

/** Try to convert a `u256` to a `u8`. Returns `None` if the value is too large. */
export function tryAsU8(
  tx: Transaction,
  x: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::try_as_u8`,
    arguments: [pure(tx, x, `u256`)],
  })
}

/** Try to convert a `u256` to a `u16`. Returns `None` if the value is too large. */
export function tryAsU16(
  tx: Transaction,
  x: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::try_as_u16`,
    arguments: [pure(tx, x, `u256`)],
  })
}

/** Try to convert a `u256` to a `u32`. Returns `None` if the value is too large. */
export function tryAsU32(
  tx: Transaction,
  x: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::try_as_u32`,
    arguments: [pure(tx, x, `u256`)],
  })
}

/** Try to convert a `u256` to a `u64`. Returns `None` if the value is too large. */
export function tryAsU64(
  tx: Transaction,
  x: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::try_as_u64`,
    arguments: [pure(tx, x, `u256`)],
  })
}

/** Try to convert a `u256` to a `u128`. Returns `None` if the value is too large. */
export function tryAsU128(
  tx: Transaction,
  x: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::try_as_u128`,
    arguments: [pure(tx, x, `u256`)],
  })
}

export function toString(
  tx: Transaction,
  x: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::to_string`,
    arguments: [pure(tx, x, `u256`)],
  })
}

export interface CheckedAddArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/**
 * Try to add `x` and `y`.
 * Returns `None` if the addition would overflow.
 */
export function checkedAdd(
  tx: Transaction,
  args: CheckedAddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::checked_add`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface CheckedSubArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/**
 * Try to subtract `y` from `x`.
 * Returns `None` if `y > x`.
 */
export function checkedSub(
  tx: Transaction,
  args: CheckedSubArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::checked_sub`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface CheckedMulArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/**
 * Try to multiply `x` and `y`.
 * Returns `None` if the multiplication would overflow.
 */
export function checkedMul(
  tx: Transaction,
  args: CheckedMulArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::checked_mul`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface CheckedDivArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/**
 * Try to divide `x` by `y`.
 * Returns `None` if `y` is zero.
 */
export function checkedDiv(
  tx: Transaction,
  args: CheckedDivArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::checked_div`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface SaturatingAddArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/** Add `x` and `y`, saturating at the maximum value instead of overflowing. */
export function saturatingAdd(
  tx: Transaction,
  args: SaturatingAddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::saturating_add`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface SaturatingSubArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/** Subtract `y` from `x`, saturating at `0` instead of underflowing. */
export function saturatingSub(
  tx: Transaction,
  args: SaturatingSubArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::saturating_sub`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface SaturatingMulArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/** Multiply `x` and `y`, saturating at the maximum value instead of overflowing. */
export function saturatingMul(
  tx: Transaction,
  args: SaturatingMulArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::saturating_mul`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface LosslessShlArgs {
  x: bigint | TransactionArgument
  shift: number | TransactionArgument
}

/**
 * Shifts `x` left by `shift` bits.
 * Returns `None` if the shift would lose any bits (if the operation is not reversible).
 */
export function losslessShl(
  tx: Transaction,
  args: LosslessShlArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::lossless_shl`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface LosslessShrArgs {
  x: bigint | TransactionArgument
  shift: number | TransactionArgument
}

/**
 * Shifts `x` right by `shift` bits.
 * Returns `None` if the shift would lose any bits (if the operation is not reversible).
 */
export function losslessShr(
  tx: Transaction,
  args: LosslessShrArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::lossless_shr`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface LosslessDivArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/**
 * Divides `x` by `y`.
 * Returns `None` if `y` is zero or if there is a non-zero remainder (if `x % y != 0`). In other
 * words, it returns `None` if the operation is not reversible.
 */
export function losslessDiv(
  tx: Transaction,
  args: LosslessDivArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::lossless_div`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}

export interface DivideAndRoundUpArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

/** @deprecated Renamed to `div_ceil` for consistency */
export function divideAndRoundUp(
  tx: Transaction,
  args: DivideAndRoundUpArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u256::divide_and_round_up`,
    arguments: [
      pure(tx, args.x, `u256`),
      pure(tx, args.y, `u256`),
    ],
  })
}
