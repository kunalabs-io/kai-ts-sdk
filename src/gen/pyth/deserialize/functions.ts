import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface DeserializeVectorArgs {
  cur: TransactionObjectInput
  n: bigint | TransactionArgument
}

export function deserializeVector(
  tx: Transaction,
  args: DeserializeVectorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::deserialize::deserialize_vector`,
    arguments: [
      obj(tx, args.cur),
      pure(tx, args.n, `u64`),
    ],
  })
}

export function deserializeU8(
  tx: Transaction,
  cur: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::deserialize::deserialize_u8`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeU16(
  tx: Transaction,
  cur: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::deserialize::deserialize_u16`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeU32(
  tx: Transaction,
  cur: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::deserialize::deserialize_u32`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeI32(
  tx: Transaction,
  cur: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::deserialize::deserialize_i32`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeU64(
  tx: Transaction,
  cur: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::deserialize::deserialize_u64`,
    arguments: [obj(tx, cur)],
  })
}

export function deserializeI64(
  tx: Transaction,
  cur: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::deserialize::deserialize_i64`,
    arguments: [obj(tx, cur)],
  })
}
