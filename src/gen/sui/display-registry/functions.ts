import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { String } from '../../std/string/structs'

export interface NewArgs {
  registry: TransactionObjectInput
  permit: TransactionObjectInput
}

/**
 * Create a new Display object for a given type `T` using `internal::Permit` to
 * prove type ownership.
 */
export function new_(
  tx: Transaction,
  typeArg: string,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::new`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      obj(tx, args.permit),
    ],
  })
}

export interface NewWithPublisherArgs {
  registry: TransactionObjectInput
  publisher: TransactionObjectInput
}

/** Create a new display object using the `Publisher` object. */
export function newWithPublisher(
  tx: Transaction,
  typeArg: string,
  args: NewWithPublisherArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::new_with_publisher`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      obj(tx, args.publisher),
    ],
  })
}

export interface UnsetArgs {
  display: TransactionObjectInput
  displayCap: TransactionObjectInput
  name: string | TransactionArgument
}

/** Unset a key from display. */
export function unset(
  tx: Transaction,
  typeArg: string,
  args: UnsetArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::unset`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.display),
      obj(tx, args.displayCap),
      pure(tx, args.name, `${String.$typeName}`),
    ],
  })
}

export interface SetArgs {
  display: TransactionObjectInput
  displayCap: TransactionObjectInput
  name: string | TransactionArgument
  value: string | TransactionArgument
}

/** Set a value for the specified key, replaces existing value if it exists. */
export function set(
  tx: Transaction,
  typeArg: string,
  args: SetArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::set`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.display),
      obj(tx, args.displayCap),
      pure(tx, args.name, `${String.$typeName}`),
      pure(tx, args.value, `${String.$typeName}`),
    ],
  })
}

export interface ClearArgs {
  display: TransactionObjectInput
  displayCap: TransactionObjectInput
}

/** Clear the display vec_map, allowing a fresh re-creation of fields */
export function clear(
  tx: Transaction,
  typeArg: string,
  args: ClearArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::clear`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.display),
      obj(tx, args.displayCap),
    ],
  })
}

/** Share the `Display` object to finalize the creation. */
export function share(
  tx: Transaction,
  typeArg: string,
  display: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::share`,
    typeArguments: [typeArg],
    arguments: [obj(tx, display)],
  })
}

export interface ClaimArgs {
  display: TransactionObjectInput
  legacy: TransactionObjectInput
}

/** Allow a legacy Display holder to claim the capability object. */
export function claim(
  tx: Transaction,
  typeArg: string,
  args: ClaimArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::claim`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.display),
      obj(tx, args.legacy),
    ],
  })
}

export interface ClaimWithPublisherArgs {
  display: TransactionObjectInput
  publisher: TransactionObjectInput
}

/** Allow claiming a new display using `Publisher` as proof of ownership. */
export function claimWithPublisher(
  tx: Transaction,
  typeArg: string,
  args: ClaimWithPublisherArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::claim_with_publisher`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.display),
      obj(tx, args.publisher),
    ],
  })
}

export interface SystemMigrationArgs {
  registry: TransactionObjectInput
  systemMigrationCap: TransactionObjectInput
  keys: Array<string | TransactionArgument> | TransactionArgument
  values: Array<string | TransactionArgument> | TransactionArgument
}

/**
 * Allow the `SystemMigrationCap` holder to create display objects with supplied
 * values. The migration is performed once on launch of the DisplayRegistry,
 * further migrations will have to be performed for each object, and will only
 * be possible until legacy `display` methods are finally deprecated.
 */
export function systemMigration(
  tx: Transaction,
  typeArg: string,
  args: SystemMigrationArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::system_migration`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      obj(tx, args.systemMigrationCap),
      pure(tx, args.keys, `vector<${String.$typeName}>`),
      pure(tx, args.values, `vector<${String.$typeName}>`),
    ],
  })
}

export interface MigrateV1ToV2Args {
  registry: TransactionObjectInput
  legacy: TransactionObjectInput
}

/**
 * Enables migrating legacy display into the new one,
 * if a new one has not yet been created.
 */
export function migrateV1ToV2(
  tx: Transaction,
  typeArg: string,
  args: MigrateV1ToV2Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::migrate_v1_to_v2`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      obj(tx, args.legacy),
    ],
  })
}

/** Destroy the `SystemMigrationCap` after successfully migrating all V1 instances. */
export function destroySystemMigrationCap(
  tx: Transaction,
  cap: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('sui', options?.env)
    }::display_registry::destroy_system_migration_cap`,
    arguments: [obj(tx, cap)],
  })
}

export interface TransferMigrationCapArgs {
  cap: TransactionObjectInput
  recipient: string | TransactionArgument
}

export function transferMigrationCap(
  tx: Transaction,
  args: TransferMigrationCapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::transfer_migration_cap`,
    arguments: [
      obj(tx, args.cap),
      pure(tx, args.recipient, `address`),
    ],
  })
}

export interface DeleteLegacyArgs {
  display: TransactionObjectInput
  legacy: TransactionObjectInput
}

/** Allow deleting legacy display objects, as long as the cap has been claimed first. */
export function deleteLegacy(
  tx: Transaction,
  typeArg: string,
  args: DeleteLegacyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::delete_legacy`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.display),
      obj(tx, args.legacy),
    ],
  })
}

/** Get a reference to the fields of display. */
export function fields(
  tx: Transaction,
  typeArg: string,
  display: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::fields`,
    typeArguments: [typeArg],
    arguments: [obj(tx, display)],
  })
}

/** Get the cap ID for the display. */
export function capId(
  tx: Transaction,
  typeArg: string,
  display: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::cap_id`,
    typeArguments: [typeArg],
    arguments: [obj(tx, display)],
  })
}

export function migrationCapReceiver(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::migration_cap_receiver`,
    arguments: [],
  })
}

export function newDisplay(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::new_display`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

/** Create a new display registry object callable only from 0x0 (end of epoch) */
export function create(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::display_registry::create`,
    arguments: [],
  })
}
