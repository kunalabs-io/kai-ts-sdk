import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, option, pure } from '../../_framework/util'
import { Url } from '../../sui/url/structs'

/** Get the share value in Q64.64 format. */
export function valueX64(
  tx: Transaction,
  typeArg: string,
  share: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, share)],
  })
}

/** Get the total share supply in Q64.64 format. */
export function supplyX64(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::supply_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

/** Get the total liability value in Q64.64 format. */
export function liabilityValueX64(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::liability_value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

/** Borrow immutable reference to the debt registry. */
export function borrowRegistry(
  tx: Transaction,
  typeArg: string,
  treasury: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::borrow_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

/** Borrow mutable reference to the debt registry. */
export function borrowMutRegistry(
  tx: Transaction,
  typeArg: string,
  treasury: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::borrow_mut_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

/** Borrow the treasury capability for minting debt tokens. */
export function borrowTreasuryCap(
  tx: Transaction,
  typeArg: string,
  treasury: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::borrow_treasury_cap`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

/** Create a new empty debt registry. */
export function createRegistry(tx: Transaction, typeArg: string, t: GenericArg): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::create_registry`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, t)],
  })
}

/** Create a new debt registry using an existing treasury cap. */
export function createRegistryWithCap(
  tx: Transaction,
  typeArg: string,
  treasuryCap: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::create_registry_with_cap`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasuryCap)],
  })
}

export interface CreateTreasuryArgs {
  witness: GenericArg
  decimals: number | TransactionArgument
  symbol: Array<number | TransactionArgument> | TransactionArgument
  name: Array<number | TransactionArgument> | TransactionArgument
  description: Array<number | TransactionArgument> | TransactionArgument
  iconUrl: TransactionObjectInput | null
}

/** Create a new debt treasury. The treasury has the ability to mint debt as fungible coins. */
export function createTreasury(
  tx: Transaction,
  typeArg: string,
  args: CreateTreasuryArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::create_treasury`,
    typeArguments: [typeArg],
    arguments: [
      generic(tx, `${typeArg}`, args.witness),
      pure(tx, args.decimals, `u8`),
      pure(tx, args.symbol, `vector<u8>`),
      pure(tx, args.name, `vector<u8>`),
      pure(tx, args.description, `vector<u8>`),
      option(tx, `${Url.$typeName}`, args.iconUrl),
    ],
  })
}

/** Create a zero debt share balance. */
export function zero(tx: Transaction, typeArg: string): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::zero`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface IncreaseLiabilityAndIssueX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

/**
 * Increase the liability value and issue corresponding debt shares. Input value is in Q64.64
 * format.
 */
export function increaseLiabilityAndIssueX64(
  tx: Transaction,
  typeArg: string,
  args: IncreaseLiabilityAndIssueX64Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::increase_liability_and_issue_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.valueX64, `u128`),
    ],
  })
}

export interface IncreaseLiabilityAndIssueArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Increase the liability value and issue corresponding debt shares. */
export function increaseLiabilityAndIssue(
  tx: Transaction,
  typeArg: string,
  args: IncreaseLiabilityAndIssueArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::increase_liability_and_issue`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface IncreaseLiabilityX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

/** Increase the liability without issuing new shares. Input value is in Q64.64 format. */
export function increaseLiabilityX64(
  tx: Transaction,
  typeArg: string,
  args: IncreaseLiabilityX64Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::increase_liability_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.valueX64, `u128`),
    ],
  })
}

export interface IncreaseLiabilityArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Increase the liability without issuing new shares. */
export function increaseLiability(
  tx: Transaction,
  typeArg: string,
  args: IncreaseLiabilityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::increase_liability`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface DecreaseLiabilityX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

/** Decrease the liability without repaying shares. Input value is in Q64.64 format. */
export function decreaseLiabilityX64(
  tx: Transaction,
  typeArg: string,
  args: DecreaseLiabilityX64Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::decrease_liability_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.valueX64, `u128`),
    ],
  })
}

export interface DecreaseLiabilityArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Decrease the liability without redeeming shares. */
export function decreaseLiability(
  tx: Transaction,
  typeArg: string,
  args: DecreaseLiabilityArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::decrease_liability`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface CalcRepayX64Args {
  registry: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

/**
 * Calculate the liability amount that would be repaid for the given share value when calling the
 * `repay_x64` function.
 * The input and return values are in Q64.64 format.
 */
export function calcRepayX64(
  tx: Transaction,
  typeArg: string,
  args: CalcRepayX64Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::calc_repay_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.shareValueX64, `u128`),
    ],
  })
}

export interface RepayX64Args {
  registry: TransactionObjectInput
  share: TransactionObjectInput
}

/**
 * Repay the share debt. Reduces the total liability and supply.
 * Returns the value repaid (the amount the liability was reduced by).
 * The returned value is in Q64.64 format.
 */
export function repayX64(tx: Transaction, typeArg: string, args: RepayX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::repay_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      obj(tx, args.share),
    ],
  })
}

export interface CalcRepayLossyArgs {
  registry: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

/**
 * Calculate the liability amount that would be repaid for the given share value when calling the
 * `repay_lossy` function.
 * The input and return values are in Q64.64 format.
 */
export function calcRepayLossy(
  tx: Transaction,
  typeArg: string,
  args: CalcRepayLossyArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::calc_repay_lossy`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.shareValueX64, `u128`),
    ],
  })
}

export interface RepayLossyArgs {
  registry: TransactionObjectInput
  share: TransactionObjectInput
}

/**
 * Lossy. Repay the share debt. Reduces the total liability and supply.
 * Returns the value repaid (i.e., the amount by which the liability was reduced).
 *
 * The repaid amount is rounded up, and any fractional difference is subtracted from the total
 * liability. This effectively reduces the debt of other shares by that fraction.
 */
export function repayLossy(
  tx: Transaction,
  typeArg: string,
  args: RepayLossyArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::repay_lossy`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      obj(tx, args.share),
    ],
  })
}

export interface CalcRepayForAmountX64Args {
  registry: TransactionObjectInput
  amountX64: bigint | TransactionArgument
}

/**
 * Calculate the `EquityShareBalance` required to repay the given amount when calling the
 * `repay_x64` function.
 * Since the resulting repaid value can sometimes be different from the required due to integer
 * arithmetic, the function also returns the calculated repaid value (the amount the liability
 * would be reduced by). This value is always lower than or equal to the required amount.
 * Returns `(share_amount_x64, repaid_value_x64)` tuple. The input and return values are in
 * Q64.64 format.
 */
export function calcRepayForAmountX64(
  tx: Transaction,
  typeArg: string,
  args: CalcRepayForAmountX64Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::calc_repay_for_amount_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.amountX64, `u128`),
    ],
  })
}

export interface CalcRepayForAmountArgs {
  registry: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Calculate the `EquityShareBalance` required to repay the given amount when calling the
 * `repay_lossy` function.
 * The resulting repaid amount will always be exactly equal to the specified amount.
 * Returns the share amount. The input and return values are in Q64.64 format.
 */
export function calcRepayForAmount(
  tx: Transaction,
  typeArg: string,
  args: CalcRepayForAmountArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::calc_repay_for_amount`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface CalcBalanceRepayForAmountArgs {
  registry: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Calculate the share `Balance` required to repay the given amount when calling the
 * `repay_lossy` function.
 * Since the resulting repaid value can sometimes be different from the required due to
 * integer arithmetic, the function also returns the calculated repaid value (the amount
 * the liability would be reduced by). This value is always lower than or equal to the
 * required amount.
 */
export function calcBalanceRepayForAmount(
  tx: Transaction,
  typeArg: string,
  args: CalcBalanceRepayForAmountArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::calc_balance_repay_for_amount`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface IntoBalanceLossyArgs {
  share: TransactionObjectInput
  treasury: TransactionObjectInput
}

/**
 * Lossy. Converts the `DebtShareBalance` to a corresponding `Balance`.
 * The fractional difference from rounding up is added to the total supply of shares,
 * which effectively reduces the debt of other shares against the total liability.
 */
export function intoBalanceLossy(
  tx: Transaction,
  typeArg: string,
  args: IntoBalanceLossyArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::into_balance_lossy`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.share),
      obj(tx, args.treasury),
    ],
  })
}

export interface IntoBalanceArgs {
  share: TransactionObjectInput
  treasury: TransactionObjectInput
}

/**
 * Convert a `DebtShareBalance` to a `Balance` while preserving the fractional part.
 * Not lossy but doesn't consume all the shares.
 */
export function intoBalance(
  tx: Transaction,
  typeArg: string,
  args: IntoBalanceArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::into_balance`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.share),
      obj(tx, args.treasury),
    ],
  })
}

export interface FromBalanceArgs {
  treasury: TransactionObjectInput
  balance: TransactionObjectInput
}

/** Converts the `Balance` to a corresponding `DebtShareBalance`. */
export function fromBalance(
  tx: Transaction,
  typeArg: string,
  args: FromBalanceArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::from_balance`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.treasury),
      obj(tx, args.balance),
    ],
  })
}

export interface SplitX64Args {
  shares: TransactionObjectInput
  amountX64: bigint | TransactionArgument
}

/** Split a `DebtShareBalance` and take a sub balance from it. Input amount is in Q64.64 format. */
export function splitX64(tx: Transaction, typeArg: string, args: SplitX64Args): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::split_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.shares),
      pure(tx, args.amountX64, `u128`),
    ],
  })
}

export interface SplitArgs {
  shares: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Split a `DebtShareBalance` and take a sub balance from it. */
export function split(tx: Transaction, typeArg: string, args: SplitArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::split`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.shares),
      pure(tx, args.amount, `u64`),
    ],
  })
}

/** Withdraw all shares from a `DebtShareBalance`. */
export function withdrawAll(
  tx: Transaction,
  typeArg: string,
  shares: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::withdraw_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, shares)],
  })
}

export interface JoinArgs {
  self: TransactionObjectInput
  other: TransactionObjectInput
}

/** Join two `DebtShareBalance`s. The second balance is consumed. */
export function join(tx: Transaction, typeArg: string, args: JoinArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::join`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.other),
    ],
  })
}

/** Destroy a `DebtShareBalance` with zero value. */
export function destroyZero(
  tx: Transaction,
  typeArg: string,
  shares: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::destroy_zero`,
    typeArguments: [typeArg],
    arguments: [obj(tx, shares)],
  })
}

/** Destroy an empty `DebtRegistry`. */
export function destroyEmptyRegistry(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage')}::debt::destroy_empty_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}
