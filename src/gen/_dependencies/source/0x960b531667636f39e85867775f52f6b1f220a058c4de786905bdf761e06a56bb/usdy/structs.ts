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

/* ============================== USDY =============================== */

export function isUSDY(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::usdy::USDY`
}

export interface USDYFields {
  dummyField: ToField<'bool'>
}

export type USDYReified = Reified<USDY, USDYFields>

export class USDY implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::usdy::USDY`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = USDY.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::usdy::USDY`
  readonly $typeArgs: []
  readonly $isPhantom = USDY.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: USDYFields) {
    this.$fullTypeName = composeSuiType(
      USDY.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::usdy::USDY`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): USDYReified {
    return {
      typeName: USDY.$typeName,
      fullTypeName: composeSuiType(USDY.$typeName, ...[]) as `${typeof PKG_V1}::usdy::USDY`,
      typeArgs: [] as [],
      isPhantom: USDY.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => USDY.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => USDY.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => USDY.fromBcs(data),
      bcs: USDY.bcs,
      fromJSONField: (field: any) => USDY.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => USDY.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => USDY.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => USDY.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => USDY.fetch(client, id),
      new: (fields: USDYFields) => {
        return new USDY([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return USDY.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<USDY>> {
    return phantom(USDY.reified())
  }
  static get p() {
    return USDY.phantom()
  }

  static get bcs() {
    return bcs.struct('USDY', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): USDY {
    return USDY.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): USDY {
    if (!isUSDY(item.type)) {
      throw new Error('not a USDY type')
    }

    return USDY.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): USDY {
    return USDY.fromFields(USDY.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): USDY {
    return USDY.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): USDY {
    if (json.$typeName !== USDY.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return USDY.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): USDY {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUSDY(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a USDY object`)
    }
    return USDY.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): USDY {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUSDY(data.bcs.type)) {
        throw new Error(`object at is not a USDY object`)
      }

      return USDY.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return USDY.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<USDY> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching USDY object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUSDY(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a USDY object`)
    }

    return USDY.fromSuiObjectData(res.data)
  }
}
