/**
 * Time-based rate limiter that enforces maximum sum limits over a sliding window.
 *
 * Wraps the RingAggregator to provide time-based rate limiting functionality with
 * configurable maximum sum limits. Uses Sui's Clock object for position tracking
 * and enforces limits by aborting when the maximum sum would be exceeded.
 *
 * # Examples
 *
 * ```move
 * // Create rate limiter with 5-minute buckets, 12 buckets total (1 hour window)
 * let mut limiter = sliding_sum_limiter::new(
 * 5 * 60 * 1000,  // 5 minutes per bucket
 * 12,             // 12 buckets (1 hour total)
 * option::some(10000), // Maximum sum limit
 * &clock
 * );
 *
 * // Consume values (will abort if limit exceeded)
 * limiter.consume(1000, &clock);  // Add 1000 to current bucket
 * limiter.consume(2000, &clock);  // Add 2000 to current bucket
 *
 * // Check current state
 * let total = limiter.total_sum(); // Returns 3000
 * ```
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { Option } from '../../../std/option/structs'
import { RingAggregator } from '../ring-aggregator/structs'

/* ============================== SlidingSumLimiter =============================== */

export function isSlidingSumLimiter(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('rate-limiter', 'sliding_sum_limiter::SlidingSumLimiter')
    }::sliding_sum_limiter::SlidingSumLimiter`
}

export interface SlidingSumLimiterFields {
  ringAggregator: ToField<RingAggregator>
  maxSumLimit: ToField<Option<'u256'>>
}

export type SlidingSumLimiterReified = Reified<SlidingSumLimiter, SlidingSumLimiterFields>

export type SlidingSumLimiterJSONField = {
  ringAggregator: ToJSON<RingAggregator>
  maxSumLimit: string | null
}

export type SlidingSumLimiterJSON = {
  $typeName: typeof SlidingSumLimiter.$typeName
  $typeArgs: []
} & SlidingSumLimiterJSONField

export class SlidingSumLimiter implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::sliding_sum_limiter::SlidingSumLimiter` = `${
    getTypeOrigin('rate-limiter', 'sliding_sum_limiter::SlidingSumLimiter')
  }::sliding_sum_limiter::SlidingSumLimiter` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SlidingSumLimiter.$typeName = SlidingSumLimiter.$typeName
  readonly $fullTypeName: `${string}::sliding_sum_limiter::SlidingSumLimiter`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SlidingSumLimiter.$isPhantom = SlidingSumLimiter.$isPhantom

  readonly ringAggregator: ToField<RingAggregator>
  readonly maxSumLimit: ToField<Option<'u256'>>

  private constructor(typeArgs: [], fields: SlidingSumLimiterFields) {
    this.$fullTypeName = composeSuiType(
      SlidingSumLimiter.$typeName,
      ...typeArgs,
    ) as `${string}::sliding_sum_limiter::SlidingSumLimiter`
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
        ...[],
      ) as `${string}::sliding_sum_limiter::SlidingSumLimiter`,
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
      fetch: async (client: SupportedSuiClient, id: string) => SlidingSumLimiter.fetch(client, id),
      new: (fields: SlidingSumLimiterFields) => {
        return new SlidingSumLimiter([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SlidingSumLimiterReified {
    return SlidingSumLimiter.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SlidingSumLimiter>> {
    return phantom(SlidingSumLimiter.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SlidingSumLimiter>> {
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
        item.fields.ring_aggregator,
      ),
      maxSumLimit: decodeFromFieldsWithTypes(Option.reified('u256'), item.fields.max_sum_limit),
    })
  }

  static fromBcs(data: Uint8Array): SlidingSumLimiter {
    return SlidingSumLimiter.fromFields(SlidingSumLimiter.bcs.parse(data))
  }

  toJSONField(): SlidingSumLimiterJSONField {
    return {
      ringAggregator: this.ringAggregator.toJSONField(),
      maxSumLimit: fieldToJSON<Option<'u256'>>(`${Option.$typeName}<u256>`, this.maxSumLimit),
    }
  }

  toJSON(): SlidingSumLimiterJSON {
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
      throw new Error(
        `not a SlidingSumLimiter json object: expected '${SlidingSumLimiter.$typeName}' but got '${json.$typeName}'`,
      )
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

      return SlidingSumLimiter.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SlidingSumLimiter.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<SlidingSumLimiter> {
    const res = await fetchObjectBcs(client, id)
    if (!isSlidingSumLimiter(res.type)) {
      throw new Error(`object at id ${id} is not a SlidingSumLimiter object`)
    }

    return SlidingSumLimiter.fromBcs(res.bcsBytes)
  }
}
