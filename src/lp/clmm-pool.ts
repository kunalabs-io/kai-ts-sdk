import { PhantomTypeArgument, StructClass, StructClassReified } from '../gen/_framework/reified'
import {
  Pool as CetusPool_,
  PoolFields as CetusPoolFields,
  isPool as isCetusPool,
} from '../gen/cetus-clmm/pool/structs'
import {
  Pool as BluefinPool_,
  PoolFields as BluefinPoolFields,
  isPool as isBluefinPool,
} from '../gen/bluefin_spot/pool/structs'
import Decimal from 'decimal.js'
import { CoinInfo } from '../coin-info'
import { Price } from '../price'
import {
  decodeSignedInt,
  priceToInitializableTickIndex,
  tickIndexToPrice,
  tickIndexToSqrtPriceX64,
} from './tick-math'
import { I32 as IntegerMateI32 } from '../gen/integer-mate/i32/structs'

export interface ClmmPoolConstructorArgs<
  Pool extends StructClass,
  PoolFields,
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  reified: StructClassReified<Pool, PoolFields>
  X: CoinInfo<X>
  Y: CoinInfo<Y>
  data: Pool
}

export function cetusDecodeTick(value: IntegerMateI32): number {
  return Number(decodeSignedInt(BigInt(value.bits), 32))
}

export function bluefinDecodeTick(value: IntegerMateI32): number {
  return Number(decodeSignedInt(BigInt(value.bits), 32))
}

export type CetusPool<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> = ClmmPool<
  CetusPool_<X, Y>,
  CetusPoolFields<X, Y>,
  X,
  Y
>

export type BluefinPool<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> = ClmmPool<
  BluefinPool_<X, Y>,
  BluefinPoolFields<X, Y>,
  X,
  Y
>

/**
 * Represents a CLMM pool.
 */
export class ClmmPool<
  Pool extends StructClass,
  PoolFields,
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  readonly reified: StructClassReified<Pool, PoolFields>
  readonly X: CoinInfo<X>
  readonly Y: CoinInfo<Y>
  readonly data: Pool

  constructor(args: ClmmPoolConstructorArgs<Pool, PoolFields, X, Y>) {
    if (args.X.typeName !== args.reified.typeArgs[0]) {
      throw new Error('X type mismatch')
    }
    if (args.Y.typeName !== args.reified.typeArgs[1]) {
      throw new Error('Y type mismatch')
    }
    if (args.data.$fullTypeName !== args.reified.fullTypeName) {
      throw new Error('Pool data mismatch')
    }

    this.reified = args.reified
    this.data = args.data
    this.X = args.X as CoinInfo<X>
    this.Y = args.Y as CoinInfo<Y>
  }

  /**
   * @returns True if the pool is a Cetus pool, false otherwise.
   */
  isCetus(): this is CetusPool<X, Y> {
    return isCetusPool(this.reified.fullTypeName)
  }

  /**
   * @returns True if the pool is a Bluefin pool, false otherwise.
   */
  isBluefin(): this is BluefinPool<X, Y> {
    return isBluefinPool(this.reified.fullTypeName)
  }

  /**
   * @returns The ID of the pool.
   */
  get id(): string {
    if (this.isCetus()) {
      return this.data.id
    } else if (this.isBluefin()) {
      return this.data.id
    } else {
      throw new Error(`${this.data.$typeName} pool type is not supported. Try updating the SDK.`)
    }
  }

  /**
   * @returns The current sqrt price of the pool (multiplied by 2^64).
   */
  get currentSqrtPriceX64(): bigint {
    if (this.isCetus()) {
      return this.data.currentSqrtPrice
    } else if (this.isBluefin()) {
      return this.data.currentSqrtPrice
    } else {
      throw new Error(`${this.data.$typeName} pool type is not supported. Try updating the SDK.`)
    }
  }

  /**
   * @returns The initializable tick spacing of the pool.
   */
  get tickSpacing(): number {
    if (this.isCetus()) {
      return this.data.tickSpacing
    } else if (this.isBluefin()) {
      return this.data.ticksManager.tickSpacing
    } else {
      throw new Error(`${this.data.$typeName} pool type is not supported. Try updating the SDK.`)
    }
  }

  /**
   * @returns The current tick of the pool.
   */
  currentTick(): number {
    if (this.isCetus()) {
      return cetusDecodeTick(this.data.currentTickIndex)
    } else if (this.isBluefin()) {
      return bluefinDecodeTick(this.data.currentTickIndex)
    } else {
      throw new Error(`${this.data.$typeName} pool type is not supported. Try updating the SDK.`)
    }
  }

  /**
   * @returns The current price of the pool.
   */
  currentPrice(): Price<X, Y> {
    const sqrtPriceX64 = new Decimal(this.currentSqrtPriceX64.toString())
    const numeric = sqrtPriceX64.pow(2).div((1n << 128n).toString())

    return Price.fromNumeric(this.X, this.Y, numeric)
  }

  /**
   * Returns the price and tick index of the closest initializable price to the given price.
   *
   * @param price - The price to convert to an initializable price.
   * @returns A tuple containing the initializable price and tick index.
   */
  priceToClosestInitializablePrice(price: Price<X, Y>): [Price<X, Y>, number] {
    const tickIndex = priceToInitializableTickIndex(
      price.human,
      this.X.decimals,
      this.Y.decimals,
      this.tickSpacing
    )
    const priceLow = tickIndexToPrice(tickIndex, this.X.decimals, this.Y.decimals)
    const priceHigh = tickIndexToPrice(
      tickIndex + this.tickSpacing,
      this.X.decimals,
      this.Y.decimals
    )

    const [price_, tickIndex_] = price.human
      .minus(priceLow)
      .abs()
      .lessThan(price.human.minus(priceHigh).abs())
      ? [priceLow, tickIndex]
      : [priceHigh, tickIndex + this.tickSpacing]

    return [Price.fromHuman(this.X, this.Y, price_), tickIndex_]
  }

  /**
   * Returns the price of the given tick.
   *
   * @param tick - The tick to convert to a price.
   * @returns The price of the given tick.
   */
  tickToPrice(tick: number): Price<X, Y> {
    const sqrtPriceX64 = new Decimal(tickIndexToSqrtPriceX64(tick).toString())
    const numeric = sqrtPriceX64.pow(2).div((1n << 128n).toString())

    return Price.fromNumeric(this.X, this.Y, numeric)
  }

  /**
   * @returns The fee rate of the pool.
   */
  feeRate(): bigint {
    if (this.isCetus()) {
      return this.data.feeRate
    } else if (this.isBluefin()) {
      return this.data.feeRate
    } else {
      throw new Error(`${this.data.$typeName} pool type is not supported. Try updating the SDK.`)
    }
  }
}
