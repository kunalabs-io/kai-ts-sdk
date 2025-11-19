import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { Option } from '../../../../move-stdlib/option/structs'
import { PKG_V1 } from '../index'
import { RingAggregator } from '../ring-aggregator/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== SlidingSumLimiter =============================== */

export function isSlidingSumLimiter(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::sliding_sum_limiter::SlidingSumLimiter`
}

export interface SlidingSumLimiterFields {
  ringAggregator: ToField<RingAggregator>
  maxSumLimit: ToField<Option<'u256'>>
}

export type SlidingSumLimiterReified = Reified<SlidingSumLimiter, SlidingSumLimiterFields>

export class SlidingSumLimiter implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::sliding_sum_limiter::SlidingSumLimiter`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SlidingSumLimiter.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::sliding_sum_limiter::SlidingSumLimiter`
  readonly $typeArgs: []
  readonly $isPhantom = SlidingSumLimiter.$isPhantom

  readonly ringAggregator: ToField<RingAggregator>
  readonly maxSumLimit: ToField<Option<'u256'>>

  private constructor(typeArgs: [], fields: SlidingSumLimiterFields) {
    this.$fullTypeName = composeSuiType(
      SlidingSumLimiter.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::sliding_sum_limiter::SlidingSumLimiter`
    this.$typeArgs = typeArgs

    this.ringAggregator = fields.ringAggregator
    this.maxSumLimit = fields.maxSumLimit
  }

  static reified(): SlidingSumLimiterReified {
    const reifiedBcs = SlidingSumLimiter.bcs
    return {
      typeName: SlidingSumLimiter.$typeName,
      fullTypeName: composeSuiType(
        SlidingSumLimiter.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::sliding_sum_limiter::SlidingSumLimiter`,
      typeArgs: [] as [],
      isPhantom: SlidingSumLimiter.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SlidingSumLimiter.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SlidingSumLimiter.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SlidingSumLimiter.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SlidingSumLimiter.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SlidingSumLimiter.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SlidingSumLimiter.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SlidingSumLimiter.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SlidingSumLimiter.fetch(client, id),
      new: (fields: SlidingSumLimiterFields) => {
        return new SlidingSumLimiter([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SlidingSumLimiter.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SlidingSumLimiter>> {
    return phantom(SlidingSumLimiter.reified())
  }
  static get p() {
    return SlidingSumLimiter.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SlidingSumLimiter', {
      ring_aggregator: RingAggregator.bcs,
      max_sum_limit: Option.bcs(bcs.u256()),
    })
  }

  private static cachedBcs: ReturnType<typeof SlidingSumLimiter.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SlidingSumLimiter.instantiateBcs> {
    if (!SlidingSumLimiter.cachedBcs) {
      SlidingSumLimiter.cachedBcs = SlidingSumLimiter.instantiateBcs()
    }
    return SlidingSumLimiter.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SlidingSumLimiter {
    return SlidingSumLimiter.reified().new({
      ringAggregator: decodeFromFields(RingAggregator.reified(), fields.ring_aggregator),
      maxSumLimit: decodeFromFields(Option.reified('u256'), fields.max_sum_limit),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SlidingSumLimiter {
    if (!isSlidingSumLimiter(item.type)) {
      throw new Error('not a SlidingSumLimiter type')
    }

    return SlidingSumLimiter.reified().new({
      ringAggregator: decodeFromFieldsWithTypes(
        RingAggregator.reified(),
        item.fields.ring_aggregator
      ),
      maxSumLimit: decodeFromFieldsWithTypes(Option.reified('u256'), item.fields.max_sum_limit),
    })
  }

  static fromBcs(data: Uint8Array): SlidingSumLimiter {
    return SlidingSumLimiter.fromFields(SlidingSumLimiter.bcs.parse(data))
  }

  toJSONField() {
    return {
      ringAggregator: this.ringAggregator.toJSONField(),
      maxSumLimit: fieldToJSON<Option<'u256'>>(`${Option.$typeName}<u256>`, this.maxSumLimit),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SlidingSumLimiter {
    return SlidingSumLimiter.reified().new({
      ringAggregator: decodeFromJSONField(RingAggregator.reified(), field.ringAggregator),
      maxSumLimit: decodeFromJSONField(Option.reified('u256'), field.maxSumLimit),
    })
  }

  static fromJSON(json: Record<string, any>): SlidingSumLimiter {
    if (json.$typeName !== SlidingSumLimiter.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SlidingSumLimiter.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SlidingSumLimiter {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSlidingSumLimiter(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SlidingSumLimiter object`)
    }
    return SlidingSumLimiter.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SlidingSumLimiter {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSlidingSumLimiter(data.bcs.type)) {
        throw new Error(`object at is not a SlidingSumLimiter object`)
      }

      return SlidingSumLimiter.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SlidingSumLimiter.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SlidingSumLimiter> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SlidingSumLimiter object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSlidingSumLimiter(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SlidingSumLimiter object`)
    }

    return SlidingSumLimiter.fromSuiObjectData(res.data)
  }
}
