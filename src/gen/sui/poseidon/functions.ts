import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

/**
 * @param data: Vector of BN254 field elements to hash.
 *
 * Hash the inputs using poseidon_bn254 and returns a BN254 field element.
 *
 * Each element has to be a BN254 field element in canonical representation so it must be smaller than the BN254
 * scalar field size which is 21888242871839275222246405745257275088548364400416034343698204186575808495617.
 *
 * This function is currently only enabled on Devnet.
 */
export function poseidonBn254(
  tx: Transaction,
  data: Array<bigint | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui')}::poseidon::poseidon_bn254`,
    arguments: [pure(tx, data, `vector<u256>`)],
  })
}

/**
 * @param data: Vector of BN254 field elements in little-endian representation.
 *
 * Hash the inputs using poseidon_bn254 and returns a BN254 field element in little-endian representation.
 */
export function poseidonBn254Internal(
  tx: Transaction,
  data: Array<Array<number | TransactionArgument> | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui')}::poseidon::poseidon_bn254_internal`,
    arguments: [pure(tx, data, `vector<vector<u8>>`)],
  })
}
