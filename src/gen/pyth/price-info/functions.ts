import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AddArgs {
  parentId: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
  id: string | TransactionArgument
}

export function add(tx: Transaction, args: AddArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::add`,
    arguments: [
      obj(tx, args.parentId),
      obj(tx, args.priceIdentifier),
      pure(tx, args.id, `${ID.$typeName}`),
    ],
  })
}

export interface ContainsArgs {
  parentId: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
}

export function contains(tx: Transaction, args: ContainsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::contains`,
    arguments: [obj(tx, args.parentId), obj(tx, args.priceIdentifier)],
  })
}

export interface DepositFeeCoinsArgs {
  priceInfoObject: TransactionObjectInput
  feeCoins: TransactionObjectInput
}

export function depositFeeCoins(tx: Transaction, args: DepositFeeCoinsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::deposit_fee_coins`,
    arguments: [obj(tx, args.priceInfoObject), obj(tx, args.feeCoins)],
  })
}

export function getArrivalTime(tx: Transaction, priceInfo: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::get_arrival_time`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getAttestationTime(tx: Transaction, priceInfo: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::get_attestation_time`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getBalance(tx: Transaction, priceInfoObject: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::get_balance`,
    arguments: [obj(tx, priceInfoObject)],
  })
}

export interface GetIdArgs {
  parentId: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
}

export function getId(tx: Transaction, args: GetIdArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::get_id`,
    arguments: [obj(tx, args.parentId), obj(tx, args.priceIdentifier)],
  })
}

export interface GetIdBytesArgs {
  parentId: TransactionObjectInput
  priceIdentifier: TransactionObjectInput
}

export function getIdBytes(tx: Transaction, args: GetIdBytesArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::get_id_bytes`,
    arguments: [obj(tx, args.parentId), obj(tx, args.priceIdentifier)],
  })
}

export function getPriceFeed(tx: Transaction, priceInfo: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::get_price_feed`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getPriceIdentifier(tx: Transaction, priceInfo: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::get_price_identifier`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function getPriceInfoFromPriceInfoObject(
  tx: Transaction,
  priceInfo: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::get_price_info_from_price_info_object`,
    arguments: [obj(tx, priceInfo)],
  })
}

export interface NewPriceInfoArgs {
  attestationTime: bigint | TransactionArgument
  arrivalTime: bigint | TransactionArgument
  priceFeed: TransactionObjectInput
}

export function newPriceInfo(tx: Transaction, args: NewPriceInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::new_price_info`,
    arguments: [
      pure(tx, args.attestationTime, `u64`),
      pure(tx, args.arrivalTime, `u64`),
      obj(tx, args.priceFeed),
    ],
  })
}

export function newPriceInfoObject(tx: Transaction, priceInfo: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::new_price_info_object`,
    arguments: [obj(tx, priceInfo)],
  })
}

export function newPriceInfoRegistry(tx: Transaction, parentId: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::new_price_info_registry`,
    arguments: [obj(tx, parentId)],
  })
}

export function uidToInner(tx: Transaction, priceInfo: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::uid_to_inner`,
    arguments: [obj(tx, priceInfo)],
  })
}

export interface UpdatePriceInfoObjectArgs {
  priceInfoObject: TransactionObjectInput
  priceInfo: TransactionObjectInput
}

export function updatePriceInfoObject(tx: Transaction, args: UpdatePriceInfoObjectArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::price_info::update_price_info_object`,
    arguments: [obj(tx, args.priceInfoObject), obj(tx, args.priceInfo)],
  })
}
