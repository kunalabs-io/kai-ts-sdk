/**
 * Kai Leverage supply pool strategy for SAV integration.
 * Implements basic compounding of rewards.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
import { Entity } from '../../_dependencies/access-management/access/structs'
import { getTypeOrigin } from '../../_envs'
import {
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
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
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'
import { Option } from '../../std/option/structs'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { VaultAccess } from '../vault/structs'

/* ============================== IncentiveInjectInfo =============================== */

export function isIncentiveInjectInfo(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-sav', 'kai_leverage_supply_pool::IncentiveInjectInfo')
    }::kai_leverage_supply_pool::IncentiveInjectInfo`
}

export interface IncentiveInjectInfoFields {
  strategyId: ToField<ID>
  amount: ToField<'u64'>
}

export type IncentiveInjectInfoReified = Reified<IncentiveInjectInfo, IncentiveInjectInfoFields>

export type IncentiveInjectInfoJSONField = {
  strategyId: string
  amount: string
}

export type IncentiveInjectInfoJSON = {
  $typeName: typeof IncentiveInjectInfo.$typeName
  $typeArgs: []
} & IncentiveInjectInfoJSONField

/** Incentive injection event. */
export class IncentiveInjectInfo implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::kai_leverage_supply_pool::IncentiveInjectInfo` {
    return `${
      getTypeOrigin('kai-sav', 'kai_leverage_supply_pool::IncentiveInjectInfo')
    }::kai_leverage_supply_pool::IncentiveInjectInfo` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof IncentiveInjectInfo.$typeName = IncentiveInjectInfo.$typeName
  readonly $fullTypeName: `${string}::kai_leverage_supply_pool::IncentiveInjectInfo`
  readonly $typeArgs: []
  readonly $isPhantom: typeof IncentiveInjectInfo.$isPhantom = IncentiveInjectInfo.$isPhantom

  readonly strategyId: ToField<ID>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: IncentiveInjectInfoFields) {
    this.$fullTypeName = composeSuiType(
      IncentiveInjectInfo.$typeName,
      ...typeArgs,
    ) as `${string}::kai_leverage_supply_pool::IncentiveInjectInfo`
    this.$typeArgs = typeArgs

    this.strategyId = fields.strategyId
    this.amount = fields.amount
  }

  static reified(): IncentiveInjectInfoReified {
    const reifiedBcs = IncentiveInjectInfo.bcs
    return {
      get typeName() {
        return IncentiveInjectInfo.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          IncentiveInjectInfo.$typeName,
          ...[],
        ) as `${string}::kai_leverage_supply_pool::IncentiveInjectInfo`
      },
      typeArgs: [] as [],
      isPhantom: IncentiveInjectInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => IncentiveInjectInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => IncentiveInjectInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => IncentiveInjectInfo.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => IncentiveInjectInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => IncentiveInjectInfo.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        IncentiveInjectInfo.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => IncentiveInjectInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => IncentiveInjectInfo.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => IncentiveInjectInfo.fetch(client, id),
      new: (fields: IncentiveInjectInfoFields) => {
        return new IncentiveInjectInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): IncentiveInjectInfoReified {
    return IncentiveInjectInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<IncentiveInjectInfo>> {
    return phantom(IncentiveInjectInfo.reified())
  }

  static get p(): PhantomReified<ToTypeStr<IncentiveInjectInfo>> {
    return IncentiveInjectInfo.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('IncentiveInjectInfo', {
      strategy_id: ID.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof IncentiveInjectInfo.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof IncentiveInjectInfo.instantiateBcs> {
    if (!IncentiveInjectInfo.cachedBcs) {
      IncentiveInjectInfo.cachedBcs = IncentiveInjectInfo.instantiateBcs()
    }
    return IncentiveInjectInfo.cachedBcs
  }

  static fromFields(fields: Record<string, any>): IncentiveInjectInfo {
    return IncentiveInjectInfo.reified().new({
      strategyId: decodeFromFields(ID.reified(), fields.strategy_id),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): IncentiveInjectInfo {
    if (!isIncentiveInjectInfo(item.type)) {
      throw new Error('not a IncentiveInjectInfo type')
    }

    return IncentiveInjectInfo.reified().new({
      strategyId: decodeFromFieldsWithTypes(ID.reified(), item.fields.strategy_id),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): IncentiveInjectInfo {
    return IncentiveInjectInfo.fromFields(IncentiveInjectInfo.bcs.parse(data))
  }

  toJSONField(): IncentiveInjectInfoJSONField {
    return {
      strategyId: this.strategyId,
      amount: this.amount.toString(),
    }
  }

  toJSON(): IncentiveInjectInfoJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): IncentiveInjectInfo {
    return IncentiveInjectInfo.reified().new({
      strategyId: decodeFromJSONField(ID.reified(), field.strategyId),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): IncentiveInjectInfo {
    if (json.$typeName !== IncentiveInjectInfo.$typeName) {
      throw new Error(
        `not a IncentiveInjectInfo json object: expected '${IncentiveInjectInfo.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return IncentiveInjectInfo.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): IncentiveInjectInfo {
    if (!isIncentiveInjectInfo(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a IncentiveInjectInfo object`)
    }
    return IncentiveInjectInfo.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link IncentiveInjectInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): IncentiveInjectInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isIncentiveInjectInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a IncentiveInjectInfo object`)
    }
    return IncentiveInjectInfo.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link IncentiveInjectInfo.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): IncentiveInjectInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isIncentiveInjectInfo(data.bcs.type)) {
        throw new Error(`object at is not a IncentiveInjectInfo object`)
      }

      return IncentiveInjectInfo.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return IncentiveInjectInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<IncentiveInjectInfo> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isIncentiveInjectInfo(object.type)) {
      throw new Error(`object at id ${id} is not a IncentiveInjectInfo object`)
    }
    return IncentiveInjectInfo.fromBcs(object.content)
  }
}

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('kai-sav', 'kai_leverage_supply_pool::AdminCap')
    }::kai_leverage_supply_pool::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export type AdminCapJSONField = {
  id: string
}

export type AdminCapJSON = {
  $typeName: typeof AdminCap.$typeName
  $typeArgs: []
} & AdminCapJSONField

/** Administrative capability for strategy management. */
export class AdminCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::kai_leverage_supply_pool::AdminCap` {
    return `${
      getTypeOrigin('kai-sav', 'kai_leverage_supply_pool::AdminCap')
    }::kai_leverage_supply_pool::AdminCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName
  readonly $fullTypeName: `${string}::kai_leverage_supply_pool::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs,
    ) as `${string}::kai_leverage_supply_pool::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      get typeName() {
        return AdminCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AdminCap.$typeName,
          ...[],
        ) as `${string}::kai_leverage_supply_pool::AdminCap`
      },
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AdminCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AdminCapReified {
    return AdminCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AdminCap>> {
    return AdminCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AdminCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AdminCap.instantiateBcs> {
    if (!AdminCap.cachedBcs) {
      AdminCap.cachedBcs = AdminCap.instantiateBcs()
    }
    return AdminCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField(): AdminCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): AdminCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error(
        `not a AdminCap json object: expected '${AdminCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AdminCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AdminCap {
    if (!isAdminCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AdminCap object`)
    }
    return AdminCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AdminCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`)
    }
    return AdminCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AdminCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`)
      }

      return AdminCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AdminCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAdminCap(object.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }
    return AdminCap.fromBcs(object.content)
  }
}

/* ============================== Strategy =============================== */

export function isStrategy(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${
      getTypeOrigin('kai-sav', 'kai_leverage_supply_pool::Strategy')
    }::kai_leverage_supply_pool::Strategy` + '<',
  )
}

export interface StrategyFields<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> {
  id: ToField<UID>
  /** ID of the admin capability that controls this strategy */
  adminCapId: ToField<ID>
  /** Vault access token for vault interactions */
  vaultAccess: ToField<Option<VaultAccess>>
  /** Access Management entity for authentication and authorization in Kai Leverage */
  entity: ToField<Entity>
  /** Balance of supply pool share tokens representing stake in the supply pool */
  shares: ToField<Balance<ST>>
  /** Nominal value of underlying assets deposited to the supply pool */
  underlyingNominalValueT: ToField<'u64'>
  /** Accumulated profits collected from the supply pool */
  collectedProfitT: ToField<Balance<T>>
  /** Version number for upgrade compatibility */
  version: ToField<'u64'>
}

export type StrategyReified<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> =
  Reified<Strategy<T, ST>, StrategyFields<T, ST>>

export type StrategyJSONField<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> = {
  id: string
  adminCapId: string
  vaultAccess: ToJSON<VaultAccess> | null
  entity: ToJSON<Entity>
  shares: ToJSON<Balance<ST>>
  underlyingNominalValueT: string
  collectedProfitT: ToJSON<Balance<T>>
  version: string
}

export type StrategyJSON<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> = {
  $typeName: typeof Strategy.$typeName
  $typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>]
} & StrategyJSONField<T, ST>

/**
 * Strategy managing supply pool integration with vault.
 *
 * Deposits funds from a Kai Single Asset Vault into a Kai Leverage supply pool,
 * managing deposits, withdrawals, and profit collection while maintaining
 * proper accounting of shares and underlying values.
 */
export class Strategy<T extends PhantomTypeArgument, ST extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static get $typeName(): `${string}::kai_leverage_supply_pool::Strategy` {
    return `${
      getTypeOrigin('kai-sav', 'kai_leverage_supply_pool::Strategy')
    }::kai_leverage_supply_pool::Strategy` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName: typeof Strategy.$typeName = Strategy.$typeName
  readonly $fullTypeName: `${string}::kai_leverage_supply_pool::Strategy<${PhantomToTypeStr<
    T
  >}, ${PhantomToTypeStr<ST>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>]
  readonly $isPhantom: typeof Strategy.$isPhantom = Strategy.$isPhantom

  readonly id: ToField<UID>
  /** ID of the admin capability that controls this strategy */
  readonly adminCapId: ToField<ID>
  /** Vault access token for vault interactions */
  readonly vaultAccess: ToField<Option<VaultAccess>>
  /** Access Management entity for authentication and authorization in Kai Leverage */
  readonly entity: ToField<Entity>
  /** Balance of supply pool share tokens representing stake in the supply pool */
  readonly shares: ToField<Balance<ST>>
  /** Nominal value of underlying assets deposited to the supply pool */
  readonly underlyingNominalValueT: ToField<'u64'>
  /** Accumulated profits collected from the supply pool */
  readonly collectedProfitT: ToField<Balance<T>>
  /** Version number for upgrade compatibility */
  readonly version: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>],
    fields: StrategyFields<T, ST>,
  ) {
    this.$fullTypeName = composeSuiType(
      Strategy.$typeName,
      ...typeArgs,
    ) as `${string}::kai_leverage_supply_pool::Strategy<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<
      ST
    >}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.adminCapId = fields.adminCapId
    this.vaultAccess = fields.vaultAccess
    this.entity = fields.entity
    this.shares = fields.shares
    this.underlyingNominalValueT = fields.underlyingNominalValueT
    this.collectedProfitT = fields.collectedProfitT
    this.version = fields.version
  }

  static reified<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    ST: ST,
  ): StrategyReified<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    const reifiedBcs = Strategy.bcs
    return {
      get typeName() {
        return Strategy.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Strategy.$typeName,
          ...[extractType(T), extractType(ST)],
        ) as `${string}::kai_leverage_supply_pool::Strategy<${PhantomToTypeStr<
          ToPhantomTypeArgument<T>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<ST>>}>`
      },
      get typeArgs() {
        return [extractType(T), extractType(ST)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<T>>,
          PhantomToTypeStr<ToPhantomTypeArgument<ST>>,
        ]
      },
      isPhantom: Strategy.$isPhantom,
      reifiedTypeArgs: [T, ST],
      fromFields: (fields: Record<string, any>) => Strategy.fromFields([T, ST], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Strategy.fromFieldsWithTypes([T, ST], item),
      fromBcs: (data: Uint8Array) => Strategy.fromFields([T, ST], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Strategy.fromJSONField([T, ST], field),
      fromJSON: (json: Record<string, any>) => Strategy.fromJSON([T, ST], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Strategy.fromCoreObject([T, ST], obj),
      fromSuiParsedData: (content: SuiParsedData) => Strategy.fromSuiParsedData([T, ST], content),
      fromSuiObjectData: (content: SuiObjectData) => Strategy.fromSuiObjectData([T, ST], content),
      fetch: async (client: ClientWithCoreApi, id: string) => Strategy.fetch(client, [T, ST], id),
      new: (fields: StrategyFields<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>) => {
        return new Strategy([extractType(T), extractType(ST)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Strategy.reified {
    return Strategy.reified
  }

  static phantom<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    ST: ST,
  ): PhantomReified<ToTypeStr<Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>>> {
    return phantom(Strategy.reified(T, ST))
  }

  static get p(): typeof Strategy.phantom {
    return Strategy.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Strategy', {
      id: UID.bcs,
      admin_cap_id: ID.bcs,
      vault_access: Option.bcs(VaultAccess.bcs),
      entity: Entity.bcs,
      shares: Balance.bcs,
      underlying_nominal_value_t: bcs.u64(),
      collected_profit_t: Balance.bcs,
      version: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof Strategy.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Strategy.instantiateBcs> {
    if (!Strategy.cachedBcs) {
      Strategy.cachedBcs = Strategy.instantiateBcs()
    }
    return Strategy.cachedBcs
  }

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    fields: Record<string, any>,
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return Strategy.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      adminCapId: decodeFromFields(ID.reified(), fields.admin_cap_id),
      vaultAccess: decodeFromFields(Option.reified(VaultAccess.reified()), fields.vault_access),
      entity: decodeFromFields(Entity.reified(), fields.entity),
      shares: decodeFromFields(Balance.reified(typeArgs[1]), fields.shares),
      underlyingNominalValueT: decodeFromFields('u64', fields.underlying_nominal_value_t),
      collectedProfitT: decodeFromFields(Balance.reified(typeArgs[0]), fields.collected_profit_t),
      version: decodeFromFields('u64', fields.version),
    })
  }

  static fromFieldsWithTypes<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    item: FieldsWithTypes,
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (!isStrategy(item.type)) {
      throw new Error('not a Strategy type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return Strategy.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      adminCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.admin_cap_id),
      vaultAccess: decodeFromFieldsWithTypes(
        Option.reified(VaultAccess.reified()),
        item.fields.vault_access,
      ),
      entity: decodeFromFieldsWithTypes(Entity.reified(), item.fields.entity),
      shares: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.shares),
      underlyingNominalValueT: decodeFromFieldsWithTypes(
        'u64',
        item.fields.underlying_nominal_value_t,
      ),
      collectedProfitT: decodeFromFieldsWithTypes(
        Balance.reified(typeArgs[0]),
        item.fields.collected_profit_t,
      ),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
    })
  }

  static fromBcs<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    data: Uint8Array,
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return Strategy.fromFields(typeArgs, Strategy.bcs.parse(data))
  }

  toJSONField(): StrategyJSONField<T, ST> {
    return {
      id: this.id,
      adminCapId: this.adminCapId,
      vaultAccess: fieldToJSON<Option<VaultAccess>>(
        `${Option.$typeName}<${VaultAccess.$typeName}>`,
        this.vaultAccess,
      ),
      entity: this.entity.toJSONField(),
      shares: this.shares.toJSONField(),
      underlyingNominalValueT: this.underlyingNominalValueT.toString(),
      collectedProfitT: this.collectedProfitT.toJSONField(),
      version: this.version.toString(),
    }
  }

  toJSON(): StrategyJSON<T, ST> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    field: any,
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return Strategy.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      adminCapId: decodeFromJSONField(ID.reified(), field.adminCapId),
      vaultAccess: decodeFromJSONField(Option.reified(VaultAccess.reified()), field.vaultAccess),
      entity: decodeFromJSONField(Entity.reified(), field.entity),
      shares: decodeFromJSONField(Balance.reified(typeArgs[1]), field.shares),
      underlyingNominalValueT: decodeFromJSONField('u64', field.underlyingNominalValueT),
      collectedProfitT: decodeFromJSONField(Balance.reified(typeArgs[0]), field.collectedProfitT),
      version: decodeFromJSONField('u64', field.version),
    })
  }

  static fromJSON<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    json: Record<string, any>,
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (json.$typeName !== Strategy.$typeName) {
      throw new Error(
        `not a Strategy json object: expected '${Strategy.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Strategy.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return Strategy.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (!isStrategy(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Strategy object`)
    }

    const gotTypeArgs = parseTypeName(obj.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return Strategy.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Strategy.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    content: SuiParsedData,
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStrategy(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Strategy object`)
    }
    return Strategy.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Strategy.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    data: SuiObjectData,
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStrategy(data.bcs.type)) {
        throw new Error(`object at is not a Strategy object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
          )
        }
      }

      return Strategy.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Strategy.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [T, ST],
    id: string,
  ): Promise<Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isStrategy(object.type)) {
      throw new Error(`object at id ${id} is not a Strategy object`)
    }

    const gotTypeArgs = parseTypeName(object.type).typeArgs
    if (gotTypeArgs.length !== 2) {
      throw new Error(
        `type argument mismatch: expected 2 type arguments but got '${gotTypeArgs.length}'`,
      )
    }
    for (let i = 0; i < 2; i++) {
      const gotTypeArg = compressSuiType(gotTypeArgs[i])
      const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
      if (gotTypeArg !== expectedTypeArg) {
        throw new Error(
          `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`,
        )
      }
    }

    return Strategy.fromBcs(typeArgs, object.content)
  }
}
