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

/* ============================== KLUSDY =============================== */

export function isKLUSDY(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::klusdy::KLUSDY`
}

export interface KLUSDYFields {
  dummyField: ToField<'bool'>
}

export type KLUSDYReified = Reified<KLUSDY, KLUSDYFields>

export class KLUSDY implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::klusdy::KLUSDY`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = KLUSDY.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::klusdy::KLUSDY`
  readonly $typeArgs: []
  readonly $isPhantom = KLUSDY.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: KLUSDYFields) {
    this.$fullTypeName = composeSuiType(
      KLUSDY.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::klusdy::KLUSDY`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): KLUSDYReified {
    return {
      typeName: KLUSDY.$typeName,
      fullTypeName: composeSuiType(KLUSDY.$typeName, ...[]) as `${typeof PKG_V1}::klusdy::KLUSDY`,
      typeArgs: [] as [],
      isPhantom: KLUSDY.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => KLUSDY.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => KLUSDY.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => KLUSDY.fromBcs(data),
      bcs: KLUSDY.bcs,
      fromJSONField: (field: any) => KLUSDY.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => KLUSDY.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => KLUSDY.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => KLUSDY.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => KLUSDY.fetch(client, id),
      new: (fields: KLUSDYFields) => {
        return new KLUSDY([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return KLUSDY.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<KLUSDY>> {
    return phantom(KLUSDY.reified())
  }
  static get p() {
    return KLUSDY.phantom()
  }

  static get bcs() {
    return bcs.struct('KLUSDY', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): KLUSDY {
    return KLUSDY.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): KLUSDY {
    if (!isKLUSDY(item.type)) {
      throw new Error('not a KLUSDY type')
    }

    return KLUSDY.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): KLUSDY {
    return KLUSDY.fromFields(KLUSDY.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): KLUSDY {
    return KLUSDY.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): KLUSDY {
    if (json.$typeName !== KLUSDY.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return KLUSDY.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): KLUSDY {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKLUSDY(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a KLUSDY object`)
    }
    return KLUSDY.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): KLUSDY {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKLUSDY(data.bcs.type)) {
        throw new Error(`object at is not a KLUSDY object`)
      }

      return KLUSDY.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return KLUSDY.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<KLUSDY> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching KLUSDY object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isKLUSDY(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a KLUSDY object`)
    }

    return KLUSDY.fromSuiObjectData(res.data)
  }
}
