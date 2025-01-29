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

/* ============================== YUSDC =============================== */

export function isYUSDC(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::yusdc::YUSDC`
}

export interface YUSDCFields {
  dummyField: ToField<'bool'>
}

export type YUSDCReified = Reified<YUSDC, YUSDCFields>

export class YUSDC implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::yusdc::YUSDC`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = YUSDC.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::yusdc::YUSDC`
  readonly $typeArgs: []
  readonly $isPhantom = YUSDC.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: YUSDCFields) {
    this.$fullTypeName = composeSuiType(
      YUSDC.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::yusdc::YUSDC`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): YUSDCReified {
    return {
      typeName: YUSDC.$typeName,
      fullTypeName: composeSuiType(YUSDC.$typeName, ...[]) as `${typeof PKG_V1}::yusdc::YUSDC`,
      typeArgs: [] as [],
      isPhantom: YUSDC.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => YUSDC.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => YUSDC.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => YUSDC.fromBcs(data),
      bcs: YUSDC.bcs,
      fromJSONField: (field: any) => YUSDC.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => YUSDC.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => YUSDC.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => YUSDC.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => YUSDC.fetch(client, id),
      new: (fields: YUSDCFields) => {
        return new YUSDC([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return YUSDC.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<YUSDC>> {
    return phantom(YUSDC.reified())
  }
  static get p() {
    return YUSDC.phantom()
  }

  static get bcs() {
    return bcs.struct('YUSDC', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): YUSDC {
    return YUSDC.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): YUSDC {
    if (!isYUSDC(item.type)) {
      throw new Error('not a YUSDC type')
    }

    return YUSDC.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): YUSDC {
    return YUSDC.fromFields(YUSDC.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): YUSDC {
    return YUSDC.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): YUSDC {
    if (json.$typeName !== YUSDC.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return YUSDC.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): YUSDC {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isYUSDC(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a YUSDC object`)
    }
    return YUSDC.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): YUSDC {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isYUSDC(data.bcs.type)) {
        throw new Error(`object at is not a YUSDC object`)
      }

      return YUSDC.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return YUSDC.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<YUSDC> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching YUSDC object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isYUSDC(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a YUSDC object`)
    }

    return YUSDC.fromSuiObjectData(res.data)
  }
}
