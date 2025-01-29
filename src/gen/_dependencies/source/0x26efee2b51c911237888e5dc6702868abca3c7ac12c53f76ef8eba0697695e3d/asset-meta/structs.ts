import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { String } from '../../../../move-stdlib/string/structs'
import { ExternalAddress } from '../../0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a/external-address/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== AssetMeta =============================== */

export function isAssetMeta(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::asset_meta::AssetMeta`
}

export interface AssetMetaFields {
  tokenAddress: ToField<ExternalAddress>
  tokenChain: ToField<'u16'>
  nativeDecimals: ToField<'u8'>
  symbol: ToField<String>
  name: ToField<String>
}

export type AssetMetaReified = Reified<AssetMeta, AssetMetaFields>

export class AssetMeta implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::asset_meta::AssetMeta`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AssetMeta.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::asset_meta::AssetMeta`
  readonly $typeArgs: []
  readonly $isPhantom = AssetMeta.$isPhantom

  readonly tokenAddress: ToField<ExternalAddress>
  readonly tokenChain: ToField<'u16'>
  readonly nativeDecimals: ToField<'u8'>
  readonly symbol: ToField<String>
  readonly name: ToField<String>

  private constructor(typeArgs: [], fields: AssetMetaFields) {
    this.$fullTypeName = composeSuiType(
      AssetMeta.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::asset_meta::AssetMeta`
    this.$typeArgs = typeArgs

    this.tokenAddress = fields.tokenAddress
    this.tokenChain = fields.tokenChain
    this.nativeDecimals = fields.nativeDecimals
    this.symbol = fields.symbol
    this.name = fields.name
  }

  static reified(): AssetMetaReified {
    return {
      typeName: AssetMeta.$typeName,
      fullTypeName: composeSuiType(
        AssetMeta.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::asset_meta::AssetMeta`,
      typeArgs: [] as [],
      isPhantom: AssetMeta.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AssetMeta.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AssetMeta.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AssetMeta.fromBcs(data),
      bcs: AssetMeta.bcs,
      fromJSONField: (field: any) => AssetMeta.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AssetMeta.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AssetMeta.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AssetMeta.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AssetMeta.fetch(client, id),
      new: (fields: AssetMetaFields) => {
        return new AssetMeta([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AssetMeta.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AssetMeta>> {
    return phantom(AssetMeta.reified())
  }
  static get p() {
    return AssetMeta.phantom()
  }

  static get bcs() {
    return bcs.struct('AssetMeta', {
      token_address: ExternalAddress.bcs,
      token_chain: bcs.u16(),
      native_decimals: bcs.u8(),
      symbol: String.bcs,
      name: String.bcs,
    })
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

  toJSONField() {
    return {
      tokenAddress: this.tokenAddress.toJSONField(),
      tokenChain: this.tokenChain,
      nativeDecimals: this.nativeDecimals,
      symbol: this.symbol,
      name: this.name,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return AssetMeta.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AssetMeta {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAssetMeta(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AssetMeta object`)
    }
    return AssetMeta.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AssetMeta {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAssetMeta(data.bcs.type)) {
        throw new Error(`object at is not a AssetMeta object`)
      }

      return AssetMeta.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AssetMeta.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AssetMeta> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AssetMeta object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAssetMeta(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AssetMeta object`)
    }

    return AssetMeta.fromSuiObjectData(res.data)
  }
}
