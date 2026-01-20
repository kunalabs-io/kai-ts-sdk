import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
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
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { TypeName } from '../../../std/type-name/structs'

/* ============================== Limiter =============================== */

export function isLimiter(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('scallop-protocol', 'limiter::Limiter')}::limiter::Limiter`
}

export interface LimiterFields {
  outflowLimit: ToField<'u64'>
  outflowCycleDuration: ToField<'u32'>
  outflowSegmentDuration: ToField<'u32'>
  outflowSegments: ToField<Vector<Segment>>
}

export type LimiterReified = Reified<Limiter, LimiterFields>

export type LimiterJSONField = {
  outflowLimit: string
  outflowCycleDuration: number
  outflowSegmentDuration: number
  outflowSegments: ToJSON<Segment>[]
}

export type LimiterJSON = {
  $typeName: typeof Limiter.$typeName
  $typeArgs: []
} & LimiterJSONField

export class Limiter implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::Limiter` = `${
    getTypeOrigin('scallop-protocol', 'limiter::Limiter')
  }::limiter::Limiter` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Limiter.$typeName = Limiter.$typeName
  readonly $fullTypeName: `${string}::limiter::Limiter`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Limiter.$isPhantom = Limiter.$isPhantom

  readonly outflowLimit: ToField<'u64'>
  readonly outflowCycleDuration: ToField<'u32'>
  readonly outflowSegmentDuration: ToField<'u32'>
  readonly outflowSegments: ToField<Vector<Segment>>

  private constructor(typeArgs: [], fields: LimiterFields) {
    this.$fullTypeName = composeSuiType(
      Limiter.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::Limiter`
    this.$typeArgs = typeArgs

    this.outflowLimit = fields.outflowLimit
    this.outflowCycleDuration = fields.outflowCycleDuration
    this.outflowSegmentDuration = fields.outflowSegmentDuration
    this.outflowSegments = fields.outflowSegments
  }

  static reified(): LimiterReified {
    const reifiedBcs = Limiter.bcs
    return {
      typeName: Limiter.$typeName,
      fullTypeName: composeSuiType(
        Limiter.$typeName,
        ...[],
      ) as `${string}::limiter::Limiter`,
      typeArgs: [] as [],
      isPhantom: Limiter.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Limiter.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Limiter.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Limiter.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Limiter.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Limiter.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Limiter.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Limiter.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Limiter.fetch(client, id),
      new: (fields: LimiterFields) => {
        return new Limiter([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LimiterReified {
    return Limiter.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Limiter>> {
    return phantom(Limiter.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Limiter>> {
    return Limiter.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Limiter', {
      outflow_limit: bcs.u64(),
      outflow_cycle_duration: bcs.u32(),
      outflow_segment_duration: bcs.u32(),
      outflow_segments: bcs.vector(Segment.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof Limiter.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Limiter.instantiateBcs> {
    if (!Limiter.cachedBcs) {
      Limiter.cachedBcs = Limiter.instantiateBcs()
    }
    return Limiter.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Limiter {
    return Limiter.reified().new({
      outflowLimit: decodeFromFields('u64', fields.outflow_limit),
      outflowCycleDuration: decodeFromFields('u32', fields.outflow_cycle_duration),
      outflowSegmentDuration: decodeFromFields('u32', fields.outflow_segment_duration),
      outflowSegments: decodeFromFields(vector(Segment.reified()), fields.outflow_segments),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Limiter {
    if (!isLimiter(item.type)) {
      throw new Error('not a Limiter type')
    }

    return Limiter.reified().new({
      outflowLimit: decodeFromFieldsWithTypes('u64', item.fields.outflow_limit),
      outflowCycleDuration: decodeFromFieldsWithTypes('u32', item.fields.outflow_cycle_duration),
      outflowSegmentDuration: decodeFromFieldsWithTypes(
        'u32',
        item.fields.outflow_segment_duration,
      ),
      outflowSegments: decodeFromFieldsWithTypes(
        vector(Segment.reified()),
        item.fields.outflow_segments,
      ),
    })
  }

  static fromBcs(data: Uint8Array): Limiter {
    return Limiter.fromFields(Limiter.bcs.parse(data))
  }

  toJSONField(): LimiterJSONField {
    return {
      outflowLimit: this.outflowLimit.toString(),
      outflowCycleDuration: this.outflowCycleDuration,
      outflowSegmentDuration: this.outflowSegmentDuration,
      outflowSegments: fieldToJSON<Vector<Segment>>(
        `vector<${Segment.$typeName}>`,
        this.outflowSegments,
      ),
    }
  }

  toJSON(): LimiterJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Limiter {
    return Limiter.reified().new({
      outflowLimit: decodeFromJSONField('u64', field.outflowLimit),
      outflowCycleDuration: decodeFromJSONField('u32', field.outflowCycleDuration),
      outflowSegmentDuration: decodeFromJSONField('u32', field.outflowSegmentDuration),
      outflowSegments: decodeFromJSONField(vector(Segment.reified()), field.outflowSegments),
    })
  }

  static fromJSON(json: Record<string, any>): Limiter {
    if (json.$typeName !== Limiter.$typeName) {
      throw new Error(
        `not a Limiter json object: expected '${Limiter.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Limiter.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Limiter {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiter(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Limiter object`)
    }
    return Limiter.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Limiter {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiter(data.bcs.type)) {
        throw new Error(`object at is not a Limiter object`)
      }

      return Limiter.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Limiter.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Limiter> {
    const res = await fetchObjectBcs(client, id)
    if (!isLimiter(res.type)) {
      throw new Error(`object at id ${id} is not a Limiter object`)
    }

    return Limiter.fromBcs(res.bcsBytes)
  }
}

/* ============================== Limiters =============================== */

export function isLimiters(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('scallop-protocol', 'limiter::Limiters')}::limiter::Limiters`
}

export interface LimitersFields {
  dummyField: ToField<'bool'>
}

export type LimitersReified = Reified<Limiters, LimitersFields>

export type LimitersJSONField = {
  dummyField: boolean
}

export type LimitersJSON = {
  $typeName: typeof Limiters.$typeName
  $typeArgs: []
} & LimitersJSONField

export class Limiters implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::Limiters` = `${
    getTypeOrigin('scallop-protocol', 'limiter::Limiters')
  }::limiter::Limiters` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Limiters.$typeName = Limiters.$typeName
  readonly $fullTypeName: `${string}::limiter::Limiters`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Limiters.$isPhantom = Limiters.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: LimitersFields) {
    this.$fullTypeName = composeSuiType(
      Limiters.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::Limiters`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): LimitersReified {
    const reifiedBcs = Limiters.bcs
    return {
      typeName: Limiters.$typeName,
      fullTypeName: composeSuiType(
        Limiters.$typeName,
        ...[],
      ) as `${string}::limiter::Limiters`,
      typeArgs: [] as [],
      isPhantom: Limiters.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Limiters.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Limiters.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Limiters.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Limiters.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Limiters.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Limiters.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Limiters.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Limiters.fetch(client, id),
      new: (fields: LimitersFields) => {
        return new Limiters([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LimitersReified {
    return Limiters.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Limiters>> {
    return phantom(Limiters.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Limiters>> {
    return Limiters.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Limiters', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Limiters.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Limiters.instantiateBcs> {
    if (!Limiters.cachedBcs) {
      Limiters.cachedBcs = Limiters.instantiateBcs()
    }
    return Limiters.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Limiters {
    return Limiters.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Limiters {
    if (!isLimiters(item.type)) {
      throw new Error('not a Limiters type')
    }

    return Limiters.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): Limiters {
    return Limiters.fromFields(Limiters.bcs.parse(data))
  }

  toJSONField(): LimitersJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): LimitersJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Limiters {
    return Limiters.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): Limiters {
    if (json.$typeName !== Limiters.$typeName) {
      throw new Error(
        `not a Limiters json object: expected '${Limiters.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Limiters.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Limiters {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiters(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Limiters object`)
    }
    return Limiters.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Limiters {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiters(data.bcs.type)) {
        throw new Error(`object at is not a Limiters object`)
      }

      return Limiters.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Limiters.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Limiters> {
    const res = await fetchObjectBcs(client, id)
    if (!isLimiters(res.type)) {
      throw new Error(`object at id ${id} is not a Limiters object`)
    }

    return Limiters.fromBcs(res.bcsBytes)
  }
}

/* ============================== Segment =============================== */

export function isSegment(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('scallop-protocol', 'limiter::Segment')}::limiter::Segment`
}

export interface SegmentFields {
  index: ToField<'u64'>
  value: ToField<'u64'>
}

export type SegmentReified = Reified<Segment, SegmentFields>

export type SegmentJSONField = {
  index: string
  value: string
}

export type SegmentJSON = {
  $typeName: typeof Segment.$typeName
  $typeArgs: []
} & SegmentJSONField

export class Segment implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::Segment` = `${
    getTypeOrigin('scallop-protocol', 'limiter::Segment')
  }::limiter::Segment` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Segment.$typeName = Segment.$typeName
  readonly $fullTypeName: `${string}::limiter::Segment`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Segment.$isPhantom = Segment.$isPhantom

  readonly index: ToField<'u64'>
  readonly value: ToField<'u64'>

  private constructor(typeArgs: [], fields: SegmentFields) {
    this.$fullTypeName = composeSuiType(
      Segment.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::Segment`
    this.$typeArgs = typeArgs

    this.index = fields.index
    this.value = fields.value
  }

  static reified(): SegmentReified {
    const reifiedBcs = Segment.bcs
    return {
      typeName: Segment.$typeName,
      fullTypeName: composeSuiType(
        Segment.$typeName,
        ...[],
      ) as `${string}::limiter::Segment`,
      typeArgs: [] as [],
      isPhantom: Segment.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Segment.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Segment.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Segment.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Segment.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Segment.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Segment.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Segment.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Segment.fetch(client, id),
      new: (fields: SegmentFields) => {
        return new Segment([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SegmentReified {
    return Segment.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Segment>> {
    return phantom(Segment.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Segment>> {
    return Segment.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Segment', {
      index: bcs.u64(),
      value: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Segment.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Segment.instantiateBcs> {
    if (!Segment.cachedBcs) {
      Segment.cachedBcs = Segment.instantiateBcs()
    }
    return Segment.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Segment {
    return Segment.reified().new({
      index: decodeFromFields('u64', fields.index),
      value: decodeFromFields('u64', fields.value),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Segment {
    if (!isSegment(item.type)) {
      throw new Error('not a Segment type')
    }

    return Segment.reified().new({
      index: decodeFromFieldsWithTypes('u64', item.fields.index),
      value: decodeFromFieldsWithTypes('u64', item.fields.value),
    })
  }

  static fromBcs(data: Uint8Array): Segment {
    return Segment.fromFields(Segment.bcs.parse(data))
  }

  toJSONField(): SegmentJSONField {
    return {
      index: this.index.toString(),
      value: this.value.toString(),
    }
  }

  toJSON(): SegmentJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Segment {
    return Segment.reified().new({
      index: decodeFromJSONField('u64', field.index),
      value: decodeFromJSONField('u64', field.value),
    })
  }

  static fromJSON(json: Record<string, any>): Segment {
    if (json.$typeName !== Segment.$typeName) {
      throw new Error(
        `not a Segment json object: expected '${Segment.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Segment.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Segment {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSegment(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Segment object`)
    }
    return Segment.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Segment {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSegment(data.bcs.type)) {
        throw new Error(`object at is not a Segment object`)
      }

      return Segment.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Segment.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Segment> {
    const res = await fetchObjectBcs(client, id)
    if (!isSegment(res.type)) {
      throw new Error(`object at id ${id} is not a Segment object`)
    }

    return Segment.fromBcs(res.bcsBytes)
  }
}

/* ============================== LimiterUpdateLimitChangeCreatedEvent =============================== */

export function isLimiterUpdateLimitChangeCreatedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'limiter::LimiterUpdateLimitChangeCreatedEvent')
    }::limiter::LimiterUpdateLimitChangeCreatedEvent`
}

export interface LimiterUpdateLimitChangeCreatedEventFields {
  changes: ToField<LimiterUpdateLimitChange>
  currentEpoch: ToField<'u64'>
  delayEpoches: ToField<'u64'>
  effectiveEpoches: ToField<'u64'>
}

export type LimiterUpdateLimitChangeCreatedEventReified = Reified<
  LimiterUpdateLimitChangeCreatedEvent,
  LimiterUpdateLimitChangeCreatedEventFields
>

export type LimiterUpdateLimitChangeCreatedEventJSONField = {
  changes: ToJSON<LimiterUpdateLimitChange>
  currentEpoch: string
  delayEpoches: string
  effectiveEpoches: string
}

export type LimiterUpdateLimitChangeCreatedEventJSON = {
  $typeName: typeof LimiterUpdateLimitChangeCreatedEvent.$typeName
  $typeArgs: []
} & LimiterUpdateLimitChangeCreatedEventJSONField

export class LimiterUpdateLimitChangeCreatedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::LimiterUpdateLimitChangeCreatedEvent` = `${
    getTypeOrigin('scallop-protocol', 'limiter::LimiterUpdateLimitChangeCreatedEvent')
  }::limiter::LimiterUpdateLimitChangeCreatedEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LimiterUpdateLimitChangeCreatedEvent.$typeName =
    LimiterUpdateLimitChangeCreatedEvent.$typeName
  readonly $fullTypeName: `${string}::limiter::LimiterUpdateLimitChangeCreatedEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LimiterUpdateLimitChangeCreatedEvent.$isPhantom =
    LimiterUpdateLimitChangeCreatedEvent.$isPhantom

  readonly changes: ToField<LimiterUpdateLimitChange>
  readonly currentEpoch: ToField<'u64'>
  readonly delayEpoches: ToField<'u64'>
  readonly effectiveEpoches: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterUpdateLimitChangeCreatedEventFields) {
    this.$fullTypeName = composeSuiType(
      LimiterUpdateLimitChangeCreatedEvent.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::LimiterUpdateLimitChangeCreatedEvent`
    this.$typeArgs = typeArgs

    this.changes = fields.changes
    this.currentEpoch = fields.currentEpoch
    this.delayEpoches = fields.delayEpoches
    this.effectiveEpoches = fields.effectiveEpoches
  }

  static reified(): LimiterUpdateLimitChangeCreatedEventReified {
    const reifiedBcs = LimiterUpdateLimitChangeCreatedEvent.bcs
    return {
      typeName: LimiterUpdateLimitChangeCreatedEvent.$typeName,
      fullTypeName: composeSuiType(
        LimiterUpdateLimitChangeCreatedEvent.$typeName,
        ...[],
      ) as `${string}::limiter::LimiterUpdateLimitChangeCreatedEvent`,
      typeArgs: [] as [],
      isPhantom: LimiterUpdateLimitChangeCreatedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        LimiterUpdateLimitChangeCreatedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        LimiterUpdateLimitChangeCreatedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        LimiterUpdateLimitChangeCreatedEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LimiterUpdateLimitChangeCreatedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LimiterUpdateLimitChangeCreatedEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        LimiterUpdateLimitChangeCreatedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        LimiterUpdateLimitChangeCreatedEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        LimiterUpdateLimitChangeCreatedEvent.fetch(client, id),
      new: (fields: LimiterUpdateLimitChangeCreatedEventFields) => {
        return new LimiterUpdateLimitChangeCreatedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LimiterUpdateLimitChangeCreatedEventReified {
    return LimiterUpdateLimitChangeCreatedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterUpdateLimitChangeCreatedEvent>> {
    return phantom(LimiterUpdateLimitChangeCreatedEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LimiterUpdateLimitChangeCreatedEvent>> {
    return LimiterUpdateLimitChangeCreatedEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterUpdateLimitChangeCreatedEvent', {
      changes: LimiterUpdateLimitChange.bcs,
      current_epoch: bcs.u64(),
      delay_epoches: bcs.u64(),
      effective_epoches: bcs.u64(),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof LimiterUpdateLimitChangeCreatedEvent.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof LimiterUpdateLimitChangeCreatedEvent.instantiateBcs> {
    if (!LimiterUpdateLimitChangeCreatedEvent.cachedBcs) {
      LimiterUpdateLimitChangeCreatedEvent.cachedBcs = LimiterUpdateLimitChangeCreatedEvent
        .instantiateBcs()
    }
    return LimiterUpdateLimitChangeCreatedEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LimiterUpdateLimitChangeCreatedEvent {
    return LimiterUpdateLimitChangeCreatedEvent.reified().new({
      changes: decodeFromFields(LimiterUpdateLimitChange.reified(), fields.changes),
      currentEpoch: decodeFromFields('u64', fields.current_epoch),
      delayEpoches: decodeFromFields('u64', fields.delay_epoches),
      effectiveEpoches: decodeFromFields('u64', fields.effective_epoches),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LimiterUpdateLimitChangeCreatedEvent {
    if (!isLimiterUpdateLimitChangeCreatedEvent(item.type)) {
      throw new Error('not a LimiterUpdateLimitChangeCreatedEvent type')
    }

    return LimiterUpdateLimitChangeCreatedEvent.reified().new({
      changes: decodeFromFieldsWithTypes(LimiterUpdateLimitChange.reified(), item.fields.changes),
      currentEpoch: decodeFromFieldsWithTypes('u64', item.fields.current_epoch),
      delayEpoches: decodeFromFieldsWithTypes('u64', item.fields.delay_epoches),
      effectiveEpoches: decodeFromFieldsWithTypes('u64', item.fields.effective_epoches),
    })
  }

  static fromBcs(data: Uint8Array): LimiterUpdateLimitChangeCreatedEvent {
    return LimiterUpdateLimitChangeCreatedEvent.fromFields(
      LimiterUpdateLimitChangeCreatedEvent.bcs.parse(data),
    )
  }

  toJSONField(): LimiterUpdateLimitChangeCreatedEventJSONField {
    return {
      changes: this.changes.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
      delayEpoches: this.delayEpoches.toString(),
      effectiveEpoches: this.effectiveEpoches.toString(),
    }
  }

  toJSON(): LimiterUpdateLimitChangeCreatedEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LimiterUpdateLimitChangeCreatedEvent {
    return LimiterUpdateLimitChangeCreatedEvent.reified().new({
      changes: decodeFromJSONField(LimiterUpdateLimitChange.reified(), field.changes),
      currentEpoch: decodeFromJSONField('u64', field.currentEpoch),
      delayEpoches: decodeFromJSONField('u64', field.delayEpoches),
      effectiveEpoches: decodeFromJSONField('u64', field.effectiveEpoches),
    })
  }

  static fromJSON(json: Record<string, any>): LimiterUpdateLimitChangeCreatedEvent {
    if (json.$typeName !== LimiterUpdateLimitChangeCreatedEvent.$typeName) {
      throw new Error(
        `not a LimiterUpdateLimitChangeCreatedEvent json object: expected '${LimiterUpdateLimitChangeCreatedEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LimiterUpdateLimitChangeCreatedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterUpdateLimitChangeCreatedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterUpdateLimitChangeCreatedEvent(content.type)) {
      throw new Error(
        `object at ${
          (content.fields as any).id
        } is not a LimiterUpdateLimitChangeCreatedEvent object`,
      )
    }
    return LimiterUpdateLimitChangeCreatedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterUpdateLimitChangeCreatedEvent {
    if (data.bcs) {
      if (
        data.bcs.dataType !== 'moveObject' || !isLimiterUpdateLimitChangeCreatedEvent(data.bcs.type)
      ) {
        throw new Error(`object at is not a LimiterUpdateLimitChangeCreatedEvent object`)
      }

      return LimiterUpdateLimitChangeCreatedEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterUpdateLimitChangeCreatedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: SupportedSuiClient,
    id: string,
  ): Promise<LimiterUpdateLimitChangeCreatedEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isLimiterUpdateLimitChangeCreatedEvent(res.type)) {
      throw new Error(`object at id ${id} is not a LimiterUpdateLimitChangeCreatedEvent object`)
    }

    return LimiterUpdateLimitChangeCreatedEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== LimiterUpdateParamsChangeCreatedEvent =============================== */

export function isLimiterUpdateParamsChangeCreatedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'limiter::LimiterUpdateParamsChangeCreatedEvent')
    }::limiter::LimiterUpdateParamsChangeCreatedEvent`
}

export interface LimiterUpdateParamsChangeCreatedEventFields {
  changes: ToField<LimiterUpdateParamsChange>
  currentEpoch: ToField<'u64'>
  delayEpoches: ToField<'u64'>
  effectiveEpoches: ToField<'u64'>
}

export type LimiterUpdateParamsChangeCreatedEventReified = Reified<
  LimiterUpdateParamsChangeCreatedEvent,
  LimiterUpdateParamsChangeCreatedEventFields
>

export type LimiterUpdateParamsChangeCreatedEventJSONField = {
  changes: ToJSON<LimiterUpdateParamsChange>
  currentEpoch: string
  delayEpoches: string
  effectiveEpoches: string
}

export type LimiterUpdateParamsChangeCreatedEventJSON = {
  $typeName: typeof LimiterUpdateParamsChangeCreatedEvent.$typeName
  $typeArgs: []
} & LimiterUpdateParamsChangeCreatedEventJSONField

export class LimiterUpdateParamsChangeCreatedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::LimiterUpdateParamsChangeCreatedEvent` = `${
    getTypeOrigin('scallop-protocol', 'limiter::LimiterUpdateParamsChangeCreatedEvent')
  }::limiter::LimiterUpdateParamsChangeCreatedEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LimiterUpdateParamsChangeCreatedEvent.$typeName =
    LimiterUpdateParamsChangeCreatedEvent.$typeName
  readonly $fullTypeName: `${string}::limiter::LimiterUpdateParamsChangeCreatedEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LimiterUpdateParamsChangeCreatedEvent.$isPhantom =
    LimiterUpdateParamsChangeCreatedEvent.$isPhantom

  readonly changes: ToField<LimiterUpdateParamsChange>
  readonly currentEpoch: ToField<'u64'>
  readonly delayEpoches: ToField<'u64'>
  readonly effectiveEpoches: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterUpdateParamsChangeCreatedEventFields) {
    this.$fullTypeName = composeSuiType(
      LimiterUpdateParamsChangeCreatedEvent.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::LimiterUpdateParamsChangeCreatedEvent`
    this.$typeArgs = typeArgs

    this.changes = fields.changes
    this.currentEpoch = fields.currentEpoch
    this.delayEpoches = fields.delayEpoches
    this.effectiveEpoches = fields.effectiveEpoches
  }

  static reified(): LimiterUpdateParamsChangeCreatedEventReified {
    const reifiedBcs = LimiterUpdateParamsChangeCreatedEvent.bcs
    return {
      typeName: LimiterUpdateParamsChangeCreatedEvent.$typeName,
      fullTypeName: composeSuiType(
        LimiterUpdateParamsChangeCreatedEvent.$typeName,
        ...[],
      ) as `${string}::limiter::LimiterUpdateParamsChangeCreatedEvent`,
      typeArgs: [] as [],
      isPhantom: LimiterUpdateParamsChangeCreatedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        LimiterUpdateParamsChangeCreatedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        LimiterUpdateParamsChangeCreatedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        LimiterUpdateParamsChangeCreatedEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LimiterUpdateParamsChangeCreatedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LimiterUpdateParamsChangeCreatedEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        LimiterUpdateParamsChangeCreatedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        LimiterUpdateParamsChangeCreatedEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        LimiterUpdateParamsChangeCreatedEvent.fetch(client, id),
      new: (fields: LimiterUpdateParamsChangeCreatedEventFields) => {
        return new LimiterUpdateParamsChangeCreatedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LimiterUpdateParamsChangeCreatedEventReified {
    return LimiterUpdateParamsChangeCreatedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterUpdateParamsChangeCreatedEvent>> {
    return phantom(LimiterUpdateParamsChangeCreatedEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LimiterUpdateParamsChangeCreatedEvent>> {
    return LimiterUpdateParamsChangeCreatedEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterUpdateParamsChangeCreatedEvent', {
      changes: LimiterUpdateParamsChange.bcs,
      current_epoch: bcs.u64(),
      delay_epoches: bcs.u64(),
      effective_epoches: bcs.u64(),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof LimiterUpdateParamsChangeCreatedEvent.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof LimiterUpdateParamsChangeCreatedEvent.instantiateBcs> {
    if (!LimiterUpdateParamsChangeCreatedEvent.cachedBcs) {
      LimiterUpdateParamsChangeCreatedEvent.cachedBcs = LimiterUpdateParamsChangeCreatedEvent
        .instantiateBcs()
    }
    return LimiterUpdateParamsChangeCreatedEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LimiterUpdateParamsChangeCreatedEvent {
    return LimiterUpdateParamsChangeCreatedEvent.reified().new({
      changes: decodeFromFields(LimiterUpdateParamsChange.reified(), fields.changes),
      currentEpoch: decodeFromFields('u64', fields.current_epoch),
      delayEpoches: decodeFromFields('u64', fields.delay_epoches),
      effectiveEpoches: decodeFromFields('u64', fields.effective_epoches),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LimiterUpdateParamsChangeCreatedEvent {
    if (!isLimiterUpdateParamsChangeCreatedEvent(item.type)) {
      throw new Error('not a LimiterUpdateParamsChangeCreatedEvent type')
    }

    return LimiterUpdateParamsChangeCreatedEvent.reified().new({
      changes: decodeFromFieldsWithTypes(LimiterUpdateParamsChange.reified(), item.fields.changes),
      currentEpoch: decodeFromFieldsWithTypes('u64', item.fields.current_epoch),
      delayEpoches: decodeFromFieldsWithTypes('u64', item.fields.delay_epoches),
      effectiveEpoches: decodeFromFieldsWithTypes('u64', item.fields.effective_epoches),
    })
  }

  static fromBcs(data: Uint8Array): LimiterUpdateParamsChangeCreatedEvent {
    return LimiterUpdateParamsChangeCreatedEvent.fromFields(
      LimiterUpdateParamsChangeCreatedEvent.bcs.parse(data),
    )
  }

  toJSONField(): LimiterUpdateParamsChangeCreatedEventJSONField {
    return {
      changes: this.changes.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
      delayEpoches: this.delayEpoches.toString(),
      effectiveEpoches: this.effectiveEpoches.toString(),
    }
  }

  toJSON(): LimiterUpdateParamsChangeCreatedEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LimiterUpdateParamsChangeCreatedEvent {
    return LimiterUpdateParamsChangeCreatedEvent.reified().new({
      changes: decodeFromJSONField(LimiterUpdateParamsChange.reified(), field.changes),
      currentEpoch: decodeFromJSONField('u64', field.currentEpoch),
      delayEpoches: decodeFromJSONField('u64', field.delayEpoches),
      effectiveEpoches: decodeFromJSONField('u64', field.effectiveEpoches),
    })
  }

  static fromJSON(json: Record<string, any>): LimiterUpdateParamsChangeCreatedEvent {
    if (json.$typeName !== LimiterUpdateParamsChangeCreatedEvent.$typeName) {
      throw new Error(
        `not a LimiterUpdateParamsChangeCreatedEvent json object: expected '${LimiterUpdateParamsChangeCreatedEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LimiterUpdateParamsChangeCreatedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterUpdateParamsChangeCreatedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterUpdateParamsChangeCreatedEvent(content.type)) {
      throw new Error(
        `object at ${
          (content.fields as any).id
        } is not a LimiterUpdateParamsChangeCreatedEvent object`,
      )
    }
    return LimiterUpdateParamsChangeCreatedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterUpdateParamsChangeCreatedEvent {
    if (data.bcs) {
      if (
        data.bcs.dataType !== 'moveObject'
        || !isLimiterUpdateParamsChangeCreatedEvent(data.bcs.type)
      ) {
        throw new Error(`object at is not a LimiterUpdateParamsChangeCreatedEvent object`)
      }

      return LimiterUpdateParamsChangeCreatedEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterUpdateParamsChangeCreatedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: SupportedSuiClient,
    id: string,
  ): Promise<LimiterUpdateParamsChangeCreatedEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isLimiterUpdateParamsChangeCreatedEvent(res.type)) {
      throw new Error(`object at id ${id} is not a LimiterUpdateParamsChangeCreatedEvent object`)
    }

    return LimiterUpdateParamsChangeCreatedEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== LimiterLimitChangeAppliedEvent =============================== */

export function isLimiterLimitChangeAppliedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'limiter::LimiterLimitChangeAppliedEvent')
    }::limiter::LimiterLimitChangeAppliedEvent`
}

export interface LimiterLimitChangeAppliedEventFields {
  changes: ToField<LimiterUpdateLimitChange>
  currentEpoch: ToField<'u64'>
}

export type LimiterLimitChangeAppliedEventReified = Reified<
  LimiterLimitChangeAppliedEvent,
  LimiterLimitChangeAppliedEventFields
>

export type LimiterLimitChangeAppliedEventJSONField = {
  changes: ToJSON<LimiterUpdateLimitChange>
  currentEpoch: string
}

export type LimiterLimitChangeAppliedEventJSON = {
  $typeName: typeof LimiterLimitChangeAppliedEvent.$typeName
  $typeArgs: []
} & LimiterLimitChangeAppliedEventJSONField

export class LimiterLimitChangeAppliedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::LimiterLimitChangeAppliedEvent` = `${
    getTypeOrigin('scallop-protocol', 'limiter::LimiterLimitChangeAppliedEvent')
  }::limiter::LimiterLimitChangeAppliedEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LimiterLimitChangeAppliedEvent.$typeName =
    LimiterLimitChangeAppliedEvent.$typeName
  readonly $fullTypeName: `${string}::limiter::LimiterLimitChangeAppliedEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LimiterLimitChangeAppliedEvent.$isPhantom =
    LimiterLimitChangeAppliedEvent.$isPhantom

  readonly changes: ToField<LimiterUpdateLimitChange>
  readonly currentEpoch: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterLimitChangeAppliedEventFields) {
    this.$fullTypeName = composeSuiType(
      LimiterLimitChangeAppliedEvent.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::LimiterLimitChangeAppliedEvent`
    this.$typeArgs = typeArgs

    this.changes = fields.changes
    this.currentEpoch = fields.currentEpoch
  }

  static reified(): LimiterLimitChangeAppliedEventReified {
    const reifiedBcs = LimiterLimitChangeAppliedEvent.bcs
    return {
      typeName: LimiterLimitChangeAppliedEvent.$typeName,
      fullTypeName: composeSuiType(
        LimiterLimitChangeAppliedEvent.$typeName,
        ...[],
      ) as `${string}::limiter::LimiterLimitChangeAppliedEvent`,
      typeArgs: [] as [],
      isPhantom: LimiterLimitChangeAppliedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        LimiterLimitChangeAppliedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        LimiterLimitChangeAppliedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        LimiterLimitChangeAppliedEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LimiterLimitChangeAppliedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LimiterLimitChangeAppliedEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        LimiterLimitChangeAppliedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        LimiterLimitChangeAppliedEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        LimiterLimitChangeAppliedEvent.fetch(client, id),
      new: (fields: LimiterLimitChangeAppliedEventFields) => {
        return new LimiterLimitChangeAppliedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LimiterLimitChangeAppliedEventReified {
    return LimiterLimitChangeAppliedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterLimitChangeAppliedEvent>> {
    return phantom(LimiterLimitChangeAppliedEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LimiterLimitChangeAppliedEvent>> {
    return LimiterLimitChangeAppliedEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterLimitChangeAppliedEvent', {
      changes: LimiterUpdateLimitChange.bcs,
      current_epoch: bcs.u64(),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof LimiterLimitChangeAppliedEvent.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof LimiterLimitChangeAppliedEvent.instantiateBcs> {
    if (!LimiterLimitChangeAppliedEvent.cachedBcs) {
      LimiterLimitChangeAppliedEvent.cachedBcs = LimiterLimitChangeAppliedEvent.instantiateBcs()
    }
    return LimiterLimitChangeAppliedEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LimiterLimitChangeAppliedEvent {
    return LimiterLimitChangeAppliedEvent.reified().new({
      changes: decodeFromFields(LimiterUpdateLimitChange.reified(), fields.changes),
      currentEpoch: decodeFromFields('u64', fields.current_epoch),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LimiterLimitChangeAppliedEvent {
    if (!isLimiterLimitChangeAppliedEvent(item.type)) {
      throw new Error('not a LimiterLimitChangeAppliedEvent type')
    }

    return LimiterLimitChangeAppliedEvent.reified().new({
      changes: decodeFromFieldsWithTypes(LimiterUpdateLimitChange.reified(), item.fields.changes),
      currentEpoch: decodeFromFieldsWithTypes('u64', item.fields.current_epoch),
    })
  }

  static fromBcs(data: Uint8Array): LimiterLimitChangeAppliedEvent {
    return LimiterLimitChangeAppliedEvent.fromFields(LimiterLimitChangeAppliedEvent.bcs.parse(data))
  }

  toJSONField(): LimiterLimitChangeAppliedEventJSONField {
    return {
      changes: this.changes.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
    }
  }

  toJSON(): LimiterLimitChangeAppliedEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LimiterLimitChangeAppliedEvent {
    return LimiterLimitChangeAppliedEvent.reified().new({
      changes: decodeFromJSONField(LimiterUpdateLimitChange.reified(), field.changes),
      currentEpoch: decodeFromJSONField('u64', field.currentEpoch),
    })
  }

  static fromJSON(json: Record<string, any>): LimiterLimitChangeAppliedEvent {
    if (json.$typeName !== LimiterLimitChangeAppliedEvent.$typeName) {
      throw new Error(
        `not a LimiterLimitChangeAppliedEvent json object: expected '${LimiterLimitChangeAppliedEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LimiterLimitChangeAppliedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterLimitChangeAppliedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterLimitChangeAppliedEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterLimitChangeAppliedEvent object`,
      )
    }
    return LimiterLimitChangeAppliedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterLimitChangeAppliedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiterLimitChangeAppliedEvent(data.bcs.type)) {
        throw new Error(`object at is not a LimiterLimitChangeAppliedEvent object`)
      }

      return LimiterLimitChangeAppliedEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterLimitChangeAppliedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: SupportedSuiClient,
    id: string,
  ): Promise<LimiterLimitChangeAppliedEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isLimiterLimitChangeAppliedEvent(res.type)) {
      throw new Error(`object at id ${id} is not a LimiterLimitChangeAppliedEvent object`)
    }

    return LimiterLimitChangeAppliedEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== LimiterParamsChangeAppliedEvent =============================== */

export function isLimiterParamsChangeAppliedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'limiter::LimiterParamsChangeAppliedEvent')
    }::limiter::LimiterParamsChangeAppliedEvent`
}

export interface LimiterParamsChangeAppliedEventFields {
  changes: ToField<LimiterUpdateParamsChange>
  currentEpoch: ToField<'u64'>
}

export type LimiterParamsChangeAppliedEventReified = Reified<
  LimiterParamsChangeAppliedEvent,
  LimiterParamsChangeAppliedEventFields
>

export type LimiterParamsChangeAppliedEventJSONField = {
  changes: ToJSON<LimiterUpdateParamsChange>
  currentEpoch: string
}

export type LimiterParamsChangeAppliedEventJSON = {
  $typeName: typeof LimiterParamsChangeAppliedEvent.$typeName
  $typeArgs: []
} & LimiterParamsChangeAppliedEventJSONField

export class LimiterParamsChangeAppliedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::LimiterParamsChangeAppliedEvent` = `${
    getTypeOrigin('scallop-protocol', 'limiter::LimiterParamsChangeAppliedEvent')
  }::limiter::LimiterParamsChangeAppliedEvent` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LimiterParamsChangeAppliedEvent.$typeName =
    LimiterParamsChangeAppliedEvent.$typeName
  readonly $fullTypeName: `${string}::limiter::LimiterParamsChangeAppliedEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LimiterParamsChangeAppliedEvent.$isPhantom =
    LimiterParamsChangeAppliedEvent.$isPhantom

  readonly changes: ToField<LimiterUpdateParamsChange>
  readonly currentEpoch: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterParamsChangeAppliedEventFields) {
    this.$fullTypeName = composeSuiType(
      LimiterParamsChangeAppliedEvent.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::LimiterParamsChangeAppliedEvent`
    this.$typeArgs = typeArgs

    this.changes = fields.changes
    this.currentEpoch = fields.currentEpoch
  }

  static reified(): LimiterParamsChangeAppliedEventReified {
    const reifiedBcs = LimiterParamsChangeAppliedEvent.bcs
    return {
      typeName: LimiterParamsChangeAppliedEvent.$typeName,
      fullTypeName: composeSuiType(
        LimiterParamsChangeAppliedEvent.$typeName,
        ...[],
      ) as `${string}::limiter::LimiterParamsChangeAppliedEvent`,
      typeArgs: [] as [],
      isPhantom: LimiterParamsChangeAppliedEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        LimiterParamsChangeAppliedEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        LimiterParamsChangeAppliedEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        LimiterParamsChangeAppliedEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LimiterParamsChangeAppliedEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LimiterParamsChangeAppliedEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        LimiterParamsChangeAppliedEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        LimiterParamsChangeAppliedEvent.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        LimiterParamsChangeAppliedEvent.fetch(client, id),
      new: (fields: LimiterParamsChangeAppliedEventFields) => {
        return new LimiterParamsChangeAppliedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LimiterParamsChangeAppliedEventReified {
    return LimiterParamsChangeAppliedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterParamsChangeAppliedEvent>> {
    return phantom(LimiterParamsChangeAppliedEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LimiterParamsChangeAppliedEvent>> {
    return LimiterParamsChangeAppliedEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterParamsChangeAppliedEvent', {
      changes: LimiterUpdateParamsChange.bcs,
      current_epoch: bcs.u64(),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof LimiterParamsChangeAppliedEvent.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof LimiterParamsChangeAppliedEvent.instantiateBcs> {
    if (!LimiterParamsChangeAppliedEvent.cachedBcs) {
      LimiterParamsChangeAppliedEvent.cachedBcs = LimiterParamsChangeAppliedEvent.instantiateBcs()
    }
    return LimiterParamsChangeAppliedEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LimiterParamsChangeAppliedEvent {
    return LimiterParamsChangeAppliedEvent.reified().new({
      changes: decodeFromFields(LimiterUpdateParamsChange.reified(), fields.changes),
      currentEpoch: decodeFromFields('u64', fields.current_epoch),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LimiterParamsChangeAppliedEvent {
    if (!isLimiterParamsChangeAppliedEvent(item.type)) {
      throw new Error('not a LimiterParamsChangeAppliedEvent type')
    }

    return LimiterParamsChangeAppliedEvent.reified().new({
      changes: decodeFromFieldsWithTypes(LimiterUpdateParamsChange.reified(), item.fields.changes),
      currentEpoch: decodeFromFieldsWithTypes('u64', item.fields.current_epoch),
    })
  }

  static fromBcs(data: Uint8Array): LimiterParamsChangeAppliedEvent {
    return LimiterParamsChangeAppliedEvent.fromFields(
      LimiterParamsChangeAppliedEvent.bcs.parse(data),
    )
  }

  toJSONField(): LimiterParamsChangeAppliedEventJSONField {
    return {
      changes: this.changes.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
    }
  }

  toJSON(): LimiterParamsChangeAppliedEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LimiterParamsChangeAppliedEvent {
    return LimiterParamsChangeAppliedEvent.reified().new({
      changes: decodeFromJSONField(LimiterUpdateParamsChange.reified(), field.changes),
      currentEpoch: decodeFromJSONField('u64', field.currentEpoch),
    })
  }

  static fromJSON(json: Record<string, any>): LimiterParamsChangeAppliedEvent {
    if (json.$typeName !== LimiterParamsChangeAppliedEvent.$typeName) {
      throw new Error(
        `not a LimiterParamsChangeAppliedEvent json object: expected '${LimiterParamsChangeAppliedEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LimiterParamsChangeAppliedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterParamsChangeAppliedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterParamsChangeAppliedEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterParamsChangeAppliedEvent object`,
      )
    }
    return LimiterParamsChangeAppliedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterParamsChangeAppliedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiterParamsChangeAppliedEvent(data.bcs.type)) {
        throw new Error(`object at is not a LimiterParamsChangeAppliedEvent object`)
      }

      return LimiterParamsChangeAppliedEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterParamsChangeAppliedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: SupportedSuiClient,
    id: string,
  ): Promise<LimiterParamsChangeAppliedEvent> {
    const res = await fetchObjectBcs(client, id)
    if (!isLimiterParamsChangeAppliedEvent(res.type)) {
      throw new Error(`object at id ${id} is not a LimiterParamsChangeAppliedEvent object`)
    }

    return LimiterParamsChangeAppliedEvent.fromBcs(res.bcsBytes)
  }
}

/* ============================== LimiterUpdateLimitChange =============================== */

export function isLimiterUpdateLimitChange(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'limiter::LimiterUpdateLimitChange')
    }::limiter::LimiterUpdateLimitChange`
}

export interface LimiterUpdateLimitChangeFields {
  coinType: ToField<TypeName>
  outflowLimit: ToField<'u64'>
}

export type LimiterUpdateLimitChangeReified = Reified<
  LimiterUpdateLimitChange,
  LimiterUpdateLimitChangeFields
>

export type LimiterUpdateLimitChangeJSONField = {
  coinType: string
  outflowLimit: string
}

export type LimiterUpdateLimitChangeJSON = {
  $typeName: typeof LimiterUpdateLimitChange.$typeName
  $typeArgs: []
} & LimiterUpdateLimitChangeJSONField

export class LimiterUpdateLimitChange implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::LimiterUpdateLimitChange` = `${
    getTypeOrigin('scallop-protocol', 'limiter::LimiterUpdateLimitChange')
  }::limiter::LimiterUpdateLimitChange` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LimiterUpdateLimitChange.$typeName = LimiterUpdateLimitChange.$typeName
  readonly $fullTypeName: `${string}::limiter::LimiterUpdateLimitChange`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LimiterUpdateLimitChange.$isPhantom =
    LimiterUpdateLimitChange.$isPhantom

  readonly coinType: ToField<TypeName>
  readonly outflowLimit: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterUpdateLimitChangeFields) {
    this.$fullTypeName = composeSuiType(
      LimiterUpdateLimitChange.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::LimiterUpdateLimitChange`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.outflowLimit = fields.outflowLimit
  }

  static reified(): LimiterUpdateLimitChangeReified {
    const reifiedBcs = LimiterUpdateLimitChange.bcs
    return {
      typeName: LimiterUpdateLimitChange.$typeName,
      fullTypeName: composeSuiType(
        LimiterUpdateLimitChange.$typeName,
        ...[],
      ) as `${string}::limiter::LimiterUpdateLimitChange`,
      typeArgs: [] as [],
      isPhantom: LimiterUpdateLimitChange.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LimiterUpdateLimitChange.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        LimiterUpdateLimitChange.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LimiterUpdateLimitChange.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LimiterUpdateLimitChange.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LimiterUpdateLimitChange.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        LimiterUpdateLimitChange.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        LimiterUpdateLimitChange.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        LimiterUpdateLimitChange.fetch(client, id),
      new: (fields: LimiterUpdateLimitChangeFields) => {
        return new LimiterUpdateLimitChange([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LimiterUpdateLimitChangeReified {
    return LimiterUpdateLimitChange.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterUpdateLimitChange>> {
    return phantom(LimiterUpdateLimitChange.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LimiterUpdateLimitChange>> {
    return LimiterUpdateLimitChange.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterUpdateLimitChange', {
      coin_type: TypeName.bcs,
      outflow_limit: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof LimiterUpdateLimitChange.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof LimiterUpdateLimitChange.instantiateBcs> {
    if (!LimiterUpdateLimitChange.cachedBcs) {
      LimiterUpdateLimitChange.cachedBcs = LimiterUpdateLimitChange.instantiateBcs()
    }
    return LimiterUpdateLimitChange.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LimiterUpdateLimitChange {
    return LimiterUpdateLimitChange.reified().new({
      coinType: decodeFromFields(TypeName.reified(), fields.coin_type),
      outflowLimit: decodeFromFields('u64', fields.outflow_limit),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LimiterUpdateLimitChange {
    if (!isLimiterUpdateLimitChange(item.type)) {
      throw new Error('not a LimiterUpdateLimitChange type')
    }

    return LimiterUpdateLimitChange.reified().new({
      coinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type),
      outflowLimit: decodeFromFieldsWithTypes('u64', item.fields.outflow_limit),
    })
  }

  static fromBcs(data: Uint8Array): LimiterUpdateLimitChange {
    return LimiterUpdateLimitChange.fromFields(LimiterUpdateLimitChange.bcs.parse(data))
  }

  toJSONField(): LimiterUpdateLimitChangeJSONField {
    return {
      coinType: this.coinType,
      outflowLimit: this.outflowLimit.toString(),
    }
  }

  toJSON(): LimiterUpdateLimitChangeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LimiterUpdateLimitChange {
    return LimiterUpdateLimitChange.reified().new({
      coinType: decodeFromJSONField(TypeName.reified(), field.coinType),
      outflowLimit: decodeFromJSONField('u64', field.outflowLimit),
    })
  }

  static fromJSON(json: Record<string, any>): LimiterUpdateLimitChange {
    if (json.$typeName !== LimiterUpdateLimitChange.$typeName) {
      throw new Error(
        `not a LimiterUpdateLimitChange json object: expected '${LimiterUpdateLimitChange.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LimiterUpdateLimitChange.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterUpdateLimitChange {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterUpdateLimitChange(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterUpdateLimitChange object`,
      )
    }
    return LimiterUpdateLimitChange.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterUpdateLimitChange {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiterUpdateLimitChange(data.bcs.type)) {
        throw new Error(`object at is not a LimiterUpdateLimitChange object`)
      }

      return LimiterUpdateLimitChange.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterUpdateLimitChange.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<LimiterUpdateLimitChange> {
    const res = await fetchObjectBcs(client, id)
    if (!isLimiterUpdateLimitChange(res.type)) {
      throw new Error(`object at id ${id} is not a LimiterUpdateLimitChange object`)
    }

    return LimiterUpdateLimitChange.fromBcs(res.bcsBytes)
  }
}

/* ============================== LimiterUpdateParamsChange =============================== */

export function isLimiterUpdateParamsChange(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'limiter::LimiterUpdateParamsChange')
    }::limiter::LimiterUpdateParamsChange`
}

export interface LimiterUpdateParamsChangeFields {
  coinType: ToField<TypeName>
  outflowCycleDuration: ToField<'u32'>
  outflowSegmentDuration: ToField<'u32'>
}

export type LimiterUpdateParamsChangeReified = Reified<
  LimiterUpdateParamsChange,
  LimiterUpdateParamsChangeFields
>

export type LimiterUpdateParamsChangeJSONField = {
  coinType: string
  outflowCycleDuration: number
  outflowSegmentDuration: number
}

export type LimiterUpdateParamsChangeJSON = {
  $typeName: typeof LimiterUpdateParamsChange.$typeName
  $typeArgs: []
} & LimiterUpdateParamsChangeJSONField

export class LimiterUpdateParamsChange implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::limiter::LimiterUpdateParamsChange` = `${
    getTypeOrigin('scallop-protocol', 'limiter::LimiterUpdateParamsChange')
  }::limiter::LimiterUpdateParamsChange` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LimiterUpdateParamsChange.$typeName =
    LimiterUpdateParamsChange.$typeName
  readonly $fullTypeName: `${string}::limiter::LimiterUpdateParamsChange`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LimiterUpdateParamsChange.$isPhantom =
    LimiterUpdateParamsChange.$isPhantom

  readonly coinType: ToField<TypeName>
  readonly outflowCycleDuration: ToField<'u32'>
  readonly outflowSegmentDuration: ToField<'u32'>

  private constructor(typeArgs: [], fields: LimiterUpdateParamsChangeFields) {
    this.$fullTypeName = composeSuiType(
      LimiterUpdateParamsChange.$typeName,
      ...typeArgs,
    ) as `${string}::limiter::LimiterUpdateParamsChange`
    this.$typeArgs = typeArgs

    this.coinType = fields.coinType
    this.outflowCycleDuration = fields.outflowCycleDuration
    this.outflowSegmentDuration = fields.outflowSegmentDuration
  }

  static reified(): LimiterUpdateParamsChangeReified {
    const reifiedBcs = LimiterUpdateParamsChange.bcs
    return {
      typeName: LimiterUpdateParamsChange.$typeName,
      fullTypeName: composeSuiType(
        LimiterUpdateParamsChange.$typeName,
        ...[],
      ) as `${string}::limiter::LimiterUpdateParamsChange`,
      typeArgs: [] as [],
      isPhantom: LimiterUpdateParamsChange.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LimiterUpdateParamsChange.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        LimiterUpdateParamsChange.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LimiterUpdateParamsChange.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LimiterUpdateParamsChange.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LimiterUpdateParamsChange.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        LimiterUpdateParamsChange.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        LimiterUpdateParamsChange.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        LimiterUpdateParamsChange.fetch(client, id),
      new: (fields: LimiterUpdateParamsChangeFields) => {
        return new LimiterUpdateParamsChange([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LimiterUpdateParamsChangeReified {
    return LimiterUpdateParamsChange.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterUpdateParamsChange>> {
    return phantom(LimiterUpdateParamsChange.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LimiterUpdateParamsChange>> {
    return LimiterUpdateParamsChange.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterUpdateParamsChange', {
      coin_type: TypeName.bcs,
      outflow_cycle_duration: bcs.u32(),
      outflow_segment_duration: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof LimiterUpdateParamsChange.instantiateBcs> | null =
    null

  static get bcs(): ReturnType<typeof LimiterUpdateParamsChange.instantiateBcs> {
    if (!LimiterUpdateParamsChange.cachedBcs) {
      LimiterUpdateParamsChange.cachedBcs = LimiterUpdateParamsChange.instantiateBcs()
    }
    return LimiterUpdateParamsChange.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LimiterUpdateParamsChange {
    return LimiterUpdateParamsChange.reified().new({
      coinType: decodeFromFields(TypeName.reified(), fields.coin_type),
      outflowCycleDuration: decodeFromFields('u32', fields.outflow_cycle_duration),
      outflowSegmentDuration: decodeFromFields('u32', fields.outflow_segment_duration),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LimiterUpdateParamsChange {
    if (!isLimiterUpdateParamsChange(item.type)) {
      throw new Error('not a LimiterUpdateParamsChange type')
    }

    return LimiterUpdateParamsChange.reified().new({
      coinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type),
      outflowCycleDuration: decodeFromFieldsWithTypes('u32', item.fields.outflow_cycle_duration),
      outflowSegmentDuration: decodeFromFieldsWithTypes(
        'u32',
        item.fields.outflow_segment_duration,
      ),
    })
  }

  static fromBcs(data: Uint8Array): LimiterUpdateParamsChange {
    return LimiterUpdateParamsChange.fromFields(LimiterUpdateParamsChange.bcs.parse(data))
  }

  toJSONField(): LimiterUpdateParamsChangeJSONField {
    return {
      coinType: this.coinType,
      outflowCycleDuration: this.outflowCycleDuration,
      outflowSegmentDuration: this.outflowSegmentDuration,
    }
  }

  toJSON(): LimiterUpdateParamsChangeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LimiterUpdateParamsChange {
    return LimiterUpdateParamsChange.reified().new({
      coinType: decodeFromJSONField(TypeName.reified(), field.coinType),
      outflowCycleDuration: decodeFromJSONField('u32', field.outflowCycleDuration),
      outflowSegmentDuration: decodeFromJSONField('u32', field.outflowSegmentDuration),
    })
  }

  static fromJSON(json: Record<string, any>): LimiterUpdateParamsChange {
    if (json.$typeName !== LimiterUpdateParamsChange.$typeName) {
      throw new Error(
        `not a LimiterUpdateParamsChange json object: expected '${LimiterUpdateParamsChange.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LimiterUpdateParamsChange.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterUpdateParamsChange {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterUpdateParamsChange(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterUpdateParamsChange object`,
      )
    }
    return LimiterUpdateParamsChange.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterUpdateParamsChange {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiterUpdateParamsChange(data.bcs.type)) {
        throw new Error(`object at is not a LimiterUpdateParamsChange object`)
      }

      return LimiterUpdateParamsChange.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterUpdateParamsChange.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<LimiterUpdateParamsChange> {
    const res = await fetchObjectBcs(client, id)
    if (!isLimiterUpdateParamsChange(res.type)) {
      throw new Error(`object at id ${id} is not a LimiterUpdateParamsChange object`)
    }

    return LimiterUpdateParamsChange.fromBcs(res.bcsBytes)
  }
}
