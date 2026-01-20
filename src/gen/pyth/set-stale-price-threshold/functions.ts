import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface ExecuteArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  payload: Array<number | TransactionArgument> | TransactionArgument
}

export function execute(tx: Transaction, args: ExecuteArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::set_stale_price_threshold::execute`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.state),
      pure(tx, args.payload, `vector<u8>`),
    ],
  })
}

export function fromByteVec(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::set_stale_price_threshold::from_byte_vec`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}
