import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { Option } from '../../std/option/structs'

export interface SlippageToleranceAssertionArgs {
  pool: TransactionObjectInput
  p0DesiredX128: bigint | TransactionArgument
  maxSlippageBps: number | TransactionArgument
}

/** Assert that current pool price is within slippage tolerance. */
export function slippageToleranceAssertion(
  tx: Transaction,
  typeArgs: [string, string],
  args: SlippageToleranceAssertionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::slippage_tolerance_assertion`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.p0DesiredX128, `u256`),
      pure(tx, args.maxSlippageBps, `u16`),
    ],
  })
}

export interface CalcDepositAmountsByLiquidityArgs {
  pool: TransactionObjectInput
  tickA: TransactionObjectInput
  tickB: TransactionObjectInput
  deltaL: bigint | TransactionArgument
}

/** Calculate token amounts needed for given liquidity on Cetus. */
export function calcDepositAmountsByLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcDepositAmountsByLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::calc_deposit_amounts_by_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.tickA),
      obj(tx, args.tickB),
      pure(tx, args.deltaL, `u128`),
    ],
  })
}

export interface RemoveLiquidityArgs {
  config: TransactionObjectInput
  pool: TransactionObjectInput
  lpPosition: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/** Remove liquidity from a Cetus position and return token balances. */
export function removeLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::remove_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pool),
      obj(tx, args.lpPosition),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePositionTicketArgs {
  cetusPool: TransactionObjectInput
  config: TransactionObjectInput
  tickA: TransactionObjectInput
  tickB: TransactionObjectInput
  principalX: TransactionObjectInput
  principalY: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  priceInfo: TransactionObjectInput
}

/** @deprecated Use `create_position_ticket_v2` instead. */
export function createPositionTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePositionTicketArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::create_position_ticket`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cetusPool),
      obj(tx, args.config),
      obj(tx, args.tickA),
      obj(tx, args.tickB),
      obj(tx, args.principalX),
      obj(tx, args.principalY),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.priceInfo),
    ],
  })
}

export interface CreatePositionTicketV2Args {
  cetusPool: TransactionObjectInput
  config: TransactionObjectInput
  tickA: TransactionObjectInput
  tickB: TransactionObjectInput
  principalX: TransactionObjectInput
  principalY: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  priceInfo: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Initialize position creation for a leveraged Cetus position. */
export function createPositionTicketV2(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePositionTicketV2Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::create_position_ticket_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.cetusPool),
      obj(tx, args.config),
      obj(tx, args.tickA),
      obj(tx, args.tickB),
      obj(tx, args.principalX),
      obj(tx, args.principalY),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.priceInfo),
      obj(tx, args.clock),
    ],
  })
}

export interface BorrowForPositionXArgs {
  ticket: TransactionObjectInput
  config: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Borrow X tokens for position creation. */
export function borrowForPositionX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: BorrowForPositionXArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::borrow_for_position_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.config),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface BorrowForPositionYArgs {
  ticket: TransactionObjectInput
  config: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Borrow Y tokens for position creation. */
export function borrowForPositionY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: BorrowForPositionYArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::borrow_for_position_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.ticket),
      obj(tx, args.config),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePositionArgs {
  config: TransactionObjectInput
  ticket: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusGlobalConfig: TransactionObjectInput
  creationFee: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Create a leveraged position from a prepared ticket. */
export function createPosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePositionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::create_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.ticket),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusGlobalConfig),
      obj(tx, args.creationFee),
      obj(tx, args.clock),
    ],
  })
}

export interface CreateDeleverageTicketArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusGlobalConfig: TransactionObjectInput
  maxDeltaL: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Initialize deleveraging for a position that has fallen below
 * the deleverage margin threshold (permissioned).
 */
export function createDeleverageTicket(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreateDeleverageTicketArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::create_deleverage_ticket`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusGlobalConfig),
      pure(tx, args.maxDeltaL, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreateDeleverageTicketForLiquidationArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusGlobalConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Initialize deleveraging for a position that has fallen below
 * the liquidation margin threshold (permissionless).
 */
export function createDeleverageTicketForLiquidation(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreateDeleverageTicketForLiquidationArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::create_deleverage_ticket_for_liquidation`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusGlobalConfig),
      obj(tx, args.clock),
    ],
  })
}

export interface DeleverageArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  supplyPoolX: TransactionObjectInput
  supplyPoolY: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusGlobalConfig: TransactionObjectInput
  maxDeltaL: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Execute deleveraging for a position that has fallen below
 * the deleverage margin threshold (permissioned).
 */
export function deleverage(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: DeleverageArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::deleverage`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.supplyPoolX),
      obj(tx, args.supplyPoolY),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusGlobalConfig),
      pure(tx, args.maxDeltaL, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface DeleverageForLiquidationArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  supplyPoolX: TransactionObjectInput
  supplyPoolY: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusGlobalConfig: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Execute deleveraging for a position that has fallen below
 * the liquidation margin threshold (permissionless).
 */
export function deleverageForLiquidation(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: DeleverageForLiquidationArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::deleverage_for_liquidation`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.supplyPoolX),
      obj(tx, args.supplyPoolY),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusGlobalConfig),
      obj(tx, args.clock),
    ],
  })
}

export interface LiquidateColXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  repayment: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Liquidate X collateral by repaying Y debt. The position needs to be fully deleveraged and
 * below the liquidation margin threshold.
 */
export function liquidateColX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: LiquidateColXArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::liquidate_col_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.repayment),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface LiquidateColYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  repayment: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Liquidate Y collateral by repaying X debt. The position needs to be fully deleveraged and
 * below the liquidation margin threshold.
 */
export function liquidateColY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: LiquidateColYArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::liquidate_col_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.repayment),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayBadDebtXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  supplyPool: TransactionObjectInput
  repayment: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay bad debt for X tokens. */
export function repayBadDebtX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RepayBadDebtXArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::repay_bad_debt_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.supplyPool),
      obj(tx, args.repayment),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayBadDebtYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  supplyPool: TransactionObjectInput
  repayment: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay bad debt for Y tokens. */
export function repayBadDebtY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RepayBadDebtYArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::repay_bad_debt_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.supplyPool),
      obj(tx, args.repayment),
      obj(tx, args.clock),
    ],
  })
}

export interface ReduceArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  priceInfo: TransactionObjectInput
  supplyPoolX: TransactionObjectInput
  supplyPoolY: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusGlobalConfig: TransactionObjectInput
  factorX64: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Initialize position size reduction (withdraw), while preserving mathematical safety guarantees.
 * A factor_x64 percentage of the position is withdrawn and the same percentage of debt is repaid.
 */
export function reduce(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: ReduceArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::reduce`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.priceInfo),
      obj(tx, args.supplyPoolX),
      obj(tx, args.supplyPoolY),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusGlobalConfig),
      pure(tx, args.factorX64, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/** Add liquidity to the inner LP position. */
export function addLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface AddLiquidityFixCoinArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  amount: bigint | TransactionArgument
  fixAmountX: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/** @deprecated Use `add_liquidity` instead. */
export function addLiquidityFixCoin(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLiquidityFixCoinArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::add_liquidity_fix_coin`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      pure(tx, args.amount, `u64`),
      pure(tx, args.fixAmountX, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayDebtXArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay as much X token debt as possible using the available balance. */
export function repayDebtX(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RepayDebtXArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::repay_debt_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      obj(tx, args.balance),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayDebtYArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  balance: TransactionObjectInput
  supplyPool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Repay as much Y token debt as possible using the available balance. */
export function repayDebtY(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RepayDebtYArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::repay_debt_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      obj(tx, args.balance),
      obj(tx, args.supplyPool),
      obj(tx, args.clock),
    ],
  })
}

export interface OwnerCollectFeeArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
}

/** Collect accumulated AMM fees for position owner directly. */
export function ownerCollectFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: OwnerCollectFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::owner_collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
    ],
  })
}

export interface OwnerCollectRewardArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  cetusVault: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Collect accumulated AMM rewards for position owner directly. */
export function ownerCollectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: OwnerCollectRewardArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::owner_collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      obj(tx, args.cetusVault),
      obj(tx, args.clock),
    ],
  })
}

export interface OwnerTakeStashedRewardsArgs {
  position: TransactionObjectInput
  cap: TransactionObjectInput
  amount: bigint | TransactionArgument | null
}

/** Withdraw stashed rewards from position. */
export function ownerTakeStashedRewards(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: OwnerTakeStashedRewardsArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::owner_take_stashed_rewards`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.cap),
      pure(tx, args.amount, `${Option.$typeName}<u64>`),
    ],
  })
}

export interface DeletePositionArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
}

/** Delete position. The position needs to be fully reduced and all assets withdrawn first. */
export function deletePosition(
  tx: Transaction,
  typeArgs: [string, string],
  args: DeletePositionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::delete_position`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
    ],
  })
}

export interface RebalanceCollectFeeArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  receipt: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
}

/**
 * Collects AMM trading fees for a leveraged CLMM position during rebalancing,
 * applies protocol fee, and updates the `RebalanceReceipt`.
 */
export function rebalanceCollectFee(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceCollectFeeArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::rebalance_collect_fee`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
    ],
  })
}

export interface RebalanceCollectRewardArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  receipt: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  cetusVault: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Collects AMM rewards for a leveraged CLMM position during rebalancing,
 * applies protocol fee, and updates the `RebalanceReceipt`.
 */
export function rebalanceCollectReward(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: RebalanceCollectRewardArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::rebalance_collect_reward`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      obj(tx, args.cetusVault),
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
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  deltaL: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/** Adds liquidity to a the underlying LP position during rebalancing. */
export function rebalanceAddLiquidity(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceAddLiquidityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::rebalance_add_liquidity`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      pure(tx, args.deltaL, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface RebalanceAddLiquidityByFixCoinArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  receipt: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  cetusPool: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  amount: bigint | TransactionArgument
  fixAmountX: boolean | TransactionArgument
  clock: TransactionObjectInput
}

/** @deprecated Use `rebalance_add_liquidity` instead. */
export function rebalanceAddLiquidityByFixCoin(
  tx: Transaction,
  typeArgs: [string, string],
  args: RebalanceAddLiquidityByFixCoinArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::rebalance_add_liquidity_by_fix_coin`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.receipt),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      obj(tx, args.cetusPool),
      obj(tx, args.cetusConfig),
      pure(tx, args.amount, `u64`),
      pure(tx, args.fixAmountX, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface SyncExploitedPositionLiquidityBySmallWithdrawArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cetusConfig: TransactionObjectInput
  cetusPool: TransactionObjectInput
  balanceBag: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Sync exploited position liquidity by performing a small withdrawal to update
 * the position's liquidity state after a Cetus incident.
 */
export function syncExploitedPositionLiquidityBySmallWithdraw(
  tx: Transaction,
  typeArgs: [string, string],
  args: SyncExploitedPositionLiquidityBySmallWithdrawArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage')
    }::cetus::sync_exploited_position_liquidity_by_small_withdraw`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cetusConfig),
      obj(tx, args.cetusPool),
      obj(tx, args.balanceBag),
      obj(tx, args.clock),
    ],
  })
}

export interface DestructExploitedPositionAndReturnLpArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  cap: TransactionObjectInput
  cetusPool: TransactionObjectInput
}

/** Destruct an exploited position and return the underlying LP position for recovery. */
export function destructExploitedPositionAndReturnLp(
  tx: Transaction,
  typeArgs: [string, string],
  args: DestructExploitedPositionAndReturnLpArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::destruct_exploited_position_and_return_lp`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.cap),
      obj(tx, args.cetusPool),
    ],
  })
}

export interface PositionModelArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  debtInfo: TransactionObjectInput
}

/**
 * Create validated position model for analysis and calculations.
 * Used to obtain position models for risk assessment,
 * liquidation calculations, and other analytical operations.
 */
export function positionModel(
  tx: Transaction,
  typeArgs: [string, string],
  args: PositionModelArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::position_model`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.debtInfo),
    ],
  })
}

export interface CalcLiquidateColXArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  maxRepaymentAmtY: bigint | TransactionArgument
}

/** Calculate the required amounts to liquidate X collateral by repaying Y debt. */
export function calcLiquidateColX(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcLiquidateColXArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::calc_liquidate_col_x`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      pure(tx, args.maxRepaymentAmtY, `u64`),
    ],
  })
}

export interface CalcLiquidateColYArgs {
  position: TransactionObjectInput
  config: TransactionObjectInput
  priceInfo: TransactionObjectInput
  debtInfo: TransactionObjectInput
  maxRepaymentAmtX: bigint | TransactionArgument
}

/** Calculate the required amounts to liquidate Y collateral by repaying X debt. */
export function calcLiquidateColY(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcLiquidateColYArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::cetus::calc_liquidate_col_y`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.position),
      obj(tx, args.config),
      obj(tx, args.priceInfo),
      obj(tx, args.debtInfo),
      pure(tx, args.maxRepaymentAmtX, `u64`),
    ],
  })
}
