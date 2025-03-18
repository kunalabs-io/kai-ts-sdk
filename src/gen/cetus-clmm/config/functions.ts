import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function acl(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::config::acl`, arguments: [obj(tx, config)] })
}

export interface AddFeeTierArgs {
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  feeRate: bigint | TransactionArgument
}

export function addFeeTier(tx: Transaction, args: AddFeeTierArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::add_fee_tier`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.feeRate, `u64`),
    ],
  })
}

export interface AddRoleArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

export function addRole(tx: Transaction, args: AddRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::add_role`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      pure(tx, args.member, `address`),
      pure(tx, args.role, `u8`),
    ],
  })
}

export interface CheckFeeTierManagerRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

export function checkFeeTierManagerRole(tx: Transaction, args: CheckFeeTierManagerRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::check_fee_tier_manager_role`,
    arguments: [obj(tx, args.config), pure(tx, args.member, `address`)],
  })
}

export interface CheckPartnerManagerRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

export function checkPartnerManagerRole(tx: Transaction, args: CheckPartnerManagerRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::check_partner_manager_role`,
    arguments: [obj(tx, args.config), pure(tx, args.member, `address`)],
  })
}

export interface CheckPoolManagerRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

export function checkPoolManagerRole(tx: Transaction, args: CheckPoolManagerRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::check_pool_manager_role`,
    arguments: [obj(tx, args.config), pure(tx, args.member, `address`)],
  })
}

export interface CheckProtocolFeeClaimRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

export function checkProtocolFeeClaimRole(tx: Transaction, args: CheckProtocolFeeClaimRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::check_protocol_fee_claim_role`,
    arguments: [obj(tx, args.config), pure(tx, args.member, `address`)],
  })
}

export interface CheckRewarderManagerRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

export function checkRewarderManagerRole(tx: Transaction, args: CheckRewarderManagerRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::check_rewarder_manager_role`,
    arguments: [obj(tx, args.config), pure(tx, args.member, `address`)],
  })
}

export function checkedPackageVersion(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::checked_package_version`,
    arguments: [obj(tx, config)],
  })
}

export interface DeleteFeeTierArgs {
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

export function deleteFeeTier(tx: Transaction, args: DeleteFeeTierArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::delete_fee_tier`,
    arguments: [obj(tx, args.config), pure(tx, args.tickSpacing, `u32`)],
  })
}

export function feeRate(tx: Transaction, feeTier: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::config::fee_rate`, arguments: [obj(tx, feeTier)] })
}

export function feeTiers(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::config::fee_tiers`, arguments: [obj(tx, config)] })
}

export interface GetFeeRateArgs {
  tickSpacing: number | TransactionArgument
  globalConfig: TransactionObjectInput
}

export function getFeeRate(tx: Transaction, args: GetFeeRateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::get_fee_rate`,
    arguments: [pure(tx, args.tickSpacing, `u32`), obj(tx, args.globalConfig)],
  })
}

export function getMembers(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::get_members`,
    arguments: [obj(tx, config)],
  })
}

export function getProtocolFeeRate(tx: Transaction, globalConfig: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::get_protocol_fee_rate`,
    arguments: [obj(tx, globalConfig)],
  })
}

export function maxFeeRate(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::config::max_fee_rate`, arguments: [] })
}

export function maxProtocolFeeRate(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::config::max_protocol_fee_rate`, arguments: [] })
}

export function packageVersion(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::config::package_version`, arguments: [] })
}

export function protocolFeeRate(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::protocol_fee_rate`,
    arguments: [obj(tx, config)],
  })
}

export interface RemoveMemberArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  member: string | TransactionArgument
}

export function removeMember(tx: Transaction, args: RemoveMemberArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::remove_member`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.config), pure(tx, args.member, `address`)],
  })
}

export interface RemoveRoleArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

export function removeRole(tx: Transaction, args: RemoveRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::remove_role`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      pure(tx, args.member, `address`),
      pure(tx, args.role, `u8`),
    ],
  })
}

export interface SetRolesArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  member: string | TransactionArgument
  roles: bigint | TransactionArgument
}

export function setRoles(tx: Transaction, args: SetRolesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::set_roles`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      pure(tx, args.member, `address`),
      pure(tx, args.roles, `u128`),
    ],
  })
}

export function tickSpacing(tx: Transaction, feeTier: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::tick_spacing`,
    arguments: [obj(tx, feeTier)],
  })
}

export interface UpdateFeeTierArgs {
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  newFeeRate: bigint | TransactionArgument
}

export function updateFeeTier(tx: Transaction, args: UpdateFeeTierArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::update_fee_tier`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.newFeeRate, `u64`),
    ],
  })
}

export interface UpdatePackageVersionArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  version: bigint | TransactionArgument
}

export function updatePackageVersion(tx: Transaction, args: UpdatePackageVersionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::update_package_version`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.config), pure(tx, args.version, `u64`)],
  })
}

export interface UpdateProtocolFeeRateArgs {
  config: TransactionObjectInput
  protocolFeeRate: bigint | TransactionArgument
}

export function updateProtocolFeeRate(tx: Transaction, args: UpdateProtocolFeeRateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::update_protocol_fee_rate`,
    arguments: [obj(tx, args.config), pure(tx, args.protocolFeeRate, `u64`)],
  })
}
