import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface OverflowingAddArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function overflowingAdd(tx: Transaction, args: OverflowingAddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::overflowing_add`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface OverflowingSubArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function overflowingSub(tx: Transaction, args: OverflowingSubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::overflowing_sub`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface WrappingAddArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function wrappingAdd(tx: Transaction, args: WrappingAddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::wrapping_add`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface WrappingSubArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function wrappingSub(tx: Transaction, args: WrappingSubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::wrapping_sub`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface AddArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function add(tx: Transaction, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::add`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export function zero(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::zero`, arguments: [] })
}

export interface DivArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function div(tx: Transaction, args: DivArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::div`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface MulArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function mul(tx: Transaction, args: MulArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::mul`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface SubArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function sub(tx: Transaction, args: SubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::sub`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export function from(tx: Transaction, v: bigint | TransactionArgument) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::from`, arguments: [pure(tx, v, `u128`)] })
}

export function abs(tx: Transaction, v: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::abs`, arguments: [obj(tx, v)] })
}

export interface AndArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function and(tx: Transaction, args: AndArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::and`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface CmpArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function cmp(tx: Transaction, args: CmpArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::cmp`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface EqArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function eq(tx: Transaction, args: EqArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::eq`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface GtArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function gt(tx: Transaction, args: GtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::gt`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface GteArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function gte(tx: Transaction, args: GteArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::gte`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export function isNeg(tx: Transaction, v: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::is_neg`, arguments: [obj(tx, v)] })
}

export interface LtArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function lt(tx: Transaction, args: LtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::lt`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface LteArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function lte(tx: Transaction, args: LteArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::lte`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export function negFrom(tx: Transaction, v: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::neg_from`,
    arguments: [pure(tx, v, `u128`)],
  })
}

export interface OrArgs {
  num1: TransactionObjectInput
  num2: TransactionObjectInput
}

export function or(tx: Transaction, args: OrArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::or`,
    arguments: [obj(tx, args.num1), obj(tx, args.num2)],
  })
}

export interface ShlArgs {
  v: TransactionObjectInput
  shift: number | TransactionArgument
}

export function shl(tx: Transaction, args: ShlArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::shl`,
    arguments: [obj(tx, args.v), pure(tx, args.shift, `u8`)],
  })
}

export interface ShrArgs {
  v: TransactionObjectInput
  shift: number | TransactionArgument
}

export function shr(tx: Transaction, args: ShrArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::shr`,
    arguments: [obj(tx, args.v), pure(tx, args.shift, `u8`)],
  })
}

export function sign(tx: Transaction, v: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::sign`, arguments: [obj(tx, v)] })
}

export function u8Neg(tx: Transaction, v: number | TransactionArgument) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::u8_neg`, arguments: [pure(tx, v, `u8`)] })
}

export function absU128(tx: Transaction, v: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::abs_u128`, arguments: [obj(tx, v)] })
}

export function asI32(tx: Transaction, v: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::as_i32`, arguments: [obj(tx, v)] })
}

export function asI64(tx: Transaction, v: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::as_i64`, arguments: [obj(tx, v)] })
}

export function asU128(tx: Transaction, v: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::as_u128`, arguments: [obj(tx, v)] })
}

export function neg(tx: Transaction, v: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::i128::neg`, arguments: [obj(tx, v)] })
}

export function u128Neg(tx: Transaction, v: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::i128::u128_neg`,
    arguments: [pure(tx, v, `u128`)],
  })
}
