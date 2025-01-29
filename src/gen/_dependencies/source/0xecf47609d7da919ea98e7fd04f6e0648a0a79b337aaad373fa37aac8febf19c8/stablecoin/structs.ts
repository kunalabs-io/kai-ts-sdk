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

/* ============================== STABLECOIN =============================== */

export function isSTABLECOIN(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::stablecoin::STABLECOIN`
}

export interface STABLECOINFields {
  dummyField: ToField<'bool'>
}

export type STABLECOINReified = Reified<STABLECOIN, STABLECOINFields>

export class STABLECOIN implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::stablecoin::STABLECOIN`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = STABLECOIN.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::stablecoin::STABLECOIN`
  readonly $typeArgs: []
  readonly $isPhantom = STABLECOIN.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: STABLECOINFields) {
    this.$fullTypeName = composeSuiType(
      STABLECOIN.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::stablecoin::STABLECOIN`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): STABLECOINReified {
    return {
      typeName: STABLECOIN.$typeName,
      fullTypeName: composeSuiType(
        STABLECOIN.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::stablecoin::STABLECOIN`,
      typeArgs: [] as [],
      isPhantom: STABLECOIN.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => STABLECOIN.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => STABLECOIN.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => STABLECOIN.fromBcs(data),
      bcs: STABLECOIN.bcs,
      fromJSONField: (field: any) => STABLECOIN.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => STABLECOIN.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => STABLECOIN.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => STABLECOIN.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => STABLECOIN.fetch(client, id),
      new: (fields: STABLECOINFields) => {
        return new STABLECOIN([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return STABLECOIN.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<STABLECOIN>> {
    return phantom(STABLECOIN.reified())
  }
  static get p() {
    return STABLECOIN.phantom()
  }

  static get bcs() {
    return bcs.struct('STABLECOIN', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): STABLECOIN {
    return STABLECOIN.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): STABLECOIN {
    if (!isSTABLECOIN(item.type)) {
      throw new Error('not a STABLECOIN type')
    }

    return STABLECOIN.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): STABLECOIN {
    return STABLECOIN.fromFields(STABLECOIN.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): STABLECOIN {
    return STABLECOIN.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): STABLECOIN {
    if (json.$typeName !== STABLECOIN.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return STABLECOIN.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): STABLECOIN {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSTABLECOIN(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a STABLECOIN object`)
    }
    return STABLECOIN.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): STABLECOIN {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSTABLECOIN(data.bcs.type)) {
        throw new Error(`object at is not a STABLECOIN object`)
      }

      return STABLECOIN.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return STABLECOIN.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<STABLECOIN> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching STABLECOIN object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSTABLECOIN(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a STABLECOIN object`)
    }

    return STABLECOIN.fromSuiObjectData(res.data)
  }
}
