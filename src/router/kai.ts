import { Price } from '../price'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'
import { PhantomTypeArgument } from '../gen/_framework/reified'
import * as balance from '../gen/sui/balance/functions'
import { SUI_CLOCK_OBJECT_ID, SUI_SYSTEM_STATE_OBJECT_ID } from '@mysten/sui/utils'
import { compressSuiType } from '../gen/_framework/util'
import * as cetusUtil from '../gen/kai-leverage-util/cetus/functions'
import { swap as swap_ } from '../gen/cetus/router/functions'
import * as coin from '../gen/sui/coin/functions'
import {
  BLUE,
  CETUS,
  CoinInfo,
  SUI,
  suiUSDT,
  USDC,
  whUSDCe,
  whUSDTe,
  stSUI,
  USDY,
  DEEP,
} from '../coin-info'
import { CETUS_GLOBAL_CONFIG_ID } from '../constants'
import {
  Router,
  RouterSwapBalanceArgs,
  RouterSwapBalanceResult,
  RouterSwapCoinResult,
  SwapExactOutBalanceResult,
  SwapExactOutCoinResult,
} from './adapter'

export interface PoolInfo {
  coinA: CoinInfo<PhantomTypeArgument>
  coinB: CoinInfo<PhantomTypeArgument>
  poolId: string
}

export interface RedeemInfo {
  coinA: CoinInfo<PhantomTypeArgument>
  coinB: CoinInfo<PhantomTypeArgument>
  protocol: 'stsui'
}

export type SwapInfo = PoolInfo | RedeemInfo

const poolInfos: Array<SwapInfo> = [
  {
    coinA: whUSDTe,
    coinB: whUSDCe,
    poolId: '0xc8d7a1503dc2f9f5b05449a87d8733593e2f0f3e7bffd90541252782e4d2ca20',
  },
  {
    coinA: whUSDCe,
    coinB: SUI,
    poolId: '0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630',
  },
  {
    coinA: whUSDTe,
    coinB: SUI,
    poolId: '0x06d8af9e6afd27262db436f0d37b304a041f710c3ea1fa4c3a9bab36b3569ad3',
  },
  {
    coinA: CETUS,
    coinB: SUI,
    poolId: '0x2e041f3fd93646dcc877f783c1f2b7fa62d30271bdef1f21ef002cebf857bded',
  },
  {
    coinA: USDC,
    coinB: whUSDTe,
    poolId: '0x6bd72983b0b5a77774af8c77567bb593b418ae3cd750a5926814fcd236409aaa',
  },
  {
    coinA: USDC,
    coinB: SUI,
    poolId: '0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105',
  },
  {
    coinA: BLUE,
    coinB: SUI,
    poolId: '0x040dc6a93bd4f26ea9507c70f19eb1a060fd5cb9c3718db372f4ae711ffbbb29',
  },
  {
    coinA: USDC,
    coinB: suiUSDT,
    poolId: '0x7df346f8ef98ad20869ff6d2fc7c43c00403a524987509091b39ce61dde00957',
  },
  {
    coinA: stSUI,
    coinB: SUI,
    protocol: 'stsui',
  },
  {
    coinA: USDC,
    coinB: USDY,
    poolId: '0xdcd762ad374686fa890fc4f3b9bbfe2a244e713d7bffbfbd1b9221cb290da2ed',
  },
  {
    coinA: DEEP,
    coinB: SUI,
    poolId: '0xe01243f37f712ef87e556afb9b1d03d0fae13f96d324ec912daffc339dfdcbd2',
  },
]

export interface GetSwapInfoResult {
  swapInfo: SwapInfo
  a2b: boolean
  sqrtPriceLimit: bigint
}

export function getSwapInfo(
  coinIn: CoinInfo<PhantomTypeArgument>,
  coinOut: CoinInfo<PhantomTypeArgument>
): GetSwapInfoResult {
  const swapInfo = poolInfos.find(
    p =>
      (compressSuiType(p.coinA.typeName) === compressSuiType(coinIn.typeName) &&
        compressSuiType(p.coinB.typeName) === compressSuiType(coinOut.typeName)) ||
      (compressSuiType(p.coinA.typeName) === compressSuiType(coinOut.typeName) &&
        compressSuiType(p.coinB.typeName) === compressSuiType(coinIn.typeName))
  )
  if (!swapInfo) {
    throw new Error(`No route found for ${coinIn.typeName} to ${coinOut.typeName}`)
  }

  const a2b = compressSuiType(swapInfo.coinA.typeName) === compressSuiType(coinIn.typeName)
  const sqrtPriceLimit = a2b ? 4295048016n : 79226673515401279992447579055n
  return { swapInfo, a2b, sqrtPriceLimit }
}

export function redeemStSuiCoin(tx: Transaction, coinIn: TransactionObjectInput) {
  const coinOut = tx.moveCall({
    target: `0x059f94b85c07eb74d2847f8255d8cc0a67c9a8dcc039eabf9f8b9e23a0de2700::liquid_staking::redeem`,
    arguments: [
      tx.object('0x1adb343ab351458e151bc392fbf1558b3332467f23bda45ae67cd355a57fd5f5'),
      tx.object(coinIn),
      tx.object(SUI_SYSTEM_STATE_OBJECT_ID),
    ],
    typeArguments: [stSUI.typeName],
  })

  return coinOut
}

export function redeemStSuiBalance(tx: Transaction, balanceIn: TransactionObjectInput) {
  const coinOut = redeemStSuiCoin(tx, coin.fromBalance(tx, stSUI.typeName, balanceIn))
  return coin.intoBalance(tx, SUI.typeName, coinOut)
}

export interface SwapArguments {
  coinIn: TransactionObjectInput
  amount: bigint | TransactionArgument
  byAmountIn: boolean
  coinInInfo: CoinInfo<PhantomTypeArgument>
  coinOutInfo: CoinInfo<PhantomTypeArgument>
}

export function cetusSwap(tx: Transaction, args: SwapArguments) {
  const { swapInfo, a2b, sqrtPriceLimit } = getSwapInfo(args.coinInInfo, args.coinOutInfo)

  if ('protocol' in swapInfo) {
    if (swapInfo.protocol !== 'stsui') {
      throw new Error(`protocol ${swapInfo.protocol} not supported`)
    }
    if (!a2b) {
      throw new Error('stSUI minting not supported')
    }

    return {
      coinOut: redeemStSuiCoin(tx, args.coinIn),
      coinInRemaining: coin.zero(tx, swapInfo.coinA.typeName),
    }
  }

  const [outA, outB] = swap_(tx, [swapInfo.coinA.typeName, swapInfo.coinB.typeName], {
    globalConfig: CETUS_GLOBAL_CONFIG_ID,
    pool: swapInfo.poolId,
    coin1: a2b ? args.coinIn : coin.zero(tx, swapInfo.coinA.typeName),
    coin2: a2b ? coin.zero(tx, swapInfo.coinB.typeName) : args.coinIn,
    bool1: a2b,
    bool2: args.byAmountIn,
    u64: args.amount,
    u128: sqrtPriceLimit,
    bool3: false,
    clock: SUI_CLOCK_OBJECT_ID,
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
  const { swapInfo, a2b, sqrtPriceLimit } = getSwapInfo(args.coinInInfo, args.coinOutInfo)

  if ('protocol' in swapInfo) {
    throw new Error('stSUI flash swap not supported')
  }

  const poolInfo = swapInfo as PoolInfo

  const [outA, outB, receipt] = cetusUtil.flashSwap(
    tx,
    [poolInfo.coinA.typeName, poolInfo.coinB.typeName],
    {
      config: CETUS_GLOBAL_CONFIG_ID,
      pool: poolInfo.poolId,
      a2B: a2b,
      byAmountIn: args.byAmountIn,
      amount: args.amount,
      sqrtPriceLimit,
      clock: SUI_CLOCK_OBJECT_ID,
    }
  )
  if (a2b) {
    balance.destroyZero(tx, args.coinInInfo.typeName, outA)
  } else {
    balance.destroyZero(tx, args.coinInInfo.typeName, outB)
  }

  const balanceOut = a2b ? outB : outA

  return {
    balanceOut,
    repayAmount: cetusUtil.swapPayAmount(
      tx,
      [poolInfo.coinA.typeName, poolInfo.coinB.typeName],
      receipt
    ),
    receipt: {
      poolInfo,
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

export interface SwapArgs {
  balanceIn: TransactionObjectInput
  inInfo: CoinInfo<PhantomTypeArgument>
  outInfo: CoinInfo<PhantomTypeArgument>
}

function swapInner(
  tx: Transaction,
  coinInInfo: CoinInfo<PhantomTypeArgument>,
  balanceIn: TransactionObjectInput,
  amountIn: bigint | TransactionArgument,
  pool: GetSwapInfoResult
) {
  const { swapInfo, a2b, sqrtPriceLimit } = pool
  const byAmountIn = true

  if ('protocol' in swapInfo) {
    if (swapInfo.protocol !== 'stsui') {
      throw new Error(`protocol ${swapInfo.protocol} not supported`)
    }
    if (!a2b) {
      throw new Error('stSUI minting not supported')
    }

    return redeemStSuiBalance(tx, balanceIn)
  }

  const [outA, outB, receipt] = cetusUtil.flashSwap(
    tx,
    [swapInfo.coinA.typeName, swapInfo.coinB.typeName],
    {
      config: CETUS_GLOBAL_CONFIG_ID,
      pool: swapInfo.poolId,
      a2B: a2b,
      byAmountIn: byAmountIn,
      amount: amountIn,
      sqrtPriceLimit,
      clock: SUI_CLOCK_OBJECT_ID,
    }
  )
  if (a2b) {
    balance.destroyZero(tx, coinInInfo.typeName, outA)
  } else {
    balance.destroyZero(tx, coinInInfo.typeName, outB)
  }
  const balanceOut = a2b ? outB : outA

  const repayA = a2b ? balanceIn : balance.zero(tx, swapInfo.coinA.typeName)
  const repayB = a2b ? balance.zero(tx, swapInfo.coinB.typeName) : balanceIn

  cetusUtil.repayFlashSwap(tx, [swapInfo.coinA.typeName, swapInfo.coinB.typeName], {
    config: CETUS_GLOBAL_CONFIG_ID,
    pool: swapInfo.poolId,
    coinA: repayA,
    coinB: repayB,
    receipt: receipt,
  })

  return balanceOut
}

function swap(tx: Transaction, args: SwapArgs) {
  if (compressSuiType(args.inInfo.typeName) === compressSuiType(args.outInfo.typeName)) {
    return args.balanceIn
  }

  let swap1: GetSwapInfoResult

  let swap2: GetSwapInfoResult | undefined
  let hop2Intermediate: CoinInfo<PhantomTypeArgument> | undefined
  let swap3: GetSwapInfoResult | undefined
  let hop3Intermediate: CoinInfo<PhantomTypeArgument> | undefined

  try {
    swap1 = getSwapInfo(args.inInfo, args.outInfo)
  } catch (e) {
    try {
      try {
        const toSuiPool = getSwapInfo(args.inInfo, SUI)
        const toOutPool = getSwapInfo(SUI, args.outInfo)
        swap1 = toSuiPool
        swap2 = toOutPool
        hop2Intermediate = SUI
      } catch (e) {
        const toSuiPool = getSwapInfo(args.inInfo, SUI)
        const toUsdcPool = getSwapInfo(SUI, USDC)
        const toOutPool = getSwapInfo(USDC, args.outInfo)
        swap1 = toSuiPool
        swap2 = toUsdcPool
        swap3 = toOutPool
        hop2Intermediate = SUI
        hop3Intermediate = USDC
      }
    } catch (e) {
      const toUsdcPool = getSwapInfo(args.inInfo, USDC)
      const toOutPool = getSwapInfo(USDC, args.outInfo)
      swap1 = toUsdcPool
      swap2 = toOutPool
      hop2Intermediate = USDC
    }
  }

  const amountIn = balance.value(tx, args.inInfo.typeName, args.balanceIn)
  const out1 = swapInner(tx, args.inInfo, args.balanceIn, amountIn, swap1)
  if (!swap2 || !hop2Intermediate) {
    return out1
  }

  let out2: TransactionObjectInput
  {
    const coinInInfo = hop2Intermediate
    const balanceIn = out1
    const amountIn = balance.value(tx, hop2Intermediate.typeName, out1)
    out2 = swapInner(tx, coinInInfo, balanceIn, amountIn, swap2)
  }
  if (!swap3 || !hop3Intermediate) {
    return out2
  }

  let out3: TransactionObjectInput
  {
    const coinInInfo = hop3Intermediate
    const balanceIn = out2
    const amountIn = balance.value(tx, hop3Intermediate.typeName, out2)
    out3 = swapInner(tx, coinInInfo, balanceIn, amountIn, swap3)
  }
  return out3
}

export class KaiRouterAdapter implements Router {
  async initialize() {}

  async swapBalance(args: RouterSwapBalanceArgs): Promise<RouterSwapBalanceResult> {
    if (args.amountIn === 0n) {
      balance.destroyZero(args.tx, args.inInfo.typeName, args.balanceIn)
      const balanceOut = balance.zero(args.tx, args.outInfo.typeName)
      return {
        tx: args.tx,
        balanceOut,
      }
    }

    const balanceOut = swap(args.tx, {
      balanceIn: args.balanceIn,
      inInfo: args.inInfo,
      outInfo: args.outInfo,
    }) as TransactionArgument

    return {
      tx: args.tx,
      balanceOut: balanceOut,
    }
  }

  async swapCoin(): Promise<RouterSwapCoinResult> {
    throw new Error('not implemented')
  }

  async getPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(): Promise<
    Price<X, Y>
  > {
    throw new Error('not implemented')
  }

  async swapExactOutBalance(): Promise<SwapExactOutBalanceResult> {
    throw new Error('not implemented')
  }

  async swapExactOutCoin(): Promise<SwapExactOutCoinResult> {
    throw new Error('not implemented')
  }
}
