import { PUBLISHED_AT } from '..'
import { GenericArg, obj, pure, vector } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function destroy(tx: Transaction, typeArg: string, hotPotatoVector: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hot_potato_vector::destroy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, hotPotatoVector)],
  })
}

export function new_(
  tx: Transaction,
  typeArg: string,
  vec: Array<GenericArg> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hot_potato_vector::new`,
    typeArguments: [typeArg],
    arguments: [vector(tx, `${typeArg}`, vec)],
  })
}

export function length(tx: Transaction, typeArg: string, potato: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hot_potato_vector::length`,
    typeArguments: [typeArg],
    arguments: [obj(tx, potato)],
  })
}

export function isEmpty(tx: Transaction, typeArg: string, potato: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hot_potato_vector::is_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, potato)],
  })
}

export interface BorrowArgs {
  potato: TransactionObjectInput
  i: bigint | TransactionArgument
}

export function borrow(tx: Transaction, typeArg: string, args: BorrowArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hot_potato_vector::borrow`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.potato), pure(tx, args.i, `u64`)],
  })
}

export function popBack(tx: Transaction, typeArg: string, hotPotatoVector: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::hot_potato_vector::pop_back`,
    typeArguments: [typeArg],
    arguments: [obj(tx, hotPotatoVector)],
  })
}
