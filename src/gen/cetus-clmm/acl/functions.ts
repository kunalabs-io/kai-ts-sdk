import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/**
 * Create a new ACL instance
 * * `ctx` - Transaction context used to create the LinkedTable
 * Returns an empty ACL with no members or permissions
 */
export function new_(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::acl::new`,
    arguments: [],
  })
}

export interface HasRoleArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

/**
 * Check if a member has a role in the ACL
 * * `acl` - The ACL instance to check
 * * `member` - The address of the member to check
 * * `role` - The role to check for
 * Returns true if the member has the role, false otherwise
 */
export function hasRole(
  tx: Transaction,
  args: HasRoleArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::acl::has_role`,
    arguments: [
      obj(tx, args.acl),
      pure(tx, args.member, `address`),
      pure(tx, args.role, `u8`),
    ],
  })
}

export interface SetRolesArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
  permissions: bigint | TransactionArgument
}

/**
 * Set roles for a member in the ACL
 * * `acl` - The ACL instance to update
 * * `member` - The address of the member to set roles for
 * * `permissions` - Permissions for the member, represented as a `u128` with each bit representing the presence of (or lack of) each role
 */
export function setRoles(
  tx: Transaction,
  args: SetRolesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::acl::set_roles`,
    arguments: [
      obj(tx, args.acl),
      pure(tx, args.member, `address`),
      pure(tx, args.permissions, `u128`),
    ],
  })
}

export interface AddRoleArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

/**
 * Add a role for a member in the ACL
 * * `acl` - The ACL instance to update
 * * `member` - The address of the member to add the role to
 * * `role` - The role to add
 */
export function addRole(
  tx: Transaction,
  args: AddRoleArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::acl::add_role`,
    arguments: [
      obj(tx, args.acl),
      pure(tx, args.member, `address`),
      pure(tx, args.role, `u8`),
    ],
  })
}

export interface RemoveRoleArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

/**
 * Revoke a role for a member in the ACL
 * * `acl` - The ACL instance to update
 * * `member` - The address of the member to remove the role from
 * * `role` - The role to remove
 */
export function removeRole(
  tx: Transaction,
  args: RemoveRoleArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::acl::remove_role`,
    arguments: [
      obj(tx, args.acl),
      pure(tx, args.member, `address`),
      pure(tx, args.role, `u8`),
    ],
  })
}

export interface RemoveMemberArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
}

/**
 * Remove all roles of member
 * * `acl` - The ACL instance to update
 * * `member` - The address of the member to remove
 */
export function removeMember(
  tx: Transaction,
  args: RemoveMemberArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::acl::remove_member`,
    arguments: [
      obj(tx, args.acl),
      pure(tx, args.member, `address`),
    ],
  })
}

/**
 * Get all members
 * * `acl` - The ACL instance to get members from
 * Returns a vector of all members in the ACL
 */
export function getMembers(
  tx: Transaction,
  acl: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::acl::get_members`,
    arguments: [obj(tx, acl)],
  })
}

export interface GetPermissionArgs {
  acl: TransactionObjectInput
  address: string | TransactionArgument
}

/**
 * Get the permission of member by address
 * * `acl` - The ACL instance to get permission from
 * * `address` - The address of the member to get permission for
 * Returns the permission of the member
 */
export function getPermission(
  tx: Transaction,
  args: GetPermissionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::acl::get_permission`,
    arguments: [
      obj(tx, args.acl),
      pure(tx, args.address, `address`),
    ],
  })
}
