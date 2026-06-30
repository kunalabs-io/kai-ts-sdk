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
import { FixedPoint32 } from '../../../std/fixed-point32/structs'

/* ============================== BorrowDynamics =============================== */

export function isBorrowDynamics(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'borrow_dynamics::BorrowDynamics')
    }::borrow_dynamics::BorrowDynamics`
}

export interface BorrowDynamicsFields {
  dummyField: ToField<'bool'>
}

export type BorrowDynamicsReified = Reified<BorrowDynamics, BorrowDynamicsFields>

export type BorrowDynamicsJSONField = {
  dummyField: boolean
}

export type BorrowDynamicsJSON = {
  $typeName: typeof BorrowDynamics.$typeName
  $typeArgs: []
} & BorrowDynamicsJSONField

export class BorrowDynamics implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow_dynamics::BorrowDynamics` {
    return `${
      getTypeOrigin('protocol', 'borrow_dynamics::BorrowDynamics')
    }::borrow_dynamics::BorrowDynamics` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowDynamics.$typeName = BorrowDynamics.$typeName
  readonly $fullTypeName: `${string}::borrow_dynamics::BorrowDynamics`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowDynamics.$isPhantom = BorrowDynamics.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BorrowDynamicsFields) {
    this.$fullTypeName = composeSuiType(
      BorrowDynamics.$typeName,
      ...typeArgs,
    ) as `${string}::borrow_dynamics::BorrowDynamics`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BorrowDynamicsReified {
    const reifiedBcs = BorrowDynamics.bcs
    return {
      get typeName() {
        return BorrowDynamics.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowDynamics.$typeName,
          ...[],
        ) as `${string}::borrow_dynamics::BorrowDynamics`
      },
      typeArgs: [] as [],
      isPhantom: BorrowDynamics.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowDynamics.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowDynamics.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowDynamics.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowDynamics.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowDynamics.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowDynamics.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowDynamics.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowDynamics.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowDynamics.fetch(client, id),
      new: (fields: BorrowDynamicsFields) => {
        return new BorrowDynamics([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowDynamicsReified {
    return BorrowDynamics.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowDynamics>> {
    return phantom(BorrowDynamics.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowDynamics>> {
    return BorrowDynamics.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowDynamics', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowDynamics.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowDynamics.instantiateBcs> {
    if (!BorrowDynamics.cachedBcs) {
      BorrowDynamics.cachedBcs = BorrowDynamics.instantiateBcs()
    }
    return BorrowDynamics.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowDynamics {
    return BorrowDynamics.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowDynamics {
    if (!isBorrowDynamics(item.type)) {
      throw new Error('not a BorrowDynamics type')
    }

    return BorrowDynamics.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): BorrowDynamics {
    return BorrowDynamics.fromFields(BorrowDynamics.bcs.parse(data))
  }

  toJSONField(): BorrowDynamicsJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): BorrowDynamicsJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowDynamics {
    return BorrowDynamics.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowDynamics {
    if (json.$typeName !== BorrowDynamics.$typeName) {
      throw new Error(
        `not a BorrowDynamics json object: expected '${BorrowDynamics.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowDynamics.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowDynamics {
    if (!isBorrowDynamics(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowDynamics object`)
    }
    return BorrowDynamics.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowDynamics.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowDynamics {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowDynamics(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowDynamics object`)
    }
    return BorrowDynamics.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowDynamics.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowDynamics {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowDynamics(data.bcs.type)) {
        throw new Error(`object at is not a BorrowDynamics object`)
      }

      return BorrowDynamics.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowDynamics.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowDynamics> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowDynamics(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowDynamics object`)
    }
    return BorrowDynamics.fromBcs(object.content)
  }
}

/* ============================== BorrowDynamic =============================== */

export function isBorrowDynamic(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'borrow_dynamics::BorrowDynamic')
    }::borrow_dynamics::BorrowDynamic`
}

export interface BorrowDynamicFields {
  interestRate: ToField<FixedPoint32>
  interestRateScale: ToField<'u64'>
  borrowIndex: ToField<'u64'>
  lastUpdated: ToField<'u64'>
}

export type BorrowDynamicReified = Reified<BorrowDynamic, BorrowDynamicFields>

export type BorrowDynamicJSONField = {
  interestRate: ToJSON<FixedPoint32>
  interestRateScale: string
  borrowIndex: string
  lastUpdated: string
}

export type BorrowDynamicJSON = {
  $typeName: typeof BorrowDynamic.$typeName
  $typeArgs: []
} & BorrowDynamicJSONField

export class BorrowDynamic implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow_dynamics::BorrowDynamic` {
    return `${
      getTypeOrigin('protocol', 'borrow_dynamics::BorrowDynamic')
    }::borrow_dynamics::BorrowDynamic` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowDynamic.$typeName = BorrowDynamic.$typeName
  readonly $fullTypeName: `${string}::borrow_dynamics::BorrowDynamic`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowDynamic.$isPhantom = BorrowDynamic.$isPhantom

  readonly interestRate: ToField<FixedPoint32>
  readonly interestRateScale: ToField<'u64'>
  readonly borrowIndex: ToField<'u64'>
  readonly lastUpdated: ToField<'u64'>

  private constructor(typeArgs: [], fields: BorrowDynamicFields) {
    this.$fullTypeName = composeSuiType(
      BorrowDynamic.$typeName,
      ...typeArgs,
    ) as `${string}::borrow_dynamics::BorrowDynamic`
    this.$typeArgs = typeArgs

    this.interestRate = fields.interestRate
    this.interestRateScale = fields.interestRateScale
    this.borrowIndex = fields.borrowIndex
    this.lastUpdated = fields.lastUpdated
  }

  static reified(): BorrowDynamicReified {
    const reifiedBcs = BorrowDynamic.bcs
    return {
      get typeName() {
        return BorrowDynamic.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowDynamic.$typeName,
          ...[],
        ) as `${string}::borrow_dynamics::BorrowDynamic`
      },
      typeArgs: [] as [],
      isPhantom: BorrowDynamic.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowDynamic.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowDynamic.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowDynamic.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowDynamic.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowDynamic.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowDynamic.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowDynamic.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowDynamic.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowDynamic.fetch(client, id),
      new: (fields: BorrowDynamicFields) => {
        return new BorrowDynamic([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowDynamicReified {
    return BorrowDynamic.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowDynamic>> {
    return phantom(BorrowDynamic.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowDynamic>> {
    return BorrowDynamic.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowDynamic', {
      interest_rate: FixedPoint32.bcs,
      interest_rate_scale: bcs.u64(),
      borrow_index: bcs.u64(),
      last_updated: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowDynamic.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowDynamic.instantiateBcs> {
    if (!BorrowDynamic.cachedBcs) {
      BorrowDynamic.cachedBcs = BorrowDynamic.instantiateBcs()
    }
    return BorrowDynamic.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowDynamic {
    return BorrowDynamic.reified().new({
      interestRate: decodeFromFields(FixedPoint32.reified(), fields.interest_rate),
      interestRateScale: decodeFromFields('u64', fields.interest_rate_scale),
      borrowIndex: decodeFromFields('u64', fields.borrow_index),
      lastUpdated: decodeFromFields('u64', fields.last_updated),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowDynamic {
    if (!isBorrowDynamic(item.type)) {
      throw new Error('not a BorrowDynamic type')
    }

    return BorrowDynamic.reified().new({
      interestRate: decodeFromFieldsWithTypes(FixedPoint32.reified(), item.fields.interest_rate),
      interestRateScale: decodeFromFieldsWithTypes('u64', item.fields.interest_rate_scale),
      borrowIndex: decodeFromFieldsWithTypes('u64', item.fields.borrow_index),
      lastUpdated: decodeFromFieldsWithTypes('u64', item.fields.last_updated),
    })
  }

  static fromBcs(data: Uint8Array): BorrowDynamic {
    return BorrowDynamic.fromFields(BorrowDynamic.bcs.parse(data))
  }

  toJSONField(): BorrowDynamicJSONField {
    return {
      interestRate: this.interestRate.toJSONField(),
      interestRateScale: this.interestRateScale.toString(),
      borrowIndex: this.borrowIndex.toString(),
      lastUpdated: this.lastUpdated.toString(),
    }
  }

  toJSON(): BorrowDynamicJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowDynamic {
    return BorrowDynamic.reified().new({
      interestRate: decodeFromJSONField(FixedPoint32.reified(), field.interestRate),
      interestRateScale: decodeFromJSONField('u64', field.interestRateScale),
      borrowIndex: decodeFromJSONField('u64', field.borrowIndex),
      lastUpdated: decodeFromJSONField('u64', field.lastUpdated),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowDynamic {
    if (json.$typeName !== BorrowDynamic.$typeName) {
      throw new Error(
        `not a BorrowDynamic json object: expected '${BorrowDynamic.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowDynamic.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowDynamic {
    if (!isBorrowDynamic(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowDynamic object`)
    }
    return BorrowDynamic.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowDynamic.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowDynamic {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowDynamic(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowDynamic object`)
    }
    return BorrowDynamic.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowDynamic.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowDynamic {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowDynamic(data.bcs.type)) {
        throw new Error(`object at is not a BorrowDynamic object`)
      }

      return BorrowDynamic.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowDynamic.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowDynamic> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowDynamic(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowDynamic object`)
    }
    return BorrowDynamic.fromBcs(object.content)
  }
}
