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
import { ID, UID } from '../../../../sui/object/structs'
import { Table } from '../../../../sui/table/structs'
import { ACL } from '../acl/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::AdminCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AdminCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::config::AdminCap`,
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
      fetch: async (client: SuiClient, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AdminCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified())
  }
  static get p() {
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
    return AdminCap.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({ id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return AdminCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AdminCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AdminCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAdminCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }

    return AdminCap.fromSuiObjectData(res.data)
  }
}

/* ============================== OperatorCap =============================== */

export function isOperatorCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::OperatorCap`
}

export interface OperatorCapFields {
  id: ToField<UID>
}

export type OperatorCapReified = Reified<OperatorCap, OperatorCapFields>

export class OperatorCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::OperatorCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = OperatorCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::OperatorCap`
  readonly $typeArgs: []
  readonly $isPhantom = OperatorCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: OperatorCapFields) {
    this.$fullTypeName = composeSuiType(
      OperatorCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::OperatorCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): OperatorCapReified {
    const reifiedBcs = OperatorCap.bcs
    return {
      typeName: OperatorCap.$typeName,
      fullTypeName: composeSuiType(
        OperatorCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::config::OperatorCap`,
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
      fetch: async (client: SuiClient, id: string) => OperatorCap.fetch(client, id),
      new: (fields: OperatorCapFields) => {
        return new OperatorCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OperatorCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OperatorCap>> {
    return phantom(OperatorCap.reified())
  }
  static get p() {
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
    return OperatorCap.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
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

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OperatorCap {
    return OperatorCap.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): OperatorCap {
    if (json.$typeName !== OperatorCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return OperatorCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OperatorCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<OperatorCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching OperatorCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isOperatorCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a OperatorCap object`)
    }

    return OperatorCap.fromSuiObjectData(res.data)
  }
}

/* ============================== GlobalConfig =============================== */

export function isGlobalConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::GlobalConfig`
}

export interface GlobalConfigFields {
  id: ToField<UID>
  acl: ToField<ACL>
  accelerationFactor: ToField<Table<ToPhantom<ID>, 'u8'>>
  packageVersion: ToField<'u64'>
}

export type GlobalConfigReified = Reified<GlobalConfig, GlobalConfigFields>

export class GlobalConfig implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::GlobalConfig`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = GlobalConfig.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::GlobalConfig`
  readonly $typeArgs: []
  readonly $isPhantom = GlobalConfig.$isPhantom

  readonly id: ToField<UID>
  readonly acl: ToField<ACL>
  readonly accelerationFactor: ToField<Table<ToPhantom<ID>, 'u8'>>
  readonly packageVersion: ToField<'u64'>

  private constructor(typeArgs: [], fields: GlobalConfigFields) {
    this.$fullTypeName = composeSuiType(
      GlobalConfig.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::GlobalConfig`
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
        ...[]
      ) as `${typeof PKG_V1}::config::GlobalConfig`,
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
      fetch: async (client: SuiClient, id: string) => GlobalConfig.fetch(client, id),
      new: (fields: GlobalConfigFields) => {
        return new GlobalConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return GlobalConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GlobalConfig>> {
    return phantom(GlobalConfig.reified())
  }
  static get p() {
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
        Table.reified(reified.phantom(ID.reified()), reified.phantom('u8')),
        fields.acceleration_factor
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
        Table.reified(reified.phantom(ID.reified()), reified.phantom('u8')),
        item.fields.acceleration_factor
      ),
      packageVersion: decodeFromFieldsWithTypes('u64', item.fields.package_version),
    })
  }

  static fromBcs(data: Uint8Array): GlobalConfig {
    return GlobalConfig.fromFields(GlobalConfig.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      acl: this.acl.toJSONField(),
      accelerationFactor: this.accelerationFactor.toJSONField(),
      packageVersion: this.packageVersion.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GlobalConfig {
    return GlobalConfig.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      acl: decodeFromJSONField(ACL.reified(), field.acl),
      accelerationFactor: decodeFromJSONField(
        Table.reified(reified.phantom(ID.reified()), reified.phantom('u8')),
        field.accelerationFactor
      ),
      packageVersion: decodeFromJSONField('u64', field.packageVersion),
    })
  }

  static fromJSON(json: Record<string, any>): GlobalConfig {
    if (json.$typeName !== GlobalConfig.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return GlobalConfig.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GlobalConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<GlobalConfig> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching GlobalConfig object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isGlobalConfig(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a GlobalConfig object`)
    }

    return GlobalConfig.fromSuiObjectData(res.data)
  }
}

/* ============================== InitConfigEvent =============================== */

export function isInitConfigEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::InitConfigEvent`
}

export interface InitConfigEventFields {
  adminCapId: ToField<ID>
  globalConfigId: ToField<ID>
}

export type InitConfigEventReified = Reified<InitConfigEvent, InitConfigEventFields>

export class InitConfigEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::InitConfigEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InitConfigEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::InitConfigEvent`
  readonly $typeArgs: []
  readonly $isPhantom = InitConfigEvent.$isPhantom

  readonly adminCapId: ToField<ID>
  readonly globalConfigId: ToField<ID>

  private constructor(typeArgs: [], fields: InitConfigEventFields) {
    this.$fullTypeName = composeSuiType(
      InitConfigEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::InitConfigEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::config::InitConfigEvent`,
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
      fetch: async (client: SuiClient, id: string) => InitConfigEvent.fetch(client, id),
      new: (fields: InitConfigEventFields) => {
        return new InitConfigEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InitConfigEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InitConfigEvent>> {
    return phantom(InitConfigEvent.reified())
  }
  static get p() {
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

  toJSONField() {
    return {
      adminCapId: this.adminCapId,
      globalConfigId: this.globalConfigId,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return InitConfigEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InitConfigEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InitConfigEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching InitConfigEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isInitConfigEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a InitConfigEvent object`)
    }

    return InitConfigEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AddOperatorEvent =============================== */

export function isAddOperatorEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::AddOperatorEvent`
}

export interface AddOperatorEventFields {
  operatorCapId: ToField<ID>
  recipient: ToField<'address'>
  roles: ToField<'u128'>
}

export type AddOperatorEventReified = Reified<AddOperatorEvent, AddOperatorEventFields>

export class AddOperatorEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::AddOperatorEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddOperatorEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::AddOperatorEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddOperatorEvent.$isPhantom

  readonly operatorCapId: ToField<ID>
  readonly recipient: ToField<'address'>
  readonly roles: ToField<'u128'>

  private constructor(typeArgs: [], fields: AddOperatorEventFields) {
    this.$fullTypeName = composeSuiType(
      AddOperatorEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::AddOperatorEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::config::AddOperatorEvent`,
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
      fetch: async (client: SuiClient, id: string) => AddOperatorEvent.fetch(client, id),
      new: (fields: AddOperatorEventFields) => {
        return new AddOperatorEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddOperatorEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddOperatorEvent>> {
    return phantom(AddOperatorEvent.reified())
  }
  static get p() {
    return AddOperatorEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddOperatorEvent', {
      operator_cap_id: ID.bcs,
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
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

  toJSONField() {
    return {
      operatorCapId: this.operatorCapId,
      recipient: this.recipient,
      roles: this.roles.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return AddOperatorEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddOperatorEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddOperatorEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddOperatorEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddOperatorEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddOperatorEvent object`)
    }

    return AddOperatorEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== SetRolesEvent =============================== */

export function isSetRolesEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::SetRolesEvent`
}

export interface SetRolesEventFields {
  member: ToField<'address'>
  roles: ToField<'u128'>
}

export type SetRolesEventReified = Reified<SetRolesEvent, SetRolesEventFields>

export class SetRolesEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::SetRolesEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SetRolesEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::SetRolesEvent`
  readonly $typeArgs: []
  readonly $isPhantom = SetRolesEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly roles: ToField<'u128'>

  private constructor(typeArgs: [], fields: SetRolesEventFields) {
    this.$fullTypeName = composeSuiType(
      SetRolesEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::SetRolesEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::config::SetRolesEvent`,
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
      fetch: async (client: SuiClient, id: string) => SetRolesEvent.fetch(client, id),
      new: (fields: SetRolesEventFields) => {
        return new SetRolesEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SetRolesEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetRolesEvent>> {
    return phantom(SetRolesEvent.reified())
  }
  static get p() {
    return SetRolesEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SetRolesEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
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

  toJSONField() {
    return {
      member: this.member,
      roles: this.roles.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return SetRolesEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetRolesEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SetRolesEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SetRolesEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSetRolesEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SetRolesEvent object`)
    }

    return SetRolesEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AddRoleEvent =============================== */

export function isAddRoleEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::AddRoleEvent`
}

export interface AddRoleEventFields {
  member: ToField<'address'>
  role: ToField<'u8'>
}

export type AddRoleEventReified = Reified<AddRoleEvent, AddRoleEventFields>

export class AddRoleEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::AddRoleEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddRoleEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::AddRoleEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddRoleEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly role: ToField<'u8'>

  private constructor(typeArgs: [], fields: AddRoleEventFields) {
    this.$fullTypeName = composeSuiType(
      AddRoleEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::AddRoleEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::config::AddRoleEvent`,
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
      fetch: async (client: SuiClient, id: string) => AddRoleEvent.fetch(client, id),
      new: (fields: AddRoleEventFields) => {
        return new AddRoleEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddRoleEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddRoleEvent>> {
    return phantom(AddRoleEvent.reified())
  }
  static get p() {
    return AddRoleEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddRoleEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
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

  toJSONField() {
    return {
      member: this.member,
      role: this.role,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return AddRoleEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddRoleEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddRoleEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddRoleEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddRoleEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddRoleEvent object`)
    }

    return AddRoleEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RemoveRoleEvent =============================== */

export function isRemoveRoleEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::RemoveRoleEvent`
}

export interface RemoveRoleEventFields {
  member: ToField<'address'>
  role: ToField<'u8'>
}

export type RemoveRoleEventReified = Reified<RemoveRoleEvent, RemoveRoleEventFields>

export class RemoveRoleEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::RemoveRoleEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RemoveRoleEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::RemoveRoleEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RemoveRoleEvent.$isPhantom

  readonly member: ToField<'address'>
  readonly role: ToField<'u8'>

  private constructor(typeArgs: [], fields: RemoveRoleEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveRoleEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::RemoveRoleEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::config::RemoveRoleEvent`,
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
      fetch: async (client: SuiClient, id: string) => RemoveRoleEvent.fetch(client, id),
      new: (fields: RemoveRoleEventFields) => {
        return new RemoveRoleEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RemoveRoleEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveRoleEvent>> {
    return phantom(RemoveRoleEvent.reified())
  }
  static get p() {
    return RemoveRoleEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveRoleEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
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

  toJSONField() {
    return {
      member: this.member,
      role: this.role,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return RemoveRoleEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveRoleEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RemoveRoleEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RemoveRoleEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRemoveRoleEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RemoveRoleEvent object`)
    }

    return RemoveRoleEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RemoveMemberEvent =============================== */

export function isRemoveMemberEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::RemoveMemberEvent`
}

export interface RemoveMemberEventFields {
  member: ToField<'address'>
}

export type RemoveMemberEventReified = Reified<RemoveMemberEvent, RemoveMemberEventFields>

export class RemoveMemberEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::RemoveMemberEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RemoveMemberEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::RemoveMemberEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RemoveMemberEvent.$isPhantom

  readonly member: ToField<'address'>

  private constructor(typeArgs: [], fields: RemoveMemberEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveMemberEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::RemoveMemberEvent`
    this.$typeArgs = typeArgs

    this.member = fields.member
  }

  static reified(): RemoveMemberEventReified {
    const reifiedBcs = RemoveMemberEvent.bcs
    return {
      typeName: RemoveMemberEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveMemberEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::config::RemoveMemberEvent`,
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
      fetch: async (client: SuiClient, id: string) => RemoveMemberEvent.fetch(client, id),
      new: (fields: RemoveMemberEventFields) => {
        return new RemoveMemberEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RemoveMemberEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveMemberEvent>> {
    return phantom(RemoveMemberEvent.reified())
  }
  static get p() {
    return RemoveMemberEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveMemberEvent', {
      member: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
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
    return RemoveMemberEvent.reified().new({ member: decodeFromFields('address', fields.member) })
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

  toJSONField() {
    return {
      member: this.member,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveMemberEvent {
    return RemoveMemberEvent.reified().new({ member: decodeFromJSONField('address', field.member) })
  }

  static fromJSON(json: Record<string, any>): RemoveMemberEvent {
    if (json.$typeName !== RemoveMemberEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return RemoveMemberEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveMemberEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RemoveMemberEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RemoveMemberEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRemoveMemberEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RemoveMemberEvent object`)
    }

    return RemoveMemberEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== SetPackageVersion =============================== */

export function isSetPackageVersion(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::config::SetPackageVersion`
}

export interface SetPackageVersionFields {
  newVersion: ToField<'u64'>
  oldVersion: ToField<'u64'>
}

export type SetPackageVersionReified = Reified<SetPackageVersion, SetPackageVersionFields>

export class SetPackageVersion implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::config::SetPackageVersion`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SetPackageVersion.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::config::SetPackageVersion`
  readonly $typeArgs: []
  readonly $isPhantom = SetPackageVersion.$isPhantom

  readonly newVersion: ToField<'u64'>
  readonly oldVersion: ToField<'u64'>

  private constructor(typeArgs: [], fields: SetPackageVersionFields) {
    this.$fullTypeName = composeSuiType(
      SetPackageVersion.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::config::SetPackageVersion`
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
        ...[]
      ) as `${typeof PKG_V1}::config::SetPackageVersion`,
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
      fetch: async (client: SuiClient, id: string) => SetPackageVersion.fetch(client, id),
      new: (fields: SetPackageVersionFields) => {
        return new SetPackageVersion([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SetPackageVersion.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetPackageVersion>> {
    return phantom(SetPackageVersion.reified())
  }
  static get p() {
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

  toJSONField() {
    return {
      newVersion: this.newVersion.toString(),
      oldVersion: this.oldVersion.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return SetPackageVersion.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetPackageVersion.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SetPackageVersion> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SetPackageVersion object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSetPackageVersion(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SetPackageVersion object`)
    }

    return SetPackageVersion.fromSuiObjectData(res.data)
  }
}
