import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function parseAccumulatorMerkleRootFromVaaPayload(
  tx: Transaction,
  message: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::accumulator::parse_accumulator_merkle_root_from_vaa_payload`,
    arguments: [pure(tx, message, `vector<u8>`)],
  })
}

export interface ParseAndVerifyAccumulatorMessageArgs {
  cursor: TransactionObjectInput
  vaaPayload: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function parseAndVerifyAccumulatorMessage(
  tx: Transaction,
  args: ParseAndVerifyAccumulatorMessageArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::accumulator::parse_and_verify_accumulator_message`,
    arguments: [obj(tx, args.cursor), pure(tx, args.vaaPayload, `vector<u8>`), obj(tx, args.clock)],
  })
}

export interface ParseAndVerifyAccumulatorUpdatesArgs {
  cursor: TransactionObjectInput
  merkleRoot: TransactionObjectInput
  clock: TransactionObjectInput
}

export function parseAndVerifyAccumulatorUpdates(
  tx: Transaction,
  args: ParseAndVerifyAccumulatorUpdatesArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::accumulator::parse_and_verify_accumulator_updates`,
    arguments: [obj(tx, args.cursor), obj(tx, args.merkleRoot), obj(tx, args.clock)],
  })
}

export interface ParsePriceFeedMessageArgs {
  messageCur: TransactionObjectInput
  clock: TransactionObjectInput
}

export function parsePriceFeedMessage(tx: Transaction, args: ParsePriceFeedMessageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::accumulator::parse_price_feed_message`,
    arguments: [obj(tx, args.messageCur), obj(tx, args.clock)],
  })
}
