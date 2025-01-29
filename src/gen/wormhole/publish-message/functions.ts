import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface PublishMessageArgs {
  state: TransactionObjectInput
  coin: TransactionObjectInput
  messageTicket: TransactionObjectInput
  clock: TransactionObjectInput
}

export function publishMessage(tx: Transaction, args: PublishMessageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::publish_message::publish_message`,
    arguments: [
      obj(tx, args.state),
      obj(tx, args.coin),
      obj(tx, args.messageTicket),
      obj(tx, args.clock),
    ],
  })
}

export interface PrepareMessageArgs {
  emitterCap: TransactionObjectInput
  u32: number | TransactionArgument
  vecU8: Array<number | TransactionArgument> | TransactionArgument
}

export function prepareMessage(tx: Transaction, args: PrepareMessageArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::publish_message::prepare_message`,
    arguments: [
      obj(tx, args.emitterCap),
      pure(tx, args.u32, `u32`),
      pure(tx, args.vecU8, `vector<u8>`),
    ],
  })
}
