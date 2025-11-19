import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function create(tx: Transaction, clock: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::pyth::create`, arguments: [obj(tx, clock)] })
}

export interface AddArgs {
  self: TransactionObjectInput
  info: TransactionObjectInput
}

export function add(tx: Transaction, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::add`,
    arguments: [obj(tx, args.self), obj(tx, args.info)],
  })
}

export interface ValidateArgs {
  info: TransactionObjectInput
  maxAgeSecs: bigint | TransactionArgument
  pioAllowlist: TransactionObjectInput
}

export function validate(tx: Transaction, args: ValidateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::validate`,
    arguments: [obj(tx, args.info), pure(tx, args.maxAgeSecs, `u64`), obj(tx, args.pioAllowlist)],
  })
}

export function maxAgeSecs(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::pyth::max_age_secs`, arguments: [obj(tx, self)] })
}

export function decimals(tx: Transaction, type: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::pyth::decimals`, arguments: [obj(tx, type)] })
}

export interface GetPriceArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
}

export function getPrice(tx: Transaction, args: GetPriceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_price`,
    arguments: [obj(tx, args.self), obj(tx, args.type)],
  })
}

export interface GetEmaPriceArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
}

export function getEmaPrice(tx: Transaction, args: GetEmaPriceArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_ema_price`,
    arguments: [obj(tx, args.self), obj(tx, args.type)],
  })
}

export interface GetPriceLoHiExpoDecArgs {
  priceInfo: TransactionObjectInput
  t: TransactionObjectInput
}

export function getPriceLoHiExpoDec(tx: Transaction, args: GetPriceLoHiExpoDecArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_price_lo_hi_expo_dec`,
    arguments: [obj(tx, args.priceInfo), obj(tx, args.t)],
  })
}

export interface GetEmaPriceLoHiExpoDecArgs {
  priceInfo: TransactionObjectInput
  t: TransactionObjectInput
}

export function getEmaPriceLoHiExpoDec(tx: Transaction, args: GetEmaPriceLoHiExpoDecArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::get_ema_price_lo_hi_expo_dec`,
    arguments: [obj(tx, args.priceInfo), obj(tx, args.t)],
  })
}

export interface DivPriceNumericX128InnerArgs {
  priceInfo: TransactionObjectInput
  x: TransactionObjectInput
  y: TransactionObjectInput
  useEma: boolean | TransactionArgument
}

export function divPriceNumericX128Inner(tx: Transaction, args: DivPriceNumericX128InnerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::div_price_numeric_x128_inner`,
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

export function divPriceNumericX128(tx: Transaction, args: DivPriceNumericX128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::div_price_numeric_x128`,
    arguments: [obj(tx, args.priceInfo), obj(tx, args.x), obj(tx, args.y)],
  })
}

export interface DivEmaPriceNumericX128Args {
  priceInfo: TransactionObjectInput
  x: TransactionObjectInput
  y: TransactionObjectInput
}

export function divEmaPriceNumericX128(tx: Transaction, args: DivEmaPriceNumericX128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pyth::div_ema_price_numeric_x128`,
    arguments: [obj(tx, args.priceInfo), obj(tx, args.x), obj(tx, args.y)],
  })
}
