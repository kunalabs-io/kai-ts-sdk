/** A set data structure. */

import { bcs, BcsType } from '@mysten/sui/bcs'
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
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { Table } from '../../sui/table/structs'

/* ============================== Unit =============================== */

export function isUnit(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('pyth', 'set::Unit')}::set::Unit`
}

export interface UnitFields {
  dummyField: ToField<'bool'>
}

export type UnitReified = Reified<Unit, UnitFields>

export type UnitJSONField = {
  dummyField: boolean
}

export type UnitJSON = {
  $typeName: typeof Unit.$typeName
  $typeArgs: []
} & UnitJSONField

/** Empty struct. Used as the value type in mappings to encode a set */
export class Unit implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::set::Unit` {
    return `${getTypeOrigin('pyth', 'set::Unit')}::set::Unit` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Unit.$typeName = Unit.$typeName
  readonly $fullTypeName: `${string}::set::Unit`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Unit.$isPhantom = Unit.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: UnitFields) {
    this.$fullTypeName = composeSuiType(
      Unit.$typeName,
      ...typeArgs,
    ) as `${string}::set::Unit`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): UnitReified {
    const reifiedBcs = Unit.bcs
    return {
      get typeName() {
        return Unit.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Unit.$typeName,
          ...[],
        ) as `${string}::set::Unit`
      },
      typeArgs: [] as [],
      isPhantom: Unit.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Unit.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Unit.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Unit.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Unit.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Unit.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Unit.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Unit.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Unit.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Unit.fetch(client, id),
      new: (fields: UnitFields) => {
        return new Unit([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UnitReified {
    return Unit.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Unit>> {
    return phantom(Unit.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Unit>> {
    return Unit.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Unit', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Unit.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Unit.instantiateBcs> {
    if (!Unit.cachedBcs) {
      Unit.cachedBcs = Unit.instantiateBcs()
    }
    return Unit.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Unit {
    return Unit.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Unit {
    if (!isUnit(item.type)) {
      throw new Error('not a Unit type')
    }

    return Unit.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): Unit {
    return Unit.fromFields(Unit.bcs.parse(data))
  }

  toJSONField(): UnitJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): UnitJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Unit {
    return Unit.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): Unit {
    if (json.$typeName !== Unit.$typeName) {
      throw new Error(
        `not a Unit json object: expected '${Unit.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Unit.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Unit {
    if (!isUnit(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Unit object`)
    }
    return Unit.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Unit.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Unit {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUnit(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Unit object`)
    }
    return Unit.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Unit.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Unit {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUnit(data.bcs.type)) {
        throw new Error(`object at is not a Unit object`)
      }

      return Unit.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Unit.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Unit> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUnit(object.type)) {
      throw new Error(`object at id ${id} is not a Unit object`)
    }
    return Unit.fromBcs(object.content)
  }
}

/* ============================== Set =============================== */

export function isSet(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${getTypeOrigin('pyth', 'set::Set')}::set::Set` + '<')
}

export interface SetFields<A extends TypeArgument> {
  keys: ToField<Vector<A>>
  elems: ToField<Table<ToPhantom<A>, ToPhantom<Unit>>>
}

export type SetReified<A extends TypeArgument> = Reified<Set<A>, SetFields<A>>

export type SetJSONField<A extends TypeArgument> = {
  keys: ToJSON<A>[]
  elems: ToJSON<Table<ToPhantom<A>, ToPhantom<Unit>>>
}

export type SetJSON<A extends TypeArgument> = {
  $typeName: typeof Set.$typeName
  $typeArgs: [ToTypeStr<A>]
} & SetJSONField<A>

/**
 * A set containing elements of type `A` with support for membership
 * checking.
 */
export class Set<A extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::set::Set` {
    return `${getTypeOrigin('pyth', 'set::Set')}::set::Set` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName: typeof Set.$typeName = Set.$typeName
  readonly $fullTypeName: `${string}::set::Set<${ToTypeStr<A>}>`
  readonly $typeArgs: [ToTypeStr<A>]
  readonly $isPhantom: typeof Set.$isPhantom = Set.$isPhantom

  readonly keys: ToField<Vector<A>>
  readonly elems: ToField<Table<ToPhantom<A>, ToPhantom<Unit>>>

  private constructor(typeArgs: [ToTypeStr<A>], fields: SetFields<A>) {
    this.$fullTypeName = composeSuiType(
      Set.$typeName,
      ...typeArgs,
    ) as `${string}::set::Set<${ToTypeStr<A>}>`
    this.$typeArgs = typeArgs

    this.keys = fields.keys
    this.elems = fields.elems
  }

  static reified<A extends Reified<TypeArgument, any>>(
    A: A,
  ): SetReified<ToTypeArgument<A>> {
    const reifiedBcs = Set.bcs(toBcs(A))
    return {
      get typeName() {
        return Set.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Set.$typeName,
          ...[extractType(A)],
        ) as `${string}::set::Set<${ToTypeStr<ToTypeArgument<A>>}>`
      },
      get typeArgs() {
        return [extractType(A)] as [ToTypeStr<ToTypeArgument<A>>]
      },
      isPhantom: Set.$isPhantom,
      reifiedTypeArgs: [A],
      fromFields: (fields: Record<string, any>) => Set.fromFields(A, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Set.fromFieldsWithTypes(A, item),
      fromBcs: (data: Uint8Array) => Set.fromFields(A, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Set.fromJSONField(A, field),
      fromJSON: (json: Record<string, any>) => Set.fromJSON(A, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Set.fromCoreObject(A, obj),
      fromSuiParsedData: (content: SuiParsedData) => Set.fromSuiParsedData(A, content),
      fromSuiObjectData: (content: SuiObjectData) => Set.fromSuiObjectData(A, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Set.fetch(client, A, id),
      new: (fields: SetFields<ToTypeArgument<A>>) => {
        return new Set([extractType(A)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Set.reified {
    return Set.reified
  }

  static phantom<A extends Reified<TypeArgument, any>>(
    A: A,
  ): PhantomReified<ToTypeStr<Set<ToTypeArgument<A>>>> {
    return phantom(Set.reified(A))
  }

  static get p(): typeof Set.phantom {
    return Set.phantom
  }

  private static instantiateBcs() {
    return <A extends BcsType<any>>(A: A) =>
      bcs.struct(`Set<${A.name}>`, {
        keys: bcs.vector(A),
        elems: Table.bcs,
      })
  }

  private static cachedBcs: ReturnType<typeof Set.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Set.instantiateBcs> {
    if (!Set.cachedBcs) {
      Set.cachedBcs = Set.instantiateBcs()
    }
    return Set.cachedBcs
  }

  static fromFields<A extends Reified<TypeArgument, any>>(
    typeArg: A,
    fields: Record<string, any>,
  ): Set<ToTypeArgument<A>> {
    return Set.reified(typeArg).new({
      keys: decodeFromFields(vector(typeArg), fields.keys),
      elems: decodeFromFields(
        Table.reified(phantom(typeArg), phantom(Unit.reified())),
        fields.elems,
      ),
    })
  }

  static fromFieldsWithTypes<A extends Reified<TypeArgument, any>>(
    typeArg: A,
    item: FieldsWithTypes,
  ): Set<ToTypeArgument<A>> {
    if (!isSet(item.type)) {
      throw new Error('not a Set type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Set.reified(typeArg).new({
      keys: decodeFromFieldsWithTypes(vector(typeArg), item.fields.keys),
      elems: decodeFromFieldsWithTypes(
        Table.reified(phantom(typeArg), phantom(Unit.reified())),
        item.fields.elems,
      ),
    })
  }

  static fromBcs<A extends Reified<TypeArgument, any>>(
    typeArg: A,
    data: Uint8Array,
  ): Set<ToTypeArgument<A>> {
    const typeArgs = [typeArg]
    return Set.fromFields(typeArg, Set.bcs(toBcs(typeArg)).parse(data))
  }

  toJSONField(): SetJSONField<A> {
    return {
      keys: fieldToJSON<Vector<A>>(`vector<${this.$typeArgs[0]}>`, this.keys),
      elems: this.elems.toJSONField(),
    }
  }

  toJSON(): SetJSON<A> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<A extends Reified<TypeArgument, any>>(
    typeArg: A,
    field: any,
  ): Set<ToTypeArgument<A>> {
    return Set.reified(typeArg).new({
      keys: decodeFromJSONField(vector(typeArg), field.keys),
      elems: decodeFromJSONField(
        Table.reified(phantom(typeArg), phantom(Unit.reified())),
        field.elems,
      ),
    })
  }

  static fromJSON<A extends Reified<TypeArgument, any>>(
    typeArg: A,
    json: Record<string, any>,
  ): Set<ToTypeArgument<A>> {
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

  static fromCoreObject<A extends Reified<TypeArgument, any>>(
    typeArg: A,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Set<ToTypeArgument<A>> {
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
  static fromSuiParsedData<A extends Reified<TypeArgument, any>>(
    typeArg: A,
    content: SuiParsedData,
  ): Set<ToTypeArgument<A>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSet(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Set object`)
    }
    return Set.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Set.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<A extends Reified<TypeArgument, any>>(
    typeArg: A,
    data: SuiObjectData,
  ): Set<ToTypeArgument<A>> {
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

  static async fetch<A extends Reified<TypeArgument, any>>(
    client: ClientWithCoreApi,
    typeArg: A,
    id: string,
  ): Promise<Set<ToTypeArgument<A>>> {
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
