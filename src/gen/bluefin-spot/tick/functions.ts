import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'

/** Initializes the tick manager */
export function initializeManager(
  tx: Transaction,
  tickSpacing: number | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::initialize_manager`,
    arguments: [pure(tx, tickSpacing, `u32`)],
  })
}

export interface UpdateArgs {
  manager: TransactionObjectInput
  id: string | TransactionArgument
  index: TransactionObjectInput
  currentTick: TransactionObjectInput
  liquidityDelta: TransactionObjectInput
  feeGrowthGlobalCoinA: bigint | TransactionArgument
  feeGrowthGlobalCoinB: bigint | TransactionArgument
  rewardGrowthsGlobal: Array<bigint | TransactionArgument> | TransactionArgument
  tickCumulative: TransactionObjectInput
  secondsPerLiquidityCumulative: bigint | TransactionArgument
  secondsOutside: bigint | TransactionArgument
  upper: boolean | TransactionArgument
}

export function update(tx: Transaction, args: UpdateArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::update`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.id, `${ID.$typeName}`),
      obj(tx, args.index),
      obj(tx, args.currentTick),
      obj(tx, args.liquidityDelta),
      pure(tx, args.feeGrowthGlobalCoinA, `u128`),
      pure(tx, args.feeGrowthGlobalCoinB, `u128`),
      pure(tx, args.rewardGrowthsGlobal, `vector<u128>`),
      obj(tx, args.tickCumulative),
      pure(tx, args.secondsPerLiquidityCumulative, `u256`),
      pure(tx, args.secondsOutside, `u64`),
      pure(tx, args.upper, `bool`),
    ],
  })
}

export interface CrossArgs {
  manager: TransactionObjectInput
  index: TransactionObjectInput
  feeGrowthGlobalCoinA: bigint | TransactionArgument
  feeGrowthGlobalCoinB: bigint | TransactionArgument
  rewardGrowthsGlobal: Array<bigint | TransactionArgument> | TransactionArgument
  tickCumulative: TransactionObjectInput
  secondsPerLiquidityCumulative: bigint | TransactionArgument
  currentTime: bigint | TransactionArgument
}

export function cross(tx: Transaction, args: CrossArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::cross`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.index),
      pure(tx, args.feeGrowthGlobalCoinA, `u128`),
      pure(tx, args.feeGrowthGlobalCoinB, `u128`),
      pure(tx, args.rewardGrowthsGlobal, `vector<u128>`),
      obj(tx, args.tickCumulative),
      pure(tx, args.secondsPerLiquidityCumulative, `u256`),
      pure(tx, args.currentTime, `u64`),
    ],
  })
}

export interface GetMutableTickFromTableArgs {
  ticks: TransactionObjectInput
  index: TransactionObjectInput
}

export function getMutableTickFromTable(
  tx: Transaction,
  args: GetMutableTickFromTableArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::get_mutable_tick_from_table`,
    arguments: [
      obj(tx, args.ticks),
      obj(tx, args.index),
    ],
  })
}

export interface GetMutableTickFromManagerArgs {
  manager: TransactionObjectInput
  index: TransactionObjectInput
}

export function getMutableTickFromManager(
  tx: Transaction,
  args: GetMutableTickFromManagerArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::get_mutable_tick_from_manager`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.index),
    ],
  })
}

export interface GetTickFromTableArgs {
  ticks: TransactionObjectInput
  index: TransactionObjectInput
}

export function getTickFromTable(tx: Transaction, args: GetTickFromTableArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::get_tick_from_table`,
    arguments: [
      obj(tx, args.ticks),
      obj(tx, args.index),
    ],
  })
}

export interface GetTickFromManagerArgs {
  manager: TransactionObjectInput
  index: TransactionObjectInput
}

export function getTickFromManager(
  tx: Transaction,
  args: GetTickFromManagerArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::get_tick_from_manager`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.index),
    ],
  })
}

export function sqrtPrice(tx: Transaction, tick: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::sqrt_price`,
    arguments: [obj(tx, tick)],
  })
}

export function createTick(tx: Transaction, index: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::create_tick`,
    arguments: [obj(tx, index)],
  })
}

export function liquidityGross(tx: Transaction, tick: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::liquidity_gross`,
    arguments: [obj(tx, tick)],
  })
}

export function liquidityNet(tx: Transaction, tick: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::liquidity_net`,
    arguments: [obj(tx, tick)],
  })
}

export function tickSpacing(tx: Transaction, manager: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::tick_spacing`,
    arguments: [obj(tx, manager)],
  })
}

export interface GetFeeAndRewardGrowthsInsideArgs {
  manager: TransactionObjectInput
  lowerTickIndex: TransactionObjectInput
  upperTickIndex: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  feeGrowthGlobalCoinA: bigint | TransactionArgument
  feeGrowthGlobalCoinB: bigint | TransactionArgument
  rewardGrowthsGlobal: Array<bigint | TransactionArgument> | TransactionArgument
}

export function getFeeAndRewardGrowthsInside(
  tx: Transaction,
  args: GetFeeAndRewardGrowthsInsideArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::get_fee_and_reward_growths_inside`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.lowerTickIndex),
      obj(tx, args.upperTickIndex),
      obj(tx, args.currentTickIndex),
      pure(tx, args.feeGrowthGlobalCoinA, `u128`),
      pure(tx, args.feeGrowthGlobalCoinB, `u128`),
      pure(tx, args.rewardGrowthsGlobal, `vector<u128>`),
    ],
  })
}

export interface GetFeeAndRewardGrowthsOutsideArgs {
  manager: TransactionObjectInput
  tickIndex: TransactionObjectInput
}

export function getFeeAndRewardGrowthsOutside(
  tx: Transaction,
  args: GetFeeAndRewardGrowthsOutsideArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::get_fee_and_reward_growths_outside`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.tickIndex),
    ],
  })
}

export interface IsTickInitializedArgs {
  manager: TransactionObjectInput
  tickIndex: TransactionObjectInput
}

export function isTickInitialized(tx: Transaction, args: IsTickInitializedArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::is_tick_initialized`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.tickIndex),
    ],
  })
}

export function bitmap(tx: Transaction, manager: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::bitmap`,
    arguments: [obj(tx, manager)],
  })
}

export interface FetchProvidedTicksArgs {
  manager: TransactionObjectInput
  ticks: Array<number | TransactionArgument> | TransactionArgument
}

export function fetchProvidedTicks(
  tx: Transaction,
  args: FetchProvidedTicksArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::fetch_provided_ticks`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.ticks, `vector<u32>`),
    ],
  })
}

export function mutableBitmap(tx: Transaction, manager: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::mutable_bitmap`,
    arguments: [obj(tx, manager)],
  })
}

export interface RemoveArgs {
  manager: TransactionObjectInput
  tick: TransactionObjectInput
}

export function remove(tx: Transaction, args: RemoveArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::remove`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.tick),
    ],
  })
}

export interface ComputeRewardGrowthsArgs {
  rewardGrowthsGlobal: Array<bigint | TransactionArgument> | TransactionArgument
  tickRewardGrowths: Array<bigint | TransactionArgument> | TransactionArgument
}

export function computeRewardGrowths(
  tx: Transaction,
  args: ComputeRewardGrowthsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::tick::compute_reward_growths`,
    arguments: [
      pure(tx, args.rewardGrowthsGlobal, `vector<u128>`),
      pure(tx, args.tickRewardGrowths, `vector<u128>`),
    ],
  })
}
