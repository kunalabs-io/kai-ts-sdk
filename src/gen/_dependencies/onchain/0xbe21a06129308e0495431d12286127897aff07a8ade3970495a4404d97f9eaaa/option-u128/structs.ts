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

/* ============================== OptionU128 =============================== */

export function isOptionU128(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::option_u128::OptionU128`
}

export interface OptionU128Fields {
  isNone: ToField<'bool'>
  v: ToField<'u128'>
}

export type OptionU128Reified = Reified<OptionU128, OptionU128Fields>

export class OptionU128 implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::option_u128::OptionU128`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = OptionU128.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::option_u128::OptionU128`
  readonly $typeArgs: []
  readonly $isPhantom = OptionU128.$isPhantom

  readonly isNone: ToField<'bool'>
  readonly v: ToField<'u128'>

  private constructor(typeArgs: [], fields: OptionU128Fields) {
    this.$fullTypeName = composeSuiType(
      OptionU128.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::option_u128::OptionU128`
    this.$typeArgs = typeArgs

    this.isNone = fields.isNone
    this.v = fields.v
  }

  static reified(): OptionU128Reified {
    const reifiedBcs = OptionU128.bcs
    return {
      typeName: OptionU128.$typeName,
      fullTypeName: composeSuiType(
        OptionU128.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::option_u128::OptionU128`,
      typeArgs: [] as [],
      isPhantom: OptionU128.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OptionU128.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OptionU128.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OptionU128.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OptionU128.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OptionU128.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => OptionU128.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => OptionU128.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => OptionU128.fetch(client, id),
      new: (fields: OptionU128Fields) => {
        return new OptionU128([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OptionU128.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OptionU128>> {
    return phantom(OptionU128.reified())
  }
  static get p() {
    return OptionU128.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OptionU128', {
      is_none: bcs.bool(),
      v: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof OptionU128.instantiateBcs> | null = null

  static get bcs() {
    if (!OptionU128.cachedBcs) {
      OptionU128.cachedBcs = OptionU128.instantiateBcs()
    }
    return OptionU128.cachedBcs
  }

  static fromFields(fields: Record<string, any>): OptionU128 {
    return OptionU128.reified().new({
      isNone: decodeFromFields('bool', fields.is_none),
      v: decodeFromFields('u128', fields.v),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OptionU128 {
    if (!isOptionU128(item.type)) {
      throw new Error('not a OptionU128 type')
    }

    return OptionU128.reified().new({
      isNone: decodeFromFieldsWithTypes('bool', item.fields.is_none),
      v: decodeFromFieldsWithTypes('u128', item.fields.v),
    })
  }

  static fromBcs(data: Uint8Array): OptionU128 {
    return OptionU128.fromFields(OptionU128.bcs.parse(data))
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

  static fromJSONField(field: any): OptionU128 {
    return OptionU128.reified().new({
      isNone: decodeFromJSONField('bool', field.isNone),
      v: decodeFromJSONField('u128', field.v),
    })
  }

  static fromJSON(json: Record<string, any>): OptionU128 {
    if (json.$typeName !== OptionU128.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return OptionU128.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): OptionU128 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOptionU128(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OptionU128 object`)
    }
    return OptionU128.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): OptionU128 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOptionU128(data.bcs.type)) {
        throw new Error(`object at is not a OptionU128 object`)
      }

      return OptionU128.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OptionU128.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<OptionU128> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching OptionU128 object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isOptionU128(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a OptionU128 object`)
    }

    return OptionU128.fromSuiObjectData(res.data)
  }
}
