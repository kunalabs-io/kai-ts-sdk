import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import type { EnvConfig } from '../../_envs'
import { getPublishedAt } from '../../_envs'
import { obj, pure } from '../../_framework/util'

/**
 * Create and share the AddressAliasState object. This function is called exactly once, when
 * the address alias state object is first created.
 * Can only be called by genesis or change_epoch transactions.
 */
export function create(tx: Transaction, options?: { env?: EnvConfig }): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::address_alias::create`,
    arguments: [],
  })
}

/**
 * Enables address alias configuration for the sender address.
 *
 * By default, an address is its own alias. The provided `AddressAliases`
 * object can be used to change the set of allowed aliases after enabling.
 */
export function enable(
  tx: Transaction,
  addressAliasState: TransactionObjectInput,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::address_alias::enable`,
    arguments: [obj(tx, addressAliasState)],
  })
}

export interface AddArgs {
  aliases: TransactionObjectInput
  alias: string | TransactionArgument
}

/** Adds the provided address to the set of aliases for the sender. */
export function add(
  tx: Transaction,
  args: AddArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::address_alias::add`,
    arguments: [
      obj(tx, args.aliases),
      pure(tx, args.alias, `address`),
    ],
  })
}

export interface ReplaceAllArgs {
  aliases: TransactionObjectInput
  newAliases: Array<string | TransactionArgument> | TransactionArgument
}

/** Overwrites the aliases for the sender's address with the given set. */
export function replaceAll(
  tx: Transaction,
  args: ReplaceAllArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::address_alias::replace_all`,
    arguments: [
      obj(tx, args.aliases),
      pure(tx, args.newAliases, `vector<address>`),
    ],
  })
}

export interface RemoveArgs {
  aliases: TransactionObjectInput
  alias: string | TransactionArgument
}

/** Removes the given alias from the set of aliases for the sender's address. */
export function remove(
  tx: Transaction,
  args: RemoveArgs,
  options?: { env?: EnvConfig },
): TransactionResult {
  return tx.moveCall({
    target: `${getPublishedAt('sui', options?.env)}::address_alias::remove`,
    arguments: [
      obj(tx, args.aliases),
      pure(tx, args.alias, `address`),
    ],
  })
}
