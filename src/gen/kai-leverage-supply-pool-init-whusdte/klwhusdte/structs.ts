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

/* ============================== KLWHUSDTE =============================== */

export function isKLWHUSDTE(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::klwhusdte::KLWHUSDTE`
}

export interface KLWHUSDTEFields {
  dummyField: ToField<'bool'>
}

export type KLWHUSDTEReified = Reified<KLWHUSDTE, KLWHUSDTEFields>

export class KLWHUSDTE implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::klwhusdte::KLWHUSDTE`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = KLWHUSDTE.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::klwhusdte::KLWHUSDTE`
  readonly $typeArgs: []
  readonly $isPhantom = KLWHUSDTE.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: KLWHUSDTEFields) {
    this.$fullTypeName = composeSuiType(
      KLWHUSDTE.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::klwhusdte::KLWHUSDTE`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): KLWHUSDTEReified {
    return {
      typeName: KLWHUSDTE.$typeName,
      fullTypeName: composeSuiType(
        KLWHUSDTE.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::klwhusdte::KLWHUSDTE`,
      typeArgs: [] as [],
      isPhantom: KLWHUSDTE.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => KLWHUSDTE.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => KLWHUSDTE.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => KLWHUSDTE.fromBcs(data),
      bcs: KLWHUSDTE.bcs,
      fromJSONField: (field: any) => KLWHUSDTE.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => KLWHUSDTE.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => KLWHUSDTE.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => KLWHUSDTE.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => KLWHUSDTE.fetch(client, id),
      new: (fields: KLWHUSDTEFields) => {
        return new KLWHUSDTE([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return KLWHUSDTE.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<KLWHUSDTE>> {
    return phantom(KLWHUSDTE.reified())
  }
  static get p() {
    return KLWHUSDTE.phantom()
  }

  static get bcs() {
    return bcs.struct('KLWHUSDTE', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): KLWHUSDTE {
    return KLWHUSDTE.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): KLWHUSDTE {
    if (!isKLWHUSDTE(item.type)) {
      throw new Error('not a KLWHUSDTE type')
    }

    return KLWHUSDTE.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): KLWHUSDTE {
    return KLWHUSDTE.fromFields(KLWHUSDTE.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): KLWHUSDTE {
    return KLWHUSDTE.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): KLWHUSDTE {
    if (json.$typeName !== KLWHUSDTE.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return KLWHUSDTE.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): KLWHUSDTE {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKLWHUSDTE(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a KLWHUSDTE object`)
    }
    return KLWHUSDTE.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): KLWHUSDTE {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKLWHUSDTE(data.bcs.type)) {
        throw new Error(`object at is not a KLWHUSDTE object`)
      }

      return KLWHUSDTE.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return KLWHUSDTE.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<KLWHUSDTE> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching KLWHUSDTE object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isKLWHUSDTE(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a KLWHUSDTE object`)
    }

    return KLWHUSDTE.fromSuiObjectData(res.data)
  }
}
