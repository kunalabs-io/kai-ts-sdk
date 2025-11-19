import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../../../_framework/util'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { UID } from '../../../../sui/object/structs'
import { BalanceBag } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/balance-bag/structs'
import { SupplyBag } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/supply-bag/structs'
import { WitTable } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/wit-table/structs'
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== BalanceSheets =============================== */

export function isBalanceSheets(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::reserve::BalanceSheets`
}

export interface BalanceSheetsFields {
  dummyField: ToField<'bool'>
}

export type BalanceSheetsReified = Reified<BalanceSheets, BalanceSheetsFields>

export class BalanceSheets implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::reserve::BalanceSheets`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BalanceSheets.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::reserve::BalanceSheets`
  readonly $typeArgs: []
  readonly $isPhantom = BalanceSheets.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BalanceSheetsFields) {
    this.$fullTypeName = composeSuiType(
      BalanceSheets.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::reserve::BalanceSheets`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BalanceSheetsReified {
    const reifiedBcs = BalanceSheets.bcs
    return {
      typeName: BalanceSheets.$typeName,
      fullTypeName: composeSuiType(
        BalanceSheets.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::reserve::BalanceSheets`,
      typeArgs: [] as [],
      isPhantom: BalanceSheets.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BalanceSheets.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BalanceSheets.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BalanceSheets.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BalanceSheets.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BalanceSheets.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => BalanceSheets.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BalanceSheets.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BalanceSheets.fetch(client, id),
      new: (fields: BalanceSheetsFields) => {
        return new BalanceSheets([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BalanceSheets.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BalanceSheets>> {
    return phantom(BalanceSheets.reified())
  }
  static get p() {
    return BalanceSheets.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BalanceSheets', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof BalanceSheets.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BalanceSheets.instantiateBcs> {
    if (!BalanceSheets.cachedBcs) {
      BalanceSheets.cachedBcs = BalanceSheets.instantiateBcs()
    }
    return BalanceSheets.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BalanceSheets {
    return BalanceSheets.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BalanceSheets {
    if (!isBalanceSheets(item.type)) {
      throw new Error('not a BalanceSheets type')
    }

    return BalanceSheets.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): BalanceSheets {
    return BalanceSheets.fromFields(BalanceSheets.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BalanceSheets {
    return BalanceSheets.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): BalanceSheets {
    if (json.$typeName !== BalanceSheets.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BalanceSheets.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BalanceSheets {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBalanceSheets(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BalanceSheets object`)
    }
    return BalanceSheets.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BalanceSheets {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBalanceSheets(data.bcs.type)) {
        throw new Error(`object at is not a BalanceSheets object`)
      }

      return BalanceSheets.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BalanceSheets.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BalanceSheets> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BalanceSheets object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBalanceSheets(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BalanceSheets object`)
    }

    return BalanceSheets.fromSuiObjectData(res.data)
  }
}

/* ============================== BalanceSheet =============================== */

export function isBalanceSheet(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::reserve::BalanceSheet`
}

export interface BalanceSheetFields {
  cash: ToField<'u64'>
  debt: ToField<'u64'>
  revenue: ToField<'u64'>
  marketCoinSupply: ToField<'u64'>
}

export type BalanceSheetReified = Reified<BalanceSheet, BalanceSheetFields>

export class BalanceSheet implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::reserve::BalanceSheet`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = BalanceSheet.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::reserve::BalanceSheet`
  readonly $typeArgs: []
  readonly $isPhantom = BalanceSheet.$isPhantom

  readonly cash: ToField<'u64'>
  readonly debt: ToField<'u64'>
  readonly revenue: ToField<'u64'>
  readonly marketCoinSupply: ToField<'u64'>

  private constructor(typeArgs: [], fields: BalanceSheetFields) {
    this.$fullTypeName = composeSuiType(
      BalanceSheet.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::reserve::BalanceSheet`
    this.$typeArgs = typeArgs

    this.cash = fields.cash
    this.debt = fields.debt
    this.revenue = fields.revenue
    this.marketCoinSupply = fields.marketCoinSupply
  }

  static reified(): BalanceSheetReified {
    const reifiedBcs = BalanceSheet.bcs
    return {
      typeName: BalanceSheet.$typeName,
      fullTypeName: composeSuiType(
        BalanceSheet.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::reserve::BalanceSheet`,
      typeArgs: [] as [],
      isPhantom: BalanceSheet.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => BalanceSheet.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => BalanceSheet.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => BalanceSheet.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => BalanceSheet.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => BalanceSheet.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => BalanceSheet.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => BalanceSheet.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => BalanceSheet.fetch(client, id),
      new: (fields: BalanceSheetFields) => {
        return new BalanceSheet([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return BalanceSheet.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BalanceSheet>> {
    return phantom(BalanceSheet.reified())
  }
  static get p() {
    return BalanceSheet.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('BalanceSheet', {
      cash: bcs.u64(),
      debt: bcs.u64(),
      revenue: bcs.u64(),
      market_coin_supply: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof BalanceSheet.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof BalanceSheet.instantiateBcs> {
    if (!BalanceSheet.cachedBcs) {
      BalanceSheet.cachedBcs = BalanceSheet.instantiateBcs()
    }
    return BalanceSheet.cachedBcs
  }

  static fromFields(fields: Record<string, any>): BalanceSheet {
    return BalanceSheet.reified().new({
      cash: decodeFromFields('u64', fields.cash),
      debt: decodeFromFields('u64', fields.debt),
      revenue: decodeFromFields('u64', fields.revenue),
      marketCoinSupply: decodeFromFields('u64', fields.market_coin_supply),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): BalanceSheet {
    if (!isBalanceSheet(item.type)) {
      throw new Error('not a BalanceSheet type')
    }

    return BalanceSheet.reified().new({
      cash: decodeFromFieldsWithTypes('u64', item.fields.cash),
      debt: decodeFromFieldsWithTypes('u64', item.fields.debt),
      revenue: decodeFromFieldsWithTypes('u64', item.fields.revenue),
      marketCoinSupply: decodeFromFieldsWithTypes('u64', item.fields.market_coin_supply),
    })
  }

  static fromBcs(data: Uint8Array): BalanceSheet {
    return BalanceSheet.fromFields(BalanceSheet.bcs.parse(data))
  }

  toJSONField() {
    return {
      cash: this.cash.toString(),
      debt: this.debt.toString(),
      revenue: this.revenue.toString(),
      marketCoinSupply: this.marketCoinSupply.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BalanceSheet {
    return BalanceSheet.reified().new({
      cash: decodeFromJSONField('u64', field.cash),
      debt: decodeFromJSONField('u64', field.debt),
      revenue: decodeFromJSONField('u64', field.revenue),
      marketCoinSupply: decodeFromJSONField('u64', field.marketCoinSupply),
    })
  }

  static fromJSON(json: Record<string, any>): BalanceSheet {
    if (json.$typeName !== BalanceSheet.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return BalanceSheet.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): BalanceSheet {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isBalanceSheet(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a BalanceSheet object`)
    }
    return BalanceSheet.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): BalanceSheet {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isBalanceSheet(data.bcs.type)) {
        throw new Error(`object at is not a BalanceSheet object`)
      }

      return BalanceSheet.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BalanceSheet.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<BalanceSheet> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching BalanceSheet object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isBalanceSheet(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a BalanceSheet object`)
    }

    return BalanceSheet.fromSuiObjectData(res.data)
  }
}

/* ============================== FlashLoanFees =============================== */

export function isFlashLoanFees(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::reserve::FlashLoanFees`
}

export interface FlashLoanFeesFields {
  dummyField: ToField<'bool'>
}

export type FlashLoanFeesReified = Reified<FlashLoanFees, FlashLoanFeesFields>

export class FlashLoanFees implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::reserve::FlashLoanFees`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = FlashLoanFees.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::reserve::FlashLoanFees`
  readonly $typeArgs: []
  readonly $isPhantom = FlashLoanFees.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: FlashLoanFeesFields) {
    this.$fullTypeName = composeSuiType(
      FlashLoanFees.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::reserve::FlashLoanFees`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): FlashLoanFeesReified {
    const reifiedBcs = FlashLoanFees.bcs
    return {
      typeName: FlashLoanFees.$typeName,
      fullTypeName: composeSuiType(
        FlashLoanFees.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::reserve::FlashLoanFees`,
      typeArgs: [] as [],
      isPhantom: FlashLoanFees.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FlashLoanFees.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FlashLoanFees.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FlashLoanFees.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FlashLoanFees.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FlashLoanFees.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => FlashLoanFees.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FlashLoanFees.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => FlashLoanFees.fetch(client, id),
      new: (fields: FlashLoanFeesFields) => {
        return new FlashLoanFees([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return FlashLoanFees.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FlashLoanFees>> {
    return phantom(FlashLoanFees.reified())
  }
  static get p() {
    return FlashLoanFees.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FlashLoanFees', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof FlashLoanFees.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FlashLoanFees.instantiateBcs> {
    if (!FlashLoanFees.cachedBcs) {
      FlashLoanFees.cachedBcs = FlashLoanFees.instantiateBcs()
    }
    return FlashLoanFees.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FlashLoanFees {
    return FlashLoanFees.reified().new({ dummyField: decodeFromFields('bool', fields.dummy_field) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FlashLoanFees {
    if (!isFlashLoanFees(item.type)) {
      throw new Error('not a FlashLoanFees type')
    }

    return FlashLoanFees.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): FlashLoanFees {
    return FlashLoanFees.fromFields(FlashLoanFees.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FlashLoanFees {
    return FlashLoanFees.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): FlashLoanFees {
    if (json.$typeName !== FlashLoanFees.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return FlashLoanFees.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): FlashLoanFees {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashLoanFees(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashLoanFees object`)
    }
    return FlashLoanFees.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): FlashLoanFees {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashLoanFees(data.bcs.type)) {
        throw new Error(`object at is not a FlashLoanFees object`)
      }

      return FlashLoanFees.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashLoanFees.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<FlashLoanFees> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching FlashLoanFees object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFlashLoanFees(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a FlashLoanFees object`)
    }

    return FlashLoanFees.fromSuiObjectData(res.data)
  }
}

/* ============================== FlashLoan =============================== */

export function isFlashLoan(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::reserve::FlashLoan` + '<')
}

export interface FlashLoanFields<T0 extends PhantomTypeArgument> {
  loanAmount: ToField<'u64'>
  fee: ToField<'u64'>
}

export type FlashLoanReified<T0 extends PhantomTypeArgument> = Reified<
  FlashLoan<T0>,
  FlashLoanFields<T0>
>

export class FlashLoan<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::reserve::FlashLoan`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = FlashLoan.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::reserve::FlashLoan<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = FlashLoan.$isPhantom

  readonly loanAmount: ToField<'u64'>
  readonly fee: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: FlashLoanFields<T0>) {
    this.$fullTypeName = composeSuiType(
      FlashLoan.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::reserve::FlashLoan<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.loanAmount = fields.loanAmount
    this.fee = fields.fee
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): FlashLoanReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = FlashLoan.bcs
    return {
      typeName: FlashLoan.$typeName,
      fullTypeName: composeSuiType(
        FlashLoan.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::reserve::FlashLoan<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: FlashLoan.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => FlashLoan.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FlashLoan.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => FlashLoan.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FlashLoan.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => FlashLoan.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => FlashLoan.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => FlashLoan.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => FlashLoan.fetch(client, T0, id),
      new: (fields: FlashLoanFields<ToPhantomTypeArgument<T0>>) => {
        return new FlashLoan([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return FlashLoan.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<FlashLoan<ToPhantomTypeArgument<T0>>>> {
    return phantom(FlashLoan.reified(T0))
  }
  static get p() {
    return FlashLoan.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('FlashLoan', {
      loan_amount: bcs.u64(),
      fee: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof FlashLoan.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FlashLoan.instantiateBcs> {
    if (!FlashLoan.cachedBcs) {
      FlashLoan.cachedBcs = FlashLoan.instantiateBcs()
    }
    return FlashLoan.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): FlashLoan<ToPhantomTypeArgument<T0>> {
    return FlashLoan.reified(typeArg).new({
      loanAmount: decodeFromFields('u64', fields.loan_amount),
      fee: decodeFromFields('u64', fields.fee),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): FlashLoan<ToPhantomTypeArgument<T0>> {
    if (!isFlashLoan(item.type)) {
      throw new Error('not a FlashLoan type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return FlashLoan.reified(typeArg).new({
      loanAmount: decodeFromFieldsWithTypes('u64', item.fields.loan_amount),
      fee: decodeFromFieldsWithTypes('u64', item.fields.fee),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): FlashLoan<ToPhantomTypeArgument<T0>> {
    return FlashLoan.fromFields(typeArg, FlashLoan.bcs.parse(data))
  }

  toJSONField() {
    return {
      loanAmount: this.loanAmount.toString(),
      fee: this.fee.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): FlashLoan<ToPhantomTypeArgument<T0>> {
    return FlashLoan.reified(typeArg).new({
      loanAmount: decodeFromJSONField('u64', field.loanAmount),
      fee: decodeFromJSONField('u64', field.fee),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): FlashLoan<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== FlashLoan.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(FlashLoan.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return FlashLoan.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): FlashLoan<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashLoan(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashLoan object`)
    }
    return FlashLoan.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): FlashLoan<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashLoan(data.bcs.type)) {
        throw new Error(`object at is not a FlashLoan object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return FlashLoan.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashLoan.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<FlashLoan<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching FlashLoan object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFlashLoan(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a FlashLoan object`)
    }

    return FlashLoan.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== MarketCoin =============================== */

export function isMarketCoin(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::reserve::MarketCoin` + '<')
}

export interface MarketCoinFields<T0 extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type MarketCoinReified<T0 extends PhantomTypeArgument> = Reified<
  MarketCoin<T0>,
  MarketCoinFields<T0>
>

export class MarketCoin<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::reserve::MarketCoin`
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName = MarketCoin.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::reserve::MarketCoin<${PhantomToTypeStr<T0>}>`
  readonly $typeArgs: [PhantomToTypeStr<T0>]
  readonly $isPhantom = MarketCoin.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MarketCoinFields<T0>) {
    this.$fullTypeName = composeSuiType(
      MarketCoin.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::reserve::MarketCoin<${PhantomToTypeStr<T0>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): MarketCoinReified<ToPhantomTypeArgument<T0>> {
    const reifiedBcs = MarketCoin.bcs
    return {
      typeName: MarketCoin.$typeName,
      fullTypeName: composeSuiType(
        MarketCoin.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::reserve::MarketCoin<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`,
      typeArgs: [extractType(T0)] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>],
      isPhantom: MarketCoin.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => MarketCoin.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MarketCoin.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => MarketCoin.fromFields(T0, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MarketCoin.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => MarketCoin.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) => MarketCoin.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) => MarketCoin.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) => MarketCoin.fetch(client, T0, id),
      new: (fields: MarketCoinFields<ToPhantomTypeArgument<T0>>) => {
        return new MarketCoin([extractType(T0)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return MarketCoin.reified
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<MarketCoin<ToPhantomTypeArgument<T0>>>> {
    return phantom(MarketCoin.reified(T0))
  }
  static get p() {
    return MarketCoin.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('MarketCoin', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof MarketCoin.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof MarketCoin.instantiateBcs> {
    if (!MarketCoin.cachedBcs) {
      MarketCoin.cachedBcs = MarketCoin.instantiateBcs()
    }
    return MarketCoin.cachedBcs
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): MarketCoin<ToPhantomTypeArgument<T0>> {
    return MarketCoin.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): MarketCoin<ToPhantomTypeArgument<T0>> {
    if (!isMarketCoin(item.type)) {
      throw new Error('not a MarketCoin type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return MarketCoin.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): MarketCoin<ToPhantomTypeArgument<T0>> {
    return MarketCoin.fromFields(typeArg, MarketCoin.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): MarketCoin<ToPhantomTypeArgument<T0>> {
    return MarketCoin.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): MarketCoin<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== MarketCoin.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(MarketCoin.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    )

    return MarketCoin.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): MarketCoin<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMarketCoin(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MarketCoin object`)
    }
    return MarketCoin.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): MarketCoin<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMarketCoin(data.bcs.type)) {
        throw new Error(`object at is not a MarketCoin object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        )
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0])
      const expectedTypeArg = compressSuiType(extractType(typeArg))
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        )
      }

      return MarketCoin.fromBcs(typeArg, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MarketCoin.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<MarketCoin<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching MarketCoin object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isMarketCoin(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a MarketCoin object`)
    }

    return MarketCoin.fromSuiObjectData(typeArg, res.data)
  }
}

/* ============================== Reserve =============================== */

export function isReserve(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::reserve::Reserve`
}

export interface ReserveFields {
  id: ToField<UID>
  marketCoinSupplies: ToField<SupplyBag>
  underlyingBalances: ToField<BalanceBag>
  balanceSheets: ToField<WitTable<ToPhantom<BalanceSheets>, TypeName, ToPhantom<BalanceSheet>>>
  flashLoanFees: ToField<WitTable<ToPhantom<FlashLoanFees>, TypeName, 'u64'>>
}

export type ReserveReified = Reified<Reserve, ReserveFields>

export class Reserve implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::reserve::Reserve`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Reserve.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::reserve::Reserve`
  readonly $typeArgs: []
  readonly $isPhantom = Reserve.$isPhantom

  readonly id: ToField<UID>
  readonly marketCoinSupplies: ToField<SupplyBag>
  readonly underlyingBalances: ToField<BalanceBag>
  readonly balanceSheets: ToField<
    WitTable<ToPhantom<BalanceSheets>, TypeName, ToPhantom<BalanceSheet>>
  >
  readonly flashLoanFees: ToField<WitTable<ToPhantom<FlashLoanFees>, TypeName, 'u64'>>

  private constructor(typeArgs: [], fields: ReserveFields) {
    this.$fullTypeName = composeSuiType(
      Reserve.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::reserve::Reserve`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.marketCoinSupplies = fields.marketCoinSupplies
    this.underlyingBalances = fields.underlyingBalances
    this.balanceSheets = fields.balanceSheets
    this.flashLoanFees = fields.flashLoanFees
  }

  static reified(): ReserveReified {
    const reifiedBcs = Reserve.bcs
    return {
      typeName: Reserve.$typeName,
      fullTypeName: composeSuiType(
        Reserve.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::reserve::Reserve`,
      typeArgs: [] as [],
      isPhantom: Reserve.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Reserve.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Reserve.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Reserve.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Reserve.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Reserve.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Reserve.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Reserve.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Reserve.fetch(client, id),
      new: (fields: ReserveFields) => {
        return new Reserve([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Reserve.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Reserve>> {
    return phantom(Reserve.reified())
  }
  static get p() {
    return Reserve.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Reserve', {
      id: UID.bcs,
      market_coin_supplies: SupplyBag.bcs,
      underlying_balances: BalanceBag.bcs,
      balance_sheets: WitTable.bcs(TypeName.bcs),
      flash_loan_fees: WitTable.bcs(TypeName.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof Reserve.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Reserve.instantiateBcs> {
    if (!Reserve.cachedBcs) {
      Reserve.cachedBcs = Reserve.instantiateBcs()
    }
    return Reserve.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Reserve {
    return Reserve.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      marketCoinSupplies: decodeFromFields(SupplyBag.reified(), fields.market_coin_supplies),
      underlyingBalances: decodeFromFields(BalanceBag.reified(), fields.underlying_balances),
      balanceSheets: decodeFromFields(
        WitTable.reified(
          reified.phantom(BalanceSheets.reified()),
          TypeName.reified(),
          reified.phantom(BalanceSheet.reified())
        ),
        fields.balance_sheets
      ),
      flashLoanFees: decodeFromFields(
        WitTable.reified(
          reified.phantom(FlashLoanFees.reified()),
          TypeName.reified(),
          reified.phantom('u64')
        ),
        fields.flash_loan_fees
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Reserve {
    if (!isReserve(item.type)) {
      throw new Error('not a Reserve type')
    }

    return Reserve.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      marketCoinSupplies: decodeFromFieldsWithTypes(
        SupplyBag.reified(),
        item.fields.market_coin_supplies
      ),
      underlyingBalances: decodeFromFieldsWithTypes(
        BalanceBag.reified(),
        item.fields.underlying_balances
      ),
      balanceSheets: decodeFromFieldsWithTypes(
        WitTable.reified(
          reified.phantom(BalanceSheets.reified()),
          TypeName.reified(),
          reified.phantom(BalanceSheet.reified())
        ),
        item.fields.balance_sheets
      ),
      flashLoanFees: decodeFromFieldsWithTypes(
        WitTable.reified(
          reified.phantom(FlashLoanFees.reified()),
          TypeName.reified(),
          reified.phantom('u64')
        ),
        item.fields.flash_loan_fees
      ),
    })
  }

  static fromBcs(data: Uint8Array): Reserve {
    return Reserve.fromFields(Reserve.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      marketCoinSupplies: this.marketCoinSupplies.toJSONField(),
      underlyingBalances: this.underlyingBalances.toJSONField(),
      balanceSheets: this.balanceSheets.toJSONField(),
      flashLoanFees: this.flashLoanFees.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Reserve {
    return Reserve.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      marketCoinSupplies: decodeFromJSONField(SupplyBag.reified(), field.marketCoinSupplies),
      underlyingBalances: decodeFromJSONField(BalanceBag.reified(), field.underlyingBalances),
      balanceSheets: decodeFromJSONField(
        WitTable.reified(
          reified.phantom(BalanceSheets.reified()),
          TypeName.reified(),
          reified.phantom(BalanceSheet.reified())
        ),
        field.balanceSheets
      ),
      flashLoanFees: decodeFromJSONField(
        WitTable.reified(
          reified.phantom(FlashLoanFees.reified()),
          TypeName.reified(),
          reified.phantom('u64')
        ),
        field.flashLoanFees
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Reserve {
    if (json.$typeName !== Reserve.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Reserve.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Reserve {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isReserve(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Reserve object`)
    }
    return Reserve.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Reserve {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isReserve(data.bcs.type)) {
        throw new Error(`object at is not a Reserve object`)
      }

      return Reserve.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Reserve.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Reserve> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Reserve object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isReserve(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Reserve object`)
    }

    return Reserve.fromSuiObjectData(res.data)
  }
}
