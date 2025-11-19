import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function getTypeString(tx: Transaction, typeArg: string) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::get_type_string`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface TransferCoinArgs {
  coin: TransactionObjectInput
  account: string | TransactionArgument
}

export function transferCoin(tx: Transaction, typeArg: string, args: TransferCoinArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::transfer_coin`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.coin), pure(tx, args.account, `address`)],
  })
}

export interface TransferBalanceArgs {
  balance: TransactionObjectInput
  account: string | TransactionArgument
}

export function transferBalance(tx: Transaction, typeArg: string, args: TransferBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::transfer_balance`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.balance), pure(tx, args.account, `address`)],
  })
}

export function timestampSeconds(tx: Transaction, clock: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::timestamp_seconds`,
    arguments: [obj(tx, clock)],
  })
}

export interface DepositBalanceArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function depositBalance(tx: Transaction, typeArg: string, args: DepositBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::deposit_balance`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.a), obj(tx, args.b), pure(tx, args.amount, `u64`)],
  })
}

export interface WithdrawBalanceArgs {
  balance: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function withdrawBalance(tx: Transaction, typeArg: string, args: WithdrawBalanceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::withdraw_balance`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.balance), pure(tx, args.amount, `u64`)],
  })
}

export function u128ToString(tx: Transaction, num: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::u128_to_string`,
    arguments: [pure(tx, num, `u128`)],
  })
}

export interface AddDeltaArgs {
  currentLiquidity: bigint | TransactionArgument
  delta: TransactionObjectInput
}

export function addDelta(tx: Transaction, args: AddDeltaArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::add_delta`,
    arguments: [pure(tx, args.currentLiquidity, `u128`), obj(tx, args.delta)],
  })
}

export interface OverflowAddArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
}

export function overflowAdd(tx: Transaction, args: OverflowAddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::overflow_add`,
    arguments: [pure(tx, args.num1, `u256`), pure(tx, args.num2, `u256`)],
  })
}
