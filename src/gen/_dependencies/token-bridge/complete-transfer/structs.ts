import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeStr,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  parseTypeName,
  SupportedSuiClient,
} from '../../../_framework/util'
import { Coin } from '../../../sui/coin/structs'
import { ExternalAddress } from '../../../wormhole/external-address/structs'

/* ============================== TransferRedeemed =============================== */

export function isTransferRedeemed(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'complete_transfer::TransferRedeemed')
    }::complete_transfer::TransferRedeemed`
}

export interface TransferRedeemedFields {
  emitterChain: ToField<'u16'>
  emitterAddress: ToField<ExternalAddress>
  sequence: ToField<'u64'>
}

export type TransferRedeemedReified = Reified<TransferRedeemed, TransferRedeemedFields>

export type TransferRedeemedJSONField = {
  emitterChain: number
  emitterAddress: ToJSON<ExternalAddress>
  sequence: string
}

export type TransferRedeemedJSON = {
  $typeName: typeof TransferRedeemed.$typeName
  $typeArgs: []
} & TransferRedeemedJSONField

export class TransferRedeemed implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::complete_transfer::TransferRedeemed` = `${
    getTypeOrigin('token-bridge', 'complete_transfer::TransferRedeemed')
  }::complete_transfer::TransferRedeemed` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof TransferRedeemed.$typeName = TransferRedeemed.$typeName
  readonly $fullTypeName: `${string}::complete_transfer::TransferRedeemed`
  readonly $typeArgs: []
  readonly $isPhantom: typeof TransferRedeemed.$isPhantom = TransferRedeemed.$isPhantom

  readonly emitterChain: ToField<'u16'>
  readonly emitterAddress: ToField<ExternalAddress>
  readonly sequence: ToField<'u64'>

  private constructor(typeArgs: [], fields: TransferRedeemedFields) {
    this.$fullTypeName = composeSuiType(
      TransferRedeemed.$typeName,
      ...typeArgs,
    ) as `${string}::complete_transfer::TransferRedeemed`
    this.$typeArgs = typeArgs

    this.emitterChain = fields.emitterChain
    this.emitterAddress = fields.emitterAddress
    this.sequence = fields.sequence
  }

  static reified(): TransferRedeemedReified {
    const reifiedBcs = TransferRedeemed.bcs
    return {
      typeName: TransferRedeemed.$typeName,
      fullTypeName: composeSuiType(
        TransferRedeemed.$typeName,
        ...[],
      ) as `${string}::complete_transfer::TransferRedeemed`,
      typeArgs: [] as [],
      isPhantom: TransferRedeemed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferRedeemed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TransferRedeemed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferRedeemed.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferRedeemed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferRedeemed.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TransferRedeemed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TransferRedeemed.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => TransferRedeemed.fetch(client, id),
      new: (fields: TransferRedeemedFields) => {
        return new TransferRedeemed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): TransferRedeemedReified {
    return TransferRedeemed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferRedeemed>> {
    return phantom(TransferRedeemed.reified())
  }

  static get p(): PhantomReified<ToTypeStr<TransferRedeemed>> {
    return TransferRedeemed.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TransferRedeemed', {
      emitter_chain: bcs.u16(),
      emitter_address: ExternalAddress.bcs,
      sequence: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof TransferRedeemed.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof TransferRedeemed.instantiateBcs> {
    if (!TransferRedeemed.cachedBcs) {
      TransferRedeemed.cachedBcs = TransferRedeemed.instantiateBcs()
    }
    return TransferRedeemed.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TransferRedeemed {
    return TransferRedeemed.reified().new({
      emitterChain: decodeFromFields('u16', fields.emitter_chain),
      emitterAddress: decodeFromFields(ExternalAddress.reified(), fields.emitter_address),
      sequence: decodeFromFields('u64', fields.sequence),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TransferRedeemed {
    if (!isTransferRedeemed(item.type)) {
      throw new Error('not a TransferRedeemed type')
    }

    return TransferRedeemed.reified().new({
      emitterChain: decodeFromFieldsWithTypes('u16', item.fields.emitter_chain),
      emitterAddress: decodeFromFieldsWithTypes(
        ExternalAddress.reified(),
        item.fields.emitter_address,
      ),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
    })
  }

  static fromBcs(data: Uint8Array): TransferRedeemed {
    return TransferRedeemed.fromFields(TransferRedeemed.bcs.parse(data))
  }

  toJSONField(): TransferRedeemedJSONField {
    return {
      emitterChain: this.emitterChain,
      emitterAddress: this.emitterAddress.toJSONField(),
      sequence: this.sequence.toString(),
    }
  }

  toJSON(): TransferRedeemedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TransferRedeemed {
    return TransferRedeemed.reified().new({
      emitterChain: decodeFromJSONField('u16', field.emitterChain),
      emitterAddress: decodeFromJSONField(ExternalAddress.reified(), field.emitterAddress),
      sequence: decodeFromJSONField('u64', field.sequence),
    })
  }

  static fromJSON(json: Record<string, any>): TransferRedeemed {
    if (json.$typeName !== TransferRedeemed.$typeName) {
      throw new Error(
        `not a TransferRedeemed json object: expected '${TransferRedeemed.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return TransferRedeemed.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TransferRedeemed {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferRedeemed(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TransferRedeemed object`)
    }
    return TransferRedeemed.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TransferRedeemed {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferRedeemed(data.bcs.type)) {
        throw new Error(`object at is not a TransferRedeemed object`)
      }

      return TransferRedeemed.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferRedeemed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<TransferRedeemed> {
    const res = await fetchObjectBcs(client, id)
    if (!isTransferRedeemed(res.type)) {
      throw new Error(`object at id ${id} is not a TransferRedeemed object`)
    }

    return TransferRedeemed.fromBcs(res.bcsBytes)
  }
}

/* ============================== RelayerReceipt =============================== */

export function isRelayerReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('token-bridge', 'complete_transfer::RelayerReceipt')
    }::complete_transfer::RelayerReceipt` + '<',
  )
}

export interface RelayerReceiptFields<T0 extends PhantomTypeArgument> {
  payout: ToField<Coin<T0>>
}

export type RelayerReceiptReified<T0 extends PhantomTypeArgument> = Reified<
  RelayerReceipt<T0>,
  RelayerReceiptFields<T0>
>

export type RelayerReceiptJSONField<T0 extends PhantomTypeArgument> = {
  payout: ToJSON<Coin<T0>>
}

export type RelayerReceiptJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof RelayerReceipt.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & RelayerReceiptJSONField<T0>

export class RelayerReceipt<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::complete_transfer::RelayerReceipt` = `${
    getTypeOrigin('token-bridge', 'complete_transfer::RelayerReceipt')
  }::complete_transfer::RelayerReceipt` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof RelayerReceipt.$typeName = RelayerReceipt.$typeName
  readonly $fullTypeName: `${string}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof RelayerReceipt.$isPhantom = RelayerReceipt.$isPhantom

  readonly payout: ToField<Coin<T0>>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RelayerReceiptFields<T0>) {
    this.$fullTypeName = composeSuiType(
      RelayerReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.payout = fields.payout
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): RelayerReceiptReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = RelayerReceipt.bcs
    return {
      typeName: RelayerReceipt.$typeName,
      fullTypeName: composeSuiType(
        RelayerReceipt.$typeName,
        ...[extractType(T0)],
      ) as `${string}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<
        ToPhantomTypeArgument<T0>
      >}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: RelayerReceipt.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => RelayerReceipt.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RelayerReceipt.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => RelayerReceipt.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RelayerReceipt.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => RelayerReceipt.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => RelayerReceipt.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => RelayerReceipt.fromSuiObjectData(T0, content),
      fetch: async (client: SupportedSuiClient, id: string) => RelayerReceipt.fetch(client, T0, id),
      new: (fields: RelayerReceiptFields<ToPhantomTypeArgument<T0>>) => {
        return new RelayerReceipt([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof RelayerReceipt.reified {
    return RelayerReceipt.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<RelayerReceipt<ToPhantomTypeArgument<T0>>>> {
    return phantom(RelayerReceipt.reified(T0))
  }

  static get p(): typeof RelayerReceipt.phantom {
    return RelayerReceipt.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('RelayerReceipt', {
      payout: Coin.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RelayerReceipt.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RelayerReceipt.instantiateBcs> {
    if (!RelayerReceipt.cachedBcs) {
      RelayerReceipt.cachedBcs = RelayerReceipt.instantiateBcs()
    }
    return RelayerReceipt.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    return RelayerReceipt.reified(typeArg).new({
      payout: decodeFromFields(Coin.reified(typeArg), fields.payout),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes,
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    if (!isRelayerReceipt(item.type)) {
      throw new Error('not a RelayerReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return RelayerReceipt.reified(typeArg).new({
      payout: decodeFromFieldsWithTypes(Coin.reified(typeArg), item.fields.payout),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array,
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    return RelayerReceipt.fromFields(typeArg, RelayerReceipt.bcs.parse(data))
  }

  toJSONField(): RelayerReceiptJSONField<T0> {
    return {
      payout: this.payout.toJSONField(),
    }
  }

  toJSON(): RelayerReceiptJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    return RelayerReceipt.reified(typeArg).new({
      payout: decodeFromJSONField(Coin.reified(typeArg), field.payout),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>,
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== RelayerReceipt.$typeName) {
      throw new Error(
        `not a RelayerReceipt json object: expected '${RelayerReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RelayerReceipt.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return RelayerReceipt.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRelayerReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RelayerReceipt object`)
    }
    return RelayerReceipt.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData,
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRelayerReceipt(data.bcs.type)) {
        throw new Error(`object at is not a RelayerReceipt object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return RelayerReceipt.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RelayerReceipt.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<RelayerReceipt<ToPhantomTypeArgument<T0>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isRelayerReceipt(res.type)) {
      throw new Error(`object at id ${id} is not a RelayerReceipt object`)
    }

    const gotTypeArgs = parseTypeName(res.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return RelayerReceipt.fromBcs(typeArg, res.bcsBytes)
  }
}
