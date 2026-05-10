import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { TypeName } from '../../../std/type-name/structs'
import { ID, UID } from '../../../sui/object/structs'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('spool', 'admin::AdminCap')}::admin::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export type AdminCapJSONField = {
  id: string
}

export type AdminCapJSON = {
  $typeName: typeof AdminCap.$typeName
  $typeArgs: []
} & AdminCapJSONField

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::admin::AdminCap` = `${
    getTypeOrigin('spool', 'admin::AdminCap')
  }::admin::AdminCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName
  readonly $fullTypeName: `${string}::admin::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs,
    ) as `${string}::admin::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[],
      ) as `${string}::admin::AdminCap`,
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AdminCapReified {
    return AdminCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AdminCap>> {
    return AdminCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AdminCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AdminCap.instantiateBcs> {
    if (!AdminCap.cachedBcs) {
      AdminCap.cachedBcs = AdminCap.instantiateBcs()
    }
    return AdminCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField(): AdminCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): AdminCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error(
        `not a AdminCap json object: expected '${AdminCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AdminCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`)
    }
    return AdminCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`)
      }

      return AdminCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AdminCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isAdminCap(res.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }

    return AdminCap.fromBcs(res.bcsBytes)
  }
}

/* ============================== CreateSpoolEvent =============================== */

export function isCreateSpoolEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('spool', 'admin::CreateSpoolEvent')}::admin::CreateSpoolEvent`
}

export interface CreateSpoolEventFields {
  spoolId: ToField<ID>
  stakingType: ToField<TypeName>
  distributedPointPerPeriod: ToField<'u64'>
  pointDistributionTime: ToField<'u64'>
  maxDistributedPoint: ToField<'u64'>
  maxStakes: ToField<'u64'>
  createdAt: ToField<'u64'>
}

export type CreateSpoolEventReified = Reified<CreateSpoolEvent, CreateSpoolEventFields>

export type CreateSpoolEventJSONField = {
  spoolId: string
  stakingType: string
  distributedPointPerPeriod: string
  pointDistributionTime: string
  maxDistributedPoint: string
  maxStakes: string
  createdAt: string
}

export type CreateSpoolEventJSON = {
  $typeName: typeof CreateSpoolEvent.$typeName
  $typeArgs: []
} & CreateSpoolEventJSONField

export class CreateSpoolEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::admin::CreateSpoolEvent` = `${
    getTypeOrigin('spool', 'admin::CreateSpoolEvent')
  }::admin::CreateSpoolEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CreateSpoolEvent.$typeName = CreateSpoolEvent.$typeName
  readonly $fullTypeName: `${string}::admin::CreateSpoolEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CreateSpoolEvent.$isPhantom = CreateSpoolEvent.$isPhantom

  readonly spoolId: ToField<ID>
  readonly stakingType: ToField<TypeName>
  readonly distributedPointPerPeriod: ToField<'u64'>
  readonly pointDistributionTime: ToField<'u64'>
  readonly maxDistributedPoint: ToField<'u64'>
  readonly maxStakes: ToField<'u64'>
  readonly createdAt: ToField<'u64'>

  private constructor(typeArgs: [], fields: CreateSpoolEventFields) {
    this.$fullTypeName = composeSuiType(
      CreateSpoolEvent.$typeName,
      ...typeArgs,
    ) as `${string}::admin::CreateSpoolEvent`
    this.$typeArgs = typeArgs

    this.spoolId = fields.spoolId
    this.stakingType = fields.stakingType
    this.distributedPointPerPeriod = fields.distributedPointPerPeriod
    this.pointDistributionTime = fields.pointDistributionTime
    this.maxDistributedPoint = fields.maxDistributedPoint
    this.maxStakes = fields.maxStakes
    this.createdAt = fields.createdAt
  }

  static reified(): CreateSpoolEventReified {
    const reifiedBcs = CreateSpoolEvent.bcs
    return {
      typeName: CreateSpoolEvent.$typeName,
      fullTypeName: composeSuiType(
        CreateSpoolEvent.$typeName,
        ...[],
      ) as `${string}::admin::CreateSpoolEvent`,
      typeArgs: [] as [],
      isPhantom: CreateSpoolEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CreateSpoolEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CreateSpoolEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CreateSpoolEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CreateSpoolEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CreateSpoolEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CreateSpoolEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CreateSpoolEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => CreateSpoolEvent.fetch(client, id),
      new: (fields: CreateSpoolEventFields) => {
        return new CreateSpoolEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CreateSpoolEventReified {
    return CreateSpoolEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CreateSpoolEvent>> {
    return phantom(CreateSpoolEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CreateSpoolEvent>> {
    return CreateSpoolEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CreateSpoolEvent', {
      spool_id: ID.bcs,
      staking_type: TypeName.bcs,
      distributed_point_per_period: bcs.u64(),
      point_distribution_time: bcs.u64(),
      max_distributed_point: bcs.u64(),
      max_stakes: bcs.u64(),
      created_at: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CreateSpoolEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CreateSpoolEvent.instantiateBcs> {
    if (!CreateSpoolEvent.cachedBcs) {
      CreateSpoolEvent.cachedBcs = CreateSpoolEvent.instantiateBcs()
    }
    return CreateSpoolEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CreateSpoolEvent {
    return CreateSpoolEvent.reified().new({
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      stakingType: decodeFromFields(TypeName.reified(), fields.staking_type),
      distributedPointPerPeriod: decodeFromFields('u64', fields.distributed_point_per_period),
      pointDistributionTime: decodeFromFields('u64', fields.point_distribution_time),
      maxDistributedPoint: decodeFromFields('u64', fields.max_distributed_point),
      maxStakes: decodeFromFields('u64', fields.max_stakes),
      createdAt: decodeFromFields('u64', fields.created_at),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CreateSpoolEvent {
    if (!isCreateSpoolEvent(item.type)) {
      throw new Error('not a CreateSpoolEvent type')
    }

    return CreateSpoolEvent.reified().new({
      spoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_id),
      stakingType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.staking_type),
      distributedPointPerPeriod: decodeFromFieldsWithTypes(
        'u64',
        item.fields.distributed_point_per_period,
      ),
      pointDistributionTime: decodeFromFieldsWithTypes('u64', item.fields.point_distribution_time),
      maxDistributedPoint: decodeFromFieldsWithTypes('u64', item.fields.max_distributed_point),
      maxStakes: decodeFromFieldsWithTypes('u64', item.fields.max_stakes),
      createdAt: decodeFromFieldsWithTypes('u64', item.fields.created_at),
    })
  }

  static fromBcs(data: Uint8Array): CreateSpoolEvent {
    return CreateSpoolEvent.fromFields(CreateSpoolEvent.bcs.parse(data))
  }

  toJSONField(): CreateSpoolEventJSONField {
    return {
      spoolId: this.spoolId,
      stakingType: this.stakingType,
      distributedPointPerPeriod: this.distributedPointPerPeriod.toString(),
      pointDistributionTime: this.pointDistributionTime.toString(),
      maxDistributedPoint: this.maxDistributedPoint.toString(),
      maxStakes: this.maxStakes.toString(),
      createdAt: this.createdAt.toString(),
    }
  }

  toJSON(): CreateSpoolEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CreateSpoolEvent {
    return CreateSpoolEvent.reified().new({
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      stakingType: decodeFromJSONField(TypeName.reified(), field.stakingType),
      distributedPointPerPeriod: decodeFromJSONField('u64', field.distributedPointPerPeriod),
      pointDistributionTime: decodeFromJSONField('u64', field.pointDistributionTime),
      maxDistributedPoint: decodeFromJSONField('u64', field.maxDistributedPoint),
      maxStakes: decodeFromJSONField('u64', field.maxStakes),
      createdAt: decodeFromJSONField('u64', field.createdAt),
    })
  }

  static fromJSON(json: Record<string, any>): CreateSpoolEvent {
    if (json.$typeName !== CreateSpoolEvent.$typeName) {
      throw new Error(
        `not a CreateSpoolEvent json object: expected '${CreateSpoolEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CreateSpoolEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CreateSpoolEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCreateSpoolEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CreateSpoolEvent object`)
    }
    return CreateSpoolEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CreateSpoolEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCreateSpoolEvent(data.bcs.type)) {
        throw new Error(`object at is not a CreateSpoolEvent object`)
      }

      return CreateSpoolEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreateSpoolEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<CreateSpoolEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isCreateSpoolEvent(res.type)) {
      throw new Error(`object at id ${id} is not a CreateSpoolEvent object`)
    }

    return CreateSpoolEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== UpdateSpoolConfigEvent =============================== */

export function isUpdateSpoolConfigEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('spool', 'admin::UpdateSpoolConfigEvent')}::admin::UpdateSpoolConfigEvent`
}

export interface UpdateSpoolConfigEventFields {
  spoolId: ToField<ID>
  distributedPointPerPeriod: ToField<'u64'>
  pointDistributionTime: ToField<'u64'>
  maxDistributedPoint: ToField<'u64'>
  maxStakes: ToField<'u64'>
  updatedAt: ToField<'u64'>
}

export type UpdateSpoolConfigEventReified = Reified<
  UpdateSpoolConfigEvent,
  UpdateSpoolConfigEventFields
>

export type UpdateSpoolConfigEventJSONField = {
  spoolId: string
  distributedPointPerPeriod: string
  pointDistributionTime: string
  maxDistributedPoint: string
  maxStakes: string
  updatedAt: string
}

export type UpdateSpoolConfigEventJSON = {
  $typeName: typeof UpdateSpoolConfigEvent.$typeName
  $typeArgs: []
} & UpdateSpoolConfigEventJSONField

export class UpdateSpoolConfigEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::admin::UpdateSpoolConfigEvent` = `${
    getTypeOrigin('spool', 'admin::UpdateSpoolConfigEvent')
  }::admin::UpdateSpoolConfigEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateSpoolConfigEvent.$typeName = UpdateSpoolConfigEvent.$typeName
  readonly $fullTypeName: `${string}::admin::UpdateSpoolConfigEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateSpoolConfigEvent.$isPhantom = UpdateSpoolConfigEvent.$isPhantom

  readonly spoolId: ToField<ID>
  readonly distributedPointPerPeriod: ToField<'u64'>
  readonly pointDistributionTime: ToField<'u64'>
  readonly maxDistributedPoint: ToField<'u64'>
  readonly maxStakes: ToField<'u64'>
  readonly updatedAt: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateSpoolConfigEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateSpoolConfigEvent.$typeName,
      ...typeArgs,
    ) as `${string}::admin::UpdateSpoolConfigEvent`
    this.$typeArgs = typeArgs

    this.spoolId = fields.spoolId
    this.distributedPointPerPeriod = fields.distributedPointPerPeriod
    this.pointDistributionTime = fields.pointDistributionTime
    this.maxDistributedPoint = fields.maxDistributedPoint
    this.maxStakes = fields.maxStakes
    this.updatedAt = fields.updatedAt
  }

  static reified(): UpdateSpoolConfigEventReified {
    const reifiedBcs = UpdateSpoolConfigEvent.bcs
    return {
      typeName: UpdateSpoolConfigEvent.$typeName,
      fullTypeName: composeSuiType(
        UpdateSpoolConfigEvent.$typeName,
        ...[],
      ) as `${string}::admin::UpdateSpoolConfigEvent`,
      typeArgs: [] as [],
      isPhantom: UpdateSpoolConfigEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateSpoolConfigEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdateSpoolConfigEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateSpoolConfigEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateSpoolConfigEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateSpoolConfigEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdateSpoolConfigEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdateSpoolConfigEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        UpdateSpoolConfigEvent.fetch(client, id),
      new: (fields: UpdateSpoolConfigEventFields) => {
        return new UpdateSpoolConfigEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateSpoolConfigEventReified {
    return UpdateSpoolConfigEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateSpoolConfigEvent>> {
    return phantom(UpdateSpoolConfigEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateSpoolConfigEvent>> {
    return UpdateSpoolConfigEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateSpoolConfigEvent', {
      spool_id: ID.bcs,
      distributed_point_per_period: bcs.u64(),
      point_distribution_time: bcs.u64(),
      max_distributed_point: bcs.u64(),
      max_stakes: bcs.u64(),
      updated_at: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateSpoolConfigEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateSpoolConfigEvent.instantiateBcs> {
    if (!UpdateSpoolConfigEvent.cachedBcs) {
      UpdateSpoolConfigEvent.cachedBcs = UpdateSpoolConfigEvent.instantiateBcs()
    }
    return UpdateSpoolConfigEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateSpoolConfigEvent {
    return UpdateSpoolConfigEvent.reified().new({
      spoolId: decodeFromFields(ID.reified(), fields.spool_id),
      distributedPointPerPeriod: decodeFromFields('u64', fields.distributed_point_per_period),
      pointDistributionTime: decodeFromFields('u64', fields.point_distribution_time),
      maxDistributedPoint: decodeFromFields('u64', fields.max_distributed_point),
      maxStakes: decodeFromFields('u64', fields.max_stakes),
      updatedAt: decodeFromFields('u64', fields.updated_at),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateSpoolConfigEvent {
    if (!isUpdateSpoolConfigEvent(item.type)) {
      throw new Error('not a UpdateSpoolConfigEvent type')
    }

    return UpdateSpoolConfigEvent.reified().new({
      spoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.spool_id),
      distributedPointPerPeriod: decodeFromFieldsWithTypes(
        'u64',
        item.fields.distributed_point_per_period,
      ),
      pointDistributionTime: decodeFromFieldsWithTypes('u64', item.fields.point_distribution_time),
      maxDistributedPoint: decodeFromFieldsWithTypes('u64', item.fields.max_distributed_point),
      maxStakes: decodeFromFieldsWithTypes('u64', item.fields.max_stakes),
      updatedAt: decodeFromFieldsWithTypes('u64', item.fields.updated_at),
    })
  }

  static fromBcs(data: Uint8Array): UpdateSpoolConfigEvent {
    return UpdateSpoolConfigEvent.fromFields(UpdateSpoolConfigEvent.bcs.parse(data))
  }

  toJSONField(): UpdateSpoolConfigEventJSONField {
    return {
      spoolId: this.spoolId,
      distributedPointPerPeriod: this.distributedPointPerPeriod.toString(),
      pointDistributionTime: this.pointDistributionTime.toString(),
      maxDistributedPoint: this.maxDistributedPoint.toString(),
      maxStakes: this.maxStakes.toString(),
      updatedAt: this.updatedAt.toString(),
    }
  }

  toJSON(): UpdateSpoolConfigEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateSpoolConfigEvent {
    return UpdateSpoolConfigEvent.reified().new({
      spoolId: decodeFromJSONField(ID.reified(), field.spoolId),
      distributedPointPerPeriod: decodeFromJSONField('u64', field.distributedPointPerPeriod),
      pointDistributionTime: decodeFromJSONField('u64', field.pointDistributionTime),
      maxDistributedPoint: decodeFromJSONField('u64', field.maxDistributedPoint),
      maxStakes: decodeFromJSONField('u64', field.maxStakes),
      updatedAt: decodeFromJSONField('u64', field.updatedAt),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateSpoolConfigEvent {
    if (json.$typeName !== UpdateSpoolConfigEvent.$typeName) {
      throw new Error(
        `not a UpdateSpoolConfigEvent json object: expected '${UpdateSpoolConfigEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateSpoolConfigEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpdateSpoolConfigEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateSpoolConfigEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdateSpoolConfigEvent object`,
      )
    }
    return UpdateSpoolConfigEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpdateSpoolConfigEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateSpoolConfigEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateSpoolConfigEvent object`)
      }

      return UpdateSpoolConfigEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateSpoolConfigEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<UpdateSpoolConfigEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isUpdateSpoolConfigEvent(res.type)) {
      throw new Error(`object at id ${id} is not a UpdateSpoolConfigEvent object`)
    }

    return UpdateSpoolConfigEvent.fromBcs(res.bcsBytes)
  }
}
