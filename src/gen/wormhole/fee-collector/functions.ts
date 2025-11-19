import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(tx: Transaction, feeAmount: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::new`,
    arguments: [pure(tx, feeAmount, `u64`)],
  })
}

export function feeAmount(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::fee_amount`,
    arguments: [obj(tx, self)],
  })
}

export function balanceValue(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::balance_value`,
    arguments: [obj(tx, self)],
  })
}

export interface DepositBalanceArgs {
  self: TransactionObjectInput
  fee: TransactionObjectInput
}

export function depositBalance(tx: Transaction, args: DepositBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::deposit_balance`,
    arguments: [obj(tx, args.self), obj(tx, args.fee)],
  })
}

export interface DepositArgs {
  self: TransactionObjectInput
  fee: TransactionObjectInput
}

export function deposit(tx: Transaction, args: DepositArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::deposit`,
    arguments: [obj(tx, args.self), obj(tx, args.fee)],
  })
}

export interface WithdrawBalanceArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function withdrawBalance(tx: Transaction, args: WithdrawBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::withdraw_balance`,
    arguments: [obj(tx, args.self), pure(tx, args.amount, `u64`)],
  })
}

export interface WithdrawArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function withdraw(tx: Transaction, args: WithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::withdraw`,
    arguments: [obj(tx, args.self), pure(tx, args.amount, `u64`)],
  })
}

export interface ChangeFeeArgs {
  self: TransactionObjectInput
  newAmount: bigint | TransactionArgument
}

export function changeFee(tx: Transaction, args: ChangeFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::change_fee`,
    arguments: [obj(tx, args.self), pure(tx, args.newAmount, `u64`)],
  })
}
