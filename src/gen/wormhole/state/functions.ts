import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { Guardian } from '../guardian/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  upgradeCap: TransactionObjectInput
  governanceChain: number | TransactionArgument
  governanceContract: TransactionObjectInput
  guardianSetIndex: number | TransactionArgument
  initialGuardians: Array<TransactionObjectInput> | TransactionArgument
  guardianSetSecondsToLive: number | TransactionArgument
  messageFee: bigint | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::new`,
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

export function chainId(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::state::chain_id`, arguments: [] })
}

export function governanceModule(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::state::governance_module`, arguments: [] })
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

export function guardianSetIndex(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::guardian_set_index`,
    arguments: [obj(tx, self)],
  })
}

export function guardianSetSecondsToLive(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::guardian_set_seconds_to_live`,
    arguments: [obj(tx, self)],
  })
}

export interface GuardianSetAtArgs {
  self: TransactionObjectInput
  index: number | TransactionArgument
}

export function guardianSetAt(tx: Transaction, args: GuardianSetAtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::guardian_set_at`,
    arguments: [obj(tx, args.self), pure(tx, args.index, `u32`)],
  })
}

export function messageFee(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::state::message_fee`, arguments: [obj(tx, self)] })
}

export function assertLatestOnly(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::assert_latest_only`,
    arguments: [obj(tx, self)],
  })
}

export interface DepositFeeArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  fee: TransactionObjectInput
}

export function depositFee(tx: Transaction, args: DepositFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::deposit_fee`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self), obj(tx, args.fee)],
  })
}

export interface WithdrawFeeArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function withdrawFee(tx: Transaction, args: WithdrawFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::withdraw_fee`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self), pure(tx, args.amount, `u64`)],
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

export interface ExpireGuardianSetArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  theClock: TransactionObjectInput
}

export function expireGuardianSet(tx: Transaction, args: ExpireGuardianSetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::expire_guardian_set`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self), obj(tx, args.theClock)],
  })
}

export interface AddNewGuardianSetArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  newGuardianSet: TransactionObjectInput
}

export function addNewGuardianSet(tx: Transaction, args: AddNewGuardianSetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::add_new_guardian_set`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self), obj(tx, args.newGuardianSet)],
  })
}

export interface SetMessageFeeArgs {
  latestOnly: TransactionObjectInput
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function setMessageFee(tx: Transaction, args: SetMessageFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_message_fee`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.self), pure(tx, args.amount, `u64`)],
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

export function migrateVersion(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::migrate_version`,
    arguments: [obj(tx, self)],
  })
}

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

export function migrateV020(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::migrate__v__0_2_0`,
    arguments: [obj(tx, self)],
  })
}
