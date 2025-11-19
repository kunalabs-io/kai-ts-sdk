import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

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

export function createPool(tx: Transaction, typeArgs: [string, string], args: CreatePoolArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::create_pool`,
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
  args: CreatePoolV2Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::create_pool_v2`,
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
  args: ProvideLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::provide_liquidity`,
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
  args: ProvideLiquidityWithFixedAmountArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::provide_liquidity_with_fixed_amount`,
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
  args: RemoveLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::remove_liquidity`,
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
  args: ClosePositionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::close_position`,
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

export function swapAssets(tx: Transaction, typeArgs: [string, string], args: SwapAssetsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::swap_assets`,
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

export function flashSwap(tx: Transaction, typeArgs: [string, string], args: FlashSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::flash_swap`,
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

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::collect_fee`,
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

export function collectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CollectRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::collect_reward`,
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

export function routeSwap(tx: Transaction, typeArgs: [string, string], args: RouteSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::gateway::route_swap`,
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
