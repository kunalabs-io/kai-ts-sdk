import * as reified from '../../_framework/reified'
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
  ToTypeStr as ToPhantom,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I128 } from '../../integer-mate/i128/structs'
import { I32 } from '../../integer-mate/i32/structs'
import { I64 } from '../../integer-mate/i64/structs'
import { Table } from '../../sui/table/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== TickManager =============================== */

export function isTickManager(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::tick::TickManager`
}

export interface TickManagerFields {
  tickSpacing: ToField<'u32'>
  ticks: ToField<Table<ToPhantom<I32>, ToPhantom<TickInfo>>>
  bitmap: ToField<Table<ToPhantom<I32>, 'u256'>>
}

export type TickManagerReified = Reified<TickManager, TickManagerFields>

export class TickManager implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::tick::TickManager`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TickManager.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::tick::TickManager`
  readonly $typeArgs: []
  readonly $isPhantom = TickManager.$isPhantom

  readonly tickSpacing: ToField<'u32'>
  readonly ticks: ToField<Table<ToPhantom<I32>, ToPhantom<TickInfo>>>
  readonly bitmap: ToField<Table<ToPhantom<I32>, 'u256'>>

  private constructor(typeArgs: [], fields: TickManagerFields) {
    this.$fullTypeName = composeSuiType(
      TickManager.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::tick::TickManager`
    this.$typeArgs = typeArgs

    this.tickSpacing = fields.tickSpacing
    this.ticks = fields.ticks
    this.bitmap = fields.bitmap
  }

  static reified(): TickManagerReified {
    return {
      typeName: TickManager.$typeName,
      fullTypeName: composeSuiType(
        TickManager.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::tick::TickManager`,
      typeArgs: [] as [],
      isPhantom: TickManager.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TickManager.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TickManager.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TickManager.fromBcs(data),
      bcs: TickManager.bcs,
      fromJSONField: (field: any) => TickManager.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TickManager.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TickManager.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TickManager.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TickManager.fetch(client, id),
      new: (fields: TickManagerFields) => {
        return new TickManager([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TickManager.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TickManager>> {
    return phantom(TickManager.reified())
  }
  static get p() {
    return TickManager.phantom()
  }

  static get bcs() {
    return bcs.struct('TickManager', {
      tick_spacing: bcs.u32(),
      ticks: Table.bcs,
      bitmap: Table.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): TickManager {
    return TickManager.reified().new({
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      ticks: decodeFromFields(
        Table.reified(reified.phantom(I32.reified()), reified.phantom(TickInfo.reified())),
        fields.ticks
      ),
      bitmap: decodeFromFields(
        Table.reified(reified.phantom(I32.reified()), reified.phantom('u256')),
        fields.bitmap
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TickManager {
    if (!isTickManager(item.type)) {
      throw new Error('not a TickManager type')
    }

    return TickManager.reified().new({
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      ticks: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(I32.reified()), reified.phantom(TickInfo.reified())),
        item.fields.ticks
      ),
      bitmap: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(I32.reified()), reified.phantom('u256')),
        item.fields.bitmap
      ),
    })
  }

  static fromBcs(data: Uint8Array): TickManager {
    return TickManager.fromFields(TickManager.bcs.parse(data))
  }

  toJSONField() {
    return {
      tickSpacing: this.tickSpacing,
      ticks: this.ticks.toJSONField(),
      bitmap: this.bitmap.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TickManager {
    return TickManager.reified().new({
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      ticks: decodeFromJSONField(
        Table.reified(reified.phantom(I32.reified()), reified.phantom(TickInfo.reified())),
        field.ticks
      ),
      bitmap: decodeFromJSONField(
        Table.reified(reified.phantom(I32.reified()), reified.phantom('u256')),
        field.bitmap
      ),
    })
  }

  static fromJSON(json: Record<string, any>): TickManager {
    if (json.$typeName !== TickManager.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TickManager.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TickManager {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTickManager(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TickManager object`)
    }
    return TickManager.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TickManager {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTickManager(data.bcs.type)) {
        throw new Error(`object at is not a TickManager object`)
      }

      return TickManager.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TickManager.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TickManager> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TickManager object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTickManager(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TickManager object`)
    }

    return TickManager.fromSuiObjectData(res.data)
  }
}

/* ============================== TickInfo =============================== */

export function isTickInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::tick::TickInfo`
}

export interface TickInfoFields {
  index: ToField<I32>
  sqrtPrice: ToField<'u128'>
  liquidityGross: ToField<'u128'>
  liquidityNet: ToField<I128>
  feeGrowthOutsideA: ToField<'u128'>
  feeGrowthOutsideB: ToField<'u128'>
  tickCumulativeOutSide: ToField<I64>
  secondsPerLiquidityOutSide: ToField<'u256'>
  secondsOutSide: ToField<'u64'>
  rewardGrowthsOutside: ToField<Vector<'u128'>>
}

export type TickInfoReified = Reified<TickInfo, TickInfoFields>

export class TickInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::tick::TickInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TickInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::tick::TickInfo`
  readonly $typeArgs: []
  readonly $isPhantom = TickInfo.$isPhantom

  readonly index: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly liquidityGross: ToField<'u128'>
  readonly liquidityNet: ToField<I128>
  readonly feeGrowthOutsideA: ToField<'u128'>
  readonly feeGrowthOutsideB: ToField<'u128'>
  readonly tickCumulativeOutSide: ToField<I64>
  readonly secondsPerLiquidityOutSide: ToField<'u256'>
  readonly secondsOutSide: ToField<'u64'>
  readonly rewardGrowthsOutside: ToField<Vector<'u128'>>

  private constructor(typeArgs: [], fields: TickInfoFields) {
    this.$fullTypeName = composeSuiType(
      TickInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::tick::TickInfo`
    this.$typeArgs = typeArgs

    this.index = fields.index
    this.sqrtPrice = fields.sqrtPrice
    this.liquidityGross = fields.liquidityGross
    this.liquidityNet = fields.liquidityNet
    this.feeGrowthOutsideA = fields.feeGrowthOutsideA
    this.feeGrowthOutsideB = fields.feeGrowthOutsideB
    this.tickCumulativeOutSide = fields.tickCumulativeOutSide
    this.secondsPerLiquidityOutSide = fields.secondsPerLiquidityOutSide
    this.secondsOutSide = fields.secondsOutSide
    this.rewardGrowthsOutside = fields.rewardGrowthsOutside
  }

  static reified(): TickInfoReified {
    return {
      typeName: TickInfo.$typeName,
      fullTypeName: composeSuiType(TickInfo.$typeName, ...[]) as `${typeof PKG_V1}::tick::TickInfo`,
      typeArgs: [] as [],
      isPhantom: TickInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TickInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TickInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TickInfo.fromBcs(data),
      bcs: TickInfo.bcs,
      fromJSONField: (field: any) => TickInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TickInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TickInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TickInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TickInfo.fetch(client, id),
      new: (fields: TickInfoFields) => {
        return new TickInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TickInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TickInfo>> {
    return phantom(TickInfo.reified())
  }
  static get p() {
    return TickInfo.phantom()
  }

  static get bcs() {
    return bcs.struct('TickInfo', {
      index: I32.bcs,
      sqrt_price: bcs.u128(),
      liquidity_gross: bcs.u128(),
      liquidity_net: I128.bcs,
      fee_growth_outside_a: bcs.u128(),
      fee_growth_outside_b: bcs.u128(),
      tick_cumulative_out_side: I64.bcs,
      seconds_per_liquidity_out_side: bcs.u256(),
      seconds_out_side: bcs.u64(),
      reward_growths_outside: bcs.vector(bcs.u128()),
    })
  }

  static fromFields(fields: Record<string, any>): TickInfo {
    return TickInfo.reified().new({
      index: decodeFromFields(I32.reified(), fields.index),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      liquidityGross: decodeFromFields('u128', fields.liquidity_gross),
      liquidityNet: decodeFromFields(I128.reified(), fields.liquidity_net),
      feeGrowthOutsideA: decodeFromFields('u128', fields.fee_growth_outside_a),
      feeGrowthOutsideB: decodeFromFields('u128', fields.fee_growth_outside_b),
      tickCumulativeOutSide: decodeFromFields(I64.reified(), fields.tick_cumulative_out_side),
      secondsPerLiquidityOutSide: decodeFromFields('u256', fields.seconds_per_liquidity_out_side),
      secondsOutSide: decodeFromFields('u64', fields.seconds_out_side),
      rewardGrowthsOutside: decodeFromFields(reified.vector('u128'), fields.reward_growths_outside),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TickInfo {
    if (!isTickInfo(item.type)) {
      throw new Error('not a TickInfo type')
    }

    return TickInfo.reified().new({
      index: decodeFromFieldsWithTypes(I32.reified(), item.fields.index),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      liquidityGross: decodeFromFieldsWithTypes('u128', item.fields.liquidity_gross),
      liquidityNet: decodeFromFieldsWithTypes(I128.reified(), item.fields.liquidity_net),
      feeGrowthOutsideA: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_outside_a),
      feeGrowthOutsideB: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_outside_b),
      tickCumulativeOutSide: decodeFromFieldsWithTypes(
        I64.reified(),
        item.fields.tick_cumulative_out_side
      ),
      secondsPerLiquidityOutSide: decodeFromFieldsWithTypes(
        'u256',
        item.fields.seconds_per_liquidity_out_side
      ),
      secondsOutSide: decodeFromFieldsWithTypes('u64', item.fields.seconds_out_side),
      rewardGrowthsOutside: decodeFromFieldsWithTypes(
        reified.vector('u128'),
        item.fields.reward_growths_outside
      ),
    })
  }

  static fromBcs(data: Uint8Array): TickInfo {
    return TickInfo.fromFields(TickInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      index: this.index.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      liquidityGross: this.liquidityGross.toString(),
      liquidityNet: this.liquidityNet.toJSONField(),
      feeGrowthOutsideA: this.feeGrowthOutsideA.toString(),
      feeGrowthOutsideB: this.feeGrowthOutsideB.toString(),
      tickCumulativeOutSide: this.tickCumulativeOutSide.toJSONField(),
      secondsPerLiquidityOutSide: this.secondsPerLiquidityOutSide.toString(),
      secondsOutSide: this.secondsOutSide.toString(),
      rewardGrowthsOutside: fieldToJSON<Vector<'u128'>>(`vector<u128>`, this.rewardGrowthsOutside),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TickInfo {
    return TickInfo.reified().new({
      index: decodeFromJSONField(I32.reified(), field.index),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      liquidityGross: decodeFromJSONField('u128', field.liquidityGross),
      liquidityNet: decodeFromJSONField(I128.reified(), field.liquidityNet),
      feeGrowthOutsideA: decodeFromJSONField('u128', field.feeGrowthOutsideA),
      feeGrowthOutsideB: decodeFromJSONField('u128', field.feeGrowthOutsideB),
      tickCumulativeOutSide: decodeFromJSONField(I64.reified(), field.tickCumulativeOutSide),
      secondsPerLiquidityOutSide: decodeFromJSONField('u256', field.secondsPerLiquidityOutSide),
      secondsOutSide: decodeFromJSONField('u64', field.secondsOutSide),
      rewardGrowthsOutside: decodeFromJSONField(reified.vector('u128'), field.rewardGrowthsOutside),
    })
  }

  static fromJSON(json: Record<string, any>): TickInfo {
    if (json.$typeName !== TickInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TickInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TickInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTickInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TickInfo object`)
    }
    return TickInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TickInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTickInfo(data.bcs.type)) {
        throw new Error(`object at is not a TickInfo object`)
      }

      return TickInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TickInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TickInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TickInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTickInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TickInfo object`)
    }

    return TickInfo.fromSuiObjectData(res.data)
  }
}
