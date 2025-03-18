import { PUBLISHED_AT } from '..'
import { String } from '../../_dependencies/onchain/0x1/string/structs'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AddFeeTierArgs {
  globalConfig: TransactionObjectInput
  u32: number | TransactionArgument
  u64: bigint | TransactionArgument
}

export function addFeeTier(tx: Transaction, args: AddFeeTierArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::add_fee_tier`,
    arguments: [obj(tx, args.globalConfig), pure(tx, args.u32, `u32`), pure(tx, args.u64, `u64`)],
  })
}

export interface AddRoleArgs {
  adminCap: TransactionObjectInput
  globalConfig: TransactionObjectInput
  address: string | TransactionArgument
  u8: number | TransactionArgument
}

export function addRole(tx: Transaction, args: AddRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::add_role`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.globalConfig),
      pure(tx, args.address, `address`),
      pure(tx, args.u8, `u8`),
    ],
  })
}

export interface DeleteFeeTierArgs {
  globalConfig: TransactionObjectInput
  u32: number | TransactionArgument
}

export function deleteFeeTier(tx: Transaction, args: DeleteFeeTierArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::delete_fee_tier`,
    arguments: [obj(tx, args.globalConfig), pure(tx, args.u32, `u32`)],
  })
}

export interface RemoveMemberArgs {
  adminCap: TransactionObjectInput
  globalConfig: TransactionObjectInput
  address: string | TransactionArgument
}

export function removeMember(tx: Transaction, args: RemoveMemberArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::remove_member`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.globalConfig),
      pure(tx, args.address, `address`),
    ],
  })
}

export interface RemoveRoleArgs {
  adminCap: TransactionObjectInput
  globalConfig: TransactionObjectInput
  address: string | TransactionArgument
  u8: number | TransactionArgument
}

export function removeRole(tx: Transaction, args: RemoveRoleArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::remove_role`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.globalConfig),
      pure(tx, args.address, `address`),
      pure(tx, args.u8, `u8`),
    ],
  })
}

export interface SetPositionDisplayArgs {
  globalConfig: TransactionObjectInput
  publisher: TransactionObjectInput
  string1: string | TransactionArgument
  string2: string | TransactionArgument
  string3: string | TransactionArgument
  string4: string | TransactionArgument
}

export function setPositionDisplay(tx: Transaction, args: SetPositionDisplayArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::set_position_display`,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.publisher),
      pure(tx, args.string1, `${String.$typeName}`),
      pure(tx, args.string2, `${String.$typeName}`),
      pure(tx, args.string3, `${String.$typeName}`),
      pure(tx, args.string4, `${String.$typeName}`),
    ],
  })
}

export interface SetRolesArgs {
  adminCap: TransactionObjectInput
  globalConfig: TransactionObjectInput
  address: string | TransactionArgument
  u128: bigint | TransactionArgument
}

export function setRoles(tx: Transaction, args: SetRolesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::set_roles`,
    arguments: [
      obj(tx, args.adminCap),
      obj(tx, args.globalConfig),
      pure(tx, args.address, `address`),
      pure(tx, args.u128, `u128`),
    ],
  })
}

export interface UpdateFeeTierArgs {
  globalConfig: TransactionObjectInput
  u32: number | TransactionArgument
  u64: bigint | TransactionArgument
}

export function updateFeeTier(tx: Transaction, args: UpdateFeeTierArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::update_fee_tier`,
    arguments: [obj(tx, args.globalConfig), pure(tx, args.u32, `u32`), pure(tx, args.u64, `u64`)],
  })
}

export interface UpdateProtocolFeeRateArgs {
  globalConfig: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function updateProtocolFeeRate(tx: Transaction, args: UpdateProtocolFeeRateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config_script::update_protocol_fee_rate`,
    arguments: [obj(tx, args.globalConfig), pure(tx, args.u64, `u64`)],
  })
}
