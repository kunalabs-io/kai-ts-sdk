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
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { String } from '../../0x1/string/structs'
import { TypeName } from '../../0x1/type-name/structs'
import { ID, UID } from '../../0x2/object/structs'
import { Table } from '../../0x2/table/structs'
import { VecSet } from '../../0x2/vec-set/structs'
import { LinkedTable } from '../../0xbe21a06129308e0495431d12286127897aff07a8ade3970495a4404d97f9eaaa/linked-table/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== AddAllowedListEvent =============================== */

export function isAddAllowedListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::AddAllowedListEvent`
}

export interface AddAllowedListEventFields {
  coinType: ToField<String>
}

export type AddAllowedListEventReified = Reified<AddAllowedListEvent, AddAllowedListEventFields>

export class AddAllowedListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::AddAllowedListEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddAllowedListEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::AddAllowedListEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddAllowedListEvent.$isPhantom

  readonly coinType: ToField<String>

  private constructor(typeArgs: [], fields: AddAllowedListEventFields) {
    this.$fullTypeName = composeSuiType(
      AddAllowedListEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::AddAllowedListEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
  }

  static reified(): AddAllowedListEventReified {
    return {
      typeName: AddAllowedListEvent.$typeName,
      fullTypeName: composeSuiType(
        AddAllowedListEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::AddAllowedListEvent`,
      typeArgs: [] as [],
      isPhantom: AddAllowedListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddAllowedListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddAllowedListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddAllowedListEvent.fromBcs(data),
      bcs: AddAllowedListEvent.bcs,
      fromJSONField: (field: any) => AddAllowedListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddAllowedListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddAllowedListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddAllowedListEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddAllowedListEvent.fetch(client, id),
      new: (fields: AddAllowedListEventFields) => {
        return new AddAllowedListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddAllowedListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddAllowedListEvent>> {
    return phantom(AddAllowedListEvent.reified())
  }
  static get p() {
    return AddAllowedListEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('AddAllowedListEvent', {
      coin_type: String.bcs,
    })
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

  toJSONField() {
    return {
      coinType: this.coinType,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddAllowedListEvent {
    return AddAllowedListEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): AddAllowedListEvent {
    if (json.$typeName !== AddAllowedListEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return AddAllowedListEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddAllowedListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddAllowedListEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddAllowedListEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddAllowedListEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddAllowedListEvent object`)
    }

    return AddAllowedListEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AddAllowedPairConfigEvent =============================== */

export function isAddAllowedPairConfigEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::AddAllowedPairConfigEvent`
}

export interface AddAllowedPairConfigEventFields {
  coinType: ToField<String>
  tickSpacing: ToField<'u32'>
}

export type AddAllowedPairConfigEventReified = Reified<
  AddAllowedPairConfigEvent,
  AddAllowedPairConfigEventFields
>

export class AddAllowedPairConfigEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::AddAllowedPairConfigEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddAllowedPairConfigEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::AddAllowedPairConfigEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddAllowedPairConfigEvent.$isPhantom

  readonly coinType: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: AddAllowedPairConfigEventFields) {
    this.$fullTypeName = composeSuiType(
      AddAllowedPairConfigEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::AddAllowedPairConfigEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): AddAllowedPairConfigEventReified {
    return {
      typeName: AddAllowedPairConfigEvent.$typeName,
      fullTypeName: composeSuiType(
        AddAllowedPairConfigEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::AddAllowedPairConfigEvent`,
      typeArgs: [] as [],
      isPhantom: AddAllowedPairConfigEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddAllowedPairConfigEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AddAllowedPairConfigEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddAllowedPairConfigEvent.fromBcs(data),
      bcs: AddAllowedPairConfigEvent.bcs,
      fromJSONField: (field: any) => AddAllowedPairConfigEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddAllowedPairConfigEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        AddAllowedPairConfigEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AddAllowedPairConfigEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddAllowedPairConfigEvent.fetch(client, id),
      new: (fields: AddAllowedPairConfigEventFields) => {
        return new AddAllowedPairConfigEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddAllowedPairConfigEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddAllowedPairConfigEvent>> {
    return phantom(AddAllowedPairConfigEvent.reified())
  }
  static get p() {
    return AddAllowedPairConfigEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('AddAllowedPairConfigEvent', {
      coin_type: String.bcs,
      tick_spacing: bcs.u32(),
    })
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

  toJSONField() {
    return {
      coinType: this.coinType,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return AddAllowedPairConfigEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddAllowedPairConfigEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddAllowedPairConfigEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AddAllowedPairConfigEvent object`
      )
    }
    return AddAllowedPairConfigEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddAllowedPairConfigEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddAllowedPairConfigEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddAllowedPairConfigEvent object`)
      }

      return AddAllowedPairConfigEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddAllowedPairConfigEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddAllowedPairConfigEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching AddAllowedPairConfigEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isAddAllowedPairConfigEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a AddAllowedPairConfigEvent object`)
    }

    return AddAllowedPairConfigEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AddDeniedListEvent =============================== */

export function isAddDeniedListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::AddDeniedListEvent`
}

export interface AddDeniedListEventFields {
  coinType: ToField<String>
}

export type AddDeniedListEventReified = Reified<AddDeniedListEvent, AddDeniedListEventFields>

export class AddDeniedListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::AddDeniedListEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddDeniedListEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::AddDeniedListEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddDeniedListEvent.$isPhantom

  readonly coinType: ToField<String>

  private constructor(typeArgs: [], fields: AddDeniedListEventFields) {
    this.$fullTypeName = composeSuiType(
      AddDeniedListEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::AddDeniedListEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
  }

  static reified(): AddDeniedListEventReified {
    return {
      typeName: AddDeniedListEvent.$typeName,
      fullTypeName: composeSuiType(
        AddDeniedListEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::AddDeniedListEvent`,
      typeArgs: [] as [],
      isPhantom: AddDeniedListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddDeniedListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddDeniedListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddDeniedListEvent.fromBcs(data),
      bcs: AddDeniedListEvent.bcs,
      fromJSONField: (field: any) => AddDeniedListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddDeniedListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddDeniedListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddDeniedListEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddDeniedListEvent.fetch(client, id),
      new: (fields: AddDeniedListEventFields) => {
        return new AddDeniedListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddDeniedListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddDeniedListEvent>> {
    return phantom(AddDeniedListEvent.reified())
  }
  static get p() {
    return AddDeniedListEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('AddDeniedListEvent', {
      coin_type: String.bcs,
    })
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

  toJSONField() {
    return {
      coinType: this.coinType,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddDeniedListEvent {
    return AddDeniedListEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): AddDeniedListEvent {
    if (json.$typeName !== AddDeniedListEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return AddDeniedListEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddDeniedListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddDeniedListEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddDeniedListEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddDeniedListEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddDeniedListEvent object`)
    }

    return AddDeniedListEvent.fromSuiObjectData(res.data)
  }
}

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
  return type === `${PKG_V1}::factory::DenyCoinList`
}

export interface DenyCoinListFields {
  id: ToField<UID>
  deniedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
  allowedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
}

export type DenyCoinListReified = Reified<DenyCoinList, DenyCoinListFields>

export class DenyCoinList implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::DenyCoinList`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DenyCoinList.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::DenyCoinList`
  readonly $typeArgs: []
  readonly $isPhantom = DenyCoinList.$isPhantom

  readonly id: ToField<UID>
  readonly deniedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>
  readonly allowedList: ToField<Table<ToPhantom<TypeName>, 'bool'>>

  private constructor(typeArgs: [], fields: DenyCoinListFields) {
    this.$fullTypeName = composeSuiType(
      DenyCoinList.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::DenyCoinList`
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
      ) as `${typeof PKG_V1}::factory::DenyCoinList`,
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

/* ============================== InitPermissionPairManagerEvent =============================== */

export function isInitPermissionPairManagerEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::InitPermissionPairManagerEvent`
}

export interface InitPermissionPairManagerEventFields {
  managerId: ToField<ID>
  deniedListId: ToField<ID>
}

export type InitPermissionPairManagerEventReified = Reified<
  InitPermissionPairManagerEvent,
  InitPermissionPairManagerEventFields
>

export class InitPermissionPairManagerEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::InitPermissionPairManagerEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InitPermissionPairManagerEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::InitPermissionPairManagerEvent`
  readonly $typeArgs: []
  readonly $isPhantom = InitPermissionPairManagerEvent.$isPhantom

  readonly managerId: ToField<ID>
  readonly deniedListId: ToField<ID>

  private constructor(typeArgs: [], fields: InitPermissionPairManagerEventFields) {
    this.$fullTypeName = composeSuiType(
      InitPermissionPairManagerEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::InitPermissionPairManagerEvent`
    this.$typeArgs = typeArgs

    this.managerId = fields.managerId
    this.deniedListId = fields.deniedListId
  }

  static reified(): InitPermissionPairManagerEventReified {
    return {
      typeName: InitPermissionPairManagerEvent.$typeName,
      fullTypeName: composeSuiType(
        InitPermissionPairManagerEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::InitPermissionPairManagerEvent`,
      typeArgs: [] as [],
      isPhantom: InitPermissionPairManagerEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        InitPermissionPairManagerEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        InitPermissionPairManagerEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InitPermissionPairManagerEvent.fromBcs(data),
      bcs: InitPermissionPairManagerEvent.bcs,
      fromJSONField: (field: any) => InitPermissionPairManagerEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitPermissionPairManagerEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        InitPermissionPairManagerEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        InitPermissionPairManagerEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        InitPermissionPairManagerEvent.fetch(client, id),
      new: (fields: InitPermissionPairManagerEventFields) => {
        return new InitPermissionPairManagerEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InitPermissionPairManagerEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitPermissionPairManagerEvent>> {
    return phantom(InitPermissionPairManagerEvent.reified())
  }
  static get p() {
    return InitPermissionPairManagerEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('InitPermissionPairManagerEvent', {
      manager_id: ID.bcs,
      denied_list_id: ID.bcs,
    })
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

  toJSONField() {
    return {
      managerId: this.managerId,
      deniedListId: this.deniedListId,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return InitPermissionPairManagerEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InitPermissionPairManagerEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitPermissionPairManagerEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a InitPermissionPairManagerEvent object`
      )
    }
    return InitPermissionPairManagerEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InitPermissionPairManagerEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitPermissionPairManagerEvent(data.bcs.type)) {
        throw new Error(`object at is not a InitPermissionPairManagerEvent object`)
      }

      return InitPermissionPairManagerEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitPermissionPairManagerEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InitPermissionPairManagerEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching InitPermissionPairManagerEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isInitPermissionPairManagerEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a InitPermissionPairManagerEvent object`)
    }

    return InitPermissionPairManagerEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== MintPoolCreationCap =============================== */

export function isMintPoolCreationCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::MintPoolCreationCap`
}

export interface MintPoolCreationCapFields {
  coinType: ToField<String>
  cap: ToField<ID>
}

export type MintPoolCreationCapReified = Reified<MintPoolCreationCap, MintPoolCreationCapFields>

export class MintPoolCreationCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::MintPoolCreationCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = MintPoolCreationCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::MintPoolCreationCap`
  readonly $typeArgs: []
  readonly $isPhantom = MintPoolCreationCap.$isPhantom

  readonly coinType: ToField<String>
  readonly cap: ToField<ID>

  private constructor(typeArgs: [], fields: MintPoolCreationCapFields) {
    this.$fullTypeName = composeSuiType(
      MintPoolCreationCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::MintPoolCreationCap`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.cap = fields.cap
  }

  static reified(): MintPoolCreationCapReified {
    return {
      typeName: MintPoolCreationCap.$typeName,
      fullTypeName: composeSuiType(
        MintPoolCreationCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::MintPoolCreationCap`,
      typeArgs: [] as [],
      isPhantom: MintPoolCreationCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MintPoolCreationCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MintPoolCreationCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MintPoolCreationCap.fromBcs(data),
      bcs: MintPoolCreationCap.bcs,
      fromJSONField: (field: any) => MintPoolCreationCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MintPoolCreationCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => MintPoolCreationCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MintPoolCreationCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => MintPoolCreationCap.fetch(client, id),
      new: (fields: MintPoolCreationCapFields) => {
        return new MintPoolCreationCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return MintPoolCreationCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MintPoolCreationCap>> {
    return phantom(MintPoolCreationCap.reified())
  }
  static get p() {
    return MintPoolCreationCap.phantom()
  }

  static get bcs() {
    return bcs.struct('MintPoolCreationCap', {
      coin_type: String.bcs,
      cap: ID.bcs,
    })
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

  toJSONField() {
    return {
      coinType: this.coinType,
      cap: this.cap,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return MintPoolCreationCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MintPoolCreationCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<MintPoolCreationCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching MintPoolCreationCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isMintPoolCreationCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a MintPoolCreationCap object`)
    }

    return MintPoolCreationCap.fromSuiObjectData(res.data)
  }
}

/* ============================== MintPoolCreationCapByAdmin =============================== */

export function isMintPoolCreationCapByAdmin(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::MintPoolCreationCapByAdmin`
}

export interface MintPoolCreationCapByAdminFields {
  coinType: ToField<String>
  cap: ToField<ID>
}

export type MintPoolCreationCapByAdminReified = Reified<
  MintPoolCreationCapByAdmin,
  MintPoolCreationCapByAdminFields
>

export class MintPoolCreationCapByAdmin implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::MintPoolCreationCapByAdmin`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = MintPoolCreationCapByAdmin.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::MintPoolCreationCapByAdmin`
  readonly $typeArgs: []
  readonly $isPhantom = MintPoolCreationCapByAdmin.$isPhantom

  readonly coinType: ToField<String>
  readonly cap: ToField<ID>

  private constructor(typeArgs: [], fields: MintPoolCreationCapByAdminFields) {
    this.$fullTypeName = composeSuiType(
      MintPoolCreationCapByAdmin.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::MintPoolCreationCapByAdmin`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.cap = fields.cap
  }

  static reified(): MintPoolCreationCapByAdminReified {
    return {
      typeName: MintPoolCreationCapByAdmin.$typeName,
      fullTypeName: composeSuiType(
        MintPoolCreationCapByAdmin.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::MintPoolCreationCapByAdmin`,
      typeArgs: [] as [],
      isPhantom: MintPoolCreationCapByAdmin.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MintPoolCreationCapByAdmin.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        MintPoolCreationCapByAdmin.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MintPoolCreationCapByAdmin.fromBcs(data),
      bcs: MintPoolCreationCapByAdmin.bcs,
      fromJSONField: (field: any) => MintPoolCreationCapByAdmin.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MintPoolCreationCapByAdmin.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        MintPoolCreationCapByAdmin.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        MintPoolCreationCapByAdmin.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => MintPoolCreationCapByAdmin.fetch(client, id),
      new: (fields: MintPoolCreationCapByAdminFields) => {
        return new MintPoolCreationCapByAdmin([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return MintPoolCreationCapByAdmin.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MintPoolCreationCapByAdmin>> {
    return phantom(MintPoolCreationCapByAdmin.reified())
  }
  static get p() {
    return MintPoolCreationCapByAdmin.phantom()
  }

  static get bcs() {
    return bcs.struct('MintPoolCreationCapByAdmin', {
      coin_type: String.bcs,
      cap: ID.bcs,
    })
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

  toJSONField() {
    return {
      coinType: this.coinType,
      cap: this.cap,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return MintPoolCreationCapByAdmin.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): MintPoolCreationCapByAdmin {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMintPoolCreationCapByAdmin(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a MintPoolCreationCapByAdmin object`
      )
    }
    return MintPoolCreationCapByAdmin.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): MintPoolCreationCapByAdmin {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMintPoolCreationCapByAdmin(data.bcs.type)) {
        throw new Error(`object at is not a MintPoolCreationCapByAdmin object`)
      }

      return MintPoolCreationCapByAdmin.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MintPoolCreationCapByAdmin.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<MintPoolCreationCapByAdmin> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching MintPoolCreationCapByAdmin object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isMintPoolCreationCapByAdmin(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a MintPoolCreationCapByAdmin object`)
    }

    return MintPoolCreationCapByAdmin.fromSuiObjectData(res.data)
  }
}

/* ============================== PermissionPairManager =============================== */

export function isPermissionPairManager(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::PermissionPairManager`
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

  static readonly $typeName = `${PKG_V1}::factory::PermissionPairManager`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PermissionPairManager.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::PermissionPairManager`
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
    ) as `${typeof PKG_V1}::factory::PermissionPairManager`
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
      ) as `${typeof PKG_V1}::factory::PermissionPairManager`,
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
  return type === `${PKG_V1}::factory::PoolCreationCap`
}

export interface PoolCreationCapFields {
  id: ToField<UID>
  coinType: ToField<TypeName>
}

export type PoolCreationCapReified = Reified<PoolCreationCap, PoolCreationCapFields>

export class PoolCreationCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::PoolCreationCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolCreationCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::PoolCreationCap`
  readonly $typeArgs: []
  readonly $isPhantom = PoolCreationCap.$isPhantom

  readonly id: ToField<UID>
  readonly coinType: ToField<TypeName>

  private constructor(typeArgs: [], fields: PoolCreationCapFields) {
    this.$fullTypeName = composeSuiType(
      PoolCreationCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::PoolCreationCap`
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
      ) as `${typeof PKG_V1}::factory::PoolCreationCap`,
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
  return type === `${PKG_V1}::factory::PoolKey`
}

export interface PoolKeyFields {
  coinA: ToField<TypeName>
  coinB: ToField<TypeName>
  tickSpacing: ToField<'u32'>
}

export type PoolKeyReified = Reified<PoolKey, PoolKeyFields>

export class PoolKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::PoolKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::PoolKey`
  readonly $typeArgs: []
  readonly $isPhantom = PoolKey.$isPhantom

  readonly coinA: ToField<TypeName>
  readonly coinB: ToField<TypeName>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: PoolKeyFields) {
    this.$fullTypeName = composeSuiType(
      PoolKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::PoolKey`
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
      ) as `${typeof PKG_V1}::factory::PoolKey`,
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

/* ============================== RegisterPermissionPairEvent =============================== */

export function isRegisterPermissionPairEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::RegisterPermissionPairEvent`
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

export class RegisterPermissionPairEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::RegisterPermissionPairEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RegisterPermissionPairEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::RegisterPermissionPairEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RegisterPermissionPairEvent.$isPhantom

  readonly cap: ToField<ID>
  readonly poolKey: ToField<ID>
  readonly coinType: ToField<String>
  readonly coinPair: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: RegisterPermissionPairEventFields) {
    this.$fullTypeName = composeSuiType(
      RegisterPermissionPairEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::RegisterPermissionPairEvent`
    this.$typeArgs = typeArgs

    this.cap = fields.cap
    this.poolKey = fields.poolKey
    this.coinType = fields.coinType
    this.coinPair = fields.coinPair
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): RegisterPermissionPairEventReified {
    return {
      typeName: RegisterPermissionPairEvent.$typeName,
      fullTypeName: composeSuiType(
        RegisterPermissionPairEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::RegisterPermissionPairEvent`,
      typeArgs: [] as [],
      isPhantom: RegisterPermissionPairEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RegisterPermissionPairEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RegisterPermissionPairEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RegisterPermissionPairEvent.fromBcs(data),
      bcs: RegisterPermissionPairEvent.bcs,
      fromJSONField: (field: any) => RegisterPermissionPairEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RegisterPermissionPairEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RegisterPermissionPairEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RegisterPermissionPairEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RegisterPermissionPairEvent.fetch(client, id),
      new: (fields: RegisterPermissionPairEventFields) => {
        return new RegisterPermissionPairEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RegisterPermissionPairEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RegisterPermissionPairEvent>> {
    return phantom(RegisterPermissionPairEvent.reified())
  }
  static get p() {
    return RegisterPermissionPairEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('RegisterPermissionPairEvent', {
      cap: ID.bcs,
      pool_key: ID.bcs,
      coin_type: String.bcs,
      coin_pair: String.bcs,
      tick_spacing: bcs.u32(),
    })
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

  toJSONField() {
    return {
      cap: this.cap,
      poolKey: this.poolKey,
      coinType: this.coinType,
      coinPair: this.coinPair,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return RegisterPermissionPairEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RegisterPermissionPairEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRegisterPermissionPairEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RegisterPermissionPairEvent object`
      )
    }
    return RegisterPermissionPairEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RegisterPermissionPairEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRegisterPermissionPairEvent(data.bcs.type)) {
        throw new Error(`object at is not a RegisterPermissionPairEvent object`)
      }

      return RegisterPermissionPairEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RegisterPermissionPairEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RegisterPermissionPairEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching RegisterPermissionPairEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isRegisterPermissionPairEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a RegisterPermissionPairEvent object`)
    }

    return RegisterPermissionPairEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RemoveAllowedListEvent =============================== */

export function isRemoveAllowedListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::RemoveAllowedListEvent`
}

export interface RemoveAllowedListEventFields {
  coinType: ToField<String>
}

export type RemoveAllowedListEventReified = Reified<
  RemoveAllowedListEvent,
  RemoveAllowedListEventFields
>

export class RemoveAllowedListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::RemoveAllowedListEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RemoveAllowedListEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::RemoveAllowedListEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RemoveAllowedListEvent.$isPhantom

  readonly coinType: ToField<String>

  private constructor(typeArgs: [], fields: RemoveAllowedListEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveAllowedListEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::RemoveAllowedListEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
  }

  static reified(): RemoveAllowedListEventReified {
    return {
      typeName: RemoveAllowedListEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveAllowedListEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::RemoveAllowedListEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveAllowedListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveAllowedListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveAllowedListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveAllowedListEvent.fromBcs(data),
      bcs: RemoveAllowedListEvent.bcs,
      fromJSONField: (field: any) => RemoveAllowedListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveAllowedListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveAllowedListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveAllowedListEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RemoveAllowedListEvent.fetch(client, id),
      new: (fields: RemoveAllowedListEventFields) => {
        return new RemoveAllowedListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RemoveAllowedListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveAllowedListEvent>> {
    return phantom(RemoveAllowedListEvent.reified())
  }
  static get p() {
    return RemoveAllowedListEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('RemoveAllowedListEvent', {
      coin_type: String.bcs,
    })
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

  toJSONField() {
    return {
      coinType: this.coinType,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveAllowedListEvent {
    return RemoveAllowedListEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveAllowedListEvent {
    if (json.$typeName !== RemoveAllowedListEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RemoveAllowedListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveAllowedListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveAllowedListEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveAllowedListEvent object`
      )
    }
    return RemoveAllowedListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveAllowedListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveAllowedListEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveAllowedListEvent object`)
      }

      return RemoveAllowedListEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveAllowedListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RemoveAllowedListEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RemoveAllowedListEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRemoveAllowedListEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RemoveAllowedListEvent object`)
    }

    return RemoveAllowedListEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RemoveAllowedPairConfigEvent =============================== */

export function isRemoveAllowedPairConfigEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::RemoveAllowedPairConfigEvent`
}

export interface RemoveAllowedPairConfigEventFields {
  coinType: ToField<String>
  tickSpacing: ToField<'u32'>
}

export type RemoveAllowedPairConfigEventReified = Reified<
  RemoveAllowedPairConfigEvent,
  RemoveAllowedPairConfigEventFields
>

export class RemoveAllowedPairConfigEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::RemoveAllowedPairConfigEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RemoveAllowedPairConfigEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::RemoveAllowedPairConfigEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RemoveAllowedPairConfigEvent.$isPhantom

  readonly coinType: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: RemoveAllowedPairConfigEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveAllowedPairConfigEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::RemoveAllowedPairConfigEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): RemoveAllowedPairConfigEventReified {
    return {
      typeName: RemoveAllowedPairConfigEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveAllowedPairConfigEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::RemoveAllowedPairConfigEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveAllowedPairConfigEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveAllowedPairConfigEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveAllowedPairConfigEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveAllowedPairConfigEvent.fromBcs(data),
      bcs: RemoveAllowedPairConfigEvent.bcs,
      fromJSONField: (field: any) => RemoveAllowedPairConfigEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveAllowedPairConfigEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveAllowedPairConfigEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveAllowedPairConfigEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        RemoveAllowedPairConfigEvent.fetch(client, id),
      new: (fields: RemoveAllowedPairConfigEventFields) => {
        return new RemoveAllowedPairConfigEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RemoveAllowedPairConfigEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveAllowedPairConfigEvent>> {
    return phantom(RemoveAllowedPairConfigEvent.reified())
  }
  static get p() {
    return RemoveAllowedPairConfigEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('RemoveAllowedPairConfigEvent', {
      coin_type: String.bcs,
      tick_spacing: bcs.u32(),
    })
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

  toJSONField() {
    return {
      coinType: this.coinType,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return RemoveAllowedPairConfigEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveAllowedPairConfigEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveAllowedPairConfigEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveAllowedPairConfigEvent object`
      )
    }
    return RemoveAllowedPairConfigEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveAllowedPairConfigEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveAllowedPairConfigEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveAllowedPairConfigEvent object`)
      }

      return RemoveAllowedPairConfigEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveAllowedPairConfigEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RemoveAllowedPairConfigEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching RemoveAllowedPairConfigEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isRemoveAllowedPairConfigEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a RemoveAllowedPairConfigEvent object`)
    }

    return RemoveAllowedPairConfigEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RemoveDeniedListEvent =============================== */

export function isRemoveDeniedListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::RemoveDeniedListEvent`
}

export interface RemoveDeniedListEventFields {
  coinType: ToField<String>
}

export type RemoveDeniedListEventReified = Reified<
  RemoveDeniedListEvent,
  RemoveDeniedListEventFields
>

export class RemoveDeniedListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::RemoveDeniedListEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RemoveDeniedListEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::RemoveDeniedListEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RemoveDeniedListEvent.$isPhantom

  readonly coinType: ToField<String>

  private constructor(typeArgs: [], fields: RemoveDeniedListEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveDeniedListEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::RemoveDeniedListEvent`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
  }

  static reified(): RemoveDeniedListEventReified {
    return {
      typeName: RemoveDeniedListEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveDeniedListEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::RemoveDeniedListEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveDeniedListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveDeniedListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveDeniedListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveDeniedListEvent.fromBcs(data),
      bcs: RemoveDeniedListEvent.bcs,
      fromJSONField: (field: any) => RemoveDeniedListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveDeniedListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveDeniedListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveDeniedListEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RemoveDeniedListEvent.fetch(client, id),
      new: (fields: RemoveDeniedListEventFields) => {
        return new RemoveDeniedListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RemoveDeniedListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveDeniedListEvent>> {
    return phantom(RemoveDeniedListEvent.reified())
  }
  static get p() {
    return RemoveDeniedListEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('RemoveDeniedListEvent', {
      coin_type: String.bcs,
    })
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

  toJSONField() {
    return {
      coinType: this.coinType,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveDeniedListEvent {
    return RemoveDeniedListEvent.reified().new({
      coinType: decodeFromJSONField(String.reified(), field.coinType),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveDeniedListEvent {
    if (json.$typeName !== RemoveDeniedListEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RemoveDeniedListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveDeniedListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveDeniedListEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveDeniedListEvent object`
      )
    }
    return RemoveDeniedListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveDeniedListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveDeniedListEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveDeniedListEvent object`)
      }

      return RemoveDeniedListEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveDeniedListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RemoveDeniedListEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RemoveDeniedListEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRemoveDeniedListEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RemoveDeniedListEvent object`)
    }

    return RemoveDeniedListEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== UnregisterPermissionPairEvent =============================== */

export function isUnregisterPermissionPairEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::factory::UnregisterPermissionPairEvent`
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

export class UnregisterPermissionPairEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::factory::UnregisterPermissionPairEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UnregisterPermissionPairEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::factory::UnregisterPermissionPairEvent`
  readonly $typeArgs: []
  readonly $isPhantom = UnregisterPermissionPairEvent.$isPhantom

  readonly cap: ToField<ID>
  readonly poolKey: ToField<ID>
  readonly coinType: ToField<String>
  readonly coinPair: ToField<String>
  readonly tickSpacing: ToField<'u32'>

  private constructor(typeArgs: [], fields: UnregisterPermissionPairEventFields) {
    this.$fullTypeName = composeSuiType(
      UnregisterPermissionPairEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::factory::UnregisterPermissionPairEvent`
    this.$typeArgs = typeArgs

    this.cap = fields.cap
    this.poolKey = fields.poolKey
    this.coinType = fields.coinType
    this.coinPair = fields.coinPair
    this.tickSpacing = fields.tickSpacing
  }

  static reified(): UnregisterPermissionPairEventReified {
    return {
      typeName: UnregisterPermissionPairEvent.$typeName,
      fullTypeName: composeSuiType(
        UnregisterPermissionPairEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::factory::UnregisterPermissionPairEvent`,
      typeArgs: [] as [],
      isPhantom: UnregisterPermissionPairEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UnregisterPermissionPairEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UnregisterPermissionPairEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UnregisterPermissionPairEvent.fromBcs(data),
      bcs: UnregisterPermissionPairEvent.bcs,
      fromJSONField: (field: any) => UnregisterPermissionPairEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UnregisterPermissionPairEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UnregisterPermissionPairEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UnregisterPermissionPairEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        UnregisterPermissionPairEvent.fetch(client, id),
      new: (fields: UnregisterPermissionPairEventFields) => {
        return new UnregisterPermissionPairEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UnregisterPermissionPairEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UnregisterPermissionPairEvent>> {
    return phantom(UnregisterPermissionPairEvent.reified())
  }
  static get p() {
    return UnregisterPermissionPairEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('UnregisterPermissionPairEvent', {
      cap: ID.bcs,
      pool_key: ID.bcs,
      coin_type: String.bcs,
      coin_pair: String.bcs,
      tick_spacing: bcs.u32(),
    })
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

  toJSONField() {
    return {
      cap: this.cap,
      poolKey: this.poolKey,
      coinType: this.coinType,
      coinPair: this.coinPair,
      tickSpacing: this.tickSpacing,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return UnregisterPermissionPairEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UnregisterPermissionPairEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUnregisterPermissionPairEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UnregisterPermissionPairEvent object`
      )
    }
    return UnregisterPermissionPairEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UnregisterPermissionPairEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUnregisterPermissionPairEvent(data.bcs.type)) {
        throw new Error(`object at is not a UnregisterPermissionPairEvent object`)
      }

      return UnregisterPermissionPairEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UnregisterPermissionPairEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UnregisterPermissionPairEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching UnregisterPermissionPairEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isUnregisterPermissionPairEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a UnregisterPermissionPairEvent object`)
    }

    return UnregisterPermissionPairEvent.fromSuiObjectData(res.data)
  }
}
