import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'

/* ============================== I64 =============================== */

export function isI64(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth', 'i64::I64')}::i64::I64`
}

export interface I64Fields {
  negative: ToField<'bool'>
  magnitude: ToField<'u64'>
}

export type I64Reified = Reified<I64, I64Fields>

export type I64JSONField = {
  negative: boolean
  magnitude: string
}

export type I64JSON = {
  $typeName: typeof I64.$typeName
  $typeArgs: []
} & I64JSONField

/**
 * As Move does not support negative numbers natively, we use our own internal
 * representation.
 *
 * To consume these values, first call `get_is_negative()` to determine if the I64
 * represents a negative or positive value. Then call `get_magnitude_if_positive()` or
 * `get_magnitude_if_negative()` to get the magnitude of the number in unsigned u64 format.
 * This API forces consumers to handle positive and negative numbers safely.
 */
export class I64 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::i64::I64` {
    return `${getTypeOrigin('pyth', 'i64::I64')}::i64::I64` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof I64.$typeName = I64.$typeName
  readonly $fullTypeName: `${string}::i64::I64`
  readonly $typeArgs: []
  readonly $isPhantom: typeof I64.$isPhantom = I64.$isPhantom

  readonly negative: ToField<'bool'>
  readonly magnitude: ToField<'u64'>

  private constructor(typeArgs: [], fields: I64Fields) {
    this.$fullTypeName = composeSuiType(
      I64.$typeName,
      ...typeArgs,
    ) as `${string}::i64::I64`
    this.$typeArgs = typeArgs

    this.negative = fields.negative
    this.magnitude = fields.magnitude
  }

  static reified(): I64Reified {
    const reifiedBcs = I64.bcs
    return {
      get typeName() {
        return I64.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          I64.$typeName,
          ...[],
        ) as `${string}::i64::I64`
      },
      typeArgs: [] as [],
      isPhantom: I64.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => I64.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => I64.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => I64.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => I64.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => I64.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => I64.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => I64.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => I64.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => I64.fetch(client, id),
      new: (fields: I64Fields) => {
        return new I64([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): I64Reified {
    return I64.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<I64>> {
    return phantom(I64.reified())
  }

  static get p(): PhantomReified<ToTypeStr<I64>> {
    return I64.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('I64', {
      negative: bcs.bool(),
      magnitude: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof I64.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof I64.instantiateBcs> {
    if (!I64.cachedBcs) {
      I64.cachedBcs = I64.instantiateBcs()
    }
    return I64.cachedBcs
  }

  static fromFields(fields: Record<string, any>): I64 {
    return I64.reified().new({
      negative: decodeFromFields('bool', fields.negative),
      magnitude: decodeFromFields('u64', fields.magnitude),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): I64 {
    if (!isI64(item.type)) {
      throw new Error('not a I64 type')
    }

    return I64.reified().new({
      negative: decodeFromFieldsWithTypes('bool', item.fields.negative),
      magnitude: decodeFromFieldsWithTypes('u64', item.fields.magnitude),
    })
  }

  static fromBcs(data: Uint8Array): I64 {
    return I64.fromFields(I64.bcs.parse(data))
  }

  toJSONField(): I64JSONField {
    return {
      negative: this.negative,
      magnitude: this.magnitude.toString(),
    }
  }

  toJSON(): I64JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): I64 {
    return I64.reified().new({
      negative: decodeFromJSONField('bool', field.negative),
      magnitude: decodeFromJSONField('u64', field.magnitude),
    })
  }

  static fromJSON(json: Record<string, any>): I64 {
    if (json.$typeName !== I64.$typeName) {
      throw new Error(
        `not a I64 json object: expected '${I64.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return I64.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): I64 {
    if (!isI64(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a I64 object`)
    }
    return I64.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link I64.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): I64 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isI64(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a I64 object`)
    }
    return I64.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link I64.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): I64 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isI64(data.bcs.type)) {
        throw new Error(`object at is not a I64 object`)
      }

      return I64.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return I64.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<I64> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isI64(object.type)) {
      throw new Error(`object at id ${id} is not a I64 object`)
    }
    return I64.fromBcs(object.content)
  }
}
