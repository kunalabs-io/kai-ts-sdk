import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { ProtocolHandler } from './protocol-handler'
import { Position } from '../../../lp/position'
import { TypeArgument, PhantomTypeArgument } from '../../../gen/_framework/reified'
import { CETUS_GLOBAL_CONFIG_ID } from '../../../constants'
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils'
import * as cetus from '../../../gen/kai-leverage/cetus/functions'

export class CetusProtocolHandler implements ProtocolHandler {
  deleverageForLiquidation(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput
  ) {
    cetus.deleverageForLiquidation(
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
        cetusPool: position.configInfo.poolObjectId,
        cetusGlobalConfig: CETUS_GLOBAL_CONFIG_ID,
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
    return cetus.calcLiquidateColX(tx, [position.X.typeName, position.Y.typeName], {
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
    return cetus.calcLiquidateColY(tx, [position.X.typeName, position.Y.typeName], {
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
  ): TransactionArgument {
    return cetus.liquidateColX(
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
  ): TransactionArgument {
    return cetus.liquidateColY(
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
