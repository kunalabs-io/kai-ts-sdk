/**
 * Note: this module is adapted from Wormhole's version_control.move module.
 *
 * This module implements dynamic field keys as empty structs. These keys are
 * used to determine the latest version for this build. If the current version
 * is not this build's, then paths through the `state` module will abort.
 *
 * See `pyth::state` and `wormhole::package_utils` for more info.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
} from '../../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../../_framework/util'

/* ============================== V__0_1_2 =============================== */

export function isV__0_1_2(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('pyth-1', 'version_control::V__0_1_2')}::version_control::V__0_1_2`
}

export interface V__0_1_2Fields {
  dummyField: ToField<'bool'>
}

export type V__0_1_2Reified = Reified<V__0_1_2, V__0_1_2Fields>

export type V__0_1_2JSONField = {
  dummyField: boolean
}

export type V__0_1_2JSON = {
  $typeName: typeof V__0_1_2.$typeName
  $typeArgs: []
} & V__0_1_2JSONField

/**
 * RELEASE NOTES
 *
 * - Gas optimizations on merkle tree verifications
 */
export class V__0_1_2 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::version_control::V__0_1_2` {
    return `${
      getTypeOrigin('pyth-1', 'version_control::V__0_1_2')
    }::version_control::V__0_1_2` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof V__0_1_2.$typeName = V__0_1_2.$typeName
  readonly $fullTypeName: `${string}::version_control::V__0_1_2`
  readonly $typeArgs: []
  readonly $isPhantom: typeof V__0_1_2.$isPhantom = V__0_1_2.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: V__0_1_2Fields) {
    this.$fullTypeName = composeSuiType(
      V__0_1_2.$typeName,
      ...typeArgs,
    ) as `${string}::version_control::V__0_1_2`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): V__0_1_2Reified {
    const reifiedBcs = V__0_1_2.bcs
    return {
      get typeName() {
        return V__0_1_2.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          V__0_1_2.$typeName,
          ...[],
        ) as `${string}::version_control::V__0_1_2`
      },
      typeArgs: [] as [],
      isPhantom: V__0_1_2.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => V__0_1_2.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => V__0_1_2.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => V__0_1_2.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => V__0_1_2.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => V__0_1_2.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        V__0_1_2.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => V__0_1_2.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => V__0_1_2.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => V__0_1_2.fetch(client, id),
      new: (fields: V__0_1_2Fields) => {
        return new V__0_1_2([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): V__0_1_2Reified {
    return V__0_1_2.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<V__0_1_2>> {
    return phantom(V__0_1_2.reified())
  }

  static get p(): PhantomReified<ToTypeStr<V__0_1_2>> {
    return V__0_1_2.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('V__0_1_2', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof V__0_1_2.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof V__0_1_2.instantiateBcs> {
    if (!V__0_1_2.cachedBcs) {
      V__0_1_2.cachedBcs = V__0_1_2.instantiateBcs()
    }
    return V__0_1_2.cachedBcs
  }

  static fromFields(fields: Record<string, any>): V__0_1_2 {
    return V__0_1_2.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): V__0_1_2 {
    if (!isV__0_1_2(item.type)) {
      throw new Error('not a V__0_1_2 type')
    }

    return V__0_1_2.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): V__0_1_2 {
    return V__0_1_2.fromFields(V__0_1_2.bcs.parse(data))
  }

  toJSONField(): V__0_1_2JSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): V__0_1_2JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): V__0_1_2 {
    return V__0_1_2.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): V__0_1_2 {
    if (json.$typeName !== V__0_1_2.$typeName) {
      throw new Error(
        `not a V__0_1_2 json object: expected '${V__0_1_2.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return V__0_1_2.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): V__0_1_2 {
    if (!isV__0_1_2(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a V__0_1_2 object`)
    }
    return V__0_1_2.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link V__0_1_2.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): V__0_1_2 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isV__0_1_2(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a V__0_1_2 object`)
    }
    return V__0_1_2.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link V__0_1_2.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): V__0_1_2 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isV__0_1_2(data.bcs.type)) {
        throw new Error(`object at is not a V__0_1_2 object`)
      }

      return V__0_1_2.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return V__0_1_2.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<V__0_1_2> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isV__0_1_2(object.type)) {
      throw new Error(`object at id ${id} is not a V__0_1_2 object`)
    }
    return V__0_1_2.fromBcs(object.content)
  }
}

/* ============================== V__0_1_1 =============================== */

export function isV__0_1_1(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('pyth-1', 'version_control::V__0_1_1')}::version_control::V__0_1_1`
}

export interface V__0_1_1Fields {
  dummyField: ToField<'bool'>
}

export type V__0_1_1Reified = Reified<V__0_1_1, V__0_1_1Fields>

export type V__0_1_1JSONField = {
  dummyField: boolean
}

export type V__0_1_1JSON = {
  $typeName: typeof V__0_1_1.$typeName
  $typeArgs: []
} & V__0_1_1JSONField

/**
 * RELEASE NOTES
 *
 * - Refactor state to use package management via
 * `wormhole::package_utils`.
 * - Add `MigrateComplete` event in `migrate`.
 *
 * Also added `migrate__v__0_1_1` in `wormhole::state`, which is
 * meant to perform a one-time `State` modification via `migrate`.
 */
export class V__0_1_1 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::version_control::V__0_1_1` {
    return `${
      getTypeOrigin('pyth-1', 'version_control::V__0_1_1')
    }::version_control::V__0_1_1` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof V__0_1_1.$typeName = V__0_1_1.$typeName
  readonly $fullTypeName: `${string}::version_control::V__0_1_1`
  readonly $typeArgs: []
  readonly $isPhantom: typeof V__0_1_1.$isPhantom = V__0_1_1.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: V__0_1_1Fields) {
    this.$fullTypeName = composeSuiType(
      V__0_1_1.$typeName,
      ...typeArgs,
    ) as `${string}::version_control::V__0_1_1`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): V__0_1_1Reified {
    const reifiedBcs = V__0_1_1.bcs
    return {
      get typeName() {
        return V__0_1_1.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          V__0_1_1.$typeName,
          ...[],
        ) as `${string}::version_control::V__0_1_1`
      },
      typeArgs: [] as [],
      isPhantom: V__0_1_1.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => V__0_1_1.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => V__0_1_1.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => V__0_1_1.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => V__0_1_1.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => V__0_1_1.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        V__0_1_1.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => V__0_1_1.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => V__0_1_1.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => V__0_1_1.fetch(client, id),
      new: (fields: V__0_1_1Fields) => {
        return new V__0_1_1([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): V__0_1_1Reified {
    return V__0_1_1.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<V__0_1_1>> {
    return phantom(V__0_1_1.reified())
  }

  static get p(): PhantomReified<ToTypeStr<V__0_1_1>> {
    return V__0_1_1.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('V__0_1_1', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof V__0_1_1.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof V__0_1_1.instantiateBcs> {
    if (!V__0_1_1.cachedBcs) {
      V__0_1_1.cachedBcs = V__0_1_1.instantiateBcs()
    }
    return V__0_1_1.cachedBcs
  }

  static fromFields(fields: Record<string, any>): V__0_1_1 {
    return V__0_1_1.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): V__0_1_1 {
    if (!isV__0_1_1(item.type)) {
      throw new Error('not a V__0_1_1 type')
    }

    return V__0_1_1.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): V__0_1_1 {
    return V__0_1_1.fromFields(V__0_1_1.bcs.parse(data))
  }

  toJSONField(): V__0_1_1JSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): V__0_1_1JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): V__0_1_1 {
    return V__0_1_1.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): V__0_1_1 {
    if (json.$typeName !== V__0_1_1.$typeName) {
      throw new Error(
        `not a V__0_1_1 json object: expected '${V__0_1_1.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return V__0_1_1.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): V__0_1_1 {
    if (!isV__0_1_1(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a V__0_1_1 object`)
    }
    return V__0_1_1.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link V__0_1_1.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): V__0_1_1 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isV__0_1_1(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a V__0_1_1 object`)
    }
    return V__0_1_1.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link V__0_1_1.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): V__0_1_1 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isV__0_1_1(data.bcs.type)) {
        throw new Error(`object at is not a V__0_1_1 object`)
      }

      return V__0_1_1.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return V__0_1_1.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<V__0_1_1> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isV__0_1_1(object.type)) {
      throw new Error(`object at id ${id} is not a V__0_1_1 object`)
    }
    return V__0_1_1.fromBcs(object.content)
  }
}

/* ============================== V__DUMMY =============================== */

export function isV__DUMMY(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('pyth-1', 'version_control::V__DUMMY')}::version_control::V__DUMMY`
}

export interface V__DUMMYFields {
  dummyField: ToField<'bool'>
}

export type V__DUMMYReified = Reified<V__DUMMY, V__DUMMYFields>

export type V__DUMMYJSONField = {
  dummyField: boolean
}

export type V__DUMMYJSON = {
  $typeName: typeof V__DUMMY.$typeName
  $typeArgs: []
} & V__DUMMYJSONField

export class V__DUMMY implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::version_control::V__DUMMY` {
    return `${
      getTypeOrigin('pyth-1', 'version_control::V__DUMMY')
    }::version_control::V__DUMMY` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof V__DUMMY.$typeName = V__DUMMY.$typeName
  readonly $fullTypeName: `${string}::version_control::V__DUMMY`
  readonly $typeArgs: []
  readonly $isPhantom: typeof V__DUMMY.$isPhantom = V__DUMMY.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: V__DUMMYFields) {
    this.$fullTypeName = composeSuiType(
      V__DUMMY.$typeName,
      ...typeArgs,
    ) as `${string}::version_control::V__DUMMY`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): V__DUMMYReified {
    const reifiedBcs = V__DUMMY.bcs
    return {
      get typeName() {
        return V__DUMMY.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          V__DUMMY.$typeName,
          ...[],
        ) as `${string}::version_control::V__DUMMY`
      },
      typeArgs: [] as [],
      isPhantom: V__DUMMY.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => V__DUMMY.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => V__DUMMY.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => V__DUMMY.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => V__DUMMY.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => V__DUMMY.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        V__DUMMY.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => V__DUMMY.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => V__DUMMY.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => V__DUMMY.fetch(client, id),
      new: (fields: V__DUMMYFields) => {
        return new V__DUMMY([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): V__DUMMYReified {
    return V__DUMMY.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<V__DUMMY>> {
    return phantom(V__DUMMY.reified())
  }

  static get p(): PhantomReified<ToTypeStr<V__DUMMY>> {
    return V__DUMMY.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('V__DUMMY', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof V__DUMMY.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof V__DUMMY.instantiateBcs> {
    if (!V__DUMMY.cachedBcs) {
      V__DUMMY.cachedBcs = V__DUMMY.instantiateBcs()
    }
    return V__DUMMY.cachedBcs
  }

  static fromFields(fields: Record<string, any>): V__DUMMY {
    return V__DUMMY.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): V__DUMMY {
    if (!isV__DUMMY(item.type)) {
      throw new Error('not a V__DUMMY type')
    }

    return V__DUMMY.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): V__DUMMY {
    return V__DUMMY.fromFields(V__DUMMY.bcs.parse(data))
  }

  toJSONField(): V__DUMMYJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): V__DUMMYJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): V__DUMMY {
    return V__DUMMY.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): V__DUMMY {
    if (json.$typeName !== V__DUMMY.$typeName) {
      throw new Error(
        `not a V__DUMMY json object: expected '${V__DUMMY.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return V__DUMMY.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): V__DUMMY {
    if (!isV__DUMMY(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a V__DUMMY object`)
    }
    return V__DUMMY.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link V__DUMMY.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): V__DUMMY {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isV__DUMMY(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a V__DUMMY object`)
    }
    return V__DUMMY.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link V__DUMMY.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): V__DUMMY {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isV__DUMMY(data.bcs.type)) {
        throw new Error(`object at is not a V__DUMMY object`)
      }

      return V__DUMMY.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return V__DUMMY.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<V__DUMMY> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isV__DUMMY(object.type)) {
      throw new Error(`object at id ${id} is not a V__DUMMY object`)
    }
    return V__DUMMY.fromBcs(object.content)
  }
}
