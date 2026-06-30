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
import { OptionU64 } from '../option-u64/structs'
import { Random } from '../random/structs'

/* ============================== SkipList =============================== */

export function isSkipList(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('move-stl', 'skip_list::SkipList')}::skip_list::SkipList` + '<',
  )
}

export interface SkipListFields<V extends PhantomTypeArgument> {
  /** The id of this skip list. */
  id: ToField<UID>
  /** The skip list header of each level. i.e. the score of node. */
  head: ToField<Vector<OptionU64>>
  /** The level0's tail of skip list. i.e. the score of node. */
  tail: ToField<OptionU64>
  /** The current level of this skip list. */
  level: ToField<'u64'>
  /** The max level of this skip list. */
  maxLevel: ToField<'u64'>
  /** Basic probability of random of node indexer's level i.e. (list_p = 2, level2 = 1/2, level3 = 1/4). */
  listP: ToField<'u64'>
  /** The size of skip list */
  size: ToField<'u64'>
  /** The random for generate ndoe's level */
  random: ToField<Random>
}

export type SkipListReified<V extends PhantomTypeArgument> = Reified<SkipList<V>, SkipListFields<V>>

export type SkipListJSONField<V extends PhantomTypeArgument> = {
  id: string
  head: ToJSON<OptionU64>[]
  tail: ToJSON<OptionU64>
  level: string
  maxLevel: string
  listP: string
  size: string
  random: ToJSON<Random>
}

export type SkipListJSON<V extends PhantomTypeArgument> = {
  $typeName: typeof SkipList.$typeName
  $typeArgs: [PhantomToTypeStr<V>]
} & SkipListJSONField<V>

/** The skip list. */
export class SkipList<V extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::skip_list::SkipList` {
    return `${getTypeOrigin('move-stl', 'skip_list::SkipList')}::skip_list::SkipList` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof SkipList.$typeName = SkipList.$typeName
  readonly $fullTypeName: `${string}::skip_list::SkipList<${PhantomToTypeStr<V>}>`
  readonly $typeArgs: [PhantomToTypeStr<V>]
  readonly $isPhantom: typeof SkipList.$isPhantom = SkipList.$isPhantom

  /** The id of this skip list. */
  readonly id: ToField<UID>
  /** The skip list header of each level. i.e. the score of node. */
  readonly head: ToField<Vector<OptionU64>>
  /** The level0's tail of skip list. i.e. the score of node. */
  readonly tail: ToField<OptionU64>
  /** The current level of this skip list. */
  readonly level: ToField<'u64'>
  /** The max level of this skip list. */
  readonly maxLevel: ToField<'u64'>
  /** Basic probability of random of node indexer's level i.e. (list_p = 2, level2 = 1/2, level3 = 1/4). */
  readonly listP: ToField<'u64'>
  /** The size of skip list */
  readonly size: ToField<'u64'>
  /** The random for generate ndoe's level */
  readonly random: ToField<Random>

  private constructor(typeArgs: [PhantomToTypeStr<V>], fields: SkipListFields<V>) {
    this.$fullTypeName = composeSuiType(
      SkipList.$typeName,
      ...typeArgs,
    ) as `${string}::skip_list::SkipList<${PhantomToTypeStr<V>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.head = fields.head
    this.tail = fields.tail
    this.level = fields.level
    this.maxLevel = fields.maxLevel
    this.listP = fields.listP
    this.size = fields.size
    this.random = fields.random
  }

  static reified<V extends PhantomReified<PhantomTypeArgument>>(
    V: V,
  ): SkipListReified<ToPhantomTypeArgument<V>> {
    const reifiedBcs = SkipList.bcs
    return {
      get typeName() {
        return SkipList.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SkipList.$typeName,
          ...[extractType(V)],
        ) as `${string}::skip_list::SkipList<${PhantomToTypeStr<ToPhantomTypeArgument<V>>}>`
      },
      get typeArgs() {
        return [extractType(V)] as [PhantomToTypeStr<ToPhantomTypeArgument<V>>]
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
      new: (fields: SkipListFields<ToPhantomTypeArgument<V>>) => {
        return new SkipList([extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof SkipList.reified {
    return SkipList.reified
  }

  static phantom<V extends PhantomReified<PhantomTypeArgument>>(
    V: V,
  ): PhantomReified<ToTypeStr<SkipList<ToPhantomTypeArgument<V>>>> {
    return phantom(SkipList.reified(V))
  }

  static get p(): typeof SkipList.phantom {
    return SkipList.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('SkipList', {
      id: UID.bcs,
      head: bcs.vector(OptionU64.bcs),
      tail: OptionU64.bcs,
      level: bcs.u64(),
      max_level: bcs.u64(),
      list_p: bcs.u64(),
      size: bcs.u64(),
      random: Random.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof SkipList.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SkipList.instantiateBcs> {
    if (!SkipList.cachedBcs) {
      SkipList.cachedBcs = SkipList.instantiateBcs()
    }
    return SkipList.cachedBcs
  }

  static fromFields<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    fields: Record<string, any>,
  ): SkipList<ToPhantomTypeArgument<V>> {
    return SkipList.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      head: decodeFromFields(vector(OptionU64.reified()), fields.head),
      tail: decodeFromFields(OptionU64.reified(), fields.tail),
      level: decodeFromFields('u64', fields.level),
      maxLevel: decodeFromFields('u64', fields.max_level),
      listP: decodeFromFields('u64', fields.list_p),
      size: decodeFromFields('u64', fields.size),
      random: decodeFromFields(Random.reified(), fields.random),
    })
  }

  static fromFieldsWithTypes<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    item: FieldsWithTypes,
  ): SkipList<ToPhantomTypeArgument<V>> {
    if (!isSkipList(item.type)) {
      throw new Error('not a SkipList type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return SkipList.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      head: decodeFromFieldsWithTypes(vector(OptionU64.reified()), item.fields.head),
      tail: decodeFromFieldsWithTypes(OptionU64.reified(), item.fields.tail),
      level: decodeFromFieldsWithTypes('u64', item.fields.level),
      maxLevel: decodeFromFieldsWithTypes('u64', item.fields.max_level),
      listP: decodeFromFieldsWithTypes('u64', item.fields.list_p),
      size: decodeFromFieldsWithTypes('u64', item.fields.size),
      random: decodeFromFieldsWithTypes(Random.reified(), item.fields.random),
    })
  }

  static fromBcs<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    data: Uint8Array,
  ): SkipList<ToPhantomTypeArgument<V>> {
    return SkipList.fromFields(typeArg, SkipList.bcs.parse(data))
  }

  toJSONField(): SkipListJSONField<V> {
    return {
      id: this.id,
      head: fieldToJSON<Vector<OptionU64>>(`vector<${OptionU64.$typeName}>`, this.head),
      tail: this.tail.toJSONField(),
      level: this.level.toString(),
      maxLevel: this.maxLevel.toString(),
      listP: this.listP.toString(),
      size: this.size.toString(),
      random: this.random.toJSONField(),
    }
  }

  toJSON(): SkipListJSON<V> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    field: any,
  ): SkipList<ToPhantomTypeArgument<V>> {
    return SkipList.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      head: decodeFromJSONField(vector(OptionU64.reified()), field.head),
      tail: decodeFromJSONField(OptionU64.reified(), field.tail),
      level: decodeFromJSONField('u64', field.level),
      maxLevel: decodeFromJSONField('u64', field.maxLevel),
      listP: decodeFromJSONField('u64', field.listP),
      size: decodeFromJSONField('u64', field.size),
      random: decodeFromJSONField(Random.reified(), field.random),
    })
  }

  static fromJSON<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    json: Record<string, any>,
  ): SkipList<ToPhantomTypeArgument<V>> {
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

  static fromCoreObject<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): SkipList<ToPhantomTypeArgument<V>> {
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
  static fromSuiParsedData<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    content: SuiParsedData,
  ): SkipList<ToPhantomTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSkipList(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SkipList object`)
    }
    return SkipList.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SkipList.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    data: SuiObjectData,
  ): SkipList<ToPhantomTypeArgument<V>> {
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

  static async fetch<V extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: V,
    id: string,
  ): Promise<SkipList<ToPhantomTypeArgument<V>>> {
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

/* ============================== Node =============================== */

export function isNode(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${getTypeOrigin('move-stl', 'skip_list::Node')}::skip_list::Node` + '<')
}

export interface NodeFields<V extends TypeArgument> {
  /** The score of node. */
  score: ToField<'u64'>
  /** The next node score of node's each level. */
  nexts: ToField<Vector<OptionU64>>
  /** The prev node score of node. */
  prev: ToField<OptionU64>
  /** The data being stored */
  value: ToField<V>
}

export type NodeReified<V extends TypeArgument> = Reified<Node<V>, NodeFields<V>>

export type NodeJSONField<V extends TypeArgument> = {
  score: string
  nexts: ToJSON<OptionU64>[]
  prev: ToJSON<OptionU64>
  value: ToJSON<V>
}

export type NodeJSON<V extends TypeArgument> = {
  $typeName: typeof Node.$typeName
  $typeArgs: [ToTypeStr<V>]
} & NodeJSONField<V>

/** The node of skip list. */
export class Node<V extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::skip_list::Node` {
    return `${getTypeOrigin('move-stl', 'skip_list::Node')}::skip_list::Node` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName: typeof Node.$typeName = Node.$typeName
  readonly $fullTypeName: `${string}::skip_list::Node<${ToTypeStr<V>}>`
  readonly $typeArgs: [ToTypeStr<V>]
  readonly $isPhantom: typeof Node.$isPhantom = Node.$isPhantom

  /** The score of node. */
  readonly score: ToField<'u64'>
  /** The next node score of node's each level. */
  readonly nexts: ToField<Vector<OptionU64>>
  /** The prev node score of node. */
  readonly prev: ToField<OptionU64>
  /** The data being stored */
  readonly value: ToField<V>

  private constructor(typeArgs: [ToTypeStr<V>], fields: NodeFields<V>) {
    this.$fullTypeName = composeSuiType(
      Node.$typeName,
      ...typeArgs,
    ) as `${string}::skip_list::Node<${ToTypeStr<V>}>`
    this.$typeArgs = typeArgs

    this.score = fields.score
    this.nexts = fields.nexts
    this.prev = fields.prev
    this.value = fields.value
  }

  static reified<V extends Reified<TypeArgument, any>>(
    V: V,
  ): NodeReified<ToTypeArgument<V>> {
    const reifiedBcs = Node.bcs(toBcs(V))
    return {
      get typeName() {
        return Node.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Node.$typeName,
          ...[extractType(V)],
        ) as `${string}::skip_list::Node<${ToTypeStr<ToTypeArgument<V>>}>`
      },
      get typeArgs() {
        return [extractType(V)] as [ToTypeStr<ToTypeArgument<V>>]
      },
      isPhantom: Node.$isPhantom,
      reifiedTypeArgs: [V],
      fromFields: (fields: Record<string, any>) => Node.fromFields(V, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Node.fromFieldsWithTypes(V, item),
      fromBcs: (data: Uint8Array) => Node.fromFields(V, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Node.fromJSONField(V, field),
      fromJSON: (json: Record<string, any>) => Node.fromJSON(V, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Node.fromCoreObject(V, obj),
      fromSuiParsedData: (content: SuiParsedData) => Node.fromSuiParsedData(V, content),
      fromSuiObjectData: (content: SuiObjectData) => Node.fromSuiObjectData(V, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Node.fetch(client, V, id),
      new: (fields: NodeFields<ToTypeArgument<V>>) => {
        return new Node([extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Node.reified {
    return Node.reified
  }

  static phantom<V extends Reified<TypeArgument, any>>(
    V: V,
  ): PhantomReified<ToTypeStr<Node<ToTypeArgument<V>>>> {
    return phantom(Node.reified(V))
  }

  static get p(): typeof Node.phantom {
    return Node.phantom
  }

  private static instantiateBcs() {
    return <V extends BcsType<any>>(V: V) =>
      bcs.struct(`Node<${V.name}>`, {
        score: bcs.u64(),
        nexts: bcs.vector(OptionU64.bcs),
        prev: OptionU64.bcs,
        value: V,
      })
  }

  private static cachedBcs: ReturnType<typeof Node.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Node.instantiateBcs> {
    if (!Node.cachedBcs) {
      Node.cachedBcs = Node.instantiateBcs()
    }
    return Node.cachedBcs
  }

  static fromFields<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    fields: Record<string, any>,
  ): Node<ToTypeArgument<V>> {
    return Node.reified(typeArg).new({
      score: decodeFromFields('u64', fields.score),
      nexts: decodeFromFields(vector(OptionU64.reified()), fields.nexts),
      prev: decodeFromFields(OptionU64.reified(), fields.prev),
      value: decodeFromFields(typeArg, fields.value),
    })
  }

  static fromFieldsWithTypes<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    item: FieldsWithTypes,
  ): Node<ToTypeArgument<V>> {
    if (!isNode(item.type)) {
      throw new Error('not a Node type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Node.reified(typeArg).new({
      score: decodeFromFieldsWithTypes('u64', item.fields.score),
      nexts: decodeFromFieldsWithTypes(vector(OptionU64.reified()), item.fields.nexts),
      prev: decodeFromFieldsWithTypes(OptionU64.reified(), item.fields.prev),
      value: decodeFromFieldsWithTypes(typeArg, item.fields.value),
    })
  }

  static fromBcs<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: Uint8Array,
  ): Node<ToTypeArgument<V>> {
    const typeArgs = [typeArg]
    return Node.fromFields(typeArg, Node.bcs(toBcs(typeArg)).parse(data))
  }

  toJSONField(): NodeJSONField<V> {
    return {
      score: this.score.toString(),
      nexts: fieldToJSON<Vector<OptionU64>>(`vector<${OptionU64.$typeName}>`, this.nexts),
      prev: this.prev.toJSONField(),
      value: fieldToJSON<V>(`${this.$typeArgs[0]}`, this.value),
    }
  }

  toJSON(): NodeJSON<V> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    field: any,
  ): Node<ToTypeArgument<V>> {
    return Node.reified(typeArg).new({
      score: decodeFromJSONField('u64', field.score),
      nexts: decodeFromJSONField(vector(OptionU64.reified()), field.nexts),
      prev: decodeFromJSONField(OptionU64.reified(), field.prev),
      value: decodeFromJSONField(typeArg, field.value),
    })
  }

  static fromJSON<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    json: Record<string, any>,
  ): Node<ToTypeArgument<V>> {
    if (json.$typeName !== Node.$typeName) {
      throw new Error(
        `not a Node json object: expected '${Node.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Node.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return Node.fromJSONField(typeArg, json)
  }

  static fromCoreObject<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Node<ToTypeArgument<V>> {
    if (!isNode(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Node object`)
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

    return Node.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Node.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    content: SuiParsedData,
  ): Node<ToTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isNode(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Node object`)
    }
    return Node.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Node.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: SuiObjectData,
  ): Node<ToTypeArgument<V>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isNode(data.bcs.type)) {
        throw new Error(`object at is not a Node object`)
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

      return Node.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Node.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<V extends Reified<TypeArgument, any>>(
    client: ClientWithCoreApi,
    typeArg: V,
    id: string,
  ): Promise<Node<ToTypeArgument<V>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isNode(object.type)) {
      throw new Error(`object at id ${id} is not a Node object`)
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

    return Node.fromBcs(typeArg, object.content)
  }
}

/* ============================== Item =============================== */

export function isItem(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('move-stl', 'skip_list::Item')}::skip_list::Item`
}

export interface ItemFields {
  n: ToField<'u64'>
  score: ToField<'u64'>
  finded: ToField<OptionU64>
}

export type ItemReified = Reified<Item, ItemFields>

export type ItemJSONField = {
  n: string
  score: string
  finded: ToJSON<OptionU64>
}

export type ItemJSON = {
  $typeName: typeof Item.$typeName
  $typeArgs: []
} & ItemJSONField

export class Item implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::skip_list::Item` {
    return `${getTypeOrigin('move-stl', 'skip_list::Item')}::skip_list::Item` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Item.$typeName = Item.$typeName
  readonly $fullTypeName: `${string}::skip_list::Item`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Item.$isPhantom = Item.$isPhantom

  readonly n: ToField<'u64'>
  readonly score: ToField<'u64'>
  readonly finded: ToField<OptionU64>

  private constructor(typeArgs: [], fields: ItemFields) {
    this.$fullTypeName = composeSuiType(
      Item.$typeName,
      ...typeArgs,
    ) as `${string}::skip_list::Item`
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
        ) as `${string}::skip_list::Item`
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
      finded: OptionU64.bcs,
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
      finded: decodeFromFields(OptionU64.reified(), fields.finded),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Item {
    if (!isItem(item.type)) {
      throw new Error('not a Item type')
    }

    return Item.reified().new({
      n: decodeFromFieldsWithTypes('u64', item.fields.n),
      score: decodeFromFieldsWithTypes('u64', item.fields.score),
      finded: decodeFromFieldsWithTypes(OptionU64.reified(), item.fields.finded),
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
      finded: decodeFromJSONField(OptionU64.reified(), field.finded),
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
