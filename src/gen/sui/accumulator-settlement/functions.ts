import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface SettlementPrologueArgs {
  epoch: bigint | TransactionArgument
  checkpointHeight: bigint | TransactionArgument
  idx: bigint | TransactionArgument
}

/**
 * Called by settlement transactions to ensure that the settlement transaction has a unique
 * digest.
 */
export function settlementPrologue(
  tx: Transaction,
  args: SettlementPrologueArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui')}::accumulator_settlement::settlement_prologue`,
    arguments: [
      pure(tx, args.epoch, `u64`),
      pure(tx, args.checkpointHeight, `u64`),
      pure(tx, args.idx, `u64`),
    ],
  })
}

export interface SettleU128Args {
  accumulatorRoot: TransactionObjectInput
  owner: string | TransactionArgument
  merge: bigint | TransactionArgument
  split: bigint | TransactionArgument
}

export function settleU128(
  tx: Transaction,
  typeArg: string,
  args: SettleU128Args,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui')}::accumulator_settlement::settle_u128`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.accumulatorRoot),
      pure(tx, args.owner, `address`),
      pure(tx, args.merge, `u128`),
      pure(tx, args.split, `u128`),
    ],
  })
}
