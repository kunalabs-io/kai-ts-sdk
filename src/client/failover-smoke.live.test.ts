import { describe, expect, it } from 'vitest'
import { createSuiClient } from './index'

// Network-dependent; run explicitly: RUN_LIVE_TESTS=1 pnpm vitest run src/client
describe.runIf(process.env.RUN_LIVE_TESTS)('failover live smoke (real network)', () => {
  it('fails over from a dead primary to the public fullnode', async () => {
    const events: string[] = []
    const client = createSuiClient({
      urls: ['https://127.0.0.1:9', 'https://fullnode.mainnet.sui.io'],
      timeout: 10_000,
      onFailover: e => events.push(`${e.url} -> ${e.nextUrl}`),
    })

    const { balance } = await client.core.getBalance({
      owner: '0x0000000000000000000000000000000000000000000000000000000000000000',
      coinType: '0x2::sui::SUI',
    })
    expect(String(balance.balance)).toBeDefined()
    expect(events).toEqual(['https://127.0.0.1:9 -> https://fullnode.mainnet.sui.io'])

    // primary cooling down: second call goes straight to fallback, no new events
    await client.core.getBalance({
      owner: '0x0000000000000000000000000000000000000000000000000000000000000000',
      coinType: '0x2::sui::SUI',
    })
    expect(events.length).toBe(1)
    console.log('LIVE FAILOVER OK — events:', events)
  }, 30_000)
})
