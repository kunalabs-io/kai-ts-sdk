import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'
import * as balance from '../../gen/sui/balance/functions'
import * as cetusUtil from '../../gen/kai-leverage-util/cetus/functions'
import { CETUS_GLOBAL_CONFIG_ID } from '../../constants'
import { findRoute, findRouteStep, RouteStep, swapWithRoute } from './index'
import { CoinInfo } from '../../coin-info'
import { PhantomTypeArgument } from '../../gen/_framework/reified'
import * as cetusRouter from '../../gen/cetus/router/functions'
import * as coin from '../../gen/sui/coin/functions'
import { PoolInfo } from './pool-info'

function getSqrtPriceLimit(a2b: boolean) {
  return a2b ? 4295048016n : 79226673515401279992447579055n
}

export function swapStep(tx: Transaction, step: RouteStep, balanceIn: TransactionObjectInput) {
  const { pool, a2b } = step
  const byAmountIn = true

  if (pool.protocol !== 'cetus') {
    throw new Error(`cetusSwapStep: Only 'cetus' protocol supported, but got '${pool.protocol}'`)
  }

  const coinInInfo = a2b ? pool.coinA : pool.coinB
  const amountIn = balance.value(tx, coinInInfo.typeName, balanceIn)

  const [outA, outB, receipt] = cetusUtil.flashSwap(
    tx,
    [pool.coinA.typeName, pool.coinB.typeName],
    {
      config: CETUS_GLOBAL_CONFIG_ID,
      pool: pool.poolId,
      a2B: a2b,
      byAmountIn: byAmountIn,
      amount: amountIn,
      sqrtPriceLimit: getSqrtPriceLimit(a2b),
      clock: tx.object.clock(),
    }
  )
  if (a2b) {
    balance.destroyZero(tx, coinInInfo.typeName, outA)
  } else {
    balance.destroyZero(tx, coinInInfo.typeName, outB)
  }
  const balanceOut = a2b ? outB : outA

  const repayA = a2b ? balanceIn : balance.zero(tx, pool.coinA.typeName)
  const repayB = a2b ? balance.zero(tx, pool.coinB.typeName) : balanceIn

  cetusUtil.repayFlashSwap(tx, [pool.coinA.typeName, pool.coinB.typeName], {
    config: CETUS_GLOBAL_CONFIG_ID,
    pool: pool.poolId,
    coinA: repayA,
    coinB: repayB,
    receipt: receipt,
  })

  return balanceOut
}

export interface SwapArguments {
  coinIn: TransactionObjectInput
  amount: bigint | TransactionArgument
  byAmountIn: boolean
  coinInInfo: CoinInfo<PhantomTypeArgument>
  coinOutInfo: CoinInfo<PhantomTypeArgument>
}

export function swapSpotDirect(tx: Transaction, args: SwapArguments) {
  const step = findRouteStep(args.coinInInfo, args.coinOutInfo, ['cetus'])
  if (!step) {
    throw new Error(
      `No route found from ${args.coinInInfo.typeName} to ${args.coinOutInfo.typeName}`
    )
  }
  const { pool, a2b } = step

  if (pool.protocol !== 'cetus') {
    throw new Error(`cetusSwapStep: Only 'cetus' protocol supported, but got '${pool.protocol}'`)
  }

  const [outA, outB] = cetusRouter.swap(tx, [pool.coinA.typeName, pool.coinB.typeName], {
    globalConfig: CETUS_GLOBAL_CONFIG_ID,
    pool: pool.poolId,
    coin1: a2b ? args.coinIn : coin.zero(tx, pool.coinA.typeName),
    coin2: a2b ? coin.zero(tx, pool.coinB.typeName) : args.coinIn,
    bool1: a2b,
    bool2: args.byAmountIn,
    u64: args.amount,
    u128: getSqrtPriceLimit(a2b),
    bool3: false,
    clock: tx.object.clock(),
  })
  return {
    coinInRemaining: a2b ? outA : outB,
    coinOut: a2b ? outB : outA,
  }
}

export interface FlashSwapArguments {
  amount: bigint | TransactionArgument
  byAmountIn: boolean
  coinInInfo: CoinInfo<PhantomTypeArgument>
  coinOutInfo: CoinInfo<PhantomTypeArgument>
}

export interface FlashSwapReceipt {
  readonly poolInfo: PoolInfo
  readonly a2b: boolean
  readonly object: TransactionObjectInput
}

export function flashSwap(tx: Transaction, args: FlashSwapArguments) {
  const route = findRoute(args.coinInInfo, args.coinOutInfo, ['cetus'])
  if (!route) {
    throw new Error(
      `No route found from ${args.coinInInfo.typeName} to ${args.coinOutInfo.typeName}`
    )
  }
  const { pool, a2b } = route[0]

  if (pool.protocol !== 'cetus') {
    throw new Error(`cetusFlashSwap: Only 'cetus' protocol supported, but got '${pool.protocol}'`)
  }

  const [outA, outB, receipt] = cetusUtil.flashSwap(
    tx,
    [pool.coinA.typeName, pool.coinB.typeName],
    {
      config: CETUS_GLOBAL_CONFIG_ID,
      pool: pool.poolId,
      a2B: a2b,
      byAmountIn: args.byAmountIn,
      amount: args.amount,
      sqrtPriceLimit: getSqrtPriceLimit(a2b),
      clock: tx.object.clock(),
    }
  )
  if (a2b) {
    balance.destroyZero(tx, args.coinInInfo.typeName, outA)
  } else {
    balance.destroyZero(tx, args.coinInInfo.typeName, outB)
  }

  let balanceOut: TransactionObjectInput = a2b ? outB : outA
  if (route.length > 1) {
    balanceOut = swapWithRoute(tx, route.slice(1), balanceOut)
  }

  return {
    balanceOut,
    repayAmount: cetusUtil.swapPayAmount(tx, [pool.coinA.typeName, pool.coinB.typeName], receipt),
    receipt: {
      poolInfo: pool,
      a2b,
      object: receipt,
    } as FlashSwapReceipt,
  }
}

export function repayFlashSwap(
  tx: Transaction,
  repayBalance: TransactionObjectInput,
  receipt: FlashSwapReceipt
) {
  if (receipt.poolInfo.protocol !== 'cetus') {
    throw new Error(
      `cetusRepayFlashSwap: Only 'cetus' protocol supported, but got '${receipt.poolInfo.protocol}'`
    )
  }

  const repayA = receipt.a2b ? repayBalance : balance.zero(tx, receipt.poolInfo.coinA.typeName)
  const repayB = receipt.a2b ? balance.zero(tx, receipt.poolInfo.coinB.typeName) : repayBalance

  cetusUtil.repayFlashSwap(tx, [receipt.poolInfo.coinA.typeName, receipt.poolInfo.coinB.typeName], {
    config: CETUS_GLOBAL_CONFIG_ID,
    pool: receipt.poolInfo.poolId,
    coinA: repayA,
    coinB: repayB,
    receipt: receipt.object,
  })
}
