import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { Guardian } from '../guardian/structs'

export interface NewArgs {
  upgradeCap: TransactionObjectInput
  governanceChain: number | TransactionArgument
  governanceContract: TransactionObjectInput
  guardianSetIndex: number | TransactionArgument
  initialGuardians: Array<TransactionObjectInput> | TransactionArgument
  guardianSetSecondsToLive: number | TransactionArgument
  messageFee: bigint | TransactionArgument
}

/** Create new `State`. This is only executed using the `setup` module. */
export function new_(
  tx: Transaction,
  args: NewArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::new`,
    arguments: [
      obj(tx, args.upgradeCap),
      pure(tx, args.governanceChain, `u16`),
      obj(tx, args.governanceContract),
      pure(tx, args.guardianSetIndex, `u32`),
      vector(tx, `${Guardian.$typeName}`, args.initialGuardians),
      pure(tx, args.guardianSetSecondsToLive, `u32`),
      pure(tx, args.messageFee, `u64`),
    ],
  })
}

/**
 * Convenience method to get hard-coded Wormhole chain ID (recognized by
 * the Wormhole network).
 */
export function chainId(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::chain_id`,
    arguments: [],
  })
}

/** Retrieve governance module name. */
export function governanceModule(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::governance_module`,
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::governance_chain`,
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::governance_contract`,
    arguments: [obj(tx, self)],
  })
}

/**
 * Retrieve current Guardian set index. This value is important for
 * verifying VAA signatures and especially important for governance VAAs.
 */
export function guardianSetIndex(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::guardian_set_index`,
    arguments: [obj(tx, self)],
  })
}

/**
 * Retrieve how long after a Guardian set can live for in terms of Sui
 * timestamp (in seconds).
 */
export function guardianSetSecondsToLive(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::guardian_set_seconds_to_live`,
    arguments: [obj(tx, self)],
  })
}

export interface GuardianSetAtArgs {
  self: TransactionObjectInput
  index: number | TransactionArgument
}

/**
 * Retrieve a particular Guardian set by its Guardian set index. This
 * method is used when verifying a VAA.
 *
 * See `wormhole::vaa` for more info.
 */
export function guardianSetAt(
  tx: Transaction,
  args: GuardianSetAtArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::guardian_set_at`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.index, `u32`),
    ],
  })
}

/** Retrieve current fee to send Wormhole message. */
export function messageFee(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::message_fee`,
    arguments: [obj(tx, self)],
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::assert_latest_only`,
    arguments: [obj(tx, self)],
  })
}

export interface DepositFeeArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  fee: TransactionObjectInput
}

/**
 * Deposit fee when sending Wormhole message. This method does not
 * necessarily have to be a `friend` to `wormhole::publish_message`. But
 * we also do not want an integrator to mistakenly deposit fees outside
 * of calling `publish_message`.
 *
 * See `wormhole::publish_message` for more info.
 */
export function depositFee(
  tx: Transaction,
  args: DepositFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::deposit_fee`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
      obj(tx, args.fee),
    ],
  })
}

export interface WithdrawFeeArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Withdraw collected fees when governance action to transfer fees to a
 * particular recipient.
 *
 * See `wormhole::transfer_fee` for more info.
 */
export function withdrawFee(
  tx: Transaction,
  args: WithdrawFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::withdraw_fee`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
      pure(tx, args.amount, `u64`),
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::borrow_mut_consumed_vaas`,
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
    target: `${
      getPublishedAt('wormhole', options?.env)
    }::state::borrow_mut_consumed_vaas_unchecked`,
    arguments: [obj(tx, self)],
  })
}

export interface ExpireGuardianSetArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  theClock: TransactionObjectInput
}

/**
 * When a new guardian set is added to `State`, part of the process
 * involves setting the last known Guardian set's expiration time based
 * on how long a Guardian set can live for.
 *
 * See `guardian_set_epochs_to_live` for the parameter that determines how
 * long a Guardian set can live for.
 *
 * See `wormhole::update_guardian_set` for more info.
 */
export function expireGuardianSet(
  tx: Transaction,
  args: ExpireGuardianSetArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::expire_guardian_set`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
      obj(tx, args.theClock),
    ],
  })
}

export interface AddNewGuardianSetArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  newGuardianSet: TransactionObjectInput
}

/**
 * Add the latest Guardian set from the governance action to update the
 * current guardian set.
 *
 * See `wormhole::update_guardian_set` for more info.
 */
export function addNewGuardianSet(
  tx: Transaction,
  args: AddNewGuardianSetArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::add_new_guardian_set`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
      obj(tx, args.newGuardianSet),
    ],
  })
}

export interface SetMessageFeeArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Modify the cost to send a Wormhole message via governance.
 *
 * See `wormhole::set_fee` for more info.
 */
export function setMessageFee(
  tx: Transaction,
  args: SetMessageFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::set_message_fee`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
      pure(tx, args.amount, `u64`),
    ],
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::current_package`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::authorize_upgrade`,
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::commit_upgrade`,
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::migrate_version`,
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
    target: `${getPublishedAt('wormhole', options?.env)}::state::assert_authorized_digest`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.self),
      obj(tx, args.digest),
    ],
  })
}

/**
 * This method is used to make modifications to `State` when `migrate` is
 * called. This method name should change reflecting which version this
 * contract is migrating to.
 *
 * NOTE: Please keep this method as public(friend) because we never want
 * to expose this method as a public method.
 */
export function migrateV020(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::state::migrate__v__0_2_0`,
    arguments: [obj(tx, self)],
  })
}
