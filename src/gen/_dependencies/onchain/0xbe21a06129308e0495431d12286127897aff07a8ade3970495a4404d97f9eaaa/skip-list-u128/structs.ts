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
import { UID } from '../../0x2/object/structs'
import { Table } from '../../0x2/table/structs'
import { PKG_V1 } from '../index'
import { OptionU128 } from '../option-u128/structs'
import { Random } from '../random/structs'
import { BcsType, bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== SkipList =============================== */

export function isSkipList(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::skip_list_u128::SkipList` + '<')
}

export interface SkipListFields<T0 extends TypeArgument> {
  id: ToField<UID>
  head: ToField<Vector<OptionU128>>
  tail: ToField<OptionU128>
  level: ToField<'u64'>
  maxLevel: ToField<'u64'>
  listP: ToField<'u64'>
  random: ToField<Random>
  inner: ToField<Table<'u128', ToPhantom<SkipListNode<T0>>>>
}

export type SkipListReified<T0 extends TypeArgument> = Reified<SkipList<T0>, SkipListFields<T0>>

export class SkipList<T0 extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::skip_list_u128::SkipList`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName = SkipList.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::skip_list_u128::SkipList<${ToTypeStr<T0>}>`
  readonly $typeArgs: [ToTypeStr<T0>]
  readonly $isPhantom = SkipList.$isPhantom

  readonly id: ToField<UID>
  readonly head: ToField<Vector<OptionU128>>
  readonly tail: ToField<OptionU128>
  readonly level: ToField<'u64'>
  readonly maxLevel: ToField<'u64'>
  readonly listP: ToField<'u64'>
  readonly random: ToField<Random>
  readonly inner: ToField<Table<'u128', ToPhantom<SkipListNode<T0>>>>

  private constructor(typeArgs: [ToTypeStr<T0>], fields: SkipListFields<T0>) {
    this.$fullTypeName = composeSuiType(
      SkipList.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::skip_list_u128::SkipList<${ToTypeStr<T0>}>`
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

  static reified<T0 extends Reified<TypeArgument, any>>(
    T0: T0
  ): SkipListReified<ToTypeArgument<T0>> {
    return {
      typeName: SkipList.$typeName,
      fullTypeName: composeSuiType(
        SkipList.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::skip_list_u128::SkipList<${ToTypeStr<ToTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [ToTypeStr<ToTypeArgument<T0>>],
      isPhantom: SkipList.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => SkipList.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SkipList.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => SkipList.fromBcs(T0, data),
      bcs: SkipList.bcs(toBcs(T0)),
      fromJSONField: (field: any) => SkipList.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => SkipList.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => SkipList.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => SkipList.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => SkipList.fetch(client, T0, id),
      new: (fields: SkipListFields<ToTypeArgument<T0>>) => {
        return new SkipList([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SkipList.reified
  }

  static phantom<T0 extends Reified<TypeArgument, any>>(
    T0: T0
  ): PhantomReified<ToTypeStr<SkipList<ToTypeArgument<T0>>>> {
    return phantom(SkipList.reified(T0))
  }
  static get p() {
    return SkipList.phantom
  }

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`SkipList<${T0.name}>`, {
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

  static fromFields<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    fields: Record<string, any>
  ): SkipList<ToTypeArgument<T0>> {
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

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): SkipList<ToTypeArgument<T0>> {
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

  static fromBcs<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: Uint8Array
  ): SkipList<ToTypeArgument<T0>> {
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

  static fromJSONField<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    field: any
  ): SkipList<ToTypeArgument<T0>> {
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

  static fromJSON<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    json: Record<string, any>
  ): SkipList<ToTypeArgument<T0>> {
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

  static fromSuiParsedData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    content: SuiParsedData
  ): SkipList<ToTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSkipList(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SkipList object`)
    }
    return SkipList.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: SuiObjectData
  ): SkipList<ToTypeArgument<T0>> {
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

  static async fetch<T0 extends Reified<TypeArgument, any>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<SkipList<ToTypeArgument<T0>>> {
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
  return type.startsWith(`${PKG_V1}::skip_list_u128::SkipListNode` + '<')
}

export interface SkipListNodeFields<T0 extends TypeArgument> {
  score: ToField<'u128'>
  nexts: ToField<Vector<OptionU128>>
  prev: ToField<OptionU128>
  value: ToField<T0>
}

export type SkipListNodeReified<T0 extends TypeArgument> = Reified<
  SkipListNode<T0>,
  SkipListNodeFields<T0>
>

export class SkipListNode<T0 extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::skip_list_u128::SkipListNode`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName = SkipListNode.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::skip_list_u128::SkipListNode<${ToTypeStr<T0>}>`
  readonly $typeArgs: [ToTypeStr<T0>]
  readonly $isPhantom = SkipListNode.$isPhantom

  readonly score: ToField<'u128'>
  readonly nexts: ToField<Vector<OptionU128>>
  readonly prev: ToField<OptionU128>
  readonly value: ToField<T0>

  private constructor(typeArgs: [ToTypeStr<T0>], fields: SkipListNodeFields<T0>) {
    this.$fullTypeName = composeSuiType(
      SkipListNode.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::skip_list_u128::SkipListNode<${ToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.score = fields.score
    this.nexts = fields.nexts
    this.prev = fields.prev
    this.value = fields.value
  }

  static reified<T0 extends Reified<TypeArgument, any>>(
    T0: T0
  ): SkipListNodeReified<ToTypeArgument<T0>> {
    return {
      typeName: SkipListNode.$typeName,
      fullTypeName: composeSuiType(
        SkipListNode.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::skip_list_u128::SkipListNode<${ToTypeStr<ToTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [ToTypeStr<ToTypeArgument<T0>>],
      isPhantom: SkipListNode.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => SkipListNode.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SkipListNode.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => SkipListNode.fromBcs(T0, data),
      bcs: SkipListNode.bcs(toBcs(T0)),
      fromJSONField: (field: any) => SkipListNode.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => SkipListNode.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => SkipListNode.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => SkipListNode.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => SkipListNode.fetch(client, T0, id),
      new: (fields: SkipListNodeFields<ToTypeArgument<T0>>) => {
        return new SkipListNode([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SkipListNode.reified
  }

  static phantom<T0 extends Reified<TypeArgument, any>>(
    T0: T0
  ): PhantomReified<ToTypeStr<SkipListNode<ToTypeArgument<T0>>>> {
    return phantom(SkipListNode.reified(T0))
  }
  static get p() {
    return SkipListNode.phantom
  }

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`SkipListNode<${T0.name}>`, {
        score: bcs.u128(),
        nexts: bcs.vector(OptionU128.bcs),
        prev: OptionU128.bcs,
        value: T0,
      })
  }

  static fromFields<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    fields: Record<string, any>
  ): SkipListNode<ToTypeArgument<T0>> {
    return SkipListNode.reified(typeArg).new({
      score: decodeFromFields('u128', fields.score),
      nexts: decodeFromFields(reified.vector(OptionU128.reified()), fields.nexts),
      prev: decodeFromFields(OptionU128.reified(), fields.prev),
      value: decodeFromFields(typeArg, fields.value),
    })
  }

  static fromFieldsWithTypes<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): SkipListNode<ToTypeArgument<T0>> {
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

  static fromBcs<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: Uint8Array
  ): SkipListNode<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return SkipListNode.fromFields(typeArg, SkipListNode.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSONField() {
    return {
      score: this.score.toString(),
      nexts: fieldToJSON<Vector<OptionU128>>(`vector<${OptionU128.$typeName}>`, this.nexts),
      prev: this.prev.toJSONField(),
      value: fieldToJSON<T0>(this.$typeArgs[0], this.value),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    field: any
  ): SkipListNode<ToTypeArgument<T0>> {
    return SkipListNode.reified(typeArg).new({
      score: decodeFromJSONField('u128', field.score),
      nexts: decodeFromJSONField(reified.vector(OptionU128.reified()), field.nexts),
      prev: decodeFromJSONField(OptionU128.reified(), field.prev),
      value: decodeFromJSONField(typeArg, field.value),
    })
  }

  static fromJSON<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    json: Record<string, any>
  ): SkipListNode<ToTypeArgument<T0>> {
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

  static fromSuiParsedData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    content: SuiParsedData
  ): SkipListNode<ToTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSkipListNode(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SkipListNode object`)
    }
    return SkipListNode.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends Reified<TypeArgument, any>>(
    typeArg: T0,
    data: SuiObjectData
  ): SkipListNode<ToTypeArgument<T0>> {
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

  static async fetch<T0 extends Reified<TypeArgument, any>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<SkipListNode<ToTypeArgument<T0>>> {
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
  return type === `${PKG_V1}::skip_list_u128::Item`
}

export interface ItemFields {
  n: ToField<'u64'>
  score: ToField<'u64'>
  finded: ToField<OptionU128>
}

export type ItemReified = Reified<Item, ItemFields>

export class Item implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::skip_list_u128::Item`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Item.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::skip_list_u128::Item`
  readonly $typeArgs: []
  readonly $isPhantom = Item.$isPhantom

  readonly n: ToField<'u64'>
  readonly score: ToField<'u64'>
  readonly finded: ToField<OptionU128>

  private constructor(typeArgs: [], fields: ItemFields) {
    this.$fullTypeName = composeSuiType(
      Item.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::skip_list_u128::Item`
    this.$typeArgs = typeArgs

    this.n = fields.n
    this.score = fields.score
    this.finded = fields.finded
  }

  static reified(): ItemReified {
    return {
      typeName: Item.$typeName,
      fullTypeName: composeSuiType(
        Item.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::skip_list_u128::Item`,
      typeArgs: [] as [],
      isPhantom: Item.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Item.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Item.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Item.fromBcs(data),
      bcs: Item.bcs,
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

  static get bcs() {
    return bcs.struct('Item', {
      n: bcs.u64(),
      score: bcs.u64(),
      finded: OptionU128.bcs,
    })
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
