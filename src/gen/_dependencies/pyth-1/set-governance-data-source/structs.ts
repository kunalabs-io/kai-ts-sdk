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
import { ExternalAddress } from '../../wormhole-1/external-address/structs'

/* ============================== GovernanceDataSource =============================== */

export function isGovernanceDataSource(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth-1', 'set_governance_data_source::GovernanceDataSource')
    }::set_governance_data_source::GovernanceDataSource`
}

export interface GovernanceDataSourceFields {
  emitterChainId: ToField<'u64'>
  emitterAddress: ToField<ExternalAddress>
  initialSequence: ToField<'u64'>
}

export type GovernanceDataSourceReified = Reified<GovernanceDataSource, GovernanceDataSourceFields>

export type GovernanceDataSourceJSONField = {
  emitterChainId: string
  emitterAddress: ToJSON<ExternalAddress>
  initialSequence: string
}

export type GovernanceDataSourceJSON = {
  $typeName: typeof GovernanceDataSource.$typeName
  $typeArgs: []
} & GovernanceDataSourceJSONField

export class GovernanceDataSource implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::set_governance_data_source::GovernanceDataSource` {
    return `${
      getTypeOrigin('pyth-1', 'set_governance_data_source::GovernanceDataSource')
    }::set_governance_data_source::GovernanceDataSource` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GovernanceDataSource.$typeName = GovernanceDataSource.$typeName
  readonly $fullTypeName: `${string}::set_governance_data_source::GovernanceDataSource`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GovernanceDataSource.$isPhantom = GovernanceDataSource.$isPhantom

  readonly emitterChainId: ToField<'u64'>
  readonly emitterAddress: ToField<ExternalAddress>
  readonly initialSequence: ToField<'u64'>

  private constructor(typeArgs: [], fields: GovernanceDataSourceFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceDataSource.$typeName,
      ...typeArgs,
    ) as `${string}::set_governance_data_source::GovernanceDataSource`
    this.$typeArgs = typeArgs

    this.emitterChainId = fields.emitterChainId
    this.emitterAddress = fields.emitterAddress
    this.initialSequence = fields.initialSequence
  }

  static reified(): GovernanceDataSourceReified {
    const reifiedBcs = GovernanceDataSource.bcs
    return {
      get typeName() {
        return GovernanceDataSource.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          GovernanceDataSource.$typeName,
          ...[],
        ) as `${string}::set_governance_data_source::GovernanceDataSource`
      },
      typeArgs: [] as [],
      isPhantom: GovernanceDataSource.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GovernanceDataSource.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        GovernanceDataSource.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GovernanceDataSource.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GovernanceDataSource.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GovernanceDataSource.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        GovernanceDataSource.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        GovernanceDataSource.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        GovernanceDataSource.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        GovernanceDataSource.fetch(client, id),
      new: (fields: GovernanceDataSourceFields) => {
        return new GovernanceDataSource([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GovernanceDataSourceReified {
    return GovernanceDataSource.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GovernanceDataSource>> {
    return phantom(GovernanceDataSource.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GovernanceDataSource>> {
    return GovernanceDataSource.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GovernanceDataSource', {
      emitter_chain_id: bcs.u64(),
      emitter_address: ExternalAddress.bcs,
      initial_sequence: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof GovernanceDataSource.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GovernanceDataSource.instantiateBcs> {
    if (!GovernanceDataSource.cachedBcs) {
      GovernanceDataSource.cachedBcs = GovernanceDataSource.instantiateBcs()
    }
    return GovernanceDataSource.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GovernanceDataSource {
    return GovernanceDataSource.reified().new({
      emitterChainId: decodeFromFields('u64', fields.emitter_chain_id),
      emitterAddress: decodeFromFields(ExternalAddress.reified(), fields.emitter_address),
      initialSequence: decodeFromFields('u64', fields.initial_sequence),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GovernanceDataSource {
    if (!isGovernanceDataSource(item.type)) {
      throw new Error('not a GovernanceDataSource type')
    }

    return GovernanceDataSource.reified().new({
      emitterChainId: decodeFromFieldsWithTypes('u64', item.fields.emitter_chain_id),
      emitterAddress: decodeFromFieldsWithTypes(
        ExternalAddress.reified(),
        item.fields.emitter_address,
      ),
      initialSequence: decodeFromFieldsWithTypes('u64', item.fields.initial_sequence),
    })
  }

  static fromBcs(data: Uint8Array): GovernanceDataSource {
    return GovernanceDataSource.fromFields(GovernanceDataSource.bcs.parse(data))
  }

  toJSONField(): GovernanceDataSourceJSONField {
    return {
      emitterChainId: this.emitterChainId.toString(),
      emitterAddress: this.emitterAddress.toJSONField(),
      initialSequence: this.initialSequence.toString(),
    }
  }

  toJSON(): GovernanceDataSourceJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GovernanceDataSource {
    return GovernanceDataSource.reified().new({
      emitterChainId: decodeFromJSONField('u64', field.emitterChainId),
      emitterAddress: decodeFromJSONField(ExternalAddress.reified(), field.emitterAddress),
      initialSequence: decodeFromJSONField('u64', field.initialSequence),
    })
  }

  static fromJSON(json: Record<string, any>): GovernanceDataSource {
    if (json.$typeName !== GovernanceDataSource.$typeName) {
      throw new Error(
        `not a GovernanceDataSource json object: expected '${GovernanceDataSource.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GovernanceDataSource.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GovernanceDataSource {
    if (!isGovernanceDataSource(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GovernanceDataSource object`)
    }
    return GovernanceDataSource.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GovernanceDataSource.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GovernanceDataSource {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGovernanceDataSource(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a GovernanceDataSource object`,
      )
    }
    return GovernanceDataSource.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GovernanceDataSource.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GovernanceDataSource {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGovernanceDataSource(data.bcs.type)) {
        throw new Error(`object at is not a GovernanceDataSource object`)
      }

      return GovernanceDataSource.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GovernanceDataSource.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GovernanceDataSource> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGovernanceDataSource(object.type)) {
      throw new Error(`object at id ${id} is not a GovernanceDataSource object`)
    }
    return GovernanceDataSource.fromBcs(object.content)
  }
}
