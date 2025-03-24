import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AddAllowedListArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

export function addAllowedList(tx: Transaction, typeArg: string, args: AddAllowedListArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::add_allowed_list`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.pools)],
  })
}

export interface AddAllowedPairConfigArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function addAllowedPairConfig(
  tx: Transaction,
  typeArg: string,
  args: AddAllowedPairConfigArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::add_allowed_pair_config`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.pools), pure(tx, args.tickSpacing, `u32`)],
  })
}

export interface AddDeniedListArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

export function addDeniedList(tx: Transaction, typeArg: string, args: AddDeniedListArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::add_denied_list`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.pools)],
  })
}

export function coinTypes(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::factory::coin_types`, arguments: [obj(tx, info)] })
}

export interface CreatePoolArgs {
  pools: TransactionObjectInput
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  clock: TransactionObjectInput
}

export function createPool(tx: Transaction, typeArgs: [string, string], args: CreatePoolArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::create_pool`,
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

export function createPoolWithLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolWithLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::create_pool_with_liquidity`,
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

export interface FetchPoolsArgs {
  pools: TransactionObjectInput
  start: Array<string | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

export function fetchPools(tx: Transaction, args: FetchPoolsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::fetch_pools`,
    arguments: [
      obj(tx, args.pools),
      pure(tx, args.start, `vector<${ID.$typeName}>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

export function inAllowedList(tx: Transaction, typeArg: string, pools: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::in_allowed_list`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pools)],
  })
}

export function inDeniedList(tx: Transaction, typeArg: string, pools: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::in_denied_list`,
    typeArguments: [typeArg],
    arguments: [obj(tx, pools)],
  })
}

export function index(tx: Transaction, pools: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::factory::index`, arguments: [obj(tx, pools)] })
}

export interface IsAllowedCoinArgs {
  pools: TransactionObjectInput
  metadata: TransactionObjectInput
}

export function isAllowedCoin(tx: Transaction, typeArg: string, args: IsAllowedCoinArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::is_allowed_coin`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.pools), obj(tx, args.metadata)],
  })
}

export interface IsPermissionPairArgs {
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function isPermissionPair(
  tx: Transaction,
  typeArgs: [string, string],
  args: IsPermissionPairArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::is_permission_pair`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pools), pure(tx, args.tickSpacing, `u32`)],
  })
}

export interface MintPoolCreationCapArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  treasuryCap: TransactionObjectInput
}

export function mintPoolCreationCap(
  tx: Transaction,
  typeArg: string,
  args: MintPoolCreationCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::mint_pool_creation_cap`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.pools), obj(tx, args.treasuryCap)],
  })
}

export interface MintPoolCreationCapByAdminArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

export function mintPoolCreationCapByAdmin(
  tx: Transaction,
  typeArg: string,
  args: MintPoolCreationCapByAdminArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::mint_pool_creation_cap_by_admin`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.pools)],
  })
}

export function newPoolKey(
  tx: Transaction,
  typeArgs: [string, string],
  tickSpacing: number | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::new_pool_key`,
    typeArguments: typeArgs,
    arguments: [pure(tx, tickSpacing, `u32`)],
  })
}

export interface PermissionPairCapArgs {
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function permissionPairCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: PermissionPairCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::permission_pair_cap`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pools), pure(tx, args.tickSpacing, `u32`)],
  })
}

export function poolId(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::factory::pool_id`, arguments: [obj(tx, info)] })
}

export function poolKey(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::factory::pool_key`, arguments: [obj(tx, info)] })
}

export interface PoolSimpleInfoArgs {
  pools: TransactionObjectInput
  poolKey: string | TransactionArgument
}

export function poolSimpleInfo(tx: Transaction, args: PoolSimpleInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::pool_simple_info`,
    arguments: [obj(tx, args.pools), pure(tx, args.poolKey, `${ID.$typeName}`)],
  })
}

export interface RegisterPermissionPairArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  poolCreationCap: TransactionObjectInput
}

export function registerPermissionPair(
  tx: Transaction,
  typeArgs: [string, string],
  args: RegisterPermissionPairArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::register_permission_pair`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
      obj(tx, args.poolCreationCap),
    ],
  })
}

export interface RemoveAllowedListArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

export function removeAllowedList(tx: Transaction, typeArg: string, args: RemoveAllowedListArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::remove_allowed_list`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.pools)],
  })
}

export interface RemoveAllowedPairConfigArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function removeAllowedPairConfig(
  tx: Transaction,
  typeArg: string,
  args: RemoveAllowedPairConfigArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::remove_allowed_pair_config`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.pools), pure(tx, args.tickSpacing, `u32`)],
  })
}

export interface RemoveDeniedListArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
}

export function removeDeniedList(tx: Transaction, typeArg: string, args: RemoveDeniedListArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::remove_denied_list`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.pools)],
  })
}

export function tickSpacing(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::tick_spacing`,
    arguments: [obj(tx, info)],
  })
}

export interface UnregisterPermissionPairArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  cap: TransactionObjectInput
}

export function unregisterPermissionPair(
  tx: Transaction,
  typeArgs: [string, string],
  args: UnregisterPermissionPairArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::unregister_permission_pair`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
      obj(tx, args.cap),
    ],
  })
}
