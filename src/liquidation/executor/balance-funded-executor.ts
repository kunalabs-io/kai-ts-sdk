import { BaseLiquidationExecutor } from './liquidation-executor'
import { Transaction, TransactionObjectInput, coinWithBalance } from '@mysten/sui/transactions'
import { TransactionExecutor } from './transaction-executor'
import { ExecutionOutcome } from './types'
import { DustCapExceededError, InsufficientFundingError } from './errors'
import { Position } from '../../lp/position'
import { SupplyPool } from '../../lp/supply-pool'
import { PhantomTypeArgument, TypeArgument } from '../../gen/_framework/reified'
import { updatePriceFeeds } from '../pyth'
import { buildPriceCollection } from '../../pyth'
import { SUI_CLOCK_OBJECT_ID, SUI_TYPE_ARG, normalizeStructTag } from '@mysten/sui/utils'
import {
  isDeleverageInfo,
  isLiquidationInfo,
} from '../../gen/kai-leverage/position-core-clmm/structs'
import * as debtInfo from '../../gen/kai-leverage/debt-info/functions'
import * as coin from '../../gen/sui/coin/functions'
import * as balance from '../../gen/sui/balance/functions'
import { Logger } from 'pino'
import Decimal from 'decimal.js'
import { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import { PositionInfo } from '../position-monitor/utils'
import { OracleService } from '../../oracle'
import { Amount } from '../../amount'
import { CoinInfo } from '../../coin-info'

// Hard caps for the dust sweep — deliberately constants, not config, so a bug
// upstream (poisoned skip set, price glitch) stays bounded. The per-position
// ceiling is 5× the monitor's minAssetValue skip threshold ($0.01).
export const DUST_POSITION_MAX_REPAY_USD: Decimal = new Decimal('0.05')
/** Per-run repayment spend cap across a whole sweep pass. */
export const DUST_RUN_MAX_REPAY_USD: Decimal = new Decimal('1')
/** Per-run gas cap. */
export const DUST_RUN_MAX_GAS_SUI: Decimal = new Decimal('1')

/** The contract's max price age (`OraclePriceConfig.max_age_secs`). */
const CONTRACT_MAX_PRICE_AGE_SEC = 60
/** Safety margin so a tx isn't built against a feed about to cross max age. */
const STALENESS_BUFFER_SEC = 10

/**
 * Debt plus a small buffer (0.2% + 1 unit) for interest accrued between the
 * off-chain calculation and execution; the contract consumes only the actual
 * debt and the remainder returns to the wallet in the same transaction.
 */
export function bufferedRepayAmount(debtAmount: bigint): bigint {
  if (debtAmount === 0n) return 0n
  return debtAmount + debtAmount / 500n + 1n
}

export interface BalanceChangeCapParams {
  sender: string
  /** The coins the transaction may legitimately pay out (the position's X and Y). */
  allowedOutflows: {
    coinInfo: CoinInfo<PhantomTypeArgument>
    priceUsd: Decimal
  }[]
  /** Gas estimate from the dry run (computation + storage, pre-rebate upper bound). */
  computationCost: bigint
  storageCost: bigint
  /** Max total USD value of non-gas outflows. */
  maxRepayUsd: Decimal
  /** Max gas in SUI. */
  maxGasSui: Decimal
  /**
   * Allowed non-gas SUI outflow when SUI is not a position coin (Pyth update
   * fees are paid in SUI). Default 0.01 SUI.
   */
  nonGasSuiAllowanceMist?: bigint
}

export interface BalanceChangeCapResult {
  outflowUsd: Decimal
  gasCostMist: bigint
  violations: string[]
}

/**
 * Values the sender's simulated outflows independently of the code that built
 * the transaction. Balance changes are net per coin type, so a reward inflow
 * in the same coin partially offsets a repayment outflow — the gate bounds
 * catastrophic outflow, which is its purpose.
 */
export function checkBalanceChangeCaps(
  changes: SuiClientTypes.BalanceChange[],
  params: BalanceChangeCapParams
): BalanceChangeCapResult {
  const violations: string[] = []
  const gasCostMist = params.computationCost + params.storageCost
  const nonGasSuiAllowance = params.nonGasSuiAllowanceMist ?? 10_000_000n

  const gasSui = new Decimal(gasCostMist.toString()).div(1e9)
  if (gasSui.gt(params.maxGasSui)) {
    violations.push(`gas ${gasSui.toString()} SUI exceeds cap ${params.maxGasSui.toString()} SUI`)
  }

  const suiType = normalizeStructTag(SUI_TYPE_ARG)
  const allowed = params.allowedOutflows.map(a => ({
    typeName: normalizeStructTag(a.coinInfo.typeName),
    decimals: a.coinInfo.decimals,
    priceUsd: a.priceUsd,
  }))

  let outflowUsd = new Decimal(0)

  for (const change of changes) {
    if (change.address !== params.sender) continue
    const amount = BigInt(change.amount)
    if (amount >= 0n) continue

    let outflow = -amount
    const coinType = normalizeStructTag(change.coinType)

    if (coinType === suiType) {
      // SUI outflow includes the gas fee; only the excess is a payment.
      outflow = outflow > gasCostMist ? outflow - gasCostMist : 0n
      if (outflow === 0n) continue
    }

    const allowedCoin = allowed.find(a => a.typeName === coinType)
    if (allowedCoin) {
      outflowUsd = outflowUsd.add(
        Amount.fromInt(outflow, allowedCoin.decimals).toDecimal().mul(allowedCoin.priceUsd)
      )
    } else if (coinType === suiType) {
      if (outflow > nonGasSuiAllowance) {
        violations.push(
          `non-gas SUI outflow ${outflow} MIST exceeds allowance ${nonGasSuiAllowance} MIST`
        )
      }
    } else {
      violations.push(`unexpected outflow of ${change.coinType}: ${outflow}`)
    }
  }

  if (outflowUsd.gt(params.maxRepayUsd)) {
    violations.push(
      `outflow $${outflowUsd.toString()} exceeds cap $${params.maxRepayUsd.toString()}`
    )
  }

  return { outflowUsd, gasCostMist, violations }
}

export interface BalanceFundedExecutorOptions {
  maxPositionRepayUsd?: Decimal.Value
  maxGasSui?: Decimal.Value
  nonGasSuiAllowanceMist?: bigint
}

export interface BalanceFundedLiquidateParams {
  tx: Transaction
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  supplyPoolX: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  supplyPoolY: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  priceInfo: TransactionObjectInput
  xPriceUsd: Decimal
  yPriceUsd: Decimal
  executor: TransactionExecutor
  /** When true, stop after the gated dry run without signing or executing. */
  dryRunOnly?: boolean
  /** Called once the signing gate passes, with the simulated spend — lets the sweep account run-level caps. */
  onGateResult?: (result: { outflowUsd: Decimal; gasCostMist: bigint }) => void
  logger?: Logger
}

export interface LiquidatePositionParams {
  position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  supplyPoolX: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  supplyPoolY: SupplyPool<PhantomTypeArgument, PhantomTypeArgument>
  executor: TransactionExecutor
  dryRunOnly?: boolean
  onGateResult?: (result: { outflowUsd: Decimal; gasCostMist: bigint }) => void
  logger?: Logger
}

/**
 * Liquidates dust positions by repaying their debt IN FULL from the wallet's
 * own funds (coin objects + address balance) instead of a flash swap, which
 * breaks mechanically on sub-cent amounts. Each close is a small net loss by
 * design (see plans/liquidation-dust-sweep.md). Full repayment is required:
 * partial dust repayments are the KAI-CF-001 drain vector and get rejected
 * by the fixed contract. The dry run is a mandatory signing gate — simulated
 * balance changes are checked against hard caps before anything is signed.
 */
export class BalanceFundedExecutor extends BaseLiquidationExecutor {
  /** Required by execute(); liquidate() callers supply prices and price info themselves. */
  protected readonly oracleService: OracleService | undefined
  readonly maxPositionRepayUsd: Decimal
  readonly maxGasSui: Decimal
  readonly nonGasSuiAllowanceMist: bigint | undefined

  constructor(
    client: ClientWithCoreApi,
    logger: Logger,
    oracleService?: OracleService,
    options?: BalanceFundedExecutorOptions
  ) {
    super(client, logger)
    this.logger = this.logger.child({ task: 'balance_funded_executor' })
    this.oracleService = oracleService
    this.maxPositionRepayUsd = new Decimal(
      options?.maxPositionRepayUsd ?? DUST_POSITION_MAX_REPAY_USD
    )
    this.maxGasSui = new Decimal(options?.maxGasSui ?? DUST_RUN_MAX_GAS_SUI)
    this.nonGasSuiAllowanceMist = options?.nonGasSuiAllowanceMist
  }

  async execute(
    info: PositionInfo,
    executor: TransactionExecutor
  ): Promise<ExecutionOutcome | null> {
    const { position, supplyPoolX, supplyPoolY } = info
    return this.liquidatePosition({ position, supplyPoolX, supplyPoolY, executor })
  }

  /**
   * Full oracle-driven flow for one position: fetch prices and Pyth update
   * data, build the price info, run the gated liquidation. Requires the
   * executor to be constructed with an OracleService.
   */
  async liquidatePosition(params: LiquidatePositionParams): Promise<ExecutionOutcome | null> {
    const { position, supplyPoolX, supplyPoolY, executor } = params
    const logger = params.logger ?? this.logger.child({ positionId: position.id })

    if (!this.oracleService) {
      throw new Error(
        'liquidatePosition() requires an OracleService; use liquidate() directly without one'
      )
    }
    const xPriceUsd = this.oracleService.getAssetPriceUsd(position.X)
    const yPriceUsd = this.oracleService.getAssetPriceUsd(position.Y)

    const tx = new Transaction()
    if (this.oracleService.supportsPriceUpdates) {
      // With a Hermes connection, always include the update — costs little
      // and guarantees the feeds pass the contract's max-age check.
      const pythUpdateData = await this.oracleService.getPriceFeedUpdateInfo([
        position.configInfo.pioInfoX,
        position.configInfo.pioInfoY,
      ])
      updatePriceFeeds(tx, pythUpdateData)
    } else {
      // No Hermes to refresh with — rely on the sponsored pusher. If a feed
      // is close to the contract's max age, skip; the sweep retries on the
      // next cron run.
      const onChainData = await this.oracleService.fetchFreshOnChainPrices(position.configInfo)
      const stalenessSec = Math.max(onChainData.stalenessXSec, onChainData.stalenessYSec)
      if (stalenessSec > CONTRACT_MAX_PRICE_AGE_SEC - STALENESS_BUFFER_SEC) {
        logger.warn(
          {
            stalenessX: onChainData.stalenessXSec,
            stalenessY: onChainData.stalenessYSec,
          },
          'On-chain price feeds are stale and no Hermes connection to refresh them, skipping'
        )
        return null
      }
    }

    const priceInfo = buildPriceCollection(tx, [
      position.configInfo.pioInfoX,
      position.configInfo.pioInfoY,
    ])

    return this.liquidate({
      tx,
      position,
      supplyPoolX,
      supplyPoolY,
      priceInfo,
      xPriceUsd,
      yPriceUsd,
      executor,
      dryRunOnly: params.dryRunOnly,
      onGateResult: params.onGateResult,
      logger,
    })
  }

  async liquidate(params: BalanceFundedLiquidateParams): Promise<ExecutionOutcome | null> {
    const { tx, position, supplyPoolX, supplyPoolY, priceInfo, xPriceUsd, yPriceUsd, executor } =
      params
    const logger = params.logger ?? this.logger.child({ positionId: position.id })
    const protocolHandler = this.getProtocolHandler(position)
    const sender = executor.sender

    // Re-derived from fresh state, never trusted from the caller's discovery.
    const debtAmounts = position.calcDebtAmounts({
      supplyPoolX,
      supplyPoolY,
      timestampMs: Date.now(),
    })
    const debtUsd = debtAmounts.x
      .toDecimal()
      .mul(xPriceUsd)
      .add(debtAmounts.y.toDecimal().mul(yPriceUsd))

    if (debtUsd.gt(this.maxPositionRepayUsd)) {
      throw new DustCapExceededError(
        `Position debt $${debtUsd.toString()} exceeds the dust ceiling $${this.maxPositionRepayUsd.toString()}`
      )
    }

    if (debtAmounts.x.int === 0n && debtAmounts.y.int === 0n) {
      logger.info('Position has no debt to repay, skipping')
      return null
    }

    const repayX = bufferedRepayAmount(debtAmounts.x.int)
    const repayY = bufferedRepayAmount(debtAmounts.y.int)

    await this.assertFunding(sender, position.Y, repayY, logger)
    await this.assertFunding(sender, position.X, repayX, logger)

    tx.setSenderIfNotSet(sender)

    logger.info(
      {
        debtX: debtAmounts.x.int.toString(),
        debtY: debtAmounts.y.int.toString(),
        debtUsd: debtUsd.toString(),
      },
      'Attempting balance-funded dust liquidation (full repayment)'
    )

    const di = debtInfo.empty(tx, position.configInfo.lendFacilCap)
    debtInfo.addFromSupplyPool(
      tx,
      [position.X.typeName, position.configInfo.supplyPoolXInfo.ST.typeName],
      {
        self: di,
        pool: position.configInfo.supplyPoolXInfo.id,
        clock: SUI_CLOCK_OBJECT_ID,
      }
    )
    debtInfo.addFromSupplyPool(
      tx,
      [position.Y.typeName, position.configInfo.supplyPoolYInfo.ST.typeName],
      {
        self: di,
        pool: position.configInfo.supplyPoolYInfo.id,
        clock: SUI_CLOCK_OBJECT_ID,
      }
    )

    protocolHandler.deleverageForLiquidation(tx, position, priceInfo)

    // Repay Y debt, collect X collateral reward. Reward and unconsumed change
    // go back to the sender's address balance rather than as new coin objects.
    if (debtAmounts.y.int > 0n) {
      const fundingY = tx.add(coinWithBalance({ type: position.Y.typeName, balance: repayY }))
      const repayYBalance = coin.intoBalance(tx, position.Y.typeName, fundingY)
      const rewardX = protocolHandler.liquidateColX(tx, position, priceInfo, di, repayYBalance)
      balance.sendFunds(tx, position.X.typeName, { balance: rewardX, recipient: sender })
      balance.sendFunds(tx, position.Y.typeName, { balance: repayYBalance, recipient: sender })
    }

    // Repay X debt, collect Y collateral reward.
    if (debtAmounts.x.int > 0n) {
      const fundingX = tx.add(coinWithBalance({ type: position.X.typeName, balance: repayX }))
      const repayXBalance = coin.intoBalance(tx, position.X.typeName, fundingX)
      const rewardY = protocolHandler.liquidateColY(tx, position, priceInfo, di, repayXBalance)
      balance.sendFunds(tx, position.Y.typeName, { balance: rewardY, recipient: sender })
      balance.sendFunds(tx, position.X.typeName, { balance: repayXBalance, recipient: sender })
    }

    // The dry run is mandatory: its balance changes — the actual outflows as
    // the chain would execute them — decide whether this transaction is signed.
    const dryRunResult = await this.performDryRun(tx, executor, logger, {
      strict: true,
      gasBudget: BigInt(this.maxGasSui.mul(1e9).toFixed(0)),
    })
    if (dryRunResult.balanceChanges === null) {
      throw new DustCapExceededError('Dry run returned no balance changes; refusing to sign')
    }

    const capCheck = checkBalanceChangeCaps(dryRunResult.balanceChanges, {
      sender,
      allowedOutflows: [
        { coinInfo: position.X, priceUsd: xPriceUsd },
        { coinInfo: position.Y, priceUsd: yPriceUsd },
      ],
      computationCost: dryRunResult.computationCost ?? 0n,
      storageCost: dryRunResult.storageCost ?? 0n,
      maxRepayUsd: this.maxPositionRepayUsd,
      maxGasSui: this.maxGasSui,
      nonGasSuiAllowanceMist: this.nonGasSuiAllowanceMist,
    })
    if (capCheck.violations.length > 0) {
      logger.warn({ violations: capCheck.violations }, 'Cap check failed, refusing to sign')
      throw new DustCapExceededError(
        `Simulated outflows exceed dust caps: ${capCheck.violations.join('; ')}`,
        capCheck.violations
      )
    }
    params.onGateResult?.({ outflowUsd: capCheck.outflowUsd, gasCostMist: capCheck.gasCostMist })

    if (dryRunResult.events !== null) {
      const hasActionEvents = dryRunResult.events.some(
        e => isLiquidationInfo(e.eventType) || isDeleverageInfo(e.eventType)
      )
      if (!hasActionEvents) {
        logger.info('Dry run shows no action events, skipping execution')
        return null
      }
    }

    if (params.dryRunOnly) {
      logger.info(
        {
          outflowUsd: capCheck.outflowUsd.toString(),
          gasCostMist: capCheck.gasCostMist.toString(),
        },
        'Dry run only: caps passed, transaction NOT executed'
      )
      return null
    }

    this.applyGasEstimate(tx, dryRunResult)

    const res = await executor.executeTransaction(tx, { events: true })
    this.assertExecutionSuccess(res, 'Dust liquidation')

    const events = res.data.events ?? []
    const liquidated = events.some(e => isLiquidationInfo(e.eventType))
    const deleveraged = events.some(e => isDeleverageInfo(e.eventType))

    if (liquidated || deleveraged) {
      logger.info(
        {
          txDigest: res.digest,
          liquidated,
          deleveraged,
          outflowUsd: capCheck.outflowUsd.toString(),
        },
        'Dust position processed'
      )
    } else {
      logger.info(
        { txDigest: res.digest },
        'Transaction succeeded but no action occurred - position no longer liquidatable'
      )
    }

    return { txDigest: res.digest, liquidated, deleveraged }
  }

  /**
   * `getBalance` totals owned coin objects and the address balance, matching
   * what the coinWithBalance intent can pull. SUI repayments also need gas
   * headroom from the same funds.
   */
  protected async assertFunding(
    sender: string,
    coinInfo: CoinInfo<PhantomTypeArgument>,
    requiredAmount: bigint,
    logger: Logger
  ): Promise<void> {
    if (requiredAmount === 0n) return

    const { balance } = await this.client.core.getBalance({
      owner: sender,
      coinType: coinInfo.typeName,
    })
    const available = BigInt(balance.balance)

    const isSui = normalizeStructTag(coinInfo.typeName) === normalizeStructTag(SUI_TYPE_ARG)
    const gasReserve = isSui ? BigInt(this.maxGasSui.mul(1e9).toFixed(0)) : 0n
    const required = requiredAmount + gasReserve

    if (available < required) {
      logger.warn(
        {
          coinType: coinInfo.typeName,
          required: required.toString(),
          available: available.toString(),
        },
        'Insufficient wallet funds for repayment'
      )
      throw new InsufficientFundingError(
        `Insufficient ${coinInfo.typeName} to fund repayment: need ${required}, have ${available}`,
        coinInfo.typeName
      )
    }
  }
}
