import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { Guardian } from '../guardian/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  index: number | TransactionArgument
  guardians: Array<TransactionObjectInput> | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::new`,
    arguments: [pure(tx, args.index, `u32`), vector(tx, `${Guardian.$typeName}`, args.guardians)],
  })
}

export function index(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::guardian_set::index`, arguments: [obj(tx, self)] })
}

export function indexAsU64(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::index_as_u64`,
    arguments: [obj(tx, self)],
  })
}

export function guardians(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::guardians`,
    arguments: [obj(tx, self)],
  })
}

export interface GuardianAtArgs {
  self: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function guardianAt(tx: Transaction, args: GuardianAtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::guardian_at`,
    arguments: [obj(tx, args.self), pure(tx, args.index, `u64`)],
  })
}

export function expirationTimestampMs(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::expiration_timestamp_ms`,
    arguments: [obj(tx, self)],
  })
}

export interface IsActiveArgs {
  self: TransactionObjectInput
  clock: TransactionObjectInput
}

export function isActive(tx: Transaction, args: IsActiveArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::is_active`,
    arguments: [obj(tx, args.self), obj(tx, args.clock)],
  })
}

export function numGuardians(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::num_guardians`,
    arguments: [obj(tx, self)],
  })
}

export function quorum(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::quorum`,
    arguments: [obj(tx, self)],
  })
}

export interface SetExpirationArgs {
  self: TransactionObjectInput
  secondsToLive: number | TransactionArgument
  theClock: TransactionObjectInput
}

export function setExpiration(tx: Transaction, args: SetExpirationArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::set_expiration`,
    arguments: [obj(tx, args.self), pure(tx, args.secondsToLive, `u32`), obj(tx, args.theClock)],
  })
}
