import { phantom, PhantomTypeArgument } from '../gen/_framework/reified'
import {
  isSupplyPool,
  LendFacilInfo,
  SupplyPool as SupplyPool_,
  SupplyPoolReified,
} from '../gen/kai-leverage/supply-pool/structs'
import { TransactionArgument, Transaction, TransactionObjectInput } from '@mysten/sui/transactions'
import {
  addLendFacil,
  removeLendFacil,
  setLendFacilInterestModel,
  setLendFacilMaxLiabilityOutstanding,
  setLendFacilMaxUtilizationBps,
  supply,
  withdraw,
} from '../gen/kai-leverage/supply-pool/functions'
import { normalizeSuiAddress, SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import { SuiClient, SuiObjectData } from '@mysten/sui/client'
import {
  CoinInfo,
  DEEP,
  klDEEP,
  klSui,
  klSuiUSDT,
  klUsdc,
  klUSDY,
  klwhUSDCe,
  klwhUSDTe,
  SUI,
  suiUSDT,
  USDC,
  USDY,
  whUSDCe,
  whUSDTe,
} from '../coin-info'
import Decimal from 'decimal.js'
import { Amount } from '../amount'
import { InterestModel, Section } from './interest-model'
import { compressSuiAddress, compressSuiType, parseTypeName } from '../gen/_framework/util'
import { max, muldiv } from '../math'

interface SupplyPoolInfoConstructor<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> {
  id: string
  T: CoinInfo<T>
  ST: CoinInfo<ST>
}

interface SupplyPoolConstructorArgs<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> {
  info: SupplyPoolInfo<T, ST>
  reified: SupplyPoolReified<T, ST>
  data: SupplyPool_<T, ST>
}

export class SupplyPoolInfo<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> {
  readonly id: string
  readonly r: SupplyPoolReified<T, ST>
  readonly T: CoinInfo<T>
  readonly ST: CoinInfo<ST>

  constructor(args: SupplyPoolInfoConstructor<T, ST>) {
    this.id = args.id
    this.r = SupplyPool_.r(args.T.p, args.ST.p)
    this.T = args.T
    this.ST = args.ST
  }

  addLendFacil(
    tx: Transaction,
    facilId: string | TransactionArgument,
    interestModel: TransactionObjectInput
  ) {
    return addLendFacil(tx, this.r.typeArgs, {
      pool: this.id,
      facilId,
      interestModel,
    })
  }

  removeLendFacil(tx: Transaction, facilId: string | TransactionArgument) {
    return removeLendFacil(tx, this.r.typeArgs, {
      pool: this.id,
      facilId,
    })
  }

  setLendFacilInterestModel(
    tx: Transaction,
    facilId: string | TransactionArgument,
    interestModel: TransactionObjectInput
  ) {
    return setLendFacilInterestModel(tx, this.r.typeArgs, {
      pool: this.id,
      facilId,
      interestModel,
    })
  }

  setLendFacilMaxLiabilityOutstanding(
    tx: Transaction,
    facilId: string | TransactionArgument,
    maxLiabilityOutstanding: bigint
  ) {
    return setLendFacilMaxLiabilityOutstanding(tx, this.r.typeArgs, {
      pool: this.id,
      facilId,
      maxLiabilityOutstanding,
    })
  }

  setLendFacilMaxUtilizationBps(
    tx: Transaction,
    facilId: string | TransactionArgument,
    maxUtilizationBps: bigint
  ) {
    return setLendFacilMaxUtilizationBps(tx, this.r.typeArgs, {
      pool: this.id,
      facilId,
      maxUtilizationBps,
    })
  }

  supply(tx: Transaction, balance: TransactionObjectInput) {
    return supply(tx, this.r.typeArgs, {
      pool: this.id,
      balance,
      clock: SUI_CLOCK_OBJECT_ID,
    })
  }

  withdraw(tx: Transaction, balance: TransactionObjectInput) {
    return withdraw(tx, this.r.typeArgs, {
      pool: this.id,
      balance,
      clock: SUI_CLOCK_OBJECT_ID,
    })
  }

  async fetch(client: SuiClient) {
    const data = await this.r.fetch(client, this.id)
    return new SupplyPool({
      info: this,
      reified: this.r,
      data,
    })
  }

  fromSuiObjectData(data: SuiObjectData) {
    const data_ = this.r.fromSuiObjectData(data)
    return new SupplyPool({
      info: this,
      reified: this.r,
      data: data_,
    })
  }

  fromBcs(bcs: Uint8Array) {
    return SupplyPool.fromBcs(bcs, this.r.fullTypeName)
  }
}

export class SupplyPool<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> {
  info: SupplyPoolInfo<T, ST>
  reified: SupplyPoolReified<T, ST>
  data: SupplyPool_<T, ST>
  T: CoinInfo<T>
  ST: CoinInfo<ST>
  id: string

  constructor(args: SupplyPoolConstructorArgs<T, ST>) {
    if (normalizeSuiAddress(args.data.id) !== normalizeSuiAddress(args.info.id)) {
      throw new Error('Supply pool id mismatch')
    }
    if (compressSuiType(args.data.$fullTypeName) !== compressSuiType(args.reified.fullTypeName)) {
      throw new Error('Supply pool data mismatch')
    }

    this.info = args.info
    this.reified = args.info.r
    this.data = args.data
    this.T = args.info.T
    this.ST = args.info.ST
    this.id = args.data.id
  }

  static fromBcs(bcs: Uint8Array, type: string) {
    if (!isSupplyPool(type)) {
      throw new Error(`Not a SupplyPool: ${type}`)
    }
    const { typeArgs } = parseTypeName(type)

    const data = SupplyPool_.r(phantom(typeArgs[0]), phantom(typeArgs[1])).fromBcs(bcs)

    return SupplyPool.fromData(data)
  }

  static fromData<T extends PhantomTypeArgument, ST extends PhantomTypeArgument>(
    data: SupplyPool_<T, ST>
  ) {
    const info = Object.values(SUPPLY_POOL_INFOS).find(
      info => info.id === data.id
    ) as SupplyPoolInfo<PhantomTypeArgument, PhantomTypeArgument>
    if (!info) {
      return undefined
    }

    return new SupplyPool({
      info,
      reified: info.r,
      data,
    })
  }

  getFacilInfo(lendFacilId: string) {
    const facilInfo = this.data.debtInfo.contents.find(
      info => compressSuiAddress(info.key) === compressSuiAddress(lendFacilId)
    )
    if (!facilInfo) {
      throw new Error(`lend facil ${lendFacilId} does not exist in this supply pool`)
    }
    return facilInfo.value
  }

  getInterestModelForFacilInfo(facilInfo: LendFacilInfo<ST>) {
    const start = facilInfo.interestModel.start
    const startVal = facilInfo.interestModel.startVal
    const sections: Array<Section> = []
    for (const section of facilInfo.interestModel.sections) {
      sections.push({
        end: section.end,
        endVal: section.endVal,
      })
    }

    return new InterestModel({ start, startVal, sections })
  }

  getInterestModel(lendFacilId: string) {
    const facilInfo = this.getFacilInfo(lendFacilId)
    return this.getInterestModelForFacilInfo(facilInfo)
  }

  calcUtilization(timestampMs?: number) {
    const totalLiabilitiesX64 = new Decimal(
      this.calcUpdatedTotalLiabilitiesX64(timestampMs).toString()
    )
    const equityValueX64 = new Decimal(
      this.data.supplyEquity.registry.underlyingValueX64.toString()
    )
    if (equityValueX64.eq(0)) {
      return new Decimal(0)
    }
    return totalLiabilitiesX64.div(equityValueX64)
  }

  calcInterestRateBpsForFacilInfo(facilInfo: LendFacilInfo<ST>, timestampMs?: number) {
    const interestModel = this.getInterestModelForFacilInfo(facilInfo)
    const utilizationBps = BigInt(
      this.calcUtilization(timestampMs).mul(10000).toFixed(0).toString()
    )

    return interestModel.valueAt(utilizationBps)
  }

  calcInterestRateBps(lendFacilId: string, timestampMs?: number) {
    const facilInfo = this.getFacilInfo(lendFacilId)
    return this.calcInterestRateBpsForFacilInfo(facilInfo, timestampMs)
  }

  /// @returns liability value x64 after interest accrued since last update
  calcUpdatedLiabilityX64(facilInfo: LendFacilInfo<ST>, timestampMs: number | undefined) {
    if (timestampMs === undefined) {
      return facilInfo.debtRegistry.liabilityValueX64
    }

    const debtRegistry = facilInfo.debtRegistry

    const timestampSec = timestampMs
      ? BigInt((timestampMs / 1000).toFixed(0))
      : this.data.lastUpdateTsSec
    const dt = max(timestampSec, this.data.lastUpdateTsSec) - this.data.lastUpdateTsSec
    const aprBps = this.calcInterestRateBpsForFacilInfo(facilInfo)
    const accruedInterestX64 = muldiv(
      debtRegistry.liabilityValueX64,
      aprBps * dt,
      100_00n * 365n * 24n * 60n * 60n
    )

    return debtRegistry.liabilityValueX64 + accruedInterestX64
  }

  calcUpdatedTotalLiabilitiesX64(timestampMs: number | undefined) {
    if (timestampMs === undefined) {
      return this.data.totalLiabilitiesX64
    }

    let totalLiabilitiesX64 = 0n
    for (const facilInfo of this.data.debtInfo.contents) {
      totalLiabilitiesX64 += this.calcUpdatedLiabilityX64(facilInfo.value, timestampMs)
    }
    return totalLiabilitiesX64
  }

  calcDebtByShares(lendFacilId: string, shares: bigint, timestampMs?: number) {
    const facilInfo = this.getFacilInfo(lendFacilId)
    const debtRegistry = facilInfo.debtRegistry

    if (debtRegistry.supplyX64 === 0n) {
      return Amount.fromInt(0n, this.T.decimals)
    }

    // adjust for interest accrued since last update
    const liabilityValueX64 = this.calcUpdatedLiabilityX64(facilInfo, timestampMs)

    const amt = new Decimal(liabilityValueX64.toString())
      .mul(shares.toString())
      .div(debtRegistry.supplyX64.toString())
      .div((1n << 64n).toString())

    return Amount.fromInt(BigInt(amt.toFixed(0, Decimal.ROUND_DOWN)), this.T.decimals)
  }

  calcUtilizationAfterBorrow(borrowAmount: bigint, timestampMs?: number) {
    const borrowAmountX64 = borrowAmount << 64n
    const totalLiabilitiesX64 = new Decimal(
      (this.calcUpdatedTotalLiabilitiesX64(timestampMs) + borrowAmountX64).toString()
    )
    const equityValueX64 = new Decimal(
      this.data.supplyEquity.registry.underlyingValueX64.toString()
    )
    if (equityValueX64.eq(0)) {
      return new Decimal(0)
    }
    return totalLiabilitiesX64.div(equityValueX64)
  }

  calcInterestRateAfterBorrowBps(lendFacilId: string, borrowAmount: bigint, timestampMs?: number) {
    const interestModel = this.getInterestModel(lendFacilId)
    const utilizationBps = BigInt(
      this.calcUtilizationAfterBorrow(borrowAmount, timestampMs).mul(10000).toFixed(0).toString()
    )
    if (utilizationBps >= 10000n) {
      return undefined
    }

    return interestModel.valueAt(utilizationBps)
  }
}

export const SUPPLY_POOL_INFOS = {
  wUSDC: new SupplyPoolInfo({
    id: '0x86c5ca41be63b5b9a8da0b4ca0f8268d6e87f8cdda8c9e88b25c43efcd5f3074',
    T: whUSDCe,
    ST: klwhUSDCe,
  }),
  wUSDT: new SupplyPoolInfo({
    id: '0x372b6948ae06dacce75fdc3546865b2e777d4050114d93db0717b40cf677634c',
    T: whUSDTe,
    ST: klwhUSDTe,
  }),
  SUI: new SupplyPoolInfo({
    id: '0x1b4c4e0869ab3771a0901a538c0dbf536ca72e1525fd66e6c5a197623cd55cc8',
    T: SUI,
    ST: klSui,
  }),
  USDC: new SupplyPoolInfo({
    id: '0x3bcadd850b776542b49be5d68d2e62b63f3c7543695c55a973d3364501b5c26c',
    T: USDC,
    ST: klUsdc,
  }),
  suiUSDT: new SupplyPoolInfo({
    id: '0xd03330033b6eda49e06d024240511736ffbad31278112cdd5c43c97be6d5535b',
    T: suiUSDT,
    ST: klSuiUSDT,
  }),
  USDY: new SupplyPoolInfo({
    id: '0x23e210027526cf299898f6a470b435cb2afb5c2cb63990e0cad5568ad38beb79',
    T: USDY,
    ST: klUSDY,
  }),
  DEEP: new SupplyPoolInfo({
    id: '0x2d001b7f8c8a08f99a4a13fcbaff7feaeac8447741791a2bcd664611cf819ee2',
    T: DEEP,
    ST: klDEEP,
  }),
}
