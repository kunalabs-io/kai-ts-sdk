import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface EmitPriceFeedUpdateArgs {
  priceFeed: TransactionObjectInput
  timestamp: bigint | TransactionArgument
}

export function emitPriceFeedUpdate(tx: Transaction, args: EmitPriceFeedUpdateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::event::emit_price_feed_update`,
    arguments: [obj(tx, args.priceFeed), pure(tx, args.timestamp, `u64`)],
  })
}

export function emitPythInitializationEvent(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::event::emit_pyth_initialization_event`,
    arguments: [],
  })
}
