import { parseAndVerify } from '../gen/wormhole/vaa/functions'
import {
  createAuthenticatedPriceInfosUsingAccumulator,
  updateSinglePriceFeed,
} from '../gen/pyth/pyth/functions'
import { Transaction } from '@mysten/sui/transactions'
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import { destroy as destroyHotPotatoVector } from '../gen/pyth/hot-potato-vector/functions'
import { PriceInfo } from '../gen/pyth/price-info/structs'
import { PriceFeedUpdateInfo } from './position-monitor/utils'

export const PYTH_STATE_ID = '0x1f9310238ee9298fb703c3419030b35b22bb1cc37113e3bb5007c99aec79e5b8'
export const WORMHOLE_STATE_ID =
  '0xaeab97f96cf9877fee2883315d459552b2b921edc16d7ceac6eab944dd88919c'

export function updatePriceFeeds(tx: Transaction, info: PriceFeedUpdateInfo) {
  if (info.priceFeedsUpdateData.length !== 1) {
    throw new Error('Expected 1 price feed update data')
  }

  const priceFeedsUpdateData = info.priceFeedsUpdateData[0]

  const vaa = extractVaaBytesFromAccumulatorMessage(priceFeedsUpdateData)

  const [verifiedVaa] = parseAndVerify(tx, {
    state: WORMHOLE_STATE_ID,
    vecU8: Array.from(vaa),
    clock: SUI_CLOCK_OBJECT_ID,
  })

  let priceUpdatesHotPotato
  ;[priceUpdatesHotPotato] = createAuthenticatedPriceInfosUsingAccumulator(tx, {
    pythState: PYTH_STATE_ID,
    accumulatorMessage: Array.from(priceFeedsUpdateData),
    verifiedVaa,
    clock: SUI_CLOCK_OBJECT_ID,
  })

  const coins = tx.splitCoins(
    tx.gas,
    info.priceInfoObjectIds.map(() => info.baseUpdateFee)
  )
  for (let i = 0; i < info.priceInfoObjectIds.length; i++) {
    const pioId = info.priceInfoObjectIds[i]
    const fee = coins[i]
    ;[priceUpdatesHotPotato] = updateSinglePriceFeed(tx, {
      pythState: PYTH_STATE_ID,
      priceUpdates: priceUpdatesHotPotato,
      priceInfoObject: pioId,
      fee,
      clock: SUI_CLOCK_OBJECT_ID,
    })
  }

  destroyHotPotatoVector(tx, PriceInfo.$typeName, priceUpdatesHotPotato)
}

/**
 * Obtains the vaa bytes embedded in an accumulator message.
 * @param accumulatorMessage - the accumulator price update message
 * @returns vaa bytes as a uint8 array
 */
function extractVaaBytesFromAccumulatorMessage(accumulatorMessage: Buffer): Buffer {
  // the first 6 bytes in the accumulator message encode the header, major, and minor bytes
  // we ignore them, since we are only interested in the VAA bytes
  const trailingPayloadSize = accumulatorMessage.readUint8(6)
  const vaaSizeOffset =
    7 + // header bytes (header(4) + major(1) + minor(1) + trailing payload size(1))
    trailingPayloadSize + // trailing payload (variable number of bytes)
    1 // proof_type (1 byte)
  const vaaSize = accumulatorMessage.readUint16BE(vaaSizeOffset)
  const vaaOffset = vaaSizeOffset + 2
  return accumulatorMessage.subarray(vaaOffset, vaaOffset + vaaSize)
}
