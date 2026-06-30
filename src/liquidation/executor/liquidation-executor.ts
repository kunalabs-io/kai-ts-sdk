import { Logger } from 'pino'
import { ClientWithCoreApi } from '@mysten/sui/client'
import { Position } from '../../lp/position'
import { PhantomTypeArgument, TypeArgument } from '../../gen/_framework/reified'
import { ProtocolHandler, CetusProtocolHandler, BluefinProtocolHandler } from './handlers'
import { PositionInfo } from '../position-monitor/utils'
import { TransactionExecutor } from './transaction-executor'
import { ExecutionOutcome } from './types'

export interface LiquidationExecutor {
  execute(info: PositionInfo, executor: TransactionExecutor): Promise<ExecutionOutcome | null>
}

export abstract class BaseLiquidationExecutor implements LiquidationExecutor {
  private readonly cetusHandler: CetusProtocolHandler
  private readonly bluefinHandler: BluefinProtocolHandler

  constructor(
    protected readonly client: ClientWithCoreApi,
    protected logger: Logger
  ) {
    this.cetusHandler = new CetusProtocolHandler()
    this.bluefinHandler = new BluefinProtocolHandler()
  }

  protected getProtocolHandler(
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
  ): ProtocolHandler {
    if (position.isCetus()) return this.cetusHandler
    if (position.isBluefin()) return this.bluefinHandler
    throw new Error('Unknown protocol type')
  }

  abstract execute(
    info: PositionInfo,
    executor: TransactionExecutor
  ): Promise<ExecutionOutcome | null>
}
