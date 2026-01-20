import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'

/**
 * Creates a table which maps a PriceIdentifier to the
 * UID (in bytes) of the corresponding Sui PriceInfoObject.
 */
export function newPriceInfoRegistry(
  tx: Transaction,
  parentId: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::new_price_info_registry`,
    arguments: [obj(tx, parentId)],
  })
}

export interface AddArgs {
  parentId: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
  id: string | TransactionArgument
}

export function add(tx: Transaction, args: AddArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::add`,
    arguments: [
      obj(tx, args.parentId),
      obj(tx, args.priceIdentifier),
      pure(tx, args.id, `${ID.$typeName}`),
    ],
  })
}

export interface GetIdBytesArgs {
  parentId: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
}

/** Returns ID of price info object corresponding to price_identifier as a byte vector. */
export function getIdBytes(tx: Transaction, args: GetIdBytesArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::get_id_bytes`,
    arguments: [
      obj(tx, args.parentId),
      obj(tx, args.priceIdentifier),
    ],
  })
}

export interface GetIdArgs {
  parentId: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
}

/** Returns ID of price info object corresponding to price_identifier as an ID. */
export function getId(tx: Transaction, args: GetIdArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::get_id`,
    arguments: [
      obj(tx, args.parentId),
      obj(tx, args.priceIdentifier),
    ],
  })
}

export interface ContainsArgs {
  parentId: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
}

export function contains(tx: Transaction, args: ContainsArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::contains`,
    arguments: [
      obj(tx, args.parentId),
      obj(tx, args.priceIdentifier),
    ],
  })
}

export function getBalance(
  tx: Transaction,
  priceInfoObject: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::get_balance`,
    arguments: [obj(tx, priceInfoObject)],
  })
}

export interface DepositFeeCoinsArgs {
  priceInfoObject: TransactionObjectInput
  feeCoins: TransactionObjectInput
}

export function depositFeeCoins(tx: Transaction, args: DepositFeeCoinsArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::deposit_fee_coins`,
    arguments: [
      obj(tx, args.priceInfoObject),
      obj(tx, args.feeCoins),
    ],
  })
}

export function newPriceInfoObject(
  tx: Transaction,
  priceInfo: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::new_price_info_object`,
    arguments: [obj(tx, priceInfo)],
  })
}

export interface NewPriceInfoArgs {
  attestationTime: bigint | TransactionArgument
  arrivalTime: bigint | TransactionArgument
  priceFeed: TransactionObjectInput
}

export function newPriceInfo(tx: Transaction, args: NewPriceInfoArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::new_price_info`,
    arguments: [
      pure(tx, args.attestationTime, `u64`),
      pure(tx, args.arrivalTime, `u64`),
      obj(tx, args.priceFeed),
    ],
  })
}

export function uidToInner(tx: Transaction, priceInfo: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::uid_to_inner`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getPriceInfoFromPriceInfoObject(
  tx: Transaction,
  priceInfo: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::get_price_info_from_price_info_object`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getPriceIdentifier(
  tx: Transaction,
  priceInfo: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::get_price_identifier`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getPriceFeed(
  tx: Transaction,
  priceInfo: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::get_price_feed`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getAttestationTime(
  tx: Transaction,
  priceInfo: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::get_attestation_time`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getArrivalTime(
  tx: Transaction,
  priceInfo: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::get_arrival_time`,
    arguments: [obj(tx, priceInfo)],
  })
}

export interface UpdatePriceInfoObjectArgs {
  priceInfoObject: TransactionObjectInput
  priceInfo: TransactionObjectInput
}

export function updatePriceInfoObject(
  tx: Transaction,
  args: UpdatePriceInfoObjectArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_info::update_price_info_object`,
    arguments: [
      obj(tx, args.priceInfoObject),
      obj(tx, args.priceInfo),
    ],
  })
}
