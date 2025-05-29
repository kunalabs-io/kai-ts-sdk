import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
  TransactionResult,
} from '@mysten/sui/transactions'
import { Position } from '../../../lp/position'
import { PhantomTypeArgument, TypeArgument } from '../../../gen/_framework/reified'

export interface ProtocolHandler {
  deleverageForLiquidation(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput
  ): void

  calcLiquidateColX(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    debtInfo: TransactionObjectInput
  ): TransactionResult

  liquidateColX(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    debtInfo: TransactionObjectInput,
    repayYBalance: TransactionObjectInput
  ): TransactionArgument

  calcLiquidateColY(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    debtInfo: TransactionObjectInput
  ): TransactionResult

  liquidateColY(
    tx: Transaction,
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>,
    priceInfo: TransactionObjectInput,
    debtInfo: TransactionObjectInput,
    repayXBalance: TransactionObjectInput
  ): TransactionArgument
}
