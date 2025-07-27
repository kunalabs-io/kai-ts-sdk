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
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { Option } from '../../0x1/option/structs'
import { String } from '../../0x1/string/structs'
import { TypeName } from '../../0x1/type-name/structs'
import { Position } from '../../0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb/position/structs'
import { LinkedTable } from '../../0x2/linked-table/structs'
import { ID, UID } from '../../0x2/object/structs'
import { VecMap } from '../../0x2/vec-map/structs'
import { I32 } from '../../0x714a63a0dba6da4f017b42d5d0fb78867f18bcde904868e51d951a5a6f5b7f57/i32/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== POOL =============================== */

export function isPOOL(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::POOL`
}

export interface POOLFields {
  dummyField: ToField<'bool'>
}

export type POOLReified = Reified<POOL, POOLFields>

export class POOL implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::POOL`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = POOL.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::POOL`
  readonly $typeArgs: []
  readonly $isPhantom = POOL.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: POOLFields) {
    this.$fullTypeName = composeSuiType(
      POOL.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::POOL`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): POOLReified {
    const reifiedBcs = POOL.bcs
    return {
      typeName: POOL.$typeName,
      fullTypeName: composeSuiType(POOL.$typeName, ...[]) as `${typeof PKG_V1}::pool::POOL`,
      typeArgs: [] as [],
      isPhantom: POOL.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => POOL.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => POOL.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => POOL.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => POOL.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => POOL.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => POOL.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => POOL.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => POOL.fetch(client, id),
      new: (fields: POOLFields) => {
        return new POOL([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return POOL.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<POOL>> {
    return phantom(POOL.reified())
  }
  static get p() {
    return POOL.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('POOL', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof POOL.instantiateBcs> | null = null

  static get bcs() {
    if (!POOL.cachedBcs) {
      POOL.cachedBcs = POOL.instantiateBcs()
    }
    return POOL.cachedBcs
  }

  static fromFields(fields: Record<string, any>): POOL {
    return POOL.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): POOL {
    if (!isPOOL(item.type)) {
      throw new Error('not a POOL type')
    }

    return POOL.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): POOL {
    return POOL.fromFields(POOL.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): POOL {
    return POOL.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): POOL {
    if (json.$typeName !== POOL.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return POOL.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): POOL {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPOOL(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a POOL object`)
    }
    return POOL.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): POOL {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPOOL(data.bcs.type)) {
        throw new Error(`object at is not a POOL object`)
      }

      return POOL.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return POOL.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<POOL> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching POOL object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPOOL(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a POOL object`)
    }

    return POOL.fromSuiObjectData(res.data)
  }
}

/* ============================== WrappedPositionNFT =============================== */

export function isWrappedPositionNFT(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::WrappedPositionNFT`
}

export interface WrappedPositionNFTFields {
  id: ToField<UID>
  poolId: ToField<ID>
  clmmPostion: ToField<Position>
  url: ToField<String>
}

export type WrappedPositionNFTReified = Reified<WrappedPositionNFT, WrappedPositionNFTFields>

export class WrappedPositionNFT implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::WrappedPositionNFT`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = WrappedPositionNFT.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::WrappedPositionNFT`
  readonly $typeArgs: []
  readonly $isPhantom = WrappedPositionNFT.$isPhantom

  readonly id: ToField<UID>
  readonly poolId: ToField<ID>
  readonly clmmPostion: ToField<Position>
  readonly url: ToField<String>

  private constructor(typeArgs: [], fields: WrappedPositionNFTFields) {
    this.$fullTypeName = composeSuiType(
      WrappedPositionNFT.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::WrappedPositionNFT`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.poolId = fields.poolId
    this.clmmPostion = fields.clmmPostion
    this.url = fields.url
  }

  static reified(): WrappedPositionNFTReified {
    const reifiedBcs = WrappedPositionNFT.bcs
    return {
      typeName: WrappedPositionNFT.$typeName,
      fullTypeName: composeSuiType(
        WrappedPositionNFT.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::WrappedPositionNFT`,
      typeArgs: [] as [],
      isPhantom: WrappedPositionNFT.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WrappedPositionNFT.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WrappedPositionNFT.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WrappedPositionNFT.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WrappedPositionNFT.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WrappedPositionNFT.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => WrappedPositionNFT.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WrappedPositionNFT.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => WrappedPositionNFT.fetch(client, id),
      new: (fields: WrappedPositionNFTFields) => {
        return new WrappedPositionNFT([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WrappedPositionNFT.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WrappedPositionNFT>> {
    return phantom(WrappedPositionNFT.reified())
  }
  static get p() {
    return WrappedPositionNFT.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WrappedPositionNFT', {
      id: UID.bcs,
      pool_id: ID.bcs,
      clmm_postion: Position.bcs,
      url: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof WrappedPositionNFT.instantiateBcs> | null = null

  static get bcs() {
    if (!WrappedPositionNFT.cachedBcs) {
      WrappedPositionNFT.cachedBcs = WrappedPositionNFT.instantiateBcs()
    }
    return WrappedPositionNFT.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WrappedPositionNFT {
    return WrappedPositionNFT.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      clmmPostion: decodeFromFields(Position.reified(), fields.clmm_postion),
      url: decodeFromFields(String.reified(), fields.url),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WrappedPositionNFT {
    if (!isWrappedPositionNFT(item.type)) {
      throw new Error('not a WrappedPositionNFT type')
    }

    return WrappedPositionNFT.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      clmmPostion: decodeFromFieldsWithTypes(Position.reified(), item.fields.clmm_postion),
      url: decodeFromFieldsWithTypes(String.reified(), item.fields.url),
    })
  }

  static fromBcs(data: Uint8Array): WrappedPositionNFT {
    return WrappedPositionNFT.fromFields(WrappedPositionNFT.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      poolId: this.poolId,
      clmmPostion: this.clmmPostion.toJSONField(),
      url: this.url,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WrappedPositionNFT {
    return WrappedPositionNFT.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      clmmPostion: decodeFromJSONField(Position.reified(), field.clmmPostion),
      url: decodeFromJSONField(String.reified(), field.url),
    })
  }

  static fromJSON(json: Record<string, any>): WrappedPositionNFT {
    if (json.$typeName !== WrappedPositionNFT.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return WrappedPositionNFT.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): WrappedPositionNFT {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedPositionNFT(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WrappedPositionNFT object`)
    }
    return WrappedPositionNFT.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): WrappedPositionNFT {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWrappedPositionNFT(data.bcs.type)) {
        throw new Error(`object at is not a WrappedPositionNFT object`)
      }

      return WrappedPositionNFT.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WrappedPositionNFT.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<WrappedPositionNFT> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WrappedPositionNFT object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWrappedPositionNFT(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WrappedPositionNFT object`)
    }

    return WrappedPositionNFT.fromSuiObjectData(res.data)
  }
}

/* ============================== PositionRewardInfo =============================== */

export function isPositionRewardInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::PositionRewardInfo`
}

export interface PositionRewardInfoFields {
  reward: ToField<'u128'>
  rewardDebt: ToField<'u128'>
  rewardHarvested: ToField<'u64'>
}

export type PositionRewardInfoReified = Reified<PositionRewardInfo, PositionRewardInfoFields>

export class PositionRewardInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::PositionRewardInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionRewardInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::PositionRewardInfo`
  readonly $typeArgs: []
  readonly $isPhantom = PositionRewardInfo.$isPhantom

  readonly reward: ToField<'u128'>
  readonly rewardDebt: ToField<'u128'>
  readonly rewardHarvested: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionRewardInfoFields) {
    this.$fullTypeName = composeSuiType(
      PositionRewardInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::PositionRewardInfo`
    this.$typeArgs = typeArgs

    this.reward = fields.reward
    this.rewardDebt = fields.rewardDebt
    this.rewardHarvested = fields.rewardHarvested
  }

  static reified(): PositionRewardInfoReified {
    const reifiedBcs = PositionRewardInfo.bcs
    return {
      typeName: PositionRewardInfo.$typeName,
      fullTypeName: composeSuiType(
        PositionRewardInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::PositionRewardInfo`,
      typeArgs: [] as [],
      isPhantom: PositionRewardInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionRewardInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionRewardInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionRewardInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
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

  private static instantiateBcs() {
    return bcs.struct('PositionRewardInfo', {
      reward: bcs.u128(),
      reward_debt: bcs.u128(),
      reward_harvested: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionRewardInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!PositionRewardInfo.cachedBcs) {
      PositionRewardInfo.cachedBcs = PositionRewardInfo.instantiateBcs()
    }
    return PositionRewardInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionRewardInfo {
    return PositionRewardInfo.reified().new({
      reward: decodeFromFields('u128', fields.reward),
      rewardDebt: decodeFromFields('u128', fields.reward_debt),
      rewardHarvested: decodeFromFields('u64', fields.reward_harvested),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionRewardInfo {
    if (!isPositionRewardInfo(item.type)) {
      throw new Error('not a PositionRewardInfo type')
    }

    return PositionRewardInfo.reified().new({
      reward: decodeFromFieldsWithTypes('u128', item.fields.reward),
      rewardDebt: decodeFromFieldsWithTypes('u128', item.fields.reward_debt),
      rewardHarvested: decodeFromFieldsWithTypes('u64', item.fields.reward_harvested),
    })
  }

  static fromBcs(data: Uint8Array): PositionRewardInfo {
    return PositionRewardInfo.fromFields(PositionRewardInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      reward: this.reward.toString(),
      rewardDebt: this.rewardDebt.toString(),
      rewardHarvested: this.rewardHarvested.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionRewardInfo {
    return PositionRewardInfo.reified().new({
      reward: decodeFromJSONField('u128', field.reward),
      rewardDebt: decodeFromJSONField('u128', field.rewardDebt),
      rewardHarvested: decodeFromJSONField('u64', field.rewardHarvested),
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

/* ============================== WrappedPositionInfo =============================== */

export function isWrappedPositionInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::WrappedPositionInfo`
}

export interface WrappedPositionInfoFields {
  id: ToField<ID>
  poolId: ToField<ID>
  clmmPoolId: ToField<ID>
  clmmPositionId: ToField<ID>
  tickLower: ToField<I32>
  tickUpper: ToField<I32>
  liquidity: ToField<'u128'>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
  sqrtPrice: ToField<'u128'>
  share: ToField<'u128'>
  rewards: ToField<VecMap<TypeName, PositionRewardInfo>>
}

export type WrappedPositionInfoReified = Reified<WrappedPositionInfo, WrappedPositionInfoFields>

export class WrappedPositionInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::WrappedPositionInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = WrappedPositionInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::WrappedPositionInfo`
  readonly $typeArgs: []
  readonly $isPhantom = WrappedPositionInfo.$isPhantom

  readonly id: ToField<ID>
  readonly poolId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly tickLower: ToField<I32>
  readonly tickUpper: ToField<I32>
  readonly liquidity: ToField<'u128'>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly share: ToField<'u128'>
  readonly rewards: ToField<VecMap<TypeName, PositionRewardInfo>>

  private constructor(typeArgs: [], fields: WrappedPositionInfoFields) {
    this.$fullTypeName = composeSuiType(
      WrappedPositionInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::WrappedPositionInfo`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.poolId = fields.poolId
    this.clmmPoolId = fields.clmmPoolId
    this.clmmPositionId = fields.clmmPositionId
    this.tickLower = fields.tickLower
    this.tickUpper = fields.tickUpper
    this.liquidity = fields.liquidity
    this.effectiveTickLower = fields.effectiveTickLower
    this.effectiveTickUpper = fields.effectiveTickUpper
    this.sqrtPrice = fields.sqrtPrice
    this.share = fields.share
    this.rewards = fields.rewards
  }

  static reified(): WrappedPositionInfoReified {
    const reifiedBcs = WrappedPositionInfo.bcs
    return {
      typeName: WrappedPositionInfo.$typeName,
      fullTypeName: composeSuiType(
        WrappedPositionInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::WrappedPositionInfo`,
      typeArgs: [] as [],
      isPhantom: WrappedPositionInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WrappedPositionInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WrappedPositionInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WrappedPositionInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WrappedPositionInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WrappedPositionInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => WrappedPositionInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WrappedPositionInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => WrappedPositionInfo.fetch(client, id),
      new: (fields: WrappedPositionInfoFields) => {
        return new WrappedPositionInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WrappedPositionInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WrappedPositionInfo>> {
    return phantom(WrappedPositionInfo.reified())
  }
  static get p() {
    return WrappedPositionInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WrappedPositionInfo', {
      id: ID.bcs,
      pool_id: ID.bcs,
      clmm_pool_id: ID.bcs,
      clmm_position_id: ID.bcs,
      tick_lower: I32.bcs,
      tick_upper: I32.bcs,
      liquidity: bcs.u128(),
      effective_tick_lower: I32.bcs,
      effective_tick_upper: I32.bcs,
      sqrt_price: bcs.u128(),
      share: bcs.u128(),
      rewards: VecMap.bcs(TypeName.bcs, PositionRewardInfo.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof WrappedPositionInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!WrappedPositionInfo.cachedBcs) {
      WrappedPositionInfo.cachedBcs = WrappedPositionInfo.instantiateBcs()
    }
    return WrappedPositionInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WrappedPositionInfo {
    return WrappedPositionInfo.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      clmmPositionId: decodeFromFields(ID.reified(), fields.clmm_position_id),
      tickLower: decodeFromFields(I32.reified(), fields.tick_lower),
      tickUpper: decodeFromFields(I32.reified(), fields.tick_upper),
      liquidity: decodeFromFields('u128', fields.liquidity),
      effectiveTickLower: decodeFromFields(I32.reified(), fields.effective_tick_lower),
      effectiveTickUpper: decodeFromFields(I32.reified(), fields.effective_tick_upper),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      share: decodeFromFields('u128', fields.share),
      rewards: decodeFromFields(
        VecMap.reified(TypeName.reified(), PositionRewardInfo.reified()),
        fields.rewards
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WrappedPositionInfo {
    if (!isWrappedPositionInfo(item.type)) {
      throw new Error('not a WrappedPositionInfo type')
    }

    return WrappedPositionInfo.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      clmmPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_position_id),
      tickLower: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower),
      tickUpper: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      effectiveTickLower: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_lower
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      share: decodeFromFieldsWithTypes('u128', item.fields.share),
      rewards: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), PositionRewardInfo.reified()),
        item.fields.rewards
      ),
    })
  }

  static fromBcs(data: Uint8Array): WrappedPositionInfo {
    return WrappedPositionInfo.fromFields(WrappedPositionInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      poolId: this.poolId,
      clmmPoolId: this.clmmPoolId,
      clmmPositionId: this.clmmPositionId,
      tickLower: this.tickLower.toJSONField(),
      tickUpper: this.tickUpper.toJSONField(),
      liquidity: this.liquidity.toString(),
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      share: this.share.toString(),
      rewards: this.rewards.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WrappedPositionInfo {
    return WrappedPositionInfo.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      clmmPositionId: decodeFromJSONField(ID.reified(), field.clmmPositionId),
      tickLower: decodeFromJSONField(I32.reified(), field.tickLower),
      tickUpper: decodeFromJSONField(I32.reified(), field.tickUpper),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      share: decodeFromJSONField('u128', field.share),
      rewards: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), PositionRewardInfo.reified()),
        field.rewards
      ),
    })
  }

  static fromJSON(json: Record<string, any>): WrappedPositionInfo {
    if (json.$typeName !== WrappedPositionInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return WrappedPositionInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): WrappedPositionInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedPositionInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WrappedPositionInfo object`)
    }
    return WrappedPositionInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): WrappedPositionInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWrappedPositionInfo(data.bcs.type)) {
        throw new Error(`object at is not a WrappedPositionInfo object`)
      }

      return WrappedPositionInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WrappedPositionInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<WrappedPositionInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WrappedPositionInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWrappedPositionInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WrappedPositionInfo object`)
    }

    return WrappedPositionInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== Pool =============================== */

export function isPool(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::Pool`
}

export interface PoolFields {
  id: ToField<UID>
  clmmPoolId: ToField<ID>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
  sqrtPrice: ToField<'u128'>
  totalShare: ToField<'u128'>
  rewarders: ToField<Vector<TypeName>>
  positions: ToField<LinkedTable<ID, ToPhantom<WrappedPositionInfo>>>
}

export type PoolReified = Reified<Pool, PoolFields>

export class Pool implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::Pool`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Pool.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::Pool`
  readonly $typeArgs: []
  readonly $isPhantom = Pool.$isPhantom

  readonly id: ToField<UID>
  readonly clmmPoolId: ToField<ID>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly totalShare: ToField<'u128'>
  readonly rewarders: ToField<Vector<TypeName>>
  readonly positions: ToField<LinkedTable<ID, ToPhantom<WrappedPositionInfo>>>

  private constructor(typeArgs: [], fields: PoolFields) {
    this.$fullTypeName = composeSuiType(
      Pool.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::Pool`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.clmmPoolId = fields.clmmPoolId
    this.effectiveTickLower = fields.effectiveTickLower
    this.effectiveTickUpper = fields.effectiveTickUpper
    this.sqrtPrice = fields.sqrtPrice
    this.totalShare = fields.totalShare
    this.rewarders = fields.rewarders
    this.positions = fields.positions
  }

  static reified(): PoolReified {
    const reifiedBcs = Pool.bcs
    return {
      typeName: Pool.$typeName,
      fullTypeName: composeSuiType(Pool.$typeName, ...[]) as `${typeof PKG_V1}::pool::Pool`,
      typeArgs: [] as [],
      isPhantom: Pool.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Pool.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Pool.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Pool.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Pool.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Pool.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Pool.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Pool.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Pool.fetch(client, id),
      new: (fields: PoolFields) => {
        return new Pool([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Pool.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Pool>> {
    return phantom(Pool.reified())
  }
  static get p() {
    return Pool.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Pool', {
      id: UID.bcs,
      clmm_pool_id: ID.bcs,
      effective_tick_lower: I32.bcs,
      effective_tick_upper: I32.bcs,
      sqrt_price: bcs.u128(),
      total_share: bcs.u128(),
      rewarders: bcs.vector(TypeName.bcs),
      positions: LinkedTable.bcs(ID.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof Pool.instantiateBcs> | null = null

  static get bcs() {
    if (!Pool.cachedBcs) {
      Pool.cachedBcs = Pool.instantiateBcs()
    }
    return Pool.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Pool {
    return Pool.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      effectiveTickLower: decodeFromFields(I32.reified(), fields.effective_tick_lower),
      effectiveTickUpper: decodeFromFields(I32.reified(), fields.effective_tick_upper),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      totalShare: decodeFromFields('u128', fields.total_share),
      rewarders: decodeFromFields(reified.vector(TypeName.reified()), fields.rewarders),
      positions: decodeFromFields(
        LinkedTable.reified(ID.reified(), reified.phantom(WrappedPositionInfo.reified())),
        fields.positions
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Pool {
    if (!isPool(item.type)) {
      throw new Error('not a Pool type')
    }

    return Pool.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      effectiveTickLower: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_lower
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      totalShare: decodeFromFieldsWithTypes('u128', item.fields.total_share),
      rewarders: decodeFromFieldsWithTypes(
        reified.vector(TypeName.reified()),
        item.fields.rewarders
      ),
      positions: decodeFromFieldsWithTypes(
        LinkedTable.reified(ID.reified(), reified.phantom(WrappedPositionInfo.reified())),
        item.fields.positions
      ),
    })
  }

  static fromBcs(data: Uint8Array): Pool {
    return Pool.fromFields(Pool.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      clmmPoolId: this.clmmPoolId,
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      totalShare: this.totalShare.toString(),
      rewarders: fieldToJSON<Vector<TypeName>>(`vector<${TypeName.$typeName}>`, this.rewarders),
      positions: this.positions.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Pool {
    return Pool.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      totalShare: decodeFromJSONField('u128', field.totalShare),
      rewarders: decodeFromJSONField(reified.vector(TypeName.reified()), field.rewarders),
      positions: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), reified.phantom(WrappedPositionInfo.reified())),
        field.positions
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Pool {
    if (json.$typeName !== Pool.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Pool.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Pool {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Pool object`)
    }
    return Pool.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Pool {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPool(data.bcs.type)) {
        throw new Error(`object at is not a Pool object`)
      }

      return Pool.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Pool.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Pool> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Pool object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPool(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Pool object`)
    }

    return Pool.fromSuiObjectData(res.data)
  }
}

/* ============================== CreatePoolEvent =============================== */

export function isCreatePoolEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::CreatePoolEvent`
}

export interface CreatePoolEventFields {
  poolId: ToField<ID>
  clmmPoolId: ToField<ID>
  sqrtPrice: ToField<'u128'>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
}

export type CreatePoolEventReified = Reified<CreatePoolEvent, CreatePoolEventFields>

export class CreatePoolEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::CreatePoolEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CreatePoolEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::CreatePoolEvent`
  readonly $typeArgs: []
  readonly $isPhantom = CreatePoolEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly sqrtPrice: ToField<'u128'>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>

  private constructor(typeArgs: [], fields: CreatePoolEventFields) {
    this.$fullTypeName = composeSuiType(
      CreatePoolEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::CreatePoolEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.clmmPoolId = fields.clmmPoolId
    this.sqrtPrice = fields.sqrtPrice
    this.effectiveTickLower = fields.effectiveTickLower
    this.effectiveTickUpper = fields.effectiveTickUpper
  }

  static reified(): CreatePoolEventReified {
    const reifiedBcs = CreatePoolEvent.bcs
    return {
      typeName: CreatePoolEvent.$typeName,
      fullTypeName: composeSuiType(
        CreatePoolEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::CreatePoolEvent`,
      typeArgs: [] as [],
      isPhantom: CreatePoolEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CreatePoolEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CreatePoolEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CreatePoolEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CreatePoolEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CreatePoolEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CreatePoolEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CreatePoolEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => CreatePoolEvent.fetch(client, id),
      new: (fields: CreatePoolEventFields) => {
        return new CreatePoolEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CreatePoolEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CreatePoolEvent>> {
    return phantom(CreatePoolEvent.reified())
  }
  static get p() {
    return CreatePoolEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CreatePoolEvent', {
      pool_id: ID.bcs,
      clmm_pool_id: ID.bcs,
      sqrt_price: bcs.u128(),
      effective_tick_lower: I32.bcs,
      effective_tick_upper: I32.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof CreatePoolEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!CreatePoolEvent.cachedBcs) {
      CreatePoolEvent.cachedBcs = CreatePoolEvent.instantiateBcs()
    }
    return CreatePoolEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CreatePoolEvent {
    return CreatePoolEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      effectiveTickLower: decodeFromFields(I32.reified(), fields.effective_tick_lower),
      effectiveTickUpper: decodeFromFields(I32.reified(), fields.effective_tick_upper),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CreatePoolEvent {
    if (!isCreatePoolEvent(item.type)) {
      throw new Error('not a CreatePoolEvent type')
    }

    return CreatePoolEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      effectiveTickLower: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_lower
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper
      ),
    })
  }

  static fromBcs(data: Uint8Array): CreatePoolEvent {
    return CreatePoolEvent.fromFields(CreatePoolEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      clmmPoolId: this.clmmPoolId,
      sqrtPrice: this.sqrtPrice.toString(),
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CreatePoolEvent {
    return CreatePoolEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
    })
  }

  static fromJSON(json: Record<string, any>): CreatePoolEvent {
    if (json.$typeName !== CreatePoolEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CreatePoolEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CreatePoolEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCreatePoolEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CreatePoolEvent object`)
    }
    return CreatePoolEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CreatePoolEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCreatePoolEvent(data.bcs.type)) {
        throw new Error(`object at is not a CreatePoolEvent object`)
      }

      return CreatePoolEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreatePoolEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CreatePoolEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching CreatePoolEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCreatePoolEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CreatePoolEvent object`)
    }

    return CreatePoolEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== UpdateEffectiveTickRangeEvent =============================== */

export function isUpdateEffectiveTickRangeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::UpdateEffectiveTickRangeEvent`
}

export interface UpdateEffectiveTickRangeEventFields {
  poolId: ToField<ID>
  clmmPoolId: ToField<ID>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
  sqrtPrice: ToField<'u128'>
  start: ToField<Vector<ID>>
  end: ToField<Option<ID>>
  limit: ToField<'u64'>
}

export type UpdateEffectiveTickRangeEventReified = Reified<
  UpdateEffectiveTickRangeEvent,
  UpdateEffectiveTickRangeEventFields
>

export class UpdateEffectiveTickRangeEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::UpdateEffectiveTickRangeEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UpdateEffectiveTickRangeEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::UpdateEffectiveTickRangeEvent`
  readonly $typeArgs: []
  readonly $isPhantom = UpdateEffectiveTickRangeEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly start: ToField<Vector<ID>>
  readonly end: ToField<Option<ID>>
  readonly limit: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateEffectiveTickRangeEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateEffectiveTickRangeEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::UpdateEffectiveTickRangeEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.clmmPoolId = fields.clmmPoolId
    this.effectiveTickLower = fields.effectiveTickLower
    this.effectiveTickUpper = fields.effectiveTickUpper
    this.sqrtPrice = fields.sqrtPrice
    this.start = fields.start
    this.end = fields.end
    this.limit = fields.limit
  }

  static reified(): UpdateEffectiveTickRangeEventReified {
    const reifiedBcs = UpdateEffectiveTickRangeEvent.bcs
    return {
      typeName: UpdateEffectiveTickRangeEvent.$typeName,
      fullTypeName: composeSuiType(
        UpdateEffectiveTickRangeEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::UpdateEffectiveTickRangeEvent`,
      typeArgs: [] as [],
      isPhantom: UpdateEffectiveTickRangeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateEffectiveTickRangeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdateEffectiveTickRangeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        UpdateEffectiveTickRangeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateEffectiveTickRangeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateEffectiveTickRangeEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdateEffectiveTickRangeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdateEffectiveTickRangeEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        UpdateEffectiveTickRangeEvent.fetch(client, id),
      new: (fields: UpdateEffectiveTickRangeEventFields) => {
        return new UpdateEffectiveTickRangeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpdateEffectiveTickRangeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateEffectiveTickRangeEvent>> {
    return phantom(UpdateEffectiveTickRangeEvent.reified())
  }
  static get p() {
    return UpdateEffectiveTickRangeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateEffectiveTickRangeEvent', {
      pool_id: ID.bcs,
      clmm_pool_id: ID.bcs,
      effective_tick_lower: I32.bcs,
      effective_tick_upper: I32.bcs,
      sqrt_price: bcs.u128(),
      start: bcs.vector(ID.bcs),
      end: Option.bcs(ID.bcs),
      limit: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateEffectiveTickRangeEvent.instantiateBcs> | null =
    null

  static get bcs() {
    if (!UpdateEffectiveTickRangeEvent.cachedBcs) {
      UpdateEffectiveTickRangeEvent.cachedBcs = UpdateEffectiveTickRangeEvent.instantiateBcs()
    }
    return UpdateEffectiveTickRangeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateEffectiveTickRangeEvent {
    return UpdateEffectiveTickRangeEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      effectiveTickLower: decodeFromFields(I32.reified(), fields.effective_tick_lower),
      effectiveTickUpper: decodeFromFields(I32.reified(), fields.effective_tick_upper),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      start: decodeFromFields(reified.vector(ID.reified()), fields.start),
      end: decodeFromFields(Option.reified(ID.reified()), fields.end),
      limit: decodeFromFields('u64', fields.limit),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateEffectiveTickRangeEvent {
    if (!isUpdateEffectiveTickRangeEvent(item.type)) {
      throw new Error('not a UpdateEffectiveTickRangeEvent type')
    }

    return UpdateEffectiveTickRangeEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      effectiveTickLower: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_lower
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      start: decodeFromFieldsWithTypes(reified.vector(ID.reified()), item.fields.start),
      end: decodeFromFieldsWithTypes(Option.reified(ID.reified()), item.fields.end),
      limit: decodeFromFieldsWithTypes('u64', item.fields.limit),
    })
  }

  static fromBcs(data: Uint8Array): UpdateEffectiveTickRangeEvent {
    return UpdateEffectiveTickRangeEvent.fromFields(UpdateEffectiveTickRangeEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      clmmPoolId: this.clmmPoolId,
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      start: fieldToJSON<Vector<ID>>(`vector<${ID.$typeName}>`, this.start),
      end: fieldToJSON<Option<ID>>(`${Option.$typeName}<${ID.$typeName}>`, this.end),
      limit: this.limit.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateEffectiveTickRangeEvent {
    return UpdateEffectiveTickRangeEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      start: decodeFromJSONField(reified.vector(ID.reified()), field.start),
      end: decodeFromJSONField(Option.reified(ID.reified()), field.end),
      limit: decodeFromJSONField('u64', field.limit),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateEffectiveTickRangeEvent {
    if (json.$typeName !== UpdateEffectiveTickRangeEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UpdateEffectiveTickRangeEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpdateEffectiveTickRangeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateEffectiveTickRangeEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdateEffectiveTickRangeEvent object`
      )
    }
    return UpdateEffectiveTickRangeEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpdateEffectiveTickRangeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateEffectiveTickRangeEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateEffectiveTickRangeEvent object`)
      }

      return UpdateEffectiveTickRangeEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateEffectiveTickRangeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UpdateEffectiveTickRangeEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching UpdateEffectiveTickRangeEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isUpdateEffectiveTickRangeEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a UpdateEffectiveTickRangeEvent object`)
    }

    return UpdateEffectiveTickRangeEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AddRewardEvent =============================== */

export function isAddRewardEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::AddRewardEvent`
}

export interface AddRewardEventFields {
  poolId: ToField<ID>
  clmmPoolId: ToField<ID>
  rewarder: ToField<TypeName>
  allocatePoint: ToField<'u64'>
}

export type AddRewardEventReified = Reified<AddRewardEvent, AddRewardEventFields>

export class AddRewardEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::AddRewardEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddRewardEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::AddRewardEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddRewardEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly rewarder: ToField<TypeName>
  readonly allocatePoint: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddRewardEventFields) {
    this.$fullTypeName = composeSuiType(
      AddRewardEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::AddRewardEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.clmmPoolId = fields.clmmPoolId
    this.rewarder = fields.rewarder
    this.allocatePoint = fields.allocatePoint
  }

  static reified(): AddRewardEventReified {
    const reifiedBcs = AddRewardEvent.bcs
    return {
      typeName: AddRewardEvent.$typeName,
      fullTypeName: composeSuiType(
        AddRewardEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::AddRewardEvent`,
      typeArgs: [] as [],
      isPhantom: AddRewardEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddRewardEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddRewardEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddRewardEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddRewardEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddRewardEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddRewardEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddRewardEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddRewardEvent.fetch(client, id),
      new: (fields: AddRewardEventFields) => {
        return new AddRewardEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddRewardEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddRewardEvent>> {
    return phantom(AddRewardEvent.reified())
  }
  static get p() {
    return AddRewardEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddRewardEvent', {
      pool_id: ID.bcs,
      clmm_pool_id: ID.bcs,
      rewarder: TypeName.bcs,
      allocate_point: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddRewardEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!AddRewardEvent.cachedBcs) {
      AddRewardEvent.cachedBcs = AddRewardEvent.instantiateBcs()
    }
    return AddRewardEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddRewardEvent {
    return AddRewardEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      rewarder: decodeFromFields(TypeName.reified(), fields.rewarder),
      allocatePoint: decodeFromFields('u64', fields.allocate_point),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddRewardEvent {
    if (!isAddRewardEvent(item.type)) {
      throw new Error('not a AddRewardEvent type')
    }

    return AddRewardEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      rewarder: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.rewarder),
      allocatePoint: decodeFromFieldsWithTypes('u64', item.fields.allocate_point),
    })
  }

  static fromBcs(data: Uint8Array): AddRewardEvent {
    return AddRewardEvent.fromFields(AddRewardEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      clmmPoolId: this.clmmPoolId,
      rewarder: this.rewarder.toJSONField(),
      allocatePoint: this.allocatePoint.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddRewardEvent {
    return AddRewardEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      rewarder: decodeFromJSONField(TypeName.reified(), field.rewarder),
      allocatePoint: decodeFromJSONField('u64', field.allocatePoint),
    })
  }

  static fromJSON(json: Record<string, any>): AddRewardEvent {
    if (json.$typeName !== AddRewardEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AddRewardEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddRewardEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddRewardEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddRewardEvent object`)
    }
    return AddRewardEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddRewardEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddRewardEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddRewardEvent object`)
      }

      return AddRewardEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddRewardEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddRewardEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddRewardEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddRewardEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddRewardEvent object`)
    }

    return AddRewardEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== UpdatePoolAllocatePointEvent =============================== */

export function isUpdatePoolAllocatePointEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::UpdatePoolAllocatePointEvent`
}

export interface UpdatePoolAllocatePointEventFields {
  poolId: ToField<ID>
  clmmPoolId: ToField<ID>
  oldAllocatePoint: ToField<'u64'>
  newAllocatePoint: ToField<'u64'>
}

export type UpdatePoolAllocatePointEventReified = Reified<
  UpdatePoolAllocatePointEvent,
  UpdatePoolAllocatePointEventFields
>

export class UpdatePoolAllocatePointEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::UpdatePoolAllocatePointEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UpdatePoolAllocatePointEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::UpdatePoolAllocatePointEvent`
  readonly $typeArgs: []
  readonly $isPhantom = UpdatePoolAllocatePointEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly oldAllocatePoint: ToField<'u64'>
  readonly newAllocatePoint: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdatePoolAllocatePointEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdatePoolAllocatePointEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::UpdatePoolAllocatePointEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.clmmPoolId = fields.clmmPoolId
    this.oldAllocatePoint = fields.oldAllocatePoint
    this.newAllocatePoint = fields.newAllocatePoint
  }

  static reified(): UpdatePoolAllocatePointEventReified {
    const reifiedBcs = UpdatePoolAllocatePointEvent.bcs
    return {
      typeName: UpdatePoolAllocatePointEvent.$typeName,
      fullTypeName: composeSuiType(
        UpdatePoolAllocatePointEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::UpdatePoolAllocatePointEvent`,
      typeArgs: [] as [],
      isPhantom: UpdatePoolAllocatePointEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdatePoolAllocatePointEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdatePoolAllocatePointEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        UpdatePoolAllocatePointEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdatePoolAllocatePointEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdatePoolAllocatePointEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdatePoolAllocatePointEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdatePoolAllocatePointEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        UpdatePoolAllocatePointEvent.fetch(client, id),
      new: (fields: UpdatePoolAllocatePointEventFields) => {
        return new UpdatePoolAllocatePointEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpdatePoolAllocatePointEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdatePoolAllocatePointEvent>> {
    return phantom(UpdatePoolAllocatePointEvent.reified())
  }
  static get p() {
    return UpdatePoolAllocatePointEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdatePoolAllocatePointEvent', {
      pool_id: ID.bcs,
      clmm_pool_id: ID.bcs,
      old_allocate_point: bcs.u64(),
      new_allocate_point: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdatePoolAllocatePointEvent.instantiateBcs> | null =
    null

  static get bcs() {
    if (!UpdatePoolAllocatePointEvent.cachedBcs) {
      UpdatePoolAllocatePointEvent.cachedBcs = UpdatePoolAllocatePointEvent.instantiateBcs()
    }
    return UpdatePoolAllocatePointEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdatePoolAllocatePointEvent {
    return UpdatePoolAllocatePointEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      oldAllocatePoint: decodeFromFields('u64', fields.old_allocate_point),
      newAllocatePoint: decodeFromFields('u64', fields.new_allocate_point),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdatePoolAllocatePointEvent {
    if (!isUpdatePoolAllocatePointEvent(item.type)) {
      throw new Error('not a UpdatePoolAllocatePointEvent type')
    }

    return UpdatePoolAllocatePointEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      oldAllocatePoint: decodeFromFieldsWithTypes('u64', item.fields.old_allocate_point),
      newAllocatePoint: decodeFromFieldsWithTypes('u64', item.fields.new_allocate_point),
    })
  }

  static fromBcs(data: Uint8Array): UpdatePoolAllocatePointEvent {
    return UpdatePoolAllocatePointEvent.fromFields(UpdatePoolAllocatePointEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      clmmPoolId: this.clmmPoolId,
      oldAllocatePoint: this.oldAllocatePoint.toString(),
      newAllocatePoint: this.newAllocatePoint.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdatePoolAllocatePointEvent {
    return UpdatePoolAllocatePointEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      oldAllocatePoint: decodeFromJSONField('u64', field.oldAllocatePoint),
      newAllocatePoint: decodeFromJSONField('u64', field.newAllocatePoint),
    })
  }

  static fromJSON(json: Record<string, any>): UpdatePoolAllocatePointEvent {
    if (json.$typeName !== UpdatePoolAllocatePointEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UpdatePoolAllocatePointEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpdatePoolAllocatePointEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdatePoolAllocatePointEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdatePoolAllocatePointEvent object`
      )
    }
    return UpdatePoolAllocatePointEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpdatePoolAllocatePointEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdatePoolAllocatePointEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdatePoolAllocatePointEvent object`)
      }

      return UpdatePoolAllocatePointEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdatePoolAllocatePointEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UpdatePoolAllocatePointEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching UpdatePoolAllocatePointEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isUpdatePoolAllocatePointEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a UpdatePoolAllocatePointEvent object`)
    }

    return UpdatePoolAllocatePointEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== DepositEvent =============================== */

export function isDepositEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::DepositEvent`
}

export interface DepositEventFields {
  poolId: ToField<ID>
  wrappedPositionId: ToField<ID>
  clmmPoolId: ToField<ID>
  clmmPositionId: ToField<ID>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
  sqrtPrice: ToField<'u128'>
  liquidity: ToField<'u128'>
  share: ToField<'u128'>
  poolTotalShare: ToField<'u128'>
}

export type DepositEventReified = Reified<DepositEvent, DepositEventFields>

export class DepositEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::DepositEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DepositEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::DepositEvent`
  readonly $typeArgs: []
  readonly $isPhantom = DepositEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly liquidity: ToField<'u128'>
  readonly share: ToField<'u128'>
  readonly poolTotalShare: ToField<'u128'>

  private constructor(typeArgs: [], fields: DepositEventFields) {
    this.$fullTypeName = composeSuiType(
      DepositEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::DepositEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.wrappedPositionId = fields.wrappedPositionId
    this.clmmPoolId = fields.clmmPoolId
    this.clmmPositionId = fields.clmmPositionId
    this.effectiveTickLower = fields.effectiveTickLower
    this.effectiveTickUpper = fields.effectiveTickUpper
    this.sqrtPrice = fields.sqrtPrice
    this.liquidity = fields.liquidity
    this.share = fields.share
    this.poolTotalShare = fields.poolTotalShare
  }

  static reified(): DepositEventReified {
    const reifiedBcs = DepositEvent.bcs
    return {
      typeName: DepositEvent.$typeName,
      fullTypeName: composeSuiType(
        DepositEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::DepositEvent`,
      typeArgs: [] as [],
      isPhantom: DepositEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DepositEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DepositEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DepositEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DepositEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DepositEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DepositEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DepositEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DepositEvent.fetch(client, id),
      new: (fields: DepositEventFields) => {
        return new DepositEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DepositEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DepositEvent>> {
    return phantom(DepositEvent.reified())
  }
  static get p() {
    return DepositEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DepositEvent', {
      pool_id: ID.bcs,
      wrapped_position_id: ID.bcs,
      clmm_pool_id: ID.bcs,
      clmm_position_id: ID.bcs,
      effective_tick_lower: I32.bcs,
      effective_tick_upper: I32.bcs,
      sqrt_price: bcs.u128(),
      liquidity: bcs.u128(),
      share: bcs.u128(),
      pool_total_share: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof DepositEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!DepositEvent.cachedBcs) {
      DepositEvent.cachedBcs = DepositEvent.instantiateBcs()
    }
    return DepositEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DepositEvent {
    return DepositEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      wrappedPositionId: decodeFromFields(ID.reified(), fields.wrapped_position_id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      clmmPositionId: decodeFromFields(ID.reified(), fields.clmm_position_id),
      effectiveTickLower: decodeFromFields(I32.reified(), fields.effective_tick_lower),
      effectiveTickUpper: decodeFromFields(I32.reified(), fields.effective_tick_upper),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      liquidity: decodeFromFields('u128', fields.liquidity),
      share: decodeFromFields('u128', fields.share),
      poolTotalShare: decodeFromFields('u128', fields.pool_total_share),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DepositEvent {
    if (!isDepositEvent(item.type)) {
      throw new Error('not a DepositEvent type')
    }

    return DepositEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      wrappedPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.wrapped_position_id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      clmmPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_position_id),
      effectiveTickLower: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_lower
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      share: decodeFromFieldsWithTypes('u128', item.fields.share),
      poolTotalShare: decodeFromFieldsWithTypes('u128', item.fields.pool_total_share),
    })
  }

  static fromBcs(data: Uint8Array): DepositEvent {
    return DepositEvent.fromFields(DepositEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPoolId: this.clmmPoolId,
      clmmPositionId: this.clmmPositionId,
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      liquidity: this.liquidity.toString(),
      share: this.share.toString(),
      poolTotalShare: this.poolTotalShare.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DepositEvent {
    return DepositEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      wrappedPositionId: decodeFromJSONField(ID.reified(), field.wrappedPositionId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      clmmPositionId: decodeFromJSONField(ID.reified(), field.clmmPositionId),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      share: decodeFromJSONField('u128', field.share),
      poolTotalShare: decodeFromJSONField('u128', field.poolTotalShare),
    })
  }

  static fromJSON(json: Record<string, any>): DepositEvent {
    if (json.$typeName !== DepositEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DepositEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DepositEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDepositEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DepositEvent object`)
    }
    return DepositEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DepositEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDepositEvent(data.bcs.type)) {
        throw new Error(`object at is not a DepositEvent object`)
      }

      return DepositEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DepositEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DepositEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DepositEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDepositEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DepositEvent object`)
    }

    return DepositEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== WithdrawEvent =============================== */

export function isWithdrawEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::WithdrawEvent`
}

export interface WithdrawEventFields {
  poolId: ToField<ID>
  wrappedPositionId: ToField<ID>
  clmmPoolId: ToField<ID>
  clmmPositionId: ToField<ID>
  share: ToField<'u128'>
}

export type WithdrawEventReified = Reified<WithdrawEvent, WithdrawEventFields>

export class WithdrawEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::WithdrawEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = WithdrawEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::WithdrawEvent`
  readonly $typeArgs: []
  readonly $isPhantom = WithdrawEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly share: ToField<'u128'>

  private constructor(typeArgs: [], fields: WithdrawEventFields) {
    this.$fullTypeName = composeSuiType(
      WithdrawEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::WithdrawEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.wrappedPositionId = fields.wrappedPositionId
    this.clmmPoolId = fields.clmmPoolId
    this.clmmPositionId = fields.clmmPositionId
    this.share = fields.share
  }

  static reified(): WithdrawEventReified {
    const reifiedBcs = WithdrawEvent.bcs
    return {
      typeName: WithdrawEvent.$typeName,
      fullTypeName: composeSuiType(
        WithdrawEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::WithdrawEvent`,
      typeArgs: [] as [],
      isPhantom: WithdrawEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WithdrawEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WithdrawEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WithdrawEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WithdrawEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WithdrawEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => WithdrawEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WithdrawEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => WithdrawEvent.fetch(client, id),
      new: (fields: WithdrawEventFields) => {
        return new WithdrawEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WithdrawEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WithdrawEvent>> {
    return phantom(WithdrawEvent.reified())
  }
  static get p() {
    return WithdrawEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WithdrawEvent', {
      pool_id: ID.bcs,
      wrapped_position_id: ID.bcs,
      clmm_pool_id: ID.bcs,
      clmm_position_id: ID.bcs,
      share: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof WithdrawEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!WithdrawEvent.cachedBcs) {
      WithdrawEvent.cachedBcs = WithdrawEvent.instantiateBcs()
    }
    return WithdrawEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WithdrawEvent {
    return WithdrawEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      wrappedPositionId: decodeFromFields(ID.reified(), fields.wrapped_position_id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      clmmPositionId: decodeFromFields(ID.reified(), fields.clmm_position_id),
      share: decodeFromFields('u128', fields.share),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WithdrawEvent {
    if (!isWithdrawEvent(item.type)) {
      throw new Error('not a WithdrawEvent type')
    }

    return WithdrawEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      wrappedPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.wrapped_position_id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      clmmPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_position_id),
      share: decodeFromFieldsWithTypes('u128', item.fields.share),
    })
  }

  static fromBcs(data: Uint8Array): WithdrawEvent {
    return WithdrawEvent.fromFields(WithdrawEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPoolId: this.clmmPoolId,
      clmmPositionId: this.clmmPositionId,
      share: this.share.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WithdrawEvent {
    return WithdrawEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      wrappedPositionId: decodeFromJSONField(ID.reified(), field.wrappedPositionId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      clmmPositionId: decodeFromJSONField(ID.reified(), field.clmmPositionId),
      share: decodeFromJSONField('u128', field.share),
    })
  }

  static fromJSON(json: Record<string, any>): WithdrawEvent {
    if (json.$typeName !== WithdrawEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return WithdrawEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): WithdrawEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithdrawEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithdrawEvent object`)
    }
    return WithdrawEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): WithdrawEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWithdrawEvent(data.bcs.type)) {
        throw new Error(`object at is not a WithdrawEvent object`)
      }

      return WithdrawEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WithdrawEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<WithdrawEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WithdrawEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWithdrawEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WithdrawEvent object`)
    }

    return WithdrawEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== HarvestEvent =============================== */

export function isHarvestEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::HarvestEvent`
}

export interface HarvestEventFields {
  poolId: ToField<ID>
  wrappedPositionId: ToField<ID>
  clmmPoolId: ToField<ID>
  clmmPositionId: ToField<ID>
  rewarderType: ToField<TypeName>
  amount: ToField<'u64'>
}

export type HarvestEventReified = Reified<HarvestEvent, HarvestEventFields>

export class HarvestEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::HarvestEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = HarvestEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::HarvestEvent`
  readonly $typeArgs: []
  readonly $isPhantom = HarvestEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly rewarderType: ToField<TypeName>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: HarvestEventFields) {
    this.$fullTypeName = composeSuiType(
      HarvestEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::HarvestEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.wrappedPositionId = fields.wrappedPositionId
    this.clmmPoolId = fields.clmmPoolId
    this.clmmPositionId = fields.clmmPositionId
    this.rewarderType = fields.rewarderType
    this.amount = fields.amount
  }

  static reified(): HarvestEventReified {
    const reifiedBcs = HarvestEvent.bcs
    return {
      typeName: HarvestEvent.$typeName,
      fullTypeName: composeSuiType(
        HarvestEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::HarvestEvent`,
      typeArgs: [] as [],
      isPhantom: HarvestEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => HarvestEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => HarvestEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => HarvestEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => HarvestEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => HarvestEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => HarvestEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => HarvestEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => HarvestEvent.fetch(client, id),
      new: (fields: HarvestEventFields) => {
        return new HarvestEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return HarvestEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<HarvestEvent>> {
    return phantom(HarvestEvent.reified())
  }
  static get p() {
    return HarvestEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('HarvestEvent', {
      pool_id: ID.bcs,
      wrapped_position_id: ID.bcs,
      clmm_pool_id: ID.bcs,
      clmm_position_id: ID.bcs,
      rewarder_type: TypeName.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof HarvestEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!HarvestEvent.cachedBcs) {
      HarvestEvent.cachedBcs = HarvestEvent.instantiateBcs()
    }
    return HarvestEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): HarvestEvent {
    return HarvestEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      wrappedPositionId: decodeFromFields(ID.reified(), fields.wrapped_position_id),
      clmmPoolId: decodeFromFields(ID.reified(), fields.clmm_pool_id),
      clmmPositionId: decodeFromFields(ID.reified(), fields.clmm_position_id),
      rewarderType: decodeFromFields(TypeName.reified(), fields.rewarder_type),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): HarvestEvent {
    if (!isHarvestEvent(item.type)) {
      throw new Error('not a HarvestEvent type')
    }

    return HarvestEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      wrappedPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.wrapped_position_id),
      clmmPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_pool_id),
      clmmPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_position_id),
      rewarderType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.rewarder_type),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): HarvestEvent {
    return HarvestEvent.fromFields(HarvestEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPoolId: this.clmmPoolId,
      clmmPositionId: this.clmmPositionId,
      rewarderType: this.rewarderType.toJSONField(),
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): HarvestEvent {
    return HarvestEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      wrappedPositionId: decodeFromJSONField(ID.reified(), field.wrappedPositionId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      clmmPositionId: decodeFromJSONField(ID.reified(), field.clmmPositionId),
      rewarderType: decodeFromJSONField(TypeName.reified(), field.rewarderType),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): HarvestEvent {
    if (json.$typeName !== HarvestEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return HarvestEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): HarvestEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isHarvestEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a HarvestEvent object`)
    }
    return HarvestEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): HarvestEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isHarvestEvent(data.bcs.type)) {
        throw new Error(`object at is not a HarvestEvent object`)
      }

      return HarvestEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return HarvestEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<HarvestEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching HarvestEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isHarvestEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a HarvestEvent object`)
    }

    return HarvestEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AccumulatedPositionRewardsEvent =============================== */

export function isAccumulatedPositionRewardsEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::AccumulatedPositionRewardsEvent`
}

export interface AccumulatedPositionRewardsEventFields {
  poolId: ToField<ID>
  wrappedPositionId: ToField<ID>
  clmmPositionId: ToField<ID>
  rewards: ToField<VecMap<TypeName, 'u64'>>
}

export type AccumulatedPositionRewardsEventReified = Reified<
  AccumulatedPositionRewardsEvent,
  AccumulatedPositionRewardsEventFields
>

export class AccumulatedPositionRewardsEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::AccumulatedPositionRewardsEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AccumulatedPositionRewardsEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::AccumulatedPositionRewardsEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AccumulatedPositionRewardsEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly rewards: ToField<VecMap<TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: AccumulatedPositionRewardsEventFields) {
    this.$fullTypeName = composeSuiType(
      AccumulatedPositionRewardsEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::AccumulatedPositionRewardsEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.wrappedPositionId = fields.wrappedPositionId
    this.clmmPositionId = fields.clmmPositionId
    this.rewards = fields.rewards
  }

  static reified(): AccumulatedPositionRewardsEventReified {
    const reifiedBcs = AccumulatedPositionRewardsEvent.bcs
    return {
      typeName: AccumulatedPositionRewardsEvent.$typeName,
      fullTypeName: composeSuiType(
        AccumulatedPositionRewardsEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::AccumulatedPositionRewardsEvent`,
      typeArgs: [] as [],
      isPhantom: AccumulatedPositionRewardsEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        AccumulatedPositionRewardsEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AccumulatedPositionRewardsEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        AccumulatedPositionRewardsEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AccumulatedPositionRewardsEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AccumulatedPositionRewardsEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        AccumulatedPositionRewardsEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AccumulatedPositionRewardsEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        AccumulatedPositionRewardsEvent.fetch(client, id),
      new: (fields: AccumulatedPositionRewardsEventFields) => {
        return new AccumulatedPositionRewardsEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AccumulatedPositionRewardsEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AccumulatedPositionRewardsEvent>> {
    return phantom(AccumulatedPositionRewardsEvent.reified())
  }
  static get p() {
    return AccumulatedPositionRewardsEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AccumulatedPositionRewardsEvent', {
      pool_id: ID.bcs,
      wrapped_position_id: ID.bcs,
      clmm_position_id: ID.bcs,
      rewards: VecMap.bcs(TypeName.bcs, bcs.u64()),
    })
  }

  private static cachedBcs: ReturnType<
    typeof AccumulatedPositionRewardsEvent.instantiateBcs
  > | null = null

  static get bcs() {
    if (!AccumulatedPositionRewardsEvent.cachedBcs) {
      AccumulatedPositionRewardsEvent.cachedBcs = AccumulatedPositionRewardsEvent.instantiateBcs()
    }
    return AccumulatedPositionRewardsEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AccumulatedPositionRewardsEvent {
    return AccumulatedPositionRewardsEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      wrappedPositionId: decodeFromFields(ID.reified(), fields.wrapped_position_id),
      clmmPositionId: decodeFromFields(ID.reified(), fields.clmm_position_id),
      rewards: decodeFromFields(VecMap.reified(TypeName.reified(), 'u64'), fields.rewards),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AccumulatedPositionRewardsEvent {
    if (!isAccumulatedPositionRewardsEvent(item.type)) {
      throw new Error('not a AccumulatedPositionRewardsEvent type')
    }

    return AccumulatedPositionRewardsEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      wrappedPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.wrapped_position_id),
      clmmPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_position_id),
      rewards: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.rewards
      ),
    })
  }

  static fromBcs(data: Uint8Array): AccumulatedPositionRewardsEvent {
    return AccumulatedPositionRewardsEvent.fromFields(
      AccumulatedPositionRewardsEvent.bcs.parse(data)
    )
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPositionId: this.clmmPositionId,
      rewards: this.rewards.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AccumulatedPositionRewardsEvent {
    return AccumulatedPositionRewardsEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      wrappedPositionId: decodeFromJSONField(ID.reified(), field.wrappedPositionId),
      clmmPositionId: decodeFromJSONField(ID.reified(), field.clmmPositionId),
      rewards: decodeFromJSONField(VecMap.reified(TypeName.reified(), 'u64'), field.rewards),
    })
  }

  static fromJSON(json: Record<string, any>): AccumulatedPositionRewardsEvent {
    if (json.$typeName !== AccumulatedPositionRewardsEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AccumulatedPositionRewardsEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AccumulatedPositionRewardsEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAccumulatedPositionRewardsEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AccumulatedPositionRewardsEvent object`
      )
    }
    return AccumulatedPositionRewardsEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AccumulatedPositionRewardsEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAccumulatedPositionRewardsEvent(data.bcs.type)) {
        throw new Error(`object at is not a AccumulatedPositionRewardsEvent object`)
      }

      return AccumulatedPositionRewardsEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AccumulatedPositionRewardsEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AccumulatedPositionRewardsEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching AccumulatedPositionRewardsEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isAccumulatedPositionRewardsEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a AccumulatedPositionRewardsEvent object`)
    }

    return AccumulatedPositionRewardsEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AddLiquidityEvent =============================== */

export function isAddLiquidityEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::AddLiquidityEvent`
}

export interface AddLiquidityEventFields {
  poolId: ToField<ID>
  wrappedPositionId: ToField<ID>
  clmmPooId: ToField<ID>
  clmmPositionId: ToField<ID>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
  sqrtPrice: ToField<'u128'>
  oldLiquidity: ToField<'u128'>
  newLiquidity: ToField<'u128'>
  oldShare: ToField<'u128'>
  newShare: ToField<'u128'>
}

export type AddLiquidityEventReified = Reified<AddLiquidityEvent, AddLiquidityEventFields>

export class AddLiquidityEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::AddLiquidityEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddLiquidityEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::AddLiquidityEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddLiquidityEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPooId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly oldLiquidity: ToField<'u128'>
  readonly newLiquidity: ToField<'u128'>
  readonly oldShare: ToField<'u128'>
  readonly newShare: ToField<'u128'>

  private constructor(typeArgs: [], fields: AddLiquidityEventFields) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::AddLiquidityEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.wrappedPositionId = fields.wrappedPositionId
    this.clmmPooId = fields.clmmPooId
    this.clmmPositionId = fields.clmmPositionId
    this.effectiveTickLower = fields.effectiveTickLower
    this.effectiveTickUpper = fields.effectiveTickUpper
    this.sqrtPrice = fields.sqrtPrice
    this.oldLiquidity = fields.oldLiquidity
    this.newLiquidity = fields.newLiquidity
    this.oldShare = fields.oldShare
    this.newShare = fields.newShare
  }

  static reified(): AddLiquidityEventReified {
    const reifiedBcs = AddLiquidityEvent.bcs
    return {
      typeName: AddLiquidityEvent.$typeName,
      fullTypeName: composeSuiType(
        AddLiquidityEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::AddLiquidityEvent`,
      typeArgs: [] as [],
      isPhantom: AddLiquidityEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddLiquidityEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddLiquidityEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddLiquidityEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddLiquidityEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddLiquidityEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddLiquidityEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddLiquidityEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddLiquidityEvent.fetch(client, id),
      new: (fields: AddLiquidityEventFields) => {
        return new AddLiquidityEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddLiquidityEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityEvent>> {
    return phantom(AddLiquidityEvent.reified())
  }
  static get p() {
    return AddLiquidityEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddLiquidityEvent', {
      pool_id: ID.bcs,
      wrapped_position_id: ID.bcs,
      clmm_poo_id: ID.bcs,
      clmm_position_id: ID.bcs,
      effective_tick_lower: I32.bcs,
      effective_tick_upper: I32.bcs,
      sqrt_price: bcs.u128(),
      old_liquidity: bcs.u128(),
      new_liquidity: bcs.u128(),
      old_share: bcs.u128(),
      new_share: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddLiquidityEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!AddLiquidityEvent.cachedBcs) {
      AddLiquidityEvent.cachedBcs = AddLiquidityEvent.instantiateBcs()
    }
    return AddLiquidityEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddLiquidityEvent {
    return AddLiquidityEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      wrappedPositionId: decodeFromFields(ID.reified(), fields.wrapped_position_id),
      clmmPooId: decodeFromFields(ID.reified(), fields.clmm_poo_id),
      clmmPositionId: decodeFromFields(ID.reified(), fields.clmm_position_id),
      effectiveTickLower: decodeFromFields(I32.reified(), fields.effective_tick_lower),
      effectiveTickUpper: decodeFromFields(I32.reified(), fields.effective_tick_upper),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      oldLiquidity: decodeFromFields('u128', fields.old_liquidity),
      newLiquidity: decodeFromFields('u128', fields.new_liquidity),
      oldShare: decodeFromFields('u128', fields.old_share),
      newShare: decodeFromFields('u128', fields.new_share),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddLiquidityEvent {
    if (!isAddLiquidityEvent(item.type)) {
      throw new Error('not a AddLiquidityEvent type')
    }

    return AddLiquidityEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      wrappedPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.wrapped_position_id),
      clmmPooId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_poo_id),
      clmmPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_position_id),
      effectiveTickLower: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_lower
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      oldLiquidity: decodeFromFieldsWithTypes('u128', item.fields.old_liquidity),
      newLiquidity: decodeFromFieldsWithTypes('u128', item.fields.new_liquidity),
      oldShare: decodeFromFieldsWithTypes('u128', item.fields.old_share),
      newShare: decodeFromFieldsWithTypes('u128', item.fields.new_share),
    })
  }

  static fromBcs(data: Uint8Array): AddLiquidityEvent {
    return AddLiquidityEvent.fromFields(AddLiquidityEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPooId: this.clmmPooId,
      clmmPositionId: this.clmmPositionId,
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      oldLiquidity: this.oldLiquidity.toString(),
      newLiquidity: this.newLiquidity.toString(),
      oldShare: this.oldShare.toString(),
      newShare: this.newShare.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddLiquidityEvent {
    return AddLiquidityEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      wrappedPositionId: decodeFromJSONField(ID.reified(), field.wrappedPositionId),
      clmmPooId: decodeFromJSONField(ID.reified(), field.clmmPooId),
      clmmPositionId: decodeFromJSONField(ID.reified(), field.clmmPositionId),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      oldLiquidity: decodeFromJSONField('u128', field.oldLiquidity),
      newLiquidity: decodeFromJSONField('u128', field.newLiquidity),
      oldShare: decodeFromJSONField('u128', field.oldShare),
      newShare: decodeFromJSONField('u128', field.newShare),
    })
  }

  static fromJSON(json: Record<string, any>): AddLiquidityEvent {
    if (json.$typeName !== AddLiquidityEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AddLiquidityEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddLiquidityEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddLiquidityEvent object`)
    }
    return AddLiquidityEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddLiquidityEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityEvent object`)
      }

      return AddLiquidityEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddLiquidityEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddLiquidityEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddLiquidityEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityEvent object`)
    }

    return AddLiquidityEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AddLiquidityFixCoinEvent =============================== */

export function isAddLiquidityFixCoinEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::AddLiquidityFixCoinEvent`
}

export interface AddLiquidityFixCoinEventFields {
  poolId: ToField<ID>
  wrappedPositionId: ToField<ID>
  clmmPooId: ToField<ID>
  clmmPositionId: ToField<ID>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
  sqrtPrice: ToField<'u128'>
  oldLiquidity: ToField<'u128'>
  newLiquidity: ToField<'u128'>
  oldShare: ToField<'u128'>
  newShare: ToField<'u128'>
}

export type AddLiquidityFixCoinEventReified = Reified<
  AddLiquidityFixCoinEvent,
  AddLiquidityFixCoinEventFields
>

export class AddLiquidityFixCoinEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::AddLiquidityFixCoinEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddLiquidityFixCoinEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::AddLiquidityFixCoinEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddLiquidityFixCoinEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPooId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly oldLiquidity: ToField<'u128'>
  readonly newLiquidity: ToField<'u128'>
  readonly oldShare: ToField<'u128'>
  readonly newShare: ToField<'u128'>

  private constructor(typeArgs: [], fields: AddLiquidityFixCoinEventFields) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityFixCoinEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::AddLiquidityFixCoinEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.wrappedPositionId = fields.wrappedPositionId
    this.clmmPooId = fields.clmmPooId
    this.clmmPositionId = fields.clmmPositionId
    this.effectiveTickLower = fields.effectiveTickLower
    this.effectiveTickUpper = fields.effectiveTickUpper
    this.sqrtPrice = fields.sqrtPrice
    this.oldLiquidity = fields.oldLiquidity
    this.newLiquidity = fields.newLiquidity
    this.oldShare = fields.oldShare
    this.newShare = fields.newShare
  }

  static reified(): AddLiquidityFixCoinEventReified {
    const reifiedBcs = AddLiquidityFixCoinEvent.bcs
    return {
      typeName: AddLiquidityFixCoinEvent.$typeName,
      fullTypeName: composeSuiType(
        AddLiquidityFixCoinEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::AddLiquidityFixCoinEvent`,
      typeArgs: [] as [],
      isPhantom: AddLiquidityFixCoinEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddLiquidityFixCoinEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AddLiquidityFixCoinEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddLiquidityFixCoinEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddLiquidityFixCoinEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddLiquidityFixCoinEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        AddLiquidityFixCoinEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AddLiquidityFixCoinEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddLiquidityFixCoinEvent.fetch(client, id),
      new: (fields: AddLiquidityFixCoinEventFields) => {
        return new AddLiquidityFixCoinEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddLiquidityFixCoinEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityFixCoinEvent>> {
    return phantom(AddLiquidityFixCoinEvent.reified())
  }
  static get p() {
    return AddLiquidityFixCoinEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddLiquidityFixCoinEvent', {
      pool_id: ID.bcs,
      wrapped_position_id: ID.bcs,
      clmm_poo_id: ID.bcs,
      clmm_position_id: ID.bcs,
      effective_tick_lower: I32.bcs,
      effective_tick_upper: I32.bcs,
      sqrt_price: bcs.u128(),
      old_liquidity: bcs.u128(),
      new_liquidity: bcs.u128(),
      old_share: bcs.u128(),
      new_share: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddLiquidityFixCoinEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!AddLiquidityFixCoinEvent.cachedBcs) {
      AddLiquidityFixCoinEvent.cachedBcs = AddLiquidityFixCoinEvent.instantiateBcs()
    }
    return AddLiquidityFixCoinEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddLiquidityFixCoinEvent {
    return AddLiquidityFixCoinEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      wrappedPositionId: decodeFromFields(ID.reified(), fields.wrapped_position_id),
      clmmPooId: decodeFromFields(ID.reified(), fields.clmm_poo_id),
      clmmPositionId: decodeFromFields(ID.reified(), fields.clmm_position_id),
      effectiveTickLower: decodeFromFields(I32.reified(), fields.effective_tick_lower),
      effectiveTickUpper: decodeFromFields(I32.reified(), fields.effective_tick_upper),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      oldLiquidity: decodeFromFields('u128', fields.old_liquidity),
      newLiquidity: decodeFromFields('u128', fields.new_liquidity),
      oldShare: decodeFromFields('u128', fields.old_share),
      newShare: decodeFromFields('u128', fields.new_share),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddLiquidityFixCoinEvent {
    if (!isAddLiquidityFixCoinEvent(item.type)) {
      throw new Error('not a AddLiquidityFixCoinEvent type')
    }

    return AddLiquidityFixCoinEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      wrappedPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.wrapped_position_id),
      clmmPooId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_poo_id),
      clmmPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_position_id),
      effectiveTickLower: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_lower
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      oldLiquidity: decodeFromFieldsWithTypes('u128', item.fields.old_liquidity),
      newLiquidity: decodeFromFieldsWithTypes('u128', item.fields.new_liquidity),
      oldShare: decodeFromFieldsWithTypes('u128', item.fields.old_share),
      newShare: decodeFromFieldsWithTypes('u128', item.fields.new_share),
    })
  }

  static fromBcs(data: Uint8Array): AddLiquidityFixCoinEvent {
    return AddLiquidityFixCoinEvent.fromFields(AddLiquidityFixCoinEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPooId: this.clmmPooId,
      clmmPositionId: this.clmmPositionId,
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      oldLiquidity: this.oldLiquidity.toString(),
      newLiquidity: this.newLiquidity.toString(),
      oldShare: this.oldShare.toString(),
      newShare: this.newShare.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddLiquidityFixCoinEvent {
    return AddLiquidityFixCoinEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      wrappedPositionId: decodeFromJSONField(ID.reified(), field.wrappedPositionId),
      clmmPooId: decodeFromJSONField(ID.reified(), field.clmmPooId),
      clmmPositionId: decodeFromJSONField(ID.reified(), field.clmmPositionId),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      oldLiquidity: decodeFromJSONField('u128', field.oldLiquidity),
      newLiquidity: decodeFromJSONField('u128', field.newLiquidity),
      oldShare: decodeFromJSONField('u128', field.oldShare),
      newShare: decodeFromJSONField('u128', field.newShare),
    })
  }

  static fromJSON(json: Record<string, any>): AddLiquidityFixCoinEvent {
    if (json.$typeName !== AddLiquidityFixCoinEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AddLiquidityFixCoinEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddLiquidityFixCoinEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityFixCoinEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AddLiquidityFixCoinEvent object`
      )
    }
    return AddLiquidityFixCoinEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddLiquidityFixCoinEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityFixCoinEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityFixCoinEvent object`)
      }

      return AddLiquidityFixCoinEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityFixCoinEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddLiquidityFixCoinEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching AddLiquidityFixCoinEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isAddLiquidityFixCoinEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a AddLiquidityFixCoinEvent object`)
    }

    return AddLiquidityFixCoinEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RemoveLiquidityEvent =============================== */

export function isRemoveLiquidityEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::RemoveLiquidityEvent`
}

export interface RemoveLiquidityEventFields {
  poolId: ToField<ID>
  wrappedPositionId: ToField<ID>
  clmmPooId: ToField<ID>
  clmmPositionId: ToField<ID>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
  sqrtPrice: ToField<'u128'>
  oldLiquidity: ToField<'u128'>
  newLiquidity: ToField<'u128'>
  oldShare: ToField<'u128'>
  newShare: ToField<'u128'>
}

export type RemoveLiquidityEventReified = Reified<RemoveLiquidityEvent, RemoveLiquidityEventFields>

export class RemoveLiquidityEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::RemoveLiquidityEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RemoveLiquidityEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::RemoveLiquidityEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RemoveLiquidityEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPooId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>
  readonly sqrtPrice: ToField<'u128'>
  readonly oldLiquidity: ToField<'u128'>
  readonly newLiquidity: ToField<'u128'>
  readonly oldShare: ToField<'u128'>
  readonly newShare: ToField<'u128'>

  private constructor(typeArgs: [], fields: RemoveLiquidityEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveLiquidityEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::RemoveLiquidityEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.wrappedPositionId = fields.wrappedPositionId
    this.clmmPooId = fields.clmmPooId
    this.clmmPositionId = fields.clmmPositionId
    this.effectiveTickLower = fields.effectiveTickLower
    this.effectiveTickUpper = fields.effectiveTickUpper
    this.sqrtPrice = fields.sqrtPrice
    this.oldLiquidity = fields.oldLiquidity
    this.newLiquidity = fields.newLiquidity
    this.oldShare = fields.oldShare
    this.newShare = fields.newShare
  }

  static reified(): RemoveLiquidityEventReified {
    const reifiedBcs = RemoveLiquidityEvent.bcs
    return {
      typeName: RemoveLiquidityEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveLiquidityEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::RemoveLiquidityEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveLiquidityEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveLiquidityEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveLiquidityEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveLiquidityEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveLiquidityEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveLiquidityEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveLiquidityEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveLiquidityEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RemoveLiquidityEvent.fetch(client, id),
      new: (fields: RemoveLiquidityEventFields) => {
        return new RemoveLiquidityEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RemoveLiquidityEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveLiquidityEvent>> {
    return phantom(RemoveLiquidityEvent.reified())
  }
  static get p() {
    return RemoveLiquidityEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveLiquidityEvent', {
      pool_id: ID.bcs,
      wrapped_position_id: ID.bcs,
      clmm_poo_id: ID.bcs,
      clmm_position_id: ID.bcs,
      effective_tick_lower: I32.bcs,
      effective_tick_upper: I32.bcs,
      sqrt_price: bcs.u128(),
      old_liquidity: bcs.u128(),
      new_liquidity: bcs.u128(),
      old_share: bcs.u128(),
      new_share: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveLiquidityEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!RemoveLiquidityEvent.cachedBcs) {
      RemoveLiquidityEvent.cachedBcs = RemoveLiquidityEvent.instantiateBcs()
    }
    return RemoveLiquidityEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveLiquidityEvent {
    return RemoveLiquidityEvent.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      wrappedPositionId: decodeFromFields(ID.reified(), fields.wrapped_position_id),
      clmmPooId: decodeFromFields(ID.reified(), fields.clmm_poo_id),
      clmmPositionId: decodeFromFields(ID.reified(), fields.clmm_position_id),
      effectiveTickLower: decodeFromFields(I32.reified(), fields.effective_tick_lower),
      effectiveTickUpper: decodeFromFields(I32.reified(), fields.effective_tick_upper),
      sqrtPrice: decodeFromFields('u128', fields.sqrt_price),
      oldLiquidity: decodeFromFields('u128', fields.old_liquidity),
      newLiquidity: decodeFromFields('u128', fields.new_liquidity),
      oldShare: decodeFromFields('u128', fields.old_share),
      newShare: decodeFromFields('u128', fields.new_share),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveLiquidityEvent {
    if (!isRemoveLiquidityEvent(item.type)) {
      throw new Error('not a RemoveLiquidityEvent type')
    }

    return RemoveLiquidityEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      wrappedPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.wrapped_position_id),
      clmmPooId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_poo_id),
      clmmPositionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.clmm_position_id),
      effectiveTickLower: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_lower
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      oldLiquidity: decodeFromFieldsWithTypes('u128', item.fields.old_liquidity),
      newLiquidity: decodeFromFieldsWithTypes('u128', item.fields.new_liquidity),
      oldShare: decodeFromFieldsWithTypes('u128', item.fields.old_share),
      newShare: decodeFromFieldsWithTypes('u128', item.fields.new_share),
    })
  }

  static fromBcs(data: Uint8Array): RemoveLiquidityEvent {
    return RemoveLiquidityEvent.fromFields(RemoveLiquidityEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPooId: this.clmmPooId,
      clmmPositionId: this.clmmPositionId,
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
      sqrtPrice: this.sqrtPrice.toString(),
      oldLiquidity: this.oldLiquidity.toString(),
      newLiquidity: this.newLiquidity.toString(),
      oldShare: this.oldShare.toString(),
      newShare: this.newShare.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveLiquidityEvent {
    return RemoveLiquidityEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      wrappedPositionId: decodeFromJSONField(ID.reified(), field.wrappedPositionId),
      clmmPooId: decodeFromJSONField(ID.reified(), field.clmmPooId),
      clmmPositionId: decodeFromJSONField(ID.reified(), field.clmmPositionId),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      oldLiquidity: decodeFromJSONField('u128', field.oldLiquidity),
      newLiquidity: decodeFromJSONField('u128', field.newLiquidity),
      oldShare: decodeFromJSONField('u128', field.oldShare),
      newShare: decodeFromJSONField('u128', field.newShare),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveLiquidityEvent {
    if (json.$typeName !== RemoveLiquidityEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RemoveLiquidityEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveLiquidityEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveLiquidityEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveLiquidityEvent object`
      )
    }
    return RemoveLiquidityEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveLiquidityEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveLiquidityEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveLiquidityEvent object`)
      }

      return RemoveLiquidityEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveLiquidityEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RemoveLiquidityEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RemoveLiquidityEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRemoveLiquidityEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RemoveLiquidityEvent object`)
    }

    return RemoveLiquidityEvent.fromSuiObjectData(res.data)
  }
}
