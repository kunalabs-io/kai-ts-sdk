import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function init(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::setup::init`, arguments: [] })
}

export interface CompleteArgs {
  deployer: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  governanceChain: number | TransactionArgument
  governanceContract: Array<number | TransactionArgument> | TransactionArgument
  guardianSetIndex: number | TransactionArgument
  initialGuardians:
    | Array<Array<number | TransactionArgument> | TransactionArgument>
    | TransactionArgument
  guardianSetSecondsToLive: number | TransactionArgument
  messageFee: bigint | TransactionArgument
}

export function complete(tx: Transaction, args: CompleteArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::setup::complete`,
    arguments: [
      obj(tx, args.deployer),
      obj(tx, args.upgradeCap),
      pure(tx, args.governanceChain, `u16`),
      pure(tx, args.governanceContract, `vector<u8>`),
      pure(tx, args.guardianSetIndex, `u32`),
      pure(tx, args.initialGuardians, `vector<vector<u8>>`),
      pure(tx, args.guardianSetSecondsToLive, `u32`),
      pure(tx, args.messageFee, `u64`),
    ],
  })
}
