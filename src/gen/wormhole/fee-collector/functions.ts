import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function balanceValue(tx: Transaction, feeCollector: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::balance_value`,
    arguments: [obj(tx, feeCollector)],
  })
}

export interface ChangeFeeArgs {
  feeCollector: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function changeFee(tx: Transaction, args: ChangeFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::change_fee`,
    arguments: [obj(tx, args.feeCollector), pure(tx, args.u64, `u64`)],
  })
}

export interface DepositArgs {
  feeCollector: TransactionObjectInput
  coin: TransactionObjectInput
}

export function deposit(tx: Transaction, args: DepositArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::deposit`,
    arguments: [obj(tx, args.feeCollector), obj(tx, args.coin)],
  })
}

export interface DepositBalanceArgs {
  feeCollector: TransactionObjectInput
  balance: TransactionObjectInput
}

export function depositBalance(tx: Transaction, args: DepositBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::deposit_balance`,
    arguments: [obj(tx, args.feeCollector), obj(tx, args.balance)],
  })
}

export function feeAmount(tx: Transaction, feeCollector: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::fee_amount`,
    arguments: [obj(tx, feeCollector)],
  })
}

export function new_(tx: Transaction, u64: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::new`,
    arguments: [pure(tx, u64, `u64`)],
  })
}

export interface WithdrawArgs {
  feeCollector: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function withdraw(tx: Transaction, args: WithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::withdraw`,
    arguments: [obj(tx, args.feeCollector), pure(tx, args.u64, `u64`)],
  })
}

export interface WithdrawBalanceArgs {
  feeCollector: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function withdrawBalance(tx: Transaction, args: WithdrawBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::fee_collector::withdraw_balance`,
    arguments: [obj(tx, args.feeCollector), pure(tx, args.u64, `u64`)],
  })
}
