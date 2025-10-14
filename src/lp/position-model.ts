import Decimal from 'decimal.js'
import { divRoundUp, max, min } from '../math'
import { tickIndexToSqrtPriceX64 } from './tick-math'

export interface PositionModelConstructorArg {
  sqrtPaX64: bigint
  sqrtPbX64: bigint
  l: bigint
  cx: bigint
  cy: bigint
  dx: bigint
  dy: bigint
}

export interface ForNewPositionArgs {
  tickA: number
  tickB: number
  sqrtP0x64: bigint
  ux: bigint
  uy: bigint
  l: bigint
}

export interface FindMaxLArgs {
  tickA: number
  tickB: number
  poolSqrtP0x64: bigint
  oracleP0x128: bigint
  ux: bigint
  uy: bigint
  minLiqStartPriceDeltaBps: number
  minInitMarginBps: number
  liqMarginBps: number
}

export class PositionModel {
  sqrtPaX64: bigint
  sqrtPbX64: bigint
  l: bigint
  cx: bigint
  cy: bigint
  dx: bigint
  dy: bigint

  constructor(args: PositionModelConstructorArg) {
    this.sqrtPaX64 = args.sqrtPaX64
    this.sqrtPbX64 = args.sqrtPbX64
    this.l = args.l
    this.cx = args.cx
    this.cy = args.cy
    this.dx = args.dx
    this.dy = args.dy
  }

  static forNewPosition(args: ForNewPositionArgs): PositionModel {
    const sqrtPaX64 = tickIndexToSqrtPriceX64(args.tickA)
    const sqrtPbX64 = tickIndexToSqrtPriceX64(args.tickB)
    const sqrtP0x64 = args.sqrtP0x64
    const ux = args.ux
    const uy = args.uy
    const l = args.l

    const x = divRoundUp(
      PositionModel.xByLiquidityX64(sqrtP0x64, l, sqrtPaX64, sqrtPbX64),
      1n << 64n
    )
    const y = divRoundUp(
      PositionModel.yByLiquidityX64(sqrtP0x64, l, sqrtPaX64, sqrtPbX64),
      1n << 64n
    )

    const cx = ux > x ? ux - x : 0n
    const cy = uy > y ? uy - y : 0n

    const dx = x > ux ? x - ux : 0n
    const dy = y > uy ? y - uy : 0n

    return new PositionModel({
      sqrtPaX64,
      sqrtPbX64,
      l,
      cx,
      cy,
      dx,
      dy,
    })
  }

  static xByLiquidityX64(
    sqrtPx64: bigint,
    L: bigint,
    sqrtPaX64: bigint,
    sqrtPbX64: bigint
  ): bigint {
    if (sqrtPx64 >= sqrtPbX64) {
      return 0n
    }
    if (sqrtPx64 < sqrtPaX64) {
      return PositionModel.xByLiquidityX64(sqrtPaX64, L, sqrtPaX64, sqrtPbX64)
    }

    const num = L * (sqrtPbX64 - sqrtPx64)
    const denom = sqrtPx64 * sqrtPbX64

    const u256MaxValue = (1n << 256n) - 1n
    const div256Denom = (u256MaxValue - denom) / denom + 1n

    return (num * div256Denom) >> 128n
  }

  static yByLiquidityX64(
    sqrtPx64: bigint,
    l: bigint,
    sqrtPaX64: bigint,
    sqrtPbX64: bigint
  ): bigint {
    if (sqrtPx64 <= sqrtPaX64) {
      return 0n
    }
    if (sqrtPx64 > sqrtPbX64) {
      return PositionModel.yByLiquidityX64(sqrtPbX64, l, sqrtPaX64, sqrtPbX64)
    }

    const yX64 = l * (sqrtPx64 - sqrtPaX64)
    return min(yX64, (1n << 128n) - 1n) // This is U128_MAX
  }

  xByLiquidityX64(sqrtPx64: bigint, l: bigint): bigint {
    if (l > this.l) {
      throw new Error('L is greater than the position liquidity')
    }
    return PositionModel.xByLiquidityX64(sqrtPx64, l, this.sqrtPaX64, this.sqrtPbX64)
  }

  yByLiquidityX64(sqrtPx64: bigint, l: bigint): bigint {
    if (l > this.l) {
      throw new Error('L is greater than the position liquidity')
    }
    return PositionModel.yByLiquidityX64(sqrtPx64, l, this.sqrtPaX64, this.sqrtPbX64)
  }

  xX64(sqrtPx64: bigint): bigint {
    return this.xByLiquidityX64(sqrtPx64, this.l)
  }

  yX64(sqrtPx64: bigint): bigint {
    return this.yByLiquidityX64(sqrtPx64, this.l)
  }

  marginX64(pX128: bigint): bigint {
    if (this.dx === 0n && this.dy === 0n) {
      return (1n << 128n) - 1n
    }

    const dxX64 = this.dx << 64n
    const dyX128 = this.dy << 128n
    const cxX64 = this.cx << 64n
    const cyX128 = this.cy << 128n

    const sqrtPX64 = BigInt(new Decimal(pX128.toString()).sqrt().toFixed(0, Decimal.ROUND_DOWN))
    const pX64 = pX128 >> 64n
    const xX64 = this.xByLiquidityX64(sqrtPX64, this.l) // Use instance method
    const yX128 = this.yByLiquidityX64(sqrtPX64, this.l) << 64n // Use instance method

    const assetValueX128 = (xX64 + cxX64) * pX64 + yX128 + cyX128
    const debtValueX64 = (dxX64 * pX64 + dyX128) >> 64n
    const marginX64 = assetValueX128 / debtValueX64

    return min(marginX64, (1n << 128n) - 1n)
  }
}

export function findMaxL(args: FindMaxLArgs): bigint {
  const p0X128 = args.poolSqrtP0x64 ** 2n
  const p0MinX128 = min(args.oracleP0x128, p0X128)
  const p0MaxX128 = max(args.oracleP0x128, p0X128)

  const deltaBps = BigInt(args.minLiqStartPriceDeltaBps)
  const liqMarginX64 = (BigInt(args.liqMarginBps) << 64n) / 10000n
  const plX128 = p0MinX128 - (p0MinX128 * deltaBps) / 10000n
  const phX128 = p0MaxX128 + (p0MaxX128 * deltaBps) / 10000n

  const minInitMarginX64 = (BigInt(args.minInitMarginBps) << 64n) / 10000n

  const testSolution = (L: bigint, args: FindMaxLArgs) => {
    const model = PositionModel.forNewPosition({
      tickA: args.tickA,
      tickB: args.tickB,
      sqrtP0x64: args.poolSqrtP0x64,
      ux: args.ux,
      uy: args.uy,
      l: L,
    })

    if (model.marginX64(plX128) < liqMarginX64) {
      return false
    }
    if (model.marginX64(phX128) < liqMarginX64) {
      return false
    }
    if (model.marginX64(p0MinX128) < minInitMarginX64) {
      return false
    }
    if (model.marginX64(p0MaxX128) < minInitMarginX64) {
      return false
    }

    return true
  }

  let low = 0n
  let high = 1n
  while (testSolution(high, args)) {
    low = high
    high = high * 2n
  }

  while (high - low > 1n) {
    const mid = (low + high) / 2n
    if (testSolution(mid, args)) {
      low = mid
    } else {
      high = mid
    }
  }

  return low
}
