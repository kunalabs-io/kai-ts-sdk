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

/* ============================== USDT =============================== */

export function isUSDT(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::usdt::USDT`
}

export interface USDTFields {
  dummyField: ToField<'bool'>
}

export type USDTReified = Reified<USDT, USDTFields>

export class USDT implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::usdt::USDT`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = USDT.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::usdt::USDT`
  readonly $typeArgs: []
  readonly $isPhantom = USDT.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: USDTFields) {
    this.$fullTypeName = composeSuiType(
      USDT.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::usdt::USDT`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): USDTReified {
    const reifiedBcs = USDT.bcs
    return {
      typeName: USDT.$typeName,
      fullTypeName: composeSuiType(USDT.$typeName, ...[]) as `${typeof PKG_V1}::usdt::USDT`,
      typeArgs: [] as [],
      isPhantom: USDT.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => USDT.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => USDT.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => USDT.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => USDT.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => USDT.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => USDT.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => USDT.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => USDT.fetch(client, id),
      new: (fields: USDTFields) => {
        return new USDT([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return USDT.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<USDT>> {
    return phantom(USDT.reified())
  }
  static get p() {
    return USDT.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('USDT', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof USDT.instantiateBcs> | null = null

  static get bcs() {
    if (!USDT.cachedBcs) {
      USDT.cachedBcs = USDT.instantiateBcs()
    }
    return USDT.cachedBcs
  }

  static fromFields(fields: Record<string, any>): USDT {
    return USDT.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): USDT {
    if (!isUSDT(item.type)) {
      throw new Error('not a USDT type')
    }

    return USDT.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): USDT {
    return USDT.fromFields(USDT.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): USDT {
    return USDT.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): USDT {
    if (json.$typeName !== USDT.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return USDT.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): USDT {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUSDT(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a USDT object`)
    }
    return USDT.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): USDT {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUSDT(data.bcs.type)) {
        throw new Error(`object at is not a USDT object`)
      }

      return USDT.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return USDT.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<USDT> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching USDT object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUSDT(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a USDT object`)
    }

    return USDT.fromSuiObjectData(res.data)
  }
}
