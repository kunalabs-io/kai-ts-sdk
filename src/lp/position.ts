import { PhantomTypeArgument, StructClass, TypeArgument } from '../gen/_framework/reified'
import {
  isReductionInfo,
  isRepayDebtInfo,
  Position as Position_,
  PositionReified,
  ReductionInfo,
  RepayDebtInfo,
} from '../gen/kai-leverage/position-core-clmm/structs'
import { Position as CetusPosition } from '../gen/cetus-clmm/position/structs'
import { Position as BluefinPosition } from '../gen/bluefin-spot/position/structs'
import { tickIndexToSqrtPriceX64 } from './tick-math'
import {
  findConfigInfoForPositionBcs,
  POSITION_CONFIG_INFOS,
  PositionConfig,
  PositionConfigInfo,
} from './config'
import { Price } from '../price'
import { Amount } from '../amount'
import { PositionDecimalMath } from './position-decimal-math'
import { DryRunTransactionBlockResponse, SuiClient, SuiObjectData } from '@mysten/sui/client'
import { COIN_INFO_MAP, CoinInfo, SUI } from '../coin-info'
import Decimal from 'decimal.js'
import { bluefinDecodeTick, cetusDecodeTick, ClmmPool } from './clmm-pool'
import {
  fromBase64,
  normalizeSuiAddress,
  normalizeSuiObjectId,
  SUI_CLOCK_OBJECT_ID,
} from '@mysten/sui/utils'
import {
  Argument,
  coinWithBalance,
  Transaction,
  TransactionArgument,
  TransactionResult,
} from '@mysten/sui/transactions'
import { CETUS_GLOBAL_CONFIG_ID, CETUS_REWARDER_GLOBAL_VAULT } from '../constants'
import * as pyth from '../gen/kai-leverage/pyth/functions'
import * as cetus from '../gen/kai-leverage/cetus/functions'
import * as bluefin from '../gen/kai-leverage/bluefin-spot/functions'
import * as core from '../gen/kai-leverage/position-core-clmm/functions'
import * as balance from '../gen/sui/balance/functions'
import * as coin from '../gen/sui/coin/functions'
import * as debtInfo from '../gen/kai-leverage/debt-info/functions'
import * as cetusUtil from '../gen/kai-leverage-util/cetus/functions'
import * as bluefinUtil from '../gen/kai-leverage-util/bluefin-spot/functions'
import * as util from '../gen/kai-leverage-util/util/functions'
import { SupplyPool } from './supply-pool'
import { bcs } from '@mysten/sui/bcs'
import { compressSuiType } from '../gen/_framework/util'
import { Router } from '../router/adapter'
import { max, min } from '../math'
import { BLUEFIN_GLOBAL_CONFIG_ID } from '../constants'
import { KaiRouterAdapter } from '../router/kai'
import { getMinSwapAmountBatch, PriceCache } from '../router/util'
import { createBalanceOfExactValue } from '../coin'
import * as CetusRedemptionUtil from './cetus-redemption-util'
import * as positionCore from '../gen/kai-leverage/position-core-clmm/functions'
import { PositionModel } from './position-model'

export interface PositionConstructorArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
  Data = Position_<X, Y, LP>,
> {
  configInfo: PositionConfigInfo<X, Y, LP>
  data: Data
}

export interface GetRangeResult<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> {
  /** The lower price of the position */
  pa: Price<X, Y>
  /** The upper price of the position */
  pb: Price<X, Y>
  /** The lower tick of the position */
  tickA: number
  /** The upper tick of the position */
  tickB: number
}

export interface GetPositionMathArgs<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> {
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcDebtAmountsArgs<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> {
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcEquityAmountsArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  /** The current pool price */
  poolPrice: Price<X, Y>
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcAssetValueArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  T extends PhantomTypeArgument,
> {
  /** The current pool price */
  poolPrice: Price<X, Y>
  /** The X price in terms of T */
  xPriceT: Price<X, T>
  /** The Y price in terms of T */
  yPriceT: Price<Y, T>
}

export interface CalcLpValueArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  T extends PhantomTypeArgument,
> {
  /** The current pool price */
  poolPrice: Price<X, Y>
  /** The X price in terms of T */
  xPriceT: Price<X, T>
  /** The Y price in terms of T */
  yPriceT: Price<Y, T>
}

export interface CalcDebtValueArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  T extends PhantomTypeArgument,
> {
  /** The current pool price */
  poolPrice: Price<X, Y>
  /** The X price in terms of T */
  xPriceT: Price<X, T>
  /** The Y price in terms of T */
  yPriceT: Price<Y, T>
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcEquityValueArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  T extends PhantomTypeArgument,
> {
  /** The current pool price */
  poolPrice: Price<X, Y>
  /** The X price in terms of T */
  xPriceT: Price<X, T>
  /** The Y price in terms of T */
  yPriceT: Price<Y, T>
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcLiquidationPricesArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> {
  /** The position config data */
  config: PositionConfig<X, Y, LP>
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcDeleveragePricesArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> {
  /** The position config data */
  config: PositionConfig<X, Y, LP>
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface GetInterestRatesArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcEffectiveInterestRateArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  /** The current pool price */
  poolPrice: Price<X, Y>
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcReduceAmountsHumanArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  /** The reduction factor */
  factor: Decimal
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /** The CLMM pool data */
  pool: ClmmPool<StructClass, unknown, X, Y>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CalcReduceAmountsHumanResult {
  /** The amount of X used (when negative) or received (when positive) for the swap */
  swapX: Decimal
  /** The amount of Y used (when negative) or received (when positive) for the swap */
  swapY: Decimal
  /** The final amount of X returned to the user after all repayments and swaps */
  finalX: Decimal
  /** The final amount of Y returned to the user after all repayments and swaps */
  finalY: Decimal
}

export interface GetReduceAmountsArgs {
  /** The reduction factor */
  factor: Decimal
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
  /** The router protocol denylist */
  protocolDenylist?: string[]
}

interface GetReduceAmountsResult {
  /** The amount of X tokens received from reducing the position */
  gotX: Amount
  /** The amount of Y tokens received from reducing the position */
  gotY: Amount
  /** The amount of X tokens needed to repay debt */
  gotDx: Amount
  /** The amount of Y tokens needed to repay debt */
  gotDy: Amount
  /** The amount of X tokens to swap (in human format) */
  swapX: number
  /** The amount of Y tokens to swap (in human format) */
  swapY: number
  /** The amount of X tokens to repay as debt externally (in human format) */
  repayDebtX: number
  /** The amount of Y tokens to repay as debt externally (in human format) */
  repayDebtY: number
}

export interface CalcMarginLevelArgs<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> {
  /** The current pool price */
  currentPrice: Price<X, Y>
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional unix timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export type ReduceRouterArgs =
  | {
      /** Swap method to use: 'exact-in' (swap a fixed input amount) or 'exact-out' (swap to receive a fixed output amount) */
      swapMethod: 'exact-in'
      /** The allowed swap slippage, e.g. 0.01 is 1% */
      slippage: number
      /** Overestimation factor to account for rounding or volatility, e.g. 0.01 is 1% */
      overestimationFactor: number
      /** The protocol denylist */
      protocolDenylist?: string[]
    }
  | {
      /** Swap method to use: 'exact-in' (swap a fixed input amount) or 'exact-out' (swap to receive a fixed output amount) */
      swapMethod: 'exact-out'
      /** The allowed swap slippage, e.g. 0.01 is 1% */
      slippage: number
      /** The protocol denylist */
      protocolDenylist?: string[]
    }

export interface ReduceArgs {
  /** The reduction factor */
  factor: Decimal
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
  /** The router args */
  routerArgs: ReduceRouterArgs
}

export interface DryRunReduceResult {
  /** The full dry-run transaction response from the Sui client */
  result: DryRunTransactionBlockResponse
  /** The parsed reduction event info, including withdrawn and repaid amounts */
  reductionInfo: ReductionInfo | undefined
  /** The amount of X used (when negative) or received (when positive) for the swap */
  swapX: Amount
  /** The amount of Y used (when negative) or received (when positive) for the swap */
  swapY: Amount
  /** The final amount of X returned to the user after all repayments and swaps */
  finalX: Amount
  /** The final amount of Y returned to the user after all repayments and swaps */
  finalY: Amount
}

export interface CalcDepositResultArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  /** The CLMM pool data */
  pool: ClmmPool<StructClass, unknown, X, Y>
  /** The amount of X provided for the deposit */
  xAmt: Amount
  /** The amount of Y provided for the deposit */
  yAmt: Amount
}

export interface DepositArgs<X extends PhantomTypeArgument, Y extends PhantomTypeArgument> {
  /** The CLMM pool data */
  pool: ClmmPool<StructClass, unknown, X, Y>
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
  /** The amount of X to deposit */
  xAmt: Amount
  /** The amount of Y to deposit */
  yAmt: Amount
  /** The allowed swap slippage, e.g. 0.01 is 1% */
  slippage: number
}

export interface DevInspectLpUnclaimedRewardsResult {
  /** Accrued LP fees in X */
  x: Amount
  /** Accrued LP fees in Y */
  y: Amount
  /** Other accrued rewards */
  rewards: Map<CoinInfo<PhantomTypeArgument>, Amount>
  /** Stashed rewards */
  stashed: Map<CoinInfo<PhantomTypeArgument>, Amount>
}

export interface OwnerCollectFeesArgs {
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
}

export interface OwnerCollectRewardArgs {
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
  /** The reward coin info */
  rewardType: CoinInfo<PhantomTypeArgument>
}

export interface DeletePositionArgs {
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
}

export interface WithdrawAllRewardsArgs {
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
}

export interface WithdrawAllRewardsResult {
  /** The collected X fees */
  feeX: TransactionArgument
  /** The collected Y fees */
  feeY: TransactionArgument
  /** The collected rewards */
  rewards: { coinInfo: CoinInfo<PhantomTypeArgument>; balance: TransactionArgument }[]
}

export interface OwnerTakeStashedRewardArgs {
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
  /** The coin info of the reward */
  coinInfo: CoinInfo<PhantomTypeArgument>
  /** The amount of the reward to take. If not provided, the full amount will be taken. */
  amount?: bigint
}

export interface WithdrawAllStashedRewardsArgs {
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
}

export type WithdrawAllStashedRewardsResult = {
  coinInfo: CoinInfo<PhantomTypeArgument>
  balance: TransactionArgument
}[]

export interface ConvertRewardsAndTransferArgs {
  /** The result of `devInspectLpUnclaimedRewards` */
  rewardResults: DevInspectLpUnclaimedRewardsResult
  /** The result of `withdrawAllRewards` */
  withdrawAllRewardsResult?: WithdrawAllRewardsResult
  /** The result of `withdrawAllStashedRewards` */
  withdrawAllStashedRewardsResult?: WithdrawAllStashedRewardsResult
  /** The reward coin info to convert to */
  convertRewardsTo?: CoinInfo<PhantomTypeArgument>
  /** The allowed swap slippage, e.g. 0.01 is 1% */
  slippage: number
}

export interface WithdrawAllRewardsConvertAndTransferArgs {
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
  /** The reward coin info to convert to */
  convertRewardsTo?: CoinInfo<PhantomTypeArgument>
  /** The allowed swap slippage, e.g. 0.01 is 1% */
  slippage: number
}

export interface ReduceAndMaybeDeleteArgs extends ReduceArgs {
  /** The reward coin info to convert to */
  convertRewardsTo?: CoinInfo<PhantomTypeArgument>
}

export interface CompoundArgs {
  /** The CLMM pool data of the position's underlying pool */
  pool: ClmmPool<StructClass, unknown, PhantomTypeArgument, PhantomTypeArgument>
  /** The ID of the position's `PositionCap` object */
  positionCapId: string
  /** The allowed swap slippage, e.g. 0.01 is 1% */
  slippage: number
}

/**
 * A class that represents a Kai Leverage CLMM position.
 */
export class Position<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
  Data = Position_<X, Y, LP>,
> {
  readonly configInfo: PositionConfigInfo<X, Y, LP>
  readonly reified: PositionReified<X, Y, LP>
  readonly data: Data
  readonly X: CoinInfo<X>
  readonly Y: CoinInfo<Y>
  readonly id: string

  constructor(args: PositionConstructorArgs<X, Y, LP, Data>) {
    this.configInfo = args.configInfo
    this.reified = args.configInfo.positionReified
    this.data = args.data
    this.reified.fromBcs
    this.X = this.configInfo.X
    this.Y = this.configInfo.Y
    this.id = (args.data as Position_<X, Y, LP>).id
  }

  /**
   * Creates a new Position instance from a position data struct (sui-client-gen).
   * @param data - The Position_ struct to create the Position instance from.
   * @returns A new Position instance.
   */
  static fromData<
    X extends PhantomTypeArgument,
    Y extends PhantomTypeArgument,
    LP extends TypeArgument,
  >(data: Position_<X, Y, LP>) {
    const configInfo = POSITION_CONFIG_INFOS.find(p => p.configId === data.configId)
    if (!configInfo) {
      throw new Error(`No PositionConfigInfo found for configId ${data.configId}.`)
    }

    return new Position({
      configInfo,
      data,
    })
  }

  /**
   * Creates a new Position instance from a BCS encoded position data.
   *
   * @param bcs - The BCS encoded position data.
   * @param type - The type of the position.
   * @returns A new Position instance.
   */
  static fromBcs(bcs: Uint8Array, type: string) {
    const configInfo = findConfigInfoForPositionBcs(bcs, type)
    if (!configInfo) {
      throw new Error(`No PositionConfigInfo found for type ${type}.`)
    }

    return new Position({
      configInfo,
      data: configInfo.positionReified.fromBcs(bcs),
    })
  }

  /**
   * Creates a new Position instance from a SuiObjectData struct (returned e.g. by `SuiClient.getObject`).
   *
   * @param data - The SuiObjectData struct to create the Position instance from.
   * @returns A new Position instance.
   */
  static fromSuiObjectData(data: SuiObjectData) {
    let configInfo = undefined
    if (data.bcs && data.bcs.dataType === 'moveObject') {
      configInfo = findConfigInfoForPositionBcs(fromBase64(data.bcs.bcsBytes), data.bcs.type)
      if (!configInfo) {
        throw new Error(`No PositionConfigInfo found for type ${data.bcs.type}.`)
      }
    }
    if (data.content && data.content.dataType === 'moveObject') {
      const configId = normalizeSuiObjectId(
        (data.content.fields as unknown as { configId: string }).configId
      )
      configInfo = POSITION_CONFIG_INFOS.find(p => normalizeSuiObjectId(p.configId) === configId)
      if (!configInfo) {
        throw new Error(`No PositionConfigInfo found for type ${data.content.type}.`)
      }
    }
    if (!configInfo) {
      throw new Error(
        `Not a Move object or 'bcs' and 'content' fields are missing from the data for ID ${data.objectId}. Include 'showBcs' or 'showContent' in the request.`
      )
    }

    return new Position({
      configInfo,
      data: configInfo.positionReified.fromSuiObjectData(data),
    })
  }

  /**
   * Fetches a Position instance.
   *
   * @param client - The Sui client.
   * @param id - The ID of the Position.
   * @returns A Position instance.
   */
  static async fetch(client: SuiClient, id: string) {
    const res = await client.getObject({
      id,
      options: {
        showBcs: true,
      },
    })
    if (!res.data) {
      throw new Error(`No data found in response for Position ${id}.`)
    }

    return Position.fromSuiObjectData(res.data)
  }

  /**
   * Checks if the position is a Cetus position.
   *
   * @returns True if the position is a Cetus position, false otherwise.
   */
  isCetus(): this is Position<X, Y, CetusPosition, Position_<X, Y, CetusPosition>> {
    return this.reified.typeArgs[2] === CetusPosition.$typeName
  }

  /**
   * Checks if the position is a Bluefin position.
   *
   * @returns True if the position is a Bluefin position, false otherwise.
   */
  isBluefin(): this is Position<X, Y, BluefinPosition, Position_<X, Y, BluefinPosition>> {
    return this.reified.typeArgs[2] === BluefinPosition.$typeName
  }

  /**
   * Gets the position's price range.
   *
   * @returns The position's price range.
   */
  getRange(): GetRangeResult<X, Y> {
    if (this.isCetus()) {
      const tickA = cetusDecodeTick(this.data.lpPosition.tickLowerIndex)
      const tickB = cetusDecodeTick(this.data.lpPosition.tickUpperIndex)
      const pa = Price.fromNumeric(
        this.X,
        this.Y,
        new Decimal(tickIndexToSqrtPriceX64(tickA).toString()).pow(2).div((1n << 128n).toString())
      )
      const pb = Price.fromNumeric(
        this.X,
        this.Y,
        new Decimal(tickIndexToSqrtPriceX64(tickB).toString()).pow(2).div((1n << 128n).toString())
      )

      return {
        pa,
        pb,
        tickA,
        tickB,
      }
    } else if (this.isBluefin()) {
      const tickA = bluefinDecodeTick(this.data.lpPosition.lowerTick)
      const tickB = bluefinDecodeTick(this.data.lpPosition.upperTick)
      const pa = Price.fromNumeric(
        this.X,
        this.Y,
        new Decimal(tickIndexToSqrtPriceX64(tickA).toString()).pow(2).div((1n << 128n).toString())
      )
      const pb = Price.fromNumeric(
        this.X,
        this.Y,
        new Decimal(tickIndexToSqrtPriceX64(tickB).toString()).pow(2).div((1n << 128n).toString())
      )

      return {
        pa,
        pb,
        tickA,
        tickB,
      }
    } else {
      throw new Error(
        `${this.reified.typeArgs[2]} pool type is not supported. Try updating the SDK.`
      )
    }
  }

  /**
   * Checks if the position is in range (i.e. the current tick is within the position's tick range).
   *
   * @param currentTick - The current tick to check.
   * @returns True if the position is in range, false otherwise.
   */
  inRange(currentTick: number) {
    const { tickA, tickB } = this.getRange()

    return currentTick >= tickA && currentTick < tickB
  }

  /**
   * Gets the position's liquidity (`l`) in the underlying CLMM pool.
   *
   * @returns The position's liquidity.
   */
  get lpLiquidity(): bigint {
    if (this.isCetus()) {
      return this.data.lpPosition.liquidity
    } else if (this.isBluefin()) {
      return this.data.lpPosition.liquidity
    } else {
      throw new Error('Unsupported pool')
    }
  }

  /**
   * Checks if the position is inactive (i.e. all liquidity, debt, and collateral are zero).
   *
   * @returns True if the position is inactive, false otherwise.
   */
  isInactive(): boolean {
    return (
      this.lpLiquidity === 0n &&
      this.debtSharesX === 0n &&
      this.debtSharesY === 0n &&
      this.colX.int === 0n &&
      this.colY.int === 0n
    )
  }

  /**
   * Constructs and returns a PositionModel instance representing the current LP position.
   *
   * This model includes the position's tick range (as sqrt prices), liquidity, collateral, and debt shares.
   *
   * @returns {PositionModel} The PositionModel for this LP position.
   */
  positionModel(): PositionModel {
    const { tickA, tickB } = this.getRange()
    const sqrtPaX64 = tickIndexToSqrtPriceX64(tickA)
    const sqrtPbX64 = tickIndexToSqrtPriceX64(tickB)

    return new PositionModel({
      sqrtPaX64,
      sqrtPbX64,
      l: this.lpLiquidity,
      cx: this.colX.int,
      cy: this.colY.int,
      dx: this.debtSharesX,
      dy: this.debtSharesY,
    })
  }

  /**
   * Calculates the amount of X in the underlying CLMM LP position given the current pool price.
   *
   * @param currentPrice - The current pool price.
   * @returns The amount of X in the position.
   */
  calcX(currentPrice: Price<X, Y>): Amount {
    const sqrtPx64 = BigInt(
      currentPrice.numeric
        .sqrt()
        .mul((1n << 64n).toString())
        .toFixed(0)
    )
    const val = this.positionModel().xX64(sqrtPx64) >> 64n
    return Amount.fromInt(val, this.X.decimals)
  }

  /**
   * Calculates the amount of Y in the underlying CLMM LP position given the current pool price.
   *
   * @param currentPrice - The current pool price.
   * @returns The amount of Y in the position.
   */
  calcY(currentPrice: Price<X, Y>): Amount {
    const sqrtPx64 = BigInt(
      currentPrice.numeric
        .sqrt()
        .mul((1n << 64n).toString())
        .toFixed(0)
    )
    const val = this.positionModel().yX64(sqrtPx64) >> 64n
    return Amount.fromInt(val, this.Y.decimals)
  }

  /**
   * Calculates the amount of X and Y in the underlying CLMM LP position given the current pool price.
   *
   * @param currentPrice - The current pool price.
   * @returns The amount of X and Y in the position.
   */
  calcLpAmounts(currentPrice: Price<X, Y>): { x: Amount; y: Amount } {
    return {
      x: this.calcX(currentPrice),
      y: this.calcY(currentPrice),
    }
  }

  /**
   * Gets the position's extra collateral X amount.
   *
   * @returns The position's extra collateral X amount.
   */
  get colX(): Amount {
    const data = this.data as Position_<X, Y, LP>
    return Amount.fromInt(data.colX.value, this.X.decimals)
  }

  /**
   * Gets the position's extra collateral Y amount.
   *
   * @returns The position's extra collateral Y amount.
   */
  get colY(): Amount {
    const data = this.data as Position_<X, Y, LP>
    return Amount.fromInt(data.colY.value, this.Y.decimals)
  }

  /**
   * Gets the position's total X debt share amount.
   *
   * @returns The position's total X debt share amount.
   */
  get debtSharesX(): bigint {
    const data = this.data as Position_<X, Y, LP>
    const info = data.debtBag.inner.infos.find(i => {
      const infoType = compressSuiType('0x' + i.assetType.name)
      const xType = compressSuiType(this.X.typeName)
      return infoType === xType
    })
    if (!info) {
      return 0n
    }

    return info.amount
  }

  /**
   * Gets the position's total Y debt share amount.
   *
   * @returns The position's total Y debt share amount.
   */
  get debtSharesY(): bigint {
    const data = this.data as Position_<X, Y, LP>
    const info = data.debtBag.inner.infos.find(i => {
      const infoType = compressSuiType('0x' + i.assetType.name)
      const yType = compressSuiType(this.Y.typeName)
      return infoType === yType
    })
    if (!info) {
      return 0n
    }

    return info.amount
  }

  /**
   * Returns the `PositionMath` instance for the position.
   *
   * @param args - The arguments for the calculation.
   * @returns The position's math.
   */
  pm(args: GetPositionMathArgs<X, Y>): PositionDecimalMath {
    if (args.supplyPoolX.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    const { pa, pb } = this.getRange()

    const DX = new Decimal(
      args.supplyPoolX
        .calcDebtByShares(this.configInfo.lendFacilCap, this.debtSharesX, args.timestampMs)
        .int.toString()
    )
    const DY = new Decimal(
      args.supplyPoolY
        .calcDebtByShares(this.configInfo.lendFacilCap, this.debtSharesY, args.timestampMs)
        .int.toString()
    )

    return new PositionDecimalMath({
      pa: pa.numeric,
      pb: pb.numeric,
      L: new Decimal(this.lpLiquidity.toString()),
      CX: new Decimal(this.colX.int.toString()),
      CY: new Decimal(this.colY.int.toString()),
      DX,
      DY,
    })
  }

  /**
   * Calculates the position's total assets (LP position amounts + extra collateral).
   *
   * @param poolPrice - The current pool price.
   * @returns The position's total assets.
   */
  calcAssetAmounts(poolPrice: Price<X, Y>): { x: Amount; y: Amount } {
    return {
      x: this.X.newAmount(this.colX.int + this.calcX(poolPrice).int),
      y: this.Y.newAmount(this.colY.int + this.calcY(poolPrice).int),
    }
  }

  /**
   * Calculates the values of the position's debt.
   *
   * @param args - The arguments for the calculation.
   * @returns The position's total debt values.
   */
  calcDebtAmounts(args: CalcDebtAmountsArgs<X, Y>): { x: Amount; y: Amount } {
    if (args.supplyPoolX.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    const dx = args.supplyPoolX.calcDebtByShares(
      this.configInfo.lendFacilCap,
      this.debtSharesX,
      args.timestampMs
    )
    const dy = args.supplyPoolY.calcDebtByShares(
      this.configInfo.lendFacilCap,
      this.debtSharesY,
      args.timestampMs
    )

    return {
      x: dx,
      y: dy,
    }
  }

  /**
   * Calculates the position's equity amounts (assets - debt).
   *
   * @param args - The arguments for the calculation.
   * @returns The position's equity amounts.
   */
  calcEquityAmounts(args: CalcEquityAmountsArgs<X, Y>): { x: Amount; y: Amount } {
    if (args.supplyPoolX.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    const debt = this.calcDebtAmounts({
      supplyPoolX: args.supplyPoolX,
      supplyPoolY: args.supplyPoolY,
      timestampMs: args.timestampMs,
    })
    const assets = this.calcAssetAmounts(args.poolPrice)
    const dx = debt.x.int
    const dy = debt.y.int
    const ax = assets.x.int
    const ay = assets.y.int

    if (ax < dx && ay < dy) {
      return {
        x: Amount.fromInt(0n, this.X.decimals),
        y: Amount.fromInt(0n, this.Y.decimals),
      }
    } else if (ax >= dx && ay >= dy) {
      return {
        x: Amount.fromInt(ax - dx, this.X.decimals),
        y: Amount.fromInt(ay - dy, this.Y.decimals),
      }
    } else if (ay < dy) {
      const needY = dy - ay
      const convertX = BigInt(
        new Decimal(needY.toString()).div(args.poolPrice.numeric).toFixed(0, Decimal.ROUND_DOWN)
      )
      const remX = ax - dx - convertX

      return {
        x: Amount.fromInt(remX, this.X.decimals),
        y: Amount.fromInt(0n, this.Y.decimals),
      }
    } else {
      const needX = dx - ax
      const convertY = BigInt(
        new Decimal(needX.toString()).mul(args.poolPrice.numeric).toFixed(0, Decimal.ROUND_DOWN)
      )
      const remY = ay - dy - convertY

      return {
        x: Amount.fromInt(0n, this.X.decimals),
        y: Amount.fromInt(remY, this.Y.decimals),
      }
    }
  }

  /**
   * Calculates the position's equity amounts in human format (considers token decimals)
   *
   * @param args - The arguments for the calculation.
   * @returns The position's equity amounts in human readable format.
   */
  calcEquityAmountsHuman(args: CalcEquityAmountsArgs<X, Y>): { x: Decimal; y: Decimal } {
    const equity = this.calcEquityAmounts(args)
    return {
      x: equity.x.toDecimal(),
      y: equity.y.toDecimal(),
    }
  }

  /**
   * Calculates the position's total asset value expressed in terms of another token T.
   * Takes current pool price, X price in terms of T, and Y price in terms of T as arguments.
   *
   * @param args - The arguments for the calculation.
   * @returns The position's total asset value.
   */
  calcAssetValue<T extends PhantomTypeArgument>(args: CalcAssetValueArgs<X, Y, T>): bigint {
    const x = new Decimal(this.calcX(args.poolPrice).int.toString())
    const y = new Decimal(this.calcY(args.poolPrice).int.toString())
    const cx = new Decimal(this.colX.int.toString())
    const cy = new Decimal(this.colY.int.toString())

    return BigInt(
      x
        .mul(args.xPriceT.numeric)
        .plus(y.mul(args.yPriceT.numeric))
        .plus(cx.mul(args.xPriceT.numeric))
        .plus(cy.mul(args.yPriceT.numeric))
        .toFixed(0, Decimal.ROUND_DOWN)
    )
  }

  /**
   * Calculates the position's total LP value expressed in terms of another token T.
   * Takes current pool price, X price in terms of T, and Y price in terms of T as arguments.
   *
   * @param args - The arguments for the calculation.
   * @returns The position's total LP value.
   */
  calcLpValue<T extends PhantomTypeArgument>(args: CalcLpValueArgs<X, Y, T>): bigint {
    const lpAmounts = this.calcLpAmounts(args.poolPrice)
    const x = new Decimal(lpAmounts.x.int.toString())
    const y = new Decimal(lpAmounts.y.int.toString())

    return BigInt(
      x.mul(args.xPriceT.numeric).plus(y.mul(args.yPriceT.numeric)).toFixed(0, Decimal.ROUND_DOWN)
    )
  }

  /**
   * Calculates the position's total debt value expressed in terms of another token T.
   * Takes current pool price, X price in terms of T, and Y price in terms of T as arguments.
   *
   * @param args - The arguments for the calculation.
   * @returns The position's total debt value.
   */
  calcDebtValue<T extends PhantomTypeArgument>(args: CalcDebtValueArgs<X, Y, T>): bigint {
    if (args.supplyPoolX.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    const debt = this.calcDebtAmounts({
      supplyPoolX: args.supplyPoolX,
      supplyPoolY: args.supplyPoolY,
      timestampMs: args.timestampMs,
    })

    const dx = new Decimal(debt.x.int.toString())
    const dy = new Decimal(debt.y.int.toString())

    return BigInt(
      dx.mul(args.xPriceT.numeric).plus(dy.mul(args.yPriceT.numeric)).toFixed(0, Decimal.ROUND_UP)
    )
  }

  /**
   * Calculates the position's current margin level (`M`).
   *
   * @param args - The arguments for the calculation.
   * @returns The position's margin level.
   */
  calcMarginLevel(args: CalcMarginLevelArgs<X, Y>): Decimal {
    if (args.supplyPoolX.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    const x = new Decimal(this.calcX(args.currentPrice).int.toString())
    const y = new Decimal(this.calcY(args.currentPrice).int.toString())

    const cx = new Decimal(this.colX.int.toString())
    const cy = new Decimal(this.colY.int.toString())

    const dx = new Decimal(
      args.supplyPoolX
        .calcDebtByShares(this.configInfo.lendFacilCap, this.debtSharesX, args.timestampMs)
        .int.toString()
    )
    const dy = new Decimal(
      args.supplyPoolY
        .calcDebtByShares(this.configInfo.lendFacilCap, this.debtSharesY, args.timestampMs)
        .int.toString()
    )

    const assets = x.plus(cx).mul(args.currentPrice.numeric).plus(y).plus(cy)
    const debt = dx.mul(args.currentPrice.numeric).plus(dy)

    return assets.div(debt)
  }

  /**
   * Calculates the position's equity value expressed in terms of another token T.
   * Takes current pool price, X price in terms of T, and Y price in terms of T as arguments.
   *
   * @param args - The arguments for the calculation.
   * @returns The position's equity value.
   */
  calcEquityValue<T extends PhantomTypeArgument>(args: CalcEquityValueArgs<X, Y, T>): bigint {
    const assets = new Decimal(this.calcAssetValue(args).toString())
    const debt = new Decimal(this.calcDebtValue(args).toString())

    return BigInt(assets.minus(debt).toFixed(0, Decimal.ROUND_DOWN))
  }

  /**
   * Calculates the position's liquidation prices (price at which the position is eligible for liquidation).
   *
   * @param args - The arguments for the calculation.
   * @returns The position's liquidation prices (low and high).
   */
  calcLiquidationPrices(args: CalcLiquidationPricesArgs<X, Y, LP>): [Price<X, Y>, Price<X, Y>] {
    if (args.supplyPoolX.data.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.data.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    const pm = this.pm({
      supplyPoolX: args.supplyPoolX,
      supplyPoolY: args.supplyPoolY,
      timestampMs: args.timestampMs,
    })

    const m = new Decimal(args.config.data.liqMarginBps.toString()).div(10000)

    return pm.plh(m).map(p => Price.fromNumeric(this.X, this.Y, p)) as [Price<X, Y>, Price<X, Y>]
  }

  /**
   * Calculates the position's deleverage prices (price at which the position is eligible for deleveraging).
   *
   * @param args - The arguments for the calculation.
   * @returns The position's deleverage prices (low and high).
   */
  calcDeleveragePrices(args: CalcDeleveragePricesArgs<X, Y, LP>) {
    if (args.supplyPoolX.data.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.data.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    const pm = this.pm({
      supplyPoolX: args.supplyPoolX,
      supplyPoolY: args.supplyPoolY,
      timestampMs: args.timestampMs,
    })

    const m = new Decimal(args.config.data.deleverageMarginBps.toString()).div(10000)

    return pm.plh(m).map(p => Price.fromNumeric(this.X, this.Y, p)) as [Price<X, Y>, Price<X, Y>]
  }

  /**
   * Calculates the supply pool interest rates for the position.
   *
   * @param args - The arguments for the calculation.
   * @returns The position's interest rates (X and Y).
   */
  getInterestRates(args: GetInterestRatesArgs<X, Y>): { x: Decimal; y: Decimal } {
    if (args.supplyPoolX.data.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.data.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    return {
      x: new Decimal(
        args.supplyPoolX
          .calcInterestRateBps(this.configInfo.lendFacilCap, args.timestampMs)
          .toString()
      ).div(10000),
      y: new Decimal(
        args.supplyPoolY
          .calcInterestRateBps(this.configInfo.lendFacilCap, args.timestampMs)
          .toString()
      ).div(10000),
    }
  }

  /**
   * Calculates the weighted average interest rate across both debt positions.
   * The rate is weighted by the value of each debt position.
   * Returns 0 if there is no debt.
   *
   * @param args - Contains supplyPoolX, supplyPoolY, timestampMs and poolPrice for the calculation
   * @returns The effective interest rate as a decimal (e.g. 0.05 = 5%)
   */
  calcEffectiveInterestRate(args: CalcEffectiveInterestRateArgs<X, Y>): number {
    const dx = args.supplyPoolX.calcDebtByShares(
      this.configInfo.lendFacilCap,
      this.debtSharesX,
      args.timestampMs
    )
    const dy = args.supplyPoolY.calcDebtByShares(
      this.configInfo.lendFacilCap,
      this.debtSharesY,
      args.timestampMs
    )
    if (dx.int === 0n && dy.int === 0n) {
      return 0
    }

    const ir = this.getInterestRates(args)

    const dxValue = dx.toNumber() * args.poolPrice.human.toNumber()
    const dyValue = dy.toNumber()

    const interestValue = dxValue * ir.x.toNumber() + dyValue * ir.y.toNumber()
    const debtValue = dxValue + dyValue

    if (debtValue === 0) {
      return 0
    }

    return interestValue / debtValue
  }

  /**
   * Calculates the result of reducing the position by a given factor and
   * paying back the required debt doing swaps if necessary (withdrawal).
   *
   * @param args - The arguments for the calculation.
   * @returns The resulting amounts that are returned to the user.
   */
  calcReduceAmountsHuman(args: CalcReduceAmountsHumanArgs<X, Y>): CalcReduceAmountsHumanResult {
    if (args.factor.greaterThan(1) || args.factor.lessThan(0)) {
      throw new Error('factor must be between 0 and 1')
    }
    if (args.pool.id !== this.configInfo.poolObjectId) {
      throw new Error('pool id mismatch')
    }
    if (args.supplyPoolX.data.id !== this.configInfo.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    if (args.supplyPoolY.data.id !== this.configInfo.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }

    const f = args.factor
    const p = args.pool.currentPrice()
    const lpAmounts = this.calcLpAmounts(p)

    const gotX = lpAmounts.x.toDecimal().plus(this.colX.toDecimal()).mul(f)
    const gotY = lpAmounts.y.toDecimal().plus(this.colY.toDecimal()).mul(f)
    const gotSx = BigInt(
      new Decimal(this.debtSharesX.toString()).mul(f).toFixed(0, Decimal.ROUND_UP)
    )
    const gotSy = BigInt(
      new Decimal(this.debtSharesY.toString()).mul(f).toFixed(0, Decimal.ROUND_UP)
    )

    const gotDx = args.supplyPoolX
      .calcDebtByShares(this.configInfo.lendFacilCap, gotSx, args.timestampMs)
      .toDecimal()
    const gotDy = args.supplyPoolY
      .calcDebtByShares(this.configInfo.lendFacilCap, gotSy, args.timestampMs)
      .toDecimal()

    const needX = Decimal.max(gotDx.sub(gotX), 0)
    const needY = Decimal.max(gotDy.sub(gotY), 0)

    const swapXAmt = needY.div(p.human)
    const swapYAmt = needX.mul(p.human)
    const finalX = gotX.plus(needX).sub(swapXAmt).sub(gotDx)
    const finalY = gotY.plus(needY).sub(swapYAmt).sub(gotDy)

    return {
      swapX: (swapXAmt.gt(0) ? swapXAmt.neg() : needX).toDP(this.X.decimals),
      swapY: (swapYAmt.gt(0) ? swapYAmt.neg() : needY).toDP(this.Y.decimals),
      finalX: finalX.toDP(this.X.decimals),
      finalY: finalY.toDP(this.Y.decimals),
    }
  }

  /**
   * Fetches the values of the intermediate result of reducing (withdrawal) the position by a given factor.
   * The intermediate result consists of the total amounts of X and Y returned and the amounts of debt that
   * need to be repaid in the same transaction. Often the returned X and Y are not enough to repay the debt
   * directly, so usually a swap between X and Y is performed to repay the debt.
   *
   * @param args - The arguments for the calculation.
   * @returns The resulting amounts that are returned to the user.
   */
  async fetchReduceAmountsDevInspect(client: SuiClient, factor: Decimal, positionCapId: string) {
    const tx = new Transaction()

    // Set liquidation margin to 0 to avoid abort on margin below threshold in reduce
    positionCore.setLiqMarginBps(tx, {
      config: this.configInfo.configId,
      value: 0,
    })

    const priceInfo = pyth.create(tx, SUI_CLOCK_OBJECT_ID)
    pyth.add(tx, {
      self: priceInfo,
      info: this.configInfo.pioInfoX.priceInfoObjectId,
    })
    pyth.add(tx, {
      self: priceInfo,
      info: this.configInfo.pioInfoY.priceInfoObjectId,
    })

    const factorX64 = BigInt(factor.mul((1n << 64n).toString()).toFixed(0, Decimal.ROUND_DOWN))

    const ta = {
      X: this.X.typeName,
      Y: this.Y.typeName,
      SX: this.configInfo.supplyPoolXInfo.ST.typeName,
      SY: this.configInfo.supplyPoolYInfo.ST.typeName,
    }

    let gotX: Argument, gotY: Argument, ticket: Argument
    if (this.isCetus()) {
      ;[gotX, gotY, ticket] = cetus.reduce(tx, [ta.X, ta.Y, ta.SX, ta.SY], {
        position: this.data.id,
        config: this.configInfo.configId,
        cap: positionCapId,
        priceInfo,
        supplyPoolX: this.configInfo.supplyPoolXInfo.id,
        supplyPoolY: this.configInfo.supplyPoolYInfo.id,
        cetusPool: this.configInfo.poolObjectId,
        cetusGlobalConfig: CETUS_GLOBAL_CONFIG_ID,
        factorX64,
        clock: SUI_CLOCK_OBJECT_ID,
      })
    } else if (this.isBluefin()) {
      ;[gotX, gotY, ticket] = bluefin.reduce(tx, [ta.X, ta.Y, ta.SX, ta.SY], {
        position: this.data.id,
        config: this.configInfo.configId,
        cap: positionCapId,
        priceInfo,
        supplyPoolX: this.configInfo.supplyPoolXInfo.id,
        supplyPoolY: this.configInfo.supplyPoolYInfo.id,
        bluefinPool: this.configInfo.poolObjectId,
        bluefinGlobalConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        factorX64,
        clock: SUI_CLOCK_OBJECT_ID,
      })
    } else {
      throw new Error('Unsupported pool')
    }

    balance.value(tx, ta.X, gotX)
    balance.value(tx, ta.Y, gotY)

    core.reductionTicketCalcRepayAmtX(tx, [ta.X, ta.SX, ta.SY], {
      ticket,
      supplyPool: this.configInfo.supplyPoolXInfo.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })
    core.reductionTicketCalcRepayAmtY(tx, [ta.Y, ta.SX, ta.SY], {
      ticket,
      supplyPool: this.configInfo.supplyPoolYInfo.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })

    const di = await client.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: normalizeSuiAddress('0x0'),
    })
    if (di.error) {
      throw new Error(di.error)
    }

    const results = di.results!.slice(-4)
    const gotXResult = bcs.U64.parse(Uint8Array.from(results[0].returnValues![0][0]))
    const gotYResult = bcs.U64.parse(Uint8Array.from(results[1].returnValues![0][0]))
    const gotDxResult = bcs.U64.parse(Uint8Array.from(results[2].returnValues![0][0]))
    const gotDyResult = bcs.U64.parse(Uint8Array.from(results[3].returnValues![0][0]))

    const ret = {
      gotX: Amount.fromInt(BigInt(gotXResult), this.X.decimals),
      gotY: Amount.fromInt(BigInt(gotYResult), this.Y.decimals),
      gotDx: Amount.fromInt(BigInt(gotDxResult), this.X.decimals),
      gotDy: Amount.fromInt(BigInt(gotDyResult), this.Y.decimals),
    }

    return ret
  }

  /**
   * Fetch and calculate the amounts needed for position reduction including swap
   * and debt repayment calculations.
   *
   * This method determines how much of each token will be obtained from reducing the position
   * and calculates the optimal swap strategy to cover any debt shortfalls. It returns detailed
   * information about the amounts that will be received, debt amounts to repay, and the
   * recommended swap amounts.
   *
   * @param client - The `SuiClient` instance for blockchain interactions.
   * @param router - The `Router` instance for price calculations and swap routing.
   * @param factor - The reduction factor.
   * @param positionCapId - The ID of the position's `PositionCap` object.
   * @returns A promise that resolves to an object containing:
   *   - `gotX`: Amount of X tokens that will be received from the reduction
   *   - `gotY`: Amount of Y tokens that will be received from the reduction
   *   - `gotDx`: Amount of X debt that needs to be repaid
   *   - `gotDy`: Amount of Y debt that needs to be repaid
   *   - `swapX`: Amount of X tokens to swap (0 if no swap needed)
   *   - `swapY`: Amount of Y tokens to swap (0 if no swap needed)
   *   - `repayDebtX`: Amount of X debt to repay externally
   *   - `repayDebtY`: Amount of Y debt to repay externally
   */
  async getReduceAmounts(
    client: SuiClient,
    router: Router,
    args: GetReduceAmountsArgs
  ): Promise<GetReduceAmountsResult> {
    const { gotX, gotY, gotDx, gotDy } = await this.fetchReduceAmountsDevInspect(
      client,
      args.factor,
      args.positionCapId
    )

    const needX = Math.max(gotDx.toNumber() - gotX.toNumber(), 0)
    const needY = Math.max(gotDy.toNumber() - gotY.toNumber(), 0)

    if (needX > 0 && needY > 0) {
      const swapX = 0
      const swapY = 0
      const repayDebtX = needX
      const repayDebtY = needY
      return { gotX, gotY, gotDx, gotDy, swapX, swapY, repayDebtX, repayDebtY }
    } else if (needX > 0) {
      const p = await router.getPrice({
        X: this.X,
        Y: this.Y,
        xToY: false,
        amountIn: gotY.int,
        protocolDenylist: args.protocolDenylist,
      })

      const swapX = 0
      const swapY = Math.min(needX * p.human.toNumber(), gotY.toNumber() - gotDy.toNumber())
      const repayDebtX = Math.max(needX - swapY / p.human.toNumber(), 0)
      const repayDebtY = 0
      return { gotX, gotY, gotDx, gotDy, swapX, swapY, repayDebtX, repayDebtY }
    } else if (needY > 0) {
      const p = await router.getPrice({
        X: this.X,
        Y: this.Y,
        xToY: true,
        amountIn: gotX.int,
        protocolDenylist: args.protocolDenylist,
      })

      const swapY = 0
      const swapX = Math.min(needY / p.human.toNumber(), gotX.toNumber() - gotDx.toNumber())
      const repayDebtX = 0
      const repayDebtY = Math.max(needY - swapX * p.human.toNumber(), 0)
      return { gotX, gotY, gotDx, gotDy, swapX, swapY, repayDebtX, repayDebtY }
    } else {
      const swapX = 0
      const swapY = 0
      const repayDebtX = 0
      const repayDebtY = 0
      return { gotX, gotY, gotDx, gotDy, swapX, swapY, repayDebtX, repayDebtY }
    }
  }

  /**
   * Reduces the position by a given factor and pays back the required debt doing swaps if necessary (withdrawal).
   * In order to be able to perform the swap (if necessary), the `Router` must be provided.
   *
   * @param args - The arguments for the calculation.
   * @returns The resulting amounts that are returned to the user.
   */
  async reduce(
    client: SuiClient,
    router: Router,
    args: ReduceArgs,
    sender: string
  ): Promise<Transaction> {
    if (args.factor.greaterThan(1) || args.factor.lessThan(0)) {
      throw new Error('factor must be between 0 and 1')
    }

    let tx = new Transaction()

    tx.setSenderIfNotSet(sender)

    const [reduceAmounts, compoundThresholdCoins] = await Promise.all([
      this.getReduceAmounts(client, router, {
        factor: args.factor,
        positionCapId: args.positionCapId,
        protocolDenylist: args.routerArgs.protocolDenylist,
      }),
      getMinSwapAmountBatch([this.X, this.Y]),
    ])

    const priceInfo = pyth.create(tx, SUI_CLOCK_OBJECT_ID)
    pyth.add(tx, {
      self: priceInfo,
      info: this.configInfo.pioInfoX.priceInfoObjectId,
    })
    pyth.add(tx, {
      self: priceInfo,
      info: this.configInfo.pioInfoY.priceInfoObjectId,
    })

    const factorX64 = BigInt(args.factor.mul((1n << 64n).toString()).toFixed(0, Decimal.ROUND_DOWN))

    const ta = {
      X: this.X.typeName,
      Y: this.Y.typeName,
      SX: this.configInfo.supplyPoolXInfo.ST.typeName,
      SY: this.configInfo.supplyPoolYInfo.ST.typeName,
      LP: this.reified.typeArgs[2],
    }

    // repay debt externally if needed
    let repayDebtRemainingX: TransactionArgument | undefined = undefined
    let repaidDebtX: undefined | Amount = undefined
    if (reduceAmounts.repayDebtX > 0) {
      const repayDebtX = this.X.newAmount(
        BigInt(
          Math.round(
            reduceAmounts.repayDebtX * 10 ** this.X.decimals * (1 + args.routerArgs.slippage)
          )
        )
      )
      const balance = await createBalanceOfExactValue(client, tx, sender, ta.X, repayDebtX)
      core.repayDebtX(tx, [ta.X, ta.Y, ta.SX, ta.LP], {
        position: this.id,
        cap: args.positionCapId,
        balance,
        supplyPool: this.configInfo.supplyPoolXInfo.id,
        clock: SUI_CLOCK_OBJECT_ID,
      })
      repayDebtRemainingX = balance
      repaidDebtX = repayDebtX
    }
    let repayDebtRemainingY = undefined
    let repaidDebtY: undefined | Amount = undefined
    if (reduceAmounts.repayDebtY > 0) {
      const repayDebtY = this.Y.newAmount(
        BigInt(
          Math.round(
            reduceAmounts.repayDebtY * 10 ** this.Y.decimals * (1 + args.routerArgs.slippage)
          )
        )
      )
      const balance = await createBalanceOfExactValue(client, tx, sender, ta.Y, repayDebtY)
      core.repayDebtY(tx, [ta.X, ta.Y, ta.SY, ta.LP], {
        position: this.id,
        cap: args.positionCapId,
        balance,
        supplyPool: this.configInfo.supplyPoolYInfo.id,
        clock: SUI_CLOCK_OBJECT_ID,
      })
      repayDebtRemainingY = balance
      repaidDebtY = repayDebtY
    }

    // get reduce ticket
    let gotX: Argument, gotY: Argument, ticket: Argument
    if (this.isCetus()) {
      ;[gotX, gotY, ticket] = cetus.reduce(tx, [ta.X, ta.Y, ta.SX, ta.SY], {
        position: this.data.id,
        config: this.configInfo.configId,
        cap: args.positionCapId,
        priceInfo,
        supplyPoolX: this.configInfo.supplyPoolXInfo.id,
        supplyPoolY: this.configInfo.supplyPoolYInfo.id,
        cetusPool: this.configInfo.poolObjectId,
        cetusGlobalConfig: CETUS_GLOBAL_CONFIG_ID,
        factorX64,
        clock: SUI_CLOCK_OBJECT_ID,
      })
    } else if (this.isBluefin()) {
      ;[gotX, gotY, ticket] = bluefin.reduce(tx, [ta.X, ta.Y, ta.SX, ta.SY], {
        position: this.data.id,
        config: this.configInfo.configId,
        cap: args.positionCapId,
        priceInfo,
        supplyPoolX: this.configInfo.supplyPoolXInfo.id,
        supplyPoolY: this.configInfo.supplyPoolYInfo.id,
        bluefinPool: this.configInfo.poolObjectId,
        bluefinGlobalConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        factorX64,
        clock: SUI_CLOCK_OBJECT_ID,
      })
    } else {
      throw new Error('Unsupported pool')
    }
    if (repayDebtRemainingX) {
      balance.join(tx, ta.X, {
        self: gotX,
        balance: repayDebtRemainingX,
      })
    }
    if (repayDebtRemainingY) {
      balance.join(tx, ta.Y, {
        self: gotY,
        balance: repayDebtRemainingY,
      })
    }

    const toRepayX = core.reductionTicketCalcRepayAmtX(tx, [ta.X, ta.SX, ta.SY], {
      ticket,
      supplyPool: this.configInfo.supplyPoolXInfo.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })
    const toRepayY = core.reductionTicketCalcRepayAmtY(tx, [ta.Y, ta.SX, ta.SY], {
      ticket,
      supplyPool: this.configInfo.supplyPoolYInfo.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })

    // swap if needed
    if (args.routerArgs.swapMethod === 'exact-in') {
      if (reduceAmounts.swapX > 0) {
        const swapX = BigInt(
          new Decimal(reduceAmounts.swapX)
            .mul(new Decimal(10).pow(this.X.decimals))
            .mul(1 + args.routerArgs.overestimationFactor)
            .toFixed(0, Decimal.ROUND_DOWN)
        )
        const gotXEstAmt = BigInt(
          reduceAmounts.gotX
            .toDecimal()
            .sub(reduceAmounts.gotDx.toDecimal())
            .mul(10 ** this.X.decimals)
            .toFixed(0, Decimal.ROUND_DOWN)
        )
        const balanceInAmt = min(swapX, gotXEstAmt)

        const balanceIn = balance.split(tx, ta.X, {
          self: gotX,
          value: balanceInAmt,
        })

        const { tx: newTx, balanceOut } = await router.swapBalance({
          tx,
          inInfo: this.X,
          outInfo: this.Y,
          balanceIn,
          amountIn: balanceInAmt,
          sender: sender,
          slippage: args.routerArgs.slippage,
          protocolDenylist: args.routerArgs.protocolDenylist,
        })
        tx = newTx

        balance.join(tx, ta.Y, {
          self: gotY,
          balance: balanceOut,
        })
      } else if (reduceAmounts.swapY > 0) {
        const swapY = BigInt(
          new Decimal(reduceAmounts.swapY)
            .mul(new Decimal(10).pow(this.Y.decimals))
            .mul(1 + args.routerArgs.overestimationFactor)
            .toFixed(0, Decimal.ROUND_DOWN)
        )
        const gotYEstAmt = BigInt(
          reduceAmounts.gotY
            .toDecimal()
            .sub(reduceAmounts.gotDy.toDecimal())
            .mul(10 ** this.Y.decimals)
            .toFixed(0, Decimal.ROUND_DOWN)
        )
        const balanceInAmt = min(swapY, gotYEstAmt)

        const balanceIn = balance.split(tx, ta.Y, {
          self: gotY,
          value: balanceInAmt,
        })

        const { tx: newTx, balanceOut } = await router.swapBalance({
          tx,
          inInfo: this.Y,
          outInfo: this.X,
          balanceIn,
          amountIn: balanceInAmt,
          sender: sender,
          slippage: args.routerArgs.slippage,
          protocolDenylist: args.routerArgs.protocolDenylist,
        })
        tx = newTx

        balance.join(tx, ta.X, {
          self: gotX,
          balance: balanceOut,
        })
      }
    } else {
      let needX = BigInt(
        Decimal.max(
          0,
          (reduceAmounts.gotDx.int - reduceAmounts.gotX.int - (repaidDebtX?.int ?? 0n)).toString()
        ).toFixed(0, Decimal.ROUND_UP)
      )
      let needY = BigInt(
        Decimal.max(
          0,
          (reduceAmounts.gotDy.int - reduceAmounts.gotY.int - (repaidDebtY?.int ?? 0n)).toString()
        ).toFixed(0, Decimal.ROUND_UP)
      )

      if (needX > 0n) {
        needX = max(needX, compoundThresholdCoins.get(this.Y.typeName) ?? 0n)

        const { tx: newTx, balanceOut } = await router.swapExactOutBalance({
          tx,
          inInfo: this.Y,
          outInfo: this.X,
          balanceIn: gotY,
          amountOut: needX,
          sender,
          slippage: args.routerArgs.slippage,
          protocolDenylist: args.routerArgs.protocolDenylist,
        })
        tx = newTx

        balance.join(tx, ta.X, {
          self: gotX,
          balance: balanceOut,
        })
      } else if (needY > 0n) {
        needY = max(needY, compoundThresholdCoins.get(this.X.typeName) ?? 0n)

        const { tx: newTx, balanceOut } = await router.swapExactOutBalance({
          tx,
          inInfo: this.X,
          outInfo: this.Y,
          balanceIn: gotX,
          amountOut: needY,
          sender,
          slippage: args.routerArgs.slippage,
          protocolDenylist: args.routerArgs.protocolDenylist,
        })
        tx = newTx

        balance.join(tx, ta.Y, {
          self: gotY,
          balance: balanceOut,
        })
      }
    }

    const repayXBalance = balance.split(tx, ta.X, { self: gotX, value: toRepayX })
    core.reductionTicketRepayX(tx, [ta.X, ta.SX, ta.SY], {
      ticket,
      supplyPool: this.configInfo.supplyPoolXInfo.id,
      balance: repayXBalance,
      clock: SUI_CLOCK_OBJECT_ID,
    })

    const repayYBalance = balance.split(tx, ta.Y, { self: gotY, value: toRepayY })
    core.reductionTicketRepayY(tx, [ta.Y, ta.SX, ta.SY], {
      ticket,
      supplyPool: this.configInfo.supplyPoolYInfo.id,
      balance: repayYBalance,
      clock: SUI_CLOCK_OBJECT_ID,
    })

    core.destroyReductionTicket(tx, [ta.SX, ta.SY], ticket)

    util.destroyBalanceOrTransfer(tx, ta.X, {
      balance: gotX,
      recipient: sender,
    })
    util.destroyBalanceOrTransfer(tx, ta.Y, {
      balance: gotY,
      recipient: sender,
    })

    return tx
  }

  /**
   * Simulates (dry-runs) a reduction (withdrawal) of the position by a specified factor.
   * Returns detailed reduction information along with the final amounts of X and Y
   * that would be returned to the sender after all repayments and swaps.
   *
   * @param client - The SuiClient instance used for blockchain interactions.
   * @param router - The Router instance used for swaps and routing.
   * @param args - The arguments for the reduction, including factor, positionCapId, and slippage.
   * @param sender - The address of the sender initiating the reduction.
   * @returns The reduction info and the final amounts of X and Y in the position.
   */
  async dryRunReduce(
    client: SuiClient,
    router: Router,
    args: ReduceArgs,
    sender: string
  ): Promise<DryRunReduceResult> {
    const tx = await this.reduce(client, router, args, sender)

    const result = await client.dryRunTransactionBlock({
      transactionBlock: await tx.build({ client }),
    })

    if (result.effects.status.error) {
      throw new Error(result.effects.status.error)
    }

    const reductionEvent = result.events.find(e => isReductionInfo(e.type))
    const reductionInfo = reductionEvent
      ? ReductionInfo.fromBcs(fromBase64(reductionEvent.bcs))
      : undefined
    const repayDebtEvent = result.events.find(e => isRepayDebtInfo(e.type))
    const repayDebtInfo = repayDebtEvent
      ? RepayDebtInfo.fromBcs(fromBase64(repayDebtEvent.bcs))
      : undefined

    let finalX = 0n
    let finalY = 0n
    for (const balanceChange of result.balanceChanges) {
      if (
        typeof balanceChange.owner !== 'object' ||
        !('AddressOwner' in balanceChange.owner) ||
        normalizeSuiAddress(balanceChange.owner.AddressOwner) !== normalizeSuiAddress(sender)
      ) {
        continue
      }

      const { storageRebate, storageCost, computationCost } = result.effects.gasUsed

      let amount = BigInt(balanceChange.amount)
      if (compressSuiType(balanceChange.coinType) === SUI.typeName) {
        amount = amount - (BigInt(storageRebate) - BigInt(storageCost) - BigInt(computationCost))
      }

      if (compressSuiType(balanceChange.coinType) === this.X.typeName) {
        finalX = BigInt(amount)
      } else if (compressSuiType(balanceChange.coinType) === this.Y.typeName) {
        finalY = BigInt(amount)
      }
    }

    const swapX = -(
      (reductionInfo?.withdrawnX || 0n) -
      (reductionInfo?.xRepaid || 0n) -
      (repayDebtInfo?.xRepaid || 0n) -
      finalX
    )
    const swapY = -(
      (reductionInfo?.withdrawnY || 0n) -
      (reductionInfo?.yRepaid || 0n) -
      (repayDebtInfo?.yRepaid || 0n) -
      finalY
    )

    return {
      result,
      reductionInfo,
      swapX: this.X.newAmount(swapX),
      swapY: this.Y.newAmount(swapY),
      finalX: this.X.newAmount(finalX),
      finalY: this.Y.newAmount(finalY),
    }
  }

  calcF(p: Price<PhantomTypeArgument, PhantomTypeArgument>) {
    const { pa, pb } = this.getRange()

    const sqrtP = p.numeric.sqrt()
    const sqrtPa = pa.numeric.sqrt()
    const sqrtPb = pb.numeric.sqrt()

    let f: Decimal
    if (p.numeric.lt(pa.numeric)) {
      f = new Decimal(0)
    } else if (p.numeric.gt(pb.numeric)) {
      f = new Decimal(1)
    } else {
      const fy = sqrtP.sub(sqrtPa)
      const fx = sqrtPb.sub(sqrtP).div(sqrtP.mul(sqrtPb))
      f = fy.div(fy.plus(p.numeric.mul(fx)))
    }

    return f
  }

  /// all prices and amounts are numeric (not human)
  calcXAndYSellAmounts(p: Decimal, f: Decimal, x: bigint, y: bigint) {
    const haveX = new Decimal(x.toString())
    const haveY = new Decimal(y.toString())

    let haveF = f
    if (haveX.gt(0) || haveY.gt(0)) {
      haveF = haveY.div(haveY.plus(haveX.mul(p)))
    }

    if (haveF.lt(f)) {
      // we need more Y so we will sell the right amount of X
      const ySellAmt = new Decimal(0)
      const xSellAmt = f
        .mul(haveY.plus(haveX.mul(p)))
        .sub(haveY)
        .div(p)
        .toDecimalPlaces(0, Decimal.ROUND_DOWN)

      return {
        xSellAmt,
        ySellAmt,
      }
    } else {
      // we need more X so we will sell the right amount of Y
      const xSellAmt = new Decimal(0)
      const ySellAmt = haveY
        .sub(f.mul(haveY.plus(haveX.mul(p))))
        .toDecimalPlaces(0, Decimal.ROUND_DOWN)

      return {
        xSellAmt,
        ySellAmt,
      }
    }
  }

  calcRewardSellAmounts(
    rewardAmount: bigint,
    f: Decimal,
    priceToX: Price<PhantomTypeArgument, PhantomTypeArgument>,
    priceToY: Price<PhantomTypeArgument, PhantomTypeArgument>
  ) {
    const px = priceToX.numeric
    const py = priceToY.numeric

    const rewardSellF = f.mul(px).div(py.plus(f.mul(px.minus(py).abs())))

    const sellForYAmt = BigInt(
      new Decimal(rewardAmount.toString()).mul(rewardSellF).toFixed(0, Decimal.ROUND_DOWN)
    )
    const sellForXAmt = rewardAmount - sellForYAmt

    return {
      sellForXAmt,
      sellForYAmt,
    }
  }

  /**
   * Calculates the final amounts of X and Y in the correct ratio in order to do a deposit,
   * given the arbitrary amounts of X and Y provided. The correct ratio can be achieved
   * by swapping the provided amounts of X and Y.
   *
   * @param args - The arguments for the calculation.
   * @returns The final amounts of X and Y in the correct ratio.
   */
  calcDepositResult(args: CalcDepositResultArgs<X, Y>): { x: Amount; y: Amount } {
    const p = args.pool.currentPrice()
    const f = this.calcF(p)
    const { xSellAmt, ySellAmt } = this.calcXAndYSellAmounts(
      p.numeric,
      f,
      args.xAmt.int,
      args.yAmt.int
    )
    const gotYFromX = xSellAmt.mul(p.numeric)
    const gotXFromY = ySellAmt.div(p.numeric)

    const x = new Decimal(args.xAmt.int.toString()).sub(xSellAmt).add(gotXFromY)
    const y = new Decimal(args.yAmt.int.toString()).sub(ySellAmt).add(gotYFromX)

    return {
      x: this.X.newAmount(BigInt(x.toFixed(0, Decimal.ROUND_DOWN))),
      y: this.Y.newAmount(BigInt(y.toFixed(0, Decimal.ROUND_DOWN))),
    }
  }

  #depositDirect(
    tx: Transaction,
    positionCapId: string,
    xInBalance: TransactionArgument,
    yInBalance: TransactionArgument,
    sender: string
  ) {
    const ta = {
      X: this.X.typeName,
      Y: this.Y.typeName,
      SX: this.configInfo.supplyPoolXInfo.ST.typeName,
      SY: this.configInfo.supplyPoolYInfo.ST.typeName,
    }

    const priceInfo = pyth.create(tx, SUI_CLOCK_OBJECT_ID)
    pyth.add(tx, {
      self: priceInfo,
      info: this.configInfo.pioInfoX.priceInfoObjectId,
    })
    pyth.add(tx, {
      self: priceInfo,
      info: this.configInfo.pioInfoY.priceInfoObjectId,
    })
    const di = debtInfo.empty(tx, this.configInfo.lendFacilCap)
    debtInfo.addFromSupplyPool(tx, [ta.X, ta.SX], {
      self: di,
      pool: this.configInfo.supplyPoolXInfo.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })
    debtInfo.addFromSupplyPool(tx, [ta.Y, ta.SY], {
      self: di,
      pool: this.configInfo.supplyPoolYInfo.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })

    if (this.isCetus()) {
      const [remX, remY] = cetusUtil.ownerAddLiquidity(tx, [ta.X, ta.Y], {
        position: this.data.id,
        config: this.configInfo.configId,
        cap: positionCapId,
        priceInfo,
        debtInfo: di,
        cetusPool: this.configInfo.poolObjectId,
        cetusConfig: CETUS_GLOBAL_CONFIG_ID,
        balanceX: xInBalance,
        balanceY: yInBalance,
        clock: SUI_CLOCK_OBJECT_ID,
      })
      util.destroyBalanceOrTransfer(tx, ta.X, {
        balance: remX,
        recipient: sender,
      })
      util.destroyBalanceOrTransfer(tx, ta.Y, {
        balance: remY,
        recipient: sender,
      })
    } else if (this.isBluefin()) {
      const [remX, remY] = bluefinUtil.ownerAddLiquidity(tx, [ta.X, ta.Y], {
        position: this.data.id,
        config: this.configInfo.configId,
        cap: positionCapId,
        priceInfo,
        debtInfo: di,
        bluefinPool: this.configInfo.poolObjectId,
        bluefinConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        balanceX: xInBalance,
        balanceY: yInBalance,
        clock: SUI_CLOCK_OBJECT_ID,
      })
      util.destroyBalanceOrTransfer(tx, ta.X, {
        balance: remX,
        recipient: sender,
      })
      util.destroyBalanceOrTransfer(tx, ta.Y, {
        balance: remY,
        recipient: sender,
      })
    } else {
      throw new Error(
        `${this.reified.typeArgs[2]} pool type is not supported. Try updating the SDK.`
      )
    }
  }

  async #swapXAndYToCorrectDepositAmounts(
    tx: Transaction,
    xSellAmt: Decimal,
    ySellAmt: Decimal,
    xInBalance: TransactionArgument,
    yInBalance: TransactionArgument,
    sender: string,
    router: Router,
    slippage: number
  ): Promise<Transaction> {
    const ta = {
      X: this.X.typeName,
      Y: this.Y.typeName,
      SX: this.configInfo.supplyPoolXInfo.ST.typeName,
      SY: this.configInfo.supplyPoolYInfo.ST.typeName,
    }

    const compoundThresholdCoins = await getMinSwapAmountBatch([this.X, this.Y])

    const xSellAmtInt = BigInt(xSellAmt.toFixed(0, Decimal.ROUND_DOWN))
    const ySellAmtInt = BigInt(ySellAmt.toFixed(0, Decimal.ROUND_DOWN))

    if (xSellAmtInt > 0n && xSellAmtInt > compoundThresholdCoins.get(this.X.typeName)!) {
      const amountIn = xSellAmtInt
      const balanceIn = balance.split(tx, ta.X, { self: xInBalance, value: amountIn })

      const { tx: newTx, balanceOut } = await router.swapBalance({
        tx,
        inInfo: this.X,
        outInfo: this.Y,
        balanceIn,
        amountIn,
        sender,
        slippage,
      })
      tx = newTx

      balance.join(tx, ta.Y, {
        self: yInBalance,
        balance: balanceOut,
      })
    } else if (ySellAmtInt > 0n && ySellAmtInt > compoundThresholdCoins.get(this.Y.typeName)!) {
      const amountIn = ySellAmtInt
      const balanceIn = balance.split(tx, ta.Y, { self: yInBalance, value: amountIn })

      const { tx: newTx, balanceOut } = await router.swapBalance({
        tx,
        inInfo: this.Y,
        outInfo: this.X,
        balanceIn,
        amountIn,
        sender,
        slippage,
      })
      tx = newTx

      balance.join(tx, ta.X, {
        self: xInBalance,
        balance: balanceOut,
      })
    }

    return tx
  }

  /**
   * Performs a deposit into the position. Executes a swap if necessary to achieve the correct ratio.
   *
   * @param router - The `Router` instance.
   * @param args - The arguments for the deposit.
   * @param sender - The sender of the transaction.
   * @returns The resulting transaction.
   */
  async deposit(router: Router, args: DepositArgs<X, Y>, sender: string) {
    let tx = new Transaction()
    tx.setSenderIfNotSet(sender)

    const p = args.pool.currentPrice()
    const f = this.calcF(p)
    const { xSellAmt, ySellAmt } = this.calcXAndYSellAmounts(
      p.numeric,
      f,
      args.xAmt.int,
      args.yAmt.int
    )

    let xInBalance
    if (args.xAmt.int > 0n) {
      xInBalance = coin.intoBalance(
        tx,
        this.X.typeName,
        coinWithBalance({
          type: this.X.typeName,
          balance: args.xAmt.int,
        })
      )
    } else {
      xInBalance = balance.zero(tx, this.X.typeName)
    }
    let yInBalance
    if (args.yAmt.int > 0n) {
      yInBalance = coin.intoBalance(
        tx,
        this.Y.typeName,
        coinWithBalance({
          type: this.Y.typeName,
          balance: args.yAmt.int,
        })
      )
    } else {
      yInBalance = balance.zero(tx, this.Y.typeName)
    }

    tx = await this.#swapXAndYToCorrectDepositAmounts(
      tx,
      xSellAmt,
      ySellAmt,
      xInBalance,
      yInBalance,
      sender,
      router,
      args.slippage
    )
    this.#depositDirect(tx, args.positionCapId, xInBalance, yInBalance, sender)

    return tx
  }

  /**
   * Fetches the pending / unclaimed and stashed rewards available for the position by doing a dev inspect call
   *
   * @param client - The `SuiClient` instance.
   * @returns The intermediate result of rebalancing the position.
   */
  async devInspectLpUnclaimedRewards(
    client: SuiClient
  ): Promise<DevInspectLpUnclaimedRewardsResult> {
    const ta = {
      X: this.X.typeName,
      Y: this.Y.typeName,
      LP: this.reified.typeArgs[2],
    }

    const tx = new Transaction()

    const [receipt] = core.createRebalanceReceipt(tx, [ta.X, ta.Y, ta.LP], {
      position: this.id,
      config: this.configInfo.configId,
    })

    let xFeeResult: TransactionArgument
    let yFeeResult: TransactionArgument
    const rewardResults: [CoinInfo<PhantomTypeArgument>, TransactionArgument][] = []

    if (this.isCetus()) {
      const [feeX, feeY] = cetus.rebalanceCollectFee(tx, [ta.X, ta.Y], {
        position: this.id,
        config: this.configInfo.configId,
        receipt,
        cetusPool: this.configInfo.poolObjectId,
        cetusConfig: CETUS_GLOBAL_CONFIG_ID,
      })
      xFeeResult = feeX
      yFeeResult = feeY

      for (const rewardCoin of this.configInfo.rewardCoins) {
        const reward = cetus.rebalanceCollectReward(tx, [ta.X, ta.Y, rewardCoin.typeName], {
          position: this.id,
          config: this.configInfo.configId,
          receipt,
          cetusPool: this.configInfo.poolObjectId,
          cetusConfig: CETUS_GLOBAL_CONFIG_ID,
          cetusVault: CETUS_REWARDER_GLOBAL_VAULT,
          clock: SUI_CLOCK_OBJECT_ID,
        })
        rewardResults.push([rewardCoin, reward])
      }
    } else if (this.isBluefin()) {
      const [feeX, feeY] = bluefin.rebalanceCollectFee(tx, [ta.X, ta.Y], {
        position: this.id,
        config: this.configInfo.configId,
        receipt,
        bluefinPool: this.configInfo.poolObjectId,
        bluefinConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        clock: SUI_CLOCK_OBJECT_ID,
      })
      xFeeResult = feeX
      yFeeResult = feeY

      for (const rewardCoin of this.configInfo.rewardCoins) {
        const reward = bluefin.rebalanceCollectReward(tx, [ta.X, ta.Y, rewardCoin.typeName], {
          position: this.id,
          config: this.configInfo.configId,
          receipt,
          bluefinPool: this.configInfo.poolObjectId,
          bluefinConfig: BLUEFIN_GLOBAL_CONFIG_ID,
          clock: SUI_CLOCK_OBJECT_ID,
        })
        rewardResults.push([rewardCoin, reward])
      }
    } else {
      throw new Error(
        `${this.reified.typeArgs[2]} pool type is not supported. Try updating the SDK.`
      )
    }

    balance.value(tx, ta.X, xFeeResult)
    balance.value(tx, ta.Y, yFeeResult)

    const seenRewards = new Set<string>()
    for (const [rewardCoin, reward] of rewardResults) {
      balance.value(tx, rewardCoin.typeName, reward)
      if (seenRewards.has(compressSuiType(rewardCoin.typeName))) {
        throw new Error('duplicate reward coin')
      }
      seenRewards.add(compressSuiType(rewardCoin.typeName))
    }

    const di = await client.devInspectTransactionBlock({
      sender: `0x0000000000000000000000000000000000000000000000000000000000000000`,
      transactionBlock: tx,
    })
    if (di.error) {
      throw new Error(di.error)
    }

    const valueResults = di.results!.slice(-2 - rewardResults.length)

    const x = BigInt(bcs.u64().parse(Uint8Array.from(valueResults[0].returnValues![0][0])))
    const y = BigInt(bcs.u64().parse(Uint8Array.from(valueResults[1].returnValues![0][0])))
    const ret: DevInspectLpUnclaimedRewardsResult = {
      x: Amount.fromInt(x, this.X.decimals),
      y: Amount.fromInt(y, this.Y.decimals),
      rewards: new Map(),
      stashed: new Map(),
    }

    let i = 2
    for (const [rewardCoin] of rewardResults) {
      const amt = BigInt(bcs.u64().parse(Uint8Array.from(valueResults[i].returnValues![0][0])))
      ret.rewards.set(rewardCoin, Amount.fromInt(amt, rewardCoin.decimals))
      i++
    }

    const positionData = this.reified.fromBcs(
      Uint8Array.from(di.results![0].mutableReferenceOutputs![0][1])
    )
    for (const entry of positionData.ownerRewardStash.amounts.contents) {
      const coinType = compressSuiType(entry.key.name)
      const amount = entry.value
      const coinInfo = COIN_INFO_MAP.get(coinType)
      if (!coinInfo) {
        throw new Error(`Coin info not found for stashed reward ${coinType}`)
      }
      ret.stashed.set(coinInfo, Amount.fromInt(amount, coinInfo.decimals))
    }

    return ret
  }

  /**
   * Manually collect pending generated LP fees from the underlying pool.
   *
   * @param tx - The transaction object.
   * @param args - The arguments for the fee collection.
   * @returns the Balance<X> and Balance<Y> of the collected fees.
   */
  ownerCollectFees(tx: Transaction, args: OwnerCollectFeesArgs) {
    let fees: TransactionResult
    if (this.isCetus()) {
      fees = cetus.ownerCollectFee(tx, [this.X.typeName, this.Y.typeName], {
        position: this.id,
        config: this.configInfo.configId,
        cap: args.positionCapId,
        cetusPool: this.configInfo.poolObjectId,
        cetusConfig: CETUS_GLOBAL_CONFIG_ID,
      })
    } else if (this.isBluefin()) {
      fees = bluefin.ownerCollectFee(tx, [this.X.typeName, this.Y.typeName], {
        position: this.id,
        config: this.configInfo.configId,
        cap: args.positionCapId,
        bluefinPool: this.configInfo.poolObjectId,
        bluefinConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        clock: SUI_CLOCK_OBJECT_ID,
      })
    } else {
      throw new Error(
        `${this.reified.typeArgs[2]} pool type is not supported. Try updating the SDK.`
      )
    }

    return [fees[0], fees[1]] as const
  }

  /**
   * Manually collect pending generated LP rewards from the underlying pool for a specific reward coin.
   *
   * @param tx - The transaction object.
   * @param args - The arguments for the reward collection.
   * @returns the Balance<T> of the collected reward coin type T.
   */
  ownerCollectReward(tx: Transaction, args: OwnerCollectRewardArgs) {
    const ta = [this.X.typeName, this.Y.typeName, args.rewardType.typeName] as [
      string,
      string,
      string,
    ]

    let reward: TransactionResult
    if (this.isCetus()) {
      reward = cetus.ownerCollectReward(tx, ta, {
        position: this.id,
        config: this.configInfo.configId,
        cap: args.positionCapId,
        cetusPool: this.configInfo.poolObjectId,
        cetusConfig: CETUS_GLOBAL_CONFIG_ID,
        cetusVault: CETUS_REWARDER_GLOBAL_VAULT,
        clock: SUI_CLOCK_OBJECT_ID,
      })
    } else if (this.isBluefin()) {
      reward = bluefin.ownerCollectReward(tx, ta, {
        position: this.id,
        config: this.configInfo.configId,
        cap: args.positionCapId,
        bluefinPool: this.configInfo.poolObjectId,
        bluefinConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        clock: SUI_CLOCK_OBJECT_ID,
      })
    } else {
      throw new Error(
        `${this.reified.typeArgs[2]} pool type is not supported. Try updating the SDK.`
      )
    }

    return reward
  }

  /**
   * Manually take a stashed reward from the position.
   *
   * @param tx - The transaction object.
   * @param args - The arguments for the reward collection.
   * @returns the `Balance` of the collected reward coin type T.
   */
  ownerTakeStashedReward(tx: Transaction, args: OwnerTakeStashedRewardArgs) {
    return core.ownerTakeStashedRewards(
      tx,
      [this.X.typeName, this.Y.typeName, args.coinInfo.typeName, this.reified.typeArgs[2]],
      {
        position: this.id,
        cap: args.positionCapId,
        amount: args.amount ?? null,
      }
    )
  }

  /**
   * Delete the position object. The position can only be deleted if it has been reduced to 0 and
   * all pending rewards and fees have been collected (see `reduceAndMaybeDelete`).
   *
   * @param tx - The transaction object.
   * @param args - The arguments for the deletion.
   */
  deletePosition(tx: Transaction, args: DeletePositionArgs) {
    if (this.isCetus()) {
      cetus.deletePosition(tx, [this.X.typeName, this.Y.typeName], {
        position: this.id,
        config: this.configInfo.configId,
        cap: args.positionCapId,
        cetusPool: this.configInfo.poolObjectId,
        cetusConfig: CETUS_GLOBAL_CONFIG_ID,
      })
    } else if (this.isBluefin()) {
      bluefin.deletePosition(tx, [this.X.typeName, this.Y.typeName], {
        position: this.id,
        config: this.configInfo.configId,
        cap: args.positionCapId,
        bluefinPool: this.configInfo.poolObjectId,
        bluefinConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        clock: SUI_CLOCK_OBJECT_ID,
      })
    } else {
      throw new Error(
        `${this.reified.typeArgs[2]} pool type is not supported. Try updating the SDK.`
      )
    }
  }

  /**
   * Manually collect all pending generated LP rewards and fees from the underlying pool.
   *
   * @param tx - The transaction object.
   * @param args - The arguments for the reward collection.
   * @returns the `Balances` of all collected rewards and fees.
   */
  withdrawAllRewards(tx: Transaction, args: WithdrawAllRewardsArgs): WithdrawAllRewardsResult {
    const [feeX, feeY] = this.ownerCollectFees(tx, args)

    const rewards: WithdrawAllRewardsResult['rewards'] = []
    for (const rewardCoin of this.configInfo.rewardCoins) {
      const reward = this.ownerCollectReward(tx, {
        rewardType: rewardCoin,
        positionCapId: args.positionCapId,
      })
      rewards.push({
        coinInfo: rewardCoin,
        balance: reward,
      })
    }

    return {
      feeX,
      feeY,
      rewards,
    }
  }

  /**
   * Manually collect all stashed rewards from the position.
   *
   * @param tx - The transaction object.
   * @param args - The arguments for the reward collection.
   * @returns the `Balances` of all collected rewards.
   */
  withdrawAllStashedRewards(
    tx: Transaction,
    args: WithdrawAllStashedRewardsArgs
  ): WithdrawAllStashedRewardsResult {
    const result: WithdrawAllStashedRewardsResult = []
    const coins = new Set<CoinInfo<PhantomTypeArgument>>([
      ...this.configInfo.rewardCoins,
      this.X,
      this.Y,
    ])
    for (const coin of coins) {
      const balance = this.ownerTakeStashedReward(tx, {
        positionCapId: args.positionCapId,
        coinInfo: coin,
      })
      result.push({
        coinInfo: coin,
        balance,
      })
    }
    return result
  }

  /**
   * Convert the rewards collected using `withdrawAllRewards` and `withdrawAllStashedRewards` to the desired coin
   * and transfer them to the TX sender.
   *
   * @param tx - The transaction object.
   * @param client - The `SuiClient` instance.
   * @param router - The `Router` instance.
   * @param args - The arguments for the reward conversion and transfer.
   * @param sender - The sender's address which will receive the converted rewards.
   * @returns the transaction object.
   */
  async convertRewardsAndTransfer(
    tx: Transaction,
    client: SuiClient,
    router: Router,
    args: ConvertRewardsAndTransferArgs,
    sender: string
  ) {
    const rewardResults = await this.devInspectLpUnclaimedRewards(client)

    let compoundThresholdCoins: Map<string, bigint> | undefined
    if (args.convertRewardsTo) {
      const allSwapCoins = [this.X, this.Y, ...this.configInfo.rewardCoins].reduce((acc, coin) => {
        acc.add(coin)
        return acc
      }, new Set<CoinInfo<PhantomTypeArgument>>())
      compoundThresholdCoins = await getMinSwapAmountBatch(Array.from(allSwapCoins))
    }

    const allRewards = new Map<
      string,
      { coinInfo: CoinInfo<PhantomTypeArgument>; balance: TransactionArgument; amount: bigint }
    >()
    const mergeReward = (
      coinInfo: CoinInfo<PhantomTypeArgument>,
      rewardBalance: TransactionArgument,
      type: 'x' | 'y' | 'rewards' | 'stashed'
    ) => {
      let amount: bigint
      switch (type) {
        case 'x':
          amount = rewardResults.x.int
          break
        case 'y':
          amount = rewardResults.y.int
          break
        case 'rewards':
          amount = rewardResults.rewards.get(coinInfo)?.int ?? 0n
          break
        case 'stashed':
          amount = rewardResults.stashed.get(coinInfo)?.int ?? 0n
          break
      }

      if (allRewards.has(coinInfo.typeName)) {
        const entry = allRewards.get(coinInfo.typeName)!
        balance.join(tx, coinInfo.typeName, {
          self: entry.balance,
          balance: rewardBalance,
        })
        entry.amount += amount
        allRewards.set(coinInfo.typeName, entry)
      } else {
        allRewards.set(coinInfo.typeName, { coinInfo, balance: rewardBalance, amount })
      }
    }

    if (args.withdrawAllRewardsResult) {
      mergeReward(this.X, args.withdrawAllRewardsResult.feeX, 'x')
      mergeReward(this.Y, args.withdrawAllRewardsResult.feeY, 'y')
      for (const r of args.withdrawAllRewardsResult.rewards) {
        mergeReward(r.coinInfo, r.balance, 'rewards')
      }
    }
    if (args.withdrawAllStashedRewardsResult) {
      for (const r of args.withdrawAllStashedRewardsResult) {
        mergeReward(r.coinInfo, r.balance, 'stashed')
      }
    }

    const rewardsRouter = new KaiRouterAdapter()
    for (const entry of allRewards.values()) {
      const threshold =
        compoundThresholdCoins?.get(entry.coinInfo.typeName) ?? BigInt(Number.MAX_SAFE_INTEGER)

      if (args.convertRewardsTo && entry.amount > threshold) {
        const amountIn = entry.amount

        const swapResult = await rewardsRouter.swapBalance({
          tx,
          inInfo: entry.coinInfo,
          outInfo: args.convertRewardsTo,
          amountIn,
          balanceIn: entry.balance,
          sender,
          slippage: args.slippage,
        })
        tx = swapResult.tx

        const balanceOut = swapResult.balanceOut
        const coinOut = coin.fromBalance(tx, args.convertRewardsTo.typeName, balanceOut)
        tx.transferObjects([coinOut], sender)
      } else {
        const coinOut = coin.fromBalance(tx, entry.coinInfo.typeName, entry.balance)
        tx.transferObjects([coinOut], sender)
      }
    }

    return tx
  }

  /**
   * A convenience function that combines `withdrawAllRewards`, `withdrawAllStashedRewards` and `convertRewardsAndTransfer`.
   *
   * @param client - The `SuiClient` instance.
   * @param router - The `Router` instance.
   * @param args - The arguments for the reward conversion and transfer.
   * @param sender - The sender's address which will receive the converted rewards.
   * @returns the transaction object.
   */
  async withdrawAllRewardsConvertAndTransfer(
    client: SuiClient,
    router: Router,
    args: WithdrawAllRewardsConvertAndTransferArgs,
    sender: string
  ) {
    let tx = new Transaction()
    const withdrawAllRewardsResult = this.withdrawAllRewards(tx, {
      positionCapId: args.positionCapId,
    })
    const withdrawAllStashedRewardsResult = this.withdrawAllStashedRewards(tx, {
      positionCapId: args.positionCapId,
    })
    const rewardResults = await this.devInspectLpUnclaimedRewards(client)
    tx = await this.convertRewardsAndTransfer(
      tx,
      client,
      router,
      {
        rewardResults,
        withdrawAllRewardsResult,
        withdrawAllStashedRewardsResult,
        convertRewardsTo: args.convertRewardsTo,
        slippage: args.slippage,
      },
      sender
    )

    return tx
  }

  /**
   * Reduce the position (withdraw) and delete it if it's reduced to 0 (factor 1).
   * The resulting amounts will be transferred to the sender.
   *
   * @param client - The `SuiClient` instance.
   * @param router - The `Router` instance.
   * @param args - The arguments for the reduction.
   * @param sender - The sender's address which will receive the converted rewards.
   * @returns the transaction object.
   */
  async reduceAndMaybeDelete(
    client: SuiClient,
    router: Router,
    args: ReduceAndMaybeDeleteArgs,
    sender: string
  ) {
    const isCetusExploitedCheck = async () => {
      const position = this as unknown as Position<
        PhantomTypeArgument,
        PhantomTypeArgument,
        CetusPosition
      >
      return (
        position.isCetus() &&
        CetusRedemptionUtil.configIsAffected(position.configInfo) &&
        (await CetusRedemptionUtil.positionIsCut(client, position))
      )
    }

    // eslint-disable-next-line prefer-const
    let [tx, isCetusExploited] = await Promise.all([
      this.reduce(client, router, args, sender),
      isCetusExploitedCheck(),
    ])
    if (args.factor.lt(1)) {
      return tx
    }

    const withdrawAllRewardsResult = this.withdrawAllRewards(tx, args)
    const withdrawAllStashedRewardsResult = this.withdrawAllStashedRewards(tx, args)
    const rewardResults = await this.devInspectLpUnclaimedRewards(client)
    tx = await this.convertRewardsAndTransfer(
      tx,
      client,
      router,
      {
        withdrawAllRewardsResult,
        withdrawAllStashedRewardsResult,
        rewardResults: rewardResults,
        convertRewardsTo: args.convertRewardsTo,
        slippage: args.routerArgs.slippage,
      },
      sender
    )

    if (isCetusExploited) {
      CetusRedemptionUtil.destructCetusPositionAndTransferLp(
        this as unknown as Position<PhantomTypeArgument, PhantomTypeArgument, CetusPosition>,
        tx,
        args.positionCapId,
        sender
      )
    } else {
      this.deletePosition(tx, args)
    }

    return tx
  }

  /**
   * Compound the position by collecting fees and rewards, converting them to the correct X and Y ratio
   * and depositing them back into the position.
   *
   * @param client - The `SuiClient` instance.
   * @param args - The arguments for the compound.
   * @param sender - The TX sender address which is used to receive any dust amounts from the conversion.
   * @returns the transaction object.
   */
  async compound(client: SuiClient, args: CompoundArgs, sender: string) {
    const rewards = await this.devInspectLpUnclaimedRewards(client)

    const priceCache = new PriceCache(60)
    const router = new KaiRouterAdapter()

    const allSwapCoins = [this.X, this.Y, ...this.configInfo.rewardCoins].reduce((acc, coin) => {
      acc.add(coin)
      return acc
    }, new Set<CoinInfo<PhantomTypeArgument>>())

    const compoundThresholdCoins = await getMinSwapAmountBatch(Array.from(allSwapCoins))

    const collectFees =
      rewards.x.int > compoundThresholdCoins.get(this.X.typeName)! ||
      rewards.y.int > compoundThresholdCoins.get(this.Y.typeName)!
    const rewardsToCollect = Array.from(rewards.rewards.entries()).filter(([coinInfo, amount]) => {
      return amount.int > compoundThresholdCoins.get(coinInfo.typeName)!
    })

    const rewardToXAndYPrices = (
      await Promise.all(
        rewardsToCollect.map(async ([coinInfo]) => {
          const priceToX = await priceCache.get(coinInfo, this.X)
          const priceToY = await priceCache.get(coinInfo, this.Y)
          return { coinInfo, priceToX, priceToY }
        })
      )
    ).reduce((acc, res) => {
      acc.set(res.coinInfo.typeName, {
        priceToX: res.priceToX,
        priceToY: res.priceToY,
      })
      return acc
    }, new Map<string, { priceToX: Price<PhantomTypeArgument, PhantomTypeArgument>; priceToY: Price<PhantomTypeArgument, PhantomTypeArgument> }>())

    const f = this.calcF(args.pool.currentPrice())

    let tx = new Transaction()

    const xInBalance = balance.zero(tx, this.X.typeName)
    const yInBalance = balance.zero(tx, this.Y.typeName)
    if (collectFees) {
      const collectedFees = this.ownerCollectFees(tx, {
        positionCapId: args.positionCapId,
      })
      let feeX = collectedFees[0] as TransactionArgument
      let feeY = collectedFees[1] as TransactionArgument

      let feeXAmt = rewards.x.int
      if (feeXAmt < compoundThresholdCoins.get(this.X.typeName)!) {
        feeXAmt = 0n
        util.destroyBalanceOrTransfer(tx, this.X.typeName, {
          balance: feeX,
          recipient: sender,
        })
        feeX = balance.zero(tx, this.X.typeName)
      }
      let feeYAmt = rewards.y.int
      if (feeYAmt < compoundThresholdCoins.get(this.Y.typeName)!) {
        feeYAmt = 0n
        util.destroyBalanceOrTransfer(tx, this.Y.typeName, {
          balance: feeY,
          recipient: sender,
        })
        feeY = balance.zero(tx, this.Y.typeName)
      }

      const { xSellAmt, ySellAmt } = this.calcXAndYSellAmounts(
        args.pool.currentPrice().numeric,
        f,
        feeXAmt,
        feeYAmt
      )

      tx = await this.#swapXAndYToCorrectDepositAmounts(
        tx,
        xSellAmt,
        ySellAmt,
        feeX,
        feeY,
        sender,
        router,
        args.slippage
      )

      balance.join(tx, this.X.typeName, {
        self: xInBalance,
        balance: feeX,
      })
      balance.join(tx, this.Y.typeName, {
        self: yInBalance,
        balance: feeY,
      })
    }

    for (const [coinInfo, amount] of rewardsToCollect) {
      const prices = rewardToXAndYPrices.get(coinInfo.typeName)!
      const { sellForXAmt, sellForYAmt } = this.calcRewardSellAmounts(
        amount.int,
        f,
        prices.priceToX,
        prices.priceToY
      )

      const rewardBalance = this.ownerCollectReward(tx, {
        rewardType: coinInfo,
        positionCapId: args.positionCapId,
      })

      if (sellForXAmt > 0n && sellForXAmt > compoundThresholdCoins.get(coinInfo.typeName)!) {
        const balanceIn = balance.split(tx, coinInfo.typeName, {
          self: rewardBalance,
          value: sellForXAmt,
        })

        const { tx: newTx, balanceOut } = await router.swapBalance({
          tx,
          inInfo: coinInfo,
          outInfo: this.X,
          balanceIn,
          amountIn: sellForXAmt,
          sender,
          slippage: args.slippage,
        })
        tx = newTx

        balance.join(tx, this.X.typeName, {
          self: xInBalance,
          balance: balanceOut,
        })
      }
      if (sellForYAmt > 0n && sellForYAmt > compoundThresholdCoins.get(coinInfo.typeName)!) {
        const balanceIn = balance.split(tx, coinInfo.typeName, {
          self: rewardBalance,
          value: sellForYAmt,
        })

        const { tx: newTx, balanceOut } = await router.swapBalance({
          tx,
          inInfo: coinInfo,
          outInfo: this.Y,
          balanceIn,
          amountIn: sellForYAmt,
          sender,
          slippage: args.slippage,
        })
        tx = newTx

        balance.join(tx, this.Y.typeName, {
          self: yInBalance,
          balance: balanceOut,
        })
      }
      util.destroyBalanceOrTransfer(tx, coinInfo.typeName, {
        balance: rewardBalance,
        recipient: sender,
      })
    }

    this.#depositDirect(tx, args.positionCapId, xInBalance, yInBalance, sender)

    return tx
  }
}
