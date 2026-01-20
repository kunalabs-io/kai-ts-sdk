import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function authorizeGovernance(
  tx: Transaction,
  wormholeState: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::upgrade_contract::authorize_governance`,
    arguments: [obj(tx, wormholeState)],
  })
}

export interface AuthorizeUpgradeArgs {
  wormholeState: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Redeem governance VAA to issue an `UpgradeTicket` for the upgrade given
 * a contract upgrade VAA. This governance message is only relevant for Sui
 * because a contract upgrade is only relevant to one particular network
 * (in this case Sui), whose build digest is encoded in this message.
 */
export function authorizeUpgrade(tx: Transaction, args: AuthorizeUpgradeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::upgrade_contract::authorize_upgrade`,
    arguments: [
      obj(tx, args.wormholeState),
      obj(tx, args.receipt),
    ],
  })
}

export interface CommitUpgradeArgs {
  self: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Finalize the upgrade that ran to produce the given `receipt`. This
 * method invokes `state::commit_upgrade` which interacts with
 * `sui::package`.
 */
export function commitUpgrade(tx: Transaction, args: CommitUpgradeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::upgrade_contract::commit_upgrade`,
    arguments: [
      obj(tx, args.self),
      obj(tx, args.receipt),
    ],
  })
}

/**
 * Privileged method only to be used by this module and `migrate` module.
 *
 * During migration, we make sure that the digest equals what we expect by
 * passing in the same VAA used to upgrade the package.
 */
export function takeDigest(
  tx: Transaction,
  governancePayload: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::upgrade_contract::take_digest`,
    arguments: [pure(tx, governancePayload, `vector<u8>`)],
  })
}

export interface HandleUpgradeContractArgs {
  wormholeState: TransactionObjectInput
  payload: Array<number | TransactionArgument> | TransactionArgument
}

export function handleUpgradeContract(
  tx: Transaction,
  args: HandleUpgradeContractArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::upgrade_contract::handle_upgrade_contract`,
    arguments: [
      obj(tx, args.wormholeState),
      pure(tx, args.payload, `vector<u8>`),
    ],
  })
}

export function deserialize(
  tx: Transaction,
  payload: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::upgrade_contract::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
