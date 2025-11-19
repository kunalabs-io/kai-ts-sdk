import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface GetExpectSwapResultArgs {
  a0: TransactionObjectInput
  a1: boolean | TransactionArgument
  a2: boolean | TransactionArgument
  a3: bigint | TransactionArgument
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
      obj(tx, args.a0),
      pure(tx, args.a1, `bool`),
      pure(tx, args.a2, `bool`),
      pure(tx, args.a3, `u64`),
    ],
  })
}

export interface ExpectSwapArgs {
  a0: TransactionObjectInput
  a1: boolean | TransactionArgument
  a2: boolean | TransactionArgument
  a3: bigint | TransactionArgument
}

export function expectSwap(tx: Transaction, typeArgs: [string, string], args: ExpectSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      pure(tx, args.a1, `bool`),
      pure(tx, args.a2, `bool`),
      pure(tx, args.a3, `u64`),
    ],
  })
}

export function expectSwapResultAmountOut(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_amount_out`,
    arguments: [obj(tx, a0)],
  })
}

export function expectSwapResultIsExceed(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_is_exceed`,
    arguments: [obj(tx, a0)],
  })
}

export function expectSwapResultAmountIn(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_amount_in`,
    arguments: [obj(tx, a0)],
  })
}

export function expectSwapResultAfterSqrtPrice(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_after_sqrt_price`,
    arguments: [obj(tx, a0)],
  })
}

export function expectSwapResultFeeAmount(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_fee_amount`,
    arguments: [obj(tx, a0)],
  })
}

export function expectSwapResultStepResults(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_step_results`,
    arguments: [obj(tx, a0)],
  })
}

export function expectSwapResultStepsLength(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_steps_length`,
    arguments: [obj(tx, a0)],
  })
}

export interface ExpectSwapResultStepSwapResultArgs {
  a0: TransactionObjectInput
  a1: bigint | TransactionArgument
}

export function expectSwapResultStepSwapResult(
  tx: Transaction,
  args: ExpectSwapResultStepSwapResultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::expect_swap_result_step_swap_result`,
    arguments: [obj(tx, args.a0), pure(tx, args.a1, `u64`)],
  })
}

export function stepSwapResultAmountIn(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_amount_in`,
    arguments: [obj(tx, a0)],
  })
}

export function stepSwapResultAmountOut(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_amount_out`,
    arguments: [obj(tx, a0)],
  })
}

export function stepSwapResultFeeAmount(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_fee_amount`,
    arguments: [obj(tx, a0)],
  })
}

export function stepSwapResultCurrentSqrtPrice(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_current_sqrt_price`,
    arguments: [obj(tx, a0)],
  })
}

export function stepSwapResultTargetSqrtPrice(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_target_sqrt_price`,
    arguments: [obj(tx, a0)],
  })
}

export function stepSwapResultCurrentLiquidity(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_current_liquidity`,
    arguments: [obj(tx, a0)],
  })
}

export function stepSwapResultRemainderAmount(tx: Transaction, a0: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::step_swap_result_remainder_amount`,
    arguments: [obj(tx, a0)],
  })
}

export interface ComputeSwapStepArgs {
  a0: bigint | TransactionArgument
  a1: bigint | TransactionArgument
  a2: bigint | TransactionArgument
  a3: bigint | TransactionArgument
  a4: bigint | TransactionArgument
  a5: boolean | TransactionArgument
  a6: boolean | TransactionArgument
}

export function computeSwapStep(tx: Transaction, args: ComputeSwapStepArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::expect_swap::compute_swap_step`,
    arguments: [
      pure(tx, args.a0, `u128`),
      pure(tx, args.a1, `u128`),
      pure(tx, args.a2, `u128`),
      pure(tx, args.a3, `u64`),
      pure(tx, args.a4, `u64`),
      pure(tx, args.a5, `bool`),
      pure(tx, args.a6, `bool`),
    ],
  })
}
