import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

export interface SaturatingSubU64Args {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

export function saturatingSubU64(tx: Transaction, args: SaturatingSubU64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util')}::math::saturating_sub_u64`,
    arguments: [
      pure(tx, args.x, `u64`),
      pure(tx, args.y, `u64`),
    ],
  })
}
