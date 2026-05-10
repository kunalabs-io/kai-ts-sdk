import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export interface RemoveRewardManagerArgs {
  config: TransactionObjectInput
  manager: string | TransactionArgument
}

export function removeRewardManager(
  tx: Transaction,
  args: RemoveRewardManagerArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::remove_reward_manager`,
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

export function setRewardManager(
  tx: Transaction,
  args: SetRewardManagerArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::set_reward_manager`,
    arguments: [
      obj(tx, args.config),
      pure(tx, args.manager, `address`),
    ],
  })
}

export function increaseVersion(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::increase_version`,
    arguments: [obj(tx, config)],
  })
}

export function getConfigId(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::get_config_id`,
    arguments: [obj(tx, config)],
  })
}

export function init(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::init`,
    arguments: [],
  })
}

/** Returns the min/max tick allowed */
export function getTickRange(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::get_tick_range`,
    arguments: [obj(tx, config)],
  })
}

/** Assets if the config version matches the protocol version */
export function verifyVersion(
  tx: Transaction,
  config: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::verify_version`,
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
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::verify_reward_manager`,
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
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot', options?.env)}::config::get_pool_creation_fee_amount`,
    typeArguments: [typeArg],
    arguments: [obj(tx, protocolConfig)],
  })
}
