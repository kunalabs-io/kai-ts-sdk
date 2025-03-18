import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

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

export function description(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::description`,
    arguments: [obj(tx, positionNft)],
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

export function index(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::index`,
    arguments: [obj(tx, positionNft)],
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

export function infoLiquidity(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_liquidity`,
    arguments: [obj(tx, info)],
  })
}

export function infoPointsGrowthInside(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_points_growth_inside`,
    arguments: [obj(tx, info)],
  })
}

export function infoPointsOwned(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_points_owned`,
    arguments: [obj(tx, info)],
  })
}

export function infoPositionId(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_position_id`,
    arguments: [obj(tx, info)],
  })
}

export function infoRewards(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_rewards`,
    arguments: [obj(tx, info)],
  })
}

export function infoTickRange(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::info_tick_range`,
    arguments: [obj(tx, info)],
  })
}

export function init(tx: Transaction, otw: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::position::init`, arguments: [obj(tx, otw)] })
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

export function isEmpty(tx: Transaction, positionInfo: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::is_empty`,
    arguments: [obj(tx, positionInfo)],
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

export function liquidity(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::liquidity`,
    arguments: [obj(tx, positionNft)],
  })
}

export function name(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::name`,
    arguments: [obj(tx, positionNft)],
  })
}

export function new_(tx: Transaction, tickSpacing: number | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::new`,
    arguments: [pure(tx, tickSpacing, `u32`)],
  })
}

export function poolId(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::pool_id`,
    arguments: [obj(tx, positionNft)],
  })
}

export function rewardAmountOwned(tx: Transaction, reward: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::reward_amount_owned`,
    arguments: [obj(tx, reward)],
  })
}

export function rewardGrowthInside(tx: Transaction, reward: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::reward_growth_inside`,
    arguments: [obj(tx, reward)],
  })
}

export interface RewardsAmountOwnedArgs {
  manager: TransactionObjectInput
  postionId: string | TransactionArgument
}

export function rewardsAmountOwned(tx: Transaction, args: RewardsAmountOwnedArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::rewards_amount_owned`,
    arguments: [obj(tx, args.manager), pure(tx, args.postionId, `${ID.$typeName}`)],
  })
}

export interface SetDisplayArgs {
  config: TransactionObjectInput
  publisher: TransactionObjectInput
  description: string | TransactionArgument
  link: string | TransactionArgument
  website: string | TransactionArgument
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
      pure(tx, args.website, `${String.$typeName}`),
      pure(tx, args.creator, `${String.$typeName}`),
    ],
  })
}

export function tickRange(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::tick_range`,
    arguments: [obj(tx, positionNft)],
  })
}

export function url(tx: Transaction, positionNft: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::url`,
    arguments: [obj(tx, positionNft)],
  })
}
