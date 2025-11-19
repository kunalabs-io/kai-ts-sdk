import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface CreatePartnerArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: string | TransactionArgument
  a3: bigint | TransactionArgument
  a4: bigint | TransactionArgument
  a5: bigint | TransactionArgument
  a6: string | TransactionArgument
  a7: TransactionObjectInput
}

export function createPartner(tx: Transaction, args: CreatePartnerArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner_script::create_partner`,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `${String.$typeName}`),
      pure(tx, args.a3, `u64`),
      pure(tx, args.a4, `u64`),
      pure(tx, args.a5, `u64`),
      pure(tx, args.a6, `address`),
      obj(tx, args.a7),
    ],
  })
}

export interface UpdatePartnerRefFeeRateArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: bigint | TransactionArgument
}

export function updatePartnerRefFeeRate(tx: Transaction, args: UpdatePartnerRefFeeRateArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner_script::update_partner_ref_fee_rate`,
    arguments: [obj(tx, args.a0), obj(tx, args.a1), pure(tx, args.a2, `u64`)],
  })
}

export interface UpdatePartnerTimeRangeArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: bigint | TransactionArgument
  a3: bigint | TransactionArgument
  a4: TransactionObjectInput
}

export function updatePartnerTimeRange(tx: Transaction, args: UpdatePartnerTimeRangeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner_script::update_partner_time_range`,
    arguments: [
      obj(tx, args.a0),
      obj(tx, args.a1),
      pure(tx, args.a2, `u64`),
      pure(tx, args.a3, `u64`),
      obj(tx, args.a4),
    ],
  })
}

export interface ClaimRefFeeArgs {
  a0: TransactionObjectInput
  a1: TransactionObjectInput
  a2: TransactionObjectInput
}

export function claimRefFee(tx: Transaction, typeArg: string, args: ClaimRefFeeArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::partner_script::claim_ref_fee`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.a0), obj(tx, args.a1), obj(tx, args.a2)],
  })
}
