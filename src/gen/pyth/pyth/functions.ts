import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { VAA } from '../../wormhole/vaa/structs'
import { PriceInfo } from '../price-info/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

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

export function initPyth(tx: Transaction, args: InitPythArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::init_pyth`,
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

export function parseDataSources(tx: Transaction, args: ParseDataSourcesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::parse_data_sources`,
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

export function createPriceFeedsUsingAccumulator(
  tx: Transaction,
  args: CreatePriceFeedsUsingAccumulatorArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::create_price_feeds_using_accumulator`,
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

export function createPriceFeeds(tx: Transaction, args: CreatePriceFeedsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::create_price_feeds`,
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
  args: CreateAndSharePriceFeedsUsingVerifiedPriceInfosArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::create_and_share_price_feeds_using_verified_price_infos`,
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
  args: CreateAuthenticatedPriceInfosUsingAccumulatorArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::create_authenticated_price_infos_using_accumulator`,
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

export function createPriceInfosHotPotato(tx: Transaction, args: CreatePriceInfosHotPotatoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::create_price_infos_hot_potato`,
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

export function updateSinglePriceFeed(tx: Transaction, args: UpdateSinglePriceFeedArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::update_single_price_feed`,
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

export function hasSamePriceIdentifier(tx: Transaction, args: HasSamePriceIdentifierArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::has_same_price_identifier`,
    arguments: [obj(tx, args.priceInfo), obj(tx, args.priceInfoObject)],
  })
}

export interface UpdateCacheArgs {
  latestOnly: TransactionObjectInput
  update: TransactionObjectInput
  priceInfoObject: TransactionObjectInput
  clock: TransactionObjectInput
}

export function updateCache(tx: Transaction, args: UpdateCacheArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::update_cache`,
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

export function isFreshUpdate(tx: Transaction, args: IsFreshUpdateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::is_fresh_update`,
    arguments: [obj(tx, args.update), obj(tx, args.priceInfoObject)],
  })
}

export interface PriceFeedExistsArgs {
  state: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
}

export function priceFeedExists(tx: Transaction, args: PriceFeedExistsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::price_feed_exists`,
    arguments: [obj(tx, args.state), obj(tx, args.priceIdentifier)],
  })
}

export interface GetPriceArgs {
  state: TransactionObjectInput
  priceInfoObject: TransactionObjectInput
  clock: TransactionObjectInput
}

export function getPrice(tx: Transaction, args: GetPriceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_price`,
    arguments: [obj(tx, args.state), obj(tx, args.priceInfoObject), obj(tx, args.clock)],
  })
}

export interface GetPriceNoOlderThanArgs {
  priceInfoObject: TransactionObjectInput
  clock: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
}

export function getPriceNoOlderThan(tx: Transaction, args: GetPriceNoOlderThanArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_price_no_older_than`,
    arguments: [
      obj(tx, args.priceInfoObject),
      obj(tx, args.clock),
      pure(tx, args.maxAgeSecs, `u64`),
    ],
  })
}

export function getPriceUnsafe(tx: Transaction, priceInfoObject: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_price_unsafe`,
    arguments: [obj(tx, priceInfoObject)],
  })
}

export interface AbsDiffArgs {
  x: bigint | TransactionArgument
  y: bigint | TransactionArgument
}

export function absDiff(tx: Transaction, args: AbsDiffArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::abs_diff`,
    arguments: [pure(tx, args.x, `u64`), pure(tx, args.y, `u64`)],
  })
}

export function getStalePriceThresholdSecs(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_stale_price_threshold_secs`,
    arguments: [obj(tx, state)],
  })
}

export interface CheckPriceIsFreshArgs {
  price: TransactionObjectInput
  clock: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
}

export function checkPriceIsFresh(tx: Transaction, args: CheckPriceIsFreshArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::check_price_is_fresh`,
    arguments: [obj(tx, args.price), obj(tx, args.clock), pure(tx, args.maxAgeSecs, `u64`)],
  })
}

export interface GetTotalUpdateFeeArgs {
  pythState: TransactionObjectInput
  n: bigint | TransactionArgument
}

export function getTotalUpdateFee(tx: Transaction, args: GetTotalUpdateFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_total_update_fee`,
    arguments: [obj(tx, args.pythState), pure(tx, args.n, `u64`)],
  })
}
