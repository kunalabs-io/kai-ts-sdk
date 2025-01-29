import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { Balance } from '../../../../sui/balance/structs'
import { PKG_V1 } from '../index'
import { NormalizedAmount } from '../normalized-amount/structs'
import { VerifiedAsset } from '../token-registry/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== TransferTicket =============================== */

export function isTransferTicket(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::transfer_tokens::TransferTicket` + '<')
}

export interface TransferTicketFields<T0 extends PhantomTypeArgument> {
  assetInfo: ToField<VerifiedAsset<T0>>
  bridgedIn: ToField<Balance<T0>>
  normAmount: ToField<NormalizedAmount>
  recipientChain: ToField<'u16'>
  recipient: ToField<Vector<'u8'>>
  relayerFee: ToField<'u64'>
  nonce: ToField<'u32'>
}

export type TransferTicketReified<T0 extends PhantomTypeArgument> = Reified<
  TransferTicket<T0>,
  TransferTicketFields<T0>
>

export class TransferTicket<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::transfer_tokens::TransferTicket`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = TransferTicket.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::transfer_tokens::TransferTicket<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = TransferTicket.$isPhantom

  readonly assetInfo: ToField<VerifiedAsset<T0>>
  readonly bridgedIn: ToField<Balance<T0>>
  readonly normAmount: ToField<NormalizedAmount>
  readonly recipientChain: ToField<'u16'>
  readonly recipient: ToField<Vector<'u8'>>
  readonly relayerFee: ToField<'u64'>
  readonly nonce: ToField<'u32'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: TransferTicketFields<T0>) {
    this.$fullTypeName = composeSuiType(
      TransferTicket.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::transfer_tokens::TransferTicket<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.assetInfo = fields.assetInfo
    this.bridgedIn = fields.bridgedIn
    this.normAmount = fields.normAmount
    this.recipientChain = fields.recipientChain
    this.recipient = fields.recipient
    this.relayerFee = fields.relayerFee
    this.nonce = fields.nonce
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): TransferTicketReified<ToPhantomTypeArgument<T0>> {
    return {
      typeName: TransferTicket.$typeName,
      fullTypeName: composeSuiType(
        TransferTicket.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::transfer_tokens::TransferTicket<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: TransferTicket.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => TransferTicket.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TransferTicket.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => TransferTicket.fromBcs(T0, data),
      bcs: TransferTicket.bcs,
      fromJSONField: (field: any) => TransferTicket.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => TransferTicket.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => TransferTicket.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => TransferTicket.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => TransferTicket.fetch(client, T0, id),
      new: (fields: TransferTicketFields<ToPhantomTypeArgument<T0>>) => {
        return new TransferTicket([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TransferTicket.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<TransferTicket<ToPhantomTypeArgument<T0>>>> {
    return phantom(TransferTicket.reified(T0))
  }
  static get p() {
    return TransferTicket.phantom
  }

  static get bcs() {
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

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): TransferTicket<ToPhantomTypeArgument<T0>> {
    return TransferTicket.reified(typeArg).new({
      assetInfo: decodeFromFields(VerifiedAsset.reified(typeArg), fields.asset_info),
      bridgedIn: decodeFromFields(Balance.reified(typeArg), fields.bridged_in),
      normAmount: decodeFromFields(NormalizedAmount.reified(), fields.norm_amount),
      recipientChain: decodeFromFields('u16', fields.recipient_chain),
      recipient: decodeFromFields(reified.vector('u8'), fields.recipient),
      relayerFee: decodeFromFields('u64', fields.relayer_fee),
      nonce: decodeFromFields('u32', fields.nonce),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): TransferTicket<ToPhantomTypeArgument<T0>> {
    if (!isTransferTicket(item.type)) {
      throw new Error('not a TransferTicket type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return TransferTicket.reified(typeArg).new({
      assetInfo: decodeFromFieldsWithTypes(VerifiedAsset.reified(typeArg), item.fields.asset_info),
      bridgedIn: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.bridged_in),
      normAmount: decodeFromFieldsWithTypes(NormalizedAmount.reified(), item.fields.norm_amount),
      recipientChain: decodeFromFieldsWithTypes('u16', item.fields.recipient_chain),
      recipient: decodeFromFieldsWithTypes(reified.vector('u8'), item.fields.recipient),
      relayerFee: decodeFromFieldsWithTypes('u64', item.fields.relayer_fee),
      nonce: decodeFromFieldsWithTypes('u32', item.fields.nonce),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): TransferTicket<ToPhantomTypeArgument<T0>> {
    return TransferTicket.fromFields(typeArg, TransferTicket.bcs.parse(data))
  }

  toJSONField() {
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

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): TransferTicket<ToPhantomTypeArgument<T0>> {
    return TransferTicket.reified(typeArg).new({
      assetInfo: decodeFromJSONField(VerifiedAsset.reified(typeArg), field.assetInfo),
      bridgedIn: decodeFromJSONField(Balance.reified(typeArg), field.bridgedIn),
      normAmount: decodeFromJSONField(NormalizedAmount.reified(), field.normAmount),
      recipientChain: decodeFromJSONField('u16', field.recipientChain),
      recipient: decodeFromJSONField(reified.vector('u8'), field.recipient),
      relayerFee: decodeFromJSONField('u64', field.relayerFee),
      nonce: decodeFromJSONField('u32', field.nonce),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): TransferTicket<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== TransferTicket.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(TransferTicket.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return TransferTicket.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): TransferTicket<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TransferTicket object`)
    }
    return TransferTicket.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): TransferTicket<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferTicket(data.bcs.type)) {
        throw new Error(`object at is not a TransferTicket object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return TransferTicket.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferTicket.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<TransferTicket<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TransferTicket object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTransferTicket(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TransferTicket object`)
    }

    return TransferTicket.fromSuiObjectData(typeArg, res.data)
  }
}
