import {
  Transaction,
  TransactionArgument,
  TransactionObjectArgument,
} from '@mysten/sui/transactions'
import { CoinInfo } from '../coin-info'
import { PhantomTypeArgument } from '../gen/_framework/reified'
import { Price } from '../price'

export interface RouterSwapBalanceArgs {
  tx: Transaction
  inInfo: CoinInfo<PhantomTypeArgument>
  outInfo: CoinInfo<PhantomTypeArgument>
  balanceIn: TransactionArgument
  amountIn: bigint
  sender: string
  slippage: number
  protocolDenylist?: string[]
}

export interface RouterSwapCoinArgs {
  tx: Transaction
  inInfo: CoinInfo<PhantomTypeArgument>
  outInfo: CoinInfo<PhantomTypeArgument>
  coinIn: TransactionArgument
  amountIn: bigint
  sender: string
  slippage: number
  protocolDenylist?: string[]
}

export interface RouterSwapBalanceResult {
  tx: Transaction
  balanceOut: TransactionObjectArgument
}

export interface RouterSwapCoinResult {
  tx: Transaction
  coinOut: TransactionObjectArgument
}

export interface RouterSwapExactOutBalanceArgs {
  tx: Transaction
  inInfo: CoinInfo<PhantomTypeArgument>
  outInfo: CoinInfo<PhantomTypeArgument>
  balanceIn: TransactionArgument
  amountOut: bigint
  sender: string
  /** The allowed swap slippage, e.g. 0.01 is 1% */
  slippage: number
  protocolDenylist?: string[]
}

export interface RouterSwapExactOutCoinArgs {
  tx: Transaction
  inInfo: CoinInfo<PhantomTypeArgument>
  outInfo: CoinInfo<PhantomTypeArgument>
  coinIn: TransactionArgument
  amountOut: bigint
  sender: string
  slippage: number
  protocolDenylist?: string[]
}

export interface SwapExactOutCoinResult {
  tx: Transaction
  coinOut: TransactionObjectArgument
}

export interface SwapExactOutBalanceResult {
  tx: Transaction
  balanceOut: TransactionObjectArgument
}

export interface GetPriceArgs<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> {
  X: CoinInfo<X>
  Y: CoinInfo<Y>
  xToY: boolean
  amountIn: bigint
  protocolDenylist?: string[]
}

export interface Router {
  /** The identifier of the router */
  id: () => string
  /** Initializes the router */
  initialize: () => Promise<void>
  /** Swaps a balance of X for a balance of Y */
  swapBalance: (args: RouterSwapBalanceArgs) => Promise<RouterSwapBalanceResult>
  /** Swaps a coin of X for a coin of Y */
  swapCoin: (args: RouterSwapCoinArgs) => Promise<RouterSwapCoinResult>
  /** Swaps a balance of X for a balance of Y with a given exact output amount */
  swapExactOutBalance: (args: RouterSwapExactOutBalanceArgs) => Promise<SwapExactOutBalanceResult>
  /** Swaps a coin of X for a coin of Y with a given exact output amount */
  swapExactOutCoin: (args: RouterSwapExactOutCoinArgs) => Promise<SwapExactOutCoinResult>
  /** Fetches the price of X in terms of Y */
  getPrice: <X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    args: GetPriceArgs<X, Y>
  ) => Promise<Price<X, Y>>
  /** Returns the list of protocols supported by the router */
  protocolList: () => string[]
}
