import { describe, expect, it } from 'vitest'
import { Transaction } from '@mysten/sui/transactions'
import { buildPriceCollection, LBTCPioInfo, suiPioInfo, USDCPioInfo, wBTCPioInfo } from './pyth'

function moveCalls(tx: Transaction, fn: string) {
  return tx
    .getData()
    .commands.filter(
      c =>
        c.$kind === 'MoveCall' && c.MoveCall.module === 'oracle_price' && c.MoveCall.function === fn
    )
}

describe('buildPriceCollection', () => {
  it('dedupes the price object for a shared-feed pair but adds both currencies', () => {
    // wBTC and LBTC share the BTC feed (same PriceInfoObject) while having
    // distinct registry Currency objects — the exact case the dedupe exists for.
    expect(wBTCPioInfo.priceInfoObjectId).toBe(LBTCPioInfo.priceInfoObjectId)

    const tx = new Transaction()
    buildPriceCollection(tx, [wBTCPioInfo, LBTCPioInfo])

    expect(moveCalls(tx, 'create')).toHaveLength(1)
    expect(moveCalls(tx, 'add_pyth_pro')).toHaveLength(1)
    expect(moveCalls(tx, 'add_currency')).toHaveLength(2)
  })

  it('adds one price object and one currency per coin for a distinct-feed pair', () => {
    const tx = new Transaction()
    buildPriceCollection(tx, [suiPioInfo, USDCPioInfo])

    expect(moveCalls(tx, 'create')).toHaveLength(1)
    expect(moveCalls(tx, 'add_pyth_pro')).toHaveLength(2)
    expect(moveCalls(tx, 'add_currency')).toHaveLength(2)
  })
})
