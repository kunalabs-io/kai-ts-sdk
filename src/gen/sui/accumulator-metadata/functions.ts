import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface RecordAccumulatorObjectChangesArgs {
  accumulatorRoot: TransactionObjectInput
  objectsCreated: bigint | TransactionArgument
  objectsDestroyed: bigint | TransactionArgument
}

/**
 * Records changes in the net count of accumulator objects. Called by the barrier transaction
 * as part of accumulator settlement.
 *
 * This value is copied to the Sui system state object at end-of-epoch by the
 * WriteAccumulatorStorageCost transaction, for use in storage fund accounting. Copying once
 * at end-of-epoch lets us avoid depending on the Sui system state object in the settlement
 * barrier transaction.
 */
export function recordAccumulatorObjectChanges(
  tx: Transaction,
  args: RecordAccumulatorObjectChangesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('sui', options?.env)
    }::accumulator_metadata::record_accumulator_object_changes`,
    arguments: [
      obj(tx, args.accumulatorRoot),
      pure(tx, args.objectsCreated, `u64`),
      pure(tx, args.objectsDestroyed, `u64`),
    ],
  })
}

/** Returns the current count of accumulator objects stored as a dynamic field. */
export function getAccumulatorObjectCount(
  tx: Transaction,
  accumulatorRoot: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('sui', options?.env)
    }::accumulator_metadata::get_accumulator_object_count`,
    arguments: [obj(tx, accumulatorRoot)],
  })
}
