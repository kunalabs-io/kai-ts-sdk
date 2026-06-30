import { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
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
  nextCursor: string | null
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
  client: ClientWithCoreApi,
  walletAddress: string,
  cursor?: string
): Promise<GetAllWalletPositionsResponse> {
  const res = await client.core.listOwnedObjects({
    owner: walletAddress,
    type: PositionCap.$typeName,
    include: {
      content: true,
    },
    cursor,
  })

  const positionIdToCapMap = new Map<string, PositionCap>()

  for (const obj of res.objects) {
    const positionCap = PositionCap.fromCoreObject(obj)
    positionIdToCapMap.set(positionCap.positionId, positionCap)
  }

  const positionsRes = await client.core.getObjects({
    objectIds: Array.from(positionIdToCapMap.keys()),
    include: {
      content: true,
    },
  })

  const ret: GetAllWalletPositionsResponse = {
    data: [],
    hasNextPage: res.hasNextPage,
    nextCursor: res.cursor,
  }

  for (const obj of positionsRes.objects) {
    if (obj instanceof Error) {
      throw obj
    }

    const position = Position.fromCoreObject(obj)

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
  client: ClientWithCoreApi,
  positionId: string,
  walletAddress: string
): Promise<PositionCap | null> {
  const normalizedPositionId = normalizeSuiObjectId(positionId)

  let hasNextPage = true
  let nextCursor: string | null | undefined = undefined
  while (hasNextPage) {
    const res: SuiClientTypes.ListOwnedObjectsResponse<{ content: true }> =
      await client.core.listOwnedObjects({
        owner: walletAddress,
        include: {
          content: true,
        },
        type: PositionCap.$typeName,
        cursor: nextCursor,
      })

    for (const obj of res.objects) {
      const positionCap = PositionCap.fromCoreObject(obj)
      if (normalizeSuiObjectId(positionCap.positionId) === normalizedPositionId) {
        return positionCap
      }
    }

    hasNextPage = res.hasNextPage
    nextCursor = res.cursor
  }

  return null
}
