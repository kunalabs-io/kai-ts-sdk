import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { Guardian } from '../guardian/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  u32: number | TransactionArgument
  vecGuardian: Array<TransactionObjectInput> | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::new`,
    arguments: [pure(tx, args.u32, `u32`), vector(tx, `${Guardian.$typeName}`, args.vecGuardian)],
  })
}

export function index(tx: Transaction, guardianSet: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::index`,
    arguments: [obj(tx, guardianSet)],
  })
}

export function indexAsU64(tx: Transaction, guardianSet: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::index_as_u64`,
    arguments: [obj(tx, guardianSet)],
  })
}

export function guardians(tx: Transaction, guardianSet: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::guardians`,
    arguments: [obj(tx, guardianSet)],
  })
}

export interface GuardianAtArgs {
  guardianSet: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function guardianAt(tx: Transaction, args: GuardianAtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::guardian_at`,
    arguments: [obj(tx, args.guardianSet), pure(tx, args.u64, `u64`)],
  })
}

export function expirationTimestampMs(tx: Transaction, guardianSet: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::expiration_timestamp_ms`,
    arguments: [obj(tx, guardianSet)],
  })
}

export interface IsActiveArgs {
  guardianSet: TransactionObjectInput
  clock: TransactionObjectInput
}

export function isActive(tx: Transaction, args: IsActiveArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::is_active`,
    arguments: [obj(tx, args.guardianSet), obj(tx, args.clock)],
  })
}

export function numGuardians(tx: Transaction, guardianSet: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::num_guardians`,
    arguments: [obj(tx, guardianSet)],
  })
}

export function quorum(tx: Transaction, guardianSet: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::quorum`,
    arguments: [obj(tx, guardianSet)],
  })
}

export interface SetExpirationArgs {
  guardianSet: TransactionObjectInput
  u32: number | TransactionArgument
  clock: TransactionObjectInput
}

export function setExpiration(tx: Transaction, args: SetExpirationArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::guardian_set::set_expiration`,
    arguments: [obj(tx, args.guardianSet), pure(tx, args.u32, `u32`), obj(tx, args.clock)],
  })
}
