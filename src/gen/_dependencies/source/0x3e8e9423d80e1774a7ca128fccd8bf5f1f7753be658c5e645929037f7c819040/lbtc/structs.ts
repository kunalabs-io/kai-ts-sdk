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

/* ============================== LBTC =============================== */

export function isLBTC(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::lbtc::LBTC`
}

export interface LBTCFields {
  dummyField: ToField<'bool'>
}

export type LBTCReified = Reified<LBTC, LBTCFields>

export class LBTC implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::lbtc::LBTC`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LBTC.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::lbtc::LBTC`
  readonly $typeArgs: []
  readonly $isPhantom = LBTC.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: LBTCFields) {
    this.$fullTypeName = composeSuiType(
      LBTC.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::lbtc::LBTC`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): LBTCReified {
    const reifiedBcs = LBTC.bcs
    return {
      typeName: LBTC.$typeName,
      fullTypeName: composeSuiType(LBTC.$typeName, ...[]) as `${typeof PKG_V1}::lbtc::LBTC`,
      typeArgs: [] as [],
      isPhantom: LBTC.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LBTC.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LBTC.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LBTC.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LBTC.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LBTC.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => LBTC.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LBTC.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => LBTC.fetch(client, id),
      new: (fields: LBTCFields) => {
        return new LBTC([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LBTC.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LBTC>> {
    return phantom(LBTC.reified())
  }
  static get p() {
    return LBTC.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LBTC', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof LBTC.instantiateBcs> | null = null

  static get bcs() {
    if (!LBTC.cachedBcs) {
      LBTC.cachedBcs = LBTC.instantiateBcs()
    }
    return LBTC.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LBTC {
    return LBTC.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LBTC {
    if (!isLBTC(item.type)) {
      throw new Error('not a LBTC type')
    }

    return LBTC.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): LBTC {
    return LBTC.fromFields(LBTC.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LBTC {
    return LBTC.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): LBTC {
    if (json.$typeName !== LBTC.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return LBTC.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LBTC {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLBTC(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LBTC object`)
    }
    return LBTC.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LBTC {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLBTC(data.bcs.type)) {
        throw new Error(`object at is not a LBTC object`)
      }

      return LBTC.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LBTC.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LBTC> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching LBTC object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLBTC(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a LBTC object`)
    }

    return LBTC.fromSuiObjectData(res.data)
  }
}
