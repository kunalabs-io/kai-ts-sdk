import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface ComputeSwapStepArgs {
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  u1283: bigint | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
}

export function computeSwapStep(tx: Transaction, args: ComputeSwapStepArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::compute_swap_step`,
    arguments: [
      pure(tx, args.u1281, `u128`),
      pure(tx, args.u1282, `u128`),
      pure(tx, args.u1283, `u128`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
    ],
  })
}

export function stepSwapResultAmountIn(tx: Transaction, swapStepResult: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_amount_in`,
    arguments: [obj(tx, swapStepResult)],
  })
}

export function stepSwapResultAmountOut(tx: Transaction, swapStepResult: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_amount_out`,
    arguments: [obj(tx, swapStepResult)],
  })
}

export function stepSwapResultFeeAmount(tx: Transaction, swapStepResult: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_fee_amount`,
    arguments: [obj(tx, swapStepResult)],
  })
}

export function stepSwapResultCurrentSqrtPrice(
  tx: Transaction,
  swapStepResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_current_sqrt_price`,
    arguments: [obj(tx, swapStepResult)],
  })
}

export function stepSwapResultTargetSqrtPrice(
  tx: Transaction,
  swapStepResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_target_sqrt_price`,
    arguments: [obj(tx, swapStepResult)],
  })
}

export function stepSwapResultCurrentLiquidity(
  tx: Transaction,
  swapStepResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_current_liquidity`,
    arguments: [obj(tx, swapStepResult)],
  })
}

export function stepSwapResultRemainderAmount(
  tx: Transaction,
  swapStepResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_remainder_amount`,
    arguments: [obj(tx, swapStepResult)],
  })
}

export interface UpdateSwapResultArgs {
  swapResult: TransactionObjectInput
  u2561: bigint | TransactionArgument
  u2562: bigint | TransactionArgument
  u2563: bigint | TransactionArgument
}

export function updateSwapResult(tx: Transaction, args: UpdateSwapResultArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::update_swap_result`,
    arguments: [
      obj(tx, args.swapResult),
      pure(tx, args.u2561, `u256`),
      pure(tx, args.u2562, `u256`),
      pure(tx, args.u2563, `u256`),
    ],
  })
}

export interface CheckRemainerAmountSubArgs {
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
}

export function checkRemainerAmountSub(tx: Transaction, args: CheckRemainerAmountSubArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::check_remainer_amount_sub`,
    arguments: [pure(tx, args.u641, `u64`), pure(tx, args.u642, `u64`)],
  })
}

export function defaultSwapResult(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::expect_swap::default_swap_result`, arguments: [] })
}

export interface ExpectSwapArgs {
  pool: TransactionObjectInput
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  u64: bigint | TransactionArgument
}

export function expectSwap(tx: Transaction, typeArgs: [string, string], args: ExpectSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export interface GetExpectSwapResultArgs {
  pool: TransactionObjectInput
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  u64: bigint | TransactionArgument
}

export function getExpectSwapResult(
  tx: Transaction,
  typeArgs: [string, string],
  args: GetExpectSwapResultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::get_expect_swap_result`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export function expectSwapResultAmountOut(
  tx: Transaction,
  expectSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_amount_out`,
    arguments: [obj(tx, expectSwapResult)],
  })
}

export function expectSwapResultIsExceed(
  tx: Transaction,
  expectSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_is_exceed`,
    arguments: [obj(tx, expectSwapResult)],
  })
}

export function expectSwapResultAmountIn(
  tx: Transaction,
  expectSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_amount_in`,
    arguments: [obj(tx, expectSwapResult)],
  })
}

export function expectSwapResultAfterSqrtPrice(
  tx: Transaction,
  expectSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_after_sqrt_price`,
    arguments: [obj(tx, expectSwapResult)],
  })
}

export function expectSwapResultFeeAmount(
  tx: Transaction,
  expectSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_fee_amount`,
    arguments: [obj(tx, expectSwapResult)],
  })
}

export function expectSwapResultStepResults(
  tx: Transaction,
  expectSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_step_results`,
    arguments: [obj(tx, expectSwapResult)],
  })
}

export function expectSwapResultStepsLength(
  tx: Transaction,
  expectSwapResult: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_steps_length`,
    arguments: [obj(tx, expectSwapResult)],
  })
}

export interface ExpectSwapResultStepSwapResultArgs {
  expectSwapResult: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function expectSwapResultStepSwapResult(
  tx: Transaction,
  args: ExpectSwapResultStepSwapResultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_step_swap_result`,
    arguments: [obj(tx, args.expectSwapResult), pure(tx, args.u64, `u64`)],
  })
}
