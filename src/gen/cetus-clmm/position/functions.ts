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

export function init(
  tx: Transaction,
  otw: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::init`,
    arguments: [obj(tx, otw)],
  })
}

export interface SetDisplayArgs {
  config: TransactionObjectInput
  publisher: TransactionObjectInput
  description: string | TransactionArgument
  link: string | TransactionArgument
  projectUrl: string | TransactionArgument
  creator: string | TransactionArgument
}

/**
 * Set `Display` for the position NFT.
 * * `config` - The global configuration
 * * `publisher` - The publisher of the position NFT
 * * `description` - The description of the position
 * * `link` - The link of the position
 * * `website` - The website of the position
 * * `creator` - The creator of the position
 * * `ctx` - The transaction context
 */
export function setDisplay(
  tx: Transaction,
  args: SetDisplayArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::set_display`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.publisher),
      pure(tx, args.description, `${String.$typeName}`),
      pure(tx, args.link, `${String.$typeName}`),
      pure(tx, args.projectUrl, `${String.$typeName}`),
      pure(tx, args.creator, `${String.$typeName}`),
    ],
  })
}

export interface UpdateDisplayInternalArgs {
  publisher: TransactionObjectInput
  description: string | TransactionArgument
  link: string | TransactionArgument
  projectUrl: string | TransactionArgument
  creator: string | TransactionArgument
}

export function updateDisplayInternal(
  tx: Transaction,
  args: UpdateDisplayInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_display_internal`,
    arguments: [
      obj(tx, args.publisher),
      pure(tx, args.description, `${String.$typeName}`),
      pure(tx, args.link, `${String.$typeName}`),
      pure(tx, args.projectUrl, `${String.$typeName}`),
      pure(tx, args.creator, `${String.$typeName}`),
    ],
  })
}

/**
 * Create a new PositionManager
 * * `tick_spacing` - The tick spacing for this position manager
 * * `ctx` - The transaction context
 * * Returns a new PositionManager
 */
export function new_(
  tx: Transaction,
  tickSpacing: number | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::new`,
    arguments: [pure(tx, tickSpacing, `u32`)],
  })
}

export interface OpenPositionArgs {
  manager: TransactionObjectInput
  poolId: string | TransactionArgument
  poolIndex: bigint | TransactionArgument
  url: string | TransactionArgument
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

/**
 * Open a position
 * * `manager` - The position manager
 * * `pool_id` - The pool ID
 * * `pool_index` - The pool index
 * * `url` - The URL of the position
 * * `tick_lower_index` - The lower tick index
 * * `tick_upper_index` - The upper tick index
 * * `ctx` - The transaction context
 * * Returns the position
 */
export function openPosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: OpenPositionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::open_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.poolIndex, `u64`),
      pure(tx, args.url, `${String.$typeName}`),
      obj(tx, args.tickLowerIndex),
      obj(tx, args.tickUpperIndex),
    ],
  })
}

export interface ClosePositionArgs {
  manager: TransactionObjectInput
  positionNft: TransactionObjectInput
}

/**
 * Close the position, remove position_id from `PositionManager`, and destroy the position nft.
 * * `manager` - The position manager
 * * `position_nft` - The position NFT
 */
export function closePosition(
  tx: Transaction,
  args: ClosePositionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::close_position`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.positionNft),
    ],
  })
}

export interface RemovePositionInfoForRestoreArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Remove the position info for restore
 * * `manager` - The position manager
 * * `position_id` - The position ID
 */
export function removePositionInfoForRestore(
  tx: Transaction,
  args: RemovePositionInfoForRestoreArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-clmm', options?.env)
    }::position::remove_position_info_for_restore`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface IncreaseLiquidityArgs {
  manager: TransactionObjectInput
  positionNft: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  feeGrowthInsideA: bigint | TransactionArgument
  feeGrowthInsideB: bigint | TransactionArgument
  pointsGrowthInside: bigint | TransactionArgument
  rewardsGrowthInside: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * Increase liquidity from position.
 * * `manager` - The position manager
 * * `position_nft` - The position NFT
 * * `delta_liquidity` - The liquidity to increase
 * * `fee_growth_inside_a` - The latest position range fee_growth_inside_a
 * * `fee_growth_inside_b` - The latest position range fee_growth_inside_b
 * * `points_growth_inside` - The latest position range points_growth_inside
 * * `rewards_growth_inside` - The latest position range rewards_growth_inside
 * * Returns the new liquidity
 */
export function increaseLiquidity(
  tx: Transaction,
  args: IncreaseLiquidityArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::increase_liquidity`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.positionNft),
      pure(tx, args.deltaLiquidity, `u128`),
      pure(tx, args.feeGrowthInsideA, `u128`),
      pure(tx, args.feeGrowthInsideB, `u128`),
      pure(tx, args.pointsGrowthInside, `u128`),
      pure(tx, args.rewardsGrowthInside, `vector<u128>`),
    ],
  })
}

export interface DecreaseLiquidityArgs {
  manager: TransactionObjectInput
  positionNft: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  feeGrowthInsideA: bigint | TransactionArgument
  feeGrowthInsideB: bigint | TransactionArgument
  pointsGrowthInside: bigint | TransactionArgument
  rewardsGrowthInside: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * Decrease liquidity from position.
 * * `manager` - The position manager
 * * `position_nft` - The position NFT
 * * `delta_liquidity` - The liquidity to decrease
 * * `fee_growth_inside_a` - The latest position range fee_growth_inside_a
 * * `fee_growth_inside_b` - The latest position range fee_growth_inside_b
 * * `points_growth_inside` - The latest position range points_growth_inside
 * * `rewards_growth_inside` - The latest position range rewards_growth_inside
 */
export function decreaseLiquidity(
  tx: Transaction,
  args: DecreaseLiquidityArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::decrease_liquidity`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.positionNft),
      pure(tx, args.deltaLiquidity, `u128`),
      pure(tx, args.feeGrowthInsideA, `u128`),
      pure(tx, args.feeGrowthInsideB, `u128`),
      pure(tx, args.pointsGrowthInside, `u128`),
      pure(tx, args.rewardsGrowthInside, `vector<u128>`),
    ],
  })
}

export interface ApplyLiquidityCutArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
  deltaLiquidity: bigint | TransactionArgument
  feeGrowthInsideA: bigint | TransactionArgument
  feeGrowthInsideB: bigint | TransactionArgument
  pointsGrowthInside: bigint | TransactionArgument
  rewardsGrowthInside: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * Apply liquidity cut to the position.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * `delta_liquidity` - The liquidity to decrease
 * * `fee_growth_inside_a` - The latest position range fee_growth_inside_a
 * * `fee_growth_inside_b` - The latest position range fee_growth_inside_b
 * * `points_growth_inside` - The latest position range points_growth_inside
 * * `rewards_growth_inside` - The latest position range rewards_growth_inside
 * * Returns the new liquidity
 */
export function applyLiquidityCut(
  tx: Transaction,
  args: ApplyLiquidityCutArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::apply_liquidity_cut`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.deltaLiquidity, `u128`),
      pure(tx, args.feeGrowthInsideA, `u128`),
      pure(tx, args.feeGrowthInsideB, `u128`),
      pure(tx, args.pointsGrowthInside, `u128`),
      pure(tx, args.rewardsGrowthInside, `vector<u128>`),
    ],
  })
}

export interface UpdateFeeArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
  feeGrowthInsideA: bigint | TransactionArgument
  feeGrowthInsideB: bigint | TransactionArgument
}

/**
 * Update `PositionInfo` fee, return the fee_owned.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * `fee_growth_inside_a` - The latest position range fee_growth_inside_a
 * * `fee_growth_inside_b` - The latest position range fee_growth_inside_b
 * * Returns the fee_owned
 */
export function updateFee(
  tx: Transaction,
  args: UpdateFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_fee`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.feeGrowthInsideA, `u128`),
      pure(tx, args.feeGrowthInsideB, `u128`),
    ],
  })
}

export interface UpdatePointsArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
  pointsGrowthInside: bigint | TransactionArgument
}

/**
 * Update `PositionInfo` points, return the points_owned.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * `points_growth_inside` - The latest position range points_growth_inside
 * * Returns the points_owned
 */
export function updatePoints(
  tx: Transaction,
  args: UpdatePointsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_points`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.pointsGrowthInside, `u128`),
    ],
  })
}

export interface UpdateRewardsArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
  rewardsGrowthInside: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * Update `PositionInfo` rewards, return the amount_owned vector.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * `rewards_growth_inside` - The latest position range rewards_growth_inside
 * * Returns the amount_owned vector
 */
export function updateRewards(
  tx: Transaction,
  args: UpdateRewardsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_rewards`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.rewardsGrowthInside, `vector<u128>`),
    ],
  })
}

export interface UpdateAndResetFeeArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
  feeGrowthInsideA: bigint | TransactionArgument
  feeGrowthInsideB: bigint | TransactionArgument
}

/**
 * Update `PositionInfo` fee, reset the fee_owned_a and fee_owned_b and return the amount_owned.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * `fee_growth_inside_a` - The latest position range fee_growth_inside_a
 * * `fee_growth_inside_b` - The latest position range fee_growth_inside_b
 * * Returns the amount_owned
 */
export function updateAndResetFee(
  tx: Transaction,
  args: UpdateAndResetFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_and_reset_fee`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.feeGrowthInsideA, `u128`),
      pure(tx, args.feeGrowthInsideB, `u128`),
    ],
  })
}

export interface UpdateAndResetRewardsArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
  rewardsGrowthInside: Array<bigint | TransactionArgument> | TransactionArgument
  rewarderIdx: bigint | TransactionArgument
}

/**
 * Update `PositionInfo` rewards
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * `rewards_growth_inside` - The latest position range rewards_growth_inside
 * * `rewarder_idx` - The rewarder index
 * * Returns the amount_owned
 */
export function updateAndResetRewards(
  tx: Transaction,
  args: UpdateAndResetRewardsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_and_reset_rewards`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.rewardsGrowthInside, `vector<u128>`),
      pure(tx, args.rewarderIdx, `u64`),
    ],
  })
}

export interface ResetFeeArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Reset the fee's amount owned to 0 and return the fee amount owned.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * Returns the fee amount owned
 */
export function resetFee(
  tx: Transaction,
  args: ResetFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::reset_fee`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface ResetRewarderArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
  rewarderIdx: bigint | TransactionArgument
}

/**
 * Reset the rewarder's amount owned to 0 and return the reward num owned.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * `rewarder_idx` - The rewarder index
 * * Returns the reward amount owned
 */
export function resetRewarder(
  tx: Transaction,
  args: ResetRewarderArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::reset_rewarder`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.rewarderIdx, `u64`),
    ],
  })
}

export interface InitedRewardsCountArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * the inited reward count in `PositionInfo`.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * Returns the inited reward count
 */
export function initedRewardsCount(
  tx: Transaction,
  args: InitedRewardsCountArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::inited_rewards_count`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface FetchPositionsArgs {
  manager: TransactionObjectInput
  start: Array<string | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

/**
 * Fetch `PositionInfo` List.
 * * `manager` - The position manager
 * * `start` - The start position id
 * * `limit` - The max count of `PositionInfo` to fetch
 * * Returns the `PositionInfo` list
 */
export function fetchPositions(
  tx: Transaction,
  args: FetchPositionsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::fetch_positions`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.start, `vector<${ID.$typeName}>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

/**
 * Get the pool_id of a position.
 * * `position_nft` - The position NFT
 * * Returns the pool ID
 */
export function poolId(
  tx: Transaction,
  positionNft: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::pool_id`,
    arguments: [obj(tx, positionNft)],
  })
}

/**
 * Get the tick range tuple of position.
 * * `position_nft` - The position NFT
 * * Returns the tick range tuple
 */
export function tickRange(
  tx: Transaction,
  positionNft: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::tick_range`,
    arguments: [obj(tx, positionNft)],
  })
}

/**
 * Get the index of position.
 * * `position_nft` - The position NFT
 * * Returns the index
 */
export function index(
  tx: Transaction,
  positionNft: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::index`,
    arguments: [obj(tx, positionNft)],
  })
}

/**
 * Get the name of position.
 * * `position_nft` - The position NFT
 * * Returns the name
 */
export function name(
  tx: Transaction,
  positionNft: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::name`,
    arguments: [obj(tx, positionNft)],
  })
}

/**
 * Get the description of position.
 * * `position_nft` - The position NFT
 * * Returns the description
 */
export function description(
  tx: Transaction,
  positionNft: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::description`,
    arguments: [obj(tx, positionNft)],
  })
}

/**
 * Get the url of position.
 * * `position_nft` - The position NFT
 * * Returns the url
 */
export function url(
  tx: Transaction,
  positionNft: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::url`,
    arguments: [obj(tx, positionNft)],
  })
}

/**
 * Get the liquidity of position.
 * * `position_nft` - The position NFT
 * * Returns the liquidity
 */
export function liquidity(
  tx: Transaction,
  positionNft: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::liquidity`,
    arguments: [obj(tx, positionNft)],
  })
}

/**
 * Get the position_id of `PositionInfo`.
 * * `info` - The `PositionInfo`
 * * Returns the position ID
 */
export function infoPositionId(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::info_position_id`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the liquidity of `PositionInfo`.
 * * `info` - The `PositionInfo`
 * * Returns the liquidity
 */
export function infoLiquidity(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::info_liquidity`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the tick range tuple of `PositionInfo`.
 * * `info` - The `PositionInfo`
 * * Returns the tick range tuple
 */
export function infoTickRange(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::info_tick_range`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the fee_growth_inside tuple of `PositionInfo`.
 * * `info` - The `PositionInfo`
 * * Returns the fee growth inside tuple
 */
export function infoFeeGrowthInside(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::info_fee_growth_inside`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the fee_owned tuple of `PositionInfo`.
 * * `info` - The `PositionInfo`
 * * Returns the fee owned tuple
 */
export function infoFeeOwned(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::info_fee_owned`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the points_owned of `PositionInfo`.
 * * `info` - The `PositionInfo`
 * * Returns the points owned
 */
export function infoPointsOwned(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::info_points_owned`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the points_growth_inside of `PositionInfo`.
 * * `info` - The `PositionInfo`
 * * Returns the points growth inside
 */
export function infoPointsGrowthInside(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::info_points_growth_inside`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Get the rewards of `PositionInfo`.
 * * `info` - The `PositionInfo`
 * * Returns the rewards
 */
export function infoRewards(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::info_rewards`,
    arguments: [obj(tx, info)],
  })
}

/**
 * Returns the reward growth by `PositionReward`.
 * * `reward` - The `PositionReward`
 * * Returns the reward growth
 */
export function rewardGrowthInside(
  tx: Transaction,
  reward: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::reward_growth_inside`,
    arguments: [obj(tx, reward)],
  })
}

/**
 * Returns the reward owned by `PositionReward`.
 * * `reward` - The `PositionReward`
 * * Returns the reward amount owned
 */
export function rewardAmountOwned(
  tx: Transaction,
  reward: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::reward_amount_owned`,
    arguments: [obj(tx, reward)],
  })
}

export interface RewardsAmountOwnedArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Returns the amount of rewards owned by the position.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * Returns the rewards amount owned vector
 */
export function rewardsAmountOwned(
  tx: Transaction,
  args: RewardsAmountOwnedArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::rewards_amount_owned`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface BorrowPositionInfoArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * Borrow `PositionInfo` by position_id.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * Returns the `PositionInfo`
 */
export function borrowPositionInfo(
  tx: Transaction,
  args: BorrowPositionInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::borrow_position_info`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

/**
 * Check if a position is empty
 * 1. liquidity == 0
 * 2. fee_owned_a == 0
 * 3. fee_owned_b == 0
 * 4. [reward.amount_owned == 0 for reward in position_info.rewards]
 * * `position_info` - The `PositionInfo`
 * * Returns true if the position is empty, false otherwise
 */
export function isEmpty(
  tx: Transaction,
  positionInfo: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::is_empty`,
    arguments: [obj(tx, positionInfo)],
  })
}

export interface CheckPositionTickRangeArgs {
  lower: TransactionObjectInput
  upper: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

/**
 * Check if a position tick range is valid.
 * 1. lower < upper
 * 2. (lower >= min_tick) && (upper <= max_tick)
 * 3. (lower % tick_spacing == 0) && (upper % tick_spacing == 0)
 * * `lower` - The lower tick index
 * * `upper` - The upper tick index
 * * `tick_spacing` - The tick spacing
 */
export function checkPositionTickRange(
  tx: Transaction,
  args: CheckPositionTickRangeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::check_position_tick_range`,
    arguments: [
      obj(tx, args.lower),
      obj(tx, args.upper),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export interface IsPositionExistArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * check if the position exists in `PositionManager` by position_id.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * Returns true if the position exists, false otherwise
 */
export function isPositionExist(
  tx: Transaction,
  args: IsPositionExistArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::is_position_exist`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface UpdateRewardsInternalArgs {
  positionInfo: TransactionObjectInput
  rewardsGrowthsInside: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * Update position rewards.
 * * `position_info` - The `PositionInfo`
 * * `rewards_growths_inside` - The rewards growth inside vector
 */
export function updateRewardsInternal(
  tx: Transaction,
  args: UpdateRewardsInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_rewards_internal`,
    arguments: [
      obj(tx, args.positionInfo),
      pure(tx, args.rewardsGrowthsInside, `vector<u128>`),
    ],
  })
}

export interface UpdateFeeInternalArgs {
  positionInfo: TransactionObjectInput
  feeGrowthInsideA: bigint | TransactionArgument
  feeGrowthInsideB: bigint | TransactionArgument
}

/**
 * Update position fee.
 * * `position_info` - The `PositionInfo`
 * * `fee_growth_inside_a` - The fee growth inside of coin A
 * * `fee_growth_inside_b` - The fee growth inside of coin B
 */
export function updateFeeInternal(
  tx: Transaction,
  args: UpdateFeeInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_fee_internal`,
    arguments: [
      obj(tx, args.positionInfo),
      pure(tx, args.feeGrowthInsideA, `u128`),
      pure(tx, args.feeGrowthInsideB, `u128`),
    ],
  })
}

export interface UpdatePointsInternalArgs {
  positionInfo: TransactionObjectInput
  pointsGrowthInside: bigint | TransactionArgument
}

/**
 * Update position points.
 * * `position_info` - The `PositionInfo`
 * * `points_growth_inside` - The points growth inside
 */
export function updatePointsInternal(
  tx: Transaction,
  args: UpdatePointsInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::update_points_internal`,
    arguments: [
      obj(tx, args.positionInfo),
      pure(tx, args.pointsGrowthInside, `u128`),
    ],
  })
}

export interface NewPositionNameArgs {
  poolIndex: bigint | TransactionArgument
  positionIndex: bigint | TransactionArgument
}

/**
 * Generate position name by pool_index and position_index.
 * * `pool_index` - The pool index
 * * `position_index` - The position index
 * * Returns the position name
 */
export function newPositionName(
  tx: Transaction,
  args: NewPositionNameArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::new_position_name`,
    arguments: [
      pure(tx, args.poolIndex, `u64`),
      pure(tx, args.positionIndex, `u64`),
    ],
  })
}

export interface BorrowMutPositionInfoArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

/**
 * borrow mutable `PositionInfo` by position_id.
 * * `manager` - The position manager
 * * `position_id` - The position ID
 * * Returns the mutable `PositionInfo`
 */
export function borrowMutPositionInfo(
  tx: Transaction,
  args: BorrowMutPositionInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::borrow_mut_position_info`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

/**
 * Destory `Position`.
 * * `position_nft` - The position NFT
 */
export function destroy(
  tx: Transaction,
  positionNft: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::position::destroy`,
    arguments: [obj(tx, positionNft)],
  })
}
