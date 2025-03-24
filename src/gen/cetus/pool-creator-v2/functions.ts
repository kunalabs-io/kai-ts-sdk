import { PUBLISHED_AT } from '..'
import { String } from '../../_dependencies/onchain/0x1/string/structs'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface BuildInitPositionArgArgs {
  u128: bigint | TransactionArgument
  u321: number | TransactionArgument
  u322: number | TransactionArgument
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  bool: boolean | TransactionArgument
}

export function buildInitPositionArg(
  tx: Transaction,
  typeArgs: [string, string],
  args: BuildInitPositionArgArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator_v2::build_init_position_arg`,
    typeArguments: typeArgs,
    arguments: [
      pure(tx, args.u128, `u128`),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u322, `u32`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      pure(tx, args.bool, `bool`),
    ],
  })
}

export interface CreatePoolV2Args {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  u321: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  u322: number | TransactionArgument
  u323: number | TransactionArgument
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  coinMetadata1: TransactionObjectInput
  coinMetadata2: TransactionObjectInput
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolV2(tx: Transaction, typeArgs: [string, string], args: CreatePoolV2Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator_v2::create_pool_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      pure(tx, args.u322, `u32`),
      pure(tx, args.u323, `u32`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      obj(tx, args.coinMetadata1),
      obj(tx, args.coinMetadata2),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV2WithCreationCapArgs {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  poolCreationCap: TransactionObjectInput
  u321: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  u322: number | TransactionArgument
  u323: number | TransactionArgument
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  coinMetadata1: TransactionObjectInput
  coinMetadata2: TransactionObjectInput
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolV2WithCreationCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV2WithCreationCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator_v2::create_pool_v2_with_creation_cap`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      obj(tx, args.poolCreationCap),
      pure(tx, args.u321, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      pure(tx, args.u322, `u32`),
      pure(tx, args.u323, `u32`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      obj(tx, args.coinMetadata1),
      obj(tx, args.coinMetadata2),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}
