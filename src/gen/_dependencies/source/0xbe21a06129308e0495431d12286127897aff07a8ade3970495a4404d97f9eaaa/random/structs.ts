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

/* ============================== Random =============================== */

export function isRandom(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::random::Random`
}

export interface RandomFields {
  seed: ToField<'u64'>
}

export type RandomReified = Reified<Random, RandomFields>

export class Random implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::random::Random`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Random.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::random::Random`
  readonly $typeArgs: []
  readonly $isPhantom = Random.$isPhantom

  readonly seed: ToField<'u64'>

  private constructor(typeArgs: [], fields: RandomFields) {
    this.$fullTypeName = composeSuiType(
      Random.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::random::Random`
    this.$typeArgs = typeArgs

    this.seed = fields.seed
  }

  static reified(): RandomReified {
    const reifiedBcs = Random.bcs
    return {
      typeName: Random.$typeName,
      fullTypeName: composeSuiType(Random.$typeName, ...[]) as `${typeof PKG_V1}::random::Random`,
      typeArgs: [] as [],
      isPhantom: Random.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Random.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Random.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Random.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Random.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Random.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Random.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Random.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Random.fetch(client, id),
      new: (fields: RandomFields) => {
        return new Random([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Random.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Random>> {
    return phantom(Random.reified())
  }
  static get p() {
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
    return Random.reified().new({ seed: decodeFromFields('u64', fields.seed) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Random {
    if (!isRandom(item.type)) {
      throw new Error('not a Random type')
    }

    return Random.reified().new({ seed: decodeFromFieldsWithTypes('u64', item.fields.seed) })
  }

  static fromBcs(data: Uint8Array): Random {
    return Random.fromFields(Random.bcs.parse(data))
  }

  toJSONField() {
    return {
      seed: this.seed.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Random {
    return Random.reified().new({ seed: decodeFromJSONField('u64', field.seed) })
  }

  static fromJSON(json: Record<string, any>): Random {
    if (json.$typeName !== Random.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Random.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Random {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRandom(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Random object`)
    }
    return Random.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Random {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRandom(data.bcs.type)) {
        throw new Error(`object at is not a Random object`)
      }

      return Random.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Random.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Random> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Random object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRandom(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Random object`)
    }

    return Random.fromSuiObjectData(res.data)
  }
}
