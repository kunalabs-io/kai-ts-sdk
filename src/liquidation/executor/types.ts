/**
 * Represents the outcome of a liquidation or deleverage execution.
 *
 * If both liquidated and deleveraged are false, it means the transaction
 * executed successfully but the position no longer needed action (e.g., it
 * recovered before execution).
 *
 * Both can be true if deleverage occurred as part of liquidation.
 *
 * Actual errors (network, tx failure, signing) are thrown as exceptions.
 */
export interface ExecutionOutcome {
  txDigest: string
  liquidated: boolean
  deleveraged: boolean
}
