import { Transaction } from '@mysten/sui/transactions'
import { SuiClientTypes } from '@mysten/sui/client'

export interface ExecutionResult {
  digest: string
  effects: string
  data: SuiClientTypes.Transaction<{ effects: true; events: true }>
}

export interface TransactionExecutor {
  readonly sender: string

  executeTransaction(
    transaction: Transaction | Uint8Array,
    options?: SuiClientTypes.TransactionInclude,
    additionalSignatures?: string[]
  ): Promise<ExecutionResult>

  buildTransaction(transaction: Transaction): Promise<Uint8Array>
}
