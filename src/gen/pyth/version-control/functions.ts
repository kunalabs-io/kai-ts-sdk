import { PUBLISHED_AT } from '..'
import { Transaction } from '@mysten/sui/transactions'

export function currentVersion(tx: Transaction) {
  return tx.moveCall({ target: `${PUBLISHED_AT}::version_control::current_version`, arguments: [] })
}

export function previousVersion(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::version_control::previous_version`,
    arguments: [],
  })
}
