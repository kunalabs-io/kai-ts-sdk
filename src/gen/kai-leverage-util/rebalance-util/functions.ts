import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { Transaction, TransactionArgument } from '@mysten/sui/transactions'

export interface CalcFX64Args {
  sqrtPX64: bigint | TransactionArgument
  sqrtPaX64: bigint | TransactionArgument
  sqrtPbX64: bigint | TransactionArgument
}

export function calcFX64(tx: Transaction, args: CalcFX64Args) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rebalance_util::calc_f_x64`,
    arguments: [
      pure(tx, args.sqrtPX64, `u128`),
      pure(tx, args.sqrtPaX64, `u128`),
      pure(tx, args.sqrtPbX64, `u128`),
    ],
  })
}

export interface CalcXAndYSellAmountsArgs {
  haveX: bigint | TransactionArgument
  haveY: bigint | TransactionArgument
  fX64: bigint | TransactionArgument
  pX128: bigint | TransactionArgument
}

export function calcXAndYSellAmounts(tx: Transaction, args: CalcXAndYSellAmountsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rebalance_util::calc_x_and_y_sell_amounts`,
    arguments: [
      pure(tx, args.haveX, `u64`),
      pure(tx, args.haveY, `u64`),
      pure(tx, args.fX64, `u128`),
      pure(tx, args.pX128, `u256`),
    ],
  })
}

export interface CalcRewardSellAmountsArgs {
  rewardAmount: bigint | TransactionArgument
  fX64: bigint | TransactionArgument
  pX128: bigint | TransactionArgument
  priceToXX128: bigint | TransactionArgument
  priceToYX128: bigint | TransactionArgument
}

export function calcRewardSellAmounts(tx: Transaction, args: CalcRewardSellAmountsArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::rebalance_util::calc_reward_sell_amounts`,
    arguments: [
      pure(tx, args.rewardAmount, `u64`),
      pure(tx, args.fX64, `u128`),
      pure(tx, args.pX128, `u256`),
      pure(tx, args.priceToXX128, `u256`),
      pure(tx, args.priceToYX128, `u256`),
    ],
  })
}
