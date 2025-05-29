import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { GuardianSignature } from '../guardian-signature/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function guardianSetIndex(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::guardian_set_index`,
    arguments: [obj(tx, vaa)],
  })
}

export function timestamp(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::timestamp`, arguments: [obj(tx, vaa)] })
}

export function nonce(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::nonce`, arguments: [obj(tx, vaa)] })
}

export function batchId(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::batch_id`, arguments: [obj(tx, vaa)] })
}

export function payload(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::payload`, arguments: [obj(tx, vaa)] })
}

export function digest(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::digest`, arguments: [obj(tx, vaa)] })
}

export function emitterChain(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::emitter_chain`, arguments: [obj(tx, vaa)] })
}

export function emitterAddress(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::emitter_address`, arguments: [obj(tx, vaa)] })
}

export function emitterInfo(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::emitter_info`, arguments: [obj(tx, vaa)] })
}

export function sequence(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::sequence`, arguments: [obj(tx, vaa)] })
}

export function consistencyLevel(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::consistency_level`,
    arguments: [obj(tx, vaa)],
  })
}

export function finality(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::vaa::finality`, arguments: [obj(tx, vaa)] })
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
  state: TransactionObjectInput
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function parseAndVerify(tx: Transaction, args: ParseAndVerifyArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::parse_and_verify`,
    arguments: [obj(tx, args.state), pure(tx, args.vecU8, `vector<u8>`), obj(tx, args.clock)],
  })
}

export interface ConsumeArgs {
  consumedVaAs: TransactionObjectInput
  vaa: TransactionObjectInput
}

export function consume(tx: Transaction, args: ConsumeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::consume`,
    arguments: [obj(tx, args.consumedVaAs), obj(tx, args.vaa)],
  })
}

export function computeMessageHash(tx: Transaction, vaa: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::compute_message_hash`,
    arguments: [obj(tx, vaa)],
  })
}

export function parse(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::parse`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export function doubleKeccak256(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::double_keccak256`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export interface VerifySignaturesArgs {
  guardianSet: TransactionObjectInput
  vecGuardianSignature: Array<TransactionObjectInput> | TransactionArgument
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function verifySignatures(tx: Transaction, args: VerifySignaturesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::vaa::verify_signatures`,
    arguments: [
      obj(tx, args.guardianSet),
      vector(tx, `${GuardianSignature.$typeName}`, args.vecGuardianSignature),
      pure(tx, args.vecU8, `vector<u8>`),
      obj(tx, args.clock),
    ],
  })
}
