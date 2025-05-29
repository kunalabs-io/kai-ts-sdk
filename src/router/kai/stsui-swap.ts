import { Transaction, TransactionObjectInput } from '@mysten/sui/transactions'
import { SUI_SYSTEM_STATE_OBJECT_ID } from '@mysten/sui/utils'
import { stSUI, SUI } from '../../coin-info'
import * as coin from '../../gen/sui/coin/functions'
import { RouteStep } from '.'

export function redeemStSuiCoin(tx: Transaction, coinIn: TransactionObjectInput) {
  const coinOut = tx.moveCall({
    target: `0x059f94b85c07eb74d2847f8255d8cc0a67c9a8dcc039eabf9f8b9e23a0de2700::liquid_staking::redeem`,
    arguments: [
      tx.object('0x1adb343ab351458e151bc392fbf1558b3332467f23bda45ae67cd355a57fd5f5'),
      tx.object(coinIn),
      tx.object(SUI_SYSTEM_STATE_OBJECT_ID),
    ],
    typeArguments: [stSUI.typeName],
  })

  return coinOut
}

export function redeemStSuiBalance(tx: Transaction, balanceIn: TransactionObjectInput) {
  const coinOut = redeemStSuiCoin(tx, coin.fromBalance(tx, stSUI.typeName, balanceIn))
  return coin.intoBalance(tx, SUI.typeName, coinOut)
}

export function swapStep(tx: Transaction, step: RouteStep, balanceIn: TransactionObjectInput) {
  const { pool, a2b } = step
  if (pool.protocol !== 'stsui') {
    throw new Error(`stsuiSwapStep: Only 'stsui' protocol supported, but got '${pool.protocol}'`)
  }
  if (!a2b) {
    throw new Error('stSUI minting not supported')
  }

  return redeemStSuiBalance(tx, balanceIn)
}
