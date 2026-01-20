import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { LinkedTable } from '../../_dependencies/move-stl/linked-table/structs'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  ToTypeStr as ToPhantom,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { String } from '../../std/string/structs'
import { TypeName } from '../../std/type-name/structs'
import { ID, UID } from '../../sui/object/structs'
import { Table } from '../../sui/table/structs'
import { VecSet } from '../../sui/vec-set/structs'

/* ============================== PoolSimpleInfo =============================== */

export function isPoolSimpleInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'factory::PoolSimpleInfo')}::factory::PoolSimpleInfo`
}

export interface PoolSimpleInfoFields {
  poolId: ToField<ID>
  poolKey: ToField<ID>
  coinTypeA: ToField<TypeName>
  coinTypeB: ToField<TypeName>
  tickSpacing: ToField<'u32'>
}

export type PoolSimpleInfoReified = Reified<PoolSimpleInfo, PoolSimpleInfoFields>

export type PoolSimpleInfoJSONField = {
  poolId: string
  poolKey: string
  coinTypeA: string
  coinTypeB: string
  tickSpacing: number
}

export type PoolSimpleInfoJSON = {
  $typeName: typeof PoolSimpleInfo.$typeName
  $typeArgs: []
} & PoolSimpleInfoJSONField

/**
 * Struct containing basic information about a pool
 * * `pool_id` - The unique identifier of the pool
 * * `pool_key` - The unique identifier of the pool configuration
 * * `coin_type_a` - The type name of the first coin in the pool
 * * `coin_type_b` - The type name of the second coin in the pool
 * * `tick_spacing` - The tick spacing used for price discretization in the pool
 */
export class PoolSimpleInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::PoolSimpleInfo` = `${
    getTypeOrigin('cetus-clmm', 'factory::PoolSimpleInfo')
  }::factory::PoolSimpleInfo` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PoolSimpleInfo.$typeName = PoolSimpleInfo.$typeName
  readonly $fullTypeName: `${string}::factory::PoolSimpleInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PoolSimpleInfo.$isPhantom = PoolSimpleInfo.$isPhantom

  readonly poolId: ToField<ID>
  readonly poolKey: ToField<ID>
  readonly coinTypeA: ToField<TypeName>
  readonly coinTypeB: ToField<TypeName>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: PoolSimpleInfoFields) {
    this.$fullTypeName = composeSuiType(
      PoolSimpleInfo.$typeName,
      ...typeArgs,
    ) as `${string}::factory::PoolSimpleInfo`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.poolKey = fields.poolKey
    this.coinTypeA = fields.coinTypeA
    this.coinTypeB = fields.coinTypeB
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): PoolSimpleInfoReified {
    const reifiedBcs = PoolSimpleInfo.bcs
    return {
      typeName: PoolSimpleInfo.$typeName,
      fullTypeName: composeSuiType(
        PoolSimpleInfo.$typeName,
        ...[],
      ) as `${string}::factory::PoolSimpleInfo`,
      typeArgs: [] as [],
      isPhantom: PoolSimpleInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolSimpleInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolSimpleInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolSimpleInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolSimpleInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolSimpleInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolSimpleInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolSimpleInfo.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PoolSimpleInfo.fetch(client, id),
      new: (fields: PoolSimpleInfoFields) => {
        return new PoolSimpleInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PoolSimpleInfoReified {
    return PoolSimpleInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolSimpleInfo>> {
    return phantom(PoolSimpleInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PoolSimpleInfo>> {
    return PoolSimpleInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolSimpleInfo', {
      pool_id: ID.bcs,
      pool_key: ID.bcs,
      coin_type_a: TypeName.bcs,
      coin_type_b: TypeName.bcs,
      tick_spacing: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolSimpleInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolSimpleInfo.instantiateBcs> {
    if (!PoolSimpleInfo.cachedBcs) {
      PoolSimpleInfo.cachedBcs = PoolSimpleInfo.instantiateBcs()
    }
    return PoolSimpleInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolSimpleInfo {
    return PoolSimpleInfo.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      poolKey: decodeFromFields(ID.reified(), fields.pool_key),
      coinTypeA: decodeFromFields(TypeName.reified(), fields.coin_type_a),
      coinTypeB: decodeFromFields(TypeName.reified(), fields.coin_type_b),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolSimpleInfo {
    if (!isPoolSimpleInfo(item.type)) {
      throw new Error('not a PoolSimpleInfo type')
    }

    return PoolSimpleInfo.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      poolKey: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_key),
      coinTypeA: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_a),
      coinTypeB: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type_b),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): PoolSimpleInfo {
    return PoolSimpleInfo.fromFields(PoolSimpleInfo.bcs.parse(data))
  }

  toJSONField(): PoolSimpleInfoJSONField {
    return {
      poolId: this.poolId,
      poolKey: this.poolKey,
      coinTypeA: this.coinTypeA,
      coinTypeB: this.coinTypeB,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON(): PoolSimpleInfoJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolSimpleInfo {
    return PoolSimpleInfo.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      poolKey: decodeFromJSONField(ID.reified(), field.poolKey),
      coinTypeA: decodeFromJSONField(TypeName.reified(), field.coinTypeA),
      coinTypeB: decodeFromJSONField(TypeName.reified(), field.coinTypeB),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON(json: Record<string, any>): PoolSimpleInfo {
    if (json.$typeName !== PoolSimpleInfo.$typeName) {
      throw new Error(
        `not a PoolSimpleInfo json object: expected '${PoolSimpleInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PoolSimpleInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolSimpleInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolSimpleInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolSimpleInfo object`)
    }
    return PoolSimpleInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolSimpleInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolSimpleInfo(data.bcs.type)) {
        throw new Error(`object at is not a PoolSimpleInfo object`)
      }

      return PoolSimpleInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolSimpleInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PoolSimpleInfo> {
    const res = await fetchObjectBcs(client, id)
    if (!isPoolSimpleInfo(res.type)) {
      throw new Error(`object at id ${id} is not a PoolSimpleInfo object`)
    }

    return PoolSimpleInfo.fromBcs(res.bcsBytes)
  }
}

/* ============================== Pools =============================== */

export function isPools(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'factory::Pools')}::factory::Pools`
}

export interface PoolsFields {
  id: ToField<UID>
  list: ToField<LinkedTable<ID, ToPhantom<PoolSimpleInfo>>>
  index: ToField<'u64'>
}

export type PoolsReified = Reified<Pools, PoolsFields>

export type PoolsJSONField = {
  id: string
  list: ToJSON<LinkedTable<ID, ToPhantom<PoolSimpleInfo>>>
  index: string
}

export type PoolsJSON = {
  $typeName: typeof Pools.$typeName
  $typeArgs: []
} & PoolsJSONField

/**
 * Holds the pool list, organized as a linked list.
 * `index` tracks the highest index used by pools.
 */
export class Pools implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::Pools` = `${
    getTypeOrigin('cetus-clmm', 'factory::Pools')
  }::factory::Pools` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Pools.$typeName = Pools.$typeName
  readonly $fullTypeName: `${string}::factory::Pools`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Pools.$isPhantom = Pools.$isPhantom

  readonly id: ToField<UID>
  readonly list: ToField<LinkedTable<ID, ToPhantom<PoolSimpleInfo>>>
  readonly index: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolsFields) {
    this.$fullTypeName = composeSuiType(
      Pools.$typeName,
      ...typeArgs,
    ) as `${string}::factory::Pools`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.list = fields.list
    this.index = fields.index
  }

  static reified(): PoolsReified {
    const reifiedBcs = Pools.bcs
    return {
      typeName: Pools.$typeName,
      fullTypeName: composeSuiType(
        Pools.$typeName,
        ...[],
      ) as `${string}::factory::Pools`,
      typeArgs: [] as [],
      isPhantom: Pools.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Pools.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Pools.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Pools.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Pools.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Pools.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Pools.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Pools.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Pools.fetch(client, id),
      new: (fields: PoolsFields) => {
        return new Pools([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PoolsReified {
    return Pools.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Pools>> {
    return phantom(Pools.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Pools>> {
    return Pools.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Pools', {
      id: UID.bcs,
      list: LinkedTable.bcs(ID.bcs),
      index: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Pools.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Pools.instantiateBcs> {
    if (!Pools.cachedBcs) {
      Pools.cachedBcs = Pools.instantiateBcs()
    }
    return Pools.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Pools {
    return Pools.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      list: decodeFromFields(
        LinkedTable.reified(ID.reified(), phantom(PoolSimpleInfo.reified())),
        fields.list,
      ),
      index: decodeFromFields('u64', fields.index),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Pools {
    if (!isPools(item.type)) {
      throw new Error('not a Pools type')
    }

    return Pools.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      list: decodeFromFieldsWithTypes(
        LinkedTable.reified(ID.reified(), phantom(PoolSimpleInfo.reified())),
        item.fields.list,
      ),
      index: decodeFromFieldsWithTypes('u64', item.fields.index),
    })
  }

  static fromBcs(data: Uint8Array): Pools {
    return Pools.fromFields(Pools.bcs.parse(data))
  }

  toJSONField(): PoolsJSONField {
    return {
      id: this.id,
      list: this.list.toJSONField(),
      index: this.index.toString(),
    }
  }

  toJSON(): PoolsJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Pools {
    return Pools.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      list: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), phantom(PoolSimpleInfo.reified())),
        field.list,
      ),
      index: decodeFromJSONField('u64', field.index),
    })
  }

  static fromJSON(json: Record<string, any>): Pools {
    if (json.$typeName !== Pools.$typeName) {
      throw new Error(
        `not a Pools json object: expected '${Pools.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Pools.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Pools {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPools(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Pools object`)
    }
    return Pools.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Pools {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPools(data.bcs.type)) {
        throw new Error(`object at is not a Pools object`)
      }

      return Pools.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Pools.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Pools> {
    const res = await fetchObjectBcs(client, id)
    if (!isPools(res.type)) {
      throw new Error(`object at id ${id} is not a Pools object`)
    }

    return Pools.fromBcs(res.bcsBytes)
  }
}

/* ============================== DenyCoinList =============================== */

export function isDenyCoinList(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'factory::DenyCoinList')}::factory::DenyCoinList`
}

export interface DenyCoinListFields {
  id: ToField<UID>
  deniedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
  allowedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
}

export type DenyCoinListReified = Reified<DenyCoinList, DenyCoinListFields>

export type DenyCoinListJSONField = {
  id: string
  deniedList: ToJSON<Table<ToPhantom<TypeName>, 'bool'>>
  allowedList: ToJSON<Table<ToPhantom<TypeName>, 'bool'>>
}

export type DenyCoinListJSON = {
  $typeName: typeof DenyCoinList.$typeName
  $typeArgs: []
} & DenyCoinListJSONField

/**
 * Manages a list of denied coin types
 * * `id` - The unique identifier for this list
 * * `denied_list` - A table mapping coin types to boolean values indicating if they are denied
 * * `allowed_list` - A table mapping coin types to boolean values indicating if they are allowed
 */
export class DenyCoinList implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::DenyCoinList` = `${
    getTypeOrigin('cetus-clmm', 'factory::DenyCoinList')
  }::factory::DenyCoinList` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DenyCoinList.$typeName = DenyCoinList.$typeName
  readonly $fullTypeName: `${string}::factory::DenyCoinList`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DenyCoinList.$isPhantom = DenyCoinList.$isPhantom

  readonly id: ToField<UID>
  readonly deniedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
  readonly allowedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>

  private constructor(typeArgs: [], fields: DenyCoinListFields) {
    this.$fullTypeName = composeSuiType(
      DenyCoinList.$typeName,
      ...typeArgs,
    ) as `${string}::factory::DenyCoinList`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.deniedList = fields.deniedList
    this.allowedList = fields.allowedList
  }

  static reified(): DenyCoinListReified {
    const reifiedBcs = DenyCoinList.bcs
    return {
      typeName: DenyCoinList.$typeName,
      fullTypeName: composeSuiType(
        DenyCoinList.$typeName,
        ...[],
      ) as `${string}::factory::DenyCoinList`,
      typeArgs: [] as [],
      isPhantom: DenyCoinList.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DenyCoinList.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DenyCoinList.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DenyCoinList.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DenyCoinList.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DenyCoinList.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DenyCoinList.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DenyCoinList.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => DenyCoinList.fetch(client, id),
      new: (fields: DenyCoinListFields) => {
        return new DenyCoinList([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DenyCoinListReified {
    return DenyCoinList.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DenyCoinList>> {
    return phantom(DenyCoinList.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DenyCoinList>> {
    return DenyCoinList.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DenyCoinList', {
      id: UID.bcs,
      denied_list: Table.bcs,
      allowed_list: Table.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DenyCoinList.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DenyCoinList.instantiateBcs> {
    if (!DenyCoinList.cachedBcs) {
      DenyCoinList.cachedBcs = DenyCoinList.instantiateBcs()
    }
    return DenyCoinList.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DenyCoinList {
    return DenyCoinList.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      deniedList: decodeFromFields(
        Table.reified(phantom(TypeName.reified()), phantom('bool')),
        fields.denied_list,
      ),
      allowedList: decodeFromFields(
        Table.reified(phantom(TypeName.reified()), phantom('bool')),
        fields.allowed_list,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DenyCoinList {
    if (!isDenyCoinList(item.type)) {
      throw new Error('not a DenyCoinList type')
    }

    return DenyCoinList.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      deniedList: decodeFromFieldsWithTypes(
        Table.reified(phantom(TypeName.reified()), phantom('bool')),
        item.fields.denied_list,
      ),
      allowedList: decodeFromFieldsWithTypes(
        Table.reified(phantom(TypeName.reified()), phantom('bool')),
        item.fields.allowed_list,
      ),
    })
  }

  static fromBcs(data: Uint8Array): DenyCoinList {
    return DenyCoinList.fromFields(DenyCoinList.bcs.parse(data))
  }

  toJSONField(): DenyCoinListJSONField {
    return {
      id: this.id,
      deniedList: this.deniedList.toJSONField(),
      allowedList: this.allowedList.toJSONField(),
    }
  }

  toJSON(): DenyCoinListJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DenyCoinList {
    return DenyCoinList.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      deniedList: decodeFromJSONField(
        Table.reified(phantom(TypeName.reified()), phantom('bool')),
        field.deniedList,
      ),
      allowedList: decodeFromJSONField(
        Table.reified(phantom(TypeName.reified()), phantom('bool')),
        field.allowedList,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): DenyCoinList {
    if (json.$typeName !== DenyCoinList.$typeName) {
      throw new Error(
        `not a DenyCoinList json object: expected '${DenyCoinList.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DenyCoinList.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DenyCoinList {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDenyCoinList(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DenyCoinList object`)
    }
    return DenyCoinList.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DenyCoinList {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDenyCoinList(data.bcs.type)) {
        throw new Error(`object at is not a DenyCoinList object`)
      }

      return DenyCoinList.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DenyCoinList.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<DenyCoinList> {
    const res = await fetchObjectBcs(client, id)
    if (!isDenyCoinList(res.type)) {
      throw new Error(`object at id ${id} is not a DenyCoinList object`)
    }

    return DenyCoinList.fromBcs(res.bcsBytes)
  }
}

/* ============================== PoolKey =============================== */

export function isPoolKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'factory::PoolKey')}::factory::PoolKey`
}

export interface PoolKeyFields {
  coinA: ToField<TypeName>
  coinB: ToField<TypeName>
  tickSpacing: ToField<'u32'>
}

export type PoolKeyReified = Reified<PoolKey, PoolKeyFields>

export type PoolKeyJSONField = {
  coinA: string
  coinB: string
  tickSpacing: number
}

export type PoolKeyJSON = {
  $typeName: typeof PoolKey.$typeName
  $typeArgs: []
} & PoolKeyJSONField

/**
 * Represents a unique pool configuration
 * * `coin_a` - The type name of the first coin in the pool
 * * `coin_b` - The type name of the second coin in the pool
 * * `tick_spacing` - The tick spacing used for price discretization in the pool
 */
export class PoolKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::PoolKey` = `${
    getTypeOrigin('cetus-clmm', 'factory::PoolKey')
  }::factory::PoolKey` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PoolKey.$typeName = PoolKey.$typeName
  readonly $fullTypeName: `${string}::factory::PoolKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PoolKey.$isPhantom = PoolKey.$isPhantom

  readonly coinA: ToField<TypeName>
  readonly coinB: ToField<TypeName>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: PoolKeyFields) {
    this.$fullTypeName = composeSuiType(
      PoolKey.$typeName,
      ...typeArgs,
    ) as `${string}::factory::PoolKey`
    this.$typeArgs = typeArgs

    this.coinA = fields.coinA
    this.coinB = fields.coinB
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): PoolKeyReified {
    const reifiedBcs = PoolKey.bcs
    return {
      typeName: PoolKey.$typeName,
      fullTypeName: composeSuiType(
        PoolKey.$typeName,
        ...[],
      ) as `${string}::factory::PoolKey`,
      typeArgs: [] as [],
      isPhantom: PoolKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolKey.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PoolKey.fetch(client, id),
      new: (fields: PoolKeyFields) => {
        return new PoolKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PoolKeyReified {
    return PoolKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolKey>> {
    return phantom(PoolKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PoolKey>> {
    return PoolKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolKey', {
      coin_a: TypeName.bcs,
      coin_b: TypeName.bcs,
      tick_spacing: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof PoolKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolKey.instantiateBcs> {
    if (!PoolKey.cachedBcs) {
      PoolKey.cachedBcs = PoolKey.instantiateBcs()
    }
    return PoolKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolKey {
    return PoolKey.reified().new({
      coinA: decodeFromFields(TypeName.reified(), fields.coin_a),
      coinB: decodeFromFields(TypeName.reified(), fields.coin_b),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolKey {
    if (!isPoolKey(item.type)) {
      throw new Error('not a PoolKey type')
    }

    return PoolKey.reified().new({
      coinA: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_a),
      coinB: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_b),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): PoolKey {
    return PoolKey.fromFields(PoolKey.bcs.parse(data))
  }

  toJSONField(): PoolKeyJSONField {
    return {
      coinA: this.coinA,
      coinB: this.coinB,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON(): PoolKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolKey {
    return PoolKey.reified().new({
      coinA: decodeFromJSONField(TypeName.reified(), field.coinA),
      coinB: decodeFromJSONField(TypeName.reified(), field.coinB),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON(json: Record<string, any>): PoolKey {
    if (json.$typeName !== PoolKey.$typeName) {
      throw new Error(
        `not a PoolKey json object: expected '${PoolKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PoolKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolKey object`)
    }
    return PoolKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolKey(data.bcs.type)) {
        throw new Error(`object at is not a PoolKey object`)
      }

      return PoolKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PoolKey> {
    const res = await fetchObjectBcs(client, id)
    if (!isPoolKey(res.type)) {
      throw new Error(`object at id ${id} is not a PoolKey object`)
    }

    return PoolKey.fromBcs(res.bcsBytes)
  }
}

/* ============================== PermissionPairManager =============================== */

export function isPermissionPairManager(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::PermissionPairManager')
    }::factory::PermissionPairManager`
}

export interface PermissionPairManagerFields {
  id: ToField<UID>
  allowedPairConfig: ToField<Table<ToPhantom<TypeName>, ToPhantom<VecSet<'u32'>>>>
  poolKeyToCap: ToField<Table<ToPhantom<ID>, ToPhantom<ID>>>
  capToPoolKey: ToField<Table<ToPhantom<ID>, ToPhantom<Table<ToPhantom<ID>, ToPhantom<PoolKey>>>>>
  coinTypeToCap: ToField<Table<ToPhantom<TypeName>, ToPhantom<ID>>>
}

export type PermissionPairManagerReified = Reified<
  PermissionPairManager,
  PermissionPairManagerFields
>

export type PermissionPairManagerJSONField = {
  id: string
  allowedPairConfig: ToJSON<Table<ToPhantom<TypeName>, ToPhantom<VecSet<'u32'>>>>
  poolKeyToCap: ToJSON<Table<ToPhantom<ID>, ToPhantom<ID>>>
  capToPoolKey: ToJSON<Table<ToPhantom<ID>, ToPhantom<Table<ToPhantom<ID>, ToPhantom<PoolKey>>>>>
  coinTypeToCap: ToJSON<Table<ToPhantom<TypeName>, ToPhantom<ID>>>
}

export type PermissionPairManagerJSON = {
  $typeName: typeof PermissionPairManager.$typeName
  $typeArgs: []
} & PermissionPairManagerJSONField

/**
 * Manages permission pairs for pool creation
 * * `id` - The unique identifier for this manager
 * * `allowed_pair_config` - A table mapping coin types to sets of allowed tick spacings
 * * `pool_key_to_cap` - A table mapping pool keys to their corresponding creation caps
 * * `cap_to_pool_key` - A table mapping creation caps to their corresponding pool keys
 * * `coin_type_to_cap` - A table mapping coin types to their corresponding creation caps
 */
export class PermissionPairManager implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::PermissionPairManager` = `${
    getTypeOrigin('cetus-clmm', 'factory::PermissionPairManager')
  }::factory::PermissionPairManager` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PermissionPairManager.$typeName = PermissionPairManager.$typeName
  readonly $fullTypeName: `${string}::factory::PermissionPairManager`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PermissionPairManager.$isPhantom = PermissionPairManager.$isPhantom

  readonly id: ToField<UID>
  readonly allowedPairConfig: ToField<Table<ToPhantom<TypeName>, ToPhantom<VecSet<'u32'>>>>
  readonly poolKeyToCap: ToField<Table<ToPhantom<ID>, ToPhantom<ID>>>
  readonly capToPoolKey: ToField<
    Table<ToPhantom<ID>, ToPhantom<Table<ToPhantom<ID>, ToPhantom<PoolKey>>>>
  >
  readonly coinTypeToCap: ToField<Table<ToPhantom<TypeName>, ToPhantom<ID>>>

  private constructor(typeArgs: [], fields: PermissionPairManagerFields) {
    this.$fullTypeName = composeSuiType(
      PermissionPairManager.$typeName,
      ...typeArgs,
    ) as `${string}::factory::PermissionPairManager`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.allowedPairConfig = fields.allowedPairConfig
    this.poolKeyToCap = fields.poolKeyToCap
    this.capToPoolKey = fields.capToPoolKey
    this.coinTypeToCap = fields.coinTypeToCap
  }

  static reified(): PermissionPairManagerReified {
    const reifiedBcs = PermissionPairManager.bcs
    return {
      typeName: PermissionPairManager.$typeName,
      fullTypeName: composeSuiType(
        PermissionPairManager.$typeName,
        ...[],
      ) as `${string}::factory::PermissionPairManager`,
      typeArgs: [] as [],
      isPhantom: PermissionPairManager.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PermissionPairManager.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PermissionPairManager.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PermissionPairManager.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PermissionPairManager.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PermissionPairManager.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PermissionPairManager.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PermissionPairManager.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        PermissionPairManager.fetch(client, id),
      new: (fields: PermissionPairManagerFields) => {
        return new PermissionPairManager([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PermissionPairManagerReified {
    return PermissionPairManager.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PermissionPairManager>> {
    return phantom(PermissionPairManager.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PermissionPairManager>> {
    return PermissionPairManager.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PermissionPairManager', {
      id: UID.bcs,
      allowed_pair_config: Table.bcs,
      pool_key_to_cap: Table.bcs,
      cap_to_pool_key: Table.bcs,
      coin_type_to_cap: Table.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PermissionPairManager.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PermissionPairManager.instantiateBcs> {
    if (!PermissionPairManager.cachedBcs) {
      PermissionPairManager.cachedBcs = PermissionPairManager.instantiateBcs()
    }
    return PermissionPairManager.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PermissionPairManager {
    return PermissionPairManager.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      allowedPairConfig: decodeFromFields(
        Table.reified(phantom(TypeName.reified()), phantom(VecSet.reified('u32'))),
        fields.allowed_pair_config,
      ),
      poolKeyToCap: decodeFromFields(
        Table.reified(phantom(ID.reified()), phantom(ID.reified())),
        fields.pool_key_to_cap,
      ),
      capToPoolKey: decodeFromFields(
        Table.reified(
          phantom(ID.reified()),
          phantom(Table.reified(phantom(ID.reified()), phantom(PoolKey.reified()))),
        ),
        fields.cap_to_pool_key,
      ),
      coinTypeToCap: decodeFromFields(
        Table.reified(phantom(TypeName.reified()), phantom(ID.reified())),
        fields.coin_type_to_cap,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PermissionPairManager {
    if (!isPermissionPairManager(item.type)) {
      throw new Error('not a PermissionPairManager type')
    }

    return PermissionPairManager.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      allowedPairConfig: decodeFromFieldsWithTypes(
        Table.reified(phantom(TypeName.reified()), phantom(VecSet.reified('u32'))),
        item.fields.allowed_pair_config,
      ),
      poolKeyToCap: decodeFromFieldsWithTypes(
        Table.reified(phantom(ID.reified()), phantom(ID.reified())),
        item.fields.pool_key_to_cap,
      ),
      capToPoolKey: decodeFromFieldsWithTypes(
        Table.reified(
          phantom(ID.reified()),
          phantom(Table.reified(phantom(ID.reified()), phantom(PoolKey.reified()))),
        ),
        item.fields.cap_to_pool_key,
      ),
      coinTypeToCap: decodeFromFieldsWithTypes(
        Table.reified(phantom(TypeName.reified()), phantom(ID.reified())),
        item.fields.coin_type_to_cap,
      ),
    })
  }

  static fromBcs(data: Uint8Array): PermissionPairManager {
    return PermissionPairManager.fromFields(PermissionPairManager.bcs.parse(data))
  }

  toJSONField(): PermissionPairManagerJSONField {
    return {
      id: this.id,
      allowedPairConfig: this.allowedPairConfig.toJSONField(),
      poolKeyToCap: this.poolKeyToCap.toJSONField(),
      capToPoolKey: this.capToPoolKey.toJSONField(),
      coinTypeToCap: this.coinTypeToCap.toJSONField(),
    }
  }

  toJSON(): PermissionPairManagerJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PermissionPairManager {
    return PermissionPairManager.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      allowedPairConfig: decodeFromJSONField(
        Table.reified(phantom(TypeName.reified()), phantom(VecSet.reified('u32'))),
        field.allowedPairConfig,
      ),
      poolKeyToCap: decodeFromJSONField(
        Table.reified(phantom(ID.reified()), phantom(ID.reified())),
        field.poolKeyToCap,
      ),
      capToPoolKey: decodeFromJSONField(
        Table.reified(
          phantom(ID.reified()),
          phantom(Table.reified(phantom(ID.reified()), phantom(PoolKey.reified()))),
        ),
        field.capToPoolKey,
      ),
      coinTypeToCap: decodeFromJSONField(
        Table.reified(phantom(TypeName.reified()), phantom(ID.reified())),
        field.coinTypeToCap,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): PermissionPairManager {
    if (json.$typeName !== PermissionPairManager.$typeName) {
      throw new Error(
        `not a PermissionPairManager json object: expected '${PermissionPairManager.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PermissionPairManager.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PermissionPairManager {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPermissionPairManager(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PermissionPairManager object`,
      )
    }
    return PermissionPairManager.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PermissionPairManager {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPermissionPairManager(data.bcs.type)) {
        throw new Error(`object at is not a PermissionPairManager object`)
      }

      return PermissionPairManager.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PermissionPairManager.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PermissionPairManager> {
    const res = await fetchObjectBcs(client, id)
    if (!isPermissionPairManager(res.type)) {
      throw new Error(`object at id ${id} is not a PermissionPairManager object`)
    }

    return PermissionPairManager.fromBcs(res.bcsBytes)
  }
}

/* ============================== PoolCreationCap =============================== */

export function isPoolCreationCap(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'factory::PoolCreationCap')}::factory::PoolCreationCap`
}

export interface PoolCreationCapFields {
  id: ToField<UID>
  coinType: ToField<TypeName>
}

export type PoolCreationCapReified = Reified<PoolCreationCap, PoolCreationCapFields>

export type PoolCreationCapJSONField = {
  id: string
  coinType: string
}

export type PoolCreationCapJSON = {
  $typeName: typeof PoolCreationCap.$typeName
  $typeArgs: []
} & PoolCreationCapJSONField

/**
 * Represents a capability to create a specific coin pool
 * * `id` - The unique identifier for this capability
 * * `coin_type` - The type name of the coin this capability allows creation of
 */
export class PoolCreationCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::PoolCreationCap` = `${
    getTypeOrigin('cetus-clmm', 'factory::PoolCreationCap')
  }::factory::PoolCreationCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PoolCreationCap.$typeName = PoolCreationCap.$typeName
  readonly $fullTypeName: `${string}::factory::PoolCreationCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PoolCreationCap.$isPhantom = PoolCreationCap.$isPhantom

  readonly id: ToField<UID>
  readonly coinType: ToField<TypeName>

  private constructor(typeArgs: [], fields: PoolCreationCapFields) {
    this.$fullTypeName = composeSuiType(
      PoolCreationCap.$typeName,
      ...typeArgs,
    ) as `${string}::factory::PoolCreationCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.coinType = fields.coinType
  }

  static reified(): PoolCreationCapReified {
    const reifiedBcs = PoolCreationCap.bcs
    return {
      typeName: PoolCreationCap.$typeName,
      fullTypeName: composeSuiType(
        PoolCreationCap.$typeName,
        ...[],
      ) as `${string}::factory::PoolCreationCap`,
      typeArgs: [] as [],
      isPhantom: PoolCreationCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolCreationCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolCreationCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolCreationCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolCreationCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolCreationCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolCreationCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolCreationCap.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PoolCreationCap.fetch(client, id),
      new: (fields: PoolCreationCapFields) => {
        return new PoolCreationCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PoolCreationCapReified {
    return PoolCreationCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolCreationCap>> {
    return phantom(PoolCreationCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PoolCreationCap>> {
    return PoolCreationCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolCreationCap', {
      id: UID.bcs,
      coin_type: TypeName.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PoolCreationCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolCreationCap.instantiateBcs> {
    if (!PoolCreationCap.cachedBcs) {
      PoolCreationCap.cachedBcs = PoolCreationCap.instantiateBcs()
    }
    return PoolCreationCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolCreationCap {
    return PoolCreationCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      coinType: decodeFromFields(TypeName.reified(), fields.coin_type),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolCreationCap {
    if (!isPoolCreationCap(item.type)) {
      throw new Error('not a PoolCreationCap type')
    }

    return PoolCreationCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      coinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type),
    })
  }

  static fromBcs(data: Uint8Array): PoolCreationCap {
    return PoolCreationCap.fromFields(PoolCreationCap.bcs.parse(data))
  }

  toJSONField(): PoolCreationCapJSONField {
    return {
      id: this.id,
      coinType: this.coinType,
    }
  }

  toJSON(): PoolCreationCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolCreationCap {
    return PoolCreationCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      coinType: decodeFromJSONField(TypeName.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): PoolCreationCap {
    if (json.$typeName !== PoolCreationCap.$typeName) {
      throw new Error(
        `not a PoolCreationCap json object: expected '${PoolCreationCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PoolCreationCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolCreationCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolCreationCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolCreationCap object`)
    }
    return PoolCreationCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolCreationCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolCreationCap(data.bcs.type)) {
        throw new Error(`object at is not a PoolCreationCap object`)
      }

      return PoolCreationCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolCreationCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PoolCreationCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isPoolCreationCap(res.type)) {
      throw new Error(`object at id ${id} is not a PoolCreationCap object`)
    }

    return PoolCreationCap.fromBcs(res.bcsBytes)
  }
}

/* ============================== InitFactoryEvent =============================== */

export function isInitFactoryEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'factory::InitFactoryEvent')}::factory::InitFactoryEvent`
}

export interface InitFactoryEventFields {
  poolsId: ToField<ID>
}

export type InitFactoryEventReified = Reified<InitFactoryEvent, InitFactoryEventFields>

export type InitFactoryEventJSONField = {
  poolsId: string
}

export type InitFactoryEventJSON = {
  $typeName: typeof InitFactoryEvent.$typeName
  $typeArgs: []
} & InitFactoryEventJSONField

/**
 * Event emitted when the factory is initialized
 * * `pools_id` - The unique identifier of the pools object
 */
export class InitFactoryEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::InitFactoryEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::InitFactoryEvent')
  }::factory::InitFactoryEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof InitFactoryEvent.$typeName = InitFactoryEvent.$typeName
  readonly $fullTypeName: `${string}::factory::InitFactoryEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof InitFactoryEvent.$isPhantom = InitFactoryEvent.$isPhantom

  readonly poolsId: ToField<ID>

  private constructor(typeArgs: [], fields: InitFactoryEventFields) {
    this.$fullTypeName = composeSuiType(
      InitFactoryEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::InitFactoryEvent`
    this.$typeArgs = typeArgs

    this.poolsId = fields.poolsId
  }

  static reified(): InitFactoryEventReified {
    const reifiedBcs = InitFactoryEvent.bcs
    return {
      typeName: InitFactoryEvent.$typeName,
      fullTypeName: composeSuiType(
        InitFactoryEvent.$typeName,
        ...[],
      ) as `${string}::factory::InitFactoryEvent`,
      typeArgs: [] as [],
      isPhantom: InitFactoryEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InitFactoryEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => InitFactoryEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InitFactoryEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => InitFactoryEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitFactoryEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => InitFactoryEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => InitFactoryEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => InitFactoryEvent.fetch(client, id),
      new: (fields: InitFactoryEventFields) => {
        return new InitFactoryEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): InitFactoryEventReified {
    return InitFactoryEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitFactoryEvent>> {
    return phantom(InitFactoryEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<InitFactoryEvent>> {
    return InitFactoryEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('InitFactoryEvent', {
      pools_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof InitFactoryEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof InitFactoryEvent.instantiateBcs> {
    if (!InitFactoryEvent.cachedBcs) {
      InitFactoryEvent.cachedBcs = InitFactoryEvent.instantiateBcs()
    }
    return InitFactoryEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): InitFactoryEvent {
    return InitFactoryEvent.reified().new({
      poolsId: decodeFromFields(ID.reified(), fields.pools_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InitFactoryEvent {
    if (!isInitFactoryEvent(item.type)) {
      throw new Error('not a InitFactoryEvent type')
    }

    return InitFactoryEvent.reified().new({
      poolsId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pools_id),
    })
  }

  static fromBcs(data: Uint8Array): InitFactoryEvent {
    return InitFactoryEvent.fromFields(InitFactoryEvent.bcs.parse(data))
  }

  toJSONField(): InitFactoryEventJSONField {
    return {
      poolsId: this.poolsId,
    }
  }

  toJSON(): InitFactoryEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InitFactoryEvent {
    return InitFactoryEvent.reified().new({
      poolsId: decodeFromJSONField(ID.reified(), field.poolsId),
    })
  }

  static fromJSON(json: Record<string, any>): InitFactoryEvent {
    if (json.$typeName !== InitFactoryEvent.$typeName) {
      throw new Error(
        `not a InitFactoryEvent json object: expected '${InitFactoryEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return InitFactoryEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InitFactoryEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitFactoryEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a InitFactoryEvent object`)
    }
    return InitFactoryEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InitFactoryEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitFactoryEvent(data.bcs.type)) {
        throw new Error(`object at is not a InitFactoryEvent object`)
      }

      return InitFactoryEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitFactoryEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<InitFactoryEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isInitFactoryEvent(res.type)) {
      throw new Error(`object at id ${id} is not a InitFactoryEvent object`)
    }

    return InitFactoryEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== CreatePoolEvent =============================== */

export function isCreatePoolEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'factory::CreatePoolEvent')}::factory::CreatePoolEvent`
}

export interface CreatePoolEventFields {
  poolId: ToField<ID>
  coinTypeA: ToField<String>
  coinTypeB: ToField<String>
  tickSpacing: ToField<'u32'>
}

export type CreatePoolEventReified = Reified<CreatePoolEvent, CreatePoolEventFields>

export type CreatePoolEventJSONField = {
  poolId: string
  coinTypeA: string
  coinTypeB: string
  tickSpacing: number
}

export type CreatePoolEventJSON = {
  $typeName: typeof CreatePoolEvent.$typeName
  $typeArgs: []
} & CreatePoolEventJSONField

/**
 * Event emitted when a pool is created
 * * `pool_id` - The unique identifier of the created pool
 * * `coin_type_a` - The type name of the first coin in the pool
 * * `coin_type_b` - The type name of the second coin in the pool
 * * `tick_spacing` - The tick spacing used for price discretization in the pool
 */
export class CreatePoolEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::CreatePoolEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::CreatePoolEvent')
  }::factory::CreatePoolEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CreatePoolEvent.$typeName = CreatePoolEvent.$typeName
  readonly $fullTypeName: `${string}::factory::CreatePoolEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CreatePoolEvent.$isPhantom = CreatePoolEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly coinTypeA: ToField<String>
  readonly coinTypeB: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: CreatePoolEventFields) {
    this.$fullTypeName = composeSuiType(
      CreatePoolEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::CreatePoolEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.coinTypeA = fields.coinTypeA
    this.coinTypeB = fields.coinTypeB
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): CreatePoolEventReified {
    const reifiedBcs = CreatePoolEvent.bcs
    return {
      typeName: CreatePoolEvent.$typeName,
      fullTypeName: composeSuiType(
        CreatePoolEvent.$typeName,
        ...[],
      ) as `${string}::factory::CreatePoolEvent`,
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
      fetch: async (client: SupportedSuiClient, id: string) => CreatePoolEvent.fetch(client, id),
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
      coin_type_a: String.bcs,
      coin_type_b: String.bcs,
      tick_spacing: bcs.u32(),
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
      coinTypeA: decodeFromFields(String.reified(), fields.coin_type_a),
      coinTypeB: decodeFromFields(String.reified(), fields.coin_type_b),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CreatePoolEvent {
    if (!isCreatePoolEvent(item.type)) {
      throw new Error('not a CreatePoolEvent type')
    }

    return CreatePoolEvent.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      coinTypeA: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type_a),
      coinTypeB: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type_b),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): CreatePoolEvent {
    return CreatePoolEvent.fromFields(CreatePoolEvent.bcs.parse(data))
  }

  toJSONField(): CreatePoolEventJSONField {
    return {
      poolId: this.poolId,
      coinTypeA: this.coinTypeA,
      coinTypeB: this.coinTypeB,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON(): CreatePoolEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CreatePoolEvent {
    return CreatePoolEvent.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      coinTypeA: decodeFromJSONField(String.reified(), field.coinTypeA),
      coinTypeB: decodeFromJSONField(String.reified(), field.coinTypeB),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
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

      return CreatePoolEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreatePoolEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<CreatePoolEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isCreatePoolEvent(res.type)) {
      throw new Error(`object at id ${id} is not a CreatePoolEvent object`)
    }

    return CreatePoolEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== AddAllowedListEvent =============================== */

export function isAddAllowedListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::AddAllowedListEvent')
    }::factory::AddAllowedListEvent`
}

export interface AddAllowedListEventFields {
  coinType: ToField<String>
}

export type AddAllowedListEventReified = Reified<AddAllowedListEvent, AddAllowedListEventFields>

export type AddAllowedListEventJSONField = {
  coinType: string
}

export type AddAllowedListEventJSON = {
  $typeName: typeof AddAllowedListEvent.$typeName
  $typeArgs: []
} & AddAllowedListEventJSONField

/**
 * Event emitted when a coin is added to the allowed list
 * * `coin_type` - The type name of the coin that was added
 */
export class AddAllowedListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::AddAllowedListEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::AddAllowedListEvent')
  }::factory::AddAllowedListEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddAllowedListEvent.$typeName = AddAllowedListEvent.$typeName
  readonly $fullTypeName: `${string}::factory::AddAllowedListEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddAllowedListEvent.$isPhantom = AddAllowedListEvent.$isPhantom

  readonly coinType: ToField<String>

  private constructor(typeArgs: [], fields: AddAllowedListEventFields) {
    this.$fullTypeName = composeSuiType(
      AddAllowedListEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::AddAllowedListEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
  }

  static reified(): AddAllowedListEventReified {
    const reifiedBcs = AddAllowedListEvent.bcs
    return {
      typeName: AddAllowedListEvent.$typeName,
      fullTypeName: composeSuiType(
        AddAllowedListEvent.$typeName,
        ...[],
      ) as `${string}::factory::AddAllowedListEvent`,
      typeArgs: [] as [],
      isPhantom: AddAllowedListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddAllowedListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddAllowedListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddAllowedListEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddAllowedListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddAllowedListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddAllowedListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddAllowedListEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        AddAllowedListEvent.fetch(client, id),
      new: (fields: AddAllowedListEventFields) => {
        return new AddAllowedListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddAllowedListEventReified {
    return AddAllowedListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddAllowedListEvent>> {
    return phantom(AddAllowedListEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddAllowedListEvent>> {
    return AddAllowedListEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddAllowedListEvent', {
      coin_type: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AddAllowedListEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddAllowedListEvent.instantiateBcs> {
    if (!AddAllowedListEvent.cachedBcs) {
      AddAllowedListEvent.cachedBcs = AddAllowedListEvent.instantiateBcs()
    }
    return AddAllowedListEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddAllowedListEvent {
    return AddAllowedListEvent.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddAllowedListEvent {
    if (!isAddAllowedListEvent(item.type)) {
      throw new Error('not a AddAllowedListEvent type')
    }

    return AddAllowedListEvent.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
    })
  }

  static fromBcs(data: Uint8Array): AddAllowedListEvent {
    return AddAllowedListEvent.fromFields(AddAllowedListEvent.bcs.parse(data))
  }

  toJSONField(): AddAllowedListEventJSONField {
    return {
      coinType: this.coinType,
    }
  }

  toJSON(): AddAllowedListEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddAllowedListEvent {
    return AddAllowedListEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): AddAllowedListEvent {
    if (json.$typeName !== AddAllowedListEvent.$typeName) {
      throw new Error(
        `not a AddAllowedListEvent json object: expected '${AddAllowedListEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddAllowedListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddAllowedListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddAllowedListEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddAllowedListEvent object`)
    }
    return AddAllowedListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddAllowedListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddAllowedListEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddAllowedListEvent object`)
      }

      return AddAllowedListEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddAllowedListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AddAllowedListEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isAddAllowedListEvent(res.type)) {
      throw new Error(`object at id ${id} is not a AddAllowedListEvent object`)
    }

    return AddAllowedListEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== RemoveAllowedListEvent =============================== */

export function isRemoveAllowedListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::RemoveAllowedListEvent')
    }::factory::RemoveAllowedListEvent`
}

export interface RemoveAllowedListEventFields {
  coinType: ToField<String>
}

export type RemoveAllowedListEventReified = Reified<
  RemoveAllowedListEvent,
  RemoveAllowedListEventFields
>

export type RemoveAllowedListEventJSONField = {
  coinType: string
}

export type RemoveAllowedListEventJSON = {
  $typeName: typeof RemoveAllowedListEvent.$typeName
  $typeArgs: []
} & RemoveAllowedListEventJSONField

/**
 * Event emitted when a coin is removed from the allowed list
 * * `coin_type` - The type name of the coin that was removed
 */
export class RemoveAllowedListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::RemoveAllowedListEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::RemoveAllowedListEvent')
  }::factory::RemoveAllowedListEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveAllowedListEvent.$typeName = RemoveAllowedListEvent.$typeName
  readonly $fullTypeName: `${string}::factory::RemoveAllowedListEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveAllowedListEvent.$isPhantom = RemoveAllowedListEvent.$isPhantom

  readonly coinType: ToField<String>

  private constructor(typeArgs: [], fields: RemoveAllowedListEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveAllowedListEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::RemoveAllowedListEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
  }

  static reified(): RemoveAllowedListEventReified {
    const reifiedBcs = RemoveAllowedListEvent.bcs
    return {
      typeName: RemoveAllowedListEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveAllowedListEvent.$typeName,
        ...[],
      ) as `${string}::factory::RemoveAllowedListEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveAllowedListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveAllowedListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveAllowedListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveAllowedListEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveAllowedListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveAllowedListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveAllowedListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveAllowedListEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        RemoveAllowedListEvent.fetch(client, id),
      new: (fields: RemoveAllowedListEventFields) => {
        return new RemoveAllowedListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveAllowedListEventReified {
    return RemoveAllowedListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveAllowedListEvent>> {
    return phantom(RemoveAllowedListEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveAllowedListEvent>> {
    return RemoveAllowedListEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveAllowedListEvent', {
      coin_type: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveAllowedListEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RemoveAllowedListEvent.instantiateBcs> {
    if (!RemoveAllowedListEvent.cachedBcs) {
      RemoveAllowedListEvent.cachedBcs = RemoveAllowedListEvent.instantiateBcs()
    }
    return RemoveAllowedListEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveAllowedListEvent {
    return RemoveAllowedListEvent.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveAllowedListEvent {
    if (!isRemoveAllowedListEvent(item.type)) {
      throw new Error('not a RemoveAllowedListEvent type')
    }

    return RemoveAllowedListEvent.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
    })
  }

  static fromBcs(data: Uint8Array): RemoveAllowedListEvent {
    return RemoveAllowedListEvent.fromFields(RemoveAllowedListEvent.bcs.parse(data))
  }

  toJSONField(): RemoveAllowedListEventJSONField {
    return {
      coinType: this.coinType,
    }
  }

  toJSON(): RemoveAllowedListEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveAllowedListEvent {
    return RemoveAllowedListEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveAllowedListEvent {
    if (json.$typeName !== RemoveAllowedListEvent.$typeName) {
      throw new Error(
        `not a RemoveAllowedListEvent json object: expected '${RemoveAllowedListEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveAllowedListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveAllowedListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveAllowedListEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveAllowedListEvent object`,
      )
    }
    return RemoveAllowedListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveAllowedListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveAllowedListEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveAllowedListEvent object`)
      }

      return RemoveAllowedListEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveAllowedListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<RemoveAllowedListEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isRemoveAllowedListEvent(res.type)) {
      throw new Error(`object at id ${id} is not a RemoveAllowedListEvent object`)
    }

    return RemoveAllowedListEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== AddDeniedListEvent =============================== */

export function isAddDeniedListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'factory::AddDeniedListEvent')}::factory::AddDeniedListEvent`
}

export interface AddDeniedListEventFields {
  coinType: ToField<String>
}

export type AddDeniedListEventReified = Reified<AddDeniedListEvent, AddDeniedListEventFields>

export type AddDeniedListEventJSONField = {
  coinType: string
}

export type AddDeniedListEventJSON = {
  $typeName: typeof AddDeniedListEvent.$typeName
  $typeArgs: []
} & AddDeniedListEventJSONField

/**
 * Event emitted when a coin is added to the denied list
 * * `coin_type` - The type name of
 */
export class AddDeniedListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::AddDeniedListEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::AddDeniedListEvent')
  }::factory::AddDeniedListEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddDeniedListEvent.$typeName = AddDeniedListEvent.$typeName
  readonly $fullTypeName: `${string}::factory::AddDeniedListEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddDeniedListEvent.$isPhantom = AddDeniedListEvent.$isPhantom

  readonly coinType: ToField<String>

  private constructor(typeArgs: [], fields: AddDeniedListEventFields) {
    this.$fullTypeName = composeSuiType(
      AddDeniedListEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::AddDeniedListEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
  }

  static reified(): AddDeniedListEventReified {
    const reifiedBcs = AddDeniedListEvent.bcs
    return {
      typeName: AddDeniedListEvent.$typeName,
      fullTypeName: composeSuiType(
        AddDeniedListEvent.$typeName,
        ...[],
      ) as `${string}::factory::AddDeniedListEvent`,
      typeArgs: [] as [],
      isPhantom: AddDeniedListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddDeniedListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddDeniedListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddDeniedListEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddDeniedListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddDeniedListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddDeniedListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddDeniedListEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AddDeniedListEvent.fetch(client, id),
      new: (fields: AddDeniedListEventFields) => {
        return new AddDeniedListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddDeniedListEventReified {
    return AddDeniedListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddDeniedListEvent>> {
    return phantom(AddDeniedListEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddDeniedListEvent>> {
    return AddDeniedListEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddDeniedListEvent', {
      coin_type: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AddDeniedListEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddDeniedListEvent.instantiateBcs> {
    if (!AddDeniedListEvent.cachedBcs) {
      AddDeniedListEvent.cachedBcs = AddDeniedListEvent.instantiateBcs()
    }
    return AddDeniedListEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddDeniedListEvent {
    return AddDeniedListEvent.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddDeniedListEvent {
    if (!isAddDeniedListEvent(item.type)) {
      throw new Error('not a AddDeniedListEvent type')
    }

    return AddDeniedListEvent.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
    })
  }

  static fromBcs(data: Uint8Array): AddDeniedListEvent {
    return AddDeniedListEvent.fromFields(AddDeniedListEvent.bcs.parse(data))
  }

  toJSONField(): AddDeniedListEventJSONField {
    return {
      coinType: this.coinType,
    }
  }

  toJSON(): AddDeniedListEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddDeniedListEvent {
    return AddDeniedListEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): AddDeniedListEvent {
    if (json.$typeName !== AddDeniedListEvent.$typeName) {
      throw new Error(
        `not a AddDeniedListEvent json object: expected '${AddDeniedListEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddDeniedListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddDeniedListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddDeniedListEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddDeniedListEvent object`)
    }
    return AddDeniedListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddDeniedListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddDeniedListEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddDeniedListEvent object`)
      }

      return AddDeniedListEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddDeniedListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AddDeniedListEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isAddDeniedListEvent(res.type)) {
      throw new Error(`object at id ${id} is not a AddDeniedListEvent object`)
    }

    return AddDeniedListEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== RemoveDeniedListEvent =============================== */

export function isRemoveDeniedListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::RemoveDeniedListEvent')
    }::factory::RemoveDeniedListEvent`
}

export interface RemoveDeniedListEventFields {
  coinType: ToField<String>
}

export type RemoveDeniedListEventReified = Reified<
  RemoveDeniedListEvent,
  RemoveDeniedListEventFields
>

export type RemoveDeniedListEventJSONField = {
  coinType: string
}

export type RemoveDeniedListEventJSON = {
  $typeName: typeof RemoveDeniedListEvent.$typeName
  $typeArgs: []
} & RemoveDeniedListEventJSONField

/**
 * Event emitted when a coin is removed from the denied list
 * * `coin_type` - The type name of the coin that was removed
 */
export class RemoveDeniedListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::RemoveDeniedListEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::RemoveDeniedListEvent')
  }::factory::RemoveDeniedListEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveDeniedListEvent.$typeName = RemoveDeniedListEvent.$typeName
  readonly $fullTypeName: `${string}::factory::RemoveDeniedListEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveDeniedListEvent.$isPhantom = RemoveDeniedListEvent.$isPhantom

  readonly coinType: ToField<String>

  private constructor(typeArgs: [], fields: RemoveDeniedListEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveDeniedListEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::RemoveDeniedListEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
  }

  static reified(): RemoveDeniedListEventReified {
    const reifiedBcs = RemoveDeniedListEvent.bcs
    return {
      typeName: RemoveDeniedListEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveDeniedListEvent.$typeName,
        ...[],
      ) as `${string}::factory::RemoveDeniedListEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveDeniedListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveDeniedListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveDeniedListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveDeniedListEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveDeniedListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveDeniedListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveDeniedListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveDeniedListEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        RemoveDeniedListEvent.fetch(client, id),
      new: (fields: RemoveDeniedListEventFields) => {
        return new RemoveDeniedListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveDeniedListEventReified {
    return RemoveDeniedListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveDeniedListEvent>> {
    return phantom(RemoveDeniedListEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveDeniedListEvent>> {
    return RemoveDeniedListEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveDeniedListEvent', {
      coin_type: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveDeniedListEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RemoveDeniedListEvent.instantiateBcs> {
    if (!RemoveDeniedListEvent.cachedBcs) {
      RemoveDeniedListEvent.cachedBcs = RemoveDeniedListEvent.instantiateBcs()
    }
    return RemoveDeniedListEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveDeniedListEvent {
    return RemoveDeniedListEvent.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveDeniedListEvent {
    if (!isRemoveDeniedListEvent(item.type)) {
      throw new Error('not a RemoveDeniedListEvent type')
    }

    return RemoveDeniedListEvent.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
    })
  }

  static fromBcs(data: Uint8Array): RemoveDeniedListEvent {
    return RemoveDeniedListEvent.fromFields(RemoveDeniedListEvent.bcs.parse(data))
  }

  toJSONField(): RemoveDeniedListEventJSONField {
    return {
      coinType: this.coinType,
    }
  }

  toJSON(): RemoveDeniedListEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveDeniedListEvent {
    return RemoveDeniedListEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveDeniedListEvent {
    if (json.$typeName !== RemoveDeniedListEvent.$typeName) {
      throw new Error(
        `not a RemoveDeniedListEvent json object: expected '${RemoveDeniedListEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveDeniedListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveDeniedListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveDeniedListEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveDeniedListEvent object`,
      )
    }
    return RemoveDeniedListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveDeniedListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveDeniedListEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveDeniedListEvent object`)
      }

      return RemoveDeniedListEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveDeniedListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<RemoveDeniedListEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isRemoveDeniedListEvent(res.type)) {
      throw new Error(`object at id ${id} is not a RemoveDeniedListEvent object`)
    }

    return RemoveDeniedListEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== InitPermissionPairManagerEvent =============================== */

export function isInitPermissionPairManagerEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::InitPermissionPairManagerEvent')
    }::factory::InitPermissionPairManagerEvent`
}

export interface InitPermissionPairManagerEventFields {
  managerId: ToField<ID>
  deniedListId: ToField<ID>
}

export type InitPermissionPairManagerEventReified = Reified<
  InitPermissionPairManagerEvent,
  InitPermissionPairManagerEventFields
>

export type InitPermissionPairManagerEventJSONField = {
  managerId: string
  deniedListId: string
}

export type InitPermissionPairManagerEventJSON = {
  $typeName: typeof InitPermissionPairManagerEvent.$typeName
  $typeArgs: []
} & InitPermissionPairManagerEventJSONField

/**
 * Event emitted when the permission pair manager is initialized
 * * `manager_id` - The unique identifier of the permission pair manager
 * * `denied_list_id` - The unique identifier of the denied coin list
 */
export class InitPermissionPairManagerEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::InitPermissionPairManagerEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::InitPermissionPairManagerEvent')
  }::factory::InitPermissionPairManagerEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof InitPermissionPairManagerEvent.$typeName =
    InitPermissionPairManagerEvent.$typeName
  readonly $fullTypeName: `${string}::factory::InitPermissionPairManagerEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof InitPermissionPairManagerEvent.$isPhantom =
    InitPermissionPairManagerEvent.$isPhantom

  readonly managerId: ToField<ID>
  readonly deniedListId: ToField<ID>

  private constructor(typeArgs: [], fields: InitPermissionPairManagerEventFields) {
    this.$fullTypeName = composeSuiType(
      InitPermissionPairManagerEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::InitPermissionPairManagerEvent`
    this.$typeArgs = typeArgs

    this.managerId = fields.managerId
    this.deniedListId = fields.deniedListId
  }

  static reified(): InitPermissionPairManagerEventReified {
    const reifiedBcs = InitPermissionPairManagerEvent.bcs
    return {
      typeName: InitPermissionPairManagerEvent.$typeName,
      fullTypeName: composeSuiType(
        InitPermissionPairManagerEvent.$typeName,
        ...[],
      ) as `${string}::factory::InitPermissionPairManagerEvent`,
      typeArgs: [] as [],
      isPhantom: InitPermissionPairManagerEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        InitPermissionPairManagerEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        InitPermissionPairManagerEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        InitPermissionPairManagerEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => InitPermissionPairManagerEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitPermissionPairManagerEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        InitPermissionPairManagerEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        InitPermissionPairManagerEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        InitPermissionPairManagerEvent.fetch(client, id),
      new: (fields: InitPermissionPairManagerEventFields) => {
        return new InitPermissionPairManagerEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): InitPermissionPairManagerEventReified {
    return InitPermissionPairManagerEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitPermissionPairManagerEvent>> {
    return phantom(InitPermissionPairManagerEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<InitPermissionPairManagerEvent>> {
    return InitPermissionPairManagerEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('InitPermissionPairManagerEvent', {
      manager_id: ID.bcs,
      denied_list_id: ID.bcs,
    })
  }

  private static cachedBcs:
    | ReturnType<typeof InitPermissionPairManagerEvent.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof InitPermissionPairManagerEvent.instantiateBcs> {
    if (!InitPermissionPairManagerEvent.cachedBcs) {
      InitPermissionPairManagerEvent.cachedBcs = InitPermissionPairManagerEvent.instantiateBcs()
    }
    return InitPermissionPairManagerEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): InitPermissionPairManagerEvent {
    return InitPermissionPairManagerEvent.reified().new({
      managerId: decodeFromFields(ID.reified(), fields.manager_id),
      deniedListId: decodeFromFields(ID.reified(), fields.denied_list_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InitPermissionPairManagerEvent {
    if (!isInitPermissionPairManagerEvent(item.type)) {
      throw new Error('not a InitPermissionPairManagerEvent type')
    }

    return InitPermissionPairManagerEvent.reified().new({
      managerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.manager_id),
      deniedListId: decodeFromFieldsWithTypes(ID.reified(), item.fields.denied_list_id),
    })
  }

  static fromBcs(data: Uint8Array): InitPermissionPairManagerEvent {
    return InitPermissionPairManagerEvent.fromFields(InitPermissionPairManagerEvent.bcs.parse(data))
  }

  toJSONField(): InitPermissionPairManagerEventJSONField {
    return {
      managerId: this.managerId,
      deniedListId: this.deniedListId,
    }
  }

  toJSON(): InitPermissionPairManagerEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InitPermissionPairManagerEvent {
    return InitPermissionPairManagerEvent.reified().new({
      managerId: decodeFromJSONField(ID.reified(), field.managerId),
      deniedListId: decodeFromJSONField(ID.reified(), field.deniedListId),
    })
  }

  static fromJSON(json: Record<string, any>): InitPermissionPairManagerEvent {
    if (json.$typeName !== InitPermissionPairManagerEvent.$typeName) {
      throw new Error(
        `not a InitPermissionPairManagerEvent json object: expected '${InitPermissionPairManagerEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return InitPermissionPairManagerEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InitPermissionPairManagerEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitPermissionPairManagerEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a InitPermissionPairManagerEvent object`,
      )
    }
    return InitPermissionPairManagerEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InitPermissionPairManagerEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitPermissionPairManagerEvent(data.bcs.type)) {
        throw new Error(`object at is not a InitPermissionPairManagerEvent object`)
      }

      return InitPermissionPairManagerEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitPermissionPairManagerEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: SupportedSuiClient,
    id: string,
  ): Promise<InitPermissionPairManagerEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isInitPermissionPairManagerEvent(res.type)) {
      throw new Error(`object at id ${id} is not a InitPermissionPairManagerEvent object`)
    }

    return InitPermissionPairManagerEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== RegisterPermissionPairEvent =============================== */

export function isRegisterPermissionPairEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::RegisterPermissionPairEvent')
    }::factory::RegisterPermissionPairEvent`
}

export interface RegisterPermissionPairEventFields {
  cap: ToField<ID>
  poolKey: ToField<ID>
  coinType: ToField<String>
  coinPair: ToField<String>
  tickSpacing: ToField<'u32'>
}

export type RegisterPermissionPairEventReified = Reified<
  RegisterPermissionPairEvent,
  RegisterPermissionPairEventFields
>

export type RegisterPermissionPairEventJSONField = {
  cap: string
  poolKey: string
  coinType: string
  coinPair: string
  tickSpacing: number
}

export type RegisterPermissionPairEventJSON = {
  $typeName: typeof RegisterPermissionPairEvent.$typeName
  $typeArgs: []
} & RegisterPermissionPairEventJSONField

/**
 * Event emitted when a permission pair is registered
 * * `cap` - The unique identifier of the capability
 * * `pool_key` - The unique identifier of the pool key
 * * `coin_type` - The type name of the coin
 * * `coin_pair` - The type name of the coin pair
 * * `tick_spacing` - The tick spacing used for price discretization in the pool
 */
export class RegisterPermissionPairEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::RegisterPermissionPairEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::RegisterPermissionPairEvent')
  }::factory::RegisterPermissionPairEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RegisterPermissionPairEvent.$typeName =
    RegisterPermissionPairEvent.$typeName
  readonly $fullTypeName: `${string}::factory::RegisterPermissionPairEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RegisterPermissionPairEvent.$isPhantom =
    RegisterPermissionPairEvent.$isPhantom

  readonly cap: ToField<ID>
  readonly poolKey: ToField<ID>
  readonly coinType: ToField<String>
  readonly coinPair: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: RegisterPermissionPairEventFields) {
    this.$fullTypeName = composeSuiType(
      RegisterPermissionPairEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::RegisterPermissionPairEvent`
    this.$typeArgs = typeArgs

    this.cap = fields.cap
    this.poolKey = fields.poolKey
    this.coinType = fields.coinType
    this.coinPair = fields.coinPair
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): RegisterPermissionPairEventReified {
    const reifiedBcs = RegisterPermissionPairEvent.bcs
    return {
      typeName: RegisterPermissionPairEvent.$typeName,
      fullTypeName: composeSuiType(
        RegisterPermissionPairEvent.$typeName,
        ...[],
      ) as `${string}::factory::RegisterPermissionPairEvent`,
      typeArgs: [] as [],
      isPhantom: RegisterPermissionPairEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RegisterPermissionPairEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RegisterPermissionPairEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RegisterPermissionPairEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RegisterPermissionPairEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RegisterPermissionPairEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RegisterPermissionPairEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RegisterPermissionPairEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        RegisterPermissionPairEvent.fetch(client, id),
      new: (fields: RegisterPermissionPairEventFields) => {
        return new RegisterPermissionPairEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RegisterPermissionPairEventReified {
    return RegisterPermissionPairEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RegisterPermissionPairEvent>> {
    return phantom(RegisterPermissionPairEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RegisterPermissionPairEvent>> {
    return RegisterPermissionPairEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RegisterPermissionPairEvent', {
      cap: ID.bcs,
      pool_key: ID.bcs,
      coin_type: String.bcs,
      coin_pair: String.bcs,
      tick_spacing: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof RegisterPermissionPairEvent.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof RegisterPermissionPairEvent.instantiateBcs> {
    if (!RegisterPermissionPairEvent.cachedBcs) {
      RegisterPermissionPairEvent.cachedBcs = RegisterPermissionPairEvent.instantiateBcs()
    }
    return RegisterPermissionPairEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RegisterPermissionPairEvent {
    return RegisterPermissionPairEvent.reified().new({
      cap: decodeFromFields(ID.reified(), fields.cap),
      poolKey: decodeFromFields(ID.reified(), fields.pool_key),
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      coinPair: decodeFromFields(String.reified(), fields.coin_pair),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RegisterPermissionPairEvent {
    if (!isRegisterPermissionPairEvent(item.type)) {
      throw new Error('not a RegisterPermissionPairEvent type')
    }

    return RegisterPermissionPairEvent.reified().new({
      cap: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap),
      poolKey: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_key),
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      coinPair: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_pair),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): RegisterPermissionPairEvent {
    return RegisterPermissionPairEvent.fromFields(RegisterPermissionPairEvent.bcs.parse(data))
  }

  toJSONField(): RegisterPermissionPairEventJSONField {
    return {
      cap: this.cap,
      poolKey: this.poolKey,
      coinType: this.coinType,
      coinPair: this.coinPair,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON(): RegisterPermissionPairEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RegisterPermissionPairEvent {
    return RegisterPermissionPairEvent.reified().new({
      cap: decodeFromJSONField(ID.reified(), field.cap),
      poolKey: decodeFromJSONField(ID.reified(), field.poolKey),
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      coinPair: decodeFromJSONField(String.reified(), field.coinPair),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON(json: Record<string, any>): RegisterPermissionPairEvent {
    if (json.$typeName !== RegisterPermissionPairEvent.$typeName) {
      throw new Error(
        `not a RegisterPermissionPairEvent json object: expected '${RegisterPermissionPairEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RegisterPermissionPairEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RegisterPermissionPairEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRegisterPermissionPairEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RegisterPermissionPairEvent object`,
      )
    }
    return RegisterPermissionPairEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RegisterPermissionPairEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRegisterPermissionPairEvent(data.bcs.type)) {
        throw new Error(`object at is not a RegisterPermissionPairEvent object`)
      }

      return RegisterPermissionPairEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RegisterPermissionPairEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<RegisterPermissionPairEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isRegisterPermissionPairEvent(res.type)) {
      throw new Error(`object at id ${id} is not a RegisterPermissionPairEvent object`)
    }

    return RegisterPermissionPairEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== UnregisterPermissionPairEvent =============================== */

export function isUnregisterPermissionPairEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::UnregisterPermissionPairEvent')
    }::factory::UnregisterPermissionPairEvent`
}

export interface UnregisterPermissionPairEventFields {
  cap: ToField<ID>
  poolKey: ToField<ID>
  coinType: ToField<String>
  coinPair: ToField<String>
  tickSpacing: ToField<'u32'>
}

export type UnregisterPermissionPairEventReified = Reified<
  UnregisterPermissionPairEvent,
  UnregisterPermissionPairEventFields
>

export type UnregisterPermissionPairEventJSONField = {
  cap: string
  poolKey: string
  coinType: string
  coinPair: string
  tickSpacing: number
}

export type UnregisterPermissionPairEventJSON = {
  $typeName: typeof UnregisterPermissionPairEvent.$typeName
  $typeArgs: []
} & UnregisterPermissionPairEventJSONField

/**
 * Event emitted when a permission pair is unregistered
 * * `cap` - The unique identifier of the capability
 * * `pool_key` - The unique identifier of the pool key
 * * `coin_type` - The type name of the coin
 * * `coin_pair` - The type name of the coin pair
 * * `tick_spacing` - The tick spacing used for price discretization in the pool
 */
export class UnregisterPermissionPairEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::UnregisterPermissionPairEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::UnregisterPermissionPairEvent')
  }::factory::UnregisterPermissionPairEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UnregisterPermissionPairEvent.$typeName =
    UnregisterPermissionPairEvent.$typeName
  readonly $fullTypeName: `${string}::factory::UnregisterPermissionPairEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UnregisterPermissionPairEvent.$isPhantom =
    UnregisterPermissionPairEvent.$isPhantom

  readonly cap: ToField<ID>
  readonly poolKey: ToField<ID>
  readonly coinType: ToField<String>
  readonly coinPair: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: UnregisterPermissionPairEventFields) {
    this.$fullTypeName = composeSuiType(
      UnregisterPermissionPairEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::UnregisterPermissionPairEvent`
    this.$typeArgs = typeArgs

    this.cap = fields.cap
    this.poolKey = fields.poolKey
    this.coinType = fields.coinType
    this.coinPair = fields.coinPair
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): UnregisterPermissionPairEventReified {
    const reifiedBcs = UnregisterPermissionPairEvent.bcs
    return {
      typeName: UnregisterPermissionPairEvent.$typeName,
      fullTypeName: composeSuiType(
        UnregisterPermissionPairEvent.$typeName,
        ...[],
      ) as `${string}::factory::UnregisterPermissionPairEvent`,
      typeArgs: [] as [],
      isPhantom: UnregisterPermissionPairEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UnregisterPermissionPairEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UnregisterPermissionPairEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        UnregisterPermissionPairEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UnregisterPermissionPairEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UnregisterPermissionPairEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UnregisterPermissionPairEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UnregisterPermissionPairEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        UnregisterPermissionPairEvent.fetch(client, id),
      new: (fields: UnregisterPermissionPairEventFields) => {
        return new UnregisterPermissionPairEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UnregisterPermissionPairEventReified {
    return UnregisterPermissionPairEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UnregisterPermissionPairEvent>> {
    return phantom(UnregisterPermissionPairEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UnregisterPermissionPairEvent>> {
    return UnregisterPermissionPairEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UnregisterPermissionPairEvent', {
      cap: ID.bcs,
      pool_key: ID.bcs,
      coin_type: String.bcs,
      coin_pair: String.bcs,
      tick_spacing: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof UnregisterPermissionPairEvent.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof UnregisterPermissionPairEvent.instantiateBcs> {
    if (!UnregisterPermissionPairEvent.cachedBcs) {
      UnregisterPermissionPairEvent.cachedBcs = UnregisterPermissionPairEvent.instantiateBcs()
    }
    return UnregisterPermissionPairEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UnregisterPermissionPairEvent {
    return UnregisterPermissionPairEvent.reified().new({
      cap: decodeFromFields(ID.reified(), fields.cap),
      poolKey: decodeFromFields(ID.reified(), fields.pool_key),
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      coinPair: decodeFromFields(String.reified(), fields.coin_pair),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UnregisterPermissionPairEvent {
    if (!isUnregisterPermissionPairEvent(item.type)) {
      throw new Error('not a UnregisterPermissionPairEvent type')
    }

    return UnregisterPermissionPairEvent.reified().new({
      cap: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap),
      poolKey: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_key),
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      coinPair: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_pair),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): UnregisterPermissionPairEvent {
    return UnregisterPermissionPairEvent.fromFields(UnregisterPermissionPairEvent.bcs.parse(data))
  }

  toJSONField(): UnregisterPermissionPairEventJSONField {
    return {
      cap: this.cap,
      poolKey: this.poolKey,
      coinType: this.coinType,
      coinPair: this.coinPair,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON(): UnregisterPermissionPairEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UnregisterPermissionPairEvent {
    return UnregisterPermissionPairEvent.reified().new({
      cap: decodeFromJSONField(ID.reified(), field.cap),
      poolKey: decodeFromJSONField(ID.reified(), field.poolKey),
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      coinPair: decodeFromJSONField(String.reified(), field.coinPair),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON(json: Record<string, any>): UnregisterPermissionPairEvent {
    if (json.$typeName !== UnregisterPermissionPairEvent.$typeName) {
      throw new Error(
        `not a UnregisterPermissionPairEvent json object: expected '${UnregisterPermissionPairEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UnregisterPermissionPairEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UnregisterPermissionPairEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUnregisterPermissionPairEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UnregisterPermissionPairEvent object`,
      )
    }
    return UnregisterPermissionPairEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UnregisterPermissionPairEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUnregisterPermissionPairEvent(data.bcs.type)) {
        throw new Error(`object at is not a UnregisterPermissionPairEvent object`)
      }

      return UnregisterPermissionPairEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UnregisterPermissionPairEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: SupportedSuiClient,
    id: string,
  ): Promise<UnregisterPermissionPairEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isUnregisterPermissionPairEvent(res.type)) {
      throw new Error(`object at id ${id} is not a UnregisterPermissionPairEvent object`)
    }

    return UnregisterPermissionPairEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== AddAllowedPairConfigEvent =============================== */

export function isAddAllowedPairConfigEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::AddAllowedPairConfigEvent')
    }::factory::AddAllowedPairConfigEvent`
}

export interface AddAllowedPairConfigEventFields {
  coinType: ToField<String>
  tickSpacing: ToField<'u32'>
}

export type AddAllowedPairConfigEventReified = Reified<
  AddAllowedPairConfigEvent,
  AddAllowedPairConfigEventFields
>

export type AddAllowedPairConfigEventJSONField = {
  coinType: string
  tickSpacing: number
}

export type AddAllowedPairConfigEventJSON = {
  $typeName: typeof AddAllowedPairConfigEvent.$typeName
  $typeArgs: []
} & AddAllowedPairConfigEventJSONField

/**
 * Event emitted when a allowed pair config is added
 * * `coin_type` - The type name of the coin
 * * `tick_spacing` - The tick spacing used for price discretization in the pool
 */
export class AddAllowedPairConfigEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::AddAllowedPairConfigEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::AddAllowedPairConfigEvent')
  }::factory::AddAllowedPairConfigEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddAllowedPairConfigEvent.$typeName =
    AddAllowedPairConfigEvent.$typeName
  readonly $fullTypeName: `${string}::factory::AddAllowedPairConfigEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddAllowedPairConfigEvent.$isPhantom =
    AddAllowedPairConfigEvent.$isPhantom

  readonly coinType: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: AddAllowedPairConfigEventFields) {
    this.$fullTypeName = composeSuiType(
      AddAllowedPairConfigEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::AddAllowedPairConfigEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): AddAllowedPairConfigEventReified {
    const reifiedBcs = AddAllowedPairConfigEvent.bcs
    return {
      typeName: AddAllowedPairConfigEvent.$typeName,
      fullTypeName: composeSuiType(
        AddAllowedPairConfigEvent.$typeName,
        ...[],
      ) as `${string}::factory::AddAllowedPairConfigEvent`,
      typeArgs: [] as [],
      isPhantom: AddAllowedPairConfigEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddAllowedPairConfigEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AddAllowedPairConfigEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddAllowedPairConfigEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddAllowedPairConfigEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddAllowedPairConfigEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        AddAllowedPairConfigEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AddAllowedPairConfigEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        AddAllowedPairConfigEvent.fetch(client, id),
      new: (fields: AddAllowedPairConfigEventFields) => {
        return new AddAllowedPairConfigEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddAllowedPairConfigEventReified {
    return AddAllowedPairConfigEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddAllowedPairConfigEvent>> {
    return phantom(AddAllowedPairConfigEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddAllowedPairConfigEvent>> {
    return AddAllowedPairConfigEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddAllowedPairConfigEvent', {
      coin_type: String.bcs,
      tick_spacing: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddAllowedPairConfigEvent.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof AddAllowedPairConfigEvent.instantiateBcs> {
    if (!AddAllowedPairConfigEvent.cachedBcs) {
      AddAllowedPairConfigEvent.cachedBcs = AddAllowedPairConfigEvent.instantiateBcs()
    }
    return AddAllowedPairConfigEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddAllowedPairConfigEvent {
    return AddAllowedPairConfigEvent.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddAllowedPairConfigEvent {
    if (!isAddAllowedPairConfigEvent(item.type)) {
      throw new Error('not a AddAllowedPairConfigEvent type')
    }

    return AddAllowedPairConfigEvent.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): AddAllowedPairConfigEvent {
    return AddAllowedPairConfigEvent.fromFields(AddAllowedPairConfigEvent.bcs.parse(data))
  }

  toJSONField(): AddAllowedPairConfigEventJSONField {
    return {
      coinType: this.coinType,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON(): AddAllowedPairConfigEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddAllowedPairConfigEvent {
    return AddAllowedPairConfigEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON(json: Record<string, any>): AddAllowedPairConfigEvent {
    if (json.$typeName !== AddAllowedPairConfigEvent.$typeName) {
      throw new Error(
        `not a AddAllowedPairConfigEvent json object: expected '${AddAllowedPairConfigEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddAllowedPairConfigEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddAllowedPairConfigEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddAllowedPairConfigEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AddAllowedPairConfigEvent object`,
      )
    }
    return AddAllowedPairConfigEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddAllowedPairConfigEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddAllowedPairConfigEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddAllowedPairConfigEvent object`)
      }

      return AddAllowedPairConfigEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddAllowedPairConfigEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AddAllowedPairConfigEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isAddAllowedPairConfigEvent(res.type)) {
      throw new Error(`object at id ${id} is not a AddAllowedPairConfigEvent object`)
    }

    return AddAllowedPairConfigEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== RemoveAllowedPairConfigEvent =============================== */

export function isRemoveAllowedPairConfigEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::RemoveAllowedPairConfigEvent')
    }::factory::RemoveAllowedPairConfigEvent`
}

export interface RemoveAllowedPairConfigEventFields {
  coinType: ToField<String>
  tickSpacing: ToField<'u32'>
}

export type RemoveAllowedPairConfigEventReified = Reified<
  RemoveAllowedPairConfigEvent,
  RemoveAllowedPairConfigEventFields
>

export type RemoveAllowedPairConfigEventJSONField = {
  coinType: string
  tickSpacing: number
}

export type RemoveAllowedPairConfigEventJSON = {
  $typeName: typeof RemoveAllowedPairConfigEvent.$typeName
  $typeArgs: []
} & RemoveAllowedPairConfigEventJSONField

/**
 * Event emitted when a allowed pair config is removed
 * * `coin_type` - The type name of the coin
 * * `tick_spacing` - The tick spacing used for price discretization in the pool
 */
export class RemoveAllowedPairConfigEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::RemoveAllowedPairConfigEvent` = `${
    getTypeOrigin('cetus-clmm', 'factory::RemoveAllowedPairConfigEvent')
  }::factory::RemoveAllowedPairConfigEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveAllowedPairConfigEvent.$typeName =
    RemoveAllowedPairConfigEvent.$typeName
  readonly $fullTypeName: `${string}::factory::RemoveAllowedPairConfigEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveAllowedPairConfigEvent.$isPhantom =
    RemoveAllowedPairConfigEvent.$isPhantom

  readonly coinType: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: RemoveAllowedPairConfigEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveAllowedPairConfigEvent.$typeName,
      ...typeArgs,
    ) as `${string}::factory::RemoveAllowedPairConfigEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): RemoveAllowedPairConfigEventReified {
    const reifiedBcs = RemoveAllowedPairConfigEvent.bcs
    return {
      typeName: RemoveAllowedPairConfigEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveAllowedPairConfigEvent.$typeName,
        ...[],
      ) as `${string}::factory::RemoveAllowedPairConfigEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveAllowedPairConfigEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveAllowedPairConfigEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveAllowedPairConfigEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        RemoveAllowedPairConfigEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveAllowedPairConfigEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveAllowedPairConfigEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveAllowedPairConfigEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveAllowedPairConfigEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        RemoveAllowedPairConfigEvent.fetch(client, id),
      new: (fields: RemoveAllowedPairConfigEventFields) => {
        return new RemoveAllowedPairConfigEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveAllowedPairConfigEventReified {
    return RemoveAllowedPairConfigEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveAllowedPairConfigEvent>> {
    return phantom(RemoveAllowedPairConfigEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveAllowedPairConfigEvent>> {
    return RemoveAllowedPairConfigEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveAllowedPairConfigEvent', {
      coin_type: String.bcs,
      tick_spacing: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveAllowedPairConfigEvent.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof RemoveAllowedPairConfigEvent.instantiateBcs> {
    if (!RemoveAllowedPairConfigEvent.cachedBcs) {
      RemoveAllowedPairConfigEvent.cachedBcs = RemoveAllowedPairConfigEvent.instantiateBcs()
    }
    return RemoveAllowedPairConfigEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveAllowedPairConfigEvent {
    return RemoveAllowedPairConfigEvent.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveAllowedPairConfigEvent {
    if (!isRemoveAllowedPairConfigEvent(item.type)) {
      throw new Error('not a RemoveAllowedPairConfigEvent type')
    }

    return RemoveAllowedPairConfigEvent.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
    })
  }

  static fromBcs(data: Uint8Array): RemoveAllowedPairConfigEvent {
    return RemoveAllowedPairConfigEvent.fromFields(RemoveAllowedPairConfigEvent.bcs.parse(data))
  }

  toJSONField(): RemoveAllowedPairConfigEventJSONField {
    return {
      coinType: this.coinType,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON(): RemoveAllowedPairConfigEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveAllowedPairConfigEvent {
    return RemoveAllowedPairConfigEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveAllowedPairConfigEvent {
    if (json.$typeName !== RemoveAllowedPairConfigEvent.$typeName) {
      throw new Error(
        `not a RemoveAllowedPairConfigEvent json object: expected '${RemoveAllowedPairConfigEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveAllowedPairConfigEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveAllowedPairConfigEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveAllowedPairConfigEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveAllowedPairConfigEvent object`,
      )
    }
    return RemoveAllowedPairConfigEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveAllowedPairConfigEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveAllowedPairConfigEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveAllowedPairConfigEvent object`)
      }

      return RemoveAllowedPairConfigEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveAllowedPairConfigEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: SupportedSuiClient,
    id: string,
  ): Promise<RemoveAllowedPairConfigEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isRemoveAllowedPairConfigEvent(res.type)) {
      throw new Error(`object at id ${id} is not a RemoveAllowedPairConfigEvent object`)
    }

    return RemoveAllowedPairConfigEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== MintPoolCreationCap =============================== */

export function isMintPoolCreationCap(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::MintPoolCreationCap')
    }::factory::MintPoolCreationCap`
}

export interface MintPoolCreationCapFields {
  coinType: ToField<String>
  cap: ToField<ID>
}

export type MintPoolCreationCapReified = Reified<MintPoolCreationCap, MintPoolCreationCapFields>

export type MintPoolCreationCapJSONField = {
  coinType: string
  cap: string
}

export type MintPoolCreationCapJSON = {
  $typeName: typeof MintPoolCreationCap.$typeName
  $typeArgs: []
} & MintPoolCreationCapJSONField

/**
 * Event emitted when a pool creation cap is minted
 * * `coin_type` - The type name of the coin
 * * `cap` - The unique identifier of the capability
 */
export class MintPoolCreationCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::MintPoolCreationCap` = `${
    getTypeOrigin('cetus-clmm', 'factory::MintPoolCreationCap')
  }::factory::MintPoolCreationCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof MintPoolCreationCap.$typeName = MintPoolCreationCap.$typeName
  readonly $fullTypeName: `${string}::factory::MintPoolCreationCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof MintPoolCreationCap.$isPhantom = MintPoolCreationCap.$isPhantom

  readonly coinType: ToField<String>
  readonly cap: ToField<ID>

  private constructor(typeArgs: [], fields: MintPoolCreationCapFields) {
    this.$fullTypeName = composeSuiType(
      MintPoolCreationCap.$typeName,
      ...typeArgs,
    ) as `${string}::factory::MintPoolCreationCap`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.cap = fields.cap
  }

  static reified(): MintPoolCreationCapReified {
    const reifiedBcs = MintPoolCreationCap.bcs
    return {
      typeName: MintPoolCreationCap.$typeName,
      fullTypeName: composeSuiType(
        MintPoolCreationCap.$typeName,
        ...[],
      ) as `${string}::factory::MintPoolCreationCap`,
      typeArgs: [] as [],
      isPhantom: MintPoolCreationCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MintPoolCreationCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MintPoolCreationCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MintPoolCreationCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MintPoolCreationCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MintPoolCreationCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => MintPoolCreationCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MintPoolCreationCap.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        MintPoolCreationCap.fetch(client, id),
      new: (fields: MintPoolCreationCapFields) => {
        return new MintPoolCreationCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): MintPoolCreationCapReified {
    return MintPoolCreationCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MintPoolCreationCap>> {
    return phantom(MintPoolCreationCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<MintPoolCreationCap>> {
    return MintPoolCreationCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('MintPoolCreationCap', {
      coin_type: String.bcs,
      cap: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof MintPoolCreationCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof MintPoolCreationCap.instantiateBcs> {
    if (!MintPoolCreationCap.cachedBcs) {
      MintPoolCreationCap.cachedBcs = MintPoolCreationCap.instantiateBcs()
    }
    return MintPoolCreationCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): MintPoolCreationCap {
    return MintPoolCreationCap.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      cap: decodeFromFields(ID.reified(), fields.cap),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MintPoolCreationCap {
    if (!isMintPoolCreationCap(item.type)) {
      throw new Error('not a MintPoolCreationCap type')
    }

    return MintPoolCreationCap.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      cap: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap),
    })
  }

  static fromBcs(data: Uint8Array): MintPoolCreationCap {
    return MintPoolCreationCap.fromFields(MintPoolCreationCap.bcs.parse(data))
  }

  toJSONField(): MintPoolCreationCapJSONField {
    return {
      coinType: this.coinType,
      cap: this.cap,
    }
  }

  toJSON(): MintPoolCreationCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): MintPoolCreationCap {
    return MintPoolCreationCap.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      cap: decodeFromJSONField(ID.reified(), field.cap),
    })
  }

  static fromJSON(json: Record<string, any>): MintPoolCreationCap {
    if (json.$typeName !== MintPoolCreationCap.$typeName) {
      throw new Error(
        `not a MintPoolCreationCap json object: expected '${MintPoolCreationCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return MintPoolCreationCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): MintPoolCreationCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMintPoolCreationCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MintPoolCreationCap object`)
    }
    return MintPoolCreationCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): MintPoolCreationCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMintPoolCreationCap(data.bcs.type)) {
        throw new Error(`object at is not a MintPoolCreationCap object`)
      }

      return MintPoolCreationCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MintPoolCreationCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<MintPoolCreationCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isMintPoolCreationCap(res.type)) {
      throw new Error(`object at id ${id} is not a MintPoolCreationCap object`)
    }

    return MintPoolCreationCap.fromBcs(res.bcsBytes)
  }
}

/* ============================== MintPoolCreationCapByAdmin =============================== */

export function isMintPoolCreationCapByAdmin(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'factory::MintPoolCreationCapByAdmin')
    }::factory::MintPoolCreationCapByAdmin`
}

export interface MintPoolCreationCapByAdminFields {
  coinType: ToField<String>
  cap: ToField<ID>
}

export type MintPoolCreationCapByAdminReified = Reified<
  MintPoolCreationCapByAdmin,
  MintPoolCreationCapByAdminFields
>

export type MintPoolCreationCapByAdminJSONField = {
  coinType: string
  cap: string
}

export type MintPoolCreationCapByAdminJSON = {
  $typeName: typeof MintPoolCreationCapByAdmin.$typeName
  $typeArgs: []
} & MintPoolCreationCapByAdminJSONField

/**
 * Event emitted when a pool creation cap is minted by admin
 * * `coin_type` - The type name of the coin
 * * `cap` - The unique identifier of the capability
 */
export class MintPoolCreationCapByAdmin implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::factory::MintPoolCreationCapByAdmin` = `${
    getTypeOrigin('cetus-clmm', 'factory::MintPoolCreationCapByAdmin')
  }::factory::MintPoolCreationCapByAdmin` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof MintPoolCreationCapByAdmin.$typeName =
    MintPoolCreationCapByAdmin.$typeName
  readonly $fullTypeName: `${string}::factory::MintPoolCreationCapByAdmin`
  readonly $typeArgs: []
  readonly $isPhantom: typeof MintPoolCreationCapByAdmin.$isPhantom =
    MintPoolCreationCapByAdmin.$isPhantom

  readonly coinType: ToField<String>
  readonly cap: ToField<ID>

  private constructor(typeArgs: [], fields: MintPoolCreationCapByAdminFields) {
    this.$fullTypeName = composeSuiType(
      MintPoolCreationCapByAdmin.$typeName,
      ...typeArgs,
    ) as `${string}::factory::MintPoolCreationCapByAdmin`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.cap = fields.cap
  }

  static reified(): MintPoolCreationCapByAdminReified {
    const reifiedBcs = MintPoolCreationCapByAdmin.bcs
    return {
      typeName: MintPoolCreationCapByAdmin.$typeName,
      fullTypeName: composeSuiType(
        MintPoolCreationCapByAdmin.$typeName,
        ...[],
      ) as `${string}::factory::MintPoolCreationCapByAdmin`,
      typeArgs: [] as [],
      isPhantom: MintPoolCreationCapByAdmin.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MintPoolCreationCapByAdmin.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        MintPoolCreationCapByAdmin.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MintPoolCreationCapByAdmin.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MintPoolCreationCapByAdmin.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MintPoolCreationCapByAdmin.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        MintPoolCreationCapByAdmin.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        MintPoolCreationCapByAdmin.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        MintPoolCreationCapByAdmin.fetch(client, id),
      new: (fields: MintPoolCreationCapByAdminFields) => {
        return new MintPoolCreationCapByAdmin([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): MintPoolCreationCapByAdminReified {
    return MintPoolCreationCapByAdmin.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MintPoolCreationCapByAdmin>> {
    return phantom(MintPoolCreationCapByAdmin.reified())
  }

  static get p(): PhantomReified<ToTypeStr<MintPoolCreationCapByAdmin>> {
    return MintPoolCreationCapByAdmin.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('MintPoolCreationCapByAdmin', {
      coin_type: String.bcs,
      cap: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof MintPoolCreationCapByAdmin.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof MintPoolCreationCapByAdmin.instantiateBcs> {
    if (!MintPoolCreationCapByAdmin.cachedBcs) {
      MintPoolCreationCapByAdmin.cachedBcs = MintPoolCreationCapByAdmin.instantiateBcs()
    }
    return MintPoolCreationCapByAdmin.cachedBcs
  }

  static fromFields(fields: Record<string, any>): MintPoolCreationCapByAdmin {
    return MintPoolCreationCapByAdmin.reified().new({
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      cap: decodeFromFields(ID.reified(), fields.cap),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MintPoolCreationCapByAdmin {
    if (!isMintPoolCreationCapByAdmin(item.type)) {
      throw new Error('not a MintPoolCreationCapByAdmin type')
    }

    return MintPoolCreationCapByAdmin.reified().new({
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      cap: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap),
    })
  }

  static fromBcs(data: Uint8Array): MintPoolCreationCapByAdmin {
    return MintPoolCreationCapByAdmin.fromFields(MintPoolCreationCapByAdmin.bcs.parse(data))
  }

  toJSONField(): MintPoolCreationCapByAdminJSONField {
    return {
      coinType: this.coinType,
      cap: this.cap,
    }
  }

  toJSON(): MintPoolCreationCapByAdminJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): MintPoolCreationCapByAdmin {
    return MintPoolCreationCapByAdmin.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      cap: decodeFromJSONField(ID.reified(), field.cap),
    })
  }

  static fromJSON(json: Record<string, any>): MintPoolCreationCapByAdmin {
    if (json.$typeName !== MintPoolCreationCapByAdmin.$typeName) {
      throw new Error(
        `not a MintPoolCreationCapByAdmin json object: expected '${MintPoolCreationCapByAdmin.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return MintPoolCreationCapByAdmin.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): MintPoolCreationCapByAdmin {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMintPoolCreationCapByAdmin(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a MintPoolCreationCapByAdmin object`,
      )
    }
    return MintPoolCreationCapByAdmin.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): MintPoolCreationCapByAdmin {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMintPoolCreationCapByAdmin(data.bcs.type)) {
        throw new Error(`object at is not a MintPoolCreationCapByAdmin object`)
      }

      return MintPoolCreationCapByAdmin.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MintPoolCreationCapByAdmin.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<MintPoolCreationCapByAdmin> {
    const res = await fetchObjectBcs(client, id)
    if (!isMintPoolCreationCapByAdmin(res.type)) {
      throw new Error(`object at id ${id} is not a MintPoolCreationCapByAdmin object`)
    }

    return MintPoolCreationCapByAdmin.fromBcs(res.bcsBytes)
  }
}
