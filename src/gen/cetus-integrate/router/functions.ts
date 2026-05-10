import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

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

export function swap(
  tx: Transaction,
  typeArgs: [string, string],
  args: SwapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::router::swap`,
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
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: boolean | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: bigint | TransactionArgument
  a10: TransactionObjectInput
}

export function swapAbBc(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SwapAbBcArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::router::swap_ab_bc`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `bool`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u128`),
      pure(tx, args.a9, `u128`),
      obj(tx, args.a10),
    ],
  })
}

export interface SwapAbCbArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: boolean | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: bigint | TransactionArgument
  a10: TransactionObjectInput
}

export function swapAbCb(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SwapAbCbArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::router::swap_ab_cb`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `bool`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u128`),
      pure(tx, args.a9, `u128`),
      obj(tx, args.a10),
    ],
  })
}

export interface SwapBaBcArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: boolean | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: bigint | TransactionArgument
  a10: TransactionObjectInput
}

export function swapBaBc(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SwapBaBcArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::router::swap_ba_bc`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `bool`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u128`),
      pure(tx, args.a9, `u128`),
      obj(tx, args.a10),
    ],
  })
}

export interface SwapBaCbArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: TransactionObjectInput
  a4: TransactionObjectInput
  a5: boolean | TransactionArgument
  a6: bigint | TransactionArgument
  a7: bigint | TransactionArgument
  a8: bigint | TransactionArgument
  a9: bigint | TransactionArgument
  a10: TransactionObjectInput
}

export function swapBaCb(
  tx: Transaction,
  typeArgs: [string, string, string],
  args: SwapBaCbArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::router::swap_ba_cb`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      obj(tx, args.a3),
      obj(tx, args.a4),
      pure(tx, args.a5, `bool`),
      pure(tx, args.a6, `u64`),
      pure(tx, args.a7, `u64`),
      pure(tx, args.a8, `u128`),
      pure(tx, args.a9, `u128`),
      obj(tx, args.a10),
    ],
  })
}

export interface CalculateRouterSwapResultArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: boolean | TransactionArgument
  a3: boolean | TransactionArgument
  a4: boolean | TransactionArgument
  a5: bigint | TransactionArgument
}

export function calculateRouterSwapResult(
  tx: Transaction,
  typeArgs: [string, string, string, string],
  args: CalculateRouterSwapResultArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('cetus-integrate', options?.env)
    }::router::calculate_router_swap_result`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `bool`),
      pure(tx, args.a3, `bool`),
      pure(tx, args.a4, `bool`),
      pure(tx, args.a5, `u64`),
    ],
  })
}

export interface CheckCoinThresholdArgs {
  a0: TransactionObjectInput
  a1: bigint | TransactionArgument
}

export function checkCoinThreshold(
  tx: Transaction,
  typeArg: string,
  args: CheckCoinThresholdArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-integrate', options?.env)}::router::check_coin_threshold`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.a0),
      pure(tx, args.a1, `u64`),
    ],
  })
}
