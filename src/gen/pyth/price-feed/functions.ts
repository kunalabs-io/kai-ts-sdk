import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export interface NewArgs {
  priceIdentifier: TransactionObjectInput
  price: TransactionObjectInput
  emaPrice: TransactionObjectInput
}

export function new_(tx: Transaction, args: NewArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_feed::new`,
    arguments: [
      obj(tx, args.priceIdentifier),
      obj(tx, args.price),
      obj(tx, args.emaPrice),
    ],
  })
}

export function from(tx: Transaction, priceFeed: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_feed::from`,
    arguments: [obj(tx, priceFeed)],
  })
}

export function getPriceIdentifier(
  tx: Transaction,
  priceFeed: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_feed::get_price_identifier`,
    arguments: [obj(tx, priceFeed)],
  })
}

export function getPrice(tx: Transaction, priceFeed: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_feed::get_price`,
    arguments: [obj(tx, priceFeed)],
  })
}

export function getEmaPrice(tx: Transaction, priceFeed: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_feed::get_ema_price`,
    arguments: [obj(tx, priceFeed)],
  })
}
