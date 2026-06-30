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
  ToTypeStr as ToPhantom,
  vector,
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { Position } from '../../../cetus-clmm/position/structs'
import { I32 } from '../../../integer-mate/i32/structs'
import { Option } from '../../../std/option/structs'
import { String } from '../../../std/string/structs'
import { TypeName } from '../../../std/type-name/structs'
import { LinkedTable } from '../../../sui/linked-table/structs'
import { ID, UID } from '../../../sui/object/structs'
import { VecMap } from '../../../sui/vec-map/structs'

/* ============================== POOL =============================== */

export function isPOOL(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'pool::POOL')}::pool::POOL`
}

export interface POOLFields {
  dummyField: ToField<'bool'>
}

export type POOLReified = Reified<POOL, POOLFields>

export type POOLJSONField = {
  dummyField: boolean
}

export type POOLJSON = {
  $typeName: typeof POOL.$typeName
  $typeArgs: []
} & POOLJSONField

export class POOL implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::POOL` {
    return `${getTypeOrigin('cetus-farming', 'pool::POOL')}::pool::POOL` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof POOL.$typeName = POOL.$typeName
  readonly $fullTypeName: `${string}::pool::POOL`
  readonly $typeArgs: []
  readonly $isPhantom: typeof POOL.$isPhantom = POOL.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: POOLFields) {
    this.$fullTypeName = composeSuiType(
      POOL.$typeName,
      ...typeArgs,
    ) as `${string}::pool::POOL`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): POOLReified {
    const reifiedBcs = POOL.bcs
    return {
      get typeName() {
        return POOL.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          POOL.$typeName,
          ...[],
        ) as `${string}::pool::POOL`
      },
      typeArgs: [] as [],
      isPhantom: POOL.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => POOL.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => POOL.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => POOL.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => POOL.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => POOL.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => POOL.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => POOL.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => POOL.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => POOL.fetch(client, id),
      new: (fields: POOLFields) => {
        return new POOL([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): POOLReified {
    return POOL.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<POOL>> {
    return phantom(POOL.reified())
  }

  static get p(): PhantomReified<ToTypeStr<POOL>> {
    return POOL.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('POOL', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof POOL.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof POOL.instantiateBcs> {
    if (!POOL.cachedBcs) {
      POOL.cachedBcs = POOL.instantiateBcs()
    }
    return POOL.cachedBcs
  }

  static fromFields(fields: Record<string, any>): POOL {
    return POOL.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): POOLJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): POOLJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): POOL {
    return POOL.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): POOL {
    if (json.$typeName !== POOL.$typeName) {
      throw new Error(
        `not a POOL json object: expected '${POOL.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return POOL.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): POOL {
    if (!isPOOL(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a POOL object`)
    }
    return POOL.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link POOL.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): POOL {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPOOL(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a POOL object`)
    }
    return POOL.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link POOL.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): POOL {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPOOL(data.bcs.type)) {
        throw new Error(`object at is not a POOL object`)
      }

      return POOL.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return POOL.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<POOL> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPOOL(object.type)) {
      throw new Error(`object at id ${id} is not a POOL object`)
    }
    return POOL.fromBcs(object.content)
  }
}

/* ============================== WrappedPositionNFT =============================== */

export function isWrappedPositionNFT(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'pool::WrappedPositionNFT')}::pool::WrappedPositionNFT`
}

export interface WrappedPositionNFTFields {
  id: ToField<UID>
  poolId: ToField<ID>
  clmmPostion: ToField<Position>
  url: ToField<String>
}

export type WrappedPositionNFTReified = Reified<WrappedPositionNFT, WrappedPositionNFTFields>

export type WrappedPositionNFTJSONField = {
  id: string
  poolId: string
  clmmPostion: ToJSON<Position>
  url: string
}

export type WrappedPositionNFTJSON = {
  $typeName: typeof WrappedPositionNFT.$typeName
  $typeArgs: []
} & WrappedPositionNFTJSONField

export class WrappedPositionNFT implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::WrappedPositionNFT` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::WrappedPositionNFT')
    }::pool::WrappedPositionNFT` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof WrappedPositionNFT.$typeName = WrappedPositionNFT.$typeName
  readonly $fullTypeName: `${string}::pool::WrappedPositionNFT`
  readonly $typeArgs: []
  readonly $isPhantom: typeof WrappedPositionNFT.$isPhantom = WrappedPositionNFT.$isPhantom

  readonly id: ToField<UID>
  readonly poolId: ToField<ID>
  readonly clmmPostion: ToField<Position>
  readonly url: ToField<String>

  private constructor(typeArgs: [], fields: WrappedPositionNFTFields) {
    this.$fullTypeName = composeSuiType(
      WrappedPositionNFT.$typeName,
      ...typeArgs,
    ) as `${string}::pool::WrappedPositionNFT`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.poolId = fields.poolId
    this.clmmPostion = fields.clmmPostion
    this.url = fields.url
  }

  static reified(): WrappedPositionNFTReified {
    const reifiedBcs = WrappedPositionNFT.bcs
    return {
      get typeName() {
        return WrappedPositionNFT.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WrappedPositionNFT.$typeName,
          ...[],
        ) as `${string}::pool::WrappedPositionNFT`
      },
      typeArgs: [] as [],
      isPhantom: WrappedPositionNFT.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WrappedPositionNFT.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WrappedPositionNFT.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WrappedPositionNFT.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WrappedPositionNFT.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WrappedPositionNFT.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WrappedPositionNFT.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => WrappedPositionNFT.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WrappedPositionNFT.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => WrappedPositionNFT.fetch(client, id),
      new: (fields: WrappedPositionNFTFields) => {
        return new WrappedPositionNFT([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): WrappedPositionNFTReified {
    return WrappedPositionNFT.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WrappedPositionNFT>> {
    return phantom(WrappedPositionNFT.reified())
  }

  static get p(): PhantomReified<ToTypeStr<WrappedPositionNFT>> {
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

  static get bcs(): ReturnType<typeof WrappedPositionNFT.instantiateBcs> {
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

  toJSONField(): WrappedPositionNFTJSONField {
    return {
      id: this.id,
      poolId: this.poolId,
      clmmPostion: this.clmmPostion.toJSONField(),
      url: this.url,
    }
  }

  toJSON(): WrappedPositionNFTJSON {
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
      throw new Error(
        `not a WrappedPositionNFT json object: expected '${WrappedPositionNFT.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return WrappedPositionNFT.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WrappedPositionNFT {
    if (!isWrappedPositionNFT(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WrappedPositionNFT object`)
    }
    return WrappedPositionNFT.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedPositionNFT.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WrappedPositionNFT {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedPositionNFT(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WrappedPositionNFT object`)
    }
    return WrappedPositionNFT.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedPositionNFT.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WrappedPositionNFT {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWrappedPositionNFT(data.bcs.type)) {
        throw new Error(`object at is not a WrappedPositionNFT object`)
      }

      return WrappedPositionNFT.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WrappedPositionNFT.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WrappedPositionNFT> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWrappedPositionNFT(object.type)) {
      throw new Error(`object at id ${id} is not a WrappedPositionNFT object`)
    }
    return WrappedPositionNFT.fromBcs(object.content)
  }
}

/* ============================== PositionRewardInfo =============================== */

export function isPositionRewardInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'pool::PositionRewardInfo')}::pool::PositionRewardInfo`
}

export interface PositionRewardInfoFields {
  reward: ToField<'u128'>
  rewardDebt: ToField<'u128'>
  rewardHarvested: ToField<'u64'>
}

export type PositionRewardInfoReified = Reified<PositionRewardInfo, PositionRewardInfoFields>

export type PositionRewardInfoJSONField = {
  reward: string
  rewardDebt: string
  rewardHarvested: string
}

export type PositionRewardInfoJSON = {
  $typeName: typeof PositionRewardInfo.$typeName
  $typeArgs: []
} & PositionRewardInfoJSONField

export class PositionRewardInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::PositionRewardInfo` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::PositionRewardInfo')
    }::pool::PositionRewardInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionRewardInfo.$typeName = PositionRewardInfo.$typeName
  readonly $fullTypeName: `${string}::pool::PositionRewardInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionRewardInfo.$isPhantom = PositionRewardInfo.$isPhantom

  readonly reward: ToField<'u128'>
  readonly rewardDebt: ToField<'u128'>
  readonly rewardHarvested: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionRewardInfoFields) {
    this.$fullTypeName = composeSuiType(
      PositionRewardInfo.$typeName,
      ...typeArgs,
    ) as `${string}::pool::PositionRewardInfo`
    this.$typeArgs = typeArgs

    this.reward = fields.reward
    this.rewardDebt = fields.rewardDebt
    this.rewardHarvested = fields.rewardHarvested
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
        ) as `${string}::pool::PositionRewardInfo`
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
      reward: bcs.u128(),
      reward_debt: bcs.u128(),
      reward_harvested: bcs.u64(),
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

  toJSONField(): PositionRewardInfoJSONField {
    return {
      reward: this.reward.toString(),
      rewardDebt: this.rewardDebt.toString(),
      rewardHarvested: this.rewardHarvested.toString(),
    }
  }

  toJSON(): PositionRewardInfoJSON {
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

/* ============================== WrappedPositionInfo =============================== */

export function isWrappedPositionInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'pool::WrappedPositionInfo')}::pool::WrappedPositionInfo`
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

export type WrappedPositionInfoJSONField = {
  id: string
  poolId: string
  clmmPoolId: string
  clmmPositionId: string
  tickLower: ToJSON<I32>
  tickUpper: ToJSON<I32>
  liquidity: string
  effectiveTickLower: ToJSON<I32>
  effectiveTickUpper: ToJSON<I32>
  sqrtPrice: string
  share: string
  rewards: ToJSON<VecMap<TypeName, PositionRewardInfo>>
}

export type WrappedPositionInfoJSON = {
  $typeName: typeof WrappedPositionInfo.$typeName
  $typeArgs: []
} & WrappedPositionInfoJSONField

export class WrappedPositionInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::WrappedPositionInfo` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::WrappedPositionInfo')
    }::pool::WrappedPositionInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof WrappedPositionInfo.$typeName = WrappedPositionInfo.$typeName
  readonly $fullTypeName: `${string}::pool::WrappedPositionInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof WrappedPositionInfo.$isPhantom = WrappedPositionInfo.$isPhantom

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
      ...typeArgs,
    ) as `${string}::pool::WrappedPositionInfo`
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
      get typeName() {
        return WrappedPositionInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WrappedPositionInfo.$typeName,
          ...[],
        ) as `${string}::pool::WrappedPositionInfo`
      },
      typeArgs: [] as [],
      isPhantom: WrappedPositionInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WrappedPositionInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WrappedPositionInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WrappedPositionInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WrappedPositionInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WrappedPositionInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WrappedPositionInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => WrappedPositionInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WrappedPositionInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => WrappedPositionInfo.fetch(client, id),
      new: (fields: WrappedPositionInfoFields) => {
        return new WrappedPositionInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): WrappedPositionInfoReified {
    return WrappedPositionInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WrappedPositionInfo>> {
    return phantom(WrappedPositionInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<WrappedPositionInfo>> {
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

  static get bcs(): ReturnType<typeof WrappedPositionInfo.instantiateBcs> {
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
        fields.rewards,
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
        item.fields.effective_tick_lower,
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper,
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      share: decodeFromFieldsWithTypes('u128', item.fields.share),
      rewards: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), PositionRewardInfo.reified()),
        item.fields.rewards,
      ),
    })
  }

  static fromBcs(data: Uint8Array): WrappedPositionInfo {
    return WrappedPositionInfo.fromFields(WrappedPositionInfo.bcs.parse(data))
  }

  toJSONField(): WrappedPositionInfoJSONField {
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

  toJSON(): WrappedPositionInfoJSON {
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
        field.rewards,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): WrappedPositionInfo {
    if (json.$typeName !== WrappedPositionInfo.$typeName) {
      throw new Error(
        `not a WrappedPositionInfo json object: expected '${WrappedPositionInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return WrappedPositionInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WrappedPositionInfo {
    if (!isWrappedPositionInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WrappedPositionInfo object`)
    }
    return WrappedPositionInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedPositionInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WrappedPositionInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedPositionInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WrappedPositionInfo object`)
    }
    return WrappedPositionInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedPositionInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WrappedPositionInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWrappedPositionInfo(data.bcs.type)) {
        throw new Error(`object at is not a WrappedPositionInfo object`)
      }

      return WrappedPositionInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WrappedPositionInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WrappedPositionInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWrappedPositionInfo(object.type)) {
      throw new Error(`object at id ${id} is not a WrappedPositionInfo object`)
    }
    return WrappedPositionInfo.fromBcs(object.content)
  }
}

/* ============================== Pool =============================== */

export function isPool(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'pool::Pool')}::pool::Pool`
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

export type PoolJSONField = {
  id: string
  clmmPoolId: string
  effectiveTickLower: ToJSON<I32>
  effectiveTickUpper: ToJSON<I32>
  sqrtPrice: string
  totalShare: string
  rewarders: string[]
  positions: ToJSON<LinkedTable<ID, ToPhantom<WrappedPositionInfo>>>
}

export type PoolJSON = {
  $typeName: typeof Pool.$typeName
  $typeArgs: []
} & PoolJSONField

export class Pool implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::Pool` {
    return `${getTypeOrigin('cetus-farming', 'pool::Pool')}::pool::Pool` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Pool.$typeName = Pool.$typeName
  readonly $fullTypeName: `${string}::pool::Pool`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Pool.$isPhantom = Pool.$isPhantom

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
      ...typeArgs,
    ) as `${string}::pool::Pool`
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
      get typeName() {
        return Pool.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Pool.$typeName,
          ...[],
        ) as `${string}::pool::Pool`
      },
      typeArgs: [] as [],
      isPhantom: Pool.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Pool.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Pool.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Pool.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Pool.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Pool.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Pool.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Pool.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Pool.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Pool.fetch(client, id),
      new: (fields: PoolFields) => {
        return new Pool([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PoolReified {
    return Pool.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Pool>> {
    return phantom(Pool.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Pool>> {
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

  static get bcs(): ReturnType<typeof Pool.instantiateBcs> {
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
      rewarders: decodeFromFields(vector(TypeName.reified()), fields.rewarders),
      positions: decodeFromFields(
        LinkedTable.reified(ID.reified(), phantom(WrappedPositionInfo.reified())),
        fields.positions,
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
        item.fields.effective_tick_lower,
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper,
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      totalShare: decodeFromFieldsWithTypes('u128', item.fields.total_share),
      rewarders: decodeFromFieldsWithTypes(vector(TypeName.reified()), item.fields.rewarders),
      positions: decodeFromFieldsWithTypes(
        LinkedTable.reified(ID.reified(), phantom(WrappedPositionInfo.reified())),
        item.fields.positions,
      ),
    })
  }

  static fromBcs(data: Uint8Array): Pool {
    return Pool.fromFields(Pool.bcs.parse(data))
  }

  toJSONField(): PoolJSONField {
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

  toJSON(): PoolJSON {
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
      rewarders: decodeFromJSONField(vector(TypeName.reified()), field.rewarders),
      positions: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), phantom(WrappedPositionInfo.reified())),
        field.positions,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Pool {
    if (json.$typeName !== Pool.$typeName) {
      throw new Error(
        `not a Pool json object: expected '${Pool.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Pool.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Pool {
    if (!isPool(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Pool object`)
    }
    return Pool.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Pool.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Pool {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Pool object`)
    }
    return Pool.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Pool.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Pool {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPool(data.bcs.type)) {
        throw new Error(`object at is not a Pool object`)
      }

      return Pool.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Pool.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Pool> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPool(object.type)) {
      throw new Error(`object at id ${id} is not a Pool object`)
    }
    return Pool.fromBcs(object.content)
  }
}

/* ============================== CreatePoolEvent =============================== */

export function isCreatePoolEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'pool::CreatePoolEvent')}::pool::CreatePoolEvent`
}

export interface CreatePoolEventFields {
  poolId: ToField<ID>
  clmmPoolId: ToField<ID>
  sqrtPrice: ToField<'u128'>
  effectiveTickLower: ToField<I32>
  effectiveTickUpper: ToField<I32>
}

export type CreatePoolEventReified = Reified<CreatePoolEvent, CreatePoolEventFields>

export type CreatePoolEventJSONField = {
  poolId: string
  clmmPoolId: string
  sqrtPrice: string
  effectiveTickLower: ToJSON<I32>
  effectiveTickUpper: ToJSON<I32>
}

export type CreatePoolEventJSON = {
  $typeName: typeof CreatePoolEvent.$typeName
  $typeArgs: []
} & CreatePoolEventJSONField

export class CreatePoolEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::CreatePoolEvent` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::CreatePoolEvent')
    }::pool::CreatePoolEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CreatePoolEvent.$typeName = CreatePoolEvent.$typeName
  readonly $fullTypeName: `${string}::pool::CreatePoolEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CreatePoolEvent.$isPhantom = CreatePoolEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly sqrtPrice: ToField<'u128'>
  readonly effectiveTickLower: ToField<I32>
  readonly effectiveTickUpper: ToField<I32>

  private constructor(typeArgs: [], fields: CreatePoolEventFields) {
    this.$fullTypeName = composeSuiType(
      CreatePoolEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::CreatePoolEvent`
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
      get typeName() {
        return CreatePoolEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CreatePoolEvent.$typeName,
          ...[],
        ) as `${string}::pool::CreatePoolEvent`
      },
      typeArgs: [] as [],
      isPhantom: CreatePoolEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CreatePoolEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CreatePoolEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CreatePoolEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CreatePoolEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CreatePoolEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CreatePoolEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => CreatePoolEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CreatePoolEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => CreatePoolEvent.fetch(client, id),
      new: (fields: CreatePoolEventFields) => {
        return new CreatePoolEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CreatePoolEventReified {
    return CreatePoolEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CreatePoolEvent>> {
    return phantom(CreatePoolEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CreatePoolEvent>> {
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

  static get bcs(): ReturnType<typeof CreatePoolEvent.instantiateBcs> {
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
        item.fields.effective_tick_lower,
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper,
      ),
    })
  }

  static fromBcs(data: Uint8Array): CreatePoolEvent {
    return CreatePoolEvent.fromFields(CreatePoolEvent.bcs.parse(data))
  }

  toJSONField(): CreatePoolEventJSONField {
    return {
      poolId: this.poolId,
      clmmPoolId: this.clmmPoolId,
      sqrtPrice: this.sqrtPrice.toString(),
      effectiveTickLower: this.effectiveTickLower.toJSONField(),
      effectiveTickUpper: this.effectiveTickUpper.toJSONField(),
    }
  }

  toJSON(): CreatePoolEventJSON {
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
      throw new Error(
        `not a CreatePoolEvent json object: expected '${CreatePoolEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CreatePoolEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CreatePoolEvent {
    if (!isCreatePoolEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CreatePoolEvent object`)
    }
    return CreatePoolEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CreatePoolEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CreatePoolEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCreatePoolEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CreatePoolEvent object`)
    }
    return CreatePoolEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CreatePoolEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CreatePoolEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCreatePoolEvent(data.bcs.type)) {
        throw new Error(`object at is not a CreatePoolEvent object`)
      }

      return CreatePoolEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreatePoolEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CreatePoolEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCreatePoolEvent(object.type)) {
      throw new Error(`object at id ${id} is not a CreatePoolEvent object`)
    }
    return CreatePoolEvent.fromBcs(object.content)
  }
}

/* ============================== UpdateEffectiveTickRangeEvent =============================== */

export function isUpdateEffectiveTickRangeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-farming', 'pool::UpdateEffectiveTickRangeEvent')
    }::pool::UpdateEffectiveTickRangeEvent`
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

export type UpdateEffectiveTickRangeEventJSONField = {
  poolId: string
  clmmPoolId: string
  effectiveTickLower: ToJSON<I32>
  effectiveTickUpper: ToJSON<I32>
  sqrtPrice: string
  start: string[]
  end: string | null
  limit: string
}

export type UpdateEffectiveTickRangeEventJSON = {
  $typeName: typeof UpdateEffectiveTickRangeEvent.$typeName
  $typeArgs: []
} & UpdateEffectiveTickRangeEventJSONField

export class UpdateEffectiveTickRangeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::UpdateEffectiveTickRangeEvent` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::UpdateEffectiveTickRangeEvent')
    }::pool::UpdateEffectiveTickRangeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateEffectiveTickRangeEvent.$typeName =
    UpdateEffectiveTickRangeEvent.$typeName
  readonly $fullTypeName: `${string}::pool::UpdateEffectiveTickRangeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateEffectiveTickRangeEvent.$isPhantom =
    UpdateEffectiveTickRangeEvent.$isPhantom

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
      ...typeArgs,
    ) as `${string}::pool::UpdateEffectiveTickRangeEvent`
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
      get typeName() {
        return UpdateEffectiveTickRangeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdateEffectiveTickRangeEvent.$typeName,
          ...[],
        ) as `${string}::pool::UpdateEffectiveTickRangeEvent`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdateEffectiveTickRangeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdateEffectiveTickRangeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdateEffectiveTickRangeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        UpdateEffectiveTickRangeEvent.fetch(client, id),
      new: (fields: UpdateEffectiveTickRangeEventFields) => {
        return new UpdateEffectiveTickRangeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateEffectiveTickRangeEventReified {
    return UpdateEffectiveTickRangeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateEffectiveTickRangeEvent>> {
    return phantom(UpdateEffectiveTickRangeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateEffectiveTickRangeEvent>> {
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

  static get bcs(): ReturnType<typeof UpdateEffectiveTickRangeEvent.instantiateBcs> {
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
      start: decodeFromFields(vector(ID.reified()), fields.start),
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
        item.fields.effective_tick_lower,
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper,
      ),
      sqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price),
      start: decodeFromFieldsWithTypes(vector(ID.reified()), item.fields.start),
      end: decodeFromFieldsWithTypes(Option.reified(ID.reified()), item.fields.end),
      limit: decodeFromFieldsWithTypes('u64', item.fields.limit),
    })
  }

  static fromBcs(data: Uint8Array): UpdateEffectiveTickRangeEvent {
    return UpdateEffectiveTickRangeEvent.fromFields(UpdateEffectiveTickRangeEvent.bcs.parse(data))
  }

  toJSONField(): UpdateEffectiveTickRangeEventJSONField {
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

  toJSON(): UpdateEffectiveTickRangeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateEffectiveTickRangeEvent {
    return UpdateEffectiveTickRangeEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      clmmPoolId: decodeFromJSONField(ID.reified(), field.clmmPoolId),
      effectiveTickLower: decodeFromJSONField(I32.reified(), field.effectiveTickLower),
      effectiveTickUpper: decodeFromJSONField(I32.reified(), field.effectiveTickUpper),
      sqrtPrice: decodeFromJSONField('u128', field.sqrtPrice),
      start: decodeFromJSONField(vector(ID.reified()), field.start),
      end: decodeFromJSONField(Option.reified(ID.reified()), field.end),
      limit: decodeFromJSONField('u64', field.limit),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateEffectiveTickRangeEvent {
    if (json.$typeName !== UpdateEffectiveTickRangeEvent.$typeName) {
      throw new Error(
        `not a UpdateEffectiveTickRangeEvent json object: expected '${UpdateEffectiveTickRangeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateEffectiveTickRangeEvent.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): UpdateEffectiveTickRangeEvent {
    if (!isUpdateEffectiveTickRangeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdateEffectiveTickRangeEvent object`)
    }
    return UpdateEffectiveTickRangeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateEffectiveTickRangeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdateEffectiveTickRangeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateEffectiveTickRangeEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdateEffectiveTickRangeEvent object`,
      )
    }
    return UpdateEffectiveTickRangeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateEffectiveTickRangeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdateEffectiveTickRangeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateEffectiveTickRangeEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateEffectiveTickRangeEvent object`)
      }

      return UpdateEffectiveTickRangeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateEffectiveTickRangeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: ClientWithCoreApi,
    id: string,
  ): Promise<UpdateEffectiveTickRangeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdateEffectiveTickRangeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdateEffectiveTickRangeEvent object`)
    }
    return UpdateEffectiveTickRangeEvent.fromBcs(object.content)
  }
}

/* ============================== AddRewardEvent =============================== */

export function isAddRewardEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'pool::AddRewardEvent')}::pool::AddRewardEvent`
}

export interface AddRewardEventFields {
  poolId: ToField<ID>
  clmmPoolId: ToField<ID>
  rewarder: ToField<TypeName>
  allocatePoint: ToField<'u64'>
}

export type AddRewardEventReified = Reified<AddRewardEvent, AddRewardEventFields>

export type AddRewardEventJSONField = {
  poolId: string
  clmmPoolId: string
  rewarder: string
  allocatePoint: string
}

export type AddRewardEventJSON = {
  $typeName: typeof AddRewardEvent.$typeName
  $typeArgs: []
} & AddRewardEventJSONField

export class AddRewardEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::AddRewardEvent` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::AddRewardEvent')
    }::pool::AddRewardEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddRewardEvent.$typeName = AddRewardEvent.$typeName
  readonly $fullTypeName: `${string}::pool::AddRewardEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddRewardEvent.$isPhantom = AddRewardEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly rewarder: ToField<TypeName>
  readonly allocatePoint: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddRewardEventFields) {
    this.$fullTypeName = composeSuiType(
      AddRewardEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::AddRewardEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.clmmPoolId = fields.clmmPoolId
    this.rewarder = fields.rewarder
    this.allocatePoint = fields.allocatePoint
  }

  static reified(): AddRewardEventReified {
    const reifiedBcs = AddRewardEvent.bcs
    return {
      get typeName() {
        return AddRewardEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddRewardEvent.$typeName,
          ...[],
        ) as `${string}::pool::AddRewardEvent`
      },
      typeArgs: [] as [],
      isPhantom: AddRewardEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddRewardEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddRewardEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddRewardEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddRewardEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddRewardEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddRewardEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddRewardEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddRewardEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddRewardEvent.fetch(client, id),
      new: (fields: AddRewardEventFields) => {
        return new AddRewardEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddRewardEventReified {
    return AddRewardEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddRewardEvent>> {
    return phantom(AddRewardEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddRewardEvent>> {
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

  static get bcs(): ReturnType<typeof AddRewardEvent.instantiateBcs> {
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

  toJSONField(): AddRewardEventJSONField {
    return {
      poolId: this.poolId,
      clmmPoolId: this.clmmPoolId,
      rewarder: this.rewarder,
      allocatePoint: this.allocatePoint.toString(),
    }
  }

  toJSON(): AddRewardEventJSON {
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
      throw new Error(
        `not a AddRewardEvent json object: expected '${AddRewardEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddRewardEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddRewardEvent {
    if (!isAddRewardEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddRewardEvent object`)
    }
    return AddRewardEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddRewardEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddRewardEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddRewardEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddRewardEvent object`)
    }
    return AddRewardEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddRewardEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddRewardEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddRewardEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddRewardEvent object`)
      }

      return AddRewardEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddRewardEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddRewardEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddRewardEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AddRewardEvent object`)
    }
    return AddRewardEvent.fromBcs(object.content)
  }
}

/* ============================== UpdatePoolAllocatePointEvent =============================== */

export function isUpdatePoolAllocatePointEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-farming', 'pool::UpdatePoolAllocatePointEvent')
    }::pool::UpdatePoolAllocatePointEvent`
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

export type UpdatePoolAllocatePointEventJSONField = {
  poolId: string
  clmmPoolId: string
  oldAllocatePoint: string
  newAllocatePoint: string
}

export type UpdatePoolAllocatePointEventJSON = {
  $typeName: typeof UpdatePoolAllocatePointEvent.$typeName
  $typeArgs: []
} & UpdatePoolAllocatePointEventJSONField

export class UpdatePoolAllocatePointEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::UpdatePoolAllocatePointEvent` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::UpdatePoolAllocatePointEvent')
    }::pool::UpdatePoolAllocatePointEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdatePoolAllocatePointEvent.$typeName =
    UpdatePoolAllocatePointEvent.$typeName
  readonly $fullTypeName: `${string}::pool::UpdatePoolAllocatePointEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdatePoolAllocatePointEvent.$isPhantom =
    UpdatePoolAllocatePointEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly oldAllocatePoint: ToField<'u64'>
  readonly newAllocatePoint: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdatePoolAllocatePointEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdatePoolAllocatePointEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::UpdatePoolAllocatePointEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.clmmPoolId = fields.clmmPoolId
    this.oldAllocatePoint = fields.oldAllocatePoint
    this.newAllocatePoint = fields.newAllocatePoint
  }

  static reified(): UpdatePoolAllocatePointEventReified {
    const reifiedBcs = UpdatePoolAllocatePointEvent.bcs
    return {
      get typeName() {
        return UpdatePoolAllocatePointEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdatePoolAllocatePointEvent.$typeName,
          ...[],
        ) as `${string}::pool::UpdatePoolAllocatePointEvent`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdatePoolAllocatePointEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdatePoolAllocatePointEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdatePoolAllocatePointEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        UpdatePoolAllocatePointEvent.fetch(client, id),
      new: (fields: UpdatePoolAllocatePointEventFields) => {
        return new UpdatePoolAllocatePointEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdatePoolAllocatePointEventReified {
    return UpdatePoolAllocatePointEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdatePoolAllocatePointEvent>> {
    return phantom(UpdatePoolAllocatePointEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdatePoolAllocatePointEvent>> {
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

  static get bcs(): ReturnType<typeof UpdatePoolAllocatePointEvent.instantiateBcs> {
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

  toJSONField(): UpdatePoolAllocatePointEventJSONField {
    return {
      poolId: this.poolId,
      clmmPoolId: this.clmmPoolId,
      oldAllocatePoint: this.oldAllocatePoint.toString(),
      newAllocatePoint: this.newAllocatePoint.toString(),
    }
  }

  toJSON(): UpdatePoolAllocatePointEventJSON {
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
      throw new Error(
        `not a UpdatePoolAllocatePointEvent json object: expected '${UpdatePoolAllocatePointEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdatePoolAllocatePointEvent.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): UpdatePoolAllocatePointEvent {
    if (!isUpdatePoolAllocatePointEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdatePoolAllocatePointEvent object`)
    }
    return UpdatePoolAllocatePointEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdatePoolAllocatePointEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdatePoolAllocatePointEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdatePoolAllocatePointEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdatePoolAllocatePointEvent object`,
      )
    }
    return UpdatePoolAllocatePointEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdatePoolAllocatePointEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdatePoolAllocatePointEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdatePoolAllocatePointEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdatePoolAllocatePointEvent object`)
      }

      return UpdatePoolAllocatePointEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdatePoolAllocatePointEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdatePoolAllocatePointEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdatePoolAllocatePointEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdatePoolAllocatePointEvent object`)
    }
    return UpdatePoolAllocatePointEvent.fromBcs(object.content)
  }
}

/* ============================== DepositEvent =============================== */

export function isDepositEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'pool::DepositEvent')}::pool::DepositEvent`
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

export type DepositEventJSONField = {
  poolId: string
  wrappedPositionId: string
  clmmPoolId: string
  clmmPositionId: string
  effectiveTickLower: ToJSON<I32>
  effectiveTickUpper: ToJSON<I32>
  sqrtPrice: string
  liquidity: string
  share: string
  poolTotalShare: string
}

export type DepositEventJSON = {
  $typeName: typeof DepositEvent.$typeName
  $typeArgs: []
} & DepositEventJSONField

export class DepositEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::DepositEvent` {
    return `${getTypeOrigin('cetus-farming', 'pool::DepositEvent')}::pool::DepositEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DepositEvent.$typeName = DepositEvent.$typeName
  readonly $fullTypeName: `${string}::pool::DepositEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DepositEvent.$isPhantom = DepositEvent.$isPhantom

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
      ...typeArgs,
    ) as `${string}::pool::DepositEvent`
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
      get typeName() {
        return DepositEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DepositEvent.$typeName,
          ...[],
        ) as `${string}::pool::DepositEvent`
      },
      typeArgs: [] as [],
      isPhantom: DepositEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DepositEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DepositEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DepositEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DepositEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DepositEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DepositEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DepositEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DepositEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DepositEvent.fetch(client, id),
      new: (fields: DepositEventFields) => {
        return new DepositEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DepositEventReified {
    return DepositEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DepositEvent>> {
    return phantom(DepositEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DepositEvent>> {
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

  static get bcs(): ReturnType<typeof DepositEvent.instantiateBcs> {
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
        item.fields.effective_tick_lower,
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper,
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

  toJSONField(): DepositEventJSONField {
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

  toJSON(): DepositEventJSON {
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
      throw new Error(
        `not a DepositEvent json object: expected '${DepositEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DepositEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DepositEvent {
    if (!isDepositEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DepositEvent object`)
    }
    return DepositEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DepositEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DepositEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDepositEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DepositEvent object`)
    }
    return DepositEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DepositEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DepositEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDepositEvent(data.bcs.type)) {
        throw new Error(`object at is not a DepositEvent object`)
      }

      return DepositEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DepositEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DepositEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDepositEvent(object.type)) {
      throw new Error(`object at id ${id} is not a DepositEvent object`)
    }
    return DepositEvent.fromBcs(object.content)
  }
}

/* ============================== WithdrawEvent =============================== */

export function isWithdrawEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'pool::WithdrawEvent')}::pool::WithdrawEvent`
}

export interface WithdrawEventFields {
  poolId: ToField<ID>
  wrappedPositionId: ToField<ID>
  clmmPoolId: ToField<ID>
  clmmPositionId: ToField<ID>
  share: ToField<'u128'>
}

export type WithdrawEventReified = Reified<WithdrawEvent, WithdrawEventFields>

export type WithdrawEventJSONField = {
  poolId: string
  wrappedPositionId: string
  clmmPoolId: string
  clmmPositionId: string
  share: string
}

export type WithdrawEventJSON = {
  $typeName: typeof WithdrawEvent.$typeName
  $typeArgs: []
} & WithdrawEventJSONField

export class WithdrawEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::WithdrawEvent` {
    return `${getTypeOrigin('cetus-farming', 'pool::WithdrawEvent')}::pool::WithdrawEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof WithdrawEvent.$typeName = WithdrawEvent.$typeName
  readonly $fullTypeName: `${string}::pool::WithdrawEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof WithdrawEvent.$isPhantom = WithdrawEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly share: ToField<'u128'>

  private constructor(typeArgs: [], fields: WithdrawEventFields) {
    this.$fullTypeName = composeSuiType(
      WithdrawEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::WithdrawEvent`
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
      get typeName() {
        return WithdrawEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WithdrawEvent.$typeName,
          ...[],
        ) as `${string}::pool::WithdrawEvent`
      },
      typeArgs: [] as [],
      isPhantom: WithdrawEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WithdrawEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WithdrawEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WithdrawEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WithdrawEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WithdrawEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WithdrawEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => WithdrawEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WithdrawEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => WithdrawEvent.fetch(client, id),
      new: (fields: WithdrawEventFields) => {
        return new WithdrawEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): WithdrawEventReified {
    return WithdrawEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WithdrawEvent>> {
    return phantom(WithdrawEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<WithdrawEvent>> {
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

  static get bcs(): ReturnType<typeof WithdrawEvent.instantiateBcs> {
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

  toJSONField(): WithdrawEventJSONField {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPoolId: this.clmmPoolId,
      clmmPositionId: this.clmmPositionId,
      share: this.share.toString(),
    }
  }

  toJSON(): WithdrawEventJSON {
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
      throw new Error(
        `not a WithdrawEvent json object: expected '${WithdrawEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return WithdrawEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WithdrawEvent {
    if (!isWithdrawEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WithdrawEvent object`)
    }
    return WithdrawEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WithdrawEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WithdrawEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithdrawEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithdrawEvent object`)
    }
    return WithdrawEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WithdrawEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WithdrawEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWithdrawEvent(data.bcs.type)) {
        throw new Error(`object at is not a WithdrawEvent object`)
      }

      return WithdrawEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WithdrawEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WithdrawEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWithdrawEvent(object.type)) {
      throw new Error(`object at id ${id} is not a WithdrawEvent object`)
    }
    return WithdrawEvent.fromBcs(object.content)
  }
}

/* ============================== HarvestEvent =============================== */

export function isHarvestEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'pool::HarvestEvent')}::pool::HarvestEvent`
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

export type HarvestEventJSONField = {
  poolId: string
  wrappedPositionId: string
  clmmPoolId: string
  clmmPositionId: string
  rewarderType: string
  amount: string
}

export type HarvestEventJSON = {
  $typeName: typeof HarvestEvent.$typeName
  $typeArgs: []
} & HarvestEventJSONField

export class HarvestEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::HarvestEvent` {
    return `${getTypeOrigin('cetus-farming', 'pool::HarvestEvent')}::pool::HarvestEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof HarvestEvent.$typeName = HarvestEvent.$typeName
  readonly $fullTypeName: `${string}::pool::HarvestEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof HarvestEvent.$isPhantom = HarvestEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPoolId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly rewarderType: ToField<TypeName>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: HarvestEventFields) {
    this.$fullTypeName = composeSuiType(
      HarvestEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::HarvestEvent`
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
      get typeName() {
        return HarvestEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          HarvestEvent.$typeName,
          ...[],
        ) as `${string}::pool::HarvestEvent`
      },
      typeArgs: [] as [],
      isPhantom: HarvestEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => HarvestEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => HarvestEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => HarvestEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => HarvestEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => HarvestEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        HarvestEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => HarvestEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => HarvestEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => HarvestEvent.fetch(client, id),
      new: (fields: HarvestEventFields) => {
        return new HarvestEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): HarvestEventReified {
    return HarvestEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<HarvestEvent>> {
    return phantom(HarvestEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<HarvestEvent>> {
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

  static get bcs(): ReturnType<typeof HarvestEvent.instantiateBcs> {
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

  toJSONField(): HarvestEventJSONField {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPoolId: this.clmmPoolId,
      clmmPositionId: this.clmmPositionId,
      rewarderType: this.rewarderType,
      amount: this.amount.toString(),
    }
  }

  toJSON(): HarvestEventJSON {
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
      throw new Error(
        `not a HarvestEvent json object: expected '${HarvestEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return HarvestEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): HarvestEvent {
    if (!isHarvestEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a HarvestEvent object`)
    }
    return HarvestEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link HarvestEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): HarvestEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isHarvestEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a HarvestEvent object`)
    }
    return HarvestEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link HarvestEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): HarvestEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isHarvestEvent(data.bcs.type)) {
        throw new Error(`object at is not a HarvestEvent object`)
      }

      return HarvestEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return HarvestEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<HarvestEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isHarvestEvent(object.type)) {
      throw new Error(`object at id ${id} is not a HarvestEvent object`)
    }
    return HarvestEvent.fromBcs(object.content)
  }
}

/* ============================== AccumulatedPositionRewardsEvent =============================== */

export function isAccumulatedPositionRewardsEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-farming', 'pool::AccumulatedPositionRewardsEvent')
    }::pool::AccumulatedPositionRewardsEvent`
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

export type AccumulatedPositionRewardsEventJSONField = {
  poolId: string
  wrappedPositionId: string
  clmmPositionId: string
  rewards: ToJSON<VecMap<TypeName, 'u64'>>
}

export type AccumulatedPositionRewardsEventJSON = {
  $typeName: typeof AccumulatedPositionRewardsEvent.$typeName
  $typeArgs: []
} & AccumulatedPositionRewardsEventJSONField

export class AccumulatedPositionRewardsEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::AccumulatedPositionRewardsEvent` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::AccumulatedPositionRewardsEvent')
    }::pool::AccumulatedPositionRewardsEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AccumulatedPositionRewardsEvent.$typeName =
    AccumulatedPositionRewardsEvent.$typeName
  readonly $fullTypeName: `${string}::pool::AccumulatedPositionRewardsEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AccumulatedPositionRewardsEvent.$isPhantom =
    AccumulatedPositionRewardsEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly wrappedPositionId: ToField<ID>
  readonly clmmPositionId: ToField<ID>
  readonly rewards: ToField<VecMap<TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: AccumulatedPositionRewardsEventFields) {
    this.$fullTypeName = composeSuiType(
      AccumulatedPositionRewardsEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::AccumulatedPositionRewardsEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.wrappedPositionId = fields.wrappedPositionId
    this.clmmPositionId = fields.clmmPositionId
    this.rewards = fields.rewards
  }

  static reified(): AccumulatedPositionRewardsEventReified {
    const reifiedBcs = AccumulatedPositionRewardsEvent.bcs
    return {
      get typeName() {
        return AccumulatedPositionRewardsEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AccumulatedPositionRewardsEvent.$typeName,
          ...[],
        ) as `${string}::pool::AccumulatedPositionRewardsEvent`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AccumulatedPositionRewardsEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        AccumulatedPositionRewardsEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AccumulatedPositionRewardsEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        AccumulatedPositionRewardsEvent.fetch(client, id),
      new: (fields: AccumulatedPositionRewardsEventFields) => {
        return new AccumulatedPositionRewardsEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AccumulatedPositionRewardsEventReified {
    return AccumulatedPositionRewardsEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AccumulatedPositionRewardsEvent>> {
    return phantom(AccumulatedPositionRewardsEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AccumulatedPositionRewardsEvent>> {
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

  private static cachedBcs:
    | ReturnType<typeof AccumulatedPositionRewardsEvent.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof AccumulatedPositionRewardsEvent.instantiateBcs> {
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
        item.fields.rewards,
      ),
    })
  }

  static fromBcs(data: Uint8Array): AccumulatedPositionRewardsEvent {
    return AccumulatedPositionRewardsEvent.fromFields(
      AccumulatedPositionRewardsEvent.bcs.parse(data),
    )
  }

  toJSONField(): AccumulatedPositionRewardsEventJSONField {
    return {
      poolId: this.poolId,
      wrappedPositionId: this.wrappedPositionId,
      clmmPositionId: this.clmmPositionId,
      rewards: this.rewards.toJSONField(),
    }
  }

  toJSON(): AccumulatedPositionRewardsEventJSON {
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
      throw new Error(
        `not a AccumulatedPositionRewardsEvent json object: expected '${AccumulatedPositionRewardsEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AccumulatedPositionRewardsEvent.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): AccumulatedPositionRewardsEvent {
    if (!isAccumulatedPositionRewardsEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AccumulatedPositionRewardsEvent object`)
    }
    return AccumulatedPositionRewardsEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AccumulatedPositionRewardsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AccumulatedPositionRewardsEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAccumulatedPositionRewardsEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AccumulatedPositionRewardsEvent object`,
      )
    }
    return AccumulatedPositionRewardsEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AccumulatedPositionRewardsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AccumulatedPositionRewardsEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAccumulatedPositionRewardsEvent(data.bcs.type)) {
        throw new Error(`object at is not a AccumulatedPositionRewardsEvent object`)
      }

      return AccumulatedPositionRewardsEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AccumulatedPositionRewardsEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: ClientWithCoreApi,
    id: string,
  ): Promise<AccumulatedPositionRewardsEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAccumulatedPositionRewardsEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AccumulatedPositionRewardsEvent object`)
    }
    return AccumulatedPositionRewardsEvent.fromBcs(object.content)
  }
}

/* ============================== AddLiquidityEvent =============================== */

export function isAddLiquidityEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'pool::AddLiquidityEvent')}::pool::AddLiquidityEvent`
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

export type AddLiquidityEventJSONField = {
  poolId: string
  wrappedPositionId: string
  clmmPooId: string
  clmmPositionId: string
  effectiveTickLower: ToJSON<I32>
  effectiveTickUpper: ToJSON<I32>
  sqrtPrice: string
  oldLiquidity: string
  newLiquidity: string
  oldShare: string
  newShare: string
}

export type AddLiquidityEventJSON = {
  $typeName: typeof AddLiquidityEvent.$typeName
  $typeArgs: []
} & AddLiquidityEventJSONField

export class AddLiquidityEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::AddLiquidityEvent` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::AddLiquidityEvent')
    }::pool::AddLiquidityEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddLiquidityEvent.$typeName = AddLiquidityEvent.$typeName
  readonly $fullTypeName: `${string}::pool::AddLiquidityEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddLiquidityEvent.$isPhantom = AddLiquidityEvent.$isPhantom

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
      ...typeArgs,
    ) as `${string}::pool::AddLiquidityEvent`
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
      get typeName() {
        return AddLiquidityEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddLiquidityEvent.$typeName,
          ...[],
        ) as `${string}::pool::AddLiquidityEvent`
      },
      typeArgs: [] as [],
      isPhantom: AddLiquidityEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddLiquidityEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddLiquidityEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddLiquidityEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddLiquidityEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddLiquidityEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddLiquidityEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddLiquidityEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddLiquidityEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddLiquidityEvent.fetch(client, id),
      new: (fields: AddLiquidityEventFields) => {
        return new AddLiquidityEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddLiquidityEventReified {
    return AddLiquidityEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityEvent>> {
    return phantom(AddLiquidityEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddLiquidityEvent>> {
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

  static get bcs(): ReturnType<typeof AddLiquidityEvent.instantiateBcs> {
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
        item.fields.effective_tick_lower,
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper,
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

  toJSONField(): AddLiquidityEventJSONField {
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

  toJSON(): AddLiquidityEventJSON {
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
      throw new Error(
        `not a AddLiquidityEvent json object: expected '${AddLiquidityEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddLiquidityEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddLiquidityEvent {
    if (!isAddLiquidityEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddLiquidityEvent object`)
    }
    return AddLiquidityEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddLiquidityEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddLiquidityEvent object`)
    }
    return AddLiquidityEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddLiquidityEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityEvent object`)
      }

      return AddLiquidityEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddLiquidityEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddLiquidityEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityEvent object`)
    }
    return AddLiquidityEvent.fromBcs(object.content)
  }
}

/* ============================== AddLiquidityFixCoinEvent =============================== */

export function isAddLiquidityFixCoinEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-farming', 'pool::AddLiquidityFixCoinEvent')
    }::pool::AddLiquidityFixCoinEvent`
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

export type AddLiquidityFixCoinEventJSONField = {
  poolId: string
  wrappedPositionId: string
  clmmPooId: string
  clmmPositionId: string
  effectiveTickLower: ToJSON<I32>
  effectiveTickUpper: ToJSON<I32>
  sqrtPrice: string
  oldLiquidity: string
  newLiquidity: string
  oldShare: string
  newShare: string
}

export type AddLiquidityFixCoinEventJSON = {
  $typeName: typeof AddLiquidityFixCoinEvent.$typeName
  $typeArgs: []
} & AddLiquidityFixCoinEventJSONField

export class AddLiquidityFixCoinEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::AddLiquidityFixCoinEvent` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::AddLiquidityFixCoinEvent')
    }::pool::AddLiquidityFixCoinEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddLiquidityFixCoinEvent.$typeName = AddLiquidityFixCoinEvent.$typeName
  readonly $fullTypeName: `${string}::pool::AddLiquidityFixCoinEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddLiquidityFixCoinEvent.$isPhantom =
    AddLiquidityFixCoinEvent.$isPhantom

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
      ...typeArgs,
    ) as `${string}::pool::AddLiquidityFixCoinEvent`
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
      get typeName() {
        return AddLiquidityFixCoinEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddLiquidityFixCoinEvent.$typeName,
          ...[],
        ) as `${string}::pool::AddLiquidityFixCoinEvent`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddLiquidityFixCoinEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        AddLiquidityFixCoinEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AddLiquidityFixCoinEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        AddLiquidityFixCoinEvent.fetch(client, id),
      new: (fields: AddLiquidityFixCoinEventFields) => {
        return new AddLiquidityFixCoinEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddLiquidityFixCoinEventReified {
    return AddLiquidityFixCoinEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityFixCoinEvent>> {
    return phantom(AddLiquidityFixCoinEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddLiquidityFixCoinEvent>> {
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

  static get bcs(): ReturnType<typeof AddLiquidityFixCoinEvent.instantiateBcs> {
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
        item.fields.effective_tick_lower,
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper,
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

  toJSONField(): AddLiquidityFixCoinEventJSONField {
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

  toJSON(): AddLiquidityFixCoinEventJSON {
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
      throw new Error(
        `not a AddLiquidityFixCoinEvent json object: expected '${AddLiquidityFixCoinEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddLiquidityFixCoinEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddLiquidityFixCoinEvent {
    if (!isAddLiquidityFixCoinEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddLiquidityFixCoinEvent object`)
    }
    return AddLiquidityFixCoinEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityFixCoinEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddLiquidityFixCoinEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityFixCoinEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AddLiquidityFixCoinEvent object`,
      )
    }
    return AddLiquidityFixCoinEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityFixCoinEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddLiquidityFixCoinEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityFixCoinEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityFixCoinEvent object`)
      }

      return AddLiquidityFixCoinEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityFixCoinEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddLiquidityFixCoinEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddLiquidityFixCoinEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityFixCoinEvent object`)
    }
    return AddLiquidityFixCoinEvent.fromBcs(object.content)
  }
}

/* ============================== RemoveLiquidityEvent =============================== */

export function isRemoveLiquidityEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-farming', 'pool::RemoveLiquidityEvent')
    }::pool::RemoveLiquidityEvent`
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

export type RemoveLiquidityEventJSONField = {
  poolId: string
  wrappedPositionId: string
  clmmPooId: string
  clmmPositionId: string
  effectiveTickLower: ToJSON<I32>
  effectiveTickUpper: ToJSON<I32>
  sqrtPrice: string
  oldLiquidity: string
  newLiquidity: string
  oldShare: string
  newShare: string
}

export type RemoveLiquidityEventJSON = {
  $typeName: typeof RemoveLiquidityEvent.$typeName
  $typeArgs: []
} & RemoveLiquidityEventJSONField

export class RemoveLiquidityEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::RemoveLiquidityEvent` {
    return `${
      getTypeOrigin('cetus-farming', 'pool::RemoveLiquidityEvent')
    }::pool::RemoveLiquidityEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveLiquidityEvent.$typeName = RemoveLiquidityEvent.$typeName
  readonly $fullTypeName: `${string}::pool::RemoveLiquidityEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveLiquidityEvent.$isPhantom = RemoveLiquidityEvent.$isPhantom

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
      ...typeArgs,
    ) as `${string}::pool::RemoveLiquidityEvent`
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
      get typeName() {
        return RemoveLiquidityEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RemoveLiquidityEvent.$typeName,
          ...[],
        ) as `${string}::pool::RemoveLiquidityEvent`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RemoveLiquidityEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveLiquidityEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveLiquidityEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        RemoveLiquidityEvent.fetch(client, id),
      new: (fields: RemoveLiquidityEventFields) => {
        return new RemoveLiquidityEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveLiquidityEventReified {
    return RemoveLiquidityEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveLiquidityEvent>> {
    return phantom(RemoveLiquidityEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveLiquidityEvent>> {
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

  static get bcs(): ReturnType<typeof RemoveLiquidityEvent.instantiateBcs> {
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
        item.fields.effective_tick_lower,
      ),
      effectiveTickUpper: decodeFromFieldsWithTypes(
        I32.reified(),
        item.fields.effective_tick_upper,
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

  toJSONField(): RemoveLiquidityEventJSONField {
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

  toJSON(): RemoveLiquidityEventJSON {
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
      throw new Error(
        `not a RemoveLiquidityEvent json object: expected '${RemoveLiquidityEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveLiquidityEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RemoveLiquidityEvent {
    if (!isRemoveLiquidityEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RemoveLiquidityEvent object`)
    }
    return RemoveLiquidityEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveLiquidityEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RemoveLiquidityEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveLiquidityEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveLiquidityEvent object`,
      )
    }
    return RemoveLiquidityEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveLiquidityEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RemoveLiquidityEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveLiquidityEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveLiquidityEvent object`)
      }

      return RemoveLiquidityEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveLiquidityEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RemoveLiquidityEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRemoveLiquidityEvent(object.type)) {
      throw new Error(`object at id ${id} is not a RemoveLiquidityEvent object`)
    }
    return RemoveLiquidityEvent.fromBcs(object.content)
  }
}
