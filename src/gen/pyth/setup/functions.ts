import { PUBLISHED_AT } from '..'
import { obj, pure, vector } from '../../_framework/util'
import { DataSource } from '../data-source/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function init(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::setup::init`, arguments: [] })
}

export interface InitAndShareStateArgs {
  deployer: TransactionObjectInput
  upgradeCap: TransactionObjectInput
  stalePriceThreshold: bigint | TransactionArgument
  baseUpdateFee: bigint | TransactionArgument
  governanceDataSource: TransactionObjectInput
  sources: Array<TransactionObjectInput> | TransactionArgument
}

export function initAndShareState(tx: Transaction, args: InitAndShareStateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::setup::init_and_share_state`,
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
