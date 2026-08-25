/**
 * `sui::scratch` is an ephemeral, per-transaction key-value store. Unlike `sui::dynamic_field`,
 * scratch entries are not attached to any object, and are instead dropped at the end of the
 * transaction.
 *
 * Each entry is identified by the pair of its key type and key value, hashed together in the same
 * way as a dynamic field name (see `sui::dynamic_field::hash_type_and_key`).
 *
 * All access (mutable and immutable) is controlled through the module that defines the key type
 * `K`. The functions are gated by a `Permit<K>`, which can be granted via an
 * `internal::Permit<K>`.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
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
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'

/* ============================== Permit =============================== */

export function isPermit(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`0x2::scratch::Permit` + '<')
}

export interface PermitFields<K extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type PermitReified<K extends PhantomTypeArgument> = Reified<Permit<K>, PermitFields<K>>

export type PermitJSONField<K extends PhantomTypeArgument> = {
  dummyField: boolean
}

export type PermitJSON<K extends PhantomTypeArgument> = {
  $typeName: typeof Permit.$typeName
  $typeArgs: [PhantomToTypeStr<K>]
} & PermitJSONField<K>

/**
 * A `Permit<K>` gates access to all entries keyed by values of type `K`.
 * It is issued from an `internal::Permit<K>`, allowing the module that defines `K` to control
 * all access to scratch entries.
 */
export class Permit<K extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::scratch::Permit` = `0x2::scratch::Permit` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof Permit.$typeName = Permit.$typeName
  readonly $fullTypeName: `0x2::scratch::Permit<${PhantomToTypeStr<K>}>`
  readonly $typeArgs: [PhantomToTypeStr<K>]
  readonly $isPhantom: typeof Permit.$isPhantom = Permit.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<K>], fields: PermitFields<K>) {
    this.$fullTypeName = composeSuiType(
      Permit.$typeName,
      ...typeArgs,
    ) as `0x2::scratch::Permit<${PhantomToTypeStr<K>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<K extends PhantomReified<PhantomTypeArgument>>(
    K: K,
  ): PermitReified<ToPhantomTypeArgument<K>> {
    const reifiedBcs = Permit.bcs
    return {
      get typeName() {
        return Permit.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Permit.$typeName,
          ...[extractType(K)],
        ) as `0x2::scratch::Permit<${PhantomToTypeStr<ToPhantomTypeArgument<K>>}>`
      },
      get typeArgs() {
        return [extractType(K)] as [PhantomToTypeStr<ToPhantomTypeArgument<K>>]
      },
      isPhantom: Permit.$isPhantom,
      reifiedTypeArgs: [K],
      fromFields: (fields: Record<string, any>) => Permit.fromFields(K, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Permit.fromFieldsWithTypes(K, item),
      fromBcs: (data: Uint8Array) => Permit.fromFields(K, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Permit.fromJSONField(K, field),
      fromJSON: (json: Record<string, any>) => Permit.fromJSON(K, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Permit.fromCoreObject(K, obj),
      fromSuiParsedData: (content: SuiParsedData) => Permit.fromSuiParsedData(K, content),
      fromSuiObjectData: (content: SuiObjectData) => Permit.fromSuiObjectData(K, content),
      fetch: async (client: ClientWithCoreApi, id: string) => Permit.fetch(client, K, id),
      new: (fields: PermitFields<ToPhantomTypeArgument<K>>) => {
        return new Permit([extractType(K)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Permit.reified {
    return Permit.reified
  }

  static phantom<K extends PhantomReified<PhantomTypeArgument>>(
    K: K,
  ): PhantomReified<ToTypeStr<Permit<ToPhantomTypeArgument<K>>>> {
    return phantom(Permit.reified(K))
  }

  static get p(): typeof Permit.phantom {
    return Permit.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Permit', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Permit.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Permit.instantiateBcs> {
    if (!Permit.cachedBcs) {
      Permit.cachedBcs = Permit.instantiateBcs()
    }
    return Permit.cachedBcs
  }

  static fromFields<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    fields: Record<string, any>,
  ): Permit<ToPhantomTypeArgument<K>> {
    return Permit.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    item: FieldsWithTypes,
  ): Permit<ToPhantomTypeArgument<K>> {
    if (!isPermit(item.type)) {
      throw new Error('not a Permit type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return Permit.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    data: Uint8Array,
  ): Permit<ToPhantomTypeArgument<K>> {
    return Permit.fromFields(typeArg, Permit.bcs.parse(data))
  }

  toJSONField(): PermitJSONField<K> {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): PermitJSON<K> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    field: any,
  ): Permit<ToPhantomTypeArgument<K>> {
    return Permit.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    json: Record<string, any>,
  ): Permit<ToPhantomTypeArgument<K>> {
    if (json.$typeName !== Permit.$typeName) {
      throw new Error(
        `not a Permit json object: expected '${Permit.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Permit.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return Permit.fromJSONField(typeArg, json)
  }

  static fromCoreObject<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Permit<ToPhantomTypeArgument<K>> {
    if (!isPermit(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Permit object`)
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

    return Permit.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Permit.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    content: SuiParsedData,
  ): Permit<ToPhantomTypeArgument<K>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPermit(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Permit object`)
    }
    return Permit.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Permit.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<K extends PhantomReified<PhantomTypeArgument>>(
    typeArg: K,
    data: SuiObjectData,
  ): Permit<ToPhantomTypeArgument<K>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPermit(data.bcs.type)) {
        throw new Error(`object at is not a Permit object`)
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

      return Permit.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Permit.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<K extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: K,
    id: string,
  ): Promise<Permit<ToPhantomTypeArgument<K>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPermit(object.type)) {
      throw new Error(`object at id ${id} is not a Permit object`)
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

    return Permit.fromBcs(typeArg, object.content)
  }
}

/* ============================== BorrowMarker =============================== */

export function isBorrowMarker(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`0x2::scratch::BorrowMarker` + '<')
}

export interface BorrowMarkerFields<V extends PhantomTypeArgument> {
  pos0: ToField<'u64'>
}

export type BorrowMarkerReified<V extends PhantomTypeArgument> = Reified<
  BorrowMarker<V>,
  BorrowMarkerFields<V>
>

export type BorrowMarkerJSONField<V extends PhantomTypeArgument> = {
  pos0: string
}

export type BorrowMarkerJSON<V extends PhantomTypeArgument> = {
  $typeName: typeof BorrowMarker.$typeName
  $typeArgs: [PhantomToTypeStr<V>]
} & BorrowMarkerJSONField<V>

/**
 * Occupies a key's slot while `get_do`, `get_fold`, or their mutable variants have the value of
 * type `V` removed, so nothing can add to or read the slot while the value is being "borrowed".
 * Each one carries a transaction-unique id, so a marker cannot be forged to match one in use.
 */
export class BorrowMarker<V extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::scratch::BorrowMarker` = `0x2::scratch::BorrowMarker` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof BorrowMarker.$typeName = BorrowMarker.$typeName
  readonly $fullTypeName: `0x2::scratch::BorrowMarker<${PhantomToTypeStr<V>}>`
  readonly $typeArgs: [PhantomToTypeStr<V>]
  readonly $isPhantom: typeof BorrowMarker.$isPhantom = BorrowMarker.$isPhantom

  readonly pos0: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<V>], fields: BorrowMarkerFields<V>) {
    this.$fullTypeName = composeSuiType(
      BorrowMarker.$typeName,
      ...typeArgs,
    ) as `0x2::scratch::BorrowMarker<${PhantomToTypeStr<V>}>`
    this.$typeArgs = typeArgs

    this.pos0 = fields.pos0
  }

  static reified<V extends PhantomReified<PhantomTypeArgument>>(
    V: V,
  ): BorrowMarkerReified<ToPhantomTypeArgument<V>> {
    const reifiedBcs = BorrowMarker.bcs
    return {
      get typeName() {
        return BorrowMarker.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowMarker.$typeName,
          ...[extractType(V)],
        ) as `0x2::scratch::BorrowMarker<${PhantomToTypeStr<ToPhantomTypeArgument<V>>}>`
      },
      get typeArgs() {
        return [extractType(V)] as [PhantomToTypeStr<ToPhantomTypeArgument<V>>]
      },
      isPhantom: BorrowMarker.$isPhantom,
      reifiedTypeArgs: [V],
      fromFields: (fields: Record<string, any>) => BorrowMarker.fromFields(V, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowMarker.fromFieldsWithTypes(V, item),
      fromBcs: (data: Uint8Array) => BorrowMarker.fromFields(V, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowMarker.fromJSONField(V, field),
      fromJSON: (json: Record<string, any>) => BorrowMarker.fromJSON(V, json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowMarker.fromCoreObject(V, obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowMarker.fromSuiParsedData(V, content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowMarker.fromSuiObjectData(V, content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowMarker.fetch(client, V, id),
      new: (fields: BorrowMarkerFields<ToPhantomTypeArgument<V>>) => {
        return new BorrowMarker([extractType(V)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof BorrowMarker.reified {
    return BorrowMarker.reified
  }

  static phantom<V extends PhantomReified<PhantomTypeArgument>>(
    V: V,
  ): PhantomReified<ToTypeStr<BorrowMarker<ToPhantomTypeArgument<V>>>> {
    return phantom(BorrowMarker.reified(V))
  }

  static get p(): typeof BorrowMarker.phantom {
    return BorrowMarker.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowMarker', {
      pos0: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowMarker.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowMarker.instantiateBcs> {
    if (!BorrowMarker.cachedBcs) {
      BorrowMarker.cachedBcs = BorrowMarker.instantiateBcs()
    }
    return BorrowMarker.cachedBcs
  }

  static fromFields<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    fields: Record<string, any>,
  ): BorrowMarker<ToPhantomTypeArgument<V>> {
    return BorrowMarker.reified(typeArg).new({
      pos0: decodeFromFields('u64', fields.pos0),
    })
  }

  static fromFieldsWithTypes<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    item: FieldsWithTypes,
  ): BorrowMarker<ToPhantomTypeArgument<V>> {
    if (!isBorrowMarker(item.type)) {
      throw new Error('not a BorrowMarker type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return BorrowMarker.reified(typeArg).new({
      pos0: decodeFromFieldsWithTypes('u64', item.fields.pos0),
    })
  }

  static fromBcs<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    data: Uint8Array,
  ): BorrowMarker<ToPhantomTypeArgument<V>> {
    return BorrowMarker.fromFields(typeArg, BorrowMarker.bcs.parse(data))
  }

  toJSONField(): BorrowMarkerJSONField<V> {
    return {
      pos0: this.pos0.toString(),
    }
  }

  toJSON(): BorrowMarkerJSON<V> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    field: any,
  ): BorrowMarker<ToPhantomTypeArgument<V>> {
    return BorrowMarker.reified(typeArg).new({
      pos0: decodeFromJSONField('u64', field.pos0),
    })
  }

  static fromJSON<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    json: Record<string, any>,
  ): BorrowMarker<ToPhantomTypeArgument<V>> {
    if (json.$typeName !== BorrowMarker.$typeName) {
      throw new Error(
        `not a BorrowMarker json object: expected '${BorrowMarker.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(BorrowMarker.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return BorrowMarker.fromJSONField(typeArg, json)
  }

  static fromCoreObject<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    obj: SuiClientTypes.Object<{ content: true }>,
  ): BorrowMarker<ToPhantomTypeArgument<V>> {
    if (!isBorrowMarker(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowMarker object`)
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

    return BorrowMarker.fromBcs(typeArg, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowMarker.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    content: SuiParsedData,
  ): BorrowMarker<ToPhantomTypeArgument<V>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowMarker(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowMarker object`)
    }
    return BorrowMarker.fromFieldsWithTypes(typeArg, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowMarker.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<V extends PhantomReified<PhantomTypeArgument>>(
    typeArg: V,
    data: SuiObjectData,
  ): BorrowMarker<ToPhantomTypeArgument<V>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowMarker(data.bcs.type)) {
        throw new Error(`object at is not a BorrowMarker object`)
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

      return BorrowMarker.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowMarker.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<V extends PhantomReified<PhantomTypeArgument>>(
    client: ClientWithCoreApi,
    typeArg: V,
    id: string,
  ): Promise<BorrowMarker<ToPhantomTypeArgument<V>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowMarker(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowMarker object`)
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

    return BorrowMarker.fromBcs(typeArg, object.content)
  }
}

/* ============================== BorrowMarkerKey =============================== */

export function isBorrowMarkerKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `0x2::scratch::BorrowMarkerKey`
}

export interface BorrowMarkerKeyFields {
  dummyField: ToField<'bool'>
}

export type BorrowMarkerKeyReified = Reified<BorrowMarkerKey, BorrowMarkerKeyFields>

export type BorrowMarkerKeyJSONField = {
  dummyField: boolean
}

export type BorrowMarkerKeyJSON = {
  $typeName: typeof BorrowMarkerKey.$typeName
  $typeArgs: []
} & BorrowMarkerKeyJSONField

/** Key for the scratch entry that holds the monotonic counter backing `borrow_marker`. */
export class BorrowMarkerKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `0x2::scratch::BorrowMarkerKey` =
    `0x2::scratch::BorrowMarkerKey` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowMarkerKey.$typeName = BorrowMarkerKey.$typeName
  readonly $fullTypeName: `0x2::scratch::BorrowMarkerKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowMarkerKey.$isPhantom = BorrowMarkerKey.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BorrowMarkerKeyFields) {
    this.$fullTypeName = composeSuiType(
      BorrowMarkerKey.$typeName,
      ...typeArgs,
    ) as `0x2::scratch::BorrowMarkerKey`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BorrowMarkerKeyReified {
    const reifiedBcs = BorrowMarkerKey.bcs
    return {
      get typeName() {
        return BorrowMarkerKey.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowMarkerKey.$typeName,
          ...[],
        ) as `0x2::scratch::BorrowMarkerKey`
      },
      typeArgs: [] as [],
      isPhantom: BorrowMarkerKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowMarkerKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowMarkerKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowMarkerKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowMarkerKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowMarkerKey.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowMarkerKey.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowMarkerKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowMarkerKey.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowMarkerKey.fetch(client, id),
      new: (fields: BorrowMarkerKeyFields) => {
        return new BorrowMarkerKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowMarkerKeyReified {
    return BorrowMarkerKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowMarkerKey>> {
    return phantom(BorrowMarkerKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowMarkerKey>> {
    return BorrowMarkerKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowMarkerKey', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowMarkerKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowMarkerKey.instantiateBcs> {
    if (!BorrowMarkerKey.cachedBcs) {
      BorrowMarkerKey.cachedBcs = BorrowMarkerKey.instantiateBcs()
    }
    return BorrowMarkerKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowMarkerKey {
    return BorrowMarkerKey.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowMarkerKey {
    if (!isBorrowMarkerKey(item.type)) {
      throw new Error('not a BorrowMarkerKey type')
    }

    return BorrowMarkerKey.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): BorrowMarkerKey {
    return BorrowMarkerKey.fromFields(BorrowMarkerKey.bcs.parse(data))
  }

  toJSONField(): BorrowMarkerKeyJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): BorrowMarkerKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowMarkerKey {
    return BorrowMarkerKey.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowMarkerKey {
    if (json.$typeName !== BorrowMarkerKey.$typeName) {
      throw new Error(
        `not a BorrowMarkerKey json object: expected '${BorrowMarkerKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowMarkerKey.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowMarkerKey {
    if (!isBorrowMarkerKey(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowMarkerKey object`)
    }
    return BorrowMarkerKey.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowMarkerKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowMarkerKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowMarkerKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowMarkerKey object`)
    }
    return BorrowMarkerKey.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowMarkerKey.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowMarkerKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowMarkerKey(data.bcs.type)) {
        throw new Error(`object at is not a BorrowMarkerKey object`)
      }

      return BorrowMarkerKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowMarkerKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowMarkerKey> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowMarkerKey(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowMarkerKey object`)
    }
    return BorrowMarkerKey.fromBcs(object.content)
  }
}
