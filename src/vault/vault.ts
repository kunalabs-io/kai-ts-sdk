import {
  coinWithBalance,
  Transaction,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import {
  calcRebalanceAmounts,
  deposit,
  redeemWithdrawTicket,
  removeStrategy,
  setStrategyTargetAllocWeightsBps,
  setTvlCap,
  totalAvailableBalance,
  withdraw,
  withdrawTAmt,
} from '../gen/kai-single-asset-vault/vault/functions'
import { Amount } from '../amount'
import { normalizeSuiObjectId, SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import { SuiClient } from '@mysten/sui/client'
import { fromBalance, intoBalance } from '../gen/sui/coin/functions'
import { Vault, VaultReified } from '../gen/kai-single-asset-vault/vault/structs'
import { PhantomTypeArgument, ToPhantomTypeArgument } from '../gen/_framework/reified'
import { min } from '../math'
import {
  CoinInfo,
  DEEP,
  SUI,
  suiUSDT,
  USDC,
  USDY,
  whUSDCe,
  whUSDTe,
  yDEEP,
  ySUI,
  paused_ysuiUSDT,
  paused_yUSDC,
  yUSDY,
  yWHUSDCe,
  yWHUSDTe,
  ysuiUSDT,
  yUSDC,
  WAL,
  wBTC,
  LBTC,
  xBTC,
  yWAL,
  yWBTC,
  yLBTC,
  yXBTC,
} from '../coin-info'
import { SUPPLY_POOL_STRATEGY_INFOS } from './kai-leverage-supply-pool-strategy'
import { compressSuiType } from '../gen/_framework/util'

export interface VaultTargetWeightsItem {
  strategyAccessId: string
  weightBps: bigint
}

export interface VaultContrutorArgs<T extends PhantomTypeArgument, YT extends PhantomTypeArgument> {
  /** Coin info for the underlying asset */
  T: CoinInfo<T>
  /** Coin info for the vault's yield-bearing token */
  YT: CoinInfo<YT>
  /** Object ID of the vault */
  id: string
  /** Object ID of the vault's admin capability */
  capId: string
  /** Function to get the current strategies associated with the vault */
  getStrategies: () => WithdrawableStrategy[]
}

/**
 * Interface for a strategy used during withdrawals. The strategy must implement the `withdraw` method
 * that will be called with the `WithdrawTicket` during withdrawal.
 */
export interface WithdrawableStrategy {
  withdraw(tx: Transaction, ticket: TransactionObjectInput): void
}

/**
 * Represents a single asset vault (SAV) on the Kai Leverage protocol.
 */
export class VaultInfo<T extends PhantomTypeArgument, YT extends PhantomTypeArgument> {
  /** Coin info for the underlying asset */
  readonly T: CoinInfo<T>
  /** Coin info for the vault's yield-bearing token */
  readonly YT: CoinInfo<YT>
  /** Object ID of the vault */
  readonly id: string
  /** Object ID of the vault's admin capability */
  readonly capId: string
  /** Function to get the current strategies associated with the vault */
  readonly getStrategies: () => WithdrawableStrategy[]

  readonly reified: VaultReified<T, YT>

  constructor(args: VaultContrutorArgs<T, YT>) {
    this.reified = Vault.reified(args.T.p, args.YT.p)
    this.T = args.T
    this.YT = args.YT

    this.id = args.id
    this.capId = args.capId
    this.getStrategies = args.getStrategies
  }

  removeStrategy(
    tx: Transaction,
    ticket: TransactionObjectInput,
    weights: VaultTargetWeightsItem[],
    vaultCap: TransactionObjectInput
  ) {
    removeStrategy(tx, [this.T.typeName, this.YT.typeName], {
      cap: vaultCap,
      vault: this.id,
      ticket,
      idsForWeights: weights.map(w => w.strategyAccessId),
      weightsBps: weights.map(w => w.weightBps),
      clock: SUI_CLOCK_OBJECT_ID,
    })
  }

  setTargetWeights(
    tx: Transaction,
    weights: VaultTargetWeightsItem[],
    vaultCap?: TransactionObjectInput
  ) {
    if (!vaultCap) {
      vaultCap = this.capId
    }

    setStrategyTargetAllocWeightsBps(tx, [this.T.typeName, this.YT.typeName], {
      cap: vaultCap,
      vault: this.id,
      ids: weights.map(w => w.strategyAccessId),
      weightsBps: weights.map(w => w.weightBps),
    })
  }

  setTvlCap(tx: Transaction, tvlCapAmount: Amount | null, vaultCap?: TransactionObjectInput) {
    if (tvlCapAmount !== null && tvlCapAmount?.decimals !== this.T.decimals) {
      throw new Error('invalid amount: decimals mismatch')
    }

    let tvlCap = null
    if (tvlCapAmount) {
      tvlCap = tvlCapAmount.int
    }

    if (!vaultCap) {
      vaultCap = this.capId
    }

    setTvlCap(tx, [this.T.typeName, this.YT.typeName], {
      cap: vaultCap,
      vault: this.id,
      tvlCap,
    })
  }

  calcRebalanceAmounts(tx: Transaction): TransactionResult {
    return calcRebalanceAmounts(tx, [this.T.typeName, this.YT.typeName], {
      vault: this.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })
  }

  /**
   * Deposits an amount of the underlying asset into the vault and mints yield-bearing tokens.
   * Returns a `Balance<YT>` containing the minted yield-bearing tokens.
   *
   * @param tx - The transaction object.
   * @param balance - The balance of the underlying asset to deposit.
   * @returns A `TransactionResult` containing a `Balance<YT>` of the minted yield-bearing tokens.
   */
  deposit(tx: Transaction, balance: TransactionObjectInput): TransactionResult {
    const lpBalance = deposit(tx, [this.T.typeName, this.YT.typeName], {
      vault: this.id,
      balance,
      clock: SUI_CLOCK_OBJECT_ID,
    })

    return lpBalance
  }

  /**
   * Deposits an amount of the underlying asset from the specified wallet into the vault
   * and mints yield-bearing tokens.
   * The resulting yield-bearing tokens are transferred to the same wallet.
   *
   * @param tx - The Transaction object to add deposit operations to.
   * @param walletAddress - The address of the wallet depositing the underlying asset.
   * @param amount - The amount of the underlying asset to deposit.
   */
  async depositFromWallet(tx: Transaction, walletAddress: string, amount: Amount) {
    if (amount.decimals !== this.T.decimals) {
      throw new Error('invalid amount: decimals mismatch')
    }

    tx.setSenderIfNotSet(walletAddress)
    const coin = coinWithBalance({
      type: this.T.typeName,
      balance: amount.int,
    })
    const balance = intoBalance(tx, this.T.typeName, coin)

    const lpBalance = this.deposit(tx, balance)

    const lpCoin = fromBalance(tx, this.YT.typeName, lpBalance)
    tx.transferObjects([lpCoin], walletAddress)
  }

  /**
   * Redeems the provided yield-bearing tokens (YT) from the vault for the underlying (T).
   *
   * @param tx - The `Transaction` object to add withdraw operations to.
   * @param balance - The balance of yield-bearing tokens (YT) to redeem for underlying assets.
   * @param strategies - Array of all strategies currently registered with the vault.
   * @returns A `TransactionResult` containing a `Balance<T>` of the withdrawn underlying asset tokens.
   */
  withdraw(
    tx: Transaction,
    balance: TransactionObjectInput,
    strategies: WithdrawableStrategy[]
  ): TransactionResult {
    const ticket = withdraw(tx, [this.T.typeName, this.YT.typeName], {
      vault: this.id,
      balance,
      clock: SUI_CLOCK_OBJECT_ID,
    })
    for (const strategy of strategies) {
      strategy.withdraw(tx, ticket)
    }
    const withdrawnBalance = redeemWithdrawTicket(tx, [this.T.typeName, this.YT.typeName], {
      vault: this.id,
      ticket,
    })

    return withdrawnBalance
  }

  /**
   * Withdraws from the vault by specifying the amount of underlying asset (T) to withdraw. The required
   * amount of yield-bearing tokens (YT) will be taken from the provided balance.
   *
   * @param tx - The `Transaction` object to add withdraw operations to.
   * @param tAmt - The amount of the underlying asset to withdraw.
   * @param balance - The balance of yield-bearing tokens (YT) from which the required amount will be taken.
   * @param strategies - Array of all strategies currently registered with the vault.
   * @returns A `TransactionResult` containing a `Balance<T>` of the withdrawn underlying asset tokens.
   */
  withdrawTAmt(
    tx: Transaction,
    tAmt: Amount,
    balance: TransactionObjectInput,
    strategies: WithdrawableStrategy[]
  ) {
    const ticket = withdrawTAmt(tx, [this.T.typeName, this.YT.typeName], {
      vault: this.id,
      tAmt: tAmt.int,
      balance,
      clock: SUI_CLOCK_OBJECT_ID,
    })
    for (const strategy of strategies) {
      strategy.withdraw(tx, ticket)
    }
    const withdrawnBalance = redeemWithdrawTicket(tx, [this.T.typeName, this.YT.typeName], {
      vault: this.id,
      ticket,
    })

    return withdrawnBalance
  }

  /**
   * Redeems the specified amount of the yield-bearing tokens (YT) for the wallet.
   * The resulting `Coin<T>` of the underlying asset will be transferred to the same wallet.
   *
   * @param tx - The `Transaction` object to add withdraw operations to.
   * @param walletAddress - The address of the wallet redeeming the yield-bearing tokens.
   * @param amount - The amount of the yield-bearing tokens to redeem for underlying assets.
   * @param strategies - Array of all strategies currently registered with the vault.
   */
  async withdrawToWalletYT(
    tx: Transaction,
    walletAddress: string,
    amount: Amount,
    strategies: WithdrawableStrategy[]
  ) {
    if (amount.decimals !== this.YT.decimals) {
      throw new Error('invalid amount: decimals mismatch')
    }

    tx.setSenderIfNotSet(walletAddress)
    const coin = coinWithBalance({
      type: this.YT.typeName,
      balance: amount.int,
    })
    const balance = intoBalance(tx, this.YT.typeName, coin)

    const withdrawnBalance = this.withdraw(tx, balance, strategies)

    const withdrawnCoin = fromBalance(tx, this.T.typeName, withdrawnBalance)
    tx.transferObjects([withdrawnCoin], walletAddress)
  }

  /**
   * Withdraws from the vault by specifying the amount of underlying asset (T) to withdraw from the wallet. The required
   * amount of yield-bearing tokens (YT) will be taken from the wallet's balance.
   * The resulting `Coin<T>` of the underlying asset will be transferred to the same wallet.
   *
   * @param client - The Sui client.
   * @param tx - The `Transaction` object to add withdraw operations to.
   * @param walletAddress - The address of the wallet redeeming the yield-bearing tokens.
   * @param amount - The amount of the underlying asset to withdraw.
   * @param strategies - Array of all strategies currently registered with the vault.
   */
  async withdrawToWalletT(
    client: SuiClient,
    tx: Transaction,
    walletAddress: string,
    amount: Amount,
    strategies: WithdrawableStrategy[]
  ) {
    if (amount.decimals !== this.T.decimals) {
      throw new Error('invalid amount: decimals mismatch')
    }

    const [state, addressYtBalance] = await Promise.all([
      this.fetch(client),
      client.getBalance({ owner: walletAddress, coinType: this.YT.typeName }),
    ])
    let totalAvailableBalance = state.freeBalance.value
    for (const strategy of state.strategies.contents) {
      totalAvailableBalance += strategy.value.borrowed
    }
    const ytSupply = state.lpTreasury.totalSupply.value

    const ytAmount = Amount.fromInt(
      min(
        (amount.int * ytSupply) / totalAvailableBalance + 1n,
        BigInt(addressYtBalance.totalBalance)
      ),
      this.YT.decimals
    )

    tx.setSenderIfNotSet(walletAddress)
    const ytCoin = coinWithBalance({
      type: this.YT.typeName,
      balance: ytAmount.int,
    })
    const balance = intoBalance(tx, this.YT.typeName, ytCoin)

    const withdrawnBalance = this.withdrawTAmt(tx, amount, balance, strategies)
    const withdrawnCoin = fromBalance(tx, this.T.typeName, withdrawnBalance)

    const ytCoin2 = fromBalance(tx, this.YT.typeName, balance)
    tx.transferObjects([withdrawnCoin, ytCoin2], walletAddress)
  }

  /**
   * Redeems all the yield-bearing tokens (YT) from the vault for the wallet.
   * The resulting `Coin<T>` of the underlying asset will be transferred to the same wallet.
   *
   * @param client - The Sui client.
   * @param tx - The `Transaction` object to add withdraw operations to.
   * @param walletAddress - The address of the wallet redeeming the yield-bearing tokens.
   * @param strategies - Array of all strategies currently registered with the vault.
   */
  async withdrawToWalletAll(
    client: SuiClient,
    tx: Transaction,
    walletAddress: string,
    strategies: WithdrawableStrategy[]
  ) {
    const ytBalance = await client.getBalance({ owner: walletAddress, coinType: this.YT.typeName })
    await this.withdrawToWalletYT(
      tx,
      walletAddress,
      Amount.fromInt(BigInt(ytBalance.totalBalance), this.YT.decimals),
      strategies
    )
  }

  /**
   * Add a `total_available_balance` call to the transaction.
   *
   * @param tx - The `Transaction` object.
   * @returns A `TransactionResult` containing the result of the `total_available_balance` call.
   */
  totalAvailableBalance(tx: Transaction): TransactionResult {
    return totalAvailableBalance(tx, [this.T.typeName, this.YT.typeName], {
      vault: this.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })
  }

  /**
   * Fetches the current `Vault` data from the chain.
   *
   * @param client - The Sui client.
   * @returns The current `Vault` data.
   */
  async fetch(client: SuiClient): Promise<Vault<T, YT>> {
    return await this.reified.fetch(client, this.id)
  }
}

export type VaultInfoMap = {
  SUI: VaultInfo<ToPhantomTypeArgument<typeof SUI.p>, ToPhantomTypeArgument<typeof ySUI.p>>
  paused_suiUSDT: VaultInfo<
    ToPhantomTypeArgument<typeof suiUSDT.p>,
    ToPhantomTypeArgument<typeof paused_ysuiUSDT.p>
  >
  paused_USDC: VaultInfo<
    ToPhantomTypeArgument<typeof USDC.p>,
    ToPhantomTypeArgument<typeof paused_yUSDC.p>
  >
  wUSDC: VaultInfo<
    ToPhantomTypeArgument<typeof whUSDCe.p>,
    ToPhantomTypeArgument<typeof yWHUSDCe.p>
  >
  wUSDT: VaultInfo<
    ToPhantomTypeArgument<typeof whUSDTe.p>,
    ToPhantomTypeArgument<typeof yWHUSDTe.p>
  >
  USDY: VaultInfo<ToPhantomTypeArgument<typeof USDY.p>, ToPhantomTypeArgument<typeof yUSDY.p>>
  DEEP: VaultInfo<ToPhantomTypeArgument<typeof DEEP.p>, ToPhantomTypeArgument<typeof yDEEP.p>>
  suiUSDT: VaultInfo<
    ToPhantomTypeArgument<typeof suiUSDT.p>,
    ToPhantomTypeArgument<typeof ysuiUSDT.p>
  >
  USDC: VaultInfo<ToPhantomTypeArgument<typeof USDC.p>, ToPhantomTypeArgument<typeof yUSDC.p>>
  WAL: VaultInfo<ToPhantomTypeArgument<typeof WAL.p>, ToPhantomTypeArgument<typeof yWAL.p>>
  wBTC: VaultInfo<ToPhantomTypeArgument<typeof wBTC.p>, ToPhantomTypeArgument<typeof yWBTC.p>>
  LBTC: VaultInfo<ToPhantomTypeArgument<typeof LBTC.p>, ToPhantomTypeArgument<typeof yLBTC.p>>
  xBTC: VaultInfo<ToPhantomTypeArgument<typeof xBTC.p>, ToPhantomTypeArgument<typeof yXBTC.p>>
}

export const VAULTS: VaultInfoMap = {
  SUI: new VaultInfo({
    T: SUI,
    YT: ySUI,
    id: '0x16272b75d880ab944c308d47e91d46b2027f55136ee61b3db99098a926b3973c',
    capId: '0xaed5c591e1f09492e3e1cc53e426f937eb20b70497db9b7861bebfb4e72ada43',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.SUI],
  }),
  paused_suiUSDT: new VaultInfo({
    T: suiUSDT,
    YT: paused_ysuiUSDT,
    id: '0x7a2e56773ad4d9bd4133c67ed0ae60187f00169b584a55c0204175897e41d166',
    capId: '0xa5d2b5a621949750625a9a15eeb809140dd009a8c4c40633a17af464d101c939',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.paused_suiUSDT],
  }),
  paused_USDC: new VaultInfo({
    T: USDC,
    YT: paused_yUSDC,
    id: '0x5663035df5f403ad5a015cc2a3264de30370650bc043c4dab4d0012ea5cb7671',
    capId: '0x00ca521183614612f6e4f4d4ef119da937e8e15d47b74be8ab2621db8f34c016',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.paused_USDC],
  }),
  wUSDC: new VaultInfo({
    T: whUSDCe,
    YT: yWHUSDCe,
    id: '0x7a2f75a3e50fd5f72dfc2f8c9910da5eaa3a1486e4eb1e54a825c09d82214526',
    capId: '0x3e23432773799aedbc9b64155fb8f4d09c292f4565ecf5be48ae0dd494bfaf3d',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.wUSDC],
  }),
  wUSDT: new VaultInfo({
    T: whUSDTe,
    YT: yWHUSDTe,
    id: '0x0fce8baed43faadf6831cd27e5b3a32a11d2a05b3cd1ed36c7c09c5f7bcb4ef4',
    capId: '0x78b79c0b8653a62df6fb494bd6df01a2145f0bdc592115ec086d52497d10f0d6',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.wUSDT],
  }),
  USDY: new VaultInfo({
    T: USDY,
    YT: yUSDY,
    id: '0x02ec915b35fb958ca9a7d94e57d7254513ff711832ba8aebfc0ac3395152260b',
    capId: '0xb6276d1c26ae8f1a8dfa065c2a409796b948586b5f8c88f5249aaab3f462ca2a',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.USDY],
  }),
  DEEP: new VaultInfo({
    T: DEEP,
    YT: yDEEP,
    id: '0x6e58792dccbaa1d1d708d9a847a7c5b3f90c7878d1b76fd79afa48d31063bca6',
    capId: '0x09e7e4bbf7e8142b8f961152bc0dd919dd30743274090d2866097957901291b0',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.DEEP],
  }),
  suiUSDT: new VaultInfo({
    T: suiUSDT,
    YT: ysuiUSDT,
    id: '0xbfcab5f22e253be0768e2cc5e75e170c5266edf7b68c813af0d676e84285681c',
    capId: '0xc6d6095dca076134ccdbe096c3dbbd7fc852734df1ed54323befac642883bdb6',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.suiUSDT],
  }),
  USDC: new VaultInfo({
    T: USDC,
    YT: yUSDC,
    id: '0x3e8a6d1e29d2c86aed50d6055863b878a7dd382de22ea168177c80c1d7150061',
    capId: '0xc9df4eb15095a6ace5d39430dc762e387e8842c907e78ea86445c51d62a0439d',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.USDC],
  }),
  WAL: new VaultInfo({
    T: WAL,
    YT: yWAL,
    id: '0x4ee20ca2594e137a1388d5de03c0b1f3dd7caddefb4c55b1c7bca15d0fe18c86',
    capId: '0xa40fa41f31d9c7e89bf73591ce0d581d0732736c3cef447bbd07a62093d9077f',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.WAL],
  }),
  wBTC: new VaultInfo({
    T: wBTC,
    YT: yWBTC,
    id: '0x5674aae155d38e09edaf3163f2e3f85fe77790f484485f0b480ca55915d7c446',
    capId: '0x28928d9989dcf3dfb48f34d137e92b37fc495e7782fd825bc9a40474366a4653',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.wBTC],
  }),
  LBTC: new VaultInfo({
    T: LBTC,
    YT: yLBTC,
    id: '0x362ce1fc1425ec0bdf958f2023b07cda52c924fa42e4ff88a9a48c595fd8437d',
    capId: '0xbf8745d63ea078a5559325bb7c061625d3917cb5cc361fd6155596063d8741cc',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.LBTC],
  }),
  xBTC: new VaultInfo({
    T: xBTC,
    YT: yXBTC,
    id: '0x653beede5a005272526f0c835c272ef37491dc5bff3f8e466175e02675510137',
    capId: '0xad78fad7f003b536675e3b0668f08949035067eb793f92578e26b14eafd1b68d',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.xBTC],
  }),
}

export function findVaultNameById(id: string): string | undefined {
  const normalizedId = normalizeSuiObjectId(id)
  return Object.entries(VAULTS).find(([, value]) => value.id === normalizedId)?.[0]
}

export function findVaultInfoById(
  id: string
): VaultInfo<PhantomTypeArgument, PhantomTypeArgument> | undefined {
  const normalizedId = normalizeSuiObjectId(id)
  return Object.values(VAULTS).find(v => v.id === normalizedId) as VaultInfo<
    PhantomTypeArgument,
    PhantomTypeArgument
  >
}

export function findVaultInfoByYtCoinType(
  ytCoinType: string
): VaultInfo<PhantomTypeArgument, PhantomTypeArgument> | undefined {
  const normalizedYtCoinType = compressSuiType(ytCoinType)
  return Object.values(VAULTS).find(v => v.YT.typeName === normalizedYtCoinType) as VaultInfo<
    PhantomTypeArgument,
    PhantomTypeArgument
  >
}
