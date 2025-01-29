import { PUBLISHED_AT } from '..'
import { Coin } from '../../_dependencies/onchain/0x2/coin/structs'
import { obj, pure, vector } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function mergeCoins(
  tx: Transaction,
  typeArg: string,
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::merge_coins`,
    typeArguments: [typeArg],
    arguments: [vector(tx, `${Coin.$typeName}<${typeArg}>`, vecCoin)],
  })
}

export interface SendCoinArgs {
  coin: TransactionObjectInput
  address: string | TransactionArgument
}

export function sendCoin(tx: Transaction, typeArg: string, args: SendCoinArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::send_coin`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.coin), pure(tx, args.address, `address`)],
  })
}

export function transferCoinToSender(
  tx: Transaction,
  typeArg: string,
  coin: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::utils::transfer_coin_to_sender`,
    typeArguments: [typeArg],
    arguments: [obj(tx, coin)],
  })
}
