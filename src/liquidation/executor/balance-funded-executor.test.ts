import { describe, it, expect } from 'vitest'
import Decimal from 'decimal.js'
import { SuiClientTypes } from '@mysten/sui/client'
import {
  bufferedRepayAmount,
  checkBalanceChangeCaps,
  BalanceChangeCapParams,
  DUST_POSITION_MAX_REPAY_USD,
  DUST_RUN_MAX_GAS_SUI,
} from './balance-funded-executor'
import { SUI, USDC, suiUSDT } from '../../coin-info'

const SENDER = '0x' + 'ab'.repeat(32)
const OTHER = '0x' + 'cd'.repeat(32)

function change(coinType: string, amount: bigint, address = SENDER): SuiClientTypes.BalanceChange {
  return { coinType, address, amount: amount.toString() }
}

function params(overrides?: Partial<BalanceChangeCapParams>): BalanceChangeCapParams {
  return {
    sender: SENDER,
    allowedOutflows: [
      { coinInfo: USDC, priceUsd: new Decimal(1) },
      { coinInfo: suiUSDT, priceUsd: new Decimal(1) },
    ],
    computationCost: 1_000_000n,
    storageCost: 2_000_000n,
    maxRepayUsd: DUST_POSITION_MAX_REPAY_USD,
    maxGasSui: DUST_RUN_MAX_GAS_SUI,
    ...overrides,
  }
}

describe('bufferedRepayAmount', () => {
  it('returns 0 for 0 debt', () => {
    expect(bufferedRepayAmount(0n)).toBe(0n)
  })

  it('adds at least 1 unit for tiny debts', () => {
    expect(bufferedRepayAmount(1n)).toBe(2n)
    expect(bufferedRepayAmount(499n)).toBe(500n)
  })

  it('adds 0.2% + 1 unit for larger debts', () => {
    expect(bufferedRepayAmount(10_000n)).toBe(10_021n)
    expect(bufferedRepayAmount(1_000_000n)).toBe(1_002_001n)
  })
})

describe('checkBalanceChangeCaps', () => {
  it('passes outflows within the cap and values them correctly', () => {
    // 30_000 raw USDC units = $0.03 at 6 decimals
    const res = checkBalanceChangeCaps([change(USDC.typeName, -30_000n)], params())
    expect(res.violations).toEqual([])
    expect(res.outflowUsd.toString()).toBe('0.03')
  })

  it('rejects outflows exceeding the repay cap', () => {
    // $0.06 > $0.05 ceiling
    const res = checkBalanceChangeCaps([change(USDC.typeName, -60_000n)], params())
    expect(res.violations).toHaveLength(1)
    expect(res.violations[0]).toContain('exceeds cap')
  })

  it('sums outflows across allowed coins', () => {
    const res = checkBalanceChangeCaps(
      [change(USDC.typeName, -30_000n), change(suiUSDT.typeName, -30_000n)],
      params()
    )
    expect(res.outflowUsd.toString()).toBe('0.06')
    expect(res.violations).toHaveLength(1)
  })

  it('ignores inflows and other addresses', () => {
    const res = checkBalanceChangeCaps(
      [
        change(USDC.typeName, 500_000n), // reward inflow
        change(USDC.typeName, -60_000n, OTHER), // someone else's outflow
      ],
      params()
    )
    expect(res.violations).toEqual([])
    expect(res.outflowUsd.toString()).toBe('0')
  })

  it('rejects gas above the gas cap', () => {
    const res = checkBalanceChangeCaps(
      [],
      params({ computationCost: 900_000_000n, storageCost: 200_000_000n }) // 1.1 SUI
    )
    expect(res.violations).toHaveLength(1)
    expect(res.violations[0]).toContain('gas')
  })

  it('nets the gas fee out of a SUI outflow when SUI is an allowed coin', () => {
    // gas = 3_000_000 MIST; outflow 13_000_000 → 10_000_000 MIST repay = 0.01 SUI
    const res = checkBalanceChangeCaps(
      [change(SUI.typeName, -13_000_000n)],
      params({
        allowedOutflows: [{ coinInfo: SUI, priceUsd: new Decimal(4) }],
      })
    )
    expect(res.violations).toEqual([])
    expect(res.outflowUsd.toString()).toBe('0.04')
  })

  it('allows small non-gas SUI outflow (Pyth fees) when SUI is not a position coin', () => {
    // 3_000_000 gas + 1_000_000 pyth fee, within the 0.01 SUI default allowance
    const res = checkBalanceChangeCaps([change(SUI.typeName, -4_000_000n)], params())
    expect(res.violations).toEqual([])
    expect(res.outflowUsd.toString()).toBe('0')
  })

  it('rejects non-gas SUI outflow beyond the allowance when SUI is not a position coin', () => {
    // 3_000_000 gas + 50_000_000 excess > 10_000_000 default allowance
    const res = checkBalanceChangeCaps([change(SUI.typeName, -53_000_000n)], params())
    expect(res.violations).toHaveLength(1)
    expect(res.violations[0]).toContain('non-gas SUI outflow')
  })

  it('rejects any outflow in a coin the transaction has no business paying', () => {
    const rogue = '0x' + 'ee'.repeat(32) + '::rogue::ROGUE'
    const res = checkBalanceChangeCaps([change(rogue, -1n)], params())
    expect(res.violations).toHaveLength(1)
    expect(res.violations[0]).toContain('unexpected outflow')
  })

  it('normalizes coin type representations before matching', () => {
    // short-form 0x2::sui::SUI must match the canonical long form
    const res = checkBalanceChangeCaps(
      [change('0x2::sui::SUI', -13_000_000n)],
      params({
        allowedOutflows: [{ coinInfo: SUI, priceUsd: new Decimal(4) }],
      })
    )
    expect(res.violations).toEqual([])
    expect(res.outflowUsd.toString()).toBe('0.04')
  })

  it('reports multiple violations together', () => {
    const rogue = '0x' + 'ee'.repeat(32) + '::rogue::ROGUE'
    const res = checkBalanceChangeCaps(
      [change(USDC.typeName, -60_000n), change(rogue, -1n)],
      params({ computationCost: 2_000_000_000n, storageCost: 0n })
    )
    expect(res.violations).toHaveLength(3)
  })
})
