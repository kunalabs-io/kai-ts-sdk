import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AuthorizeUpgradeArgs {
  pythState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::contract_upgrade::authorize_upgrade`,
    arguments: [obj(tx, args.pythState), obj(tx, args.receipt)],
  })
}

export function takeUpgradeDigest(tx: Transaction, receipt: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::contract_upgrade::take_upgrade_digest`,
    arguments: [obj(tx, receipt)],
  })
}

export interface CommitUpgradeArgs {
  self: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::contract_upgrade::commit_upgrade`,
    arguments: [obj(tx, args.self), obj(tx, args.receipt)],
  })
}

export function takeDigest(
  tx: Transaction,
  governancePayload: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::contract_upgrade::take_digest`,
    arguments: [pure(tx, governancePayload, `vector<u8>`)],
  })
}

export interface HandleUpgradeContractArgs {
  pythState: TransactionObjectInput
  digest: TransactionObjectInput
}

export function handleUpgradeContract(tx: Transaction, args: HandleUpgradeContractArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::contract_upgrade::handle_upgrade_contract`,
    arguments: [obj(tx, args.pythState), obj(tx, args.digest)],
  })
}

export function deserialize(
  tx: Transaction,
  payload: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::contract_upgrade::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
