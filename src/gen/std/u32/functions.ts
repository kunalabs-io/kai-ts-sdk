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
  x: number | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::bitwise_not`,
    arguments: [pure(tx, x, `u32`)],
  })
}

export interface MaxArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
}

/** Return the larger of `x` and `y` */
export function max(
  tx: Transaction,
  args: MaxArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::max`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface MinArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
}

/** Return the smaller of `x` and `y` */
export function min(
  tx: Transaction,
  args: MinArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::min`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface DiffArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
}

/** Return the absolute value of x - y */
export function diff(
  tx: Transaction,
  args: DiffArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::diff`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface MulDivArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
  z: number | TransactionArgument
}

/**
 * Calculate `x * y / z`, upcasting intermediate values to avoid overflow when possible.
 * Aborts if `z` is `0`.
 * Aborts if the result is larger than `MAX`.
 */
export function mulDiv(
  tx: Transaction,
  args: MulDivArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::mul_div`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
      pure(tx, args.z, `u32`),
    ],
  })
}

export interface MulDivCeilArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
  z: number | TransactionArgument
}

/**
 * Calculate `x * y / z`, upcasting intermediate values to avoid overflow when possible.
 * Rounds up the result if there is a remainder.
 * Aborts if `z` is `0`.
 * Aborts if the result is larger than `MAX`.
 */
export function mulDivCeil(
  tx: Transaction,
  args: MulDivCeilArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::mul_div_ceil`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
      pure(tx, args.z, `u32`),
    ],
  })
}

export interface DivCeilArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
}

/** Calculate x / y, but round up the result. */
export function divCeil(
  tx: Transaction,
  args: DivCeilArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::div_ceil`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface PowArgs {
  base: number | TransactionArgument
  exponent: number | TransactionArgument
}

/** Return the value of a base raised to a power */
export function pow(
  tx: Transaction,
  args: PowArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::pow`,
    arguments: [
      pure(tx, args.base, `u32`),
      pure(tx, args.exponent, `u8`),
    ],
  })
}

/**
 * Get a nearest lower integer Square Root for `x`. Given that this
 * function can only operate with integers, it is impossible
 * to get perfect (or precise) integer square root for some numbers.
 *
 * Example:
 * ```
 * math::sqrt(9) => 3
 * math::sqrt(8) => 2 // the nearest lower square root is 4;
 * ```
 *
 * In integer math, one of the possible ways to get results with more
 * precision is to use higher values or temporarily multiply the
 * value by some bigger number. Ideally if this is a square of 10 or 100.
 *
 * Example:
 * ```
 * math::sqrt(8) => 2;
 * math::sqrt(8 * 10000) => 282;
 * // now we can use this value as if it was 2.82;
 * // but to get the actual result, this value needs
 * // to be divided by 100 (because sqrt(10000)).
 *
 * math::sqrt(8 * 1000000) => 2828; // same as above, 2828 / 1000 (2.828)
 * ```
 */
export function sqrt(
  tx: Transaction,
  x: number | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::sqrt`,
    arguments: [pure(tx, x, `u32`)],
  })
}

/** Try to convert a `u32` to a `u8`. Returns `None` if the value is too large. */
export function tryAsU8(
  tx: Transaction,
  x: number | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::try_as_u8`,
    arguments: [pure(tx, x, `u32`)],
  })
}

/** Try to convert a `u32` to a `u16`. Returns `None` if the value is too large. */
export function tryAsU16(
  tx: Transaction,
  x: number | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::try_as_u16`,
    arguments: [pure(tx, x, `u32`)],
  })
}

export function toString(
  tx: Transaction,
  x: number | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::to_string`,
    arguments: [pure(tx, x, `u32`)],
  })
}

export interface CheckedAddArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
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
    target: `${getPublishedAt('std', options?.env)}::u32::checked_add`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface CheckedSubArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
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
    target: `${getPublishedAt('std', options?.env)}::u32::checked_sub`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface CheckedMulArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
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
    target: `${getPublishedAt('std', options?.env)}::u32::checked_mul`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface CheckedDivArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
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
    target: `${getPublishedAt('std', options?.env)}::u32::checked_div`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface SaturatingAddArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
}

/** Add `x` and `y`, saturating at the maximum value instead of overflowing. */
export function saturatingAdd(
  tx: Transaction,
  args: SaturatingAddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::saturating_add`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface SaturatingSubArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
}

/** Subtract `y` from `x`, saturating at `0` instead of underflowing. */
export function saturatingSub(
  tx: Transaction,
  args: SaturatingSubArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::saturating_sub`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface SaturatingMulArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
}

/** Multiply `x` and `y`, saturating at the maximum value instead of overflowing. */
export function saturatingMul(
  tx: Transaction,
  args: SaturatingMulArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::saturating_mul`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface CheckedShlArgs {
  x: number | TransactionArgument
  shift: number | TransactionArgument
}

/**
 * Shifts `x` left by `shift` bits.
 * Returns `None` if the shift is greater than or equal to the bit size of 32.
 */
export function checkedShl(
  tx: Transaction,
  args: CheckedShlArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::checked_shl`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface CheckedShrArgs {
  x: number | TransactionArgument
  shift: number | TransactionArgument
}

/**
 * Shifts `x` right by `shift` bits.
 * Returns `None` if the shift is greater than or equal to the bit size of 32.
 */
export function checkedShr(
  tx: Transaction,
  args: CheckedShrArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::checked_shr`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface LosslessShlArgs {
  x: number | TransactionArgument
  shift: number | TransactionArgument
}

/**
 * Shifts `x` left by `shift` bits.
 * Returns `None` if the shift is larger than or equal to the bit size of 32, or if the shift would
 * lose any bits (if the operation is not reversible).
 */
export function losslessShl(
  tx: Transaction,
  args: LosslessShlArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::lossless_shl`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface LosslessShrArgs {
  x: number | TransactionArgument
  shift: number | TransactionArgument
}

/**
 * Shifts `x` right by `shift` bits.
 * Returns `None` if the shift is larger than or equal to the bit size of 32, or if the shift would
 * lose any bits (if the operation is not reversible).
 */
export function losslessShr(
  tx: Transaction,
  args: LosslessShrArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::lossless_shr`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface LosslessDivArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
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
    target: `${getPublishedAt('std', options?.env)}::u32::lossless_div`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}

export interface DivideAndRoundUpArgs {
  x: number | TransactionArgument
  y: number | TransactionArgument
}

/** @deprecated Renamed to `div_ceil` for consistency */
export function divideAndRoundUp(
  tx: Transaction,
  args: DivideAndRoundUpArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('std', options?.env)}::u32::divide_and_round_up`,
    arguments: [
      pure(tx, args.x, `u32`),
      pure(tx, args.y, `u32`),
    ],
  })
}
