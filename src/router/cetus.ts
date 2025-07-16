import {
  GetPriceArgs,
  Router,
  RouterSwapBalanceArgs,
  RouterSwapCoinArgs,
  SwapExactOutCoinResult,
  SwapExactOutBalanceResult,
  RouterSwapBalanceResult,
  RouterSwapCoinResult,
  RouterSwapExactOutBalanceArgs,
  RouterSwapExactOutCoinArgs,
} from './adapter'
import * as balance from '../gen/sui/balance/functions'
import { AggregatorClient } from '@cetusprotocol/aggregator-sdk'
import BN from 'bn.js'
import * as coin from '../gen/sui/coin/functions'
import Decimal from 'decimal.js'
import { PhantomTypeArgument } from '../gen/_framework/reified'
import { Price } from '../price'
import * as agg from '@cetusprotocol/aggregator-sdk'

export class CetusAggregatorAdapter implements Router {
  constructor(private readonly aggregator: AggregatorClient) {}

  id(): string {
    return 'cetus-aggregator'
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
    const coinOut = await this.swapCoin({
      tx: args.tx,
      inInfo: args.inInfo,
      outInfo: args.outInfo,
      coinIn,
      amountIn: args.amountIn,
      sender: args.sender,
      slippage: args.slippage,
      protocolDenylist: args.protocolDenylist,
    })
    const balanceOut = coin.intoBalance(args.tx, args.outInfo.typeName, coinOut.coinOut)

    return {
      tx: args.tx,
      balanceOut,
    }
  }

  private getProvidersFromDenylist(denylist: string[]): string[] {
    return CetusAggregatorAdapter.protocolList().filter(protocol => !denylist.includes(protocol))
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

    const route = await this.aggregator.findRouters({
      from: args.inInfo.typeName,
      target: args.outInfo.typeName,
      amount: new BN(args.amountIn.toString()),
      byAmountIn: true,
      providers: this.getProvidersFromDenylist(args.protocolDenylist || []),
    })
    if (!route) {
      throw new Error('Route is null')
    }

    const coinIn = coin.split(args.tx, args.inInfo.typeName, {
      self: args.coinIn,
      splitAmount: args.amountIn,
    })
    coin.destroyZero(args.tx, args.inInfo.typeName, args.coinIn)

    const coinOut = await this.aggregator.routerSwap({
      routers: route,
      inputCoin: coinIn,
      slippage: args.slippage,
      txb: args.tx,
    })

    return {
      tx: args.tx,
      coinOut,
    }
  }

  async getPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    args: GetPriceArgs<X, Y>
  ): Promise<Price<X, Y>> {
    if (args.X.typeName === args.Y.typeName) {
      return Price.fromNumeric(args.X, args.Y, new Decimal(1))
    }
    if (args.amountIn === 0n) {
      return Price.fromNumeric(args.X, args.Y, new Decimal(0))
    }

    const route = await this.aggregator.findRouters({
      from: args.X.typeName,
      target: args.Y.typeName,
      amount: new BN(args.amountIn.toString()),
      byAmountIn: true,
      providers: this.getProvidersFromDenylist(args.protocolDenylist || []),
    })
    if (!route) {
      throw new Error('Route is null')
    }

    const numeric = new Decimal(route.amountOut.toString()).div(route.amountIn.toString())
    return Price.fromNumeric(args.X, args.Y, numeric)
  }

  async swapExactOutBalance(
    args: RouterSwapExactOutBalanceArgs
  ): Promise<SwapExactOutBalanceResult> {
    if (args.inInfo.typeName === args.outInfo.typeName) {
      return { tx: args.tx, balanceOut: args.balanceIn }
    }

    const route = await this.aggregator.findRouters({
      from: args.inInfo.typeName,
      target: args.outInfo.typeName,
      amount: new BN(args.amountOut.toString()),
      byAmountIn: false,
      providers: this.getProvidersFromDenylist(args.protocolDenylist || []),
    })
    if (!route) {
      throw new Error('Route is null')
    }

    const amountIn = BigInt(
      new Decimal(route.amountIn.toString())
        .mul(new Decimal(1).add(new Decimal(args.slippage)))
        .toFixed(0, Decimal.ROUND_CEIL)
    )
    const coinIn = coin.fromBalance(
      args.tx,
      args.inInfo.typeName,
      balance.split(args.tx, args.inInfo.typeName, {
        self: args.balanceIn,
        value: amountIn,
      })
    )

    const coinOut = await this.aggregator.routerSwap({
      routers: route,
      inputCoin: coinIn,
      slippage: args.slippage,
      txb: args.tx,
    })

    const balanceOut = coin.intoBalance(args.tx, args.outInfo.typeName, coinOut)

    return {
      tx: args.tx,
      balanceOut,
    }
  }

  async swapExactOutCoin(args: RouterSwapExactOutCoinArgs): Promise<SwapExactOutCoinResult> {
    if (args.inInfo.typeName === args.outInfo.typeName) {
      return { tx: args.tx, coinOut: args.coinIn }
    }

    const route = await this.aggregator.findRouters({
      from: args.inInfo.typeName,
      target: args.outInfo.typeName,
      amount: new BN(args.amountOut.toString()),
      byAmountIn: false,
      providers: this.getProvidersFromDenylist(args.protocolDenylist || []),
    })
    if (!route) {
      throw new Error('Route is null')
    }

    const amountIn = BigInt(
      new Decimal(route.amountIn.toString())
        .mul(new Decimal(1).add(new Decimal(args.slippage)))
        .toFixed(0, Decimal.ROUND_CEIL)
    )
    const coinIn = coin.split(args.tx, args.inInfo.typeName, {
      self: args.coinIn,
      splitAmount: amountIn,
    })

    const coinOut = await this.aggregator.routerSwap({
      routers: route,
      inputCoin: coinIn,
      slippage: args.slippage,
      txb: args.tx,
    })

    return {
      tx: args.tx,
      coinOut,
    }
  }

  static protocolList(): string[] {
    return [
      agg.CETUS,
      agg.DEEPBOOKV2,
      agg.KRIYA,
      agg.FLOWXV2,
      agg.FLOWXV3,
      agg.KRIYAV3,
      agg.TURBOS,
      agg.AFTERMATH,
      agg.HAEDAL,
      agg.VOLO,
      agg.AFSUI,
      agg.BLUEMOVE,
      agg.DEEPBOOKV3,
      agg.SCALLOP,
      agg.SUILEND,
      agg.BLUEFIN,
      agg.HAEDALPMM,
      agg.ALPHAFI,
      agg.SPRINGSUI,
      agg.STEAMM,
      agg.METASTABLE,
      agg.OBRIC,
      agg.HAWAL,
      agg.STEAMM_OMM,
      agg.MOMENTUM,
    ]
  }

  protocolList(): string[] {
    return CetusAggregatorAdapter.protocolList()
  }
}
