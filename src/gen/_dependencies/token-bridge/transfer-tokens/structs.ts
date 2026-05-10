/**
 * This module implements three methods: `prepare_transfer` and
 * `transfer_tokens`, which are meant to work together.
 *
 * `prepare_transfer` allows a contract to pack token transfer parameters in
 * preparation to bridge these assets to another network. Anyone can call this
 * method to create `TransferTicket`.
 *
 * `transfer_tokens` unpacks the `TransferTicket` and constructs a
 * `MessageTicket`, which will be used by Wormhole's `publish_message`
 * module.
 *
 * The purpose of splitting this token transferring into two steps is in case
 * Token Bridge needs to be upgraded and there is a breaking change for this
 * module, an integrator would not be left broken. It is discouraged to put
 * `transfer_tokens` in an integrator's package logic. Otherwise, this
 * integrator needs to be prepared to upgrade his contract to handle the latest
 * version of `transfer_tokens`.
 *
 * Instead, an integrator is encouraged to execute a transaction block, which
 * executes `transfer_tokens` using the latest Token Bridge package ID and to
 * implement `prepare_transfer` in his contract to produce `PrepareTransfer`.
 *
 * NOTE: Only assets that exist in the `TokenRegistry` can be bridged out,
 * which are native Sui assets that have been attested for via `attest_token`
 * and wrapped foreign assets that have been created using foreign asset
 * metadata via the `create_wrapped` module.
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
  fieldToJSON,
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
  vector,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  parseTypeName,
  SupportedSuiClient,
} from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { Balance } from '../../../sui/balance/structs'
import { NormalizedAmount } from '../normalized-amount/structs'
import { VerifiedAsset } from '../token-registry/structs'

/* ============================== TransferTicket =============================== */

export function isTransferTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('token-bridge', 'transfer_tokens::TransferTicket')
    }::transfer_tokens::TransferTicket` + '<',
  )
}

export interface TransferTicketFields<CoinType extends PhantomTypeArgument> {
  assetInfo: ToField<VerifiedAsset<CoinType>>
  bridgedIn: ToField<Balance<CoinType>>
  normAmount: ToField<NormalizedAmount>
  recipientChain: ToField<'u16'>
  recipient: ToField<Vector<'u8'>>
  relayerFee: ToField<'u64'>
  nonce: ToField<'u32'>
}

export type TransferTicketReified<CoinType extends PhantomTypeArgument> = Reified<
  TransferTicket<CoinType>,
  TransferTicketFields<CoinType>
>

export type TransferTicketJSONField<CoinType extends PhantomTypeArgument> = {
  assetInfo: ToJSON<VerifiedAsset<CoinType>>
  bridgedIn: ToJSON<Balance<CoinType>>
  normAmount: ToJSON<NormalizedAmount>
  recipientChain: number
  recipient: number[]
  relayerFee: string
  nonce: number
}

export type TransferTicketJSON<CoinType extends PhantomTypeArgument> = {
  $typeName: typeof TransferTicket.$typeName
  $typeArgs: [PhantomToTypeStr<CoinType>]
} & TransferTicketJSONField<CoinType>

/**
 * This type represents transfer data for a recipient on a foreign chain.
 * The only way to destroy this type is calling `transfer_tokens`.
 *
 * NOTE: An integrator that expects to bridge assets between his contracts
 * should probably use the `transfer_tokens_with_payload` module, which
 * expects a specific redeemer to complete the transfer (transfers sent
 * using `transfer_tokens` can be redeemed by anyone on behalf of the
 * encoded recipient).
 */
export class TransferTicket<CoinType extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::transfer_tokens::TransferTicket` = `${
    getTypeOrigin('token-bridge', 'transfer_tokens::TransferTicket')
  }::transfer_tokens::TransferTicket` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof TransferTicket.$typeName = TransferTicket.$typeName
  readonly $fullTypeName: `${string}::transfer_tokens::TransferTicket<${PhantomToTypeStr<
    CoinType
  >}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinType>]
  readonly $isPhantom: typeof TransferTicket.$isPhantom = TransferTicket.$isPhantom

  readonly assetInfo: ToField<VerifiedAsset<CoinType>>
  readonly bridgedIn: ToField<Balance<CoinType>>
  readonly normAmount: ToField<NormalizedAmount>
  readonly recipientChain: ToField<'u16'>
  readonly recipient: ToField<Vector<'u8'>>
  readonly relayerFee: ToField<'u64'>
  readonly nonce: ToField<'u32'>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinType>],
    fields: TransferTicketFields<CoinType>,
  ) {
    this.$fullTypeName = composeSuiType(
      TransferTicket.$typeName,
      ...typeArgs,
    ) as `${string}::transfer_tokens::TransferTicket<${PhantomToTypeStr<CoinType>}>`
    this.$typeArgs = typeArgs

    this.assetInfo = fields.assetInfo
    this.bridgedIn = fields.bridgedIn
    this.normAmount = fields.normAmount
    this.recipientChain = fields.recipientChain
    this.recipient = fields.recipient
    this.relayerFee = fields.relayerFee
    this.nonce = fields.nonce
  }

  static reified<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): TransferTicketReified<ToPhantomTypeArgument<CoinType>> {
    const reifiedBcs = TransferTicket.bcs
    return {
      typeName: TransferTicket.$typeName,
      fullTypeName: composeSuiType(
        TransferTicket.$typeName,
        ...[extractType(CoinType)],
      ) as `${string}::transfer_tokens::TransferTicket<${PhantomToTypeStr<
        ToPhantomTypeArgument<CoinType>
      >}>`,
      typeArgs: [extractType(CoinType)] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>],
      isPhantom: TransferTicket.$isPhantom,
      reifiedTypeArgs: [CoinType],
      fromFields: (fields: Record<string, any>) => TransferTicket.fromFields(CoinType, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        TransferTicket.fromFieldsWithTypes(CoinType, item),
      fromBcs: (data: Uint8Array) => TransferTicket.fromFields(CoinType, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferTicket.fromJSONField(CoinType, field),
      fromJSON: (json: Record<string, any>) => TransferTicket.fromJSON(CoinType, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        TransferTicket.fromSuiParsedData(CoinType, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        TransferTicket.fromSuiObjectData(CoinType, content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        TransferTicket.fetch(client, CoinType, id),
      new: (fields: TransferTicketFields<ToPhantomTypeArgument<CoinType>>) => {
        return new TransferTicket([extractType(CoinType)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof TransferTicket.reified {
    return TransferTicket.reified
  }

  static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): PhantomReified<ToTypeStr<TransferTicket<ToPhantomTypeArgument<CoinType>>>> {
    return phantom(TransferTicket.reified(CoinType))
  }

  static get p(): typeof TransferTicket.phantom {
    return TransferTicket.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('TransferTicket', {
      asset_info: VerifiedAsset.bcs,
      bridged_in: Balance.bcs,
      norm_amount: NormalizedAmount.bcs,
      recipient_chain: bcs.u16(),
      recipient: bcs.vector(bcs.u8()),
      relayer_fee: bcs.u64(),
      nonce: bcs.u32(),
    })
  }

  private static cachedBcs: ReturnType<typeof TransferTicket.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof TransferTicket.instantiateBcs> {
    if (!TransferTicket.cachedBcs) {
      TransferTicket.cachedBcs = TransferTicket.instantiateBcs()
    }
    return TransferTicket.cachedBcs
  }

  static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    fields: Record<string, any>,
  ): TransferTicket<ToPhantomTypeArgument<CoinType>> {
    return TransferTicket.reified(typeArg).new({
      assetInfo: decodeFromFields(VerifiedAsset.reified(typeArg), fields.asset_info),
      bridgedIn: decodeFromFields(Balance.reified(typeArg), fields.bridged_in),
      normAmount: decodeFromFields(NormalizedAmount.reified(), fields.norm_amount),
      recipientChain: decodeFromFields('u16', fields.recipient_chain),
      recipient: decodeFromFields(vector('u8'), fields.recipient),
      relayerFee: decodeFromFields('u64', fields.relayer_fee),
      nonce: decodeFromFields('u32', fields.nonce),
    })
  }

  static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    item: FieldsWithTypes,
  ): TransferTicket<ToPhantomTypeArgument<CoinType>> {
    if (!isTransferTicket(item.type)) {
      throw new Error('not a TransferTicket type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return TransferTicket.reified(typeArg).new({
      assetInfo: decodeFromFieldsWithTypes(VerifiedAsset.reified(typeArg), item.fields.asset_info),
      bridgedIn: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.bridged_in),
      normAmount: decodeFromFieldsWithTypes(NormalizedAmount.reified(), item.fields.norm_amount),
      recipientChain: decodeFromFieldsWithTypes('u16', item.fields.recipient_chain),
      recipient: decodeFromFieldsWithTypes(vector('u8'), item.fields.recipient),
      relayerFee: decodeFromFieldsWithTypes('u64', item.fields.relayer_fee),
      nonce: decodeFromFieldsWithTypes('u32', item.fields.nonce),
    })
  }

  static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: Uint8Array,
  ): TransferTicket<ToPhantomTypeArgument<CoinType>> {
    return TransferTicket.fromFields(typeArg, TransferTicket.bcs.parse(data))
  }

  toJSONField(): TransferTicketJSONField<CoinType> {
    return {
      assetInfo: this.assetInfo.toJSONField(),
      bridgedIn: this.bridgedIn.toJSONField(),
      normAmount: this.normAmount.toJSONField(),
      recipientChain: this.recipientChain,
      recipient: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.recipient),
      relayerFee: this.relayerFee.toString(),
      nonce: this.nonce,
    }
  }

  toJSON(): TransferTicketJSON<CoinType> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    field: any,
  ): TransferTicket<ToPhantomTypeArgument<CoinType>> {
    return TransferTicket.reified(typeArg).new({
      assetInfo: decodeFromJSONField(VerifiedAsset.reified(typeArg), field.assetInfo),
      bridgedIn: decodeFromJSONField(Balance.reified(typeArg), field.bridgedIn),
      normAmount: decodeFromJSONField(NormalizedAmount.reified(), field.normAmount),
      recipientChain: decodeFromJSONField('u16', field.recipientChain),
      recipient: decodeFromJSONField(vector('u8'), field.recipient),
      relayerFee: decodeFromJSONField('u64', field.relayerFee),
      nonce: decodeFromJSONField('u32', field.nonce),
    })
  }

  static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    json: Record<string, any>,
  ): TransferTicket<ToPhantomTypeArgument<CoinType>> {
    if (json.$typeName !== TransferTicket.$typeName) {
      throw new Error(
        `not a TransferTicket json object: expected '${TransferTicket.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(TransferTicket.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return TransferTicket.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    content: SuiParsedData,
  ): TransferTicket<ToPhantomTypeArgument<CoinType>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TransferTicket object`)
    }
    return TransferTicket.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: SuiObjectData,
  ): TransferTicket<ToPhantomTypeArgument<CoinType>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferTicket(data.bcs.type)) {
        throw new Error(`object at is not a TransferTicket object`)
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

      return TransferTicket.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferTicket.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: CoinType,
    id: string,
  ): Promise<TransferTicket<ToPhantomTypeArgument<CoinType>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isTransferTicket(res.type)) {
      throw new Error(`object at id ${id} is not a TransferTicket object`)
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

    return TransferTicket.fromBcs(typeArg, res.bcsBytes)
  }
}
