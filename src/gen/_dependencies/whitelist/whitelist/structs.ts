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
import { ID } from '../../../sui/object/structs'

/* ============================== WhitelistKey =============================== */

export function isWhitelistKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('whitelist', 'whitelist::WhitelistKey')}::whitelist::WhitelistKey`
}

export interface WhitelistKeyFields {
  address: ToField<'address'>
}

export type WhitelistKeyReified = Reified<WhitelistKey, WhitelistKeyFields>

export type WhitelistKeyJSONField = {
  address: string
}

export type WhitelistKeyJSON = {
  $typeName: typeof WhitelistKey.$typeName
  $typeArgs: []
} & WhitelistKeyJSONField

export class WhitelistKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::whitelist::WhitelistKey` {
    return `${
      getTypeOrigin('whitelist', 'whitelist::WhitelistKey')
    }::whitelist::WhitelistKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof WhitelistKey.$typeName = WhitelistKey.$typeName
  readonly $fullTypeName: `${string}::whitelist::WhitelistKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof WhitelistKey.$isPhantom = WhitelistKey.$isPhantom

  readonly address: ToField<'address'>

  private constructor(typeArgs: [], fields: WhitelistKeyFields) {
    this.$fullTypeName = composeSuiType(
      WhitelistKey.$typeName,
      ...typeArgs,
    ) as `${string}::whitelist::WhitelistKey`
    this.$typeArgs = typeArgs

    this.address = fields.address
  }

  static reified(): WhitelistKeyReified {
    const reifiedBcs = WhitelistKey.bcs
    return {
      get typeName() {
        return WhitelistKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WhitelistKey.$typeName,
          ...[],
        ) as `${string}::whitelist::WhitelistKey`
      },
      typeArgs: [] as [],
      isPhantom: WhitelistKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WhitelistKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WhitelistKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WhitelistKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WhitelistKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WhitelistKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WhitelistKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => WhitelistKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WhitelistKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => WhitelistKey.fetch(client, id),
      new: (fields: WhitelistKeyFields) => {
        return new WhitelistKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): WhitelistKeyReified {
    return WhitelistKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WhitelistKey>> {
    return phantom(WhitelistKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<WhitelistKey>> {
    return WhitelistKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WhitelistKey', {
      address: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof WhitelistKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WhitelistKey.instantiateBcs> {
    if (!WhitelistKey.cachedBcs) {
      WhitelistKey.cachedBcs = WhitelistKey.instantiateBcs()
    }
    return WhitelistKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WhitelistKey {
    return WhitelistKey.reified().new({
      address: decodeFromFields('address', fields.address),
    })
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

  toJSONField(): WhitelistKeyJSONField {
    return {
      address: this.address,
    }
  }

  toJSON(): WhitelistKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WhitelistKey {
    return WhitelistKey.reified().new({
      address: decodeFromJSONField('address', field.address),
    })
  }

  static fromJSON(json: Record<string, any>): WhitelistKey {
    if (json.$typeName !== WhitelistKey.$typeName) {
      throw new Error(
        `not a WhitelistKey json object: expected '${WhitelistKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return WhitelistKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WhitelistKey {
    if (!isWhitelistKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WhitelistKey object`)
    }
    return WhitelistKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WhitelistKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WhitelistKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWhitelistKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WhitelistKey object`)
    }
    return WhitelistKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WhitelistKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WhitelistKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWhitelistKey(data.bcs.type)) {
        throw new Error(`object at is not a WhitelistKey object`)
      }

      return WhitelistKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WhitelistKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WhitelistKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWhitelistKey(object.type)) {
      throw new Error(`object at id ${id} is not a WhitelistKey object`)
    }
    return WhitelistKey.fromBcs(object.content)
  }
}

/* ============================== AllowAllKey =============================== */

export function isAllowAllKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('whitelist', 'whitelist::AllowAllKey')}::whitelist::AllowAllKey`
}

export interface AllowAllKeyFields {
  dummyField: ToField<'bool'>
}

export type AllowAllKeyReified = Reified<AllowAllKey, AllowAllKeyFields>

export type AllowAllKeyJSONField = {
  dummyField: boolean
}

export type AllowAllKeyJSON = {
  $typeName: typeof AllowAllKey.$typeName
  $typeArgs: []
} & AllowAllKeyJSONField

export class AllowAllKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::whitelist::AllowAllKey` {
    return `${
      getTypeOrigin('whitelist', 'whitelist::AllowAllKey')
    }::whitelist::AllowAllKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AllowAllKey.$typeName = AllowAllKey.$typeName
  readonly $fullTypeName: `${string}::whitelist::AllowAllKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AllowAllKey.$isPhantom = AllowAllKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AllowAllKeyFields) {
    this.$fullTypeName = composeSuiType(
      AllowAllKey.$typeName,
      ...typeArgs,
    ) as `${string}::whitelist::AllowAllKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AllowAllKeyReified {
    const reifiedBcs = AllowAllKey.bcs
    return {
      get typeName() {
        return AllowAllKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AllowAllKey.$typeName,
          ...[],
        ) as `${string}::whitelist::AllowAllKey`
      },
      typeArgs: [] as [],
      isPhantom: AllowAllKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AllowAllKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AllowAllKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AllowAllKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AllowAllKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AllowAllKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AllowAllKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AllowAllKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AllowAllKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AllowAllKey.fetch(client, id),
      new: (fields: AllowAllKeyFields) => {
        return new AllowAllKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AllowAllKeyReified {
    return AllowAllKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AllowAllKey>> {
    return phantom(AllowAllKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AllowAllKey>> {
    return AllowAllKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AllowAllKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AllowAllKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AllowAllKey.instantiateBcs> {
    if (!AllowAllKey.cachedBcs) {
      AllowAllKey.cachedBcs = AllowAllKey.instantiateBcs()
    }
    return AllowAllKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AllowAllKey {
    return AllowAllKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): AllowAllKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): AllowAllKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AllowAllKey {
    return AllowAllKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AllowAllKey {
    if (json.$typeName !== AllowAllKey.$typeName) {
      throw new Error(
        `not a AllowAllKey json object: expected '${AllowAllKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AllowAllKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AllowAllKey {
    if (!isAllowAllKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AllowAllKey object`)
    }
    return AllowAllKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AllowAllKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AllowAllKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAllowAllKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AllowAllKey object`)
    }
    return AllowAllKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AllowAllKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AllowAllKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAllowAllKey(data.bcs.type)) {
        throw new Error(`object at is not a AllowAllKey object`)
      }

      return AllowAllKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AllowAllKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AllowAllKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAllowAllKey(object.type)) {
      throw new Error(`object at id ${id} is not a AllowAllKey object`)
    }
    return AllowAllKey.fromBcs(object.content)
  }
}

/* ============================== RejectAllKey =============================== */

export function isRejectAllKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('whitelist', 'whitelist::RejectAllKey')}::whitelist::RejectAllKey`
}

export interface RejectAllKeyFields {
  dummyField: ToField<'bool'>
}

export type RejectAllKeyReified = Reified<RejectAllKey, RejectAllKeyFields>

export type RejectAllKeyJSONField = {
  dummyField: boolean
}

export type RejectAllKeyJSON = {
  $typeName: typeof RejectAllKey.$typeName
  $typeArgs: []
} & RejectAllKeyJSONField

export class RejectAllKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::whitelist::RejectAllKey` {
    return `${
      getTypeOrigin('whitelist', 'whitelist::RejectAllKey')
    }::whitelist::RejectAllKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RejectAllKey.$typeName = RejectAllKey.$typeName
  readonly $fullTypeName: `${string}::whitelist::RejectAllKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RejectAllKey.$isPhantom = RejectAllKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: RejectAllKeyFields) {
    this.$fullTypeName = composeSuiType(
      RejectAllKey.$typeName,
      ...typeArgs,
    ) as `${string}::whitelist::RejectAllKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): RejectAllKeyReified {
    const reifiedBcs = RejectAllKey.bcs
    return {
      get typeName() {
        return RejectAllKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RejectAllKey.$typeName,
          ...[],
        ) as `${string}::whitelist::RejectAllKey`
      },
      typeArgs: [] as [],
      isPhantom: RejectAllKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RejectAllKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RejectAllKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RejectAllKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RejectAllKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RejectAllKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RejectAllKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RejectAllKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RejectAllKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RejectAllKey.fetch(client, id),
      new: (fields: RejectAllKeyFields) => {
        return new RejectAllKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RejectAllKeyReified {
    return RejectAllKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RejectAllKey>> {
    return phantom(RejectAllKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RejectAllKey>> {
    return RejectAllKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RejectAllKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof RejectAllKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RejectAllKey.instantiateBcs> {
    if (!RejectAllKey.cachedBcs) {
      RejectAllKey.cachedBcs = RejectAllKey.instantiateBcs()
    }
    return RejectAllKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RejectAllKey {
    return RejectAllKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): RejectAllKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): RejectAllKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RejectAllKey {
    return RejectAllKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): RejectAllKey {
    if (json.$typeName !== RejectAllKey.$typeName) {
      throw new Error(
        `not a RejectAllKey json object: expected '${RejectAllKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RejectAllKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RejectAllKey {
    if (!isRejectAllKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RejectAllKey object`)
    }
    return RejectAllKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RejectAllKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RejectAllKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRejectAllKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RejectAllKey object`)
    }
    return RejectAllKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RejectAllKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RejectAllKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRejectAllKey(data.bcs.type)) {
        throw new Error(`object at is not a RejectAllKey object`)
      }

      return RejectAllKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RejectAllKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RejectAllKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRejectAllKey(object.type)) {
      throw new Error(`object at id ${id} is not a RejectAllKey object`)
    }
    return RejectAllKey.fromBcs(object.content)
  }
}

/* ============================== WhitelistAddEvent =============================== */

export function isWhitelistAddEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('whitelist', 'whitelist::WhitelistAddEvent')
    }::whitelist::WhitelistAddEvent`
}

export interface WhitelistAddEventFields {
  id: ToField<ID>
  address: ToField<'address'>
}

export type WhitelistAddEventReified = Reified<WhitelistAddEvent, WhitelistAddEventFields>

export type WhitelistAddEventJSONField = {
  id: string
  address: string
}

export type WhitelistAddEventJSON = {
  $typeName: typeof WhitelistAddEvent.$typeName
  $typeArgs: []
} & WhitelistAddEventJSONField

/** Emit this event when you add an address to the whitelist. */
export class WhitelistAddEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::whitelist::WhitelistAddEvent` {
    return `${
      getTypeOrigin('whitelist', 'whitelist::WhitelistAddEvent')
    }::whitelist::WhitelistAddEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof WhitelistAddEvent.$typeName = WhitelistAddEvent.$typeName
  readonly $fullTypeName: `${string}::whitelist::WhitelistAddEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof WhitelistAddEvent.$isPhantom = WhitelistAddEvent.$isPhantom

  readonly id: ToField<ID>
  readonly address: ToField<'address'>

  private constructor(typeArgs: [], fields: WhitelistAddEventFields) {
    this.$fullTypeName = composeSuiType(
      WhitelistAddEvent.$typeName,
      ...typeArgs,
    ) as `${string}::whitelist::WhitelistAddEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.address = fields.address
  }

  static reified(): WhitelistAddEventReified {
    const reifiedBcs = WhitelistAddEvent.bcs
    return {
      get typeName() {
        return WhitelistAddEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WhitelistAddEvent.$typeName,
          ...[],
        ) as `${string}::whitelist::WhitelistAddEvent`
      },
      typeArgs: [] as [],
      isPhantom: WhitelistAddEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WhitelistAddEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WhitelistAddEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WhitelistAddEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WhitelistAddEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WhitelistAddEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WhitelistAddEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => WhitelistAddEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WhitelistAddEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => WhitelistAddEvent.fetch(client, id),
      new: (fields: WhitelistAddEventFields) => {
        return new WhitelistAddEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): WhitelistAddEventReified {
    return WhitelistAddEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WhitelistAddEvent>> {
    return phantom(WhitelistAddEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<WhitelistAddEvent>> {
    return WhitelistAddEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WhitelistAddEvent', {
      id: ID.bcs,
      address: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof WhitelistAddEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WhitelistAddEvent.instantiateBcs> {
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

  toJSONField(): WhitelistAddEventJSONField {
    return {
      id: this.id,
      address: this.address,
    }
  }

  toJSON(): WhitelistAddEventJSON {
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
      throw new Error(
        `not a WhitelistAddEvent json object: expected '${WhitelistAddEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return WhitelistAddEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WhitelistAddEvent {
    if (!isWhitelistAddEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WhitelistAddEvent object`)
    }
    return WhitelistAddEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WhitelistAddEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WhitelistAddEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWhitelistAddEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WhitelistAddEvent object`)
    }
    return WhitelistAddEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WhitelistAddEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WhitelistAddEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWhitelistAddEvent(data.bcs.type)) {
        throw new Error(`object at is not a WhitelistAddEvent object`)
      }

      return WhitelistAddEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WhitelistAddEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WhitelistAddEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWhitelistAddEvent(object.type)) {
      throw new Error(`object at id ${id} is not a WhitelistAddEvent object`)
    }
    return WhitelistAddEvent.fromBcs(object.content)
  }
}

/* ============================== WhitelistRemoveEvent =============================== */

export function isWhitelistRemoveEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('whitelist', 'whitelist::WhitelistRemoveEvent')
    }::whitelist::WhitelistRemoveEvent`
}

export interface WhitelistRemoveEventFields {
  id: ToField<ID>
  address: ToField<'address'>
}

export type WhitelistRemoveEventReified = Reified<WhitelistRemoveEvent, WhitelistRemoveEventFields>

export type WhitelistRemoveEventJSONField = {
  id: string
  address: string
}

export type WhitelistRemoveEventJSON = {
  $typeName: typeof WhitelistRemoveEvent.$typeName
  $typeArgs: []
} & WhitelistRemoveEventJSONField

/** Emit this event when you remove an address from the whitelist. */
export class WhitelistRemoveEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::whitelist::WhitelistRemoveEvent` {
    return `${
      getTypeOrigin('whitelist', 'whitelist::WhitelistRemoveEvent')
    }::whitelist::WhitelistRemoveEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof WhitelistRemoveEvent.$typeName = WhitelistRemoveEvent.$typeName
  readonly $fullTypeName: `${string}::whitelist::WhitelistRemoveEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof WhitelistRemoveEvent.$isPhantom = WhitelistRemoveEvent.$isPhantom

  readonly id: ToField<ID>
  readonly address: ToField<'address'>

  private constructor(typeArgs: [], fields: WhitelistRemoveEventFields) {
    this.$fullTypeName = composeSuiType(
      WhitelistRemoveEvent.$typeName,
      ...typeArgs,
    ) as `${string}::whitelist::WhitelistRemoveEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.address = fields.address
  }

  static reified(): WhitelistRemoveEventReified {
    const reifiedBcs = WhitelistRemoveEvent.bcs
    return {
      get typeName() {
        return WhitelistRemoveEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WhitelistRemoveEvent.$typeName,
          ...[],
        ) as `${string}::whitelist::WhitelistRemoveEvent`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WhitelistRemoveEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        WhitelistRemoveEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        WhitelistRemoveEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        WhitelistRemoveEvent.fetch(client, id),
      new: (fields: WhitelistRemoveEventFields) => {
        return new WhitelistRemoveEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): WhitelistRemoveEventReified {
    return WhitelistRemoveEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WhitelistRemoveEvent>> {
    return phantom(WhitelistRemoveEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<WhitelistRemoveEvent>> {
    return WhitelistRemoveEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WhitelistRemoveEvent', {
      id: ID.bcs,
      address: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof WhitelistRemoveEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WhitelistRemoveEvent.instantiateBcs> {
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

  toJSONField(): WhitelistRemoveEventJSONField {
    return {
      id: this.id,
      address: this.address,
    }
  }

  toJSON(): WhitelistRemoveEventJSON {
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
      throw new Error(
        `not a WhitelistRemoveEvent json object: expected '${WhitelistRemoveEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return WhitelistRemoveEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WhitelistRemoveEvent {
    if (!isWhitelistRemoveEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WhitelistRemoveEvent object`)
    }
    return WhitelistRemoveEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WhitelistRemoveEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WhitelistRemoveEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWhitelistRemoveEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a WhitelistRemoveEvent object`,
      )
    }
    return WhitelistRemoveEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WhitelistRemoveEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WhitelistRemoveEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWhitelistRemoveEvent(data.bcs.type)) {
        throw new Error(`object at is not a WhitelistRemoveEvent object`)
      }

      return WhitelistRemoveEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WhitelistRemoveEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WhitelistRemoveEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWhitelistRemoveEvent(object.type)) {
      throw new Error(`object at id ${id} is not a WhitelistRemoveEvent object`)
    }
    return WhitelistRemoveEvent.fromBcs(object.content)
  }
}

/* ============================== AllowAllEvent =============================== */

export function isAllowAllEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('whitelist', 'whitelist::AllowAllEvent')}::whitelist::AllowAllEvent`
}

export interface AllowAllEventFields {
  id: ToField<ID>
}

export type AllowAllEventReified = Reified<AllowAllEvent, AllowAllEventFields>

export type AllowAllEventJSONField = {
  id: string
}

export type AllowAllEventJSON = {
  $typeName: typeof AllowAllEvent.$typeName
  $typeArgs: []
} & AllowAllEventJSONField

/** Emit this event when you allow all addresses. */
export class AllowAllEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::whitelist::AllowAllEvent` {
    return `${
      getTypeOrigin('whitelist', 'whitelist::AllowAllEvent')
    }::whitelist::AllowAllEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AllowAllEvent.$typeName = AllowAllEvent.$typeName
  readonly $fullTypeName: `${string}::whitelist::AllowAllEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AllowAllEvent.$isPhantom = AllowAllEvent.$isPhantom

  readonly id: ToField<ID>

  private constructor(typeArgs: [], fields: AllowAllEventFields) {
    this.$fullTypeName = composeSuiType(
      AllowAllEvent.$typeName,
      ...typeArgs,
    ) as `${string}::whitelist::AllowAllEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AllowAllEventReified {
    const reifiedBcs = AllowAllEvent.bcs
    return {
      get typeName() {
        return AllowAllEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AllowAllEvent.$typeName,
          ...[],
        ) as `${string}::whitelist::AllowAllEvent`
      },
      typeArgs: [] as [],
      isPhantom: AllowAllEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AllowAllEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AllowAllEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AllowAllEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AllowAllEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AllowAllEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AllowAllEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AllowAllEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AllowAllEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AllowAllEvent.fetch(client, id),
      new: (fields: AllowAllEventFields) => {
        return new AllowAllEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AllowAllEventReified {
    return AllowAllEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AllowAllEvent>> {
    return phantom(AllowAllEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AllowAllEvent>> {
    return AllowAllEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AllowAllEvent', {
      id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AllowAllEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AllowAllEvent.instantiateBcs> {
    if (!AllowAllEvent.cachedBcs) {
      AllowAllEvent.cachedBcs = AllowAllEvent.instantiateBcs()
    }
    return AllowAllEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AllowAllEvent {
    return AllowAllEvent.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
    })
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

  toJSONField(): AllowAllEventJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): AllowAllEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AllowAllEvent {
    return AllowAllEvent.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): AllowAllEvent {
    if (json.$typeName !== AllowAllEvent.$typeName) {
      throw new Error(
        `not a AllowAllEvent json object: expected '${AllowAllEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AllowAllEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AllowAllEvent {
    if (!isAllowAllEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AllowAllEvent object`)
    }
    return AllowAllEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AllowAllEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AllowAllEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAllowAllEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AllowAllEvent object`)
    }
    return AllowAllEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AllowAllEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AllowAllEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAllowAllEvent(data.bcs.type)) {
        throw new Error(`object at is not a AllowAllEvent object`)
      }

      return AllowAllEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AllowAllEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AllowAllEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAllowAllEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AllowAllEvent object`)
    }
    return AllowAllEvent.fromBcs(object.content)
  }
}

/* ============================== RejectAllEvent =============================== */

export function isRejectAllEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('whitelist', 'whitelist::RejectAllEvent')}::whitelist::RejectAllEvent`
}

export interface RejectAllEventFields {
  id: ToField<ID>
}

export type RejectAllEventReified = Reified<RejectAllEvent, RejectAllEventFields>

export type RejectAllEventJSONField = {
  id: string
}

export type RejectAllEventJSON = {
  $typeName: typeof RejectAllEvent.$typeName
  $typeArgs: []
} & RejectAllEventJSONField

/** Emit this event when you reject all addresses. */
export class RejectAllEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::whitelist::RejectAllEvent` {
    return `${
      getTypeOrigin('whitelist', 'whitelist::RejectAllEvent')
    }::whitelist::RejectAllEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RejectAllEvent.$typeName = RejectAllEvent.$typeName
  readonly $fullTypeName: `${string}::whitelist::RejectAllEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RejectAllEvent.$isPhantom = RejectAllEvent.$isPhantom

  readonly id: ToField<ID>

  private constructor(typeArgs: [], fields: RejectAllEventFields) {
    this.$fullTypeName = composeSuiType(
      RejectAllEvent.$typeName,
      ...typeArgs,
    ) as `${string}::whitelist::RejectAllEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): RejectAllEventReified {
    const reifiedBcs = RejectAllEvent.bcs
    return {
      get typeName() {
        return RejectAllEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RejectAllEvent.$typeName,
          ...[],
        ) as `${string}::whitelist::RejectAllEvent`
      },
      typeArgs: [] as [],
      isPhantom: RejectAllEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RejectAllEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RejectAllEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RejectAllEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RejectAllEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RejectAllEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RejectAllEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RejectAllEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RejectAllEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RejectAllEvent.fetch(client, id),
      new: (fields: RejectAllEventFields) => {
        return new RejectAllEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RejectAllEventReified {
    return RejectAllEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RejectAllEvent>> {
    return phantom(RejectAllEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RejectAllEvent>> {
    return RejectAllEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RejectAllEvent', {
      id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RejectAllEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RejectAllEvent.instantiateBcs> {
    if (!RejectAllEvent.cachedBcs) {
      RejectAllEvent.cachedBcs = RejectAllEvent.instantiateBcs()
    }
    return RejectAllEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RejectAllEvent {
    return RejectAllEvent.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
    })
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

  toJSONField(): RejectAllEventJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): RejectAllEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RejectAllEvent {
    return RejectAllEvent.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): RejectAllEvent {
    if (json.$typeName !== RejectAllEvent.$typeName) {
      throw new Error(
        `not a RejectAllEvent json object: expected '${RejectAllEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RejectAllEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RejectAllEvent {
    if (!isRejectAllEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RejectAllEvent object`)
    }
    return RejectAllEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RejectAllEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RejectAllEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRejectAllEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RejectAllEvent object`)
    }
    return RejectAllEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RejectAllEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RejectAllEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRejectAllEvent(data.bcs.type)) {
        throw new Error(`object at is not a RejectAllEvent object`)
      }

      return RejectAllEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RejectAllEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RejectAllEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRejectAllEvent(object.type)) {
      throw new Error(`object at id ${id} is not a RejectAllEvent object`)
    }
    return RejectAllEvent.fromBcs(object.content)
  }
}

/* ============================== SwitchToWhitelistModeEvent =============================== */

export function isSwitchToWhitelistModeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('whitelist', 'whitelist::SwitchToWhitelistModeEvent')
    }::whitelist::SwitchToWhitelistModeEvent`
}

export interface SwitchToWhitelistModeEventFields {
  id: ToField<ID>
}

export type SwitchToWhitelistModeEventReified = Reified<
  SwitchToWhitelistModeEvent,
  SwitchToWhitelistModeEventFields
>

export type SwitchToWhitelistModeEventJSONField = {
  id: string
}

export type SwitchToWhitelistModeEventJSON = {
  $typeName: typeof SwitchToWhitelistModeEvent.$typeName
  $typeArgs: []
} & SwitchToWhitelistModeEventJSONField

/** Emit this event when you switch to whitelist mode. */
export class SwitchToWhitelistModeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::whitelist::SwitchToWhitelistModeEvent` {
    return `${
      getTypeOrigin('whitelist', 'whitelist::SwitchToWhitelistModeEvent')
    }::whitelist::SwitchToWhitelistModeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SwitchToWhitelistModeEvent.$typeName =
    SwitchToWhitelistModeEvent.$typeName
  readonly $fullTypeName: `${string}::whitelist::SwitchToWhitelistModeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SwitchToWhitelistModeEvent.$isPhantom =
    SwitchToWhitelistModeEvent.$isPhantom

  readonly id: ToField<ID>

  private constructor(typeArgs: [], fields: SwitchToWhitelistModeEventFields) {
    this.$fullTypeName = composeSuiType(
      SwitchToWhitelistModeEvent.$typeName,
      ...typeArgs,
    ) as `${string}::whitelist::SwitchToWhitelistModeEvent`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): SwitchToWhitelistModeEventReified {
    const reifiedBcs = SwitchToWhitelistModeEvent.bcs
    return {
      get typeName() {
        return SwitchToWhitelistModeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SwitchToWhitelistModeEvent.$typeName,
          ...[],
        ) as `${string}::whitelist::SwitchToWhitelistModeEvent`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SwitchToWhitelistModeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        SwitchToWhitelistModeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        SwitchToWhitelistModeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        SwitchToWhitelistModeEvent.fetch(client, id),
      new: (fields: SwitchToWhitelistModeEventFields) => {
        return new SwitchToWhitelistModeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SwitchToWhitelistModeEventReified {
    return SwitchToWhitelistModeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwitchToWhitelistModeEvent>> {
    return phantom(SwitchToWhitelistModeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SwitchToWhitelistModeEvent>> {
    return SwitchToWhitelistModeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SwitchToWhitelistModeEvent', {
      id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof SwitchToWhitelistModeEvent.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof SwitchToWhitelistModeEvent.instantiateBcs> {
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

  toJSONField(): SwitchToWhitelistModeEventJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): SwitchToWhitelistModeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwitchToWhitelistModeEvent {
    return SwitchToWhitelistModeEvent.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): SwitchToWhitelistModeEvent {
    if (json.$typeName !== SwitchToWhitelistModeEvent.$typeName) {
      throw new Error(
        `not a SwitchToWhitelistModeEvent json object: expected '${SwitchToWhitelistModeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SwitchToWhitelistModeEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SwitchToWhitelistModeEvent {
    if (!isSwitchToWhitelistModeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SwitchToWhitelistModeEvent object`)
    }
    return SwitchToWhitelistModeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwitchToWhitelistModeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SwitchToWhitelistModeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwitchToWhitelistModeEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a SwitchToWhitelistModeEvent object`,
      )
    }
    return SwitchToWhitelistModeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwitchToWhitelistModeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SwitchToWhitelistModeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwitchToWhitelistModeEvent(data.bcs.type)) {
        throw new Error(`object at is not a SwitchToWhitelistModeEvent object`)
      }

      return SwitchToWhitelistModeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwitchToWhitelistModeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SwitchToWhitelistModeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSwitchToWhitelistModeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SwitchToWhitelistModeEvent object`)
    }
    return SwitchToWhitelistModeEvent.fromBcs(object.content)
  }
}
