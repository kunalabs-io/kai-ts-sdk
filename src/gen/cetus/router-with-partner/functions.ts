import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface SwapAbBcWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  partner: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool1),
      obj(tx, args.pool2),
      obj(tx, args.partner),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u1281, `u128`),
      pure(tx, args.u1282, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapAbCbWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  partner: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool1),
      obj(tx, args.pool2),
      obj(tx, args.partner),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u1281, `u128`),
      pure(tx, args.u1282, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapBaBcWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  partner: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool1),
      obj(tx, args.pool2),
      obj(tx, args.partner),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u1281, `u128`),
      pure(tx, args.u1282, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapBaCbWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  partner: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool1),
      obj(tx, args.pool2),
      obj(tx, args.partner),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u1281, `u128`),
      pure(tx, args.u1282, `u128`),
      obj(tx, args.clock),
    ],
  })
}

export interface SwapWithPartnerArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  partner: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  u64: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  bool3: boolean | TransactionArgument
  clock: TransactionObjectInput
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
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
      obj(tx, args.partner),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.u64, `u64`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.bool3, `bool`),
      obj(tx, args.clock),
    ],
  })
}
