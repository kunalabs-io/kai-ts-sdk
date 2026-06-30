/**
 * Witness controlled table
 * Witness is required to write or destory
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

/* ============================== WitTable =============================== */

export function isWitTable(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${getTypeOrigin('x', 'wit_table::WitTable')}::wit_table::WitTable` + '<')
}

export interface WitTableFields<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> {
  id: ToField<UID>
  table: ToField<Table<ToPhantom<K>, V>>
  keys: ToField<Option<VecSet<K>>>
  withKeys: ToField<'bool'>
}

export type WitTableReified<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> = Reified<WitTable<T, K, V>, WitTableFields<T, K, V>>

export type WitTableJSONField<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> = {
  id: string
  table: ToJSON<Table<ToPhantom<K>, V>>
  keys: ToJSON<VecSet<K>> | null
  withKeys: boolean
}

export type WitTableJSON<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> = {
  $typeName: typeof WitTable.$typeName
  $typeArgs: [PhantomToTypeStr<T>, ToTypeStr<K>, PhantomToTypeStr<V>]
} & WitTableJSONField<T, K, V>

/**
 * A data structure backed by sui::table and sui::vec_set.
 * All write operations are controlled by witness pattern
 * If you set withKeys = true when creating table:
 * It will store all the keys in a vector, with which you can use to loop the table.
 * The keys are in insertion order.
 */
export class WitTable<
  T extends PhantomTypeArgument,
  K extends TypeArgument,
  V extends PhantomTypeArgument,
> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::wit_table::WitTable` {
    return `${getTypeOrigin('x', 'wit_table::WitTable')}::wit_table::WitTable` as const
  }
  static readonly $numTypeParams = 3
  static readonly $isPhantom = [true, false, true] as const

  readonly $typeName: typeof WitTable.$typeName = WitTable.$typeName
  readonly $fullTypeName: `${string}::wit_table::WitTable<${PhantomToTypeStr<T>}, ${ToTypeStr<
    K
  >}, ${PhantomToTypeStr<V>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, ToTypeStr<K>, PhantomToTypeStr<V>]
  readonly $isPhantom: typeof WitTable.$isPhantom = WitTable.$isPhantom

  readonly id: ToField<UID>
  readonly table: ToField<Table<ToPhantom<K>, V>>
  readonly keys: ToField<Option<VecSet<K>>>
  readonly withKeys: ToField<'bool'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, ToTypeStr<K>, PhantomToTypeStr<V>],
    fields: WitTableFields<T, K, V>,
  ) {
    this.$fullTypeName = composeSuiType(
      WitTable.$typeName,
      ...typeArgs,
    ) as `${string}::wit_table::WitTable<${PhantomToTypeStr<T>}, ${ToTypeStr<
      K
    >}, ${PhantomToTypeStr<V>}>`
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
  ): WitTableReified<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    const reifiedBcs = WitTable.bcs(toBcs(K))
    return {
      get typeName() {
        return WitTable.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WitTable.$typeName,
          ...[extractType(T), extractType(K), extractType(V)],
        ) as `${string}::wit_table::WitTable<${PhantomToTypeStr<
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
      isPhantom: WitTable.$isPhantom,
      reifiedTypeArgs: [T, K, V],
      fromFields: (fields: Record<string, any>) => WitTable.fromFields([T, K, V], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WitTable.fromFieldsWithTypes([T, K, V], item),
      fromBcs: (data: Uint8Array) => WitTable.fromFields([T, K, V], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WitTable.fromJSONField([T, K, V], field),
      fromJSON: (json: Record<string, any>) => WitTable.fromJSON([T, K, V], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WitTable.fromCoreObject([T, K, V], obj),
      fromSuiParsedData: (content: SuiParsedData) => WitTable.fromSuiParsedData([T, K, V], content),
      fromSuiObjectData: (content: SuiObjectData) => WitTable.fromSuiObjectData([T, K, V], content),
      fetch: async (client: ClientWithCoreApi, id: string) => WitTable.fetch(client, [T, K, V], id),
      new: (
        fields: WitTableFields<
          ToPhantomTypeArgument<T>,
          ToTypeArgument<K>,
          ToPhantomTypeArgument<V>
        >,
      ) => {
        return new WitTable([extractType(T), extractType(K), extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof WitTable.reified {
    return WitTable.reified
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
    ToTypeStr<WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>>>
  > {
    return phantom(WitTable.reified(T, K, V))
  }

  static get p(): typeof WitTable.phantom {
    return WitTable.phantom
  }

  private static instantiateBcs() {
    return <K extends BcsType<any>>(K: K) =>
      bcs.struct(`WitTable<${K.name}>`, {
        id: UID.bcs,
        table: Table.bcs,
        keys: Option.bcs(VecSet.bcs(K)),
        with_keys: bcs.bool(),
      })
  }

  private static cachedBcs: ReturnType<typeof WitTable.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WitTable.instantiateBcs> {
    if (!WitTable.cachedBcs) {
      WitTable.cachedBcs = WitTable.instantiateBcs()
    }
    return WitTable.cachedBcs
  }

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    fields: Record<string, any>,
  ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    return WitTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
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
  ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (!isWitTable(item.type)) {
      throw new Error('not a WitTable type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return WitTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
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
  ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    return WitTable.fromFields(typeArgs, WitTable.bcs(toBcs(typeArgs[1])).parse(data))
  }

  toJSONField(): WitTableJSONField<T, K, V> {
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

  toJSON(): WitTableJSON<T, K, V> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    field: any,
  ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    return WitTable.reified(typeArgs[0], typeArgs[1], typeArgs[2]).new({
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
  ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (json.$typeName !== WitTable.$typeName) {
      throw new Error(
        `not a WitTable json object: expected '${WitTable.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(WitTable.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return WitTable.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (!isWitTable(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WitTable object`)
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

    return WitTable.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WitTable.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    content: SuiParsedData,
  ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWitTable(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WitTable object`)
    }
    return WitTable.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WitTable.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    K extends Reified<TypeArgument, any>,
    V extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, K, V],
    data: SuiObjectData,
  ): WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWitTable(data.bcs.type)) {
        throw new Error(`object at is not a WitTable object`)
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

      return WitTable.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WitTable.fromSuiParsedData(typeArgs, data.content)
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
  ): Promise<WitTable<ToPhantomTypeArgument<T>, ToTypeArgument<K>, ToPhantomTypeArgument<V>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWitTable(object.type)) {
      throw new Error(`object at id ${id} is not a WitTable object`)
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

    return WitTable.fromBcs(typeArgs, object.content)
  }
}
