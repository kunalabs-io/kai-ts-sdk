import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface NewArgs {
  r: TransactionObjectInput
  s: TransactionObjectInput
  recoveryId: number | TransactionArgument
  index: number | TransactionArgument
}

/** Create new `GuardianSignature`. */
export function new_(tx: Transaction, args: NewArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_signature::new`,
    arguments: [
      obj(tx, args.r),
      obj(tx, args.s),
      pure(tx, args.recoveryId, `u8`),
      pure(tx, args.index, `u8`),
    ],
  })
}

/** 32-byte signature parameter R. */
export function r(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_signature::r`,
    arguments: [obj(tx, self)],
  })
}

/** 32-byte signature parameter S. */
export function s(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_signature::s`,
    arguments: [obj(tx, self)],
  })
}

/** Signature recovery ID. */
export function recoveryId(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_signature::recovery_id`,
    arguments: [obj(tx, self)],
  })
}

/** Guardian index. */
export function index(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_signature::index`,
    arguments: [obj(tx, self)],
  })
}

/** Guardian index as u64. */
export function indexAsU64(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_signature::index_as_u64`,
    arguments: [obj(tx, self)],
  })
}

/**
 * Serialize elliptic curve paramters as `vector<u8>` of length == 65 to be
 * consumed by `ecdsa_k1` for public key recovery.
 */
export function toRsv(tx: Transaction, gs: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::guardian_signature::to_rsv`,
    arguments: [obj(tx, gs)],
  })
}
