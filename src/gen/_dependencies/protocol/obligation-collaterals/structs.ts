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

/* ============================== Collateral =============================== */

export function isCollateral(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'obligation_collaterals::Collateral')
    }::obligation_collaterals::Collateral`
}

export interface CollateralFields {
  amount: ToField<'u64'>
}

export type CollateralReified = Reified<Collateral, CollateralFields>

export type CollateralJSONField = {
  amount: string
}

export type CollateralJSON = {
  $typeName: typeof Collateral.$typeName
  $typeArgs: []
} & CollateralJSONField

export class Collateral implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation_collaterals::Collateral` = `${
    getTypeOrigin('protocol', 'obligation_collaterals::Collateral')
  }::obligation_collaterals::Collateral` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Collateral.$typeName = Collateral.$typeName
  readonly $fullTypeName: `${string}::obligation_collaterals::Collateral`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Collateral.$isPhantom = Collateral.$isPhantom

  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollateralFields) {
    this.$fullTypeName = composeSuiType(
      Collateral.$typeName,
      ...typeArgs,
    ) as `${string}::obligation_collaterals::Collateral`
    this.$typeArgs = typeArgs

    this.amount = fields.amount
  }

  static reified(): CollateralReified {
    const reifiedBcs = Collateral.bcs
    return {
      typeName: Collateral.$typeName,
      fullTypeName: composeSuiType(
        Collateral.$typeName,
        ...[],
      ) as `${string}::obligation_collaterals::Collateral`,
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
      fetch: async (client: SupportedSuiClient, id: string) => Collateral.fetch(client, id),
      new: (fields: CollateralFields) => {
        return new Collateral([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollateralReified {
    return Collateral.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Collateral>> {
    return phantom(Collateral.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Collateral>> {
    return Collateral.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Collateral', {
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Collateral.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Collateral.instantiateBcs> {
    if (!Collateral.cachedBcs) {
      Collateral.cachedBcs = Collateral.instantiateBcs()
    }
    return Collateral.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Collateral {
    return Collateral.reified().new({
      amount: decodeFromFields('u64', fields.amount),
    })
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

  toJSONField(): CollateralJSONField {
    return {
      amount: this.amount.toString(),
    }
  }

  toJSON(): CollateralJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Collateral {
    return Collateral.reified().new({
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): Collateral {
    if (json.$typeName !== Collateral.$typeName) {
      throw new Error(
        `not a Collateral json object: expected '${Collateral.$typeName}' but got '${json.$typeName}'`,
      )
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

      return Collateral.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Collateral.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Collateral> {
    const res = await fetchObjectBcs(client, id)
    if (!isCollateral(res.type)) {
      throw new Error(`object at id ${id} is not a Collateral object`)
    }

    return Collateral.fromBcs(res.bcsBytes)
  }
}

/* ============================== ObligationCollaterals =============================== */

export function isObligationCollaterals(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('protocol', 'obligation_collaterals::ObligationCollaterals')
    }::obligation_collaterals::ObligationCollaterals`
}

export interface ObligationCollateralsFields {
  dummyField: ToField<'bool'>
}

export type ObligationCollateralsReified = Reified<
  ObligationCollaterals,
  ObligationCollateralsFields
>

export type ObligationCollateralsJSONField = {
  dummyField: boolean
}

export type ObligationCollateralsJSON = {
  $typeName: typeof ObligationCollaterals.$typeName
  $typeArgs: []
} & ObligationCollateralsJSONField

export class ObligationCollaterals implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation_collaterals::ObligationCollaterals` = `${
    getTypeOrigin('protocol', 'obligation_collaterals::ObligationCollaterals')
  }::obligation_collaterals::ObligationCollaterals` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ObligationCollaterals.$typeName = ObligationCollaterals.$typeName
  readonly $fullTypeName: `${string}::obligation_collaterals::ObligationCollaterals`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ObligationCollaterals.$isPhantom = ObligationCollaterals.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObligationCollateralsFields) {
    this.$fullTypeName = composeSuiType(
      ObligationCollaterals.$typeName,
      ...typeArgs,
    ) as `${string}::obligation_collaterals::ObligationCollaterals`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ObligationCollateralsReified {
    const reifiedBcs = ObligationCollaterals.bcs
    return {
      typeName: ObligationCollaterals.$typeName,
      fullTypeName: composeSuiType(
        ObligationCollaterals.$typeName,
        ...[],
      ) as `${string}::obligation_collaterals::ObligationCollaterals`,
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
      fetch: async (client: SupportedSuiClient, id: string) =>
        ObligationCollaterals.fetch(client, id),
      new: (fields: ObligationCollateralsFields) => {
        return new ObligationCollaterals([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationCollateralsReified {
    return ObligationCollaterals.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationCollaterals>> {
    return phantom(ObligationCollaterals.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ObligationCollaterals>> {
    return ObligationCollaterals.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationCollaterals', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationCollaterals.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ObligationCollaterals.instantiateBcs> {
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

  toJSONField(): ObligationCollateralsJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ObligationCollateralsJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationCollaterals {
    return ObligationCollaterals.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationCollaterals {
    if (json.$typeName !== ObligationCollaterals.$typeName) {
      throw new Error(
        `not a ObligationCollaterals json object: expected '${ObligationCollaterals.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ObligationCollaterals.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationCollaterals {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationCollaterals(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ObligationCollaterals object`,
      )
    }
    return ObligationCollaterals.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationCollaterals {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationCollaterals(data.bcs.type)) {
        throw new Error(`object at is not a ObligationCollaterals object`)
      }

      return ObligationCollaterals.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationCollaterals.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ObligationCollaterals> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligationCollaterals(res.type)) {
      throw new Error(`object at id ${id} is not a ObligationCollaterals object`)
    }

    return ObligationCollaterals.fromBcs(res.bcsBytes)
  }
}
