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
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { UID } from '../../../../sui/object/structs'
import { UpgradeCap } from '../../../../sui/package/structs'
import { Table } from '../../../../sui/table/structs'
import { ConsumedVAAs } from '../../0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a/consumed-vaas/structs'
import { EmitterCap } from '../../0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a/emitter/structs'
import { ExternalAddress } from '../../0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a/external-address/structs'
import { PKG_V1 } from '../index'
import { TokenRegistry } from '../token-registry/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== LatestOnly =============================== */

export function isLatestOnly(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::state::LatestOnly`
}

export interface LatestOnlyFields {
  dummyField: ToField<'bool'>
}

export type LatestOnlyReified = Reified<LatestOnly, LatestOnlyFields>

export class LatestOnly implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::state::LatestOnly`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = LatestOnly.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::state::LatestOnly`
  readonly $typeArgs: []
  readonly $isPhantom = LatestOnly.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: LatestOnlyFields) {
    this.$fullTypeName = composeSuiType(
      LatestOnly.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::state::LatestOnly`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): LatestOnlyReified {
    const reifiedBcs = LatestOnly.bcs
    return {
      typeName: LatestOnly.$typeName,
      fullTypeName: composeSuiType(
        LatestOnly.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::state::LatestOnly`,
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
      fetch: async (client: SuiClient, id: string) => LatestOnly.fetch(client, id),
      new: (fields: LatestOnlyFields) => {
        return new LatestOnly([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return LatestOnly.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LatestOnly>> {
    return phantom(LatestOnly.reified())
  }
  static get p() {
    return LatestOnly.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LatestOnly', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof LatestOnly.instantiateBcs> | null = null

  static get bcs() {
    if (!LatestOnly.cachedBcs) {
      LatestOnly.cachedBcs = LatestOnly.instantiateBcs()
    }
    return LatestOnly.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LatestOnly {
    return LatestOnly.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LatestOnly {
    return LatestOnly.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): LatestOnly {
    if (json.$typeName !== LatestOnly.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return LatestOnly.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LatestOnly.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<LatestOnly> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching LatestOnly object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isLatestOnly(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a LatestOnly object`)
    }

    return LatestOnly.fromSuiObjectData(res.data)
  }
}

/* ============================== State =============================== */

export function isState(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::state::State`
}

export interface StateFields {
  id: ToField<UID>
  governanceChain: ToField<'u16'>
  governanceContract: ToField<ExternalAddress>
  consumedVaas: ToField<ConsumedVAAs>
  emitterCap: ToField<EmitterCap>
  emitterRegistry: ToField<Table<'u16', ToPhantom<ExternalAddress>>>
  tokenRegistry: ToField<TokenRegistry>
  upgradeCap: ToField<UpgradeCap>
}

export type StateReified = Reified<State, StateFields>

export class State implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::state::State`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = State.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::state::State`
  readonly $typeArgs: []
  readonly $isPhantom = State.$isPhantom

  readonly id: ToField<UID>
  readonly governanceChain: ToField<'u16'>
  readonly governanceContract: ToField<ExternalAddress>
  readonly consumedVaas: ToField<ConsumedVAAs>
  readonly emitterCap: ToField<EmitterCap>
  readonly emitterRegistry: ToField<Table<'u16', ToPhantom<ExternalAddress>>>
  readonly tokenRegistry: ToField<TokenRegistry>
  readonly upgradeCap: ToField<UpgradeCap>

  private constructor(typeArgs: [], fields: StateFields) {
    this.$fullTypeName = composeSuiType(
      State.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::state::State`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.governanceChain = fields.governanceChain
    this.governanceContract = fields.governanceContract
    this.consumedVaas = fields.consumedVaas
    this.emitterCap = fields.emitterCap
    this.emitterRegistry = fields.emitterRegistry
    this.tokenRegistry = fields.tokenRegistry
    this.upgradeCap = fields.upgradeCap
  }

  static reified(): StateReified {
    const reifiedBcs = State.bcs
    return {
      typeName: State.$typeName,
      fullTypeName: composeSuiType(State.$typeName, ...[]) as `${typeof PKG_V1}::state::State`,
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
      fetch: async (client: SuiClient, id: string) => State.fetch(client, id),
      new: (fields: StateFields) => {
        return new State([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return State.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<State>> {
    return phantom(State.reified())
  }
  static get p() {
    return State.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('State', {
      id: UID.bcs,
      governance_chain: bcs.u16(),
      governance_contract: ExternalAddress.bcs,
      consumed_vaas: ConsumedVAAs.bcs,
      emitter_cap: EmitterCap.bcs,
      emitter_registry: Table.bcs,
      token_registry: TokenRegistry.bcs,
      upgrade_cap: UpgradeCap.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof State.instantiateBcs> | null = null

  static get bcs() {
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
      consumedVaas: decodeFromFields(ConsumedVAAs.reified(), fields.consumed_vaas),
      emitterCap: decodeFromFields(EmitterCap.reified(), fields.emitter_cap),
      emitterRegistry: decodeFromFields(
        Table.reified(reified.phantom('u16'), reified.phantom(ExternalAddress.reified())),
        fields.emitter_registry
      ),
      tokenRegistry: decodeFromFields(TokenRegistry.reified(), fields.token_registry),
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
        item.fields.governance_contract
      ),
      consumedVaas: decodeFromFieldsWithTypes(ConsumedVAAs.reified(), item.fields.consumed_vaas),
      emitterCap: decodeFromFieldsWithTypes(EmitterCap.reified(), item.fields.emitter_cap),
      emitterRegistry: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom('u16'), reified.phantom(ExternalAddress.reified())),
        item.fields.emitter_registry
      ),
      tokenRegistry: decodeFromFieldsWithTypes(TokenRegistry.reified(), item.fields.token_registry),
      upgradeCap: decodeFromFieldsWithTypes(UpgradeCap.reified(), item.fields.upgrade_cap),
    })
  }

  static fromBcs(data: Uint8Array): State {
    return State.fromFields(State.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      governanceChain: this.governanceChain,
      governanceContract: this.governanceContract.toJSONField(),
      consumedVaas: this.consumedVaas.toJSONField(),
      emitterCap: this.emitterCap.toJSONField(),
      emitterRegistry: this.emitterRegistry.toJSONField(),
      tokenRegistry: this.tokenRegistry.toJSONField(),
      upgradeCap: this.upgradeCap.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): State {
    return State.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      governanceChain: decodeFromJSONField('u16', field.governanceChain),
      governanceContract: decodeFromJSONField(ExternalAddress.reified(), field.governanceContract),
      consumedVaas: decodeFromJSONField(ConsumedVAAs.reified(), field.consumedVaas),
      emitterCap: decodeFromJSONField(EmitterCap.reified(), field.emitterCap),
      emitterRegistry: decodeFromJSONField(
        Table.reified(reified.phantom('u16'), reified.phantom(ExternalAddress.reified())),
        field.emitterRegistry
      ),
      tokenRegistry: decodeFromJSONField(TokenRegistry.reified(), field.tokenRegistry),
      upgradeCap: decodeFromJSONField(UpgradeCap.reified(), field.upgradeCap),
    })
  }

  static fromJSON(json: Record<string, any>): State {
    if (json.$typeName !== State.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return State.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return State.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<State> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching State object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isState(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a State object`)
    }

    return State.fromSuiObjectData(res.data)
  }
}
