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
} from '../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../_framework/util'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'
import { DebtBag } from '../debt-bag/structs'
import { DebtRegistry, DebtShareBalance } from '../debt/structs'
import { EquityShareBalance, EquityTreasury } from '../equity/structs'
import { PKG_V1 } from '../index'
import { Piecewise } from '../piecewise/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== ACreatePool =============================== */

export function isACreatePool(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::ACreatePool`
}

export interface ACreatePoolFields {
  dummyField: ToField<'bool'>
}

export type ACreatePoolReified = Reified<ACreatePool, ACreatePoolFields>

export class ACreatePool implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::ACreatePool`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ACreatePool.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::ACreatePool`
  readonly $typeArgs: []
  readonly $isPhantom = ACreatePool.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ACreatePoolFields) {
    this.$fullTypeName = composeSuiType(
      ACreatePool.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::ACreatePool`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ACreatePoolReified {
    const reifiedBcs = ACreatePool.bcs
    return {
      typeName: ACreatePool.$typeName,
      fullTypeName: composeSuiType(
        ACreatePool.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::ACreatePool`,
      typeArgs: [] as [],
      isPhantom: ACreatePool.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ACreatePool.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ACreatePool.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ACreatePool.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ACreatePool.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ACreatePool.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ACreatePool.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ACreatePool.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ACreatePool.fetch(client, id),
      new: (fields: ACreatePoolFields) => {
        return new ACreatePool([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ACreatePool.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ACreatePool>> {
    return phantom(ACreatePool.reified())
  }
  static get p() {
    return ACreatePool.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ACreatePool', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ACreatePool.instantiateBcs> | null = null

  static get bcs() {
    if (!ACreatePool.cachedBcs) {
      ACreatePool.cachedBcs = ACreatePool.instantiateBcs()
    }
    return ACreatePool.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ACreatePool {
    return ACreatePool.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ACreatePool {
    if (!isACreatePool(item.type)) {
      throw new Error('not a ACreatePool type')
    }

    return ACreatePool.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ACreatePool {
    return ACreatePool.fromFields(ACreatePool.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ACreatePool {
    return ACreatePool.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): ACreatePool {
    if (json.$typeName !== ACreatePool.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ACreatePool.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ACreatePool {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isACreatePool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ACreatePool object`)
    }
    return ACreatePool.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ACreatePool {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isACreatePool(data.bcs.type)) {
        throw new Error(`object at is not a ACreatePool object`)
      }

      return ACreatePool.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ACreatePool.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ACreatePool> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ACreatePool object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isACreatePool(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ACreatePool object`)
    }

    return ACreatePool.fromSuiObjectData(res.data)
  }
}

/* ============================== AConfigLendFacil =============================== */

export function isAConfigLendFacil(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::AConfigLendFacil`
}

export interface AConfigLendFacilFields {
  dummyField: ToField<'bool'>
}

export type AConfigLendFacilReified = Reified<AConfigLendFacil, AConfigLendFacilFields>

export class AConfigLendFacil implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::AConfigLendFacil`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AConfigLendFacil.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::AConfigLendFacil`
  readonly $typeArgs: []
  readonly $isPhantom = AConfigLendFacil.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AConfigLendFacilFields) {
    this.$fullTypeName = composeSuiType(
      AConfigLendFacil.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::AConfigLendFacil`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AConfigLendFacilReified {
    const reifiedBcs = AConfigLendFacil.bcs
    return {
      typeName: AConfigLendFacil.$typeName,
      fullTypeName: composeSuiType(
        AConfigLendFacil.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::AConfigLendFacil`,
      typeArgs: [] as [],
      isPhantom: AConfigLendFacil.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AConfigLendFacil.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AConfigLendFacil.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AConfigLendFacil.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AConfigLendFacil.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AConfigLendFacil.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AConfigLendFacil.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AConfigLendFacil.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AConfigLendFacil.fetch(client, id),
      new: (fields: AConfigLendFacilFields) => {
        return new AConfigLendFacil([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AConfigLendFacil.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AConfigLendFacil>> {
    return phantom(AConfigLendFacil.reified())
  }
  static get p() {
    return AConfigLendFacil.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AConfigLendFacil', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AConfigLendFacil.instantiateBcs> | null = null

  static get bcs() {
    if (!AConfigLendFacil.cachedBcs) {
      AConfigLendFacil.cachedBcs = AConfigLendFacil.instantiateBcs()
    }
    return AConfigLendFacil.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AConfigLendFacil {
    return AConfigLendFacil.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AConfigLendFacil {
    if (!isAConfigLendFacil(item.type)) {
      throw new Error('not a AConfigLendFacil type')
    }

    return AConfigLendFacil.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AConfigLendFacil {
    return AConfigLendFacil.fromFields(AConfigLendFacil.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AConfigLendFacil {
    return AConfigLendFacil.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AConfigLendFacil {
    if (json.$typeName !== AConfigLendFacil.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AConfigLendFacil.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AConfigLendFacil {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAConfigLendFacil(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AConfigLendFacil object`)
    }
    return AConfigLendFacil.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AConfigLendFacil {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAConfigLendFacil(data.bcs.type)) {
        throw new Error(`object at is not a AConfigLendFacil object`)
      }

      return AConfigLendFacil.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AConfigLendFacil.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AConfigLendFacil> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AConfigLendFacil object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAConfigLendFacil(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AConfigLendFacil object`)
    }

    return AConfigLendFacil.fromSuiObjectData(res.data)
  }
}

/* ============================== AConfigFees =============================== */

export function isAConfigFees(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::AConfigFees`
}

export interface AConfigFeesFields {
  dummyField: ToField<'bool'>
}

export type AConfigFeesReified = Reified<AConfigFees, AConfigFeesFields>

export class AConfigFees implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::AConfigFees`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AConfigFees.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::AConfigFees`
  readonly $typeArgs: []
  readonly $isPhantom = AConfigFees.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AConfigFeesFields) {
    this.$fullTypeName = composeSuiType(
      AConfigFees.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::AConfigFees`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AConfigFeesReified {
    const reifiedBcs = AConfigFees.bcs
    return {
      typeName: AConfigFees.$typeName,
      fullTypeName: composeSuiType(
        AConfigFees.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::AConfigFees`,
      typeArgs: [] as [],
      isPhantom: AConfigFees.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AConfigFees.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AConfigFees.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AConfigFees.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AConfigFees.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AConfigFees.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AConfigFees.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AConfigFees.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AConfigFees.fetch(client, id),
      new: (fields: AConfigFeesFields) => {
        return new AConfigFees([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AConfigFees.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AConfigFees>> {
    return phantom(AConfigFees.reified())
  }
  static get p() {
    return AConfigFees.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AConfigFees', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AConfigFees.instantiateBcs> | null = null

  static get bcs() {
    if (!AConfigFees.cachedBcs) {
      AConfigFees.cachedBcs = AConfigFees.instantiateBcs()
    }
    return AConfigFees.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AConfigFees {
    return AConfigFees.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AConfigFees {
    if (!isAConfigFees(item.type)) {
      throw new Error('not a AConfigFees type')
    }

    return AConfigFees.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AConfigFees {
    return AConfigFees.fromFields(AConfigFees.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AConfigFees {
    return AConfigFees.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): AConfigFees {
    if (json.$typeName !== AConfigFees.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AConfigFees.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AConfigFees {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAConfigFees(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AConfigFees object`)
    }
    return AConfigFees.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AConfigFees {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAConfigFees(data.bcs.type)) {
        throw new Error(`object at is not a AConfigFees object`)
      }

      return AConfigFees.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AConfigFees.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AConfigFees> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AConfigFees object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAConfigFees(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AConfigFees object`)
    }

    return AConfigFees.fromSuiObjectData(res.data)
  }
}

/* ============================== ATakeFees =============================== */

export function isATakeFees(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::ATakeFees`
}

export interface ATakeFeesFields {
  dummyField: ToField<'bool'>
}

export type ATakeFeesReified = Reified<ATakeFees, ATakeFeesFields>

export class ATakeFees implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::ATakeFees`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ATakeFees.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::ATakeFees`
  readonly $typeArgs: []
  readonly $isPhantom = ATakeFees.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ATakeFeesFields) {
    this.$fullTypeName = composeSuiType(
      ATakeFees.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::ATakeFees`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ATakeFeesReified {
    const reifiedBcs = ATakeFees.bcs
    return {
      typeName: ATakeFees.$typeName,
      fullTypeName: composeSuiType(
        ATakeFees.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::ATakeFees`,
      typeArgs: [] as [],
      isPhantom: ATakeFees.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ATakeFees.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ATakeFees.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ATakeFees.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ATakeFees.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ATakeFees.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ATakeFees.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ATakeFees.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ATakeFees.fetch(client, id),
      new: (fields: ATakeFeesFields) => {
        return new ATakeFees([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ATakeFees.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ATakeFees>> {
    return phantom(ATakeFees.reified())
  }
  static get p() {
    return ATakeFees.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ATakeFees', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ATakeFees.instantiateBcs> | null = null

  static get bcs() {
    if (!ATakeFees.cachedBcs) {
      ATakeFees.cachedBcs = ATakeFees.instantiateBcs()
    }
    return ATakeFees.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ATakeFees {
    return ATakeFees.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ATakeFees {
    if (!isATakeFees(item.type)) {
      throw new Error('not a ATakeFees type')
    }

    return ATakeFees.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ATakeFees {
    return ATakeFees.fromFields(ATakeFees.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ATakeFees {
    return ATakeFees.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): ATakeFees {
    if (json.$typeName !== ATakeFees.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ATakeFees.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ATakeFees {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isATakeFees(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ATakeFees object`)
    }
    return ATakeFees.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ATakeFees {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isATakeFees(data.bcs.type)) {
        throw new Error(`object at is not a ATakeFees object`)
      }

      return ATakeFees.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ATakeFees.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ATakeFees> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ATakeFees object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isATakeFees(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ATakeFees object`)
    }

    return ATakeFees.fromSuiObjectData(res.data)
  }
}

/* ============================== ADeposit =============================== */

export function isADeposit(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::ADeposit`
}

export interface ADepositFields {
  dummyField: ToField<'bool'>
}

export type ADepositReified = Reified<ADeposit, ADepositFields>

export class ADeposit implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::ADeposit`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ADeposit.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::ADeposit`
  readonly $typeArgs: []
  readonly $isPhantom = ADeposit.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ADepositFields) {
    this.$fullTypeName = composeSuiType(
      ADeposit.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::ADeposit`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ADepositReified {
    const reifiedBcs = ADeposit.bcs
    return {
      typeName: ADeposit.$typeName,
      fullTypeName: composeSuiType(
        ADeposit.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::ADeposit`,
      typeArgs: [] as [],
      isPhantom: ADeposit.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ADeposit.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ADeposit.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ADeposit.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ADeposit.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ADeposit.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ADeposit.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ADeposit.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ADeposit.fetch(client, id),
      new: (fields: ADepositFields) => {
        return new ADeposit([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ADeposit.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ADeposit>> {
    return phantom(ADeposit.reified())
  }
  static get p() {
    return ADeposit.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ADeposit', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ADeposit.instantiateBcs> | null = null

  static get bcs() {
    if (!ADeposit.cachedBcs) {
      ADeposit.cachedBcs = ADeposit.instantiateBcs()
    }
    return ADeposit.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ADeposit {
    return ADeposit.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ADeposit {
    if (!isADeposit(item.type)) {
      throw new Error('not a ADeposit type')
    }

    return ADeposit.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ADeposit {
    return ADeposit.fromFields(ADeposit.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ADeposit {
    return ADeposit.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): ADeposit {
    if (json.$typeName !== ADeposit.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ADeposit.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ADeposit {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isADeposit(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ADeposit object`)
    }
    return ADeposit.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ADeposit {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isADeposit(data.bcs.type)) {
        throw new Error(`object at is not a ADeposit object`)
      }

      return ADeposit.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ADeposit.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ADeposit> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ADeposit object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isADeposit(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ADeposit object`)
    }

    return ADeposit.fromSuiObjectData(res.data)
  }
}

/* ============================== AMigrate =============================== */

export function isAMigrate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::AMigrate`
}

export interface AMigrateFields {
  dummyField: ToField<'bool'>
}

export type AMigrateReified = Reified<AMigrate, AMigrateFields>

export class AMigrate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::AMigrate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AMigrate.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::AMigrate`
  readonly $typeArgs: []
  readonly $isPhantom = AMigrate.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AMigrateFields) {
    this.$fullTypeName = composeSuiType(
      AMigrate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::AMigrate`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AMigrateReified {
    const reifiedBcs = AMigrate.bcs
    return {
      typeName: AMigrate.$typeName,
      fullTypeName: composeSuiType(
        AMigrate.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::AMigrate`,
      typeArgs: [] as [],
      isPhantom: AMigrate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AMigrate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AMigrate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AMigrate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AMigrate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AMigrate.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AMigrate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AMigrate.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AMigrate.fetch(client, id),
      new: (fields: AMigrateFields) => {
        return new AMigrate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AMigrate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AMigrate>> {
    return phantom(AMigrate.reified())
  }
  static get p() {
    return AMigrate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AMigrate', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AMigrate.instantiateBcs> | null = null

  static get bcs() {
    if (!AMigrate.cachedBcs) {
      AMigrate.cachedBcs = AMigrate.instantiateBcs()
    }
    return AMigrate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AMigrate {
    return AMigrate.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AMigrate {
    if (!isAMigrate(item.type)) {
      throw new Error('not a AMigrate type')
    }

    return AMigrate.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AMigrate {
    return AMigrate.fromFields(AMigrate.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AMigrate {
    return AMigrate.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): AMigrate {
    if (json.$typeName !== AMigrate.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AMigrate.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AMigrate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAMigrate(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AMigrate object`)
    }
    return AMigrate.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AMigrate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAMigrate(data.bcs.type)) {
        throw new Error(`object at is not a AMigrate object`)
      }

      return AMigrate.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AMigrate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AMigrate> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AMigrate object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAMigrate(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AMigrate object`)
    }

    return AMigrate.fromSuiObjectData(res.data)
  }
}

/* ============================== SupplyInfo =============================== */

export function isSupplyInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::SupplyInfo`
}

export interface SupplyInfoFields {
  supplyPoolId: ToField<ID>
  deposited: ToField<'u64'>
  shareBalance: ToField<'u64'>
}

export type SupplyInfoReified = Reified<SupplyInfo, SupplyInfoFields>

export class SupplyInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::SupplyInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SupplyInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::SupplyInfo`
  readonly $typeArgs: []
  readonly $isPhantom = SupplyInfo.$isPhantom

  readonly supplyPoolId: ToField<ID>
  readonly deposited: ToField<'u64'>
  readonly shareBalance: ToField<'u64'>

  private constructor(typeArgs: [], fields: SupplyInfoFields) {
    this.$fullTypeName = composeSuiType(
      SupplyInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::SupplyInfo`
    this.$typeArgs = typeArgs

    this.supplyPoolId = fields.supplyPoolId
    this.deposited = fields.deposited
    this.shareBalance = fields.shareBalance
  }

  static reified(): SupplyInfoReified {
    const reifiedBcs = SupplyInfo.bcs
    return {
      typeName: SupplyInfo.$typeName,
      fullTypeName: composeSuiType(
        SupplyInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::SupplyInfo`,
      typeArgs: [] as [],
      isPhantom: SupplyInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SupplyInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SupplyInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SupplyInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SupplyInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SupplyInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SupplyInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SupplyInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SupplyInfo.fetch(client, id),
      new: (fields: SupplyInfoFields) => {
        return new SupplyInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SupplyInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SupplyInfo>> {
    return phantom(SupplyInfo.reified())
  }
  static get p() {
    return SupplyInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SupplyInfo', {
      supply_pool_id: ID.bcs,
      deposited: bcs.u64(),
      share_balance: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SupplyInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!SupplyInfo.cachedBcs) {
      SupplyInfo.cachedBcs = SupplyInfo.instantiateBcs()
    }
    return SupplyInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SupplyInfo {
    return SupplyInfo.reified().new({
      supplyPoolId: decodeFromFields(ID.reified(), fields.supply_pool_id),
      deposited: decodeFromFields('u64', fields.deposited),
      shareBalance: decodeFromFields('u64', fields.share_balance),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SupplyInfo {
    if (!isSupplyInfo(item.type)) {
      throw new Error('not a SupplyInfo type')
    }

    return SupplyInfo.reified().new({
      supplyPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.supply_pool_id),
      deposited: decodeFromFieldsWithTypes('u64', item.fields.deposited),
      shareBalance: decodeFromFieldsWithTypes('u64', item.fields.share_balance),
    })
  }

  static fromBcs(data: Uint8Array): SupplyInfo {
    return SupplyInfo.fromFields(SupplyInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      supplyPoolId: this.supplyPoolId,
      deposited: this.deposited.toString(),
      shareBalance: this.shareBalance.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SupplyInfo {
    return SupplyInfo.reified().new({
      supplyPoolId: decodeFromJSONField(ID.reified(), field.supplyPoolId),
      deposited: decodeFromJSONField('u64', field.deposited),
      shareBalance: decodeFromJSONField('u64', field.shareBalance),
    })
  }

  static fromJSON(json: Record<string, any>): SupplyInfo {
    if (json.$typeName !== SupplyInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SupplyInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SupplyInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSupplyInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SupplyInfo object`)
    }
    return SupplyInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SupplyInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSupplyInfo(data.bcs.type)) {
        throw new Error(`object at is not a SupplyInfo object`)
      }

      return SupplyInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SupplyInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SupplyInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SupplyInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSupplyInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SupplyInfo object`)
    }

    return SupplyInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== WithdrawInfo =============================== */

export function isWithdrawInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::WithdrawInfo`
}

export interface WithdrawInfoFields {
  supplyPoolId: ToField<ID>
  shareBalance: ToField<'u64'>
  withdrawn: ToField<'u64'>
}

export type WithdrawInfoReified = Reified<WithdrawInfo, WithdrawInfoFields>

export class WithdrawInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::WithdrawInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = WithdrawInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::WithdrawInfo`
  readonly $typeArgs: []
  readonly $isPhantom = WithdrawInfo.$isPhantom

  readonly supplyPoolId: ToField<ID>
  readonly shareBalance: ToField<'u64'>
  readonly withdrawn: ToField<'u64'>

  private constructor(typeArgs: [], fields: WithdrawInfoFields) {
    this.$fullTypeName = composeSuiType(
      WithdrawInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::WithdrawInfo`
    this.$typeArgs = typeArgs

    this.supplyPoolId = fields.supplyPoolId
    this.shareBalance = fields.shareBalance
    this.withdrawn = fields.withdrawn
  }

  static reified(): WithdrawInfoReified {
    const reifiedBcs = WithdrawInfo.bcs
    return {
      typeName: WithdrawInfo.$typeName,
      fullTypeName: composeSuiType(
        WithdrawInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::WithdrawInfo`,
      typeArgs: [] as [],
      isPhantom: WithdrawInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WithdrawInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WithdrawInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WithdrawInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WithdrawInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WithdrawInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => WithdrawInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WithdrawInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => WithdrawInfo.fetch(client, id),
      new: (fields: WithdrawInfoFields) => {
        return new WithdrawInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return WithdrawInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WithdrawInfo>> {
    return phantom(WithdrawInfo.reified())
  }
  static get p() {
    return WithdrawInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WithdrawInfo', {
      supply_pool_id: ID.bcs,
      share_balance: bcs.u64(),
      withdrawn: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof WithdrawInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!WithdrawInfo.cachedBcs) {
      WithdrawInfo.cachedBcs = WithdrawInfo.instantiateBcs()
    }
    return WithdrawInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WithdrawInfo {
    return WithdrawInfo.reified().new({
      supplyPoolId: decodeFromFields(ID.reified(), fields.supply_pool_id),
      shareBalance: decodeFromFields('u64', fields.share_balance),
      withdrawn: decodeFromFields('u64', fields.withdrawn),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WithdrawInfo {
    if (!isWithdrawInfo(item.type)) {
      throw new Error('not a WithdrawInfo type')
    }

    return WithdrawInfo.reified().new({
      supplyPoolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.supply_pool_id),
      shareBalance: decodeFromFieldsWithTypes('u64', item.fields.share_balance),
      withdrawn: decodeFromFieldsWithTypes('u64', item.fields.withdrawn),
    })
  }

  static fromBcs(data: Uint8Array): WithdrawInfo {
    return WithdrawInfo.fromFields(WithdrawInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      supplyPoolId: this.supplyPoolId,
      shareBalance: this.shareBalance.toString(),
      withdrawn: this.withdrawn.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WithdrawInfo {
    return WithdrawInfo.reified().new({
      supplyPoolId: decodeFromJSONField(ID.reified(), field.supplyPoolId),
      shareBalance: decodeFromJSONField('u64', field.shareBalance),
      withdrawn: decodeFromJSONField('u64', field.withdrawn),
    })
  }

  static fromJSON(json: Record<string, any>): WithdrawInfo {
    if (json.$typeName !== WithdrawInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return WithdrawInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): WithdrawInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWithdrawInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WithdrawInfo object`)
    }
    return WithdrawInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): WithdrawInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWithdrawInfo(data.bcs.type)) {
        throw new Error(`object at is not a WithdrawInfo object`)
      }

      return WithdrawInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WithdrawInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<WithdrawInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching WithdrawInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isWithdrawInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a WithdrawInfo object`)
    }

    return WithdrawInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== LendFacilCap =============================== */

export function isLendFacilCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::LendFacilCap`
}

export interface LendFacilCapFields {
  id: ToField<UID>
}

export type LendFacilCapReified = Reified<LendFacilCap, LendFacilCapFields>

export class LendFacilCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::LendFacilCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LendFacilCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::LendFacilCap`
  readonly $typeArgs: []
  readonly $isPhantom = LendFacilCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: LendFacilCapFields) {
    this.$fullTypeName = composeSuiType(
      LendFacilCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::LendFacilCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): LendFacilCapReified {
    const reifiedBcs = LendFacilCap.bcs
    return {
      typeName: LendFacilCap.$typeName,
      fullTypeName: composeSuiType(
        LendFacilCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::LendFacilCap`,
      typeArgs: [] as [],
      isPhantom: LendFacilCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LendFacilCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LendFacilCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LendFacilCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LendFacilCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LendFacilCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => LendFacilCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LendFacilCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => LendFacilCap.fetch(client, id),
      new: (fields: LendFacilCapFields) => {
        return new LendFacilCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LendFacilCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LendFacilCap>> {
    return phantom(LendFacilCap.reified())
  }
  static get p() {
    return LendFacilCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LendFacilCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof LendFacilCap.instantiateBcs> | null = null

  static get bcs() {
    if (!LendFacilCap.cachedBcs) {
      LendFacilCap.cachedBcs = LendFacilCap.instantiateBcs()
    }
    return LendFacilCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LendFacilCap {
    return LendFacilCap.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LendFacilCap {
    if (!isLendFacilCap(item.type)) {
      throw new Error('not a LendFacilCap type')
    }

    return LendFacilCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): LendFacilCap {
    return LendFacilCap.fromFields(LendFacilCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LendFacilCap {
    return LendFacilCap.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): LendFacilCap {
    if (json.$typeName !== LendFacilCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return LendFacilCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LendFacilCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLendFacilCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LendFacilCap object`)
    }
    return LendFacilCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LendFacilCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLendFacilCap(data.bcs.type)) {
        throw new Error(`object at is not a LendFacilCap object`)
      }

      return LendFacilCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LendFacilCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LendFacilCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching LendFacilCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLendFacilCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a LendFacilCap object`)
    }

    return LendFacilCap.fromSuiObjectData(res.data)
  }
}

/* ============================== LendFacilInfo =============================== */

export function isLendFacilInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::supply_pool::LendFacilInfo` + '<')
}

export interface LendFacilInfoFields<ST extends PhantomTypeArgument> {
  interestModel: ToField<Piecewise>
  debtRegistry: ToField<DebtRegistry<ST>>
  maxLiabilityOutstanding: ToField<'u64'>
  maxUtilizationBps: ToField<'u64'>
}

export type LendFacilInfoReified<ST extends PhantomTypeArgument> = Reified<
  LendFacilInfo<ST>,
  LendFacilInfoFields<ST>
>

export class LendFacilInfo<ST extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::LendFacilInfo`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = LendFacilInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::LendFacilInfo<${PhantomToTypeStr<ST>}>`
  readonly $typeArgs: [PhantomToTypeStr<ST>]
  readonly $isPhantom = LendFacilInfo.$isPhantom

  readonly interestModel: ToField<Piecewise>
  readonly debtRegistry: ToField<DebtRegistry<ST>>
  readonly maxLiabilityOutstanding: ToField<'u64'>
  readonly maxUtilizationBps: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<ST>], fields: LendFacilInfoFields<ST>) {
    this.$fullTypeName = composeSuiType(
      LendFacilInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::LendFacilInfo<${PhantomToTypeStr<ST>}>`
    this.$typeArgs = typeArgs

    this.interestModel = fields.interestModel
    this.debtRegistry = fields.debtRegistry
    this.maxLiabilityOutstanding = fields.maxLiabilityOutstanding
    this.maxUtilizationBps = fields.maxUtilizationBps
  }

  static reified<ST extends PhantomReified<PhantomTypeArgument>>(
    ST: ST
  ): LendFacilInfoReified<ToPhantomTypeArgument<ST>> {
    const reifiedBcs = LendFacilInfo.bcs
    return {
      typeName: LendFacilInfo.$typeName,
      fullTypeName: composeSuiType(
        LendFacilInfo.$typeName,
        ...[extractType(ST)]
      ) as `${typeof PKG_V1}::supply_pool::LendFacilInfo<${PhantomToTypeStr<ToPhantomTypeArgument<ST>>}>`,
      typeArgs: [extractType(ST)] as [PhantomToTypeStr<ToPhantomTypeArgument<ST>>],
      isPhantom: LendFacilInfo.$isPhantom,
      reifiedTypeArgs: [ST],
      fromFields: (fields: Record<string, any>) => LendFacilInfo.fromFields(ST, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LendFacilInfo.fromFieldsWithTypes(ST, item),
      fromBcs: (data: Uint8Array) => LendFacilInfo.fromFields(ST, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LendFacilInfo.fromJSONField(ST, field),
      fromJSON: (json: Record<string, any>) => LendFacilInfo.fromJSON(ST, json),
      fromSuiParsedData: (content: SuiParsedData) => LendFacilInfo.fromSuiParsedData(ST, content),
      fromSuiObjectData: (content: SuiObjectData) => LendFacilInfo.fromSuiObjectData(ST, content),
      fetch: async (client: SuiClient, id: string) => LendFacilInfo.fetch(client, ST, id),
      new: (fields: LendFacilInfoFields<ToPhantomTypeArgument<ST>>) => {
        return new LendFacilInfo([extractType(ST)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LendFacilInfo.reified
  }

  static phantom<ST extends PhantomReified<PhantomTypeArgument>>(
    ST: ST
  ): PhantomReified<ToTypeStr<LendFacilInfo<ToPhantomTypeArgument<ST>>>> {
    return phantom(LendFacilInfo.reified(ST))
  }
  static get p() {
    return LendFacilInfo.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('LendFacilInfo', {
      interest_model: Piecewise.bcs,
      debt_registry: DebtRegistry.bcs,
      max_liability_outstanding: bcs.u64(),
      max_utilization_bps: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof LendFacilInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!LendFacilInfo.cachedBcs) {
      LendFacilInfo.cachedBcs = LendFacilInfo.instantiateBcs()
    }
    return LendFacilInfo.cachedBcs
  }

  static fromFields<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    fields: Record<string, any>
  ): LendFacilInfo<ToPhantomTypeArgument<ST>> {
    return LendFacilInfo.reified(typeArg).new({
      interestModel: decodeFromFields(Piecewise.reified(), fields.interest_model),
      debtRegistry: decodeFromFields(DebtRegistry.reified(typeArg), fields.debt_registry),
      maxLiabilityOutstanding: decodeFromFields('u64', fields.max_liability_outstanding),
      maxUtilizationBps: decodeFromFields('u64', fields.max_utilization_bps),
    })
  }

  static fromFieldsWithTypes<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    item: FieldsWithTypes
  ): LendFacilInfo<ToPhantomTypeArgument<ST>> {
    if (!isLendFacilInfo(item.type)) {
      throw new Error('not a LendFacilInfo type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return LendFacilInfo.reified(typeArg).new({
      interestModel: decodeFromFieldsWithTypes(Piecewise.reified(), item.fields.interest_model),
      debtRegistry: decodeFromFieldsWithTypes(
        DebtRegistry.reified(typeArg),
        item.fields.debt_registry
      ),
      maxLiabilityOutstanding: decodeFromFieldsWithTypes(
        'u64',
        item.fields.max_liability_outstanding
      ),
      maxUtilizationBps: decodeFromFieldsWithTypes('u64', item.fields.max_utilization_bps),
    })
  }

  static fromBcs<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    data: Uint8Array
  ): LendFacilInfo<ToPhantomTypeArgument<ST>> {
    return LendFacilInfo.fromFields(typeArg, LendFacilInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      interestModel: this.interestModel.toJSONField(),
      debtRegistry: this.debtRegistry.toJSONField(),
      maxLiabilityOutstanding: this.maxLiabilityOutstanding.toString(),
      maxUtilizationBps: this.maxUtilizationBps.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    field: any
  ): LendFacilInfo<ToPhantomTypeArgument<ST>> {
    return LendFacilInfo.reified(typeArg).new({
      interestModel: decodeFromJSONField(Piecewise.reified(), field.interestModel),
      debtRegistry: decodeFromJSONField(DebtRegistry.reified(typeArg), field.debtRegistry),
      maxLiabilityOutstanding: decodeFromJSONField('u64', field.maxLiabilityOutstanding),
      maxUtilizationBps: decodeFromJSONField('u64', field.maxUtilizationBps),
    })
  }

  static fromJSON<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    json: Record<string, any>
  ): LendFacilInfo<ToPhantomTypeArgument<ST>> {
    if (json.$typeName !== LendFacilInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(LendFacilInfo.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return LendFacilInfo.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    content: SuiParsedData
  ): LendFacilInfo<ToPhantomTypeArgument<ST>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLendFacilInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LendFacilInfo object`)
    }
    return LendFacilInfo.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    data: SuiObjectData
  ): LendFacilInfo<ToPhantomTypeArgument<ST>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLendFacilInfo(data.bcs.type)) {
        throw new Error(`object at is not a LendFacilInfo object`)
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

      return LendFacilInfo.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LendFacilInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<ST extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: ST,
    id: string
  ): Promise<LendFacilInfo<ToPhantomTypeArgument<ST>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching LendFacilInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLendFacilInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a LendFacilInfo object`)
    }

    return LendFacilInfo.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== FacilDebtShare =============================== */

export function isFacilDebtShare(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::supply_pool::FacilDebtShare` + '<')
}

export interface FacilDebtShareFields<ST extends PhantomTypeArgument> {
  facilId: ToField<ID>
  inner: ToField<DebtShareBalance<ST>>
}

export type FacilDebtShareReified<ST extends PhantomTypeArgument> = Reified<
  FacilDebtShare<ST>,
  FacilDebtShareFields<ST>
>

export class FacilDebtShare<ST extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::FacilDebtShare`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = FacilDebtShare.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::FacilDebtShare<${PhantomToTypeStr<ST>}>`
  readonly $typeArgs: [PhantomToTypeStr<ST>]
  readonly $isPhantom = FacilDebtShare.$isPhantom

  readonly facilId: ToField<ID>
  readonly inner: ToField<DebtShareBalance<ST>>

  private constructor(typeArgs: [PhantomToTypeStr<ST>], fields: FacilDebtShareFields<ST>) {
    this.$fullTypeName = composeSuiType(
      FacilDebtShare.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::FacilDebtShare<${PhantomToTypeStr<ST>}>`
    this.$typeArgs = typeArgs

    this.facilId = fields.facilId
    this.inner = fields.inner
  }

  static reified<ST extends PhantomReified<PhantomTypeArgument>>(
    ST: ST
  ): FacilDebtShareReified<ToPhantomTypeArgument<ST>> {
    const reifiedBcs = FacilDebtShare.bcs
    return {
      typeName: FacilDebtShare.$typeName,
      fullTypeName: composeSuiType(
        FacilDebtShare.$typeName,
        ...[extractType(ST)]
      ) as `${typeof PKG_V1}::supply_pool::FacilDebtShare<${PhantomToTypeStr<ToPhantomTypeArgument<ST>>}>`,
      typeArgs: [extractType(ST)] as [PhantomToTypeStr<ToPhantomTypeArgument<ST>>],
      isPhantom: FacilDebtShare.$isPhantom,
      reifiedTypeArgs: [ST],
      fromFields: (fields: Record<string, any>) => FacilDebtShare.fromFields(ST, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FacilDebtShare.fromFieldsWithTypes(ST, item),
      fromBcs: (data: Uint8Array) => FacilDebtShare.fromFields(ST, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FacilDebtShare.fromJSONField(ST, field),
      fromJSON: (json: Record<string, any>) => FacilDebtShare.fromJSON(ST, json),
      fromSuiParsedData: (content: SuiParsedData) => FacilDebtShare.fromSuiParsedData(ST, content),
      fromSuiObjectData: (content: SuiObjectData) => FacilDebtShare.fromSuiObjectData(ST, content),
      fetch: async (client: SuiClient, id: string) => FacilDebtShare.fetch(client, ST, id),
      new: (fields: FacilDebtShareFields<ToPhantomTypeArgument<ST>>) => {
        return new FacilDebtShare([extractType(ST)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return FacilDebtShare.reified
  }

  static phantom<ST extends PhantomReified<PhantomTypeArgument>>(
    ST: ST
  ): PhantomReified<ToTypeStr<FacilDebtShare<ToPhantomTypeArgument<ST>>>> {
    return phantom(FacilDebtShare.reified(ST))
  }
  static get p() {
    return FacilDebtShare.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('FacilDebtShare', {
      facil_id: ID.bcs,
      inner: DebtShareBalance.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof FacilDebtShare.instantiateBcs> | null = null

  static get bcs() {
    if (!FacilDebtShare.cachedBcs) {
      FacilDebtShare.cachedBcs = FacilDebtShare.instantiateBcs()
    }
    return FacilDebtShare.cachedBcs
  }

  static fromFields<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    fields: Record<string, any>
  ): FacilDebtShare<ToPhantomTypeArgument<ST>> {
    return FacilDebtShare.reified(typeArg).new({
      facilId: decodeFromFields(ID.reified(), fields.facil_id),
      inner: decodeFromFields(DebtShareBalance.reified(typeArg), fields.inner),
    })
  }

  static fromFieldsWithTypes<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    item: FieldsWithTypes
  ): FacilDebtShare<ToPhantomTypeArgument<ST>> {
    if (!isFacilDebtShare(item.type)) {
      throw new Error('not a FacilDebtShare type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return FacilDebtShare.reified(typeArg).new({
      facilId: decodeFromFieldsWithTypes(ID.reified(), item.fields.facil_id),
      inner: decodeFromFieldsWithTypes(DebtShareBalance.reified(typeArg), item.fields.inner),
    })
  }

  static fromBcs<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    data: Uint8Array
  ): FacilDebtShare<ToPhantomTypeArgument<ST>> {
    return FacilDebtShare.fromFields(typeArg, FacilDebtShare.bcs.parse(data))
  }

  toJSONField() {
    return {
      facilId: this.facilId,
      inner: this.inner.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    field: any
  ): FacilDebtShare<ToPhantomTypeArgument<ST>> {
    return FacilDebtShare.reified(typeArg).new({
      facilId: decodeFromJSONField(ID.reified(), field.facilId),
      inner: decodeFromJSONField(DebtShareBalance.reified(typeArg), field.inner),
    })
  }

  static fromJSON<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    json: Record<string, any>
  ): FacilDebtShare<ToPhantomTypeArgument<ST>> {
    if (json.$typeName !== FacilDebtShare.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(FacilDebtShare.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return FacilDebtShare.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    content: SuiParsedData
  ): FacilDebtShare<ToPhantomTypeArgument<ST>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFacilDebtShare(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FacilDebtShare object`)
    }
    return FacilDebtShare.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    data: SuiObjectData
  ): FacilDebtShare<ToPhantomTypeArgument<ST>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFacilDebtShare(data.bcs.type)) {
        throw new Error(`object at is not a FacilDebtShare object`)
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

      return FacilDebtShare.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FacilDebtShare.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<ST extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: ST,
    id: string
  ): Promise<FacilDebtShare<ToPhantomTypeArgument<ST>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching FacilDebtShare object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFacilDebtShare(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a FacilDebtShare object`)
    }

    return FacilDebtShare.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== FacilDebtBag =============================== */

export function isFacilDebtBag(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::supply_pool::FacilDebtBag`
}

export interface FacilDebtBagFields {
  id: ToField<UID>
  facilId: ToField<ID>
  inner: ToField<DebtBag>
}

export type FacilDebtBagReified = Reified<FacilDebtBag, FacilDebtBagFields>

export class FacilDebtBag implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::FacilDebtBag`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = FacilDebtBag.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::FacilDebtBag`
  readonly $typeArgs: []
  readonly $isPhantom = FacilDebtBag.$isPhantom

  readonly id: ToField<UID>
  readonly facilId: ToField<ID>
  readonly inner: ToField<DebtBag>

  private constructor(typeArgs: [], fields: FacilDebtBagFields) {
    this.$fullTypeName = composeSuiType(
      FacilDebtBag.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::FacilDebtBag`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.facilId = fields.facilId
    this.inner = fields.inner
  }

  static reified(): FacilDebtBagReified {
    const reifiedBcs = FacilDebtBag.bcs
    return {
      typeName: FacilDebtBag.$typeName,
      fullTypeName: composeSuiType(
        FacilDebtBag.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::supply_pool::FacilDebtBag`,
      typeArgs: [] as [],
      isPhantom: FacilDebtBag.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FacilDebtBag.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FacilDebtBag.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FacilDebtBag.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FacilDebtBag.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FacilDebtBag.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => FacilDebtBag.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FacilDebtBag.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => FacilDebtBag.fetch(client, id),
      new: (fields: FacilDebtBagFields) => {
        return new FacilDebtBag([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return FacilDebtBag.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FacilDebtBag>> {
    return phantom(FacilDebtBag.reified())
  }
  static get p() {
    return FacilDebtBag.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FacilDebtBag', {
      id: UID.bcs,
      facil_id: ID.bcs,
      inner: DebtBag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof FacilDebtBag.instantiateBcs> | null = null

  static get bcs() {
    if (!FacilDebtBag.cachedBcs) {
      FacilDebtBag.cachedBcs = FacilDebtBag.instantiateBcs()
    }
    return FacilDebtBag.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FacilDebtBag {
    return FacilDebtBag.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      facilId: decodeFromFields(ID.reified(), fields.facil_id),
      inner: decodeFromFields(DebtBag.reified(), fields.inner),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FacilDebtBag {
    if (!isFacilDebtBag(item.type)) {
      throw new Error('not a FacilDebtBag type')
    }

    return FacilDebtBag.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      facilId: decodeFromFieldsWithTypes(ID.reified(), item.fields.facil_id),
      inner: decodeFromFieldsWithTypes(DebtBag.reified(), item.fields.inner),
    })
  }

  static fromBcs(data: Uint8Array): FacilDebtBag {
    return FacilDebtBag.fromFields(FacilDebtBag.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      facilId: this.facilId,
      inner: this.inner.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FacilDebtBag {
    return FacilDebtBag.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      facilId: decodeFromJSONField(ID.reified(), field.facilId),
      inner: decodeFromJSONField(DebtBag.reified(), field.inner),
    })
  }

  static fromJSON(json: Record<string, any>): FacilDebtBag {
    if (json.$typeName !== FacilDebtBag.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return FacilDebtBag.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): FacilDebtBag {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFacilDebtBag(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FacilDebtBag object`)
    }
    return FacilDebtBag.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): FacilDebtBag {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFacilDebtBag(data.bcs.type)) {
        throw new Error(`object at is not a FacilDebtBag object`)
      }

      return FacilDebtBag.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FacilDebtBag.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<FacilDebtBag> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching FacilDebtBag object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFacilDebtBag(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a FacilDebtBag object`)
    }

    return FacilDebtBag.fromSuiObjectData(res.data)
  }
}

/* ============================== SupplyPool =============================== */

export function isSupplyPool(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::supply_pool::SupplyPool` + '<')
}

export interface SupplyPoolFields<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> {
  id: ToField<UID>
  availableBalance: ToField<Balance<T>>
  interestFeeBps: ToField<'u16'>
  debtInfo: ToField<VecMap<ID, LendFacilInfo<ST>>>
  totalLiabilitiesX64: ToField<'u128'>
  lastUpdateTsSec: ToField<'u64'>
  supplyEquity: ToField<EquityTreasury<ST>>
  collectedFees: ToField<EquityShareBalance<ST>>
  version: ToField<'u16'>
}

export type SupplyPoolReified<
  T extends PhantomTypeArgument,
  ST extends PhantomTypeArgument,
> = Reified<SupplyPool<T, ST>, SupplyPoolFields<T, ST>>

export class SupplyPool<T extends PhantomTypeArgument, ST extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::supply_pool::SupplyPool`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = SupplyPool.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::supply_pool::SupplyPool<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<ST>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>]
  readonly $isPhantom = SupplyPool.$isPhantom

  readonly id: ToField<UID>
  readonly availableBalance: ToField<Balance<T>>
  readonly interestFeeBps: ToField<'u16'>
  readonly debtInfo: ToField<VecMap<ID, LendFacilInfo<ST>>>
  readonly totalLiabilitiesX64: ToField<'u128'>
  readonly lastUpdateTsSec: ToField<'u64'>
  readonly supplyEquity: ToField<EquityTreasury<ST>>
  readonly collectedFees: ToField<EquityShareBalance<ST>>
  readonly version: ToField<'u16'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>],
    fields: SupplyPoolFields<T, ST>
  ) {
    this.$fullTypeName = composeSuiType(
      SupplyPool.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::supply_pool::SupplyPool<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<ST>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.availableBalance = fields.availableBalance
    this.interestFeeBps = fields.interestFeeBps
    this.debtInfo = fields.debtInfo
    this.totalLiabilitiesX64 = fields.totalLiabilitiesX64
    this.lastUpdateTsSec = fields.lastUpdateTsSec
    this.supplyEquity = fields.supplyEquity
    this.collectedFees = fields.collectedFees
    this.version = fields.version
  }

  static reified<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(T: T, ST: ST): SupplyPoolReified<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    const reifiedBcs = SupplyPool.bcs
    return {
      typeName: SupplyPool.$typeName,
      fullTypeName: composeSuiType(
        SupplyPool.$typeName,
        ...[extractType(T), extractType(ST)]
      ) as `${typeof PKG_V1}::supply_pool::SupplyPool<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<ST>>}>`,
      typeArgs: [extractType(T), extractType(ST)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
        PhantomToTypeStr<ToPhantomTypeArgument<ST>>,
      ],
      isPhantom: SupplyPool.$isPhantom,
      reifiedTypeArgs: [T, ST],
      fromFields: (fields: Record<string, any>) => SupplyPool.fromFields([T, ST], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SupplyPool.fromFieldsWithTypes([T, ST], item),
      fromBcs: (data: Uint8Array) => SupplyPool.fromFields([T, ST], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SupplyPool.fromJSONField([T, ST], field),
      fromJSON: (json: Record<string, any>) => SupplyPool.fromJSON([T, ST], json),
      fromSuiParsedData: (content: SuiParsedData) => SupplyPool.fromSuiParsedData([T, ST], content),
      fromSuiObjectData: (content: SuiObjectData) => SupplyPool.fromSuiObjectData([T, ST], content),
      fetch: async (client: SuiClient, id: string) => SupplyPool.fetch(client, [T, ST], id),
      new: (fields: SupplyPoolFields<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>) => {
        return new SupplyPool([extractType(T), extractType(ST)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SupplyPool.reified
  }

  static phantom<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    ST: ST
  ): PhantomReified<ToTypeStr<SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>>> {
    return phantom(SupplyPool.reified(T, ST))
  }
  static get p() {
    return SupplyPool.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('SupplyPool', {
      id: UID.bcs,
      available_balance: Balance.bcs,
      interest_fee_bps: bcs.u16(),
      debt_info: VecMap.bcs(ID.bcs, LendFacilInfo.bcs),
      total_liabilities_x64: bcs.u128(),
      last_update_ts_sec: bcs.u64(),
      supply_equity: EquityTreasury.bcs,
      collected_fees: EquityShareBalance.bcs,
      version: bcs.u16(),
    })
  }

  private static cachedBcs: ReturnType<typeof SupplyPool.instantiateBcs> | null = null

  static get bcs() {
    if (!SupplyPool.cachedBcs) {
      SupplyPool.cachedBcs = SupplyPool.instantiateBcs()
    }
    return SupplyPool.cachedBcs
  }

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    fields: Record<string, any>
  ): SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return SupplyPool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      availableBalance: decodeFromFields(Balance.reified(typeArgs[0]), fields.available_balance),
      interestFeeBps: decodeFromFields('u16', fields.interest_fee_bps),
      debtInfo: decodeFromFields(
        VecMap.reified(ID.reified(), LendFacilInfo.reified(typeArgs[1])),
        fields.debt_info
      ),
      totalLiabilitiesX64: decodeFromFields('u128', fields.total_liabilities_x64),
      lastUpdateTsSec: decodeFromFields('u64', fields.last_update_ts_sec),
      supplyEquity: decodeFromFields(EquityTreasury.reified(typeArgs[1]), fields.supply_equity),
      collectedFees: decodeFromFields(
        EquityShareBalance.reified(typeArgs[1]),
        fields.collected_fees
      ),
      version: decodeFromFields('u16', fields.version),
    })
  }

  static fromFieldsWithTypes<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    item: FieldsWithTypes
  ): SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (!isSupplyPool(item.type)) {
      throw new Error('not a SupplyPool type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return SupplyPool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      availableBalance: decodeFromFieldsWithTypes(
        Balance.reified(typeArgs[0]),
        item.fields.available_balance
      ),
      interestFeeBps: decodeFromFieldsWithTypes('u16', item.fields.interest_fee_bps),
      debtInfo: decodeFromFieldsWithTypes(
        VecMap.reified(ID.reified(), LendFacilInfo.reified(typeArgs[1])),
        item.fields.debt_info
      ),
      totalLiabilitiesX64: decodeFromFieldsWithTypes('u128', item.fields.total_liabilities_x64),
      lastUpdateTsSec: decodeFromFieldsWithTypes('u64', item.fields.last_update_ts_sec),
      supplyEquity: decodeFromFieldsWithTypes(
        EquityTreasury.reified(typeArgs[1]),
        item.fields.supply_equity
      ),
      collectedFees: decodeFromFieldsWithTypes(
        EquityShareBalance.reified(typeArgs[1]),
        item.fields.collected_fees
      ),
      version: decodeFromFieldsWithTypes('u16', item.fields.version),
    })
  }

  static fromBcs<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    data: Uint8Array
  ): SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return SupplyPool.fromFields(typeArgs, SupplyPool.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      availableBalance: this.availableBalance.toJSONField(),
      interestFeeBps: this.interestFeeBps,
      debtInfo: this.debtInfo.toJSONField(),
      totalLiabilitiesX64: this.totalLiabilitiesX64.toString(),
      lastUpdateTsSec: this.lastUpdateTsSec.toString(),
      supplyEquity: this.supplyEquity.toJSONField(),
      collectedFees: this.collectedFees.toJSONField(),
      version: this.version,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    field: any
  ): SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return SupplyPool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      availableBalance: decodeFromJSONField(Balance.reified(typeArgs[0]), field.availableBalance),
      interestFeeBps: decodeFromJSONField('u16', field.interestFeeBps),
      debtInfo: decodeFromJSONField(
        VecMap.reified(ID.reified(), LendFacilInfo.reified(typeArgs[1])),
        field.debtInfo
      ),
      totalLiabilitiesX64: decodeFromJSONField('u128', field.totalLiabilitiesX64),
      lastUpdateTsSec: decodeFromJSONField('u64', field.lastUpdateTsSec),
      supplyEquity: decodeFromJSONField(EquityTreasury.reified(typeArgs[1]), field.supplyEquity),
      collectedFees: decodeFromJSONField(
        EquityShareBalance.reified(typeArgs[1]),
        field.collectedFees
      ),
      version: decodeFromJSONField('u16', field.version),
    })
  }

  static fromJSON<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    json: Record<string, any>
  ): SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (json.$typeName !== SupplyPool.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(SupplyPool.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return SupplyPool.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    content: SuiParsedData
  ): SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSupplyPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SupplyPool object`)
    }
    return SupplyPool.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    data: SuiObjectData
  ): SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSupplyPool(data.bcs.type)) {
        throw new Error(`object at is not a SupplyPool object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return SupplyPool.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SupplyPool.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T, ST],
    id: string
  ): Promise<SupplyPool<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SupplyPool object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSupplyPool(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SupplyPool object`)
    }

    return SupplyPool.fromSuiObjectData(typeArgs, res.data)
  }
}
