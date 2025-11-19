import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface PrepareMessageArgs {
  emitterCap: TransactionObjectInput
  nonce: number | TransactionArgument
  payload: Array<number | TransactionArgument> | TransactionArgument
}

export function prepareMessage(tx: Transaction, args: PrepareMessageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::publish_message::prepare_message`,
    arguments: [
      obj(tx, args.emitterCap),
      pure(tx, args.nonce, `u32`),
      pure(tx, args.payload, `vector<u8>`),
    ],
  })
}

export interface PublishMessageArgs {
  wormholeState: TransactionObjectInput
  messageFee: TransactionObjectInput
  preparedMsg: TransactionObjectInput
  theClock: TransactionObjectInput
}

export function publishMessage(tx: Transaction, args: PublishMessageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::publish_message::publish_message`,
    arguments: [
      obj(tx, args.wormholeState),
      obj(tx, args.messageFee),
      obj(tx, args.preparedMsg),
      obj(tx, args.theClock),
    ],
  })
}
