import Decimal from 'decimal.js'
import { PhantomTypeArgument } from './gen/_framework/reified'
import { CoinInfo } from './coin-info'

/**
 * Represents a price of one coin in terms of another, `p = Y / X`.
 */
export class Price<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> {
  /** The first coin */
  readonly X: CoinInfo<X>
  /** The second coin */
  readonly Y: CoinInfo<Y>
  /** The human representation of the price (accounts for decimals) */
  readonly human: Decimal
  /** The numeric representation of the price */
  readonly numeric: Decimal

  private constructor(X: CoinInfo<X>, Y: CoinInfo<Y>, human: Decimal, numeric: Decimal) {
    this.X = X
    this.Y = Y
    this.human = human
    this.numeric = numeric
  }

  /**
   * Instantiates a price based on its human representation.
   *
   * @param X - The first coin.
   * @param Y - The second coin.
   * @param value - The human representation of the price (e.g. `4.35`).
   * @returns A new `Price` instance.
   */
  static fromHuman<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    X: CoinInfo<X>,
    Y: CoinInfo<Y>,
    value: Decimal | number | string
  ) {
    const human = new Decimal(value)
    const numeric = human.mul(new Decimal(10).pow(Y.decimals - X.decimals))

    return new Price(X, Y, human, numeric)
  }

  /**
   * Instantiates a price based on its numeric representation.
   *
   * @param X - The first coin.
   * @param Y - The second coin.
   * @param value - The numeric representation of the price (e.g. `435`).
   * @returns A new `Price` instance.
   */
  static fromNumeric<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(
    X: CoinInfo<X>,
    Y: CoinInfo<Y>,
    value: bigint | Decimal | number | string
  ) {
    const numeric = new Decimal(value.toString())
    const human = numeric.mul(new Decimal(10).pow(X.decimals - Y.decimals))

    return new Price(X, Y, human, numeric)
  }

  /**
   * Returns the inverted price, `p = X / Y`.
   *
   * @returns The inverted price.
   */
  inverted() {
    return Price.fromHuman(this.Y, this.X, this.human.pow(-1))
  }
}
