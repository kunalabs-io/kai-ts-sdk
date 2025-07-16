import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function removePercent(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::remove_percent`,
    arguments: [obj(tx, snapshot)],
  })
}

export function currentSqrtPrice(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::current_sqrt_price`,
    arguments: [obj(tx, snapshot)],
  })
}

export function totalValueCutted(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::total_value_cutted`,
    arguments: [obj(tx, snapshot)],
  })
}

export function valueCutted(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::value_cutted`,
    arguments: [obj(tx, snapshot)],
  })
}

export function rewards(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::rewards`,
    arguments: [obj(tx, snapshot)],
  })
}

export function feeOwned(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::fee_owned`,
    arguments: [obj(tx, snapshot)],
  })
}

export function tickRange(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::tick_range`,
    arguments: [obj(tx, snapshot)],
  })
}

export function liquidity(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::liquidity`,
    arguments: [obj(tx, snapshot)],
  })
}

export function positionId(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::position_id`,
    arguments: [obj(tx, snapshot)],
  })
}

export interface CalculateRemoveLiquidityArgs {
  snapshot: TransactionObjectInput
  positionInfo: TransactionObjectInput
}

export function calculateRemoveLiquidity(tx: Transaction, args: CalculateRemoveLiquidityArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::calculate_remove_liquidity`,
    arguments: [obj(tx, args.snapshot), obj(tx, args.positionInfo)],
  })
}

export interface GetArgs {
  snapshot: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function get(tx: Transaction, args: GetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::get`,
    arguments: [obj(tx, args.snapshot), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}

export interface ContainsArgs {
  snapshot: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function contains(tx: Transaction, args: ContainsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::contains`,
    arguments: [obj(tx, args.snapshot), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}
