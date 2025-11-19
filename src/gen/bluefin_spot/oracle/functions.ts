import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function initializeManager(tx: Transaction, timestamp: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::initialize_manager`,
    arguments: [pure(tx, timestamp, `u64`)],
  })
}

export function defaultObservation(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::oracle::default_observation`, arguments: [] })
}

export interface ObserveSingleArgs {
  manager: TransactionObjectInput
  timestamp: bigint | TransactionArgument
  secondsAgo: bigint | TransactionArgument
  currentTickIndex: TransactionObjectInput
  liquidity: bigint | TransactionArgument
}

export function observeSingle(tx: Transaction, args: ObserveSingleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::observe_single`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.timestamp, `u64`),
      pure(tx, args.secondsAgo, `u64`),
      obj(tx, args.currentTickIndex),
      pure(tx, args.liquidity, `u128`),
    ],
  })
}

export interface TransformArgs {
  observation: TransactionObjectInput
  timestamp: bigint | TransactionArgument
  currentTickIndex: TransactionObjectInput
  liquidity: bigint | TransactionArgument
}

export function transform(tx: Transaction, args: TransformArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::transform`,
    arguments: [
      obj(tx, args.observation),
      pure(tx, args.timestamp, `u64`),
      obj(tx, args.currentTickIndex),
      pure(tx, args.liquidity, `u128`),
    ],
  })
}

export interface GetSurroundingObservationsArgs {
  manager: TransactionObjectInput
  target: bigint | TransactionArgument
  currentTickIndex: TransactionObjectInput
  liquidity: bigint | TransactionArgument
}

export function getSurroundingObservations(tx: Transaction, args: GetSurroundingObservationsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::get_surrounding_observations`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.target, `u64`),
      obj(tx, args.currentTickIndex),
      pure(tx, args.liquidity, `u128`),
    ],
  })
}

export interface BinarySearchArgs {
  manager: TransactionObjectInput
  timestamp: bigint | TransactionArgument
}

export function binarySearch(tx: Transaction, args: BinarySearchArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::binary_search`,
    arguments: [obj(tx, args.manager), pure(tx, args.timestamp, `u64`)],
  })
}

export interface UpdateArgs {
  manager: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  liquidity: bigint | TransactionArgument
  target: bigint | TransactionArgument
}

export function update(tx: Transaction, args: UpdateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::update`,
    arguments: [
      obj(tx, args.manager),
      obj(tx, args.currentTickIndex),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.target, `u64`),
    ],
  })
}

export interface GrowArgs {
  manager: TransactionObjectInput
  newCardinality: bigint | TransactionArgument
}

export function grow(tx: Transaction, args: GrowArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::grow`,
    arguments: [obj(tx, args.manager), pure(tx, args.newCardinality, `u64`)],
  })
}

export function observationIndex(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::observation_index`,
    arguments: [obj(tx, manager)],
  })
}

export function observationCardinality(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::observation_cardinality`,
    arguments: [obj(tx, manager)],
  })
}

export function observationCardinalityNext(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::observation_cardinality_next`,
    arguments: [obj(tx, manager)],
  })
}

export function observationsLength(tx: Transaction, manager: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::observations_length`,
    arguments: [obj(tx, manager)],
  })
}

export function timestamp(tx: Transaction, observation: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::timestamp`,
    arguments: [obj(tx, observation)],
  })
}

export function tickCumulative(tx: Transaction, observation: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::tick_cumulative`,
    arguments: [obj(tx, observation)],
  })
}

export function secondsPerLiquidityCumulative(
  tx: Transaction,
  observation: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::seconds_per_liquidity_cumulative`,
    arguments: [obj(tx, observation)],
  })
}

export function initialized(tx: Transaction, observation: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::initialized`,
    arguments: [obj(tx, observation)],
  })
}

export interface GetObservationArgs {
  manager: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function getObservation(tx: Transaction, args: GetObservationArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::oracle::get_observation`,
    arguments: [obj(tx, args.manager), pure(tx, args.index, `u64`)],
  })
}
