import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'
import * as balance from '../../gen/sui/balance/functions'
import * as bluefinUtil from '../../gen/kai-leverage-util/bluefin-spot/functions'
import { findRoute, findRouteStep, RouteStep, swapWithRoute } from '.'
import { CoinInfo } from '../../coin-info'
import { PhantomTypeArgument } from '../../gen/_framework/reified'
import * as bluefinSpot from '../../gen/bluefin-spot/pool/functions'
import { PoolInfo } from './pool-info'
import { BLUEFIN_GLOBAL_CONFIG_ID } from '../../constants'

function getSqrtPriceLimit(a2b: boolean) {
  return a2b ? 4295048017n : 79226673515401279992447579054n
}

export function swapStep(tx: Transaction, step: RouteStep, balanceIn: TransactionObjectInput) {
  const { pool, a2b } = step
  const byAmountIn = true

  if (pool.protocol !== 'bluefin') {
    throw new Error(
      `bluefinSwapStep: Only 'bluefin' protocol supported, but got '${pool.protocol}'`
    )
  }

  const coinInInfo = a2b ? pool.coinA : pool.coinB
  const amountIn = balance.value(tx, coinInInfo.typeName, balanceIn)

  const [outA, outB, receipt] = bluefinUtil.flashSwap(
    tx,
    [pool.coinA.typeName, pool.coinB.typeName],
    {
      config: BLUEFIN_GLOBAL_CONFIG_ID,
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

  bluefinUtil.repayFlashSwap(tx, [pool.coinA.typeName, pool.coinB.typeName], {
    config: BLUEFIN_GLOBAL_CONFIG_ID,
    pool: pool.poolId,
    balanceA: repayA,
    balanceB: repayB,
    receipt: receipt,
  })

  return balanceOut
}

export interface SwapArguments {
  balanceIn: TransactionObjectInput
  amount: bigint | TransactionArgument
  byAmountIn: boolean
  coinInInfo: CoinInfo<PhantomTypeArgument>
  coinOutInfo: CoinInfo<PhantomTypeArgument>
}

export function swapSpotDirect(tx: Transaction, args: SwapArguments) {
  const step = findRouteStep(args.coinInInfo, args.coinOutInfo, ['bluefin'])
  if (!step) {
    throw new Error(
      `No route found from ${args.coinInInfo.typeName} to ${args.coinOutInfo.typeName}`
    )
  }
  const { pool, a2b } = step

  if (pool.protocol !== 'bluefin') {
    throw new Error(
      `bluefinSwapStep: Only 'bluefin' protocol supported, but got '${pool.protocol}'`
    )
  }

  const [outA, outB] = bluefinSpot.swap(tx, [pool.coinA.typeName, pool.coinB.typeName], {
    clock: tx.object.clock(),
    protocolConfig: BLUEFIN_GLOBAL_CONFIG_ID,
    pool: pool.poolId,
    balanceA: a2b ? args.balanceIn : balance.zero(tx, pool.coinA.typeName),
    balanceB: a2b ? balance.zero(tx, pool.coinB.typeName) : args.balanceIn,
    a2B: a2b,
    byAmountIn: args.byAmountIn,
    amount: args.amount,
    amountLimit: (1n << 64n) - 1n, // max slippage
    sqrtPriceMaxLimit: getSqrtPriceLimit(a2b),
  })
  return {
    balanceInRemaining: a2b ? outA : outB,
    balanceOut: a2b ? outB : outA,
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
  const route = findRoute(args.coinInInfo, args.coinOutInfo, ['bluefin'])
  if (!route) {
    throw new Error(
      `No route found from ${args.coinInInfo.typeName} to ${args.coinOutInfo.typeName}`
    )
  }
  const { pool, a2b } = route[0]

  if (pool.protocol !== 'bluefin') {
    throw new Error(
      `bluefinFlashSwap: Only 'bluefin' protocol supported, but got '${pool.protocol}'`
    )
  }

  const [outA, outB, receipt] = bluefinUtil.flashSwap(
    tx,
    [pool.coinA.typeName, pool.coinB.typeName],
    {
      config: BLUEFIN_GLOBAL_CONFIG_ID,
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
    repayAmount: bluefinUtil.swapPayAmount(tx, [pool.coinA.typeName, pool.coinB.typeName], receipt),
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
  if (receipt.poolInfo.protocol !== 'bluefin') {
    throw new Error(
      `bluefinRepayFlashSwap: Only 'bluefin' protocol supported, but got '${receipt.poolInfo.protocol}'`
    )
  }

  const repayA = receipt.a2b ? repayBalance : balance.zero(tx, receipt.poolInfo.coinA.typeName)
  const repayB = receipt.a2b ? balance.zero(tx, receipt.poolInfo.coinB.typeName) : repayBalance

  bluefinUtil.repayFlashSwap(
    tx,
    [receipt.poolInfo.coinA.typeName, receipt.poolInfo.coinB.typeName],
    {
      config: BLUEFIN_GLOBAL_CONFIG_ID,
      pool: receipt.poolInfo.poolId,
      balanceA: repayA,
      balanceB: repayB,
      receipt: receipt.object,
    }
  )
}
