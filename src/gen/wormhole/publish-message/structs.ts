/**
 * This module implements two methods: `prepare_message` and `publish_message`,
 * which are to be executed in a transaction block in this order.
 *
 * `prepare_message` allows a contract to pack Wormhole message info (payload
 * that has meaning to an integrator plus nonce) in preparation to publish a
 * `WormholeMessage` event via `publish_message`. Only the owner of an
 * `EmitterCap` has the capability of creating this `MessageTicket`.
 *
 * `publish_message` unpacks the `MessageTicket` and emits a
 * `WormholeMessage` with this message info and timestamp. This event is
 * observed by the Guardian network.
 *
 * The purpose of splitting this message publishing into two steps is in case
 * Wormhole needs to be upgraded and there is a breaking change for this
 * module, an integrator would not be left broken. It is discouraged to put
 * `publish_message` in an integrator's package logic. Otherwise, this
 * integrator needs to be prepared to upgrade his contract to handle the latest
 * version of `publish_message`.
 *
 * Instead, an integtrator is encouraged to execute a transaction block, which
 * executes `publish_message` using the latest Wormhole package ID and to
 * implement `prepare_message` in his contract to produce `MessageTicket`,
 * which `publish_message` consumes.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  vector,
} from '../../_framework/reified'
import { composeSuiType, compressSuiType, FieldsWithTypes } from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { ID } from '../../sui/object/structs'

/* ============================== WormholeMessage =============================== */

export function isWormholeMessage(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole', 'publish_message::WormholeMessage')
    }::publish_message::WormholeMessage`
}

export interface WormholeMessageFields {
  /** `EmitterCap` object ID. */
  sender: ToField<ID>
  /** From `EmitterCap`. */
  sequence: ToField<'u64'>
  /** A.K.A. Batch ID. */
  nonce: ToField<'u32'>
  /** Arbitrary message data relevant to integrator. */
  payload: ToField<Vector<'u8'>>
  /** This will always be `0`. */
  consistencyLevel: ToField<'u8'>
  /** `Clock` timestamp. */
  timestamp: ToField<'u64'>
}

export type WormholeMessageReified = Reified<WormholeMessage, WormholeMessageFields>

export type WormholeMessageJSONField = {
  sender: string
  sequence: string
  nonce: number
  payload: number[]
  consistencyLevel: number
  timestamp: string
}

export type WormholeMessageJSON = {
  $typeName: typeof WormholeMessage.$typeName
  $typeArgs: []
} & WormholeMessageJSONField

/**
 * This type is emitted via `sui::event` module. Guardians pick up this
 * observation and attest to its existence.
 */
export class WormholeMessage implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::publish_message::WormholeMessage` {
    return `${
      getTypeOrigin('wormhole', 'publish_message::WormholeMessage')
    }::publish_message::WormholeMessage` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof WormholeMessage.$typeName = WormholeMessage.$typeName
  readonly $fullTypeName: `${string}::publish_message::WormholeMessage`
  readonly $typeArgs: []
  readonly $isPhantom: typeof WormholeMessage.$isPhantom = WormholeMessage.$isPhantom

  /** `EmitterCap` object ID. */
  readonly sender: ToField<ID>
  /** From `EmitterCap`. */
  readonly sequence: ToField<'u64'>
  /** A.K.A. Batch ID. */
  readonly nonce: ToField<'u32'>
  /** Arbitrary message data relevant to integrator. */
  readonly payload: ToField<Vector<'u8'>>
  /** This will always be `0`. */
  readonly consistencyLevel: ToField<'u8'>
  /** `Clock` timestamp. */
  readonly timestamp: ToField<'u64'>

  private constructor(typeArgs: [], fields: WormholeMessageFields) {
    this.$fullTypeName = composeSuiType(
      WormholeMessage.$typeName,
      ...typeArgs,
    ) as `${string}::publish_message::WormholeMessage`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.sequence = fields.sequence
    this.nonce = fields.nonce
    this.payload = fields.payload
    this.consistencyLevel = fields.consistencyLevel
    this.timestamp = fields.timestamp
  }

  static reified(): WormholeMessageReified {
    const reifiedBcs = WormholeMessage.bcs
    return {
      get typeName() {
        return WormholeMessage.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          WormholeMessage.$typeName,
          ...[],
        ) as `${string}::publish_message::WormholeMessage`
      },
      typeArgs: [] as [],
      isPhantom: WormholeMessage.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => WormholeMessage.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => WormholeMessage.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => WormholeMessage.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => WormholeMessage.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => WormholeMessage.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        WormholeMessage.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => WormholeMessage.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => WormholeMessage.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => WormholeMessage.fetch(client, id),
      new: (fields: WormholeMessageFields) => {
        return new WormholeMessage([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): WormholeMessageReified {
    return WormholeMessage.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<WormholeMessage>> {
    return phantom(WormholeMessage.reified())
  }

  static get p(): PhantomReified<ToTypeStr<WormholeMessage>> {
    return WormholeMessage.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('WormholeMessage', {
      sender: ID.bcs,
      sequence: bcs.u64(),
      nonce: bcs.u32(),
      payload: bcs.vector(bcs.u8()),
      consistency_level: bcs.u8(),
      timestamp: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof WormholeMessage.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof WormholeMessage.instantiateBcs> {
    if (!WormholeMessage.cachedBcs) {
      WormholeMessage.cachedBcs = WormholeMessage.instantiateBcs()
    }
    return WormholeMessage.cachedBcs
  }

  static fromFields(fields: Record<string, any>): WormholeMessage {
    return WormholeMessage.reified().new({
      sender: decodeFromFields(ID.reified(), fields.sender),
      sequence: decodeFromFields('u64', fields.sequence),
      nonce: decodeFromFields('u32', fields.nonce),
      payload: decodeFromFields(vector('u8'), fields.payload),
      consistencyLevel: decodeFromFields('u8', fields.consistency_level),
      timestamp: decodeFromFields('u64', fields.timestamp),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): WormholeMessage {
    if (!isWormholeMessage(item.type)) {
      throw new Error('not a WormholeMessage type')
    }

    return WormholeMessage.reified().new({
      sender: decodeFromFieldsWithTypes(ID.reified(), item.fields.sender),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
      nonce: decodeFromFieldsWithTypes('u32', item.fields.nonce),
      payload: decodeFromFieldsWithTypes(vector('u8'), item.fields.payload),
      consistencyLevel: decodeFromFieldsWithTypes('u8', item.fields.consistency_level),
      timestamp: decodeFromFieldsWithTypes('u64', item.fields.timestamp),
    })
  }

  static fromBcs(data: Uint8Array): WormholeMessage {
    return WormholeMessage.fromFields(WormholeMessage.bcs.parse(data))
  }

  toJSONField(): WormholeMessageJSONField {
    return {
      sender: this.sender,
      sequence: this.sequence.toString(),
      nonce: this.nonce,
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
      consistencyLevel: this.consistencyLevel,
      timestamp: this.timestamp.toString(),
    }
  }

  toJSON(): WormholeMessageJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): WormholeMessage {
    return WormholeMessage.reified().new({
      sender: decodeFromJSONField(ID.reified(), field.sender),
      sequence: decodeFromJSONField('u64', field.sequence),
      nonce: decodeFromJSONField('u32', field.nonce),
      payload: decodeFromJSONField(vector('u8'), field.payload),
      consistencyLevel: decodeFromJSONField('u8', field.consistencyLevel),
      timestamp: decodeFromJSONField('u64', field.timestamp),
    })
  }

  static fromJSON(json: Record<string, any>): WormholeMessage {
    if (json.$typeName !== WormholeMessage.$typeName) {
      throw new Error(
        `not a WormholeMessage json object: expected '${WormholeMessage.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return WormholeMessage.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): WormholeMessage {
    if (!isWormholeMessage(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a WormholeMessage object`)
    }
    return WormholeMessage.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WormholeMessage.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): WormholeMessage {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isWormholeMessage(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a WormholeMessage object`)
    }
    return WormholeMessage.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link WormholeMessage.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): WormholeMessage {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isWormholeMessage(data.bcs.type)) {
        throw new Error(`object at is not a WormholeMessage object`)
      }

      return WormholeMessage.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return WormholeMessage.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<WormholeMessage> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isWormholeMessage(object.type)) {
      throw new Error(`object at id ${id} is not a WormholeMessage object`)
    }
    return WormholeMessage.fromBcs(object.content)
  }
}

/* ============================== MessageTicket =============================== */

export function isMessageTicket(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('wormhole', 'publish_message::MessageTicket')
    }::publish_message::MessageTicket`
}

export interface MessageTicketFields {
  /** `EmitterCap` object ID. */
  sender: ToField<ID>
  /** From `EmitterCap`. */
  sequence: ToField<'u64'>
  /** A.K.A. Batch ID. */
  nonce: ToField<'u32'>
  /** Arbitrary message data relevant to integrator. */
  payload: ToField<Vector<'u8'>>
}

export type MessageTicketReified = Reified<MessageTicket, MessageTicketFields>

export type MessageTicketJSONField = {
  sender: string
  sequence: string
  nonce: number
  payload: number[]
}

export type MessageTicketJSON = {
  $typeName: typeof MessageTicket.$typeName
  $typeArgs: []
} & MessageTicketJSONField

/**
 * This type represents Wormhole message data. The sender is the object ID
 * of an `EmitterCap`, who acts as the capability of creating this type.
 * The only way to destroy this type is calling `publish_message` with
 * a fee to emit a `WormholeMessage` with the unpacked members of this
 * struct.
 */
export class MessageTicket implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::publish_message::MessageTicket` {
    return `${
      getTypeOrigin('wormhole', 'publish_message::MessageTicket')
    }::publish_message::MessageTicket` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof MessageTicket.$typeName = MessageTicket.$typeName
  readonly $fullTypeName: `${string}::publish_message::MessageTicket`
  readonly $typeArgs: []
  readonly $isPhantom: typeof MessageTicket.$isPhantom = MessageTicket.$isPhantom

  /** `EmitterCap` object ID. */
  readonly sender: ToField<ID>
  /** From `EmitterCap`. */
  readonly sequence: ToField<'u64'>
  /** A.K.A. Batch ID. */
  readonly nonce: ToField<'u32'>
  /** Arbitrary message data relevant to integrator. */
  readonly payload: ToField<Vector<'u8'>>

  private constructor(typeArgs: [], fields: MessageTicketFields) {
    this.$fullTypeName = composeSuiType(
      MessageTicket.$typeName,
      ...typeArgs,
    ) as `${string}::publish_message::MessageTicket`
    this.$typeArgs = typeArgs

    this.sender = fields.sender
    this.sequence = fields.sequence
    this.nonce = fields.nonce
    this.payload = fields.payload
  }

  static reified(): MessageTicketReified {
    const reifiedBcs = MessageTicket.bcs
    return {
      get typeName() {
        return MessageTicket.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          MessageTicket.$typeName,
          ...[],
        ) as `${string}::publish_message::MessageTicket`
      },
      typeArgs: [] as [],
      isPhantom: MessageTicket.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MessageTicket.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MessageTicket.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MessageTicket.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MessageTicket.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MessageTicket.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        MessageTicket.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => MessageTicket.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MessageTicket.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => MessageTicket.fetch(client, id),
      new: (fields: MessageTicketFields) => {
        return new MessageTicket([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): MessageTicketReified {
    return MessageTicket.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MessageTicket>> {
    return phantom(MessageTicket.reified())
  }

  static get p(): PhantomReified<ToTypeStr<MessageTicket>> {
    return MessageTicket.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('MessageTicket', {
      sender: ID.bcs,
      sequence: bcs.u64(),
      nonce: bcs.u32(),
      payload: bcs.vector(bcs.u8()),
    })
  }

  private static cachedBcs: ReturnType<typeof MessageTicket.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof MessageTicket.instantiateBcs> {
    if (!MessageTicket.cachedBcs) {
      MessageTicket.cachedBcs = MessageTicket.instantiateBcs()
    }
    return MessageTicket.cachedBcs
  }

  static fromFields(fields: Record<string, any>): MessageTicket {
    return MessageTicket.reified().new({
      sender: decodeFromFields(ID.reified(), fields.sender),
      sequence: decodeFromFields('u64', fields.sequence),
      nonce: decodeFromFields('u32', fields.nonce),
      payload: decodeFromFields(vector('u8'), fields.payload),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MessageTicket {
    if (!isMessageTicket(item.type)) {
      throw new Error('not a MessageTicket type')
    }

    return MessageTicket.reified().new({
      sender: decodeFromFieldsWithTypes(ID.reified(), item.fields.sender),
      sequence: decodeFromFieldsWithTypes('u64', item.fields.sequence),
      nonce: decodeFromFieldsWithTypes('u32', item.fields.nonce),
      payload: decodeFromFieldsWithTypes(vector('u8'), item.fields.payload),
    })
  }

  static fromBcs(data: Uint8Array): MessageTicket {
    return MessageTicket.fromFields(MessageTicket.bcs.parse(data))
  }

  toJSONField(): MessageTicketJSONField {
    return {
      sender: this.sender,
      sequence: this.sequence.toString(),
      nonce: this.nonce,
      payload: fieldToJSON<Vector<'u8'>>(`vector<u8>`, this.payload),
    }
  }

  toJSON(): MessageTicketJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): MessageTicket {
    return MessageTicket.reified().new({
      sender: decodeFromJSONField(ID.reified(), field.sender),
      sequence: decodeFromJSONField('u64', field.sequence),
      nonce: decodeFromJSONField('u32', field.nonce),
      payload: decodeFromJSONField(vector('u8'), field.payload),
    })
  }

  static fromJSON(json: Record<string, any>): MessageTicket {
    if (json.$typeName !== MessageTicket.$typeName) {
      throw new Error(
        `not a MessageTicket json object: expected '${MessageTicket.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return MessageTicket.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): MessageTicket {
    if (!isMessageTicket(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a MessageTicket object`)
    }
    return MessageTicket.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessageTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): MessageTicket {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMessageTicket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MessageTicket object`)
    }
    return MessageTicket.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link MessageTicket.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): MessageTicket {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMessageTicket(data.bcs.type)) {
        throw new Error(`object at is not a MessageTicket object`)
      }

      return MessageTicket.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MessageTicket.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<MessageTicket> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isMessageTicket(object.type)) {
      throw new Error(`object at id ${id} is not a MessageTicket object`)
    }
    return MessageTicket.fromBcs(object.content)
  }
}
