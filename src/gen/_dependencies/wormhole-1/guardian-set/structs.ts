/**
 * This module implements a container that keeps track of a list of Guardian
 * public keys and which Guardian set index this list of Guardians represents.
 * Each guardian set is unique and there should be no two sets that have the
 * same Guardian set index (which requirement is handled in `wormhole::state`).
 *
 * If the current Guardian set is not the latest one, its `expiration_time` is
 * configured, which defines how long the past Guardian set can be active.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { Guardian } from '../guardian/structs'

/* ============================== GuardianSet =============================== */

export function isGuardianSet(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('wormhole-1', 'guardian_set::GuardianSet')}::guardian_set::GuardianSet`
}

export interface GuardianSetFields {
  /** A.K.A. Guardian set index. */
  index: ToField<'u32'>
  /** List of Guardians. This order should not change. */
  guardians: ToField<Vector<Guardian>>
  /** At what point in time the Guardian set is no longer active (in ms). */
  expirationTimestampMs: ToField<'u64'>
}

export type GuardianSetReified = Reified<GuardianSet, GuardianSetFields>

export type GuardianSetJSONField = {
  index: number
  guardians: ToJSON<Guardian>[]
  expirationTimestampMs: string
}

export type GuardianSetJSON = {
  $typeName: typeof GuardianSet.$typeName
  $typeArgs: []
} & GuardianSetJSONField

/**
 * Container for the list of Guardian public keys, its index value and at
 * what point in time the Guardian set is configured to expire.
 */
export class GuardianSet implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::guardian_set::GuardianSet` {
    return `${
      getTypeOrigin('wormhole-1', 'guardian_set::GuardianSet')
    }::guardian_set::GuardianSet` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GuardianSet.$typeName = GuardianSet.$typeName
  readonly $fullTypeName: `${string}::guardian_set::GuardianSet`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GuardianSet.$isPhantom = GuardianSet.$isPhantom

  /** A.K.A. Guardian set index. */
  readonly index: ToField<'u32'>
  /** List of Guardians. This order should not change. */
  readonly guardians: ToField<Vector<Guardian>>
  /** At what point in time the Guardian set is no longer active (in ms). */
  readonly expirationTimestampMs: ToField<'u64'>

  private constructor(typeArgs: [], fields: GuardianSetFields) {
    this.$fullTypeName = composeSuiType(
      GuardianSet.$typeName,
      ...typeArgs,
    ) as `${string}::guardian_set::GuardianSet`
    this.$typeArgs = typeArgs

    this.index = fields.index
    this.guardians = fields.guardians
    this.expirationTimestampMs = fields.expirationTimestampMs
  }

  static reified(): GuardianSetReified {
    const reifiedBcs = GuardianSet.bcs
    return {
      get typeName() {
        return GuardianSet.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          GuardianSet.$typeName,
          ...[],
        ) as `${string}::guardian_set::GuardianSet`
      },
      typeArgs: [] as [],
      isPhantom: GuardianSet.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GuardianSet.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GuardianSet.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GuardianSet.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GuardianSet.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GuardianSet.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        GuardianSet.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => GuardianSet.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GuardianSet.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => GuardianSet.fetch(client, id),
      new: (fields: GuardianSetFields) => {
        return new GuardianSet([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GuardianSetReified {
    return GuardianSet.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GuardianSet>> {
    return phantom(GuardianSet.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GuardianSet>> {
    return GuardianSet.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GuardianSet', {
      index: bcs.u32(),
      guardians: bcs.vector(Guardian.bcs),
      expiration_timestamp_ms: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof GuardianSet.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GuardianSet.instantiateBcs> {
    if (!GuardianSet.cachedBcs) {
      GuardianSet.cachedBcs = GuardianSet.instantiateBcs()
    }
    return GuardianSet.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GuardianSet {
    return GuardianSet.reified().new({
      index: decodeFromFields('u32', fields.index),
      guardians: decodeFromFields(vector(Guardian.reified()), fields.guardians),
      expirationTimestampMs: decodeFromFields('u64', fields.expiration_timestamp_ms),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GuardianSet {
    if (!isGuardianSet(item.type)) {
      throw new Error('not a GuardianSet type')
    }

    return GuardianSet.reified().new({
      index: decodeFromFieldsWithTypes('u32', item.fields.index),
      guardians: decodeFromFieldsWithTypes(vector(Guardian.reified()), item.fields.guardians),
      expirationTimestampMs: decodeFromFieldsWithTypes('u64', item.fields.expiration_timestamp_ms),
    })
  }

  static fromBcs(data: Uint8Array): GuardianSet {
    return GuardianSet.fromFields(GuardianSet.bcs.parse(data))
  }

  toJSONField(): GuardianSetJSONField {
    return {
      index: this.index,
      guardians: fieldToJSON<Vector<Guardian>>(`vector<${Guardian.$typeName}>`, this.guardians),
      expirationTimestampMs: this.expirationTimestampMs.toString(),
    }
  }

  toJSON(): GuardianSetJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GuardianSet {
    return GuardianSet.reified().new({
      index: decodeFromJSONField('u32', field.index),
      guardians: decodeFromJSONField(vector(Guardian.reified()), field.guardians),
      expirationTimestampMs: decodeFromJSONField('u64', field.expirationTimestampMs),
    })
  }

  static fromJSON(json: Record<string, any>): GuardianSet {
    if (json.$typeName !== GuardianSet.$typeName) {
      throw new Error(
        `not a GuardianSet json object: expected '${GuardianSet.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GuardianSet.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GuardianSet {
    if (!isGuardianSet(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GuardianSet object`)
    }
    return GuardianSet.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GuardianSet.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GuardianSet {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGuardianSet(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GuardianSet object`)
    }
    return GuardianSet.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GuardianSet.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GuardianSet {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGuardianSet(data.bcs.type)) {
        throw new Error(`object at is not a GuardianSet object`)
      }

      return GuardianSet.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GuardianSet.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GuardianSet> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGuardianSet(object.type)) {
      throw new Error(`object at id ${id} is not a GuardianSet object`)
    }
    return GuardianSet.fromBcs(object.content)
  }
}
