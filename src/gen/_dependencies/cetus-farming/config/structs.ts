import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
  ToTypeStr as ToPhantom,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { ID, UID } from '../../../sui/object/structs'
import { Table } from '../../../sui/table/structs'
import { ACL } from '../acl/structs'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'config::AdminCap')}::config::AdminCap`
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

  static readonly $typeName: `${string}::config::AdminCap` = `${
    getTypeOrigin('cetus-farming', 'config::AdminCap')
  }::config::AdminCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName
  readonly $fullTypeName: `${string}::config::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs,
    ) as `${string}::config::AdminCap`
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
      ) as `${string}::config::AdminCap`,
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

/* ============================== OperatorCap =============================== */

export function isOperatorCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'config::OperatorCap')}::config::OperatorCap`
}

export interface OperatorCapFields {
  id: ToField<UID>
}

export type OperatorCapReified = Reified<OperatorCap, OperatorCapFields>

export type OperatorCapJSONField = {
  id: string
}

export type OperatorCapJSON = {
  $typeName: typeof OperatorCap.$typeName
  $typeArgs: []
} & OperatorCapJSONField

export class OperatorCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::OperatorCap` = `${
    getTypeOrigin('cetus-farming', 'config::OperatorCap')
  }::config::OperatorCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof OperatorCap.$typeName = OperatorCap.$typeName
  readonly $fullTypeName: `${string}::config::OperatorCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof OperatorCap.$isPhantom = OperatorCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: OperatorCapFields) {
    this.$fullTypeName = composeSuiType(
      OperatorCap.$typeName,
      ...typeArgs,
    ) as `${string}::config::OperatorCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): OperatorCapReified {
    const reifiedBcs = OperatorCap.bcs
    return {
      typeName: OperatorCap.$typeName,
      fullTypeName: composeSuiType(
        OperatorCap.$typeName,
        ...[],
      ) as `${string}::config::OperatorCap`,
      typeArgs: [] as [],
      isPhantom: OperatorCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OperatorCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OperatorCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OperatorCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OperatorCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OperatorCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => OperatorCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => OperatorCap.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => OperatorCap.fetch(client, id),
      new: (fields: OperatorCapFields) => {
        return new OperatorCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): OperatorCapReified {
    return OperatorCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OperatorCap>> {
    return phantom(OperatorCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<OperatorCap>> {
    return OperatorCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OperatorCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof OperatorCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof OperatorCap.instantiateBcs> {
    if (!OperatorCap.cachedBcs) {
      OperatorCap.cachedBcs = OperatorCap.instantiateBcs()
    }
    return OperatorCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): OperatorCap {
    return OperatorCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OperatorCap {
    if (!isOperatorCap(item.type)) {
      throw new Error('not a OperatorCap type')
    }

    return OperatorCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): OperatorCap {
    return OperatorCap.fromFields(OperatorCap.bcs.parse(data))
  }

  toJSONField(): OperatorCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): OperatorCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OperatorCap {
    return OperatorCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): OperatorCap {
    if (json.$typeName !== OperatorCap.$typeName) {
      throw new Error(
        `not a OperatorCap json object: expected '${OperatorCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return OperatorCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): OperatorCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOperatorCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OperatorCap object`)
    }
    return OperatorCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): OperatorCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOperatorCap(data.bcs.type)) {
        throw new Error(`object at is not a OperatorCap object`)
      }

      return OperatorCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OperatorCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<OperatorCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isOperatorCap(res.type)) {
      throw new Error(`object at id ${id} is not a OperatorCap object`)
    }

    return OperatorCap.fromBcs(res.bcsBytes)
  }
}

/* ============================== GlobalConfig =============================== */

export function isGlobalConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'config::GlobalConfig')}::config::GlobalConfig`
}

export interface GlobalConfigFields {
  id: ToField<UID>
  acl: ToField<ACL>
  accelerationFactor: ToField<Table<ToPhantom<ID>, 'u8'>>
  packageVersion: ToField<'u64'>
}

export type GlobalConfigReified = Reified<GlobalConfig, GlobalConfigFields>

export type GlobalConfigJSONField = {
  id: string
  acl: ToJSON<ACL>
  accelerationFactor: ToJSON<Table<ToPhantom<ID>, 'u8'>>
  packageVersion: string
}

export type GlobalConfigJSON = {
  $typeName: typeof GlobalConfig.$typeName
  $typeArgs: []
} & GlobalConfigJSONField

export class GlobalConfig implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::GlobalConfig` = `${
    getTypeOrigin('cetus-farming', 'config::GlobalConfig')
  }::config::GlobalConfig` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GlobalConfig.$typeName = GlobalConfig.$typeName
  readonly $fullTypeName: `${string}::config::GlobalConfig`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GlobalConfig.$isPhantom = GlobalConfig.$isPhantom

  readonly id: ToField<UID>
  readonly acl: ToField<ACL>
  readonly accelerationFactor: ToField<Table<ToPhantom<ID>, 'u8'>>
  readonly packageVersion: ToField<'u64'>

  private constructor(typeArgs: [], fields: GlobalConfigFields) {
    this.$fullTypeName = composeSuiType(
      GlobalConfig.$typeName,
      ...typeArgs,
    ) as `${string}::config::GlobalConfig`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.acl = fields.acl
    this.accelerationFactor = fields.accelerationFactor
    this.packageVersion = fields.packageVersion
  }

  static reified(): GlobalConfigReified {
    const reifiedBcs = GlobalConfig.bcs
    return {
      typeName: GlobalConfig.$typeName,
      fullTypeName: composeSuiType(
        GlobalConfig.$typeName,
        ...[],
      ) as `${string}::config::GlobalConfig`,
      typeArgs: [] as [],
      isPhantom: GlobalConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GlobalConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GlobalConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GlobalConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GlobalConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GlobalConfig.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => GlobalConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GlobalConfig.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => GlobalConfig.fetch(client, id),
      new: (fields: GlobalConfigFields) => {
        return new GlobalConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GlobalConfigReified {
    return GlobalConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GlobalConfig>> {
    return phantom(GlobalConfig.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GlobalConfig>> {
    return GlobalConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GlobalConfig', {
      id: UID.bcs,
      acl: ACL.bcs,
      acceleration_factor: Table.bcs,
      package_version: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof GlobalConfig.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GlobalConfig.instantiateBcs> {
    if (!GlobalConfig.cachedBcs) {
      GlobalConfig.cachedBcs = GlobalConfig.instantiateBcs()
    }
    return GlobalConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      acl: decodeFromFields(ACL.reified(), fields.acl),
      accelerationFactor: decodeFromFields(
        Table.reified(phantom(ID.reified()), phantom('u8')),
        fields.acceleration_factor,
      ),
      packageVersion: decodeFromFields('u64', fields.package_version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GlobalConfig {
    if (!isGlobalConfig(item.type)) {
      throw new Error('not a GlobalConfig type')
    }

    return GlobalConfig.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      acl: decodeFromFieldsWithTypes(ACL.reified(), item.fields.acl),
      accelerationFactor: decodeFromFieldsWithTypes(
        Table.reified(phantom(ID.reified()), phantom('u8')),
        item.fields.acceleration_factor,
      ),
      packageVersion: decodeFromFieldsWithTypes('u64', item.fields.package_version),
    })
  }

  static fromBcs(data: Uint8Array): GlobalConfig {
    return GlobalConfig.fromFields(GlobalConfig.bcs.parse(data))
  }

  toJSONField(): GlobalConfigJSONField {
    return {
      id: this.id,
      acl: this.acl.toJSONField(),
      accelerationFactor: this.accelerationFactor.toJSONField(),
      packageVersion: this.packageVersion.toString(),
    }
  }

  toJSON(): GlobalConfigJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      acl: decodeFromJSONField(ACL.reified(), field.acl),
      accelerationFactor: decodeFromJSONField(
        Table.reified(phantom(ID.reified()), phantom('u8')),
        field.accelerationFactor,
      ),
      packageVersion: decodeFromJSONField('u64', field.packageVersion),
    })
  }

  static fromJSON(json: Record<string, any>): GlobalConfig {
    if (json.$typeName !== GlobalConfig.$typeName) {
      throw new Error(
        `not a GlobalConfig json object: expected '${GlobalConfig.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GlobalConfig.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): GlobalConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGlobalConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GlobalConfig object`)
    }
    return GlobalConfig.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): GlobalConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGlobalConfig(data.bcs.type)) {
        throw new Error(`object at is not a GlobalConfig object`)
      }

      return GlobalConfig.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GlobalConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<GlobalConfig> {
    const res = await fetchObjectBcs(client, id)
    if (!isGlobalConfig(res.type)) {
      throw new Error(`object at id ${id} is not a GlobalConfig object`)
    }

    return GlobalConfig.fromBcs(res.bcsBytes)
  }
}

/* ============================== InitConfigEvent =============================== */

export function isInitConfigEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'config::InitConfigEvent')}::config::InitConfigEvent`
}

export interface InitConfigEventFields {
  adminCapId: ToField<ID>
  globalConfigId: ToField<ID>
}

export type InitConfigEventReified = Reified<InitConfigEvent, InitConfigEventFields>

export type InitConfigEventJSONField = {
  adminCapId: string
  globalConfigId: string
}

export type InitConfigEventJSON = {
  $typeName: typeof InitConfigEvent.$typeName
  $typeArgs: []
} & InitConfigEventJSONField

export class InitConfigEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::InitConfigEvent` = `${
    getTypeOrigin('cetus-farming', 'config::InitConfigEvent')
  }::config::InitConfigEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof InitConfigEvent.$typeName = InitConfigEvent.$typeName
  readonly $fullTypeName: `${string}::config::InitConfigEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof InitConfigEvent.$isPhantom = InitConfigEvent.$isPhantom

  readonly adminCapId: ToField<ID>
  readonly globalConfigId: ToField<ID>

  private constructor(typeArgs: [], fields: InitConfigEventFields) {
    this.$fullTypeName = composeSuiType(
      InitConfigEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::InitConfigEvent`
    this.$typeArgs = typeArgs

    this.adminCapId = fields.adminCapId
    this.globalConfigId = fields.globalConfigId
  }

  static reified(): InitConfigEventReified {
    const reifiedBcs = InitConfigEvent.bcs
    return {
      typeName: InitConfigEvent.$typeName,
      fullTypeName: composeSuiType(
        InitConfigEvent.$typeName,
        ...[],
      ) as `${string}::config::InitConfigEvent`,
      typeArgs: [] as [],
      isPhantom: InitConfigEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InitConfigEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => InitConfigEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InitConfigEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => InitConfigEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InitConfigEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => InitConfigEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => InitConfigEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => InitConfigEvent.fetch(client, id),
      new: (fields: InitConfigEventFields) => {
        return new InitConfigEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): InitConfigEventReified {
    return InitConfigEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitConfigEvent>> {
    return phantom(InitConfigEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<InitConfigEvent>> {
    return InitConfigEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('InitConfigEvent', {
      admin_cap_id: ID.bcs,
      global_config_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof InitConfigEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof InitConfigEvent.instantiateBcs> {
    if (!InitConfigEvent.cachedBcs) {
      InitConfigEvent.cachedBcs = InitConfigEvent.instantiateBcs()
    }
    return InitConfigEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): InitConfigEvent {
    return InitConfigEvent.reified().new({
      adminCapId: decodeFromFields(ID.reified(), fields.admin_cap_id),
      globalConfigId: decodeFromFields(ID.reified(), fields.global_config_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InitConfigEvent {
    if (!isInitConfigEvent(item.type)) {
      throw new Error('not a InitConfigEvent type')
    }

    return InitConfigEvent.reified().new({
      adminCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.admin_cap_id),
      globalConfigId: decodeFromFieldsWithTypes(ID.reified(), item.fields.global_config_id),
    })
  }

  static fromBcs(data: Uint8Array): InitConfigEvent {
    return InitConfigEvent.fromFields(InitConfigEvent.bcs.parse(data))
  }

  toJSONField(): InitConfigEventJSONField {
    return {
      adminCapId: this.adminCapId,
      globalConfigId: this.globalConfigId,
    }
  }

  toJSON(): InitConfigEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InitConfigEvent {
    return InitConfigEvent.reified().new({
      adminCapId: decodeFromJSONField(ID.reified(), field.adminCapId),
      globalConfigId: decodeFromJSONField(ID.reified(), field.globalConfigId),
    })
  }

  static fromJSON(json: Record<string, any>): InitConfigEvent {
    if (json.$typeName !== InitConfigEvent.$typeName) {
      throw new Error(
        `not a InitConfigEvent json object: expected '${InitConfigEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return InitConfigEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InitConfigEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInitConfigEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a InitConfigEvent object`)
    }
    return InitConfigEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InitConfigEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInitConfigEvent(data.bcs.type)) {
        throw new Error(`object at is not a InitConfigEvent object`)
      }

      return InitConfigEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitConfigEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<InitConfigEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isInitConfigEvent(res.type)) {
      throw new Error(`object at id ${id} is not a InitConfigEvent object`)
    }

    return InitConfigEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== AddOperatorEvent =============================== */

export function isAddOperatorEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'config::AddOperatorEvent')}::config::AddOperatorEvent`
}

export interface AddOperatorEventFields {
  operatorCapId: ToField<ID>
  recipient: ToField<'address'>
  roles: ToField<'u128'>
}

export type AddOperatorEventReified = Reified<AddOperatorEvent, AddOperatorEventFields>

export type AddOperatorEventJSONField = {
  operatorCapId: string
  recipient: string
  roles: string
}

export type AddOperatorEventJSON = {
  $typeName: typeof AddOperatorEvent.$typeName
  $typeArgs: []
} & AddOperatorEventJSONField

export class AddOperatorEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::AddOperatorEvent` = `${
    getTypeOrigin('cetus-farming', 'config::AddOperatorEvent')
  }::config::AddOperatorEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddOperatorEvent.$typeName = AddOperatorEvent.$typeName
  readonly $fullTypeName: `${string}::config::AddOperatorEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddOperatorEvent.$isPhantom = AddOperatorEvent.$isPhantom

  readonly operatorCapId: ToField<ID>
  readonly recipient: ToField<'address'>
  readonly roles: ToField<'u128'>

  private constructor(typeArgs: [], fields: AddOperatorEventFields) {
    this.$fullTypeName = composeSuiType(
      AddOperatorEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::AddOperatorEvent`
    this.$typeArgs = typeArgs

    this.operatorCapId = fields.operatorCapId
    this.recipient = fields.recipient
    this.roles = fields.roles
  }

  static reified(): AddOperatorEventReified {
    const reifiedBcs = AddOperatorEvent.bcs
    return {
      typeName: AddOperatorEvent.$typeName,
      fullTypeName: composeSuiType(
        AddOperatorEvent.$typeName,
        ...[],
      ) as `${string}::config::AddOperatorEvent`,
      typeArgs: [] as [],
      isPhantom: AddOperatorEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddOperatorEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddOperatorEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddOperatorEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddOperatorEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddOperatorEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddOperatorEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddOperatorEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AddOperatorEvent.fetch(client, id),
      new: (fields: AddOperatorEventFields) => {
        return new AddOperatorEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddOperatorEventReified {
    return AddOperatorEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddOperatorEvent>> {
    return phantom(AddOperatorEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddOperatorEvent>> {
    return AddOperatorEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddOperatorEvent', {
      operator_cap_id: ID.bcs,
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      roles: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddOperatorEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddOperatorEvent.instantiateBcs> {
    if (!AddOperatorEvent.cachedBcs) {
      AddOperatorEvent.cachedBcs = AddOperatorEvent.instantiateBcs()
    }
    return AddOperatorEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddOperatorEvent {
    return AddOperatorEvent.reified().new({
      operatorCapId: decodeFromFields(ID.reified(), fields.operator_cap_id),
      recipient: decodeFromFields('address', fields.recipient),
      roles: decodeFromFields('u128', fields.roles),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddOperatorEvent {
    if (!isAddOperatorEvent(item.type)) {
      throw new Error('not a AddOperatorEvent type')
    }

    return AddOperatorEvent.reified().new({
      operatorCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.operator_cap_id),
      recipient: decodeFromFieldsWithTypes('address', item.fields.recipient),
      roles: decodeFromFieldsWithTypes('u128', item.fields.roles),
    })
  }

  static fromBcs(data: Uint8Array): AddOperatorEvent {
    return AddOperatorEvent.fromFields(AddOperatorEvent.bcs.parse(data))
  }

  toJSONField(): AddOperatorEventJSONField {
    return {
      operatorCapId: this.operatorCapId,
      recipient: this.recipient,
      roles: this.roles.toString(),
    }
  }

  toJSON(): AddOperatorEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddOperatorEvent {
    return AddOperatorEvent.reified().new({
      operatorCapId: decodeFromJSONField(ID.reified(), field.operatorCapId),
      recipient: decodeFromJSONField('address', field.recipient),
      roles: decodeFromJSONField('u128', field.roles),
    })
  }

  static fromJSON(json: Record<string, any>): AddOperatorEvent {
    if (json.$typeName !== AddOperatorEvent.$typeName) {
      throw new Error(
        `not a AddOperatorEvent json object: expected '${AddOperatorEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddOperatorEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddOperatorEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddOperatorEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddOperatorEvent object`)
    }
    return AddOperatorEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddOperatorEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddOperatorEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddOperatorEvent object`)
      }

      return AddOperatorEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddOperatorEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AddOperatorEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isAddOperatorEvent(res.type)) {
      throw new Error(`object at id ${id} is not a AddOperatorEvent object`)
    }

    return AddOperatorEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== SetRolesEvent =============================== */

export function isSetRolesEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'config::SetRolesEvent')}::config::SetRolesEvent`
}

export interface SetRolesEventFields {
  member: ToField<'address'>
  roles: ToField<'u128'>
}

export type SetRolesEventReified = Reified<SetRolesEvent, SetRolesEventFields>

export type SetRolesEventJSONField = {
  member: string
  roles: string
}

export type SetRolesEventJSON = {
  $typeName: typeof SetRolesEvent.$typeName
  $typeArgs: []
} & SetRolesEventJSONField

export class SetRolesEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::SetRolesEvent` = `${
    getTypeOrigin('cetus-farming', 'config::SetRolesEvent')
  }::config::SetRolesEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SetRolesEvent.$typeName = SetRolesEvent.$typeName
  readonly $fullTypeName: `${string}::config::SetRolesEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SetRolesEvent.$isPhantom = SetRolesEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly roles: ToField<'u128'>

  private constructor(typeArgs: [], fields: SetRolesEventFields) {
    this.$fullTypeName = composeSuiType(
      SetRolesEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::SetRolesEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
    this.roles = fields.roles
  }

  static reified(): SetRolesEventReified {
    const reifiedBcs = SetRolesEvent.bcs
    return {
      typeName: SetRolesEvent.$typeName,
      fullTypeName: composeSuiType(
        SetRolesEvent.$typeName,
        ...[],
      ) as `${string}::config::SetRolesEvent`,
      typeArgs: [] as [],
      isPhantom: SetRolesEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SetRolesEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SetRolesEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SetRolesEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SetRolesEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SetRolesEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SetRolesEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SetRolesEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => SetRolesEvent.fetch(client, id),
      new: (fields: SetRolesEventFields) => {
        return new SetRolesEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SetRolesEventReified {
    return SetRolesEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetRolesEvent>> {
    return phantom(SetRolesEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SetRolesEvent>> {
    return SetRolesEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SetRolesEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      roles: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof SetRolesEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SetRolesEvent.instantiateBcs> {
    if (!SetRolesEvent.cachedBcs) {
      SetRolesEvent.cachedBcs = SetRolesEvent.instantiateBcs()
    }
    return SetRolesEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SetRolesEvent {
    return SetRolesEvent.reified().new({
      member: decodeFromFields('address', fields.member),
      roles: decodeFromFields('u128', fields.roles),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SetRolesEvent {
    if (!isSetRolesEvent(item.type)) {
      throw new Error('not a SetRolesEvent type')
    }

    return SetRolesEvent.reified().new({
      member: decodeFromFieldsWithTypes('address', item.fields.member),
      roles: decodeFromFieldsWithTypes('u128', item.fields.roles),
    })
  }

  static fromBcs(data: Uint8Array): SetRolesEvent {
    return SetRolesEvent.fromFields(SetRolesEvent.bcs.parse(data))
  }

  toJSONField(): SetRolesEventJSONField {
    return {
      member: this.member,
      roles: this.roles.toString(),
    }
  }

  toJSON(): SetRolesEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SetRolesEvent {
    return SetRolesEvent.reified().new({
      member: decodeFromJSONField('address', field.member),
      roles: decodeFromJSONField('u128', field.roles),
    })
  }

  static fromJSON(json: Record<string, any>): SetRolesEvent {
    if (json.$typeName !== SetRolesEvent.$typeName) {
      throw new Error(
        `not a SetRolesEvent json object: expected '${SetRolesEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SetRolesEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SetRolesEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSetRolesEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SetRolesEvent object`)
    }
    return SetRolesEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SetRolesEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSetRolesEvent(data.bcs.type)) {
        throw new Error(`object at is not a SetRolesEvent object`)
      }

      return SetRolesEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetRolesEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<SetRolesEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isSetRolesEvent(res.type)) {
      throw new Error(`object at id ${id} is not a SetRolesEvent object`)
    }

    return SetRolesEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== AddRoleEvent =============================== */

export function isAddRoleEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-farming', 'config::AddRoleEvent')}::config::AddRoleEvent`
}

export interface AddRoleEventFields {
  member: ToField<'address'>
  role: ToField<'u8'>
}

export type AddRoleEventReified = Reified<AddRoleEvent, AddRoleEventFields>

export type AddRoleEventJSONField = {
  member: string
  role: number
}

export type AddRoleEventJSON = {
  $typeName: typeof AddRoleEvent.$typeName
  $typeArgs: []
} & AddRoleEventJSONField

export class AddRoleEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::AddRoleEvent` = `${
    getTypeOrigin('cetus-farming', 'config::AddRoleEvent')
  }::config::AddRoleEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddRoleEvent.$typeName = AddRoleEvent.$typeName
  readonly $fullTypeName: `${string}::config::AddRoleEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddRoleEvent.$isPhantom = AddRoleEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly role: ToField<'u8'>

  private constructor(typeArgs: [], fields: AddRoleEventFields) {
    this.$fullTypeName = composeSuiType(
      AddRoleEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::AddRoleEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
    this.role = fields.role
  }

  static reified(): AddRoleEventReified {
    const reifiedBcs = AddRoleEvent.bcs
    return {
      typeName: AddRoleEvent.$typeName,
      fullTypeName: composeSuiType(
        AddRoleEvent.$typeName,
        ...[],
      ) as `${string}::config::AddRoleEvent`,
      typeArgs: [] as [],
      isPhantom: AddRoleEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddRoleEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddRoleEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddRoleEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddRoleEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddRoleEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddRoleEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddRoleEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AddRoleEvent.fetch(client, id),
      new: (fields: AddRoleEventFields) => {
        return new AddRoleEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddRoleEventReified {
    return AddRoleEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddRoleEvent>> {
    return phantom(AddRoleEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddRoleEvent>> {
    return AddRoleEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddRoleEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      role: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddRoleEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddRoleEvent.instantiateBcs> {
    if (!AddRoleEvent.cachedBcs) {
      AddRoleEvent.cachedBcs = AddRoleEvent.instantiateBcs()
    }
    return AddRoleEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddRoleEvent {
    return AddRoleEvent.reified().new({
      member: decodeFromFields('address', fields.member),
      role: decodeFromFields('u8', fields.role),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddRoleEvent {
    if (!isAddRoleEvent(item.type)) {
      throw new Error('not a AddRoleEvent type')
    }

    return AddRoleEvent.reified().new({
      member: decodeFromFieldsWithTypes('address', item.fields.member),
      role: decodeFromFieldsWithTypes('u8', item.fields.role),
    })
  }

  static fromBcs(data: Uint8Array): AddRoleEvent {
    return AddRoleEvent.fromFields(AddRoleEvent.bcs.parse(data))
  }

  toJSONField(): AddRoleEventJSONField {
    return {
      member: this.member,
      role: this.role,
    }
  }

  toJSON(): AddRoleEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddRoleEvent {
    return AddRoleEvent.reified().new({
      member: decodeFromJSONField('address', field.member),
      role: decodeFromJSONField('u8', field.role),
    })
  }

  static fromJSON(json: Record<string, any>): AddRoleEvent {
    if (json.$typeName !== AddRoleEvent.$typeName) {
      throw new Error(
        `not a AddRoleEvent json object: expected '${AddRoleEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddRoleEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddRoleEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddRoleEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddRoleEvent object`)
    }
    return AddRoleEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddRoleEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddRoleEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddRoleEvent object`)
      }

      return AddRoleEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddRoleEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AddRoleEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isAddRoleEvent(res.type)) {
      throw new Error(`object at id ${id} is not a AddRoleEvent object`)
    }

    return AddRoleEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== RemoveRoleEvent =============================== */

export function isRemoveRoleEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'config::RemoveRoleEvent')}::config::RemoveRoleEvent`
}

export interface RemoveRoleEventFields {
  member: ToField<'address'>
  role: ToField<'u8'>
}

export type RemoveRoleEventReified = Reified<RemoveRoleEvent, RemoveRoleEventFields>

export type RemoveRoleEventJSONField = {
  member: string
  role: number
}

export type RemoveRoleEventJSON = {
  $typeName: typeof RemoveRoleEvent.$typeName
  $typeArgs: []
} & RemoveRoleEventJSONField

export class RemoveRoleEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::RemoveRoleEvent` = `${
    getTypeOrigin('cetus-farming', 'config::RemoveRoleEvent')
  }::config::RemoveRoleEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveRoleEvent.$typeName = RemoveRoleEvent.$typeName
  readonly $fullTypeName: `${string}::config::RemoveRoleEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveRoleEvent.$isPhantom = RemoveRoleEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly role: ToField<'u8'>

  private constructor(typeArgs: [], fields: RemoveRoleEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveRoleEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::RemoveRoleEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
    this.role = fields.role
  }

  static reified(): RemoveRoleEventReified {
    const reifiedBcs = RemoveRoleEvent.bcs
    return {
      typeName: RemoveRoleEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveRoleEvent.$typeName,
        ...[],
      ) as `${string}::config::RemoveRoleEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveRoleEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveRoleEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RemoveRoleEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveRoleEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveRoleEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveRoleEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RemoveRoleEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RemoveRoleEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => RemoveRoleEvent.fetch(client, id),
      new: (fields: RemoveRoleEventFields) => {
        return new RemoveRoleEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveRoleEventReified {
    return RemoveRoleEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveRoleEvent>> {
    return phantom(RemoveRoleEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveRoleEvent>> {
    return RemoveRoleEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveRoleEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      role: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveRoleEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RemoveRoleEvent.instantiateBcs> {
    if (!RemoveRoleEvent.cachedBcs) {
      RemoveRoleEvent.cachedBcs = RemoveRoleEvent.instantiateBcs()
    }
    return RemoveRoleEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveRoleEvent {
    return RemoveRoleEvent.reified().new({
      member: decodeFromFields('address', fields.member),
      role: decodeFromFields('u8', fields.role),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveRoleEvent {
    if (!isRemoveRoleEvent(item.type)) {
      throw new Error('not a RemoveRoleEvent type')
    }

    return RemoveRoleEvent.reified().new({
      member: decodeFromFieldsWithTypes('address', item.fields.member),
      role: decodeFromFieldsWithTypes('u8', item.fields.role),
    })
  }

  static fromBcs(data: Uint8Array): RemoveRoleEvent {
    return RemoveRoleEvent.fromFields(RemoveRoleEvent.bcs.parse(data))
  }

  toJSONField(): RemoveRoleEventJSONField {
    return {
      member: this.member,
      role: this.role,
    }
  }

  toJSON(): RemoveRoleEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveRoleEvent {
    return RemoveRoleEvent.reified().new({
      member: decodeFromJSONField('address', field.member),
      role: decodeFromJSONField('u8', field.role),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveRoleEvent {
    if (json.$typeName !== RemoveRoleEvent.$typeName) {
      throw new Error(
        `not a RemoveRoleEvent json object: expected '${RemoveRoleEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveRoleEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveRoleEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveRoleEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RemoveRoleEvent object`)
    }
    return RemoveRoleEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveRoleEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveRoleEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveRoleEvent object`)
      }

      return RemoveRoleEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveRoleEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<RemoveRoleEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isRemoveRoleEvent(res.type)) {
      throw new Error(`object at id ${id} is not a RemoveRoleEvent object`)
    }

    return RemoveRoleEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== RemoveMemberEvent =============================== */

export function isRemoveMemberEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'config::RemoveMemberEvent')}::config::RemoveMemberEvent`
}

export interface RemoveMemberEventFields {
  member: ToField<'address'>
}

export type RemoveMemberEventReified = Reified<RemoveMemberEvent, RemoveMemberEventFields>

export type RemoveMemberEventJSONField = {
  member: string
}

export type RemoveMemberEventJSON = {
  $typeName: typeof RemoveMemberEvent.$typeName
  $typeArgs: []
} & RemoveMemberEventJSONField

export class RemoveMemberEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::RemoveMemberEvent` = `${
    getTypeOrigin('cetus-farming', 'config::RemoveMemberEvent')
  }::config::RemoveMemberEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveMemberEvent.$typeName = RemoveMemberEvent.$typeName
  readonly $fullTypeName: `${string}::config::RemoveMemberEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveMemberEvent.$isPhantom = RemoveMemberEvent.$isPhantom

  readonly member: ToField<'address'>

  private constructor(typeArgs: [], fields: RemoveMemberEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveMemberEvent.$typeName,
      ...typeArgs,
    ) as `${string}::config::RemoveMemberEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
  }

  static reified(): RemoveMemberEventReified {
    const reifiedBcs = RemoveMemberEvent.bcs
    return {
      typeName: RemoveMemberEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveMemberEvent.$typeName,
        ...[],
      ) as `${string}::config::RemoveMemberEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveMemberEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveMemberEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RemoveMemberEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveMemberEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveMemberEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveMemberEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RemoveMemberEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RemoveMemberEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => RemoveMemberEvent.fetch(client, id),
      new: (fields: RemoveMemberEventFields) => {
        return new RemoveMemberEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveMemberEventReified {
    return RemoveMemberEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveMemberEvent>> {
    return phantom(RemoveMemberEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveMemberEvent>> {
    return RemoveMemberEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveMemberEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveMemberEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RemoveMemberEvent.instantiateBcs> {
    if (!RemoveMemberEvent.cachedBcs) {
      RemoveMemberEvent.cachedBcs = RemoveMemberEvent.instantiateBcs()
    }
    return RemoveMemberEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveMemberEvent {
    return RemoveMemberEvent.reified().new({
      member: decodeFromFields('address', fields.member),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveMemberEvent {
    if (!isRemoveMemberEvent(item.type)) {
      throw new Error('not a RemoveMemberEvent type')
    }

    return RemoveMemberEvent.reified().new({
      member: decodeFromFieldsWithTypes('address', item.fields.member),
    })
  }

  static fromBcs(data: Uint8Array): RemoveMemberEvent {
    return RemoveMemberEvent.fromFields(RemoveMemberEvent.bcs.parse(data))
  }

  toJSONField(): RemoveMemberEventJSONField {
    return {
      member: this.member,
    }
  }

  toJSON(): RemoveMemberEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveMemberEvent {
    return RemoveMemberEvent.reified().new({
      member: decodeFromJSONField('address', field.member),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveMemberEvent {
    if (json.$typeName !== RemoveMemberEvent.$typeName) {
      throw new Error(
        `not a RemoveMemberEvent json object: expected '${RemoveMemberEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveMemberEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveMemberEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveMemberEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RemoveMemberEvent object`)
    }
    return RemoveMemberEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveMemberEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveMemberEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveMemberEvent object`)
      }

      return RemoveMemberEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveMemberEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<RemoveMemberEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isRemoveMemberEvent(res.type)) {
      throw new Error(`object at id ${id} is not a RemoveMemberEvent object`)
    }

    return RemoveMemberEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== SetPackageVersion =============================== */

export function isSetPackageVersion(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-farming', 'config::SetPackageVersion')}::config::SetPackageVersion`
}

export interface SetPackageVersionFields {
  newVersion: ToField<'u64'>
  oldVersion: ToField<'u64'>
}

export type SetPackageVersionReified = Reified<SetPackageVersion, SetPackageVersionFields>

export type SetPackageVersionJSONField = {
  newVersion: string
  oldVersion: string
}

export type SetPackageVersionJSON = {
  $typeName: typeof SetPackageVersion.$typeName
  $typeArgs: []
} & SetPackageVersionJSONField

export class SetPackageVersion implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::config::SetPackageVersion` = `${
    getTypeOrigin('cetus-farming', 'config::SetPackageVersion')
  }::config::SetPackageVersion` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SetPackageVersion.$typeName = SetPackageVersion.$typeName
  readonly $fullTypeName: `${string}::config::SetPackageVersion`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SetPackageVersion.$isPhantom = SetPackageVersion.$isPhantom

  readonly newVersion: ToField<'u64'>
  readonly oldVersion: ToField<'u64'>

  private constructor(typeArgs: [], fields: SetPackageVersionFields) {
    this.$fullTypeName = composeSuiType(
      SetPackageVersion.$typeName,
      ...typeArgs,
    ) as `${string}::config::SetPackageVersion`
    this.$typeArgs = typeArgs

    this.newVersion = fields.newVersion
    this.oldVersion = fields.oldVersion
  }

  static reified(): SetPackageVersionReified {
    const reifiedBcs = SetPackageVersion.bcs
    return {
      typeName: SetPackageVersion.$typeName,
      fullTypeName: composeSuiType(
        SetPackageVersion.$typeName,
        ...[],
      ) as `${string}::config::SetPackageVersion`,
      typeArgs: [] as [],
      isPhantom: SetPackageVersion.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SetPackageVersion.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SetPackageVersion.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SetPackageVersion.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SetPackageVersion.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SetPackageVersion.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SetPackageVersion.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SetPackageVersion.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => SetPackageVersion.fetch(client, id),
      new: (fields: SetPackageVersionFields) => {
        return new SetPackageVersion([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SetPackageVersionReified {
    return SetPackageVersion.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetPackageVersion>> {
    return phantom(SetPackageVersion.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SetPackageVersion>> {
    return SetPackageVersion.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SetPackageVersion', {
      new_version: bcs.u64(),
      old_version: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SetPackageVersion.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SetPackageVersion.instantiateBcs> {
    if (!SetPackageVersion.cachedBcs) {
      SetPackageVersion.cachedBcs = SetPackageVersion.instantiateBcs()
    }
    return SetPackageVersion.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SetPackageVersion {
    return SetPackageVersion.reified().new({
      newVersion: decodeFromFields('u64', fields.new_version),
      oldVersion: decodeFromFields('u64', fields.old_version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SetPackageVersion {
    if (!isSetPackageVersion(item.type)) {
      throw new Error('not a SetPackageVersion type')
    }

    return SetPackageVersion.reified().new({
      newVersion: decodeFromFieldsWithTypes('u64', item.fields.new_version),
      oldVersion: decodeFromFieldsWithTypes('u64', item.fields.old_version),
    })
  }

  static fromBcs(data: Uint8Array): SetPackageVersion {
    return SetPackageVersion.fromFields(SetPackageVersion.bcs.parse(data))
  }

  toJSONField(): SetPackageVersionJSONField {
    return {
      newVersion: this.newVersion.toString(),
      oldVersion: this.oldVersion.toString(),
    }
  }

  toJSON(): SetPackageVersionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SetPackageVersion {
    return SetPackageVersion.reified().new({
      newVersion: decodeFromJSONField('u64', field.newVersion),
      oldVersion: decodeFromJSONField('u64', field.oldVersion),
    })
  }

  static fromJSON(json: Record<string, any>): SetPackageVersion {
    if (json.$typeName !== SetPackageVersion.$typeName) {
      throw new Error(
        `not a SetPackageVersion json object: expected '${SetPackageVersion.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SetPackageVersion.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SetPackageVersion {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSetPackageVersion(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SetPackageVersion object`)
    }
    return SetPackageVersion.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SetPackageVersion {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSetPackageVersion(data.bcs.type)) {
        throw new Error(`object at is not a SetPackageVersion object`)
      }

      return SetPackageVersion.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetPackageVersion.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<SetPackageVersion> {
    const res = await fetchObjectBcs(client, id)
    if (!isSetPackageVersion(res.type)) {
      throw new Error(`object at id ${id} is not a SetPackageVersion object`)
    }

    return SetPackageVersion.fromBcs(res.bcsBytes)
  }
}
