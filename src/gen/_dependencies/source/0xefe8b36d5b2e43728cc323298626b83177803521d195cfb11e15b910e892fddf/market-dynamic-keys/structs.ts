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
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { PKG_V4, PKG_V7 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== BorrowFeeKey =============================== */

export function isBorrowFeeKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::market_dynamic_keys::BorrowFeeKey`
}

export interface BorrowFeeKeyFields {
  type: ToField<TypeName>
}

export type BorrowFeeKeyReified = Reified<BorrowFeeKey, BorrowFeeKeyFields>

export class BorrowFeeKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::market_dynamic_keys::BorrowFeeKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BorrowFeeKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::market_dynamic_keys::BorrowFeeKey`
  readonly $typeArgs: []
  readonly $isPhantom = BorrowFeeKey.$isPhantom

  readonly type: ToField<TypeName>

  private constructor(typeArgs: [], fields: BorrowFeeKeyFields) {
    this.$fullTypeName = composeSuiType(
      BorrowFeeKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::market_dynamic_keys::BorrowFeeKey`
    this.$typeArgs = typeArgs

    this.type = fields.type
  }

  static reified(): BorrowFeeKeyReified {
    return {
      typeName: BorrowFeeKey.$typeName,
      fullTypeName: composeSuiType(
        BorrowFeeKey.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::market_dynamic_keys::BorrowFeeKey`,
      typeArgs: [] as [],
      isPhantom: BorrowFeeKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowFeeKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowFeeKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowFeeKey.fromBcs(data),
      bcs: BorrowFeeKey.bcs,
      fromJSONField: (field: any) => BorrowFeeKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowFeeKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => BorrowFeeKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowFeeKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BorrowFeeKey.fetch(client, id),
      new: (fields: BorrowFeeKeyFields) => {
        return new BorrowFeeKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BorrowFeeKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowFeeKey>> {
    return phantom(BorrowFeeKey.reified())
  }
  static get p() {
    return BorrowFeeKey.phantom()
  }

  static get bcs() {
    return bcs.struct('BorrowFeeKey', {
      type: TypeName.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): BorrowFeeKey {
    return BorrowFeeKey.reified().new({ type: decodeFromFields(TypeName.reified(), fields.type) })
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

  toJSONField() {
    return {
      type: this.type.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowFeeKey {
    return BorrowFeeKey.reified().new({ type: decodeFromJSONField(TypeName.reified(), field.type) })
  }

  static fromJSON(json: Record<string, any>): BorrowFeeKey {
    if (json.$typeName !== BorrowFeeKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BorrowFeeKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BorrowFeeKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowFeeKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowFeeKey object`)
    }
    return BorrowFeeKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BorrowFeeKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowFeeKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowFeeKey object`)
      }

      return BorrowFeeKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowFeeKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BorrowFeeKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BorrowFeeKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBorrowFeeKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BorrowFeeKey object`)
    }

    return BorrowFeeKey.fromSuiObjectData(res.data)
  }
}

/* ============================== BorrowFeeRecipientKey =============================== */

export function isBorrowFeeRecipientKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V4}::market_dynamic_keys::BorrowFeeRecipientKey`
}

export interface BorrowFeeRecipientKeyFields {
  dummyField: ToField<'bool'>
}

export type BorrowFeeRecipientKeyReified = Reified<
  BorrowFeeRecipientKey,
  BorrowFeeRecipientKeyFields
>

export class BorrowFeeRecipientKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V4}::market_dynamic_keys::BorrowFeeRecipientKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BorrowFeeRecipientKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V4}::market_dynamic_keys::BorrowFeeRecipientKey`
  readonly $typeArgs: []
  readonly $isPhantom = BorrowFeeRecipientKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BorrowFeeRecipientKeyFields) {
    this.$fullTypeName = composeSuiType(
      BorrowFeeRecipientKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V4}::market_dynamic_keys::BorrowFeeRecipientKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BorrowFeeRecipientKeyReified {
    return {
      typeName: BorrowFeeRecipientKey.$typeName,
      fullTypeName: composeSuiType(
        BorrowFeeRecipientKey.$typeName,
        ...[]
      ) as `${typeof PKG_V4}::market_dynamic_keys::BorrowFeeRecipientKey`,
      typeArgs: [] as [],
      isPhantom: BorrowFeeRecipientKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowFeeRecipientKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BorrowFeeRecipientKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowFeeRecipientKey.fromBcs(data),
      bcs: BorrowFeeRecipientKey.bcs,
      fromJSONField: (field: any) => BorrowFeeRecipientKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowFeeRecipientKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        BorrowFeeRecipientKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BorrowFeeRecipientKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BorrowFeeRecipientKey.fetch(client, id),
      new: (fields: BorrowFeeRecipientKeyFields) => {
        return new BorrowFeeRecipientKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BorrowFeeRecipientKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowFeeRecipientKey>> {
    return phantom(BorrowFeeRecipientKey.reified())
  }
  static get p() {
    return BorrowFeeRecipientKey.phantom()
  }

  static get bcs() {
    return bcs.struct('BorrowFeeRecipientKey', {
      dummy_field: bcs.bool(),
    })
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowFeeRecipientKey {
    return BorrowFeeRecipientKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowFeeRecipientKey {
    if (json.$typeName !== BorrowFeeRecipientKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BorrowFeeRecipientKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BorrowFeeRecipientKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowFeeRecipientKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BorrowFeeRecipientKey object`
      )
    }
    return BorrowFeeRecipientKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BorrowFeeRecipientKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowFeeRecipientKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowFeeRecipientKey object`)
      }

      return BorrowFeeRecipientKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowFeeRecipientKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BorrowFeeRecipientKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BorrowFeeRecipientKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBorrowFeeRecipientKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BorrowFeeRecipientKey object`)
    }

    return BorrowFeeRecipientKey.fromSuiObjectData(res.data)
  }
}

/* ============================== SupplyLimitKey =============================== */

export function isSupplyLimitKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V7}::market_dynamic_keys::SupplyLimitKey`
}

export interface SupplyLimitKeyFields {
  type: ToField<TypeName>
}

export type SupplyLimitKeyReified = Reified<SupplyLimitKey, SupplyLimitKeyFields>

export class SupplyLimitKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::market_dynamic_keys::SupplyLimitKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SupplyLimitKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::market_dynamic_keys::SupplyLimitKey`
  readonly $typeArgs: []
  readonly $isPhantom = SupplyLimitKey.$isPhantom

  readonly type: ToField<TypeName>

  private constructor(typeArgs: [], fields: SupplyLimitKeyFields) {
    this.$fullTypeName = composeSuiType(
      SupplyLimitKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::market_dynamic_keys::SupplyLimitKey`
    this.$typeArgs = typeArgs

    this.type = fields.type
  }

  static reified(): SupplyLimitKeyReified {
    return {
      typeName: SupplyLimitKey.$typeName,
      fullTypeName: composeSuiType(
        SupplyLimitKey.$typeName,
        ...[]
      ) as `${typeof PKG_V7}::market_dynamic_keys::SupplyLimitKey`,
      typeArgs: [] as [],
      isPhantom: SupplyLimitKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SupplyLimitKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SupplyLimitKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SupplyLimitKey.fromBcs(data),
      bcs: SupplyLimitKey.bcs,
      fromJSONField: (field: any) => SupplyLimitKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SupplyLimitKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SupplyLimitKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SupplyLimitKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SupplyLimitKey.fetch(client, id),
      new: (fields: SupplyLimitKeyFields) => {
        return new SupplyLimitKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SupplyLimitKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SupplyLimitKey>> {
    return phantom(SupplyLimitKey.reified())
  }
  static get p() {
    return SupplyLimitKey.phantom()
  }

  static get bcs() {
    return bcs.struct('SupplyLimitKey', {
      type: TypeName.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): SupplyLimitKey {
    return SupplyLimitKey.reified().new({ type: decodeFromFields(TypeName.reified(), fields.type) })
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

  toJSONField() {
    return {
      type: this.type.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SupplyLimitKey {
    return SupplyLimitKey.reified().new({
      type: decodeFromJSONField(TypeName.reified(), field.type),
    })
  }

  static fromJSON(json: Record<string, any>): SupplyLimitKey {
    if (json.$typeName !== SupplyLimitKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SupplyLimitKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SupplyLimitKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSupplyLimitKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SupplyLimitKey object`)
    }
    return SupplyLimitKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SupplyLimitKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSupplyLimitKey(data.bcs.type)) {
        throw new Error(`object at is not a SupplyLimitKey object`)
      }

      return SupplyLimitKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SupplyLimitKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SupplyLimitKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SupplyLimitKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSupplyLimitKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SupplyLimitKey object`)
    }

    return SupplyLimitKey.fromSuiObjectData(res.data)
  }
}
