/**
 * A map collection where the keys are homogeneous and the values are heterogeneous. Both keys and
 * values are stored using Sui's object system (dynamic fields). Values must have `store`, `copy`,
 * and `drop` capabilities.
 */

import { bcs } from '@mysten/sui/bcs'
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
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../../_framework/util'
import { UID } from '../../../sui/object/structs'

/* ============================== DynamicMap =============================== */

export function isDynamicMap(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('access-management', 'dynamic_map::DynamicMap')}::dynamic_map::DynamicMap`
      + '<',
  )
}

export interface DynamicMapFields<K extends PhantomTypeArgument> {
  /** the ID of this map */
  id: ToField<UID>
  /** the number of key-value pairs in the map */
  size: ToField<'u64'>
}

export type DynamicMapReified<K extends PhantomTypeArgument> = Reified<
  DynamicMap<K>,
  DynamicMapFields<K>
>

export type DynamicMapJSONField<K extends PhantomTypeArgument> = {
  id: string
  size: string
}

export type DynamicMapJSON<K extends PhantomTypeArgument> = {
  $typeName: typeof DynamicMap.$typeName
  $typeArgs: [PhantomToTypeStr<K>]
} & DynamicMapJSONField<K>

/** A dynamic map where keys are homogeneous and values are heterogeneous. */
export class DynamicMap<K extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::dynamic_map::DynamicMap` {
    return `${
      getTypeOrigin('access-management', 'dynamic_map::DynamicMap')
    }::dynamic_map::DynamicMap` as const
  }
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof DynamicMap.$typeName = DynamicMap.$typeName
  readonly $fullTypeName: `${string}::dynamic_map::DynamicMap<${PhantomToTypeStr<K>}>`
  readonly $typeArgs: [PhantomToTypeStr<K>]
  readonly $isPhantom: typeof DynamicMap.$isPhantom = DynamicMap.$isPhantom

  /** the ID of this map */
  readonly id: ToField<UID>
  /** the number of key-value pairs in the map */
  readonly size: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<K>], fields: DynamicMapFields<K>) {
    this.$fullTypeName = composeSuiType(
      DynamicMap.$typeName,
      ...typeArgs,
    ) as `${string}::dynamic_map::DynamicMap<${PhantomToTypeStr<K>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.size = fields.size
  }

  static reified<K extends PhantomReified<PhantomTypeArgument>>(
    K: K,
  ): DynamicMapReified<ToPhantomTypeArgument<K>> {
    const reifiedBcs = DynamicMap.bcs
    return {
      get typeName() {
        return DynamicMap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          DynamicMap.$typeName,
          ...[extractType(K)],
        ) as `${string}::dynamic_map::DynamicMap<${PhantomToTypeStr<ToPhantomTypeArgument<K>>}>`
      },
      get typeArgs() {
        return [extractType(K)] as [PhantomToTypeStr<ToPhantomTypeArgument<K>>]
      },
      isPhantom: DynamicMap.$isPhantom,
      reifiedTypeArgs: [K],
      fromFields: (fields: Record<string, any>) => DynamicMap.fromFields(K, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => DynamicMap.fromFieldsWithTypes(K, item),
      fromBcs: (data: Uint8Array) => DynamicMap.fromFields(K, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => DynamicMap.fromJSONField(K, field),
      fromJSON: (json: Record<string, any>) => DynamicMap.fromJSON(K, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        DynamicMap.fromCoreObject(K, obj),
      fromSuiParsedData: (content: SuiParsedData) => DynamicMap.fromSuiParsedData(K, content),
      fromSuiObjectData: (content: SuiObjectData) => DynamicMap.fromSuiObjectData(K, content),
      fetch: async (client: ClientWithCoreApi, id: string) => DynamicMap.fetch(client, K, id),
      new: (fields: DynamicMapFields<ToPhantomTypeArgument<K>>) => {
        return new DynamicMap([extractType(K)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof DynamicMap.reified {
    return DynamicMap.reified
  }

  static phantom<K extends PhantomReified<PhantomTypeArgument>>(
    K: K,
  ): PhantomReified<ToTypeStr<DynamicMap<ToPhantomTypeArgument<K>>>> {
    return phantom(DynamicMap.reified(K))
  }

  static get p(): typeof DynamicMap.phantom {
    return DynamicMap.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('DynamicMap', {
      id: UID.bcs,
      size: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof DynamicMap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof DynamicMap.instantiateBcs> {
    if (!DynamicMap.cachedBcs) {
      DynamicMap.cachedBcs = DynamicMap.instantiateBcs()
    }
    return DynamicMap.cachedBcs
  }

  static fromFields<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    fields: Record<string, any>,
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    return DynamicMap.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      size: decodeFromFields('u64', fields.size),
    })
  }

  static fromFieldsWithTypes<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    item: FieldsWithTypes,
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (!isDynamicMap(item.type)) {
      throw new Error('not a DynamicMap type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return DynamicMap.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      size: decodeFromFieldsWithTypes('u64', item.fields.size),
    })
  }

  static fromBcs<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    data: Uint8Array,
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    return DynamicMap.fromFields(typeArg, DynamicMap.bcs.parse(data))
  }

  toJSONField(): DynamicMapJSONField<K> {
    return {
      id: this.id,
      size: this.size.toString(),
    }
  }

  toJSON(): DynamicMapJSON<K> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    field: any,
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    return DynamicMap.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      size: decodeFromJSONField('u64', field.size),
    })
  }

  static fromJSON<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    json: Record<string, any>,
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (json.$typeName !== DynamicMap.$typeName) {
      throw new Error(
        `not a DynamicMap json object: expected '${DynamicMap.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(DynamicMap.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return DynamicMap.fromJSONField(typeArg, json)
  }

  static fromCoreObject<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (!isDynamicMap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a DynamicMap object`)
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

    return DynamicMap.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DynamicMap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    content: SuiParsedData,
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDynamicMap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a DynamicMap object`)
    }
    return DynamicMap.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link DynamicMap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    data: SuiObjectData,
  ): DynamicMap<ToPhantomTypeArgument<K>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDynamicMap(data.bcs.type)) {
        throw new Error(`object at is not a DynamicMap object`)
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

      return DynamicMap.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return DynamicMap.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<K extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: K,
    id: string,
  ): Promise<DynamicMap<ToPhantomTypeArgument<K>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isDynamicMap(object.type)) {
      throw new Error(`object at id ${id} is not a DynamicMap object`)
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

    return DynamicMap.fromBcs(typeArg, object.content)
  }
}
