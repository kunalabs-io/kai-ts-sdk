import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AuthorizeUpgradeArgs {
  state: TransactionObjectInput
  decreeReceipt: TransactionObjectInput
}

export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::authorize_upgrade`,
    arguments: [obj(tx, args.state), obj(tx, args.decreeReceipt)],
  })
}

export interface CommitUpgradeArgs {
  state: TransactionObjectInput
  upgradeReceipt: TransactionObjectInput
}

export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::commit_upgrade`,
    arguments: [obj(tx, args.state), obj(tx, args.upgradeReceipt)],
  })
}

export function deserialize(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::deserialize`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export function authorizeGovernance(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::authorize_governance`,
    arguments: [obj(tx, state)],
  })
}

export function takeDigest(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::take_digest`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}

export interface HandleUpgradeContractArgs {
  state: TransactionObjectInput
  vecU8: Array<number | TransactionArgument> | TransactionArgument
}

export function handleUpgradeContract(tx: Transaction, args: HandleUpgradeContractArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::handle_upgrade_contract`,
    arguments: [obj(tx, args.state), pure(tx, args.vecU8, `vector<u8>`)],
  })
}
