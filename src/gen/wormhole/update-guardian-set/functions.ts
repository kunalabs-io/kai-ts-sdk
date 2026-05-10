import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function authorizeGovernance(
  tx: Transaction,
  wormholeState: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('wormhole', options?.env)
    }::update_guardian_set::authorize_governance`,
    arguments: [obj(tx, wormholeState)],
  })
}

export interface UpdateGuardianSetArgs {
  wormholeState: TransactionObjectInput
  receipt: TransactionObjectInput
  theClock: TransactionObjectInput
}

/**
 * Redeem governance VAA to update the current Guardian set with a new
 * set of Guardian public keys. This governance action is applied globally
 * across all networks.
 *
 * NOTE: This method is guarded by a minimum build version check. This
 * method could break backward compatibility on an upgrade.
 */
export function updateGuardianSet(
  tx: Transaction,
  args: UpdateGuardianSetArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::update_guardian_set::update_guardian_set`,
    arguments: [
      obj(tx, args.wormholeState),
      obj(tx, args.receipt),
      obj(tx, args.theClock),
    ],
  })
}

export interface HandleUpdateGuardianSetArgs {
  latestOnly: TransactionObjectInput
  wormholeState: TransactionObjectInput
  governancePayload: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

export function handleUpdateGuardianSet(
  tx: Transaction,
  args: HandleUpdateGuardianSetArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('wormhole', options?.env)
    }::update_guardian_set::handle_update_guardian_set`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.wormholeState),
      pure(tx, args.governancePayload, `vector<u8>`),
      obj(tx, args.theClock),
    ],
  })
}

export function deserialize(
  tx: Transaction,
  payload: Array<number | TransactionArgument> | TransactionArgument,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole', options?.env)}::update_guardian_set::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
