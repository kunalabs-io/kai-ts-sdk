import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CoinsOwedRewardArgs {
  position: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function coinsOwedReward(tx: Transaction, args: CoinsOwedRewardArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::coins_owed_reward`,
    arguments: [obj(tx, args.position), pure(tx, args.index, `u64`)],
  })
}

export function getAccruedFee(tx: Transaction, position: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::get_accrued_fee`,
    arguments: [obj(tx, position)],
  })
}

export function isEmpty(tx: Transaction, position: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::is_empty`,
    arguments: [obj(tx, position)],
  })
}

export function liquidity(tx: Transaction, position: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::liquidity`,
    arguments: [obj(tx, position)],
  })
}

export function lowerTick(tx: Transaction, position: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::lower_tick`,
    arguments: [obj(tx, position)],
  })
}

export function poolId(tx: Transaction, position: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::pool_id`,
    arguments: [obj(tx, position)],
  })
}

export function upperTick(tx: Transaction, position: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position::upper_tick`,
    arguments: [obj(tx, position)],
  })
}
