import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { generic, GenericArg, obj, pure, vector } from '../../_framework/util'

export function hash(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::merkle_tree::hash`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export function emptyLeafHash(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::merkle_tree::empty_leaf_hash`,
    arguments: [],
  })
}

export function leafHash(
  tx: Transaction,
  data: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::merkle_tree::leaf_hash`,
    arguments: [pure(tx, data, `vector<u8>`)],
  })
}

export interface NodeHashArgs {
  childA: TransactionObjectInput
  childB: TransactionObjectInput
}

export function nodeHash(
  tx: Transaction,
  args: NodeHashArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::merkle_tree::node_hash`,
    arguments: [
      obj(tx, args.childA),
      obj(tx, args.childB),
    ],
  })
}

export interface GreaterThanArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
}

export function greaterThan(
  tx: Transaction,
  args: GreaterThanArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::merkle_tree::greater_than`,
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
    ],
  })
}

export interface SetElementArgs {
  a: Array<GenericArg> | TransactionArgument
  value: GenericArg
  index: bigint | TransactionArgument
}

export function setElement(
  tx: Transaction,
  typeArg: string,
  args: SetElementArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::merkle_tree::set_element`,
    typeArguments: [typeArg],
    arguments: [
      vector(tx, `${typeArg}`, args.a),
      generic(tx, `${typeArg}`, args.value),
      pure(tx, args.index, `u64`),
    ],
  })
}

export interface IsProofValidArgs {
  encodedProof: TransactionObjectInput
  root: TransactionObjectInput
  leafData: Array<number | TransactionArgument> | TransactionArgument
}

export function isProofValid(
  tx: Transaction,
  args: IsProofValidArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::merkle_tree::is_proof_valid`,
    arguments: [
      obj(tx, args.encodedProof),
      obj(tx, args.root),
      pure(tx, args.leafData, `vector<u8>`),
    ],
  })
}

export interface ConstructProofsArgs {
  messages: Array<Array<number | TransactionArgument> | TransactionArgument> | TransactionArgument
  depth: number | TransactionArgument
}

export function constructProofs(
  tx: Transaction,
  args: ConstructProofsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::merkle_tree::construct_proofs`,
    arguments: [
      pure(tx, args.messages, `vector<vector<u8>>`),
      pure(tx, args.depth, `u8`),
    ],
  })
}
