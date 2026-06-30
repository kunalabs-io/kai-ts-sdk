/**
 * This module implements a custom type that resembles the set data structure.
 * `Set` leverages `sui::table` to store unique keys of the same type.
 *
 * NOTE: Items added to this data structure cannot be removed.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
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
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'
import { Table } from '../../sui/table/structs'

/* ============================== Empty =============================== */

export function isEmpty(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole', 'set::Empty')}::set::Empty`
}

export interface EmptyFields {
  dummyField: ToField<'bool'>
}

export type EmptyReified = Reified<Empty, EmptyFields>

export type EmptyJSONField = {
  dummyField: boolean
}

export type EmptyJSON = {
  $typeName: typeof Empty.$typeName
  $typeArgs: []
} & EmptyJSONField

/** Empty struct. Used as the value type in mappings to encode a set */
export class Empty implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::set::Empty` {
    return `${getTypeOrigin('wormhole', 'set::Empty')}::set::Empty` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Empty.$typeName = Empty.$typeName
  readonly $fullTypeName: `${string}::set::Empty`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Empty.$isPhantom = Empty.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: EmptyFields) {
    this.$fullTypeName = composeSuiType(
      Empty.$typeName,
      ...typeArgs,
    ) as `${string}::set::Empty`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): EmptyReified {
    const reifiedBcs = Empty.bcs
    return {
      get typeName() {
        return Empty.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Empty.$typeName,
          ...[],
        ) as `${string}::set::Empty`
      },
      typeArgs: [] as [],
      isPhantom: Empty.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Empty.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Empty.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Empty.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Empty.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Empty.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Empty.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Empty.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Empty.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Empty.fetch(client, id),
      new: (fields: EmptyFields) => {
        return new Empty([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): EmptyReified {
    return Empty.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Empty>> {
    return phantom(Empty.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Empty>> {
    return Empty.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Empty', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Empty.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Empty.instantiateBcs> {
    if (!Empty.cachedBcs) {
      Empty.cachedBcs = Empty.instantiateBcs()
    }
    return Empty.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Empty {
    return Empty.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Empty {
    if (!isEmpty(item.type)) {
      throw new Error('not a Empty type')
    }

    return Empty.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): Empty {
    return Empty.fromFields(Empty.bcs.parse(data))
  }

  toJSONField(): EmptyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): EmptyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Empty {
    return Empty.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): Empty {
    if (json.$typeName !== Empty.$typeName) {
      throw new Error(
        `not a Empty json object: expected '${Empty.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Empty.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Empty {
    if (!isEmpty(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Empty object`)
    }
    return Empty.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Empty.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Empty {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEmpty(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Empty object`)
    }
    return Empty.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Empty.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Empty {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEmpty(data.bcs.type)) {
        throw new Error(`object at is not a Empty object`)
      }

      return Empty.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Empty.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Empty> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEmpty(object.type)) {
      throw new Error(`object at id ${id} is not a Empty object`)
    }
    return Empty.fromBcs(object.content)
  }
}

/* ============================== Set =============================== */

export function isSet(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${getTypeOrigin('wormhole', 'set::Set')}::set::Set` + '<')
}

export interface SetFields<T extends PhantomTypeArgument> {
  items: ToField<Table<T, ToPhantom<Empty>>>
}

export type SetReified<T extends PhantomTypeArgument> = Reified<Set<T>, SetFields<T>>

export type SetJSONField<T extends PhantomTypeArgument> = {
  items: ToJSON<Table<T, ToPhantom<Empty>>>
}

export type SetJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof Set.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & SetJSONField<T>

/**
 * A set containing elements of type `T` with support for membership
 * checking.
 */
export class Set<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::set::Set` {
    return `${getTypeOrigin('wormhole', 'set::Set')}::set::Set` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof Set.$typeName = Set.$typeName
  readonly $fullTypeName: `${string}::set::Set<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof Set.$isPhantom = Set.$isPhantom

  readonly items: ToField<Table<T, ToPhantom<Empty>>>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: SetFields<T>) {
    this.$fullTypeName = composeSuiType(
      Set.$typeName,
      ...typeArgs,
    ) as `${string}::set::Set<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.items = fields.items
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): SetReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = Set.bcs
    return {
      get typeName() {
        return Set.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Set.$typeName,
          ...[extractType(T)],
        ) as `${string}::set::Set<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>]
      },
      isPhantom: Set.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => Set.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Set.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Set.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Set.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => Set.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Set.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => Set.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => Set.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Set.fetch(client, T, id),
      new: (fields: SetFields<ToPhantomTypeArgument<T>>) => {
        return new Set([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Set.reified {
    return Set.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<Set<ToPhantomTypeArgument<T>>>> {
    return phantom(Set.reified(T))
  }

  static get p(): typeof Set.phantom {
    return Set.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Set', {
      items: Table.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Set.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Set.instantiateBcs> {
    if (!Set.cachedBcs) {
      Set.cachedBcs = Set.instantiateBcs()
    }
    return Set.cachedBcs
  }

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): Set<ToPhantomTypeArgument<T>> {
    return Set.reified(typeArg).new({
      items: decodeFromFields(Table.reified(typeArg, phantom(Empty.reified())), fields.items),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): Set<ToPhantomTypeArgument<T>> {
    if (!isSet(item.type)) {
      throw new Error('not a Set type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Set.reified(typeArg).new({
      items: decodeFromFieldsWithTypes(
        Table.reified(typeArg, phantom(Empty.reified())),
        item.fields.items,
      ),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): Set<ToPhantomTypeArgument<T>> {
    return Set.fromFields(typeArg, Set.bcs.parse(data))
  }

  toJSONField(): SetJSONField<T> {
    return {
      items: this.items.toJSONField(),
    }
  }

  toJSON(): SetJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): Set<ToPhantomTypeArgument<T>> {
    return Set.reified(typeArg).new({
      items: decodeFromJSONField(Table.reified(typeArg, phantom(Empty.reified())), field.items),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): Set<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== Set.$typeName) {
      throw new Error(
        `not a Set json object: expected '${Set.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Set.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return Set.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Set<ToPhantomTypeArgument<T>> {
    if (!isSet(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Set object`)
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

    return Set.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Set.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): Set<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSet(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Set object`)
    }
    return Set.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Set.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): Set<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSet(data.bcs.type)) {
        throw new Error(`object at is not a Set object`)
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

      return Set.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Set.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<Set<ToPhantomTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSet(object.type)) {
      throw new Error(`object at id ${id} is not a Set object`)
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

    return Set.fromBcs(typeArg, object.content)
  }
}
