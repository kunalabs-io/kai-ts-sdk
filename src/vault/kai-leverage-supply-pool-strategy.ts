import { Transaction, TransactionResult } from '@mysten/sui/transactions'
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import { VaultInfo } from './vault'
import * as klStrat from '../gen/kai/kai-leverage-supply-pool/functions'
import { PhantomTypeArgument } from '../gen/_framework/reified'
import { TransactionObjectInput } from '@mysten/sui/transactions'
import { SupplyPoolInfo, SUPPLY_POOL_INFOS } from '../lp/supply-pool'
import { CoinInfo } from '../coin-info'
import { VAULTS } from './vault'

export interface KaiLeverageSupplyPoolStrategyConstructorArgs<
  T extends PhantomTypeArgument,
  ST extends PhantomTypeArgument,
  YT extends PhantomTypeArgument,
> {
  /** Display name of the strategy */
  name: string
  /** Strategy on-chain object ID */
  id: string
  /** The vault this strategy is associated with */
  vault: VaultInfo<T, YT>
  /** Object ID of the admin capability */
  adminCapId: string
  /** The supply pool this strategy interacts with */
  supplyPoolInfo: SupplyPoolInfo<T, ST>
  /** Object ID of the supply pool deposit/withdraw access policy */
  policyId: string
  /** Rule ID of the supply pool deposit/withdraw rule within the policy */
  ruleId: string
}

/**
 * Represents a strategy for interacting with a supply pool on the Kai Leverage protocol.
 */
export class KaiLeverageSupplyPoolStrategyInfo<
  T extends PhantomTypeArgument,
  ST extends PhantomTypeArgument,
  YT extends PhantomTypeArgument,
> {
  readonly name: string
  readonly id: string
  readonly vault: VaultInfo<T, YT>
  readonly adminCapId: string
  readonly supplyPoolInfo: SupplyPoolInfo<T, ST>
  readonly policyId: string
  readonly ruleId: string

  readonly T: CoinInfo<T>
  readonly ST: CoinInfo<ST>
  readonly YT: CoinInfo<YT>

  constructor(args: KaiLeverageSupplyPoolStrategyConstructorArgs<T, ST, YT>) {
    this.name = args.name
    this.id = args.id
    this.vault = args.vault
    this.adminCapId = args.adminCapId
    this.supplyPoolInfo = args.supplyPoolInfo
    this.policyId = args.policyId
    this.ruleId = args.ruleId

    this.T = args.supplyPoolInfo.T
    this.ST = args.supplyPoolInfo.ST
    this.YT = args.vault.YT
  }

  withdraw(tx: Transaction, ticket: TransactionObjectInput): TransactionResult {
    const ta = [this.T.typeName, this.ST.typeName, this.YT.typeName] as [string, string, string]
    return klStrat.withdraw(tx, ta, {
      strategy: this.id,
      ticket,
      supplyPool: this.supplyPoolInfo.id,
      clock: SUI_CLOCK_OBJECT_ID,
    })
  }
}

export const SUPPLY_POOL_STRATEGY_INFOS = {
  USDC: new KaiLeverageSupplyPoolStrategyInfo({
    name: 'Kai Leverage USDC Supply Pool Strategy',
    id: '0x5ac0bf02e51822853e18687745c56c3aa69c328e6a7a6b421e1db1c22ee0e854',
    vault: VAULTS.USDC,
    adminCapId: '0xdf6041af4a5b49b6ca89ad713a57e5bdac062943a5c60aecc2ebb0eb238f0dfa',
    supplyPoolInfo: SUPPLY_POOL_INFOS.USDC,
    policyId: '0x1cd2ba942cab8395becee55ae4f21937d229956b8babdb1586a1f9d2098c35e9',
    ruleId: '0xfad5b9e478587bef702480d6e8144cee832c6f23d0d9f5fcfd0d62b71a22dcd2',
  }),
  SUI: new KaiLeverageSupplyPoolStrategyInfo({
    name: 'Kai Leverage SUI Supply Pool Strategy',
    id: '0x81f7d0132e9fd3da7df4cea8d5e75f1792d700c75dfb8602d6ca747db2d2cfee',
    vault: VAULTS.SUI,
    adminCapId: '0x5d785fab36a4185aba09cc59004bca41ef72a38ae82482192525985c3c8d63e5',
    supplyPoolInfo: SUPPLY_POOL_INFOS.SUI,
    policyId: '0x1cd2ba942cab8395becee55ae4f21937d229956b8babdb1586a1f9d2098c35e9',
    ruleId: '0xfad5b9e478587bef702480d6e8144cee832c6f23d0d9f5fcfd0d62b71a22dcd2',
  }),
  wUSDT: new KaiLeverageSupplyPoolStrategyInfo({
    name: 'Kai Leverage whUSDT.e Supply Pool Strategy',
    id: '0xdddbc52c1b138c9952f1bcca40047f6439c86092ce245b5287d8beecd229b130',
    vault: VAULTS.wUSDT,
    adminCapId: '0x0d3cf25db90c3a2ca5e0c421ebbf393c100165d49dee66fbe96a051cab53e942',
    supplyPoolInfo: SUPPLY_POOL_INFOS.wUSDT,
    policyId: '0x1cd2ba942cab8395becee55ae4f21937d229956b8babdb1586a1f9d2098c35e9',
    ruleId: '0xfad5b9e478587bef702480d6e8144cee832c6f23d0d9f5fcfd0d62b71a22dcd2',
  }),
  wUSDC: new KaiLeverageSupplyPoolStrategyInfo({
    name: 'Kai Leverage whUSDC.e Supply Pool Strategy',
    id: '0x45947dd6ab43090b4506a9d972ccb7f4ee58e32bf6021b5e09411ce132c5dd8b',
    vault: VAULTS.wUSDC,
    adminCapId: '0xb5aba5c9f7a3121c6edfc5deb1df7829e6fc1ab049d7c0054283971c4ba31d1c',
    supplyPoolInfo: SUPPLY_POOL_INFOS.wUSDC,
    policyId: '0x1cd2ba942cab8395becee55ae4f21937d229956b8babdb1586a1f9d2098c35e9',
    ruleId: '0xfad5b9e478587bef702480d6e8144cee832c6f23d0d9f5fcfd0d62b71a22dcd2',
  }),
  suiUSDT: new KaiLeverageSupplyPoolStrategyInfo({
    name: 'Kai Leverage suiUSDT Supply Pool Strategy',
    id: '0x092c8822985c26b96cfefa05cb6bbf061cce42f139d9518042ecd55adaa4ce53',
    vault: VAULTS.suiUSDT,
    adminCapId: '0xfc266e9294dc98c0a3392a93c523bbb10e6a96e972d84df2c04b11e94dc02043',
    supplyPoolInfo: SUPPLY_POOL_INFOS.suiUSDT,
    policyId: '0x1cd2ba942cab8395becee55ae4f21937d229956b8babdb1586a1f9d2098c35e9',
    ruleId: '0xfad5b9e478587bef702480d6e8144cee832c6f23d0d9f5fcfd0d62b71a22dcd2',
  }),
  USDY: new KaiLeverageSupplyPoolStrategyInfo({
    name: 'Kai Leverage USDY Supply Pool Strategy',
    id: '0xd94386e274c96415197ecbaea101109af91a0e29405afa57940fd6d7455f9fa6',
    vault: VAULTS.USDY,
    adminCapId: '0x921363a7695577390f79fd86c24209cb49bea5bdc422797f0d6b02ee1bd26508',
    supplyPoolInfo: SUPPLY_POOL_INFOS.USDY,
    policyId: '0x1cd2ba942cab8395becee55ae4f21937d229956b8babdb1586a1f9d2098c35e9',
    ruleId: '0xfad5b9e478587bef702480d6e8144cee832c6f23d0d9f5fcfd0d62b71a22dcd2',
  }),
}
