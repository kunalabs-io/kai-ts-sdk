import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Coin } from '../../sui/coin/structs'
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
    target: `${PUBLISHED_AT}::pool_script::create_pool`,
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

export interface CreatePoolWithLiquidityWithAllArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: bigint | TransactionArgument
  a4: string | TransactionArgument
  a5: Array<TransactionObjectInput> | TransactionArgument
  a6: Array<TransactionObjectInput> | TransactionArgument
  a7: number | TransactionArgument
  a8: number | TransactionArgument
  a9: bigint | TransactionArgument
  a10: bigint | TransactionArgument
  a11: boolean | TransactionArgument
  a12: TransactionObjectInput
}

export function createPoolWithLiquidityWithAll(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolWithLiquidityWithAllArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::create_pool_with_liquidity_with_all`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u128`),
      pure(tx, args.a4, `${String.$typeName}`),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a5),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a6),
      pure(tx, args.a7, `u32`),
      pure(tx, args.a8, `u32`),
      pure(tx, args.a9, `u64`),
      pure(tx, args.a10, `u64`),
      pure(tx, args.a11, `bool`),
      obj(tx, args.a12),
    ],
  })
}

export interface CreatePoolWithLiquidityOnlyAArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: bigint | TransactionArgument
  a4: string | TransactionArgument
  a5: Array<TransactionObjectInput> | TransactionArgument
  a6: number | TransactionArgument
  a7: number | TransactionArgument
  a8: bigint | TransactionArgument
  a9: TransactionObjectInput
}

export function createPoolWithLiquidityOnlyA(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolWithLiquidityOnlyAArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::create_pool_with_liquidity_only_a`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u128`),
      pure(tx, args.a4, `${String.$typeName}`),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a5),
      pure(tx, args.a6, `u32`),
      pure(tx, args.a7, `u32`),
      pure(tx, args.a8, `u64`),
      obj(tx, args.a9),
    ],
  })
}

export interface CreatePoolWithLiquidityOnlyBArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: bigint | TransactionArgument
  a4: string | TransactionArgument
  a5: Array<TransactionObjectInput> | TransactionArgument
  a6: number | TransactionArgument
  a7: number | TransactionArgument
  a8: bigint | TransactionArgument
  a9: TransactionObjectInput
}

export function createPoolWithLiquidityOnlyB(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolWithLiquidityOnlyBArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::create_pool_with_liquidity_only_b`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u128`),
      pure(tx, args.a4, `${String.$typeName}`),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a5),
      pure(tx, args.a6, `u32`),
      pure(tx, args.a7, `u32`),
      pure(tx, args.a8, `u64`),
      obj(tx, args.a9),
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
    target: `${PUBLISHED_AT}::pool_script::open_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u32`),
    ],
  })
}

export interface OpenPositionWithLiquidityWithAllArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: number | TransactionArgument
  a4: Array<TransactionObjectInput> | TransactionArgument
  a5: Array<TransactionObjectInput> | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: boolean | TransactionArgument
  a9: TransactionObjectInput
}

export function openPositionWithLiquidityWithAll(
  tx: Transaction,
  typeArgs: [string, string],
  args: OpenPositionWithLiquidityWithAllArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::open_position_with_liquidity_with_all`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u32`),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a4),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a5),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `bool`),
      obj(tx, args.a9),
    ],
  })
}

export interface OpenPositionWithLiquidityOnlyAArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: number | TransactionArgument
  a4: Array<TransactionObjectInput> | TransactionArgument
  a5: bigint | TransactionArgument
  a6: TransactionObjectInput
}

export function openPositionWithLiquidityOnlyA(
  tx: Transaction,
  typeArgs: [string, string],
  args: OpenPositionWithLiquidityOnlyAArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::open_position_with_liquidity_only_a`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u32`),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a4),
      pure(tx, args.a5, `u64`),
      obj(tx, args.a6),
    ],
  })
}

export interface OpenPositionWithLiquidityOnlyBArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: number | TransactionArgument
  a4: Array<TransactionObjectInput> | TransactionArgument
  a5: bigint | TransactionArgument
  a6: TransactionObjectInput
}

export function openPositionWithLiquidityOnlyB(
  tx: Transaction,
  typeArgs: [string, string],
  args: OpenPositionWithLiquidityOnlyBArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::open_position_with_liquidity_only_b`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u32`),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a4),
      pure(tx, args.a5, `u64`),
      obj(tx, args.a6),
    ],
  })
}

export interface AddLiquidityWithAllArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: Array<TransactionObjectInput> | TransactionArgument
  a4: Array<TransactionObjectInput> | TransactionArgument
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: TransactionObjectInput
}

export function addLiquidityWithAll(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityWithAllArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::add_liquidity_with_all`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a3),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a4),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u128`),
      obj(tx, args.a8),
    ],
  })
}

export interface AddLiquidityOnlyAArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: Array<TransactionObjectInput> | TransactionArgument
  a4: bigint | TransactionArgument
  a5: bigint | TransactionArgument
  a6: TransactionObjectInput
}

export function addLiquidityOnlyA(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityOnlyAArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::add_liquidity_only_a`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a3),
      pure(tx, args.a4, `u64`),
      pure(tx, args.a5, `u128`),
      obj(tx, args.a6),
    ],
  })
}

export interface AddLiquidityOnlyBArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: Array<TransactionObjectInput> | TransactionArgument
  a4: bigint | TransactionArgument
  a5: bigint | TransactionArgument
  a6: TransactionObjectInput
}

export function addLiquidityOnlyB(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityOnlyBArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::add_liquidity_only_b`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a3),
      pure(tx, args.a4, `u64`),
      pure(tx, args.a5, `u128`),
      obj(tx, args.a6),
    ],
  })
}

export interface AddLiquidityFixCoinWithAllArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: Array<TransactionObjectInput> | TransactionArgument
  a4: Array<TransactionObjectInput> | TransactionArgument
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: boolean | TransactionArgument
  a8: TransactionObjectInput
}

export function addLiquidityFixCoinWithAll(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityFixCoinWithAllArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::add_liquidity_fix_coin_with_all`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a3),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a4),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `bool`),
      obj(tx, args.a8),
    ],
  })
}

export interface AddLiquidityFixCoinOnlyAArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: Array<TransactionObjectInput> | TransactionArgument
  a4: bigint | TransactionArgument
  a5: TransactionObjectInput
}

export function addLiquidityFixCoinOnlyA(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityFixCoinOnlyAArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::add_liquidity_fix_coin_only_a`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a3),
      pure(tx, args.a4, `u64`),
      obj(tx, args.a5),
    ],
  })
}

export interface AddLiquidityFixCoinOnlyBArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: Array<TransactionObjectInput> | TransactionArgument
  a4: bigint | TransactionArgument
  a5: TransactionObjectInput
}

export function addLiquidityFixCoinOnlyB(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityFixCoinOnlyBArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::add_liquidity_fix_coin_only_b`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a3),
      pure(tx, args.a4, `u64`),
      obj(tx, args.a5),
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
    target: `${PUBLISHED_AT}::pool_script::remove_liquidity`,
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
    target: `${PUBLISHED_AT}::pool_script::close_position`,
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
}

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::collect_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1), obj(tx, args.a2)],
  })
}

export interface CollectRewardArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
}

export function collectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CollectRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::collect_reward`,
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

export interface CollectProtocolFeeArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
}

export function collectProtocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectProtocolFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::collect_protocol_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.a0), obj(tx, args.a1)],
  })
}

export interface SwapA2bArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: Array<TransactionObjectInput> | TransactionArgument
  a3: boolean | TransactionArgument
  a4: bigint | TransactionArgument
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: TransactionObjectInput
}

export function swapA2b(tx: Transaction, typeArgs: [string, string], args: SwapA2bArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::swap_a2b`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a2),
      pure(tx, args.a3, `bool`),
      pure(tx, args.a4, `u64`),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u128`),
      obj(tx, args.a7),
    ],
  })
}

export interface SwapB2aArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: Array<TransactionObjectInput> | TransactionArgument
  a3: boolean | TransactionArgument
  a4: bigint | TransactionArgument
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: TransactionObjectInput
}

export function swapB2a(tx: Transaction, typeArgs: [string, string], args: SwapB2aArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::swap_b2a`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a2),
      pure(tx, args.a3, `bool`),
      pure(tx, args.a4, `u64`),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u128`),
      obj(tx, args.a7),
    ],
  })
}

export interface SwapA2bWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: Array<TransactionObjectInput> | TransactionArgument
  a4: boolean | TransactionArgument
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: TransactionObjectInput
}

export function swapA2bWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapA2bWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::swap_a2b_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.a3),
      pure(tx, args.a4, `bool`),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u128`),
      obj(tx, args.a8),
    ],
  })
}

export interface SwapB2aWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: Array<TransactionObjectInput> | TransactionArgument
  a4: boolean | TransactionArgument
  a5: bigint | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: TransactionObjectInput
}

export function swapB2aWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapB2aWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::swap_b2a_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.a3),
      pure(tx, args.a4, `bool`),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u128`),
      obj(tx, args.a8),
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
    target: `${PUBLISHED_AT}::pool_script::update_fee_rate`,
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
    target: `${PUBLISHED_AT}::pool_script::initialize_rewarder`,
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
    target: `${PUBLISHED_AT}::pool_script::update_rewarder_emission`,
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
    target: `${PUBLISHED_AT}::pool_script::pause_pool`,
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
    target: `${PUBLISHED_AT}::pool_script::unpause_pool`,
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
    target: `${PUBLISHED_AT}::pool_script::update_position_url`,
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
    target: `${PUBLISHED_AT}::pool_script::set_display`,
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
