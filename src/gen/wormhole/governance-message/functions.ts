import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AuthorizeVerifyGlobalArgs {
  t0: GenericArg
  u16: number | TransactionArgument
  externalAddress: TransactionObjectInput
  bytes32: TransactionObjectInput
  u8: number | TransactionArgument
}

export function authorizeVerifyGlobal(
  tx: Transaction,
  typeArg: string,
  args: AuthorizeVerifyGlobalArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::authorize_verify_global`,
    typeArguments: [typeArg],
    arguments: [
      generic(tx, `${typeArg}`, args.t0),
      pure(tx, args.u16, `u16`),
      obj(tx, args.externalAddress),
      obj(tx, args.bytes32),
      pure(tx, args.u8, `u8`),
    ],
  })
}

export interface AuthorizeVerifyLocalArgs {
  t0: GenericArg
  u16: number | TransactionArgument
  externalAddress: TransactionObjectInput
  bytes32: TransactionObjectInput
  u8: number | TransactionArgument
}

export function authorizeVerifyLocal(
  tx: Transaction,
  typeArg: string,
  args: AuthorizeVerifyLocalArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::authorize_verify_local`,
    typeArguments: [typeArg],
    arguments: [
      generic(tx, `${typeArg}`, args.t0),
      pure(tx, args.u16, `u16`),
      obj(tx, args.externalAddress),
      obj(tx, args.bytes32),
      pure(tx, args.u8, `u8`),
    ],
  })
}

export function deserialize(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::deserialize`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export function destroy(tx: Transaction, typeArg: string, decreeReceipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::destroy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, decreeReceipt)],
  })
}

export function payload(tx: Transaction, typeArg: string, decreeReceipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::payload`,
    typeArguments: [typeArg],
    arguments: [obj(tx, decreeReceipt)],
  })
}

export function sequence(tx: Transaction, typeArg: string, decreeReceipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::sequence`,
    typeArguments: [typeArg],
    arguments: [obj(tx, decreeReceipt)],
  })
}

export interface TakePayloadArgs {
  consumedVaAs: TransactionObjectInput
  decreeReceipt: TransactionObjectInput
}

export function takePayload(tx: Transaction, typeArg: string, args: TakePayloadArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::take_payload`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.consumedVaAs), obj(tx, args.decreeReceipt)],
  })
}

export interface VerifyVaaArgs {
  state: TransactionObjectInput
  vaa: TransactionObjectInput
  decreeTicket: TransactionObjectInput
}

export function verifyVaa(tx: Transaction, typeArg: string, args: VerifyVaaArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::verify_vaa`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.state), obj(tx, args.vaa), obj(tx, args.decreeTicket)],
  })
}
