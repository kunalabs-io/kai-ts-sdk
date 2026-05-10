import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'

export interface NewArgs {
  currentSqrtPrice: bigint | TransactionArgument
  removePercent: bigint | TransactionArgument
}

/**
 * Create a new PositionLiquiditySnapshot
 * * `current_sqrt_price` - The current sqrt price
 * * `remove_percent` - The remove percent
 * * `ctx` - The transaction context
 * * Returns a new PositionLiquiditySnapshot
 */
export function new_(
  tx: Transaction,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::new`,
    arguments: [
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.removePercent, `u64`),
    ],
  })
}

/**
 * Get the remove percent of the PositionLiquiditySnapshot
 * * `snapshot` - The PositionLiquiditySnapshot
 * * Returns the remove percent
 */
export function removePercent(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::remove_percent`,
    arguments: [obj(tx, snapshot)],
  })
}

/**
 * Get the current sqrt price of the PositionLiquiditySnapshot
 * * `snapshot` - The PositionLiquiditySnapshot
 * * Returns the current sqrt price
 */
export function currentSqrtPrice(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::current_sqrt_price`,
    arguments: [obj(tx, snapshot)],
  })
}

/**
 * Get the total value cut of the PositionLiquiditySnapshot
 * * `snapshot` - The PositionLiquiditySnapshot
 * * Returns the total value cut
 */
export function totalValueCut(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::total_value_cut`,
    arguments: [obj(tx, snapshot)],
  })
}

/**
 * Get the value cut of the PositionSnapshot
 * * `snapshot` - The PositionSnapshot
 * * Returns the value cut
 */
export function valueCut(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::value_cut`,
    arguments: [obj(tx, snapshot)],
  })
}

/**
 * Get the rewards of the PositionSnapshot
 * * `snapshot` - The PositionSnapshot
 * * Returns the rewards
 */
export function rewards(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::rewards`,
    arguments: [obj(tx, snapshot)],
  })
}

/**
 * Get the fee owned of the PositionSnapshot
 * * `snapshot` - The PositionSnapshot
 * * Returns
 */
export function feeOwned(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::fee_owned`,
    arguments: [obj(tx, snapshot)],
  })
}

/**
 * Get the tick range of the PositionSnapshot
 * * `snapshot` - The PositionSnapshot
 * * Returns the tick range
 */
export function tickRange(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::tick_range`,
    arguments: [obj(tx, snapshot)],
  })
}

/**
 * Get the liquidity of the PositionSnapshot
 * * `snapshot` - The PositionSnapshot
 * * Returns the liquidity
 */
export function liquidity(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::liquidity`,
    arguments: [obj(tx, snapshot)],
  })
}

/**
 * Get the position id of the PositionSnapshot
 * * `snapshot` - The PositionSnapshot
 * * Returns the position id
 */
export function positionId(
  tx: Transaction,
  snapshot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::position_id`,
    arguments: [obj(tx, snapshot)],
  })
}

export interface CalculateRemoveLiquidityArgs {
  snapshot: TransactionObjectInput
  positionInfo: TransactionObjectInput
}

/**
 * Calculate the remove liquidity
 * * `snapshot` - The PositionLiquiditySnapshot
 * * `position_info` - The position info
 * * Returns the remove liquidity
 */
export function calculateRemoveLiquidity(
  tx: Transaction,
  args: CalculateRemoveLiquidityArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::position_snapshot::calculate_remove_liquidity`,
    arguments: [
      obj(tx, args.snapshot),
      obj(tx, args.positionInfo),
    ],
  })
}

export interface AddArgs {
  snapshot: TransactionObjectInput
  positionId: string | TransactionArgument
  valueCut: bigint | TransactionArgument
  positionInfo: TransactionObjectInput
}

/**
 * Add a new PositionSnapshot to the PositionLiquiditySnapshot
 * * `snapshot` - The PositionLiquiditySnapshot
 * * `position_id` - The position id
 * * `value_cut` - The value cut
 * * `position_info` - The position info
 */
export function add(
  tx: Transaction,
  args: AddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::add`,
    arguments: [
      obj(tx, args.snapshot),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.valueCut, `u64`),
      obj(tx, args.positionInfo),
    ],
  })
}

export interface GetArgs {
  snapshot: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Get the PositionSnapshot from the PositionLiquiditySnapshot
 * * `snapshot` - The PositionLiquiditySnapshot
 * * `position_id` - The position id
 * * Returns the PositionSnapshot
 */
export function get(
  tx: Transaction,
  args: GetArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::get`,
    arguments: [
      obj(tx, args.snapshot),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface ContainsArgs {
  snapshot: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Check if the PositionLiquiditySnapshot contains the PositionSnapshot
 * * `snapshot` - The PositionLiquiditySnapshot
 * * `position_id` - The position id
 * * Returns true if the PositionLiquiditySnapshot contains the PositionSnapshot for the position id, false otherwise
 */
export function contains(
  tx: Transaction,
  args: ContainsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::contains`,
    arguments: [
      obj(tx, args.snapshot),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface RemoveArgs {
  snapshot: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Remove the PositionSnapshot from the PositionLiquiditySnapshot
 * * `snapshot` - The PositionLiquiditySnapshot
 * * `position_id` - The position id
 */
export function remove(
  tx: Transaction,
  args: RemoveArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position_snapshot::remove`,
    arguments: [
      obj(tx, args.snapshot),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}
