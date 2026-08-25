import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface NewArgs {
  sqrtPaX64: bigint | TransactionArgument
  sqrtPbX64: bigint | TransactionArgument
  l: bigint | TransactionArgument
}

/** Create an `LpShape`, asserting the price range bounds are ordered. */
export function new_(
  tx: Transaction,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::lp_shape_clmm::new`,
    arguments: [
      pure(tx, args.sqrtPaX64, `u128`),
      pure(tx, args.sqrtPbX64, `u128`),
      pure(tx, args.l, `u128`),
    ],
  })
}

/** Lower bound price sqrt in Q64.64. */
export function sqrtPaX64(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::lp_shape_clmm::sqrt_pa_x64`,
    arguments: [obj(tx, self)],
  })
}

/** Upper bound price sqrt in Q64.64. */
export function sqrtPbX64(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::lp_shape_clmm::sqrt_pb_x64`,
    arguments: [obj(tx, self)],
  })
}

/** LP position liquidity. */
export function l(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::lp_shape_clmm::l`,
    arguments: [obj(tx, self)],
  })
}
