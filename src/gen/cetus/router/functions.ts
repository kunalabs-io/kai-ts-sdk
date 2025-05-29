import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface SwapArgs {
  globalConfig: TransactionObjectInput
  pool: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  u64: bigint | TransactionArgument
  u128: bigint | TransactionArgument
  bool3: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function swap(tx: Transaction, typeArgs: [string, string], args: SwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router::swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool),
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

export interface SwapAbBcArgs {
  globalConfig: TransactionObjectInput
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapAbBc(tx: Transaction, typeArgs: [string, string, string], args: SwapAbBcArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router::swap_ab_bc`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool1),
      obj(tx, args.pool2),
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

export interface SwapAbCbArgs {
  globalConfig: TransactionObjectInput
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapAbCb(tx: Transaction, typeArgs: [string, string, string], args: SwapAbCbArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router::swap_ab_cb`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool1),
      obj(tx, args.pool2),
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

export interface SwapBaBcArgs {
  globalConfig: TransactionObjectInput
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapBaBc(tx: Transaction, typeArgs: [string, string, string], args: SwapBaBcArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router::swap_ba_bc`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool1),
      obj(tx, args.pool2),
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

export interface SwapBaCbArgs {
  globalConfig: TransactionObjectInput
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u1281: bigint | TransactionArgument
  u1282: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function swapBaCb(tx: Transaction, typeArgs: [string, string, string], args: SwapBaCbArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router::swap_ba_cb`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pool1),
      obj(tx, args.pool2),
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

export interface CalculateRouterSwapResultArgs {
  pool1: TransactionObjectInput
  pool2: TransactionObjectInput
  bool1: boolean | TransactionArgument
  bool2: boolean | TransactionArgument
  bool3: boolean | TransactionArgument
  u64: bigint | TransactionArgument
}

export function calculateRouterSwapResult(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: CalculateRouterSwapResultArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router::calculate_router_swap_result`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.pool1),
      obj(tx, args.pool2),
      pure(tx, args.bool1, `bool`),
      pure(tx, args.bool2, `bool`),
      pure(tx, args.bool3, `bool`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export interface CheckCoinThresholdArgs {
  coin: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function checkCoinThreshold(tx: Transaction, typeArg: string, args: CheckCoinThresholdArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::router::check_coin_threshold`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.coin), pure(tx, args.u64, `u64`)],
  })
}
