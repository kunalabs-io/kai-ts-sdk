import Decimal from 'decimal.js'

export const MAX_TICK_INDEX = 443636
export const MIN_TICK_INDEX = -443636

export const MAX_SQRT_PRICE = 79226673515401279992447579055n
export const MIN_SQRT_PRICE = 4295048016n

const BIT_PRECISION = 14
const LOG_B_2_X32 = 59543866431248n
const LOG_B_P_ERR_MARGIN_LOWER_X64 = 184467440737095516n
const LOG_B_P_ERR_MARGIN_UPPER_X64 = 15793534762490258745n
// const TICK_BOUND = 443636

function asIntN(int: bigint, bits = 32) {
  return BigInt.asIntN(bits, BigInt(int))
}

function toX64(num: Decimal): bigint {
  return BigInt(num.mul(Decimal.pow(2, 64)).floor().toFixed())
}

function fromX64(num: bigint): Decimal {
  return new Decimal(num.toString()).mul(Decimal.pow(2, -64))
}

function signedShiftLeft(n0: bigint, shiftBy: number, bitWidth: number) {
  const twosN0 = (n0 << BigInt(shiftBy)) & ((1n << BigInt(bitWidth + 1)) - 1n)
  return asIntN(twosN0, bitWidth)
}

function signedShiftRight(n0: bigint, shiftBy: number, bitWidth: number) {
  const twosN0 = (n0 >> BigInt(shiftBy)) & ((1n << BigInt(bitWidth - shiftBy + 1)) - 1n)
  return asIntN(twosN0, bitWidth - shiftBy)
}

function tickIndexToSqrtPricePositive(tick: number) {
  let ratio: bigint

  if ((tick & 1) !== 0) {
    ratio = 79232123823359799118286999567n
  } else {
    ratio = 79228162514264337593543950336n
  }

  if ((tick & 2) !== 0) {
    ratio = signedShiftRight(ratio * 79236085330515764027303304731n, 96, 256)
  }
  if ((tick & 4) !== 0) {
    ratio = signedShiftRight(ratio * 79244008939048815603706035061n, 96, 256)
  }
  if ((tick & 8) !== 0) {
    ratio = signedShiftRight(ratio * 79259858533276714757314932305n, 96, 256)
  }
  if ((tick & 16) !== 0) {
    ratio = signedShiftRight(ratio * 79291567232598584799939703904n, 96, 256)
  }
  if ((tick & 32) !== 0) {
    ratio = signedShiftRight(ratio * 79355022692464371645785046466n, 96, 256)
  }
  if ((tick & 64) !== 0) {
    ratio = signedShiftRight(ratio * 79482085999252804386437311141n, 96, 256)
  }
  if ((tick & 128) !== 0) {
    ratio = signedShiftRight(ratio * 79736823300114093921829183326n, 96, 256)
  }
  if ((tick & 256) !== 0) {
    ratio = signedShiftRight(ratio * 80248749790819932309965073892n, 96, 256)
  }
  if ((tick & 512) !== 0) {
    ratio = signedShiftRight(ratio * 81282483887344747381513967011n, 96, 256)
  }
  if ((tick & 1024) !== 0) {
    ratio = signedShiftRight(ratio * 83390072131320151908154831281n, 96, 256)
  }
  if ((tick & 2048) !== 0) {
    ratio = signedShiftRight(ratio * 87770609709833776024991924138n, 96, 256)
  }
  if ((tick & 4096) !== 0) {
    ratio = signedShiftRight(ratio * 97234110755111693312479820773n, 96, 256)
  }
  if ((tick & 8192) !== 0) {
    ratio = signedShiftRight(ratio * 119332217159966728226237229890n, 96, 256)
  }
  if ((tick & 16384) !== 0) {
    ratio = signedShiftRight(ratio * 179736315981702064433883588727n, 96, 256)
  }
  if ((tick & 32768) !== 0) {
    ratio = signedShiftRight(ratio * 407748233172238350107850275304n, 96, 256)
  }
  if ((tick & 65536) !== 0) {
    ratio = signedShiftRight(ratio * 2098478828474011932436660412517n, 96, 256)
  }
  if ((tick & 131072) !== 0) {
    ratio = signedShiftRight(ratio * 55581415166113811149459800483533n, 96, 256)
  }
  if ((tick & 262144) !== 0) {
    ratio = signedShiftRight(ratio * 38992368544603139932233054999993551n, 96, 256)
  }

  return signedShiftRight(ratio, 32, 256)
}

function tickIndexToSqrtPriceNegative(tickIndex: number) {
  const tick = Math.abs(tickIndex)
  let ratio: bigint

  if ((tick & 1) !== 0) {
    ratio = 18445821805675392311n
  } else {
    ratio = 18446744073709551616n
  }

  if ((tick & 2) !== 0) {
    ratio = signedShiftRight(ratio * 18444899583751176498n, 64, 256)
  }
  if ((tick & 4) !== 0) {
    ratio = signedShiftRight(ratio * 18443055278223354162n, 64, 256)
  }
  if ((tick & 8) !== 0) {
    ratio = signedShiftRight(ratio * 18439367220385604838n, 64, 256)
  }
  if ((tick & 16) !== 0) {
    ratio = signedShiftRight(ratio * 18431993317065449817n, 64, 256)
  }
  if ((tick & 32) !== 0) {
    ratio = signedShiftRight(ratio * 18417254355718160513n, 64, 256)
  }
  if ((tick & 64) !== 0) {
    ratio = signedShiftRight(ratio * 18387811781193591352n, 64, 256)
  }
  if ((tick & 128) !== 0) {
    ratio = signedShiftRight(ratio * 18329067761203520168n, 64, 256)
  }
  if ((tick & 256) !== 0) {
    ratio = signedShiftRight(ratio * 18212142134806087854n, 64, 256)
  }
  if ((tick & 512) !== 0) {
    ratio = signedShiftRight(ratio * 17980523815641551639n, 64, 256)
  }
  if ((tick & 1024) !== 0) {
    ratio = signedShiftRight(ratio * 17526086738831147013n, 64, 256)
  }
  if ((tick & 2048) !== 0) {
    ratio = signedShiftRight(ratio * 16651378430235024244n, 64, 256)
  }
  if ((tick & 4096) !== 0) {
    ratio = signedShiftRight(ratio * 15030750278693429944n, 64, 256)
  }
  if ((tick & 8192) !== 0) {
    ratio = signedShiftRight(ratio * 12247334978882834399n, 64, 256)
  }
  if ((tick & 16384) !== 0) {
    ratio = signedShiftRight(ratio * 8131365268884726200n, 64, 256)
  }
  if ((tick & 32768) !== 0) {
    ratio = signedShiftRight(ratio * 3584323654723342297n, 64, 256)
  }
  if ((tick & 65536) !== 0) {
    ratio = signedShiftRight(ratio * 696457651847595233n, 64, 256)
  }
  if ((tick & 131072) !== 0) {
    ratio = signedShiftRight(ratio * 26294789957452057n, 64, 256)
  }
  if ((tick & 262144) !== 0) {
    ratio = signedShiftRight(ratio * 37481735321082n, 64, 256)
  }

  return ratio
}

export function priceToSqrtPriceX64(price: Decimal, decimalsA: number, decimalsB: number) {
  return toX64(price.mul(Decimal.pow(10, decimalsB - decimalsA)).sqrt())
}

export function sqrtPriceX64ToPrice(
  sqrtPriceX64: bigint,
  decimalsA: number,
  decimalsB: number
): Decimal {
  return fromX64(sqrtPriceX64)
    .pow(2)
    .mul(Decimal.pow(10, decimalsA - decimalsB))
}

export function tickIndexToSqrtPriceX64(tickIndex: number) {
  if (tickIndex > 0) {
    return tickIndexToSqrtPricePositive(tickIndex)
  }
  return tickIndexToSqrtPriceNegative(tickIndex)
}

export function sqrtPriceX64ToTickIndex(sqrtPriceX64: bigint): number {
  if (sqrtPriceX64 > MAX_SQRT_PRICE || sqrtPriceX64 < MIN_SQRT_PRICE) {
    throw new Error('Provided sqrtPrice is not within the supported sqrtPrice range.')
  }

  const msb = sqrtPriceX64.toString(2).length - 1
  const adjustedMsb = BigInt(msb - 64)
  const log2pIntegerX32 = signedShiftLeft(adjustedMsb, 32, 128)

  let bit = 0x8000000000000000n
  let precision = 0
  let log2pFractionX64 = 0n

  let r = msb >= 64 ? sqrtPriceX64 >> BigInt(msb - 63) : sqrtPriceX64 << BigInt(63 - msb)

  while (bit > 0 && precision < BIT_PRECISION) {
    r *= r
    const rMoreThanTwo = r >> 127n
    r >>= 63n + rMoreThanTwo
    log2pFractionX64 += bit * rMoreThanTwo
    bit >>= 1n
    precision += 1
  }

  const log2pFractionX32 = log2pFractionX64 >> 32n

  const log2pX32 = log2pIntegerX32 + log2pFractionX32
  const logbpX64 = log2pX32 * LOG_B_2_X32

  const tickLow = signedShiftRight(logbpX64 - LOG_B_P_ERR_MARGIN_LOWER_X64, 64, 128)
  const tickHigh = signedShiftRight(logbpX64 + LOG_B_P_ERR_MARGIN_UPPER_X64, 64, 128)

  if (tickLow === tickHigh) {
    return Number(tickLow)
  }
  const derivedTickHighSqrtPriceX64 = tickIndexToSqrtPriceX64(Number(tickHigh))
  if (derivedTickHighSqrtPriceX64 <= sqrtPriceX64) {
    return Number(tickHigh)
  }
  return Number(tickLow)
}

export function tickIndexToPrice(tickIndex: number, decimalsA: number, decimalsB: number): Decimal {
  return sqrtPriceX64ToPrice(tickIndexToSqrtPriceX64(tickIndex), decimalsA, decimalsB)
}

export function priceToTickIndex(price: Decimal, decimalsA: number, decimalsB: number): number {
  return sqrtPriceX64ToTickIndex(priceToSqrtPriceX64(price, decimalsA, decimalsB))
}

export function priceToInitializableTickIndex(
  price: Decimal,
  decimalsA: number,
  decimalsB: number,
  tickSpacing: number
): number {
  return getInitializableTickIndex(priceToTickIndex(price, decimalsA, decimalsB), tickSpacing)
}

export function getInitializableTickIndex(tickIndex: number, tickSpacing: number): number {
  return tickIndex - (tickIndex % tickSpacing)
}

export function getNextInitializableTickIndex(tickIndex: number, tickSpacing: number) {
  return getInitializableTickIndex(tickIndex, tickSpacing) + tickSpacing
}

export function getPrevInitializableTickIndex(tickIndex: number, tickSpacing: number) {
  return getInitializableTickIndex(tickIndex, tickSpacing) - tickSpacing
}

/// Convert a signed integer to two's complement representation.
export function encodeSignedInt(value: bigint, width: number): bigint {
  const maxPositive = (1n << BigInt(width - 1)) - 1n
  const minNegative = -1n << BigInt(width - 1)
  if (value > maxPositive || value < minNegative) {
    throw new Error(`Value ${value} is out of range for width ${width}`)
  }

  if (value >= 0n) {
    return value
  }

  const mask = (1n << BigInt(width)) - 1n
  return (~-value & mask) + 1n
}

/// Convert a two's complement representation to a signed integer.
export function decodeSignedInt(value: bigint, width: number): bigint {
  if (value & (1n << BigInt(width - 1))) {
    return value - (1n << BigInt(width))
  } else {
    return value
  }
}
