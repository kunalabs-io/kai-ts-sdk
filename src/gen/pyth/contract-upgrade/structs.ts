/**
 * This module implements handling a governance VAA to enact upgrading the
 * Pyth contract to a new build. The procedure to upgrade this contract
 * requires a Programmable Transaction, which includes the following procedure:
 * 1.  Load new build.
 * 2.  Authorize upgrade.
 * 3.  Upgrade.
 * 4.  Commit upgrade.
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
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { ID } from '../../sui/object/structs'
import { Bytes32 } from '../../wormhole/bytes32/structs'

/* ============================== ContractUpgraded =============================== */

export function isContractUpgraded(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'contract_upgrade::ContractUpgraded')
    }::contract_upgrade::ContractUpgraded`
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

  static get $typeName(): `${string}::contract_upgrade::ContractUpgraded` {
    return `${
      getTypeOrigin('pyth', 'contract_upgrade::ContractUpgraded')
    }::contract_upgrade::ContractUpgraded` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ContractUpgraded.$typeName = ContractUpgraded.$typeName
  readonly $fullTypeName: `${string}::contract_upgrade::ContractUpgraded`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ContractUpgraded.$isPhantom = ContractUpgraded.$isPhantom

  readonly oldContract: ToField<ID>
  readonly newContract: ToField<ID>

  private constructor(typeArgs: [], fields: ContractUpgradedFields) {
    this.$fullTypeName = composeSuiType(
      ContractUpgraded.$typeName,
      ...typeArgs,
    ) as `${string}::contract_upgrade::ContractUpgraded`
    this.$typeArgs = typeArgs

    this.oldContract = fields.oldContract
    this.newContract = fields.newContract
  }

  static reified(): ContractUpgradedReified {
    const reifiedBcs = ContractUpgraded.bcs
    return {
      get typeName() {
        return ContractUpgraded.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ContractUpgraded.$typeName,
          ...[],
        ) as `${string}::contract_upgrade::ContractUpgraded`
      },
      typeArgs: [] as [],
      isPhantom: ContractUpgraded.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ContractUpgraded.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ContractUpgraded.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ContractUpgraded.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ContractUpgraded.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ContractUpgraded.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ContractUpgraded.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ContractUpgraded.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ContractUpgraded.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ContractUpgraded.fetch(client, id),
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

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ContractUpgraded {
    if (!isContractUpgraded(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ContractUpgraded object`)
    }
    return ContractUpgraded.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ContractUpgraded.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ContractUpgraded {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isContractUpgraded(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ContractUpgraded object`)
    }
    return ContractUpgraded.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ContractUpgraded.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
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

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ContractUpgraded> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isContractUpgraded(object.type)) {
      throw new Error(`object at id ${id} is not a ContractUpgraded object`)
    }
    return ContractUpgraded.fromBcs(object.content)
  }
}

/* ============================== UpgradeContract =============================== */

export function isUpgradeContract(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('pyth', 'contract_upgrade::UpgradeContract')
    }::contract_upgrade::UpgradeContract`
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

  static get $typeName(): `${string}::contract_upgrade::UpgradeContract` {
    return `${
      getTypeOrigin('pyth', 'contract_upgrade::UpgradeContract')
    }::contract_upgrade::UpgradeContract` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpgradeContract.$typeName = UpgradeContract.$typeName
  readonly $fullTypeName: `${string}::contract_upgrade::UpgradeContract`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpgradeContract.$isPhantom = UpgradeContract.$isPhantom

  readonly digest: ToField<Bytes32>

  private constructor(typeArgs: [], fields: UpgradeContractFields) {
    this.$fullTypeName = composeSuiType(
      UpgradeContract.$typeName,
      ...typeArgs,
    ) as `${string}::contract_upgrade::UpgradeContract`
    this.$typeArgs = typeArgs

    this.digest = fields.digest
  }

  static reified(): UpgradeContractReified {
    const reifiedBcs = UpgradeContract.bcs
    return {
      get typeName() {
        return UpgradeContract.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpgradeContract.$typeName,
          ...[],
        ) as `${string}::contract_upgrade::UpgradeContract`
      },
      typeArgs: [] as [],
      isPhantom: UpgradeContract.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpgradeContract.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeContract.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpgradeContract.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpgradeContract.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpgradeContract.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpgradeContract.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => UpgradeContract.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpgradeContract.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => UpgradeContract.fetch(client, id),
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

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpgradeContract {
    if (!isUpgradeContract(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpgradeContract object`)
    }
    return UpgradeContract.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpgradeContract.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpgradeContract {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpgradeContract(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpgradeContract object`)
    }
    return UpgradeContract.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpgradeContract.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
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

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpgradeContract> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpgradeContract(object.type)) {
      throw new Error(`object at id ${id} is not a UpgradeContract object`)
    }
    return UpgradeContract.fromBcs(object.content)
  }
}
