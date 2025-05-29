import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface EmitPoolCreatedEventArgs {
  id: string | TransactionArgument
  coinA: string | TransactionArgument
  coinASymbol: string | TransactionArgument
  coinADecimals: number | TransactionArgument
  coinAUrl: string | TransactionArgument
  coinB: string | TransactionArgument
  coinBSymbol: string | TransactionArgument
  coinBDecimals: number | TransactionArgument
  coinBUrl: string | TransactionArgument
  currentSqrtPrice: bigint | TransactionArgument
  currentTickIndex: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  feeRate: bigint | TransactionArgument
  protocolFeeShare: bigint | TransactionArgument
}

export function emitPoolCreatedEvent(tx: Transaction, args: EmitPoolCreatedEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_pool_created_event`,
    arguments: [
      pure(tx, args.id, `${ID.$typeName}`),
      pure(tx, args.coinA, `${String.$typeName}`),
      pure(tx, args.coinASymbol, `${String.$typeName}`),
      pure(tx, args.coinADecimals, `u8`),
      pure(tx, args.coinAUrl, `${String.$typeName}`),
      pure(tx, args.coinB, `${String.$typeName}`),
      pure(tx, args.coinBSymbol, `${String.$typeName}`),
      pure(tx, args.coinBDecimals, `u8`),
      pure(tx, args.coinBUrl, `${String.$typeName}`),
      pure(tx, args.currentSqrtPrice, `u128`),
      obj(tx, args.currentTickIndex),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.feeRate, `u64`),
      pure(tx, args.protocolFeeShare, `u64`),
    ],
  })
}

export interface EmitLiquidityProvidedEventArgs {
  poolId: string | TransactionArgument
  positionId: string | TransactionArgument
  coinAAmount: bigint | TransactionArgument
  coinBAmount: bigint | TransactionArgument
  poolCoinAAmount: bigint | TransactionArgument
  poolCoinBAmount: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  beforeLiquidity: bigint | TransactionArgument
  afterLiquidity: bigint | TransactionArgument
  currentSqrtPrice: bigint | TransactionArgument
  currentTickIndex: TransactionObjectInput
  lowerTick: TransactionObjectInput
  upperTick: TransactionObjectInput
  sequenceNumber: bigint | TransactionArgument
}

export function emitLiquidityProvidedEvent(tx: Transaction, args: EmitLiquidityProvidedEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_liquidity_provided_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.coinAAmount, `u64`),
      pure(tx, args.coinBAmount, `u64`),
      pure(tx, args.poolCoinAAmount, `u64`),
      pure(tx, args.poolCoinBAmount, `u64`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.beforeLiquidity, `u128`),
      pure(tx, args.afterLiquidity, `u128`),
      pure(tx, args.currentSqrtPrice, `u128`),
      obj(tx, args.currentTickIndex),
      obj(tx, args.lowerTick),
      obj(tx, args.upperTick),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitLiquidityRemovedEventArgs {
  poolId: string | TransactionArgument
  positionId: string | TransactionArgument
  coinAAmount: bigint | TransactionArgument
  coinBAmount: bigint | TransactionArgument
  poolCoinAAmount: bigint | TransactionArgument
  poolCoinBAmount: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  beforeLiquidity: bigint | TransactionArgument
  afterLiquidity: bigint | TransactionArgument
  currentSqrtPrice: bigint | TransactionArgument
  currentTickIndex: TransactionObjectInput
  lowerTick: TransactionObjectInput
  upperTick: TransactionObjectInput
  sequenceNumber: bigint | TransactionArgument
}

export function emitLiquidityRemovedEvent(tx: Transaction, args: EmitLiquidityRemovedEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_liquidity_removed_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.coinAAmount, `u64`),
      pure(tx, args.coinBAmount, `u64`),
      pure(tx, args.poolCoinAAmount, `u64`),
      pure(tx, args.poolCoinBAmount, `u64`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.beforeLiquidity, `u128`),
      pure(tx, args.afterLiquidity, `u128`),
      pure(tx, args.currentSqrtPrice, `u128`),
      obj(tx, args.currentTickIndex),
      obj(tx, args.lowerTick),
      obj(tx, args.upperTick),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitSwapEventArgs {
  poolId: string | TransactionArgument
  a2B: boolean | TransactionArgument
  amountIn: bigint | TransactionArgument
  amountOut: bigint | TransactionArgument
  poolCoinAAmount: bigint | TransactionArgument
  poolCoinBAmount: bigint | TransactionArgument
  fee: bigint | TransactionArgument
  beforeLiquidity: bigint | TransactionArgument
  afterLiquidity: bigint | TransactionArgument
  beforeSqrtPrice: bigint | TransactionArgument
  afterSqrtPrice: bigint | TransactionArgument
  currentTick: TransactionObjectInput
  exceeded: boolean | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitSwapEvent(tx: Transaction, args: EmitSwapEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_swap_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.amountIn, `u64`),
      pure(tx, args.amountOut, `u64`),
      pure(tx, args.poolCoinAAmount, `u64`),
      pure(tx, args.poolCoinBAmount, `u64`),
      pure(tx, args.fee, `u64`),
      pure(tx, args.beforeLiquidity, `u128`),
      pure(tx, args.afterLiquidity, `u128`),
      pure(tx, args.beforeSqrtPrice, `u128`),
      pure(tx, args.afterSqrtPrice, `u128`),
      obj(tx, args.currentTick),
      pure(tx, args.exceeded, `bool`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitFlashSwapEventArgs {
  poolId: string | TransactionArgument
  a2B: boolean | TransactionArgument
  amountIn: bigint | TransactionArgument
  amountOut: bigint | TransactionArgument
  fee: bigint | TransactionArgument
  beforeLiquidity: bigint | TransactionArgument
  afterLiquidity: bigint | TransactionArgument
  beforeSqrtPrice: bigint | TransactionArgument
  afterSqrtPrice: bigint | TransactionArgument
  currentTick: TransactionObjectInput
  exceeded: boolean | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitFlashSwapEvent(tx: Transaction, args: EmitFlashSwapEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_flash_swap_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.amountIn, `u64`),
      pure(tx, args.amountOut, `u64`),
      pure(tx, args.fee, `u64`),
      pure(tx, args.beforeLiquidity, `u128`),
      pure(tx, args.afterLiquidity, `u128`),
      pure(tx, args.beforeSqrtPrice, `u128`),
      pure(tx, args.afterSqrtPrice, `u128`),
      obj(tx, args.currentTick),
      pure(tx, args.exceeded, `bool`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export function emitAdminCapTransferEvent(tx: Transaction, owner: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_admin_cap_transfer_event`,
    arguments: [pure(tx, owner, `address`)],
  })
}

export function emitProtocolFeeCapTransferEvent(
  tx: Transaction,
  owner: string | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_protocol_fee_cap_transfer_event`,
    arguments: [pure(tx, owner, `address`)],
  })
}

export interface EmitProtocolFeeCollectedArgs {
  poolId: string | TransactionArgument
  sender: string | TransactionArgument
  destination: string | TransactionArgument
  coinAAmount: bigint | TransactionArgument
  coinBAmount: bigint | TransactionArgument
  poolCoinAAmount: bigint | TransactionArgument
  poolCoinBAmount: bigint | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitProtocolFeeCollected(tx: Transaction, args: EmitProtocolFeeCollectedArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_protocol_fee_collected`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.sender, `address`),
      pure(tx, args.destination, `address`),
      pure(tx, args.coinAAmount, `u64`),
      pure(tx, args.coinBAmount, `u64`),
      pure(tx, args.poolCoinAAmount, `u64`),
      pure(tx, args.poolCoinBAmount, `u64`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitUserFeeCollectedArgs {
  poolId: string | TransactionArgument
  positionId: string | TransactionArgument
  coinAAmount: bigint | TransactionArgument
  coinBAmount: bigint | TransactionArgument
  poolCoinAAmount: bigint | TransactionArgument
  poolCoinBAmount: bigint | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitUserFeeCollected(tx: Transaction, args: EmitUserFeeCollectedArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_user_fee_collected`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.coinAAmount, `u64`),
      pure(tx, args.coinBAmount, `u64`),
      pure(tx, args.poolCoinAAmount, `u64`),
      pure(tx, args.poolCoinBAmount, `u64`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitUserRewardCollectedArgs {
  poolId: string | TransactionArgument
  positionId: string | TransactionArgument
  rewardType: string | TransactionArgument
  rewardSymbol: string | TransactionArgument
  rewardDecimals: number | TransactionArgument
  rewardAmount: bigint | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitUserRewardCollected(tx: Transaction, args: EmitUserRewardCollectedArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_user_reward_collected`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.rewardType, `${String.$typeName}`),
      pure(tx, args.rewardSymbol, `${String.$typeName}`),
      pure(tx, args.rewardDecimals, `u8`),
      pure(tx, args.rewardAmount, `u64`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitPositionOpenEventArgs {
  poolId: string | TransactionArgument
  positionId: string | TransactionArgument
  tickLower: TransactionObjectInput
  tickUpper: TransactionObjectInput
}

export function emitPositionOpenEvent(tx: Transaction, args: EmitPositionOpenEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_position_open_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.tickLower),
      obj(tx, args.tickUpper),
    ],
  })
}

export interface EmitPositionCloseEventArgs {
  poolId: string | TransactionArgument
  positionId: string | TransactionArgument
  tickLower: TransactionObjectInput
  tickUpper: TransactionObjectInput
}

export function emitPositionCloseEvent(tx: Transaction, args: EmitPositionCloseEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_position_close_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.tickLower),
      obj(tx, args.tickUpper),
    ],
  })
}

export interface EmitUpdatePoolRewardEmissionEventArgs {
  poolId: string | TransactionArgument
  rewardCoinSymbol: string | TransactionArgument
  rewardCoinType: string | TransactionArgument
  rewardCoinDecimals: number | TransactionArgument
  totalReward: bigint | TransactionArgument
  endedAtSeconds: bigint | TransactionArgument
  lastUpdateTime: bigint | TransactionArgument
  rewardPerSeconds: bigint | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitUpdatePoolRewardEmissionEvent(
  tx: Transaction,
  args: EmitUpdatePoolRewardEmissionEventArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_update_pool_reward_emission_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.rewardCoinSymbol, `${String.$typeName}`),
      pure(tx, args.rewardCoinType, `${String.$typeName}`),
      pure(tx, args.rewardCoinDecimals, `u8`),
      pure(tx, args.totalReward, `u64`),
      pure(tx, args.endedAtSeconds, `u64`),
      pure(tx, args.lastUpdateTime, `u64`),
      pure(tx, args.rewardPerSeconds, `u128`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitSupportedVersionUpdateEventArgs {
  oldVersion: bigint | TransactionArgument
  newVersion: bigint | TransactionArgument
}

export function emitSupportedVersionUpdateEvent(
  tx: Transaction,
  args: EmitSupportedVersionUpdateEventArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_supported_version_update_event`,
    arguments: [pure(tx, args.oldVersion, `u64`), pure(tx, args.newVersion, `u64`)],
  })
}

export interface EmitTickUpdateEventArgs {
  pool: string | TransactionArgument
  index: TransactionObjectInput
  liquidityGross: bigint | TransactionArgument
  liquidityNet: TransactionObjectInput
}

export function emitTickUpdateEvent(tx: Transaction, args: EmitTickUpdateEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_tick_update_event`,
    arguments: [
      pure(tx, args.pool, `${ID.$typeName}`),
      obj(tx, args.index),
      pure(tx, args.liquidityGross, `u128`),
      obj(tx, args.liquidityNet),
    ],
  })
}

export interface EmitRewardManagerUpdateEventArgs {
  manager: string | TransactionArgument
  isActive: boolean | TransactionArgument
}

export function emitRewardManagerUpdateEvent(
  tx: Transaction,
  args: EmitRewardManagerUpdateEventArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_reward_manager_update_event`,
    arguments: [pure(tx, args.manager, `address`), pure(tx, args.isActive, `bool`)],
  })
}

export interface EmitProtocolFeeShareUpdatedEventArgs {
  pool: string | TransactionArgument
  previousProtocolFeeShare: bigint | TransactionArgument
  currentProtocolFeeShare: bigint | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitProtocolFeeShareUpdatedEvent(
  tx: Transaction,
  args: EmitProtocolFeeShareUpdatedEventArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_protocol_fee_share_updated_event`,
    arguments: [
      pure(tx, args.pool, `${ID.$typeName}`),
      pure(tx, args.previousProtocolFeeShare, `u64`),
      pure(tx, args.currentProtocolFeeShare, `u64`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitPoolPauseStatusUpdateEventArgs {
  poolId: string | TransactionArgument
  status: boolean | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitPoolPauseStatusUpdateEvent(
  tx: Transaction,
  args: EmitPoolPauseStatusUpdateEventArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_pool_pause_status_update_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.status, `bool`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitObservationCardinalityUpdatedEventArgs {
  pool: string | TransactionArgument
  previousObservationCardinality: bigint | TransactionArgument
  currentObservationCardinality: bigint | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitObservationCardinalityUpdatedEvent(
  tx: Transaction,
  args: EmitObservationCardinalityUpdatedEventArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_observation_cardinality_updated_event`,
    arguments: [
      pure(tx, args.pool, `${ID.$typeName}`),
      pure(tx, args.previousObservationCardinality, `u64`),
      pure(tx, args.currentObservationCardinality, `u64`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitPoolManagerUpdateEventArgs {
  poolId: string | TransactionArgument
  newManager: string | TransactionArgument
  sequenceNumber: bigint | TransactionArgument
}

export function emitPoolManagerUpdateEvent(tx: Transaction, args: EmitPoolManagerUpdateEventArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_pool_manager_update_event`,
    arguments: [
      pure(tx, args.poolId, `${ID.$typeName}`),
      pure(tx, args.newManager, `address`),
      pure(tx, args.sequenceNumber, `u128`),
    ],
  })
}

export interface EmitPoolCreationFeeUpdateEventArgs {
  coinType: string | TransactionArgument
  previousFeeAmount: bigint | TransactionArgument
  currentFeeAmount: bigint | TransactionArgument
}

export function emitPoolCreationFeeUpdateEvent(
  tx: Transaction,
  args: EmitPoolCreationFeeUpdateEventArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_pool_creation_fee_update_event`,
    arguments: [
      pure(tx, args.coinType, `${String.$typeName}`),
      pure(tx, args.previousFeeAmount, `u64`),
      pure(tx, args.currentFeeAmount, `u64`),
    ],
  })
}

export interface EmitPoolCreationFeePaidEventArgs {
  pool: string | TransactionArgument
  creator: string | TransactionArgument
  coinType: string | TransactionArgument
  feeAmount: bigint | TransactionArgument
  totalAccruedFee: bigint | TransactionArgument
}

export function emitPoolCreationFeePaidEvent(
  tx: Transaction,
  args: EmitPoolCreationFeePaidEventArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_pool_creation_fee_paid_event`,
    arguments: [
      pure(tx, args.pool, `${ID.$typeName}`),
      pure(tx, args.creator, `address`),
      pure(tx, args.coinType, `${String.$typeName}`),
      pure(tx, args.feeAmount, `u64`),
      pure(tx, args.totalAccruedFee, `u64`),
    ],
  })
}

export interface EmitPoolCreationFeeClaimedArgs {
  coinType: string | TransactionArgument
  amount: bigint | TransactionArgument
  destination: string | TransactionArgument
  accruedFeeBefore: bigint | TransactionArgument
  accruedFeeAfter: bigint | TransactionArgument
}

export function emitPoolCreationFeeClaimed(tx: Transaction, args: EmitPoolCreationFeeClaimedArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::events::emit_pool_creation_fee_claimed`,
    arguments: [
      pure(tx, args.coinType, `${String.$typeName}`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.destination, `address`),
      pure(tx, args.accruedFeeBefore, `u64`),
      pure(tx, args.accruedFeeAfter, `u64`),
    ],
  })
}
