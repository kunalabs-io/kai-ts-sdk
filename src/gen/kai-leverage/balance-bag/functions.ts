import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function destroyEmpty(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::balance_bag::destroy_empty`,
    arguments: [obj(tx, self)],
  })
}

export function empty(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::balance_bag::empty`, arguments: [] })
}

export function isEmpty(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::balance_bag::is_empty`,
    arguments: [obj(tx, self)],
  })
}

export interface AddArgs {
  self: TransactionObjectInput
  balance: TransactionObjectInput
}

export function add(tx: Transaction, typeArg: string, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::balance_bag::add`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.balance)],
  })
}

export function takeAll(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::balance_bag::take_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function amounts(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::balance_bag::amounts`,
    arguments: [obj(tx, self)],
  })
}

export interface TakeAmountArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function takeAmount(tx: Transaction, typeArg: string, args: TakeAmountArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::balance_bag::take_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), pure(tx, args.amount, `u64`)],
  })
}
