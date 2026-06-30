import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { TypeName } from '../../../std/type-name/structs'

/* ============================== BorrowFeeKey =============================== */

export function isBorrowFeeKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'market_dynamic_keys::BorrowFeeKey')
    }::market_dynamic_keys::BorrowFeeKey`
}

export interface BorrowFeeKeyFields {
  type: ToField<TypeName>
}

export type BorrowFeeKeyReified = Reified<BorrowFeeKey, BorrowFeeKeyFields>

export type BorrowFeeKeyJSONField = {
  type: string
}

export type BorrowFeeKeyJSON = {
  $typeName: typeof BorrowFeeKey.$typeName
  $typeArgs: []
} & BorrowFeeKeyJSONField

export class BorrowFeeKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::market_dynamic_keys::BorrowFeeKey` {
    return `${
      getTypeOrigin('protocol', 'market_dynamic_keys::BorrowFeeKey')
    }::market_dynamic_keys::BorrowFeeKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowFeeKey.$typeName = BorrowFeeKey.$typeName
  readonly $fullTypeName: `${string}::market_dynamic_keys::BorrowFeeKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowFeeKey.$isPhantom = BorrowFeeKey.$isPhantom

  readonly type: ToField<TypeName>

  private constructor(typeArgs: [], fields: BorrowFeeKeyFields) {
    this.$fullTypeName = composeSuiType(
      BorrowFeeKey.$typeName,
      ...typeArgs,
    ) as `${string}::market_dynamic_keys::BorrowFeeKey`
    this.$typeArgs = typeArgs

    this.type = fields.type
  }

  static reified(): BorrowFeeKeyReified {
    const reifiedBcs = BorrowFeeKey.bcs
    return {
      get typeName() {
        return BorrowFeeKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowFeeKey.$typeName,
          ...[],
        ) as `${string}::market_dynamic_keys::BorrowFeeKey`
      },
      typeArgs: [] as [],
      isPhantom: BorrowFeeKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowFeeKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowFeeKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowFeeKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowFeeKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowFeeKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowFeeKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowFeeKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowFeeKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowFeeKey.fetch(client, id),
      new: (fields: BorrowFeeKeyFields) => {
        return new BorrowFeeKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowFeeKeyReified {
    return BorrowFeeKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowFeeKey>> {
    return phantom(BorrowFeeKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowFeeKey>> {
    return BorrowFeeKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowFeeKey', {
      type: TypeName.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowFeeKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowFeeKey.instantiateBcs> {
    if (!BorrowFeeKey.cachedBcs) {
      BorrowFeeKey.cachedBcs = BorrowFeeKey.instantiateBcs()
    }
    return BorrowFeeKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowFeeKey {
    return BorrowFeeKey.reified().new({
      type: decodeFromFields(TypeName.reified(), fields.type),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowFeeKey {
    if (!isBorrowFeeKey(item.type)) {
      throw new Error('not a BorrowFeeKey type')
    }

    return BorrowFeeKey.reified().new({
      type: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.type),
    })
  }

  static fromBcs(data: Uint8Array): BorrowFeeKey {
    return BorrowFeeKey.fromFields(BorrowFeeKey.bcs.parse(data))
  }

  toJSONField(): BorrowFeeKeyJSONField {
    return {
      type: this.type,
    }
  }

  toJSON(): BorrowFeeKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowFeeKey {
    return BorrowFeeKey.reified().new({
      type: decodeFromJSONField(TypeName.reified(), field.type),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowFeeKey {
    if (json.$typeName !== BorrowFeeKey.$typeName) {
      throw new Error(
        `not a BorrowFeeKey json object: expected '${BorrowFeeKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowFeeKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowFeeKey {
    if (!isBorrowFeeKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowFeeKey object`)
    }
    return BorrowFeeKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowFeeKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowFeeKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowFeeKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowFeeKey object`)
    }
    return BorrowFeeKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowFeeKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowFeeKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowFeeKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowFeeKey object`)
      }

      return BorrowFeeKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowFeeKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowFeeKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowFeeKey(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowFeeKey object`)
    }
    return BorrowFeeKey.fromBcs(object.content)
  }
}

/* ============================== BorrowFeeRecipientKey =============================== */

export function isBorrowFeeRecipientKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'market_dynamic_keys::BorrowFeeRecipientKey')
    }::market_dynamic_keys::BorrowFeeRecipientKey`
}

export interface BorrowFeeRecipientKeyFields {
  dummyField: ToField<'bool'>
}

export type BorrowFeeRecipientKeyReified = Reified<
  BorrowFeeRecipientKey,
  BorrowFeeRecipientKeyFields
>

export type BorrowFeeRecipientKeyJSONField = {
  dummyField: boolean
}

export type BorrowFeeRecipientKeyJSON = {
  $typeName: typeof BorrowFeeRecipientKey.$typeName
  $typeArgs: []
} & BorrowFeeRecipientKeyJSONField

export class BorrowFeeRecipientKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::market_dynamic_keys::BorrowFeeRecipientKey` {
    return `${
      getTypeOrigin('protocol', 'market_dynamic_keys::BorrowFeeRecipientKey')
    }::market_dynamic_keys::BorrowFeeRecipientKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowFeeRecipientKey.$typeName = BorrowFeeRecipientKey.$typeName
  readonly $fullTypeName: `${string}::market_dynamic_keys::BorrowFeeRecipientKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowFeeRecipientKey.$isPhantom = BorrowFeeRecipientKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BorrowFeeRecipientKeyFields) {
    this.$fullTypeName = composeSuiType(
      BorrowFeeRecipientKey.$typeName,
      ...typeArgs,
    ) as `${string}::market_dynamic_keys::BorrowFeeRecipientKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BorrowFeeRecipientKeyReified {
    const reifiedBcs = BorrowFeeRecipientKey.bcs
    return {
      get typeName() {
        return BorrowFeeRecipientKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowFeeRecipientKey.$typeName,
          ...[],
        ) as `${string}::market_dynamic_keys::BorrowFeeRecipientKey`
      },
      typeArgs: [] as [],
      isPhantom: BorrowFeeRecipientKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowFeeRecipientKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BorrowFeeRecipientKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowFeeRecipientKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowFeeRecipientKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowFeeRecipientKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowFeeRecipientKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        BorrowFeeRecipientKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BorrowFeeRecipientKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        BorrowFeeRecipientKey.fetch(client, id),
      new: (fields: BorrowFeeRecipientKeyFields) => {
        return new BorrowFeeRecipientKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowFeeRecipientKeyReified {
    return BorrowFeeRecipientKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowFeeRecipientKey>> {
    return phantom(BorrowFeeRecipientKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowFeeRecipientKey>> {
    return BorrowFeeRecipientKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowFeeRecipientKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowFeeRecipientKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowFeeRecipientKey.instantiateBcs> {
    if (!BorrowFeeRecipientKey.cachedBcs) {
      BorrowFeeRecipientKey.cachedBcs = BorrowFeeRecipientKey.instantiateBcs()
    }
    return BorrowFeeRecipientKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowFeeRecipientKey {
    return BorrowFeeRecipientKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowFeeRecipientKey {
    if (!isBorrowFeeRecipientKey(item.type)) {
      throw new Error('not a BorrowFeeRecipientKey type')
    }

    return BorrowFeeRecipientKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): BorrowFeeRecipientKey {
    return BorrowFeeRecipientKey.fromFields(BorrowFeeRecipientKey.bcs.parse(data))
  }

  toJSONField(): BorrowFeeRecipientKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): BorrowFeeRecipientKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowFeeRecipientKey {
    return BorrowFeeRecipientKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowFeeRecipientKey {
    if (json.$typeName !== BorrowFeeRecipientKey.$typeName) {
      throw new Error(
        `not a BorrowFeeRecipientKey json object: expected '${BorrowFeeRecipientKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowFeeRecipientKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowFeeRecipientKey {
    if (!isBorrowFeeRecipientKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowFeeRecipientKey object`)
    }
    return BorrowFeeRecipientKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowFeeRecipientKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowFeeRecipientKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowFeeRecipientKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BorrowFeeRecipientKey object`,
      )
    }
    return BorrowFeeRecipientKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowFeeRecipientKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowFeeRecipientKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowFeeRecipientKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowFeeRecipientKey object`)
      }

      return BorrowFeeRecipientKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowFeeRecipientKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowFeeRecipientKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowFeeRecipientKey(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowFeeRecipientKey object`)
    }
    return BorrowFeeRecipientKey.fromBcs(object.content)
  }
}

/* ============================== SupplyLimitKey =============================== */

export function isSupplyLimitKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'market_dynamic_keys::SupplyLimitKey')
    }::market_dynamic_keys::SupplyLimitKey`
}

export interface SupplyLimitKeyFields {
  type: ToField<TypeName>
}

export type SupplyLimitKeyReified = Reified<SupplyLimitKey, SupplyLimitKeyFields>

export type SupplyLimitKeyJSONField = {
  type: string
}

export type SupplyLimitKeyJSON = {
  $typeName: typeof SupplyLimitKey.$typeName
  $typeArgs: []
} & SupplyLimitKeyJSONField

export class SupplyLimitKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::market_dynamic_keys::SupplyLimitKey` {
    return `${
      getTypeOrigin('protocol', 'market_dynamic_keys::SupplyLimitKey')
    }::market_dynamic_keys::SupplyLimitKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SupplyLimitKey.$typeName = SupplyLimitKey.$typeName
  readonly $fullTypeName: `${string}::market_dynamic_keys::SupplyLimitKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SupplyLimitKey.$isPhantom = SupplyLimitKey.$isPhantom

  readonly type: ToField<TypeName>

  private constructor(typeArgs: [], fields: SupplyLimitKeyFields) {
    this.$fullTypeName = composeSuiType(
      SupplyLimitKey.$typeName,
      ...typeArgs,
    ) as `${string}::market_dynamic_keys::SupplyLimitKey`
    this.$typeArgs = typeArgs

    this.type = fields.type
  }

  static reified(): SupplyLimitKeyReified {
    const reifiedBcs = SupplyLimitKey.bcs
    return {
      get typeName() {
        return SupplyLimitKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SupplyLimitKey.$typeName,
          ...[],
        ) as `${string}::market_dynamic_keys::SupplyLimitKey`
      },
      typeArgs: [] as [],
      isPhantom: SupplyLimitKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SupplyLimitKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SupplyLimitKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SupplyLimitKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SupplyLimitKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SupplyLimitKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SupplyLimitKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SupplyLimitKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SupplyLimitKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SupplyLimitKey.fetch(client, id),
      new: (fields: SupplyLimitKeyFields) => {
        return new SupplyLimitKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SupplyLimitKeyReified {
    return SupplyLimitKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SupplyLimitKey>> {
    return phantom(SupplyLimitKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SupplyLimitKey>> {
    return SupplyLimitKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SupplyLimitKey', {
      type: TypeName.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof SupplyLimitKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SupplyLimitKey.instantiateBcs> {
    if (!SupplyLimitKey.cachedBcs) {
      SupplyLimitKey.cachedBcs = SupplyLimitKey.instantiateBcs()
    }
    return SupplyLimitKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SupplyLimitKey {
    return SupplyLimitKey.reified().new({
      type: decodeFromFields(TypeName.reified(), fields.type),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SupplyLimitKey {
    if (!isSupplyLimitKey(item.type)) {
      throw new Error('not a SupplyLimitKey type')
    }

    return SupplyLimitKey.reified().new({
      type: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.type),
    })
  }

  static fromBcs(data: Uint8Array): SupplyLimitKey {
    return SupplyLimitKey.fromFields(SupplyLimitKey.bcs.parse(data))
  }

  toJSONField(): SupplyLimitKeyJSONField {
    return {
      type: this.type,
    }
  }

  toJSON(): SupplyLimitKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SupplyLimitKey {
    return SupplyLimitKey.reified().new({
      type: decodeFromJSONField(TypeName.reified(), field.type),
    })
  }

  static fromJSON(json: Record<string, any>): SupplyLimitKey {
    if (json.$typeName !== SupplyLimitKey.$typeName) {
      throw new Error(
        `not a SupplyLimitKey json object: expected '${SupplyLimitKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SupplyLimitKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SupplyLimitKey {
    if (!isSupplyLimitKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SupplyLimitKey object`)
    }
    return SupplyLimitKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SupplyLimitKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SupplyLimitKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSupplyLimitKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SupplyLimitKey object`)
    }
    return SupplyLimitKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SupplyLimitKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SupplyLimitKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSupplyLimitKey(data.bcs.type)) {
        throw new Error(`object at is not a SupplyLimitKey object`)
      }

      return SupplyLimitKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SupplyLimitKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SupplyLimitKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSupplyLimitKey(object.type)) {
      throw new Error(`object at id ${id} is not a SupplyLimitKey object`)
    }
    return SupplyLimitKey.fromBcs(object.content)
  }
}
