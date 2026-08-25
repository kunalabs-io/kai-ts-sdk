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

/** Create a new, empty price collection. */
export function create(
  tx: Transaction,
  clock: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::create`,
    arguments: [obj(tx, clock)],
  })
}

export interface AddPythProArgs {
  self: TransactionObjectInput
  info: TransactionObjectInput
}

/** Add a price from the Pyth Pro ("pro-compatible") package's price object. */
export function addPythPro(
  tx: Transaction,
  args: AddPythProArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::add_pyth_pro`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.info),
    ],
  })
}

export interface AddCurrencyArgs {
  self: TransactionObjectInput
  currency: TransactionObjectInput
}

/**
 * Record the decimals for coin type `T` from its canonical registry
 * `Currency<T>` object (`sui::coin_registry`, shared object `0xc`) —
 * uniqueness per coin type is enforced by the framework, so the value is
 * evidence, not caller opinion.
 */
export function addCurrency(
  tx: Transaction,
  typeArg: string,
  args: AddCurrencyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::add_currency`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.currency),
    ],
  })
}

export interface ValidateArgs {
  self: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
  priceObjectAllowlist: TransactionObjectInput
}

/**
 * Validate a collection against a config's age limit and allowlist.
 * Staleness is checked per allowlisted entry — only feeds the config
 * relies on gate validation. Every allowlisted coin must also carry a
 * registry-sourced decimals entry (`add_currency`).
 */
export function validate(
  tx: Transaction,
  args: ValidateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::validate`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.maxAgeSecs, `u64`),
      obj(tx, args.priceObjectAllowlist),
    ],
  })
}

/** Maximum observed age among the validated price feeds, in seconds. */
export function maxAgeSecs(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::max_age_secs`,
    arguments: [obj(tx, self)],
  })
}

export interface GetPriceArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
}

/** Get the spot quote for a coin type. */
export function getPrice(
  tx: Transaction,
  args: GetPriceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::get_price`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
    ],
  })
}

export interface GetSmoothedPriceArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
}

/**
 * Get the smoothed (manipulation-resistant reference) quote for a coin
 * type. Aborts if the rail that supplied this price provides none —
 * substituting spot here is a risk-policy decision that must be taken
 * explicitly in code, never implied.
 */
export function getSmoothedPrice(
  tx: Transaction,
  args: GetSmoothedPriceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::get_smoothed_price`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
    ],
  })
}

export function quotePrice(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::quote_price`,
    arguments: [obj(tx, self)],
  })
}

export function quoteConf(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::quote_conf`,
    arguments: [obj(tx, self)],
  })
}

export function quoteExpoNeg(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::quote_expo_neg`,
    arguments: [obj(tx, self)],
  })
}

export interface DecimalsArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
}

/** Get the registry-sourced decimal places for a validated coin type. */
export function decimals(
  tx: Transaction,
  args: DecimalsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::decimals`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
    ],
  })
}

export interface QuotePriceExpoDecArgs {
  self: TransactionObjectInput
  quote: TransactionObjectInput
  t: TransactionObjectInput
}

export function quotePriceExpoDec(
  tx: Transaction,
  args: QuotePriceExpoDecArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::quote_price_expo_dec`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.quote),
      obj(tx, args.t),
    ],
  })
}

export interface DivNumericX128InnerArgs {
  self: TransactionObjectInput
  x: TransactionObjectInput
  y: TransactionObjectInput
  useSmoothed: boolean | TransactionArgument
}

export function divNumericX128Inner(
  tx: Transaction,
  args: DivNumericX128InnerArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::div_numeric_x128_inner`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.x),
      obj(tx, args.y),
      pure(tx, args.useSmoothed, `bool`),
    ],
  })
}

export interface DivPriceNumericX128Args {
  self: TransactionObjectInput
  x: TransactionObjectInput
  y: TransactionObjectInput
}

/**
 * Returns the price of `Y` in `X` such that `X * price = Y` i.e. `price = Y / X`.
 * The returned value is in Q64.128 format.
 */
export function divPriceNumericX128(
  tx: Transaction,
  args: DivPriceNumericX128Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::oracle_price::div_price_numeric_x128`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.x),
      obj(tx, args.y),
    ],
  })
}

export interface DivSmoothedPriceNumericX128Args {
  self: TransactionObjectInput
  x: TransactionObjectInput
  y: TransactionObjectInput
}

/**
 * Returns the price of `Y` in `X` such that `X * price = Y` i.e. `price = Y / X`.
 * The returned value is in Q64.128 format.
 * Uses the smoothed (manipulation-resistant) price instead of spot.
 */
export function divSmoothedPriceNumericX128(
  tx: Transaction,
  args: DivSmoothedPriceNumericX128Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::oracle_price::div_smoothed_price_numeric_x128`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.x),
      obj(tx, args.y),
    ],
  })
}
