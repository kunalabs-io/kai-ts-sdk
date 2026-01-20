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
import { TransferWithPayload } from '../transfer-with-payload/structs'

/* ============================== RedeemerReceipt =============================== */

export function isRedeemerReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('token-bridge', 'complete_transfer_with_payload::RedeemerReceipt')
    }::complete_transfer_with_payload::RedeemerReceipt` + '<',
  )
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

export type RedeemerReceiptJSONField<T0 extends PhantomTypeArgument> = {
  sourceChain: number
  parsed: ToJSON<TransferWithPayload>
  bridgedOut: ToJSON<Coin<T0>>
}

export type RedeemerReceiptJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof RedeemerReceipt.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & RedeemerReceiptJSONField<T0>

export class RedeemerReceipt<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::complete_transfer_with_payload::RedeemerReceipt` = `${
    getTypeOrigin('token-bridge', 'complete_transfer_with_payload::RedeemerReceipt')
  }::complete_transfer_with_payload::RedeemerReceipt` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof RedeemerReceipt.$typeName = RedeemerReceipt.$typeName
  readonly $fullTypeName:
    `${string}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof RedeemerReceipt.$isPhantom = RedeemerReceipt.$isPhantom

  readonly sourceChain: ToField<'u16'>
  readonly parsed: ToField<TransferWithPayload>
  readonly bridgedOut: ToField<Coin<T0>>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RedeemerReceiptFields<T0>) {
    this.$fullTypeName = composeSuiType(
      RedeemerReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.sourceChain = fields.sourceChain
    this.parsed = fields.parsed
    this.bridgedOut = fields.bridgedOut
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): RedeemerReceiptReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = RedeemerReceipt.bcs
    return {
      typeName: RedeemerReceipt.$typeName,
      fullTypeName: composeSuiType(
        RedeemerReceipt.$typeName,
        ...[extractType(T0)],
      ) as `${string}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<
        ToPhantomTypeArgument<T0>
      >}>`,
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
      fetch: async (client: SupportedSuiClient, id: string) =>
        RedeemerReceipt.fetch(client, T0, id),
      new: (fields: RedeemerReceiptFields<ToPhantomTypeArgument<T0>>) => {
        return new RedeemerReceipt([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof RedeemerReceipt.reified {
    return RedeemerReceipt.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<RedeemerReceipt<ToPhantomTypeArgument<T0>>>> {
    return phantom(RedeemerReceipt.reified(T0))
  }

  static get p(): typeof RedeemerReceipt.phantom {
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

  static get bcs(): ReturnType<typeof RedeemerReceipt.instantiateBcs> {
    if (!RedeemerReceipt.cachedBcs) {
      RedeemerReceipt.cachedBcs = RedeemerReceipt.instantiateBcs()
    }
    return RedeemerReceipt.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    return RedeemerReceipt.reified(typeArg).new({
      sourceChain: decodeFromFields('u16', fields.source_chain),
      parsed: decodeFromFields(TransferWithPayload.reified(), fields.parsed),
      bridgedOut: decodeFromFields(Coin.reified(typeArg), fields.bridged_out),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes,
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
    data: Uint8Array,
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    return RedeemerReceipt.fromFields(typeArg, RedeemerReceipt.bcs.parse(data))
  }

  toJSONField(): RedeemerReceiptJSONField<T0> {
    return {
      sourceChain: this.sourceChain,
      parsed: this.parsed.toJSONField(),
      bridgedOut: this.bridgedOut.toJSONField(),
    }
  }

  toJSON(): RedeemerReceiptJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    return RedeemerReceipt.reified(typeArg).new({
      sourceChain: decodeFromJSONField('u16', field.sourceChain),
      parsed: decodeFromJSONField(TransferWithPayload.reified(), field.parsed),
      bridgedOut: decodeFromJSONField(Coin.reified(typeArg), field.bridgedOut),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>,
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== RedeemerReceipt.$typeName) {
      throw new Error(
        `not a RedeemerReceipt json object: expected '${RedeemerReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(RedeemerReceipt.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return RedeemerReceipt.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
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
    data: SuiObjectData,
  ): RedeemerReceipt<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRedeemerReceipt(data.bcs.type)) {
        throw new Error(`object at is not a RedeemerReceipt object`)
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

      return RedeemerReceipt.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RedeemerReceipt.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<RedeemerReceipt<ToPhantomTypeArgument<T0>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isRedeemerReceipt(res.type)) {
      throw new Error(`object at id ${id} is not a RedeemerReceipt object`)
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

    return RedeemerReceipt.fromBcs(typeArg, res.bcsBytes)
  }
}
