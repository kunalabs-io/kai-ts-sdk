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
  fetchObjectBcs,
  FieldsWithTypes,
  parseTypeName,
  SupportedSuiClient,
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

export class TokenRegistry implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::token_registry::TokenRegistry` = `${
    getTypeOrigin('token-bridge', 'token_registry::TokenRegistry')
  }::token_registry::TokenRegistry` as const
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
      typeName: TokenRegistry.$typeName,
      fullTypeName: composeSuiType(
        TokenRegistry.$typeName,
        ...[],
      ) as `${string}::token_registry::TokenRegistry`,
      typeArgs: [] as [],
      isPhantom: TokenRegistry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TokenRegistry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => TokenRegistry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TokenRegistry.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TokenRegistry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TokenRegistry.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => TokenRegistry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => TokenRegistry.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => TokenRegistry.fetch(client, id),
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

  static fromSuiParsedData(content: SuiParsedData): TokenRegistry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTokenRegistry(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a TokenRegistry object`)
    }
    return TokenRegistry.fromFieldsWithTypes(content)
  }

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

  static async fetch(client: SupportedSuiClient, id: string): Promise<TokenRegistry> {
    const res = await fetchObjectBcs(client, id)
    if (!isTokenRegistry(res.type)) {
      throw new Error(`object at id ${id} is not a TokenRegistry object`)
    }

    return TokenRegistry.fromBcs(res.bcsBytes)
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

export interface VerifiedAssetFields<T0 extends PhantomTypeArgument> {
  isWrapped: ToField<'bool'>
  chain: ToField<'u16'>
  addr: ToField<ExternalAddress>
  coinDecimals: ToField<'u8'>
}

export type VerifiedAssetReified<T0 extends PhantomTypeArgument> = Reified<
  VerifiedAsset<T0>,
  VerifiedAssetFields<T0>
>

export type VerifiedAssetJSONField<T0 extends PhantomTypeArgument> = {
  isWrapped: boolean
  chain: number
  addr: ToJSON<ExternalAddress>
  coinDecimals: number
}

export type VerifiedAssetJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof VerifiedAsset.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & VerifiedAssetJSONField<T0>

export class VerifiedAsset<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::token_registry::VerifiedAsset` = `${
    getTypeOrigin('token-bridge', 'token_registry::VerifiedAsset')
  }::token_registry::VerifiedAsset` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof VerifiedAsset.$typeName = VerifiedAsset.$typeName
  readonly $fullTypeName: `${string}::token_registry::VerifiedAsset<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof VerifiedAsset.$isPhantom = VerifiedAsset.$isPhantom

  readonly isWrapped: ToField<'bool'>
  readonly chain: ToField<'u16'>
  readonly addr: ToField<ExternalAddress>
  readonly coinDecimals: ToField<'u8'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: VerifiedAssetFields<T0>) {
    this.$fullTypeName = composeSuiType(
      VerifiedAsset.$typeName,
      ...typeArgs,
    ) as `${string}::token_registry::VerifiedAsset<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.isWrapped = fields.isWrapped
    this.chain = fields.chain
    this.addr = fields.addr
    this.coinDecimals = fields.coinDecimals
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): VerifiedAssetReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = VerifiedAsset.bcs
    return {
      typeName: VerifiedAsset.$typeName,
      fullTypeName: composeSuiType(
        VerifiedAsset.$typeName,
        ...[extractType(T0)],
      ) as `${string}::token_registry::VerifiedAsset<${PhantomToTypeStr<
        ToPhantomTypeArgument<T0>
      >}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: VerifiedAsset.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => VerifiedAsset.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => VerifiedAsset.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => VerifiedAsset.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => VerifiedAsset.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => VerifiedAsset.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => VerifiedAsset.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => VerifiedAsset.fromSuiObjectData(T0, content),
      fetch: async (client: SupportedSuiClient, id: string) => VerifiedAsset.fetch(client, T0, id),
      new: (fields: VerifiedAssetFields<ToPhantomTypeArgument<T0>>) => {
        return new VerifiedAsset([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof VerifiedAsset.reified {
    return VerifiedAsset.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<VerifiedAsset<ToPhantomTypeArgument<T0>>>> {
    return phantom(VerifiedAsset.reified(T0))
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

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
  ): VerifiedAsset<ToPhantomTypeArgument<T0>> {
    return VerifiedAsset.reified(typeArg).new({
      isWrapped: decodeFromFields('bool', fields.is_wrapped),
      chain: decodeFromFields('u16', fields.chain),
      addr: decodeFromFields(ExternalAddress.reified(), fields.addr),
      coinDecimals: decodeFromFields('u8', fields.coin_decimals),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes,
  ): VerifiedAsset<ToPhantomTypeArgument<T0>> {
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

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array,
  ): VerifiedAsset<ToPhantomTypeArgument<T0>> {
    return VerifiedAsset.fromFields(typeArg, VerifiedAsset.bcs.parse(data))
  }

  toJSONField(): VerifiedAssetJSONField<T0> {
    return {
      isWrapped: this.isWrapped,
      chain: this.chain,
      addr: this.addr.toJSONField(),
      coinDecimals: this.coinDecimals,
    }
  }

  toJSON(): VerifiedAssetJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
  ): VerifiedAsset<ToPhantomTypeArgument<T0>> {
    return VerifiedAsset.reified(typeArg).new({
      isWrapped: decodeFromJSONField('bool', field.isWrapped),
      chain: decodeFromJSONField('u16', field.chain),
      addr: decodeFromJSONField(ExternalAddress.reified(), field.addr),
      coinDecimals: decodeFromJSONField('u8', field.coinDecimals),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>,
  ): VerifiedAsset<ToPhantomTypeArgument<T0>> {
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

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
  ): VerifiedAsset<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isVerifiedAsset(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a VerifiedAsset object`)
    }
    return VerifiedAsset.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData,
  ): VerifiedAsset<ToPhantomTypeArgument<T0>> {
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

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<VerifiedAsset<ToPhantomTypeArgument<T0>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isVerifiedAsset(res.type)) {
      throw new Error(`object at id ${id} is not a VerifiedAsset object`)
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

    return VerifiedAsset.fromBcs(typeArg, res.bcsBytes)
  }
}

/* ============================== Key =============================== */

export function isKey(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('token-bridge', 'token_registry::Key')}::token_registry::Key` + '<',
  )
}

export interface KeyFields<T0 extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type KeyReified<T0 extends PhantomTypeArgument> = Reified<Key<T0>, KeyFields<T0>>

export type KeyJSONField<T0 extends PhantomTypeArgument> = {
  dummyField: boolean
}

export type KeyJSON<T0 extends PhantomTypeArgument> = {
  $typeName: typeof Key.$typeName
  $typeArgs: [PhantomToTypeStr<T0>]
} & KeyJSONField<T0>

export class Key<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::token_registry::Key` = `${
    getTypeOrigin('token-bridge', 'token_registry::Key')
  }::token_registry::Key` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof Key.$typeName = Key.$typeName
  readonly $fullTypeName: `${string}::token_registry::Key<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom: typeof Key.$isPhantom = Key.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: KeyFields<T0>) {
    this.$fullTypeName = composeSuiType(
      Key.$typeName,
      ...typeArgs,
    ) as `${string}::token_registry::Key<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): KeyReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = Key.bcs
    return {
      typeName: Key.$typeName,
      fullTypeName: composeSuiType(
        Key.$typeName,
        ...[extractType(T0)],
      ) as `${string}::token_registry::Key<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: Key.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Key.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Key.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Key.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Key.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => Key.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => Key.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => Key.fromSuiObjectData(T0, content),
      fetch: async (client: SupportedSuiClient, id: string) => Key.fetch(client, T0, id),
      new: (fields: KeyFields<ToPhantomTypeArgument<T0>>) => {
        return new Key([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Key.reified {
    return Key.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0,
  ): PhantomReified<ToTypeStr<Key<ToPhantomTypeArgument<T0>>>> {
    return phantom(Key.reified(T0))
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

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>,
  ): Key<ToPhantomTypeArgument<T0>> {
    return Key.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes,
  ): Key<ToPhantomTypeArgument<T0>> {
    if (!isKey(item.type)) {
      throw new Error('not a Key type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Key.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array,
  ): Key<ToPhantomTypeArgument<T0>> {
    return Key.fromFields(typeArg, Key.bcs.parse(data))
  }

  toJSONField(): KeyJSONField<T0> {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): KeyJSON<T0> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any,
  ): Key<ToPhantomTypeArgument<T0>> {
    return Key.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>,
  ): Key<ToPhantomTypeArgument<T0>> {
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

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData,
  ): Key<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Key object`)
    }
    return Key.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData,
  ): Key<ToPhantomTypeArgument<T0>> {
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

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T0,
    id: string,
  ): Promise<Key<ToPhantomTypeArgument<T0>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isKey(res.type)) {
      throw new Error(`object at id ${id} is not a Key object`)
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

    return Key.fromBcs(typeArg, res.bcsBytes)
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

export class CoinTypeKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::token_registry::CoinTypeKey` = `${
    getTypeOrigin('token-bridge', 'token_registry::CoinTypeKey')
  }::token_registry::CoinTypeKey` as const
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
      typeName: CoinTypeKey.$typeName,
      fullTypeName: composeSuiType(
        CoinTypeKey.$typeName,
        ...[],
      ) as `${string}::token_registry::CoinTypeKey`,
      typeArgs: [] as [],
      isPhantom: CoinTypeKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CoinTypeKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CoinTypeKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CoinTypeKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CoinTypeKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CoinTypeKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => CoinTypeKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CoinTypeKey.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => CoinTypeKey.fetch(client, id),
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

  static fromSuiParsedData(content: SuiParsedData): CoinTypeKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCoinTypeKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CoinTypeKey object`)
    }
    return CoinTypeKey.fromFieldsWithTypes(content)
  }

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

  static async fetch(client: SupportedSuiClient, id: string): Promise<CoinTypeKey> {
    const res = await fetchObjectBcs(client, id)
    if (!isCoinTypeKey(res.type)) {
      throw new Error(`object at id ${id} is not a CoinTypeKey object`)
    }

    return CoinTypeKey.fromBcs(res.bcsBytes)
  }
}
