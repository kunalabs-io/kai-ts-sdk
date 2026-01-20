import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'
import { ID } from '../../sui/object/structs'

/** Create `ExternalAddress`. */
export function new_(tx: Transaction, value: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::new`,
    arguments: [obj(tx, value)],
  })
}

/** Create `ExternalAddress` of all zeros.` */
export function default_(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::default`,
    arguments: [],
  })
}

/** Create `ExternalAddress` ensuring that not all bytes are zero. */
export function newNonzero(tx: Transaction, value: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::new_nonzero`,
    arguments: [obj(tx, value)],
  })
}

/** Destroy `ExternalAddress` for underlying bytes as `vector<u8>`. */
export function toBytes(tx: Transaction, ext: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::to_bytes`,
    arguments: [obj(tx, ext)],
  })
}

/** Destroy 'ExternalAddress` for underlying data. */
export function toBytes32(tx: Transaction, ext: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::to_bytes32`,
    arguments: [obj(tx, ext)],
  })
}

/** Drain 32 elements of `Cursor<u8>` to create `ExternalAddress`. */
export function takeBytes(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::take_bytes`,
    arguments: [obj(tx, cur)],
  })
}

/**
 * Drain 32 elements of `Cursor<u8>` to create `ExternalAddress` ensuring
 * that not all bytes are zero.
 */
export function takeNonzero(tx: Transaction, cur: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::take_nonzero`,
    arguments: [obj(tx, cur)],
  })
}

/** Destroy `ExternalAddress` to represent its underlying data as `address`. */
export function toAddress(tx: Transaction, ext: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::to_address`,
    arguments: [obj(tx, ext)],
  })
}

/** Create `ExternalAddress` from `address`. */
export function fromAddress(
  tx: Transaction,
  addr: string | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::from_address`,
    arguments: [pure(tx, addr, `address`)],
  })
}

/** Create `ExternalAddress` from `ID`. */
export function fromId(tx: Transaction, id: string | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::from_id`,
    arguments: [pure(tx, id, `${ID.$typeName}`)],
  })
}

/** Check whether underlying data is not all zeros. */
export function isNonzero(tx: Transaction, self: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('wormhole')}::external_address::is_nonzero`,
    arguments: [obj(tx, self)],
  })
}
