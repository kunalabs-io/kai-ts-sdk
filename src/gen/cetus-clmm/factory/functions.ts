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
import { ID } from '../../sui/object/structs'

/**
 * Initialize the factory
 * * `ctx` - Transaction context used to initialize the factory
 */
export function init(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::init`,
    arguments: [],
  })
}

/**
 * Get the pool_id from the pool simple info
 * * `info` - The pool simple info
 */
export function poolId(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::pool_id`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the pool_key from the pool simple info
 * * `info` - The pool simple info
 */
export function poolKey(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::pool_key`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the coin types from the pool simple info
 * * `info` - The pool simple info
 */
export function coinTypes(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::coin_types`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the tick spacing from the pool simple info
 * * `info` - The pool simple info
 */
export function tickSpacing(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::tick_spacing`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the pool index from the pools
 * * `pools` - The pools
 */
export function index(
  tx: Transaction,
  pools: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::index`,
    arguments: [obj(tx, pools)],
  })
}

export interface PoolSimpleInfoArgs {
  pools: TransactionObjectInput
  poolKey: string | TransactionArgument
}

/**
 * Get the pool simple info from the pools
 * * `pools` - The pools
 * * `pool_key` - The pool key
 */
export function poolSimpleInfo(
  tx: Transaction,
  args: PoolSimpleInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::pool_simple_info`,
    arguments: [
      obj(tx, args.pools),
      pure(tx, args.poolKey, `${ID.$typeName}`),
    ],
  })
}

/**
 * Check if a coin is in the allowed list
 * * `pools` - The pools
 * * `Coin` - The coin type
 */
export function inAllowedList(
  tx: Transaction,
  typeArg: string,
  pools: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::in_allowed_list`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pools)],
  })
}

/**
 * Check if a coin is in the denied list
 * * `pools` - The pools
 * * `Coin` - The coin type
 */
export function inDeniedList(
  tx: Transaction,
  typeArg: string,
  pools: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::in_denied_list`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pools)],
  })
}

export interface IsAllowedCoinArgs {
  pools: TransactionObjectInput
  metadata: TransactionObjectInput
}

/**
 * Check if a coin is allowed
 * * `pools` - The pools
 * * `Coin` - The coin type
 * * `_metadata` - The coin metadata
 */
export function isAllowedCoin(
  tx: Transaction,
  typeArg: string,
  args: IsAllowedCoinArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::is_allowed_coin`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.pools),
      obj(tx, args.metadata),
    ],
  })
}

export interface IsPermissionPairArgs {
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

/**
 * Check if a permission pair exists
 * * `pools` - The pools
 * * `CoinTypeA` - The type name of the first coin
 * * `CoinTypeB` - The type name of the second coin
 * * `tick_spacing` - The tick spacing
 */
export function isPermissionPair(
  tx: Transaction,
  typeArgs: [string, string],
  args: IsPermissionPairArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::is_permission_pair`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export interface PermissionPairCapArgs {
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

/**
 * Get the permission pair cap from the pools
 * * `pools` - The pools
 * * `CoinTypeA` - The type name of the first coin
 * * `CoinTypeB` - The type name of the second coin
 * * `tick_spacing` - The tick spacing
 */
export function permissionPairCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: PermissionPairCapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::permission_pair_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export interface InitManagerAndWhitelistArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

/**
 * Initialize the permission pair manager and the whitelist
 * * `config` - The global config
 * * `pools` - The pools
 * * `ctx` - Transaction context used to initialize the permission pair manager and the whitelist
 */
export function initManagerAndWhitelist(
  tx: Transaction,
  args: InitManagerAndWhitelistArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::init_manager_and_whitelist`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
    ],
  })
}

export interface AddAllowedListArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

/**
 * Add a coin to the allowed list
 * * `config` - The global config
 * * `pools` - The pools
 * * `ctx` - Transaction context used to add the coin to the allowed list
 */
export function addAllowedList(
  tx: Transaction,
  typeArg: string,
  args: AddAllowedListArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::add_allowed_list`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
    ],
  })
}

export interface RemoveAllowedListArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

/**
 * Remove a coin from the allowed list
 * * `config` - The global config
 * * `pools` - The pools
 * * `ctx` - Transaction context used to remove the coin from the allowed list
 */
export function removeAllowedList(
  tx: Transaction,
  typeArg: string,
  args: RemoveAllowedListArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::remove_allowed_list`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
    ],
  })
}

export interface AddDeniedListArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

/**
 * Add a coin to the denied list
 * * `config` - The global config
 * * `pools` - The pools
 * * `ctx` - Transaction context used to add the coin to the denied list
 */
export function addDeniedList(
  tx: Transaction,
  typeArg: string,
  args: AddDeniedListArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::add_denied_list`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
    ],
  })
}

export interface RemoveDeniedListArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

/**
 * Remove a coin from the denied list
 * * `config` - The global config
 * * `pools` - The pools
 * * `ctx` - Transaction context used to remove the coin from the denied list
 */
export function removeDeniedList(
  tx: Transaction,
  typeArg: string,
  args: RemoveDeniedListArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::remove_denied_list`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
    ],
  })
}

export interface AddAllowedPairConfigArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

/**
 * Add a allowed pair config
 * * `config` - The global config
 * * `pools` - The pools
 * * `tick_spacing` - The tick spacing
 * * `ctx` - Transaction context used to add the allowed pair config
 */
export function addAllowedPairConfig(
  tx: Transaction,
  typeArg: string,
  args: AddAllowedPairConfigArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::add_allowed_pair_config`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export interface RemoveAllowedPairConfigArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

/**
 * Remove a allowed pair config
 * * `config` - The global config
 * * `pools` - The pools
 * * `tick_spacing` - The tick spacing
 * * `ctx` - Transaction context used to remove the allowed pair config
 */
export function removeAllowedPairConfig(
  tx: Transaction,
  typeArg: string,
  args: RemoveAllowedPairConfigArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::remove_allowed_pair_config`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export interface MintPoolCreationCapArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  treasuryCap: TransactionObjectInput
}

/**
 * Mint a pool creation cap
 * * `config` - The global config
 * * `pools` - The pools
 * * `_` - The treasury cap
 * * `ctx` - Transaction context used to mint the pool creation cap
 */
export function mintPoolCreationCap(
  tx: Transaction,
  typeArg: string,
  args: MintPoolCreationCapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::mint_pool_creation_cap`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      obj(tx, args.treasuryCap),
    ],
  })
}

export interface MintPoolCreationCapByAdminArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

/**
 * Mint a pool creation cap by admin
 * * `config` - The global config
 * * `pools` - The pools
 * * `ctx` - Transaction context used to mint the pool creation cap by admin
 */
export function mintPoolCreationCapByAdmin(
  tx: Transaction,
  typeArg: string,
  args: MintPoolCreationCapByAdminArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::factory::mint_pool_creation_cap_by_admin`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
    ],
  })
}

export interface RegisterPermissionPairArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  poolCreationCap: TransactionObjectInput
}

/**
 * Register PermissionPair
 * * `config` - The global config
 * * `pools` - The pools
 * * `tick_spacing` - The tick spacing
 * * `pool_creation_cap` - The pool creation cap
 * * `ctx` - Transaction context used to register the permission pair
 */
export function registerPermissionPair(
  tx: Transaction,
  typeArgs: [string, string],
  args: RegisterPermissionPairArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::register_permission_pair`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
      obj(tx, args.poolCreationCap),
    ],
  })
}

export interface UnregisterPermissionPairArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  cap: TransactionObjectInput
}

/**
 * Unregister PermissionPair
 * * `config` - The global config
 * * `pools` - The pools
 * * `tick_spacing` - The tick spacing
 * * `cap` - The pool creation cap
 * * `ctx` - Transaction context used to unregister the permission pair
 */
export function unregisterPermissionPair(
  tx: Transaction,
  typeArgs: [string, string],
  args: UnregisterPermissionPairArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::unregister_permission_pair`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
      obj(tx, args.cap),
    ],
  })
}

export interface RegisterPermissionPairInternalArgs {
  pools: TransactionObjectInput
  cap: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function registerPermissionPairInternal(
  tx: Transaction,
  typeArgs: [string, string],
  args: RegisterPermissionPairInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::factory::register_permission_pair_internal`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pools),
      obj(tx, args.cap),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export interface UnregisterPermissionPairInternalArgs {
  pools: TransactionObjectInput
  cap: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function unregisterPermissionPairInternal(
  tx: Transaction,
  typeArgs: [string, string],
  args: UnregisterPermissionPairInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::factory::unregister_permission_pair_internal`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pools),
      obj(tx, args.cap),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export function addDeniedCoin(
  tx: Transaction,
  typeArg: string,
  pools: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::add_denied_coin`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pools)],
  })
}

export interface MintPoolCreationCapInternalArgs {
  pools: TransactionObjectInput
  coinType: TransactionObjectInput
}

export function mintPoolCreationCapInternal(
  tx: Transaction,
  args: MintPoolCreationCapInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::factory::mint_pool_creation_cap_internal`,
    arguments: [
      obj(tx, args.pools),
      obj(tx, args.coinType),
    ],
  })
}

export interface CreatePoolArgs {
  pools: TransactionObjectInput
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Create pool
 * * `CoinTypeA` - The type name of the first coin
 * * `CoinTypeB` - The type name of the second coin
 * * `pools` - The global pools
 * * `config` - The global config
 * * `tick_spacing` - The tick spacing of the pool
 * * `initialize_price` - The initial price of the pool
 * * `url` - The url of the pool which is used in position nft
 * * `clock` - The clock
 * * `ctx` - Transaction context used to create the pool
 */
export function createPool(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::create_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pools),
      obj(tx, args.config),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolWithLiquidityArgs {
  pools: TransactionObjectInput
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  tickLowerIdx: number | TransactionArgument
  tickUpperIdx: number | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  amountA: bigint | TransactionArgument
  amountB: bigint | TransactionArgument
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/** @Deprecated */
export function createPoolWithLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolWithLiquidityArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::create_pool_with_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pools),
      obj(tx, args.config),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.tickLowerIdx, `u32`),
      pure(tx, args.tickUpperIdx, `u32`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      pure(tx, args.amountA, `u64`),
      pure(tx, args.amountB, `u64`),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV2_Args {
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
  amountA: bigint | TransactionArgument
  amountB: bigint | TransactionArgument
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Create pool and add liquidity.
 * * `config` - The global config
 * * `pools` - The global pools
 * * `tick_spacing` - The tick spacing of the pool
 * * `initialize_price` - The initial price of the pool
 * * `url` - The url of the pool which is used in position nft
 * * `tick_lower_idx` - The lower tick index of the pool
 * * `tick_upper_idx` - The upper tick index of the pool
 * * `coin_a` - The coin a
 * * `coin_b` - The coin b
 * * `metadata_a` - The metadata of the coin a
 * * `metadata_b` - The metadata of the coin b
 * * `amount_a` - The amount of coin a
 * * `amount_b` - The amount of coin b
 * * `fix_amount_a` - Fix the amount of coin a or b
 * * `clock` - The clock
 * * `ctx` - Transaction context used to create the pool and add liquidity
 */
export function createPoolV2_(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV2_Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::create_pool_v2_`,
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
      pure(tx, args.amountA, `u64`),
      pure(tx, args.amountB, `u64`),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolInternalArgs {
  pools: TransactionObjectInput
  globalConfig: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolInternal(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::create_pool_internal`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pools),
      obj(tx, args.globalConfig),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface FetchPoolsArgs {
  pools: TransactionObjectInput
  start: Array<string | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

/**
 * Fetch pool simple infos.
 * * `pools` - The global pools
 * * `start` - The start pool id
 * * `limit` - The max number of Pool to fetch
 */
export function fetchPools(
  tx: Transaction,
  args: FetchPoolsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::fetch_pools`,
    arguments: [
      obj(tx, args.pools),
      pure(tx, args.start, `vector<${ID.$typeName}>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

/**
 * Generate the pool unique key by CoinTypeA ,CoinTypeB and tick_spacing.
 * The key is used to check if the pool already exist.
 * the order or CoinTypeA and CoinTypeB is checked, or error is EInvalidCoinTypeSequence.
 * if the CoinTypeA and CoinTypeB is the same, error is ESameCoinType.
 * key = hash([CoinTypeA, CoinTypeB, tick_spacing])
 *
 * * `CoinTypeA` - The type name of the first coin
 * * `CoinTypeB` - The type name of the second coin
 * * `tick_spacing` - The tick spacing
 */
export function newPoolKey(
  tx: Transaction,
  typeArgs: [string, string],
  tickSpacing: number | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::new_pool_key`,
    typeArguments: typeArgs,
    arguments: [pure(tx, tickSpacing, `u32`)],
  })
}

/**
 * Check if the order of CoinTypeA and CoinTypeB is right
 * * `CoinTypeA` - The type name of the first coin
 * * `CoinTypeB` - The type name of the second coin
 */
export function isRightOrder(
  tx: Transaction,
  typeArgs: [string, string],
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::factory::is_right_order`,
    typeArguments: typeArgs,
    arguments: [],
  })
}
