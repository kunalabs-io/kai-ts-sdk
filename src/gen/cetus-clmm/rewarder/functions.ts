import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/**
 * init the `RewarderGlobalVault
 * * `ctx` - The transaction context
 */
export function init(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::init`,
    arguments: [],
  })
}

/**
 * initialize the `RewarderManager`.
 * * Returns the new `RewarderManager`
 */
export function new_(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::new`,
    arguments: [],
  })
}

/**
 * get the rewarders
 * * `manager` - The `RewarderManager`
 * * Returns the rewarders
 */
export function rewarders(
  tx: Transaction,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::rewarders`,
    arguments: [obj(tx, manager)],
  })
}

/**
 * get the reward_growth_globals
 * * `manager` - The `RewarderManager`
 * * Returns the reward growth globals
 */
export function rewardsGrowthGlobal(
  tx: Transaction,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::rewards_growth_global`,
    arguments: [obj(tx, manager)],
  })
}

/**
 * get the points_released
 * * `manager` - The `RewarderManager`
 * * Returns the points released
 */
export function pointsReleased(
  tx: Transaction,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::points_released`,
    arguments: [obj(tx, manager)],
  })
}

/**
 * get the points_growth_global
 * * `manager` - The `RewarderManager`
 * * Returns the points growth global
 */
export function pointsGrowthGlobal(
  tx: Transaction,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::points_growth_global`,
    arguments: [obj(tx, manager)],
  })
}

/**
 * get the last_updated_time
 * * `manager` - The `RewarderManager`
 * * Returns the last updated time
 */
export function lastUpdateTime(
  tx: Transaction,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::last_update_time`,
    arguments: [obj(tx, manager)],
  })
}

/**
 * get the rewarder coin Type.
 * * `rewarder` - The `Rewarder`
 * * Returns the rewarder coin type
 */
export function rewardCoin(
  tx: Transaction,
  rewarder: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::reward_coin`,
    arguments: [obj(tx, rewarder)],
  })
}

/**
 * get the rewarder emissions_per_second.
 * * `rewarder` - The `Rewarder`
 * * Returns the rewarder emissions per second
 */
export function emissionsPerSecond(
  tx: Transaction,
  rewarder: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::emissions_per_second`,
    arguments: [obj(tx, rewarder)],
  })
}

/**
 * get the rewarder growth_global.
 * * `rewarder` - The `Rewarder`
 * * Returns the rewarder growth global
 */
export function growthGlobal(
  tx: Transaction,
  rewarder: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::growth_global`,
    arguments: [obj(tx, rewarder)],
  })
}

/**
 * Get index of CoinType in `RewarderManager`, if not exists, return `None`
 * * `manager` - The `RewarderManager`
 * * Returns the index of the rewarder
 */
export function rewarderIndex(
  tx: Transaction,
  typeArg: string,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::rewarder_index`,
    typeArguments: [typeArg],
    arguments: [obj(tx, manager)],
  })
}

/**
 * Borrow `Rewarder` from `RewarderManager`
 * * `manager` - The `RewarderManager`
 * * Returns the rewarder
 */
export function borrowRewarder(
  tx: Transaction,
  typeArg: string,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::borrow_rewarder`,
    typeArguments: [typeArg],
    arguments: [obj(tx, manager)],
  })
}

/**
 * Borrow mutable `Rewarder` from `RewarderManager
 * * `manager` - The `RewarderManager`
 * * Returns the mutable rewarder
 */
export function borrowMutRewarder(
  tx: Transaction,
  typeArg: string,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::borrow_mut_rewarder`,
    typeArguments: [typeArg],
    arguments: [obj(tx, manager)],
  })
}

/**
 * Add rewarder into `RewarderManager`
 * Only support at most REWARDER_NUM rewarders.
 * * `manager` - The `RewarderManager`
 */
export function addRewarder(
  tx: Transaction,
  typeArg: string,
  manager: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::add_rewarder`,
    typeArguments: [typeArg],
    arguments: [obj(tx, manager)],
  })
}

export interface SettleArgs {
  manager: TransactionObjectInput
  liquidity: bigint | TransactionArgument
  timestamp: bigint | TransactionArgument
}

/**
 * Settle the reward.
 * Update the last_updated_time, the growth_global of each rewarder and points_growth_global.
 * Settlement is needed when swap, modify position liquidity, update emission speed.
 * * `manager` - The `RewarderManager`
 * * `liquidity` - The liquidity of the pool
 * * `timestamp` - The timestamp
 */
export function settle(
  tx: Transaction,
  args: SettleArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::settle`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.timestamp, `u64`),
    ],
  })
}

export interface UpdateEmissionArgs {
  vault: TransactionObjectInput
  manager: TransactionObjectInput
  liquidity: bigint | TransactionArgument
  emissionsPerSecond: bigint | TransactionArgument
  timestamp: bigint | TransactionArgument
}

/**
 * Update the reward emission speed.
 * The reward balance at least enough for one day should in `RewarderGlobalVault` when the emission speed is not zero.
 * The reward settlement is needed when update the emission speed.
 * emissions_per_second is Q64.X64
 * Params
 * - `vault`: `RewarderGlobalVault`
 * - `manager`: `RewarderManager`
 * - `liquidity`: The current pool liquidity.
 * - `emissions_per_second`: The emission speed
 * - `timestamp`: The timestamp
 */
export function updateEmission(
  tx: Transaction,
  typeArg: string,
  args: UpdateEmissionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::update_emission`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.vault),
      obj(tx, args.manager),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.emissionsPerSecond, `u128`),
      pure(tx, args.timestamp, `u64`),
    ],
  })
}

export interface WithdrawRewardArgs {
  vault: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Withdraw Reward from `RewarderGlobalVault`
 * This method is used for claim reward in pool and emergent_withdraw.
 * * `vault` - The `RewarderGlobalVault`
 * * `amount` - The amount of reward coin to withdraw
 * * Returns the balance of the reward coin
 */
export function withdrawReward(
  tx: Transaction,
  typeArg: string,
  args: WithdrawRewardArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::withdraw_reward`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.vault),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface DepositRewardArgs {
  config: TransactionObjectInput
  vault: TransactionObjectInput
  balance: TransactionObjectInput
}

/**
 * Deposit Reward into `RewarderGlobalVault`
 * * `config` - The global config
 * * `vault` - The `RewarderGlobalVault`
 * * `balance` - The balance of the reward coin
 * * Returns the amount of reward coin deposited
 */
export function depositReward(
  tx: Transaction,
  typeArg: string,
  args: DepositRewardArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::deposit_reward`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.vault),
      obj(tx, args.balance),
    ],
  })
}

export interface EmergentWithdrawArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  vault: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Withdraw reward Balance of CoinType from vault by the protocol `AdminCap`.
 * This function is only used for emergency.
 * * `config` - The global config
 * * `vault` - The `RewarderGlobalVault`
 * * `amount` - The amount of reward coin to withdraw
 * * Returns the balance of the reward coin
 */
export function emergentWithdraw(
  tx: Transaction,
  typeArg: string,
  args: EmergentWithdrawArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::emergent_withdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      obj(tx, args.vault),
      pure(tx, args.amount, `u64`),
    ],
  })
}

/**
 * Get the balances in vault.
 * * `vault` - The `RewarderGlobalVault`
 * * Returns the balances
 */
export function balances(
  tx: Transaction,
  vault: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::balances`,
    arguments: [obj(tx, vault)],
  })
}

/**
 * Get the balance value of CoinType in vault.
 * * `vault` - The `RewarderGlobalVault`
 * * Returns the balance value of the reward coin
 */
export function balanceOf(
  tx: Transaction,
  typeArg: string,
  vault: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::rewarder::balance_of`,
    typeArguments: [typeArg],
    arguments: [obj(tx, vault)],
  })
}
