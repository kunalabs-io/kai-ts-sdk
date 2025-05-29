import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePartnerArgs {
  config: TransactionObjectInput
  partners: TransactionObjectInput
  name: string | TransactionArgument
  refFeeRate: bigint | TransactionArgument
  startTime: bigint | TransactionArgument
  endTime: bigint | TransactionArgument
  recipient: string | TransactionArgument
  clock: TransactionObjectInput
}

export function createPartner(tx: Transaction, args: CreatePartnerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::create_partner`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.partners),
      pure(tx, args.name, `${String.$typeName}`),
      pure(tx, args.refFeeRate, `u64`),
      pure(tx, args.startTime, `u64`),
      pure(tx, args.endTime, `u64`),
      pure(tx, args.recipient, `address`),
      obj(tx, args.clock),
    ],
  })
}

export function name(tx: Transaction, partner: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::partner::name`, arguments: [obj(tx, partner)] })
}

export function refFeeRate(tx: Transaction, partner: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::ref_fee_rate`,
    arguments: [obj(tx, partner)],
  })
}

export function startTime(tx: Transaction, partner: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::start_time`,
    arguments: [obj(tx, partner)],
  })
}

export function endTime(tx: Transaction, partner: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::end_time`,
    arguments: [obj(tx, partner)],
  })
}

export function balances(tx: Transaction, partner: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::balances`,
    arguments: [obj(tx, partner)],
  })
}

export interface CurrentRefFeeRateArgs {
  partner: TransactionObjectInput
  currentTime: bigint | TransactionArgument
}

export function currentRefFeeRate(tx: Transaction, args: CurrentRefFeeRateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::current_ref_fee_rate`,
    arguments: [obj(tx, args.partner), pure(tx, args.currentTime, `u64`)],
  })
}

export interface UpdateRefFeeRateArgs {
  config: TransactionObjectInput
  partner: TransactionObjectInput
  newFeeRate: bigint | TransactionArgument
}

export function updateRefFeeRate(tx: Transaction, args: UpdateRefFeeRateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::update_ref_fee_rate`,
    arguments: [obj(tx, args.config), obj(tx, args.partner), pure(tx, args.newFeeRate, `u64`)],
  })
}

export interface UpdateTimeRangeArgs {
  config: TransactionObjectInput
  partner: TransactionObjectInput
  startTime: bigint | TransactionArgument
  endTime: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function updateTimeRange(tx: Transaction, args: UpdateTimeRangeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::update_time_range`,
    arguments: [
      obj(tx, args.config),
      obj(tx, args.partner),
      pure(tx, args.startTime, `u64`),
      pure(tx, args.endTime, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface ReceiveRefFeeArgs {
  partner: TransactionObjectInput
  fee: TransactionObjectInput
}

export function receiveRefFee(tx: Transaction, typeArg: string, args: ReceiveRefFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::receive_ref_fee`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.partner), obj(tx, args.fee)],
  })
}

export interface ClaimRefFeeArgs {
  config: TransactionObjectInput
  partnerCap: TransactionObjectInput
  partner: TransactionObjectInput
}

export function claimRefFee(tx: Transaction, typeArg: string, args: ClaimRefFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner::claim_ref_fee`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.config), obj(tx, args.partnerCap), obj(tx, args.partner)],
  })
}
