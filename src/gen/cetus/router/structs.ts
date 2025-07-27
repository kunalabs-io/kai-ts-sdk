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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== CalculatedRouterSwapResult =============================== */

export function isCalculatedRouterSwapResult(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::router::CalculatedRouterSwapResult`
}

export interface CalculatedRouterSwapResultFields {
  amountIn: ToField<'u64'>
  amountMedium: ToField<'u64'>
  amountOut: ToField<'u64'>
  isExceed: ToField<'bool'>
  currentSqrtPriceAb: ToField<'u128'>
  currentSqrtPriceCd: ToField<'u128'>
  targetSqrtPriceAb: ToField<'u128'>
  targetSqrtPriceCd: ToField<'u128'>
}

export type CalculatedRouterSwapResultReified = Reified<
  CalculatedRouterSwapResult,
  CalculatedRouterSwapResultFields
>

export class CalculatedRouterSwapResult implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::router::CalculatedRouterSwapResult`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CalculatedRouterSwapResult.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::router::CalculatedRouterSwapResult`
  readonly $typeArgs: []
  readonly $isPhantom = CalculatedRouterSwapResult.$isPhantom

  readonly amountIn: ToField<'u64'>
  readonly amountMedium: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly isExceed: ToField<'bool'>
  readonly currentSqrtPriceAb: ToField<'u128'>
  readonly currentSqrtPriceCd: ToField<'u128'>
  readonly targetSqrtPriceAb: ToField<'u128'>
  readonly targetSqrtPriceCd: ToField<'u128'>

  private constructor(typeArgs: [], fields: CalculatedRouterSwapResultFields) {
    this.$fullTypeName = composeSuiType(
      CalculatedRouterSwapResult.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::router::CalculatedRouterSwapResult`
    this.$typeArgs = typeArgs

    this.amountIn = fields.amountIn
    this.amountMedium = fields.amountMedium
    this.amountOut = fields.amountOut
    this.isExceed = fields.isExceed
    this.currentSqrtPriceAb = fields.currentSqrtPriceAb
    this.currentSqrtPriceCd = fields.currentSqrtPriceCd
    this.targetSqrtPriceAb = fields.targetSqrtPriceAb
    this.targetSqrtPriceCd = fields.targetSqrtPriceCd
  }

  static reified(): CalculatedRouterSwapResultReified {
    const reifiedBcs = CalculatedRouterSwapResult.bcs
    return {
      typeName: CalculatedRouterSwapResult.$typeName,
      fullTypeName: composeSuiType(
        CalculatedRouterSwapResult.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::router::CalculatedRouterSwapResult`,
      typeArgs: [] as [],
      isPhantom: CalculatedRouterSwapResult.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CalculatedRouterSwapResult.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CalculatedRouterSwapResult.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CalculatedRouterSwapResult.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CalculatedRouterSwapResult.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CalculatedRouterSwapResult.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CalculatedRouterSwapResult.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CalculatedRouterSwapResult.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => CalculatedRouterSwapResult.fetch(client, id),
      new: (fields: CalculatedRouterSwapResultFields) => {
        return new CalculatedRouterSwapResult([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CalculatedRouterSwapResult.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CalculatedRouterSwapResult>> {
    return phantom(CalculatedRouterSwapResult.reified())
  }
  static get p() {
    return CalculatedRouterSwapResult.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CalculatedRouterSwapResult', {
      amount_in: bcs.u64(),
      amount_medium: bcs.u64(),
      amount_out: bcs.u64(),
      is_exceed: bcs.bool(),
      current_sqrt_price_ab: bcs.u128(),
      current_sqrt_price_cd: bcs.u128(),
      target_sqrt_price_ab: bcs.u128(),
      target_sqrt_price_cd: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof CalculatedRouterSwapResult.instantiateBcs> | null =
    null

  static get bcs() {
    if (!CalculatedRouterSwapResult.cachedBcs) {
      CalculatedRouterSwapResult.cachedBcs = CalculatedRouterSwapResult.instantiateBcs()
    }
    return CalculatedRouterSwapResult.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CalculatedRouterSwapResult {
    return CalculatedRouterSwapResult.reified().new({
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountMedium: decodeFromFields('u64', fields.amount_medium),
      amountOut: decodeFromFields('u64', fields.amount_out),
      isExceed: decodeFromFields('bool', fields.is_exceed),
      currentSqrtPriceAb: decodeFromFields('u128', fields.current_sqrt_price_ab),
      currentSqrtPriceCd: decodeFromFields('u128', fields.current_sqrt_price_cd),
      targetSqrtPriceAb: decodeFromFields('u128', fields.target_sqrt_price_ab),
      targetSqrtPriceCd: decodeFromFields('u128', fields.target_sqrt_price_cd),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CalculatedRouterSwapResult {
    if (!isCalculatedRouterSwapResult(item.type)) {
      throw new Error('not a CalculatedRouterSwapResult type')
    }

    return CalculatedRouterSwapResult.reified().new({
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountMedium: decodeFromFieldsWithTypes('u64', item.fields.amount_medium),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      isExceed: decodeFromFieldsWithTypes('bool', item.fields.is_exceed),
      currentSqrtPriceAb: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price_ab),
      currentSqrtPriceCd: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price_cd),
      targetSqrtPriceAb: decodeFromFieldsWithTypes('u128', item.fields.target_sqrt_price_ab),
      targetSqrtPriceCd: decodeFromFieldsWithTypes('u128', item.fields.target_sqrt_price_cd),
    })
  }

  static fromBcs(data: Uint8Array): CalculatedRouterSwapResult {
    return CalculatedRouterSwapResult.fromFields(CalculatedRouterSwapResult.bcs.parse(data))
  }

  toJSONField() {
    return {
      amountIn: this.amountIn.toString(),
      amountMedium: this.amountMedium.toString(),
      amountOut: this.amountOut.toString(),
      isExceed: this.isExceed,
      currentSqrtPriceAb: this.currentSqrtPriceAb.toString(),
      currentSqrtPriceCd: this.currentSqrtPriceCd.toString(),
      targetSqrtPriceAb: this.targetSqrtPriceAb.toString(),
      targetSqrtPriceCd: this.targetSqrtPriceCd.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CalculatedRouterSwapResult {
    return CalculatedRouterSwapResult.reified().new({
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountMedium: decodeFromJSONField('u64', field.amountMedium),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      isExceed: decodeFromJSONField('bool', field.isExceed),
      currentSqrtPriceAb: decodeFromJSONField('u128', field.currentSqrtPriceAb),
      currentSqrtPriceCd: decodeFromJSONField('u128', field.currentSqrtPriceCd),
      targetSqrtPriceAb: decodeFromJSONField('u128', field.targetSqrtPriceAb),
      targetSqrtPriceCd: decodeFromJSONField('u128', field.targetSqrtPriceCd),
    })
  }

  static fromJSON(json: Record<string, any>): CalculatedRouterSwapResult {
    if (json.$typeName !== CalculatedRouterSwapResult.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CalculatedRouterSwapResult.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CalculatedRouterSwapResult {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCalculatedRouterSwapResult(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CalculatedRouterSwapResult object`
      )
    }
    return CalculatedRouterSwapResult.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CalculatedRouterSwapResult {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCalculatedRouterSwapResult(data.bcs.type)) {
        throw new Error(`object at is not a CalculatedRouterSwapResult object`)
      }

      return CalculatedRouterSwapResult.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CalculatedRouterSwapResult.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CalculatedRouterSwapResult> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching CalculatedRouterSwapResult object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isCalculatedRouterSwapResult(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a CalculatedRouterSwapResult object`)
    }

    return CalculatedRouterSwapResult.fromSuiObjectData(res.data)
  }
}

/* ============================== CalculatedRouterSwapResultEvent =============================== */

export function isCalculatedRouterSwapResultEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::router::CalculatedRouterSwapResultEvent`
}

export interface CalculatedRouterSwapResultEventFields {
  data: ToField<CalculatedRouterSwapResult>
}

export type CalculatedRouterSwapResultEventReified = Reified<
  CalculatedRouterSwapResultEvent,
  CalculatedRouterSwapResultEventFields
>

export class CalculatedRouterSwapResultEvent implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::router::CalculatedRouterSwapResultEvent`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = CalculatedRouterSwapResultEvent.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::router::CalculatedRouterSwapResultEvent`
  readonly $typeArgs: []
  readonly $isPhantom = CalculatedRouterSwapResultEvent.$isPhantom

  readonly data: ToField<CalculatedRouterSwapResult>

  private constructor(typeArgs: [], fields: CalculatedRouterSwapResultEventFields) {
    this.$fullTypeName = composeSuiType(
      CalculatedRouterSwapResultEvent.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::router::CalculatedRouterSwapResultEvent`
    this.$typeArgs = typeArgs

    this.data = fields.data
  }

  static reified(): CalculatedRouterSwapResultEventReified {
    const reifiedBcs = CalculatedRouterSwapResultEvent.bcs
    return {
      typeName: CalculatedRouterSwapResultEvent.$typeName,
      fullTypeName: composeSuiType(
        CalculatedRouterSwapResultEvent.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::router::CalculatedRouterSwapResultEvent`,
      typeArgs: [] as [],
      isPhantom: CalculatedRouterSwapResultEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        CalculatedRouterSwapResultEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CalculatedRouterSwapResultEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        CalculatedRouterSwapResultEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CalculatedRouterSwapResultEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CalculatedRouterSwapResultEvent.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        CalculatedRouterSwapResultEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CalculatedRouterSwapResultEvent.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        CalculatedRouterSwapResultEvent.fetch(client, id),
      new: (fields: CalculatedRouterSwapResultEventFields) => {
        return new CalculatedRouterSwapResultEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return CalculatedRouterSwapResultEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CalculatedRouterSwapResultEvent>> {
    return phantom(CalculatedRouterSwapResultEvent.reified())
  }
  static get p() {
    return CalculatedRouterSwapResultEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CalculatedRouterSwapResultEvent', {
      data: CalculatedRouterSwapResult.bcs,
    })
  }

  private static cachedBcs: ReturnType<
    typeof CalculatedRouterSwapResultEvent.instantiateBcs
  > | null = null

  static get bcs() {
    if (!CalculatedRouterSwapResultEvent.cachedBcs) {
      CalculatedRouterSwapResultEvent.cachedBcs = CalculatedRouterSwapResultEvent.instantiateBcs()
    }
    return CalculatedRouterSwapResultEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CalculatedRouterSwapResultEvent {
    return CalculatedRouterSwapResultEvent.reified().new({
      data: decodeFromFields(CalculatedRouterSwapResult.reified(), fields.data),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CalculatedRouterSwapResultEvent {
    if (!isCalculatedRouterSwapResultEvent(item.type)) {
      throw new Error('not a CalculatedRouterSwapResultEvent type')
    }

    return CalculatedRouterSwapResultEvent.reified().new({
      data: decodeFromFieldsWithTypes(CalculatedRouterSwapResult.reified(), item.fields.data),
    })
  }

  static fromBcs(data: Uint8Array): CalculatedRouterSwapResultEvent {
    return CalculatedRouterSwapResultEvent.fromFields(
      CalculatedRouterSwapResultEvent.bcs.parse(data)
    )
  }

  toJSONField() {
    return {
      data: this.data.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CalculatedRouterSwapResultEvent {
    return CalculatedRouterSwapResultEvent.reified().new({
      data: decodeFromJSONField(CalculatedRouterSwapResult.reified(), field.data),
    })
  }

  static fromJSON(json: Record<string, any>): CalculatedRouterSwapResultEvent {
    if (json.$typeName !== CalculatedRouterSwapResultEvent.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return CalculatedRouterSwapResultEvent.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): CalculatedRouterSwapResultEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCalculatedRouterSwapResultEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CalculatedRouterSwapResultEvent object`
      )
    }
    return CalculatedRouterSwapResultEvent.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): CalculatedRouterSwapResultEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCalculatedRouterSwapResultEvent(data.bcs.type)) {
        throw new Error(`object at is not a CalculatedRouterSwapResultEvent object`)
      }

      return CalculatedRouterSwapResultEvent.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CalculatedRouterSwapResultEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<CalculatedRouterSwapResultEvent> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching CalculatedRouterSwapResultEvent object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isCalculatedRouterSwapResultEvent(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a CalculatedRouterSwapResultEvent object`)
    }

    return CalculatedRouterSwapResultEvent.fromSuiObjectData(res.data)
  }
}
