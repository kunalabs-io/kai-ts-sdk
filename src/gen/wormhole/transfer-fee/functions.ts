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
    target: `${getPublishedAt('wormhole')}::transfer_fee::authorize_governance`,
    arguments: [obj(tx, wormholeState)],
  })
}

export interface TransferFeeArgs {
  wormholeState: TransactionObjectInput
  receipt: TransactionObjectInput
}

/**
 * Redeem governance VAA to transfer collected Wormhole fees to the
 * recipient encoded in its Wormhole governance message. This governance
 * message is only relevant for Sui because fee administration is only
 * relevant to one particular network (in this case Sui).
 *
 * NOTE: This method is guarded by a minimum build version check. This
 * method could break backward compatibility on an upgrade.
 */
export function transferFee(tx: Transaction, args: TransferFeeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::transfer_fee::transfer_fee`,
    arguments: [
      obj(tx, args.wormholeState),
      obj(tx, args.receipt),
    ],
  })
}

export interface HandleTransferFeeArgs {
  latestOnly: TransactionObjectInput
  wormholeState: TransactionObjectInput
  governancePayload: Array<number | TransactionArgument> | TransactionArgument
}

export function handleTransferFee(tx: Transaction, args: HandleTransferFeeArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::transfer_fee::handle_transfer_fee`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.wormholeState),
      pure(tx, args.governancePayload, `vector<u8>`),
    ],
  })
}

export function deserialize(
  tx: Transaction,
  payload: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::transfer_fee::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
