import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { VAA } from '../../wormhole/vaa/structs'
import { PriceInfo } from '../price-info/structs'

export interface InitPythArgs {
  deployer: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  stalePriceThreshold: bigint | TransactionArgument
  governanceEmitterChainId: bigint | TransactionArgument
  governanceEmitterAddress: Array<number | TransactionArgument> | TransactionArgument
  dataSourcesEmitterChainIds: Array<bigint | TransactionArgument> | TransactionArgument
  dataSourcesEmitterAddresses:
    | Array<Array<number | TransactionArgument> | TransactionArgument>
    | TransactionArgument
  updateFee: bigint | TransactionArgument
}

/** Init state and emit event corresponding to Pyth initialization. */
export function initPyth(
  tx: Transaction,
  args: InitPythArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::init_pyth`,
    arguments: [
      obj(tx, args.deployer),
      obj(tx, args.upgradeCap),
      pure(tx, args.stalePriceThreshold, `u64`),
      pure(tx, args.governanceEmitterChainId, `u64`),
      pure(tx, args.governanceEmitterAddress, `vector<u8>`),
      pure(tx, args.dataSourcesEmitterChainIds, `vector<u64>`),
      pure(tx, args.dataSourcesEmitterAddresses, `vector<vector<u8>>`),
      pure(tx, args.updateFee, `u64`),
    ],
  })
}

export interface ParseDataSourcesArgs {
  emitterChainIds: Array<bigint | TransactionArgument> | TransactionArgument
  emitterAddresses:
    | Array<Array<number | TransactionArgument> | TransactionArgument>
    | TransactionArgument
}

export function parseDataSources(
  tx: Transaction,
  args: ParseDataSourcesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::parse_data_sources`,
    arguments: [
      pure(tx, args.emitterChainIds, `vector<u64>`),
      pure(tx, args.emitterAddresses, `vector<vector<u8>>`),
    ],
  })
}

export interface CreatePriceFeedsUsingAccumulatorArgs {
  pythState: TransactionObjectInput
  accumulatorMessage: Array<number | TransactionArgument> | TransactionArgument
  vaa: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Create and share new price feed objects if they don't already exist using accumulator message. */
export function createPriceFeedsUsingAccumulator(
  tx: Transaction,
  args: CreatePriceFeedsUsingAccumulatorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::create_price_feeds_using_accumulator`,
    arguments: [
      obj(tx, args.pythState),
      pure(tx, args.accumulatorMessage, `vector<u8>`),
      obj(tx, args.vaa),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePriceFeedsArgs {
  pythState: TransactionObjectInput
  verifiedVaas: Array<TransactionObjectInput> | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Create and share new price feed objects if they don't already exist using batch price attestation.
 * The name of the function is kept as is to remain backward compatible
 */
export function createPriceFeeds(
  tx: Transaction,
  args: CreatePriceFeedsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::create_price_feeds`,
    arguments: [
      obj(tx, args.pythState),
      vector(tx, `${VAA.$typeName}`, args.verifiedVaas),
      obj(tx, args.clock),
    ],
  })
}

export interface CreateAndSharePriceFeedsUsingVerifiedPriceInfosArgs {
  latestOnly: TransactionObjectInput
  pythState: TransactionObjectInput
  priceInfos: Array<TransactionObjectInput> | TransactionArgument
}

export function createAndSharePriceFeedsUsingVerifiedPriceInfos(
  tx: Transaction,
  args: CreateAndSharePriceFeedsUsingVerifiedPriceInfosArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('pyth', options?.env)
    }::pyth::create_and_share_price_feeds_using_verified_price_infos`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.pythState),
      vector(tx, `${PriceInfo.$typeName}`, args.priceInfos),
    ],
  })
}

export interface CreateAuthenticatedPriceInfosUsingAccumulatorArgs {
  pythState: TransactionObjectInput
  accumulatorMessage: Array<number | TransactionArgument> | TransactionArgument
  verifiedVaa: TransactionObjectInput
  clock: TransactionObjectInput
}

export function createAuthenticatedPriceInfosUsingAccumulator(
  tx: Transaction,
  args: CreateAuthenticatedPriceInfosUsingAccumulatorArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('pyth', options?.env)
    }::pyth::create_authenticated_price_infos_using_accumulator`,
    arguments: [
      obj(tx, args.pythState),
      pure(tx, args.accumulatorMessage, `vector<u8>`),
      obj(tx, args.verifiedVaa),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePriceInfosHotPotatoArgs {
  pythState: TransactionObjectInput
  verifiedVaas: Array<TransactionObjectInput> | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Creates authenticated price infos using batch price attestation
 * Name is kept as is to remain backward compatible
 */
export function createPriceInfosHotPotato(
  tx: Transaction,
  args: CreatePriceInfosHotPotatoArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::create_price_infos_hot_potato`,
    arguments: [
      obj(tx, args.pythState),
      vector(tx, `${VAA.$typeName}`, args.verifiedVaas),
      obj(tx, args.clock),
    ],
  })
}

export interface UpdateSinglePriceFeedArgs {
  pythState: TransactionObjectInput
  priceUpdates: TransactionObjectInput
  priceInfoObject: TransactionObjectInput
  fee: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Update a singular Pyth PriceInfoObject (containing a price feed) with the
 * price data in the authenticated price infos vector (a vector of PriceInfo objects).
 *
 * For more information on the end-to-end process for updating a price feed, please see the README.
 *
 * The given fee must contain a sufficient number of coins to pay the update fee for the given vaas.
 * The update fee amount can be queried by calling get_update_fee(&vaas).
 *
 * Please read more information about the update fee here: https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand#fees
 */
export function updateSinglePriceFeed(
  tx: Transaction,
  args: UpdateSinglePriceFeedArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::update_single_price_feed`,
    arguments: [
      obj(tx, args.pythState),
      obj(tx, args.priceUpdates),
      obj(tx, args.priceInfoObject),
      obj(tx, args.fee),
      obj(tx, args.clock),
    ],
  })
}

export interface HasSamePriceIdentifierArgs {
  priceInfo: TransactionObjectInput
  priceInfoObject: TransactionObjectInput
}

export function hasSamePriceIdentifier(
  tx: Transaction,
  args: HasSamePriceIdentifierArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::has_same_price_identifier`,
    arguments: [
      obj(tx, args.priceInfo),
      obj(tx, args.priceInfoObject),
    ],
  })
}

export interface UpdateCacheArgs {
  latestOnly: TransactionObjectInput
  update: TransactionObjectInput
  priceInfoObject: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Update PriceInfoObject with updated data from a PriceInfo */
export function updateCache(
  tx: Transaction,
  args: UpdateCacheArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::update_cache`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.update),
      obj(tx, args.priceInfoObject),
      obj(tx, args.clock),
    ],
  })
}

export interface IsFreshUpdateArgs {
  update: TransactionObjectInput
  priceInfoObject: TransactionObjectInput
}

/**
 * Determine if the given price update is "fresh": we have nothing newer already cached for that
 * price feed within a PriceInfoObject.
 */
export function isFreshUpdate(
  tx: Transaction,
  args: IsFreshUpdateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::is_fresh_update`,
    arguments: [
      obj(tx, args.update),
      obj(tx, args.priceInfoObject),
    ],
  })
}

export interface PriceFeedExistsArgs {
  state: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
}

/** Determine if a price feed for the given price_identifier exists */
export function priceFeedExists(
  tx: Transaction,
  args: PriceFeedExistsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::price_feed_exists`,
    arguments: [
      obj(tx, args.state),
      obj(tx, args.priceIdentifier),
    ],
  })
}

export interface GetPriceArgs {
  state: TransactionObjectInput
  priceInfoObject: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Get the latest available price cached for the given price identifier, if that price is
 * no older than the stale price threshold.
 *
 * Please refer to the documentation at https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices for
 * how to how this price safely.
 *
 * Important: Pyth uses an on-demand update model, where consumers need to update the
 * cached prices before using them. Please read more about this at https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand.
 * get_price() is likely to abort unless you call update_price_feeds() to update the cached price
 * beforehand, as the cached prices may be older than the stale price threshold.
 *
 * The price_info_object is a Sui object with the key ability that uniquely
 * contains a price feed for a given price_identifier.
 */
export function getPrice(
  tx: Transaction,
  args: GetPriceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::get_price`,
    arguments: [
      obj(tx, args.state),
      obj(tx, args.priceInfoObject),
      obj(tx, args.clock),
    ],
  })
}

export interface GetPriceNoOlderThanArgs {
  priceInfoObject: TransactionObjectInput
  clock: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
}

/**
 * Get the latest available price cached for the given price identifier, if that price is
 * no older than the given age.
 */
export function getPriceNoOlderThan(
  tx: Transaction,
  args: GetPriceNoOlderThanArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::get_price_no_older_than`,
    arguments: [
      obj(tx, args.priceInfoObject),
      obj(tx, args.clock),
      pure(tx, args.maxAgeSecs, `u64`),
    ],
  })
}

/**
 * Get the latest available price cached for the given price identifier.
 *
 * WARNING: the returned price can be from arbitrarily far in the past.
 * This function makes no guarantees that the returned price is recent or
 * useful for any particular application. Users of this function should check
 * the returned timestamp to ensure that the returned price is sufficiently
 * recent for their application. The checked get_price_no_older_than()
 * function should be used in preference to this.
 */
export function getPriceUnsafe(
  tx: Transaction,
  priceInfoObject: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::get_price_unsafe`,
    arguments: [obj(tx, priceInfoObject)],
  })
}

export interface AbsDiffArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

export function absDiff(
  tx: Transaction,
  args: AbsDiffArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::abs_diff`,
    arguments: [
      pure(tx, args.x, `u64`),
      pure(tx, args.y, `u64`),
    ],
  })
}

/**
 * Get the stale price threshold: the amount of time after which a cached price
 * is considered stale and no longer returned by get_price()/get_ema_price().
 */
export function getStalePriceThresholdSecs(
  tx: Transaction,
  state: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::get_stale_price_threshold_secs`,
    arguments: [obj(tx, state)],
  })
}

export interface CheckPriceIsFreshArgs {
  price: TransactionObjectInput
  clock: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
}

export function checkPriceIsFresh(
  tx: Transaction,
  args: CheckPriceIsFreshArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::check_price_is_fresh`,
    arguments: [
      obj(tx, args.price),
      obj(tx, args.clock),
      pure(tx, args.maxAgeSecs, `u64`),
    ],
  })
}

export interface GetTotalUpdateFeeArgs {
  pythState: TransactionObjectInput
  n: bigint | TransactionArgument
}

/** Please read more information about the update fee here: https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand#fees */
export function getTotalUpdateFee(
  tx: Transaction,
  args: GetTotalUpdateFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::pyth::get_total_update_fee`,
    arguments: [
      obj(tx, args.pythState),
      pure(tx, args.n, `u64`),
    ],
  })
}
