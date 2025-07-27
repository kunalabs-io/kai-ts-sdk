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

/* ============================== USDC =============================== */

export function isUSDC(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::usdc::USDC`
}

export interface USDCFields {
  dummyField: ToField<'bool'>
}

export type USDCReified = Reified<USDC, USDCFields>

export class USDC implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::usdc::USDC`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = USDC.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::usdc::USDC`
  readonly $typeArgs: []
  readonly $isPhantom = USDC.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: USDCFields) {
    this.$fullTypeName = composeSuiType(
      USDC.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::usdc::USDC`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): USDCReified {
    const reifiedBcs = USDC.bcs
    return {
      typeName: USDC.$typeName,
      fullTypeName: composeSuiType(USDC.$typeName, ...[]) as `${typeof PKG_V1}::usdc::USDC`,
      typeArgs: [] as [],
      isPhantom: USDC.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => USDC.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => USDC.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => USDC.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => USDC.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => USDC.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => USDC.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => USDC.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => USDC.fetch(client, id),
      new: (fields: USDCFields) => {
        return new USDC([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return USDC.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<USDC>> {
    return phantom(USDC.reified())
  }
  static get p() {
    return USDC.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('USDC', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof USDC.instantiateBcs> | null = null

  static get bcs() {
    if (!USDC.cachedBcs) {
      USDC.cachedBcs = USDC.instantiateBcs()
    }
    return USDC.cachedBcs
  }

  static fromFields(fields: Record<string, any>): USDC {
    return USDC.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): USDC {
    if (!isUSDC(item.type)) {
      throw new Error('not a USDC type')
    }

    return USDC.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): USDC {
    return USDC.fromFields(USDC.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): USDC {
    return USDC.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): USDC {
    if (json.$typeName !== USDC.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return USDC.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): USDC {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUSDC(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a USDC object`)
    }
    return USDC.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): USDC {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUSDC(data.bcs.type)) {
        throw new Error(`object at is not a USDC object`)
      }

      return USDC.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return USDC.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<USDC> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching USDC object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUSDC(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a USDC object`)
    }

    return USDC.fromSuiObjectData(res.data)
  }
}
