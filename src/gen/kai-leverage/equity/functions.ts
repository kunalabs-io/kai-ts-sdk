import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, option, pure } from '../../_framework/util'
import { Url } from '../../sui/url/structs'

/** Get the share value in Q64.64 format. */
export function valueX64(
  tx: Transaction,
  typeArg: string,
  share: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, share)],
  })
}

/** Get the total share supply in Q64.64 format. */
export function supplyX64(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::supply_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

/** Get the total underlying value in Q64.64 format. */
export function underlyingValueX64(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::underlying_value_x64`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}

/** Borrow immutable reference to the equity registry. */
export function borrowRegistry(
  tx: Transaction,
  typeArg: string,
  treasury: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::borrow_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

/** Borrow mutable reference to the equity registry. */
export function borrowMutRegistry(
  tx: Transaction,
  typeArg: string,
  treasury: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::borrow_mut_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

/** Borrow the treasury capability for minting equity tokens. */
export function borrowTreasuryCap(
  tx: Transaction,
  typeArg: string,
  treasury: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::borrow_treasury_cap`,
    typeArguments: [typeArg],
    arguments: [obj(tx, treasury)],
  })
}

/** Create a new empty equity registry. */
export function createRegistry(
  tx: Transaction,
  typeArg: string,
  t: GenericArg,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::create_registry`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, t)],
  })
}

/** Create a new equity registry using an existing treasury cap. */
export function createRegistryWithCap(
  tx: Transaction,
  typeArg: string,
  treasuryCap: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::create_registry_with_cap`,
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

/**
 * Create a new equity treasury. The treasury has the ability to mint equity as fungible coins.
 *
 * @deprecated TODO: migrate currency creation to `coin_registry`
 */
export function createTreasury(
  tx: Transaction,
  typeArg: string,
  args: CreateTreasuryArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::create_treasury`,
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

/** Create a zero equity share balance. */
export function zero(
  tx: Transaction,
  typeArg: string,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::zero`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface IncreaseValueAndIssueX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

/** Increase the underlying value and issue corresponding shares. Input value is in Q64.64 format. */
export function increaseValueAndIssueX64(
  tx: Transaction,
  typeArg: string,
  args: IncreaseValueAndIssueX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::increase_value_and_issue_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.valueX64, `u128`),
    ],
  })
}

export interface IncreaseValueAndIssueArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Increase the underlying value and issue corresponding shares. */
export function increaseValueAndIssue(
  tx: Transaction,
  typeArg: string,
  args: IncreaseValueAndIssueArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::increase_value_and_issue`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface IncreaseValueX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

/** Increase the underlying value without issuing new shares. Input value is in Q64.64 format. */
export function increaseValueX64(
  tx: Transaction,
  typeArg: string,
  args: IncreaseValueX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::increase_value_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.valueX64, `u128`),
    ],
  })
}

export interface IncreaseValueArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Increase the underlying value without issuing new shares. */
export function increaseValue(
  tx: Transaction,
  typeArg: string,
  args: IncreaseValueArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::increase_value`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface DecreaseValueX64Args {
  registry: TransactionObjectInput
  valueX64: bigint | TransactionArgument
}

/** Decrease the underlying value without redeeming shares. Input value is in Q64.64 format. */
export function decreaseValueX64(
  tx: Transaction,
  typeArg: string,
  args: DecreaseValueX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::decrease_value_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.valueX64, `u128`),
    ],
  })
}

export interface DecreaseValueArgs {
  registry: TransactionObjectInput
  value: bigint | TransactionArgument
}

/** Decrease the underlying value without redeeming shares. */
export function decreaseValue(
  tx: Transaction,
  typeArg: string,
  args: DecreaseValueArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::decrease_value`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.value, `u64`),
    ],
  })
}

export interface CalcRedeemX64Args {
  registry: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

/**
 * Calculate the amount of underlying value that would be redeemed for the given share value when calling the
 * `redeem_x64` function.
 * The input and return values are in Q64.64 format.
 */
export function calcRedeemX64(
  tx: Transaction,
  typeArg: string,
  args: CalcRedeemX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::calc_redeem_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.shareValueX64, `u128`),
    ],
  })
}

export interface RedeemX64Args {
  registry: TransactionObjectInput
  share: TransactionObjectInput
}

/**
 * Redeem the shares for the underlying value. Reduces the underlying value and supply.
 * Returns the value redeemed (the amount the underlying value was reduced by).
 * The returned value is in Q64.64 format.
 */
export function redeemX64(
  tx: Transaction,
  typeArg: string,
  args: RedeemX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::redeem_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      obj(tx, args.share),
    ],
  })
}

export interface CalcRedeemLossyArgs {
  registry: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

/**
 * Calculate the amount of underlying value that would be redeemed for the given share value when calling the
 * `redeem_lossy` function.
 * The input and return values are in Q64.64 format.
 */
export function calcRedeemLossy(
  tx: Transaction,
  typeArg: string,
  args: CalcRedeemLossyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::calc_redeem_lossy`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.shareValueX64, `u128`),
    ],
  })
}

export interface RedeemLossyArgs {
  registry: TransactionObjectInput
  share: TransactionObjectInput
}

/**
 * Lossy. Redeem the shares for the underlying value. Reduces the underlying value and supply.
 * Returns the value redeemed (i.e., the amount by which the underlying value was reduced).
 *
 * The redeemed amount is rounded down, and any fractional difference is added back to the total
 * underlying value. This effectively increases the value of other shares by that fraction.
 */
export function redeemLossy(
  tx: Transaction,
  typeArg: string,
  args: RedeemLossyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::redeem_lossy`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      obj(tx, args.share),
    ],
  })
}

export interface CalcRedeemForAmountX64Args {
  registry: TransactionObjectInput
  amountX64: bigint | TransactionArgument
}

/**
 * Calculate the amount of shares required to redeem the given amount of underlying value when calling the
 * `redeem_for_amount_x64` function.
 * Since the resulting redeemed value can sometimes be different from the required due to integer
 * arithmetic, the function also returns the calculated redeemed value (the amount the underlying value
 * would be reduced by). This value is always greater than or equal to the required amount.
 * Returns `(share_amount_x64, redeemed_value_x64)` tuple. The input and return values are in
 * Q64.64 format.
 */
export function calcRedeemForAmountX64(
  tx: Transaction,
  typeArg: string,
  args: CalcRedeemForAmountX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::calc_redeem_for_amount_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.amountX64, `u128`),
    ],
  })
}

export interface CalcRedeemForAmountArgs {
  registry: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Calculate the amount of `EquityShareBalance` required to redeem the given amount of underlying
 * value when calling the `redeem_lossy` function.
 * The resulting redeemed amount will always be exactly equal to the specified amount.
 * Returns the share amount. The input and return values are in Q64.64 format.
 */
export function calcRedeemForAmount(
  tx: Transaction,
  typeArg: string,
  args: CalcRedeemForAmountArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::calc_redeem_for_amount`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.registry),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface CalcBalanceRedeemForAmountArgs {
  registry: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/**
 * Calculate the amount of share `Balance` required to redeem the given amount of underlying value
 * when calling the `redeem_lossy` function.
 * Since the resulting redeemed value can sometimes be different from the required due to
 * integer arithmetic, the function also returns the calculated redeemed value (the amount
 * the underlying value would be reduced by). This value is always greater than or equal to the
 * required amount.
 */
export function calcBalanceRedeemForAmount(
  tx: Transaction,
  typeArg: string,
  args: CalcBalanceRedeemForAmountArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::equity::calc_balance_redeem_for_amount`,
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
 * Lossy. Converts the `EquityShareBalance` to a corresponding `Balance`.
 * The fractional difference from rounding down is subtracted from the total supply of shares,
 * which effectively increases the value of other shares against the underlying.
 */
export function intoBalanceLossy(
  tx: Transaction,
  typeArg: string,
  args: IntoBalanceLossyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::into_balance_lossy`,
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
 * Convert a `EquityShareBalance` to a `Balance` while preserving the fractional part.
 * Not lossy but doesn't consume all the shares.
 */
export function intoBalance(
  tx: Transaction,
  typeArg: string,
  args: IntoBalanceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::into_balance`,
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

/** Converts the `Balance` to a corresponding `EquityShareBalance`. */
export function fromBalance(
  tx: Transaction,
  typeArg: string,
  args: FromBalanceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::from_balance`,
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

/** Split a `EquityShareBalance` and take a sub balance from it. Input amount is in Q64.64 format. */
export function splitX64(
  tx: Transaction,
  typeArg: string,
  args: SplitX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::split_x64`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.shares),
      pure(tx, args.amountX64, `u128`),
    ],
  })
}

/** Withdraw all shares from a `EquityShareBalance`. */
export function withdrawAll(
  tx: Transaction,
  typeArg: string,
  shares: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::withdraw_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, shares)],
  })
}

export interface SplitArgs {
  share: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Split a `EquityShareBalance` and take a sub balance from it. */
export function split(
  tx: Transaction,
  typeArg: string,
  args: SplitArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::split`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.share),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface JoinArgs {
  self: TransactionObjectInput
  other: TransactionObjectInput
}

/** Join two `EquityShareBalance`s. The second balance is consumed. */
export function join(
  tx: Transaction,
  typeArg: string,
  args: JoinArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::join`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.other),
    ],
  })
}

/** Destroy a `EquityShareBalance` with zero value. */
export function destroyZero(
  tx: Transaction,
  typeArg: string,
  shares: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::destroy_zero`,
    typeArguments: [typeArg],
    arguments: [obj(tx, shares)],
  })
}

/** Destroy an empty `EquityRegistry`. */
export function destroyEmptyRegistry(
  tx: Transaction,
  typeArg: string,
  registry: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::equity::destroy_empty_registry`,
    typeArguments: [typeArg],
    arguments: [obj(tx, registry)],
  })
}
