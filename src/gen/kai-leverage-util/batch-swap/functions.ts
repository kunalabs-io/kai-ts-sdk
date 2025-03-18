import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export interface ClaimArgs {
  batchSwap: TransactionObjectInput
  claim: TransactionObjectInput
}

export function claim(tx: Transaction, typeArgs: [string, string], args: ClaimArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_swap::claim`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.batchSwap), obj(tx, args.claim)],
  })
}

export interface ClaimIfMatchesArgs {
  batchSwap: TransactionObjectInput
  claim: TransactionObjectInput
}

export function claimIfMatches(
  tx: Transaction,
  typeArgs: [string, string],
  args: ClaimIfMatchesArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_swap::claim_if_matches`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.batchSwap), obj(tx, args.claim)],
  })
}

export interface CompleteSwapArgs {
  batchSwap: TransactionObjectInput
  balance: TransactionObjectInput
}

export function completeSwap(tx: Transaction, typeArgs: [string, string], args: CompleteSwapArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_swap::complete_swap`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.batchSwap), obj(tx, args.balance)],
  })
}

export interface DepositArgs {
  batchSwap: TransactionObjectInput
  balance: TransactionObjectInput
}

export function deposit(tx: Transaction, typeArgs: [string, string], args: DepositArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_swap::deposit`,
    typeArguments: typeArgs,
    arguments: [obj(tx, args.batchSwap), obj(tx, args.balance)],
  })
}

export function destroyZero(
  tx: Transaction,
  typeArgs: [string, string],
  batchSwap: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_swap::destroy_zero`,
    typeArguments: typeArgs,
    arguments: [obj(tx, batchSwap)],
  })
}

export function newBatchSwap(tx: Transaction, typeArgs: [string, string]) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_swap::new_batch_swap`,
    typeArguments: typeArgs,
    arguments: [],
  })
}

export function startSwap(
  tx: Transaction,
  typeArgs: [string, string],
  batchSwap: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_swap::start_swap`,
    typeArguments: typeArgs,
    arguments: [obj(tx, batchSwap)],
  })
}
