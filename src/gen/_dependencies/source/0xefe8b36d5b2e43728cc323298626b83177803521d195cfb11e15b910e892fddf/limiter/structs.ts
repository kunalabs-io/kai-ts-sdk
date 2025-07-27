import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Limiter =============================== */

export function isLimiter(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::Limiter`
}

export interface LimiterFields {
  outflowLimit: ToField<'u64'>
  outflowCycleDuration: ToField<'u32'>
  outflowSegmentDuration: ToField<'u32'>
  outflowSegments: ToField<Vector<Segment>>
}

export type LimiterReified = Reified<Limiter, LimiterFields>

export class Limiter implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::Limiter`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Limiter.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::Limiter`
  readonly $typeArgs: []
  readonly $isPhantom = Limiter.$isPhantom

  readonly outflowLimit: ToField<'u64'>
  readonly outflowCycleDuration: ToField<'u32'>
  readonly outflowSegmentDuration: ToField<'u32'>
  readonly outflowSegments: ToField<Vector<Segment>>

  private constructor(typeArgs: [], fields: LimiterFields) {
    this.$fullTypeName = composeSuiType(
      Limiter.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::Limiter`
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
        ...[]
      ) as `${typeof PKG_V1}::limiter::Limiter`,
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
      fetch: async (client: SuiClient, id: string) => Limiter.fetch(client, id),
      new: (fields: LimiterFields) => {
        return new Limiter([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Limiter.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Limiter>> {
    return phantom(Limiter.reified())
  }
  static get p() {
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

  static get bcs() {
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
      outflowSegments: decodeFromFields(reified.vector(Segment.reified()), fields.outflow_segments),
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
        item.fields.outflow_segment_duration
      ),
      outflowSegments: decodeFromFieldsWithTypes(
        reified.vector(Segment.reified()),
        item.fields.outflow_segments
      ),
    })
  }

  static fromBcs(data: Uint8Array): Limiter {
    return Limiter.fromFields(Limiter.bcs.parse(data))
  }

  toJSONField() {
    return {
      outflowLimit: this.outflowLimit.toString(),
      outflowCycleDuration: this.outflowCycleDuration,
      outflowSegmentDuration: this.outflowSegmentDuration,
      outflowSegments: fieldToJSON<Vector<Segment>>(
        `vector<${Segment.$typeName}>`,
        this.outflowSegments
      ),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Limiter {
    return Limiter.reified().new({
      outflowLimit: decodeFromJSONField('u64', field.outflowLimit),
      outflowCycleDuration: decodeFromJSONField('u32', field.outflowCycleDuration),
      outflowSegmentDuration: decodeFromJSONField('u32', field.outflowSegmentDuration),
      outflowSegments: decodeFromJSONField(
        reified.vector(Segment.reified()),
        field.outflowSegments
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Limiter {
    if (json.$typeName !== Limiter.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return Limiter.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Limiter.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Limiter> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Limiter object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLimiter(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Limiter object`)
    }

    return Limiter.fromSuiObjectData(res.data)
  }
}

/* ============================== Limiters =============================== */

export function isLimiters(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::Limiters`
}

export interface LimitersFields {
  dummyField: ToField<'bool'>
}

export type LimitersReified = Reified<Limiters, LimitersFields>

export class Limiters implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::Limiters`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Limiters.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::Limiters`
  readonly $typeArgs: []
  readonly $isPhantom = Limiters.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: LimitersFields) {
    this.$fullTypeName = composeSuiType(
      Limiters.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::Limiters`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): LimitersReified {
    const reifiedBcs = Limiters.bcs
    return {
      typeName: Limiters.$typeName,
      fullTypeName: composeSuiType(
        Limiters.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::limiter::Limiters`,
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
      fetch: async (client: SuiClient, id: string) => Limiters.fetch(client, id),
      new: (fields: LimitersFields) => {
        return new Limiters([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Limiters.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Limiters>> {
    return phantom(Limiters.reified())
  }
  static get p() {
    return Limiters.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Limiters', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Limiters.instantiateBcs> | null = null

  static get bcs() {
    if (!Limiters.cachedBcs) {
      Limiters.cachedBcs = Limiters.instantiateBcs()
    }
    return Limiters.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Limiters {
    return Limiters.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Limiters {
    return Limiters.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): Limiters {
    if (json.$typeName !== Limiters.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return Limiters.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Limiters.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Limiters> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Limiters object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLimiters(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Limiters object`)
    }

    return Limiters.fromSuiObjectData(res.data)
  }
}

/* ============================== Segment =============================== */

export function isSegment(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::Segment`
}

export interface SegmentFields {
  index: ToField<'u64'>
  value: ToField<'u64'>
}

export type SegmentReified = Reified<Segment, SegmentFields>

export class Segment implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::Segment`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Segment.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::Segment`
  readonly $typeArgs: []
  readonly $isPhantom = Segment.$isPhantom

  readonly index: ToField<'u64'>
  readonly value: ToField<'u64'>

  private constructor(typeArgs: [], fields: SegmentFields) {
    this.$fullTypeName = composeSuiType(
      Segment.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::Segment`
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
        ...[]
      ) as `${typeof PKG_V1}::limiter::Segment`,
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
      fetch: async (client: SuiClient, id: string) => Segment.fetch(client, id),
      new: (fields: SegmentFields) => {
        return new Segment([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Segment.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Segment>> {
    return phantom(Segment.reified())
  }
  static get p() {
    return Segment.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Segment', {
      index: bcs.u64(),
      value: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Segment.instantiateBcs> | null = null

  static get bcs() {
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

  toJSONField() {
    return {
      index: this.index.toString(),
      value: this.value.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return Segment.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Segment.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Segment> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Segment object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSegment(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Segment object`)
    }

    return Segment.fromSuiObjectData(res.data)
  }
}

/* ============================== LimiterUpdateLimitChangeCreatedEvent =============================== */

export function isLimiterUpdateLimitChangeCreatedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::LimiterUpdateLimitChangeCreatedEvent`
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

export class LimiterUpdateLimitChangeCreatedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::LimiterUpdateLimitChangeCreatedEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LimiterUpdateLimitChangeCreatedEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::LimiterUpdateLimitChangeCreatedEvent`
  readonly $typeArgs: []
  readonly $isPhantom = LimiterUpdateLimitChangeCreatedEvent.$isPhantom

  readonly changes: ToField<LimiterUpdateLimitChange>
  readonly currentEpoch: ToField<'u64'>
  readonly delayEpoches: ToField<'u64'>
  readonly effectiveEpoches: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterUpdateLimitChangeCreatedEventFields) {
    this.$fullTypeName = composeSuiType(
      LimiterUpdateLimitChangeCreatedEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::LimiterUpdateLimitChangeCreatedEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::limiter::LimiterUpdateLimitChangeCreatedEvent`,
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
      fetch: async (client: SuiClient, id: string) =>
        LimiterUpdateLimitChangeCreatedEvent.fetch(client, id),
      new: (fields: LimiterUpdateLimitChangeCreatedEventFields) => {
        return new LimiterUpdateLimitChangeCreatedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LimiterUpdateLimitChangeCreatedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterUpdateLimitChangeCreatedEvent>> {
    return phantom(LimiterUpdateLimitChangeCreatedEvent.reified())
  }
  static get p() {
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

  private static cachedBcs: ReturnType<
    typeof LimiterUpdateLimitChangeCreatedEvent.instantiateBcs
  > | null = null

  static get bcs() {
    if (!LimiterUpdateLimitChangeCreatedEvent.cachedBcs) {
      LimiterUpdateLimitChangeCreatedEvent.cachedBcs =
        LimiterUpdateLimitChangeCreatedEvent.instantiateBcs()
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
      LimiterUpdateLimitChangeCreatedEvent.bcs.parse(data)
    )
  }

  toJSONField() {
    return {
      changes: this.changes.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
      delayEpoches: this.delayEpoches.toString(),
      effectiveEpoches: this.effectiveEpoches.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return LimiterUpdateLimitChangeCreatedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterUpdateLimitChangeCreatedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterUpdateLimitChangeCreatedEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterUpdateLimitChangeCreatedEvent object`
      )
    }
    return LimiterUpdateLimitChangeCreatedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterUpdateLimitChangeCreatedEvent {
    if (data.bcs) {
      if (
        data.bcs.dataType !== 'moveObject' ||
        !isLimiterUpdateLimitChangeCreatedEvent(data.bcs.type)
      ) {
        throw new Error(`object at is not a LimiterUpdateLimitChangeCreatedEvent object`)
      }

      return LimiterUpdateLimitChangeCreatedEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterUpdateLimitChangeCreatedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LimiterUpdateLimitChangeCreatedEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching LimiterUpdateLimitChangeCreatedEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isLimiterUpdateLimitChangeCreatedEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a LimiterUpdateLimitChangeCreatedEvent object`)
    }

    return LimiterUpdateLimitChangeCreatedEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== LimiterUpdateParamsChangeCreatedEvent =============================== */

export function isLimiterUpdateParamsChangeCreatedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::LimiterUpdateParamsChangeCreatedEvent`
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

export class LimiterUpdateParamsChangeCreatedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::LimiterUpdateParamsChangeCreatedEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LimiterUpdateParamsChangeCreatedEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::LimiterUpdateParamsChangeCreatedEvent`
  readonly $typeArgs: []
  readonly $isPhantom = LimiterUpdateParamsChangeCreatedEvent.$isPhantom

  readonly changes: ToField<LimiterUpdateParamsChange>
  readonly currentEpoch: ToField<'u64'>
  readonly delayEpoches: ToField<'u64'>
  readonly effectiveEpoches: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterUpdateParamsChangeCreatedEventFields) {
    this.$fullTypeName = composeSuiType(
      LimiterUpdateParamsChangeCreatedEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::LimiterUpdateParamsChangeCreatedEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::limiter::LimiterUpdateParamsChangeCreatedEvent`,
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
      fetch: async (client: SuiClient, id: string) =>
        LimiterUpdateParamsChangeCreatedEvent.fetch(client, id),
      new: (fields: LimiterUpdateParamsChangeCreatedEventFields) => {
        return new LimiterUpdateParamsChangeCreatedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LimiterUpdateParamsChangeCreatedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterUpdateParamsChangeCreatedEvent>> {
    return phantom(LimiterUpdateParamsChangeCreatedEvent.reified())
  }
  static get p() {
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

  private static cachedBcs: ReturnType<
    typeof LimiterUpdateParamsChangeCreatedEvent.instantiateBcs
  > | null = null

  static get bcs() {
    if (!LimiterUpdateParamsChangeCreatedEvent.cachedBcs) {
      LimiterUpdateParamsChangeCreatedEvent.cachedBcs =
        LimiterUpdateParamsChangeCreatedEvent.instantiateBcs()
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
      LimiterUpdateParamsChangeCreatedEvent.bcs.parse(data)
    )
  }

  toJSONField() {
    return {
      changes: this.changes.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
      delayEpoches: this.delayEpoches.toString(),
      effectiveEpoches: this.effectiveEpoches.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return LimiterUpdateParamsChangeCreatedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterUpdateParamsChangeCreatedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterUpdateParamsChangeCreatedEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterUpdateParamsChangeCreatedEvent object`
      )
    }
    return LimiterUpdateParamsChangeCreatedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterUpdateParamsChangeCreatedEvent {
    if (data.bcs) {
      if (
        data.bcs.dataType !== 'moveObject' ||
        !isLimiterUpdateParamsChangeCreatedEvent(data.bcs.type)
      ) {
        throw new Error(`object at is not a LimiterUpdateParamsChangeCreatedEvent object`)
      }

      return LimiterUpdateParamsChangeCreatedEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterUpdateParamsChangeCreatedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(
    client: SuiClient,
    id: string
  ): Promise<LimiterUpdateParamsChangeCreatedEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching LimiterUpdateParamsChangeCreatedEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isLimiterUpdateParamsChangeCreatedEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a LimiterUpdateParamsChangeCreatedEvent object`)
    }

    return LimiterUpdateParamsChangeCreatedEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== LimiterLimitChangeAppliedEvent =============================== */

export function isLimiterLimitChangeAppliedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::LimiterLimitChangeAppliedEvent`
}

export interface LimiterLimitChangeAppliedEventFields {
  changes: ToField<LimiterUpdateLimitChange>
  currentEpoch: ToField<'u64'>
}

export type LimiterLimitChangeAppliedEventReified = Reified<
  LimiterLimitChangeAppliedEvent,
  LimiterLimitChangeAppliedEventFields
>

export class LimiterLimitChangeAppliedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::LimiterLimitChangeAppliedEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LimiterLimitChangeAppliedEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::LimiterLimitChangeAppliedEvent`
  readonly $typeArgs: []
  readonly $isPhantom = LimiterLimitChangeAppliedEvent.$isPhantom

  readonly changes: ToField<LimiterUpdateLimitChange>
  readonly currentEpoch: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterLimitChangeAppliedEventFields) {
    this.$fullTypeName = composeSuiType(
      LimiterLimitChangeAppliedEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::LimiterLimitChangeAppliedEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::limiter::LimiterLimitChangeAppliedEvent`,
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
      fetch: async (client: SuiClient, id: string) =>
        LimiterLimitChangeAppliedEvent.fetch(client, id),
      new: (fields: LimiterLimitChangeAppliedEventFields) => {
        return new LimiterLimitChangeAppliedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LimiterLimitChangeAppliedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterLimitChangeAppliedEvent>> {
    return phantom(LimiterLimitChangeAppliedEvent.reified())
  }
  static get p() {
    return LimiterLimitChangeAppliedEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterLimitChangeAppliedEvent', {
      changes: LimiterUpdateLimitChange.bcs,
      current_epoch: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<
    typeof LimiterLimitChangeAppliedEvent.instantiateBcs
  > | null = null

  static get bcs() {
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

  toJSONField() {
    return {
      changes: this.changes.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return LimiterLimitChangeAppliedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterLimitChangeAppliedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterLimitChangeAppliedEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterLimitChangeAppliedEvent object`
      )
    }
    return LimiterLimitChangeAppliedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterLimitChangeAppliedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiterLimitChangeAppliedEvent(data.bcs.type)) {
        throw new Error(`object at is not a LimiterLimitChangeAppliedEvent object`)
      }

      return LimiterLimitChangeAppliedEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterLimitChangeAppliedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LimiterLimitChangeAppliedEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching LimiterLimitChangeAppliedEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isLimiterLimitChangeAppliedEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a LimiterLimitChangeAppliedEvent object`)
    }

    return LimiterLimitChangeAppliedEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== LimiterParamsChangeAppliedEvent =============================== */

export function isLimiterParamsChangeAppliedEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::LimiterParamsChangeAppliedEvent`
}

export interface LimiterParamsChangeAppliedEventFields {
  changes: ToField<LimiterUpdateParamsChange>
  currentEpoch: ToField<'u64'>
}

export type LimiterParamsChangeAppliedEventReified = Reified<
  LimiterParamsChangeAppliedEvent,
  LimiterParamsChangeAppliedEventFields
>

export class LimiterParamsChangeAppliedEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::LimiterParamsChangeAppliedEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LimiterParamsChangeAppliedEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::LimiterParamsChangeAppliedEvent`
  readonly $typeArgs: []
  readonly $isPhantom = LimiterParamsChangeAppliedEvent.$isPhantom

  readonly changes: ToField<LimiterUpdateParamsChange>
  readonly currentEpoch: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterParamsChangeAppliedEventFields) {
    this.$fullTypeName = composeSuiType(
      LimiterParamsChangeAppliedEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::LimiterParamsChangeAppliedEvent`
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
        ...[]
      ) as `${typeof PKG_V1}::limiter::LimiterParamsChangeAppliedEvent`,
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
      fetch: async (client: SuiClient, id: string) =>
        LimiterParamsChangeAppliedEvent.fetch(client, id),
      new: (fields: LimiterParamsChangeAppliedEventFields) => {
        return new LimiterParamsChangeAppliedEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LimiterParamsChangeAppliedEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterParamsChangeAppliedEvent>> {
    return phantom(LimiterParamsChangeAppliedEvent.reified())
  }
  static get p() {
    return LimiterParamsChangeAppliedEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterParamsChangeAppliedEvent', {
      changes: LimiterUpdateParamsChange.bcs,
      current_epoch: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<
    typeof LimiterParamsChangeAppliedEvent.instantiateBcs
  > | null = null

  static get bcs() {
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
      LimiterParamsChangeAppliedEvent.bcs.parse(data)
    )
  }

  toJSONField() {
    return {
      changes: this.changes.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return LimiterParamsChangeAppliedEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterParamsChangeAppliedEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterParamsChangeAppliedEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterParamsChangeAppliedEvent object`
      )
    }
    return LimiterParamsChangeAppliedEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterParamsChangeAppliedEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiterParamsChangeAppliedEvent(data.bcs.type)) {
        throw new Error(`object at is not a LimiterParamsChangeAppliedEvent object`)
      }

      return LimiterParamsChangeAppliedEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterParamsChangeAppliedEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LimiterParamsChangeAppliedEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching LimiterParamsChangeAppliedEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isLimiterParamsChangeAppliedEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a LimiterParamsChangeAppliedEvent object`)
    }

    return LimiterParamsChangeAppliedEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== LimiterUpdateLimitChange =============================== */

export function isLimiterUpdateLimitChange(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::LimiterUpdateLimitChange`
}

export interface LimiterUpdateLimitChangeFields {
  coinType: ToField<TypeName>
  outflowLimit: ToField<'u64'>
}

export type LimiterUpdateLimitChangeReified = Reified<
  LimiterUpdateLimitChange,
  LimiterUpdateLimitChangeFields
>

export class LimiterUpdateLimitChange implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::LimiterUpdateLimitChange`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LimiterUpdateLimitChange.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::LimiterUpdateLimitChange`
  readonly $typeArgs: []
  readonly $isPhantom = LimiterUpdateLimitChange.$isPhantom

  readonly coinType: ToField<TypeName>
  readonly outflowLimit: ToField<'u64'>

  private constructor(typeArgs: [], fields: LimiterUpdateLimitChangeFields) {
    this.$fullTypeName = composeSuiType(
      LimiterUpdateLimitChange.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::LimiterUpdateLimitChange`
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
        ...[]
      ) as `${typeof PKG_V1}::limiter::LimiterUpdateLimitChange`,
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
      fetch: async (client: SuiClient, id: string) => LimiterUpdateLimitChange.fetch(client, id),
      new: (fields: LimiterUpdateLimitChangeFields) => {
        return new LimiterUpdateLimitChange([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LimiterUpdateLimitChange.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterUpdateLimitChange>> {
    return phantom(LimiterUpdateLimitChange.reified())
  }
  static get p() {
    return LimiterUpdateLimitChange.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LimiterUpdateLimitChange', {
      coin_type: TypeName.bcs,
      outflow_limit: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof LimiterUpdateLimitChange.instantiateBcs> | null = null

  static get bcs() {
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

  toJSONField() {
    return {
      coinType: this.coinType.toJSONField(),
      outflowLimit: this.outflowLimit.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return LimiterUpdateLimitChange.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterUpdateLimitChange {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterUpdateLimitChange(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterUpdateLimitChange object`
      )
    }
    return LimiterUpdateLimitChange.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterUpdateLimitChange {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiterUpdateLimitChange(data.bcs.type)) {
        throw new Error(`object at is not a LimiterUpdateLimitChange object`)
      }

      return LimiterUpdateLimitChange.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterUpdateLimitChange.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LimiterUpdateLimitChange> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching LimiterUpdateLimitChange object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isLimiterUpdateLimitChange(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a LimiterUpdateLimitChange object`)
    }

    return LimiterUpdateLimitChange.fromSuiObjectData(res.data)
  }
}

/* ============================== LimiterUpdateParamsChange =============================== */

export function isLimiterUpdateParamsChange(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::limiter::LimiterUpdateParamsChange`
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

export class LimiterUpdateParamsChange implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::limiter::LimiterUpdateParamsChange`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LimiterUpdateParamsChange.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::limiter::LimiterUpdateParamsChange`
  readonly $typeArgs: []
  readonly $isPhantom = LimiterUpdateParamsChange.$isPhantom

  readonly coinType: ToField<TypeName>
  readonly outflowCycleDuration: ToField<'u32'>
  readonly outflowSegmentDuration: ToField<'u32'>

  private constructor(typeArgs: [], fields: LimiterUpdateParamsChangeFields) {
    this.$fullTypeName = composeSuiType(
      LimiterUpdateParamsChange.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limiter::LimiterUpdateParamsChange`
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
        ...[]
      ) as `${typeof PKG_V1}::limiter::LimiterUpdateParamsChange`,
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
      fetch: async (client: SuiClient, id: string) => LimiterUpdateParamsChange.fetch(client, id),
      new: (fields: LimiterUpdateParamsChangeFields) => {
        return new LimiterUpdateParamsChange([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LimiterUpdateParamsChange.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LimiterUpdateParamsChange>> {
    return phantom(LimiterUpdateParamsChange.reified())
  }
  static get p() {
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

  static get bcs() {
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
        item.fields.outflow_segment_duration
      ),
    })
  }

  static fromBcs(data: Uint8Array): LimiterUpdateParamsChange {
    return LimiterUpdateParamsChange.fromFields(LimiterUpdateParamsChange.bcs.parse(data))
  }

  toJSONField() {
    return {
      coinType: this.coinType.toJSONField(),
      outflowCycleDuration: this.outflowCycleDuration,
      outflowSegmentDuration: this.outflowSegmentDuration,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return LimiterUpdateParamsChange.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): LimiterUpdateParamsChange {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLimiterUpdateParamsChange(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a LimiterUpdateParamsChange object`
      )
    }
    return LimiterUpdateParamsChange.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): LimiterUpdateParamsChange {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLimiterUpdateParamsChange(data.bcs.type)) {
        throw new Error(`object at is not a LimiterUpdateParamsChange object`)
      }

      return LimiterUpdateParamsChange.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LimiterUpdateParamsChange.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LimiterUpdateParamsChange> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching LimiterUpdateParamsChange object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isLimiterUpdateParamsChange(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a LimiterUpdateParamsChange object`)
    }

    return LimiterUpdateParamsChange.fromSuiObjectData(res.data)
  }
}
