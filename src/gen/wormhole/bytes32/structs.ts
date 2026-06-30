/**
 * This module implements a custom type representing a fixed-size array of
 * length 32.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
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
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'

/* ============================== Bytes32 =============================== */

export function isBytes32(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole', 'bytes32::Bytes32')}::bytes32::Bytes32`
}

export interface Bytes32Fields {
  data: ToField<Vector<'u8'>>
}

export type Bytes32Reified = Reified<Bytes32, Bytes32Fields>

export type Bytes32JSONField = {
  data: number[]
}

export type Bytes32JSON = {
  $typeName: typeof Bytes32.$typeName
  $typeArgs: []
} & Bytes32JSONField

/** Container for `vector<u8>`, which has length == 32. */
export class Bytes32 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::bytes32::Bytes32` {
    return `${getTypeOrigin('wormhole', 'bytes32::Bytes32')}::bytes32::Bytes32` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Bytes32.$typeName = Bytes32.$typeName
  readonly $fullTypeName: `${string}::bytes32::Bytes32`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Bytes32.$isPhantom = Bytes32.$isPhantom

  readonly data: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: Bytes32Fields) {
    this.$fullTypeName = composeSuiType(
      Bytes32.$typeName,
      ...typeArgs,
    ) as `${string}::bytes32::Bytes32`
    this.$typeArgs = typeArgs

    this.data = fields.data
  }

  static reified(): Bytes32Reified {
    const reifiedBcs = Bytes32.bcs
    return {
      get typeName() {
        return Bytes32.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Bytes32.$typeName,
          ...[],
        ) as `${string}::bytes32::Bytes32`
      },
      typeArgs: [] as [],
      isPhantom: Bytes32.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Bytes32.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Bytes32.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Bytes32.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Bytes32.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Bytes32.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Bytes32.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Bytes32.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Bytes32.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Bytes32.fetch(client, id),
      new: (fields: Bytes32Fields) => {
        return new Bytes32([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): Bytes32Reified {
    return Bytes32.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Bytes32>> {
    return phantom(Bytes32.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Bytes32>> {
    return Bytes32.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Bytes32', {
      data: bcs.vector(bcs.u8()),
    })
  }

  private static cachedBcs: ReturnType<typeof Bytes32.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Bytes32.instantiateBcs> {
    if (!Bytes32.cachedBcs) {
      Bytes32.cachedBcs = Bytes32.instantiateBcs()
    }
    return Bytes32.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Bytes32 {
    return Bytes32.reified().new({
      data: decodeFromFields(vector('u8'), fields.data),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Bytes32 {
    if (!isBytes32(item.type)) {
      throw new Error('not a Bytes32 type')
    }

    return Bytes32.reified().new({
      data: decodeFromFieldsWithTypes(vector('u8'), item.fields.data),
    })
  }

  static fromBcs(data: Uint8Array): Bytes32 {
    return Bytes32.fromFields(Bytes32.bcs.parse(data))
  }

  toJSONField(): Bytes32JSONField {
    return {
      data: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.data),
    }
  }

  toJSON(): Bytes32JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Bytes32 {
    return Bytes32.reified().new({
      data: decodeFromJSONField(vector('u8'), field.data),
    })
  }

  static fromJSON(json: Record<string, any>): Bytes32 {
    if (json.$typeName !== Bytes32.$typeName) {
      throw new Error(
        `not a Bytes32 json object: expected '${Bytes32.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Bytes32.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Bytes32 {
    if (!isBytes32(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Bytes32 object`)
    }
    return Bytes32.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Bytes32.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Bytes32 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBytes32(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Bytes32 object`)
    }
    return Bytes32.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Bytes32.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Bytes32 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBytes32(data.bcs.type)) {
        throw new Error(`object at is not a Bytes32 object`)
      }

      return Bytes32.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Bytes32.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Bytes32> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBytes32(object.type)) {
      throw new Error(`object at id ${id} is not a Bytes32 object`)
    }
    return Bytes32.fromBcs(object.content)
  }
}
