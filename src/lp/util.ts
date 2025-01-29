import { PaginatedObjectsResponse, SuiClient } from '@mysten/sui/client'
import { PositionCap } from '../gen/kai-leverage/position-core-clmm/structs'
import { normalizeSuiObjectId } from '@mysten/sui/utils'
import { Position } from './position'
import { PhantomTypeArgument, TypeArgument } from '../gen/_framework/reified'

export interface GetAllWalletPositionsResponse {
  data: {
    position: Position<PhantomTypeArgument, PhantomTypeArgument, TypeArgument>
    positionCapId: string
  }[]
  hasNextPage: boolean
  nextCursor?: PaginatedObjectsResponse['nextCursor']
}

/**
 * Fetches all `Position` objects owned by a given wallet address.
 *
 * @param client - The Sui client
 * @param walletAddress - The address of the wallet
 * @param cursor - The cursor to use for pagination
 * @returns The `Position` objects owned by the wallet address
 */
export async function getAllWalletPositions(
  client: SuiClient,
  walletAddress: string,
  cursor?: string
) {
  const res = await client.getOwnedObjects({
    owner: walletAddress,
    filter: {
      StructType: PositionCap.$typeName,
    },
    options: {
      showBcs: true,
    },
    cursor,
  })

  const positionIdToCapMap = new Map<string, PositionCap>()

  for (const obj of res.data) {
    if (!obj.data) {
      throw new Error(`No data found in response for a PositionCap`)
    }

    const positionCap = PositionCap.fromSuiObjectData(obj.data)
    positionIdToCapMap.set(positionCap.positionId, positionCap)
  }

  const positionsRes = await client.multiGetObjects({
    ids: Array.from(positionIdToCapMap.keys()),
    options: {
      showBcs: true,
    },
  })

  const ret: GetAllWalletPositionsResponse = {
    data: [],
    hasNextPage: res.hasNextPage,
    nextCursor: res.nextCursor,
  }

  for (const obj of positionsRes) {
    if (!obj.data) {
      throw new Error(`No data found in response for a Position`)
    }

    const position = Position.fromSuiObjectData(obj.data)

    ret.data.push({
      position,
      positionCapId: positionIdToCapMap.get(position.id)!.id,
    })
  }

  return ret
}

/**
 * Finds the `PositionCap` object for a given `Position` object. The `PositionCap` must
 * be owned by the specified wallet address.
 *
 * @param client - The Sui client
 * @param positionId - The ID of the `Position` object
 * @param walletAddress - The address of the wallet
 * @returns The `PositionCap` object, or `null` if it is not found
 */
export async function findPositionCapForWalletPosition(
  client: SuiClient,
  positionId: string,
  walletAddress: string
) {
  const normalizedPositionId = normalizeSuiObjectId(positionId)

  let hasNextPage = true
  let nextCursor = undefined
  while (hasNextPage) {
    const res = await client.getOwnedObjects({
      owner: walletAddress,
      options: {
        showBcs: true,
      },
      filter: {
        StructType: PositionCap.$typeName,
      },
      cursor: nextCursor,
    })

    for (const obj of res.data) {
      if (!obj.data) {
        throw new Error(`No data found in response for a PositionCap`)
      }

      const positionCap = PositionCap.fromSuiObjectData(obj.data)
      if (normalizeSuiObjectId(positionCap.positionId) === normalizedPositionId) {
        return positionCap
      }
    }

    hasNextPage = res.hasNextPage
    nextCursor = res.nextCursor
  }

  return null
}
