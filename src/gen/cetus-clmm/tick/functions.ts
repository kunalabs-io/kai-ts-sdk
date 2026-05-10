import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, option, pure } from '../../_framework/util'
import { Tick } from './structs'

export interface NewArgs {
  tickSpacing: number | TransactionArgument
  seed: bigint | TransactionArgument
}

/**
 * Initialize the TickManager.
 * * `tick_spacing` - The spacing between initialized ticks
 * * `seed` - The seed for the SkipList
 * * `ctx` - The transaction context
 * * Returns the new TickManager
 */
export function new_(
  tx: Transaction,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::new`,
    arguments: [
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.seed, `u64`),
    ],
  })
}

export interface IncreaseLiquidityArgs {
  manager: TransactionObjectInput
  poolCurrentTickIdx: TransactionObjectInput
  tickLowerIdx: TransactionObjectInput
  tickUpperIdx: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  feeGrowthGlobalA: bigint | TransactionArgument
  feeGrowthGlobalB: bigint | TransactionArgument
  pointsGrowthGlobal: bigint | TransactionArgument
  rewardsGrowthGlobal: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * Increase liquidity on Ticks.
 * If the tick not exists, insert into skip_list first.
 * * `manager` - The TickManager
 * * `pool_current_tick_idx` - The current tick index
 * * `tick_lower_idx` - The lower tick index
 * * `tick_upper_idx` - The upper tick index
 * * `delta_liquidity` - The delta liquidity
 * * `fee_growth_global_a` - The fee growth global of token A
 * * `fee_growth_global_b` - The fee growth global of token B
 * * `points_growth_global` - The points growth global
 * * `rewards_growth_global` - The rewards growth global
 */
export function increaseLiquidity(
  tx: Transaction,
  args: IncreaseLiquidityArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::increase_liquidity`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.poolCurrentTickIdx),
      obj(tx, args.tickLowerIdx),
      obj(tx, args.tickUpperIdx),
      pure(tx, args.deltaLiquidity, `u128`),
      pure(tx, args.feeGrowthGlobalA, `u128`),
      pure(tx, args.feeGrowthGlobalB, `u128`),
      pure(tx, args.pointsGrowthGlobal, `u128`),
      pure(tx, args.rewardsGrowthGlobal, `vector<u128>`),
    ],
  })
}

export interface DecreaseLiquidityArgs {
  manager: TransactionObjectInput
  poolCurrentTickIndex: TransactionObjectInput
  tickLowerIdx: TransactionObjectInput
  tickUpperIdx: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  feeGrowthGlobalA: bigint | TransactionArgument
  feeGrowthGlobalB: bigint | TransactionArgument
  pointsGrowthGlobal: bigint | TransactionArgument
  rewardsGrowthGlobal: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * Decrease liquidity on Ticks.
 * if the tick liquidity is zero, remove from skip_list(skip for max_tick and min_tick);
 * * `manager` - The TickManager
 * * `pool_current_tick_index` - The current tick index
 * * `tick_lower_idx` - The lower tick index
 * * `tick_upper_idx` - The upper tick index
 * * `delta_liquidity` - The delta liquidity
 * * `fee_growth_global_a` - The fee growth global of token A
 * * `fee_growth_global_b` - The fee growth global of token B
 * * `points_growth_global` - The points growth global
 * * `rewards_growth_global` - The rewards growth global
 */
export function decreaseLiquidity(
  tx: Transaction,
  args: DecreaseLiquidityArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::decrease_liquidity`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.poolCurrentTickIndex),
      obj(tx, args.tickLowerIdx),
      obj(tx, args.tickUpperIdx),
      pure(tx, args.deltaLiquidity, `u128`),
      pure(tx, args.feeGrowthGlobalA, `u128`),
      pure(tx, args.feeGrowthGlobalB, `u128`),
      pure(tx, args.pointsGrowthGlobal, `u128`),
      pure(tx, args.rewardsGrowthGlobal, `vector<u128>`),
    ],
  })
}

export interface FirstScoreForSwapArgs {
  manager: TransactionObjectInput
  currentTickIdx: TransactionObjectInput
  a2B: boolean | TransactionArgument
}

/**
 * Return the next tick index for swap.
 * * `manager` - The TickManager
 * * `current_tick_idx` - The current tick index
 * * `a2b` - If the swap is a2b or b2a
 * * Returns the next tick index for swap
 */
export function firstScoreForSwap(
  tx: Transaction,
  args: FirstScoreForSwapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::first_score_for_swap`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.currentTickIdx),
      pure(tx, args.a2B, `bool`),
    ],
  })
}

export interface BorrowTickForSwapArgs {
  manager: TransactionObjectInput
  score: bigint | TransactionArgument
  a2B: boolean | TransactionArgument
}

/**
 * Borrow Tick by score and return the next tick score for swap.
 * * `manager` - The TickManager
 * * `score` - The score of the tick
 * * `a2b` - If the swap is a2b or b2a
 * * Returns the tick and the next tick score for swap
 */
export function borrowTickForSwap(
  tx: Transaction,
  args: BorrowTickForSwapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::borrow_tick_for_swap`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.score, `u64`),
      pure(tx, args.a2B, `bool`),
    ],
  })
}

export interface TryBorrowTickArgs {
  manager: TransactionObjectInput
  tickIdx: TransactionObjectInput
}

/**
 * Try borrow tick by tick index.
 * * `manager` - The TickManager
 * * `tick_idx` - The tick index
 * * Returns the tick if it exists, otherwise returns None
 */
export function tryBorrowTick(
  tx: Transaction,
  args: TryBorrowTickArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::try_borrow_tick`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.tickIdx),
    ],
  })
}

/**
 * Get tick_spacing.
 * * `manager` - The TickManager
 * * Returns the tick spacing
 */
export function tickSpacing(
  tx: Transaction,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::tick_spacing`,
    arguments: [obj(tx, manager)],
  })
}

/**
 * Get tick index
 * * `tick` - The tick
 * * Returns the tick index
 */
export function index(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::index`,
    arguments: [obj(tx, tick)],
  })
}

/**
 * Get tick sqrt_price
 * * `tick` - The tick
 * * Returns the tick sqrt price
 */
export function sqrtPrice(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::sqrt_price`,
    arguments: [obj(tx, tick)],
  })
}

/**
 * Get tick liquidity_net
 * * `tick` - The tick
 * * Returns the tick liquidity net
 */
export function liquidityNet(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::liquidity_net`,
    arguments: [obj(tx, tick)],
  })
}

/**
 * Get tick liquidity_gross
 * * `tick` - The tick
 * * Returns the tick liquidity gross
 */
export function liquidityGross(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::liquidity_gross`,
    arguments: [obj(tx, tick)],
  })
}

/**
 * Get tick fee_growth_insides
 * * `tick` - The tick
 * * Returns the tick fee growth outside
 */
export function feeGrowthOutside(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::fee_growth_outside`,
    arguments: [obj(tx, tick)],
  })
}

/**
 * Get tick points_growth_outside
 * * `tick` - The tick
 * * Returns the tick points growth outside
 */
export function pointsGrowthOutside(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::points_growth_outside`,
    arguments: [obj(tx, tick)],
  })
}

/**
 * Get tick rewards_growth_outside
 * * `tick` - The tick
 * * Returns the tick rewards growth outside
 */
export function rewardsGrowthOutside(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::rewards_growth_outside`,
    arguments: [obj(tx, tick)],
  })
}

export interface BorrowTickArgs {
  manager: TransactionObjectInput
  idx: TransactionObjectInput
}

/**
 * Borrow Tick by index
 * * `manager` - The TickManager
 * * `idx` - The tick index
 * * Returns the tick
 */
export function borrowTick(
  tx: Transaction,
  args: BorrowTickArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::borrow_tick`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.idx),
    ],
  })
}

export interface GetRewardGrowthOutsideArgs {
  tick: TransactionObjectInput
  idx: bigint | TransactionArgument
}

/**
 * Get the tick reward_growth_outside by index.
 * * `tick` - The tick
 * * `idx` - The index of the reward growth outside
 * * Returns the tick reward growth outside
 */
export function getRewardGrowthOutside(
  tx: Transaction,
  args: GetRewardGrowthOutsideArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::get_reward_growth_outside`,
    arguments: [
      obj(tx, args.tick),
      pure(tx, args.idx, `u64`),
    ],
  })
}

export interface GetFeeInRangeArgs {
  poolCurrentTickIndex: TransactionObjectInput
  feeGrowthGlobalA: bigint | TransactionArgument
  feeGrowthGlobalB: bigint | TransactionArgument
  opTickLower: TransactionObjectInput | null
  opTickUpper: TransactionObjectInput | null
}

/**
 * Get the fee inside in tick range.
 * * `pool_current_tick_index` - The current tick index
 * * `fee_growth_global_a` - The fee growth global of token A
 * * `fee_growth_global_b` - The fee growth global of token B
 * * `op_tick_lower` - The lower tick
 * * `op_tick_upper` - The upper tick
 * * Returns the fee growth inside
 */
export function getFeeInRange(
  tx: Transaction,
  args: GetFeeInRangeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::get_fee_in_range`,
    arguments: [
      obj(tx, args.poolCurrentTickIndex),
      pure(tx, args.feeGrowthGlobalA, `u128`),
      pure(tx, args.feeGrowthGlobalB, `u128`),
      option(tx, `${Tick.$typeName}`, args.opTickLower),
      option(tx, `${Tick.$typeName}`, args.opTickUpper),
    ],
  })
}

export interface GetRewardsInRangeArgs {
  poolCurrentTickIndex: TransactionObjectInput
  rewardsGrowthGlobals: Array<bigint | TransactionArgument> | TransactionArgument
  opTickLower: TransactionObjectInput | null
  opTickUpper: TransactionObjectInput | null
}

/**
 * Get the rewards inside in tick range.
 * * `pool_current_tick_index` - The current tick index
 * * `rewards_growth_globals` - The rewards growth globals
 * * `op_tick_lower` - The lower tick
 * * `op_tick_upper` - The upper tick
 * * Returns the rewards inside
 */
export function getRewardsInRange(
  tx: Transaction,
  args: GetRewardsInRangeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::get_rewards_in_range`,
    arguments: [
      obj(tx, args.poolCurrentTickIndex),
      pure(tx, args.rewardsGrowthGlobals, `vector<u128>`),
      option(tx, `${Tick.$typeName}`, args.opTickLower),
      option(tx, `${Tick.$typeName}`, args.opTickUpper),
    ],
  })
}

export interface GetPointsInRangeArgs {
  poolCurrentTickIndex: TransactionObjectInput
  pointsGrowthGlobal: bigint | TransactionArgument
  opTickLower: TransactionObjectInput | null
  opTickUpper: TransactionObjectInput | null
}

/**
 * Get the points inside in tick range.
 * * `pool_current_tick_index` - The current tick index
 * * `points_growth_global` - The points growth global
 * * `op_tick_lower` - The lower tick
 * * `op_tick_upper` - The upper tick
 * * Returns the points inside
 */
export function getPointsInRange(
  tx: Transaction,
  args: GetPointsInRangeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::get_points_in_range`,
    arguments: [
      obj(tx, args.poolCurrentTickIndex),
      pure(tx, args.pointsGrowthGlobal, `u128`),
      option(tx, `${Tick.$typeName}`, args.opTickLower),
      option(tx, `${Tick.$typeName}`, args.opTickUpper),
    ],
  })
}

export interface CrossBySwapArgs {
  manager: TransactionObjectInput
  tickIdx: TransactionObjectInput
  a2B: boolean | TransactionArgument
  poolCurrentLiquidity: bigint | TransactionArgument
  feeGrowthGlobalA: bigint | TransactionArgument
  feeGrowthGlobalB: bigint | TransactionArgument
  pointsGrowthGlobal: bigint | TransactionArgument
  rewardGrowthGlobals: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * When the swap cross the tick, the current liquidity of the pool will change.
 * Also the Tick infos will reverse.
 * * `manager` - The TickManager
 * * `tick_idx` - The tick index
 * * `a2b` - If the swap is a2b or b2a
 * * `pool_current_liquidity` - The current liquidity of the pool
 * * `fee_growth_global_a` - The fee growth global of token A
 * * `fee_growth_global_b` - The fee growth global of token B
 * * `points_growth_global` - The points growth global
 * * `reward_growth_globals` - The rewards growth globals
 * * Returns the after pool liquidity
 */
export function crossBySwap(
  tx: Transaction,
  args: CrossBySwapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::cross_by_swap`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.tickIdx),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.poolCurrentLiquidity, `u128`),
      pure(tx, args.feeGrowthGlobalA, `u128`),
      pure(tx, args.feeGrowthGlobalB, `u128`),
      pure(tx, args.pointsGrowthGlobal, `u128`),
      pure(tx, args.rewardGrowthGlobals, `vector<u128>`),
    ],
  })
}

export interface FetchTicksArgs {
  manager: TransactionObjectInput
  start: Array<number | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

/**
 * Fetch Ticks
 * * `manager` - The TickManager
 * * `start` - The start tick index
 * * `limit` - The max number of ticks to fetch
 * * Returns the ticks
 */
export function fetchTicks(
  tx: Transaction,
  args: FetchTicksArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::fetch_ticks`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.start, `vector<u32>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

/**
 * Get the number of ticks in the TickManager.
 * * `manager` - The TickManager
 * * Returns the number of ticks
 */
export function tickCount(
  tx: Transaction,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::tick_count`,
    arguments: [obj(tx, manager)],
  })
}

export interface UpdateByLiquidityArgs {
  tick: TransactionObjectInput
  poolCurrentTickIndex: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  firstInit: boolean | TransactionArgument
  isIncrease: boolean | TransactionArgument
  isUpperTick: boolean | TransactionArgument
  feeGrowthGlobalA: bigint | TransactionArgument
  feeGrowthGlobalB: bigint | TransactionArgument
  pointsGrowthGlobal: bigint | TransactionArgument
  rewardGrowthGlobals: Array<bigint | TransactionArgument> | TransactionArgument
}

/**
 * Update Tick Infos
 * * `tick` - The tick info
 * * `pool_current_tick_index` - The current tick index of pool
 * * `delta_liquidity` - The liquidity changes(add or remove)
 * * `first_init` - If the Tick not inited before, set to true
 * * `is_increase` - If the liquidity is increase or decrease.
 * * `is_upper_tick` - If the tick is upper tick or lower tick.
 * * `fee_growth_global_a` - The fee growth global of token A
 * * `fee_growth_global_b` - The fee growth global of token B
 * * `points_growth_global` - The points growth global
 * * `reward_growth_globals` - The rewards growth globals
 * * Returns the liquidity gross
 */
export function updateByLiquidity(
  tx: Transaction,
  args: UpdateByLiquidityArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::update_by_liquidity`,
    arguments: [
      obj(tx, args.tick),
      obj(tx, args.poolCurrentTickIndex),
      pure(tx, args.deltaLiquidity, `u128`),
      pure(tx, args.firstInit, `bool`),
      pure(tx, args.isIncrease, `bool`),
      pure(tx, args.isUpperTick, `bool`),
      pure(tx, args.feeGrowthGlobalA, `u128`),
      pure(tx, args.feeGrowthGlobalB, `u128`),
      pure(tx, args.pointsGrowthGlobal, `u128`),
      pure(tx, args.rewardGrowthGlobals, `vector<u128>`),
    ],
  })
}

/**
 * Init a default Tick.
 * * `tick_idx` - The tick index
 * * Returns the default tick
 */
export function default_(
  tx: Transaction,
  tickIdx: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::default`,
    arguments: [obj(tx, tickIdx)],
  })
}

/**
 * generate default reward_growth_outsides by reward_count.
 * the default reward_growth_outside is 0.
 * * `reward_count` - The number of rewards
 * * Returns the default rewards growth outside
 */
export function defaultRewardsGrowthOutside(
  tx: Transaction,
  rewardCount: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::default_rewards_growth_outside`,
    arguments: [pure(tx, rewardCount, `u64`)],
  })
}

/**
 * For store Ticks in LinkedTable, convert the tick index of I32 to u64
 * Convert tick range[-443636, 443636] to [0, 443636*2].
 * * `tick` - The tick index
 * * Returns the tick score
 */
export function tickScore(
  tx: Transaction,
  tick: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::tick::tick_score`,
    arguments: [obj(tx, tick)],
  })
}
