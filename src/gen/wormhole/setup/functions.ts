import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/**
 * Called automatically when module is first published. Transfers
 * `DeployerCap` to sender.
 *
 * Only `setup::init_and_share_state` requires `DeployerCap`.
 */
export function init(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::setup::init`,
    arguments: [],
  })
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

/**
 * Only the owner of the `DeployerCap` can call this method. This
 * method destroys the capability and shares the `State` object.
 */
export function complete(tx: Transaction, args: CompleteArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::setup::complete`,
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
