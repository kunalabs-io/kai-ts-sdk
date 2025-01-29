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
} from '../gen/kai/vault/functions'
import { Amount } from '../amount'
import { normalizeSuiObjectId, SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import { SuiClient } from '@mysten/sui/client'
import { fromBalance, intoBalance } from '../gen/sui/coin/functions'
import { Vault, VaultReified } from '../gen/kai/vault/structs'
import { PhantomTypeArgument, ToPhantomTypeArgument } from '../gen/_framework/reified'
import { min } from '../math'
import {
  CoinInfo,
  SUI,
  suiUSDT,
  USDC,
  whUSDCe,
  whUSDTe,
  ySUI,
  ysuiUSDT,
  yUSDC,
  yWHUSDCe,
  yWHUSDTe,
} from '../coin-info'
import { SUPPLY_POOL_STRATEGY_INFOS } from './kai-leverage-supply-pool-strategy'

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
  suiUSDT: VaultInfo<
    ToPhantomTypeArgument<typeof suiUSDT.p>,
    ToPhantomTypeArgument<typeof ysuiUSDT.p>
  >
  USDC: VaultInfo<ToPhantomTypeArgument<typeof USDC.p>, ToPhantomTypeArgument<typeof yUSDC.p>>
  wUSDC: VaultInfo<
    ToPhantomTypeArgument<typeof whUSDCe.p>,
    ToPhantomTypeArgument<typeof yWHUSDCe.p>
  >
  wUSDT: VaultInfo<
    ToPhantomTypeArgument<typeof whUSDTe.p>,
    ToPhantomTypeArgument<typeof yWHUSDTe.p>
  >
}

export const VAULTS: VaultInfoMap = {
  SUI: new VaultInfo({
    T: SUI,
    YT: ySUI,
    id: '0x16272b75d880ab944c308d47e91d46b2027f55136ee61b3db99098a926b3973c',
    capId: '0xaed5c591e1f09492e3e1cc53e426f937eb20b70497db9b7861bebfb4e72ada43',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.SUI],
  }),
  suiUSDT: new VaultInfo({
    T: suiUSDT,
    YT: ysuiUSDT,
    id: '0x7a2e56773ad4d9bd4133c67ed0ae60187f00169b584a55c0204175897e41d166',
    capId: '0xa5d2b5a621949750625a9a15eeb809140dd009a8c4c40633a17af464d101c939',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.suiUSDT],
  }),
  USDC: new VaultInfo({
    T: USDC,
    YT: yUSDC,
    id: '0x5663035df5f403ad5a015cc2a3264de30370650bc043c4dab4d0012ea5cb7671',
    capId: '0x00ca521183614612f6e4f4d4ef119da937e8e15d47b74be8ab2621db8f34c016',
    getStrategies: () => [SUPPLY_POOL_STRATEGY_INFOS.USDC],
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
}

export function findVaultInfoById(id: string): VaultInfo<PhantomTypeArgument, PhantomTypeArgument> {
  const normalizedId = normalizeSuiObjectId(id)
  return Object.values(VAULTS).find(v => v.id === normalizedId) as VaultInfo<
    PhantomTypeArgument,
    PhantomTypeArgument
  >
}
