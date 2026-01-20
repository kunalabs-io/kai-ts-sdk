/** Pyth price feed integration for Kai Leverage. */

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
import { PriceInfo } from '../../pyth/price-info/structs'
import { TypeName } from '../../std/type-name/structs'
import { ID } from '../../sui/object/structs'
import { VecMap } from '../../sui/vec-map/structs'

/* ============================== PythPriceInfo =============================== */

export function isPythPriceInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('kai-leverage', 'pyth::PythPriceInfo')}::pyth::PythPriceInfo`
}

export interface PythPriceInfoFields {
  pioMap: ToField<VecMap<ID, PriceInfo>>
  currentTsSec: ToField<'u64'>
  maxAgeSecs: ToField<'u64'>
}

export type PythPriceInfoReified = Reified<PythPriceInfo, PythPriceInfoFields>

export type PythPriceInfoJSONField = {
  pioMap: ToJSON<VecMap<ID, PriceInfo>>
  currentTsSec: string
  maxAgeSecs: string
}

export type PythPriceInfoJSON = {
  $typeName: typeof PythPriceInfo.$typeName
  $typeArgs: []
} & PythPriceInfoJSONField

/** Collection of Pyth price information objects. */
export class PythPriceInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::pyth::PythPriceInfo` = `${
    getTypeOrigin('kai-leverage', 'pyth::PythPriceInfo')
  }::pyth::PythPriceInfo` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PythPriceInfo.$typeName = PythPriceInfo.$typeName
  readonly $fullTypeName: `${string}::pyth::PythPriceInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PythPriceInfo.$isPhantom = PythPriceInfo.$isPhantom

  readonly pioMap: ToField<VecMap<ID, PriceInfo>>
  readonly currentTsSec: ToField<'u64'>
  readonly maxAgeSecs: ToField<'u64'>

  private constructor(typeArgs: [], fields: PythPriceInfoFields) {
    this.$fullTypeName = composeSuiType(
      PythPriceInfo.$typeName,
      ...typeArgs,
    ) as `${string}::pyth::PythPriceInfo`
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
        ...[],
      ) as `${string}::pyth::PythPriceInfo`,
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
      fetch: async (client: SupportedSuiClient, id: string) => PythPriceInfo.fetch(client, id),
      new: (fields: PythPriceInfoFields) => {
        return new PythPriceInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PythPriceInfoReified {
    return PythPriceInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PythPriceInfo>> {
    return phantom(PythPriceInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PythPriceInfo>> {
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

  static get bcs(): ReturnType<typeof PythPriceInfo.instantiateBcs> {
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
        item.fields.pio_map,
      ),
      currentTsSec: decodeFromFieldsWithTypes('u64', item.fields.current_ts_sec),
      maxAgeSecs: decodeFromFieldsWithTypes('u64', item.fields.max_age_secs),
    })
  }

  static fromBcs(data: Uint8Array): PythPriceInfo {
    return PythPriceInfo.fromFields(PythPriceInfo.bcs.parse(data))
  }

  toJSONField(): PythPriceInfoJSONField {
    return {
      pioMap: this.pioMap.toJSONField(),
      currentTsSec: this.currentTsSec.toString(),
      maxAgeSecs: this.maxAgeSecs.toString(),
    }
  }

  toJSON(): PythPriceInfoJSON {
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
      throw new Error(
        `not a PythPriceInfo json object: expected '${PythPriceInfo.$typeName}' but got '${json.$typeName}'`,
      )
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

      return PythPriceInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PythPriceInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<PythPriceInfo> {
    const res = await fetchObjectBcs(client, id)
    if (!isPythPriceInfo(res.type)) {
      throw new Error(`object at id ${id} is not a PythPriceInfo object`)
    }

    return PythPriceInfo.fromBcs(res.bcsBytes)
  }
}

/* ============================== ValidatedPythPriceInfo =============================== */

export function isValidatedPythPriceInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-leverage', 'pyth::ValidatedPythPriceInfo')
    }::pyth::ValidatedPythPriceInfo`
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

export type ValidatedPythPriceInfoJSONField = {
  map: ToJSON<VecMap<TypeName, PriceInfo>>
  currentTsSec: string
  maxAgeSecs: string
}

export type ValidatedPythPriceInfoJSON = {
  $typeName: typeof ValidatedPythPriceInfo.$typeName
  $typeArgs: []
} & ValidatedPythPriceInfoJSONField

/** Validated Pyth price information ready for calculations. */
export class ValidatedPythPriceInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::pyth::ValidatedPythPriceInfo` = `${
    getTypeOrigin('kai-leverage', 'pyth::ValidatedPythPriceInfo')
  }::pyth::ValidatedPythPriceInfo` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ValidatedPythPriceInfo.$typeName = ValidatedPythPriceInfo.$typeName
  readonly $fullTypeName: `${string}::pyth::ValidatedPythPriceInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ValidatedPythPriceInfo.$isPhantom = ValidatedPythPriceInfo.$isPhantom

  readonly map: ToField<VecMap<TypeName, PriceInfo>>
  readonly currentTsSec: ToField<'u64'>
  readonly maxAgeSecs: ToField<'u64'>

  private constructor(typeArgs: [], fields: ValidatedPythPriceInfoFields) {
    this.$fullTypeName = composeSuiType(
      ValidatedPythPriceInfo.$typeName,
      ...typeArgs,
    ) as `${string}::pyth::ValidatedPythPriceInfo`
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
        ...[],
      ) as `${string}::pyth::ValidatedPythPriceInfo`,
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
      fetch: async (client: SupportedSuiClient, id: string) =>
        ValidatedPythPriceInfo.fetch(client, id),
      new: (fields: ValidatedPythPriceInfoFields) => {
        return new ValidatedPythPriceInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ValidatedPythPriceInfoReified {
    return ValidatedPythPriceInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ValidatedPythPriceInfo>> {
    return phantom(ValidatedPythPriceInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ValidatedPythPriceInfo>> {
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

  static get bcs(): ReturnType<typeof ValidatedPythPriceInfo.instantiateBcs> {
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
        item.fields.map,
      ),
      currentTsSec: decodeFromFieldsWithTypes('u64', item.fields.current_ts_sec),
      maxAgeSecs: decodeFromFieldsWithTypes('u64', item.fields.max_age_secs),
    })
  }

  static fromBcs(data: Uint8Array): ValidatedPythPriceInfo {
    return ValidatedPythPriceInfo.fromFields(ValidatedPythPriceInfo.bcs.parse(data))
  }

  toJSONField(): ValidatedPythPriceInfoJSONField {
    return {
      map: this.map.toJSONField(),
      currentTsSec: this.currentTsSec.toString(),
      maxAgeSecs: this.maxAgeSecs.toString(),
    }
  }

  toJSON(): ValidatedPythPriceInfoJSON {
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
      throw new Error(
        `not a ValidatedPythPriceInfo json object: expected '${ValidatedPythPriceInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ValidatedPythPriceInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ValidatedPythPriceInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isValidatedPythPriceInfo(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ValidatedPythPriceInfo object`,
      )
    }
    return ValidatedPythPriceInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ValidatedPythPriceInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isValidatedPythPriceInfo(data.bcs.type)) {
        throw new Error(`object at is not a ValidatedPythPriceInfo object`)
      }

      return ValidatedPythPriceInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ValidatedPythPriceInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ValidatedPythPriceInfo> {
    const res = await fetchObjectBcs(client, id)
    if (!isValidatedPythPriceInfo(res.type)) {
      throw new Error(`object at id ${id} is not a ValidatedPythPriceInfo object`)
    }

    return ValidatedPythPriceInfo.fromBcs(res.bcsBytes)
  }
}
