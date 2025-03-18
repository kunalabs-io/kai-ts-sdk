import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { DataSource } from '../data-source/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AssertAuthorizedDigestArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  digest: TransactionObjectInput
}

export function assertAuthorizedDigest(tx: Transaction, args: AssertAuthorizedDigestArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::assert_authorized_digest`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self), obj(tx, args.digest)],
  })
}

export function assertLatestOnly(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::assert_latest_only`,
    arguments: [obj(tx, self)],
  })
}

export interface AuthorizeUpgradeArgs {
  self: TransactionObjectInput
  packageDigest: TransactionObjectInput
}

export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::authorize_upgrade`,
    arguments: [obj(tx, args.self), obj(tx, args.packageDigest)],
  })
}

export interface BorrowMutConsumedVaasArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
}

export function borrowMutConsumedVaas(tx: Transaction, args: BorrowMutConsumedVaasArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::borrow_mut_consumed_vaas`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self)],
  })
}

export function borrowMutConsumedVaasUnchecked(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::borrow_mut_consumed_vaas_unchecked`,
    arguments: [obj(tx, self)],
  })
}

export interface CommitUpgradeArgs {
  self: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::commit_upgrade`,
    arguments: [obj(tx, args.self), obj(tx, args.receipt)],
  })
}

export interface CurrentPackageArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
}

export function currentPackage(tx: Transaction, args: CurrentPackageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::current_package`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self)],
  })
}

export function getBaseUpdateFee(tx: Transaction, s: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::get_base_update_fee`,
    arguments: [obj(tx, s)],
  })
}

export function getFeeRecipient(tx: Transaction, s: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::get_fee_recipient`,
    arguments: [obj(tx, s)],
  })
}

export function getLastExecutedGovernanceSequence(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::get_last_executed_governance_sequence`,
    arguments: [obj(tx, self)],
  })
}

export interface GetPriceInfoObjectIdArgs {
  self: TransactionObjectInput
  priceIdentifierBytes: Array<number | TransactionArgument> | TransactionArgument
}

export function getPriceInfoObjectId(tx: Transaction, args: GetPriceInfoObjectIdArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::get_price_info_object_id`,
    arguments: [obj(tx, args.self), pure(tx, args.priceIdentifierBytes, `vector<u8>`)],
  })
}

export function getStalePriceThresholdSecs(tx: Transaction, s: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::get_stale_price_threshold_secs`,
    arguments: [obj(tx, s)],
  })
}

export function governanceChain(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::governance_chain`,
    arguments: [obj(tx, self)],
  })
}

export function governanceContract(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::governance_contract`,
    arguments: [obj(tx, self)],
  })
}

export function governanceDataSource(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::governance_data_source`,
    arguments: [obj(tx, self)],
  })
}

export function governanceModule(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::state::governance_module`, arguments: [] })
}

export interface IsValidDataSourceArgs {
  s: TransactionObjectInput
  dataSource: TransactionObjectInput
}

export function isValidDataSource(tx: Transaction, args: IsValidDataSourceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::is_valid_data_source`,
    arguments: [obj(tx, args.s), obj(tx, args.dataSource)],
  })
}

export interface IsValidGovernanceDataSourceArgs {
  s: TransactionObjectInput
  source: TransactionObjectInput
}

export function isValidGovernanceDataSource(
  tx: Transaction,
  args: IsValidGovernanceDataSourceArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::is_valid_governance_data_source`,
    arguments: [obj(tx, args.s), obj(tx, args.source)],
  })
}

export function migrateV011(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::migrate__v__0_1_1`,
    arguments: [obj(tx, self)],
  })
}

export function migrateVersion(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::migrate_version`,
    arguments: [obj(tx, self)],
  })
}

export interface NewArgs {
  upgradeCap: TransactionObjectInput
  sources: Array<TransactionObjectInput> | TransactionArgument
  governanceDataSource: TransactionObjectInput
  stalePriceThreshold: bigint | TransactionArgument
  baseUpdateFee: bigint | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::new`,
    arguments: [
      obj(tx, args.upgradeCap),
      vector(tx, `${DataSource.$typeName}`, args.sources),
      obj(tx, args.governanceDataSource),
      pure(tx, args.stalePriceThreshold, `u64`),
      pure(tx, args.baseUpdateFee, `u64`),
    ],
  })
}

export interface PriceFeedObjectExistsArgs {
  s: TransactionObjectInput
  p: TransactionObjectInput
}

export function priceFeedObjectExists(tx: Transaction, args: PriceFeedObjectExistsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::price_feed_object_exists`,
    arguments: [obj(tx, args.s), obj(tx, args.p)],
  })
}

export interface RegisterPriceInfoObjectArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
  id: string | TransactionArgument
}

export function registerPriceInfoObject(tx: Transaction, args: RegisterPriceInfoObjectArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::register_price_info_object`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.s),
      obj(tx, args.priceIdentifier),
      pure(tx, args.id, `${ID.$typeName}`),
    ],
  })
}

export interface SetBaseUpdateFeeArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  fee: bigint | TransactionArgument
}

export function setBaseUpdateFee(tx: Transaction, args: SetBaseUpdateFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_base_update_fee`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.s), pure(tx, args.fee, `u64`)],
  })
}

export interface SetDataSourcesArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  newSources: Array<TransactionObjectInput> | TransactionArgument
}

export function setDataSources(tx: Transaction, args: SetDataSourcesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_data_sources`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.s),
      vector(tx, `${DataSource.$typeName}`, args.newSources),
    ],
  })
}

export interface SetFeeRecipientArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  addr: string | TransactionArgument
}

export function setFeeRecipient(tx: Transaction, args: SetFeeRecipientArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_fee_recipient`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self), pure(tx, args.addr, `address`)],
  })
}

export interface SetGovernanceDataSourceArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  source: TransactionObjectInput
}

export function setGovernanceDataSource(tx: Transaction, args: SetGovernanceDataSourceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_governance_data_source`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.s), obj(tx, args.source)],
  })
}

export interface SetLastExecutedGovernanceSequenceArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  sequence: bigint | TransactionArgument
}

export function setLastExecutedGovernanceSequence(
  tx: Transaction,
  args: SetLastExecutedGovernanceSequenceArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_last_executed_governance_sequence`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.s), pure(tx, args.sequence, `u64`)],
  })
}

export interface SetLastExecutedGovernanceSequenceUncheckedArgs {
  s: TransactionObjectInput
  sequence: bigint | TransactionArgument
}

export function setLastExecutedGovernanceSequenceUnchecked(
  tx: Transaction,
  args: SetLastExecutedGovernanceSequenceUncheckedArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_last_executed_governance_sequence_unchecked`,
    arguments: [obj(tx, args.s), pure(tx, args.sequence, `u64`)],
  })
}

export interface SetStalePriceThresholdSecsArgs {
  latestOnly: TransactionObjectInput
  s: TransactionObjectInput
  thresholdSecs: bigint | TransactionArgument
}

export function setStalePriceThresholdSecs(tx: Transaction, args: SetStalePriceThresholdSecsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_stale_price_threshold_secs`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.s), pure(tx, args.thresholdSecs, `u64`)],
  })
}
