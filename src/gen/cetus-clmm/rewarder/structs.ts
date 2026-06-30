/**
 * `Rewarder` is the liquidity incentive module of `clmmpool`, which is commonly known as `farming`. In `clmmpool`,
 * liquidity is stored in a price range, so `clmmpool` uses a reward allocation method based on effective liquidity.
 * The allocation rules are roughly as follows:
 *
 * 1. Each pool can configure multiple `Rewarders`, and each `Rewarder` releases rewards at a uniform speed according
 * to its configured release rate.
 * 2. During the time period when the liquidity price range contains the current price of the pool, the liquidity
 * position can participate in the reward distribution for this time period (if the pool itself is configured with
 * rewards), and the proportion of the distribution depends on the size of the liquidity value of the position.
 * Conversely, if the price range of a position does not include the current price of the pool during a certain period
 * of time, then this position will not receive any rewards during this period of time. This is similar to the
 * calculation of transaction fees.
 */

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
import { TypeName } from '../../std/type-name/structs'
import { Bag } from '../../sui/bag/structs'
import { ID, UID } from '../../sui/object/structs'

/* ============================== RewarderManager =============================== */

export function isRewarderManager(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'rewarder::RewarderManager')}::rewarder::RewarderManager`
}

export interface RewarderManagerFields {
  rewarders: ToField<Vector<Rewarder>>
  pointsReleased: ToField<'u128'>
  pointsGrowthGlobal: ToField<'u128'>
  lastUpdatedTime: ToField<'u64'>
}

export type RewarderManagerReified = Reified<RewarderManager, RewarderManagerFields>

export type RewarderManagerJSONField = {
  rewarders: ToJSON<Rewarder>[]
  pointsReleased: string
  pointsGrowthGlobal: string
  lastUpdatedTime: string
}

export type RewarderManagerJSON = {
  $typeName: typeof RewarderManager.$typeName
  $typeArgs: []
} & RewarderManagerJSONField

/**
 * Manager the Rewards and Points.
 * * `rewarders` - The rewarders
 * * `points_released` - The points released
 * * `points_growth_global` - The points growth global
 * * `last_updated_time` - The last updated time
 */
export class RewarderManager implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::rewarder::RewarderManager` {
    return `${
      getTypeOrigin('cetus-clmm', 'rewarder::RewarderManager')
    }::rewarder::RewarderManager` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RewarderManager.$typeName = RewarderManager.$typeName
  readonly $fullTypeName: `${string}::rewarder::RewarderManager`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RewarderManager.$isPhantom = RewarderManager.$isPhantom

  readonly rewarders: ToField<Vector<Rewarder>>
  readonly pointsReleased: ToField<'u128'>
  readonly pointsGrowthGlobal: ToField<'u128'>
  readonly lastUpdatedTime: ToField<'u64'>

  private constructor(typeArgs: [], fields: RewarderManagerFields) {
    this.$fullTypeName = composeSuiType(
      RewarderManager.$typeName,
      ...typeArgs,
    ) as `${string}::rewarder::RewarderManager`
    this.$typeArgs = typeArgs

    this.rewarders = fields.rewarders
    this.pointsReleased = fields.pointsReleased
    this.pointsGrowthGlobal = fields.pointsGrowthGlobal
    this.lastUpdatedTime = fields.lastUpdatedTime
  }

  static reified(): RewarderManagerReified {
    const reifiedBcs = RewarderManager.bcs
    return {
      get typeName() {
        return RewarderManager.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RewarderManager.$typeName,
          ...[],
        ) as `${string}::rewarder::RewarderManager`
      },
      typeArgs: [] as [],
      isPhantom: RewarderManager.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewarderManager.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewarderManager.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewarderManager.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewarderManager.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewarderManager.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RewarderManager.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RewarderManager.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewarderManager.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RewarderManager.fetch(client, id),
      new: (fields: RewarderManagerFields) => {
        return new RewarderManager([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RewarderManagerReified {
    return RewarderManager.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewarderManager>> {
    return phantom(RewarderManager.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RewarderManager>> {
    return RewarderManager.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewarderManager', {
      rewarders: bcs.vector(Rewarder.bcs),
      points_released: bcs.u128(),
      points_growth_global: bcs.u128(),
      last_updated_time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof RewarderManager.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RewarderManager.instantiateBcs> {
    if (!RewarderManager.cachedBcs) {
      RewarderManager.cachedBcs = RewarderManager.instantiateBcs()
    }
    return RewarderManager.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewarderManager {
    return RewarderManager.reified().new({
      rewarders: decodeFromFields(vector(Rewarder.reified()), fields.rewarders),
      pointsReleased: decodeFromFields('u128', fields.points_released),
      pointsGrowthGlobal: decodeFromFields('u128', fields.points_growth_global),
      lastUpdatedTime: decodeFromFields('u64', fields.last_updated_time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewarderManager {
    if (!isRewarderManager(item.type)) {
      throw new Error('not a RewarderManager type')
    }

    return RewarderManager.reified().new({
      rewarders: decodeFromFieldsWithTypes(vector(Rewarder.reified()), item.fields.rewarders),
      pointsReleased: decodeFromFieldsWithTypes('u128', item.fields.points_released),
      pointsGrowthGlobal: decodeFromFieldsWithTypes('u128', item.fields.points_growth_global),
      lastUpdatedTime: decodeFromFieldsWithTypes('u64', item.fields.last_updated_time),
    })
  }

  static fromBcs(data: Uint8Array): RewarderManager {
    return RewarderManager.fromFields(RewarderManager.bcs.parse(data))
  }

  toJSONField(): RewarderManagerJSONField {
    return {
      rewarders: fieldToJSON<Vector<Rewarder>>(`vector<${Rewarder.$typeName}>`, this.rewarders),
      pointsReleased: this.pointsReleased.toString(),
      pointsGrowthGlobal: this.pointsGrowthGlobal.toString(),
      lastUpdatedTime: this.lastUpdatedTime.toString(),
    }
  }

  toJSON(): RewarderManagerJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewarderManager {
    return RewarderManager.reified().new({
      rewarders: decodeFromJSONField(vector(Rewarder.reified()), field.rewarders),
      pointsReleased: decodeFromJSONField('u128', field.pointsReleased),
      pointsGrowthGlobal: decodeFromJSONField('u128', field.pointsGrowthGlobal),
      lastUpdatedTime: decodeFromJSONField('u64', field.lastUpdatedTime),
    })
  }

  static fromJSON(json: Record<string, any>): RewarderManager {
    if (json.$typeName !== RewarderManager.$typeName) {
      throw new Error(
        `not a RewarderManager json object: expected '${RewarderManager.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RewarderManager.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RewarderManager {
    if (!isRewarderManager(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RewarderManager object`)
    }
    return RewarderManager.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewarderManager.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RewarderManager {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewarderManager(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewarderManager object`)
    }
    return RewarderManager.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewarderManager.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RewarderManager {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewarderManager(data.bcs.type)) {
        throw new Error(`object at is not a RewarderManager object`)
      }

      return RewarderManager.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewarderManager.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RewarderManager> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRewarderManager(object.type)) {
      throw new Error(`object at id ${id} is not a RewarderManager object`)
    }
    return RewarderManager.fromBcs(object.content)
  }
}

/* ============================== Rewarder =============================== */

export function isRewarder(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'rewarder::Rewarder')}::rewarder::Rewarder`
}

export interface RewarderFields {
  rewardCoin: ToField<TypeName>
  emissionsPerSecond: ToField<'u128'>
  growthGlobal: ToField<'u128'>
}

export type RewarderReified = Reified<Rewarder, RewarderFields>

export type RewarderJSONField = {
  rewardCoin: string
  emissionsPerSecond: string
  growthGlobal: string
}

export type RewarderJSON = {
  $typeName: typeof Rewarder.$typeName
  $typeArgs: []
} & RewarderJSONField

/**
 * Rewarder store the information of a rewarder.
 * * `reward_coin` - The type of reward coin
 * * `emissions_per_second` - The amount of reward coin emit per second
 * * `growth_global` - Q64.X64, is reward emited per liquidity
 */
export class Rewarder implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::rewarder::Rewarder` {
    return `${getTypeOrigin('cetus-clmm', 'rewarder::Rewarder')}::rewarder::Rewarder` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Rewarder.$typeName = Rewarder.$typeName
  readonly $fullTypeName: `${string}::rewarder::Rewarder`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Rewarder.$isPhantom = Rewarder.$isPhantom

  readonly rewardCoin: ToField<TypeName>
  readonly emissionsPerSecond: ToField<'u128'>
  readonly growthGlobal: ToField<'u128'>

  private constructor(typeArgs: [], fields: RewarderFields) {
    this.$fullTypeName = composeSuiType(
      Rewarder.$typeName,
      ...typeArgs,
    ) as `${string}::rewarder::Rewarder`
    this.$typeArgs = typeArgs

    this.rewardCoin = fields.rewardCoin
    this.emissionsPerSecond = fields.emissionsPerSecond
    this.growthGlobal = fields.growthGlobal
  }

  static reified(): RewarderReified {
    const reifiedBcs = Rewarder.bcs
    return {
      get typeName() {
        return Rewarder.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Rewarder.$typeName,
          ...[],
        ) as `${string}::rewarder::Rewarder`
      },
      typeArgs: [] as [],
      isPhantom: Rewarder.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Rewarder.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Rewarder.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Rewarder.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Rewarder.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Rewarder.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Rewarder.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Rewarder.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Rewarder.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Rewarder.fetch(client, id),
      new: (fields: RewarderFields) => {
        return new Rewarder([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RewarderReified {
    return Rewarder.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Rewarder>> {
    return phantom(Rewarder.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Rewarder>> {
    return Rewarder.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Rewarder', {
      reward_coin: TypeName.bcs,
      emissions_per_second: bcs.u128(),
      growth_global: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof Rewarder.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Rewarder.instantiateBcs> {
    if (!Rewarder.cachedBcs) {
      Rewarder.cachedBcs = Rewarder.instantiateBcs()
    }
    return Rewarder.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Rewarder {
    return Rewarder.reified().new({
      rewardCoin: decodeFromFields(TypeName.reified(), fields.reward_coin),
      emissionsPerSecond: decodeFromFields('u128', fields.emissions_per_second),
      growthGlobal: decodeFromFields('u128', fields.growth_global),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Rewarder {
    if (!isRewarder(item.type)) {
      throw new Error('not a Rewarder type')
    }

    return Rewarder.reified().new({
      rewardCoin: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_coin),
      emissionsPerSecond: decodeFromFieldsWithTypes('u128', item.fields.emissions_per_second),
      growthGlobal: decodeFromFieldsWithTypes('u128', item.fields.growth_global),
    })
  }

  static fromBcs(data: Uint8Array): Rewarder {
    return Rewarder.fromFields(Rewarder.bcs.parse(data))
  }

  toJSONField(): RewarderJSONField {
    return {
      rewardCoin: this.rewardCoin,
      emissionsPerSecond: this.emissionsPerSecond.toString(),
      growthGlobal: this.growthGlobal.toString(),
    }
  }

  toJSON(): RewarderJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Rewarder {
    return Rewarder.reified().new({
      rewardCoin: decodeFromJSONField(TypeName.reified(), field.rewardCoin),
      emissionsPerSecond: decodeFromJSONField('u128', field.emissionsPerSecond),
      growthGlobal: decodeFromJSONField('u128', field.growthGlobal),
    })
  }

  static fromJSON(json: Record<string, any>): Rewarder {
    if (json.$typeName !== Rewarder.$typeName) {
      throw new Error(
        `not a Rewarder json object: expected '${Rewarder.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Rewarder.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Rewarder {
    if (!isRewarder(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Rewarder object`)
    }
    return Rewarder.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Rewarder.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Rewarder {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewarder(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Rewarder object`)
    }
    return Rewarder.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Rewarder.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Rewarder {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewarder(data.bcs.type)) {
        throw new Error(`object at is not a Rewarder object`)
      }

      return Rewarder.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Rewarder.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Rewarder> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRewarder(object.type)) {
      throw new Error(`object at id ${id} is not a Rewarder object`)
    }
    return Rewarder.fromBcs(object.content)
  }
}

/* ============================== RewarderGlobalVault =============================== */

export function isRewarderGlobalVault(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'rewarder::RewarderGlobalVault')
    }::rewarder::RewarderGlobalVault`
}

export interface RewarderGlobalVaultFields {
  id: ToField<UID>
  balances: ToField<Bag>
}

export type RewarderGlobalVaultReified = Reified<RewarderGlobalVault, RewarderGlobalVaultFields>

export type RewarderGlobalVaultJSONField = {
  id: string
  balances: ToJSON<Bag>
}

export type RewarderGlobalVaultJSON = {
  $typeName: typeof RewarderGlobalVault.$typeName
  $typeArgs: []
} & RewarderGlobalVaultJSONField

/**
 * RewarderGlobalVault store the rewarder `Balance` in Bag globally.
 * * `id` - The unique identifier for this RewarderGlobalVault object
 * * `balances` - A bag storing the balances of the rewarders
 */
export class RewarderGlobalVault implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::rewarder::RewarderGlobalVault` {
    return `${
      getTypeOrigin('cetus-clmm', 'rewarder::RewarderGlobalVault')
    }::rewarder::RewarderGlobalVault` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RewarderGlobalVault.$typeName = RewarderGlobalVault.$typeName
  readonly $fullTypeName: `${string}::rewarder::RewarderGlobalVault`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RewarderGlobalVault.$isPhantom = RewarderGlobalVault.$isPhantom

  readonly id: ToField<UID>
  readonly balances: ToField<Bag>

  private constructor(typeArgs: [], fields: RewarderGlobalVaultFields) {
    this.$fullTypeName = composeSuiType(
      RewarderGlobalVault.$typeName,
      ...typeArgs,
    ) as `${string}::rewarder::RewarderGlobalVault`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.balances = fields.balances
  }

  static reified(): RewarderGlobalVaultReified {
    const reifiedBcs = RewarderGlobalVault.bcs
    return {
      get typeName() {
        return RewarderGlobalVault.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RewarderGlobalVault.$typeName,
          ...[],
        ) as `${string}::rewarder::RewarderGlobalVault`
      },
      typeArgs: [] as [],
      isPhantom: RewarderGlobalVault.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewarderGlobalVault.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewarderGlobalVault.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewarderGlobalVault.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewarderGlobalVault.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewarderGlobalVault.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RewarderGlobalVault.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RewarderGlobalVault.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewarderGlobalVault.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RewarderGlobalVault.fetch(client, id),
      new: (fields: RewarderGlobalVaultFields) => {
        return new RewarderGlobalVault([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RewarderGlobalVaultReified {
    return RewarderGlobalVault.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewarderGlobalVault>> {
    return phantom(RewarderGlobalVault.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RewarderGlobalVault>> {
    return RewarderGlobalVault.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewarderGlobalVault', {
      id: UID.bcs,
      balances: Bag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RewarderGlobalVault.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RewarderGlobalVault.instantiateBcs> {
    if (!RewarderGlobalVault.cachedBcs) {
      RewarderGlobalVault.cachedBcs = RewarderGlobalVault.instantiateBcs()
    }
    return RewarderGlobalVault.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewarderGlobalVault {
    return RewarderGlobalVault.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      balances: decodeFromFields(Bag.reified(), fields.balances),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewarderGlobalVault {
    if (!isRewarderGlobalVault(item.type)) {
      throw new Error('not a RewarderGlobalVault type')
    }

    return RewarderGlobalVault.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      balances: decodeFromFieldsWithTypes(Bag.reified(), item.fields.balances),
    })
  }

  static fromBcs(data: Uint8Array): RewarderGlobalVault {
    return RewarderGlobalVault.fromFields(RewarderGlobalVault.bcs.parse(data))
  }

  toJSONField(): RewarderGlobalVaultJSONField {
    return {
      id: this.id,
      balances: this.balances.toJSONField(),
    }
  }

  toJSON(): RewarderGlobalVaultJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewarderGlobalVault {
    return RewarderGlobalVault.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      balances: decodeFromJSONField(Bag.reified(), field.balances),
    })
  }

  static fromJSON(json: Record<string, any>): RewarderGlobalVault {
    if (json.$typeName !== RewarderGlobalVault.$typeName) {
      throw new Error(
        `not a RewarderGlobalVault json object: expected '${RewarderGlobalVault.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RewarderGlobalVault.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RewarderGlobalVault {
    if (!isRewarderGlobalVault(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RewarderGlobalVault object`)
    }
    return RewarderGlobalVault.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewarderGlobalVault.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RewarderGlobalVault {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewarderGlobalVault(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewarderGlobalVault object`)
    }
    return RewarderGlobalVault.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewarderGlobalVault.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RewarderGlobalVault {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewarderGlobalVault(data.bcs.type)) {
        throw new Error(`object at is not a RewarderGlobalVault object`)
      }

      return RewarderGlobalVault.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewarderGlobalVault.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RewarderGlobalVault> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRewarderGlobalVault(object.type)) {
      throw new Error(`object at id ${id} is not a RewarderGlobalVault object`)
    }
    return RewarderGlobalVault.fromBcs(object.content)
  }
}

/* ============================== RewarderInitEvent =============================== */

export function isRewarderInitEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'rewarder::RewarderInitEvent')}::rewarder::RewarderInitEvent`
}

export interface RewarderInitEventFields {
  globalVaultId: ToField<ID>
}

export type RewarderInitEventReified = Reified<RewarderInitEvent, RewarderInitEventFields>

export type RewarderInitEventJSONField = {
  globalVaultId: string
}

export type RewarderInitEventJSON = {
  $typeName: typeof RewarderInitEvent.$typeName
  $typeArgs: []
} & RewarderInitEventJSONField

/**
 * Emit when `RewarderManager` is initialized.
 * * `global_vault_id` - The unique identifier for this RewarderGlobalVault object
 */
export class RewarderInitEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::rewarder::RewarderInitEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'rewarder::RewarderInitEvent')
    }::rewarder::RewarderInitEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RewarderInitEvent.$typeName = RewarderInitEvent.$typeName
  readonly $fullTypeName: `${string}::rewarder::RewarderInitEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RewarderInitEvent.$isPhantom = RewarderInitEvent.$isPhantom

  readonly globalVaultId: ToField<ID>

  private constructor(typeArgs: [], fields: RewarderInitEventFields) {
    this.$fullTypeName = composeSuiType(
      RewarderInitEvent.$typeName,
      ...typeArgs,
    ) as `${string}::rewarder::RewarderInitEvent`
    this.$typeArgs = typeArgs

    this.globalVaultId = fields.globalVaultId
  }

  static reified(): RewarderInitEventReified {
    const reifiedBcs = RewarderInitEvent.bcs
    return {
      get typeName() {
        return RewarderInitEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RewarderInitEvent.$typeName,
          ...[],
        ) as `${string}::rewarder::RewarderInitEvent`
      },
      typeArgs: [] as [],
      isPhantom: RewarderInitEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewarderInitEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewarderInitEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewarderInitEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RewarderInitEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewarderInitEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RewarderInitEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RewarderInitEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewarderInitEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RewarderInitEvent.fetch(client, id),
      new: (fields: RewarderInitEventFields) => {
        return new RewarderInitEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RewarderInitEventReified {
    return RewarderInitEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewarderInitEvent>> {
    return phantom(RewarderInitEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RewarderInitEvent>> {
    return RewarderInitEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RewarderInitEvent', {
      global_vault_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RewarderInitEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RewarderInitEvent.instantiateBcs> {
    if (!RewarderInitEvent.cachedBcs) {
      RewarderInitEvent.cachedBcs = RewarderInitEvent.instantiateBcs()
    }
    return RewarderInitEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RewarderInitEvent {
    return RewarderInitEvent.reified().new({
      globalVaultId: decodeFromFields(ID.reified(), fields.global_vault_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewarderInitEvent {
    if (!isRewarderInitEvent(item.type)) {
      throw new Error('not a RewarderInitEvent type')
    }

    return RewarderInitEvent.reified().new({
      globalVaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.global_vault_id),
    })
  }

  static fromBcs(data: Uint8Array): RewarderInitEvent {
    return RewarderInitEvent.fromFields(RewarderInitEvent.bcs.parse(data))
  }

  toJSONField(): RewarderInitEventJSONField {
    return {
      globalVaultId: this.globalVaultId,
    }
  }

  toJSON(): RewarderInitEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewarderInitEvent {
    return RewarderInitEvent.reified().new({
      globalVaultId: decodeFromJSONField(ID.reified(), field.globalVaultId),
    })
  }

  static fromJSON(json: Record<string, any>): RewarderInitEvent {
    if (json.$typeName !== RewarderInitEvent.$typeName) {
      throw new Error(
        `not a RewarderInitEvent json object: expected '${RewarderInitEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RewarderInitEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RewarderInitEvent {
    if (!isRewarderInitEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RewarderInitEvent object`)
    }
    return RewarderInitEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewarderInitEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RewarderInitEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewarderInitEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewarderInitEvent object`)
    }
    return RewarderInitEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RewarderInitEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RewarderInitEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewarderInitEvent(data.bcs.type)) {
        throw new Error(`object at is not a RewarderInitEvent object`)
      }

      return RewarderInitEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewarderInitEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RewarderInitEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRewarderInitEvent(object.type)) {
      throw new Error(`object at id ${id} is not a RewarderInitEvent object`)
    }
    return RewarderInitEvent.fromBcs(object.content)
  }
}

/* ============================== DepositEvent =============================== */

export function isDepositEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'rewarder::DepositEvent')}::rewarder::DepositEvent`
}

export interface DepositEventFields {
  rewardType: ToField<TypeName>
  depositAmount: ToField<'u64'>
  afterAmount: ToField<'u64'>
}

export type DepositEventReified = Reified<DepositEvent, DepositEventFields>

export type DepositEventJSONField = {
  rewardType: string
  depositAmount: string
  afterAmount: string
}

export type DepositEventJSON = {
  $typeName: typeof DepositEvent.$typeName
  $typeArgs: []
} & DepositEventJSONField

/**
 * Emit when deposit reward.
 * * `reward_type` - The type of reward coin
 * * `deposit_amount` - The amount of reward coin deposited
 * * `after_amount` - The amount of reward coin after deposit
 */
export class DepositEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::rewarder::DepositEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'rewarder::DepositEvent')
    }::rewarder::DepositEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DepositEvent.$typeName = DepositEvent.$typeName
  readonly $fullTypeName: `${string}::rewarder::DepositEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DepositEvent.$isPhantom = DepositEvent.$isPhantom

  readonly rewardType: ToField<TypeName>
  readonly depositAmount: ToField<'u64'>
  readonly afterAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: DepositEventFields) {
    this.$fullTypeName = composeSuiType(
      DepositEvent.$typeName,
      ...typeArgs,
    ) as `${string}::rewarder::DepositEvent`
    this.$typeArgs = typeArgs

    this.rewardType = fields.rewardType
    this.depositAmount = fields.depositAmount
    this.afterAmount = fields.afterAmount
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
        ) as `${string}::rewarder::DepositEvent`
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
      reward_type: TypeName.bcs,
      deposit_amount: bcs.u64(),
      after_amount: bcs.u64(),
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
      rewardType: decodeFromFields(TypeName.reified(), fields.reward_type),
      depositAmount: decodeFromFields('u64', fields.deposit_amount),
      afterAmount: decodeFromFields('u64', fields.after_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DepositEvent {
    if (!isDepositEvent(item.type)) {
      throw new Error('not a DepositEvent type')
    }

    return DepositEvent.reified().new({
      rewardType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_type),
      depositAmount: decodeFromFieldsWithTypes('u64', item.fields.deposit_amount),
      afterAmount: decodeFromFieldsWithTypes('u64', item.fields.after_amount),
    })
  }

  static fromBcs(data: Uint8Array): DepositEvent {
    return DepositEvent.fromFields(DepositEvent.bcs.parse(data))
  }

  toJSONField(): DepositEventJSONField {
    return {
      rewardType: this.rewardType,
      depositAmount: this.depositAmount.toString(),
      afterAmount: this.afterAmount.toString(),
    }
  }

  toJSON(): DepositEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DepositEvent {
    return DepositEvent.reified().new({
      rewardType: decodeFromJSONField(TypeName.reified(), field.rewardType),
      depositAmount: decodeFromJSONField('u64', field.depositAmount),
      afterAmount: decodeFromJSONField('u64', field.afterAmount),
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

/* ============================== EmergentWithdrawEvent =============================== */

export function isEmergentWithdrawEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'rewarder::EmergentWithdrawEvent')
    }::rewarder::EmergentWithdrawEvent`
}

export interface EmergentWithdrawEventFields {
  rewardType: ToField<TypeName>
  withdrawAmount: ToField<'u64'>
  afterAmount: ToField<'u64'>
}

export type EmergentWithdrawEventReified = Reified<
  EmergentWithdrawEvent,
  EmergentWithdrawEventFields
>

export type EmergentWithdrawEventJSONField = {
  rewardType: string
  withdrawAmount: string
  afterAmount: string
}

export type EmergentWithdrawEventJSON = {
  $typeName: typeof EmergentWithdrawEvent.$typeName
  $typeArgs: []
} & EmergentWithdrawEventJSONField

/**
 * Emit when withdraw reward.
 * * `reward_type` - The type of reward coin
 * * `withdraw_amount` - The amount of reward coin withdrawn
 * * `after_amount` - The amount of reward coin after withdrawal
 */
export class EmergentWithdrawEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::rewarder::EmergentWithdrawEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'rewarder::EmergentWithdrawEvent')
    }::rewarder::EmergentWithdrawEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof EmergentWithdrawEvent.$typeName = EmergentWithdrawEvent.$typeName
  readonly $fullTypeName: `${string}::rewarder::EmergentWithdrawEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof EmergentWithdrawEvent.$isPhantom = EmergentWithdrawEvent.$isPhantom

  readonly rewardType: ToField<TypeName>
  readonly withdrawAmount: ToField<'u64'>
  readonly afterAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: EmergentWithdrawEventFields) {
    this.$fullTypeName = composeSuiType(
      EmergentWithdrawEvent.$typeName,
      ...typeArgs,
    ) as `${string}::rewarder::EmergentWithdrawEvent`
    this.$typeArgs = typeArgs

    this.rewardType = fields.rewardType
    this.withdrawAmount = fields.withdrawAmount
    this.afterAmount = fields.afterAmount
  }

  static reified(): EmergentWithdrawEventReified {
    const reifiedBcs = EmergentWithdrawEvent.bcs
    return {
      get typeName() {
        return EmergentWithdrawEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          EmergentWithdrawEvent.$typeName,
          ...[],
        ) as `${string}::rewarder::EmergentWithdrawEvent`
      },
      typeArgs: [] as [],
      isPhantom: EmergentWithdrawEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => EmergentWithdrawEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        EmergentWithdrawEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => EmergentWithdrawEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => EmergentWithdrawEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => EmergentWithdrawEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        EmergentWithdrawEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        EmergentWithdrawEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        EmergentWithdrawEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        EmergentWithdrawEvent.fetch(client, id),
      new: (fields: EmergentWithdrawEventFields) => {
        return new EmergentWithdrawEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): EmergentWithdrawEventReified {
    return EmergentWithdrawEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<EmergentWithdrawEvent>> {
    return phantom(EmergentWithdrawEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<EmergentWithdrawEvent>> {
    return EmergentWithdrawEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('EmergentWithdrawEvent', {
      reward_type: TypeName.bcs,
      withdraw_amount: bcs.u64(),
      after_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof EmergentWithdrawEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof EmergentWithdrawEvent.instantiateBcs> {
    if (!EmergentWithdrawEvent.cachedBcs) {
      EmergentWithdrawEvent.cachedBcs = EmergentWithdrawEvent.instantiateBcs()
    }
    return EmergentWithdrawEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): EmergentWithdrawEvent {
    return EmergentWithdrawEvent.reified().new({
      rewardType: decodeFromFields(TypeName.reified(), fields.reward_type),
      withdrawAmount: decodeFromFields('u64', fields.withdraw_amount),
      afterAmount: decodeFromFields('u64', fields.after_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): EmergentWithdrawEvent {
    if (!isEmergentWithdrawEvent(item.type)) {
      throw new Error('not a EmergentWithdrawEvent type')
    }

    return EmergentWithdrawEvent.reified().new({
      rewardType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_type),
      withdrawAmount: decodeFromFieldsWithTypes('u64', item.fields.withdraw_amount),
      afterAmount: decodeFromFieldsWithTypes('u64', item.fields.after_amount),
    })
  }

  static fromBcs(data: Uint8Array): EmergentWithdrawEvent {
    return EmergentWithdrawEvent.fromFields(EmergentWithdrawEvent.bcs.parse(data))
  }

  toJSONField(): EmergentWithdrawEventJSONField {
    return {
      rewardType: this.rewardType,
      withdrawAmount: this.withdrawAmount.toString(),
      afterAmount: this.afterAmount.toString(),
    }
  }

  toJSON(): EmergentWithdrawEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): EmergentWithdrawEvent {
    return EmergentWithdrawEvent.reified().new({
      rewardType: decodeFromJSONField(TypeName.reified(), field.rewardType),
      withdrawAmount: decodeFromJSONField('u64', field.withdrawAmount),
      afterAmount: decodeFromJSONField('u64', field.afterAmount),
    })
  }

  static fromJSON(json: Record<string, any>): EmergentWithdrawEvent {
    if (json.$typeName !== EmergentWithdrawEvent.$typeName) {
      throw new Error(
        `not a EmergentWithdrawEvent json object: expected '${EmergentWithdrawEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return EmergentWithdrawEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): EmergentWithdrawEvent {
    if (!isEmergentWithdrawEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a EmergentWithdrawEvent object`)
    }
    return EmergentWithdrawEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EmergentWithdrawEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): EmergentWithdrawEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEmergentWithdrawEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a EmergentWithdrawEvent object`,
      )
    }
    return EmergentWithdrawEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EmergentWithdrawEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): EmergentWithdrawEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEmergentWithdrawEvent(data.bcs.type)) {
        throw new Error(`object at is not a EmergentWithdrawEvent object`)
      }

      return EmergentWithdrawEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EmergentWithdrawEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<EmergentWithdrawEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEmergentWithdrawEvent(object.type)) {
      throw new Error(`object at id ${id} is not a EmergentWithdrawEvent object`)
    }
    return EmergentWithdrawEvent.fromBcs(object.content)
  }
}
