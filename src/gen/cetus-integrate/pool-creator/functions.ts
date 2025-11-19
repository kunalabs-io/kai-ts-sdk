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
  a5: TransactionObjectInput
  a6: TransactionObjectInput
  a7: TransactionObjectInput
  a8: TransactionObjectInput
  a9: boolean | TransactionArgument
  a10: TransactionObjectInput
}

export function createPoolV2(tx: Transaction, typeArgs: [string, string], args: CreatePoolV2Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::pool_creator::create_pool_v2`,
    typeArguments: typeArgs,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u32`),
      pure(tx, args.a3, `u128`),
      pure(tx, args.a4, `${String.$typeName}`),
      obj(tx, args.a5),
      obj(tx, args.a6),
      obj(tx, args.a7),
      obj(tx, args.a8),
      pure(tx, args.a9, `bool`),
      obj(tx, args.a10),
    ],
  })
}

export interface CreatePoolV2ByCreationCapArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
  a3: number | TransactionArgument
  a4: bigint | TransactionArgument
  a5: string | TransactionArgument
  a6: TransactionObjectInput
  a7: TransactionObjectInput
  a8: TransactionObjectInput
  a9: TransactionObjectInput
  a10: boolean | TransactionArgument
  a11: TransactionObjectInput
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
      obj(tx, args.a0),
      obj(tx, args.a1),
      obj(tx, args.a2),
      pure(tx, args.a3, `u32`),
      pure(tx, args.a4, `u128`),
      pure(tx, args.a5, `${String.$typeName}`),
      obj(tx, args.a6),
      obj(tx, args.a7),
      obj(tx, args.a8),
      obj(tx, args.a9),
      pure(tx, args.a10, `bool`),
      obj(tx, args.a11),
    ],
  })
}
