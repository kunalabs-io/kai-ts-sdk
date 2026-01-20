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

export interface NativeAssetFields<T0 extends PhantomTypeArgument> {
  custody: ToField<Balance<T0>>
  tokenAddress: ToField<ExternalAddress>
  decimals: ToField<'u8'>
}

export type NativeAssetReified<T0 extends PhantomTypeArgument> = Reified<
  NativeAsset<T0>,
  NativeAssetFields<T0>
>

export type NativeAssetJSONField<T0 extends PhantomTypeArgument> = {
  custody: ToJSON<Balance<T0>>
  tokenAddress: ToJSON<ExternalAddress>
  decimals: number
}

export type NativeAssetJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof NativeAsset.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & NativeAssetJSONField<T0>

export class NativeAsset<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::native_asset::NativeAsset` = `${
    getTypeOrigin('token-bridge', 'native_asset::NativeAsset')
  }::native_asset::NativeAsset` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof NativeAsset.$typeName = NativeAsset.$typeName
  readonly $fullTypeName: `${string}::native_asset::NativeAsset<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof NativeAsset.$isPhantom = NativeAsset.$isPhantom

  readonly custody: ToField<Balance<T0>>
  readonly tokenAddress: ToField<ExternalAddress>
  readonly decimals: ToField<'u8'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: NativeAssetFields<T0>) {
    this.$fullTypeName = composeSuiType(
      NativeAsset.$typeName,
      ...typeArgs,
    ) as `${string}::native_asset::NativeAsset<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.custody = fields.custody
    this.tokenAddress = fields.tokenAddress
    this.decimals = fields.decimals
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): NativeAssetReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = NativeAsset.bcs
    return {
      typeName: NativeAsset.$typeName,
      fullTypeName: composeSuiType(
        NativeAsset.$typeName,
        ...[extractType(T0)],
      ) as `${string}::native_asset::NativeAsset<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: NativeAsset.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => NativeAsset.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => NativeAsset.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => NativeAsset.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => NativeAsset.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => NativeAsset.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => NativeAsset.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => NativeAsset.fromSuiObjectData(T0, content),
      fetch: async (client: SupportedSuiClient, id: string) => NativeAsset.fetch(client, T0, id),
      new: (fields: NativeAssetFields<ToPhantomTypeArgument<T0>>) => {
        return new NativeAsset([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof NativeAsset.reified {
    return NativeAsset.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<NativeAsset<ToPhantomTypeArgument<T0>>>> {
    return phantom(NativeAsset.reified(T0))
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

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
  ): NativeAsset<ToPhantomTypeArgument<T0>> {
    return NativeAsset.reified(typeArg).new({
      custody: decodeFromFields(Balance.reified(typeArg), fields.custody),
      tokenAddress: decodeFromFields(ExternalAddress.reified(), fields.token_address),
      decimals: decodeFromFields('u8', fields.decimals),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes,
  ): NativeAsset<ToPhantomTypeArgument<T0>> {
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

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array,
  ): NativeAsset<ToPhantomTypeArgument<T0>> {
    return NativeAsset.fromFields(typeArg, NativeAsset.bcs.parse(data))
  }

  toJSONField(): NativeAssetJSONField<T0> {
    return {
      custody: this.custody.toJSONField(),
      tokenAddress: this.tokenAddress.toJSONField(),
      decimals: this.decimals,
    }
  }

  toJSON(): NativeAssetJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
  ): NativeAsset<ToPhantomTypeArgument<T0>> {
    return NativeAsset.reified(typeArg).new({
      custody: decodeFromJSONField(Balance.reified(typeArg), field.custody),
      tokenAddress: decodeFromJSONField(ExternalAddress.reified(), field.tokenAddress),
      decimals: decodeFromJSONField('u8', field.decimals),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>,
  ): NativeAsset<ToPhantomTypeArgument<T0>> {
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

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
  ): NativeAsset<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isNativeAsset(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a NativeAsset object`)
    }
    return NativeAsset.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData,
  ): NativeAsset<ToPhantomTypeArgument<T0>> {
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

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<NativeAsset<ToPhantomTypeArgument<T0>>> {
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
