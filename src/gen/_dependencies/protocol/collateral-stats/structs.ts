import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
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
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'

/* ============================== CollateralStats =============================== */

export function isCollateralStats(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'collateral_stats::CollateralStats')
    }::collateral_stats::CollateralStats`
}

export interface CollateralStatsFields {
  dummyField: ToField<'bool'>
}

export type CollateralStatsReified = Reified<CollateralStats, CollateralStatsFields>

export type CollateralStatsJSONField = {
  dummyField: boolean
}

export type CollateralStatsJSON = {
  $typeName: typeof CollateralStats.$typeName
  $typeArgs: []
} & CollateralStatsJSONField

export class CollateralStats implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::collateral_stats::CollateralStats` {
    return `${
      getTypeOrigin('protocol', 'collateral_stats::CollateralStats')
    }::collateral_stats::CollateralStats` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollateralStats.$typeName = CollateralStats.$typeName
  readonly $fullTypeName: `${string}::collateral_stats::CollateralStats`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollateralStats.$isPhantom = CollateralStats.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: CollateralStatsFields) {
    this.$fullTypeName = composeSuiType(
      CollateralStats.$typeName,
      ...typeArgs,
    ) as `${string}::collateral_stats::CollateralStats`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): CollateralStatsReified {
    const reifiedBcs = CollateralStats.bcs
    return {
      get typeName() {
        return CollateralStats.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CollateralStats.$typeName,
          ...[],
        ) as `${string}::collateral_stats::CollateralStats`
      },
      typeArgs: [] as [],
      isPhantom: CollateralStats.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollateralStats.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CollateralStats.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollateralStats.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollateralStats.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollateralStats.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CollateralStats.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => CollateralStats.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CollateralStats.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => CollateralStats.fetch(client, id),
      new: (fields: CollateralStatsFields) => {
        return new CollateralStats([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollateralStatsReified {
    return CollateralStats.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollateralStats>> {
    return phantom(CollateralStats.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollateralStats>> {
    return CollateralStats.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollateralStats', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollateralStats.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollateralStats.instantiateBcs> {
    if (!CollateralStats.cachedBcs) {
      CollateralStats.cachedBcs = CollateralStats.instantiateBcs()
    }
    return CollateralStats.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CollateralStats {
    return CollateralStats.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollateralStats {
    if (!isCollateralStats(item.type)) {
      throw new Error('not a CollateralStats type')
    }

    return CollateralStats.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): CollateralStats {
    return CollateralStats.fromFields(CollateralStats.bcs.parse(data))
  }

  toJSONField(): CollateralStatsJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): CollateralStatsJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollateralStats {
    return CollateralStats.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): CollateralStats {
    if (json.$typeName !== CollateralStats.$typeName) {
      throw new Error(
        `not a CollateralStats json object: expected '${CollateralStats.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollateralStats.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CollateralStats {
    if (!isCollateralStats(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CollateralStats object`)
    }
    return CollateralStats.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollateralStats.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CollateralStats {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollateralStats(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CollateralStats object`)
    }
    return CollateralStats.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollateralStats.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CollateralStats {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollateralStats(data.bcs.type)) {
        throw new Error(`object at is not a CollateralStats object`)
      }

      return CollateralStats.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollateralStats.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CollateralStats> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCollateralStats(object.type)) {
      throw new Error(`object at id ${id} is not a CollateralStats object`)
    }
    return CollateralStats.fromBcs(object.content)
  }
}

/* ============================== CollateralStat =============================== */

export function isCollateralStat(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'collateral_stats::CollateralStat')
    }::collateral_stats::CollateralStat`
}

export interface CollateralStatFields {
  amount: ToField<'u64'>
}

export type CollateralStatReified = Reified<CollateralStat, CollateralStatFields>

export type CollateralStatJSONField = {
  amount: string
}

export type CollateralStatJSON = {
  $typeName: typeof CollateralStat.$typeName
  $typeArgs: []
} & CollateralStatJSONField

export class CollateralStat implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::collateral_stats::CollateralStat` {
    return `${
      getTypeOrigin('protocol', 'collateral_stats::CollateralStat')
    }::collateral_stats::CollateralStat` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollateralStat.$typeName = CollateralStat.$typeName
  readonly $fullTypeName: `${string}::collateral_stats::CollateralStat`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollateralStat.$isPhantom = CollateralStat.$isPhantom

  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollateralStatFields) {
    this.$fullTypeName = composeSuiType(
      CollateralStat.$typeName,
      ...typeArgs,
    ) as `${string}::collateral_stats::CollateralStat`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
  }

  static reified(): CollateralStatReified {
    const reifiedBcs = CollateralStat.bcs
    return {
      get typeName() {
        return CollateralStat.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CollateralStat.$typeName,
          ...[],
        ) as `${string}::collateral_stats::CollateralStat`
      },
      typeArgs: [] as [],
      isPhantom: CollateralStat.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollateralStat.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CollateralStat.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollateralStat.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollateralStat.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollateralStat.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CollateralStat.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => CollateralStat.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CollateralStat.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => CollateralStat.fetch(client, id),
      new: (fields: CollateralStatFields) => {
        return new CollateralStat([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollateralStatReified {
    return CollateralStat.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollateralStat>> {
    return phantom(CollateralStat.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollateralStat>> {
    return CollateralStat.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollateralStat', {
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollateralStat.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollateralStat.instantiateBcs> {
    if (!CollateralStat.cachedBcs) {
      CollateralStat.cachedBcs = CollateralStat.instantiateBcs()
    }
    return CollateralStat.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CollateralStat {
    return CollateralStat.reified().new({
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollateralStat {
    if (!isCollateralStat(item.type)) {
      throw new Error('not a CollateralStat type')
    }

    return CollateralStat.reified().new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): CollateralStat {
    return CollateralStat.fromFields(CollateralStat.bcs.parse(data))
  }

  toJSONField(): CollateralStatJSONField {
    return {
      amount: this.amount.toString(),
    }
  }

  toJSON(): CollateralStatJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollateralStat {
    return CollateralStat.reified().new({
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): CollateralStat {
    if (json.$typeName !== CollateralStat.$typeName) {
      throw new Error(
        `not a CollateralStat json object: expected '${CollateralStat.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollateralStat.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CollateralStat {
    if (!isCollateralStat(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CollateralStat object`)
    }
    return CollateralStat.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollateralStat.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CollateralStat {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollateralStat(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CollateralStat object`)
    }
    return CollateralStat.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollateralStat.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CollateralStat {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollateralStat(data.bcs.type)) {
        throw new Error(`object at is not a CollateralStat object`)
      }

      return CollateralStat.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollateralStat.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CollateralStat> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCollateralStat(object.type)) {
      throw new Error(`object at id ${id} is not a CollateralStat object`)
    }
    return CollateralStat.fromBcs(object.content)
  }
}
