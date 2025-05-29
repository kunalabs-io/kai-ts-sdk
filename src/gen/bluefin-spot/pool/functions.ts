import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePoolArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  poolName: Array<number | TransactionArgument> | TransactionArgument
  iconUrl: Array<number | TransactionArgument> | TransactionArgument
  coinASymbol: Array<number | TransactionArgument> | TransactionArgument
  coinADecimals: number | TransactionArgument
  coinAUrl: Array<number | TransactionArgument> | TransactionArgument
  coinBSymbol: Array<number | TransactionArgument> | TransactionArgument
  coinBDecimals: number | TransactionArgument
  coinBUrl: Array<number | TransactionArgument> | TransactionArgument
  tickSpacing: number | TransactionArgument
  feeRate: bigint | TransactionArgument
  currentSqrtPrice: bigint | TransactionArgument
  creationFee: TransactionObjectInput
}

export function createPool(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CreatePoolArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::create_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      pure(tx, args.poolName, `vector<u8>`),
      pure(tx, args.iconUrl, `vector<u8>`),
      pure(tx, args.coinASymbol, `vector<u8>`),
      pure(tx, args.coinADecimals, `u8`),
      pure(tx, args.coinAUrl, `vector<u8>`),
      pure(tx, args.coinBSymbol, `vector<u8>`),
      pure(tx, args.coinBDecimals, `u8`),
      pure(tx, args.coinBUrl, `vector<u8>`),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.feeRate, `u64`),
      pure(tx, args.currentSqrtPrice, `u128`),
      obj(tx, args.creationFee),
    ],
  })
}

export interface CreatePoolWithLiquidityArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  poolName: Array<number | TransactionArgument> | TransactionArgument
  iconUrl: Array<number | TransactionArgument> | TransactionArgument
  coinASymbol: Array<number | TransactionArgument> | TransactionArgument
  coinADecimals: number | TransactionArgument
  coinAUrl: Array<number | TransactionArgument> | TransactionArgument
  coinBSymbol: Array<number | TransactionArgument> | TransactionArgument
  coinBDecimals: number | TransactionArgument
  coinBUrl: Array<number | TransactionArgument> | TransactionArgument
  tickSpacing: number | TransactionArgument
  feeRate: bigint | TransactionArgument
  currentSqrtPrice: bigint | TransactionArgument
  creationFee: TransactionObjectInput
  lowerTickBits: number | TransactionArgument
  upperTickBits: number | TransactionArgument
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  amount: bigint | TransactionArgument
  isFixedA: boolean | TransactionArgument
}

export function createPoolWithLiquidity(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CreatePoolWithLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::create_pool_with_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      pure(tx, args.poolName, `vector<u8>`),
      pure(tx, args.iconUrl, `vector<u8>`),
      pure(tx, args.coinASymbol, `vector<u8>`),
      pure(tx, args.coinADecimals, `u8`),
      pure(tx, args.coinAUrl, `vector<u8>`),
      pure(tx, args.coinBSymbol, `vector<u8>`),
      pure(tx, args.coinBDecimals, `u8`),
      pure(tx, args.coinBUrl, `vector<u8>`),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.feeRate, `u64`),
      pure(tx, args.currentSqrtPrice, `u128`),
      obj(tx, args.creationFee),
      pure(tx, args.lowerTickBits, `u32`),
      pure(tx, args.upperTickBits, `u32`),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      pure(tx, args.amount, `u64`),
      pure(tx, args.isFixedA, `bool`),
    ],
  })
}

export interface AddLiquidityArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  liquidity: bigint | TransactionArgument
}

export function addLiquidity(tx: Transaction, typeArgs: [string, string], args: AddLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      pure(tx, args.liquidity, `u128`),
    ],
  })
}

export interface AddLiquidityWithFixedAmountArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  amount: bigint | TransactionArgument
  isFixedA: boolean | TransactionArgument
}

export function addLiquidityWithFixedAmount(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityWithFixedAmountArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::add_liquidity_with_fixed_amount`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      pure(tx, args.amount, `u64`),
      pure(tx, args.isFixedA, `bool`),
    ],
  })
}

export interface RemoveLiquidityArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
  liquidity: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function removeLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::remove_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
      pure(tx, args.liquidity, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  amountLimit: bigint | TransactionArgument
  sqrtPriceMaxLimit: bigint | TransactionArgument
}

export function swap(tx: Transaction, typeArgs: [string, string], args: SwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.amountLimit, `u64`),
      pure(tx, args.sqrtPriceMaxLimit, `u128`),
    ],
  })
}

export interface CalculateSwapResultsArgs {
  pool: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  sqrtPriceMaxLimit: bigint | TransactionArgument
}

export function calculateSwapResults(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateSwapResultsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculate_swap_results`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.sqrtPriceMaxLimit, `u128`),
    ],
  })
}

export interface FlashSwapArgs {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  sqrtPriceMaxLimit: bigint | TransactionArgument
}

export function flashSwap(tx: Transaction, typeArgs: [string, string], args: FlashSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::flash_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.sqrtPriceMaxLimit, `u128`),
    ],
  })
}

export interface RepayFlashSwapArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function repayFlashSwap(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayFlashSwapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::repay_flash_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      obj(tx, args.receipt),
    ],
  })
}

export interface OpenPositionArgs {
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  lowerTickBits: number | TransactionArgument
  upperTickBits: number | TransactionArgument
}

export function openPosition(tx: Transaction, typeArgs: [string, string], args: OpenPositionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::open_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      pure(tx, args.lowerTickBits, `u32`),
      pure(tx, args.upperTickBits, `u32`),
    ],
  })
}

export interface ClosePositionV2Args {
  clock: TransactionObjectInput
  protocolConfig: TransactionObjectInput
  pool: TransactionObjectInput
  position: TransactionObjectInput
}

export function closePositionV2(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClosePositionV2Args
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::close_position_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
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
    target: `${PUBLISHED_AT}::pool::collect_fee`,
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
    target: `${PUBLISHED_AT}::pool::collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.clock),
      obj(tx, args.protocolConfig),
      obj(tx, args.pool),
      obj(tx, args.position),
    ],
  })
}

export function swapPayAmount(
  tx: Transaction,
  typeArgs: [string, string],
  receipt: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::swap_pay_amount`,
    typeArguments: typeArgs,
    arguments: [obj(tx, receipt)],
  })
}

export function getPoolManager(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_pool_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function getProtocolFeeForCoinA(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_protocol_fee_for_coin_a`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function getProtocolFeeForCoinB(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_protocol_fee_for_coin_b`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function liquidity(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::liquidity`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function currentSqrtPrice(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::current_sqrt_price`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function currentTickIndex(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::current_tick_index`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function sequenceNumber(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::sequence_number`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface VerifyPoolManagerArgs {
  pool: TransactionObjectInput
  manager: string | TransactionArgument
}

export function verifyPoolManager(
  tx: Transaction,
  typeArgs: [string, string],
  args: VerifyPoolManagerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::verify_pool_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.manager, `address`)],
  })
}

export function coinReserves(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::coin_reserves`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function protocolFeeShare(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::protocol_fee_share`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function rewardInfosLength(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::reward_infos_length`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function isRewardPresent(
  tx: Transaction,
  typeArgs: [string, string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::is_reward_present`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function getTickManager(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_tick_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface FetchProvidedTicksArgs {
  pool: TransactionObjectInput
  ticks: Array<number | TransactionArgument> | TransactionArgument
}

export function fetchProvidedTicks(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchProvidedTicksArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::fetch_provided_ticks`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.ticks, `vector<u32>`)],
  })
}

export function getFeeRate(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_fee_rate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function getTickSpacing(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_tick_spacing`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function getSwapResultA2b(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_a2b`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultByAmountIn(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_by_amount_in`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultAmountSpecified(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_amount_specified`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultAmountSpecifiedRemaining(
  tx: Transaction,
  result: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_amount_specified_remaining`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultAmountCalculated(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_amount_calculated`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultFeeGrowthGlobal(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_fee_growth_global`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultFeeAmount(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_fee_amount`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultProtocolFee(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_protocol_fee`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultStartSqrtPrice(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_start_sqrt_price`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultEndSqrtPrice(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_end_sqrt_price`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultCurrentTickIndex(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_current_tick_index`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultIsExceed(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_is_exceed`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultStartingLiquidity(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_starting_liquidity`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultLiquidity(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_liquidity`,
    arguments: [obj(tx, result)],
  })
}

export function getSwapResultSteps(tx: Transaction, result: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_swap_result_steps`,
    arguments: [obj(tx, result)],
  })
}

export interface GetLiquidityByAmountArgs {
  lowerIndex: TransactionObjectInput
  upperIndex: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  currentSqrtPrice: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  isFixedA: boolean | TransactionArgument
}

export function getLiquidityByAmount(tx: Transaction, args: GetLiquidityByAmountArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_liquidity_by_amount`,
    arguments: [
      obj(tx, args.lowerIndex),
      obj(tx, args.upperIndex),
      obj(tx, args.currentTickIndex),
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.isFixedA, `bool`),
    ],
  })
}

export interface GetAmountByLiquidityArgs {
  lowerIndex: TransactionObjectInput
  upperIndex: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  currentSqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

export function getAmountByLiquidity(tx: Transaction, args: GetAmountByLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_amount_by_liquidity`,
    arguments: [
      obj(tx, args.lowerIndex),
      obj(tx, args.upperIndex),
      obj(tx, args.currentTickIndex),
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}
