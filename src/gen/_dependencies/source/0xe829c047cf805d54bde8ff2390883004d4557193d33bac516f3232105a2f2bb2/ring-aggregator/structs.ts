import * as reified from '../../../../_framework/reified'
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
import { Vector } from '../../../../_framework/vector'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== RingAggregator =============================== */

export function isRingAggregator(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::ring_aggregator::RingAggregator`
}

export interface RingAggregatorFields {
  buckets: ToField<Vector<'u128'>>
  bucketWidth: ToField<'u64'>
  currentPosition: ToField<'u256'>
  totalSum: ToField<'u256'>
}

export type RingAggregatorReified = Reified<RingAggregator, RingAggregatorFields>

export class RingAggregator implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::ring_aggregator::RingAggregator`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RingAggregator.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::ring_aggregator::RingAggregator`
  readonly $typeArgs: []
  readonly $isPhantom = RingAggregator.$isPhantom

  readonly buckets: ToField<Vector<'u128'>>
  readonly bucketWidth: ToField<'u64'>
  readonly currentPosition: ToField<'u256'>
  readonly totalSum: ToField<'u256'>

  private constructor(typeArgs: [], fields: RingAggregatorFields) {
    this.$fullTypeName = composeSuiType(
      RingAggregator.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::ring_aggregator::RingAggregator`
    this.$typeArgs = typeArgs

    this.buckets = fields.buckets
    this.bucketWidth = fields.bucketWidth
    this.currentPosition = fields.currentPosition
    this.totalSum = fields.totalSum
  }

  static reified(): RingAggregatorReified {
    const reifiedBcs = RingAggregator.bcs
    return {
      typeName: RingAggregator.$typeName,
      fullTypeName: composeSuiType(
        RingAggregator.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::ring_aggregator::RingAggregator`,
      typeArgs: [] as [],
      isPhantom: RingAggregator.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RingAggregator.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RingAggregator.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RingAggregator.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RingAggregator.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RingAggregator.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RingAggregator.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RingAggregator.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RingAggregator.fetch(client, id),
      new: (fields: RingAggregatorFields) => {
        return new RingAggregator([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RingAggregator.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RingAggregator>> {
    return phantom(RingAggregator.reified())
  }
  static get p() {
    return RingAggregator.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RingAggregator', {
      buckets: bcs.vector(bcs.u128()),
      bucket_width: bcs.u64(),
      current_position: bcs.u256(),
      total_sum: bcs.u256(),
    })
  }

  private static cachedBcs: ReturnType<typeof RingAggregator.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RingAggregator.instantiateBcs> {
    if (!RingAggregator.cachedBcs) {
      RingAggregator.cachedBcs = RingAggregator.instantiateBcs()
    }
    return RingAggregator.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RingAggregator {
    return RingAggregator.reified().new({
      buckets: decodeFromFields(reified.vector('u128'), fields.buckets),
      bucketWidth: decodeFromFields('u64', fields.bucket_width),
      currentPosition: decodeFromFields('u256', fields.current_position),
      totalSum: decodeFromFields('u256', fields.total_sum),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RingAggregator {
    if (!isRingAggregator(item.type)) {
      throw new Error('not a RingAggregator type')
    }

    return RingAggregator.reified().new({
      buckets: decodeFromFieldsWithTypes(reified.vector('u128'), item.fields.buckets),
      bucketWidth: decodeFromFieldsWithTypes('u64', item.fields.bucket_width),
      currentPosition: decodeFromFieldsWithTypes('u256', item.fields.current_position),
      totalSum: decodeFromFieldsWithTypes('u256', item.fields.total_sum),
    })
  }

  static fromBcs(data: Uint8Array): RingAggregator {
    return RingAggregator.fromFields(RingAggregator.bcs.parse(data))
  }

  toJSONField() {
    return {
      buckets: fieldToJSON<Vector<'u128'>>(`vector<u128>`, this.buckets),
      bucketWidth: this.bucketWidth.toString(),
      currentPosition: this.currentPosition.toString(),
      totalSum: this.totalSum.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RingAggregator {
    return RingAggregator.reified().new({
      buckets: decodeFromJSONField(reified.vector('u128'), field.buckets),
      bucketWidth: decodeFromJSONField('u64', field.bucketWidth),
      currentPosition: decodeFromJSONField('u256', field.currentPosition),
      totalSum: decodeFromJSONField('u256', field.totalSum),
    })
  }

  static fromJSON(json: Record<string, any>): RingAggregator {
    if (json.$typeName !== RingAggregator.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RingAggregator.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RingAggregator {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRingAggregator(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RingAggregator object`)
    }
    return RingAggregator.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RingAggregator {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRingAggregator(data.bcs.type)) {
        throw new Error(`object at is not a RingAggregator object`)
      }

      return RingAggregator.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RingAggregator.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RingAggregator> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RingAggregator object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRingAggregator(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RingAggregator object`)
    }

    return RingAggregator.fromSuiObjectData(res.data)
  }
}
