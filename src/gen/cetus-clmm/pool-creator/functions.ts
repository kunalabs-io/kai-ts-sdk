import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { String } from '../../std/string/structs'

export interface CreatePoolV2ByCreationCapArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  cap: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  metadataA: TransactionObjectInput
  metadataB: TransactionObjectInput
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/** DEPRECATED */
export function createPoolV2ByCreationCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV2ByCreationCapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::pool_creator::create_pool_v2_by_creation_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      obj(tx, args.cap),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.metadataA),
      obj(tx, args.metadataB),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV2WithCreationCapArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  cap: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  tickLowerIdx: number | TransactionArgument
  tickUpperIdx: number | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  metadataA: TransactionObjectInput
  metadataB: TransactionObjectInput
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolV2WithCreationCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV2WithCreationCapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::pool_creator::create_pool_v2_with_creation_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      obj(tx, args.cap),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.tickLowerIdx, `u32`),
      pure(tx, args.tickUpperIdx, `u32`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.metadataA),
      obj(tx, args.metadataB),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV2Args {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  tickLowerIdx: number | TransactionArgument
  tickUpperIdx: number | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  metadataA: TransactionObjectInput
  metadataB: TransactionObjectInput
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolV2(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV2Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::pool_creator::create_pool_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.tickLowerIdx, `u32`),
      pure(tx, args.tickUpperIdx, `u32`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.metadataA),
      obj(tx, args.metadataB),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV3WithCreationCapArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  cap: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  tickLowerIdx: number | TransactionArgument
  tickUpperIdx: number | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Create pool with creation cap
 * * `config` - The global configuration
 * * `pools` - The mutable reference to the `Pools` object
 * * `cap` - The reference to the `PoolCreationCap` object
 * * `tick_spacing` - The tick spacing
 * * `initialize_price` - The initial price
 * * `url` - The URL of the pool
 * * `tick_lower_idx` - The lower tick index
 * * `tick_upper_idx` - The upper tick index
 * * `coin_a` - The coin A
 * * `coin_b` - The coin B
 * * `metadata_a` - The metadata of the coin A
 * * `metadata_b` - The metadata of the coin B
 * * `fix_amount_a` - Whether to fix the amount of the coin A
 * * `clock` - The clock object
 * * `ctx` - The transaction context
 * * Returns the position, coin A, and coin B
 */
export function createPoolV3WithCreationCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV3WithCreationCapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::pool_creator::create_pool_v3_with_creation_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      obj(tx, args.cap),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.tickLowerIdx, `u32`),
      pure(tx, args.tickUpperIdx, `u32`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV3Args {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  tickLowerIdx: number | TransactionArgument
  tickUpperIdx: number | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Create pool with custom tick range
 * * `config` - The global configuration
 * * `pools` - The mutable reference to the `Pools` object
 * * `tick_spacing` - The tick spacing
 * * `initialize_price` - The initial price
 * * `url` - The URL of the pool
 * * `tick_lower_idx` - The lower tick index
 * * `tick_upper_idx` - The upper tick index
 * * `coin_a` - The coin A
 * * `coin_b` - The coin B
 * * `metadata_a` - The metadata of the coin A
 * * `metadata_b` - The metadata of the coin B
 * * `fix_amount_a` - Whether to fix the amount of the coin A
 * * `clock` - The clock object
 * * `ctx` - The transaction context
 * * Returns the position, coin A, and coin B
 */
export function createPoolV3(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV3Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::pool_creator::create_pool_v3`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.tickLowerIdx, `u32`),
      pure(tx, args.tickUpperIdx, `u32`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

/**
 * Get the full range tick range
 * * `tick_spacing` - The tick spacing
 * * Returns the full range tick range
 */
export function fullRangeTickRange(
  tx: Transaction,
  tickSpacing: number | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::pool_creator::full_range_tick_range`,
    arguments: [pure(tx, tickSpacing, `u32`)],
  })
}
