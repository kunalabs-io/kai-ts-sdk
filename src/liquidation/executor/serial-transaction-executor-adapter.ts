import { SerialTransactionExecutor, Transaction } from '@mysten/sui/transactions'
import { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import { Signer } from '@mysten/sui/cryptography'
import { toBase64 } from '@mysten/sui/utils'
import { TransactionExecutor, ExecutionResult } from './transaction-executor'

export interface SerialTransactionExecutorAdapterParams {
  client: ClientWithCoreApi
  signer: Signer
  defaultGasBudget?: bigint
}

/**
 * Adapter that wraps Mysten's SerialTransactionExecutor.
 *
 * The underlying SerialTransactionExecutor handles queueing internally,
 * so even if multiple executeTransaction() calls are made in parallel,
 * they will be serialized by the underlying executor.
 */
export class SerialTransactionExecutorAdapter implements TransactionExecutor {
  private readonly executor: SerialTransactionExecutor
  private readonly signer: Signer

  constructor(params: SerialTransactionExecutorAdapterParams) {
    this.executor = new SerialTransactionExecutor(params)
    this.signer = params.signer
  }

  get sender(): string {
    return this.signer.toSuiAddress()
  }

  async executeTransaction(
    transaction: Transaction | Uint8Array,
    _options?: SuiClientTypes.TransactionInclude,
    additionalSignatures?: string[]
  ): Promise<ExecutionResult> {
    // The underlying v2 executor forwards the include mask to core.executeTransaction,
    // so requesting effects+events populates them directly — no JSON-RPC re-fetch needed.
    const res = await this.executor.executeTransaction(
      transaction,
      { effects: true, events: true },
      additionalSignatures
    )
    const tx = res.Transaction ?? res.FailedTransaction
    const effectsBytes = tx.effects?.bcs ?? new Uint8Array()

    return {
      digest: tx.digest,
      effects: toBase64(effectsBytes),
      data: tx,
    }
  }

  async buildTransaction(transaction: Transaction): Promise<Uint8Array> {
    return this.executor.buildTransaction(transaction)
  }

  /**
   * Reset the internal object cache
   */
  async resetCache(): Promise<void> {
    return this.executor.resetCache()
  }

  /**
   * Wait for the last queued transaction to complete
   */
  async waitForLastTransaction(): Promise<void> {
    return this.executor.waitForLastTransaction()
  }
}
