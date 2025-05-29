import { PUBLISHED_AT } from '..'
import { String } from '../../_dependencies/onchain/0x1/string/structs'
import { Coin } from '../../_dependencies/onchain/0x2/coin/structs'
import { obj, pure, vector } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

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
    target: `${PUBLISHED_AT}::pool_script::create_pool`,
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

export interface CreatePoolWithLiquidityWithAllArgs {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  u321: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  vecCoin1: Array<TransactionObjectInput> | TransactionArgument
  vecCoin2: Array<TransactionObjectInput> | TransactionArgument
  u322: number | TransactionArgument
  u323: number | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin1),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin2),
      pure(tx, args.u322, `u32`),
      pure(tx, args.u323, `u32`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolWithLiquidityOnlyAArgs {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  u321: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u322: number | TransactionArgument
  u323: number | TransactionArgument
  u64: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin),
      pure(tx, args.u322, `u32`),
      pure(tx, args.u323, `u32`),
      pure(tx, args.u64, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolWithLiquidityOnlyBArgs {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  u321: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u322: number | TransactionArgument
  u323: number | TransactionArgument
  u64: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin),
      pure(tx, args.u322, `u32`),
      pure(tx, args.u323, `u32`),
      pure(tx, args.u64, `u64`),
      obj(tx, args.clock),
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
    target: `${PUBLISHED_AT}::pool_script::open_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u322, `u32`),
    ],
  })
}

export interface OpenPositionWithLiquidityWithAllArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  u321: number | TransactionArgument
  u322: number | TransactionArgument
  vecCoin1: Array<TransactionObjectInput> | TransactionArgument
  vecCoin2: Array<TransactionObjectInput> | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u322, `u32`),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin1),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface OpenPositionWithLiquidityOnlyAArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  u321: number | TransactionArgument
  u322: number | TransactionArgument
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u64: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u322, `u32`),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin),
      pure(tx, args.u64, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface OpenPositionWithLiquidityOnlyBArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  u321: number | TransactionArgument
  u322: number | TransactionArgument
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u64: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u322, `u32`),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin),
      pure(tx, args.u64, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityWithAllArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  vecCoin1: Array<TransactionObjectInput> | TransactionArgument
  vecCoin2: Array<TransactionObjectInput> | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin1),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityOnlyAArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u64: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin),
      pure(tx, args.u64, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityOnlyBArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u64: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin),
      pure(tx, args.u64, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityFixCoinWithAllArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  vecCoin1: Array<TransactionObjectInput> | TransactionArgument
  vecCoin2: Array<TransactionObjectInput> | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin1),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityFixCoinOnlyAArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u64: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin),
      pure(tx, args.u64, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityFixCoinOnlyBArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  u64: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin),
      pure(tx, args.u64, `u64`),
      obj(tx, args.clock),
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
    target: `${PUBLISHED_AT}::pool_script::remove_liquidity`,
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
    target: `${PUBLISHED_AT}::pool_script::close_position`,
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

export interface CollectFeeArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
}

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::collect_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.pool), obj(tx, args.position)],
  })
}

export interface CollectRewardArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  rewarderGlobalVault: TransactionObjectInput
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.rewarderGlobalVault),
      obj(tx, args.clock),
    ],
  })
}

export interface CollectProtocolFeeArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
}

export function collectProtocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectProtocolFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::collect_protocol_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.pool)],
  })
}

export interface SwapA2bArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapA2b(tx: Transaction, typeArgs: [string, string], args: SwapA2bArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::swap_a2b`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin),
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
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapB2a(tx: Transaction, typeArgs: [string, string], args: SwapB2aArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::swap_b2a`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin),
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
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
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
    target: `${PUBLISHED_AT}::pool_script::swap_a2b_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.partner),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin),
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
  vecCoin: Array<TransactionObjectInput> | TransactionArgument
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
    target: `${PUBLISHED_AT}::pool_script::swap_b2a_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.partner),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
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
    target: `${PUBLISHED_AT}::pool_script::update_fee_rate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.pool), pure(tx, args.u64, `u64`)],
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
    target: `${PUBLISHED_AT}::pool_script::initialize_rewarder`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.pool)],
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
    target: `${PUBLISHED_AT}::pool_script::update_rewarder_emission`,
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
    target: `${PUBLISHED_AT}::pool_script::pause_pool`,
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
    target: `${PUBLISHED_AT}::pool_script::unpause_pool`,
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
    target: `${PUBLISHED_AT}::pool_script::update_position_url`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      pure(tx, args.string, `${String.$typeName}`),
    ],
  })
}

export interface RepayAddLiquidityArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  addLiquidityReceipt: TransactionObjectInput
  vecCoin1: Array<TransactionObjectInput> | TransactionArgument
  vecCoin2: Array<TransactionObjectInput> | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
}

export function repayAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayAddLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::repay_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.addLiquidityReceipt),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin1),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin2),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
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
    target: `${PUBLISHED_AT}::pool_script::set_display`,
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

export interface SwapArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  vecCoin1: Array<TransactionObjectInput> | TransactionArgument
  vecCoin2: Array<TransactionObjectInput> | TransactionArgument
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swap(tx: Transaction, typeArgs: [string, string], args: SwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_script::swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin1),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin2),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  vecCoin1: Array<TransactionObjectInput> | TransactionArgument
  vecCoin2: Array<TransactionObjectInput> | TransactionArgument
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
    target: `${PUBLISHED_AT}::pool_script::swap_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.partner),
      vector(tx, `${Coin.$typeName}<${typeArgs[0]}>`, args.vecCoin1),
      vector(tx, `${Coin.$typeName}<${typeArgs[1]}>`, args.vecCoin2),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u128, `u128`),
      obj(tx, args.clock),
    ],
  })
}
