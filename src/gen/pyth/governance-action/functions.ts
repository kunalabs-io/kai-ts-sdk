import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

export function fromU8(tx: Transaction, value: number | TransactionArgument): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance_action::from_u8`,
    arguments: [pure(tx, value, `u8`)],
  })
}

export function getValue(tx: Transaction, a: TransactionObjectInput): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance_action::get_value`,
    arguments: [obj(tx, a)],
  })
}

export function newContractUpgrade(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance_action::new_contract_upgrade`,
    arguments: [],
  })
}

export function newSetGovernanceDataSource(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance_action::new_set_governance_data_source`,
    arguments: [],
  })
}

export function newSetDataSources(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance_action::new_set_data_sources`,
    arguments: [],
  })
}

export function newSetUpdateFee(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance_action::new_set_update_fee`,
    arguments: [],
  })
}

export function newSetStalePriceThreshold(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance_action::new_set_stale_price_threshold`,
    arguments: [],
  })
}

export function newSetFeeRecipient(tx: Transaction): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('pyth')}::governance_action::new_set_fee_recipient`,
    arguments: [],
  })
}
