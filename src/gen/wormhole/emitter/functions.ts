import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export function new_(tx: Transaction, wormholeState: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::emitter::new`,
    arguments: [obj(tx, wormholeState)],
  })
}

export function sequence(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::emitter::sequence`, arguments: [obj(tx, self)] })
}

export function useSequence(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::emitter::use_sequence`,
    arguments: [obj(tx, self)],
  })
}

export interface DestroyArgs {
  wormholeState: TransactionObjectInput
  cap: TransactionObjectInput
}

export function destroy(tx: Transaction, args: DestroyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::emitter::destroy`,
    arguments: [obj(tx, args.wormholeState), obj(tx, args.cap)],
  })
}
