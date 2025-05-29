import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function empty(tx: Transaction, facilId: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::empty`,
    arguments: [pure(tx, facilId, `${ID.$typeName}`)],
  })
}

export function facilId(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::debt_info::facil_id`, arguments: [obj(tx, self)] })
}

export interface AddArgs {
  self: TransactionObjectInput
  registry: TransactionObjectInput
}

export function add(tx: Transaction, typeArg: string, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::add`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), obj(tx, args.registry)],
  })
}

export interface AddFromSupplyPoolArgs {
  self: TransactionObjectInput
  pool: TransactionObjectInput
  clock: TransactionObjectInput
}

export function addFromSupplyPool(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddFromSupplyPoolArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::add_from_supply_pool`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.self), obj(tx, args.pool), obj(tx, args.clock)],
  })
}

export interface ValidateArgs {
  self: TransactionObjectInput
  facilId: string | TransactionArgument
}

export function validate(tx: Transaction, args: ValidateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::validate`,
    arguments: [obj(tx, args.self), pure(tx, args.facilId, `${ID.$typeName}`)],
  })
}

export interface CalcRepayX64Args {
  self: TransactionObjectInput
  type: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRepayX64(tx: Transaction, args: CalcRepayX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::calc_repay_x64`,
    arguments: [obj(tx, args.self), obj(tx, args.type), pure(tx, args.shareValueX64, `u128`)],
  })
}

export interface CalcRepayLossyArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRepayLossy(tx: Transaction, args: CalcRepayLossyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::calc_repay_lossy`,
    arguments: [obj(tx, args.self), obj(tx, args.type), pure(tx, args.shareValueX64, `u128`)],
  })
}

export interface CalcRepayForAmountArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function calcRepayForAmount(tx: Transaction, args: CalcRepayForAmountArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::calc_repay_for_amount`,
    arguments: [obj(tx, args.self), obj(tx, args.type), pure(tx, args.amount, `u64`)],
  })
}

export interface CalcRepayBySharesArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRepayByShares(tx: Transaction, args: CalcRepayBySharesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::calc_repay_by_shares`,
    arguments: [obj(tx, args.self), obj(tx, args.type), pure(tx, args.shareValueX64, `u128`)],
  })
}

export interface CalcRepayByAmountArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function calcRepayByAmount(tx: Transaction, args: CalcRepayByAmountArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_info::calc_repay_by_amount`,
    arguments: [obj(tx, args.self), obj(tx, args.type), pure(tx, args.amount, `u64`)],
  })
}
