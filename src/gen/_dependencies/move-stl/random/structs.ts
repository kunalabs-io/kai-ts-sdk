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

/* ============================== Random =============================== */

export function isRandom(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('move-stl', 'random::Random')}::random::Random`
}

export interface RandomFields {
  seed: ToField<'u64'>
}

export type RandomReified = Reified<Random, RandomFields>

export type RandomJSONField = {
  seed: string
}

export type RandomJSON = {
  $typeName: typeof Random.$typeName
  $typeArgs: []
} & RandomJSONField

export class Random implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::random::Random` {
    return `${getTypeOrigin('move-stl', 'random::Random')}::random::Random` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Random.$typeName = Random.$typeName
  readonly $fullTypeName: `${string}::random::Random`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Random.$isPhantom = Random.$isPhantom

  readonly seed: ToField<'u64'>

  private constructor(typeArgs: [], fields: RandomFields) {
    this.$fullTypeName = composeSuiType(
      Random.$typeName,
      ...typeArgs,
    ) as `${string}::random::Random`
    this.$typeArgs = typeArgs

    this.seed = fields.seed
  }

  static reified(): RandomReified {
    const reifiedBcs = Random.bcs
    return {
      get typeName() {
        return Random.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Random.$typeName,
          ...[],
        ) as `${string}::random::Random`
      },
      typeArgs: [] as [],
      isPhantom: Random.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Random.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Random.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Random.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Random.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Random.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Random.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Random.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Random.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Random.fetch(client, id),
      new: (fields: RandomFields) => {
        return new Random([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RandomReified {
    return Random.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Random>> {
    return phantom(Random.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Random>> {
    return Random.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Random', {
      seed: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Random.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Random.instantiateBcs> {
    if (!Random.cachedBcs) {
      Random.cachedBcs = Random.instantiateBcs()
    }
    return Random.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Random {
    return Random.reified().new({
      seed: decodeFromFields('u64', fields.seed),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Random {
    if (!isRandom(item.type)) {
      throw new Error('not a Random type')
    }

    return Random.reified().new({
      seed: decodeFromFieldsWithTypes('u64', item.fields.seed),
    })
  }

  static fromBcs(data: Uint8Array): Random {
    return Random.fromFields(Random.bcs.parse(data))
  }

  toJSONField(): RandomJSONField {
    return {
      seed: this.seed.toString(),
    }
  }

  toJSON(): RandomJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Random {
    return Random.reified().new({
      seed: decodeFromJSONField('u64', field.seed),
    })
  }

  static fromJSON(json: Record<string, any>): Random {
    if (json.$typeName !== Random.$typeName) {
      throw new Error(
        `not a Random json object: expected '${Random.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Random.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Random {
    if (!isRandom(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Random object`)
    }
    return Random.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Random.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Random {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRandom(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Random object`)
    }
    return Random.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Random.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Random {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRandom(data.bcs.type)) {
        throw new Error(`object at is not a Random object`)
      }

      return Random.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Random.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Random> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRandom(object.type)) {
      throw new Error(`object at id ${id} is not a Random object`)
    }
    return Random.fromBcs(object.content)
  }
}
