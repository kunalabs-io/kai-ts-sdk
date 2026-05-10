export class TransactionExecutionError extends Error {
  constructor(
    message: string,
    public readonly txDigest?: string,
    public readonly executionError?: Record<string, unknown> | undefined
  ) {
    super(message)
    this.name = 'TransactionExecutionError'
  }
}

export class CongestionError extends TransactionExecutionError {
  constructor(
    context: string,
    public readonly congestedObjects: string[],
    txDigest: string,
    executionError: Record<string, unknown>
  ) {
    super(`${context}: ExecutionCancelledDueToSharedObjectCongestion`, txDigest, executionError)
    this.name = 'CongestionError'
  }
}

export class InsufficientGasError extends TransactionExecutionError {
  constructor(context: string, txDigest: string, executionError: Record<string, unknown>) {
    super(`${context}: InsufficientGas`, txDigest, executionError)
    this.name = 'InsufficientGasError'
  }
}

export class ExecutionFailureError extends TransactionExecutionError {
  constructor(
    context: string,
    public readonly errorKind: string,
    txDigest?: string,
    executionError?: Record<string, unknown>
  ) {
    super(`${context}: ${errorKind}`, txDigest, executionError)
    this.name = 'ExecutionFailureError'
  }
}

export function isTransientError(error: unknown): boolean {
  if (error instanceof ExecutionFailureError) return false
  return true
}
