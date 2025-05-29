import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function currentPackage(tx: Transaction, uid: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::current_package`,
    arguments: [obj(tx, uid)],
  })
}

export function currentDigest(tx: Transaction, uid: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::current_digest`,
    arguments: [obj(tx, uid)],
  })
}

export function committedPackage(tx: Transaction, uid: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::committed_package`,
    arguments: [obj(tx, uid)],
  })
}

export function authorizedDigest(tx: Transaction, uid: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::authorized_digest`,
    arguments: [obj(tx, uid)],
  })
}

export interface AssertPackageUpgradeCapArgs {
  upgradeCap: TransactionObjectInput
  u8: number | TransactionArgument
  u64: bigint | TransactionArgument
}

export function assertPackageUpgradeCap(
  tx: Transaction,
  typeArg: string,
  args: AssertPackageUpgradeCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::assert_package_upgrade_cap`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.upgradeCap), pure(tx, args.u8, `u8`), pure(tx, args.u64, `u64`)],
  })
}

export interface AssertVersionArgs {
  uid: TransactionObjectInput
  t0: GenericArg
}

export function assertVersion(tx: Transaction, typeArg: string, args: AssertVersionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::assert_version`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.uid), generic(tx, `${typeArg}`, args.t0)],
  })
}

export function typeOfVersion(tx: Transaction, typeArg: string, t0: GenericArg) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::type_of_version`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, t0)],
  })
}

export interface InitPackageInfoArgs {
  uid: TransactionObjectInput
  t0: GenericArg
  upgradeCap: TransactionObjectInput
}

export function initPackageInfo(tx: Transaction, typeArg: string, args: InitPackageInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::init_package_info`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.uid), generic(tx, `${typeArg}`, args.t0), obj(tx, args.upgradeCap)],
  })
}

export interface MigrateVersionArgs {
  uid: TransactionObjectInput
  t0: GenericArg
  t1: GenericArg
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
      obj(tx, args.uid),
      generic(tx, `${typeArgs[0]}`, args.t0),
      generic(tx, `${typeArgs[1]}`, args.t1),
    ],
  })
}

export interface AuthorizeUpgradeArgs {
  uid: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  bytes32: TransactionObjectInput
}

export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::authorize_upgrade`,
    arguments: [obj(tx, args.uid), obj(tx, args.upgradeCap), obj(tx, args.bytes32)],
  })
}

export interface CommitUpgradeArgs {
  uid: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  upgradeReceipt: TransactionObjectInput
}

export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::commit_upgrade`,
    arguments: [obj(tx, args.uid), obj(tx, args.upgradeCap), obj(tx, args.upgradeReceipt)],
  })
}

export interface SetCommitedPackageArgs {
  uid: TransactionObjectInput
  upgradeCap: TransactionObjectInput
}

export function setCommitedPackage(tx: Transaction, args: SetCommitedPackageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::set_commited_package`,
    arguments: [obj(tx, args.uid), obj(tx, args.upgradeCap)],
  })
}

export interface SetAuthorizedDigestArgs {
  uid: TransactionObjectInput
  bytes32: TransactionObjectInput
}

export function setAuthorizedDigest(tx: Transaction, args: SetAuthorizedDigestArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::set_authorized_digest`,
    arguments: [obj(tx, args.uid), obj(tx, args.bytes32)],
  })
}

export function updatePackageInfoFromPending(tx: Transaction, uid: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::package_utils::update_package_info_from_pending`,
    arguments: [obj(tx, uid)],
  })
}

export interface UpdateVersionTypeArgs {
  uid: TransactionObjectInput
  t0: GenericArg
  t1: GenericArg
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
      obj(tx, args.uid),
      generic(tx, `${typeArgs[0]}`, args.t0),
      generic(tx, `${typeArgs[1]}`, args.t1),
    ],
  })
}
