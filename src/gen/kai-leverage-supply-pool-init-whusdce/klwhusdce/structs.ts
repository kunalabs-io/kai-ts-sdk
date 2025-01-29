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

/* ============================== KLWHUSDCE =============================== */

export function isKLWHUSDCE(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::klwhusdce::KLWHUSDCE`
}

export interface KLWHUSDCEFields {
  dummyField: ToField<'bool'>
}

export type KLWHUSDCEReified = Reified<KLWHUSDCE, KLWHUSDCEFields>

export class KLWHUSDCE implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::klwhusdce::KLWHUSDCE`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = KLWHUSDCE.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::klwhusdce::KLWHUSDCE`
  readonly $typeArgs: []
  readonly $isPhantom = KLWHUSDCE.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: KLWHUSDCEFields) {
    this.$fullTypeName = composeSuiType(
      KLWHUSDCE.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::klwhusdce::KLWHUSDCE`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): KLWHUSDCEReified {
    return {
      typeName: KLWHUSDCE.$typeName,
      fullTypeName: composeSuiType(
        KLWHUSDCE.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::klwhusdce::KLWHUSDCE`,
      typeArgs: [] as [],
      isPhantom: KLWHUSDCE.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => KLWHUSDCE.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => KLWHUSDCE.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => KLWHUSDCE.fromBcs(data),
      bcs: KLWHUSDCE.bcs,
      fromJSONField: (field: any) => KLWHUSDCE.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => KLWHUSDCE.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => KLWHUSDCE.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => KLWHUSDCE.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => KLWHUSDCE.fetch(client, id),
      new: (fields: KLWHUSDCEFields) => {
        return new KLWHUSDCE([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return KLWHUSDCE.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<KLWHUSDCE>> {
    return phantom(KLWHUSDCE.reified())
  }
  static get p() {
    return KLWHUSDCE.phantom()
  }

  static get bcs() {
    return bcs.struct('KLWHUSDCE', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): KLWHUSDCE {
    return KLWHUSDCE.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): KLWHUSDCE {
    if (!isKLWHUSDCE(item.type)) {
      throw new Error('not a KLWHUSDCE type')
    }

    return KLWHUSDCE.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): KLWHUSDCE {
    return KLWHUSDCE.fromFields(KLWHUSDCE.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): KLWHUSDCE {
    return KLWHUSDCE.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): KLWHUSDCE {
    if (json.$typeName !== KLWHUSDCE.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return KLWHUSDCE.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): KLWHUSDCE {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKLWHUSDCE(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a KLWHUSDCE object`)
    }
    return KLWHUSDCE.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): KLWHUSDCE {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKLWHUSDCE(data.bcs.type)) {
        throw new Error(`object at is not a KLWHUSDCE object`)
      }

      return KLWHUSDCE.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return KLWHUSDCE.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<KLWHUSDCE> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching KLWHUSDCE object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isKLWHUSDCE(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a KLWHUSDCE object`)
    }

    return KLWHUSDCE.fromSuiObjectData(res.data)
  }
}
