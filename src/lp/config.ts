import {
  PhantomTypeArgument,
  StructClass,
  StructClassReified,
  TypeArgument,
} from '../gen/_framework/reified'
import {
  isPosition,
  Position as Position_,
  PositionConfig as PositionConfig_,
  PositionReified,
} from '../gen/kai-leverage/position-core-clmm/structs'
import { SupplyPool, SupplyPoolInfo, SUPPLY_POOL_INFOS } from './supply-pool'
import { Position as CetusPosition } from '../gen/cetus-clmm/position/structs'
import { Position as BluefinPosition } from '../gen/bluefin-spot/position/structs'
import { Position } from './position'
import { SuiClient, SuiObjectData } from '@mysten/sui/client'
import { Pool as CetusPool, isPool as isCetusPool } from '../gen/cetus-clmm/pool/structs'
import { Pool as BluefinPool, isPool as isBluefinPool } from '../gen/bluefin-spot/pool/structs'
import * as cetus from '../gen/kai-leverage/cetus/functions'
import * as bluefin from '../gen/kai-leverage/bluefin-spot/functions'
import { ClmmPool } from './clmm-pool'
import {
  BLUE,
  CETUS,
  CoinInfo,
  DEEP,
  stSUI,
  SUI,
  suiUSDT,
  USDC,
  USDY,
  whUSDCe,
  whUSDTe,
} from '../coin-info'
import { PositionMath } from './position-math'
import Decimal from 'decimal.js'
import { Amount } from '../amount'
import { Price } from '../price'
import { min } from '../math'
import {
  DEEPPioInfo,
  PriceFeedInfo,
  suiPioInfo,
  suiUsdtPioInfo,
  USDCPioInfo,
  USDYPioInfo,
  whUSDCePioInfo,
  whUSDTePioInfo,
} from '../pyth'
import {
  coinWithBalance,
  Transaction,
  TransactionObjectArgument,
  TransactionResult,
} from '@mysten/sui/transactions'
import { normalizeSuiObjectId, SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import { CETUS_GLOBAL_CONFIG_ID } from '../constants'
import * as coin from '../gen/sui/coin/functions'
import * as pyth from '../gen/kai-leverage/pyth/functions'
import * as i32 from '../gen/integer-mate/i32/functions'
import { compressSuiType } from '../gen/_framework/util'
import * as balance from '../gen/sui/balance/functions'
import { BLUEFIN_GLOBAL_CONFIG_ID } from '../constants'

export interface PositionConfigInfoConstructorArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> {
  name: string
  configId: string
  poolObjectId: string
  lendFacilCap: string
  supplyPoolXInfo: SupplyPoolInfo<X, PhantomTypeArgument>
  supplyPoolYInfo: SupplyPoolInfo<Y, PhantomTypeArgument>
  pioInfoX: PriceFeedInfo<X>
  pioInfoY: PriceFeedInfo<Y>
  positionReified: PositionReified<X, Y, LP>
  poolReified: StructClassReified<StructClass, unknown>
  isReversedPair: boolean
  rewardCoins: CoinInfo<PhantomTypeArgument>[]
}

export interface CanBorrowX<X extends PhantomTypeArgument> {
  /** The amount of X to borrow */
  borrowAmount: bigint
  /** The X supply pool data */
  supplyPoolX: SupplyPool<X, PhantomTypeArgument>
  /**
   * Optional timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CanBorrowY<Y extends PhantomTypeArgument> {
  /** The amount of Y to borrow */
  borrowAmount: bigint
  /** The Y supply pool data */
  supplyPoolY: SupplyPool<Y, PhantomTypeArgument>
  /**
   * Optional timestamp (ms) to simulate current supply pool state considering interest accrued since
   * last supply pool update.
   */
  timestampMs?: number
}

export interface CreatePositionArgs {
  /** The position liquidity (l) value */
  liquidity: bigint
  /** The lower tick of the position */
  tickA: number
  /** The upper tick of the position */
  tickB: number
  /** The principal `Balance` of X to supply (collateral) */
  balanceUX: TransactionObjectArgument
  /** The principal `Balance` of Y to supply (collateral) */
  balanceUY: TransactionObjectArgument
}

export interface CreatePositionFromWalletArgs {
  /** The position liquidity (l) value */
  liquidity: bigint
  /** The lower tick of the position */
  tickA: number
  /** The upper tick of the position */
  tickB: number
  /** The principal amount of X to supply (collateral) */
  UX: Amount
  /** The principal amount of Y to supply (collateral) */
  UY: Amount
}

/**
 * A class that contains information about a position config.
 */
export class PositionConfigInfo<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> {
  readonly configReified = PositionConfig_.r

  readonly name: string
  readonly configId: string
  readonly X: CoinInfo<X>
  readonly Y: CoinInfo<Y>
  readonly poolObjectId: string
  readonly lendFacilCap: string
  readonly supplyPoolXInfo: SupplyPoolInfo<X, PhantomTypeArgument>
  readonly supplyPoolYInfo: SupplyPoolInfo<Y, PhantomTypeArgument>
  readonly pioInfoX: PriceFeedInfo<X>
  readonly pioInfoY: PriceFeedInfo<Y>
  readonly positionReified: PositionReified<X, Y, LP>
  readonly poolReified: StructClassReified<StructClass, unknown>
  readonly isReversedPair: boolean
  readonly rewardCoins: CoinInfo<PhantomTypeArgument>[]

  constructor(args: PositionConfigInfoConstructorArgs<X, Y, LP>) {
    this.name = args.name
    this.configId = args.configId
    this.X = args.supplyPoolXInfo.T
    this.Y = args.supplyPoolYInfo.T
    this.poolObjectId = args.poolObjectId
    this.lendFacilCap = args.lendFacilCap
    this.supplyPoolXInfo = args.supplyPoolXInfo
    this.supplyPoolYInfo = args.supplyPoolYInfo
    this.pioInfoX = args.pioInfoX
    this.pioInfoY = args.pioInfoY
    this.positionReified = args.positionReified
    this.poolReified = args.poolReified
    this.isReversedPair = args.isReversedPair
    this.rewardCoins = args.rewardCoins
  }

  /**
   * Creates a Position instance by deserializing BCS data
   *
   * @param data - The BCS data
   * @returns `Position`
   */
  positionFromBcs(data: Uint8Array) {
    const positionData = this.positionReified.fromBcs(data)
    return new Position({
      configInfo: this,
      data: positionData,
    })
  }

  /**
   * Creates a PositionConfig instance by deserializing BCS data
   *
   * @param data - The BCS data
   * @returns `PositionConfig`
   */
  configFromBcs(data: Uint8Array) {
    return new PositionConfig({
      info: this,
      data: PositionConfig_.fromBcs(data),
    })
  }

  /**
   * Fetches the position config from the chain
   *
   * @param client - The Sui client
   * @returns `PositionConfig`
   */
  fetchConfigData(client: SuiClient) {
    return PositionConfig_.r.fetch(client, this.configId)
  }

  /**
   * Fetches the position config from the chain
   *
   * @param client - The Sui client
   * @returns `PositionConfig`
   */
  async fetchConfig(client: SuiClient) {
    return new PositionConfig({
      info: this,
      data: await PositionConfig_.r.fetch(client, this.configId),
    })
  }

  /**
   * Creates a ClmmPool instance of this config by deserializing BCS data
   *
   * @param data - The BCS data
   * @returns `ClmmPool`
   */
  poolFromBcs(data: Uint8Array) {
    const poolData = this.poolReified.fromBcs(data)
    return new ClmmPool({
      reified: this.poolReified,
      X: this.X,
      Y: this.Y,
      data: poolData,
    })
  }

  /**
   * Fetches the CLMM pool of this config from the chain
   *
   * @param client - The Sui client
   * @returns `ClmmPool`
   */
  async fetchPool(client: SuiClient) {
    const poolData = await this.poolReified.fetch(client, this.poolObjectId)
    return new ClmmPool({
      reified: this.poolReified,
      X: this.X,
      Y: this.Y,
      data: poolData,
    })
  }

  /**
   * Checks if this config is for a Cetus pool
   *
   * @returns `boolean`
   */
  isCetus(): this is PositionConfig<X, Y, CetusPosition> {
    return isCetusPool(this.poolReified.fullTypeName)
  }

  /**
   * Checks if this config is for a Bluefin pool
   *
   * @returns `boolean`
   */
  isBluefin(): this is PositionConfig<X, Y, BluefinPosition> {
    return isBluefinPool(this.poolReified.fullTypeName)
  }

  /**
   * Checks whether the specified amount of X can be borrowed for position creation based on
   * the current and max utilization of the underlying supply pool.
   * `timestampMs` is optional and can be used to simulate the current supply pool state at
   * specified timestamp to take into account accrued interest since last pool update.
   *
   * @param args - The arguments
   * @returns `boolean`
   */
  canBorrowX(args: CanBorrowX<X>) {
    if (args.supplyPoolX.data.id !== this.supplyPoolXInfo.id) {
      throw new Error('supply pool X id mismatch')
    }
    const facilInfo = args.supplyPoolX.getFacilInfo(this.lendFacilCap)

    if (args.supplyPoolX.data.availableBalance.value < args.borrowAmount) {
      return false
    }

    const newFacilLiabilities =
      (args.supplyPoolX.calcUpdatedLiabilityX64(facilInfo, args.timestampMs) >> 64n) +
      args.borrowAmount
    if (newFacilLiabilities > facilInfo.maxLiabilityOutstanding) {
      return false
    }

    const newUtilization = args.supplyPoolX.calcUtilizationAfterBorrow(
      args.borrowAmount,
      args.timestampMs
    )
    const maxUtilization = new Decimal(facilInfo.maxUtilizationBps.toString()).div(10000)
    if (newUtilization.gt(maxUtilization)) {
      return false
    }

    return true
  }

  /**
   * Checks whether the specified amount of Y can be borrowed for position creation based on
   * the current and max utilization of the underlying supply pool.
   * `timestampMs` is optional and can be used to simulate the current supply pool state at
   * specified timestamp to take into account accrued interest since last pool update.
   *
   * @param args - The arguments
   * @returns `boolean`
   */
  canBorrowY(args: CanBorrowY<Y>) {
    if (args.supplyPoolY.data.id !== this.supplyPoolYInfo.id) {
      throw new Error('supply pool Y id mismatch')
    }
    const facilInfo = args.supplyPoolY.getFacilInfo(this.lendFacilCap)

    if (args.supplyPoolY.data.availableBalance.value < args.borrowAmount) {
      return false
    }

    const newFacilLiabilities =
      (args.supplyPoolY.calcUpdatedLiabilityX64(facilInfo, args.timestampMs) >> 64n) +
      args.borrowAmount
    if (newFacilLiabilities > facilInfo.maxLiabilityOutstanding) {
      return false
    }

    const newUtilization = args.supplyPoolY.calcUtilizationAfterBorrow(
      args.borrowAmount,
      args.timestampMs
    )
    const maxUtilization = new Decimal(facilInfo.maxUtilizationBps.toString()).div(10000)
    if (newUtilization.gt(maxUtilization)) {
      return false
    }

    return true
  }
}

export interface PositionConfigConstructorArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> {
  info: PositionConfigInfo<X, Y, LP>
  data: PositionConfig_
}

export interface FindMaxPositionLiquidityArgs<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
> {
  /** The lower tick of the position */
  tickA: number
  /** The upper tick of the position */
  tickB: number
  /** The principal amount of X to be supplied (collateral) */
  UX: Amount
  /** The principal amount of Y to be supplied (collateral) */
  UY: Amount
  /** The current price of the underlying CLMM pool */
  poolPrice: Price<X, Y>
  /** The price from the Pyth price feed */
  pythPrice: Price<X, Y>
}

/**
 * A class that represents a position config.
 */
export class PositionConfig<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> {
  readonly info: PositionConfigInfo<X, Y, LP>
  readonly data: PositionConfig_
  readonly X: CoinInfo<X>
  readonly Y: CoinInfo<Y>
  readonly id: string

  constructor(args: PositionConfigConstructorArgs<X, Y, LP>) {
    this.info = args.info
    this.data = args.data
    this.X = args.info.X
    this.Y = args.info.Y
    this.id = args.data.id
  }

  /**
   * Creates a PositionConfig instance from its BCS data. Only works for configs recognized by the
   * SDK.
   *
   * @param data - The BCS data
   * @returns `PositionConfig`
   */
  static fromData(data: PositionConfig_) {
    const info = POSITION_CONFIG_INFOS.find(info => info.configId === data.id)
    if (!info) {
      return undefined
    }
    return new PositionConfig({ info, data })
  }

  /**
   * Creates a PositionConfig instance from its BCS data. Only works for configs recognized by the
   * SDK.
   *
   * @param data - The BCS data
   * @returns `PositionConfig`
   */
  static fromBcs(data: Uint8Array) {
    return PositionConfig.fromData(PositionConfig_.fromBcs(data))
  }

  /**
   * Creates a PositionConfig instance from its SuiObjectData
   *
   * @param data -  The SuiObjectData struct to create the PositionConfig instance from.
   * @returns `PositionConfig`
   */
  static fromSuiObjectData(data: SuiObjectData) {
    return PositionConfig.fromData(PositionConfig_.fromSuiObjectData(data))
  }

  /**
   * @returns `minLiqStartPriceDelta` as a decimal number
   */
  get minLiqStartPriceDelta(): Decimal {
    return new Decimal(this.data.minLiqStartPriceDeltaBps).div(10000)
  }

  /**
   * @returns `deleverageMargin` as a decimal number
   */
  get deleverageMargin(): Decimal {
    return new Decimal(this.data.deleverageMarginBps).div(10000)
  }

  /**
   * @returns `liqMargin` as a decimal number
   */
  get liqMargin(): Decimal {
    return new Decimal(this.data.liqMarginBps).div(10000)
  }

  /**
   * @returns `minInitMargin` as a decimal number
   */
  get minInitMargin(): Decimal {
    return new Decimal(this.data.minInitMarginBps).div(10000)
  }

  /**
   * Calculates the health of a position based on its margin level
   *
   * @param marginLevel - The margin level
   * @returns `Decimal`
   */
  calcHealth(marginLevel: Decimal): Decimal {
    const minInitMargin = new Decimal(this.data.minInitMarginBps.toString()).div(10000)
    const liqMargin = new Decimal(this.data.liqMarginBps.toString()).div(10000)

    return marginLevel.sub(liqMargin).div(minInitMargin.sub(liqMargin))
  }

  /**
   * Checks if this config is for a Cetus pool
   *
   * @returns `boolean`
   */
  isCetus(): this is PositionConfig<X, Y, CetusPosition> {
    return this.info.isCetus()
  }

  /**
   * Checks if this config is for a Bluefin pool
   *
   * @returns `boolean`
   */
  isBluefin(): this is PositionConfig<X, Y, BluefinPosition> {
    return this.info.isBluefin()
  }

  /**
   * Finds the maximum allowed liquidity for position creation given the range and the principal
   * amounts.
   *
   * @param args - The arguments
   * @returns `bigint`
   */
  findMaxPositionLiquidity(args: FindMaxPositionLiquidityArgs<X, Y>): bigint {
    if (args.pythPrice.X.typeName !== this.info.X.typeName) {
      throw new Error('pythPrice X type mismatch')
    }
    if (args.pythPrice.Y.typeName !== this.info.Y.typeName) {
      throw new Error('pythPrice Y type mismatch')
    }

    const tickA = args.tickA
    const tickB = args.tickB
    const UX = new Decimal(args.UX.int.toString())
    const UY = new Decimal(args.UY.int.toString())

    const fmlArgs = {
      tickA,
      tickB,
      UX,
      UY,
      minLiqStartPriceDelta: this.minLiqStartPriceDelta,
      liqMargin: this.liqMargin,
      minInitMargin: this.minInitMargin,
    }

    const poolMaxL = BigInt(
      PositionMath.findMaxL({
        ...fmlArgs,
        P0: args.poolPrice.numeric,
      }).toFixed(0, Decimal.ROUND_DOWN)
    )

    const pythMaxL = BigInt(
      PositionMath.findMaxL({
        ...fmlArgs,
        P0: args.pythPrice.numeric,
      }).toFixed(0, Decimal.ROUND_DOWN)
    )

    return min(poolMaxL, pythMaxL)
  }

  /**
   * Creates a new position by taking the principal amounts from the sender wallet.
   *
   * @param tx - The transaction
   * @param args - The arguments
   * @param walletAddress - The sender
   * @returns `TransactionResult` of the created `PositionCap`
   */
  createPosition(tx: Transaction, args: CreatePositionArgs) {
    const priceInfo = pyth.create(tx, SUI_CLOCK_OBJECT_ID)
    pyth.add(tx, {
      self: priceInfo,
      info: this.info.pioInfoX.priceInfoObjectId,
    })
    pyth.add(tx, {
      self: priceInfo,
      info: this.info.pioInfoY.priceInfoObjectId,
    })

    const creationFee = coin.intoBalance(
      tx,
      SUI.typeName,
      coinWithBalance({
        balance: this.data.positionCreationFeeSui,
        type: SUI.typeName,
        useGasCoin: false,
      })
    )

    if (this.isCetus()) {
      let tickA: TransactionResult
      if (args.tickA >= 0) {
        tickA = i32.from(tx, Math.abs(args.tickA))
      } else {
        tickA = i32.negFrom(tx, Math.abs(args.tickA))
      }
      let tickB: TransactionResult
      if (args.tickB >= 0) {
        tickB = i32.from(tx, Math.abs(args.tickB))
      } else {
        tickB = i32.negFrom(tx, Math.abs(args.tickB))
      }

      const ticket = cetus.createPositionTicket(tx, [this.X.typeName, this.Y.typeName], {
        cetusPool: this.data.poolObjectId,
        config: this.id,
        tickA,
        tickB,
        principalX: args.balanceUX,
        principalY: args.balanceUY,
        deltaL: args.liquidity,
        priceInfo,
      })
      cetus.borrowForPositionX(
        tx,
        [this.X.typeName, this.Y.typeName, this.info.supplyPoolXInfo.ST.typeName],
        {
          ticket,
          config: this.id,
          supplyPool: this.info.supplyPoolXInfo.id,
          clock: SUI_CLOCK_OBJECT_ID,
        }
      )
      cetus.borrowForPositionY(
        tx,
        [this.X.typeName, this.Y.typeName, this.info.supplyPoolYInfo.ST.typeName],
        {
          ticket,
          config: this.info.configId,
          supplyPool: this.info.supplyPoolYInfo.id,
          clock: SUI_CLOCK_OBJECT_ID,
        }
      )

      const positionCap = cetus.createPosition(tx, [this.X.typeName, this.Y.typeName], {
        config: this.id,
        ticket,
        cetusPool: this.data.poolObjectId,
        cetusGlobalConfig: CETUS_GLOBAL_CONFIG_ID,
        creationFee,
        clock: SUI_CLOCK_OBJECT_ID,
      })

      return positionCap
    } else if (this.isBluefin()) {
      let tickA: TransactionResult
      if (args.tickA >= 0) {
        tickA = i32.from(tx, Math.abs(args.tickA))
      } else {
        tickA = i32.negFrom(tx, Math.abs(args.tickA))
      }
      let tickB: TransactionResult
      if (args.tickB >= 0) {
        tickB = i32.from(tx, Math.abs(args.tickB))
      } else {
        tickB = i32.negFrom(tx, Math.abs(args.tickB))
      }

      const ticket = bluefin.createPositionTicket(tx, [this.X.typeName, this.Y.typeName], {
        bluefinPool: this.data.poolObjectId,
        config: this.id,
        tickA,
        tickB,
        principalX: args.balanceUX,
        principalY: args.balanceUY,
        deltaL: args.liquidity,
        priceInfo,
      })
      bluefin.borrowForPositionX(
        tx,
        [this.X.typeName, this.Y.typeName, this.info.supplyPoolXInfo.ST.typeName],
        {
          ticket,
          config: this.id,
          supplyPool: this.info.supplyPoolXInfo.id,
          clock: SUI_CLOCK_OBJECT_ID,
        }
      )
      bluefin.borrowForPositionY(
        tx,
        [this.X.typeName, this.Y.typeName, this.info.supplyPoolYInfo.ST.typeName],
        {
          ticket,
          config: this.info.configId,
          supplyPool: this.info.supplyPoolYInfo.id,
          clock: SUI_CLOCK_OBJECT_ID,
        }
      )

      const positionCap = bluefin.createPosition(tx, [this.X.typeName, this.Y.typeName], {
        config: this.id,
        ticket,
        bluefinPool: this.data.poolObjectId,
        bluefinGlobalConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        creationFee,
        clock: SUI_CLOCK_OBJECT_ID,
      })

      return positionCap
    } else {
      throw new Error(`Unsupported pool type ${this.info.poolReified.fullTypeName}`)
    }
  }

  /**
   * Creates a new position by taking the principal amounts from the sender wallet.
   * Transfers the created `PositionCap` to the sender.
   *
   * @param tx - The transaction
   * @param args - The arguments
   * @param walletAddress - The sender
   * @returns `TransactionResult` of the created `PositionCap`
   */
  createPositionFromWallet(
    tx: Transaction,
    args: CreatePositionFromWalletArgs,
    walletAddress: string
  ) {
    tx.setSenderIfNotSet(walletAddress)

    let balanceUX
    if (args.UX.int > 0n) {
      balanceUX = coin.intoBalance(
        tx,
        this.X.typeName,
        coinWithBalance({
          balance: args.UX.int,
          type: this.X.typeName,
        })
      )
    } else {
      balanceUX = balance.zero(tx, this.X.typeName)
    }

    let balanceUY
    if (args.UY.int > 0n) {
      balanceUY = coin.intoBalance(
        tx,
        this.Y.typeName,
        coinWithBalance({
          balance: args.UY.int,
          type: this.Y.typeName,
        })
      )
    } else {
      balanceUY = balance.zero(tx, this.Y.typeName)
    }

    const positionCap = this.createPosition(tx, {
      balanceUX,
      balanceUY,
      liquidity: args.liquidity,
      tickA: args.tickA,
      tickB: args.tickB,
    })

    tx.transferObjects([positionCap], walletAddress)
  }
}

export const POSITION_CONFIG_INFOS: Array<
  PositionConfigInfo<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
> = [
  new PositionConfigInfo({
    name: 'Cetus wUSDT/wUSDC',
    configId: '0x2d52e5fe8af24f2c750250fca6ce5d595d22287f12d29c6ffbae490f5650478d',
    poolObjectId: '0xc8d7a1503dc2f9f5b05449a87d8733593e2f0f3e7bffd90541252782e4d2ca20',
    lendFacilCap: '0xf61382ca5e79c6bdccba39fc375c7b34daa02c7076369a8a34741f22980607ff',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.wUSDT as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.wUSDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: whUSDTePioInfo,
    pioInfoY: whUSDCePioInfo,
    positionReified: Position_.r(whUSDTe.p, whUSDCe.p, CetusPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: CetusPool.r(whUSDTe.p, whUSDCe.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: false,
    rewardCoins: [SUI, CETUS],
  }),
  new PositionConfigInfo({
    name: 'Cetus USDC/wUSDT',
    configId: '0xc64d5b0102b85b823d8f8ae5685ea1c153d1c18dcf13a4719798fdf591a9a1b9',
    poolObjectId: '0x6bd72983b0b5a77774af8c77567bb593b418ae3cd750a5926814fcd236409aaa',
    lendFacilCap: '0x085807ffff95935d311a714cdffa0d10ec7dc80e6bd393cee2b644f6aece5b01',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.paused_USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.wUSDT as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: USDCPioInfo,
    pioInfoY: whUSDTePioInfo,
    positionReified: Position_.r(USDC.p, whUSDTe.p, CetusPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: CetusPool.r(USDC.p, whUSDTe.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: true,
    rewardCoins: [CETUS],
  }),
  new PositionConfigInfo({
    name: 'Cetus USDC/SUI',
    configId: '0xd6a055c8143f2bb97fdcb34f91ac723708d71473e7dff670a9a2218cc91eab16',
    poolObjectId: '0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105',
    lendFacilCap: '0x590468991d9ed6993953e46dad98b9ec5b003ce99d213346b4349c12880547b2',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.paused_USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.SUI as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: USDCPioInfo,
    pioInfoY: suiPioInfo,
    positionReified: Position_.r(USDC.p, SUI.p, CetusPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: CetusPool.r(USDC.p, SUI.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: true,
    rewardCoins: [SUI, CETUS],
  }),
  new PositionConfigInfo({
    name: 'Bluefin wUSDT/USDC',
    configId: '0x63ded6c35c3f23e471c364ae235216709ca6dd3f83ea763f0be20acc049059d7',
    poolObjectId: '0x0321b68a0fca8c990710d26986ba433d06b351deba9384017cd6175f20466a8f',
    lendFacilCap: '0x4c7a0066ba40bbe24bd15fd3845cf22d438f301558446b3cc36ca4d182ab4ce0',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.wUSDT as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.paused_USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: whUSDTePioInfo,
    pioInfoY: USDCPioInfo,
    positionReified: Position_.r(whUSDTe.p, USDC.p, BluefinPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: BluefinPool.r(whUSDTe.p, USDC.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: false,
    rewardCoins: [SUI, BLUE],
  }),
  new PositionConfigInfo({
    name: 'Cetus USDC/suiUSDT',
    configId: '0x60161ddff3225cad16905d659d938007c3d6baa8f64e27fc6f503cee05d0feca',
    poolObjectId: '0x7df346f8ef98ad20869ff6d2fc7c43c00403a524987509091b39ce61dde00957',
    lendFacilCap: '0x3b8a017eaab8877a5869c489745b626946c3f5e269289ddfb846b4fa3308889a',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.paused_USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.paused_suiUSDT as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: USDCPioInfo,
    pioInfoY: suiUsdtPioInfo,
    positionReified: Position_.r(USDC.p, suiUSDT.p, CetusPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: CetusPool.r(USDC.p, suiUSDT.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: true,
    rewardCoins: [SUI, CETUS],
  }),
  new PositionConfigInfo({
    name: 'Bluefin suiUSDT/USDC 0.01%',
    configId: '0x888fcd428659608b1adb45790f65dfbac4352150f67d6312f0c0a5f1f9b04692',
    poolObjectId: '0x0bd95d012d60190a6713ae51f2d833b24ae70c5fb07fcfb41db40f25549878b1',
    lendFacilCap: '0x7c8a25b51defa6a5802d2ec5ab2e8b5a4b605545c0e4d5285ee2cb6893804eb8',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.paused_suiUSDT as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.paused_USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: suiUsdtPioInfo,
    pioInfoY: USDCPioInfo,
    positionReified: Position_.r(suiUSDT.p, USDC.p, BluefinPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: BluefinPool.r(suiUSDT.p, USDC.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: false,
    rewardCoins: [SUI, BLUE, stSUI],
  }),
  new PositionConfigInfo({
    name: 'Cetus USDC/USDY',
    configId: '0x570b46aa3b355305d36e1921c6a5070c76b51e56859b0bde0b6bc0598a89381d',
    poolObjectId: '0xdcd762ad374686fa890fc4f3b9bbfe2a244e713d7bffbfbd1b9221cb290da2ed',
    lendFacilCap: '0xf4ea7f418929fba73b46f8a842a988470a93588c60e17f07a7a01cca05104ef3',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.paused_USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.USDY as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: USDCPioInfo,
    pioInfoY: USDYPioInfo,
    positionReified: Position_.r(USDC.p, USDY.p, CetusPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: CetusPool.r(USDC.p, USDY.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: true,
    rewardCoins: [SUI],
  }),
  new PositionConfigInfo({
    name: 'Cetus DEEP/SUI',
    configId: '0x92515fe20eb5c0510f42df2ab67f49ca41633571a038edfc180bd83bb9b01011',
    poolObjectId: '0xe01243f37f712ef87e556afb9b1d03d0fae13f96d324ec912daffc339dfdcbd2',
    lendFacilCap: '0x875c6cdf981545fa5fef0cf85ea366dfb3371cee4c07e62492def564e4649fd3',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.DEEP as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.SUI as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: DEEPPioInfo,
    pioInfoY: suiPioInfo,
    positionReified: Position_.r(DEEP.p, SUI.p, CetusPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: CetusPool.r(DEEP.p, SUI.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: false,
    rewardCoins: [SUI, DEEP],
  }),
  new PositionConfigInfo({
    name: 'Bluefin DEEP/SUI',
    configId: '0x3bcfc891da3c64c846cbba27238554fa5b123812b45a8c7f251e27bf7c1fa793',
    poolObjectId: '0x1b06371d74082856a1be71760cf49f6a377d050eb57afd017f203e89b09c89a2',
    lendFacilCap: '0x5a530999b7eacf75bfb592647b91da2da80f2722af80c83582be06cbaed238ef',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.DEEP as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.SUI as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: DEEPPioInfo,
    pioInfoY: suiPioInfo,
    positionReified: Position_.r(DEEP.p, SUI.p, BluefinPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: BluefinPool.r(DEEP.p, SUI.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: false,
    rewardCoins: [BLUE, DEEP],
  }),
  new PositionConfigInfo({
    name: 'Bluefin suiUSDT/USDC 0.01%',
    configId: '0xf18480cd0b57e0e33542129868712660c27c0b8a60212f587fbe7fde1ba982ef',
    poolObjectId: '0x0bd95d012d60190a6713ae51f2d833b24ae70c5fb07fcfb41db40f25549878b1',
    lendFacilCap: '0x31717802305a5ad32d74f287ef4e95844f1945ab5e14e614665a4c2a5dbaff5e',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.suiUSDT as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: suiUsdtPioInfo,
    pioInfoY: USDCPioInfo,
    positionReified: Position_.r(suiUSDT.p, USDC.p, BluefinPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: BluefinPool.r(suiUSDT.p, USDC.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: false,
    rewardCoins: [BLUE, stSUI],
  }),
  new PositionConfigInfo({
    name: 'Bluefin suiUSDT/USDC 0.001%',
    configId: '0xb1eafb450f32c369e63a90f6609fd8c75f34f818594a67f1a1a1ba707811e767',
    poolObjectId: '0x62af128423465822e5a0979ccad2b0b5ee50a58c6a2c8ea3dd7fda1cda3cfbe7',
    lendFacilCap: '0x968fc192b48864825c6b5c3c363544bb55abdef234891135de4ebc5f818a7729',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.suiUSDT as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: suiUsdtPioInfo,
    pioInfoY: USDCPioInfo,
    positionReified: Position_.r(suiUSDT.p, USDC.p, BluefinPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: BluefinPool.r(suiUSDT.p, USDC.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: false,
    rewardCoins: [BLUE, stSUI],
  }),
  new PositionConfigInfo({
    name: 'Bluefin SUI/USDC',
    configId: '0x97d0b302207ebe0581a8c8b072fa302a41b8db2fa86baadd750fd1f2fc9cdf92',
    poolObjectId: '0x3b585786b13af1d8ea067ab37101b6513a05d2f90cfe60e8b1d9e1b46a63c4fa',
    lendFacilCap: '0x65e1f3a32a05c8d5ef8e32555d21f18214b1393d7007d6b502c8cc19157816bc',
    supplyPoolXInfo: SUPPLY_POOL_INFOS.SUI as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    supplyPoolYInfo: SUPPLY_POOL_INFOS.USDC as SupplyPoolInfo<
      PhantomTypeArgument,
      PhantomTypeArgument
    >,
    pioInfoX: suiPioInfo,
    pioInfoY: USDCPioInfo,
    positionReified: Position_.r(SUI.p, USDC.p, BluefinPosition.r) as PositionReified<
      PhantomTypeArgument,
      PhantomTypeArgument,
      TypeArgument
    >,
    poolReified: BluefinPool.r(SUI.p, USDC.p) as StructClassReified<StructClass, unknown>,
    isReversedPair: false,
    rewardCoins: [stSUI, BLUE],
  }),
]

/**
 * Finds position's `ConfigInfo` given its type.
 *
 * @param type - The position type
 * @returns `PositionConfigInfo`
 */
export function findConfigInfoForPositionBcs(bcs: Uint8Array, type: string) {
  if (!isPosition(type)) {
    throw new Error(`${type} is not a Position type`)
  }

  const info = POSITION_CONFIG_INFOS.find(info => {
    return compressSuiType(type) === compressSuiType(info.positionReified.fullTypeName)
  })
  if (!info) {
    return undefined
  }
  const position = info.positionReified.fromBcs(bcs)
  const configId = normalizeSuiObjectId(position.configId)

  return POSITION_CONFIG_INFOS.find(info => normalizeSuiObjectId(info.configId) === configId)
}

export const ALL_POSITION_CONFIG_INFOS = POSITION_CONFIG_INFOS.reduce((acc, info) => {
  acc.set(normalizeSuiObjectId(info.configId), info)
  return acc
}, new Map<string, PositionConfigInfo<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>>())
