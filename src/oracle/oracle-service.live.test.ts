import { describe, expect, it } from 'vitest'
import pino from 'pino'
import { OracleService } from './oracle-service'
import { createSuiClient } from '../client'
import { POSITION_CONFIG_INFOS } from '../lp/config'

// Network-dependent, read-only. Run explicitly:
//   RUN_LIVE_TESTS=1 pnpm vitest run src/oracle/oracle-service.live
//
// Starts the oracle in 'onchain' mode against mainnet (no Hermes involved at
// all) and checks that every tracked feed produces a fresh, sane price.

describe.runIf(process.env.RUN_LIVE_TESTS)('oracle service onchain mode (real network)', () => {
  it('serves fresh prices for all feeds from on-chain PIOs', async () => {
    const client = createSuiClient()
    const service = new OracleService({
      client,
      logger: pino({ level: 'warn' }),
      mode: 'onchain',
    })

    await service.start()
    try {
      expect(service.supportsPriceUpdates).toBe(false)
      expect(service.isHealthy()).toBe(true)

      for (const config of POSITION_CONFIG_INFOS) {
        const price = service.getPrice(config)
        expect(price.human.isFinite()).toBe(true)
        expect(price.human.gt(0)).toBe(true)

        const xUsd = service.getAssetPriceUsd(config.X)
        const yUsd = service.getAssetPriceUsd(config.Y)
        expect(xUsd.gt(0)).toBe(true)
        expect(yUsd.gt(0)).toBe(true)

        console.log(
          `${config.name}: ${price.human.toSignificantDigits(6)} ` +
            `(X $${xUsd.toSignificantDigits(6)}, Y $${yUsd.toSignificantDigits(6)})`
        )
      }

      const metrics = service.getMetrics()
      for (const [feedId, staleness] of metrics.onChainStaleness) {
        expect(staleness, `on-chain staleness for ${feedId}`).toBeLessThan(60)
      }
    } finally {
      service.stop()
    }
  }, 60000)
})
