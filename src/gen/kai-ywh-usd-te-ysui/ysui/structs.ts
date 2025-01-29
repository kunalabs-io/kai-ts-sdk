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

/* ============================== YSUI =============================== */

export function isYSUI(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::ysui::YSUI`
}

export interface YSUIFields {
  dummyField: ToField<'bool'>
}

export type YSUIReified = Reified<YSUI, YSUIFields>

export class YSUI implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::ysui::YSUI`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = YSUI.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::ysui::YSUI`
  readonly $typeArgs: []
  readonly $isPhantom = YSUI.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: YSUIFields) {
    this.$fullTypeName = composeSuiType(
      YSUI.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::ysui::YSUI`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): YSUIReified {
    return {
      typeName: YSUI.$typeName,
      fullTypeName: composeSuiType(YSUI.$typeName, ...[]) as `${typeof PKG_V1}::ysui::YSUI`,
      typeArgs: [] as [],
      isPhantom: YSUI.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => YSUI.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => YSUI.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => YSUI.fromBcs(data),
      bcs: YSUI.bcs,
      fromJSONField: (field: any) => YSUI.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => YSUI.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => YSUI.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => YSUI.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => YSUI.fetch(client, id),
      new: (fields: YSUIFields) => {
        return new YSUI([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return YSUI.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<YSUI>> {
    return phantom(YSUI.reified())
  }
  static get p() {
    return YSUI.phantom()
  }

  static get bcs() {
    return bcs.struct('YSUI', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): YSUI {
    return YSUI.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): YSUI {
    if (!isYSUI(item.type)) {
      throw new Error('not a YSUI type')
    }

    return YSUI.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): YSUI {
    return YSUI.fromFields(YSUI.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): YSUI {
    return YSUI.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): YSUI {
    if (json.$typeName !== YSUI.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return YSUI.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): YSUI {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isYSUI(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a YSUI object`)
    }
    return YSUI.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): YSUI {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isYSUI(data.bcs.type)) {
        throw new Error(`object at is not a YSUI object`)
      }

      return YSUI.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return YSUI.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<YSUI> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching YSUI object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isYSUI(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a YSUI object`)
    }

    return YSUI.fromSuiObjectData(res.data)
  }
}
