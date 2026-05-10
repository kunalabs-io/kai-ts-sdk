import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export function takePayload(
  tx: Transaction,
  receipt: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance::take_payload`,
    arguments: [obj(tx, receipt)],
  })
}

export function takeDigest(
  tx: Transaction,
  receipt: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance::take_digest`,
    arguments: [obj(tx, receipt)],
  })
}

export function takeSequence(
  tx: Transaction,
  receipt: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance::take_sequence`,
    arguments: [obj(tx, receipt)],
  })
}

export function destroy(
  tx: Transaction,
  receipt: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance::destroy`,
    arguments: [obj(tx, receipt)],
  })
}

export interface VerifyVaaArgs {
  pythState: TransactionObjectInput
  verifiedVaa: TransactionObjectInput
}

export function verifyVaa(
  tx: Transaction,
  args: VerifyVaaArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance::verify_vaa`,
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
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance::execute_governance_instruction`,
    arguments: [
      obj(tx, args.pythState),
      obj(tx, args.receipt),
    ],
  })
}
