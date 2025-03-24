import * as reified from '../../_framework/reified'
import { LinkedTable } from '../../_dependencies/source/0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa/linked-table/structs'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  ToTypeStr as ToPhantom,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { String } from '../../move-stdlib/string/structs'
import { TypeName } from '../../move-stdlib/type-name/structs'
import { ID, UID } from '../../sui/object/structs'
import { Table } from '../../sui/table/structs'
import { VecSet } from '../../sui/vec-set/structs'
import { PKG_V1, PKG_V8 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== CreatePoolEvent =============================== */

export function isCreatePoolEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::CreatePoolEvent`
}

export interface CreatePoolEventFields {
  poolId: ToField<ID>
  coinTypeA: ToField<String>
  coinTypeB: ToField<String>
  tickSpacing: ToField<'u32'>
}

export type CreatePoolEventReified = Reified<CreatePoolEvent, CreatePoolEventFields>

export class CreatePoolEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::CreatePoolEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CreatePoolEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::CreatePoolEvent`
  readonly $typeArgs: []
  readonly $isPhantom = CreatePoolEvent.$isPhantom

  readonly poolId: ToField<ID>
  readonly coinTypeA: ToField<String>
  readonly coinTypeB: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: CreatePoolEventFields) {
    this.$fullTypeName = composeSuiType(
      CreatePoolEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::CreatePoolEvent`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.coinTypeA = fields.coinTypeA
    this.coinTypeB = fields.coinTypeB
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): CreatePoolEventReified {
    return {
      typeName: CreatePoolEvent.$typeName,
      fullTypeName: composeSuiType(
        CreatePoolEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::CreatePoolEvent`,
      typeArgs: [] as [],
      isPhantom: CreatePoolEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CreatePoolEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CreatePoolEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CreatePoolEvent.fromBcs(data),
      bcs: CreatePoolEvent.bcs,
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

  static get bcs() {
    return bcs.struct('CreatePoolEvent', {
      pool_id: ID.bcs,
      coin_type_a: String.bcs,
      coin_type_b: String.bcs,
      tick_spacing: bcs.u32(),
    })
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

  toJSONField() {
    return {
      poolId: this.poolId,
      coinTypeA: this.coinTypeA,
      coinTypeB: this.coinTypeB,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
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

/* ============================== DenyCoinList =============================== */

export function isDenyCoinList(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V8}::factory::DenyCoinList`
}

export interface DenyCoinListFields {
  id: ToField<UID>
  deniedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
  allowedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
}

export type DenyCoinListReified = Reified<DenyCoinList, DenyCoinListFields>

export class DenyCoinList implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V8}::factory::DenyCoinList`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DenyCoinList.$typeName
  readonly $fullTypeName: `${typeof PKG_V8}::factory::DenyCoinList`
  readonly $typeArgs: []
  readonly $isPhantom = DenyCoinList.$isPhantom

  readonly id: ToField<UID>
  readonly deniedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
  readonly allowedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>

  private constructor(typeArgs: [], fields: DenyCoinListFields) {
    this.$fullTypeName = composeSuiType(
      DenyCoinList.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V8}::factory::DenyCoinList`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.deniedList = fields.deniedList
    this.allowedList = fields.allowedList
  }

  static reified(): DenyCoinListReified {
    return {
      typeName: DenyCoinList.$typeName,
      fullTypeName: composeSuiType(
        DenyCoinList.$typeName,
        ...[]
      ) as `${typeof PKG_V8}::factory::DenyCoinList`,
      typeArgs: [] as [],
      isPhantom: DenyCoinList.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DenyCoinList.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DenyCoinList.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DenyCoinList.fromBcs(data),
      bcs: DenyCoinList.bcs,
      fromJSONField: (field: any) => DenyCoinList.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DenyCoinList.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DenyCoinList.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DenyCoinList.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DenyCoinList.fetch(client, id),
      new: (fields: DenyCoinListFields) => {
        return new DenyCoinList([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DenyCoinList.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DenyCoinList>> {
    return phantom(DenyCoinList.reified())
  }
  static get p() {
    return DenyCoinList.phantom()
  }

  static get bcs() {
    return bcs.struct('DenyCoinList', {
      id: UID.bcs,
      denied_list: Table.bcs,
      allowed_list: Table.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): DenyCoinList {
    return DenyCoinList.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      deniedList: decodeFromFields(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('bool')),
        fields.denied_list
      ),
      allowedList: decodeFromFields(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('bool')),
        fields.allowed_list
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
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('bool')),
        item.fields.denied_list
      ),
      allowedList: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('bool')),
        item.fields.allowed_list
      ),
    })
  }

  static fromBcs(data: Uint8Array): DenyCoinList {
    return DenyCoinList.fromFields(DenyCoinList.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      deniedList: this.deniedList.toJSONField(),
      allowedList: this.allowedList.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DenyCoinList {
    return DenyCoinList.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      deniedList: decodeFromJSONField(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('bool')),
        field.deniedList
      ),
      allowedList: decodeFromJSONField(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('bool')),
        field.allowedList
      ),
    })
  }

  static fromJSON(json: Record<string, any>): DenyCoinList {
    if (json.$typeName !== DenyCoinList.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return DenyCoinList.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DenyCoinList.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DenyCoinList> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DenyCoinList object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDenyCoinList(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DenyCoinList object`)
    }

    return DenyCoinList.fromSuiObjectData(res.data)
  }
}

/* ============================== InitFactoryEvent =============================== */

export function isInitFactoryEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::InitFactoryEvent`
}

export interface InitFactoryEventFields {
  poolsId: ToField<ID>
}

export type InitFactoryEventReified = Reified<InitFactoryEvent, InitFactoryEventFields>

export class InitFactoryEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::InitFactoryEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InitFactoryEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::InitFactoryEvent`
  readonly $typeArgs: []
  readonly $isPhantom = InitFactoryEvent.$isPhantom

  readonly poolsId: ToField<ID>

  private constructor(typeArgs: [], fields: InitFactoryEventFields) {
    this.$fullTypeName = composeSuiType(
      InitFactoryEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::InitFactoryEvent`
    this.$typeArgs = typeArgs

    this.poolsId = fields.poolsId
  }

  static reified(): InitFactoryEventReified {
    return {
      typeName: InitFactoryEvent.$typeName,
      fullTypeName: composeSuiType(
        InitFactoryEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::InitFactoryEvent`,
      typeArgs: [] as [],
      isPhantom: InitFactoryEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InitFactoryEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => InitFactoryEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InitFactoryEvent.fromBcs(data),
      bcs: InitFactoryEvent.bcs,
      fromJSONField: (field: any) => InitFactoryEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitFactoryEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => InitFactoryEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => InitFactoryEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => InitFactoryEvent.fetch(client, id),
      new: (fields: InitFactoryEventFields) => {
        return new InitFactoryEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InitFactoryEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitFactoryEvent>> {
    return phantom(InitFactoryEvent.reified())
  }
  static get p() {
    return InitFactoryEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('InitFactoryEvent', {
      pools_id: ID.bcs,
    })
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

  toJSONField() {
    return {
      poolsId: this.poolsId,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InitFactoryEvent {
    return InitFactoryEvent.reified().new({
      poolsId: decodeFromJSONField(ID.reified(), field.poolsId),
    })
  }

  static fromJSON(json: Record<string, any>): InitFactoryEvent {
    if (json.$typeName !== InitFactoryEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return InitFactoryEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitFactoryEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InitFactoryEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching InitFactoryEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isInitFactoryEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a InitFactoryEvent object`)
    }

    return InitFactoryEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== PermissionPairManager =============================== */

export function isPermissionPairManager(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V8}::factory::PermissionPairManager`
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

export class PermissionPairManager implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V8}::factory::PermissionPairManager`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PermissionPairManager.$typeName
  readonly $fullTypeName: `${typeof PKG_V8}::factory::PermissionPairManager`
  readonly $typeArgs: []
  readonly $isPhantom = PermissionPairManager.$isPhantom

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
      ...typeArgs
    ) as `${typeof PKG_V8}::factory::PermissionPairManager`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.allowedPairConfig = fields.allowedPairConfig
    this.poolKeyToCap = fields.poolKeyToCap
    this.capToPoolKey = fields.capToPoolKey
    this.coinTypeToCap = fields.coinTypeToCap
  }

  static reified(): PermissionPairManagerReified {
    return {
      typeName: PermissionPairManager.$typeName,
      fullTypeName: composeSuiType(
        PermissionPairManager.$typeName,
        ...[]
      ) as `${typeof PKG_V8}::factory::PermissionPairManager`,
      typeArgs: [] as [],
      isPhantom: PermissionPairManager.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PermissionPairManager.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PermissionPairManager.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PermissionPairManager.fromBcs(data),
      bcs: PermissionPairManager.bcs,
      fromJSONField: (field: any) => PermissionPairManager.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PermissionPairManager.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PermissionPairManager.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PermissionPairManager.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PermissionPairManager.fetch(client, id),
      new: (fields: PermissionPairManagerFields) => {
        return new PermissionPairManager([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PermissionPairManager.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PermissionPairManager>> {
    return phantom(PermissionPairManager.reified())
  }
  static get p() {
    return PermissionPairManager.phantom()
  }

  static get bcs() {
    return bcs.struct('PermissionPairManager', {
      id: UID.bcs,
      allowed_pair_config: Table.bcs,
      pool_key_to_cap: Table.bcs,
      cap_to_pool_key: Table.bcs,
      coin_type_to_cap: Table.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): PermissionPairManager {
    return PermissionPairManager.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      allowedPairConfig: decodeFromFields(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom(VecSet.reified('u32'))),
        fields.allowed_pair_config
      ),
      poolKeyToCap: decodeFromFields(
        Table.reified(reified.phantom(ID.reified()), reified.phantom(ID.reified())),
        fields.pool_key_to_cap
      ),
      capToPoolKey: decodeFromFields(
        Table.reified(
          reified.phantom(ID.reified()),
          reified.phantom(
            Table.reified(reified.phantom(ID.reified()), reified.phantom(PoolKey.reified()))
          )
        ),
        fields.cap_to_pool_key
      ),
      coinTypeToCap: decodeFromFields(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom(ID.reified())),
        fields.coin_type_to_cap
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
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom(VecSet.reified('u32'))),
        item.fields.allowed_pair_config
      ),
      poolKeyToCap: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(ID.reified()), reified.phantom(ID.reified())),
        item.fields.pool_key_to_cap
      ),
      capToPoolKey: decodeFromFieldsWithTypes(
        Table.reified(
          reified.phantom(ID.reified()),
          reified.phantom(
            Table.reified(reified.phantom(ID.reified()), reified.phantom(PoolKey.reified()))
          )
        ),
        item.fields.cap_to_pool_key
      ),
      coinTypeToCap: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom(ID.reified())),
        item.fields.coin_type_to_cap
      ),
    })
  }

  static fromBcs(data: Uint8Array): PermissionPairManager {
    return PermissionPairManager.fromFields(PermissionPairManager.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      allowedPairConfig: this.allowedPairConfig.toJSONField(),
      poolKeyToCap: this.poolKeyToCap.toJSONField(),
      capToPoolKey: this.capToPoolKey.toJSONField(),
      coinTypeToCap: this.coinTypeToCap.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PermissionPairManager {
    return PermissionPairManager.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      allowedPairConfig: decodeFromJSONField(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom(VecSet.reified('u32'))),
        field.allowedPairConfig
      ),
      poolKeyToCap: decodeFromJSONField(
        Table.reified(reified.phantom(ID.reified()), reified.phantom(ID.reified())),
        field.poolKeyToCap
      ),
      capToPoolKey: decodeFromJSONField(
        Table.reified(
          reified.phantom(ID.reified()),
          reified.phantom(
            Table.reified(reified.phantom(ID.reified()), reified.phantom(PoolKey.reified()))
          )
        ),
        field.capToPoolKey
      ),
      coinTypeToCap: decodeFromJSONField(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom(ID.reified())),
        field.coinTypeToCap
      ),
    })
  }

  static fromJSON(json: Record<string, any>): PermissionPairManager {
    if (json.$typeName !== PermissionPairManager.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PermissionPairManager.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PermissionPairManager {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPermissionPairManager(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PermissionPairManager object`
      )
    }
    return PermissionPairManager.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PermissionPairManager {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPermissionPairManager(data.bcs.type)) {
        throw new Error(`object at is not a PermissionPairManager object`)
      }

      return PermissionPairManager.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PermissionPairManager.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PermissionPairManager> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PermissionPairManager object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPermissionPairManager(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PermissionPairManager object`)
    }

    return PermissionPairManager.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolCreationCap =============================== */

export function isPoolCreationCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V8}::factory::PoolCreationCap`
}

export interface PoolCreationCapFields {
  id: ToField<UID>
  coinType: ToField<TypeName>
}

export type PoolCreationCapReified = Reified<PoolCreationCap, PoolCreationCapFields>

export class PoolCreationCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V8}::factory::PoolCreationCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolCreationCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V8}::factory::PoolCreationCap`
  readonly $typeArgs: []
  readonly $isPhantom = PoolCreationCap.$isPhantom

  readonly id: ToField<UID>
  readonly coinType: ToField<TypeName>

  private constructor(typeArgs: [], fields: PoolCreationCapFields) {
    this.$fullTypeName = composeSuiType(
      PoolCreationCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V8}::factory::PoolCreationCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.coinType = fields.coinType
  }

  static reified(): PoolCreationCapReified {
    return {
      typeName: PoolCreationCap.$typeName,
      fullTypeName: composeSuiType(
        PoolCreationCap.$typeName,
        ...[]
      ) as `${typeof PKG_V8}::factory::PoolCreationCap`,
      typeArgs: [] as [],
      isPhantom: PoolCreationCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolCreationCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolCreationCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolCreationCap.fromBcs(data),
      bcs: PoolCreationCap.bcs,
      fromJSONField: (field: any) => PoolCreationCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolCreationCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolCreationCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolCreationCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolCreationCap.fetch(client, id),
      new: (fields: PoolCreationCapFields) => {
        return new PoolCreationCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolCreationCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolCreationCap>> {
    return phantom(PoolCreationCap.reified())
  }
  static get p() {
    return PoolCreationCap.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolCreationCap', {
      id: UID.bcs,
      coin_type: TypeName.bcs,
    })
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

  toJSONField() {
    return {
      id: this.id,
      coinType: this.coinType.toJSONField(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return PoolCreationCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolCreationCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolCreationCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolCreationCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolCreationCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolCreationCap object`)
    }

    return PoolCreationCap.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolKey =============================== */

export function isPoolKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V8}::factory::PoolKey`
}

export interface PoolKeyFields {
  coinA: ToField<TypeName>
  coinB: ToField<TypeName>
  tickSpacing: ToField<'u32'>
}

export type PoolKeyReified = Reified<PoolKey, PoolKeyFields>

export class PoolKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V8}::factory::PoolKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V8}::factory::PoolKey`
  readonly $typeArgs: []
  readonly $isPhantom = PoolKey.$isPhantom

  readonly coinA: ToField<TypeName>
  readonly coinB: ToField<TypeName>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: PoolKeyFields) {
    this.$fullTypeName = composeSuiType(
      PoolKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V8}::factory::PoolKey`
    this.$typeArgs = typeArgs

    this.coinA = fields.coinA
    this.coinB = fields.coinB
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): PoolKeyReified {
    return {
      typeName: PoolKey.$typeName,
      fullTypeName: composeSuiType(
        PoolKey.$typeName,
        ...[]
      ) as `${typeof PKG_V8}::factory::PoolKey`,
      typeArgs: [] as [],
      isPhantom: PoolKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolKey.fromBcs(data),
      bcs: PoolKey.bcs,
      fromJSONField: (field: any) => PoolKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolKey.fetch(client, id),
      new: (fields: PoolKeyFields) => {
        return new PoolKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolKey>> {
    return phantom(PoolKey.reified())
  }
  static get p() {
    return PoolKey.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolKey', {
      coin_a: TypeName.bcs,
      coin_b: TypeName.bcs,
      tick_spacing: bcs.u32(),
    })
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

  toJSONField() {
    return {
      coinA: this.coinA.toJSONField(),
      coinB: this.coinB.toJSONField(),
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return PoolKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolKey object`)
    }

    return PoolKey.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolSimpleInfo =============================== */

export function isPoolSimpleInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::PoolSimpleInfo`
}

export interface PoolSimpleInfoFields {
  poolId: ToField<ID>
  poolKey: ToField<ID>
  coinTypeA: ToField<TypeName>
  coinTypeB: ToField<TypeName>
  tickSpacing: ToField<'u32'>
}

export type PoolSimpleInfoReified = Reified<PoolSimpleInfo, PoolSimpleInfoFields>

export class PoolSimpleInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::PoolSimpleInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolSimpleInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::PoolSimpleInfo`
  readonly $typeArgs: []
  readonly $isPhantom = PoolSimpleInfo.$isPhantom

  readonly poolId: ToField<ID>
  readonly poolKey: ToField<ID>
  readonly coinTypeA: ToField<TypeName>
  readonly coinTypeB: ToField<TypeName>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: PoolSimpleInfoFields) {
    this.$fullTypeName = composeSuiType(
      PoolSimpleInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::PoolSimpleInfo`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.poolKey = fields.poolKey
    this.coinTypeA = fields.coinTypeA
    this.coinTypeB = fields.coinTypeB
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): PoolSimpleInfoReified {
    return {
      typeName: PoolSimpleInfo.$typeName,
      fullTypeName: composeSuiType(
        PoolSimpleInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::PoolSimpleInfo`,
      typeArgs: [] as [],
      isPhantom: PoolSimpleInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolSimpleInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolSimpleInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolSimpleInfo.fromBcs(data),
      bcs: PoolSimpleInfo.bcs,
      fromJSONField: (field: any) => PoolSimpleInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolSimpleInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolSimpleInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolSimpleInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolSimpleInfo.fetch(client, id),
      new: (fields: PoolSimpleInfoFields) => {
        return new PoolSimpleInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolSimpleInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolSimpleInfo>> {
    return phantom(PoolSimpleInfo.reified())
  }
  static get p() {
    return PoolSimpleInfo.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolSimpleInfo', {
      pool_id: ID.bcs,
      pool_key: ID.bcs,
      coin_type_a: TypeName.bcs,
      coin_type_b: TypeName.bcs,
      tick_spacing: bcs.u32(),
    })
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

  toJSONField() {
    return {
      poolId: this.poolId,
      poolKey: this.poolKey,
      coinTypeA: this.coinTypeA.toJSONField(),
      coinTypeB: this.coinTypeB.toJSONField(),
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return PoolSimpleInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolSimpleInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolSimpleInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolSimpleInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolSimpleInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolSimpleInfo object`)
    }

    return PoolSimpleInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== Pools =============================== */

export function isPools(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::Pools`
}

export interface PoolsFields {
  id: ToField<UID>
  list: ToField<LinkedTable<ID, ToPhantom<PoolSimpleInfo>>>
  index: ToField<'u64'>
}

export type PoolsReified = Reified<Pools, PoolsFields>

export class Pools implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::Pools`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Pools.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::Pools`
  readonly $typeArgs: []
  readonly $isPhantom = Pools.$isPhantom

  readonly id: ToField<UID>
  readonly list: ToField<LinkedTable<ID, ToPhantom<PoolSimpleInfo>>>
  readonly index: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolsFields) {
    this.$fullTypeName = composeSuiType(
      Pools.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::Pools`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.list = fields.list
    this.index = fields.index
  }

  static reified(): PoolsReified {
    return {
      typeName: Pools.$typeName,
      fullTypeName: composeSuiType(Pools.$typeName, ...[]) as `${typeof PKG_V1}::factory::Pools`,
      typeArgs: [] as [],
      isPhantom: Pools.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Pools.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Pools.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Pools.fromBcs(data),
      bcs: Pools.bcs,
      fromJSONField: (field: any) => Pools.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Pools.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Pools.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Pools.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Pools.fetch(client, id),
      new: (fields: PoolsFields) => {
        return new Pools([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Pools.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Pools>> {
    return phantom(Pools.reified())
  }
  static get p() {
    return Pools.phantom()
  }

  static get bcs() {
    return bcs.struct('Pools', {
      id: UID.bcs,
      list: LinkedTable.bcs(ID.bcs),
      index: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): Pools {
    return Pools.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      list: decodeFromFields(
        LinkedTable.reified(ID.reified(), reified.phantom(PoolSimpleInfo.reified())),
        fields.list
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
        LinkedTable.reified(ID.reified(), reified.phantom(PoolSimpleInfo.reified())),
        item.fields.list
      ),
      index: decodeFromFieldsWithTypes('u64', item.fields.index),
    })
  }

  static fromBcs(data: Uint8Array): Pools {
    return Pools.fromFields(Pools.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      list: this.list.toJSONField(),
      index: this.index.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Pools {
    return Pools.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      list: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), reified.phantom(PoolSimpleInfo.reified())),
        field.list
      ),
      index: decodeFromJSONField('u64', field.index),
    })
  }

  static fromJSON(json: Record<string, any>): Pools {
    if (json.$typeName !== Pools.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return Pools.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Pools.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Pools> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Pools object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPools(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Pools object`)
    }

    return Pools.fromSuiObjectData(res.data)
  }
}
