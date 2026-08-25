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
import { UID } from '../../../sui/object/structs'
import { PriceFeed } from '../price-feed/structs'

/* ============================== PriceInfoObject =============================== */

export function isPriceInfoObject(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('pyth-1', 'price_info::PriceInfoObject')}::price_info::PriceInfoObject`
}

export interface PriceInfoObjectFields {
  id: ToField<UID>
  priceInfo: ToField<PriceInfo>
}

export type PriceInfoObjectReified = Reified<PriceInfoObject, PriceInfoObjectFields>

export type PriceInfoObjectJSONField = {
  id: string
  priceInfo: ToJSON<PriceInfo>
}

export type PriceInfoObjectJSON = {
  $typeName: typeof PriceInfoObject.$typeName
  $typeArgs: []
} & PriceInfoObjectJSONField

/**
 * Sui object version of PriceInfo.
 * Has a key ability, is unique for each price identifier, and lives in global store.
 */
export class PriceInfoObject implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::price_info::PriceInfoObject` {
    return `${
      getTypeOrigin('pyth-1', 'price_info::PriceInfoObject')
    }::price_info::PriceInfoObject` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceInfoObject.$typeName = PriceInfoObject.$typeName
  readonly $fullTypeName: `${string}::price_info::PriceInfoObject`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceInfoObject.$isPhantom = PriceInfoObject.$isPhantom

  readonly id: ToField<UID>
  readonly priceInfo: ToField<PriceInfo>

  private constructor(typeArgs: [], fields: PriceInfoObjectFields) {
    this.$fullTypeName = composeSuiType(
      PriceInfoObject.$typeName,
      ...typeArgs,
    ) as `${string}::price_info::PriceInfoObject`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.priceInfo = fields.priceInfo
  }

  static reified(): PriceInfoObjectReified {
    const reifiedBcs = PriceInfoObject.bcs
    return {
      get typeName() {
        return PriceInfoObject.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PriceInfoObject.$typeName,
          ...[],
        ) as `${string}::price_info::PriceInfoObject`
      },
      typeArgs: [] as [],
      isPhantom: PriceInfoObject.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceInfoObject.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceInfoObject.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceInfoObject.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceInfoObject.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceInfoObject.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PriceInfoObject.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PriceInfoObject.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceInfoObject.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PriceInfoObject.fetch(client, id),
      new: (fields: PriceInfoObjectFields) => {
        return new PriceInfoObject([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceInfoObjectReified {
    return PriceInfoObject.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceInfoObject>> {
    return phantom(PriceInfoObject.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceInfoObject>> {
    return PriceInfoObject.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceInfoObject', {
      id: UID.bcs,
      price_info: PriceInfo.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PriceInfoObject.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceInfoObject.instantiateBcs> {
    if (!PriceInfoObject.cachedBcs) {
      PriceInfoObject.cachedBcs = PriceInfoObject.instantiateBcs()
    }
    return PriceInfoObject.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceInfoObject {
    return PriceInfoObject.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      priceInfo: decodeFromFields(PriceInfo.reified(), fields.price_info),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceInfoObject {
    if (!isPriceInfoObject(item.type)) {
      throw new Error('not a PriceInfoObject type')
    }

    return PriceInfoObject.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      priceInfo: decodeFromFieldsWithTypes(PriceInfo.reified(), item.fields.price_info),
    })
  }

  static fromBcs(data: Uint8Array): PriceInfoObject {
    return PriceInfoObject.fromFields(PriceInfoObject.bcs.parse(data))
  }

  toJSONField(): PriceInfoObjectJSONField {
    return {
      id: this.id,
      priceInfo: this.priceInfo.toJSONField(),
    }
  }

  toJSON(): PriceInfoObjectJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceInfoObject {
    return PriceInfoObject.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      priceInfo: decodeFromJSONField(PriceInfo.reified(), field.priceInfo),
    })
  }

  static fromJSON(json: Record<string, any>): PriceInfoObject {
    if (json.$typeName !== PriceInfoObject.$typeName) {
      throw new Error(
        `not a PriceInfoObject json object: expected '${PriceInfoObject.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceInfoObject.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PriceInfoObject {
    if (!isPriceInfoObject(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PriceInfoObject object`)
    }
    return PriceInfoObject.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceInfoObject.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PriceInfoObject {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceInfoObject(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceInfoObject object`)
    }
    return PriceInfoObject.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceInfoObject.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PriceInfoObject {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceInfoObject(data.bcs.type)) {
        throw new Error(`object at is not a PriceInfoObject object`)
      }

      return PriceInfoObject.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceInfoObject.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PriceInfoObject> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPriceInfoObject(object.type)) {
      throw new Error(`object at id ${id} is not a PriceInfoObject object`)
    }
    return PriceInfoObject.fromBcs(object.content)
  }
}

/* ============================== PriceInfo =============================== */

export function isPriceInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth-1', 'price_info::PriceInfo')}::price_info::PriceInfo`
}

export interface PriceInfoFields {
  attestationTime: ToField<'u64'>
  arrivalTime: ToField<'u64'>
  priceFeed: ToField<PriceFeed>
}

export type PriceInfoReified = Reified<PriceInfo, PriceInfoFields>

export type PriceInfoJSONField = {
  attestationTime: string
  arrivalTime: string
  priceFeed: ToJSON<PriceFeed>
}

export type PriceInfoJSON = {
  $typeName: typeof PriceInfo.$typeName
  $typeArgs: []
} & PriceInfoJSONField

/** Copyable and droppable. */
export class PriceInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::price_info::PriceInfo` {
    return `${getTypeOrigin('pyth-1', 'price_info::PriceInfo')}::price_info::PriceInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceInfo.$typeName = PriceInfo.$typeName
  readonly $fullTypeName: `${string}::price_info::PriceInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceInfo.$isPhantom = PriceInfo.$isPhantom

  readonly attestationTime: ToField<'u64'>
  readonly arrivalTime: ToField<'u64'>
  readonly priceFeed: ToField<PriceFeed>

  private constructor(typeArgs: [], fields: PriceInfoFields) {
    this.$fullTypeName = composeSuiType(
      PriceInfo.$typeName,
      ...typeArgs,
    ) as `${string}::price_info::PriceInfo`
    this.$typeArgs = typeArgs

    this.attestationTime = fields.attestationTime
    this.arrivalTime = fields.arrivalTime
    this.priceFeed = fields.priceFeed
  }

  static reified(): PriceInfoReified {
    const reifiedBcs = PriceInfo.bcs
    return {
      get typeName() {
        return PriceInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PriceInfo.$typeName,
          ...[],
        ) as `${string}::price_info::PriceInfo`
      },
      typeArgs: [] as [],
      isPhantom: PriceInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PriceInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PriceInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PriceInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PriceInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PriceInfo.fetch(client, id),
      new: (fields: PriceInfoFields) => {
        return new PriceInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceInfoReified {
    return PriceInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceInfo>> {
    return phantom(PriceInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceInfo>> {
    return PriceInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceInfo', {
      attestation_time: bcs.u64(),
      arrival_time: bcs.u64(),
      price_feed: PriceFeed.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PriceInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceInfo.instantiateBcs> {
    if (!PriceInfo.cachedBcs) {
      PriceInfo.cachedBcs = PriceInfo.instantiateBcs()
    }
    return PriceInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceInfo {
    return PriceInfo.reified().new({
      attestationTime: decodeFromFields('u64', fields.attestation_time),
      arrivalTime: decodeFromFields('u64', fields.arrival_time),
      priceFeed: decodeFromFields(PriceFeed.reified(), fields.price_feed),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceInfo {
    if (!isPriceInfo(item.type)) {
      throw new Error('not a PriceInfo type')
    }

    return PriceInfo.reified().new({
      attestationTime: decodeFromFieldsWithTypes('u64', item.fields.attestation_time),
      arrivalTime: decodeFromFieldsWithTypes('u64', item.fields.arrival_time),
      priceFeed: decodeFromFieldsWithTypes(PriceFeed.reified(), item.fields.price_feed),
    })
  }

  static fromBcs(data: Uint8Array): PriceInfo {
    return PriceInfo.fromFields(PriceInfo.bcs.parse(data))
  }

  toJSONField(): PriceInfoJSONField {
    return {
      attestationTime: this.attestationTime.toString(),
      arrivalTime: this.arrivalTime.toString(),
      priceFeed: this.priceFeed.toJSONField(),
    }
  }

  toJSON(): PriceInfoJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceInfo {
    return PriceInfo.reified().new({
      attestationTime: decodeFromJSONField('u64', field.attestationTime),
      arrivalTime: decodeFromJSONField('u64', field.arrivalTime),
      priceFeed: decodeFromJSONField(PriceFeed.reified(), field.priceFeed),
    })
  }

  static fromJSON(json: Record<string, any>): PriceInfo {
    if (json.$typeName !== PriceInfo.$typeName) {
      throw new Error(
        `not a PriceInfo json object: expected '${PriceInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PriceInfo {
    if (!isPriceInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PriceInfo object`)
    }
    return PriceInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PriceInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PriceInfo object`)
    }
    return PriceInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PriceInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceInfo(data.bcs.type)) {
        throw new Error(`object at is not a PriceInfo object`)
      }

      return PriceInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PriceInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPriceInfo(object.type)) {
      throw new Error(`object at id ${id} is not a PriceInfo object`)
    }
    return PriceInfo.fromBcs(object.content)
  }
}
