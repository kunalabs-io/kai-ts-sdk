import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function authorizeGovernance(tx: Transaction, state: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::update_guardian_set::authorize_governance`,
    arguments: [obj(tx, state)],
  })
}

export interface UpdateGuardianSetArgs {
  state: TransactionObjectInput
  decreeReceipt: TransactionObjectInput
  clock: TransactionObjectInput
}

export function updateGuardianSet(tx: Transaction, args: UpdateGuardianSetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::update_guardian_set::update_guardian_set`,
    arguments: [obj(tx, args.state), obj(tx, args.decreeReceipt), obj(tx, args.clock)],
  })
}

export interface HandleUpdateGuardianSetArgs {
  latestOnly: TransactionObjectInput
  state: TransactionObjectInput
  vecU8: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function handleUpdateGuardianSet(tx: Transaction, args: HandleUpdateGuardianSetArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::update_guardian_set::handle_update_guardian_set`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.state),
      pure(tx, args.vecU8, `vector<u8>`),
      obj(tx, args.clock),
    ],
  })
}

export function deserialize(
  tx: Transaction,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::update_guardian_set::deserialize`,
    arguments: [pure(tx, vecU8, `vector<u8>`)],
  })
}
