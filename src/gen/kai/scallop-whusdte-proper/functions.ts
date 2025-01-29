import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Option } from '../../move-stdlib/option/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  scallopPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::new`,
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
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::withdraw`,
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
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::assert_version`,
    arguments: [obj(tx, strategy)],
  })
}

export interface MigrateArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function migrate(tx: Transaction, args: MigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::migrate`,
    arguments: [obj(tx, args.cap), obj(tx, args.strategy)],
  })
}

export interface AssertAdminArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
}

export function assertAdmin(tx: Transaction, args: AssertAdminArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::assert_admin`,
    arguments: [obj(tx, args.cap), obj(tx, args.strategy)],
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
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::join_vault`,
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
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::rebalance`,
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
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::remove_from_vault`,
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
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::skim_base_profits`,
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
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::assert_scallop_market`,
    arguments: [obj(tx, market)],
  })
}

export function assertScallopPool(tx: Transaction, pool: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::assert_scallop_pool`,
    arguments: [obj(tx, pool)],
  })
}

export function assertScallopRewardsPool(tx: Transaction, pool: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::assert_scallop_rewards_pool`,
    arguments: [obj(tx, pool)],
  })
}

export interface DepositSoldProfitsArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
  vault: TransactionObjectInput
  profit: TransactionObjectInput
  clock: TransactionObjectInput
}

export function depositSoldProfits(tx: Transaction, args: DepositSoldProfitsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::deposit_sold_profits`,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.strategy),
      obj(tx, args.vault),
      obj(tx, args.profit),
      obj(tx, args.clock),
    ],
  })
}

export interface TakeProfitsForSellingArgs {
  cap: TransactionObjectInput
  strategy: TransactionObjectInput
  amount: bigint | TransactionArgument | TransactionArgument | null
  scallopPool: TransactionObjectInput
  scallopRewardsPool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function takeProfitsForSelling(tx: Transaction, args: TakeProfitsForSellingArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::scallop_whusdte_proper::take_profits_for_selling`,
    arguments: [
      obj(tx, args.cap),
      obj(tx, args.strategy),
      pure(tx, args.amount, `${Option.$typeName}<u64>`),
      obj(tx, args.scallopPool),
      obj(tx, args.scallopRewardsPool),
      obj(tx, args.clock),
    ],
  })
}
