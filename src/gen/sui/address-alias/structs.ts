import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { UID } from '../object/structs'
import { VecSet } from '../vec-set/structs'

/* ============================== AddressAliasState =============================== */

export function isAddressAliasState(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::address_alias::AddressAliasState`
}

export interface AddressAliasStateFields {
  id: ToField<UID>
  version: ToField<'u64'>
}

export type AddressAliasStateReified = Reified<AddressAliasState, AddressAliasStateFields>

export type AddressAliasStateJSONField = {
  id: string
  version: string
}

export type AddressAliasStateJSON = {
  $typeName: typeof AddressAliasState.$typeName
  $typeArgs: []
} & AddressAliasStateJSONField

/**
 * Singleton shared object which manages creation of AddressAliases state.
 * The actual alias configs are created as derived objects with this object
 * as the parent.
 */
export class AddressAliasState implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::address_alias::AddressAliasState` =
    `0x2::address_alias::AddressAliasState` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddressAliasState.$typeName = AddressAliasState.$typeName
  readonly $fullTypeName: `0x2::address_alias::AddressAliasState`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddressAliasState.$isPhantom = AddressAliasState.$isPhantom

  readonly id: ToField<UID>
  readonly version: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddressAliasStateFields) {
    this.$fullTypeName = composeSuiType(
      AddressAliasState.$typeName,
      ...typeArgs,
    ) as `0x2::address_alias::AddressAliasState`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.version = fields.version
  }

  static reified(): AddressAliasStateReified {
    const reifiedBcs = AddressAliasState.bcs
    return {
      typeName: AddressAliasState.$typeName,
      fullTypeName: composeSuiType(
        AddressAliasState.$typeName,
        ...[],
      ) as `0x2::address_alias::AddressAliasState`,
      typeArgs: [] as [],
      isPhantom: AddressAliasState.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddressAliasState.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddressAliasState.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddressAliasState.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddressAliasState.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddressAliasState.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddressAliasState.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddressAliasState.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AddressAliasState.fetch(client, id),
      new: (fields: AddressAliasStateFields) => {
        return new AddressAliasState([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddressAliasStateReified {
    return AddressAliasState.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddressAliasState>> {
    return phantom(AddressAliasState.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddressAliasState>> {
    return AddressAliasState.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddressAliasState', {
      id: UID.bcs,
      version: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddressAliasState.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddressAliasState.instantiateBcs> {
    if (!AddressAliasState.cachedBcs) {
      AddressAliasState.cachedBcs = AddressAliasState.instantiateBcs()
    }
    return AddressAliasState.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddressAliasState {
    return AddressAliasState.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      version: decodeFromFields('u64', fields.version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddressAliasState {
    if (!isAddressAliasState(item.type)) {
      throw new Error('not a AddressAliasState type')
    }

    return AddressAliasState.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
    })
  }

  static fromBcs(data: Uint8Array): AddressAliasState {
    return AddressAliasState.fromFields(AddressAliasState.bcs.parse(data))
  }

  toJSONField(): AddressAliasStateJSONField {
    return {
      id: this.id,
      version: this.version.toString(),
    }
  }

  toJSON(): AddressAliasStateJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddressAliasState {
    return AddressAliasState.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      version: decodeFromJSONField('u64', field.version),
    })
  }

  static fromJSON(json: Record<string, any>): AddressAliasState {
    if (json.$typeName !== AddressAliasState.$typeName) {
      throw new Error(
        `not a AddressAliasState json object: expected '${AddressAliasState.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddressAliasState.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddressAliasState {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddressAliasState(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddressAliasState object`)
    }
    return AddressAliasState.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddressAliasState {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddressAliasState(data.bcs.type)) {
        throw new Error(`object at is not a AddressAliasState object`)
      }

      return AddressAliasState.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddressAliasState.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AddressAliasState> {
    const res = await fetchObjectBcs(client, id)
    if (!isAddressAliasState(res.type)) {
      throw new Error(`object at id ${id} is not a AddressAliasState object`)
    }

    return AddressAliasState.fromBcs(res.bcsBytes)
  }
}

/* ============================== AddressAliases =============================== */

export function isAddressAliases(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::address_alias::AddressAliases`
}

export interface AddressAliasesFields {
  id: ToField<UID>
  aliases: ToField<VecSet<'address'>>
}

export type AddressAliasesReified = Reified<AddressAliases, AddressAliasesFields>

export type AddressAliasesJSONField = {
  id: string
  aliases: ToJSON<VecSet<'address'>>
}

export type AddressAliasesJSON = {
  $typeName: typeof AddressAliases.$typeName
  $typeArgs: []
} & AddressAliasesJSONField

/**
 * Tracks the set of addresses allowed to act as a given sender.
 *
 * An alias allows transactions signed by the alias address to act as the
 * original address. For example, if address X sets an alias of address Y, then
 * then a transaction signed by Y can set its sender address to X.
 */
export class AddressAliases implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::address_alias::AddressAliases` =
    `0x2::address_alias::AddressAliases` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddressAliases.$typeName = AddressAliases.$typeName
  readonly $fullTypeName: `0x2::address_alias::AddressAliases`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddressAliases.$isPhantom = AddressAliases.$isPhantom

  readonly id: ToField<UID>
  readonly aliases: ToField<VecSet<'address'>>

  private constructor(typeArgs: [], fields: AddressAliasesFields) {
    this.$fullTypeName = composeSuiType(
      AddressAliases.$typeName,
      ...typeArgs,
    ) as `0x2::address_alias::AddressAliases`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.aliases = fields.aliases
  }

  static reified(): AddressAliasesReified {
    const reifiedBcs = AddressAliases.bcs
    return {
      typeName: AddressAliases.$typeName,
      fullTypeName: composeSuiType(
        AddressAliases.$typeName,
        ...[],
      ) as `0x2::address_alias::AddressAliases`,
      typeArgs: [] as [],
      isPhantom: AddressAliases.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddressAliases.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddressAliases.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddressAliases.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddressAliases.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddressAliases.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddressAliases.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddressAliases.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AddressAliases.fetch(client, id),
      new: (fields: AddressAliasesFields) => {
        return new AddressAliases([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddressAliasesReified {
    return AddressAliases.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddressAliases>> {
    return phantom(AddressAliases.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddressAliases>> {
    return AddressAliases.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddressAliases', {
      id: UID.bcs,
      aliases: VecSet.bcs(
        bcs.bytes(32).transform({
          input: (val: string) => fromHex(val),
          output: (val: Uint8Array) => toHex(val),
        }),
      ),
    })
  }

  private static cachedBcs: ReturnType<typeof AddressAliases.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddressAliases.instantiateBcs> {
    if (!AddressAliases.cachedBcs) {
      AddressAliases.cachedBcs = AddressAliases.instantiateBcs()
    }
    return AddressAliases.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddressAliases {
    return AddressAliases.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      aliases: decodeFromFields(VecSet.reified('address'), fields.aliases),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddressAliases {
    if (!isAddressAliases(item.type)) {
      throw new Error('not a AddressAliases type')
    }

    return AddressAliases.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      aliases: decodeFromFieldsWithTypes(VecSet.reified('address'), item.fields.aliases),
    })
  }

  static fromBcs(data: Uint8Array): AddressAliases {
    return AddressAliases.fromFields(AddressAliases.bcs.parse(data))
  }

  toJSONField(): AddressAliasesJSONField {
    return {
      id: this.id,
      aliases: this.aliases.toJSONField(),
    }
  }

  toJSON(): AddressAliasesJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddressAliases {
    return AddressAliases.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      aliases: decodeFromJSONField(VecSet.reified('address'), field.aliases),
    })
  }

  static fromJSON(json: Record<string, any>): AddressAliases {
    if (json.$typeName !== AddressAliases.$typeName) {
      throw new Error(
        `not a AddressAliases json object: expected '${AddressAliases.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddressAliases.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddressAliases {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddressAliases(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddressAliases object`)
    }
    return AddressAliases.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddressAliases {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddressAliases(data.bcs.type)) {
        throw new Error(`object at is not a AddressAliases object`)
      }

      return AddressAliases.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddressAliases.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AddressAliases> {
    const res = await fetchObjectBcs(client, id)
    if (!isAddressAliases(res.type)) {
      throw new Error(`object at id ${id} is not a AddressAliases object`)
    }

    return AddressAliases.fromBcs(res.bcsBytes)
  }
}

/* ============================== AliasKey =============================== */

export function isAliasKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::address_alias::AliasKey`
}

export interface AliasKeyFields {
  pos0: ToField<'address'>
}

export type AliasKeyReified = Reified<AliasKey, AliasKeyFields>

export type AliasKeyJSONField = {
  pos0: string
}

export type AliasKeyJSON = {
  $typeName: typeof AliasKey.$typeName
  $typeArgs: []
} & AliasKeyJSONField

/** Internal key used for derivation of AddressAliases object addresses. */
export class AliasKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::address_alias::AliasKey` =
    `0x2::address_alias::AliasKey` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AliasKey.$typeName = AliasKey.$typeName
  readonly $fullTypeName: `0x2::address_alias::AliasKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AliasKey.$isPhantom = AliasKey.$isPhantom

  readonly pos0: ToField<'address'>

  private constructor(typeArgs: [], fields: AliasKeyFields) {
    this.$fullTypeName = composeSuiType(
      AliasKey.$typeName,
      ...typeArgs,
    ) as `0x2::address_alias::AliasKey`
    this.$typeArgs = typeArgs

    this.pos0 = fields.pos0
  }

  static reified(): AliasKeyReified {
    const reifiedBcs = AliasKey.bcs
    return {
      typeName: AliasKey.$typeName,
      fullTypeName: composeSuiType(
        AliasKey.$typeName,
        ...[],
      ) as `0x2::address_alias::AliasKey`,
      typeArgs: [] as [],
      isPhantom: AliasKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AliasKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AliasKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AliasKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AliasKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AliasKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AliasKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AliasKey.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AliasKey.fetch(client, id),
      new: (fields: AliasKeyFields) => {
        return new AliasKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AliasKeyReified {
    return AliasKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AliasKey>> {
    return phantom(AliasKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AliasKey>> {
    return AliasKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AliasKey', {
      pos0: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof AliasKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AliasKey.instantiateBcs> {
    if (!AliasKey.cachedBcs) {
      AliasKey.cachedBcs = AliasKey.instantiateBcs()
    }
    return AliasKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AliasKey {
    return AliasKey.reified().new({
      pos0: decodeFromFields('address', fields.pos0),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AliasKey {
    if (!isAliasKey(item.type)) {
      throw new Error('not a AliasKey type')
    }

    return AliasKey.reified().new({
      pos0: decodeFromFieldsWithTypes('address', item.fields.pos0),
    })
  }

  static fromBcs(data: Uint8Array): AliasKey {
    return AliasKey.fromFields(AliasKey.bcs.parse(data))
  }

  toJSONField(): AliasKeyJSONField {
    return {
      pos0: this.pos0,
    }
  }

  toJSON(): AliasKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AliasKey {
    return AliasKey.reified().new({
      pos0: decodeFromJSONField('address', field.pos0),
    })
  }

  static fromJSON(json: Record<string, any>): AliasKey {
    if (json.$typeName !== AliasKey.$typeName) {
      throw new Error(
        `not a AliasKey json object: expected '${AliasKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AliasKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AliasKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAliasKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AliasKey object`)
    }
    return AliasKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AliasKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAliasKey(data.bcs.type)) {
        throw new Error(`object at is not a AliasKey object`)
      }

      return AliasKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AliasKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AliasKey> {
    const res = await fetchObjectBcs(client, id)
    if (!isAliasKey(res.type)) {
      throw new Error(`object at id ${id} is not a AliasKey object`)
    }

    return AliasKey.fromBcs(res.bcsBytes)
  }
}
