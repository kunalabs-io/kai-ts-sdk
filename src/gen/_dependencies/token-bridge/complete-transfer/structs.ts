/**
 * This module implements two methods: `authorize_transfer` and
 * `redeem_relayer_payout`, which are to be executed in a transaction block in
 * this order.
 *
 * `authorize_transfer` allows a contract to complete a Token Bridge transfer,
 * sending assets to the encoded recipient. The coin payout incentive in
 * redeeming the transfer is packaged in a `RelayerReceipt`.
 *
 * `redeem_relayer_payout` unpacks the `RelayerReceipt` to release the coin
 * containing the relayer fee amount.
 *
 * The purpose of splitting this transfer redemption into two steps is in case
 * Token Bridge needs to be upgraded and there is a breaking change for this
 * module, an integrator would not be left broken. It is discouraged to put
 * `authorize_transfer` in an integrator's package logic. Otherwise, this
 * integrator needs to be prepared to upgrade his contract to handle the latest
 * version of `complete_transfer`.
 *
 * Instead, an integrator is encouraged to execute a transaction block, which
 * executes `authorize_transfer` using the latest Token Bridge package ID and
 * to implement `redeem_relayer_payout` in his contract to consume this receipt.
 * This is similar to how an integrator with Wormhole is not meant to use
 * `vaa::parse_and_verify` in his contract in case the `vaa` module needs to
 * be upgraded due to a breaking change.
 *
 * See `transfer` module for serialization and deserialization of Wormhole
 * message payload.
 */

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

/**
 * Event reflecting when a transfer via `complete_transfer` or
 * `complete_transfer_with_payload` is successfully executed.
 */
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

export interface RelayerReceiptFields<CoinType extends PhantomTypeArgument> {
  /** Coin of relayer fee payout. */
  payout: ToField<Coin<CoinType>>
}

export type RelayerReceiptReified<CoinType extends PhantomTypeArgument> = Reified<
  RelayerReceipt<CoinType>,
  RelayerReceiptFields<CoinType>
>

export type RelayerReceiptJSONField<CoinType extends PhantomTypeArgument> = {
  payout: ToJSON<Coin<CoinType>>
}

export type RelayerReceiptJSON<CoinType extends PhantomTypeArgument> = {
  $typeName: typeof RelayerReceipt.$typeName
  $typeArgs: [PhantomToTypeStr<CoinType>]
} & RelayerReceiptJSONField<CoinType>

/**
 * This type is only generated from `authorize_transfer` and can only be
 * redeemed using `redeem_relayer_payout`. Integrators running relayer
 * contracts are expected to implement `redeem_relayer_payout` within their
 * contracts and call `authorize_transfer` in a transaction block preceding
 * the method that consumes this receipt.
 */
export class RelayerReceipt<CoinType extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::complete_transfer::RelayerReceipt` = `${
    getTypeOrigin('token-bridge', 'complete_transfer::RelayerReceipt')
  }::complete_transfer::RelayerReceipt` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof RelayerReceipt.$typeName = RelayerReceipt.$typeName
  readonly $fullTypeName: `${string}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<
    CoinType
  >}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinType>]
  readonly $isPhantom: typeof RelayerReceipt.$isPhantom = RelayerReceipt.$isPhantom

  /** Coin of relayer fee payout. */
  readonly payout: ToField<Coin<CoinType>>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinType>],
    fields: RelayerReceiptFields<CoinType>,
  ) {
    this.$fullTypeName = composeSuiType(
      RelayerReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<CoinType>}>`
    this.$typeArgs = typeArgs

    this.payout = fields.payout
  }

  static reified<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): RelayerReceiptReified<ToPhantomTypeArgument<CoinType>> {
    const reifiedBcs = RelayerReceipt.bcs
    return {
      typeName: RelayerReceipt.$typeName,
      fullTypeName: composeSuiType(
        RelayerReceipt.$typeName,
        ...[extractType(CoinType)],
      ) as `${string}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<
        ToPhantomTypeArgument<CoinType>
      >}>`,
      typeArgs: [extractType(CoinType)] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>],
      isPhantom: RelayerReceipt.$isPhantom,
      reifiedTypeArgs: [CoinType],
      fromFields: (fields: Record<string, any>) => RelayerReceipt.fromFields(CoinType, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RelayerReceipt.fromFieldsWithTypes(CoinType, item),
      fromBcs: (data: Uint8Array) => RelayerReceipt.fromFields(CoinType, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RelayerReceipt.fromJSONField(CoinType, field),
      fromJSON: (json: Record<string, any>) => RelayerReceipt.fromJSON(CoinType, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RelayerReceipt.fromSuiParsedData(CoinType, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RelayerReceipt.fromSuiObjectData(CoinType, content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        RelayerReceipt.fetch(client, CoinType, id),
      new: (fields: RelayerReceiptFields<ToPhantomTypeArgument<CoinType>>) => {
        return new RelayerReceipt([extractType(CoinType)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof RelayerReceipt.reified {
    return RelayerReceipt.reified
  }

  static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): PhantomReified<ToTypeStr<RelayerReceipt<ToPhantomTypeArgument<CoinType>>>> {
    return phantom(RelayerReceipt.reified(CoinType))
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

  static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    fields: Record<string, any>,
  ): RelayerReceipt<ToPhantomTypeArgument<CoinType>> {
    return RelayerReceipt.reified(typeArg).new({
      payout: decodeFromFields(Coin.reified(typeArg), fields.payout),
    })
  }

  static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    item: FieldsWithTypes,
  ): RelayerReceipt<ToPhantomTypeArgument<CoinType>> {
    if (!isRelayerReceipt(item.type)) {
      throw new Error('not a RelayerReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return RelayerReceipt.reified(typeArg).new({
      payout: decodeFromFieldsWithTypes(Coin.reified(typeArg), item.fields.payout),
    })
  }

  static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: Uint8Array,
  ): RelayerReceipt<ToPhantomTypeArgument<CoinType>> {
    return RelayerReceipt.fromFields(typeArg, RelayerReceipt.bcs.parse(data))
  }

  toJSONField(): RelayerReceiptJSONField<CoinType> {
    return {
      payout: this.payout.toJSONField(),
    }
  }

  toJSON(): RelayerReceiptJSON<CoinType> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    field: any,
  ): RelayerReceipt<ToPhantomTypeArgument<CoinType>> {
    return RelayerReceipt.reified(typeArg).new({
      payout: decodeFromJSONField(Coin.reified(typeArg), field.payout),
    })
  }

  static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    json: Record<string, any>,
  ): RelayerReceipt<ToPhantomTypeArgument<CoinType>> {
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

  static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    content: SuiParsedData,
  ): RelayerReceipt<ToPhantomTypeArgument<CoinType>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRelayerReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RelayerReceipt object`)
    }
    return RelayerReceipt.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: SuiObjectData,
  ): RelayerReceipt<ToPhantomTypeArgument<CoinType>> {
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

  static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: CoinType,
    id: string,
  ): Promise<RelayerReceipt<ToPhantomTypeArgument<CoinType>>> {
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
