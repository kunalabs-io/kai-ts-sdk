import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { GuardianSignature } from '../guardian-signature/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function guardianSetIndex(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::guardian_set_index`,
    arguments: [obj(tx, self)],
  })
}

export function timestamp(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::timestamp`, arguments: [obj(tx, self)] })
}

export function nonce(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::nonce`, arguments: [obj(tx, self)] })
}

export function batchId(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::batch_id`, arguments: [obj(tx, self)] })
}

export function payload(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::payload`, arguments: [obj(tx, self)] })
}

export function digest(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::digest`, arguments: [obj(tx, self)] })
}

export function emitterChain(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::emitter_chain`, arguments: [obj(tx, self)] })
}

export function emitterAddress(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::emitter_address`,
    arguments: [obj(tx, self)],
  })
}

export function emitterInfo(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::emitter_info`, arguments: [obj(tx, self)] })
}

export function sequence(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::sequence`, arguments: [obj(tx, self)] })
}

export function consistencyLevel(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::consistency_level`,
    arguments: [obj(tx, self)],
  })
}

export function finality(tx: Transaction, self: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::finality`, arguments: [obj(tx, self)] })
}

export function takePayload(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::take_payload`, arguments: [obj(tx, vaa)] })
}

export function takeEmitterInfoAndPayload(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::take_emitter_info_and_payload`,
    arguments: [obj(tx, vaa)],
  })
}

export interface ParseAndVerifyArgs {
  wormholeState: TransactionObjectInput
  buf: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

export function parseAndVerify(tx: Transaction, args: ParseAndVerifyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::parse_and_verify`,
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

export function consume(tx: Transaction, args: ConsumeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::consume`,
    arguments: [obj(tx, args.consumed), obj(tx, args.parsed)],
  })
}

export function computeMessageHash(tx: Transaction, parsed: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::compute_message_hash`,
    arguments: [obj(tx, parsed)],
  })
}

export function parse(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::parse`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}

export function doubleKeccak256(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::double_keccak256`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}

export interface VerifySignaturesArgs {
  set: TransactionObjectInput
  signatures: Array<TransactionObjectInput> | TransactionArgument
  messageHash: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

export function verifySignatures(tx: Transaction, args: VerifySignaturesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::verify_signatures`,
    arguments: [
      obj(tx, args.set),
      vector(tx, `${GuardianSignature.$typeName}`, args.signatures),
      pure(tx, args.messageHash, `vector<u8>`),
      obj(tx, args.theClock),
    ],
  })
}
