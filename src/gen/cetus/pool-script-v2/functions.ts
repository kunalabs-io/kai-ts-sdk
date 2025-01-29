import { PUBLISHED_AT } from '..'
import { String } from '../../_dependencies/onchain/0x1/string/structs'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface SwapArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swap(tx: Transaction, typeArgs: [string, string], args: SwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SetDisplayArgs {
  globalConfig: TransactionObjectInput
  publisher: TransactionObjectInput
  string1: string | TransactionArgument
  string2: string | TransactionArgument
  string3: string | TransactionArgument
  string4: string | TransactionArgument
  string5: string | TransactionArgument
  string6: string | TransactionArgument
}

export function setDisplay(tx: Transaction, typeArgs: [string, string], args: SetDisplayArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::set_display`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.publisher),
      pure(tx, args.string1, `${String.$typeName}`),
      pure(tx, args.string2, `${String.$typeName}`),
      pure(tx, args.string3, `${String.$typeName}`),
      pure(tx, args.string4, `${String.$typeName}`),
      pure(tx, args.string5, `${String.$typeName}`),
      pure(tx, args.string6, `${String.$typeName}`),
    ],
  })
}

export interface OpenPositionArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  u321: number | TransactionArgument
  u322: number | TransactionArgument
}

export function openPosition(tx: Transaction, typeArgs: [string, string], args: OpenPositionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::open_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u322, `u32`),
    ],
  })
}

export interface ClosePositionArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function addLiquidity(tx: Transaction, typeArgs: [string, string], args: AddLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayAddLiquidityArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  addLiquidityReceipt: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
}

export function repayAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayAddLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::repay_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.addLiquidityReceipt),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
    ],
  })
}

export interface RemoveLiquidityArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  u128: bigint | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      pure(tx, args.u128, `u128`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface CollectFeeArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
}

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
    ],
  })
}

export interface CollectRewardArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  rewarderGlobalVault: TransactionObjectInput
  coin: TransactionObjectInput
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.rewarderGlobalVault),
      obj(tx, args.coin),
      obj(tx, args.clock),
    ],
  })
}

export interface CollectProtocolFeeArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
}

export function collectProtocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectProtocolFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::collect_protocol_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
    ],
  })
}

export interface InitializeRewarderArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
}

export function initializeRewarder(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: InitializeRewarderArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::initialize_rewarder`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.pool)],
  })
}

export interface UpdatePositionUrlArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  string: string | TransactionArgument
}

export function updatePositionUrl(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdatePositionUrlArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::update_position_url`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.string, `${String.$typeName}`),
    ],
  })
}

export interface UpdateFeeRateArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function updateFeeRate(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateFeeRateArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::update_fee_rate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.pool), pure(tx, args.u64, `u64`)],
  })
}

export interface CreatePoolArgs {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  u32: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  clock: TransactionObjectInput
}

export function createPool(tx: Transaction, typeArgs: [string, string], args: CreatePoolArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::create_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      pure(tx, args.u32, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolWithLiquidityArgs {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  u321: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  u322: number | TransactionArgument
  u323: number | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.u322, `u32`),
      pure(tx, args.u323, `u32`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapA2bArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapA2b(tx: Transaction, typeArgs: [string, string], args: SwapA2bArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::swap_a2b`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapB2aArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapB2a(tx: Transaction, typeArgs: [string, string], args: SwapB2aArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::swap_b2a`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapA2bWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.partner),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapB2aWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.partner),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface UpdateRewarderEmissionArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  rewarderGlobalVault: TransactionObjectInput
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.rewarderGlobalVault),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface PausePoolArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
}

export function pausePool(tx: Transaction, typeArgs: [string, string], args: PausePoolArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::pause_pool`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.pool)],
  })
}

export interface UnpausePoolArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
}

export function unpausePool(tx: Transaction, typeArgs: [string, string], args: UnpausePoolArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::unpause_pool`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.pool)],
  })
}

export interface SwapWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script_v2::swap_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.partner),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface OpenPositionWithLiquidityArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  u321: number | TransactionArgument
  u322: number | TransactionArgument
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u322, `u32`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface OpenPositionWithLiquidityByFixCoinArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  u321: number | TransactionArgument
  u322: number | TransactionArgument
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u322, `u32`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityByFixCoinArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}
