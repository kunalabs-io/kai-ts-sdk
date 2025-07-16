import { Aftermath, RouterProtocolName } from 'aftermath-ts-sdk'
import { PhantomTypeArgument } from '../gen/_framework/reified'
import { Price } from '../price'
import Decimal from 'decimal.js'
import * as coin from '../gen/sui/coin/functions'
import * as balance from '../gen/sui/balance/functions'
import {
  GetPriceArgs,
  Router,
  RouterSwapBalanceArgs,
  RouterSwapBalanceResult,
  RouterSwapCoinArgs,
  RouterSwapCoinResult,
  RouterSwapExactOutBalanceArgs,
  RouterSwapExactOutCoinArgs,
  SwapExactOutBalanceResult,
  SwapExactOutCoinResult,
} from './adapter'

export const AF_AGG_ALL_PROTOCOLS: RouterProtocolName[] = [
  'Aftermath',
  'BlueMove',
  'Cetus',
  'DeepBook',
  'DeepBookV3',
  'DoubleUpPump',
  'FlowX',
  'FlowXClmm',
  'HopFun',
  'Kriya',
  'KriyaClmm',
  'MovePump',
  'SuiSwap',
  'Turbos',
  'SpringSui',
  'Bluefin',
  'TurbosFun',
]

export class AfRouterAdapter implements Router {
  private afSdk = new Aftermath('MAINNET')
  private router = this.afSdk.Router()

  id(): string {
    return 'aftermath-aggregator'
  }

  async initialize() {}

  async swapBalance(args: RouterSwapBalanceArgs): Promise<RouterSwapBalanceResult> {
    if (args.inInfo.typeName === args.outInfo.typeName) {
      return { tx: args.tx, balanceOut: args.balanceIn }
    }
    if (args.amountIn === 0n) {
      balance.destroyZero(args.tx, args.inInfo.typeName, args.balanceIn)
      const balanceOut = balance.zero(args.tx, args.outInfo.typeName)
      return { tx: args.tx, balanceOut }
    }

    const coinIn = coin.fromBalance(args.tx, args.inInfo.typeName, args.balanceIn)

    const { tx, coinOut } = await this.swapCoin({
      tx: args.tx,
      inInfo: args.inInfo,
      outInfo: args.outInfo,
      coinIn,
      amountIn: args.amountIn,
      sender: args.sender,
      slippage: args.slippage,
      protocolDenylist: args.protocolDenylist,
    })

    const balanceOut = coin.intoBalance(tx, args.outInfo.typeName, coinOut)

    return { tx, balanceOut }
  }

  async swapCoin(args: RouterSwapCoinArgs): Promise<RouterSwapCoinResult> {
    if (args.inInfo.typeName === args.outInfo.typeName) {
      return { tx: args.tx, coinOut: args.coinIn }
    }
    if (args.amountIn === 0n) {
      coin.destroyZero(args.tx, args.inInfo.typeName, args.coinIn)
      const coinOut = coin.zero(args.tx, args.outInfo.typeName)
      return { tx: args.tx, coinOut }
    }

    const route = await this.router.getCompleteTradeRouteGivenAmountIn({
      coinInType: args.inInfo.typeName,
      coinOutType: args.outInfo.typeName,
      coinInAmount: args.amountIn,
      protocolBlacklist: (args.protocolDenylist as RouterProtocolName[]) || [],
    })

    const { tx, coinOutId } = await this.router.addTransactionForCompleteTradeRoute({
      tx: args.tx,
      walletAddress: args.sender,
      completeRoute: route,
      slippage: args.slippage,
      coinInId: args.coinIn,
    })

    if (!coinOutId) {
      throw new Error('expected coinOutId to be returned')
    }

    return { tx, coinOut: coinOutId }
  }

  async getPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    args: GetPriceArgs<X, Y>
  ): Promise<Price<X, Y>> {
    if (args.amountIn === 0n) {
      return Price.fromHuman(args.X, args.Y, 0)
    }

    const coinInType = args.xToY ? args.X.typeName : args.Y.typeName
    const coinOutType = args.xToY ? args.Y.typeName : args.X.typeName

    const route = await this.router.getCompleteTradeRouteGivenAmountIn({
      coinInType,
      coinOutType,
      coinInAmount: args.amountIn,
      protocolBlacklist: (args.protocolDenylist as RouterProtocolName[]) || [],
    })

    const spotPrice = new Decimal(route.spotPrice)

    if (args.xToY) {
      return Price.fromNumeric(args.X, args.Y, spotPrice.pow(-1))
    } else {
      return Price.fromNumeric(args.X, args.Y, spotPrice)
    }
  }

  async swapExactOutBalance(
    args: RouterSwapExactOutBalanceArgs
  ): Promise<SwapExactOutBalanceResult> {
    if (args.inInfo.typeName === args.outInfo.typeName) {
      return { tx: args.tx, balanceOut: args.balanceIn }
    }

    const coinIn = coin.fromBalance(
      args.tx,
      args.inInfo.typeName,
      balance.withdrawAll(args.tx, args.inInfo.typeName, args.balanceIn)
    )

    const { tx, coinOut } = await this.swapExactOutCoin({
      tx: args.tx,
      inInfo: args.inInfo,
      outInfo: args.outInfo,
      coinIn,
      amountOut: args.amountOut,
      sender: args.sender,
      slippage: args.slippage,
      protocolDenylist: args.protocolDenylist,
    })

    const balanceOut = coin.intoBalance(tx, args.outInfo.typeName, coinOut)
    balance.join(tx, args.inInfo.typeName, {
      self: args.balanceIn,
      balance: coin.intoBalance(tx, args.inInfo.typeName, coinIn),
    })

    return { tx, balanceOut }
  }

  async swapExactOutCoin(args: RouterSwapExactOutCoinArgs): Promise<SwapExactOutCoinResult> {
    if (args.inInfo.typeName === args.outInfo.typeName) {
      return { tx: args.tx, coinOut: args.coinIn }
    }

    const route = await this.router.getCompleteTradeRouteGivenAmountOut({
      coinInType: args.inInfo.typeName,
      coinOutType: args.outInfo.typeName,
      coinOutAmount: args.amountOut,
      slippage: args.slippage,
      protocolBlacklist: (args.protocolDenylist as RouterProtocolName[]) || [],
    })
    const coinIn = coin.split(args.tx, args.inInfo.typeName, {
      self: args.coinIn,
      splitAmount: route.coinIn.amount,
    })

    const { tx, coinOutId } = await this.router.addTransactionForCompleteTradeRoute({
      tx: args.tx,
      walletAddress: args.sender,
      completeRoute: route,
      slippage: args.slippage,
      coinInId: coinIn,
    })

    if (!coinOutId) {
      throw new Error('expected coinOutId to be returned')
    }

    return { tx, coinOut: coinOutId }
  }

  static protocolList(): RouterProtocolName[] {
    return [
      'Aftermath',
      'BlueMove',
      'Cetus',
      'DeepBook',
      'DeepBookV3',
      'DoubleUpPump',
      'FlowX',
      'FlowXClmm',
      'HopFun',
      'Kriya',
      'KriyaClmm',
      'MovePump',
      'SuiSwap',
      'Turbos',
      'SpringSui',
      'Bluefin',
      'TurbosFun',
    ]
  }

  protocolList(): RouterProtocolName[] {
    return AfRouterAdapter.protocolList()
  }
}
