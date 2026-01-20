import Decimal from 'decimal.js'

function isNumeric(value: string) {
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return true
  }
  if (/^-?\d+\.$/.test(value)) {
    return true
  }
  if (/^\.\d+$/.test(value)) {
    return true
  }
  return false
}

export class Amount {
  /**
   *
   * @param int Integer representation of the amount.
   * @param decimals Number of decimals.
   */
  protected constructor(
    readonly int: bigint,
    readonly decimals: number
  ) {}

  /**
   *
   * Instantiates an amount based on it's integer representation.
   *
   * @param amount Integer representation of the amount.
   * @param tokenDecimals Number of decimals.
   */
  static fromInt(amount: number | bigint, decimals: number): Amount {
    if (typeof amount === 'number' && !Number.isInteger(amount)) {
      throw new Error('the amount argument must be an integer')
    }
    if (!Number.isInteger(decimals) || decimals < 0) {
      throw new Error('the decimals argument must be a non-negative integer')
    }
    return new Amount(BigInt(amount), decimals)
  }

  /**
   * Instantiates an amount based on its number representation.
   *
   * @param amount Number representation of the amount.
   * @param tokenDecimals Number of decimals.
   */
  static fromNum(amount: number | string, decimals: number): Amount {
    if (amount === '') {
      amount = '0'
    }
    if (typeof amount === 'number') {
      amount = amount.toString()
    }
    if (!isNumeric(amount)) {
      throw new Error('the amount argument must be a number')
    }
    const [int, dec] = amount.split('.')
    const decTrimmed = (dec && dec.replace(/0+$/, '')) || ''
    if (decTrimmed.length > decimals) {
      throw new Error(
        'the amount cannot be correctly represented with the provided number of decimals'
      )
    }

    return new Amount(BigInt(int + decTrimmed.padEnd(decimals, '0')), decimals)
  }

  /**
   * Return true if amounts are equal.
   *
   * @param other
   * @returns
   */
  equals(other: Amount): boolean {
    return this.int === other.int && this.decimals === other.decimals
  }

  /**
   * Convert amount to a string decimal representation.
   */
  toString(): string {
    if (this.decimals === 0) {
      return this.int.toString()
    }
    const NoSciDecimal = Decimal.clone({ toExpNeg: -1000, toExpPos: 1000 })
    return new NoSciDecimal(this.int.toString()).div(10 ** this.decimals).toString()
  }

  /**
   * Convert amount to a number decimal representation.
   */
  toNumber(): number {
    return Number.parseFloat(this.toString())
  }

  toRoundedNumber(decimals: number): number {
    const num = this.toNumber()
    return Math.round(num * 10 ** decimals) / 10 ** decimals
  }

  toDecimal(): Decimal {
    return new Decimal(this.toString())
  }

  /**
   * Returns true if the amount is zero.
   */
  isZero(): boolean {
    return this.int === 0n
  }

  /**
   * Returns true if the amount is positive (greater than zero).
   */
  isPositive(): boolean {
    return this.int > 0n
  }

  /**
   * Returns true if the amount is negative (less than zero).
   */
  isNegative(): boolean {
    return this.int < 0n
  }

  /**
   * Compares this amount with another.
   * Returns -1 if this < other, 0 if equal, 1 if this > other.
   *
   * @param other The amount to compare with (must have the same decimals).
   * @throws If the decimals don't match.
   */
  cmp(other: Amount): -1 | 0 | 1 {
    if (this.decimals !== other.decimals) {
      throw new Error('Cannot compare amounts with different decimals')
    }
    if (this.int < other.int) return -1
    if (this.int > other.int) return 1
    return 0
  }

  /**
   * Returns true if this amount is greater than the other.
   *
   * @param other The amount to compare with (must have the same decimals).
   */
  gt(other: Amount): boolean {
    return this.cmp(other) === 1
  }

  /**
   * Returns true if this amount is less than the other.
   *
   * @param other The amount to compare with (must have the same decimals).
   */
  lt(other: Amount): boolean {
    return this.cmp(other) === -1
  }

  /**
   * Returns true if this amount is greater than or equal to the other.
   *
   * @param other The amount to compare with (must have the same decimals).
   */
  gte(other: Amount): boolean {
    return this.cmp(other) >= 0
  }

  /**
   * Returns true if this amount is less than or equal to the other.
   *
   * @param other The amount to compare with (must have the same decimals).
   */
  lte(other: Amount): boolean {
    return this.cmp(other) <= 0
  }

  /**
   * Adds another amount to this one.
   *
   * @param other The amount to add (must have the same decimals).
   * @returns A new Amount representing the sum.
   * @throws If the decimals don't match.
   */
  add(other: Amount): Amount {
    if (this.decimals !== other.decimals) {
      throw new Error('Cannot add amounts with different decimals')
    }
    return Amount.fromInt(this.int + other.int, this.decimals)
  }

  /**
   * Subtracts another amount from this one.
   *
   * @param other The amount to subtract (must have the same decimals).
   * @returns A new Amount representing the difference.
   * @throws If the decimals don't match.
   */
  sub(other: Amount): Amount {
    if (this.decimals !== other.decimals) {
      throw new Error('Cannot subtract amounts with different decimals')
    }
    return Amount.fromInt(this.int - other.int, this.decimals)
  }

  /**
   * Returns the absolute value of this amount.
   *
   * @returns A new Amount with the absolute value.
   */
  abs(): Amount {
    return Amount.fromInt(this.int < 0n ? -this.int : this.int, this.decimals)
  }

  /**
   * Returns the negation of this amount.
   *
   * @returns A new Amount with the negated value.
   */
  neg(): Amount {
    return Amount.fromInt(-this.int, this.decimals)
  }

  /**
   * Returns the minimum of this amount and another.
   *
   * @param other The amount to compare with (must have the same decimals).
   * @returns The smaller of the two amounts.
   */
  min(other: Amount): Amount {
    return this.lte(other) ? this : other
  }

  /**
   * Returns the maximum of this amount and another.
   *
   * @param other The amount to compare with (must have the same decimals).
   * @returns The larger of the two amounts.
   */
  max(other: Amount): Amount {
    return this.gte(other) ? this : other
  }
}
