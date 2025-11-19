import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface NewArgs {
  currentSqrtPrice: bigint | TransactionArgument
  removePercent: bigint | TransactionArgument
}

export function new_(tx: Transaction, args: NewArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::new`,
    arguments: [pure(tx, args.currentSqrtPrice, `u128`), pure(tx, args.removePercent, `u64`)],
  })
}

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

export function totalValueCut(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::total_value_cut`,
    arguments: [obj(tx, snapshot)],
  })
}

export function valueCut(tx: Transaction, snapshot: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::value_cut`,
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

export interface AddArgs {
  snapshot: TransactionObjectInput
  positionId: string | TransactionArgument
  valueCut: bigint | TransactionArgument
  positionInfo: TransactionObjectInput
}

export function add(tx: Transaction, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::add`,
    arguments: [
      obj(tx, args.snapshot),
      pure(tx, args.positionId, `${ID.$typeName}`),
      pure(tx, args.valueCut, `u64`),
      obj(tx, args.positionInfo),
    ],
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

export interface RemoveArgs {
  snapshot: TransactionObjectInput
  positionId: string | TransactionArgument
}

export function remove(tx: Transaction, args: RemoveArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::position_snapshot::remove`,
    arguments: [obj(tx, args.snapshot), pure(tx, args.positionId, `${ID.$typeName}`)],
  })
}
