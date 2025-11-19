import { Price } from '../../price'
import {
  Transaction,
  TransactionObjectArgument,
  TransactionObjectInput,
} from '@mysten/sui/transactions'
import { PhantomTypeArgument } from '../../gen/_framework/reified'
import * as balance from '../../gen/sui/balance/functions'
import { compressSuiType } from '../../gen/_framework/util'
import { CoinInfo } from '../../coin-info'
import {
  Router,
  RouterSwapBalanceArgs,
  RouterSwapBalanceResult,
  RouterSwapCoinResult,
  SwapExactOutBalanceResult,
  SwapExactOutCoinResult,
} from '../adapter'
import { ALL_POOL_INFOS, PoolInfo } from './pool-info'
import * as cetus from './cetus-swap'
import * as stsui from './stsui-swap'
import * as bluefin from './bluefin-swap'

export const ALL_PROTOCOLS = ['cetus', 'bluefin', 'stsui'] as const
export type Protocol = (typeof ALL_PROTOCOLS)[number]

const DEFAULT_ALLOWED_PROTOCOLS: Array<Protocol> = ['bluefin', 'stsui', 'cetus']

export function getSwapInfo(
  coinIn: CoinInfo<PhantomTypeArgument>,
  coinOut: CoinInfo<PhantomTypeArgument>,
  allowedProtocols: Array<Protocol> = DEFAULT_ALLOWED_PROTOCOLS
): PoolInfo | undefined {
  const coinInType = compressSuiType(coinIn.typeName)
  const coinOutType = compressSuiType(coinOut.typeName)

  const swapInfo = ALL_POOL_INFOS.find(p => {
    if (!allowedProtocols.includes(p.protocol)) {
      return false
    }
    const aType = compressSuiType(p.coinA.typeName)
    const bType = compressSuiType(p.coinB.typeName)

    const isPair =
      (aType === coinInType && bType === coinOutType) ||
      (aType === coinOutType && bType === coinInType)

    return isPair
  })
  if (!swapInfo) {
    return undefined
  }

  return swapInfo
}

export interface SwapArgs {
  balanceIn: TransactionObjectInput
  inInfo: CoinInfo<PhantomTypeArgument>
  outInfo: CoinInfo<PhantomTypeArgument>
  allowedProtocols?: Array<Protocol>
}

export interface RouteStep {
  pool: PoolInfo
  a2b: boolean
}

export function findRouteStep(
  coinIn: CoinInfo<PhantomTypeArgument>,
  coinOut: CoinInfo<PhantomTypeArgument>,
  allowedProtocols: Array<Protocol> = DEFAULT_ALLOWED_PROTOCOLS
): RouteStep | undefined {
  const coinInType = compressSuiType(coinIn.typeName)
  const coinOutType = compressSuiType(coinOut.typeName)

  const poolInfo = ALL_POOL_INFOS.find(p => {
    if (!allowedProtocols.includes(p.protocol)) {
      return false
    }
    const aType = compressSuiType(p.coinA.typeName)
    const bType = compressSuiType(p.coinB.typeName)

    const isPair =
      (aType === coinInType && bType === coinOutType) ||
      (aType === coinOutType && bType === coinInType)

    return isPair
  })
  if (!poolInfo) {
    return undefined
  }

  const a2b = compressSuiType(poolInfo.coinA.typeName) === compressSuiType(coinIn.typeName)
  return { pool: poolInfo, a2b }
}

interface GraphEdge {
  from: string
  to: string
  pool: PoolInfo
  a2b: boolean
}

function buildGraph(allowedProtocols: Array<Protocol>): Map<string, GraphEdge[]> {
  const graph = new Map<string, GraphEdge[]>()

  for (const pool of ALL_POOL_INFOS) {
    if (!allowedProtocols.includes(pool.protocol)) {
      continue
    }

    const coinAType = compressSuiType(pool.coinA.typeName)
    const coinBType = compressSuiType(pool.coinB.typeName)

    // Add edge from A to B
    if (!graph.has(coinAType)) {
      graph.set(coinAType, [])
    }
    graph.get(coinAType)!.push({
      from: coinAType,
      to: coinBType,
      pool,
      a2b: true,
    })

    // Add edge from B to A
    if (!graph.has(coinBType)) {
      graph.set(coinBType, [])
    }
    graph.get(coinBType)!.push({
      from: coinBType,
      to: coinAType,
      pool,
      a2b: false,
    })
  }

  return graph
}

export function findRoute(
  inInfo: CoinInfo<PhantomTypeArgument>,
  outInfo: CoinInfo<PhantomTypeArgument>,
  allowedProtocols: Array<Protocol> = DEFAULT_ALLOWED_PROTOCOLS
): Array<RouteStep> | undefined {
  const graph = buildGraph(allowedProtocols)

  const startType = compressSuiType(inInfo.typeName)
  const endType = compressSuiType(outInfo.typeName)

  if (startType === endType) {
    return []
  }

  // BFS to find shortest path
  const queue: Array<{ node: string; path: GraphEdge[] }> = [{ node: startType, path: [] }]
  const visited = new Set<string>()

  while (queue.length > 0) {
    const { node, path } = queue.shift()!

    if (visited.has(node)) {
      continue
    }
    visited.add(node)

    if (node === endType) {
      return path.map(edge => ({
        pool: edge.pool,
        a2b: edge.a2b,
      }))
    }

    const edges = graph.get(node) || []
    for (const edge of edges) {
      if (!visited.has(edge.to)) {
        queue.push({
          node: edge.to,
          path: [...path, edge],
        })
      }
    }
  }

  return undefined
}

export function swapWithRoute(
  tx: Transaction,
  route: Array<RouteStep>,
  balanceIn: TransactionObjectInput
) {
  let currentIn: TransactionObjectArgument = tx.object(balanceIn)
  for (const step of route) {
    switch (step.pool.protocol) {
      case 'cetus':
        currentIn = cetus.swapStep(tx, step, currentIn)
        break
      case 'bluefin':
        currentIn = bluefin.swapStep(tx, step, currentIn)
        break
      case 'stsui':
        currentIn = stsui.swapStep(tx, step, currentIn)
        break
    }
  }

  return currentIn
}

export function swap(tx: Transaction, args: SwapArgs): TransactionObjectArgument {
  if (compressSuiType(args.inInfo.typeName) === compressSuiType(args.outInfo.typeName)) {
    return tx.object(args.balanceIn)
  }

  const route = findRoute(args.inInfo, args.outInfo, args.allowedProtocols)
  if (!route) {
    throw new Error(`No route found from ${args.inInfo.typeName} to ${args.outInfo.typeName}`)
  }

  return swapWithRoute(tx, route, args.balanceIn)
}

export class KaiRouterAdapter implements Router {
  id = () => 'kai'

  async initialize() {}

  async swapBalance(args: RouterSwapBalanceArgs): Promise<RouterSwapBalanceResult> {
    if (args.amountIn === 0n) {
      balance.destroyZero(args.tx, args.inInfo.typeName, args.balanceIn)
      const balanceOut = balance.zero(args.tx, args.outInfo.typeName)
      return {
        tx: args.tx,
        balanceOut,
      }
    }

    const balanceOut = swap(args.tx, {
      balanceIn: args.balanceIn,
      inInfo: args.inInfo,
      outInfo: args.outInfo,
    })

    return {
      tx: args.tx,
      balanceOut: balanceOut,
    }
  }

  async swapCoin(): Promise<RouterSwapCoinResult> {
    throw new Error('not implemented')
  }

  async getPrice<X extends PhantomTypeArgument, Y extends PhantomTypeArgument>(): Promise<
    Price<X, Y>
  > {
    throw new Error('not implemented')
  }

  async swapExactOutBalance(): Promise<SwapExactOutBalanceResult> {
    throw new Error('not implemented')
  }

  async swapExactOutCoin(): Promise<SwapExactOutCoinResult> {
    throw new Error('not implemented')
  }

  protocolList(): Array<Protocol> {
    return [...ALL_PROTOCOLS]
  }
}
