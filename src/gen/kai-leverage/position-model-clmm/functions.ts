import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreateArgs {
  sqrtPaX64: bigint | TransactionArgument
  sqrtPbX64: bigint | TransactionArgument
  l: bigint | TransactionArgument
  cx: bigint | TransactionArgument
  cy: bigint | TransactionArgument
  dx: bigint | TransactionArgument
  dy: bigint | TransactionArgument
}

export function create(tx: Transaction, args: CreateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::create`,
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

export function sqrtPaX64(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::sqrt_pa_x64`,
    arguments: [obj(tx, self)],
  })
}

export function sqrtPbX64(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::sqrt_pb_x64`,
    arguments: [obj(tx, self)],
  })
}

export function l(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::l`,
    arguments: [obj(tx, self)],
  })
}

export function cx(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::cx`,
    arguments: [obj(tx, self)],
  })
}

export function cy(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::cy`,
    arguments: [obj(tx, self)],
  })
}

export function dx(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::dx`,
    arguments: [obj(tx, self)],
  })
}

export function dy(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::dy`,
    arguments: [obj(tx, self)],
  })
}

export interface XByLiquidityX64Args {
  self: TransactionObjectInput
  sqrtPX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
}

export function xByLiquidityX64(tx: Transaction, args: XByLiquidityX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::x_by_liquidity_x64`,
    arguments: [obj(tx, args.self), pure(tx, args.sqrtPX64, `u128`), pure(tx, args.deltaL, `u128`)],
  })
}

export interface YByLiquidityX64Args {
  self: TransactionObjectInput
  sqrtPX64: bigint | TransactionArgument
  deltaL: bigint | TransactionArgument
}

export function yByLiquidityX64(tx: Transaction, args: YByLiquidityX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::y_by_liquidity_x64`,
    arguments: [obj(tx, args.self), pure(tx, args.sqrtPX64, `u128`), pure(tx, args.deltaL, `u128`)],
  })
}

export interface XX64Args {
  self: TransactionObjectInput
  sqrtPX64: bigint | TransactionArgument
}

export function xX64(tx: Transaction, args: XX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::x_x64`,
    arguments: [obj(tx, args.self), pure(tx, args.sqrtPX64, `u128`)],
  })
}

export interface YX64Args {
  self: TransactionObjectInput
  sqrtPX64: bigint | TransactionArgument
}

export function yX64(tx: Transaction, args: YX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::y_x64`,
    arguments: [obj(tx, args.self), pure(tx, args.sqrtPX64, `u128`)],
  })
}

export interface AssetsX128Args {
  self: TransactionObjectInput
  pX128: bigint | TransactionArgument
}

export function assetsX128(tx: Transaction, args: AssetsX128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::assets_x128`,
    arguments: [obj(tx, args.self), pure(tx, args.pX128, `u256`)],
  })
}

export interface DebtX128Args {
  self: TransactionObjectInput
  pX128: bigint | TransactionArgument
}

export function debtX128(tx: Transaction, args: DebtX128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::debt_x128`,
    arguments: [obj(tx, args.self), pure(tx, args.pX128, `u256`)],
  })
}

export interface MarginX64Args {
  self: TransactionObjectInput
  pX128: bigint | TransactionArgument
}

export function marginX64(tx: Transaction, args: MarginX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::margin_x64`,
    arguments: [obj(tx, args.self), pure(tx, args.pX128, `u256`)],
  })
}

export interface MulX64Args {
  aX64: bigint | TransactionArgument
  bX64: bigint | TransactionArgument
}

export function mulX64(tx: Transaction, args: MulX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::mul_x64`,
    arguments: [pure(tx, args.aX64, `u128`), pure(tx, args.bX64, `u128`)],
  })
}

export interface SqrtPlX64Args {
  sqrtPX64: bigint | TransactionArgument
  deltaBps: number | TransactionArgument
}

export function sqrtPlX64(tx: Transaction, args: SqrtPlX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::sqrt_pl_x64`,
    arguments: [pure(tx, args.sqrtPX64, `u128`), pure(tx, args.deltaBps, `u16`)],
  })
}

export interface SqrtPhX64Args {
  sqrtPX64: bigint | TransactionArgument
  deltaBps: number | TransactionArgument
}

export function sqrtPhX64(tx: Transaction, args: SqrtPhX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::sqrt_ph_x64`,
    arguments: [pure(tx, args.sqrtPX64, `u128`), pure(tx, args.deltaBps, `u16`)],
  })
}

export interface CalcMaxDeleverageDeltaLArgs {
  position: TransactionObjectInput
  pX128: bigint | TransactionArgument
  deleverageMarginBps: number | TransactionArgument
  baseDeleverageFactorBps: number | TransactionArgument
}

export function calcMaxDeleverageDeltaL(tx: Transaction, args: CalcMaxDeleverageDeltaLArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::calc_max_deleverage_delta_l`,
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

export function calcMaxLiqFactorX64(tx: Transaction, args: CalcMaxLiqFactorX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::calc_max_liq_factor_x64`,
    arguments: [
      pure(tx, args.currentMarginX64, `u128`),
      pure(tx, args.liqMarginBps, `u16`),
      pure(tx, args.liqBonusBps, `u16`),
      pure(tx, args.baseLiqFactorBps, `u16`),
    ],
  })
}

export function isFullyDeleveraged(tx: Transaction, position: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::is_fully_deleveraged`,
    arguments: [obj(tx, position)],
  })
}

export interface MarginBelowThresholdArgs {
  position: TransactionObjectInput
  pX128: bigint | TransactionArgument
  marginThresholdBps: number | TransactionArgument
}

export function marginBelowThreshold(tx: Transaction, args: MarginBelowThresholdArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::margin_below_threshold`,
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

export function calcLiquidateColX(tx: Transaction, args: CalcLiquidateColXArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::calc_liquidate_col_x`,
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

export function calcLiquidateColY(tx: Transaction, args: CalcLiquidateColYArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_model_clmm::calc_liquidate_col_y`,
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
