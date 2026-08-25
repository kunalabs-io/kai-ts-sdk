import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'

export function checkVersion(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::check_version`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/** Migrate supply pool to current module version. */
export function migrateSupplyPoolVersion(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::supply_pool::migrate_supply_pool_version`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/** Create a new supply pool with empty equity treasury. */
export function createPool(
  tx: Transaction,
  typeArgs: [string, string],
  equityTreasury: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::create_pool`,
    typeArguments: typeArgs,
    arguments: [obj(tx, equityTreasury)],
  })
}

/** Get total liabilities in Q64.64 format. */
export function totalLiabilitiesX64(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::total_liabilities_x64`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/** Create a lending facility capability. */
export function createLendFacilCap(
  tx: Transaction,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::create_lend_facil_cap`,
    arguments: [],
  })
}

export interface AddLendFacilArgs {
  pool: TransactionObjectInput
  facilId: string | TransactionArgument
  interestModel: TransactionObjectInput
}

/** Add a new lending facility to the supply pool. */
export function addLendFacil(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddLendFacilArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::add_lend_facil`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.facilId, `${ID.$typeName}`),
      obj(tx, args.interestModel),
    ],
  })
}

export interface RemoveLendFacilArgs {
  pool: TransactionObjectInput
  facilId: string | TransactionArgument
}

/** Remove a lending facility from the supply pool. */
export function removeLendFacil(
  tx: Transaction,
  typeArgs: [string, string],
  args: RemoveLendFacilArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::remove_lend_facil`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.facilId, `${ID.$typeName}`),
    ],
  })
}

export interface SetLendFacilInterestModelArgs {
  pool: TransactionObjectInput
  facilId: string | TransactionArgument
  interestModel: TransactionObjectInput
}

/** Set the interest model for a lending facility. */
export function setLendFacilInterestModel(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetLendFacilInterestModelArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::supply_pool::set_lend_facil_interest_model`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.facilId, `${ID.$typeName}`),
      obj(tx, args.interestModel),
    ],
  })
}

export interface SetLendFacilMaxLiabilityOutstandingArgs {
  pool: TransactionObjectInput
  facilId: string | TransactionArgument
  maxLiabilityOutstanding: bigint | TransactionArgument
}

/** Set the maximum liability outstanding for a lending facility. */
export function setLendFacilMaxLiabilityOutstanding(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetLendFacilMaxLiabilityOutstandingArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::supply_pool::set_lend_facil_max_liability_outstanding`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.facilId, `${ID.$typeName}`),
      pure(tx, args.maxLiabilityOutstanding, `u64`),
    ],
  })
}

export interface SetLendFacilMaxUtilizationBpsArgs {
  pool: TransactionObjectInput
  facilId: string | TransactionArgument
  maxUtilizationBps: bigint | TransactionArgument
}

/** Set the maximum utilization in basis points for a lending facility. */
export function setLendFacilMaxUtilizationBps(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetLendFacilMaxUtilizationBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::supply_pool::set_lend_facil_max_utilization_bps`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.facilId, `${ID.$typeName}`),
      pure(tx, args.maxUtilizationBps, `u64`),
    ],
  })
}

export interface SetInterestFeeBpsArgs {
  pool: TransactionObjectInput
  feeBps: number | TransactionArgument
}

/** Set the interest fee in basis points for the supply pool. */
export function setInterestFeeBps(
  tx: Transaction,
  typeArgs: [string, string],
  args: SetInterestFeeBpsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::set_interest_fee_bps`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.feeBps, `u16`),
    ],
  })
}

/** Take all collected fees from the supply pool. */
export function takeCollectedFees(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::take_collected_fees`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * The portion of the pool's balance that is currently available, i.e. the part that is not
 * out on loan. This is the upper bound on what a single `withdraw` call can pay out.
 */
export function availableBalanceValue(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::available_balance_value`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/**
 * Total balance of the pool. This is the sum of the available balance and the borrowed amount
 * which is out on loan, or the total supply equity underlying value. In `UQ64.64` format.
 */
export function totalValueX64(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::total_value_x64`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

/** Get current utilization in basis points. */
export function utilizationBps(
  tx: Transaction,
  typeArgs: [string, string],
  pool: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::utilization_bps`,
    typeArguments: typeArgs,
    arguments: [obj(tx, pool)],
  })
}

export interface UpdateInterestArgs {
  pool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Update the interest accrued since the last update and distribute the interest fee. */
export function updateInterest(
  tx: Transaction,
  typeArgs: [string, string],
  args: UpdateInterestArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::update_interest`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.clock),
    ],
  })
}

export interface BorrowDebtRegistryArgs {
  pool: TransactionObjectInput
  id: string | TransactionArgument
  clock: TransactionObjectInput
}

export function borrowDebtRegistry(
  tx: Transaction,
  typeArgs: [string, string],
  args: BorrowDebtRegistryArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::borrow_debt_registry`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.id, `${ID.$typeName}`),
      obj(tx, args.clock),
    ],
  })
}

export interface SupplyArgs {
  pool: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Supply liquidity to the pool and receive shares. */
export function supply(
  tx: Transaction,
  typeArgs: [string, string],
  args: SupplyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::supply`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface CalcWithdrawBySharesArgs {
  pool: TransactionObjectInput
  shareAmount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/** Calculates the amount that will be withdrawn for the given amount of supply shares. */
export function calcWithdrawByShares(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcWithdrawBySharesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::calc_withdraw_by_shares`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.shareAmount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalcWithdrawByAmountArgs {
  pool: TransactionObjectInput
  amount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Calculates the amount of shares needed to withdraw the given amount.
 * Since the redeemed amount can sometimes be higher than the requested amount due to rounding,
 * this function also returns the actual amount that will be withdrawn.
 * Returns `(share_amount, redeem_amount)`.
 */
export function calcWithdrawByAmount(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcWithdrawByAmountArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::calc_withdraw_by_amount`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.amount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface WithdrawArgs {
  pool: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Withdraw tokens from the pool using shares. */
export function withdraw(
  tx: Transaction,
  typeArgs: [string, string],
  args: WithdrawArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::withdraw`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface BorrowArgs {
  pool: TransactionObjectInput
  facilCap: TransactionObjectInput
  amount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function borrow(
  tx: Transaction,
  typeArgs: [string, string],
  args: BorrowArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::borrow`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.facilCap),
      pure(tx, args.amount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalcRepayBySharesArgs {
  pool: TransactionObjectInput
  facId: string | TransactionArgument
  shareValueX64: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/** Calculates the debt amount that needs to be repaid for the given amount of debt shares. */
export function calcRepayByShares(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcRepayBySharesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::calc_repay_by_shares`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.facId, `${ID.$typeName}`),
      pure(tx, args.shareValueX64, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface CalcRepayByAmountArgs {
  pool: TransactionObjectInput
  facId: string | TransactionArgument
  amount: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/** Calculates the debt share amount required to repay the given amount of debt. */
export function calcRepayByAmount(
  tx: Transaction,
  typeArgs: [string, string],
  args: CalcRepayByAmountArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::calc_repay_by_amount`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      pure(tx, args.facId, `${ID.$typeName}`),
      pure(tx, args.amount, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayArgs {
  pool: TransactionObjectInput
  shares: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

export function repay(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::repay`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.shares),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export interface RepayMaxPossibleArgs {
  pool: TransactionObjectInput
  shares: TransactionObjectInput
  balance: TransactionObjectInput
  clock: TransactionObjectInput
}

/**
 * Repays the maximum possible amount of debt shares given the balance.
 * Returns the amount of debt shares and balance repaid.
 */
export function repayMaxPossible(
  tx: Transaction,
  typeArgs: [string, string],
  args: RepayMaxPossibleArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::repay_max_possible`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool),
      obj(tx, args.shares),
      obj(tx, args.balance),
      obj(tx, args.clock),
    ],
  })
}

export function fdsFacilId(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fds_facil_id`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function fdsBorrowInner(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fds_borrow_inner`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function fdsValueX64(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fds_value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface FdsSplitX64Args {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function fdsSplitX64(
  tx: Transaction,
  typeArg: string,
  args: FdsSplitX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fds_split_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      pure(tx, args.amount, `u128`),
    ],
  })
}

export interface FdsSplitArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function fdsSplit(
  tx: Transaction,
  typeArg: string,
  args: FdsSplitArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fds_split`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export function fdsWithdrawAll(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fds_withdraw_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export interface FdsJoinArgs {
  self: TransactionObjectInput
  other: TransactionObjectInput
}

export function fdsJoin(
  tx: Transaction,
  typeArg: string,
  args: FdsJoinArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fds_join`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.other),
    ],
  })
}

export function fdsDestroyZero(
  tx: Transaction,
  typeArg: string,
  shares: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fds_destroy_zero`,
    typeArguments: [typeArg],
    arguments: [obj(tx, shares)],
  })
}

export function emptyFacilDebtBag(
  tx: Transaction,
  facilId: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::empty_facil_debt_bag`,
    arguments: [pure(tx, facilId, `${ID.$typeName}`)],
  })
}

export interface FdbAddArgs {
  self: TransactionObjectInput
  shares: TransactionObjectInput
}

export function fdbAdd(
  tx: Transaction,
  typeArgs: [string, string],
  args: FdbAddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fdb_add`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.shares),
    ],
  })
}

export interface FdbTakeAmtArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function fdbTakeAmt(
  tx: Transaction,
  typeArg: string,
  args: FdbTakeAmtArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fdb_take_amt`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      pure(tx, args.amount, `u128`),
    ],
  })
}

export function fdbTakeAll(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fdb_take_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function fdbGetShareAmountByAssetType(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::supply_pool::fdb_get_share_amount_by_asset_type`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function fdbGetShareAmountByShareType(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::supply_pool::fdb_get_share_amount_by_share_type`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function fdbShareTypeMatchesAssetIfAnyExists(
  tx: Transaction,
  typeArgs: [string, string],
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::supply_pool::fdb_share_type_matches_asset_if_any_exists`,
    typeArguments: typeArgs,
    arguments: [obj(tx, self)],
  })
}

export function fdbGetShareTypeForAsset(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::supply_pool::fdb_get_share_type_for_asset`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function fdbIsEmpty(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fdb_is_empty`,
    arguments: [obj(tx, self)],
  })
}

export function fdbDestroyEmpty(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fdb_destroy_empty`,
    arguments: [obj(tx, self)],
  })
}

export function fdbLength(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::supply_pool::fdb_length`,
    arguments: [obj(tx, self)],
  })
}
