import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

export function leastSignificantBit(
  tx: Transaction,
  mask: bigint | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::bit_math::least_significant_bit`,
    arguments: [pure(tx, mask, `u256`)],
  })
}

export function mostSignificantBit(
  tx: Transaction,
  mask: bigint | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::bit_math::most_significant_bit`,
    arguments: [pure(tx, mask, `u256`)],
  })
}
