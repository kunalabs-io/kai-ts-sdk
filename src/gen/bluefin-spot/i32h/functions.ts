import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function mateToLib(tx: Transaction, num: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::mate_to_lib`,
    arguments: [obj(tx, num)],
  })
}

export function libToMate(tx: Transaction, num: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::lib_to_mate`,
    arguments: [obj(tx, num)],
  })
}

export interface SubArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function sub(tx: Transaction, args: SubArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::sub`,
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
    ],
  })
}

export interface AddArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function add(tx: Transaction, args: AddArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::add`,
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
    ],
  })
}

export interface EqArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function eq(tx: Transaction, args: EqArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::eq`,
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
    ],
  })
}

export interface LtArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function lt(tx: Transaction, args: LtArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::lt`,
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
    ],
  })
}

export interface GtArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function gt(tx: Transaction, args: GtArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::gt`,
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
    ],
  })
}

export interface LteArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function lte(tx: Transaction, args: LteArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::lte`,
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
    ],
  })
}

export interface GteArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function gte(tx: Transaction, args: GteArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::gte`,
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
    ],
  })
}

export function isNeg(tx: Transaction, num: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::i32H::is_neg`,
    arguments: [obj(tx, num)],
  })
}
