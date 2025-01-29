import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  scallopPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::new`,
    arguments: [obj(tx, args.scallopPool), obj(tx, args.clock)],
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

export function withdraw(tx: Transaction, args: WithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::withdraw`,
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

export function assertVersion(tx: Transaction, strategy: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::assert_version`,
    arguments: [obj(tx, strategy)],
  })
}

export interface MigrateArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function migrate(tx: Transaction, args: MigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::migrate`,
    arguments: [obj(tx, args.cap), obj(tx, args.strategy)],
  })
}

export interface AssertAdminArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function assertAdmin(tx: Transaction, args: AssertAdminArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::assert_admin`,
    arguments: [obj(tx, args.cap), obj(tx, args.strategy)],
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

export function collectAndHandOverProfit(tx: Transaction, args: CollectAndHandOverProfitArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::collect_and_hand_over_profit`,
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

export interface JoinVaultArgs {
  vaultCap: TransactionObjectInput
  vault: TransactionObjectInput
  strategyCap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function joinVault(tx: Transaction, args: JoinVaultArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::join_vault`,
    arguments: [
      obj(tx, args.vaultCap),
      obj(tx, args.vault),
      obj(tx, args.strategyCap),
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

export function rebalance(tx: Transaction, args: RebalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::rebalance`,
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

export interface RemoveFromVaultArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
  scallopVersion: TransactionObjectInput
  scallopMarket: TransactionObjectInput
  scallopPool: TransactionObjectInput
  scallopRewardsPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function removeFromVault(tx: Transaction, args: RemoveFromVaultArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::remove_from_vault`,
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

export interface SkimBaseProfitsArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
  scallopVersion: TransactionObjectInput
  scallopMarket: TransactionObjectInput
  scallopPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function skimBaseProfits(tx: Transaction, args: SkimBaseProfitsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::skim_base_profits`,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.strategy),
      obj(tx, args.scallopVersion),
      obj(tx, args.scallopMarket),
      obj(tx, args.scallopPool),
      obj(tx, args.clock),
    ],
  })
}

export function assertScallopMarket(tx: Transaction, market: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::assert_scallop_market`,
    arguments: [obj(tx, market)],
  })
}

export function assertScallopPool(tx: Transaction, pool: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::assert_scallop_pool`,
    arguments: [obj(tx, pool)],
  })
}

export function assertScallopRewardsPool(tx: Transaction, pool: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_sui_proper::assert_scallop_rewards_pool`,
    arguments: [obj(tx, pool)],
  })
}
