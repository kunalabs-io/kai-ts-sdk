import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  toBcs,
} from '../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../_framework/util'
import { TypeName } from '../../move-stdlib/type-name/structs'
import { Bag } from '../../sui/bag/structs'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'
import { BalanceBag } from '../balance-bag/structs'
import { PKG_V1, PKG_V11, PKG_V16, PKG_V3 } from '../index'
import { PositionModel } from '../position-model-clmm/structs'
import { FacilDebtBag, FacilDebtShare, LendFacilCap } from '../supply-pool/structs'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== ACreateConfig =============================== */

export function isACreateConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::ACreateConfig`
}

export interface ACreateConfigFields {
  dummyField: ToField<'bool'>
}

export type ACreateConfigReified = Reified<ACreateConfig, ACreateConfigFields>

export class ACreateConfig implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::ACreateConfig`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ACreateConfig.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::ACreateConfig`
  readonly $typeArgs: []
  readonly $isPhantom = ACreateConfig.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ACreateConfigFields) {
    this.$fullTypeName = composeSuiType(
      ACreateConfig.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::ACreateConfig`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ACreateConfigReified {
    const reifiedBcs = ACreateConfig.bcs
    return {
      typeName: ACreateConfig.$typeName,
      fullTypeName: composeSuiType(
        ACreateConfig.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::ACreateConfig`,
      typeArgs: [] as [],
      isPhantom: ACreateConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ACreateConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ACreateConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ACreateConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ACreateConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ACreateConfig.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ACreateConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ACreateConfig.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ACreateConfig.fetch(client, id),
      new: (fields: ACreateConfigFields) => {
        return new ACreateConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ACreateConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ACreateConfig>> {
    return phantom(ACreateConfig.reified())
  }
  static get p() {
    return ACreateConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ACreateConfig', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ACreateConfig.instantiateBcs> | null = null

  static get bcs() {
    if (!ACreateConfig.cachedBcs) {
      ACreateConfig.cachedBcs = ACreateConfig.instantiateBcs()
    }
    return ACreateConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ACreateConfig {
    return ACreateConfig.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ACreateConfig {
    if (!isACreateConfig(item.type)) {
      throw new Error('not a ACreateConfig type')
    }

    return ACreateConfig.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ACreateConfig {
    return ACreateConfig.fromFields(ACreateConfig.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ACreateConfig {
    return ACreateConfig.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ACreateConfig {
    if (json.$typeName !== ACreateConfig.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ACreateConfig.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ACreateConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isACreateConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ACreateConfig object`)
    }
    return ACreateConfig.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ACreateConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isACreateConfig(data.bcs.type)) {
        throw new Error(`object at is not a ACreateConfig object`)
      }

      return ACreateConfig.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ACreateConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ACreateConfig> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ACreateConfig object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isACreateConfig(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ACreateConfig object`)
    }

    return ACreateConfig.fromSuiObjectData(res.data)
  }
}

/* ============================== AModifyConfig =============================== */

export function isAModifyConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::AModifyConfig`
}

export interface AModifyConfigFields {
  dummyField: ToField<'bool'>
}

export type AModifyConfigReified = Reified<AModifyConfig, AModifyConfigFields>

export class AModifyConfig implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::AModifyConfig`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AModifyConfig.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::AModifyConfig`
  readonly $typeArgs: []
  readonly $isPhantom = AModifyConfig.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AModifyConfigFields) {
    this.$fullTypeName = composeSuiType(
      AModifyConfig.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::AModifyConfig`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AModifyConfigReified {
    const reifiedBcs = AModifyConfig.bcs
    return {
      typeName: AModifyConfig.$typeName,
      fullTypeName: composeSuiType(
        AModifyConfig.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::AModifyConfig`,
      typeArgs: [] as [],
      isPhantom: AModifyConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AModifyConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AModifyConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AModifyConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AModifyConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AModifyConfig.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AModifyConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AModifyConfig.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AModifyConfig.fetch(client, id),
      new: (fields: AModifyConfigFields) => {
        return new AModifyConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AModifyConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AModifyConfig>> {
    return phantom(AModifyConfig.reified())
  }
  static get p() {
    return AModifyConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AModifyConfig', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AModifyConfig.instantiateBcs> | null = null

  static get bcs() {
    if (!AModifyConfig.cachedBcs) {
      AModifyConfig.cachedBcs = AModifyConfig.instantiateBcs()
    }
    return AModifyConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AModifyConfig {
    return AModifyConfig.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AModifyConfig {
    if (!isAModifyConfig(item.type)) {
      throw new Error('not a AModifyConfig type')
    }

    return AModifyConfig.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AModifyConfig {
    return AModifyConfig.fromFields(AModifyConfig.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AModifyConfig {
    return AModifyConfig.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AModifyConfig {
    if (json.$typeName !== AModifyConfig.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AModifyConfig.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AModifyConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAModifyConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AModifyConfig object`)
    }
    return AModifyConfig.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AModifyConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAModifyConfig(data.bcs.type)) {
        throw new Error(`object at is not a AModifyConfig object`)
      }

      return AModifyConfig.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AModifyConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AModifyConfig> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AModifyConfig object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAModifyConfig(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AModifyConfig object`)
    }

    return AModifyConfig.fromSuiObjectData(res.data)
  }
}

/* ============================== AMigrate =============================== */

export function isAMigrate(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::AMigrate`
}

export interface AMigrateFields {
  dummyField: ToField<'bool'>
}

export type AMigrateReified = Reified<AMigrate, AMigrateFields>

export class AMigrate implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::AMigrate`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AMigrate.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::AMigrate`
  readonly $typeArgs: []
  readonly $isPhantom = AMigrate.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AMigrateFields) {
    this.$fullTypeName = composeSuiType(
      AMigrate.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::AMigrate`
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
      ) as `${typeof PKG_V1}::position_core_clmm::AMigrate`,
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

/* ============================== ADeleverage =============================== */

export function isADeleverage(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::ADeleverage`
}

export interface ADeleverageFields {
  dummyField: ToField<'bool'>
}

export type ADeleverageReified = Reified<ADeleverage, ADeleverageFields>

export class ADeleverage implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::ADeleverage`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ADeleverage.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::ADeleverage`
  readonly $typeArgs: []
  readonly $isPhantom = ADeleverage.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ADeleverageFields) {
    this.$fullTypeName = composeSuiType(
      ADeleverage.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::ADeleverage`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ADeleverageReified {
    const reifiedBcs = ADeleverage.bcs
    return {
      typeName: ADeleverage.$typeName,
      fullTypeName: composeSuiType(
        ADeleverage.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::ADeleverage`,
      typeArgs: [] as [],
      isPhantom: ADeleverage.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ADeleverage.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ADeleverage.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ADeleverage.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ADeleverage.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ADeleverage.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ADeleverage.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ADeleverage.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ADeleverage.fetch(client, id),
      new: (fields: ADeleverageFields) => {
        return new ADeleverage([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ADeleverage.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ADeleverage>> {
    return phantom(ADeleverage.reified())
  }
  static get p() {
    return ADeleverage.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ADeleverage', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ADeleverage.instantiateBcs> | null = null

  static get bcs() {
    if (!ADeleverage.cachedBcs) {
      ADeleverage.cachedBcs = ADeleverage.instantiateBcs()
    }
    return ADeleverage.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ADeleverage {
    return ADeleverage.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ADeleverage {
    if (!isADeleverage(item.type)) {
      throw new Error('not a ADeleverage type')
    }

    return ADeleverage.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ADeleverage {
    return ADeleverage.fromFields(ADeleverage.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ADeleverage {
    return ADeleverage.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): ADeleverage {
    if (json.$typeName !== ADeleverage.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ADeleverage.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ADeleverage {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isADeleverage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ADeleverage object`)
    }
    return ADeleverage.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ADeleverage {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isADeleverage(data.bcs.type)) {
        throw new Error(`object at is not a ADeleverage object`)
      }

      return ADeleverage.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ADeleverage.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ADeleverage> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ADeleverage object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isADeleverage(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ADeleverage object`)
    }

    return ADeleverage.fromSuiObjectData(res.data)
  }
}

/* ============================== ARebalance =============================== */

export function isARebalance(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::ARebalance`
}

export interface ARebalanceFields {
  dummyField: ToField<'bool'>
}

export type ARebalanceReified = Reified<ARebalance, ARebalanceFields>

export class ARebalance implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::ARebalance`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ARebalance.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::ARebalance`
  readonly $typeArgs: []
  readonly $isPhantom = ARebalance.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ARebalanceFields) {
    this.$fullTypeName = composeSuiType(
      ARebalance.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::ARebalance`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ARebalanceReified {
    const reifiedBcs = ARebalance.bcs
    return {
      typeName: ARebalance.$typeName,
      fullTypeName: composeSuiType(
        ARebalance.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::ARebalance`,
      typeArgs: [] as [],
      isPhantom: ARebalance.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ARebalance.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ARebalance.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ARebalance.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ARebalance.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ARebalance.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ARebalance.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ARebalance.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ARebalance.fetch(client, id),
      new: (fields: ARebalanceFields) => {
        return new ARebalance([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ARebalance.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ARebalance>> {
    return phantom(ARebalance.reified())
  }
  static get p() {
    return ARebalance.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ARebalance', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ARebalance.instantiateBcs> | null = null

  static get bcs() {
    if (!ARebalance.cachedBcs) {
      ARebalance.cachedBcs = ARebalance.instantiateBcs()
    }
    return ARebalance.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ARebalance {
    return ARebalance.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ARebalance {
    if (!isARebalance(item.type)) {
      throw new Error('not a ARebalance type')
    }

    return ARebalance.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ARebalance {
    return ARebalance.fromFields(ARebalance.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ARebalance {
    return ARebalance.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): ARebalance {
    if (json.$typeName !== ARebalance.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ARebalance.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ARebalance {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isARebalance(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ARebalance object`)
    }
    return ARebalance.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ARebalance {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isARebalance(data.bcs.type)) {
        throw new Error(`object at is not a ARebalance object`)
      }

      return ARebalance.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ARebalance.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ARebalance> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ARebalance object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isARebalance(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ARebalance object`)
    }

    return ARebalance.fromSuiObjectData(res.data)
  }
}

/* ============================== ACollectProtocolFees =============================== */

export function isACollectProtocolFees(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V3}::position_core_clmm::ACollectProtocolFees`
}

export interface ACollectProtocolFeesFields {
  dummyField: ToField<'bool'>
}

export type ACollectProtocolFeesReified = Reified<ACollectProtocolFees, ACollectProtocolFeesFields>

export class ACollectProtocolFees implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::position_core_clmm::ACollectProtocolFees`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ACollectProtocolFees.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::position_core_clmm::ACollectProtocolFees`
  readonly $typeArgs: []
  readonly $isPhantom = ACollectProtocolFees.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ACollectProtocolFeesFields) {
    this.$fullTypeName = composeSuiType(
      ACollectProtocolFees.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::position_core_clmm::ACollectProtocolFees`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ACollectProtocolFeesReified {
    const reifiedBcs = ACollectProtocolFees.bcs
    return {
      typeName: ACollectProtocolFees.$typeName,
      fullTypeName: composeSuiType(
        ACollectProtocolFees.$typeName,
        ...[]
      ) as `${typeof PKG_V3}::position_core_clmm::ACollectProtocolFees`,
      typeArgs: [] as [],
      isPhantom: ACollectProtocolFees.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ACollectProtocolFees.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ACollectProtocolFees.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ACollectProtocolFees.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ACollectProtocolFees.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ACollectProtocolFees.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ACollectProtocolFees.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ACollectProtocolFees.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ACollectProtocolFees.fetch(client, id),
      new: (fields: ACollectProtocolFeesFields) => {
        return new ACollectProtocolFees([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ACollectProtocolFees.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ACollectProtocolFees>> {
    return phantom(ACollectProtocolFees.reified())
  }
  static get p() {
    return ACollectProtocolFees.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ACollectProtocolFees', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ACollectProtocolFees.instantiateBcs> | null = null

  static get bcs() {
    if (!ACollectProtocolFees.cachedBcs) {
      ACollectProtocolFees.cachedBcs = ACollectProtocolFees.instantiateBcs()
    }
    return ACollectProtocolFees.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ACollectProtocolFees {
    return ACollectProtocolFees.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ACollectProtocolFees {
    if (!isACollectProtocolFees(item.type)) {
      throw new Error('not a ACollectProtocolFees type')
    }

    return ACollectProtocolFees.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ACollectProtocolFees {
    return ACollectProtocolFees.fromFields(ACollectProtocolFees.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ACollectProtocolFees {
    return ACollectProtocolFees.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ACollectProtocolFees {
    if (json.$typeName !== ACollectProtocolFees.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ACollectProtocolFees.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ACollectProtocolFees {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isACollectProtocolFees(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ACollectProtocolFees object`
      )
    }
    return ACollectProtocolFees.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ACollectProtocolFees {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isACollectProtocolFees(data.bcs.type)) {
        throw new Error(`object at is not a ACollectProtocolFees object`)
      }

      return ACollectProtocolFees.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ACollectProtocolFees.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ACollectProtocolFees> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ACollectProtocolFees object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isACollectProtocolFees(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ACollectProtocolFees object`)
    }

    return ACollectProtocolFees.fromSuiObjectData(res.data)
  }
}

/* ============================== ARepayBadDebt =============================== */

export function isARepayBadDebt(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V16}::position_core_clmm::ARepayBadDebt`
}

export interface ARepayBadDebtFields {
  dummyField: ToField<'bool'>
}

export type ARepayBadDebtReified = Reified<ARepayBadDebt, ARepayBadDebtFields>

export class ARepayBadDebt implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V16}::position_core_clmm::ARepayBadDebt`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ARepayBadDebt.$typeName
  readonly $fullTypeName: `${typeof PKG_V16}::position_core_clmm::ARepayBadDebt`
  readonly $typeArgs: []
  readonly $isPhantom = ARepayBadDebt.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ARepayBadDebtFields) {
    this.$fullTypeName = composeSuiType(
      ARepayBadDebt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V16}::position_core_clmm::ARepayBadDebt`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ARepayBadDebtReified {
    const reifiedBcs = ARepayBadDebt.bcs
    return {
      typeName: ARepayBadDebt.$typeName,
      fullTypeName: composeSuiType(
        ARepayBadDebt.$typeName,
        ...[]
      ) as `${typeof PKG_V16}::position_core_clmm::ARepayBadDebt`,
      typeArgs: [] as [],
      isPhantom: ARepayBadDebt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ARepayBadDebt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ARepayBadDebt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ARepayBadDebt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ARepayBadDebt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ARepayBadDebt.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ARepayBadDebt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ARepayBadDebt.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ARepayBadDebt.fetch(client, id),
      new: (fields: ARepayBadDebtFields) => {
        return new ARepayBadDebt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ARepayBadDebt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ARepayBadDebt>> {
    return phantom(ARepayBadDebt.reified())
  }
  static get p() {
    return ARepayBadDebt.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ARepayBadDebt', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ARepayBadDebt.instantiateBcs> | null = null

  static get bcs() {
    if (!ARepayBadDebt.cachedBcs) {
      ARepayBadDebt.cachedBcs = ARepayBadDebt.instantiateBcs()
    }
    return ARepayBadDebt.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ARepayBadDebt {
    return ARepayBadDebt.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ARepayBadDebt {
    if (!isARepayBadDebt(item.type)) {
      throw new Error('not a ARepayBadDebt type')
    }

    return ARepayBadDebt.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ARepayBadDebt {
    return ARepayBadDebt.fromFields(ARepayBadDebt.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ARepayBadDebt {
    return ARepayBadDebt.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ARepayBadDebt {
    if (json.$typeName !== ARepayBadDebt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ARepayBadDebt.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ARepayBadDebt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isARepayBadDebt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ARepayBadDebt object`)
    }
    return ARepayBadDebt.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ARepayBadDebt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isARepayBadDebt(data.bcs.type)) {
        throw new Error(`object at is not a ARepayBadDebt object`)
      }

      return ARepayBadDebt.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ARepayBadDebt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ARepayBadDebt> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ARepayBadDebt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isARepayBadDebt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ARepayBadDebt object`)
    }

    return ARepayBadDebt.fromSuiObjectData(res.data)
  }
}

/* ============================== CreatePositionTicket =============================== */

export function isCreatePositionTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::position_core_clmm::CreatePositionTicket` + '<')
}

export interface CreatePositionTicketFields<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  I32 extends TypeArgument,
> {
  configId: ToField<ID>
  tickA: ToField<I32>
  tickB: ToField<I32>
  dx: ToField<'u64'>
  dy: ToField<'u64'>
  deltaL: ToField<'u128'>
  principalX: ToField<Balance<X>>
  principalY: ToField<Balance<Y>>
  borrowedX: ToField<Balance<X>>
  borrowedY: ToField<Balance<Y>>
  debtBag: ToField<FacilDebtBag>
}

export type CreatePositionTicketReified<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  I32 extends TypeArgument,
> = Reified<CreatePositionTicket<X, Y, I32>, CreatePositionTicketFields<X, Y, I32>>

export class CreatePositionTicket<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  I32 extends TypeArgument,
> implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::CreatePositionTicket`
  static readonly $numTypeParams = 3
  static readonly $isPhantom = [true, true, false] as const

  readonly $typeName = CreatePositionTicket.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::CreatePositionTicket<${PhantomToTypeStr<X>}, ${PhantomToTypeStr<Y>}, ${ToTypeStr<I32>}>`
  readonly $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>, ToTypeStr<I32>]
  readonly $isPhantom = CreatePositionTicket.$isPhantom

  readonly configId: ToField<ID>
  readonly tickA: ToField<I32>
  readonly tickB: ToField<I32>
  readonly dx: ToField<'u64'>
  readonly dy: ToField<'u64'>
  readonly deltaL: ToField<'u128'>
  readonly principalX: ToField<Balance<X>>
  readonly principalY: ToField<Balance<Y>>
  readonly borrowedX: ToField<Balance<X>>
  readonly borrowedY: ToField<Balance<Y>>
  readonly debtBag: ToField<FacilDebtBag>

  private constructor(
    typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>, ToTypeStr<I32>],
    fields: CreatePositionTicketFields<X, Y, I32>
  ) {
    this.$fullTypeName = composeSuiType(
      CreatePositionTicket.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::CreatePositionTicket<${PhantomToTypeStr<X>}, ${PhantomToTypeStr<Y>}, ${ToTypeStr<I32>}>`
    this.$typeArgs = typeArgs

    this.configId = fields.configId
    this.tickA = fields.tickA
    this.tickB = fields.tickB
    this.dx = fields.dx
    this.dy = fields.dy
    this.deltaL = fields.deltaL
    this.principalX = fields.principalX
    this.principalY = fields.principalY
    this.borrowedX = fields.borrowedX
    this.borrowedY = fields.borrowedY
    this.debtBag = fields.debtBag
  }

  static reified<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    X: X,
    Y: Y,
    I32: I32
  ): CreatePositionTicketReified<
    ToPhantomTypeArgument<X>,
    ToPhantomTypeArgument<Y>,
    ToTypeArgument<I32>
  > {
    const reifiedBcs = CreatePositionTicket.bcs(toBcs(I32))
    return {
      typeName: CreatePositionTicket.$typeName,
      fullTypeName: composeSuiType(
        CreatePositionTicket.$typeName,
        ...[extractType(X), extractType(Y), extractType(I32)]
      ) as `${typeof PKG_V1}::position_core_clmm::CreatePositionTicket<${PhantomToTypeStr<ToPhantomTypeArgument<X>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<Y>>}, ${ToTypeStr<ToTypeArgument<I32>>}>`,
      typeArgs: [extractType(X), extractType(Y), extractType(I32)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<X>>,
        PhantomToTypeStr<ToPhantomTypeArgument<Y>>,
        ToTypeStr<ToTypeArgument<I32>>,
      ],
      isPhantom: CreatePositionTicket.$isPhantom,
      reifiedTypeArgs: [X, Y, I32],
      fromFields: (fields: Record<string, any>) =>
        CreatePositionTicket.fromFields([X, Y, I32], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CreatePositionTicket.fromFieldsWithTypes([X, Y, I32], item),
      fromBcs: (data: Uint8Array) =>
        CreatePositionTicket.fromFields([X, Y, I32], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CreatePositionTicket.fromJSONField([X, Y, I32], field),
      fromJSON: (json: Record<string, any>) => CreatePositionTicket.fromJSON([X, Y, I32], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CreatePositionTicket.fromSuiParsedData([X, Y, I32], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CreatePositionTicket.fromSuiObjectData([X, Y, I32], content),
      fetch: async (client: SuiClient, id: string) =>
        CreatePositionTicket.fetch(client, [X, Y, I32], id),
      new: (
        fields: CreatePositionTicketFields<
          ToPhantomTypeArgument<X>,
          ToPhantomTypeArgument<Y>,
          ToTypeArgument<I32>
        >
      ) => {
        return new CreatePositionTicket([extractType(X), extractType(Y), extractType(I32)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CreatePositionTicket.reified
  }

  static phantom<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    X: X,
    Y: Y,
    I32: I32
  ): PhantomReified<
    ToTypeStr<
      CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>>
    >
  > {
    return phantom(CreatePositionTicket.reified(X, Y, I32))
  }
  static get p() {
    return CreatePositionTicket.phantom
  }

  private static instantiateBcs() {
    return <I32 extends BcsType<any>>(I32: I32) =>
      bcs.struct(`CreatePositionTicket<${I32.name}>`, {
        config_id: ID.bcs,
        tick_a: I32,
        tick_b: I32,
        dx: bcs.u64(),
        dy: bcs.u64(),
        delta_l: bcs.u128(),
        principal_x: Balance.bcs,
        principal_y: Balance.bcs,
        borrowed_x: Balance.bcs,
        borrowed_y: Balance.bcs,
        debt_bag: FacilDebtBag.bcs,
      })
  }

  private static cachedBcs: ReturnType<typeof CreatePositionTicket.instantiateBcs> | null = null

  static get bcs() {
    if (!CreatePositionTicket.cachedBcs) {
      CreatePositionTicket.cachedBcs = CreatePositionTicket.instantiateBcs()
    }
    return CreatePositionTicket.cachedBcs
  }

  static fromFields<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    fields: Record<string, any>
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    return CreatePositionTicket.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      configId: decodeFromFields(ID.reified(), fields.config_id),
      tickA: decodeFromFields(typeArgs[2], fields.tick_a),
      tickB: decodeFromFields(typeArgs[2], fields.tick_b),
      dx: decodeFromFields('u64', fields.dx),
      dy: decodeFromFields('u64', fields.dy),
      deltaL: decodeFromFields('u128', fields.delta_l),
      principalX: decodeFromFields(Balance.reified(typeArgs[0]), fields.principal_x),
      principalY: decodeFromFields(Balance.reified(typeArgs[1]), fields.principal_y),
      borrowedX: decodeFromFields(Balance.reified(typeArgs[0]), fields.borrowed_x),
      borrowedY: decodeFromFields(Balance.reified(typeArgs[1]), fields.borrowed_y),
      debtBag: decodeFromFields(FacilDebtBag.reified(), fields.debt_bag),
    })
  }

  static fromFieldsWithTypes<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    item: FieldsWithTypes
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    if (!isCreatePositionTicket(item.type)) {
      throw new Error('not a CreatePositionTicket type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return CreatePositionTicket.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      configId: decodeFromFieldsWithTypes(ID.reified(), item.fields.config_id),
      tickA: decodeFromFieldsWithTypes(typeArgs[2], item.fields.tick_a),
      tickB: decodeFromFieldsWithTypes(typeArgs[2], item.fields.tick_b),
      dx: decodeFromFieldsWithTypes('u64', item.fields.dx),
      dy: decodeFromFieldsWithTypes('u64', item.fields.dy),
      deltaL: decodeFromFieldsWithTypes('u128', item.fields.delta_l),
      principalX: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.principal_x),
      principalY: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.principal_y),
      borrowedX: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.borrowed_x),
      borrowedY: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.borrowed_y),
      debtBag: decodeFromFieldsWithTypes(FacilDebtBag.reified(), item.fields.debt_bag),
    })
  }

  static fromBcs<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    data: Uint8Array
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    return CreatePositionTicket.fromFields(
      typeArgs,
      CreatePositionTicket.bcs(toBcs(typeArgs[2])).parse(data)
    )
  }

  toJSONField() {
    return {
      configId: this.configId,
      tickA: fieldToJSON<I32>(this.$typeArgs[2], this.tickA),
      tickB: fieldToJSON<I32>(this.$typeArgs[2], this.tickB),
      dx: this.dx.toString(),
      dy: this.dy.toString(),
      deltaL: this.deltaL.toString(),
      principalX: this.principalX.toJSONField(),
      principalY: this.principalY.toJSONField(),
      borrowedX: this.borrowedX.toJSONField(),
      borrowedY: this.borrowedY.toJSONField(),
      debtBag: this.debtBag.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    field: any
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    return CreatePositionTicket.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      configId: decodeFromJSONField(ID.reified(), field.configId),
      tickA: decodeFromJSONField(typeArgs[2], field.tickA),
      tickB: decodeFromJSONField(typeArgs[2], field.tickB),
      dx: decodeFromJSONField('u64', field.dx),
      dy: decodeFromJSONField('u64', field.dy),
      deltaL: decodeFromJSONField('u128', field.deltaL),
      principalX: decodeFromJSONField(Balance.reified(typeArgs[0]), field.principalX),
      principalY: decodeFromJSONField(Balance.reified(typeArgs[1]), field.principalY),
      borrowedX: decodeFromJSONField(Balance.reified(typeArgs[0]), field.borrowedX),
      borrowedY: decodeFromJSONField(Balance.reified(typeArgs[1]), field.borrowedY),
      debtBag: decodeFromJSONField(FacilDebtBag.reified(), field.debtBag),
    })
  }

  static fromJSON<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    json: Record<string, any>
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    if (json.$typeName !== CreatePositionTicket.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(CreatePositionTicket.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return CreatePositionTicket.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    content: SuiParsedData
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCreatePositionTicket(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CreatePositionTicket object`
      )
    }
    return CreatePositionTicket.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    data: SuiObjectData
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCreatePositionTicket(data.bcs.type)) {
        throw new Error(`object at is not a CreatePositionTicket object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 3) {
        throw new Error(
          `type argument mismatch: expected 3 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 3; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return CreatePositionTicket.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreatePositionTicket.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    client: SuiClient,
    typeArgs: [X, Y, I32],
    id: string
  ): Promise<
    CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>>
  > {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching CreatePositionTicket object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCreatePositionTicket(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CreatePositionTicket object`)
    }

    return CreatePositionTicket.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== Position =============================== */

export function isPosition(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::position_core_clmm::Position` + '<')
}

export interface PositionFields<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> {
  id: ToField<UID>
  configId: ToField<ID>
  lpPosition: ToField<LP>
  colX: ToField<Balance<X>>
  colY: ToField<Balance<Y>>
  debtBag: ToField<FacilDebtBag>
  collectedFees: ToField<BalanceBag>
  ownerRewardStash: ToField<BalanceBag>
  ticketActive: ToField<'bool'>
  version: ToField<'u16'>
}

export type PositionReified<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> = Reified<Position<X, Y, LP>, PositionFields<X, Y, LP>>

export class Position<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::Position`
  static readonly $numTypeParams = 3
  static readonly $isPhantom = [true, true, false] as const

  readonly $typeName = Position.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::Position<${PhantomToTypeStr<X>}, ${PhantomToTypeStr<Y>}, ${ToTypeStr<LP>}>`
  readonly $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>, ToTypeStr<LP>]
  readonly $isPhantom = Position.$isPhantom

  readonly id: ToField<UID>
  readonly configId: ToField<ID>
  readonly lpPosition: ToField<LP>
  readonly colX: ToField<Balance<X>>
  readonly colY: ToField<Balance<Y>>
  readonly debtBag: ToField<FacilDebtBag>
  readonly collectedFees: ToField<BalanceBag>
  readonly ownerRewardStash: ToField<BalanceBag>
  readonly ticketActive: ToField<'bool'>
  readonly version: ToField<'u16'>

  private constructor(
    typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>, ToTypeStr<LP>],
    fields: PositionFields<X, Y, LP>
  ) {
    this.$fullTypeName = composeSuiType(
      Position.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::Position<${PhantomToTypeStr<X>}, ${PhantomToTypeStr<Y>}, ${ToTypeStr<LP>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.configId = fields.configId
    this.lpPosition = fields.lpPosition
    this.colX = fields.colX
    this.colY = fields.colY
    this.debtBag = fields.debtBag
    this.collectedFees = fields.collectedFees
    this.ownerRewardStash = fields.ownerRewardStash
    this.ticketActive = fields.ticketActive
    this.version = fields.version
  }

  static reified<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    X: X,
    Y: Y,
    LP: LP
  ): PositionReified<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    const reifiedBcs = Position.bcs(toBcs(LP))
    return {
      typeName: Position.$typeName,
      fullTypeName: composeSuiType(
        Position.$typeName,
        ...[extractType(X), extractType(Y), extractType(LP)]
      ) as `${typeof PKG_V1}::position_core_clmm::Position<${PhantomToTypeStr<ToPhantomTypeArgument<X>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<Y>>}, ${ToTypeStr<ToTypeArgument<LP>>}>`,
      typeArgs: [extractType(X), extractType(Y), extractType(LP)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<X>>,
        PhantomToTypeStr<ToPhantomTypeArgument<Y>>,
        ToTypeStr<ToTypeArgument<LP>>,
      ],
      isPhantom: Position.$isPhantom,
      reifiedTypeArgs: [X, Y, LP],
      fromFields: (fields: Record<string, any>) => Position.fromFields([X, Y, LP], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Position.fromFieldsWithTypes([X, Y, LP], item),
      fromBcs: (data: Uint8Array) => Position.fromFields([X, Y, LP], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Position.fromJSONField([X, Y, LP], field),
      fromJSON: (json: Record<string, any>) => Position.fromJSON([X, Y, LP], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        Position.fromSuiParsedData([X, Y, LP], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        Position.fromSuiObjectData([X, Y, LP], content),
      fetch: async (client: SuiClient, id: string) => Position.fetch(client, [X, Y, LP], id),
      new: (
        fields: PositionFields<
          ToPhantomTypeArgument<X>,
          ToPhantomTypeArgument<Y>,
          ToTypeArgument<LP>
        >
      ) => {
        return new Position([extractType(X), extractType(Y), extractType(LP)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Position.reified
  }

  static phantom<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    X: X,
    Y: Y,
    LP: LP
  ): PhantomReified<
    ToTypeStr<Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>>>
  > {
    return phantom(Position.reified(X, Y, LP))
  }
  static get p() {
    return Position.phantom
  }

  private static instantiateBcs() {
    return <LP extends BcsType<any>>(LP: LP) =>
      bcs.struct(`Position<${LP.name}>`, {
        id: UID.bcs,
        config_id: ID.bcs,
        lp_position: LP,
        col_x: Balance.bcs,
        col_y: Balance.bcs,
        debt_bag: FacilDebtBag.bcs,
        collected_fees: BalanceBag.bcs,
        owner_reward_stash: BalanceBag.bcs,
        ticket_active: bcs.bool(),
        version: bcs.u16(),
      })
  }

  private static cachedBcs: ReturnType<typeof Position.instantiateBcs> | null = null

  static get bcs() {
    if (!Position.cachedBcs) {
      Position.cachedBcs = Position.instantiateBcs()
    }
    return Position.cachedBcs
  }

  static fromFields<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    fields: Record<string, any>
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    return Position.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      configId: decodeFromFields(ID.reified(), fields.config_id),
      lpPosition: decodeFromFields(typeArgs[2], fields.lp_position),
      colX: decodeFromFields(Balance.reified(typeArgs[0]), fields.col_x),
      colY: decodeFromFields(Balance.reified(typeArgs[1]), fields.col_y),
      debtBag: decodeFromFields(FacilDebtBag.reified(), fields.debt_bag),
      collectedFees: decodeFromFields(BalanceBag.reified(), fields.collected_fees),
      ownerRewardStash: decodeFromFields(BalanceBag.reified(), fields.owner_reward_stash),
      ticketActive: decodeFromFields('bool', fields.ticket_active),
      version: decodeFromFields('u16', fields.version),
    })
  }

  static fromFieldsWithTypes<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    item: FieldsWithTypes
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    if (!isPosition(item.type)) {
      throw new Error('not a Position type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return Position.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      configId: decodeFromFieldsWithTypes(ID.reified(), item.fields.config_id),
      lpPosition: decodeFromFieldsWithTypes(typeArgs[2], item.fields.lp_position),
      colX: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.col_x),
      colY: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.col_y),
      debtBag: decodeFromFieldsWithTypes(FacilDebtBag.reified(), item.fields.debt_bag),
      collectedFees: decodeFromFieldsWithTypes(BalanceBag.reified(), item.fields.collected_fees),
      ownerRewardStash: decodeFromFieldsWithTypes(
        BalanceBag.reified(),
        item.fields.owner_reward_stash
      ),
      ticketActive: decodeFromFieldsWithTypes('bool', item.fields.ticket_active),
      version: decodeFromFieldsWithTypes('u16', item.fields.version),
    })
  }

  static fromBcs<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    data: Uint8Array
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    return Position.fromFields(typeArgs, Position.bcs(toBcs(typeArgs[2])).parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      configId: this.configId,
      lpPosition: fieldToJSON<LP>(this.$typeArgs[2], this.lpPosition),
      colX: this.colX.toJSONField(),
      colY: this.colY.toJSONField(),
      debtBag: this.debtBag.toJSONField(),
      collectedFees: this.collectedFees.toJSONField(),
      ownerRewardStash: this.ownerRewardStash.toJSONField(),
      ticketActive: this.ticketActive,
      version: this.version,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    field: any
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    return Position.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      configId: decodeFromJSONField(ID.reified(), field.configId),
      lpPosition: decodeFromJSONField(typeArgs[2], field.lpPosition),
      colX: decodeFromJSONField(Balance.reified(typeArgs[0]), field.colX),
      colY: decodeFromJSONField(Balance.reified(typeArgs[1]), field.colY),
      debtBag: decodeFromJSONField(FacilDebtBag.reified(), field.debtBag),
      collectedFees: decodeFromJSONField(BalanceBag.reified(), field.collectedFees),
      ownerRewardStash: decodeFromJSONField(BalanceBag.reified(), field.ownerRewardStash),
      ticketActive: decodeFromJSONField('bool', field.ticketActive),
      version: decodeFromJSONField('u16', field.version),
    })
  }

  static fromJSON<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    json: Record<string, any>
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    if (json.$typeName !== Position.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Position.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return Position.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    content: SuiParsedData
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPosition(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Position object`)
    }
    return Position.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    data: SuiObjectData
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPosition(data.bcs.type)) {
        throw new Error(`object at is not a Position object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 3) {
        throw new Error(
          `type argument mismatch: expected 3 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 3; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return Position.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Position.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    client: SuiClient,
    typeArgs: [X, Y, LP],
    id: string
  ): Promise<Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Position object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPosition(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Position object`)
    }

    return Position.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== PositionCap =============================== */

export function isPositionCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::PositionCap`
}

export interface PositionCapFields {
  id: ToField<UID>
  positionId: ToField<ID>
}

export type PositionCapReified = Reified<PositionCap, PositionCapFields>

export class PositionCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::PositionCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::PositionCap`
  readonly $typeArgs: []
  readonly $isPhantom = PositionCap.$isPhantom

  readonly id: ToField<UID>
  readonly positionId: ToField<ID>

  private constructor(typeArgs: [], fields: PositionCapFields) {
    this.$fullTypeName = composeSuiType(
      PositionCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::PositionCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.positionId = fields.positionId
  }

  static reified(): PositionCapReified {
    const reifiedBcs = PositionCap.bcs
    return {
      typeName: PositionCap.$typeName,
      fullTypeName: composeSuiType(
        PositionCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::PositionCap`,
      typeArgs: [] as [],
      isPhantom: PositionCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionCap.fetch(client, id),
      new: (fields: PositionCapFields) => {
        return new PositionCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionCap>> {
    return phantom(PositionCap.reified())
  }
  static get p() {
    return PositionCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionCap', {
      id: UID.bcs,
      position_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PositionCap.instantiateBcs> | null = null

  static get bcs() {
    if (!PositionCap.cachedBcs) {
      PositionCap.cachedBcs = PositionCap.instantiateBcs()
    }
    return PositionCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionCap {
    return PositionCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionCap {
    if (!isPositionCap(item.type)) {
      throw new Error('not a PositionCap type')
    }

    return PositionCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
    })
  }

  static fromBcs(data: Uint8Array): PositionCap {
    return PositionCap.fromFields(PositionCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      positionId: this.positionId,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionCap {
    return PositionCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
    })
  }

  static fromJSON(json: Record<string, any>): PositionCap {
    if (json.$typeName !== PositionCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PositionCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionCap object`)
    }
    return PositionCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionCap(data.bcs.type)) {
        throw new Error(`object at is not a PositionCap object`)
      }

      return PositionCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PositionCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPositionCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PositionCap object`)
    }

    return PositionCap.fromSuiObjectData(res.data)
  }
}

/* ============================== PythConfig =============================== */

export function isPythConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::PythConfig`
}

export interface PythConfigFields {
  maxAgeSecs: ToField<'u64'>
  pioAllowlist: ToField<VecMap<TypeName, ID>>
}

export type PythConfigReified = Reified<PythConfig, PythConfigFields>

export class PythConfig implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::PythConfig`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PythConfig.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::PythConfig`
  readonly $typeArgs: []
  readonly $isPhantom = PythConfig.$isPhantom

  readonly maxAgeSecs: ToField<'u64'>
  readonly pioAllowlist: ToField<VecMap<TypeName, ID>>

  private constructor(typeArgs: [], fields: PythConfigFields) {
    this.$fullTypeName = composeSuiType(
      PythConfig.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::PythConfig`
    this.$typeArgs = typeArgs

    this.maxAgeSecs = fields.maxAgeSecs
    this.pioAllowlist = fields.pioAllowlist
  }

  static reified(): PythConfigReified {
    const reifiedBcs = PythConfig.bcs
    return {
      typeName: PythConfig.$typeName,
      fullTypeName: composeSuiType(
        PythConfig.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::PythConfig`,
      typeArgs: [] as [],
      isPhantom: PythConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PythConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PythConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PythConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PythConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PythConfig.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PythConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PythConfig.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PythConfig.fetch(client, id),
      new: (fields: PythConfigFields) => {
        return new PythConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PythConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PythConfig>> {
    return phantom(PythConfig.reified())
  }
  static get p() {
    return PythConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PythConfig', {
      max_age_secs: bcs.u64(),
      pio_allowlist: VecMap.bcs(TypeName.bcs, ID.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof PythConfig.instantiateBcs> | null = null

  static get bcs() {
    if (!PythConfig.cachedBcs) {
      PythConfig.cachedBcs = PythConfig.instantiateBcs()
    }
    return PythConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PythConfig {
    return PythConfig.reified().new({
      maxAgeSecs: decodeFromFields('u64', fields.max_age_secs),
      pioAllowlist: decodeFromFields(
        VecMap.reified(TypeName.reified(), ID.reified()),
        fields.pio_allowlist
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PythConfig {
    if (!isPythConfig(item.type)) {
      throw new Error('not a PythConfig type')
    }

    return PythConfig.reified().new({
      maxAgeSecs: decodeFromFieldsWithTypes('u64', item.fields.max_age_secs),
      pioAllowlist: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), ID.reified()),
        item.fields.pio_allowlist
      ),
    })
  }

  static fromBcs(data: Uint8Array): PythConfig {
    return PythConfig.fromFields(PythConfig.bcs.parse(data))
  }

  toJSONField() {
    return {
      maxAgeSecs: this.maxAgeSecs.toString(),
      pioAllowlist: this.pioAllowlist.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PythConfig {
    return PythConfig.reified().new({
      maxAgeSecs: decodeFromJSONField('u64', field.maxAgeSecs),
      pioAllowlist: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), ID.reified()),
        field.pioAllowlist
      ),
    })
  }

  static fromJSON(json: Record<string, any>): PythConfig {
    if (json.$typeName !== PythConfig.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PythConfig.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PythConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPythConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PythConfig object`)
    }
    return PythConfig.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PythConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPythConfig(data.bcs.type)) {
        throw new Error(`object at is not a PythConfig object`)
      }

      return PythConfig.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PythConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PythConfig> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PythConfig object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPythConfig(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PythConfig object`)
    }

    return PythConfig.fromSuiObjectData(res.data)
  }
}

/* ============================== PositionConfig =============================== */

export function isPositionConfig(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::PositionConfig`
}

export interface PositionConfigFields {
  id: ToField<UID>
  poolObjectId: ToField<ID>
  allowNewPositions: ToField<'bool'>
  lendFacilCap: ToField<LendFacilCap>
  minLiqStartPriceDeltaBps: ToField<'u16'>
  minInitMarginBps: ToField<'u16'>
  allowedOracles: ToField<Bag>
  deleverageMarginBps: ToField<'u16'>
  baseDeleverageFactorBps: ToField<'u16'>
  liqMarginBps: ToField<'u16'>
  baseLiqFactorBps: ToField<'u16'>
  liqBonusBps: ToField<'u16'>
  maxPositionL: ToField<'u128'>
  maxGlobalL: ToField<'u128'>
  currentGlobalL: ToField<'u128'>
  rebalanceFeeBps: ToField<'u16'>
  liqFeeBps: ToField<'u16'>
  positionCreationFeeSui: ToField<'u64'>
  version: ToField<'u16'>
}

export type PositionConfigReified = Reified<PositionConfig, PositionConfigFields>

export class PositionConfig implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::PositionConfig`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionConfig.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::PositionConfig`
  readonly $typeArgs: []
  readonly $isPhantom = PositionConfig.$isPhantom

  readonly id: ToField<UID>
  readonly poolObjectId: ToField<ID>
  readonly allowNewPositions: ToField<'bool'>
  readonly lendFacilCap: ToField<LendFacilCap>
  readonly minLiqStartPriceDeltaBps: ToField<'u16'>
  readonly minInitMarginBps: ToField<'u16'>
  readonly allowedOracles: ToField<Bag>
  readonly deleverageMarginBps: ToField<'u16'>
  readonly baseDeleverageFactorBps: ToField<'u16'>
  readonly liqMarginBps: ToField<'u16'>
  readonly baseLiqFactorBps: ToField<'u16'>
  readonly liqBonusBps: ToField<'u16'>
  readonly maxPositionL: ToField<'u128'>
  readonly maxGlobalL: ToField<'u128'>
  readonly currentGlobalL: ToField<'u128'>
  readonly rebalanceFeeBps: ToField<'u16'>
  readonly liqFeeBps: ToField<'u16'>
  readonly positionCreationFeeSui: ToField<'u64'>
  readonly version: ToField<'u16'>

  private constructor(typeArgs: [], fields: PositionConfigFields) {
    this.$fullTypeName = composeSuiType(
      PositionConfig.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::PositionConfig`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.poolObjectId = fields.poolObjectId
    this.allowNewPositions = fields.allowNewPositions
    this.lendFacilCap = fields.lendFacilCap
    this.minLiqStartPriceDeltaBps = fields.minLiqStartPriceDeltaBps
    this.minInitMarginBps = fields.minInitMarginBps
    this.allowedOracles = fields.allowedOracles
    this.deleverageMarginBps = fields.deleverageMarginBps
    this.baseDeleverageFactorBps = fields.baseDeleverageFactorBps
    this.liqMarginBps = fields.liqMarginBps
    this.baseLiqFactorBps = fields.baseLiqFactorBps
    this.liqBonusBps = fields.liqBonusBps
    this.maxPositionL = fields.maxPositionL
    this.maxGlobalL = fields.maxGlobalL
    this.currentGlobalL = fields.currentGlobalL
    this.rebalanceFeeBps = fields.rebalanceFeeBps
    this.liqFeeBps = fields.liqFeeBps
    this.positionCreationFeeSui = fields.positionCreationFeeSui
    this.version = fields.version
  }

  static reified(): PositionConfigReified {
    const reifiedBcs = PositionConfig.bcs
    return {
      typeName: PositionConfig.$typeName,
      fullTypeName: composeSuiType(
        PositionConfig.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::PositionConfig`,
      typeArgs: [] as [],
      isPhantom: PositionConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionConfig.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PositionConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionConfig.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionConfig.fetch(client, id),
      new: (fields: PositionConfigFields) => {
        return new PositionConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionConfig>> {
    return phantom(PositionConfig.reified())
  }
  static get p() {
    return PositionConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionConfig', {
      id: UID.bcs,
      pool_object_id: ID.bcs,
      allow_new_positions: bcs.bool(),
      lend_facil_cap: LendFacilCap.bcs,
      min_liq_start_price_delta_bps: bcs.u16(),
      min_init_margin_bps: bcs.u16(),
      allowed_oracles: Bag.bcs,
      deleverage_margin_bps: bcs.u16(),
      base_deleverage_factor_bps: bcs.u16(),
      liq_margin_bps: bcs.u16(),
      base_liq_factor_bps: bcs.u16(),
      liq_bonus_bps: bcs.u16(),
      max_position_l: bcs.u128(),
      max_global_l: bcs.u128(),
      current_global_l: bcs.u128(),
      rebalance_fee_bps: bcs.u16(),
      liq_fee_bps: bcs.u16(),
      position_creation_fee_sui: bcs.u64(),
      version: bcs.u16(),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionConfig.instantiateBcs> | null = null

  static get bcs() {
    if (!PositionConfig.cachedBcs) {
      PositionConfig.cachedBcs = PositionConfig.instantiateBcs()
    }
    return PositionConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionConfig {
    return PositionConfig.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      poolObjectId: decodeFromFields(ID.reified(), fields.pool_object_id),
      allowNewPositions: decodeFromFields('bool', fields.allow_new_positions),
      lendFacilCap: decodeFromFields(LendFacilCap.reified(), fields.lend_facil_cap),
      minLiqStartPriceDeltaBps: decodeFromFields('u16', fields.min_liq_start_price_delta_bps),
      minInitMarginBps: decodeFromFields('u16', fields.min_init_margin_bps),
      allowedOracles: decodeFromFields(Bag.reified(), fields.allowed_oracles),
      deleverageMarginBps: decodeFromFields('u16', fields.deleverage_margin_bps),
      baseDeleverageFactorBps: decodeFromFields('u16', fields.base_deleverage_factor_bps),
      liqMarginBps: decodeFromFields('u16', fields.liq_margin_bps),
      baseLiqFactorBps: decodeFromFields('u16', fields.base_liq_factor_bps),
      liqBonusBps: decodeFromFields('u16', fields.liq_bonus_bps),
      maxPositionL: decodeFromFields('u128', fields.max_position_l),
      maxGlobalL: decodeFromFields('u128', fields.max_global_l),
      currentGlobalL: decodeFromFields('u128', fields.current_global_l),
      rebalanceFeeBps: decodeFromFields('u16', fields.rebalance_fee_bps),
      liqFeeBps: decodeFromFields('u16', fields.liq_fee_bps),
      positionCreationFeeSui: decodeFromFields('u64', fields.position_creation_fee_sui),
      version: decodeFromFields('u16', fields.version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionConfig {
    if (!isPositionConfig(item.type)) {
      throw new Error('not a PositionConfig type')
    }

    return PositionConfig.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      poolObjectId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_object_id),
      allowNewPositions: decodeFromFieldsWithTypes('bool', item.fields.allow_new_positions),
      lendFacilCap: decodeFromFieldsWithTypes(LendFacilCap.reified(), item.fields.lend_facil_cap),
      minLiqStartPriceDeltaBps: decodeFromFieldsWithTypes(
        'u16',
        item.fields.min_liq_start_price_delta_bps
      ),
      minInitMarginBps: decodeFromFieldsWithTypes('u16', item.fields.min_init_margin_bps),
      allowedOracles: decodeFromFieldsWithTypes(Bag.reified(), item.fields.allowed_oracles),
      deleverageMarginBps: decodeFromFieldsWithTypes('u16', item.fields.deleverage_margin_bps),
      baseDeleverageFactorBps: decodeFromFieldsWithTypes(
        'u16',
        item.fields.base_deleverage_factor_bps
      ),
      liqMarginBps: decodeFromFieldsWithTypes('u16', item.fields.liq_margin_bps),
      baseLiqFactorBps: decodeFromFieldsWithTypes('u16', item.fields.base_liq_factor_bps),
      liqBonusBps: decodeFromFieldsWithTypes('u16', item.fields.liq_bonus_bps),
      maxPositionL: decodeFromFieldsWithTypes('u128', item.fields.max_position_l),
      maxGlobalL: decodeFromFieldsWithTypes('u128', item.fields.max_global_l),
      currentGlobalL: decodeFromFieldsWithTypes('u128', item.fields.current_global_l),
      rebalanceFeeBps: decodeFromFieldsWithTypes('u16', item.fields.rebalance_fee_bps),
      liqFeeBps: decodeFromFieldsWithTypes('u16', item.fields.liq_fee_bps),
      positionCreationFeeSui: decodeFromFieldsWithTypes(
        'u64',
        item.fields.position_creation_fee_sui
      ),
      version: decodeFromFieldsWithTypes('u16', item.fields.version),
    })
  }

  static fromBcs(data: Uint8Array): PositionConfig {
    return PositionConfig.fromFields(PositionConfig.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      poolObjectId: this.poolObjectId,
      allowNewPositions: this.allowNewPositions,
      lendFacilCap: this.lendFacilCap.toJSONField(),
      minLiqStartPriceDeltaBps: this.minLiqStartPriceDeltaBps,
      minInitMarginBps: this.minInitMarginBps,
      allowedOracles: this.allowedOracles.toJSONField(),
      deleverageMarginBps: this.deleverageMarginBps,
      baseDeleverageFactorBps: this.baseDeleverageFactorBps,
      liqMarginBps: this.liqMarginBps,
      baseLiqFactorBps: this.baseLiqFactorBps,
      liqBonusBps: this.liqBonusBps,
      maxPositionL: this.maxPositionL.toString(),
      maxGlobalL: this.maxGlobalL.toString(),
      currentGlobalL: this.currentGlobalL.toString(),
      rebalanceFeeBps: this.rebalanceFeeBps,
      liqFeeBps: this.liqFeeBps,
      positionCreationFeeSui: this.positionCreationFeeSui.toString(),
      version: this.version,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionConfig {
    return PositionConfig.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      poolObjectId: decodeFromJSONField(ID.reified(), field.poolObjectId),
      allowNewPositions: decodeFromJSONField('bool', field.allowNewPositions),
      lendFacilCap: decodeFromJSONField(LendFacilCap.reified(), field.lendFacilCap),
      minLiqStartPriceDeltaBps: decodeFromJSONField('u16', field.minLiqStartPriceDeltaBps),
      minInitMarginBps: decodeFromJSONField('u16', field.minInitMarginBps),
      allowedOracles: decodeFromJSONField(Bag.reified(), field.allowedOracles),
      deleverageMarginBps: decodeFromJSONField('u16', field.deleverageMarginBps),
      baseDeleverageFactorBps: decodeFromJSONField('u16', field.baseDeleverageFactorBps),
      liqMarginBps: decodeFromJSONField('u16', field.liqMarginBps),
      baseLiqFactorBps: decodeFromJSONField('u16', field.baseLiqFactorBps),
      liqBonusBps: decodeFromJSONField('u16', field.liqBonusBps),
      maxPositionL: decodeFromJSONField('u128', field.maxPositionL),
      maxGlobalL: decodeFromJSONField('u128', field.maxGlobalL),
      currentGlobalL: decodeFromJSONField('u128', field.currentGlobalL),
      rebalanceFeeBps: decodeFromJSONField('u16', field.rebalanceFeeBps),
      liqFeeBps: decodeFromJSONField('u16', field.liqFeeBps),
      positionCreationFeeSui: decodeFromJSONField('u64', field.positionCreationFeeSui),
      version: decodeFromJSONField('u16', field.version),
    })
  }

  static fromJSON(json: Record<string, any>): PositionConfig {
    if (json.$typeName !== PositionConfig.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PositionConfig.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionConfig object`)
    }
    return PositionConfig.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionConfig(data.bcs.type)) {
        throw new Error(`object at is not a PositionConfig object`)
      }

      return PositionConfig.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionConfig> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PositionConfig object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPositionConfig(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PositionConfig object`)
    }

    return PositionConfig.fromSuiObjectData(res.data)
  }
}

/* ============================== LiquidationDisabledKey =============================== */

export function isLiquidationDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V11}::position_core_clmm::LiquidationDisabledKey`
}

export interface LiquidationDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type LiquidationDisabledKeyReified = Reified<
  LiquidationDisabledKey,
  LiquidationDisabledKeyFields
>

export class LiquidationDisabledKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V11}::position_core_clmm::LiquidationDisabledKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LiquidationDisabledKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V11}::position_core_clmm::LiquidationDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom = LiquidationDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: LiquidationDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      LiquidationDisabledKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V11}::position_core_clmm::LiquidationDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): LiquidationDisabledKeyReified {
    const reifiedBcs = LiquidationDisabledKey.bcs
    return {
      typeName: LiquidationDisabledKey.$typeName,
      fullTypeName: composeSuiType(
        LiquidationDisabledKey.$typeName,
        ...[]
      ) as `${typeof PKG_V11}::position_core_clmm::LiquidationDisabledKey`,
      typeArgs: [] as [],
      isPhantom: LiquidationDisabledKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LiquidationDisabledKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        LiquidationDisabledKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LiquidationDisabledKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LiquidationDisabledKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LiquidationDisabledKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        LiquidationDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        LiquidationDisabledKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => LiquidationDisabledKey.fetch(client, id),
      new: (fields: LiquidationDisabledKeyFields) => {
        return new LiquidationDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LiquidationDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LiquidationDisabledKey>> {
    return phantom(LiquidationDisabledKey.reified())
  }
  static get p() {
    return LiquidationDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LiquidationDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof LiquidationDisabledKey.instantiateBcs> | null = null

  static get bcs() {
    if (!LiquidationDisabledKey.cachedBcs) {
      LiquidationDisabledKey.cachedBcs = LiquidationDisabledKey.instantiateBcs()
    }
    return LiquidationDisabledKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LiquidationDisabledKey {
    return LiquidationDisabledKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LiquidationDisabledKey {
    if (!isLiquidationDisabledKey(item.type)) {
      throw new Error('not a LiquidationDisabledKey type')
    }

    return LiquidationDisabledKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): LiquidationDisabledKey {
    return LiquidationDisabledKey.fromFields(LiquidationDisabledKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LiquidationDisabledKey {
    return LiquidationDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): LiquidationDisabledKey {
    if (json.$typeName !== LiquidationDisabledKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return LiquidationDisabledKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LiquidationDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLiquidationDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LiquidationDisabledKey object`
      )
    }
    return LiquidationDisabledKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LiquidationDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLiquidationDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a LiquidationDisabledKey object`)
      }

      return LiquidationDisabledKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LiquidationDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LiquidationDisabledKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching LiquidationDisabledKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLiquidationDisabledKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a LiquidationDisabledKey object`)
    }

    return LiquidationDisabledKey.fromSuiObjectData(res.data)
  }
}

/* ============================== ReductionDisabledKey =============================== */

export function isReductionDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V11}::position_core_clmm::ReductionDisabledKey`
}

export interface ReductionDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type ReductionDisabledKeyReified = Reified<ReductionDisabledKey, ReductionDisabledKeyFields>

export class ReductionDisabledKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V11}::position_core_clmm::ReductionDisabledKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ReductionDisabledKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V11}::position_core_clmm::ReductionDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom = ReductionDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ReductionDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      ReductionDisabledKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V11}::position_core_clmm::ReductionDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ReductionDisabledKeyReified {
    const reifiedBcs = ReductionDisabledKey.bcs
    return {
      typeName: ReductionDisabledKey.$typeName,
      fullTypeName: composeSuiType(
        ReductionDisabledKey.$typeName,
        ...[]
      ) as `${typeof PKG_V11}::position_core_clmm::ReductionDisabledKey`,
      typeArgs: [] as [],
      isPhantom: ReductionDisabledKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ReductionDisabledKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ReductionDisabledKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ReductionDisabledKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ReductionDisabledKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ReductionDisabledKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ReductionDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ReductionDisabledKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ReductionDisabledKey.fetch(client, id),
      new: (fields: ReductionDisabledKeyFields) => {
        return new ReductionDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ReductionDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ReductionDisabledKey>> {
    return phantom(ReductionDisabledKey.reified())
  }
  static get p() {
    return ReductionDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ReductionDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ReductionDisabledKey.instantiateBcs> | null = null

  static get bcs() {
    if (!ReductionDisabledKey.cachedBcs) {
      ReductionDisabledKey.cachedBcs = ReductionDisabledKey.instantiateBcs()
    }
    return ReductionDisabledKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ReductionDisabledKey {
    return ReductionDisabledKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ReductionDisabledKey {
    if (!isReductionDisabledKey(item.type)) {
      throw new Error('not a ReductionDisabledKey type')
    }

    return ReductionDisabledKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ReductionDisabledKey {
    return ReductionDisabledKey.fromFields(ReductionDisabledKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ReductionDisabledKey {
    return ReductionDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ReductionDisabledKey {
    if (json.$typeName !== ReductionDisabledKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ReductionDisabledKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ReductionDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReductionDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ReductionDisabledKey object`
      )
    }
    return ReductionDisabledKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ReductionDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReductionDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a ReductionDisabledKey object`)
      }

      return ReductionDisabledKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReductionDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ReductionDisabledKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ReductionDisabledKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isReductionDisabledKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ReductionDisabledKey object`)
    }

    return ReductionDisabledKey.fromSuiObjectData(res.data)
  }
}

/* ============================== AddLiquidityDisabledKey =============================== */

export function isAddLiquidityDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V11}::position_core_clmm::AddLiquidityDisabledKey`
}

export interface AddLiquidityDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type AddLiquidityDisabledKeyReified = Reified<
  AddLiquidityDisabledKey,
  AddLiquidityDisabledKeyFields
>

export class AddLiquidityDisabledKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V11}::position_core_clmm::AddLiquidityDisabledKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddLiquidityDisabledKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V11}::position_core_clmm::AddLiquidityDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom = AddLiquidityDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AddLiquidityDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityDisabledKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V11}::position_core_clmm::AddLiquidityDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AddLiquidityDisabledKeyReified {
    const reifiedBcs = AddLiquidityDisabledKey.bcs
    return {
      typeName: AddLiquidityDisabledKey.$typeName,
      fullTypeName: composeSuiType(
        AddLiquidityDisabledKey.$typeName,
        ...[]
      ) as `${typeof PKG_V11}::position_core_clmm::AddLiquidityDisabledKey`,
      typeArgs: [] as [],
      isPhantom: AddLiquidityDisabledKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddLiquidityDisabledKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AddLiquidityDisabledKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddLiquidityDisabledKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddLiquidityDisabledKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddLiquidityDisabledKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        AddLiquidityDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AddLiquidityDisabledKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddLiquidityDisabledKey.fetch(client, id),
      new: (fields: AddLiquidityDisabledKeyFields) => {
        return new AddLiquidityDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddLiquidityDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityDisabledKey>> {
    return phantom(AddLiquidityDisabledKey.reified())
  }
  static get p() {
    return AddLiquidityDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddLiquidityDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddLiquidityDisabledKey.instantiateBcs> | null = null

  static get bcs() {
    if (!AddLiquidityDisabledKey.cachedBcs) {
      AddLiquidityDisabledKey.cachedBcs = AddLiquidityDisabledKey.instantiateBcs()
    }
    return AddLiquidityDisabledKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddLiquidityDisabledKey {
    return AddLiquidityDisabledKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddLiquidityDisabledKey {
    if (!isAddLiquidityDisabledKey(item.type)) {
      throw new Error('not a AddLiquidityDisabledKey type')
    }

    return AddLiquidityDisabledKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AddLiquidityDisabledKey {
    return AddLiquidityDisabledKey.fromFields(AddLiquidityDisabledKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddLiquidityDisabledKey {
    return AddLiquidityDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AddLiquidityDisabledKey {
    if (json.$typeName !== AddLiquidityDisabledKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AddLiquidityDisabledKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddLiquidityDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AddLiquidityDisabledKey object`
      )
    }
    return AddLiquidityDisabledKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddLiquidityDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityDisabledKey object`)
      }

      return AddLiquidityDisabledKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddLiquidityDisabledKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching AddLiquidityDisabledKey object at id ${id}: ${res.error.code}`
      )
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddLiquidityDisabledKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityDisabledKey object`)
    }

    return AddLiquidityDisabledKey.fromSuiObjectData(res.data)
  }
}

/* ============================== OwnerCollectFeeDisabledKey =============================== */

export function isOwnerCollectFeeDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V11}::position_core_clmm::OwnerCollectFeeDisabledKey`
}

export interface OwnerCollectFeeDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type OwnerCollectFeeDisabledKeyReified = Reified<
  OwnerCollectFeeDisabledKey,
  OwnerCollectFeeDisabledKeyFields
>

export class OwnerCollectFeeDisabledKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V11}::position_core_clmm::OwnerCollectFeeDisabledKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = OwnerCollectFeeDisabledKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V11}::position_core_clmm::OwnerCollectFeeDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom = OwnerCollectFeeDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: OwnerCollectFeeDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      OwnerCollectFeeDisabledKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V11}::position_core_clmm::OwnerCollectFeeDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): OwnerCollectFeeDisabledKeyReified {
    const reifiedBcs = OwnerCollectFeeDisabledKey.bcs
    return {
      typeName: OwnerCollectFeeDisabledKey.$typeName,
      fullTypeName: composeSuiType(
        OwnerCollectFeeDisabledKey.$typeName,
        ...[]
      ) as `${typeof PKG_V11}::position_core_clmm::OwnerCollectFeeDisabledKey`,
      typeArgs: [] as [],
      isPhantom: OwnerCollectFeeDisabledKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OwnerCollectFeeDisabledKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        OwnerCollectFeeDisabledKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OwnerCollectFeeDisabledKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OwnerCollectFeeDisabledKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OwnerCollectFeeDisabledKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        OwnerCollectFeeDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OwnerCollectFeeDisabledKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => OwnerCollectFeeDisabledKey.fetch(client, id),
      new: (fields: OwnerCollectFeeDisabledKeyFields) => {
        return new OwnerCollectFeeDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OwnerCollectFeeDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OwnerCollectFeeDisabledKey>> {
    return phantom(OwnerCollectFeeDisabledKey.reified())
  }
  static get p() {
    return OwnerCollectFeeDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OwnerCollectFeeDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof OwnerCollectFeeDisabledKey.instantiateBcs> | null =
    null

  static get bcs() {
    if (!OwnerCollectFeeDisabledKey.cachedBcs) {
      OwnerCollectFeeDisabledKey.cachedBcs = OwnerCollectFeeDisabledKey.instantiateBcs()
    }
    return OwnerCollectFeeDisabledKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): OwnerCollectFeeDisabledKey {
    return OwnerCollectFeeDisabledKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OwnerCollectFeeDisabledKey {
    if (!isOwnerCollectFeeDisabledKey(item.type)) {
      throw new Error('not a OwnerCollectFeeDisabledKey type')
    }

    return OwnerCollectFeeDisabledKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): OwnerCollectFeeDisabledKey {
    return OwnerCollectFeeDisabledKey.fromFields(OwnerCollectFeeDisabledKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OwnerCollectFeeDisabledKey {
    return OwnerCollectFeeDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): OwnerCollectFeeDisabledKey {
    if (json.$typeName !== OwnerCollectFeeDisabledKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return OwnerCollectFeeDisabledKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): OwnerCollectFeeDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerCollectFeeDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OwnerCollectFeeDisabledKey object`
      )
    }
    return OwnerCollectFeeDisabledKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): OwnerCollectFeeDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerCollectFeeDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a OwnerCollectFeeDisabledKey object`)
      }

      return OwnerCollectFeeDisabledKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerCollectFeeDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<OwnerCollectFeeDisabledKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching OwnerCollectFeeDisabledKey object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isOwnerCollectFeeDisabledKey(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a OwnerCollectFeeDisabledKey object`)
    }

    return OwnerCollectFeeDisabledKey.fromSuiObjectData(res.data)
  }
}

/* ============================== OwnerCollectRewardDisabledKey =============================== */

export function isOwnerCollectRewardDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V11}::position_core_clmm::OwnerCollectRewardDisabledKey`
}

export interface OwnerCollectRewardDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type OwnerCollectRewardDisabledKeyReified = Reified<
  OwnerCollectRewardDisabledKey,
  OwnerCollectRewardDisabledKeyFields
>

export class OwnerCollectRewardDisabledKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V11}::position_core_clmm::OwnerCollectRewardDisabledKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = OwnerCollectRewardDisabledKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V11}::position_core_clmm::OwnerCollectRewardDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom = OwnerCollectRewardDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: OwnerCollectRewardDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      OwnerCollectRewardDisabledKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V11}::position_core_clmm::OwnerCollectRewardDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): OwnerCollectRewardDisabledKeyReified {
    const reifiedBcs = OwnerCollectRewardDisabledKey.bcs
    return {
      typeName: OwnerCollectRewardDisabledKey.$typeName,
      fullTypeName: composeSuiType(
        OwnerCollectRewardDisabledKey.$typeName,
        ...[]
      ) as `${typeof PKG_V11}::position_core_clmm::OwnerCollectRewardDisabledKey`,
      typeArgs: [] as [],
      isPhantom: OwnerCollectRewardDisabledKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OwnerCollectRewardDisabledKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        OwnerCollectRewardDisabledKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        OwnerCollectRewardDisabledKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OwnerCollectRewardDisabledKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OwnerCollectRewardDisabledKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        OwnerCollectRewardDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OwnerCollectRewardDisabledKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        OwnerCollectRewardDisabledKey.fetch(client, id),
      new: (fields: OwnerCollectRewardDisabledKeyFields) => {
        return new OwnerCollectRewardDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OwnerCollectRewardDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OwnerCollectRewardDisabledKey>> {
    return phantom(OwnerCollectRewardDisabledKey.reified())
  }
  static get p() {
    return OwnerCollectRewardDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OwnerCollectRewardDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof OwnerCollectRewardDisabledKey.instantiateBcs> | null =
    null

  static get bcs() {
    if (!OwnerCollectRewardDisabledKey.cachedBcs) {
      OwnerCollectRewardDisabledKey.cachedBcs = OwnerCollectRewardDisabledKey.instantiateBcs()
    }
    return OwnerCollectRewardDisabledKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): OwnerCollectRewardDisabledKey {
    return OwnerCollectRewardDisabledKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OwnerCollectRewardDisabledKey {
    if (!isOwnerCollectRewardDisabledKey(item.type)) {
      throw new Error('not a OwnerCollectRewardDisabledKey type')
    }

    return OwnerCollectRewardDisabledKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): OwnerCollectRewardDisabledKey {
    return OwnerCollectRewardDisabledKey.fromFields(OwnerCollectRewardDisabledKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OwnerCollectRewardDisabledKey {
    return OwnerCollectRewardDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): OwnerCollectRewardDisabledKey {
    if (json.$typeName !== OwnerCollectRewardDisabledKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return OwnerCollectRewardDisabledKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): OwnerCollectRewardDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerCollectRewardDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OwnerCollectRewardDisabledKey object`
      )
    }
    return OwnerCollectRewardDisabledKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): OwnerCollectRewardDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerCollectRewardDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a OwnerCollectRewardDisabledKey object`)
      }

      return OwnerCollectRewardDisabledKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerCollectRewardDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<OwnerCollectRewardDisabledKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching OwnerCollectRewardDisabledKey object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isOwnerCollectRewardDisabledKey(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a OwnerCollectRewardDisabledKey object`)
    }

    return OwnerCollectRewardDisabledKey.fromSuiObjectData(res.data)
  }
}

/* ============================== DeletePositionDisabledKey =============================== */

export function isDeletePositionDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V11}::position_core_clmm::DeletePositionDisabledKey`
}

export interface DeletePositionDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type DeletePositionDisabledKeyReified = Reified<
  DeletePositionDisabledKey,
  DeletePositionDisabledKeyFields
>

export class DeletePositionDisabledKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V11}::position_core_clmm::DeletePositionDisabledKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DeletePositionDisabledKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V11}::position_core_clmm::DeletePositionDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom = DeletePositionDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: DeletePositionDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      DeletePositionDisabledKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V11}::position_core_clmm::DeletePositionDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): DeletePositionDisabledKeyReified {
    const reifiedBcs = DeletePositionDisabledKey.bcs
    return {
      typeName: DeletePositionDisabledKey.$typeName,
      fullTypeName: composeSuiType(
        DeletePositionDisabledKey.$typeName,
        ...[]
      ) as `${typeof PKG_V11}::position_core_clmm::DeletePositionDisabledKey`,
      typeArgs: [] as [],
      isPhantom: DeletePositionDisabledKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeletePositionDisabledKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        DeletePositionDisabledKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeletePositionDisabledKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeletePositionDisabledKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeletePositionDisabledKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        DeletePositionDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        DeletePositionDisabledKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DeletePositionDisabledKey.fetch(client, id),
      new: (fields: DeletePositionDisabledKeyFields) => {
        return new DeletePositionDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DeletePositionDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeletePositionDisabledKey>> {
    return phantom(DeletePositionDisabledKey.reified())
  }
  static get p() {
    return DeletePositionDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeletePositionDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof DeletePositionDisabledKey.instantiateBcs> | null =
    null

  static get bcs() {
    if (!DeletePositionDisabledKey.cachedBcs) {
      DeletePositionDisabledKey.cachedBcs = DeletePositionDisabledKey.instantiateBcs()
    }
    return DeletePositionDisabledKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DeletePositionDisabledKey {
    return DeletePositionDisabledKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DeletePositionDisabledKey {
    if (!isDeletePositionDisabledKey(item.type)) {
      throw new Error('not a DeletePositionDisabledKey type')
    }

    return DeletePositionDisabledKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): DeletePositionDisabledKey {
    return DeletePositionDisabledKey.fromFields(DeletePositionDisabledKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeletePositionDisabledKey {
    return DeletePositionDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): DeletePositionDisabledKey {
    if (json.$typeName !== DeletePositionDisabledKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DeletePositionDisabledKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DeletePositionDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeletePositionDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a DeletePositionDisabledKey object`
      )
    }
    return DeletePositionDisabledKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DeletePositionDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeletePositionDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a DeletePositionDisabledKey object`)
      }

      return DeletePositionDisabledKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeletePositionDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DeletePositionDisabledKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching DeletePositionDisabledKey object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isDeletePositionDisabledKey(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a DeletePositionDisabledKey object`)
    }

    return DeletePositionDisabledKey.fromSuiObjectData(res.data)
  }
}

/* ============================== DeleverageTicket =============================== */

export function isDeleverageTicket(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::DeleverageTicket`
}

export interface DeleverageTicketFields {
  positionId: ToField<ID>
  canRepayX: ToField<'bool'>
  canRepayY: ToField<'bool'>
  info: ToField<DeleverageInfo>
}

export type DeleverageTicketReified = Reified<DeleverageTicket, DeleverageTicketFields>

export class DeleverageTicket implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::DeleverageTicket`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DeleverageTicket.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::DeleverageTicket`
  readonly $typeArgs: []
  readonly $isPhantom = DeleverageTicket.$isPhantom

  readonly positionId: ToField<ID>
  readonly canRepayX: ToField<'bool'>
  readonly canRepayY: ToField<'bool'>
  readonly info: ToField<DeleverageInfo>

  private constructor(typeArgs: [], fields: DeleverageTicketFields) {
    this.$fullTypeName = composeSuiType(
      DeleverageTicket.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::DeleverageTicket`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.canRepayX = fields.canRepayX
    this.canRepayY = fields.canRepayY
    this.info = fields.info
  }

  static reified(): DeleverageTicketReified {
    const reifiedBcs = DeleverageTicket.bcs
    return {
      typeName: DeleverageTicket.$typeName,
      fullTypeName: composeSuiType(
        DeleverageTicket.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::DeleverageTicket`,
      typeArgs: [] as [],
      isPhantom: DeleverageTicket.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeleverageTicket.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DeleverageTicket.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeleverageTicket.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeleverageTicket.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeleverageTicket.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DeleverageTicket.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DeleverageTicket.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DeleverageTicket.fetch(client, id),
      new: (fields: DeleverageTicketFields) => {
        return new DeleverageTicket([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DeleverageTicket.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeleverageTicket>> {
    return phantom(DeleverageTicket.reified())
  }
  static get p() {
    return DeleverageTicket.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeleverageTicket', {
      position_id: ID.bcs,
      can_repay_x: bcs.bool(),
      can_repay_y: bcs.bool(),
      info: DeleverageInfo.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DeleverageTicket.instantiateBcs> | null = null

  static get bcs() {
    if (!DeleverageTicket.cachedBcs) {
      DeleverageTicket.cachedBcs = DeleverageTicket.instantiateBcs()
    }
    return DeleverageTicket.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DeleverageTicket {
    return DeleverageTicket.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      canRepayX: decodeFromFields('bool', fields.can_repay_x),
      canRepayY: decodeFromFields('bool', fields.can_repay_y),
      info: decodeFromFields(DeleverageInfo.reified(), fields.info),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DeleverageTicket {
    if (!isDeleverageTicket(item.type)) {
      throw new Error('not a DeleverageTicket type')
    }

    return DeleverageTicket.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      canRepayX: decodeFromFieldsWithTypes('bool', item.fields.can_repay_x),
      canRepayY: decodeFromFieldsWithTypes('bool', item.fields.can_repay_y),
      info: decodeFromFieldsWithTypes(DeleverageInfo.reified(), item.fields.info),
    })
  }

  static fromBcs(data: Uint8Array): DeleverageTicket {
    return DeleverageTicket.fromFields(DeleverageTicket.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      canRepayX: this.canRepayX,
      canRepayY: this.canRepayY,
      info: this.info.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeleverageTicket {
    return DeleverageTicket.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      canRepayX: decodeFromJSONField('bool', field.canRepayX),
      canRepayY: decodeFromJSONField('bool', field.canRepayY),
      info: decodeFromJSONField(DeleverageInfo.reified(), field.info),
    })
  }

  static fromJSON(json: Record<string, any>): DeleverageTicket {
    if (json.$typeName !== DeleverageTicket.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DeleverageTicket.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DeleverageTicket {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeleverageTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DeleverageTicket object`)
    }
    return DeleverageTicket.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DeleverageTicket {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeleverageTicket(data.bcs.type)) {
        throw new Error(`object at is not a DeleverageTicket object`)
      }

      return DeleverageTicket.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeleverageTicket.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DeleverageTicket> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DeleverageTicket object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDeleverageTicket(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DeleverageTicket object`)
    }

    return DeleverageTicket.fromSuiObjectData(res.data)
  }
}

/* ============================== ReductionRepaymentTicket =============================== */

export function isReductionRepaymentTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::position_core_clmm::ReductionRepaymentTicket` + '<')
}

export interface ReductionRepaymentTicketFields<
  SX extends PhantomTypeArgument,
  SY extends PhantomTypeArgument,
> {
  sx: ToField<FacilDebtShare<SX>>
  sy: ToField<FacilDebtShare<SY>>
  info: ToField<ReductionInfo>
}

export type ReductionRepaymentTicketReified<
  SX extends PhantomTypeArgument,
  SY extends PhantomTypeArgument,
> = Reified<ReductionRepaymentTicket<SX, SY>, ReductionRepaymentTicketFields<SX, SY>>

export class ReductionRepaymentTicket<
  SX extends PhantomTypeArgument,
  SY extends PhantomTypeArgument,
> implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::ReductionRepaymentTicket`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = ReductionRepaymentTicket.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::ReductionRepaymentTicket<${PhantomToTypeStr<SX>}, ${PhantomToTypeStr<SY>}>`
  readonly $typeArgs: [PhantomToTypeStr<SX>, PhantomToTypeStr<SY>]
  readonly $isPhantom = ReductionRepaymentTicket.$isPhantom

  readonly sx: ToField<FacilDebtShare<SX>>
  readonly sy: ToField<FacilDebtShare<SY>>
  readonly info: ToField<ReductionInfo>

  private constructor(
    typeArgs: [PhantomToTypeStr<SX>, PhantomToTypeStr<SY>],
    fields: ReductionRepaymentTicketFields<SX, SY>
  ) {
    this.$fullTypeName = composeSuiType(
      ReductionRepaymentTicket.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::ReductionRepaymentTicket<${PhantomToTypeStr<SX>}, ${PhantomToTypeStr<SY>}>`
    this.$typeArgs = typeArgs

    this.sx = fields.sx
    this.sy = fields.sy
    this.info = fields.info
  }

  static reified<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    SX: SX,
    SY: SY
  ): ReductionRepaymentTicketReified<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    const reifiedBcs = ReductionRepaymentTicket.bcs
    return {
      typeName: ReductionRepaymentTicket.$typeName,
      fullTypeName: composeSuiType(
        ReductionRepaymentTicket.$typeName,
        ...[extractType(SX), extractType(SY)]
      ) as `${typeof PKG_V1}::position_core_clmm::ReductionRepaymentTicket<${PhantomToTypeStr<ToPhantomTypeArgument<SX>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<SY>>}>`,
      typeArgs: [extractType(SX), extractType(SY)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<SX>>,
        PhantomToTypeStr<ToPhantomTypeArgument<SY>>,
      ],
      isPhantom: ReductionRepaymentTicket.$isPhantom,
      reifiedTypeArgs: [SX, SY],
      fromFields: (fields: Record<string, any>) =>
        ReductionRepaymentTicket.fromFields([SX, SY], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ReductionRepaymentTicket.fromFieldsWithTypes([SX, SY], item),
      fromBcs: (data: Uint8Array) =>
        ReductionRepaymentTicket.fromFields([SX, SY], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ReductionRepaymentTicket.fromJSONField([SX, SY], field),
      fromJSON: (json: Record<string, any>) => ReductionRepaymentTicket.fromJSON([SX, SY], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ReductionRepaymentTicket.fromSuiParsedData([SX, SY], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ReductionRepaymentTicket.fromSuiObjectData([SX, SY], content),
      fetch: async (client: SuiClient, id: string) =>
        ReductionRepaymentTicket.fetch(client, [SX, SY], id),
      new: (
        fields: ReductionRepaymentTicketFields<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>>
      ) => {
        return new ReductionRepaymentTicket([extractType(SX), extractType(SY)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ReductionRepaymentTicket.reified
  }

  static phantom<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    SX: SX,
    SY: SY
  ): PhantomReified<
    ToTypeStr<ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>>>
  > {
    return phantom(ReductionRepaymentTicket.reified(SX, SY))
  }
  static get p() {
    return ReductionRepaymentTicket.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('ReductionRepaymentTicket', {
      sx: FacilDebtShare.bcs,
      sy: FacilDebtShare.bcs,
      info: ReductionInfo.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ReductionRepaymentTicket.instantiateBcs> | null = null

  static get bcs() {
    if (!ReductionRepaymentTicket.cachedBcs) {
      ReductionRepaymentTicket.cachedBcs = ReductionRepaymentTicket.instantiateBcs()
    }
    return ReductionRepaymentTicket.cachedBcs
  }

  static fromFields<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    fields: Record<string, any>
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    return ReductionRepaymentTicket.reified(typeArgs[0], typeArgs[1]).new({
      sx: decodeFromFields(FacilDebtShare.reified(typeArgs[0]), fields.sx),
      sy: decodeFromFields(FacilDebtShare.reified(typeArgs[1]), fields.sy),
      info: decodeFromFields(ReductionInfo.reified(), fields.info),
    })
  }

  static fromFieldsWithTypes<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    item: FieldsWithTypes
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    if (!isReductionRepaymentTicket(item.type)) {
      throw new Error('not a ReductionRepaymentTicket type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return ReductionRepaymentTicket.reified(typeArgs[0], typeArgs[1]).new({
      sx: decodeFromFieldsWithTypes(FacilDebtShare.reified(typeArgs[0]), item.fields.sx),
      sy: decodeFromFieldsWithTypes(FacilDebtShare.reified(typeArgs[1]), item.fields.sy),
      info: decodeFromFieldsWithTypes(ReductionInfo.reified(), item.fields.info),
    })
  }

  static fromBcs<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    data: Uint8Array
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    return ReductionRepaymentTicket.fromFields(typeArgs, ReductionRepaymentTicket.bcs.parse(data))
  }

  toJSONField() {
    return {
      sx: this.sx.toJSONField(),
      sy: this.sy.toJSONField(),
      info: this.info.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    field: any
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    return ReductionRepaymentTicket.reified(typeArgs[0], typeArgs[1]).new({
      sx: decodeFromJSONField(FacilDebtShare.reified(typeArgs[0]), field.sx),
      sy: decodeFromJSONField(FacilDebtShare.reified(typeArgs[1]), field.sy),
      info: decodeFromJSONField(ReductionInfo.reified(), field.info),
    })
  }

  static fromJSON<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    json: Record<string, any>
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    if (json.$typeName !== ReductionRepaymentTicket.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(ReductionRepaymentTicket.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return ReductionRepaymentTicket.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    content: SuiParsedData
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReductionRepaymentTicket(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ReductionRepaymentTicket object`
      )
    }
    return ReductionRepaymentTicket.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    data: SuiObjectData
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReductionRepaymentTicket(data.bcs.type)) {
        throw new Error(`object at is not a ReductionRepaymentTicket object`)
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

      return ReductionRepaymentTicket.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReductionRepaymentTicket.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [SX, SY],
    id: string
  ): Promise<ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching ReductionRepaymentTicket object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isReductionRepaymentTicket(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ReductionRepaymentTicket object`)
    }

    return ReductionRepaymentTicket.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== RebalanceReceipt =============================== */

export function isRebalanceReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::RebalanceReceipt`
}

export interface RebalanceReceiptFields {
  id: ToField<ID>
  positionId: ToField<ID>
  collectedAmmFeeX: ToField<'u64'>
  collectedAmmFeeY: ToField<'u64'>
  collectedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
  feesTaken: ToField<VecMap<TypeName, 'u64'>>
  takenCx: ToField<'u64'>
  takenCy: ToField<'u64'>
  deltaL: ToField<'u128'>
  deltaX: ToField<'u64'>
  deltaY: ToField<'u64'>
  xRepaid: ToField<'u64'>
  yRepaid: ToField<'u64'>
  addedCx: ToField<'u64'>
  addedCy: ToField<'u64'>
  stashedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
}

export type RebalanceReceiptReified = Reified<RebalanceReceipt, RebalanceReceiptFields>

export class RebalanceReceipt implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::RebalanceReceipt`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RebalanceReceipt.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::RebalanceReceipt`
  readonly $typeArgs: []
  readonly $isPhantom = RebalanceReceipt.$isPhantom

  readonly id: ToField<ID>
  readonly positionId: ToField<ID>
  readonly collectedAmmFeeX: ToField<'u64'>
  readonly collectedAmmFeeY: ToField<'u64'>
  readonly collectedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
  readonly feesTaken: ToField<VecMap<TypeName, 'u64'>>
  readonly takenCx: ToField<'u64'>
  readonly takenCy: ToField<'u64'>
  readonly deltaL: ToField<'u128'>
  readonly deltaX: ToField<'u64'>
  readonly deltaY: ToField<'u64'>
  readonly xRepaid: ToField<'u64'>
  readonly yRepaid: ToField<'u64'>
  readonly addedCx: ToField<'u64'>
  readonly addedCy: ToField<'u64'>
  readonly stashedAmmRewards: ToField<VecMap<TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: RebalanceReceiptFields) {
    this.$fullTypeName = composeSuiType(
      RebalanceReceipt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::RebalanceReceipt`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.positionId = fields.positionId
    this.collectedAmmFeeX = fields.collectedAmmFeeX
    this.collectedAmmFeeY = fields.collectedAmmFeeY
    this.collectedAmmRewards = fields.collectedAmmRewards
    this.feesTaken = fields.feesTaken
    this.takenCx = fields.takenCx
    this.takenCy = fields.takenCy
    this.deltaL = fields.deltaL
    this.deltaX = fields.deltaX
    this.deltaY = fields.deltaY
    this.xRepaid = fields.xRepaid
    this.yRepaid = fields.yRepaid
    this.addedCx = fields.addedCx
    this.addedCy = fields.addedCy
    this.stashedAmmRewards = fields.stashedAmmRewards
  }

  static reified(): RebalanceReceiptReified {
    const reifiedBcs = RebalanceReceipt.bcs
    return {
      typeName: RebalanceReceipt.$typeName,
      fullTypeName: composeSuiType(
        RebalanceReceipt.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::RebalanceReceipt`,
      typeArgs: [] as [],
      isPhantom: RebalanceReceipt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RebalanceReceipt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RebalanceReceipt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RebalanceReceipt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RebalanceReceipt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RebalanceReceipt.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RebalanceReceipt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RebalanceReceipt.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RebalanceReceipt.fetch(client, id),
      new: (fields: RebalanceReceiptFields) => {
        return new RebalanceReceipt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RebalanceReceipt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RebalanceReceipt>> {
    return phantom(RebalanceReceipt.reified())
  }
  static get p() {
    return RebalanceReceipt.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RebalanceReceipt', {
      id: ID.bcs,
      position_id: ID.bcs,
      collected_amm_fee_x: bcs.u64(),
      collected_amm_fee_y: bcs.u64(),
      collected_amm_rewards: VecMap.bcs(TypeName.bcs, bcs.u64()),
      fees_taken: VecMap.bcs(TypeName.bcs, bcs.u64()),
      taken_cx: bcs.u64(),
      taken_cy: bcs.u64(),
      delta_l: bcs.u128(),
      delta_x: bcs.u64(),
      delta_y: bcs.u64(),
      x_repaid: bcs.u64(),
      y_repaid: bcs.u64(),
      added_cx: bcs.u64(),
      added_cy: bcs.u64(),
      stashed_amm_rewards: VecMap.bcs(TypeName.bcs, bcs.u64()),
    })
  }

  private static cachedBcs: ReturnType<typeof RebalanceReceipt.instantiateBcs> | null = null

  static get bcs() {
    if (!RebalanceReceipt.cachedBcs) {
      RebalanceReceipt.cachedBcs = RebalanceReceipt.instantiateBcs()
    }
    return RebalanceReceipt.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RebalanceReceipt {
    return RebalanceReceipt.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      collectedAmmFeeX: decodeFromFields('u64', fields.collected_amm_fee_x),
      collectedAmmFeeY: decodeFromFields('u64', fields.collected_amm_fee_y),
      collectedAmmRewards: decodeFromFields(
        VecMap.reified(TypeName.reified(), 'u64'),
        fields.collected_amm_rewards
      ),
      feesTaken: decodeFromFields(VecMap.reified(TypeName.reified(), 'u64'), fields.fees_taken),
      takenCx: decodeFromFields('u64', fields.taken_cx),
      takenCy: decodeFromFields('u64', fields.taken_cy),
      deltaL: decodeFromFields('u128', fields.delta_l),
      deltaX: decodeFromFields('u64', fields.delta_x),
      deltaY: decodeFromFields('u64', fields.delta_y),
      xRepaid: decodeFromFields('u64', fields.x_repaid),
      yRepaid: decodeFromFields('u64', fields.y_repaid),
      addedCx: decodeFromFields('u64', fields.added_cx),
      addedCy: decodeFromFields('u64', fields.added_cy),
      stashedAmmRewards: decodeFromFields(
        VecMap.reified(TypeName.reified(), 'u64'),
        fields.stashed_amm_rewards
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RebalanceReceipt {
    if (!isRebalanceReceipt(item.type)) {
      throw new Error('not a RebalanceReceipt type')
    }

    return RebalanceReceipt.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      collectedAmmFeeX: decodeFromFieldsWithTypes('u64', item.fields.collected_amm_fee_x),
      collectedAmmFeeY: decodeFromFieldsWithTypes('u64', item.fields.collected_amm_fee_y),
      collectedAmmRewards: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.collected_amm_rewards
      ),
      feesTaken: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.fees_taken
      ),
      takenCx: decodeFromFieldsWithTypes('u64', item.fields.taken_cx),
      takenCy: decodeFromFieldsWithTypes('u64', item.fields.taken_cy),
      deltaL: decodeFromFieldsWithTypes('u128', item.fields.delta_l),
      deltaX: decodeFromFieldsWithTypes('u64', item.fields.delta_x),
      deltaY: decodeFromFieldsWithTypes('u64', item.fields.delta_y),
      xRepaid: decodeFromFieldsWithTypes('u64', item.fields.x_repaid),
      yRepaid: decodeFromFieldsWithTypes('u64', item.fields.y_repaid),
      addedCx: decodeFromFieldsWithTypes('u64', item.fields.added_cx),
      addedCy: decodeFromFieldsWithTypes('u64', item.fields.added_cy),
      stashedAmmRewards: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.stashed_amm_rewards
      ),
    })
  }

  static fromBcs(data: Uint8Array): RebalanceReceipt {
    return RebalanceReceipt.fromFields(RebalanceReceipt.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      positionId: this.positionId,
      collectedAmmFeeX: this.collectedAmmFeeX.toString(),
      collectedAmmFeeY: this.collectedAmmFeeY.toString(),
      collectedAmmRewards: this.collectedAmmRewards.toJSONField(),
      feesTaken: this.feesTaken.toJSONField(),
      takenCx: this.takenCx.toString(),
      takenCy: this.takenCy.toString(),
      deltaL: this.deltaL.toString(),
      deltaX: this.deltaX.toString(),
      deltaY: this.deltaY.toString(),
      xRepaid: this.xRepaid.toString(),
      yRepaid: this.yRepaid.toString(),
      addedCx: this.addedCx.toString(),
      addedCy: this.addedCy.toString(),
      stashedAmmRewards: this.stashedAmmRewards.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RebalanceReceipt {
    return RebalanceReceipt.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      collectedAmmFeeX: decodeFromJSONField('u64', field.collectedAmmFeeX),
      collectedAmmFeeY: decodeFromJSONField('u64', field.collectedAmmFeeY),
      collectedAmmRewards: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), 'u64'),
        field.collectedAmmRewards
      ),
      feesTaken: decodeFromJSONField(VecMap.reified(TypeName.reified(), 'u64'), field.feesTaken),
      takenCx: decodeFromJSONField('u64', field.takenCx),
      takenCy: decodeFromJSONField('u64', field.takenCy),
      deltaL: decodeFromJSONField('u128', field.deltaL),
      deltaX: decodeFromJSONField('u64', field.deltaX),
      deltaY: decodeFromJSONField('u64', field.deltaY),
      xRepaid: decodeFromJSONField('u64', field.xRepaid),
      yRepaid: decodeFromJSONField('u64', field.yRepaid),
      addedCx: decodeFromJSONField('u64', field.addedCx),
      addedCy: decodeFromJSONField('u64', field.addedCy),
      stashedAmmRewards: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), 'u64'),
        field.stashedAmmRewards
      ),
    })
  }

  static fromJSON(json: Record<string, any>): RebalanceReceipt {
    if (json.$typeName !== RebalanceReceipt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RebalanceReceipt.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RebalanceReceipt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRebalanceReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RebalanceReceipt object`)
    }
    return RebalanceReceipt.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RebalanceReceipt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRebalanceReceipt(data.bcs.type)) {
        throw new Error(`object at is not a RebalanceReceipt object`)
      }

      return RebalanceReceipt.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RebalanceReceipt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RebalanceReceipt> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RebalanceReceipt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRebalanceReceipt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RebalanceReceipt object`)
    }

    return RebalanceReceipt.fromSuiObjectData(res.data)
  }
}

/* ============================== DeletedPositionCollectedFees =============================== */

export function isDeletedPositionCollectedFees(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V3}::position_core_clmm::DeletedPositionCollectedFees`
}

export interface DeletedPositionCollectedFeesFields {
  id: ToField<UID>
  positionId: ToField<ID>
  balanceBag: ToField<BalanceBag>
}

export type DeletedPositionCollectedFeesReified = Reified<
  DeletedPositionCollectedFees,
  DeletedPositionCollectedFeesFields
>

export class DeletedPositionCollectedFees implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::position_core_clmm::DeletedPositionCollectedFees`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DeletedPositionCollectedFees.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::position_core_clmm::DeletedPositionCollectedFees`
  readonly $typeArgs: []
  readonly $isPhantom = DeletedPositionCollectedFees.$isPhantom

  readonly id: ToField<UID>
  readonly positionId: ToField<ID>
  readonly balanceBag: ToField<BalanceBag>

  private constructor(typeArgs: [], fields: DeletedPositionCollectedFeesFields) {
    this.$fullTypeName = composeSuiType(
      DeletedPositionCollectedFees.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::position_core_clmm::DeletedPositionCollectedFees`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.positionId = fields.positionId
    this.balanceBag = fields.balanceBag
  }

  static reified(): DeletedPositionCollectedFeesReified {
    const reifiedBcs = DeletedPositionCollectedFees.bcs
    return {
      typeName: DeletedPositionCollectedFees.$typeName,
      fullTypeName: composeSuiType(
        DeletedPositionCollectedFees.$typeName,
        ...[]
      ) as `${typeof PKG_V3}::position_core_clmm::DeletedPositionCollectedFees`,
      typeArgs: [] as [],
      isPhantom: DeletedPositionCollectedFees.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeletedPositionCollectedFees.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        DeletedPositionCollectedFees.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        DeletedPositionCollectedFees.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeletedPositionCollectedFees.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeletedPositionCollectedFees.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        DeletedPositionCollectedFees.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        DeletedPositionCollectedFees.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        DeletedPositionCollectedFees.fetch(client, id),
      new: (fields: DeletedPositionCollectedFeesFields) => {
        return new DeletedPositionCollectedFees([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DeletedPositionCollectedFees.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeletedPositionCollectedFees>> {
    return phantom(DeletedPositionCollectedFees.reified())
  }
  static get p() {
    return DeletedPositionCollectedFees.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeletedPositionCollectedFees', {
      id: UID.bcs,
      position_id: ID.bcs,
      balance_bag: BalanceBag.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DeletedPositionCollectedFees.instantiateBcs> | null =
    null

  static get bcs() {
    if (!DeletedPositionCollectedFees.cachedBcs) {
      DeletedPositionCollectedFees.cachedBcs = DeletedPositionCollectedFees.instantiateBcs()
    }
    return DeletedPositionCollectedFees.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DeletedPositionCollectedFees {
    return DeletedPositionCollectedFees.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      balanceBag: decodeFromFields(BalanceBag.reified(), fields.balance_bag),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DeletedPositionCollectedFees {
    if (!isDeletedPositionCollectedFees(item.type)) {
      throw new Error('not a DeletedPositionCollectedFees type')
    }

    return DeletedPositionCollectedFees.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      balanceBag: decodeFromFieldsWithTypes(BalanceBag.reified(), item.fields.balance_bag),
    })
  }

  static fromBcs(data: Uint8Array): DeletedPositionCollectedFees {
    return DeletedPositionCollectedFees.fromFields(DeletedPositionCollectedFees.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      positionId: this.positionId,
      balanceBag: this.balanceBag.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeletedPositionCollectedFees {
    return DeletedPositionCollectedFees.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      balanceBag: decodeFromJSONField(BalanceBag.reified(), field.balanceBag),
    })
  }

  static fromJSON(json: Record<string, any>): DeletedPositionCollectedFees {
    if (json.$typeName !== DeletedPositionCollectedFees.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DeletedPositionCollectedFees.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DeletedPositionCollectedFees {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeletedPositionCollectedFees(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a DeletedPositionCollectedFees object`
      )
    }
    return DeletedPositionCollectedFees.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DeletedPositionCollectedFees {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeletedPositionCollectedFees(data.bcs.type)) {
        throw new Error(`object at is not a DeletedPositionCollectedFees object`)
      }

      return DeletedPositionCollectedFees.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeletedPositionCollectedFees.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DeletedPositionCollectedFees> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching DeletedPositionCollectedFees object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isDeletedPositionCollectedFees(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a DeletedPositionCollectedFees object`)
    }

    return DeletedPositionCollectedFees.fromSuiObjectData(res.data)
  }
}

/* ============================== PositionCreationInfo =============================== */

export function isPositionCreationInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::PositionCreationInfo`
}

export interface PositionCreationInfoFields {
  positionId: ToField<ID>
  configId: ToField<ID>
  sqrtPaX64: ToField<'u128'>
  sqrtPbX64: ToField<'u128'>
  l: ToField<'u128'>
  x0: ToField<'u64'>
  y0: ToField<'u64'>
  cx: ToField<'u64'>
  cy: ToField<'u64'>
  dx: ToField<'u64'>
  dy: ToField<'u64'>
  creationFeeAmtSui: ToField<'u64'>
}

export type PositionCreationInfoReified = Reified<PositionCreationInfo, PositionCreationInfoFields>

export class PositionCreationInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::PositionCreationInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PositionCreationInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::PositionCreationInfo`
  readonly $typeArgs: []
  readonly $isPhantom = PositionCreationInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly configId: ToField<ID>
  readonly sqrtPaX64: ToField<'u128'>
  readonly sqrtPbX64: ToField<'u128'>
  readonly l: ToField<'u128'>
  readonly x0: ToField<'u64'>
  readonly y0: ToField<'u64'>
  readonly cx: ToField<'u64'>
  readonly cy: ToField<'u64'>
  readonly dx: ToField<'u64'>
  readonly dy: ToField<'u64'>
  readonly creationFeeAmtSui: ToField<'u64'>

  private constructor(typeArgs: [], fields: PositionCreationInfoFields) {
    this.$fullTypeName = composeSuiType(
      PositionCreationInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::PositionCreationInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.configId = fields.configId
    this.sqrtPaX64 = fields.sqrtPaX64
    this.sqrtPbX64 = fields.sqrtPbX64
    this.l = fields.l
    this.x0 = fields.x0
    this.y0 = fields.y0
    this.cx = fields.cx
    this.cy = fields.cy
    this.dx = fields.dx
    this.dy = fields.dy
    this.creationFeeAmtSui = fields.creationFeeAmtSui
  }

  static reified(): PositionCreationInfoReified {
    const reifiedBcs = PositionCreationInfo.bcs
    return {
      typeName: PositionCreationInfo.$typeName,
      fullTypeName: composeSuiType(
        PositionCreationInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::PositionCreationInfo`,
      typeArgs: [] as [],
      isPhantom: PositionCreationInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionCreationInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PositionCreationInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionCreationInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionCreationInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionCreationInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        PositionCreationInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PositionCreationInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PositionCreationInfo.fetch(client, id),
      new: (fields: PositionCreationInfoFields) => {
        return new PositionCreationInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PositionCreationInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionCreationInfo>> {
    return phantom(PositionCreationInfo.reified())
  }
  static get p() {
    return PositionCreationInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionCreationInfo', {
      position_id: ID.bcs,
      config_id: ID.bcs,
      sqrt_pa_x64: bcs.u128(),
      sqrt_pb_x64: bcs.u128(),
      l: bcs.u128(),
      x0: bcs.u64(),
      y0: bcs.u64(),
      cx: bcs.u64(),
      cy: bcs.u64(),
      dx: bcs.u64(),
      dy: bcs.u64(),
      creation_fee_amt_sui: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PositionCreationInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!PositionCreationInfo.cachedBcs) {
      PositionCreationInfo.cachedBcs = PositionCreationInfo.instantiateBcs()
    }
    return PositionCreationInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionCreationInfo {
    return PositionCreationInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      configId: decodeFromFields(ID.reified(), fields.config_id),
      sqrtPaX64: decodeFromFields('u128', fields.sqrt_pa_x64),
      sqrtPbX64: decodeFromFields('u128', fields.sqrt_pb_x64),
      l: decodeFromFields('u128', fields.l),
      x0: decodeFromFields('u64', fields.x0),
      y0: decodeFromFields('u64', fields.y0),
      cx: decodeFromFields('u64', fields.cx),
      cy: decodeFromFields('u64', fields.cy),
      dx: decodeFromFields('u64', fields.dx),
      dy: decodeFromFields('u64', fields.dy),
      creationFeeAmtSui: decodeFromFields('u64', fields.creation_fee_amt_sui),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionCreationInfo {
    if (!isPositionCreationInfo(item.type)) {
      throw new Error('not a PositionCreationInfo type')
    }

    return PositionCreationInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      configId: decodeFromFieldsWithTypes(ID.reified(), item.fields.config_id),
      sqrtPaX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pa_x64),
      sqrtPbX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pb_x64),
      l: decodeFromFieldsWithTypes('u128', item.fields.l),
      x0: decodeFromFieldsWithTypes('u64', item.fields.x0),
      y0: decodeFromFieldsWithTypes('u64', item.fields.y0),
      cx: decodeFromFieldsWithTypes('u64', item.fields.cx),
      cy: decodeFromFieldsWithTypes('u64', item.fields.cy),
      dx: decodeFromFieldsWithTypes('u64', item.fields.dx),
      dy: decodeFromFieldsWithTypes('u64', item.fields.dy),
      creationFeeAmtSui: decodeFromFieldsWithTypes('u64', item.fields.creation_fee_amt_sui),
    })
  }

  static fromBcs(data: Uint8Array): PositionCreationInfo {
    return PositionCreationInfo.fromFields(PositionCreationInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      configId: this.configId,
      sqrtPaX64: this.sqrtPaX64.toString(),
      sqrtPbX64: this.sqrtPbX64.toString(),
      l: this.l.toString(),
      x0: this.x0.toString(),
      y0: this.y0.toString(),
      cx: this.cx.toString(),
      cy: this.cy.toString(),
      dx: this.dx.toString(),
      dy: this.dy.toString(),
      creationFeeAmtSui: this.creationFeeAmtSui.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionCreationInfo {
    return PositionCreationInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      configId: decodeFromJSONField(ID.reified(), field.configId),
      sqrtPaX64: decodeFromJSONField('u128', field.sqrtPaX64),
      sqrtPbX64: decodeFromJSONField('u128', field.sqrtPbX64),
      l: decodeFromJSONField('u128', field.l),
      x0: decodeFromJSONField('u64', field.x0),
      y0: decodeFromJSONField('u64', field.y0),
      cx: decodeFromJSONField('u64', field.cx),
      cy: decodeFromJSONField('u64', field.cy),
      dx: decodeFromJSONField('u64', field.dx),
      dy: decodeFromJSONField('u64', field.dy),
      creationFeeAmtSui: decodeFromJSONField('u64', field.creationFeeAmtSui),
    })
  }

  static fromJSON(json: Record<string, any>): PositionCreationInfo {
    if (json.$typeName !== PositionCreationInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PositionCreationInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PositionCreationInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionCreationInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PositionCreationInfo object`
      )
    }
    return PositionCreationInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PositionCreationInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionCreationInfo(data.bcs.type)) {
        throw new Error(`object at is not a PositionCreationInfo object`)
      }

      return PositionCreationInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionCreationInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PositionCreationInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PositionCreationInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPositionCreationInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PositionCreationInfo object`)
    }

    return PositionCreationInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== DeleverageInfo =============================== */

export function isDeleverageInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::DeleverageInfo`
}

export interface DeleverageInfoFields {
  positionId: ToField<ID>
  model: ToField<PositionModel>
  oraclePriceX128: ToField<'u256'>
  sqrtPoolPriceX64: ToField<'u128'>
  deltaL: ToField<'u128'>
  deltaX: ToField<'u64'>
  deltaY: ToField<'u64'>
  xRepaid: ToField<'u64'>
  yRepaid: ToField<'u64'>
}

export type DeleverageInfoReified = Reified<DeleverageInfo, DeleverageInfoFields>

export class DeleverageInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::DeleverageInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DeleverageInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::DeleverageInfo`
  readonly $typeArgs: []
  readonly $isPhantom = DeleverageInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly model: ToField<PositionModel>
  readonly oraclePriceX128: ToField<'u256'>
  readonly sqrtPoolPriceX64: ToField<'u128'>
  readonly deltaL: ToField<'u128'>
  readonly deltaX: ToField<'u64'>
  readonly deltaY: ToField<'u64'>
  readonly xRepaid: ToField<'u64'>
  readonly yRepaid: ToField<'u64'>

  private constructor(typeArgs: [], fields: DeleverageInfoFields) {
    this.$fullTypeName = composeSuiType(
      DeleverageInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::DeleverageInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.model = fields.model
    this.oraclePriceX128 = fields.oraclePriceX128
    this.sqrtPoolPriceX64 = fields.sqrtPoolPriceX64
    this.deltaL = fields.deltaL
    this.deltaX = fields.deltaX
    this.deltaY = fields.deltaY
    this.xRepaid = fields.xRepaid
    this.yRepaid = fields.yRepaid
  }

  static reified(): DeleverageInfoReified {
    const reifiedBcs = DeleverageInfo.bcs
    return {
      typeName: DeleverageInfo.$typeName,
      fullTypeName: composeSuiType(
        DeleverageInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::DeleverageInfo`,
      typeArgs: [] as [],
      isPhantom: DeleverageInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeleverageInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DeleverageInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeleverageInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeleverageInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeleverageInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DeleverageInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DeleverageInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DeleverageInfo.fetch(client, id),
      new: (fields: DeleverageInfoFields) => {
        return new DeleverageInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DeleverageInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeleverageInfo>> {
    return phantom(DeleverageInfo.reified())
  }
  static get p() {
    return DeleverageInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeleverageInfo', {
      position_id: ID.bcs,
      model: PositionModel.bcs,
      oracle_price_x128: bcs.u256(),
      sqrt_pool_price_x64: bcs.u128(),
      delta_l: bcs.u128(),
      delta_x: bcs.u64(),
      delta_y: bcs.u64(),
      x_repaid: bcs.u64(),
      y_repaid: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof DeleverageInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!DeleverageInfo.cachedBcs) {
      DeleverageInfo.cachedBcs = DeleverageInfo.instantiateBcs()
    }
    return DeleverageInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DeleverageInfo {
    return DeleverageInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      model: decodeFromFields(PositionModel.reified(), fields.model),
      oraclePriceX128: decodeFromFields('u256', fields.oracle_price_x128),
      sqrtPoolPriceX64: decodeFromFields('u128', fields.sqrt_pool_price_x64),
      deltaL: decodeFromFields('u128', fields.delta_l),
      deltaX: decodeFromFields('u64', fields.delta_x),
      deltaY: decodeFromFields('u64', fields.delta_y),
      xRepaid: decodeFromFields('u64', fields.x_repaid),
      yRepaid: decodeFromFields('u64', fields.y_repaid),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DeleverageInfo {
    if (!isDeleverageInfo(item.type)) {
      throw new Error('not a DeleverageInfo type')
    }

    return DeleverageInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      model: decodeFromFieldsWithTypes(PositionModel.reified(), item.fields.model),
      oraclePriceX128: decodeFromFieldsWithTypes('u256', item.fields.oracle_price_x128),
      sqrtPoolPriceX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pool_price_x64),
      deltaL: decodeFromFieldsWithTypes('u128', item.fields.delta_l),
      deltaX: decodeFromFieldsWithTypes('u64', item.fields.delta_x),
      deltaY: decodeFromFieldsWithTypes('u64', item.fields.delta_y),
      xRepaid: decodeFromFieldsWithTypes('u64', item.fields.x_repaid),
      yRepaid: decodeFromFieldsWithTypes('u64', item.fields.y_repaid),
    })
  }

  static fromBcs(data: Uint8Array): DeleverageInfo {
    return DeleverageInfo.fromFields(DeleverageInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      model: this.model.toJSONField(),
      oraclePriceX128: this.oraclePriceX128.toString(),
      sqrtPoolPriceX64: this.sqrtPoolPriceX64.toString(),
      deltaL: this.deltaL.toString(),
      deltaX: this.deltaX.toString(),
      deltaY: this.deltaY.toString(),
      xRepaid: this.xRepaid.toString(),
      yRepaid: this.yRepaid.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeleverageInfo {
    return DeleverageInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      model: decodeFromJSONField(PositionModel.reified(), field.model),
      oraclePriceX128: decodeFromJSONField('u256', field.oraclePriceX128),
      sqrtPoolPriceX64: decodeFromJSONField('u128', field.sqrtPoolPriceX64),
      deltaL: decodeFromJSONField('u128', field.deltaL),
      deltaX: decodeFromJSONField('u64', field.deltaX),
      deltaY: decodeFromJSONField('u64', field.deltaY),
      xRepaid: decodeFromJSONField('u64', field.xRepaid),
      yRepaid: decodeFromJSONField('u64', field.yRepaid),
    })
  }

  static fromJSON(json: Record<string, any>): DeleverageInfo {
    if (json.$typeName !== DeleverageInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DeleverageInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DeleverageInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeleverageInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DeleverageInfo object`)
    }
    return DeleverageInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DeleverageInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeleverageInfo(data.bcs.type)) {
        throw new Error(`object at is not a DeleverageInfo object`)
      }

      return DeleverageInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeleverageInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DeleverageInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DeleverageInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDeleverageInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DeleverageInfo object`)
    }

    return DeleverageInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== LiquidationInfo =============================== */

export function isLiquidationInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::LiquidationInfo`
}

export interface LiquidationInfoFields {
  positionId: ToField<ID>
  model: ToField<PositionModel>
  oraclePriceX128: ToField<'u256'>
  xRepaid: ToField<'u64'>
  yRepaid: ToField<'u64'>
  liquidatorRewardX: ToField<'u64'>
  liquidatorRewardY: ToField<'u64'>
  liquidationFeeX: ToField<'u64'>
  liquidationFeeY: ToField<'u64'>
}

export type LiquidationInfoReified = Reified<LiquidationInfo, LiquidationInfoFields>

export class LiquidationInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::LiquidationInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LiquidationInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::LiquidationInfo`
  readonly $typeArgs: []
  readonly $isPhantom = LiquidationInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly model: ToField<PositionModel>
  readonly oraclePriceX128: ToField<'u256'>
  readonly xRepaid: ToField<'u64'>
  readonly yRepaid: ToField<'u64'>
  readonly liquidatorRewardX: ToField<'u64'>
  readonly liquidatorRewardY: ToField<'u64'>
  readonly liquidationFeeX: ToField<'u64'>
  readonly liquidationFeeY: ToField<'u64'>

  private constructor(typeArgs: [], fields: LiquidationInfoFields) {
    this.$fullTypeName = composeSuiType(
      LiquidationInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::LiquidationInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.model = fields.model
    this.oraclePriceX128 = fields.oraclePriceX128
    this.xRepaid = fields.xRepaid
    this.yRepaid = fields.yRepaid
    this.liquidatorRewardX = fields.liquidatorRewardX
    this.liquidatorRewardY = fields.liquidatorRewardY
    this.liquidationFeeX = fields.liquidationFeeX
    this.liquidationFeeY = fields.liquidationFeeY
  }

  static reified(): LiquidationInfoReified {
    const reifiedBcs = LiquidationInfo.bcs
    return {
      typeName: LiquidationInfo.$typeName,
      fullTypeName: composeSuiType(
        LiquidationInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::LiquidationInfo`,
      typeArgs: [] as [],
      isPhantom: LiquidationInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LiquidationInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LiquidationInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LiquidationInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LiquidationInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LiquidationInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => LiquidationInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LiquidationInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => LiquidationInfo.fetch(client, id),
      new: (fields: LiquidationInfoFields) => {
        return new LiquidationInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LiquidationInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LiquidationInfo>> {
    return phantom(LiquidationInfo.reified())
  }
  static get p() {
    return LiquidationInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LiquidationInfo', {
      position_id: ID.bcs,
      model: PositionModel.bcs,
      oracle_price_x128: bcs.u256(),
      x_repaid: bcs.u64(),
      y_repaid: bcs.u64(),
      liquidator_reward_x: bcs.u64(),
      liquidator_reward_y: bcs.u64(),
      liquidation_fee_x: bcs.u64(),
      liquidation_fee_y: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof LiquidationInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!LiquidationInfo.cachedBcs) {
      LiquidationInfo.cachedBcs = LiquidationInfo.instantiateBcs()
    }
    return LiquidationInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LiquidationInfo {
    return LiquidationInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      model: decodeFromFields(PositionModel.reified(), fields.model),
      oraclePriceX128: decodeFromFields('u256', fields.oracle_price_x128),
      xRepaid: decodeFromFields('u64', fields.x_repaid),
      yRepaid: decodeFromFields('u64', fields.y_repaid),
      liquidatorRewardX: decodeFromFields('u64', fields.liquidator_reward_x),
      liquidatorRewardY: decodeFromFields('u64', fields.liquidator_reward_y),
      liquidationFeeX: decodeFromFields('u64', fields.liquidation_fee_x),
      liquidationFeeY: decodeFromFields('u64', fields.liquidation_fee_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LiquidationInfo {
    if (!isLiquidationInfo(item.type)) {
      throw new Error('not a LiquidationInfo type')
    }

    return LiquidationInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      model: decodeFromFieldsWithTypes(PositionModel.reified(), item.fields.model),
      oraclePriceX128: decodeFromFieldsWithTypes('u256', item.fields.oracle_price_x128),
      xRepaid: decodeFromFieldsWithTypes('u64', item.fields.x_repaid),
      yRepaid: decodeFromFieldsWithTypes('u64', item.fields.y_repaid),
      liquidatorRewardX: decodeFromFieldsWithTypes('u64', item.fields.liquidator_reward_x),
      liquidatorRewardY: decodeFromFieldsWithTypes('u64', item.fields.liquidator_reward_y),
      liquidationFeeX: decodeFromFieldsWithTypes('u64', item.fields.liquidation_fee_x),
      liquidationFeeY: decodeFromFieldsWithTypes('u64', item.fields.liquidation_fee_y),
    })
  }

  static fromBcs(data: Uint8Array): LiquidationInfo {
    return LiquidationInfo.fromFields(LiquidationInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      model: this.model.toJSONField(),
      oraclePriceX128: this.oraclePriceX128.toString(),
      xRepaid: this.xRepaid.toString(),
      yRepaid: this.yRepaid.toString(),
      liquidatorRewardX: this.liquidatorRewardX.toString(),
      liquidatorRewardY: this.liquidatorRewardY.toString(),
      liquidationFeeX: this.liquidationFeeX.toString(),
      liquidationFeeY: this.liquidationFeeY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LiquidationInfo {
    return LiquidationInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      model: decodeFromJSONField(PositionModel.reified(), field.model),
      oraclePriceX128: decodeFromJSONField('u256', field.oraclePriceX128),
      xRepaid: decodeFromJSONField('u64', field.xRepaid),
      yRepaid: decodeFromJSONField('u64', field.yRepaid),
      liquidatorRewardX: decodeFromJSONField('u64', field.liquidatorRewardX),
      liquidatorRewardY: decodeFromJSONField('u64', field.liquidatorRewardY),
      liquidationFeeX: decodeFromJSONField('u64', field.liquidationFeeX),
      liquidationFeeY: decodeFromJSONField('u64', field.liquidationFeeY),
    })
  }

  static fromJSON(json: Record<string, any>): LiquidationInfo {
    if (json.$typeName !== LiquidationInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return LiquidationInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LiquidationInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLiquidationInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LiquidationInfo object`)
    }
    return LiquidationInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LiquidationInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLiquidationInfo(data.bcs.type)) {
        throw new Error(`object at is not a LiquidationInfo object`)
      }

      return LiquidationInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LiquidationInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LiquidationInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching LiquidationInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLiquidationInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a LiquidationInfo object`)
    }

    return LiquidationInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== ReductionInfo =============================== */

export function isReductionInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::ReductionInfo`
}

export interface ReductionInfoFields {
  positionId: ToField<ID>
  model: ToField<PositionModel>
  oraclePriceX128: ToField<'u256'>
  sqrtPoolPriceX64: ToField<'u128'>
  deltaL: ToField<'u128'>
  deltaX: ToField<'u64'>
  deltaY: ToField<'u64'>
  withdrawnX: ToField<'u64'>
  withdrawnY: ToField<'u64'>
  xRepaid: ToField<'u64'>
  yRepaid: ToField<'u64'>
}

export type ReductionInfoReified = Reified<ReductionInfo, ReductionInfoFields>

export class ReductionInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::ReductionInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ReductionInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::ReductionInfo`
  readonly $typeArgs: []
  readonly $isPhantom = ReductionInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly model: ToField<PositionModel>
  readonly oraclePriceX128: ToField<'u256'>
  readonly sqrtPoolPriceX64: ToField<'u128'>
  readonly deltaL: ToField<'u128'>
  readonly deltaX: ToField<'u64'>
  readonly deltaY: ToField<'u64'>
  readonly withdrawnX: ToField<'u64'>
  readonly withdrawnY: ToField<'u64'>
  readonly xRepaid: ToField<'u64'>
  readonly yRepaid: ToField<'u64'>

  private constructor(typeArgs: [], fields: ReductionInfoFields) {
    this.$fullTypeName = composeSuiType(
      ReductionInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::ReductionInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.model = fields.model
    this.oraclePriceX128 = fields.oraclePriceX128
    this.sqrtPoolPriceX64 = fields.sqrtPoolPriceX64
    this.deltaL = fields.deltaL
    this.deltaX = fields.deltaX
    this.deltaY = fields.deltaY
    this.withdrawnX = fields.withdrawnX
    this.withdrawnY = fields.withdrawnY
    this.xRepaid = fields.xRepaid
    this.yRepaid = fields.yRepaid
  }

  static reified(): ReductionInfoReified {
    const reifiedBcs = ReductionInfo.bcs
    return {
      typeName: ReductionInfo.$typeName,
      fullTypeName: composeSuiType(
        ReductionInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::ReductionInfo`,
      typeArgs: [] as [],
      isPhantom: ReductionInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ReductionInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ReductionInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ReductionInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ReductionInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ReductionInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ReductionInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ReductionInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ReductionInfo.fetch(client, id),
      new: (fields: ReductionInfoFields) => {
        return new ReductionInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ReductionInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ReductionInfo>> {
    return phantom(ReductionInfo.reified())
  }
  static get p() {
    return ReductionInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ReductionInfo', {
      position_id: ID.bcs,
      model: PositionModel.bcs,
      oracle_price_x128: bcs.u256(),
      sqrt_pool_price_x64: bcs.u128(),
      delta_l: bcs.u128(),
      delta_x: bcs.u64(),
      delta_y: bcs.u64(),
      withdrawn_x: bcs.u64(),
      withdrawn_y: bcs.u64(),
      x_repaid: bcs.u64(),
      y_repaid: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof ReductionInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!ReductionInfo.cachedBcs) {
      ReductionInfo.cachedBcs = ReductionInfo.instantiateBcs()
    }
    return ReductionInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ReductionInfo {
    return ReductionInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      model: decodeFromFields(PositionModel.reified(), fields.model),
      oraclePriceX128: decodeFromFields('u256', fields.oracle_price_x128),
      sqrtPoolPriceX64: decodeFromFields('u128', fields.sqrt_pool_price_x64),
      deltaL: decodeFromFields('u128', fields.delta_l),
      deltaX: decodeFromFields('u64', fields.delta_x),
      deltaY: decodeFromFields('u64', fields.delta_y),
      withdrawnX: decodeFromFields('u64', fields.withdrawn_x),
      withdrawnY: decodeFromFields('u64', fields.withdrawn_y),
      xRepaid: decodeFromFields('u64', fields.x_repaid),
      yRepaid: decodeFromFields('u64', fields.y_repaid),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ReductionInfo {
    if (!isReductionInfo(item.type)) {
      throw new Error('not a ReductionInfo type')
    }

    return ReductionInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      model: decodeFromFieldsWithTypes(PositionModel.reified(), item.fields.model),
      oraclePriceX128: decodeFromFieldsWithTypes('u256', item.fields.oracle_price_x128),
      sqrtPoolPriceX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pool_price_x64),
      deltaL: decodeFromFieldsWithTypes('u128', item.fields.delta_l),
      deltaX: decodeFromFieldsWithTypes('u64', item.fields.delta_x),
      deltaY: decodeFromFieldsWithTypes('u64', item.fields.delta_y),
      withdrawnX: decodeFromFieldsWithTypes('u64', item.fields.withdrawn_x),
      withdrawnY: decodeFromFieldsWithTypes('u64', item.fields.withdrawn_y),
      xRepaid: decodeFromFieldsWithTypes('u64', item.fields.x_repaid),
      yRepaid: decodeFromFieldsWithTypes('u64', item.fields.y_repaid),
    })
  }

  static fromBcs(data: Uint8Array): ReductionInfo {
    return ReductionInfo.fromFields(ReductionInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      model: this.model.toJSONField(),
      oraclePriceX128: this.oraclePriceX128.toString(),
      sqrtPoolPriceX64: this.sqrtPoolPriceX64.toString(),
      deltaL: this.deltaL.toString(),
      deltaX: this.deltaX.toString(),
      deltaY: this.deltaY.toString(),
      withdrawnX: this.withdrawnX.toString(),
      withdrawnY: this.withdrawnY.toString(),
      xRepaid: this.xRepaid.toString(),
      yRepaid: this.yRepaid.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ReductionInfo {
    return ReductionInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      model: decodeFromJSONField(PositionModel.reified(), field.model),
      oraclePriceX128: decodeFromJSONField('u256', field.oraclePriceX128),
      sqrtPoolPriceX64: decodeFromJSONField('u128', field.sqrtPoolPriceX64),
      deltaL: decodeFromJSONField('u128', field.deltaL),
      deltaX: decodeFromJSONField('u64', field.deltaX),
      deltaY: decodeFromJSONField('u64', field.deltaY),
      withdrawnX: decodeFromJSONField('u64', field.withdrawnX),
      withdrawnY: decodeFromJSONField('u64', field.withdrawnY),
      xRepaid: decodeFromJSONField('u64', field.xRepaid),
      yRepaid: decodeFromJSONField('u64', field.yRepaid),
    })
  }

  static fromJSON(json: Record<string, any>): ReductionInfo {
    if (json.$typeName !== ReductionInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ReductionInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ReductionInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReductionInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ReductionInfo object`)
    }
    return ReductionInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ReductionInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReductionInfo(data.bcs.type)) {
        throw new Error(`object at is not a ReductionInfo object`)
      }

      return ReductionInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReductionInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ReductionInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ReductionInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isReductionInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ReductionInfo object`)
    }

    return ReductionInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== AddCollateralInfo =============================== */

export function isAddCollateralInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::AddCollateralInfo`
}

export interface AddCollateralInfoFields {
  positionId: ToField<ID>
  amountX: ToField<'u64'>
  amountY: ToField<'u64'>
}

export type AddCollateralInfoReified = Reified<AddCollateralInfo, AddCollateralInfoFields>

export class AddCollateralInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::AddCollateralInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddCollateralInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::AddCollateralInfo`
  readonly $typeArgs: []
  readonly $isPhantom = AddCollateralInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly amountX: ToField<'u64'>
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddCollateralInfoFields) {
    this.$fullTypeName = composeSuiType(
      AddCollateralInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::AddCollateralInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): AddCollateralInfoReified {
    const reifiedBcs = AddCollateralInfo.bcs
    return {
      typeName: AddCollateralInfo.$typeName,
      fullTypeName: composeSuiType(
        AddCollateralInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::AddCollateralInfo`,
      typeArgs: [] as [],
      isPhantom: AddCollateralInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddCollateralInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddCollateralInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddCollateralInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddCollateralInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddCollateralInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddCollateralInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddCollateralInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddCollateralInfo.fetch(client, id),
      new: (fields: AddCollateralInfoFields) => {
        return new AddCollateralInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddCollateralInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddCollateralInfo>> {
    return phantom(AddCollateralInfo.reified())
  }
  static get p() {
    return AddCollateralInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddCollateralInfo', {
      position_id: ID.bcs,
      amount_x: bcs.u64(),
      amount_y: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddCollateralInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!AddCollateralInfo.cachedBcs) {
      AddCollateralInfo.cachedBcs = AddCollateralInfo.instantiateBcs()
    }
    return AddCollateralInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddCollateralInfo {
    return AddCollateralInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      amountX: decodeFromFields('u64', fields.amount_x),
      amountY: decodeFromFields('u64', fields.amount_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddCollateralInfo {
    if (!isAddCollateralInfo(item.type)) {
      throw new Error('not a AddCollateralInfo type')
    }

    return AddCollateralInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      amountX: decodeFromFieldsWithTypes('u64', item.fields.amount_x),
      amountY: decodeFromFieldsWithTypes('u64', item.fields.amount_y),
    })
  }

  static fromBcs(data: Uint8Array): AddCollateralInfo {
    return AddCollateralInfo.fromFields(AddCollateralInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddCollateralInfo {
    return AddCollateralInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      amountX: decodeFromJSONField('u64', field.amountX),
      amountY: decodeFromJSONField('u64', field.amountY),
    })
  }

  static fromJSON(json: Record<string, any>): AddCollateralInfo {
    if (json.$typeName !== AddCollateralInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AddCollateralInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddCollateralInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddCollateralInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddCollateralInfo object`)
    }
    return AddCollateralInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddCollateralInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddCollateralInfo(data.bcs.type)) {
        throw new Error(`object at is not a AddCollateralInfo object`)
      }

      return AddCollateralInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddCollateralInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddCollateralInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddCollateralInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddCollateralInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddCollateralInfo object`)
    }

    return AddCollateralInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== AddLiquidityInfo =============================== */

export function isAddLiquidityInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::AddLiquidityInfo`
}

export interface AddLiquidityInfoFields {
  positionId: ToField<ID>
  sqrtPoolPriceX64: ToField<'u128'>
  deltaL: ToField<'u128'>
  deltaX: ToField<'u64'>
  deltaY: ToField<'u64'>
}

export type AddLiquidityInfoReified = Reified<AddLiquidityInfo, AddLiquidityInfoFields>

export class AddLiquidityInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::AddLiquidityInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddLiquidityInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::AddLiquidityInfo`
  readonly $typeArgs: []
  readonly $isPhantom = AddLiquidityInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly sqrtPoolPriceX64: ToField<'u128'>
  readonly deltaL: ToField<'u128'>
  readonly deltaX: ToField<'u64'>
  readonly deltaY: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddLiquidityInfoFields) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::AddLiquidityInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.sqrtPoolPriceX64 = fields.sqrtPoolPriceX64
    this.deltaL = fields.deltaL
    this.deltaX = fields.deltaX
    this.deltaY = fields.deltaY
  }

  static reified(): AddLiquidityInfoReified {
    const reifiedBcs = AddLiquidityInfo.bcs
    return {
      typeName: AddLiquidityInfo.$typeName,
      fullTypeName: composeSuiType(
        AddLiquidityInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::AddLiquidityInfo`,
      typeArgs: [] as [],
      isPhantom: AddLiquidityInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddLiquidityInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddLiquidityInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddLiquidityInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddLiquidityInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddLiquidityInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddLiquidityInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddLiquidityInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddLiquidityInfo.fetch(client, id),
      new: (fields: AddLiquidityInfoFields) => {
        return new AddLiquidityInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddLiquidityInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityInfo>> {
    return phantom(AddLiquidityInfo.reified())
  }
  static get p() {
    return AddLiquidityInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddLiquidityInfo', {
      position_id: ID.bcs,
      sqrt_pool_price_x64: bcs.u128(),
      delta_l: bcs.u128(),
      delta_x: bcs.u64(),
      delta_y: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddLiquidityInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!AddLiquidityInfo.cachedBcs) {
      AddLiquidityInfo.cachedBcs = AddLiquidityInfo.instantiateBcs()
    }
    return AddLiquidityInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddLiquidityInfo {
    return AddLiquidityInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      sqrtPoolPriceX64: decodeFromFields('u128', fields.sqrt_pool_price_x64),
      deltaL: decodeFromFields('u128', fields.delta_l),
      deltaX: decodeFromFields('u64', fields.delta_x),
      deltaY: decodeFromFields('u64', fields.delta_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddLiquidityInfo {
    if (!isAddLiquidityInfo(item.type)) {
      throw new Error('not a AddLiquidityInfo type')
    }

    return AddLiquidityInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      sqrtPoolPriceX64: decodeFromFieldsWithTypes('u128', item.fields.sqrt_pool_price_x64),
      deltaL: decodeFromFieldsWithTypes('u128', item.fields.delta_l),
      deltaX: decodeFromFieldsWithTypes('u64', item.fields.delta_x),
      deltaY: decodeFromFieldsWithTypes('u64', item.fields.delta_y),
    })
  }

  static fromBcs(data: Uint8Array): AddLiquidityInfo {
    return AddLiquidityInfo.fromFields(AddLiquidityInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      sqrtPoolPriceX64: this.sqrtPoolPriceX64.toString(),
      deltaL: this.deltaL.toString(),
      deltaX: this.deltaX.toString(),
      deltaY: this.deltaY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddLiquidityInfo {
    return AddLiquidityInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      sqrtPoolPriceX64: decodeFromJSONField('u128', field.sqrtPoolPriceX64),
      deltaL: decodeFromJSONField('u128', field.deltaL),
      deltaX: decodeFromJSONField('u64', field.deltaX),
      deltaY: decodeFromJSONField('u64', field.deltaY),
    })
  }

  static fromJSON(json: Record<string, any>): AddLiquidityInfo {
    if (json.$typeName !== AddLiquidityInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AddLiquidityInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddLiquidityInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddLiquidityInfo object`)
    }
    return AddLiquidityInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddLiquidityInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityInfo(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityInfo object`)
      }

      return AddLiquidityInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddLiquidityInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddLiquidityInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddLiquidityInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityInfo object`)
    }

    return AddLiquidityInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== RepayDebtInfo =============================== */

export function isRepayDebtInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::RepayDebtInfo`
}

export interface RepayDebtInfoFields {
  positionId: ToField<ID>
  xRepaid: ToField<'u64'>
  yRepaid: ToField<'u64'>
}

export type RepayDebtInfoReified = Reified<RepayDebtInfo, RepayDebtInfoFields>

export class RepayDebtInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::RepayDebtInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RepayDebtInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::RepayDebtInfo`
  readonly $typeArgs: []
  readonly $isPhantom = RepayDebtInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly xRepaid: ToField<'u64'>
  readonly yRepaid: ToField<'u64'>

  private constructor(typeArgs: [], fields: RepayDebtInfoFields) {
    this.$fullTypeName = composeSuiType(
      RepayDebtInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::RepayDebtInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.xRepaid = fields.xRepaid
    this.yRepaid = fields.yRepaid
  }

  static reified(): RepayDebtInfoReified {
    const reifiedBcs = RepayDebtInfo.bcs
    return {
      typeName: RepayDebtInfo.$typeName,
      fullTypeName: composeSuiType(
        RepayDebtInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::RepayDebtInfo`,
      typeArgs: [] as [],
      isPhantom: RepayDebtInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RepayDebtInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RepayDebtInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RepayDebtInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RepayDebtInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RepayDebtInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RepayDebtInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RepayDebtInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RepayDebtInfo.fetch(client, id),
      new: (fields: RepayDebtInfoFields) => {
        return new RepayDebtInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RepayDebtInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RepayDebtInfo>> {
    return phantom(RepayDebtInfo.reified())
  }
  static get p() {
    return RepayDebtInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RepayDebtInfo', {
      position_id: ID.bcs,
      x_repaid: bcs.u64(),
      y_repaid: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof RepayDebtInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!RepayDebtInfo.cachedBcs) {
      RepayDebtInfo.cachedBcs = RepayDebtInfo.instantiateBcs()
    }
    return RepayDebtInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RepayDebtInfo {
    return RepayDebtInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      xRepaid: decodeFromFields('u64', fields.x_repaid),
      yRepaid: decodeFromFields('u64', fields.y_repaid),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RepayDebtInfo {
    if (!isRepayDebtInfo(item.type)) {
      throw new Error('not a RepayDebtInfo type')
    }

    return RepayDebtInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      xRepaid: decodeFromFieldsWithTypes('u64', item.fields.x_repaid),
      yRepaid: decodeFromFieldsWithTypes('u64', item.fields.y_repaid),
    })
  }

  static fromBcs(data: Uint8Array): RepayDebtInfo {
    return RepayDebtInfo.fromFields(RepayDebtInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      xRepaid: this.xRepaid.toString(),
      yRepaid: this.yRepaid.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RepayDebtInfo {
    return RepayDebtInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      xRepaid: decodeFromJSONField('u64', field.xRepaid),
      yRepaid: decodeFromJSONField('u64', field.yRepaid),
    })
  }

  static fromJSON(json: Record<string, any>): RepayDebtInfo {
    if (json.$typeName !== RepayDebtInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RepayDebtInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RepayDebtInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRepayDebtInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RepayDebtInfo object`)
    }
    return RepayDebtInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RepayDebtInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRepayDebtInfo(data.bcs.type)) {
        throw new Error(`object at is not a RepayDebtInfo object`)
      }

      return RepayDebtInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RepayDebtInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RepayDebtInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RepayDebtInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRepayDebtInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RepayDebtInfo object`)
    }

    return RepayDebtInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== OwnerCollectFeeInfo =============================== */

export function isOwnerCollectFeeInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V3}::position_core_clmm::OwnerCollectFeeInfo`
}

export interface OwnerCollectFeeInfoFields {
  positionId: ToField<ID>
  collectedXAmt: ToField<'u64'>
  collectedYAmt: ToField<'u64'>
  feeAmtX: ToField<'u64'>
  feeAmtY: ToField<'u64'>
}

export type OwnerCollectFeeInfoReified = Reified<OwnerCollectFeeInfo, OwnerCollectFeeInfoFields>

export class OwnerCollectFeeInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::position_core_clmm::OwnerCollectFeeInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = OwnerCollectFeeInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::position_core_clmm::OwnerCollectFeeInfo`
  readonly $typeArgs: []
  readonly $isPhantom = OwnerCollectFeeInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly collectedXAmt: ToField<'u64'>
  readonly collectedYAmt: ToField<'u64'>
  readonly feeAmtX: ToField<'u64'>
  readonly feeAmtY: ToField<'u64'>

  private constructor(typeArgs: [], fields: OwnerCollectFeeInfoFields) {
    this.$fullTypeName = composeSuiType(
      OwnerCollectFeeInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::position_core_clmm::OwnerCollectFeeInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.collectedXAmt = fields.collectedXAmt
    this.collectedYAmt = fields.collectedYAmt
    this.feeAmtX = fields.feeAmtX
    this.feeAmtY = fields.feeAmtY
  }

  static reified(): OwnerCollectFeeInfoReified {
    const reifiedBcs = OwnerCollectFeeInfo.bcs
    return {
      typeName: OwnerCollectFeeInfo.$typeName,
      fullTypeName: composeSuiType(
        OwnerCollectFeeInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V3}::position_core_clmm::OwnerCollectFeeInfo`,
      typeArgs: [] as [],
      isPhantom: OwnerCollectFeeInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OwnerCollectFeeInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OwnerCollectFeeInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OwnerCollectFeeInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OwnerCollectFeeInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OwnerCollectFeeInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => OwnerCollectFeeInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => OwnerCollectFeeInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => OwnerCollectFeeInfo.fetch(client, id),
      new: (fields: OwnerCollectFeeInfoFields) => {
        return new OwnerCollectFeeInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OwnerCollectFeeInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OwnerCollectFeeInfo>> {
    return phantom(OwnerCollectFeeInfo.reified())
  }
  static get p() {
    return OwnerCollectFeeInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OwnerCollectFeeInfo', {
      position_id: ID.bcs,
      collected_x_amt: bcs.u64(),
      collected_y_amt: bcs.u64(),
      fee_amt_x: bcs.u64(),
      fee_amt_y: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof OwnerCollectFeeInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!OwnerCollectFeeInfo.cachedBcs) {
      OwnerCollectFeeInfo.cachedBcs = OwnerCollectFeeInfo.instantiateBcs()
    }
    return OwnerCollectFeeInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): OwnerCollectFeeInfo {
    return OwnerCollectFeeInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      collectedXAmt: decodeFromFields('u64', fields.collected_x_amt),
      collectedYAmt: decodeFromFields('u64', fields.collected_y_amt),
      feeAmtX: decodeFromFields('u64', fields.fee_amt_x),
      feeAmtY: decodeFromFields('u64', fields.fee_amt_y),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OwnerCollectFeeInfo {
    if (!isOwnerCollectFeeInfo(item.type)) {
      throw new Error('not a OwnerCollectFeeInfo type')
    }

    return OwnerCollectFeeInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      collectedXAmt: decodeFromFieldsWithTypes('u64', item.fields.collected_x_amt),
      collectedYAmt: decodeFromFieldsWithTypes('u64', item.fields.collected_y_amt),
      feeAmtX: decodeFromFieldsWithTypes('u64', item.fields.fee_amt_x),
      feeAmtY: decodeFromFieldsWithTypes('u64', item.fields.fee_amt_y),
    })
  }

  static fromBcs(data: Uint8Array): OwnerCollectFeeInfo {
    return OwnerCollectFeeInfo.fromFields(OwnerCollectFeeInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      collectedXAmt: this.collectedXAmt.toString(),
      collectedYAmt: this.collectedYAmt.toString(),
      feeAmtX: this.feeAmtX.toString(),
      feeAmtY: this.feeAmtY.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OwnerCollectFeeInfo {
    return OwnerCollectFeeInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      collectedXAmt: decodeFromJSONField('u64', field.collectedXAmt),
      collectedYAmt: decodeFromJSONField('u64', field.collectedYAmt),
      feeAmtX: decodeFromJSONField('u64', field.feeAmtX),
      feeAmtY: decodeFromJSONField('u64', field.feeAmtY),
    })
  }

  static fromJSON(json: Record<string, any>): OwnerCollectFeeInfo {
    if (json.$typeName !== OwnerCollectFeeInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return OwnerCollectFeeInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): OwnerCollectFeeInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerCollectFeeInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OwnerCollectFeeInfo object`)
    }
    return OwnerCollectFeeInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): OwnerCollectFeeInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerCollectFeeInfo(data.bcs.type)) {
        throw new Error(`object at is not a OwnerCollectFeeInfo object`)
      }

      return OwnerCollectFeeInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerCollectFeeInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<OwnerCollectFeeInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching OwnerCollectFeeInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isOwnerCollectFeeInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a OwnerCollectFeeInfo object`)
    }

    return OwnerCollectFeeInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== OwnerCollectRewardInfo =============================== */

export function isOwnerCollectRewardInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V3}::position_core_clmm::OwnerCollectRewardInfo` + '<')
}

export interface OwnerCollectRewardInfoFields<T extends PhantomTypeArgument> {
  positionId: ToField<ID>
  collectedRewardAmt: ToField<'u64'>
  feeAmt: ToField<'u64'>
}

export type OwnerCollectRewardInfoReified<T extends PhantomTypeArgument> = Reified<
  OwnerCollectRewardInfo<T>,
  OwnerCollectRewardInfoFields<T>
>

export class OwnerCollectRewardInfo<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::position_core_clmm::OwnerCollectRewardInfo`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = OwnerCollectRewardInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::position_core_clmm::OwnerCollectRewardInfo<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = OwnerCollectRewardInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly collectedRewardAmt: ToField<'u64'>
  readonly feeAmt: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: OwnerCollectRewardInfoFields<T>) {
    this.$fullTypeName = composeSuiType(
      OwnerCollectRewardInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::position_core_clmm::OwnerCollectRewardInfo<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.collectedRewardAmt = fields.collectedRewardAmt
    this.feeAmt = fields.feeAmt
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): OwnerCollectRewardInfoReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = OwnerCollectRewardInfo.bcs
    return {
      typeName: OwnerCollectRewardInfo.$typeName,
      fullTypeName: composeSuiType(
        OwnerCollectRewardInfo.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V3}::position_core_clmm::OwnerCollectRewardInfo<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: OwnerCollectRewardInfo.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => OwnerCollectRewardInfo.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        OwnerCollectRewardInfo.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => OwnerCollectRewardInfo.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OwnerCollectRewardInfo.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => OwnerCollectRewardInfo.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        OwnerCollectRewardInfo.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OwnerCollectRewardInfo.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => OwnerCollectRewardInfo.fetch(client, T, id),
      new: (fields: OwnerCollectRewardInfoFields<ToPhantomTypeArgument<T>>) => {
        return new OwnerCollectRewardInfo([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OwnerCollectRewardInfo.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<OwnerCollectRewardInfo<ToPhantomTypeArgument<T>>>> {
    return phantom(OwnerCollectRewardInfo.reified(T))
  }
  static get p() {
    return OwnerCollectRewardInfo.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('OwnerCollectRewardInfo', {
      position_id: ID.bcs,
      collected_reward_amt: bcs.u64(),
      fee_amt: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof OwnerCollectRewardInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!OwnerCollectRewardInfo.cachedBcs) {
      OwnerCollectRewardInfo.cachedBcs = OwnerCollectRewardInfo.instantiateBcs()
    }
    return OwnerCollectRewardInfo.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    return OwnerCollectRewardInfo.reified(typeArg).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      collectedRewardAmt: decodeFromFields('u64', fields.collected_reward_amt),
      feeAmt: decodeFromFields('u64', fields.fee_amt),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    if (!isOwnerCollectRewardInfo(item.type)) {
      throw new Error('not a OwnerCollectRewardInfo type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return OwnerCollectRewardInfo.reified(typeArg).new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      collectedRewardAmt: decodeFromFieldsWithTypes('u64', item.fields.collected_reward_amt),
      feeAmt: decodeFromFieldsWithTypes('u64', item.fields.fee_amt),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    return OwnerCollectRewardInfo.fromFields(typeArg, OwnerCollectRewardInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      collectedRewardAmt: this.collectedRewardAmt.toString(),
      feeAmt: this.feeAmt.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    return OwnerCollectRewardInfo.reified(typeArg).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      collectedRewardAmt: decodeFromJSONField('u64', field.collectedRewardAmt),
      feeAmt: decodeFromJSONField('u64', field.feeAmt),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== OwnerCollectRewardInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(OwnerCollectRewardInfo.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return OwnerCollectRewardInfo.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerCollectRewardInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OwnerCollectRewardInfo object`
      )
    }
    return OwnerCollectRewardInfo.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerCollectRewardInfo(data.bcs.type)) {
        throw new Error(`object at is not a OwnerCollectRewardInfo object`)
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

      return OwnerCollectRewardInfo.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerCollectRewardInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<OwnerCollectRewardInfo<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching OwnerCollectRewardInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isOwnerCollectRewardInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a OwnerCollectRewardInfo object`)
    }

    return OwnerCollectRewardInfo.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== OwnerTakeStashedRewardsInfo =============================== */

export function isOwnerTakeStashedRewardsInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V3}::position_core_clmm::OwnerTakeStashedRewardsInfo` + '<')
}

export interface OwnerTakeStashedRewardsInfoFields<T extends PhantomTypeArgument> {
  positionId: ToField<ID>
  amount: ToField<'u64'>
}

export type OwnerTakeStashedRewardsInfoReified<T extends PhantomTypeArgument> = Reified<
  OwnerTakeStashedRewardsInfo<T>,
  OwnerTakeStashedRewardsInfoFields<T>
>

export class OwnerTakeStashedRewardsInfo<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::position_core_clmm::OwnerTakeStashedRewardsInfo`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = OwnerTakeStashedRewardsInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::position_core_clmm::OwnerTakeStashedRewardsInfo<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = OwnerTakeStashedRewardsInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly amount: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>],
    fields: OwnerTakeStashedRewardsInfoFields<T>
  ) {
    this.$fullTypeName = composeSuiType(
      OwnerTakeStashedRewardsInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::position_core_clmm::OwnerTakeStashedRewardsInfo<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.amount = fields.amount
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): OwnerTakeStashedRewardsInfoReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = OwnerTakeStashedRewardsInfo.bcs
    return {
      typeName: OwnerTakeStashedRewardsInfo.$typeName,
      fullTypeName: composeSuiType(
        OwnerTakeStashedRewardsInfo.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V3}::position_core_clmm::OwnerTakeStashedRewardsInfo<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: OwnerTakeStashedRewardsInfo.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) =>
        OwnerTakeStashedRewardsInfo.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        OwnerTakeStashedRewardsInfo.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) =>
        OwnerTakeStashedRewardsInfo.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OwnerTakeStashedRewardsInfo.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => OwnerTakeStashedRewardsInfo.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        OwnerTakeStashedRewardsInfo.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OwnerTakeStashedRewardsInfo.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) =>
        OwnerTakeStashedRewardsInfo.fetch(client, T, id),
      new: (fields: OwnerTakeStashedRewardsInfoFields<ToPhantomTypeArgument<T>>) => {
        return new OwnerTakeStashedRewardsInfo([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return OwnerTakeStashedRewardsInfo.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>>>> {
    return phantom(OwnerTakeStashedRewardsInfo.reified(T))
  }
  static get p() {
    return OwnerTakeStashedRewardsInfo.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('OwnerTakeStashedRewardsInfo', {
      position_id: ID.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof OwnerTakeStashedRewardsInfo.instantiateBcs> | null =
    null

  static get bcs() {
    if (!OwnerTakeStashedRewardsInfo.cachedBcs) {
      OwnerTakeStashedRewardsInfo.cachedBcs = OwnerTakeStashedRewardsInfo.instantiateBcs()
    }
    return OwnerTakeStashedRewardsInfo.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    return OwnerTakeStashedRewardsInfo.reified(typeArg).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    if (!isOwnerTakeStashedRewardsInfo(item.type)) {
      throw new Error('not a OwnerTakeStashedRewardsInfo type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return OwnerTakeStashedRewardsInfo.reified(typeArg).new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    return OwnerTakeStashedRewardsInfo.fromFields(
      typeArg,
      OwnerTakeStashedRewardsInfo.bcs.parse(data)
    )
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    return OwnerTakeStashedRewardsInfo.reified(typeArg).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== OwnerTakeStashedRewardsInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(OwnerTakeStashedRewardsInfo.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return OwnerTakeStashedRewardsInfo.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerTakeStashedRewardsInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OwnerTakeStashedRewardsInfo object`
      )
    }
    return OwnerTakeStashedRewardsInfo.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerTakeStashedRewardsInfo(data.bcs.type)) {
        throw new Error(`object at is not a OwnerTakeStashedRewardsInfo object`)
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

      return OwnerTakeStashedRewardsInfo.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerTakeStashedRewardsInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching OwnerTakeStashedRewardsInfo object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isOwnerTakeStashedRewardsInfo(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a OwnerTakeStashedRewardsInfo object`)
    }

    return OwnerTakeStashedRewardsInfo.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== DeletePositionInfo =============================== */

export function isDeletePositionInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V3}::position_core_clmm::DeletePositionInfo`
}

export interface DeletePositionInfoFields {
  positionId: ToField<ID>
  capId: ToField<ID>
}

export type DeletePositionInfoReified = Reified<DeletePositionInfo, DeletePositionInfoFields>

export class DeletePositionInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::position_core_clmm::DeletePositionInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DeletePositionInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::position_core_clmm::DeletePositionInfo`
  readonly $typeArgs: []
  readonly $isPhantom = DeletePositionInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly capId: ToField<ID>

  private constructor(typeArgs: [], fields: DeletePositionInfoFields) {
    this.$fullTypeName = composeSuiType(
      DeletePositionInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::position_core_clmm::DeletePositionInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.capId = fields.capId
  }

  static reified(): DeletePositionInfoReified {
    const reifiedBcs = DeletePositionInfo.bcs
    return {
      typeName: DeletePositionInfo.$typeName,
      fullTypeName: composeSuiType(
        DeletePositionInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V3}::position_core_clmm::DeletePositionInfo`,
      typeArgs: [] as [],
      isPhantom: DeletePositionInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeletePositionInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DeletePositionInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeletePositionInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeletePositionInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeletePositionInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DeletePositionInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DeletePositionInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DeletePositionInfo.fetch(client, id),
      new: (fields: DeletePositionInfoFields) => {
        return new DeletePositionInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DeletePositionInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeletePositionInfo>> {
    return phantom(DeletePositionInfo.reified())
  }
  static get p() {
    return DeletePositionInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeletePositionInfo', {
      position_id: ID.bcs,
      cap_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DeletePositionInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!DeletePositionInfo.cachedBcs) {
      DeletePositionInfo.cachedBcs = DeletePositionInfo.instantiateBcs()
    }
    return DeletePositionInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DeletePositionInfo {
    return DeletePositionInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      capId: decodeFromFields(ID.reified(), fields.cap_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DeletePositionInfo {
    if (!isDeletePositionInfo(item.type)) {
      throw new Error('not a DeletePositionInfo type')
    }

    return DeletePositionInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      capId: decodeFromFieldsWithTypes(ID.reified(), item.fields.cap_id),
    })
  }

  static fromBcs(data: Uint8Array): DeletePositionInfo {
    return DeletePositionInfo.fromFields(DeletePositionInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      capId: this.capId,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeletePositionInfo {
    return DeletePositionInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      capId: decodeFromJSONField(ID.reified(), field.capId),
    })
  }

  static fromJSON(json: Record<string, any>): DeletePositionInfo {
    if (json.$typeName !== DeletePositionInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DeletePositionInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DeletePositionInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeletePositionInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DeletePositionInfo object`)
    }
    return DeletePositionInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DeletePositionInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeletePositionInfo(data.bcs.type)) {
        throw new Error(`object at is not a DeletePositionInfo object`)
      }

      return DeletePositionInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeletePositionInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DeletePositionInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DeletePositionInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDeletePositionInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DeletePositionInfo object`)
    }

    return DeletePositionInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== RebalanceInfo =============================== */

export function isRebalanceInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::position_core_clmm::RebalanceInfo`
}

export interface RebalanceInfoFields {
  id: ToField<ID>
  positionId: ToField<ID>
  collectedAmmFeeX: ToField<'u64'>
  collectedAmmFeeY: ToField<'u64'>
  collectedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
  feesTaken: ToField<VecMap<TypeName, 'u64'>>
  takenCx: ToField<'u64'>
  takenCy: ToField<'u64'>
  deltaL: ToField<'u128'>
  deltaX: ToField<'u64'>
  deltaY: ToField<'u64'>
  xRepaid: ToField<'u64'>
  yRepaid: ToField<'u64'>
  addedCx: ToField<'u64'>
  addedCy: ToField<'u64'>
  stashedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
}

export type RebalanceInfoReified = Reified<RebalanceInfo, RebalanceInfoFields>

export class RebalanceInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::position_core_clmm::RebalanceInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RebalanceInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::position_core_clmm::RebalanceInfo`
  readonly $typeArgs: []
  readonly $isPhantom = RebalanceInfo.$isPhantom

  readonly id: ToField<ID>
  readonly positionId: ToField<ID>
  readonly collectedAmmFeeX: ToField<'u64'>
  readonly collectedAmmFeeY: ToField<'u64'>
  readonly collectedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
  readonly feesTaken: ToField<VecMap<TypeName, 'u64'>>
  readonly takenCx: ToField<'u64'>
  readonly takenCy: ToField<'u64'>
  readonly deltaL: ToField<'u128'>
  readonly deltaX: ToField<'u64'>
  readonly deltaY: ToField<'u64'>
  readonly xRepaid: ToField<'u64'>
  readonly yRepaid: ToField<'u64'>
  readonly addedCx: ToField<'u64'>
  readonly addedCy: ToField<'u64'>
  readonly stashedAmmRewards: ToField<VecMap<TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: RebalanceInfoFields) {
    this.$fullTypeName = composeSuiType(
      RebalanceInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::position_core_clmm::RebalanceInfo`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.positionId = fields.positionId
    this.collectedAmmFeeX = fields.collectedAmmFeeX
    this.collectedAmmFeeY = fields.collectedAmmFeeY
    this.collectedAmmRewards = fields.collectedAmmRewards
    this.feesTaken = fields.feesTaken
    this.takenCx = fields.takenCx
    this.takenCy = fields.takenCy
    this.deltaL = fields.deltaL
    this.deltaX = fields.deltaX
    this.deltaY = fields.deltaY
    this.xRepaid = fields.xRepaid
    this.yRepaid = fields.yRepaid
    this.addedCx = fields.addedCx
    this.addedCy = fields.addedCy
    this.stashedAmmRewards = fields.stashedAmmRewards
  }

  static reified(): RebalanceInfoReified {
    const reifiedBcs = RebalanceInfo.bcs
    return {
      typeName: RebalanceInfo.$typeName,
      fullTypeName: composeSuiType(
        RebalanceInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::position_core_clmm::RebalanceInfo`,
      typeArgs: [] as [],
      isPhantom: RebalanceInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RebalanceInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RebalanceInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RebalanceInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RebalanceInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RebalanceInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RebalanceInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RebalanceInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RebalanceInfo.fetch(client, id),
      new: (fields: RebalanceInfoFields) => {
        return new RebalanceInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RebalanceInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RebalanceInfo>> {
    return phantom(RebalanceInfo.reified())
  }
  static get p() {
    return RebalanceInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RebalanceInfo', {
      id: ID.bcs,
      position_id: ID.bcs,
      collected_amm_fee_x: bcs.u64(),
      collected_amm_fee_y: bcs.u64(),
      collected_amm_rewards: VecMap.bcs(TypeName.bcs, bcs.u64()),
      fees_taken: VecMap.bcs(TypeName.bcs, bcs.u64()),
      taken_cx: bcs.u64(),
      taken_cy: bcs.u64(),
      delta_l: bcs.u128(),
      delta_x: bcs.u64(),
      delta_y: bcs.u64(),
      x_repaid: bcs.u64(),
      y_repaid: bcs.u64(),
      added_cx: bcs.u64(),
      added_cy: bcs.u64(),
      stashed_amm_rewards: VecMap.bcs(TypeName.bcs, bcs.u64()),
    })
  }

  private static cachedBcs: ReturnType<typeof RebalanceInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!RebalanceInfo.cachedBcs) {
      RebalanceInfo.cachedBcs = RebalanceInfo.instantiateBcs()
    }
    return RebalanceInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RebalanceInfo {
    return RebalanceInfo.reified().new({
      id: decodeFromFields(ID.reified(), fields.id),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      collectedAmmFeeX: decodeFromFields('u64', fields.collected_amm_fee_x),
      collectedAmmFeeY: decodeFromFields('u64', fields.collected_amm_fee_y),
      collectedAmmRewards: decodeFromFields(
        VecMap.reified(TypeName.reified(), 'u64'),
        fields.collected_amm_rewards
      ),
      feesTaken: decodeFromFields(VecMap.reified(TypeName.reified(), 'u64'), fields.fees_taken),
      takenCx: decodeFromFields('u64', fields.taken_cx),
      takenCy: decodeFromFields('u64', fields.taken_cy),
      deltaL: decodeFromFields('u128', fields.delta_l),
      deltaX: decodeFromFields('u64', fields.delta_x),
      deltaY: decodeFromFields('u64', fields.delta_y),
      xRepaid: decodeFromFields('u64', fields.x_repaid),
      yRepaid: decodeFromFields('u64', fields.y_repaid),
      addedCx: decodeFromFields('u64', fields.added_cx),
      addedCy: decodeFromFields('u64', fields.added_cy),
      stashedAmmRewards: decodeFromFields(
        VecMap.reified(TypeName.reified(), 'u64'),
        fields.stashed_amm_rewards
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RebalanceInfo {
    if (!isRebalanceInfo(item.type)) {
      throw new Error('not a RebalanceInfo type')
    }

    return RebalanceInfo.reified().new({
      id: decodeFromFieldsWithTypes(ID.reified(), item.fields.id),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      collectedAmmFeeX: decodeFromFieldsWithTypes('u64', item.fields.collected_amm_fee_x),
      collectedAmmFeeY: decodeFromFieldsWithTypes('u64', item.fields.collected_amm_fee_y),
      collectedAmmRewards: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.collected_amm_rewards
      ),
      feesTaken: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.fees_taken
      ),
      takenCx: decodeFromFieldsWithTypes('u64', item.fields.taken_cx),
      takenCy: decodeFromFieldsWithTypes('u64', item.fields.taken_cy),
      deltaL: decodeFromFieldsWithTypes('u128', item.fields.delta_l),
      deltaX: decodeFromFieldsWithTypes('u64', item.fields.delta_x),
      deltaY: decodeFromFieldsWithTypes('u64', item.fields.delta_y),
      xRepaid: decodeFromFieldsWithTypes('u64', item.fields.x_repaid),
      yRepaid: decodeFromFieldsWithTypes('u64', item.fields.y_repaid),
      addedCx: decodeFromFieldsWithTypes('u64', item.fields.added_cx),
      addedCy: decodeFromFieldsWithTypes('u64', item.fields.added_cy),
      stashedAmmRewards: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.stashed_amm_rewards
      ),
    })
  }

  static fromBcs(data: Uint8Array): RebalanceInfo {
    return RebalanceInfo.fromFields(RebalanceInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      positionId: this.positionId,
      collectedAmmFeeX: this.collectedAmmFeeX.toString(),
      collectedAmmFeeY: this.collectedAmmFeeY.toString(),
      collectedAmmRewards: this.collectedAmmRewards.toJSONField(),
      feesTaken: this.feesTaken.toJSONField(),
      takenCx: this.takenCx.toString(),
      takenCy: this.takenCy.toString(),
      deltaL: this.deltaL.toString(),
      deltaX: this.deltaX.toString(),
      deltaY: this.deltaY.toString(),
      xRepaid: this.xRepaid.toString(),
      yRepaid: this.yRepaid.toString(),
      addedCx: this.addedCx.toString(),
      addedCy: this.addedCy.toString(),
      stashedAmmRewards: this.stashedAmmRewards.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RebalanceInfo {
    return RebalanceInfo.reified().new({
      id: decodeFromJSONField(ID.reified(), field.id),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      collectedAmmFeeX: decodeFromJSONField('u64', field.collectedAmmFeeX),
      collectedAmmFeeY: decodeFromJSONField('u64', field.collectedAmmFeeY),
      collectedAmmRewards: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), 'u64'),
        field.collectedAmmRewards
      ),
      feesTaken: decodeFromJSONField(VecMap.reified(TypeName.reified(), 'u64'), field.feesTaken),
      takenCx: decodeFromJSONField('u64', field.takenCx),
      takenCy: decodeFromJSONField('u64', field.takenCy),
      deltaL: decodeFromJSONField('u128', field.deltaL),
      deltaX: decodeFromJSONField('u64', field.deltaX),
      deltaY: decodeFromJSONField('u64', field.deltaY),
      xRepaid: decodeFromJSONField('u64', field.xRepaid),
      yRepaid: decodeFromJSONField('u64', field.yRepaid),
      addedCx: decodeFromJSONField('u64', field.addedCx),
      addedCy: decodeFromJSONField('u64', field.addedCy),
      stashedAmmRewards: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), 'u64'),
        field.stashedAmmRewards
      ),
    })
  }

  static fromJSON(json: Record<string, any>): RebalanceInfo {
    if (json.$typeName !== RebalanceInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RebalanceInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RebalanceInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRebalanceInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RebalanceInfo object`)
    }
    return RebalanceInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RebalanceInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRebalanceInfo(data.bcs.type)) {
        throw new Error(`object at is not a RebalanceInfo object`)
      }

      return RebalanceInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RebalanceInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RebalanceInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RebalanceInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRebalanceInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RebalanceInfo object`)
    }

    return RebalanceInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== CollectProtocolFeesInfo =============================== */

export function isCollectProtocolFeesInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V3}::position_core_clmm::CollectProtocolFeesInfo` + '<')
}

export interface CollectProtocolFeesInfoFields<T extends PhantomTypeArgument> {
  positionId: ToField<ID>
  amount: ToField<'u64'>
}

export type CollectProtocolFeesInfoReified<T extends PhantomTypeArgument> = Reified<
  CollectProtocolFeesInfo<T>,
  CollectProtocolFeesInfoFields<T>
>

export class CollectProtocolFeesInfo<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::position_core_clmm::CollectProtocolFeesInfo`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = CollectProtocolFeesInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::position_core_clmm::CollectProtocolFeesInfo<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom = CollectProtocolFeesInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: CollectProtocolFeesInfoFields<T>) {
    this.$fullTypeName = composeSuiType(
      CollectProtocolFeesInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::position_core_clmm::CollectProtocolFeesInfo<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.amount = fields.amount
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): CollectProtocolFeesInfoReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = CollectProtocolFeesInfo.bcs
    return {
      typeName: CollectProtocolFeesInfo.$typeName,
      fullTypeName: composeSuiType(
        CollectProtocolFeesInfo.$typeName,
        ...[extractType(T)]
      ) as `${typeof PKG_V3}::position_core_clmm::CollectProtocolFeesInfo<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: CollectProtocolFeesInfo.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => CollectProtocolFeesInfo.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CollectProtocolFeesInfo.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => CollectProtocolFeesInfo.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollectProtocolFeesInfo.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => CollectProtocolFeesInfo.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CollectProtocolFeesInfo.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CollectProtocolFeesInfo.fromSuiObjectData(T, content),
      fetch: async (client: SuiClient, id: string) => CollectProtocolFeesInfo.fetch(client, T, id),
      new: (fields: CollectProtocolFeesInfoFields<ToPhantomTypeArgument<T>>) => {
        return new CollectProtocolFeesInfo([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CollectProtocolFeesInfo.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T
  ): PhantomReified<ToTypeStr<CollectProtocolFeesInfo<ToPhantomTypeArgument<T>>>> {
    return phantom(CollectProtocolFeesInfo.reified(T))
  }
  static get p() {
    return CollectProtocolFeesInfo.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('CollectProtocolFeesInfo', {
      position_id: ID.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollectProtocolFeesInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!CollectProtocolFeesInfo.cachedBcs) {
      CollectProtocolFeesInfo.cachedBcs = CollectProtocolFeesInfo.instantiateBcs()
    }
    return CollectProtocolFeesInfo.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    return CollectProtocolFeesInfo.reified(typeArg).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    if (!isCollectProtocolFeesInfo(item.type)) {
      throw new Error('not a CollectProtocolFeesInfo type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return CollectProtocolFeesInfo.reified(typeArg).new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    return CollectProtocolFeesInfo.fromFields(typeArg, CollectProtocolFeesInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    return CollectProtocolFeesInfo.reified(typeArg).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== CollectProtocolFeesInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(CollectProtocolFeesInfo.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return CollectProtocolFeesInfo.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollectProtocolFeesInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CollectProtocolFeesInfo object`
      )
    }
    return CollectProtocolFeesInfo.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollectProtocolFeesInfo(data.bcs.type)) {
        throw new Error(`object at is not a CollectProtocolFeesInfo object`)
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

      return CollectProtocolFeesInfo.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollectProtocolFeesInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T,
    id: string
  ): Promise<CollectProtocolFeesInfo<ToPhantomTypeArgument<T>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching CollectProtocolFeesInfo object at id ${id}: ${res.error.code}`
      )
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCollectProtocolFeesInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a CollectProtocolFeesInfo object`)
    }

    return CollectProtocolFeesInfo.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== DeletedPositionCollectedFeesInfo =============================== */

export function isDeletedPositionCollectedFeesInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V3}::position_core_clmm::DeletedPositionCollectedFeesInfo`
}

export interface DeletedPositionCollectedFeesInfoFields {
  positionId: ToField<ID>
  amounts: ToField<VecMap<TypeName, 'u64'>>
}

export type DeletedPositionCollectedFeesInfoReified = Reified<
  DeletedPositionCollectedFeesInfo,
  DeletedPositionCollectedFeesInfoFields
>

export class DeletedPositionCollectedFeesInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::position_core_clmm::DeletedPositionCollectedFeesInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DeletedPositionCollectedFeesInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::position_core_clmm::DeletedPositionCollectedFeesInfo`
  readonly $typeArgs: []
  readonly $isPhantom = DeletedPositionCollectedFeesInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly amounts: ToField<VecMap<TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: DeletedPositionCollectedFeesInfoFields) {
    this.$fullTypeName = composeSuiType(
      DeletedPositionCollectedFeesInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::position_core_clmm::DeletedPositionCollectedFeesInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.amounts = fields.amounts
  }

  static reified(): DeletedPositionCollectedFeesInfoReified {
    const reifiedBcs = DeletedPositionCollectedFeesInfo.bcs
    return {
      typeName: DeletedPositionCollectedFeesInfo.$typeName,
      fullTypeName: composeSuiType(
        DeletedPositionCollectedFeesInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V3}::position_core_clmm::DeletedPositionCollectedFeesInfo`,
      typeArgs: [] as [],
      isPhantom: DeletedPositionCollectedFeesInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        DeletedPositionCollectedFeesInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        DeletedPositionCollectedFeesInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        DeletedPositionCollectedFeesInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeletedPositionCollectedFeesInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeletedPositionCollectedFeesInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        DeletedPositionCollectedFeesInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        DeletedPositionCollectedFeesInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        DeletedPositionCollectedFeesInfo.fetch(client, id),
      new: (fields: DeletedPositionCollectedFeesInfoFields) => {
        return new DeletedPositionCollectedFeesInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DeletedPositionCollectedFeesInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeletedPositionCollectedFeesInfo>> {
    return phantom(DeletedPositionCollectedFeesInfo.reified())
  }
  static get p() {
    return DeletedPositionCollectedFeesInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeletedPositionCollectedFeesInfo', {
      position_id: ID.bcs,
      amounts: VecMap.bcs(TypeName.bcs, bcs.u64()),
    })
  }

  private static cachedBcs: ReturnType<
    typeof DeletedPositionCollectedFeesInfo.instantiateBcs
  > | null = null

  static get bcs() {
    if (!DeletedPositionCollectedFeesInfo.cachedBcs) {
      DeletedPositionCollectedFeesInfo.cachedBcs = DeletedPositionCollectedFeesInfo.instantiateBcs()
    }
    return DeletedPositionCollectedFeesInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DeletedPositionCollectedFeesInfo {
    return DeletedPositionCollectedFeesInfo.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      amounts: decodeFromFields(VecMap.reified(TypeName.reified(), 'u64'), fields.amounts),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DeletedPositionCollectedFeesInfo {
    if (!isDeletedPositionCollectedFeesInfo(item.type)) {
      throw new Error('not a DeletedPositionCollectedFeesInfo type')
    }

    return DeletedPositionCollectedFeesInfo.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      amounts: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.amounts
      ),
    })
  }

  static fromBcs(data: Uint8Array): DeletedPositionCollectedFeesInfo {
    return DeletedPositionCollectedFeesInfo.fromFields(
      DeletedPositionCollectedFeesInfo.bcs.parse(data)
    )
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      amounts: this.amounts.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeletedPositionCollectedFeesInfo {
    return DeletedPositionCollectedFeesInfo.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      amounts: decodeFromJSONField(VecMap.reified(TypeName.reified(), 'u64'), field.amounts),
    })
  }

  static fromJSON(json: Record<string, any>): DeletedPositionCollectedFeesInfo {
    if (json.$typeName !== DeletedPositionCollectedFeesInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DeletedPositionCollectedFeesInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DeletedPositionCollectedFeesInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeletedPositionCollectedFeesInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a DeletedPositionCollectedFeesInfo object`
      )
    }
    return DeletedPositionCollectedFeesInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DeletedPositionCollectedFeesInfo {
    if (data.bcs) {
      if (
        data.bcs.dataType !== 'moveObject' ||
        !isDeletedPositionCollectedFeesInfo(data.bcs.type)
      ) {
        throw new Error(`object at is not a DeletedPositionCollectedFeesInfo object`)
      }

      return DeletedPositionCollectedFeesInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeletedPositionCollectedFeesInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DeletedPositionCollectedFeesInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching DeletedPositionCollectedFeesInfo object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isDeletedPositionCollectedFeesInfo(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a DeletedPositionCollectedFeesInfo object`)
    }

    return DeletedPositionCollectedFeesInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== BadDebtRepaid =============================== */

export function isBadDebtRepaid(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V16}::position_core_clmm::BadDebtRepaid` + '<')
}

export interface BadDebtRepaidFields<ST extends PhantomTypeArgument> {
  positionId: ToField<ID>
  sharesRepaid: ToField<'u128'>
  balanceRepaid: ToField<'u64'>
}

export type BadDebtRepaidReified<ST extends PhantomTypeArgument> = Reified<
  BadDebtRepaid<ST>,
  BadDebtRepaidFields<ST>
>

export class BadDebtRepaid<ST extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V16}::position_core_clmm::BadDebtRepaid`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = BadDebtRepaid.$typeName
  readonly $fullTypeName: `${typeof PKG_V16}::position_core_clmm::BadDebtRepaid<${PhantomToTypeStr<ST>}>`
  readonly $typeArgs: [PhantomToTypeStr<ST>]
  readonly $isPhantom = BadDebtRepaid.$isPhantom

  readonly positionId: ToField<ID>
  readonly sharesRepaid: ToField<'u128'>
  readonly balanceRepaid: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<ST>], fields: BadDebtRepaidFields<ST>) {
    this.$fullTypeName = composeSuiType(
      BadDebtRepaid.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V16}::position_core_clmm::BadDebtRepaid<${PhantomToTypeStr<ST>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.sharesRepaid = fields.sharesRepaid
    this.balanceRepaid = fields.balanceRepaid
  }

  static reified<ST extends PhantomReified<PhantomTypeArgument>>(
    ST: ST
  ): BadDebtRepaidReified<ToPhantomTypeArgument<ST>> {
    const reifiedBcs = BadDebtRepaid.bcs
    return {
      typeName: BadDebtRepaid.$typeName,
      fullTypeName: composeSuiType(
        BadDebtRepaid.$typeName,
        ...[extractType(ST)]
      ) as `${typeof PKG_V16}::position_core_clmm::BadDebtRepaid<${PhantomToTypeStr<ToPhantomTypeArgument<ST>>}>`,
      typeArgs: [extractType(ST)] as [PhantomToTypeStr<ToPhantomTypeArgument<ST>>],
      isPhantom: BadDebtRepaid.$isPhantom,
      reifiedTypeArgs: [ST],
      fromFields: (fields: Record<string, any>) => BadDebtRepaid.fromFields(ST, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BadDebtRepaid.fromFieldsWithTypes(ST, item),
      fromBcs: (data: Uint8Array) => BadDebtRepaid.fromFields(ST, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BadDebtRepaid.fromJSONField(ST, field),
      fromJSON: (json: Record<string, any>) => BadDebtRepaid.fromJSON(ST, json),
      fromSuiParsedData: (content: SuiParsedData) => BadDebtRepaid.fromSuiParsedData(ST, content),
      fromSuiObjectData: (content: SuiObjectData) => BadDebtRepaid.fromSuiObjectData(ST, content),
      fetch: async (client: SuiClient, id: string) => BadDebtRepaid.fetch(client, ST, id),
      new: (fields: BadDebtRepaidFields<ToPhantomTypeArgument<ST>>) => {
        return new BadDebtRepaid([extractType(ST)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BadDebtRepaid.reified
  }

  static phantom<ST extends PhantomReified<PhantomTypeArgument>>(
    ST: ST
  ): PhantomReified<ToTypeStr<BadDebtRepaid<ToPhantomTypeArgument<ST>>>> {
    return phantom(BadDebtRepaid.reified(ST))
  }
  static get p() {
    return BadDebtRepaid.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('BadDebtRepaid', {
      position_id: ID.bcs,
      shares_repaid: bcs.u128(),
      balance_repaid: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BadDebtRepaid.instantiateBcs> | null = null

  static get bcs() {
    if (!BadDebtRepaid.cachedBcs) {
      BadDebtRepaid.cachedBcs = BadDebtRepaid.instantiateBcs()
    }
    return BadDebtRepaid.cachedBcs
  }

  static fromFields<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    fields: Record<string, any>
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    return BadDebtRepaid.reified(typeArg).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      sharesRepaid: decodeFromFields('u128', fields.shares_repaid),
      balanceRepaid: decodeFromFields('u64', fields.balance_repaid),
    })
  }

  static fromFieldsWithTypes<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    item: FieldsWithTypes
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    if (!isBadDebtRepaid(item.type)) {
      throw new Error('not a BadDebtRepaid type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return BadDebtRepaid.reified(typeArg).new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      sharesRepaid: decodeFromFieldsWithTypes('u128', item.fields.shares_repaid),
      balanceRepaid: decodeFromFieldsWithTypes('u64', item.fields.balance_repaid),
    })
  }

  static fromBcs<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    data: Uint8Array
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    return BadDebtRepaid.fromFields(typeArg, BadDebtRepaid.bcs.parse(data))
  }

  toJSONField() {
    return {
      positionId: this.positionId,
      sharesRepaid: this.sharesRepaid.toString(),
      balanceRepaid: this.balanceRepaid.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    field: any
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    return BadDebtRepaid.reified(typeArg).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      sharesRepaid: decodeFromJSONField('u128', field.sharesRepaid),
      balanceRepaid: decodeFromJSONField('u64', field.balanceRepaid),
    })
  }

  static fromJSON<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    json: Record<string, any>
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    if (json.$typeName !== BadDebtRepaid.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BadDebtRepaid.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return BadDebtRepaid.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    content: SuiParsedData
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBadDebtRepaid(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BadDebtRepaid object`)
    }
    return BadDebtRepaid.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    data: SuiObjectData
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBadDebtRepaid(data.bcs.type)) {
        throw new Error(`object at is not a BadDebtRepaid object`)
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

      return BadDebtRepaid.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BadDebtRepaid.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<ST extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: ST,
    id: string
  ): Promise<BadDebtRepaid<ToPhantomTypeArgument<ST>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BadDebtRepaid object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBadDebtRepaid(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BadDebtRepaid object`)
    }

    return BadDebtRepaid.fromSuiObjectData(typeArg, res.data)
  }
}
