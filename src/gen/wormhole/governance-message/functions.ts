import { PUBLISHED_AT } from '..'
import { GenericArg, generic, obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AuthorizeVerifyGlobalArgs {
  witness: GenericArg
  governanceChain: number | TransactionArgument
  governanceContract: TransactionObjectInput
  moduleName: TransactionObjectInput
  action: number | TransactionArgument
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

export function authorizeVerifyLocal(
  tx: Transaction,
  typeArg: string,
  args: AuthorizeVerifyLocalArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::authorize_verify_local`,
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

export function sequence(tx: Transaction, typeArg: string, receipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::sequence`,
    typeArguments: [typeArg],
    arguments: [obj(tx, receipt)],
  })
}

export interface TakePayloadArgs {
  consumed: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function takePayload(tx: Transaction, typeArg: string, args: TakePayloadArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::take_payload`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.consumed), obj(tx, args.receipt)],
  })
}

export function payload(tx: Transaction, typeArg: string, receipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::payload`,
    typeArguments: [typeArg],
    arguments: [obj(tx, receipt)],
  })
}

export function destroy(tx: Transaction, typeArg: string, receipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::destroy`,
    typeArguments: [typeArg],
    arguments: [obj(tx, receipt)],
  })
}

export interface VerifyVaaArgs {
  wormholeState: TransactionObjectInput
  verifiedVaa: TransactionObjectInput
  ticket: TransactionObjectInput
}

export function verifyVaa(tx: Transaction, typeArg: string, args: VerifyVaaArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::verify_vaa`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.wormholeState), obj(tx, args.verifiedVaa), obj(tx, args.ticket)],
  })
}

export function deserialize(
  tx: Transaction,
  buf: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_message::deserialize`,
    arguments: [pure(tx, buf, `vector<u8>`)],
  })
}
