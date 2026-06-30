import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
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
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { TypeName } from '../../../std/type-name/structs'
import { ID } from '../../../sui/object/structs'

/* ============================== CreateSpoolAccountEvent =============================== */

export function isCreateSpoolAccountEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('spool', 'user::CreateSpoolAccountEvent')}::user::CreateSpoolAccountEvent`
}

export interface CreateSpoolAccountEventFields {
  spoolAccountId: ToField<ID>
  spoolId: ToField<ID>
  stakingType: ToField<TypeName>
  createdAt: ToField<'u64'>
}

export type CreateSpoolAccountEventReified = Reified<
  CreateSpoolAccountEvent,
  CreateSpoolAccountEventFields
>

export type CreateSpoolAccountEventJSONField = {
  spoolAccountId: string
  spoolId: string
  stakingType: string
  createdAt: string
}

export type CreateSpoolAccountEventJSON = {
  $typeName: typeof CreateSpoolAccountEvent.$typeName
  $typeArgs: []
} & CreateSpoolAccountEventJSONField

export class CreateSpoolAccountEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::user::CreateSpoolAccountEvent` {
    return `${
      getTypeOrigin('spool', 'user::CreateSpoolAccountEvent')
    }::user::CreateSpoolAccountEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CreateSpoolAccountEvent.$typeName = CreateSpoolAccountEvent.$typeName
  readonly $fullTypeName: `${string}::user::CreateSpoolAccountEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CreateSpoolAccountEvent.$isPhantom =
    CreateSpoolAccountEvent.$isPhantom

  readonly spoolAccountId: ToField<ID>
  readonly spoolId: ToField<ID>
  readonly stakingType: ToField<TypeName>
  readonly createdAt: ToField<'u64'>

  private constructor(typeArgs: [], fields: CreateSpoolAccountEventFields) {
    this.$fullTypeName = composeSuiType(
      CreateSpoolAccountEvent.$typeName,
      ...typeArgs,
    ) as `${string}::user::CreateSpoolAccountEvent`
    this.$typeArgs = typeArgs

    this.spoolAccountId = fields.spoolAccountId
    this.spoolId = fields.spoolId
    this.stakingType = fields.stakingType
    this.createdAt = fields.createdAt
  }

  static reified(): CreateSpoolAccountEventReified {
    const reifiedBcs = CreateSpoolAccountEvent.bcs
    return {
      get typeName() {
        return CreateSpoolAccountEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CreateSpoolAccountEvent.$typeName,
          ...[],
        ) as `${string}::user::CreateSpoolAccountEvent`
      },
      typeArgs: [] as [],
      isPhantom: CreateSpoolAccountEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CreateSpoolAccountEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CreateSpoolAccountEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CreateSpoolAccountEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CreateSpoolAccountEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CreateSpoolAccountEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CreateSpoolAccountEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CreateSpoolAccountEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CreateSpoolAccountEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CreateSpoolAccountEvent.fetch(client, id),
      new: (fields: CreateSpoolAccountEventFields) => {
        return new CreateSpoolAccountEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CreateSpoolAccountEventReified {
    return CreateSpoolAccountEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CreateSpoolAccountEvent>> {
    return phantom(CreateSpoolAccountEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CreateSpoolAccountEvent>> {
    return CreateSpoolAccountEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CreateSpoolAccountEvent', {
      spool_account_id: ID.bcs,
      spool_id: ID.bcs,
      staking_type: TypeName.bcs,
      created_at: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CreateSpoolAccountEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CreateSpoolAccountEvent.instantiateBcs> {
    if (!CreateSpoolAccountEvent.cachedBcs) {
      CreateSpoolAccountEvent.cachedBcs = CreateSpoolAccountEvent.instantiateBcs()
    }
    return CreateSpoolAccountEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CreateSpoolAccountEvent {
    return CreateSpoolAccountEvent.reified().new({
      spoolAccountId: decodeFromFields(ID.reified(), fields.spool_account_id),
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      stakingType: decodeFromFields(TypeName.reified(), fields.staking_type),
      createdAt: decodeFromFields('u64', fields.created_at),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CreateSpoolAccountEvent {
    if (!isCreateSpoolAccountEvent(item.type)) {
      throw new Error('not a CreateSpoolAccountEvent type')
    }

    return CreateSpoolAccountEvent.reified().new({
      spoolAccountId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_account_id),
      spoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_id),
      stakingType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.staking_type),
      createdAt: decodeFromFieldsWithTypes('u64', item.fields.created_at),
    })
  }

  static fromBcs(data: Uint8Array): CreateSpoolAccountEvent {
    return CreateSpoolAccountEvent.fromFields(CreateSpoolAccountEvent.bcs.parse(data))
  }

  toJSONField(): CreateSpoolAccountEventJSONField {
    return {
      spoolAccountId: this.spoolAccountId,
      spoolId: this.spoolId,
      stakingType: this.stakingType,
      createdAt: this.createdAt.toString(),
    }
  }

  toJSON(): CreateSpoolAccountEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CreateSpoolAccountEvent {
    return CreateSpoolAccountEvent.reified().new({
      spoolAccountId: decodeFromJSONField(ID.reified(), field.spoolAccountId),
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      stakingType: decodeFromJSONField(TypeName.reified(), field.stakingType),
      createdAt: decodeFromJSONField('u64', field.createdAt),
    })
  }

  static fromJSON(json: Record<string, any>): CreateSpoolAccountEvent {
    if (json.$typeName !== CreateSpoolAccountEvent.$typeName) {
      throw new Error(
        `not a CreateSpoolAccountEvent json object: expected '${CreateSpoolAccountEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CreateSpoolAccountEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CreateSpoolAccountEvent {
    if (!isCreateSpoolAccountEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CreateSpoolAccountEvent object`)
    }
    return CreateSpoolAccountEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CreateSpoolAccountEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CreateSpoolAccountEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCreateSpoolAccountEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CreateSpoolAccountEvent object`,
      )
    }
    return CreateSpoolAccountEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CreateSpoolAccountEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CreateSpoolAccountEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCreateSpoolAccountEvent(data.bcs.type)) {
        throw new Error(`object at is not a CreateSpoolAccountEvent object`)
      }

      return CreateSpoolAccountEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreateSpoolAccountEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CreateSpoolAccountEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCreateSpoolAccountEvent(object.type)) {
      throw new Error(`object at id ${id} is not a CreateSpoolAccountEvent object`)
    }
    return CreateSpoolAccountEvent.fromBcs(object.content)
  }
}

/* ============================== SpoolAccountUnstakeEvent =============================== */

export function isSpoolAccountUnstakeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('spool', 'user::SpoolAccountUnstakeEvent')
    }::user::SpoolAccountUnstakeEvent`
}

export interface SpoolAccountUnstakeEventFields {
  spoolAccountId: ToField<ID>
  spoolId: ToField<ID>
  stakingType: ToField<TypeName>
  unstakeAmount: ToField<'u64'>
  remainingAmount: ToField<'u64'>
  timestamp: ToField<'u64'>
}

export type SpoolAccountUnstakeEventReified = Reified<
  SpoolAccountUnstakeEvent,
  SpoolAccountUnstakeEventFields
>

export type SpoolAccountUnstakeEventJSONField = {
  spoolAccountId: string
  spoolId: string
  stakingType: string
  unstakeAmount: string
  remainingAmount: string
  timestamp: string
}

export type SpoolAccountUnstakeEventJSON = {
  $typeName: typeof SpoolAccountUnstakeEvent.$typeName
  $typeArgs: []
} & SpoolAccountUnstakeEventJSONField

export class SpoolAccountUnstakeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::user::SpoolAccountUnstakeEvent` {
    return `${
      getTypeOrigin('spool', 'user::SpoolAccountUnstakeEvent')
    }::user::SpoolAccountUnstakeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SpoolAccountUnstakeEvent.$typeName = SpoolAccountUnstakeEvent.$typeName
  readonly $fullTypeName: `${string}::user::SpoolAccountUnstakeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SpoolAccountUnstakeEvent.$isPhantom =
    SpoolAccountUnstakeEvent.$isPhantom

  readonly spoolAccountId: ToField<ID>
  readonly spoolId: ToField<ID>
  readonly stakingType: ToField<TypeName>
  readonly unstakeAmount: ToField<'u64'>
  readonly remainingAmount: ToField<'u64'>
  readonly timestamp: ToField<'u64'>

  private constructor(typeArgs: [], fields: SpoolAccountUnstakeEventFields) {
    this.$fullTypeName = composeSuiType(
      SpoolAccountUnstakeEvent.$typeName,
      ...typeArgs,
    ) as `${string}::user::SpoolAccountUnstakeEvent`
    this.$typeArgs = typeArgs

    this.spoolAccountId = fields.spoolAccountId
    this.spoolId = fields.spoolId
    this.stakingType = fields.stakingType
    this.unstakeAmount = fields.unstakeAmount
    this.remainingAmount = fields.remainingAmount
    this.timestamp = fields.timestamp
  }

  static reified(): SpoolAccountUnstakeEventReified {
    const reifiedBcs = SpoolAccountUnstakeEvent.bcs
    return {
      get typeName() {
        return SpoolAccountUnstakeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SpoolAccountUnstakeEvent.$typeName,
          ...[],
        ) as `${string}::user::SpoolAccountUnstakeEvent`
      },
      typeArgs: [] as [],
      isPhantom: SpoolAccountUnstakeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SpoolAccountUnstakeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        SpoolAccountUnstakeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SpoolAccountUnstakeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SpoolAccountUnstakeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SpoolAccountUnstakeEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SpoolAccountUnstakeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        SpoolAccountUnstakeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        SpoolAccountUnstakeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        SpoolAccountUnstakeEvent.fetch(client, id),
      new: (fields: SpoolAccountUnstakeEventFields) => {
        return new SpoolAccountUnstakeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SpoolAccountUnstakeEventReified {
    return SpoolAccountUnstakeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SpoolAccountUnstakeEvent>> {
    return phantom(SpoolAccountUnstakeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SpoolAccountUnstakeEvent>> {
    return SpoolAccountUnstakeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SpoolAccountUnstakeEvent', {
      spool_account_id: ID.bcs,
      spool_id: ID.bcs,
      staking_type: TypeName.bcs,
      unstake_amount: bcs.u64(),
      remaining_amount: bcs.u64(),
      timestamp: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SpoolAccountUnstakeEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SpoolAccountUnstakeEvent.instantiateBcs> {
    if (!SpoolAccountUnstakeEvent.cachedBcs) {
      SpoolAccountUnstakeEvent.cachedBcs = SpoolAccountUnstakeEvent.instantiateBcs()
    }
    return SpoolAccountUnstakeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SpoolAccountUnstakeEvent {
    return SpoolAccountUnstakeEvent.reified().new({
      spoolAccountId: decodeFromFields(ID.reified(), fields.spool_account_id),
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      stakingType: decodeFromFields(TypeName.reified(), fields.staking_type),
      unstakeAmount: decodeFromFields('u64', fields.unstake_amount),
      remainingAmount: decodeFromFields('u64', fields.remaining_amount),
      timestamp: decodeFromFields('u64', fields.timestamp),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SpoolAccountUnstakeEvent {
    if (!isSpoolAccountUnstakeEvent(item.type)) {
      throw new Error('not a SpoolAccountUnstakeEvent type')
    }

    return SpoolAccountUnstakeEvent.reified().new({
      spoolAccountId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_account_id),
      spoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_id),
      stakingType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.staking_type),
      unstakeAmount: decodeFromFieldsWithTypes('u64', item.fields.unstake_amount),
      remainingAmount: decodeFromFieldsWithTypes('u64', item.fields.remaining_amount),
      timestamp: decodeFromFieldsWithTypes('u64', item.fields.timestamp),
    })
  }

  static fromBcs(data: Uint8Array): SpoolAccountUnstakeEvent {
    return SpoolAccountUnstakeEvent.fromFields(SpoolAccountUnstakeEvent.bcs.parse(data))
  }

  toJSONField(): SpoolAccountUnstakeEventJSONField {
    return {
      spoolAccountId: this.spoolAccountId,
      spoolId: this.spoolId,
      stakingType: this.stakingType,
      unstakeAmount: this.unstakeAmount.toString(),
      remainingAmount: this.remainingAmount.toString(),
      timestamp: this.timestamp.toString(),
    }
  }

  toJSON(): SpoolAccountUnstakeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SpoolAccountUnstakeEvent {
    return SpoolAccountUnstakeEvent.reified().new({
      spoolAccountId: decodeFromJSONField(ID.reified(), field.spoolAccountId),
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      stakingType: decodeFromJSONField(TypeName.reified(), field.stakingType),
      unstakeAmount: decodeFromJSONField('u64', field.unstakeAmount),
      remainingAmount: decodeFromJSONField('u64', field.remainingAmount),
      timestamp: decodeFromJSONField('u64', field.timestamp),
    })
  }

  static fromJSON(json: Record<string, any>): SpoolAccountUnstakeEvent {
    if (json.$typeName !== SpoolAccountUnstakeEvent.$typeName) {
      throw new Error(
        `not a SpoolAccountUnstakeEvent json object: expected '${SpoolAccountUnstakeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SpoolAccountUnstakeEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SpoolAccountUnstakeEvent {
    if (!isSpoolAccountUnstakeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SpoolAccountUnstakeEvent object`)
    }
    return SpoolAccountUnstakeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SpoolAccountUnstakeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SpoolAccountUnstakeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSpoolAccountUnstakeEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a SpoolAccountUnstakeEvent object`,
      )
    }
    return SpoolAccountUnstakeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SpoolAccountUnstakeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SpoolAccountUnstakeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSpoolAccountUnstakeEvent(data.bcs.type)) {
        throw new Error(`object at is not a SpoolAccountUnstakeEvent object`)
      }

      return SpoolAccountUnstakeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SpoolAccountUnstakeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SpoolAccountUnstakeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSpoolAccountUnstakeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SpoolAccountUnstakeEvent object`)
    }
    return SpoolAccountUnstakeEvent.fromBcs(object.content)
  }
}

/* ============================== SpoolAccountStakeEvent =============================== */

export function isSpoolAccountStakeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('spool', 'user::SpoolAccountStakeEvent')}::user::SpoolAccountStakeEvent`
}

export interface SpoolAccountStakeEventFields {
  sender: ToField<'address'>
  spoolAccountId: ToField<ID>
  spoolId: ToField<ID>
  stakingType: ToField<TypeName>
  stakeAmount: ToField<'u64'>
  previousAmount: ToField<'u64'>
  timestamp: ToField<'u64'>
}

export type SpoolAccountStakeEventReified = Reified<
  SpoolAccountStakeEvent,
  SpoolAccountStakeEventFields
>

export type SpoolAccountStakeEventJSONField = {
  sender: string
  spoolAccountId: string
  spoolId: string
  stakingType: string
  stakeAmount: string
  previousAmount: string
  timestamp: string
}

export type SpoolAccountStakeEventJSON = {
  $typeName: typeof SpoolAccountStakeEvent.$typeName
  $typeArgs: []
} & SpoolAccountStakeEventJSONField

export class SpoolAccountStakeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::user::SpoolAccountStakeEvent` {
    return `${
      getTypeOrigin('spool', 'user::SpoolAccountStakeEvent')
    }::user::SpoolAccountStakeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SpoolAccountStakeEvent.$typeName = SpoolAccountStakeEvent.$typeName
  readonly $fullTypeName: `${string}::user::SpoolAccountStakeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SpoolAccountStakeEvent.$isPhantom = SpoolAccountStakeEvent.$isPhantom

  readonly sender: ToField<'address'>
  readonly spoolAccountId: ToField<ID>
  readonly spoolId: ToField<ID>
  readonly stakingType: ToField<TypeName>
  readonly stakeAmount: ToField<'u64'>
  readonly previousAmount: ToField<'u64'>
  readonly timestamp: ToField<'u64'>

  private constructor(typeArgs: [], fields: SpoolAccountStakeEventFields) {
    this.$fullTypeName = composeSuiType(
      SpoolAccountStakeEvent.$typeName,
      ...typeArgs,
    ) as `${string}::user::SpoolAccountStakeEvent`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.spoolAccountId = fields.spoolAccountId
    this.spoolId = fields.spoolId
    this.stakingType = fields.stakingType
    this.stakeAmount = fields.stakeAmount
    this.previousAmount = fields.previousAmount
    this.timestamp = fields.timestamp
  }

  static reified(): SpoolAccountStakeEventReified {
    const reifiedBcs = SpoolAccountStakeEvent.bcs
    return {
      get typeName() {
        return SpoolAccountStakeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SpoolAccountStakeEvent.$typeName,
          ...[],
        ) as `${string}::user::SpoolAccountStakeEvent`
      },
      typeArgs: [] as [],
      isPhantom: SpoolAccountStakeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SpoolAccountStakeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        SpoolAccountStakeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SpoolAccountStakeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SpoolAccountStakeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SpoolAccountStakeEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SpoolAccountStakeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        SpoolAccountStakeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        SpoolAccountStakeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        SpoolAccountStakeEvent.fetch(client, id),
      new: (fields: SpoolAccountStakeEventFields) => {
        return new SpoolAccountStakeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SpoolAccountStakeEventReified {
    return SpoolAccountStakeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SpoolAccountStakeEvent>> {
    return phantom(SpoolAccountStakeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SpoolAccountStakeEvent>> {
    return SpoolAccountStakeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SpoolAccountStakeEvent', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      spool_account_id: ID.bcs,
      spool_id: ID.bcs,
      staking_type: TypeName.bcs,
      stake_amount: bcs.u64(),
      previous_amount: bcs.u64(),
      timestamp: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SpoolAccountStakeEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SpoolAccountStakeEvent.instantiateBcs> {
    if (!SpoolAccountStakeEvent.cachedBcs) {
      SpoolAccountStakeEvent.cachedBcs = SpoolAccountStakeEvent.instantiateBcs()
    }
    return SpoolAccountStakeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SpoolAccountStakeEvent {
    return SpoolAccountStakeEvent.reified().new({
      sender: decodeFromFields('address', fields.sender),
      spoolAccountId: decodeFromFields(ID.reified(), fields.spool_account_id),
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      stakingType: decodeFromFields(TypeName.reified(), fields.staking_type),
      stakeAmount: decodeFromFields('u64', fields.stake_amount),
      previousAmount: decodeFromFields('u64', fields.previous_amount),
      timestamp: decodeFromFields('u64', fields.timestamp),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SpoolAccountStakeEvent {
    if (!isSpoolAccountStakeEvent(item.type)) {
      throw new Error('not a SpoolAccountStakeEvent type')
    }

    return SpoolAccountStakeEvent.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      spoolAccountId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_account_id),
      spoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_id),
      stakingType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.staking_type),
      stakeAmount: decodeFromFieldsWithTypes('u64', item.fields.stake_amount),
      previousAmount: decodeFromFieldsWithTypes('u64', item.fields.previous_amount),
      timestamp: decodeFromFieldsWithTypes('u64', item.fields.timestamp),
    })
  }

  static fromBcs(data: Uint8Array): SpoolAccountStakeEvent {
    return SpoolAccountStakeEvent.fromFields(SpoolAccountStakeEvent.bcs.parse(data))
  }

  toJSONField(): SpoolAccountStakeEventJSONField {
    return {
      sender: this.sender,
      spoolAccountId: this.spoolAccountId,
      spoolId: this.spoolId,
      stakingType: this.stakingType,
      stakeAmount: this.stakeAmount.toString(),
      previousAmount: this.previousAmount.toString(),
      timestamp: this.timestamp.toString(),
    }
  }

  toJSON(): SpoolAccountStakeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SpoolAccountStakeEvent {
    return SpoolAccountStakeEvent.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      spoolAccountId: decodeFromJSONField(ID.reified(), field.spoolAccountId),
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      stakingType: decodeFromJSONField(TypeName.reified(), field.stakingType),
      stakeAmount: decodeFromJSONField('u64', field.stakeAmount),
      previousAmount: decodeFromJSONField('u64', field.previousAmount),
      timestamp: decodeFromJSONField('u64', field.timestamp),
    })
  }

  static fromJSON(json: Record<string, any>): SpoolAccountStakeEvent {
    if (json.$typeName !== SpoolAccountStakeEvent.$typeName) {
      throw new Error(
        `not a SpoolAccountStakeEvent json object: expected '${SpoolAccountStakeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SpoolAccountStakeEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SpoolAccountStakeEvent {
    if (!isSpoolAccountStakeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SpoolAccountStakeEvent object`)
    }
    return SpoolAccountStakeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SpoolAccountStakeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SpoolAccountStakeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSpoolAccountStakeEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a SpoolAccountStakeEvent object`,
      )
    }
    return SpoolAccountStakeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SpoolAccountStakeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SpoolAccountStakeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSpoolAccountStakeEvent(data.bcs.type)) {
        throw new Error(`object at is not a SpoolAccountStakeEvent object`)
      }

      return SpoolAccountStakeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SpoolAccountStakeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SpoolAccountStakeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSpoolAccountStakeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SpoolAccountStakeEvent object`)
    }
    return SpoolAccountStakeEvent.fromBcs(object.content)
  }
}

/* ============================== SpoolAccountRedeemRewardsEvent =============================== */

export function isSpoolAccountRedeemRewardsEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('spool', 'user::SpoolAccountRedeemRewardsEvent')
    }::user::SpoolAccountRedeemRewardsEvent`
}

export interface SpoolAccountRedeemRewardsEventFields {
  sender: ToField<'address'>
  spoolAccountId: ToField<ID>
  spoolId: ToField<ID>
  rewardsPoolId: ToField<ID>
  stakingType: ToField<TypeName>
  rewardsType: ToField<TypeName>
  redeemedPoints: ToField<'u64'>
  previousPoints: ToField<'u64'>
  rewards: ToField<'u64'>
  /** total claimed rewards in the pool */
  totalClaimedRewards: ToField<'u64'>
  /** total points of the user */
  totalUserPoints: ToField<'u64'>
  timestamp: ToField<'u64'>
}

export type SpoolAccountRedeemRewardsEventReified = Reified<
  SpoolAccountRedeemRewardsEvent,
  SpoolAccountRedeemRewardsEventFields
>

export type SpoolAccountRedeemRewardsEventJSONField = {
  sender: string
  spoolAccountId: string
  spoolId: string
  rewardsPoolId: string
  stakingType: string
  rewardsType: string
  redeemedPoints: string
  previousPoints: string
  rewards: string
  totalClaimedRewards: string
  totalUserPoints: string
  timestamp: string
}

export type SpoolAccountRedeemRewardsEventJSON = {
  $typeName: typeof SpoolAccountRedeemRewardsEvent.$typeName
  $typeArgs: []
} & SpoolAccountRedeemRewardsEventJSONField

export class SpoolAccountRedeemRewardsEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::user::SpoolAccountRedeemRewardsEvent` {
    return `${
      getTypeOrigin('spool', 'user::SpoolAccountRedeemRewardsEvent')
    }::user::SpoolAccountRedeemRewardsEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SpoolAccountRedeemRewardsEvent.$typeName =
    SpoolAccountRedeemRewardsEvent.$typeName
  readonly $fullTypeName: `${string}::user::SpoolAccountRedeemRewardsEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SpoolAccountRedeemRewardsEvent.$isPhantom =
    SpoolAccountRedeemRewardsEvent.$isPhantom

  readonly sender: ToField<'address'>
  readonly spoolAccountId: ToField<ID>
  readonly spoolId: ToField<ID>
  readonly rewardsPoolId: ToField<ID>
  readonly stakingType: ToField<TypeName>
  readonly rewardsType: ToField<TypeName>
  readonly redeemedPoints: ToField<'u64'>
  readonly previousPoints: ToField<'u64'>
  readonly rewards: ToField<'u64'>
  /** total claimed rewards in the pool */
  readonly totalClaimedRewards: ToField<'u64'>
  /** total points of the user */
  readonly totalUserPoints: ToField<'u64'>
  readonly timestamp: ToField<'u64'>

  private constructor(typeArgs: [], fields: SpoolAccountRedeemRewardsEventFields) {
    this.$fullTypeName = composeSuiType(
      SpoolAccountRedeemRewardsEvent.$typeName,
      ...typeArgs,
    ) as `${string}::user::SpoolAccountRedeemRewardsEvent`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.spoolAccountId = fields.spoolAccountId
    this.spoolId = fields.spoolId
    this.rewardsPoolId = fields.rewardsPoolId
    this.stakingType = fields.stakingType
    this.rewardsType = fields.rewardsType
    this.redeemedPoints = fields.redeemedPoints
    this.previousPoints = fields.previousPoints
    this.rewards = fields.rewards
    this.totalClaimedRewards = fields.totalClaimedRewards
    this.totalUserPoints = fields.totalUserPoints
    this.timestamp = fields.timestamp
  }

  static reified(): SpoolAccountRedeemRewardsEventReified {
    const reifiedBcs = SpoolAccountRedeemRewardsEvent.bcs
    return {
      get typeName() {
        return SpoolAccountRedeemRewardsEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SpoolAccountRedeemRewardsEvent.$typeName,
          ...[],
        ) as `${string}::user::SpoolAccountRedeemRewardsEvent`
      },
      typeArgs: [] as [],
      isPhantom: SpoolAccountRedeemRewardsEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        SpoolAccountRedeemRewardsEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        SpoolAccountRedeemRewardsEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        SpoolAccountRedeemRewardsEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SpoolAccountRedeemRewardsEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SpoolAccountRedeemRewardsEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SpoolAccountRedeemRewardsEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        SpoolAccountRedeemRewardsEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        SpoolAccountRedeemRewardsEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        SpoolAccountRedeemRewardsEvent.fetch(client, id),
      new: (fields: SpoolAccountRedeemRewardsEventFields) => {
        return new SpoolAccountRedeemRewardsEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SpoolAccountRedeemRewardsEventReified {
    return SpoolAccountRedeemRewardsEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SpoolAccountRedeemRewardsEvent>> {
    return phantom(SpoolAccountRedeemRewardsEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SpoolAccountRedeemRewardsEvent>> {
    return SpoolAccountRedeemRewardsEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SpoolAccountRedeemRewardsEvent', {
      sender: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      spool_account_id: ID.bcs,
      spool_id: ID.bcs,
      rewards_pool_id: ID.bcs,
      staking_type: TypeName.bcs,
      rewards_type: TypeName.bcs,
      redeemed_points: bcs.u64(),
      previous_points: bcs.u64(),
      rewards: bcs.u64(),
      total_claimed_rewards: bcs.u64(),
      total_user_points: bcs.u64(),
      timestamp: bcs.u64(),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof SpoolAccountRedeemRewardsEvent.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof SpoolAccountRedeemRewardsEvent.instantiateBcs> {
    if (!SpoolAccountRedeemRewardsEvent.cachedBcs) {
      SpoolAccountRedeemRewardsEvent.cachedBcs = SpoolAccountRedeemRewardsEvent.instantiateBcs()
    }
    return SpoolAccountRedeemRewardsEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SpoolAccountRedeemRewardsEvent {
    return SpoolAccountRedeemRewardsEvent.reified().new({
      sender: decodeFromFields('address', fields.sender),
      spoolAccountId: decodeFromFields(ID.reified(), fields.spool_account_id),
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      rewardsPoolId: decodeFromFields(ID.reified(), fields.rewards_pool_id),
      stakingType: decodeFromFields(TypeName.reified(), fields.staking_type),
      rewardsType: decodeFromFields(TypeName.reified(), fields.rewards_type),
      redeemedPoints: decodeFromFields('u64', fields.redeemed_points),
      previousPoints: decodeFromFields('u64', fields.previous_points),
      rewards: decodeFromFields('u64', fields.rewards),
      totalClaimedRewards: decodeFromFields('u64', fields.total_claimed_rewards),
      totalUserPoints: decodeFromFields('u64', fields.total_user_points),
      timestamp: decodeFromFields('u64', fields.timestamp),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SpoolAccountRedeemRewardsEvent {
    if (!isSpoolAccountRedeemRewardsEvent(item.type)) {
      throw new Error('not a SpoolAccountRedeemRewardsEvent type')
    }

    return SpoolAccountRedeemRewardsEvent.reified().new({
      sender: decodeFromFieldsWithTypes('address', item.fields.sender),
      spoolAccountId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_account_id),
      spoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_id),
      rewardsPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.rewards_pool_id),
      stakingType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.staking_type),
      rewardsType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.rewards_type),
      redeemedPoints: decodeFromFieldsWithTypes('u64', item.fields.redeemed_points),
      previousPoints: decodeFromFieldsWithTypes('u64', item.fields.previous_points),
      rewards: decodeFromFieldsWithTypes('u64', item.fields.rewards),
      totalClaimedRewards: decodeFromFieldsWithTypes('u64', item.fields.total_claimed_rewards),
      totalUserPoints: decodeFromFieldsWithTypes('u64', item.fields.total_user_points),
      timestamp: decodeFromFieldsWithTypes('u64', item.fields.timestamp),
    })
  }

  static fromBcs(data: Uint8Array): SpoolAccountRedeemRewardsEvent {
    return SpoolAccountRedeemRewardsEvent.fromFields(SpoolAccountRedeemRewardsEvent.bcs.parse(data))
  }

  toJSONField(): SpoolAccountRedeemRewardsEventJSONField {
    return {
      sender: this.sender,
      spoolAccountId: this.spoolAccountId,
      spoolId: this.spoolId,
      rewardsPoolId: this.rewardsPoolId,
      stakingType: this.stakingType,
      rewardsType: this.rewardsType,
      redeemedPoints: this.redeemedPoints.toString(),
      previousPoints: this.previousPoints.toString(),
      rewards: this.rewards.toString(),
      totalClaimedRewards: this.totalClaimedRewards.toString(),
      totalUserPoints: this.totalUserPoints.toString(),
      timestamp: this.timestamp.toString(),
    }
  }

  toJSON(): SpoolAccountRedeemRewardsEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SpoolAccountRedeemRewardsEvent {
    return SpoolAccountRedeemRewardsEvent.reified().new({
      sender: decodeFromJSONField('address', field.sender),
      spoolAccountId: decodeFromJSONField(ID.reified(), field.spoolAccountId),
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      rewardsPoolId: decodeFromJSONField(ID.reified(), field.rewardsPoolId),
      stakingType: decodeFromJSONField(TypeName.reified(), field.stakingType),
      rewardsType: decodeFromJSONField(TypeName.reified(), field.rewardsType),
      redeemedPoints: decodeFromJSONField('u64', field.redeemedPoints),
      previousPoints: decodeFromJSONField('u64', field.previousPoints),
      rewards: decodeFromJSONField('u64', field.rewards),
      totalClaimedRewards: decodeFromJSONField('u64', field.totalClaimedRewards),
      totalUserPoints: decodeFromJSONField('u64', field.totalUserPoints),
      timestamp: decodeFromJSONField('u64', field.timestamp),
    })
  }

  static fromJSON(json: Record<string, any>): SpoolAccountRedeemRewardsEvent {
    if (json.$typeName !== SpoolAccountRedeemRewardsEvent.$typeName) {
      throw new Error(
        `not a SpoolAccountRedeemRewardsEvent json object: expected '${SpoolAccountRedeemRewardsEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SpoolAccountRedeemRewardsEvent.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): SpoolAccountRedeemRewardsEvent {
    if (!isSpoolAccountRedeemRewardsEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SpoolAccountRedeemRewardsEvent object`)
    }
    return SpoolAccountRedeemRewardsEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SpoolAccountRedeemRewardsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SpoolAccountRedeemRewardsEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSpoolAccountRedeemRewardsEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a SpoolAccountRedeemRewardsEvent object`,
      )
    }
    return SpoolAccountRedeemRewardsEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SpoolAccountRedeemRewardsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SpoolAccountRedeemRewardsEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSpoolAccountRedeemRewardsEvent(data.bcs.type)) {
        throw new Error(`object at is not a SpoolAccountRedeemRewardsEvent object`)
      }

      return SpoolAccountRedeemRewardsEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SpoolAccountRedeemRewardsEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: ClientWithCoreApi,
    id: string,
  ): Promise<SpoolAccountRedeemRewardsEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSpoolAccountRedeemRewardsEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SpoolAccountRedeemRewardsEvent object`)
    }
    return SpoolAccountRedeemRewardsEvent.fromBcs(object.content)
  }
}
