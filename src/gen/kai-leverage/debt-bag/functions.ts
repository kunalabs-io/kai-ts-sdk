import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function empty(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::debt_bag::empty`, arguments: [] })
}

export interface GetAssetIdxOptArgs {
  self: TransactionObjectInput
  assetType: TransactionObjectInput
}

export function getAssetIdxOpt(tx: Transaction, args: GetAssetIdxOptArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::get_asset_idx_opt`,
    arguments: [obj(tx, args.self), obj(tx, args.assetType)],
  })
}

export interface GetShareIdxOptArgs {
  self: TransactionObjectInput
  shareType: TransactionObjectInput
}

export function getShareIdxOpt(tx: Transaction, args: GetShareIdxOptArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::get_share_idx_opt`,
    arguments: [obj(tx, args.self), obj(tx, args.shareType)],
  })
}

export interface GetShareIdxArgs {
  self: TransactionObjectInput
  shareType: TransactionObjectInput
}

export function getShareIdx(tx: Transaction, args: GetShareIdxArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::get_share_idx`,
    arguments: [obj(tx, args.self), obj(tx, args.shareType)],
  })
}

export function key(tx: Transaction, info: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::debt_bag::key`, arguments: [obj(tx, info)] })
}

export interface AddArgs {
  self: TransactionObjectInput
  shares: TransactionObjectInput
}

export function add(tx: Transaction, typeArgs: [string, string], args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::add`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.self), obj(tx, args.shares)],
  })
}

export interface TakeAmtArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function takeAmt(tx: Transaction, typeArg: string, args: TakeAmtArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::take_amt`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.self), pure(tx, args.amount, `u128`)],
  })
}

export function takeAll(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::take_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function getShareAmountByAssetType(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::get_share_amount_by_asset_type`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function getShareAmountByShareType(
  tx: Transaction,
  typeArg: string,
  debtBag: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::get_share_amount_by_share_type`,
    typeArguments: [typeArg],
    arguments: [obj(tx, debtBag)],
  })
}

export function getShareTypeForAsset(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::get_share_type_for_asset`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function shareTypeMatchesAssetIfAnyExists(
  tx: Transaction,
  typeArgs: [string, string],
  self: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::share_type_matches_asset_if_any_exists`,
    typeArguments: typeArgs,
    arguments: [obj(tx, self)],
  })
}

export function isEmpty(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::debt_bag::is_empty`, arguments: [obj(tx, self)] })
}

export function destroyEmpty(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::debt_bag::destroy_empty`,
    arguments: [obj(tx, self)],
  })
}

export function size(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::debt_bag::size`, arguments: [obj(tx, self)] })
}

export function length(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::debt_bag::length`, arguments: [obj(tx, self)] })
}
