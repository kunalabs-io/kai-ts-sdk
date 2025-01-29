import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function getPoolCreationFeeAmount(
  tx: Transaction,
  typeArg: string,
  protocolConfig: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::get_pool_creation_fee_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, protocolConfig)],
  })
}

export function getTickRange(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::get_tick_range`,
    arguments: [obj(tx, config)],
  })
}

export interface VerifyRewardManagerArgs {
  config: TransactionObjectInput
  manager: string | TransactionArgument
}

export function verifyRewardManager(tx: Transaction, args: VerifyRewardManagerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::verify_reward_manager`,
    arguments: [obj(tx, args.config), pure(tx, args.manager, `address`)],
  })
}

export function verifyVersion(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::verify_version`,
    arguments: [obj(tx, config)],
  })
}
