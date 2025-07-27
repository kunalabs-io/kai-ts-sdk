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
import { PriceInfo } from '../../pyth/price-info/structs'
import { ID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== PythPriceInfo =============================== */

export function isPythPriceInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pyth::PythPriceInfo`
}

export interface PythPriceInfoFields {
  pioMap: ToField<VecMap<ID, PriceInfo>>
  currentTsSec: ToField<'u64'>
  maxAgeSecs: ToField<'u64'>
}

export type PythPriceInfoReified = Reified<PythPriceInfo, PythPriceInfoFields>

export class PythPriceInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pyth::PythPriceInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PythPriceInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pyth::PythPriceInfo`
  readonly $typeArgs: []
  readonly $isPhantom = PythPriceInfo.$isPhantom

  readonly pioMap: ToField<VecMap<ID, PriceInfo>>
  readonly currentTsSec: ToField<'u64'>
  readonly maxAgeSecs: ToField<'u64'>

  private constructor(typeArgs: [], fields: PythPriceInfoFields) {
    this.$fullTypeName = composeSuiType(
      PythPriceInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pyth::PythPriceInfo`
    this.$typeArgs = typeArgs

    this.pioMap = fields.pioMap
    this.currentTsSec = fields.currentTsSec
    this.maxAgeSecs = fields.maxAgeSecs
  }

  static reified(): PythPriceInfoReified {
    const reifiedBcs = PythPriceInfo.bcs
    return {
      typeName: PythPriceInfo.$typeName,
      fullTypeName: composeSuiType(
        PythPriceInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pyth::PythPriceInfo`,
      typeArgs: [] as [],
      isPhantom: PythPriceInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PythPriceInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PythPriceInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PythPriceInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PythPriceInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PythPriceInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PythPriceInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PythPriceInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PythPriceInfo.fetch(client, id),
      new: (fields: PythPriceInfoFields) => {
        return new PythPriceInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PythPriceInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PythPriceInfo>> {
    return phantom(PythPriceInfo.reified())
  }
  static get p() {
    return PythPriceInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PythPriceInfo', {
      pio_map: VecMap.bcs(ID.bcs, PriceInfo.bcs),
      current_ts_sec: bcs.u64(),
      max_age_secs: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PythPriceInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!PythPriceInfo.cachedBcs) {
      PythPriceInfo.cachedBcs = PythPriceInfo.instantiateBcs()
    }
    return PythPriceInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PythPriceInfo {
    return PythPriceInfo.reified().new({
      pioMap: decodeFromFields(VecMap.reified(ID.reified(), PriceInfo.reified()), fields.pio_map),
      currentTsSec: decodeFromFields('u64', fields.current_ts_sec),
      maxAgeSecs: decodeFromFields('u64', fields.max_age_secs),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PythPriceInfo {
    if (!isPythPriceInfo(item.type)) {
      throw new Error('not a PythPriceInfo type')
    }

    return PythPriceInfo.reified().new({
      pioMap: decodeFromFieldsWithTypes(
        VecMap.reified(ID.reified(), PriceInfo.reified()),
        item.fields.pio_map
      ),
      currentTsSec: decodeFromFieldsWithTypes('u64', item.fields.current_ts_sec),
      maxAgeSecs: decodeFromFieldsWithTypes('u64', item.fields.max_age_secs),
    })
  }

  static fromBcs(data: Uint8Array): PythPriceInfo {
    return PythPriceInfo.fromFields(PythPriceInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      pioMap: this.pioMap.toJSONField(),
      currentTsSec: this.currentTsSec.toString(),
      maxAgeSecs: this.maxAgeSecs.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PythPriceInfo {
    return PythPriceInfo.reified().new({
      pioMap: decodeFromJSONField(VecMap.reified(ID.reified(), PriceInfo.reified()), field.pioMap),
      currentTsSec: decodeFromJSONField('u64', field.currentTsSec),
      maxAgeSecs: decodeFromJSONField('u64', field.maxAgeSecs),
    })
  }

  static fromJSON(json: Record<string, any>): PythPriceInfo {
    if (json.$typeName !== PythPriceInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PythPriceInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PythPriceInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPythPriceInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PythPriceInfo object`)
    }
    return PythPriceInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PythPriceInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPythPriceInfo(data.bcs.type)) {
        throw new Error(`object at is not a PythPriceInfo object`)
      }

      return PythPriceInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PythPriceInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PythPriceInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PythPriceInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPythPriceInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PythPriceInfo object`)
    }

    return PythPriceInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== ValidatedPythPriceInfo =============================== */

export function isValidatedPythPriceInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pyth::ValidatedPythPriceInfo`
}

export interface ValidatedPythPriceInfoFields {
  map: ToField<VecMap<TypeName, PriceInfo>>
  currentTsSec: ToField<'u64'>
  maxAgeSecs: ToField<'u64'>
}

export type ValidatedPythPriceInfoReified = Reified<
  ValidatedPythPriceInfo,
  ValidatedPythPriceInfoFields
>

export class ValidatedPythPriceInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pyth::ValidatedPythPriceInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ValidatedPythPriceInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pyth::ValidatedPythPriceInfo`
  readonly $typeArgs: []
  readonly $isPhantom = ValidatedPythPriceInfo.$isPhantom

  readonly map: ToField<VecMap<TypeName, PriceInfo>>
  readonly currentTsSec: ToField<'u64'>
  readonly maxAgeSecs: ToField<'u64'>

  private constructor(typeArgs: [], fields: ValidatedPythPriceInfoFields) {
    this.$fullTypeName = composeSuiType(
      ValidatedPythPriceInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pyth::ValidatedPythPriceInfo`
    this.$typeArgs = typeArgs

    this.map = fields.map
    this.currentTsSec = fields.currentTsSec
    this.maxAgeSecs = fields.maxAgeSecs
  }

  static reified(): ValidatedPythPriceInfoReified {
    const reifiedBcs = ValidatedPythPriceInfo.bcs
    return {
      typeName: ValidatedPythPriceInfo.$typeName,
      fullTypeName: composeSuiType(
        ValidatedPythPriceInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pyth::ValidatedPythPriceInfo`,
      typeArgs: [] as [],
      isPhantom: ValidatedPythPriceInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ValidatedPythPriceInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ValidatedPythPriceInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ValidatedPythPriceInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ValidatedPythPriceInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ValidatedPythPriceInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ValidatedPythPriceInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ValidatedPythPriceInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ValidatedPythPriceInfo.fetch(client, id),
      new: (fields: ValidatedPythPriceInfoFields) => {
        return new ValidatedPythPriceInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ValidatedPythPriceInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ValidatedPythPriceInfo>> {
    return phantom(ValidatedPythPriceInfo.reified())
  }
  static get p() {
    return ValidatedPythPriceInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ValidatedPythPriceInfo', {
      map: VecMap.bcs(TypeName.bcs, PriceInfo.bcs),
      current_ts_sec: bcs.u64(),
      max_age_secs: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof ValidatedPythPriceInfo.instantiateBcs> | null = null

  static get bcs() {
    if (!ValidatedPythPriceInfo.cachedBcs) {
      ValidatedPythPriceInfo.cachedBcs = ValidatedPythPriceInfo.instantiateBcs()
    }
    return ValidatedPythPriceInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ValidatedPythPriceInfo {
    return ValidatedPythPriceInfo.reified().new({
      map: decodeFromFields(VecMap.reified(TypeName.reified(), PriceInfo.reified()), fields.map),
      currentTsSec: decodeFromFields('u64', fields.current_ts_sec),
      maxAgeSecs: decodeFromFields('u64', fields.max_age_secs),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ValidatedPythPriceInfo {
    if (!isValidatedPythPriceInfo(item.type)) {
      throw new Error('not a ValidatedPythPriceInfo type')
    }

    return ValidatedPythPriceInfo.reified().new({
      map: decodeFromFieldsWithTypes(
        VecMap.reified(TypeName.reified(), PriceInfo.reified()),
        item.fields.map
      ),
      currentTsSec: decodeFromFieldsWithTypes('u64', item.fields.current_ts_sec),
      maxAgeSecs: decodeFromFieldsWithTypes('u64', item.fields.max_age_secs),
    })
  }

  static fromBcs(data: Uint8Array): ValidatedPythPriceInfo {
    return ValidatedPythPriceInfo.fromFields(ValidatedPythPriceInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      map: this.map.toJSONField(),
      currentTsSec: this.currentTsSec.toString(),
      maxAgeSecs: this.maxAgeSecs.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ValidatedPythPriceInfo {
    return ValidatedPythPriceInfo.reified().new({
      map: decodeFromJSONField(VecMap.reified(TypeName.reified(), PriceInfo.reified()), field.map),
      currentTsSec: decodeFromJSONField('u64', field.currentTsSec),
      maxAgeSecs: decodeFromJSONField('u64', field.maxAgeSecs),
    })
  }

  static fromJSON(json: Record<string, any>): ValidatedPythPriceInfo {
    if (json.$typeName !== ValidatedPythPriceInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ValidatedPythPriceInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ValidatedPythPriceInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isValidatedPythPriceInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ValidatedPythPriceInfo object`
      )
    }
    return ValidatedPythPriceInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ValidatedPythPriceInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isValidatedPythPriceInfo(data.bcs.type)) {
        throw new Error(`object at is not a ValidatedPythPriceInfo object`)
      }

      return ValidatedPythPriceInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ValidatedPythPriceInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ValidatedPythPriceInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ValidatedPythPriceInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isValidatedPythPriceInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ValidatedPythPriceInfo object`)
    }

    return ValidatedPythPriceInfo.fromSuiObjectData(res.data)
  }
}
