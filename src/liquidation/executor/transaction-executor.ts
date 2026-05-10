import { Transaction } from '@mysten/sui/transactions'
import { SuiTransactionBlockResponse, SuiTransactionBlockResponseOptions } from '@mysten/sui/client'

export interface ExecutionResult {
  digest: string
  effects: string
  data: SuiTransactionBlockResponse
}

export interface TransactionExecutor {
  readonly sender: string

  executeTransaction(
    transaction: Transaction | Uint8Array,
    options?: SuiTransactionBlockResponseOptions,
    additionalSignatures?: string[]
  ): Promise<ExecutionResult>

  buildTransaction(transaction: Transaction): Promise<Uint8Array>
}
