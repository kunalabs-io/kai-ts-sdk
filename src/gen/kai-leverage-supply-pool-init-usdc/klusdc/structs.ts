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

/* ============================== KLUSDC =============================== */

export function isKLUSDC(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::klusdc::KLUSDC`
}

export interface KLUSDCFields {
  dummyField: ToField<'bool'>
}

export type KLUSDCReified = Reified<KLUSDC, KLUSDCFields>

export class KLUSDC implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::klusdc::KLUSDC`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = KLUSDC.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::klusdc::KLUSDC`
  readonly $typeArgs: []
  readonly $isPhantom = KLUSDC.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: KLUSDCFields) {
    this.$fullTypeName = composeSuiType(
      KLUSDC.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::klusdc::KLUSDC`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): KLUSDCReified {
    return {
      typeName: KLUSDC.$typeName,
      fullTypeName: composeSuiType(KLUSDC.$typeName, ...[]) as `${typeof PKG_V1}::klusdc::KLUSDC`,
      typeArgs: [] as [],
      isPhantom: KLUSDC.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => KLUSDC.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => KLUSDC.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => KLUSDC.fromBcs(data),
      bcs: KLUSDC.bcs,
      fromJSONField: (field: any) => KLUSDC.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => KLUSDC.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => KLUSDC.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => KLUSDC.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => KLUSDC.fetch(client, id),
      new: (fields: KLUSDCFields) => {
        return new KLUSDC([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return KLUSDC.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<KLUSDC>> {
    return phantom(KLUSDC.reified())
  }
  static get p() {
    return KLUSDC.phantom()
  }

  static get bcs() {
    return bcs.struct('KLUSDC', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): KLUSDC {
    return KLUSDC.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): KLUSDC {
    if (!isKLUSDC(item.type)) {
      throw new Error('not a KLUSDC type')
    }

    return KLUSDC.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): KLUSDC {
    return KLUSDC.fromFields(KLUSDC.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): KLUSDC {
    return KLUSDC.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): KLUSDC {
    if (json.$typeName !== KLUSDC.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return KLUSDC.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): KLUSDC {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKLUSDC(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a KLUSDC object`)
    }
    return KLUSDC.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): KLUSDC {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKLUSDC(data.bcs.type)) {
        throw new Error(`object at is not a KLUSDC object`)
      }

      return KLUSDC.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return KLUSDC.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<KLUSDC> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching KLUSDC object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isKLUSDC(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a KLUSDC object`)
    }

    return KLUSDC.fromSuiObjectData(res.data)
  }
}
