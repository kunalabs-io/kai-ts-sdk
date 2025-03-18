import { PUBLISHED_AT } from '..'
import { obj } from '../../_framework/util'
import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'

export interface HandleMigrateArgs {
  pythState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function handleMigrate(tx: Transaction, args: HandleMigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::migrate::handle_migrate`,
    arguments: [obj(tx, args.pythState), obj(tx, args.receipt)],
  })
}

export interface MigrateArgs {
  pythState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function migrate(tx: Transaction, args: MigrateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::migrate::migrate`,
    arguments: [obj(tx, args.pythState), obj(tx, args.receipt)],
  })
}
