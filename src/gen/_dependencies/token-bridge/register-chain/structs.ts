/**
 * This module implements handling a governance VAA to enact registering a
 * foreign Token Bridge for a particular chain ID.
 */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { ExternalAddress } from '../../../wormhole/external-address/structs'

/* ============================== GovernanceWitness =============================== */

export function isGovernanceWitness(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'register_chain::GovernanceWitness')
    }::register_chain::GovernanceWitness`
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

  static readonly $typeName: `${string}::register_chain::GovernanceWitness` = `${
    getTypeOrigin('token-bridge', 'register_chain::GovernanceWitness')
  }::register_chain::GovernanceWitness` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GovernanceWitness.$typeName = GovernanceWitness.$typeName
  readonly $fullTypeName: `${string}::register_chain::GovernanceWitness`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GovernanceWitness.$isPhantom = GovernanceWitness.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: GovernanceWitnessFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceWitness.$typeName,
      ...typeArgs,
    ) as `${string}::register_chain::GovernanceWitness`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): GovernanceWitnessReified {
    const reifiedBcs = GovernanceWitness.bcs
    return {
      typeName: GovernanceWitness.$typeName,
      fullTypeName: composeSuiType(
        GovernanceWitness.$typeName,
        ...[],
      ) as `${string}::register_chain::GovernanceWitness`,
      typeArgs: [] as [],
      isPhantom: GovernanceWitness.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => GovernanceWitness.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => GovernanceWitness.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => GovernanceWitness.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => GovernanceWitness.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => GovernanceWitness.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => GovernanceWitness.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => GovernanceWitness.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => GovernanceWitness.fetch(client, id),
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

  static fromSuiParsedData(content: SuiParsedData): GovernanceWitness {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isGovernanceWitness(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a GovernanceWitness object`)
    }
    return GovernanceWitness.fromFieldsWithTypes(content)
  }

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

  static async fetch(client: SupportedSuiClient, id: string): Promise<GovernanceWitness> {
    const res = await fetchObjectBcs(client, id)
    if (!isGovernanceWitness(res.type)) {
      throw new Error(`object at id ${id} is not a GovernanceWitness object`)
    }

    return GovernanceWitness.fromBcs(res.bcsBytes)
  }
}

/* ============================== RegisterChain =============================== */

export function isRegisterChain(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'register_chain::RegisterChain')
    }::register_chain::RegisterChain`
}

export interface RegisterChainFields {
  chain: ToField<'u16'>
  contractAddress: ToField<ExternalAddress>
}

export type RegisterChainReified = Reified<RegisterChain, RegisterChainFields>

export type RegisterChainJSONField = {
  chain: number
  contractAddress: ToJSON<ExternalAddress>
}

export type RegisterChainJSON = {
  $typeName: typeof RegisterChain.$typeName
  $typeArgs: []
} & RegisterChainJSONField

export class RegisterChain implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::register_chain::RegisterChain` = `${
    getTypeOrigin('token-bridge', 'register_chain::RegisterChain')
  }::register_chain::RegisterChain` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RegisterChain.$typeName = RegisterChain.$typeName
  readonly $fullTypeName: `${string}::register_chain::RegisterChain`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RegisterChain.$isPhantom = RegisterChain.$isPhantom

  readonly chain: ToField<'u16'>
  readonly contractAddress: ToField<ExternalAddress>

  private constructor(typeArgs: [], fields: RegisterChainFields) {
    this.$fullTypeName = composeSuiType(
      RegisterChain.$typeName,
      ...typeArgs,
    ) as `${string}::register_chain::RegisterChain`
    this.$typeArgs = typeArgs

    this.chain = fields.chain
    this.contractAddress = fields.contractAddress
  }

  static reified(): RegisterChainReified {
    const reifiedBcs = RegisterChain.bcs
    return {
      typeName: RegisterChain.$typeName,
      fullTypeName: composeSuiType(
        RegisterChain.$typeName,
        ...[],
      ) as `${string}::register_chain::RegisterChain`,
      typeArgs: [] as [],
      isPhantom: RegisterChain.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RegisterChain.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RegisterChain.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RegisterChain.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RegisterChain.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RegisterChain.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RegisterChain.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RegisterChain.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => RegisterChain.fetch(client, id),
      new: (fields: RegisterChainFields) => {
        return new RegisterChain([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RegisterChainReified {
    return RegisterChain.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RegisterChain>> {
    return phantom(RegisterChain.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RegisterChain>> {
    return RegisterChain.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RegisterChain', {
      chain: bcs.u16(),
      contract_address: ExternalAddress.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RegisterChain.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RegisterChain.instantiateBcs> {
    if (!RegisterChain.cachedBcs) {
      RegisterChain.cachedBcs = RegisterChain.instantiateBcs()
    }
    return RegisterChain.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RegisterChain {
    return RegisterChain.reified().new({
      chain: decodeFromFields('u16', fields.chain),
      contractAddress: decodeFromFields(ExternalAddress.reified(), fields.contract_address),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RegisterChain {
    if (!isRegisterChain(item.type)) {
      throw new Error('not a RegisterChain type')
    }

    return RegisterChain.reified().new({
      chain: decodeFromFieldsWithTypes('u16', item.fields.chain),
      contractAddress: decodeFromFieldsWithTypes(
        ExternalAddress.reified(),
        item.fields.contract_address,
      ),
    })
  }

  static fromBcs(data: Uint8Array): RegisterChain {
    return RegisterChain.fromFields(RegisterChain.bcs.parse(data))
  }

  toJSONField(): RegisterChainJSONField {
    return {
      chain: this.chain,
      contractAddress: this.contractAddress.toJSONField(),
    }
  }

  toJSON(): RegisterChainJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RegisterChain {
    return RegisterChain.reified().new({
      chain: decodeFromJSONField('u16', field.chain),
      contractAddress: decodeFromJSONField(ExternalAddress.reified(), field.contractAddress),
    })
  }

  static fromJSON(json: Record<string, any>): RegisterChain {
    if (json.$typeName !== RegisterChain.$typeName) {
      throw new Error(
        `not a RegisterChain json object: expected '${RegisterChain.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RegisterChain.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RegisterChain {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRegisterChain(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RegisterChain object`)
    }
    return RegisterChain.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RegisterChain {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRegisterChain(data.bcs.type)) {
        throw new Error(`object at is not a RegisterChain object`)
      }

      return RegisterChain.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RegisterChain.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<RegisterChain> {
    const res = await fetchObjectBcs(client, id)
    if (!isRegisterChain(res.type)) {
      throw new Error(`object at id ${id} is not a RegisterChain object`)
    }

    return RegisterChain.fromBcs(res.bcsBytes)
  }
}
