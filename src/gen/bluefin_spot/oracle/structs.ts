import * as reified from '../../_framework/reified'
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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I64 } from '../../integer-mate/i64/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== ObservationManager =============================== */

export function isObservationManager(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::oracle::ObservationManager`
}

export interface ObservationManagerFields {
  observations: ToField<Vector<Observation>>
  observationIndex: ToField<'u64'>
  observationCardinality: ToField<'u64'>
  observationCardinalityNext: ToField<'u64'>
}

export type ObservationManagerReified = Reified<ObservationManager, ObservationManagerFields>

export class ObservationManager implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::oracle::ObservationManager`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObservationManager.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::oracle::ObservationManager`
  readonly $typeArgs: []
  readonly $isPhantom = ObservationManager.$isPhantom

  readonly observations: ToField<Vector<Observation>>
  readonly observationIndex: ToField<'u64'>
  readonly observationCardinality: ToField<'u64'>
  readonly observationCardinalityNext: ToField<'u64'>

  private constructor(typeArgs: [], fields: ObservationManagerFields) {
    this.$fullTypeName = composeSuiType(
      ObservationManager.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::oracle::ObservationManager`
    this.$typeArgs = typeArgs

    this.observations = fields.observations
    this.observationIndex = fields.observationIndex
    this.observationCardinality = fields.observationCardinality
    this.observationCardinalityNext = fields.observationCardinalityNext
  }

  static reified(): ObservationManagerReified {
    const reifiedBcs = ObservationManager.bcs
    return {
      typeName: ObservationManager.$typeName,
      fullTypeName: composeSuiType(
        ObservationManager.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::oracle::ObservationManager`,
      typeArgs: [] as [],
      isPhantom: ObservationManager.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObservationManager.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObservationManager.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObservationManager.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObservationManager.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObservationManager.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObservationManager.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObservationManager.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObservationManager.fetch(client, id),
      new: (fields: ObservationManagerFields) => {
        return new ObservationManager([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObservationManager.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObservationManager>> {
    return phantom(ObservationManager.reified())
  }
  static get p() {
    return ObservationManager.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObservationManager', {
      observations: bcs.vector(Observation.bcs),
      observation_index: bcs.u64(),
      observation_cardinality: bcs.u64(),
      observation_cardinality_next: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof ObservationManager.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ObservationManager.instantiateBcs> {
    if (!ObservationManager.cachedBcs) {
      ObservationManager.cachedBcs = ObservationManager.instantiateBcs()
    }
    return ObservationManager.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObservationManager {
    return ObservationManager.reified().new({
      observations: decodeFromFields(reified.vector(Observation.reified()), fields.observations),
      observationIndex: decodeFromFields('u64', fields.observation_index),
      observationCardinality: decodeFromFields('u64', fields.observation_cardinality),
      observationCardinalityNext: decodeFromFields('u64', fields.observation_cardinality_next),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObservationManager {
    if (!isObservationManager(item.type)) {
      throw new Error('not a ObservationManager type')
    }

    return ObservationManager.reified().new({
      observations: decodeFromFieldsWithTypes(
        reified.vector(Observation.reified()),
        item.fields.observations
      ),
      observationIndex: decodeFromFieldsWithTypes('u64', item.fields.observation_index),
      observationCardinality: decodeFromFieldsWithTypes('u64', item.fields.observation_cardinality),
      observationCardinalityNext: decodeFromFieldsWithTypes(
        'u64',
        item.fields.observation_cardinality_next
      ),
    })
  }

  static fromBcs(data: Uint8Array): ObservationManager {
    return ObservationManager.fromFields(ObservationManager.bcs.parse(data))
  }

  toJSONField() {
    return {
      observations: fieldToJSON<Vector<Observation>>(
        `vector<${Observation.$typeName}>`,
        this.observations
      ),
      observationIndex: this.observationIndex.toString(),
      observationCardinality: this.observationCardinality.toString(),
      observationCardinalityNext: this.observationCardinalityNext.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObservationManager {
    return ObservationManager.reified().new({
      observations: decodeFromJSONField(reified.vector(Observation.reified()), field.observations),
      observationIndex: decodeFromJSONField('u64', field.observationIndex),
      observationCardinality: decodeFromJSONField('u64', field.observationCardinality),
      observationCardinalityNext: decodeFromJSONField('u64', field.observationCardinalityNext),
    })
  }

  static fromJSON(json: Record<string, any>): ObservationManager {
    if (json.$typeName !== ObservationManager.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ObservationManager.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObservationManager {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObservationManager(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ObservationManager object`)
    }
    return ObservationManager.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObservationManager {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObservationManager(data.bcs.type)) {
        throw new Error(`object at is not a ObservationManager object`)
      }

      return ObservationManager.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObservationManager.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObservationManager> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObservationManager object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObservationManager(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObservationManager object`)
    }

    return ObservationManager.fromSuiObjectData(res.data)
  }
}

/* ============================== Observation =============================== */

export function isObservation(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::oracle::Observation`
}

export interface ObservationFields {
  timestamp: ToField<'u64'>
  tickCumulative: ToField<I64>
  secondsPerLiquidityCumulative: ToField<'u256'>
  initialized: ToField<'bool'>
}

export type ObservationReified = Reified<Observation, ObservationFields>

export class Observation implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::oracle::Observation`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Observation.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::oracle::Observation`
  readonly $typeArgs: []
  readonly $isPhantom = Observation.$isPhantom

  readonly timestamp: ToField<'u64'>
  readonly tickCumulative: ToField<I64>
  readonly secondsPerLiquidityCumulative: ToField<'u256'>
  readonly initialized: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObservationFields) {
    this.$fullTypeName = composeSuiType(
      Observation.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::oracle::Observation`
    this.$typeArgs = typeArgs

    this.timestamp = fields.timestamp
    this.tickCumulative = fields.tickCumulative
    this.secondsPerLiquidityCumulative = fields.secondsPerLiquidityCumulative
    this.initialized = fields.initialized
  }

  static reified(): ObservationReified {
    const reifiedBcs = Observation.bcs
    return {
      typeName: Observation.$typeName,
      fullTypeName: composeSuiType(
        Observation.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::oracle::Observation`,
      typeArgs: [] as [],
      isPhantom: Observation.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Observation.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Observation.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Observation.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Observation.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Observation.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Observation.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Observation.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Observation.fetch(client, id),
      new: (fields: ObservationFields) => {
        return new Observation([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Observation.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Observation>> {
    return phantom(Observation.reified())
  }
  static get p() {
    return Observation.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Observation', {
      timestamp: bcs.u64(),
      tick_cumulative: I64.bcs,
      seconds_per_liquidity_cumulative: bcs.u256(),
      initialized: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Observation.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Observation.instantiateBcs> {
    if (!Observation.cachedBcs) {
      Observation.cachedBcs = Observation.instantiateBcs()
    }
    return Observation.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Observation {
    return Observation.reified().new({
      timestamp: decodeFromFields('u64', fields.timestamp),
      tickCumulative: decodeFromFields(I64.reified(), fields.tick_cumulative),
      secondsPerLiquidityCumulative: decodeFromFields(
        'u256',
        fields.seconds_per_liquidity_cumulative
      ),
      initialized: decodeFromFields('bool', fields.initialized),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Observation {
    if (!isObservation(item.type)) {
      throw new Error('not a Observation type')
    }

    return Observation.reified().new({
      timestamp: decodeFromFieldsWithTypes('u64', item.fields.timestamp),
      tickCumulative: decodeFromFieldsWithTypes(I64.reified(), item.fields.tick_cumulative),
      secondsPerLiquidityCumulative: decodeFromFieldsWithTypes(
        'u256',
        item.fields.seconds_per_liquidity_cumulative
      ),
      initialized: decodeFromFieldsWithTypes('bool', item.fields.initialized),
    })
  }

  static fromBcs(data: Uint8Array): Observation {
    return Observation.fromFields(Observation.bcs.parse(data))
  }

  toJSONField() {
    return {
      timestamp: this.timestamp.toString(),
      tickCumulative: this.tickCumulative.toJSONField(),
      secondsPerLiquidityCumulative: this.secondsPerLiquidityCumulative.toString(),
      initialized: this.initialized,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Observation {
    return Observation.reified().new({
      timestamp: decodeFromJSONField('u64', field.timestamp),
      tickCumulative: decodeFromJSONField(I64.reified(), field.tickCumulative),
      secondsPerLiquidityCumulative: decodeFromJSONField(
        'u256',
        field.secondsPerLiquidityCumulative
      ),
      initialized: decodeFromJSONField('bool', field.initialized),
    })
  }

  static fromJSON(json: Record<string, any>): Observation {
    if (json.$typeName !== Observation.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Observation.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Observation {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObservation(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Observation object`)
    }
    return Observation.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Observation {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObservation(data.bcs.type)) {
        throw new Error(`object at is not a Observation object`)
      }

      return Observation.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Observation.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Observation> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Observation object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObservation(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Observation object`)
    }

    return Observation.fromSuiObjectData(res.data)
  }
}
