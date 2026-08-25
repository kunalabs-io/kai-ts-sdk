/**
 * This module implements two custom types relating to Token Bridge wrapped
 * assets. These assets have been attested from foreign networks, whose
 * metadata is stored in `ForeignInfo`. The Token Bridge contract is the
 * only authority that can mint and burn these assets via `Supply`.
 *
 * See `create_wrapped` and 'token_registry' modules for more details.
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
import { String } from '../../../std/string/structs'
import { TreasuryCap } from '../../../sui/coin/structs'
import { UpgradeCap } from '../../../sui/package/structs'
import { ExternalAddress } from '../../wormhole-1/external-address/structs'

/* ============================== ForeignInfo =============================== */

export function isForeignInfo(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('token-bridge', 'wrapped_asset::ForeignInfo')}::wrapped_asset::ForeignInfo`
      + '<',
  )
}

export interface ForeignInfoFields<C extends PhantomTypeArgument> {
  tokenChain: ToField<'u16'>
  tokenAddress: ToField<ExternalAddress>
  nativeDecimals: ToField<'u8'>
  symbol: ToField<String>
}

export type ForeignInfoReified<C extends PhantomTypeArgument> = Reified<
  ForeignInfo<C>,
  ForeignInfoFields<C>
>

export type ForeignInfoJSONField<C extends PhantomTypeArgument> = {
  tokenChain: number
  tokenAddress: ToJSON<ExternalAddress>
  nativeDecimals: number
  symbol: string
}

export type ForeignInfoJSON<C extends PhantomTypeArgument> = {
  $typeName: typeof ForeignInfo.$typeName
  $typeArgs: [PhantomToTypeStr<C>]
} & ForeignInfoJSONField<C>

/** Container storing foreign asset info. */
export class ForeignInfo<C extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::wrapped_asset::ForeignInfo` {
    return `${
      getTypeOrigin('token-bridge', 'wrapped_asset::ForeignInfo')
    }::wrapped_asset::ForeignInfo` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof ForeignInfo.$typeName = ForeignInfo.$typeName
  readonly $fullTypeName: `${string}::wrapped_asset::ForeignInfo<${PhantomToTypeStr<C>}>`
  readonly $typeArgs: [PhantomToTypeStr<C>]
  readonly $isPhantom: typeof ForeignInfo.$isPhantom = ForeignInfo.$isPhantom

  readonly tokenChain: ToField<'u16'>
  readonly tokenAddress: ToField<ExternalAddress>
  readonly nativeDecimals: ToField<'u8'>
  readonly symbol: ToField<String>

  private constructor(typeArgs: [PhantomToTypeStr<C>], fields: ForeignInfoFields<C>) {
    this.$fullTypeName = composeSuiType(
      ForeignInfo.$typeName,
      ...typeArgs,
    ) as `${string}::wrapped_asset::ForeignInfo<${PhantomToTypeStr<C>}>`
    this.$typeArgs = typeArgs

    this.tokenChain = fields.tokenChain
    this.tokenAddress = fields.tokenAddress
    this.nativeDecimals = fields.nativeDecimals
    this.symbol = fields.symbol
  }

  static reified<C extends PhantomReified<PhantomTypeArgument>>(
    C: C,
  ): ForeignInfoReified<ToPhantomTypeArgument<C>> {
    const reifiedBcs = ForeignInfo.bcs
    return {
      get typeName() {
        return ForeignInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ForeignInfo.$typeName,
          ...[extractType(C)],
        ) as `${string}::wrapped_asset::ForeignInfo<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`
      },
      get typeArgs() {
        return [extractType(C)] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>]
      },
      isPhantom: ForeignInfo.$isPhantom,
      reifiedTypeArgs: [C],
      fromFields: (fields: Record<string, any>) => ForeignInfo.fromFields(C, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ForeignInfo.fromFieldsWithTypes(C, item),
      fromBcs: (data: Uint8Array) => ForeignInfo.fromFields(C, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ForeignInfo.fromJSONField(C, field),
      fromJSON: (json: Record<string, any>) => ForeignInfo.fromJSON(C, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ForeignInfo.fromCoreObject(C, obj),
      fromSuiParsedData: (content: SuiParsedData) => ForeignInfo.fromSuiParsedData(C, content),
      fromSuiObjectData: (content: SuiObjectData) => ForeignInfo.fromSuiObjectData(C, content),
      fetch: async (client: ClientWithCoreApi, id: string) => ForeignInfo.fetch(client, C, id),
      new: (fields: ForeignInfoFields<ToPhantomTypeArgument<C>>) => {
        return new ForeignInfo([extractType(C)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof ForeignInfo.reified {
    return ForeignInfo.reified
  }

  static phantom<C extends PhantomReified<PhantomTypeArgument>>(
    C: C,
  ): PhantomReified<ToTypeStr<ForeignInfo<ToPhantomTypeArgument<C>>>> {
    return phantom(ForeignInfo.reified(C))
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

  static fromFields<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    fields: Record<string, any>,
  ): ForeignInfo<ToPhantomTypeArgument<C>> {
    return ForeignInfo.reified(typeArg).new({
      tokenChain: decodeFromFields('u16', fields.token_chain),
      tokenAddress: decodeFromFields(ExternalAddress.reified(), fields.token_address),
      nativeDecimals: decodeFromFields('u8', fields.native_decimals),
      symbol: decodeFromFields(String.reified(), fields.symbol),
    })
  }

  static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    item: FieldsWithTypes,
  ): ForeignInfo<ToPhantomTypeArgument<C>> {
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

  static fromBcs<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    data: Uint8Array,
  ): ForeignInfo<ToPhantomTypeArgument<C>> {
    return ForeignInfo.fromFields(typeArg, ForeignInfo.bcs.parse(data))
  }

  toJSONField(): ForeignInfoJSONField<C> {
    return {
      tokenChain: this.tokenChain,
      tokenAddress: this.tokenAddress.toJSONField(),
      nativeDecimals: this.nativeDecimals,
      symbol: this.symbol,
    }
  }

  toJSON(): ForeignInfoJSON<C> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    field: any,
  ): ForeignInfo<ToPhantomTypeArgument<C>> {
    return ForeignInfo.reified(typeArg).new({
      tokenChain: decodeFromJSONField('u16', field.tokenChain),
      tokenAddress: decodeFromJSONField(ExternalAddress.reified(), field.tokenAddress),
      nativeDecimals: decodeFromJSONField('u8', field.nativeDecimals),
      symbol: decodeFromJSONField(String.reified(), field.symbol),
    })
  }

  static fromJSON<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    json: Record<string, any>,
  ): ForeignInfo<ToPhantomTypeArgument<C>> {
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

  static fromCoreObject<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): ForeignInfo<ToPhantomTypeArgument<C>> {
    if (!isForeignInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ForeignInfo object`)
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

    return ForeignInfo.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ForeignInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    content: SuiParsedData,
  ): ForeignInfo<ToPhantomTypeArgument<C>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isForeignInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ForeignInfo object`)
    }
    return ForeignInfo.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ForeignInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    data: SuiObjectData,
  ): ForeignInfo<ToPhantomTypeArgument<C>> {
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

  static async fetch<C extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: C,
    id: string,
  ): Promise<ForeignInfo<ToPhantomTypeArgument<C>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isForeignInfo(object.type)) {
      throw new Error(`object at id ${id} is not a ForeignInfo object`)
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

    return ForeignInfo.fromBcs(typeArg, object.content)
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

export interface WrappedAssetFields<C extends PhantomTypeArgument> {
  info: ToField<ForeignInfo<C>>
  treasuryCap: ToField<TreasuryCap<C>>
  decimals: ToField<'u8'>
  upgradeCap: ToField<UpgradeCap>
}

export type WrappedAssetReified<C extends PhantomTypeArgument> = Reified<
  WrappedAsset<C>,
  WrappedAssetFields<C>
>

export type WrappedAssetJSONField<C extends PhantomTypeArgument> = {
  info: ToJSON<ForeignInfo<C>>
  treasuryCap: ToJSON<TreasuryCap<C>>
  decimals: number
  upgradeCap: ToJSON<UpgradeCap>
}

export type WrappedAssetJSON<C extends PhantomTypeArgument> = {
  $typeName: typeof WrappedAsset.$typeName
  $typeArgs: [PhantomToTypeStr<C>]
} & WrappedAssetJSONField<C>

/**
 * Container managing `ForeignInfo` and `TreasuryCap` for a wrapped asset
 * coin type.
 */
export class WrappedAsset<C extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::wrapped_asset::WrappedAsset` {
    return `${
      getTypeOrigin('token-bridge', 'wrapped_asset::WrappedAsset')
    }::wrapped_asset::WrappedAsset` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof WrappedAsset.$typeName = WrappedAsset.$typeName
  readonly $fullTypeName: `${string}::wrapped_asset::WrappedAsset<${PhantomToTypeStr<C>}>`
  readonly $typeArgs: [PhantomToTypeStr<C>]
  readonly $isPhantom: typeof WrappedAsset.$isPhantom = WrappedAsset.$isPhantom

  readonly info: ToField<ForeignInfo<C>>
  readonly treasuryCap: ToField<TreasuryCap<C>>
  readonly decimals: ToField<'u8'>
  readonly upgradeCap: ToField<UpgradeCap>

  private constructor(typeArgs: [PhantomToTypeStr<C>], fields: WrappedAssetFields<C>) {
    this.$fullTypeName = composeSuiType(
      WrappedAsset.$typeName,
      ...typeArgs,
    ) as `${string}::wrapped_asset::WrappedAsset<${PhantomToTypeStr<C>}>`
    this.$typeArgs = typeArgs

    this.info = fields.info
    this.treasuryCap = fields.treasuryCap
    this.decimals = fields.decimals
    this.upgradeCap = fields.upgradeCap
  }

  static reified<C extends PhantomReified<PhantomTypeArgument>>(
    C: C,
  ): WrappedAssetReified<ToPhantomTypeArgument<C>> {
    const reifiedBcs = WrappedAsset.bcs
    return {
      get typeName() {
        return WrappedAsset.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WrappedAsset.$typeName,
          ...[extractType(C)],
        ) as `${string}::wrapped_asset::WrappedAsset<${PhantomToTypeStr<ToPhantomTypeArgument<C>>}>`
      },
      get typeArgs() {
        return [extractType(C)] as [PhantomToTypeStr<ToPhantomTypeArgument<C>>]
      },
      isPhantom: WrappedAsset.$isPhantom,
      reifiedTypeArgs: [C],
      fromFields: (fields: Record<string, any>) => WrappedAsset.fromFields(C, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WrappedAsset.fromFieldsWithTypes(C, item),
      fromBcs: (data: Uint8Array) => WrappedAsset.fromFields(C, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WrappedAsset.fromJSONField(C, field),
      fromJSON: (json: Record<string, any>) => WrappedAsset.fromJSON(C, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WrappedAsset.fromCoreObject(C, obj),
      fromSuiParsedData: (content: SuiParsedData) => WrappedAsset.fromSuiParsedData(C, content),
      fromSuiObjectData: (content: SuiObjectData) => WrappedAsset.fromSuiObjectData(C, content),
      fetch: async (client: ClientWithCoreApi, id: string) => WrappedAsset.fetch(client, C, id),
      new: (fields: WrappedAssetFields<ToPhantomTypeArgument<C>>) => {
        return new WrappedAsset([extractType(C)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof WrappedAsset.reified {
    return WrappedAsset.reified
  }

  static phantom<C extends PhantomReified<PhantomTypeArgument>>(
    C: C,
  ): PhantomReified<ToTypeStr<WrappedAsset<ToPhantomTypeArgument<C>>>> {
    return phantom(WrappedAsset.reified(C))
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

  static fromFields<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    fields: Record<string, any>,
  ): WrappedAsset<ToPhantomTypeArgument<C>> {
    return WrappedAsset.reified(typeArg).new({
      info: decodeFromFields(ForeignInfo.reified(typeArg), fields.info),
      treasuryCap: decodeFromFields(TreasuryCap.reified(typeArg), fields.treasury_cap),
      decimals: decodeFromFields('u8', fields.decimals),
      upgradeCap: decodeFromFields(UpgradeCap.reified(), fields.upgrade_cap),
    })
  }

  static fromFieldsWithTypes<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    item: FieldsWithTypes,
  ): WrappedAsset<ToPhantomTypeArgument<C>> {
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

  static fromBcs<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    data: Uint8Array,
  ): WrappedAsset<ToPhantomTypeArgument<C>> {
    return WrappedAsset.fromFields(typeArg, WrappedAsset.bcs.parse(data))
  }

  toJSONField(): WrappedAssetJSONField<C> {
    return {
      info: this.info.toJSONField(),
      treasuryCap: this.treasuryCap.toJSONField(),
      decimals: this.decimals,
      upgradeCap: this.upgradeCap.toJSONField(),
    }
  }

  toJSON(): WrappedAssetJSON<C> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    field: any,
  ): WrappedAsset<ToPhantomTypeArgument<C>> {
    return WrappedAsset.reified(typeArg).new({
      info: decodeFromJSONField(ForeignInfo.reified(typeArg), field.info),
      treasuryCap: decodeFromJSONField(TreasuryCap.reified(typeArg), field.treasuryCap),
      decimals: decodeFromJSONField('u8', field.decimals),
      upgradeCap: decodeFromJSONField(UpgradeCap.reified(), field.upgradeCap),
    })
  }

  static fromJSON<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    json: Record<string, any>,
  ): WrappedAsset<ToPhantomTypeArgument<C>> {
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

  static fromCoreObject<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): WrappedAsset<ToPhantomTypeArgument<C>> {
    if (!isWrappedAsset(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WrappedAsset object`)
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

    return WrappedAsset.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedAsset.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    content: SuiParsedData,
  ): WrappedAsset<ToPhantomTypeArgument<C>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWrappedAsset(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WrappedAsset object`)
    }
    return WrappedAsset.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WrappedAsset.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<C extends PhantomReified<PhantomTypeArgument>>(
    typeArg: C,
    data: SuiObjectData,
  ): WrappedAsset<ToPhantomTypeArgument<C>> {
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

  static async fetch<C extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: C,
    id: string,
  ): Promise<WrappedAsset<ToPhantomTypeArgument<C>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWrappedAsset(object.type)) {
      throw new Error(`object at id ${id} is not a WrappedAsset object`)
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

    return WrappedAsset.fromBcs(typeArg, object.content)
  }
}
