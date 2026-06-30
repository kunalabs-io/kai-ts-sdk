/**
 * This class represents a vector of objects wrapped
 * inside of a hot potato struct.
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

/* ============================== HotPotatoVector =============================== */

export function isHotPotatoVector(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('pyth', 'hot_potato_vector::HotPotatoVector')
    }::hot_potato_vector::HotPotatoVector` + '<',
  )
}

export interface HotPotatoVectorFields<T extends TypeArgument> {
  contents: ToField<Vector<T>>
}

export type HotPotatoVectorReified<T extends TypeArgument> = Reified<
  HotPotatoVector<T>,
  HotPotatoVectorFields<T>
>

export type HotPotatoVectorJSONField<T extends TypeArgument> = {
  contents: ToJSON<T>[]
}

export type HotPotatoVectorJSON<T extends TypeArgument> = {
  $typeName: typeof HotPotatoVector.$typeName
  $typeArgs: [ToTypeStr<T>]
} & HotPotatoVectorJSONField<T>

export class HotPotatoVector<T extends TypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::hot_potato_vector::HotPotatoVector` {
    return `${
      getTypeOrigin('pyth', 'hot_potato_vector::HotPotatoVector')
    }::hot_potato_vector::HotPotatoVector` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [false] as const

  readonly $typeName: typeof HotPotatoVector.$typeName = HotPotatoVector.$typeName
  readonly $fullTypeName: `${string}::hot_potato_vector::HotPotatoVector<${ToTypeStr<T>}>`
  readonly $typeArgs: [ToTypeStr<T>]
  readonly $isPhantom: typeof HotPotatoVector.$isPhantom = HotPotatoVector.$isPhantom

  readonly contents: ToField<Vector<T>>

  private constructor(typeArgs: [ToTypeStr<T>], fields: HotPotatoVectorFields<T>) {
    this.$fullTypeName = composeSuiType(
      HotPotatoVector.$typeName,
      ...typeArgs,
    ) as `${string}::hot_potato_vector::HotPotatoVector<${ToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.contents = fields.contents
  }

  static reified<T extends Reified<TypeArgument, any>>(
    T: T,
  ): HotPotatoVectorReified<ToTypeArgument<T>> {
    const reifiedBcs = HotPotatoVector.bcs(toBcs(T))
    return {
      get typeName() {
        return HotPotatoVector.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          HotPotatoVector.$typeName,
          ...[extractType(T)],
        ) as `${string}::hot_potato_vector::HotPotatoVector<${ToTypeStr<ToTypeArgument<T>>}>`
      },
      get typeArgs() {
        return [extractType(T)] as [ToTypeStr<ToTypeArgument<T>>]
      },
      isPhantom: HotPotatoVector.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => HotPotatoVector.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => HotPotatoVector.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => HotPotatoVector.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => HotPotatoVector.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => HotPotatoVector.fromJSON(T, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        HotPotatoVector.fromCoreObject(T, obj),
      fromSuiParsedData: (content: SuiParsedData) => HotPotatoVector.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => HotPotatoVector.fromSuiObjectData(T, content),
      fetch: async (client: ClientWithCoreApi, id: string) => HotPotatoVector.fetch(client, T, id),
      new: (fields: HotPotatoVectorFields<ToTypeArgument<T>>) => {
        return new HotPotatoVector([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof HotPotatoVector.reified {
    return HotPotatoVector.reified
  }

  static phantom<T extends Reified<TypeArgument, any>>(
    T: T,
  ): PhantomReified<ToTypeStr<HotPotatoVector<ToTypeArgument<T>>>> {
    return phantom(HotPotatoVector.reified(T))
  }

  static get p(): typeof HotPotatoVector.phantom {
    return HotPotatoVector.phantom
  }

  private static instantiateBcs() {
    return <T extends BcsType<any>>(T: T) =>
      bcs.struct(`HotPotatoVector<${T.name}>`, {
        contents: bcs.vector(T),
      })
  }

  private static cachedBcs: ReturnType<typeof HotPotatoVector.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof HotPotatoVector.instantiateBcs> {
    if (!HotPotatoVector.cachedBcs) {
      HotPotatoVector.cachedBcs = HotPotatoVector.instantiateBcs()
    }
    return HotPotatoVector.cachedBcs
  }

  static fromFields<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    fields: Record<string, any>,
  ): HotPotatoVector<ToTypeArgument<T>> {
    return HotPotatoVector.reified(typeArg).new({
      contents: decodeFromFields(vector(typeArg), fields.contents),
    })
  }

  static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): HotPotatoVector<ToTypeArgument<T>> {
    if (!isHotPotatoVector(item.type)) {
      throw new Error('not a HotPotatoVector type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return HotPotatoVector.reified(typeArg).new({
      contents: decodeFromFieldsWithTypes(vector(typeArg), item.fields.contents),
    })
  }

  static fromBcs<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    data: Uint8Array,
  ): HotPotatoVector<ToTypeArgument<T>> {
    const typeArgs = [typeArg]
    return HotPotatoVector.fromFields(typeArg, HotPotatoVector.bcs(toBcs(typeArg)).parse(data))
  }

  toJSONField(): HotPotatoVectorJSONField<T> {
    return {
      contents: fieldToJSON<Vector<T>>(`vector<${this.$typeArgs[0]}>`, this.contents),
    }
  }

  toJSON(): HotPotatoVectorJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    field: any,
  ): HotPotatoVector<ToTypeArgument<T>> {
    return HotPotatoVector.reified(typeArg).new({
      contents: decodeFromJSONField(vector(typeArg), field.contents),
    })
  }

  static fromJSON<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    json: Record<string, any>,
  ): HotPotatoVector<ToTypeArgument<T>> {
    if (json.$typeName !== HotPotatoVector.$typeName) {
      throw new Error(
        `not a HotPotatoVector json object: expected '${HotPotatoVector.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(HotPotatoVector.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return HotPotatoVector.fromJSONField(typeArg, json)
  }

  static fromCoreObject<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): HotPotatoVector<ToTypeArgument<T>> {
    if (!isHotPotatoVector(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a HotPotatoVector object`)
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

    return HotPotatoVector.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link HotPotatoVector.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    content: SuiParsedData,
  ): HotPotatoVector<ToTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isHotPotatoVector(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a HotPotatoVector object`)
    }
    return HotPotatoVector.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link HotPotatoVector.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<T extends Reified<TypeArgument, any>>(
    typeArg: T,
    data: SuiObjectData,
  ): HotPotatoVector<ToTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isHotPotatoVector(data.bcs.type)) {
        throw new Error(`object at is not a HotPotatoVector object`)
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

      return HotPotatoVector.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return HotPotatoVector.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends Reified<TypeArgument, any>>(
    client: ClientWithCoreApi,
    typeArg: T,
    id: string,
  ): Promise<HotPotatoVector<ToTypeArgument<T>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isHotPotatoVector(object.type)) {
      throw new Error(`object at id ${id} is not a HotPotatoVector object`)
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

    return HotPotatoVector.fromBcs(typeArg, object.content)
  }
}
