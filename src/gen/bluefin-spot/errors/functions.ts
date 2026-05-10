import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'

export function versionMismatch(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::version_mismatch`,
    arguments: [],
  })
}

export function invalidTickRange(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_tick_range`,
    arguments: [],
  })
}

export function insufficientAmount(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::insufficient_amount`,
    arguments: [],
  })
}

export function insufficientCoinBalance(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::insufficient_coin_balance`,
    arguments: [],
  })
}

/** Unused error */
export function insufficientPoolBalance(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::insufficient_pool_balance`,
    arguments: [],
  })
}

/** Unused error */
export function tickScoreOutOfBounds(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::tick_score_out_of_bounds`,
    arguments: [],
  })
}

/** Unused error */
export function swapAmountExceeds(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::swap_amount_exceeds`,
    arguments: [],
  })
}

export function overflow(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::overflow`,
    arguments: [],
  })
}

export function invalidPriceLimit(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_price_limit`,
    arguments: [],
  })
}

export function slippageExceeds(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::slippage_exceeds`,
    arguments: [],
  })
}

export function invalidPool(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_pool`,
    arguments: [],
  })
}

export function poolIsPaused(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::pool_is_paused`,
    arguments: [],
  })
}

export function invalidCoins(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_coins`,
    arguments: [],
  })
}

export function invalidObservationTimestamp(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::errors::invalid_observation_timestamp`,
    arguments: [],
  })
}

export function insufficientLiquidity(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::insufficient_liquidity`,
    arguments: [],
  })
}

export function invalidFeeGrowth(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_fee_growth`,
    arguments: [],
  })
}

export function addCheckFailed(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::add_check_failed`,
    arguments: [],
  })
}

export function nonEmptyPosition(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::non_empty_position`,
    arguments: [],
  })
}

export function positionDoesNotBelongToPool(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::errors::position_does_not_belong_to_pool`,
    arguments: [],
  })
}

export function invalidTimestamp(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_timestamp`,
    arguments: [],
  })
}

export function rewardIndexNotFound(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::reward_index_not_found`,
    arguments: [],
  })
}

export function invalidLastUpdateTime(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_last_update_time`,
    arguments: [],
  })
}

export function notAuthorized(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::not_authorized`,
    arguments: [],
  })
}

export function updateRewardsInfoCheckFailed(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::errors::update_rewards_info_check_failed`,
    arguments: [],
  })
}

export function invalidProtocolFeeShare(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_protocol_fee_share`,
    arguments: [],
  })
}

export function invalidTickSpacing(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_tick_spacing`,
    arguments: [],
  })
}

export function invalidFeeRate(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_fee_rate`,
    arguments: [],
  })
}

export function invalidObservationCardinality(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::errors::invalid_observation_cardinality`,
    arguments: [],
  })
}

export function zeroAmount(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::zero_amount`,
    arguments: [],
  })
}

export function verionCantBeIncreased(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::verion_cant_be_increased`,
    arguments: [],
  })
}

export function invalidPoolPrice(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_pool_price`,
    arguments: [],
  })
}

export function alreadyARewardManger(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::already_a_reward_manger`,
    arguments: [],
  })
}

export function rewardManagerNotFound(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::reward_manager_not_found`,
    arguments: [],
  })
}

export function canNotClaimZeroReward(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::can_not_claim_zero_reward`,
    arguments: [],
  })
}

export function cannotClosePositionWithFeeToClaim(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::errors::cannot_close_position_with_fee_to_claim`,
    arguments: [],
  })
}

export function depricated(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::depricated`,
    arguments: [],
  })
}

export function rewardAmountAndProvidedBalanceDoNotMatch(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::errors::reward_amount_and_provided_balance_do_not_match`,
    arguments: [],
  })
}

export function feeCoinNotSupported(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::fee_coin_not_supported`,
    arguments: [],
  })
}

export function invalidFeeProvided(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::invalid_fee_provided`,
    arguments: [],
  })
}

export function flashSwapInProgress(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::flash_swap_in_progress`,
    arguments: [],
  })
}

export function noFlashSwapInProgress(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::no_flash_swap_in_progress`,
    arguments: [],
  })
}

export function sameValueProvided(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::errors::same_value_provided`,
    arguments: [],
  })
}
