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

/* ============================== KLSUIUSDT =============================== */

export function isKLSUIUSDT(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::klsuiusdt::KLSUIUSDT`
}

export interface KLSUIUSDTFields {
  dummyField: ToField<'bool'>
}

export type KLSUIUSDTReified = Reified<KLSUIUSDT, KLSUIUSDTFields>

export class KLSUIUSDT implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::klsuiusdt::KLSUIUSDT`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = KLSUIUSDT.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::klsuiusdt::KLSUIUSDT`
  readonly $typeArgs: []
  readonly $isPhantom = KLSUIUSDT.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: KLSUIUSDTFields) {
    this.$fullTypeName = composeSuiType(
      KLSUIUSDT.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::klsuiusdt::KLSUIUSDT`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): KLSUIUSDTReified {
    return {
      typeName: KLSUIUSDT.$typeName,
      fullTypeName: composeSuiType(
        KLSUIUSDT.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::klsuiusdt::KLSUIUSDT`,
      typeArgs: [] as [],
      isPhantom: KLSUIUSDT.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => KLSUIUSDT.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => KLSUIUSDT.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => KLSUIUSDT.fromBcs(data),
      bcs: KLSUIUSDT.bcs,
      fromJSONField: (field: any) => KLSUIUSDT.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => KLSUIUSDT.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => KLSUIUSDT.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => KLSUIUSDT.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => KLSUIUSDT.fetch(client, id),
      new: (fields: KLSUIUSDTFields) => {
        return new KLSUIUSDT([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return KLSUIUSDT.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<KLSUIUSDT>> {
    return phantom(KLSUIUSDT.reified())
  }
  static get p() {
    return KLSUIUSDT.phantom()
  }

  static get bcs() {
    return bcs.struct('KLSUIUSDT', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): KLSUIUSDT {
    return KLSUIUSDT.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): KLSUIUSDT {
    if (!isKLSUIUSDT(item.type)) {
      throw new Error('not a KLSUIUSDT type')
    }

    return KLSUIUSDT.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): KLSUIUSDT {
    return KLSUIUSDT.fromFields(KLSUIUSDT.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): KLSUIUSDT {
    return KLSUIUSDT.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): KLSUIUSDT {
    if (json.$typeName !== KLSUIUSDT.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return KLSUIUSDT.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): KLSUIUSDT {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKLSUIUSDT(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a KLSUIUSDT object`)
    }
    return KLSUIUSDT.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): KLSUIUSDT {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKLSUIUSDT(data.bcs.type)) {
        throw new Error(`object at is not a KLSUIUSDT object`)
      }

      return KLSUIUSDT.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return KLSUIUSDT.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<KLSUIUSDT> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching KLSUIUSDT object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isKLSUIUSDT(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a KLSUIUSDT object`)
    }

    return KLSUIUSDT.fromSuiObjectData(res.data)
  }
}
