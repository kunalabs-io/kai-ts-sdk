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

/* ============================== COIN =============================== */

export function isCOIN(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::coin::COIN`
}

export interface COINFields {
  dummyField: ToField<'bool'>
}

export type COINReified = Reified<COIN, COINFields>

export class COIN implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::coin::COIN`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = COIN.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::coin::COIN`
  readonly $typeArgs: []
  readonly $isPhantom = COIN.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: COINFields) {
    this.$fullTypeName = composeSuiType(
      COIN.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::coin::COIN`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): COINReified {
    return {
      typeName: COIN.$typeName,
      fullTypeName: composeSuiType(COIN.$typeName, ...[]) as `${typeof PKG_V1}::coin::COIN`,
      typeArgs: [] as [],
      isPhantom: COIN.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => COIN.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => COIN.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => COIN.fromBcs(data),
      bcs: COIN.bcs,
      fromJSONField: (field: any) => COIN.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => COIN.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => COIN.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => COIN.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => COIN.fetch(client, id),
      new: (fields: COINFields) => {
        return new COIN([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return COIN.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<COIN>> {
    return phantom(COIN.reified())
  }
  static get p() {
    return COIN.phantom()
  }

  static get bcs() {
    return bcs.struct('COIN', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): COIN {
    return COIN.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): COIN {
    if (!isCOIN(item.type)) {
      throw new Error('not a COIN type')
    }

    return COIN.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): COIN {
    return COIN.fromFields(COIN.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): COIN {
    return COIN.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): COIN {
    if (json.$typeName !== COIN.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return COIN.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): COIN {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCOIN(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a COIN object`)
    }
    return COIN.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): COIN {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCOIN(data.bcs.type)) {
        throw new Error(`object at is not a COIN object`)
      }

      return COIN.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return COIN.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<COIN> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching COIN object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCOIN(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a COIN object`)
    }

    return COIN.fromSuiObjectData(res.data)
  }
}
