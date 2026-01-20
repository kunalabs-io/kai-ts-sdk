import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
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
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'

/* ============================== Debt =============================== */

export function isDebt(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('scallop-protocol', 'obligation_debts::Debt')}::obligation_debts::Debt`
}

export interface DebtFields {
  amount: ToField<'u64'>
  borrowIndex: ToField<'u64'>
}

export type DebtReified = Reified<Debt, DebtFields>

export type DebtJSONField = {
  amount: string
  borrowIndex: string
}

export type DebtJSON = {
  $typeName: typeof Debt.$typeName
  $typeArgs: []
} & DebtJSONField

export class Debt implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation_debts::Debt` = `${
    getTypeOrigin('scallop-protocol', 'obligation_debts::Debt')
  }::obligation_debts::Debt` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Debt.$typeName = Debt.$typeName
  readonly $fullTypeName: `${string}::obligation_debts::Debt`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Debt.$isPhantom = Debt.$isPhantom

  readonly amount: ToField<'u64'>
  readonly borrowIndex: ToField<'u64'>

  private constructor(typeArgs: [], fields: DebtFields) {
    this.$fullTypeName = composeSuiType(
      Debt.$typeName,
      ...typeArgs,
    ) as `${string}::obligation_debts::Debt`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
    this.borrowIndex = fields.borrowIndex
  }

  static reified(): DebtReified {
    const reifiedBcs = Debt.bcs
    return {
      typeName: Debt.$typeName,
      fullTypeName: composeSuiType(
        Debt.$typeName,
        ...[],
      ) as `${string}::obligation_debts::Debt`,
      typeArgs: [] as [],
      isPhantom: Debt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Debt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Debt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Debt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Debt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Debt.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Debt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Debt.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Debt.fetch(client, id),
      new: (fields: DebtFields) => {
        return new Debt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): DebtReified {
    return Debt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Debt>> {
    return phantom(Debt.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Debt>> {
    return Debt.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Debt', {
      amount: bcs.u64(),
      borrow_index: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Debt.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Debt.instantiateBcs> {
    if (!Debt.cachedBcs) {
      Debt.cachedBcs = Debt.instantiateBcs()
    }
    return Debt.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Debt {
    return Debt.reified().new({
      amount: decodeFromFields('u64', fields.amount),
      borrowIndex: decodeFromFields('u64', fields.borrow_index),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Debt {
    if (!isDebt(item.type)) {
      throw new Error('not a Debt type')
    }

    return Debt.reified().new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      borrowIndex: decodeFromFieldsWithTypes('u64', item.fields.borrow_index),
    })
  }

  static fromBcs(data: Uint8Array): Debt {
    return Debt.fromFields(Debt.bcs.parse(data))
  }

  toJSONField(): DebtJSONField {
    return {
      amount: this.amount.toString(),
      borrowIndex: this.borrowIndex.toString(),
    }
  }

  toJSON(): DebtJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Debt {
    return Debt.reified().new({
      amount: decodeFromJSONField('u64', field.amount),
      borrowIndex: decodeFromJSONField('u64', field.borrowIndex),
    })
  }

  static fromJSON(json: Record<string, any>): Debt {
    if (json.$typeName !== Debt.$typeName) {
      throw new Error(
        `not a Debt json object: expected '${Debt.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Debt.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Debt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isDebt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Debt object`)
    }
    return Debt.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Debt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isDebt(data.bcs.type)) {
        throw new Error(`object at is not a Debt object`)
      }

      return Debt.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Debt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Debt> {
    const res = await fetchObjectBcs(client, id)
    if (!isDebt(res.type)) {
      throw new Error(`object at id ${id} is not a Debt object`)
    }

    return Debt.fromBcs(res.bcsBytes)
  }
}

/* ============================== ObligationDebts =============================== */

export function isObligationDebts(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'obligation_debts::ObligationDebts')
    }::obligation_debts::ObligationDebts`
}

export interface ObligationDebtsFields {
  dummyField: ToField<'bool'>
}

export type ObligationDebtsReified = Reified<ObligationDebts, ObligationDebtsFields>

export type ObligationDebtsJSONField = {
  dummyField: boolean
}

export type ObligationDebtsJSON = {
  $typeName: typeof ObligationDebts.$typeName
  $typeArgs: []
} & ObligationDebtsJSONField

export class ObligationDebts implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation_debts::ObligationDebts` = `${
    getTypeOrigin('scallop-protocol', 'obligation_debts::ObligationDebts')
  }::obligation_debts::ObligationDebts` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ObligationDebts.$typeName = ObligationDebts.$typeName
  readonly $fullTypeName: `${string}::obligation_debts::ObligationDebts`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ObligationDebts.$isPhantom = ObligationDebts.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObligationDebtsFields) {
    this.$fullTypeName = composeSuiType(
      ObligationDebts.$typeName,
      ...typeArgs,
    ) as `${string}::obligation_debts::ObligationDebts`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ObligationDebtsReified {
    const reifiedBcs = ObligationDebts.bcs
    return {
      typeName: ObligationDebts.$typeName,
      fullTypeName: composeSuiType(
        ObligationDebts.$typeName,
        ...[],
      ) as `${string}::obligation_debts::ObligationDebts`,
      typeArgs: [] as [],
      isPhantom: ObligationDebts.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationDebts.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationDebts.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationDebts.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationDebts.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationDebts.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationDebts.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationDebts.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => ObligationDebts.fetch(client, id),
      new: (fields: ObligationDebtsFields) => {
        return new ObligationDebts([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationDebtsReified {
    return ObligationDebts.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationDebts>> {
    return phantom(ObligationDebts.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ObligationDebts>> {
    return ObligationDebts.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationDebts', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationDebts.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ObligationDebts.instantiateBcs> {
    if (!ObligationDebts.cachedBcs) {
      ObligationDebts.cachedBcs = ObligationDebts.instantiateBcs()
    }
    return ObligationDebts.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationDebts {
    return ObligationDebts.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationDebts {
    if (!isObligationDebts(item.type)) {
      throw new Error('not a ObligationDebts type')
    }

    return ObligationDebts.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ObligationDebts {
    return ObligationDebts.fromFields(ObligationDebts.bcs.parse(data))
  }

  toJSONField(): ObligationDebtsJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ObligationDebtsJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationDebts {
    return ObligationDebts.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationDebts {
    if (json.$typeName !== ObligationDebts.$typeName) {
      throw new Error(
        `not a ObligationDebts json object: expected '${ObligationDebts.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ObligationDebts.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationDebts {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationDebts(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ObligationDebts object`)
    }
    return ObligationDebts.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationDebts {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationDebts(data.bcs.type)) {
        throw new Error(`object at is not a ObligationDebts object`)
      }

      return ObligationDebts.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationDebts.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ObligationDebts> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligationDebts(res.type)) {
      throw new Error(`object at id ${id} is not a ObligationDebts object`)
    }

    return ObligationDebts.fromBcs(res.bcsBytes)
  }
}
