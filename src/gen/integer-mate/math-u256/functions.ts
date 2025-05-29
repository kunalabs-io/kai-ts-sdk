import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { Transaction, TransactionArgument } from '@mysten/sui/transactions'

export interface DivModArgs {
  num: bigint | TransactionArgument
  denom: bigint | TransactionArgument
}

export function divMod(tx: Transaction, args: DivModArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u256::div_mod`,
    arguments: [pure(tx, args.num, `u256`), pure(tx, args.denom, `u256`)],
  })
}

export function shlw(tx: Transaction, n: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u256::shlw`,
    arguments: [pure(tx, n, `u256`)],
  })
}

export function shrw(tx: Transaction, n: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u256::shrw`,
    arguments: [pure(tx, n, `u256`)],
  })
}

export function checkedShlw(tx: Transaction, n: bigint | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u256::checked_shlw`,
    arguments: [pure(tx, n, `u256`)],
  })
}

export interface DivRoundArgs {
  num: bigint | TransactionArgument
  denom: bigint | TransactionArgument
  roundUp: boolean | TransactionArgument
}

export function divRound(tx: Transaction, args: DivRoundArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u256::div_round`,
    arguments: [
      pure(tx, args.num, `u256`),
      pure(tx, args.denom, `u256`),
      pure(tx, args.roundUp, `bool`),
    ],
  })
}

export interface AddCheckArgs {
  num1: bigint | TransactionArgument
  num2: bigint | TransactionArgument
}

export function addCheck(tx: Transaction, args: AddCheckArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::math_u256::add_check`,
    arguments: [pure(tx, args.num1, `u256`), pure(tx, args.num2, `u256`)],
  })
}
