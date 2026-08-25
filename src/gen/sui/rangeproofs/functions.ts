import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { Element } from '../group-ops/structs'
import { G } from '../ristretto255/structs'

export interface VerifyBulletproofsWithDstRistretto255Args {
  proof: Array<number | TransactionArgument> | TransactionArgument
  bits: number | TransactionArgument
  commitments: Array<TransactionObjectInput> | TransactionArgument
  dst: Array<number | TransactionArgument> | TransactionArgument
  version: number | TransactionArgument
}

/**
 * Verify a range proof over the Ristretto255 curve that all committed values are in the range [0, 2^bits).
 * Currently, the only supported version is 0 which corresponds to the original Bulletproofs construction (https://eprint.iacr.org/2017/1066.pdf).
 * In the future, we may add support for newer versions of Bulletproofs, such as Bulletproofs+ or Bulletproofs++.
 *
 * The format of the proof follows the specifications from https://github.com/dalek-cryptography/bulletproofs/blob/be67b6d5f5ad1c1f54d5511b52e6d645a1313d07/src/range_proof/mod.rs#L59-L76.
 *
 * The `bits` parameter is the bit length of the range and must be one of 8, 16, 32, or 64.
 *
 * The `commitments` are Pedersen commitments to the values used in the proof.
 * The number of commitments must be a power of two, but if needed, the input to the prover can be padded with trivial commitments to zero.
 * The number of commitments times `bits` can be at most 512.
 *
 * The `dst` is a domain separation tag that is bound into the proof transcript. Provers and
 * verifiers must agree on the same `dst` for verification to succeed. It can be at most 64 bytes.
 *
 * Enabled only on devnet and testnet.
 */
export function verifyBulletproofsWithDstRistretto255(
  tx: Transaction,
  args: VerifyBulletproofsWithDstRistretto255Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('sui', options?.env)
    }::rangeproofs::verify_bulletproofs_with_dst_ristretto255`,
    arguments: [
      pure(tx, args.proof, `vector<u8>`),
      pure(tx, args.bits, `u8`),
      vector(tx, `${Element.$typeName}<${G.$typeName}>`, args.commitments),
      pure(tx, args.dst, `vector<u8>`),
      pure(tx, args.version, `u8`),
    ],
  })
}

export interface VerifyBulletproofsRistretto255Args {
  proof: Array<number | TransactionArgument> | TransactionArgument
  bits: number | TransactionArgument
  commitments: Array<TransactionObjectInput> | TransactionArgument
  version: number | TransactionArgument
}

/**
 * Disabled. This entry point always aborts; use `verify_bulletproofs_with_dst_ristretto255`
 * instead.
 *
 * @deprecated Use `verify_bulletproofs_with_dst_ristretto255` instead.
 */
export function verifyBulletproofsRistretto255(
  tx: Transaction,
  args: VerifyBulletproofsRistretto255Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::rangeproofs::verify_bulletproofs_ristretto255`,
    arguments: [
      pure(tx, args.proof, `vector<u8>`),
      pure(tx, args.bits, `u8`),
      vector(tx, `${Element.$typeName}<${G.$typeName}>`, args.commitments),
      pure(tx, args.version, `u8`),
    ],
  })
}

export interface VerifyBulletproofsWithDstRistretto255InternalArgs {
  proof: Array<number | TransactionArgument> | TransactionArgument
  bits: number | TransactionArgument
  commitments:
    | Array<Array<number | TransactionArgument> | TransactionArgument>
    | TransactionArgument
  dst: Array<number | TransactionArgument> | TransactionArgument
}

export function verifyBulletproofsWithDstRistretto255Internal(
  tx: Transaction,
  args: VerifyBulletproofsWithDstRistretto255InternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('sui', options?.env)
    }::rangeproofs::verify_bulletproofs_with_dst_ristretto255_internal`,
    arguments: [
      pure(tx, args.proof, `vector<u8>`),
      pure(tx, args.bits, `u8`),
      pure(tx, args.commitments, `vector<vector<u8>>`),
      pure(tx, args.dst, `vector<u8>`),
    ],
  })
}
