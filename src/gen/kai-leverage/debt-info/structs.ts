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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { TypeName } from '../../move-stdlib/type-name/structs'
import { ID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== DebtInfoEntry =============================== */

export function isDebtInfoEntry(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::debt_info::DebtInfoEntry`
}

export interface DebtInfoEntryFields {
  supplyX64: ToField<'u128'>
  liabilityValueX64: ToField<'u128'>
}

export type DebtInfoEntryReified = Reified<DebtInfoEntry, DebtInfoEntryFields>

export class DebtInfoEntry implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt_info::DebtInfoEntry`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DebtInfoEntry.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt_info::DebtInfoEntry`
  readonly $typeArgs: []
  readonly $isPhantom = DebtInfoEntry.$isPhantom

  readonly supplyX64: ToField<'u128'>
  readonly liabilityValueX64: ToField<'u128'>

  private constructor(typeArgs: [], fields: DebtInfoEntryFields) {
    this.$fullTypeName = composeSuiType(
      DebtInfoEntry.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt_info::DebtInfoEntry`
    this.$typeArgs = typeArgs

    this.supplyX64 = fields.supplyX64
    this.liabilityValueX64 = fields.liabilityValueX64
  }

  static reified(): DebtInfoEntryReified {
    const reifiedBcs = DebtInfoEntry.bcs
    return {
      typeName: DebtInfoEntry.$typeName,
      fullTypeName: composeSuiType(
        DebtInfoEntry.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::debt_info::DebtInfoEntry`,
      typeArgs: [] as [],
      isPhantom: DebtInfoEntry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DebtInfoEntry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtInfoEntry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DebtInfoEntry.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DebtInfoEntry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DebtInfoEntry.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DebtInfoEntry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DebtInfoEntry.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DebtInfoEntry.fetch(client, id),
      new: (fields: DebtInfoEntryFields) => {
        return new DebtInfoEntry([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DebtInfoEntry.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DebtInfoEntry>> {
    return phantom(DebtInfoEntry.reified())
  }
  static get p() {
    return DebtInfoEntry.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DebtInfoEntry', {
      supply_x64: bcs.u128(),
      liability_value_x64: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof DebtInfoEntry.instantiateBcs> | null = null

  static get bcs() {
    if (!DebtInfoEntry.cachedBcs) {
      DebtInfoEntry.cachedBcs = DebtInfoEntry.instantiateBcs()
    }
    return DebtInfoEntry.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DebtInfoEntry {
    return DebtInfoEntry.reified().new({
      supplyX64: decodeFromFields('u128', fields.supply_x64),
      liabilityValueX64: decodeFromFields('u128', fields.liability_value_x64),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DebtInfoEntry {
    if (!isDebtInfoEntry(item.type)) {
      throw new Error('not a DebtInfoEntry type')
    }

    return DebtInfoEntry.reified().new({
      supplyX64: decodeFromFieldsWithTypes('u128', item.fields.supply_x64),
      liabilityValueX64: decodeFromFieldsWithTypes('u128', item.fields.liability_value_x64),
    })
  }

  static fromBcs(data: Uint8Array): DebtInfoEntry {
    return DebtInfoEntry.fromFields(DebtInfoEntry.bcs.parse(data))
  }

  toJSONField() {
    return {
      supplyX64: this.supplyX64.toString(),
      liabilityValueX64: this.liabilityValueX64.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DebtInfoEntry {
    return DebtInfoEntry.reified().new({
      supplyX64: decodeFromJSONField('u128', field.supplyX64),
      liabilityValueX64: decodeFromJSONField('u128', field.liabilityValueX64),
    })
  }

  static fromJSON(json: Record<string, any>): DebtInfoEntry {
    if (json.$typeName !== DebtInfoEntry.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DebtInfoEntry.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DebtInfoEntry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtInfoEntry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtInfoEntry object`)
    }
    return DebtInfoEntry.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DebtInfoEntry {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtInfoEntry(data.bcs.type)) {
        throw new Error(`object at is not a DebtInfoEntry object`)
      }

      return DebtInfoEntry.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtInfoEntry.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DebtInfoEntry> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DebtInfoEntry object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDebtInfoEntry(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DebtInfoEntry object`)
    }

    return DebtInfoEntry.fromSuiObjectData(res.data)
  }
}

/* ============================== DebtInfo =============================== */

export function isDebtInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::debt_info::DebtInfo`
}

export interface DebtInfoFields {
  facilId: ToField<ID>
  map: ToField<VecMap<TypeName, DebtInfoEntry>>
}

export type DebtInfoReified = Reified<DebtInfo, DebtInfoFields>

export class DebtInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt_info::DebtInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = DebtInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt_info::DebtInfo`
  readonly $typeArgs: []
  readonly $isPhantom = DebtInfo.$isPhantom

  readonly facilId: ToField<ID>
  readonly map: ToField<VecMap<TypeName, DebtInfoEntry>>

  private constructor(typeArgs: [], fields: DebtInfoFields) {
    this.$fullTypeName = composeSuiType(
      DebtInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt_info::DebtInfo`
    this.$typeArgs = typeArgs

    this.facilId = fields.facilId
    this.map = fields.map
  }

  static reified(): DebtInfoReified {
    const reifiedBcs = DebtInfo.bcs
    return {
      typeName: DebtInfo.$typeName,
      fullTypeName: composeSuiType(
        DebtInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::debt_info::DebtInfo`,
      typeArgs: [] as [],
      isPhantom: DebtInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DebtInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DebtInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DebtInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DebtInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DebtInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => DebtInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DebtInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => DebtInfo.fetch(client, id),
      new: (fields: DebtInfoFields) => {
        return new DebtInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return DebtInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DebtInfo>> {
    return phantom(DebtInfo.reified())
  }
  static get p() {
    return DebtInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DebtInfo', {
      facil_id: ID.bcs,
      map: VecMap.bcs(TypeName.bcs, DebtInfoEntry.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof DebtInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!DebtInfo.cachedBcs) {
      DebtInfo.cachedBcs = DebtInfo.instantiateBcs()
    }
    return DebtInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DebtInfo {
    return DebtInfo.reified().new({
      facilId: decodeFromFields(ID.reified(), fields.facil_id),
      map: decodeFromFields(
        VecMap.reified(TypeName.reified(), DebtInfoEntry.reified()),
        fields.map
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DebtInfo {
    if (!isDebtInfo(item.type)) {
      throw new Error('not a DebtInfo type')
    }

    return DebtInfo.reified().new({
      facilId: decodeFromFieldsWithTypes(ID.reified(), item.fields.facil_id),
      map: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), DebtInfoEntry.reified()),
        item.fields.map
      ),
    })
  }

  static fromBcs(data: Uint8Array): DebtInfo {
    return DebtInfo.fromFields(DebtInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      facilId: this.facilId,
      map: this.map.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DebtInfo {
    return DebtInfo.reified().new({
      facilId: decodeFromJSONField(ID.reified(), field.facilId),
      map: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), DebtInfoEntry.reified()),
        field.map
      ),
    })
  }

  static fromJSON(json: Record<string, any>): DebtInfo {
    if (json.$typeName !== DebtInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return DebtInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): DebtInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebtInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DebtInfo object`)
    }
    return DebtInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): DebtInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebtInfo(data.bcs.type)) {
        throw new Error(`object at is not a DebtInfo object`)
      }

      return DebtInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DebtInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<DebtInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching DebtInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isDebtInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a DebtInfo object`)
    }

    return DebtInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== ValidatedDebtInfo =============================== */

export function isValidatedDebtInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::debt_info::ValidatedDebtInfo`
}

export interface ValidatedDebtInfoFields {
  map: ToField<VecMap<TypeName, DebtInfoEntry>>
}

export type ValidatedDebtInfoReified = Reified<ValidatedDebtInfo, ValidatedDebtInfoFields>

export class ValidatedDebtInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::debt_info::ValidatedDebtInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ValidatedDebtInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::debt_info::ValidatedDebtInfo`
  readonly $typeArgs: []
  readonly $isPhantom = ValidatedDebtInfo.$isPhantom

  readonly map: ToField<VecMap<TypeName, DebtInfoEntry>>

  private constructor(typeArgs: [], fields: ValidatedDebtInfoFields) {
    this.$fullTypeName = composeSuiType(
      ValidatedDebtInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::debt_info::ValidatedDebtInfo`
    this.$typeArgs = typeArgs

    this.map = fields.map
  }

  static reified(): ValidatedDebtInfoReified {
    const reifiedBcs = ValidatedDebtInfo.bcs
    return {
      typeName: ValidatedDebtInfo.$typeName,
      fullTypeName: composeSuiType(
        ValidatedDebtInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::debt_info::ValidatedDebtInfo`,
      typeArgs: [] as [],
      isPhantom: ValidatedDebtInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ValidatedDebtInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ValidatedDebtInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ValidatedDebtInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ValidatedDebtInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ValidatedDebtInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ValidatedDebtInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ValidatedDebtInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ValidatedDebtInfo.fetch(client, id),
      new: (fields: ValidatedDebtInfoFields) => {
        return new ValidatedDebtInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ValidatedDebtInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ValidatedDebtInfo>> {
    return phantom(ValidatedDebtInfo.reified())
  }
  static get p() {
    return ValidatedDebtInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ValidatedDebtInfo', {
      map: VecMap.bcs(TypeName.bcs, DebtInfoEntry.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof ValidatedDebtInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!ValidatedDebtInfo.cachedBcs) {
      ValidatedDebtInfo.cachedBcs = ValidatedDebtInfo.instantiateBcs()
    }
    return ValidatedDebtInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ValidatedDebtInfo {
    return ValidatedDebtInfo.reified().new({
      map: decodeFromFields(
        VecMap.reified(TypeName.reified(), DebtInfoEntry.reified()),
        fields.map
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ValidatedDebtInfo {
    if (!isValidatedDebtInfo(item.type)) {
      throw new Error('not a ValidatedDebtInfo type')
    }

    return ValidatedDebtInfo.reified().new({
      map: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), DebtInfoEntry.reified()),
        item.fields.map
      ),
    })
  }

  static fromBcs(data: Uint8Array): ValidatedDebtInfo {
    return ValidatedDebtInfo.fromFields(ValidatedDebtInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      map: this.map.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ValidatedDebtInfo {
    return ValidatedDebtInfo.reified().new({
      map: decodeFromJSONField(
        VecMap.reified(TypeName.reified(), DebtInfoEntry.reified()),
        field.map
      ),
    })
  }

  static fromJSON(json: Record<string, any>): ValidatedDebtInfo {
    if (json.$typeName !== ValidatedDebtInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ValidatedDebtInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ValidatedDebtInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isValidatedDebtInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ValidatedDebtInfo object`)
    }
    return ValidatedDebtInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ValidatedDebtInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isValidatedDebtInfo(data.bcs.type)) {
        throw new Error(`object at is not a ValidatedDebtInfo object`)
      }

      return ValidatedDebtInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ValidatedDebtInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ValidatedDebtInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ValidatedDebtInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isValidatedDebtInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ValidatedDebtInfo object`)
    }

    return ValidatedDebtInfo.fromSuiObjectData(res.data)
  }
}
