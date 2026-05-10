import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { String } from '../../std/string/structs'

export interface UpdateProtocolFeeRateArgs {
  a0: TransactionObjectInput
  a1: bigint | TransactionArgument
}

export function updateProtocolFeeRate(
  tx: Transaction,
  args: UpdateProtocolFeeRateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-integrate', options?.env)
    }::config_script::update_protocol_fee_rate`,
    arguments: [
      obj(tx, args.a0),
      pure(tx, args.a1, `u64`),
    ],
  })
}

export interface AddFeeTierArgs {
  a0: TransactionObjectInput
  a1: number | TransactionArgument
  a2: bigint | TransactionArgument
}

export function addFeeTier(
  tx: Transaction,
  args: AddFeeTierArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::config_script::add_fee_tier`,
    arguments: [
      obj(tx, args.a0),
      pure(tx, args.a1, `u32`),
      pure(tx, args.a2, `u64`),
    ],
  })
}

export interface UpdateFeeTierArgs {
  a0: TransactionObjectInput
  a1: number | TransactionArgument
  a2: bigint | TransactionArgument
}

export function updateFeeTier(
  tx: Transaction,
  args: UpdateFeeTierArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::config_script::update_fee_tier`,
    arguments: [
      obj(tx, args.a0),
      pure(tx, args.a1, `u32`),
      pure(tx, args.a2, `u64`),
    ],
  })
}

export interface DeleteFeeTierArgs {
  a0: TransactionObjectInput
  a1: number | TransactionArgument
}

export function deleteFeeTier(
  tx: Transaction,
  args: DeleteFeeTierArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::config_script::delete_fee_tier`,
    arguments: [
      obj(tx, args.a0),
      pure(tx, args.a1, `u32`),
    ],
  })
}

export interface SetRolesArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
  a3: bigint | TransactionArgument
}

export function setRoles(
  tx: Transaction,
  args: SetRolesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::config_script::set_roles`,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `address`),
      pure(tx, args.a3, `u128`),
    ],
  })
}

export interface AddRoleArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
  a3: number | TransactionArgument
}

export function addRole(
  tx: Transaction,
  args: AddRoleArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::config_script::add_role`,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `address`),
      pure(tx, args.a3, `u8`),
    ],
  })
}

export interface RemoveRoleArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
  a3: number | TransactionArgument
}

export function removeRole(
  tx: Transaction,
  args: RemoveRoleArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::config_script::remove_role`,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `address`),
      pure(tx, args.a3, `u8`),
    ],
  })
}

export interface RemoveMemberArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
}

export function removeMember(
  tx: Transaction,
  args: RemoveMemberArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::config_script::remove_member`,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `address`),
    ],
  })
}

export interface SetPositionDisplayArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
  a3: string | TransactionArgument
  a4: string | TransactionArgument
  a5: string | TransactionArgument
}

export function setPositionDisplay(
  tx: Transaction,
  args: SetPositionDisplayArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-integrate', options?.env)
    }::config_script::set_position_display`,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `${String.$typeName}`),
      pure(tx, args.a3, `${String.$typeName}`),
      pure(tx, args.a4, `${String.$typeName}`),
      pure(tx, args.a5, `${String.$typeName}`),
    ],
  })
}
