/**
 * This module implements a custom type that keeps track of both native and
 * wrapped assets via dynamic fields. These dynamic fields are keyed off using
 * coin types. This registry lives in `State`.
 *
 * See `state` module for more details.
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
  fieldToJSON,
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
  ToTypeStr as ToPhantom,
  vector,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { String } from '../../../std/ascii/structs'
import { UID } from '../../../sui/object/structs'
import { Table } from '../../../sui/table/structs'
import { ExternalAddress } from '../../../wormhole/external-address/structs'

/* ============================== TokenRegistry =============================== */

export function isTokenRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'token_registry::TokenRegistry')
    }::token_registry::TokenRegistry`
}

export interface TokenRegistryFields {
  id: ToField<UID>
  numWrapped: ToField<'u64'>
  numNative: ToField<'u64'>
  coinTypes: ToField<Table<ToPhantom<CoinTypeKey>, ToPhantom<String>>>
}

export type TokenRegistryReified = Reified<TokenRegistry, TokenRegistryFields>

export type TokenRegistryJSONField = {
  id: string
  numWrapped: string
  numNative: string
  coinTypes: ToJSON<Table<ToPhantom<CoinTypeKey>, ToPhantom<String>>>
}

export type TokenRegistryJSON = {
  $typeName: typeof TokenRegistry.$typeName
  $typeArgs: []
} & TokenRegistryJSONField

/**
 * This container is used to store native and wrapped assets of coin type
 * as dynamic fields under its `UID`. It also uses a mechanism to generate
 * arbitrary token addresses for native assets.
 */
export class TokenRegistry implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::token_registry::TokenRegistry` {
    return `${
      getTypeOrigin('token-bridge', 'token_registry::TokenRegistry')
    }::token_registry::TokenRegistry` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof TokenRegistry.$typeName = TokenRegistry.$typeName
  readonly $fullTypeName: `${string}::token_registry::TokenRegistry`
  readonly $typeArgs: []
  readonly $isPhantom: typeof TokenRegistry.$isPhantom = TokenRegistry.$isPhantom

  readonly id: ToField<UID>
  readonly numWrapped: ToField<'u64'>
  readonly numNative: ToField<'u64'>
  readonly coinTypes: ToField<Table<ToPhantom<CoinTypeKey>, ToPhantom<String>>>

  private constructor(typeArgs: [], fields: TokenRegistryFields) {
    this.$fullTypeName = composeSuiType(
      TokenRegistry.$typeName,
      ...typeArgs,
    ) as `${string}::token_registry::TokenRegistry`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.numWrapped = fields.numWrapped
    this.numNative = fields.numNative
    this.coinTypes = fields.coinTypes
  }

  static reified(): TokenRegistryReified {
    const reifiedBcs = TokenRegistry.bcs
    return {
      get typeName() {
        return TokenRegistry.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          TokenRegistry.$typeName,
          ...[],
        ) as `${string}::token_registry::TokenRegistry`
      },
      typeArgs: [] as [],
      isPhantom: TokenRegistry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TokenRegistry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TokenRegistry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TokenRegistry.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TokenRegistry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TokenRegistry.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        TokenRegistry.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => TokenRegistry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TokenRegistry.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => TokenRegistry.fetch(client, id),
      new: (fields: TokenRegistryFields) => {
        return new TokenRegistry([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): TokenRegistryReified {
    return TokenRegistry.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TokenRegistry>> {
    return phantom(TokenRegistry.reified())
  }

  static get p(): PhantomReified<ToTypeStr<TokenRegistry>> {
    return TokenRegistry.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TokenRegistry', {
      id: UID.bcs,
      num_wrapped: bcs.u64(),
      num_native: bcs.u64(),
      coin_types: Table.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof TokenRegistry.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof TokenRegistry.instantiateBcs> {
    if (!TokenRegistry.cachedBcs) {
      TokenRegistry.cachedBcs = TokenRegistry.instantiateBcs()
    }
    return TokenRegistry.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TokenRegistry {
    return TokenRegistry.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      numWrapped: decodeFromFields('u64', fields.num_wrapped),
      numNative: decodeFromFields('u64', fields.num_native),
      coinTypes: decodeFromFields(
        Table.reified(phantom(CoinTypeKey.reified()), phantom(String.reified())),
        fields.coin_types,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TokenRegistry {
    if (!isTokenRegistry(item.type)) {
      throw new Error('not a TokenRegistry type')
    }

    return TokenRegistry.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      numWrapped: decodeFromFieldsWithTypes('u64', item.fields.num_wrapped),
      numNative: decodeFromFieldsWithTypes('u64', item.fields.num_native),
      coinTypes: decodeFromFieldsWithTypes(
        Table.reified(phantom(CoinTypeKey.reified()), phantom(String.reified())),
        item.fields.coin_types,
      ),
    })
  }

  static fromBcs(data: Uint8Array): TokenRegistry {
    return TokenRegistry.fromFields(TokenRegistry.bcs.parse(data))
  }

  toJSONField(): TokenRegistryJSONField {
    return {
      id: this.id,
      numWrapped: this.numWrapped.toString(),
      numNative: this.numNative.toString(),
      coinTypes: this.coinTypes.toJSONField(),
    }
  }

  toJSON(): TokenRegistryJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TokenRegistry {
    return TokenRegistry.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      numWrapped: decodeFromJSONField('u64', field.numWrapped),
      numNative: decodeFromJSONField('u64', field.numNative),
      coinTypes: decodeFromJSONField(
        Table.reified(phantom(CoinTypeKey.reified()), phantom(String.reified())),
        field.coinTypes,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): TokenRegistry {
    if (json.$typeName !== TokenRegistry.$typeName) {
      throw new Error(
        `not a TokenRegistry json object: expected '${TokenRegistry.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return TokenRegistry.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): TokenRegistry {
    if (!isTokenRegistry(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a TokenRegistry object`)
    }
    return TokenRegistry.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TokenRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): TokenRegistry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTokenRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TokenRegistry object`)
    }
    return TokenRegistry.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link TokenRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): TokenRegistry {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTokenRegistry(data.bcs.type)) {
        throw new Error(`object at is not a TokenRegistry object`)
      }

      return TokenRegistry.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TokenRegistry.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<TokenRegistry> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isTokenRegistry(object.type)) {
      throw new Error(`object at id ${id} is not a TokenRegistry object`)
    }
    return TokenRegistry.fromBcs(object.content)
  }
}

/* ============================== VerifiedAsset =============================== */

export function isVerifiedAsset(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('token-bridge', 'token_registry::VerifiedAsset')
    }::token_registry::VerifiedAsset` + '<',
  )
}

export interface VerifiedAssetFields<CoinType extends PhantomTypeArgument> {
  isWrapped: ToField<'bool'>
  chain: ToField<'u16'>
  addr: ToField<ExternalAddress>
  coinDecimals: ToField<'u8'>
}

export type VerifiedAssetReified<CoinType extends PhantomTypeArgument> = Reified<
  VerifiedAsset<CoinType>,
  VerifiedAssetFields<CoinType>
>

export type VerifiedAssetJSONField<CoinType extends PhantomTypeArgument> = {
  isWrapped: boolean
  chain: number
  addr: ToJSON<ExternalAddress>
  coinDecimals: number
}

export type VerifiedAssetJSON<CoinType extends PhantomTypeArgument> = {
  $typeName: typeof VerifiedAsset.$typeName
  $typeArgs: [PhantomToTypeStr<CoinType>]
} & VerifiedAssetJSONField<CoinType>

/**
 * Container to provide convenient checking of whether an asset is wrapped
 * or native. `VerifiedAsset` can only be created either by passing in a
 * resource with `CoinType` or by verifying input token info against the
 * canonical info that exists in `TokenRegistry`.
 *
 * NOTE: This container can be dropped after it was created.
 */
export class VerifiedAsset<CoinType extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::token_registry::VerifiedAsset` {
    return `${
      getTypeOrigin('token-bridge', 'token_registry::VerifiedAsset')
    }::token_registry::VerifiedAsset` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof VerifiedAsset.$typeName = VerifiedAsset.$typeName
  readonly $fullTypeName: `${string}::token_registry::VerifiedAsset<${PhantomToTypeStr<CoinType>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinType>]
  readonly $isPhantom: typeof VerifiedAsset.$isPhantom = VerifiedAsset.$isPhantom

  readonly isWrapped: ToField<'bool'>
  readonly chain: ToField<'u16'>
  readonly addr: ToField<ExternalAddress>
  readonly coinDecimals: ToField<'u8'>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinType>],
    fields: VerifiedAssetFields<CoinType>,
  ) {
    this.$fullTypeName = composeSuiType(
      VerifiedAsset.$typeName,
      ...typeArgs,
    ) as `${string}::token_registry::VerifiedAsset<${PhantomToTypeStr<CoinType>}>`
    this.$typeArgs = typeArgs

    this.isWrapped = fields.isWrapped
    this.chain = fields.chain
    this.addr = fields.addr
    this.coinDecimals = fields.coinDecimals
  }

  static reified<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): VerifiedAssetReified<ToPhantomTypeArgument<CoinType>> {
    const reifiedBcs = VerifiedAsset.bcs
    return {
      get typeName() {
        return VerifiedAsset.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          VerifiedAsset.$typeName,
          ...[extractType(CoinType)],
        ) as `${string}::token_registry::VerifiedAsset<${PhantomToTypeStr<
          ToPhantomTypeArgument<CoinType>
        >}>`
      },
      get typeArgs() {
        return [extractType(CoinType)] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>]
      },
      isPhantom: VerifiedAsset.$isPhantom,
      reifiedTypeArgs: [CoinType],
      fromFields: (fields: Record<string, any>) => VerifiedAsset.fromFields(CoinType, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        VerifiedAsset.fromFieldsWithTypes(CoinType, item),
      fromBcs: (data: Uint8Array) => VerifiedAsset.fromFields(CoinType, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => VerifiedAsset.fromJSONField(CoinType, field),
      fromJSON: (json: Record<string, any>) => VerifiedAsset.fromJSON(CoinType, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        VerifiedAsset.fromCoreObject(CoinType, obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        VerifiedAsset.fromSuiParsedData(CoinType, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        VerifiedAsset.fromSuiObjectData(CoinType, content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        VerifiedAsset.fetch(client, CoinType, id),
      new: (fields: VerifiedAssetFields<ToPhantomTypeArgument<CoinType>>) => {
        return new VerifiedAsset([extractType(CoinType)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof VerifiedAsset.reified {
    return VerifiedAsset.reified
  }

  static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): PhantomReified<ToTypeStr<VerifiedAsset<ToPhantomTypeArgument<CoinType>>>> {
    return phantom(VerifiedAsset.reified(CoinType))
  }

  static get p(): typeof VerifiedAsset.phantom {
    return VerifiedAsset.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('VerifiedAsset', {
      is_wrapped: bcs.bool(),
      chain: bcs.u16(),
      addr: ExternalAddress.bcs,
      coin_decimals: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof VerifiedAsset.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof VerifiedAsset.instantiateBcs> {
    if (!VerifiedAsset.cachedBcs) {
      VerifiedAsset.cachedBcs = VerifiedAsset.instantiateBcs()
    }
    return VerifiedAsset.cachedBcs
  }

  static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    fields: Record<string, any>,
  ): VerifiedAsset<ToPhantomTypeArgument<CoinType>> {
    return VerifiedAsset.reified(typeArg).new({
      isWrapped: decodeFromFields('bool', fields.is_wrapped),
      chain: decodeFromFields('u16', fields.chain),
      addr: decodeFromFields(ExternalAddress.reified(), fields.addr),
      coinDecimals: decodeFromFields('u8', fields.coin_decimals),
    })
  }

  static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    item: FieldsWithTypes,
  ): VerifiedAsset<ToPhantomTypeArgument<CoinType>> {
    if (!isVerifiedAsset(item.type)) {
      throw new Error('not a VerifiedAsset type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return VerifiedAsset.reified(typeArg).new({
      isWrapped: decodeFromFieldsWithTypes('bool', item.fields.is_wrapped),
      chain: decodeFromFieldsWithTypes('u16', item.fields.chain),
      addr: decodeFromFieldsWithTypes(ExternalAddress.reified(), item.fields.addr),
      coinDecimals: decodeFromFieldsWithTypes('u8', item.fields.coin_decimals),
    })
  }

  static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: Uint8Array,
  ): VerifiedAsset<ToPhantomTypeArgument<CoinType>> {
    return VerifiedAsset.fromFields(typeArg, VerifiedAsset.bcs.parse(data))
  }

  toJSONField(): VerifiedAssetJSONField<CoinType> {
    return {
      isWrapped: this.isWrapped,
      chain: this.chain,
      addr: this.addr.toJSONField(),
      coinDecimals: this.coinDecimals,
    }
  }

  toJSON(): VerifiedAssetJSON<CoinType> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    field: any,
  ): VerifiedAsset<ToPhantomTypeArgument<CoinType>> {
    return VerifiedAsset.reified(typeArg).new({
      isWrapped: decodeFromJSONField('bool', field.isWrapped),
      chain: decodeFromJSONField('u16', field.chain),
      addr: decodeFromJSONField(ExternalAddress.reified(), field.addr),
      coinDecimals: decodeFromJSONField('u8', field.coinDecimals),
    })
  }

  static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    json: Record<string, any>,
  ): VerifiedAsset<ToPhantomTypeArgument<CoinType>> {
    if (json.$typeName !== VerifiedAsset.$typeName) {
      throw new Error(
        `not a VerifiedAsset json object: expected '${VerifiedAsset.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(VerifiedAsset.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return VerifiedAsset.fromJSONField(typeArg, json)
  }

  static fromCoreObject<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): VerifiedAsset<ToPhantomTypeArgument<CoinType>> {
    if (!isVerifiedAsset(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a VerifiedAsset object`)
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

    return VerifiedAsset.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link VerifiedAsset.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    content: SuiParsedData,
  ): VerifiedAsset<ToPhantomTypeArgument<CoinType>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isVerifiedAsset(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a VerifiedAsset object`)
    }
    return VerifiedAsset.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link VerifiedAsset.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: SuiObjectData,
  ): VerifiedAsset<ToPhantomTypeArgument<CoinType>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isVerifiedAsset(data.bcs.type)) {
        throw new Error(`object at is not a VerifiedAsset object`)
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

      return VerifiedAsset.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return VerifiedAsset.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: CoinType,
    id: string,
  ): Promise<VerifiedAsset<ToPhantomTypeArgument<CoinType>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isVerifiedAsset(object.type)) {
      throw new Error(`object at id ${id} is not a VerifiedAsset object`)
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

    return VerifiedAsset.fromBcs(typeArg, object.content)
  }
}

/* ============================== Key =============================== */

export function isKey(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('token-bridge', 'token_registry::Key')}::token_registry::Key` + '<',
  )
}

export interface KeyFields<CoinType extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type KeyReified<CoinType extends PhantomTypeArgument> = Reified<
  Key<CoinType>,
  KeyFields<CoinType>
>

export type KeyJSONField<CoinType extends PhantomTypeArgument> = {
  dummyField: boolean
}

export type KeyJSON<CoinType extends PhantomTypeArgument> = {
  $typeName: typeof Key.$typeName
  $typeArgs: [PhantomToTypeStr<CoinType>]
} & KeyJSONField<CoinType>

/** Wrapper of coin type to act as dynamic field key. */
export class Key<CoinType extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::token_registry::Key` {
    return `${getTypeOrigin('token-bridge', 'token_registry::Key')}::token_registry::Key` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof Key.$typeName = Key.$typeName
  readonly $fullTypeName: `${string}::token_registry::Key<${PhantomToTypeStr<CoinType>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinType>]
  readonly $isPhantom: typeof Key.$isPhantom = Key.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<CoinType>], fields: KeyFields<CoinType>) {
    this.$fullTypeName = composeSuiType(
      Key.$typeName,
      ...typeArgs,
    ) as `${string}::token_registry::Key<${PhantomToTypeStr<CoinType>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): KeyReified<ToPhantomTypeArgument<CoinType>> {
    const reifiedBcs = Key.bcs
    return {
      get typeName() {
        return Key.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Key.$typeName,
          ...[extractType(CoinType)],
        ) as `${string}::token_registry::Key<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}>`
      },
      get typeArgs() {
        return [extractType(CoinType)] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>]
      },
      isPhantom: Key.$isPhantom,
      reifiedTypeArgs: [CoinType],
      fromFields: (fields: Record<string, any>) => Key.fromFields(CoinType, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Key.fromFieldsWithTypes(CoinType, item),
      fromBcs: (data: Uint8Array) => Key.fromFields(CoinType, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Key.fromJSONField(CoinType, field),
      fromJSON: (json: Record<string, any>) => Key.fromJSON(CoinType, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Key.fromCoreObject(CoinType, obj),
      fromSuiParsedData: (content: SuiParsedData) => Key.fromSuiParsedData(CoinType, content),
      fromSuiObjectData: (content: SuiObjectData) => Key.fromSuiObjectData(CoinType, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Key.fetch(client, CoinType, id),
      new: (fields: KeyFields<ToPhantomTypeArgument<CoinType>>) => {
        return new Key([extractType(CoinType)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Key.reified {
    return Key.reified
  }

  static phantom<CoinType extends PhantomReified<PhantomTypeArgument>>(
    CoinType: CoinType,
  ): PhantomReified<ToTypeStr<Key<ToPhantomTypeArgument<CoinType>>>> {
    return phantom(Key.reified(CoinType))
  }

  static get p(): typeof Key.phantom {
    return Key.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Key', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Key.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Key.instantiateBcs> {
    if (!Key.cachedBcs) {
      Key.cachedBcs = Key.instantiateBcs()
    }
    return Key.cachedBcs
  }

  static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    fields: Record<string, any>,
  ): Key<ToPhantomTypeArgument<CoinType>> {
    return Key.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    item: FieldsWithTypes,
  ): Key<ToPhantomTypeArgument<CoinType>> {
    if (!isKey(item.type)) {
      throw new Error('not a Key type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Key.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: Uint8Array,
  ): Key<ToPhantomTypeArgument<CoinType>> {
    return Key.fromFields(typeArg, Key.bcs.parse(data))
  }

  toJSONField(): KeyJSONField<CoinType> {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): KeyJSON<CoinType> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    field: any,
  ): Key<ToPhantomTypeArgument<CoinType>> {
    return Key.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    json: Record<string, any>,
  ): Key<ToPhantomTypeArgument<CoinType>> {
    if (json.$typeName !== Key.$typeName) {
      throw new Error(
        `not a Key json object: expected '${Key.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Key.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return Key.fromJSONField(typeArg, json)
  }

  static fromCoreObject<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Key<ToPhantomTypeArgument<CoinType>> {
    if (!isKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Key object`)
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

    return Key.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Key.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    content: SuiParsedData,
  ): Key<ToPhantomTypeArgument<CoinType>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Key object`)
    }
    return Key.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Key.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>>(
    typeArg: CoinType,
    data: SuiObjectData,
  ): Key<ToPhantomTypeArgument<CoinType>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isKey(data.bcs.type)) {
        throw new Error(`object at is not a Key object`)
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

      return Key.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Key.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: CoinType,
    id: string,
  ): Promise<Key<ToPhantomTypeArgument<CoinType>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isKey(object.type)) {
      throw new Error(`object at id ${id} is not a Key object`)
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

    return Key.fromBcs(typeArg, object.content)
  }
}

/* ============================== CoinTypeKey =============================== */

export function isCoinTypeKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('token-bridge', 'token_registry::CoinTypeKey')
    }::token_registry::CoinTypeKey`
}

export interface CoinTypeKeyFields {
  chain: ToField<'u16'>
  addr: ToField<Vector<'u8'>>
}

export type CoinTypeKeyReified = Reified<CoinTypeKey, CoinTypeKeyFields>

export type CoinTypeKeyJSONField = {
  chain: number
  addr: number[]
}

export type CoinTypeKeyJSON = {
  $typeName: typeof CoinTypeKey.$typeName
  $typeArgs: []
} & CoinTypeKeyJSONField

/**
 * This struct is not used for anything within the contract. It exists
 * purely for someone with an RPC query to be able to fetch the type name
 * of coin type as a string via `TokenRegistry`.
 */
export class CoinTypeKey implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::token_registry::CoinTypeKey` {
    return `${
      getTypeOrigin('token-bridge', 'token_registry::CoinTypeKey')
    }::token_registry::CoinTypeKey` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CoinTypeKey.$typeName = CoinTypeKey.$typeName
  readonly $fullTypeName: `${string}::token_registry::CoinTypeKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CoinTypeKey.$isPhantom = CoinTypeKey.$isPhantom

  readonly chain: ToField<'u16'>
  readonly addr: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: CoinTypeKeyFields) {
    this.$fullTypeName = composeSuiType(
      CoinTypeKey.$typeName,
      ...typeArgs,
    ) as `${string}::token_registry::CoinTypeKey`
    this.$typeArgs = typeArgs

    this.chain = fields.chain
    this.addr = fields.addr
  }

  static reified(): CoinTypeKeyReified {
    const reifiedBcs = CoinTypeKey.bcs
    return {
      get typeName() {
        return CoinTypeKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CoinTypeKey.$typeName,
          ...[],
        ) as `${string}::token_registry::CoinTypeKey`
      },
      typeArgs: [] as [],
      isPhantom: CoinTypeKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CoinTypeKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CoinTypeKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CoinTypeKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CoinTypeKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CoinTypeKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CoinTypeKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => CoinTypeKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CoinTypeKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => CoinTypeKey.fetch(client, id),
      new: (fields: CoinTypeKeyFields) => {
        return new CoinTypeKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CoinTypeKeyReified {
    return CoinTypeKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CoinTypeKey>> {
    return phantom(CoinTypeKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CoinTypeKey>> {
    return CoinTypeKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CoinTypeKey', {
      chain: bcs.u16(),
      addr: bcs.vector(bcs.u8()),
    })
  }

  private static cachedBcs: ReturnType<typeof CoinTypeKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CoinTypeKey.instantiateBcs> {
    if (!CoinTypeKey.cachedBcs) {
      CoinTypeKey.cachedBcs = CoinTypeKey.instantiateBcs()
    }
    return CoinTypeKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CoinTypeKey {
    return CoinTypeKey.reified().new({
      chain: decodeFromFields('u16', fields.chain),
      addr: decodeFromFields(vector('u8'), fields.addr),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CoinTypeKey {
    if (!isCoinTypeKey(item.type)) {
      throw new Error('not a CoinTypeKey type')
    }

    return CoinTypeKey.reified().new({
      chain: decodeFromFieldsWithTypes('u16', item.fields.chain),
      addr: decodeFromFieldsWithTypes(vector('u8'), item.fields.addr),
    })
  }

  static fromBcs(data: Uint8Array): CoinTypeKey {
    return CoinTypeKey.fromFields(CoinTypeKey.bcs.parse(data))
  }

  toJSONField(): CoinTypeKeyJSONField {
    return {
      chain: this.chain,
      addr: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.addr),
    }
  }

  toJSON(): CoinTypeKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CoinTypeKey {
    return CoinTypeKey.reified().new({
      chain: decodeFromJSONField('u16', field.chain),
      addr: decodeFromJSONField(vector('u8'), field.addr),
    })
  }

  static fromJSON(json: Record<string, any>): CoinTypeKey {
    if (json.$typeName !== CoinTypeKey.$typeName) {
      throw new Error(
        `not a CoinTypeKey json object: expected '${CoinTypeKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CoinTypeKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CoinTypeKey {
    if (!isCoinTypeKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CoinTypeKey object`)
    }
    return CoinTypeKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CoinTypeKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CoinTypeKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCoinTypeKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CoinTypeKey object`)
    }
    return CoinTypeKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CoinTypeKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CoinTypeKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCoinTypeKey(data.bcs.type)) {
        throw new Error(`object at is not a CoinTypeKey object`)
      }

      return CoinTypeKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CoinTypeKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CoinTypeKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCoinTypeKey(object.type)) {
      throw new Error(`object at id ${id} is not a CoinTypeKey object`)
    }
    return CoinTypeKey.fromBcs(object.content)
  }
}
