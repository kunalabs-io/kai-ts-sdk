import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePoolV3Args {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: number | TransactionArgument
  a3: bigint | TransactionArgument
  a4: string | TransactionArgument
  a5: number | TransactionArgument
  a6: number | TransactionArgument
  a7: TransactionObjectInput
  a8: TransactionObjectInput
  a9: boolean | TransactionArgument
  a10: TransactionObjectInput
}

export function createPoolV3(tx: Transaction, typeArgs: [string, string], args: CreatePoolV3Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator_v3::create_pool_v3`,
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
      pure(tx, args.a9, `bool`),
      obj(tx, args.a10),
    ],
  })
}

export interface CreatePoolV3WithCreationCapArgs {
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
  a10: boolean | TransactionArgument
  a11: TransactionObjectInput
}

export function createPoolV3WithCreationCap(
  tx: Transaction,
  typeArgs: [string, string],
  args: CreatePoolV3WithCreationCapArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator_v3::create_pool_v3_with_creation_cap`,
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
      pure(tx, args.a10, `bool`),
      obj(tx, args.a11),
    ],
  })
}
