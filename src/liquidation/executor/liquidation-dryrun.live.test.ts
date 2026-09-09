import { describe, expect, it } from 'vitest'
import pino from 'pino'
import { Transaction } from '@mysten/sui/transactions'
import { ClientWithCoreApi } from '@mysten/sui/client'
import { createSuiClient } from '../../client'
import { OracleService } from '../../oracle'
import { RpcPositionMonitor } from '../position-monitor/rpc-position-monitor'
import { LiqudationBackendClient } from '../client'
import { FlashSwapExecutor } from './flash-swap-executor'
import { TransactionExecutor, ExecutionResult } from './transaction-executor'

// Network-dependent, read-only. Run explicitly:
//   POSITION_ID=0x… RUN_LIVE_TESTS=1 pnpm vitest run src/liquidation/executor/liquidation-dryrun
//
// Dry-runs a real liquidation against mainnet without signing or submitting
// anything: the executor's own `performDryRun` path builds and simulates the
// PTB, and the fake transaction executor below refuses the execute step. Use it
// to check whether a position that the service reports as stuck actually
// liquidates, and to read the resulting balance changes.

/** Liquidation wallet (KMS) — the dry run needs a sender with gas, not a key. */
const SENDER = '0xa43f21fc6770a2207642f2672cf9da09f205a671ff0b0298dd10b8e677836237'

class ExecutionRefused extends Error {
  constructor() {
    super('execution refused: this harness is dry-run only')
  }
}

/**
 * Builds like the real executor (so `performDryRun` exercises the true build +
 * resolve path) and captures a full simulation of the exact bytes, but throws
 * rather than submitting.
 */
class DryRunOnlyExecutor implements TransactionExecutor {
  readonly sender = SENDER
  simulation: unknown = null

  constructor(private readonly client: ClientWithCoreApi) {}

  async buildTransaction(transaction: Transaction): Promise<Uint8Array> {
    transaction.setSenderIfNotSet(this.sender)
    const bytes = await transaction.build({ client: this.client })
    this.simulation = await this.client.core.simulateTransaction({
      transaction: bytes,
      include: { effects: true, events: true, balanceChanges: true },
    })
    return bytes
  }

  async executeTransaction(): Promise<ExecutionResult> {
    throw new ExecutionRefused()
  }
}

describe.runIf(process.env.RUN_LIVE_TESTS)('liquidation dry run (real network)', () => {
  it('builds and simulates a liquidation for POSITION_ID', async () => {
    const positionId = process.env.POSITION_ID
    if (!positionId) throw new Error('POSITION_ID is required')

    const logger = pino({ level: 'debug' })
    const client = createSuiClient({
      urls: [process.env.RPC_URL ?? 'https://fullnode.mainnet.sui.io'],
      timeout: 30_000,
    })

    const oracleService = new OracleService({
      client,
      logger,
      mode: 'onchain',
    })
    await oracleService.start()

    try {
      // The backend client is only used by the poll loop, not by the two calls below.
      const monitor = new RpcPositionMonitor(
        1000,
        logger,
        null as unknown as LiqudationBackendClient,
        client,
        oracleService,
        { includeDeleveragePositions: true }
      )

      const [position] = await monitor.getPositions([positionId])
      const info = await monitor.getPositionInfo(position)
      expect(info, 'position not found').toBeTruthy()

      console.log('MARGIN', {
        positionId,
        marginLevel: info!.marginLevel.toDP(6).toString(),
        liqMargin: info!.config.liqMargin.toDP(6).toString(),
        assetValueUsd: info!.assetValue?.toDP(4).toString() ?? '(unknown)',
      })

      const executor = new FlashSwapExecutor(client, logger, oracleService)
      const dryRunOnly = new DryRunOnlyExecutor(client)

      // Three outcomes: the executor reaches the (refused) execute step, meaning
      // the build resolved and the dry run passed; it returns null because the
      // position doesn't need action; or it throws for real.
      let refused = false
      let outcome: unknown = undefined
      try {
        outcome = await executor.execute(info!, dryRunOnly)
      } catch (err) {
        if (err instanceof ExecutionRefused) refused = true
        else throw err
      }

      if (!refused && outcome === null) {
        console.log('NO ACTION NEEDED — position is above the margin threshold')
        return
      }

      console.log('SIMULATION', JSON.stringify(dryRunOnly.simulation, null, 2))
      expect(refused, 'dry run did not pass — see the error above').toBe(true)
    } finally {
      oracleService.stop()
    }
  }, 120_000)
})
