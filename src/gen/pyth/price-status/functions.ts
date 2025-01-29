import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function fromU64(tx: Transaction, status: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_status::from_u64`,
    arguments: [pure(tx, status, `u64`)],
  })
}

export function getStatus(tx: Transaction, priceStatus: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_status::get_status`,
    arguments: [obj(tx, priceStatus)],
  })
}

export function newTrading(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::price_status::new_trading`, arguments: [] })
}

export function newUnknown(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::price_status::new_unknown`, arguments: [] })
}
