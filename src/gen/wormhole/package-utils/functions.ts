import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, pure } from '../../_framework/util'

/**
 * Retrieve current package ID, which should be the only one that anyone is
 * allowed to interact with.
 */
export function currentPackage(tx: Transaction, id: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::current_package`,
    arguments: [obj(tx, id)],
  })
}

/** Retrieve the build digest reflecting the current build. */
export function currentDigest(tx: Transaction, id: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::current_digest`,
    arguments: [obj(tx, id)],
  })
}

/**
 * Retrieve the upgraded package ID, which was taken from `UpgradeCap`
 * during `commit_upgrade`.
 */
export function committedPackage(tx: Transaction, id: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::committed_package`,
    arguments: [obj(tx, id)],
  })
}

/**
 * Retrieve the build digest of the latest upgrade, which was the same
 * digest used when `authorize_upgrade` is called.
 */
export function authorizedDigest(tx: Transaction, id: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::authorized_digest`,
    arguments: [obj(tx, id)],
  })
}

export interface AssertPackageUpgradeCapArgs {
  cap: TransactionObjectInput
  expectedPolicy: number | TransactionArgument
  expectedVersion: bigint | TransactionArgument
}

/**
 * Convenience method that can be used with any package that requires
 * `UpgradeCap` to have certain preconditions before it is considered
 * belonging to `T` object's package.
 */
export function assertPackageUpgradeCap(
  tx: Transaction,
  typeArg: string,
  args: AssertPackageUpgradeCapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::assert_package_upgrade_cap`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.cap),
      pure(tx, args.expectedPolicy, `u8`),
      pure(tx, args.expectedVersion, `u64`),
    ],
  })
}

export interface AssertVersionArgs {
  id: TransactionObjectInput
  version: GenericArg
}

/**
 * Assert that the version type passed into this method is what exists
 * as the current version.
 */
export function assertVersion(
  tx: Transaction,
  typeArg: string,
  args: AssertVersionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::assert_version`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.id),
      generic(tx, `${typeArg}`, args.version),
    ],
  })
}

export function typeOfVersion(
  tx: Transaction,
  typeArg: string,
  version: GenericArg,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::type_of_version`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, version)],
  })
}

export interface InitPackageInfoArgs {
  id: TransactionObjectInput
  version: GenericArg
  upgradeCap: TransactionObjectInput
}

/**
 * Initialize package info and set the initial version. This should be done
 * when a contract's state/storage shared object is created.
 */
export function initPackageInfo(
  tx: Transaction,
  typeArg: string,
  args: InitPackageInfoArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::init_package_info`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.id),
      generic(tx, `${typeArg}`, args.version),
      obj(tx, args.upgradeCap),
    ],
  })
}

export interface MigrateVersionArgs {
  id: TransactionObjectInput
  oldVersion: GenericArg
  newVersion: GenericArg
}

/**
 * Perform the version switchover and copy package info from pending to
 * current. This method should be executed after an upgrade (via a migrate
 * method) from the upgraded package.
 *
 * NOTE: This method can only be called once with the same version type
 * arguments.
 */
export function migrateVersion(
  tx: Transaction,
  typeArgs: [string, string],
  args: MigrateVersionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::migrate_version`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.id),
      generic(tx, `${typeArgs[0]}`, args.oldVersion),
      generic(tx, `${typeArgs[1]}`, args.newVersion),
    ],
  })
}

export interface AuthorizeUpgradeArgs {
  id: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  packageDigest: TransactionObjectInput
}

/**
 * Helper for `sui::package::authorize_upgrade` to modify pending package
 * info by updating its digest.
 *
 * NOTE: This digest will be copied over when `migrate_version` is called.
 */
export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::authorize_upgrade`,
    arguments: [
      obj(tx, args.id),
      obj(tx, args.upgradeCap),
      obj(tx, args.packageDigest),
    ],
  })
}

export interface CommitUpgradeArgs {
  id: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Helper for `sui::package::commit_upgrade` to modify pending package info
 * by updating its package ID with from what exists in the `UpgradeCap`.
 * This method returns the last package and the upgraded package IDs.
 *
 * NOTE: This package ID (second return value) will be copied over when
 * `migrate_version` is called.
 */
export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::commit_upgrade`,
    arguments: [
      obj(tx, args.id),
      obj(tx, args.upgradeCap),
      obj(tx, args.receipt),
    ],
  })
}

export interface SetCommitedPackageArgs {
  id: TransactionObjectInput
  upgradeCap: TransactionObjectInput
}

export function setCommitedPackage(
  tx: Transaction,
  args: SetCommitedPackageArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::set_commited_package`,
    arguments: [
      obj(tx, args.id),
      obj(tx, args.upgradeCap),
    ],
  })
}

export interface SetAuthorizedDigestArgs {
  id: TransactionObjectInput
  digest: TransactionObjectInput
}

export function setAuthorizedDigest(
  tx: Transaction,
  args: SetAuthorizedDigestArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::set_authorized_digest`,
    arguments: [
      obj(tx, args.id),
      obj(tx, args.digest),
    ],
  })
}

export function updatePackageInfoFromPending(
  tx: Transaction,
  id: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::update_package_info_from_pending`,
    arguments: [obj(tx, id)],
  })
}

export interface UpdateVersionTypeArgs {
  id: TransactionObjectInput
  oldVersion: GenericArg
  newVersion: GenericArg
}

/**
 * Update from version n to n+1. We enforce that the versions be kept in
 * a module called "version_control".
 */
export function updateVersionType(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateVersionTypeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::package_utils::update_version_type`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.id),
      generic(tx, `${typeArgs[0]}`, args.oldVersion),
      generic(tx, `${typeArgs[1]}`, args.newVersion),
    ],
  })
}
