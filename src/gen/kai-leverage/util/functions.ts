import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface MuldivArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

/** Multiply and divide u64 values. */
export function muldiv(tx: Transaction, args: MuldivArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::muldiv`,
    arguments: [
      pure(tx, args.a, `u64`),
      pure(tx, args.b, `u64`),
      pure(tx, args.c, `u64`),
    ],
  })
}

export interface MuldivRoundUpArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

/** Multiply and divide with rounding up. */
export function muldivRoundUp(tx: Transaction, args: MuldivRoundUpArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::muldiv_round_up`,
    arguments: [
      pure(tx, args.a, `u64`),
      pure(tx, args.b, `u64`),
      pure(tx, args.c, `u64`),
    ],
  })
}

export interface MuldivU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

/** Multiply and divide u128 values. */
export function muldivU128(tx: Transaction, args: MuldivU128Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::muldiv_u128`,
    arguments: [
      pure(tx, args.a, `u128`),
      pure(tx, args.b, `u128`),
      pure(tx, args.c, `u128`),
    ],
  })
}

export interface MuldivRoundUpU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

/** Multiply and divide u128 values with rounding up. */
export function muldivRoundUpU128(tx: Transaction, args: MuldivRoundUpU128Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::muldiv_round_up_u128`,
    arguments: [
      pure(tx, args.a, `u128`),
      pure(tx, args.b, `u128`),
      pure(tx, args.c, `u128`),
    ],
  })
}

export interface SaturatingMuldivRoundUpU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
  c: bigint | TransactionArgument
}

/** Saturating multiply and divide with rounding up. */
export function saturatingMuldivRoundUpU128(
  tx: Transaction,
  args: SaturatingMuldivRoundUpU128Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::saturating_muldiv_round_up_u128`,
    arguments: [
      pure(tx, args.a, `u128`),
      pure(tx, args.b, `u128`),
      pure(tx, args.c, `u128`),
    ],
  })
}

export interface DivideAndRoundUpU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

/** Divide with rounding up for 128-bit values. */
export function divideAndRoundUpU128(
  tx: Transaction,
  args: DivideAndRoundUpU128Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::divide_and_round_up_u128`,
    arguments: [
      pure(tx, args.a, `u128`),
      pure(tx, args.b, `u128`),
    ],
  })
}

export interface DivideAndRoundUpU256Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

/** Divide with rounding up for u256 values. */
export function divideAndRoundUpU256(
  tx: Transaction,
  args: DivideAndRoundUpU256Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::divide_and_round_up_u256`,
    arguments: [
      pure(tx, args.a, `u256`),
      pure(tx, args.b, `u256`),
    ],
  })
}

export interface AbsDiffArgs {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

/** Calculate absolute difference between two numbers. */
export function absDiff(tx: Transaction, args: AbsDiffArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::abs_diff`,
    arguments: [
      pure(tx, args.a, `u64`),
      pure(tx, args.b, `u64`),
    ],
  })
}

export interface MinU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

/** Get minimum of two 128-bit values. */
export function minU128(tx: Transaction, args: MinU128Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::min_u128`,
    arguments: [
      pure(tx, args.a, `u128`),
      pure(tx, args.b, `u128`),
    ],
  })
}

export interface MaxU128Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

/** Get maximum of two 128-bit values. */
export function maxU128(tx: Transaction, args: MaxU128Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::max_u128`,
    arguments: [
      pure(tx, args.a, `u128`),
      pure(tx, args.b, `u128`),
    ],
  })
}

export interface MinU256Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

/** Get minimum of two 256-bit values. */
export function minU256(tx: Transaction, args: MinU256Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::min_u256`,
    arguments: [
      pure(tx, args.a, `u256`),
      pure(tx, args.b, `u256`),
    ],
  })
}

export interface MaxU256Args {
  a: bigint | TransactionArgument
  b: bigint | TransactionArgument
}

/** Get maximum of two 256-bit values. */
export function maxU256(tx: Transaction, args: MaxU256Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::max_u256`,
    arguments: [
      pure(tx, args.a, `u256`),
      pure(tx, args.b, `u256`),
    ],
  })
}

/** Calculate base-2 logarithm of a 256-bit value. */
export function log2U256(tx: Transaction, x: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::log2_u256`,
    arguments: [pure(tx, x, `u256`)],
  })
}

/** Calculate square root of a 256-bit value. */
export function sqrtU256(tx: Transaction, x: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::sqrt_u256`,
    arguments: [pure(tx, x, `u256`)],
  })
}

/** Get current clock timestamp in seconds. */
export function timestampSec(tx: Transaction, clock: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::util::timestamp_sec`,
    arguments: [obj(tx, clock)],
  })
}
