import type { RpcTransport } from '@mysten/sui/grpc'
import {
  RpcError,
  UnaryCall,
  type ClientStreamingCall,
  type DuplexStreamingCall,
  type MethodInfo,
  type RpcOptions,
  type ServerStreamingCall,
} from '@protobuf-ts/runtime-rpc'

/**
 * gRPC status codes that indicate endpoint/transport trouble rather than a
 * problem with the request itself. Only these (plus non-RpcError network
 * failures) trigger failover — an application-level error (NOT_FOUND,
 * INVALID_ARGUMENT, ...) would fail identically on every endpoint.
 */
const FAILOVER_CODES = new Set(['UNAVAILABLE', 'UNKNOWN', 'INTERNAL', 'DEADLINE_EXCEEDED'])

export function isFailoverableError(err: unknown): boolean {
  if (err instanceof RpcError) {
    return FAILOVER_CODES.has(err.code)
  }
  // A caller-initiated abort is not an endpoint failure.
  if (err instanceof Error && err.name === 'AbortError') {
    return false
  }
  // Anything else coming out of a transport is network-level (fetch
  // TypeError, connection reset, ...).
  return true
}

export interface FailoverEvent {
  /** Endpoint that failed. */
  url: string
  /** Endpoint the request is being retried against, if any. */
  nextUrl?: string
  /** Full gRPC method name. */
  method: string
  error: unknown
}

export interface FailoverTransportEndpoint {
  url: string
  transport: RpcTransport
}

export interface FailoverTransportOptions {
  /** Ordered by priority: the first healthy endpoint is always preferred. */
  endpoints: FailoverTransportEndpoint[]
  /** Cooldown after an endpoint's first failure (doubles per consecutive failure). */
  cooldownMs?: number
  /** Cooldown growth cap. */
  maxCooldownMs?: number
  /** Called on every failover; wire this to logging/metrics. */
  onFailover?: (event: FailoverEvent) => void
  /** Clock override for tests. */
  now?: () => number
}

interface EndpointState {
  url: string
  transport: RpcTransport
  failedUntil: number
  cooldownMs: number
}

/**
 * Mark a promise as "handled" without consuming it, so component promises of
 * a failed call (headers/status/trailers the caller may never await) don't
 * raise unhandled-rejection warnings.
 */
function swallowable<T>(p: Promise<T>): Promise<T> {
  void p.then(undefined, () => {})
  return p
}

/**
 * An RpcTransport that fails over across a priority-ordered list of
 * endpoints. Unary calls retry transparently within the same call on
 * transport-level errors; a failed endpoint goes into an exponentially
 * growing cooldown and recovers by being re-tried once its cooldown lapses
 * (re-probe by traffic — no background health checks, so the same code is
 * correct in long-lived services, lambdas, and the browser). Server-streaming
 * calls pick a healthy endpoint at call start; a mid-stream failure marks the
 * endpoint so the caller's reconnect lands elsewhere.
 */
export class FailoverGrpcTransport implements RpcTransport {
  private readonly endpoints: EndpointState[]
  private readonly initialCooldownMs: number
  private readonly maxCooldownMs: number
  private readonly onFailover?: (event: FailoverEvent) => void
  private readonly now: () => number

  constructor(options: FailoverTransportOptions) {
    if (options.endpoints.length === 0) {
      throw new Error('FailoverGrpcTransport requires at least one endpoint')
    }
    this.initialCooldownMs = options.cooldownMs ?? 30_000
    this.maxCooldownMs = options.maxCooldownMs ?? 300_000
    this.onFailover = options.onFailover
    this.now = options.now ?? Date.now
    this.endpoints = options.endpoints.map(e => ({
      url: e.url,
      transport: e.transport,
      failedUntil: 0,
      cooldownMs: this.initialCooldownMs,
    }))
  }

  /**
   * Highest-priority endpoint not in cooldown; if all are cooling down, the
   * one that recovers soonest (never refuse to try — a request in hand beats
   * a cooldown table).
   */
  private pick(exclude: ReadonlySet<number>): number | undefined {
    const now = this.now()
    let soonest: number | undefined
    for (let i = 0; i < this.endpoints.length; i++) {
      if (exclude.has(i)) continue
      if (this.endpoints[i].failedUntil <= now) return i
      if (
        soonest === undefined ||
        this.endpoints[i].failedUntil < this.endpoints[soonest].failedUntil
      ) {
        soonest = i
      }
    }
    return soonest
  }

  private markFailure(i: number) {
    const e = this.endpoints[i]
    e.failedUntil = this.now() + e.cooldownMs
    e.cooldownMs = Math.min(e.cooldownMs * 2, this.maxCooldownMs)
  }

  private markSuccess(i: number) {
    const e = this.endpoints[i]
    e.failedUntil = 0
    e.cooldownMs = this.initialCooldownMs
  }

  mergeOptions(options?: Partial<RpcOptions>): RpcOptions {
    return this.endpoints[0].transport.mergeOptions(options)
  }

  /**
   * GrpcWebFetchTransport reads `baseUrl` from the per-call options (merged
   * once by the client — via OUR mergeOptions, i.e. the primary's defaults),
   * NOT from its own construction defaults. Every attempt must therefore
   * stamp its endpoint's own URL, or retries would re-fetch the failed
   * endpoint's URL through a different transport object.
   */
  private optionsFor(endpoint: EndpointState, options: RpcOptions): RpcOptions {
    return { ...options, baseUrl: endpoint.url } as RpcOptions
  }

  unary<I extends object, O extends object>(
    method: MethodInfo<I, O>,
    input: I,
    options: RpcOptions
  ): UnaryCall<I, O> {
    const run = async () => {
      const tried = new Set<number>()
      let lastError: unknown
      for (;;) {
        const i = this.pick(tried)
        if (i === undefined) break
        tried.add(i)
        const endpoint = this.endpoints[i]
        try {
          const finished = await endpoint.transport.unary(
            method,
            input,
            this.optionsFor(endpoint, options)
          )
          this.markSuccess(i)
          return finished
        } catch (err) {
          if (!isFailoverableError(err)) throw err
          lastError = err
          this.markFailure(i)
          const next = this.pick(tried)
          this.onFailover?.({
            url: endpoint.url,
            nextUrl: next !== undefined ? this.endpoints[next].url : undefined,
            method: `${method.service.typeName}/${method.name}`,
            error: err,
          })
        }
      }
      throw lastError
    }

    const result = run()
    return new UnaryCall<I, O>(
      method,
      options.meta ?? {},
      input,
      swallowable(result.then(f => f.headers)),
      swallowable(result.then(f => f.response)),
      swallowable(result.then(f => f.status)),
      swallowable(result.then(f => f.trailers))
    )
  }

  serverStreaming<I extends object, O extends object>(
    method: MethodInfo<I, O>,
    input: I,
    options: RpcOptions
  ): ServerStreamingCall<I, O> {
    const i = this.pick(new Set()) ?? 0
    const endpoint = this.endpoints[i]
    const call = endpoint.transport.serverStreaming(
      method,
      input,
      this.optionsFor(endpoint, options)
    )
    // Observe the stream's fate so endpoint health reflects it; never alter it.
    void call.status.then(
      () => this.markSuccess(i),
      err => {
        if (isFailoverableError(err)) {
          this.markFailure(i)
          const next = this.pick(new Set([i]))
          this.onFailover?.({
            url: endpoint.url,
            nextUrl: next !== undefined ? this.endpoints[next].url : undefined,
            method: `${method.service.typeName}/${method.name}`,
            error: err,
          })
        }
      }
    )
    return call
  }

  clientStreaming<I extends object, O extends object>(
    method: MethodInfo<I, O>,
    options: RpcOptions
  ): ClientStreamingCall<I, O> {
    const i = this.pick(new Set()) ?? 0
    return this.endpoints[i].transport.clientStreaming(
      method,
      this.optionsFor(this.endpoints[i], options)
    )
  }

  duplex<I extends object, O extends object>(
    method: MethodInfo<I, O>,
    options: RpcOptions
  ): DuplexStreamingCall<I, O> {
    const i = this.pick(new Set()) ?? 0
    return this.endpoints[i].transport.duplex(method, this.optionsFor(this.endpoints[i], options))
  }
}
