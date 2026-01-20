import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { UID } from '../../sui/object/structs'
import { UpgradeCap } from '../../sui/package/structs'
import { ConsumedVAAs } from '../../wormhole/consumed-vaas/structs'
import { DataSource } from '../data-source/structs'

/* ============================== LatestOnly =============================== */

export function isLatestOnly(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth', 'state::LatestOnly')}::state::LatestOnly`
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

  static readonly $typeName: `${string}::state::LatestOnly` = `${
    getTypeOrigin('pyth', 'state::LatestOnly')
  }::state::LatestOnly` as const
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
      typeName: LatestOnly.$typeName,
      fullTypeName: composeSuiType(
        LatestOnly.$typeName,
        ...[],
      ) as `${string}::state::LatestOnly`,
      typeArgs: [] as [],
      isPhantom: LatestOnly.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LatestOnly.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LatestOnly.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LatestOnly.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LatestOnly.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LatestOnly.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => LatestOnly.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LatestOnly.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => LatestOnly.fetch(client, id),
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

  static fromSuiParsedData(content: SuiParsedData): LatestOnly {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLatestOnly(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LatestOnly object`)
    }
    return LatestOnly.fromFieldsWithTypes(content)
  }

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

  static async fetch(client: SupportedSuiClient, id: string): Promise<LatestOnly> {
    const res = await fetchObjectBcs(client, id)
    if (!isLatestOnly(res.type)) {
      throw new Error(`object at id ${id} is not a LatestOnly object`)
    }

    return LatestOnly.fromBcs(res.bcsBytes)
  }
}

/* ============================== State =============================== */

export function isState(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth', 'state::State')}::state::State`
}

export interface StateFields {
  id: ToField<UID>
  governanceDataSource: ToField<DataSource>
  stalePriceThreshold: ToField<'u64'>
  baseUpdateFee: ToField<'u64'>
  feeRecipientAddress: ToField<'address'>
  lastExecutedGovernanceSequence: ToField<'u64'>
  consumedVaas: ToField<ConsumedVAAs>
  upgradeCap: ToField<UpgradeCap>
}

export type StateReified = Reified<State, StateFields>

export type StateJSONField = {
  id: string
  governanceDataSource: ToJSON<DataSource>
  stalePriceThreshold: string
  baseUpdateFee: string
  feeRecipientAddress: string
  lastExecutedGovernanceSequence: string
  consumedVaas: ToJSON<ConsumedVAAs>
  upgradeCap: ToJSON<UpgradeCap>
}

export type StateJSON = {
  $typeName: typeof State.$typeName
  $typeArgs: []
} & StateJSONField

export class State implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::state::State` = `${
    getTypeOrigin('pyth', 'state::State')
  }::state::State` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof State.$typeName = State.$typeName
  readonly $fullTypeName: `${string}::state::State`
  readonly $typeArgs: []
  readonly $isPhantom: typeof State.$isPhantom = State.$isPhantom

  readonly id: ToField<UID>
  readonly governanceDataSource: ToField<DataSource>
  readonly stalePriceThreshold: ToField<'u64'>
  readonly baseUpdateFee: ToField<'u64'>
  readonly feeRecipientAddress: ToField<'address'>
  readonly lastExecutedGovernanceSequence: ToField<'u64'>
  readonly consumedVaas: ToField<ConsumedVAAs>
  readonly upgradeCap: ToField<UpgradeCap>

  private constructor(typeArgs: [], fields: StateFields) {
    this.$fullTypeName = composeSuiType(
      State.$typeName,
      ...typeArgs,
    ) as `${string}::state::State`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.governanceDataSource = fields.governanceDataSource
    this.stalePriceThreshold = fields.stalePriceThreshold
    this.baseUpdateFee = fields.baseUpdateFee
    this.feeRecipientAddress = fields.feeRecipientAddress
    this.lastExecutedGovernanceSequence = fields.lastExecutedGovernanceSequence
    this.consumedVaas = fields.consumedVaas
    this.upgradeCap = fields.upgradeCap
  }

  static reified(): StateReified {
    const reifiedBcs = State.bcs
    return {
      typeName: State.$typeName,
      fullTypeName: composeSuiType(
        State.$typeName,
        ...[],
      ) as `${string}::state::State`,
      typeArgs: [] as [],
      isPhantom: State.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => State.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => State.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => State.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => State.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => State.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => State.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => State.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => State.fetch(client, id),
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
      governance_data_source: DataSource.bcs,
      stale_price_threshold: bcs.u64(),
      base_update_fee: bcs.u64(),
      fee_recipient_address: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      last_executed_governance_sequence: bcs.u64(),
      consumed_vaas: ConsumedVAAs.bcs,
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
      governanceDataSource: decodeFromFields(DataSource.reified(), fields.governance_data_source),
      stalePriceThreshold: decodeFromFields('u64', fields.stale_price_threshold),
      baseUpdateFee: decodeFromFields('u64', fields.base_update_fee),
      feeRecipientAddress: decodeFromFields('address', fields.fee_recipient_address),
      lastExecutedGovernanceSequence: decodeFromFields(
        'u64',
        fields.last_executed_governance_sequence,
      ),
      consumedVaas: decodeFromFields(ConsumedVAAs.reified(), fields.consumed_vaas),
      upgradeCap: decodeFromFields(UpgradeCap.reified(), fields.upgrade_cap),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): State {
    if (!isState(item.type)) {
      throw new Error('not a State type')
    }

    return State.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      governanceDataSource: decodeFromFieldsWithTypes(
        DataSource.reified(),
        item.fields.governance_data_source,
      ),
      stalePriceThreshold: decodeFromFieldsWithTypes('u64', item.fields.stale_price_threshold),
      baseUpdateFee: decodeFromFieldsWithTypes('u64', item.fields.base_update_fee),
      feeRecipientAddress: decodeFromFieldsWithTypes('address', item.fields.fee_recipient_address),
      lastExecutedGovernanceSequence: decodeFromFieldsWithTypes(
        'u64',
        item.fields.last_executed_governance_sequence,
      ),
      consumedVaas: decodeFromFieldsWithTypes(ConsumedVAAs.reified(), item.fields.consumed_vaas),
      upgradeCap: decodeFromFieldsWithTypes(UpgradeCap.reified(), item.fields.upgrade_cap),
    })
  }

  static fromBcs(data: Uint8Array): State {
    return State.fromFields(State.bcs.parse(data))
  }

  toJSONField(): StateJSONField {
    return {
      id: this.id,
      governanceDataSource: this.governanceDataSource.toJSONField(),
      stalePriceThreshold: this.stalePriceThreshold.toString(),
      baseUpdateFee: this.baseUpdateFee.toString(),
      feeRecipientAddress: this.feeRecipientAddress,
      lastExecutedGovernanceSequence: this.lastExecutedGovernanceSequence.toString(),
      consumedVaas: this.consumedVaas.toJSONField(),
      upgradeCap: this.upgradeCap.toJSONField(),
    }
  }

  toJSON(): StateJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): State {
    return State.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      governanceDataSource: decodeFromJSONField(DataSource.reified(), field.governanceDataSource),
      stalePriceThreshold: decodeFromJSONField('u64', field.stalePriceThreshold),
      baseUpdateFee: decodeFromJSONField('u64', field.baseUpdateFee),
      feeRecipientAddress: decodeFromJSONField('address', field.feeRecipientAddress),
      lastExecutedGovernanceSequence: decodeFromJSONField(
        'u64',
        field.lastExecutedGovernanceSequence,
      ),
      consumedVaas: decodeFromJSONField(ConsumedVAAs.reified(), field.consumedVaas),
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

  static fromSuiParsedData(content: SuiParsedData): State {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isState(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a State object`)
    }
    return State.fromFieldsWithTypes(content)
  }

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

  static async fetch(client: SupportedSuiClient, id: string): Promise<State> {
    const res = await fetchObjectBcs(client, id)
    if (!isState(res.type)) {
      throw new Error(`object at id ${id} is not a State object`)
    }

    return State.fromBcs(res.bcsBytes)
  }
}

/* ============================== CurrentDigest =============================== */

export function isCurrentDigest(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth', 'state::CurrentDigest')}::state::CurrentDigest`
}

export interface CurrentDigestFields {
  dummyField: ToField<'bool'>
}

export type CurrentDigestReified = Reified<CurrentDigest, CurrentDigestFields>

export type CurrentDigestJSONField = {
  dummyField: boolean
}

export type CurrentDigestJSON = {
  $typeName: typeof CurrentDigest.$typeName
  $typeArgs: []
} & CurrentDigestJSONField

export class CurrentDigest implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::state::CurrentDigest` = `${
    getTypeOrigin('pyth', 'state::CurrentDigest')
  }::state::CurrentDigest` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CurrentDigest.$typeName = CurrentDigest.$typeName
  readonly $fullTypeName: `${string}::state::CurrentDigest`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CurrentDigest.$isPhantom = CurrentDigest.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: CurrentDigestFields) {
    this.$fullTypeName = composeSuiType(
      CurrentDigest.$typeName,
      ...typeArgs,
    ) as `${string}::state::CurrentDigest`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): CurrentDigestReified {
    const reifiedBcs = CurrentDigest.bcs
    return {
      typeName: CurrentDigest.$typeName,
      fullTypeName: composeSuiType(
        CurrentDigest.$typeName,
        ...[],
      ) as `${string}::state::CurrentDigest`,
      typeArgs: [] as [],
      isPhantom: CurrentDigest.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CurrentDigest.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CurrentDigest.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CurrentDigest.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CurrentDigest.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CurrentDigest.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CurrentDigest.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CurrentDigest.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => CurrentDigest.fetch(client, id),
      new: (fields: CurrentDigestFields) => {
        return new CurrentDigest([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CurrentDigestReified {
    return CurrentDigest.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CurrentDigest>> {
    return phantom(CurrentDigest.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CurrentDigest>> {
    return CurrentDigest.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CurrentDigest', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof CurrentDigest.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CurrentDigest.instantiateBcs> {
    if (!CurrentDigest.cachedBcs) {
      CurrentDigest.cachedBcs = CurrentDigest.instantiateBcs()
    }
    return CurrentDigest.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CurrentDigest {
    return CurrentDigest.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CurrentDigest {
    if (!isCurrentDigest(item.type)) {
      throw new Error('not a CurrentDigest type')
    }

    return CurrentDigest.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): CurrentDigest {
    return CurrentDigest.fromFields(CurrentDigest.bcs.parse(data))
  }

  toJSONField(): CurrentDigestJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): CurrentDigestJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CurrentDigest {
    return CurrentDigest.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): CurrentDigest {
    if (json.$typeName !== CurrentDigest.$typeName) {
      throw new Error(
        `not a CurrentDigest json object: expected '${CurrentDigest.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CurrentDigest.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CurrentDigest {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCurrentDigest(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CurrentDigest object`)
    }
    return CurrentDigest.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CurrentDigest {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCurrentDigest(data.bcs.type)) {
        throw new Error(`object at is not a CurrentDigest object`)
      }

      return CurrentDigest.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CurrentDigest.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<CurrentDigest> {
    const res = await fetchObjectBcs(client, id)
    if (!isCurrentDigest(res.type)) {
      throw new Error(`object at id ${id} is not a CurrentDigest object`)
    }

    return CurrentDigest.fromBcs(res.bcsBytes)
  }
}
