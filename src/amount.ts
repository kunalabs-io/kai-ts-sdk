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
    return new Decimal(this.int.toString()).div(10 ** this.decimals).toString()
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
}
