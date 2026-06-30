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
import { DataSource } from '../data-source/structs'

/* ============================== DataSources =============================== */

export function isDataSources(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('pyth', 'set_data_sources::DataSources')}::set_data_sources::DataSources`
}

export interface DataSourcesFields {
  sources: ToField<Vector<DataSource>>
}

export type DataSourcesReified = Reified<DataSources, DataSourcesFields>

export type DataSourcesJSONField = {
  sources: ToJSON<DataSource>[]
}

export type DataSourcesJSON = {
  $typeName: typeof DataSources.$typeName
  $typeArgs: []
} & DataSourcesJSONField

export class DataSources implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::set_data_sources::DataSources` {
    return `${
      getTypeOrigin('pyth', 'set_data_sources::DataSources')
    }::set_data_sources::DataSources` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof DataSources.$typeName = DataSources.$typeName
  readonly $fullTypeName: `${string}::set_data_sources::DataSources`
  readonly $typeArgs: []
  readonly $isPhantom: typeof DataSources.$isPhantom = DataSources.$isPhantom

  readonly sources: ToField<Vector<DataSource>>

  private constructor(typeArgs: [], fields: DataSourcesFields) {
    this.$fullTypeName = composeSuiType(
      DataSources.$typeName,
      ...typeArgs,
    ) as `${string}::set_data_sources::DataSources`
    this.$typeArgs = typeArgs

    this.sources = fields.sources
  }

  static reified(): DataSourcesReified {
    const reifiedBcs = DataSources.bcs
    return {
      get typeName() {
        return DataSources.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DataSources.$typeName,
          ...[],
        ) as `${string}::set_data_sources::DataSources`
      },
      typeArgs: [] as [],
      isPhantom: DataSources.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => DataSources.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DataSources.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => DataSources.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DataSources.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => DataSources.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DataSources.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => DataSources.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => DataSources.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => DataSources.fetch(client, id),
      new: (fields: DataSourcesFields) => {
        return new DataSources([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DataSourcesReified {
    return DataSources.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<DataSources>> {
    return phantom(DataSources.reified())
  }

  static get p(): PhantomReified<ToTypeStr<DataSources>> {
    return DataSources.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('DataSources', {
      sources: bcs.vector(DataSource.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof DataSources.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DataSources.instantiateBcs> {
    if (!DataSources.cachedBcs) {
      DataSources.cachedBcs = DataSources.instantiateBcs()
    }
    return DataSources.cachedBcs
  }

  static fromFields(fields: Record<string, any>): DataSources {
    return DataSources.reified().new({
      sources: decodeFromFields(vector(DataSource.reified()), fields.sources),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): DataSources {
    if (!isDataSources(item.type)) {
      throw new Error('not a DataSources type')
    }

    return DataSources.reified().new({
      sources: decodeFromFieldsWithTypes(vector(DataSource.reified()), item.fields.sources),
    })
  }

  static fromBcs(data: Uint8Array): DataSources {
    return DataSources.fromFields(DataSources.bcs.parse(data))
  }

  toJSONField(): DataSourcesJSONField {
    return {
      sources: fieldToJSON<Vector<DataSource>>(`vector<${DataSource.$typeName}>`, this.sources),
    }
  }

  toJSON(): DataSourcesJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): DataSources {
    return DataSources.reified().new({
      sources: decodeFromJSONField(vector(DataSource.reified()), field.sources),
    })
  }

  static fromJSON(json: Record<string, any>): DataSources {
    if (json.$typeName !== DataSources.$typeName) {
      throw new Error(
        `not a DataSources json object: expected '${DataSources.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return DataSources.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): DataSources {
    if (!isDataSources(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DataSources object`)
    }
    return DataSources.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DataSources.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): DataSources {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDataSources(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DataSources object`)
    }
    return DataSources.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DataSources.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): DataSources {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDataSources(data.bcs.type)) {
        throw new Error(`object at is not a DataSources object`)
      }

      return DataSources.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DataSources.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<DataSources> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDataSources(object.type)) {
      throw new Error(`object at id ${id} is not a DataSources object`)
    }
    return DataSources.fromBcs(object.content)
  }
}
