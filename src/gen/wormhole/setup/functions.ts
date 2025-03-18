import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CompleteArgs {
  deployerCap: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  u16: number | TransactionArgument
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  u321: number | TransactionArgument
  vecVecU8: Array<Array<number | TransactionArgument> | TransactionArgument> | TransactionArgument
  u322: number | TransactionArgument
  u64: bigint | TransactionArgument
}

export function complete(tx: Transaction, args: CompleteArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::setup::complete`,
    arguments: [
      obj(tx, args.deployerCap),
      obj(tx, args.upgradeCap),
      pure(tx, args.u16, `u16`),
      pure(tx, args.vecU8, `vector<u8>`),
      pure(tx, args.u321, `u32`),
      pure(tx, args.vecVecU8, `vector<vector<u8>>`),
      pure(tx, args.u322, `u32`),
      pure(tx, args.u64, `u64`),
    ],
  })
}

export function init(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::setup::init`, arguments: [] })
}
