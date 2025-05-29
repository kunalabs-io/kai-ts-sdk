import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function deserializeHeader(tx: Transaction, cur: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_price_attestation::deserialize_header`,
    arguments: [obj(tx, cur)],
  })
}

export function destroy(tx: Transaction, batch: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_price_attestation::destroy`,
    arguments: [obj(tx, batch)],
  })
}

export function getAttestationCount(tx: Transaction, batch: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_price_attestation::get_attestation_count`,
    arguments: [obj(tx, batch)],
  })
}

export interface GetPriceInfoArgs {
  batch: TransactionObjectInput
  index: bigint | TransactionArgument
}

export function getPriceInfo(tx: Transaction, args: GetPriceInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_price_attestation::get_price_info`,
    arguments: [obj(tx, args.batch), pure(tx, args.index, `u64`)],
  })
}

export interface DeserializeArgs {
  bytes: Array<number | TransactionArgument> | TransactionArgument
  clock: TransactionObjectInput
}

export function deserialize(tx: Transaction, args: DeserializeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_price_attestation::deserialize`,
    arguments: [pure(tx, args.bytes, `vector<u8>`), obj(tx, args.clock)],
  })
}

export interface DeserializePriceInfoArgs {
  cur: TransactionObjectInput
  clock: TransactionObjectInput
}

export function deserializePriceInfo(tx: Transaction, args: DeserializePriceInfoArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::batch_price_attestation::deserialize_price_info`,
    arguments: [obj(tx, args.cur), obj(tx, args.clock)],
  })
}
