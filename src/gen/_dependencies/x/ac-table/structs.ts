/**
 * Access controlled table
 * Ownership is required to write or destory
 * Read is open to anyone
 */

import { bcs, BcsType } from '@mysten/sui/bcs'
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
  toBcs,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeArgument,
  ToTypeStr,
  ToTypeStr as ToPhantom,
  TypeArgument,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'
import { Option } from '../../../std/option/structs'
import { UID } from '../../../sui/object/structs'
import { Table } from '../../../sui/table/structs'
import { VecSet } from '../../../sui/vec-set/structs'
import { Ownership } from '../ownership/structs'

/* ============================== AcTable =============================== */

export function isAcTable(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${getTypeOrigin('x', 'ac_table::AcTable')}::ac_table::AcTable` + '<')
}

export interface AcTableFields<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> {
  id: ToField<UID>
  table: ToField<Table<ToPhantom<K>, V>>
  keys: ToField<Option<VecSet<K>>>
  withKeys: ToField<'bool'>
}

export type AcTableReified<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> = Reified<AcTable<T, K, V>, AcTableFields<T, K, V>>

export type AcTableJSONField<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> = {
  id: string
  table: ToJSON<Table<ToPhantom<K>, V>>
  keys: ToJSON<VecSet<K>> | null
  withKeys: boolean
}

export type AcTableJSON<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> = {
  $typeName: typeof AcTable.$typeName
  $typeArgs: [PhantomToTypeStr<T>, ToTypeStr<K>, PhantomToTypeStr<V>]
} & AcTableJSONField<T, K, V>

export class AcTable<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::ac_table::AcTable` {
    return `${getTypeOrigin('x', 'ac_table::AcTable')}::ac_table::AcTable` as const
  }
  static readonly $numTypeParams = 3
  static readonly $isPhantom = [true, false, true] as const

  readonly $typeName: typeof AcTable.$typeName = AcTable.$typeName
  readonly $fullTypeName: `${string}::ac_table::AcTable<${PhantomToTypeStr<T>}, ${ToTypeStr<
    K
  >}, ${PhantomToTypeStr<V>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, ToTypeStr<K>, PhantomToTypeStr<V>]
  readonly $isPhantom: typeof AcTable.$isPhantom = AcTable.$isPhantom

  readonly id: ToField<UID>
  readonly table: ToField<Table<ToPhantom<K>, V>>
  readonly keys: ToField<Option<VecSet<K>>>
  readonly withKeys: ToField<'bool'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, ToTypeStr<K>, PhantomToTypeStr<V>],
    fields: AcTableFields<T, K, V>,
  ) {
    this.$fullTypeName = composeSuiType(
      AcTable.$typeName,
      ...typeArgs,
    ) as `${string}::ac_table::AcTable<${PhantomToTypeStr<T>}, ${ToTypeStr<K>}, ${PhantomToTypeStr<
      V
    >}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.table = fields.table
    this.keys = fields.keys
    this.withKeys = fields.withKeys
  }

  static reified<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    K: K,
    V: V,
  ): AcTableReified<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    const reifiedBcs = AcTable.bcs(toBcs(K))
    return {
      get typeName() {
        return AcTable.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AcTable.$typeName,
          ...[extractType(T), extractType(K), extractType(V)],
        ) as `${string}::ac_table::AcTable<${PhantomToTypeStr<
          ToPhantomTypeArgument<T>
        >}, ${ToTypeStr<ToTypeArgument<K>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<V>>}>`
      },
      get typeArgs() {
        return [extractType(T), extractType(K), extractType(V)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<T>>,
          ToTypeStr<ToTypeArgument<K>>,
          PhantomToTypeStr<ToPhantomTypeArgument<V>>,
        ]
      },
      isPhantom: AcTable.$isPhantom,
      reifiedTypeArgs: [T, K, V],
      fromFields: (fields: Record<string, any>) => AcTable.fromFields([T, K, V], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AcTable.fromFieldsWithTypes([T, K, V], item),
      fromBcs: (data: Uint8Array) => AcTable.fromFields([T, K, V], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AcTable.fromJSONField([T, K, V], field),
      fromJSON: (json: Record<string, any>) => AcTable.fromJSON([T, K, V], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AcTable.fromCoreObject([T, K, V], obj),
      fromSuiParsedData: (content: SuiParsedData) => AcTable.fromSuiParsedData([T, K, V], content),
      fromSuiObjectData: (content: SuiObjectData) => AcTable.fromSuiObjectData([T, K, V], content),
      fetch: async (client: ClientWithCoreApi, id: string) => AcTable.fetch(client, [T, K, V], id),
      new: (
        fields: AcTableFields<
          ToPhantomTypeArgument<T>,
          ToTypeArgument<K>,
          ToPhantomTypeArgument<V>
        >,
      ) => {
        return new AcTable([extractType(T), extractType(K), extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof AcTable.reified {
    return AcTable.reified
  }

  static phantom<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    K: K,
    V: V,
  ): PhantomReified<
    ToTypeStr<AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>>>
  > {
    return phantom(AcTable.reified(T, K, V))
  }

  static get p(): typeof AcTable.phantom {
    return AcTable.phantom
  }

  private static instantiateBcs() {
    return <K extends BcsType<any>>(K: K) =>
      bcs.struct(`AcTable<${K.name}>`, {
        id: UID.bcs,
        table: Table.bcs,
        keys: Option.bcs(VecSet.bcs(K)),
        with_keys: bcs.bool(),
      })
  }

  private static cachedBcs: ReturnType<typeof AcTable.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AcTable.instantiateBcs> {
    if (!AcTable.cachedBcs) {
      AcTable.cachedBcs = AcTable.instantiateBcs()
    }
    return AcTable.cachedBcs
  }

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    fields: Record<string, any>,
  ): AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    return AcTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      table: decodeFromFields(Table.reified(phantom(typeArgs[1]), typeArgs[2]), fields.table),
      keys: decodeFromFields(Option.reified(VecSet.reified(typeArgs[1])), fields.keys),
      withKeys: decodeFromFields('bool', fields.with_keys),
    })
  }

  static fromFieldsWithTypes<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    item: FieldsWithTypes,
  ): AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (!isAcTable(item.type)) {
      throw new Error('not a AcTable type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return AcTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      table: decodeFromFieldsWithTypes(
        Table.reified(phantom(typeArgs[1]), typeArgs[2]),
        item.fields.table,
      ),
      keys: decodeFromFieldsWithTypes(
        Option.reified(VecSet.reified(typeArgs[1])),
        item.fields.keys,
      ),
      withKeys: decodeFromFieldsWithTypes('bool', item.fields.with_keys),
    })
  }

  static fromBcs<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    data: Uint8Array,
  ): AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    return AcTable.fromFields(typeArgs, AcTable.bcs(toBcs(typeArgs[1])).parse(data))
  }

  toJSONField(): AcTableJSONField<T, K, V> {
    return {
      id: this.id,
      table: this.table.toJSONField(),
      keys: fieldToJSON<Option<VecSet<K>>>(
        `${Option.$typeName}<${VecSet.$typeName}<${this.$typeArgs[1]}>>`,
        this.keys,
      ),
      withKeys: this.withKeys,
    }
  }

  toJSON(): AcTableJSON<T, K, V> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    field: any,
  ): AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    return AcTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      table: decodeFromJSONField(Table.reified(phantom(typeArgs[1]), typeArgs[2]), field.table),
      keys: decodeFromJSONField(Option.reified(VecSet.reified(typeArgs[1])), field.keys),
      withKeys: decodeFromJSONField('bool', field.withKeys),
    })
  }

  static fromJSON<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    json: Record<string, any>,
  ): AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (json.$typeName !== AcTable.$typeName) {
      throw new Error(
        `not a AcTable json object: expected '${AcTable.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(AcTable.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return AcTable.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (!isAcTable(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AcTable object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 3) {
      throw new Error(
        `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 3; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return AcTable.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AcTable.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    content: SuiParsedData,
  ): AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAcTable(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AcTable object`)
    }
    return AcTable.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AcTable.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    data: SuiObjectData,
  ): AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAcTable(data.bcs.type)) {
        throw new Error(`object at is not a AcTable object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 3) {
        throw new Error(
          `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 3; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return AcTable.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AcTable.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [T, K, V],
    id: string,
  ): Promise<AcTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAcTable(object.type)) {
      throw new Error(`object at id ${id} is not a AcTable object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 3) {
      throw new Error(
        `type argument mismatch: expected 3 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 3; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return AcTable.fromBcs(typeArgs, object.content)
  }
}

/* ============================== AcTableOwnership =============================== */

export function isAcTableOwnership(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('x', 'ac_table::AcTableOwnership')}::ac_table::AcTableOwnership`
}

export interface AcTableOwnershipFields {
  dummyField: ToField<'bool'>
}

export type AcTableOwnershipReified = Reified<AcTableOwnership, AcTableOwnershipFields>

export type AcTableOwnershipJSONField = {
  dummyField: boolean
}

export type AcTableOwnershipJSON = {
  $typeName: typeof AcTableOwnership.$typeName
  $typeArgs: []
} & AcTableOwnershipJSONField

export class AcTableOwnership implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::ac_table::AcTableOwnership` {
    return `${
      getTypeOrigin('x', 'ac_table::AcTableOwnership')
    }::ac_table::AcTableOwnership` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AcTableOwnership.$typeName = AcTableOwnership.$typeName
  readonly $fullTypeName: `${string}::ac_table::AcTableOwnership`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AcTableOwnership.$isPhantom = AcTableOwnership.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: AcTableOwnershipFields) {
    this.$fullTypeName = composeSuiType(
      AcTableOwnership.$typeName,
      ...typeArgs,
    ) as `${string}::ac_table::AcTableOwnership`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): AcTableOwnershipReified {
    const reifiedBcs = AcTableOwnership.bcs
    return {
      get typeName() {
        return AcTableOwnership.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AcTableOwnership.$typeName,
          ...[],
        ) as `${string}::ac_table::AcTableOwnership`
      },
      typeArgs: [] as [],
      isPhantom: AcTableOwnership.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AcTableOwnership.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AcTableOwnership.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AcTableOwnership.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AcTableOwnership.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AcTableOwnership.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AcTableOwnership.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AcTableOwnership.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AcTableOwnership.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AcTableOwnership.fetch(client, id),
      new: (fields: AcTableOwnershipFields) => {
        return new AcTableOwnership([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AcTableOwnershipReified {
    return AcTableOwnership.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AcTableOwnership>> {
    return phantom(AcTableOwnership.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AcTableOwnership>> {
    return AcTableOwnership.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AcTableOwnership', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof AcTableOwnership.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AcTableOwnership.instantiateBcs> {
    if (!AcTableOwnership.cachedBcs) {
      AcTableOwnership.cachedBcs = AcTableOwnership.instantiateBcs()
    }
    return AcTableOwnership.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AcTableOwnership {
    return AcTableOwnership.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AcTableOwnership {
    if (!isAcTableOwnership(item.type)) {
      throw new Error('not a AcTableOwnership type')
    }

    return AcTableOwnership.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): AcTableOwnership {
    return AcTableOwnership.fromFields(AcTableOwnership.bcs.parse(data))
  }

  toJSONField(): AcTableOwnershipJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): AcTableOwnershipJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AcTableOwnership {
    return AcTableOwnership.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): AcTableOwnership {
    if (json.$typeName !== AcTableOwnership.$typeName) {
      throw new Error(
        `not a AcTableOwnership json object: expected '${AcTableOwnership.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AcTableOwnership.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AcTableOwnership {
    if (!isAcTableOwnership(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AcTableOwnership object`)
    }
    return AcTableOwnership.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AcTableOwnership.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AcTableOwnership {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAcTableOwnership(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AcTableOwnership object`)
    }
    return AcTableOwnership.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AcTableOwnership.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AcTableOwnership {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAcTableOwnership(data.bcs.type)) {
        throw new Error(`object at is not a AcTableOwnership object`)
      }

      return AcTableOwnership.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AcTableOwnership.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AcTableOwnership> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAcTableOwnership(object.type)) {
      throw new Error(`object at id ${id} is not a AcTableOwnership object`)
    }
    return AcTableOwnership.fromBcs(object.content)
  }
}

/* ============================== AcTableCap =============================== */

export function isAcTableCap(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('x', 'ac_table::AcTableCap')}::ac_table::AcTableCap` + '<',
  )
}

export interface AcTableCapFields<T extends PhantomTypeArgument> {
  id: ToField<UID>
  ownership: ToField<Ownership<ToPhantom<AcTableOwnership>>>
}

export type AcTableCapReified<T extends PhantomTypeArgument> = Reified<
  AcTableCap<T>,
  AcTableCapFields<T>
>

export type AcTableCapJSONField<T extends PhantomTypeArgument> = {
  id: string
  ownership: ToJSON<Ownership<ToPhantom<AcTableOwnership>>>
}

export type AcTableCapJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof AcTableCap.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & AcTableCapJSONField<T>

export class AcTableCap<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::ac_table::AcTableCap` {
    return `${getTypeOrigin('x', 'ac_table::AcTableCap')}::ac_table::AcTableCap` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof AcTableCap.$typeName = AcTableCap.$typeName
  readonly $fullTypeName: `${string}::ac_table::AcTableCap<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof AcTableCap.$isPhantom = AcTableCap.$isPhantom

  readonly id: ToField<UID>
  readonly ownership: ToField<Ownership<ToPhantom<AcTableOwnership>>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: AcTableCapFields<T>) {
    this.$fullTypeName = composeSuiType(
      AcTableCap.$typeName,
      ...typeArgs,
    ) as `${string}::ac_table::AcTableCap<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.ownership = fields.ownership
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): AcTableCapReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = AcTableCap.bcs
    return {
      get typeName() {
        return AcTableCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AcTableCap.$typeName,
          ...[extractType(T)],
        ) as `${string}::ac_table::AcTableCap<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: AcTableCap.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => AcTableCap.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AcTableCap.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => AcTableCap.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AcTableCap.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => AcTableCap.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AcTableCap.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => AcTableCap.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => AcTableCap.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => AcTableCap.fetch(client, T, id),
      new: (fields: AcTableCapFields<ToPhantomTypeArgument<T>>) => {
        return new AcTableCap([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof AcTableCap.reified {
    return AcTableCap.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<AcTableCap<ToPhantomTypeArgument<T>>>> {
    return phantom(AcTableCap.reified(T))
  }

  static get p(): typeof AcTableCap.phantom {
    return AcTableCap.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('AcTableCap', {
      id: UID.bcs,
      ownership: Ownership.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AcTableCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AcTableCap.instantiateBcs> {
    if (!AcTableCap.cachedBcs) {
      AcTableCap.cachedBcs = AcTableCap.instantiateBcs()
    }
    return AcTableCap.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): AcTableCap<ToPhantomTypeArgument<T>> {
    return AcTableCap.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      ownership: decodeFromFields(
        Ownership.reified(phantom(AcTableOwnership.reified())),
        fields.ownership,
      ),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): AcTableCap<ToPhantomTypeArgument<T>> {
    if (!isAcTableCap(item.type)) {
      throw new Error('not a AcTableCap type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return AcTableCap.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      ownership: decodeFromFieldsWithTypes(
        Ownership.reified(phantom(AcTableOwnership.reified())),
        item.fields.ownership,
      ),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): AcTableCap<ToPhantomTypeArgument<T>> {
    return AcTableCap.fromFields(typeArg, AcTableCap.bcs.parse(data))
  }

  toJSONField(): AcTableCapJSONField<T> {
    return {
      id: this.id,
      ownership: this.ownership.toJSONField(),
    }
  }

  toJSON(): AcTableCapJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): AcTableCap<ToPhantomTypeArgument<T>> {
    return AcTableCap.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      ownership: decodeFromJSONField(
        Ownership.reified(phantom(AcTableOwnership.reified())),
        field.ownership,
      ),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): AcTableCap<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== AcTableCap.$typeName) {
      throw new Error(
        `not a AcTableCap json object: expected '${AcTableCap.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(AcTableCap.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return AcTableCap.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): AcTableCap<ToPhantomTypeArgument<T>> {
    if (!isAcTableCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AcTableCap object`)
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

    return AcTableCap.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AcTableCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): AcTableCap<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAcTableCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AcTableCap object`)
    }
    return AcTableCap.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AcTableCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): AcTableCap<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAcTableCap(data.bcs.type)) {
        throw new Error(`object at is not a AcTableCap object`)
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

      return AcTableCap.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AcTableCap.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<AcTableCap<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAcTableCap(object.type)) {
      throw new Error(`object at id ${id} is not a AcTableCap object`)
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

    return AcTableCap.fromBcs(typeArg, object.content)
  }
}
