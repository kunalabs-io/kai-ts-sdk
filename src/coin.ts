import { CallArg, Transaction, TransactionArgument } from '@mysten/sui/transactions'
import { CoinStruct, SuiClient } from '@mysten/sui/client'
import { Amount } from './amount'
import * as coin from './gen/sui/coin/functions'
import { compressSuiType } from './gen/_framework/util'
import { SUI_TYPE_ARG } from '@mysten/sui/utils'

function coinToObjectArg(coin: CoinStruct): CallArg {
  return {
    $kind: 'Object',
    Object: {
      $kind: 'ImmOrOwnedObject',
      ImmOrOwnedObject: {
        digest: coin.digest,
        objectId: coin.coinObjectId,
        version: coin.version,
      },
    },
  }
}

export function createCoinOfMinimumValueFromList(
  tx: Transaction,
  coins: CoinStruct[],
  amount: bigint,
  coinType: string
) {
  if (amount === 0n) {
    return { coin: coin.zero(tx, coinType), amount: 0n }
  }

  coins = coins.filter(c => compressSuiType(c.coinType) === compressSuiType(coinType))

  // check there is enough balance
  let totalAmt = 0n
  for (const coin of coins) {
    totalAmt += BigInt(coin.balance)
  }
  if (totalAmt < amount) {
    throw new Error('Not enough balance')
  }

  const selectedCoins: Array<CoinStruct> = []
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
  const c: TransactionArgument = tx.object(coinToObjectArg(selectedCoins[0]))

  return {
    coin: c,
    amount: selectedAmount,
  }
}

export function createCoinOfExactValueFromList(
  tx: Transaction,
  coins: CoinStruct[],
  amount: bigint,
  coinType: string
) {
  const res = createCoinOfMinimumValueFromList(tx, coins, amount, coinType)

  // split the coin to the exact amount if necessary
  if (res.amount > amount) {
    return tx.splitCoins(res.coin, [amount])
  } else {
    return res.coin
  }
}

export async function getCoins(
  client: SuiClient,
  address: string,
  coinType: string,
  maxAmount?: Amount
) {
  let acc = 0n
  const coins: Array<CoinStruct> = []
  let cursor = undefined
  let hasNextPage = true
  while (hasNextPage && (!maxAmount || acc < maxAmount.int)) {
    const coinsResult = await client.getCoins({
      owner: address,
      coinType,
      cursor,
    })
    for (const coin of coinsResult.data) {
      acc += BigInt(coin.balance)
      coins.push(coin)
    }
    cursor = coinsResult.nextCursor
    hasNextPage = coinsResult.hasNextPage
  }

  return coins
}

export async function createCoinOfExactValue(
  client: SuiClient,
  tx: Transaction,
  address: string,
  coinType: string,
  amount: Amount
) {
  let coin: TransactionArgument

  if (compressSuiType(coinType) === SUI_TYPE_ARG) {
    coin = tx.splitCoins(tx.gas, [amount.int])
    return coin
  }

  const coins = await getCoins(client, address, coinType, amount)
  return createCoinOfExactValueFromList(tx, coins, amount.int, coinType)
}

export async function createBalanceOfExactValue(
  client: SuiClient,
  tx: Transaction,
  address: string,
  coinType: string,
  amount: Amount
) {
  const c = await createCoinOfExactValue(client, tx, address, coinType, amount)
  return coin.intoBalance(tx, coinType, c)
}

export async function createCoinOfMinimumValue(
  client: SuiClient,
  tx: Transaction,
  address: string,
  coinType: string,
  amount: Amount
) {
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
