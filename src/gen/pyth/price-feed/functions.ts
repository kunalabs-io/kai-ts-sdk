import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  priceIdentifier: TransactionObjectInput
  price: TransactionObjectInput
  emaPrice: TransactionObjectInput
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_feed::new`,
    arguments: [obj(tx, args.priceIdentifier), obj(tx, args.price), obj(tx, args.emaPrice)],
  })
}

export function from(tx: Transaction, priceFeed: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_feed::from`,
    arguments: [obj(tx, priceFeed)],
  })
}

export function getPriceIdentifier(tx: Transaction, priceFeed: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_feed::get_price_identifier`,
    arguments: [obj(tx, priceFeed)],
  })
}

export function getPrice(tx: Transaction, priceFeed: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_feed::get_price`,
    arguments: [obj(tx, priceFeed)],
  })
}

export function getEmaPrice(tx: Transaction, priceFeed: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_feed::get_ema_price`,
    arguments: [obj(tx, priceFeed)],
  })
}
