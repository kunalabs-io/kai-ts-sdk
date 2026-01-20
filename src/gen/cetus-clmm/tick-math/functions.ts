import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function maxSqrtPrice(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::max_sqrt_price`,
    arguments: [],
  })
}

export function minSqrtPrice(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::min_sqrt_price`,
    arguments: [],
  })
}

export function maxTick(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::max_tick`,
    arguments: [],
  })
}

export function minTick(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::min_tick`,
    arguments: [],
  })
}

export function tickBound(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::tick_bound`,
    arguments: [],
  })
}

export function getSqrtPriceAtTick(
  tx: Transaction,
  tick: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::get_sqrt_price_at_tick`,
    arguments: [obj(tx, tick)],
  })
}

export interface IsValidIndexArgs {
  index: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function isValidIndex(tx: Transaction, args: IsValidIndexArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::is_valid_index`,
    arguments: [
      obj(tx, args.index),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export function getTickAtSqrtPrice(
  tx: Transaction,
  sqrtPrice: bigint | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::get_tick_at_sqrt_price`,
    arguments: [pure(tx, sqrtPrice, `u128`)],
  })
}

export function asU8(tx: Transaction, b: boolean | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::as_u8`,
    arguments: [pure(tx, b, `bool`)],
  })
}

export function getSqrtPriceAtNegativeTick(
  tx: Transaction,
  tick: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::get_sqrt_price_at_negative_tick`,
    arguments: [obj(tx, tick)],
  })
}

export function getSqrtPriceAtPositiveTick(
  tx: Transaction,
  tick: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::tick_math::get_sqrt_price_at_positive_tick`,
    arguments: [obj(tx, tick)],
  })
}
