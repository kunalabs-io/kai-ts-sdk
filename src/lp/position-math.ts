import Decimal from 'decimal.js'
import { tickIndexToSqrtPriceX64 } from './tick-math'

export interface FindMaxLArgs {
  tickA: number
  tickB: number
  P0: Decimal
  UX: Decimal
  UY: Decimal
  minLiqStartPriceDelta: Decimal
  minInitMargin: Decimal
  liqMargin: Decimal
}

function p1(
  pa: Decimal,
  pb: Decimal,
  M: Decimal,
  DX: Decimal,
  DY: Decimal,
  L: Decimal,
  CX: Decimal,
  CY: Decimal
): Decimal {
  return CX.mul(DY)
    .mul(M)
    .mul(pb)
    .add(CX.mul(L).mul(pa.sqrt()).mul(pb))
    .add(CY.mul(DX).mul(M).mul(pb))
    .add(CY.mul(L).mul(pb.sqrt()))
    .sub(DX.mul(DY).mul(M.pow(2)).mul(pb))
    .sub(DX.mul(L).mul(M).mul(pa.sqrt()).mul(pb))
    .sub(DY.mul(L).mul(M).mul(pb.sqrt()))
    .sub(L.pow(2).mul(pa.sqrt()).mul(pb.sqrt()))
    .add(L.pow(2).mul(pb).mul(2))
    .sub(
      L.mul(2).mul(
        new Decimal(-1)
          .mul(CX)
          .mul(CY)
          .mul(pb.pow(2))
          .add(CX.mul(DY).mul(M).mul(pb.pow(2)))
          .add(CX.mul(L).mul(pa.sqrt()).mul(pb.pow(2)))
          .add(CY.mul(DX).mul(M).mul(pb.pow(2)))
          .add(CY.mul(L).mul(pb.pow(1.5)))
          .sub(DX.mul(DY).mul(M.pow(2)).mul(pb.pow(2)))
          .sub(DX.mul(L).mul(M).mul(pa.sqrt()).mul(pb.pow(2)))
          .sub(DY.mul(L).mul(M).mul(pb.pow(1.5)))
          .sub(L.pow(2).mul(pa.sqrt()).mul(pb.pow(1.5)))
          .add(L.pow(2).mul(pb.pow(2)))
          .sqrt()
      )
    )
    .div(
      CX.pow(2)
        .mul(pb)
        .sub(CX.mul(DX).mul(M).mul(2).mul(pb))
        .sub(CX.mul(L).mul(2).mul(pb.sqrt()))
        .add(DX.pow(2).mul(M.pow(2)).mul(pb))
        .add(DX.mul(L).mul(2).mul(M).mul(pb.sqrt()))
        .add(L.pow(2))
    )
}

function p2(
  pa: Decimal,
  pb: Decimal,
  M: Decimal,
  DX: Decimal,
  DY: Decimal,
  L: Decimal,
  CX: Decimal,
  CY: Decimal
): Decimal {
  return CX.mul(DY)
    .mul(M)
    .mul(pb)
    .add(CX.mul(L).mul(pa.sqrt()).mul(pb))
    .add(CY.mul(DX).mul(M).mul(pb))
    .add(CY.mul(L).mul(pb.sqrt()))
    .sub(DX.mul(DY).mul(M.pow(2)).mul(pb))
    .sub(DX.mul(L).mul(M).mul(pa.sqrt()).mul(pb))
    .sub(DY.mul(L).mul(M).mul(pb.sqrt()))
    .sub(L.pow(2).mul(pa.sqrt()).mul(pb.sqrt()))
    .add(L.pow(2).mul(pb).mul(2))
    .add(
      L.mul(2).mul(
        new Decimal(-1)
          .mul(CX)
          .mul(CY)
          .mul(pb.pow(2))
          .add(CX.mul(DY).mul(M).mul(pb.pow(2)))
          .add(CX.mul(L).mul(pa.sqrt()).mul(pb.pow(2)))
          .add(CY.mul(DX).mul(M).mul(pb.pow(2)))
          .add(CY.mul(L).mul(pb.pow(1.5)))
          .sub(DX.mul(DY).mul(M.pow(2)).mul(pb.pow(2)))
          .sub(DX.mul(L).mul(M).mul(pa.sqrt()).mul(pb.pow(2)))
          .sub(DY.mul(L).mul(M).mul(pb.pow(1.5)))
          .sub(L.pow(2).mul(pa.sqrt()).mul(pb.pow(1.5)))
          .add(L.pow(2).mul(pb.pow(2)))
          .sqrt()
      )
    )
    .div(
      CX.pow(2)
        .mul(pb)
        .sub(CX.mul(DX).mul(M).mul(2).mul(pb))
        .sub(CX.mul(L).mul(2).mul(pb.sqrt()))
        .add(DX.pow(2).mul(M.pow(2)).mul(pb))
        .add(DX.mul(L).mul(2).mul(M).mul(pb.sqrt()))
        .add(L.pow(2))
    )
}

export interface PositionMathConstructorArg {
  pa: Decimal
  pb: Decimal
  L: Decimal
  CX: Decimal
  CY: Decimal
  DX: Decimal
  DY: Decimal
}

export interface ForNewPositionArgs {
  tickA: number
  tickB: number
  P0: Decimal
  UX: Decimal
  UY: Decimal
  L: Decimal
}

export class PositionMath {
  pa: Decimal
  pb: Decimal
  L: Decimal
  CX: Decimal
  CY: Decimal
  DX: Decimal
  DY: Decimal

  constructor(args: PositionMathConstructorArg) {
    if (args.pa.gte(args.pb)) {
      throw new Error('pa must be less than pb')
    }

    this.pa = args.pa
    this.pb = args.pb
    this.L = args.L
    this.CX = args.CX
    this.CY = args.CY
    this.DX = args.DX
    this.DY = args.DY
  }

  static forNewPosition(args: ForNewPositionArgs) {
    const pa = new Decimal(tickIndexToSqrtPriceX64(args.tickA).toString())
      .pow(2)
      .div((1n << 128n).toString())
    const pb = new Decimal(tickIndexToSqrtPriceX64(args.tickB).toString())
      .pow(2)
      .div((1n << 128n).toString())

    const X = PositionMath.X(pa, pb, args.P0, args.L)
    const Y = PositionMath.Y(pa, pb, args.P0, args.L)

    const CX = args.UX.gt(X) ? args.UX.sub(X) : new Decimal(0)
    const CY = args.UY.gt(Y) ? args.UY.sub(Y) : new Decimal(0)

    const DX = X.gt(args.UX) ? X.sub(args.UX) : new Decimal(0)
    const DY = Y.gt(args.UY) ? Y.sub(args.UY) : new Decimal(0)

    return new PositionMath({
      pa,
      pb,
      L: args.L,
      CX,
      CY,
      DX,
      DY,
    })
  }

  static X(pa: Decimal, pb: Decimal, p: Decimal, L: Decimal): Decimal {
    const sqrtP = Decimal.max(Decimal.min(p, pb), pa).sqrt()
    const sqrtPb = pb.sqrt()

    return L.mul(sqrtPb.sub(sqrtP)).div(sqrtP.mul(sqrtPb))
  }

  static Y(pa: Decimal, pb: Decimal, p: Decimal, L: Decimal): Decimal {
    const sqrtP = Decimal.max(Decimal.min(p, pb), pa).sqrt()
    const sqrtPa = pa.sqrt()

    return L.mul(sqrtP.sub(sqrtPa))
  }

  static calcLiqFromAmountX(pa: Decimal, pb: Decimal, p: Decimal, amountX: Decimal) {
    const sqrtP = Decimal.max(Decimal.min(p, pb), pa).sqrt()
    const sqrtPb = pb.sqrt()

    return amountX.mul(sqrtP.mul(sqrtPb)).div(sqrtPb.sub(sqrtP))
  }

  static calcLiqFromAmountY(pa: Decimal, pb: Decimal, p: Decimal, amountY: Decimal) {
    const sqrtP = Decimal.max(Decimal.min(p, pb), pa).sqrt()
    const sqrtPa = pa.sqrt()

    return amountY.div(sqrtP.sub(sqrtPa))
  }

  X(p: Decimal) {
    return PositionMath.X(this.pa, this.pb, p, this.L)
  }

  Y(p: Decimal): Decimal {
    return PositionMath.Y(this.pa, this.pb, p, this.L)
  }

  A(p: Decimal): Decimal {
    const Y = this.Y(p)
    const X = this.X(p)

    return Y.add(this.CY).add(X.add(this.CX).mul(p))
  }

  D(p: Decimal): Decimal {
    return this.DY.add(this.DX.mul(p))
  }

  M(p: Decimal): Decimal {
    const D = this.D(p)
    if (D.eq(0)) {
      return new Decimal('Infinity')
    }

    return this.A(p).div(D)
  }

  leverage(p: Decimal) {
    const A = this.A(p)
    const D = this.D(p)
    const E = A.minus(D)

    return A.div(E)
  }

  plh(M: Decimal): [Decimal, Decimal] {
    if (this.DX.eq(0) && this.DY.eq(0)) {
      return [new Decimal(0), new Decimal('Infinity')]
    }

    const DX = this.DX
    const DY = this.DY
    const CX = this.CX
    const CY = this.CY

    let pl: Decimal
    let ph: Decimal

    const Ma = this.M(this.pa)
    if (Ma.gt(M)) {
      const Xa = this.X(this.pa).add(CX)
      const Ya = CY
      if (Xa.sub(M.mul(DX)).eq(0)) {
        pl = new Decimal(0)
      } else {
        pl = M.mul(DY)
          .sub(Ya)
          .div(Xa.sub(M.mul(DX)))
      }
      if (pl.gt(this.pa) || pl.lt(0)) {
        pl = new Decimal(0)
      }
    } else {
      pl = p1(this.pa, this.pb, M, DX, DY, this.L, CX, CY)
    }

    const Mb = this.M(this.pb)
    if (Mb.gt(M)) {
      const Xb = CX
      const Yb = this.Y(this.pb).add(CY)
      if (Xb.sub(M.mul(DX)).eq(0)) {
        ph = new Decimal('Infinity')
      } else {
        ph = M.mul(DY)
          .sub(Yb)
          .div(Xb.sub(M.mul(DX)))
      }
      if (ph.lt(this.pb)) {
        ph = new Decimal('Infinity')
      }
    } else {
      ph = p2(this.pa, this.pb, M, DX, DY, this.L, CX, CY)
    }

    return [pl, ph]
  }

  static findMaxL(args: FindMaxLArgs) {
    const testSolution = (L: Decimal, args: FindMaxLArgs) => {
      const pm = PositionMath.forNewPosition({
        tickA: args.tickA,
        tickB: args.tickB,
        P0: args.P0,
        UX: args.UX,
        UY: args.UY,
        L,
      })

      const [pl, ph] = pm.plh(args.liqMargin)

      const pl_delta = new Decimal(1).sub(pl.div(args.P0))
      const ph_delta = ph.div(args.P0).sub(1)
      if (pl_delta.lt(args.minLiqStartPriceDelta) || ph_delta.lt(args.minLiqStartPriceDelta)) {
        return false
      }

      const M0 = pm.M(args.P0)
      if (M0.lt(args.minInitMargin)) {
        return false
      }

      return true
    }

    let low = new Decimal(0)
    let high = new Decimal(1)
    while (testSolution(high, args)) {
      low = high
      high = high.mul(2)
    }

    while (high.sub(low).gt(1)) {
      const mid = low.add(high).div(2)
      if (testSolution(mid, args)) {
        low = mid
      } else {
        high = mid
      }
    }

    return low
  }
}
