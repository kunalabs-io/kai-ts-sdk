import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { String } from '../../std/string/structs'
import { ID } from '../../sui/object/structs'

export function init(tx: Transaction, otw: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::init`,
    arguments: [obj(tx, otw)],
  })
}

export function lowerTick(tx: Transaction, position: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::lower_tick`,
    arguments: [obj(tx, position)],
  })
}

export function upperTick(tx: Transaction, position: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::upper_tick`,
    arguments: [obj(tx, position)],
  })
}

export function liquidity(tx: Transaction, position: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::liquidity`,
    arguments: [obj(tx, position)],
  })
}

export function poolId(tx: Transaction, position: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::pool_id`,
    arguments: [obj(tx, position)],
  })
}

export function getAccruedFee(
  tx: Transaction,
  position: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::get_accrued_fee`,
    arguments: [obj(tx, position)],
  })
}

export interface CoinsOwedRewardArgs {
  position: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function coinsOwedReward(tx: Transaction, args: CoinsOwedRewardArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::coins_owed_reward`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.index, `u64`),
    ],
  })
}

export function isEmpty(tx: Transaction, position: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::is_empty`,
    arguments: [obj(tx, position)],
  })
}

export function rewardInfosLength(
  tx: Transaction,
  position: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::reward_infos_length`,
    arguments: [obj(tx, position)],
  })
}

export interface NewArgs {
  poolId: string | TransactionArgument
  poolName: string | TransactionArgument
  imageUrl: string | TransactionArgument
  coinTypeA: string | TransactionArgument
  coinTypeB: string | TransactionArgument
  positionIndex: bigint | TransactionArgument
  lowerTick: TransactionObjectInput
  upperTick: TransactionObjectInput
  feeRate: bigint | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::new`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.poolName, `${String.$typeName}`),
      pure(tx, args.imageUrl, `${String.$typeName}`),
      pure(tx, args.coinTypeA, `${String.$typeName}`),
      pure(tx, args.coinTypeB, `${String.$typeName}`),
      pure(tx, args.positionIndex, `u128`),
      obj(tx, args.lowerTick),
      obj(tx, args.upperTick),
      pure(tx, args.feeRate, `u64`),
    ],
  })
}

export function del(tx: Transaction, position: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::del`,
    arguments: [obj(tx, position)],
  })
}

export interface SetFeeAmountsArgs {
  position: TransactionObjectInput
  feeA: bigint | TransactionArgument
  feeB: bigint | TransactionArgument
}

/** Sets the fees for provided position to the provided amounts */
export function setFeeAmounts(tx: Transaction, args: SetFeeAmountsArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::set_fee_amounts`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.feeA, `u64`),
      pure(tx, args.feeB, `u64`),
    ],
  })
}

export interface DecreaseRewardAmountArgs {
  position: TransactionObjectInput
  index: bigint | TransactionArgument
  rewardAmount: bigint | TransactionArgument
}

export function decreaseRewardAmount(
  tx: Transaction,
  args: DecreaseRewardAmountArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::decrease_reward_amount`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.index, `u64`),
      pure(tx, args.rewardAmount, `u64`),
    ],
  })
}

export interface UpdateArgs {
  position: TransactionObjectInput
  liquidityDelta: TransactionObjectInput
  feeGrowthInsideA: bigint | TransactionArgument
  feeGrowthInsideB: bigint | TransactionArgument
  rewardGrowthsInside: Array<bigint | TransactionArgument> | TransactionArgument
}

export function update(tx: Transaction, args: UpdateArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::update`,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.liquidityDelta),
      pure(tx, args.feeGrowthInsideA, `u128`),
      pure(tx, args.feeGrowthInsideB, `u128`),
      pure(tx, args.rewardGrowthsInside, `vector<u128>`),
    ],
  })
}

export function addRewardInfo(
  tx: Transaction,
  position: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::add_reward_info`,
    arguments: [obj(tx, position)],
  })
}

export function createPositionName(
  tx: Transaction,
  poolName: string | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::create_position_name`,
    arguments: [pure(tx, poolName, `${String.$typeName}`)],
  })
}

export function createPositionDescription(
  tx: Transaction,
  poolName: string | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::create_position_description`,
    arguments: [pure(tx, poolName, `${String.$typeName}`)],
  })
}

export interface UpdateRewardInfosArgs {
  position: TransactionObjectInput
  rewardGrowthsInside: Array<bigint | TransactionArgument> | TransactionArgument
}

export function updateRewardInfos(tx: Transaction, args: UpdateRewardInfosArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::update_reward_infos`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.rewardGrowthsInside, `vector<u128>`),
    ],
  })
}

export interface GetMutableRewardInfoArgs {
  position: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function getMutableRewardInfo(
  tx: Transaction,
  args: GetMutableRewardInfoArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::position::get_mutable_reward_info`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.index, `u64`),
    ],
  })
}
