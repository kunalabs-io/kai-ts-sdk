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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== YWHUSDCE =============================== */

export function isYWHUSDCE(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::ywhusdce::YWHUSDCE`
}

export interface YWHUSDCEFields {
  dummyField: ToField<'bool'>
}

export type YWHUSDCEReified = Reified<YWHUSDCE, YWHUSDCEFields>

export class YWHUSDCE implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::ywhusdce::YWHUSDCE`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = YWHUSDCE.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::ywhusdce::YWHUSDCE`
  readonly $typeArgs: []
  readonly $isPhantom = YWHUSDCE.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: YWHUSDCEFields) {
    this.$fullTypeName = composeSuiType(
      YWHUSDCE.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::ywhusdce::YWHUSDCE`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): YWHUSDCEReified {
    return {
      typeName: YWHUSDCE.$typeName,
      fullTypeName: composeSuiType(
        YWHUSDCE.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::ywhusdce::YWHUSDCE`,
      typeArgs: [] as [],
      isPhantom: YWHUSDCE.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => YWHUSDCE.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => YWHUSDCE.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => YWHUSDCE.fromBcs(data),
      bcs: YWHUSDCE.bcs,
      fromJSONField: (field: any) => YWHUSDCE.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => YWHUSDCE.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => YWHUSDCE.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => YWHUSDCE.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => YWHUSDCE.fetch(client, id),
      new: (fields: YWHUSDCEFields) => {
        return new YWHUSDCE([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return YWHUSDCE.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<YWHUSDCE>> {
    return phantom(YWHUSDCE.reified())
  }
  static get p() {
    return YWHUSDCE.phantom()
  }

  static get bcs() {
    return bcs.struct('YWHUSDCE', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): YWHUSDCE {
    return YWHUSDCE.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): YWHUSDCE {
    if (!isYWHUSDCE(item.type)) {
      throw new Error('not a YWHUSDCE type')
    }

    return YWHUSDCE.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): YWHUSDCE {
    return YWHUSDCE.fromFields(YWHUSDCE.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): YWHUSDCE {
    return YWHUSDCE.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): YWHUSDCE {
    if (json.$typeName !== YWHUSDCE.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return YWHUSDCE.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): YWHUSDCE {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isYWHUSDCE(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a YWHUSDCE object`)
    }
    return YWHUSDCE.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): YWHUSDCE {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isYWHUSDCE(data.bcs.type)) {
        throw new Error(`object at is not a YWHUSDCE object`)
      }

      return YWHUSDCE.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return YWHUSDCE.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<YWHUSDCE> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching YWHUSDCE object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isYWHUSDCE(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a YWHUSDCE object`)
    }

    return YWHUSDCE.fromSuiObjectData(res.data)
  }
}
