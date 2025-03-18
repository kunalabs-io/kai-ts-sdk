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
    target: `${PUBLISHED_AT}::bluefin_spot::calc_max_add_liquidity_amounts`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.pool),
      pure(tx, args.availableX, `u64`),
      pure(tx, args.availableY, `u64`),
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
    target: `${PUBLISHED_AT}::bluefin_spot::create_rebalance_receipt`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.position), obj(tx, args.pool)],
  })
}

export interface OwnerAddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
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
    target: `${PUBLISHED_AT}::bluefin_spot::owner_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.balanceX),
      obj(tx, args.balanceY),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceAddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  receipt: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
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
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.balanceX),
      obj(tx, args.balanceY),
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
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_claim_batch_swap_to_x`,
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
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_claim_batch_swap_to_y`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.receipt), obj(tx, args.batchSwap)],
  })
}

export interface RebalanceCollectLpFeesForBatchSellingArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  coreReceipt: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  receipt: TransactionObjectInput
  xToYBatchSwap: TransactionObjectInput
  yToXBatchSwap: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceCollectLpFeesForBatchSelling(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceCollectLpFeesForBatchSellingArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_collect_lp_fees_for_batch_selling`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.coreReceipt),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.receipt),
      obj(tx, args.xToYBatchSwap),
      obj(tx, args.yToXBatchSwap),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceCollectRewardForBatchSellingArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  coreReceipt: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
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
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_collect_reward_for_batch_selling`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.coreReceipt),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.receipt),
      pure(tx, args.priceToXX128, `u256`),
      pure(tx, args.priceToYX128, `u256`),
      obj(tx, args.rToXBatchSwap),
      obj(tx, args.rToYBatchSwap),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceFinalizeAddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  coreReceipt: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  bluefinPool: TransactionObjectInput
  bluefinConfig: TransactionObjectInput
  receipt: TransactionObjectInput
  clock: TransactionObjectInput
}

export function rebalanceFinalizeAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceFinalizeAddLiquidityArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::bluefin_spot::rebalance_finalize_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.coreReceipt),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.bluefinPool),
      obj(tx, args.bluefinConfig),
      obj(tx, args.receipt),
      obj(tx, args.clock),
    ],
  })
}
