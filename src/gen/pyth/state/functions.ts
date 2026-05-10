import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { DataSource } from '../data-source/structs'

export interface NewArgs {
  upgradeCap: TransactionObjectInput
  sources: Array<TransactionObjectInput> | TransactionArgument
  governanceDataSource: TransactionObjectInput
  stalePriceThreshold: bigint | TransactionArgument
  baseUpdateFee: bigint | TransactionArgument
}

export function new_(
  tx: Transaction,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::new`,
    arguments: [
      obj(tx, args.upgradeCap),
      vector(tx, `${DataSource.$typeName}`, args.sources),
      obj(tx, args.governanceDataSource),
      pure(tx, args.stalePriceThreshold, `u64`),
      pure(tx, args.baseUpdateFee, `u64`),
    ],
  })
}

export function getStalePriceThresholdSecs(
  tx: Transaction,
  s: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::get_stale_price_threshold_secs`,
    arguments: [obj(tx, s)],
  })
}

export function getBaseUpdateFee(
  tx: Transaction,
  s: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::get_base_update_fee`,
    arguments: [obj(tx, s)],
  })
}

export function getFeeRecipient(
  tx: Transaction,
  s: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::get_fee_recipient`,
    arguments: [obj(tx, s)],
  })
}

export interface IsValidDataSourceArgs {
  s: TransactionObjectInput
  dataSource: TransactionObjectInput
}

export function isValidDataSource(
  tx: Transaction,
  args: IsValidDataSourceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::is_valid_data_source`,
    arguments: [
      obj(tx, args.s),
      obj(tx, args.dataSource),
    ],
  })
}

export interface IsValidGovernanceDataSourceArgs {
  s: TransactionObjectInput
  source: TransactionObjectInput
}

export function isValidGovernanceDataSource(
  tx: Transaction,
  args: IsValidGovernanceDataSourceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::is_valid_governance_data_source`,
    arguments: [
      obj(tx, args.s),
      obj(tx, args.source),
    ],
  })
}

export interface PriceFeedObjectExistsArgs {
  s: TransactionObjectInput
  p: TransactionObjectInput
}

export function priceFeedObjectExists(
  tx: Transaction,
  args: PriceFeedObjectExistsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::price_feed_object_exists`,
    arguments: [
      obj(tx, args.s),
      obj(tx, args.p),
    ],
  })
}

/** Retrieve governance chain ID, which is governance's emitter chain ID. */
export function governanceDataSource(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::governance_data_source`,
    arguments: [obj(tx, self)],
  })
}

export function getLastExecutedGovernanceSequence(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::get_last_executed_governance_sequence`,
    arguments: [obj(tx, self)],
  })
}

/** Retrieve governance module name. */
export function governanceModule(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::governance_module`,
    arguments: [],
  })
}

/** Retrieve governance chain ID, which is governance's emitter chain ID. */
export function governanceChain(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::governance_chain`,
    arguments: [obj(tx, self)],
  })
}

/** Retrieve governance emitter address. */
export function governanceContract(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::governance_contract`,
    arguments: [obj(tx, self)],
  })
}

export interface GetPriceInfoObjectIdArgs {
  self: TransactionObjectInput
  priceIdentifierBytes: Array<number | TransactionArgument> | TransactionArgument
}

export function getPriceInfoObjectId(
  tx: Transaction,
  args: GetPriceInfoObjectIdArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::get_price_info_object_id`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.priceIdentifierBytes, `vector<u8>`),
    ],
  })
}

/**
 * Obtain a capability to interact with `State` methods. This method checks
 * that we are running the current build.
 *
 * NOTE: This method allows caching the current version check so we avoid
 * multiple checks to dynamic fields.
 */
export function assertLatestOnly(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::assert_latest_only`,
    arguments: [obj(tx, self)],
  })
}

export interface SetFeeRecipientArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  addr: string | TransactionArgument
}

export function setFeeRecipient(
  tx: Transaction,
  args: SetFeeRecipientArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::set_fee_recipient`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
      pure(tx, args.addr, `address`),
    ],
  })
}

export interface BorrowMutConsumedVaasArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
}

/**
 * Store `VAA` hash as a way to claim a VAA. This method prevents a VAA
 * from being replayed. For Wormhole, the only VAAs that it cares about
 * being replayed are its governance actions.
 */
export function borrowMutConsumedVaas(
  tx: Transaction,
  args: BorrowMutConsumedVaasArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::borrow_mut_consumed_vaas`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
    ],
  })
}

/**
 * Store `VAA` hash as a way to claim a VAA. This method prevents a VAA
 * from being replayed. For Wormhole, the only VAAs that it cares about
 * being replayed are its governance actions.
 *
 * NOTE: This method does not require `LatestOnly`. Only methods in the
 * `upgrade_contract` module requires this to be unprotected to prevent
 * a corrupted upgraded contract from bricking upgradability.
 */
export function borrowMutConsumedVaasUnchecked(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::borrow_mut_consumed_vaas_unchecked`,
    arguments: [obj(tx, self)],
  })
}

export interface CurrentPackageArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
}

export function currentPackage(
  tx: Transaction,
  args: CurrentPackageArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::current_package`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
    ],
  })
}

export interface SetDataSourcesArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  newSources: Array<TransactionObjectInput> | TransactionArgument
}

export function setDataSources(
  tx: Transaction,
  args: SetDataSourcesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::set_data_sources`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.s),
      vector(tx, `${DataSource.$typeName}`, args.newSources),
    ],
  })
}

export interface RegisterPriceInfoObjectArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
  id: string | TransactionArgument
}

export function registerPriceInfoObject(
  tx: Transaction,
  args: RegisterPriceInfoObjectArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::register_price_info_object`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.s),
      obj(tx, args.priceIdentifier),
      pure(tx, args.id, `${ID.$typeName}`),
    ],
  })
}

export interface SetGovernanceDataSourceArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  source: TransactionObjectInput
}

export function setGovernanceDataSource(
  tx: Transaction,
  args: SetGovernanceDataSourceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::set_governance_data_source`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.s),
      obj(tx, args.source),
    ],
  })
}

export interface SetLastExecutedGovernanceSequenceArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  sequence: bigint | TransactionArgument
}

export function setLastExecutedGovernanceSequence(
  tx: Transaction,
  args: SetLastExecutedGovernanceSequenceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::set_last_executed_governance_sequence`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.s),
      pure(tx, args.sequence, `u64`),
    ],
  })
}

export interface SetLastExecutedGovernanceSequenceUncheckedArgs {
  s: TransactionObjectInput
  sequence: bigint | TransactionArgument
}

export function setLastExecutedGovernanceSequenceUnchecked(
  tx: Transaction,
  args: SetLastExecutedGovernanceSequenceUncheckedArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('pyth', options?.env)
    }::state::set_last_executed_governance_sequence_unchecked`,
    arguments: [
      obj(tx, args.s),
      pure(tx, args.sequence, `u64`),
    ],
  })
}

export interface SetBaseUpdateFeeArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  fee: bigint | TransactionArgument
}

export function setBaseUpdateFee(
  tx: Transaction,
  args: SetBaseUpdateFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::set_base_update_fee`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.s),
      pure(tx, args.fee, `u64`),
    ],
  })
}

export interface SetStalePriceThresholdSecsArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  thresholdSecs: bigint | TransactionArgument
}

export function setStalePriceThresholdSecs(
  tx: Transaction,
  args: SetStalePriceThresholdSecsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::set_stale_price_threshold_secs`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.s),
      pure(tx, args.thresholdSecs, `u64`),
    ],
  })
}

export interface AuthorizeUpgradeArgs {
  self: TransactionObjectInput
  packageDigest: TransactionObjectInput
}

/**
 * Issue an `UpgradeTicket` for the upgrade.
 *
 * NOTE: The Sui VM performs a check that this method is executed from the
 * latest published package. If someone were to try to execute this using
 * a stale build, the transaction will revert with `PackageUpgradeError`,
 * specifically `PackageIDDoesNotMatch`.
 */
export function authorizeUpgrade(
  tx: Transaction,
  args: AuthorizeUpgradeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::authorize_upgrade`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.packageDigest),
    ],
  })
}

export interface CommitUpgradeArgs {
  self: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Finalize the upgrade that ran to produce the given `receipt`.
 *
 * NOTE: The Sui VM performs a check that this method is executed from the
 * latest published package. If someone were to try to execute this using
 * a stale build, the transaction will revert with `PackageUpgradeError`,
 * specifically `PackageIDDoesNotMatch`.
 */
export function commitUpgrade(
  tx: Transaction,
  args: CommitUpgradeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::commit_upgrade`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.receipt),
    ],
  })
}

/**
 * Method executed by the `migrate` module to roll access from one package
 * to another. This method will be called from the upgraded package.
 */
export function migrateVersion(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::migrate_version`,
    arguments: [obj(tx, self)],
  })
}

export interface AssertAuthorizedDigestArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  digest: TransactionObjectInput
}

/**
 * As a part of the migration, we verify that the upgrade contract VAA's
 * encoded package digest used in `migrate` equals the one used to conduct
 * the upgrade.
 */
export function assertAuthorizedDigest(
  tx: Transaction,
  args: AssertAuthorizedDigestArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::assert_authorized_digest`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
      obj(tx, args.digest),
    ],
  })
}

export function migrateV011(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::state::migrate__v__0_1_1`,
    arguments: [obj(tx, self)],
  })
}
