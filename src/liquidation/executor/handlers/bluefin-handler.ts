import { Position } from '../../../lp/position'
import { PhantomTypeArgument, TypeArgument } from '../../../gen/_framework/reified'
import { BLUEFIN_GLOBAL_CONFIG_ID } from '../../../constants'
import { ProtocolHandler } from './protocol-handler'
import { Transaction, TransactionObjectInput, TransactionResult } from '@mysten/sui/transactions'
import * as bluefin from '../../../gen/kai-leverage/bluefin-spot/functions'
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'

export class BluefinProtocolHandler implements ProtocolHandler {
  deleverageForLiquidation(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput
  ): void {
    bluefin.deleverageForLiquidation(
      tx,
      [
        position.X.typeName,
        position.Y.typeName,
        position.configInfo.supplyPoolXInfo.ST.typeName,
        position.configInfo.supplyPoolYInfo.ST.typeName,
      ],
      {
        position: position.id,
        config: position.configInfo.configId,
        priceInfo,
        supplyPoolX: position.configInfo.supplyPoolXInfo.id,
        supplyPoolY: position.configInfo.supplyPoolYInfo.id,
        bluefinPool: position.configInfo.poolObjectId,
        bluefinGlobalConfig: BLUEFIN_GLOBAL_CONFIG_ID,
        clock: SUI_CLOCK_OBJECT_ID,
      }
    )
  }

  calcLiquidateColX(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    debtInfo: TransactionObjectInput
  ): TransactionResult {
    return bluefin.calcLiquidateColX(tx, [position.X.typeName, position.Y.typeName], {
      position: position.id,
      config: position.configInfo.configId,
      priceInfo,
      debtInfo,
      maxRepaymentAmtY: (1n << 64n) - 1n,
    })
  }

  calcLiquidateColY(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    debtInfo: TransactionObjectInput
  ): TransactionResult {
    return bluefin.calcLiquidateColY(tx, [position.X.typeName, position.Y.typeName], {
      position: position.id,
      config: position.configInfo.configId,
      priceInfo,
      debtInfo,
      maxRepaymentAmtX: (1n << 64n) - 1n,
    })
  }

  liquidateColX(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    debtInfo: TransactionObjectInput,
    repayYBalance: TransactionObjectInput
  ): TransactionResult {
    return bluefin.liquidateColX(
      tx,
      [position.X.typeName, position.Y.typeName, position.configInfo.supplyPoolYInfo.ST.typeName],
      {
        position: position.id,
        config: position.configInfo.configId,
        priceInfo,
        debtInfo,
        repayment: repayYBalance,
        supplyPool: position.configInfo.supplyPoolYInfo.id,
        clock: SUI_CLOCK_OBJECT_ID,
      }
    )
  }

  liquidateColY(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    debtInfo: TransactionObjectInput,
    repayXBalance: TransactionObjectInput
  ): TransactionResult {
    return bluefin.liquidateColY(
      tx,
      [position.X.typeName, position.Y.typeName, position.configInfo.supplyPoolXInfo.ST.typeName],
      {
        position: position.id,
        config: position.configInfo.configId,
        priceInfo,
        debtInfo,
        repayment: repayXBalance,
        supplyPool: position.configInfo.supplyPoolXInfo.id,
        clock: SUI_CLOCK_OBJECT_ID,
      }
    )
  }
}
