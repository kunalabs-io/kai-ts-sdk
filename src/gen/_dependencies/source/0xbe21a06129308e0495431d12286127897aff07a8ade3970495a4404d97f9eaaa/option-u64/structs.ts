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
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== OptionU64 =============================== */

export function isOptionU64(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::option_u64::OptionU64`
}

export interface OptionU64Fields {
  isNone: ToField<'bool'>
  v: ToField<'u64'>
}

export type OptionU64Reified = Reified<OptionU64, OptionU64Fields>

export class OptionU64 implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::option_u64::OptionU64`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = OptionU64.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::option_u64::OptionU64`
  readonly $typeArgs: []
  readonly $isPhantom = OptionU64.$isPhantom

  readonly isNone: ToField<'bool'>
  readonly v: ToField<'u64'>

  private constructor(typeArgs: [], fields: OptionU64Fields) {
    this.$fullTypeName = composeSuiType(
      OptionU64.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::option_u64::OptionU64`
    this.$typeArgs = typeArgs

    this.isNone = fields.isNone
    this.v = fields.v
  }

  static reified(): OptionU64Reified {
    return {
      typeName: OptionU64.$typeName,
      fullTypeName: composeSuiType(
        OptionU64.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::option_u64::OptionU64`,
      typeArgs: [] as [],
      isPhantom: OptionU64.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OptionU64.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OptionU64.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OptionU64.fromBcs(data),
      bcs: OptionU64.bcs,
      fromJSONField: (field: any) => OptionU64.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OptionU64.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => OptionU64.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => OptionU64.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => OptionU64.fetch(client, id),
      new: (fields: OptionU64Fields) => {
        return new OptionU64([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OptionU64.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OptionU64>> {
    return phantom(OptionU64.reified())
  }
  static get p() {
    return OptionU64.phantom()
  }

  static get bcs() {
    return bcs.struct('OptionU64', {
      is_none: bcs.bool(),
      v: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): OptionU64 {
    return OptionU64.reified().new({
      isNone: decodeFromFields('bool', fields.is_none),
      v: decodeFromFields('u64', fields.v),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OptionU64 {
    if (!isOptionU64(item.type)) {
      throw new Error('not a OptionU64 type')
    }

    return OptionU64.reified().new({
      isNone: decodeFromFieldsWithTypes('bool', item.fields.is_none),
      v: decodeFromFieldsWithTypes('u64', item.fields.v),
    })
  }

  static fromBcs(data: Uint8Array): OptionU64 {
    return OptionU64.fromFields(OptionU64.bcs.parse(data))
  }

  toJSONField() {
    return {
      isNone: this.isNone,
      v: this.v.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OptionU64 {
    return OptionU64.reified().new({
      isNone: decodeFromJSONField('bool', field.isNone),
      v: decodeFromJSONField('u64', field.v),
    })
  }

  static fromJSON(json: Record<string, any>): OptionU64 {
    if (json.$typeName !== OptionU64.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return OptionU64.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): OptionU64 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOptionU64(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OptionU64 object`)
    }
    return OptionU64.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): OptionU64 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOptionU64(data.bcs.type)) {
        throw new Error(`object at is not a OptionU64 object`)
      }

      return OptionU64.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OptionU64.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<OptionU64> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching OptionU64 object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isOptionU64(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a OptionU64 object`)
    }

    return OptionU64.fromSuiObjectData(res.data)
  }
}
