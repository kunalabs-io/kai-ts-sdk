import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { Coin } from '../../sui/coin/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface DepositRewardArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: Array<TransactionObjectInput> | TransactionArgument
  a3: bigint | TransactionArgument
}

export function depositReward(tx: Transaction, typeArg: string, args: DepositRewardArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder_script::deposit_reward`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      vector(tx, `${Coin.$typeName}<${typeArg}>`, args.a2),
      pure(tx, args.a3, `u64`),
    ],
  })
}

export interface EmergentWithdrawArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: bigint | TransactionArgument
  a4: string | TransactionArgument
}

export function emergentWithdraw(tx: Transaction, typeArg: string, args: EmergentWithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder_script::emergent_withdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      pure(tx, args.a3, `u64`),
      pure(tx, args.a4, `address`),
    ],
  })
}

export interface EmergentWithdrawAllArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: string | TransactionArgument
}

export function emergentWithdrawAll(
  tx: Transaction,
  typeArg: string,
  args: EmergentWithdrawAllArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rewarder_script::emergent_withdraw_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.a0), obj(tx, args.a1), obj(tx, args.a2), pure(tx, args.a3, `address`)],
  })
}
