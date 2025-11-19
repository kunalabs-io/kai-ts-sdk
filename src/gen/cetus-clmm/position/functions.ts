import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function init(tx: Transaction, otw: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::position::init`, arguments: [obj(tx, otw)] })
}

export interface SetDisplayArgs {
  config: TransactionObjectInput
  publisher: TransactionObjectInput
  description: string | TransactionArgument
  link: string | TransactionArgument
  projectUrl: string | TransactionArgument
  creator: string | TransactionArgument
}

export function setDisplay(tx: Transaction, args: SetDisplayArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::set_display`,
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

export function updateDisplayInternal(tx: Transaction, args: UpdateDisplayInternalArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_display_internal`,
    arguments: [
      obj(tx, args.publisher),
      pure(tx, args.description, `${String.$typeName}`),
      pure(tx, args.link, `${String.$typeName}`),
      pure(tx, args.projectUrl, `${String.$typeName}`),
      pure(tx, args.creator, `${String.$typeName}`),
    ],
  })
}

export function new_(tx: Transaction, tickSpacing: number | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::new`,
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

export function openPosition(tx: Transaction, typeArgs: [string, string], args: OpenPositionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::open_position`,
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

export function closePosition(tx: Transaction, args: ClosePositionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::close_position`,
    arguments: [obj(tx, args.manager), obj(tx, args.positionNft)],
  })
}

export interface RemovePositionInfoForRestoreArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function removePositionInfoForRestore(
  tx: Transaction,
  args: RemovePositionInfoForRestoreArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::remove_position_info_for_restore`,
    arguments: [obj(tx, args.manager), pure(tx, args.positionId, `${ID.$typeName}`)],
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

export function increaseLiquidity(tx: Transaction, args: IncreaseLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::increase_liquidity`,
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

export function decreaseLiquidity(tx: Transaction, args: DecreaseLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::decrease_liquidity`,
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

export function applyLiquidityCut(tx: Transaction, args: ApplyLiquidityCutArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::apply_liquidity_cut`,
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

export function updateFee(tx: Transaction, args: UpdateFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_fee`,
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

export function updatePoints(tx: Transaction, args: UpdatePointsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_points`,
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

export function updateRewards(tx: Transaction, args: UpdateRewardsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_rewards`,
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

export function updateAndResetFee(tx: Transaction, args: UpdateAndResetFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_and_reset_fee`,
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

export function updateAndResetRewards(tx: Transaction, args: UpdateAndResetRewardsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_and_reset_rewards`,
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

export function resetFee(tx: Transaction, args: ResetFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::reset_fee`,
    arguments: [obj(tx, args.manager), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface ResetRewarderArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
  rewarderIdx: bigint | TransactionArgument
}

export function resetRewarder(tx: Transaction, args: ResetRewarderArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::reset_rewarder`,
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

export function initedRewardsCount(tx: Transaction, args: InitedRewardsCountArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::inited_rewards_count`,
    arguments: [obj(tx, args.manager), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface FetchPositionsArgs {
  manager: TransactionObjectInput
  start: Array<string | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

export function fetchPositions(tx: Transaction, args: FetchPositionsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::fetch_positions`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.start, `vector<${ID.$typeName}>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

export function poolId(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::pool_id`,
    arguments: [obj(tx, positionNft)],
  })
}

export function tickRange(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::tick_range`,
    arguments: [obj(tx, positionNft)],
  })
}

export function index(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::index`,
    arguments: [obj(tx, positionNft)],
  })
}

export function name(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::name`,
    arguments: [obj(tx, positionNft)],
  })
}

export function description(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::description`,
    arguments: [obj(tx, positionNft)],
  })
}

export function url(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::url`,
    arguments: [obj(tx, positionNft)],
  })
}

export function liquidity(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::liquidity`,
    arguments: [obj(tx, positionNft)],
  })
}

export function infoPositionId(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_position_id`,
    arguments: [obj(tx, info)],
  })
}

export function infoLiquidity(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_liquidity`,
    arguments: [obj(tx, info)],
  })
}

export function infoTickRange(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_tick_range`,
    arguments: [obj(tx, info)],
  })
}

export function infoFeeGrowthInside(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_fee_growth_inside`,
    arguments: [obj(tx, info)],
  })
}

export function infoFeeOwned(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_fee_owned`,
    arguments: [obj(tx, info)],
  })
}

export function infoPointsOwned(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_points_owned`,
    arguments: [obj(tx, info)],
  })
}

export function infoPointsGrowthInside(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_points_growth_inside`,
    arguments: [obj(tx, info)],
  })
}

export function infoRewards(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_rewards`,
    arguments: [obj(tx, info)],
  })
}

export function rewardGrowthInside(tx: Transaction, reward: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::reward_growth_inside`,
    arguments: [obj(tx, reward)],
  })
}

export function rewardAmountOwned(tx: Transaction, reward: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::reward_amount_owned`,
    arguments: [obj(tx, reward)],
  })
}

export interface RewardsAmountOwnedArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function rewardsAmountOwned(tx: Transaction, args: RewardsAmountOwnedArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::rewards_amount_owned`,
    arguments: [obj(tx, args.manager), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface BorrowPositionInfoArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function borrowPositionInfo(tx: Transaction, args: BorrowPositionInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::borrow_position_info`,
    arguments: [obj(tx, args.manager), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export function isEmpty(tx: Transaction, positionInfo: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::is_empty`,
    arguments: [obj(tx, positionInfo)],
  })
}

export interface CheckPositionTickRangeArgs {
  lower: TransactionObjectInput
  upper: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function checkPositionTickRange(tx: Transaction, args: CheckPositionTickRangeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::check_position_tick_range`,
    arguments: [obj(tx, args.lower), obj(tx, args.upper), pure(tx, args.tickSpacing, `u32`)],
  })
}

export interface IsPositionExistArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function isPositionExist(tx: Transaction, args: IsPositionExistArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::is_position_exist`,
    arguments: [obj(tx, args.manager), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface UpdateRewardsInternalArgs {
  positionInfo: TransactionObjectInput
  rewardsGrowthsInside: Array<bigint | TransactionArgument> | TransactionArgument
}

export function updateRewardsInternal(tx: Transaction, args: UpdateRewardsInternalArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_rewards_internal`,
    arguments: [obj(tx, args.positionInfo), pure(tx, args.rewardsGrowthsInside, `vector<u128>`)],
  })
}

export interface UpdateFeeInternalArgs {
  positionInfo: TransactionObjectInput
  feeGrowthInsideA: bigint | TransactionArgument
  feeGrowthInsideB: bigint | TransactionArgument
}

export function updateFeeInternal(tx: Transaction, args: UpdateFeeInternalArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_fee_internal`,
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

export function updatePointsInternal(tx: Transaction, args: UpdatePointsInternalArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::update_points_internal`,
    arguments: [obj(tx, args.positionInfo), pure(tx, args.pointsGrowthInside, `u128`)],
  })
}

export interface NewPositionNameArgs {
  poolIndex: bigint | TransactionArgument
  positionIndex: bigint | TransactionArgument
}

export function newPositionName(tx: Transaction, args: NewPositionNameArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::new_position_name`,
    arguments: [pure(tx, args.poolIndex, `u64`), pure(tx, args.positionIndex, `u64`)],
  })
}

export interface BorrowMutPositionInfoArgs {
  manager: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function borrowMutPositionInfo(tx: Transaction, args: BorrowMutPositionInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::borrow_mut_position_info`,
    arguments: [obj(tx, args.manager), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export function destroy(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::destroy`,
    arguments: [obj(tx, positionNft)],
  })
}
