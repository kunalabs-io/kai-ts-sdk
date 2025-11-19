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

/* ============================== I32 =============================== */

export function isI32(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::i32::I32`
}

export interface I32Fields {
  bits: ToField<'u32'>
}

export type I32Reified = Reified<I32, I32Fields>

export class I32 implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::i32::I32`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = I32.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::i32::I32`
  readonly $typeArgs: []
  readonly $isPhantom = I32.$isPhantom

  readonly bits: ToField<'u32'>

  private constructor(typeArgs: [], fields: I32Fields) {
    this.$fullTypeName = composeSuiType(I32.$typeName, ...typeArgs) as `${typeof PKG_V1}::i32::I32`
    this.$typeArgs = typeArgs

    this.bits = fields.bits
  }

  static reified(): I32Reified {
    const reifiedBcs = I32.bcs
    return {
      typeName: I32.$typeName,
      fullTypeName: composeSuiType(I32.$typeName, ...[]) as `${typeof PKG_V1}::i32::I32`,
      typeArgs: [] as [],
      isPhantom: I32.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => I32.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => I32.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => I32.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => I32.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => I32.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => I32.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => I32.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => I32.fetch(client, id),
      new: (fields: I32Fields) => {
        return new I32([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return I32.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<I32>> {
    return phantom(I32.reified())
  }
  static get p() {
    return I32.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('I32', {
      bits: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof I32.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof I32.instantiateBcs> {
    if (!I32.cachedBcs) {
      I32.cachedBcs = I32.instantiateBcs()
    }
    return I32.cachedBcs
  }

  static fromFields(fields: Record<string, any>): I32 {
    return I32.reified().new({ bits: decodeFromFields('u32', fields.bits) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): I32 {
    if (!isI32(item.type)) {
      throw new Error('not a I32 type')
    }

    return I32.reified().new({ bits: decodeFromFieldsWithTypes('u32', item.fields.bits) })
  }

  static fromBcs(data: Uint8Array): I32 {
    return I32.fromFields(I32.bcs.parse(data))
  }

  toJSONField() {
    return {
      bits: this.bits,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): I32 {
    return I32.reified().new({ bits: decodeFromJSONField('u32', field.bits) })
  }

  static fromJSON(json: Record<string, any>): I32 {
    if (json.$typeName !== I32.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return I32.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): I32 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isI32(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a I32 object`)
    }
    return I32.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): I32 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isI32(data.bcs.type)) {
        throw new Error(`object at is not a I32 object`)
      }

      return I32.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return I32.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<I32> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching I32 object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isI32(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a I32 object`)
    }

    return I32.fromSuiObjectData(res.data)
  }
}
