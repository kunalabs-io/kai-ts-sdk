import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePoolV2ByCreationCapArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  cap: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  metadataA: TransactionObjectInput
  metadataB: TransactionObjectInput
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolV2ByCreationCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV2ByCreationCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator::create_pool_v2_by_creation_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      obj(tx, args.cap),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.metadataA),
      obj(tx, args.metadataB),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV2WithCreationCapArgs {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  cap: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  tickLowerIdx: number | TransactionArgument
  tickUpperIdx: number | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  metadataA: TransactionObjectInput
  metadataB: TransactionObjectInput
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolV2WithCreationCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV2WithCreationCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator::create_pool_v2_with_creation_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      obj(tx, args.cap),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.tickLowerIdx, `u32`),
      pure(tx, args.tickUpperIdx, `u32`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.metadataA),
      obj(tx, args.metadataB),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV2Args {
  config: TransactionObjectInput
  pools: TransactionObjectInput
  tickSpacing: number | TransactionArgument
  initializePrice: bigint | TransactionArgument
  url: string | TransactionArgument
  tickLowerIdx: number | TransactionArgument
  tickUpperIdx: number | TransactionArgument
  coinA: TransactionObjectInput
  coinB: TransactionObjectInput
  metadataA: TransactionObjectInput
  metadataB: TransactionObjectInput
  fixAmountA: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolV2(tx: Transaction, typeArgs: [string, string], args: CreatePoolV2Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator::create_pool_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.pools),
      pure(tx, args.tickSpacing, `u32`),
      pure(tx, args.initializePrice, `u128`),
      pure(tx, args.url, `${String.$typeName}`),
      pure(tx, args.tickLowerIdx, `u32`),
      pure(tx, args.tickUpperIdx, `u32`),
      obj(tx, args.coinA),
      obj(tx, args.coinB),
      obj(tx, args.metadataA),
      obj(tx, args.metadataB),
      pure(tx, args.fixAmountA, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export function fullRangeTickRange(tx: Transaction, tickSpacing: number | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator::full_range_tick_range`,
    arguments: [pure(tx, tickSpacing, `u32`)],
  })
}
