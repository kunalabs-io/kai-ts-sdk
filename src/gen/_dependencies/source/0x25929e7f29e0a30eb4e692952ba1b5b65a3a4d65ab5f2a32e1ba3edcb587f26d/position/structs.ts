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
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { ID, UID } from '../../../../sui/object/structs'
import { I32 } from '../i32/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Position =============================== */

export function isPosition(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position::Position`
}

export interface PositionFields {
  id: ToField<UID>
  poolId: ToField<ID>
  feeRate: ToField<'u64'>
  coinTypeX: ToField<TypeName>
  coinTypeY: ToField<TypeName>
  tickLowerIndex: ToField<I32>
  tickUpperIndex: ToField<I32>
  liquidity: ToField<'u128'>
  feeGrowthInsideXLast: ToField<'u128'>
  feeGrowthInsideYLast: ToField<'u128'>
  coinsOwedX: ToField<'u64'>
  coinsOwedY: ToField<'u64'>
  rewardInfos: ToField<Vector<PositionRewardInfo>>
}

export type PositionReified = Reified<Position, PositionFields>

export class Position implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position::Position`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Position.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position::Position`
  readonly $typeArgs: []
  readonly $isPhantom = Position.$isPhantom

  readonly id: ToField<UID>
  readonly poolId: ToField<ID>
  readonly feeRate: ToField<'u64'>
  readonly coinTypeX: ToField<TypeName>
  readonly coinTypeY: ToField<TypeName>
  readonly tickLowerIndex: ToField<I32>
  readonly tickUpperIndex: ToField<I32>
  readonly liquidity: ToField<'u128'>
  readonly feeGrowthInsideXLast: ToField<'u128'>
  readonly feeGrowthInsideYLast: ToField<'u128'>
  readonly coinsOwedX: ToField<'u64'>
  readonly coinsOwedY: ToField<'u64'>
  readonly rewardInfos: ToField<Vector<PositionRewardInfo>>

  private constructor(typeArgs: [], fields: PositionFields) {
    this.$fullTypeName = composeSuiType(
      Position.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position::Position`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.poolId = fields.poolId
    this.feeRate = fields.feeRate
    this.coinTypeX = fields.coinTypeX
    this.coinTypeY = fields.coinTypeY
    this.tickLowerIndex = fields.tickLowerIndex
    this.tickUpperIndex = fields.tickUpperIndex
    this.liquidity = fields.liquidity
    this.feeGrowthInsideXLast = fields.feeGrowthInsideXLast
    this.feeGrowthInsideYLast = fields.feeGrowthInsideYLast
    this.coinsOwedX = fields.coinsOwedX
    this.coinsOwedY = fields.coinsOwedY
    this.rewardInfos = fields.rewardInfos
  }

  static reified(): PositionReified {
    return {
      typeName: Position.$typeName,
      fullTypeName: composeSuiType(
        Position.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position::Position`,
      typeArgs: [] as [],
      isPhantom: Position.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Position.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Position.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Position.fromBcs(data),
      bcs: Position.bcs,
      fromJSONField: (field: any) => Position.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Position.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Position.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Position.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Position.fetch(client, id),
      new: (fields: PositionFields) => {
        return new Position([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Position.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Position>> {
    return phantom(Position.reified())
  }
  static get p() {
    return Position.phantom()
  }

  static get bcs() {
    return bcs.struct('Position', {
      id: UID.bcs,
      pool_id: ID.bcs,
      fee_rate: bcs.u64(),
      coin_type_x: TypeName.bcs,
      coin_type_y: TypeName.bcs,
      tick_lower_index: I32.bcs,
      tick_upper_index: I32.bcs,
      liquidity: bcs.u128(),
      fee_growth_inside_x_last: bcs.u128(),
      fee_growth_inside_y_last: bcs.u128(),
      coins_owed_x: bcs.u64(),
      coins_owed_y: bcs.u64(),
      reward_infos: bcs.vector(PositionRewardInfo.bcs),
    })
  }

  static fromFields(fields: Record<string, any>): Position {
    return Position.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      feeRate: decodeFromFields('u64', fields.fee_rate),
      coinTypeX: decodeFromFields(TypeName.reified(), fields.coin_type_x),
      coinTypeY: decodeFromFields(TypeName.reified(), fields.coin_type_y),
      tickLowerIndex: decodeFromFields(I32.reified(), fields.tick_lower_index),
      tickUpperIndex: decodeFromFields(I32.reified(), fields.tick_upper_index),
      liquidity: decodeFromFields('u128', fields.liquidity),
      feeGrowthInsideXLast: decodeFromFields('u128', fields.fee_growth_inside_x_last),
      feeGrowthInsideYLast: decodeFromFields('u128', fields.fee_growth_inside_y_last),
      coinsOwedX: decodeFromFields('u64', fields.coins_owed_x),
      coinsOwedY: decodeFromFields('u64', fields.coins_owed_y),
      rewardInfos: decodeFromFields(
        reified.vector(PositionRewardInfo.reified()),
        fields.reward_infos
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Position {
    if (!isPosition(item.type)) {
      throw new Error('not a Position type')
    }

    return Position.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
      coinTypeX: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_x),
      coinTypeY: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_y),
      tickLowerIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower_index),
      tickUpperIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper_index),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      feeGrowthInsideXLast: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_inside_x_last),
      feeGrowthInsideYLast: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_inside_y_last),
      coinsOwedX: decodeFromFieldsWithTypes('u64', item.fields.coins_owed_x),
      coinsOwedY: decodeFromFieldsWithTypes('u64', item.fields.coins_owed_y),
      rewardInfos: decodeFromFieldsWithTypes(
        reified.vector(PositionRewardInfo.reified()),
        item.fields.reward_infos
      ),
    })
  }

  static fromBcs(data: Uint8Array): Position {
    return Position.fromFields(Position.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      poolId: this.poolId,
      feeRate: this.feeRate.toString(),
      coinTypeX: this.coinTypeX.toJSONField(),
      coinTypeY: this.coinTypeY.toJSONField(),
      tickLowerIndex: this.tickLowerIndex.toJSONField(),
      tickUpperIndex: this.tickUpperIndex.toJSONField(),
      liquidity: this.liquidity.toString(),
      feeGrowthInsideXLast: this.feeGrowthInsideXLast.toString(),
      feeGrowthInsideYLast: this.feeGrowthInsideYLast.toString(),
      coinsOwedX: this.coinsOwedX.toString(),
      coinsOwedY: this.coinsOwedY.toString(),
      rewardInfos: fieldToJSON<Vector<PositionRewardInfo>>(
        `vector<${PositionRewardInfo.$typeName}>`,
        this.rewardInfos
      ),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Position {
    return Position.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      feeRate: decodeFromJSONField('u64', field.feeRate),
      coinTypeX: decodeFromJSONField(TypeName.reified(), field.coinTypeX),
      coinTypeY: decodeFromJSONField(TypeName.reified(), field.coinTypeY),
      tickLowerIndex: decodeFromJSONField(I32.reified(), field.tickLowerIndex),
      tickUpperIndex: decodeFromJSONField(I32.reified(), field.tickUpperIndex),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      feeGrowthInsideXLast: decodeFromJSONField('u128', field.feeGrowthInsideXLast),
      feeGrowthInsideYLast: decodeFromJSONField('u128', field.feeGrowthInsideYLast),
      coinsOwedX: decodeFromJSONField('u64', field.coinsOwedX),
      coinsOwedY: decodeFromJSONField('u64', field.coinsOwedY),
      rewardInfos: decodeFromJSONField(
        reified.vector(PositionRewardInfo.reified()),
        field.rewardInfos
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Position {
    if (json.$typeName !== Position.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Position.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Position {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPosition(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Position object`)
    }
    return Position.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Position {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPosition(data.bcs.type)) {
        throw new Error(`object at is not a Position object`)
      }

      return Position.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Position.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Position> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Position object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPosition(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Position object`)
    }

    return Position.fromSuiObjectData(res.data)
  }
}

/* ============================== PositionRewardInfo =============================== */

export function isPositionRewardInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position::PositionRewardInfo`
}

export interface PositionRewardInfoFields {
  rewardGrowthInsideLast: ToField<'u128'>
  coinsOwedReward: ToField<'u64'>
}

export type PositionRewardInfoReified = Reified<PositionRewardInfo, PositionRewardInfoFields>

export class PositionRewardInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position::PositionRewardInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionRewardInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position::PositionRewardInfo`
  readonly $typeArgs: []
  readonly $isPhantom = PositionRewardInfo.$isPhantom

  readonly rewardGrowthInsideLast: ToField<'u128'>
  readonly coinsOwedReward: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionRewardInfoFields) {
    this.$fullTypeName = composeSuiType(
      PositionRewardInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position::PositionRewardInfo`
    this.$typeArgs = typeArgs

    this.rewardGrowthInsideLast = fields.rewardGrowthInsideLast
    this.coinsOwedReward = fields.coinsOwedReward
  }

  static reified(): PositionRewardInfoReified {
    return {
      typeName: PositionRewardInfo.$typeName,
      fullTypeName: composeSuiType(
        PositionRewardInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position::PositionRewardInfo`,
      typeArgs: [] as [],
      isPhantom: PositionRewardInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionRewardInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionRewardInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionRewardInfo.fromBcs(data),
      bcs: PositionRewardInfo.bcs,
      fromJSONField: (field: any) => PositionRewardInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionRewardInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionRewardInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionRewardInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionRewardInfo.fetch(client, id),
      new: (fields: PositionRewardInfoFields) => {
        return new PositionRewardInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionRewardInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionRewardInfo>> {
    return phantom(PositionRewardInfo.reified())
  }
  static get p() {
    return PositionRewardInfo.phantom()
  }

  static get bcs() {
    return bcs.struct('PositionRewardInfo', {
      reward_growth_inside_last: bcs.u128(),
      coins_owed_reward: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): PositionRewardInfo {
    return PositionRewardInfo.reified().new({
      rewardGrowthInsideLast: decodeFromFields('u128', fields.reward_growth_inside_last),
      coinsOwedReward: decodeFromFields('u64', fields.coins_owed_reward),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionRewardInfo {
    if (!isPositionRewardInfo(item.type)) {
      throw new Error('not a PositionRewardInfo type')
    }

    return PositionRewardInfo.reified().new({
      rewardGrowthInsideLast: decodeFromFieldsWithTypes(
        'u128',
        item.fields.reward_growth_inside_last
      ),
      coinsOwedReward: decodeFromFieldsWithTypes('u64', item.fields.coins_owed_reward),
    })
  }

  static fromBcs(data: Uint8Array): PositionRewardInfo {
    return PositionRewardInfo.fromFields(PositionRewardInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      rewardGrowthInsideLast: this.rewardGrowthInsideLast.toString(),
      coinsOwedReward: this.coinsOwedReward.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionRewardInfo {
    return PositionRewardInfo.reified().new({
      rewardGrowthInsideLast: decodeFromJSONField('u128', field.rewardGrowthInsideLast),
      coinsOwedReward: decodeFromJSONField('u64', field.coinsOwedReward),
    })
  }

  static fromJSON(json: Record<string, any>): PositionRewardInfo {
    if (json.$typeName !== PositionRewardInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PositionRewardInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionRewardInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionRewardInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionRewardInfo object`)
    }
    return PositionRewardInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionRewardInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionRewardInfo(data.bcs.type)) {
        throw new Error(`object at is not a PositionRewardInfo object`)
      }

      return PositionRewardInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionRewardInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionRewardInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PositionRewardInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPositionRewardInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PositionRewardInfo object`)
    }

    return PositionRewardInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== POSITION =============================== */

export function isPOSITION(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position::POSITION`
}

export interface POSITIONFields {
  dummyField: ToField<'bool'>
}

export type POSITIONReified = Reified<POSITION, POSITIONFields>

export class POSITION implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position::POSITION`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = POSITION.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position::POSITION`
  readonly $typeArgs: []
  readonly $isPhantom = POSITION.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: POSITIONFields) {
    this.$fullTypeName = composeSuiType(
      POSITION.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position::POSITION`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): POSITIONReified {
    return {
      typeName: POSITION.$typeName,
      fullTypeName: composeSuiType(
        POSITION.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position::POSITION`,
      typeArgs: [] as [],
      isPhantom: POSITION.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => POSITION.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => POSITION.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => POSITION.fromBcs(data),
      bcs: POSITION.bcs,
      fromJSONField: (field: any) => POSITION.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => POSITION.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => POSITION.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => POSITION.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => POSITION.fetch(client, id),
      new: (fields: POSITIONFields) => {
        return new POSITION([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return POSITION.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<POSITION>> {
    return phantom(POSITION.reified())
  }
  static get p() {
    return POSITION.phantom()
  }

  static get bcs() {
    return bcs.struct('POSITION', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): POSITION {
    return POSITION.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): POSITION {
    if (!isPOSITION(item.type)) {
      throw new Error('not a POSITION type')
    }

    return POSITION.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): POSITION {
    return POSITION.fromFields(POSITION.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): POSITION {
    return POSITION.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): POSITION {
    if (json.$typeName !== POSITION.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return POSITION.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): POSITION {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPOSITION(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a POSITION object`)
    }
    return POSITION.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): POSITION {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPOSITION(data.bcs.type)) {
        throw new Error(`object at is not a POSITION object`)
      }

      return POSITION.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return POSITION.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<POSITION> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching POSITION object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPOSITION(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a POSITION object`)
    }

    return POSITION.fromSuiObjectData(res.data)
  }
}
