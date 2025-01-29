import { PUBLISHED_AT } from '..'
import { obj, pure } from '../../_framework/util'
import { String } from './structs'
import { Transaction, TransactionArgument, TransactionObjectInput } from '@mysten/sui/transactions'

export interface AppendArgs {
  string: string | TransactionArgument
  other: string | TransactionArgument
}

export function append(tx: Transaction, args: AppendArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::append`,
    arguments: [
      pure(tx, args.string, `${String.$typeName}`),
      pure(tx, args.other, `${String.$typeName}`),
    ],
  })
}

export interface IndexOfArgs {
  string: string | TransactionArgument
  substr: string | TransactionArgument
}

export function indexOf(tx: Transaction, args: IndexOfArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::index_of`,
    arguments: [
      pure(tx, args.string, `${String.$typeName}`),
      pure(tx, args.substr, `${String.$typeName}`),
    ],
  })
}

export interface InsertArgs {
  s: string | TransactionArgument
  at: bigint | TransactionArgument
  o: string | TransactionArgument
}

export function insert(tx: Transaction, args: InsertArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::insert`,
    arguments: [
      pure(tx, args.s, `${String.$typeName}`),
      pure(tx, args.at, `u64`),
      pure(tx, args.o, `${String.$typeName}`),
    ],
  })
}

export function isEmpty(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::is_empty`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export function length(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::length`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export function allCharactersPrintable(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::all_characters_printable`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export function string(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::string`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}

export function asBytes(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::as_bytes`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export function byte_(tx: Transaction, char: TransactionObjectInput) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::ascii::byte`, arguments: [obj(tx, char)] })
}

export function char_(tx: Transaction, byte: number | TransactionArgument) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::ascii::char`, arguments: [pure(tx, byte, `u8`)] })
}

export function charToLowercase(tx: Transaction, byte: number | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::char_to_lowercase`,
    arguments: [pure(tx, byte, `u8`)],
  })
}

export function charToUppercase(tx: Transaction, byte: number | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::char_to_uppercase`,
    arguments: [pure(tx, byte, `u8`)],
  })
}

export function intoBytes(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::into_bytes`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export function isPrintableChar(tx: Transaction, byte: number | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::is_printable_char`,
    arguments: [pure(tx, byte, `u8`)],
  })
}

export function isValidChar(tx: Transaction, b: number | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::is_valid_char`,
    arguments: [pure(tx, b, `u8`)],
  })
}

export function popChar(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::pop_char`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export interface PushCharArgs {
  string: string | TransactionArgument
  char: TransactionObjectInput
}

export function pushChar(tx: Transaction, args: PushCharArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::push_char`,
    arguments: [pure(tx, args.string, `${String.$typeName}`), obj(tx, args.char)],
  })
}

export interface SubstringArgs {
  string: string | TransactionArgument
  i: bigint | TransactionArgument
  j: bigint | TransactionArgument
}

export function substring(tx: Transaction, args: SubstringArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::substring`,
    arguments: [
      pure(tx, args.string, `${String.$typeName}`),
      pure(tx, args.i, `u64`),
      pure(tx, args.j, `u64`),
    ],
  })
}

export function toLowercase(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::to_lowercase`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export function toUppercase(tx: Transaction, string: string | TransactionArgument) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::to_uppercase`,
    arguments: [pure(tx, string, `${String.$typeName}`)],
  })
}

export function tryString(
  tx: Transaction,
  bytes: Array<number | TransactionArgument> | TransactionArgument
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::ascii::try_string`,
    arguments: [pure(tx, bytes, `vector<u8>`)],
  })
}
