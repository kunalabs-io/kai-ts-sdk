import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { GuardianSignature } from '../guardian-signature/structs'

export function guardianSetIndex(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::guardian_set_index`,
    arguments: [obj(tx, self)],
  })
}

export function timestamp(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::timestamp`,
    arguments: [obj(tx, self)],
  })
}

export function nonce(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::nonce`,
    arguments: [obj(tx, self)],
  })
}

export function batchId(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::batch_id`,
    arguments: [obj(tx, self)],
  })
}

export function payload(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::payload`,
    arguments: [obj(tx, self)],
  })
}

export function digest(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::digest`,
    arguments: [obj(tx, self)],
  })
}

export function emitterChain(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::emitter_chain`,
    arguments: [obj(tx, self)],
  })
}

export function emitterAddress(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::emitter_address`,
    arguments: [obj(tx, self)],
  })
}

export function emitterInfo(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::emitter_info`,
    arguments: [obj(tx, self)],
  })
}

export function sequence(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::sequence`,
    arguments: [obj(tx, self)],
  })
}

export function consistencyLevel(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::consistency_level`,
    arguments: [obj(tx, self)],
  })
}

export function finality(
  tx: Transaction,
  self: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::finality`,
    arguments: [obj(tx, self)],
  })
}

/** Destroy the `VAA` and take the Wormhole message payload. */
export function takePayload(
  tx: Transaction,
  vaa: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::take_payload`,
    arguments: [obj(tx, vaa)],
  })
}

/**
 * Destroy the `VAA` and take emitter info (chain and address) and Wormhole
 * message payload.
 */
export function takeEmitterInfoAndPayload(
  tx: Transaction,
  vaa: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::take_emitter_info_and_payload`,
    arguments: [obj(tx, vaa)],
  })
}

export interface ParseAndVerifyArgs {
  wormholeState: TransactionObjectInput
  buf: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

/**
 * Parses and verifies the signatures of a VAA.
 *
 * NOTE: This is the only public function that returns a VAA, and it should
 * be kept that way. This ensures that if an external module receives a
 * `VAA`, it has been verified.
 */
export function parseAndVerify(
  tx: Transaction,
  args: ParseAndVerifyArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::parse_and_verify`,
    arguments: [
      obj(tx, args.wormholeState),
      pure(tx, args.buf, `vector<u8>`),
      obj(tx, args.theClock),
    ],
  })
}

export interface ConsumeArgs {
  consumed: TransactionObjectInput
  parsed: TransactionObjectInput
}

export function consume(
  tx: Transaction,
  args: ConsumeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::consume`,
    arguments: [
      obj(tx, args.consumed),
      obj(tx, args.parsed),
    ],
  })
}

export function computeMessageHash(
  tx: Transaction,
  parsed: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::compute_message_hash`,
    arguments: [obj(tx, parsed)],
  })
}

/**
 * Parses a VAA.
 *
 * NOTE: This method does NOT perform any verification. This ensures the
 * invariant that if an external module receives a `VAA` object, its
 * signatures must have been verified, because the only public function
 * that returns a `VAA` is `parse_and_verify`.
 */
export function parse(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::parse`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}

export function doubleKeccak256(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::double_keccak256`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}

export interface VerifySignaturesArgs {
  set: TransactionObjectInput
  signatures: Array<TransactionObjectInput> | TransactionArgument
  messageHash: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

/**
 * Using the Guardian signatures deserialized from VAA, verify that all of
 * the Guardian public keys are recovered using these signatures and the
 * VAA message body as the message used to produce these signatures.
 *
 * We are careful to only allow `wormhole:vaa` to control the hash that
 * gets used in the `ecdsa_k1` module by computing the hash after
 * deserializing the VAA message body. Even though `ecdsa_k1` hashes a
 * raw message (as of version 0.28), the "raw message" in this case is a
 * single keccak256 hash of the VAA message body.
 */
export function verifySignatures(
  tx: Transaction,
  args: VerifySignaturesArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::vaa::verify_signatures`,
    arguments: [
      obj(tx, args.set),
      vector(tx, `${GuardianSignature.$typeName}`, args.signatures),
      pure(tx, args.messageHash, `vector<u8>`),
      obj(tx, args.theClock),
    ],
  })
}
