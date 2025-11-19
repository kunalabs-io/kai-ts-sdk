import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface MigrateArgs {
  wormholeState: TransactionObjectInput
  upgradeVaaBuf: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

export function migrate(tx: Transaction, args: MigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::migrate::migrate`,
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

export function handleMigrate(tx: Transaction, args: HandleMigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::migrate::handle_migrate`,
    arguments: [
      obj(tx, args.wormholeState),
      pure(tx, args.upgradeVaaBuf, `vector<u8>`),
      obj(tx, args.theClock),
    ],
  })
}
