/**
 * This module implements a custom type that keeps track of info relating to
 * assets (coin types) native to Sui. Token Bridge takes custody of these
 * assets when someone invokes a token transfer outbound. Likewise, Token
 * Bridge releases some of its balance from its custody of when someone redeems
 * an inbound token transfer intended for Sui.
 *
 * See `token_registry` module for more details.
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
import { Balance } from '../../../sui/balance/structs'
import { ExternalAddress } from '../../../wormhole/external-address/structs'

/* ============================== NativeAsset =============================== */

export function isNativeAsset(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('token-bridge', 'native_asset::NativeAsset')}::native_asset::NativeAsset`
      + '<',
  )
}

export interface NativeAssetFields<C extends PhantomTypeArgument> {
  custody: ToField<Balance<C>>
  tokenAddress: ToField<ExternalAddress>
  decimals: ToField<'u8'>
}

export type NativeAssetReified<C extends PhantomTypeArgument> = Reified<
  NativeAsset<C>,
  NativeAssetFields<C>
>

export type NativeAssetJSONField<C extends PhantomTypeArgument> = {
  custody: ToJSON<Balance<C>>
  tokenAddress: ToJSON<ExternalAddress>
  decimals: number
}

export type NativeAssetJSON<C extends PhantomTypeArgument> = {
  $typeName: typeof NativeAsset.$typeName
  $typeArgs: [PhantomToTypeStr<C>]
} & NativeAssetJSONField<C>

/** Container for storing canonical token address and custodied `Balance`. */
export class NativeAsset<C extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::native_asset::NativeAsset` = `${
    getTypeOrigin('token-bridge', 'native_asset::NativeAsset')
  }::native_asset::NativeAsset` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof NativeAsset.$typeName = NativeAsset.$typeName
  readonly $fullTypeName: `${string}::native_asset::NativeAsset<${PhantomToTypeStr<C>}>`
  readonly $typeArgs: [PhantomToTypeStr<C>]
  readonly $isPhantom: typeof NativeAsset.$isPhantom = NativeAsset.$isPhantom

  readonly custody: ToField<Balance<C>>
  readonly tokenAddress: ToField<ExternalAddress>
  readonly decimals: ToField<'u8'>

  private constructor(typeArgs: [PhantomToTypeStr<C>], fields: NativeAssetFields<C>) {
    this.$fullTypeName = composeSuiType(
      NativeAsset.$typeName,
      ...typeArgs,
    ) as `${string}::native_asset::NativeAsset<${PhantomToTypeStr<C>}>`
    this.$typeArgs = typeArgs

    this.custody = fields.custody
    this.tokenAddress = fields.tokenAddress
    this.decimals = fields.decimals
  }

  static reified<C extends PhantomReified<PhantomTypeArgument>>(
    C: C,
  ): NativeAssetReified<ToPhantomTypeArgument<C>> {
    const reifiedBcs = NativeAsset.bcs
    return {
      typeName: NativeAsset.$typeName,
      fullTypeName: composeSuiType(
        NativeAsset.$typeName,
        ...[extractType(C)],
      ) as `${string}::native_asset::NativeAsset<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`,
      typeArgs: [extractType(C)] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>],
      isPhantom: NativeAsset.$isPhantom,
      reifiedTypeArgs: [C],
      fromFields: (fields: Record<string, any>) => NativeAsset.fromFields(C, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => NativeAsset.fromFieldsWithTypes(C, item),
      fromBcs: (data: Uint8Array) => NativeAsset.fromFields(C, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => NativeAsset.fromJSONField(C, field),
      fromJSON: (json: Record<string, any>) => NativeAsset.fromJSON(C, json),
      fromSuiParsedData: (content: SuiParsedData) => NativeAsset.fromSuiParsedData(C, content),
      fromSuiObjectData: (content: SuiObjectData) => NativeAsset.fromSuiObjectData(C, content),
      fetch: async (client: SupportedSuiClient, id: string) => NativeAsset.fetch(client, C, id),
      new: (fields: NativeAssetFields<ToPhantomTypeArgument<C>>) => {
        return new NativeAsset([extractType(C)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof NativeAsset.reified {
    return NativeAsset.reified
  }

  static phantom<C extends PhantomReified<PhantomTypeArgument>>(
    C: C,
  ): PhantomReified<ToTypeStr<NativeAsset<ToPhantomTypeArgument<C>>>> {
    return phantom(NativeAsset.reified(C))
  }

  static get p(): typeof NativeAsset.phantom {
    return NativeAsset.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('NativeAsset', {
      custody: Balance.bcs,
      token_address: ExternalAddress.bcs,
      decimals: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof NativeAsset.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof NativeAsset.instantiateBcs> {
    if (!NativeAsset.cachedBcs) {
      NativeAsset.cachedBcs = NativeAsset.instantiateBcs()
    }
    return NativeAsset.cachedBcs
  }

  static fromFields<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    fields: Record<string, any>,
  ): NativeAsset<ToPhantomTypeArgument<C>> {
    return NativeAsset.reified(typeArg).new({
      custody: decodeFromFields(Balance.reified(typeArg), fields.custody),
      tokenAddress: decodeFromFields(ExternalAddress.reified(), fields.token_address),
      decimals: decodeFromFields('u8', fields.decimals),
    })
  }

  static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    item: FieldsWithTypes,
  ): NativeAsset<ToPhantomTypeArgument<C>> {
    if (!isNativeAsset(item.type)) {
      throw new Error('not a NativeAsset type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return NativeAsset.reified(typeArg).new({
      custody: decodeFromFieldsWithTypes(Balance.reified(typeArg), item.fields.custody),
      tokenAddress: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.token_address),
      decimals: decodeFromFieldsWithTypes('u8', item.fields.decimals),
    })
  }

  static fromBcs<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    data: Uint8Array,
  ): NativeAsset<ToPhantomTypeArgument<C>> {
    return NativeAsset.fromFields(typeArg, NativeAsset.bcs.parse(data))
  }

  toJSONField(): NativeAssetJSONField<C> {
    return {
      custody: this.custody.toJSONField(),
      tokenAddress: this.tokenAddress.toJSONField(),
      decimals: this.decimals,
    }
  }

  toJSON(): NativeAssetJSON<C> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    field: any,
  ): NativeAsset<ToPhantomTypeArgument<C>> {
    return NativeAsset.reified(typeArg).new({
      custody: decodeFromJSONField(Balance.reified(typeArg), field.custody),
      tokenAddress: decodeFromJSONField(ExternalAddress.reified(), field.tokenAddress),
      decimals: decodeFromJSONField('u8', field.decimals),
    })
  }

  static fromJSON<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    json: Record<string, any>,
  ): NativeAsset<ToPhantomTypeArgument<C>> {
    if (json.$typeName !== NativeAsset.$typeName) {
      throw new Error(
        `not a NativeAsset json object: expected '${NativeAsset.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(NativeAsset.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return NativeAsset.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    content: SuiParsedData,
  ): NativeAsset<ToPhantomTypeArgument<C>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isNativeAsset(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a NativeAsset object`)
    }
    return NativeAsset.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    data: SuiObjectData,
  ): NativeAsset<ToPhantomTypeArgument<C>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isNativeAsset(data.bcs.type)) {
        throw new Error(`object at is not a NativeAsset object`)
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

      return NativeAsset.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return NativeAsset.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<C extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: C,
    id: string,
  ): Promise<NativeAsset<ToPhantomTypeArgument<C>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isNativeAsset(res.type)) {
      throw new Error(`object at id ${id} is not a NativeAsset object`)
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

    return NativeAsset.fromBcs(typeArg, res.bcsBytes)
  }
}
