/**
 * @title Module for handling the liquidation request
 * @author Scallop Labs
 * @notice Scallop adopts soft liquidation. Liquidation amount should be no bigger than the amount that would drecrease the risk level of obligation to 1.
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
import { FixedPoint32 } from '../../../std/fixed-point32/structs'
import { TypeName } from '../../../std/type-name/structs'
import { ID } from '../../../sui/object/structs'

/* ============================== LiquidateEvent =============================== */

export function isLiquidateEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('protocol', 'liquidate::LiquidateEvent')}::liquidate::LiquidateEvent`
}

export interface LiquidateEventFields {
  liquidator: ToField<'address'>
  obligation: ToField<ID>
  debtType: ToField<TypeName>
  collateralType: ToField<TypeName>
  repayOnBehalf: ToField<'u64'>
  repayRevenue: ToField<'u64'>
  liqAmount: ToField<'u64'>
}

export type LiquidateEventReified = Reified<LiquidateEvent, LiquidateEventFields>

export type LiquidateEventJSONField = {
  liquidator: string
  obligation: string
  debtType: string
  collateralType: string
  repayOnBehalf: string
  repayRevenue: string
  liqAmount: string
}

export type LiquidateEventJSON = {
  $typeName: typeof LiquidateEvent.$typeName
  $typeArgs: []
} & LiquidateEventJSONField

export class LiquidateEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::liquidate::LiquidateEvent` {
    return `${
      getTypeOrigin('protocol', 'liquidate::LiquidateEvent')
    }::liquidate::LiquidateEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LiquidateEvent.$typeName = LiquidateEvent.$typeName
  readonly $fullTypeName: `${string}::liquidate::LiquidateEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LiquidateEvent.$isPhantom = LiquidateEvent.$isPhantom

  readonly liquidator: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly debtType: ToField<TypeName>
  readonly collateralType: ToField<TypeName>
  readonly repayOnBehalf: ToField<'u64'>
  readonly repayRevenue: ToField<'u64'>
  readonly liqAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: LiquidateEventFields) {
    this.$fullTypeName = composeSuiType(
      LiquidateEvent.$typeName,
      ...typeArgs,
    ) as `${string}::liquidate::LiquidateEvent`
    this.$typeArgs = typeArgs

    this.liquidator = fields.liquidator
    this.obligation = fields.obligation
    this.debtType = fields.debtType
    this.collateralType = fields.collateralType
    this.repayOnBehalf = fields.repayOnBehalf
    this.repayRevenue = fields.repayRevenue
    this.liqAmount = fields.liqAmount
  }

  static reified(): LiquidateEventReified {
    const reifiedBcs = LiquidateEvent.bcs
    return {
      get typeName() {
        return LiquidateEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          LiquidateEvent.$typeName,
          ...[],
        ) as `${string}::liquidate::LiquidateEvent`
      },
      typeArgs: [] as [],
      isPhantom: LiquidateEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LiquidateEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LiquidateEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LiquidateEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LiquidateEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LiquidateEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        LiquidateEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => LiquidateEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LiquidateEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => LiquidateEvent.fetch(client, id),
      new: (fields: LiquidateEventFields) => {
        return new LiquidateEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LiquidateEventReified {
    return LiquidateEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LiquidateEvent>> {
    return phantom(LiquidateEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LiquidateEvent>> {
    return LiquidateEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LiquidateEvent', {
      liquidator: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      obligation: ID.bcs,
      debt_type: TypeName.bcs,
      collateral_type: TypeName.bcs,
      repay_on_behalf: bcs.u64(),
      repay_revenue: bcs.u64(),
      liq_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof LiquidateEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof LiquidateEvent.instantiateBcs> {
    if (!LiquidateEvent.cachedBcs) {
      LiquidateEvent.cachedBcs = LiquidateEvent.instantiateBcs()
    }
    return LiquidateEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LiquidateEvent {
    return LiquidateEvent.reified().new({
      liquidator: decodeFromFields('address', fields.liquidator),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      debtType: decodeFromFields(TypeName.reified(), fields.debt_type),
      collateralType: decodeFromFields(TypeName.reified(), fields.collateral_type),
      repayOnBehalf: decodeFromFields('u64', fields.repay_on_behalf),
      repayRevenue: decodeFromFields('u64', fields.repay_revenue),
      liqAmount: decodeFromFields('u64', fields.liq_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LiquidateEvent {
    if (!isLiquidateEvent(item.type)) {
      throw new Error('not a LiquidateEvent type')
    }

    return LiquidateEvent.reified().new({
      liquidator: decodeFromFieldsWithTypes('address', item.fields.liquidator),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      debtType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.debt_type),
      collateralType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.collateral_type),
      repayOnBehalf: decodeFromFieldsWithTypes('u64', item.fields.repay_on_behalf),
      repayRevenue: decodeFromFieldsWithTypes('u64', item.fields.repay_revenue),
      liqAmount: decodeFromFieldsWithTypes('u64', item.fields.liq_amount),
    })
  }

  static fromBcs(data: Uint8Array): LiquidateEvent {
    return LiquidateEvent.fromFields(LiquidateEvent.bcs.parse(data))
  }

  toJSONField(): LiquidateEventJSONField {
    return {
      liquidator: this.liquidator,
      obligation: this.obligation,
      debtType: this.debtType,
      collateralType: this.collateralType,
      repayOnBehalf: this.repayOnBehalf.toString(),
      repayRevenue: this.repayRevenue.toString(),
      liqAmount: this.liqAmount.toString(),
    }
  }

  toJSON(): LiquidateEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LiquidateEvent {
    return LiquidateEvent.reified().new({
      liquidator: decodeFromJSONField('address', field.liquidator),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      debtType: decodeFromJSONField(TypeName.reified(), field.debtType),
      collateralType: decodeFromJSONField(TypeName.reified(), field.collateralType),
      repayOnBehalf: decodeFromJSONField('u64', field.repayOnBehalf),
      repayRevenue: decodeFromJSONField('u64', field.repayRevenue),
      liqAmount: decodeFromJSONField('u64', field.liqAmount),
    })
  }

  static fromJSON(json: Record<string, any>): LiquidateEvent {
    if (json.$typeName !== LiquidateEvent.$typeName) {
      throw new Error(
        `not a LiquidateEvent json object: expected '${LiquidateEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LiquidateEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): LiquidateEvent {
    if (!isLiquidateEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a LiquidateEvent object`)
    }
    return LiquidateEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LiquidateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): LiquidateEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLiquidateEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LiquidateEvent object`)
    }
    return LiquidateEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LiquidateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): LiquidateEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLiquidateEvent(data.bcs.type)) {
        throw new Error(`object at is not a LiquidateEvent object`)
      }

      return LiquidateEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LiquidateEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<LiquidateEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isLiquidateEvent(object.type)) {
      throw new Error(`object at id ${id} is not a LiquidateEvent object`)
    }
    return LiquidateEvent.fromBcs(object.content)
  }
}

/* ============================== LiquidateEventV2 =============================== */

export function isLiquidateEventV2(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('protocol', 'liquidate::LiquidateEventV2')}::liquidate::LiquidateEventV2`
}

export interface LiquidateEventV2Fields {
  liquidator: ToField<'address'>
  obligation: ToField<ID>
  debtType: ToField<TypeName>
  collateralType: ToField<TypeName>
  repayOnBehalf: ToField<'u64'>
  repayRevenue: ToField<'u64'>
  liqAmount: ToField<'u64'>
  collateralPrice: ToField<FixedPoint32>
  debtPrice: ToField<FixedPoint32>
  timestamp: ToField<'u64'>
}

export type LiquidateEventV2Reified = Reified<LiquidateEventV2, LiquidateEventV2Fields>

export type LiquidateEventV2JSONField = {
  liquidator: string
  obligation: string
  debtType: string
  collateralType: string
  repayOnBehalf: string
  repayRevenue: string
  liqAmount: string
  collateralPrice: ToJSON<FixedPoint32>
  debtPrice: ToJSON<FixedPoint32>
  timestamp: string
}

export type LiquidateEventV2JSON = {
  $typeName: typeof LiquidateEventV2.$typeName
  $typeArgs: []
} & LiquidateEventV2JSONField

export class LiquidateEventV2 implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::liquidate::LiquidateEventV2` {
    return `${
      getTypeOrigin('protocol', 'liquidate::LiquidateEventV2')
    }::liquidate::LiquidateEventV2` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof LiquidateEventV2.$typeName = LiquidateEventV2.$typeName
  readonly $fullTypeName: `${string}::liquidate::LiquidateEventV2`
  readonly $typeArgs: []
  readonly $isPhantom: typeof LiquidateEventV2.$isPhantom = LiquidateEventV2.$isPhantom

  readonly liquidator: ToField<'address'>
  readonly obligation: ToField<ID>
  readonly debtType: ToField<TypeName>
  readonly collateralType: ToField<TypeName>
  readonly repayOnBehalf: ToField<'u64'>
  readonly repayRevenue: ToField<'u64'>
  readonly liqAmount: ToField<'u64'>
  readonly collateralPrice: ToField<FixedPoint32>
  readonly debtPrice: ToField<FixedPoint32>
  readonly timestamp: ToField<'u64'>

  private constructor(typeArgs: [], fields: LiquidateEventV2Fields) {
    this.$fullTypeName = composeSuiType(
      LiquidateEventV2.$typeName,
      ...typeArgs,
    ) as `${string}::liquidate::LiquidateEventV2`
    this.$typeArgs = typeArgs

    this.liquidator = fields.liquidator
    this.obligation = fields.obligation
    this.debtType = fields.debtType
    this.collateralType = fields.collateralType
    this.repayOnBehalf = fields.repayOnBehalf
    this.repayRevenue = fields.repayRevenue
    this.liqAmount = fields.liqAmount
    this.collateralPrice = fields.collateralPrice
    this.debtPrice = fields.debtPrice
    this.timestamp = fields.timestamp
  }

  static reified(): LiquidateEventV2Reified {
    const reifiedBcs = LiquidateEventV2.bcs
    return {
      get typeName() {
        return LiquidateEventV2.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          LiquidateEventV2.$typeName,
          ...[],
        ) as `${string}::liquidate::LiquidateEventV2`
      },
      typeArgs: [] as [],
      isPhantom: LiquidateEventV2.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => LiquidateEventV2.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => LiquidateEventV2.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => LiquidateEventV2.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => LiquidateEventV2.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => LiquidateEventV2.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        LiquidateEventV2.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => LiquidateEventV2.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => LiquidateEventV2.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => LiquidateEventV2.fetch(client, id),
      new: (fields: LiquidateEventV2Fields) => {
        return new LiquidateEventV2([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): LiquidateEventV2Reified {
    return LiquidateEventV2.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<LiquidateEventV2>> {
    return phantom(LiquidateEventV2.reified())
  }

  static get p(): PhantomReified<ToTypeStr<LiquidateEventV2>> {
    return LiquidateEventV2.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('LiquidateEventV2', {
      liquidator: bcs.bytes(32).transform({
        input: (val: string) => fromHex(val),
        output: (val: Uint8Array) => toHex(val),
      }),
      obligation: ID.bcs,
      debt_type: TypeName.bcs,
      collateral_type: TypeName.bcs,
      repay_on_behalf: bcs.u64(),
      repay_revenue: bcs.u64(),
      liq_amount: bcs.u64(),
      collateral_price: FixedPoint32.bcs,
      debt_price: FixedPoint32.bcs,
      timestamp: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof LiquidateEventV2.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof LiquidateEventV2.instantiateBcs> {
    if (!LiquidateEventV2.cachedBcs) {
      LiquidateEventV2.cachedBcs = LiquidateEventV2.instantiateBcs()
    }
    return LiquidateEventV2.cachedBcs
  }

  static fromFields(fields: Record<string, any>): LiquidateEventV2 {
    return LiquidateEventV2.reified().new({
      liquidator: decodeFromFields('address', fields.liquidator),
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      debtType: decodeFromFields(TypeName.reified(), fields.debt_type),
      collateralType: decodeFromFields(TypeName.reified(), fields.collateral_type),
      repayOnBehalf: decodeFromFields('u64', fields.repay_on_behalf),
      repayRevenue: decodeFromFields('u64', fields.repay_revenue),
      liqAmount: decodeFromFields('u64', fields.liq_amount),
      collateralPrice: decodeFromFields(FixedPoint32.reified(), fields.collateral_price),
      debtPrice: decodeFromFields(FixedPoint32.reified(), fields.debt_price),
      timestamp: decodeFromFields('u64', fields.timestamp),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): LiquidateEventV2 {
    if (!isLiquidateEventV2(item.type)) {
      throw new Error('not a LiquidateEventV2 type')
    }

    return LiquidateEventV2.reified().new({
      liquidator: decodeFromFieldsWithTypes('address', item.fields.liquidator),
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      debtType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.debt_type),
      collateralType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.collateral_type),
      repayOnBehalf: decodeFromFieldsWithTypes('u64', item.fields.repay_on_behalf),
      repayRevenue: decodeFromFieldsWithTypes('u64', item.fields.repay_revenue),
      liqAmount: decodeFromFieldsWithTypes('u64', item.fields.liq_amount),
      collateralPrice: decodeFromFieldsWithTypes(
        FixedPoint32.reified(),
        item.fields.collateral_price,
      ),
      debtPrice: decodeFromFieldsWithTypes(FixedPoint32.reified(), item.fields.debt_price),
      timestamp: decodeFromFieldsWithTypes('u64', item.fields.timestamp),
    })
  }

  static fromBcs(data: Uint8Array): LiquidateEventV2 {
    return LiquidateEventV2.fromFields(LiquidateEventV2.bcs.parse(data))
  }

  toJSONField(): LiquidateEventV2JSONField {
    return {
      liquidator: this.liquidator,
      obligation: this.obligation,
      debtType: this.debtType,
      collateralType: this.collateralType,
      repayOnBehalf: this.repayOnBehalf.toString(),
      repayRevenue: this.repayRevenue.toString(),
      liqAmount: this.liqAmount.toString(),
      collateralPrice: this.collateralPrice.toJSONField(),
      debtPrice: this.debtPrice.toJSONField(),
      timestamp: this.timestamp.toString(),
    }
  }

  toJSON(): LiquidateEventV2JSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): LiquidateEventV2 {
    return LiquidateEventV2.reified().new({
      liquidator: decodeFromJSONField('address', field.liquidator),
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      debtType: decodeFromJSONField(TypeName.reified(), field.debtType),
      collateralType: decodeFromJSONField(TypeName.reified(), field.collateralType),
      repayOnBehalf: decodeFromJSONField('u64', field.repayOnBehalf),
      repayRevenue: decodeFromJSONField('u64', field.repayRevenue),
      liqAmount: decodeFromJSONField('u64', field.liqAmount),
      collateralPrice: decodeFromJSONField(FixedPoint32.reified(), field.collateralPrice),
      debtPrice: decodeFromJSONField(FixedPoint32.reified(), field.debtPrice),
      timestamp: decodeFromJSONField('u64', field.timestamp),
    })
  }

  static fromJSON(json: Record<string, any>): LiquidateEventV2 {
    if (json.$typeName !== LiquidateEventV2.$typeName) {
      throw new Error(
        `not a LiquidateEventV2 json object: expected '${LiquidateEventV2.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return LiquidateEventV2.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): LiquidateEventV2 {
    if (!isLiquidateEventV2(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a LiquidateEventV2 object`)
    }
    return LiquidateEventV2.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LiquidateEventV2.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): LiquidateEventV2 {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isLiquidateEventV2(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a LiquidateEventV2 object`)
    }
    return LiquidateEventV2.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link LiquidateEventV2.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): LiquidateEventV2 {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isLiquidateEventV2(data.bcs.type)) {
        throw new Error(`object at is not a LiquidateEventV2 object`)
      }

      return LiquidateEventV2.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return LiquidateEventV2.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<LiquidateEventV2> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isLiquidateEventV2(object.type)) {
      throw new Error(`object at id ${id} is not a LiquidateEventV2 object`)
    }
    return LiquidateEventV2.fromBcs(object.content)
  }
}
