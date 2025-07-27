import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { ExternalAddress } from '../../0x5306f64e312b581766351c07af79c72fcb1cd25147157fdc2f8ad76de9a3fb6a/external-address/structs'
import { PKG_V1 } from '../index'
import { NormalizedAmount } from '../normalized-amount/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Transfer =============================== */

export function isTransfer(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::transfer::Transfer`
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

export class Transfer implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::transfer::Transfer`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Transfer.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::transfer::Transfer`
  readonly $typeArgs: []
  readonly $isPhantom = Transfer.$isPhantom

  readonly amount: ToField<NormalizedAmount>
  readonly tokenAddress: ToField<ExternalAddress>
  readonly tokenChain: ToField<'u16'>
  readonly recipient: ToField<ExternalAddress>
  readonly recipientChain: ToField<'u16'>
  readonly relayerFee: ToField<NormalizedAmount>

  private constructor(typeArgs: [], fields: TransferFields) {
    this.$fullTypeName = composeSuiType(
      Transfer.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::transfer::Transfer`
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
      typeName: Transfer.$typeName,
      fullTypeName: composeSuiType(
        Transfer.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::transfer::Transfer`,
      typeArgs: [] as [],
      isPhantom: Transfer.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Transfer.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Transfer.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Transfer.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Transfer.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Transfer.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Transfer.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Transfer.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Transfer.fetch(client, id),
      new: (fields: TransferFields) => {
        return new Transfer([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Transfer.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Transfer>> {
    return phantom(Transfer.reified())
  }
  static get p() {
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

  static get bcs() {
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

  toJSONField() {
    return {
      amount: this.amount.toJSONField(),
      tokenAddress: this.tokenAddress.toJSONField(),
      tokenChain: this.tokenChain,
      recipient: this.recipient.toJSONField(),
      recipientChain: this.recipientChain,
      relayerFee: this.relayerFee.toJSONField(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return Transfer.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Transfer {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransfer(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Transfer object`)
    }
    return Transfer.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Transfer {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransfer(data.bcs.type)) {
        throw new Error(`object at is not a Transfer object`)
      }

      return Transfer.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Transfer.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Transfer> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Transfer object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTransfer(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Transfer object`)
    }

    return Transfer.fromSuiObjectData(res.data)
  }
}
