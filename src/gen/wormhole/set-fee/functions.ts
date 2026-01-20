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
    target: `${getPublishedAt('wormhole')}::set_fee::authorize_governance`,
    arguments: [obj(tx, wormholeState)],
  })
}

export interface SetFeeArgs {
  wormholeState: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Redeem governance VAA to configure Wormhole message fee amount in SUI
 * denomination. This governance message is only relevant for Sui because
 * fee administration is only relevant to one particular network (in this
 * case Sui).
 *
 * NOTE: This method is guarded by a minimum build version check. This
 * method could break backward compatibility on an upgrade.
 */
export function setFee(tx: Transaction, args: SetFeeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::set_fee::set_fee`,
    arguments: [
      obj(tx, args.wormholeState),
      obj(tx, args.receipt),
    ],
  })
}

export function deserialize(
  tx: Transaction,
  payload: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::set_fee::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
