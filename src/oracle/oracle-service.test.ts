import { describe, it, expect } from 'vitest'
import pino from 'pino'
import { ClientWithCoreApi } from '@mysten/sui/client'
import { OracleService, parsedFeedFromPio } from './oracle-service'
import { PriceInfoObject as PriceInfoObject_ } from '../gen/pyth/price-info/structs'

function makePio(fields: {
  price: { negative: boolean; magnitude: bigint }
  conf: bigint
  expo: { negative: boolean; magnitude: bigint }
  timestamp: bigint
}): PriceInfoObject_ {
  const price = {
    price: fields.price,
    conf: fields.conf,
    expo: fields.expo,
    timestamp: fields.timestamp,
  }
  return {
    priceInfo: { priceFeed: { price, emaPrice: price } },
  } as unknown as PriceInfoObject_
}

describe('parsedFeedFromPio', () => {
  it('converts a positive price with negative expo', () => {
    const feed = parsedFeedFromPio(
      '0xabc',
      makePio({
        price: { negative: false, magnitude: 353045000000n },
        conf: 190265726n,
        expo: { negative: true, magnitude: 8n },
        timestamp: 1756200000n,
      })
    )
    expect(feed.id).toBe('0xabc')
    expect(feed.price.price).toBe('353045000000')
    expect(feed.price.conf).toBe('190265726')
    expect(feed.price.expo).toBe(-8)
    expect(feed.price.publish_time).toBe(1756200000)
    expect(feed.ema_price.price).toBe('353045000000')
  })

  it('converts a negative price', () => {
    const feed = parsedFeedFromPio(
      '0xabc',
      makePio({
        price: { negative: true, magnitude: 42n },
        conf: 1n,
        expo: { negative: true, magnitude: 2n },
        timestamp: 1n,
      })
    )
    expect(feed.price.price).toBe('-42')
  })

  it('does not emit a negative sign for negative zero', () => {
    const feed = parsedFeedFromPio(
      '0xabc',
      makePio({
        price: { negative: true, magnitude: 0n },
        conf: 0n,
        expo: { negative: false, magnitude: 0n },
        timestamp: 0n,
      })
    )
    expect(feed.price.price).toBe('0')
  })
})

describe('OracleService onchain mode', () => {
  const service = new OracleService({
    client: {} as ClientWithCoreApi,
    logger: pino({ level: 'silent' }),
    mode: 'onchain',
  })

  it('does not support price feed updates', async () => {
    expect(service.supportsPriceUpdates).toBe(false)
    await expect(service.getPriceFeedUpdateInfo([])).rejects.toThrow(
      'not available in onchain mode'
    )
  })

  it('cannot switch modes', async () => {
    await expect(service.switchMode('streaming')).rejects.toThrow('onchain mode')
  })
})

describe('OracleService hermes mode', () => {
  it('supports price feed updates', () => {
    const service = new OracleService({
      client: {} as ClientWithCoreApi,
      logger: pino({ level: 'silent' }),
      mode: 'streaming',
    })
    expect(service.supportsPriceUpdates).toBe(true)
  })
})
