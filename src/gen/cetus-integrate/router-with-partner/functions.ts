import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface SwapWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: boolean | TransactionArgument
  a6: boolean | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: boolean | TransactionArgument
  a10: TransactionObjectInput
}

export function swapWithPartner(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router_with_partner::swap_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `bool`),
      pure(tx, args.a6, `bool`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u128`),
      pure(tx, args.a9, `bool`),
      obj(tx, args.a10),
    ],
  })
}

export interface SwapAbBcWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: TransactionObjectInput
  a6: boolean | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: bigint | TransactionArgument
  a10: bigint | TransactionArgument
  a11: TransactionObjectInput
}

export function swapAbBcWithPartner(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SwapAbBcWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router_with_partner::swap_ab_bc_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      obj(tx, args.a5),
      pure(tx, args.a6, `bool`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u64`),
      pure(tx, args.a9, `u128`),
      pure(tx, args.a10, `u128`),
      obj(tx, args.a11),
    ],
  })
}

export interface SwapAbCbWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: TransactionObjectInput
  a6: boolean | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: bigint | TransactionArgument
  a10: bigint | TransactionArgument
  a11: TransactionObjectInput
}

export function swapAbCbWithPartner(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SwapAbCbWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router_with_partner::swap_ab_cb_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      obj(tx, args.a5),
      pure(tx, args.a6, `bool`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u64`),
      pure(tx, args.a9, `u128`),
      pure(tx, args.a10, `u128`),
      obj(tx, args.a11),
    ],
  })
}

export interface SwapBaBcWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: TransactionObjectInput
  a6: boolean | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: bigint | TransactionArgument
  a10: bigint | TransactionArgument
  a11: TransactionObjectInput
}

export function swapBaBcWithPartner(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SwapBaBcWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router_with_partner::swap_ba_bc_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      obj(tx, args.a5),
      pure(tx, args.a6, `bool`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u64`),
      pure(tx, args.a9, `u128`),
      pure(tx, args.a10, `u128`),
      obj(tx, args.a11),
    ],
  })
}

export interface SwapBaCbWithPartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: TransactionObjectInput
  a6: boolean | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: bigint | TransactionArgument
  a10: bigint | TransactionArgument
  a11: TransactionObjectInput
}

export function swapBaCbWithPartner(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SwapBaCbWithPartnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router_with_partner::swap_ba_cb_with_partner`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      obj(tx, args.a5),
      pure(tx, args.a6, `bool`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u64`),
      pure(tx, args.a9, `u128`),
      pure(tx, args.a10, `u128`),
      obj(tx, args.a11),
    ],
  })
}
