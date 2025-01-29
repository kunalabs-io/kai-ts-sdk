import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export function destroy(tx: Transaction, receipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance::destroy`,
    arguments: [obj(tx, receipt)],
  })
}

export function takePayload(tx: Transaction, receipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance::take_payload`,
    arguments: [obj(tx, receipt)],
  })
}

export interface VerifyVaaArgs {
  pythState: TransactionObjectInput
  verifiedVaa: TransactionObjectInput
}

export function verifyVaa(tx: Transaction, args: VerifyVaaArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance::verify_vaa`,
    arguments: [obj(tx, args.pythState), obj(tx, args.verifiedVaa)],
  })
}

export function takeDigest(tx: Transaction, receipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance::take_digest`,
    arguments: [obj(tx, receipt)],
  })
}

export interface ExecuteGovernanceInstructionArgs {
  pythState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function executeGovernanceInstruction(
  tx: Transaction,
  args: ExecuteGovernanceInstructionArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance::execute_governance_instruction`,
    arguments: [obj(tx, args.pythState), obj(tx, args.receipt)],
  })
}

export function takeSequence(tx: Transaction, receipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance::take_sequence`,
    arguments: [obj(tx, receipt)],
  })
}
