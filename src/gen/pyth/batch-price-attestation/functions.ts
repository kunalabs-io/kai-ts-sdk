import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function deserializeHeader(
  tx: Transaction,
  cur: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::batch_price_attestation::deserialize_header`,
    arguments: [obj(tx, cur)],
  })
}

export function destroy(
  tx: Transaction,
  batch: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::batch_price_attestation::destroy`,
    arguments: [obj(tx, batch)],
  })
}

export function getAttestationCount(
  tx: Transaction,
  batch: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('pyth', options?.env)
    }::batch_price_attestation::get_attestation_count`,
    arguments: [obj(tx, batch)],
  })
}

export interface GetPriceInfoArgs {
  batch: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function getPriceInfo(
  tx: Transaction,
  args: GetPriceInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::batch_price_attestation::get_price_info`,
    arguments: [
      obj(tx, args.batch),
      pure(tx, args.index, `u64`),
    ],
  })
}

export interface DeserializeArgs {
  bytes: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function deserialize(
  tx: Transaction,
  args: DeserializeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::batch_price_attestation::deserialize`,
    arguments: [
      pure(tx, args.bytes, `vector<u8>`),
      obj(tx, args.clock),
    ],
  })
}

export interface DeserializePriceInfoArgs {
  cur: TransactionObjectInput
  clock: TransactionObjectInput
}

export function deserializePriceInfo(
  tx: Transaction,
  args: DeserializePriceInfoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('pyth', options?.env)
    }::batch_price_attestation::deserialize_price_info`,
    arguments: [
      obj(tx, args.cur),
      obj(tx, args.clock),
    ],
  })
}
