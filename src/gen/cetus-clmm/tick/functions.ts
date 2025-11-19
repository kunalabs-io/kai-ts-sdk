import { PUBLISHED_AT } from '..'
import { obj, option, pure } from '../../_framework/util'
import { Tick } from './structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  tickSpacing: number | TransactionArgument
  seed: bigint | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::new`,
    arguments: [pure(tx, args.tickSpacing, `u32`), pure(tx, args.seed, `u64`)],
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

export function increaseLiquidity(tx: Transaction, args: IncreaseLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::increase_liquidity`,
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

export function decreaseLiquidity(tx: Transaction, args: DecreaseLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::decrease_liquidity`,
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

export function firstScoreForSwap(tx: Transaction, args: FirstScoreForSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::first_score_for_swap`,
    arguments: [obj(tx, args.manager), obj(tx, args.currentTickIdx), pure(tx, args.a2B, `bool`)],
  })
}

export interface BorrowTickForSwapArgs {
  manager: TransactionObjectInput
  score: bigint | TransactionArgument
  a2B: boolean | TransactionArgument
}

export function borrowTickForSwap(tx: Transaction, args: BorrowTickForSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::borrow_tick_for_swap`,
    arguments: [obj(tx, args.manager), pure(tx, args.score, `u64`), pure(tx, args.a2B, `bool`)],
  })
}

export interface TryBorrowTickArgs {
  manager: TransactionObjectInput
  tickIdx: TransactionObjectInput
}

export function tryBorrowTick(tx: Transaction, args: TryBorrowTickArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::try_borrow_tick`,
    arguments: [obj(tx, args.manager), obj(tx, args.tickIdx)],
  })
}

export function tickSpacing(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::tick_spacing`,
    arguments: [obj(tx, manager)],
  })
}

export function index(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::index`, arguments: [obj(tx, tick)] })
}

export function sqrtPrice(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::sqrt_price`, arguments: [obj(tx, tick)] })
}

export function liquidityNet(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::liquidity_net`, arguments: [obj(tx, tick)] })
}

export function liquidityGross(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::liquidity_gross`,
    arguments: [obj(tx, tick)],
  })
}

export function feeGrowthOutside(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::fee_growth_outside`,
    arguments: [obj(tx, tick)],
  })
}

export function pointsGrowthOutside(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::points_growth_outside`,
    arguments: [obj(tx, tick)],
  })
}

export function rewardsGrowthOutside(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::rewards_growth_outside`,
    arguments: [obj(tx, tick)],
  })
}

export interface BorrowTickArgs {
  manager: TransactionObjectInput
  idx: TransactionObjectInput
}

export function borrowTick(tx: Transaction, args: BorrowTickArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::borrow_tick`,
    arguments: [obj(tx, args.manager), obj(tx, args.idx)],
  })
}

export interface GetRewardGrowthOutsideArgs {
  tick: TransactionObjectInput
  idx: bigint | TransactionArgument
}

export function getRewardGrowthOutside(tx: Transaction, args: GetRewardGrowthOutsideArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::get_reward_growth_outside`,
    arguments: [obj(tx, args.tick), pure(tx, args.idx, `u64`)],
  })
}

export interface GetFeeInRangeArgs {
  poolCurrentTickIndex: TransactionObjectInput
  feeGrowthGlobalA: bigint | TransactionArgument
  feeGrowthGlobalB: bigint | TransactionArgument
  opTickLower: TransactionObjectInput | TransactionArgument | null
  opTickUpper: TransactionObjectInput | TransactionArgument | null
}

export function getFeeInRange(tx: Transaction, args: GetFeeInRangeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::get_fee_in_range`,
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
  opTickLower: TransactionObjectInput | TransactionArgument | null
  opTickUpper: TransactionObjectInput | TransactionArgument | null
}

export function getRewardsInRange(tx: Transaction, args: GetRewardsInRangeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::get_rewards_in_range`,
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
  opTickLower: TransactionObjectInput | TransactionArgument | null
  opTickUpper: TransactionObjectInput | TransactionArgument | null
}

export function getPointsInRange(tx: Transaction, args: GetPointsInRangeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::get_points_in_range`,
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

export function crossBySwap(tx: Transaction, args: CrossBySwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::cross_by_swap`,
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

export function fetchTicks(tx: Transaction, args: FetchTicksArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::fetch_ticks`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.start, `vector<u32>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

export function tickCount(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::tick_count`, arguments: [obj(tx, manager)] })
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

export function updateByLiquidity(tx: Transaction, args: UpdateByLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::update_by_liquidity`,
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

export function default_(tx: Transaction, tickIdx: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::default`, arguments: [obj(tx, tickIdx)] })
}

export function defaultRewardsGrowthOutside(
  tx: Transaction,
  rewardCount: bigint | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::tick::default_rewards_growth_outside`,
    arguments: [pure(tx, rewardCount, `u64`)],
  })
}

export function tickScore(tx: Transaction, tick: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::tick::tick_score`, arguments: [obj(tx, tick)] })
}
