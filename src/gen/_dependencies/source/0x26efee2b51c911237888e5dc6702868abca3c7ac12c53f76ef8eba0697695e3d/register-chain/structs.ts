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
import { ExternalAddress } from '../../0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a/external-address/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== GovernanceWitness =============================== */

export function isGovernanceWitness(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::register_chain::GovernanceWitness`
}

export interface GovernanceWitnessFields {
  dummyField: ToField<'bool'>
}

export type GovernanceWitnessReified = Reified<GovernanceWitness, GovernanceWitnessFields>

export class GovernanceWitness implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::register_chain::GovernanceWitness`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = GovernanceWitness.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::register_chain::GovernanceWitness`
  readonly $typeArgs: []
  readonly $isPhantom = GovernanceWitness.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: GovernanceWitnessFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceWitness.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::register_chain::GovernanceWitness`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): GovernanceWitnessReified {
    const reifiedBcs = GovernanceWitness.bcs
    return {
      typeName: GovernanceWitness.$typeName,
      fullTypeName: composeSuiType(
        GovernanceWitness.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::register_chain::GovernanceWitness`,
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
      fetch: async (client: SuiClient, id: string) => GovernanceWitness.fetch(client, id),
      new: (fields: GovernanceWitnessFields) => {
        return new GovernanceWitness([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return GovernanceWitness.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<GovernanceWitness>> {
    return phantom(GovernanceWitness.reified())
  }
  static get p() {
    return GovernanceWitness.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('GovernanceWitness', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof GovernanceWitness.instantiateBcs> | null = null

  static get bcs() {
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): GovernanceWitness {
    return GovernanceWitness.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): GovernanceWitness {
    if (json.$typeName !== GovernanceWitness.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return GovernanceWitness.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return GovernanceWitness.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<GovernanceWitness> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching GovernanceWitness object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isGovernanceWitness(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a GovernanceWitness object`)
    }

    return GovernanceWitness.fromSuiObjectData(res.data)
  }
}

/* ============================== RegisterChain =============================== */

export function isRegisterChain(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::register_chain::RegisterChain`
}

export interface RegisterChainFields {
  chain: ToField<'u16'>
  contractAddress: ToField<ExternalAddress>
}

export type RegisterChainReified = Reified<RegisterChain, RegisterChainFields>

export class RegisterChain implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::register_chain::RegisterChain`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RegisterChain.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::register_chain::RegisterChain`
  readonly $typeArgs: []
  readonly $isPhantom = RegisterChain.$isPhantom

  readonly chain: ToField<'u16'>
  readonly contractAddress: ToField<ExternalAddress>

  private constructor(typeArgs: [], fields: RegisterChainFields) {
    this.$fullTypeName = composeSuiType(
      RegisterChain.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::register_chain::RegisterChain`
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
        ...[]
      ) as `${typeof PKG_V1}::register_chain::RegisterChain`,
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
      fetch: async (client: SuiClient, id: string) => RegisterChain.fetch(client, id),
      new: (fields: RegisterChainFields) => {
        return new RegisterChain([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RegisterChain.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RegisterChain>> {
    return phantom(RegisterChain.reified())
  }
  static get p() {
    return RegisterChain.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RegisterChain', {
      chain: bcs.u16(),
      contract_address: ExternalAddress.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RegisterChain.instantiateBcs> | null = null

  static get bcs() {
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
        item.fields.contract_address
      ),
    })
  }

  static fromBcs(data: Uint8Array): RegisterChain {
    return RegisterChain.fromFields(RegisterChain.bcs.parse(data))
  }

  toJSONField() {
    return {
      chain: this.chain,
      contractAddress: this.contractAddress.toJSONField(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return RegisterChain.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RegisterChain.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RegisterChain> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RegisterChain object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRegisterChain(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RegisterChain object`)
    }

    return RegisterChain.fromSuiObjectData(res.data)
  }
}
