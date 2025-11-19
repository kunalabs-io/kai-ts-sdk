import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { Coin } from '../../sui/coin/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function mergeCoins(
  tx: Transaction,
  typeArg: string,
  a0: Array<TransactionObjectInput> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::merge_coins`,
    typeArguments: [typeArg],
    arguments: [vector(tx, `${Coin.$typeName}<${typeArg}>`, a0)],
  })
}

export interface SendCoinArgs {
  a0: TransactionObjectInput
  a1: string | TransactionArgument
}

export function sendCoin(tx: Transaction, typeArg: string, args: SendCoinArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::send_coin`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.a0), pure(tx, args.a1, `address`)],
  })
}

export function transferCoinToSender(tx: Transaction, typeArg: string, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::transfer_coin_to_sender`,
    typeArguments: [typeArg],
    arguments: [obj(tx, a0)],
  })
}
