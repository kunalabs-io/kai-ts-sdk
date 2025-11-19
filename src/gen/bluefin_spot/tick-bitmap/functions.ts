import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function castToU8(tx: Transaction, index: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_bitmap::cast_to_u8`,
    arguments: [obj(tx, index)],
  })
}

export interface FlipTickArgs {
  bitmap: TransactionObjectInput
  index: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function flipTick(tx: Transaction, args: FlipTickArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_bitmap::flip_tick`,
    arguments: [obj(tx, args.bitmap), obj(tx, args.index), pure(tx, args.tickSpacing, `u32`)],
  })
}

export interface NextInitializedTickWithinOneWordArgs {
  bitmap: TransactionObjectInput
  tick: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  a2B: boolean | TransactionArgument
}

export function nextInitializedTickWithinOneWord(
  tx: Transaction,
  args: NextInitializedTickWithinOneWordArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_bitmap::next_initialized_tick_within_one_word`,
    arguments: [
      obj(tx, args.bitmap),
      obj(tx, args.tick),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.a2B, `bool`),
    ],
  })
}

export function position(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_bitmap::position`,
    arguments: [obj(tx, tick)],
  })
}

export interface GetMutableTickWordArgs {
  bitmap: TransactionObjectInput
  tick: TransactionObjectInput
}

export function getMutableTickWord(tx: Transaction, args: GetMutableTickWordArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_bitmap::get_mutable_tick_word`,
    arguments: [obj(tx, args.bitmap), obj(tx, args.tick)],
  })
}

export interface GetImmutableTickWordArgs {
  bitmap: TransactionObjectInput
  tick: TransactionObjectInput
}

export function getImmutableTickWord(tx: Transaction, args: GetImmutableTickWordArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick_bitmap::get_immutable_tick_word`,
    arguments: [obj(tx, args.bitmap), obj(tx, args.tick)],
  })
}
