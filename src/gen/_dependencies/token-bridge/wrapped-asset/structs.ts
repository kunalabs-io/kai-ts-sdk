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
import { String } from '../../../std/string/structs'
import { TreasuryCap } from '../../../sui/coin/structs'
import { UpgradeCap } from '../../../sui/package/structs'
import { ExternalAddress } from '../../../wormhole/external-address/structs'

/* ============================== ForeignInfo =============================== */

export function isForeignInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('token-bridge', 'wrapped_asset::ForeignInfo')}::wrapped_asset::ForeignInfo`
      + '<',
  )
}

export interface ForeignInfoFields<T0 extends PhantomTypeArgument> {
  tokenChain: ToField<'u16'>
  tokenAddress: ToField<ExternalAddress>
  nativeDecimals: ToField<'u8'>
  symbol: ToField<String>
}

export type ForeignInfoReified<T0 extends PhantomTypeArgument> = Reified<
  ForeignInfo<T0>,
  ForeignInfoFields<T0>
>

export type ForeignInfoJSONField<T0 extends PhantomTypeArgument> = {
  tokenChain: number
  tokenAddress: ToJSON<ExternalAddress>
  nativeDecimals: number
  symbol: string
}

export type ForeignInfoJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof ForeignInfo.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & ForeignInfoJSONField<T0>

export class ForeignInfo<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::wrapped_asset::ForeignInfo` = `${
    getTypeOrigin('token-bridge', 'wrapped_asset::ForeignInfo')
  }::wrapped_asset::ForeignInfo` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof ForeignInfo.$typeName = ForeignInfo.$typeName
  readonly $fullTypeName: `${string}::wrapped_asset::ForeignInfo<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof ForeignInfo.$isPhantom = ForeignInfo.$isPhantom

  readonly tokenChain: ToField<'u16'>
  readonly tokenAddress: ToField<ExternalAddress>
  readonly nativeDecimals: ToField<'u8'>
  readonly symbol: ToField<String>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: ForeignInfoFields<T0>) {
    this.$fullTypeName = composeSuiType(
      ForeignInfo.$typeName,
      ...typeArgs,
    ) as `${string}::wrapped_asset::ForeignInfo<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.tokenChain = fields.tokenChain
    this.tokenAddress = fields.tokenAddress
    this.nativeDecimals = fields.nativeDecimals
    this.symbol = fields.symbol
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): ForeignInfoReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = ForeignInfo.bcs
    return {
      typeName: ForeignInfo.$typeName,
      fullTypeName: composeSuiType(
        ForeignInfo.$typeName,
        ...[extractType(T0)],
      ) as `${string}::wrapped_asset::ForeignInfo<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: ForeignInfo.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => ForeignInfo.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ForeignInfo.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => ForeignInfo.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ForeignInfo.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => ForeignInfo.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => ForeignInfo.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => ForeignInfo.fromSuiObjectData(T0, content),
      fetch: async (client: SupportedSuiClient, id: string) => ForeignInfo.fetch(client, T0, id),
      new: (fields: ForeignInfoFields<ToPhantomTypeArgument<T0>>) => {
        return new ForeignInfo([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof ForeignInfo.reified {
    return ForeignInfo.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<ForeignInfo<ToPhantomTypeArgument<T0>>>> {
    return phantom(ForeignInfo.reified(T0))
  }

  static get p(): typeof ForeignInfo.phantom {
    return ForeignInfo.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('ForeignInfo', {
      token_chain: bcs.u16(),
      token_address: ExternalAddress.bcs,
      native_decimals: bcs.u8(),
      symbol: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ForeignInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ForeignInfo.instantiateBcs> {
    if (!ForeignInfo.cachedBcs) {
      ForeignInfo.cachedBcs = ForeignInfo.instantiateBcs()
    }
    return ForeignInfo.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
  ): ForeignInfo<ToPhantomTypeArgument<T0>> {
    return ForeignInfo.reified(typeArg).new({
      tokenChain: decodeFromFields('u16', fields.token_chain),
      tokenAddress: decodeFromFields(ExternalAddress.reified(), fields.token_address),
      nativeDecimals: decodeFromFields('u8', fields.native_decimals),
      symbol: decodeFromFields(String.reified(), fields.symbol),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes,
  ): ForeignInfo<ToPhantomTypeArgument<T0>> {
    if (!isForeignInfo(item.type)) {
      throw new Error('not a ForeignInfo type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return ForeignInfo.reified(typeArg).new({
      tokenChain: decodeFromFieldsWithTypes('u16', item.fields.token_chain),
      tokenAddress: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.token_address),
      nativeDecimals: decodeFromFieldsWithTypes('u8', item.fields.native_decimals),
      symbol: decodeFromFieldsWithTypes(String.reified(), item.fields.symbol),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array,
  ): ForeignInfo<ToPhantomTypeArgument<T0>> {
    return ForeignInfo.fromFields(typeArg, ForeignInfo.bcs.parse(data))
  }

  toJSONField(): ForeignInfoJSONField<T0> {
    return {
      tokenChain: this.tokenChain,
      tokenAddress: this.tokenAddress.toJSONField(),
      nativeDecimals: this.nativeDecimals,
      symbol: this.symbol,
    }
  }

  toJSON(): ForeignInfoJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
  ): ForeignInfo<ToPhantomTypeArgument<T0>> {
    return ForeignInfo.reified(typeArg).new({
      tokenChain: decodeFromJSONField('u16', field.tokenChain),
      tokenAddress: decodeFromJSONField(ExternalAddress.reified(), field.tokenAddress),
      nativeDecimals: decodeFromJSONField('u8', field.nativeDecimals),
      symbol: decodeFromJSONField(String.reified(), field.symbol),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>,
  ): ForeignInfo<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== ForeignInfo.$typeName) {
      throw new Error(
        `not a ForeignInfo json object: expected '${ForeignInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(ForeignInfo.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return ForeignInfo.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
  ): ForeignInfo<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isForeignInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ForeignInfo object`)
    }
    return ForeignInfo.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData,
  ): ForeignInfo<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isForeignInfo(data.bcs.type)) {
        throw new Error(`object at is not a ForeignInfo object`)
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

      return ForeignInfo.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ForeignInfo.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<ForeignInfo<ToPhantomTypeArgument<T0>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isForeignInfo(res.type)) {
      throw new Error(`object at id ${id} is not a ForeignInfo object`)
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

    return ForeignInfo.fromBcs(typeArg, res.bcsBytes)
  }
}

/* ============================== WrappedAsset =============================== */

export function isWrappedAsset(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('token-bridge', 'wrapped_asset::WrappedAsset')}::wrapped_asset::WrappedAsset`
      + '<',
  )
}

export interface WrappedAssetFields<T0 extends PhantomTypeArgument> {
  info: ToField<ForeignInfo<T0>>
  treasuryCap: ToField<TreasuryCap<T0>>
  decimals: ToField<'u8'>
  upgradeCap: ToField<UpgradeCap>
}

export type WrappedAssetReified<T0 extends PhantomTypeArgument> = Reified<
  WrappedAsset<T0>,
  WrappedAssetFields<T0>
>

export type WrappedAssetJSONField<T0 extends PhantomTypeArgument> = {
  info: ToJSON<ForeignInfo<T0>>
  treasuryCap: ToJSON<TreasuryCap<T0>>
  decimals: number
  upgradeCap: ToJSON<UpgradeCap>
}

export type WrappedAssetJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof WrappedAsset.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & WrappedAssetJSONField<T0>

export class WrappedAsset<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::wrapped_asset::WrappedAsset` = `${
    getTypeOrigin('token-bridge', 'wrapped_asset::WrappedAsset')
  }::wrapped_asset::WrappedAsset` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof WrappedAsset.$typeName = WrappedAsset.$typeName
  readonly $fullTypeName: `${string}::wrapped_asset::WrappedAsset<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof WrappedAsset.$isPhantom = WrappedAsset.$isPhantom

  readonly info: ToField<ForeignInfo<T0>>
  readonly treasuryCap: ToField<TreasuryCap<T0>>
  readonly decimals: ToField<'u8'>
  readonly upgradeCap: ToField<UpgradeCap>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: WrappedAssetFields<T0>) {
    this.$fullTypeName = composeSuiType(
      WrappedAsset.$typeName,
      ...typeArgs,
    ) as `${string}::wrapped_asset::WrappedAsset<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.info = fields.info
    this.treasuryCap = fields.treasuryCap
    this.decimals = fields.decimals
    this.upgradeCap = fields.upgradeCap
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): WrappedAssetReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = WrappedAsset.bcs
    return {
      typeName: WrappedAsset.$typeName,
      fullTypeName: composeSuiType(
        WrappedAsset.$typeName,
        ...[extractType(T0)],
      ) as `${string}::wrapped_asset::WrappedAsset<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: WrappedAsset.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => WrappedAsset.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WrappedAsset.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => WrappedAsset.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WrappedAsset.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => WrappedAsset.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => WrappedAsset.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => WrappedAsset.fromSuiObjectData(T0, content),
      fetch: async (client: SupportedSuiClient, id: string) => WrappedAsset.fetch(client, T0, id),
      new: (fields: WrappedAssetFields<ToPhantomTypeArgument<T0>>) => {
        return new WrappedAsset([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof WrappedAsset.reified {
    return WrappedAsset.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<WrappedAsset<ToPhantomTypeArgument<T0>>>> {
    return phantom(WrappedAsset.reified(T0))
  }

  static get p(): typeof WrappedAsset.phantom {
    return WrappedAsset.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('WrappedAsset', {
      info: ForeignInfo.bcs,
      treasury_cap: TreasuryCap.bcs,
      decimals: bcs.u8(),
      upgrade_cap: UpgradeCap.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof WrappedAsset.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WrappedAsset.instantiateBcs> {
    if (!WrappedAsset.cachedBcs) {
      WrappedAsset.cachedBcs = WrappedAsset.instantiateBcs()
    }
    return WrappedAsset.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
  ): WrappedAsset<ToPhantomTypeArgument<T0>> {
    return WrappedAsset.reified(typeArg).new({
      info: decodeFromFields(ForeignInfo.reified(typeArg), fields.info),
      treasuryCap: decodeFromFields(TreasuryCap.reified(typeArg), fields.treasury_cap),
      decimals: decodeFromFields('u8', fields.decimals),
      upgradeCap: decodeFromFields(UpgradeCap.reified(), fields.upgrade_cap),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes,
  ): WrappedAsset<ToPhantomTypeArgument<T0>> {
    if (!isWrappedAsset(item.type)) {
      throw new Error('not a WrappedAsset type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return WrappedAsset.reified(typeArg).new({
      info: decodeFromFieldsWithTypes(ForeignInfo.reified(typeArg), item.fields.info),
      treasuryCap: decodeFromFieldsWithTypes(
        TreasuryCap.reified(typeArg),
        item.fields.treasury_cap,
      ),
      decimals: decodeFromFieldsWithTypes('u8', item.fields.decimals),
      upgradeCap: decodeFromFieldsWithTypes(UpgradeCap.reified(), item.fields.upgrade_cap),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array,
  ): WrappedAsset<ToPhantomTypeArgument<T0>> {
    return WrappedAsset.fromFields(typeArg, WrappedAsset.bcs.parse(data))
  }

  toJSONField(): WrappedAssetJSONField<T0> {
    return {
      info: this.info.toJSONField(),
      treasuryCap: this.treasuryCap.toJSONField(),
      decimals: this.decimals,
      upgradeCap: this.upgradeCap.toJSONField(),
    }
  }

  toJSON(): WrappedAssetJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
  ): WrappedAsset<ToPhantomTypeArgument<T0>> {
    return WrappedAsset.reified(typeArg).new({
      info: decodeFromJSONField(ForeignInfo.reified(typeArg), field.info),
      treasuryCap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.treasuryCap),
      decimals: decodeFromJSONField('u8', field.decimals),
      upgradeCap: decodeFromJSONField(UpgradeCap.reified(), field.upgradeCap),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>,
  ): WrappedAsset<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== WrappedAsset.$typeName) {
      throw new Error(
        `not a WrappedAsset json object: expected '${WrappedAsset.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WrappedAsset.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return WrappedAsset.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
  ): WrappedAsset<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedAsset(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WrappedAsset object`)
    }
    return WrappedAsset.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData,
  ): WrappedAsset<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWrappedAsset(data.bcs.type)) {
        throw new Error(`object at is not a WrappedAsset object`)
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

      return WrappedAsset.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WrappedAsset.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<WrappedAsset<ToPhantomTypeArgument<T0>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isWrappedAsset(res.type)) {
      throw new Error(`object at id ${id} is not a WrappedAsset object`)
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

    return WrappedAsset.fromBcs(typeArg, res.bcsBytes)
  }
}
