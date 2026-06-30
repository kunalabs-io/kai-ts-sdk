/**
 * Collection for managing heterogeneous debt share balances.
 *
 * This module provides a type-safe collection that can store debt shares for multiple
 * asset types and share types simultaneously. It enforces a one-to-one mapping between
 * asset types and their corresponding share types: for any asset type `T`, there can be
 * only a single associated debt share type `ST`, and vice versa. This ensures type-level
 * consistency and prevents ambiguous or conflicting associations between assets and shares.
 *
 * Key properties:
 * - Enforces a unique mapping between each asset type and its share type (bijective mapping)
 * - Validates type consistency to prevent mismatched operations
 * - Supports partial and full withdrawals by share type
 * - Tracks total amounts for efficient queries
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { TypeName } from '../../std/type-name/structs'
import { Bag } from '../../sui/bag/structs'
import { UID } from '../../sui/object/structs'

/* ============================== Info =============================== */

export function isInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-leverage', 'debt_bag::Info')}::debt_bag::Info`
}

export interface InfoFields {
  assetType: ToField<TypeName>
  shareType: ToField<TypeName>
  amount: ToField<'u128'>
}

export type InfoReified = Reified<Info, InfoFields>

export type InfoJSONField = {
  assetType: string
  shareType: string
  amount: string
}

export type InfoJSON = {
  $typeName: typeof Info.$typeName
  $typeArgs: []
} & InfoJSONField

/** Internal info about shares stored per asset/share type. */
export class Info implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::debt_bag::Info` {
    return `${getTypeOrigin('kai-leverage', 'debt_bag::Info')}::debt_bag::Info` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Info.$typeName = Info.$typeName
  readonly $fullTypeName: `${string}::debt_bag::Info`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Info.$isPhantom = Info.$isPhantom

  readonly assetType: ToField<TypeName>
  readonly shareType: ToField<TypeName>
  readonly amount: ToField<'u128'>

  private constructor(typeArgs: [], fields: InfoFields) {
    this.$fullTypeName = composeSuiType(
      Info.$typeName,
      ...typeArgs,
    ) as `${string}::debt_bag::Info`
    this.$typeArgs = typeArgs

    this.assetType = fields.assetType
    this.shareType = fields.shareType
    this.amount = fields.amount
  }

  static reified(): InfoReified {
    const reifiedBcs = Info.bcs
    return {
      get typeName() {
        return Info.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Info.$typeName,
          ...[],
        ) as `${string}::debt_bag::Info`
      },
      typeArgs: [] as [],
      isPhantom: Info.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Info.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Info.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Info.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Info.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Info.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Info.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Info.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Info.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Info.fetch(client, id),
      new: (fields: InfoFields) => {
        return new Info([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): InfoReified {
    return Info.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Info>> {
    return phantom(Info.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Info>> {
    return Info.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Info', {
      asset_type: TypeName.bcs,
      share_type: TypeName.bcs,
      amount: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof Info.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Info.instantiateBcs> {
    if (!Info.cachedBcs) {
      Info.cachedBcs = Info.instantiateBcs()
    }
    return Info.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Info {
    return Info.reified().new({
      assetType: decodeFromFields(TypeName.reified(), fields.asset_type),
      shareType: decodeFromFields(TypeName.reified(), fields.share_type),
      amount: decodeFromFields('u128', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Info {
    if (!isInfo(item.type)) {
      throw new Error('not a Info type')
    }

    return Info.reified().new({
      assetType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset_type),
      shareType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.share_type),
      amount: decodeFromFieldsWithTypes('u128', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): Info {
    return Info.fromFields(Info.bcs.parse(data))
  }

  toJSONField(): InfoJSONField {
    return {
      assetType: this.assetType,
      shareType: this.shareType,
      amount: this.amount.toString(),
    }
  }

  toJSON(): InfoJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Info {
    return Info.reified().new({
      assetType: decodeFromJSONField(TypeName.reified(), field.assetType),
      shareType: decodeFromJSONField(TypeName.reified(), field.shareType),
      amount: decodeFromJSONField('u128', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): Info {
    if (json.$typeName !== Info.$typeName) {
      throw new Error(
        `not a Info json object: expected '${Info.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Info.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Info {
    if (!isInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Info object`)
    }
    return Info.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Info.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Info {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Info object`)
    }
    return Info.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Info.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Info {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInfo(data.bcs.type)) {
        throw new Error(`object at is not a Info object`)
      }

      return Info.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Info.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Info> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isInfo(object.type)) {
      throw new Error(`object at id ${id} is not a Info object`)
    }
    return Info.fromBcs(object.content)
  }
}

/* ============================== DebtBag =============================== */

export function isDebtBag(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-leverage', 'debt_bag::DebtBag')}::debt_bag::DebtBag`
}

export interface DebtBagFields {
  id: ToField<UID>
  infos: ToField<Vector<Info>>
  bag: ToField<Bag>
}

export type DebtBagReified = Reified<DebtBag, DebtBagFields>

export type DebtBagJSONField = {
  id: string
  infos: ToJSON<Info>[]
  bag: ToJSON<Bag>
}

export type DebtBagJSON = {
  $typeName: typeof DebtBag.$typeName
  $typeArgs: []
} & DebtBagJSONField

/** Collection of debt shares for multiple facilities and share types. */
export class DebtBag implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::debt_bag::DebtBag` {
    return `${getTypeOrigin('kai-leverage', 'debt_bag::DebtBag')}::debt_bag::DebtBag` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DebtBag.$typeName = DebtBag.$typeName
  readonly $fullTypeName: `${string}::debt_bag::DebtBag`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DebtBag.$isPhantom = DebtBag.$isPhantom

  readonly id: ToField<UID>
  readonly infos: ToField<Vector<Info>>
  readonly bag: ToField<Bag>

  private constructor(typeArgs: [], fields: DebtBagFields) {
    this.$fullTypeName = composeSuiType(
      DebtBag.$typeName,
      ...typeArgs,
    ) as `${string}::debt_bag::DebtBag`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.infos = fields.infos
    this.bag = fields.bag
  }

  static reified(): DebtBagReified {
    const reifiedBcs = DebtBag.bcs
    return {
      get typeName() {
        return DebtBag.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DebtBag.$typeName,
          ...[],
        ) as `${string}::debt_bag::DebtBag`
      },
      typeArgs: [] as [],
      isPhantom: DebtBag.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DebtBag.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtBag.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DebtBag.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DebtBag.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DebtBag.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DebtBag.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DebtBag.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DebtBag.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DebtBag.fetch(client, id),
      new: (fields: DebtBagFields) => {
        return new DebtBag([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DebtBagReified {
    return DebtBag.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DebtBag>> {
    return phantom(DebtBag.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DebtBag>> {
    return DebtBag.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DebtBag', {
      id: UID.bcs,
      infos: bcs.vector(Info.bcs),
      bag: Bag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DebtBag.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DebtBag.instantiateBcs> {
    if (!DebtBag.cachedBcs) {
      DebtBag.cachedBcs = DebtBag.instantiateBcs()
    }
    return DebtBag.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DebtBag {
    return DebtBag.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      infos: decodeFromFields(vector(Info.reified()), fields.infos),
      bag: decodeFromFields(Bag.reified(), fields.bag),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DebtBag {
    if (!isDebtBag(item.type)) {
      throw new Error('not a DebtBag type')
    }

    return DebtBag.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      infos: decodeFromFieldsWithTypes(vector(Info.reified()), item.fields.infos),
      bag: decodeFromFieldsWithTypes(Bag.reified(), item.fields.bag),
    })
  }

  static fromBcs(data: Uint8Array): DebtBag {
    return DebtBag.fromFields(DebtBag.bcs.parse(data))
  }

  toJSONField(): DebtBagJSONField {
    return {
      id: this.id,
      infos: fieldToJSON<Vector<Info>>(`vector<${Info.$typeName}>`, this.infos),
      bag: this.bag.toJSONField(),
    }
  }

  toJSON(): DebtBagJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DebtBag {
    return DebtBag.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      infos: decodeFromJSONField(vector(Info.reified()), field.infos),
      bag: decodeFromJSONField(Bag.reified(), field.bag),
    })
  }

  static fromJSON(json: Record<string, any>): DebtBag {
    if (json.$typeName !== DebtBag.$typeName) {
      throw new Error(
        `not a DebtBag json object: expected '${DebtBag.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DebtBag.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DebtBag {
    if (!isDebtBag(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DebtBag object`)
    }
    return DebtBag.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DebtBag.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DebtBag {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtBag(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtBag object`)
    }
    return DebtBag.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DebtBag.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DebtBag {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtBag(data.bcs.type)) {
        throw new Error(`object at is not a DebtBag object`)
      }

      return DebtBag.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtBag.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DebtBag> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDebtBag(object.type)) {
      throw new Error(`object at id ${id} is not a DebtBag object`)
    }
    return DebtBag.fromBcs(object.content)
  }
}

/* ============================== Key =============================== */

export function isKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-leverage', 'debt_bag::Key')}::debt_bag::Key`
}

export interface KeyFields {
  t: ToField<TypeName>
  st: ToField<TypeName>
}

export type KeyReified = Reified<Key, KeyFields>

export type KeyJSONField = {
  t: string
  st: string
}

export type KeyJSON = {
  $typeName: typeof Key.$typeName
  $typeArgs: []
} & KeyJSONField

export class Key implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::debt_bag::Key` {
    return `${getTypeOrigin('kai-leverage', 'debt_bag::Key')}::debt_bag::Key` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Key.$typeName = Key.$typeName
  readonly $fullTypeName: `${string}::debt_bag::Key`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Key.$isPhantom = Key.$isPhantom

  readonly t: ToField<TypeName>
  readonly st: ToField<TypeName>

  private constructor(typeArgs: [], fields: KeyFields) {
    this.$fullTypeName = composeSuiType(
      Key.$typeName,
      ...typeArgs,
    ) as `${string}::debt_bag::Key`
    this.$typeArgs = typeArgs

    this.t = fields.t
    this.st = fields.st
  }

  static reified(): KeyReified {
    const reifiedBcs = Key.bcs
    return {
      get typeName() {
        return Key.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Key.$typeName,
          ...[],
        ) as `${string}::debt_bag::Key`
      },
      typeArgs: [] as [],
      isPhantom: Key.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Key.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Key.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Key.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Key.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Key.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Key.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Key.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Key.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Key.fetch(client, id),
      new: (fields: KeyFields) => {
        return new Key([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): KeyReified {
    return Key.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Key>> {
    return phantom(Key.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Key>> {
    return Key.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Key', {
      t: TypeName.bcs,
      st: TypeName.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Key.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Key.instantiateBcs> {
    if (!Key.cachedBcs) {
      Key.cachedBcs = Key.instantiateBcs()
    }
    return Key.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Key {
    return Key.reified().new({
      t: decodeFromFields(TypeName.reified(), fields.t),
      st: decodeFromFields(TypeName.reified(), fields.st),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Key {
    if (!isKey(item.type)) {
      throw new Error('not a Key type')
    }

    return Key.reified().new({
      t: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.t),
      st: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.st),
    })
  }

  static fromBcs(data: Uint8Array): Key {
    return Key.fromFields(Key.bcs.parse(data))
  }

  toJSONField(): KeyJSONField {
    return {
      t: this.t,
      st: this.st,
    }
  }

  toJSON(): KeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Key {
    return Key.reified().new({
      t: decodeFromJSONField(TypeName.reified(), field.t),
      st: decodeFromJSONField(TypeName.reified(), field.st),
    })
  }

  static fromJSON(json: Record<string, any>): Key {
    if (json.$typeName !== Key.$typeName) {
      throw new Error(
        `not a Key json object: expected '${Key.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Key.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Key {
    if (!isKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Key object`)
    }
    return Key.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Key.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Key {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Key object`)
    }
    return Key.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Key.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Key {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKey(data.bcs.type)) {
        throw new Error(`object at is not a Key object`)
      }

      return Key.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Key.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Key> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isKey(object.type)) {
      throw new Error(`object at id ${id} is not a Key object`)
    }
    return Key.fromBcs(object.content)
  }
}
