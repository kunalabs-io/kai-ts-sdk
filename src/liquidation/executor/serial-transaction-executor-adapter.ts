import { SerialTransactionExecutor, Transaction } from '@mysten/sui/transactions'
import { SuiClient, SuiTransactionBlockResponseOptions } from '@mysten/sui/client'
import { Signer } from '@mysten/sui/cryptography'
import { TransactionExecutor, ExecutionResult } from './transaction-executor'

export interface SerialTransactionExecutorAdapterParams {
  client: SuiClient
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
    options?: SuiTransactionBlockResponseOptions,
    additionalSignatures?: string[]
  ): Promise<ExecutionResult> {
    return this.executor.executeTransaction(transaction, options, additionalSignatures)
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
