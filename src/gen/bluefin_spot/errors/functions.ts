import { PUBLISHED_AT } from '..'
import { Transaction } from '@mysten/sui/transactions'

export function versionMismatch(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::version_mismatch`, arguments: [] })
}

export function invalidTickRange(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_tick_range`, arguments: [] })
}

export function insufficientAmount(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::insufficient_amount`, arguments: [] })
}

export function insufficientCoinBalance(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::insufficient_coin_balance`,
    arguments: [],
  })
}

export function insufficientPoolBalance(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::insufficient_pool_balance`,
    arguments: [],
  })
}

export function tickScoreOutOfBounds(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::tick_score_out_of_bounds`, arguments: [] })
}

export function swapAmountExceeds(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::swap_amount_exceeds`, arguments: [] })
}

export function overflow(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::overflow`, arguments: [] })
}

export function invalidPriceLimit(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_price_limit`, arguments: [] })
}

export function slippageExceeds(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::slippage_exceeds`, arguments: [] })
}

export function invalidPool(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_pool`, arguments: [] })
}

export function poolIsPaused(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::pool_is_paused`, arguments: [] })
}

export function invalidCoins(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_coins`, arguments: [] })
}

export function invalidObservationTimestamp(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::invalid_observation_timestamp`,
    arguments: [],
  })
}

export function insufficientLiquidity(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::insufficient_liquidity`, arguments: [] })
}

export function invalidFeeGrowth(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_fee_growth`, arguments: [] })
}

export function addCheckFailed(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::add_check_failed`, arguments: [] })
}

export function nonEmptyPosition(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::non_empty_position`, arguments: [] })
}

export function positionDoesNotBelongToPool(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::position_does_not_belong_to_pool`,
    arguments: [],
  })
}

export function invalidTimestamp(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_timestamp`, arguments: [] })
}

export function rewardIndexNotFound(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::reward_index_not_found`, arguments: [] })
}

export function invalidLastUpdateTime(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_last_update_time`, arguments: [] })
}

export function notAuthorized(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::not_authorized`, arguments: [] })
}

export function updateRewardsInfoCheckFailed(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::update_rewards_info_check_failed`,
    arguments: [],
  })
}

export function invalidProtocolFeeShare(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::invalid_protocol_fee_share`,
    arguments: [],
  })
}

export function invalidTickSpacing(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_tick_spacing`, arguments: [] })
}

export function invalidFeeRate(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_fee_rate`, arguments: [] })
}

export function invalidObservationCardinality(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::invalid_observation_cardinality`,
    arguments: [],
  })
}

export function zeroAmount(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::zero_amount`, arguments: [] })
}

export function verionCantBeIncreased(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::verion_cant_be_increased`, arguments: [] })
}

export function invalidPoolPrice(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_pool_price`, arguments: [] })
}

export function alreadyARewardManger(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::already_a_reward_manger`, arguments: [] })
}

export function rewardManagerNotFound(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::reward_manager_not_found`, arguments: [] })
}

export function canNotClaimZeroReward(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::can_not_claim_zero_reward`,
    arguments: [],
  })
}

export function cannotClosePositionWithFeeToClaim(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::cannot_close_position_with_fee_to_claim`,
    arguments: [],
  })
}

export function depricated(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::depricated`, arguments: [] })
}

export function rewardAmountAndProvidedBalanceDoNotMatch(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::reward_amount_and_provided_balance_do_not_match`,
    arguments: [],
  })
}

export function feeCoinNotSupported(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::fee_coin_not_supported`, arguments: [] })
}

export function invalidFeeProvided(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::invalid_fee_provided`, arguments: [] })
}

export function flashSwapInProgress(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::flash_swap_in_progress`, arguments: [] })
}

export function noFlashSwapInProgress(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::errors::no_flash_swap_in_progress`,
    arguments: [],
  })
}

export function sameValueProvided(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::errors::same_value_provided`, arguments: [] })
}
