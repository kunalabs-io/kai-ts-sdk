import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
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
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util')}::util::destroy_balance_or_transfer`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.balance),
      pure(tx, args.recipient, `address`),
    ],
  })
}
