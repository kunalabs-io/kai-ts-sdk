/**
 * This module implements serialization and deserialization for token transfer
 * with an arbitrary payload. This message is a specific Wormhole message
 * payload for Token Bridge.
 *
 * In order to redeem these types of transfers, one must have an `EmitterCap`
 * and the specified `redeemer` must agree with this capability.
 *
 * See `transfer_tokens_with_payload` and `complete_transfer_with_payload`
 * modules for more details.
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
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { ExternalAddress } from '../../../wormhole/external-address/structs'
import { NormalizedAmount } from '../normalized-amount/structs'

/* ============================== TransferWithPayload =============================== */

export function isTransferWithPayload(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'transfer_with_payload::TransferWithPayload')
    }::transfer_with_payload::TransferWithPayload`
}

export interface TransferWithPayloadFields {
  amount: ToField<NormalizedAmount>
  tokenAddress: ToField<ExternalAddress>
  tokenChain: ToField<'u16'>
  redeemer: ToField<ExternalAddress>
  redeemerChain: ToField<'u16'>
  sender: ToField<ExternalAddress>
  payload: ToField<Vector<'u8'>>
}

export type TransferWithPayloadReified = Reified<TransferWithPayload, TransferWithPayloadFields>

export type TransferWithPayloadJSONField = {
  amount: ToJSON<NormalizedAmount>
  tokenAddress: ToJSON<ExternalAddress>
  tokenChain: number
  redeemer: ToJSON<ExternalAddress>
  redeemerChain: number
  sender: ToJSON<ExternalAddress>
  payload: number[]
}

export type TransferWithPayloadJSON = {
  $typeName: typeof TransferWithPayload.$typeName
  $typeArgs: []
} & TransferWithPayloadJSONField

/**
 * Container that warehouses transfer information, including arbitrary
 * payload.
 *
 * NOTE: This struct has `drop` because we do not want to require an
 * integrator receiving transfer information to have to manually destroy.
 */
export class TransferWithPayload implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::transfer_with_payload::TransferWithPayload` {
    return `${
      getTypeOrigin('token-bridge', 'transfer_with_payload::TransferWithPayload')
    }::transfer_with_payload::TransferWithPayload` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof TransferWithPayload.$typeName = TransferWithPayload.$typeName
  readonly $fullTypeName: `${string}::transfer_with_payload::TransferWithPayload`
  readonly $typeArgs: []
  readonly $isPhantom: typeof TransferWithPayload.$isPhantom = TransferWithPayload.$isPhantom

  readonly amount: ToField<NormalizedAmount>
  readonly tokenAddress: ToField<ExternalAddress>
  readonly tokenChain: ToField<'u16'>
  readonly redeemer: ToField<ExternalAddress>
  readonly redeemerChain: ToField<'u16'>
  readonly sender: ToField<ExternalAddress>
  readonly payload: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: TransferWithPayloadFields) {
    this.$fullTypeName = composeSuiType(
      TransferWithPayload.$typeName,
      ...typeArgs,
    ) as `${string}::transfer_with_payload::TransferWithPayload`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
    this.tokenAddress = fields.tokenAddress
    this.tokenChain = fields.tokenChain
    this.redeemer = fields.redeemer
    this.redeemerChain = fields.redeemerChain
    this.sender = fields.sender
    this.payload = fields.payload
  }

  static reified(): TransferWithPayloadReified {
    const reifiedBcs = TransferWithPayload.bcs
    return {
      get typeName() {
        return TransferWithPayload.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          TransferWithPayload.$typeName,
          ...[],
        ) as `${string}::transfer_with_payload::TransferWithPayload`
      },
      typeArgs: [] as [],
      isPhantom: TransferWithPayload.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferWithPayload.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TransferWithPayload.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferWithPayload.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferWithPayload.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferWithPayload.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        TransferWithPayload.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => TransferWithPayload.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TransferWithPayload.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => TransferWithPayload.fetch(client, id),
      new: (fields: TransferWithPayloadFields) => {
        return new TransferWithPayload([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): TransferWithPayloadReified {
    return TransferWithPayload.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferWithPayload>> {
    return phantom(TransferWithPayload.reified())
  }

  static get p(): PhantomReified<ToTypeStr<TransferWithPayload>> {
    return TransferWithPayload.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TransferWithPayload', {
      amount: NormalizedAmount.bcs,
      token_address: ExternalAddress.bcs,
      token_chain: bcs.u16(),
      redeemer: ExternalAddress.bcs,
      redeemer_chain: bcs.u16(),
      sender: ExternalAddress.bcs,
      payload: bcs.vector(bcs.u8()),
    })
  }

  private static cachedBcs: ReturnType<typeof TransferWithPayload.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof TransferWithPayload.instantiateBcs> {
    if (!TransferWithPayload.cachedBcs) {
      TransferWithPayload.cachedBcs = TransferWithPayload.instantiateBcs()
    }
    return TransferWithPayload.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TransferWithPayload {
    return TransferWithPayload.reified().new({
      amount: decodeFromFields(NormalizedAmount.reified(), fields.amount),
      tokenAddress: decodeFromFields(ExternalAddress.reified(), fields.token_address),
      tokenChain: decodeFromFields('u16', fields.token_chain),
      redeemer: decodeFromFields(ExternalAddress.reified(), fields.redeemer),
      redeemerChain: decodeFromFields('u16', fields.redeemer_chain),
      sender: decodeFromFields(ExternalAddress.reified(), fields.sender),
      payload: decodeFromFields(vector('u8'), fields.payload),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TransferWithPayload {
    if (!isTransferWithPayload(item.type)) {
      throw new Error('not a TransferWithPayload type')
    }

    return TransferWithPayload.reified().new({
      amount: decodeFromFieldsWithTypes(NormalizedAmount.reified(), item.fields.amount),
      tokenAddress: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.token_address),
      tokenChain: decodeFromFieldsWithTypes('u16', item.fields.token_chain),
      redeemer: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.redeemer),
      redeemerChain: decodeFromFieldsWithTypes('u16', item.fields.redeemer_chain),
      sender: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.sender),
      payload: decodeFromFieldsWithTypes(vector('u8'), item.fields.payload),
    })
  }

  static fromBcs(data: Uint8Array): TransferWithPayload {
    return TransferWithPayload.fromFields(TransferWithPayload.bcs.parse(data))
  }

  toJSONField(): TransferWithPayloadJSONField {
    return {
      amount: this.amount.toJSONField(),
      tokenAddress: this.tokenAddress.toJSONField(),
      tokenChain: this.tokenChain,
      redeemer: this.redeemer.toJSONField(),
      redeemerChain: this.redeemerChain,
      sender: this.sender.toJSONField(),
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
    }
  }

  toJSON(): TransferWithPayloadJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TransferWithPayload {
    return TransferWithPayload.reified().new({
      amount: decodeFromJSONField(NormalizedAmount.reified(), field.amount),
      tokenAddress: decodeFromJSONField(ExternalAddress.reified(), field.tokenAddress),
      tokenChain: decodeFromJSONField('u16', field.tokenChain),
      redeemer: decodeFromJSONField(ExternalAddress.reified(), field.redeemer),
      redeemerChain: decodeFromJSONField('u16', field.redeemerChain),
      sender: decodeFromJSONField(ExternalAddress.reified(), field.sender),
      payload: decodeFromJSONField(vector('u8'), field.payload),
    })
  }

  static fromJSON(json: Record<string, any>): TransferWithPayload {
    if (json.$typeName !== TransferWithPayload.$typeName) {
      throw new Error(
        `not a TransferWithPayload json object: expected '${TransferWithPayload.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return TransferWithPayload.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): TransferWithPayload {
    if (!isTransferWithPayload(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a TransferWithPayload object`)
    }
    return TransferWithPayload.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TransferWithPayload.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): TransferWithPayload {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferWithPayload(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TransferWithPayload object`)
    }
    return TransferWithPayload.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TransferWithPayload.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): TransferWithPayload {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferWithPayload(data.bcs.type)) {
        throw new Error(`object at is not a TransferWithPayload object`)
      }

      return TransferWithPayload.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferWithPayload.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<TransferWithPayload> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isTransferWithPayload(object.type)) {
      throw new Error(`object at id ${id} is not a TransferWithPayload object`)
    }
    return TransferWithPayload.fromBcs(object.content)
  }
}
