import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { PKG_V1, PKG_V7 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64, fromHEX, toHEX } from '@mysten/sui/utils'

/* ============================== BorrowFlashLoanEvent =============================== */

export function isBorrowFlashLoanEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::flash_loan::BorrowFlashLoanEvent`
}

export interface BorrowFlashLoanEventFields {
  borrower: ToField<'address'>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
}

export type BorrowFlashLoanEventReified = Reified<BorrowFlashLoanEvent, BorrowFlashLoanEventFields>

export class BorrowFlashLoanEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::flash_loan::BorrowFlashLoanEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BorrowFlashLoanEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::flash_loan::BorrowFlashLoanEvent`
  readonly $typeArgs: []
  readonly $isPhantom = BorrowFlashLoanEvent.$isPhantom

  readonly borrower: ToField<'address'>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: BorrowFlashLoanEventFields) {
    this.$fullTypeName = composeSuiType(
      BorrowFlashLoanEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::flash_loan::BorrowFlashLoanEvent`
    this.$typeArgs = typeArgs

    this.borrower = fields.borrower
    this.asset = fields.asset
    this.amount = fields.amount
  }

  static reified(): BorrowFlashLoanEventReified {
    return {
      typeName: BorrowFlashLoanEvent.$typeName,
      fullTypeName: composeSuiType(
        BorrowFlashLoanEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::flash_loan::BorrowFlashLoanEvent`,
      typeArgs: [] as [],
      isPhantom: BorrowFlashLoanEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowFlashLoanEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BorrowFlashLoanEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowFlashLoanEvent.fromBcs(data),
      bcs: BorrowFlashLoanEvent.bcs,
      fromJSONField: (field: any) => BorrowFlashLoanEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowFlashLoanEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        BorrowFlashLoanEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BorrowFlashLoanEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BorrowFlashLoanEvent.fetch(client, id),
      new: (fields: BorrowFlashLoanEventFields) => {
        return new BorrowFlashLoanEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BorrowFlashLoanEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowFlashLoanEvent>> {
    return phantom(BorrowFlashLoanEvent.reified())
  }
  static get p() {
    return BorrowFlashLoanEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('BorrowFlashLoanEvent', {
      borrower: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      asset: TypeName.bcs,
      amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): BorrowFlashLoanEvent {
    return BorrowFlashLoanEvent.reified().new({
      borrower: decodeFromFields('address', fields.borrower),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowFlashLoanEvent {
    if (!isBorrowFlashLoanEvent(item.type)) {
      throw new Error('not a BorrowFlashLoanEvent type')
    }

    return BorrowFlashLoanEvent.reified().new({
      borrower: decodeFromFieldsWithTypes('address', item.fields.borrower),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): BorrowFlashLoanEvent {
    return BorrowFlashLoanEvent.fromFields(BorrowFlashLoanEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      borrower: this.borrower,
      asset: this.asset.toJSONField(),
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowFlashLoanEvent {
    return BorrowFlashLoanEvent.reified().new({
      borrower: decodeFromJSONField('address', field.borrower),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowFlashLoanEvent {
    if (json.$typeName !== BorrowFlashLoanEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BorrowFlashLoanEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BorrowFlashLoanEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowFlashLoanEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BorrowFlashLoanEvent object`
      )
    }
    return BorrowFlashLoanEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BorrowFlashLoanEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowFlashLoanEvent(data.bcs.type)) {
        throw new Error(`object at is not a BorrowFlashLoanEvent object`)
      }

      return BorrowFlashLoanEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowFlashLoanEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BorrowFlashLoanEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BorrowFlashLoanEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBorrowFlashLoanEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BorrowFlashLoanEvent object`)
    }

    return BorrowFlashLoanEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== RepayFlashLoanEvent =============================== */

export function isRepayFlashLoanEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::flash_loan::RepayFlashLoanEvent`
}

export interface RepayFlashLoanEventFields {
  borrower: ToField<'address'>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
}

export type RepayFlashLoanEventReified = Reified<RepayFlashLoanEvent, RepayFlashLoanEventFields>

export class RepayFlashLoanEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::flash_loan::RepayFlashLoanEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RepayFlashLoanEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::flash_loan::RepayFlashLoanEvent`
  readonly $typeArgs: []
  readonly $isPhantom = RepayFlashLoanEvent.$isPhantom

  readonly borrower: ToField<'address'>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: RepayFlashLoanEventFields) {
    this.$fullTypeName = composeSuiType(
      RepayFlashLoanEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::flash_loan::RepayFlashLoanEvent`
    this.$typeArgs = typeArgs

    this.borrower = fields.borrower
    this.asset = fields.asset
    this.amount = fields.amount
  }

  static reified(): RepayFlashLoanEventReified {
    return {
      typeName: RepayFlashLoanEvent.$typeName,
      fullTypeName: composeSuiType(
        RepayFlashLoanEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::flash_loan::RepayFlashLoanEvent`,
      typeArgs: [] as [],
      isPhantom: RepayFlashLoanEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RepayFlashLoanEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => RepayFlashLoanEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RepayFlashLoanEvent.fromBcs(data),
      bcs: RepayFlashLoanEvent.bcs,
      fromJSONField: (field: any) => RepayFlashLoanEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RepayFlashLoanEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => RepayFlashLoanEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => RepayFlashLoanEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RepayFlashLoanEvent.fetch(client, id),
      new: (fields: RepayFlashLoanEventFields) => {
        return new RepayFlashLoanEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RepayFlashLoanEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RepayFlashLoanEvent>> {
    return phantom(RepayFlashLoanEvent.reified())
  }
  static get p() {
    return RepayFlashLoanEvent.phantom()
  }

  static get bcs() {
    return bcs.struct('RepayFlashLoanEvent', {
      borrower: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      asset: TypeName.bcs,
      amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): RepayFlashLoanEvent {
    return RepayFlashLoanEvent.reified().new({
      borrower: decodeFromFields('address', fields.borrower),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RepayFlashLoanEvent {
    if (!isRepayFlashLoanEvent(item.type)) {
      throw new Error('not a RepayFlashLoanEvent type')
    }

    return RepayFlashLoanEvent.reified().new({
      borrower: decodeFromFieldsWithTypes('address', item.fields.borrower),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): RepayFlashLoanEvent {
    return RepayFlashLoanEvent.fromFields(RepayFlashLoanEvent.bcs.parse(data))
  }

  toJSONField() {
    return {
      borrower: this.borrower,
      asset: this.asset.toJSONField(),
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RepayFlashLoanEvent {
    return RepayFlashLoanEvent.reified().new({
      borrower: decodeFromJSONField('address', field.borrower),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): RepayFlashLoanEvent {
    if (json.$typeName !== RepayFlashLoanEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RepayFlashLoanEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RepayFlashLoanEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRepayFlashLoanEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a RepayFlashLoanEvent object`)
    }
    return RepayFlashLoanEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RepayFlashLoanEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRepayFlashLoanEvent(data.bcs.type)) {
        throw new Error(`object at is not a RepayFlashLoanEvent object`)
      }

      return RepayFlashLoanEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RepayFlashLoanEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RepayFlashLoanEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RepayFlashLoanEvent object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRepayFlashLoanEvent(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RepayFlashLoanEvent object`)
    }

    return RepayFlashLoanEvent.fromSuiObjectData(res.data)
  }
}

/* ============================== BorrowFlashLoanV2Event =============================== */

export function isBorrowFlashLoanV2Event(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V7}::flash_loan::BorrowFlashLoanV2Event`
}

export interface BorrowFlashLoanV2EventFields {
  borrower: ToField<'address'>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
  fee: ToField<'u64'>
  feeDiscountNumerator: ToField<'u64'>
  feeDiscountDenominator: ToField<'u64'>
}

export type BorrowFlashLoanV2EventReified = Reified<
  BorrowFlashLoanV2Event,
  BorrowFlashLoanV2EventFields
>

export class BorrowFlashLoanV2Event implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::flash_loan::BorrowFlashLoanV2Event`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BorrowFlashLoanV2Event.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::flash_loan::BorrowFlashLoanV2Event`
  readonly $typeArgs: []
  readonly $isPhantom = BorrowFlashLoanV2Event.$isPhantom

  readonly borrower: ToField<'address'>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>
  readonly fee: ToField<'u64'>
  readonly feeDiscountNumerator: ToField<'u64'>
  readonly feeDiscountDenominator: ToField<'u64'>

  private constructor(typeArgs: [], fields: BorrowFlashLoanV2EventFields) {
    this.$fullTypeName = composeSuiType(
      BorrowFlashLoanV2Event.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::flash_loan::BorrowFlashLoanV2Event`
    this.$typeArgs = typeArgs

    this.borrower = fields.borrower
    this.asset = fields.asset
    this.amount = fields.amount
    this.fee = fields.fee
    this.feeDiscountNumerator = fields.feeDiscountNumerator
    this.feeDiscountDenominator = fields.feeDiscountDenominator
  }

  static reified(): BorrowFlashLoanV2EventReified {
    return {
      typeName: BorrowFlashLoanV2Event.$typeName,
      fullTypeName: composeSuiType(
        BorrowFlashLoanV2Event.$typeName,
        ...[]
      ) as `${typeof PKG_V7}::flash_loan::BorrowFlashLoanV2Event`,
      typeArgs: [] as [],
      isPhantom: BorrowFlashLoanV2Event.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BorrowFlashLoanV2Event.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        BorrowFlashLoanV2Event.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BorrowFlashLoanV2Event.fromBcs(data),
      bcs: BorrowFlashLoanV2Event.bcs,
      fromJSONField: (field: any) => BorrowFlashLoanV2Event.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BorrowFlashLoanV2Event.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        BorrowFlashLoanV2Event.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        BorrowFlashLoanV2Event.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BorrowFlashLoanV2Event.fetch(client, id),
      new: (fields: BorrowFlashLoanV2EventFields) => {
        return new BorrowFlashLoanV2Event([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BorrowFlashLoanV2Event.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BorrowFlashLoanV2Event>> {
    return phantom(BorrowFlashLoanV2Event.reified())
  }
  static get p() {
    return BorrowFlashLoanV2Event.phantom()
  }

  static get bcs() {
    return bcs.struct('BorrowFlashLoanV2Event', {
      borrower: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      asset: TypeName.bcs,
      amount: bcs.u64(),
      fee: bcs.u64(),
      fee_discount_numerator: bcs.u64(),
      fee_discount_denominator: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): BorrowFlashLoanV2Event {
    return BorrowFlashLoanV2Event.reified().new({
      borrower: decodeFromFields('address', fields.borrower),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
      fee: decodeFromFields('u64', fields.fee),
      feeDiscountNumerator: decodeFromFields('u64', fields.fee_discount_numerator),
      feeDiscountDenominator: decodeFromFields('u64', fields.fee_discount_denominator),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BorrowFlashLoanV2Event {
    if (!isBorrowFlashLoanV2Event(item.type)) {
      throw new Error('not a BorrowFlashLoanV2Event type')
    }

    return BorrowFlashLoanV2Event.reified().new({
      borrower: decodeFromFieldsWithTypes('address', item.fields.borrower),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      fee: decodeFromFieldsWithTypes('u64', item.fields.fee),
      feeDiscountNumerator: decodeFromFieldsWithTypes('u64', item.fields.fee_discount_numerator),
      feeDiscountDenominator: decodeFromFieldsWithTypes(
        'u64',
        item.fields.fee_discount_denominator
      ),
    })
  }

  static fromBcs(data: Uint8Array): BorrowFlashLoanV2Event {
    return BorrowFlashLoanV2Event.fromFields(BorrowFlashLoanV2Event.bcs.parse(data))
  }

  toJSONField() {
    return {
      borrower: this.borrower,
      asset: this.asset.toJSONField(),
      amount: this.amount.toString(),
      fee: this.fee.toString(),
      feeDiscountNumerator: this.feeDiscountNumerator.toString(),
      feeDiscountDenominator: this.feeDiscountDenominator.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BorrowFlashLoanV2Event {
    return BorrowFlashLoanV2Event.reified().new({
      borrower: decodeFromJSONField('address', field.borrower),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
      fee: decodeFromJSONField('u64', field.fee),
      feeDiscountNumerator: decodeFromJSONField('u64', field.feeDiscountNumerator),
      feeDiscountDenominator: decodeFromJSONField('u64', field.feeDiscountDenominator),
    })
  }

  static fromJSON(json: Record<string, any>): BorrowFlashLoanV2Event {
    if (json.$typeName !== BorrowFlashLoanV2Event.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BorrowFlashLoanV2Event.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BorrowFlashLoanV2Event {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBorrowFlashLoanV2Event(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a BorrowFlashLoanV2Event object`
      )
    }
    return BorrowFlashLoanV2Event.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BorrowFlashLoanV2Event {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBorrowFlashLoanV2Event(data.bcs.type)) {
        throw new Error(`object at is not a BorrowFlashLoanV2Event object`)
      }

      return BorrowFlashLoanV2Event.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BorrowFlashLoanV2Event.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BorrowFlashLoanV2Event> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BorrowFlashLoanV2Event object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBorrowFlashLoanV2Event(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BorrowFlashLoanV2Event object`)
    }

    return BorrowFlashLoanV2Event.fromSuiObjectData(res.data)
  }
}

/* ============================== RepayFlashLoanV2Event =============================== */

export function isRepayFlashLoanV2Event(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V7}::flash_loan::RepayFlashLoanV2Event`
}

export interface RepayFlashLoanV2EventFields {
  borrower: ToField<'address'>
  asset: ToField<TypeName>
  amount: ToField<'u64'>
  fee: ToField<'u64'>
}

export type RepayFlashLoanV2EventReified = Reified<
  RepayFlashLoanV2Event,
  RepayFlashLoanV2EventFields
>

export class RepayFlashLoanV2Event implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V7}::flash_loan::RepayFlashLoanV2Event`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = RepayFlashLoanV2Event.$typeName
  readonly $fullTypeName: `${typeof PKG_V7}::flash_loan::RepayFlashLoanV2Event`
  readonly $typeArgs: []
  readonly $isPhantom = RepayFlashLoanV2Event.$isPhantom

  readonly borrower: ToField<'address'>
  readonly asset: ToField<TypeName>
  readonly amount: ToField<'u64'>
  readonly fee: ToField<'u64'>

  private constructor(typeArgs: [], fields: RepayFlashLoanV2EventFields) {
    this.$fullTypeName = composeSuiType(
      RepayFlashLoanV2Event.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V7}::flash_loan::RepayFlashLoanV2Event`
    this.$typeArgs = typeArgs

    this.borrower = fields.borrower
    this.asset = fields.asset
    this.amount = fields.amount
    this.fee = fields.fee
  }

  static reified(): RepayFlashLoanV2EventReified {
    return {
      typeName: RepayFlashLoanV2Event.$typeName,
      fullTypeName: composeSuiType(
        RepayFlashLoanV2Event.$typeName,
        ...[]
      ) as `${typeof PKG_V7}::flash_loan::RepayFlashLoanV2Event`,
      typeArgs: [] as [],
      isPhantom: RepayFlashLoanV2Event.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RepayFlashLoanV2Event.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RepayFlashLoanV2Event.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RepayFlashLoanV2Event.fromBcs(data),
      bcs: RepayFlashLoanV2Event.bcs,
      fromJSONField: (field: any) => RepayFlashLoanV2Event.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RepayFlashLoanV2Event.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        RepayFlashLoanV2Event.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RepayFlashLoanV2Event.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => RepayFlashLoanV2Event.fetch(client, id),
      new: (fields: RepayFlashLoanV2EventFields) => {
        return new RepayFlashLoanV2Event([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return RepayFlashLoanV2Event.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RepayFlashLoanV2Event>> {
    return phantom(RepayFlashLoanV2Event.reified())
  }
  static get p() {
    return RepayFlashLoanV2Event.phantom()
  }

  static get bcs() {
    return bcs.struct('RepayFlashLoanV2Event', {
      borrower: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
      asset: TypeName.bcs,
      amount: bcs.u64(),
      fee: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): RepayFlashLoanV2Event {
    return RepayFlashLoanV2Event.reified().new({
      borrower: decodeFromFields('address', fields.borrower),
      asset: decodeFromFields(TypeName.reified(), fields.asset),
      amount: decodeFromFields('u64', fields.amount),
      fee: decodeFromFields('u64', fields.fee),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RepayFlashLoanV2Event {
    if (!isRepayFlashLoanV2Event(item.type)) {
      throw new Error('not a RepayFlashLoanV2Event type')
    }

    return RepayFlashLoanV2Event.reified().new({
      borrower: decodeFromFieldsWithTypes('address', item.fields.borrower),
      asset: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.asset),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      fee: decodeFromFieldsWithTypes('u64', item.fields.fee),
    })
  }

  static fromBcs(data: Uint8Array): RepayFlashLoanV2Event {
    return RepayFlashLoanV2Event.fromFields(RepayFlashLoanV2Event.bcs.parse(data))
  }

  toJSONField() {
    return {
      borrower: this.borrower,
      asset: this.asset.toJSONField(),
      amount: this.amount.toString(),
      fee: this.fee.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RepayFlashLoanV2Event {
    return RepayFlashLoanV2Event.reified().new({
      borrower: decodeFromJSONField('address', field.borrower),
      asset: decodeFromJSONField(TypeName.reified(), field.asset),
      amount: decodeFromJSONField('u64', field.amount),
      fee: decodeFromJSONField('u64', field.fee),
    })
  }

  static fromJSON(json: Record<string, any>): RepayFlashLoanV2Event {
    if (json.$typeName !== RepayFlashLoanV2Event.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return RepayFlashLoanV2Event.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): RepayFlashLoanV2Event {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRepayFlashLoanV2Event(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RepayFlashLoanV2Event object`
      )
    }
    return RepayFlashLoanV2Event.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): RepayFlashLoanV2Event {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRepayFlashLoanV2Event(data.bcs.type)) {
        throw new Error(`object at is not a RepayFlashLoanV2Event object`)
      }

      return RepayFlashLoanV2Event.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RepayFlashLoanV2Event.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<RepayFlashLoanV2Event> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching RepayFlashLoanV2Event object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isRepayFlashLoanV2Event(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a RepayFlashLoanV2Event object`)
    }

    return RepayFlashLoanV2Event.fromSuiObjectData(res.data)
  }
}
