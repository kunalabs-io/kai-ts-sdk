import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/**
 * Initialize the `GlobalConfig` and `AdminCap`
 * * `ctx` - Transaction context used to create the `GlobalConfig` and `AdminCap`
 */
export function init(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::init`,
    arguments: [],
  })
}

export interface UpdateProtocolFeeRateArgs {
  config: TransactionObjectInput
  protocolFeeRate: bigint | TransactionArgument
}

/**
 * Update the protocol fee rate
 * * `config` - The global config
 * * `protocol_fee_rate` - The new protocol fee rate
 * * `ctx` - Transaction context used to update the protocol fee rate
 */
export function updateProtocolFeeRate(
  tx: Transaction,
  args: UpdateProtocolFeeRateArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::update_protocol_fee_rate`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.protocolFeeRate, `u64`),
    ],
  })
}

export interface AddFeeTierArgs {
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  feeRate: bigint | TransactionArgument
}

/**
 * Add a fee tier
 * * `config` - The global config
 * * `tick_spacing` - The tick spacing
 * * `fee_rate` - The fee rate
 * * `ctx` - Transaction context used to add the fee tier
 */
export function addFeeTier(tx: Transaction, args: AddFeeTierArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::add_fee_tier`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.feeRate, `u64`),
    ],
  })
}

export interface DeleteFeeTierArgs {
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
}

/**
 * Delete a fee tier by `tick_spacing`.
 * * `config` - The global config
 * * `tick_spacing` - The tick spacing
 * * `ctx` - Transaction context used to delete the fee tier
 */
export function deleteFeeTier(tx: Transaction, args: DeleteFeeTierArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::delete_fee_tier`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.tickSpacing, `u32`),
    ],
  })
}

export interface UpdateFeeTierArgs {
  config: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  newFeeRate: bigint | TransactionArgument
}

/**
 * Update the fee rate of a FeeTier by `tick_spacing`.
 * * `config` - The global config
 * * `tick_spacing` - The tick spacing
 * * `new_fee_rate` - The new fee rate
 * * `ctx` - Transaction context used to update the fee tier
 */
export function updateFeeTier(tx: Transaction, args: UpdateFeeTierArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::update_fee_tier`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.newFeeRate, `u64`),
    ],
  })
}

export interface SetRolesArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  member: string | TransactionArgument
  roles: bigint | TransactionArgument
}

/**
 * Set role for member.
 * * `admin_cap` - The admin cap
 * * `config` - The global config
 * * `member` - The member address
 * * `roles` - The roles
 */
export function setRoles(tx: Transaction, args: SetRolesArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::set_roles`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      pure(tx, args.member, `address`),
      pure(tx, args.roles, `u128`),
    ],
  })
}

export interface AddRoleArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

/**
 * Add a role for member.
 * * `admin_cap` - The admin cap
 * * `config` - The global config
 * * `member` - The member address
 * * `role` - The role
 */
export function addRole(tx: Transaction, args: AddRoleArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::add_role`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      pure(tx, args.member, `address`),
      pure(tx, args.role, `u8`),
    ],
  })
}

export interface RemoveRoleArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

/**
 * Remove a role for member.
 * * `admin_cap` - The admin cap
 * * `config` - The global config
 * * `member` - The member address
 * * `role` - The role
 */
export function removeRole(tx: Transaction, args: RemoveRoleArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::remove_role`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      pure(tx, args.member, `address`),
      pure(tx, args.role, `u8`),
    ],
  })
}

export interface RemoveMemberArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * Remove a member from ACL.
 * * `admin_cap` - The admin cap
 * * `config` - The global config
 * * `member` - The member address
 */
export function removeMember(tx: Transaction, args: RemoveMemberArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::remove_member`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      pure(tx, args.member, `address`),
    ],
  })
}

/**
 * Get all members in the ACL
 * * `config` - The global config
 * * Returns a vector of ACL members
 */
export function getMembers(tx: Transaction, config: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::get_members`,
    arguments: [obj(tx, config)],
  })
}

/**
 * Get the protocol fee rate
 * * `global_config` - The global config
 * * Returns the protocol fee rate
 */
export function getProtocolFeeRate(
  tx: Transaction,
  globalConfig: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::get_protocol_fee_rate`,
    arguments: [obj(tx, globalConfig)],
  })
}

export interface GetFeeRateArgs {
  tickSpacing: number | TransactionArgument
  globalConfig: TransactionObjectInput
}

/**
 * Get fee rate by tick spacing
 * * `tick_spacing` - The tick spacing
 * * `global_config` - The global config
 * * Returns the fee rate
 */
export function getFeeRate(tx: Transaction, args: GetFeeRateArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::get_fee_rate`,
    arguments: [
      pure(tx, args.tickSpacing, `u32`),
      obj(tx, args.globalConfig),
    ],
  })
}

/**
 * Get the max fee rate
 * * Returns the max fee rate
 */
export function maxFeeRate(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::max_fee_rate`,
    arguments: [],
  })
}

/**
 * Get the max protocol fee rate
 * * Returns the max protocol fee rate
 */
export function maxProtocolFeeRate(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::max_protocol_fee_rate`,
    arguments: [],
  })
}

export interface IsPoolManagerArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * * `config` - The global config
 * * `member` - The member address
 * * Returns true if the member has the pool manager role, false otherwise
 */
export function isPoolManager(tx: Transaction, args: IsPoolManagerArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::is_pool_manager`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.member, `address`),
    ],
  })
}

export interface CheckPoolManagerRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * Check member has pool manager role
 * * `config` - The global config
 * * `member` - The member address
 */
export function checkPoolManagerRole(
  tx: Transaction,
  args: CheckPoolManagerRoleArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::check_pool_manager_role`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.member, `address`),
    ],
  })
}

export interface CheckFeeTierManagerRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * Check member has fee tier manager role
 * * `config` - The global config
 * * `member` - The member address
 */
export function checkFeeTierManagerRole(
  tx: Transaction,
  args: CheckFeeTierManagerRoleArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::check_fee_tier_manager_role`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.member, `address`),
    ],
  })
}

export interface CheckProtocolFeeClaimRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * Check member has protocol fee claim role
 * * `config` - The global config
 * * `member` - The member address
 */
export function checkProtocolFeeClaimRole(
  tx: Transaction,
  args: CheckProtocolFeeClaimRoleArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::check_protocol_fee_claim_role`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.member, `address`),
    ],
  })
}

export interface CheckPartnerManagerRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * Check member has partner manager role.
 * * `config` - The global config
 * * `member` - The member address
 */
export function checkPartnerManagerRole(
  tx: Transaction,
  args: CheckPartnerManagerRoleArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::check_partner_manager_role`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.member, `address`),
    ],
  })
}

export interface CheckRewarderManagerRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * Check member has rewarder manager role.
 * * `config` - The global config
 * * `member` - The member address
 */
export function checkRewarderManagerRole(
  tx: Transaction,
  args: CheckRewarderManagerRoleArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::check_rewarder_manager_role`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.member, `address`),
    ],
  })
}

export interface CheckEmergencyPauseRoleArgs {
  config: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * Check member has emergency pause role.
 * * `config` - The global config
 * * `member` - The member address
 */
export function checkEmergencyPauseRole(
  tx: Transaction,
  args: CheckEmergencyPauseRoleArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::check_emergency_pause_role`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.member, `address`),
    ],
  })
}

/**
 * Get tick_spacing of FeeTier.
 * * `fee_tier` - The fee tier
 * * Returns the tick spacing
 */
export function tickSpacing(tx: Transaction, feeTier: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::tick_spacing`,
    arguments: [obj(tx, feeTier)],
  })
}

/**
 * Get fee_rate of FeeTier.
 * * `fee_tier` - The fee tier
 * * Returns the fee rate
 */
export function feeRate(tx: Transaction, feeTier: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::fee_rate`,
    arguments: [obj(tx, feeTier)],
  })
}

/**
 * Get the protocol_fee_rate from `GlobalConfig`.
 * * `config` - The global config
 * * Returns the protocol fee rate
 */
export function protocolFeeRate(
  tx: Transaction,
  config: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::protocol_fee_rate`,
    arguments: [obj(tx, config)],
  })
}

/**
 * Get the fee tiers from `GlobalConfig`.
 * * `config` - The global config
 * * Returns the fee tiers
 */
export function feeTiers(tx: Transaction, config: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::fee_tiers`,
    arguments: [obj(tx, config)],
  })
}

/**
 * Get the ACL from `GlobalConfig`.
 * * `config` - The global config
 * * Returns the ACL
 */
export function acl(tx: Transaction, config: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::acl`,
    arguments: [obj(tx, config)],
  })
}

/**
 * Check current packages is valid.
 * * `config` - The global config
 */
export function checkedPackageVersion(
  tx: Transaction,
  config: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::checked_package_version`,
    arguments: [obj(tx, config)],
  })
}

/**
 * Check package version satisfy EMERGENCY_RESTORE_NEED_VERSION.
 * * `config` - The global config
 */
export function checkEmergencyRestoreVersion(
  tx: Transaction,
  config: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::check_emergency_restore_version`,
    arguments: [obj(tx, config)],
  })
}

/**
 * Emergency pause the protocol.
 * * `config` - The global config
 * * `ctx` - The transaction context
 */
export function emergencyPause(tx: Transaction, config: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::emergency_pause`,
    arguments: [obj(tx, config)],
  })
}

export interface EmergencyUnpauseArgs {
  config: TransactionObjectInput
  version: bigint | TransactionArgument
}

/**
 * Emergency unpause the protocol.
 * * `config` - The global config
 * * `version` - The new package version
 * * `ctx` - The transaction context
 */
export function emergencyUnpause(tx: Transaction, args: EmergencyUnpauseArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::emergency_unpause`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.version, `u64`),
    ],
  })
}

export interface UpdatePackageVersionArgs {
  adminCap: TransactionObjectInput
  config: TransactionObjectInput
  version: bigint | TransactionArgument
}

/**
 * Update the package version.
 * * `admin_cap` - The admin cap
 * * `config` - The global config
 * * `version` - The new package version
 */
export function updatePackageVersion(
  tx: Transaction,
  args: UpdatePackageVersionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::update_package_version`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.config),
      pure(tx, args.version, `u64`),
    ],
  })
}

/**
 * Get the package version.
 * * Returns the package version
 */
export function packageVersion(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm')}::config::package_version`,
    arguments: [],
  })
}
