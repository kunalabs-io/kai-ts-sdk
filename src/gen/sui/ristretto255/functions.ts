import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function scalarFromBytes(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_from_bytes`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export function scalarFromU64(
  tx: Transaction,
  x: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_from_u64`,
    arguments: [pure(tx, x, `u64`)],
  })
}

export function scalarZero(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_zero`,
    arguments: [],
  })
}

export function scalarOne(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_one`,
    arguments: [],
  })
}

export interface ScalarAddArgs {
  e1: TransactionObjectInput
  e2: TransactionObjectInput
}

export function scalarAdd(
  tx: Transaction,
  args: ScalarAddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_add`,
    arguments: [
      obj(tx, args.e1),
      obj(tx, args.e2),
    ],
  })
}

export interface ScalarSubArgs {
  e1: TransactionObjectInput
  e2: TransactionObjectInput
}

export function scalarSub(
  tx: Transaction,
  args: ScalarSubArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_sub`,
    arguments: [
      obj(tx, args.e1),
      obj(tx, args.e2),
    ],
  })
}

export interface ScalarMulArgs {
  e1: TransactionObjectInput
  e2: TransactionObjectInput
}

export function scalarMul(
  tx: Transaction,
  args: ScalarMulArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_mul`,
    arguments: [
      obj(tx, args.e1),
      obj(tx, args.e2),
    ],
  })
}

export interface ScalarDivArgs {
  e1: TransactionObjectInput
  e2: TransactionObjectInput
}

/** Returns e2/e1, fails if a is zero. */
export function scalarDiv(
  tx: Transaction,
  args: ScalarDivArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_div`,
    arguments: [
      obj(tx, args.e1),
      obj(tx, args.e2),
    ],
  })
}

export function scalarNeg(
  tx: Transaction,
  e: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_neg`,
    arguments: [obj(tx, e)],
  })
}

export function scalarInv(
  tx: Transaction,
  e: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::scalar_inv`,
    arguments: [obj(tx, e)],
  })
}

export function gFromBytes(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::g_from_bytes`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export function gIdentity(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::g_identity`,
    arguments: [],
  })
}

export function gGenerator(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::g_generator`,
    arguments: [],
  })
}

export interface GAddArgs {
  e1: TransactionObjectInput
  e2: TransactionObjectInput
}

export function gAdd(
  tx: Transaction,
  args: GAddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::g_add`,
    arguments: [
      obj(tx, args.e1),
      obj(tx, args.e2),
    ],
  })
}

export interface GSubArgs {
  e1: TransactionObjectInput
  e2: TransactionObjectInput
}

export function gSub(
  tx: Transaction,
  args: GSubArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::g_sub`,
    arguments: [
      obj(tx, args.e1),
      obj(tx, args.e2),
    ],
  })
}

export interface GMulArgs {
  e1: TransactionObjectInput
  e2: TransactionObjectInput
}

export function gMul(
  tx: Transaction,
  args: GMulArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::g_mul`,
    arguments: [
      obj(tx, args.e1),
      obj(tx, args.e2),
    ],
  })
}

export interface GDivArgs {
  e1: TransactionObjectInput
  e2: TransactionObjectInput
}

/** Returns e2 / e1, fails if scalar is zero. */
export function gDiv(
  tx: Transaction,
  args: GDivArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::g_div`,
    arguments: [
      obj(tx, args.e1),
      obj(tx, args.e2),
    ],
  })
}

export function gNeg(
  tx: Transaction,
  e: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::ristretto255::g_neg`,
    arguments: [obj(tx, e)],
  })
}
