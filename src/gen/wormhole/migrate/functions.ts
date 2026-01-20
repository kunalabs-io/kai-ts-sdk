import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface MigrateArgs {
  wormholeState: TransactionObjectInput
  upgradeVaaBuf: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

/**
 * Execute migration logic. See `wormhole::migrate` description for more
 * info.
 */
export function migrate(tx: Transaction, args: MigrateArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::migrate::migrate`,
    arguments: [
      obj(tx, args.wormholeState),
      pure(tx, args.upgradeVaaBuf, `vector<u8>`),
      obj(tx, args.theClock),
    ],
  })
}

export interface HandleMigrateArgs {
  wormholeState: TransactionObjectInput
  upgradeVaaBuf: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

export function handleMigrate(tx: Transaction, args: HandleMigrateArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::migrate::handle_migrate`,
    arguments: [
      obj(tx, args.wormholeState),
      pure(tx, args.upgradeVaaBuf, `vector<u8>`),
      obj(tx, args.theClock),
    ],
  })
}
