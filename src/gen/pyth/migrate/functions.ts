import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj } from '../../_framework/util'

export interface MigrateArgs {
  pythState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function migrate(
  tx: Transaction,
  args: MigrateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::migrate::migrate`,
    arguments: [
      obj(tx, args.pythState),
      obj(tx, args.receipt),
    ],
  })
}

export interface HandleMigrateArgs {
  pythState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function handleMigrate(
  tx: Transaction,
  args: HandleMigrateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::migrate::handle_migrate`,
    arguments: [
      obj(tx, args.pythState),
      obj(tx, args.receipt),
    ],
  })
}
