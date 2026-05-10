import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface ExecuteArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  payload: Array<number | TransactionArgument> | TransactionArgument
}

export function execute(
  tx: Transaction,
  args: ExecuteArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::set_data_sources::execute`,
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
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::set_data_sources::from_byte_vec`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}
