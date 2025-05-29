import { Static, Type } from '@sinclair/typebox'

export const LIQUIDATION_BACKEND_CLIENT_BASE_URL = 'https://api.kai.finance'

export class LiqudationBackendClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getExistingPositions(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/positions/existing`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return (await response.json()) as PositionsGetExistingPositionsIdsResponseType
  }
}

export const PositionsGetExistingPositionsIdsResponseSchema = Type.Array(Type.String())

export type PositionsGetExistingPositionsIdsResponseType = Static<
  typeof PositionsGetExistingPositionsIdsResponseSchema
>
