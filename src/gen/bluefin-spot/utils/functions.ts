import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/** Returns the type of the provided generic as string */
export function getTypeString(tx: Transaction, typeArg: string): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::get_type_string`,
    typeArguments: [typeArg],
    arguments: [],
  })
}

export interface TransferCoinArgs {
  coin: TransactionObjectInput
  account: string | TransactionArgument
}

/** Transfers coin to the provided address if the coin balance > 0 else destroys it */
export function transferCoin(
  tx: Transaction,
  typeArg: string,
  args: TransferCoinArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::transfer_coin`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.coin),
      pure(tx, args.account, `address`),
    ],
  })
}

export interface TransferBalanceArgs {
  balance: TransactionObjectInput
  account: string | TransactionArgument
}

/** Transfers balance to the provided address if the balance > 0 else destroys it */
export function transferBalance(
  tx: Transaction,
  typeArg: string,
  args: TransferBalanceArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::transfer_balance`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.balance),
      pure(tx, args.account, `address`),
    ],
  })
}

/** Returns current timestamp in seconds */
export function timestampSeconds(
  tx: Transaction,
  clock: TransactionObjectInput,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::timestamp_seconds`,
    arguments: [obj(tx, clock)],
  })
}

export interface DepositBalanceArgs {
  a: TransactionObjectInput
  b: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Deposits the provided amount of `b` balance into `a` and reutrns the residual `b` balance */
export function depositBalance(
  tx: Transaction,
  typeArg: string,
  args: DepositBalanceArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::deposit_balance`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.a),
      obj(tx, args.b),
      pure(tx, args.amount, `u64`),
    ],
  })
}

export interface WithdrawBalanceArgs {
  balance: TransactionObjectInput
  amount: bigint | TransactionArgument
}

/** Withdraws provided `amount` of balance if possible */
export function withdrawBalance(
  tx: Transaction,
  typeArg: string,
  args: WithdrawBalanceArgs,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::withdraw_balance`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.balance),
      pure(tx, args.amount, `u64`),
    ],
  })
}

/** Converts u128 to string */
export function u128ToString(
  tx: Transaction,
  num: bigint | TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::u128_to_string`,
    arguments: [pure(tx, num, `u128`)],
  })
}

export interface AddDeltaArgs {
  currentLiquidity: bigint | TransactionArgument
  delta: TransactionObjectInput
}

export function addDelta(tx: Transaction, args: AddDeltaArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::add_delta`,
    arguments: [
      pure(tx, args.currentLiquidity, `u128`),
      obj(tx, args.delta),
    ],
  })
}

export interface OverflowAddArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
}

export function overflowAdd(tx: Transaction, args: OverflowAddArgs): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('bluefin-spot')}::utils::overflow_add`,
    arguments: [
      pure(tx, args.num1, `u256`),
      pure(tx, args.num2, `u256`),
    ],
  })
}
