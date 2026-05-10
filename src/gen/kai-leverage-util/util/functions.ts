import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface DestroyBalanceOrTransferArgs {
  balance: TransactionObjectInput
  recipient: string | TransactionArgument
}

export function destroyBalanceOrTransfer(
  tx: Transaction,
  typeArg: string,
  args: DestroyBalanceOrTransferArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage-util', options?.env)
    }::util::destroy_balance_or_transfer`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.balance),
      pure(tx, args.recipient, `address`),
    ],
  })
}
