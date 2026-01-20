import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Create new `Guardian` ensuring that the input is not all zeros. */
export function new_(
  tx: Transaction,
  pubkey: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian::new`,
    arguments: [pure(tx, pubkey, `vector<u8>`)],
  })
}

/** Retrieve underlying 20-byte public key. */
export function pubkey(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian::pubkey`,
    arguments: [obj(tx, self)],
  })
}

/** Retrieve underlying 20-byte public key as `vector<u8>`. */
export function asBytes(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian::as_bytes`,
    arguments: [obj(tx, self)],
  })
}

export interface VerifyArgs {
  self: TransactionObjectInput
  signature: TransactionObjectInput
  messageHash: Array<number | TransactionArgument> | TransactionArgument
}

/**
 * Verify that the recovered public key (using `ecrecover`) equals the one
 * that exists for this Guardian with an elliptic curve signature and raw
 * message that was signed.
 */
export function verify(tx: Transaction, args: VerifyArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian::verify`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.signature),
      pure(tx, args.messageHash, `vector<u8>`),
    ],
  })
}

export interface EcrecoverArgs {
  message: Array<number | TransactionArgument> | TransactionArgument
  sig: Array<number | TransactionArgument> | TransactionArgument
}

/** Same as 'ecrecover' in EVM. */
export function ecrecover(tx: Transaction, args: EcrecoverArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian::ecrecover`,
    arguments: [
      pure(tx, args.message, `vector<u8>`),
      pure(tx, args.sig, `vector<u8>`),
    ],
  })
}
