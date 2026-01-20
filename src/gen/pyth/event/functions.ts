import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface EmitPriceFeedUpdateArgs {
  priceFeed: TransactionObjectInput
  timestamp: bigint | TransactionArgument
}

export function emitPriceFeedUpdate(
  tx: Transaction,
  args: EmitPriceFeedUpdateArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::event::emit_price_feed_update`,
    arguments: [
      obj(tx, args.priceFeed),
      pure(tx, args.timestamp, `u64`),
    ],
  })
}

export function emitPythInitializationEvent(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::event::emit_pyth_initialization_event`,
    arguments: [],
  })
}
