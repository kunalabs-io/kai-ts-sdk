import {
  Transaction,
  TransactionArgument,
  TransactionObjectArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import * as balance from '../../gen/sui/balance/functions'
import * as cetusUtil from '../../gen/kai-leverage-util/cetus/functions'
import { CETUS_GLOBAL_CONFIG_ID } from '../../protocol-infra'
import { findRoute, findRouteStep, RouteStep, swapWithRoute } from './index'
import { CoinInfo } from '../../coin-info'
import { PhantomTypeArgument } from '../../gen/_framework/reified'
import * as cetusRouter from '../../gen/cetus-integrate/router/functions'
import * as coin from '../../gen/sui/coin/functions'
import { PoolInfo } from './pool-info'

function getSqrtPriceLimit(a2b: boolean) {
  return a2b ? 4295048016n : 79226673515401279992447579055n
}

export function swapStep(
  tx: Transaction,
  step: RouteStep,
  balanceIn: TransactionObjectInput
): TransactionObjectArgument {
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

export function swapSpotDirect(
  tx: Transaction,
  args: SwapArguments
): {
  coinInRemaining: TransactionArgument
  coinOut: TransactionArgument
} {
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

function flashSwapHop(
  tx: Transaction,
  step: RouteStep,
  byAmountIn: boolean,
  amount: bigint | TransactionArgument
): {
  balanceOut: TransactionObjectArgument
  payAmount: TransactionResult
  receipt: TransactionObjectArgument
} {
  const { pool, a2b } = step

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
      byAmountIn,
      amount,
      sqrtPriceLimit: getSqrtPriceLimit(a2b),
      clock: tx.object.clock(),
    }
  )
  const coinInType = a2b ? pool.coinA.typeName : pool.coinB.typeName
  balance.destroyZero(tx, coinInType, a2b ? outA : outB)

  return {
    balanceOut: a2b ? outB : outA,
    payAmount: cetusUtil.swapPayAmount(tx, [pool.coinA.typeName, pool.coinB.typeName], receipt),
    receipt,
  }
}

function repayFlashSwapForStep(
  tx: Transaction,
  step: RouteStep,
  receipt: TransactionObjectInput,
  repayBalance: TransactionObjectInput
): void {
  const { pool, a2b } = step

  if (pool.protocol !== 'cetus') {
    throw new Error(
      `cetusRepayFlashSwap: Only 'cetus' protocol supported, but got '${pool.protocol}'`
    )
  }

  const repayA = a2b ? repayBalance : balance.zero(tx, pool.coinA.typeName)
  const repayB = a2b ? balance.zero(tx, pool.coinB.typeName) : repayBalance

  cetusUtil.repayFlashSwap(tx, [pool.coinA.typeName, pool.coinB.typeName], {
    config: CETUS_GLOBAL_CONFIG_ID,
    pool: pool.poolId,
    coinA: repayA,
    coinB: repayB,
    receipt,
  })
}

export function flashSwap(
  tx: Transaction,
  args: FlashSwapArguments
): {
  balanceOut: TransactionObjectInput
  repayAmount: TransactionResult
  receipt: FlashSwapReceipt
} {
  const route = findRoute(args.coinInInfo, args.coinOutInfo, ['cetus'])
  if (!route || route.length === 0) {
    throw new Error(
      `No route found from ${args.coinInInfo.typeName} to ${args.coinOutInfo.typeName}`
    )
  }
  const first = route[0]

  if (args.byAmountIn) {
    // `amount` is denominated in the input coin, so it applies directly to the
    // first hop; the proceeds are then pushed forward through the rest of the route.
    const hop = flashSwapHop(tx, first, true, args.amount)

    let balanceOut: TransactionObjectInput = hop.balanceOut
    if (route.length > 1) {
      balanceOut = swapWithRoute(tx, route.slice(1), balanceOut)
    }

    return {
      balanceOut,
      repayAmount: hop.payAmount,
      receipt: {
        poolInfo: first.pool,
        a2b: first.a2b,
        object: hop.receipt,
      } as FlashSwapReceipt,
    }
  }

  // `amount` is denominated in the output coin, which is the *last* hop's output —
  // applying it to the first hop would request an amount in the wrong coin. Chain
  // flash swaps back to front instead: each hop borrows exactly what the hop after
  // it owes and repays that hop's receipt with its own proceeds. Only the first
  // hop's receipt is left open for the caller, so `repayAmount` is in the input coin.
  let amount: bigint | TransactionArgument = args.amount
  let balanceOut: TransactionObjectInput | undefined = undefined
  let open: { step: RouteStep; receipt: TransactionObjectArgument } | undefined = undefined
  let payAmount!: TransactionResult
  for (let i = route.length - 1; i >= 0; i--) {
    const hop = flashSwapHop(tx, route[i], false, amount)
    if (open === undefined) {
      balanceOut = hop.balanceOut
    } else {
      repayFlashSwapForStep(tx, open.step, open.receipt, hop.balanceOut)
    }
    open = { step: route[i], receipt: hop.receipt }
    amount = payAmount = hop.payAmount
  }

  return {
    balanceOut: balanceOut!,
    repayAmount: payAmount,
    receipt: {
      poolInfo: first.pool,
      a2b: first.a2b,
      object: open!.receipt,
    } as FlashSwapReceipt,
  }
}

export function repayFlashSwap(
  tx: Transaction,
  repayBalance: TransactionObjectInput,
  receipt: FlashSwapReceipt
): void {
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
