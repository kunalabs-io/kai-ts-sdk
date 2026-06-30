import { CallArg, Transaction, TransactionObjectArgument } from '@mysten/sui/transactions'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import { Amount } from './amount'
import * as coin from './gen/sui/coin/functions'
import { compressSuiType, parseTypeName } from './gen/_framework/util'
import { SUI_TYPE_ARG } from '@mysten/sui/utils'

function coinToObjectArg(coin: SuiClientTypes.Coin): CallArg {
  return {
    $kind: 'Object',
    Object: {
      $kind: 'ImmOrOwnedObject',
      ImmOrOwnedObject: {
        digest: coin.digest,
        objectId: coin.objectId,
        version: coin.version,
      },
    },
  }
}

// core `Coin.type` is the wrapped `0x2::coin::Coin<INNER>`; extract the inner coin type.
function coinInnerType(coin: SuiClientTypes.Coin): string {
  const { typeArgs } = parseTypeName(coin.type)
  return typeArgs[0] ?? coin.type
}

export function createCoinOfMinimumValueFromList(
  tx: Transaction,
  coins: SuiClientTypes.Coin[],
  amount: bigint,
  coinType: string
): { coin: TransactionObjectArgument; amount: bigint } {
  if (amount === 0n) {
    return { coin: coin.zero(tx, coinType) as TransactionObjectArgument, amount: 0n }
  }

  coins = coins.filter(c => compressSuiType(coinInnerType(c)) === compressSuiType(coinType))

  // check there is enough balance
  let totalAmt = 0n
  for (const coin of coins) {
    totalAmt += BigInt(coin.balance)
  }
  if (totalAmt < amount) {
    throw new Error('Not enough balance')
  }

  const selectedCoins: Array<SuiClientTypes.Coin> = []
  let selectedAmount = 0n
  while (selectedAmount < amount) {
    // select random coin from the array
    const idx = Math.floor(Math.random() * coins.length)
    const coin = coins[idx]
    selectedAmount += BigInt(coin.balance)
    selectedCoins.push(coin)
    // remove the coin from the array
    coins.splice(idx, 1)
  }

  // merge all coins into a single object
  if (selectedCoins.length > 1) {
    tx.mergeCoins(
      tx.object(coinToObjectArg(selectedCoins[0])),
      selectedCoins.slice(1).map(c => tx.object(coinToObjectArg(c)))
    )
  }
  const c = tx.object(coinToObjectArg(selectedCoins[0]))

  return {
    coin: c,
    amount: selectedAmount,
  }
}

export function createCoinOfExactValueFromList(
  tx: Transaction,
  coins: SuiClientTypes.Coin[],
  amount: bigint,
  coinType: string
): TransactionObjectArgument {
  const res = createCoinOfMinimumValueFromList(tx, coins, amount, coinType)

  // split the coin to the exact amount if necessary
  if (res.amount > amount) {
    return tx.splitCoins(res.coin, [amount])
  } else {
    return res.coin
  }
}

export async function getCoins(
  client: ClientWithCoreApi,
  address: string,
  coinType: string,
  maxAmount?: Amount
): Promise<SuiClientTypes.Coin[]> {
  let acc = 0n
  const coins: Array<SuiClientTypes.Coin> = []
  let cursor: string | null | undefined = undefined
  let hasNextPage = true
  while (hasNextPage && (!maxAmount || acc < maxAmount.int)) {
    const coinsResult = await client.core.listCoins({
      owner: address,
      coinType,
      cursor,
    })
    for (const coin of coinsResult.objects) {
      acc += BigInt(coin.balance)
      coins.push(coin)
    }
    cursor = coinsResult.cursor
    hasNextPage = coinsResult.hasNextPage
  }

  return coins
}

export async function createCoinOfExactValue(
  client: ClientWithCoreApi,
  tx: Transaction,
  address: string,
  coinType: string,
  amount: Amount
): Promise<TransactionObjectArgument> {
  if (compressSuiType(coinType) === SUI_TYPE_ARG) {
    return tx.splitCoins(tx.gas, [amount.int])
  }

  const coins = await getCoins(client, address, coinType, amount)
  return createCoinOfExactValueFromList(tx, coins, amount.int, coinType)
}

export async function createBalanceOfExactValue(
  client: ClientWithCoreApi,
  tx: Transaction,
  address: string,
  coinType: string,
  amount: Amount
): Promise<TransactionObjectArgument> {
  const c = await createCoinOfExactValue(client, tx, address, coinType, amount)
  return coin.intoBalance(tx, coinType, c)
}

export async function createCoinOfMinimumValue(
  client: ClientWithCoreApi,
  tx: Transaction,
  address: string,
  coinType: string,
  amount: Amount
): Promise<{ coin: TransactionObjectArgument; amount: bigint | Amount }> {
  if (coinType === SUI_TYPE_ARG) {
    return {
      coin: tx.splitCoins(tx.gas, [amount.int]),
      amount: amount.int,
    }
  }

  const coins = await getCoins(client, address, coinType, amount)
  const res = createCoinOfMinimumValueFromList(tx, coins, amount.int, coinType)
  return {
    coin: res.coin,
    amount: Amount.fromInt(res.amount, amount.decimals),
  }
}
