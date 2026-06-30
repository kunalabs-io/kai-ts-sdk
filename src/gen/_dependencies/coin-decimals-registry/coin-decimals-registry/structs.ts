import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
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
  ToTypeStr as ToPhantom,
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'
import { String } from '../../../std/ascii/structs'
import { TypeName } from '../../../std/type-name/structs'
import { UID } from '../../../sui/object/structs'
import { Table } from '../../../sui/table/structs'

/* ============================== COIN_DECIMALS_REGISTRY =============================== */

export function isCOIN_DECIMALS_REGISTRY(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('coin-decimals-registry', 'coin_decimals_registry::COIN_DECIMALS_REGISTRY')
    }::coin_decimals_registry::COIN_DECIMALS_REGISTRY`
}

export interface COIN_DECIMALS_REGISTRYFields {
  dummyField: ToField<'bool'>
}

export type COIN_DECIMALS_REGISTRYReified = Reified<
  COIN_DECIMALS_REGISTRY,
  COIN_DECIMALS_REGISTRYFields
>

export type COIN_DECIMALS_REGISTRYJSONField = {
  dummyField: boolean
}

export type COIN_DECIMALS_REGISTRYJSON = {
  $typeName: typeof COIN_DECIMALS_REGISTRY.$typeName
  $typeArgs: []
} & COIN_DECIMALS_REGISTRYJSONField

export class COIN_DECIMALS_REGISTRY implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::coin_decimals_registry::COIN_DECIMALS_REGISTRY` {
    return `${
      getTypeOrigin('coin-decimals-registry', 'coin_decimals_registry::COIN_DECIMALS_REGISTRY')
    }::coin_decimals_registry::COIN_DECIMALS_REGISTRY` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof COIN_DECIMALS_REGISTRY.$typeName = COIN_DECIMALS_REGISTRY.$typeName
  readonly $fullTypeName: `${string}::coin_decimals_registry::COIN_DECIMALS_REGISTRY`
  readonly $typeArgs: []
  readonly $isPhantom: typeof COIN_DECIMALS_REGISTRY.$isPhantom = COIN_DECIMALS_REGISTRY.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: COIN_DECIMALS_REGISTRYFields) {
    this.$fullTypeName = composeSuiType(
      COIN_DECIMALS_REGISTRY.$typeName,
      ...typeArgs,
    ) as `${string}::coin_decimals_registry::COIN_DECIMALS_REGISTRY`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): COIN_DECIMALS_REGISTRYReified {
    const reifiedBcs = COIN_DECIMALS_REGISTRY.bcs
    return {
      get typeName() {
        return COIN_DECIMALS_REGISTRY.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          COIN_DECIMALS_REGISTRY.$typeName,
          ...[],
        ) as `${string}::coin_decimals_registry::COIN_DECIMALS_REGISTRY`
      },
      typeArgs: [] as [],
      isPhantom: COIN_DECIMALS_REGISTRY.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => COIN_DECIMALS_REGISTRY.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        COIN_DECIMALS_REGISTRY.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => COIN_DECIMALS_REGISTRY.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => COIN_DECIMALS_REGISTRY.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => COIN_DECIMALS_REGISTRY.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        COIN_DECIMALS_REGISTRY.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        COIN_DECIMALS_REGISTRY.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        COIN_DECIMALS_REGISTRY.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        COIN_DECIMALS_REGISTRY.fetch(client, id),
      new: (fields: COIN_DECIMALS_REGISTRYFields) => {
        return new COIN_DECIMALS_REGISTRY([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): COIN_DECIMALS_REGISTRYReified {
    return COIN_DECIMALS_REGISTRY.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<COIN_DECIMALS_REGISTRY>> {
    return phantom(COIN_DECIMALS_REGISTRY.reified())
  }

  static get p(): PhantomReified<ToTypeStr<COIN_DECIMALS_REGISTRY>> {
    return COIN_DECIMALS_REGISTRY.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('COIN_DECIMALS_REGISTRY', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof COIN_DECIMALS_REGISTRY.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof COIN_DECIMALS_REGISTRY.instantiateBcs> {
    if (!COIN_DECIMALS_REGISTRY.cachedBcs) {
      COIN_DECIMALS_REGISTRY.cachedBcs = COIN_DECIMALS_REGISTRY.instantiateBcs()
    }
    return COIN_DECIMALS_REGISTRY.cachedBcs
  }

  static fromFields(fields: Record<string, any>): COIN_DECIMALS_REGISTRY {
    return COIN_DECIMALS_REGISTRY.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): COIN_DECIMALS_REGISTRY {
    if (!isCOIN_DECIMALS_REGISTRY(item.type)) {
      throw new Error('not a COIN_DECIMALS_REGISTRY type')
    }

    return COIN_DECIMALS_REGISTRY.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): COIN_DECIMALS_REGISTRY {
    return COIN_DECIMALS_REGISTRY.fromFields(COIN_DECIMALS_REGISTRY.bcs.parse(data))
  }

  toJSONField(): COIN_DECIMALS_REGISTRYJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): COIN_DECIMALS_REGISTRYJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): COIN_DECIMALS_REGISTRY {
    return COIN_DECIMALS_REGISTRY.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): COIN_DECIMALS_REGISTRY {
    if (json.$typeName !== COIN_DECIMALS_REGISTRY.$typeName) {
      throw new Error(
        `not a COIN_DECIMALS_REGISTRY json object: expected '${COIN_DECIMALS_REGISTRY.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return COIN_DECIMALS_REGISTRY.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): COIN_DECIMALS_REGISTRY {
    if (!isCOIN_DECIMALS_REGISTRY(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a COIN_DECIMALS_REGISTRY object`)
    }
    return COIN_DECIMALS_REGISTRY.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link COIN_DECIMALS_REGISTRY.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): COIN_DECIMALS_REGISTRY {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCOIN_DECIMALS_REGISTRY(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a COIN_DECIMALS_REGISTRY object`,
      )
    }
    return COIN_DECIMALS_REGISTRY.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link COIN_DECIMALS_REGISTRY.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): COIN_DECIMALS_REGISTRY {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCOIN_DECIMALS_REGISTRY(data.bcs.type)) {
        throw new Error(`object at is not a COIN_DECIMALS_REGISTRY object`)
      }

      return COIN_DECIMALS_REGISTRY.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return COIN_DECIMALS_REGISTRY.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<COIN_DECIMALS_REGISTRY> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCOIN_DECIMALS_REGISTRY(object.type)) {
      throw new Error(`object at id ${id} is not a COIN_DECIMALS_REGISTRY object`)
    }
    return COIN_DECIMALS_REGISTRY.fromBcs(object.content)
  }
}

/* ============================== CoinDecimalsRegistry =============================== */

export function isCoinDecimalsRegistry(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('coin-decimals-registry', 'coin_decimals_registry::CoinDecimalsRegistry')
    }::coin_decimals_registry::CoinDecimalsRegistry`
}

export interface CoinDecimalsRegistryFields {
  id: ToField<UID>
  table: ToField<Table<ToPhantom<TypeName>, 'u8'>>
}

export type CoinDecimalsRegistryReified = Reified<CoinDecimalsRegistry, CoinDecimalsRegistryFields>

export type CoinDecimalsRegistryJSONField = {
  id: string
  table: ToJSON<Table<ToPhantom<TypeName>, 'u8'>>
}

export type CoinDecimalsRegistryJSON = {
  $typeName: typeof CoinDecimalsRegistry.$typeName
  $typeArgs: []
} & CoinDecimalsRegistryJSONField

export class CoinDecimalsRegistry implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::coin_decimals_registry::CoinDecimalsRegistry` {
    return `${
      getTypeOrigin('coin-decimals-registry', 'coin_decimals_registry::CoinDecimalsRegistry')
    }::coin_decimals_registry::CoinDecimalsRegistry` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CoinDecimalsRegistry.$typeName = CoinDecimalsRegistry.$typeName
  readonly $fullTypeName: `${string}::coin_decimals_registry::CoinDecimalsRegistry`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CoinDecimalsRegistry.$isPhantom = CoinDecimalsRegistry.$isPhantom

  readonly id: ToField<UID>
  readonly table: ToField<Table<ToPhantom<TypeName>, 'u8'>>

  private constructor(typeArgs: [], fields: CoinDecimalsRegistryFields) {
    this.$fullTypeName = composeSuiType(
      CoinDecimalsRegistry.$typeName,
      ...typeArgs,
    ) as `${string}::coin_decimals_registry::CoinDecimalsRegistry`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.table = fields.table
  }

  static reified(): CoinDecimalsRegistryReified {
    const reifiedBcs = CoinDecimalsRegistry.bcs
    return {
      get typeName() {
        return CoinDecimalsRegistry.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CoinDecimalsRegistry.$typeName,
          ...[],
        ) as `${string}::coin_decimals_registry::CoinDecimalsRegistry`
      },
      typeArgs: [] as [],
      isPhantom: CoinDecimalsRegistry.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CoinDecimalsRegistry.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CoinDecimalsRegistry.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CoinDecimalsRegistry.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CoinDecimalsRegistry.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CoinDecimalsRegistry.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CoinDecimalsRegistry.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CoinDecimalsRegistry.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CoinDecimalsRegistry.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CoinDecimalsRegistry.fetch(client, id),
      new: (fields: CoinDecimalsRegistryFields) => {
        return new CoinDecimalsRegistry([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CoinDecimalsRegistryReified {
    return CoinDecimalsRegistry.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CoinDecimalsRegistry>> {
    return phantom(CoinDecimalsRegistry.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CoinDecimalsRegistry>> {
    return CoinDecimalsRegistry.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CoinDecimalsRegistry', {
      id: UID.bcs,
      table: Table.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof CoinDecimalsRegistry.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CoinDecimalsRegistry.instantiateBcs> {
    if (!CoinDecimalsRegistry.cachedBcs) {
      CoinDecimalsRegistry.cachedBcs = CoinDecimalsRegistry.instantiateBcs()
    }
    return CoinDecimalsRegistry.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CoinDecimalsRegistry {
    return CoinDecimalsRegistry.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      table: decodeFromFields(
        Table.reified(phantom(TypeName.reified()), phantom('u8')),
        fields.table,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CoinDecimalsRegistry {
    if (!isCoinDecimalsRegistry(item.type)) {
      throw new Error('not a CoinDecimalsRegistry type')
    }

    return CoinDecimalsRegistry.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      table: decodeFromFieldsWithTypes(
        Table.reified(phantom(TypeName.reified()), phantom('u8')),
        item.fields.table,
      ),
    })
  }

  static fromBcs(data: Uint8Array): CoinDecimalsRegistry {
    return CoinDecimalsRegistry.fromFields(CoinDecimalsRegistry.bcs.parse(data))
  }

  toJSONField(): CoinDecimalsRegistryJSONField {
    return {
      id: this.id,
      table: this.table.toJSONField(),
    }
  }

  toJSON(): CoinDecimalsRegistryJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CoinDecimalsRegistry {
    return CoinDecimalsRegistry.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      table: decodeFromJSONField(
        Table.reified(phantom(TypeName.reified()), phantom('u8')),
        field.table,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): CoinDecimalsRegistry {
    if (json.$typeName !== CoinDecimalsRegistry.$typeName) {
      throw new Error(
        `not a CoinDecimalsRegistry json object: expected '${CoinDecimalsRegistry.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CoinDecimalsRegistry.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CoinDecimalsRegistry {
    if (!isCoinDecimalsRegistry(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CoinDecimalsRegistry object`)
    }
    return CoinDecimalsRegistry.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CoinDecimalsRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CoinDecimalsRegistry {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCoinDecimalsRegistry(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CoinDecimalsRegistry object`,
      )
    }
    return CoinDecimalsRegistry.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CoinDecimalsRegistry.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CoinDecimalsRegistry {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCoinDecimalsRegistry(data.bcs.type)) {
        throw new Error(`object at is not a CoinDecimalsRegistry object`)
      }

      return CoinDecimalsRegistry.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CoinDecimalsRegistry.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CoinDecimalsRegistry> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCoinDecimalsRegistry(object.type)) {
      throw new Error(`object at id ${id} is not a CoinDecimalsRegistry object`)
    }
    return CoinDecimalsRegistry.fromBcs(object.content)
  }
}

/* ============================== CoinDecimalsRegistered =============================== */

export function isCoinDecimalsRegistered(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('coin-decimals-registry', 'coin_decimals_registry::CoinDecimalsRegistered')
    }::coin_decimals_registry::CoinDecimalsRegistered`
}

export interface CoinDecimalsRegisteredFields {
  registry: ToField<'address'>
  coinType: ToField<String>
  decimals: ToField<'u8'>
}

export type CoinDecimalsRegisteredReified = Reified<
  CoinDecimalsRegistered,
  CoinDecimalsRegisteredFields
>

export type CoinDecimalsRegisteredJSONField = {
  registry: string
  coinType: string
  decimals: number
}

export type CoinDecimalsRegisteredJSON = {
  $typeName: typeof CoinDecimalsRegistered.$typeName
  $typeArgs: []
} & CoinDecimalsRegisteredJSONField

export class CoinDecimalsRegistered implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::coin_decimals_registry::CoinDecimalsRegistered` {
    return `${
      getTypeOrigin('coin-decimals-registry', 'coin_decimals_registry::CoinDecimalsRegistered')
    }::coin_decimals_registry::CoinDecimalsRegistered` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CoinDecimalsRegistered.$typeName = CoinDecimalsRegistered.$typeName
  readonly $fullTypeName: `${string}::coin_decimals_registry::CoinDecimalsRegistered`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CoinDecimalsRegistered.$isPhantom = CoinDecimalsRegistered.$isPhantom

  readonly registry: ToField<'address'>
  readonly coinType: ToField<String>
  readonly decimals: ToField<'u8'>

  private constructor(typeArgs: [], fields: CoinDecimalsRegisteredFields) {
    this.$fullTypeName = composeSuiType(
      CoinDecimalsRegistered.$typeName,
      ...typeArgs,
    ) as `${string}::coin_decimals_registry::CoinDecimalsRegistered`
    this.$typeArgs = typeArgs

    this.registry = fields.registry
    this.coinType = fields.coinType
    this.decimals = fields.decimals
  }

  static reified(): CoinDecimalsRegisteredReified {
    const reifiedBcs = CoinDecimalsRegistered.bcs
    return {
      get typeName() {
        return CoinDecimalsRegistered.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CoinDecimalsRegistered.$typeName,
          ...[],
        ) as `${string}::coin_decimals_registry::CoinDecimalsRegistered`
      },
      typeArgs: [] as [],
      isPhantom: CoinDecimalsRegistered.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CoinDecimalsRegistered.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CoinDecimalsRegistered.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CoinDecimalsRegistered.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CoinDecimalsRegistered.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CoinDecimalsRegistered.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CoinDecimalsRegistered.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CoinDecimalsRegistered.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CoinDecimalsRegistered.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CoinDecimalsRegistered.fetch(client, id),
      new: (fields: CoinDecimalsRegisteredFields) => {
        return new CoinDecimalsRegistered([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CoinDecimalsRegisteredReified {
    return CoinDecimalsRegistered.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CoinDecimalsRegistered>> {
    return phantom(CoinDecimalsRegistered.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CoinDecimalsRegistered>> {
    return CoinDecimalsRegistered.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CoinDecimalsRegistered', {
      registry: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      coin_type: String.bcs,
      decimals: bcs.u8(),
    })
  }

  private static cachedBcs: ReturnType<typeof CoinDecimalsRegistered.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CoinDecimalsRegistered.instantiateBcs> {
    if (!CoinDecimalsRegistered.cachedBcs) {
      CoinDecimalsRegistered.cachedBcs = CoinDecimalsRegistered.instantiateBcs()
    }
    return CoinDecimalsRegistered.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CoinDecimalsRegistered {
    return CoinDecimalsRegistered.reified().new({
      registry: decodeFromFields('address', fields.registry),
      coinType: decodeFromFields(String.reified(), fields.coin_type),
      decimals: decodeFromFields('u8', fields.decimals),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CoinDecimalsRegistered {
    if (!isCoinDecimalsRegistered(item.type)) {
      throw new Error('not a CoinDecimalsRegistered type')
    }

    return CoinDecimalsRegistered.reified().new({
      registry: decodeFromFieldsWithTypes('address', item.fields.registry),
      coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type),
      decimals: decodeFromFieldsWithTypes('u8', item.fields.decimals),
    })
  }

  static fromBcs(data: Uint8Array): CoinDecimalsRegistered {
    return CoinDecimalsRegistered.fromFields(CoinDecimalsRegistered.bcs.parse(data))
  }

  toJSONField(): CoinDecimalsRegisteredJSONField {
    return {
      registry: this.registry,
      coinType: this.coinType,
      decimals: this.decimals,
    }
  }

  toJSON(): CoinDecimalsRegisteredJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CoinDecimalsRegistered {
    return CoinDecimalsRegistered.reified().new({
      registry: decodeFromJSONField('address', field.registry),
      coinType: decodeFromJSONField(String.reified(), field.coinType),
      decimals: decodeFromJSONField('u8', field.decimals),
    })
  }

  static fromJSON(json: Record<string, any>): CoinDecimalsRegistered {
    if (json.$typeName !== CoinDecimalsRegistered.$typeName) {
      throw new Error(
        `not a CoinDecimalsRegistered json object: expected '${CoinDecimalsRegistered.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CoinDecimalsRegistered.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CoinDecimalsRegistered {
    if (!isCoinDecimalsRegistered(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CoinDecimalsRegistered object`)
    }
    return CoinDecimalsRegistered.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CoinDecimalsRegistered.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CoinDecimalsRegistered {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCoinDecimalsRegistered(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CoinDecimalsRegistered object`,
      )
    }
    return CoinDecimalsRegistered.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CoinDecimalsRegistered.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CoinDecimalsRegistered {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCoinDecimalsRegistered(data.bcs.type)) {
        throw new Error(`object at is not a CoinDecimalsRegistered object`)
      }

      return CoinDecimalsRegistered.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CoinDecimalsRegistered.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CoinDecimalsRegistered> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCoinDecimalsRegistered(object.type)) {
      throw new Error(`object at id ${id} is not a CoinDecimalsRegistered object`)
    }
    return CoinDecimalsRegistered.fromBcs(object.content)
  }
}
