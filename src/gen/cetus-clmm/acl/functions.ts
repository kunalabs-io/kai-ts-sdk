import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::acl::new`, arguments: [] })
}

export interface HasRoleArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

export function hasRole(tx: Transaction, args: HasRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::acl::has_role`,
    arguments: [obj(tx, args.acl), pure(tx, args.member, `address`), pure(tx, args.role, `u8`)],
  })
}

export interface SetRolesArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
  permissions: bigint | TransactionArgument
}

export function setRoles(tx: Transaction, args: SetRolesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::acl::set_roles`,
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

export function addRole(tx: Transaction, args: AddRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::acl::add_role`,
    arguments: [obj(tx, args.acl), pure(tx, args.member, `address`), pure(tx, args.role, `u8`)],
  })
}

export interface RemoveRoleArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
  role: number | TransactionArgument
}

export function removeRole(tx: Transaction, args: RemoveRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::acl::remove_role`,
    arguments: [obj(tx, args.acl), pure(tx, args.member, `address`), pure(tx, args.role, `u8`)],
  })
}

export interface RemoveMemberArgs {
  acl: TransactionObjectInput
  member: string | TransactionArgument
}

export function removeMember(tx: Transaction, args: RemoveMemberArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::acl::remove_member`,
    arguments: [obj(tx, args.acl), pure(tx, args.member, `address`)],
  })
}

export function getMembers(tx: Transaction, acl: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::acl::get_members`, arguments: [obj(tx, acl)] })
}

export interface GetPermissionArgs {
  acl: TransactionObjectInput
  address: string | TransactionArgument
}

export function getPermission(tx: Transaction, args: GetPermissionArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::acl::get_permission`,
    arguments: [obj(tx, args.acl), pure(tx, args.address, `address`)],
  })
}
