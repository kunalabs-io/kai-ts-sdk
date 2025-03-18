import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface PushReverseArgs {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  t0: GenericArg
}

export function pushReverse(tx: Transaction, typeArg: string, args: PushReverseArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::push_reverse`,
    typeArguments: [typeArg],
    arguments: [pure(tx, args.vecU8, `vector<u8>`), generic(tx, `${typeArg}`, args.t0)],
  })
}

export interface PushU128BeArgs {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  u128: bigint | TransactionArgument
}

export function pushU128Be(tx: Transaction, args: PushU128BeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::push_u128_be`,
    arguments: [pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.u128, `u128`)],
  })
}

export interface PushU16BeArgs {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  u16: number | TransactionArgument
}

export function pushU16Be(tx: Transaction, args: PushU16BeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::push_u16_be`,
    arguments: [pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.u16, `u16`)],
  })
}

export interface PushU256BeArgs {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  u256: bigint | TransactionArgument
}

export function pushU256Be(tx: Transaction, args: PushU256BeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::push_u256_be`,
    arguments: [pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.u256, `u256`)],
  })
}

export interface PushU32BeArgs {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  u32: number | TransactionArgument
}

export function pushU32Be(tx: Transaction, args: PushU32BeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::push_u32_be`,
    arguments: [pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.u32, `u32`)],
  })
}

export interface PushU64BeArgs {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  u64: bigint | TransactionArgument
}

export function pushU64Be(tx: Transaction, args: PushU64BeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::push_u64_be`,
    arguments: [pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.u64, `u64`)],
  })
}

export interface PushU8Args {
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  u8: number | TransactionArgument
}

export function pushU8(tx: Transaction, args: PushU8Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::push_u8`,
    arguments: [pure(tx, args.vecU8, `vector<u8>`), pure(tx, args.u8, `u8`)],
  })
}

export interface TakeBytesArgs {
  cursor: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function takeBytes(tx: Transaction, args: TakeBytesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::take_bytes`,
    arguments: [obj(tx, args.cursor), pure(tx, args.u64, `u64`)],
  })
}

export function takeU128Be(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::take_u128_be`,
    arguments: [obj(tx, cursor)],
  })
}

export function takeU16Be(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::take_u16_be`,
    arguments: [obj(tx, cursor)],
  })
}

export function takeU256Be(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::take_u256_be`,
    arguments: [obj(tx, cursor)],
  })
}

export function takeU32Be(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::take_u32_be`,
    arguments: [obj(tx, cursor)],
  })
}

export function takeU64Be(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bytes::take_u64_be`,
    arguments: [obj(tx, cursor)],
  })
}

export function takeU8(tx: Transaction, cursor: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::bytes::take_u8`, arguments: [obj(tx, cursor)] })
}
