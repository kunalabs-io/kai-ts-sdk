import { describe, it, expect } from 'vitest'
import { Amount } from './amount'
import Decimal from 'decimal.js'

describe('Amount', () => {
  describe('fromInt', () => {
    it('creates an amount from integer value', () => {
      const amount = Amount.fromInt(1000000n, 6)
      expect(amount.int).toBe(1000000n)
      expect(amount.decimals).toBe(6)
    })

    it('creates an amount from number', () => {
      const amount = Amount.fromInt(1000000, 6)
      expect(amount.int).toBe(1000000n)
    })

    it('throws on non-integer number', () => {
      expect(() => Amount.fromInt(1.5, 6)).toThrow('the amount argument must be an integer')
    })

    it('throws on negative decimals', () => {
      expect(() => Amount.fromInt(100, -1)).toThrow(
        'the decimals argument must be a non-negative integer'
      )
    })
  })

  describe('fromNum', () => {
    it('creates an amount from decimal string', () => {
      const amount = Amount.fromNum('1.5', 6)
      expect(amount.int).toBe(1500000n)
      expect(amount.decimals).toBe(6)
    })

    it('creates an amount from number', () => {
      const amount = Amount.fromNum(1.5, 6)
      expect(amount.int).toBe(1500000n)
    })

    it('creates an amount from whole number', () => {
      const amount = Amount.fromNum('100', 6)
      expect(amount.int).toBe(100000000n)
    })

    it('handles empty string as zero', () => {
      const amount = Amount.fromNum('', 6)
      expect(amount.int).toBe(0n)
    })

    it('handles trailing zeros correctly', () => {
      const amount = Amount.fromNum('1.500', 6)
      expect(amount.int).toBe(1500000n)
    })

    it('throws when decimal places exceed decimals', () => {
      expect(() => Amount.fromNum('1.1234567', 6)).toThrow(
        'the amount cannot be correctly represented with the provided number of decimals'
      )
    })
  })

  describe('equals', () => {
    it('returns true for equal amounts', () => {
      const a = Amount.fromInt(1000n, 6)
      const b = Amount.fromInt(1000n, 6)
      expect(a.equals(b)).toBe(true)
    })

    it('returns false for different values', () => {
      const a = Amount.fromInt(1000n, 6)
      const b = Amount.fromInt(2000n, 6)
      expect(a.equals(b)).toBe(false)
    })

    it('returns false for different decimals', () => {
      const a = Amount.fromInt(1000n, 6)
      const b = Amount.fromInt(1000n, 9)
      expect(a.equals(b)).toBe(false)
    })
  })

  describe('toString', () => {
    it('converts to decimal string', () => {
      const amount = Amount.fromInt(1500000n, 6)
      expect(amount.toString()).toBe('1.5')
    })

    it('handles zero decimals', () => {
      const amount = Amount.fromInt(100n, 0)
      expect(amount.toString()).toBe('100')
    })

    it('handles small values', () => {
      const amount = Amount.fromInt(1n, 6)
      expect(amount.toString()).toBe('0.000001')
    })
  })

  describe('toNumber', () => {
    it('converts to number', () => {
      const amount = Amount.fromInt(1500000n, 6)
      expect(amount.toNumber()).toBe(1.5)
    })
  })

  describe('toRoundedNumber', () => {
    it('rounds to specified decimal places', () => {
      const amount = Amount.fromInt(1234567n, 6)
      expect(amount.toRoundedNumber(2)).toBe(1.23)
    })
  })

  describe('toDecimal', () => {
    it('converts to Decimal', () => {
      const amount = Amount.fromInt(1500000n, 6)
      const decimal = amount.toDecimal()
      expect(decimal).toBeInstanceOf(Decimal)
      expect(decimal.toString()).toBe('1.5')
    })
  })

  describe('isZero', () => {
    it('returns true for zero amount', () => {
      const amount = Amount.fromInt(0n, 6)
      expect(amount.isZero()).toBe(true)
    })

    it('returns false for non-zero amount', () => {
      const amount = Amount.fromInt(1n, 6)
      expect(amount.isZero()).toBe(false)
    })
  })

  describe('isPositive', () => {
    it('returns true for positive amount', () => {
      const amount = Amount.fromInt(1n, 6)
      expect(amount.isPositive()).toBe(true)
    })

    it('returns false for zero', () => {
      const amount = Amount.fromInt(0n, 6)
      expect(amount.isPositive()).toBe(false)
    })

    it('returns false for negative amount', () => {
      const amount = Amount.fromInt(-1n, 6)
      expect(amount.isPositive()).toBe(false)
    })
  })

  describe('isNegative', () => {
    it('returns true for negative amount', () => {
      const amount = Amount.fromInt(-1n, 6)
      expect(amount.isNegative()).toBe(true)
    })

    it('returns false for zero', () => {
      const amount = Amount.fromInt(0n, 6)
      expect(amount.isNegative()).toBe(false)
    })

    it('returns false for positive amount', () => {
      const amount = Amount.fromInt(1n, 6)
      expect(amount.isNegative()).toBe(false)
    })
  })

  describe('cmp', () => {
    it('returns -1 when this < other', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 6)
      expect(a.cmp(b)).toBe(-1)
    })

    it('returns 0 when equal', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.cmp(b)).toBe(0)
    })

    it('returns 1 when this > other', () => {
      const a = Amount.fromInt(200n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.cmp(b)).toBe(1)
    })

    it('throws when decimals differ', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(100n, 9)
      expect(() => a.cmp(b)).toThrow('Cannot compare amounts with different decimals')
    })
  })

  describe('gt', () => {
    it('returns true when this > other', () => {
      const a = Amount.fromInt(200n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.gt(b)).toBe(true)
    })

    it('returns false when this <= other', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.gt(b)).toBe(false)
    })
  })

  describe('lt', () => {
    it('returns true when this < other', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 6)
      expect(a.lt(b)).toBe(true)
    })

    it('returns false when this >= other', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.lt(b)).toBe(false)
    })
  })

  describe('gte', () => {
    it('returns true when this > other', () => {
      const a = Amount.fromInt(200n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.gte(b)).toBe(true)
    })

    it('returns true when this == other', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.gte(b)).toBe(true)
    })

    it('returns false when this < other', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 6)
      expect(a.gte(b)).toBe(false)
    })
  })

  describe('lte', () => {
    it('returns true when this < other', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 6)
      expect(a.lte(b)).toBe(true)
    })

    it('returns true when this == other', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.lte(b)).toBe(true)
    })

    it('returns false when this > other', () => {
      const a = Amount.fromInt(200n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.lte(b)).toBe(false)
    })
  })

  describe('add', () => {
    it('adds two amounts', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 6)
      const result = a.add(b)
      expect(result.int).toBe(300n)
      expect(result.decimals).toBe(6)
    })

    it('preserves decimals', () => {
      const a = Amount.fromInt(100n, 9)
      const b = Amount.fromInt(200n, 9)
      expect(a.add(b).decimals).toBe(9)
    })

    it('throws when decimals differ', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 9)
      expect(() => a.add(b)).toThrow('Cannot add amounts with different decimals')
    })
  })

  describe('sub', () => {
    it('subtracts two amounts', () => {
      const a = Amount.fromInt(300n, 6)
      const b = Amount.fromInt(100n, 6)
      const result = a.sub(b)
      expect(result.int).toBe(200n)
      expect(result.decimals).toBe(6)
    })

    it('can produce negative results', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(300n, 6)
      const result = a.sub(b)
      expect(result.int).toBe(-200n)
    })

    it('throws when decimals differ', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 9)
      expect(() => a.sub(b)).toThrow('Cannot subtract amounts with different decimals')
    })
  })

  describe('abs', () => {
    it('returns same value for positive amount', () => {
      const amount = Amount.fromInt(100n, 6)
      const result = amount.abs()
      expect(result.int).toBe(100n)
      expect(result.decimals).toBe(6)
    })

    it('returns positive value for negative amount', () => {
      const amount = Amount.fromInt(-100n, 6)
      const result = amount.abs()
      expect(result.int).toBe(100n)
    })

    it('returns zero for zero', () => {
      const amount = Amount.fromInt(0n, 6)
      const result = amount.abs()
      expect(result.int).toBe(0n)
    })
  })

  describe('neg', () => {
    it('negates positive amount', () => {
      const amount = Amount.fromInt(100n, 6)
      const result = amount.neg()
      expect(result.int).toBe(-100n)
      expect(result.decimals).toBe(6)
    })

    it('negates negative amount', () => {
      const amount = Amount.fromInt(-100n, 6)
      const result = amount.neg()
      expect(result.int).toBe(100n)
    })

    it('zero stays zero', () => {
      const amount = Amount.fromInt(0n, 6)
      const result = amount.neg()
      expect(result.int).toBe(0n)
    })
  })

  describe('min', () => {
    it('returns smaller of two amounts', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 6)
      expect(a.min(b).int).toBe(100n)
      expect(b.min(a).int).toBe(100n)
    })

    it('returns either when equal', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.min(b).int).toBe(100n)
    })
  })

  describe('max', () => {
    it('returns larger of two amounts', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 6)
      expect(a.max(b).int).toBe(200n)
      expect(b.max(a).int).toBe(200n)
    })

    it('returns either when equal', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(100n, 6)
      expect(a.max(b).int).toBe(100n)
    })
  })

  describe('immutability', () => {
    it('add does not modify original', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(200n, 6)
      a.add(b)
      expect(a.int).toBe(100n)
    })

    it('sub does not modify original', () => {
      const a = Amount.fromInt(100n, 6)
      const b = Amount.fromInt(50n, 6)
      a.sub(b)
      expect(a.int).toBe(100n)
    })
  })
})
