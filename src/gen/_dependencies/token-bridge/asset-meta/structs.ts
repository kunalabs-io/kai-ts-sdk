/**
 * This module implements serialization and deserialization for asset metadata,
 * which is a specific Wormhole message payload for Token Bridge.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { String } from '../../../std/string/structs'
import { ExternalAddress } from '../../wormhole-1/external-address/structs'

/* ============================== AssetMeta =============================== */

export function isAssetMeta(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('token-bridge', 'asset_meta::AssetMeta')}::asset_meta::AssetMeta`
}

export interface AssetMetaFields {
  /** Address of the token. */
  tokenAddress: ToField<ExternalAddress>
  /** Chain ID of the token. */
  tokenChain: ToField<'u16'>
  /** Number of decimals of the token. */
  nativeDecimals: ToField<'u8'>
  /**
   * Symbol of the token (UTF-8).
   * TODO(csongor): maybe turn these into String32s?
   */
  symbol: ToField<String>
  /** Name of the token (UTF-8). */
  name: ToField<String>
}

export type AssetMetaReified = Reified<AssetMeta, AssetMetaFields>

export type AssetMetaJSONField = {
  tokenAddress: ToJSON<ExternalAddress>
  tokenChain: number
  nativeDecimals: number
  symbol: string
  name: string
}

export type AssetMetaJSON = {
  $typeName: typeof AssetMeta.$typeName
  $typeArgs: []
} & AssetMetaJSONField

/**
 * Container that warehouses asset metadata information. This struct is
 * used only by `attest_token` and `create_wrapped` modules.
 */
export class AssetMeta implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::asset_meta::AssetMeta` {
    return `${
      getTypeOrigin('token-bridge', 'asset_meta::AssetMeta')
    }::asset_meta::AssetMeta` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AssetMeta.$typeName = AssetMeta.$typeName
  readonly $fullTypeName: `${string}::asset_meta::AssetMeta`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AssetMeta.$isPhantom = AssetMeta.$isPhantom

  /** Address of the token. */
  readonly tokenAddress: ToField<ExternalAddress>
  /** Chain ID of the token. */
  readonly tokenChain: ToField<'u16'>
  /** Number of decimals of the token. */
  readonly nativeDecimals: ToField<'u8'>
  /**
   * Symbol of the token (UTF-8).
   * TODO(csongor): maybe turn these into String32s?
   */
  readonly symbol: ToField<String>
  /** Name of the token (UTF-8). */
  readonly name: ToField<String>

  private constructor(typeArgs: [], fields: AssetMetaFields) {
    this.$fullTypeName = composeSuiType(
      AssetMeta.$typeName,
      ...typeArgs,
    ) as `${string}::asset_meta::AssetMeta`
    this.$typeArgs = typeArgs

    this.tokenAddress = fields.tokenAddress
    this.tokenChain = fields.tokenChain
    this.nativeDecimals = fields.nativeDecimals
    this.symbol = fields.symbol
    this.name = fields.name
  }

  static reified(): AssetMetaReified {
    const reifiedBcs = AssetMeta.bcs
    return {
      get typeName() {
        return AssetMeta.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AssetMeta.$typeName,
          ...[],
        ) as `${string}::asset_meta::AssetMeta`
      },
      typeArgs: [] as [],
      isPhantom: AssetMeta.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AssetMeta.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AssetMeta.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AssetMeta.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AssetMeta.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AssetMeta.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AssetMeta.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AssetMeta.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AssetMeta.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AssetMeta.fetch(client, id),
      new: (fields: AssetMetaFields) => {
        return new AssetMeta([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AssetMetaReified {
    return AssetMeta.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AssetMeta>> {
    return phantom(AssetMeta.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AssetMeta>> {
    return AssetMeta.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AssetMeta', {
      token_address: ExternalAddress.bcs,
      token_chain: bcs.u16(),
      native_decimals: bcs.u8(),
      symbol: String.bcs,
      name: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AssetMeta.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AssetMeta.instantiateBcs> {
    if (!AssetMeta.cachedBcs) {
      AssetMeta.cachedBcs = AssetMeta.instantiateBcs()
    }
    return AssetMeta.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AssetMeta {
    return AssetMeta.reified().new({
      tokenAddress: decodeFromFields(ExternalAddress.reified(), fields.token_address),
      tokenChain: decodeFromFields('u16', fields.token_chain),
      nativeDecimals: decodeFromFields('u8', fields.native_decimals),
      symbol: decodeFromFields(String.reified(), fields.symbol),
      name: decodeFromFields(String.reified(), fields.name),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AssetMeta {
    if (!isAssetMeta(item.type)) {
      throw new Error('not a AssetMeta type')
    }

    return AssetMeta.reified().new({
      tokenAddress: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.token_address),
      tokenChain: decodeFromFieldsWithTypes('u16', item.fields.token_chain),
      nativeDecimals: decodeFromFieldsWithTypes('u8', item.fields.native_decimals),
      symbol: decodeFromFieldsWithTypes(String.reified(), item.fields.symbol),
      name: decodeFromFieldsWithTypes(String.reified(), item.fields.name),
    })
  }

  static fromBcs(data: Uint8Array): AssetMeta {
    return AssetMeta.fromFields(AssetMeta.bcs.parse(data))
  }

  toJSONField(): AssetMetaJSONField {
    return {
      tokenAddress: this.tokenAddress.toJSONField(),
      tokenChain: this.tokenChain,
      nativeDecimals: this.nativeDecimals,
      symbol: this.symbol,
      name: this.name,
    }
  }

  toJSON(): AssetMetaJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AssetMeta {
    return AssetMeta.reified().new({
      tokenAddress: decodeFromJSONField(ExternalAddress.reified(), field.tokenAddress),
      tokenChain: decodeFromJSONField('u16', field.tokenChain),
      nativeDecimals: decodeFromJSONField('u8', field.nativeDecimals),
      symbol: decodeFromJSONField(String.reified(), field.symbol),
      name: decodeFromJSONField(String.reified(), field.name),
    })
  }

  static fromJSON(json: Record<string, any>): AssetMeta {
    if (json.$typeName !== AssetMeta.$typeName) {
      throw new Error(
        `not a AssetMeta json object: expected '${AssetMeta.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AssetMeta.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AssetMeta {
    if (!isAssetMeta(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AssetMeta object`)
    }
    return AssetMeta.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AssetMeta.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AssetMeta {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAssetMeta(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AssetMeta object`)
    }
    return AssetMeta.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AssetMeta.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AssetMeta {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAssetMeta(data.bcs.type)) {
        throw new Error(`object at is not a AssetMeta object`)
      }

      return AssetMeta.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AssetMeta.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AssetMeta> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAssetMeta(object.type)) {
      throw new Error(`object at id ${id} is not a AssetMeta object`)
    }
    return AssetMeta.fromBcs(object.content)
  }
}
