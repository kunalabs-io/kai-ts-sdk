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

/* ============================== I128 =============================== */

export function isI128(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('integer-library', 'i128::I128')}::i128::I128`
}

export interface I128Fields {
  bits: ToField<'u128'>
}

export type I128Reified = Reified<I128, I128Fields>

export type I128JSONField = {
  bits: string
}

export type I128JSON = {
  $typeName: typeof I128.$typeName
  $typeArgs: []
} & I128JSONField

export class I128 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::i128::I128` {
    return `${getTypeOrigin('integer-library', 'i128::I128')}::i128::I128` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof I128.$typeName = I128.$typeName
  readonly $fullTypeName: `${string}::i128::I128`
  readonly $typeArgs: []
  readonly $isPhantom: typeof I128.$isPhantom = I128.$isPhantom

  readonly bits: ToField<'u128'>

  private constructor(typeArgs: [], fields: I128Fields) {
    this.$fullTypeName = composeSuiType(
      I128.$typeName,
      ...typeArgs,
    ) as `${string}::i128::I128`
    this.$typeArgs = typeArgs

    this.bits = fields.bits
  }

  static reified(): I128Reified {
    const reifiedBcs = I128.bcs
    return {
      get typeName() {
        return I128.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          I128.$typeName,
          ...[],
        ) as `${string}::i128::I128`
      },
      typeArgs: [] as [],
      isPhantom: I128.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => I128.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => I128.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => I128.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => I128.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => I128.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => I128.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => I128.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => I128.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => I128.fetch(client, id),
      new: (fields: I128Fields) => {
        return new I128([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): I128Reified {
    return I128.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<I128>> {
    return phantom(I128.reified())
  }

  static get p(): PhantomReified<ToTypeStr<I128>> {
    return I128.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('I128', {
      bits: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof I128.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof I128.instantiateBcs> {
    if (!I128.cachedBcs) {
      I128.cachedBcs = I128.instantiateBcs()
    }
    return I128.cachedBcs
  }

  static fromFields(fields: Record<string, any>): I128 {
    return I128.reified().new({
      bits: decodeFromFields('u128', fields.bits),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): I128 {
    if (!isI128(item.type)) {
      throw new Error('not a I128 type')
    }

    return I128.reified().new({
      bits: decodeFromFieldsWithTypes('u128', item.fields.bits),
    })
  }

  static fromBcs(data: Uint8Array): I128 {
    return I128.fromFields(I128.bcs.parse(data))
  }

  toJSONField(): I128JSONField {
    return {
      bits: this.bits.toString(),
    }
  }

  toJSON(): I128JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): I128 {
    return I128.reified().new({
      bits: decodeFromJSONField('u128', field.bits),
    })
  }

  static fromJSON(json: Record<string, any>): I128 {
    if (json.$typeName !== I128.$typeName) {
      throw new Error(
        `not a I128 json object: expected '${I128.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return I128.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): I128 {
    if (!isI128(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a I128 object`)
    }
    return I128.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link I128.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): I128 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isI128(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a I128 object`)
    }
    return I128.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link I128.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): I128 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isI128(data.bcs.type)) {
        throw new Error(`object at is not a I128 object`)
      }

      return I128.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return I128.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<I128> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isI128(object.type)) {
      throw new Error(`object at id ${id} is not a I128 object`)
    }
    return I128.fromBcs(object.content)
  }
}
