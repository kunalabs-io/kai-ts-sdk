import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function fromByteVec(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_identifier::from_byte_vec`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export function getBytes(
  tx: Transaction,
  priceIdentifier: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::price_identifier::get_bytes`,
    arguments: [obj(tx, priceIdentifier)],
  })
}
