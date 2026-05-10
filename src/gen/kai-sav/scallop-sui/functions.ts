import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function assertScallopPool(
  tx: Transaction,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::assert_scallop_pool`,
    arguments: [obj(tx, pool)],
  })
}

export interface NewArgs {
  scallopPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function new_(
  tx: Transaction,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::new`,
    arguments: [
      obj(tx, args.scallopPool),
      obj(tx, args.clock),
    ],
  })
}

export function assertVersion(
  tx: Transaction,
  strategy: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::assert_version`,
    arguments: [obj(tx, strategy)],
  })
}

export interface AssertAdminArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function assertAdmin(
  tx: Transaction,
  args: AssertAdminArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::assert_admin`,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.strategy),
    ],
  })
}

export interface JoinVaultArgs {
  vaultCap: TransactionObjectInput
  vault: TransactionObjectInput
  strategyCap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function joinVault(
  tx: Transaction,
  args: JoinVaultArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::join_vault`,
    arguments: [
      obj(tx, args.vaultCap),
      obj(tx, args.vault),
      obj(tx, args.strategyCap),
      obj(tx, args.strategy),
    ],
  })
}

export function assertScallopMarket(
  tx: Transaction,
  market: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::assert_scallop_market`,
    arguments: [obj(tx, market)],
  })
}

export function assertScallopRewardsPool(
  tx: Transaction,
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::assert_scallop_rewards_pool`,
    arguments: [obj(tx, pool)],
  })
}

export interface RemoveFromVaultArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
  scallopVersion: TransactionObjectInput
  scallopMarket: TransactionObjectInput
  scallopPool: TransactionObjectInput
  scallopRewardsPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function removeFromVault(
  tx: Transaction,
  args: RemoveFromVaultArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::remove_from_vault`,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.strategy),
      obj(tx, args.scallopVersion),
      obj(tx, args.scallopMarket),
      obj(tx, args.scallopPool),
      obj(tx, args.scallopRewardsPool),
      obj(tx, args.clock),
    ],
  })
}

export interface MigrateArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function migrate(
  tx: Transaction,
  args: MigrateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::migrate`,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.strategy),
    ],
  })
}

export interface RebalanceArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
  vault: TransactionObjectInput
  amounts: TransactionObjectInput
  scallopVersion: TransactionObjectInput
  scallopMarket: TransactionObjectInput
  scallopPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalance(
  tx: Transaction,
  args: RebalanceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::rebalance`,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.strategy),
      obj(tx, args.vault),
      obj(tx, args.amounts),
      obj(tx, args.scallopVersion),
      obj(tx, args.scallopMarket),
      obj(tx, args.scallopPool),
      obj(tx, args.clock),
    ],
  })
}

export interface CollectAndHandOverProfitArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
  vault: TransactionObjectInput
  scallopPool: TransactionObjectInput
  scallopRewardsPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Collect the profits and hand them over to the vault. */
export function collectAndHandOverProfit(
  tx: Transaction,
  args: CollectAndHandOverProfitArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::collect_and_hand_over_profit`,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.strategy),
      obj(tx, args.vault),
      obj(tx, args.scallopPool),
      obj(tx, args.scallopRewardsPool),
      obj(tx, args.clock),
    ],
  })
}

export interface WithdrawArgs {
  strategy: TransactionObjectInput
  ticket: TransactionObjectInput
  scallopVersion: TransactionObjectInput
  scallopMarket: TransactionObjectInput
  scallopPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function withdraw(
  tx: Transaction,
  args: WithdrawArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-sav', options?.env)}::scallop_sui::withdraw`,
    arguments: [
      obj(tx, args.strategy),
      obj(tx, args.ticket),
      obj(tx, args.scallopVersion),
      obj(tx, args.scallopMarket),
      obj(tx, args.scallopPool),
      obj(tx, args.clock),
    ],
  })
}
