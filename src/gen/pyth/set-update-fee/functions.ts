import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface ApplyExponentArgs {
  mantissa: bigint | TransactionArgument
  exponent: number | TransactionArgument
}

export function applyExponent(tx: Transaction, args: ApplyExponentArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_update_fee::apply_exponent`,
    arguments: [pure(tx, args.mantissa, `u64`), pure(tx, args.exponent, `u8`)],
  })
}

export interface ExecuteArgs {
  latestOnly: TransactionObjectInput
  pythState: TransactionObjectInput
  payload: Array<number | TransactionArgument> | TransactionArgument
}

export function execute(tx: Transaction, args: ExecuteArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_update_fee::execute`,
    arguments: [
      obj(tx, args.latestOnly),
      obj(tx, args.pythState),
      pure(tx, args.payload, `vector<u8>`),
    ],
  })
}

export function fromByteVec(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::set_update_fee::from_byte_vec`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}
