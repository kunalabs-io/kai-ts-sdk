/**
 * Core implementation for leveraged concentrated liquidity market maker (CLMM) positions.
 *
 * This module implements the theoretical framework described in "Concentrated Liquidity
 * with Leverage" ([arXiv:2409.12803](https://arxiv.org/pdf/2409.12803)), providing mathematically
 * proven safe leveraged liquidity provisioning. It serves as the foundational layer for managing
 * leveraged positions on concentrated liquidity AMMs with formal guarantees about margin behavior,
 * liquidation safety, and oracle manipulation resistance.
 *
 * The module provides a protocol-agnostic interface that wrapper modules (like `cetus.move`
 * and `bluefin_spot.move`) use to implement protocol-specific position management while
 * maintaining consistent risk management and operational logic backed by formal mathematical analysis.
 *
 * Wrapper modules implement protocol-specific logic by:
 * 1. Calling position core macros with protocol-specific lambda functions
 * 2. Handling protocol-specific LP position types and operations
 * 3. Translating between generic interfaces and protocol-specific calls
 *
 * This design ensures that core business logic, risk management, and mathematical
 * calculations remain consistent across all supported protocols while enabling
 * seamless integration with diverse AMM architectures.
 */

import { bcs, BcsType } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  toBcs,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'
import { TypeName } from '../../std/type-name/structs'
import { Bag } from '../../sui/bag/structs'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'
import { BalanceBag } from '../balance-bag/structs'
import { PositionModel } from '../position-model-clmm/structs'
import { FacilDebtBag, FacilDebtShare, LendFacilCap } from '../supply-pool/structs'

/* ============================== ACreateConfig =============================== */

export function isACreateConfig(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ACreateConfig')
    }::position_core_clmm::ACreateConfig`
}

export interface ACreateConfigFields {
  dummyField: ToField<'bool'>
}

export type ACreateConfigReified = Reified<ACreateConfig, ACreateConfigFields>

export type ACreateConfigJSONField = {
  dummyField: boolean
}

export type ACreateConfigJSON = {
  $typeName: typeof ACreateConfig.$typeName
  $typeArgs: []
} & ACreateConfigJSONField

/** Access control witness for position config creation. */
export class ACreateConfig implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::ACreateConfig` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ACreateConfig')
    }::position_core_clmm::ACreateConfig` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ACreateConfig.$typeName = ACreateConfig.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::ACreateConfig`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ACreateConfig.$isPhantom = ACreateConfig.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ACreateConfigFields) {
    this.$fullTypeName = composeSuiType(
      ACreateConfig.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::ACreateConfig`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ACreateConfigReified {
    const reifiedBcs = ACreateConfig.bcs
    return {
      get typeName() {
        return ACreateConfig.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ACreateConfig.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::ACreateConfig`
      },
      typeArgs: [] as [],
      isPhantom: ACreateConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ACreateConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ACreateConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ACreateConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ACreateConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ACreateConfig.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ACreateConfig.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ACreateConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ACreateConfig.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ACreateConfig.fetch(client, id),
      new: (fields: ACreateConfigFields) => {
        return new ACreateConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ACreateConfigReified {
    return ACreateConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ACreateConfig>> {
    return phantom(ACreateConfig.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ACreateConfig>> {
    return ACreateConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ACreateConfig', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ACreateConfig.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ACreateConfig.instantiateBcs> {
    if (!ACreateConfig.cachedBcs) {
      ACreateConfig.cachedBcs = ACreateConfig.instantiateBcs()
    }
    return ACreateConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ACreateConfig {
    return ACreateConfig.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): ACreateConfigJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ACreateConfigJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ACreateConfig {
    return ACreateConfig.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ACreateConfig {
    if (json.$typeName !== ACreateConfig.$typeName) {
      throw new Error(
        `not a ACreateConfig json object: expected '${ACreateConfig.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ACreateConfig.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ACreateConfig {
    if (!isACreateConfig(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ACreateConfig object`)
    }
    return ACreateConfig.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ACreateConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ACreateConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isACreateConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ACreateConfig object`)
    }
    return ACreateConfig.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ACreateConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ACreateConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isACreateConfig(data.bcs.type)) {
        throw new Error(`object at is not a ACreateConfig object`)
      }

      return ACreateConfig.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ACreateConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ACreateConfig> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isACreateConfig(object.type)) {
      throw new Error(`object at id ${id} is not a ACreateConfig object`)
    }
    return ACreateConfig.fromBcs(object.content)
  }
}

/* ============================== AModifyConfig =============================== */

export function isAModifyConfig(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AModifyConfig')
    }::position_core_clmm::AModifyConfig`
}

export interface AModifyConfigFields {
  dummyField: ToField<'bool'>
}

export type AModifyConfigReified = Reified<AModifyConfig, AModifyConfigFields>

export type AModifyConfigJSONField = {
  dummyField: boolean
}

export type AModifyConfigJSON = {
  $typeName: typeof AModifyConfig.$typeName
  $typeArgs: []
} & AModifyConfigJSONField

/** Access control witness for position config modification. */
export class AModifyConfig implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::AModifyConfig` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AModifyConfig')
    }::position_core_clmm::AModifyConfig` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AModifyConfig.$typeName = AModifyConfig.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::AModifyConfig`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AModifyConfig.$isPhantom = AModifyConfig.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AModifyConfigFields) {
    this.$fullTypeName = composeSuiType(
      AModifyConfig.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::AModifyConfig`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AModifyConfigReified {
    const reifiedBcs = AModifyConfig.bcs
    return {
      get typeName() {
        return AModifyConfig.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AModifyConfig.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::AModifyConfig`
      },
      typeArgs: [] as [],
      isPhantom: AModifyConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AModifyConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AModifyConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AModifyConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AModifyConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AModifyConfig.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AModifyConfig.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AModifyConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AModifyConfig.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AModifyConfig.fetch(client, id),
      new: (fields: AModifyConfigFields) => {
        return new AModifyConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AModifyConfigReified {
    return AModifyConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AModifyConfig>> {
    return phantom(AModifyConfig.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AModifyConfig>> {
    return AModifyConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AModifyConfig', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AModifyConfig.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AModifyConfig.instantiateBcs> {
    if (!AModifyConfig.cachedBcs) {
      AModifyConfig.cachedBcs = AModifyConfig.instantiateBcs()
    }
    return AModifyConfig.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AModifyConfig {
    return AModifyConfig.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): AModifyConfigJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): AModifyConfigJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AModifyConfig {
    return AModifyConfig.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AModifyConfig {
    if (json.$typeName !== AModifyConfig.$typeName) {
      throw new Error(
        `not a AModifyConfig json object: expected '${AModifyConfig.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AModifyConfig.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AModifyConfig {
    if (!isAModifyConfig(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AModifyConfig object`)
    }
    return AModifyConfig.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AModifyConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AModifyConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAModifyConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AModifyConfig object`)
    }
    return AModifyConfig.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AModifyConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AModifyConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAModifyConfig(data.bcs.type)) {
        throw new Error(`object at is not a AModifyConfig object`)
      }

      return AModifyConfig.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AModifyConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AModifyConfig> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAModifyConfig(object.type)) {
      throw new Error(`object at id ${id} is not a AModifyConfig object`)
    }
    return AModifyConfig.fromBcs(object.content)
  }
}

/* ============================== AMigrate =============================== */

export function isAMigrate(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AMigrate')
    }::position_core_clmm::AMigrate`
}

export interface AMigrateFields {
  dummyField: ToField<'bool'>
}

export type AMigrateReified = Reified<AMigrate, AMigrateFields>

export type AMigrateJSONField = {
  dummyField: boolean
}

export type AMigrateJSON = {
  $typeName: typeof AMigrate.$typeName
  $typeArgs: []
} & AMigrateJSONField

/** Access control witness for module migrations. */
export class AMigrate implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::AMigrate` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AMigrate')
    }::position_core_clmm::AMigrate` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AMigrate.$typeName = AMigrate.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::AMigrate`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AMigrate.$isPhantom = AMigrate.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AMigrateFields) {
    this.$fullTypeName = composeSuiType(
      AMigrate.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::AMigrate`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AMigrateReified {
    const reifiedBcs = AMigrate.bcs
    return {
      get typeName() {
        return AMigrate.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AMigrate.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::AMigrate`
      },
      typeArgs: [] as [],
      isPhantom: AMigrate.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AMigrate.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AMigrate.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AMigrate.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AMigrate.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AMigrate.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AMigrate.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AMigrate.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AMigrate.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AMigrate.fetch(client, id),
      new: (fields: AMigrateFields) => {
        return new AMigrate([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AMigrateReified {
    return AMigrate.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AMigrate>> {
    return phantom(AMigrate.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AMigrate>> {
    return AMigrate.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AMigrate', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AMigrate.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AMigrate.instantiateBcs> {
    if (!AMigrate.cachedBcs) {
      AMigrate.cachedBcs = AMigrate.instantiateBcs()
    }
    return AMigrate.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AMigrate {
    return AMigrate.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): AMigrateJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): AMigrateJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AMigrate {
    return AMigrate.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AMigrate {
    if (json.$typeName !== AMigrate.$typeName) {
      throw new Error(
        `not a AMigrate json object: expected '${AMigrate.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AMigrate.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AMigrate {
    if (!isAMigrate(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AMigrate object`)
    }
    return AMigrate.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AMigrate.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AMigrate {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAMigrate(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AMigrate object`)
    }
    return AMigrate.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AMigrate.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AMigrate {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAMigrate(data.bcs.type)) {
        throw new Error(`object at is not a AMigrate object`)
      }

      return AMigrate.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AMigrate.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AMigrate> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAMigrate(object.type)) {
      throw new Error(`object at id ${id} is not a AMigrate object`)
    }
    return AMigrate.fromBcs(object.content)
  }
}

/* ============================== ADeleverage =============================== */

export function isADeleverage(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ADeleverage')
    }::position_core_clmm::ADeleverage`
}

export interface ADeleverageFields {
  dummyField: ToField<'bool'>
}

export type ADeleverageReified = Reified<ADeleverage, ADeleverageFields>

export type ADeleverageJSONField = {
  dummyField: boolean
}

export type ADeleverageJSON = {
  $typeName: typeof ADeleverage.$typeName
  $typeArgs: []
} & ADeleverageJSONField

/** Access control witness for position deleveraging. */
export class ADeleverage implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::ADeleverage` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ADeleverage')
    }::position_core_clmm::ADeleverage` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ADeleverage.$typeName = ADeleverage.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::ADeleverage`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ADeleverage.$isPhantom = ADeleverage.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ADeleverageFields) {
    this.$fullTypeName = composeSuiType(
      ADeleverage.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::ADeleverage`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ADeleverageReified {
    const reifiedBcs = ADeleverage.bcs
    return {
      get typeName() {
        return ADeleverage.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ADeleverage.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::ADeleverage`
      },
      typeArgs: [] as [],
      isPhantom: ADeleverage.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ADeleverage.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ADeleverage.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ADeleverage.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ADeleverage.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ADeleverage.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ADeleverage.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ADeleverage.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ADeleverage.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ADeleverage.fetch(client, id),
      new: (fields: ADeleverageFields) => {
        return new ADeleverage([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ADeleverageReified {
    return ADeleverage.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ADeleverage>> {
    return phantom(ADeleverage.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ADeleverage>> {
    return ADeleverage.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ADeleverage', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ADeleverage.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ADeleverage.instantiateBcs> {
    if (!ADeleverage.cachedBcs) {
      ADeleverage.cachedBcs = ADeleverage.instantiateBcs()
    }
    return ADeleverage.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ADeleverage {
    return ADeleverage.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): ADeleverageJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ADeleverageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ADeleverage {
    return ADeleverage.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ADeleverage {
    if (json.$typeName !== ADeleverage.$typeName) {
      throw new Error(
        `not a ADeleverage json object: expected '${ADeleverage.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ADeleverage.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ADeleverage {
    if (!isADeleverage(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ADeleverage object`)
    }
    return ADeleverage.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ADeleverage.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ADeleverage {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isADeleverage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ADeleverage object`)
    }
    return ADeleverage.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ADeleverage.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ADeleverage {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isADeleverage(data.bcs.type)) {
        throw new Error(`object at is not a ADeleverage object`)
      }

      return ADeleverage.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ADeleverage.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ADeleverage> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isADeleverage(object.type)) {
      throw new Error(`object at id ${id} is not a ADeleverage object`)
    }
    return ADeleverage.fromBcs(object.content)
  }
}

/* ============================== ARebalance =============================== */

export function isARebalance(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ARebalance')
    }::position_core_clmm::ARebalance`
}

export interface ARebalanceFields {
  dummyField: ToField<'bool'>
}

export type ARebalanceReified = Reified<ARebalance, ARebalanceFields>

export type ARebalanceJSONField = {
  dummyField: boolean
}

export type ARebalanceJSON = {
  $typeName: typeof ARebalance.$typeName
  $typeArgs: []
} & ARebalanceJSONField

/** Access control witness for position rebalancing. */
export class ARebalance implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::ARebalance` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ARebalance')
    }::position_core_clmm::ARebalance` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ARebalance.$typeName = ARebalance.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::ARebalance`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ARebalance.$isPhantom = ARebalance.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ARebalanceFields) {
    this.$fullTypeName = composeSuiType(
      ARebalance.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::ARebalance`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ARebalanceReified {
    const reifiedBcs = ARebalance.bcs
    return {
      get typeName() {
        return ARebalance.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ARebalance.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::ARebalance`
      },
      typeArgs: [] as [],
      isPhantom: ARebalance.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ARebalance.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ARebalance.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ARebalance.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ARebalance.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ARebalance.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ARebalance.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ARebalance.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ARebalance.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ARebalance.fetch(client, id),
      new: (fields: ARebalanceFields) => {
        return new ARebalance([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ARebalanceReified {
    return ARebalance.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ARebalance>> {
    return phantom(ARebalance.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ARebalance>> {
    return ARebalance.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ARebalance', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ARebalance.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ARebalance.instantiateBcs> {
    if (!ARebalance.cachedBcs) {
      ARebalance.cachedBcs = ARebalance.instantiateBcs()
    }
    return ARebalance.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ARebalance {
    return ARebalance.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): ARebalanceJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ARebalanceJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ARebalance {
    return ARebalance.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ARebalance {
    if (json.$typeName !== ARebalance.$typeName) {
      throw new Error(
        `not a ARebalance json object: expected '${ARebalance.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ARebalance.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ARebalance {
    if (!isARebalance(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ARebalance object`)
    }
    return ARebalance.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ARebalance.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ARebalance {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isARebalance(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ARebalance object`)
    }
    return ARebalance.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ARebalance.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ARebalance {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isARebalance(data.bcs.type)) {
        throw new Error(`object at is not a ARebalance object`)
      }

      return ARebalance.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ARebalance.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ARebalance> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isARebalance(object.type)) {
      throw new Error(`object at id ${id} is not a ARebalance object`)
    }
    return ARebalance.fromBcs(object.content)
  }
}

/* ============================== ACollectProtocolFees =============================== */

export function isACollectProtocolFees(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ACollectProtocolFees')
    }::position_core_clmm::ACollectProtocolFees`
}

export interface ACollectProtocolFeesFields {
  dummyField: ToField<'bool'>
}

export type ACollectProtocolFeesReified = Reified<ACollectProtocolFees, ACollectProtocolFeesFields>

export type ACollectProtocolFeesJSONField = {
  dummyField: boolean
}

export type ACollectProtocolFeesJSON = {
  $typeName: typeof ACollectProtocolFees.$typeName
  $typeArgs: []
} & ACollectProtocolFeesJSONField

/** Access control witness for protocol fee collection. */
export class ACollectProtocolFees implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::ACollectProtocolFees` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ACollectProtocolFees')
    }::position_core_clmm::ACollectProtocolFees` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ACollectProtocolFees.$typeName = ACollectProtocolFees.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::ACollectProtocolFees`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ACollectProtocolFees.$isPhantom = ACollectProtocolFees.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ACollectProtocolFeesFields) {
    this.$fullTypeName = composeSuiType(
      ACollectProtocolFees.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::ACollectProtocolFees`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ACollectProtocolFeesReified {
    const reifiedBcs = ACollectProtocolFees.bcs
    return {
      get typeName() {
        return ACollectProtocolFees.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ACollectProtocolFees.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::ACollectProtocolFees`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ACollectProtocolFees.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        ACollectProtocolFees.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ACollectProtocolFees.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        ACollectProtocolFees.fetch(client, id),
      new: (fields: ACollectProtocolFeesFields) => {
        return new ACollectProtocolFees([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ACollectProtocolFeesReified {
    return ACollectProtocolFees.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ACollectProtocolFees>> {
    return phantom(ACollectProtocolFees.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ACollectProtocolFees>> {
    return ACollectProtocolFees.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ACollectProtocolFees', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ACollectProtocolFees.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ACollectProtocolFees.instantiateBcs> {
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

  toJSONField(): ACollectProtocolFeesJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ACollectProtocolFeesJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ACollectProtocolFees {
    return ACollectProtocolFees.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ACollectProtocolFees {
    if (json.$typeName !== ACollectProtocolFees.$typeName) {
      throw new Error(
        `not a ACollectProtocolFees json object: expected '${ACollectProtocolFees.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ACollectProtocolFees.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ACollectProtocolFees {
    if (!isACollectProtocolFees(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ACollectProtocolFees object`)
    }
    return ACollectProtocolFees.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ACollectProtocolFees.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ACollectProtocolFees {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isACollectProtocolFees(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ACollectProtocolFees object`,
      )
    }
    return ACollectProtocolFees.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ACollectProtocolFees.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ACollectProtocolFees {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isACollectProtocolFees(data.bcs.type)) {
        throw new Error(`object at is not a ACollectProtocolFees object`)
      }

      return ACollectProtocolFees.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ACollectProtocolFees.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ACollectProtocolFees> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isACollectProtocolFees(object.type)) {
      throw new Error(`object at id ${id} is not a ACollectProtocolFees object`)
    }
    return ACollectProtocolFees.fromBcs(object.content)
  }
}

/* ============================== ARepayBadDebt =============================== */

export function isARepayBadDebt(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ARepayBadDebt')
    }::position_core_clmm::ARepayBadDebt`
}

export interface ARepayBadDebtFields {
  dummyField: ToField<'bool'>
}

export type ARepayBadDebtReified = Reified<ARepayBadDebt, ARepayBadDebtFields>

export type ARepayBadDebtJSONField = {
  dummyField: boolean
}

export type ARepayBadDebtJSON = {
  $typeName: typeof ARepayBadDebt.$typeName
  $typeArgs: []
} & ARepayBadDebtJSONField

/** Access control witness for bad debt repayment. */
export class ARepayBadDebt implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::ARepayBadDebt` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ARepayBadDebt')
    }::position_core_clmm::ARepayBadDebt` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ARepayBadDebt.$typeName = ARepayBadDebt.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::ARepayBadDebt`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ARepayBadDebt.$isPhantom = ARepayBadDebt.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ARepayBadDebtFields) {
    this.$fullTypeName = composeSuiType(
      ARepayBadDebt.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::ARepayBadDebt`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ARepayBadDebtReified {
    const reifiedBcs = ARepayBadDebt.bcs
    return {
      get typeName() {
        return ARepayBadDebt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ARepayBadDebt.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::ARepayBadDebt`
      },
      typeArgs: [] as [],
      isPhantom: ARepayBadDebt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ARepayBadDebt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ARepayBadDebt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ARepayBadDebt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ARepayBadDebt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ARepayBadDebt.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ARepayBadDebt.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ARepayBadDebt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ARepayBadDebt.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ARepayBadDebt.fetch(client, id),
      new: (fields: ARepayBadDebtFields) => {
        return new ARepayBadDebt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ARepayBadDebtReified {
    return ARepayBadDebt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ARepayBadDebt>> {
    return phantom(ARepayBadDebt.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ARepayBadDebt>> {
    return ARepayBadDebt.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ARepayBadDebt', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ARepayBadDebt.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ARepayBadDebt.instantiateBcs> {
    if (!ARepayBadDebt.cachedBcs) {
      ARepayBadDebt.cachedBcs = ARepayBadDebt.instantiateBcs()
    }
    return ARepayBadDebt.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ARepayBadDebt {
    return ARepayBadDebt.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): ARepayBadDebtJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ARepayBadDebtJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ARepayBadDebt {
    return ARepayBadDebt.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ARepayBadDebt {
    if (json.$typeName !== ARepayBadDebt.$typeName) {
      throw new Error(
        `not a ARepayBadDebt json object: expected '${ARepayBadDebt.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ARepayBadDebt.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ARepayBadDebt {
    if (!isARepayBadDebt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ARepayBadDebt object`)
    }
    return ARepayBadDebt.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ARepayBadDebt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ARepayBadDebt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isARepayBadDebt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ARepayBadDebt object`)
    }
    return ARepayBadDebt.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ARepayBadDebt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ARepayBadDebt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isARepayBadDebt(data.bcs.type)) {
        throw new Error(`object at is not a ARepayBadDebt object`)
      }

      return ARepayBadDebt.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ARepayBadDebt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ARepayBadDebt> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isARepayBadDebt(object.type)) {
      throw new Error(`object at id ${id} is not a ARepayBadDebt object`)
    }
    return ARepayBadDebt.fromBcs(object.content)
  }
}

/* ============================== CreatePositionTicket =============================== */

export function isCreatePositionTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::CreatePositionTicket')
    }::position_core_clmm::CreatePositionTicket` + '<',
  )
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

export type CreatePositionTicketJSONField<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  I32 extends TypeArgument,
> = {
  configId: string
  tickA: ToJSON<I32>
  tickB: ToJSON<I32>
  dx: string
  dy: string
  deltaL: string
  principalX: ToJSON<Balance<X>>
  principalY: ToJSON<Balance<Y>>
  borrowedX: ToJSON<Balance<X>>
  borrowedY: ToJSON<Balance<Y>>
  debtBag: ToJSON<FacilDebtBag>
}

export type CreatePositionTicketJSON<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  I32 extends TypeArgument,
> = {
  $typeName: typeof CreatePositionTicket.$typeName
  $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>, ToTypeStr<I32>]
} & CreatePositionTicketJSONField<X, Y, I32>

/** Ticket for creating a new leveraged position with borrowed funds. */
export class CreatePositionTicket<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  I32 extends TypeArgument,
> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::CreatePositionTicket` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::CreatePositionTicket')
    }::position_core_clmm::CreatePositionTicket` as const
  }
  static readonly $numTypeParams = 3
  static readonly $isPhantom = [true, true, false] as const

  readonly $typeName: typeof CreatePositionTicket.$typeName = CreatePositionTicket.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::CreatePositionTicket<${PhantomToTypeStr<
    X
  >}, ${PhantomToTypeStr<Y>}, ${ToTypeStr<I32>}>`
  readonly $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>, ToTypeStr<I32>]
  readonly $isPhantom: typeof CreatePositionTicket.$isPhantom = CreatePositionTicket.$isPhantom

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
    fields: CreatePositionTicketFields<X, Y, I32>,
  ) {
    this.$fullTypeName = composeSuiType(
      CreatePositionTicket.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::CreatePositionTicket<${PhantomToTypeStr<
      X
    >}, ${PhantomToTypeStr<Y>}, ${ToTypeStr<I32>}>`
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
    I32: I32,
  ): CreatePositionTicketReified<
    ToPhantomTypeArgument<X>,
    ToPhantomTypeArgument<Y>,
    ToTypeArgument<I32>
  > {
    const reifiedBcs = CreatePositionTicket.bcs(toBcs(I32))
    return {
      get typeName() {
        return CreatePositionTicket.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CreatePositionTicket.$typeName,
          ...[extractType(X), extractType(Y), extractType(I32)],
        ) as `${string}::position_core_clmm::CreatePositionTicket<${PhantomToTypeStr<
          ToPhantomTypeArgument<X>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<Y>>}, ${ToTypeStr<ToTypeArgument<I32>>}>`
      },
      get typeArgs() {
        return [extractType(X), extractType(Y), extractType(I32)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<X>>,
          PhantomToTypeStr<ToPhantomTypeArgument<Y>>,
          ToTypeStr<ToTypeArgument<I32>>,
        ]
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CreatePositionTicket.fromCoreObject([X, Y, I32], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CreatePositionTicket.fromSuiParsedData([X, Y, I32], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CreatePositionTicket.fromSuiObjectData([X, Y, I32], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CreatePositionTicket.fetch(client, [X, Y, I32], id),
      new: (
        fields: CreatePositionTicketFields<
          ToPhantomTypeArgument<X>,
          ToPhantomTypeArgument<Y>,
          ToTypeArgument<I32>
        >,
      ) => {
        return new CreatePositionTicket([extractType(X), extractType(Y), extractType(I32)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof CreatePositionTicket.reified {
    return CreatePositionTicket.reified
  }

  static phantom<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    X: X,
    Y: Y,
    I32: I32,
  ): PhantomReified<
    ToTypeStr<
      CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>>
    >
  > {
    return phantom(CreatePositionTicket.reified(X, Y, I32))
  }

  static get p(): typeof CreatePositionTicket.phantom {
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

  static get bcs(): ReturnType<typeof CreatePositionTicket.instantiateBcs> {
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
    fields: Record<string, any>,
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
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    return CreatePositionTicket.fromFields(
      typeArgs,
      CreatePositionTicket.bcs(toBcs(typeArgs[2])).parse(data),
    )
  }

  toJSONField(): CreatePositionTicketJSONField<X, Y, I32> {
    return {
      configId: this.configId,
      tickA: fieldToJSON<I32>(`${this.$typeArgs[2]}`, this.tickA),
      tickB: fieldToJSON<I32>(`${this.$typeArgs[2]}`, this.tickB),
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

  toJSON(): CreatePositionTicketJSON<X, Y, I32> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    field: any,
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
    json: Record<string, any>,
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    if (json.$typeName !== CreatePositionTicket.$typeName) {
      throw new Error(
        `not a CreatePositionTicket json object: expected '${CreatePositionTicket.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(CreatePositionTicket.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return CreatePositionTicket.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    if (!isCreatePositionTicket(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CreatePositionTicket object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 3) {
      throw new Error(
        `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 3; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return CreatePositionTicket.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CreatePositionTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    content: SuiParsedData,
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCreatePositionTicket(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CreatePositionTicket object`,
      )
    }
    return CreatePositionTicket.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CreatePositionTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, I32],
    data: SuiObjectData,
  ): CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCreatePositionTicket(data.bcs.type)) {
        throw new Error(`object at is not a CreatePositionTicket object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 3) {
        throw new Error(
          `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 3; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return CreatePositionTicket.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CreatePositionTicket.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    I32 extends Reified<TypeArgument, any>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [X, Y, I32],
    id: string,
  ): Promise<
    CreatePositionTicket<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<I32>>
  > {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCreatePositionTicket(object.type)) {
      throw new Error(`object at id ${id} is not a CreatePositionTicket object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 3) {
      throw new Error(
        `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 3; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return CreatePositionTicket.fromBcs(typeArgs, object.content)
  }
}

/* ============================== Position =============================== */

export function isPosition(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('kai-leverage', 'position_core_clmm::Position')}::position_core_clmm::Position`
      + '<',
  )
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

export type PositionJSONField<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> = {
  id: string
  configId: string
  lpPosition: ToJSON<LP>
  colX: ToJSON<Balance<X>>
  colY: ToJSON<Balance<Y>>
  debtBag: ToJSON<FacilDebtBag>
  collectedFees: ToJSON<BalanceBag>
  ownerRewardStash: ToJSON<BalanceBag>
  ticketActive: boolean
  version: number
}

export type PositionJSON<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> = {
  $typeName: typeof Position.$typeName
  $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>, ToTypeStr<LP>]
} & PositionJSONField<X, Y, LP>

/** Leveraged position containing LP position, collateral, and debt. */
export class Position<
  X extends PhantomTypeArgument,
  Y extends PhantomTypeArgument,
  LP extends TypeArgument,
> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::Position` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::Position')
    }::position_core_clmm::Position` as const
  }
  static readonly $numTypeParams = 3
  static readonly $isPhantom = [true, true, false] as const

  readonly $typeName: typeof Position.$typeName = Position.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::Position<${PhantomToTypeStr<
    X
  >}, ${PhantomToTypeStr<Y>}, ${ToTypeStr<LP>}>`
  readonly $typeArgs: [PhantomToTypeStr<X>, PhantomToTypeStr<Y>, ToTypeStr<LP>]
  readonly $isPhantom: typeof Position.$isPhantom = Position.$isPhantom

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
    fields: PositionFields<X, Y, LP>,
  ) {
    this.$fullTypeName = composeSuiType(
      Position.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::Position<${PhantomToTypeStr<X>}, ${PhantomToTypeStr<
      Y
    >}, ${ToTypeStr<LP>}>`
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
    LP: LP,
  ): PositionReified<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    const reifiedBcs = Position.bcs(toBcs(LP))
    return {
      get typeName() {
        return Position.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Position.$typeName,
          ...[extractType(X), extractType(Y), extractType(LP)],
        ) as `${string}::position_core_clmm::Position<${PhantomToTypeStr<
          ToPhantomTypeArgument<X>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<Y>>}, ${ToTypeStr<ToTypeArgument<LP>>}>`
      },
      get typeArgs() {
        return [extractType(X), extractType(Y), extractType(LP)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<X>>,
          PhantomToTypeStr<ToPhantomTypeArgument<Y>>,
          ToTypeStr<ToTypeArgument<LP>>,
        ]
      },
      isPhantom: Position.$isPhantom,
      reifiedTypeArgs: [X, Y, LP],
      fromFields: (fields: Record<string, any>) => Position.fromFields([X, Y, LP], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Position.fromFieldsWithTypes([X, Y, LP], item),
      fromBcs: (data: Uint8Array) => Position.fromFields([X, Y, LP], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Position.fromJSONField([X, Y, LP], field),
      fromJSON: (json: Record<string, any>) => Position.fromJSON([X, Y, LP], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Position.fromCoreObject([X, Y, LP], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        Position.fromSuiParsedData([X, Y, LP], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        Position.fromSuiObjectData([X, Y, LP], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        Position.fetch(client, [X, Y, LP], id),
      new: (
        fields: PositionFields<
          ToPhantomTypeArgument<X>,
          ToPhantomTypeArgument<Y>,
          ToTypeArgument<LP>
        >,
      ) => {
        return new Position([extractType(X), extractType(Y), extractType(LP)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Position.reified {
    return Position.reified
  }

  static phantom<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    X: X,
    Y: Y,
    LP: LP,
  ): PhantomReified<
    ToTypeStr<Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>>>
  > {
    return phantom(Position.reified(X, Y, LP))
  }

  static get p(): typeof Position.phantom {
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

  static get bcs(): ReturnType<typeof Position.instantiateBcs> {
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
    fields: Record<string, any>,
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
    item: FieldsWithTypes,
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
        item.fields.owner_reward_stash,
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
    data: Uint8Array,
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    return Position.fromFields(typeArgs, Position.bcs(toBcs(typeArgs[2])).parse(data))
  }

  toJSONField(): PositionJSONField<X, Y, LP> {
    return {
      id: this.id,
      configId: this.configId,
      lpPosition: fieldToJSON<LP>(`${this.$typeArgs[2]}`, this.lpPosition),
      colX: this.colX.toJSONField(),
      colY: this.colY.toJSONField(),
      debtBag: this.debtBag.toJSONField(),
      collectedFees: this.collectedFees.toJSONField(),
      ownerRewardStash: this.ownerRewardStash.toJSONField(),
      ticketActive: this.ticketActive,
      version: this.version,
    }
  }

  toJSON(): PositionJSON<X, Y, LP> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    field: any,
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
    json: Record<string, any>,
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    if (json.$typeName !== Position.$typeName) {
      throw new Error(
        `not a Position json object: expected '${Position.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Position.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return Position.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    if (!isPosition(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Position object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 3) {
      throw new Error(
        `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 3; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return Position.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Position.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    content: SuiParsedData,
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPosition(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Position object`)
    }
    return Position.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Position.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    typeArgs: [X, Y, LP],
    data: SuiObjectData,
  ): Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPosition(data.bcs.type)) {
        throw new Error(`object at is not a Position object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 3) {
        throw new Error(
          `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 3; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return Position.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Position.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    X extends PhantomReified<PhantomTypeArgument>,
    Y extends PhantomReified<PhantomTypeArgument>,
    LP extends Reified<TypeArgument, any>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [X, Y, LP],
    id: string,
  ): Promise<Position<ToPhantomTypeArgument<X>, ToPhantomTypeArgument<Y>, ToTypeArgument<LP>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPosition(object.type)) {
      throw new Error(`object at id ${id} is not a Position object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 3) {
      throw new Error(
        `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 3; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return Position.fromBcs(typeArgs, object.content)
  }
}

/* ============================== PositionCap =============================== */

export function isPositionCap(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PositionCap')
    }::position_core_clmm::PositionCap`
}

export interface PositionCapFields {
  id: ToField<UID>
  positionId: ToField<ID>
}

export type PositionCapReified = Reified<PositionCap, PositionCapFields>

export type PositionCapJSONField = {
  id: string
  positionId: string
}

export type PositionCapJSON = {
  $typeName: typeof PositionCap.$typeName
  $typeArgs: []
} & PositionCapJSONField

/** Capability granting ownership and control over a position. */
export class PositionCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::PositionCap` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PositionCap')
    }::position_core_clmm::PositionCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionCap.$typeName = PositionCap.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::PositionCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionCap.$isPhantom = PositionCap.$isPhantom

  readonly id: ToField<UID>
  readonly positionId: ToField<ID>

  private constructor(typeArgs: [], fields: PositionCapFields) {
    this.$fullTypeName = composeSuiType(
      PositionCap.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::PositionCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.positionId = fields.positionId
  }

  static reified(): PositionCapReified {
    const reifiedBcs = PositionCap.bcs
    return {
      get typeName() {
        return PositionCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PositionCap.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::PositionCap`
      },
      typeArgs: [] as [],
      isPhantom: PositionCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PositionCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PositionCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PositionCap.fetch(client, id),
      new: (fields: PositionCapFields) => {
        return new PositionCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionCapReified {
    return PositionCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionCap>> {
    return phantom(PositionCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionCap>> {
    return PositionCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionCap', {
      id: UID.bcs,
      position_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PositionCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PositionCap.instantiateBcs> {
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

  toJSONField(): PositionCapJSONField {
    return {
      id: this.id,
      positionId: this.positionId,
    }
  }

  toJSON(): PositionCapJSON {
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
      throw new Error(
        `not a PositionCap json object: expected '${PositionCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PositionCap {
    if (!isPositionCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PositionCap object`)
    }
    return PositionCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PositionCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionCap object`)
    }
    return PositionCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PositionCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionCap(data.bcs.type)) {
        throw new Error(`object at is not a PositionCap object`)
      }

      return PositionCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PositionCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPositionCap(object.type)) {
      throw new Error(`object at id ${id} is not a PositionCap object`)
    }
    return PositionCap.fromBcs(object.content)
  }
}

/* ============================== PythConfig =============================== */

export function isPythConfig(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PythConfig')
    }::position_core_clmm::PythConfig`
}

export interface PythConfigFields {
  maxAgeSecs: ToField<'u64'>
  pioAllowlist: ToField<VecMap<TypeName, ID>>
}

export type PythConfigReified = Reified<PythConfig, PythConfigFields>

export type PythConfigJSONField = {
  maxAgeSecs: string
  pioAllowlist: ToJSON<VecMap<TypeName, ID>>
}

export type PythConfigJSON = {
  $typeName: typeof PythConfig.$typeName
  $typeArgs: []
} & PythConfigJSONField

/** Configuration for Pyth oracle integration. */
export class PythConfig implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::PythConfig` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PythConfig')
    }::position_core_clmm::PythConfig` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PythConfig.$typeName = PythConfig.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::PythConfig`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PythConfig.$isPhantom = PythConfig.$isPhantom

  readonly maxAgeSecs: ToField<'u64'>
  readonly pioAllowlist: ToField<VecMap<TypeName, ID>>

  private constructor(typeArgs: [], fields: PythConfigFields) {
    this.$fullTypeName = composeSuiType(
      PythConfig.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::PythConfig`
    this.$typeArgs = typeArgs

    this.maxAgeSecs = fields.maxAgeSecs
    this.pioAllowlist = fields.pioAllowlist
  }

  static reified(): PythConfigReified {
    const reifiedBcs = PythConfig.bcs
    return {
      get typeName() {
        return PythConfig.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PythConfig.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::PythConfig`
      },
      typeArgs: [] as [],
      isPhantom: PythConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PythConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PythConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PythConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PythConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PythConfig.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PythConfig.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PythConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PythConfig.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PythConfig.fetch(client, id),
      new: (fields: PythConfigFields) => {
        return new PythConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PythConfigReified {
    return PythConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PythConfig>> {
    return phantom(PythConfig.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PythConfig>> {
    return PythConfig.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PythConfig', {
      max_age_secs: bcs.u64(),
      pio_allowlist: VecMap.bcs(TypeName.bcs, ID.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof PythConfig.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PythConfig.instantiateBcs> {
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
        fields.pio_allowlist,
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
        item.fields.pio_allowlist,
      ),
    })
  }

  static fromBcs(data: Uint8Array): PythConfig {
    return PythConfig.fromFields(PythConfig.bcs.parse(data))
  }

  toJSONField(): PythConfigJSONField {
    return {
      maxAgeSecs: this.maxAgeSecs.toString(),
      pioAllowlist: this.pioAllowlist.toJSONField(),
    }
  }

  toJSON(): PythConfigJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PythConfig {
    return PythConfig.reified().new({
      maxAgeSecs: decodeFromJSONField('u64', field.maxAgeSecs),
      pioAllowlist: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), ID.reified()),
        field.pioAllowlist,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): PythConfig {
    if (json.$typeName !== PythConfig.$typeName) {
      throw new Error(
        `not a PythConfig json object: expected '${PythConfig.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PythConfig.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PythConfig {
    if (!isPythConfig(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PythConfig object`)
    }
    return PythConfig.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PythConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PythConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPythConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PythConfig object`)
    }
    return PythConfig.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PythConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PythConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPythConfig(data.bcs.type)) {
        throw new Error(`object at is not a PythConfig object`)
      }

      return PythConfig.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PythConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PythConfig> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPythConfig(object.type)) {
      throw new Error(`object at id ${id} is not a PythConfig object`)
    }
    return PythConfig.fromBcs(object.content)
  }
}

/* ============================== PositionConfig =============================== */

export function isPositionConfig(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PositionConfig')
    }::position_core_clmm::PositionConfig`
}

export interface PositionConfigFields {
  id: ToField<UID>
  /** The object ID of the underlying AMM pool this configuration applies to. */
  poolObjectId: ToField<ID>
  /** Whether new positions can be created under this configuration. */
  allowNewPositions: ToField<'bool'>
  /** Lending facility capability (`SupplyPool`) associated with this position configuration. */
  lendFacilCap: ToField<LendFacilCap>
  /**
   * Minimum price deviation required between initial price and liquidation trigger price.
   * Prevents positions from being created too close to liquidation thresholds.
   * Based on paper's price range analysis ensuring safe margin evolution.
   */
  minLiqStartPriceDeltaBps: ToField<'u16'>
  /**
   * Minimum initial margin level required for position creation (basis points).
   * Ensures sufficient collateralization based on margin function M(P) = A(P)/D(P).
   */
  minInitMarginBps: ToField<'u16'>
  /** Bag of allowed oracle sources for this position configuration. */
  allowedOracles: ToField<Bag>
  /**
   * Deleveraging margin threshold (basis points). When margin falls to this level,
   * automated deleveraging reduces position size to restore safety.
   * Must be higher than liquidation margin to provide deleveraging buffer.
   */
  deleverageMarginBps: ToField<'u16'>
  /**
   * Base factor for deleveraging amount calculation (basis points).
   * Determines how aggressively positions are deleveraged when margin deteriorates.
   */
  baseDeleverageFactorBps: ToField<'u16'>
  /**
   * Liquidation margin threshold (basis points). Positions below this margin
   * can be liquidated by external parties to protect lenders from losses.
   */
  liqMarginBps: ToField<'u16'>
  /**
   * Base liquidation factor (basis points) controlling liquidation aggressiveness.
   * Ensures liquidations restore position health while minimizing impact.
   */
  baseLiqFactorBps: ToField<'u16'>
  /**
   * Liquidation bonus (basis points) guaranteed to liquidators as incentive.
   * Always awarded even for underwater positions to minimize bad debt formation.
   */
  liqBonusBps: ToField<'u16'>
  /**
   * Maximum liquidity allowed per individual position.
   * Implements position size limits for risk management.
   */
  maxPositionL: ToField<'u128'>
  /**
   * Maximum total liquidity across all positions globally.
   * Implements system-wide exposure limits.
   */
  maxGlobalL: ToField<'u128'>
  /**
   * Current total liquidity across all active positions.
   * Tracked for enforcing global limits.
   */
  currentGlobalL: ToField<'u128'>
  /**
   * Protocol fee taken during rebalancing operations (basis points).
   * Applied to collected AMM fees and rewards.
   */
  rebalanceFeeBps: ToField<'u16'>
  /**
   * Protocol fee taken during liquidation operations (basis points).
   * Applied to liquidation bonuses before distribution to liquidators.
   */
  liqFeeBps: ToField<'u16'>
  /**
   * Fee charged for position creation in SUI tokens.
   * Helps cover operational costs and prevent spam.
   */
  positionCreationFeeSui: ToField<'u64'>
  /** Version for upgrade compatibility. */
  version: ToField<'u16'>
}

export type PositionConfigReified = Reified<PositionConfig, PositionConfigFields>

export type PositionConfigJSONField = {
  id: string
  poolObjectId: string
  allowNewPositions: boolean
  lendFacilCap: ToJSON<LendFacilCap>
  minLiqStartPriceDeltaBps: number
  minInitMarginBps: number
  allowedOracles: ToJSON<Bag>
  deleverageMarginBps: number
  baseDeleverageFactorBps: number
  liqMarginBps: number
  baseLiqFactorBps: number
  liqBonusBps: number
  maxPositionL: string
  maxGlobalL: string
  currentGlobalL: string
  rebalanceFeeBps: number
  liqFeeBps: number
  positionCreationFeeSui: string
  version: number
}

export type PositionConfigJSON = {
  $typeName: typeof PositionConfig.$typeName
  $typeArgs: []
} & PositionConfigJSONField

/**
 * Configuration for leveraged concentrated liquidity position parameters and risk management.
 *
 * This configuration implements the theoretical framework described in "Concentrated Liquidity
 * with Leverage" (arXiv:2409.12803), which provides mathematical guarantees for safe leveraged
 * liquidity provisioning.
 */
export class PositionConfig implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::PositionConfig` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PositionConfig')
    }::position_core_clmm::PositionConfig` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionConfig.$typeName = PositionConfig.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::PositionConfig`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionConfig.$isPhantom = PositionConfig.$isPhantom

  readonly id: ToField<UID>
  /** The object ID of the underlying AMM pool this configuration applies to. */
  readonly poolObjectId: ToField<ID>
  /** Whether new positions can be created under this configuration. */
  readonly allowNewPositions: ToField<'bool'>
  /** Lending facility capability (`SupplyPool`) associated with this position configuration. */
  readonly lendFacilCap: ToField<LendFacilCap>
  /**
   * Minimum price deviation required between initial price and liquidation trigger price.
   * Prevents positions from being created too close to liquidation thresholds.
   * Based on paper's price range analysis ensuring safe margin evolution.
   */
  readonly minLiqStartPriceDeltaBps: ToField<'u16'>
  /**
   * Minimum initial margin level required for position creation (basis points).
   * Ensures sufficient collateralization based on margin function M(P) = A(P)/D(P).
   */
  readonly minInitMarginBps: ToField<'u16'>
  /** Bag of allowed oracle sources for this position configuration. */
  readonly allowedOracles: ToField<Bag>
  /**
   * Deleveraging margin threshold (basis points). When margin falls to this level,
   * automated deleveraging reduces position size to restore safety.
   * Must be higher than liquidation margin to provide deleveraging buffer.
   */
  readonly deleverageMarginBps: ToField<'u16'>
  /**
   * Base factor for deleveraging amount calculation (basis points).
   * Determines how aggressively positions are deleveraged when margin deteriorates.
   */
  readonly baseDeleverageFactorBps: ToField<'u16'>
  /**
   * Liquidation margin threshold (basis points). Positions below this margin
   * can be liquidated by external parties to protect lenders from losses.
   */
  readonly liqMarginBps: ToField<'u16'>
  /**
   * Base liquidation factor (basis points) controlling liquidation aggressiveness.
   * Ensures liquidations restore position health while minimizing impact.
   */
  readonly baseLiqFactorBps: ToField<'u16'>
  /**
   * Liquidation bonus (basis points) guaranteed to liquidators as incentive.
   * Always awarded even for underwater positions to minimize bad debt formation.
   */
  readonly liqBonusBps: ToField<'u16'>
  /**
   * Maximum liquidity allowed per individual position.
   * Implements position size limits for risk management.
   */
  readonly maxPositionL: ToField<'u128'>
  /**
   * Maximum total liquidity across all positions globally.
   * Implements system-wide exposure limits.
   */
  readonly maxGlobalL: ToField<'u128'>
  /**
   * Current total liquidity across all active positions.
   * Tracked for enforcing global limits.
   */
  readonly currentGlobalL: ToField<'u128'>
  /**
   * Protocol fee taken during rebalancing operations (basis points).
   * Applied to collected AMM fees and rewards.
   */
  readonly rebalanceFeeBps: ToField<'u16'>
  /**
   * Protocol fee taken during liquidation operations (basis points).
   * Applied to liquidation bonuses before distribution to liquidators.
   */
  readonly liqFeeBps: ToField<'u16'>
  /**
   * Fee charged for position creation in SUI tokens.
   * Helps cover operational costs and prevent spam.
   */
  readonly positionCreationFeeSui: ToField<'u64'>
  /** Version for upgrade compatibility. */
  readonly version: ToField<'u16'>

  private constructor(typeArgs: [], fields: PositionConfigFields) {
    this.$fullTypeName = composeSuiType(
      PositionConfig.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::PositionConfig`
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
      get typeName() {
        return PositionConfig.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PositionConfig.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::PositionConfig`
      },
      typeArgs: [] as [],
      isPhantom: PositionConfig.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PositionConfig.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PositionConfig.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PositionConfig.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionConfig.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionConfig.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PositionConfig.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PositionConfig.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PositionConfig.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PositionConfig.fetch(client, id),
      new: (fields: PositionConfigFields) => {
        return new PositionConfig([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionConfigReified {
    return PositionConfig.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionConfig>> {
    return phantom(PositionConfig.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionConfig>> {
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

  static get bcs(): ReturnType<typeof PositionConfig.instantiateBcs> {
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
        item.fields.min_liq_start_price_delta_bps,
      ),
      minInitMarginBps: decodeFromFieldsWithTypes('u16', item.fields.min_init_margin_bps),
      allowedOracles: decodeFromFieldsWithTypes(Bag.reified(), item.fields.allowed_oracles),
      deleverageMarginBps: decodeFromFieldsWithTypes('u16', item.fields.deleverage_margin_bps),
      baseDeleverageFactorBps: decodeFromFieldsWithTypes(
        'u16',
        item.fields.base_deleverage_factor_bps,
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
        item.fields.position_creation_fee_sui,
      ),
      version: decodeFromFieldsWithTypes('u16', item.fields.version),
    })
  }

  static fromBcs(data: Uint8Array): PositionConfig {
    return PositionConfig.fromFields(PositionConfig.bcs.parse(data))
  }

  toJSONField(): PositionConfigJSONField {
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

  toJSON(): PositionConfigJSON {
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
      throw new Error(
        `not a PositionConfig json object: expected '${PositionConfig.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionConfig.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PositionConfig {
    if (!isPositionConfig(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PositionConfig object`)
    }
    return PositionConfig.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PositionConfig {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionConfig(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PositionConfig object`)
    }
    return PositionConfig.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionConfig.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PositionConfig {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionConfig(data.bcs.type)) {
        throw new Error(`object at is not a PositionConfig object`)
      }

      return PositionConfig.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionConfig.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PositionConfig> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPositionConfig(object.type)) {
      throw new Error(`object at id ${id} is not a PositionConfig object`)
    }
    return PositionConfig.fromBcs(object.content)
  }
}

/* ============================== LiquidationDisabledKey =============================== */

export function isLiquidationDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::LiquidationDisabledKey')
    }::position_core_clmm::LiquidationDisabledKey`
}

export interface LiquidationDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type LiquidationDisabledKeyReified = Reified<
  LiquidationDisabledKey,
  LiquidationDisabledKeyFields
>

export type LiquidationDisabledKeyJSONField = {
  dummyField: boolean
}

export type LiquidationDisabledKeyJSON = {
  $typeName: typeof LiquidationDisabledKey.$typeName
  $typeArgs: []
} & LiquidationDisabledKeyJSONField

export class LiquidationDisabledKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::LiquidationDisabledKey` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::LiquidationDisabledKey')
    }::position_core_clmm::LiquidationDisabledKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LiquidationDisabledKey.$typeName = LiquidationDisabledKey.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::LiquidationDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LiquidationDisabledKey.$isPhantom = LiquidationDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: LiquidationDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      LiquidationDisabledKey.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::LiquidationDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): LiquidationDisabledKeyReified {
    const reifiedBcs = LiquidationDisabledKey.bcs
    return {
      get typeName() {
        return LiquidationDisabledKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          LiquidationDisabledKey.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::LiquidationDisabledKey`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        LiquidationDisabledKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        LiquidationDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        LiquidationDisabledKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        LiquidationDisabledKey.fetch(client, id),
      new: (fields: LiquidationDisabledKeyFields) => {
        return new LiquidationDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LiquidationDisabledKeyReified {
    return LiquidationDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LiquidationDisabledKey>> {
    return phantom(LiquidationDisabledKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LiquidationDisabledKey>> {
    return LiquidationDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LiquidationDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof LiquidationDisabledKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof LiquidationDisabledKey.instantiateBcs> {
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

  toJSONField(): LiquidationDisabledKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): LiquidationDisabledKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LiquidationDisabledKey {
    return LiquidationDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): LiquidationDisabledKey {
    if (json.$typeName !== LiquidationDisabledKey.$typeName) {
      throw new Error(
        `not a LiquidationDisabledKey json object: expected '${LiquidationDisabledKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LiquidationDisabledKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): LiquidationDisabledKey {
    if (!isLiquidationDisabledKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a LiquidationDisabledKey object`)
    }
    return LiquidationDisabledKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LiquidationDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): LiquidationDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLiquidationDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LiquidationDisabledKey object`,
      )
    }
    return LiquidationDisabledKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LiquidationDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): LiquidationDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLiquidationDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a LiquidationDisabledKey object`)
      }

      return LiquidationDisabledKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LiquidationDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<LiquidationDisabledKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isLiquidationDisabledKey(object.type)) {
      throw new Error(`object at id ${id} is not a LiquidationDisabledKey object`)
    }
    return LiquidationDisabledKey.fromBcs(object.content)
  }
}

/* ============================== ReductionDisabledKey =============================== */

export function isReductionDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ReductionDisabledKey')
    }::position_core_clmm::ReductionDisabledKey`
}

export interface ReductionDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type ReductionDisabledKeyReified = Reified<ReductionDisabledKey, ReductionDisabledKeyFields>

export type ReductionDisabledKeyJSONField = {
  dummyField: boolean
}

export type ReductionDisabledKeyJSON = {
  $typeName: typeof ReductionDisabledKey.$typeName
  $typeArgs: []
} & ReductionDisabledKeyJSONField

export class ReductionDisabledKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::ReductionDisabledKey` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ReductionDisabledKey')
    }::position_core_clmm::ReductionDisabledKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ReductionDisabledKey.$typeName = ReductionDisabledKey.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::ReductionDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ReductionDisabledKey.$isPhantom = ReductionDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ReductionDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      ReductionDisabledKey.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::ReductionDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ReductionDisabledKeyReified {
    const reifiedBcs = ReductionDisabledKey.bcs
    return {
      get typeName() {
        return ReductionDisabledKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ReductionDisabledKey.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::ReductionDisabledKey`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ReductionDisabledKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        ReductionDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ReductionDisabledKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        ReductionDisabledKey.fetch(client, id),
      new: (fields: ReductionDisabledKeyFields) => {
        return new ReductionDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ReductionDisabledKeyReified {
    return ReductionDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ReductionDisabledKey>> {
    return phantom(ReductionDisabledKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ReductionDisabledKey>> {
    return ReductionDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ReductionDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ReductionDisabledKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ReductionDisabledKey.instantiateBcs> {
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

  toJSONField(): ReductionDisabledKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ReductionDisabledKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ReductionDisabledKey {
    return ReductionDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ReductionDisabledKey {
    if (json.$typeName !== ReductionDisabledKey.$typeName) {
      throw new Error(
        `not a ReductionDisabledKey json object: expected '${ReductionDisabledKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ReductionDisabledKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ReductionDisabledKey {
    if (!isReductionDisabledKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ReductionDisabledKey object`)
    }
    return ReductionDisabledKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReductionDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ReductionDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReductionDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ReductionDisabledKey object`,
      )
    }
    return ReductionDisabledKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReductionDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ReductionDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReductionDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a ReductionDisabledKey object`)
      }

      return ReductionDisabledKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReductionDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ReductionDisabledKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isReductionDisabledKey(object.type)) {
      throw new Error(`object at id ${id} is not a ReductionDisabledKey object`)
    }
    return ReductionDisabledKey.fromBcs(object.content)
  }
}

/* ============================== AddLiquidityDisabledKey =============================== */

export function isAddLiquidityDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AddLiquidityDisabledKey')
    }::position_core_clmm::AddLiquidityDisabledKey`
}

export interface AddLiquidityDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type AddLiquidityDisabledKeyReified = Reified<
  AddLiquidityDisabledKey,
  AddLiquidityDisabledKeyFields
>

export type AddLiquidityDisabledKeyJSONField = {
  dummyField: boolean
}

export type AddLiquidityDisabledKeyJSON = {
  $typeName: typeof AddLiquidityDisabledKey.$typeName
  $typeArgs: []
} & AddLiquidityDisabledKeyJSONField

export class AddLiquidityDisabledKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::AddLiquidityDisabledKey` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AddLiquidityDisabledKey')
    }::position_core_clmm::AddLiquidityDisabledKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddLiquidityDisabledKey.$typeName = AddLiquidityDisabledKey.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::AddLiquidityDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddLiquidityDisabledKey.$isPhantom =
    AddLiquidityDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AddLiquidityDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityDisabledKey.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::AddLiquidityDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AddLiquidityDisabledKeyReified {
    const reifiedBcs = AddLiquidityDisabledKey.bcs
    return {
      get typeName() {
        return AddLiquidityDisabledKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddLiquidityDisabledKey.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::AddLiquidityDisabledKey`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddLiquidityDisabledKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        AddLiquidityDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AddLiquidityDisabledKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        AddLiquidityDisabledKey.fetch(client, id),
      new: (fields: AddLiquidityDisabledKeyFields) => {
        return new AddLiquidityDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddLiquidityDisabledKeyReified {
    return AddLiquidityDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityDisabledKey>> {
    return phantom(AddLiquidityDisabledKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddLiquidityDisabledKey>> {
    return AddLiquidityDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddLiquidityDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddLiquidityDisabledKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddLiquidityDisabledKey.instantiateBcs> {
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

  toJSONField(): AddLiquidityDisabledKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): AddLiquidityDisabledKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddLiquidityDisabledKey {
    return AddLiquidityDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AddLiquidityDisabledKey {
    if (json.$typeName !== AddLiquidityDisabledKey.$typeName) {
      throw new Error(
        `not a AddLiquidityDisabledKey json object: expected '${AddLiquidityDisabledKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddLiquidityDisabledKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddLiquidityDisabledKey {
    if (!isAddLiquidityDisabledKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddLiquidityDisabledKey object`)
    }
    return AddLiquidityDisabledKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddLiquidityDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AddLiquidityDisabledKey object`,
      )
    }
    return AddLiquidityDisabledKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddLiquidityDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityDisabledKey object`)
      }

      return AddLiquidityDisabledKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddLiquidityDisabledKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddLiquidityDisabledKey(object.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityDisabledKey object`)
    }
    return AddLiquidityDisabledKey.fromBcs(object.content)
  }
}

/* ============================== OwnerCollectFeeDisabledKey =============================== */

export function isOwnerCollectFeeDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerCollectFeeDisabledKey')
    }::position_core_clmm::OwnerCollectFeeDisabledKey`
}

export interface OwnerCollectFeeDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type OwnerCollectFeeDisabledKeyReified = Reified<
  OwnerCollectFeeDisabledKey,
  OwnerCollectFeeDisabledKeyFields
>

export type OwnerCollectFeeDisabledKeyJSONField = {
  dummyField: boolean
}

export type OwnerCollectFeeDisabledKeyJSON = {
  $typeName: typeof OwnerCollectFeeDisabledKey.$typeName
  $typeArgs: []
} & OwnerCollectFeeDisabledKeyJSONField

export class OwnerCollectFeeDisabledKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::OwnerCollectFeeDisabledKey` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerCollectFeeDisabledKey')
    }::position_core_clmm::OwnerCollectFeeDisabledKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof OwnerCollectFeeDisabledKey.$typeName =
    OwnerCollectFeeDisabledKey.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::OwnerCollectFeeDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof OwnerCollectFeeDisabledKey.$isPhantom =
    OwnerCollectFeeDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: OwnerCollectFeeDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      OwnerCollectFeeDisabledKey.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::OwnerCollectFeeDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): OwnerCollectFeeDisabledKeyReified {
    const reifiedBcs = OwnerCollectFeeDisabledKey.bcs
    return {
      get typeName() {
        return OwnerCollectFeeDisabledKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OwnerCollectFeeDisabledKey.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::OwnerCollectFeeDisabledKey`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OwnerCollectFeeDisabledKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        OwnerCollectFeeDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OwnerCollectFeeDisabledKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        OwnerCollectFeeDisabledKey.fetch(client, id),
      new: (fields: OwnerCollectFeeDisabledKeyFields) => {
        return new OwnerCollectFeeDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): OwnerCollectFeeDisabledKeyReified {
    return OwnerCollectFeeDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OwnerCollectFeeDisabledKey>> {
    return phantom(OwnerCollectFeeDisabledKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<OwnerCollectFeeDisabledKey>> {
    return OwnerCollectFeeDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OwnerCollectFeeDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof OwnerCollectFeeDisabledKey.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof OwnerCollectFeeDisabledKey.instantiateBcs> {
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

  toJSONField(): OwnerCollectFeeDisabledKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): OwnerCollectFeeDisabledKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OwnerCollectFeeDisabledKey {
    return OwnerCollectFeeDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): OwnerCollectFeeDisabledKey {
    if (json.$typeName !== OwnerCollectFeeDisabledKey.$typeName) {
      throw new Error(
        `not a OwnerCollectFeeDisabledKey json object: expected '${OwnerCollectFeeDisabledKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return OwnerCollectFeeDisabledKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): OwnerCollectFeeDisabledKey {
    if (!isOwnerCollectFeeDisabledKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OwnerCollectFeeDisabledKey object`)
    }
    return OwnerCollectFeeDisabledKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerCollectFeeDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): OwnerCollectFeeDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerCollectFeeDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OwnerCollectFeeDisabledKey object`,
      )
    }
    return OwnerCollectFeeDisabledKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerCollectFeeDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): OwnerCollectFeeDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerCollectFeeDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a OwnerCollectFeeDisabledKey object`)
      }

      return OwnerCollectFeeDisabledKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerCollectFeeDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<OwnerCollectFeeDisabledKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOwnerCollectFeeDisabledKey(object.type)) {
      throw new Error(`object at id ${id} is not a OwnerCollectFeeDisabledKey object`)
    }
    return OwnerCollectFeeDisabledKey.fromBcs(object.content)
  }
}

/* ============================== OwnerCollectRewardDisabledKey =============================== */

export function isOwnerCollectRewardDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerCollectRewardDisabledKey')
    }::position_core_clmm::OwnerCollectRewardDisabledKey`
}

export interface OwnerCollectRewardDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type OwnerCollectRewardDisabledKeyReified = Reified<
  OwnerCollectRewardDisabledKey,
  OwnerCollectRewardDisabledKeyFields
>

export type OwnerCollectRewardDisabledKeyJSONField = {
  dummyField: boolean
}

export type OwnerCollectRewardDisabledKeyJSON = {
  $typeName: typeof OwnerCollectRewardDisabledKey.$typeName
  $typeArgs: []
} & OwnerCollectRewardDisabledKeyJSONField

export class OwnerCollectRewardDisabledKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::OwnerCollectRewardDisabledKey` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerCollectRewardDisabledKey')
    }::position_core_clmm::OwnerCollectRewardDisabledKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof OwnerCollectRewardDisabledKey.$typeName =
    OwnerCollectRewardDisabledKey.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::OwnerCollectRewardDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof OwnerCollectRewardDisabledKey.$isPhantom =
    OwnerCollectRewardDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: OwnerCollectRewardDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      OwnerCollectRewardDisabledKey.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::OwnerCollectRewardDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): OwnerCollectRewardDisabledKeyReified {
    const reifiedBcs = OwnerCollectRewardDisabledKey.bcs
    return {
      get typeName() {
        return OwnerCollectRewardDisabledKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OwnerCollectRewardDisabledKey.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::OwnerCollectRewardDisabledKey`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OwnerCollectRewardDisabledKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        OwnerCollectRewardDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OwnerCollectRewardDisabledKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        OwnerCollectRewardDisabledKey.fetch(client, id),
      new: (fields: OwnerCollectRewardDisabledKeyFields) => {
        return new OwnerCollectRewardDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): OwnerCollectRewardDisabledKeyReified {
    return OwnerCollectRewardDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OwnerCollectRewardDisabledKey>> {
    return phantom(OwnerCollectRewardDisabledKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<OwnerCollectRewardDisabledKey>> {
    return OwnerCollectRewardDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OwnerCollectRewardDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof OwnerCollectRewardDisabledKey.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof OwnerCollectRewardDisabledKey.instantiateBcs> {
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

  toJSONField(): OwnerCollectRewardDisabledKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): OwnerCollectRewardDisabledKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OwnerCollectRewardDisabledKey {
    return OwnerCollectRewardDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): OwnerCollectRewardDisabledKey {
    if (json.$typeName !== OwnerCollectRewardDisabledKey.$typeName) {
      throw new Error(
        `not a OwnerCollectRewardDisabledKey json object: expected '${OwnerCollectRewardDisabledKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return OwnerCollectRewardDisabledKey.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): OwnerCollectRewardDisabledKey {
    if (!isOwnerCollectRewardDisabledKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OwnerCollectRewardDisabledKey object`)
    }
    return OwnerCollectRewardDisabledKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerCollectRewardDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): OwnerCollectRewardDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerCollectRewardDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OwnerCollectRewardDisabledKey object`,
      )
    }
    return OwnerCollectRewardDisabledKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerCollectRewardDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): OwnerCollectRewardDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerCollectRewardDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a OwnerCollectRewardDisabledKey object`)
      }

      return OwnerCollectRewardDisabledKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerCollectRewardDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: ClientWithCoreApi,
    id: string,
  ): Promise<OwnerCollectRewardDisabledKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOwnerCollectRewardDisabledKey(object.type)) {
      throw new Error(`object at id ${id} is not a OwnerCollectRewardDisabledKey object`)
    }
    return OwnerCollectRewardDisabledKey.fromBcs(object.content)
  }
}

/* ============================== DeletePositionDisabledKey =============================== */

export function isDeletePositionDisabledKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeletePositionDisabledKey')
    }::position_core_clmm::DeletePositionDisabledKey`
}

export interface DeletePositionDisabledKeyFields {
  dummyField: ToField<'bool'>
}

export type DeletePositionDisabledKeyReified = Reified<
  DeletePositionDisabledKey,
  DeletePositionDisabledKeyFields
>

export type DeletePositionDisabledKeyJSONField = {
  dummyField: boolean
}

export type DeletePositionDisabledKeyJSON = {
  $typeName: typeof DeletePositionDisabledKey.$typeName
  $typeArgs: []
} & DeletePositionDisabledKeyJSONField

export class DeletePositionDisabledKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::DeletePositionDisabledKey` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeletePositionDisabledKey')
    }::position_core_clmm::DeletePositionDisabledKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DeletePositionDisabledKey.$typeName =
    DeletePositionDisabledKey.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::DeletePositionDisabledKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DeletePositionDisabledKey.$isPhantom =
    DeletePositionDisabledKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: DeletePositionDisabledKeyFields) {
    this.$fullTypeName = composeSuiType(
      DeletePositionDisabledKey.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::DeletePositionDisabledKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): DeletePositionDisabledKeyReified {
    const reifiedBcs = DeletePositionDisabledKey.bcs
    return {
      get typeName() {
        return DeletePositionDisabledKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DeletePositionDisabledKey.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::DeletePositionDisabledKey`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DeletePositionDisabledKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        DeletePositionDisabledKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        DeletePositionDisabledKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        DeletePositionDisabledKey.fetch(client, id),
      new: (fields: DeletePositionDisabledKeyFields) => {
        return new DeletePositionDisabledKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DeletePositionDisabledKeyReified {
    return DeletePositionDisabledKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeletePositionDisabledKey>> {
    return phantom(DeletePositionDisabledKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DeletePositionDisabledKey>> {
    return DeletePositionDisabledKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeletePositionDisabledKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof DeletePositionDisabledKey.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof DeletePositionDisabledKey.instantiateBcs> {
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

  toJSONField(): DeletePositionDisabledKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): DeletePositionDisabledKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DeletePositionDisabledKey {
    return DeletePositionDisabledKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): DeletePositionDisabledKey {
    if (json.$typeName !== DeletePositionDisabledKey.$typeName) {
      throw new Error(
        `not a DeletePositionDisabledKey json object: expected '${DeletePositionDisabledKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DeletePositionDisabledKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DeletePositionDisabledKey {
    if (!isDeletePositionDisabledKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DeletePositionDisabledKey object`)
    }
    return DeletePositionDisabledKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeletePositionDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DeletePositionDisabledKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeletePositionDisabledKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a DeletePositionDisabledKey object`,
      )
    }
    return DeletePositionDisabledKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeletePositionDisabledKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DeletePositionDisabledKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeletePositionDisabledKey(data.bcs.type)) {
        throw new Error(`object at is not a DeletePositionDisabledKey object`)
      }

      return DeletePositionDisabledKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeletePositionDisabledKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DeletePositionDisabledKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDeletePositionDisabledKey(object.type)) {
      throw new Error(`object at id ${id} is not a DeletePositionDisabledKey object`)
    }
    return DeletePositionDisabledKey.fromBcs(object.content)
  }
}

/* ============================== PositionCreateWithdrawLimiterKey =============================== */

export function isPositionCreateWithdrawLimiterKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PositionCreateWithdrawLimiterKey')
    }::position_core_clmm::PositionCreateWithdrawLimiterKey`
}

export interface PositionCreateWithdrawLimiterKeyFields {
  dummyField: ToField<'bool'>
}

export type PositionCreateWithdrawLimiterKeyReified = Reified<
  PositionCreateWithdrawLimiterKey,
  PositionCreateWithdrawLimiterKeyFields
>

export type PositionCreateWithdrawLimiterKeyJSONField = {
  dummyField: boolean
}

export type PositionCreateWithdrawLimiterKeyJSON = {
  $typeName: typeof PositionCreateWithdrawLimiterKey.$typeName
  $typeArgs: []
} & PositionCreateWithdrawLimiterKeyJSONField

export class PositionCreateWithdrawLimiterKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::PositionCreateWithdrawLimiterKey` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PositionCreateWithdrawLimiterKey')
    }::position_core_clmm::PositionCreateWithdrawLimiterKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionCreateWithdrawLimiterKey.$typeName =
    PositionCreateWithdrawLimiterKey.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::PositionCreateWithdrawLimiterKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionCreateWithdrawLimiterKey.$isPhantom =
    PositionCreateWithdrawLimiterKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: PositionCreateWithdrawLimiterKeyFields) {
    this.$fullTypeName = composeSuiType(
      PositionCreateWithdrawLimiterKey.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::PositionCreateWithdrawLimiterKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): PositionCreateWithdrawLimiterKeyReified {
    const reifiedBcs = PositionCreateWithdrawLimiterKey.bcs
    return {
      get typeName() {
        return PositionCreateWithdrawLimiterKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PositionCreateWithdrawLimiterKey.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::PositionCreateWithdrawLimiterKey`
      },
      typeArgs: [] as [],
      isPhantom: PositionCreateWithdrawLimiterKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        PositionCreateWithdrawLimiterKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PositionCreateWithdrawLimiterKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        PositionCreateWithdrawLimiterKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PositionCreateWithdrawLimiterKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PositionCreateWithdrawLimiterKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PositionCreateWithdrawLimiterKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        PositionCreateWithdrawLimiterKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PositionCreateWithdrawLimiterKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        PositionCreateWithdrawLimiterKey.fetch(client, id),
      new: (fields: PositionCreateWithdrawLimiterKeyFields) => {
        return new PositionCreateWithdrawLimiterKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionCreateWithdrawLimiterKeyReified {
    return PositionCreateWithdrawLimiterKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionCreateWithdrawLimiterKey>> {
    return phantom(PositionCreateWithdrawLimiterKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionCreateWithdrawLimiterKey>> {
    return PositionCreateWithdrawLimiterKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PositionCreateWithdrawLimiterKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof PositionCreateWithdrawLimiterKey.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof PositionCreateWithdrawLimiterKey.instantiateBcs> {
    if (!PositionCreateWithdrawLimiterKey.cachedBcs) {
      PositionCreateWithdrawLimiterKey.cachedBcs = PositionCreateWithdrawLimiterKey.instantiateBcs()
    }
    return PositionCreateWithdrawLimiterKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PositionCreateWithdrawLimiterKey {
    return PositionCreateWithdrawLimiterKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PositionCreateWithdrawLimiterKey {
    if (!isPositionCreateWithdrawLimiterKey(item.type)) {
      throw new Error('not a PositionCreateWithdrawLimiterKey type')
    }

    return PositionCreateWithdrawLimiterKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): PositionCreateWithdrawLimiterKey {
    return PositionCreateWithdrawLimiterKey.fromFields(
      PositionCreateWithdrawLimiterKey.bcs.parse(data),
    )
  }

  toJSONField(): PositionCreateWithdrawLimiterKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): PositionCreateWithdrawLimiterKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PositionCreateWithdrawLimiterKey {
    return PositionCreateWithdrawLimiterKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): PositionCreateWithdrawLimiterKey {
    if (json.$typeName !== PositionCreateWithdrawLimiterKey.$typeName) {
      throw new Error(
        `not a PositionCreateWithdrawLimiterKey json object: expected '${PositionCreateWithdrawLimiterKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionCreateWithdrawLimiterKey.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): PositionCreateWithdrawLimiterKey {
    if (!isPositionCreateWithdrawLimiterKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PositionCreateWithdrawLimiterKey object`)
    }
    return PositionCreateWithdrawLimiterKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionCreateWithdrawLimiterKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PositionCreateWithdrawLimiterKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionCreateWithdrawLimiterKey(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PositionCreateWithdrawLimiterKey object`,
      )
    }
    return PositionCreateWithdrawLimiterKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionCreateWithdrawLimiterKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PositionCreateWithdrawLimiterKey {
    if (data.bcs) {
      if (
        data.bcs.dataType !== 'moveObject' || !isPositionCreateWithdrawLimiterKey(data.bcs.type)
      ) {
        throw new Error(`object at is not a PositionCreateWithdrawLimiterKey object`)
      }

      return PositionCreateWithdrawLimiterKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionCreateWithdrawLimiterKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: ClientWithCoreApi,
    id: string,
  ): Promise<PositionCreateWithdrawLimiterKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPositionCreateWithdrawLimiterKey(object.type)) {
      throw new Error(`object at id ${id} is not a PositionCreateWithdrawLimiterKey object`)
    }
    return PositionCreateWithdrawLimiterKey.fromBcs(object.content)
  }
}

/* ============================== DeleverageTicket =============================== */

export function isDeleverageTicket(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeleverageTicket')
    }::position_core_clmm::DeleverageTicket`
}

export interface DeleverageTicketFields {
  positionId: ToField<ID>
  canRepayX: ToField<'bool'>
  canRepayY: ToField<'bool'>
  info: ToField<DeleverageInfo>
}

export type DeleverageTicketReified = Reified<DeleverageTicket, DeleverageTicketFields>

export type DeleverageTicketJSONField = {
  positionId: string
  canRepayX: boolean
  canRepayY: boolean
  info: ToJSON<DeleverageInfo>
}

export type DeleverageTicketJSON = {
  $typeName: typeof DeleverageTicket.$typeName
  $typeArgs: []
} & DeleverageTicketJSONField

export class DeleverageTicket implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::DeleverageTicket` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeleverageTicket')
    }::position_core_clmm::DeleverageTicket` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DeleverageTicket.$typeName = DeleverageTicket.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::DeleverageTicket`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DeleverageTicket.$isPhantom = DeleverageTicket.$isPhantom

  readonly positionId: ToField<ID>
  readonly canRepayX: ToField<'bool'>
  readonly canRepayY: ToField<'bool'>
  readonly info: ToField<DeleverageInfo>

  private constructor(typeArgs: [], fields: DeleverageTicketFields) {
    this.$fullTypeName = composeSuiType(
      DeleverageTicket.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::DeleverageTicket`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.canRepayX = fields.canRepayX
    this.canRepayY = fields.canRepayY
    this.info = fields.info
  }

  static reified(): DeleverageTicketReified {
    const reifiedBcs = DeleverageTicket.bcs
    return {
      get typeName() {
        return DeleverageTicket.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DeleverageTicket.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::DeleverageTicket`
      },
      typeArgs: [] as [],
      isPhantom: DeleverageTicket.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeleverageTicket.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DeleverageTicket.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeleverageTicket.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeleverageTicket.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeleverageTicket.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DeleverageTicket.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DeleverageTicket.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DeleverageTicket.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DeleverageTicket.fetch(client, id),
      new: (fields: DeleverageTicketFields) => {
        return new DeleverageTicket([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DeleverageTicketReified {
    return DeleverageTicket.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeleverageTicket>> {
    return phantom(DeleverageTicket.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DeleverageTicket>> {
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

  static get bcs(): ReturnType<typeof DeleverageTicket.instantiateBcs> {
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

  toJSONField(): DeleverageTicketJSONField {
    return {
      positionId: this.positionId,
      canRepayX: this.canRepayX,
      canRepayY: this.canRepayY,
      info: this.info.toJSONField(),
    }
  }

  toJSON(): DeleverageTicketJSON {
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
      throw new Error(
        `not a DeleverageTicket json object: expected '${DeleverageTicket.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DeleverageTicket.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DeleverageTicket {
    if (!isDeleverageTicket(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DeleverageTicket object`)
    }
    return DeleverageTicket.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeleverageTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DeleverageTicket {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeleverageTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DeleverageTicket object`)
    }
    return DeleverageTicket.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeleverageTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DeleverageTicket {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeleverageTicket(data.bcs.type)) {
        throw new Error(`object at is not a DeleverageTicket object`)
      }

      return DeleverageTicket.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeleverageTicket.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DeleverageTicket> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDeleverageTicket(object.type)) {
      throw new Error(`object at id ${id} is not a DeleverageTicket object`)
    }
    return DeleverageTicket.fromBcs(object.content)
  }
}

/* ============================== ReductionRepaymentTicket =============================== */

export function isReductionRepaymentTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ReductionRepaymentTicket')
    }::position_core_clmm::ReductionRepaymentTicket` + '<',
  )
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

export type ReductionRepaymentTicketJSONField<
  SX extends PhantomTypeArgument,
  SY extends PhantomTypeArgument,
> = {
  sx: ToJSON<FacilDebtShare<SX>>
  sy: ToJSON<FacilDebtShare<SY>>
  info: ToJSON<ReductionInfo>
}

export type ReductionRepaymentTicketJSON<
  SX extends PhantomTypeArgument,
  SY extends PhantomTypeArgument,
> = {
  $typeName: typeof ReductionRepaymentTicket.$typeName
  $typeArgs: [PhantomToTypeStr<SX>, PhantomToTypeStr<SY>]
} & ReductionRepaymentTicketJSONField<SX, SY>

export class ReductionRepaymentTicket<
  SX extends PhantomTypeArgument,
  SY extends PhantomTypeArgument,
> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::ReductionRepaymentTicket` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ReductionRepaymentTicket')
    }::position_core_clmm::ReductionRepaymentTicket` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName: typeof ReductionRepaymentTicket.$typeName = ReductionRepaymentTicket.$typeName
  readonly $fullTypeName:
    `${string}::position_core_clmm::ReductionRepaymentTicket<${PhantomToTypeStr<
      SX
    >}, ${PhantomToTypeStr<SY>}>`
  readonly $typeArgs: [PhantomToTypeStr<SX>, PhantomToTypeStr<SY>]
  readonly $isPhantom: typeof ReductionRepaymentTicket.$isPhantom =
    ReductionRepaymentTicket.$isPhantom

  readonly sx: ToField<FacilDebtShare<SX>>
  readonly sy: ToField<FacilDebtShare<SY>>
  readonly info: ToField<ReductionInfo>

  private constructor(
    typeArgs: [PhantomToTypeStr<SX>, PhantomToTypeStr<SY>],
    fields: ReductionRepaymentTicketFields<SX, SY>,
  ) {
    this.$fullTypeName = composeSuiType(
      ReductionRepaymentTicket.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::ReductionRepaymentTicket<${PhantomToTypeStr<
      SX
    >}, ${PhantomToTypeStr<SY>}>`
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
    SY: SY,
  ): ReductionRepaymentTicketReified<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    const reifiedBcs = ReductionRepaymentTicket.bcs
    return {
      get typeName() {
        return ReductionRepaymentTicket.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ReductionRepaymentTicket.$typeName,
          ...[extractType(SX), extractType(SY)],
        ) as `${string}::position_core_clmm::ReductionRepaymentTicket<${PhantomToTypeStr<
          ToPhantomTypeArgument<SX>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<SY>>}>`
      },
      get typeArgs() {
        return [extractType(SX), extractType(SY)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<SX>>,
          PhantomToTypeStr<ToPhantomTypeArgument<SY>>,
        ]
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ReductionRepaymentTicket.fromCoreObject([SX, SY], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        ReductionRepaymentTicket.fromSuiParsedData([SX, SY], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ReductionRepaymentTicket.fromSuiObjectData([SX, SY], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        ReductionRepaymentTicket.fetch(client, [SX, SY], id),
      new: (
        fields: ReductionRepaymentTicketFields<
          ToPhantomTypeArgument<SX>,
          ToPhantomTypeArgument<SY>
        >,
      ) => {
        return new ReductionRepaymentTicket([extractType(SX), extractType(SY)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof ReductionRepaymentTicket.reified {
    return ReductionRepaymentTicket.reified
  }

  static phantom<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    SX: SX,
    SY: SY,
  ): PhantomReified<
    ToTypeStr<ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>>>
  > {
    return phantom(ReductionRepaymentTicket.reified(SX, SY))
  }

  static get p(): typeof ReductionRepaymentTicket.phantom {
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

  static get bcs(): ReturnType<typeof ReductionRepaymentTicket.instantiateBcs> {
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
    fields: Record<string, any>,
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
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    return ReductionRepaymentTicket.fromFields(typeArgs, ReductionRepaymentTicket.bcs.parse(data))
  }

  toJSONField(): ReductionRepaymentTicketJSONField<SX, SY> {
    return {
      sx: this.sx.toJSONField(),
      sy: this.sy.toJSONField(),
      info: this.info.toJSONField(),
    }
  }

  toJSON(): ReductionRepaymentTicketJSON<SX, SY> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    field: any,
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
    json: Record<string, any>,
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    if (json.$typeName !== ReductionRepaymentTicket.$typeName) {
      throw new Error(
        `not a ReductionRepaymentTicket json object: expected '${ReductionRepaymentTicket.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(ReductionRepaymentTicket.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return ReductionRepaymentTicket.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    if (!isReductionRepaymentTicket(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ReductionRepaymentTicket object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return ReductionRepaymentTicket.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReductionRepaymentTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    content: SuiParsedData,
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReductionRepaymentTicket(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ReductionRepaymentTicket object`,
      )
    }
    return ReductionRepaymentTicket.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReductionRepaymentTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [SX, SY],
    data: SuiObjectData,
  ): ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReductionRepaymentTicket(data.bcs.type)) {
        throw new Error(`object at is not a ReductionRepaymentTicket object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return ReductionRepaymentTicket.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReductionRepaymentTicket.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    SX extends PhantomReified<PhantomTypeArgument>,
    SY extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [SX, SY],
    id: string,
  ): Promise<ReductionRepaymentTicket<ToPhantomTypeArgument<SX>, ToPhantomTypeArgument<SY>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isReductionRepaymentTicket(object.type)) {
      throw new Error(`object at id ${id} is not a ReductionRepaymentTicket object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return ReductionRepaymentTicket.fromBcs(typeArgs, object.content)
  }
}

/* ============================== RebalanceReceipt =============================== */

export function isRebalanceReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::RebalanceReceipt')
    }::position_core_clmm::RebalanceReceipt`
}

export interface RebalanceReceiptFields {
  id: ToField<ID>
  positionId: ToField<ID>
  /** The amount of X collected from AMM fees (before fees are taken). */
  collectedAmmFeeX: ToField<'u64'>
  /** The amount of Y collected from AMM fees (before fees are taken). */
  collectedAmmFeeY: ToField<'u64'>
  /** The amount other AMM rewards collected (before fees are taken). */
  collectedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
  /** The amount fees taken from collected rewards (both AMM fees and AMM rewards). */
  feesTaken: ToField<VecMap<TypeName, 'u64'>>
  /** The amount of X taken from cx. */
  takenCx: ToField<'u64'>
  /** The amount of Y taken from cy. */
  takenCy: ToField<'u64'>
  /** The amount of liquidity added to the LP position. */
  deltaL: ToField<'u128'>
  /** The amount of X added to the LP position (corresponds to delta_l). */
  deltaX: ToField<'u64'>
  /** The amount of Y added to the LP position (corresponds to delta_l). */
  deltaY: ToField<'u64'>
  /** The amount of X debt repaid. */
  xRepaid: ToField<'u64'>
  /** The amount of Y debt repaid. */
  yRepaid: ToField<'u64'>
  /** The amount of X added to cx. */
  addedCx: ToField<'u64'>
  /** The amount of Y added to cy. */
  addedCy: ToField<'u64'>
  /** The amount rewards stashed back into the position. */
  stashedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
}

export type RebalanceReceiptReified = Reified<RebalanceReceipt, RebalanceReceiptFields>

export type RebalanceReceiptJSONField = {
  id: string
  positionId: string
  collectedAmmFeeX: string
  collectedAmmFeeY: string
  collectedAmmRewards: ToJSON<VecMap<TypeName, 'u64'>>
  feesTaken: ToJSON<VecMap<TypeName, 'u64'>>
  takenCx: string
  takenCy: string
  deltaL: string
  deltaX: string
  deltaY: string
  xRepaid: string
  yRepaid: string
  addedCx: string
  addedCy: string
  stashedAmmRewards: ToJSON<VecMap<TypeName, 'u64'>>
}

export type RebalanceReceiptJSON = {
  $typeName: typeof RebalanceReceipt.$typeName
  $typeArgs: []
} & RebalanceReceiptJSONField

/**
 * Receipt for a position rebalance operation, tracking all fee, reward, and liquidity changes.
 *
 * This struct records the results of a rebalance, including all AMM fees and rewards collected,
 * protocol fees taken, changes to position liquidity, debt repayments, and any rewards stashed
 * back into the position. It is used for event emission and downstream accounting.
 */
export class RebalanceReceipt implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::RebalanceReceipt` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::RebalanceReceipt')
    }::position_core_clmm::RebalanceReceipt` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RebalanceReceipt.$typeName = RebalanceReceipt.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::RebalanceReceipt`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RebalanceReceipt.$isPhantom = RebalanceReceipt.$isPhantom

  readonly id: ToField<ID>
  readonly positionId: ToField<ID>
  /** The amount of X collected from AMM fees (before fees are taken). */
  readonly collectedAmmFeeX: ToField<'u64'>
  /** The amount of Y collected from AMM fees (before fees are taken). */
  readonly collectedAmmFeeY: ToField<'u64'>
  /** The amount other AMM rewards collected (before fees are taken). */
  readonly collectedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
  /** The amount fees taken from collected rewards (both AMM fees and AMM rewards). */
  readonly feesTaken: ToField<VecMap<TypeName, 'u64'>>
  /** The amount of X taken from cx. */
  readonly takenCx: ToField<'u64'>
  /** The amount of Y taken from cy. */
  readonly takenCy: ToField<'u64'>
  /** The amount of liquidity added to the LP position. */
  readonly deltaL: ToField<'u128'>
  /** The amount of X added to the LP position (corresponds to delta_l). */
  readonly deltaX: ToField<'u64'>
  /** The amount of Y added to the LP position (corresponds to delta_l). */
  readonly deltaY: ToField<'u64'>
  /** The amount of X debt repaid. */
  readonly xRepaid: ToField<'u64'>
  /** The amount of Y debt repaid. */
  readonly yRepaid: ToField<'u64'>
  /** The amount of X added to cx. */
  readonly addedCx: ToField<'u64'>
  /** The amount of Y added to cy. */
  readonly addedCy: ToField<'u64'>
  /** The amount rewards stashed back into the position. */
  readonly stashedAmmRewards: ToField<VecMap<TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: RebalanceReceiptFields) {
    this.$fullTypeName = composeSuiType(
      RebalanceReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::RebalanceReceipt`
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
      get typeName() {
        return RebalanceReceipt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RebalanceReceipt.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::RebalanceReceipt`
      },
      typeArgs: [] as [],
      isPhantom: RebalanceReceipt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RebalanceReceipt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RebalanceReceipt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RebalanceReceipt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RebalanceReceipt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RebalanceReceipt.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RebalanceReceipt.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RebalanceReceipt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RebalanceReceipt.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RebalanceReceipt.fetch(client, id),
      new: (fields: RebalanceReceiptFields) => {
        return new RebalanceReceipt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RebalanceReceiptReified {
    return RebalanceReceipt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RebalanceReceipt>> {
    return phantom(RebalanceReceipt.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RebalanceReceipt>> {
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

  static get bcs(): ReturnType<typeof RebalanceReceipt.instantiateBcs> {
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
        fields.collected_amm_rewards,
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
        fields.stashed_amm_rewards,
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
        item.fields.collected_amm_rewards,
      ),
      feesTaken: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.fees_taken,
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
        item.fields.stashed_amm_rewards,
      ),
    })
  }

  static fromBcs(data: Uint8Array): RebalanceReceipt {
    return RebalanceReceipt.fromFields(RebalanceReceipt.bcs.parse(data))
  }

  toJSONField(): RebalanceReceiptJSONField {
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

  toJSON(): RebalanceReceiptJSON {
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
        field.collectedAmmRewards,
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
        field.stashedAmmRewards,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): RebalanceReceipt {
    if (json.$typeName !== RebalanceReceipt.$typeName) {
      throw new Error(
        `not a RebalanceReceipt json object: expected '${RebalanceReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RebalanceReceipt.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RebalanceReceipt {
    if (!isRebalanceReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RebalanceReceipt object`)
    }
    return RebalanceReceipt.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RebalanceReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RebalanceReceipt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRebalanceReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RebalanceReceipt object`)
    }
    return RebalanceReceipt.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RebalanceReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RebalanceReceipt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRebalanceReceipt(data.bcs.type)) {
        throw new Error(`object at is not a RebalanceReceipt object`)
      }

      return RebalanceReceipt.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RebalanceReceipt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RebalanceReceipt> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRebalanceReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a RebalanceReceipt object`)
    }
    return RebalanceReceipt.fromBcs(object.content)
  }
}

/* ============================== DeletedPositionCollectedFees =============================== */

export function isDeletedPositionCollectedFees(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeletedPositionCollectedFees')
    }::position_core_clmm::DeletedPositionCollectedFees`
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

export type DeletedPositionCollectedFeesJSONField = {
  id: string
  positionId: string
  balanceBag: ToJSON<BalanceBag>
}

export type DeletedPositionCollectedFeesJSON = {
  $typeName: typeof DeletedPositionCollectedFees.$typeName
  $typeArgs: []
} & DeletedPositionCollectedFeesJSONField

/**
 * Object representing the collected fees from a deleted position.
 *
 * This struct is created and shared when a position is deleted, containing
 * the final balance bag of fees and rewards that were accumulated by the position.
 * It allows downstream consumers to claim or account for these fees after
 * the position object has been deleted.
 */
export class DeletedPositionCollectedFees implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::DeletedPositionCollectedFees` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeletedPositionCollectedFees')
    }::position_core_clmm::DeletedPositionCollectedFees` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DeletedPositionCollectedFees.$typeName =
    DeletedPositionCollectedFees.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::DeletedPositionCollectedFees`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DeletedPositionCollectedFees.$isPhantom =
    DeletedPositionCollectedFees.$isPhantom

  readonly id: ToField<UID>
  readonly positionId: ToField<ID>
  readonly balanceBag: ToField<BalanceBag>

  private constructor(typeArgs: [], fields: DeletedPositionCollectedFeesFields) {
    this.$fullTypeName = composeSuiType(
      DeletedPositionCollectedFees.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::DeletedPositionCollectedFees`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.positionId = fields.positionId
    this.balanceBag = fields.balanceBag
  }

  static reified(): DeletedPositionCollectedFeesReified {
    const reifiedBcs = DeletedPositionCollectedFees.bcs
    return {
      get typeName() {
        return DeletedPositionCollectedFees.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DeletedPositionCollectedFees.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::DeletedPositionCollectedFees`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DeletedPositionCollectedFees.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        DeletedPositionCollectedFees.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        DeletedPositionCollectedFees.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        DeletedPositionCollectedFees.fetch(client, id),
      new: (fields: DeletedPositionCollectedFeesFields) => {
        return new DeletedPositionCollectedFees([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DeletedPositionCollectedFeesReified {
    return DeletedPositionCollectedFees.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeletedPositionCollectedFees>> {
    return phantom(DeletedPositionCollectedFees.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DeletedPositionCollectedFees>> {
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

  static get bcs(): ReturnType<typeof DeletedPositionCollectedFees.instantiateBcs> {
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

  toJSONField(): DeletedPositionCollectedFeesJSONField {
    return {
      id: this.id,
      positionId: this.positionId,
      balanceBag: this.balanceBag.toJSONField(),
    }
  }

  toJSON(): DeletedPositionCollectedFeesJSON {
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
      throw new Error(
        `not a DeletedPositionCollectedFees json object: expected '${DeletedPositionCollectedFees.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DeletedPositionCollectedFees.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): DeletedPositionCollectedFees {
    if (!isDeletedPositionCollectedFees(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DeletedPositionCollectedFees object`)
    }
    return DeletedPositionCollectedFees.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeletedPositionCollectedFees.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DeletedPositionCollectedFees {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeletedPositionCollectedFees(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a DeletedPositionCollectedFees object`,
      )
    }
    return DeletedPositionCollectedFees.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeletedPositionCollectedFees.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DeletedPositionCollectedFees {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeletedPositionCollectedFees(data.bcs.type)) {
        throw new Error(`object at is not a DeletedPositionCollectedFees object`)
      }

      return DeletedPositionCollectedFees.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeletedPositionCollectedFees.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DeletedPositionCollectedFees> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDeletedPositionCollectedFees(object.type)) {
      throw new Error(`object at id ${id} is not a DeletedPositionCollectedFees object`)
    }
    return DeletedPositionCollectedFees.fromBcs(object.content)
  }
}

/* ============================== PositionCreationInfo =============================== */

export function isPositionCreationInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PositionCreationInfo')
    }::position_core_clmm::PositionCreationInfo`
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

export type PositionCreationInfoJSONField = {
  positionId: string
  configId: string
  sqrtPaX64: string
  sqrtPbX64: string
  l: string
  x0: string
  y0: string
  cx: string
  cy: string
  dx: string
  dy: string
  creationFeeAmtSui: string
}

export type PositionCreationInfoJSON = {
  $typeName: typeof PositionCreationInfo.$typeName
  $typeArgs: []
} & PositionCreationInfoJSONField

/**
 * Event emitted when a new leveraged position is created.
 *
 * This event records all relevant parameters and amounts for the newly created position,
 * including the position and config IDs, price range, liquidity, initial and collateral
 * balances, borrowed amounts, and the SUI fee paid at creation. It is used for downstream
 * analytics, auditing, and protocol integrations.
 */
export class PositionCreationInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::PositionCreationInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::PositionCreationInfo')
    }::position_core_clmm::PositionCreationInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PositionCreationInfo.$typeName = PositionCreationInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::PositionCreationInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PositionCreationInfo.$isPhantom = PositionCreationInfo.$isPhantom

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
      ...typeArgs,
    ) as `${string}::position_core_clmm::PositionCreationInfo`
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
      get typeName() {
        return PositionCreationInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PositionCreationInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::PositionCreationInfo`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PositionCreationInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        PositionCreationInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PositionCreationInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        PositionCreationInfo.fetch(client, id),
      new: (fields: PositionCreationInfoFields) => {
        return new PositionCreationInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PositionCreationInfoReified {
    return PositionCreationInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PositionCreationInfo>> {
    return phantom(PositionCreationInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PositionCreationInfo>> {
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

  static get bcs(): ReturnType<typeof PositionCreationInfo.instantiateBcs> {
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

  toJSONField(): PositionCreationInfoJSONField {
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

  toJSON(): PositionCreationInfoJSON {
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
      throw new Error(
        `not a PositionCreationInfo json object: expected '${PositionCreationInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PositionCreationInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PositionCreationInfo {
    if (!isPositionCreationInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PositionCreationInfo object`)
    }
    return PositionCreationInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionCreationInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PositionCreationInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPositionCreationInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PositionCreationInfo object`,
      )
    }
    return PositionCreationInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PositionCreationInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PositionCreationInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPositionCreationInfo(data.bcs.type)) {
        throw new Error(`object at is not a PositionCreationInfo object`)
      }

      return PositionCreationInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PositionCreationInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PositionCreationInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPositionCreationInfo(object.type)) {
      throw new Error(`object at id ${id} is not a PositionCreationInfo object`)
    }
    return PositionCreationInfo.fromBcs(object.content)
  }
}

/* ============================== DeleverageInfo =============================== */

export function isDeleverageInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeleverageInfo')
    }::position_core_clmm::DeleverageInfo`
}

export interface DeleverageInfoFields {
  /** The unique ID of the position being deleveraged. */
  positionId: ToField<ID>
  /** The position model snapshot at the time of deleverage. */
  model: ToField<PositionModel>
  /** The oracle-reported price at the time of deleverage, as a Q128.128 fixed-point value. */
  oraclePriceX128: ToField<'u256'>
  /** The pool's square root price at the time of deleverage, as a Q64.64 fixed-point value. */
  sqrtPoolPriceX64: ToField<'u128'>
  /** The amount of liquidity (L) removed from the LP position during deleverage. */
  deltaL: ToField<'u128'>
  /**
   * The amount of X withdrawn from the LP position (corresponding to `delta_l`)
   * and added to the position's cx (collateral X) balance.
   */
  deltaX: ToField<'u64'>
  /**
   * The amount of Y withdrawn from the LP position (corresponding to `delta_l`)
   * and added to the position's cy (collateral Y) balance.
   */
  deltaY: ToField<'u64'>
  /** The amount of X debt repaid using cx (collateral X) as part of deleverage. */
  xRepaid: ToField<'u64'>
  /** The amount of Y debt repaid using cy (collateral Y) as part of deleverage. */
  yRepaid: ToField<'u64'>
}

export type DeleverageInfoReified = Reified<DeleverageInfo, DeleverageInfoFields>

export type DeleverageInfoJSONField = {
  positionId: string
  model: ToJSON<PositionModel>
  oraclePriceX128: string
  sqrtPoolPriceX64: string
  deltaL: string
  deltaX: string
  deltaY: string
  xRepaid: string
  yRepaid: string
}

export type DeleverageInfoJSON = {
  $typeName: typeof DeleverageInfo.$typeName
  $typeArgs: []
} & DeleverageInfoJSONField

/** Information about a deleveraging operation on a leveraged CLMM position. */
export class DeleverageInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::DeleverageInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeleverageInfo')
    }::position_core_clmm::DeleverageInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DeleverageInfo.$typeName = DeleverageInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::DeleverageInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DeleverageInfo.$isPhantom = DeleverageInfo.$isPhantom

  /** The unique ID of the position being deleveraged. */
  readonly positionId: ToField<ID>
  /** The position model snapshot at the time of deleverage. */
  readonly model: ToField<PositionModel>
  /** The oracle-reported price at the time of deleverage, as a Q128.128 fixed-point value. */
  readonly oraclePriceX128: ToField<'u256'>
  /** The pool's square root price at the time of deleverage, as a Q64.64 fixed-point value. */
  readonly sqrtPoolPriceX64: ToField<'u128'>
  /** The amount of liquidity (L) removed from the LP position during deleverage. */
  readonly deltaL: ToField<'u128'>
  /**
   * The amount of X withdrawn from the LP position (corresponding to `delta_l`)
   * and added to the position's cx (collateral X) balance.
   */
  readonly deltaX: ToField<'u64'>
  /**
   * The amount of Y withdrawn from the LP position (corresponding to `delta_l`)
   * and added to the position's cy (collateral Y) balance.
   */
  readonly deltaY: ToField<'u64'>
  /** The amount of X debt repaid using cx (collateral X) as part of deleverage. */
  readonly xRepaid: ToField<'u64'>
  /** The amount of Y debt repaid using cy (collateral Y) as part of deleverage. */
  readonly yRepaid: ToField<'u64'>

  private constructor(typeArgs: [], fields: DeleverageInfoFields) {
    this.$fullTypeName = composeSuiType(
      DeleverageInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::DeleverageInfo`
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
      get typeName() {
        return DeleverageInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DeleverageInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::DeleverageInfo`
      },
      typeArgs: [] as [],
      isPhantom: DeleverageInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeleverageInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DeleverageInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeleverageInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeleverageInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeleverageInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DeleverageInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DeleverageInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DeleverageInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DeleverageInfo.fetch(client, id),
      new: (fields: DeleverageInfoFields) => {
        return new DeleverageInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DeleverageInfoReified {
    return DeleverageInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeleverageInfo>> {
    return phantom(DeleverageInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DeleverageInfo>> {
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

  static get bcs(): ReturnType<typeof DeleverageInfo.instantiateBcs> {
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

  toJSONField(): DeleverageInfoJSONField {
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

  toJSON(): DeleverageInfoJSON {
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
      throw new Error(
        `not a DeleverageInfo json object: expected '${DeleverageInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DeleverageInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DeleverageInfo {
    if (!isDeleverageInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DeleverageInfo object`)
    }
    return DeleverageInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeleverageInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DeleverageInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeleverageInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DeleverageInfo object`)
    }
    return DeleverageInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeleverageInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DeleverageInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeleverageInfo(data.bcs.type)) {
        throw new Error(`object at is not a DeleverageInfo object`)
      }

      return DeleverageInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeleverageInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DeleverageInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDeleverageInfo(object.type)) {
      throw new Error(`object at id ${id} is not a DeleverageInfo object`)
    }
    return DeleverageInfo.fromBcs(object.content)
  }
}

/* ============================== LiquidationInfo =============================== */

export function isLiquidationInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::LiquidationInfo')
    }::position_core_clmm::LiquidationInfo`
}

export interface LiquidationInfoFields {
  /** The ID of the liquidated position. */
  positionId: ToField<ID>
  /** The position model at the time of liquidation. */
  model: ToField<PositionModel>
  /** The oracle price (P = Y / X) at the time of liquidation, Q128 fixed-point. */
  oraclePriceX128: ToField<'u256'>
  /** The amount of X debt repaid by the liquidator (from their inputted Balance<X>). */
  xRepaid: ToField<'u64'>
  /** The amount of Y debt repaid by the liquidator (from their inputted Balance<Y>). */
  yRepaid: ToField<'u64'>
  /** The amount of X paid out to the liquidator as a reward (after protocol fees), taken from cx. */
  liquidatorRewardX: ToField<'u64'>
  /** The amount of Y paid out to the liquidator as a reward (after protocol fees), taken from cy. */
  liquidatorRewardY: ToField<'u64'>
  /** The protocol fee (in X) taken from the liquidator's reward before payout. */
  liquidationFeeX: ToField<'u64'>
  /** The protocol fee (in Y) taken from the liquidator's reward before payout. */
  liquidationFeeY: ToField<'u64'>
}

export type LiquidationInfoReified = Reified<LiquidationInfo, LiquidationInfoFields>

export type LiquidationInfoJSONField = {
  positionId: string
  model: ToJSON<PositionModel>
  oraclePriceX128: string
  xRepaid: string
  yRepaid: string
  liquidatorRewardX: string
  liquidatorRewardY: string
  liquidationFeeX: string
  liquidationFeeY: string
}

export type LiquidationInfoJSON = {
  $typeName: typeof LiquidationInfo.$typeName
  $typeArgs: []
} & LiquidationInfoJSONField

/** Information emitted for a position liquidation event, capturing all key amounts and rewards. */
export class LiquidationInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::LiquidationInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::LiquidationInfo')
    }::position_core_clmm::LiquidationInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LiquidationInfo.$typeName = LiquidationInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::LiquidationInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LiquidationInfo.$isPhantom = LiquidationInfo.$isPhantom

  /** The ID of the liquidated position. */
  readonly positionId: ToField<ID>
  /** The position model at the time of liquidation. */
  readonly model: ToField<PositionModel>
  /** The oracle price (P = Y / X) at the time of liquidation, Q128 fixed-point. */
  readonly oraclePriceX128: ToField<'u256'>
  /** The amount of X debt repaid by the liquidator (from their inputted Balance<X>). */
  readonly xRepaid: ToField<'u64'>
  /** The amount of Y debt repaid by the liquidator (from their inputted Balance<Y>). */
  readonly yRepaid: ToField<'u64'>
  /** The amount of X paid out to the liquidator as a reward (after protocol fees), taken from cx. */
  readonly liquidatorRewardX: ToField<'u64'>
  /** The amount of Y paid out to the liquidator as a reward (after protocol fees), taken from cy. */
  readonly liquidatorRewardY: ToField<'u64'>
  /** The protocol fee (in X) taken from the liquidator's reward before payout. */
  readonly liquidationFeeX: ToField<'u64'>
  /** The protocol fee (in Y) taken from the liquidator's reward before payout. */
  readonly liquidationFeeY: ToField<'u64'>

  private constructor(typeArgs: [], fields: LiquidationInfoFields) {
    this.$fullTypeName = composeSuiType(
      LiquidationInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::LiquidationInfo`
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
      get typeName() {
        return LiquidationInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          LiquidationInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::LiquidationInfo`
      },
      typeArgs: [] as [],
      isPhantom: LiquidationInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LiquidationInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LiquidationInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LiquidationInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LiquidationInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LiquidationInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        LiquidationInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => LiquidationInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LiquidationInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => LiquidationInfo.fetch(client, id),
      new: (fields: LiquidationInfoFields) => {
        return new LiquidationInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LiquidationInfoReified {
    return LiquidationInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LiquidationInfo>> {
    return phantom(LiquidationInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LiquidationInfo>> {
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

  static get bcs(): ReturnType<typeof LiquidationInfo.instantiateBcs> {
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

  toJSONField(): LiquidationInfoJSONField {
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

  toJSON(): LiquidationInfoJSON {
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
      throw new Error(
        `not a LiquidationInfo json object: expected '${LiquidationInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LiquidationInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): LiquidationInfo {
    if (!isLiquidationInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a LiquidationInfo object`)
    }
    return LiquidationInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LiquidationInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): LiquidationInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLiquidationInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LiquidationInfo object`)
    }
    return LiquidationInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LiquidationInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): LiquidationInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLiquidationInfo(data.bcs.type)) {
        throw new Error(`object at is not a LiquidationInfo object`)
      }

      return LiquidationInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LiquidationInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<LiquidationInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isLiquidationInfo(object.type)) {
      throw new Error(`object at id ${id} is not a LiquidationInfo object`)
    }
    return LiquidationInfo.fromBcs(object.content)
  }
}

/* ============================== ReductionInfo =============================== */

export function isReductionInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ReductionInfo')
    }::position_core_clmm::ReductionInfo`
}

export interface ReductionInfoFields {
  positionId: ToField<ID>
  model: ToField<PositionModel>
  oraclePriceX128: ToField<'u256'>
  sqrtPoolPriceX64: ToField<'u128'>
  /** The amount of L removed from the LP position. */
  deltaL: ToField<'u128'>
  /** The amount of X withdrawn from the LP position (corresponds to delta_l). */
  deltaX: ToField<'u64'>
  /** The amount of Y withdrawn from the LP position (corresponds to delta_l). */
  deltaY: ToField<'u64'>
  /** The total amount of X returned from the position (delta_x + cx). */
  withdrawnX: ToField<'u64'>
  /** The total amount of Y returned from the position (delta_y + cy). */
  withdrawnY: ToField<'u64'>
  /** The amount X debt repaid. */
  xRepaid: ToField<'u64'>
  /** The amount Y debt repaid. */
  yRepaid: ToField<'u64'>
}

export type ReductionInfoReified = Reified<ReductionInfo, ReductionInfoFields>

export type ReductionInfoJSONField = {
  positionId: string
  model: ToJSON<PositionModel>
  oraclePriceX128: string
  sqrtPoolPriceX64: string
  deltaL: string
  deltaX: string
  deltaY: string
  withdrawnX: string
  withdrawnY: string
  xRepaid: string
  yRepaid: string
}

export type ReductionInfoJSON = {
  $typeName: typeof ReductionInfo.$typeName
  $typeArgs: []
} & ReductionInfoJSONField

export class ReductionInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::ReductionInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::ReductionInfo')
    }::position_core_clmm::ReductionInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ReductionInfo.$typeName = ReductionInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::ReductionInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ReductionInfo.$isPhantom = ReductionInfo.$isPhantom

  readonly positionId: ToField<ID>
  readonly model: ToField<PositionModel>
  readonly oraclePriceX128: ToField<'u256'>
  readonly sqrtPoolPriceX64: ToField<'u128'>
  /** The amount of L removed from the LP position. */
  readonly deltaL: ToField<'u128'>
  /** The amount of X withdrawn from the LP position (corresponds to delta_l). */
  readonly deltaX: ToField<'u64'>
  /** The amount of Y withdrawn from the LP position (corresponds to delta_l). */
  readonly deltaY: ToField<'u64'>
  /** The total amount of X returned from the position (delta_x + cx). */
  readonly withdrawnX: ToField<'u64'>
  /** The total amount of Y returned from the position (delta_y + cy). */
  readonly withdrawnY: ToField<'u64'>
  /** The amount X debt repaid. */
  readonly xRepaid: ToField<'u64'>
  /** The amount Y debt repaid. */
  readonly yRepaid: ToField<'u64'>

  private constructor(typeArgs: [], fields: ReductionInfoFields) {
    this.$fullTypeName = composeSuiType(
      ReductionInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::ReductionInfo`
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
      get typeName() {
        return ReductionInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ReductionInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::ReductionInfo`
      },
      typeArgs: [] as [],
      isPhantom: ReductionInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ReductionInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ReductionInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ReductionInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ReductionInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ReductionInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ReductionInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ReductionInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ReductionInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ReductionInfo.fetch(client, id),
      new: (fields: ReductionInfoFields) => {
        return new ReductionInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ReductionInfoReified {
    return ReductionInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ReductionInfo>> {
    return phantom(ReductionInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ReductionInfo>> {
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

  static get bcs(): ReturnType<typeof ReductionInfo.instantiateBcs> {
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

  toJSONField(): ReductionInfoJSONField {
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

  toJSON(): ReductionInfoJSON {
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
      throw new Error(
        `not a ReductionInfo json object: expected '${ReductionInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ReductionInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ReductionInfo {
    if (!isReductionInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ReductionInfo object`)
    }
    return ReductionInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReductionInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ReductionInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReductionInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ReductionInfo object`)
    }
    return ReductionInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ReductionInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ReductionInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReductionInfo(data.bcs.type)) {
        throw new Error(`object at is not a ReductionInfo object`)
      }

      return ReductionInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ReductionInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ReductionInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isReductionInfo(object.type)) {
      throw new Error(`object at id ${id} is not a ReductionInfo object`)
    }
    return ReductionInfo.fromBcs(object.content)
  }
}

/* ============================== AddCollateralInfo =============================== */

export function isAddCollateralInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AddCollateralInfo')
    }::position_core_clmm::AddCollateralInfo`
}

export interface AddCollateralInfoFields {
  /** The ID of the position to which collateral was added. */
  positionId: ToField<ID>
  /** The amount of X collateral added. */
  amountX: ToField<'u64'>
  /** The amount of Y collateral added. */
  amountY: ToField<'u64'>
}

export type AddCollateralInfoReified = Reified<AddCollateralInfo, AddCollateralInfoFields>

export type AddCollateralInfoJSONField = {
  positionId: string
  amountX: string
  amountY: string
}

export type AddCollateralInfoJSON = {
  $typeName: typeof AddCollateralInfo.$typeName
  $typeArgs: []
} & AddCollateralInfoJSONField

/** Event emitted when collateral is added to a position. */
export class AddCollateralInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::AddCollateralInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AddCollateralInfo')
    }::position_core_clmm::AddCollateralInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddCollateralInfo.$typeName = AddCollateralInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::AddCollateralInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddCollateralInfo.$isPhantom = AddCollateralInfo.$isPhantom

  /** The ID of the position to which collateral was added. */
  readonly positionId: ToField<ID>
  /** The amount of X collateral added. */
  readonly amountX: ToField<'u64'>
  /** The amount of Y collateral added. */
  readonly amountY: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddCollateralInfoFields) {
    this.$fullTypeName = composeSuiType(
      AddCollateralInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::AddCollateralInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.amountX = fields.amountX
    this.amountY = fields.amountY
  }

  static reified(): AddCollateralInfoReified {
    const reifiedBcs = AddCollateralInfo.bcs
    return {
      get typeName() {
        return AddCollateralInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddCollateralInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::AddCollateralInfo`
      },
      typeArgs: [] as [],
      isPhantom: AddCollateralInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddCollateralInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddCollateralInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddCollateralInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddCollateralInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddCollateralInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddCollateralInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddCollateralInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddCollateralInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddCollateralInfo.fetch(client, id),
      new: (fields: AddCollateralInfoFields) => {
        return new AddCollateralInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddCollateralInfoReified {
    return AddCollateralInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddCollateralInfo>> {
    return phantom(AddCollateralInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddCollateralInfo>> {
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

  static get bcs(): ReturnType<typeof AddCollateralInfo.instantiateBcs> {
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

  toJSONField(): AddCollateralInfoJSONField {
    return {
      positionId: this.positionId,
      amountX: this.amountX.toString(),
      amountY: this.amountY.toString(),
    }
  }

  toJSON(): AddCollateralInfoJSON {
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
      throw new Error(
        `not a AddCollateralInfo json object: expected '${AddCollateralInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddCollateralInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddCollateralInfo {
    if (!isAddCollateralInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddCollateralInfo object`)
    }
    return AddCollateralInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddCollateralInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddCollateralInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddCollateralInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddCollateralInfo object`)
    }
    return AddCollateralInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddCollateralInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddCollateralInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddCollateralInfo(data.bcs.type)) {
        throw new Error(`object at is not a AddCollateralInfo object`)
      }

      return AddCollateralInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddCollateralInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddCollateralInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddCollateralInfo(object.type)) {
      throw new Error(`object at id ${id} is not a AddCollateralInfo object`)
    }
    return AddCollateralInfo.fromBcs(object.content)
  }
}

/* ============================== AddLiquidityInfo =============================== */

export function isAddLiquidityInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AddLiquidityInfo')
    }::position_core_clmm::AddLiquidityInfo`
}

export interface AddLiquidityInfoFields {
  /** The ID of the position to which liquidity was added. */
  positionId: ToField<ID>
  /** The pool's square root price (Q64.64) at the time of liquidity addition. */
  sqrtPoolPriceX64: ToField<'u128'>
  /** The amount of liquidity (L) added to the position. */
  deltaL: ToField<'u128'>
  /** The amount of X tokens added to the position (corresponds to delta_l). */
  deltaX: ToField<'u64'>
  /** The amount of Y tokens added to the position (corresponds to delta_l). */
  deltaY: ToField<'u64'>
}

export type AddLiquidityInfoReified = Reified<AddLiquidityInfo, AddLiquidityInfoFields>

export type AddLiquidityInfoJSONField = {
  positionId: string
  sqrtPoolPriceX64: string
  deltaL: string
  deltaX: string
  deltaY: string
}

export type AddLiquidityInfoJSON = {
  $typeName: typeof AddLiquidityInfo.$typeName
  $typeArgs: []
} & AddLiquidityInfoJSONField

/** Event emitted when liquidity is added to a position. */
export class AddLiquidityInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::AddLiquidityInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::AddLiquidityInfo')
    }::position_core_clmm::AddLiquidityInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddLiquidityInfo.$typeName = AddLiquidityInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::AddLiquidityInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddLiquidityInfo.$isPhantom = AddLiquidityInfo.$isPhantom

  /** The ID of the position to which liquidity was added. */
  readonly positionId: ToField<ID>
  /** The pool's square root price (Q64.64) at the time of liquidity addition. */
  readonly sqrtPoolPriceX64: ToField<'u128'>
  /** The amount of liquidity (L) added to the position. */
  readonly deltaL: ToField<'u128'>
  /** The amount of X tokens added to the position (corresponds to delta_l). */
  readonly deltaX: ToField<'u64'>
  /** The amount of Y tokens added to the position (corresponds to delta_l). */
  readonly deltaY: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddLiquidityInfoFields) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::AddLiquidityInfo`
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
      get typeName() {
        return AddLiquidityInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddLiquidityInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::AddLiquidityInfo`
      },
      typeArgs: [] as [],
      isPhantom: AddLiquidityInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddLiquidityInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddLiquidityInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddLiquidityInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddLiquidityInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddLiquidityInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddLiquidityInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddLiquidityInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddLiquidityInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddLiquidityInfo.fetch(client, id),
      new: (fields: AddLiquidityInfoFields) => {
        return new AddLiquidityInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddLiquidityInfoReified {
    return AddLiquidityInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityInfo>> {
    return phantom(AddLiquidityInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddLiquidityInfo>> {
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

  static get bcs(): ReturnType<typeof AddLiquidityInfo.instantiateBcs> {
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

  toJSONField(): AddLiquidityInfoJSONField {
    return {
      positionId: this.positionId,
      sqrtPoolPriceX64: this.sqrtPoolPriceX64.toString(),
      deltaL: this.deltaL.toString(),
      deltaX: this.deltaX.toString(),
      deltaY: this.deltaY.toString(),
    }
  }

  toJSON(): AddLiquidityInfoJSON {
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
      throw new Error(
        `not a AddLiquidityInfo json object: expected '${AddLiquidityInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddLiquidityInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddLiquidityInfo {
    if (!isAddLiquidityInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddLiquidityInfo object`)
    }
    return AddLiquidityInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddLiquidityInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddLiquidityInfo object`)
    }
    return AddLiquidityInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddLiquidityInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityInfo(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityInfo object`)
      }

      return AddLiquidityInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddLiquidityInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddLiquidityInfo(object.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityInfo object`)
    }
    return AddLiquidityInfo.fromBcs(object.content)
  }
}

/* ============================== RepayDebtInfo =============================== */

export function isRepayDebtInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::RepayDebtInfo')
    }::position_core_clmm::RepayDebtInfo`
}

export interface RepayDebtInfoFields {
  /** The ID of the position for which debt was repaid. */
  positionId: ToField<ID>
  /** The amount of X repaid to the position's debt. */
  xRepaid: ToField<'u64'>
  /** The amount of Y repaid to the position's debt. */
  yRepaid: ToField<'u64'>
}

export type RepayDebtInfoReified = Reified<RepayDebtInfo, RepayDebtInfoFields>

export type RepayDebtInfoJSONField = {
  positionId: string
  xRepaid: string
  yRepaid: string
}

export type RepayDebtInfoJSON = {
  $typeName: typeof RepayDebtInfo.$typeName
  $typeArgs: []
} & RepayDebtInfoJSONField

/** Event emitted when debt is repaid on a position by the owner. */
export class RepayDebtInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::RepayDebtInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::RepayDebtInfo')
    }::position_core_clmm::RepayDebtInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RepayDebtInfo.$typeName = RepayDebtInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::RepayDebtInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RepayDebtInfo.$isPhantom = RepayDebtInfo.$isPhantom

  /** The ID of the position for which debt was repaid. */
  readonly positionId: ToField<ID>
  /** The amount of X repaid to the position's debt. */
  readonly xRepaid: ToField<'u64'>
  /** The amount of Y repaid to the position's debt. */
  readonly yRepaid: ToField<'u64'>

  private constructor(typeArgs: [], fields: RepayDebtInfoFields) {
    this.$fullTypeName = composeSuiType(
      RepayDebtInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::RepayDebtInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.xRepaid = fields.xRepaid
    this.yRepaid = fields.yRepaid
  }

  static reified(): RepayDebtInfoReified {
    const reifiedBcs = RepayDebtInfo.bcs
    return {
      get typeName() {
        return RepayDebtInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RepayDebtInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::RepayDebtInfo`
      },
      typeArgs: [] as [],
      isPhantom: RepayDebtInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RepayDebtInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RepayDebtInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RepayDebtInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RepayDebtInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RepayDebtInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RepayDebtInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RepayDebtInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RepayDebtInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RepayDebtInfo.fetch(client, id),
      new: (fields: RepayDebtInfoFields) => {
        return new RepayDebtInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RepayDebtInfoReified {
    return RepayDebtInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RepayDebtInfo>> {
    return phantom(RepayDebtInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RepayDebtInfo>> {
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

  static get bcs(): ReturnType<typeof RepayDebtInfo.instantiateBcs> {
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

  toJSONField(): RepayDebtInfoJSONField {
    return {
      positionId: this.positionId,
      xRepaid: this.xRepaid.toString(),
      yRepaid: this.yRepaid.toString(),
    }
  }

  toJSON(): RepayDebtInfoJSON {
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
      throw new Error(
        `not a RepayDebtInfo json object: expected '${RepayDebtInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RepayDebtInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RepayDebtInfo {
    if (!isRepayDebtInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RepayDebtInfo object`)
    }
    return RepayDebtInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RepayDebtInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RepayDebtInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRepayDebtInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RepayDebtInfo object`)
    }
    return RepayDebtInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RepayDebtInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RepayDebtInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRepayDebtInfo(data.bcs.type)) {
        throw new Error(`object at is not a RepayDebtInfo object`)
      }

      return RepayDebtInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RepayDebtInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RepayDebtInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRepayDebtInfo(object.type)) {
      throw new Error(`object at id ${id} is not a RepayDebtInfo object`)
    }
    return RepayDebtInfo.fromBcs(object.content)
  }
}

/* ============================== OwnerCollectFeeInfo =============================== */

export function isOwnerCollectFeeInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerCollectFeeInfo')
    }::position_core_clmm::OwnerCollectFeeInfo`
}

export interface OwnerCollectFeeInfoFields {
  /** The ID of the position for which AMM trading fees were collected. */
  positionId: ToField<ID>
  /** The total amount of X fees collected from the AMM (before protocol fees are taken). */
  collectedXAmt: ToField<'u64'>
  /** The total amount of Y fees collected from the AMM (before protocol fees are taken). */
  collectedYAmt: ToField<'u64'>
  /** The protocol fee amount deducted from the collected X fees. */
  feeAmtX: ToField<'u64'>
  /** The protocol fee amount deducted from the collected Y fees. */
  feeAmtY: ToField<'u64'>
}

export type OwnerCollectFeeInfoReified = Reified<OwnerCollectFeeInfo, OwnerCollectFeeInfoFields>

export type OwnerCollectFeeInfoJSONField = {
  positionId: string
  collectedXAmt: string
  collectedYAmt: string
  feeAmtX: string
  feeAmtY: string
}

export type OwnerCollectFeeInfoJSON = {
  $typeName: typeof OwnerCollectFeeInfo.$typeName
  $typeArgs: []
} & OwnerCollectFeeInfoJSONField

/** Event emitted when the position owner collects AMM trading fees directly. */
export class OwnerCollectFeeInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::OwnerCollectFeeInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerCollectFeeInfo')
    }::position_core_clmm::OwnerCollectFeeInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof OwnerCollectFeeInfo.$typeName = OwnerCollectFeeInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::OwnerCollectFeeInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof OwnerCollectFeeInfo.$isPhantom = OwnerCollectFeeInfo.$isPhantom

  /** The ID of the position for which AMM trading fees were collected. */
  readonly positionId: ToField<ID>
  /** The total amount of X fees collected from the AMM (before protocol fees are taken). */
  readonly collectedXAmt: ToField<'u64'>
  /** The total amount of Y fees collected from the AMM (before protocol fees are taken). */
  readonly collectedYAmt: ToField<'u64'>
  /** The protocol fee amount deducted from the collected X fees. */
  readonly feeAmtX: ToField<'u64'>
  /** The protocol fee amount deducted from the collected Y fees. */
  readonly feeAmtY: ToField<'u64'>

  private constructor(typeArgs: [], fields: OwnerCollectFeeInfoFields) {
    this.$fullTypeName = composeSuiType(
      OwnerCollectFeeInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::OwnerCollectFeeInfo`
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
      get typeName() {
        return OwnerCollectFeeInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OwnerCollectFeeInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::OwnerCollectFeeInfo`
      },
      typeArgs: [] as [],
      isPhantom: OwnerCollectFeeInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OwnerCollectFeeInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OwnerCollectFeeInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OwnerCollectFeeInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OwnerCollectFeeInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OwnerCollectFeeInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OwnerCollectFeeInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => OwnerCollectFeeInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => OwnerCollectFeeInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => OwnerCollectFeeInfo.fetch(client, id),
      new: (fields: OwnerCollectFeeInfoFields) => {
        return new OwnerCollectFeeInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): OwnerCollectFeeInfoReified {
    return OwnerCollectFeeInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OwnerCollectFeeInfo>> {
    return phantom(OwnerCollectFeeInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<OwnerCollectFeeInfo>> {
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

  static get bcs(): ReturnType<typeof OwnerCollectFeeInfo.instantiateBcs> {
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

  toJSONField(): OwnerCollectFeeInfoJSONField {
    return {
      positionId: this.positionId,
      collectedXAmt: this.collectedXAmt.toString(),
      collectedYAmt: this.collectedYAmt.toString(),
      feeAmtX: this.feeAmtX.toString(),
      feeAmtY: this.feeAmtY.toString(),
    }
  }

  toJSON(): OwnerCollectFeeInfoJSON {
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
      throw new Error(
        `not a OwnerCollectFeeInfo json object: expected '${OwnerCollectFeeInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return OwnerCollectFeeInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): OwnerCollectFeeInfo {
    if (!isOwnerCollectFeeInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OwnerCollectFeeInfo object`)
    }
    return OwnerCollectFeeInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerCollectFeeInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): OwnerCollectFeeInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerCollectFeeInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OwnerCollectFeeInfo object`)
    }
    return OwnerCollectFeeInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerCollectFeeInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): OwnerCollectFeeInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerCollectFeeInfo(data.bcs.type)) {
        throw new Error(`object at is not a OwnerCollectFeeInfo object`)
      }

      return OwnerCollectFeeInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerCollectFeeInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<OwnerCollectFeeInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOwnerCollectFeeInfo(object.type)) {
      throw new Error(`object at id ${id} is not a OwnerCollectFeeInfo object`)
    }
    return OwnerCollectFeeInfo.fromBcs(object.content)
  }
}

/* ============================== OwnerCollectRewardInfo =============================== */

export function isOwnerCollectRewardInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerCollectRewardInfo')
    }::position_core_clmm::OwnerCollectRewardInfo` + '<',
  )
}

export interface OwnerCollectRewardInfoFields<T extends PhantomTypeArgument> {
  /** The ID of the position for which AMM rewards were collected. */
  positionId: ToField<ID>
  /** The total amount of rewards collected from the AMM (before protocol fees are taken). */
  collectedRewardAmt: ToField<'u64'>
  /** The protocol fee amount deducted from the collected rewards. */
  feeAmt: ToField<'u64'>
}

export type OwnerCollectRewardInfoReified<T extends PhantomTypeArgument> = Reified<
  OwnerCollectRewardInfo<T>,
  OwnerCollectRewardInfoFields<T>
>

export type OwnerCollectRewardInfoJSONField<T extends PhantomTypeArgument> = {
  positionId: string
  collectedRewardAmt: string
  feeAmt: string
}

export type OwnerCollectRewardInfoJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof OwnerCollectRewardInfo.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & OwnerCollectRewardInfoJSONField<T>

/** Event emitted when the position owner collects AMM rewards directly (not trading fees). */
export class OwnerCollectRewardInfo<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::OwnerCollectRewardInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerCollectRewardInfo')
    }::position_core_clmm::OwnerCollectRewardInfo` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof OwnerCollectRewardInfo.$typeName = OwnerCollectRewardInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::OwnerCollectRewardInfo<${PhantomToTypeStr<
    T
  >}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof OwnerCollectRewardInfo.$isPhantom = OwnerCollectRewardInfo.$isPhantom

  /** The ID of the position for which AMM rewards were collected. */
  readonly positionId: ToField<ID>
  /** The total amount of rewards collected from the AMM (before protocol fees are taken). */
  readonly collectedRewardAmt: ToField<'u64'>
  /** The protocol fee amount deducted from the collected rewards. */
  readonly feeAmt: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: OwnerCollectRewardInfoFields<T>) {
    this.$fullTypeName = composeSuiType(
      OwnerCollectRewardInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::OwnerCollectRewardInfo<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.collectedRewardAmt = fields.collectedRewardAmt
    this.feeAmt = fields.feeAmt
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): OwnerCollectRewardInfoReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = OwnerCollectRewardInfo.bcs
    return {
      get typeName() {
        return OwnerCollectRewardInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OwnerCollectRewardInfo.$typeName,
          ...[extractType(T)],
        ) as `${string}::position_core_clmm::OwnerCollectRewardInfo<${PhantomToTypeStr<
          ToPhantomTypeArgument<T>
        >}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: OwnerCollectRewardInfo.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => OwnerCollectRewardInfo.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        OwnerCollectRewardInfo.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => OwnerCollectRewardInfo.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OwnerCollectRewardInfo.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => OwnerCollectRewardInfo.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OwnerCollectRewardInfo.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        OwnerCollectRewardInfo.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OwnerCollectRewardInfo.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        OwnerCollectRewardInfo.fetch(client, T, id),
      new: (fields: OwnerCollectRewardInfoFields<ToPhantomTypeArgument<T>>) => {
        return new OwnerCollectRewardInfo([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof OwnerCollectRewardInfo.reified {
    return OwnerCollectRewardInfo.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<OwnerCollectRewardInfo<ToPhantomTypeArgument<T>>>> {
    return phantom(OwnerCollectRewardInfo.reified(T))
  }

  static get p(): typeof OwnerCollectRewardInfo.phantom {
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

  static get bcs(): ReturnType<typeof OwnerCollectRewardInfo.instantiateBcs> {
    if (!OwnerCollectRewardInfo.cachedBcs) {
      OwnerCollectRewardInfo.cachedBcs = OwnerCollectRewardInfo.instantiateBcs()
    }
    return OwnerCollectRewardInfo.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    return OwnerCollectRewardInfo.reified(typeArg).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      collectedRewardAmt: decodeFromFields('u64', fields.collected_reward_amt),
      feeAmt: decodeFromFields('u64', fields.fee_amt),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    return OwnerCollectRewardInfo.fromFields(typeArg, OwnerCollectRewardInfo.bcs.parse(data))
  }

  toJSONField(): OwnerCollectRewardInfoJSONField<T> {
    return {
      positionId: this.positionId,
      collectedRewardAmt: this.collectedRewardAmt.toString(),
      feeAmt: this.feeAmt.toString(),
    }
  }

  toJSON(): OwnerCollectRewardInfoJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    return OwnerCollectRewardInfo.reified(typeArg).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      collectedRewardAmt: decodeFromJSONField('u64', field.collectedRewardAmt),
      feeAmt: decodeFromJSONField('u64', field.feeAmt),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== OwnerCollectRewardInfo.$typeName) {
      throw new Error(
        `not a OwnerCollectRewardInfo json object: expected '${OwnerCollectRewardInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(OwnerCollectRewardInfo.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return OwnerCollectRewardInfo.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    if (!isOwnerCollectRewardInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OwnerCollectRewardInfo object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return OwnerCollectRewardInfo.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerCollectRewardInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerCollectRewardInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OwnerCollectRewardInfo object`,
      )
    }
    return OwnerCollectRewardInfo.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerCollectRewardInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): OwnerCollectRewardInfo<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerCollectRewardInfo(data.bcs.type)) {
        throw new Error(`object at is not a OwnerCollectRewardInfo object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return OwnerCollectRewardInfo.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerCollectRewardInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<OwnerCollectRewardInfo<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOwnerCollectRewardInfo(object.type)) {
      throw new Error(`object at id ${id} is not a OwnerCollectRewardInfo object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return OwnerCollectRewardInfo.fromBcs(typeArg, object.content)
  }
}

/* ============================== OwnerTakeStashedRewardsInfo =============================== */

export function isOwnerTakeStashedRewardsInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerTakeStashedRewardsInfo')
    }::position_core_clmm::OwnerTakeStashedRewardsInfo` + '<',
  )
}

export interface OwnerTakeStashedRewardsInfoFields<T extends PhantomTypeArgument> {
  /** The ID of the position from which stashed rewards were taken. */
  positionId: ToField<ID>
  /** The amount of stashed rewards of type `T` that were taken. */
  amount: ToField<'u64'>
}

export type OwnerTakeStashedRewardsInfoReified<T extends PhantomTypeArgument> = Reified<
  OwnerTakeStashedRewardsInfo<T>,
  OwnerTakeStashedRewardsInfoFields<T>
>

export type OwnerTakeStashedRewardsInfoJSONField<T extends PhantomTypeArgument> = {
  positionId: string
  amount: string
}

export type OwnerTakeStashedRewardsInfoJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof OwnerTakeStashedRewardsInfo.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & OwnerTakeStashedRewardsInfoJSONField<T>

/** Event emitted when the position owner takes stashed AMM rewards of a specific type from their position. */
export class OwnerTakeStashedRewardsInfo<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::OwnerTakeStashedRewardsInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::OwnerTakeStashedRewardsInfo')
    }::position_core_clmm::OwnerTakeStashedRewardsInfo` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof OwnerTakeStashedRewardsInfo.$typeName =
    OwnerTakeStashedRewardsInfo.$typeName
  readonly $fullTypeName:
    `${string}::position_core_clmm::OwnerTakeStashedRewardsInfo<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof OwnerTakeStashedRewardsInfo.$isPhantom =
    OwnerTakeStashedRewardsInfo.$isPhantom

  /** The ID of the position from which stashed rewards were taken. */
  readonly positionId: ToField<ID>
  /** The amount of stashed rewards of type `T` that were taken. */
  readonly amount: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>],
    fields: OwnerTakeStashedRewardsInfoFields<T>,
  ) {
    this.$fullTypeName = composeSuiType(
      OwnerTakeStashedRewardsInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::OwnerTakeStashedRewardsInfo<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.amount = fields.amount
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): OwnerTakeStashedRewardsInfoReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = OwnerTakeStashedRewardsInfo.bcs
    return {
      get typeName() {
        return OwnerTakeStashedRewardsInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OwnerTakeStashedRewardsInfo.$typeName,
          ...[extractType(T)],
        ) as `${string}::position_core_clmm::OwnerTakeStashedRewardsInfo<${PhantomToTypeStr<
          ToPhantomTypeArgument<T>
        >}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OwnerTakeStashedRewardsInfo.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        OwnerTakeStashedRewardsInfo.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OwnerTakeStashedRewardsInfo.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        OwnerTakeStashedRewardsInfo.fetch(client, T, id),
      new: (fields: OwnerTakeStashedRewardsInfoFields<ToPhantomTypeArgument<T>>) => {
        return new OwnerTakeStashedRewardsInfo([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof OwnerTakeStashedRewardsInfo.reified {
    return OwnerTakeStashedRewardsInfo.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>>>> {
    return phantom(OwnerTakeStashedRewardsInfo.reified(T))
  }

  static get p(): typeof OwnerTakeStashedRewardsInfo.phantom {
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

  static get bcs(): ReturnType<typeof OwnerTakeStashedRewardsInfo.instantiateBcs> {
    if (!OwnerTakeStashedRewardsInfo.cachedBcs) {
      OwnerTakeStashedRewardsInfo.cachedBcs = OwnerTakeStashedRewardsInfo.instantiateBcs()
    }
    return OwnerTakeStashedRewardsInfo.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    return OwnerTakeStashedRewardsInfo.reified(typeArg).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    return OwnerTakeStashedRewardsInfo.fromFields(
      typeArg,
      OwnerTakeStashedRewardsInfo.bcs.parse(data),
    )
  }

  toJSONField(): OwnerTakeStashedRewardsInfoJSONField<T> {
    return {
      positionId: this.positionId,
      amount: this.amount.toString(),
    }
  }

  toJSON(): OwnerTakeStashedRewardsInfoJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    return OwnerTakeStashedRewardsInfo.reified(typeArg).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== OwnerTakeStashedRewardsInfo.$typeName) {
      throw new Error(
        `not a OwnerTakeStashedRewardsInfo json object: expected '${OwnerTakeStashedRewardsInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(OwnerTakeStashedRewardsInfo.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return OwnerTakeStashedRewardsInfo.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    if (!isOwnerTakeStashedRewardsInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OwnerTakeStashedRewardsInfo object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return OwnerTakeStashedRewardsInfo.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerTakeStashedRewardsInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOwnerTakeStashedRewardsInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OwnerTakeStashedRewardsInfo object`,
      )
    }
    return OwnerTakeStashedRewardsInfo.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OwnerTakeStashedRewardsInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOwnerTakeStashedRewardsInfo(data.bcs.type)) {
        throw new Error(`object at is not a OwnerTakeStashedRewardsInfo object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return OwnerTakeStashedRewardsInfo.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OwnerTakeStashedRewardsInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<OwnerTakeStashedRewardsInfo<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOwnerTakeStashedRewardsInfo(object.type)) {
      throw new Error(`object at id ${id} is not a OwnerTakeStashedRewardsInfo object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return OwnerTakeStashedRewardsInfo.fromBcs(typeArg, object.content)
  }
}

/* ============================== DeletePositionInfo =============================== */

export function isDeletePositionInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeletePositionInfo')
    }::position_core_clmm::DeletePositionInfo`
}

export interface DeletePositionInfoFields {
  /** The ID of the deleted position. */
  positionId: ToField<ID>
  /** The ID of the `PositionCap` capability associated with the deleted position. */
  capId: ToField<ID>
}

export type DeletePositionInfoReified = Reified<DeletePositionInfo, DeletePositionInfoFields>

export type DeletePositionInfoJSONField = {
  positionId: string
  capId: string
}

export type DeletePositionInfoJSON = {
  $typeName: typeof DeletePositionInfo.$typeName
  $typeArgs: []
} & DeletePositionInfoJSONField

/** Event emitted when a leveraged position is deleted. */
export class DeletePositionInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::DeletePositionInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeletePositionInfo')
    }::position_core_clmm::DeletePositionInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DeletePositionInfo.$typeName = DeletePositionInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::DeletePositionInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DeletePositionInfo.$isPhantom = DeletePositionInfo.$isPhantom

  /** The ID of the deleted position. */
  readonly positionId: ToField<ID>
  /** The ID of the `PositionCap` capability associated with the deleted position. */
  readonly capId: ToField<ID>

  private constructor(typeArgs: [], fields: DeletePositionInfoFields) {
    this.$fullTypeName = composeSuiType(
      DeletePositionInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::DeletePositionInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.capId = fields.capId
  }

  static reified(): DeletePositionInfoReified {
    const reifiedBcs = DeletePositionInfo.bcs
    return {
      get typeName() {
        return DeletePositionInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DeletePositionInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::DeletePositionInfo`
      },
      typeArgs: [] as [],
      isPhantom: DeletePositionInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DeletePositionInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DeletePositionInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DeletePositionInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DeletePositionInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DeletePositionInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DeletePositionInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DeletePositionInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DeletePositionInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DeletePositionInfo.fetch(client, id),
      new: (fields: DeletePositionInfoFields) => {
        return new DeletePositionInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DeletePositionInfoReified {
    return DeletePositionInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeletePositionInfo>> {
    return phantom(DeletePositionInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DeletePositionInfo>> {
    return DeletePositionInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeletePositionInfo', {
      position_id: ID.bcs,
      cap_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DeletePositionInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DeletePositionInfo.instantiateBcs> {
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

  toJSONField(): DeletePositionInfoJSONField {
    return {
      positionId: this.positionId,
      capId: this.capId,
    }
  }

  toJSON(): DeletePositionInfoJSON {
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
      throw new Error(
        `not a DeletePositionInfo json object: expected '${DeletePositionInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DeletePositionInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DeletePositionInfo {
    if (!isDeletePositionInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DeletePositionInfo object`)
    }
    return DeletePositionInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeletePositionInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DeletePositionInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeletePositionInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DeletePositionInfo object`)
    }
    return DeletePositionInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeletePositionInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DeletePositionInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDeletePositionInfo(data.bcs.type)) {
        throw new Error(`object at is not a DeletePositionInfo object`)
      }

      return DeletePositionInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeletePositionInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DeletePositionInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDeletePositionInfo(object.type)) {
      throw new Error(`object at id ${id} is not a DeletePositionInfo object`)
    }
    return DeletePositionInfo.fromBcs(object.content)
  }
}

/* ============================== RebalanceInfo =============================== */

export function isRebalanceInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::RebalanceInfo')
    }::position_core_clmm::RebalanceInfo`
}

export interface RebalanceInfoFields {
  /** Unique identifier for this rebalancing operation. Used for tracking and auditing. */
  id: ToField<ID>
  /** ID of the position that was rebalanced */
  positionId: ToField<ID>
  /** Amount of X tokens collected from AMM fees (before protocol fee deduction) */
  collectedAmmFeeX: ToField<'u64'>
  /** Amount of Y tokens collected from AMM fees (before protocol fee deduction) */
  collectedAmmFeeY: ToField<'u64'>
  /** Protocol-specific rewards collected from AMM (before protocol fee deduction) */
  collectedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
  /** Protocol fees taken from collected rewards and fees */
  feesTaken: ToField<VecMap<TypeName, 'u64'>>
  /** Amount of X tokens taken from extra collateral */
  takenCx: ToField<'u64'>
  /** Amount of Y tokens taken from extra collateral */
  takenCy: ToField<'u64'>
  /** Liquidity added to the LP position */
  deltaL: ToField<'u128'>
  /** Amount of X tokens added to LP position (corresponding to delta_l) */
  deltaX: ToField<'u64'>
  /** Amount of Y tokens added to LP position (corresponding to delta_l) */
  deltaY: ToField<'u64'>
  /** Amount of X debt repaid */
  xRepaid: ToField<'u64'>
  /** Amount of Y debt repaid */
  yRepaid: ToField<'u64'>
  /** Amount of X tokens added to extra collateral */
  addedCx: ToField<'u64'>
  /** Amount of Y tokens added to extra collateral */
  addedCy: ToField<'u64'>
  /** Protocol-specific rewards stashed in position for later owner withdrawal */
  stashedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
}

export type RebalanceInfoReified = Reified<RebalanceInfo, RebalanceInfoFields>

export type RebalanceInfoJSONField = {
  id: string
  positionId: string
  collectedAmmFeeX: string
  collectedAmmFeeY: string
  collectedAmmRewards: ToJSON<VecMap<TypeName, 'u64'>>
  feesTaken: ToJSON<VecMap<TypeName, 'u64'>>
  takenCx: string
  takenCy: string
  deltaL: string
  deltaX: string
  deltaY: string
  xRepaid: string
  yRepaid: string
  addedCx: string
  addedCy: string
  stashedAmmRewards: ToJSON<VecMap<TypeName, 'u64'>>
}

export type RebalanceInfoJSON = {
  $typeName: typeof RebalanceInfo.$typeName
  $typeArgs: []
} & RebalanceInfoJSONField

/** Comprehensive information about position rebalancing operations. */
export class RebalanceInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::RebalanceInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::RebalanceInfo')
    }::position_core_clmm::RebalanceInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RebalanceInfo.$typeName = RebalanceInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::RebalanceInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RebalanceInfo.$isPhantom = RebalanceInfo.$isPhantom

  /** Unique identifier for this rebalancing operation. Used for tracking and auditing. */
  readonly id: ToField<ID>
  /** ID of the position that was rebalanced */
  readonly positionId: ToField<ID>
  /** Amount of X tokens collected from AMM fees (before protocol fee deduction) */
  readonly collectedAmmFeeX: ToField<'u64'>
  /** Amount of Y tokens collected from AMM fees (before protocol fee deduction) */
  readonly collectedAmmFeeY: ToField<'u64'>
  /** Protocol-specific rewards collected from AMM (before protocol fee deduction) */
  readonly collectedAmmRewards: ToField<VecMap<TypeName, 'u64'>>
  /** Protocol fees taken from collected rewards and fees */
  readonly feesTaken: ToField<VecMap<TypeName, 'u64'>>
  /** Amount of X tokens taken from extra collateral */
  readonly takenCx: ToField<'u64'>
  /** Amount of Y tokens taken from extra collateral */
  readonly takenCy: ToField<'u64'>
  /** Liquidity added to the LP position */
  readonly deltaL: ToField<'u128'>
  /** Amount of X tokens added to LP position (corresponding to delta_l) */
  readonly deltaX: ToField<'u64'>
  /** Amount of Y tokens added to LP position (corresponding to delta_l) */
  readonly deltaY: ToField<'u64'>
  /** Amount of X debt repaid */
  readonly xRepaid: ToField<'u64'>
  /** Amount of Y debt repaid */
  readonly yRepaid: ToField<'u64'>
  /** Amount of X tokens added to extra collateral */
  readonly addedCx: ToField<'u64'>
  /** Amount of Y tokens added to extra collateral */
  readonly addedCy: ToField<'u64'>
  /** Protocol-specific rewards stashed in position for later owner withdrawal */
  readonly stashedAmmRewards: ToField<VecMap<TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: RebalanceInfoFields) {
    this.$fullTypeName = composeSuiType(
      RebalanceInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::RebalanceInfo`
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
      get typeName() {
        return RebalanceInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RebalanceInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::RebalanceInfo`
      },
      typeArgs: [] as [],
      isPhantom: RebalanceInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RebalanceInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RebalanceInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RebalanceInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RebalanceInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RebalanceInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RebalanceInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => RebalanceInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RebalanceInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => RebalanceInfo.fetch(client, id),
      new: (fields: RebalanceInfoFields) => {
        return new RebalanceInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RebalanceInfoReified {
    return RebalanceInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RebalanceInfo>> {
    return phantom(RebalanceInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RebalanceInfo>> {
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

  static get bcs(): ReturnType<typeof RebalanceInfo.instantiateBcs> {
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
        fields.collected_amm_rewards,
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
        fields.stashed_amm_rewards,
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
        item.fields.collected_amm_rewards,
      ),
      feesTaken: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), 'u64'),
        item.fields.fees_taken,
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
        item.fields.stashed_amm_rewards,
      ),
    })
  }

  static fromBcs(data: Uint8Array): RebalanceInfo {
    return RebalanceInfo.fromFields(RebalanceInfo.bcs.parse(data))
  }

  toJSONField(): RebalanceInfoJSONField {
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

  toJSON(): RebalanceInfoJSON {
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
        field.collectedAmmRewards,
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
        field.stashedAmmRewards,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): RebalanceInfo {
    if (json.$typeName !== RebalanceInfo.$typeName) {
      throw new Error(
        `not a RebalanceInfo json object: expected '${RebalanceInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RebalanceInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RebalanceInfo {
    if (!isRebalanceInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RebalanceInfo object`)
    }
    return RebalanceInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RebalanceInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RebalanceInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRebalanceInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RebalanceInfo object`)
    }
    return RebalanceInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RebalanceInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RebalanceInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRebalanceInfo(data.bcs.type)) {
        throw new Error(`object at is not a RebalanceInfo object`)
      }

      return RebalanceInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RebalanceInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RebalanceInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRebalanceInfo(object.type)) {
      throw new Error(`object at id ${id} is not a RebalanceInfo object`)
    }
    return RebalanceInfo.fromBcs(object.content)
  }
}

/* ============================== CollectProtocolFeesInfo =============================== */

export function isCollectProtocolFeesInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::CollectProtocolFeesInfo')
    }::position_core_clmm::CollectProtocolFeesInfo` + '<',
  )
}

export interface CollectProtocolFeesInfoFields<T extends PhantomTypeArgument> {
  /** The ID of the position from which protocol fees were collected. */
  positionId: ToField<ID>
  /** The amount of protocol fees collected (in token T). */
  amount: ToField<'u64'>
}

export type CollectProtocolFeesInfoReified<T extends PhantomTypeArgument> = Reified<
  CollectProtocolFeesInfo<T>,
  CollectProtocolFeesInfoFields<T>
>

export type CollectProtocolFeesInfoJSONField<T extends PhantomTypeArgument> = {
  positionId: string
  amount: string
}

export type CollectProtocolFeesInfoJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof CollectProtocolFeesInfo.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & CollectProtocolFeesInfoJSONField<T>

/** Event emitted when protocol fees are collected from a position for a specific token type. */
export class CollectProtocolFeesInfo<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::CollectProtocolFeesInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::CollectProtocolFeesInfo')
    }::position_core_clmm::CollectProtocolFeesInfo` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof CollectProtocolFeesInfo.$typeName = CollectProtocolFeesInfo.$typeName
  readonly $fullTypeName:
    `${string}::position_core_clmm::CollectProtocolFeesInfo<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof CollectProtocolFeesInfo.$isPhantom =
    CollectProtocolFeesInfo.$isPhantom

  /** The ID of the position from which protocol fees were collected. */
  readonly positionId: ToField<ID>
  /** The amount of protocol fees collected (in token T). */
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: CollectProtocolFeesInfoFields<T>) {
    this.$fullTypeName = composeSuiType(
      CollectProtocolFeesInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::CollectProtocolFeesInfo<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.amount = fields.amount
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): CollectProtocolFeesInfoReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = CollectProtocolFeesInfo.bcs
    return {
      get typeName() {
        return CollectProtocolFeesInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CollectProtocolFeesInfo.$typeName,
          ...[extractType(T)],
        ) as `${string}::position_core_clmm::CollectProtocolFeesInfo<${PhantomToTypeStr<
          ToPhantomTypeArgument<T>
        >}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: CollectProtocolFeesInfo.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => CollectProtocolFeesInfo.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CollectProtocolFeesInfo.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => CollectProtocolFeesInfo.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollectProtocolFeesInfo.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => CollectProtocolFeesInfo.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CollectProtocolFeesInfo.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CollectProtocolFeesInfo.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CollectProtocolFeesInfo.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CollectProtocolFeesInfo.fetch(client, T, id),
      new: (fields: CollectProtocolFeesInfoFields<ToPhantomTypeArgument<T>>) => {
        return new CollectProtocolFeesInfo([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof CollectProtocolFeesInfo.reified {
    return CollectProtocolFeesInfo.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<CollectProtocolFeesInfo<ToPhantomTypeArgument<T>>>> {
    return phantom(CollectProtocolFeesInfo.reified(T))
  }

  static get p(): typeof CollectProtocolFeesInfo.phantom {
    return CollectProtocolFeesInfo.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('CollectProtocolFeesInfo', {
      position_id: ID.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollectProtocolFeesInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollectProtocolFeesInfo.instantiateBcs> {
    if (!CollectProtocolFeesInfo.cachedBcs) {
      CollectProtocolFeesInfo.cachedBcs = CollectProtocolFeesInfo.instantiateBcs()
    }
    return CollectProtocolFeesInfo.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    return CollectProtocolFeesInfo.reified(typeArg).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    return CollectProtocolFeesInfo.fromFields(typeArg, CollectProtocolFeesInfo.bcs.parse(data))
  }

  toJSONField(): CollectProtocolFeesInfoJSONField<T> {
    return {
      positionId: this.positionId,
      amount: this.amount.toString(),
    }
  }

  toJSON(): CollectProtocolFeesInfoJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    return CollectProtocolFeesInfo.reified(typeArg).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== CollectProtocolFeesInfo.$typeName) {
      throw new Error(
        `not a CollectProtocolFeesInfo json object: expected '${CollectProtocolFeesInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(CollectProtocolFeesInfo.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return CollectProtocolFeesInfo.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    if (!isCollectProtocolFeesInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CollectProtocolFeesInfo object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return CollectProtocolFeesInfo.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectProtocolFeesInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollectProtocolFeesInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CollectProtocolFeesInfo object`,
      )
    }
    return CollectProtocolFeesInfo.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectProtocolFeesInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): CollectProtocolFeesInfo<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollectProtocolFeesInfo(data.bcs.type)) {
        throw new Error(`object at is not a CollectProtocolFeesInfo object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return CollectProtocolFeesInfo.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollectProtocolFeesInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<CollectProtocolFeesInfo<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCollectProtocolFeesInfo(object.type)) {
      throw new Error(`object at id ${id} is not a CollectProtocolFeesInfo object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return CollectProtocolFeesInfo.fromBcs(typeArg, object.content)
  }
}

/* ============================== DeletedPositionCollectedFeesInfo =============================== */

export function isDeletedPositionCollectedFeesInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeletedPositionCollectedFeesInfo')
    }::position_core_clmm::DeletedPositionCollectedFeesInfo`
}

export interface DeletedPositionCollectedFeesInfoFields {
  /** The ID of the deleted position. */
  positionId: ToField<ID>
  /** Mapping from token type to amount of fees collected. */
  amounts: ToField<VecMap<TypeName, 'u64'>>
}

export type DeletedPositionCollectedFeesInfoReified = Reified<
  DeletedPositionCollectedFeesInfo,
  DeletedPositionCollectedFeesInfoFields
>

export type DeletedPositionCollectedFeesInfoJSONField = {
  positionId: string
  amounts: ToJSON<VecMap<TypeName, 'u64'>>
}

export type DeletedPositionCollectedFeesInfoJSON = {
  $typeName: typeof DeletedPositionCollectedFeesInfo.$typeName
  $typeArgs: []
} & DeletedPositionCollectedFeesInfoJSONField

/** Event emitted when the remaining fees are collected from a position that was previously deleted. */
export class DeletedPositionCollectedFeesInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::DeletedPositionCollectedFeesInfo` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::DeletedPositionCollectedFeesInfo')
    }::position_core_clmm::DeletedPositionCollectedFeesInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DeletedPositionCollectedFeesInfo.$typeName =
    DeletedPositionCollectedFeesInfo.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::DeletedPositionCollectedFeesInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DeletedPositionCollectedFeesInfo.$isPhantom =
    DeletedPositionCollectedFeesInfo.$isPhantom

  /** The ID of the deleted position. */
  readonly positionId: ToField<ID>
  /** Mapping from token type to amount of fees collected. */
  readonly amounts: ToField<VecMap<TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: DeletedPositionCollectedFeesInfoFields) {
    this.$fullTypeName = composeSuiType(
      DeletedPositionCollectedFeesInfo.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::DeletedPositionCollectedFeesInfo`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.amounts = fields.amounts
  }

  static reified(): DeletedPositionCollectedFeesInfoReified {
    const reifiedBcs = DeletedPositionCollectedFeesInfo.bcs
    return {
      get typeName() {
        return DeletedPositionCollectedFeesInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DeletedPositionCollectedFeesInfo.$typeName,
          ...[],
        ) as `${string}::position_core_clmm::DeletedPositionCollectedFeesInfo`
      },
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
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DeletedPositionCollectedFeesInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        DeletedPositionCollectedFeesInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        DeletedPositionCollectedFeesInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        DeletedPositionCollectedFeesInfo.fetch(client, id),
      new: (fields: DeletedPositionCollectedFeesInfoFields) => {
        return new DeletedPositionCollectedFeesInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DeletedPositionCollectedFeesInfoReified {
    return DeletedPositionCollectedFeesInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DeletedPositionCollectedFeesInfo>> {
    return phantom(DeletedPositionCollectedFeesInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DeletedPositionCollectedFeesInfo>> {
    return DeletedPositionCollectedFeesInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DeletedPositionCollectedFeesInfo', {
      position_id: ID.bcs,
      amounts: VecMap.bcs(TypeName.bcs, bcs.u64()),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof DeletedPositionCollectedFeesInfo.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof DeletedPositionCollectedFeesInfo.instantiateBcs> {
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
        item.fields.amounts,
      ),
    })
  }

  static fromBcs(data: Uint8Array): DeletedPositionCollectedFeesInfo {
    return DeletedPositionCollectedFeesInfo.fromFields(
      DeletedPositionCollectedFeesInfo.bcs.parse(data),
    )
  }

  toJSONField(): DeletedPositionCollectedFeesInfoJSONField {
    return {
      positionId: this.positionId,
      amounts: this.amounts.toJSONField(),
    }
  }

  toJSON(): DeletedPositionCollectedFeesInfoJSON {
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
      throw new Error(
        `not a DeletedPositionCollectedFeesInfo json object: expected '${DeletedPositionCollectedFeesInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DeletedPositionCollectedFeesInfo.fromJSONField(json)
  }

  static fromCoreObject(
    obj: SuiClientTypes.Object<{ content: true }>,
  ): DeletedPositionCollectedFeesInfo {
    if (!isDeletedPositionCollectedFeesInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DeletedPositionCollectedFeesInfo object`)
    }
    return DeletedPositionCollectedFeesInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeletedPositionCollectedFeesInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DeletedPositionCollectedFeesInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDeletedPositionCollectedFeesInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a DeletedPositionCollectedFeesInfo object`,
      )
    }
    return DeletedPositionCollectedFeesInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DeletedPositionCollectedFeesInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DeletedPositionCollectedFeesInfo {
    if (data.bcs) {
      if (
        data.bcs.dataType !== 'moveObject' || !isDeletedPositionCollectedFeesInfo(data.bcs.type)
      ) {
        throw new Error(`object at is not a DeletedPositionCollectedFeesInfo object`)
      }

      return DeletedPositionCollectedFeesInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DeletedPositionCollectedFeesInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: ClientWithCoreApi,
    id: string,
  ): Promise<DeletedPositionCollectedFeesInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDeletedPositionCollectedFeesInfo(object.type)) {
      throw new Error(`object at id ${id} is not a DeletedPositionCollectedFeesInfo object`)
    }
    return DeletedPositionCollectedFeesInfo.fromBcs(object.content)
  }
}

/* ============================== BadDebtRepaid =============================== */

export function isBadDebtRepaid(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::BadDebtRepaid')
    }::position_core_clmm::BadDebtRepaid` + '<',
  )
}

export interface BadDebtRepaidFields<ST extends PhantomTypeArgument> {
  /** The ID of the position for which bad debt was repaid. */
  positionId: ToField<ID>
  /** The number of debt shares repaid. */
  sharesRepaid: ToField<'u128'>
  /** The amount of underlying balance repaid. */
  balanceRepaid: ToField<'u64'>
}

export type BadDebtRepaidReified<ST extends PhantomTypeArgument> = Reified<
  BadDebtRepaid<ST>,
  BadDebtRepaidFields<ST>
>

export type BadDebtRepaidJSONField<ST extends PhantomTypeArgument> = {
  positionId: string
  sharesRepaid: string
  balanceRepaid: string
}

export type BadDebtRepaidJSON<ST extends PhantomTypeArgument> = {
  $typeName: typeof BadDebtRepaid.$typeName
  $typeArgs: [PhantomToTypeStr<ST>]
} & BadDebtRepaidJSONField<ST>

/** Event emitted when bad debt is repaid for a position. */
export class BadDebtRepaid<ST extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::position_core_clmm::BadDebtRepaid` {
    return `${
      getTypeOrigin('kai-leverage', 'position_core_clmm::BadDebtRepaid')
    }::position_core_clmm::BadDebtRepaid` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof BadDebtRepaid.$typeName = BadDebtRepaid.$typeName
  readonly $fullTypeName: `${string}::position_core_clmm::BadDebtRepaid<${PhantomToTypeStr<ST>}>`
  readonly $typeArgs: [PhantomToTypeStr<ST>]
  readonly $isPhantom: typeof BadDebtRepaid.$isPhantom = BadDebtRepaid.$isPhantom

  /** The ID of the position for which bad debt was repaid. */
  readonly positionId: ToField<ID>
  /** The number of debt shares repaid. */
  readonly sharesRepaid: ToField<'u128'>
  /** The amount of underlying balance repaid. */
  readonly balanceRepaid: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<ST>], fields: BadDebtRepaidFields<ST>) {
    this.$fullTypeName = composeSuiType(
      BadDebtRepaid.$typeName,
      ...typeArgs,
    ) as `${string}::position_core_clmm::BadDebtRepaid<${PhantomToTypeStr<ST>}>`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.sharesRepaid = fields.sharesRepaid
    this.balanceRepaid = fields.balanceRepaid
  }

  static reified<ST extends PhantomReified<PhantomTypeArgument>>(
    ST: ST,
  ): BadDebtRepaidReified<ToPhantomTypeArgument<ST>> {
    const reifiedBcs = BadDebtRepaid.bcs
    return {
      get typeName() {
        return BadDebtRepaid.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BadDebtRepaid.$typeName,
          ...[extractType(ST)],
        ) as `${string}::position_core_clmm::BadDebtRepaid<${PhantomToTypeStr<
          ToPhantomTypeArgument<ST>
        >}>`
      },
      get typeArgs() {
        return [extractType(ST)] as [PhantomToTypeStr<ToPhantomTypeArgument<ST>>]
      },
      isPhantom: BadDebtRepaid.$isPhantom,
      reifiedTypeArgs: [ST],
      fromFields: (fields: Record<string, any>) => BadDebtRepaid.fromFields(ST, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BadDebtRepaid.fromFieldsWithTypes(ST, item),
      fromBcs: (data: Uint8Array) => BadDebtRepaid.fromFields(ST, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BadDebtRepaid.fromJSONField(ST, field),
      fromJSON: (json: Record<string, any>) => BadDebtRepaid.fromJSON(ST, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BadDebtRepaid.fromCoreObject(ST, obj),
      fromSuiParsedData: (content: SuiParsedData) => BadDebtRepaid.fromSuiParsedData(ST, content),
      fromSuiObjectData: (content: SuiObjectData) => BadDebtRepaid.fromSuiObjectData(ST, content),
      fetch: async (client: ClientWithCoreApi, id: string) => BadDebtRepaid.fetch(client, ST, id),
      new: (fields: BadDebtRepaidFields<ToPhantomTypeArgument<ST>>) => {
        return new BadDebtRepaid([extractType(ST)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof BadDebtRepaid.reified {
    return BadDebtRepaid.reified
  }

  static phantom<ST extends PhantomReified<PhantomTypeArgument>>(
    ST: ST,
  ): PhantomReified<ToTypeStr<BadDebtRepaid<ToPhantomTypeArgument<ST>>>> {
    return phantom(BadDebtRepaid.reified(ST))
  }

  static get p(): typeof BadDebtRepaid.phantom {
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

  static get bcs(): ReturnType<typeof BadDebtRepaid.instantiateBcs> {
    if (!BadDebtRepaid.cachedBcs) {
      BadDebtRepaid.cachedBcs = BadDebtRepaid.instantiateBcs()
    }
    return BadDebtRepaid.cachedBcs
  }

  static fromFields<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    fields: Record<string, any>,
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    return BadDebtRepaid.reified(typeArg).new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      sharesRepaid: decodeFromFields('u128', fields.shares_repaid),
      balanceRepaid: decodeFromFields('u64', fields.balance_repaid),
    })
  }

  static fromFieldsWithTypes<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    return BadDebtRepaid.fromFields(typeArg, BadDebtRepaid.bcs.parse(data))
  }

  toJSONField(): BadDebtRepaidJSONField<ST> {
    return {
      positionId: this.positionId,
      sharesRepaid: this.sharesRepaid.toString(),
      balanceRepaid: this.balanceRepaid.toString(),
    }
  }

  toJSON(): BadDebtRepaidJSON<ST> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    field: any,
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    return BadDebtRepaid.reified(typeArg).new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      sharesRepaid: decodeFromJSONField('u128', field.sharesRepaid),
      balanceRepaid: decodeFromJSONField('u64', field.balanceRepaid),
    })
  }

  static fromJSON<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    json: Record<string, any>,
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    if (json.$typeName !== BadDebtRepaid.$typeName) {
      throw new Error(
        `not a BadDebtRepaid json object: expected '${BadDebtRepaid.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BadDebtRepaid.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return BadDebtRepaid.fromJSONField(typeArg, json)
  }

  static fromCoreObject<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    if (!isBadDebtRepaid(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BadDebtRepaid object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return BadDebtRepaid.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BadDebtRepaid.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    content: SuiParsedData,
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBadDebtRepaid(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BadDebtRepaid object`)
    }
    return BadDebtRepaid.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BadDebtRepaid.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<ST extends PhantomReified<PhantomTypeArgument>>(
    typeArg: ST,
    data: SuiObjectData,
  ): BadDebtRepaid<ToPhantomTypeArgument<ST>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBadDebtRepaid(data.bcs.type)) {
        throw new Error(`object at is not a BadDebtRepaid object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return BadDebtRepaid.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BadDebtRepaid.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<ST extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: ST,
    id: string,
  ): Promise<BadDebtRepaid<ToPhantomTypeArgument<ST>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBadDebtRepaid(object.type)) {
      throw new Error(`object at id ${id} is not a BadDebtRepaid object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return BadDebtRepaid.fromBcs(typeArg, object.content)
  }
}
