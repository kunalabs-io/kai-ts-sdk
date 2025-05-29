import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface InitializePoolRewardArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  startTime: bigint | TransactionArgument
  activeForSeconds: bigint | TransactionArgument
  rewardCoin: TransactionObjectInput
  rewardCoinSymbol: string | TransactionArgument
  rewardCoinDecimals: number | TransactionArgument
  rewardAmount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function initializePoolReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: InitializePoolRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::initialize_pool_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.startTime, `u64`),
      pure(tx, args.activeForSeconds, `u64`),
      obj(tx, args.rewardCoin),
      pure(tx, args.rewardCoinSymbol, `${String.$typeName}`),
      pure(tx, args.rewardCoinDecimals, `u8`),
      pure(tx, args.rewardAmount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface UpdatePoolRewardEmissionArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  activeForSeconds: bigint | TransactionArgument
  rewardCoin: TransactionObjectInput
  rewardAmount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function updatePoolRewardEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: UpdatePoolRewardEmissionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::update_pool_reward_emission`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.activeForSeconds, `u64`),
      obj(tx, args.rewardCoin),
      pure(tx, args.rewardAmount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddSecondsToRewardEmissionArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  secondsToAdd: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function addSecondsToRewardEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddSecondsToRewardEmissionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::add_seconds_to_reward_emission`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.secondsToAdd, `u64`),
      obj(tx, args.clock),
    ],
  })
}
