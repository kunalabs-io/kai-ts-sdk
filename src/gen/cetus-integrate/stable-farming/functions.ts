import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CollectFeeArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: TransactionObjectInput
}

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::stable_farming::collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      obj(tx, args.a5),
    ],
  })
}

export interface CollectClmmRewardArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: TransactionObjectInput
  a6: TransactionObjectInput
}

export function collectClmmReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CollectClmmRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::stable_farming::collect_clmm_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      obj(tx, args.a5),
      obj(tx, args.a6),
    ],
  })
}
