import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  price: TransactionObjectInput
  conf: bigint | TransactionArgument
  expo: TransactionObjectInput
  timestamp: bigint | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price::new`,
    arguments: [
      obj(tx, args.price),
      pure(tx, args.conf, `u64`),
      obj(tx, args.expo),
      pure(tx, args.timestamp, `u64`),
    ],
  })
}

export function getPrice(tx: Transaction, price: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::price::get_price`, arguments: [obj(tx, price)] })
}

export function getConf(tx: Transaction, price: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::price::get_conf`, arguments: [obj(tx, price)] })
}

export function getTimestamp(tx: Transaction, price: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price::get_timestamp`,
    arguments: [obj(tx, price)],
  })
}

export function getExpo(tx: Transaction, price: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::price::get_expo`, arguments: [obj(tx, price)] })
}
