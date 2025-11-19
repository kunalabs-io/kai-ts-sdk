import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function authorizeGovernance(tx: Transaction, wormholeState: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::authorize_governance`,
    arguments: [obj(tx, wormholeState)],
  })
}

export interface AuthorizeUpgradeArgs {
  wormholeState: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::authorize_upgrade`,
    arguments: [obj(tx, args.wormholeState), obj(tx, args.receipt)],
  })
}

export interface CommitUpgradeArgs {
  self: TransactionObjectInput
  receipt: TransactionObjectInput
}

export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::commit_upgrade`,
    arguments: [obj(tx, args.self), obj(tx, args.receipt)],
  })
}

export function takeDigest(
  tx: Transaction,
  governancePayload: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::take_digest`,
    arguments: [pure(tx, governancePayload, `vector<u8>`)],
  })
}

export interface HandleUpgradeContractArgs {
  wormholeState: TransactionObjectInput
  payload: Array<number | TransactionArgument> | TransactionArgument
}

export function handleUpgradeContract(tx: Transaction, args: HandleUpgradeContractArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::handle_upgrade_contract`,
    arguments: [obj(tx, args.wormholeState), pure(tx, args.payload, `vector<u8>`)],
  })
}

export function deserialize(
  tx: Transaction,
  payload: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::upgrade_contract::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
