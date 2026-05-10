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

/** Create a new Pyth price info collection. */
export function create(
  tx: Transaction,
  clock: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::create`,
    arguments: [obj(tx, clock)],
  })
}

export interface AddArgs {
  self: TransactionObjectInput
  info: TransactionObjectInput
}

/** Add a price info object to the collection. */
export function add(
  tx: Transaction,
  args: AddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::add`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.info),
    ],
  })
}

export interface ValidateArgs {
  info: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
  pioAllowlist: TransactionObjectInput
}

/** Validate price info against age limits and allowlist. */
export function validate(
  tx: Transaction,
  args: ValidateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::validate`,
    arguments: [
      obj(tx, args.info),
      pure(tx, args.maxAgeSecs, `u64`),
      obj(tx, args.pioAllowlist),
    ],
  })
}

/** Get the maximum age of price feeds in seconds. */
export function maxAgeSecs(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::max_age_secs`,
    arguments: [obj(tx, self)],
  })
}

/** Get the decimal places for a supported token type. */
export function decimals(
  tx: Transaction,
  type: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::decimals`,
    arguments: [obj(tx, type)],
  })
}

export interface GetPriceArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
}

/** Get the current price for a token type. */
export function getPrice(
  tx: Transaction,
  args: GetPriceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::get_price`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
    ],
  })
}

export interface GetEmaPriceArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
}

/** Get the EMA price for a token type. */
export function getEmaPrice(
  tx: Transaction,
  args: GetEmaPriceArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::get_ema_price`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
    ],
  })
}

export interface GetPriceLoHiExpoDecArgs {
  priceInfo: TransactionObjectInput
  t: TransactionObjectInput
}

export function getPriceLoHiExpoDec(
  tx: Transaction,
  args: GetPriceLoHiExpoDecArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::get_price_lo_hi_expo_dec`,
    arguments: [
      obj(tx, args.priceInfo),
      obj(tx, args.t),
    ],
  })
}

export interface GetEmaPriceLoHiExpoDecArgs {
  priceInfo: TransactionObjectInput
  t: TransactionObjectInput
}

export function getEmaPriceLoHiExpoDec(
  tx: Transaction,
  args: GetEmaPriceLoHiExpoDecArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::get_ema_price_lo_hi_expo_dec`,
    arguments: [
      obj(tx, args.priceInfo),
      obj(tx, args.t),
    ],
  })
}

export interface DivPriceNumericX128InnerArgs {
  priceInfo: TransactionObjectInput
  x: TransactionObjectInput
  y: TransactionObjectInput
  useEma: boolean | TransactionArgument
}

export function divPriceNumericX128Inner(
  tx: Transaction,
  args: DivPriceNumericX128InnerArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::div_price_numeric_x128_inner`,
    arguments: [
      obj(tx, args.priceInfo),
      obj(tx, args.x),
      obj(tx, args.y),
      pure(tx, args.useEma, `bool`),
    ],
  })
}

export interface DivPriceNumericX128Args {
  priceInfo: TransactionObjectInput
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
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::div_price_numeric_x128`,
    arguments: [
      obj(tx, args.priceInfo),
      obj(tx, args.x),
      obj(tx, args.y),
    ],
  })
}

export interface DivEmaPriceNumericX128Args {
  priceInfo: TransactionObjectInput
  x: TransactionObjectInput
  y: TransactionObjectInput
}

/**
 * Returns the price of `Y` in `X` such that `X * price = Y` i.e. `price = Y / X`.
 * The returned value is in Q64.128 format.
 * Uses EMA price instead of spot price.
 */
export function divEmaPriceNumericX128(
  tx: Transaction,
  args: DivEmaPriceNumericX128Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::pyth::div_ema_price_numeric_x128`,
    arguments: [
      obj(tx, args.priceInfo),
      obj(tx, args.x),
      obj(tx, args.y),
    ],
  })
}
