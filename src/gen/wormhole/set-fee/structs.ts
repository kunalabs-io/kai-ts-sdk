/**
 * This module implements handling a governance VAA to enact setting the
 * Wormhole message fee to another amount.
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

/* ============================== GovernanceWitness =============================== */

export function isGovernanceWitness(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('wormhole', 'set_fee::GovernanceWitness')}::set_fee::GovernanceWitness`
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

  static get $typeName(): `${string}::set_fee::GovernanceWitness` {
    return `${
      getTypeOrigin('wormhole', 'set_fee::GovernanceWitness')
    }::set_fee::GovernanceWitness` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GovernanceWitness.$typeName = GovernanceWitness.$typeName
  readonly $fullTypeName: `${string}::set_fee::GovernanceWitness`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GovernanceWitness.$isPhantom = GovernanceWitness.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: GovernanceWitnessFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceWitness.$typeName,
      ...typeArgs,
    ) as `${string}::set_fee::GovernanceWitness`
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
        ) as `${string}::set_fee::GovernanceWitness`
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

/* ============================== SetFee =============================== */

export function isSetFee(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole', 'set_fee::SetFee')}::set_fee::SetFee`
}

export interface SetFeeFields {
  amount: ToField<'u64'>
}

export type SetFeeReified = Reified<SetFee, SetFeeFields>

export type SetFeeJSONField = {
  amount: string
}

export type SetFeeJSON = {
  $typeName: typeof SetFee.$typeName
  $typeArgs: []
} & SetFeeJSONField

export class SetFee implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::set_fee::SetFee` {
    return `${getTypeOrigin('wormhole', 'set_fee::SetFee')}::set_fee::SetFee` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SetFee.$typeName = SetFee.$typeName
  readonly $fullTypeName: `${string}::set_fee::SetFee`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SetFee.$isPhantom = SetFee.$isPhantom

  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: SetFeeFields) {
    this.$fullTypeName = composeSuiType(
      SetFee.$typeName,
      ...typeArgs,
    ) as `${string}::set_fee::SetFee`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
  }

  static reified(): SetFeeReified {
    const reifiedBcs = SetFee.bcs
    return {
      get typeName() {
        return SetFee.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SetFee.$typeName,
          ...[],
        ) as `${string}::set_fee::SetFee`
      },
      typeArgs: [] as [],
      isPhantom: SetFee.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SetFee.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SetFee.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SetFee.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SetFee.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SetFee.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => SetFee.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SetFee.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SetFee.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SetFee.fetch(client, id),
      new: (fields: SetFeeFields) => {
        return new SetFee([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SetFeeReified {
    return SetFee.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetFee>> {
    return phantom(SetFee.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SetFee>> {
    return SetFee.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SetFee', {
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SetFee.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SetFee.instantiateBcs> {
    if (!SetFee.cachedBcs) {
      SetFee.cachedBcs = SetFee.instantiateBcs()
    }
    return SetFee.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SetFee {
    return SetFee.reified().new({
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SetFee {
    if (!isSetFee(item.type)) {
      throw new Error('not a SetFee type')
    }

    return SetFee.reified().new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): SetFee {
    return SetFee.fromFields(SetFee.bcs.parse(data))
  }

  toJSONField(): SetFeeJSONField {
    return {
      amount: this.amount.toString(),
    }
  }

  toJSON(): SetFeeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SetFee {
    return SetFee.reified().new({
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): SetFee {
    if (json.$typeName !== SetFee.$typeName) {
      throw new Error(
        `not a SetFee json object: expected '${SetFee.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SetFee.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SetFee {
    if (!isSetFee(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SetFee object`)
    }
    return SetFee.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SetFee.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SetFee {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSetFee(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SetFee object`)
    }
    return SetFee.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SetFee.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SetFee {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSetFee(data.bcs.type)) {
        throw new Error(`object at is not a SetFee object`)
      }

      return SetFee.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetFee.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SetFee> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSetFee(object.type)) {
      throw new Error(`object at id ${id} is not a SetFee object`)
    }
    return SetFee.fromBcs(object.content)
  }
}
