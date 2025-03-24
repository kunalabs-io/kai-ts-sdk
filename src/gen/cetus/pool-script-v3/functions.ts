import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CollectFeeArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
}

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v3::collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
    ],
  })
}

export interface CollectRewardArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  rewarderGlobalVault: TransactionObjectInput
  coin: TransactionObjectInput
  clock: TransactionObjectInput
}

export function collectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CollectRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v3::collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.rewarderGlobalVault),
      obj(tx, args.coin),
      obj(tx, args.clock),
    ],
  })
}
