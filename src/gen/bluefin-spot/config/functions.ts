import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface RemoveRewardManagerArgs {
  config: TransactionObjectInput
  manager: string | TransactionArgument
}

export function removeRewardManager(
  tx: Transaction,
  args: RemoveRewardManagerArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::remove_reward_manager`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.manager, `address`),
    ],
  })
}

export interface SetRewardManagerArgs {
  config: TransactionObjectInput
  manager: string | TransactionArgument
}

export function setRewardManager(tx: Transaction, args: SetRewardManagerArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::set_reward_manager`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.manager, `address`),
    ],
  })
}

export function increaseVersion(
  tx: Transaction,
  config: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::increase_version`,
    arguments: [obj(tx, config)],
  })
}

export function getConfigId(tx: Transaction, config: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::get_config_id`,
    arguments: [obj(tx, config)],
  })
}

export function init(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::init`,
    arguments: [],
  })
}

/** Returns the min/max tick allowed */
export function getTickRange(tx: Transaction, config: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::get_tick_range`,
    arguments: [obj(tx, config)],
  })
}

/** Assets if the config version matches the protocol version */
export function verifyVersion(tx: Transaction, config: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::verify_version`,
    arguments: [obj(tx, config)],
  })
}

export interface VerifyRewardManagerArgs {
  config: TransactionObjectInput
  manager: string | TransactionArgument
}

/** checks if the given address is the whitelisted rewards manager */
export function verifyRewardManager(
  tx: Transaction,
  args: VerifyRewardManagerArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::verify_reward_manager`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.manager, `address`),
    ],
  })
}

export function getPoolCreationFeeAmount(
  tx: Transaction,
  typeArg: string,
  protocolConfig: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::config::get_pool_creation_fee_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, protocolConfig)],
  })
}
