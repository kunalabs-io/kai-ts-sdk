import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AddLiquidityArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function addLiquidity(tx: Transaction, typeArgs: [string, string], args: AddLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.deltaLiquidity, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityFixCoinArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  amount: bigint | TransactionArgument
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function addLiquidityFixCoin(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityFixCoinArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::add_liquidity_fix_coin`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.amount, `u64`),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export function addLiquidityPayAmount(
  tx: Transaction,
  typeArgs: [string, string],
  receipt: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::add_liquidity_pay_amount`,
    typeArguments: typeArgs,
    arguments: [obj(tx, receipt)],
  })
}

export function balances(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::balances`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface BorrowPositionInfoArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function borrowPositionInfo(
  tx: Transaction,
  typeArgs: [string, string],
  args: BorrowPositionInfoArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::borrow_position_info`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface BorrowTickArgs {
  pool: TransactionObjectInput
  tickIdx: TransactionObjectInput
}

export function borrowTick(tx: Transaction, typeArgs: [string, string], args: BorrowTickArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::borrow_tick`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), obj(tx, args.tickIdx)],
  })
}

export interface CalculateAndUpdateFeeArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function calculateAndUpdateFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateAndUpdateFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculate_and_update_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
    ],
  })
}

export interface CalculateAndUpdatePointsArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
  clock: TransactionObjectInput
}

export function calculateAndUpdatePoints(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateAndUpdatePointsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculate_and_update_points`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalculateAndUpdateRewardArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
  clock: TransactionObjectInput
}

export function calculateAndUpdateReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: CalculateAndUpdateRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculate_and_update_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalculateAndUpdateRewardsArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
  clock: TransactionObjectInput
}

export function calculateAndUpdateRewards(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateAndUpdateRewardsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculate_and_update_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.positionId, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalculateSwapResultArgs {
  pool: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
}

export function calculateSwapResult(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalculateSwapResultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculate_swap_result`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export function calculateSwapResultStepResults(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculate_swap_result_step_results`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

export function calculatedSwapResultAfterSqrtPrice(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculated_swap_result_after_sqrt_price`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

export function calculatedSwapResultAmountIn(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculated_swap_result_amount_in`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

export function calculatedSwapResultAmountOut(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculated_swap_result_amount_out`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

export function calculatedSwapResultFeeAmount(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculated_swap_result_fee_amount`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

export function calculatedSwapResultIsExceed(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculated_swap_result_is_exceed`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

export interface CalculatedSwapResultStepSwapResultArgs {
  calculatedSwapResult: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function calculatedSwapResultStepSwapResult(
  tx: Transaction,
  args: CalculatedSwapResultStepSwapResultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculated_swap_result_step_swap_result`,
    arguments: [obj(tx, args.calculatedSwapResult), pure(tx, args.index, `u64`)],
  })
}

export function calculatedSwapResultStepsLength(
  tx: Transaction,
  calculatedSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::calculated_swap_result_steps_length`,
    arguments: [obj(tx, calculatedSwapResult)],
  })
}

export interface ClosePositionArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
}

export function closePosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClosePositionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::close_position`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.config), obj(tx, args.pool), obj(tx, args.positionNft)],
  })
}

export interface CollectFeeArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  recalculate: boolean | TransactionArgument
}

export function collectFee(tx: Transaction, typeArgs: [string, string], args: CollectFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.recalculate, `bool`),
    ],
  })
}

export interface CollectProtocolFeeArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
}

export function collectProtocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: CollectProtocolFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::collect_protocol_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.config), obj(tx, args.pool)],
  })
}

export interface CollectRewardArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  vault: TransactionObjectInput
  recalculate: boolean | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      obj(tx, args.vault),
      pure(tx, args.recalculate, `bool`),
      obj(tx, args.clock),
    ],
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

export function feeRate(tx: Transaction, typeArgs: [string, string], pool: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::fee_rate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function feesGrowthGlobal(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::fees_growth_global`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface FetchPositionsArgs {
  pool: TransactionObjectInput
  start: Array<string | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

export function fetchPositions(
  tx: Transaction,
  typeArgs: [string, string],
  args: FetchPositionsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::fetch_positions`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.start, `vector<${ID.$typeName}>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

export interface FetchTicksArgs {
  pool: TransactionObjectInput
  start: Array<number | TransactionArgument> | TransactionArgument
  limit: bigint | TransactionArgument
}

export function fetchTicks(tx: Transaction, typeArgs: [string, string], args: FetchTicksArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::fetch_ticks`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.start, `vector<u32>`),
      pure(tx, args.limit, `u64`),
    ],
  })
}

export interface FlashLoanArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  loanA: boolean | TransactionArgument
  amount: bigint | TransactionArgument
}

export function flashLoan(tx: Transaction, typeArgs: [string, string], args: FlashLoanArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::flash_loan`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.loanA, `bool`),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface FlashLoanWithPartnerArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  loanA: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function flashLoanWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashLoanWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::flash_loan_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.partner),
      pure(tx, args.loanA, `bool`),
      pure(tx, args.amount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface FlashSwapArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  sqrtPriceLimit: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function flashSwap(tx: Transaction, typeArgs: [string, string], args: FlashSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::flash_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.sqrtPriceLimit, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface FlashSwapWithPartnerArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
  amount: bigint | TransactionArgument
  sqrtPriceLimit: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function flashSwapWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: FlashSwapWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::flash_swap_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.partner),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.sqrtPriceLimit, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface GetAmountByLiquidityArgs {
  tickLower: TransactionObjectInput
  tickUpper: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  currentSqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

export function getAmountByLiquidity(tx: Transaction, args: GetAmountByLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_amount_by_liquidity`,
    arguments: [
      obj(tx, args.tickLower),
      obj(tx, args.tickUpper),
      obj(tx, args.currentTickIndex),
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface GetFeeInTickRangeArgs {
  pool: TransactionObjectInput
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

export function getFeeInTickRange(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetFeeInTickRangeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_fee_in_tick_range`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), obj(tx, args.tickLowerIndex), obj(tx, args.tickUpperIndex)],
  })
}

export interface GetFeeRewardsPointsInTickRangeArgs {
  pool: TransactionObjectInput
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

export function getFeeRewardsPointsInTickRange(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetFeeRewardsPointsInTickRangeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_fee_rewards_points_in_tick_range`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), obj(tx, args.tickLowerIndex), obj(tx, args.tickUpperIndex)],
  })
}

export interface GetLiquidityFromAmountArgs {
  lowerIndex: TransactionObjectInput
  upperIndex: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  currentSqrtPrice: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  isFixedA: boolean | TransactionArgument
}

export function getLiquidityFromAmount(tx: Transaction, args: GetLiquidityFromAmountArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_liquidity_from_amount`,
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

export interface GetPointsInTickRangeArgs {
  pool: TransactionObjectInput
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

export function getPointsInTickRange(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPointsInTickRangeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_points_in_tick_range`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), obj(tx, args.tickLowerIndex), obj(tx, args.tickUpperIndex)],
  })
}

export interface GetPositionAmountsArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function getPositionAmounts(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionAmountsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_position_amounts`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface GetPositionFeeArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function getPositionFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionFeeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_position_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface GetPositionPointsArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function getPositionPoints(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionPointsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_position_points`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface GetPositionRewardArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function getPositionReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: GetPositionRewardArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_position_reward`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface GetPositionRewardsArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function getPositionRewards(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetPositionRewardsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_position_rewards`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface GetRewardsInTickRangeArgs {
  pool: TransactionObjectInput
  tickLowerIndex: TransactionObjectInput
  tickUpperIndex: TransactionObjectInput
}

export function getRewardsInTickRange(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetRewardsInTickRangeArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::get_rewards_in_tick_range`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), obj(tx, args.tickLowerIndex), obj(tx, args.tickUpperIndex)],
  })
}

export function index(tx: Transaction, typeArgs: [string, string], pool: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::index`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function init(tx: Transaction, otw: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::pool::init`, arguments: [obj(tx, otw)] })
}

export interface InitializeRewarderArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
}

export function initializeRewarder(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: InitializeRewarderArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::initialize_rewarder`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.config), obj(tx, args.pool)],
  })
}

export function isPause(tx: Transaction, typeArgs: [string, string], pool: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::is_pause`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface IsPositionExistArgs {
  pool: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function isPositionExist(
  tx: Transaction,
  typeArgs: [string, string],
  args: IsPositionExistArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::is_position_exist`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.pool), pure(tx, args.positionId, `${ID.$typeName}`)],
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

export interface NewArgs {
  tickSpacing: number | TransactionArgument
  initSqrtPrice: bigint | TransactionArgument
  feeRate: bigint | TransactionArgument
  url: string | TransactionArgument
  index: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function new_(tx: Transaction, typeArgs: [string, string], args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::new`,
    typeArguments: typeArgs,
    arguments: [
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initSqrtPrice, `u128`),
      pure(tx, args.feeRate, `u64`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.index, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface OpenPositionArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  tickLower: number | TransactionArgument
  tickUpper: number | TransactionArgument
}

export function openPosition(tx: Transaction, typeArgs: [string, string], args: OpenPositionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::open_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.tickLower, `u32`),
      pure(tx, args.tickUpper, `u32`),
    ],
  })
}

export interface PauseArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
}

export function pause(tx: Transaction, typeArgs: [string, string], args: PauseArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::pause`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.config), obj(tx, args.pool)],
  })
}

export function positionManager(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::position_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function protocolFee(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::protocol_fee`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function refFeeAmount(
  tx: Transaction,
  typeArgs: [string, string],
  receipt: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::ref_fee_amount`,
    typeArguments: typeArgs,
    arguments: [obj(tx, receipt)],
  })
}

export interface RemoveLiquidityArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  positionNft: TransactionObjectInput
  deltaLiquidity: bigint | TransactionArgument
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
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.positionNft),
      pure(tx, args.deltaLiquidity, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayAddLiquidityArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function repayAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayAddLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::repay_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      obj(tx, args.receipt),
    ],
  })
}

export interface RepayFlashLoanArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function repayFlashLoan(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayFlashLoanArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::repay_flash_loan`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      obj(tx, args.receipt),
    ],
  })
}

export interface RepayFlashLoanWithPartnerArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  balanceA: TransactionObjectInput
  balanceB: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function repayFlashLoanWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayFlashLoanWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::repay_flash_loan_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.partner),
      obj(tx, args.balanceA),
      obj(tx, args.balanceB),
      obj(tx, args.receipt),
    ],
  })
}

export interface RepayFlashSwapArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
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
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.receipt),
    ],
  })
}

export interface RepayFlashSwapWithPartnerArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function repayFlashSwapWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayFlashSwapWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::repay_flash_swap_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.partner),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.receipt),
    ],
  })
}

export function rewarderManager(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::rewarder_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface SetDisplayArgs {
  config: TransactionObjectInput
  publisher: TransactionObjectInput
  name: string | TransactionArgument
  description: string | TransactionArgument
  url: string | TransactionArgument
  link: string | TransactionArgument
  website: string | TransactionArgument
  creator: string | TransactionArgument
}

export function setDisplay(tx: Transaction, typeArgs: [string, string], args: SetDisplayArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::set_display`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.publisher),
      pure(tx, args.name, `${String.$typeName}`),
      pure(tx, args.description, `${String.$typeName}`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.link, `${String.$typeName}`),
      pure(tx, args.website, `${String.$typeName}`),
      pure(tx, args.creator, `${String.$typeName}`),
    ],
  })
}

export function stepSwapResultAmountIn(tx: Transaction, stepSwapResult: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::step_swap_result_amount_in`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

export function stepSwapResultAmountOut(tx: Transaction, stepSwapResult: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::step_swap_result_amount_out`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

export function stepSwapResultCurrentLiquidity(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::step_swap_result_current_liquidity`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

export function stepSwapResultCurrentSqrtPrice(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::step_swap_result_current_sqrt_price`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

export function stepSwapResultFeeAmount(tx: Transaction, stepSwapResult: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::step_swap_result_fee_amount`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

export function stepSwapResultRemainderAmount(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::step_swap_result_remainder_amount`,
    arguments: [obj(tx, stepSwapResult)],
  })
}

export function stepSwapResultTargetSqrtPrice(
  tx: Transaction,
  stepSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::step_swap_result_target_sqrt_price`,
    arguments: [obj(tx, stepSwapResult)],
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

export function tickManager(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::tick_manager`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export function tickSpacing(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::tick_spacing`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface UnpauseArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
}

export function unpause(tx: Transaction, typeArgs: [string, string], args: UnpauseArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::unpause`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.config), obj(tx, args.pool)],
  })
}

export interface UpdateEmissionArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  vault: TransactionObjectInput
  emissionsPerSecond: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function updateEmission(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: UpdateEmissionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::update_emission`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.vault),
      pure(tx, args.emissionsPerSecond, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface UpdateFeeRateArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  feeRate: bigint | TransactionArgument
}

export function updateFeeRate(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateFeeRateArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::update_fee_rate`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.config), obj(tx, args.pool), pure(tx, args.feeRate, `u64`)],
  })
}

export interface UpdatePositionUrlArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  url: string | TransactionArgument
}

export function updatePositionUrl(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdatePositionUrlArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::update_position_url`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      pure(tx, args.url, `${String.$typeName}`),
    ],
  })
}

export function url(tx: Transaction, typeArgs: [string, string], pool: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool::url`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}
