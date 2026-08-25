import { GrpcWebFetchTransport, SuiGrpcClient } from '@mysten/sui/grpc'
import {
  FailoverGrpcTransport,
  type FailoverEvent,
  type FailoverTransportEndpoint,
} from './failover-transport'

export {
  FailoverGrpcTransport,
  isFailoverableError,
  type FailoverEvent,
  type FailoverTransportEndpoint,
  type FailoverTransportOptions,
} from './failover-transport'

/**
 * Priority-ordered defaults: our own node first (lower latency, unmetered),
 * the public Mysten fullnode as the safety net.
 */
export const DEFAULT_SUI_RPC_URLS: readonly string[] = [
  'https://rpc.kunalabs.io',
  'https://fullnode.mainnet.sui.io',
]

/** Parse a comma-separated `--rpc-url` value into a priority-ordered list. */
export function parseRpcUrls(value: string): string[] {
  const urls = value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
  if (urls.length === 0) {
    throw new Error(`no RPC URLs in ${JSON.stringify(value)}`)
  }
  return urls
}

export interface CreateSuiClientOptions {
  /** Priority-ordered endpoint URLs; a single URL disables failover. */
  urls?: string[]
  network?: string
  /** Per-endpoint request timeout in ms (a hung endpoint fails over after this). */
  timeout?: number
  cooldownMs?: number
  maxCooldownMs?: number
  /** Called on every failover; wire this to logging/metrics. */
  onFailover?: (event: FailoverEvent) => void
}

/**
 * Construct a SuiGrpcClient with transparent multi-endpoint failover. The
 * returned client is a genuine SuiGrpcClient — failover lives entirely inside
 * the transport, so it drops in anywhere one is used today (Node, lambda,
 * browser).
 */
export function createSuiClient(options: CreateSuiClientOptions = {}): SuiGrpcClient {
  const urls = options.urls && options.urls.length > 0 ? options.urls : DEFAULT_SUI_RPC_URLS
  const network = options.network ?? 'mainnet'
  const timeout = options.timeout ?? 30_000

  const makeEndpoint = (url: string): FailoverTransportEndpoint => ({
    url,
    transport: new GrpcWebFetchTransport({ baseUrl: url, timeout }),
  })

  const transport =
    urls.length === 1
      ? makeEndpoint(urls[0]).transport
      : new FailoverGrpcTransport({
          endpoints: urls.map(makeEndpoint),
          cooldownMs: options.cooldownMs,
          maxCooldownMs: options.maxCooldownMs,
          onFailover: options.onFailover,
        })

  return new SuiGrpcClient({ network, transport })
}
