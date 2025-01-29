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
  phantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Coin } from '../../../../sui/coin/structs'
import { ExternalAddress } from '../../0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a/external-address/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== RelayerReceipt =============================== */

export function isRelayerReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::complete_transfer::RelayerReceipt` + '<')
}

export interface RelayerReceiptFields<T0 extends PhantomTypeArgument> {
  payout: ToField<Coin<T0>>
}

export type RelayerReceiptReified<T0 extends PhantomTypeArgument> = Reified<
  RelayerReceipt<T0>,
  RelayerReceiptFields<T0>
>

export class RelayerReceipt<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::complete_transfer::RelayerReceipt`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = RelayerReceipt.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = RelayerReceipt.$isPhantom

  readonly payout: ToField<Coin<T0>>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RelayerReceiptFields<T0>) {
    this.$fullTypeName = composeSuiType(
      RelayerReceipt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.payout = fields.payout
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): RelayerReceiptReified<ToPhantomTypeArgument<T0>> {
    return {
      typeName: RelayerReceipt.$typeName,
      fullTypeName: composeSuiType(
        RelayerReceipt.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::complete_transfer::RelayerReceipt<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: RelayerReceipt.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => RelayerReceipt.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RelayerReceipt.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => RelayerReceipt.fromBcs(T0, data),
      bcs: RelayerReceipt.bcs,
      fromJSONField: (field: any) => RelayerReceipt.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => RelayerReceipt.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => RelayerReceipt.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => RelayerReceipt.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => RelayerReceipt.fetch(client, T0, id),
      new: (fields: RelayerReceiptFields<ToPhantomTypeArgument<T0>>) => {
        return new RelayerReceipt([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RelayerReceipt.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<RelayerReceipt<ToPhantomTypeArgument<T0>>>> {
    return phantom(RelayerReceipt.reified(T0))
  }
  static get p() {
    return RelayerReceipt.phantom
  }

  static get bcs() {
    return bcs.struct('RelayerReceipt', {
      payout: Coin.bcs,
    })
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    return RelayerReceipt.reified(typeArg).new({
      payout: decodeFromFields(Coin.reified(typeArg), fields.payout),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
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
    data: Uint8Array
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    return RelayerReceipt.fromFields(typeArg, RelayerReceipt.bcs.parse(data))
  }

  toJSONField() {
    return {
      payout: this.payout.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    return RelayerReceipt.reified(typeArg).new({
      payout: decodeFromJSONField(Coin.reified(typeArg), field.payout),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== RelayerReceipt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RelayerReceipt.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return RelayerReceipt.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
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
    data: SuiObjectData
  ): RelayerReceipt<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRelayerReceipt(data.bcs.type)) {
        throw new Error(`object at is not a RelayerReceipt object`)
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

      return RelayerReceipt.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RelayerReceipt.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<RelayerReceipt<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RelayerReceipt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRelayerReceipt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RelayerReceipt object`)
    }

    return RelayerReceipt.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== TransferRedeemed =============================== */

export function isTransferRedeemed(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::complete_transfer::TransferRedeemed`
}

export interface TransferRedeemedFields {
  emitterChain: ToField<'u16'>
  emitterAddress: ToField<ExternalAddress>
  sequence: ToField<'u64'>
}

export type TransferRedeemedReified = Reified<TransferRedeemed, TransferRedeemedFields>

export class TransferRedeemed implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::complete_transfer::TransferRedeemed`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TransferRedeemed.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::complete_transfer::TransferRedeemed`
  readonly $typeArgs: []
  readonly $isPhantom = TransferRedeemed.$isPhantom

  readonly emitterChain: ToField<'u16'>
  readonly emitterAddress: ToField<ExternalAddress>
  readonly sequence: ToField<'u64'>

  private constructor(typeArgs: [], fields: TransferRedeemedFields) {
    this.$fullTypeName = composeSuiType(
      TransferRedeemed.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::complete_transfer::TransferRedeemed`
    this.$typeArgs = typeArgs

    this.emitterChain = fields.emitterChain
    this.emitterAddress = fields.emitterAddress
    this.sequence = fields.sequence
  }

  static reified(): TransferRedeemedReified {
    return {
      typeName: TransferRedeemed.$typeName,
      fullTypeName: composeSuiType(
        TransferRedeemed.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::complete_transfer::TransferRedeemed`,
      typeArgs: [] as [],
      isPhantom: TransferRedeemed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferRedeemed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TransferRedeemed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferRedeemed.fromBcs(data),
      bcs: TransferRedeemed.bcs,
      fromJSONField: (field: any) => TransferRedeemed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferRedeemed.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TransferRedeemed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TransferRedeemed.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TransferRedeemed.fetch(client, id),
      new: (fields: TransferRedeemedFields) => {
        return new TransferRedeemed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TransferRedeemed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferRedeemed>> {
    return phantom(TransferRedeemed.reified())
  }
  static get p() {
    return TransferRedeemed.phantom()
  }

  static get bcs() {
    return bcs.struct('TransferRedeemed', {
      emitter_chain: bcs.u16(),
      emitter_address: ExternalAddress.bcs,
      sequence: bcs.u64(),
    })
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
        item.fields.emitter_address
      ),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
    })
  }

  static fromBcs(data: Uint8Array): TransferRedeemed {
    return TransferRedeemed.fromFields(TransferRedeemed.bcs.parse(data))
  }

  toJSONField() {
    return {
      emitterChain: this.emitterChain,
      emitterAddress: this.emitterAddress.toJSONField(),
      sequence: this.sequence.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return TransferRedeemed.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferRedeemed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TransferRedeemed> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TransferRedeemed object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTransferRedeemed(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TransferRedeemed object`)
    }

    return TransferRedeemed.fromSuiObjectData(res.data)
  }
}
