import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { ExternalAddress } from '../../0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a/external-address/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== TokenBridgeMessage =============================== */

export function isTokenBridgeMessage(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::vaa::TokenBridgeMessage`
}

export interface TokenBridgeMessageFields {
  emitterChain: ToField<'u16'>
  emitterAddress: ToField<ExternalAddress>
  sequence: ToField<'u64'>
  payload: ToField<Vector<'u8'>>
}

export type TokenBridgeMessageReified = Reified<TokenBridgeMessage, TokenBridgeMessageFields>

export class TokenBridgeMessage implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::vaa::TokenBridgeMessage`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TokenBridgeMessage.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::vaa::TokenBridgeMessage`
  readonly $typeArgs: []
  readonly $isPhantom = TokenBridgeMessage.$isPhantom

  readonly emitterChain: ToField<'u16'>
  readonly emitterAddress: ToField<ExternalAddress>
  readonly sequence: ToField<'u64'>
  readonly payload: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: TokenBridgeMessageFields) {
    this.$fullTypeName = composeSuiType(
      TokenBridgeMessage.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::vaa::TokenBridgeMessage`
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
        ...[]
      ) as `${typeof PKG_V1}::vaa::TokenBridgeMessage`,
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
      fetch: async (client: SuiClient, id: string) => TokenBridgeMessage.fetch(client, id),
      new: (fields: TokenBridgeMessageFields) => {
        return new TokenBridgeMessage([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TokenBridgeMessage.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TokenBridgeMessage>> {
    return phantom(TokenBridgeMessage.reified())
  }
  static get p() {
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

  static get bcs() {
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
      payload: decodeFromFields(reified.vector('u8'), fields.payload),
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
        item.fields.emitter_address
      ),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
      payload: decodeFromFieldsWithTypes(reified.vector('u8'), item.fields.payload),
    })
  }

  static fromBcs(data: Uint8Array): TokenBridgeMessage {
    return TokenBridgeMessage.fromFields(TokenBridgeMessage.bcs.parse(data))
  }

  toJSONField() {
    return {
      emitterChain: this.emitterChain,
      emitterAddress: this.emitterAddress.toJSONField(),
      sequence: this.sequence.toString(),
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TokenBridgeMessage {
    return TokenBridgeMessage.reified().new({
      emitterChain: decodeFromJSONField('u16', field.emitterChain),
      emitterAddress: decodeFromJSONField(ExternalAddress.reified(), field.emitterAddress),
      sequence: decodeFromJSONField('u64', field.sequence),
      payload: decodeFromJSONField(reified.vector('u8'), field.payload),
    })
  }

  static fromJSON(json: Record<string, any>): TokenBridgeMessage {
    if (json.$typeName !== TokenBridgeMessage.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return TokenBridgeMessage.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TokenBridgeMessage.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TokenBridgeMessage> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TokenBridgeMessage object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTokenBridgeMessage(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TokenBridgeMessage object`)
    }

    return TokenBridgeMessage.fromSuiObjectData(res.data)
  }
}
