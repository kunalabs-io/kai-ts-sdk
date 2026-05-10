import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function validate(
  tx: Transaction,
  instruction: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance_instruction::validate`,
    arguments: [obj(tx, instruction)],
  })
}

export function fromByteVec(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance_instruction::from_byte_vec`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export function getModule(
  tx: Transaction,
  instruction: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance_instruction::get_module`,
    arguments: [obj(tx, instruction)],
  })
}

export function getAction(
  tx: Transaction,
  instruction: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance_instruction::get_action`,
    arguments: [obj(tx, instruction)],
  })
}

export function getTargetChainId(
  tx: Transaction,
  instruction: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance_instruction::get_target_chain_id`,
    arguments: [obj(tx, instruction)],
  })
}

export function destroy(
  tx: Transaction,
  instruction: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::governance_instruction::destroy`,
    arguments: [obj(tx, instruction)],
  })
}
