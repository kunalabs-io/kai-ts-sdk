import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { Balance } from '../../../../sui/balance/structs'
import { ID, UID } from '../../../../sui/object/structs'
import { Table } from '../../../../sui/table/structs'
import { I128 } from '../i128/structs'
import { I32 } from '../i32/structs'
import { PKG_V1 } from '../index'
import { Observation } from '../oracle/structs'
import { TickInfo } from '../tick/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== Pool =============================== */

export function isPool(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::pool::Pool` + '<')
}

export interface PoolFields<T0 extends PhantomTypeArgument, T1 extends PhantomTypeArgument> {
  id: ToField<UID>
  coinTypeX: ToField<TypeName>
  coinTypeY: ToField<TypeName>
  sqrtPrice: ToField<'u128'>
  tickIndex: ToField<I32>
  observationIndex: ToField<'u64'>
  observationCardinality: ToField<'u64'>
  observationCardinalityNext: ToField<'u64'>
  tickSpacing: ToField<'u32'>
  maxLiquidityPerTick: ToField<'u128'>
  protocolFeeRate: ToField<'u64'>
  swapFeeRate: ToField<'u64'>
  feeGrowthGlobalX: ToField<'u128'>
  feeGrowthGlobalY: ToField<'u128'>
  protocolFeeX: ToField<'u64'>
  protocolFeeY: ToField<'u64'>
  liquidity: ToField<'u128'>
  ticks: ToField<Table<ToPhantom<I32>, ToPhantom<TickInfo>>>
  tickBitmap: ToField<Table<ToPhantom<I32>, 'u256'>>
  observations: ToField<Vector<Observation>>
  locked: ToField<'bool'>
  rewardInfos: ToField<Vector<PoolRewardInfo>>
  reserveX: ToField<Balance<T0>>
  reserveY: ToField<Balance<T1>>
}

export type PoolReified<T0 extends PhantomTypeArgument, T1 extends PhantomTypeArgument> = Reified<
  Pool<T0, T1>,
  PoolFields<T0, T1>
>

export class Pool<T0 extends PhantomTypeArgument, T1 extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::Pool`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = Pool.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::Pool<${PhantomToTypeStr<T0>}, ${PhantomToTypeStr<T1>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>, PhantomToTypeStr<T1>]
  readonly $isPhantom = Pool.$isPhantom

  readonly id: ToField<UID>
  readonly coinTypeX: ToField<TypeName>
  readonly coinTypeY: ToField<TypeName>
  readonly sqrtPrice: ToField<'u128'>
  readonly tickIndex: ToField<I32>
  readonly observationIndex: ToField<'u64'>
  readonly observationCardinality: ToField<'u64'>
  readonly observationCardinalityNext: ToField<'u64'>
  readonly tickSpacing: ToField<'u32'>
  readonly maxLiquidityPerTick: ToField<'u128'>
  readonly protocolFeeRate: ToField<'u64'>
  readonly swapFeeRate: ToField<'u64'>
  readonly feeGrowthGlobalX: ToField<'u128'>
  readonly feeGrowthGlobalY: ToField<'u128'>
  readonly protocolFeeX: ToField<'u64'>
  readonly protocolFeeY: ToField<'u64'>
  readonly liquidity: ToField<'u128'>
  readonly ticks: ToField<Table<ToPhantom<I32>, ToPhantom<TickInfo>>>
  readonly tickBitmap: ToField<Table<ToPhantom<I32>, 'u256'>>
  readonly observations: ToField<Vector<Observation>>
  readonly locked: ToField<'bool'>
  readonly rewardInfos: ToField<Vector<PoolRewardInfo>>
  readonly reserveX: ToField<Balance<T0>>
  readonly reserveY: ToField<Balance<T1>>

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>, PhantomToTypeStr<T1>],
    fields: PoolFields<T0, T1>
  ) {
    this.$fullTypeName = composeSuiType(
      Pool.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::Pool<${PhantomToTypeStr<T0>}, ${PhantomToTypeStr<T1>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.coinTypeX = fields.coinTypeX
    this.coinTypeY = fields.coinTypeY
    this.sqrtPrice = fields.sqrtPrice
    this.tickIndex = fields.tickIndex
    this.observationIndex = fields.observationIndex
    this.observationCardinality = fields.observationCardinality
    this.observationCardinalityNext = fields.observationCardinalityNext
    this.tickSpacing = fields.tickSpacing
    this.maxLiquidityPerTick = fields.maxLiquidityPerTick
    this.protocolFeeRate = fields.protocolFeeRate
    this.swapFeeRate = fields.swapFeeRate
    this.feeGrowthGlobalX = fields.feeGrowthGlobalX
    this.feeGrowthGlobalY = fields.feeGrowthGlobalY
    this.protocolFeeX = fields.protocolFeeX
    this.protocolFeeY = fields.protocolFeeY
    this.liquidity = fields.liquidity
    this.ticks = fields.ticks
    this.tickBitmap = fields.tickBitmap
    this.observations = fields.observations
    this.locked = fields.locked
    this.rewardInfos = fields.rewardInfos
    this.reserveX = fields.reserveX
    this.reserveY = fields.reserveY
  }

  static reified<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(T0: T0, T1: T1): PoolReified<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    return {
      typeName: Pool.$typeName,
      fullTypeName: composeSuiType(
        Pool.$typeName,
        ...[extractType(T0), extractType(T1)]
      ) as `${typeof PKG_V1}::pool::Pool<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<T1>>}>`,
      typeArgs: [extractType(T0), extractType(T1)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T0>>,
        PhantomToTypeStr<ToPhantomTypeArgument<T1>>,
      ],
      isPhantom: Pool.$isPhantom,
      reifiedTypeArgs: [T0, T1],
      fromFields: (fields: Record<string, any>) => Pool.fromFields([T0, T1], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Pool.fromFieldsWithTypes([T0, T1], item),
      fromBcs: (data: Uint8Array) => Pool.fromBcs([T0, T1], data),
      bcs: Pool.bcs,
      fromJSONField: (field: any) => Pool.fromJSONField([T0, T1], field),
      fromJSON: (json: Record<string, any>) => Pool.fromJSON([T0, T1], json),
      fromSuiParsedData: (content: SuiParsedData) => Pool.fromSuiParsedData([T0, T1], content),
      fromSuiObjectData: (content: SuiObjectData) => Pool.fromSuiObjectData([T0, T1], content),
      fetch: async (client: SuiClient, id: string) => Pool.fetch(client, [T0, T1], id),
      new: (fields: PoolFields<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>>) => {
        return new Pool([extractType(T0), extractType(T1)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Pool.reified
  }

  static phantom<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    T0: T0,
    T1: T1
  ): PhantomReified<ToTypeStr<Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>>>> {
    return phantom(Pool.reified(T0, T1))
  }
  static get p() {
    return Pool.phantom
  }

  static get bcs() {
    return bcs.struct('Pool', {
      id: UID.bcs,
      coin_type_x: TypeName.bcs,
      coin_type_y: TypeName.bcs,
      sqrt_price: bcs.u128(),
      tick_index: I32.bcs,
      observation_index: bcs.u64(),
      observation_cardinality: bcs.u64(),
      observation_cardinality_next: bcs.u64(),
      tick_spacing: bcs.u32(),
      max_liquidity_per_tick: bcs.u128(),
      protocol_fee_rate: bcs.u64(),
      swap_fee_rate: bcs.u64(),
      fee_growth_global_x: bcs.u128(),
      fee_growth_global_y: bcs.u128(),
      protocol_fee_x: bcs.u64(),
      protocol_fee_y: bcs.u64(),
      liquidity: bcs.u128(),
      ticks: Table.bcs,
      tick_bitmap: Table.bcs,
      observations: bcs.vector(Observation.bcs),
      locked: bcs.bool(),
      reward_infos: bcs.vector(PoolRewardInfo.bcs),
      reserve_x: Balance.bcs,
      reserve_y: Balance.bcs,
    })
  }

  static fromFields<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    fields: Record<string, any>
  ): Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      coinTypeX: decodeFromFields(TypeName.reified(), fields.coin_type_x),
      coinTypeY: decodeFromFields(TypeName.reified(), fields.coin_type_y),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      tickIndex: decodeFromFields(I32.reified(), fields.tick_index),
      observationIndex: decodeFromFields('u64', fields.observation_index),
      observationCardinality: decodeFromFields('u64', fields.observation_cardinality),
      observationCardinalityNext: decodeFromFields('u64', fields.observation_cardinality_next),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      maxLiquidityPerTick: decodeFromFields('u128', fields.max_liquidity_per_tick),
      protocolFeeRate: decodeFromFields('u64', fields.protocol_fee_rate),
      swapFeeRate: decodeFromFields('u64', fields.swap_fee_rate),
      feeGrowthGlobalX: decodeFromFields('u128', fields.fee_growth_global_x),
      feeGrowthGlobalY: decodeFromFields('u128', fields.fee_growth_global_y),
      protocolFeeX: decodeFromFields('u64', fields.protocol_fee_x),
      protocolFeeY: decodeFromFields('u64', fields.protocol_fee_y),
      liquidity: decodeFromFields('u128', fields.liquidity),
      ticks: decodeFromFields(
        Table.reified(reified.phantom(I32.reified()), reified.phantom(TickInfo.reified())),
        fields.ticks
      ),
      tickBitmap: decodeFromFields(
        Table.reified(reified.phantom(I32.reified()), reified.phantom('u256')),
        fields.tick_bitmap
      ),
      observations: decodeFromFields(reified.vector(Observation.reified()), fields.observations),
      locked: decodeFromFields('bool', fields.locked),
      rewardInfos: decodeFromFields(reified.vector(PoolRewardInfo.reified()), fields.reward_infos),
      reserveX: decodeFromFields(Balance.reified(typeArgs[0]), fields.reserve_x),
      reserveY: decodeFromFields(Balance.reified(typeArgs[1]), fields.reserve_y),
    })
  }

  static fromFieldsWithTypes<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    item: FieldsWithTypes
  ): Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    if (!isPool(item.type)) {
      throw new Error('not a Pool type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      coinTypeX: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_x),
      coinTypeY: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_y),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      tickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_index),
      observationIndex: decodeFromFieldsWithTypes('u64', item.fields.observation_index),
      observationCardinality: decodeFromFieldsWithTypes('u64', item.fields.observation_cardinality),
      observationCardinalityNext: decodeFromFieldsWithTypes(
        'u64',
        item.fields.observation_cardinality_next
      ),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      maxLiquidityPerTick: decodeFromFieldsWithTypes('u128', item.fields.max_liquidity_per_tick),
      protocolFeeRate: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_rate),
      swapFeeRate: decodeFromFieldsWithTypes('u64', item.fields.swap_fee_rate),
      feeGrowthGlobalX: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_global_x),
      feeGrowthGlobalY: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_global_y),
      protocolFeeX: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_x),
      protocolFeeY: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_y),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      ticks: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(I32.reified()), reified.phantom(TickInfo.reified())),
        item.fields.ticks
      ),
      tickBitmap: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(I32.reified()), reified.phantom('u256')),
        item.fields.tick_bitmap
      ),
      observations: decodeFromFieldsWithTypes(
        reified.vector(Observation.reified()),
        item.fields.observations
      ),
      locked: decodeFromFieldsWithTypes('bool', item.fields.locked),
      rewardInfos: decodeFromFieldsWithTypes(
        reified.vector(PoolRewardInfo.reified()),
        item.fields.reward_infos
      ),
      reserveX: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.reserve_x),
      reserveY: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.reserve_y),
    })
  }

  static fromBcs<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    data: Uint8Array
  ): Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    return Pool.fromFields(typeArgs, Pool.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      coinTypeX: this.coinTypeX.toJSONField(),
      coinTypeY: this.coinTypeY.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      tickIndex: this.tickIndex.toJSONField(),
      observationIndex: this.observationIndex.toString(),
      observationCardinality: this.observationCardinality.toString(),
      observationCardinalityNext: this.observationCardinalityNext.toString(),
      tickSpacing: this.tickSpacing,
      maxLiquidityPerTick: this.maxLiquidityPerTick.toString(),
      protocolFeeRate: this.protocolFeeRate.toString(),
      swapFeeRate: this.swapFeeRate.toString(),
      feeGrowthGlobalX: this.feeGrowthGlobalX.toString(),
      feeGrowthGlobalY: this.feeGrowthGlobalY.toString(),
      protocolFeeX: this.protocolFeeX.toString(),
      protocolFeeY: this.protocolFeeY.toString(),
      liquidity: this.liquidity.toString(),
      ticks: this.ticks.toJSONField(),
      tickBitmap: this.tickBitmap.toJSONField(),
      observations: fieldToJSON<Vector<Observation>>(
        `vector<${Observation.$typeName}>`,
        this.observations
      ),
      locked: this.locked,
      rewardInfos: fieldToJSON<Vector<PoolRewardInfo>>(
        `vector<${PoolRewardInfo.$typeName}>`,
        this.rewardInfos
      ),
      reserveX: this.reserveX.toJSONField(),
      reserveY: this.reserveY.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(typeArgs: [T0, T1], field: any): Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      coinTypeX: decodeFromJSONField(TypeName.reified(), field.coinTypeX),
      coinTypeY: decodeFromJSONField(TypeName.reified(), field.coinTypeY),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      tickIndex: decodeFromJSONField(I32.reified(), field.tickIndex),
      observationIndex: decodeFromJSONField('u64', field.observationIndex),
      observationCardinality: decodeFromJSONField('u64', field.observationCardinality),
      observationCardinalityNext: decodeFromJSONField('u64', field.observationCardinalityNext),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      maxLiquidityPerTick: decodeFromJSONField('u128', field.maxLiquidityPerTick),
      protocolFeeRate: decodeFromJSONField('u64', field.protocolFeeRate),
      swapFeeRate: decodeFromJSONField('u64', field.swapFeeRate),
      feeGrowthGlobalX: decodeFromJSONField('u128', field.feeGrowthGlobalX),
      feeGrowthGlobalY: decodeFromJSONField('u128', field.feeGrowthGlobalY),
      protocolFeeX: decodeFromJSONField('u64', field.protocolFeeX),
      protocolFeeY: decodeFromJSONField('u64', field.protocolFeeY),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      ticks: decodeFromJSONField(
        Table.reified(reified.phantom(I32.reified()), reified.phantom(TickInfo.reified())),
        field.ticks
      ),
      tickBitmap: decodeFromJSONField(
        Table.reified(reified.phantom(I32.reified()), reified.phantom('u256')),
        field.tickBitmap
      ),
      observations: decodeFromJSONField(reified.vector(Observation.reified()), field.observations),
      locked: decodeFromJSONField('bool', field.locked),
      rewardInfos: decodeFromJSONField(reified.vector(PoolRewardInfo.reified()), field.rewardInfos),
      reserveX: decodeFromJSONField(Balance.reified(typeArgs[0]), field.reserveX),
      reserveY: decodeFromJSONField(Balance.reified(typeArgs[1]), field.reserveY),
    })
  }

  static fromJSON<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    json: Record<string, any>
  ): Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    if (json.$typeName !== Pool.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Pool.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return Pool.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    content: SuiParsedData
  ): Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Pool object`)
    }
    return Pool.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T0, T1],
    data: SuiObjectData
  ): Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPool(data.bcs.type)) {
        throw new Error(`object at is not a Pool object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return Pool.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Pool.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T0 extends PhantomReified<PhantomTypeArgument>,
    T1 extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T0, T1],
    id: string
  ): Promise<Pool<ToPhantomTypeArgument<T0>, ToPhantomTypeArgument<T1>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Pool object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPool(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Pool object`)
    }

    return Pool.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== PoolRewardInfo =============================== */

export function isPoolRewardInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::PoolRewardInfo`
}

export interface PoolRewardInfoFields {
  rewardCoinType: ToField<TypeName>
  lastUpdateTime: ToField<'u64'>
  endedAtSeconds: ToField<'u64'>
  totalReward: ToField<'u64'>
  totalRewardAllocated: ToField<'u64'>
  rewardPerSeconds: ToField<'u128'>
  rewardGrowthGlobal: ToField<'u128'>
}

export type PoolRewardInfoReified = Reified<PoolRewardInfo, PoolRewardInfoFields>

export class PoolRewardInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::PoolRewardInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolRewardInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::PoolRewardInfo`
  readonly $typeArgs: []
  readonly $isPhantom = PoolRewardInfo.$isPhantom

  readonly rewardCoinType: ToField<TypeName>
  readonly lastUpdateTime: ToField<'u64'>
  readonly endedAtSeconds: ToField<'u64'>
  readonly totalReward: ToField<'u64'>
  readonly totalRewardAllocated: ToField<'u64'>
  readonly rewardPerSeconds: ToField<'u128'>
  readonly rewardGrowthGlobal: ToField<'u128'>

  private constructor(typeArgs: [], fields: PoolRewardInfoFields) {
    this.$fullTypeName = composeSuiType(
      PoolRewardInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::PoolRewardInfo`
    this.$typeArgs = typeArgs

    this.rewardCoinType = fields.rewardCoinType
    this.lastUpdateTime = fields.lastUpdateTime
    this.endedAtSeconds = fields.endedAtSeconds
    this.totalReward = fields.totalReward
    this.totalRewardAllocated = fields.totalRewardAllocated
    this.rewardPerSeconds = fields.rewardPerSeconds
    this.rewardGrowthGlobal = fields.rewardGrowthGlobal
  }

  static reified(): PoolRewardInfoReified {
    return {
      typeName: PoolRewardInfo.$typeName,
      fullTypeName: composeSuiType(
        PoolRewardInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::PoolRewardInfo`,
      typeArgs: [] as [],
      isPhantom: PoolRewardInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolRewardInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolRewardInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolRewardInfo.fromBcs(data),
      bcs: PoolRewardInfo.bcs,
      fromJSONField: (field: any) => PoolRewardInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolRewardInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolRewardInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolRewardInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolRewardInfo.fetch(client, id),
      new: (fields: PoolRewardInfoFields) => {
        return new PoolRewardInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolRewardInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolRewardInfo>> {
    return phantom(PoolRewardInfo.reified())
  }
  static get p() {
    return PoolRewardInfo.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolRewardInfo', {
      reward_coin_type: TypeName.bcs,
      last_update_time: bcs.u64(),
      ended_at_seconds: bcs.u64(),
      total_reward: bcs.u64(),
      total_reward_allocated: bcs.u64(),
      reward_per_seconds: bcs.u128(),
      reward_growth_global: bcs.u128(),
    })
  }

  static fromFields(fields: Record<string, any>): PoolRewardInfo {
    return PoolRewardInfo.reified().new({
      rewardCoinType: decodeFromFields(TypeName.reified(), fields.reward_coin_type),
      lastUpdateTime: decodeFromFields('u64', fields.last_update_time),
      endedAtSeconds: decodeFromFields('u64', fields.ended_at_seconds),
      totalReward: decodeFromFields('u64', fields.total_reward),
      totalRewardAllocated: decodeFromFields('u64', fields.total_reward_allocated),
      rewardPerSeconds: decodeFromFields('u128', fields.reward_per_seconds),
      rewardGrowthGlobal: decodeFromFields('u128', fields.reward_growth_global),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolRewardInfo {
    if (!isPoolRewardInfo(item.type)) {
      throw new Error('not a PoolRewardInfo type')
    }

    return PoolRewardInfo.reified().new({
      rewardCoinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_coin_type),
      lastUpdateTime: decodeFromFieldsWithTypes('u64', item.fields.last_update_time),
      endedAtSeconds: decodeFromFieldsWithTypes('u64', item.fields.ended_at_seconds),
      totalReward: decodeFromFieldsWithTypes('u64', item.fields.total_reward),
      totalRewardAllocated: decodeFromFieldsWithTypes('u64', item.fields.total_reward_allocated),
      rewardPerSeconds: decodeFromFieldsWithTypes('u128', item.fields.reward_per_seconds),
      rewardGrowthGlobal: decodeFromFieldsWithTypes('u128', item.fields.reward_growth_global),
    })
  }

  static fromBcs(data: Uint8Array): PoolRewardInfo {
    return PoolRewardInfo.fromFields(PoolRewardInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      rewardCoinType: this.rewardCoinType.toJSONField(),
      lastUpdateTime: this.lastUpdateTime.toString(),
      endedAtSeconds: this.endedAtSeconds.toString(),
      totalReward: this.totalReward.toString(),
      totalRewardAllocated: this.totalRewardAllocated.toString(),
      rewardPerSeconds: this.rewardPerSeconds.toString(),
      rewardGrowthGlobal: this.rewardGrowthGlobal.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolRewardInfo {
    return PoolRewardInfo.reified().new({
      rewardCoinType: decodeFromJSONField(TypeName.reified(), field.rewardCoinType),
      lastUpdateTime: decodeFromJSONField('u64', field.lastUpdateTime),
      endedAtSeconds: decodeFromJSONField('u64', field.endedAtSeconds),
      totalReward: decodeFromJSONField('u64', field.totalReward),
      totalRewardAllocated: decodeFromJSONField('u64', field.totalRewardAllocated),
      rewardPerSeconds: decodeFromJSONField('u128', field.rewardPerSeconds),
      rewardGrowthGlobal: decodeFromJSONField('u128', field.rewardGrowthGlobal),
    })
  }

  static fromJSON(json: Record<string, any>): PoolRewardInfo {
    if (json.$typeName !== PoolRewardInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolRewardInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolRewardInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolRewardInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolRewardInfo object`)
    }
    return PoolRewardInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolRewardInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolRewardInfo(data.bcs.type)) {
        throw new Error(`object at is not a PoolRewardInfo object`)
      }

      return PoolRewardInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolRewardInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolRewardInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolRewardInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolRewardInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolRewardInfo object`)
    }

    return PoolRewardInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== Collect =============================== */

export function isCollect(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::Collect`
}

export interface CollectFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  positionId: ToField<ID>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
}

export type CollectReified = Reified<Collect, CollectFields>

export class Collect implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::Collect`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Collect.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::Collect`
  readonly $typeArgs: []
  readonly $isPhantom = Collect.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollectFields) {
    this.$fullTypeName = composeSuiType(
      Collect.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::Collect`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): CollectReified {
    return {
      typeName: Collect.$typeName,
      fullTypeName: composeSuiType(Collect.$typeName, ...[]) as `${typeof PKG_V1}::pool::Collect`,
      typeArgs: [] as [],
      isPhantom: Collect.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Collect.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Collect.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Collect.fromBcs(data),
      bcs: Collect.bcs,
      fromJSONField: (field: any) => Collect.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Collect.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Collect.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Collect.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Collect.fetch(client, id),
      new: (fields: CollectFields) => {
        return new Collect([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Collect.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Collect>> {
    return phantom(Collect.reified())
  }
  static get p() {
    return Collect.phantom()
  }

  static get bcs() {
    return bcs.struct('Collect', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      position_id: ID.bcs,
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Collect {
    return Collect.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Collect {
    if (!isCollect(item.type)) {
      throw new Error('not a Collect type')
    }

    return Collect.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
    })
  }

  static fromBcs(data: Uint8Array): Collect {
    return Collect.fromFields(Collect.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      positionId: this.positionId,
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Collect {
    return Collect.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
    })
  }

  static fromJSON(json: Record<string, any>): Collect {
    if (json.$typeName !== Collect.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Collect.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Collect {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollect(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Collect object`)
    }
    return Collect.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Collect {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollect(data.bcs.type)) {
        throw new Error(`object at is not a Collect object`)
      }

      return Collect.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Collect.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Collect> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Collect object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCollect(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Collect object`)
    }

    return Collect.fromSuiObjectData(res.data)
  }
}

/* ============================== CollectPoolReward =============================== */

export function isCollectPoolReward(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::CollectPoolReward`
}

export interface CollectPoolRewardFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  positionId: ToField<ID>
  rewardCoinType: ToField<TypeName>
  amount: ToField<'u64'>
}

export type CollectPoolRewardReified = Reified<CollectPoolReward, CollectPoolRewardFields>

export class CollectPoolReward implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::CollectPoolReward`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CollectPoolReward.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::CollectPoolReward`
  readonly $typeArgs: []
  readonly $isPhantom = CollectPoolReward.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly rewardCoinType: ToField<TypeName>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollectPoolRewardFields) {
    this.$fullTypeName = composeSuiType(
      CollectPoolReward.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::CollectPoolReward`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.rewardCoinType = fields.rewardCoinType
    this.amount = fields.amount
  }

  static reified(): CollectPoolRewardReified {
    return {
      typeName: CollectPoolReward.$typeName,
      fullTypeName: composeSuiType(
        CollectPoolReward.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::CollectPoolReward`,
      typeArgs: [] as [],
      isPhantom: CollectPoolReward.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollectPoolReward.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CollectPoolReward.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollectPoolReward.fromBcs(data),
      bcs: CollectPoolReward.bcs,
      fromJSONField: (field: any) => CollectPoolReward.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollectPoolReward.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CollectPoolReward.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CollectPoolReward.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => CollectPoolReward.fetch(client, id),
      new: (fields: CollectPoolRewardFields) => {
        return new CollectPoolReward([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CollectPoolReward.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollectPoolReward>> {
    return phantom(CollectPoolReward.reified())
  }
  static get p() {
    return CollectPoolReward.phantom()
  }

  static get bcs() {
    return bcs.struct('CollectPoolReward', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      position_id: ID.bcs,
      reward_coin_type: TypeName.bcs,
      amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): CollectPoolReward {
    return CollectPoolReward.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      rewardCoinType: decodeFromFields(TypeName.reified(), fields.reward_coin_type),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollectPoolReward {
    if (!isCollectPoolReward(item.type)) {
      throw new Error('not a CollectPoolReward type')
    }

    return CollectPoolReward.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      rewardCoinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_coin_type),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): CollectPoolReward {
    return CollectPoolReward.fromFields(CollectPoolReward.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      positionId: this.positionId,
      rewardCoinType: this.rewardCoinType.toJSONField(),
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollectPoolReward {
    return CollectPoolReward.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      rewardCoinType: decodeFromJSONField(TypeName.reified(), field.rewardCoinType),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): CollectPoolReward {
    if (json.$typeName !== CollectPoolReward.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CollectPoolReward.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CollectPoolReward {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollectPoolReward(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CollectPoolReward object`)
    }
    return CollectPoolReward.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CollectPoolReward {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollectPoolReward(data.bcs.type)) {
        throw new Error(`object at is not a CollectPoolReward object`)
      }

      return CollectPoolReward.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollectPoolReward.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CollectPoolReward> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching CollectPoolReward object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCollectPoolReward(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CollectPoolReward object`)
    }

    return CollectPoolReward.fromSuiObjectData(res.data)
  }
}

/* ============================== CollectProtocolFee =============================== */

export function isCollectProtocolFee(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::CollectProtocolFee`
}

export interface CollectProtocolFeeFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
}

export type CollectProtocolFeeReified = Reified<CollectProtocolFee, CollectProtocolFeeFields>

export class CollectProtocolFee implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::CollectProtocolFee`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CollectProtocolFee.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::CollectProtocolFee`
  readonly $typeArgs: []
  readonly $isPhantom = CollectProtocolFee.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollectProtocolFeeFields) {
    this.$fullTypeName = composeSuiType(
      CollectProtocolFee.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::CollectProtocolFee`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): CollectProtocolFeeReified {
    return {
      typeName: CollectProtocolFee.$typeName,
      fullTypeName: composeSuiType(
        CollectProtocolFee.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::CollectProtocolFee`,
      typeArgs: [] as [],
      isPhantom: CollectProtocolFee.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollectProtocolFee.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CollectProtocolFee.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollectProtocolFee.fromBcs(data),
      bcs: CollectProtocolFee.bcs,
      fromJSONField: (field: any) => CollectProtocolFee.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollectProtocolFee.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CollectProtocolFee.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CollectProtocolFee.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => CollectProtocolFee.fetch(client, id),
      new: (fields: CollectProtocolFeeFields) => {
        return new CollectProtocolFee([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CollectProtocolFee.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollectProtocolFee>> {
    return phantom(CollectProtocolFee.reified())
  }
  static get p() {
    return CollectProtocolFee.phantom()
  }

  static get bcs() {
    return bcs.struct('CollectProtocolFee', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): CollectProtocolFee {
    return CollectProtocolFee.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollectProtocolFee {
    if (!isCollectProtocolFee(item.type)) {
      throw new Error('not a CollectProtocolFee type')
    }

    return CollectProtocolFee.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
    })
  }

  static fromBcs(data: Uint8Array): CollectProtocolFee {
    return CollectProtocolFee.fromFields(CollectProtocolFee.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollectProtocolFee {
    return CollectProtocolFee.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
    })
  }

  static fromJSON(json: Record<string, any>): CollectProtocolFee {
    if (json.$typeName !== CollectProtocolFee.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CollectProtocolFee.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CollectProtocolFee {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollectProtocolFee(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CollectProtocolFee object`)
    }
    return CollectProtocolFee.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CollectProtocolFee {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollectProtocolFee(data.bcs.type)) {
        throw new Error(`object at is not a CollectProtocolFee object`)
      }

      return CollectProtocolFee.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollectProtocolFee.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CollectProtocolFee> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching CollectProtocolFee object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCollectProtocolFee(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CollectProtocolFee object`)
    }

    return CollectProtocolFee.fromSuiObjectData(res.data)
  }
}

/* ============================== Flash =============================== */

export function isFlash(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::Flash`
}

export interface FlashFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
}

export type FlashReified = Reified<Flash, FlashFields>

export class Flash implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::Flash`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Flash.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::Flash`
  readonly $typeArgs: []
  readonly $isPhantom = Flash.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: FlashFields) {
    this.$fullTypeName = composeSuiType(
      Flash.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::Flash`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): FlashReified {
    return {
      typeName: Flash.$typeName,
      fullTypeName: composeSuiType(Flash.$typeName, ...[]) as `${typeof PKG_V1}::pool::Flash`,
      typeArgs: [] as [],
      isPhantom: Flash.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Flash.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Flash.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Flash.fromBcs(data),
      bcs: Flash.bcs,
      fromJSONField: (field: any) => Flash.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Flash.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Flash.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Flash.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Flash.fetch(client, id),
      new: (fields: FlashFields) => {
        return new Flash([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Flash.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Flash>> {
    return phantom(Flash.reified())
  }
  static get p() {
    return Flash.phantom()
  }

  static get bcs() {
    return bcs.struct('Flash', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Flash {
    return Flash.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Flash {
    if (!isFlash(item.type)) {
      throw new Error('not a Flash type')
    }

    return Flash.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
    })
  }

  static fromBcs(data: Uint8Array): Flash {
    return Flash.fromFields(Flash.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Flash {
    return Flash.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
    })
  }

  static fromJSON(json: Record<string, any>): Flash {
    if (json.$typeName !== Flash.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Flash.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Flash {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlash(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Flash object`)
    }
    return Flash.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Flash {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlash(data.bcs.type)) {
        throw new Error(`object at is not a Flash object`)
      }

      return Flash.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Flash.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Flash> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Flash object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFlash(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Flash object`)
    }

    return Flash.fromSuiObjectData(res.data)
  }
}

/* ============================== FlashReceipt =============================== */

export function isFlashReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::FlashReceipt`
}

export interface FlashReceiptFields {
  poolId: ToField<ID>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
  feeX: ToField<'u64'>
  feeY: ToField<'u64'>
}

export type FlashReceiptReified = Reified<FlashReceipt, FlashReceiptFields>

export class FlashReceipt implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::FlashReceipt`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = FlashReceipt.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::FlashReceipt`
  readonly $typeArgs: []
  readonly $isPhantom = FlashReceipt.$isPhantom

  readonly poolId: ToField<ID>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>
  readonly feeX: ToField<'u64'>
  readonly feeY: ToField<'u64'>

  private constructor(typeArgs: [], fields: FlashReceiptFields) {
    this.$fullTypeName = composeSuiType(
      FlashReceipt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::FlashReceipt`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.amountX = fields.amountX
    this.amountY = fields.amountY
    this.feeX = fields.feeX
    this.feeY = fields.feeY
  }

  static reified(): FlashReceiptReified {
    return {
      typeName: FlashReceipt.$typeName,
      fullTypeName: composeSuiType(
        FlashReceipt.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::FlashReceipt`,
      typeArgs: [] as [],
      isPhantom: FlashReceipt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FlashReceipt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FlashReceipt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FlashReceipt.fromBcs(data),
      bcs: FlashReceipt.bcs,
      fromJSONField: (field: any) => FlashReceipt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FlashReceipt.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => FlashReceipt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FlashReceipt.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => FlashReceipt.fetch(client, id),
      new: (fields: FlashReceiptFields) => {
        return new FlashReceipt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return FlashReceipt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FlashReceipt>> {
    return phantom(FlashReceipt.reified())
  }
  static get p() {
    return FlashReceipt.phantom()
  }

  static get bcs() {
    return bcs.struct('FlashReceipt', {
      pool_id: ID.bcs,
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
      fee_x: bcs.u64(),
      fee_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): FlashReceipt {
    return FlashReceipt.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
      feeX: decodeFromFields('u64', fields.fee_x),
      feeY: decodeFromFields('u64', fields.fee_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FlashReceipt {
    if (!isFlashReceipt(item.type)) {
      throw new Error('not a FlashReceipt type')
    }

    return FlashReceipt.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
      feeX: decodeFromFieldsWithTypes('u64', item.fields.fee_x),
      feeY: decodeFromFieldsWithTypes('u64', item.fields.fee_y),
    })
  }

  static fromBcs(data: Uint8Array): FlashReceipt {
    return FlashReceipt.fromFields(FlashReceipt.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
      feeX: this.feeX.toString(),
      feeY: this.feeY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FlashReceipt {
    return FlashReceipt.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
      feeX: decodeFromJSONField('u64', field.feeX),
      feeY: decodeFromJSONField('u64', field.feeY),
    })
  }

  static fromJSON(json: Record<string, any>): FlashReceipt {
    if (json.$typeName !== FlashReceipt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return FlashReceipt.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): FlashReceipt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashReceipt object`)
    }
    return FlashReceipt.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): FlashReceipt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashReceipt(data.bcs.type)) {
        throw new Error(`object at is not a FlashReceipt object`)
      }

      return FlashReceipt.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashReceipt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<FlashReceipt> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching FlashReceipt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFlashReceipt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a FlashReceipt object`)
    }

    return FlashReceipt.fromSuiObjectData(res.data)
  }
}

/* ============================== IncreaseObservationCardinalityNext =============================== */

export function isIncreaseObservationCardinalityNext(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::IncreaseObservationCardinalityNext`
}

export interface IncreaseObservationCardinalityNextFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  observationCardinalityNextOld: ToField<'u64'>
  observationCardinalityNextNew: ToField<'u64'>
}

export type IncreaseObservationCardinalityNextReified = Reified<
  IncreaseObservationCardinalityNext,
  IncreaseObservationCardinalityNextFields
>

export class IncreaseObservationCardinalityNext implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::IncreaseObservationCardinalityNext`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = IncreaseObservationCardinalityNext.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::IncreaseObservationCardinalityNext`
  readonly $typeArgs: []
  readonly $isPhantom = IncreaseObservationCardinalityNext.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly observationCardinalityNextOld: ToField<'u64'>
  readonly observationCardinalityNextNew: ToField<'u64'>

  private constructor(typeArgs: [], fields: IncreaseObservationCardinalityNextFields) {
    this.$fullTypeName = composeSuiType(
      IncreaseObservationCardinalityNext.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::IncreaseObservationCardinalityNext`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.observationCardinalityNextOld = fields.observationCardinalityNextOld
    this.observationCardinalityNextNew = fields.observationCardinalityNextNew
  }

  static reified(): IncreaseObservationCardinalityNextReified {
    return {
      typeName: IncreaseObservationCardinalityNext.$typeName,
      fullTypeName: composeSuiType(
        IncreaseObservationCardinalityNext.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::IncreaseObservationCardinalityNext`,
      typeArgs: [] as [],
      isPhantom: IncreaseObservationCardinalityNext.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        IncreaseObservationCardinalityNext.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        IncreaseObservationCardinalityNext.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => IncreaseObservationCardinalityNext.fromBcs(data),
      bcs: IncreaseObservationCardinalityNext.bcs,
      fromJSONField: (field: any) => IncreaseObservationCardinalityNext.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => IncreaseObservationCardinalityNext.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        IncreaseObservationCardinalityNext.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        IncreaseObservationCardinalityNext.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        IncreaseObservationCardinalityNext.fetch(client, id),
      new: (fields: IncreaseObservationCardinalityNextFields) => {
        return new IncreaseObservationCardinalityNext([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return IncreaseObservationCardinalityNext.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<IncreaseObservationCardinalityNext>> {
    return phantom(IncreaseObservationCardinalityNext.reified())
  }
  static get p() {
    return IncreaseObservationCardinalityNext.phantom()
  }

  static get bcs() {
    return bcs.struct('IncreaseObservationCardinalityNext', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      observation_cardinality_next_old: bcs.u64(),
      observation_cardinality_next_new: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): IncreaseObservationCardinalityNext {
    return IncreaseObservationCardinalityNext.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      observationCardinalityNextOld: decodeFromFields(
        'u64',
        fields.observation_cardinality_next_old
      ),
      observationCardinalityNextNew: decodeFromFields(
        'u64',
        fields.observation_cardinality_next_new
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): IncreaseObservationCardinalityNext {
    if (!isIncreaseObservationCardinalityNext(item.type)) {
      throw new Error('not a IncreaseObservationCardinalityNext type')
    }

    return IncreaseObservationCardinalityNext.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      observationCardinalityNextOld: decodeFromFieldsWithTypes(
        'u64',
        item.fields.observation_cardinality_next_old
      ),
      observationCardinalityNextNew: decodeFromFieldsWithTypes(
        'u64',
        item.fields.observation_cardinality_next_new
      ),
    })
  }

  static fromBcs(data: Uint8Array): IncreaseObservationCardinalityNext {
    return IncreaseObservationCardinalityNext.fromFields(
      IncreaseObservationCardinalityNext.bcs.parse(data)
    )
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      observationCardinalityNextOld: this.observationCardinalityNextOld.toString(),
      observationCardinalityNextNew: this.observationCardinalityNextNew.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): IncreaseObservationCardinalityNext {
    return IncreaseObservationCardinalityNext.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      observationCardinalityNextOld: decodeFromJSONField(
        'u64',
        field.observationCardinalityNextOld
      ),
      observationCardinalityNextNew: decodeFromJSONField(
        'u64',
        field.observationCardinalityNextNew
      ),
    })
  }

  static fromJSON(json: Record<string, any>): IncreaseObservationCardinalityNext {
    if (json.$typeName !== IncreaseObservationCardinalityNext.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return IncreaseObservationCardinalityNext.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): IncreaseObservationCardinalityNext {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isIncreaseObservationCardinalityNext(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a IncreaseObservationCardinalityNext object`
      )
    }
    return IncreaseObservationCardinalityNext.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): IncreaseObservationCardinalityNext {
    if (data.bcs) {
      if (
        data.bcs.dataType !== 'moveObject' ||
        !isIncreaseObservationCardinalityNext(data.bcs.type)
      ) {
        throw new Error(`object at is not a IncreaseObservationCardinalityNext object`)
      }

      return IncreaseObservationCardinalityNext.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return IncreaseObservationCardinalityNext.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<IncreaseObservationCardinalityNext> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching IncreaseObservationCardinalityNext object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isIncreaseObservationCardinalityNext(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a IncreaseObservationCardinalityNext object`)
    }

    return IncreaseObservationCardinalityNext.fromSuiObjectData(res.data)
  }
}

/* ============================== Initialize =============================== */

export function isInitialize(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::Initialize`
}

export interface InitializeFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  sqrtPrice: ToField<'u128'>
  tickIndex: ToField<I32>
}

export type InitializeReified = Reified<Initialize, InitializeFields>

export class Initialize implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::Initialize`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Initialize.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::Initialize`
  readonly $typeArgs: []
  readonly $isPhantom = Initialize.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly sqrtPrice: ToField<'u128'>
  readonly tickIndex: ToField<I32>

  private constructor(typeArgs: [], fields: InitializeFields) {
    this.$fullTypeName = composeSuiType(
      Initialize.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::Initialize`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.sqrtPrice = fields.sqrtPrice
    this.tickIndex = fields.tickIndex
  }

  static reified(): InitializeReified {
    return {
      typeName: Initialize.$typeName,
      fullTypeName: composeSuiType(
        Initialize.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::Initialize`,
      typeArgs: [] as [],
      isPhantom: Initialize.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Initialize.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Initialize.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Initialize.fromBcs(data),
      bcs: Initialize.bcs,
      fromJSONField: (field: any) => Initialize.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Initialize.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Initialize.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Initialize.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Initialize.fetch(client, id),
      new: (fields: InitializeFields) => {
        return new Initialize([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Initialize.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Initialize>> {
    return phantom(Initialize.reified())
  }
  static get p() {
    return Initialize.phantom()
  }

  static get bcs() {
    return bcs.struct('Initialize', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      sqrt_price: bcs.u128(),
      tick_index: I32.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): Initialize {
    return Initialize.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      tickIndex: decodeFromFields(I32.reified(), fields.tick_index),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Initialize {
    if (!isInitialize(item.type)) {
      throw new Error('not a Initialize type')
    }

    return Initialize.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      tickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_index),
    })
  }

  static fromBcs(data: Uint8Array): Initialize {
    return Initialize.fromFields(Initialize.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      sqrtPrice: this.sqrtPrice.toString(),
      tickIndex: this.tickIndex.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Initialize {
    return Initialize.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      tickIndex: decodeFromJSONField(I32.reified(), field.tickIndex),
    })
  }

  static fromJSON(json: Record<string, any>): Initialize {
    if (json.$typeName !== Initialize.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Initialize.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Initialize {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitialize(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Initialize object`)
    }
    return Initialize.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Initialize {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitialize(data.bcs.type)) {
        throw new Error(`object at is not a Initialize object`)
      }

      return Initialize.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Initialize.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Initialize> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Initialize object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isInitialize(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Initialize object`)
    }

    return Initialize.fromSuiObjectData(res.data)
  }
}

/* ============================== InitializePoolReward =============================== */

export function isInitializePoolReward(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::InitializePoolReward`
}

export interface InitializePoolRewardFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  rewardCoinType: ToField<TypeName>
  startedAtSeconds: ToField<'u64'>
}

export type InitializePoolRewardReified = Reified<InitializePoolReward, InitializePoolRewardFields>

export class InitializePoolReward implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::InitializePoolReward`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InitializePoolReward.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::InitializePoolReward`
  readonly $typeArgs: []
  readonly $isPhantom = InitializePoolReward.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly rewardCoinType: ToField<TypeName>
  readonly startedAtSeconds: ToField<'u64'>

  private constructor(typeArgs: [], fields: InitializePoolRewardFields) {
    this.$fullTypeName = composeSuiType(
      InitializePoolReward.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::InitializePoolReward`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.rewardCoinType = fields.rewardCoinType
    this.startedAtSeconds = fields.startedAtSeconds
  }

  static reified(): InitializePoolRewardReified {
    return {
      typeName: InitializePoolReward.$typeName,
      fullTypeName: composeSuiType(
        InitializePoolReward.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::InitializePoolReward`,
      typeArgs: [] as [],
      isPhantom: InitializePoolReward.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InitializePoolReward.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        InitializePoolReward.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InitializePoolReward.fromBcs(data),
      bcs: InitializePoolReward.bcs,
      fromJSONField: (field: any) => InitializePoolReward.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitializePoolReward.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        InitializePoolReward.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        InitializePoolReward.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => InitializePoolReward.fetch(client, id),
      new: (fields: InitializePoolRewardFields) => {
        return new InitializePoolReward([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InitializePoolReward.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitializePoolReward>> {
    return phantom(InitializePoolReward.reified())
  }
  static get p() {
    return InitializePoolReward.phantom()
  }

  static get bcs() {
    return bcs.struct('InitializePoolReward', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      reward_coin_type: TypeName.bcs,
      started_at_seconds: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): InitializePoolReward {
    return InitializePoolReward.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      rewardCoinType: decodeFromFields(TypeName.reified(), fields.reward_coin_type),
      startedAtSeconds: decodeFromFields('u64', fields.started_at_seconds),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InitializePoolReward {
    if (!isInitializePoolReward(item.type)) {
      throw new Error('not a InitializePoolReward type')
    }

    return InitializePoolReward.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      rewardCoinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_coin_type),
      startedAtSeconds: decodeFromFieldsWithTypes('u64', item.fields.started_at_seconds),
    })
  }

  static fromBcs(data: Uint8Array): InitializePoolReward {
    return InitializePoolReward.fromFields(InitializePoolReward.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      rewardCoinType: this.rewardCoinType.toJSONField(),
      startedAtSeconds: this.startedAtSeconds.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InitializePoolReward {
    return InitializePoolReward.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      rewardCoinType: decodeFromJSONField(TypeName.reified(), field.rewardCoinType),
      startedAtSeconds: decodeFromJSONField('u64', field.startedAtSeconds),
    })
  }

  static fromJSON(json: Record<string, any>): InitializePoolReward {
    if (json.$typeName !== InitializePoolReward.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return InitializePoolReward.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InitializePoolReward {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitializePoolReward(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a InitializePoolReward object`
      )
    }
    return InitializePoolReward.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InitializePoolReward {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitializePoolReward(data.bcs.type)) {
        throw new Error(`object at is not a InitializePoolReward object`)
      }

      return InitializePoolReward.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitializePoolReward.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InitializePoolReward> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching InitializePoolReward object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isInitializePoolReward(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a InitializePoolReward object`)
    }

    return InitializePoolReward.fromSuiObjectData(res.data)
  }
}

/* ============================== ModifyLiquidity =============================== */

export function isModifyLiquidity(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::ModifyLiquidity`
}

export interface ModifyLiquidityFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  positionId: ToField<ID>
  tickLowerIndex: ToField<I32>
  tickUpperIndex: ToField<I32>
  liquidityDelta: ToField<I128>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
}

export type ModifyLiquidityReified = Reified<ModifyLiquidity, ModifyLiquidityFields>

export class ModifyLiquidity implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::ModifyLiquidity`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ModifyLiquidity.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::ModifyLiquidity`
  readonly $typeArgs: []
  readonly $isPhantom = ModifyLiquidity.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly positionId: ToField<ID>
  readonly tickLowerIndex: ToField<I32>
  readonly tickUpperIndex: ToField<I32>
  readonly liquidityDelta: ToField<I128>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: ModifyLiquidityFields) {
    this.$fullTypeName = composeSuiType(
      ModifyLiquidity.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::ModifyLiquidity`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.positionId = fields.positionId
    this.tickLowerIndex = fields.tickLowerIndex
    this.tickUpperIndex = fields.tickUpperIndex
    this.liquidityDelta = fields.liquidityDelta
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): ModifyLiquidityReified {
    return {
      typeName: ModifyLiquidity.$typeName,
      fullTypeName: composeSuiType(
        ModifyLiquidity.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::ModifyLiquidity`,
      typeArgs: [] as [],
      isPhantom: ModifyLiquidity.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ModifyLiquidity.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ModifyLiquidity.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ModifyLiquidity.fromBcs(data),
      bcs: ModifyLiquidity.bcs,
      fromJSONField: (field: any) => ModifyLiquidity.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ModifyLiquidity.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ModifyLiquidity.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ModifyLiquidity.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ModifyLiquidity.fetch(client, id),
      new: (fields: ModifyLiquidityFields) => {
        return new ModifyLiquidity([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ModifyLiquidity.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ModifyLiquidity>> {
    return phantom(ModifyLiquidity.reified())
  }
  static get p() {
    return ModifyLiquidity.phantom()
  }

  static get bcs() {
    return bcs.struct('ModifyLiquidity', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      position_id: ID.bcs,
      tick_lower_index: I32.bcs,
      tick_upper_index: I32.bcs,
      liquidity_delta: I128.bcs,
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): ModifyLiquidity {
    return ModifyLiquidity.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      tickLowerIndex: decodeFromFields(I32.reified(), fields.tick_lower_index),
      tickUpperIndex: decodeFromFields(I32.reified(), fields.tick_upper_index),
      liquidityDelta: decodeFromFields(I128.reified(), fields.liquidity_delta),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ModifyLiquidity {
    if (!isModifyLiquidity(item.type)) {
      throw new Error('not a ModifyLiquidity type')
    }

    return ModifyLiquidity.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      tickLowerIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower_index),
      tickUpperIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper_index),
      liquidityDelta: decodeFromFieldsWithTypes(I128.reified(), item.fields.liquidity_delta),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
    })
  }

  static fromBcs(data: Uint8Array): ModifyLiquidity {
    return ModifyLiquidity.fromFields(ModifyLiquidity.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      positionId: this.positionId,
      tickLowerIndex: this.tickLowerIndex.toJSONField(),
      tickUpperIndex: this.tickUpperIndex.toJSONField(),
      liquidityDelta: this.liquidityDelta.toJSONField(),
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ModifyLiquidity {
    return ModifyLiquidity.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      tickLowerIndex: decodeFromJSONField(I32.reified(), field.tickLowerIndex),
      tickUpperIndex: decodeFromJSONField(I32.reified(), field.tickUpperIndex),
      liquidityDelta: decodeFromJSONField(I128.reified(), field.liquidityDelta),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
    })
  }

  static fromJSON(json: Record<string, any>): ModifyLiquidity {
    if (json.$typeName !== ModifyLiquidity.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ModifyLiquidity.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ModifyLiquidity {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isModifyLiquidity(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ModifyLiquidity object`)
    }
    return ModifyLiquidity.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ModifyLiquidity {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isModifyLiquidity(data.bcs.type)) {
        throw new Error(`object at is not a ModifyLiquidity object`)
      }

      return ModifyLiquidity.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ModifyLiquidity.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ModifyLiquidity> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ModifyLiquidity object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isModifyLiquidity(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ModifyLiquidity object`)
    }

    return ModifyLiquidity.fromSuiObjectData(res.data)
  }
}

/* ============================== Pay =============================== */

export function isPay(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::Pay`
}

export interface PayFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  amountXDebt: ToField<'u64'>
  amountYDebt: ToField<'u64'>
  paidX: ToField<'u64'>
  paidY: ToField<'u64'>
}

export type PayReified = Reified<Pay, PayFields>

export class Pay implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::Pay`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Pay.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::Pay`
  readonly $typeArgs: []
  readonly $isPhantom = Pay.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly amountXDebt: ToField<'u64'>
  readonly amountYDebt: ToField<'u64'>
  readonly paidX: ToField<'u64'>
  readonly paidY: ToField<'u64'>

  private constructor(typeArgs: [], fields: PayFields) {
    this.$fullTypeName = composeSuiType(Pay.$typeName, ...typeArgs) as `${typeof PKG_V1}::pool::Pay`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.amountXDebt = fields.amountXDebt
    this.amountYDebt = fields.amountYDebt
    this.paidX = fields.paidX
    this.paidY = fields.paidY
  }

  static reified(): PayReified {
    return {
      typeName: Pay.$typeName,
      fullTypeName: composeSuiType(Pay.$typeName, ...[]) as `${typeof PKG_V1}::pool::Pay`,
      typeArgs: [] as [],
      isPhantom: Pay.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Pay.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Pay.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Pay.fromBcs(data),
      bcs: Pay.bcs,
      fromJSONField: (field: any) => Pay.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Pay.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Pay.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Pay.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Pay.fetch(client, id),
      new: (fields: PayFields) => {
        return new Pay([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Pay.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Pay>> {
    return phantom(Pay.reified())
  }
  static get p() {
    return Pay.phantom()
  }

  static get bcs() {
    return bcs.struct('Pay', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      amount_x_debt: bcs.u64(),
      amount_y_debt: bcs.u64(),
      paid_x: bcs.u64(),
      paid_y: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Pay {
    return Pay.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      amountXDebt: decodeFromFields('u64', fields.amount_x_debt),
      amountYDebt: decodeFromFields('u64', fields.amount_y_debt),
      paidX: decodeFromFields('u64', fields.paid_x),
      paidY: decodeFromFields('u64', fields.paid_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Pay {
    if (!isPay(item.type)) {
      throw new Error('not a Pay type')
    }

    return Pay.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      amountXDebt: decodeFromFieldsWithTypes('u64', item.fields.amount_x_debt),
      amountYDebt: decodeFromFieldsWithTypes('u64', item.fields.amount_y_debt),
      paidX: decodeFromFieldsWithTypes('u64', item.fields.paid_x),
      paidY: decodeFromFieldsWithTypes('u64', item.fields.paid_y),
    })
  }

  static fromBcs(data: Uint8Array): Pay {
    return Pay.fromFields(Pay.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      amountXDebt: this.amountXDebt.toString(),
      amountYDebt: this.amountYDebt.toString(),
      paidX: this.paidX.toString(),
      paidY: this.paidY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Pay {
    return Pay.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      amountXDebt: decodeFromJSONField('u64', field.amountXDebt),
      amountYDebt: decodeFromJSONField('u64', field.amountYDebt),
      paidX: decodeFromJSONField('u64', field.paidX),
      paidY: decodeFromJSONField('u64', field.paidY),
    })
  }

  static fromJSON(json: Record<string, any>): Pay {
    if (json.$typeName !== Pay.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Pay.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Pay {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPay(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Pay object`)
    }
    return Pay.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Pay {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPay(data.bcs.type)) {
        throw new Error(`object at is not a Pay object`)
      }

      return Pay.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Pay.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Pay> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Pay object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPay(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Pay object`)
    }

    return Pay.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolRewardCustodianDfKey =============================== */

export function isPoolRewardCustodianDfKey(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::pool::PoolRewardCustodianDfKey` + '<')
}

export interface PoolRewardCustodianDfKeyFields<T0 extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type PoolRewardCustodianDfKeyReified<T0 extends PhantomTypeArgument> = Reified<
  PoolRewardCustodianDfKey<T0>,
  PoolRewardCustodianDfKeyFields<T0>
>

export class PoolRewardCustodianDfKey<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::PoolRewardCustodianDfKey`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = PoolRewardCustodianDfKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::PoolRewardCustodianDfKey<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = PoolRewardCustodianDfKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>],
    fields: PoolRewardCustodianDfKeyFields<T0>
  ) {
    this.$fullTypeName = composeSuiType(
      PoolRewardCustodianDfKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::PoolRewardCustodianDfKey<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PoolRewardCustodianDfKeyReified<ToPhantomTypeArgument<T0>> {
    return {
      typeName: PoolRewardCustodianDfKey.$typeName,
      fullTypeName: composeSuiType(
        PoolRewardCustodianDfKey.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::pool::PoolRewardCustodianDfKey<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: PoolRewardCustodianDfKey.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => PoolRewardCustodianDfKey.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PoolRewardCustodianDfKey.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => PoolRewardCustodianDfKey.fromBcs(T0, data),
      bcs: PoolRewardCustodianDfKey.bcs,
      fromJSONField: (field: any) => PoolRewardCustodianDfKey.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => PoolRewardCustodianDfKey.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PoolRewardCustodianDfKey.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PoolRewardCustodianDfKey.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) =>
        PoolRewardCustodianDfKey.fetch(client, T0, id),
      new: (fields: PoolRewardCustodianDfKeyFields<ToPhantomTypeArgument<T0>>) => {
        return new PoolRewardCustodianDfKey([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolRewardCustodianDfKey.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>>>> {
    return phantom(PoolRewardCustodianDfKey.reified(T0))
  }
  static get p() {
    return PoolRewardCustodianDfKey.phantom
  }

  static get bcs() {
    return bcs.struct('PoolRewardCustodianDfKey', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>> {
    return PoolRewardCustodianDfKey.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>> {
    if (!isPoolRewardCustodianDfKey(item.type)) {
      throw new Error('not a PoolRewardCustodianDfKey type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return PoolRewardCustodianDfKey.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>> {
    return PoolRewardCustodianDfKey.fromFields(typeArg, PoolRewardCustodianDfKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>> {
    return PoolRewardCustodianDfKey.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== PoolRewardCustodianDfKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(PoolRewardCustodianDfKey.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return PoolRewardCustodianDfKey.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolRewardCustodianDfKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PoolRewardCustodianDfKey object`
      )
    }
    return PoolRewardCustodianDfKey.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolRewardCustodianDfKey(data.bcs.type)) {
        throw new Error(`object at is not a PoolRewardCustodianDfKey object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return PoolRewardCustodianDfKey.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolRewardCustodianDfKey.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<PoolRewardCustodianDfKey<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching PoolRewardCustodianDfKey object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isPoolRewardCustodianDfKey(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a PoolRewardCustodianDfKey object`)
    }

    return PoolRewardCustodianDfKey.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== SetProtocolFeeRate =============================== */

export function isSetProtocolFeeRate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::SetProtocolFeeRate`
}

export interface SetProtocolFeeRateFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  protocolFeeRateXOld: ToField<'u64'>
  protocolFeeRateYOld: ToField<'u64'>
  protocolFeeRateXNew: ToField<'u64'>
  protocolFeeRateYNew: ToField<'u64'>
}

export type SetProtocolFeeRateReified = Reified<SetProtocolFeeRate, SetProtocolFeeRateFields>

export class SetProtocolFeeRate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::SetProtocolFeeRate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SetProtocolFeeRate.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::SetProtocolFeeRate`
  readonly $typeArgs: []
  readonly $isPhantom = SetProtocolFeeRate.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly protocolFeeRateXOld: ToField<'u64'>
  readonly protocolFeeRateYOld: ToField<'u64'>
  readonly protocolFeeRateXNew: ToField<'u64'>
  readonly protocolFeeRateYNew: ToField<'u64'>

  private constructor(typeArgs: [], fields: SetProtocolFeeRateFields) {
    this.$fullTypeName = composeSuiType(
      SetProtocolFeeRate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::SetProtocolFeeRate`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.protocolFeeRateXOld = fields.protocolFeeRateXOld
    this.protocolFeeRateYOld = fields.protocolFeeRateYOld
    this.protocolFeeRateXNew = fields.protocolFeeRateXNew
    this.protocolFeeRateYNew = fields.protocolFeeRateYNew
  }

  static reified(): SetProtocolFeeRateReified {
    return {
      typeName: SetProtocolFeeRate.$typeName,
      fullTypeName: composeSuiType(
        SetProtocolFeeRate.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::SetProtocolFeeRate`,
      typeArgs: [] as [],
      isPhantom: SetProtocolFeeRate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SetProtocolFeeRate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SetProtocolFeeRate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SetProtocolFeeRate.fromBcs(data),
      bcs: SetProtocolFeeRate.bcs,
      fromJSONField: (field: any) => SetProtocolFeeRate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SetProtocolFeeRate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SetProtocolFeeRate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SetProtocolFeeRate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SetProtocolFeeRate.fetch(client, id),
      new: (fields: SetProtocolFeeRateFields) => {
        return new SetProtocolFeeRate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SetProtocolFeeRate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetProtocolFeeRate>> {
    return phantom(SetProtocolFeeRate.reified())
  }
  static get p() {
    return SetProtocolFeeRate.phantom()
  }

  static get bcs() {
    return bcs.struct('SetProtocolFeeRate', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      protocol_fee_rate_x_old: bcs.u64(),
      protocol_fee_rate_y_old: bcs.u64(),
      protocol_fee_rate_x_new: bcs.u64(),
      protocol_fee_rate_y_new: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): SetProtocolFeeRate {
    return SetProtocolFeeRate.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      protocolFeeRateXOld: decodeFromFields('u64', fields.protocol_fee_rate_x_old),
      protocolFeeRateYOld: decodeFromFields('u64', fields.protocol_fee_rate_y_old),
      protocolFeeRateXNew: decodeFromFields('u64', fields.protocol_fee_rate_x_new),
      protocolFeeRateYNew: decodeFromFields('u64', fields.protocol_fee_rate_y_new),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SetProtocolFeeRate {
    if (!isSetProtocolFeeRate(item.type)) {
      throw new Error('not a SetProtocolFeeRate type')
    }

    return SetProtocolFeeRate.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      protocolFeeRateXOld: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_rate_x_old),
      protocolFeeRateYOld: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_rate_y_old),
      protocolFeeRateXNew: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_rate_x_new),
      protocolFeeRateYNew: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_rate_y_new),
    })
  }

  static fromBcs(data: Uint8Array): SetProtocolFeeRate {
    return SetProtocolFeeRate.fromFields(SetProtocolFeeRate.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      protocolFeeRateXOld: this.protocolFeeRateXOld.toString(),
      protocolFeeRateYOld: this.protocolFeeRateYOld.toString(),
      protocolFeeRateXNew: this.protocolFeeRateXNew.toString(),
      protocolFeeRateYNew: this.protocolFeeRateYNew.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SetProtocolFeeRate {
    return SetProtocolFeeRate.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      protocolFeeRateXOld: decodeFromJSONField('u64', field.protocolFeeRateXOld),
      protocolFeeRateYOld: decodeFromJSONField('u64', field.protocolFeeRateYOld),
      protocolFeeRateXNew: decodeFromJSONField('u64', field.protocolFeeRateXNew),
      protocolFeeRateYNew: decodeFromJSONField('u64', field.protocolFeeRateYNew),
    })
  }

  static fromJSON(json: Record<string, any>): SetProtocolFeeRate {
    if (json.$typeName !== SetProtocolFeeRate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SetProtocolFeeRate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SetProtocolFeeRate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSetProtocolFeeRate(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SetProtocolFeeRate object`)
    }
    return SetProtocolFeeRate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SetProtocolFeeRate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSetProtocolFeeRate(data.bcs.type)) {
        throw new Error(`object at is not a SetProtocolFeeRate object`)
      }

      return SetProtocolFeeRate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetProtocolFeeRate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SetProtocolFeeRate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SetProtocolFeeRate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSetProtocolFeeRate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SetProtocolFeeRate object`)
    }

    return SetProtocolFeeRate.fromSuiObjectData(res.data)
  }
}

/* ============================== Swap =============================== */

export function isSwap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::Swap`
}

export interface SwapFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  xForY: ToField<'bool'>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
  sqrtPriceBefore: ToField<'u128'>
  sqrtPriceAfter: ToField<'u128'>
  liquidity: ToField<'u128'>
  tickIndex: ToField<I32>
  feeAmount: ToField<'u64'>
}

export type SwapReified = Reified<Swap, SwapFields>

export class Swap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::Swap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Swap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::Swap`
  readonly $typeArgs: []
  readonly $isPhantom = Swap.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly xForY: ToField<'bool'>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>
  readonly sqrtPriceBefore: ToField<'u128'>
  readonly sqrtPriceAfter: ToField<'u128'>
  readonly liquidity: ToField<'u128'>
  readonly tickIndex: ToField<I32>
  readonly feeAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: SwapFields) {
    this.$fullTypeName = composeSuiType(
      Swap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::Swap`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.xForY = fields.xForY
    this.amountX = fields.amountX
    this.amountY = fields.amountY
    this.sqrtPriceBefore = fields.sqrtPriceBefore
    this.sqrtPriceAfter = fields.sqrtPriceAfter
    this.liquidity = fields.liquidity
    this.tickIndex = fields.tickIndex
    this.feeAmount = fields.feeAmount
  }

  static reified(): SwapReified {
    return {
      typeName: Swap.$typeName,
      fullTypeName: composeSuiType(Swap.$typeName, ...[]) as `${typeof PKG_V1}::pool::Swap`,
      typeArgs: [] as [],
      isPhantom: Swap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Swap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Swap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Swap.fromBcs(data),
      bcs: Swap.bcs,
      fromJSONField: (field: any) => Swap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Swap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Swap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Swap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Swap.fetch(client, id),
      new: (fields: SwapFields) => {
        return new Swap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Swap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Swap>> {
    return phantom(Swap.reified())
  }
  static get p() {
    return Swap.phantom()
  }

  static get bcs() {
    return bcs.struct('Swap', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      x_for_y: bcs.bool(),
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
      sqrt_price_before: bcs.u128(),
      sqrt_price_after: bcs.u128(),
      liquidity: bcs.u128(),
      tick_index: I32.bcs,
      fee_amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Swap {
    return Swap.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      xForY: decodeFromFields('bool', fields.x_for_y),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
      sqrtPriceBefore: decodeFromFields('u128', fields.sqrt_price_before),
      sqrtPriceAfter: decodeFromFields('u128', fields.sqrt_price_after),
      liquidity: decodeFromFields('u128', fields.liquidity),
      tickIndex: decodeFromFields(I32.reified(), fields.tick_index),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Swap {
    if (!isSwap(item.type)) {
      throw new Error('not a Swap type')
    }

    return Swap.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      xForY: decodeFromFieldsWithTypes('bool', item.fields.x_for_y),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
      sqrtPriceBefore: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price_before),
      sqrtPriceAfter: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price_after),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      tickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_index),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
    })
  }

  static fromBcs(data: Uint8Array): Swap {
    return Swap.fromFields(Swap.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      xForY: this.xForY,
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
      sqrtPriceBefore: this.sqrtPriceBefore.toString(),
      sqrtPriceAfter: this.sqrtPriceAfter.toString(),
      liquidity: this.liquidity.toString(),
      tickIndex: this.tickIndex.toJSONField(),
      feeAmount: this.feeAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Swap {
    return Swap.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      xForY: decodeFromJSONField('bool', field.xForY),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
      sqrtPriceBefore: decodeFromJSONField('u128', field.sqrtPriceBefore),
      sqrtPriceAfter: decodeFromJSONField('u128', field.sqrtPriceAfter),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      tickIndex: decodeFromJSONField(I32.reified(), field.tickIndex),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
    })
  }

  static fromJSON(json: Record<string, any>): Swap {
    if (json.$typeName !== Swap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Swap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Swap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Swap object`)
    }
    return Swap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Swap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwap(data.bcs.type)) {
        throw new Error(`object at is not a Swap object`)
      }

      return Swap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Swap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Swap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Swap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSwap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Swap object`)
    }

    return Swap.fromSuiObjectData(res.data)
  }
}

/* ============================== SwapReceipt =============================== */

export function isSwapReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::SwapReceipt`
}

export interface SwapReceiptFields {
  poolId: ToField<ID>
  amountXDebt: ToField<'u64'>
  amountYDebt: ToField<'u64'>
}

export type SwapReceiptReified = Reified<SwapReceipt, SwapReceiptFields>

export class SwapReceipt implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::SwapReceipt`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SwapReceipt.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::SwapReceipt`
  readonly $typeArgs: []
  readonly $isPhantom = SwapReceipt.$isPhantom

  readonly poolId: ToField<ID>
  readonly amountXDebt: ToField<'u64'>
  readonly amountYDebt: ToField<'u64'>

  private constructor(typeArgs: [], fields: SwapReceiptFields) {
    this.$fullTypeName = composeSuiType(
      SwapReceipt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::SwapReceipt`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.amountXDebt = fields.amountXDebt
    this.amountYDebt = fields.amountYDebt
  }

  static reified(): SwapReceiptReified {
    return {
      typeName: SwapReceipt.$typeName,
      fullTypeName: composeSuiType(
        SwapReceipt.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::SwapReceipt`,
      typeArgs: [] as [],
      isPhantom: SwapReceipt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwapReceipt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwapReceipt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwapReceipt.fromBcs(data),
      bcs: SwapReceipt.bcs,
      fromJSONField: (field: any) => SwapReceipt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwapReceipt.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SwapReceipt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwapReceipt.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SwapReceipt.fetch(client, id),
      new: (fields: SwapReceiptFields) => {
        return new SwapReceipt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SwapReceipt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwapReceipt>> {
    return phantom(SwapReceipt.reified())
  }
  static get p() {
    return SwapReceipt.phantom()
  }

  static get bcs() {
    return bcs.struct('SwapReceipt', {
      pool_id: ID.bcs,
      amount_x_debt: bcs.u64(),
      amount_y_debt: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): SwapReceipt {
    return SwapReceipt.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      amountXDebt: decodeFromFields('u64', fields.amount_x_debt),
      amountYDebt: decodeFromFields('u64', fields.amount_y_debt),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwapReceipt {
    if (!isSwapReceipt(item.type)) {
      throw new Error('not a SwapReceipt type')
    }

    return SwapReceipt.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      amountXDebt: decodeFromFieldsWithTypes('u64', item.fields.amount_x_debt),
      amountYDebt: decodeFromFieldsWithTypes('u64', item.fields.amount_y_debt),
    })
  }

  static fromBcs(data: Uint8Array): SwapReceipt {
    return SwapReceipt.fromFields(SwapReceipt.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      amountXDebt: this.amountXDebt.toString(),
      amountYDebt: this.amountYDebt.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwapReceipt {
    return SwapReceipt.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      amountXDebt: decodeFromJSONField('u64', field.amountXDebt),
      amountYDebt: decodeFromJSONField('u64', field.amountYDebt),
    })
  }

  static fromJSON(json: Record<string, any>): SwapReceipt {
    if (json.$typeName !== SwapReceipt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SwapReceipt.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SwapReceipt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwapReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwapReceipt object`)
    }
    return SwapReceipt.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SwapReceipt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwapReceipt(data.bcs.type)) {
        throw new Error(`object at is not a SwapReceipt object`)
      }

      return SwapReceipt.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwapReceipt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SwapReceipt> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SwapReceipt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSwapReceipt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SwapReceipt object`)
    }

    return SwapReceipt.fromSuiObjectData(res.data)
  }
}

/* ============================== SwapState =============================== */

export function isSwapState(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::SwapState`
}

export interface SwapStateFields {
  amountSpecifiedRemaining: ToField<'u64'>
  amountCalculated: ToField<'u64'>
  sqrtPrice: ToField<'u128'>
  tickIndex: ToField<I32>
  feeGrowthGlobal: ToField<'u128'>
  protocolFee: ToField<'u64'>
  liquidity: ToField<'u128'>
  feeAmount: ToField<'u64'>
}

export type SwapStateReified = Reified<SwapState, SwapStateFields>

export class SwapState implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::SwapState`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SwapState.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::SwapState`
  readonly $typeArgs: []
  readonly $isPhantom = SwapState.$isPhantom

  readonly amountSpecifiedRemaining: ToField<'u64'>
  readonly amountCalculated: ToField<'u64'>
  readonly sqrtPrice: ToField<'u128'>
  readonly tickIndex: ToField<I32>
  readonly feeGrowthGlobal: ToField<'u128'>
  readonly protocolFee: ToField<'u64'>
  readonly liquidity: ToField<'u128'>
  readonly feeAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: SwapStateFields) {
    this.$fullTypeName = composeSuiType(
      SwapState.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::SwapState`
    this.$typeArgs = typeArgs

    this.amountSpecifiedRemaining = fields.amountSpecifiedRemaining
    this.amountCalculated = fields.amountCalculated
    this.sqrtPrice = fields.sqrtPrice
    this.tickIndex = fields.tickIndex
    this.feeGrowthGlobal = fields.feeGrowthGlobal
    this.protocolFee = fields.protocolFee
    this.liquidity = fields.liquidity
    this.feeAmount = fields.feeAmount
  }

  static reified(): SwapStateReified {
    return {
      typeName: SwapState.$typeName,
      fullTypeName: composeSuiType(
        SwapState.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::SwapState`,
      typeArgs: [] as [],
      isPhantom: SwapState.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwapState.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwapState.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwapState.fromBcs(data),
      bcs: SwapState.bcs,
      fromJSONField: (field: any) => SwapState.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwapState.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SwapState.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwapState.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SwapState.fetch(client, id),
      new: (fields: SwapStateFields) => {
        return new SwapState([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SwapState.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwapState>> {
    return phantom(SwapState.reified())
  }
  static get p() {
    return SwapState.phantom()
  }

  static get bcs() {
    return bcs.struct('SwapState', {
      amount_specified_remaining: bcs.u64(),
      amount_calculated: bcs.u64(),
      sqrt_price: bcs.u128(),
      tick_index: I32.bcs,
      fee_growth_global: bcs.u128(),
      protocol_fee: bcs.u64(),
      liquidity: bcs.u128(),
      fee_amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): SwapState {
    return SwapState.reified().new({
      amountSpecifiedRemaining: decodeFromFields('u64', fields.amount_specified_remaining),
      amountCalculated: decodeFromFields('u64', fields.amount_calculated),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      tickIndex: decodeFromFields(I32.reified(), fields.tick_index),
      feeGrowthGlobal: decodeFromFields('u128', fields.fee_growth_global),
      protocolFee: decodeFromFields('u64', fields.protocol_fee),
      liquidity: decodeFromFields('u128', fields.liquidity),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwapState {
    if (!isSwapState(item.type)) {
      throw new Error('not a SwapState type')
    }

    return SwapState.reified().new({
      amountSpecifiedRemaining: decodeFromFieldsWithTypes(
        'u64',
        item.fields.amount_specified_remaining
      ),
      amountCalculated: decodeFromFieldsWithTypes('u64', item.fields.amount_calculated),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      tickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_index),
      feeGrowthGlobal: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_global),
      protocolFee: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
    })
  }

  static fromBcs(data: Uint8Array): SwapState {
    return SwapState.fromFields(SwapState.bcs.parse(data))
  }

  toJSONField() {
    return {
      amountSpecifiedRemaining: this.amountSpecifiedRemaining.toString(),
      amountCalculated: this.amountCalculated.toString(),
      sqrtPrice: this.sqrtPrice.toString(),
      tickIndex: this.tickIndex.toJSONField(),
      feeGrowthGlobal: this.feeGrowthGlobal.toString(),
      protocolFee: this.protocolFee.toString(),
      liquidity: this.liquidity.toString(),
      feeAmount: this.feeAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwapState {
    return SwapState.reified().new({
      amountSpecifiedRemaining: decodeFromJSONField('u64', field.amountSpecifiedRemaining),
      amountCalculated: decodeFromJSONField('u64', field.amountCalculated),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      tickIndex: decodeFromJSONField(I32.reified(), field.tickIndex),
      feeGrowthGlobal: decodeFromJSONField('u128', field.feeGrowthGlobal),
      protocolFee: decodeFromJSONField('u64', field.protocolFee),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
    })
  }

  static fromJSON(json: Record<string, any>): SwapState {
    if (json.$typeName !== SwapState.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SwapState.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SwapState {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwapState(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwapState object`)
    }
    return SwapState.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SwapState {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwapState(data.bcs.type)) {
        throw new Error(`object at is not a SwapState object`)
      }

      return SwapState.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwapState.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SwapState> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SwapState object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSwapState(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SwapState object`)
    }

    return SwapState.fromSuiObjectData(res.data)
  }
}

/* ============================== SwapStepComputations =============================== */

export function isSwapStepComputations(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::SwapStepComputations`
}

export interface SwapStepComputationsFields {
  sqrtPriceStart: ToField<'u128'>
  tickIndexNext: ToField<I32>
  initialized: ToField<'bool'>
  sqrtPriceNext: ToField<'u128'>
  amountIn: ToField<'u64'>
  amountOut: ToField<'u64'>
  feeAmount: ToField<'u64'>
}

export type SwapStepComputationsReified = Reified<SwapStepComputations, SwapStepComputationsFields>

export class SwapStepComputations implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::SwapStepComputations`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SwapStepComputations.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::SwapStepComputations`
  readonly $typeArgs: []
  readonly $isPhantom = SwapStepComputations.$isPhantom

  readonly sqrtPriceStart: ToField<'u128'>
  readonly tickIndexNext: ToField<I32>
  readonly initialized: ToField<'bool'>
  readonly sqrtPriceNext: ToField<'u128'>
  readonly amountIn: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly feeAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: SwapStepComputationsFields) {
    this.$fullTypeName = composeSuiType(
      SwapStepComputations.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::SwapStepComputations`
    this.$typeArgs = typeArgs

    this.sqrtPriceStart = fields.sqrtPriceStart
    this.tickIndexNext = fields.tickIndexNext
    this.initialized = fields.initialized
    this.sqrtPriceNext = fields.sqrtPriceNext
    this.amountIn = fields.amountIn
    this.amountOut = fields.amountOut
    this.feeAmount = fields.feeAmount
  }

  static reified(): SwapStepComputationsReified {
    return {
      typeName: SwapStepComputations.$typeName,
      fullTypeName: composeSuiType(
        SwapStepComputations.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::SwapStepComputations`,
      typeArgs: [] as [],
      isPhantom: SwapStepComputations.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwapStepComputations.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        SwapStepComputations.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwapStepComputations.fromBcs(data),
      bcs: SwapStepComputations.bcs,
      fromJSONField: (field: any) => SwapStepComputations.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwapStepComputations.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        SwapStepComputations.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        SwapStepComputations.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SwapStepComputations.fetch(client, id),
      new: (fields: SwapStepComputationsFields) => {
        return new SwapStepComputations([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SwapStepComputations.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwapStepComputations>> {
    return phantom(SwapStepComputations.reified())
  }
  static get p() {
    return SwapStepComputations.phantom()
  }

  static get bcs() {
    return bcs.struct('SwapStepComputations', {
      sqrt_price_start: bcs.u128(),
      tick_index_next: I32.bcs,
      initialized: bcs.bool(),
      sqrt_price_next: bcs.u128(),
      amount_in: bcs.u64(),
      amount_out: bcs.u64(),
      fee_amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): SwapStepComputations {
    return SwapStepComputations.reified().new({
      sqrtPriceStart: decodeFromFields('u128', fields.sqrt_price_start),
      tickIndexNext: decodeFromFields(I32.reified(), fields.tick_index_next),
      initialized: decodeFromFields('bool', fields.initialized),
      sqrtPriceNext: decodeFromFields('u128', fields.sqrt_price_next),
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountOut: decodeFromFields('u64', fields.amount_out),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwapStepComputations {
    if (!isSwapStepComputations(item.type)) {
      throw new Error('not a SwapStepComputations type')
    }

    return SwapStepComputations.reified().new({
      sqrtPriceStart: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price_start),
      tickIndexNext: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_index_next),
      initialized: decodeFromFieldsWithTypes('bool', item.fields.initialized),
      sqrtPriceNext: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price_next),
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
    })
  }

  static fromBcs(data: Uint8Array): SwapStepComputations {
    return SwapStepComputations.fromFields(SwapStepComputations.bcs.parse(data))
  }

  toJSONField() {
    return {
      sqrtPriceStart: this.sqrtPriceStart.toString(),
      tickIndexNext: this.tickIndexNext.toJSONField(),
      initialized: this.initialized,
      sqrtPriceNext: this.sqrtPriceNext.toString(),
      amountIn: this.amountIn.toString(),
      amountOut: this.amountOut.toString(),
      feeAmount: this.feeAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwapStepComputations {
    return SwapStepComputations.reified().new({
      sqrtPriceStart: decodeFromJSONField('u128', field.sqrtPriceStart),
      tickIndexNext: decodeFromJSONField(I32.reified(), field.tickIndexNext),
      initialized: decodeFromJSONField('bool', field.initialized),
      sqrtPriceNext: decodeFromJSONField('u128', field.sqrtPriceNext),
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
    })
  }

  static fromJSON(json: Record<string, any>): SwapStepComputations {
    if (json.$typeName !== SwapStepComputations.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SwapStepComputations.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SwapStepComputations {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwapStepComputations(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a SwapStepComputations object`
      )
    }
    return SwapStepComputations.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SwapStepComputations {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwapStepComputations(data.bcs.type)) {
        throw new Error(`object at is not a SwapStepComputations object`)
      }

      return SwapStepComputations.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwapStepComputations.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SwapStepComputations> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SwapStepComputations object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSwapStepComputations(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SwapStepComputations object`)
    }

    return SwapStepComputations.fromSuiObjectData(res.data)
  }
}

/* ============================== UpdatePoolRewardEmission =============================== */

export function isUpdatePoolRewardEmission(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::UpdatePoolRewardEmission`
}

export interface UpdatePoolRewardEmissionFields {
  sender: ToField<'address'>
  poolId: ToField<ID>
  rewardCoinType: ToField<TypeName>
  totalReward: ToField<'u64'>
  endedAtSeconds: ToField<'u64'>
  rewardPerSeconds: ToField<'u128'>
}

export type UpdatePoolRewardEmissionReified = Reified<
  UpdatePoolRewardEmission,
  UpdatePoolRewardEmissionFields
>

export class UpdatePoolRewardEmission implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::UpdatePoolRewardEmission`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UpdatePoolRewardEmission.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::UpdatePoolRewardEmission`
  readonly $typeArgs: []
  readonly $isPhantom = UpdatePoolRewardEmission.$isPhantom

  readonly sender: ToField<'address'>
  readonly poolId: ToField<ID>
  readonly rewardCoinType: ToField<TypeName>
  readonly totalReward: ToField<'u64'>
  readonly endedAtSeconds: ToField<'u64'>
  readonly rewardPerSeconds: ToField<'u128'>

  private constructor(typeArgs: [], fields: UpdatePoolRewardEmissionFields) {
    this.$fullTypeName = composeSuiType(
      UpdatePoolRewardEmission.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::UpdatePoolRewardEmission`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.poolId = fields.poolId
    this.rewardCoinType = fields.rewardCoinType
    this.totalReward = fields.totalReward
    this.endedAtSeconds = fields.endedAtSeconds
    this.rewardPerSeconds = fields.rewardPerSeconds
  }

  static reified(): UpdatePoolRewardEmissionReified {
    return {
      typeName: UpdatePoolRewardEmission.$typeName,
      fullTypeName: composeSuiType(
        UpdatePoolRewardEmission.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::UpdatePoolRewardEmission`,
      typeArgs: [] as [],
      isPhantom: UpdatePoolRewardEmission.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdatePoolRewardEmission.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdatePoolRewardEmission.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdatePoolRewardEmission.fromBcs(data),
      bcs: UpdatePoolRewardEmission.bcs,
      fromJSONField: (field: any) => UpdatePoolRewardEmission.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdatePoolRewardEmission.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdatePoolRewardEmission.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdatePoolRewardEmission.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => UpdatePoolRewardEmission.fetch(client, id),
      new: (fields: UpdatePoolRewardEmissionFields) => {
        return new UpdatePoolRewardEmission([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpdatePoolRewardEmission.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdatePoolRewardEmission>> {
    return phantom(UpdatePoolRewardEmission.reified())
  }
  static get p() {
    return UpdatePoolRewardEmission.phantom()
  }

  static get bcs() {
    return bcs.struct('UpdatePoolRewardEmission', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      pool_id: ID.bcs,
      reward_coin_type: TypeName.bcs,
      total_reward: bcs.u64(),
      ended_at_seconds: bcs.u64(),
      reward_per_seconds: bcs.u128(),
    })
  }

  static fromFields(fields: Record<string, any>): UpdatePoolRewardEmission {
    return UpdatePoolRewardEmission.reified().new({
      sender: decodeFromFields('address', fields.sender),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      rewardCoinType: decodeFromFields(TypeName.reified(), fields.reward_coin_type),
      totalReward: decodeFromFields('u64', fields.total_reward),
      endedAtSeconds: decodeFromFields('u64', fields.ended_at_seconds),
      rewardPerSeconds: decodeFromFields('u128', fields.reward_per_seconds),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdatePoolRewardEmission {
    if (!isUpdatePoolRewardEmission(item.type)) {
      throw new Error('not a UpdatePoolRewardEmission type')
    }

    return UpdatePoolRewardEmission.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      rewardCoinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_coin_type),
      totalReward: decodeFromFieldsWithTypes('u64', item.fields.total_reward),
      endedAtSeconds: decodeFromFieldsWithTypes('u64', item.fields.ended_at_seconds),
      rewardPerSeconds: decodeFromFieldsWithTypes('u128', item.fields.reward_per_seconds),
    })
  }

  static fromBcs(data: Uint8Array): UpdatePoolRewardEmission {
    return UpdatePoolRewardEmission.fromFields(UpdatePoolRewardEmission.bcs.parse(data))
  }

  toJSONField() {
    return {
      sender: this.sender,
      poolId: this.poolId,
      rewardCoinType: this.rewardCoinType.toJSONField(),
      totalReward: this.totalReward.toString(),
      endedAtSeconds: this.endedAtSeconds.toString(),
      rewardPerSeconds: this.rewardPerSeconds.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdatePoolRewardEmission {
    return UpdatePoolRewardEmission.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      rewardCoinType: decodeFromJSONField(TypeName.reified(), field.rewardCoinType),
      totalReward: decodeFromJSONField('u64', field.totalReward),
      endedAtSeconds: decodeFromJSONField('u64', field.endedAtSeconds),
      rewardPerSeconds: decodeFromJSONField('u128', field.rewardPerSeconds),
    })
  }

  static fromJSON(json: Record<string, any>): UpdatePoolRewardEmission {
    if (json.$typeName !== UpdatePoolRewardEmission.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UpdatePoolRewardEmission.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpdatePoolRewardEmission {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdatePoolRewardEmission(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdatePoolRewardEmission object`
      )
    }
    return UpdatePoolRewardEmission.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpdatePoolRewardEmission {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdatePoolRewardEmission(data.bcs.type)) {
        throw new Error(`object at is not a UpdatePoolRewardEmission object`)
      }

      return UpdatePoolRewardEmission.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdatePoolRewardEmission.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UpdatePoolRewardEmission> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching UpdatePoolRewardEmission object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isUpdatePoolRewardEmission(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a UpdatePoolRewardEmission object`)
    }

    return UpdatePoolRewardEmission.fromSuiObjectData(res.data)
  }
}
