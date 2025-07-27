import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { ID, UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { TwoStepRole } from '../two-step-role/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== UpgradeService =============================== */

export function isUpgradeService(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::upgrade_service::UpgradeService` + '<')
}

export interface UpgradeServiceFields<T extends PhantomTypeArgument> {
  id: ToField<UID>
  admin: ToField<TwoStepRole<ToPhantom<AdminRole<T>>>>
}

export type UpgradeServiceReified<T extends PhantomTypeArgument> = Reified<
  UpgradeService<T>,
  UpgradeServiceFields<T>
>

export class UpgradeService<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeService`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = UpgradeService.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeService<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = UpgradeService.$isPhantom

  readonly id: ToField<UID>
  readonly admin: ToField<TwoStepRole<ToPhantom<AdminRole<T>>>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: UpgradeServiceFields<T>) {
    this.$fullTypeName = composeSuiType(
      UpgradeService.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::upgrade_service::UpgradeService<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.admin = fields.admin
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): UpgradeServiceReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = UpgradeService.bcs
    return {
      typeName: UpgradeService.$typeName,
      fullTypeName: composeSuiType(
        UpgradeService.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::upgrade_service::UpgradeService<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: UpgradeService.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => UpgradeService.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeService.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => UpgradeService.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpgradeService.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => UpgradeService.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => UpgradeService.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => UpgradeService.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => UpgradeService.fetch(client, T, id),
      new: (fields: UpgradeServiceFields<ToPhantomTypeArgument<T>>) => {
        return new UpgradeService([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpgradeService.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<UpgradeService<ToPhantomTypeArgument<T>>>> {
    return phantom(UpgradeService.reified(T))
  }
  static get p() {
    return UpgradeService.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('UpgradeService', {
      id: UID.bcs,
      admin: TwoStepRole.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof UpgradeService.instantiateBcs> | null = null

  static get bcs() {
    if (!UpgradeService.cachedBcs) {
      UpgradeService.cachedBcs = UpgradeService.instantiateBcs()
    }
    return UpgradeService.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): UpgradeService<ToPhantomTypeArgument<T>> {
    return UpgradeService.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      admin: decodeFromFields(
        TwoStepRole.reified(reified.phantom(AdminRole.reified(typeArg))),
        fields.admin
      ),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): UpgradeService<ToPhantomTypeArgument<T>> {
    if (!isUpgradeService(item.type)) {
      throw new Error('not a UpgradeService type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return UpgradeService.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      admin: decodeFromFieldsWithTypes(
        TwoStepRole.reified(reified.phantom(AdminRole.reified(typeArg))),
        item.fields.admin
      ),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): UpgradeService<ToPhantomTypeArgument<T>> {
    return UpgradeService.fromFields(typeArg, UpgradeService.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      admin: this.admin.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): UpgradeService<ToPhantomTypeArgument<T>> {
    return UpgradeService.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      admin: decodeFromJSONField(
        TwoStepRole.reified(reified.phantom(AdminRole.reified(typeArg))),
        field.admin
      ),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): UpgradeService<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== UpgradeService.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(UpgradeService.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return UpgradeService.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): UpgradeService<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpgradeService(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpgradeService object`)
    }
    return UpgradeService.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): UpgradeService<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpgradeService(data.bcs.type)) {
        throw new Error(`object at is not a UpgradeService object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return UpgradeService.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpgradeService.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<UpgradeService<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching UpgradeService object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUpgradeService(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UpgradeService object`)
    }

    return UpgradeService.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== UpgradeCapKey =============================== */

export function isUpgradeCapKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::upgrade_service::UpgradeCapKey`
}

export interface UpgradeCapKeyFields {
  dummyField: ToField<'bool'>
}

export type UpgradeCapKeyReified = Reified<UpgradeCapKey, UpgradeCapKeyFields>

export class UpgradeCapKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeCapKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = UpgradeCapKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeCapKey`
  readonly $typeArgs: []
  readonly $isPhantom = UpgradeCapKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: UpgradeCapKeyFields) {
    this.$fullTypeName = composeSuiType(
      UpgradeCapKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): UpgradeCapKeyReified {
    const reifiedBcs = UpgradeCapKey.bcs
    return {
      typeName: UpgradeCapKey.$typeName,
      fullTypeName: composeSuiType(
        UpgradeCapKey.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapKey`,
      typeArgs: [] as [],
      isPhantom: UpgradeCapKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpgradeCapKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeCapKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpgradeCapKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpgradeCapKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpgradeCapKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => UpgradeCapKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpgradeCapKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => UpgradeCapKey.fetch(client, id),
      new: (fields: UpgradeCapKeyFields) => {
        return new UpgradeCapKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpgradeCapKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpgradeCapKey>> {
    return phantom(UpgradeCapKey.reified())
  }
  static get p() {
    return UpgradeCapKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpgradeCapKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpgradeCapKey.instantiateBcs> | null = null

  static get bcs() {
    if (!UpgradeCapKey.cachedBcs) {
      UpgradeCapKey.cachedBcs = UpgradeCapKey.instantiateBcs()
    }
    return UpgradeCapKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpgradeCapKey {
    return UpgradeCapKey.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpgradeCapKey {
    if (!isUpgradeCapKey(item.type)) {
      throw new Error('not a UpgradeCapKey type')
    }

    return UpgradeCapKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): UpgradeCapKey {
    return UpgradeCapKey.fromFields(UpgradeCapKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpgradeCapKey {
    return UpgradeCapKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): UpgradeCapKey {
    if (json.$typeName !== UpgradeCapKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return UpgradeCapKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpgradeCapKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpgradeCapKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpgradeCapKey object`)
    }
    return UpgradeCapKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpgradeCapKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpgradeCapKey(data.bcs.type)) {
        throw new Error(`object at is not a UpgradeCapKey object`)
      }

      return UpgradeCapKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpgradeCapKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<UpgradeCapKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching UpgradeCapKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUpgradeCapKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UpgradeCapKey object`)
    }

    return UpgradeCapKey.fromSuiObjectData(res.data)
  }
}

/* ============================== AdminRole =============================== */

export function isAdminRole(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::upgrade_service::AdminRole` + '<')
}

export interface AdminRoleFields<T extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type AdminRoleReified<T extends PhantomTypeArgument> = Reified<
  AdminRole<T>,
  AdminRoleFields<T>
>

export class AdminRole<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::upgrade_service::AdminRole`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = AdminRole.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::AdminRole<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = AdminRole.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: AdminRoleFields<T>) {
    this.$fullTypeName = composeSuiType(
      AdminRole.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::upgrade_service::AdminRole<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): AdminRoleReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = AdminRole.bcs
    return {
      typeName: AdminRole.$typeName,
      fullTypeName: composeSuiType(
        AdminRole.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::upgrade_service::AdminRole<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: AdminRole.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => AdminRole.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminRole.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => AdminRole.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminRole.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => AdminRole.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => AdminRole.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => AdminRole.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => AdminRole.fetch(client, T, id),
      new: (fields: AdminRoleFields<ToPhantomTypeArgument<T>>) => {
        return new AdminRole([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AdminRole.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<AdminRole<ToPhantomTypeArgument<T>>>> {
    return phantom(AdminRole.reified(T))
  }
  static get p() {
    return AdminRole.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('AdminRole', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AdminRole.instantiateBcs> | null = null

  static get bcs() {
    if (!AdminRole.cachedBcs) {
      AdminRole.cachedBcs = AdminRole.instantiateBcs()
    }
    return AdminRole.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): AdminRole<ToPhantomTypeArgument<T>> {
    return AdminRole.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): AdminRole<ToPhantomTypeArgument<T>> {
    if (!isAdminRole(item.type)) {
      throw new Error('not a AdminRole type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return AdminRole.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): AdminRole<ToPhantomTypeArgument<T>> {
    return AdminRole.fromFields(typeArg, AdminRole.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): AdminRole<ToPhantomTypeArgument<T>> {
    return AdminRole.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): AdminRole<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== AdminRole.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(AdminRole.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return AdminRole.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): AdminRole<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminRole(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminRole object`)
    }
    return AdminRole.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): AdminRole<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminRole(data.bcs.type)) {
        throw new Error(`object at is not a AdminRole object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return AdminRole.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminRole.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<AdminRole<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AdminRole object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAdminRole(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AdminRole object`)
    }

    return AdminRole.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== UpgradeCapDeposited =============================== */

export function isUpgradeCapDeposited(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::upgrade_service::UpgradeCapDeposited` + '<')
}

export interface UpgradeCapDepositedFields<T extends PhantomTypeArgument> {
  upgradeCapId: ToField<ID>
}

export type UpgradeCapDepositedReified<T extends PhantomTypeArgument> = Reified<
  UpgradeCapDeposited<T>,
  UpgradeCapDepositedFields<T>
>

export class UpgradeCapDeposited<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeCapDeposited`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = UpgradeCapDeposited.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeCapDeposited<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = UpgradeCapDeposited.$isPhantom

  readonly upgradeCapId: ToField<ID>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: UpgradeCapDepositedFields<T>) {
    this.$fullTypeName = composeSuiType(
      UpgradeCapDeposited.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapDeposited<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.upgradeCapId = fields.upgradeCapId
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): UpgradeCapDepositedReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = UpgradeCapDeposited.bcs
    return {
      typeName: UpgradeCapDeposited.$typeName,
      fullTypeName: composeSuiType(
        UpgradeCapDeposited.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapDeposited<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: UpgradeCapDeposited.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => UpgradeCapDeposited.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpgradeCapDeposited.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => UpgradeCapDeposited.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpgradeCapDeposited.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => UpgradeCapDeposited.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpgradeCapDeposited.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpgradeCapDeposited.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => UpgradeCapDeposited.fetch(client, T, id),
      new: (fields: UpgradeCapDepositedFields<ToPhantomTypeArgument<T>>) => {
        return new UpgradeCapDeposited([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpgradeCapDeposited.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<UpgradeCapDeposited<ToPhantomTypeArgument<T>>>> {
    return phantom(UpgradeCapDeposited.reified(T))
  }
  static get p() {
    return UpgradeCapDeposited.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('UpgradeCapDeposited', {
      upgrade_cap_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof UpgradeCapDeposited.instantiateBcs> | null = null

  static get bcs() {
    if (!UpgradeCapDeposited.cachedBcs) {
      UpgradeCapDeposited.cachedBcs = UpgradeCapDeposited.instantiateBcs()
    }
    return UpgradeCapDeposited.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): UpgradeCapDeposited<ToPhantomTypeArgument<T>> {
    return UpgradeCapDeposited.reified(typeArg).new({
      upgradeCapId: decodeFromFields(ID.reified(), fields.upgrade_cap_id),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): UpgradeCapDeposited<ToPhantomTypeArgument<T>> {
    if (!isUpgradeCapDeposited(item.type)) {
      throw new Error('not a UpgradeCapDeposited type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return UpgradeCapDeposited.reified(typeArg).new({
      upgradeCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.upgrade_cap_id),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): UpgradeCapDeposited<ToPhantomTypeArgument<T>> {
    return UpgradeCapDeposited.fromFields(typeArg, UpgradeCapDeposited.bcs.parse(data))
  }

  toJSONField() {
    return {
      upgradeCapId: this.upgradeCapId,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): UpgradeCapDeposited<ToPhantomTypeArgument<T>> {
    return UpgradeCapDeposited.reified(typeArg).new({
      upgradeCapId: decodeFromJSONField(ID.reified(), field.upgradeCapId),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): UpgradeCapDeposited<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== UpgradeCapDeposited.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(UpgradeCapDeposited.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return UpgradeCapDeposited.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): UpgradeCapDeposited<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpgradeCapDeposited(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpgradeCapDeposited object`)
    }
    return UpgradeCapDeposited.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): UpgradeCapDeposited<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpgradeCapDeposited(data.bcs.type)) {
        throw new Error(`object at is not a UpgradeCapDeposited object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return UpgradeCapDeposited.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpgradeCapDeposited.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<UpgradeCapDeposited<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching UpgradeCapDeposited object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUpgradeCapDeposited(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UpgradeCapDeposited object`)
    }

    return UpgradeCapDeposited.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== UpgradeCapExtracted =============================== */

export function isUpgradeCapExtracted(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::upgrade_service::UpgradeCapExtracted` + '<')
}

export interface UpgradeCapExtractedFields<T extends PhantomTypeArgument> {
  upgradeCapId: ToField<ID>
}

export type UpgradeCapExtractedReified<T extends PhantomTypeArgument> = Reified<
  UpgradeCapExtracted<T>,
  UpgradeCapExtractedFields<T>
>

export class UpgradeCapExtracted<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeCapExtracted`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = UpgradeCapExtracted.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeCapExtracted<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = UpgradeCapExtracted.$isPhantom

  readonly upgradeCapId: ToField<ID>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: UpgradeCapExtractedFields<T>) {
    this.$fullTypeName = composeSuiType(
      UpgradeCapExtracted.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapExtracted<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.upgradeCapId = fields.upgradeCapId
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): UpgradeCapExtractedReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = UpgradeCapExtracted.bcs
    return {
      typeName: UpgradeCapExtracted.$typeName,
      fullTypeName: composeSuiType(
        UpgradeCapExtracted.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapExtracted<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: UpgradeCapExtracted.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => UpgradeCapExtracted.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpgradeCapExtracted.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => UpgradeCapExtracted.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpgradeCapExtracted.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => UpgradeCapExtracted.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpgradeCapExtracted.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpgradeCapExtracted.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => UpgradeCapExtracted.fetch(client, T, id),
      new: (fields: UpgradeCapExtractedFields<ToPhantomTypeArgument<T>>) => {
        return new UpgradeCapExtracted([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpgradeCapExtracted.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<UpgradeCapExtracted<ToPhantomTypeArgument<T>>>> {
    return phantom(UpgradeCapExtracted.reified(T))
  }
  static get p() {
    return UpgradeCapExtracted.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('UpgradeCapExtracted', {
      upgrade_cap_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof UpgradeCapExtracted.instantiateBcs> | null = null

  static get bcs() {
    if (!UpgradeCapExtracted.cachedBcs) {
      UpgradeCapExtracted.cachedBcs = UpgradeCapExtracted.instantiateBcs()
    }
    return UpgradeCapExtracted.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): UpgradeCapExtracted<ToPhantomTypeArgument<T>> {
    return UpgradeCapExtracted.reified(typeArg).new({
      upgradeCapId: decodeFromFields(ID.reified(), fields.upgrade_cap_id),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): UpgradeCapExtracted<ToPhantomTypeArgument<T>> {
    if (!isUpgradeCapExtracted(item.type)) {
      throw new Error('not a UpgradeCapExtracted type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return UpgradeCapExtracted.reified(typeArg).new({
      upgradeCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.upgrade_cap_id),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): UpgradeCapExtracted<ToPhantomTypeArgument<T>> {
    return UpgradeCapExtracted.fromFields(typeArg, UpgradeCapExtracted.bcs.parse(data))
  }

  toJSONField() {
    return {
      upgradeCapId: this.upgradeCapId,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): UpgradeCapExtracted<ToPhantomTypeArgument<T>> {
    return UpgradeCapExtracted.reified(typeArg).new({
      upgradeCapId: decodeFromJSONField(ID.reified(), field.upgradeCapId),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): UpgradeCapExtracted<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== UpgradeCapExtracted.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(UpgradeCapExtracted.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return UpgradeCapExtracted.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): UpgradeCapExtracted<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpgradeCapExtracted(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpgradeCapExtracted object`)
    }
    return UpgradeCapExtracted.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): UpgradeCapExtracted<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpgradeCapExtracted(data.bcs.type)) {
        throw new Error(`object at is not a UpgradeCapExtracted object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return UpgradeCapExtracted.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpgradeCapExtracted.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<UpgradeCapExtracted<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching UpgradeCapExtracted object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUpgradeCapExtracted(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UpgradeCapExtracted object`)
    }

    return UpgradeCapExtracted.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== UpgradeServiceDestroyed =============================== */

export function isUpgradeServiceDestroyed(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::upgrade_service::UpgradeServiceDestroyed` + '<')
}

export interface UpgradeServiceDestroyedFields<T extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type UpgradeServiceDestroyedReified<T extends PhantomTypeArgument> = Reified<
  UpgradeServiceDestroyed<T>,
  UpgradeServiceDestroyedFields<T>
>

export class UpgradeServiceDestroyed<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeServiceDestroyed`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = UpgradeServiceDestroyed.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeServiceDestroyed<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = UpgradeServiceDestroyed.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: UpgradeServiceDestroyedFields<T>) {
    this.$fullTypeName = composeSuiType(
      UpgradeServiceDestroyed.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::upgrade_service::UpgradeServiceDestroyed<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): UpgradeServiceDestroyedReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = UpgradeServiceDestroyed.bcs
    return {
      typeName: UpgradeServiceDestroyed.$typeName,
      fullTypeName: composeSuiType(
        UpgradeServiceDestroyed.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::upgrade_service::UpgradeServiceDestroyed<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: UpgradeServiceDestroyed.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => UpgradeServiceDestroyed.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpgradeServiceDestroyed.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => UpgradeServiceDestroyed.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpgradeServiceDestroyed.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => UpgradeServiceDestroyed.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpgradeServiceDestroyed.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpgradeServiceDestroyed.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => UpgradeServiceDestroyed.fetch(client, T, id),
      new: (fields: UpgradeServiceDestroyedFields<ToPhantomTypeArgument<T>>) => {
        return new UpgradeServiceDestroyed([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return UpgradeServiceDestroyed.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<UpgradeServiceDestroyed<ToPhantomTypeArgument<T>>>> {
    return phantom(UpgradeServiceDestroyed.reified(T))
  }
  static get p() {
    return UpgradeServiceDestroyed.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('UpgradeServiceDestroyed', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpgradeServiceDestroyed.instantiateBcs> | null = null

  static get bcs() {
    if (!UpgradeServiceDestroyed.cachedBcs) {
      UpgradeServiceDestroyed.cachedBcs = UpgradeServiceDestroyed.instantiateBcs()
    }
    return UpgradeServiceDestroyed.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T>> {
    return UpgradeServiceDestroyed.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T>> {
    if (!isUpgradeServiceDestroyed(item.type)) {
      throw new Error('not a UpgradeServiceDestroyed type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return UpgradeServiceDestroyed.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T>> {
    return UpgradeServiceDestroyed.fromFields(typeArg, UpgradeServiceDestroyed.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T>> {
    return UpgradeServiceDestroyed.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== UpgradeServiceDestroyed.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(UpgradeServiceDestroyed.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return UpgradeServiceDestroyed.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpgradeServiceDestroyed(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpgradeServiceDestroyed object`
      )
    }
    return UpgradeServiceDestroyed.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpgradeServiceDestroyed(data.bcs.type)) {
        throw new Error(`object at is not a UpgradeServiceDestroyed object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return UpgradeServiceDestroyed.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpgradeServiceDestroyed.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<UpgradeServiceDestroyed<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching UpgradeServiceDestroyed object at id ${id}: ${res.error.code}`
      )
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isUpgradeServiceDestroyed(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a UpgradeServiceDestroyed object`)
    }

    return UpgradeServiceDestroyed.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== AuthorizeUpgrade =============================== */

export function isAuthorizeUpgrade(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::upgrade_service::AuthorizeUpgrade` + '<')
}

export interface AuthorizeUpgradeFields<T extends PhantomTypeArgument> {
  packageId: ToField<ID>
  policy: ToField<'u8'>
}

export type AuthorizeUpgradeReified<T extends PhantomTypeArgument> = Reified<
  AuthorizeUpgrade<T>,
  AuthorizeUpgradeFields<T>
>

export class AuthorizeUpgrade<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::upgrade_service::AuthorizeUpgrade`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = AuthorizeUpgrade.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::AuthorizeUpgrade<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = AuthorizeUpgrade.$isPhantom

  readonly packageId: ToField<ID>
  readonly policy: ToField<'u8'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: AuthorizeUpgradeFields<T>) {
    this.$fullTypeName = composeSuiType(
      AuthorizeUpgrade.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::upgrade_service::AuthorizeUpgrade<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.packageId = fields.packageId
    this.policy = fields.policy
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): AuthorizeUpgradeReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = AuthorizeUpgrade.bcs
    return {
      typeName: AuthorizeUpgrade.$typeName,
      fullTypeName: composeSuiType(
        AuthorizeUpgrade.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::upgrade_service::AuthorizeUpgrade<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: AuthorizeUpgrade.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => AuthorizeUpgrade.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AuthorizeUpgrade.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => AuthorizeUpgrade.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AuthorizeUpgrade.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => AuthorizeUpgrade.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => AuthorizeUpgrade.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => AuthorizeUpgrade.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => AuthorizeUpgrade.fetch(client, T, id),
      new: (fields: AuthorizeUpgradeFields<ToPhantomTypeArgument<T>>) => {
        return new AuthorizeUpgrade([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AuthorizeUpgrade.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<AuthorizeUpgrade<ToPhantomTypeArgument<T>>>> {
    return phantom(AuthorizeUpgrade.reified(T))
  }
  static get p() {
    return AuthorizeUpgrade.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('AuthorizeUpgrade', {
      package_id: ID.bcs,
      policy: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof AuthorizeUpgrade.instantiateBcs> | null = null

  static get bcs() {
    if (!AuthorizeUpgrade.cachedBcs) {
      AuthorizeUpgrade.cachedBcs = AuthorizeUpgrade.instantiateBcs()
    }
    return AuthorizeUpgrade.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): AuthorizeUpgrade<ToPhantomTypeArgument<T>> {
    return AuthorizeUpgrade.reified(typeArg).new({
      packageId: decodeFromFields(ID.reified(), fields.package_id),
      policy: decodeFromFields('u8', fields.policy),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): AuthorizeUpgrade<ToPhantomTypeArgument<T>> {
    if (!isAuthorizeUpgrade(item.type)) {
      throw new Error('not a AuthorizeUpgrade type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return AuthorizeUpgrade.reified(typeArg).new({
      packageId: decodeFromFieldsWithTypes(ID.reified(), item.fields.package_id),
      policy: decodeFromFieldsWithTypes('u8', item.fields.policy),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): AuthorizeUpgrade<ToPhantomTypeArgument<T>> {
    return AuthorizeUpgrade.fromFields(typeArg, AuthorizeUpgrade.bcs.parse(data))
  }

  toJSONField() {
    return {
      packageId: this.packageId,
      policy: this.policy,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): AuthorizeUpgrade<ToPhantomTypeArgument<T>> {
    return AuthorizeUpgrade.reified(typeArg).new({
      packageId: decodeFromJSONField(ID.reified(), field.packageId),
      policy: decodeFromJSONField('u8', field.policy),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): AuthorizeUpgrade<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== AuthorizeUpgrade.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(AuthorizeUpgrade.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return AuthorizeUpgrade.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): AuthorizeUpgrade<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAuthorizeUpgrade(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AuthorizeUpgrade object`)
    }
    return AuthorizeUpgrade.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): AuthorizeUpgrade<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAuthorizeUpgrade(data.bcs.type)) {
        throw new Error(`object at is not a AuthorizeUpgrade object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return AuthorizeUpgrade.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AuthorizeUpgrade.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<AuthorizeUpgrade<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AuthorizeUpgrade object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAuthorizeUpgrade(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AuthorizeUpgrade object`)
    }

    return AuthorizeUpgrade.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== CommitUpgrade =============================== */

export function isCommitUpgrade(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::upgrade_service::CommitUpgrade` + '<')
}

export interface CommitUpgradeFields<T extends PhantomTypeArgument> {
  packageId: ToField<ID>
}

export type CommitUpgradeReified<T extends PhantomTypeArgument> = Reified<
  CommitUpgrade<T>,
  CommitUpgradeFields<T>
>

export class CommitUpgrade<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::upgrade_service::CommitUpgrade`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = CommitUpgrade.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::CommitUpgrade<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = CommitUpgrade.$isPhantom

  readonly packageId: ToField<ID>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: CommitUpgradeFields<T>) {
    this.$fullTypeName = composeSuiType(
      CommitUpgrade.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::upgrade_service::CommitUpgrade<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.packageId = fields.packageId
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): CommitUpgradeReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = CommitUpgrade.bcs
    return {
      typeName: CommitUpgrade.$typeName,
      fullTypeName: composeSuiType(
        CommitUpgrade.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V1}::upgrade_service::CommitUpgrade<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: CommitUpgrade.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => CommitUpgrade.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CommitUpgrade.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => CommitUpgrade.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CommitUpgrade.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => CommitUpgrade.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => CommitUpgrade.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => CommitUpgrade.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => CommitUpgrade.fetch(client, T, id),
      new: (fields: CommitUpgradeFields<ToPhantomTypeArgument<T>>) => {
        return new CommitUpgrade([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CommitUpgrade.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<CommitUpgrade<ToPhantomTypeArgument<T>>>> {
    return phantom(CommitUpgrade.reified(T))
  }
  static get p() {
    return CommitUpgrade.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('CommitUpgrade', {
      package_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof CommitUpgrade.instantiateBcs> | null = null

  static get bcs() {
    if (!CommitUpgrade.cachedBcs) {
      CommitUpgrade.cachedBcs = CommitUpgrade.instantiateBcs()
    }
    return CommitUpgrade.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): CommitUpgrade<ToPhantomTypeArgument<T>> {
    return CommitUpgrade.reified(typeArg).new({
      packageId: decodeFromFields(ID.reified(), fields.package_id),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): CommitUpgrade<ToPhantomTypeArgument<T>> {
    if (!isCommitUpgrade(item.type)) {
      throw new Error('not a CommitUpgrade type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return CommitUpgrade.reified(typeArg).new({
      packageId: decodeFromFieldsWithTypes(ID.reified(), item.fields.package_id),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): CommitUpgrade<ToPhantomTypeArgument<T>> {
    return CommitUpgrade.fromFields(typeArg, CommitUpgrade.bcs.parse(data))
  }

  toJSONField() {
    return {
      packageId: this.packageId,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): CommitUpgrade<ToPhantomTypeArgument<T>> {
    return CommitUpgrade.reified(typeArg).new({
      packageId: decodeFromJSONField(ID.reified(), field.packageId),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): CommitUpgrade<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== CommitUpgrade.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(CommitUpgrade.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return CommitUpgrade.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): CommitUpgrade<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCommitUpgrade(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CommitUpgrade object`)
    }
    return CommitUpgrade.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): CommitUpgrade<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCommitUpgrade(data.bcs.type)) {
        throw new Error(`object at is not a CommitUpgrade object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return CommitUpgrade.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CommitUpgrade.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<CommitUpgrade<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching CommitUpgrade object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCommitUpgrade(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CommitUpgrade object`)
    }

    return CommitUpgrade.fromSuiObjectData(typeArg, res.data)
  }
}
