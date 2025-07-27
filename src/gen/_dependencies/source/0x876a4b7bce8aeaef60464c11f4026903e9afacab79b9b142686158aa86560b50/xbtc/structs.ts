import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { Vector } from '../../../../_framework/vector'
import { UID } from '../../../../sui/object/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== XBTC =============================== */

export function isXBTC(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::XBTC`
}

export interface XBTCFields {
  dummyField: ToField<'bool'>
}

export type XBTCReified = Reified<XBTC, XBTCFields>

export class XBTC implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::XBTC`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = XBTC.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::XBTC`
  readonly $typeArgs: []
  readonly $isPhantom = XBTC.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: XBTCFields) {
    this.$fullTypeName = composeSuiType(
      XBTC.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::XBTC`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): XBTCReified {
    const reifiedBcs = XBTC.bcs
    return {
      typeName: XBTC.$typeName,
      fullTypeName: composeSuiType(XBTC.$typeName, ...[]) as `${typeof PKG_V1}::xbtc::XBTC`,
      typeArgs: [] as [],
      isPhantom: XBTC.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => XBTC.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => XBTC.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => XBTC.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => XBTC.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => XBTC.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => XBTC.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => XBTC.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => XBTC.fetch(client, id),
      new: (fields: XBTCFields) => {
        return new XBTC([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return XBTC.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<XBTC>> {
    return phantom(XBTC.reified())
  }
  static get p() {
    return XBTC.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('XBTC', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof XBTC.instantiateBcs> | null = null

  static get bcs() {
    if (!XBTC.cachedBcs) {
      XBTC.cachedBcs = XBTC.instantiateBcs()
    }
    return XBTC.cachedBcs
  }

  static fromFields(fields: Record<string, any>): XBTC {
    return XBTC.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): XBTC {
    if (!isXBTC(item.type)) {
      throw new Error('not a XBTC type')
    }

    return XBTC.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): XBTC {
    return XBTC.fromFields(XBTC.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): XBTC {
    return XBTC.reified().new({ dummyField: decodeFromJSONField('bool', field.dummyField) })
  }

  static fromJSON(json: Record<string, any>): XBTC {
    if (json.$typeName !== XBTC.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return XBTC.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): XBTC {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isXBTC(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a XBTC object`)
    }
    return XBTC.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): XBTC {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isXBTC(data.bcs.type)) {
        throw new Error(`object at is not a XBTC object`)
      }

      return XBTC.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return XBTC.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<XBTC> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching XBTC object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isXBTC(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a XBTC object`)
    }

    return XBTC.fromSuiObjectData(res.data)
  }
}

/* ============================== XBTCReceiver =============================== */

export function isXBTCReceiver(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::XBTCReceiver`
}

export interface XBTCReceiverFields {
  id: ToField<UID>
  receiver: ToField<'address'>
}

export type XBTCReceiverReified = Reified<XBTCReceiver, XBTCReceiverFields>

export class XBTCReceiver implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::XBTCReceiver`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = XBTCReceiver.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::XBTCReceiver`
  readonly $typeArgs: []
  readonly $isPhantom = XBTCReceiver.$isPhantom

  readonly id: ToField<UID>
  readonly receiver: ToField<'address'>

  private constructor(typeArgs: [], fields: XBTCReceiverFields) {
    this.$fullTypeName = composeSuiType(
      XBTCReceiver.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::XBTCReceiver`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.receiver = fields.receiver
  }

  static reified(): XBTCReceiverReified {
    const reifiedBcs = XBTCReceiver.bcs
    return {
      typeName: XBTCReceiver.$typeName,
      fullTypeName: composeSuiType(
        XBTCReceiver.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::XBTCReceiver`,
      typeArgs: [] as [],
      isPhantom: XBTCReceiver.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => XBTCReceiver.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => XBTCReceiver.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => XBTCReceiver.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => XBTCReceiver.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => XBTCReceiver.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => XBTCReceiver.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => XBTCReceiver.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => XBTCReceiver.fetch(client, id),
      new: (fields: XBTCReceiverFields) => {
        return new XBTCReceiver([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return XBTCReceiver.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<XBTCReceiver>> {
    return phantom(XBTCReceiver.reified())
  }
  static get p() {
    return XBTCReceiver.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('XBTCReceiver', {
      id: UID.bcs,
      receiver: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof XBTCReceiver.instantiateBcs> | null = null

  static get bcs() {
    if (!XBTCReceiver.cachedBcs) {
      XBTCReceiver.cachedBcs = XBTCReceiver.instantiateBcs()
    }
    return XBTCReceiver.cachedBcs
  }

  static fromFields(fields: Record<string, any>): XBTCReceiver {
    return XBTCReceiver.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      receiver: decodeFromFields('address', fields.receiver),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): XBTCReceiver {
    if (!isXBTCReceiver(item.type)) {
      throw new Error('not a XBTCReceiver type')
    }

    return XBTCReceiver.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      receiver: decodeFromFieldsWithTypes('address', item.fields.receiver),
    })
  }

  static fromBcs(data: Uint8Array): XBTCReceiver {
    return XBTCReceiver.fromFields(XBTCReceiver.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      receiver: this.receiver,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): XBTCReceiver {
    return XBTCReceiver.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      receiver: decodeFromJSONField('address', field.receiver),
    })
  }

  static fromJSON(json: Record<string, any>): XBTCReceiver {
    if (json.$typeName !== XBTCReceiver.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return XBTCReceiver.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): XBTCReceiver {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isXBTCReceiver(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a XBTCReceiver object`)
    }
    return XBTCReceiver.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): XBTCReceiver {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isXBTCReceiver(data.bcs.type)) {
        throw new Error(`object at is not a XBTCReceiver object`)
      }

      return XBTCReceiver.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return XBTCReceiver.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<XBTCReceiver> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching XBTCReceiver object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isXBTCReceiver(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a XBTCReceiver object`)
    }

    return XBTCReceiver.fromSuiObjectData(res.data)
  }
}

/* ============================== MintEvent =============================== */

export function isMintEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::MintEvent`
}

export interface MintEventFields {
  minter: ToField<'address'>
  receiver: ToField<'address'>
  amount: ToField<'u64'>
}

export type MintEventReified = Reified<MintEvent, MintEventFields>

export class MintEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::MintEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = MintEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::MintEvent`
  readonly $typeArgs: []
  readonly $isPhantom = MintEvent.$isPhantom

  readonly minter: ToField<'address'>
  readonly receiver: ToField<'address'>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: MintEventFields) {
    this.$fullTypeName = composeSuiType(
      MintEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::MintEvent`
    this.$typeArgs = typeArgs

    this.minter = fields.minter
    this.receiver = fields.receiver
    this.amount = fields.amount
  }

  static reified(): MintEventReified {
    const reifiedBcs = MintEvent.bcs
    return {
      typeName: MintEvent.$typeName,
      fullTypeName: composeSuiType(
        MintEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::MintEvent`,
      typeArgs: [] as [],
      isPhantom: MintEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => MintEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MintEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MintEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MintEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MintEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => MintEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => MintEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => MintEvent.fetch(client, id),
      new: (fields: MintEventFields) => {
        return new MintEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return MintEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<MintEvent>> {
    return phantom(MintEvent.reified())
  }
  static get p() {
    return MintEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('MintEvent', {
      minter: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      receiver: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof MintEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!MintEvent.cachedBcs) {
      MintEvent.cachedBcs = MintEvent.instantiateBcs()
    }
    return MintEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): MintEvent {
    return MintEvent.reified().new({
      minter: decodeFromFields('address', fields.minter),
      receiver: decodeFromFields('address', fields.receiver),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MintEvent {
    if (!isMintEvent(item.type)) {
      throw new Error('not a MintEvent type')
    }

    return MintEvent.reified().new({
      minter: decodeFromFieldsWithTypes('address', item.fields.minter),
      receiver: decodeFromFieldsWithTypes('address', item.fields.receiver),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): MintEvent {
    return MintEvent.fromFields(MintEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      minter: this.minter,
      receiver: this.receiver,
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): MintEvent {
    return MintEvent.reified().new({
      minter: decodeFromJSONField('address', field.minter),
      receiver: decodeFromJSONField('address', field.receiver),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): MintEvent {
    if (json.$typeName !== MintEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return MintEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): MintEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMintEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MintEvent object`)
    }
    return MintEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): MintEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMintEvent(data.bcs.type)) {
        throw new Error(`object at is not a MintEvent object`)
      }

      return MintEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MintEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<MintEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching MintEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isMintEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a MintEvent object`)
    }

    return MintEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== BurnEvent =============================== */

export function isBurnEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::BurnEvent`
}

export interface BurnEventFields {
  account: ToField<'address'>
  amount: ToField<'u64'>
}

export type BurnEventReified = Reified<BurnEvent, BurnEventFields>

export class BurnEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::BurnEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BurnEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::BurnEvent`
  readonly $typeArgs: []
  readonly $isPhantom = BurnEvent.$isPhantom

  readonly account: ToField<'address'>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: BurnEventFields) {
    this.$fullTypeName = composeSuiType(
      BurnEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::BurnEvent`
    this.$typeArgs = typeArgs

    this.account = fields.account
    this.amount = fields.amount
  }

  static reified(): BurnEventReified {
    const reifiedBcs = BurnEvent.bcs
    return {
      typeName: BurnEvent.$typeName,
      fullTypeName: composeSuiType(
        BurnEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::BurnEvent`,
      typeArgs: [] as [],
      isPhantom: BurnEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BurnEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BurnEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BurnEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BurnEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BurnEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => BurnEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BurnEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BurnEvent.fetch(client, id),
      new: (fields: BurnEventFields) => {
        return new BurnEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BurnEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BurnEvent>> {
    return phantom(BurnEvent.reified())
  }
  static get p() {
    return BurnEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BurnEvent', {
      account: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BurnEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!BurnEvent.cachedBcs) {
      BurnEvent.cachedBcs = BurnEvent.instantiateBcs()
    }
    return BurnEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BurnEvent {
    return BurnEvent.reified().new({
      account: decodeFromFields('address', fields.account),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BurnEvent {
    if (!isBurnEvent(item.type)) {
      throw new Error('not a BurnEvent type')
    }

    return BurnEvent.reified().new({
      account: decodeFromFieldsWithTypes('address', item.fields.account),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): BurnEvent {
    return BurnEvent.fromFields(BurnEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      account: this.account,
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BurnEvent {
    return BurnEvent.reified().new({
      account: decodeFromJSONField('address', field.account),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): BurnEvent {
    if (json.$typeName !== BurnEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BurnEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BurnEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBurnEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BurnEvent object`)
    }
    return BurnEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BurnEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBurnEvent(data.bcs.type)) {
        throw new Error(`object at is not a BurnEvent object`)
      }

      return BurnEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BurnEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BurnEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BurnEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBurnEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BurnEvent object`)
    }

    return BurnEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== AddDenyListEvent =============================== */

export function isAddDenyListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::AddDenyListEvent`
}

export interface AddDenyListEventFields {
  denylister: ToField<'address'>
  account: ToField<'address'>
}

export type AddDenyListEventReified = Reified<AddDenyListEvent, AddDenyListEventFields>

export class AddDenyListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::AddDenyListEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AddDenyListEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::AddDenyListEvent`
  readonly $typeArgs: []
  readonly $isPhantom = AddDenyListEvent.$isPhantom

  readonly denylister: ToField<'address'>
  readonly account: ToField<'address'>

  private constructor(typeArgs: [], fields: AddDenyListEventFields) {
    this.$fullTypeName = composeSuiType(
      AddDenyListEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::AddDenyListEvent`
    this.$typeArgs = typeArgs

    this.denylister = fields.denylister
    this.account = fields.account
  }

  static reified(): AddDenyListEventReified {
    const reifiedBcs = AddDenyListEvent.bcs
    return {
      typeName: AddDenyListEvent.$typeName,
      fullTypeName: composeSuiType(
        AddDenyListEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::AddDenyListEvent`,
      typeArgs: [] as [],
      isPhantom: AddDenyListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddDenyListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddDenyListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddDenyListEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddDenyListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddDenyListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AddDenyListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddDenyListEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AddDenyListEvent.fetch(client, id),
      new: (fields: AddDenyListEventFields) => {
        return new AddDenyListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AddDenyListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddDenyListEvent>> {
    return phantom(AddDenyListEvent.reified())
  }
  static get p() {
    return AddDenyListEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddDenyListEvent', {
      denylister: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      account: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof AddDenyListEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!AddDenyListEvent.cachedBcs) {
      AddDenyListEvent.cachedBcs = AddDenyListEvent.instantiateBcs()
    }
    return AddDenyListEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddDenyListEvent {
    return AddDenyListEvent.reified().new({
      denylister: decodeFromFields('address', fields.denylister),
      account: decodeFromFields('address', fields.account),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddDenyListEvent {
    if (!isAddDenyListEvent(item.type)) {
      throw new Error('not a AddDenyListEvent type')
    }

    return AddDenyListEvent.reified().new({
      denylister: decodeFromFieldsWithTypes('address', item.fields.denylister),
      account: decodeFromFieldsWithTypes('address', item.fields.account),
    })
  }

  static fromBcs(data: Uint8Array): AddDenyListEvent {
    return AddDenyListEvent.fromFields(AddDenyListEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      denylister: this.denylister,
      account: this.account,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddDenyListEvent {
    return AddDenyListEvent.reified().new({
      denylister: decodeFromJSONField('address', field.denylister),
      account: decodeFromJSONField('address', field.account),
    })
  }

  static fromJSON(json: Record<string, any>): AddDenyListEvent {
    if (json.$typeName !== AddDenyListEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AddDenyListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AddDenyListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddDenyListEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddDenyListEvent object`)
    }
    return AddDenyListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AddDenyListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddDenyListEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddDenyListEvent object`)
      }

      return AddDenyListEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddDenyListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AddDenyListEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AddDenyListEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAddDenyListEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AddDenyListEvent object`)
    }

    return AddDenyListEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RemoveDenyListEvent =============================== */

export function isRemoveDenyListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::RemoveDenyListEvent`
}

export interface RemoveDenyListEventFields {
  denylister: ToField<'address'>
  account: ToField<'address'>
}

export type RemoveDenyListEventReified = Reified<RemoveDenyListEvent, RemoveDenyListEventFields>

export class RemoveDenyListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::RemoveDenyListEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RemoveDenyListEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::RemoveDenyListEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RemoveDenyListEvent.$isPhantom

  readonly denylister: ToField<'address'>
  readonly account: ToField<'address'>

  private constructor(typeArgs: [], fields: RemoveDenyListEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveDenyListEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::RemoveDenyListEvent`
    this.$typeArgs = typeArgs

    this.denylister = fields.denylister
    this.account = fields.account
  }

  static reified(): RemoveDenyListEventReified {
    const reifiedBcs = RemoveDenyListEvent.bcs
    return {
      typeName: RemoveDenyListEvent.$typeName,
      fullTypeName: composeSuiType(
        RemoveDenyListEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::RemoveDenyListEvent`,
      typeArgs: [] as [],
      isPhantom: RemoveDenyListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveDenyListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RemoveDenyListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveDenyListEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveDenyListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveDenyListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RemoveDenyListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RemoveDenyListEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RemoveDenyListEvent.fetch(client, id),
      new: (fields: RemoveDenyListEventFields) => {
        return new RemoveDenyListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RemoveDenyListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveDenyListEvent>> {
    return phantom(RemoveDenyListEvent.reified())
  }
  static get p() {
    return RemoveDenyListEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveDenyListEvent', {
      denylister: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      account: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveDenyListEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!RemoveDenyListEvent.cachedBcs) {
      RemoveDenyListEvent.cachedBcs = RemoveDenyListEvent.instantiateBcs()
    }
    return RemoveDenyListEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveDenyListEvent {
    return RemoveDenyListEvent.reified().new({
      denylister: decodeFromFields('address', fields.denylister),
      account: decodeFromFields('address', fields.account),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveDenyListEvent {
    if (!isRemoveDenyListEvent(item.type)) {
      throw new Error('not a RemoveDenyListEvent type')
    }

    return RemoveDenyListEvent.reified().new({
      denylister: decodeFromFieldsWithTypes('address', item.fields.denylister),
      account: decodeFromFieldsWithTypes('address', item.fields.account),
    })
  }

  static fromBcs(data: Uint8Array): RemoveDenyListEvent {
    return RemoveDenyListEvent.fromFields(RemoveDenyListEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      denylister: this.denylister,
      account: this.account,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveDenyListEvent {
    return RemoveDenyListEvent.reified().new({
      denylister: decodeFromJSONField('address', field.denylister),
      account: decodeFromJSONField('address', field.account),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveDenyListEvent {
    if (json.$typeName !== RemoveDenyListEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RemoveDenyListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RemoveDenyListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveDenyListEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RemoveDenyListEvent object`)
    }
    return RemoveDenyListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RemoveDenyListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveDenyListEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveDenyListEvent object`)
      }

      return RemoveDenyListEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveDenyListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RemoveDenyListEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RemoveDenyListEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRemoveDenyListEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RemoveDenyListEvent object`)
    }

    return RemoveDenyListEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== BatchAddDenyListEvent =============================== */

export function isBatchAddDenyListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::BatchAddDenyListEvent`
}

export interface BatchAddDenyListEventFields {
  denylister: ToField<'address'>
  accounts: ToField<Vector<'address'>>
}

export type BatchAddDenyListEventReified = Reified<
  BatchAddDenyListEvent,
  BatchAddDenyListEventFields
>

export class BatchAddDenyListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::BatchAddDenyListEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BatchAddDenyListEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::BatchAddDenyListEvent`
  readonly $typeArgs: []
  readonly $isPhantom = BatchAddDenyListEvent.$isPhantom

  readonly denylister: ToField<'address'>
  readonly accounts: ToField<Vector<'address'>>

  private constructor(typeArgs: [], fields: BatchAddDenyListEventFields) {
    this.$fullTypeName = composeSuiType(
      BatchAddDenyListEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::BatchAddDenyListEvent`
    this.$typeArgs = typeArgs

    this.denylister = fields.denylister
    this.accounts = fields.accounts
  }

  static reified(): BatchAddDenyListEventReified {
    const reifiedBcs = BatchAddDenyListEvent.bcs
    return {
      typeName: BatchAddDenyListEvent.$typeName,
      fullTypeName: composeSuiType(
        BatchAddDenyListEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::BatchAddDenyListEvent`,
      typeArgs: [] as [],
      isPhantom: BatchAddDenyListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BatchAddDenyListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BatchAddDenyListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BatchAddDenyListEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BatchAddDenyListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BatchAddDenyListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        BatchAddDenyListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BatchAddDenyListEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BatchAddDenyListEvent.fetch(client, id),
      new: (fields: BatchAddDenyListEventFields) => {
        return new BatchAddDenyListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BatchAddDenyListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BatchAddDenyListEvent>> {
    return phantom(BatchAddDenyListEvent.reified())
  }
  static get p() {
    return BatchAddDenyListEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BatchAddDenyListEvent', {
      denylister: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      accounts: bcs.vector(
        bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        })
      ),
    })
  }

  private static cachedBcs: ReturnType<typeof BatchAddDenyListEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!BatchAddDenyListEvent.cachedBcs) {
      BatchAddDenyListEvent.cachedBcs = BatchAddDenyListEvent.instantiateBcs()
    }
    return BatchAddDenyListEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BatchAddDenyListEvent {
    return BatchAddDenyListEvent.reified().new({
      denylister: decodeFromFields('address', fields.denylister),
      accounts: decodeFromFields(reified.vector('address'), fields.accounts),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BatchAddDenyListEvent {
    if (!isBatchAddDenyListEvent(item.type)) {
      throw new Error('not a BatchAddDenyListEvent type')
    }

    return BatchAddDenyListEvent.reified().new({
      denylister: decodeFromFieldsWithTypes('address', item.fields.denylister),
      accounts: decodeFromFieldsWithTypes(reified.vector('address'), item.fields.accounts),
    })
  }

  static fromBcs(data: Uint8Array): BatchAddDenyListEvent {
    return BatchAddDenyListEvent.fromFields(BatchAddDenyListEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      denylister: this.denylister,
      accounts: fieldToJSON<Vector<'address'>>(`vector<address>`, this.accounts),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BatchAddDenyListEvent {
    return BatchAddDenyListEvent.reified().new({
      denylister: decodeFromJSONField('address', field.denylister),
      accounts: decodeFromJSONField(reified.vector('address'), field.accounts),
    })
  }

  static fromJSON(json: Record<string, any>): BatchAddDenyListEvent {
    if (json.$typeName !== BatchAddDenyListEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BatchAddDenyListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BatchAddDenyListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBatchAddDenyListEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BatchAddDenyListEvent object`
      )
    }
    return BatchAddDenyListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BatchAddDenyListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBatchAddDenyListEvent(data.bcs.type)) {
        throw new Error(`object at is not a BatchAddDenyListEvent object`)
      }

      return BatchAddDenyListEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BatchAddDenyListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BatchAddDenyListEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BatchAddDenyListEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBatchAddDenyListEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BatchAddDenyListEvent object`)
    }

    return BatchAddDenyListEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== BatchRemoveDenyListEvent =============================== */

export function isBatchRemoveDenyListEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::BatchRemoveDenyListEvent`
}

export interface BatchRemoveDenyListEventFields {
  denylister: ToField<'address'>
  accounts: ToField<Vector<'address'>>
}

export type BatchRemoveDenyListEventReified = Reified<
  BatchRemoveDenyListEvent,
  BatchRemoveDenyListEventFields
>

export class BatchRemoveDenyListEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::BatchRemoveDenyListEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BatchRemoveDenyListEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::BatchRemoveDenyListEvent`
  readonly $typeArgs: []
  readonly $isPhantom = BatchRemoveDenyListEvent.$isPhantom

  readonly denylister: ToField<'address'>
  readonly accounts: ToField<Vector<'address'>>

  private constructor(typeArgs: [], fields: BatchRemoveDenyListEventFields) {
    this.$fullTypeName = composeSuiType(
      BatchRemoveDenyListEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::BatchRemoveDenyListEvent`
    this.$typeArgs = typeArgs

    this.denylister = fields.denylister
    this.accounts = fields.accounts
  }

  static reified(): BatchRemoveDenyListEventReified {
    const reifiedBcs = BatchRemoveDenyListEvent.bcs
    return {
      typeName: BatchRemoveDenyListEvent.$typeName,
      fullTypeName: composeSuiType(
        BatchRemoveDenyListEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::BatchRemoveDenyListEvent`,
      typeArgs: [] as [],
      isPhantom: BatchRemoveDenyListEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BatchRemoveDenyListEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BatchRemoveDenyListEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BatchRemoveDenyListEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BatchRemoveDenyListEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BatchRemoveDenyListEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        BatchRemoveDenyListEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BatchRemoveDenyListEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BatchRemoveDenyListEvent.fetch(client, id),
      new: (fields: BatchRemoveDenyListEventFields) => {
        return new BatchRemoveDenyListEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BatchRemoveDenyListEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BatchRemoveDenyListEvent>> {
    return phantom(BatchRemoveDenyListEvent.reified())
  }
  static get p() {
    return BatchRemoveDenyListEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BatchRemoveDenyListEvent', {
      denylister: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      accounts: bcs.vector(
        bcs.bytes(32).transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        })
      ),
    })
  }

  private static cachedBcs: ReturnType<typeof BatchRemoveDenyListEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!BatchRemoveDenyListEvent.cachedBcs) {
      BatchRemoveDenyListEvent.cachedBcs = BatchRemoveDenyListEvent.instantiateBcs()
    }
    return BatchRemoveDenyListEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BatchRemoveDenyListEvent {
    return BatchRemoveDenyListEvent.reified().new({
      denylister: decodeFromFields('address', fields.denylister),
      accounts: decodeFromFields(reified.vector('address'), fields.accounts),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BatchRemoveDenyListEvent {
    if (!isBatchRemoveDenyListEvent(item.type)) {
      throw new Error('not a BatchRemoveDenyListEvent type')
    }

    return BatchRemoveDenyListEvent.reified().new({
      denylister: decodeFromFieldsWithTypes('address', item.fields.denylister),
      accounts: decodeFromFieldsWithTypes(reified.vector('address'), item.fields.accounts),
    })
  }

  static fromBcs(data: Uint8Array): BatchRemoveDenyListEvent {
    return BatchRemoveDenyListEvent.fromFields(BatchRemoveDenyListEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      denylister: this.denylister,
      accounts: fieldToJSON<Vector<'address'>>(`vector<address>`, this.accounts),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BatchRemoveDenyListEvent {
    return BatchRemoveDenyListEvent.reified().new({
      denylister: decodeFromJSONField('address', field.denylister),
      accounts: decodeFromJSONField(reified.vector('address'), field.accounts),
    })
  }

  static fromJSON(json: Record<string, any>): BatchRemoveDenyListEvent {
    if (json.$typeName !== BatchRemoveDenyListEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BatchRemoveDenyListEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BatchRemoveDenyListEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBatchRemoveDenyListEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BatchRemoveDenyListEvent object`
      )
    }
    return BatchRemoveDenyListEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BatchRemoveDenyListEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBatchRemoveDenyListEvent(data.bcs.type)) {
        throw new Error(`object at is not a BatchRemoveDenyListEvent object`)
      }

      return BatchRemoveDenyListEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BatchRemoveDenyListEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BatchRemoveDenyListEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching BatchRemoveDenyListEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isBatchRemoveDenyListEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a BatchRemoveDenyListEvent object`)
    }

    return BatchRemoveDenyListEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== PauseEvent =============================== */

export function isPauseEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::PauseEvent`
}

export interface PauseEventFields {
  pauser: ToField<'address'>
  paused: ToField<'bool'>
}

export type PauseEventReified = Reified<PauseEvent, PauseEventFields>

export class PauseEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::PauseEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PauseEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::PauseEvent`
  readonly $typeArgs: []
  readonly $isPhantom = PauseEvent.$isPhantom

  readonly pauser: ToField<'address'>
  readonly paused: ToField<'bool'>

  private constructor(typeArgs: [], fields: PauseEventFields) {
    this.$fullTypeName = composeSuiType(
      PauseEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::PauseEvent`
    this.$typeArgs = typeArgs

    this.pauser = fields.pauser
    this.paused = fields.paused
  }

  static reified(): PauseEventReified {
    const reifiedBcs = PauseEvent.bcs
    return {
      typeName: PauseEvent.$typeName,
      fullTypeName: composeSuiType(
        PauseEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::PauseEvent`,
      typeArgs: [] as [],
      isPhantom: PauseEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PauseEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PauseEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PauseEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PauseEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PauseEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PauseEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PauseEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PauseEvent.fetch(client, id),
      new: (fields: PauseEventFields) => {
        return new PauseEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PauseEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PauseEvent>> {
    return phantom(PauseEvent.reified())
  }
  static get p() {
    return PauseEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PauseEvent', {
      pauser: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      paused: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof PauseEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!PauseEvent.cachedBcs) {
      PauseEvent.cachedBcs = PauseEvent.instantiateBcs()
    }
    return PauseEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PauseEvent {
    return PauseEvent.reified().new({
      pauser: decodeFromFields('address', fields.pauser),
      paused: decodeFromFields('bool', fields.paused),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PauseEvent {
    if (!isPauseEvent(item.type)) {
      throw new Error('not a PauseEvent type')
    }

    return PauseEvent.reified().new({
      pauser: decodeFromFieldsWithTypes('address', item.fields.pauser),
      paused: decodeFromFieldsWithTypes('bool', item.fields.paused),
    })
  }

  static fromBcs(data: Uint8Array): PauseEvent {
    return PauseEvent.fromFields(PauseEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      pauser: this.pauser,
      paused: this.paused,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PauseEvent {
    return PauseEvent.reified().new({
      pauser: decodeFromJSONField('address', field.pauser),
      paused: decodeFromJSONField('bool', field.paused),
    })
  }

  static fromJSON(json: Record<string, any>): PauseEvent {
    if (json.$typeName !== PauseEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PauseEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PauseEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPauseEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PauseEvent object`)
    }
    return PauseEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PauseEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPauseEvent(data.bcs.type)) {
        throw new Error(`object at is not a PauseEvent object`)
      }

      return PauseEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PauseEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PauseEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PauseEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPauseEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PauseEvent object`)
    }

    return PauseEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== SetReceiverEvent =============================== */

export function isSetReceiverEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::SetReceiverEvent`
}

export interface SetReceiverEventFields {
  denylister: ToField<'address'>
  oldReceiver: ToField<'address'>
  newReceiver: ToField<'address'>
}

export type SetReceiverEventReified = Reified<SetReceiverEvent, SetReceiverEventFields>

export class SetReceiverEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::SetReceiverEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SetReceiverEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::SetReceiverEvent`
  readonly $typeArgs: []
  readonly $isPhantom = SetReceiverEvent.$isPhantom

  readonly denylister: ToField<'address'>
  readonly oldReceiver: ToField<'address'>
  readonly newReceiver: ToField<'address'>

  private constructor(typeArgs: [], fields: SetReceiverEventFields) {
    this.$fullTypeName = composeSuiType(
      SetReceiverEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::SetReceiverEvent`
    this.$typeArgs = typeArgs

    this.denylister = fields.denylister
    this.oldReceiver = fields.oldReceiver
    this.newReceiver = fields.newReceiver
  }

  static reified(): SetReceiverEventReified {
    const reifiedBcs = SetReceiverEvent.bcs
    return {
      typeName: SetReceiverEvent.$typeName,
      fullTypeName: composeSuiType(
        SetReceiverEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::SetReceiverEvent`,
      typeArgs: [] as [],
      isPhantom: SetReceiverEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SetReceiverEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SetReceiverEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SetReceiverEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SetReceiverEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SetReceiverEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SetReceiverEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SetReceiverEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SetReceiverEvent.fetch(client, id),
      new: (fields: SetReceiverEventFields) => {
        return new SetReceiverEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SetReceiverEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SetReceiverEvent>> {
    return phantom(SetReceiverEvent.reified())
  }
  static get p() {
    return SetReceiverEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SetReceiverEvent', {
      denylister: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      old_receiver: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      new_receiver: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof SetReceiverEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!SetReceiverEvent.cachedBcs) {
      SetReceiverEvent.cachedBcs = SetReceiverEvent.instantiateBcs()
    }
    return SetReceiverEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SetReceiverEvent {
    return SetReceiverEvent.reified().new({
      denylister: decodeFromFields('address', fields.denylister),
      oldReceiver: decodeFromFields('address', fields.old_receiver),
      newReceiver: decodeFromFields('address', fields.new_receiver),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SetReceiverEvent {
    if (!isSetReceiverEvent(item.type)) {
      throw new Error('not a SetReceiverEvent type')
    }

    return SetReceiverEvent.reified().new({
      denylister: decodeFromFieldsWithTypes('address', item.fields.denylister),
      oldReceiver: decodeFromFieldsWithTypes('address', item.fields.old_receiver),
      newReceiver: decodeFromFieldsWithTypes('address', item.fields.new_receiver),
    })
  }

  static fromBcs(data: Uint8Array): SetReceiverEvent {
    return SetReceiverEvent.fromFields(SetReceiverEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      denylister: this.denylister,
      oldReceiver: this.oldReceiver,
      newReceiver: this.newReceiver,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SetReceiverEvent {
    return SetReceiverEvent.reified().new({
      denylister: decodeFromJSONField('address', field.denylister),
      oldReceiver: decodeFromJSONField('address', field.oldReceiver),
      newReceiver: decodeFromJSONField('address', field.newReceiver),
    })
  }

  static fromJSON(json: Record<string, any>): SetReceiverEvent {
    if (json.$typeName !== SetReceiverEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SetReceiverEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SetReceiverEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSetReceiverEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SetReceiverEvent object`)
    }
    return SetReceiverEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SetReceiverEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSetReceiverEvent(data.bcs.type)) {
        throw new Error(`object at is not a SetReceiverEvent object`)
      }

      return SetReceiverEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SetReceiverEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SetReceiverEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SetReceiverEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSetReceiverEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SetReceiverEvent object`)
    }

    return SetReceiverEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== TransferMinterRoleEvent =============================== */

export function isTransferMinterRoleEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::TransferMinterRoleEvent`
}

export interface TransferMinterRoleEventFields {
  oldMinter: ToField<'address'>
  newMinter: ToField<'address'>
}

export type TransferMinterRoleEventReified = Reified<
  TransferMinterRoleEvent,
  TransferMinterRoleEventFields
>

export class TransferMinterRoleEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::TransferMinterRoleEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TransferMinterRoleEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::TransferMinterRoleEvent`
  readonly $typeArgs: []
  readonly $isPhantom = TransferMinterRoleEvent.$isPhantom

  readonly oldMinter: ToField<'address'>
  readonly newMinter: ToField<'address'>

  private constructor(typeArgs: [], fields: TransferMinterRoleEventFields) {
    this.$fullTypeName = composeSuiType(
      TransferMinterRoleEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::TransferMinterRoleEvent`
    this.$typeArgs = typeArgs

    this.oldMinter = fields.oldMinter
    this.newMinter = fields.newMinter
  }

  static reified(): TransferMinterRoleEventReified {
    const reifiedBcs = TransferMinterRoleEvent.bcs
    return {
      typeName: TransferMinterRoleEvent.$typeName,
      fullTypeName: composeSuiType(
        TransferMinterRoleEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::TransferMinterRoleEvent`,
      typeArgs: [] as [],
      isPhantom: TransferMinterRoleEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferMinterRoleEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        TransferMinterRoleEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferMinterRoleEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferMinterRoleEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferMinterRoleEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        TransferMinterRoleEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        TransferMinterRoleEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TransferMinterRoleEvent.fetch(client, id),
      new: (fields: TransferMinterRoleEventFields) => {
        return new TransferMinterRoleEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TransferMinterRoleEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferMinterRoleEvent>> {
    return phantom(TransferMinterRoleEvent.reified())
  }
  static get p() {
    return TransferMinterRoleEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TransferMinterRoleEvent', {
      old_minter: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      new_minter: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof TransferMinterRoleEvent.instantiateBcs> | null = null

  static get bcs() {
    if (!TransferMinterRoleEvent.cachedBcs) {
      TransferMinterRoleEvent.cachedBcs = TransferMinterRoleEvent.instantiateBcs()
    }
    return TransferMinterRoleEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TransferMinterRoleEvent {
    return TransferMinterRoleEvent.reified().new({
      oldMinter: decodeFromFields('address', fields.old_minter),
      newMinter: decodeFromFields('address', fields.new_minter),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TransferMinterRoleEvent {
    if (!isTransferMinterRoleEvent(item.type)) {
      throw new Error('not a TransferMinterRoleEvent type')
    }

    return TransferMinterRoleEvent.reified().new({
      oldMinter: decodeFromFieldsWithTypes('address', item.fields.old_minter),
      newMinter: decodeFromFieldsWithTypes('address', item.fields.new_minter),
    })
  }

  static fromBcs(data: Uint8Array): TransferMinterRoleEvent {
    return TransferMinterRoleEvent.fromFields(TransferMinterRoleEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      oldMinter: this.oldMinter,
      newMinter: this.newMinter,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TransferMinterRoleEvent {
    return TransferMinterRoleEvent.reified().new({
      oldMinter: decodeFromJSONField('address', field.oldMinter),
      newMinter: decodeFromJSONField('address', field.newMinter),
    })
  }

  static fromJSON(json: Record<string, any>): TransferMinterRoleEvent {
    if (json.$typeName !== TransferMinterRoleEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TransferMinterRoleEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TransferMinterRoleEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferMinterRoleEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a TransferMinterRoleEvent object`
      )
    }
    return TransferMinterRoleEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TransferMinterRoleEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferMinterRoleEvent(data.bcs.type)) {
        throw new Error(`object at is not a TransferMinterRoleEvent object`)
      }

      return TransferMinterRoleEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferMinterRoleEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TransferMinterRoleEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching TransferMinterRoleEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isTransferMinterRoleEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a TransferMinterRoleEvent object`)
    }

    return TransferMinterRoleEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== TransferDenylisterRoleEvent =============================== */

export function isTransferDenylisterRoleEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::xbtc::TransferDenylisterRoleEvent`
}

export interface TransferDenylisterRoleEventFields {
  oldDenylister: ToField<'address'>
  newDenylister: ToField<'address'>
}

export type TransferDenylisterRoleEventReified = Reified<
  TransferDenylisterRoleEvent,
  TransferDenylisterRoleEventFields
>

export class TransferDenylisterRoleEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::xbtc::TransferDenylisterRoleEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = TransferDenylisterRoleEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::xbtc::TransferDenylisterRoleEvent`
  readonly $typeArgs: []
  readonly $isPhantom = TransferDenylisterRoleEvent.$isPhantom

  readonly oldDenylister: ToField<'address'>
  readonly newDenylister: ToField<'address'>

  private constructor(typeArgs: [], fields: TransferDenylisterRoleEventFields) {
    this.$fullTypeName = composeSuiType(
      TransferDenylisterRoleEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::xbtc::TransferDenylisterRoleEvent`
    this.$typeArgs = typeArgs

    this.oldDenylister = fields.oldDenylister
    this.newDenylister = fields.newDenylister
  }

  static reified(): TransferDenylisterRoleEventReified {
    const reifiedBcs = TransferDenylisterRoleEvent.bcs
    return {
      typeName: TransferDenylisterRoleEvent.$typeName,
      fullTypeName: composeSuiType(
        TransferDenylisterRoleEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::xbtc::TransferDenylisterRoleEvent`,
      typeArgs: [] as [],
      isPhantom: TransferDenylisterRoleEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => TransferDenylisterRoleEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        TransferDenylisterRoleEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => TransferDenylisterRoleEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => TransferDenylisterRoleEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => TransferDenylisterRoleEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        TransferDenylisterRoleEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        TransferDenylisterRoleEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => TransferDenylisterRoleEvent.fetch(client, id),
      new: (fields: TransferDenylisterRoleEventFields) => {
        return new TransferDenylisterRoleEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return TransferDenylisterRoleEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<TransferDenylisterRoleEvent>> {
    return phantom(TransferDenylisterRoleEvent.reified())
  }
  static get p() {
    return TransferDenylisterRoleEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('TransferDenylisterRoleEvent', {
      old_denylister: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      new_denylister: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  private static cachedBcs: ReturnType<typeof TransferDenylisterRoleEvent.instantiateBcs> | null =
    null

  static get bcs() {
    if (!TransferDenylisterRoleEvent.cachedBcs) {
      TransferDenylisterRoleEvent.cachedBcs = TransferDenylisterRoleEvent.instantiateBcs()
    }
    return TransferDenylisterRoleEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): TransferDenylisterRoleEvent {
    return TransferDenylisterRoleEvent.reified().new({
      oldDenylister: decodeFromFields('address', fields.old_denylister),
      newDenylister: decodeFromFields('address', fields.new_denylister),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): TransferDenylisterRoleEvent {
    if (!isTransferDenylisterRoleEvent(item.type)) {
      throw new Error('not a TransferDenylisterRoleEvent type')
    }

    return TransferDenylisterRoleEvent.reified().new({
      oldDenylister: decodeFromFieldsWithTypes('address', item.fields.old_denylister),
      newDenylister: decodeFromFieldsWithTypes('address', item.fields.new_denylister),
    })
  }

  static fromBcs(data: Uint8Array): TransferDenylisterRoleEvent {
    return TransferDenylisterRoleEvent.fromFields(TransferDenylisterRoleEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      oldDenylister: this.oldDenylister,
      newDenylister: this.newDenylister,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): TransferDenylisterRoleEvent {
    return TransferDenylisterRoleEvent.reified().new({
      oldDenylister: decodeFromJSONField('address', field.oldDenylister),
      newDenylister: decodeFromJSONField('address', field.newDenylister),
    })
  }

  static fromJSON(json: Record<string, any>): TransferDenylisterRoleEvent {
    if (json.$typeName !== TransferDenylisterRoleEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return TransferDenylisterRoleEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): TransferDenylisterRoleEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isTransferDenylisterRoleEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a TransferDenylisterRoleEvent object`
      )
    }
    return TransferDenylisterRoleEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): TransferDenylisterRoleEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isTransferDenylisterRoleEvent(data.bcs.type)) {
        throw new Error(`object at is not a TransferDenylisterRoleEvent object`)
      }

      return TransferDenylisterRoleEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return TransferDenylisterRoleEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<TransferDenylisterRoleEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching TransferDenylisterRoleEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isTransferDenylisterRoleEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a TransferDenylisterRoleEvent object`)
    }

    return TransferDenylisterRoleEvent.fromSuiObjectData(res.data)
  }
}
