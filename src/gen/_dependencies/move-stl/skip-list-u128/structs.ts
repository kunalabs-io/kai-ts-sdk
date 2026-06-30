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
  Reified,
  StructClass,
  toBcs,
  ToField,
  ToJSON,
  ToTypeArgument,
  ToTypeStr,
  ToTypeStr as ToPhantom,
  TypeArgument,
  vector,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'
import { Vector } from '../../../_framework/vector'
import { UID } from '../../../sui/object/structs'
import { Table } from '../../../sui/table/structs'
import { OptionU128 } from '../option-u128/structs'
import { Random } from '../random/structs'

/* ============================== SkipList =============================== */

export function isSkipList(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('move-stl', 'skip_list_u128::SkipList')}::skip_list_u128::SkipList` + '<',
  )
}

export interface SkipListFields<V extends TypeArgument> {
  /** The id of this skip list. */
  id: ToField<UID>
  /** The skip list header of each level. i.e. the score of node. */
  head: ToField<Vector<OptionU128>>
  /** The level0's tail of skip list. i.e. the score of node. */
  tail: ToField<OptionU128>
  /** The current level of this skip list. */
  level: ToField<'u64'>
  /** The max level of this skip list. */
  maxLevel: ToField<'u64'>
  /** Basic probability of random of node indexer's level i.e. (list_p = 2, level2 = 1/2, level3 = 1/4). */
  listP: ToField<'u64'>
  /** The random for generate ndoe's level */
  random: ToField<Random>
  /** The table for store node. */
  inner: ToField<Table<'u128', ToPhantom<SkipListNode<V>>>>
}

export type SkipListReified<V extends TypeArgument> = Reified<SkipList<V>, SkipListFields<V>>

export type SkipListJSONField<V extends TypeArgument> = {
  id: string
  head: ToJSON<OptionU128>[]
  tail: ToJSON<OptionU128>
  level: string
  maxLevel: string
  listP: string
  random: ToJSON<Random>
  inner: ToJSON<Table<'u128', ToPhantom<SkipListNode<V>>>>
}

export type SkipListJSON<V extends TypeArgument> = {
  $typeName: typeof SkipList.$typeName
  $typeArgs: [ToTypeStr<V>]
} & SkipListJSONField<V>

/** The skip list. */
export class SkipList<V extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::skip_list_u128::SkipList` {
    return `${
      getTypeOrigin('move-stl', 'skip_list_u128::SkipList')
    }::skip_list_u128::SkipList` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName: typeof SkipList.$typeName = SkipList.$typeName
  readonly $fullTypeName: `${string}::skip_list_u128::SkipList<${ToTypeStr<V>}>`
  readonly $typeArgs: [ToTypeStr<V>]
  readonly $isPhantom: typeof SkipList.$isPhantom = SkipList.$isPhantom

  /** The id of this skip list. */
  readonly id: ToField<UID>
  /** The skip list header of each level. i.e. the score of node. */
  readonly head: ToField<Vector<OptionU128>>
  /** The level0's tail of skip list. i.e. the score of node. */
  readonly tail: ToField<OptionU128>
  /** The current level of this skip list. */
  readonly level: ToField<'u64'>
  /** The max level of this skip list. */
  readonly maxLevel: ToField<'u64'>
  /** Basic probability of random of node indexer's level i.e. (list_p = 2, level2 = 1/2, level3 = 1/4). */
  readonly listP: ToField<'u64'>
  /** The random for generate ndoe's level */
  readonly random: ToField<Random>
  /** The table for store node. */
  readonly inner: ToField<Table<'u128', ToPhantom<SkipListNode<V>>>>

  private constructor(typeArgs: [ToTypeStr<V>], fields: SkipListFields<V>) {
    this.$fullTypeName = composeSuiType(
      SkipList.$typeName,
      ...typeArgs,
    ) as `${string}::skip_list_u128::SkipList<${ToTypeStr<V>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.head = fields.head
    this.tail = fields.tail
    this.level = fields.level
    this.maxLevel = fields.maxLevel
    this.listP = fields.listP
    this.random = fields.random
    this.inner = fields.inner
  }

  static reified<V extends Reified<TypeArgument, any>>(
    V: V,
  ): SkipListReified<ToTypeArgument<V>> {
    const reifiedBcs = SkipList.bcs(toBcs(V))
    return {
      get typeName() {
        return SkipList.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SkipList.$typeName,
          ...[extractType(V)],
        ) as `${string}::skip_list_u128::SkipList<${ToTypeStr<ToTypeArgument<V>>}>`
      },
      get typeArgs() {
        return [extractType(V)] as [ToTypeStr<ToTypeArgument<V>>]
      },
      isPhantom: SkipList.$isPhantom,
      reifiedTypeArgs: [V],
      fromFields: (fields: Record<string, any>) => SkipList.fromFields(V, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SkipList.fromFieldsWithTypes(V, item),
      fromBcs: (data: Uint8Array) => SkipList.fromFields(V, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SkipList.fromJSONField(V, field),
      fromJSON: (json: Record<string, any>) => SkipList.fromJSON(V, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SkipList.fromCoreObject(V, obj),
      fromSuiParsedData: (content: SuiParsedData) => SkipList.fromSuiParsedData(V, content),
      fromSuiObjectData: (content: SuiObjectData) => SkipList.fromSuiObjectData(V, content),
      fetch: async (client: ClientWithCoreApi, id: string) => SkipList.fetch(client, V, id),
      new: (fields: SkipListFields<ToTypeArgument<V>>) => {
        return new SkipList([extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof SkipList.reified {
    return SkipList.reified
  }

  static phantom<V extends Reified<TypeArgument, any>>(
    V: V,
  ): PhantomReified<ToTypeStr<SkipList<ToTypeArgument<V>>>> {
    return phantom(SkipList.reified(V))
  }

  static get p(): typeof SkipList.phantom {
    return SkipList.phantom
  }

  private static instantiateBcs() {
    return <V extends BcsType<any>>(V: V) =>
      bcs.struct(`SkipList<${V.name}>`, {
        id: UID.bcs,
        head: bcs.vector(OptionU128.bcs),
        tail: OptionU128.bcs,
        level: bcs.u64(),
        max_level: bcs.u64(),
        list_p: bcs.u64(),
        random: Random.bcs,
        inner: Table.bcs,
      })
  }

  private static cachedBcs: ReturnType<typeof SkipList.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SkipList.instantiateBcs> {
    if (!SkipList.cachedBcs) {
      SkipList.cachedBcs = SkipList.instantiateBcs()
    }
    return SkipList.cachedBcs
  }

  static fromFields<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    fields: Record<string, any>,
  ): SkipList<ToTypeArgument<V>> {
    return SkipList.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      head: decodeFromFields(vector(OptionU128.reified()), fields.head),
      tail: decodeFromFields(OptionU128.reified(), fields.tail),
      level: decodeFromFields('u64', fields.level),
      maxLevel: decodeFromFields('u64', fields.max_level),
      listP: decodeFromFields('u64', fields.list_p),
      random: decodeFromFields(Random.reified(), fields.random),
      inner: decodeFromFields(
        Table.reified(phantom('u128'), phantom(SkipListNode.reified(typeArg))),
        fields.inner,
      ),
    })
  }

  static fromFieldsWithTypes<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    item: FieldsWithTypes,
  ): SkipList<ToTypeArgument<V>> {
    if (!isSkipList(item.type)) {
      throw new Error('not a SkipList type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return SkipList.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      head: decodeFromFieldsWithTypes(vector(OptionU128.reified()), item.fields.head),
      tail: decodeFromFieldsWithTypes(OptionU128.reified(), item.fields.tail),
      level: decodeFromFieldsWithTypes('u64', item.fields.level),
      maxLevel: decodeFromFieldsWithTypes('u64', item.fields.max_level),
      listP: decodeFromFieldsWithTypes('u64', item.fields.list_p),
      random: decodeFromFieldsWithTypes(Random.reified(), item.fields.random),
      inner: decodeFromFieldsWithTypes(
        Table.reified(phantom('u128'), phantom(SkipListNode.reified(typeArg))),
        item.fields.inner,
      ),
    })
  }

  static fromBcs<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: Uint8Array,
  ): SkipList<ToTypeArgument<V>> {
    const typeArgs = [typeArg]
    return SkipList.fromFields(typeArg, SkipList.bcs(toBcs(typeArg)).parse(data))
  }

  toJSONField(): SkipListJSONField<V> {
    return {
      id: this.id,
      head: fieldToJSON<Vector<OptionU128>>(`vector<${OptionU128.$typeName}>`, this.head),
      tail: this.tail.toJSONField(),
      level: this.level.toString(),
      maxLevel: this.maxLevel.toString(),
      listP: this.listP.toString(),
      random: this.random.toJSONField(),
      inner: this.inner.toJSONField(),
    }
  }

  toJSON(): SkipListJSON<V> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    field: any,
  ): SkipList<ToTypeArgument<V>> {
    return SkipList.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      head: decodeFromJSONField(vector(OptionU128.reified()), field.head),
      tail: decodeFromJSONField(OptionU128.reified(), field.tail),
      level: decodeFromJSONField('u64', field.level),
      maxLevel: decodeFromJSONField('u64', field.maxLevel),
      listP: decodeFromJSONField('u64', field.listP),
      random: decodeFromJSONField(Random.reified(), field.random),
      inner: decodeFromJSONField(
        Table.reified(phantom('u128'), phantom(SkipListNode.reified(typeArg))),
        field.inner,
      ),
    })
  }

  static fromJSON<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    json: Record<string, any>,
  ): SkipList<ToTypeArgument<V>> {
    if (json.$typeName !== SkipList.$typeName) {
      throw new Error(
        `not a SkipList json object: expected '${SkipList.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(SkipList.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return SkipList.fromJSONField(typeArg, json)
  }

  static fromCoreObject<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): SkipList<ToTypeArgument<V>> {
    if (!isSkipList(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SkipList object`)
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

    return SkipList.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SkipList.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    content: SuiParsedData,
  ): SkipList<ToTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSkipList(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SkipList object`)
    }
    return SkipList.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SkipList.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: SuiObjectData,
  ): SkipList<ToTypeArgument<V>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSkipList(data.bcs.type)) {
        throw new Error(`object at is not a SkipList object`)
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

      return SkipList.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SkipList.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<V extends Reified<TypeArgument, any>>(
    client: ClientWithCoreApi,
    typeArg: V,
    id: string,
  ): Promise<SkipList<ToTypeArgument<V>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSkipList(object.type)) {
      throw new Error(`object at id ${id} is not a SkipList object`)
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

    return SkipList.fromBcs(typeArg, object.content)
  }
}

/* ============================== SkipListNode =============================== */

export function isSkipListNode(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('move-stl', 'skip_list_u128::SkipListNode')}::skip_list_u128::SkipListNode`
      + '<',
  )
}

export interface SkipListNodeFields<V extends TypeArgument> {
  /** The score of node. */
  score: ToField<'u128'>
  /** The next node score of node's each level. */
  nexts: ToField<Vector<OptionU128>>
  /** The prev node score of node. */
  prev: ToField<OptionU128>
  /** The data being stored */
  value: ToField<V>
}

export type SkipListNodeReified<V extends TypeArgument> = Reified<
  SkipListNode<V>,
  SkipListNodeFields<V>
>

export type SkipListNodeJSONField<V extends TypeArgument> = {
  score: string
  nexts: ToJSON<OptionU128>[]
  prev: ToJSON<OptionU128>
  value: ToJSON<V>
}

export type SkipListNodeJSON<V extends TypeArgument> = {
  $typeName: typeof SkipListNode.$typeName
  $typeArgs: [ToTypeStr<V>]
} & SkipListNodeJSONField<V>

/** The node of skip list. */
export class SkipListNode<V extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::skip_list_u128::SkipListNode` {
    return `${
      getTypeOrigin('move-stl', 'skip_list_u128::SkipListNode')
    }::skip_list_u128::SkipListNode` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName: typeof SkipListNode.$typeName = SkipListNode.$typeName
  readonly $fullTypeName: `${string}::skip_list_u128::SkipListNode<${ToTypeStr<V>}>`
  readonly $typeArgs: [ToTypeStr<V>]
  readonly $isPhantom: typeof SkipListNode.$isPhantom = SkipListNode.$isPhantom

  /** The score of node. */
  readonly score: ToField<'u128'>
  /** The next node score of node's each level. */
  readonly nexts: ToField<Vector<OptionU128>>
  /** The prev node score of node. */
  readonly prev: ToField<OptionU128>
  /** The data being stored */
  readonly value: ToField<V>

  private constructor(typeArgs: [ToTypeStr<V>], fields: SkipListNodeFields<V>) {
    this.$fullTypeName = composeSuiType(
      SkipListNode.$typeName,
      ...typeArgs,
    ) as `${string}::skip_list_u128::SkipListNode<${ToTypeStr<V>}>`
    this.$typeArgs = typeArgs

    this.score = fields.score
    this.nexts = fields.nexts
    this.prev = fields.prev
    this.value = fields.value
  }

  static reified<V extends Reified<TypeArgument, any>>(
    V: V,
  ): SkipListNodeReified<ToTypeArgument<V>> {
    const reifiedBcs = SkipListNode.bcs(toBcs(V))
    return {
      get typeName() {
        return SkipListNode.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SkipListNode.$typeName,
          ...[extractType(V)],
        ) as `${string}::skip_list_u128::SkipListNode<${ToTypeStr<ToTypeArgument<V>>}>`
      },
      get typeArgs() {
        return [extractType(V)] as [ToTypeStr<ToTypeArgument<V>>]
      },
      isPhantom: SkipListNode.$isPhantom,
      reifiedTypeArgs: [V],
      fromFields: (fields: Record<string, any>) => SkipListNode.fromFields(V, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SkipListNode.fromFieldsWithTypes(V, item),
      fromBcs: (data: Uint8Array) => SkipListNode.fromFields(V, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SkipListNode.fromJSONField(V, field),
      fromJSON: (json: Record<string, any>) => SkipListNode.fromJSON(V, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SkipListNode.fromCoreObject(V, obj),
      fromSuiParsedData: (content: SuiParsedData) => SkipListNode.fromSuiParsedData(V, content),
      fromSuiObjectData: (content: SuiObjectData) => SkipListNode.fromSuiObjectData(V, content),
      fetch: async (client: ClientWithCoreApi, id: string) => SkipListNode.fetch(client, V, id),
      new: (fields: SkipListNodeFields<ToTypeArgument<V>>) => {
        return new SkipListNode([extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof SkipListNode.reified {
    return SkipListNode.reified
  }

  static phantom<V extends Reified<TypeArgument, any>>(
    V: V,
  ): PhantomReified<ToTypeStr<SkipListNode<ToTypeArgument<V>>>> {
    return phantom(SkipListNode.reified(V))
  }

  static get p(): typeof SkipListNode.phantom {
    return SkipListNode.phantom
  }

  private static instantiateBcs() {
    return <V extends BcsType<any>>(V: V) =>
      bcs.struct(`SkipListNode<${V.name}>`, {
        score: bcs.u128(),
        nexts: bcs.vector(OptionU128.bcs),
        prev: OptionU128.bcs,
        value: V,
      })
  }

  private static cachedBcs: ReturnType<typeof SkipListNode.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SkipListNode.instantiateBcs> {
    if (!SkipListNode.cachedBcs) {
      SkipListNode.cachedBcs = SkipListNode.instantiateBcs()
    }
    return SkipListNode.cachedBcs
  }

  static fromFields<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    fields: Record<string, any>,
  ): SkipListNode<ToTypeArgument<V>> {
    return SkipListNode.reified(typeArg).new({
      score: decodeFromFields('u128', fields.score),
      nexts: decodeFromFields(vector(OptionU128.reified()), fields.nexts),
      prev: decodeFromFields(OptionU128.reified(), fields.prev),
      value: decodeFromFields(typeArg, fields.value),
    })
  }

  static fromFieldsWithTypes<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    item: FieldsWithTypes,
  ): SkipListNode<ToTypeArgument<V>> {
    if (!isSkipListNode(item.type)) {
      throw new Error('not a SkipListNode type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return SkipListNode.reified(typeArg).new({
      score: decodeFromFieldsWithTypes('u128', item.fields.score),
      nexts: decodeFromFieldsWithTypes(vector(OptionU128.reified()), item.fields.nexts),
      prev: decodeFromFieldsWithTypes(OptionU128.reified(), item.fields.prev),
      value: decodeFromFieldsWithTypes(typeArg, item.fields.value),
    })
  }

  static fromBcs<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: Uint8Array,
  ): SkipListNode<ToTypeArgument<V>> {
    const typeArgs = [typeArg]
    return SkipListNode.fromFields(typeArg, SkipListNode.bcs(toBcs(typeArg)).parse(data))
  }

  toJSONField(): SkipListNodeJSONField<V> {
    return {
      score: this.score.toString(),
      nexts: fieldToJSON<Vector<OptionU128>>(`vector<${OptionU128.$typeName}>`, this.nexts),
      prev: this.prev.toJSONField(),
      value: fieldToJSON<V>(`${this.$typeArgs[0]}`, this.value),
    }
  }

  toJSON(): SkipListNodeJSON<V> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    field: any,
  ): SkipListNode<ToTypeArgument<V>> {
    return SkipListNode.reified(typeArg).new({
      score: decodeFromJSONField('u128', field.score),
      nexts: decodeFromJSONField(vector(OptionU128.reified()), field.nexts),
      prev: decodeFromJSONField(OptionU128.reified(), field.prev),
      value: decodeFromJSONField(typeArg, field.value),
    })
  }

  static fromJSON<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    json: Record<string, any>,
  ): SkipListNode<ToTypeArgument<V>> {
    if (json.$typeName !== SkipListNode.$typeName) {
      throw new Error(
        `not a SkipListNode json object: expected '${SkipListNode.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(SkipListNode.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return SkipListNode.fromJSONField(typeArg, json)
  }

  static fromCoreObject<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): SkipListNode<ToTypeArgument<V>> {
    if (!isSkipListNode(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SkipListNode object`)
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

    return SkipListNode.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SkipListNode.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    content: SuiParsedData,
  ): SkipListNode<ToTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSkipListNode(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SkipListNode object`)
    }
    return SkipListNode.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SkipListNode.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: SuiObjectData,
  ): SkipListNode<ToTypeArgument<V>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSkipListNode(data.bcs.type)) {
        throw new Error(`object at is not a SkipListNode object`)
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

      return SkipListNode.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SkipListNode.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<V extends Reified<TypeArgument, any>>(
    client: ClientWithCoreApi,
    typeArg: V,
    id: string,
  ): Promise<SkipListNode<ToTypeArgument<V>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSkipListNode(object.type)) {
      throw new Error(`object at id ${id} is not a SkipListNode object`)
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

    return SkipListNode.fromBcs(typeArg, object.content)
  }
}

/* ============================== Item =============================== */

export function isItem(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('move-stl', 'skip_list_u128::Item')}::skip_list_u128::Item`
}

export interface ItemFields {
  n: ToField<'u64'>
  score: ToField<'u64'>
  finded: ToField<OptionU128>
}

export type ItemReified = Reified<Item, ItemFields>

export type ItemJSONField = {
  n: string
  score: string
  finded: ToJSON<OptionU128>
}

export type ItemJSON = {
  $typeName: typeof Item.$typeName
  $typeArgs: []
} & ItemJSONField

export class Item implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::skip_list_u128::Item` {
    return `${getTypeOrigin('move-stl', 'skip_list_u128::Item')}::skip_list_u128::Item` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Item.$typeName = Item.$typeName
  readonly $fullTypeName: `${string}::skip_list_u128::Item`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Item.$isPhantom = Item.$isPhantom

  readonly n: ToField<'u64'>
  readonly score: ToField<'u64'>
  readonly finded: ToField<OptionU128>

  private constructor(typeArgs: [], fields: ItemFields) {
    this.$fullTypeName = composeSuiType(
      Item.$typeName,
      ...typeArgs,
    ) as `${string}::skip_list_u128::Item`
    this.$typeArgs = typeArgs

    this.n = fields.n
    this.score = fields.score
    this.finded = fields.finded
  }

  static reified(): ItemReified {
    const reifiedBcs = Item.bcs
    return {
      get typeName() {
        return Item.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Item.$typeName,
          ...[],
        ) as `${string}::skip_list_u128::Item`
      },
      typeArgs: [] as [],
      isPhantom: Item.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Item.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Item.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Item.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Item.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Item.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Item.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Item.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Item.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Item.fetch(client, id),
      new: (fields: ItemFields) => {
        return new Item([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ItemReified {
    return Item.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Item>> {
    return phantom(Item.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Item>> {
    return Item.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Item', {
      n: bcs.u64(),
      score: bcs.u64(),
      finded: OptionU128.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Item.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Item.instantiateBcs> {
    if (!Item.cachedBcs) {
      Item.cachedBcs = Item.instantiateBcs()
    }
    return Item.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Item {
    return Item.reified().new({
      n: decodeFromFields('u64', fields.n),
      score: decodeFromFields('u64', fields.score),
      finded: decodeFromFields(OptionU128.reified(), fields.finded),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Item {
    if (!isItem(item.type)) {
      throw new Error('not a Item type')
    }

    return Item.reified().new({
      n: decodeFromFieldsWithTypes('u64', item.fields.n),
      score: decodeFromFieldsWithTypes('u64', item.fields.score),
      finded: decodeFromFieldsWithTypes(OptionU128.reified(), item.fields.finded),
    })
  }

  static fromBcs(data: Uint8Array): Item {
    return Item.fromFields(Item.bcs.parse(data))
  }

  toJSONField(): ItemJSONField {
    return {
      n: this.n.toString(),
      score: this.score.toString(),
      finded: this.finded.toJSONField(),
    }
  }

  toJSON(): ItemJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Item {
    return Item.reified().new({
      n: decodeFromJSONField('u64', field.n),
      score: decodeFromJSONField('u64', field.score),
      finded: decodeFromJSONField(OptionU128.reified(), field.finded),
    })
  }

  static fromJSON(json: Record<string, any>): Item {
    if (json.$typeName !== Item.$typeName) {
      throw new Error(
        `not a Item json object: expected '${Item.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Item.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Item {
    if (!isItem(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Item object`)
    }
    return Item.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Item.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Item {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isItem(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Item object`)
    }
    return Item.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Item.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Item {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isItem(data.bcs.type)) {
        throw new Error(`object at is not a Item object`)
      }

      return Item.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Item.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Item> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isItem(object.type)) {
      throw new Error(`object at id ${id} is not a Item object`)
    }
    return Item.fromBcs(object.content)
  }
}
