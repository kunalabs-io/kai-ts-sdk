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
  pythState: TransactionObjectInput
  payload: Array<number | TransactionArgument> | TransactionArgument
}

export function execute(
  tx: Transaction,
  args: ExecuteArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::set_update_fee::execute`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.pythState),
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
    target: `${getPublishedAt('pyth', options?.env)}::set_update_fee::from_byte_vec`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export interface ApplyExponentArgs {
  mantissa: bigint | TransactionArgument
  exponent: number | TransactionArgument
}

export function applyExponent(
  tx: Transaction,
  args: ApplyExponentArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::set_update_fee::apply_exponent`,
    arguments: [
      pure(tx, args.mantissa, `u64`),
      pure(tx, args.exponent, `u8`),
    ],
  })
}
