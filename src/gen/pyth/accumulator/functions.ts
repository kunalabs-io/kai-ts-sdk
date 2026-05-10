import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface ParseAndVerifyAccumulatorMessageArgs {
  cursor: TransactionObjectInput
  vaaPayload: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function parseAndVerifyAccumulatorMessage(
  tx: Transaction,
  args: ParseAndVerifyAccumulatorMessageArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('pyth', options?.env)
    }::accumulator::parse_and_verify_accumulator_message`,
    arguments: [
      obj(tx, args.cursor),
      pure(tx, args.vaaPayload, `vector<u8>`),
      obj(tx, args.clock),
    ],
  })
}

export function parseAccumulatorMerkleRootFromVaaPayload(
  tx: Transaction,
  message: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('pyth', options?.env)
    }::accumulator::parse_accumulator_merkle_root_from_vaa_payload`,
    arguments: [pure(tx, message, `vector<u8>`)],
  })
}

export interface ParsePriceFeedMessageArgs {
  messageCur: TransactionObjectInput
  clock: TransactionObjectInput
}

export function parsePriceFeedMessage(
  tx: Transaction,
  args: ParsePriceFeedMessageArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::accumulator::parse_price_feed_message`,
    arguments: [
      obj(tx, args.messageCur),
      obj(tx, args.clock),
    ],
  })
}

export interface ParseAndVerifyAccumulatorUpdatesArgs {
  cursor: TransactionObjectInput
  merkleRoot: TransactionObjectInput
  clock: TransactionObjectInput
}

export function parseAndVerifyAccumulatorUpdates(
  tx: Transaction,
  args: ParseAndVerifyAccumulatorUpdatesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('pyth', options?.env)
    }::accumulator::parse_and_verify_accumulator_updates`,
    arguments: [
      obj(tx, args.cursor),
      obj(tx, args.merkleRoot),
      obj(tx, args.clock),
    ],
  })
}
