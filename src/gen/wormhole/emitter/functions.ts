import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export interface DestroyArgs {
  state: TransactionObjectInput
  emitterCap: TransactionObjectInput
}

export function destroy(tx: Transaction, args: DestroyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::emitter::destroy`,
    arguments: [obj(tx, args.state), obj(tx, args.emitterCap)],
  })
}

export function new_(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::emitter::new`, arguments: [obj(tx, state)] })
}

export function sequence(tx: Transaction, emitterCap: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::emitter::sequence`,
    arguments: [obj(tx, emitterCap)],
  })
}

export function useSequence(tx: Transaction, emitterCap: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::emitter::use_sequence`,
    arguments: [obj(tx, emitterCap)],
  })
}
