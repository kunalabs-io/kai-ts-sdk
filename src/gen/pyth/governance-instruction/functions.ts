import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function destroy(tx: Transaction, instruction: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_instruction::destroy`,
    arguments: [obj(tx, instruction)],
  })
}

export function fromByteVec(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_instruction::from_byte_vec`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export function getAction(tx: Transaction, instruction: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_instruction::get_action`,
    arguments: [obj(tx, instruction)],
  })
}

export function getModule(tx: Transaction, instruction: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_instruction::get_module`,
    arguments: [obj(tx, instruction)],
  })
}

export function getTargetChainId(tx: Transaction, instruction: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_instruction::get_target_chain_id`,
    arguments: [obj(tx, instruction)],
  })
}

export function validate(tx: Transaction, instruction: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_instruction::validate`,
    arguments: [obj(tx, instruction)],
  })
}
