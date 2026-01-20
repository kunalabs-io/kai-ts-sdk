import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { ExternalAddress } from '../../../wormhole/external-address/structs'

/* ============================== TokenBridgeMessage =============================== */

export function isTokenBridgeMessage(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('token-bridge', 'vaa::TokenBridgeMessage')}::vaa::TokenBridgeMessage`
}

export interface TokenBridgeMessageFields {
  emitterChain: ToField<'u16'>
  emitterAddress: ToField<ExternalAddress>
  sequence: ToField<'u64'>
  payload: ToField<Vector<'u8'>>
}

export type TokenBridgeMessageReified = Reified<TokenBridgeMessage, TokenBridgeMessageFields>

export type TokenBridgeMessageJSONField = {
  emitterChain: number
  emitterAddress: ToJSON<ExternalAddress>
  sequence: string
  payload: number[]
}

export type TokenBridgeMessageJSON = {
  $typeName: typeof TokenBridgeMessage.$typeName
  $typeArgs: []
} & TokenBridgeMessageJSONField

export class TokenBridgeMessage implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::vaa::TokenBridgeMessage` = `${
    getTypeOrigin('token-bridge', 'vaa::TokenBridgeMessage')
  }::vaa::TokenBridgeMessage` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof TokenBridgeMessage.$typeName = TokenBridgeMessage.$typeName
  readonly $fullTypeName: `${string}::vaa::TokenBridgeMessage`
  readonly $typeArgs: []
  readonly $isPhantom: typeof TokenBridgeMessage.$isPhantom = TokenBridgeMessage.$isPhantom

  readonly emitterChain: ToField<'u16'>
  readonly emitterAddress: ToField<ExternalAddress>
  readonly sequence: ToField<'u64'>
  readonly payload: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: TokenBridgeMessageFields) {
    this.$fullTypeName = composeSuiType(
      TokenBridgeMessage.$typeName,
      ...typeArgs,
    ) as `${string}::vaa::TokenBridgeMessage`
    this.$typeArgs = typeArgs

    this.emitterChain = fields.emitterChain
    this.emitterAddress = fields.emitterAddress
    this.sequence = fields.sequence
    this.payload = fields.payload
  }

  static reified(): TokenBridgeMessageReified {
    const reifiedBcs = TokenBridgeMessage.bcs
    return {
      typeName: TokenBridgeMessage.$typeName,
      fullTypeName: composeSuiType(
        TokenBridgeMessage.$typeName,
        ...[],
      ) as `${string}::vaa::TokenBridgeMessage`,
      typeArgs: [] as [],
      isPhantom: TokenBridgeMessage.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TokenBridgeMessage.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TokenBridgeMessage.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TokenBridgeMessage.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TokenBridgeMessage.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TokenBridgeMessage.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TokenBridgeMessage.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TokenBridgeMessage.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => TokenBridgeMessage.fetch(client, id),
      new: (fields: TokenBridgeMessageFields) => {
        return new TokenBridgeMessage([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): TokenBridgeMessageReified {
    return TokenBridgeMessage.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TokenBridgeMessage>> {
    return phantom(TokenBridgeMessage.reified())
  }

  static get p(): PhantomReified<ToTypeStr<TokenBridgeMessage>> {
    return TokenBridgeMessage.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TokenBridgeMessage', {
      emitter_chain: bcs.u16(),
      emitter_address: ExternalAddress.bcs,
      sequence: bcs.u64(),
      payload: bcs.vector(bcs.u8()),
    })
  }

  private static cachedBcs: ReturnType<typeof TokenBridgeMessage.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof TokenBridgeMessage.instantiateBcs> {
    if (!TokenBridgeMessage.cachedBcs) {
      TokenBridgeMessage.cachedBcs = TokenBridgeMessage.instantiateBcs()
    }
    return TokenBridgeMessage.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TokenBridgeMessage {
    return TokenBridgeMessage.reified().new({
      emitterChain: decodeFromFields('u16', fields.emitter_chain),
      emitterAddress: decodeFromFields(ExternalAddress.reified(), fields.emitter_address),
      sequence: decodeFromFields('u64', fields.sequence),
      payload: decodeFromFields(vector('u8'), fields.payload),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TokenBridgeMessage {
    if (!isTokenBridgeMessage(item.type)) {
      throw new Error('not a TokenBridgeMessage type')
    }

    return TokenBridgeMessage.reified().new({
      emitterChain: decodeFromFieldsWithTypes('u16', item.fields.emitter_chain),
      emitterAddress: decodeFromFieldsWithTypes(
        ExternalAddress.reified(),
        item.fields.emitter_address,
      ),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
      payload: decodeFromFieldsWithTypes(vector('u8'), item.fields.payload),
    })
  }

  static fromBcs(data: Uint8Array): TokenBridgeMessage {
    return TokenBridgeMessage.fromFields(TokenBridgeMessage.bcs.parse(data))
  }

  toJSONField(): TokenBridgeMessageJSONField {
    return {
      emitterChain: this.emitterChain,
      emitterAddress: this.emitterAddress.toJSONField(),
      sequence: this.sequence.toString(),
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
    }
  }

  toJSON(): TokenBridgeMessageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TokenBridgeMessage {
    return TokenBridgeMessage.reified().new({
      emitterChain: decodeFromJSONField('u16', field.emitterChain),
      emitterAddress: decodeFromJSONField(ExternalAddress.reified(), field.emitterAddress),
      sequence: decodeFromJSONField('u64', field.sequence),
      payload: decodeFromJSONField(vector('u8'), field.payload),
    })
  }

  static fromJSON(json: Record<string, any>): TokenBridgeMessage {
    if (json.$typeName !== TokenBridgeMessage.$typeName) {
      throw new Error(
        `not a TokenBridgeMessage json object: expected '${TokenBridgeMessage.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return TokenBridgeMessage.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TokenBridgeMessage {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTokenBridgeMessage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TokenBridgeMessage object`)
    }
    return TokenBridgeMessage.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TokenBridgeMessage {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTokenBridgeMessage(data.bcs.type)) {
        throw new Error(`object at is not a TokenBridgeMessage object`)
      }

      return TokenBridgeMessage.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TokenBridgeMessage.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<TokenBridgeMessage> {
    const res = await fetchObjectBcs(client, id)
    if (!isTokenBridgeMessage(res.type)) {
      throw new Error(`object at id ${id} is not a TokenBridgeMessage object`)
    }

    return TokenBridgeMessage.fromBcs(res.bcsBytes)
  }
}
