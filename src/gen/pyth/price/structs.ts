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
import { I64 } from '../i64/structs'

/* ============================== Price =============================== */

export function isPrice(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth', 'price::Price')}::price::Price`
}

export interface PriceFields {
  price: ToField<I64>
  /** Confidence interval around the price */
  conf: ToField<'u64'>
  /** The exponent */
  expo: ToField<I64>
  /** Unix timestamp of when this price was computed */
  timestamp: ToField<'u64'>
}

export type PriceReified = Reified<Price, PriceFields>

export type PriceJSONField = {
  price: ToJSON<I64>
  conf: string
  expo: ToJSON<I64>
  timestamp: string
}

export type PriceJSON = {
  $typeName: typeof Price.$typeName
  $typeArgs: []
} & PriceJSONField

/**
 * A price with a degree of uncertainty, represented as a price +- a confidence interval.
 *
 * The confidence interval roughly corresponds to the standard error of a normal distribution.
 * Both the price and confidence are stored in a fixed-point numeric representation,
 * `x * (10^expo)`, where `expo` is the exponent.
 *
 * Please refer to the documentation at https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices for how
 * to use this price safely.
 */
export class Price implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::price::Price` {
    return `${getTypeOrigin('pyth', 'price::Price')}::price::Price` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Price.$typeName = Price.$typeName
  readonly $fullTypeName: `${string}::price::Price`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Price.$isPhantom = Price.$isPhantom

  readonly price: ToField<I64>
  /** Confidence interval around the price */
  readonly conf: ToField<'u64'>
  /** The exponent */
  readonly expo: ToField<I64>
  /** Unix timestamp of when this price was computed */
  readonly timestamp: ToField<'u64'>

  private constructor(typeArgs: [], fields: PriceFields) {
    this.$fullTypeName = composeSuiType(
      Price.$typeName,
      ...typeArgs,
    ) as `${string}::price::Price`
    this.$typeArgs = typeArgs

    this.price = fields.price
    this.conf = fields.conf
    this.expo = fields.expo
    this.timestamp = fields.timestamp
  }

  static reified(): PriceReified {
    const reifiedBcs = Price.bcs
    return {
      get typeName() {
        return Price.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Price.$typeName,
          ...[],
        ) as `${string}::price::Price`
      },
      typeArgs: [] as [],
      isPhantom: Price.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Price.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Price.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Price.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Price.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Price.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Price.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Price.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Price.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Price.fetch(client, id),
      new: (fields: PriceFields) => {
        return new Price([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceReified {
    return Price.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Price>> {
    return phantom(Price.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Price>> {
    return Price.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Price', {
      price: I64.bcs,
      conf: bcs.u64(),
      expo: I64.bcs,
      timestamp: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Price.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Price.instantiateBcs> {
    if (!Price.cachedBcs) {
      Price.cachedBcs = Price.instantiateBcs()
    }
    return Price.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Price {
    return Price.reified().new({
      price: decodeFromFields(I64.reified(), fields.price),
      conf: decodeFromFields('u64', fields.conf),
      expo: decodeFromFields(I64.reified(), fields.expo),
      timestamp: decodeFromFields('u64', fields.timestamp),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Price {
    if (!isPrice(item.type)) {
      throw new Error('not a Price type')
    }

    return Price.reified().new({
      price: decodeFromFieldsWithTypes(I64.reified(), item.fields.price),
      conf: decodeFromFieldsWithTypes('u64', item.fields.conf),
      expo: decodeFromFieldsWithTypes(I64.reified(), item.fields.expo),
      timestamp: decodeFromFieldsWithTypes('u64', item.fields.timestamp),
    })
  }

  static fromBcs(data: Uint8Array): Price {
    return Price.fromFields(Price.bcs.parse(data))
  }

  toJSONField(): PriceJSONField {
    return {
      price: this.price.toJSONField(),
      conf: this.conf.toString(),
      expo: this.expo.toJSONField(),
      timestamp: this.timestamp.toString(),
    }
  }

  toJSON(): PriceJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Price {
    return Price.reified().new({
      price: decodeFromJSONField(I64.reified(), field.price),
      conf: decodeFromJSONField('u64', field.conf),
      expo: decodeFromJSONField(I64.reified(), field.expo),
      timestamp: decodeFromJSONField('u64', field.timestamp),
    })
  }

  static fromJSON(json: Record<string, any>): Price {
    if (json.$typeName !== Price.$typeName) {
      throw new Error(
        `not a Price json object: expected '${Price.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Price.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Price {
    if (!isPrice(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Price object`)
    }
    return Price.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Price.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Price {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPrice(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Price object`)
    }
    return Price.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Price.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Price {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPrice(data.bcs.type)) {
        throw new Error(`object at is not a Price object`)
      }

      return Price.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Price.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Price> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPrice(object.type)) {
      throw new Error(`object at id ${id} is not a Price object`)
    }
    return Price.fromBcs(object.content)
  }
}
