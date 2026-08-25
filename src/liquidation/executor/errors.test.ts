import { describe, it, expect } from 'vitest'
import {
  isDeterministicBuildFailure,
  ExecutionFailureError,
  CongestionError,
  InsufficientGasError,
} from './errors'

describe('isDeterministicBuildFailure', () => {
  it('recognises the MoveAbort that Transaction.build() surfaces as a plain Error', () => {
    // Verbatim shape of the error that looped a position ~85k times: the PTB
    // aborted while the build resolved it against the node, so it never reached
    // execution and arrived at the controller as an untyped Error.
    const error = new Error(
      'Transaction resolution failed: MoveAbort in 37th command, abort code: 0, in ' +
        "'0x0000000000000000000000000000000000000000000000000000000000000002::balance::destroy_zero' " +
        '(instruction 8)'
    )
    expect(isDeterministicBuildFailure(error)).toBe(true)
  })

  it('recognises the other deterministic execution kinds', () => {
    for (const marker of [
      'MovePrimitiveRuntimeError',
      'UnusedValueWithoutDrop',
      'CommandArgumentError',
      'TypeArgumentError',
    ]) {
      expect(
        isDeterministicBuildFailure(new Error(`Transaction resolution failed: ${marker}`))
      ).toBe(true)
    }
  })

  it('leaves genuinely transient failures alone', () => {
    // These must keep retrying without counting toward exclusion.
    const transient = [
      new Error('fetch failed'),
      new Error('Transaction resolution failed: ExecutionCancelledDueToSharedObjectCongestion'),
      new Error('Transaction resolution failed: InsufficientGas'),
      new Error('503 Service Unavailable'),
    ]
    for (const error of transient) {
      expect(isDeterministicBuildFailure(error)).toBe(false)
    }
  })

  it('ignores non-Error values', () => {
    expect(isDeterministicBuildFailure('MoveAbort')).toBe(false)
    expect(isDeterministicBuildFailure(undefined)).toBe(false)
    expect(isDeterministicBuildFailure(null)).toBe(false)
  })

  it('does not reclassify errors the executor already types', () => {
    // The controller checks the typed classes first; these only need to not be
    // *additionally* matched by the message heuristic.
    const congestion = new CongestionError('Liquidation', ['0xabc'], '0xdigest', {})
    const gas = new InsufficientGasError('Liquidation', '0xdigest', {})
    expect(isDeterministicBuildFailure(congestion)).toBe(false)
    expect(isDeterministicBuildFailure(gas)).toBe(false)

    // An ExecutionFailureError carrying a MoveAbort matches either way — it lands
    // on the persistent path regardless of which check fires.
    const moveAbort = new ExecutionFailureError('Dry run', 'MoveAbort')
    expect(isDeterministicBuildFailure(moveAbort)).toBe(true)
  })
})
