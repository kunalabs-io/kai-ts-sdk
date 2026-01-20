import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg } from '../../_framework/util'

/**
 * Emit a custom Move event, sending the data offchain.
 *
 * Used for creating custom indexes and tracking onchain
 * activity in a way that suits a specific application the most.
 *
 * The type `T` is the main way to index the event, and can contain
 * phantom parameters, eg `emit(MyEvent<phantom T>)`.
 */
export function emit(tx: Transaction, typeArg: string, event: GenericArg): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui')}::event::emit`,
    typeArguments: [typeArg],
    arguments: [generic(tx, `${typeArg}`, event)],
  })
}
