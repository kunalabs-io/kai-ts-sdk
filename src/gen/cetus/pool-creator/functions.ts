import { PUBLISHED_AT } from '..'
import { String } from '../../_dependencies/onchain/0x1/string/structs'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePoolV2Args {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  u32: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  coinMetadata1: TransactionObjectInput
  coinMetadata2: TransactionObjectInput
  bool: boolean | TransactionArgument
  clock: TransactionObjectInput
}

export function createPoolV2(tx: Transaction, typeArgs: [string, string], args: CreatePoolV2Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator::create_pool_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      pure(tx, args.u32, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      obj(tx, args.coinMetadata1),
      obj(tx, args.coinMetadata2),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}

export interface CreatePoolV2ByCreationCapArgs {
  globalConfig: TransactionObjectInput
  pools: TransactionObjectInput
  poolCreationCap: TransactionObjectInput
  u32: number | TransactionArgument
  u128: bigint | TransactionArgument
  string: string | TransactionArgument
  coin1: TransactionObjectInput
  coin2: TransactionObjectInput
  coinMetadata1: TransactionObjectInput
  coinMetadata2: TransactionObjectInput
  bool: boolean | TransactionArgument
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
      obj(tx, args.globalConfig),
      obj(tx, args.pools),
      obj(tx, args.poolCreationCap),
      pure(tx, args.u32, `u32`),
      pure(tx, args.u128, `u128`),
      pure(tx, args.string, `${String.$typeName}`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      obj(tx, args.coinMetadata1),
      obj(tx, args.coinMetadata2),
      pure(tx, args.bool, `bool`),
      obj(tx, args.clock),
    ],
  })
}

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
    target: `${PUBLISHED_AT}::pool_creator::build_init_position_arg`,
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
