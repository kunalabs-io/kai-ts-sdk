import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { String } from '../../std/string/structs'

/**
 * Initialize the `Partners` object to store partner information
 * * `ctx` - The transaction context used to create the object
 */
export function init(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::init`,
    arguments: [],
  })
}

export interface CreatePartnerArgs {
  config: TransactionObjectInput
  partners: TransactionObjectInput
  name: string | TransactionArgument
  refFeeRate: bigint | TransactionArgument
  startTime: bigint | TransactionArgument
  endTime: bigint | TransactionArgument
  recipient: string | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Create one partner.
 * * `config` - The global configuration
 * * `partners` - The mutable reference to the `Partners` object
 * * `name` - The name of the partner
 * * `ref_fee_rate` - The reference fee rate for the partner
 * * `start_time` - The start time of the partner's validity period
 * * `end_time` - The end time of the partner's validity period
 * * `recipient` - The address of the recipient
 * * `clock` - The clock object
 * * `ctx` - The transaction context
 */
export function createPartner(
  tx: Transaction,
  args: CreatePartnerArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::create_partner`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.partners),
      pure(tx, args.name, `${String.$typeName}`),
      pure(tx, args.refFeeRate, `u64`),
      pure(tx, args.startTime, `u64`),
      pure(tx, args.endTime, `u64`),
      pure(tx, args.recipient, `address`),
      obj(tx, args.clock),
    ],
  })
}

/**
 * Get partner name.
 * * `partner` - The reference to the `Partner` object
 * * Returns the name of the partner
 */
export function name(
  tx: Transaction,
  partner: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::name`,
    arguments: [obj(tx, partner)],
  })
}

/**
 * get partner ref_fee_rate.
 * * `partner` - The reference to the `Partner` object
 * * Returns the reference fee rate for the partner
 */
export function refFeeRate(
  tx: Transaction,
  partner: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::ref_fee_rate`,
    arguments: [obj(tx, partner)],
  })
}

/**
 * get partner start_time.
 * * `partner` - The reference to the `Partner` object
 * * Returns the start time of the partner's validity period
 */
export function startTime(
  tx: Transaction,
  partner: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::start_time`,
    arguments: [obj(tx, partner)],
  })
}

/**
 * get partner end_time.
 * * `partner` - The reference to the `Partner` object
 * * Returns the end time of the partner's validity period
 */
export function endTime(
  tx: Transaction,
  partner: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::end_time`,
    arguments: [obj(tx, partner)],
  })
}

/**
 * get partner balances.
 * * `partner` - The reference to the `Partner` object
 * * Returns the balances of the partner
 */
export function balances(
  tx: Transaction,
  partner: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::balances`,
    arguments: [obj(tx, partner)],
  })
}

export interface CurrentRefFeeRateArgs {
  partner: TransactionObjectInput
  currentTime: bigint | TransactionArgument
}

/**
 * check the parter is valid or not, and return the partner ref_fee_rate.
 * * `partner` - The reference to the `Partner` object
 * * `current_time` - The current time
 * * Returns the current reference fee rate for the partner
 */
export function currentRefFeeRate(
  tx: Transaction,
  args: CurrentRefFeeRateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::current_ref_fee_rate`,
    arguments: [
      obj(tx, args.partner),
      pure(tx, args.currentTime, `u64`),
    ],
  })
}

export interface UpdateRefFeeRateArgs {
  config: TransactionObjectInput
  partner: TransactionObjectInput
  newFeeRate: bigint | TransactionArgument
}

/**
 * Update partner ref fee rate.
 * * `config` - The global configuration
 * * `partner` - The mutable reference to the `Partner` object
 * * `new_fee_rate` - The new reference fee rate for the partner
 * * `ctx` - The transaction context
 */
export function updateRefFeeRate(
  tx: Transaction,
  args: UpdateRefFeeRateArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::update_ref_fee_rate`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.partner),
      pure(tx, args.newFeeRate, `u64`),
    ],
  })
}

export interface UpdateTimeRangeArgs {
  config: TransactionObjectInput
  partner: TransactionObjectInput
  startTime: bigint | TransactionArgument
  endTime: bigint | TransactionArgument
  clock: TransactionObjectInput
}

/**
 * Update partner time range.
 * * `config` - The global configuration
 * * `partner` - The mutable reference to the `Partner` object
 * * `start_time` - The start time of the partner's validity period
 * * `end_time` - The end time of the partner's validity period
 * * `clock` - The clock object
 * * `ctx` - The transaction context
 */
export function updateTimeRange(
  tx: Transaction,
  args: UpdateTimeRangeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::update_time_range`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.partner),
      pure(tx, args.startTime, `u64`),
      pure(tx, args.endTime, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface ReceiveRefFeeArgs {
  partner: TransactionObjectInput
  fee: TransactionObjectInput
}

/**
 * Receive ref fee.
 * This method is called when swap and partner is provided.
 * * `partner` - The mutable reference to the `Partner` object
 * * `fee` - The balance of the fee
 */
export function receiveRefFee(
  tx: Transaction,
  typeArg: string,
  args: ReceiveRefFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::receive_ref_fee`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.partner),
      obj(tx, args.fee),
    ],
  })
}

export interface ReceiveRefFeeInternalArgs {
  partner: TransactionObjectInput
  fee: TransactionObjectInput
}

/**
 * Receive ref fee.
 * This method is called when swap and partner is provided.
 * * `partner` - The mutable reference to the `Partner` object
 * * `fee` - The balance of the fee
 */
export function receiveRefFeeInternal(
  tx: Transaction,
  typeArg: string,
  args: ReceiveRefFeeInternalArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::receive_ref_fee_internal`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.partner),
      obj(tx, args.fee),
    ],
  })
}

export interface ClaimRefFeeArgs {
  config: TransactionObjectInput
  partnerCap: TransactionObjectInput
  partner: TransactionObjectInput
}

/**
 * The `PartnerCap` owner claim the parter fee by CoinType.
 * * `config` - The global configuration
 * * `partner_cap` - The reference to the `PartnerCap` object
 * * `partner` - The mutable reference to the `Partner` object
 * * `ctx` - The transaction context
 */
export function claimRefFee(
  tx: Transaction,
  typeArg: string,
  args: ClaimRefFeeArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('cetus-clmm', options?.env)}::partner::claim_ref_fee`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.config),
      obj(tx, args.partnerCap),
      obj(tx, args.partner),
    ],
  })
}
