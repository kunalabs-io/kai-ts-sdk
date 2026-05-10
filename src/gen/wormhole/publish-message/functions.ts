import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface PrepareMessageArgs {
  emitterCap: TransactionObjectInput
  nonce: number | TransactionArgument
  payload: Array<number | TransactionArgument> | TransactionArgument
}

/**
 * `prepare_message` constructs Wormhole message parameters. An
 * `EmitterCap` provides the capability to send an arbitrary payload.
 *
 * NOTE: Integrators of Wormhole should be calling only this method from
 * their contracts. This method is not guarded by version control (thus not
 * requiring a reference to the Wormhole `State` object), so it is intended
 * to work for any package version.
 */
export function prepareMessage(
  tx: Transaction,
  args: PrepareMessageArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::publish_message::prepare_message`,
    arguments: [
      obj(tx, args.emitterCap),
      pure(tx, args.nonce, `u32`),
      pure(tx, args.payload, `vector<u8>`),
    ],
  })
}

export interface PublishMessageArgs {
  wormholeState: TransactionObjectInput
  messageFee: TransactionObjectInput
  preparedMsg: TransactionObjectInput
  theClock: TransactionObjectInput
}

/**
 * `publish_message` emits a message as a Sui event. This method uses the
 * input `EmitterCap` as the registered sender of the
 * `WormholeMessage`. It also produces a new sequence for this emitter.
 *
 * NOTE: This method is guarded by a minimum build version check. This
 * method could break backward compatibility on an upgrade.
 *
 * It is important for integrators to refrain from calling this method
 * within their contracts. This method is meant to be called in a
 * transaction block after receiving a `MessageTicket` from calling
 * `prepare_message` within a contract. If in a circumstance where this
 * module has a breaking change in an upgrade, `prepare_message` will not
 * be affected by this change.
 *
 * See `prepare_message` for more details.
 */
export function publishMessage(
  tx: Transaction,
  args: PublishMessageArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::publish_message::publish_message`,
    arguments: [
      obj(tx, args.wormholeState),
      obj(tx, args.messageFee),
      obj(tx, args.preparedMsg),
      obj(tx, args.theClock),
    ],
  })
}
