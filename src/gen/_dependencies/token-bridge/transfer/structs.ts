/**
 * This module implements serialization and deserialization for token transfer
 * with an optional relayer fee. This message is a specific Wormhole message
 * payload for Token Bridge.
 *
 * When this transfer is redeemed, the relayer fee will be subtracted from the
 * transfer amount. If the transaction sender is the same address of the
 * recipient, the recipient will collect the full amount.
 *
 * See `transfer_tokens` and `complete_transfer` modules for more details.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { ExternalAddress } from '../../../wormhole/external-address/structs'
import { NormalizedAmount } from '../normalized-amount/structs'

/* ============================== Transfer =============================== */

export function isTransfer(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('token-bridge', 'transfer::Transfer')}::transfer::Transfer`
}

export interface TransferFields {
  amount: ToField<NormalizedAmount>
  tokenAddress: ToField<ExternalAddress>
  tokenChain: ToField<'u16'>
  recipient: ToField<ExternalAddress>
  recipientChain: ToField<'u16'>
  relayerFee: ToField<NormalizedAmount>
}

export type TransferReified = Reified<Transfer, TransferFields>

export type TransferJSONField = {
  amount: ToJSON<NormalizedAmount>
  tokenAddress: ToJSON<ExternalAddress>
  tokenChain: number
  recipient: ToJSON<ExternalAddress>
  recipientChain: number
  relayerFee: ToJSON<NormalizedAmount>
}

export type TransferJSON = {
  $typeName: typeof Transfer.$typeName
  $typeArgs: []
} & TransferJSONField

/**
 * Container that warehouses transfer information. This struct is used only
 * by `transfer_tokens` and `complete_transfer` modules.
 */
export class Transfer implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::transfer::Transfer` {
    return `${getTypeOrigin('token-bridge', 'transfer::Transfer')}::transfer::Transfer` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Transfer.$typeName = Transfer.$typeName
  readonly $fullTypeName: `${string}::transfer::Transfer`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Transfer.$isPhantom = Transfer.$isPhantom

  readonly amount: ToField<NormalizedAmount>
  readonly tokenAddress: ToField<ExternalAddress>
  readonly tokenChain: ToField<'u16'>
  readonly recipient: ToField<ExternalAddress>
  readonly recipientChain: ToField<'u16'>
  readonly relayerFee: ToField<NormalizedAmount>

  private constructor(typeArgs: [], fields: TransferFields) {
    this.$fullTypeName = composeSuiType(
      Transfer.$typeName,
      ...typeArgs,
    ) as `${string}::transfer::Transfer`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
    this.tokenAddress = fields.tokenAddress
    this.tokenChain = fields.tokenChain
    this.recipient = fields.recipient
    this.recipientChain = fields.recipientChain
    this.relayerFee = fields.relayerFee
  }

  static reified(): TransferReified {
    const reifiedBcs = Transfer.bcs
    return {
      get typeName() {
        return Transfer.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Transfer.$typeName,
          ...[],
        ) as `${string}::transfer::Transfer`
      },
      typeArgs: [] as [],
      isPhantom: Transfer.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Transfer.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Transfer.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Transfer.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Transfer.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Transfer.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Transfer.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Transfer.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Transfer.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Transfer.fetch(client, id),
      new: (fields: TransferFields) => {
        return new Transfer([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): TransferReified {
    return Transfer.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Transfer>> {
    return phantom(Transfer.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Transfer>> {
    return Transfer.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Transfer', {
      amount: NormalizedAmount.bcs,
      token_address: ExternalAddress.bcs,
      token_chain: bcs.u16(),
      recipient: ExternalAddress.bcs,
      recipient_chain: bcs.u16(),
      relayer_fee: NormalizedAmount.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Transfer.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Transfer.instantiateBcs> {
    if (!Transfer.cachedBcs) {
      Transfer.cachedBcs = Transfer.instantiateBcs()
    }
    return Transfer.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Transfer {
    return Transfer.reified().new({
      amount: decodeFromFields(NormalizedAmount.reified(), fields.amount),
      tokenAddress: decodeFromFields(ExternalAddress.reified(), fields.token_address),
      tokenChain: decodeFromFields('u16', fields.token_chain),
      recipient: decodeFromFields(ExternalAddress.reified(), fields.recipient),
      recipientChain: decodeFromFields('u16', fields.recipient_chain),
      relayerFee: decodeFromFields(NormalizedAmount.reified(), fields.relayer_fee),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Transfer {
    if (!isTransfer(item.type)) {
      throw new Error('not a Transfer type')
    }

    return Transfer.reified().new({
      amount: decodeFromFieldsWithTypes(NormalizedAmount.reified(), item.fields.amount),
      tokenAddress: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.token_address),
      tokenChain: decodeFromFieldsWithTypes('u16', item.fields.token_chain),
      recipient: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.recipient),
      recipientChain: decodeFromFieldsWithTypes('u16', item.fields.recipient_chain),
      relayerFee: decodeFromFieldsWithTypes(NormalizedAmount.reified(), item.fields.relayer_fee),
    })
  }

  static fromBcs(data: Uint8Array): Transfer {
    return Transfer.fromFields(Transfer.bcs.parse(data))
  }

  toJSONField(): TransferJSONField {
    return {
      amount: this.amount.toJSONField(),
      tokenAddress: this.tokenAddress.toJSONField(),
      tokenChain: this.tokenChain,
      recipient: this.recipient.toJSONField(),
      recipientChain: this.recipientChain,
      relayerFee: this.relayerFee.toJSONField(),
    }
  }

  toJSON(): TransferJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Transfer {
    return Transfer.reified().new({
      amount: decodeFromJSONField(NormalizedAmount.reified(), field.amount),
      tokenAddress: decodeFromJSONField(ExternalAddress.reified(), field.tokenAddress),
      tokenChain: decodeFromJSONField('u16', field.tokenChain),
      recipient: decodeFromJSONField(ExternalAddress.reified(), field.recipient),
      recipientChain: decodeFromJSONField('u16', field.recipientChain),
      relayerFee: decodeFromJSONField(NormalizedAmount.reified(), field.relayerFee),
    })
  }

  static fromJSON(json: Record<string, any>): Transfer {
    if (json.$typeName !== Transfer.$typeName) {
      throw new Error(
        `not a Transfer json object: expected '${Transfer.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Transfer.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Transfer {
    if (!isTransfer(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Transfer object`)
    }
    return Transfer.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Transfer.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Transfer {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransfer(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Transfer object`)
    }
    return Transfer.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Transfer.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Transfer {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransfer(data.bcs.type)) {
        throw new Error(`object at is not a Transfer object`)
      }

      return Transfer.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Transfer.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Transfer> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isTransfer(object.type)) {
      throw new Error(`object at id ${id} is not a Transfer object`)
    }
    return Transfer.fromBcs(object.content)
  }
}
