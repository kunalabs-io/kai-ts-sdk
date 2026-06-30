import { Transaction } from '@mysten/sui/transactions'
import { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
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
    private readonly client: ClientWithCoreApi,
    private readonly signer: Signer
  ) {}

  get sender(): string {
    return this.signer.toSuiAddress()
  }

  async executeTransaction(
    transaction: Transaction | Uint8Array,
    _options?: SuiClientTypes.TransactionInclude,
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

    // Execute the transaction (effects + events are always requested; consumers read both)
    const res = await this.client.core.executeTransaction({
      transaction: txBytes,
      signatures,
      include: { effects: true, events: true },
    })
    const tx = res.Transaction ?? res.FailedTransaction

    // Wait for transaction confirmation (read-after-write barrier) before returning
    await this.client.core.waitForTransaction({ digest: tx.digest })

    const effectsBytes = tx.effects?.bcs ?? new Uint8Array()

    return {
      digest: tx.digest,
      effects: toBase64(effectsBytes),
      data: tx,
    }
  }

  async buildTransaction(transaction: Transaction): Promise<Uint8Array> {
    transaction.setSenderIfNotSet(this.signer.toSuiAddress())
    return transaction.build({ client: this.client })
  }
}
