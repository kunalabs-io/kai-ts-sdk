import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { String } from '../../std/string/structs'

export function init(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::init`,
    arguments: [],
  })
}

export interface TranserAdminCapArgs {
  protocolConfig: TransactionObjectInput
  cap: TransactionObjectInput
  account: string | TransactionArgument
}

/**
 * Transfers admin cap to the provided account address
 *
 * Parameters:
 * - cap: The AdminCap, ensuring the caller is the current admin.
 * - account: The address of the new admin
 */
export function transerAdminCap(
  tx: Transaction,
  args: TranserAdminCapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::transer_admin_cap`,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.cap),
      pure(tx, args.account, `address`),
    ],
  })
}

export interface TranserProtocolFeeCapArgs {
  protocolConfig: TransactionObjectInput
  cap: TransactionObjectInput
  account: string | TransactionArgument
}

/**
 * Transfers protocol fee cap to the provided account address
 *
 * Parameters:
 * - cap: The ProtocolFeeCap, ensuring the caller is the current owner fee cap owner.
 * - account: The address of the new fee cap account
 */
export function transerProtocolFeeCap(
  tx: Transaction,
  args: TranserProtocolFeeCapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::transer_protocol_fee_cap`,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.cap),
      pure(tx, args.account, `address`),
    ],
  })
}

export interface ClaimProtocolFeeArgs {
  protocolFeeCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coinAAmount: bigint | TransactionArgument
  coinBAmount: bigint | TransactionArgument
  destination: string | TransactionArgument
}

/**
 * Allows the owner of protocol fee cap to withdraw protocol
 * fee from the provided pool for both coin A and coin B and
 * transfer to destination account
 *
 * Parameters:
 * - cap: ProtocolFeeCap to ensure caller is the owner of this object
 * - pool: A mutable reference to the pool from which protocol fee is to be withdrawn
 * - coin_a_amount: The amount of coin A fee to be withdrawn
 * - coin_b_amount: The amount of coin B fee to be withdrawn
 * - destination: The address to which fee amount will be transferred
 * - ctx: Mutable Tx Context of the sender/caller
 */
export function claimProtocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClaimProtocolFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::claim_protocol_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolFeeCap),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.coinAAmount, `u64`),
      pure(tx, args.coinBAmount, `u64`),
      pure(tx, args.destination, `address`),
    ],
  })
}

export interface RemoveRewardManagerArgs {
  adminCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  manager: string | TransactionArgument
}

/**
 * adds rewards manager to the global config
 * Parameters:
 * - cap: The AdminCap, ensuring the caller is the current admin.
 * - protocol_config: mutable Global Config object
 * - manager: The address of the manager to be removed
 */
export function removeRewardManager(
  tx: Transaction,
  args: RemoveRewardManagerArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::remove_reward_manager`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.protocolConfig),
      pure(tx, args.manager, `address`),
    ],
  })
}

export interface UpdatePoolPauseStatusArgs {
  adminCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  status: boolean | TransactionArgument
}

/**
 * Updates pool's "is_paused" status
 * Parameters:
 * - cap: The AdminCap, ensuring the caller is the current admin.
 * - protocol_config: mutable Global Config object
 * - status: status to be set
 */
export function updatePoolPauseStatus(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdatePoolPauseStatusArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::update_pool_pause_status`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.status, `bool`),
    ],
  })
}

export interface AddRewardManagerArgs {
  adminCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  manager: string | TransactionArgument
}

/**
 * remove a rewards manager from the global config
 * Parameters:
 * - cap: The AdminCap, ensuring the caller is the current admin.
 * - protocol_config: mutable Global Config object
 * - manager: The address of the new manager to be added
 */
export function addRewardManager(
  tx: Transaction,
  args: AddRewardManagerArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::add_reward_manager`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.protocolConfig),
      pure(tx, args.manager, `address`),
    ],
  })
}

export interface InitializePoolRewardArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  startTime: bigint | TransactionArgument
  activeForSeconds: bigint | TransactionArgument
  rewardCoin: TransactionObjectInput
  rewardCoinSymbol: string | TransactionArgument
  rewardCoinDecimals: number | TransactionArgument
  rewardAmount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * initializes a reward for a given pool
 * Parameters:
 * - protocol_config: global config object for spot protocol
 * - pool : pool object
 * - start_time: start time for the rewards that are to be initialized (must be in future)
 * - active_for_seconds: seconds for which rewards are to be allocated.
 * - reward_coin: coin Object with balance for the reward that is to be initialized
 * - reward_amount: amount of rewards to be given out
 * - clock : sui clock object
 */
export function initializePoolReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: InitializePoolRewardArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::initialize_pool_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.startTime, `u64`),
      pure(tx, args.activeForSeconds, `u64`),
      obj(tx, args.rewardCoin),
      pure(tx, args.rewardCoinSymbol, `${String.$typeName}`),
      pure(tx, args.rewardCoinDecimals, `u8`),
      pure(tx, args.rewardAmount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface UpdatePoolRewardEmissionArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  activeForSeconds: bigint | TransactionArgument
  rewardCoin: TransactionObjectInput
  rewardAmount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * updates the emission for the initialized reward in pool
 * Parameters:
 * - protocol_config: global config object for spot protocol
 * - pool : pool object
 * - active_for_seconds: seconds for which rewards are to be allocated.
 * - reward_coin: coin Object with balance for the reward that is to be initialized
 * - reward_amount: amount of rewards to be given out
 * - clock : sui clock object
 */
export function updatePoolRewardEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: UpdatePoolRewardEmissionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::update_pool_reward_emission`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.activeForSeconds, `u64`),
      obj(tx, args.rewardCoin),
      pure(tx, args.rewardAmount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddSecondsToRewardEmissionArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  secondsToAdd: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * adds additional seconds to the emission for the initialized reward in pool
 * Parameters:
 * - protocol_config: global config object for spot protocol
 * - pool : pool object
 * - seconds_to_add: seconds to increase for reward emission.
 * - clock : sui clock object
 */
export function addSecondsToRewardEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddSecondsToRewardEmissionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::admin::add_seconds_to_reward_emission`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.secondsToAdd, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface UpdateSupportedVersionArgs {
  adminCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
}

/**
 * Allow admin of the protocol to increase the supported version of the protocol
 *
 * Parameters:
 * - _: Reference to admin cap
 * - protocol_config: The protocol config that needs to be updated
 */
export function updateSupportedVersion(
  tx: Transaction,
  args: UpdateSupportedVersionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::update_supported_version`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.protocolConfig),
    ],
  })
}

export interface UpdateProtocolFeeShareArgs {
  adminCap: TransactionObjectInput
  pool: TransactionObjectInput
  protocolFeeShare: bigint | TransactionArgument
}

/**
 * Allows the admin of the protocol to change the protocol fee share of any given pool.
 *
 * Parameters:
 * - _: Reference to admin cap to ensure the caller is protocol's admin
 * - pool: The pool for which to update the protocol fee share
 * - protocol_fee_share: The new protocol fee share (should be <= 50%)
 */
export function updateProtocolFeeShare(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateProtocolFeeShareArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::update_protocol_fee_share`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.pool),
      pure(tx, args.protocolFeeShare, `u64`),
    ],
  })
}

export interface IncreaseObservationCardinalityNextArgs {
  adminCap: TransactionObjectInput
  pool: TransactionObjectInput
  value: bigint | TransactionArgument
}

/**
 * Allows admin to increase the cardinality of observation for given pool
 *
 * Parameters:
 * - _: Reference to admin cap to ensure the caller is protocol's admin
 * - pool: The pool for which to update the observation cardinality
 * - value: The new cardinality
 */
export function increaseObservationCardinalityNext(
  tx: Transaction,
  typeArgs: [string, string],
  args: IncreaseObservationCardinalityNextArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('bluefin-spot', options?.env)
    }::admin::increase_observation_cardinality_next`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.pool),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface SetPoolManagerArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  poolManager: string | TransactionArgument
}

/**
 * Allows current pool manager to set a new manager for the pool
 *
 * Parameters:
 * - protocol_config: global config object for spot protocol
 * - pool : pool object
 * - pool_manger: address of new manager
 * - ctx: transaction context
 */
export function setPoolManager(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetPoolManagerArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::set_pool_manager`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.poolManager, `address`),
    ],
  })
}

export interface SetPoolCreationFeeArgs {
  adminCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  newFeeAmount: bigint | TransactionArgument
}

/**
 * Allows admin of the protocol to set pool creation fee
 *
 * Parameters:
 * - _ : Reference to admin cap to ensure caller is admin of the protocol
 * - protocol_config: global config object for spot protocol
 * - new_fee_amount : the amount of fee to be paid for pool creation
 * - ctx: transaction context
 */
export function setPoolCreationFee(
  tx: Transaction,
  typeArg: string,
  args: SetPoolCreationFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::set_pool_creation_fee`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.protocolConfig),
      pure(tx, args.newFeeAmount, `u64`),
    ],
  })
}

export interface ClaimPoolCreationFeeArgs {
  protocolFeeCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  amount: bigint | TransactionArgument
  destination: string | TransactionArgument
}

/**
 * Allows the holder of the protocol fee cap to claim and transfer the pool creation fee to provided address
 *
 * Parameters:
 * - _: Reference to Protocol Fee Cap to ensure the caller is the owner of protocol fee cap
 * - protocol_config: global config object for spot protocol
 * - amount : The amount of creation fee to be transferred
 * - destination: The account to which fee is to be sent
 * - ctx: transaction context
 */
export function claimPoolCreationFee(
  tx: Transaction,
  typeArg: string,
  args: ClaimPoolCreationFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::claim_pool_creation_fee`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.protocolFeeCap),
      obj(tx, args.protocolConfig),
      pure(tx, args.amount, `u64`),
      pure(tx, args.destination, `address`),
    ],
  })
}

export interface AddRewardReservesToPoolArgs {
  adminCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  rewardCoin: TransactionObjectInput
}

/**
 * Allows the admin of the protocol to add reward coin tokens to a pool
 * without increasing its total reward amount emission
 */
export function addRewardReservesToPool(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddRewardReservesToPoolArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::add_reward_reserves_to_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.rewardCoin),
    ],
  })
}

export interface SetPoolIconUrlArgs {
  adminCap: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  iconUrl: string | TransactionArgument
}

/**
 * Allows the admin of the protocol to set the icon url of a pool
 *
 * Parameters:
 * - _: Reference to admin cap to ensure the caller is the admin of the protocol
 * - protocol_config: global config object for spot protocol
 * - pool: The pool for which to update the icon url
 * - icon_url: The new icon url
 */
export function setPoolIconUrl(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetPoolIconUrlArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::admin::set_pool_icon_url`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.iconUrl, `${String.$typeName}`),
    ],
  })
}
