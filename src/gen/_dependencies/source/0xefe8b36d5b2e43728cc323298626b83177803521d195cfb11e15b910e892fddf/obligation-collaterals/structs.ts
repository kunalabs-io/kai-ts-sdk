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
import { PKG_V1 } from '../index'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Collateral =============================== */

export function isCollateral(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation_collaterals::Collateral`
}

export interface CollateralFields {
  amount: ToField<'u64'>
}

export type CollateralReified = Reified<Collateral, CollateralFields>

export class Collateral implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation_collaterals::Collateral`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Collateral.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation_collaterals::Collateral`
  readonly $typeArgs: []
  readonly $isPhantom = Collateral.$isPhantom

  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollateralFields) {
    this.$fullTypeName = composeSuiType(
      Collateral.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation_collaterals::Collateral`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
  }

  static reified(): CollateralReified {
    const reifiedBcs = Collateral.bcs
    return {
      typeName: Collateral.$typeName,
      fullTypeName: composeSuiType(
        Collateral.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation_collaterals::Collateral`,
      typeArgs: [] as [],
      isPhantom: Collateral.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Collateral.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Collateral.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Collateral.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Collateral.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Collateral.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Collateral.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Collateral.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Collateral.fetch(client, id),
      new: (fields: CollateralFields) => {
        return new Collateral([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Collateral.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Collateral>> {
    return phantom(Collateral.reified())
  }
  static get p() {
    return Collateral.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Collateral', {
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Collateral.instantiateBcs> | null = null

  static get bcs() {
    if (!Collateral.cachedBcs) {
      Collateral.cachedBcs = Collateral.instantiateBcs()
    }
    return Collateral.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Collateral {
    return Collateral.reified().new({ amount: decodeFromFields('u64', fields.amount) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Collateral {
    if (!isCollateral(item.type)) {
      throw new Error('not a Collateral type')
    }

    return Collateral.reified().new({
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): Collateral {
    return Collateral.fromFields(Collateral.bcs.parse(data))
  }

  toJSONField() {
    return {
      amount: this.amount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Collateral {
    return Collateral.reified().new({ amount: decodeFromJSONField('u64', field.amount) })
  }

  static fromJSON(json: Record<string, any>): Collateral {
    if (json.$typeName !== Collateral.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Collateral.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Collateral {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollateral(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Collateral object`)
    }
    return Collateral.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Collateral {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollateral(data.bcs.type)) {
        throw new Error(`object at is not a Collateral object`)
      }

      return Collateral.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Collateral.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Collateral> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Collateral object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isCollateral(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Collateral object`)
    }

    return Collateral.fromSuiObjectData(res.data)
  }
}

/* ============================== ObligationCollaterals =============================== */

export function isObligationCollaterals(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation_collaterals::ObligationCollaterals`
}

export interface ObligationCollateralsFields {
  dummyField: ToField<'bool'>
}

export type ObligationCollateralsReified = Reified<
  ObligationCollaterals,
  ObligationCollateralsFields
>

export class ObligationCollaterals implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation_collaterals::ObligationCollaterals`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationCollaterals.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation_collaterals::ObligationCollaterals`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationCollaterals.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObligationCollateralsFields) {
    this.$fullTypeName = composeSuiType(
      ObligationCollaterals.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation_collaterals::ObligationCollaterals`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ObligationCollateralsReified {
    const reifiedBcs = ObligationCollaterals.bcs
    return {
      typeName: ObligationCollaterals.$typeName,
      fullTypeName: composeSuiType(
        ObligationCollaterals.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation_collaterals::ObligationCollaterals`,
      typeArgs: [] as [],
      isPhantom: ObligationCollaterals.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationCollaterals.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ObligationCollaterals.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationCollaterals.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationCollaterals.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationCollaterals.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ObligationCollaterals.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ObligationCollaterals.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObligationCollaterals.fetch(client, id),
      new: (fields: ObligationCollateralsFields) => {
        return new ObligationCollaterals([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationCollaterals.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationCollaterals>> {
    return phantom(ObligationCollaterals.reified())
  }
  static get p() {
    return ObligationCollaterals.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationCollaterals', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationCollaterals.instantiateBcs> | null = null

  static get bcs() {
    if (!ObligationCollaterals.cachedBcs) {
      ObligationCollaterals.cachedBcs = ObligationCollaterals.instantiateBcs()
    }
    return ObligationCollaterals.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationCollaterals {
    return ObligationCollaterals.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationCollaterals {
    if (!isObligationCollaterals(item.type)) {
      throw new Error('not a ObligationCollaterals type')
    }

    return ObligationCollaterals.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ObligationCollaterals {
    return ObligationCollaterals.fromFields(ObligationCollaterals.bcs.parse(data))
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationCollaterals {
    return ObligationCollaterals.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationCollaterals {
    if (json.$typeName !== ObligationCollaterals.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return ObligationCollaterals.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationCollaterals {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationCollaterals(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ObligationCollaterals object`
      )
    }
    return ObligationCollaterals.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationCollaterals {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationCollaterals(data.bcs.type)) {
        throw new Error(`object at is not a ObligationCollaterals object`)
      }

      return ObligationCollaterals.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationCollaterals.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationCollaterals> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObligationCollaterals object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligationCollaterals(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObligationCollaterals object`)
    }

    return ObligationCollaterals.fromSuiObjectData(res.data)
  }
}
