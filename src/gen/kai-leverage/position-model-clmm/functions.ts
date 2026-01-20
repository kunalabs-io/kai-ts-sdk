import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface CreateArgs {
  sqrtPaX64: bigint | TransactionArgument
  sqrtPbX64: bigint | TransactionArgument
  l: bigint | TransactionArgument
  cx: bigint | TransactionArgument
  cy: bigint | TransactionArgument
  dx: bigint | TransactionArgument
  dy: bigint | TransactionArgument
}

/** Create a new `PositionModel` from range, liquidity, collateral and debt. */
export function create(tx: Transaction, args: CreateArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::create`,
    arguments: [
      pure(tx, args.sqrtPaX64, `u128`),
      pure(tx, args.sqrtPbX64, `u128`),
      pure(tx, args.l, `u128`),
      pure(tx, args.cx, `u64`),
      pure(tx, args.cy, `u64`),
      pure(tx, args.dx, `u64`),
      pure(tx, args.dy, `u64`),
    ],
  })
}

/** Lower bound price sqrt in Q64.64. */
export function sqrtPaX64(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::sqrt_pa_x64`,
    arguments: [obj(tx, self)],
  })
}

/** Upper bound price sqrt in Q64.64. */
export function sqrtPbX64(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::sqrt_pb_x64`,
    arguments: [obj(tx, self)],
  })
}

/** Current position liquidity. */
export function l(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::l`,
    arguments: [obj(tx, self)],
  })
}

/** Additional collateral in token X (outside LP). */
export function cx(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::cx`,
    arguments: [obj(tx, self)],
  })
}

/** Additional collateral in token Y (outside LP). */
export function cy(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::cy`,
    arguments: [obj(tx, self)],
  })
}

/** Debt amount of token X. */
export function dx(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::dx`,
    arguments: [obj(tx, self)],
  })
}

/** Debt amount of token Y. */
export function dy(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::dy`,
    arguments: [obj(tx, self)],
  })
}

export interface XByLiquidityX64Args {
  self: TransactionObjectInput
  sqrtPX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
}

/**
 * Calculate the amount of X in the LP position for a given price and liquidity.
 *
 * NOTE: This function may not always return a fully precise Q64.64 result.
 * E.g. for very large prices, it can underestimate the amount of X.
 * The maximum absolute error is 1 (2^64), and the maximum relative error is 1/2^64.
 * Any inaccuracy in the result will always underestimate the amount of X (rounds down).
 */
export function xByLiquidityX64(tx: Transaction, args: XByLiquidityX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::x_by_liquidity_x64`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.sqrtPX64, `u128`),
      pure(tx, args.deltaL, `u128`),
    ],
  })
}

export interface YByLiquidityX64Args {
  self: TransactionObjectInput
  sqrtPX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
}

/**
 * Calculate the amount of Y in the LP position for a given price and liquidity.
 * Aborts if there's not enough liquidity in the position.
 */
export function yByLiquidityX64(tx: Transaction, args: YByLiquidityX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::y_by_liquidity_x64`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.sqrtPX64, `u128`),
      pure(tx, args.deltaL, `u128`),
    ],
  })
}

export interface XX64Args {
  self: TransactionObjectInput
  sqrtPX64: bigint | TransactionArgument
}

/** Calculate the amount of X in the LP position for a given price. */
export function xX64(tx: Transaction, args: XX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::x_x64`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.sqrtPX64, `u128`),
    ],
  })
}

export interface YX64Args {
  self: TransactionObjectInput
  sqrtPX64: bigint | TransactionArgument
}

/** Calculate the amount of Y in the LP position for a given price. */
export function yX64(tx: Transaction, args: YX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::y_x64`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.sqrtPX64, `u128`),
    ],
  })
}

export interface AssetsX128Args {
  self: TransactionObjectInput
  pX128: bigint | TransactionArgument
}

/**
 * Calculate the total value of assets for the whole position (incl. LP and collateral)
 * for a given price, expressed in Y.
 */
export function assetsX128(tx: Transaction, args: AssetsX128Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::assets_x128`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.pX128, `u256`),
    ],
  })
}

export interface DebtX128Args {
  self: TransactionObjectInput
  pX128: bigint | TransactionArgument
}

/** Calculate the value of debt for the position for a given price, expressed in Y. */
export function debtX128(tx: Transaction, args: DebtX128Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::debt_x128`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.pX128, `u256`),
    ],
  })
}

export interface MarginX64Args {
  self: TransactionObjectInput
  pX128: bigint | TransactionArgument
}

/**
 * Calculate the margin level for the position at a given price.
 * If the debt is 0, returns `U128_MAX` representing infinite margin.
 */
export function marginX64(tx: Transaction, args: MarginX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::margin_x64`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.pX128, `u256`),
    ],
  })
}

export interface MulX64Args {
  aX64: bigint | TransactionArgument
  bX64: bigint | TransactionArgument
}

export function mulX64(tx: Transaction, args: MulX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::mul_x64`,
    arguments: [
      pure(tx, args.aX64, `u128`),
      pure(tx, args.bX64, `u128`),
    ],
  })
}

export interface SqrtPlX64Args {
  sqrtPX64: bigint | TransactionArgument
  deltaBps: number | TransactionArgument
}

/** Calculate the price that is delta bps away from the given price (lower bound). */
export function sqrtPlX64(tx: Transaction, args: SqrtPlX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::sqrt_pl_x64`,
    arguments: [
      pure(tx, args.sqrtPX64, `u128`),
      pure(tx, args.deltaBps, `u16`),
    ],
  })
}

export interface SqrtPhX64Args {
  sqrtPX64: bigint | TransactionArgument
  deltaBps: number | TransactionArgument
}

/** Calculate the price that is delta bps away from the given price (upper bound). */
export function sqrtPhX64(tx: Transaction, args: SqrtPhX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::sqrt_ph_x64`,
    arguments: [
      pure(tx, args.sqrtPX64, `u128`),
      pure(tx, args.deltaBps, `u16`),
    ],
  })
}

export interface CalcMaxDeleverageDeltaLArgs {
  position: TransactionObjectInput
  pX128: bigint | TransactionArgument
  deleverageMarginBps: number | TransactionArgument
  baseDeleverageFactorBps: number | TransactionArgument
}

/**
 * Calculate the `l` by which the LP position must be reduced so that the margin level goes above
 * the deleverage threshold after debt repayment w.r.t. the `base_deleverage_factor`.
 * It assumes that conversion between X and Y is not done, so `dx` is only repaid using available
 * `cx` and the X amounts from the LP position, and same for Y.
 *
 * The `l` is calculated so that the position reaches a target margin level after the debt
 * repayment. The target margin level is defined as the margin level that would be reached if
 * `deleverage_factor_bps` of the debt is repaid at the moment margin falls below the deleverage
 * threshold. This means that the returned `l` increases as the margin level decreases.
 *
 * When extra collateral `cx` or `cy` is present, it is assumed that this will also be used to
 * repay debt, and together with returned `l` will amount to `deleverage_factor_bps` of debt
 * repaid.
 *
 * Summary:
 * - when `M >= Md` returns 0
 * - when `Md > M > 1` returns `l` such that the position reaches a constant target margin after
 * the deleverage
 * - when `1 >= M` returns `position.l`
 * - if the position has no debt, returns 0
 * - when extra collateral `cx` or `cy` is present, it is assumed that this will also be used to
 * repay debt, and together with returned `l` will amount to `deleverage_factor_bps` of debt
 * repaid
 * - if extra collateral `cx` and `cy` are enough to repay all debt, returns 0
 * - if the target debt value cannot be repaid with position's total liquidity and extra collateral
 * (`cx` and `cy`), returns `position.l`
 */
export function calcMaxDeleverageDeltaL(
  tx: Transaction,
  args: CalcMaxDeleverageDeltaLArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::calc_max_deleverage_delta_l`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.pX128, `u256`),
      pure(tx, args.deleverageMarginBps, `u16`),
      pure(tx, args.baseDeleverageFactorBps, `u16`),
    ],
  })
}

export interface CalcMaxLiqFactorX64Args {
  currentMarginX64: bigint | TransactionArgument
  liqMarginBps: number | TransactionArgument
  liqBonusBps: number | TransactionArgument
  baseLiqFactorBps: number | TransactionArgument
}

/**
 * Calculate the maximum factor by which the debt can be liquidated (% of debt amount).
 * 0 means no liquidation and `1 << 64` means full liquidation (Q64.64 format).
 *
 * The factor is calculated so that the position is above the liquidation threshold after the
 * liquidation. The target margin level is one that would be reached if `base_liq_factor_bps` of
 * the debt is repaid at the moment margin falls below the liquidation threshold. This means that
 * the returned factor increases as the margin level decreases.
 *
 * If the margin level is below the half-way point between the liquidation threshold and the
 * critical margin level, the factor is 1. The critical margin level is defined as the margin
 * level at which the position cannot be liquidated without incurring bad debt (while respecting
 * the liquidation bonus, `Mc = 1 + liq_bonus`).
 *
 * If the margin level is below the critical margin level, then the factor is calculated so that
 * the maximum possible amount of debt is liquidated while making sure there's enough collateral
 * to cover the liquidation bonus. This means that as the current margin falls below the critical
 * margin level, the factor decreases.
 *
 * Summary:
 * - when `M >= Ml` returns 0
 * - when `Ml > M > (Ml + Mc) / 2` returns a factor so that the position reaches a constant target
 * margin after liquidation
 * - when `(Ml + Mc) / 2 >= M >= Mc` returns 1
 * - when `Mc > M` returns a factor so that maximum possible debt is liquidated while respecting
 * the liquidation bonus
 */
export function calcMaxLiqFactorX64(
  tx: Transaction,
  args: CalcMaxLiqFactorX64Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::calc_max_liq_factor_x64`,
    arguments: [
      pure(tx, args.currentMarginX64, `u128`),
      pure(tx, args.liqMarginBps, `u16`),
      pure(tx, args.liqBonusBps, `u16`),
      pure(tx, args.baseLiqFactorBps, `u16`),
    ],
  })
}

/**
 * Returns `true` if the position is "fully deleveraged".
 * A position is considered fully deleveraged when all the liquidity has been withdrawn
 * from the AMM pool and the debt that can be repaid directly (i.e. `cx -> dx`, `cy -> dy`)
 * has been repaid.
 * If this is true, then `dx > 0` implies `cx = 0` and `dy > 0` implies `cy = 0`.
 * Also, if `dx > 0 && dy > 0` then `cx == 0 && cy == 0`.
 */
export function isFullyDeleveraged(
  tx: Transaction,
  position: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::is_fully_deleveraged`,
    arguments: [obj(tx, position)],
  })
}

export interface MarginBelowThresholdArgs {
  position: TransactionObjectInput
  pX128: bigint | TransactionArgument
  marginThresholdBps: number | TransactionArgument
}

/** Returns `true` if position's margin is below the given threshold. */
export function marginBelowThreshold(
  tx: Transaction,
  args: MarginBelowThresholdArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::margin_below_threshold`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.pX128, `u256`),
      pure(tx, args.marginThresholdBps, `u16`),
    ],
  })
}

export interface CalcLiquidateColXArgs {
  position: TransactionObjectInput
  pX128: bigint | TransactionArgument
  maxRepaymentAmtY: bigint | TransactionArgument
  liqMarginBps: number | TransactionArgument
  liqBonusBps: number | TransactionArgument
  baseLiqFactorBps: number | TransactionArgument
}

/**
 * Liquidates the collateral X from the position for the given `repayment_amt_y`.
 * Returns `(repayment_amt_y, reward_amt_x)` where:
 * - `repayment_amt_y` is the amount of Y repaid (up to `max_repayment_amt_y`)
 * - `reward_amt_x` is the amount of X returned to the liquidator.
 *
 * Notes:
 * - Returns `(0, 0)` when the position can't be liquidated:
 * - It's not below the liquidation threshold
 * - It's not "fully deleveraged"
 * - `cx == 0`
 * - The position is liquidated so that the margin level is above the liquidation threshold after
 * the liquidation, if possible for the given `max_repayment_amt_y` and available collateral.
 * - Always respects the liquidation bonus, even if there's not enough collateral to cover a full
 * liquidation.
 * - Never aborts.
 *
 * See documentation for `calc_max_liq_factor_x64` for more details on how the liquidation factor
 * is calculated.
 */
export function calcLiquidateColX(tx: Transaction, args: CalcLiquidateColXArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::calc_liquidate_col_x`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.pX128, `u256`),
      pure(tx, args.maxRepaymentAmtY, `u64`),
      pure(tx, args.liqMarginBps, `u16`),
      pure(tx, args.liqBonusBps, `u16`),
      pure(tx, args.baseLiqFactorBps, `u16`),
    ],
  })
}

export interface CalcLiquidateColYArgs {
  position: TransactionObjectInput
  pX128: bigint | TransactionArgument
  maxRepaymentAmtX: bigint | TransactionArgument
  liqMarginBps: number | TransactionArgument
  liqBonusBps: number | TransactionArgument
  baseLiqFactorBps: number | TransactionArgument
}

/**
 * Liquidates the collateral Y from the position for the given `repayment_amt_x`.
 * Returns `(repayment_amt_x, reward_amt_y)` where `repayment_amt_x` is the amount of X repaid
 * (up to given `max_repayment_amt_x`) and `reward_amt_y` is the amount of Y returned to the
 * liquidator.
 *
 * Note:
 * - Returns `(0, 0)` when the position can't be liquidated:
 * - It's not below the liquidation threshold
 * - It's not "fully deleveraged"
 * - `cy == 0`
 * - The position is liquidated so that the margin level is above the liquidation threshold after
 * the liquidation, if possible for the given `max_repayment_amt_x` and available collateral.
 * - Always respects the liquidation bonus, even if there's not enough collateral to cover a full
 * liquidation.
 * - Never aborts.
 *
 * See documentation for `calc_max_liq_factor_x64` for more details on how the liquidation factor
 * is calculated.
 */
export function calcLiquidateColY(tx: Transaction, args: CalcLiquidateColYArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::position_model_clmm::calc_liquidate_col_y`,
    arguments: [
      obj(tx, args.position),
      pure(tx, args.pX128, `u256`),
      pure(tx, args.maxRepaymentAmtX, `u64`),
      pure(tx, args.liqMarginBps, `u16`),
      pure(tx, args.liqBonusBps, `u16`),
      pure(tx, args.baseLiqFactorBps, `u16`),
    ],
  })
}
