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
import { FixedPoint32 } from '../../../../move-stdlib/fixed-point32/structs'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== InterestModel =============================== */

export function isInterestModel(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::interest_model::InterestModel`
}

export interface InterestModelFields {
  type: ToField<TypeName>
  baseBorrowRatePerSec: ToField<FixedPoint32>
  interestRateScale: ToField<'u64'>
  borrowRateOnMidKink: ToField<FixedPoint32>
  midKink: ToField<FixedPoint32>
  borrowRateOnHighKink: ToField<FixedPoint32>
  highKink: ToField<FixedPoint32>
  maxBorrowRate: ToField<FixedPoint32>
  revenueFactor: ToField<FixedPoint32>
  borrowWeight: ToField<FixedPoint32>
  minBorrowAmount: ToField<'u64'>
}

export type InterestModelReified = Reified<InterestModel, InterestModelFields>

export class InterestModel implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::interest_model::InterestModel`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InterestModel.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::interest_model::InterestModel`
  readonly $typeArgs: []
  readonly $isPhantom = InterestModel.$isPhantom

  readonly type: ToField<TypeName>
  readonly baseBorrowRatePerSec: ToField<FixedPoint32>
  readonly interestRateScale: ToField<'u64'>
  readonly borrowRateOnMidKink: ToField<FixedPoint32>
  readonly midKink: ToField<FixedPoint32>
  readonly borrowRateOnHighKink: ToField<FixedPoint32>
  readonly highKink: ToField<FixedPoint32>
  readonly maxBorrowRate: ToField<FixedPoint32>
  readonly revenueFactor: ToField<FixedPoint32>
  readonly borrowWeight: ToField<FixedPoint32>
  readonly minBorrowAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: InterestModelFields) {
    this.$fullTypeName = composeSuiType(
      InterestModel.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::interest_model::InterestModel`
    this.$typeArgs = typeArgs

    this.type = fields.type
    this.baseBorrowRatePerSec = fields.baseBorrowRatePerSec
    this.interestRateScale = fields.interestRateScale
    this.borrowRateOnMidKink = fields.borrowRateOnMidKink
    this.midKink = fields.midKink
    this.borrowRateOnHighKink = fields.borrowRateOnHighKink
    this.highKink = fields.highKink
    this.maxBorrowRate = fields.maxBorrowRate
    this.revenueFactor = fields.revenueFactor
    this.borrowWeight = fields.borrowWeight
    this.minBorrowAmount = fields.minBorrowAmount
  }

  static reified(): InterestModelReified {
    return {
      typeName: InterestModel.$typeName,
      fullTypeName: composeSuiType(
        InterestModel.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::interest_model::InterestModel`,
      typeArgs: [] as [],
      isPhantom: InterestModel.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InterestModel.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => InterestModel.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InterestModel.fromBcs(data),
      bcs: InterestModel.bcs,
      fromJSONField: (field: any) => InterestModel.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InterestModel.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => InterestModel.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => InterestModel.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => InterestModel.fetch(client, id),
      new: (fields: InterestModelFields) => {
        return new InterestModel([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InterestModel.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InterestModel>> {
    return phantom(InterestModel.reified())
  }
  static get p() {
    return InterestModel.phantom()
  }

  static get bcs() {
    return bcs.struct('InterestModel', {
      type: TypeName.bcs,
      base_borrow_rate_per_sec: FixedPoint32.bcs,
      interest_rate_scale: bcs.u64(),
      borrow_rate_on_mid_kink: FixedPoint32.bcs,
      mid_kink: FixedPoint32.bcs,
      borrow_rate_on_high_kink: FixedPoint32.bcs,
      high_kink: FixedPoint32.bcs,
      max_borrow_rate: FixedPoint32.bcs,
      revenue_factor: FixedPoint32.bcs,
      borrow_weight: FixedPoint32.bcs,
      min_borrow_amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): InterestModel {
    return InterestModel.reified().new({
      type: decodeFromFields(TypeName.reified(), fields.type),
      baseBorrowRatePerSec: decodeFromFields(
        FixedPoint32.reified(),
        fields.base_borrow_rate_per_sec
      ),
      interestRateScale: decodeFromFields('u64', fields.interest_rate_scale),
      borrowRateOnMidKink: decodeFromFields(FixedPoint32.reified(), fields.borrow_rate_on_mid_kink),
      midKink: decodeFromFields(FixedPoint32.reified(), fields.mid_kink),
      borrowRateOnHighKink: decodeFromFields(
        FixedPoint32.reified(),
        fields.borrow_rate_on_high_kink
      ),
      highKink: decodeFromFields(FixedPoint32.reified(), fields.high_kink),
      maxBorrowRate: decodeFromFields(FixedPoint32.reified(), fields.max_borrow_rate),
      revenueFactor: decodeFromFields(FixedPoint32.reified(), fields.revenue_factor),
      borrowWeight: decodeFromFields(FixedPoint32.reified(), fields.borrow_weight),
      minBorrowAmount: decodeFromFields('u64', fields.min_borrow_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InterestModel {
    if (!isInterestModel(item.type)) {
      throw new Error('not a InterestModel type')
    }

    return InterestModel.reified().new({
      type: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.type),
      baseBorrowRatePerSec: decodeFromFieldsWithTypes(
        FixedPoint32.reified(),
        item.fields.base_borrow_rate_per_sec
      ),
      interestRateScale: decodeFromFieldsWithTypes('u64', item.fields.interest_rate_scale),
      borrowRateOnMidKink: decodeFromFieldsWithTypes(
        FixedPoint32.reified(),
        item.fields.borrow_rate_on_mid_kink
      ),
      midKink: decodeFromFieldsWithTypes(FixedPoint32.reified(), item.fields.mid_kink),
      borrowRateOnHighKink: decodeFromFieldsWithTypes(
        FixedPoint32.reified(),
        item.fields.borrow_rate_on_high_kink
      ),
      highKink: decodeFromFieldsWithTypes(FixedPoint32.reified(), item.fields.high_kink),
      maxBorrowRate: decodeFromFieldsWithTypes(FixedPoint32.reified(), item.fields.max_borrow_rate),
      revenueFactor: decodeFromFieldsWithTypes(FixedPoint32.reified(), item.fields.revenue_factor),
      borrowWeight: decodeFromFieldsWithTypes(FixedPoint32.reified(), item.fields.borrow_weight),
      minBorrowAmount: decodeFromFieldsWithTypes('u64', item.fields.min_borrow_amount),
    })
  }

  static fromBcs(data: Uint8Array): InterestModel {
    return InterestModel.fromFields(InterestModel.bcs.parse(data))
  }

  toJSONField() {
    return {
      type: this.type.toJSONField(),
      baseBorrowRatePerSec: this.baseBorrowRatePerSec.toJSONField(),
      interestRateScale: this.interestRateScale.toString(),
      borrowRateOnMidKink: this.borrowRateOnMidKink.toJSONField(),
      midKink: this.midKink.toJSONField(),
      borrowRateOnHighKink: this.borrowRateOnHighKink.toJSONField(),
      highKink: this.highKink.toJSONField(),
      maxBorrowRate: this.maxBorrowRate.toJSONField(),
      revenueFactor: this.revenueFactor.toJSONField(),
      borrowWeight: this.borrowWeight.toJSONField(),
      minBorrowAmount: this.minBorrowAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InterestModel {
    return InterestModel.reified().new({
      type: decodeFromJSONField(TypeName.reified(), field.type),
      baseBorrowRatePerSec: decodeFromJSONField(FixedPoint32.reified(), field.baseBorrowRatePerSec),
      interestRateScale: decodeFromJSONField('u64', field.interestRateScale),
      borrowRateOnMidKink: decodeFromJSONField(FixedPoint32.reified(), field.borrowRateOnMidKink),
      midKink: decodeFromJSONField(FixedPoint32.reified(), field.midKink),
      borrowRateOnHighKink: decodeFromJSONField(FixedPoint32.reified(), field.borrowRateOnHighKink),
      highKink: decodeFromJSONField(FixedPoint32.reified(), field.highKink),
      maxBorrowRate: decodeFromJSONField(FixedPoint32.reified(), field.maxBorrowRate),
      revenueFactor: decodeFromJSONField(FixedPoint32.reified(), field.revenueFactor),
      borrowWeight: decodeFromJSONField(FixedPoint32.reified(), field.borrowWeight),
      minBorrowAmount: decodeFromJSONField('u64', field.minBorrowAmount),
    })
  }

  static fromJSON(json: Record<string, any>): InterestModel {
    if (json.$typeName !== InterestModel.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return InterestModel.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InterestModel {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInterestModel(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a InterestModel object`)
    }
    return InterestModel.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InterestModel {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInterestModel(data.bcs.type)) {
        throw new Error(`object at is not a InterestModel object`)
      }

      return InterestModel.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InterestModel.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InterestModel> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching InterestModel object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isInterestModel(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a InterestModel object`)
    }

    return InterestModel.fromSuiObjectData(res.data)
  }
}

/* ============================== InterestModelAdded =============================== */

export function isInterestModelAdded(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::interest_model::InterestModelAdded`
}

export interface InterestModelAddedFields {
  interestModel: ToField<InterestModel>
  currentEpoch: ToField<'u64'>
}

export type InterestModelAddedReified = Reified<InterestModelAdded, InterestModelAddedFields>

export class InterestModelAdded implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::interest_model::InterestModelAdded`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InterestModelAdded.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::interest_model::InterestModelAdded`
  readonly $typeArgs: []
  readonly $isPhantom = InterestModelAdded.$isPhantom

  readonly interestModel: ToField<InterestModel>
  readonly currentEpoch: ToField<'u64'>

  private constructor(typeArgs: [], fields: InterestModelAddedFields) {
    this.$fullTypeName = composeSuiType(
      InterestModelAdded.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::interest_model::InterestModelAdded`
    this.$typeArgs = typeArgs

    this.interestModel = fields.interestModel
    this.currentEpoch = fields.currentEpoch
  }

  static reified(): InterestModelAddedReified {
    return {
      typeName: InterestModelAdded.$typeName,
      fullTypeName: composeSuiType(
        InterestModelAdded.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::interest_model::InterestModelAdded`,
      typeArgs: [] as [],
      isPhantom: InterestModelAdded.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InterestModelAdded.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => InterestModelAdded.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InterestModelAdded.fromBcs(data),
      bcs: InterestModelAdded.bcs,
      fromJSONField: (field: any) => InterestModelAdded.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InterestModelAdded.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => InterestModelAdded.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => InterestModelAdded.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => InterestModelAdded.fetch(client, id),
      new: (fields: InterestModelAddedFields) => {
        return new InterestModelAdded([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InterestModelAdded.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InterestModelAdded>> {
    return phantom(InterestModelAdded.reified())
  }
  static get p() {
    return InterestModelAdded.phantom()
  }

  static get bcs() {
    return bcs.struct('InterestModelAdded', {
      interest_model: InterestModel.bcs,
      current_epoch: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): InterestModelAdded {
    return InterestModelAdded.reified().new({
      interestModel: decodeFromFields(InterestModel.reified(), fields.interest_model),
      currentEpoch: decodeFromFields('u64', fields.current_epoch),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InterestModelAdded {
    if (!isInterestModelAdded(item.type)) {
      throw new Error('not a InterestModelAdded type')
    }

    return InterestModelAdded.reified().new({
      interestModel: decodeFromFieldsWithTypes(InterestModel.reified(), item.fields.interest_model),
      currentEpoch: decodeFromFieldsWithTypes('u64', item.fields.current_epoch),
    })
  }

  static fromBcs(data: Uint8Array): InterestModelAdded {
    return InterestModelAdded.fromFields(InterestModelAdded.bcs.parse(data))
  }

  toJSONField() {
    return {
      interestModel: this.interestModel.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InterestModelAdded {
    return InterestModelAdded.reified().new({
      interestModel: decodeFromJSONField(InterestModel.reified(), field.interestModel),
      currentEpoch: decodeFromJSONField('u64', field.currentEpoch),
    })
  }

  static fromJSON(json: Record<string, any>): InterestModelAdded {
    if (json.$typeName !== InterestModelAdded.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return InterestModelAdded.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InterestModelAdded {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInterestModelAdded(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a InterestModelAdded object`)
    }
    return InterestModelAdded.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InterestModelAdded {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInterestModelAdded(data.bcs.type)) {
        throw new Error(`object at is not a InterestModelAdded object`)
      }

      return InterestModelAdded.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InterestModelAdded.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InterestModelAdded> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching InterestModelAdded object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isInterestModelAdded(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a InterestModelAdded object`)
    }

    return InterestModelAdded.fromSuiObjectData(res.data)
  }
}

/* ============================== InterestModelChangeCreated =============================== */

export function isInterestModelChangeCreated(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::interest_model::InterestModelChangeCreated`
}

export interface InterestModelChangeCreatedFields {
  interestModel: ToField<InterestModel>
  currentEpoch: ToField<'u64'>
  delayEpoches: ToField<'u64'>
  effectiveEpoches: ToField<'u64'>
}

export type InterestModelChangeCreatedReified = Reified<
  InterestModelChangeCreated,
  InterestModelChangeCreatedFields
>

export class InterestModelChangeCreated implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::interest_model::InterestModelChangeCreated`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InterestModelChangeCreated.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::interest_model::InterestModelChangeCreated`
  readonly $typeArgs: []
  readonly $isPhantom = InterestModelChangeCreated.$isPhantom

  readonly interestModel: ToField<InterestModel>
  readonly currentEpoch: ToField<'u64'>
  readonly delayEpoches: ToField<'u64'>
  readonly effectiveEpoches: ToField<'u64'>

  private constructor(typeArgs: [], fields: InterestModelChangeCreatedFields) {
    this.$fullTypeName = composeSuiType(
      InterestModelChangeCreated.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::interest_model::InterestModelChangeCreated`
    this.$typeArgs = typeArgs

    this.interestModel = fields.interestModel
    this.currentEpoch = fields.currentEpoch
    this.delayEpoches = fields.delayEpoches
    this.effectiveEpoches = fields.effectiveEpoches
  }

  static reified(): InterestModelChangeCreatedReified {
    return {
      typeName: InterestModelChangeCreated.$typeName,
      fullTypeName: composeSuiType(
        InterestModelChangeCreated.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::interest_model::InterestModelChangeCreated`,
      typeArgs: [] as [],
      isPhantom: InterestModelChangeCreated.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InterestModelChangeCreated.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        InterestModelChangeCreated.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InterestModelChangeCreated.fromBcs(data),
      bcs: InterestModelChangeCreated.bcs,
      fromJSONField: (field: any) => InterestModelChangeCreated.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InterestModelChangeCreated.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        InterestModelChangeCreated.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        InterestModelChangeCreated.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => InterestModelChangeCreated.fetch(client, id),
      new: (fields: InterestModelChangeCreatedFields) => {
        return new InterestModelChangeCreated([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InterestModelChangeCreated.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InterestModelChangeCreated>> {
    return phantom(InterestModelChangeCreated.reified())
  }
  static get p() {
    return InterestModelChangeCreated.phantom()
  }

  static get bcs() {
    return bcs.struct('InterestModelChangeCreated', {
      interest_model: InterestModel.bcs,
      current_epoch: bcs.u64(),
      delay_epoches: bcs.u64(),
      effective_epoches: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): InterestModelChangeCreated {
    return InterestModelChangeCreated.reified().new({
      interestModel: decodeFromFields(InterestModel.reified(), fields.interest_model),
      currentEpoch: decodeFromFields('u64', fields.current_epoch),
      delayEpoches: decodeFromFields('u64', fields.delay_epoches),
      effectiveEpoches: decodeFromFields('u64', fields.effective_epoches),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InterestModelChangeCreated {
    if (!isInterestModelChangeCreated(item.type)) {
      throw new Error('not a InterestModelChangeCreated type')
    }

    return InterestModelChangeCreated.reified().new({
      interestModel: decodeFromFieldsWithTypes(InterestModel.reified(), item.fields.interest_model),
      currentEpoch: decodeFromFieldsWithTypes('u64', item.fields.current_epoch),
      delayEpoches: decodeFromFieldsWithTypes('u64', item.fields.delay_epoches),
      effectiveEpoches: decodeFromFieldsWithTypes('u64', item.fields.effective_epoches),
    })
  }

  static fromBcs(data: Uint8Array): InterestModelChangeCreated {
    return InterestModelChangeCreated.fromFields(InterestModelChangeCreated.bcs.parse(data))
  }

  toJSONField() {
    return {
      interestModel: this.interestModel.toJSONField(),
      currentEpoch: this.currentEpoch.toString(),
      delayEpoches: this.delayEpoches.toString(),
      effectiveEpoches: this.effectiveEpoches.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InterestModelChangeCreated {
    return InterestModelChangeCreated.reified().new({
      interestModel: decodeFromJSONField(InterestModel.reified(), field.interestModel),
      currentEpoch: decodeFromJSONField('u64', field.currentEpoch),
      delayEpoches: decodeFromJSONField('u64', field.delayEpoches),
      effectiveEpoches: decodeFromJSONField('u64', field.effectiveEpoches),
    })
  }

  static fromJSON(json: Record<string, any>): InterestModelChangeCreated {
    if (json.$typeName !== InterestModelChangeCreated.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return InterestModelChangeCreated.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InterestModelChangeCreated {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInterestModelChangeCreated(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a InterestModelChangeCreated object`
      )
    }
    return InterestModelChangeCreated.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InterestModelChangeCreated {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInterestModelChangeCreated(data.bcs.type)) {
        throw new Error(`object at is not a InterestModelChangeCreated object`)
      }

      return InterestModelChangeCreated.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InterestModelChangeCreated.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InterestModelChangeCreated> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching InterestModelChangeCreated object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isInterestModelChangeCreated(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a InterestModelChangeCreated object`)
    }

    return InterestModelChangeCreated.fromSuiObjectData(res.data)
  }
}

/* ============================== InterestModels =============================== */

export function isInterestModels(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::interest_model::InterestModels`
}

export interface InterestModelsFields {
  dummyField: ToField<'bool'>
}

export type InterestModelsReified = Reified<InterestModels, InterestModelsFields>

export class InterestModels implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::interest_model::InterestModels`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = InterestModels.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::interest_model::InterestModels`
  readonly $typeArgs: []
  readonly $isPhantom = InterestModels.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: InterestModelsFields) {
    this.$fullTypeName = composeSuiType(
      InterestModels.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::interest_model::InterestModels`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): InterestModelsReified {
    return {
      typeName: InterestModels.$typeName,
      fullTypeName: composeSuiType(
        InterestModels.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::interest_model::InterestModels`,
      typeArgs: [] as [],
      isPhantom: InterestModels.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => InterestModels.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => InterestModels.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => InterestModels.fromBcs(data),
      bcs: InterestModels.bcs,
      fromJSONField: (field: any) => InterestModels.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => InterestModels.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => InterestModels.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => InterestModels.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => InterestModels.fetch(client, id),
      new: (fields: InterestModelsFields) => {
        return new InterestModels([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return InterestModels.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<InterestModels>> {
    return phantom(InterestModels.reified())
  }
  static get p() {
    return InterestModels.phantom()
  }

  static get bcs() {
    return bcs.struct('InterestModels', {
      dummy_field: bcs.bool(),
    })
  }

  static fromFields(fields: Record<string, any>): InterestModels {
    return InterestModels.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): InterestModels {
    if (!isInterestModels(item.type)) {
      throw new Error('not a InterestModels type')
    }

    return InterestModels.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): InterestModels {
    return InterestModels.fromFields(InterestModels.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): InterestModels {
    return InterestModels.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): InterestModels {
    if (json.$typeName !== InterestModels.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return InterestModels.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): InterestModels {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isInterestModels(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a InterestModels object`)
    }
    return InterestModels.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): InterestModels {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isInterestModels(data.bcs.type)) {
        throw new Error(`object at is not a InterestModels object`)
      }

      return InterestModels.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return InterestModels.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<InterestModels> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching InterestModels object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isInterestModels(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a InterestModels object`)
    }

    return InterestModels.fromSuiObjectData(res.data)
  }
}
