import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function zero(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::zero`,
    arguments: [],
  })
}

export function fromU64(tx: Transaction, v: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::from_u64`,
    arguments: [pure(tx, v, `u64`)],
  })
}

export function from(tx: Transaction, v: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::from`,
    arguments: [pure(tx, v, `u64`)],
  })
}

export function negFrom(tx: Transaction, v: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::neg_from`,
    arguments: [pure(tx, v, `u64`)],
  })
}

export interface WrappingAddArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function wrappingAdd(tx: Transaction, args: WrappingAddArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::wrapping_add`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface AddArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function add(tx: Transaction, args: AddArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::add`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface WrappingSubArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function wrappingSub(tx: Transaction, args: WrappingSubArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::wrapping_sub`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface SubArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function sub(tx: Transaction, args: SubArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::sub`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface MulArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function mul(tx: Transaction, args: MulArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::mul`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface DivArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function div(tx: Transaction, args: DivArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::div`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export function abs(tx: Transaction, v: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::abs`,
    arguments: [obj(tx, v)],
  })
}

export function absU64(tx: Transaction, v: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::abs_u64`,
    arguments: [obj(tx, v)],
  })
}

export interface ShlArgs {
  v: TransactionObjectInput
  shift: number | TransactionArgument
}

export function shl(tx: Transaction, args: ShlArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::shl`,
    arguments: [
      obj(tx, args.v),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface ShrArgs {
  v: TransactionObjectInput
  shift: number | TransactionArgument
}

export function shr(tx: Transaction, args: ShrArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::shr`,
    arguments: [
      obj(tx, args.v),
      pure(tx, args.shift, `u8`),
    ],
  })
}

export interface ModArgs {
  v: TransactionObjectInput
  n: TransactionObjectInput
}

export function mod(tx: Transaction, args: ModArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::mod`,
    arguments: [
      obj(tx, args.v),
      obj(tx, args.n),
    ],
  })
}

export function asU64(tx: Transaction, v: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::as_u64`,
    arguments: [obj(tx, v)],
  })
}

export function sign(tx: Transaction, v: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::sign`,
    arguments: [obj(tx, v)],
  })
}

export function isNeg(tx: Transaction, v: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::is_neg`,
    arguments: [obj(tx, v)],
  })
}

export interface CmpArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function cmp(tx: Transaction, args: CmpArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::cmp`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface EqArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function eq(tx: Transaction, args: EqArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::eq`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface GtArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function gt(tx: Transaction, args: GtArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::gt`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface GteArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function gte(tx: Transaction, args: GteArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::gte`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface LtArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function lt(tx: Transaction, args: LtArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::lt`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface LteArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function lte(tx: Transaction, args: LteArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::lte`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface OrArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function or(tx: Transaction, args: OrArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::or`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export interface AndArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function and(tx: Transaction, args: AndArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::and`,
    arguments: [
      obj(tx, args.num1),
      obj(tx, args.num2),
    ],
  })
}

export function u64Neg(tx: Transaction, v: bigint | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::u64_neg`,
    arguments: [pure(tx, v, `u64`)],
  })
}

export function u8Neg(tx: Transaction, v: number | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('integer-mate')}::i64::u8_neg`,
    arguments: [pure(tx, v, `u8`)],
  })
}
