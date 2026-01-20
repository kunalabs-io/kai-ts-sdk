import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function new_(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::consumed_vaas::new`,
    arguments: [],
  })
}

export interface ConsumeArgs {
  self: TransactionObjectInput
  digest: TransactionObjectInput
}

export function consume(tx: Transaction, args: ConsumeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::consumed_vaas::consume`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.digest),
    ],
  })
}
