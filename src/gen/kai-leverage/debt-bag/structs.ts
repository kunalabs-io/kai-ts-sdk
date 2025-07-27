import * as reified from '../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { TypeName } from '../../move-stdlib/type-name/structs'
import { Bag } from '../../sui/bag/structs'
import { UID } from '../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Info =============================== */

export function isInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::debt_bag::Info`
}

export interface InfoFields {
  assetType: ToField<TypeName>
  shareType: ToField<TypeName>
  amount: ToField<'u128'>
}

export type InfoReified = Reified<Info, InfoFields>

export class Info implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt_bag::Info`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Info.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt_bag::Info`
  readonly $typeArgs: []
  readonly $isPhantom = Info.$isPhantom

  readonly assetType: ToField<TypeName>
  readonly shareType: ToField<TypeName>
  readonly amount: ToField<'u128'>

  private constructor(typeArgs: [], fields: InfoFields) {
    this.$fullTypeName = composeSuiType(
      Info.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt_bag::Info`
    this.$typeArgs = typeArgs

    this.assetType = fields.assetType
    this.shareType = fields.shareType
    this.amount = fields.amount
  }

  static reified(): InfoReified {
    const reifiedBcs = Info.bcs
    return {
      typeName: Info.$typeName,
      fullTypeName: composeSuiType(Info.$typeName, ...[]) as `${typeof PKG_V1}::debt_bag::Info`,
      typeArgs: [] as [],
      isPhantom: Info.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Info.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Info.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Info.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Info.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Info.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Info.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Info.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Info.fetch(client, id),
      new: (fields: InfoFields) => {
        return new Info([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Info.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Info>> {
    return phantom(Info.reified())
  }
  static get p() {
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

  static get bcs() {
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

  toJSONField() {
    return {
      assetType: this.assetType.toJSONField(),
      shareType: this.shareType.toJSONField(),
      amount: this.amount.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return Info.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Info {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Info object`)
    }
    return Info.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Info {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInfo(data.bcs.type)) {
        throw new Error(`object at is not a Info object`)
      }

      return Info.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Info.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Info> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Info object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Info object`)
    }

    return Info.fromSuiObjectData(res.data)
  }
}

/* ============================== DebtBag =============================== */

export function isDebtBag(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::debt_bag::DebtBag`
}

export interface DebtBagFields {
  id: ToField<UID>
  infos: ToField<Vector<Info>>
  bag: ToField<Bag>
}

export type DebtBagReified = Reified<DebtBag, DebtBagFields>

export class DebtBag implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt_bag::DebtBag`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DebtBag.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt_bag::DebtBag`
  readonly $typeArgs: []
  readonly $isPhantom = DebtBag.$isPhantom

  readonly id: ToField<UID>
  readonly infos: ToField<Vector<Info>>
  readonly bag: ToField<Bag>

  private constructor(typeArgs: [], fields: DebtBagFields) {
    this.$fullTypeName = composeSuiType(
      DebtBag.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt_bag::DebtBag`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.infos = fields.infos
    this.bag = fields.bag
  }

  static reified(): DebtBagReified {
    const reifiedBcs = DebtBag.bcs
    return {
      typeName: DebtBag.$typeName,
      fullTypeName: composeSuiType(
        DebtBag.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::debt_bag::DebtBag`,
      typeArgs: [] as [],
      isPhantom: DebtBag.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DebtBag.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtBag.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DebtBag.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DebtBag.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DebtBag.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DebtBag.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DebtBag.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DebtBag.fetch(client, id),
      new: (fields: DebtBagFields) => {
        return new DebtBag([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DebtBag.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DebtBag>> {
    return phantom(DebtBag.reified())
  }
  static get p() {
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

  static get bcs() {
    if (!DebtBag.cachedBcs) {
      DebtBag.cachedBcs = DebtBag.instantiateBcs()
    }
    return DebtBag.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DebtBag {
    return DebtBag.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      infos: decodeFromFields(reified.vector(Info.reified()), fields.infos),
      bag: decodeFromFields(Bag.reified(), fields.bag),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DebtBag {
    if (!isDebtBag(item.type)) {
      throw new Error('not a DebtBag type')
    }

    return DebtBag.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      infos: decodeFromFieldsWithTypes(reified.vector(Info.reified()), item.fields.infos),
      bag: decodeFromFieldsWithTypes(Bag.reified(), item.fields.bag),
    })
  }

  static fromBcs(data: Uint8Array): DebtBag {
    return DebtBag.fromFields(DebtBag.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      infos: fieldToJSON<Vector<Info>>(`vector<${Info.$typeName}>`, this.infos),
      bag: this.bag.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DebtBag {
    return DebtBag.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      infos: decodeFromJSONField(reified.vector(Info.reified()), field.infos),
      bag: decodeFromJSONField(Bag.reified(), field.bag),
    })
  }

  static fromJSON(json: Record<string, any>): DebtBag {
    if (json.$typeName !== DebtBag.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DebtBag.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DebtBag {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtBag(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtBag object`)
    }
    return DebtBag.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DebtBag {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtBag(data.bcs.type)) {
        throw new Error(`object at is not a DebtBag object`)
      }

      return DebtBag.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtBag.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DebtBag> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DebtBag object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDebtBag(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DebtBag object`)
    }

    return DebtBag.fromSuiObjectData(res.data)
  }
}

/* ============================== Key =============================== */

export function isKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::debt_bag::Key`
}

export interface KeyFields {
  t: ToField<TypeName>
  st: ToField<TypeName>
}

export type KeyReified = Reified<Key, KeyFields>

export class Key implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt_bag::Key`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Key.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt_bag::Key`
  readonly $typeArgs: []
  readonly $isPhantom = Key.$isPhantom

  readonly t: ToField<TypeName>
  readonly st: ToField<TypeName>

  private constructor(typeArgs: [], fields: KeyFields) {
    this.$fullTypeName = composeSuiType(
      Key.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt_bag::Key`
    this.$typeArgs = typeArgs

    this.t = fields.t
    this.st = fields.st
  }

  static reified(): KeyReified {
    const reifiedBcs = Key.bcs
    return {
      typeName: Key.$typeName,
      fullTypeName: composeSuiType(Key.$typeName, ...[]) as `${typeof PKG_V1}::debt_bag::Key`,
      typeArgs: [] as [],
      isPhantom: Key.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Key.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Key.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Key.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Key.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Key.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Key.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Key.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Key.fetch(client, id),
      new: (fields: KeyFields) => {
        return new Key([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Key.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Key>> {
    return phantom(Key.reified())
  }
  static get p() {
    return Key.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Key', {
      t: TypeName.bcs,
      st: TypeName.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Key.instantiateBcs> | null = null

  static get bcs() {
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

  toJSONField() {
    return {
      t: this.t.toJSONField(),
      st: this.st.toJSONField(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return Key.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Key {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Key object`)
    }
    return Key.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Key {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKey(data.bcs.type)) {
        throw new Error(`object at is not a Key object`)
      }

      return Key.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Key.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Key> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Key object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Key object`)
    }

    return Key.fromSuiObjectData(res.data)
  }
}
