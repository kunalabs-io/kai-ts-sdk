import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'

export function protocolFeeShare(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::protocol_fee_share`,
    arguments: [],
  })
}

export function maxProtocolFeeShare(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_protocol_fee_share`,
    arguments: [],
  })
}

export function maxAllowedFeeRate(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_allowed_fee_rate`,
    arguments: [],
  })
}

export function maxAllowedTickSpacing(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_allowed_tick_spacing`,
    arguments: [],
  })
}

export function maxObservationCardinality(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_observation_cardinality`,
    arguments: [],
  })
}

export function q64(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::q64`,
    arguments: [],
  })
}

export function maxU8(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_u8`,
    arguments: [],
  })
}

export function maxU16(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_u16`,
    arguments: [],
  })
}

export function maxU32(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_u32`,
    arguments: [],
  })
}

export function maxU64(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_u64`,
    arguments: [],
  })
}

export function maxU128(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_u128`,
    arguments: [],
  })
}

export function maxU256(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::max_u256`,
    arguments: [],
  })
}

export function manager(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::manager`,
    arguments: [],
  })
}

export function blueRewardType(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::blue_reward_type`,
    arguments: [],
  })
}

export function poolCreationFeeDynamicKey(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::pool_creation_fee_dynamic_key`,
    arguments: [],
  })
}

export function flashSwapInProgressKey(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::constants::flash_swap_in_progress_key`,
    arguments: [],
  })
}
