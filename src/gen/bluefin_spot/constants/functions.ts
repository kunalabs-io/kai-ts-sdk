import { PUBLISHED_AT } from '..'
import { Transaction } from '@mysten/sui/transactions'

export function protocolFeeShare(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::protocol_fee_share`, arguments: [] })
}

export function maxProtocolFeeShare(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::constants::max_protocol_fee_share`,
    arguments: [],
  })
}

export function maxAllowedFeeRate(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::max_allowed_fee_rate`, arguments: [] })
}

export function maxAllowedTickSpacing(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::constants::max_allowed_tick_spacing`,
    arguments: [],
  })
}

export function maxObservationCardinality(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::constants::max_observation_cardinality`,
    arguments: [],
  })
}

export function q64(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::q64`, arguments: [] })
}

export function maxU8(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::max_u8`, arguments: [] })
}

export function maxU16(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::max_u16`, arguments: [] })
}

export function maxU32(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::max_u32`, arguments: [] })
}

export function maxU64(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::max_u64`, arguments: [] })
}

export function maxU128(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::max_u128`, arguments: [] })
}

export function maxU256(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::max_u256`, arguments: [] })
}

export function manager(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::manager`, arguments: [] })
}

export function blueRewardType(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::constants::blue_reward_type`, arguments: [] })
}

export function poolCreationFeeDynamicKey(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::constants::pool_creation_fee_dynamic_key`,
    arguments: [],
  })
}

export function flashSwapInProgressKey(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::constants::flash_swap_in_progress_key`,
    arguments: [],
  })
}
