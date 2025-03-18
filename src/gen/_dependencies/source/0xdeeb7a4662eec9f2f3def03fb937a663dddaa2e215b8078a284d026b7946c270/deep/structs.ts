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
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== DEEP =============================== */

export function isDEEP(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::deep::DEEP`
}

export interface DEEPFields {
  dummyField: ToField<'bool'>
}

export type DEEPReified = Reified<DEEP, DEEPFields>

export class DEEP implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::deep::DEEP`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DEEP.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::deep::DEEP`
  readonly $typeArgs: []
  readonly $isPhantom = DEEP.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: DEEPFields) {
    this.$fullTypeName = composeSuiType(
      DEEP.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::deep::DEEP`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): DEEPReified {
    return {
      typeName: DEEP.$typeName,
      fullTypeName: composeSuiType(DEEP.$typeName, ...[]) as `${typeof PKG_V1}::deep::DEEP`,
      typeArgs: [] as [],
      isPhantom: DEEP.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DEEP.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DEEP.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DEEP.fromBcs(data),
      bcs: DEEP.bcs,
      fromJSONField: (field: any) => DEEP.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DEEP.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DEEP.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DEEP.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DEEP.fetch(client, id),
      new: (fields: DEEPFields) => {
        return new DEEP([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DEEP.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DEEP>> {
    return phantom(DEEP.reified())
  }
  static get p() {
    return DEEP.phantom()
  }

  static get bcs() {
    return bcs.struct('DEEP', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): DEEP {
    return DEEP.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DEEP {
    if (!isDEEP(item.type)) {
      throw new Error('not a DEEP type')
    }

    return DEEP.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): DEEP {
    return DEEP.fromFields(DEEP.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DEEP {
    return DEEP.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): DEEP {
    if (json.$typeName !== DEEP.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DEEP.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DEEP {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDEEP(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DEEP object`)
    }
    return DEEP.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DEEP {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDEEP(data.bcs.type)) {
        throw new Error(`object at is not a DEEP object`)
      }

      return DEEP.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DEEP.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DEEP> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DEEP object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDEEP(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DEEP object`)
    }

    return DEEP.fromSuiObjectData(res.data)
  }
}

/* ============================== ProtectedTreasury =============================== */

export function isProtectedTreasury(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::deep::ProtectedTreasury`
}

export interface ProtectedTreasuryFields {
  id: ToField<UID>
}

export type ProtectedTreasuryReified = Reified<ProtectedTreasury, ProtectedTreasuryFields>

export class ProtectedTreasury implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::deep::ProtectedTreasury`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ProtectedTreasury.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::deep::ProtectedTreasury`
  readonly $typeArgs: []
  readonly $isPhantom = ProtectedTreasury.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: ProtectedTreasuryFields) {
    this.$fullTypeName = composeSuiType(
      ProtectedTreasury.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::deep::ProtectedTreasury`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): ProtectedTreasuryReified {
    return {
      typeName: ProtectedTreasury.$typeName,
      fullTypeName: composeSuiType(
        ProtectedTreasury.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::deep::ProtectedTreasury`,
      typeArgs: [] as [],
      isPhantom: ProtectedTreasury.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ProtectedTreasury.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ProtectedTreasury.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtectedTreasury.fromBcs(data),
      bcs: ProtectedTreasury.bcs,
      fromJSONField: (field: any) => ProtectedTreasury.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtectedTreasury.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ProtectedTreasury.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ProtectedTreasury.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ProtectedTreasury.fetch(client, id),
      new: (fields: ProtectedTreasuryFields) => {
        return new ProtectedTreasury([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ProtectedTreasury.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ProtectedTreasury>> {
    return phantom(ProtectedTreasury.reified())
  }
  static get p() {
    return ProtectedTreasury.phantom()
  }

  static get bcs() {
    return bcs.struct('ProtectedTreasury', {
      id: UID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): ProtectedTreasury {
    return ProtectedTreasury.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ProtectedTreasury {
    if (!isProtectedTreasury(item.type)) {
      throw new Error('not a ProtectedTreasury type')
    }

    return ProtectedTreasury.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): ProtectedTreasury {
    return ProtectedTreasury.fromFields(ProtectedTreasury.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ProtectedTreasury {
    return ProtectedTreasury.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): ProtectedTreasury {
    if (json.$typeName !== ProtectedTreasury.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ProtectedTreasury.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ProtectedTreasury {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isProtectedTreasury(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ProtectedTreasury object`)
    }
    return ProtectedTreasury.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ProtectedTreasury {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProtectedTreasury(data.bcs.type)) {
        throw new Error(`object at is not a ProtectedTreasury object`)
      }

      return ProtectedTreasury.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ProtectedTreasury.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ProtectedTreasury> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ProtectedTreasury object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isProtectedTreasury(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ProtectedTreasury object`)
    }

    return ProtectedTreasury.fromSuiObjectData(res.data)
  }
}

/* ============================== TreasuryCapKey =============================== */

export function isTreasuryCapKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::deep::TreasuryCapKey`
}

export interface TreasuryCapKeyFields {
  dummyField: ToField<'bool'>
}

export type TreasuryCapKeyReified = Reified<TreasuryCapKey, TreasuryCapKeyFields>

export class TreasuryCapKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::deep::TreasuryCapKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TreasuryCapKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::deep::TreasuryCapKey`
  readonly $typeArgs: []
  readonly $isPhantom = TreasuryCapKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: TreasuryCapKeyFields) {
    this.$fullTypeName = composeSuiType(
      TreasuryCapKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::deep::TreasuryCapKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): TreasuryCapKeyReified {
    return {
      typeName: TreasuryCapKey.$typeName,
      fullTypeName: composeSuiType(
        TreasuryCapKey.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::deep::TreasuryCapKey`,
      typeArgs: [] as [],
      isPhantom: TreasuryCapKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TreasuryCapKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TreasuryCapKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TreasuryCapKey.fromBcs(data),
      bcs: TreasuryCapKey.bcs,
      fromJSONField: (field: any) => TreasuryCapKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TreasuryCapKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TreasuryCapKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TreasuryCapKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TreasuryCapKey.fetch(client, id),
      new: (fields: TreasuryCapKeyFields) => {
        return new TreasuryCapKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TreasuryCapKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TreasuryCapKey>> {
    return phantom(TreasuryCapKey.reified())
  }
  static get p() {
    return TreasuryCapKey.phantom()
  }

  static get bcs() {
    return bcs.struct('TreasuryCapKey', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): TreasuryCapKey {
    return TreasuryCapKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TreasuryCapKey {
    if (!isTreasuryCapKey(item.type)) {
      throw new Error('not a TreasuryCapKey type')
    }

    return TreasuryCapKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): TreasuryCapKey {
    return TreasuryCapKey.fromFields(TreasuryCapKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TreasuryCapKey {
    return TreasuryCapKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): TreasuryCapKey {
    if (json.$typeName !== TreasuryCapKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TreasuryCapKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TreasuryCapKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTreasuryCapKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TreasuryCapKey object`)
    }
    return TreasuryCapKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TreasuryCapKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTreasuryCapKey(data.bcs.type)) {
        throw new Error(`object at is not a TreasuryCapKey object`)
      }

      return TreasuryCapKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TreasuryCapKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TreasuryCapKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TreasuryCapKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTreasuryCapKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TreasuryCapKey object`)
    }

    return TreasuryCapKey.fromSuiObjectData(res.data)
  }
}
