import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePoolV2Args {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: bigint | TransactionArgument
  a4: string | TransactionArgument
  a5: number | TransactionArgument
  a6: number | TransactionArgument
  a7: TransactionObjectInput
  a8: TransactionObjectInput
  a9: TransactionObjectInput
  a10: TransactionObjectInput
  a11: boolean | TransactionArgument
  a12: TransactionObjectInput
}

export function createPoolV2(tx: Transaction, typeArgs: [string, string], args: CreatePoolV2Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator_v2::create_pool_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u128`),
      pure(tx, args.a4, `${String.$typeName}`),
      pure(tx, args.a5, `u32`),
      pure(tx, args.a6, `u32`),
      obj(tx, args.a7),
      obj(tx, args.a8),
      obj(tx, args.a9),
      obj(tx, args.a10),
      pure(tx, args.a11, `bool`),
      obj(tx, args.a12),
    ],
  })
}

export interface CreatePoolV2WithCreationCapArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: number | TransactionArgument
  a4: bigint | TransactionArgument
  a5: string | TransactionArgument
  a6: number | TransactionArgument
  a7: number | TransactionArgument
  a8: TransactionObjectInput
  a9: TransactionObjectInput
  a10: TransactionObjectInput
  a11: TransactionObjectInput
  a12: boolean | TransactionArgument
  a13: TransactionObjectInput
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
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      pure(tx, args.a3, `u32`),
      pure(tx, args.a4, `u128`),
      pure(tx, args.a5, `${String.$typeName}`),
      pure(tx, args.a6, `u32`),
      pure(tx, args.a7, `u32`),
      obj(tx, args.a8),
      obj(tx, args.a9),
      obj(tx, args.a10),
      obj(tx, args.a11),
      pure(tx, args.a12, `bool`),
      obj(tx, args.a13),
    ],
  })
}
