/**
 * This module implements a capability (`EmitterCap`), which allows one to send
 * Wormhole messages. Its external address is determined by the capability's
 * `id`, which is a 32-byte vector.
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
import { ID, UID } from '../../../sui/object/structs'

/* ============================== EmitterCreated =============================== */

export function isEmitterCreated(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('wormhole-1', 'emitter::EmitterCreated')}::emitter::EmitterCreated`
}

export interface EmitterCreatedFields {
  emitterCap: ToField<ID>
}

export type EmitterCreatedReified = Reified<EmitterCreated, EmitterCreatedFields>

export type EmitterCreatedJSONField = {
  emitterCap: string
}

export type EmitterCreatedJSON = {
  $typeName: typeof EmitterCreated.$typeName
  $typeArgs: []
} & EmitterCreatedJSONField

/** Event reflecting when `new` is called. */
export class EmitterCreated implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::emitter::EmitterCreated` {
    return `${
      getTypeOrigin('wormhole-1', 'emitter::EmitterCreated')
    }::emitter::EmitterCreated` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof EmitterCreated.$typeName = EmitterCreated.$typeName
  readonly $fullTypeName: `${string}::emitter::EmitterCreated`
  readonly $typeArgs: []
  readonly $isPhantom: typeof EmitterCreated.$isPhantom = EmitterCreated.$isPhantom

  readonly emitterCap: ToField<ID>

  private constructor(typeArgs: [], fields: EmitterCreatedFields) {
    this.$fullTypeName = composeSuiType(
      EmitterCreated.$typeName,
      ...typeArgs,
    ) as `${string}::emitter::EmitterCreated`
    this.$typeArgs = typeArgs

    this.emitterCap = fields.emitterCap
  }

  static reified(): EmitterCreatedReified {
    const reifiedBcs = EmitterCreated.bcs
    return {
      get typeName() {
        return EmitterCreated.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          EmitterCreated.$typeName,
          ...[],
        ) as `${string}::emitter::EmitterCreated`
      },
      typeArgs: [] as [],
      isPhantom: EmitterCreated.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => EmitterCreated.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => EmitterCreated.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => EmitterCreated.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => EmitterCreated.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => EmitterCreated.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        EmitterCreated.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => EmitterCreated.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => EmitterCreated.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => EmitterCreated.fetch(client, id),
      new: (fields: EmitterCreatedFields) => {
        return new EmitterCreated([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): EmitterCreatedReified {
    return EmitterCreated.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<EmitterCreated>> {
    return phantom(EmitterCreated.reified())
  }

  static get p(): PhantomReified<ToTypeStr<EmitterCreated>> {
    return EmitterCreated.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('EmitterCreated', {
      emitter_cap: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof EmitterCreated.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof EmitterCreated.instantiateBcs> {
    if (!EmitterCreated.cachedBcs) {
      EmitterCreated.cachedBcs = EmitterCreated.instantiateBcs()
    }
    return EmitterCreated.cachedBcs
  }

  static fromFields(fields: Record<string, any>): EmitterCreated {
    return EmitterCreated.reified().new({
      emitterCap: decodeFromFields(ID.reified(), fields.emitter_cap),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): EmitterCreated {
    if (!isEmitterCreated(item.type)) {
      throw new Error('not a EmitterCreated type')
    }

    return EmitterCreated.reified().new({
      emitterCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.emitter_cap),
    })
  }

  static fromBcs(data: Uint8Array): EmitterCreated {
    return EmitterCreated.fromFields(EmitterCreated.bcs.parse(data))
  }

  toJSONField(): EmitterCreatedJSONField {
    return {
      emitterCap: this.emitterCap,
    }
  }

  toJSON(): EmitterCreatedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): EmitterCreated {
    return EmitterCreated.reified().new({
      emitterCap: decodeFromJSONField(ID.reified(), field.emitterCap),
    })
  }

  static fromJSON(json: Record<string, any>): EmitterCreated {
    if (json.$typeName !== EmitterCreated.$typeName) {
      throw new Error(
        `not a EmitterCreated json object: expected '${EmitterCreated.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return EmitterCreated.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): EmitterCreated {
    if (!isEmitterCreated(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a EmitterCreated object`)
    }
    return EmitterCreated.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EmitterCreated.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): EmitterCreated {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEmitterCreated(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EmitterCreated object`)
    }
    return EmitterCreated.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EmitterCreated.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): EmitterCreated {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEmitterCreated(data.bcs.type)) {
        throw new Error(`object at is not a EmitterCreated object`)
      }

      return EmitterCreated.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EmitterCreated.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<EmitterCreated> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEmitterCreated(object.type)) {
      throw new Error(`object at id ${id} is not a EmitterCreated object`)
    }
    return EmitterCreated.fromBcs(object.content)
  }
}

/* ============================== EmitterDestroyed =============================== */

export function isEmitterDestroyed(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('wormhole-1', 'emitter::EmitterDestroyed')}::emitter::EmitterDestroyed`
}

export interface EmitterDestroyedFields {
  emitterCap: ToField<ID>
}

export type EmitterDestroyedReified = Reified<EmitterDestroyed, EmitterDestroyedFields>

export type EmitterDestroyedJSONField = {
  emitterCap: string
}

export type EmitterDestroyedJSON = {
  $typeName: typeof EmitterDestroyed.$typeName
  $typeArgs: []
} & EmitterDestroyedJSONField

/** Event reflecting when `destroy` is called. */
export class EmitterDestroyed implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::emitter::EmitterDestroyed` {
    return `${
      getTypeOrigin('wormhole-1', 'emitter::EmitterDestroyed')
    }::emitter::EmitterDestroyed` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof EmitterDestroyed.$typeName = EmitterDestroyed.$typeName
  readonly $fullTypeName: `${string}::emitter::EmitterDestroyed`
  readonly $typeArgs: []
  readonly $isPhantom: typeof EmitterDestroyed.$isPhantom = EmitterDestroyed.$isPhantom

  readonly emitterCap: ToField<ID>

  private constructor(typeArgs: [], fields: EmitterDestroyedFields) {
    this.$fullTypeName = composeSuiType(
      EmitterDestroyed.$typeName,
      ...typeArgs,
    ) as `${string}::emitter::EmitterDestroyed`
    this.$typeArgs = typeArgs

    this.emitterCap = fields.emitterCap
  }

  static reified(): EmitterDestroyedReified {
    const reifiedBcs = EmitterDestroyed.bcs
    return {
      get typeName() {
        return EmitterDestroyed.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          EmitterDestroyed.$typeName,
          ...[],
        ) as `${string}::emitter::EmitterDestroyed`
      },
      typeArgs: [] as [],
      isPhantom: EmitterDestroyed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => EmitterDestroyed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => EmitterDestroyed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => EmitterDestroyed.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => EmitterDestroyed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => EmitterDestroyed.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        EmitterDestroyed.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => EmitterDestroyed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => EmitterDestroyed.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => EmitterDestroyed.fetch(client, id),
      new: (fields: EmitterDestroyedFields) => {
        return new EmitterDestroyed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): EmitterDestroyedReified {
    return EmitterDestroyed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<EmitterDestroyed>> {
    return phantom(EmitterDestroyed.reified())
  }

  static get p(): PhantomReified<ToTypeStr<EmitterDestroyed>> {
    return EmitterDestroyed.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('EmitterDestroyed', {
      emitter_cap: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof EmitterDestroyed.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof EmitterDestroyed.instantiateBcs> {
    if (!EmitterDestroyed.cachedBcs) {
      EmitterDestroyed.cachedBcs = EmitterDestroyed.instantiateBcs()
    }
    return EmitterDestroyed.cachedBcs
  }

  static fromFields(fields: Record<string, any>): EmitterDestroyed {
    return EmitterDestroyed.reified().new({
      emitterCap: decodeFromFields(ID.reified(), fields.emitter_cap),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): EmitterDestroyed {
    if (!isEmitterDestroyed(item.type)) {
      throw new Error('not a EmitterDestroyed type')
    }

    return EmitterDestroyed.reified().new({
      emitterCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.emitter_cap),
    })
  }

  static fromBcs(data: Uint8Array): EmitterDestroyed {
    return EmitterDestroyed.fromFields(EmitterDestroyed.bcs.parse(data))
  }

  toJSONField(): EmitterDestroyedJSONField {
    return {
      emitterCap: this.emitterCap,
    }
  }

  toJSON(): EmitterDestroyedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): EmitterDestroyed {
    return EmitterDestroyed.reified().new({
      emitterCap: decodeFromJSONField(ID.reified(), field.emitterCap),
    })
  }

  static fromJSON(json: Record<string, any>): EmitterDestroyed {
    if (json.$typeName !== EmitterDestroyed.$typeName) {
      throw new Error(
        `not a EmitterDestroyed json object: expected '${EmitterDestroyed.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return EmitterDestroyed.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): EmitterDestroyed {
    if (!isEmitterDestroyed(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a EmitterDestroyed object`)
    }
    return EmitterDestroyed.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EmitterDestroyed.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): EmitterDestroyed {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEmitterDestroyed(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EmitterDestroyed object`)
    }
    return EmitterDestroyed.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EmitterDestroyed.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): EmitterDestroyed {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEmitterDestroyed(data.bcs.type)) {
        throw new Error(`object at is not a EmitterDestroyed object`)
      }

      return EmitterDestroyed.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EmitterDestroyed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<EmitterDestroyed> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEmitterDestroyed(object.type)) {
      throw new Error(`object at id ${id} is not a EmitterDestroyed object`)
    }
    return EmitterDestroyed.fromBcs(object.content)
  }
}

/* ============================== EmitterCap =============================== */

export function isEmitterCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('wormhole-1', 'emitter::EmitterCap')}::emitter::EmitterCap`
}

export interface EmitterCapFields {
  id: ToField<UID>
  /** Sequence number of the next wormhole message. */
  sequence: ToField<'u64'>
}

export type EmitterCapReified = Reified<EmitterCap, EmitterCapFields>

export type EmitterCapJSONField = {
  id: string
  sequence: string
}

export type EmitterCapJSON = {
  $typeName: typeof EmitterCap.$typeName
  $typeArgs: []
} & EmitterCapJSONField

/**
 * `EmitterCap` is a Sui object that gives a user or smart contract the
 * capability to send Wormhole messages. For every Wormhole message
 * emitted, a unique `sequence` is used.
 */
export class EmitterCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::emitter::EmitterCap` {
    return `${getTypeOrigin('wormhole-1', 'emitter::EmitterCap')}::emitter::EmitterCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof EmitterCap.$typeName = EmitterCap.$typeName
  readonly $fullTypeName: `${string}::emitter::EmitterCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof EmitterCap.$isPhantom = EmitterCap.$isPhantom

  readonly id: ToField<UID>
  /** Sequence number of the next wormhole message. */
  readonly sequence: ToField<'u64'>

  private constructor(typeArgs: [], fields: EmitterCapFields) {
    this.$fullTypeName = composeSuiType(
      EmitterCap.$typeName,
      ...typeArgs,
    ) as `${string}::emitter::EmitterCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.sequence = fields.sequence
  }

  static reified(): EmitterCapReified {
    const reifiedBcs = EmitterCap.bcs
    return {
      get typeName() {
        return EmitterCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          EmitterCap.$typeName,
          ...[],
        ) as `${string}::emitter::EmitterCap`
      },
      typeArgs: [] as [],
      isPhantom: EmitterCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => EmitterCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => EmitterCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => EmitterCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => EmitterCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => EmitterCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        EmitterCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => EmitterCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => EmitterCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => EmitterCap.fetch(client, id),
      new: (fields: EmitterCapFields) => {
        return new EmitterCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): EmitterCapReified {
    return EmitterCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<EmitterCap>> {
    return phantom(EmitterCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<EmitterCap>> {
    return EmitterCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('EmitterCap', {
      id: UID.bcs,
      sequence: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof EmitterCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof EmitterCap.instantiateBcs> {
    if (!EmitterCap.cachedBcs) {
      EmitterCap.cachedBcs = EmitterCap.instantiateBcs()
    }
    return EmitterCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): EmitterCap {
    return EmitterCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      sequence: decodeFromFields('u64', fields.sequence),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): EmitterCap {
    if (!isEmitterCap(item.type)) {
      throw new Error('not a EmitterCap type')
    }

    return EmitterCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
    })
  }

  static fromBcs(data: Uint8Array): EmitterCap {
    return EmitterCap.fromFields(EmitterCap.bcs.parse(data))
  }

  toJSONField(): EmitterCapJSONField {
    return {
      id: this.id,
      sequence: this.sequence.toString(),
    }
  }

  toJSON(): EmitterCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): EmitterCap {
    return EmitterCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      sequence: decodeFromJSONField('u64', field.sequence),
    })
  }

  static fromJSON(json: Record<string, any>): EmitterCap {
    if (json.$typeName !== EmitterCap.$typeName) {
      throw new Error(
        `not a EmitterCap json object: expected '${EmitterCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return EmitterCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): EmitterCap {
    if (!isEmitterCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a EmitterCap object`)
    }
    return EmitterCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EmitterCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): EmitterCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isEmitterCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a EmitterCap object`)
    }
    return EmitterCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link EmitterCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): EmitterCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isEmitterCap(data.bcs.type)) {
        throw new Error(`object at is not a EmitterCap object`)
      }

      return EmitterCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return EmitterCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<EmitterCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isEmitterCap(object.type)) {
      throw new Error(`object at id ${id} is not a EmitterCap object`)
    }
    return EmitterCap.fromBcs(object.content)
  }
}
