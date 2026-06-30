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

/* ============================== PriceFeed =============================== */

export function isPriceFeed(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('x-oracle', 'price_feed::PriceFeed')}::price_feed::PriceFeed`
}

export interface PriceFeedFields {
  value: ToField<'u64'>
  lastUpdated: ToField<'u64'>
}

export type PriceFeedReified = Reified<PriceFeed, PriceFeedFields>

export type PriceFeedJSONField = {
  value: string
  lastUpdated: string
}

export type PriceFeedJSON = {
  $typeName: typeof PriceFeed.$typeName
  $typeArgs: []
} & PriceFeedJSONField

export class PriceFeed implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::price_feed::PriceFeed` {
    return `${getTypeOrigin('x-oracle', 'price_feed::PriceFeed')}::price_feed::PriceFeed` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceFeed.$typeName = PriceFeed.$typeName
  readonly $fullTypeName: `${string}::price_feed::PriceFeed`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceFeed.$isPhantom = PriceFeed.$isPhantom

  readonly value: ToField<'u64'>
  readonly lastUpdated: ToField<'u64'>

  private constructor(typeArgs: [], fields: PriceFeedFields) {
    this.$fullTypeName = composeSuiType(
      PriceFeed.$typeName,
      ...typeArgs,
    ) as `${string}::price_feed::PriceFeed`
    this.$typeArgs = typeArgs

    this.value = fields.value
    this.lastUpdated = fields.lastUpdated
  }

  static reified(): PriceFeedReified {
    const reifiedBcs = PriceFeed.bcs
    return {
      get typeName() {
        return PriceFeed.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PriceFeed.$typeName,
          ...[],
        ) as `${string}::price_feed::PriceFeed`
      },
      typeArgs: [] as [],
      isPhantom: PriceFeed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceFeed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceFeed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceFeed.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceFeed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceFeed.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PriceFeed.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PriceFeed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceFeed.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PriceFeed.fetch(client, id),
      new: (fields: PriceFeedFields) => {
        return new PriceFeed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceFeedReified {
    return PriceFeed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceFeed>> {
    return phantom(PriceFeed.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceFeed>> {
    return PriceFeed.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceFeed', {
      value: bcs.u64(),
      last_updated: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PriceFeed.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceFeed.instantiateBcs> {
    if (!PriceFeed.cachedBcs) {
      PriceFeed.cachedBcs = PriceFeed.instantiateBcs()
    }
    return PriceFeed.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceFeed {
    return PriceFeed.reified().new({
      value: decodeFromFields('u64', fields.value),
      lastUpdated: decodeFromFields('u64', fields.last_updated),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceFeed {
    if (!isPriceFeed(item.type)) {
      throw new Error('not a PriceFeed type')
    }

    return PriceFeed.reified().new({
      value: decodeFromFieldsWithTypes('u64', item.fields.value),
      lastUpdated: decodeFromFieldsWithTypes('u64', item.fields.last_updated),
    })
  }

  static fromBcs(data: Uint8Array): PriceFeed {
    return PriceFeed.fromFields(PriceFeed.bcs.parse(data))
  }

  toJSONField(): PriceFeedJSONField {
    return {
      value: this.value.toString(),
      lastUpdated: this.lastUpdated.toString(),
    }
  }

  toJSON(): PriceFeedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceFeed {
    return PriceFeed.reified().new({
      value: decodeFromJSONField('u64', field.value),
      lastUpdated: decodeFromJSONField('u64', field.lastUpdated),
    })
  }

  static fromJSON(json: Record<string, any>): PriceFeed {
    if (json.$typeName !== PriceFeed.$typeName) {
      throw new Error(
        `not a PriceFeed json object: expected '${PriceFeed.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceFeed.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PriceFeed {
    if (!isPriceFeed(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PriceFeed object`)
    }
    return PriceFeed.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceFeed.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PriceFeed {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceFeed(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceFeed object`)
    }
    return PriceFeed.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceFeed.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PriceFeed {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceFeed(data.bcs.type)) {
        throw new Error(`object at is not a PriceFeed object`)
      }

      return PriceFeed.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceFeed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PriceFeed> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPriceFeed(object.type)) {
      throw new Error(`object at id ${id} is not a PriceFeed object`)
    }
    return PriceFeed.fromBcs(object.content)
  }
}
