/**
 * This module implements handling a governance VAA to enact updating the
 * current guardian set to be a new set of guardian public keys. As a part of
 * this process, the previous guardian set's expiration time is set. Keep in
 * mind that the current guardian set has no expiration.
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

/* ============================== GovernanceWitness =============================== */

export function isGovernanceWitness(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole-1', 'update_guardian_set::GovernanceWitness')
    }::update_guardian_set::GovernanceWitness`
}

export interface GovernanceWitnessFields {
  dummyField: ToField<'bool'>
}

export type GovernanceWitnessReified = Reified<GovernanceWitness, GovernanceWitnessFields>

export type GovernanceWitnessJSONField = {
  dummyField: boolean
}

export type GovernanceWitnessJSON = {
  $typeName: typeof GovernanceWitness.$typeName
  $typeArgs: []
} & GovernanceWitnessJSONField

export class GovernanceWitness implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::update_guardian_set::GovernanceWitness` {
    return `${
      getTypeOrigin('wormhole-1', 'update_guardian_set::GovernanceWitness')
    }::update_guardian_set::GovernanceWitness` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GovernanceWitness.$typeName = GovernanceWitness.$typeName
  readonly $fullTypeName: `${string}::update_guardian_set::GovernanceWitness`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GovernanceWitness.$isPhantom = GovernanceWitness.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: GovernanceWitnessFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceWitness.$typeName,
      ...typeArgs,
    ) as `${string}::update_guardian_set::GovernanceWitness`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): GovernanceWitnessReified {
    const reifiedBcs = GovernanceWitness.bcs
    return {
      get typeName() {
        return GovernanceWitness.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          GovernanceWitness.$typeName,
          ...[],
        ) as `${string}::update_guardian_set::GovernanceWitness`
      },
      typeArgs: [] as [],
      isPhantom: GovernanceWitness.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GovernanceWitness.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GovernanceWitness.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GovernanceWitness.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GovernanceWitness.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GovernanceWitness.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        GovernanceWitness.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => GovernanceWitness.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GovernanceWitness.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => GovernanceWitness.fetch(client, id),
      new: (fields: GovernanceWitnessFields) => {
        return new GovernanceWitness([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GovernanceWitnessReified {
    return GovernanceWitness.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GovernanceWitness>> {
    return phantom(GovernanceWitness.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GovernanceWitness>> {
    return GovernanceWitness.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GovernanceWitness', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof GovernanceWitness.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GovernanceWitness.instantiateBcs> {
    if (!GovernanceWitness.cachedBcs) {
      GovernanceWitness.cachedBcs = GovernanceWitness.instantiateBcs()
    }
    return GovernanceWitness.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GovernanceWitness {
    return GovernanceWitness.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GovernanceWitness {
    if (!isGovernanceWitness(item.type)) {
      throw new Error('not a GovernanceWitness type')
    }

    return GovernanceWitness.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): GovernanceWitness {
    return GovernanceWitness.fromFields(GovernanceWitness.bcs.parse(data))
  }

  toJSONField(): GovernanceWitnessJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): GovernanceWitnessJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GovernanceWitness {
    return GovernanceWitness.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): GovernanceWitness {
    if (json.$typeName !== GovernanceWitness.$typeName) {
      throw new Error(
        `not a GovernanceWitness json object: expected '${GovernanceWitness.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GovernanceWitness.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GovernanceWitness {
    if (!isGovernanceWitness(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GovernanceWitness object`)
    }
    return GovernanceWitness.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GovernanceWitness.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GovernanceWitness {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGovernanceWitness(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GovernanceWitness object`)
    }
    return GovernanceWitness.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GovernanceWitness.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GovernanceWitness {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGovernanceWitness(data.bcs.type)) {
        throw new Error(`object at is not a GovernanceWitness object`)
      }

      return GovernanceWitness.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GovernanceWitness.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GovernanceWitness> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGovernanceWitness(object.type)) {
      throw new Error(`object at id ${id} is not a GovernanceWitness object`)
    }
    return GovernanceWitness.fromBcs(object.content)
  }
}

/* ============================== GuardianSetAdded =============================== */

export function isGuardianSetAdded(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole-1', 'update_guardian_set::GuardianSetAdded')
    }::update_guardian_set::GuardianSetAdded`
}

export interface GuardianSetAddedFields {
  newIndex: ToField<'u32'>
}

export type GuardianSetAddedReified = Reified<GuardianSetAdded, GuardianSetAddedFields>

export type GuardianSetAddedJSONField = {
  newIndex: number
}

export type GuardianSetAddedJSON = {
  $typeName: typeof GuardianSetAdded.$typeName
  $typeArgs: []
} & GuardianSetAddedJSONField

/** Event reflecting a Guardian Set update. */
export class GuardianSetAdded implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::update_guardian_set::GuardianSetAdded` {
    return `${
      getTypeOrigin('wormhole-1', 'update_guardian_set::GuardianSetAdded')
    }::update_guardian_set::GuardianSetAdded` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GuardianSetAdded.$typeName = GuardianSetAdded.$typeName
  readonly $fullTypeName: `${string}::update_guardian_set::GuardianSetAdded`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GuardianSetAdded.$isPhantom = GuardianSetAdded.$isPhantom

  readonly newIndex: ToField<'u32'>

  private constructor(typeArgs: [], fields: GuardianSetAddedFields) {
    this.$fullTypeName = composeSuiType(
      GuardianSetAdded.$typeName,
      ...typeArgs,
    ) as `${string}::update_guardian_set::GuardianSetAdded`
    this.$typeArgs = typeArgs

    this.newIndex = fields.newIndex
  }

  static reified(): GuardianSetAddedReified {
    const reifiedBcs = GuardianSetAdded.bcs
    return {
      get typeName() {
        return GuardianSetAdded.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          GuardianSetAdded.$typeName,
          ...[],
        ) as `${string}::update_guardian_set::GuardianSetAdded`
      },
      typeArgs: [] as [],
      isPhantom: GuardianSetAdded.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GuardianSetAdded.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GuardianSetAdded.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GuardianSetAdded.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GuardianSetAdded.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GuardianSetAdded.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        GuardianSetAdded.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => GuardianSetAdded.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GuardianSetAdded.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => GuardianSetAdded.fetch(client, id),
      new: (fields: GuardianSetAddedFields) => {
        return new GuardianSetAdded([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): GuardianSetAddedReified {
    return GuardianSetAdded.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GuardianSetAdded>> {
    return phantom(GuardianSetAdded.reified())
  }

  static get p(): PhantomReified<ToTypeStr<GuardianSetAdded>> {
    return GuardianSetAdded.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GuardianSetAdded', {
      new_index: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof GuardianSetAdded.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof GuardianSetAdded.instantiateBcs> {
    if (!GuardianSetAdded.cachedBcs) {
      GuardianSetAdded.cachedBcs = GuardianSetAdded.instantiateBcs()
    }
    return GuardianSetAdded.cachedBcs
  }

  static fromFields(fields: Record<string, any>): GuardianSetAdded {
    return GuardianSetAdded.reified().new({
      newIndex: decodeFromFields('u32', fields.new_index),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): GuardianSetAdded {
    if (!isGuardianSetAdded(item.type)) {
      throw new Error('not a GuardianSetAdded type')
    }

    return GuardianSetAdded.reified().new({
      newIndex: decodeFromFieldsWithTypes('u32', item.fields.new_index),
    })
  }

  static fromBcs(data: Uint8Array): GuardianSetAdded {
    return GuardianSetAdded.fromFields(GuardianSetAdded.bcs.parse(data))
  }

  toJSONField(): GuardianSetAddedJSONField {
    return {
      newIndex: this.newIndex,
    }
  }

  toJSON(): GuardianSetAddedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GuardianSetAdded {
    return GuardianSetAdded.reified().new({
      newIndex: decodeFromJSONField('u32', field.newIndex),
    })
  }

  static fromJSON(json: Record<string, any>): GuardianSetAdded {
    if (json.$typeName !== GuardianSetAdded.$typeName) {
      throw new Error(
        `not a GuardianSetAdded json object: expected '${GuardianSetAdded.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return GuardianSetAdded.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): GuardianSetAdded {
    if (!isGuardianSetAdded(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a GuardianSetAdded object`)
    }
    return GuardianSetAdded.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GuardianSetAdded.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): GuardianSetAdded {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGuardianSetAdded(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GuardianSetAdded object`)
    }
    return GuardianSetAdded.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link GuardianSetAdded.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): GuardianSetAdded {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isGuardianSetAdded(data.bcs.type)) {
        throw new Error(`object at is not a GuardianSetAdded object`)
      }

      return GuardianSetAdded.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GuardianSetAdded.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<GuardianSetAdded> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isGuardianSetAdded(object.type)) {
      throw new Error(`object at id ${id} is not a GuardianSetAdded object`)
    }
    return GuardianSetAdded.fromBcs(object.content)
  }
}

/* ============================== UpdateGuardianSet =============================== */

export function isUpdateGuardianSet(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole-1', 'update_guardian_set::UpdateGuardianSet')
    }::update_guardian_set::UpdateGuardianSet`
}

export interface UpdateGuardianSetFields {
  newIndex: ToField<'u32'>
  guardians: ToField<Vector<Guardian>>
}

export type UpdateGuardianSetReified = Reified<UpdateGuardianSet, UpdateGuardianSetFields>

export type UpdateGuardianSetJSONField = {
  newIndex: number
  guardians: ToJSON<Guardian>[]
}

export type UpdateGuardianSetJSON = {
  $typeName: typeof UpdateGuardianSet.$typeName
  $typeArgs: []
} & UpdateGuardianSetJSONField

export class UpdateGuardianSet implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::update_guardian_set::UpdateGuardianSet` {
    return `${
      getTypeOrigin('wormhole-1', 'update_guardian_set::UpdateGuardianSet')
    }::update_guardian_set::UpdateGuardianSet` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateGuardianSet.$typeName = UpdateGuardianSet.$typeName
  readonly $fullTypeName: `${string}::update_guardian_set::UpdateGuardianSet`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateGuardianSet.$isPhantom = UpdateGuardianSet.$isPhantom

  readonly newIndex: ToField<'u32'>
  readonly guardians: ToField<Vector<Guardian>>

  private constructor(typeArgs: [], fields: UpdateGuardianSetFields) {
    this.$fullTypeName = composeSuiType(
      UpdateGuardianSet.$typeName,
      ...typeArgs,
    ) as `${string}::update_guardian_set::UpdateGuardianSet`
    this.$typeArgs = typeArgs

    this.newIndex = fields.newIndex
    this.guardians = fields.guardians
  }

  static reified(): UpdateGuardianSetReified {
    const reifiedBcs = UpdateGuardianSet.bcs
    return {
      get typeName() {
        return UpdateGuardianSet.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdateGuardianSet.$typeName,
          ...[],
        ) as `${string}::update_guardian_set::UpdateGuardianSet`
      },
      typeArgs: [] as [],
      isPhantom: UpdateGuardianSet.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateGuardianSet.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateGuardianSet.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateGuardianSet.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateGuardianSet.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateGuardianSet.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdateGuardianSet.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => UpdateGuardianSet.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpdateGuardianSet.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => UpdateGuardianSet.fetch(client, id),
      new: (fields: UpdateGuardianSetFields) => {
        return new UpdateGuardianSet([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateGuardianSetReified {
    return UpdateGuardianSet.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateGuardianSet>> {
    return phantom(UpdateGuardianSet.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateGuardianSet>> {
    return UpdateGuardianSet.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateGuardianSet', {
      new_index: bcs.u32(),
      guardians: bcs.vector(Guardian.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateGuardianSet.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateGuardianSet.instantiateBcs> {
    if (!UpdateGuardianSet.cachedBcs) {
      UpdateGuardianSet.cachedBcs = UpdateGuardianSet.instantiateBcs()
    }
    return UpdateGuardianSet.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateGuardianSet {
    return UpdateGuardianSet.reified().new({
      newIndex: decodeFromFields('u32', fields.new_index),
      guardians: decodeFromFields(vector(Guardian.reified()), fields.guardians),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateGuardianSet {
    if (!isUpdateGuardianSet(item.type)) {
      throw new Error('not a UpdateGuardianSet type')
    }

    return UpdateGuardianSet.reified().new({
      newIndex: decodeFromFieldsWithTypes('u32', item.fields.new_index),
      guardians: decodeFromFieldsWithTypes(vector(Guardian.reified()), item.fields.guardians),
    })
  }

  static fromBcs(data: Uint8Array): UpdateGuardianSet {
    return UpdateGuardianSet.fromFields(UpdateGuardianSet.bcs.parse(data))
  }

  toJSONField(): UpdateGuardianSetJSONField {
    return {
      newIndex: this.newIndex,
      guardians: fieldToJSON<Vector<Guardian>>(`vector<${Guardian.$typeName}>`, this.guardians),
    }
  }

  toJSON(): UpdateGuardianSetJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateGuardianSet {
    return UpdateGuardianSet.reified().new({
      newIndex: decodeFromJSONField('u32', field.newIndex),
      guardians: decodeFromJSONField(vector(Guardian.reified()), field.guardians),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateGuardianSet {
    if (json.$typeName !== UpdateGuardianSet.$typeName) {
      throw new Error(
        `not a UpdateGuardianSet json object: expected '${UpdateGuardianSet.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateGuardianSet.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpdateGuardianSet {
    if (!isUpdateGuardianSet(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdateGuardianSet object`)
    }
    return UpdateGuardianSet.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateGuardianSet.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdateGuardianSet {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateGuardianSet(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpdateGuardianSet object`)
    }
    return UpdateGuardianSet.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateGuardianSet.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdateGuardianSet {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateGuardianSet(data.bcs.type)) {
        throw new Error(`object at is not a UpdateGuardianSet object`)
      }

      return UpdateGuardianSet.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateGuardianSet.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdateGuardianSet> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdateGuardianSet(object.type)) {
      throw new Error(`object at id ${id} is not a UpdateGuardianSet object`)
    }
    return UpdateGuardianSet.fromBcs(object.content)
  }
}
