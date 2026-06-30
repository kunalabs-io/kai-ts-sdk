import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { PriceFeed } from '../price-feed/structs'

/* ============================== PythInitializationEvent =============================== */

export function isPythInitializationEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('pyth', 'event::PythInitializationEvent')}::event::PythInitializationEvent`
}

export interface PythInitializationEventFields {
  dummyField: ToField<'bool'>
}

export type PythInitializationEventReified = Reified<
  PythInitializationEvent,
  PythInitializationEventFields
>

export type PythInitializationEventJSONField = {
  dummyField: boolean
}

export type PythInitializationEventJSON = {
  $typeName: typeof PythInitializationEvent.$typeName
  $typeArgs: []
} & PythInitializationEventJSONField

export class PythInitializationEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::event::PythInitializationEvent` {
    return `${
      getTypeOrigin('pyth', 'event::PythInitializationEvent')
    }::event::PythInitializationEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PythInitializationEvent.$typeName = PythInitializationEvent.$typeName
  readonly $fullTypeName: `${string}::event::PythInitializationEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PythInitializationEvent.$isPhantom =
    PythInitializationEvent.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: PythInitializationEventFields) {
    this.$fullTypeName = composeSuiType(
      PythInitializationEvent.$typeName,
      ...typeArgs,
    ) as `${string}::event::PythInitializationEvent`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): PythInitializationEventReified {
    const reifiedBcs = PythInitializationEvent.bcs
    return {
      get typeName() {
        return PythInitializationEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PythInitializationEvent.$typeName,
          ...[],
        ) as `${string}::event::PythInitializationEvent`
      },
      typeArgs: [] as [],
      isPhantom: PythInitializationEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PythInitializationEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PythInitializationEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PythInitializationEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PythInitializationEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PythInitializationEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PythInitializationEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        PythInitializationEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PythInitializationEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        PythInitializationEvent.fetch(client, id),
      new: (fields: PythInitializationEventFields) => {
        return new PythInitializationEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PythInitializationEventReified {
    return PythInitializationEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PythInitializationEvent>> {
    return phantom(PythInitializationEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PythInitializationEvent>> {
    return PythInitializationEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PythInitializationEvent', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof PythInitializationEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PythInitializationEvent.instantiateBcs> {
    if (!PythInitializationEvent.cachedBcs) {
      PythInitializationEvent.cachedBcs = PythInitializationEvent.instantiateBcs()
    }
    return PythInitializationEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PythInitializationEvent {
    return PythInitializationEvent.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PythInitializationEvent {
    if (!isPythInitializationEvent(item.type)) {
      throw new Error('not a PythInitializationEvent type')
    }

    return PythInitializationEvent.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): PythInitializationEvent {
    return PythInitializationEvent.fromFields(PythInitializationEvent.bcs.parse(data))
  }

  toJSONField(): PythInitializationEventJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): PythInitializationEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PythInitializationEvent {
    return PythInitializationEvent.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): PythInitializationEvent {
    if (json.$typeName !== PythInitializationEvent.$typeName) {
      throw new Error(
        `not a PythInitializationEvent json object: expected '${PythInitializationEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PythInitializationEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PythInitializationEvent {
    if (!isPythInitializationEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PythInitializationEvent object`)
    }
    return PythInitializationEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PythInitializationEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PythInitializationEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPythInitializationEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PythInitializationEvent object`,
      )
    }
    return PythInitializationEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PythInitializationEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PythInitializationEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPythInitializationEvent(data.bcs.type)) {
        throw new Error(`object at is not a PythInitializationEvent object`)
      }

      return PythInitializationEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PythInitializationEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PythInitializationEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPythInitializationEvent(object.type)) {
      throw new Error(`object at id ${id} is not a PythInitializationEvent object`)
    }
    return PythInitializationEvent.fromBcs(object.content)
  }
}

/* ============================== PriceFeedUpdateEvent =============================== */

export function isPriceFeedUpdateEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('pyth', 'event::PriceFeedUpdateEvent')}::event::PriceFeedUpdateEvent`
}

export interface PriceFeedUpdateEventFields {
  /** Value of the price feed */
  priceFeed: ToField<PriceFeed>
  /** Timestamp of the update */
  timestamp: ToField<'u64'>
}

export type PriceFeedUpdateEventReified = Reified<PriceFeedUpdateEvent, PriceFeedUpdateEventFields>

export type PriceFeedUpdateEventJSONField = {
  priceFeed: ToJSON<PriceFeed>
  timestamp: string
}

export type PriceFeedUpdateEventJSON = {
  $typeName: typeof PriceFeedUpdateEvent.$typeName
  $typeArgs: []
} & PriceFeedUpdateEventJSONField

/** Signifies that a price feed has been updated */
export class PriceFeedUpdateEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::event::PriceFeedUpdateEvent` {
    return `${
      getTypeOrigin('pyth', 'event::PriceFeedUpdateEvent')
    }::event::PriceFeedUpdateEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PriceFeedUpdateEvent.$typeName = PriceFeedUpdateEvent.$typeName
  readonly $fullTypeName: `${string}::event::PriceFeedUpdateEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PriceFeedUpdateEvent.$isPhantom = PriceFeedUpdateEvent.$isPhantom

  /** Value of the price feed */
  readonly priceFeed: ToField<PriceFeed>
  /** Timestamp of the update */
  readonly timestamp: ToField<'u64'>

  private constructor(typeArgs: [], fields: PriceFeedUpdateEventFields) {
    this.$fullTypeName = composeSuiType(
      PriceFeedUpdateEvent.$typeName,
      ...typeArgs,
    ) as `${string}::event::PriceFeedUpdateEvent`
    this.$typeArgs = typeArgs

    this.priceFeed = fields.priceFeed
    this.timestamp = fields.timestamp
  }

  static reified(): PriceFeedUpdateEventReified {
    const reifiedBcs = PriceFeedUpdateEvent.bcs
    return {
      get typeName() {
        return PriceFeedUpdateEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PriceFeedUpdateEvent.$typeName,
          ...[],
        ) as `${string}::event::PriceFeedUpdateEvent`
      },
      typeArgs: [] as [],
      isPhantom: PriceFeedUpdateEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PriceFeedUpdateEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        PriceFeedUpdateEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PriceFeedUpdateEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PriceFeedUpdateEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PriceFeedUpdateEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PriceFeedUpdateEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        PriceFeedUpdateEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        PriceFeedUpdateEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        PriceFeedUpdateEvent.fetch(client, id),
      new: (fields: PriceFeedUpdateEventFields) => {
        return new PriceFeedUpdateEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PriceFeedUpdateEventReified {
    return PriceFeedUpdateEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PriceFeedUpdateEvent>> {
    return phantom(PriceFeedUpdateEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PriceFeedUpdateEvent>> {
    return PriceFeedUpdateEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PriceFeedUpdateEvent', {
      price_feed: PriceFeed.bcs,
      timestamp: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof PriceFeedUpdateEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PriceFeedUpdateEvent.instantiateBcs> {
    if (!PriceFeedUpdateEvent.cachedBcs) {
      PriceFeedUpdateEvent.cachedBcs = PriceFeedUpdateEvent.instantiateBcs()
    }
    return PriceFeedUpdateEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PriceFeedUpdateEvent {
    return PriceFeedUpdateEvent.reified().new({
      priceFeed: decodeFromFields(PriceFeed.reified(), fields.price_feed),
      timestamp: decodeFromFields('u64', fields.timestamp),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PriceFeedUpdateEvent {
    if (!isPriceFeedUpdateEvent(item.type)) {
      throw new Error('not a PriceFeedUpdateEvent type')
    }

    return PriceFeedUpdateEvent.reified().new({
      priceFeed: decodeFromFieldsWithTypes(PriceFeed.reified(), item.fields.price_feed),
      timestamp: decodeFromFieldsWithTypes('u64', item.fields.timestamp),
    })
  }

  static fromBcs(data: Uint8Array): PriceFeedUpdateEvent {
    return PriceFeedUpdateEvent.fromFields(PriceFeedUpdateEvent.bcs.parse(data))
  }

  toJSONField(): PriceFeedUpdateEventJSONField {
    return {
      priceFeed: this.priceFeed.toJSONField(),
      timestamp: this.timestamp.toString(),
    }
  }

  toJSON(): PriceFeedUpdateEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PriceFeedUpdateEvent {
    return PriceFeedUpdateEvent.reified().new({
      priceFeed: decodeFromJSONField(PriceFeed.reified(), field.priceFeed),
      timestamp: decodeFromJSONField('u64', field.timestamp),
    })
  }

  static fromJSON(json: Record<string, any>): PriceFeedUpdateEvent {
    if (json.$typeName !== PriceFeedUpdateEvent.$typeName) {
      throw new Error(
        `not a PriceFeedUpdateEvent json object: expected '${PriceFeedUpdateEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PriceFeedUpdateEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PriceFeedUpdateEvent {
    if (!isPriceFeedUpdateEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PriceFeedUpdateEvent object`)
    }
    return PriceFeedUpdateEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceFeedUpdateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PriceFeedUpdateEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPriceFeedUpdateEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a PriceFeedUpdateEvent object`,
      )
    }
    return PriceFeedUpdateEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PriceFeedUpdateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PriceFeedUpdateEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPriceFeedUpdateEvent(data.bcs.type)) {
        throw new Error(`object at is not a PriceFeedUpdateEvent object`)
      }

      return PriceFeedUpdateEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PriceFeedUpdateEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PriceFeedUpdateEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPriceFeedUpdateEvent(object.type)) {
      throw new Error(`object at id ${id} is not a PriceFeedUpdateEvent object`)
    }
    return PriceFeedUpdateEvent.fromBcs(object.content)
  }
}
