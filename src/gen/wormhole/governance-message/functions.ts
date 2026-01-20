import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, pure } from '../../_framework/util'

export interface AuthorizeVerifyGlobalArgs {
  witness: GenericArg
  governanceChain: number | TransactionArgument
  governanceContract: TransactionObjectInput
  moduleName: TransactionObjectInput
  action: number | TransactionArgument
}

/**
 * This method prepares `DecreeTicket` for global governance action. This
 * means the VAA encodes target chain ID == 0.
 */
export function authorizeVerifyGlobal(
  tx: Transaction,
  typeArg: string,
  args: AuthorizeVerifyGlobalArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::governance_message::authorize_verify_global`,
    typeArguments: [typeArg],
    arguments: [
      generic(tx, `${typeArg}`, args.witness),
      pure(tx, args.governanceChain, `u16`),
      obj(tx, args.governanceContract),
      obj(tx, args.moduleName),
      pure(tx, args.action, `u8`),
    ],
  })
}

export interface AuthorizeVerifyLocalArgs {
  witness: GenericArg
  governanceChain: number | TransactionArgument
  governanceContract: TransactionObjectInput
  moduleName: TransactionObjectInput
  action: number | TransactionArgument
}

/**
 * This method prepares `DecreeTicket` for local governance action. This
 * means the VAA encodes target chain ID == 21 (Sui's).
 */
export function authorizeVerifyLocal(
  tx: Transaction,
  typeArg: string,
  args: AuthorizeVerifyLocalArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::governance_message::authorize_verify_local`,
    typeArguments: [typeArg],
    arguments: [
      generic(tx, `${typeArg}`, args.witness),
      pure(tx, args.governanceChain, `u16`),
      obj(tx, args.governanceContract),
      obj(tx, args.moduleName),
      pure(tx, args.action, `u8`),
    ],
  })
}

export function sequence(
  tx: Transaction,
  typeArg: string,
  receipt: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::governance_message::sequence`,
    typeArguments: [typeArg],
    arguments: [obj(tx, receipt)],
  })
}

export interface TakePayloadArgs {
  consumed: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * This method unpacks `DecreeReceipt` and puts the VAA digest into a
 * `ConsumedVAAs` container. Then it returns the governance payload.
 */
export function takePayload(
  tx: Transaction,
  typeArg: string,
  args: TakePayloadArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::governance_message::take_payload`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.consumed),
      obj(tx, args.receipt),
    ],
  })
}

/** Method to peek into the payload in `DecreeReceipt`. */
export function payload(
  tx: Transaction,
  typeArg: string,
  receipt: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::governance_message::payload`,
    typeArguments: [typeArg],
    arguments: [obj(tx, receipt)],
  })
}

/** Destroy the receipt. */
export function destroy(
  tx: Transaction,
  typeArg: string,
  receipt: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::governance_message::destroy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, receipt)],
  })
}

export interface VerifyVaaArgs {
  wormholeState: TransactionObjectInput
  verifiedVaa: TransactionObjectInput
  ticket: TransactionObjectInput
}

/**
 * This method unpacks a `DecreeTicket` to validate its members to make
 * sure that the parameters match what was encoded in the VAA.
 */
export function verifyVaa(
  tx: Transaction,
  typeArg: string,
  args: VerifyVaaArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::governance_message::verify_vaa`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.wormholeState),
      obj(tx, args.verifiedVaa),
      obj(tx, args.ticket),
    ],
  })
}

export function deserialize(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::governance_message::deserialize`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}
