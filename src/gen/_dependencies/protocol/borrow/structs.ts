/**
 * @title A module dedicated for handling the borrow request from user
 * @author Scallop Labs
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64, fromHex, toHex } from '@mysten/sui/utils'
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
import { TypeName } from '../../../std/type-name/structs'
import { ID } from '../../../sui/object/structs'

/* ============================== BorrowEvent =============================== */

export function isBorrowEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'borrow::BorrowEvent')}::borrow::BorrowEvent`
}

export interface BorrowEventFields {
  borrower: ToField<'address'>
  obligation: ToField<ID>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
  time: ToField<'u64'>
}

export type BorrowEventReified = Reified<BorrowEvent, BorrowEventFields>

export type BorrowEventJSONField = {
  borrower: string
  obligation: string
  asset: string
  amount: string
  time: string
}

export type BorrowEventJSON = {
  $typeName: typeof BorrowEvent.$typeName
  $typeArgs: []
} & BorrowEventJSONField

export class BorrowEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow::BorrowEvent` {
    return `${getTypeOrigin('protocol', 'borrow::BorrowEvent')}::borrow::BorrowEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowEvent.$typeName = BorrowEvent.$typeName
  readonly $fullTypeName: `${string}::borrow::BorrowEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowEvent.$isPhantom = BorrowEvent.$isPhantom

  readonly borrower: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>
  readonly time: ToField<'u64'>

  private constructor(typeArgs: [], fields: BorrowEventFields) {
    this.$fullTypeName = composeSuiType(
      BorrowEvent.$typeName,
      ...typeArgs,
    ) as `${string}::borrow::BorrowEvent`
    this.$typeArgs = typeArgs

    this.borrower = fields.borrower
    this.obligation = fields.obligation
    this.asset = fields.asset
    this.amount = fields.amount
    this.time = fields.time
  }

  static reified(): BorrowEventReified {
    const reifiedBcs = BorrowEvent.bcs
    return {
      get typeName() {
        return BorrowEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowEvent.$typeName,
          ...[],
        ) as `${string}::borrow::BorrowEvent`
      },
      typeArgs: [] as [],
      isPhantom: BorrowEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowEvent.fetch(client, id),
      new: (fields: BorrowEventFields) => {
        return new BorrowEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowEventReified {
    return BorrowEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowEvent>> {
    return phantom(BorrowEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowEvent>> {
    return BorrowEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowEvent', {
      borrower: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      obligation: ID.bcs,
      asset: TypeName.bcs,
      amount: bcs.u64(),
      time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowEvent.instantiateBcs> {
    if (!BorrowEvent.cachedBcs) {
      BorrowEvent.cachedBcs = BorrowEvent.instantiateBcs()
    }
    return BorrowEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowEvent {
    return BorrowEvent.reified().new({
      borrower: decodeFromFields('address', fields.borrower),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
      time: decodeFromFields('u64', fields.time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowEvent {
    if (!isBorrowEvent(item.type)) {
      throw new Error('not a BorrowEvent type')
    }

    return BorrowEvent.reified().new({
      borrower: decodeFromFieldsWithTypes('address', item.fields.borrower),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      time: decodeFromFieldsWithTypes('u64', item.fields.time),
    })
  }

  static fromBcs(data: Uint8Array): BorrowEvent {
    return BorrowEvent.fromFields(BorrowEvent.bcs.parse(data))
  }

  toJSONField(): BorrowEventJSONField {
    return {
      borrower: this.borrower,
      obligation: this.obligation,
      asset: this.asset,
      amount: this.amount.toString(),
      time: this.time.toString(),
    }
  }

  toJSON(): BorrowEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowEvent {
    return BorrowEvent.reified().new({
      borrower: decodeFromJSONField('address', field.borrower),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
      time: decodeFromJSONField('u64', field.time),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowEvent {
    if (json.$typeName !== BorrowEvent.$typeName) {
      throw new Error(
        `not a BorrowEvent json object: expected '${BorrowEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowEvent {
    if (!isBorrowEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowEvent object`)
    }
    return BorrowEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowEvent object`)
    }
    return BorrowEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowEvent(data.bcs.type)) {
        throw new Error(`object at is not a BorrowEvent object`)
      }

      return BorrowEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowEvent(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowEvent object`)
    }
    return BorrowEvent.fromBcs(object.content)
  }
}

/* ============================== BorrowEventV2 =============================== */

export function isBorrowEventV2(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'borrow::BorrowEventV2')}::borrow::BorrowEventV2`
}

export interface BorrowEventV2Fields {
  borrower: ToField<'address'>
  obligation: ToField<ID>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
  borrowFee: ToField<'u64'>
  time: ToField<'u64'>
}

export type BorrowEventV2Reified = Reified<BorrowEventV2, BorrowEventV2Fields>

export type BorrowEventV2JSONField = {
  borrower: string
  obligation: string
  asset: string
  amount: string
  borrowFee: string
  time: string
}

export type BorrowEventV2JSON = {
  $typeName: typeof BorrowEventV2.$typeName
  $typeArgs: []
} & BorrowEventV2JSONField

export class BorrowEventV2 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow::BorrowEventV2` {
    return `${getTypeOrigin('protocol', 'borrow::BorrowEventV2')}::borrow::BorrowEventV2` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowEventV2.$typeName = BorrowEventV2.$typeName
  readonly $fullTypeName: `${string}::borrow::BorrowEventV2`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowEventV2.$isPhantom = BorrowEventV2.$isPhantom

  readonly borrower: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>
  readonly borrowFee: ToField<'u64'>
  readonly time: ToField<'u64'>

  private constructor(typeArgs: [], fields: BorrowEventV2Fields) {
    this.$fullTypeName = composeSuiType(
      BorrowEventV2.$typeName,
      ...typeArgs,
    ) as `${string}::borrow::BorrowEventV2`
    this.$typeArgs = typeArgs

    this.borrower = fields.borrower
    this.obligation = fields.obligation
    this.asset = fields.asset
    this.amount = fields.amount
    this.borrowFee = fields.borrowFee
    this.time = fields.time
  }

  static reified(): BorrowEventV2Reified {
    const reifiedBcs = BorrowEventV2.bcs
    return {
      get typeName() {
        return BorrowEventV2.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowEventV2.$typeName,
          ...[],
        ) as `${string}::borrow::BorrowEventV2`
      },
      typeArgs: [] as [],
      isPhantom: BorrowEventV2.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowEventV2.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowEventV2.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowEventV2.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowEventV2.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowEventV2.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowEventV2.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowEventV2.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowEventV2.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowEventV2.fetch(client, id),
      new: (fields: BorrowEventV2Fields) => {
        return new BorrowEventV2([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowEventV2Reified {
    return BorrowEventV2.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowEventV2>> {
    return phantom(BorrowEventV2.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowEventV2>> {
    return BorrowEventV2.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowEventV2', {
      borrower: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      obligation: ID.bcs,
      asset: TypeName.bcs,
      amount: bcs.u64(),
      borrow_fee: bcs.u64(),
      time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowEventV2.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowEventV2.instantiateBcs> {
    if (!BorrowEventV2.cachedBcs) {
      BorrowEventV2.cachedBcs = BorrowEventV2.instantiateBcs()
    }
    return BorrowEventV2.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowEventV2 {
    return BorrowEventV2.reified().new({
      borrower: decodeFromFields('address', fields.borrower),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
      borrowFee: decodeFromFields('u64', fields.borrow_fee),
      time: decodeFromFields('u64', fields.time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowEventV2 {
    if (!isBorrowEventV2(item.type)) {
      throw new Error('not a BorrowEventV2 type')
    }

    return BorrowEventV2.reified().new({
      borrower: decodeFromFieldsWithTypes('address', item.fields.borrower),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      borrowFee: decodeFromFieldsWithTypes('u64', item.fields.borrow_fee),
      time: decodeFromFieldsWithTypes('u64', item.fields.time),
    })
  }

  static fromBcs(data: Uint8Array): BorrowEventV2 {
    return BorrowEventV2.fromFields(BorrowEventV2.bcs.parse(data))
  }

  toJSONField(): BorrowEventV2JSONField {
    return {
      borrower: this.borrower,
      obligation: this.obligation,
      asset: this.asset,
      amount: this.amount.toString(),
      borrowFee: this.borrowFee.toString(),
      time: this.time.toString(),
    }
  }

  toJSON(): BorrowEventV2JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowEventV2 {
    return BorrowEventV2.reified().new({
      borrower: decodeFromJSONField('address', field.borrower),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
      borrowFee: decodeFromJSONField('u64', field.borrowFee),
      time: decodeFromJSONField('u64', field.time),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowEventV2 {
    if (json.$typeName !== BorrowEventV2.$typeName) {
      throw new Error(
        `not a BorrowEventV2 json object: expected '${BorrowEventV2.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowEventV2.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowEventV2 {
    if (!isBorrowEventV2(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowEventV2 object`)
    }
    return BorrowEventV2.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowEventV2.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowEventV2 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowEventV2(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowEventV2 object`)
    }
    return BorrowEventV2.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowEventV2.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowEventV2 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowEventV2(data.bcs.type)) {
        throw new Error(`object at is not a BorrowEventV2 object`)
      }

      return BorrowEventV2.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowEventV2.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowEventV2> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowEventV2(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowEventV2 object`)
    }
    return BorrowEventV2.fromBcs(object.content)
  }
}

/* ============================== BorrowEventV3 =============================== */

export function isBorrowEventV3(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'borrow::BorrowEventV3')}::borrow::BorrowEventV3`
}

export interface BorrowEventV3Fields {
  borrower: ToField<'address'>
  obligation: ToField<ID>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
  borrowFee: ToField<'u64'>
  borrowFeeDiscount: ToField<'u64'>
  borrowReferralFee: ToField<'u64'>
  time: ToField<'u64'>
}

export type BorrowEventV3Reified = Reified<BorrowEventV3, BorrowEventV3Fields>

export type BorrowEventV3JSONField = {
  borrower: string
  obligation: string
  asset: string
  amount: string
  borrowFee: string
  borrowFeeDiscount: string
  borrowReferralFee: string
  time: string
}

export type BorrowEventV3JSON = {
  $typeName: typeof BorrowEventV3.$typeName
  $typeArgs: []
} & BorrowEventV3JSONField

export class BorrowEventV3 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::borrow::BorrowEventV3` {
    return `${getTypeOrigin('protocol', 'borrow::BorrowEventV3')}::borrow::BorrowEventV3` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BorrowEventV3.$typeName = BorrowEventV3.$typeName
  readonly $fullTypeName: `${string}::borrow::BorrowEventV3`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BorrowEventV3.$isPhantom = BorrowEventV3.$isPhantom

  readonly borrower: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>
  readonly borrowFee: ToField<'u64'>
  readonly borrowFeeDiscount: ToField<'u64'>
  readonly borrowReferralFee: ToField<'u64'>
  readonly time: ToField<'u64'>

  private constructor(typeArgs: [], fields: BorrowEventV3Fields) {
    this.$fullTypeName = composeSuiType(
      BorrowEventV3.$typeName,
      ...typeArgs,
    ) as `${string}::borrow::BorrowEventV3`
    this.$typeArgs = typeArgs

    this.borrower = fields.borrower
    this.obligation = fields.obligation
    this.asset = fields.asset
    this.amount = fields.amount
    this.borrowFee = fields.borrowFee
    this.borrowFeeDiscount = fields.borrowFeeDiscount
    this.borrowReferralFee = fields.borrowReferralFee
    this.time = fields.time
  }

  static reified(): BorrowEventV3Reified {
    const reifiedBcs = BorrowEventV3.bcs
    return {
      get typeName() {
        return BorrowEventV3.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          BorrowEventV3.$typeName,
          ...[],
        ) as `${string}::borrow::BorrowEventV3`
      },
      typeArgs: [] as [],
      isPhantom: BorrowEventV3.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowEventV3.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowEventV3.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowEventV3.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BorrowEventV3.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowEventV3.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        BorrowEventV3.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => BorrowEventV3.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BorrowEventV3.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => BorrowEventV3.fetch(client, id),
      new: (fields: BorrowEventV3Fields) => {
        return new BorrowEventV3([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BorrowEventV3Reified {
    return BorrowEventV3.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowEventV3>> {
    return phantom(BorrowEventV3.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BorrowEventV3>> {
    return BorrowEventV3.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BorrowEventV3', {
      borrower: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      obligation: ID.bcs,
      asset: TypeName.bcs,
      amount: bcs.u64(),
      borrow_fee: bcs.u64(),
      borrow_fee_discount: bcs.u64(),
      borrow_referral_fee: bcs.u64(),
      time: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BorrowEventV3.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BorrowEventV3.instantiateBcs> {
    if (!BorrowEventV3.cachedBcs) {
      BorrowEventV3.cachedBcs = BorrowEventV3.instantiateBcs()
    }
    return BorrowEventV3.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BorrowEventV3 {
    return BorrowEventV3.reified().new({
      borrower: decodeFromFields('address', fields.borrower),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
      borrowFee: decodeFromFields('u64', fields.borrow_fee),
      borrowFeeDiscount: decodeFromFields('u64', fields.borrow_fee_discount),
      borrowReferralFee: decodeFromFields('u64', fields.borrow_referral_fee),
      time: decodeFromFields('u64', fields.time),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowEventV3 {
    if (!isBorrowEventV3(item.type)) {
      throw new Error('not a BorrowEventV3 type')
    }

    return BorrowEventV3.reified().new({
      borrower: decodeFromFieldsWithTypes('address', item.fields.borrower),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      borrowFee: decodeFromFieldsWithTypes('u64', item.fields.borrow_fee),
      borrowFeeDiscount: decodeFromFieldsWithTypes('u64', item.fields.borrow_fee_discount),
      borrowReferralFee: decodeFromFieldsWithTypes('u64', item.fields.borrow_referral_fee),
      time: decodeFromFieldsWithTypes('u64', item.fields.time),
    })
  }

  static fromBcs(data: Uint8Array): BorrowEventV3 {
    return BorrowEventV3.fromFields(BorrowEventV3.bcs.parse(data))
  }

  toJSONField(): BorrowEventV3JSONField {
    return {
      borrower: this.borrower,
      obligation: this.obligation,
      asset: this.asset,
      amount: this.amount.toString(),
      borrowFee: this.borrowFee.toString(),
      borrowFeeDiscount: this.borrowFeeDiscount.toString(),
      borrowReferralFee: this.borrowReferralFee.toString(),
      time: this.time.toString(),
    }
  }

  toJSON(): BorrowEventV3JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowEventV3 {
    return BorrowEventV3.reified().new({
      borrower: decodeFromJSONField('address', field.borrower),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
      borrowFee: decodeFromJSONField('u64', field.borrowFee),
      borrowFeeDiscount: decodeFromJSONField('u64', field.borrowFeeDiscount),
      borrowReferralFee: decodeFromJSONField('u64', field.borrowReferralFee),
      time: decodeFromJSONField('u64', field.time),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowEventV3 {
    if (json.$typeName !== BorrowEventV3.$typeName) {
      throw new Error(
        `not a BorrowEventV3 json object: expected '${BorrowEventV3.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return BorrowEventV3.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): BorrowEventV3 {
    if (!isBorrowEventV3(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a BorrowEventV3 object`)
    }
    return BorrowEventV3.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowEventV3.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): BorrowEventV3 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowEventV3(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BorrowEventV3 object`)
    }
    return BorrowEventV3.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link BorrowEventV3.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): BorrowEventV3 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowEventV3(data.bcs.type)) {
        throw new Error(`object at is not a BorrowEventV3 object`)
      }

      return BorrowEventV3.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowEventV3.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<BorrowEventV3> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isBorrowEventV3(object.type)) {
      throw new Error(`object at id ${id} is not a BorrowEventV3 object`)
    }
    return BorrowEventV3.fromBcs(object.content)
  }
}
