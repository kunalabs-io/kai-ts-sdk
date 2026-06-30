import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
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
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I32 } from '../../integer-mate/i32/structs'
import { String } from '../../std/string/structs'
import { ID, UID } from '../../sui/object/structs'

/* ============================== POSITION =============================== */

export function isPOSITION(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('bluefin-spot', 'position::POSITION')}::position::POSITION`
}

export interface POSITIONFields {
  dummyField: ToField<'bool'>
}

export type POSITIONReified = Reified<POSITION, POSITIONFields>

export type POSITIONJSONField = {
  dummyField: boolean
}

export type POSITIONJSON = {
  $typeName: typeof POSITION.$typeName
  $typeArgs: []
} & POSITIONJSONField

export class POSITION implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position::POSITION` {
    return `${getTypeOrigin('bluefin-spot', 'position::POSITION')}::position::POSITION` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof POSITION.$typeName = POSITION.$typeName
  readonly $fullTypeName: `${string}::position::POSITION`
  readonly $typeArgs: []
  readonly $isPhantom: typeof POSITION.$isPhantom = POSITION.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: POSITIONFields) {
    this.$fullTypeName = composeSuiType(
      POSITION.$typeName,
      ...typeArgs,
    ) as `${string}::position::POSITION`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): POSITIONReified {
    const reifiedBcs = POSITION.bcs
    return {
      get typeName() {
        return POSITION.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          POSITION.$typeName,
          ...[],
        ) as `${string}::position::POSITION`
      },
      typeArgs: [] as [],
      isPhantom: POSITION.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => POSITION.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => POSITION.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => POSITION.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => POSITION.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => POSITION.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        POSITION.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => POSITION.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => POSITION.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => POSITION.fetch(client, id),
      new: (fields: POSITIONFields) => {
        return new POSITION([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): POSITIONReified {
    return POSITION.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<POSITION>> {
    return phantom(POSITION.reified())
  }

  static get p(): PhantomReified<ToTypeStr<POSITION>> {
    return POSITION.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('POSITION', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof POSITION.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof POSITION.instantiateBcs> {
    if (!POSITION.cachedBcs) {
      POSITION.cachedBcs = POSITION.instantiateBcs()
    }
    return POSITION.cachedBcs
  }

  static fromFields(fields: Record<string, any>): POSITION {
    return POSITION.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): POSITIONJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): POSITIONJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): POSITION {
    return POSITION.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): POSITION {
    if (json.$typeName !== POSITION.$typeName) {
      throw new Error(
        `not a POSITION json object: expected '${POSITION.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return POSITION.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): POSITION {
    if (!isPOSITION(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a POSITION object`)
    }
    return POSITION.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link POSITION.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): POSITION {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPOSITION(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a POSITION object`)
    }
    return POSITION.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link POSITION.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): POSITION {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPOSITION(data.bcs.type)) {
        throw new Error(`object at is not a POSITION object`)
      }

      return POSITION.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return POSITION.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<POSITION> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPOSITION(object.type)) {
      throw new Error(`object at id ${id} is not a POSITION object`)
    }
    return POSITION.fromBcs(object.content)
  }
}

/* ============================== Position =============================== */

export function isPosition(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('bluefin-spot', 'position::Position')}::position::Position`
}

export interface PositionFields {
  id: ToField<UID>
  poolId: ToField<ID>
  lowerTick: ToField<I32>
  upperTick: ToField<I32>
  feeRate: ToField<'u64'>
  liquidity: ToField<'u128'>
  feeGrowthCoinA: ToField<'u128'>
  feeGrowthCoinB: ToField<'u128'>
  tokenAFee: ToField<'u64'>
  tokenBFee: ToField<'u64'>
  name: ToField<String>
  coinTypeA: ToField<String>
  coinTypeB: ToField<String>
  description: ToField<String>
  imageUrl: ToField<String>
  positionIndex: ToField<'u128'>
  rewardInfos: ToField<Vector<PositionRewardInfo>>
}

export type PositionReified = Reified<Position, PositionFields>

export type PositionJSONField = {
  id: string
  poolId: string
  lowerTick: ToJSON<I32>
  upperTick: ToJSON<I32>
  feeRate: string
  liquidity: string
  feeGrowthCoinA: string
  feeGrowthCoinB: string
  tokenAFee: string
  tokenBFee: string
  name: string
  coinTypeA: string
  coinTypeB: string
  description: string
  imageUrl: string
  positionIndex: string
  rewardInfos: ToJSON<PositionRewardInfo>[]
}

export type PositionJSON = {
  $typeName: typeof Position.$typeName
  $typeArgs: []
} & PositionJSONField

export class Position implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position::Position` {
    return `${getTypeOrigin('bluefin-spot', 'position::Position')}::position::Position` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Position.$typeName = Position.$typeName
  readonly $fullTypeName: `${string}::position::Position`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Position.$isPhantom = Position.$isPhantom

  readonly id: ToField<UID>
  readonly poolId: ToField<ID>
  readonly lowerTick: ToField<I32>
  readonly upperTick: ToField<I32>
  readonly feeRate: ToField<'u64'>
  readonly liquidity: ToField<'u128'>
  readonly feeGrowthCoinA: ToField<'u128'>
  readonly feeGrowthCoinB: ToField<'u128'>
  readonly tokenAFee: ToField<'u64'>
  readonly tokenBFee: ToField<'u64'>
  readonly name: ToField<String>
  readonly coinTypeA: ToField<String>
  readonly coinTypeB: ToField<String>
  readonly description: ToField<String>
  readonly imageUrl: ToField<String>
  readonly positionIndex: ToField<'u128'>
  readonly rewardInfos: ToField<Vector<PositionRewardInfo>>

  private constructor(typeArgs: [], fields: PositionFields) {
    this.$fullTypeName = composeSuiType(
      Position.$typeName,
      ...typeArgs,
    ) as `${string}::position::Position`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.poolId = fields.poolId
    this.lowerTick = fields.lowerTick
    this.upperTick = fields.upperTick
    this.feeRate = fields.feeRate
    this.liquidity = fields.liquidity
    this.feeGrowthCoinA = fields.feeGrowthCoinA
    this.feeGrowthCoinB = fields.feeGrowthCoinB
    this.tokenAFee = fields.tokenAFee
    this.tokenBFee = fields.tokenBFee
    this.name = fields.name
    this.coinTypeA = fields.coinTypeA
    this.coinTypeB = fields.coinTypeB
    this.description = fields.description
    this.imageUrl = fields.imageUrl
    this.positionIndex = fields.positionIndex
    this.rewardInfos = fields.rewardInfos
  }

  static reified(): PositionReified {
    const reifiedBcs = Position.bcs
    return {
      get typeName() {
        return Position.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Position.$typeName,
          ...[],
        ) as `${string}::position::Position`
      },
      typeArgs: [] as [],
      isPhantom: Position.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Position.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Position.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Position.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Position.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Position.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Position.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Position.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Position.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Position.fetch(client, id),
      new: (fields: PositionFields) => {
        return new Position([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionReified {
    return Position.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Position>> {
    return phantom(Position.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Position>> {
    return Position.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Position', {
      id: UID.bcs,
      pool_id: ID.bcs,
      lower_tick: I32.bcs,
      upper_tick: I32.bcs,
      fee_rate: bcs.u64(),
      liquidity: bcs.u128(),
      fee_growth_coin_a: bcs.u128(),
      fee_growth_coin_b: bcs.u128(),
      token_a_fee: bcs.u64(),
      token_b_fee: bcs.u64(),
      name: String.bcs,
      coin_type_a: String.bcs,
      coin_type_b: String.bcs,
      description: String.bcs,
      image_url: String.bcs,
      position_index: bcs.u128(),
      reward_infos: bcs.vector(PositionRewardInfo.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof Position.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Position.instantiateBcs> {
    if (!Position.cachedBcs) {
      Position.cachedBcs = Position.instantiateBcs()
    }
    return Position.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Position {
    return Position.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      lowerTick: decodeFromFields(I32.reified(), fields.lower_tick),
      upperTick: decodeFromFields(I32.reified(), fields.upper_tick),
      feeRate: decodeFromFields('u64', fields.fee_rate),
      liquidity: decodeFromFields('u128', fields.liquidity),
      feeGrowthCoinA: decodeFromFields('u128', fields.fee_growth_coin_a),
      feeGrowthCoinB: decodeFromFields('u128', fields.fee_growth_coin_b),
      tokenAFee: decodeFromFields('u64', fields.token_a_fee),
      tokenBFee: decodeFromFields('u64', fields.token_b_fee),
      name: decodeFromFields(String.reified(), fields.name),
      coinTypeA: decodeFromFields(String.reified(), fields.coin_type_a),
      coinTypeB: decodeFromFields(String.reified(), fields.coin_type_b),
      description: decodeFromFields(String.reified(), fields.description),
      imageUrl: decodeFromFields(String.reified(), fields.image_url),
      positionIndex: decodeFromFields('u128', fields.position_index),
      rewardInfos: decodeFromFields(vector(PositionRewardInfo.reified()), fields.reward_infos),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Position {
    if (!isPosition(item.type)) {
      throw new Error('not a Position type')
    }

    return Position.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      lowerTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.lower_tick),
      upperTick: decodeFromFieldsWithTypes(I32.reified(), item.fields.upper_tick),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      feeGrowthCoinA: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_coin_a),
      feeGrowthCoinB: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_coin_b),
      tokenAFee: decodeFromFieldsWithTypes('u64', item.fields.token_a_fee),
      tokenBFee: decodeFromFieldsWithTypes('u64', item.fields.token_b_fee),
      name: decodeFromFieldsWithTypes(String.reified(), item.fields.name),
      coinTypeA: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type_a),
      coinTypeB: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type_b),
      description: decodeFromFieldsWithTypes(String.reified(), item.fields.description),
      imageUrl: decodeFromFieldsWithTypes(String.reified(), item.fields.image_url),
      positionIndex: decodeFromFieldsWithTypes('u128', item.fields.position_index),
      rewardInfos: decodeFromFieldsWithTypes(
        vector(PositionRewardInfo.reified()),
        item.fields.reward_infos,
      ),
    })
  }

  static fromBcs(data: Uint8Array): Position {
    return Position.fromFields(Position.bcs.parse(data))
  }

  toJSONField(): PositionJSONField {
    return {
      id: this.id,
      poolId: this.poolId,
      lowerTick: this.lowerTick.toJSONField(),
      upperTick: this.upperTick.toJSONField(),
      feeRate: this.feeRate.toString(),
      liquidity: this.liquidity.toString(),
      feeGrowthCoinA: this.feeGrowthCoinA.toString(),
      feeGrowthCoinB: this.feeGrowthCoinB.toString(),
      tokenAFee: this.tokenAFee.toString(),
      tokenBFee: this.tokenBFee.toString(),
      name: this.name,
      coinTypeA: this.coinTypeA,
      coinTypeB: this.coinTypeB,
      description: this.description,
      imageUrl: this.imageUrl,
      positionIndex: this.positionIndex.toString(),
      rewardInfos: fieldToJSON<Vector<PositionRewardInfo>>(
        `vector<${PositionRewardInfo.$typeName}>`,
        this.rewardInfos,
      ),
    }
  }

  toJSON(): PositionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Position {
    return Position.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      lowerTick: decodeFromJSONField(I32.reified(), field.lowerTick),
      upperTick: decodeFromJSONField(I32.reified(), field.upperTick),
      feeRate: decodeFromJSONField('u64', field.feeRate),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      feeGrowthCoinA: decodeFromJSONField('u128', field.feeGrowthCoinA),
      feeGrowthCoinB: decodeFromJSONField('u128', field.feeGrowthCoinB),
      tokenAFee: decodeFromJSONField('u64', field.tokenAFee),
      tokenBFee: decodeFromJSONField('u64', field.tokenBFee),
      name: decodeFromJSONField(String.reified(), field.name),
      coinTypeA: decodeFromJSONField(String.reified(), field.coinTypeA),
      coinTypeB: decodeFromJSONField(String.reified(), field.coinTypeB),
      description: decodeFromJSONField(String.reified(), field.description),
      imageUrl: decodeFromJSONField(String.reified(), field.imageUrl),
      positionIndex: decodeFromJSONField('u128', field.positionIndex),
      rewardInfos: decodeFromJSONField(vector(PositionRewardInfo.reified()), field.rewardInfos),
    })
  }

  static fromJSON(json: Record<string, any>): Position {
    if (json.$typeName !== Position.$typeName) {
      throw new Error(
        `not a Position json object: expected '${Position.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Position.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Position {
    if (!isPosition(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Position object`)
    }
    return Position.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Position.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Position {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPosition(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Position object`)
    }
    return Position.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Position.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Position {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPosition(data.bcs.type)) {
        throw new Error(`object at is not a Position object`)
      }

      return Position.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Position.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Position> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPosition(object.type)) {
      throw new Error(`object at id ${id} is not a Position object`)
    }
    return Position.fromBcs(object.content)
  }
}

/* ============================== PositionRewardInfo =============================== */

export function isPositionRewardInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('bluefin-spot', 'position::PositionRewardInfo')
    }::position::PositionRewardInfo`
}

export interface PositionRewardInfoFields {
  rewardGrowthInsideLast: ToField<'u128'>
  coinsOwedReward: ToField<'u64'>
}

export type PositionRewardInfoReified = Reified<PositionRewardInfo, PositionRewardInfoFields>

export type PositionRewardInfoJSONField = {
  rewardGrowthInsideLast: string
  coinsOwedReward: string
}

export type PositionRewardInfoJSON = {
  $typeName: typeof PositionRewardInfo.$typeName
  $typeArgs: []
} & PositionRewardInfoJSONField

export class PositionRewardInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position::PositionRewardInfo` {
    return `${
      getTypeOrigin('bluefin-spot', 'position::PositionRewardInfo')
    }::position::PositionRewardInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionRewardInfo.$typeName = PositionRewardInfo.$typeName
  readonly $fullTypeName: `${string}::position::PositionRewardInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionRewardInfo.$isPhantom = PositionRewardInfo.$isPhantom

  readonly rewardGrowthInsideLast: ToField<'u128'>
  readonly coinsOwedReward: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionRewardInfoFields) {
    this.$fullTypeName = composeSuiType(
      PositionRewardInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position::PositionRewardInfo`
    this.$typeArgs = typeArgs

    this.rewardGrowthInsideLast = fields.rewardGrowthInsideLast
    this.coinsOwedReward = fields.coinsOwedReward
  }

  static reified(): PositionRewardInfoReified {
    const reifiedBcs = PositionRewardInfo.bcs
    return {
      get typeName() {
        return PositionRewardInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PositionRewardInfo.$typeName,
          ...[],
        ) as `${string}::position::PositionRewardInfo`
      },
      typeArgs: [] as [],
      isPhantom: PositionRewardInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionRewardInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionRewardInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionRewardInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionRewardInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionRewardInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PositionRewardInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PositionRewardInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionRewardInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PositionRewardInfo.fetch(client, id),
      new: (fields: PositionRewardInfoFields) => {
        return new PositionRewardInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionRewardInfoReified {
    return PositionRewardInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionRewardInfo>> {
    return phantom(PositionRewardInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionRewardInfo>> {
    return PositionRewardInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionRewardInfo', {
      reward_growth_inside_last: bcs.u128(),
      coins_owed_reward: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionRewardInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionRewardInfo.instantiateBcs> {
    if (!PositionRewardInfo.cachedBcs) {
      PositionRewardInfo.cachedBcs = PositionRewardInfo.instantiateBcs()
    }
    return PositionRewardInfo.cachedBcs
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
        item.fields.reward_growth_inside_last,
      ),
      coinsOwedReward: decodeFromFieldsWithTypes('u64', item.fields.coins_owed_reward),
    })
  }

  static fromBcs(data: Uint8Array): PositionRewardInfo {
    return PositionRewardInfo.fromFields(PositionRewardInfo.bcs.parse(data))
  }

  toJSONField(): PositionRewardInfoJSONField {
    return {
      rewardGrowthInsideLast: this.rewardGrowthInsideLast.toString(),
      coinsOwedReward: this.coinsOwedReward.toString(),
    }
  }

  toJSON(): PositionRewardInfoJSON {
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
      throw new Error(
        `not a PositionRewardInfo json object: expected '${PositionRewardInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionRewardInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PositionRewardInfo {
    if (!isPositionRewardInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PositionRewardInfo object`)
    }
    return PositionRewardInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionRewardInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PositionRewardInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionRewardInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionRewardInfo object`)
    }
    return PositionRewardInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionRewardInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PositionRewardInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionRewardInfo(data.bcs.type)) {
        throw new Error(`object at is not a PositionRewardInfo object`)
      }

      return PositionRewardInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionRewardInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PositionRewardInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPositionRewardInfo(object.type)) {
      throw new Error(`object at id ${id} is not a PositionRewardInfo object`)
    }
    return PositionRewardInfo.fromBcs(object.content)
  }
}
