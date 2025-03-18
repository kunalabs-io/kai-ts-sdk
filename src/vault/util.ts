import { SuiClient } from '@mysten/sui/client'
import { findVaultInfoById, VaultInfo, VAULTS } from './vault'
import { phantom, PhantomTypeArgument } from '../gen/_framework/reified'
import { Amount } from '../amount'
import { min, muldiv } from '../math'
import { isVault, Vault } from '../gen/kai-single-asset-vault/vault/structs'
import { TimeLockedBalance } from '../gen/kai-single-asset-vault/time-locked-balance/structs'
import { Price } from '../price'
import Decimal from 'decimal.js'
import { parseTypeName } from '../gen/_framework/util'

export interface WalletVaultInfo {
  vault: VaultInfo<PhantomTypeArgument, PhantomTypeArgument>
  ytBalance: Amount
  equity: Amount
}

export function calcContinuousApy(apr: number, days: number): number {
  const time = days / 365
  const apy = Math.exp(apr * time) - 1

  return apy
}

export function tlbCalcMaxWithdrawable(
  tlb: TimeLockedBalance<PhantomTypeArgument>,
  timestampMs?: number
): bigint {
  const now = timestampMs ? BigInt(timestampMs) / 1000n : tlb.previousUnlockAt

  let unlockableAmount = 0n
  if (tlb.unlockPerSecond > 0 && tlb.unlockStartTsSec < now) {
    const toRemainLocked =
      (tlb.finalUnlockTsSec - min(tlb.finalUnlockTsSec, now)) * tlb.unlockPerSecond
    const lockedAmountRound = (tlb.lockedBalance.value / tlb.unlockPerSecond) * tlb.unlockPerSecond
    unlockableAmount = lockedAmountRound - toRemainLocked
  }

  return tlb.unlockedBalance.value + unlockableAmount
}

export function calcTotalAvailableBalance(
  vault: Vault<PhantomTypeArgument, PhantomTypeArgument>,
  timestampMs?: number
): bigint {
  let total = 0n
  total += vault.freeBalance.value
  total += tlbCalcMaxWithdrawable(vault.timeLockedProfit, timestampMs)

  for (const strategy of vault.strategies.contents) {
    total += strategy.value.borrowed
  }

  return total
}

/**
 * Get current global stats about a vault.
 *
 * @param vaultData - Vault data
 * @returns Vault stats
 */
export function getVaultStats(vaultData: Vault<PhantomTypeArgument, PhantomTypeArgument>) {
  const vault = findVaultInfoById(vaultData.id)
  if (!vault) {
    throw new Error(`VaultInfo not found for Vault id: ${vaultData.id}`)
  }

  const tvl = Amount.fromInt(calcTotalAvailableBalance(vaultData, Date.now()), vault.T.decimals)

  const now = new Date().getTime() / 1000
  let unlockPerSecond = muldiv(
    vaultData.timeLockedProfit.unlockPerSecond,
    10000n - vaultData.performanceFeeBps,
    10000n
  )
  if (now > vaultData.timeLockedProfit.finalUnlockTsSec) {
    unlockPerSecond = 0n
  }

  let apy = 0
  let apr = 0
  const unlockPerYear = unlockPerSecond * 60n * 60n * 24n * 365n
  if (tvl.int > 0n) {
    apr = Number(unlockPerYear) / Number(tvl.int)
    apy = calcContinuousApy(apr, 365)
  }

  return {
    tvl,
    apy,
    apr,
  }
}

/**
 * Get stats for all vaults.
 *
 * @param client - SuiClient
 * @returns All vault stats
 */
export async function getAllVaultStats(client: SuiClient) {
  const vaultInfos = Object.values(VAULTS)
  const vaultDatas = await getVaultDataBatch(
    client,
    vaultInfos.map(v => v.id)
  )

  const ret = []
  for (let i = 0; i < vaultDatas.length; i++) {
    const vaultData = vaultDatas[i]
    const vaultInfo = vaultInfos[i]
    const stats = getVaultStats(vaultData)
    ret.push({
      vaultInfo,
      ...stats,
    })
  }
  return ret
}

/**
 * Calculate the conversion rate of a vault's yield-bearing tokens (YT) to the vault's underlying asset (T).
 * Multiplying the conversion rate by the amount of YT will give the amount of T.
 *
 * @param vaultInfo - Vault info
 * @param vaultData - Vault data
 * @returns Conversion rate
 */
export function calcYtConversionRate<T extends PhantomTypeArgument, YT extends PhantomTypeArgument>(
  vaultInfo: VaultInfo<T, YT>,
  vaultData: Vault<T, YT>
): Price<YT, T> {
  if (vaultInfo.id !== vaultData.id) {
    throw new Error('VaultInfo and Vault data mismatch')
  }

  const totalAvailableBalance = calcTotalAvailableBalance(vaultData, Date.now())
  const ytSupply = vaultData.lpTreasury.totalSupply.value

  const rate = new Decimal(totalAvailableBalance.toString()).div(ytSupply.toString())

  return Price.fromNumeric(vaultInfo.YT, vaultInfo.T, rate) as Price<YT, T>
}

/**
 * Get info about a wallet's position in a vault.
 *
 * @param client - SuiClient
 * @param wallet - Wallet address
 * @param vaultData - Vault data
 * @returns Wallet vault info
 */
export async function getWalletVaultInfo(
  client: SuiClient,
  wallet: string,
  vaultData: Vault<PhantomTypeArgument, PhantomTypeArgument>
): Promise<WalletVaultInfo> {
  const vault = findVaultInfoById(vaultData.id)
  if (!vault) {
    throw new Error(`VaultInfo not found for Vault id: ${vaultData.id}`)
  }

  const ytBalanceRes = await client.getBalance({ owner: wallet, coinType: vault.YT.typeName })
  const ytBalance = Amount.fromInt(BigInt(ytBalanceRes.totalBalance), vault.YT.decimals)

  const rate = calcYtConversionRate(vault, vaultData)
  const equity = Amount.fromInt(
    BigInt(rate.numeric.mul(ytBalance.int.toString()).toFixed(0, Decimal.ROUND_FLOOR)),
    vault.T.decimals
  )

  return {
    vault,
    ytBalance,
    equity,
  }
}

/**
 * Get vault data for a batch of vault ids.
 *
 * @param client - SuiClient
 * @param ids - Vault ids
 * @returns Vault data
 */
export async function getVaultDataBatch(client: SuiClient, ids: string[]) {
  const res = await client.multiGetObjects({
    ids,
    options: {
      showBcs: true,
    },
  })

  return res.map((item, index) => {
    if (!item.data) {
      throw new Error(`No data in response for ${ids[index]}`)
    }
    if (item.data.bcs?.dataType !== 'moveObject') {
      throw new Error(`Invalid object type for ${item.data.objectId}, expected moveObject`)
    }
    if (!isVault(item.data.bcs.type)) {
      throw new Error(
        `Invalid object type for ${item.data.objectId}, expected Vault, got ${item.data.bcs.type}`
      )
    }

    const { typeArgs } = parseTypeName(item.data.bcs.type)
    const vaultData = Vault.fromSuiObjectData(
      [phantom(typeArgs[0]), phantom(typeArgs[1])],
      item.data
    )

    return vaultData
  })
}

/**
 * Get info about a wallet's position in all vaults.
 *
 * @param client - SuiClient
 * @param wallet - Wallet address
 * @returns Wallet vault info
 */
export async function getWalletAllVaultInfo(
  client: SuiClient,
  wallet: string
): Promise<WalletVaultInfo[]> {
  const ret: WalletVaultInfo[] = []

  const [ytBalances, vaultDatas] = await Promise.all([
    client.getAllBalances({ owner: wallet }),
    getVaultDataBatch(
      client,
      Object.values(VAULTS).map(v => v.id)
    ),
  ])
  const balanceMap = ytBalances.reduce((acc, curr) => {
    acc.set(curr.coinType, BigInt(curr.totalBalance))
    return acc
  }, new Map<string, bigint>())

  for (const vaultData of vaultDatas) {
    const vault = findVaultInfoById(vaultData.id)
    if (!vault) {
      throw new Error(`VaultInfo not found for Vault id: ${vaultData.id}`)
    }
    const ytBalance = balanceMap.get(vault.YT.typeName) || 0n

    const rate = calcYtConversionRate(vault, vaultData)
    const equity = Amount.fromInt(
      BigInt(rate.numeric.mul(ytBalance.toString()).toFixed(0, Decimal.ROUND_FLOOR)),
      vault.T.decimals
    )

    ret.push({
      vault,
      ytBalance: Amount.fromInt(ytBalance, vault.YT.decimals),
      equity,
    })
  }

  return ret
}
