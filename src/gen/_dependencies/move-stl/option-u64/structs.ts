import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
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
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'

/* ============================== OptionU64 =============================== */

export function isOptionU64(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('move-stl', 'option_u64::OptionU64')}::option_u64::OptionU64`
}

export interface OptionU64Fields {
  isNone: ToField<'bool'>
  v: ToField<'u64'>
}

export type OptionU64Reified = Reified<OptionU64, OptionU64Fields>

export type OptionU64JSONField = {
  isNone: boolean
  v: string
}

export type OptionU64JSON = {
  $typeName: typeof OptionU64.$typeName
  $typeArgs: []
} & OptionU64JSONField

export class OptionU64 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::option_u64::OptionU64` {
    return `${getTypeOrigin('move-stl', 'option_u64::OptionU64')}::option_u64::OptionU64` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof OptionU64.$typeName = OptionU64.$typeName
  readonly $fullTypeName: `${string}::option_u64::OptionU64`
  readonly $typeArgs: []
  readonly $isPhantom: typeof OptionU64.$isPhantom = OptionU64.$isPhantom

  readonly isNone: ToField<'bool'>
  readonly v: ToField<'u64'>

  private constructor(typeArgs: [], fields: OptionU64Fields) {
    this.$fullTypeName = composeSuiType(
      OptionU64.$typeName,
      ...typeArgs,
    ) as `${string}::option_u64::OptionU64`
    this.$typeArgs = typeArgs

    this.isNone = fields.isNone
    this.v = fields.v
  }

  static reified(): OptionU64Reified {
    const reifiedBcs = OptionU64.bcs
    return {
      get typeName() {
        return OptionU64.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OptionU64.$typeName,
          ...[],
        ) as `${string}::option_u64::OptionU64`
      },
      typeArgs: [] as [],
      isPhantom: OptionU64.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OptionU64.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OptionU64.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OptionU64.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OptionU64.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OptionU64.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OptionU64.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => OptionU64.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => OptionU64.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => OptionU64.fetch(client, id),
      new: (fields: OptionU64Fields) => {
        return new OptionU64([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): OptionU64Reified {
    return OptionU64.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OptionU64>> {
    return phantom(OptionU64.reified())
  }

  static get p(): PhantomReified<ToTypeStr<OptionU64>> {
    return OptionU64.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OptionU64', {
      is_none: bcs.bool(),
      v: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof OptionU64.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof OptionU64.instantiateBcs> {
    if (!OptionU64.cachedBcs) {
      OptionU64.cachedBcs = OptionU64.instantiateBcs()
    }
    return OptionU64.cachedBcs
  }

  static fromFields(fields: Record<string, any>): OptionU64 {
    return OptionU64.reified().new({
      isNone: decodeFromFields('bool', fields.is_none),
      v: decodeFromFields('u64', fields.v),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OptionU64 {
    if (!isOptionU64(item.type)) {
      throw new Error('not a OptionU64 type')
    }

    return OptionU64.reified().new({
      isNone: decodeFromFieldsWithTypes('bool', item.fields.is_none),
      v: decodeFromFieldsWithTypes('u64', item.fields.v),
    })
  }

  static fromBcs(data: Uint8Array): OptionU64 {
    return OptionU64.fromFields(OptionU64.bcs.parse(data))
  }

  toJSONField(): OptionU64JSONField {
    return {
      isNone: this.isNone,
      v: this.v.toString(),
    }
  }

  toJSON(): OptionU64JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OptionU64 {
    return OptionU64.reified().new({
      isNone: decodeFromJSONField('bool', field.isNone),
      v: decodeFromJSONField('u64', field.v),
    })
  }

  static fromJSON(json: Record<string, any>): OptionU64 {
    if (json.$typeName !== OptionU64.$typeName) {
      throw new Error(
        `not a OptionU64 json object: expected '${OptionU64.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return OptionU64.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): OptionU64 {
    if (!isOptionU64(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OptionU64 object`)
    }
    return OptionU64.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OptionU64.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): OptionU64 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOptionU64(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OptionU64 object`)
    }
    return OptionU64.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OptionU64.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): OptionU64 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOptionU64(data.bcs.type)) {
        throw new Error(`object at is not a OptionU64 object`)
      }

      return OptionU64.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OptionU64.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<OptionU64> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOptionU64(object.type)) {
      throw new Error(`object at id ${id} is not a OptionU64 object`)
    }
    return OptionU64.fromBcs(object.content)
  }
}
