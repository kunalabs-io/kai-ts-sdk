import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { getTypeOrigin } from '../../../_envs'
import {
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToJSON,
  ToTypeStr,
  ToTypeStr as ToPhantom,
} from '../../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../../_framework/util'
import { Option } from '../../../std/option/structs'
import { TypeName } from '../../../std/type-name/structs'
import { ID, UID } from '../../../sui/object/structs'
import { BalanceBag } from '../../x/balance-bag/structs'
import { Ownership } from '../../x/ownership/structs'
import { WitTable } from '../../x/wit-table/structs'
import { Collateral, ObligationCollaterals } from '../obligation-collaterals/structs'
import { Debt, ObligationDebts } from '../obligation-debts/structs'

/* ============================== Obligation =============================== */

export function isObligation(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('scallop-protocol', 'obligation::Obligation')}::obligation::Obligation`
}

export interface ObligationFields {
  id: ToField<UID>
  balances: ToField<BalanceBag>
  debts: ToField<WitTable<ToPhantom<ObligationDebts>, TypeName, ToPhantom<Debt>>>
  collaterals: ToField<WitTable<ToPhantom<ObligationCollaterals>, TypeName, ToPhantom<Collateral>>>
  rewardsPoint: ToField<'u64'>
  lockKey: ToField<Option<TypeName>>
  borrowLocked: ToField<'bool'>
  repayLocked: ToField<'bool'>
  depositCollateralLocked: ToField<'bool'>
  withdrawCollateralLocked: ToField<'bool'>
  liquidateLocked: ToField<'bool'>
}

export type ObligationReified = Reified<Obligation, ObligationFields>

export type ObligationJSONField = {
  id: string
  balances: ToJSON<BalanceBag>
  debts: ToJSON<WitTable<ToPhantom<ObligationDebts>, TypeName, ToPhantom<Debt>>>
  collaterals: ToJSON<WitTable<ToPhantom<ObligationCollaterals>, TypeName, ToPhantom<Collateral>>>
  rewardsPoint: string
  lockKey: string | null
  borrowLocked: boolean
  repayLocked: boolean
  depositCollateralLocked: boolean
  withdrawCollateralLocked: boolean
  liquidateLocked: boolean
}

export type ObligationJSON = {
  $typeName: typeof Obligation.$typeName
  $typeArgs: []
} & ObligationJSONField

export class Obligation implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation::Obligation` = `${
    getTypeOrigin('scallop-protocol', 'obligation::Obligation')
  }::obligation::Obligation` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Obligation.$typeName = Obligation.$typeName
  readonly $fullTypeName: `${string}::obligation::Obligation`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Obligation.$isPhantom = Obligation.$isPhantom

  readonly id: ToField<UID>
  readonly balances: ToField<BalanceBag>
  readonly debts: ToField<WitTable<ToPhantom<ObligationDebts>, TypeName, ToPhantom<Debt>>>
  readonly collaterals: ToField<
    WitTable<ToPhantom<ObligationCollaterals>, TypeName, ToPhantom<Collateral>>
  >
  readonly rewardsPoint: ToField<'u64'>
  readonly lockKey: ToField<Option<TypeName>>
  readonly borrowLocked: ToField<'bool'>
  readonly repayLocked: ToField<'bool'>
  readonly depositCollateralLocked: ToField<'bool'>
  readonly withdrawCollateralLocked: ToField<'bool'>
  readonly liquidateLocked: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObligationFields) {
    this.$fullTypeName = composeSuiType(
      Obligation.$typeName,
      ...typeArgs,
    ) as `${string}::obligation::Obligation`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.balances = fields.balances
    this.debts = fields.debts
    this.collaterals = fields.collaterals
    this.rewardsPoint = fields.rewardsPoint
    this.lockKey = fields.lockKey
    this.borrowLocked = fields.borrowLocked
    this.repayLocked = fields.repayLocked
    this.depositCollateralLocked = fields.depositCollateralLocked
    this.withdrawCollateralLocked = fields.withdrawCollateralLocked
    this.liquidateLocked = fields.liquidateLocked
  }

  static reified(): ObligationReified {
    const reifiedBcs = Obligation.bcs
    return {
      typeName: Obligation.$typeName,
      fullTypeName: composeSuiType(
        Obligation.$typeName,
        ...[],
      ) as `${string}::obligation::Obligation`,
      typeArgs: [] as [],
      isPhantom: Obligation.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Obligation.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Obligation.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Obligation.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Obligation.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Obligation.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Obligation.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Obligation.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Obligation.fetch(client, id),
      new: (fields: ObligationFields) => {
        return new Obligation([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationReified {
    return Obligation.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Obligation>> {
    return phantom(Obligation.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Obligation>> {
    return Obligation.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Obligation', {
      id: UID.bcs,
      balances: BalanceBag.bcs,
      debts: WitTable.bcs(TypeName.bcs),
      collaterals: WitTable.bcs(TypeName.bcs),
      rewards_point: bcs.u64(),
      lock_key: Option.bcs(TypeName.bcs),
      borrow_locked: bcs.bool(),
      repay_locked: bcs.bool(),
      deposit_collateral_locked: bcs.bool(),
      withdraw_collateral_locked: bcs.bool(),
      liquidate_locked: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Obligation.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Obligation.instantiateBcs> {
    if (!Obligation.cachedBcs) {
      Obligation.cachedBcs = Obligation.instantiateBcs()
    }
    return Obligation.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Obligation {
    return Obligation.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      balances: decodeFromFields(BalanceBag.reified(), fields.balances),
      debts: decodeFromFields(
        WitTable.reified(
          phantom(ObligationDebts.reified()),
          TypeName.reified(),
          phantom(Debt.reified()),
        ),
        fields.debts,
      ),
      collaterals: decodeFromFields(
        WitTable.reified(
          phantom(ObligationCollaterals.reified()),
          TypeName.reified(),
          phantom(Collateral.reified()),
        ),
        fields.collaterals,
      ),
      rewardsPoint: decodeFromFields('u64', fields.rewards_point),
      lockKey: decodeFromFields(Option.reified(TypeName.reified()), fields.lock_key),
      borrowLocked: decodeFromFields('bool', fields.borrow_locked),
      repayLocked: decodeFromFields('bool', fields.repay_locked),
      depositCollateralLocked: decodeFromFields('bool', fields.deposit_collateral_locked),
      withdrawCollateralLocked: decodeFromFields('bool', fields.withdraw_collateral_locked),
      liquidateLocked: decodeFromFields('bool', fields.liquidate_locked),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Obligation {
    if (!isObligation(item.type)) {
      throw new Error('not a Obligation type')
    }

    return Obligation.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      balances: decodeFromFieldsWithTypes(BalanceBag.reified(), item.fields.balances),
      debts: decodeFromFieldsWithTypes(
        WitTable.reified(
          phantom(ObligationDebts.reified()),
          TypeName.reified(),
          phantom(Debt.reified()),
        ),
        item.fields.debts,
      ),
      collaterals: decodeFromFieldsWithTypes(
        WitTable.reified(
          phantom(ObligationCollaterals.reified()),
          TypeName.reified(),
          phantom(Collateral.reified()),
        ),
        item.fields.collaterals,
      ),
      rewardsPoint: decodeFromFieldsWithTypes('u64', item.fields.rewards_point),
      lockKey: decodeFromFieldsWithTypes(Option.reified(TypeName.reified()), item.fields.lock_key),
      borrowLocked: decodeFromFieldsWithTypes('bool', item.fields.borrow_locked),
      repayLocked: decodeFromFieldsWithTypes('bool', item.fields.repay_locked),
      depositCollateralLocked: decodeFromFieldsWithTypes(
        'bool',
        item.fields.deposit_collateral_locked,
      ),
      withdrawCollateralLocked: decodeFromFieldsWithTypes(
        'bool',
        item.fields.withdraw_collateral_locked,
      ),
      liquidateLocked: decodeFromFieldsWithTypes('bool', item.fields.liquidate_locked),
    })
  }

  static fromBcs(data: Uint8Array): Obligation {
    return Obligation.fromFields(Obligation.bcs.parse(data))
  }

  toJSONField(): ObligationJSONField {
    return {
      id: this.id,
      balances: this.balances.toJSONField(),
      debts: this.debts.toJSONField(),
      collaterals: this.collaterals.toJSONField(),
      rewardsPoint: this.rewardsPoint.toString(),
      lockKey: fieldToJSON<Option<TypeName>>(
        `${Option.$typeName}<${TypeName.$typeName}>`,
        this.lockKey,
      ),
      borrowLocked: this.borrowLocked,
      repayLocked: this.repayLocked,
      depositCollateralLocked: this.depositCollateralLocked,
      withdrawCollateralLocked: this.withdrawCollateralLocked,
      liquidateLocked: this.liquidateLocked,
    }
  }

  toJSON(): ObligationJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Obligation {
    return Obligation.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      balances: decodeFromJSONField(BalanceBag.reified(), field.balances),
      debts: decodeFromJSONField(
        WitTable.reified(
          phantom(ObligationDebts.reified()),
          TypeName.reified(),
          phantom(Debt.reified()),
        ),
        field.debts,
      ),
      collaterals: decodeFromJSONField(
        WitTable.reified(
          phantom(ObligationCollaterals.reified()),
          TypeName.reified(),
          phantom(Collateral.reified()),
        ),
        field.collaterals,
      ),
      rewardsPoint: decodeFromJSONField('u64', field.rewardsPoint),
      lockKey: decodeFromJSONField(Option.reified(TypeName.reified()), field.lockKey),
      borrowLocked: decodeFromJSONField('bool', field.borrowLocked),
      repayLocked: decodeFromJSONField('bool', field.repayLocked),
      depositCollateralLocked: decodeFromJSONField('bool', field.depositCollateralLocked),
      withdrawCollateralLocked: decodeFromJSONField('bool', field.withdrawCollateralLocked),
      liquidateLocked: decodeFromJSONField('bool', field.liquidateLocked),
    })
  }

  static fromJSON(json: Record<string, any>): Obligation {
    if (json.$typeName !== Obligation.$typeName) {
      throw new Error(
        `not a Obligation json object: expected '${Obligation.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Obligation.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Obligation {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligation(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Obligation object`)
    }
    return Obligation.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Obligation {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligation(data.bcs.type)) {
        throw new Error(`object at is not a Obligation object`)
      }

      return Obligation.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Obligation.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Obligation> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligation(res.type)) {
      throw new Error(`object at id ${id} is not a Obligation object`)
    }

    return Obligation.fromBcs(res.bcsBytes)
  }
}

/* ============================== ObligationOwnership =============================== */

export function isObligationOwnership(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'obligation::ObligationOwnership')
    }::obligation::ObligationOwnership`
}

export interface ObligationOwnershipFields {
  dummyField: ToField<'bool'>
}

export type ObligationOwnershipReified = Reified<ObligationOwnership, ObligationOwnershipFields>

export type ObligationOwnershipJSONField = {
  dummyField: boolean
}

export type ObligationOwnershipJSON = {
  $typeName: typeof ObligationOwnership.$typeName
  $typeArgs: []
} & ObligationOwnershipJSONField

export class ObligationOwnership implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation::ObligationOwnership` = `${
    getTypeOrigin('scallop-protocol', 'obligation::ObligationOwnership')
  }::obligation::ObligationOwnership` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ObligationOwnership.$typeName = ObligationOwnership.$typeName
  readonly $fullTypeName: `${string}::obligation::ObligationOwnership`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ObligationOwnership.$isPhantom = ObligationOwnership.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObligationOwnershipFields) {
    this.$fullTypeName = composeSuiType(
      ObligationOwnership.$typeName,
      ...typeArgs,
    ) as `${string}::obligation::ObligationOwnership`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ObligationOwnershipReified {
    const reifiedBcs = ObligationOwnership.bcs
    return {
      typeName: ObligationOwnership.$typeName,
      fullTypeName: composeSuiType(
        ObligationOwnership.$typeName,
        ...[],
      ) as `${string}::obligation::ObligationOwnership`,
      typeArgs: [] as [],
      isPhantom: ObligationOwnership.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationOwnership.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationOwnership.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationOwnership.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationOwnership.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationOwnership.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationOwnership.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationOwnership.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        ObligationOwnership.fetch(client, id),
      new: (fields: ObligationOwnershipFields) => {
        return new ObligationOwnership([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationOwnershipReified {
    return ObligationOwnership.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationOwnership>> {
    return phantom(ObligationOwnership.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ObligationOwnership>> {
    return ObligationOwnership.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationOwnership', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationOwnership.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ObligationOwnership.instantiateBcs> {
    if (!ObligationOwnership.cachedBcs) {
      ObligationOwnership.cachedBcs = ObligationOwnership.instantiateBcs()
    }
    return ObligationOwnership.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationOwnership {
    return ObligationOwnership.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationOwnership {
    if (!isObligationOwnership(item.type)) {
      throw new Error('not a ObligationOwnership type')
    }

    return ObligationOwnership.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): ObligationOwnership {
    return ObligationOwnership.fromFields(ObligationOwnership.bcs.parse(data))
  }

  toJSONField(): ObligationOwnershipJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): ObligationOwnershipJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationOwnership {
    return ObligationOwnership.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationOwnership {
    if (json.$typeName !== ObligationOwnership.$typeName) {
      throw new Error(
        `not a ObligationOwnership json object: expected '${ObligationOwnership.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ObligationOwnership.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationOwnership {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationOwnership(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ObligationOwnership object`)
    }
    return ObligationOwnership.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationOwnership {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationOwnership(data.bcs.type)) {
        throw new Error(`object at is not a ObligationOwnership object`)
      }

      return ObligationOwnership.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationOwnership.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ObligationOwnership> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligationOwnership(res.type)) {
      throw new Error(`object at id ${id} is not a ObligationOwnership object`)
    }

    return ObligationOwnership.fromBcs(res.bcsBytes)
  }
}

/* ============================== ObligationKey =============================== */

export function isObligationKey(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'obligation::ObligationKey')
    }::obligation::ObligationKey`
}

export interface ObligationKeyFields {
  id: ToField<UID>
  ownership: ToField<Ownership<ToPhantom<ObligationOwnership>>>
}

export type ObligationKeyReified = Reified<ObligationKey, ObligationKeyFields>

export type ObligationKeyJSONField = {
  id: string
  ownership: ToJSON<Ownership<ToPhantom<ObligationOwnership>>>
}

export type ObligationKeyJSON = {
  $typeName: typeof ObligationKey.$typeName
  $typeArgs: []
} & ObligationKeyJSONField

export class ObligationKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation::ObligationKey` = `${
    getTypeOrigin('scallop-protocol', 'obligation::ObligationKey')
  }::obligation::ObligationKey` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ObligationKey.$typeName = ObligationKey.$typeName
  readonly $fullTypeName: `${string}::obligation::ObligationKey`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ObligationKey.$isPhantom = ObligationKey.$isPhantom

  readonly id: ToField<UID>
  readonly ownership: ToField<Ownership<ToPhantom<ObligationOwnership>>>

  private constructor(typeArgs: [], fields: ObligationKeyFields) {
    this.$fullTypeName = composeSuiType(
      ObligationKey.$typeName,
      ...typeArgs,
    ) as `${string}::obligation::ObligationKey`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.ownership = fields.ownership
  }

  static reified(): ObligationKeyReified {
    const reifiedBcs = ObligationKey.bcs
    return {
      typeName: ObligationKey.$typeName,
      fullTypeName: composeSuiType(
        ObligationKey.$typeName,
        ...[],
      ) as `${string}::obligation::ObligationKey`,
      typeArgs: [] as [],
      isPhantom: ObligationKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationKey.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationKey.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => ObligationKey.fetch(client, id),
      new: (fields: ObligationKeyFields) => {
        return new ObligationKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationKeyReified {
    return ObligationKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationKey>> {
    return phantom(ObligationKey.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ObligationKey>> {
    return ObligationKey.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationKey', {
      id: UID.bcs,
      ownership: Ownership.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationKey.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ObligationKey.instantiateBcs> {
    if (!ObligationKey.cachedBcs) {
      ObligationKey.cachedBcs = ObligationKey.instantiateBcs()
    }
    return ObligationKey.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationKey {
    return ObligationKey.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      ownership: decodeFromFields(
        Ownership.reified(phantom(ObligationOwnership.reified())),
        fields.ownership,
      ),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationKey {
    if (!isObligationKey(item.type)) {
      throw new Error('not a ObligationKey type')
    }

    return ObligationKey.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      ownership: decodeFromFieldsWithTypes(
        Ownership.reified(phantom(ObligationOwnership.reified())),
        item.fields.ownership,
      ),
    })
  }

  static fromBcs(data: Uint8Array): ObligationKey {
    return ObligationKey.fromFields(ObligationKey.bcs.parse(data))
  }

  toJSONField(): ObligationKeyJSONField {
    return {
      id: this.id,
      ownership: this.ownership.toJSONField(),
    }
  }

  toJSON(): ObligationKeyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationKey {
    return ObligationKey.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      ownership: decodeFromJSONField(
        Ownership.reified(phantom(ObligationOwnership.reified())),
        field.ownership,
      ),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationKey {
    if (json.$typeName !== ObligationKey.$typeName) {
      throw new Error(
        `not a ObligationKey json object: expected '${ObligationKey.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ObligationKey.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationKey {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationKey(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ObligationKey object`)
    }
    return ObligationKey.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationKey {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationKey(data.bcs.type)) {
        throw new Error(`object at is not a ObligationKey object`)
      }

      return ObligationKey.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ObligationKey> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligationKey(res.type)) {
      throw new Error(`object at id ${id} is not a ObligationKey object`)
    }

    return ObligationKey.fromBcs(res.bcsBytes)
  }
}

/* ============================== ObligationRewardsPointRedeemed =============================== */

export function isObligationRewardsPointRedeemed(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'obligation::ObligationRewardsPointRedeemed')
    }::obligation::ObligationRewardsPointRedeemed`
}

export interface ObligationRewardsPointRedeemedFields {
  obligation: ToField<ID>
  witness: ToField<TypeName>
  amount: ToField<'u64'>
}

export type ObligationRewardsPointRedeemedReified = Reified<
  ObligationRewardsPointRedeemed,
  ObligationRewardsPointRedeemedFields
>

export type ObligationRewardsPointRedeemedJSONField = {
  obligation: string
  witness: string
  amount: string
}

export type ObligationRewardsPointRedeemedJSON = {
  $typeName: typeof ObligationRewardsPointRedeemed.$typeName
  $typeArgs: []
} & ObligationRewardsPointRedeemedJSONField

export class ObligationRewardsPointRedeemed implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation::ObligationRewardsPointRedeemed` = `${
    getTypeOrigin('scallop-protocol', 'obligation::ObligationRewardsPointRedeemed')
  }::obligation::ObligationRewardsPointRedeemed` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ObligationRewardsPointRedeemed.$typeName =
    ObligationRewardsPointRedeemed.$typeName
  readonly $fullTypeName: `${string}::obligation::ObligationRewardsPointRedeemed`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ObligationRewardsPointRedeemed.$isPhantom =
    ObligationRewardsPointRedeemed.$isPhantom

  readonly obligation: ToField<ID>
  readonly witness: ToField<TypeName>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: ObligationRewardsPointRedeemedFields) {
    this.$fullTypeName = composeSuiType(
      ObligationRewardsPointRedeemed.$typeName,
      ...typeArgs,
    ) as `${string}::obligation::ObligationRewardsPointRedeemed`
    this.$typeArgs = typeArgs

    this.obligation = fields.obligation
    this.witness = fields.witness
    this.amount = fields.amount
  }

  static reified(): ObligationRewardsPointRedeemedReified {
    const reifiedBcs = ObligationRewardsPointRedeemed.bcs
    return {
      typeName: ObligationRewardsPointRedeemed.$typeName,
      fullTypeName: composeSuiType(
        ObligationRewardsPointRedeemed.$typeName,
        ...[],
      ) as `${string}::obligation::ObligationRewardsPointRedeemed`,
      typeArgs: [] as [],
      isPhantom: ObligationRewardsPointRedeemed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        ObligationRewardsPointRedeemed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ObligationRewardsPointRedeemed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) =>
        ObligationRewardsPointRedeemed.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationRewardsPointRedeemed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationRewardsPointRedeemed.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ObligationRewardsPointRedeemed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ObligationRewardsPointRedeemed.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) =>
        ObligationRewardsPointRedeemed.fetch(client, id),
      new: (fields: ObligationRewardsPointRedeemedFields) => {
        return new ObligationRewardsPointRedeemed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationRewardsPointRedeemedReified {
    return ObligationRewardsPointRedeemed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationRewardsPointRedeemed>> {
    return phantom(ObligationRewardsPointRedeemed.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ObligationRewardsPointRedeemed>> {
    return ObligationRewardsPointRedeemed.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationRewardsPointRedeemed', {
      obligation: ID.bcs,
      witness: TypeName.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs:
    | ReturnType<typeof ObligationRewardsPointRedeemed.instantiateBcs>
    | null = null

  static get bcs(): ReturnType<typeof ObligationRewardsPointRedeemed.instantiateBcs> {
    if (!ObligationRewardsPointRedeemed.cachedBcs) {
      ObligationRewardsPointRedeemed.cachedBcs = ObligationRewardsPointRedeemed.instantiateBcs()
    }
    return ObligationRewardsPointRedeemed.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationRewardsPointRedeemed {
    return ObligationRewardsPointRedeemed.reified().new({
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      witness: decodeFromFields(TypeName.reified(), fields.witness),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationRewardsPointRedeemed {
    if (!isObligationRewardsPointRedeemed(item.type)) {
      throw new Error('not a ObligationRewardsPointRedeemed type')
    }

    return ObligationRewardsPointRedeemed.reified().new({
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      witness: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.witness),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): ObligationRewardsPointRedeemed {
    return ObligationRewardsPointRedeemed.fromFields(ObligationRewardsPointRedeemed.bcs.parse(data))
  }

  toJSONField(): ObligationRewardsPointRedeemedJSONField {
    return {
      obligation: this.obligation,
      witness: this.witness,
      amount: this.amount.toString(),
    }
  }

  toJSON(): ObligationRewardsPointRedeemedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationRewardsPointRedeemed {
    return ObligationRewardsPointRedeemed.reified().new({
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      witness: decodeFromJSONField(TypeName.reified(), field.witness),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationRewardsPointRedeemed {
    if (json.$typeName !== ObligationRewardsPointRedeemed.$typeName) {
      throw new Error(
        `not a ObligationRewardsPointRedeemed json object: expected '${ObligationRewardsPointRedeemed.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ObligationRewardsPointRedeemed.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationRewardsPointRedeemed {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationRewardsPointRedeemed(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ObligationRewardsPointRedeemed object`,
      )
    }
    return ObligationRewardsPointRedeemed.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationRewardsPointRedeemed {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationRewardsPointRedeemed(data.bcs.type)) {
        throw new Error(`object at is not a ObligationRewardsPointRedeemed object`)
      }

      return ObligationRewardsPointRedeemed.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationRewardsPointRedeemed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(
    client: SupportedSuiClient,
    id: string,
  ): Promise<ObligationRewardsPointRedeemed> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligationRewardsPointRedeemed(res.type)) {
      throw new Error(`object at id ${id} is not a ObligationRewardsPointRedeemed object`)
    }

    return ObligationRewardsPointRedeemed.fromBcs(res.bcsBytes)
  }
}

/* ============================== ObligationLocked =============================== */

export function isObligationLocked(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'obligation::ObligationLocked')
    }::obligation::ObligationLocked`
}

export interface ObligationLockedFields {
  obligation: ToField<ID>
  witness: ToField<TypeName>
  borrowLocked: ToField<'bool'>
  repayLocked: ToField<'bool'>
  depositCollateralLocked: ToField<'bool'>
  withdrawCollateralLocked: ToField<'bool'>
  liquidateLocked: ToField<'bool'>
}

export type ObligationLockedReified = Reified<ObligationLocked, ObligationLockedFields>

export type ObligationLockedJSONField = {
  obligation: string
  witness: string
  borrowLocked: boolean
  repayLocked: boolean
  depositCollateralLocked: boolean
  withdrawCollateralLocked: boolean
  liquidateLocked: boolean
}

export type ObligationLockedJSON = {
  $typeName: typeof ObligationLocked.$typeName
  $typeArgs: []
} & ObligationLockedJSONField

export class ObligationLocked implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation::ObligationLocked` = `${
    getTypeOrigin('scallop-protocol', 'obligation::ObligationLocked')
  }::obligation::ObligationLocked` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ObligationLocked.$typeName = ObligationLocked.$typeName
  readonly $fullTypeName: `${string}::obligation::ObligationLocked`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ObligationLocked.$isPhantom = ObligationLocked.$isPhantom

  readonly obligation: ToField<ID>
  readonly witness: ToField<TypeName>
  readonly borrowLocked: ToField<'bool'>
  readonly repayLocked: ToField<'bool'>
  readonly depositCollateralLocked: ToField<'bool'>
  readonly withdrawCollateralLocked: ToField<'bool'>
  readonly liquidateLocked: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObligationLockedFields) {
    this.$fullTypeName = composeSuiType(
      ObligationLocked.$typeName,
      ...typeArgs,
    ) as `${string}::obligation::ObligationLocked`
    this.$typeArgs = typeArgs

    this.obligation = fields.obligation
    this.witness = fields.witness
    this.borrowLocked = fields.borrowLocked
    this.repayLocked = fields.repayLocked
    this.depositCollateralLocked = fields.depositCollateralLocked
    this.withdrawCollateralLocked = fields.withdrawCollateralLocked
    this.liquidateLocked = fields.liquidateLocked
  }

  static reified(): ObligationLockedReified {
    const reifiedBcs = ObligationLocked.bcs
    return {
      typeName: ObligationLocked.$typeName,
      fullTypeName: composeSuiType(
        ObligationLocked.$typeName,
        ...[],
      ) as `${string}::obligation::ObligationLocked`,
      typeArgs: [] as [],
      isPhantom: ObligationLocked.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationLocked.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationLocked.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationLocked.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationLocked.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationLocked.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationLocked.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationLocked.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => ObligationLocked.fetch(client, id),
      new: (fields: ObligationLockedFields) => {
        return new ObligationLocked([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationLockedReified {
    return ObligationLocked.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationLocked>> {
    return phantom(ObligationLocked.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ObligationLocked>> {
    return ObligationLocked.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationLocked', {
      obligation: ID.bcs,
      witness: TypeName.bcs,
      borrow_locked: bcs.bool(),
      repay_locked: bcs.bool(),
      deposit_collateral_locked: bcs.bool(),
      withdraw_collateral_locked: bcs.bool(),
      liquidate_locked: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationLocked.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ObligationLocked.instantiateBcs> {
    if (!ObligationLocked.cachedBcs) {
      ObligationLocked.cachedBcs = ObligationLocked.instantiateBcs()
    }
    return ObligationLocked.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationLocked {
    return ObligationLocked.reified().new({
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      witness: decodeFromFields(TypeName.reified(), fields.witness),
      borrowLocked: decodeFromFields('bool', fields.borrow_locked),
      repayLocked: decodeFromFields('bool', fields.repay_locked),
      depositCollateralLocked: decodeFromFields('bool', fields.deposit_collateral_locked),
      withdrawCollateralLocked: decodeFromFields('bool', fields.withdraw_collateral_locked),
      liquidateLocked: decodeFromFields('bool', fields.liquidate_locked),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationLocked {
    if (!isObligationLocked(item.type)) {
      throw new Error('not a ObligationLocked type')
    }

    return ObligationLocked.reified().new({
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      witness: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.witness),
      borrowLocked: decodeFromFieldsWithTypes('bool', item.fields.borrow_locked),
      repayLocked: decodeFromFieldsWithTypes('bool', item.fields.repay_locked),
      depositCollateralLocked: decodeFromFieldsWithTypes(
        'bool',
        item.fields.deposit_collateral_locked,
      ),
      withdrawCollateralLocked: decodeFromFieldsWithTypes(
        'bool',
        item.fields.withdraw_collateral_locked,
      ),
      liquidateLocked: decodeFromFieldsWithTypes('bool', item.fields.liquidate_locked),
    })
  }

  static fromBcs(data: Uint8Array): ObligationLocked {
    return ObligationLocked.fromFields(ObligationLocked.bcs.parse(data))
  }

  toJSONField(): ObligationLockedJSONField {
    return {
      obligation: this.obligation,
      witness: this.witness,
      borrowLocked: this.borrowLocked,
      repayLocked: this.repayLocked,
      depositCollateralLocked: this.depositCollateralLocked,
      withdrawCollateralLocked: this.withdrawCollateralLocked,
      liquidateLocked: this.liquidateLocked,
    }
  }

  toJSON(): ObligationLockedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationLocked {
    return ObligationLocked.reified().new({
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      witness: decodeFromJSONField(TypeName.reified(), field.witness),
      borrowLocked: decodeFromJSONField('bool', field.borrowLocked),
      repayLocked: decodeFromJSONField('bool', field.repayLocked),
      depositCollateralLocked: decodeFromJSONField('bool', field.depositCollateralLocked),
      withdrawCollateralLocked: decodeFromJSONField('bool', field.withdrawCollateralLocked),
      liquidateLocked: decodeFromJSONField('bool', field.liquidateLocked),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationLocked {
    if (json.$typeName !== ObligationLocked.$typeName) {
      throw new Error(
        `not a ObligationLocked json object: expected '${ObligationLocked.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ObligationLocked.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationLocked {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationLocked(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ObligationLocked object`)
    }
    return ObligationLocked.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationLocked {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationLocked(data.bcs.type)) {
        throw new Error(`object at is not a ObligationLocked object`)
      }

      return ObligationLocked.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationLocked.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ObligationLocked> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligationLocked(res.type)) {
      throw new Error(`object at id ${id} is not a ObligationLocked object`)
    }

    return ObligationLocked.fromBcs(res.bcsBytes)
  }
}

/* ============================== ObligationUnlocked =============================== */

export function isObligationUnlocked(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('scallop-protocol', 'obligation::ObligationUnlocked')
    }::obligation::ObligationUnlocked`
}

export interface ObligationUnlockedFields {
  obligation: ToField<ID>
  witness: ToField<TypeName>
}

export type ObligationUnlockedReified = Reified<ObligationUnlocked, ObligationUnlockedFields>

export type ObligationUnlockedJSONField = {
  obligation: string
  witness: string
}

export type ObligationUnlockedJSON = {
  $typeName: typeof ObligationUnlocked.$typeName
  $typeArgs: []
} & ObligationUnlockedJSONField

export class ObligationUnlocked implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::obligation::ObligationUnlocked` = `${
    getTypeOrigin('scallop-protocol', 'obligation::ObligationUnlocked')
  }::obligation::ObligationUnlocked` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ObligationUnlocked.$typeName = ObligationUnlocked.$typeName
  readonly $fullTypeName: `${string}::obligation::ObligationUnlocked`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ObligationUnlocked.$isPhantom = ObligationUnlocked.$isPhantom

  readonly obligation: ToField<ID>
  readonly witness: ToField<TypeName>

  private constructor(typeArgs: [], fields: ObligationUnlockedFields) {
    this.$fullTypeName = composeSuiType(
      ObligationUnlocked.$typeName,
      ...typeArgs,
    ) as `${string}::obligation::ObligationUnlocked`
    this.$typeArgs = typeArgs

    this.obligation = fields.obligation
    this.witness = fields.witness
  }

  static reified(): ObligationUnlockedReified {
    const reifiedBcs = ObligationUnlocked.bcs
    return {
      typeName: ObligationUnlocked.$typeName,
      fullTypeName: composeSuiType(
        ObligationUnlocked.$typeName,
        ...[],
      ) as `${string}::obligation::ObligationUnlocked`,
      typeArgs: [] as [],
      isPhantom: ObligationUnlocked.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationUnlocked.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationUnlocked.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationUnlocked.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ObligationUnlocked.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationUnlocked.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationUnlocked.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationUnlocked.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => ObligationUnlocked.fetch(client, id),
      new: (fields: ObligationUnlockedFields) => {
        return new ObligationUnlocked([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ObligationUnlockedReified {
    return ObligationUnlocked.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationUnlocked>> {
    return phantom(ObligationUnlocked.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ObligationUnlocked>> {
    return ObligationUnlocked.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ObligationUnlocked', {
      obligation: ID.bcs,
      witness: TypeName.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ObligationUnlocked.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ObligationUnlocked.instantiateBcs> {
    if (!ObligationUnlocked.cachedBcs) {
      ObligationUnlocked.cachedBcs = ObligationUnlocked.instantiateBcs()
    }
    return ObligationUnlocked.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ObligationUnlocked {
    return ObligationUnlocked.reified().new({
      obligation: decodeFromFields(ID.reified(), fields.obligation),
      witness: decodeFromFields(TypeName.reified(), fields.witness),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ObligationUnlocked {
    if (!isObligationUnlocked(item.type)) {
      throw new Error('not a ObligationUnlocked type')
    }

    return ObligationUnlocked.reified().new({
      obligation: decodeFromFieldsWithTypes(ID.reified(), item.fields.obligation),
      witness: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.witness),
    })
  }

  static fromBcs(data: Uint8Array): ObligationUnlocked {
    return ObligationUnlocked.fromFields(ObligationUnlocked.bcs.parse(data))
  }

  toJSONField(): ObligationUnlockedJSONField {
    return {
      obligation: this.obligation,
      witness: this.witness,
    }
  }

  toJSON(): ObligationUnlockedJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationUnlocked {
    return ObligationUnlocked.reified().new({
      obligation: decodeFromJSONField(ID.reified(), field.obligation),
      witness: decodeFromJSONField(TypeName.reified(), field.witness),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationUnlocked {
    if (json.$typeName !== ObligationUnlocked.$typeName) {
      throw new Error(
        `not a ObligationUnlocked json object: expected '${ObligationUnlocked.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ObligationUnlocked.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationUnlocked {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationUnlocked(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ObligationUnlocked object`)
    }
    return ObligationUnlocked.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationUnlocked {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationUnlocked(data.bcs.type)) {
        throw new Error(`object at is not a ObligationUnlocked object`)
      }

      return ObligationUnlocked.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationUnlocked.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<ObligationUnlocked> {
    const res = await fetchObjectBcs(client, id)
    if (!isObligationUnlocked(res.type)) {
      throw new Error(`object at id ${id} is not a ObligationUnlocked object`)
    }

    return ObligationUnlocked.fromBcs(res.bcsBytes)
  }
}
