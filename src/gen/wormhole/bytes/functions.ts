import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, pure } from '../../_framework/util'

export interface PushU8Args {
  buf: Array<number | TransactionArgument> | TransactionArgument
  v: number | TransactionArgument
}

export function pushU8(tx: Transaction, args: PushU8Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::push_u8`,
    arguments: [
      pure(tx, args.buf, `vector<u8>`),
      pure(tx, args.v, `u8`),
    ],
  })
}

export interface PushU16BeArgs {
  buf: Array<number | TransactionArgument> | TransactionArgument
  value: number | TransactionArgument
}

export function pushU16Be(tx: Transaction, args: PushU16BeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::push_u16_be`,
    arguments: [
      pure(tx, args.buf, `vector<u8>`),
      pure(tx, args.value, `u16`),
    ],
  })
}

export interface PushU32BeArgs {
  buf: Array<number | TransactionArgument> | TransactionArgument
  value: number | TransactionArgument
}

export function pushU32Be(tx: Transaction, args: PushU32BeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::push_u32_be`,
    arguments: [
      pure(tx, args.buf, `vector<u8>`),
      pure(tx, args.value, `u32`),
    ],
  })
}

export interface PushU64BeArgs {
  buf: Array<number | TransactionArgument> | TransactionArgument
  value: bigint | TransactionArgument
}

export function pushU64Be(tx: Transaction, args: PushU64BeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::push_u64_be`,
    arguments: [
      pure(tx, args.buf, `vector<u8>`),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface PushU128BeArgs {
  buf: Array<number | TransactionArgument> | TransactionArgument
  value: bigint | TransactionArgument
}

export function pushU128Be(tx: Transaction, args: PushU128BeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::push_u128_be`,
    arguments: [
      pure(tx, args.buf, `vector<u8>`),
      pure(tx, args.value, `u128`),
    ],
  })
}

export interface PushU256BeArgs {
  buf: Array<number | TransactionArgument> | TransactionArgument
  value: bigint | TransactionArgument
}

export function pushU256Be(tx: Transaction, args: PushU256BeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::push_u256_be`,
    arguments: [
      pure(tx, args.buf, `vector<u8>`),
      pure(tx, args.value, `u256`),
    ],
  })
}

export function takeU8(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::take_u8`,
    arguments: [obj(tx, cur)],
  })
}

export function takeU16Be(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::take_u16_be`,
    arguments: [obj(tx, cur)],
  })
}

export function takeU32Be(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::take_u32_be`,
    arguments: [obj(tx, cur)],
  })
}

export function takeU64Be(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::take_u64_be`,
    arguments: [obj(tx, cur)],
  })
}

export function takeU128Be(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::take_u128_be`,
    arguments: [obj(tx, cur)],
  })
}

export function takeU256Be(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::take_u256_be`,
    arguments: [obj(tx, cur)],
  })
}

export interface TakeBytesArgs {
  cur: TransactionObjectInput
  numBytes: bigint | TransactionArgument
}

export function takeBytes(tx: Transaction, args: TakeBytesArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::take_bytes`,
    arguments: [
      obj(tx, args.cur),
      pure(tx, args.numBytes, `u64`),
    ],
  })
}

export interface PushReverseArgs {
  buf: Array<number | TransactionArgument> | TransactionArgument
  v: GenericArg
}

export function pushReverse(
  tx: Transaction,
  typeArg: string,
  args: PushReverseArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::bytes::push_reverse`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.buf, `vector<u8>`),
      generic(tx, `${typeArg}`, args.v),
    ],
  })
}
