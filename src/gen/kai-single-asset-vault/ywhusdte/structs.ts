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
import { PKG_V4 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== YWHUSDTE =============================== */

export function isYWHUSDTE(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::ywhusdte::YWHUSDTE`
}

export interface YWHUSDTEFields {
  dummyField: ToField<'bool'>
}

export type YWHUSDTEReified = Reified<YWHUSDTE, YWHUSDTEFields>

export class YWHUSDTE implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::ywhusdte::YWHUSDTE`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = YWHUSDTE.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::ywhusdte::YWHUSDTE`
  readonly $typeArgs: []
  readonly $isPhantom = YWHUSDTE.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: YWHUSDTEFields) {
    this.$fullTypeName = composeSuiType(
      YWHUSDTE.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::ywhusdte::YWHUSDTE`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): YWHUSDTEReified {
    return {
      typeName: YWHUSDTE.$typeName,
      fullTypeName: composeSuiType(
        YWHUSDTE.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::ywhusdte::YWHUSDTE`,
      typeArgs: [] as [],
      isPhantom: YWHUSDTE.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => YWHUSDTE.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => YWHUSDTE.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => YWHUSDTE.fromBcs(data),
      bcs: YWHUSDTE.bcs,
      fromJSONField: (field: any) => YWHUSDTE.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => YWHUSDTE.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => YWHUSDTE.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => YWHUSDTE.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => YWHUSDTE.fetch(client, id),
      new: (fields: YWHUSDTEFields) => {
        return new YWHUSDTE([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return YWHUSDTE.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<YWHUSDTE>> {
    return phantom(YWHUSDTE.reified())
  }
  static get p() {
    return YWHUSDTE.phantom()
  }

  static get bcs() {
    return bcs.struct('YWHUSDTE', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): YWHUSDTE {
    return YWHUSDTE.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): YWHUSDTE {
    if (!isYWHUSDTE(item.type)) {
      throw new Error('not a YWHUSDTE type')
    }

    return YWHUSDTE.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): YWHUSDTE {
    return YWHUSDTE.fromFields(YWHUSDTE.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): YWHUSDTE {
    return YWHUSDTE.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): YWHUSDTE {
    if (json.$typeName !== YWHUSDTE.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return YWHUSDTE.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): YWHUSDTE {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isYWHUSDTE(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a YWHUSDTE object`)
    }
    return YWHUSDTE.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): YWHUSDTE {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isYWHUSDTE(data.bcs.type)) {
        throw new Error(`object at is not a YWHUSDTE object`)
      }

      return YWHUSDTE.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return YWHUSDTE.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<YWHUSDTE> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching YWHUSDTE object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isYWHUSDTE(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a YWHUSDTE object`)
    }

    return YWHUSDTE.fromSuiObjectData(res.data)
  }
}
