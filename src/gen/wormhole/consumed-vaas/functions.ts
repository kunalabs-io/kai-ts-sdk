import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function new_(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::consumed_vaas::new`,
    arguments: [],
  })
}

export interface ConsumeArgs {
  self: TransactionObjectInput
  digest: TransactionObjectInput
}

export function consume(
  tx: Transaction,
  args: ConsumeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::consumed_vaas::consume`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.digest),
    ],
  })
}
