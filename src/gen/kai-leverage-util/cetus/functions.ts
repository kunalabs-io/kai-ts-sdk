import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CalcMaxAddLiquidityAmountsArgs {
  position: TransactionObjectInput
  pool: TransactionObjectInput
  availableX: bigint | TransactionArgument
  availableY: bigint | TransactionArgument
}

export function calcMaxAddLiquidityAmounts(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcMaxAddLiquidityAmountsArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::calc_max_add_liquidity_amounts`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.pool),
      pure(tx, args.availableX, `u64`),
      pure(tx, args.availableY, `u64`),
    ],
  })
}

export interface RebalanceAddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  receipt: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  balanceX: TransactionObjectInput
  balanceY: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceAddLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::rebalance_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      obj(tx, args.balanceX),
      obj(tx, args.balanceY),
      obj(tx, args.clock),
    ],
  })
}

export interface OwnerAddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  balanceX: TransactionObjectInput
  balanceY: TransactionObjectInput
  clock: TransactionObjectInput
}

export function ownerAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: OwnerAddLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::owner_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      obj(tx, args.balanceX),
      obj(tx, args.balanceY),
      obj(tx, args.clock),
    ],
  })
}

export function swapPayAmount(
  tx: Transaction,
  typeArgs: [string, string],
  receipt: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::swap_pay_amount`,
    typeArguments: typeArgs,
    arguments: [obj(tx, receipt)],
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
    target: `${PUBLISHED_AT}::cetus::flash_swap`,
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
    target: `${PUBLISHED_AT}::cetus::repay_flash_swap`,
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

export interface CreateRebalanceReceiptArgs {
  position: TransactionObjectInput
  pool: TransactionObjectInput
}

export function createRebalanceReceipt(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreateRebalanceReceiptArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::create_rebalance_receipt`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.pool)],
  })
}

export interface RebalanceCollectLpFeesForBatchSellingArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  coreReceipt: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  receipt: TransactionObjectInput
  xToYBatchSwap: TransactionObjectInput
  yToXBatchSwap: TransactionObjectInput
}

export function rebalanceCollectLpFeesForBatchSelling(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceCollectLpFeesForBatchSellingArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::rebalance_collect_lp_fees_for_batch_selling`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.coreReceipt),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      obj(tx, args.receipt),
      obj(tx, args.xToYBatchSwap),
      obj(tx, args.yToXBatchSwap),
    ],
  })
}

export interface RebalanceCollectRewardForBatchSellingArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  coreReceipt: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  cetusVault: TransactionObjectInput
  receipt: TransactionObjectInput
  priceToXX128: bigint | TransactionArgument
  priceToYX128: bigint | TransactionArgument
  rToXBatchSwap: TransactionObjectInput
  rToYBatchSwap: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceCollectRewardForBatchSelling(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RebalanceCollectRewardForBatchSellingArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::rebalance_collect_reward_for_batch_selling`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.coreReceipt),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      obj(tx, args.cetusVault),
      obj(tx, args.receipt),
      pure(tx, args.priceToXX128, `u256`),
      pure(tx, args.priceToYX128, `u256`),
      obj(tx, args.rToXBatchSwap),
      obj(tx, args.rToYBatchSwap),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceClaimBatchSwapToXArgs {
  receipt: TransactionObjectInput
  batchSwap: TransactionObjectInput
}

export function rebalanceClaimBatchSwapToX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RebalanceClaimBatchSwapToXArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::rebalance_claim_batch_swap_to_x`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.receipt), obj(tx, args.batchSwap)],
  })
}

export interface RebalanceClaimBatchSwapToYArgs {
  receipt: TransactionObjectInput
  batchSwap: TransactionObjectInput
}

export function rebalanceClaimBatchSwapToY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RebalanceClaimBatchSwapToYArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::rebalance_claim_batch_swap_to_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.receipt), obj(tx, args.batchSwap)],
  })
}

export interface RebalanceFinalizeAddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  coreReceipt: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  receipt: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceFinalizeAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceFinalizeAddLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cetus::rebalance_finalize_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.coreReceipt),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      obj(tx, args.receipt),
      obj(tx, args.clock),
    ],
  })
}
