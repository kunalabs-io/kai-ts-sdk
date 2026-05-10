import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  phantom,
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToPhantomTypeArgument,
  ToTypeStr,
  ToTypeStr as ToPhantom,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  parseTypeName,
  SupportedSuiClient,
} from '../../../_framework/util'
import { TypeName } from '../../../std/type-name/structs'
import { UID } from '../../../sui/object/structs'
import { BalanceBag } from '../../x/balance-bag/structs'
import { SupplyBag } from '../../x/supply-bag/structs'
import { WitTable } from '../../x/wit-table/structs'

/* ============================== BalanceSheets =============================== */

export function isBalanceSheets(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'reserve::BalanceSheets')}::reserve::BalanceSheets`
}

export interface BalanceSheetsFields {
  dummyField: ToField<'bool'>
}

export type BalanceSheetsReified = Reified<BalanceSheets, BalanceSheetsFields>

export type BalanceSheetsJSONField = {
  dummyField: boolean
}

export type BalanceSheetsJSON = {
  $typeName: typeof BalanceSheets.$typeName
  $typeArgs: []
} & BalanceSheetsJSONField

export class BalanceSheets implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::reserve::BalanceSheets` = `${
    getTypeOrigin('protocol', 'reserve::BalanceSheets')
  }::reserve::BalanceSheets` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BalanceSheets.$typeName = BalanceSheets.$typeName
  readonly $fullTypeName: `${string}::reserve::BalanceSheets`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BalanceSheets.$isPhantom = BalanceSheets.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: BalanceSheetsFields) {
    this.$fullTypeName = composeSuiType(
      BalanceSheets.$typeName,
      ...typeArgs,
    ) as `${string}::reserve::BalanceSheets`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): BalanceSheetsReified {
    const reifiedBcs = BalanceSheets.bcs
    return {
      typeName: BalanceSheets.$typeName,
      fullTypeName: composeSuiType(
        BalanceSheets.$typeName,
        ...[],
      ) as `${string}::reserve::BalanceSheets`,
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
      fetch: async (client: SupportedSuiClient, id: string) => BalanceSheets.fetch(client, id),
      new: (fields: BalanceSheetsFields) => {
        return new BalanceSheets([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BalanceSheetsReified {
    return BalanceSheets.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BalanceSheets>> {
    return phantom(BalanceSheets.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BalanceSheets>> {
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
    return BalanceSheets.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): BalanceSheetsJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): BalanceSheetsJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): BalanceSheets {
    return BalanceSheets.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): BalanceSheets {
    if (json.$typeName !== BalanceSheets.$typeName) {
      throw new Error(
        `not a BalanceSheets json object: expected '${BalanceSheets.$typeName}' but got '${json.$typeName}'`,
      )
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

      return BalanceSheets.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BalanceSheets.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<BalanceSheets> {
    const res = await fetchObjectBcs(client, id)
    if (!isBalanceSheets(res.type)) {
      throw new Error(`object at id ${id} is not a BalanceSheets object`)
    }

    return BalanceSheets.fromBcs(res.bcsBytes)
  }
}

/* ============================== BalanceSheet =============================== */

export function isBalanceSheet(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'reserve::BalanceSheet')}::reserve::BalanceSheet`
}

export interface BalanceSheetFields {
  cash: ToField<'u64'>
  debt: ToField<'u64'>
  revenue: ToField<'u64'>
  marketCoinSupply: ToField<'u64'>
}

export type BalanceSheetReified = Reified<BalanceSheet, BalanceSheetFields>

export type BalanceSheetJSONField = {
  cash: string
  debt: string
  revenue: string
  marketCoinSupply: string
}

export type BalanceSheetJSON = {
  $typeName: typeof BalanceSheet.$typeName
  $typeArgs: []
} & BalanceSheetJSONField

export class BalanceSheet implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::reserve::BalanceSheet` = `${
    getTypeOrigin('protocol', 'reserve::BalanceSheet')
  }::reserve::BalanceSheet` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof BalanceSheet.$typeName = BalanceSheet.$typeName
  readonly $fullTypeName: `${string}::reserve::BalanceSheet`
  readonly $typeArgs: []
  readonly $isPhantom: typeof BalanceSheet.$isPhantom = BalanceSheet.$isPhantom

  readonly cash: ToField<'u64'>
  readonly debt: ToField<'u64'>
  readonly revenue: ToField<'u64'>
  readonly marketCoinSupply: ToField<'u64'>

  private constructor(typeArgs: [], fields: BalanceSheetFields) {
    this.$fullTypeName = composeSuiType(
      BalanceSheet.$typeName,
      ...typeArgs,
    ) as `${string}::reserve::BalanceSheet`
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
        ...[],
      ) as `${string}::reserve::BalanceSheet`,
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
      fetch: async (client: SupportedSuiClient, id: string) => BalanceSheet.fetch(client, id),
      new: (fields: BalanceSheetFields) => {
        return new BalanceSheet([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): BalanceSheetReified {
    return BalanceSheet.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<BalanceSheet>> {
    return phantom(BalanceSheet.reified())
  }

  static get p(): PhantomReified<ToTypeStr<BalanceSheet>> {
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

  toJSONField(): BalanceSheetJSONField {
    return {
      cash: this.cash.toString(),
      debt: this.debt.toString(),
      revenue: this.revenue.toString(),
      marketCoinSupply: this.marketCoinSupply.toString(),
    }
  }

  toJSON(): BalanceSheetJSON {
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
      throw new Error(
        `not a BalanceSheet json object: expected '${BalanceSheet.$typeName}' but got '${json.$typeName}'`,
      )
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

      return BalanceSheet.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return BalanceSheet.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<BalanceSheet> {
    const res = await fetchObjectBcs(client, id)
    if (!isBalanceSheet(res.type)) {
      throw new Error(`object at id ${id} is not a BalanceSheet object`)
    }

    return BalanceSheet.fromBcs(res.bcsBytes)
  }
}

/* ============================== FlashLoanFees =============================== */

export function isFlashLoanFees(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'reserve::FlashLoanFees')}::reserve::FlashLoanFees`
}

export interface FlashLoanFeesFields {
  dummyField: ToField<'bool'>
}

export type FlashLoanFeesReified = Reified<FlashLoanFees, FlashLoanFeesFields>

export type FlashLoanFeesJSONField = {
  dummyField: boolean
}

export type FlashLoanFeesJSON = {
  $typeName: typeof FlashLoanFees.$typeName
  $typeArgs: []
} & FlashLoanFeesJSONField

export class FlashLoanFees implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::reserve::FlashLoanFees` = `${
    getTypeOrigin('protocol', 'reserve::FlashLoanFees')
  }::reserve::FlashLoanFees` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FlashLoanFees.$typeName = FlashLoanFees.$typeName
  readonly $fullTypeName: `${string}::reserve::FlashLoanFees`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FlashLoanFees.$isPhantom = FlashLoanFees.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: FlashLoanFeesFields) {
    this.$fullTypeName = composeSuiType(
      FlashLoanFees.$typeName,
      ...typeArgs,
    ) as `${string}::reserve::FlashLoanFees`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): FlashLoanFeesReified {
    const reifiedBcs = FlashLoanFees.bcs
    return {
      typeName: FlashLoanFees.$typeName,
      fullTypeName: composeSuiType(
        FlashLoanFees.$typeName,
        ...[],
      ) as `${string}::reserve::FlashLoanFees`,
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
      fetch: async (client: SupportedSuiClient, id: string) => FlashLoanFees.fetch(client, id),
      new: (fields: FlashLoanFeesFields) => {
        return new FlashLoanFees([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FlashLoanFeesReified {
    return FlashLoanFees.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FlashLoanFees>> {
    return phantom(FlashLoanFees.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FlashLoanFees>> {
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
    return FlashLoanFees.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
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

  toJSONField(): FlashLoanFeesJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): FlashLoanFeesJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FlashLoanFees {
    return FlashLoanFees.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): FlashLoanFees {
    if (json.$typeName !== FlashLoanFees.$typeName) {
      throw new Error(
        `not a FlashLoanFees json object: expected '${FlashLoanFees.$typeName}' but got '${json.$typeName}'`,
      )
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

      return FlashLoanFees.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashLoanFees.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<FlashLoanFees> {
    const res = await fetchObjectBcs(client, id)
    if (!isFlashLoanFees(res.type)) {
      throw new Error(`object at id ${id} is not a FlashLoanFees object`)
    }

    return FlashLoanFees.fromBcs(res.bcsBytes)
  }
}

/* ============================== FlashLoan =============================== */

export function isFlashLoan(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('protocol', 'reserve::FlashLoan')}::reserve::FlashLoan` + '<',
  )
}

export interface FlashLoanFields<T extends PhantomTypeArgument> {
  loanAmount: ToField<'u64'>
  fee: ToField<'u64'>
}

export type FlashLoanReified<T extends PhantomTypeArgument> = Reified<
  FlashLoan<T>,
  FlashLoanFields<T>
>

export type FlashLoanJSONField<T extends PhantomTypeArgument> = {
  loanAmount: string
  fee: string
}

export type FlashLoanJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof FlashLoan.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & FlashLoanJSONField<T>

export class FlashLoan<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::reserve::FlashLoan` = `${
    getTypeOrigin('protocol', 'reserve::FlashLoan')
  }::reserve::FlashLoan` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof FlashLoan.$typeName = FlashLoan.$typeName
  readonly $fullTypeName: `${string}::reserve::FlashLoan<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof FlashLoan.$isPhantom = FlashLoan.$isPhantom

  readonly loanAmount: ToField<'u64'>
  readonly fee: ToField<'u64'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: FlashLoanFields<T>) {
    this.$fullTypeName = composeSuiType(
      FlashLoan.$typeName,
      ...typeArgs,
    ) as `${string}::reserve::FlashLoan<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.loanAmount = fields.loanAmount
    this.fee = fields.fee
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): FlashLoanReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = FlashLoan.bcs
    return {
      typeName: FlashLoan.$typeName,
      fullTypeName: composeSuiType(
        FlashLoan.$typeName,
        ...[extractType(T)],
      ) as `${string}::reserve::FlashLoan<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: FlashLoan.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => FlashLoan.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FlashLoan.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => FlashLoan.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FlashLoan.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => FlashLoan.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => FlashLoan.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => FlashLoan.fromSuiObjectData(T, content),
      fetch: async (client: SupportedSuiClient, id: string) => FlashLoan.fetch(client, T, id),
      new: (fields: FlashLoanFields<ToPhantomTypeArgument<T>>) => {
        return new FlashLoan([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof FlashLoan.reified {
    return FlashLoan.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<FlashLoan<ToPhantomTypeArgument<T>>>> {
    return phantom(FlashLoan.reified(T))
  }

  static get p(): typeof FlashLoan.phantom {
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

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): FlashLoan<ToPhantomTypeArgument<T>> {
    return FlashLoan.reified(typeArg).new({
      loanAmount: decodeFromFields('u64', fields.loan_amount),
      fee: decodeFromFields('u64', fields.fee),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): FlashLoan<ToPhantomTypeArgument<T>> {
    if (!isFlashLoan(item.type)) {
      throw new Error('not a FlashLoan type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return FlashLoan.reified(typeArg).new({
      loanAmount: decodeFromFieldsWithTypes('u64', item.fields.loan_amount),
      fee: decodeFromFieldsWithTypes('u64', item.fields.fee),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): FlashLoan<ToPhantomTypeArgument<T>> {
    return FlashLoan.fromFields(typeArg, FlashLoan.bcs.parse(data))
  }

  toJSONField(): FlashLoanJSONField<T> {
    return {
      loanAmount: this.loanAmount.toString(),
      fee: this.fee.toString(),
    }
  }

  toJSON(): FlashLoanJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): FlashLoan<ToPhantomTypeArgument<T>> {
    return FlashLoan.reified(typeArg).new({
      loanAmount: decodeFromJSONField('u64', field.loanAmount),
      fee: decodeFromJSONField('u64', field.fee),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): FlashLoan<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== FlashLoan.$typeName) {
      throw new Error(
        `not a FlashLoan json object: expected '${FlashLoan.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(FlashLoan.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return FlashLoan.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): FlashLoan<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashLoan(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashLoan object`)
    }
    return FlashLoan.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): FlashLoan<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashLoan(data.bcs.type)) {
        throw new Error(`object at is not a FlashLoan object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return FlashLoan.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashLoan.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T,
    id: string,
  ): Promise<FlashLoan<ToPhantomTypeArgument<T>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isFlashLoan(res.type)) {
      throw new Error(`object at id ${id} is not a FlashLoan object`)
    }

    const gotTypeArgs = parseTypeName(res.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return FlashLoan.fromBcs(typeArg, res.bcsBytes)
  }
}

/* ============================== MarketCoin =============================== */

export function isMarketCoin(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('protocol', 'reserve::MarketCoin')}::reserve::MarketCoin` + '<',
  )
}

export interface MarketCoinFields<T extends PhantomTypeArgument> {
  dummyField: ToField<'bool'>
}

export type MarketCoinReified<T extends PhantomTypeArgument> = Reified<
  MarketCoin<T>,
  MarketCoinFields<T>
>

export type MarketCoinJSONField<T extends PhantomTypeArgument> = {
  dummyField: boolean
}

export type MarketCoinJSON<T extends PhantomTypeArgument> = {
  $typeName: typeof MarketCoin.$typeName
  $typeArgs: [PhantomToTypeStr<T>]
} & MarketCoinJSONField<T>

export class MarketCoin<T extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::reserve::MarketCoin` = `${
    getTypeOrigin('protocol', 'reserve::MarketCoin')
  }::reserve::MarketCoin` as const
  static readonly $numTypeParams = 1
  static readonly $isPhantom = [true] as const

  readonly $typeName: typeof MarketCoin.$typeName = MarketCoin.$typeName
  readonly $fullTypeName: `${string}::reserve::MarketCoin<${PhantomToTypeStr<T>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>]
  readonly $isPhantom: typeof MarketCoin.$isPhantom = MarketCoin.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [PhantomToTypeStr<T>], fields: MarketCoinFields<T>) {
    this.$fullTypeName = composeSuiType(
      MarketCoin.$typeName,
      ...typeArgs,
    ) as `${string}::reserve::MarketCoin<${PhantomToTypeStr<T>}>`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): MarketCoinReified<ToPhantomTypeArgument<T>> {
    const reifiedBcs = MarketCoin.bcs
    return {
      typeName: MarketCoin.$typeName,
      fullTypeName: composeSuiType(
        MarketCoin.$typeName,
        ...[extractType(T)],
      ) as `${string}::reserve::MarketCoin<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`,
      typeArgs: [extractType(T)] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>],
      isPhantom: MarketCoin.$isPhantom,
      reifiedTypeArgs: [T],
      fromFields: (fields: Record<string, any>) => MarketCoin.fromFields(T, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => MarketCoin.fromFieldsWithTypes(T, item),
      fromBcs: (data: Uint8Array) => MarketCoin.fromFields(T, reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => MarketCoin.fromJSONField(T, field),
      fromJSON: (json: Record<string, any>) => MarketCoin.fromJSON(T, json),
      fromSuiParsedData: (content: SuiParsedData) => MarketCoin.fromSuiParsedData(T, content),
      fromSuiObjectData: (content: SuiObjectData) => MarketCoin.fromSuiObjectData(T, content),
      fetch: async (client: SupportedSuiClient, id: string) => MarketCoin.fetch(client, T, id),
      new: (fields: MarketCoinFields<ToPhantomTypeArgument<T>>) => {
        return new MarketCoin([extractType(T)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof MarketCoin.reified {
    return MarketCoin.reified
  }

  static phantom<T extends PhantomReified<PhantomTypeArgument>>(
    T: T,
  ): PhantomReified<ToTypeStr<MarketCoin<ToPhantomTypeArgument<T>>>> {
    return phantom(MarketCoin.reified(T))
  }

  static get p(): typeof MarketCoin.phantom {
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

  static fromFields<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    fields: Record<string, any>,
  ): MarketCoin<ToPhantomTypeArgument<T>> {
    return MarketCoin.reified(typeArg).new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    item: FieldsWithTypes,
  ): MarketCoin<ToPhantomTypeArgument<T>> {
    if (!isMarketCoin(item.type)) {
      throw new Error('not a MarketCoin type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return MarketCoin.reified(typeArg).new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: Uint8Array,
  ): MarketCoin<ToPhantomTypeArgument<T>> {
    return MarketCoin.fromFields(typeArg, MarketCoin.bcs.parse(data))
  }

  toJSONField(): MarketCoinJSONField<T> {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): MarketCoinJSON<T> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    field: any,
  ): MarketCoin<ToPhantomTypeArgument<T>> {
    return MarketCoin.reified(typeArg).new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    json: Record<string, any>,
  ): MarketCoin<ToPhantomTypeArgument<T>> {
    if (json.$typeName !== MarketCoin.$typeName) {
      throw new Error(
        `not a MarketCoin json object: expected '${MarketCoin.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(MarketCoin.$typeName, ...[extractType(typeArg)]),
      json.$typeArgs,
      [typeArg],
    )

    return MarketCoin.fromJSONField(typeArg, json)
  }

  static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    content: SuiParsedData,
  ): MarketCoin<ToPhantomTypeArgument<T>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMarketCoin(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a MarketCoin object`)
    }
    return MarketCoin.fromFieldsWithTypes(typeArg, content)
  }

  static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T,
    data: SuiObjectData,
  ): MarketCoin<ToPhantomTypeArgument<T>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMarketCoin(data.bcs.type)) {
        throw new Error(`object at is not a MarketCoin object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 1; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return MarketCoin.fromBcs(typeArg, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return MarketCoin.fromSuiParsedData(typeArg, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<T extends PhantomReified<PhantomTypeArgument>>(
    client: SupportedSuiClient,
    typeArg: T,
    id: string,
  ): Promise<MarketCoin<ToPhantomTypeArgument<T>>> {
    const res = await fetchObjectBcs(client, id)
    if (!isMarketCoin(res.type)) {
      throw new Error(`object at id ${id} is not a MarketCoin object`)
    }

    const gotTypeArgs = parseTypeName(res.type).typeArgs
    if (gotTypeArgs.length !== 1) {
      throw new Error(
        `type argument mismatch: expected 1 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 1; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType([typeArg][i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return MarketCoin.fromBcs(typeArg, res.bcsBytes)
  }
}

/* ============================== Reserve =============================== */

export function isReserve(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('protocol', 'reserve::Reserve')}::reserve::Reserve`
}

export interface ReserveFields {
  id: ToField<UID>
  marketCoinSupplies: ToField<SupplyBag>
  underlyingBalances: ToField<BalanceBag>
  balanceSheets: ToField<WitTable<ToPhantom<BalanceSheets>, TypeName, ToPhantom<BalanceSheet>>>
  flashLoanFees: ToField<WitTable<ToPhantom<FlashLoanFees>, TypeName, 'u64'>>
}

export type ReserveReified = Reified<Reserve, ReserveFields>

export type ReserveJSONField = {
  id: string
  marketCoinSupplies: ToJSON<SupplyBag>
  underlyingBalances: ToJSON<BalanceBag>
  balanceSheets: ToJSON<WitTable<ToPhantom<BalanceSheets>, TypeName, ToPhantom<BalanceSheet>>>
  flashLoanFees: ToJSON<WitTable<ToPhantom<FlashLoanFees>, TypeName, 'u64'>>
}

export type ReserveJSON = {
  $typeName: typeof Reserve.$typeName
  $typeArgs: []
} & ReserveJSONField

export class Reserve implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::reserve::Reserve` = `${
    getTypeOrigin('protocol', 'reserve::Reserve')
  }::reserve::Reserve` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Reserve.$typeName = Reserve.$typeName
  readonly $fullTypeName: `${string}::reserve::Reserve`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Reserve.$isPhantom = Reserve.$isPhantom

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
      ...typeArgs,
    ) as `${string}::reserve::Reserve`
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
        ...[],
      ) as `${string}::reserve::Reserve`,
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
      fetch: async (client: SupportedSuiClient, id: string) => Reserve.fetch(client, id),
      new: (fields: ReserveFields) => {
        return new Reserve([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ReserveReified {
    return Reserve.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Reserve>> {
    return phantom(Reserve.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Reserve>> {
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
          phantom(BalanceSheets.reified()),
          TypeName.reified(),
          phantom(BalanceSheet.reified()),
        ),
        fields.balance_sheets,
      ),
      flashLoanFees: decodeFromFields(
        WitTable.reified(phantom(FlashLoanFees.reified()), TypeName.reified(), phantom('u64')),
        fields.flash_loan_fees,
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
        item.fields.market_coin_supplies,
      ),
      underlyingBalances: decodeFromFieldsWithTypes(
        BalanceBag.reified(),
        item.fields.underlying_balances,
      ),
      balanceSheets: decodeFromFieldsWithTypes(
        WitTable.reified(
          phantom(BalanceSheets.reified()),
          TypeName.reified(),
          phantom(BalanceSheet.reified()),
        ),
        item.fields.balance_sheets,
      ),
      flashLoanFees: decodeFromFieldsWithTypes(
        WitTable.reified(phantom(FlashLoanFees.reified()), TypeName.reified(), phantom('u64')),
        item.fields.flash_loan_fees,
      ),
    })
  }

  static fromBcs(data: Uint8Array): Reserve {
    return Reserve.fromFields(Reserve.bcs.parse(data))
  }

  toJSONField(): ReserveJSONField {
    return {
      id: this.id,
      marketCoinSupplies: this.marketCoinSupplies.toJSONField(),
      underlyingBalances: this.underlyingBalances.toJSONField(),
      balanceSheets: this.balanceSheets.toJSONField(),
      flashLoanFees: this.flashLoanFees.toJSONField(),
    }
  }

  toJSON(): ReserveJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Reserve {
    return Reserve.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      marketCoinSupplies: decodeFromJSONField(SupplyBag.reified(), field.marketCoinSupplies),
      underlyingBalances: decodeFromJSONField(BalanceBag.reified(), field.underlyingBalances),
      balanceSheets: decodeFromJSONField(
        WitTable.reified(
          phantom(BalanceSheets.reified()),
          TypeName.reified(),
          phantom(BalanceSheet.reified()),
        ),
        field.balanceSheets,
      ),
      flashLoanFees: decodeFromJSONField(
        WitTable.reified(phantom(FlashLoanFees.reified()), TypeName.reified(), phantom('u64')),
        field.flashLoanFees,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): Reserve {
    if (json.$typeName !== Reserve.$typeName) {
      throw new Error(
        `not a Reserve json object: expected '${Reserve.$typeName}' but got '${json.$typeName}'`,
      )
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

      return Reserve.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Reserve.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Reserve> {
    const res = await fetchObjectBcs(client, id)
    if (!isReserve(res.type)) {
      throw new Error(`object at id ${id} is not a Reserve object`)
    }

    return Reserve.fromBcs(res.bcsBytes)
  }
}
