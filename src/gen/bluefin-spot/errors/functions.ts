import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'

export function versionMismatch(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::version_mismatch`,
    arguments: [],
  })
}

export function invalidTickRange(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_tick_range`,
    arguments: [],
  })
}

export function insufficientAmount(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::insufficient_amount`,
    arguments: [],
  })
}

export function insufficientCoinBalance(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::insufficient_coin_balance`,
    arguments: [],
  })
}

/** Unused error */
export function insufficientPoolBalance(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::insufficient_pool_balance`,
    arguments: [],
  })
}

/** Unused error */
export function tickScoreOutOfBounds(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::tick_score_out_of_bounds`,
    arguments: [],
  })
}

/** Unused error */
export function swapAmountExceeds(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::swap_amount_exceeds`,
    arguments: [],
  })
}

export function overflow(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::overflow`,
    arguments: [],
  })
}

export function invalidPriceLimit(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_price_limit`,
    arguments: [],
  })
}

export function slippageExceeds(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::slippage_exceeds`,
    arguments: [],
  })
}

export function invalidPool(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_pool`,
    arguments: [],
  })
}

export function poolIsPaused(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::pool_is_paused`,
    arguments: [],
  })
}

export function invalidCoins(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_coins`,
    arguments: [],
  })
}

export function invalidObservationTimestamp(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_observation_timestamp`,
    arguments: [],
  })
}

export function insufficientLiquidity(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::insufficient_liquidity`,
    arguments: [],
  })
}

export function invalidFeeGrowth(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_fee_growth`,
    arguments: [],
  })
}

export function addCheckFailed(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::add_check_failed`,
    arguments: [],
  })
}

export function nonEmptyPosition(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::non_empty_position`,
    arguments: [],
  })
}

export function positionDoesNotBelongToPool(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::position_does_not_belong_to_pool`,
    arguments: [],
  })
}

export function invalidTimestamp(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_timestamp`,
    arguments: [],
  })
}

export function rewardIndexNotFound(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::reward_index_not_found`,
    arguments: [],
  })
}

export function invalidLastUpdateTime(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_last_update_time`,
    arguments: [],
  })
}

export function notAuthorized(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::not_authorized`,
    arguments: [],
  })
}

export function updateRewardsInfoCheckFailed(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::update_rewards_info_check_failed`,
    arguments: [],
  })
}

export function invalidProtocolFeeShare(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_protocol_fee_share`,
    arguments: [],
  })
}

export function invalidTickSpacing(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_tick_spacing`,
    arguments: [],
  })
}

export function invalidFeeRate(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_fee_rate`,
    arguments: [],
  })
}

export function invalidObservationCardinality(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_observation_cardinality`,
    arguments: [],
  })
}

export function zeroAmount(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::zero_amount`,
    arguments: [],
  })
}

export function verionCantBeIncreased(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::verion_cant_be_increased`,
    arguments: [],
  })
}

export function invalidPoolPrice(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_pool_price`,
    arguments: [],
  })
}

export function alreadyARewardManger(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::already_a_reward_manger`,
    arguments: [],
  })
}

export function rewardManagerNotFound(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::reward_manager_not_found`,
    arguments: [],
  })
}

export function canNotClaimZeroReward(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::can_not_claim_zero_reward`,
    arguments: [],
  })
}

export function cannotClosePositionWithFeeToClaim(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::cannot_close_position_with_fee_to_claim`,
    arguments: [],
  })
}

export function depricated(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::depricated`,
    arguments: [],
  })
}

export function rewardAmountAndProvidedBalanceDoNotMatch(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot')
    }::errors::reward_amount_and_provided_balance_do_not_match`,
    arguments: [],
  })
}

export function feeCoinNotSupported(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::fee_coin_not_supported`,
    arguments: [],
  })
}

export function invalidFeeProvided(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::invalid_fee_provided`,
    arguments: [],
  })
}

export function flashSwapInProgress(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::flash_swap_in_progress`,
    arguments: [],
  })
}

export function noFlashSwapInProgress(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::no_flash_swap_in_progress`,
    arguments: [],
  })
}

export function sameValueProvided(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::errors::same_value_provided`,
    arguments: [],
  })
}
