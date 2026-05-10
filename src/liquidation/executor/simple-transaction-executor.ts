import { Transaction } from '@mysten/sui/transactions'
import { SuiClient, SuiTransactionBlockResponseOptions } from '@mysten/sui/client'
import { Signer } from '@mysten/sui/cryptography'
import { toBase64 } from '@mysten/sui/utils'
import { TransactionExecutor, ExecutionResult } from './transaction-executor'

/**
 * Simple transaction executor that builds, signs, and executes a single transaction.
 *
 * This executor does NOT queue transactions - it assumes the caller handles sequencing.
 * After submitting, it waits for the transaction to be confirmed before returning.
 * Use this with sequential mode in LiquidationController.
 */
export class SimpleTransactionExecutor implements TransactionExecutor {
  constructor(
    private readonly client: SuiClient,
    private readonly signer: Signer
  ) {}

  get sender(): string {
    return this.signer.toSuiAddress()
  }

  async executeTransaction(
    transaction: Transaction | Uint8Array,
    options?: SuiTransactionBlockResponseOptions,
    additionalSignatures?: string[]
  ): Promise<ExecutionResult> {
    let txBytes: Uint8Array

    if (transaction instanceof Transaction) {
      txBytes = await this.buildTransaction(transaction)
    } else {
      txBytes = transaction
    }

    // Sign the transaction
    const { signature } = await this.signer.signTransaction(txBytes)

    // Combine signatures
    const signatures = additionalSignatures ? [signature, ...additionalSignatures] : [signature]

    // Execute the transaction
    const response = await this.client.executeTransactionBlock({
      transactionBlock: txBytes,
      signature: signatures,
      options: {
        ...options,
        showRawEffects: true,
      },
    })

    // Wait for transaction confirmation before returning
    await this.client.waitForTransaction({ digest: response.digest })

    const effectsBytes = Uint8Array.from(response.rawEffects!)

    return {
      digest: response.digest,
      effects: toBase64(effectsBytes),
      data: response,
    }
  }

  async buildTransaction(transaction: Transaction): Promise<Uint8Array> {
    transaction.setSenderIfNotSet(this.signer.toSuiAddress())
    return transaction.build({ client: this.client })
  }
}
