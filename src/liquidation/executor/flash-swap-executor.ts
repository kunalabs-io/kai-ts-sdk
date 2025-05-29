import { BaseLiquidationExecutor } from './liquidation-executor'
import {
  SerialTransactionExecutor,
  Transaction,
  TransactionObjectInput,
} from '@mysten/sui/transactions'
import { Position } from '../../lp/position'
import { PhantomTypeArgument, TypeArgument } from '../../gen/_framework/reified'
import { updatePriceFeeds } from '../pyth'
import * as pyth from '../../gen/kai-leverage/pyth/functions'
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import {
  isDeleverageInfo,
  isLiquidationInfo,
} from '../../gen/kai-leverage/position-core-clmm/structs'
import * as debtInfo from '../../gen/kai-leverage/debt-info/functions'
import { KaiRouterUtil } from '../../router'
import * as balance from '../../gen/sui/balance/functions'
import * as coin from '../../gen/sui/coin/functions'
import * as metrics from '../metrics'
import { Logger } from 'pino'
import { SuiClient } from '@mysten/sui/client'
import { Signer } from '@mysten/sui/cryptography'
import { PositionInfo } from '../position-monitor/utils'

export class FlashSwapExecutor extends BaseLiquidationExecutor {
  readonly PRICE_UPDATE_THRESHOLD_SEC = 30 // seconds

  executor: SerialTransactionExecutor

  constructor(client: SuiClient, signer: Signer, logger: Logger) {
    super(client, signer, logger)
    this.logger = this.logger.child({ task: 'flash_swap_executor' })
    this.executor = new SerialTransactionExecutor({
      client,
      signer,
    })
  }

  async execute(info: PositionInfo): Promise<void> {
    const { position, config, marginLevel, priceFeedUpdateInfo } = info

    const tx = new Transaction()

    const { arrivalTimeStalenessSecX, arrivalTimeStalenessSecY } =
      await this.getPriceStaleness(position)

    if (
      arrivalTimeStalenessSecX > this.PRICE_UPDATE_THRESHOLD_SEC ||
      arrivalTimeStalenessSecY > this.PRICE_UPDATE_THRESHOLD_SEC
    ) {
      updatePriceFeeds(tx, priceFeedUpdateInfo)
    }

    const priceInfo = pyth.create(tx, SUI_CLOCK_OBJECT_ID)

    pyth.add(tx, {
      self: priceInfo,
      info: position.configInfo.pioInfoX.priceInfoObjectId,
    })
    pyth.add(tx, {
      self: priceInfo,
      info: position.configInfo.pioInfoY.priceInfoObjectId,
    })

    if (marginLevel.lt(config.liqMargin)) {
      await this.liquidate(tx, position, priceInfo)
    }
  }

  async getPriceStaleness(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  ): Promise<{
    arrivalTimeStalenessSecX: number
    arrivalTimeStalenessSecY: number
  }> {
    const [pioX, pioY] = await Promise.all([
      position.configInfo.pioInfoX.fetchPioData(this.client),
      position.configInfo.pioInfoY.fetchPioData(this.client),
    ])

    const arrivalTimeX = new Date(Number(pioX.data.priceInfo.arrivalTime) * 1000)
    const arrivalTimeY = new Date(Number(pioY.data.priceInfo.arrivalTime) * 1000)

    const arrivalTimeStalenessSecX = (Date.now() - arrivalTimeX.getTime()) / 1000
    const arrivalTimeStalenessSecY = (Date.now() - arrivalTimeY.getTime()) / 1000

    return {
      arrivalTimeStalenessSecX,
      arrivalTimeStalenessSecY,
    }
  }

  async liquidate(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput
  ): Promise<void> {
    const protocolHandler = this.getProtocolHandler(position)

    this.logger.info(`Attempting to liquidate position`)

    metrics.liquidatePositionAttemptCount.add(1)

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

    // deleverage if necessary
    protocolHandler.deleverageForLiquidation(tx, position, priceInfo)

    // liquidate
    this.addLiquidateColXCalls(tx, position, priceInfo, di, this.signer.toSuiAddress())

    this.addLiquidateColYCalls(tx, position, priceInfo, di, this.signer.toSuiAddress())

    const res = await this.executor.executeTransaction(tx, {
      showEvents: true,
    })

    if (res.data.errors) {
      this.logger.error(
        { txDigest: res.digest, txErrors: res.data.errors },
        'Liquidate transaction failed'
      )
      throw new Error(`Liquidate transaction failed: ${res.data.errors}`)
    }

    const deleverageEvent = res.data.events?.find(e => isDeleverageInfo(e.type))
    const liquidationEvent = res.data.events?.find(e => isLiquidationInfo(e.type))
    if (!deleverageEvent && !liquidationEvent) {
      // Transaction went through but deleverage or liquidation didn't fire.
      this.logger.warn(
        { txDigest: res.digest },
        `Deleverage or liquidation event not found in transaction result`
      )

      throw new Error(`Liquidation event not found in transaction result`)
    }

    this.logger.info({ txDigest: res.digest }, 'Liquidation transaction executed')

    metrics.liquidatePositionSuccessCount.add(1)
  }

  private addLiquidateColXCalls(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    di: TransactionObjectInput,
    rewardRecipient: string
  ) {
    const protocolHandler = this.getProtocolHandler(position)

    // calculate the amount of debt Y that can be repaid
    const [maxRepaymentAmtY] = protocolHandler.calcLiquidateColX(tx, position, priceInfo, di)

    // flash swap X for the needed amount of Y
    const {
      balanceOut: repayYBalance,
      repayAmount: flashRepayXAmt,
      receipt,
    } = KaiRouterUtil.bluefin.flashSwap(tx, {
      coinInInfo: position.X,
      coinOutInfo: position.Y,
      amount: maxRepaymentAmtY,
      byAmountIn: false,
    })

    // repay the debt Y and get reward in X
    const rewardX = protocolHandler.liquidateColX(tx, position, priceInfo, di, repayYBalance)

    // repay the flash swap
    const flashRepayX = balance.split(tx, position.X.typeName, {
      self: rewardX,
      value: flashRepayXAmt,
    })

    KaiRouterUtil.bluefin.repayFlashSwap(tx, flashRepayX, receipt)

    // transfer the remaining reward X to the wallet
    balance.destroyZero(tx, position.Y.typeName, repayYBalance)
    /*
    tx.transferObjects(
      [coin.fromBalance(tx, ta.Y, repayYBalance)],
      adminSigner.toSuiAddress()
    )
    */

    const rewardXCoin = coin.fromBalance(tx, position.X.typeName, rewardX)
    tx.transferObjects([rewardXCoin], rewardRecipient)
  }

  private addLiquidateColYCalls(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    di: TransactionObjectInput,
    rewardRecipient: string
  ) {
    const protocolHandler = this.getProtocolHandler(position)

    // calculate the amount of debt X that can be repaid
    const [maxRepaymentAmtX] = protocolHandler.calcLiquidateColY(tx, position, priceInfo, di)

    // flash swap Y for the needed amount of X
    const {
      balanceOut: repayXBalance,
      repayAmount: flashRepayYAmt,
      receipt,
    } = KaiRouterUtil.bluefin.flashSwap(tx, {
      coinInInfo: position.Y,
      coinOutInfo: position.X,
      amount: maxRepaymentAmtX,
      byAmountIn: false,
    })

    // repay the debt X and get reward in Y
    const rewardY = protocolHandler.liquidateColY(tx, position, priceInfo, di, repayXBalance)

    // repay the flash swap
    const flashRepayY = balance.split(tx, position.Y.typeName, {
      self: rewardY,
      value: flashRepayYAmt,
    })
    KaiRouterUtil.bluefin.repayFlashSwap(tx, flashRepayY, receipt)

    /*
    tx.transferObjects(
      [coin.fromBalance(tx, ta.X, repayXBalance)],
      adminSigner.toSuiAddress()
    )
    */
    balance.destroyZero(tx, position.X.typeName, repayXBalance)

    const rewardYCoin = coin.fromBalance(tx, position.Y.typeName, rewardY)
    tx.transferObjects([rewardYCoin], rewardRecipient)
  }
}
