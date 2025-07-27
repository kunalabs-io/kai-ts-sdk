import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeArgument,
  ToTypeStr,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  toBcs,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { UID } from '../../../../sui/object/structs'
import { Table } from '../../../../sui/table/structs'
import { PKG_V3 } from '../index'
import { OptionU128 } from '../option-u128/structs'
import { Random } from '../random/structs'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== SkipList =============================== */

export function isSkipList(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V3}::skip_list_u128::SkipList` + '<')
}

export interface SkipListFields<V extends TypeArgument> {
  id: ToField<UID>
  head: ToField<Vector<OptionU128>>
  tail: ToField<OptionU128>
  level: ToField<'u64'>
  maxLevel: ToField<'u64'>
  listP: ToField<'u64'>
  random: ToField<Random>
  inner: ToField<Table<'u128', ToPhantom<SkipListNode<V>>>>
}

export type SkipListReified<V extends TypeArgument> = Reified<SkipList<V>, SkipListFields<V>>

export class SkipList<V extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::skip_list_u128::SkipList`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName = SkipList.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::skip_list_u128::SkipList<${ToTypeStr<V>}>`
  readonly $typeArgs: [ToTypeStr<V>]
  readonly $isPhantom = SkipList.$isPhantom

  readonly id: ToField<UID>
  readonly head: ToField<Vector<OptionU128>>
  readonly tail: ToField<OptionU128>
  readonly level: ToField<'u64'>
  readonly maxLevel: ToField<'u64'>
  readonly listP: ToField<'u64'>
  readonly random: ToField<Random>
  readonly inner: ToField<Table<'u128', ToPhantom<SkipListNode<V>>>>

  private constructor(typeArgs: [ToTypeStr<V>], fields: SkipListFields<V>) {
    this.$fullTypeName = composeSuiType(
      SkipList.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::skip_list_u128::SkipList<${ToTypeStr<V>}>`
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

  static reified<V extends Reified<TypeArgument, any>>(V: V): SkipListReified<ToTypeArgument<V>> {
    const reifiedBcs = SkipList.bcs(toBcs(V))
    return {
      typeName: SkipList.$typeName,
      fullTypeName: composeSuiType(
        SkipList.$typeName,
        ...[extractType(V)]
      ) as `${typeof PKG_V3}::skip_list_u128::SkipList<${ToTypeStr<ToTypeArgument<V>>}>`,
      typeArgs: [extractType(V)] as [ToTypeStr<ToTypeArgument<V>>],
      isPhantom: SkipList.$isPhantom,
      reifiedTypeArgs: [V],
      fromFields: (fields: Record<string, any>) => SkipList.fromFields(V, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SkipList.fromFieldsWithTypes(V, item),
      fromBcs: (data: Uint8Array) => SkipList.fromFields(V, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SkipList.fromJSONField(V, field),
      fromJSON: (json: Record<string, any>) => SkipList.fromJSON(V, json),
      fromSuiParsedData: (content: SuiParsedData) => SkipList.fromSuiParsedData(V, content),
      fromSuiObjectData: (content: SuiObjectData) => SkipList.fromSuiObjectData(V, content),
      fetch: async (client: SuiClient, id: string) => SkipList.fetch(client, V, id),
      new: (fields: SkipListFields<ToTypeArgument<V>>) => {
        return new SkipList([extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SkipList.reified
  }

  static phantom<V extends Reified<TypeArgument, any>>(
    V: V
  ): PhantomReified<ToTypeStr<SkipList<ToTypeArgument<V>>>> {
    return phantom(SkipList.reified(V))
  }
  static get p() {
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

  static get bcs() {
    if (!SkipList.cachedBcs) {
      SkipList.cachedBcs = SkipList.instantiateBcs()
    }
    return SkipList.cachedBcs
  }

  static fromFields<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    fields: Record<string, any>
  ): SkipList<ToTypeArgument<V>> {
    return SkipList.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      head: decodeFromFields(reified.vector(OptionU128.reified()), fields.head),
      tail: decodeFromFields(OptionU128.reified(), fields.tail),
      level: decodeFromFields('u64', fields.level),
      maxLevel: decodeFromFields('u64', fields.max_level),
      listP: decodeFromFields('u64', fields.list_p),
      random: decodeFromFields(Random.reified(), fields.random),
      inner: decodeFromFields(
        Table.reified(reified.phantom('u128'), reified.phantom(SkipListNode.reified(typeArg))),
        fields.inner
      ),
    })
  }

  static fromFieldsWithTypes<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    item: FieldsWithTypes
  ): SkipList<ToTypeArgument<V>> {
    if (!isSkipList(item.type)) {
      throw new Error('not a SkipList type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return SkipList.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      head: decodeFromFieldsWithTypes(reified.vector(OptionU128.reified()), item.fields.head),
      tail: decodeFromFieldsWithTypes(OptionU128.reified(), item.fields.tail),
      level: decodeFromFieldsWithTypes('u64', item.fields.level),
      maxLevel: decodeFromFieldsWithTypes('u64', item.fields.max_level),
      listP: decodeFromFieldsWithTypes('u64', item.fields.list_p),
      random: decodeFromFieldsWithTypes(Random.reified(), item.fields.random),
      inner: decodeFromFieldsWithTypes(
        Table.reified(reified.phantom('u128'), reified.phantom(SkipListNode.reified(typeArg))),
        item.fields.inner
      ),
    })
  }

  static fromBcs<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: Uint8Array
  ): SkipList<ToTypeArgument<V>> {
    const typeArgs = [typeArg]

    return SkipList.fromFields(typeArg, SkipList.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSONField() {
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

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    field: any
  ): SkipList<ToTypeArgument<V>> {
    return SkipList.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      head: decodeFromJSONField(reified.vector(OptionU128.reified()), field.head),
      tail: decodeFromJSONField(OptionU128.reified(), field.tail),
      level: decodeFromJSONField('u64', field.level),
      maxLevel: decodeFromJSONField('u64', field.maxLevel),
      listP: decodeFromJSONField('u64', field.listP),
      random: decodeFromJSONField(Random.reified(), field.random),
      inner: decodeFromJSONField(
        Table.reified(reified.phantom('u128'), reified.phantom(SkipListNode.reified(typeArg))),
        field.inner
      ),
    })
  }

  static fromJSON<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    json: Record<string, any>
  ): SkipList<ToTypeArgument<V>> {
    if (json.$typeName !== SkipList.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(SkipList.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return SkipList.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    content: SuiParsedData
  ): SkipList<ToTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSkipList(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SkipList object`)
    }
    return SkipList.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: SuiObjectData
  ): SkipList<ToTypeArgument<V>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSkipList(data.bcs.type)) {
        throw new Error(`object at is not a SkipList object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return SkipList.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SkipList.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<V extends Reified<TypeArgument, any>>(
    client: SuiClient,
    typeArg: V,
    id: string
  ): Promise<SkipList<ToTypeArgument<V>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SkipList object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSkipList(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SkipList object`)
    }

    return SkipList.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== SkipListNode =============================== */

export function isSkipListNode(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V3}::skip_list_u128::SkipListNode` + '<')
}

export interface SkipListNodeFields<V extends TypeArgument> {
  score: ToField<'u128'>
  nexts: ToField<Vector<OptionU128>>
  prev: ToField<OptionU128>
  value: ToField<V>
}

export type SkipListNodeReified<V extends TypeArgument> = Reified<
  SkipListNode<V>,
  SkipListNodeFields<V>
>

export class SkipListNode<V extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::skip_list_u128::SkipListNode`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName = SkipListNode.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::skip_list_u128::SkipListNode<${ToTypeStr<V>}>`
  readonly $typeArgs: [ToTypeStr<V>]
  readonly $isPhantom = SkipListNode.$isPhantom

  readonly score: ToField<'u128'>
  readonly nexts: ToField<Vector<OptionU128>>
  readonly prev: ToField<OptionU128>
  readonly value: ToField<V>

  private constructor(typeArgs: [ToTypeStr<V>], fields: SkipListNodeFields<V>) {
    this.$fullTypeName = composeSuiType(
      SkipListNode.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::skip_list_u128::SkipListNode<${ToTypeStr<V>}>`
    this.$typeArgs = typeArgs

    this.score = fields.score
    this.nexts = fields.nexts
    this.prev = fields.prev
    this.value = fields.value
  }

  static reified<V extends Reified<TypeArgument, any>>(
    V: V
  ): SkipListNodeReified<ToTypeArgument<V>> {
    const reifiedBcs = SkipListNode.bcs(toBcs(V))
    return {
      typeName: SkipListNode.$typeName,
      fullTypeName: composeSuiType(
        SkipListNode.$typeName,
        ...[extractType(V)]
      ) as `${typeof PKG_V3}::skip_list_u128::SkipListNode<${ToTypeStr<ToTypeArgument<V>>}>`,
      typeArgs: [extractType(V)] as [ToTypeStr<ToTypeArgument<V>>],
      isPhantom: SkipListNode.$isPhantom,
      reifiedTypeArgs: [V],
      fromFields: (fields: Record<string, any>) => SkipListNode.fromFields(V, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SkipListNode.fromFieldsWithTypes(V, item),
      fromBcs: (data: Uint8Array) => SkipListNode.fromFields(V, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SkipListNode.fromJSONField(V, field),
      fromJSON: (json: Record<string, any>) => SkipListNode.fromJSON(V, json),
      fromSuiParsedData: (content: SuiParsedData) => SkipListNode.fromSuiParsedData(V, content),
      fromSuiObjectData: (content: SuiObjectData) => SkipListNode.fromSuiObjectData(V, content),
      fetch: async (client: SuiClient, id: string) => SkipListNode.fetch(client, V, id),
      new: (fields: SkipListNodeFields<ToTypeArgument<V>>) => {
        return new SkipListNode([extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SkipListNode.reified
  }

  static phantom<V extends Reified<TypeArgument, any>>(
    V: V
  ): PhantomReified<ToTypeStr<SkipListNode<ToTypeArgument<V>>>> {
    return phantom(SkipListNode.reified(V))
  }
  static get p() {
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

  static get bcs() {
    if (!SkipListNode.cachedBcs) {
      SkipListNode.cachedBcs = SkipListNode.instantiateBcs()
    }
    return SkipListNode.cachedBcs
  }

  static fromFields<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    fields: Record<string, any>
  ): SkipListNode<ToTypeArgument<V>> {
    return SkipListNode.reified(typeArg).new({
      score: decodeFromFields('u128', fields.score),
      nexts: decodeFromFields(reified.vector(OptionU128.reified()), fields.nexts),
      prev: decodeFromFields(OptionU128.reified(), fields.prev),
      value: decodeFromFields(typeArg, fields.value),
    })
  }

  static fromFieldsWithTypes<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    item: FieldsWithTypes
  ): SkipListNode<ToTypeArgument<V>> {
    if (!isSkipListNode(item.type)) {
      throw new Error('not a SkipListNode type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return SkipListNode.reified(typeArg).new({
      score: decodeFromFieldsWithTypes('u128', item.fields.score),
      nexts: decodeFromFieldsWithTypes(reified.vector(OptionU128.reified()), item.fields.nexts),
      prev: decodeFromFieldsWithTypes(OptionU128.reified(), item.fields.prev),
      value: decodeFromFieldsWithTypes(typeArg, item.fields.value),
    })
  }

  static fromBcs<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: Uint8Array
  ): SkipListNode<ToTypeArgument<V>> {
    const typeArgs = [typeArg]

    return SkipListNode.fromFields(typeArg, SkipListNode.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSONField() {
    return {
      score: this.score.toString(),
      nexts: fieldToJSON<Vector<OptionU128>>(`vector<${OptionU128.$typeName}>`, this.nexts),
      prev: this.prev.toJSONField(),
      value: fieldToJSON<V>(this.$typeArgs[0], this.value),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    field: any
  ): SkipListNode<ToTypeArgument<V>> {
    return SkipListNode.reified(typeArg).new({
      score: decodeFromJSONField('u128', field.score),
      nexts: decodeFromJSONField(reified.vector(OptionU128.reified()), field.nexts),
      prev: decodeFromJSONField(OptionU128.reified(), field.prev),
      value: decodeFromJSONField(typeArg, field.value),
    })
  }

  static fromJSON<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    json: Record<string, any>
  ): SkipListNode<ToTypeArgument<V>> {
    if (json.$typeName !== SkipListNode.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(SkipListNode.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return SkipListNode.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    content: SuiParsedData
  ): SkipListNode<ToTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSkipListNode(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SkipListNode object`)
    }
    return SkipListNode.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<V extends Reified<TypeArgument, any>>(
    typeArg: V,
    data: SuiObjectData
  ): SkipListNode<ToTypeArgument<V>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSkipListNode(data.bcs.type)) {
        throw new Error(`object at is not a SkipListNode object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return SkipListNode.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SkipListNode.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<V extends Reified<TypeArgument, any>>(
    client: SuiClient,
    typeArg: V,
    id: string
  ): Promise<SkipListNode<ToTypeArgument<V>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SkipListNode object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSkipListNode(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SkipListNode object`)
    }

    return SkipListNode.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== Item =============================== */

export function isItem(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V3}::skip_list_u128::Item`
}

export interface ItemFields {
  n: ToField<'u64'>
  score: ToField<'u64'>
  finded: ToField<OptionU128>
}

export type ItemReified = Reified<Item, ItemFields>

export class Item implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V3}::skip_list_u128::Item`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Item.$typeName
  readonly $fullTypeName: `${typeof PKG_V3}::skip_list_u128::Item`
  readonly $typeArgs: []
  readonly $isPhantom = Item.$isPhantom

  readonly n: ToField<'u64'>
  readonly score: ToField<'u64'>
  readonly finded: ToField<OptionU128>

  private constructor(typeArgs: [], fields: ItemFields) {
    this.$fullTypeName = composeSuiType(
      Item.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V3}::skip_list_u128::Item`
    this.$typeArgs = typeArgs

    this.n = fields.n
    this.score = fields.score
    this.finded = fields.finded
  }

  static reified(): ItemReified {
    const reifiedBcs = Item.bcs
    return {
      typeName: Item.$typeName,
      fullTypeName: composeSuiType(
        Item.$typeName,
        ...[]
      ) as `${typeof PKG_V3}::skip_list_u128::Item`,
      typeArgs: [] as [],
      isPhantom: Item.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Item.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Item.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Item.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Item.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Item.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Item.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Item.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Item.fetch(client, id),
      new: (fields: ItemFields) => {
        return new Item([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Item.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Item>> {
    return phantom(Item.reified())
  }
  static get p() {
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

  static get bcs() {
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

  toJSONField() {
    return {
      n: this.n.toString(),
      score: this.score.toString(),
      finded: this.finded.toJSONField(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return Item.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Item {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isItem(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Item object`)
    }
    return Item.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Item {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isItem(data.bcs.type)) {
        throw new Error(`object at is not a Item object`)
      }

      return Item.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Item.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Item> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Item object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isItem(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Item object`)
    }

    return Item.fromSuiObjectData(res.data)
  }
}
