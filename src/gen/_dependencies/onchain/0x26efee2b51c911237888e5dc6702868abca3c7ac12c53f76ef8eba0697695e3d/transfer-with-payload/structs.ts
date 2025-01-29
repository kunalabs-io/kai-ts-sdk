import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { ExternalAddress } from '../../../../wormhole/external-address/structs'
import { PKG_V1 } from '../index'
import { NormalizedAmount } from '../normalized-amount/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== TransferWithPayload =============================== */

export function isTransferWithPayload(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::transfer_with_payload::TransferWithPayload`
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

export class TransferWithPayload implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::transfer_with_payload::TransferWithPayload`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TransferWithPayload.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::transfer_with_payload::TransferWithPayload`
  readonly $typeArgs: []
  readonly $isPhantom = TransferWithPayload.$isPhantom

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
      ...typeArgs
    ) as `${typeof PKG_V1}::transfer_with_payload::TransferWithPayload`
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
    return {
      typeName: TransferWithPayload.$typeName,
      fullTypeName: composeSuiType(
        TransferWithPayload.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::transfer_with_payload::TransferWithPayload`,
      typeArgs: [] as [],
      isPhantom: TransferWithPayload.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferWithPayload.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TransferWithPayload.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferWithPayload.fromBcs(data),
      bcs: TransferWithPayload.bcs,
      fromJSONField: (field: any) => TransferWithPayload.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferWithPayload.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TransferWithPayload.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TransferWithPayload.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TransferWithPayload.fetch(client, id),
      new: (fields: TransferWithPayloadFields) => {
        return new TransferWithPayload([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TransferWithPayload.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferWithPayload>> {
    return phantom(TransferWithPayload.reified())
  }
  static get p() {
    return TransferWithPayload.phantom()
  }

  static get bcs() {
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

  static fromFields(fields: Record<string, any>): TransferWithPayload {
    return TransferWithPayload.reified().new({
      amount: decodeFromFields(NormalizedAmount.reified(), fields.amount),
      tokenAddress: decodeFromFields(ExternalAddress.reified(), fields.token_address),
      tokenChain: decodeFromFields('u16', fields.token_chain),
      redeemer: decodeFromFields(ExternalAddress.reified(), fields.redeemer),
      redeemerChain: decodeFromFields('u16', fields.redeemer_chain),
      sender: decodeFromFields(ExternalAddress.reified(), fields.sender),
      payload: decodeFromFields(reified.vector('u8'), fields.payload),
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
      payload: decodeFromFieldsWithTypes(reified.vector('u8'), item.fields.payload),
    })
  }

  static fromBcs(data: Uint8Array): TransferWithPayload {
    return TransferWithPayload.fromFields(TransferWithPayload.bcs.parse(data))
  }

  toJSONField() {
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

  toJSON() {
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
      payload: decodeFromJSONField(reified.vector('u8'), field.payload),
    })
  }

  static fromJSON(json: Record<string, any>): TransferWithPayload {
    if (json.$typeName !== TransferWithPayload.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TransferWithPayload.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TransferWithPayload {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferWithPayload(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TransferWithPayload object`)
    }
    return TransferWithPayload.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TransferWithPayload {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferWithPayload(data.bcs.type)) {
        throw new Error(`object at is not a TransferWithPayload object`)
      }

      return TransferWithPayload.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferWithPayload.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TransferWithPayload> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching TransferWithPayload object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTransferWithPayload(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TransferWithPayload object`)
    }

    return TransferWithPayload.fromSuiObjectData(res.data)
  }
}
