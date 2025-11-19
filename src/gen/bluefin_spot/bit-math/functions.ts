import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { Transaction, TransactionArgument } from '@mysten/sui/transactions'

export function leastSignificantBit(tx: Transaction, mask: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bit_math::least_significant_bit`,
    arguments: [pure(tx, mask, `u256`)],
  })
}

export function mostSignificantBit(tx: Transaction, mask: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bit_math::most_significant_bit`,
    arguments: [pure(tx, mask, `u256`)],
  })
}
