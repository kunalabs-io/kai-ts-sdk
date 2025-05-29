import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export function fromU8(tx: Transaction, value: number | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_action::from_u8`,
    arguments: [pure(tx, value, `u8`)],
  })
}

export function getValue(tx: Transaction, a: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_action::get_value`,
    arguments: [obj(tx, a)],
  })
}

export function newContractUpgrade(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_action::new_contract_upgrade`,
    arguments: [],
  })
}

export function newSetGovernanceDataSource(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_action::new_set_governance_data_source`,
    arguments: [],
  })
}

export function newSetDataSources(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_action::new_set_data_sources`,
    arguments: [],
  })
}

export function newSetUpdateFee(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_action::new_set_update_fee`,
    arguments: [],
  })
}

export function newSetStalePriceThreshold(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_action::new_set_stale_price_threshold`,
    arguments: [],
  })
}

export function newSetFeeRecipient(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::governance_action::new_set_fee_recipient`,
    arguments: [],
  })
}
