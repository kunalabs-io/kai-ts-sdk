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

/* ============================== KLSUI =============================== */

export function isKLSUI(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::klsui::KLSUI`
}

export interface KLSUIFields {
  dummyField: ToField<'bool'>
}

export type KLSUIReified = Reified<KLSUI, KLSUIFields>

export class KLSUI implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::klsui::KLSUI`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = KLSUI.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::klsui::KLSUI`
  readonly $typeArgs: []
  readonly $isPhantom = KLSUI.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: KLSUIFields) {
    this.$fullTypeName = composeSuiType(
      KLSUI.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::klsui::KLSUI`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): KLSUIReified {
    return {
      typeName: KLSUI.$typeName,
      fullTypeName: composeSuiType(KLSUI.$typeName, ...[]) as `${typeof PKG_V1}::klsui::KLSUI`,
      typeArgs: [] as [],
      isPhantom: KLSUI.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => KLSUI.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => KLSUI.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => KLSUI.fromBcs(data),
      bcs: KLSUI.bcs,
      fromJSONField: (field: any) => KLSUI.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => KLSUI.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => KLSUI.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => KLSUI.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => KLSUI.fetch(client, id),
      new: (fields: KLSUIFields) => {
        return new KLSUI([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return KLSUI.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<KLSUI>> {
    return phantom(KLSUI.reified())
  }
  static get p() {
    return KLSUI.phantom()
  }

  static get bcs() {
    return bcs.struct('KLSUI', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): KLSUI {
    return KLSUI.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): KLSUI {
    if (!isKLSUI(item.type)) {
      throw new Error('not a KLSUI type')
    }

    return KLSUI.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): KLSUI {
    return KLSUI.fromFields(KLSUI.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): KLSUI {
    return KLSUI.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): KLSUI {
    if (json.$typeName !== KLSUI.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return KLSUI.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): KLSUI {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKLSUI(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a KLSUI object`)
    }
    return KLSUI.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): KLSUI {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKLSUI(data.bcs.type)) {
        throw new Error(`object at is not a KLSUI object`)
      }

      return KLSUI.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return KLSUI.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<KLSUI> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching KLSUI object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isKLSUI(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a KLSUI object`)
    }

    return KLSUI.fromSuiObjectData(res.data)
  }
}
