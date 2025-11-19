import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function currentPackage(tx: Transaction, id: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::current_package`,
    arguments: [obj(tx, id)],
  })
}

export function currentDigest(tx: Transaction, id: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::current_digest`,
    arguments: [obj(tx, id)],
  })
}

export function committedPackage(tx: Transaction, id: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::committed_package`,
    arguments: [obj(tx, id)],
  })
}

export function authorizedDigest(tx: Transaction, id: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::authorized_digest`,
    arguments: [obj(tx, id)],
  })
}

export interface AssertPackageUpgradeCapArgs {
  cap: TransactionObjectInput
  expectedPolicy: number | TransactionArgument
  expectedVersion: bigint | TransactionArgument
}

export function assertPackageUpgradeCap(
  tx: Transaction,
  typeArg: string,
  args: AssertPackageUpgradeCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::assert_package_upgrade_cap`,
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

export function assertVersion(tx: Transaction, typeArg: string, args: AssertVersionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::assert_version`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.id), generic(tx, `${typeArg}`, args.version)],
  })
}

export function typeOfVersion(tx: Transaction, typeArg: string, version: GenericArg) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::type_of_version`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, version)],
  })
}

export interface InitPackageInfoArgs {
  id: TransactionObjectInput
  version: GenericArg
  upgradeCap: TransactionObjectInput
}

export function initPackageInfo(tx: Transaction, typeArg: string, args: InitPackageInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::init_package_info`,
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

export function migrateVersion(
  tx: Transaction,
  typeArgs: [string, string],
  args: MigrateVersionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::migrate_version`,
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

export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::authorize_upgrade`,
    arguments: [obj(tx, args.id), obj(tx, args.upgradeCap), obj(tx, args.packageDigest)],
  })
}

export interface CommitUpgradeArgs {
  id: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::commit_upgrade`,
    arguments: [obj(tx, args.id), obj(tx, args.upgradeCap), obj(tx, args.receipt)],
  })
}

export interface SetCommitedPackageArgs {
  id: TransactionObjectInput
  upgradeCap: TransactionObjectInput
}

export function setCommitedPackage(tx: Transaction, args: SetCommitedPackageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::set_commited_package`,
    arguments: [obj(tx, args.id), obj(tx, args.upgradeCap)],
  })
}

export interface SetAuthorizedDigestArgs {
  id: TransactionObjectInput
  digest: TransactionObjectInput
}

export function setAuthorizedDigest(tx: Transaction, args: SetAuthorizedDigestArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::set_authorized_digest`,
    arguments: [obj(tx, args.id), obj(tx, args.digest)],
  })
}

export function updatePackageInfoFromPending(tx: Transaction, id: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::update_package_info_from_pending`,
    arguments: [obj(tx, id)],
  })
}

export interface UpdateVersionTypeArgs {
  id: TransactionObjectInput
  oldVersion: GenericArg
  newVersion: GenericArg
}

export function updateVersionType(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateVersionTypeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::update_version_type`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.id),
      generic(tx, `${typeArgs[0]}`, args.oldVersion),
      generic(tx, `${typeArgs[1]}`, args.newVersion),
    ],
  })
}
