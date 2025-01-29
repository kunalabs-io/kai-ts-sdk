import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface MigrateArgs {
  state: TransactionObjectInput
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function migrate(tx: Transaction, args: MigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::migrate::migrate`,
    arguments: [obj(tx, args.state), pure(tx, args.vecU8, `vector<u8>`), obj(tx, args.clock)],
  })
}

export interface HandleMigrateArgs {
  state: TransactionObjectInput
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function handleMigrate(tx: Transaction, args: HandleMigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::migrate::handle_migrate`,
    arguments: [obj(tx, args.state), pure(tx, args.vecU8, `vector<u8>`), obj(tx, args.clock)],
  })
}
