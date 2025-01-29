import { PUBLISHED_AT } from '..'
import { Coin } from '../../_dependencies/onchain/0x2/coin/structs'
import { obj, pure, vector } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface DepositRewardArgs {
  globalConfig: TransactionObjectInput
  rewarderGlobalVault: TransactionObjectInput
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u64: bigint | TransactionArgument
}

export function depositReward(tx: Transaction, typeArg: string, args: DepositRewardArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder_script::deposit_reward`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.rewarderGlobalVault),
      vector(tx, `${Coin.$typeName}<${typeArg}>`, args.vecCoin),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export interface EmergentWithdrawArgs {
  adminCap: TransactionObjectInput
  globalConfig: TransactionObjectInput
  rewarderGlobalVault: TransactionObjectInput
  u64: bigint | TransactionArgument
  address: string | TransactionArgument
}

export function emergentWithdraw(tx: Transaction, typeArg: string, args: EmergentWithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder_script::emergent_withdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.globalConfig),
      obj(tx, args.rewarderGlobalVault),
      pure(tx, args.u64, `u64`),
      pure(tx, args.address, `address`),
    ],
  })
}

export interface EmergentWithdrawAllArgs {
  adminCap: TransactionObjectInput
  globalConfig: TransactionObjectInput
  rewarderGlobalVault: TransactionObjectInput
  address: string | TransactionArgument
}

export function emergentWithdrawAll(
  tx: Transaction,
  typeArg: string,
  args: EmergentWithdrawAllArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder_script::emergent_withdraw_all`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.globalConfig),
      obj(tx, args.rewarderGlobalVault),
      pure(tx, args.address, `address`),
    ],
  })
}
