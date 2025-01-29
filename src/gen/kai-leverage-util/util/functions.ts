import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface DestroyBalanceOrTransferArgs {
  balance: TransactionObjectInput
  recipient: string | TransactionArgument
}

export function destroyBalanceOrTransfer(
  tx: Transaction,
  typeArg: string,
  args: DestroyBalanceOrTransferArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::util::destroy_balance_or_transfer`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.balance), pure(tx, args.recipient, `address`)],
  })
}
