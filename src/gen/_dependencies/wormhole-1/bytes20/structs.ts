/**
 * This module implements a custom type representing a fixed-size array of
 * length 20.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'

/* ============================== Bytes20 =============================== */

export function isBytes20(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole-1', 'bytes20::Bytes20')}::bytes20::Bytes20`
}

export interface Bytes20Fields {
  data: ToField<Vector<'u8'>>
}

export type Bytes20Reified = Reified<Bytes20, Bytes20Fields>

export type Bytes20JSONField = {
  data: number[]
}

export type Bytes20JSON = {
  $typeName: typeof Bytes20.$typeName
  $typeArgs: []
} & Bytes20JSONField

/** Container for `vector<u8>`, which has length == 20. */
export class Bytes20 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::bytes20::Bytes20` {
    return `${getTypeOrigin('wormhole-1', 'bytes20::Bytes20')}::bytes20::Bytes20` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Bytes20.$typeName = Bytes20.$typeName
  readonly $fullTypeName: `${string}::bytes20::Bytes20`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Bytes20.$isPhantom = Bytes20.$isPhantom

  readonly data: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: Bytes20Fields) {
    this.$fullTypeName = composeSuiType(
      Bytes20.$typeName,
      ...typeArgs,
    ) as `${string}::bytes20::Bytes20`
    this.$typeArgs = typeArgs

    this.data = fields.data
  }

  static reified(): Bytes20Reified {
    const reifiedBcs = Bytes20.bcs
    return {
      get typeName() {
        return Bytes20.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Bytes20.$typeName,
          ...[],
        ) as `${string}::bytes20::Bytes20`
      },
      typeArgs: [] as [],
      isPhantom: Bytes20.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Bytes20.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Bytes20.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Bytes20.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Bytes20.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Bytes20.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Bytes20.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Bytes20.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Bytes20.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Bytes20.fetch(client, id),
      new: (fields: Bytes20Fields) => {
        return new Bytes20([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): Bytes20Reified {
    return Bytes20.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Bytes20>> {
    return phantom(Bytes20.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Bytes20>> {
    return Bytes20.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Bytes20', {
      data: bcs.vector(bcs.u8()),
    })
  }

  private static cachedBcs: ReturnType<typeof Bytes20.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Bytes20.instantiateBcs> {
    if (!Bytes20.cachedBcs) {
      Bytes20.cachedBcs = Bytes20.instantiateBcs()
    }
    return Bytes20.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Bytes20 {
    return Bytes20.reified().new({
      data: decodeFromFields(vector('u8'), fields.data),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Bytes20 {
    if (!isBytes20(item.type)) {
      throw new Error('not a Bytes20 type')
    }

    return Bytes20.reified().new({
      data: decodeFromFieldsWithTypes(vector('u8'), item.fields.data),
    })
  }

  static fromBcs(data: Uint8Array): Bytes20 {
    return Bytes20.fromFields(Bytes20.bcs.parse(data))
  }

  toJSONField(): Bytes20JSONField {
    return {
      data: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.data),
    }
  }

  toJSON(): Bytes20JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Bytes20 {
    return Bytes20.reified().new({
      data: decodeFromJSONField(vector('u8'), field.data),
    })
  }

  static fromJSON(json: Record<string, any>): Bytes20 {
    if (json.$typeName !== Bytes20.$typeName) {
      throw new Error(
        `not a Bytes20 json object: expected '${Bytes20.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Bytes20.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Bytes20 {
    if (!isBytes20(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Bytes20 object`)
    }
    return Bytes20.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Bytes20.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Bytes20 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBytes20(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Bytes20 object`)
    }
    return Bytes20.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Bytes20.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Bytes20 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBytes20(data.bcs.type)) {
        throw new Error(`object at is not a Bytes20 object`)
      }

      return Bytes20.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Bytes20.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Bytes20> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBytes20(object.type)) {
      throw new Error(`object at id ${id} is not a Bytes20 object`)
    }
    return Bytes20.fromBcs(object.content)
  }
}
