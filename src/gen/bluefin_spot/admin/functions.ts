import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function init(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::admin::init`, arguments: [] })
}

export interface TranserAdminCapArgs {
  protocolConfig: TransactionObjectInput
  cap: TransactionObjectInput
  account: string | TransactionArgument
}

export function transerAdminCap(tx: Transaction, args: TranserAdminCapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::transer_admin_cap`,
    arguments: [obj(tx, args.protocolConfig), obj(tx, args.cap), pure(tx, args.account, `address`)],
  })
}

export interface TranserProtocolFeeCapArgs {
  protocolConfig: TransactionObjectInput
  cap: TransactionObjectInput
  account: string | TransactionArgument
}

export function transerProtocolFeeCap(tx: Transaction, args: TranserProtocolFeeCapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::transer_protocol_fee_cap`,
    arguments: [obj(tx, args.protocolConfig), obj(tx, args.cap), pure(tx, args.account, `address`)],
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

export function claimProtocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClaimProtocolFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::claim_protocol_fee`,
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

export function removeRewardManager(tx: Transaction, args: RemoveRewardManagerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::remove_reward_manager`,
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

export function updatePoolPauseStatus(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdatePoolPauseStatusArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::update_pool_pause_status`,
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

export function addRewardManager(tx: Transaction, args: AddRewardManagerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::add_reward_manager`,
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

export function initializePoolReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: InitializePoolRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::initialize_pool_reward`,
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

export function updatePoolRewardEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: UpdatePoolRewardEmissionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::update_pool_reward_emission`,
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

export function addSecondsToRewardEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddSecondsToRewardEmissionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::add_seconds_to_reward_emission`,
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

export function updateSupportedVersion(tx: Transaction, args: UpdateSupportedVersionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::update_supported_version`,
    arguments: [obj(tx, args.adminCap), obj(tx, args.protocolConfig)],
  })
}

export interface UpdateProtocolFeeShareArgs {
  adminCap: TransactionObjectInput
  pool: TransactionObjectInput
  protocolFeeShare: bigint | TransactionArgument
}

export function updateProtocolFeeShare(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateProtocolFeeShareArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::update_protocol_fee_share`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.adminCap), obj(tx, args.pool), pure(tx, args.protocolFeeShare, `u64`)],
  })
}

export interface IncreaseObservationCardinalityNextArgs {
  adminCap: TransactionObjectInput
  pool: TransactionObjectInput
  value: bigint | TransactionArgument
}

export function increaseObservationCardinalityNext(
  tx: Transaction,
  typeArgs: [string, string],
  args: IncreaseObservationCardinalityNextArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::increase_observation_cardinality_next`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.adminCap), obj(tx, args.pool), pure(tx, args.value, `u64`)],
  })
}

export interface SetPoolManagerArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  poolManager: string | TransactionArgument
}

export function setPoolManager(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetPoolManagerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::set_pool_manager`,
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

export function setPoolCreationFee(tx: Transaction, typeArg: string, args: SetPoolCreationFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::set_pool_creation_fee`,
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

export function claimPoolCreationFee(
  tx: Transaction,
  typeArg: string,
  args: ClaimPoolCreationFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::claim_pool_creation_fee`,
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

export function addRewardReservesToPool(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: AddRewardReservesToPoolArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::add_reward_reserves_to_pool`,
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

export function setPoolIconUrl(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetPoolIconUrlArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::admin::set_pool_icon_url`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.iconUrl, `${String.$typeName}`),
    ],
  })
}
