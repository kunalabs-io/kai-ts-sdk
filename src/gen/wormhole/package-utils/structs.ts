/**
 * This module implements utilities that supplement those methods implemented
 * in `sui::package`.
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
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
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { Bytes32 } from '../bytes32/structs'

/* ============================== CurrentVersion =============================== */

export function isCurrentVersion(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole', 'package_utils::CurrentVersion')
    }::package_utils::CurrentVersion`
}

export interface CurrentVersionFields {
  dummyField: ToField<'bool'>
}

export type CurrentVersionReified = Reified<CurrentVersion, CurrentVersionFields>

export type CurrentVersionJSONField = {
  dummyField: boolean
}

export type CurrentVersionJSON = {
  $typeName: typeof CurrentVersion.$typeName
  $typeArgs: []
} & CurrentVersionJSONField

/** Key for version dynamic fields. */
export class CurrentVersion implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::package_utils::CurrentVersion` = `${
    getTypeOrigin('wormhole', 'package_utils::CurrentVersion')
  }::package_utils::CurrentVersion` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CurrentVersion.$typeName = CurrentVersion.$typeName
  readonly $fullTypeName: `${string}::package_utils::CurrentVersion`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CurrentVersion.$isPhantom = CurrentVersion.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: CurrentVersionFields) {
    this.$fullTypeName = composeSuiType(
      CurrentVersion.$typeName,
      ...typeArgs,
    ) as `${string}::package_utils::CurrentVersion`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): CurrentVersionReified {
    const reifiedBcs = CurrentVersion.bcs
    return {
      typeName: CurrentVersion.$typeName,
      fullTypeName: composeSuiType(
        CurrentVersion.$typeName,
        ...[],
      ) as `${string}::package_utils::CurrentVersion`,
      typeArgs: [] as [],
      isPhantom: CurrentVersion.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CurrentVersion.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CurrentVersion.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CurrentVersion.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CurrentVersion.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CurrentVersion.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CurrentVersion.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CurrentVersion.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => CurrentVersion.fetch(client, id),
      new: (fields: CurrentVersionFields) => {
        return new CurrentVersion([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CurrentVersionReified {
    return CurrentVersion.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CurrentVersion>> {
    return phantom(CurrentVersion.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CurrentVersion>> {
    return CurrentVersion.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CurrentVersion', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof CurrentVersion.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CurrentVersion.instantiateBcs> {
    if (!CurrentVersion.cachedBcs) {
      CurrentVersion.cachedBcs = CurrentVersion.instantiateBcs()
    }
    return CurrentVersion.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CurrentVersion {
    return CurrentVersion.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CurrentVersion {
    if (!isCurrentVersion(item.type)) {
      throw new Error('not a CurrentVersion type')
    }

    return CurrentVersion.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): CurrentVersion {
    return CurrentVersion.fromFields(CurrentVersion.bcs.parse(data))
  }

  toJSONField(): CurrentVersionJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): CurrentVersionJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CurrentVersion {
    return CurrentVersion.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): CurrentVersion {
    if (json.$typeName !== CurrentVersion.$typeName) {
      throw new Error(
        `not a CurrentVersion json object: expected '${CurrentVersion.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CurrentVersion.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CurrentVersion {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCurrentVersion(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CurrentVersion object`)
    }
    return CurrentVersion.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CurrentVersion {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCurrentVersion(data.bcs.type)) {
        throw new Error(`object at is not a CurrentVersion object`)
      }

      return CurrentVersion.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CurrentVersion.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<CurrentVersion> {
    const res = await fetchObjectBcs(client, id)
    if (!isCurrentVersion(res.type)) {
      throw new Error(`object at id ${id} is not a CurrentVersion object`)
    }

    return CurrentVersion.fromBcs(res.bcsBytes)
  }
}

/* ============================== CurrentPackage =============================== */

export function isCurrentPackage(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole', 'package_utils::CurrentPackage')
    }::package_utils::CurrentPackage`
}

export interface CurrentPackageFields {
  dummyField: ToField<'bool'>
}

export type CurrentPackageReified = Reified<CurrentPackage, CurrentPackageFields>

export type CurrentPackageJSONField = {
  dummyField: boolean
}

export type CurrentPackageJSON = {
  $typeName: typeof CurrentPackage.$typeName
  $typeArgs: []
} & CurrentPackageJSONField

/**
 * Key for dynamic field reflecting current package info. Its value is
 * `PackageInfo`.
 */
export class CurrentPackage implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::package_utils::CurrentPackage` = `${
    getTypeOrigin('wormhole', 'package_utils::CurrentPackage')
  }::package_utils::CurrentPackage` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CurrentPackage.$typeName = CurrentPackage.$typeName
  readonly $fullTypeName: `${string}::package_utils::CurrentPackage`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CurrentPackage.$isPhantom = CurrentPackage.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: CurrentPackageFields) {
    this.$fullTypeName = composeSuiType(
      CurrentPackage.$typeName,
      ...typeArgs,
    ) as `${string}::package_utils::CurrentPackage`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): CurrentPackageReified {
    const reifiedBcs = CurrentPackage.bcs
    return {
      typeName: CurrentPackage.$typeName,
      fullTypeName: composeSuiType(
        CurrentPackage.$typeName,
        ...[],
      ) as `${string}::package_utils::CurrentPackage`,
      typeArgs: [] as [],
      isPhantom: CurrentPackage.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CurrentPackage.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CurrentPackage.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CurrentPackage.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CurrentPackage.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CurrentPackage.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CurrentPackage.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CurrentPackage.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => CurrentPackage.fetch(client, id),
      new: (fields: CurrentPackageFields) => {
        return new CurrentPackage([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CurrentPackageReified {
    return CurrentPackage.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CurrentPackage>> {
    return phantom(CurrentPackage.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CurrentPackage>> {
    return CurrentPackage.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CurrentPackage', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof CurrentPackage.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CurrentPackage.instantiateBcs> {
    if (!CurrentPackage.cachedBcs) {
      CurrentPackage.cachedBcs = CurrentPackage.instantiateBcs()
    }
    return CurrentPackage.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CurrentPackage {
    return CurrentPackage.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CurrentPackage {
    if (!isCurrentPackage(item.type)) {
      throw new Error('not a CurrentPackage type')
    }

    return CurrentPackage.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): CurrentPackage {
    return CurrentPackage.fromFields(CurrentPackage.bcs.parse(data))
  }

  toJSONField(): CurrentPackageJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): CurrentPackageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CurrentPackage {
    return CurrentPackage.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): CurrentPackage {
    if (json.$typeName !== CurrentPackage.$typeName) {
      throw new Error(
        `not a CurrentPackage json object: expected '${CurrentPackage.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CurrentPackage.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CurrentPackage {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCurrentPackage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CurrentPackage object`)
    }
    return CurrentPackage.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CurrentPackage {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCurrentPackage(data.bcs.type)) {
        throw new Error(`object at is not a CurrentPackage object`)
      }

      return CurrentPackage.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CurrentPackage.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<CurrentPackage> {
    const res = await fetchObjectBcs(client, id)
    if (!isCurrentPackage(res.type)) {
      throw new Error(`object at id ${id} is not a CurrentPackage object`)
    }

    return CurrentPackage.fromBcs(res.bcsBytes)
  }
}

/* ============================== PendingPackage =============================== */

export function isPendingPackage(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole', 'package_utils::PendingPackage')
    }::package_utils::PendingPackage`
}

export interface PendingPackageFields {
  dummyField: ToField<'bool'>
}

export type PendingPackageReified = Reified<PendingPackage, PendingPackageFields>

export type PendingPackageJSONField = {
  dummyField: boolean
}

export type PendingPackageJSON = {
  $typeName: typeof PendingPackage.$typeName
  $typeArgs: []
} & PendingPackageJSONField

export class PendingPackage implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::package_utils::PendingPackage` = `${
    getTypeOrigin('wormhole', 'package_utils::PendingPackage')
  }::package_utils::PendingPackage` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PendingPackage.$typeName = PendingPackage.$typeName
  readonly $fullTypeName: `${string}::package_utils::PendingPackage`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PendingPackage.$isPhantom = PendingPackage.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: PendingPackageFields) {
    this.$fullTypeName = composeSuiType(
      PendingPackage.$typeName,
      ...typeArgs,
    ) as `${string}::package_utils::PendingPackage`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): PendingPackageReified {
    const reifiedBcs = PendingPackage.bcs
    return {
      typeName: PendingPackage.$typeName,
      fullTypeName: composeSuiType(
        PendingPackage.$typeName,
        ...[],
      ) as `${string}::package_utils::PendingPackage`,
      typeArgs: [] as [],
      isPhantom: PendingPackage.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PendingPackage.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PendingPackage.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PendingPackage.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PendingPackage.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PendingPackage.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PendingPackage.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PendingPackage.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PendingPackage.fetch(client, id),
      new: (fields: PendingPackageFields) => {
        return new PendingPackage([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PendingPackageReified {
    return PendingPackage.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PendingPackage>> {
    return phantom(PendingPackage.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PendingPackage>> {
    return PendingPackage.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PendingPackage', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof PendingPackage.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PendingPackage.instantiateBcs> {
    if (!PendingPackage.cachedBcs) {
      PendingPackage.cachedBcs = PendingPackage.instantiateBcs()
    }
    return PendingPackage.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PendingPackage {
    return PendingPackage.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PendingPackage {
    if (!isPendingPackage(item.type)) {
      throw new Error('not a PendingPackage type')
    }

    return PendingPackage.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): PendingPackage {
    return PendingPackage.fromFields(PendingPackage.bcs.parse(data))
  }

  toJSONField(): PendingPackageJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): PendingPackageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PendingPackage {
    return PendingPackage.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): PendingPackage {
    if (json.$typeName !== PendingPackage.$typeName) {
      throw new Error(
        `not a PendingPackage json object: expected '${PendingPackage.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PendingPackage.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PendingPackage {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPendingPackage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PendingPackage object`)
    }
    return PendingPackage.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PendingPackage {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPendingPackage(data.bcs.type)) {
        throw new Error(`object at is not a PendingPackage object`)
      }

      return PendingPackage.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PendingPackage.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PendingPackage> {
    const res = await fetchObjectBcs(client, id)
    if (!isPendingPackage(res.type)) {
      throw new Error(`object at id ${id} is not a PendingPackage object`)
    }

    return PendingPackage.fromBcs(res.bcsBytes)
  }
}

/* ============================== PackageInfo =============================== */

export function isPackageInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('wormhole', 'package_utils::PackageInfo')}::package_utils::PackageInfo`
}

export interface PackageInfoFields {
  package: ToField<ID>
  digest: ToField<Bytes32>
}

export type PackageInfoReified = Reified<PackageInfo, PackageInfoFields>

export type PackageInfoJSONField = {
  package: string
  digest: ToJSON<Bytes32>
}

export type PackageInfoJSON = {
  $typeName: typeof PackageInfo.$typeName
  $typeArgs: []
} & PackageInfoJSONField

export class PackageInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::package_utils::PackageInfo` = `${
    getTypeOrigin('wormhole', 'package_utils::PackageInfo')
  }::package_utils::PackageInfo` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PackageInfo.$typeName = PackageInfo.$typeName
  readonly $fullTypeName: `${string}::package_utils::PackageInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PackageInfo.$isPhantom = PackageInfo.$isPhantom

  readonly package: ToField<ID>
  readonly digest: ToField<Bytes32>

  private constructor(typeArgs: [], fields: PackageInfoFields) {
    this.$fullTypeName = composeSuiType(
      PackageInfo.$typeName,
      ...typeArgs,
    ) as `${string}::package_utils::PackageInfo`
    this.$typeArgs = typeArgs

    this.package = fields.package
    this.digest = fields.digest
  }

  static reified(): PackageInfoReified {
    const reifiedBcs = PackageInfo.bcs
    return {
      typeName: PackageInfo.$typeName,
      fullTypeName: composeSuiType(
        PackageInfo.$typeName,
        ...[],
      ) as `${string}::package_utils::PackageInfo`,
      typeArgs: [] as [],
      isPhantom: PackageInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PackageInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PackageInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PackageInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PackageInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PackageInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PackageInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PackageInfo.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => PackageInfo.fetch(client, id),
      new: (fields: PackageInfoFields) => {
        return new PackageInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PackageInfoReified {
    return PackageInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PackageInfo>> {
    return phantom(PackageInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PackageInfo>> {
    return PackageInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PackageInfo', {
      package: ID.bcs,
      digest: Bytes32.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PackageInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PackageInfo.instantiateBcs> {
    if (!PackageInfo.cachedBcs) {
      PackageInfo.cachedBcs = PackageInfo.instantiateBcs()
    }
    return PackageInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PackageInfo {
    return PackageInfo.reified().new({
      package: decodeFromFields(ID.reified(), fields.package),
      digest: decodeFromFields(Bytes32.reified(), fields.digest),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PackageInfo {
    if (!isPackageInfo(item.type)) {
      throw new Error('not a PackageInfo type')
    }

    return PackageInfo.reified().new({
      package: decodeFromFieldsWithTypes(ID.reified(), item.fields.package),
      digest: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.digest),
    })
  }

  static fromBcs(data: Uint8Array): PackageInfo {
    return PackageInfo.fromFields(PackageInfo.bcs.parse(data))
  }

  toJSONField(): PackageInfoJSONField {
    return {
      package: this.package,
      digest: this.digest.toJSONField(),
    }
  }

  toJSON(): PackageInfoJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PackageInfo {
    return PackageInfo.reified().new({
      package: decodeFromJSONField(ID.reified(), field.package),
      digest: decodeFromJSONField(Bytes32.reified(), field.digest),
    })
  }

  static fromJSON(json: Record<string, any>): PackageInfo {
    if (json.$typeName !== PackageInfo.$typeName) {
      throw new Error(
        `not a PackageInfo json object: expected '${PackageInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PackageInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PackageInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPackageInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PackageInfo object`)
    }
    return PackageInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PackageInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPackageInfo(data.bcs.type)) {
        throw new Error(`object at is not a PackageInfo object`)
      }

      return PackageInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PackageInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PackageInfo> {
    const res = await fetchObjectBcs(client, id)
    if (!isPackageInfo(res.type)) {
      throw new Error(`object at id ${id} is not a PackageInfo object`)
    }

    return PackageInfo.fromBcs(res.bcsBytes)
  }
}
