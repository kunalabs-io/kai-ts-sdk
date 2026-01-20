/**
 * Ring buffer-based aggregator for maintaining sliding window sums over positions.
 *
 * Maintains a fixed number of buckets in a circular buffer. As positions advance,
 * the aggregator automatically rotates through buckets, zeroing out old buckets
 * and maintaining an accurate sum of values within the sliding window.
 *
 * Supports configurable bucket width and count, with O(1) operations for adding
 * values and advancing positions. Validates that positions can only advance forward.
 *
 * # Examples
 *
 * ```move
 * // Create aggregator with 10 buckets of width 1000
 * let mut agg = ring_aggregator::new(1000, 10);
 *
 * // Add values at different positions
 * agg.advance_and_add(500, 100);   // Add 100 at position 500
 * agg.advance_and_add(1500, 200);  // Add 200 at position 1500
 *
 * // Check current state
 * let total = agg.total_sum();           // Returns 300
 * let position = agg.current_position(); // Returns 1500
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
  vector,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'

/* ============================== RingAggregator =============================== */

export function isRingAggregator(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('rate-limiter', 'ring_aggregator::RingAggregator')
    }::ring_aggregator::RingAggregator`
}

export interface RingAggregatorFields {
  buckets: ToField<Vector<'u128'>>
  bucketWidth: ToField<'u64'>
  currentPosition: ToField<'u256'>
  totalSum: ToField<'u256'>
}

export type RingAggregatorReified = Reified<RingAggregator, RingAggregatorFields>

export type RingAggregatorJSONField = {
  buckets: string[]
  bucketWidth: string
  currentPosition: string
  totalSum: string
}

export type RingAggregatorJSON = {
  $typeName: typeof RingAggregator.$typeName
  $typeArgs: []
} & RingAggregatorJSONField

export class RingAggregator implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::ring_aggregator::RingAggregator` = `${
    getTypeOrigin('rate-limiter', 'ring_aggregator::RingAggregator')
  }::ring_aggregator::RingAggregator` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RingAggregator.$typeName = RingAggregator.$typeName
  readonly $fullTypeName: `${string}::ring_aggregator::RingAggregator`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RingAggregator.$isPhantom = RingAggregator.$isPhantom

  readonly buckets: ToField<Vector<'u128'>>
  readonly bucketWidth: ToField<'u64'>
  readonly currentPosition: ToField<'u256'>
  readonly totalSum: ToField<'u256'>

  private constructor(typeArgs: [], fields: RingAggregatorFields) {
    this.$fullTypeName = composeSuiType(
      RingAggregator.$typeName,
      ...typeArgs,
    ) as `${string}::ring_aggregator::RingAggregator`
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
        ...[],
      ) as `${string}::ring_aggregator::RingAggregator`,
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
      fetch: async (client: SupportedSuiClient, id: string) => RingAggregator.fetch(client, id),
      new: (fields: RingAggregatorFields) => {
        return new RingAggregator([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RingAggregatorReified {
    return RingAggregator.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RingAggregator>> {
    return phantom(RingAggregator.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RingAggregator>> {
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
      buckets: decodeFromFields(vector('u128'), fields.buckets),
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
      buckets: decodeFromFieldsWithTypes(vector('u128'), item.fields.buckets),
      bucketWidth: decodeFromFieldsWithTypes('u64', item.fields.bucket_width),
      currentPosition: decodeFromFieldsWithTypes('u256', item.fields.current_position),
      totalSum: decodeFromFieldsWithTypes('u256', item.fields.total_sum),
    })
  }

  static fromBcs(data: Uint8Array): RingAggregator {
    return RingAggregator.fromFields(RingAggregator.bcs.parse(data))
  }

  toJSONField(): RingAggregatorJSONField {
    return {
      buckets: fieldToJSON<Vector<'u128'>>(`vector<u128>`, this.buckets),
      bucketWidth: this.bucketWidth.toString(),
      currentPosition: this.currentPosition.toString(),
      totalSum: this.totalSum.toString(),
    }
  }

  toJSON(): RingAggregatorJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RingAggregator {
    return RingAggregator.reified().new({
      buckets: decodeFromJSONField(vector('u128'), field.buckets),
      bucketWidth: decodeFromJSONField('u64', field.bucketWidth),
      currentPosition: decodeFromJSONField('u256', field.currentPosition),
      totalSum: decodeFromJSONField('u256', field.totalSum),
    })
  }

  static fromJSON(json: Record<string, any>): RingAggregator {
    if (json.$typeName !== RingAggregator.$typeName) {
      throw new Error(
        `not a RingAggregator json object: expected '${RingAggregator.$typeName}' but got '${json.$typeName}'`,
      )
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

      return RingAggregator.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RingAggregator.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<RingAggregator> {
    const res = await fetchObjectBcs(client, id)
    if (!isRingAggregator(res.type)) {
      throw new Error(`object at id ${id} is not a RingAggregator object`)
    }

    return RingAggregator.fromBcs(res.bcsBytes)
  }
}
