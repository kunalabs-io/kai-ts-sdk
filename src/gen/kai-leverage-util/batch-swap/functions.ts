import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function newBatchSwap(
  tx: Transaction,
  typeArgs: [string, string],
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util', options?.env)}::batch_swap::new_batch_swap`,
    typeArguments: typeArgs,
    arguments: [],
  })
}

export interface DepositArgs {
  batchSwap: TransactionObjectInput
  balance: TransactionObjectInput
}

export function deposit(
  tx: Transaction,
  typeArgs: [string, string],
  args: DepositArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util', options?.env)}::batch_swap::deposit`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.batchSwap),
      obj(tx, args.balance),
    ],
  })
}

export function startSwap(
  tx: Transaction,
  typeArgs: [string, string],
  batchSwap: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util', options?.env)}::batch_swap::start_swap`,
    typeArguments: typeArgs,
    arguments: [obj(tx, batchSwap)],
  })
}

export interface CompleteSwapArgs {
  batchSwap: TransactionObjectInput
  balance: TransactionObjectInput
}

export function completeSwap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CompleteSwapArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util', options?.env)}::batch_swap::complete_swap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.batchSwap),
      obj(tx, args.balance),
    ],
  })
}

export interface ClaimArgs {
  batchSwap: TransactionObjectInput
  claim: TransactionObjectInput
}

export function claim(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClaimArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util', options?.env)}::batch_swap::claim`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.batchSwap),
      obj(tx, args.claim),
    ],
  })
}

export interface ClaimIfMatchesArgs {
  batchSwap: TransactionObjectInput
  claim: TransactionObjectInput
}

export function claimIfMatches(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClaimIfMatchesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util', options?.env)}::batch_swap::claim_if_matches`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.batchSwap),
      obj(tx, args.claim),
    ],
  })
}

export function destroyZero(
  tx: Transaction,
  typeArgs: [string, string],
  batchSwap: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util', options?.env)}::batch_swap::destroy_zero`,
    typeArguments: typeArgs,
    arguments: [obj(tx, batchSwap)],
  })
}
