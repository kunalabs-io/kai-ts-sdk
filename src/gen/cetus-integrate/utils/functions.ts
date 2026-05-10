import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { Coin } from '../../sui/coin/structs'

export function mergeCoins(
  tx: Transaction,
  typeArg: string,
  a0: Array<TransactionObjectInput> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::utils::merge_coins`,
    typeArguments: [typeArg],
    arguments: [vector(tx, `${Coin.$typeName}<${typeArg}>`, a0)],
  })
}

export interface SendCoinArgs {
  a0: TransactionObjectInput
  a1: string | TransactionArgument
}

export function sendCoin(
  tx: Transaction,
  typeArg: string,
  args: SendCoinArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::utils::send_coin`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.a0),
      pure(tx, args.a1, `address`),
    ],
  })
}

export function transferCoinToSender(
  tx: Transaction,
  typeArg: string,
  a0: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::utils::transfer_coin_to_sender`,
    typeArguments: [typeArg],
    arguments: [obj(tx, a0)],
  })
}
