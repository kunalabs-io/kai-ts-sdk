import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Creates an Observation Manager */
export function initializeManager(
  tx: Transaction,
  timestamp: bigint | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::initialize_manager`,
    arguments: [pure(tx, timestamp, `u64`)],
  })
}

/** Creates a new observation */
export function defaultObservation(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::default_observation`,
    arguments: [],
  })
}

export interface ObserveSingleArgs {
  manager: TransactionObjectInput
  timestamp: bigint | TransactionArgument
  secondsAgo: bigint | TransactionArgument
  currentTickIndex: TransactionObjectInput
  liquidity: bigint | TransactionArgument
}

export function observeSingle(tx: Transaction, args: ObserveSingleArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::observe_single`,
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

export function transform(tx: Transaction, args: TransformArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::transform`,
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

export function getSurroundingObservations(
  tx: Transaction,
  args: GetSurroundingObservationsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::get_surrounding_observations`,
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

export function binarySearch(tx: Transaction, args: BinarySearchArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::binary_search`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.timestamp, `u64`),
    ],
  })
}

export interface UpdateArgs {
  manager: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  liquidity: bigint | TransactionArgument
  target: bigint | TransactionArgument
}

export function update(tx: Transaction, args: UpdateArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::update`,
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

export function grow(tx: Transaction, args: GrowArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::grow`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.newCardinality, `u64`),
    ],
  })
}

export function observationIndex(
  tx: Transaction,
  manager: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::observation_index`,
    arguments: [obj(tx, manager)],
  })
}

export function observationCardinality(
  tx: Transaction,
  manager: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::observation_cardinality`,
    arguments: [obj(tx, manager)],
  })
}

export function observationCardinalityNext(
  tx: Transaction,
  manager: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::observation_cardinality_next`,
    arguments: [obj(tx, manager)],
  })
}

export function observationsLength(
  tx: Transaction,
  manager: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::observations_length`,
    arguments: [obj(tx, manager)],
  })
}

export function timestamp(tx: Transaction, observation: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::timestamp`,
    arguments: [obj(tx, observation)],
  })
}

export function tickCumulative(
  tx: Transaction,
  observation: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::tick_cumulative`,
    arguments: [obj(tx, observation)],
  })
}

export function secondsPerLiquidityCumulative(
  tx: Transaction,
  observation: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::seconds_per_liquidity_cumulative`,
    arguments: [obj(tx, observation)],
  })
}

export function initialized(
  tx: Transaction,
  observation: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::initialized`,
    arguments: [obj(tx, observation)],
  })
}

export interface GetObservationArgs {
  manager: TransactionObjectInput
  index: bigint | TransactionArgument
}

/** Gets the observation at provided index. If index out of bound, creates one */
export function getObservation(tx: Transaction, args: GetObservationArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::oracle::get_observation`,
    arguments: [
      obj(tx, args.manager),
      pure(tx, args.index, `u64`),
    ],
  })
}
