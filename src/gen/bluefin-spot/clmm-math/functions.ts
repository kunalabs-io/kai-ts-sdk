import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function feeRateDenominator(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::fee_rate_denominator`,
    arguments: [],
  })
}

export interface GetLiquidityFromAArgs {
  sqrtPrice0: bigint | TransactionArgument
  sqrtPrice1: bigint | TransactionArgument
  amountA: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

export function getLiquidityFromA(tx: Transaction, args: GetLiquidityFromAArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_liquidity_from_a`,
    arguments: [
      pure(tx, args.sqrtPrice0, `u128`),
      pure(tx, args.sqrtPrice1, `u128`),
      pure(tx, args.amountA, `u64`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface GetLiquidityFromBArgs {
  sqrtPrice0: bigint | TransactionArgument
  sqrtPrice1: bigint | TransactionArgument
  amountB: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

export function getLiquidityFromB(tx: Transaction, args: GetLiquidityFromBArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_liquidity_from_b`,
    arguments: [
      pure(tx, args.sqrtPrice0, `u128`),
      pure(tx, args.sqrtPrice1, `u128`),
      pure(tx, args.amountB, `u64`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface GetDeltaAArgs {
  sqrtPrice0: bigint | TransactionArgument
  sqrtPrice1: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

export function getDeltaA(tx: Transaction, args: GetDeltaAArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_delta_a`,
    arguments: [
      pure(tx, args.sqrtPrice0, `u128`),
      pure(tx, args.sqrtPrice1, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface GetDeltaBArgs {
  sqrtPrice0: bigint | TransactionArgument
  sqrtPrice1: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

export function getDeltaB(tx: Transaction, args: GetDeltaBArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_delta_b`,
    arguments: [
      pure(tx, args.sqrtPrice0, `u128`),
      pure(tx, args.sqrtPrice1, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface GetNextSqrtPriceAUpArgs {
  sqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  byAmountInput: boolean | TransactionArgument
}

export function getNextSqrtPriceAUp(
  tx: Transaction,
  args: GetNextSqrtPriceAUpArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_next_sqrt_price_a_up`,
    arguments: [
      pure(tx, args.sqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.byAmountInput, `bool`),
    ],
  })
}

export interface GetNextSqrtPriceBDownArgs {
  sqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  byAmountInput: boolean | TransactionArgument
}

export function getNextSqrtPriceBDown(
  tx: Transaction,
  args: GetNextSqrtPriceBDownArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_next_sqrt_price_b_down`,
    arguments: [
      pure(tx, args.sqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.byAmountInput, `bool`),
    ],
  })
}

export interface GetNextSqrtPriceFromInputArgs {
  sqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  aToB: boolean | TransactionArgument
}

export function getNextSqrtPriceFromInput(
  tx: Transaction,
  args: GetNextSqrtPriceFromInputArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_next_sqrt_price_from_input`,
    arguments: [
      pure(tx, args.sqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.aToB, `bool`),
    ],
  })
}

export interface GetNextSqrtPriceFromOutputArgs {
  sqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  aToB: boolean | TransactionArgument
}

export function getNextSqrtPriceFromOutput(
  tx: Transaction,
  args: GetNextSqrtPriceFromOutputArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_next_sqrt_price_from_output`,
    arguments: [
      pure(tx, args.sqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.aToB, `bool`),
    ],
  })
}

export interface GetDeltaUpFromInputArgs {
  currentSqrtPrice: bigint | TransactionArgument
  targetSqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  aToB: boolean | TransactionArgument
}

export function getDeltaUpFromInput(
  tx: Transaction,
  args: GetDeltaUpFromInputArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_delta_up_from_input`,
    arguments: [
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.targetSqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.aToB, `bool`),
    ],
  })
}

export interface GetDeltaDownFromOutputArgs {
  currentSqrtPrice: bigint | TransactionArgument
  targetSqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  aToB: boolean | TransactionArgument
}

export function getDeltaDownFromOutput(
  tx: Transaction,
  args: GetDeltaDownFromOutputArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_delta_down_from_output`,
    arguments: [
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.targetSqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.aToB, `bool`),
    ],
  })
}

export interface ComputeSwapStepArgs {
  currentSqrtPrice: bigint | TransactionArgument
  targetSqrtPrice: bigint | TransactionArgument
  liquidity: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  feeRate: bigint | TransactionArgument
  a2B: boolean | TransactionArgument
  byAmountIn: boolean | TransactionArgument
}

export function computeSwapStep(tx: Transaction, args: ComputeSwapStepArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::compute_swap_step`,
    arguments: [
      pure(tx, args.currentSqrtPrice, `u128`),
      pure(tx, args.targetSqrtPrice, `u128`),
      pure(tx, args.liquidity, `u128`),
      pure(tx, args.amount, `u64`),
      pure(tx, args.feeRate, `u64`),
      pure(tx, args.a2B, `bool`),
      pure(tx, args.byAmountIn, `bool`),
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

/**
 * Get the coin amount by liquidity
 * Params
 * - tick_lower The liquidity's lower tick
 * - tick_upper The liquidity's upper tick
 * - current_tick_index
 * Returns
 * - amount_a
 * - amount_b
 */
export function getAmountByLiquidity(
  tx: Transaction,
  args: GetAmountByLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_amount_by_liquidity`,
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

export interface GetLiquidityByAmountArgs {
  lowerIndex: TransactionObjectInput
  upperIndex: TransactionObjectInput
  currentTickIndex: TransactionObjectInput
  currentSqrtPrice: bigint | TransactionArgument
  amount: bigint | TransactionArgument
  isFixedA: boolean | TransactionArgument
}

export function getLiquidityByAmount(
  tx: Transaction,
  args: GetLiquidityByAmountArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::clmm_math::get_liquidity_by_amount`,
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
