import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface RemoveRewardManagerArgs {
  config: TransactionObjectInput
  manager: string | TransactionArgument
}

export function removeRewardManager(tx: Transaction, args: RemoveRewardManagerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::remove_reward_manager`,
    arguments: [obj(tx, args.config), pure(tx, args.manager, `address`)],
  })
}

export interface SetRewardManagerArgs {
  config: TransactionObjectInput
  manager: string | TransactionArgument
}

export function setRewardManager(tx: Transaction, args: SetRewardManagerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::set_reward_manager`,
    arguments: [obj(tx, args.config), pure(tx, args.manager, `address`)],
  })
}

export function increaseVersion(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::increase_version`,
    arguments: [obj(tx, config)],
  })
}

export function getConfigId(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::get_config_id`,
    arguments: [obj(tx, config)],
  })
}

export function init(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::config::init`, arguments: [] })
}

export function getTickRange(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::get_tick_range`,
    arguments: [obj(tx, config)],
  })
}

export function verifyVersion(tx: Transaction, config: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::config::verify_version`,
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
