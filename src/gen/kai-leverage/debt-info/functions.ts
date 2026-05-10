import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'

/** Create an empty debt info collection for a lending facility. */
export function empty(
  tx: Transaction,
  facilId: string | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::empty`,
    arguments: [pure(tx, facilId, `${ID.$typeName}`)],
  })
}

/** Get the lending facility ID. */
export function facilId(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::facil_id`,
    arguments: [obj(tx, self)],
  })
}

export interface AddArgs {
  self: TransactionObjectInput
  registry: TransactionObjectInput
}

/** Add debt information from a debt registry. */
export function add(
  tx: Transaction,
  typeArg: string,
  args: AddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::add`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.self),
      obj(tx, args.registry),
    ],
  })
}

export interface AddFromSupplyPoolArgs {
  self: TransactionObjectInput
  pool: TransactionObjectInput
  clock: TransactionObjectInput
}

/** Add debt information from a `SupplyPool`'s debt registry for the matching lending facility. */
export function addFromSupplyPool(
  tx: Transaction,
  typeArgs: [string, string],
  args: AddFromSupplyPoolArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::add_from_supply_pool`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.pool),
      obj(tx, args.clock),
    ],
  })
}

export interface ValidateArgs {
  self: TransactionObjectInput
  facilId: string | TransactionArgument
}

/**
 * Validate debt info and return validated version for calculations. Extra percausion to ensure
 * the info is for the expected lending facility.
 */
export function validate(
  tx: Transaction,
  args: ValidateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::validate`,
    arguments: [
      obj(tx, args.self),
      pure(tx, args.facilId, `${ID.$typeName}`),
    ],
  })
}

export interface CalcRepayX64Args {
  self: TransactionObjectInput
  type: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRepayX64(
  tx: Transaction,
  args: CalcRepayX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::calc_repay_x64`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
      pure(tx, args.shareValueX64, `u128`),
    ],
  })
}

export interface CalcRepayLossyArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

export function calcRepayLossy(
  tx: Transaction,
  args: CalcRepayLossyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::calc_repay_lossy`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
      pure(tx, args.shareValueX64, `u128`),
    ],
  })
}

export interface CalcRepayForAmountArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
  amount: bigint | TransactionArgument
}

export function calcRepayForAmount(
  tx: Transaction,
  args: CalcRepayForAmountArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::calc_repay_for_amount`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface CalcRepayBySharesArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
  shareValueX64: bigint | TransactionArgument
}

/** Calculates the debt amount that needs to be repaid for the given amount of debt shares. */
export function calcRepayByShares(
  tx: Transaction,
  args: CalcRepayBySharesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::calc_repay_by_shares`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
      pure(tx, args.shareValueX64, `u128`),
    ],
  })
}

export interface CalcRepayByAmountArgs {
  self: TransactionObjectInput
  type: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Calculates the debt share amount required to repay the given amount of debt. */
export function calcRepayByAmount(
  tx: Transaction,
  args: CalcRepayByAmountArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::debt_info::calc_repay_by_amount`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.type),
      pure(tx, args.amount, `u64`),
    ],
  })
}
