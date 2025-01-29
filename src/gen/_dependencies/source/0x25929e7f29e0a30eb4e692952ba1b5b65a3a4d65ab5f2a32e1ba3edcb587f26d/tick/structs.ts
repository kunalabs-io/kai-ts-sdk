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
import { I128 } from '../i128/structs'
import { I64 } from '../i64/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== TickInfo =============================== */

export function isTickInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::tick::TickInfo`
}

export interface TickInfoFields {
  liquidityGross: ToField<'u128'>
  liquidityNet: ToField<I128>
  feeGrowthOutsideX: ToField<'u128'>
  feeGrowthOutsideY: ToField<'u128'>
  rewardGrowthsOutside: ToField<Vector<'u128'>>
  tickCumulativeOutSide: ToField<I64>
  secondsPerLiquidityOutSide: ToField<'u256'>
  secondsOutSide: ToField<'u64'>
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

  readonly liquidityGross: ToField<'u128'>
  readonly liquidityNet: ToField<I128>
  readonly feeGrowthOutsideX: ToField<'u128'>
  readonly feeGrowthOutsideY: ToField<'u128'>
  readonly rewardGrowthsOutside: ToField<Vector<'u128'>>
  readonly tickCumulativeOutSide: ToField<I64>
  readonly secondsPerLiquidityOutSide: ToField<'u256'>
  readonly secondsOutSide: ToField<'u64'>

  private constructor(typeArgs: [], fields: TickInfoFields) {
    this.$fullTypeName = composeSuiType(
      TickInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::tick::TickInfo`
    this.$typeArgs = typeArgs

    this.liquidityGross = fields.liquidityGross
    this.liquidityNet = fields.liquidityNet
    this.feeGrowthOutsideX = fields.feeGrowthOutsideX
    this.feeGrowthOutsideY = fields.feeGrowthOutsideY
    this.rewardGrowthsOutside = fields.rewardGrowthsOutside
    this.tickCumulativeOutSide = fields.tickCumulativeOutSide
    this.secondsPerLiquidityOutSide = fields.secondsPerLiquidityOutSide
    this.secondsOutSide = fields.secondsOutSide
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
      liquidity_gross: bcs.u128(),
      liquidity_net: I128.bcs,
      fee_growth_outside_x: bcs.u128(),
      fee_growth_outside_y: bcs.u128(),
      reward_growths_outside: bcs.vector(bcs.u128()),
      tick_cumulative_out_side: I64.bcs,
      seconds_per_liquidity_out_side: bcs.u256(),
      seconds_out_side: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): TickInfo {
    return TickInfo.reified().new({
      liquidityGross: decodeFromFields('u128', fields.liquidity_gross),
      liquidityNet: decodeFromFields(I128.reified(), fields.liquidity_net),
      feeGrowthOutsideX: decodeFromFields('u128', fields.fee_growth_outside_x),
      feeGrowthOutsideY: decodeFromFields('u128', fields.fee_growth_outside_y),
      rewardGrowthsOutside: decodeFromFields(reified.vector('u128'), fields.reward_growths_outside),
      tickCumulativeOutSide: decodeFromFields(I64.reified(), fields.tick_cumulative_out_side),
      secondsPerLiquidityOutSide: decodeFromFields('u256', fields.seconds_per_liquidity_out_side),
      secondsOutSide: decodeFromFields('u64', fields.seconds_out_side),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TickInfo {
    if (!isTickInfo(item.type)) {
      throw new Error('not a TickInfo type')
    }

    return TickInfo.reified().new({
      liquidityGross: decodeFromFieldsWithTypes('u128', item.fields.liquidity_gross),
      liquidityNet: decodeFromFieldsWithTypes(I128.reified(), item.fields.liquidity_net),
      feeGrowthOutsideX: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_outside_x),
      feeGrowthOutsideY: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_outside_y),
      rewardGrowthsOutside: decodeFromFieldsWithTypes(
        reified.vector('u128'),
        item.fields.reward_growths_outside
      ),
      tickCumulativeOutSide: decodeFromFieldsWithTypes(
        I64.reified(),
        item.fields.tick_cumulative_out_side
      ),
      secondsPerLiquidityOutSide: decodeFromFieldsWithTypes(
        'u256',
        item.fields.seconds_per_liquidity_out_side
      ),
      secondsOutSide: decodeFromFieldsWithTypes('u64', item.fields.seconds_out_side),
    })
  }

  static fromBcs(data: Uint8Array): TickInfo {
    return TickInfo.fromFields(TickInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      liquidityGross: this.liquidityGross.toString(),
      liquidityNet: this.liquidityNet.toJSONField(),
      feeGrowthOutsideX: this.feeGrowthOutsideX.toString(),
      feeGrowthOutsideY: this.feeGrowthOutsideY.toString(),
      rewardGrowthsOutside: fieldToJSON<Vector<'u128'>>(`vector<u128>`, this.rewardGrowthsOutside),
      tickCumulativeOutSide: this.tickCumulativeOutSide.toJSONField(),
      secondsPerLiquidityOutSide: this.secondsPerLiquidityOutSide.toString(),
      secondsOutSide: this.secondsOutSide.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TickInfo {
    return TickInfo.reified().new({
      liquidityGross: decodeFromJSONField('u128', field.liquidityGross),
      liquidityNet: decodeFromJSONField(I128.reified(), field.liquidityNet),
      feeGrowthOutsideX: decodeFromJSONField('u128', field.feeGrowthOutsideX),
      feeGrowthOutsideY: decodeFromJSONField('u128', field.feeGrowthOutsideY),
      rewardGrowthsOutside: decodeFromJSONField(reified.vector('u128'), field.rewardGrowthsOutside),
      tickCumulativeOutSide: decodeFromJSONField(I64.reified(), field.tickCumulativeOutSide),
      secondsPerLiquidityOutSide: decodeFromJSONField('u256', field.secondsPerLiquidityOutSide),
      secondsOutSide: decodeFromJSONField('u64', field.secondsOutSide),
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
