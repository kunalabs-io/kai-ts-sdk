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
import { PKG_V1 } from '../index'
import { TransferWithPayload } from '../transfer-with-payload/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== RedeemerReceipt =============================== */

export function isRedeemerReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::complete_transfer_with_payload::RedeemerReceipt` + '<')
}

export interface RedeemerReceiptFields<T0 extends PhantomTypeArgument> {
  sourceChain: ToField<'u16'>
  parsed: ToField<TransferWithPayload>
  bridgedOut: ToField<Coin<T0>>
}

export type RedeemerReceiptReified<T0 extends PhantomTypeArgument> = Reified<
  RedeemerReceipt<T0>,
  RedeemerReceiptFields<T0>
>

export class RedeemerReceipt<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::complete_transfer_with_payload::RedeemerReceipt`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = RedeemerReceipt.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = RedeemerReceipt.$isPhantom

  readonly sourceChain: ToField<'u16'>
  readonly parsed: ToField<TransferWithPayload>
  readonly bridgedOut: ToField<Coin<T0>>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RedeemerReceiptFields<T0>) {
    this.$fullTypeName = composeSuiType(
      RedeemerReceipt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.sourceChain = fields.sourceChain
    this.parsed = fields.parsed
    this.bridgedOut = fields.bridgedOut
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): RedeemerReceiptReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = RedeemerReceipt.bcs
    return {
      typeName: RedeemerReceipt.$typeName,
      fullTypeName: composeSuiType(
        RedeemerReceipt.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: RedeemerReceipt.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => RedeemerReceipt.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RedeemerReceipt.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => RedeemerReceipt.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RedeemerReceipt.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => RedeemerReceipt.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => RedeemerReceipt.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => RedeemerReceipt.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => RedeemerReceipt.fetch(client, T0, id),
      new: (fields: RedeemerReceiptFields<ToPhantomTypeArgument<T0>>) => {
        return new RedeemerReceipt([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RedeemerReceipt.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<RedeemerReceipt<ToPhantomTypeArgument<T0>>>> {
    return phantom(RedeemerReceipt.reified(T0))
  }
  static get p() {
    return RedeemerReceipt.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('RedeemerReceipt', {
      source_chain: bcs.u16(),
      parsed: TransferWithPayload.bcs,
      bridged_out: Coin.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof RedeemerReceipt.instantiateBcs> | null = null

  static get bcs() {
    if (!RedeemerReceipt.cachedBcs) {
      RedeemerReceipt.cachedBcs = RedeemerReceipt.instantiateBcs()
    }
    return RedeemerReceipt.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    return RedeemerReceipt.reified(typeArg).new({
      sourceChain: decodeFromFields('u16', fields.source_chain),
      parsed: decodeFromFields(TransferWithPayload.reified(), fields.parsed),
      bridgedOut: decodeFromFields(Coin.reified(typeArg), fields.bridged_out),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    if (!isRedeemerReceipt(item.type)) {
      throw new Error('not a RedeemerReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return RedeemerReceipt.reified(typeArg).new({
      sourceChain: decodeFromFieldsWithTypes('u16', item.fields.source_chain),
      parsed: decodeFromFieldsWithTypes(TransferWithPayload.reified(), item.fields.parsed),
      bridgedOut: decodeFromFieldsWithTypes(Coin.reified(typeArg), item.fields.bridged_out),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    return RedeemerReceipt.fromFields(typeArg, RedeemerReceipt.bcs.parse(data))
  }

  toJSONField() {
    return {
      sourceChain: this.sourceChain,
      parsed: this.parsed.toJSONField(),
      bridgedOut: this.bridgedOut.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    return RedeemerReceipt.reified(typeArg).new({
      sourceChain: decodeFromJSONField('u16', field.sourceChain),
      parsed: decodeFromJSONField(TransferWithPayload.reified(), field.parsed),
      bridgedOut: decodeFromJSONField(Coin.reified(typeArg), field.bridgedOut),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== RedeemerReceipt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RedeemerReceipt.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return RedeemerReceipt.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRedeemerReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RedeemerReceipt object`)
    }
    return RedeemerReceipt.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRedeemerReceipt(data.bcs.type)) {
        throw new Error(`object at is not a RedeemerReceipt object`)
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

      return RedeemerReceipt.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RedeemerReceipt.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<RedeemerReceipt<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RedeemerReceipt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRedeemerReceipt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RedeemerReceipt object`)
    }

    return RedeemerReceipt.fromSuiObjectData(typeArg, res.data)
  }
}
