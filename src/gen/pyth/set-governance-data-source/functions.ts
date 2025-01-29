import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function fromByteVec(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_governance_data_source::from_byte_vec`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export interface ExecuteArgs {
  latestOnly: TransactionObjectInput
  pythState: TransactionObjectInput
  payload: Array<number | TransactionArgument> | TransactionArgument
}

export function execute(tx: Transaction, args: ExecuteArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_governance_data_source::execute`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.pythState),
      pure(tx, args.payload, `vector<u8>`),
    ],
  })
}
