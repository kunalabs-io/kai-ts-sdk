import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(
  tx: Transaction,
  typeArgs: [string, string],
  supplyPool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::new`,
    typeArguments: typeArgs,
    arguments: [obj(tx, supplyPool)],
  })
}

export function assertVersion(
  tx: Transaction,
  typeArgs: [string, string],
  strategy: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::assert_version`,
    typeArguments: typeArgs,
    arguments: [obj(tx, strategy)],
  })
}

export function adminCapId(
  tx: Transaction,
  typeArgs: [string, string],
  strategy: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::admin_cap_id`,
    typeArguments: typeArgs,
    arguments: [obj(tx, strategy)],
  })
}

export interface AssertAdminArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function assertAdmin(tx: Transaction, typeArgs: [string, string], args: AssertAdminArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::assert_admin`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.strategy)],
  })
}

export interface JoinVaultArgs {
  strategy: TransactionObjectInput
  strategyCap: TransactionObjectInput
  vault: TransactionObjectInput
  vaultCap: TransactionObjectInput
}

export function joinVault(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: JoinVaultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::join_vault`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.strategy),
      obj(tx, args.strategyCap),
      obj(tx, args.vault),
      obj(tx, args.vaultCap),
    ],
  })
}

export interface RemoveFromVaultArgs {
  strategy: TransactionObjectInput
  cap: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function removeFromVault(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RemoveFromVaultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::remove_from_vault`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.strategy),
      obj(tx, args.cap),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface MigrateArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function migrate(tx: Transaction, typeArgs: [string, string], args: MigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::migrate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.cap), obj(tx, args.strategy)],
  })
}

export interface RebalanceArgs {
  strategy: TransactionObjectInput
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  amounts: TransactionObjectInput
  supplyPool: TransactionObjectInput
  policy: TransactionObjectInput
  ruleId: string | TransactionArgument
  clock: TransactionObjectInput
}

export function rebalance(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RebalanceArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::rebalance`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.strategy),
      obj(tx, args.cap),
      obj(tx, args.vault),
      obj(tx, args.amounts),
      obj(tx, args.supplyPool),
      obj(tx, args.policy),
      pure(tx, args.ruleId, `address`),
      obj(tx, args.clock),
    ],
  })
}

export interface SkimBaseProfitsArgs {
  strategy: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function skimBaseProfits(
  tx: Transaction,
  typeArgs: [string, string],
  args: SkimBaseProfitsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::skim_base_profits`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.strategy), obj(tx, args.supplyPool), obj(tx, args.clock)],
  })
}

export interface InjectIncentivesArgs {
  strategy: TransactionObjectInput
  balance: TransactionObjectInput
}

export function injectIncentives(
  tx: Transaction,
  typeArgs: [string, string],
  args: InjectIncentivesArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::inject_incentives`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.strategy), obj(tx, args.balance)],
  })
}

export interface CollectAndHandOverProfitArgs {
  strategy: TransactionObjectInput
  cap: TransactionObjectInput
  vault: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function collectAndHandOverProfit(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CollectAndHandOverProfitArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::collect_and_hand_over_profit`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.strategy),
      obj(tx, args.cap),
      obj(tx, args.vault),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface WithdrawArgs {
  strategy: TransactionObjectInput
  ticket: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function withdraw(tx: Transaction, typeArgs: [string, string, string], args: WithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::kai_leverage_supply_pool::withdraw`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.strategy),
      obj(tx, args.ticket),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}
