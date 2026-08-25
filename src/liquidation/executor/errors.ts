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

/**
 * A dust liquidation was refused because it would exceed a hard value cap
 * (per-position repayment ceiling, per-run spend cap, gas cap, or an
 * unexpected outflow surfaced by the dry-run balance changes).
 */
export class DustCapExceededError extends Error {
  constructor(
    message: string,
    public readonly violations: string[] = []
  ) {
    super(message)
    this.name = 'DustCapExceededError'
  }
}

/**
 * The wallet (coin objects + address balance) can't fund a repayment.
 * The dust sweep counts these as skipped-insufficient-funds.
 */
export class InsufficientFundingError extends Error {
  constructor(
    message: string,
    public readonly coinType: string
  ) {
    super(message)
    this.name = 'InsufficientFundingError'
  }
}

/**
 * Markers for on-chain failures that are a property of the transaction itself,
 * not of the network: rebuilding and resubmitting the same transaction against
 * the same state reproduces them exactly.
 *
 * Deliberately narrow — congestion and gas failures are genuinely transient and
 * must stay out, and anything unrecognised keeps the old transient handling.
 */
const DETERMINISTIC_EXECUTION_MARKERS = [
  'MoveAbort',
  'MovePrimitiveRuntimeError',
  'UnusedValueWithoutDrop',
  'CommandArgumentError',
  'TypeArgumentError',
]

/**
 * True when an error thrown while *building* a transaction carries an on-chain
 * execution failure.
 *
 * `Transaction.build()` resolves against a fullnode, so a PTB that aborts fails
 * here rather than at execution — and @mysten/sui surfaces it as a plain `Error`
 * ("Transaction resolution failed: MoveAbort in ...") with no structured kind, so
 * it has to be recognised by message. Without this, a deterministic abort reads
 * as an infrastructure blip and the controller retries it forever.
 */
export function isDeterministicBuildFailure(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  return DETERMINISTIC_EXECUTION_MARKERS.some(marker => error.message.includes(marker))
}

export function isTransientError(error: unknown): boolean {
  if (error instanceof ExecutionFailureError) return false
  if (error instanceof DustCapExceededError) return false
  if (error instanceof InsufficientFundingError) return false
  return true
}
