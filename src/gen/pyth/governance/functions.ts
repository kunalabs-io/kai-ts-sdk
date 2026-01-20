import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function takePayload(tx: Transaction, receipt: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance::take_payload`,
    arguments: [obj(tx, receipt)],
  })
}

export function takeDigest(tx: Transaction, receipt: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance::take_digest`,
    arguments: [obj(tx, receipt)],
  })
}

export function takeSequence(tx: Transaction, receipt: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance::take_sequence`,
    arguments: [obj(tx, receipt)],
  })
}

export function destroy(tx: Transaction, receipt: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance::destroy`,
    arguments: [obj(tx, receipt)],
  })
}

export interface VerifyVaaArgs {
  pythState: TransactionObjectInput
  verifiedVaa: TransactionObjectInput
}

export function verifyVaa(tx: Transaction, args: VerifyVaaArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance::verify_vaa`,
    arguments: [
      obj(tx, args.pythState),
      obj(tx, args.verifiedVaa),
    ],
  })
}

export interface ExecuteGovernanceInstructionArgs {
  pythState: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Execute a governance instruction other than contract upgrade, which is
 * handled separately in the contract_upgrade.move module.
 */
export function executeGovernanceInstruction(
  tx: Transaction,
  args: ExecuteGovernanceInstructionArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance::execute_governance_instruction`,
    arguments: [
      obj(tx, args.pythState),
      obj(tx, args.receipt),
    ],
  })
}
