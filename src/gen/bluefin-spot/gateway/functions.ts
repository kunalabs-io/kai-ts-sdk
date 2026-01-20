import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface CreatePoolArgs {
  clock: TransactionObjectInput
  vecU81: Array<number | TransactionArgument> | TransactionArgument
  vecU82: Array<number | TransactionArgument> | TransactionArgument
  vecU83: Array<number | TransactionArgument> | TransactionArgument
  u81: number | TransactionArgument
  vecU84: Array<number | TransactionArgument> | TransactionArgument
  vecU85: Array<number | TransactionArgument> | TransactionArgument
  u82: number | TransactionArgument
  vecU86: Array<number | TransactionArgument> | TransactionArgument
  u32: number | TransactionArgument
  u64: bigint | TransactionArgument
  u128: bigint | TransactionArgument
}

/** Creates a pool */
export function createPool(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::create_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      pure(tx, args.vecU81, `vector<u8>`),
      pure(tx, args.vecU82, `vector<u8>`),
      pure(tx, args.vecU83, `vector<u8>`),
      pure(tx, args.u81, `u8`),
      pure(tx, args.vecU84, `vector<u8>`),
      pure(tx, args.vecU85, `vector<u8>`),
      pure(tx, args.u82, `u8`),
      pure(tx, args.vecU86, `vector<u8>`),
      pure(tx, args.u32, `u32`),
      pure(tx, args.u64, `u64`),
      pure(tx, args.u128, `u128`),
    ],
  })
}

export interface CreatePoolV2Args {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  poolName: Array<number | TransactionArgument> | TransactionArgument
  poolIconUrl: Array<number | TransactionArgument> | TransactionArgument
  coinASymbol: Array<number | TransactionArgument> | TransactionArgument
  coinADecimals: number | TransactionArgument
  coinAUrl: Array<number | TransactionArgument> | TransactionArgument
  coinBSymbol: Array<number | TransactionArgument> | TransactionArgument
  coinBDecimals: number | TransactionArgument
  coinBUrl: Array<number | TransactionArgument> | TransactionArgument
  tickSpacing: number | TransactionArgument
  feeBasisPoints: bigint | TransactionArgument
  currentSqrtPrice: bigint | TransactionArgument
  creationFee: TransactionObjectInput
}

export function createPoolV2(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CreatePoolV2Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::create_pool_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      pure(tx, args.poolName, `vector<u8>`),
      pure(tx, args.poolIconUrl, `vector<u8>`),
      pure(tx, args.coinASymbol, `vector<u8>`),
      pure(tx, args.coinADecimals, `u8`),
      pure(tx, args.coinAUrl, `vector<u8>`),
      pure(tx, args.coinBSymbol, `vector<u8>`),
      pure(tx, args.coinBDecimals, `u8`),
      pure(tx, args.coinBUrl, `vector<u8>`),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.feeBasisPoints, `u64`),
      pure(tx, args.currentSqrtPrice, `u128`),
      obj(tx, args.creationFee),
    ],
  })
}

export interface ProvideLiquidityArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  coinAMin: bigint | TransactionArgument
  coinBMin: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
}

export function provideLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: ProvideLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::provide_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      pure(tx, args.coinAMin, `u64`),
      pure(tx, args.coinBMin, `u64`),
      pure(tx, args.liquidity, `u128`),
    ],
  })
}

export interface ProvideLiquidityWithFixedAmountArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  amount: bigint | TransactionArgument
  coinAMax: bigint | TransactionArgument
  coinBMax: bigint | TransactionArgument
  isFixedA: boolean | TransactionArgument
}

export function provideLiquidityWithFixedAmount(
  tx: Transaction,
  typeArgs: [string, string],
  args: ProvideLiquidityWithFixedAmountArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::provide_liquidity_with_fixed_amount`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      pure(tx, args.amount, `u64`),
      pure(tx, args.coinAMax, `u64`),
      pure(tx, args.coinBMax, `u64`),
      pure(tx, args.isFixedA, `bool`),
    ],
  })
}

export interface RemoveLiquidityArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  liquidity: bigint | TransactionArgument
  minCoinsA: bigint | TransactionArgument
  minCoinsB: bigint | TransactionArgument
  transferCoinsTo: string | TransactionArgument
}

export function removeLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::remove_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.minCoinsA, `u64`),
      pure(tx, args.minCoinsB, `u64`),
      pure(tx, args.transferCoinsTo, `address`),
    ],
  })
}

export interface ClosePositionArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  transferCoinsTo: string | TransactionArgument
}

export function closePosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClosePositionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::close_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      pure(tx, args.transferCoinsTo, `address`),
    ],
  })
}

export interface SwapAssetsArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  amountLimit: bigint | TransactionArgument
  sqrtPriceMaxLimit: bigint | TransactionArgument
}

/** Performs swap on the pool */
export function swapAssets(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapAssetsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::swap_assets`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.amountLimit, `u64`),
      pure(tx, args.sqrtPriceMaxLimit, `u128`),
    ],
  })
}

export interface FlashSwapArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  amountLimit: bigint | TransactionArgument
  sqrtPriceMaxLimit: bigint | TransactionArgument
}

/** Sample flash swap call */
export function flashSwap(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashSwapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::flash_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.amountLimit, `u64`),
      pure(tx, args.sqrtPriceMaxLimit, `u128`),
    ],
  })
}

export interface CollectFeeArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
}

/** Allows user to collect the fees accrued on their position */
export function collectFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
    ],
  })
}

export interface CollectRewardArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
}

/**
 * Allows user to collect the rewards accrued on their position
 * Reverts if the reward accrued amount is zero
 */
export function collectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CollectRewardArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
    ],
  })
}

export interface RouteSwapArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  middleStep: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  amountLimit: bigint | TransactionArgument
  sqrtPriceMaxLimit: bigint | TransactionArgument
}

/** Function to perform swap in a route */
export function routeSwap(
  tx: Transaction,
  typeArgs: [string, string],
  args: RouteSwapArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::gateway::route_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.middleStep, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.amountLimit, `u64`),
      pure(tx, args.sqrtPriceMaxLimit, `u128`),
    ],
  })
}
