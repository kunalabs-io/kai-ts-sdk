/**
 * This module implements the global state variables for Wormhole as a shared
 * object. The `State` object is used to perform anything that requires access
 * to data that defines the Wormhole contract. Examples of which are publishing
 * Wormhole messages (requires depositing a message fee), verifying `VAA` by
 * checking signatures versus an existing Guardian set, and generating new
 * emitters for Wormhole integrators.
 */

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
  ToTypeStr as ToPhantom,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { UID } from '../../sui/object/structs'
import { UpgradeCap } from '../../sui/package/structs'
import { Table } from '../../sui/table/structs'
import { ConsumedVAAs } from '../consumed-vaas/structs'
import { ExternalAddress } from '../external-address/structs'
import { FeeCollector } from '../fee-collector/structs'
import { GuardianSet } from '../guardian-set/structs'

/* ============================== LatestOnly =============================== */

export function isLatestOnly(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole', 'state::LatestOnly')}::state::LatestOnly`
}

export interface LatestOnlyFields {
  dummyField: ToField<'bool'>
}

export type LatestOnlyReified = Reified<LatestOnly, LatestOnlyFields>

export type LatestOnlyJSONField = {
  dummyField: boolean
}

export type LatestOnlyJSON = {
  $typeName: typeof LatestOnly.$typeName
  $typeArgs: []
} & LatestOnlyJSONField

/**
 * Capability reflecting that the current build version is used to invoke
 * state methods.
 */
export class LatestOnly implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::state::LatestOnly` {
    return `${getTypeOrigin('wormhole', 'state::LatestOnly')}::state::LatestOnly` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LatestOnly.$typeName = LatestOnly.$typeName
  readonly $fullTypeName: `${string}::state::LatestOnly`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LatestOnly.$isPhantom = LatestOnly.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: LatestOnlyFields) {
    this.$fullTypeName = composeSuiType(
      LatestOnly.$typeName,
      ...typeArgs,
    ) as `${string}::state::LatestOnly`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): LatestOnlyReified {
    const reifiedBcs = LatestOnly.bcs
    return {
      get typeName() {
        return LatestOnly.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          LatestOnly.$typeName,
          ...[],
        ) as `${string}::state::LatestOnly`
      },
      typeArgs: [] as [],
      isPhantom: LatestOnly.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LatestOnly.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LatestOnly.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LatestOnly.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LatestOnly.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LatestOnly.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        LatestOnly.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => LatestOnly.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LatestOnly.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => LatestOnly.fetch(client, id),
      new: (fields: LatestOnlyFields) => {
        return new LatestOnly([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LatestOnlyReified {
    return LatestOnly.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LatestOnly>> {
    return phantom(LatestOnly.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LatestOnly>> {
    return LatestOnly.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LatestOnly', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof LatestOnly.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof LatestOnly.instantiateBcs> {
    if (!LatestOnly.cachedBcs) {
      LatestOnly.cachedBcs = LatestOnly.instantiateBcs()
    }
    return LatestOnly.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LatestOnly {
    return LatestOnly.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LatestOnly {
    if (!isLatestOnly(item.type)) {
      throw new Error('not a LatestOnly type')
    }

    return LatestOnly.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): LatestOnly {
    return LatestOnly.fromFields(LatestOnly.bcs.parse(data))
  }

  toJSONField(): LatestOnlyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): LatestOnlyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LatestOnly {
    return LatestOnly.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): LatestOnly {
    if (json.$typeName !== LatestOnly.$typeName) {
      throw new Error(
        `not a LatestOnly json object: expected '${LatestOnly.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LatestOnly.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): LatestOnly {
    if (!isLatestOnly(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a LatestOnly object`)
    }
    return LatestOnly.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LatestOnly.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): LatestOnly {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLatestOnly(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LatestOnly object`)
    }
    return LatestOnly.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LatestOnly.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): LatestOnly {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLatestOnly(data.bcs.type)) {
        throw new Error(`object at is not a LatestOnly object`)
      }

      return LatestOnly.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LatestOnly.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<LatestOnly> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isLatestOnly(object.type)) {
      throw new Error(`object at id ${id} is not a LatestOnly object`)
    }
    return LatestOnly.fromBcs(object.content)
  }
}

/* ============================== State =============================== */

export function isState(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole', 'state::State')}::state::State`
}

export interface StateFields {
  id: ToField<UID>
  /** Governance chain ID. */
  governanceChain: ToField<'u16'>
  /** Governance contract address. */
  governanceContract: ToField<ExternalAddress>
  /** Current active guardian set index. */
  guardianSetIndex: ToField<'u32'>
  /** All guardian sets (including expired ones). */
  guardianSets: ToField<Table<'u32', ToPhantom<GuardianSet>>>
  /**
   * Period for which a guardian set stays active after it has been
   * replaced.
   *
   * NOTE: `Clock` timestamp is in units of ms while this value is in
   * terms of seconds. See `guardian_set` module for more info.
   */
  guardianSetSecondsToLive: ToField<'u32'>
  /**
   * Consumed VAA hashes to protect against replay. VAAs relevant to
   * Wormhole are just governance VAAs.
   */
  consumedVaas: ToField<ConsumedVAAs>
  /** Wormhole fee collector. */
  feeCollector: ToField<FeeCollector>
  /** Upgrade capability. */
  upgradeCap: ToField<UpgradeCap>
}

export type StateReified = Reified<State, StateFields>

export type StateJSONField = {
  id: string
  governanceChain: number
  governanceContract: ToJSON<ExternalAddress>
  guardianSetIndex: number
  guardianSets: ToJSON<Table<'u32', ToPhantom<GuardianSet>>>
  guardianSetSecondsToLive: number
  consumedVaas: ToJSON<ConsumedVAAs>
  feeCollector: ToJSON<FeeCollector>
  upgradeCap: ToJSON<UpgradeCap>
}

export type StateJSON = {
  $typeName: typeof State.$typeName
  $typeArgs: []
} & StateJSONField

/** Container for all state variables for Wormhole. */
export class State implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::state::State` {
    return `${getTypeOrigin('wormhole', 'state::State')}::state::State` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof State.$typeName = State.$typeName
  readonly $fullTypeName: `${string}::state::State`
  readonly $typeArgs: []
  readonly $isPhantom: typeof State.$isPhantom = State.$isPhantom

  readonly id: ToField<UID>
  /** Governance chain ID. */
  readonly governanceChain: ToField<'u16'>
  /** Governance contract address. */
  readonly governanceContract: ToField<ExternalAddress>
  /** Current active guardian set index. */
  readonly guardianSetIndex: ToField<'u32'>
  /** All guardian sets (including expired ones). */
  readonly guardianSets: ToField<Table<'u32', ToPhantom<GuardianSet>>>
  /**
   * Period for which a guardian set stays active after it has been
   * replaced.
   *
   * NOTE: `Clock` timestamp is in units of ms while this value is in
   * terms of seconds. See `guardian_set` module for more info.
   */
  readonly guardianSetSecondsToLive: ToField<'u32'>
  /**
   * Consumed VAA hashes to protect against replay. VAAs relevant to
   * Wormhole are just governance VAAs.
   */
  readonly consumedVaas: ToField<ConsumedVAAs>
  /** Wormhole fee collector. */
  readonly feeCollector: ToField<FeeCollector>
  /** Upgrade capability. */
  readonly upgradeCap: ToField<UpgradeCap>

  private constructor(typeArgs: [], fields: StateFields) {
    this.$fullTypeName = composeSuiType(
      State.$typeName,
      ...typeArgs,
    ) as `${string}::state::State`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.governanceChain = fields.governanceChain
    this.governanceContract = fields.governanceContract
    this.guardianSetIndex = fields.guardianSetIndex
    this.guardianSets = fields.guardianSets
    this.guardianSetSecondsToLive = fields.guardianSetSecondsToLive
    this.consumedVaas = fields.consumedVaas
    this.feeCollector = fields.feeCollector
    this.upgradeCap = fields.upgradeCap
  }

  static reified(): StateReified {
    const reifiedBcs = State.bcs
    return {
      get typeName() {
        return State.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          State.$typeName,
          ...[],
        ) as `${string}::state::State`
      },
      typeArgs: [] as [],
      isPhantom: State.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => State.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => State.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => State.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => State.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => State.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => State.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => State.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => State.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => State.fetch(client, id),
      new: (fields: StateFields) => {
        return new State([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): StateReified {
    return State.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<State>> {
    return phantom(State.reified())
  }

  static get p(): PhantomReified<ToTypeStr<State>> {
    return State.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('State', {
      id: UID.bcs,
      governance_chain: bcs.u16(),
      governance_contract: ExternalAddress.bcs,
      guardian_set_index: bcs.u32(),
      guardian_sets: Table.bcs,
      guardian_set_seconds_to_live: bcs.u32(),
      consumed_vaas: ConsumedVAAs.bcs,
      fee_collector: FeeCollector.bcs,
      upgrade_cap: UpgradeCap.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof State.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof State.instantiateBcs> {
    if (!State.cachedBcs) {
      State.cachedBcs = State.instantiateBcs()
    }
    return State.cachedBcs
  }

  static fromFields(fields: Record<string, any>): State {
    return State.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      governanceChain: decodeFromFields('u16', fields.governance_chain),
      governanceContract: decodeFromFields(ExternalAddress.reified(), fields.governance_contract),
      guardianSetIndex: decodeFromFields('u32', fields.guardian_set_index),
      guardianSets: decodeFromFields(
        Table.reified(phantom('u32'), phantom(GuardianSet.reified())),
        fields.guardian_sets,
      ),
      guardianSetSecondsToLive: decodeFromFields('u32', fields.guardian_set_seconds_to_live),
      consumedVaas: decodeFromFields(ConsumedVAAs.reified(), fields.consumed_vaas),
      feeCollector: decodeFromFields(FeeCollector.reified(), fields.fee_collector),
      upgradeCap: decodeFromFields(UpgradeCap.reified(), fields.upgrade_cap),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): State {
    if (!isState(item.type)) {
      throw new Error('not a State type')
    }

    return State.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      governanceChain: decodeFromFieldsWithTypes('u16', item.fields.governance_chain),
      governanceContract: decodeFromFieldsWithTypes(
        ExternalAddress.reified(),
        item.fields.governance_contract,
      ),
      guardianSetIndex: decodeFromFieldsWithTypes('u32', item.fields.guardian_set_index),
      guardianSets: decodeFromFieldsWithTypes(
        Table.reified(phantom('u32'), phantom(GuardianSet.reified())),
        item.fields.guardian_sets,
      ),
      guardianSetSecondsToLive: decodeFromFieldsWithTypes(
        'u32',
        item.fields.guardian_set_seconds_to_live,
      ),
      consumedVaas: decodeFromFieldsWithTypes(ConsumedVAAs.reified(), item.fields.consumed_vaas),
      feeCollector: decodeFromFieldsWithTypes(FeeCollector.reified(), item.fields.fee_collector),
      upgradeCap: decodeFromFieldsWithTypes(UpgradeCap.reified(), item.fields.upgrade_cap),
    })
  }

  static fromBcs(data: Uint8Array): State {
    return State.fromFields(State.bcs.parse(data))
  }

  toJSONField(): StateJSONField {
    return {
      id: this.id,
      governanceChain: this.governanceChain,
      governanceContract: this.governanceContract.toJSONField(),
      guardianSetIndex: this.guardianSetIndex,
      guardianSets: this.guardianSets.toJSONField(),
      guardianSetSecondsToLive: this.guardianSetSecondsToLive,
      consumedVaas: this.consumedVaas.toJSONField(),
      feeCollector: this.feeCollector.toJSONField(),
      upgradeCap: this.upgradeCap.toJSONField(),
    }
  }

  toJSON(): StateJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): State {
    return State.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      governanceChain: decodeFromJSONField('u16', field.governanceChain),
      governanceContract: decodeFromJSONField(ExternalAddress.reified(), field.governanceContract),
      guardianSetIndex: decodeFromJSONField('u32', field.guardianSetIndex),
      guardianSets: decodeFromJSONField(
        Table.reified(phantom('u32'), phantom(GuardianSet.reified())),
        field.guardianSets,
      ),
      guardianSetSecondsToLive: decodeFromJSONField('u32', field.guardianSetSecondsToLive),
      consumedVaas: decodeFromJSONField(ConsumedVAAs.reified(), field.consumedVaas),
      feeCollector: decodeFromJSONField(FeeCollector.reified(), field.feeCollector),
      upgradeCap: decodeFromJSONField(UpgradeCap.reified(), field.upgradeCap),
    })
  }

  static fromJSON(json: Record<string, any>): State {
    if (json.$typeName !== State.$typeName) {
      throw new Error(
        `not a State json object: expected '${State.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return State.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): State {
    if (!isState(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a State object`)
    }
    return State.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link State.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): State {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isState(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a State object`)
    }
    return State.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link State.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): State {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isState(data.bcs.type)) {
        throw new Error(`object at is not a State object`)
      }

      return State.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return State.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<State> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isState(object.type)) {
      throw new Error(`object at id ${id} is not a State object`)
    }
    return State.fromBcs(object.content)
  }
}
