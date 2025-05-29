import * as reified from '../../../../_framework/reified'
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  fieldToJSON,
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { Option } from '../../../../move-stdlib/option/structs'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { ID, UID } from '../../../../sui/object/structs'
import { BalanceBag } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/balance-bag/structs'
import { Ownership } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/ownership/structs'
import { WitTable } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/wit-table/structs'
import { PKG_V1 } from '../index'
import { Collateral, ObligationCollaterals } from '../obligation-collaterals/structs'
import { Debt, ObligationDebts } from '../obligation-debts/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Obligation =============================== */

export function isObligation(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation::Obligation`
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

export class Obligation implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation::Obligation`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Obligation.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation::Obligation`
  readonly $typeArgs: []
  readonly $isPhantom = Obligation.$isPhantom

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
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation::Obligation`
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
    return {
      typeName: Obligation.$typeName,
      fullTypeName: composeSuiType(
        Obligation.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation::Obligation`,
      typeArgs: [] as [],
      isPhantom: Obligation.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Obligation.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Obligation.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Obligation.fromBcs(data),
      bcs: Obligation.bcs,
      fromJSONField: (field: any) => Obligation.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Obligation.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Obligation.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Obligation.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Obligation.fetch(client, id),
      new: (fields: ObligationFields) => {
        return new Obligation([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Obligation.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Obligation>> {
    return phantom(Obligation.reified())
  }
  static get p() {
    return Obligation.phantom()
  }

  static get bcs() {
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

  static fromFields(fields: Record<string, any>): Obligation {
    return Obligation.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      balances: decodeFromFields(BalanceBag.reified(), fields.balances),
      debts: decodeFromFields(
        WitTable.reified(
          reified.phantom(ObligationDebts.reified()),
          TypeName.reified(),
          reified.phantom(Debt.reified())
        ),
        fields.debts
      ),
      collaterals: decodeFromFields(
        WitTable.reified(
          reified.phantom(ObligationCollaterals.reified()),
          TypeName.reified(),
          reified.phantom(Collateral.reified())
        ),
        fields.collaterals
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
          reified.phantom(ObligationDebts.reified()),
          TypeName.reified(),
          reified.phantom(Debt.reified())
        ),
        item.fields.debts
      ),
      collaterals: decodeFromFieldsWithTypes(
        WitTable.reified(
          reified.phantom(ObligationCollaterals.reified()),
          TypeName.reified(),
          reified.phantom(Collateral.reified())
        ),
        item.fields.collaterals
      ),
      rewardsPoint: decodeFromFieldsWithTypes('u64', item.fields.rewards_point),
      lockKey: decodeFromFieldsWithTypes(Option.reified(TypeName.reified()), item.fields.lock_key),
      borrowLocked: decodeFromFieldsWithTypes('bool', item.fields.borrow_locked),
      repayLocked: decodeFromFieldsWithTypes('bool', item.fields.repay_locked),
      depositCollateralLocked: decodeFromFieldsWithTypes(
        'bool',
        item.fields.deposit_collateral_locked
      ),
      withdrawCollateralLocked: decodeFromFieldsWithTypes(
        'bool',
        item.fields.withdraw_collateral_locked
      ),
      liquidateLocked: decodeFromFieldsWithTypes('bool', item.fields.liquidate_locked),
    })
  }

  static fromBcs(data: Uint8Array): Obligation {
    return Obligation.fromFields(Obligation.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      balances: this.balances.toJSONField(),
      debts: this.debts.toJSONField(),
      collaterals: this.collaterals.toJSONField(),
      rewardsPoint: this.rewardsPoint.toString(),
      lockKey: fieldToJSON<Option<TypeName>>(
        `${Option.$typeName}<${TypeName.$typeName}>`,
        this.lockKey
      ),
      borrowLocked: this.borrowLocked,
      repayLocked: this.repayLocked,
      depositCollateralLocked: this.depositCollateralLocked,
      withdrawCollateralLocked: this.withdrawCollateralLocked,
      liquidateLocked: this.liquidateLocked,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Obligation {
    return Obligation.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      balances: decodeFromJSONField(BalanceBag.reified(), field.balances),
      debts: decodeFromJSONField(
        WitTable.reified(
          reified.phantom(ObligationDebts.reified()),
          TypeName.reified(),
          reified.phantom(Debt.reified())
        ),
        field.debts
      ),
      collaterals: decodeFromJSONField(
        WitTable.reified(
          reified.phantom(ObligationCollaterals.reified()),
          TypeName.reified(),
          reified.phantom(Collateral.reified())
        ),
        field.collaterals
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
      throw new Error('not a WithTwoGenerics json object')
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

      return Obligation.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Obligation.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Obligation> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Obligation object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligation(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Obligation object`)
    }

    return Obligation.fromSuiObjectData(res.data)
  }
}

/* ============================== ObligationOwnership =============================== */

export function isObligationOwnership(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation::ObligationOwnership`
}

export interface ObligationOwnershipFields {
  dummyField: ToField<'bool'>
}

export type ObligationOwnershipReified = Reified<ObligationOwnership, ObligationOwnershipFields>

export class ObligationOwnership implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation::ObligationOwnership`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationOwnership.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation::ObligationOwnership`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationOwnership.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: ObligationOwnershipFields) {
    this.$fullTypeName = composeSuiType(
      ObligationOwnership.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation::ObligationOwnership`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): ObligationOwnershipReified {
    return {
      typeName: ObligationOwnership.$typeName,
      fullTypeName: composeSuiType(
        ObligationOwnership.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation::ObligationOwnership`,
      typeArgs: [] as [],
      isPhantom: ObligationOwnership.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationOwnership.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationOwnership.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationOwnership.fromBcs(data),
      bcs: ObligationOwnership.bcs,
      fromJSONField: (field: any) => ObligationOwnership.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationOwnership.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationOwnership.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationOwnership.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObligationOwnership.fetch(client, id),
      new: (fields: ObligationOwnershipFields) => {
        return new ObligationOwnership([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationOwnership.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationOwnership>> {
    return phantom(ObligationOwnership.reified())
  }
  static get p() {
    return ObligationOwnership.phantom()
  }

  static get bcs() {
    return bcs.struct('ObligationOwnership', {
      dummy_field: bcs.bool(),
    })
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

  toJSONField() {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationOwnership {
    return ObligationOwnership.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationOwnership {
    if (json.$typeName !== ObligationOwnership.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return ObligationOwnership.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationOwnership.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationOwnership> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObligationOwnership object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligationOwnership(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObligationOwnership object`)
    }

    return ObligationOwnership.fromSuiObjectData(res.data)
  }
}

/* ============================== ObligationKey =============================== */

export function isObligationKey(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation::ObligationKey`
}

export interface ObligationKeyFields {
  id: ToField<UID>
  ownership: ToField<Ownership<ToPhantom<ObligationOwnership>>>
}

export type ObligationKeyReified = Reified<ObligationKey, ObligationKeyFields>

export class ObligationKey implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation::ObligationKey`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationKey.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation::ObligationKey`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationKey.$isPhantom

  readonly id: ToField<UID>
  readonly ownership: ToField<Ownership<ToPhantom<ObligationOwnership>>>

  private constructor(typeArgs: [], fields: ObligationKeyFields) {
    this.$fullTypeName = composeSuiType(
      ObligationKey.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation::ObligationKey`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.ownership = fields.ownership
  }

  static reified(): ObligationKeyReified {
    return {
      typeName: ObligationKey.$typeName,
      fullTypeName: composeSuiType(
        ObligationKey.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation::ObligationKey`,
      typeArgs: [] as [],
      isPhantom: ObligationKey.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationKey.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationKey.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationKey.fromBcs(data),
      bcs: ObligationKey.bcs,
      fromJSONField: (field: any) => ObligationKey.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationKey.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationKey.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationKey.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObligationKey.fetch(client, id),
      new: (fields: ObligationKeyFields) => {
        return new ObligationKey([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationKey.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationKey>> {
    return phantom(ObligationKey.reified())
  }
  static get p() {
    return ObligationKey.phantom()
  }

  static get bcs() {
    return bcs.struct('ObligationKey', {
      id: UID.bcs,
      ownership: Ownership.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): ObligationKey {
    return ObligationKey.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      ownership: decodeFromFields(
        Ownership.reified(reified.phantom(ObligationOwnership.reified())),
        fields.ownership
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
        Ownership.reified(reified.phantom(ObligationOwnership.reified())),
        item.fields.ownership
      ),
    })
  }

  static fromBcs(data: Uint8Array): ObligationKey {
    return ObligationKey.fromFields(ObligationKey.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      ownership: this.ownership.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ObligationKey {
    return ObligationKey.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      ownership: decodeFromJSONField(
        Ownership.reified(reified.phantom(ObligationOwnership.reified())),
        field.ownership
      ),
    })
  }

  static fromJSON(json: Record<string, any>): ObligationKey {
    if (json.$typeName !== ObligationKey.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return ObligationKey.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationKey.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationKey> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObligationKey object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligationKey(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObligationKey object`)
    }

    return ObligationKey.fromSuiObjectData(res.data)
  }
}

/* ============================== ObligationRewardsPointRedeemed =============================== */

export function isObligationRewardsPointRedeemed(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation::ObligationRewardsPointRedeemed`
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

export class ObligationRewardsPointRedeemed implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation::ObligationRewardsPointRedeemed`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationRewardsPointRedeemed.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation::ObligationRewardsPointRedeemed`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationRewardsPointRedeemed.$isPhantom

  readonly obligation: ToField<ID>
  readonly witness: ToField<TypeName>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: ObligationRewardsPointRedeemedFields) {
    this.$fullTypeName = composeSuiType(
      ObligationRewardsPointRedeemed.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation::ObligationRewardsPointRedeemed`
    this.$typeArgs = typeArgs

    this.obligation = fields.obligation
    this.witness = fields.witness
    this.amount = fields.amount
  }

  static reified(): ObligationRewardsPointRedeemedReified {
    return {
      typeName: ObligationRewardsPointRedeemed.$typeName,
      fullTypeName: composeSuiType(
        ObligationRewardsPointRedeemed.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation::ObligationRewardsPointRedeemed`,
      typeArgs: [] as [],
      isPhantom: ObligationRewardsPointRedeemed.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        ObligationRewardsPointRedeemed.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ObligationRewardsPointRedeemed.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationRewardsPointRedeemed.fromBcs(data),
      bcs: ObligationRewardsPointRedeemed.bcs,
      fromJSONField: (field: any) => ObligationRewardsPointRedeemed.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationRewardsPointRedeemed.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ObligationRewardsPointRedeemed.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ObligationRewardsPointRedeemed.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        ObligationRewardsPointRedeemed.fetch(client, id),
      new: (fields: ObligationRewardsPointRedeemedFields) => {
        return new ObligationRewardsPointRedeemed([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationRewardsPointRedeemed.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationRewardsPointRedeemed>> {
    return phantom(ObligationRewardsPointRedeemed.reified())
  }
  static get p() {
    return ObligationRewardsPointRedeemed.phantom()
  }

  static get bcs() {
    return bcs.struct('ObligationRewardsPointRedeemed', {
      obligation: ID.bcs,
      witness: TypeName.bcs,
      amount: bcs.u64(),
    })
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

  toJSONField() {
    return {
      obligation: this.obligation,
      witness: this.witness.toJSONField(),
      amount: this.amount.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return ObligationRewardsPointRedeemed.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): ObligationRewardsPointRedeemed {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isObligationRewardsPointRedeemed(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ObligationRewardsPointRedeemed object`
      )
    }
    return ObligationRewardsPointRedeemed.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): ObligationRewardsPointRedeemed {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isObligationRewardsPointRedeemed(data.bcs.type)) {
        throw new Error(`object at is not a ObligationRewardsPointRedeemed object`)
      }

      return ObligationRewardsPointRedeemed.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationRewardsPointRedeemed.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationRewardsPointRedeemed> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(
        `error fetching ObligationRewardsPointRedeemed object at id ${id}: ${res.error.code}`
      )
    }
    if (
      res.data?.bcs?.dataType !== 'moveObject' ||
      !isObligationRewardsPointRedeemed(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ObligationRewardsPointRedeemed object`)
    }

    return ObligationRewardsPointRedeemed.fromSuiObjectData(res.data)
  }
}

/* ============================== ObligationLocked =============================== */

export function isObligationLocked(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation::ObligationLocked`
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

export class ObligationLocked implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation::ObligationLocked`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationLocked.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation::ObligationLocked`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationLocked.$isPhantom

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
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation::ObligationLocked`
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
    return {
      typeName: ObligationLocked.$typeName,
      fullTypeName: composeSuiType(
        ObligationLocked.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation::ObligationLocked`,
      typeArgs: [] as [],
      isPhantom: ObligationLocked.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationLocked.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationLocked.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationLocked.fromBcs(data),
      bcs: ObligationLocked.bcs,
      fromJSONField: (field: any) => ObligationLocked.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationLocked.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationLocked.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationLocked.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObligationLocked.fetch(client, id),
      new: (fields: ObligationLockedFields) => {
        return new ObligationLocked([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationLocked.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationLocked>> {
    return phantom(ObligationLocked.reified())
  }
  static get p() {
    return ObligationLocked.phantom()
  }

  static get bcs() {
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
        item.fields.deposit_collateral_locked
      ),
      withdrawCollateralLocked: decodeFromFieldsWithTypes(
        'bool',
        item.fields.withdraw_collateral_locked
      ),
      liquidateLocked: decodeFromFieldsWithTypes('bool', item.fields.liquidate_locked),
    })
  }

  static fromBcs(data: Uint8Array): ObligationLocked {
    return ObligationLocked.fromFields(ObligationLocked.bcs.parse(data))
  }

  toJSONField() {
    return {
      obligation: this.obligation,
      witness: this.witness.toJSONField(),
      borrowLocked: this.borrowLocked,
      repayLocked: this.repayLocked,
      depositCollateralLocked: this.depositCollateralLocked,
      withdrawCollateralLocked: this.withdrawCollateralLocked,
      liquidateLocked: this.liquidateLocked,
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return ObligationLocked.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationLocked.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationLocked> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObligationLocked object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligationLocked(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObligationLocked object`)
    }

    return ObligationLocked.fromSuiObjectData(res.data)
  }
}

/* ============================== ObligationUnlocked =============================== */

export function isObligationUnlocked(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::obligation::ObligationUnlocked`
}

export interface ObligationUnlockedFields {
  obligation: ToField<ID>
  witness: ToField<TypeName>
}

export type ObligationUnlockedReified = Reified<ObligationUnlocked, ObligationUnlockedFields>

export class ObligationUnlocked implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::obligation::ObligationUnlocked`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = ObligationUnlocked.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::obligation::ObligationUnlocked`
  readonly $typeArgs: []
  readonly $isPhantom = ObligationUnlocked.$isPhantom

  readonly obligation: ToField<ID>
  readonly witness: ToField<TypeName>

  private constructor(typeArgs: [], fields: ObligationUnlockedFields) {
    this.$fullTypeName = composeSuiType(
      ObligationUnlocked.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::obligation::ObligationUnlocked`
    this.$typeArgs = typeArgs

    this.obligation = fields.obligation
    this.witness = fields.witness
  }

  static reified(): ObligationUnlockedReified {
    return {
      typeName: ObligationUnlocked.$typeName,
      fullTypeName: composeSuiType(
        ObligationUnlocked.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::obligation::ObligationUnlocked`,
      typeArgs: [] as [],
      isPhantom: ObligationUnlocked.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ObligationUnlocked.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ObligationUnlocked.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ObligationUnlocked.fromBcs(data),
      bcs: ObligationUnlocked.bcs,
      fromJSONField: (field: any) => ObligationUnlocked.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ObligationUnlocked.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => ObligationUnlocked.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ObligationUnlocked.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => ObligationUnlocked.fetch(client, id),
      new: (fields: ObligationUnlockedFields) => {
        return new ObligationUnlocked([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return ObligationUnlocked.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ObligationUnlocked>> {
    return phantom(ObligationUnlocked.reified())
  }
  static get p() {
    return ObligationUnlocked.phantom()
  }

  static get bcs() {
    return bcs.struct('ObligationUnlocked', {
      obligation: ID.bcs,
      witness: TypeName.bcs,
    })
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

  toJSONField() {
    return {
      obligation: this.obligation,
      witness: this.witness.toJSONField(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
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

      return ObligationUnlocked.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ObligationUnlocked.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<ObligationUnlocked> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching ObligationUnlocked object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isObligationUnlocked(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a ObligationUnlocked object`)
    }

    return ObligationUnlocked.fromSuiObjectData(res.data)
  }
}
