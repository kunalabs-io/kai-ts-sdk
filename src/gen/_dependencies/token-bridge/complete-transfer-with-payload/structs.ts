/**
 * This module implements two methods: `authorize_transfer` and `redeem_coin`,
 * which are to be executed in a transaction block in this order.
 *
 * `authorize_transfer` allows a contract to complete a Token Bridge transfer
 * with arbitrary payload. This deserialized `TransferWithPayload` with the
 * bridged balance and source chain ID are packaged in a `RedeemerReceipt`.
 *
 * `redeem_coin` unpacks the `RedeemerReceipt` and checks whether the specified
 * `EmitterCap` is the specified redeemer for this transfer. If he is the
 * correct redeemer, the balance is unpacked and transformed into `Coin` and
 * is returned alongside `TransferWithPayload` and source chain ID.
 *
 * The purpose of splitting this transfer redemption into two steps is in case
 * Token Bridge needs to be upgraded and there is a breaking change for this
 * module, an integrator would not be left broken. It is discouraged to put
 * `authorize_transfer` in an integrator's package logic. Otherwise, this
 * integrator needs to be prepared to upgrade his contract to handle the latest
 * version of `complete_transfer_with_payload`.
 *
 * Instead, an integrator is encouraged to execute a transaction block, which
 * executes `authorize_transfer` using the latest Token Bridge package ID and
 * to implement `redeem_coin` in his contract to consume this receipt. This is
 * similar to how an integrator with Wormhole is not meant to use
 * `vaa::parse_and_verify` in his contract in case the `vaa` module needs to
 * be upgraded due to a breaking change.
 *
 * Like in `complete_transfer`, a VAA with an encoded transfer can be redeemed
 * only once.
 *
 * See `transfer_with_payload` module for serialization and deserialization of
 * Wormhole message payload.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
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
  FieldsWithTypes,
  parseTypeName,
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

export interface RedeemerReceiptFields<CoinType extends PhantomTypeArgument> {
  /** Which chain ID this transfer originated from. */
  sourceChain: ToField<'u16'>
  /** Deserialized transfer info. */
  parsed: ToField<TransferWithPayload>
  /** Coin of bridged asset. */
  bridgedOut: ToField<Coin<CoinType>>
}

export type RedeemerReceiptReified<CoinType extends PhantomTypeArgument> = Reified<
  RedeemerReceipt<CoinType>,
  RedeemerReceiptFields<CoinType>
>

export type RedeemerReceiptJSONField<CoinType extends PhantomTypeArgument> = {
  sourceChain: number
  parsed: ToJSON<TransferWithPayload>
  bridgedOut: ToJSON<Coin<CoinType>>
}

export type RedeemerReceiptJSON<CoinType extends PhantomTypeArgument> = {
  $typeName: typeof RedeemerReceipt.$typeName
  $typeArgs: [PhantomToTypeStr<CoinType>]
} & RedeemerReceiptJSONField<CoinType>

/**
 * This type is only generated from `authorize_transfer` and can only be
 * redeemed using `redeem_coin`. Integrators are expected to implement
 * `redeem_coin` within their contracts and call `authorize_transfer` in a
 * transaction block preceding the method that consumes this receipt. The
 * only way to destroy this receipt is calling `redeem_coin` with an
 * `EmitterCap` generated from the `wormhole::emitter` module, whose ID is
 * the expected redeemer for this token transfer.
 */
export class RedeemerReceipt<CoinType extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::complete_transfer_with_payload::RedeemerReceipt` {
    return `${
      getTypeOrigin('token-bridge', 'complete_transfer_with_payload::RedeemerReceipt')
    }::complete_transfer_with_payload::RedeemerReceipt` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof RedeemerReceipt.$typeName = RedeemerReceipt.$typeName
  readonly $fullTypeName:
    `${string}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<CoinType>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinType>]
  readonly $isPhantom: typeof RedeemerReceipt.$isPhantom = RedeemerReceipt.$isPhantom

  /** Which chain ID this transfer originated from. */
  readonly sourceChain: ToField<'u16'>
  /** Deserialized transfer info. */
  readonly parsed: ToField<TransferWithPayload>
  /** Coin of bridged asset. */
  readonly bridgedOut: ToField<Coin<CoinType>>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinType>],
    fields: RedeemerReceiptFields<CoinType>,
  ) {
    this.$fullTypeName = composeSuiType(
      RedeemerReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<CoinType>}>`
    this.$typeArgs = typeArgs

    this.sourceChain = fields.sourceChain
    this.parsed = fields.parsed
    this.bridgedOut = fields.bridgedOut
  }

  static reified<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): RedeemerReceiptReified<ToPhantomTypeArgument<CoinType>> {
    const reifiedBcs = RedeemerReceipt.bcs
    return {
      get typeName() {
        return RedeemerReceipt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RedeemerReceipt.$typeName,
          ...[extractType(CoinType)],
        ) as `${string}::complete_transfer_with_payload::RedeemerReceipt<${PhantomToTypeStr<
          ToPhantomTypeArgument<CoinType>
        >}>`
      },
      get typeArgs() {
        return [extractType(CoinType)] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>]
      },
      isPhantom: RedeemerReceipt.$isPhantom,
      reifiedTypeArgs: [CoinType],
      fromFields: (fields: Record<string, any>) => RedeemerReceipt.fromFields(CoinType, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RedeemerReceipt.fromFieldsWithTypes(CoinType, item),
      fromBcs: (data: Uint8Array) => RedeemerReceipt.fromFields(CoinType, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RedeemerReceipt.fromJSONField(CoinType, field),
      fromJSON: (json: Record<string, any>) => RedeemerReceipt.fromJSON(CoinType, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RedeemerReceipt.fromCoreObject(CoinType, obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        RedeemerReceipt.fromSuiParsedData(CoinType, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RedeemerReceipt.fromSuiObjectData(CoinType, content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        RedeemerReceipt.fetch(client, CoinType, id),
      new: (fields: RedeemerReceiptFields<ToPhantomTypeArgument<CoinType>>) => {
        return new RedeemerReceipt([extractType(CoinType)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof RedeemerReceipt.reified {
    return RedeemerReceipt.reified
  }

  static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): PhantomReified<ToTypeStr<RedeemerReceipt<ToPhantomTypeArgument<CoinType>>>> {
    return phantom(RedeemerReceipt.reified(CoinType))
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

  static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    fields: Record<string, any>,
  ): RedeemerReceipt<ToPhantomTypeArgument<CoinType>> {
    return RedeemerReceipt.reified(typeArg).new({
      sourceChain: decodeFromFields('u16', fields.source_chain),
      parsed: decodeFromFields(TransferWithPayload.reified(), fields.parsed),
      bridgedOut: decodeFromFields(Coin.reified(typeArg), fields.bridged_out),
    })
  }

  static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    item: FieldsWithTypes,
  ): RedeemerReceipt<ToPhantomTypeArgument<CoinType>> {
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

  static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: Uint8Array,
  ): RedeemerReceipt<ToPhantomTypeArgument<CoinType>> {
    return RedeemerReceipt.fromFields(typeArg, RedeemerReceipt.bcs.parse(data))
  }

  toJSONField(): RedeemerReceiptJSONField<CoinType> {
    return {
      sourceChain: this.sourceChain,
      parsed: this.parsed.toJSONField(),
      bridgedOut: this.bridgedOut.toJSONField(),
    }
  }

  toJSON(): RedeemerReceiptJSON<CoinType> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    field: any,
  ): RedeemerReceipt<ToPhantomTypeArgument<CoinType>> {
    return RedeemerReceipt.reified(typeArg).new({
      sourceChain: decodeFromJSONField('u16', field.sourceChain),
      parsed: decodeFromJSONField(TransferWithPayload.reified(), field.parsed),
      bridgedOut: decodeFromJSONField(Coin.reified(typeArg), field.bridgedOut),
    })
  }

  static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    json: Record<string, any>,
  ): RedeemerReceipt<ToPhantomTypeArgument<CoinType>> {
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

  static fromCoreObject<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): RedeemerReceipt<ToPhantomTypeArgument<CoinType>> {
    if (!isRedeemerReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RedeemerReceipt object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
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

    return RedeemerReceipt.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RedeemerReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    content: SuiParsedData,
  ): RedeemerReceipt<ToPhantomTypeArgument<CoinType>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRedeemerReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RedeemerReceipt object`)
    }
    return RedeemerReceipt.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RedeemerReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: SuiObjectData,
  ): RedeemerReceipt<ToPhantomTypeArgument<CoinType>> {
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

  static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: CoinType,
    id: string,
  ): Promise<RedeemerReceipt<ToPhantomTypeArgument<CoinType>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRedeemerReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a RedeemerReceipt object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
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

    return RedeemerReceipt.fromBcs(typeArg, object.content)
  }
}
