/**
 * This module implements a custom type that allows consuming a vector
 * incrementally for parsing operations. It has no drop ability, and the only
 * way to deallocate it is by calling the `destroy_empty` method, which will
 * fail if the whole input hasn't been consumed.
 *
 * This setup statically guarantees that the parsing methods consume the full
 * input.
 */

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

/* ============================== Cursor =============================== */

export function isCursor(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${getTypeOrigin('wormhole', 'cursor::Cursor')}::cursor::Cursor` + '<')
}

export interface CursorFields<T extends TypeArgument> {
  data: ToField<Vector<T>>
}

export type CursorReified<T extends TypeArgument> = Reified<Cursor<T>, CursorFields<T>>

export type CursorJSONField<T extends TypeArgument> = {
  data: ToJSON<T>[]
}

export type CursorJSON<T extends TypeArgument> = {
  $typeName: typeof Cursor.$typeName
  $typeArgs: [ToTypeStr<T>]
} & CursorJSONField<T>

/** Container for the underlying `vector<u8>` data to be consumed. */
export class Cursor<T extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::cursor::Cursor` {
    return `${getTypeOrigin('wormhole', 'cursor::Cursor')}::cursor::Cursor` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName: typeof Cursor.$typeName = Cursor.$typeName
  readonly $fullTypeName: `${string}::cursor::Cursor<${ToTypeStr<T>}>`
  readonly $typeArgs: [ToTypeStr<T>]
  readonly $isPhantom: typeof Cursor.$isPhantom = Cursor.$isPhantom

  readonly data: ToField<Vector<T>>

  private constructor(typeArgs: [ToTypeStr<T>], fields: CursorFields<T>) {
    this.$fullTypeName = composeSuiType(
      Cursor.$typeName,
      ...typeArgs,
    ) as `${string}::cursor::Cursor<${ToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.data = fields.data
  }

  static reified<T extends Reified<TypeArgument, any>>(
    T: T,
  ): CursorReified<ToTypeArgument<T>> {
    const reifiedBcs = Cursor.bcs(toBcs(T))
    return {
      get typeName() {
        return Cursor.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Cursor.$typeName,
          ...[extractType(T)],
        ) as `${string}::cursor::Cursor<${ToTypeStr<ToTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [ToTypeStr<ToTypeArgument<T>>]
      },
      isPhantom: Cursor.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => Cursor.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Cursor.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => Cursor.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Cursor.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => Cursor.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Cursor.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => Cursor.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => Cursor.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Cursor.fetch(client, T, id),
      new: (fields: CursorFields<ToTypeArgument<T>>) => {
        return new Cursor([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Cursor.reified {
    return Cursor.reified
  }

  static phantom<T extends Reified<TypeArgument, any>>(
    T: T,
  ): PhantomReified<ToTypeStr<Cursor<ToTypeArgument<T>>>> {
    return phantom(Cursor.reified(T))
  }

  static get p(): typeof Cursor.phantom {
    return Cursor.phantom
  }

  private static instantiateBcs() {
    return <T extends BcsType<any>>(T: T) =>
      bcs.struct(`Cursor<${T.name}>`, {
        data: bcs.vector(T),
      })
  }

  private static cachedBcs: ReturnType<typeof Cursor.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Cursor.instantiateBcs> {
    if (!Cursor.cachedBcs) {
      Cursor.cachedBcs = Cursor.instantiateBcs()
    }
    return Cursor.cachedBcs
  }

  static fromFields<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    fields: Record<string, any>,
  ): Cursor<ToTypeArgument<T>> {
    return Cursor.reified(typeArg).new({
      data: decodeFromFields(vector(typeArg), fields.data),
    })
  }

  static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): Cursor<ToTypeArgument<T>> {
    if (!isCursor(item.type)) {
      throw new Error('not a Cursor type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Cursor.reified(typeArg).new({
      data: decodeFromFieldsWithTypes(vector(typeArg), item.fields.data),
    })
  }

  static fromBcs<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    data: Uint8Array,
  ): Cursor<ToTypeArgument<T>> {
    const typeArgs = [typeArg]
    return Cursor.fromFields(typeArg, Cursor.bcs(toBcs(typeArg)).parse(data))
  }

  toJSONField(): CursorJSONField<T> {
    return {
      data: fieldToJSON<Vector<T>>(`vector<${this.$typeArgs[0]}>`, this.data),
    }
  }

  toJSON(): CursorJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    field: any,
  ): Cursor<ToTypeArgument<T>> {
    return Cursor.reified(typeArg).new({
      data: decodeFromJSONField(vector(typeArg), field.data),
    })
  }

  static fromJSON<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    json: Record<string, any>,
  ): Cursor<ToTypeArgument<T>> {
    if (json.$typeName !== Cursor.$typeName) {
      throw new Error(
        `not a Cursor json object: expected '${Cursor.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Cursor.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return Cursor.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Cursor<ToTypeArgument<T>> {
    if (!isCursor(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Cursor object`)
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

    return Cursor.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Cursor.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    content: SuiParsedData,
  ): Cursor<ToTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCursor(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Cursor object`)
    }
    return Cursor.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Cursor.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    data: SuiObjectData,
  ): Cursor<ToTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCursor(data.bcs.type)) {
        throw new Error(`object at is not a Cursor object`)
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

      return Cursor.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Cursor.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends Reified<TypeArgument, any>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<Cursor<ToTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCursor(object.type)) {
      throw new Error(`object at id ${id} is not a Cursor object`)
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

    return Cursor.fromBcs(typeArg, object.content)
  }
}
