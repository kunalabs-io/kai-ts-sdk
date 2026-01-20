/**
 * This module implements handling a governance VAA to enact transferring some
 * amount of collected fees to an intended recipient.
 */

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

/* ============================== GovernanceWitness =============================== */

export function isGovernanceWitness(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole', 'transfer_fee::GovernanceWitness')
    }::transfer_fee::GovernanceWitness`
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

  static readonly $typeName: `${string}::transfer_fee::GovernanceWitness` = `${
    getTypeOrigin('wormhole', 'transfer_fee::GovernanceWitness')
  }::transfer_fee::GovernanceWitness` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof GovernanceWitness.$typeName = GovernanceWitness.$typeName
  readonly $fullTypeName: `${string}::transfer_fee::GovernanceWitness`
  readonly $typeArgs: []
  readonly $isPhantom: typeof GovernanceWitness.$isPhantom = GovernanceWitness.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: GovernanceWitnessFields) {
    this.$fullTypeName = composeSuiType(
      GovernanceWitness.$typeName,
      ...typeArgs,
    ) as `${string}::transfer_fee::GovernanceWitness`
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
      ) as `${string}::transfer_fee::GovernanceWitness`,
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

/* ============================== TransferFee =============================== */

export function isTransferFee(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('wormhole', 'transfer_fee::TransferFee')}::transfer_fee::TransferFee`
}

export interface TransferFeeFields {
  amount: ToField<'u64'>
  recipient: ToField<'address'>
}

export type TransferFeeReified = Reified<TransferFee, TransferFeeFields>

export type TransferFeeJSONField = {
  amount: string
  recipient: string
}

export type TransferFeeJSON = {
  $typeName: typeof TransferFee.$typeName
  $typeArgs: []
} & TransferFeeJSONField

export class TransferFee implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::transfer_fee::TransferFee` = `${
    getTypeOrigin('wormhole', 'transfer_fee::TransferFee')
  }::transfer_fee::TransferFee` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof TransferFee.$typeName = TransferFee.$typeName
  readonly $fullTypeName: `${string}::transfer_fee::TransferFee`
  readonly $typeArgs: []
  readonly $isPhantom: typeof TransferFee.$isPhantom = TransferFee.$isPhantom

  readonly amount: ToField<'u64'>
  readonly recipient: ToField<'address'>

  private constructor(typeArgs: [], fields: TransferFeeFields) {
    this.$fullTypeName = composeSuiType(
      TransferFee.$typeName,
      ...typeArgs,
    ) as `${string}::transfer_fee::TransferFee`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
    this.recipient = fields.recipient
  }

  static reified(): TransferFeeReified {
    const reifiedBcs = TransferFee.bcs
    return {
      typeName: TransferFee.$typeName,
      fullTypeName: composeSuiType(
        TransferFee.$typeName,
        ...[],
      ) as `${string}::transfer_fee::TransferFee`,
      typeArgs: [] as [],
      isPhantom: TransferFee.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferFee.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TransferFee.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferFee.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferFee.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferFee.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TransferFee.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TransferFee.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => TransferFee.fetch(client, id),
      new: (fields: TransferFeeFields) => {
        return new TransferFee([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): TransferFeeReified {
    return TransferFee.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferFee>> {
    return phantom(TransferFee.reified())
  }

  static get p(): PhantomReified<ToTypeStr<TransferFee>> {
    return TransferFee.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TransferFee', {
      amount: bcs.u64(),
      recipient: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof TransferFee.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof TransferFee.instantiateBcs> {
    if (!TransferFee.cachedBcs) {
      TransferFee.cachedBcs = TransferFee.instantiateBcs()
    }
    return TransferFee.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TransferFee {
    return TransferFee.reified().new({
      amount: decodeFromFields('u64', fields.amount),
      recipient: decodeFromFields('address', fields.recipient),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TransferFee {
    if (!isTransferFee(item.type)) {
      throw new Error('not a TransferFee type')
    }

    return TransferFee.reified().new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      recipient: decodeFromFieldsWithTypes('address', item.fields.recipient),
    })
  }

  static fromBcs(data: Uint8Array): TransferFee {
    return TransferFee.fromFields(TransferFee.bcs.parse(data))
  }

  toJSONField(): TransferFeeJSONField {
    return {
      amount: this.amount.toString(),
      recipient: this.recipient,
    }
  }

  toJSON(): TransferFeeJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TransferFee {
    return TransferFee.reified().new({
      amount: decodeFromJSONField('u64', field.amount),
      recipient: decodeFromJSONField('address', field.recipient),
    })
  }

  static fromJSON(json: Record<string, any>): TransferFee {
    if (json.$typeName !== TransferFee.$typeName) {
      throw new Error(
        `not a TransferFee json object: expected '${TransferFee.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return TransferFee.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TransferFee {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferFee(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TransferFee object`)
    }
    return TransferFee.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TransferFee {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferFee(data.bcs.type)) {
        throw new Error(`object at is not a TransferFee object`)
      }

      return TransferFee.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferFee.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<TransferFee> {
    const res = await fetchObjectBcs(client, id)
    if (!isTransferFee(res.type)) {
      throw new Error(`object at id ${id} is not a TransferFee object`)
    }

    return TransferFee.fromBcs(res.bcsBytes)
  }
}
