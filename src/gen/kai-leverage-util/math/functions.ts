import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { Transaction, TransactionArgument } from '@mysten/sui/transactions'

export interface SaturatingSubU64Args {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

export function saturatingSubU64(tx: Transaction, args: SaturatingSubU64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math::saturating_sub_u64`,
    arguments: [pure(tx, args.x, `u64`), pure(tx, args.y, `u64`)],
  })
}
