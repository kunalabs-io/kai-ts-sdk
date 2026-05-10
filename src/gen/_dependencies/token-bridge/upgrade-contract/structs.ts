/**
 * This module implements handling a governance VAA to enact upgrading the
 * Token Bridge contract to a new build. The procedure to upgrade this contract
 * requires a Programmable Transaction, which includes the following procedure:
 * 1.  Load new build.
 * 2.  Authorize upgrade.
 * 3.  Upgrade.
 * 4.  Commit upgrade.
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
import { ID } from '../../../sui/object/structs'
import { Bytes32 } from '../../../wormhole/bytes32/structs'

/* ============================== GovernanceWitness =============================== */

export function isGovernanceWitness(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'upgrade_contract::GovernanceWitness')
    }::upgrade_contract::GovernanceWitness`
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

  static readonly $typeName: `${string}::upgrade_contract::GovernanceWitness` = `${
    getTypeOrigin('token-bridge', 'upgrade_contract::GovernanceWitness')
  }::upgrade_contract::GovernanceWitness` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GovernanceWitness.$typeName = GovernanceWitness.$typeName
  readonly $fullTypeName: `${string}::upgrade_contract::GovernanceWitness`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GovernanceWitness.$isPhantom = GovernanceWitness.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: GovernanceWitnessFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceWitness.$typeName,
      ...typeArgs,
    ) as `${string}::upgrade_contract::GovernanceWitness`
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
      ) as `${string}::upgrade_contract::GovernanceWitness`,
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

/* ============================== ContractUpgraded =============================== */

export function isContractUpgraded(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'upgrade_contract::ContractUpgraded')
    }::upgrade_contract::ContractUpgraded`
}

export interface ContractUpgradedFields {
  oldContract: ToField<ID>
  newContract: ToField<ID>
}

export type ContractUpgradedReified = Reified<ContractUpgraded, ContractUpgradedFields>

export type ContractUpgradedJSONField = {
  oldContract: string
  newContract: string
}

export type ContractUpgradedJSON = {
  $typeName: typeof ContractUpgraded.$typeName
  $typeArgs: []
} & ContractUpgradedJSONField

export class ContractUpgraded implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::upgrade_contract::ContractUpgraded` = `${
    getTypeOrigin('token-bridge', 'upgrade_contract::ContractUpgraded')
  }::upgrade_contract::ContractUpgraded` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ContractUpgraded.$typeName = ContractUpgraded.$typeName
  readonly $fullTypeName: `${string}::upgrade_contract::ContractUpgraded`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ContractUpgraded.$isPhantom = ContractUpgraded.$isPhantom

  readonly oldContract: ToField<ID>
  readonly newContract: ToField<ID>

  private constructor(typeArgs: [], fields: ContractUpgradedFields) {
    this.$fullTypeName = composeSuiType(
      ContractUpgraded.$typeName,
      ...typeArgs,
    ) as `${string}::upgrade_contract::ContractUpgraded`
    this.$typeArgs = typeArgs

    this.oldContract = fields.oldContract
    this.newContract = fields.newContract
  }

  static reified(): ContractUpgradedReified {
    const reifiedBcs = ContractUpgraded.bcs
    return {
      typeName: ContractUpgraded.$typeName,
      fullTypeName: composeSuiType(
        ContractUpgraded.$typeName,
        ...[],
      ) as `${string}::upgrade_contract::ContractUpgraded`,
      typeArgs: [] as [],
      isPhantom: ContractUpgraded.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ContractUpgraded.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ContractUpgraded.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ContractUpgraded.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ContractUpgraded.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ContractUpgraded.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ContractUpgraded.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ContractUpgraded.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => ContractUpgraded.fetch(client, id),
      new: (fields: ContractUpgradedFields) => {
        return new ContractUpgraded([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ContractUpgradedReified {
    return ContractUpgraded.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ContractUpgraded>> {
    return phantom(ContractUpgraded.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ContractUpgraded>> {
    return ContractUpgraded.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ContractUpgraded', {
      old_contract: ID.bcs,
      new_contract: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ContractUpgraded.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ContractUpgraded.instantiateBcs> {
    if (!ContractUpgraded.cachedBcs) {
      ContractUpgraded.cachedBcs = ContractUpgraded.instantiateBcs()
    }
    return ContractUpgraded.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ContractUpgraded {
    return ContractUpgraded.reified().new({
      oldContract: decodeFromFields(ID.reified(), fields.old_contract),
      newContract: decodeFromFields(ID.reified(), fields.new_contract),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ContractUpgraded {
    if (!isContractUpgraded(item.type)) {
      throw new Error('not a ContractUpgraded type')
    }

    return ContractUpgraded.reified().new({
      oldContract: decodeFromFieldsWithTypes(ID.reified(), item.fields.old_contract),
      newContract: decodeFromFieldsWithTypes(ID.reified(), item.fields.new_contract),
    })
  }

  static fromBcs(data: Uint8Array): ContractUpgraded {
    return ContractUpgraded.fromFields(ContractUpgraded.bcs.parse(data))
  }

  toJSONField(): ContractUpgradedJSONField {
    return {
      oldContract: this.oldContract,
      newContract: this.newContract,
    }
  }

  toJSON(): ContractUpgradedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ContractUpgraded {
    return ContractUpgraded.reified().new({
      oldContract: decodeFromJSONField(ID.reified(), field.oldContract),
      newContract: decodeFromJSONField(ID.reified(), field.newContract),
    })
  }

  static fromJSON(json: Record<string, any>): ContractUpgraded {
    if (json.$typeName !== ContractUpgraded.$typeName) {
      throw new Error(
        `not a ContractUpgraded json object: expected '${ContractUpgraded.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ContractUpgraded.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ContractUpgraded {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isContractUpgraded(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ContractUpgraded object`)
    }
    return ContractUpgraded.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ContractUpgraded {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isContractUpgraded(data.bcs.type)) {
        throw new Error(`object at is not a ContractUpgraded object`)
      }

      return ContractUpgraded.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ContractUpgraded.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ContractUpgraded> {
    const res = await fetchObjectBcs(client, id)
    if (!isContractUpgraded(res.type)) {
      throw new Error(`object at id ${id} is not a ContractUpgraded object`)
    }

    return ContractUpgraded.fromBcs(res.bcsBytes)
  }
}

/* ============================== UpgradeContract =============================== */

export function isUpgradeContract(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'upgrade_contract::UpgradeContract')
    }::upgrade_contract::UpgradeContract`
}

export interface UpgradeContractFields {
  digest: ToField<Bytes32>
}

export type UpgradeContractReified = Reified<UpgradeContract, UpgradeContractFields>

export type UpgradeContractJSONField = {
  digest: ToJSON<Bytes32>
}

export type UpgradeContractJSON = {
  $typeName: typeof UpgradeContract.$typeName
  $typeArgs: []
} & UpgradeContractJSONField

export class UpgradeContract implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::upgrade_contract::UpgradeContract` = `${
    getTypeOrigin('token-bridge', 'upgrade_contract::UpgradeContract')
  }::upgrade_contract::UpgradeContract` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpgradeContract.$typeName = UpgradeContract.$typeName
  readonly $fullTypeName: `${string}::upgrade_contract::UpgradeContract`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpgradeContract.$isPhantom = UpgradeContract.$isPhantom

  readonly digest: ToField<Bytes32>

  private constructor(typeArgs: [], fields: UpgradeContractFields) {
    this.$fullTypeName = composeSuiType(
      UpgradeContract.$typeName,
      ...typeArgs,
    ) as `${string}::upgrade_contract::UpgradeContract`
    this.$typeArgs = typeArgs

    this.digest = fields.digest
  }

  static reified(): UpgradeContractReified {
    const reifiedBcs = UpgradeContract.bcs
    return {
      typeName: UpgradeContract.$typeName,
      fullTypeName: composeSuiType(
        UpgradeContract.$typeName,
        ...[],
      ) as `${string}::upgrade_contract::UpgradeContract`,
      typeArgs: [] as [],
      isPhantom: UpgradeContract.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpgradeContract.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeContract.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpgradeContract.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpgradeContract.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpgradeContract.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => UpgradeContract.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpgradeContract.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => UpgradeContract.fetch(client, id),
      new: (fields: UpgradeContractFields) => {
        return new UpgradeContract([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpgradeContractReified {
    return UpgradeContract.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpgradeContract>> {
    return phantom(UpgradeContract.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpgradeContract>> {
    return UpgradeContract.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpgradeContract', {
      digest: Bytes32.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof UpgradeContract.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpgradeContract.instantiateBcs> {
    if (!UpgradeContract.cachedBcs) {
      UpgradeContract.cachedBcs = UpgradeContract.instantiateBcs()
    }
    return UpgradeContract.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpgradeContract {
    return UpgradeContract.reified().new({
      digest: decodeFromFields(Bytes32.reified(), fields.digest),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpgradeContract {
    if (!isUpgradeContract(item.type)) {
      throw new Error('not a UpgradeContract type')
    }

    return UpgradeContract.reified().new({
      digest: decodeFromFieldsWithTypes(Bytes32.reified(), item.fields.digest),
    })
  }

  static fromBcs(data: Uint8Array): UpgradeContract {
    return UpgradeContract.fromFields(UpgradeContract.bcs.parse(data))
  }

  toJSONField(): UpgradeContractJSONField {
    return {
      digest: this.digest.toJSONField(),
    }
  }

  toJSON(): UpgradeContractJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpgradeContract {
    return UpgradeContract.reified().new({
      digest: decodeFromJSONField(Bytes32.reified(), field.digest),
    })
  }

  static fromJSON(json: Record<string, any>): UpgradeContract {
    if (json.$typeName !== UpgradeContract.$typeName) {
      throw new Error(
        `not a UpgradeContract json object: expected '${UpgradeContract.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpgradeContract.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): UpgradeContract {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpgradeContract(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpgradeContract object`)
    }
    return UpgradeContract.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): UpgradeContract {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpgradeContract(data.bcs.type)) {
        throw new Error(`object at is not a UpgradeContract object`)
      }

      return UpgradeContract.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpgradeContract.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<UpgradeContract> {
    const res = await fetchObjectBcs(client, id)
    if (!isUpgradeContract(res.type)) {
      throw new Error(`object at id ${id} is not a UpgradeContract object`)
    }

    return UpgradeContract.fromBcs(res.bcsBytes)
  }
}
