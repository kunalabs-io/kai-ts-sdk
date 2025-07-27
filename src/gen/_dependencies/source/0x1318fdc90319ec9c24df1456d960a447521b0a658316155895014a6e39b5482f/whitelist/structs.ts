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
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { ID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== WhitelistKey =============================== */

export function isWhitelistKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::whitelist::WhitelistKey`
}

export interface WhitelistKeyFields {
  address: ToField<'address'>
}

export type WhitelistKeyReified = Reified<WhitelistKey, WhitelistKeyFields>

export class WhitelistKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::whitelist::WhitelistKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = WhitelistKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::whitelist::WhitelistKey`
  readonly $typeArgs: []
  readonly $isPhantom = WhitelistKey.$isPhantom

  readonly address: ToField<'address'>

  private constructor(typeArgs: [], fields: WhitelistKeyFields) {
    this.$fullTypeName = composeSuiType(
      WhitelistKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::whitelist::WhitelistKey`
    this.$typeArgs = typeArgs

    this.address = fields.address
  }

  static reified(): WhitelistKeyReified {
    const reifiedBcs = WhitelistKey.bcs
    return {
      typeName: WhitelistKey.$typeName,
      fullTypeName: composeSuiType(
        WhitelistKey.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::whitelist::WhitelistKey`,
      typeArgs: [] as [],
      isPhantom: WhitelistKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WhitelistKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WhitelistKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WhitelistKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WhitelistKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WhitelistKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => WhitelistKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WhitelistKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => WhitelistKey.fetch(client, id),
      new: (fields: WhitelistKeyFields) => {
        return new WhitelistKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WhitelistKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WhitelistKey>> {
    return phantom(WhitelistKey.reified())
  }
  static get p() {
    return WhitelistKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WhitelistKey', {
      address: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof WhitelistKey.instantiateBcs> | null = null

  static get bcs() {
    if (!WhitelistKey.cachedBcs) {
      WhitelistKey.cachedBcs = WhitelistKey.instantiateBcs()
    }
    return WhitelistKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WhitelistKey {
    return WhitelistKey.reified().new({ address: decodeFromFields('address', fields.address) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WhitelistKey {
    if (!isWhitelistKey(item.type)) {
      throw new Error('not a WhitelistKey type')
    }

    return WhitelistKey.reified().new({
      address: decodeFromFieldsWithTypes('address', item.fields.address),
    })
  }

  static fromBcs(data: Uint8Array): WhitelistKey {
    return WhitelistKey.fromFields(WhitelistKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      address: this.address,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WhitelistKey {
    return WhitelistKey.reified().new({ address: decodeFromJSONField('address', field.address) })
  }

  static fromJSON(json: Record<string, any>): WhitelistKey {
    if (json.$typeName !== WhitelistKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return WhitelistKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): WhitelistKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWhitelistKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WhitelistKey object`)
    }
    return WhitelistKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): WhitelistKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWhitelistKey(data.bcs.type)) {
        throw new Error(`object at is not a WhitelistKey object`)
      }

      return WhitelistKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WhitelistKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<WhitelistKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WhitelistKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWhitelistKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WhitelistKey object`)
    }

    return WhitelistKey.fromSuiObjectData(res.data)
  }
}

/* ============================== AllowAllKey =============================== */

export function isAllowAllKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::whitelist::AllowAllKey`
}

export interface AllowAllKeyFields {
  dummyField: ToField<'bool'>
}

export type AllowAllKeyReified = Reified<AllowAllKey, AllowAllKeyFields>

export class AllowAllKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::whitelist::AllowAllKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AllowAllKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::whitelist::AllowAllKey`
  readonly $typeArgs: []
  readonly $isPhantom = AllowAllKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AllowAllKeyFields) {
    this.$fullTypeName = composeSuiType(
      AllowAllKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::whitelist::AllowAllKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AllowAllKeyReified {
    const reifiedBcs = AllowAllKey.bcs
    return {
      typeName: AllowAllKey.$typeName,
      fullTypeName: composeSuiType(
        AllowAllKey.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::whitelist::AllowAllKey`,
      typeArgs: [] as [],
      isPhantom: AllowAllKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AllowAllKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AllowAllKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AllowAllKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AllowAllKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AllowAllKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AllowAllKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AllowAllKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AllowAllKey.fetch(client, id),
      new: (fields: AllowAllKeyFields) => {
        return new AllowAllKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AllowAllKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AllowAllKey>> {
    return phantom(AllowAllKey.reified())
  }
  static get p() {
    return AllowAllKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AllowAllKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AllowAllKey.instantiateBcs> | null = null

  static get bcs() {
    if (!AllowAllKey.cachedBcs) {
      AllowAllKey.cachedBcs = AllowAllKey.instantiateBcs()
    }
    return AllowAllKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AllowAllKey {
    return AllowAllKey.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AllowAllKey {
    if (!isAllowAllKey(item.type)) {
      throw new Error('not a AllowAllKey type')
    }

    return AllowAllKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AllowAllKey {
    return AllowAllKey.fromFields(AllowAllKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AllowAllKey {
    return AllowAllKey.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): AllowAllKey {
    if (json.$typeName !== AllowAllKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AllowAllKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AllowAllKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAllowAllKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AllowAllKey object`)
    }
    return AllowAllKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AllowAllKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAllowAllKey(data.bcs.type)) {
        throw new Error(`object at is not a AllowAllKey object`)
      }

      return AllowAllKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AllowAllKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AllowAllKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AllowAllKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAllowAllKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AllowAllKey object`)
    }

    return AllowAllKey.fromSuiObjectData(res.data)
  }
}

/* ============================== RejectAllKey =============================== */

export function isRejectAllKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::whitelist::RejectAllKey`
}

export interface RejectAllKeyFields {
  dummyField: ToField<'bool'>
}

export type RejectAllKeyReified = Reified<RejectAllKey, RejectAllKeyFields>

export class RejectAllKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::whitelist::RejectAllKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RejectAllKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::whitelist::RejectAllKey`
  readonly $typeArgs: []
  readonly $isPhantom = RejectAllKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: RejectAllKeyFields) {
    this.$fullTypeName = composeSuiType(
      RejectAllKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::whitelist::RejectAllKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): RejectAllKeyReified {
    const reifiedBcs = RejectAllKey.bcs
    return {
      typeName: RejectAllKey.$typeName,
      fullTypeName: composeSuiType(
        RejectAllKey.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::whitelist::RejectAllKey`,
      typeArgs: [] as [],
      isPhantom: RejectAllKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RejectAllKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RejectAllKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RejectAllKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RejectAllKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RejectAllKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RejectAllKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RejectAllKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RejectAllKey.fetch(client, id),
      new: (fields: RejectAllKeyFields) => {
        return new RejectAllKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RejectAllKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RejectAllKey>> {
    return phantom(RejectAllKey.reified())
  }
  static get p() {
    return RejectAllKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RejectAllKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof RejectAllKey.instantiateBcs> | null = null

  static get bcs() {
    if (!RejectAllKey.cachedBcs) {
      RejectAllKey.cachedBcs = RejectAllKey.instantiateBcs()
    }
    return RejectAllKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RejectAllKey {
    return RejectAllKey.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RejectAllKey {
    if (!isRejectAllKey(item.type)) {
      throw new Error('not a RejectAllKey type')
    }

    return RejectAllKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): RejectAllKey {
    return RejectAllKey.fromFields(RejectAllKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RejectAllKey {
    return RejectAllKey.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): RejectAllKey {
    if (json.$typeName !== RejectAllKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RejectAllKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RejectAllKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRejectAllKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RejectAllKey object`)
    }
    return RejectAllKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RejectAllKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRejectAllKey(data.bcs.type)) {
        throw new Error(`object at is not a RejectAllKey object`)
      }

      return RejectAllKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RejectAllKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RejectAllKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RejectAllKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRejectAllKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RejectAllKey object`)
    }

    return RejectAllKey.fromSuiObjectData(res.data)
  }
}

/* ============================== WhitelistAddEvent =============================== */

export function isWhitelistAddEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::whitelist::WhitelistAddEvent`
}

export interface WhitelistAddEventFields {
  id: ToField<ID>
  address: ToField<'address'>
}

export type WhitelistAddEventReified = Reified<WhitelistAddEvent, WhitelistAddEventFields>

export class WhitelistAddEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::whitelist::WhitelistAddEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = WhitelistAddEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::whitelist::WhitelistAddEvent`
  readonly $typeArgs: []
  readonly $isPhantom = WhitelistAddEvent.$isPhantom

  readonly id: ToField<ID>
  readonly address: ToField<'address'>

  private constructor(typeArgs: [], fields: WhitelistAddEventFields) {
    this.$fullTypeName = composeSuiType(
      WhitelistAddEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::whitelist::WhitelistAddEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.address = fields.address
  }

  static reified(): WhitelistAddEventReified {
    const reifiedBcs = WhitelistAddEvent.bcs
    return {
      typeName: WhitelistAddEvent.$typeName,
      fullTypeName: composeSuiType(
        WhitelistAddEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::whitelist::WhitelistAddEvent`,
      typeArgs: [] as [],
      isPhantom: WhitelistAddEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WhitelistAddEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WhitelistAddEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WhitelistAddEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WhitelistAddEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WhitelistAddEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => WhitelistAddEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WhitelistAddEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => WhitelistAddEvent.fetch(client, id),
      new: (fields: WhitelistAddEventFields) => {
        return new WhitelistAddEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WhitelistAddEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WhitelistAddEvent>> {
    return phantom(WhitelistAddEvent.reified())
  }
  static get p() {
    return WhitelistAddEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WhitelistAddEvent', {
      id: ID.bcs,
      address: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof WhitelistAddEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!WhitelistAddEvent.cachedBcs) {
      WhitelistAddEvent.cachedBcs = WhitelistAddEvent.instantiateBcs()
    }
    return WhitelistAddEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WhitelistAddEvent {
    return WhitelistAddEvent.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
      address: decodeFromFields('address', fields.address),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WhitelistAddEvent {
    if (!isWhitelistAddEvent(item.type)) {
      throw new Error('not a WhitelistAddEvent type')
    }

    return WhitelistAddEvent.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
      address: decodeFromFieldsWithTypes('address', item.fields.address),
    })
  }

  static fromBcs(data: Uint8Array): WhitelistAddEvent {
    return WhitelistAddEvent.fromFields(WhitelistAddEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      address: this.address,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WhitelistAddEvent {
    return WhitelistAddEvent.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
      address: decodeFromJSONField('address', field.address),
    })
  }

  static fromJSON(json: Record<string, any>): WhitelistAddEvent {
    if (json.$typeName !== WhitelistAddEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return WhitelistAddEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): WhitelistAddEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWhitelistAddEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WhitelistAddEvent object`)
    }
    return WhitelistAddEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): WhitelistAddEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWhitelistAddEvent(data.bcs.type)) {
        throw new Error(`object at is not a WhitelistAddEvent object`)
      }

      return WhitelistAddEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WhitelistAddEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<WhitelistAddEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WhitelistAddEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWhitelistAddEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WhitelistAddEvent object`)
    }

    return WhitelistAddEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== WhitelistRemoveEvent =============================== */

export function isWhitelistRemoveEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::whitelist::WhitelistRemoveEvent`
}

export interface WhitelistRemoveEventFields {
  id: ToField<ID>
  address: ToField<'address'>
}

export type WhitelistRemoveEventReified = Reified<WhitelistRemoveEvent, WhitelistRemoveEventFields>

export class WhitelistRemoveEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::whitelist::WhitelistRemoveEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = WhitelistRemoveEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::whitelist::WhitelistRemoveEvent`
  readonly $typeArgs: []
  readonly $isPhantom = WhitelistRemoveEvent.$isPhantom

  readonly id: ToField<ID>
  readonly address: ToField<'address'>

  private constructor(typeArgs: [], fields: WhitelistRemoveEventFields) {
    this.$fullTypeName = composeSuiType(
      WhitelistRemoveEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::whitelist::WhitelistRemoveEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.address = fields.address
  }

  static reified(): WhitelistRemoveEventReified {
    const reifiedBcs = WhitelistRemoveEvent.bcs
    return {
      typeName: WhitelistRemoveEvent.$typeName,
      fullTypeName: composeSuiType(
        WhitelistRemoveEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::whitelist::WhitelistRemoveEvent`,
      typeArgs: [] as [],
      isPhantom: WhitelistRemoveEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WhitelistRemoveEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        WhitelistRemoveEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WhitelistRemoveEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WhitelistRemoveEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WhitelistRemoveEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        WhitelistRemoveEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WhitelistRemoveEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => WhitelistRemoveEvent.fetch(client, id),
      new: (fields: WhitelistRemoveEventFields) => {
        return new WhitelistRemoveEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WhitelistRemoveEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WhitelistRemoveEvent>> {
    return phantom(WhitelistRemoveEvent.reified())
  }
  static get p() {
    return WhitelistRemoveEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WhitelistRemoveEvent', {
      id: ID.bcs,
      address: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof WhitelistRemoveEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!WhitelistRemoveEvent.cachedBcs) {
      WhitelistRemoveEvent.cachedBcs = WhitelistRemoveEvent.instantiateBcs()
    }
    return WhitelistRemoveEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WhitelistRemoveEvent {
    return WhitelistRemoveEvent.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
      address: decodeFromFields('address', fields.address),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WhitelistRemoveEvent {
    if (!isWhitelistRemoveEvent(item.type)) {
      throw new Error('not a WhitelistRemoveEvent type')
    }

    return WhitelistRemoveEvent.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
      address: decodeFromFieldsWithTypes('address', item.fields.address),
    })
  }

  static fromBcs(data: Uint8Array): WhitelistRemoveEvent {
    return WhitelistRemoveEvent.fromFields(WhitelistRemoveEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      address: this.address,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WhitelistRemoveEvent {
    return WhitelistRemoveEvent.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
      address: decodeFromJSONField('address', field.address),
    })
  }

  static fromJSON(json: Record<string, any>): WhitelistRemoveEvent {
    if (json.$typeName !== WhitelistRemoveEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return WhitelistRemoveEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): WhitelistRemoveEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWhitelistRemoveEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a WhitelistRemoveEvent object`
      )
    }
    return WhitelistRemoveEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): WhitelistRemoveEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWhitelistRemoveEvent(data.bcs.type)) {
        throw new Error(`object at is not a WhitelistRemoveEvent object`)
      }

      return WhitelistRemoveEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WhitelistRemoveEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<WhitelistRemoveEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WhitelistRemoveEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWhitelistRemoveEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WhitelistRemoveEvent object`)
    }

    return WhitelistRemoveEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AllowAllEvent =============================== */

export function isAllowAllEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::whitelist::AllowAllEvent`
}

export interface AllowAllEventFields {
  id: ToField<ID>
}

export type AllowAllEventReified = Reified<AllowAllEvent, AllowAllEventFields>

export class AllowAllEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::whitelist::AllowAllEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AllowAllEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::whitelist::AllowAllEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AllowAllEvent.$isPhantom

  readonly id: ToField<ID>

  private constructor(typeArgs: [], fields: AllowAllEventFields) {
    this.$fullTypeName = composeSuiType(
      AllowAllEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::whitelist::AllowAllEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AllowAllEventReified {
    const reifiedBcs = AllowAllEvent.bcs
    return {
      typeName: AllowAllEvent.$typeName,
      fullTypeName: composeSuiType(
        AllowAllEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::whitelist::AllowAllEvent`,
      typeArgs: [] as [],
      isPhantom: AllowAllEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AllowAllEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AllowAllEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AllowAllEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AllowAllEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AllowAllEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AllowAllEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AllowAllEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AllowAllEvent.fetch(client, id),
      new: (fields: AllowAllEventFields) => {
        return new AllowAllEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AllowAllEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AllowAllEvent>> {
    return phantom(AllowAllEvent.reified())
  }
  static get p() {
    return AllowAllEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AllowAllEvent', {
      id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AllowAllEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!AllowAllEvent.cachedBcs) {
      AllowAllEvent.cachedBcs = AllowAllEvent.instantiateBcs()
    }
    return AllowAllEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AllowAllEvent {
    return AllowAllEvent.reified().new({ id: decodeFromFields(ID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AllowAllEvent {
    if (!isAllowAllEvent(item.type)) {
      throw new Error('not a AllowAllEvent type')
    }

    return AllowAllEvent.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): AllowAllEvent {
    return AllowAllEvent.fromFields(AllowAllEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AllowAllEvent {
    return AllowAllEvent.reified().new({ id: decodeFromJSONField(ID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): AllowAllEvent {
    if (json.$typeName !== AllowAllEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AllowAllEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AllowAllEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAllowAllEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AllowAllEvent object`)
    }
    return AllowAllEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AllowAllEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAllowAllEvent(data.bcs.type)) {
        throw new Error(`object at is not a AllowAllEvent object`)
      }

      return AllowAllEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AllowAllEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AllowAllEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AllowAllEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAllowAllEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AllowAllEvent object`)
    }

    return AllowAllEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RejectAllEvent =============================== */

export function isRejectAllEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::whitelist::RejectAllEvent`
}

export interface RejectAllEventFields {
  id: ToField<ID>
}

export type RejectAllEventReified = Reified<RejectAllEvent, RejectAllEventFields>

export class RejectAllEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::whitelist::RejectAllEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RejectAllEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::whitelist::RejectAllEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RejectAllEvent.$isPhantom

  readonly id: ToField<ID>

  private constructor(typeArgs: [], fields: RejectAllEventFields) {
    this.$fullTypeName = composeSuiType(
      RejectAllEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::whitelist::RejectAllEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): RejectAllEventReified {
    const reifiedBcs = RejectAllEvent.bcs
    return {
      typeName: RejectAllEvent.$typeName,
      fullTypeName: composeSuiType(
        RejectAllEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::whitelist::RejectAllEvent`,
      typeArgs: [] as [],
      isPhantom: RejectAllEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RejectAllEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RejectAllEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RejectAllEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RejectAllEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RejectAllEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RejectAllEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RejectAllEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RejectAllEvent.fetch(client, id),
      new: (fields: RejectAllEventFields) => {
        return new RejectAllEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RejectAllEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RejectAllEvent>> {
    return phantom(RejectAllEvent.reified())
  }
  static get p() {
    return RejectAllEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RejectAllEvent', {
      id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RejectAllEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!RejectAllEvent.cachedBcs) {
      RejectAllEvent.cachedBcs = RejectAllEvent.instantiateBcs()
    }
    return RejectAllEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RejectAllEvent {
    return RejectAllEvent.reified().new({ id: decodeFromFields(ID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RejectAllEvent {
    if (!isRejectAllEvent(item.type)) {
      throw new Error('not a RejectAllEvent type')
    }

    return RejectAllEvent.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): RejectAllEvent {
    return RejectAllEvent.fromFields(RejectAllEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RejectAllEvent {
    return RejectAllEvent.reified().new({ id: decodeFromJSONField(ID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): RejectAllEvent {
    if (json.$typeName !== RejectAllEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RejectAllEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RejectAllEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRejectAllEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RejectAllEvent object`)
    }
    return RejectAllEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RejectAllEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRejectAllEvent(data.bcs.type)) {
        throw new Error(`object at is not a RejectAllEvent object`)
      }

      return RejectAllEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RejectAllEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RejectAllEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RejectAllEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRejectAllEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RejectAllEvent object`)
    }

    return RejectAllEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== SwitchToWhitelistModeEvent =============================== */

export function isSwitchToWhitelistModeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::whitelist::SwitchToWhitelistModeEvent`
}

export interface SwitchToWhitelistModeEventFields {
  id: ToField<ID>
}

export type SwitchToWhitelistModeEventReified = Reified<
  SwitchToWhitelistModeEvent,
  SwitchToWhitelistModeEventFields
>

export class SwitchToWhitelistModeEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::whitelist::SwitchToWhitelistModeEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SwitchToWhitelistModeEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::whitelist::SwitchToWhitelistModeEvent`
  readonly $typeArgs: []
  readonly $isPhantom = SwitchToWhitelistModeEvent.$isPhantom

  readonly id: ToField<ID>

  private constructor(typeArgs: [], fields: SwitchToWhitelistModeEventFields) {
    this.$fullTypeName = composeSuiType(
      SwitchToWhitelistModeEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::whitelist::SwitchToWhitelistModeEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): SwitchToWhitelistModeEventReified {
    const reifiedBcs = SwitchToWhitelistModeEvent.bcs
    return {
      typeName: SwitchToWhitelistModeEvent.$typeName,
      fullTypeName: composeSuiType(
        SwitchToWhitelistModeEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::whitelist::SwitchToWhitelistModeEvent`,
      typeArgs: [] as [],
      isPhantom: SwitchToWhitelistModeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwitchToWhitelistModeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        SwitchToWhitelistModeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwitchToWhitelistModeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SwitchToWhitelistModeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwitchToWhitelistModeEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        SwitchToWhitelistModeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        SwitchToWhitelistModeEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SwitchToWhitelistModeEvent.fetch(client, id),
      new: (fields: SwitchToWhitelistModeEventFields) => {
        return new SwitchToWhitelistModeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SwitchToWhitelistModeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwitchToWhitelistModeEvent>> {
    return phantom(SwitchToWhitelistModeEvent.reified())
  }
  static get p() {
    return SwitchToWhitelistModeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SwitchToWhitelistModeEvent', {
      id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof SwitchToWhitelistModeEvent.instantiateBcs> | null =
    null

  static get bcs() {
    if (!SwitchToWhitelistModeEvent.cachedBcs) {
      SwitchToWhitelistModeEvent.cachedBcs = SwitchToWhitelistModeEvent.instantiateBcs()
    }
    return SwitchToWhitelistModeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SwitchToWhitelistModeEvent {
    return SwitchToWhitelistModeEvent.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwitchToWhitelistModeEvent {
    if (!isSwitchToWhitelistModeEvent(item.type)) {
      throw new Error('not a SwitchToWhitelistModeEvent type')
    }

    return SwitchToWhitelistModeEvent.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): SwitchToWhitelistModeEvent {
    return SwitchToWhitelistModeEvent.fromFields(SwitchToWhitelistModeEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwitchToWhitelistModeEvent {
    return SwitchToWhitelistModeEvent.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): SwitchToWhitelistModeEvent {
    if (json.$typeName !== SwitchToWhitelistModeEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SwitchToWhitelistModeEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SwitchToWhitelistModeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwitchToWhitelistModeEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a SwitchToWhitelistModeEvent object`
      )
    }
    return SwitchToWhitelistModeEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SwitchToWhitelistModeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwitchToWhitelistModeEvent(data.bcs.type)) {
        throw new Error(`object at is not a SwitchToWhitelistModeEvent object`)
      }

      return SwitchToWhitelistModeEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwitchToWhitelistModeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SwitchToWhitelistModeEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching SwitchToWhitelistModeEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isSwitchToWhitelistModeEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a SwitchToWhitelistModeEvent object`)
    }

    return SwitchToWhitelistModeEvent.fromSuiObjectData(res.data)
  }
}
