# @kunalabs-io/kai

TypeScript SDK for interacting with the Kai Finance protocol (https://kai.finance).

## Quick Start

Install:

```
pnpm add @kunalabs-io/kai
```

## Single Asset Vaults

### Deposit

```ts
import { Amount, VAULTS } from '@kunalabs-io/kai'
import { Transaction } from '@mysten/sui/transactions'
import * as coin from './gen/sui/coin/functions' // bindings generated with `sui-client-gen`

async function deposit() {
  const vault = VAULTS.suiUSDT // get a vault instance
  const walletAddress = '...'

  // deposit by manually acquiring a `Balance<T>` object
  const tx = new Transaction()
  const balance = '...' // get a `Balance<T>` object from somewhere

  const ytBalance = vault.deposit(tx, balance) // returns balance of yield-bearing tokens (YT)
  const ytCoin = coin.fromBalance(tx, vault.YT.typeName, ytBalance)
  tx.transferObjects([ytCoin], walletAddress)

  // alternatively, you can use the `vault.depositFromWallet()` method
  // which will get the `Balance<T>` object from the wallet and deposit it
  const amount = Amount.fromNum(100, vault.T.decimals) // 100 suiUSDT
  await vault.depositFromWallet(tx, walletAddress, amount)
}
```

### Withdraw

```ts
import { Amount, VAULTS } from '@kunalabs-io/kai'
import { Transaction } from '@mysten/sui/transactions'
import { SuiClient } from '@mysten/sui/client'
import * as coin from './gen/sui/coin/functions' // bindings generated with `sui-client-gen`

async function withdraw(client: SuiClient) {
  const vault = VAULTS.suiUSDT
  const walletAddress = '...'

  // withdraw by manually acquiring a `Balance<YT>` object (vault's yield-bearing tokens)
  const tx = new Transaction()
  const ytBalance = '...' // get a `Balance<YT>` object from somewhere

  const tBalance = vault.withdraw(tx, ytBalance, vault.getStrategies())
  const tCoin = coin.fromBalance(tx, vault.T.typeName, tBalance)
  tx.transferObjects([tCoin], walletAddress)

  // alternatively, you can use the `vault.withdrawToWalletYT()` method
  // which will get the `Balance<YT>` object from the wallet and withdraw it
  const amountYT = Amount.fromNum(100, vault.YT.decimals) // 100 YT tokens
  await vault.withdrawToWalletYT(tx, walletAddress, amountYT, vault.getStrategies())

  // there's also a way to withdraw based on the amount of underlying asset (T)
  const amountT = Amount.fromNum(100, vault.T.decimals) // 100 suiUSDT
  await vault.withdrawToWalletT(client, tx, walletAddress, amountT, vault.getStrategies())

  // you can use the `vault.withdrawToWalletAll()` method to withdraw everything from the vault
  await vault.withdrawToWalletAll(client, tx, walletAddress, vault.getStrategies())
}
```

### Info and Stats

```ts
import { VAULTS, getVaultStats, getWalletVaultInfo } from '@kunalabs-io/kai'
import { SuiClient } from '@mysten/sui/client'

async function stats(client: SuiClient) {
  const walletAddress = '...'

  // first we fetch the Vault data
  const vaultData = await VAULTS.suiUSDT.fetch(client)

  // you can get the wallet Vault info by calling `getWalletVaultInfo()`
  const walletInfo = await getWalletVaultInfo(client, walletAddress, vaultData)
  console.log({
    vault: VAULTS.suiUSDT.T.symbol,
    ytBalance: walletInfo.ytBalance.toString(),
    equity: walletInfo.equity.toString(),
  })

  // you can get the global Vault stats by calling `getVaultStats()`
  const stats = getVaultStats(vaultData)
  console.log({
    vault: VAULTS.suiUSDT.T.symbol,
    tvl: stats.tvl.toString(),
    apr: stats.apr,
    apy: stats.apy,
  })
}
```

## LP Positions

### Create Position

```ts
import { Amount, POSITION_CONFIG_INFOS, Price, muldiv, pythPrice } from '@kunalabs-io/kai'
import { Transaction } from '@mysten/sui/transactions'
import { SuiClient } from '@mysten/sui/client'

async function create(client: SuiClient) {
  const walletAddress = '...'

  const configInfo = POSITION_CONFIG_INFOS.find(info => info.name === 'Bluefin suiUSDT/USDC')!
  // or e.g. `ALL_POSITION_CONFIG_INFOS['0x888fcd428659608b1adb45790f65dfbac4352150f67d6312f0c0a5f1f9b04692']`

  const config = await configInfo.fetchConfig(client)

  const pool = await configInfo.fetchPool(client)
  const [pioX, pioY] = await Promise.all([
    configInfo.pioInfoX.fetchPioData(client),
    configInfo.pioInfoY.fetchPioData(client),
  ])

  const [, tickA] = pool.priceToClosestInitializablePrice(
    Price.fromHuman(configInfo.X, configInfo.Y, '1')
  )
  const [, tickB] = pool.priceToClosestInitializablePrice(
    Price.fromHuman(configInfo.X, configInfo.Y, '1.0002')
  )

  // principal deposit amounts
  const UX = Amount.fromNum(100, config.info.X.decimals) // 100 suiUSDT
  const UY = Amount.fromNum(100, config.info.Y.decimals) // 100 USDC

  // we find the max liquidity (max leverage) and then adjust it for slippage
  const maxL = config.findMaxPositionLiquidity({
    tickA,
    tickB,
    UX,
    UY,
    poolPrice: pool.currentPrice(),
    pythPrice: pythPrice(pioX, pioY),
  })
  const slippageBps = 50n // 0.5%
  const l = muldiv(maxL, 10000n - slippageBps, 10000n)

  const tx = new Transaction()
  config.createPositionFromWallet(
    tx,
    {
      tickA,
      tickB,
      liquidity: l,
      UX,
      UY,
    },
    walletAddress
  ) // see also `config.createPosition()`
}
```

### Fetch Positions and Info

```ts
import { Position, getAllWalletPositions } from '@kunalabs-io/kai'
import { SuiClient } from '@mysten/sui/client'

export async function positionInfo(client: SuiClient) {
  // get all positions for a wallet
  const walletAddress = '...'
  const res = await getAllWalletPositions(client, walletAddress)

  // or get an individual position
  const positionId = '...'
  const position = await Position.fetch(client, positionId)

  // print some position info
  const pool = await position.configInfo.fetchPool(client)
  const [supplyPoolX, supplyPoolY] = await Promise.all([
    position.configInfo.supplyPoolXInfo.fetch(client),
    position.configInfo.supplyPoolYInfo.fetch(client),
  ])
  const configData = await position.configInfo.fetchConfig(client)

  const inRange = position.inRange(pool.currentTick())
  const equity = position.calcEquityAmountsHuman({
    poolPrice: pool.currentPrice(),
    supplyPoolX,
    supplyPoolY,
    timestampMs: Date.now(),
  })
  const debt = position.calcDebtAmounts({
    supplyPoolX,
    supplyPoolY,
    timestampMs: Date.now(),
  })
  const lpAmounts = position.calcLpAmounts(pool.currentPrice())
  const marginLevel = position.calcMarginLevel({
    currentPrice: pool.currentPrice(),
    supplyPoolX,
    supplyPoolY,
    timestampMs: Date.now(),
  })
  const liquidationPrices = position.calcLiquidationPrices({
    config: configData,
    supplyPoolX,
    supplyPoolY,
    timestampMs: Date.now(),
  })
  const deleveragePrices = position.calcDeleveragePrices({
    config: configData,
    supplyPoolX,
    supplyPoolY,
    timestampMs: Date.now(),
  })
  const interestRates = position.getInterestRates({
    supplyPoolX,
    supplyPoolY,
    timestampMs: Date.now(),
  })

  console.log({
    positionId: position.id,
    inRange,
    equity,
    debt: {
      x: debt.x.toDecimal(),
      y: debt.y.toDecimal(),
    },
    lpAmounts: {
      x: lpAmounts.x.toDecimal(),
      y: lpAmounts.y.toDecimal(),
    },
    marginLevel: marginLevel.toDP(4).toString(),
    liquidationPrices: {
      low: liquidationPrices[0].toString(),
      high: liquidationPrices[1].toString(),
    },
    deleveragePrices: {
      low: deleveragePrices[0].toString(),
      high: deleveragePrices[1].toString(),
    },
    interestRates: {
      x: interestRates.x.toString(),
      y: interestRates.y.toString(),
    },
  })
}
```

### Withdraw (reduce) and Close (delete)

Withdraws liquidity from the position.

```ts
import { Position, findPositionCapForWalletPosition } from '@kunalabs-io/kai'
import { SuiClient } from '@mysten/sui/client'

export async function withdraw(client: SuiClient) {
  const walletAddress = '...'

  const positionId = '...'
  const position = await Position.fetch(client, positionId)

  // find the position cap manually (alternatively it can be cached and passed in)
  const positionCap = await findPositionCapForWalletPosition(client, position.id, walletAddress)
  if (!positionCap) {
    throw new Error(`PositionCap not found for position ${position.id}`)
  }

  const router = new AfRouterAdapter()
  // or... `new CetusAggregatorAdapter(new CetusAggregatorClient())`

  // The reduction (withdrawal) process consists of withdrawing the LP ammounts, any extra collateral, and
  // repaying the debt based on the reduction factor. All this needs to happen in the same transaction.
  //
  // When the position is fully reduced, it becomes inactive and it's recommended to delete (close) it
  // to claim the storage rebate. In order to delete it, the position must be fully reduced (factor = 1),
  // and all pending collected fees and rewards must be collected. This can be done manually but it's
  // somewhat intricate so `reduceAndMaybeDelete()` does this for you. See the implementation for more details.
  const tx = await position.reduceAndMaybeDelete(
    client,
    router,
    {
      factor: new Decimal(0.5), // reduce the position by 50%
      positionCapId: positionCap.id,
      convertRewardsTo: USDC,
      slippage: 0.01,
    },
    walletAddress
  )
}
```

### Withdraw Pending Rewards

Withdraws pending rewards from the position.

```ts
import {
  AfRouterAdapter,
  CetusAggregatorAdapter,
  Position,
  USDC,
  findPositionCapForWalletPosition,
} from '@kunalabs-io/kai'
import { SuiClient } from '@mysten/sui/client'
import { AggregatorClient as CetusAggregatorClient } from '@cetusprotocol/aggregator-sdk'

async function withdrawRewards(client: SuiClient) {
  const walletAddress = '...'

  const positionId = '...'
  const position = await Position.fetch(client, positionId)

  // find the position cap manually (alternatively it can be cached and passed in)
  const positionCap = await findPositionCapForWalletPosition(client, position.id, walletAddress)
  if (!positionCap) {
    throw new Error(`PositionCap not found for position ${position.id}`)
  }

  const router = new AfRouterAdapter()
  // or... `new CetusAggregatorAdapter(new CetusAggregatorClient())`

  // see `position.withdrawAllRewards()` if you need something more custom
  const tx = await position.withdrawAllRewardsConvertAndTransfer(
    client,
    router,
    {
      positionCapId: positionCap.id,
      convertRewardsTo: USDC,
      slippage: 0.01,
    },
    walletAddress
  )
}
```

### Compound

Compounds the position by collecting all rewards, swapping them to the correct ratio, and depositing them back into the position.

```ts
async function compound(client: SuiClient) {
  const walletAddress = '...'

  const positionId = '...'
  const position = await Position.fetch(client, positionId)

  // find the position cap manually (alternatively it can be cached and passed in)
  const positionCap = await findPositionCapForWalletPosition(client, position.id, walletAddress)
  if (!positionCap) {
    throw new Error(`PositionCap not found for position ${position.id}`)
  }

  const pool = await position.configInfo.fetchPool(client)

  const tx = await position.compound(
    client,
    {
      pool,
      positionCapId: positionCap.id,
      slippage: 0.01,
    },
    walletAddress
  )
}
```
