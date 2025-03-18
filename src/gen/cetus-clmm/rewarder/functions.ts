import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function balanceOf(tx: Transaction, typeArg: string, vault: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::balance_of`,
    typeArguments: [typeArg],
    arguments: [obj(tx, vault)],
  })
}

export function balances(tx: Transaction, vault: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::rewarder::balances`, arguments: [obj(tx, vault)] })
}

export function borrowRewarder(tx: Transaction, typeArg: string, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::borrow_rewarder`,
    typeArguments: [typeArg],
    arguments: [obj(tx, manager)],
  })
}

export interface DepositRewardArgs {
  config: TransactionObjectInput
  vault: TransactionObjectInput
  balance: TransactionObjectInput
}

export function depositReward(tx: Transaction, typeArg: string, args: DepositRewardArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::deposit_reward`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.vault), obj(tx, args.balance)],
  })
}

export interface EmergentWithdrawArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  vault: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function emergentWithdraw(tx: Transaction, typeArg: string, args: EmergentWithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::emergent_withdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      obj(tx, args.vault),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export function emissionsPerSecond(tx: Transaction, rewarder: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::emissions_per_second`,
    arguments: [obj(tx, rewarder)],
  })
}

export function growthGlobal(tx: Transaction, rewarder: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::growth_global`,
    arguments: [obj(tx, rewarder)],
  })
}

export function init(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::rewarder::init`, arguments: [] })
}

export function lastUpdateTime(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::last_update_time`,
    arguments: [obj(tx, manager)],
  })
}

export function new_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::rewarder::new`, arguments: [] })
}

export function pointsGrowthGlobal(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::points_growth_global`,
    arguments: [obj(tx, manager)],
  })
}

export function pointsReleased(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::points_released`,
    arguments: [obj(tx, manager)],
  })
}

export function rewardCoin(tx: Transaction, rewarder: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::reward_coin`,
    arguments: [obj(tx, rewarder)],
  })
}

export function rewarderIndex(tx: Transaction, typeArg: string, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::rewarder_index`,
    typeArguments: [typeArg],
    arguments: [obj(tx, manager)],
  })
}

export function rewarders(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::rewarders`,
    arguments: [obj(tx, manager)],
  })
}

export function rewardsGrowthGlobal(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder::rewards_growth_global`,
    arguments: [obj(tx, manager)],
  })
}
