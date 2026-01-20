import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Create new `FeeCollector` with specified amount to collect. */
export function new_(tx: Transaction, feeAmount: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::fee_collector::new`,
    arguments: [pure(tx, feeAmount, `u64`)],
  })
}

/** Retrieve configured amount to collect. */
export function feeAmount(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::fee_collector::fee_amount`,
    arguments: [obj(tx, self)],
  })
}

/** Retrieve current SUI balance. */
export function balanceValue(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::fee_collector::balance_value`,
    arguments: [obj(tx, self)],
  })
}

export interface DepositBalanceArgs {
  self: TransactionObjectInput
  fee: TransactionObjectInput
}

/** Take `Balance<SUI>` and add it to current collected balance. */
export function depositBalance(tx: Transaction, args: DepositBalanceArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::fee_collector::deposit_balance`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.fee),
    ],
  })
}

export interface DepositArgs {
  self: TransactionObjectInput
  fee: TransactionObjectInput
}

/** Take `Coin<SUI>` and add it to current collected balance. */
export function deposit(tx: Transaction, args: DepositArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::fee_collector::deposit`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.fee),
    ],
  })
}

export interface WithdrawBalanceArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Create `Balance<SUI>` of some `amount` by taking from collected balance. */
export function withdrawBalance(tx: Transaction, args: WithdrawBalanceArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::fee_collector::withdraw_balance`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface WithdrawArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Create `Coin<SUI>` of some `amount` by taking from collected balance. */
export function withdraw(tx: Transaction, args: WithdrawArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::fee_collector::withdraw`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface ChangeFeeArgs {
  self: TransactionObjectInput
  newAmount: bigint | TransactionArgument
}

/** Re-configure current `fee_amount`. */
export function changeFee(tx: Transaction, args: ChangeFeeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::fee_collector::change_fee`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.newAmount, `u64`),
    ],
  })
}
