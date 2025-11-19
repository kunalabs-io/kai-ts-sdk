import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface FetchTicksArgs {
  a0: TransactionObjectInput
  a1: Array<number | TransactionArgument> | TransactionArgument
  a2: bigint | TransactionArgument
}

export function fetchTicks(tx: Transaction, typeArgs: [string, string], args: FetchTicksArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_ticks`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), pure(tx, args.a1, `vector<u32>`), pure(tx, args.a2, `u64`)],
  })
}

export interface FetchPositionsArgs {
  a0: TransactionObjectInput
  a1: Array<string | TransactionArgument> | TransactionArgument
  a2: bigint | TransactionArgument
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
      obj(tx, args.a0),
      pure(tx, args.a1, `vector<${ID.$typeName}>`),
      pure(tx, args.a2, `u64`),
    ],
  })
}

export interface FetchPoolsArgs {
  a0: TransactionObjectInput
  a1: Array<string | TransactionArgument> | TransactionArgument
  a2: bigint | TransactionArgument
}

export function fetchPools(tx: Transaction, args: FetchPoolsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_pools`,
    arguments: [
      obj(tx, args.a0),
      pure(tx, args.a1, `vector<${ID.$typeName}>`),
      pure(tx, args.a2, `u64`),
    ],
  })
}

export interface CalculateSwapResultArgs {
  a0: TransactionObjectInput
  a1: boolean | TransactionArgument
  a2: boolean | TransactionArgument
  a3: bigint | TransactionArgument
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
      obj(tx, args.a0),
      pure(tx, args.a1, `bool`),
      pure(tx, args.a2, `bool`),
      pure(tx, args.a3, `u64`),
    ],
  })
}

export interface FetchPositionRewardsArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
  a3: TransactionObjectInput
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
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `${ID.$typeName}`),
      obj(tx, args.a3),
    ],
  })
}

export interface FetchPositionFeesArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
}

export function fetchPositionFees(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchPositionFeesArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fetcher_script::fetch_position_fees`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1), pure(tx, args.a2, `${ID.$typeName}`)],
  })
}

export interface FetchPositionPointsArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
  a3: TransactionObjectInput
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
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `${ID.$typeName}`),
      obj(tx, args.a3),
    ],
  })
}
