import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

export function leastSignificantBit(
  tx: Transaction,
  mask: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::bit_math::least_significant_bit`,
    arguments: [pure(tx, mask, `u256`)],
  })
}

export function mostSignificantBit(
  tx: Transaction,
  mask: bigint | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::bit_math::most_significant_bit`,
    arguments: [pure(tx, mask, `u256`)],
  })
}
