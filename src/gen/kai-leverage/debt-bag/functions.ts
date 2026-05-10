import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Create an empty `DebtBag`. */
export function empty(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::empty`,
    arguments: [],
  })
}

export interface GetAssetIdxOptArgs {
  self: TransactionObjectInput
  assetType: TransactionObjectInput
}

export function getAssetIdxOpt(
  tx: Transaction,
  args: GetAssetIdxOptArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::get_asset_idx_opt`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.assetType),
    ],
  })
}

export interface GetShareIdxOptArgs {
  self: TransactionObjectInput
  shareType: TransactionObjectInput
}

export function getShareIdxOpt(
  tx: Transaction,
  args: GetShareIdxOptArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::get_share_idx_opt`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.shareType),
    ],
  })
}

export interface GetShareIdxArgs {
  self: TransactionObjectInput
  shareType: TransactionObjectInput
}

export function getShareIdx(
  tx: Transaction,
  args: GetShareIdxArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::get_share_idx`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.shareType),
    ],
  })
}

export function key(
  tx: Transaction,
  info: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::key`,
    arguments: [obj(tx, info)],
  })
}

export interface AddArgs {
  self: TransactionObjectInput
  shares: TransactionObjectInput
}

/**
 * Add `DebtShareBalance<ST>` for asset `T`, merging with existing entry when present.
 *
 * Guarantees:
 * - Enforces bijective mapping between asset type `T` and share type `ST`
 * - Merges with existing shares if asset exists, creates new entry otherwise
 * - Automatically destroys zero-value shares
 * - Maintains synchronized state between `infos` vector and `bag` storage
 * - Aborts with `EAssetShareTypeMismatch` if share type conflicts with existing asset
 */
export function add(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::add`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.shares),
    ],
  })
}

export interface TakeAmtArgs {
  self: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Take `amount` of shares of type `ST` from the bag. Returns zero if `amount` is 0. */
export function takeAmt(
  tx: Transaction,
  typeArg: string,
  args: TakeAmtArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::take_amt`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      pure(tx, args.amount, `u128`),
    ],
  })
}

/** Remove and return all shares of type `ST`. Returns zero if not present. */
export function takeAll(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::take_all`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/** Total shares amount for the given asset type `T`. */
export function getShareAmountByAssetType(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::debt_bag::get_share_amount_by_asset_type`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/** Total shares amount for the given share type `ST`. */
export function getShareAmountByShareType(
  tx: Transaction,
  typeArg: string,
  debtBag: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::debt_bag::get_share_amount_by_share_type`,
    typeArguments: [typeArg],
    arguments: [obj(tx, debtBag)],
  })
}

/** Get the share type corresponding to asset type `T`. Aborts if none. */
export function getShareTypeForAsset(
  tx: Transaction,
  typeArg: string,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::get_share_type_for_asset`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

/**
 * Returns true if either:
 * - Neither the asset type `T` nor the share type `ST` exist in the `DebtBag`, or
 * - Both exist and the share type corresponds to the asset type.
 * Returns false if only one exists, or if both exist but the share type
 * does not correspond to the asset type.
 */
export function shareTypeMatchesAssetIfAnyExists(
  tx: Transaction,
  typeArgs: [string, string],
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage', options?.env)
    }::debt_bag::share_type_matches_asset_if_any_exists`,
    typeArguments: typeArgs,
    arguments: [obj(tx, self)],
  })
}

/** True if the bag contains no entries. */
export function isEmpty(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::is_empty`,
    arguments: [obj(tx, self)],
  })
}

/** Destroy an empty bag and its inner storage. */
export function destroyEmpty(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::destroy_empty`,
    arguments: [obj(tx, self)],
  })
}

/** @deprecated Renamed to `length` for consistency. */
export function size(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::size`,
    arguments: [obj(tx, self)],
  })
}

/** Number of different asset/share entries in the bag. */
export function length(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_bag::length`,
    arguments: [obj(tx, self)],
  })
}
