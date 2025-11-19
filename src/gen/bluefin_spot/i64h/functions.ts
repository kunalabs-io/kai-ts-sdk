import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export function mateToLib(tx: Transaction, num: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i64H::mate_to_lib`, arguments: [obj(tx, num)] })
}

export function libToMate(tx: Transaction, num: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i64H::lib_to_mate`, arguments: [obj(tx, num)] })
}

export interface SubArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function sub(tx: Transaction, args: SubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64H::sub`,
    arguments: [obj(tx, args.a), obj(tx, args.b)],
  })
}

export interface AddArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function add(tx: Transaction, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64H::add`,
    arguments: [obj(tx, args.a), obj(tx, args.b)],
  })
}

export interface EqArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function eq(tx: Transaction, args: EqArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64H::eq`,
    arguments: [obj(tx, args.a), obj(tx, args.b)],
  })
}

export interface LtArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function lt(tx: Transaction, args: LtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64H::lt`,
    arguments: [obj(tx, args.a), obj(tx, args.b)],
  })
}

export interface GtArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function gt(tx: Transaction, args: GtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64H::gt`,
    arguments: [obj(tx, args.a), obj(tx, args.b)],
  })
}

export interface LteArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function lte(tx: Transaction, args: LteArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64H::lte`,
    arguments: [obj(tx, args.a), obj(tx, args.b)],
  })
}

export interface GteArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function gte(tx: Transaction, args: GteArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i64H::gte`,
    arguments: [obj(tx, args.a), obj(tx, args.b)],
  })
}

export function isNeg(tx: Transaction, num: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i64H::is_neg`, arguments: [obj(tx, num)] })
}
