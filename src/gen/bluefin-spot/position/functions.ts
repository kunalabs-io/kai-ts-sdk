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
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::init`,
    arguments: [obj(tx, otw)],
  })
}

export function lowerTick(
  tx: Transaction,
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::lower_tick`,
    arguments: [obj(tx, position)],
  })
}

export function upperTick(
  tx: Transaction,
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::upper_tick`,
    arguments: [obj(tx, position)],
  })
}

export function liquidity(
  tx: Transaction,
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::liquidity`,
    arguments: [obj(tx, position)],
  })
}

export function poolId(
  tx: Transaction,
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::pool_id`,
    arguments: [obj(tx, position)],
  })
}

export function getAccruedFee(
  tx: Transaction,
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::get_accrued_fee`,
    arguments: [obj(tx, position)],
  })
}

export interface CoinsOwedRewardArgs {
  position: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function coinsOwedReward(
  tx: Transaction,
  args: CoinsOwedRewardArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::coins_owed_reward`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.index, `u64`),
    ],
  })
}

export function isEmpty(
  tx: Transaction,
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::is_empty`,
    arguments: [obj(tx, position)],
  })
}

export function rewardInfosLength(
  tx: Transaction,
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::reward_infos_length`,
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

export function new_(
  tx: Transaction,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::new`,
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

export function del(
  tx: Transaction,
  position: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::del`,
    arguments: [obj(tx, position)],
  })
}

export interface SetFeeAmountsArgs {
  position: TransactionObjectInput
  feeA: bigint | TransactionArgument
  feeB: bigint | TransactionArgument
}

/** Sets the fees for provided position to the provided amounts */
export function setFeeAmounts(
  tx: Transaction,
  args: SetFeeAmountsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::set_fee_amounts`,
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
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::decrease_reward_amount`,
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

export function update(
  tx: Transaction,
  args: UpdateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::update`,
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
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::add_reward_info`,
    arguments: [obj(tx, position)],
  })
}

export function createPositionName(
  tx: Transaction,
  poolName: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::create_position_name`,
    arguments: [pure(tx, poolName, `${String.$typeName}`)],
  })
}

export function createPositionDescription(
  tx: Transaction,
  poolName: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::position::create_position_description`,
    arguments: [pure(tx, poolName, `${String.$typeName}`)],
  })
}

export interface UpdateRewardInfosArgs {
  position: TransactionObjectInput
  rewardGrowthsInside: Array<bigint | TransactionArgument> | TransactionArgument
}

export function updateRewardInfos(
  tx: Transaction,
  args: UpdateRewardInfosArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::update_reward_infos`,
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
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::position::get_mutable_reward_info`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.index, `u64`),
    ],
  })
}
