/**
 * Net rate limiter that tracks both input and output values using sliding sum windows.
 *
 * Provides bidirectional rate limiting by maintaining separate sliding sum limiters
 * for input and output values, allowing calculation of net values (input - output)
 * while enforcing maximum limits on both directions independently.
 *
 * # Examples
 *
 * ```move
 * // Create net limiter with 5-minute buckets, 12 buckets total (1 hour window)
 * let mut net_limiter = net_sliding_sum_limiter::new(
 * 5 * 60 * 1000,  // 5 minutes per bucket
 * 12,             // 12 buckets (1 hour total)
 * option::some(10000), // Maximum inflow limit
 * option::some(8000),  // Maximum outflow limit
 * &clock
 * );
 *
 * // Consume inflow and outflow values
 * net_limiter.consume_inflow(1000, &clock);  // Add 1000 to inflow
 * net_limiter.consume_outflow(500, &clock);  // Add 500 to outflow
 *
 * // Check current state
 * let (net_amount, is_outflow) = net_limiter.net_value(); // Returns (500, false)
 * let inflow_total = net_limiter.inflow_total(); // Returns 1000
 * let outflow_total = net_limiter.outflow_total(); // Returns 500
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
import { SlidingSumLimiter } from '../sliding-sum-limiter/structs'

/* ============================== NetSlidingSumLimiter =============================== */

export function isNetSlidingSumLimiter(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('rate-limiter', 'net_sliding_sum_limiter::NetSlidingSumLimiter')
    }::net_sliding_sum_limiter::NetSlidingSumLimiter`
}

export interface NetSlidingSumLimiterFields {
  inflowLimiter: ToField<SlidingSumLimiter>
  outflowLimiter: ToField<SlidingSumLimiter>
  maxNetInflowLimit: ToField<Option<'u256'>>
  maxNetOutflowLimit: ToField<Option<'u256'>>
}

export type NetSlidingSumLimiterReified = Reified<NetSlidingSumLimiter, NetSlidingSumLimiterFields>

export type NetSlidingSumLimiterJSONField = {
  inflowLimiter: ToJSON<SlidingSumLimiter>
  outflowLimiter: ToJSON<SlidingSumLimiter>
  maxNetInflowLimit: string | null
  maxNetOutflowLimit: string | null
}

export type NetSlidingSumLimiterJSON = {
  $typeName: typeof NetSlidingSumLimiter.$typeName
  $typeArgs: []
} & NetSlidingSumLimiterJSONField

export class NetSlidingSumLimiter implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::net_sliding_sum_limiter::NetSlidingSumLimiter` = `${
    getTypeOrigin('rate-limiter', 'net_sliding_sum_limiter::NetSlidingSumLimiter')
  }::net_sliding_sum_limiter::NetSlidingSumLimiter` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof NetSlidingSumLimiter.$typeName = NetSlidingSumLimiter.$typeName
  readonly $fullTypeName: `${string}::net_sliding_sum_limiter::NetSlidingSumLimiter`
  readonly $typeArgs: []
  readonly $isPhantom: typeof NetSlidingSumLimiter.$isPhantom = NetSlidingSumLimiter.$isPhantom

  readonly inflowLimiter: ToField<SlidingSumLimiter>
  readonly outflowLimiter: ToField<SlidingSumLimiter>
  readonly maxNetInflowLimit: ToField<Option<'u256'>>
  readonly maxNetOutflowLimit: ToField<Option<'u256'>>

  private constructor(typeArgs: [], fields: NetSlidingSumLimiterFields) {
    this.$fullTypeName = composeSuiType(
      NetSlidingSumLimiter.$typeName,
      ...typeArgs,
    ) as `${string}::net_sliding_sum_limiter::NetSlidingSumLimiter`
    this.$typeArgs = typeArgs

    this.inflowLimiter = fields.inflowLimiter
    this.outflowLimiter = fields.outflowLimiter
    this.maxNetInflowLimit = fields.maxNetInflowLimit
    this.maxNetOutflowLimit = fields.maxNetOutflowLimit
  }

  static reified(): NetSlidingSumLimiterReified {
    const reifiedBcs = NetSlidingSumLimiter.bcs
    return {
      typeName: NetSlidingSumLimiter.$typeName,
      fullTypeName: composeSuiType(
        NetSlidingSumLimiter.$typeName,
        ...[],
      ) as `${string}::net_sliding_sum_limiter::NetSlidingSumLimiter`,
      typeArgs: [] as [],
      isPhantom: NetSlidingSumLimiter.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => NetSlidingSumLimiter.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        NetSlidingSumLimiter.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => NetSlidingSumLimiter.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => NetSlidingSumLimiter.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => NetSlidingSumLimiter.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        NetSlidingSumLimiter.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        NetSlidingSumLimiter.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        NetSlidingSumLimiter.fetch(client, id),
      new: (fields: NetSlidingSumLimiterFields) => {
        return new NetSlidingSumLimiter([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): NetSlidingSumLimiterReified {
    return NetSlidingSumLimiter.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<NetSlidingSumLimiter>> {
    return phantom(NetSlidingSumLimiter.reified())
  }

  static get p(): PhantomReified<ToTypeStr<NetSlidingSumLimiter>> {
    return NetSlidingSumLimiter.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('NetSlidingSumLimiter', {
      inflow_limiter: SlidingSumLimiter.bcs,
      outflow_limiter: SlidingSumLimiter.bcs,
      max_net_inflow_limit: Option.bcs(bcs.u256()),
      max_net_outflow_limit: Option.bcs(bcs.u256()),
    })
  }

  private static cachedBcs: ReturnType<typeof NetSlidingSumLimiter.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof NetSlidingSumLimiter.instantiateBcs> {
    if (!NetSlidingSumLimiter.cachedBcs) {
      NetSlidingSumLimiter.cachedBcs = NetSlidingSumLimiter.instantiateBcs()
    }
    return NetSlidingSumLimiter.cachedBcs
  }

  static fromFields(fields: Record<string, any>): NetSlidingSumLimiter {
    return NetSlidingSumLimiter.reified().new({
      inflowLimiter: decodeFromFields(SlidingSumLimiter.reified(), fields.inflow_limiter),
      outflowLimiter: decodeFromFields(SlidingSumLimiter.reified(), fields.outflow_limiter),
      maxNetInflowLimit: decodeFromFields(Option.reified('u256'), fields.max_net_inflow_limit),
      maxNetOutflowLimit: decodeFromFields(Option.reified('u256'), fields.max_net_outflow_limit),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): NetSlidingSumLimiter {
    if (!isNetSlidingSumLimiter(item.type)) {
      throw new Error('not a NetSlidingSumLimiter type')
    }

    return NetSlidingSumLimiter.reified().new({
      inflowLimiter: decodeFromFieldsWithTypes(
        SlidingSumLimiter.reified(),
        item.fields.inflow_limiter,
      ),
      outflowLimiter: decodeFromFieldsWithTypes(
        SlidingSumLimiter.reified(),
        item.fields.outflow_limiter,
      ),
      maxNetInflowLimit: decodeFromFieldsWithTypes(
        Option.reified('u256'),
        item.fields.max_net_inflow_limit,
      ),
      maxNetOutflowLimit: decodeFromFieldsWithTypes(
        Option.reified('u256'),
        item.fields.max_net_outflow_limit,
      ),
    })
  }

  static fromBcs(data: Uint8Array): NetSlidingSumLimiter {
    return NetSlidingSumLimiter.fromFields(NetSlidingSumLimiter.bcs.parse(data))
  }

  toJSONField(): NetSlidingSumLimiterJSONField {
    return {
      inflowLimiter: this.inflowLimiter.toJSONField(),
      outflowLimiter: this.outflowLimiter.toJSONField(),
      maxNetInflowLimit: fieldToJSON<Option<'u256'>>(
        `${Option.$typeName}<u256>`,
        this.maxNetInflowLimit,
      ),
      maxNetOutflowLimit: fieldToJSON<Option<'u256'>>(
        `${Option.$typeName}<u256>`,
        this.maxNetOutflowLimit,
      ),
    }
  }

  toJSON(): NetSlidingSumLimiterJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): NetSlidingSumLimiter {
    return NetSlidingSumLimiter.reified().new({
      inflowLimiter: decodeFromJSONField(SlidingSumLimiter.reified(), field.inflowLimiter),
      outflowLimiter: decodeFromJSONField(SlidingSumLimiter.reified(), field.outflowLimiter),
      maxNetInflowLimit: decodeFromJSONField(Option.reified('u256'), field.maxNetInflowLimit),
      maxNetOutflowLimit: decodeFromJSONField(Option.reified('u256'), field.maxNetOutflowLimit),
    })
  }

  static fromJSON(json: Record<string, any>): NetSlidingSumLimiter {
    if (json.$typeName !== NetSlidingSumLimiter.$typeName) {
      throw new Error(
        `not a NetSlidingSumLimiter json object: expected '${NetSlidingSumLimiter.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return NetSlidingSumLimiter.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): NetSlidingSumLimiter {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isNetSlidingSumLimiter(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a NetSlidingSumLimiter object`,
      )
    }
    return NetSlidingSumLimiter.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): NetSlidingSumLimiter {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isNetSlidingSumLimiter(data.bcs.type)) {
        throw new Error(`object at is not a NetSlidingSumLimiter object`)
      }

      return NetSlidingSumLimiter.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return NetSlidingSumLimiter.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<NetSlidingSumLimiter> {
    const res = await fetchObjectBcs(client, id)
    if (!isNetSlidingSumLimiter(res.type)) {
      throw new Error(`object at id ${id} is not a NetSlidingSumLimiter object`)
    }

    return NetSlidingSumLimiter.fromBcs(res.bcsBytes)
  }
}
