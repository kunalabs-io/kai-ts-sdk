import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function castToU8(
  tx: Transaction,
  index: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::tick_bitmap::cast_to_u8`,
    arguments: [obj(tx, index)],
  })
}

export interface FlipTickArgs {
  bitmap: TransactionObjectInput
  index: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function flipTick(
  tx: Transaction,
  args: FlipTickArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::tick_bitmap::flip_tick`,
    arguments: [
      obj(tx, args.bitmap),
      obj(tx, args.index),
      pure(tx, args.tickSpacing, `u32`),
    ],
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
  args: NextInitializedTickWithinOneWordArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::tick_bitmap::next_initialized_tick_within_one_word`,
    arguments: [
      obj(tx, args.bitmap),
      obj(tx, args.tick),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.a2B, `bool`),
    ],
  })
}

export function position(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::tick_bitmap::position`,
    arguments: [obj(tx, tick)],
  })
}

export interface GetMutableTickWordArgs {
  bitmap: TransactionObjectInput
  tick: TransactionObjectInput
}

export function getMutableTickWord(
  tx: Transaction,
  args: GetMutableTickWordArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::tick_bitmap::get_mutable_tick_word`,
    arguments: [
      obj(tx, args.bitmap),
      obj(tx, args.tick),
    ],
  })
}

export interface GetImmutableTickWordArgs {
  bitmap: TransactionObjectInput
  tick: TransactionObjectInput
}

export function getImmutableTickWord(
  tx: Transaction,
  args: GetImmutableTickWordArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::tick_bitmap::get_immutable_tick_word`,
    arguments: [
      obj(tx, args.bitmap),
      obj(tx, args.tick),
    ],
  })
}
