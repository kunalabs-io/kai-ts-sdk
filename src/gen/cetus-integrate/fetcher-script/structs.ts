import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { PoolSimpleInfo } from '../../cetus-clmm/factory/structs'
import { CalculatedSwapResult } from '../../cetus-clmm/pool/structs'
import { PositionInfo } from '../../cetus-clmm/position/structs'
import { Tick } from '../../cetus-clmm/tick/structs'
import { ID } from '../../sui/object/structs'

/* ============================== FetchTicksResultEvent =============================== */

export function isFetchTicksResultEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchTicksResultEvent')
    }::fetcher_script::FetchTicksResultEvent`
}

export interface FetchTicksResultEventFields {
  ticks: ToField<Vector<Tick>>
}

export type FetchTicksResultEventReified = Reified<
  FetchTicksResultEvent,
  FetchTicksResultEventFields
>

export type FetchTicksResultEventJSONField = {
  ticks: ToJSON<Tick>[]
}

export type FetchTicksResultEventJSON = {
  $typeName: typeof FetchTicksResultEvent.$typeName
  $typeArgs: []
} & FetchTicksResultEventJSONField

export class FetchTicksResultEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::fetcher_script::FetchTicksResultEvent` {
    return `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchTicksResultEvent')
    }::fetcher_script::FetchTicksResultEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FetchTicksResultEvent.$typeName = FetchTicksResultEvent.$typeName
  readonly $fullTypeName: `${string}::fetcher_script::FetchTicksResultEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FetchTicksResultEvent.$isPhantom = FetchTicksResultEvent.$isPhantom

  readonly ticks: ToField<Vector<Tick>>

  private constructor(typeArgs: [], fields: FetchTicksResultEventFields) {
    this.$fullTypeName = composeSuiType(
      FetchTicksResultEvent.$typeName,
      ...typeArgs,
    ) as `${string}::fetcher_script::FetchTicksResultEvent`
    this.$typeArgs = typeArgs

    this.ticks = fields.ticks
  }

  static reified(): FetchTicksResultEventReified {
    const reifiedBcs = FetchTicksResultEvent.bcs
    return {
      get typeName() {
        return FetchTicksResultEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FetchTicksResultEvent.$typeName,
          ...[],
        ) as `${string}::fetcher_script::FetchTicksResultEvent`
      },
      typeArgs: [] as [],
      isPhantom: FetchTicksResultEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FetchTicksResultEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        FetchTicksResultEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FetchTicksResultEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FetchTicksResultEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FetchTicksResultEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FetchTicksResultEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        FetchTicksResultEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        FetchTicksResultEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        FetchTicksResultEvent.fetch(client, id),
      new: (fields: FetchTicksResultEventFields) => {
        return new FetchTicksResultEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FetchTicksResultEventReified {
    return FetchTicksResultEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FetchTicksResultEvent>> {
    return phantom(FetchTicksResultEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FetchTicksResultEvent>> {
    return FetchTicksResultEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FetchTicksResultEvent', {
      ticks: bcs.vector(Tick.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof FetchTicksResultEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FetchTicksResultEvent.instantiateBcs> {
    if (!FetchTicksResultEvent.cachedBcs) {
      FetchTicksResultEvent.cachedBcs = FetchTicksResultEvent.instantiateBcs()
    }
    return FetchTicksResultEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FetchTicksResultEvent {
    return FetchTicksResultEvent.reified().new({
      ticks: decodeFromFields(vector(Tick.reified()), fields.ticks),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FetchTicksResultEvent {
    if (!isFetchTicksResultEvent(item.type)) {
      throw new Error('not a FetchTicksResultEvent type')
    }

    return FetchTicksResultEvent.reified().new({
      ticks: decodeFromFieldsWithTypes(vector(Tick.reified()), item.fields.ticks),
    })
  }

  static fromBcs(data: Uint8Array): FetchTicksResultEvent {
    return FetchTicksResultEvent.fromFields(FetchTicksResultEvent.bcs.parse(data))
  }

  toJSONField(): FetchTicksResultEventJSONField {
    return {
      ticks: fieldToJSON<Vector<Tick>>(`vector<${Tick.$typeName}>`, this.ticks),
    }
  }

  toJSON(): FetchTicksResultEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FetchTicksResultEvent {
    return FetchTicksResultEvent.reified().new({
      ticks: decodeFromJSONField(vector(Tick.reified()), field.ticks),
    })
  }

  static fromJSON(json: Record<string, any>): FetchTicksResultEvent {
    if (json.$typeName !== FetchTicksResultEvent.$typeName) {
      throw new Error(
        `not a FetchTicksResultEvent json object: expected '${FetchTicksResultEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FetchTicksResultEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FetchTicksResultEvent {
    if (!isFetchTicksResultEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FetchTicksResultEvent object`)
    }
    return FetchTicksResultEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchTicksResultEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FetchTicksResultEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFetchTicksResultEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a FetchTicksResultEvent object`,
      )
    }
    return FetchTicksResultEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchTicksResultEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FetchTicksResultEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFetchTicksResultEvent(data.bcs.type)) {
        throw new Error(`object at is not a FetchTicksResultEvent object`)
      }

      return FetchTicksResultEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FetchTicksResultEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FetchTicksResultEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFetchTicksResultEvent(object.type)) {
      throw new Error(`object at id ${id} is not a FetchTicksResultEvent object`)
    }
    return FetchTicksResultEvent.fromBcs(object.content)
  }
}

/* ============================== CalculatedSwapResultEvent =============================== */

export function isCalculatedSwapResultEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::CalculatedSwapResultEvent')
    }::fetcher_script::CalculatedSwapResultEvent`
}

export interface CalculatedSwapResultEventFields {
  data: ToField<CalculatedSwapResult>
}

export type CalculatedSwapResultEventReified = Reified<
  CalculatedSwapResultEvent,
  CalculatedSwapResultEventFields
>

export type CalculatedSwapResultEventJSONField = {
  data: ToJSON<CalculatedSwapResult>
}

export type CalculatedSwapResultEventJSON = {
  $typeName: typeof CalculatedSwapResultEvent.$typeName
  $typeArgs: []
} & CalculatedSwapResultEventJSONField

export class CalculatedSwapResultEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::fetcher_script::CalculatedSwapResultEvent` {
    return `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::CalculatedSwapResultEvent')
    }::fetcher_script::CalculatedSwapResultEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CalculatedSwapResultEvent.$typeName =
    CalculatedSwapResultEvent.$typeName
  readonly $fullTypeName: `${string}::fetcher_script::CalculatedSwapResultEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CalculatedSwapResultEvent.$isPhantom =
    CalculatedSwapResultEvent.$isPhantom

  readonly data: ToField<CalculatedSwapResult>

  private constructor(typeArgs: [], fields: CalculatedSwapResultEventFields) {
    this.$fullTypeName = composeSuiType(
      CalculatedSwapResultEvent.$typeName,
      ...typeArgs,
    ) as `${string}::fetcher_script::CalculatedSwapResultEvent`
    this.$typeArgs = typeArgs

    this.data = fields.data
  }

  static reified(): CalculatedSwapResultEventReified {
    const reifiedBcs = CalculatedSwapResultEvent.bcs
    return {
      get typeName() {
        return CalculatedSwapResultEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CalculatedSwapResultEvent.$typeName,
          ...[],
        ) as `${string}::fetcher_script::CalculatedSwapResultEvent`
      },
      typeArgs: [] as [],
      isPhantom: CalculatedSwapResultEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CalculatedSwapResultEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CalculatedSwapResultEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CalculatedSwapResultEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CalculatedSwapResultEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CalculatedSwapResultEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CalculatedSwapResultEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CalculatedSwapResultEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CalculatedSwapResultEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CalculatedSwapResultEvent.fetch(client, id),
      new: (fields: CalculatedSwapResultEventFields) => {
        return new CalculatedSwapResultEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CalculatedSwapResultEventReified {
    return CalculatedSwapResultEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CalculatedSwapResultEvent>> {
    return phantom(CalculatedSwapResultEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CalculatedSwapResultEvent>> {
    return CalculatedSwapResultEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CalculatedSwapResultEvent', {
      data: CalculatedSwapResult.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof CalculatedSwapResultEvent.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof CalculatedSwapResultEvent.instantiateBcs> {
    if (!CalculatedSwapResultEvent.cachedBcs) {
      CalculatedSwapResultEvent.cachedBcs = CalculatedSwapResultEvent.instantiateBcs()
    }
    return CalculatedSwapResultEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CalculatedSwapResultEvent {
    return CalculatedSwapResultEvent.reified().new({
      data: decodeFromFields(CalculatedSwapResult.reified(), fields.data),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CalculatedSwapResultEvent {
    if (!isCalculatedSwapResultEvent(item.type)) {
      throw new Error('not a CalculatedSwapResultEvent type')
    }

    return CalculatedSwapResultEvent.reified().new({
      data: decodeFromFieldsWithTypes(CalculatedSwapResult.reified(), item.fields.data),
    })
  }

  static fromBcs(data: Uint8Array): CalculatedSwapResultEvent {
    return CalculatedSwapResultEvent.fromFields(CalculatedSwapResultEvent.bcs.parse(data))
  }

  toJSONField(): CalculatedSwapResultEventJSONField {
    return {
      data: this.data.toJSONField(),
    }
  }

  toJSON(): CalculatedSwapResultEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CalculatedSwapResultEvent {
    return CalculatedSwapResultEvent.reified().new({
      data: decodeFromJSONField(CalculatedSwapResult.reified(), field.data),
    })
  }

  static fromJSON(json: Record<string, any>): CalculatedSwapResultEvent {
    if (json.$typeName !== CalculatedSwapResultEvent.$typeName) {
      throw new Error(
        `not a CalculatedSwapResultEvent json object: expected '${CalculatedSwapResultEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CalculatedSwapResultEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CalculatedSwapResultEvent {
    if (!isCalculatedSwapResultEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CalculatedSwapResultEvent object`)
    }
    return CalculatedSwapResultEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CalculatedSwapResultEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CalculatedSwapResultEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCalculatedSwapResultEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CalculatedSwapResultEvent object`,
      )
    }
    return CalculatedSwapResultEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CalculatedSwapResultEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CalculatedSwapResultEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCalculatedSwapResultEvent(data.bcs.type)) {
        throw new Error(`object at is not a CalculatedSwapResultEvent object`)
      }

      return CalculatedSwapResultEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CalculatedSwapResultEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CalculatedSwapResultEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCalculatedSwapResultEvent(object.type)) {
      throw new Error(`object at id ${id} is not a CalculatedSwapResultEvent object`)
    }
    return CalculatedSwapResultEvent.fromBcs(object.content)
  }
}

/* ============================== FetchPositionsEvent =============================== */

export function isFetchPositionsEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPositionsEvent')
    }::fetcher_script::FetchPositionsEvent`
}

export interface FetchPositionsEventFields {
  positions: ToField<Vector<PositionInfo>>
}

export type FetchPositionsEventReified = Reified<FetchPositionsEvent, FetchPositionsEventFields>

export type FetchPositionsEventJSONField = {
  positions: ToJSON<PositionInfo>[]
}

export type FetchPositionsEventJSON = {
  $typeName: typeof FetchPositionsEvent.$typeName
  $typeArgs: []
} & FetchPositionsEventJSONField

export class FetchPositionsEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::fetcher_script::FetchPositionsEvent` {
    return `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPositionsEvent')
    }::fetcher_script::FetchPositionsEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FetchPositionsEvent.$typeName = FetchPositionsEvent.$typeName
  readonly $fullTypeName: `${string}::fetcher_script::FetchPositionsEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FetchPositionsEvent.$isPhantom = FetchPositionsEvent.$isPhantom

  readonly positions: ToField<Vector<PositionInfo>>

  private constructor(typeArgs: [], fields: FetchPositionsEventFields) {
    this.$fullTypeName = composeSuiType(
      FetchPositionsEvent.$typeName,
      ...typeArgs,
    ) as `${string}::fetcher_script::FetchPositionsEvent`
    this.$typeArgs = typeArgs

    this.positions = fields.positions
  }

  static reified(): FetchPositionsEventReified {
    const reifiedBcs = FetchPositionsEvent.bcs
    return {
      get typeName() {
        return FetchPositionsEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FetchPositionsEvent.$typeName,
          ...[],
        ) as `${string}::fetcher_script::FetchPositionsEvent`
      },
      typeArgs: [] as [],
      isPhantom: FetchPositionsEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FetchPositionsEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FetchPositionsEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FetchPositionsEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FetchPositionsEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FetchPositionsEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FetchPositionsEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => FetchPositionsEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FetchPositionsEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => FetchPositionsEvent.fetch(client, id),
      new: (fields: FetchPositionsEventFields) => {
        return new FetchPositionsEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FetchPositionsEventReified {
    return FetchPositionsEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FetchPositionsEvent>> {
    return phantom(FetchPositionsEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FetchPositionsEvent>> {
    return FetchPositionsEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FetchPositionsEvent', {
      positions: bcs.vector(PositionInfo.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof FetchPositionsEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FetchPositionsEvent.instantiateBcs> {
    if (!FetchPositionsEvent.cachedBcs) {
      FetchPositionsEvent.cachedBcs = FetchPositionsEvent.instantiateBcs()
    }
    return FetchPositionsEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FetchPositionsEvent {
    return FetchPositionsEvent.reified().new({
      positions: decodeFromFields(vector(PositionInfo.reified()), fields.positions),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FetchPositionsEvent {
    if (!isFetchPositionsEvent(item.type)) {
      throw new Error('not a FetchPositionsEvent type')
    }

    return FetchPositionsEvent.reified().new({
      positions: decodeFromFieldsWithTypes(vector(PositionInfo.reified()), item.fields.positions),
    })
  }

  static fromBcs(data: Uint8Array): FetchPositionsEvent {
    return FetchPositionsEvent.fromFields(FetchPositionsEvent.bcs.parse(data))
  }

  toJSONField(): FetchPositionsEventJSONField {
    return {
      positions: fieldToJSON<Vector<PositionInfo>>(
        `vector<${PositionInfo.$typeName}>`,
        this.positions,
      ),
    }
  }

  toJSON(): FetchPositionsEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FetchPositionsEvent {
    return FetchPositionsEvent.reified().new({
      positions: decodeFromJSONField(vector(PositionInfo.reified()), field.positions),
    })
  }

  static fromJSON(json: Record<string, any>): FetchPositionsEvent {
    if (json.$typeName !== FetchPositionsEvent.$typeName) {
      throw new Error(
        `not a FetchPositionsEvent json object: expected '${FetchPositionsEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FetchPositionsEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FetchPositionsEvent {
    if (!isFetchPositionsEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FetchPositionsEvent object`)
    }
    return FetchPositionsEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPositionsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FetchPositionsEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFetchPositionsEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FetchPositionsEvent object`)
    }
    return FetchPositionsEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPositionsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FetchPositionsEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFetchPositionsEvent(data.bcs.type)) {
        throw new Error(`object at is not a FetchPositionsEvent object`)
      }

      return FetchPositionsEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FetchPositionsEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FetchPositionsEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFetchPositionsEvent(object.type)) {
      throw new Error(`object at id ${id} is not a FetchPositionsEvent object`)
    }
    return FetchPositionsEvent.fromBcs(object.content)
  }
}

/* ============================== FetchPoolsEvent =============================== */

export function isFetchPoolsEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPoolsEvent')
    }::fetcher_script::FetchPoolsEvent`
}

export interface FetchPoolsEventFields {
  pools: ToField<Vector<PoolSimpleInfo>>
}

export type FetchPoolsEventReified = Reified<FetchPoolsEvent, FetchPoolsEventFields>

export type FetchPoolsEventJSONField = {
  pools: ToJSON<PoolSimpleInfo>[]
}

export type FetchPoolsEventJSON = {
  $typeName: typeof FetchPoolsEvent.$typeName
  $typeArgs: []
} & FetchPoolsEventJSONField

export class FetchPoolsEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::fetcher_script::FetchPoolsEvent` {
    return `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPoolsEvent')
    }::fetcher_script::FetchPoolsEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FetchPoolsEvent.$typeName = FetchPoolsEvent.$typeName
  readonly $fullTypeName: `${string}::fetcher_script::FetchPoolsEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FetchPoolsEvent.$isPhantom = FetchPoolsEvent.$isPhantom

  readonly pools: ToField<Vector<PoolSimpleInfo>>

  private constructor(typeArgs: [], fields: FetchPoolsEventFields) {
    this.$fullTypeName = composeSuiType(
      FetchPoolsEvent.$typeName,
      ...typeArgs,
    ) as `${string}::fetcher_script::FetchPoolsEvent`
    this.$typeArgs = typeArgs

    this.pools = fields.pools
  }

  static reified(): FetchPoolsEventReified {
    const reifiedBcs = FetchPoolsEvent.bcs
    return {
      get typeName() {
        return FetchPoolsEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FetchPoolsEvent.$typeName,
          ...[],
        ) as `${string}::fetcher_script::FetchPoolsEvent`
      },
      typeArgs: [] as [],
      isPhantom: FetchPoolsEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FetchPoolsEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FetchPoolsEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FetchPoolsEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FetchPoolsEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FetchPoolsEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FetchPoolsEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => FetchPoolsEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FetchPoolsEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => FetchPoolsEvent.fetch(client, id),
      new: (fields: FetchPoolsEventFields) => {
        return new FetchPoolsEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FetchPoolsEventReified {
    return FetchPoolsEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FetchPoolsEvent>> {
    return phantom(FetchPoolsEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FetchPoolsEvent>> {
    return FetchPoolsEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FetchPoolsEvent', {
      pools: bcs.vector(PoolSimpleInfo.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof FetchPoolsEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FetchPoolsEvent.instantiateBcs> {
    if (!FetchPoolsEvent.cachedBcs) {
      FetchPoolsEvent.cachedBcs = FetchPoolsEvent.instantiateBcs()
    }
    return FetchPoolsEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FetchPoolsEvent {
    return FetchPoolsEvent.reified().new({
      pools: decodeFromFields(vector(PoolSimpleInfo.reified()), fields.pools),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FetchPoolsEvent {
    if (!isFetchPoolsEvent(item.type)) {
      throw new Error('not a FetchPoolsEvent type')
    }

    return FetchPoolsEvent.reified().new({
      pools: decodeFromFieldsWithTypes(vector(PoolSimpleInfo.reified()), item.fields.pools),
    })
  }

  static fromBcs(data: Uint8Array): FetchPoolsEvent {
    return FetchPoolsEvent.fromFields(FetchPoolsEvent.bcs.parse(data))
  }

  toJSONField(): FetchPoolsEventJSONField {
    return {
      pools: fieldToJSON<Vector<PoolSimpleInfo>>(`vector<${PoolSimpleInfo.$typeName}>`, this.pools),
    }
  }

  toJSON(): FetchPoolsEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FetchPoolsEvent {
    return FetchPoolsEvent.reified().new({
      pools: decodeFromJSONField(vector(PoolSimpleInfo.reified()), field.pools),
    })
  }

  static fromJSON(json: Record<string, any>): FetchPoolsEvent {
    if (json.$typeName !== FetchPoolsEvent.$typeName) {
      throw new Error(
        `not a FetchPoolsEvent json object: expected '${FetchPoolsEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FetchPoolsEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FetchPoolsEvent {
    if (!isFetchPoolsEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FetchPoolsEvent object`)
    }
    return FetchPoolsEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPoolsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FetchPoolsEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFetchPoolsEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FetchPoolsEvent object`)
    }
    return FetchPoolsEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPoolsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FetchPoolsEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFetchPoolsEvent(data.bcs.type)) {
        throw new Error(`object at is not a FetchPoolsEvent object`)
      }

      return FetchPoolsEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FetchPoolsEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FetchPoolsEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFetchPoolsEvent(object.type)) {
      throw new Error(`object at id ${id} is not a FetchPoolsEvent object`)
    }
    return FetchPoolsEvent.fromBcs(object.content)
  }
}

/* ============================== FetchPositionRewardsEvent =============================== */

export function isFetchPositionRewardsEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPositionRewardsEvent')
    }::fetcher_script::FetchPositionRewardsEvent`
}

export interface FetchPositionRewardsEventFields {
  data: ToField<Vector<'u64'>>
  positionId: ToField<ID>
}

export type FetchPositionRewardsEventReified = Reified<
  FetchPositionRewardsEvent,
  FetchPositionRewardsEventFields
>

export type FetchPositionRewardsEventJSONField = {
  data: string[]
  positionId: string
}

export type FetchPositionRewardsEventJSON = {
  $typeName: typeof FetchPositionRewardsEvent.$typeName
  $typeArgs: []
} & FetchPositionRewardsEventJSONField

export class FetchPositionRewardsEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::fetcher_script::FetchPositionRewardsEvent` {
    return `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPositionRewardsEvent')
    }::fetcher_script::FetchPositionRewardsEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FetchPositionRewardsEvent.$typeName =
    FetchPositionRewardsEvent.$typeName
  readonly $fullTypeName: `${string}::fetcher_script::FetchPositionRewardsEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FetchPositionRewardsEvent.$isPhantom =
    FetchPositionRewardsEvent.$isPhantom

  readonly data: ToField<Vector<'u64'>>
  readonly positionId: ToField<ID>

  private constructor(typeArgs: [], fields: FetchPositionRewardsEventFields) {
    this.$fullTypeName = composeSuiType(
      FetchPositionRewardsEvent.$typeName,
      ...typeArgs,
    ) as `${string}::fetcher_script::FetchPositionRewardsEvent`
    this.$typeArgs = typeArgs

    this.data = fields.data
    this.positionId = fields.positionId
  }

  static reified(): FetchPositionRewardsEventReified {
    const reifiedBcs = FetchPositionRewardsEvent.bcs
    return {
      get typeName() {
        return FetchPositionRewardsEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FetchPositionRewardsEvent.$typeName,
          ...[],
        ) as `${string}::fetcher_script::FetchPositionRewardsEvent`
      },
      typeArgs: [] as [],
      isPhantom: FetchPositionRewardsEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FetchPositionRewardsEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        FetchPositionRewardsEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FetchPositionRewardsEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FetchPositionRewardsEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FetchPositionRewardsEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FetchPositionRewardsEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        FetchPositionRewardsEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        FetchPositionRewardsEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        FetchPositionRewardsEvent.fetch(client, id),
      new: (fields: FetchPositionRewardsEventFields) => {
        return new FetchPositionRewardsEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FetchPositionRewardsEventReified {
    return FetchPositionRewardsEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FetchPositionRewardsEvent>> {
    return phantom(FetchPositionRewardsEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FetchPositionRewardsEvent>> {
    return FetchPositionRewardsEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FetchPositionRewardsEvent', {
      data: bcs.vector(bcs.u64()),
      position_id: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof FetchPositionRewardsEvent.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof FetchPositionRewardsEvent.instantiateBcs> {
    if (!FetchPositionRewardsEvent.cachedBcs) {
      FetchPositionRewardsEvent.cachedBcs = FetchPositionRewardsEvent.instantiateBcs()
    }
    return FetchPositionRewardsEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FetchPositionRewardsEvent {
    return FetchPositionRewardsEvent.reified().new({
      data: decodeFromFields(vector('u64'), fields.data),
      positionId: decodeFromFields(ID.reified(), fields.position_id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FetchPositionRewardsEvent {
    if (!isFetchPositionRewardsEvent(item.type)) {
      throw new Error('not a FetchPositionRewardsEvent type')
    }

    return FetchPositionRewardsEvent.reified().new({
      data: decodeFromFieldsWithTypes(vector('u64'), item.fields.data),
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
    })
  }

  static fromBcs(data: Uint8Array): FetchPositionRewardsEvent {
    return FetchPositionRewardsEvent.fromFields(FetchPositionRewardsEvent.bcs.parse(data))
  }

  toJSONField(): FetchPositionRewardsEventJSONField {
    return {
      data: fieldToJSON<Vector<'u64'>>(`vector<u64>`, this.data),
      positionId: this.positionId,
    }
  }

  toJSON(): FetchPositionRewardsEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FetchPositionRewardsEvent {
    return FetchPositionRewardsEvent.reified().new({
      data: decodeFromJSONField(vector('u64'), field.data),
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
    })
  }

  static fromJSON(json: Record<string, any>): FetchPositionRewardsEvent {
    if (json.$typeName !== FetchPositionRewardsEvent.$typeName) {
      throw new Error(
        `not a FetchPositionRewardsEvent json object: expected '${FetchPositionRewardsEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FetchPositionRewardsEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FetchPositionRewardsEvent {
    if (!isFetchPositionRewardsEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FetchPositionRewardsEvent object`)
    }
    return FetchPositionRewardsEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPositionRewardsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FetchPositionRewardsEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFetchPositionRewardsEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a FetchPositionRewardsEvent object`,
      )
    }
    return FetchPositionRewardsEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPositionRewardsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FetchPositionRewardsEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFetchPositionRewardsEvent(data.bcs.type)) {
        throw new Error(`object at is not a FetchPositionRewardsEvent object`)
      }

      return FetchPositionRewardsEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FetchPositionRewardsEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FetchPositionRewardsEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFetchPositionRewardsEvent(object.type)) {
      throw new Error(`object at id ${id} is not a FetchPositionRewardsEvent object`)
    }
    return FetchPositionRewardsEvent.fromBcs(object.content)
  }
}

/* ============================== FetchPositionFeesEvent =============================== */

export function isFetchPositionFeesEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPositionFeesEvent')
    }::fetcher_script::FetchPositionFeesEvent`
}

export interface FetchPositionFeesEventFields {
  positionId: ToField<ID>
  feeOwnedA: ToField<'u64'>
  feeOwnedB: ToField<'u64'>
}

export type FetchPositionFeesEventReified = Reified<
  FetchPositionFeesEvent,
  FetchPositionFeesEventFields
>

export type FetchPositionFeesEventJSONField = {
  positionId: string
  feeOwnedA: string
  feeOwnedB: string
}

export type FetchPositionFeesEventJSON = {
  $typeName: typeof FetchPositionFeesEvent.$typeName
  $typeArgs: []
} & FetchPositionFeesEventJSONField

export class FetchPositionFeesEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::fetcher_script::FetchPositionFeesEvent` {
    return `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPositionFeesEvent')
    }::fetcher_script::FetchPositionFeesEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FetchPositionFeesEvent.$typeName = FetchPositionFeesEvent.$typeName
  readonly $fullTypeName: `${string}::fetcher_script::FetchPositionFeesEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FetchPositionFeesEvent.$isPhantom = FetchPositionFeesEvent.$isPhantom

  readonly positionId: ToField<ID>
  readonly feeOwnedA: ToField<'u64'>
  readonly feeOwnedB: ToField<'u64'>

  private constructor(typeArgs: [], fields: FetchPositionFeesEventFields) {
    this.$fullTypeName = composeSuiType(
      FetchPositionFeesEvent.$typeName,
      ...typeArgs,
    ) as `${string}::fetcher_script::FetchPositionFeesEvent`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.feeOwnedA = fields.feeOwnedA
    this.feeOwnedB = fields.feeOwnedB
  }

  static reified(): FetchPositionFeesEventReified {
    const reifiedBcs = FetchPositionFeesEvent.bcs
    return {
      get typeName() {
        return FetchPositionFeesEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FetchPositionFeesEvent.$typeName,
          ...[],
        ) as `${string}::fetcher_script::FetchPositionFeesEvent`
      },
      typeArgs: [] as [],
      isPhantom: FetchPositionFeesEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FetchPositionFeesEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        FetchPositionFeesEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FetchPositionFeesEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FetchPositionFeesEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FetchPositionFeesEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FetchPositionFeesEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        FetchPositionFeesEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        FetchPositionFeesEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        FetchPositionFeesEvent.fetch(client, id),
      new: (fields: FetchPositionFeesEventFields) => {
        return new FetchPositionFeesEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FetchPositionFeesEventReified {
    return FetchPositionFeesEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FetchPositionFeesEvent>> {
    return phantom(FetchPositionFeesEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FetchPositionFeesEvent>> {
    return FetchPositionFeesEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FetchPositionFeesEvent', {
      position_id: ID.bcs,
      fee_owned_a: bcs.u64(),
      fee_owned_b: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof FetchPositionFeesEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FetchPositionFeesEvent.instantiateBcs> {
    if (!FetchPositionFeesEvent.cachedBcs) {
      FetchPositionFeesEvent.cachedBcs = FetchPositionFeesEvent.instantiateBcs()
    }
    return FetchPositionFeesEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FetchPositionFeesEvent {
    return FetchPositionFeesEvent.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      feeOwnedA: decodeFromFields('u64', fields.fee_owned_a),
      feeOwnedB: decodeFromFields('u64', fields.fee_owned_b),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FetchPositionFeesEvent {
    if (!isFetchPositionFeesEvent(item.type)) {
      throw new Error('not a FetchPositionFeesEvent type')
    }

    return FetchPositionFeesEvent.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      feeOwnedA: decodeFromFieldsWithTypes('u64', item.fields.fee_owned_a),
      feeOwnedB: decodeFromFieldsWithTypes('u64', item.fields.fee_owned_b),
    })
  }

  static fromBcs(data: Uint8Array): FetchPositionFeesEvent {
    return FetchPositionFeesEvent.fromFields(FetchPositionFeesEvent.bcs.parse(data))
  }

  toJSONField(): FetchPositionFeesEventJSONField {
    return {
      positionId: this.positionId,
      feeOwnedA: this.feeOwnedA.toString(),
      feeOwnedB: this.feeOwnedB.toString(),
    }
  }

  toJSON(): FetchPositionFeesEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FetchPositionFeesEvent {
    return FetchPositionFeesEvent.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      feeOwnedA: decodeFromJSONField('u64', field.feeOwnedA),
      feeOwnedB: decodeFromJSONField('u64', field.feeOwnedB),
    })
  }

  static fromJSON(json: Record<string, any>): FetchPositionFeesEvent {
    if (json.$typeName !== FetchPositionFeesEvent.$typeName) {
      throw new Error(
        `not a FetchPositionFeesEvent json object: expected '${FetchPositionFeesEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FetchPositionFeesEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FetchPositionFeesEvent {
    if (!isFetchPositionFeesEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FetchPositionFeesEvent object`)
    }
    return FetchPositionFeesEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPositionFeesEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FetchPositionFeesEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFetchPositionFeesEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a FetchPositionFeesEvent object`,
      )
    }
    return FetchPositionFeesEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPositionFeesEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FetchPositionFeesEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFetchPositionFeesEvent(data.bcs.type)) {
        throw new Error(`object at is not a FetchPositionFeesEvent object`)
      }

      return FetchPositionFeesEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FetchPositionFeesEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FetchPositionFeesEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFetchPositionFeesEvent(object.type)) {
      throw new Error(`object at id ${id} is not a FetchPositionFeesEvent object`)
    }
    return FetchPositionFeesEvent.fromBcs(object.content)
  }
}

/* ============================== FetchPositionPointsEvent =============================== */

export function isFetchPositionPointsEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPositionPointsEvent')
    }::fetcher_script::FetchPositionPointsEvent`
}

export interface FetchPositionPointsEventFields {
  positionId: ToField<ID>
  pointsOwned: ToField<'u128'>
}

export type FetchPositionPointsEventReified = Reified<
  FetchPositionPointsEvent,
  FetchPositionPointsEventFields
>

export type FetchPositionPointsEventJSONField = {
  positionId: string
  pointsOwned: string
}

export type FetchPositionPointsEventJSON = {
  $typeName: typeof FetchPositionPointsEvent.$typeName
  $typeArgs: []
} & FetchPositionPointsEventJSONField

export class FetchPositionPointsEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::fetcher_script::FetchPositionPointsEvent` {
    return `${
      getTypeOrigin('cetus-integrate', 'fetcher_script::FetchPositionPointsEvent')
    }::fetcher_script::FetchPositionPointsEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FetchPositionPointsEvent.$typeName = FetchPositionPointsEvent.$typeName
  readonly $fullTypeName: `${string}::fetcher_script::FetchPositionPointsEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FetchPositionPointsEvent.$isPhantom =
    FetchPositionPointsEvent.$isPhantom

  readonly positionId: ToField<ID>
  readonly pointsOwned: ToField<'u128'>

  private constructor(typeArgs: [], fields: FetchPositionPointsEventFields) {
    this.$fullTypeName = composeSuiType(
      FetchPositionPointsEvent.$typeName,
      ...typeArgs,
    ) as `${string}::fetcher_script::FetchPositionPointsEvent`
    this.$typeArgs = typeArgs

    this.positionId = fields.positionId
    this.pointsOwned = fields.pointsOwned
  }

  static reified(): FetchPositionPointsEventReified {
    const reifiedBcs = FetchPositionPointsEvent.bcs
    return {
      get typeName() {
        return FetchPositionPointsEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FetchPositionPointsEvent.$typeName,
          ...[],
        ) as `${string}::fetcher_script::FetchPositionPointsEvent`
      },
      typeArgs: [] as [],
      isPhantom: FetchPositionPointsEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FetchPositionPointsEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        FetchPositionPointsEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FetchPositionPointsEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FetchPositionPointsEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FetchPositionPointsEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FetchPositionPointsEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        FetchPositionPointsEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        FetchPositionPointsEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        FetchPositionPointsEvent.fetch(client, id),
      new: (fields: FetchPositionPointsEventFields) => {
        return new FetchPositionPointsEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FetchPositionPointsEventReified {
    return FetchPositionPointsEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FetchPositionPointsEvent>> {
    return phantom(FetchPositionPointsEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FetchPositionPointsEvent>> {
    return FetchPositionPointsEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FetchPositionPointsEvent', {
      position_id: ID.bcs,
      points_owned: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof FetchPositionPointsEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FetchPositionPointsEvent.instantiateBcs> {
    if (!FetchPositionPointsEvent.cachedBcs) {
      FetchPositionPointsEvent.cachedBcs = FetchPositionPointsEvent.instantiateBcs()
    }
    return FetchPositionPointsEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FetchPositionPointsEvent {
    return FetchPositionPointsEvent.reified().new({
      positionId: decodeFromFields(ID.reified(), fields.position_id),
      pointsOwned: decodeFromFields('u128', fields.points_owned),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FetchPositionPointsEvent {
    if (!isFetchPositionPointsEvent(item.type)) {
      throw new Error('not a FetchPositionPointsEvent type')
    }

    return FetchPositionPointsEvent.reified().new({
      positionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.position_id),
      pointsOwned: decodeFromFieldsWithTypes('u128', item.fields.points_owned),
    })
  }

  static fromBcs(data: Uint8Array): FetchPositionPointsEvent {
    return FetchPositionPointsEvent.fromFields(FetchPositionPointsEvent.bcs.parse(data))
  }

  toJSONField(): FetchPositionPointsEventJSONField {
    return {
      positionId: this.positionId,
      pointsOwned: this.pointsOwned.toString(),
    }
  }

  toJSON(): FetchPositionPointsEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FetchPositionPointsEvent {
    return FetchPositionPointsEvent.reified().new({
      positionId: decodeFromJSONField(ID.reified(), field.positionId),
      pointsOwned: decodeFromJSONField('u128', field.pointsOwned),
    })
  }

  static fromJSON(json: Record<string, any>): FetchPositionPointsEvent {
    if (json.$typeName !== FetchPositionPointsEvent.$typeName) {
      throw new Error(
        `not a FetchPositionPointsEvent json object: expected '${FetchPositionPointsEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FetchPositionPointsEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FetchPositionPointsEvent {
    if (!isFetchPositionPointsEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FetchPositionPointsEvent object`)
    }
    return FetchPositionPointsEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPositionPointsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FetchPositionPointsEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFetchPositionPointsEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a FetchPositionPointsEvent object`,
      )
    }
    return FetchPositionPointsEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FetchPositionPointsEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FetchPositionPointsEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFetchPositionPointsEvent(data.bcs.type)) {
        throw new Error(`object at is not a FetchPositionPointsEvent object`)
      }

      return FetchPositionPointsEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FetchPositionPointsEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FetchPositionPointsEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFetchPositionPointsEvent(object.type)) {
      throw new Error(`object at id ${id} is not a FetchPositionPointsEvent object`)
    }
    return FetchPositionPointsEvent.fromBcs(object.content)
  }
}
