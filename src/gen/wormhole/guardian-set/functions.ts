import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { Guardian } from '../guardian/structs'

export interface NewArgs {
  index: number | TransactionArgument
  guardians: Array<TransactionObjectInput> | TransactionArgument
}

/** Create new `GuardianSet`. */
export function new_(tx: Transaction, args: NewArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::new`,
    arguments: [
      pure(tx, args.index, `u32`),
      vector(tx, `${Guardian.$typeName}`, args.guardians),
    ],
  })
}

/** Retrieve the Guardian set index. */
export function index(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::index`,
    arguments: [obj(tx, self)],
  })
}

/**
 * Retrieve the Guardian set index as `u64` (for convenience when used to
 * compare to indices for iterations, which are natively `u64`).
 */
export function indexAsU64(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::index_as_u64`,
    arguments: [obj(tx, self)],
  })
}

/** Retrieve list of Guardians. */
export function guardians(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::guardians`,
    arguments: [obj(tx, self)],
  })
}

export interface GuardianAtArgs {
  self: TransactionObjectInput
  index: bigint | TransactionArgument
}

/** Retrieve specific Guardian by index (in the array representing the set). */
export function guardianAt(tx: Transaction, args: GuardianAtArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::guardian_at`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.index, `u64`),
    ],
  })
}

/** Retrieve when the Guardian set is no longer active. */
export function expirationTimestampMs(
  tx: Transaction,
  self: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::expiration_timestamp_ms`,
    arguments: [obj(tx, self)],
  })
}

export interface IsActiveArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Retrieve whether this Guardian set is still active by checking the
 * current time.
 */
export function isActive(tx: Transaction, args: IsActiveArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::is_active`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.clock),
    ],
  })
}

/** Retrieve how many guardians exist in the Guardian set. */
export function numGuardians(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::num_guardians`,
    arguments: [obj(tx, self)],
  })
}

/** Returns the minimum number of signatures required for a VAA to be valid. */
export function quorum(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::quorum`,
    arguments: [obj(tx, self)],
  })
}

export interface SetExpirationArgs {
  self: TransactionObjectInput
  secondsToLive: number | TransactionArgument
  theClock: TransactionObjectInput
}

/**
 * Configure this Guardian set to expire from some amount of time based on
 * what time it is right now.
 *
 * NOTE: `time_to_live` is in units of seconds while `Clock` uses
 * milliseconds.
 */
export function setExpiration(tx: Transaction, args: SetExpirationArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_set::set_expiration`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.secondsToLive, `u32`),
      obj(tx, args.theClock),
    ],
  })
}
