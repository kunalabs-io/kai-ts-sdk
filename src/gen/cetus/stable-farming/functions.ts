import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CollectClmmRewardArgs {
  globalConfig1: TransactionObjectInput
  globalConfig2: TransactionObjectInput
  pool: TransactionObjectInput
  wrappedPositionNft: TransactionObjectInput
  rewarderGlobalVault: TransactionObjectInput
  coin: TransactionObjectInput
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig1),
      obj(tx, args.globalConfig2),
      obj(tx, args.pool),
      obj(tx, args.wrappedPositionNft),
      obj(tx, args.rewarderGlobalVault),
      obj(tx, args.coin),
      obj(tx, args.clock),
    ],
  })
}

export interface CollectFeeArgs {
  globalConfig1: TransactionObjectInput
  globalConfig2: TransactionObjectInput
  pool: TransactionObjectInput
  wrappedPositionNft: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
}

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::stable_farming::collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig1),
      obj(tx, args.globalConfig2),
      obj(tx, args.pool),
      obj(tx, args.wrappedPositionNft),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
    ],
  })
}
