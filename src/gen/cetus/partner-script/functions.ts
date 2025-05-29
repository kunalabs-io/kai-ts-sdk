import { PUBLISHED_AT } from '..'
import { String } from '../../_dependencies/onchain/0x1/string/structs'
import { obj, pure } from '../../_framework/util'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePartnerArgs {
  globalConfig: TransactionObjectInput
  partners: TransactionObjectInput
  string: string | TransactionArgument
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  u643: bigint | TransactionArgument
  address: string | TransactionArgument
  clock: TransactionObjectInput
}

export function createPartner(tx: Transaction, args: CreatePartnerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner_script::create_partner`,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.partners),
      pure(tx, args.string, `${String.$typeName}`),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u643, `u64`),
      pure(tx, args.address, `address`),
      obj(tx, args.clock),
    ],
  })
}

export interface UpdatePartnerRefFeeRateArgs {
  globalConfig: TransactionObjectInput
  partner: TransactionObjectInput
  u64: bigint | TransactionArgument
}

export function updatePartnerRefFeeRate(tx: Transaction, args: UpdatePartnerRefFeeRateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner_script::update_partner_ref_fee_rate`,
    arguments: [obj(tx, args.globalConfig), obj(tx, args.partner), pure(tx, args.u64, `u64`)],
  })
}

export interface UpdatePartnerTimeRangeArgs {
  globalConfig: TransactionObjectInput
  partner: TransactionObjectInput
  u641: bigint | TransactionArgument
  u642: bigint | TransactionArgument
  clock: TransactionObjectInput
}

export function updatePartnerTimeRange(tx: Transaction, args: UpdatePartnerTimeRangeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner_script::update_partner_time_range`,
    arguments: [
      obj(tx, args.globalConfig),
      obj(tx, args.partner),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      obj(tx, args.clock),
    ],
  })
}

export interface ClaimRefFeeArgs {
  globalConfig: TransactionObjectInput
  partnerCap: TransactionObjectInput
  partner: TransactionObjectInput
}

export function claimRefFee(tx: Transaction, typeArg: string, args: ClaimRefFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner_script::claim_ref_fee`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.globalConfig), obj(tx, args.partnerCap), obj(tx, args.partner)],
  })
}
