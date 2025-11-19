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

/* ============================== PriceFeed =============================== */

export function isPriceFeed(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::price_feed::PriceFeed`
}

export interface PriceFeedFields {
  value: ToField<'u64'>
  lastUpdated: ToField<'u64'>
}

export type PriceFeedReified = Reified<PriceFeed, PriceFeedFields>

export class PriceFeed implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::price_feed::PriceFeed`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PriceFeed.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::price_feed::PriceFeed`
  readonly $typeArgs: []
  readonly $isPhantom = PriceFeed.$isPhantom

  readonly value: ToField<'u64'>
  readonly lastUpdated: ToField<'u64'>

  private constructor(typeArgs: [], fields: PriceFeedFields) {
    this.$fullTypeName = composeSuiType(
      PriceFeed.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::price_feed::PriceFeed`
    this.$typeArgs = typeArgs

    this.value = fields.value
    this.lastUpdated = fields.lastUpdated
  }

  static reified(): PriceFeedReified {
    const reifiedBcs = PriceFeed.bcs
    return {
      typeName: PriceFeed.$typeName,
      fullTypeName: composeSuiType(
        PriceFeed.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::price_feed::PriceFeed`,
      typeArgs: [] as [],
      isPhantom: PriceFeed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceFeed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceFeed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceFeed.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceFeed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceFeed.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PriceFeed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceFeed.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PriceFeed.fetch(client, id),
      new: (fields: PriceFeedFields) => {
        return new PriceFeed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PriceFeed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceFeed>> {
    return phantom(PriceFeed.reified())
  }
  static get p() {
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

  toJSONField() {
    return {
      value: this.value.toString(),
      lastUpdated: this.lastUpdated.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return PriceFeed.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PriceFeed {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceFeed(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceFeed object`)
    }
    return PriceFeed.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PriceFeed {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceFeed(data.bcs.type)) {
        throw new Error(`object at is not a PriceFeed object`)
      }

      return PriceFeed.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceFeed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PriceFeed> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PriceFeed object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPriceFeed(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PriceFeed object`)
    }

    return PriceFeed.fromSuiObjectData(res.data)
  }
}
