import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(tx: Transaction, typeArg: string) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set::new`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface AddArgs {
  set: TransactionObjectInput
  t0: GenericArg
}

export function add(tx: Transaction, typeArg: string, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set::add`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.set), generic(tx, `${typeArg}`, args.t0)],
  })
}

export interface ContainsArgs {
  set: TransactionObjectInput
  t0: GenericArg
}

export function contains(tx: Transaction, typeArg: string, args: ContainsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set::contains`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.set), generic(tx, `${typeArg}`, args.t0)],
  })
}

export interface RemoveArgs {
  set: TransactionObjectInput
  t0: GenericArg
}

export function remove(tx: Transaction, typeArg: string, args: RemoveArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set::remove`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.set), generic(tx, `${typeArg}`, args.t0)],
  })
}
