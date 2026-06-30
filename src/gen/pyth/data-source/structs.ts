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
import { ExternalAddress } from '../../wormhole/external-address/structs'

/* ============================== DataSource =============================== */

export function isDataSource(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth', 'data_source::DataSource')}::data_source::DataSource`
}

export interface DataSourceFields {
  emitterChain: ToField<'u64'>
  emitterAddress: ToField<ExternalAddress>
}

export type DataSourceReified = Reified<DataSource, DataSourceFields>

export type DataSourceJSONField = {
  emitterChain: string
  emitterAddress: ToJSON<ExternalAddress>
}

export type DataSourceJSON = {
  $typeName: typeof DataSource.$typeName
  $typeArgs: []
} & DataSourceJSONField

export class DataSource implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::data_source::DataSource` {
    return `${getTypeOrigin('pyth', 'data_source::DataSource')}::data_source::DataSource` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DataSource.$typeName = DataSource.$typeName
  readonly $fullTypeName: `${string}::data_source::DataSource`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DataSource.$isPhantom = DataSource.$isPhantom

  readonly emitterChain: ToField<'u64'>
  readonly emitterAddress: ToField<ExternalAddress>

  private constructor(typeArgs: [], fields: DataSourceFields) {
    this.$fullTypeName = composeSuiType(
      DataSource.$typeName,
      ...typeArgs,
    ) as `${string}::data_source::DataSource`
    this.$typeArgs = typeArgs

    this.emitterChain = fields.emitterChain
    this.emitterAddress = fields.emitterAddress
  }

  static reified(): DataSourceReified {
    const reifiedBcs = DataSource.bcs
    return {
      get typeName() {
        return DataSource.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DataSource.$typeName,
          ...[],
        ) as `${string}::data_source::DataSource`
      },
      typeArgs: [] as [],
      isPhantom: DataSource.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DataSource.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DataSource.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DataSource.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DataSource.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DataSource.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DataSource.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DataSource.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DataSource.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DataSource.fetch(client, id),
      new: (fields: DataSourceFields) => {
        return new DataSource([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DataSourceReified {
    return DataSource.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DataSource>> {
    return phantom(DataSource.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DataSource>> {
    return DataSource.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DataSource', {
      emitter_chain: bcs.u64(),
      emitter_address: ExternalAddress.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof DataSource.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DataSource.instantiateBcs> {
    if (!DataSource.cachedBcs) {
      DataSource.cachedBcs = DataSource.instantiateBcs()
    }
    return DataSource.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DataSource {
    return DataSource.reified().new({
      emitterChain: decodeFromFields('u64', fields.emitter_chain),
      emitterAddress: decodeFromFields(ExternalAddress.reified(), fields.emitter_address),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DataSource {
    if (!isDataSource(item.type)) {
      throw new Error('not a DataSource type')
    }

    return DataSource.reified().new({
      emitterChain: decodeFromFieldsWithTypes('u64', item.fields.emitter_chain),
      emitterAddress: decodeFromFieldsWithTypes(
        ExternalAddress.reified(),
        item.fields.emitter_address,
      ),
    })
  }

  static fromBcs(data: Uint8Array): DataSource {
    return DataSource.fromFields(DataSource.bcs.parse(data))
  }

  toJSONField(): DataSourceJSONField {
    return {
      emitterChain: this.emitterChain.toString(),
      emitterAddress: this.emitterAddress.toJSONField(),
    }
  }

  toJSON(): DataSourceJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DataSource {
    return DataSource.reified().new({
      emitterChain: decodeFromJSONField('u64', field.emitterChain),
      emitterAddress: decodeFromJSONField(ExternalAddress.reified(), field.emitterAddress),
    })
  }

  static fromJSON(json: Record<string, any>): DataSource {
    if (json.$typeName !== DataSource.$typeName) {
      throw new Error(
        `not a DataSource json object: expected '${DataSource.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DataSource.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DataSource {
    if (!isDataSource(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DataSource object`)
    }
    return DataSource.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DataSource.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DataSource {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDataSource(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DataSource object`)
    }
    return DataSource.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DataSource.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DataSource {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDataSource(data.bcs.type)) {
        throw new Error(`object at is not a DataSource object`)
      }

      return DataSource.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DataSource.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DataSource> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDataSource(object.type)) {
      throw new Error(`object at id ${id} is not a DataSource object`)
    }
    return DataSource.fromBcs(object.content)
  }
}
