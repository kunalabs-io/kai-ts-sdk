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

/* ============================== OptionU128 =============================== */

export function isOptionU128(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('move-stl', 'option_u128::OptionU128')}::option_u128::OptionU128`
}

export interface OptionU128Fields {
  isNone: ToField<'bool'>
  v: ToField<'u128'>
}

export type OptionU128Reified = Reified<OptionU128, OptionU128Fields>

export type OptionU128JSONField = {
  isNone: boolean
  v: string
}

export type OptionU128JSON = {
  $typeName: typeof OptionU128.$typeName
  $typeArgs: []
} & OptionU128JSONField

export class OptionU128 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::option_u128::OptionU128` {
    return `${
      getTypeOrigin('move-stl', 'option_u128::OptionU128')
    }::option_u128::OptionU128` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof OptionU128.$typeName = OptionU128.$typeName
  readonly $fullTypeName: `${string}::option_u128::OptionU128`
  readonly $typeArgs: []
  readonly $isPhantom: typeof OptionU128.$isPhantom = OptionU128.$isPhantom

  readonly isNone: ToField<'bool'>
  readonly v: ToField<'u128'>

  private constructor(typeArgs: [], fields: OptionU128Fields) {
    this.$fullTypeName = composeSuiType(
      OptionU128.$typeName,
      ...typeArgs,
    ) as `${string}::option_u128::OptionU128`
    this.$typeArgs = typeArgs

    this.isNone = fields.isNone
    this.v = fields.v
  }

  static reified(): OptionU128Reified {
    const reifiedBcs = OptionU128.bcs
    return {
      get typeName() {
        return OptionU128.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OptionU128.$typeName,
          ...[],
        ) as `${string}::option_u128::OptionU128`
      },
      typeArgs: [] as [],
      isPhantom: OptionU128.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OptionU128.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OptionU128.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OptionU128.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OptionU128.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OptionU128.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OptionU128.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => OptionU128.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => OptionU128.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => OptionU128.fetch(client, id),
      new: (fields: OptionU128Fields) => {
        return new OptionU128([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): OptionU128Reified {
    return OptionU128.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OptionU128>> {
    return phantom(OptionU128.reified())
  }

  static get p(): PhantomReified<ToTypeStr<OptionU128>> {
    return OptionU128.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OptionU128', {
      is_none: bcs.bool(),
      v: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof OptionU128.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof OptionU128.instantiateBcs> {
    if (!OptionU128.cachedBcs) {
      OptionU128.cachedBcs = OptionU128.instantiateBcs()
    }
    return OptionU128.cachedBcs
  }

  static fromFields(fields: Record<string, any>): OptionU128 {
    return OptionU128.reified().new({
      isNone: decodeFromFields('bool', fields.is_none),
      v: decodeFromFields('u128', fields.v),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OptionU128 {
    if (!isOptionU128(item.type)) {
      throw new Error('not a OptionU128 type')
    }

    return OptionU128.reified().new({
      isNone: decodeFromFieldsWithTypes('bool', item.fields.is_none),
      v: decodeFromFieldsWithTypes('u128', item.fields.v),
    })
  }

  static fromBcs(data: Uint8Array): OptionU128 {
    return OptionU128.fromFields(OptionU128.bcs.parse(data))
  }

  toJSONField(): OptionU128JSONField {
    return {
      isNone: this.isNone,
      v: this.v.toString(),
    }
  }

  toJSON(): OptionU128JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OptionU128 {
    return OptionU128.reified().new({
      isNone: decodeFromJSONField('bool', field.isNone),
      v: decodeFromJSONField('u128', field.v),
    })
  }

  static fromJSON(json: Record<string, any>): OptionU128 {
    if (json.$typeName !== OptionU128.$typeName) {
      throw new Error(
        `not a OptionU128 json object: expected '${OptionU128.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return OptionU128.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): OptionU128 {
    if (!isOptionU128(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OptionU128 object`)
    }
    return OptionU128.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OptionU128.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): OptionU128 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOptionU128(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OptionU128 object`)
    }
    return OptionU128.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OptionU128.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): OptionU128 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOptionU128(data.bcs.type)) {
        throw new Error(`object at is not a OptionU128 object`)
      }

      return OptionU128.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OptionU128.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<OptionU128> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOptionU128(object.type)) {
      throw new Error(`object at id ${id} is not a OptionU128 object`)
    }
    return OptionU128.fromBcs(object.content)
  }
}
