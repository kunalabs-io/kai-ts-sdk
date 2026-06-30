/**
 * Net rate limiter that tracks both input and output values using sliding sum windows.
 *
 * Provides bidirectional rate limiting by maintaining separate sliding sum limiters
 * for input and output values, allowing calculation of net values (input - output)
 * while enforcing maximum limits on both directions independently.
 *
 * # Gross vs. net caps
 *
 * Each side has two independent bounds: a *gross* cap on the per-side total
 * over the window (`max_inflow_limit`, `max_outflow_limit`) and a *net* cap on
 * `|inflow − outflow|` (`max_net_inflow_limit`, `max_net_outflow_limit`).
 * They are not interchangeable.
 *
 * The net cap is a secondary check that bounds wash-style flows where both
 * sides grow together; it does *not* bound damage on its own. The effective
 * outflow ceiling over the window is:
 *
 * ```text
 * min(max_outflow_limit, max_net_outflow_limit + inflow_sum)
 * ```
 *
 * If `max_outflow_limit = None`, the ceiling scales 1:1 with however much
 * inflow has accumulated in the window — including inflow from unrelated
 * callers. A caller can therefore inflate their own outflow headroom by
 * first generating inflow, or by waiting for inflow from any other source.
 * The same relationship holds symmetrically on the inflow side.
 *
 * Set both the gross and the net cap on a given side unless the ceiling is
 * intended to float with the opposite side.
 *
 * See `sliding_sum_limiter`'s module-level "Cap sizing" note for the
 * per-side burst behavior that applies to each gross cap.
 *
 * # Examples
 *
 * ```move
 * // Create net limiter with 5-minute buckets, 12 buckets total (1 hour window)
 * let mut net_limiter = net_sliding_sum_limiter::new(
 * 5 * 60 * 1000,       // 5 minutes per bucket
 * 12,                  // 12 buckets (1 hour total)
 * option::some(10000), // Gross inflow cap (per-window total)
 * option::some(8000),  // Gross outflow cap (per-window total)
 * option::some(5000),  // Net inflow cap  (bound on inflow - outflow)
 * option::some(3000),  // Net outflow cap (bound on outflow - inflow)
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
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
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

  static get $typeName(): `${string}::net_sliding_sum_limiter::NetSlidingSumLimiter` {
    return `${
      getTypeOrigin('rate-limiter', 'net_sliding_sum_limiter::NetSlidingSumLimiter')
    }::net_sliding_sum_limiter::NetSlidingSumLimiter` as const
  }
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
      get typeName() {
        return NetSlidingSumLimiter.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          NetSlidingSumLimiter.$typeName,
          ...[],
        ) as `${string}::net_sliding_sum_limiter::NetSlidingSumLimiter`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        NetSlidingSumLimiter.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        NetSlidingSumLimiter.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        NetSlidingSumLimiter.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
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

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): NetSlidingSumLimiter {
    if (!isNetSlidingSumLimiter(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a NetSlidingSumLimiter object`)
    }
    return NetSlidingSumLimiter.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link NetSlidingSumLimiter.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
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

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link NetSlidingSumLimiter.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
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

  static async fetch(client: ClientWithCoreApi, id: string): Promise<NetSlidingSumLimiter> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isNetSlidingSumLimiter(object.type)) {
      throw new Error(`object at id ${id} is not a NetSlidingSumLimiter object`)
    }
    return NetSlidingSumLimiter.fromBcs(object.content)
  }
}
