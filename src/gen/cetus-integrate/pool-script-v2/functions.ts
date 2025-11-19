import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePoolArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: bigint | TransactionArgument
  a4: string | TransactionArgument
  a5: TransactionObjectInput
}

export function createPool(tx: Transaction, typeArgs: [string, string], args: CreatePoolArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::create_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u128`),
      pure(tx, args.a4, `${String.$typeName}`),
      obj(tx, args.a5),
    ],
  })
}

export interface CreatePoolWithLiquidityArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: bigint | TransactionArgument
  a4: string | TransactionArgument
  a5: TransactionObjectInput
  a6: TransactionObjectInput
  a7: number | TransactionArgument
  a8: number | TransactionArgument
  a9: bigint | TransactionArgument
  a10: bigint | TransactionArgument
  a11: boolean | TransactionArgument
  a12: TransactionObjectInput
}

export function createPoolWithLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolWithLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::create_pool_with_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u128`),
      pure(tx, args.a4, `${String.$typeName}`),
      obj(tx, args.a5),
      obj(tx, args.a6),
      pure(tx, args.a7, `u32`),
      pure(tx, args.a8, `u32`),
      pure(tx, args.a9, `u64`),
      pure(tx, args.a10, `u64`),
      pure(tx, args.a11, `bool`),
      obj(tx, args.a12),
    ],
  })
}

export interface OpenPositionArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: number | TransactionArgument
}

export function openPosition(tx: Transaction, typeArgs: [string, string], args: OpenPositionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::open_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u32`),
    ],
  })
}

export interface OpenPositionWithLiquidityArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: number | TransactionArgument
  a4: TransactionObjectInput
  a5: TransactionObjectInput
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: TransactionObjectInput
}

export function openPositionWithLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: OpenPositionWithLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::open_position_with_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u32`),
      obj(tx, args.a4),
      obj(tx, args.a5),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u128`),
      obj(tx, args.a9),
    ],
  })
}

export interface OpenPositionWithLiquidityByFixCoinArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: number | TransactionArgument
  a4: TransactionObjectInput
  a5: TransactionObjectInput
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: boolean | TransactionArgument
  a9: TransactionObjectInput
}

export function openPositionWithLiquidityByFixCoin(
  tx: Transaction,
  typeArgs: [string, string],
  args: OpenPositionWithLiquidityByFixCoinArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::open_position_with_liquidity_by_fix_coin`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u32`),
      obj(tx, args.a4),
      obj(tx, args.a5),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `bool`),
      obj(tx, args.a9),
    ],
  })
}

export interface AddLiquidityArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: TransactionObjectInput
}

export function addLiquidity(tx: Transaction, typeArgs: [string, string], args: AddLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u128`),
      obj(tx, args.a8),
    ],
  })
}

export interface AddLiquidityByFixCoinArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: boolean | TransactionArgument
  a8: TransactionObjectInput
}

export function addLiquidityByFixCoin(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityByFixCoinArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::add_liquidity_by_fix_coin`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `bool`),
      obj(tx, args.a8),
    ],
  })
}

export interface RemoveLiquidityArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: bigint | TransactionArgument
  a4: bigint | TransactionArgument
  a5: bigint | TransactionArgument
  a6: TransactionObjectInput
}

export function removeLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::remove_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      pure(tx, args.a3, `u128`),
      pure(tx, args.a4, `u64`),
      pure(tx, args.a5, `u64`),
      obj(tx, args.a6),
    ],
  })
}

export interface ClosePositionArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: bigint | TransactionArgument
  a4: bigint | TransactionArgument
  a5: TransactionObjectInput
}

export function closePosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClosePositionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::close_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      pure(tx, args.a3, `u64`),
      pure(tx, args.a4, `u64`),
      obj(tx, args.a5),
    ],
  })
}

export interface CollectFeeArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
}

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
    ],
  })
}

export interface ClosePositionWithReturnArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: boolean | TransactionArgument
  a4: TransactionObjectInput
}

export function closePositionWithReturn(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClosePositionWithReturnArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::close_position_with_return`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      pure(tx, args.a3, `bool`),
      obj(tx, args.a4),
    ],
  })
}

export interface CollectRewardArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: TransactionObjectInput
}

export function collectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CollectRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      obj(tx, args.a5),
    ],
  })
}

export interface CollectProtocolFeeArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
}

export function collectProtocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectProtocolFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::collect_protocol_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1), obj(tx, args.a2), obj(tx, args.a3)],
  })
}

export interface SwapA2bArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: boolean | TransactionArgument
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: TransactionObjectInput
}

export function swapA2b(tx: Transaction, typeArgs: [string, string], args: SwapA2bArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::swap_a2b`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      pure(tx, args.a4, `bool`),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u128`),
      obj(tx, args.a8),
    ],
  })
}

export interface SwapB2aArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: boolean | TransactionArgument
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: TransactionObjectInput
}

export function swapB2a(tx: Transaction, typeArgs: [string, string], args: SwapB2aArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::swap_b2a`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      pure(tx, args.a4, `bool`),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u128`),
      obj(tx, args.a8),
    ],
  })
}

export interface SwapA2bWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: boolean | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: TransactionObjectInput
}

export function swapA2bWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapA2bWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::swap_a2b_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `bool`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u128`),
      obj(tx, args.a9),
    ],
  })
}

export interface SwapB2aWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: boolean | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: TransactionObjectInput
}

export function swapB2aWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapB2aWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::swap_b2a_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `bool`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u128`),
      obj(tx, args.a9),
    ],
  })
}

export interface UpdateFeeRateArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: bigint | TransactionArgument
}

export function updateFeeRate(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateFeeRateArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::update_fee_rate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1), pure(tx, args.a2, `u64`)],
  })
}

export interface InitializeRewarderArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
}

export function initializeRewarder(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: InitializeRewarderArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::initialize_rewarder`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1)],
  })
}

export interface UpdateRewarderEmissionArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: bigint | TransactionArgument
  a4: TransactionObjectInput
}

export function updateRewarderEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: UpdateRewarderEmissionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::update_rewarder_emission`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      pure(tx, args.a3, `u128`),
      obj(tx, args.a4),
    ],
  })
}

export interface PausePoolArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
}

export function pausePool(tx: Transaction, typeArgs: [string, string], args: PausePoolArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::pause_pool`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1)],
  })
}

export interface UnpausePoolArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
}

export function unpausePool(tx: Transaction, typeArgs: [string, string], args: UnpausePoolArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::unpause_pool`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1)],
  })
}

export interface UpdatePositionUrlArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
}

export function updatePositionUrl(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdatePositionUrlArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::update_position_url`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1), pure(tx, args.a2, `${String.$typeName}`)],
  })
}

export interface SetDisplayArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
  a3: string | TransactionArgument
  a4: string | TransactionArgument
  a5: string | TransactionArgument
  a6: string | TransactionArgument
  a7: string | TransactionArgument
}

export function setDisplay(tx: Transaction, typeArgs: [string, string], args: SetDisplayArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::set_display`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `${String.$typeName}`),
      pure(tx, args.a3, `${String.$typeName}`),
      pure(tx, args.a4, `${String.$typeName}`),
      pure(tx, args.a5, `${String.$typeName}`),
      pure(tx, args.a6, `${String.$typeName}`),
      pure(tx, args.a7, `${String.$typeName}`),
    ],
  })
}
