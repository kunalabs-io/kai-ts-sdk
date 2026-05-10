import { Transaction, TransactionArgument, TransactionResult } from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { pure } from '../../_framework/util'

export interface CalcFX64Args {
  sqrtPX64: bigint | TransactionArgument
  sqrtPaX64: bigint | TransactionArgument
  sqrtPbX64: bigint | TransactionArgument
}

export function calcFX64(
  tx: Transaction,
  args: CalcFX64Args,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('kai-leverage-util', options?.env)}::rebalance_util::calc_f_x64`,
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

export function calcXAndYSellAmounts(
  tx: Transaction,
  args: CalcXAndYSellAmountsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage-util', options?.env)
    }::rebalance_util::calc_x_and_y_sell_amounts`,
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

export function calcRewardSellAmounts(
  tx: Transaction,
  args: CalcRewardSellAmountsArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${
      getPublishedAt('kai-leverage-util', options?.env)
    }::rebalance_util::calc_reward_sell_amounts`,
    arguments: [
      pure(tx, args.rewardAmount, `u64`),
      pure(tx, args.fX64, `u128`),
      pure(tx, args.pX128, `u256`),
      pure(tx, args.priceToXX128, `u256`),
      pure(tx, args.priceToYX128, `u256`),
    ],
  })
}
