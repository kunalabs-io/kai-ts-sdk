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
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { I64 } from '../i64/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Observation =============================== */

export function isObservation(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::oracle::Observation`
}

export interface ObservationFields {
  timestampS: ToField<'u64'>
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

  readonly timestampS: ToField<'u64'>
  readonly tickCumulative: ToField<I64>
  readonly secondsPerLiquidityCumulative: ToField<'u256'>
  readonly initialized: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObservationFields) {
    this.$fullTypeName = composeSuiType(
      Observation.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::oracle::Observation`
    this.$typeArgs = typeArgs

    this.timestampS = fields.timestampS
    this.tickCumulative = fields.tickCumulative
    this.secondsPerLiquidityCumulative = fields.secondsPerLiquidityCumulative
    this.initialized = fields.initialized
  }

  static reified(): ObservationReified {
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
      fromBcs: (data: Uint8Array) => Observation.fromBcs(data),
      bcs: Observation.bcs,
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

  static get bcs() {
    return bcs.struct('Observation', {
      timestamp_s: bcs.u64(),
      tick_cumulative: I64.bcs,
      seconds_per_liquidity_cumulative: bcs.u256(),
      initialized: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): Observation {
    return Observation.reified().new({
      timestampS: decodeFromFields('u64', fields.timestamp_s),
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
      timestampS: decodeFromFieldsWithTypes('u64', item.fields.timestamp_s),
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
      timestampS: this.timestampS.toString(),
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
      timestampS: decodeFromJSONField('u64', field.timestampS),
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
