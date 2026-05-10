import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

/** Generate a new `EmitterCap`. */
export function new_(
  tx: Transaction,
  wormholeState: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::emitter::new`,
    arguments: [obj(tx, wormholeState)],
  })
}

/**
 * Returns current sequence (which will be used in the next Wormhole
 * message emitted).
 */
export function sequence(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::emitter::sequence`,
    arguments: [obj(tx, self)],
  })
}

/**
 * Once a Wormhole message is emitted, an `EmitterCap` upticks its
 * internal `sequence` for the next message.
 */
export function useSequence(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::emitter::use_sequence`,
    arguments: [obj(tx, self)],
  })
}

export interface DestroyArgs {
  wormholeState: TransactionObjectInput
  cap: TransactionObjectInput
}

/**
 * Destroys an `EmitterCap`.
 *
 * Note that this operation removes the ability to send messages using the
 * emitter id, and is irreversible.
 */
export function destroy(
  tx: Transaction,
  args: DestroyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::emitter::destroy`,
    arguments: [
      obj(tx, args.wormholeState),
      obj(tx, args.cap),
    ],
  })
}
