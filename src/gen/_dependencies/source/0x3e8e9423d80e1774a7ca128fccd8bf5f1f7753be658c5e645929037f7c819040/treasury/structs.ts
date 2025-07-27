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
  fieldToJSON,
  phantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { Bag } from '../../../../sui/bag/structs'
import { DenyCapV2, TreasuryCap } from '../../../../sui/coin/structs'
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== ControlledTreasury =============================== */

export function isControlledTreasury(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::treasury::ControlledTreasury` + '<')
}

export interface ControlledTreasuryFields<T0 extends PhantomTypeArgument> {
  id: ToField<UID>
  adminCount: ToField<'u8'>
  treasuryCap: ToField<TreasuryCap<T0>>
  denyCap: ToField<DenyCapV2<T0>>
  roles: ToField<Bag>
}

export type ControlledTreasuryReified<T0 extends PhantomTypeArgument> = Reified<
  ControlledTreasury<T0>,
  ControlledTreasuryFields<T0>
>

export class ControlledTreasury<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::treasury::ControlledTreasury`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = ControlledTreasury.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::treasury::ControlledTreasury<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = ControlledTreasury.$isPhantom

  readonly id: ToField<UID>
  readonly adminCount: ToField<'u8'>
  readonly treasuryCap: ToField<TreasuryCap<T0>>
  readonly denyCap: ToField<DenyCapV2<T0>>
  readonly roles: ToField<Bag>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: ControlledTreasuryFields<T0>) {
    this.$fullTypeName = composeSuiType(
      ControlledTreasury.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::treasury::ControlledTreasury<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.adminCount = fields.adminCount
    this.treasuryCap = fields.treasuryCap
    this.denyCap = fields.denyCap
    this.roles = fields.roles
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): ControlledTreasuryReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = ControlledTreasury.bcs
    return {
      typeName: ControlledTreasury.$typeName,
      fullTypeName: composeSuiType(
        ControlledTreasury.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::treasury::ControlledTreasury<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: ControlledTreasury.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => ControlledTreasury.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ControlledTreasury.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => ControlledTreasury.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ControlledTreasury.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => ControlledTreasury.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ControlledTreasury.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ControlledTreasury.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => ControlledTreasury.fetch(client, T0, id),
      new: (fields: ControlledTreasuryFields<ToPhantomTypeArgument<T0>>) => {
        return new ControlledTreasury([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ControlledTreasury.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<ControlledTreasury<ToPhantomTypeArgument<T0>>>> {
    return phantom(ControlledTreasury.reified(T0))
  }
  static get p() {
    return ControlledTreasury.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('ControlledTreasury', {
      id: UID.bcs,
      admin_count: bcs.u8(),
      treasury_cap: TreasuryCap.bcs,
      deny_cap: DenyCapV2.bcs,
      roles: Bag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ControlledTreasury.instantiateBcs> | null = null

  static get bcs() {
    if (!ControlledTreasury.cachedBcs) {
      ControlledTreasury.cachedBcs = ControlledTreasury.instantiateBcs()
    }
    return ControlledTreasury.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): ControlledTreasury<ToPhantomTypeArgument<T0>> {
    return ControlledTreasury.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      adminCount: decodeFromFields('u8', fields.admin_count),
      treasuryCap: decodeFromFields(TreasuryCap.reified(typeArg), fields.treasury_cap),
      denyCap: decodeFromFields(DenyCapV2.reified(typeArg), fields.deny_cap),
      roles: decodeFromFields(Bag.reified(), fields.roles),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): ControlledTreasury<ToPhantomTypeArgument<T0>> {
    if (!isControlledTreasury(item.type)) {
      throw new Error('not a ControlledTreasury type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return ControlledTreasury.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      adminCount: decodeFromFieldsWithTypes('u8', item.fields.admin_count),
      treasuryCap: decodeFromFieldsWithTypes(
        TreasuryCap.reified(typeArg),
        item.fields.treasury_cap
      ),
      denyCap: decodeFromFieldsWithTypes(DenyCapV2.reified(typeArg), item.fields.deny_cap),
      roles: decodeFromFieldsWithTypes(Bag.reified(), item.fields.roles),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): ControlledTreasury<ToPhantomTypeArgument<T0>> {
    return ControlledTreasury.fromFields(typeArg, ControlledTreasury.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      adminCount: this.adminCount,
      treasuryCap: this.treasuryCap.toJSONField(),
      denyCap: this.denyCap.toJSONField(),
      roles: this.roles.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): ControlledTreasury<ToPhantomTypeArgument<T0>> {
    return ControlledTreasury.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      adminCount: decodeFromJSONField('u8', field.adminCount),
      treasuryCap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.treasuryCap),
      denyCap: decodeFromJSONField(DenyCapV2.reified(typeArg), field.denyCap),
      roles: decodeFromJSONField(Bag.reified(), field.roles),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): ControlledTreasury<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== ControlledTreasury.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(ControlledTreasury.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return ControlledTreasury.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): ControlledTreasury<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isControlledTreasury(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ControlledTreasury object`)
    }
    return ControlledTreasury.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): ControlledTreasury<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isControlledTreasury(data.bcs.type)) {
        throw new Error(`object at is not a ControlledTreasury object`)
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

      return ControlledTreasury.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ControlledTreasury.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<ControlledTreasury<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ControlledTreasury object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isControlledTreasury(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ControlledTreasury object`)
    }

    return ControlledTreasury.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::treasury::AdminCap`
}

export interface AdminCapFields {
  dummyField: ToField<'bool'>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::treasury::AdminCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AdminCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::treasury::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom = AdminCap.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::treasury::AdminCap`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::treasury::AdminCap`,
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
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AdminCap.instantiateBcs> | null = null

  static get bcs() {
    if (!AdminCap.cachedBcs) {
      AdminCap.cachedBcs = AdminCap.instantiateBcs()
    }
    return AdminCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
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

/* ============================== MinterCap =============================== */

export function isMinterCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::treasury::MinterCap`
}

export interface MinterCapFields {
  limit: ToField<'u64'>
  epoch: ToField<'u64'>
  left: ToField<'u64'>
}

export type MinterCapReified = Reified<MinterCap, MinterCapFields>

export class MinterCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::treasury::MinterCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = MinterCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::treasury::MinterCap`
  readonly $typeArgs: []
  readonly $isPhantom = MinterCap.$isPhantom

  readonly limit: ToField<'u64'>
  readonly epoch: ToField<'u64'>
  readonly left: ToField<'u64'>

  private constructor(typeArgs: [], fields: MinterCapFields) {
    this.$fullTypeName = composeSuiType(
      MinterCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::treasury::MinterCap`
    this.$typeArgs = typeArgs

    this.limit = fields.limit
    this.epoch = fields.epoch
    this.left = fields.left
  }

  static reified(): MinterCapReified {
    const reifiedBcs = MinterCap.bcs
    return {
      typeName: MinterCap.$typeName,
      fullTypeName: composeSuiType(
        MinterCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::treasury::MinterCap`,
      typeArgs: [] as [],
      isPhantom: MinterCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MinterCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MinterCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MinterCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MinterCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MinterCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => MinterCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MinterCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => MinterCap.fetch(client, id),
      new: (fields: MinterCapFields) => {
        return new MinterCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return MinterCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MinterCap>> {
    return phantom(MinterCap.reified())
  }
  static get p() {
    return MinterCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('MinterCap', {
      limit: bcs.u64(),
      epoch: bcs.u64(),
      left: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof MinterCap.instantiateBcs> | null = null

  static get bcs() {
    if (!MinterCap.cachedBcs) {
      MinterCap.cachedBcs = MinterCap.instantiateBcs()
    }
    return MinterCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): MinterCap {
    return MinterCap.reified().new({
      limit: decodeFromFields('u64', fields.limit),
      epoch: decodeFromFields('u64', fields.epoch),
      left: decodeFromFields('u64', fields.left),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MinterCap {
    if (!isMinterCap(item.type)) {
      throw new Error('not a MinterCap type')
    }

    return MinterCap.reified().new({
      limit: decodeFromFieldsWithTypes('u64', item.fields.limit),
      epoch: decodeFromFieldsWithTypes('u64', item.fields.epoch),
      left: decodeFromFieldsWithTypes('u64', item.fields.left),
    })
  }

  static fromBcs(data: Uint8Array): MinterCap {
    return MinterCap.fromFields(MinterCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      limit: this.limit.toString(),
      epoch: this.epoch.toString(),
      left: this.left.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): MinterCap {
    return MinterCap.reified().new({
      limit: decodeFromJSONField('u64', field.limit),
      epoch: decodeFromJSONField('u64', field.epoch),
      left: decodeFromJSONField('u64', field.left),
    })
  }

  static fromJSON(json: Record<string, any>): MinterCap {
    if (json.$typeName !== MinterCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return MinterCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): MinterCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMinterCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MinterCap object`)
    }
    return MinterCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): MinterCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMinterCap(data.bcs.type)) {
        throw new Error(`object at is not a MinterCap object`)
      }

      return MinterCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MinterCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<MinterCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching MinterCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isMinterCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a MinterCap object`)
    }

    return MinterCap.fromSuiObjectData(res.data)
  }
}

/* ============================== PauserCap =============================== */

export function isPauserCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::treasury::PauserCap`
}

export interface PauserCapFields {
  dummyField: ToField<'bool'>
}

export type PauserCapReified = Reified<PauserCap, PauserCapFields>

export class PauserCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::treasury::PauserCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PauserCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::treasury::PauserCap`
  readonly $typeArgs: []
  readonly $isPhantom = PauserCap.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: PauserCapFields) {
    this.$fullTypeName = composeSuiType(
      PauserCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::treasury::PauserCap`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): PauserCapReified {
    const reifiedBcs = PauserCap.bcs
    return {
      typeName: PauserCap.$typeName,
      fullTypeName: composeSuiType(
        PauserCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::treasury::PauserCap`,
      typeArgs: [] as [],
      isPhantom: PauserCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PauserCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PauserCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PauserCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PauserCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PauserCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PauserCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PauserCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PauserCap.fetch(client, id),
      new: (fields: PauserCapFields) => {
        return new PauserCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PauserCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PauserCap>> {
    return phantom(PauserCap.reified())
  }
  static get p() {
    return PauserCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PauserCap', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof PauserCap.instantiateBcs> | null = null

  static get bcs() {
    if (!PauserCap.cachedBcs) {
      PauserCap.cachedBcs = PauserCap.instantiateBcs()
    }
    return PauserCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PauserCap {
    return PauserCap.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PauserCap {
    if (!isPauserCap(item.type)) {
      throw new Error('not a PauserCap type')
    }

    return PauserCap.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): PauserCap {
    return PauserCap.fromFields(PauserCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PauserCap {
    return PauserCap.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): PauserCap {
    if (json.$typeName !== PauserCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PauserCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PauserCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPauserCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PauserCap object`)
    }
    return PauserCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PauserCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPauserCap(data.bcs.type)) {
        throw new Error(`object at is not a PauserCap object`)
      }

      return PauserCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PauserCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PauserCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PauserCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPauserCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PauserCap object`)
    }

    return PauserCap.fromSuiObjectData(res.data)
  }
}

/* ============================== MintEvent =============================== */

export function isMintEvent(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::treasury::MintEvent` + '<')
}

export interface MintEventFields<T0 extends PhantomTypeArgument> {
  amount: ToField<'u64'>
  to: ToField<'address'>
  txId: ToField<Vector<'u8'>>
  index: ToField<'u32'>
}

export type MintEventReified<T0 extends PhantomTypeArgument> = Reified<
  MintEvent<T0>,
  MintEventFields<T0>
>

export class MintEvent<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::treasury::MintEvent`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = MintEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::treasury::MintEvent<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = MintEvent.$isPhantom

  readonly amount: ToField<'u64'>
  readonly to: ToField<'address'>
  readonly txId: ToField<Vector<'u8'>>
  readonly index: ToField<'u32'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MintEventFields<T0>) {
    this.$fullTypeName = composeSuiType(
      MintEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::treasury::MintEvent<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
    this.to = fields.to
    this.txId = fields.txId
    this.index = fields.index
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): MintEventReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = MintEvent.bcs
    return {
      typeName: MintEvent.$typeName,
      fullTypeName: composeSuiType(
        MintEvent.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::treasury::MintEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: MintEvent.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => MintEvent.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MintEvent.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => MintEvent.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MintEvent.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => MintEvent.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => MintEvent.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => MintEvent.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => MintEvent.fetch(client, T0, id),
      new: (fields: MintEventFields<ToPhantomTypeArgument<T0>>) => {
        return new MintEvent([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return MintEvent.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<MintEvent<ToPhantomTypeArgument<T0>>>> {
    return phantom(MintEvent.reified(T0))
  }
  static get p() {
    return MintEvent.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('MintEvent', {
      amount: bcs.u64(),
      to: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      tx_id: bcs.vector(bcs.u8()),
      index: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof MintEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!MintEvent.cachedBcs) {
      MintEvent.cachedBcs = MintEvent.instantiateBcs()
    }
    return MintEvent.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): MintEvent<ToPhantomTypeArgument<T0>> {
    return MintEvent.reified(typeArg).new({
      amount: decodeFromFields('u64', fields.amount),
      to: decodeFromFields('address', fields.to),
      txId: decodeFromFields(reified.vector('u8'), fields.tx_id),
      index: decodeFromFields('u32', fields.index),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): MintEvent<ToPhantomTypeArgument<T0>> {
    if (!isMintEvent(item.type)) {
      throw new Error('not a MintEvent type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return MintEvent.reified(typeArg).new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      to: decodeFromFieldsWithTypes('address', item.fields.to),
      txId: decodeFromFieldsWithTypes(reified.vector('u8'), item.fields.tx_id),
      index: decodeFromFieldsWithTypes('u32', item.fields.index),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): MintEvent<ToPhantomTypeArgument<T0>> {
    return MintEvent.fromFields(typeArg, MintEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      amount: this.amount.toString(),
      to: this.to,
      txId: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.txId),
      index: this.index,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): MintEvent<ToPhantomTypeArgument<T0>> {
    return MintEvent.reified(typeArg).new({
      amount: decodeFromJSONField('u64', field.amount),
      to: decodeFromJSONField('address', field.to),
      txId: decodeFromJSONField(reified.vector('u8'), field.txId),
      index: decodeFromJSONField('u32', field.index),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): MintEvent<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== MintEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(MintEvent.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return MintEvent.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): MintEvent<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMintEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MintEvent object`)
    }
    return MintEvent.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): MintEvent<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMintEvent(data.bcs.type)) {
        throw new Error(`object at is not a MintEvent object`)
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

      return MintEvent.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MintEvent.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<MintEvent<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching MintEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isMintEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a MintEvent object`)
    }

    return MintEvent.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== BurnEvent =============================== */

export function isBurnEvent(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::treasury::BurnEvent` + '<')
}

export interface BurnEventFields<T0 extends PhantomTypeArgument> {
  amount: ToField<'u64'>
  from: ToField<'address'>
}

export type BurnEventReified<T0 extends PhantomTypeArgument> = Reified<
  BurnEvent<T0>,
  BurnEventFields<T0>
>

export class BurnEvent<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::treasury::BurnEvent`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = BurnEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::treasury::BurnEvent<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = BurnEvent.$isPhantom

  readonly amount: ToField<'u64'>
  readonly from: ToField<'address'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: BurnEventFields<T0>) {
    this.$fullTypeName = composeSuiType(
      BurnEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::treasury::BurnEvent<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
    this.from = fields.from
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): BurnEventReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = BurnEvent.bcs
    return {
      typeName: BurnEvent.$typeName,
      fullTypeName: composeSuiType(
        BurnEvent.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::treasury::BurnEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: BurnEvent.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => BurnEvent.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BurnEvent.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => BurnEvent.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BurnEvent.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => BurnEvent.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => BurnEvent.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => BurnEvent.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => BurnEvent.fetch(client, T0, id),
      new: (fields: BurnEventFields<ToPhantomTypeArgument<T0>>) => {
        return new BurnEvent([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BurnEvent.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<BurnEvent<ToPhantomTypeArgument<T0>>>> {
    return phantom(BurnEvent.reified(T0))
  }
  static get p() {
    return BurnEvent.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('BurnEvent', {
      amount: bcs.u64(),
      from: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof BurnEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!BurnEvent.cachedBcs) {
      BurnEvent.cachedBcs = BurnEvent.instantiateBcs()
    }
    return BurnEvent.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): BurnEvent<ToPhantomTypeArgument<T0>> {
    return BurnEvent.reified(typeArg).new({
      amount: decodeFromFields('u64', fields.amount),
      from: decodeFromFields('address', fields.from),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): BurnEvent<ToPhantomTypeArgument<T0>> {
    if (!isBurnEvent(item.type)) {
      throw new Error('not a BurnEvent type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return BurnEvent.reified(typeArg).new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      from: decodeFromFieldsWithTypes('address', item.fields.from),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): BurnEvent<ToPhantomTypeArgument<T0>> {
    return BurnEvent.fromFields(typeArg, BurnEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      amount: this.amount.toString(),
      from: this.from,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): BurnEvent<ToPhantomTypeArgument<T0>> {
    return BurnEvent.reified(typeArg).new({
      amount: decodeFromJSONField('u64', field.amount),
      from: decodeFromJSONField('address', field.from),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): BurnEvent<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== BurnEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BurnEvent.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return BurnEvent.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): BurnEvent<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBurnEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BurnEvent object`)
    }
    return BurnEvent.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): BurnEvent<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBurnEvent(data.bcs.type)) {
        throw new Error(`object at is not a BurnEvent object`)
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

      return BurnEvent.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BurnEvent.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<BurnEvent<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BurnEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBurnEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BurnEvent object`)
    }

    return BurnEvent.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== RoleKey =============================== */

export function isRoleKey(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::treasury::RoleKey` + '<')
}

export interface RoleKeyFields<T0 extends PhantomTypeArgument> {
  owner: ToField<'address'>
}

export type RoleKeyReified<T0 extends PhantomTypeArgument> = Reified<RoleKey<T0>, RoleKeyFields<T0>>

export class RoleKey<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::treasury::RoleKey`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = RoleKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::treasury::RoleKey<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = RoleKey.$isPhantom

  readonly owner: ToField<'address'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RoleKeyFields<T0>) {
    this.$fullTypeName = composeSuiType(
      RoleKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::treasury::RoleKey<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.owner = fields.owner
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): RoleKeyReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = RoleKey.bcs
    return {
      typeName: RoleKey.$typeName,
      fullTypeName: composeSuiType(
        RoleKey.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::treasury::RoleKey<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: RoleKey.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => RoleKey.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RoleKey.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => RoleKey.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RoleKey.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => RoleKey.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => RoleKey.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => RoleKey.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => RoleKey.fetch(client, T0, id),
      new: (fields: RoleKeyFields<ToPhantomTypeArgument<T0>>) => {
        return new RoleKey([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RoleKey.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<RoleKey<ToPhantomTypeArgument<T0>>>> {
    return phantom(RoleKey.reified(T0))
  }
  static get p() {
    return RoleKey.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('RoleKey', {
      owner: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof RoleKey.instantiateBcs> | null = null

  static get bcs() {
    if (!RoleKey.cachedBcs) {
      RoleKey.cachedBcs = RoleKey.instantiateBcs()
    }
    return RoleKey.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): RoleKey<ToPhantomTypeArgument<T0>> {
    return RoleKey.reified(typeArg).new({ owner: decodeFromFields('address', fields.owner) })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): RoleKey<ToPhantomTypeArgument<T0>> {
    if (!isRoleKey(item.type)) {
      throw new Error('not a RoleKey type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return RoleKey.reified(typeArg).new({
      owner: decodeFromFieldsWithTypes('address', item.fields.owner),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): RoleKey<ToPhantomTypeArgument<T0>> {
    return RoleKey.fromFields(typeArg, RoleKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      owner: this.owner,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): RoleKey<ToPhantomTypeArgument<T0>> {
    return RoleKey.reified(typeArg).new({ owner: decodeFromJSONField('address', field.owner) })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): RoleKey<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== RoleKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RoleKey.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return RoleKey.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): RoleKey<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRoleKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RoleKey object`)
    }
    return RoleKey.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): RoleKey<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRoleKey(data.bcs.type)) {
        throw new Error(`object at is not a RoleKey object`)
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

      return RoleKey.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RoleKey.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<RoleKey<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RoleKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRoleKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RoleKey object`)
    }

    return RoleKey.fromSuiObjectData(typeArg, res.data)
  }
}
