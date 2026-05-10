import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { Section } from './structs'

export interface SectionArgs {
  end: bigint | TransactionArgument
  endVal: bigint | TransactionArgument
}

/** Create a section with end point and value. */
export function section(
  tx: Transaction,
  args: SectionArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::piecewise::section`,
    arguments: [
      pure(tx, args.end, `u64`),
      pure(tx, args.endVal, `u64`),
    ],
  })
}

export interface CreateArgs {
  start: bigint | TransactionArgument
  startVal: bigint | TransactionArgument
  sections: Array<TransactionObjectInput> | TransactionArgument
}

/** Create a piecewise function from start point and ordered sections. */
export function create(
  tx: Transaction,
  args: CreateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::piecewise::create`,
    arguments: [
      pure(tx, args.start, `u64`),
      pure(tx, args.startVal, `u64`),
      vector(tx, `${Section.$typeName}`, args.sections),
    ],
  })
}

export interface ValueAtArgs {
  pw: TransactionObjectInput
  x: bigint | TransactionArgument
}

/** Evaluate the piecewise function at given input using linear interpolation. */
export function valueAt(
  tx: Transaction,
  args: ValueAtArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::piecewise::value_at`,
    arguments: [
      obj(tx, args.pw),
      pure(tx, args.x, `u64`),
    ],
  })
}

/** Get the valid input range for this piecewise function. */
export function range(
  tx: Transaction,
  pw: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage', options?.env)}::piecewise::range`,
    arguments: [obj(tx, pw)],
  })
}
