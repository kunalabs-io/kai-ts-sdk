import { PUBLISHED_AT } from '..'
import { GenericArg, obj, vector } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(
  tx: Transaction,
  typeArg: string,
  data: Array<GenericArg> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cursor::new`,
    typeArguments: [typeArg],
    arguments: [vector(tx, `${typeArg}`, data)],
  })
}

export function data(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cursor::data`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function isEmpty(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cursor::is_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}

export function destroyEmpty(tx: Transaction, typeArg: string, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cursor::destroy_empty`,
    typeArguments: [typeArg],
    arguments: [obj(tx, cursor)],
  })
}

export function takeRest(tx: Transaction, typeArg: string, cursor: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cursor::take_rest`,
    typeArguments: [typeArg],
    arguments: [obj(tx, cursor)],
  })
}

export function poke(tx: Transaction, typeArg: string, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::cursor::poke`,
    typeArguments: [typeArg],
    arguments: [obj(tx, self)],
  })
}
