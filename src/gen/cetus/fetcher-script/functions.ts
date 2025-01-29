import { PUBLISHED_AT } from '..'
import { ID } from '../../_dependencies/onchain/0x2/object/structs'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface FetchPositionsArgs {
  pool: TransactionObjectInput
  vecId: Array<string | TransactionArgument> | TransactionArgument
  u64: bigint | TransactionArgument
}

export function fetchPositions(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchPositionsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_positions`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.vecId, `vector<${ID.$typeName}>`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export interface FetchTicksArgs {
  pool: TransactionObjectInput
  vecU32: Array<number | TransactionArgument> | TransactionArgument
  u64: bigint | TransactionArgument
}

export function fetchTicks(tx: Transaction, typeArgs: [string, string], args: FetchTicksArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_ticks`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.vecU32, `vector<u32>`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export interface CalculateSwapResultArgs {
  pool: TransactionObjectInput
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  u64: bigint | TransactionArgument
}

export function calculateSwapResult(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateSwapResultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::calculate_swap_result`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export interface FetchPoolsArgs {
  pools: TransactionObjectInput
  vecId: Array<string | TransactionArgument> | TransactionArgument
  u64: bigint | TransactionArgument
}

export function fetchPools(tx: Transaction, args: FetchPoolsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_pools`,
    arguments: [
      obj(tx, args.pools),
      pure(tx, args.vecId, `vector<${ID.$typeName}>`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export interface FetchPositionRewardsArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  id: string | TransactionArgument
  clock: TransactionObjectInput
}

export function fetchPositionRewards(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchPositionRewardsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_position_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.id, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface FetchPositionFeesArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  id: string | TransactionArgument
}

export function fetchPositionFees(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchPositionFeesArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_position_fees`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.id, `${ID.$typeName}`),
    ],
  })
}

export interface FetchPositionPointsArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  id: string | TransactionArgument
  clock: TransactionObjectInput
}

export function fetchPositionPoints(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchPositionPointsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_position_points`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.id, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}
