import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function asU8(tx: Transaction, b: boolean | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_math::as_u8`,
    arguments: [pure(tx, b, `bool`)],
  })
}

export function getSqrtPriceAtNegativeTick(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_math::get_sqrt_price_at_negative_tick`,
    arguments: [obj(tx, tick)],
  })
}

export function getSqrtPriceAtPositiveTick(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_math::get_sqrt_price_at_positive_tick`,
    arguments: [obj(tx, tick)],
  })
}

export function getSqrtPriceAtTick(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_math::get_sqrt_price_at_tick`,
    arguments: [obj(tx, tick)],
  })
}

export function getTickAtSqrtPrice(tx: Transaction, sqrtPrice: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_math::get_tick_at_sqrt_price`,
    arguments: [pure(tx, sqrtPrice, `u128`)],
  })
}

export interface IsValidIndexArgs {
  index: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function isValidIndex(tx: Transaction, args: IsValidIndexArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_math::is_valid_index`,
    arguments: [obj(tx, args.index), pure(tx, args.tickSpacing, `u32`)],
  })
}

export function maxSqrtPrice(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick_math::max_sqrt_price`, arguments: [] })
}

export function maxTick(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick_math::max_tick`, arguments: [] })
}

export function minSqrtPrice(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick_math::min_sqrt_price`, arguments: [] })
}

export function minTick(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick_math::min_tick`, arguments: [] })
}

export function tickBound(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick_math::tick_bound`, arguments: [] })
}
