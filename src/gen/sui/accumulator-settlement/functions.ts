import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface SettlementPrologueArgs {
  epoch: bigint | TransactionArgument
  checkpointHeight: bigint | TransactionArgument
  idx: bigint | TransactionArgument
}

export function settlementPrologue(tx: Transaction, args: SettlementPrologueArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::accumulator_settlement::settlement_prologue`,
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

export function settleU128(tx: Transaction, typeArg: string, args: SettleU128Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::accumulator_settlement::settle_u128`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.accumulatorRoot),
      pure(tx, args.owner, `address`),
      pure(tx, args.merge, `u128`),
      pure(tx, args.split, `u128`),
    ],
  })
}
