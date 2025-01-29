import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function index(tx: Transaction, pools: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::factory::index`, arguments: [obj(tx, pools)] })
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

export function poolId(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::factory::pool_id`, arguments: [obj(tx, info)] })
}

export function tickSpacing(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::factory::tick_spacing`,
    arguments: [obj(tx, info)],
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

export function coinTypes(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::factory::coin_types`, arguments: [obj(tx, info)] })
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
