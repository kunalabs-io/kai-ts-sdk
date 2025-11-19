import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function authorizeGovernance(tx: Transaction, wormholeState: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::update_guardian_set::authorize_governance`,
    arguments: [obj(tx, wormholeState)],
  })
}

export interface UpdateGuardianSetArgs {
  wormholeState: TransactionObjectInput
  receipt: TransactionObjectInput
  theClock: TransactionObjectInput
}

export function updateGuardianSet(tx: Transaction, args: UpdateGuardianSetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::update_guardian_set::update_guardian_set`,
    arguments: [obj(tx, args.wormholeState), obj(tx, args.receipt), obj(tx, args.theClock)],
  })
}

export interface HandleUpdateGuardianSetArgs {
  latestOnly: TransactionObjectInput
  wormholeState: TransactionObjectInput
  governancePayload: Array<number | TransactionArgument> | TransactionArgument
  theClock: TransactionObjectInput
}

export function handleUpdateGuardianSet(tx: Transaction, args: HandleUpdateGuardianSetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::update_guardian_set::handle_update_guardian_set`,
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
  payload: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::update_guardian_set::deserialize`,
    arguments: [pure(tx, payload, `vector<u8>`)],
  })
}
