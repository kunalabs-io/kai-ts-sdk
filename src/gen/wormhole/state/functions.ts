import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { Guardian } from '../guardian/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  upgradeCap: TransactionObjectInput
  u16: number | TransactionArgument
  externalAddress: TransactionObjectInput
  u321: number | TransactionArgument
  vecGuardian: Array<TransactionObjectInput> | TransactionArgument
  u322: number | TransactionArgument
  u64: bigint | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::new`,
    arguments: [
      obj(tx, args.upgradeCap),
      pure(tx, args.u16, `u16`),
      obj(tx, args.externalAddress),
      pure(tx, args.u321, `u32`),
      vector(tx, `${Guardian.$typeName}`, args.vecGuardian),
      pure(tx, args.u322, `u32`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export function chainId(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::state::chain_id`, arguments: [] })
}

export function governanceModule(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::state::governance_module`, arguments: [] })
}

export function governanceChain(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::governance_chain`,
    arguments: [obj(tx, state)],
  })
}

export function governanceContract(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::governance_contract`,
    arguments: [obj(tx, state)],
  })
}

export function guardianSetIndex(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::guardian_set_index`,
    arguments: [obj(tx, state)],
  })
}

export function guardianSetSecondsToLive(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::guardian_set_seconds_to_live`,
    arguments: [obj(tx, state)],
  })
}

export interface GuardianSetAtArgs {
  state: TransactionObjectInput
  u32: number | TransactionArgument
}

export function guardianSetAt(tx: Transaction, args: GuardianSetAtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::guardian_set_at`,
    arguments: [obj(tx, args.state), pure(tx, args.u32, `u32`)],
  })
}

export function messageFee(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::state::message_fee`, arguments: [obj(tx, state)] })
}

export function assertLatestOnly(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::assert_latest_only`,
    arguments: [obj(tx, state)],
  })
}

export interface DepositFeeArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  balance: TransactionObjectInput
}

export function depositFee(tx: Transaction, args: DepositFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::deposit_fee`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state), obj(tx, args.balance)],
  })
}

export interface WithdrawFeeArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function withdrawFee(tx: Transaction, args: WithdrawFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::withdraw_fee`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state), pure(tx, args.u64, `u64`)],
  })
}

export interface BorrowMutConsumedVaasArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
}

export function borrowMutConsumedVaas(tx: Transaction, args: BorrowMutConsumedVaasArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::borrow_mut_consumed_vaas`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state)],
  })
}

export function borrowMutConsumedVaasUnchecked(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::borrow_mut_consumed_vaas_unchecked`,
    arguments: [obj(tx, state)],
  })
}

export interface ExpireGuardianSetArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  clock: TransactionObjectInput
}

export function expireGuardianSet(tx: Transaction, args: ExpireGuardianSetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::expire_guardian_set`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state), obj(tx, args.clock)],
  })
}

export interface AddNewGuardianSetArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  guardianSet: TransactionObjectInput
}

export function addNewGuardianSet(tx: Transaction, args: AddNewGuardianSetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::add_new_guardian_set`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state), obj(tx, args.guardianSet)],
  })
}

export interface SetMessageFeeArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function setMessageFee(tx: Transaction, args: SetMessageFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::set_message_fee`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state), pure(tx, args.u64, `u64`)],
  })
}

export interface CurrentPackageArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
}

export function currentPackage(tx: Transaction, args: CurrentPackageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::current_package`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state)],
  })
}

export interface AuthorizeUpgradeArgs {
  state: TransactionObjectInput
  bytes32: TransactionObjectInput
}

export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::authorize_upgrade`,
    arguments: [obj(tx, args.state), obj(tx, args.bytes32)],
  })
}

export interface CommitUpgradeArgs {
  state: TransactionObjectInput
  upgradeReceipt: TransactionObjectInput
}

export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::commit_upgrade`,
    arguments: [obj(tx, args.state), obj(tx, args.upgradeReceipt)],
  })
}

export function migrateVersion(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::migrate_version`,
    arguments: [obj(tx, state)],
  })
}

export interface AssertAuthorizedDigestArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  bytes32: TransactionObjectInput
}

export function assertAuthorizedDigest(tx: Transaction, args: AssertAuthorizedDigestArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::assert_authorized_digest`,
    arguments: [obj(tx, args.latestOnly), obj(tx, args.state), obj(tx, args.bytes32)],
  })
}

export function migrateV020(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::state::migrate__v__0_2_0`,
    arguments: [obj(tx, state)],
  })
}
