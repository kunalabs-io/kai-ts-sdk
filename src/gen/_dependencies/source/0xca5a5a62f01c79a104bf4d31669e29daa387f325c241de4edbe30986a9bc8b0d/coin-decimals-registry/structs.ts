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
import { String } from '../../../../move-stdlib/ascii/structs'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { UID } from '../../../../sui/object/structs'
import { Table } from '../../../../sui/table/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== COIN_DECIMALS_REGISTRY =============================== */

export function isCOIN_DECIMALS_REGISTRY(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::coin_decimals_registry::COIN_DECIMALS_REGISTRY`
}

export interface COIN_DECIMALS_REGISTRYFields {
  dummyField: ToField<'bool'>
}

export type COIN_DECIMALS_REGISTRYReified = Reified<
  COIN_DECIMALS_REGISTRY,
  COIN_DECIMALS_REGISTRYFields
>

export class COIN_DECIMALS_REGISTRY implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::coin_decimals_registry::COIN_DECIMALS_REGISTRY`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = COIN_DECIMALS_REGISTRY.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::coin_decimals_registry::COIN_DECIMALS_REGISTRY`
  readonly $typeArgs: []
  readonly $isPhantom = COIN_DECIMALS_REGISTRY.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: COIN_DECIMALS_REGISTRYFields) {
    this.$fullTypeName = composeSuiType(
      COIN_DECIMALS_REGISTRY.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::coin_decimals_registry::COIN_DECIMALS_REGISTRY`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): COIN_DECIMALS_REGISTRYReified {
    return {
      typeName: COIN_DECIMALS_REGISTRY.$typeName,
      fullTypeName: composeSuiType(
        COIN_DECIMALS_REGISTRY.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::coin_decimals_registry::COIN_DECIMALS_REGISTRY`,
      typeArgs: [] as [],
      isPhantom: COIN_DECIMALS_REGISTRY.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => COIN_DECIMALS_REGISTRY.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        COIN_DECIMALS_REGISTRY.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => COIN_DECIMALS_REGISTRY.fromBcs(data),
      bcs: COIN_DECIMALS_REGISTRY.bcs,
      fromJSONField: (field: any) => COIN_DECIMALS_REGISTRY.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => COIN_DECIMALS_REGISTRY.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        COIN_DECIMALS_REGISTRY.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        COIN_DECIMALS_REGISTRY.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => COIN_DECIMALS_REGISTRY.fetch(client, id),
      new: (fields: COIN_DECIMALS_REGISTRYFields) => {
        return new COIN_DECIMALS_REGISTRY([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return COIN_DECIMALS_REGISTRY.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<COIN_DECIMALS_REGISTRY>> {
    return phantom(COIN_DECIMALS_REGISTRY.reified())
  }
  static get p() {
    return COIN_DECIMALS_REGISTRY.phantom()
  }

  static get bcs() {
    return bcs.struct('COIN_DECIMALS_REGISTRY', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): COIN_DECIMALS_REGISTRY {
    return COIN_DECIMALS_REGISTRY.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): COIN_DECIMALS_REGISTRY {
    if (!isCOIN_DECIMALS_REGISTRY(item.type)) {
      throw new Error('not a COIN_DECIMALS_REGISTRY type')
    }

    return COIN_DECIMALS_REGISTRY.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): COIN_DECIMALS_REGISTRY {
    return COIN_DECIMALS_REGISTRY.fromFields(COIN_DECIMALS_REGISTRY.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): COIN_DECIMALS_REGISTRY {
    return COIN_DECIMALS_REGISTRY.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): COIN_DECIMALS_REGISTRY {
    if (json.$typeName !== COIN_DECIMALS_REGISTRY.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return COIN_DECIMALS_REGISTRY.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): COIN_DECIMALS_REGISTRY {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCOIN_DECIMALS_REGISTRY(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a COIN_DECIMALS_REGISTRY object`
      )
    }
    return COIN_DECIMALS_REGISTRY.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): COIN_DECIMALS_REGISTRY {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCOIN_DECIMALS_REGISTRY(data.bcs.type)) {
        throw new Error(`object at is not a COIN_DECIMALS_REGISTRY object`)
      }

      return COIN_DECIMALS_REGISTRY.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return COIN_DECIMALS_REGISTRY.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<COIN_DECIMALS_REGISTRY> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching COIN_DECIMALS_REGISTRY object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCOIN_DECIMALS_REGISTRY(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a COIN_DECIMALS_REGISTRY object`)
    }

    return COIN_DECIMALS_REGISTRY.fromSuiObjectData(res.data)
  }
}

/* ============================== CoinDecimalsRegistry =============================== */

export function isCoinDecimalsRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::coin_decimals_registry::CoinDecimalsRegistry`
}

export interface CoinDecimalsRegistryFields {
  id: ToField<UID>
  table: ToField<Table<ToPhantom<TypeName>, 'u8'>>
}

export type CoinDecimalsRegistryReified = Reified<CoinDecimalsRegistry, CoinDecimalsRegistryFields>

export class CoinDecimalsRegistry implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::coin_decimals_registry::CoinDecimalsRegistry`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CoinDecimalsRegistry.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::coin_decimals_registry::CoinDecimalsRegistry`
  readonly $typeArgs: []
  readonly $isPhantom = CoinDecimalsRegistry.$isPhantom

  readonly id: ToField<UID>
  readonly table: ToField<Table<ToPhantom<TypeName>, 'u8'>>

  private constructor(typeArgs: [], fields: CoinDecimalsRegistryFields) {
    this.$fullTypeName = composeSuiType(
      CoinDecimalsRegistry.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::coin_decimals_registry::CoinDecimalsRegistry`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.table = fields.table
  }

  static reified(): CoinDecimalsRegistryReified {
    return {
      typeName: CoinDecimalsRegistry.$typeName,
      fullTypeName: composeSuiType(
        CoinDecimalsRegistry.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::coin_decimals_registry::CoinDecimalsRegistry`,
      typeArgs: [] as [],
      isPhantom: CoinDecimalsRegistry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CoinDecimalsRegistry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CoinDecimalsRegistry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CoinDecimalsRegistry.fromBcs(data),
      bcs: CoinDecimalsRegistry.bcs,
      fromJSONField: (field: any) => CoinDecimalsRegistry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CoinDecimalsRegistry.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CoinDecimalsRegistry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CoinDecimalsRegistry.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => CoinDecimalsRegistry.fetch(client, id),
      new: (fields: CoinDecimalsRegistryFields) => {
        return new CoinDecimalsRegistry([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CoinDecimalsRegistry.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CoinDecimalsRegistry>> {
    return phantom(CoinDecimalsRegistry.reified())
  }
  static get p() {
    return CoinDecimalsRegistry.phantom()
  }

  static get bcs() {
    return bcs.struct('CoinDecimalsRegistry', {
      id: UID.bcs,
      table: Table.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): CoinDecimalsRegistry {
    return CoinDecimalsRegistry.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      table: decodeFromFields(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('u8')),
        fields.table
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CoinDecimalsRegistry {
    if (!isCoinDecimalsRegistry(item.type)) {
      throw new Error('not a CoinDecimalsRegistry type')
    }

    return CoinDecimalsRegistry.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      table: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('u8')),
        item.fields.table
      ),
    })
  }

  static fromBcs(data: Uint8Array): CoinDecimalsRegistry {
    return CoinDecimalsRegistry.fromFields(CoinDecimalsRegistry.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      table: this.table.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CoinDecimalsRegistry {
    return CoinDecimalsRegistry.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      table: decodeFromJSONField(
        Table.reified(reified.phantom(TypeName.reified()), reified.phantom('u8')),
        field.table
      ),
    })
  }

  static fromJSON(json: Record<string, any>): CoinDecimalsRegistry {
    if (json.$typeName !== CoinDecimalsRegistry.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CoinDecimalsRegistry.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CoinDecimalsRegistry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCoinDecimalsRegistry(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CoinDecimalsRegistry object`
      )
    }
    return CoinDecimalsRegistry.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CoinDecimalsRegistry {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCoinDecimalsRegistry(data.bcs.type)) {
        throw new Error(`object at is not a CoinDecimalsRegistry object`)
      }

      return CoinDecimalsRegistry.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CoinDecimalsRegistry.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CoinDecimalsRegistry> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching CoinDecimalsRegistry object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCoinDecimalsRegistry(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CoinDecimalsRegistry object`)
    }

    return CoinDecimalsRegistry.fromSuiObjectData(res.data)
  }
}

/* ============================== CoinDecimalsRegistered =============================== */

export function isCoinDecimalsRegistered(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::coin_decimals_registry::CoinDecimalsRegistered`
}

export interface CoinDecimalsRegisteredFields {
  registry: ToField<'address'>
  coinType: ToField<String>
  decimals: ToField<'u8'>
}

export type CoinDecimalsRegisteredReified = Reified<
  CoinDecimalsRegistered,
  CoinDecimalsRegisteredFields
>

export class CoinDecimalsRegistered implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::coin_decimals_registry::CoinDecimalsRegistered`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CoinDecimalsRegistered.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::coin_decimals_registry::CoinDecimalsRegistered`
  readonly $typeArgs: []
  readonly $isPhantom = CoinDecimalsRegistered.$isPhantom

  readonly registry: ToField<'address'>
  readonly coinType: ToField<String>
  readonly decimals: ToField<'u8'>

  private constructor(typeArgs: [], fields: CoinDecimalsRegisteredFields) {
    this.$fullTypeName = composeSuiType(
      CoinDecimalsRegistered.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::coin_decimals_registry::CoinDecimalsRegistered`
    this.$typeArgs = typeArgs

    this.registry = fields.registry
    this.coinType = fields.coinType
    this.decimals = fields.decimals
  }

  static reified(): CoinDecimalsRegisteredReified {
    return {
      typeName: CoinDecimalsRegistered.$typeName,
      fullTypeName: composeSuiType(
        CoinDecimalsRegistered.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::coin_decimals_registry::CoinDecimalsRegistered`,
      typeArgs: [] as [],
      isPhantom: CoinDecimalsRegistered.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CoinDecimalsRegistered.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CoinDecimalsRegistered.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CoinDecimalsRegistered.fromBcs(data),
      bcs: CoinDecimalsRegistered.bcs,
      fromJSONField: (field: any) => CoinDecimalsRegistered.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CoinDecimalsRegistered.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CoinDecimalsRegistered.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CoinDecimalsRegistered.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => CoinDecimalsRegistered.fetch(client, id),
      new: (fields: CoinDecimalsRegisteredFields) => {
        return new CoinDecimalsRegistered([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CoinDecimalsRegistered.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CoinDecimalsRegistered>> {
    return phantom(CoinDecimalsRegistered.reified())
  }
  static get p() {
    return CoinDecimalsRegistered.phantom()
  }

  static get bcs() {
    return bcs.struct('CoinDecimalsRegistered', {
      registry: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      coin_type: String.bcs,
      decimals: bcs.u8(),
    })
  }

  static fromFields(fields: Record<string, any>): CoinDecimalsRegistered {
    return CoinDecimalsRegistered.reified().new({
      registry: decodeFromFields('address', fields.registry),
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      decimals: decodeFromFields('u8', fields.decimals),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CoinDecimalsRegistered {
    if (!isCoinDecimalsRegistered(item.type)) {
      throw new Error('not a CoinDecimalsRegistered type')
    }

    return CoinDecimalsRegistered.reified().new({
      registry: decodeFromFieldsWithTypes('address', item.fields.registry),
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      decimals: decodeFromFieldsWithTypes('u8', item.fields.decimals),
    })
  }

  static fromBcs(data: Uint8Array): CoinDecimalsRegistered {
    return CoinDecimalsRegistered.fromFields(CoinDecimalsRegistered.bcs.parse(data))
  }

  toJSONField() {
    return {
      registry: this.registry,
      coinType: this.coinType,
      decimals: this.decimals,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CoinDecimalsRegistered {
    return CoinDecimalsRegistered.reified().new({
      registry: decodeFromJSONField('address', field.registry),
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      decimals: decodeFromJSONField('u8', field.decimals),
    })
  }

  static fromJSON(json: Record<string, any>): CoinDecimalsRegistered {
    if (json.$typeName !== CoinDecimalsRegistered.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CoinDecimalsRegistered.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CoinDecimalsRegistered {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCoinDecimalsRegistered(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CoinDecimalsRegistered object`
      )
    }
    return CoinDecimalsRegistered.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CoinDecimalsRegistered {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCoinDecimalsRegistered(data.bcs.type)) {
        throw new Error(`object at is not a CoinDecimalsRegistered object`)
      }

      return CoinDecimalsRegistered.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CoinDecimalsRegistered.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CoinDecimalsRegistered> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching CoinDecimalsRegistered object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCoinDecimalsRegistered(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CoinDecimalsRegistered object`)
    }

    return CoinDecimalsRegistered.fromSuiObjectData(res.data)
  }
}
