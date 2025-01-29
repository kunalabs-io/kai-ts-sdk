export function min(a: bigint, b: bigint): bigint {
  return a < b ? a : b
}

export function max(a: bigint, b: bigint): bigint {
  return a > b ? a : b
}

export function round(num: number, decimals: number): number {
  return Math.round(num * 10 ** decimals) / 10 ** decimals
}

export function muldiv(a: bigint, b: bigint, c: bigint): bigint {
  return (a * b) / c
}

export function abs(a: bigint): bigint {
  return a < 0n ? -a : a
}
