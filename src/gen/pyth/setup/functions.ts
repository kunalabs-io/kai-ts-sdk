import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure, vector } from '../../_framework/util'
import { DataSource } from '../data-source/structs'

export function init(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::setup::init`,
    arguments: [],
  })
}

export interface InitAndShareStateArgs {
  deployer: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  stalePriceThreshold: bigint | TransactionArgument
  baseUpdateFee: bigint | TransactionArgument
  governanceDataSource: TransactionObjectInput
  sources: Array<TransactionObjectInput> | TransactionArgument
}

/**
 * Only the owner of the `DeployerCap` can call this method. This
 * method destroys the capability and shares the `State` object.
 */
export function initAndShareState(
  tx: Transaction,
  args: InitAndShareStateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth', options?.env)}::setup::init_and_share_state`,
    arguments: [
      obj(tx, args.deployer),
      obj(tx, args.upgradeCap),
      pure(tx, args.stalePriceThreshold, `u64`),
      pure(tx, args.baseUpdateFee, `u64`),
      obj(tx, args.governanceDataSource),
      vector(tx, `${DataSource.$typeName}`, args.sources),
    ],
  })
}
