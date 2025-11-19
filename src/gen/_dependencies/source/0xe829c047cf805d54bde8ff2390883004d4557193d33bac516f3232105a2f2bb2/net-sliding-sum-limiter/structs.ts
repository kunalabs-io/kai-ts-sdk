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
import { SlidingSumLimiter } from '../sliding-sum-limiter/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== NetSlidingSumLimiter =============================== */

export function isNetSlidingSumLimiter(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::net_sliding_sum_limiter::NetSlidingSumLimiter`
}

export interface NetSlidingSumLimiterFields {
  inflowLimiter: ToField<SlidingSumLimiter>
  outflowLimiter: ToField<SlidingSumLimiter>
  maxNetInflowLimit: ToField<Option<'u256'>>
  maxNetOutflowLimit: ToField<Option<'u256'>>
}

export type NetSlidingSumLimiterReified = Reified<NetSlidingSumLimiter, NetSlidingSumLimiterFields>

export class NetSlidingSumLimiter implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::net_sliding_sum_limiter::NetSlidingSumLimiter`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = NetSlidingSumLimiter.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::net_sliding_sum_limiter::NetSlidingSumLimiter`
  readonly $typeArgs: []
  readonly $isPhantom = NetSlidingSumLimiter.$isPhantom

  readonly inflowLimiter: ToField<SlidingSumLimiter>
  readonly outflowLimiter: ToField<SlidingSumLimiter>
  readonly maxNetInflowLimit: ToField<Option<'u256'>>
  readonly maxNetOutflowLimit: ToField<Option<'u256'>>

  private constructor(typeArgs: [], fields: NetSlidingSumLimiterFields) {
    this.$fullTypeName = composeSuiType(
      NetSlidingSumLimiter.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::net_sliding_sum_limiter::NetSlidingSumLimiter`
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
        ...[]
      ) as `${typeof PKG_V1}::net_sliding_sum_limiter::NetSlidingSumLimiter`,
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
      fetch: async (client: SuiClient, id: string) => NetSlidingSumLimiter.fetch(client, id),
      new: (fields: NetSlidingSumLimiterFields) => {
        return new NetSlidingSumLimiter([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return NetSlidingSumLimiter.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<NetSlidingSumLimiter>> {
    return phantom(NetSlidingSumLimiter.reified())
  }
  static get p() {
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
        item.fields.inflow_limiter
      ),
      outflowLimiter: decodeFromFieldsWithTypes(
        SlidingSumLimiter.reified(),
        item.fields.outflow_limiter
      ),
      maxNetInflowLimit: decodeFromFieldsWithTypes(
        Option.reified('u256'),
        item.fields.max_net_inflow_limit
      ),
      maxNetOutflowLimit: decodeFromFieldsWithTypes(
        Option.reified('u256'),
        item.fields.max_net_outflow_limit
      ),
    })
  }

  static fromBcs(data: Uint8Array): NetSlidingSumLimiter {
    return NetSlidingSumLimiter.fromFields(NetSlidingSumLimiter.bcs.parse(data))
  }

  toJSONField() {
    return {
      inflowLimiter: this.inflowLimiter.toJSONField(),
      outflowLimiter: this.outflowLimiter.toJSONField(),
      maxNetInflowLimit: fieldToJSON<Option<'u256'>>(
        `${Option.$typeName}<u256>`,
        this.maxNetInflowLimit
      ),
      maxNetOutflowLimit: fieldToJSON<Option<'u256'>>(
        `${Option.$typeName}<u256>`,
        this.maxNetOutflowLimit
      ),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return NetSlidingSumLimiter.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): NetSlidingSumLimiter {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isNetSlidingSumLimiter(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a NetSlidingSumLimiter object`
      )
    }
    return NetSlidingSumLimiter.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): NetSlidingSumLimiter {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isNetSlidingSumLimiter(data.bcs.type)) {
        throw new Error(`object at is not a NetSlidingSumLimiter object`)
      }

      return NetSlidingSumLimiter.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return NetSlidingSumLimiter.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<NetSlidingSumLimiter> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching NetSlidingSumLimiter object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isNetSlidingSumLimiter(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a NetSlidingSumLimiter object`)
    }

    return NetSlidingSumLimiter.fromSuiObjectData(res.data)
  }
}
