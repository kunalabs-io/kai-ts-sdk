import { describe, it, expect } from 'vitest'
import {
  KAI_LEVERAGE_DEAD_WINDOWS,
  KAI_LEVERAGE_PACKAGE_ERAS,
  KAI_LEVERAGE_PUBLISHED_AT_BY_CONFIG_VERSION,
  getKaiLeveragePublishedAt,
  isKaiLeverageDeadWindow,
} from './package-eras'
import { mainnetEnv } from '../gen/_envs/mainnet'

const V19 = '0x634794be3a538c645f9afbb8f652455a665df57e8ccaca69de879c1feb08d908'
const V20 = '0x9dc365fd6716a2f4d567f0e0423e0d42d85d3a10038542166d95bf8c7406a508'

describe('KAI_LEVERAGE_PACKAGE_ERAS', () => {
  // Fails after every kai-leverage upgrade until the era map is brought up to
  // date — see the maintenance notes in package-eras.ts.
  it('maps the latest era to the current mainnet published-at', () => {
    const latestEra = Math.max(...KAI_LEVERAGE_PACKAGE_ERAS.keys())
    expect(KAI_LEVERAGE_PUBLISHED_AT_BY_CONFIG_VERSION.get(latestEra)).toBe(
      mainnetEnv.packages['kai-leverage'].publishedAt
    )
  })

  it('lists every era newest first with strictly increasing publish checkpoints across eras', () => {
    let prevNewest = -1
    for (const era of [...KAI_LEVERAGE_PACKAGE_ERAS.keys()].sort((a, b) => a - b)) {
      const packages = KAI_LEVERAGE_PACKAGE_ERAS.get(era)!
      for (let i = 1; i < packages.length; i++) {
        expect(packages[i - 1].version).toBeGreaterThan(packages[i].version)
        expect(packages[i - 1].publishedAtCheckpoint).toBeGreaterThan(
          packages[i].publishedAtCheckpoint
        )
      }
      const oldest = packages[packages.length - 1]
      expect(oldest.publishedAtCheckpoint).toBeGreaterThan(prevNewest)
      prevNewest = packages[0].publishedAtCheckpoint
    }
  })
})

describe('getKaiLeveragePublishedAt', () => {
  it('returns undefined for an unknown era', () => {
    expect(getKaiLeveragePublishedAt(99, 320_000_000)).toBeUndefined()
  })

  it('picks the newest package that existed at the checkpoint', () => {
    // v20 published at cp 320578328
    expect(getKaiLeveragePublishedAt(5, 320578327)).toBe(V19)
    expect(getKaiLeveragePublishedAt(5, 320578328)).toBe(V20)
    expect(getKaiLeveragePublishedAt(5, 330_000_000)).toBe(V20)
  })

  it('falls back to the era oldest package before any of them existed', () => {
    // v19 published at cp 314942018
    expect(getKaiLeveragePublishedAt(5, 314942017)).toBe(V19)
  })
})

describe('isKaiLeverageDeadWindow', () => {
  const cetus = KAI_LEVERAGE_DEAD_WINDOWS.find(w => w.dex === 'cetus')!

  it('is half-open [start, end) and DEX-scoped', () => {
    expect(isKaiLeverageDeadWindow(cetus.startCheckpoint - 1, 'cetus')).toBe(false)
    expect(isKaiLeverageDeadWindow(cetus.startCheckpoint, 'cetus')).toBe(true)
    expect(isKaiLeverageDeadWindow(cetus.endCheckpoint - 1, 'cetus')).toBe(true)
    expect(isKaiLeverageDeadWindow(cetus.endCheckpoint, 'cetus')).toBe(false)
    expect(isKaiLeverageDeadWindow(cetus.startCheckpoint, 'bluefin')).toBe(false)
  })

  it('matches any DEX when none is given', () => {
    expect(isKaiLeverageDeadWindow(cetus.startCheckpoint)).toBe(true)
  })

  it('ends where a package that passes the gate becomes available', () => {
    // The window closes exactly at the publish of the re-linked package.
    expect(getKaiLeveragePublishedAt(5, cetus.endCheckpoint)).toBe(V20)
    expect(getKaiLeveragePublishedAt(5, cetus.endCheckpoint - 1)).toBe(V19)
  })
})
