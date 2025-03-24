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
import { TypeName } from '../../0x1/type-name/structs'
import { Bag } from '../../0x2/bag/structs'
import { LinkedTable } from '../../0x2/linked-table/structs'
import { ID, UID } from '../../0x2/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== CreateRewarderEvent =============================== */

export function isCreateRewarderEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::rewarder::CreateRewarderEvent`
}

export interface CreateRewarderEventFields {
  rewardCoin: ToField<TypeName>
  emissionPerSecond: ToField<'u128'>
}

export type CreateRewarderEventReified = Reified<CreateRewarderEvent, CreateRewarderEventFields>

export class CreateRewarderEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewarder::CreateRewarderEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CreateRewarderEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewarder::CreateRewarderEvent`
  readonly $typeArgs: []
  readonly $isPhantom = CreateRewarderEvent.$isPhantom

  readonly rewardCoin: ToField<TypeName>
  readonly emissionPerSecond: ToField<'u128'>

  private constructor(typeArgs: [], fields: CreateRewarderEventFields) {
    this.$fullTypeName = composeSuiType(
      CreateRewarderEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewarder::CreateRewarderEvent`
    this.$typeArgs = typeArgs

    this.rewardCoin = fields.rewardCoin
    this.emissionPerSecond = fields.emissionPerSecond
  }

  static reified(): CreateRewarderEventReified {
    return {
      typeName: CreateRewarderEvent.$typeName,
      fullTypeName: composeSuiType(
        CreateRewarderEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::rewarder::CreateRewarderEvent`,
      typeArgs: [] as [],
      isPhantom: CreateRewarderEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CreateRewarderEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CreateRewarderEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CreateRewarderEvent.fromBcs(data),
      bcs: CreateRewarderEvent.bcs,
      fromJSONField: (field: any) => CreateRewarderEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CreateRewarderEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CreateRewarderEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CreateRewarderEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => CreateRewarderEvent.fetch(client, id),
      new: (fields: CreateRewarderEventFields) => {
        return new CreateRewarderEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CreateRewarderEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CreateRewarderEvent>> {
    return phantom(CreateRewarderEvent.reified())
  }
  static get p() {
    return CreateRewarderEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('CreateRewarderEvent', {
      reward_coin: TypeName.bcs,
      emission_per_second: bcs.u128(),
    })
  }

  static fromFields(fields: Record<string, any>): CreateRewarderEvent {
    return CreateRewarderEvent.reified().new({
      rewardCoin: decodeFromFields(TypeName.reified(), fields.reward_coin),
      emissionPerSecond: decodeFromFields('u128', fields.emission_per_second),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CreateRewarderEvent {
    if (!isCreateRewarderEvent(item.type)) {
      throw new Error('not a CreateRewarderEvent type')
    }

    return CreateRewarderEvent.reified().new({
      rewardCoin: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_coin),
      emissionPerSecond: decodeFromFieldsWithTypes('u128', item.fields.emission_per_second),
    })
  }

  static fromBcs(data: Uint8Array): CreateRewarderEvent {
    return CreateRewarderEvent.fromFields(CreateRewarderEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      rewardCoin: this.rewardCoin.toJSONField(),
      emissionPerSecond: this.emissionPerSecond.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CreateRewarderEvent {
    return CreateRewarderEvent.reified().new({
      rewardCoin: decodeFromJSONField(TypeName.reified(), field.rewardCoin),
      emissionPerSecond: decodeFromJSONField('u128', field.emissionPerSecond),
    })
  }

  static fromJSON(json: Record<string, any>): CreateRewarderEvent {
    if (json.$typeName !== CreateRewarderEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CreateRewarderEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CreateRewarderEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCreateRewarderEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CreateRewarderEvent object`)
    }
    return CreateRewarderEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CreateRewarderEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCreateRewarderEvent(data.bcs.type)) {
        throw new Error(`object at is not a CreateRewarderEvent object`)
      }

      return CreateRewarderEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreateRewarderEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CreateRewarderEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching CreateRewarderEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCreateRewarderEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CreateRewarderEvent object`)
    }

    return CreateRewarderEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== DepositEvent =============================== */

export function isDepositEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::rewarder::DepositEvent`
}

export interface DepositEventFields {
  rewardType: ToField<TypeName>
  depositAmount: ToField<'u64'>
  afterAmount: ToField<'u64'>
}

export type DepositEventReified = Reified<DepositEvent, DepositEventFields>

export class DepositEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewarder::DepositEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DepositEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewarder::DepositEvent`
  readonly $typeArgs: []
  readonly $isPhantom = DepositEvent.$isPhantom

  readonly rewardType: ToField<TypeName>
  readonly depositAmount: ToField<'u64'>
  readonly afterAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: DepositEventFields) {
    this.$fullTypeName = composeSuiType(
      DepositEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewarder::DepositEvent`
    this.$typeArgs = typeArgs

    this.rewardType = fields.rewardType
    this.depositAmount = fields.depositAmount
    this.afterAmount = fields.afterAmount
  }

  static reified(): DepositEventReified {
    return {
      typeName: DepositEvent.$typeName,
      fullTypeName: composeSuiType(
        DepositEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::rewarder::DepositEvent`,
      typeArgs: [] as [],
      isPhantom: DepositEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DepositEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DepositEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DepositEvent.fromBcs(data),
      bcs: DepositEvent.bcs,
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

  static get bcs() {
    return bcs.struct('DepositEvent', {
      reward_type: TypeName.bcs,
      deposit_amount: bcs.u64(),
      after_amount: bcs.u64(),
    })
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

  toJSONField() {
    return {
      rewardType: this.rewardType.toJSONField(),
      depositAmount: this.depositAmount.toString(),
      afterAmount: this.afterAmount.toString(),
    }
  }

  toJSON() {
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

/* ============================== EmergentWithdrawEvent =============================== */

export function isEmergentWithdrawEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::rewarder::EmergentWithdrawEvent`
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

export class EmergentWithdrawEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewarder::EmergentWithdrawEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = EmergentWithdrawEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewarder::EmergentWithdrawEvent`
  readonly $typeArgs: []
  readonly $isPhantom = EmergentWithdrawEvent.$isPhantom

  readonly rewardType: ToField<TypeName>
  readonly withdrawAmount: ToField<'u64'>
  readonly afterAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: EmergentWithdrawEventFields) {
    this.$fullTypeName = composeSuiType(
      EmergentWithdrawEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewarder::EmergentWithdrawEvent`
    this.$typeArgs = typeArgs

    this.rewardType = fields.rewardType
    this.withdrawAmount = fields.withdrawAmount
    this.afterAmount = fields.afterAmount
  }

  static reified(): EmergentWithdrawEventReified {
    return {
      typeName: EmergentWithdrawEvent.$typeName,
      fullTypeName: composeSuiType(
        EmergentWithdrawEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::rewarder::EmergentWithdrawEvent`,
      typeArgs: [] as [],
      isPhantom: EmergentWithdrawEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => EmergentWithdrawEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        EmergentWithdrawEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => EmergentWithdrawEvent.fromBcs(data),
      bcs: EmergentWithdrawEvent.bcs,
      fromJSONField: (field: any) => EmergentWithdrawEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => EmergentWithdrawEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        EmergentWithdrawEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        EmergentWithdrawEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => EmergentWithdrawEvent.fetch(client, id),
      new: (fields: EmergentWithdrawEventFields) => {
        return new EmergentWithdrawEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return EmergentWithdrawEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<EmergentWithdrawEvent>> {
    return phantom(EmergentWithdrawEvent.reified())
  }
  static get p() {
    return EmergentWithdrawEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('EmergentWithdrawEvent', {
      reward_type: TypeName.bcs,
      withdraw_amount: bcs.u64(),
      after_amount: bcs.u64(),
    })
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

  toJSONField() {
    return {
      rewardType: this.rewardType.toJSONField(),
      withdrawAmount: this.withdrawAmount.toString(),
      afterAmount: this.afterAmount.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return EmergentWithdrawEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): EmergentWithdrawEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEmergentWithdrawEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a EmergentWithdrawEvent object`
      )
    }
    return EmergentWithdrawEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): EmergentWithdrawEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEmergentWithdrawEvent(data.bcs.type)) {
        throw new Error(`object at is not a EmergentWithdrawEvent object`)
      }

      return EmergentWithdrawEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EmergentWithdrawEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<EmergentWithdrawEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching EmergentWithdrawEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isEmergentWithdrawEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a EmergentWithdrawEvent object`)
    }

    return EmergentWithdrawEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== InitRewarderManagerEvent =============================== */

export function isInitRewarderManagerEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::rewarder::InitRewarderManagerEvent`
}

export interface InitRewarderManagerEventFields {
  id: ToField<ID>
}

export type InitRewarderManagerEventReified = Reified<
  InitRewarderManagerEvent,
  InitRewarderManagerEventFields
>

export class InitRewarderManagerEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewarder::InitRewarderManagerEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InitRewarderManagerEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewarder::InitRewarderManagerEvent`
  readonly $typeArgs: []
  readonly $isPhantom = InitRewarderManagerEvent.$isPhantom

  readonly id: ToField<ID>

  private constructor(typeArgs: [], fields: InitRewarderManagerEventFields) {
    this.$fullTypeName = composeSuiType(
      InitRewarderManagerEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewarder::InitRewarderManagerEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): InitRewarderManagerEventReified {
    return {
      typeName: InitRewarderManagerEvent.$typeName,
      fullTypeName: composeSuiType(
        InitRewarderManagerEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::rewarder::InitRewarderManagerEvent`,
      typeArgs: [] as [],
      isPhantom: InitRewarderManagerEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InitRewarderManagerEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        InitRewarderManagerEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InitRewarderManagerEvent.fromBcs(data),
      bcs: InitRewarderManagerEvent.bcs,
      fromJSONField: (field: any) => InitRewarderManagerEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitRewarderManagerEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        InitRewarderManagerEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        InitRewarderManagerEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => InitRewarderManagerEvent.fetch(client, id),
      new: (fields: InitRewarderManagerEventFields) => {
        return new InitRewarderManagerEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InitRewarderManagerEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitRewarderManagerEvent>> {
    return phantom(InitRewarderManagerEvent.reified())
  }
  static get p() {
    return InitRewarderManagerEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('InitRewarderManagerEvent', {
      id: ID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): InitRewarderManagerEvent {
    return InitRewarderManagerEvent.reified().new({ id: decodeFromFields(ID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InitRewarderManagerEvent {
    if (!isInitRewarderManagerEvent(item.type)) {
      throw new Error('not a InitRewarderManagerEvent type')
    }

    return InitRewarderManagerEvent.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): InitRewarderManagerEvent {
    return InitRewarderManagerEvent.fromFields(InitRewarderManagerEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InitRewarderManagerEvent {
    return InitRewarderManagerEvent.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): InitRewarderManagerEvent {
    if (json.$typeName !== InitRewarderManagerEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return InitRewarderManagerEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InitRewarderManagerEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitRewarderManagerEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a InitRewarderManagerEvent object`
      )
    }
    return InitRewarderManagerEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InitRewarderManagerEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitRewarderManagerEvent(data.bcs.type)) {
        throw new Error(`object at is not a InitRewarderManagerEvent object`)
      }

      return InitRewarderManagerEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitRewarderManagerEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InitRewarderManagerEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching InitRewarderManagerEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isInitRewarderManagerEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a InitRewarderManagerEvent object`)
    }

    return InitRewarderManagerEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== PoolRewarderInfo =============================== */

export function isPoolRewarderInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::rewarder::PoolRewarderInfo`
}

export interface PoolRewarderInfoFields {
  allocatePoint: ToField<'u64'>
  accPerShare: ToField<'u128'>
  lastRewardTime: ToField<'u64'>
  rewardReleased: ToField<'u128'>
  rewardHarvested: ToField<'u64'>
}

export type PoolRewarderInfoReified = Reified<PoolRewarderInfo, PoolRewarderInfoFields>

export class PoolRewarderInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewarder::PoolRewarderInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolRewarderInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewarder::PoolRewarderInfo`
  readonly $typeArgs: []
  readonly $isPhantom = PoolRewarderInfo.$isPhantom

  readonly allocatePoint: ToField<'u64'>
  readonly accPerShare: ToField<'u128'>
  readonly lastRewardTime: ToField<'u64'>
  readonly rewardReleased: ToField<'u128'>
  readonly rewardHarvested: ToField<'u64'>

  private constructor(typeArgs: [], fields: PoolRewarderInfoFields) {
    this.$fullTypeName = composeSuiType(
      PoolRewarderInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewarder::PoolRewarderInfo`
    this.$typeArgs = typeArgs

    this.allocatePoint = fields.allocatePoint
    this.accPerShare = fields.accPerShare
    this.lastRewardTime = fields.lastRewardTime
    this.rewardReleased = fields.rewardReleased
    this.rewardHarvested = fields.rewardHarvested
  }

  static reified(): PoolRewarderInfoReified {
    return {
      typeName: PoolRewarderInfo.$typeName,
      fullTypeName: composeSuiType(
        PoolRewarderInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::rewarder::PoolRewarderInfo`,
      typeArgs: [] as [],
      isPhantom: PoolRewarderInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolRewarderInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolRewarderInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolRewarderInfo.fromBcs(data),
      bcs: PoolRewarderInfo.bcs,
      fromJSONField: (field: any) => PoolRewarderInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolRewarderInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolRewarderInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolRewarderInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolRewarderInfo.fetch(client, id),
      new: (fields: PoolRewarderInfoFields) => {
        return new PoolRewarderInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolRewarderInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolRewarderInfo>> {
    return phantom(PoolRewarderInfo.reified())
  }
  static get p() {
    return PoolRewarderInfo.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolRewarderInfo', {
      allocate_point: bcs.u64(),
      acc_per_share: bcs.u128(),
      last_reward_time: bcs.u64(),
      reward_released: bcs.u128(),
      reward_harvested: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): PoolRewarderInfo {
    return PoolRewarderInfo.reified().new({
      allocatePoint: decodeFromFields('u64', fields.allocate_point),
      accPerShare: decodeFromFields('u128', fields.acc_per_share),
      lastRewardTime: decodeFromFields('u64', fields.last_reward_time),
      rewardReleased: decodeFromFields('u128', fields.reward_released),
      rewardHarvested: decodeFromFields('u64', fields.reward_harvested),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolRewarderInfo {
    if (!isPoolRewarderInfo(item.type)) {
      throw new Error('not a PoolRewarderInfo type')
    }

    return PoolRewarderInfo.reified().new({
      allocatePoint: decodeFromFieldsWithTypes('u64', item.fields.allocate_point),
      accPerShare: decodeFromFieldsWithTypes('u128', item.fields.acc_per_share),
      lastRewardTime: decodeFromFieldsWithTypes('u64', item.fields.last_reward_time),
      rewardReleased: decodeFromFieldsWithTypes('u128', item.fields.reward_released),
      rewardHarvested: decodeFromFieldsWithTypes('u64', item.fields.reward_harvested),
    })
  }

  static fromBcs(data: Uint8Array): PoolRewarderInfo {
    return PoolRewarderInfo.fromFields(PoolRewarderInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      allocatePoint: this.allocatePoint.toString(),
      accPerShare: this.accPerShare.toString(),
      lastRewardTime: this.lastRewardTime.toString(),
      rewardReleased: this.rewardReleased.toString(),
      rewardHarvested: this.rewardHarvested.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolRewarderInfo {
    return PoolRewarderInfo.reified().new({
      allocatePoint: decodeFromJSONField('u64', field.allocatePoint),
      accPerShare: decodeFromJSONField('u128', field.accPerShare),
      lastRewardTime: decodeFromJSONField('u64', field.lastRewardTime),
      rewardReleased: decodeFromJSONField('u128', field.rewardReleased),
      rewardHarvested: decodeFromJSONField('u64', field.rewardHarvested),
    })
  }

  static fromJSON(json: Record<string, any>): PoolRewarderInfo {
    if (json.$typeName !== PoolRewarderInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolRewarderInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolRewarderInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolRewarderInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolRewarderInfo object`)
    }
    return PoolRewarderInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolRewarderInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolRewarderInfo(data.bcs.type)) {
        throw new Error(`object at is not a PoolRewarderInfo object`)
      }

      return PoolRewarderInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolRewarderInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolRewarderInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolRewarderInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolRewarderInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolRewarderInfo object`)
    }

    return PoolRewarderInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== Rewarder =============================== */

export function isRewarder(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::rewarder::Rewarder`
}

export interface RewarderFields {
  rewardCoin: ToField<TypeName>
  totalAllocatePoint: ToField<'u64'>
  emissionPerSecond: ToField<'u128'>
  lastRewardTime: ToField<'u64'>
  totalRewardReleased: ToField<'u128'>
  totalRewardHarvested: ToField<'u64'>
  pools: ToField<LinkedTable<ID, ToPhantom<PoolRewarderInfo>>>
}

export type RewarderReified = Reified<Rewarder, RewarderFields>

export class Rewarder implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewarder::Rewarder`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Rewarder.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewarder::Rewarder`
  readonly $typeArgs: []
  readonly $isPhantom = Rewarder.$isPhantom

  readonly rewardCoin: ToField<TypeName>
  readonly totalAllocatePoint: ToField<'u64'>
  readonly emissionPerSecond: ToField<'u128'>
  readonly lastRewardTime: ToField<'u64'>
  readonly totalRewardReleased: ToField<'u128'>
  readonly totalRewardHarvested: ToField<'u64'>
  readonly pools: ToField<LinkedTable<ID, ToPhantom<PoolRewarderInfo>>>

  private constructor(typeArgs: [], fields: RewarderFields) {
    this.$fullTypeName = composeSuiType(
      Rewarder.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewarder::Rewarder`
    this.$typeArgs = typeArgs

    this.rewardCoin = fields.rewardCoin
    this.totalAllocatePoint = fields.totalAllocatePoint
    this.emissionPerSecond = fields.emissionPerSecond
    this.lastRewardTime = fields.lastRewardTime
    this.totalRewardReleased = fields.totalRewardReleased
    this.totalRewardHarvested = fields.totalRewardHarvested
    this.pools = fields.pools
  }

  static reified(): RewarderReified {
    return {
      typeName: Rewarder.$typeName,
      fullTypeName: composeSuiType(
        Rewarder.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::rewarder::Rewarder`,
      typeArgs: [] as [],
      isPhantom: Rewarder.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Rewarder.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Rewarder.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Rewarder.fromBcs(data),
      bcs: Rewarder.bcs,
      fromJSONField: (field: any) => Rewarder.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Rewarder.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Rewarder.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Rewarder.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Rewarder.fetch(client, id),
      new: (fields: RewarderFields) => {
        return new Rewarder([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Rewarder.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Rewarder>> {
    return phantom(Rewarder.reified())
  }
  static get p() {
    return Rewarder.phantom()
  }

  static get bcs() {
    return bcs.struct('Rewarder', {
      reward_coin: TypeName.bcs,
      total_allocate_point: bcs.u64(),
      emission_per_second: bcs.u128(),
      last_reward_time: bcs.u64(),
      total_reward_released: bcs.u128(),
      total_reward_harvested: bcs.u64(),
      pools: LinkedTable.bcs(ID.bcs),
    })
  }

  static fromFields(fields: Record<string, any>): Rewarder {
    return Rewarder.reified().new({
      rewardCoin: decodeFromFields(TypeName.reified(), fields.reward_coin),
      totalAllocatePoint: decodeFromFields('u64', fields.total_allocate_point),
      emissionPerSecond: decodeFromFields('u128', fields.emission_per_second),
      lastRewardTime: decodeFromFields('u64', fields.last_reward_time),
      totalRewardReleased: decodeFromFields('u128', fields.total_reward_released),
      totalRewardHarvested: decodeFromFields('u64', fields.total_reward_harvested),
      pools: decodeFromFields(
        LinkedTable.reified(ID.reified(), reified.phantom(PoolRewarderInfo.reified())),
        fields.pools
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Rewarder {
    if (!isRewarder(item.type)) {
      throw new Error('not a Rewarder type')
    }

    return Rewarder.reified().new({
      rewardCoin: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_coin),
      totalAllocatePoint: decodeFromFieldsWithTypes('u64', item.fields.total_allocate_point),
      emissionPerSecond: decodeFromFieldsWithTypes('u128', item.fields.emission_per_second),
      lastRewardTime: decodeFromFieldsWithTypes('u64', item.fields.last_reward_time),
      totalRewardReleased: decodeFromFieldsWithTypes('u128', item.fields.total_reward_released),
      totalRewardHarvested: decodeFromFieldsWithTypes('u64', item.fields.total_reward_harvested),
      pools: decodeFromFieldsWithTypes(
        LinkedTable.reified(ID.reified(), reified.phantom(PoolRewarderInfo.reified())),
        item.fields.pools
      ),
    })
  }

  static fromBcs(data: Uint8Array): Rewarder {
    return Rewarder.fromFields(Rewarder.bcs.parse(data))
  }

  toJSONField() {
    return {
      rewardCoin: this.rewardCoin.toJSONField(),
      totalAllocatePoint: this.totalAllocatePoint.toString(),
      emissionPerSecond: this.emissionPerSecond.toString(),
      lastRewardTime: this.lastRewardTime.toString(),
      totalRewardReleased: this.totalRewardReleased.toString(),
      totalRewardHarvested: this.totalRewardHarvested.toString(),
      pools: this.pools.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Rewarder {
    return Rewarder.reified().new({
      rewardCoin: decodeFromJSONField(TypeName.reified(), field.rewardCoin),
      totalAllocatePoint: decodeFromJSONField('u64', field.totalAllocatePoint),
      emissionPerSecond: decodeFromJSONField('u128', field.emissionPerSecond),
      lastRewardTime: decodeFromJSONField('u64', field.lastRewardTime),
      totalRewardReleased: decodeFromJSONField('u128', field.totalRewardReleased),
      totalRewardHarvested: decodeFromJSONField('u64', field.totalRewardHarvested),
      pools: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), reified.phantom(PoolRewarderInfo.reified())),
        field.pools
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Rewarder {
    if (json.$typeName !== Rewarder.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Rewarder.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Rewarder {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewarder(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Rewarder object`)
    }
    return Rewarder.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Rewarder {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewarder(data.bcs.type)) {
        throw new Error(`object at is not a Rewarder object`)
      }

      return Rewarder.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Rewarder.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Rewarder> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Rewarder object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRewarder(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Rewarder object`)
    }

    return Rewarder.fromSuiObjectData(res.data)
  }
}

/* ============================== RewarderManager =============================== */

export function isRewarderManager(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::rewarder::RewarderManager`
}

export interface RewarderManagerFields {
  id: ToField<UID>
  vault: ToField<Bag>
  poolShares: ToField<LinkedTable<ID, 'u128'>>
  rewarders: ToField<LinkedTable<TypeName, ToPhantom<Rewarder>>>
}

export type RewarderManagerReified = Reified<RewarderManager, RewarderManagerFields>

export class RewarderManager implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewarder::RewarderManager`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RewarderManager.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewarder::RewarderManager`
  readonly $typeArgs: []
  readonly $isPhantom = RewarderManager.$isPhantom

  readonly id: ToField<UID>
  readonly vault: ToField<Bag>
  readonly poolShares: ToField<LinkedTable<ID, 'u128'>>
  readonly rewarders: ToField<LinkedTable<TypeName, ToPhantom<Rewarder>>>

  private constructor(typeArgs: [], fields: RewarderManagerFields) {
    this.$fullTypeName = composeSuiType(
      RewarderManager.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewarder::RewarderManager`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.vault = fields.vault
    this.poolShares = fields.poolShares
    this.rewarders = fields.rewarders
  }

  static reified(): RewarderManagerReified {
    return {
      typeName: RewarderManager.$typeName,
      fullTypeName: composeSuiType(
        RewarderManager.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::rewarder::RewarderManager`,
      typeArgs: [] as [],
      isPhantom: RewarderManager.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RewarderManager.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RewarderManager.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RewarderManager.fromBcs(data),
      bcs: RewarderManager.bcs,
      fromJSONField: (field: any) => RewarderManager.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RewarderManager.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RewarderManager.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RewarderManager.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RewarderManager.fetch(client, id),
      new: (fields: RewarderManagerFields) => {
        return new RewarderManager([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RewarderManager.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RewarderManager>> {
    return phantom(RewarderManager.reified())
  }
  static get p() {
    return RewarderManager.phantom()
  }

  static get bcs() {
    return bcs.struct('RewarderManager', {
      id: UID.bcs,
      vault: Bag.bcs,
      pool_shares: LinkedTable.bcs(ID.bcs),
      rewarders: LinkedTable.bcs(TypeName.bcs),
    })
  }

  static fromFields(fields: Record<string, any>): RewarderManager {
    return RewarderManager.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      vault: decodeFromFields(Bag.reified(), fields.vault),
      poolShares: decodeFromFields(
        LinkedTable.reified(ID.reified(), reified.phantom('u128')),
        fields.pool_shares
      ),
      rewarders: decodeFromFields(
        LinkedTable.reified(TypeName.reified(), reified.phantom(Rewarder.reified())),
        fields.rewarders
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RewarderManager {
    if (!isRewarderManager(item.type)) {
      throw new Error('not a RewarderManager type')
    }

    return RewarderManager.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      vault: decodeFromFieldsWithTypes(Bag.reified(), item.fields.vault),
      poolShares: decodeFromFieldsWithTypes(
        LinkedTable.reified(ID.reified(), reified.phantom('u128')),
        item.fields.pool_shares
      ),
      rewarders: decodeFromFieldsWithTypes(
        LinkedTable.reified(TypeName.reified(), reified.phantom(Rewarder.reified())),
        item.fields.rewarders
      ),
    })
  }

  static fromBcs(data: Uint8Array): RewarderManager {
    return RewarderManager.fromFields(RewarderManager.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      vault: this.vault.toJSONField(),
      poolShares: this.poolShares.toJSONField(),
      rewarders: this.rewarders.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RewarderManager {
    return RewarderManager.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      vault: decodeFromJSONField(Bag.reified(), field.vault),
      poolShares: decodeFromJSONField(
        LinkedTable.reified(ID.reified(), reified.phantom('u128')),
        field.poolShares
      ),
      rewarders: decodeFromJSONField(
        LinkedTable.reified(TypeName.reified(), reified.phantom(Rewarder.reified())),
        field.rewarders
      ),
    })
  }

  static fromJSON(json: Record<string, any>): RewarderManager {
    if (json.$typeName !== RewarderManager.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RewarderManager.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RewarderManager {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRewarderManager(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RewarderManager object`)
    }
    return RewarderManager.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RewarderManager {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRewarderManager(data.bcs.type)) {
        throw new Error(`object at is not a RewarderManager object`)
      }

      return RewarderManager.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RewarderManager.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RewarderManager> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RewarderManager object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRewarderManager(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RewarderManager object`)
    }

    return RewarderManager.fromSuiObjectData(res.data)
  }
}

/* ============================== UpdateRewarderEvent =============================== */

export function isUpdateRewarderEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::rewarder::UpdateRewarderEvent`
}

export interface UpdateRewarderEventFields {
  rewardCoin: ToField<TypeName>
  emissionPerSecond: ToField<'u128'>
}

export type UpdateRewarderEventReified = Reified<UpdateRewarderEvent, UpdateRewarderEventFields>

export class UpdateRewarderEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::rewarder::UpdateRewarderEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UpdateRewarderEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::rewarder::UpdateRewarderEvent`
  readonly $typeArgs: []
  readonly $isPhantom = UpdateRewarderEvent.$isPhantom

  readonly rewardCoin: ToField<TypeName>
  readonly emissionPerSecond: ToField<'u128'>

  private constructor(typeArgs: [], fields: UpdateRewarderEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateRewarderEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::rewarder::UpdateRewarderEvent`
    this.$typeArgs = typeArgs

    this.rewardCoin = fields.rewardCoin
    this.emissionPerSecond = fields.emissionPerSecond
  }

  static reified(): UpdateRewarderEventReified {
    return {
      typeName: UpdateRewarderEvent.$typeName,
      fullTypeName: composeSuiType(
        UpdateRewarderEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::rewarder::UpdateRewarderEvent`,
      typeArgs: [] as [],
      isPhantom: UpdateRewarderEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateRewarderEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateRewarderEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateRewarderEvent.fromBcs(data),
      bcs: UpdateRewarderEvent.bcs,
      fromJSONField: (field: any) => UpdateRewarderEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateRewarderEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => UpdateRewarderEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpdateRewarderEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => UpdateRewarderEvent.fetch(client, id),
      new: (fields: UpdateRewarderEventFields) => {
        return new UpdateRewarderEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpdateRewarderEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateRewarderEvent>> {
    return phantom(UpdateRewarderEvent.reified())
  }
  static get p() {
    return UpdateRewarderEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('UpdateRewarderEvent', {
      reward_coin: TypeName.bcs,
      emission_per_second: bcs.u128(),
    })
  }

  static fromFields(fields: Record<string, any>): UpdateRewarderEvent {
    return UpdateRewarderEvent.reified().new({
      rewardCoin: decodeFromFields(TypeName.reified(), fields.reward_coin),
      emissionPerSecond: decodeFromFields('u128', fields.emission_per_second),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateRewarderEvent {
    if (!isUpdateRewarderEvent(item.type)) {
      throw new Error('not a UpdateRewarderEvent type')
    }

    return UpdateRewarderEvent.reified().new({
      rewardCoin: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.reward_coin),
      emissionPerSecond: decodeFromFieldsWithTypes('u128', item.fields.emission_per_second),
    })
  }

  static fromBcs(data: Uint8Array): UpdateRewarderEvent {
    return UpdateRewarderEvent.fromFields(UpdateRewarderEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      rewardCoin: this.rewardCoin.toJSONField(),
      emissionPerSecond: this.emissionPerSecond.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateRewarderEvent {
    return UpdateRewarderEvent.reified().new({
      rewardCoin: decodeFromJSONField(TypeName.reified(), field.rewardCoin),
      emissionPerSecond: decodeFromJSONField('u128', field.emissionPerSecond),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateRewarderEvent {
    if (json.$typeName !== UpdateRewarderEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UpdateRewarderEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpdateRewarderEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateRewarderEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpdateRewarderEvent object`)
    }
    return UpdateRewarderEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpdateRewarderEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateRewarderEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateRewarderEvent object`)
      }

      return UpdateRewarderEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateRewarderEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UpdateRewarderEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching UpdateRewarderEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUpdateRewarderEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UpdateRewarderEvent object`)
    }

    return UpdateRewarderEvent.fromSuiObjectData(res.data)
  }
}
