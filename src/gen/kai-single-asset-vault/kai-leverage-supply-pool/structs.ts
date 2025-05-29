import { Entity } from '../../_dependencies/source/0xd9dd55ac7eb676dc78f7d0ae3bc5529d7fd6b52ac0d0edb2d7820c52d080026/access/structs'
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
  fieldToJSON,
  phantom,
} from '../../_framework/reified'
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from '../../_framework/util'
import { Option } from '../../move-stdlib/option/structs'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { PKG_V10 } from '../index'
import { VaultAccess } from '../vault/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== IncentiveInjectInfo =============================== */

export function isIncentiveInjectInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V10}::kai_leverage_supply_pool::IncentiveInjectInfo`
}

export interface IncentiveInjectInfoFields {
  strategyId: ToField<ID>
  amount: ToField<'u64'>
}

export type IncentiveInjectInfoReified = Reified<IncentiveInjectInfo, IncentiveInjectInfoFields>

export class IncentiveInjectInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V10}::kai_leverage_supply_pool::IncentiveInjectInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = IncentiveInjectInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V10}::kai_leverage_supply_pool::IncentiveInjectInfo`
  readonly $typeArgs: []
  readonly $isPhantom = IncentiveInjectInfo.$isPhantom

  readonly strategyId: ToField<ID>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: IncentiveInjectInfoFields) {
    this.$fullTypeName = composeSuiType(
      IncentiveInjectInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V10}::kai_leverage_supply_pool::IncentiveInjectInfo`
    this.$typeArgs = typeArgs

    this.strategyId = fields.strategyId
    this.amount = fields.amount
  }

  static reified(): IncentiveInjectInfoReified {
    return {
      typeName: IncentiveInjectInfo.$typeName,
      fullTypeName: composeSuiType(
        IncentiveInjectInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V10}::kai_leverage_supply_pool::IncentiveInjectInfo`,
      typeArgs: [] as [],
      isPhantom: IncentiveInjectInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => IncentiveInjectInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => IncentiveInjectInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => IncentiveInjectInfo.fromBcs(data),
      bcs: IncentiveInjectInfo.bcs,
      fromJSONField: (field: any) => IncentiveInjectInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => IncentiveInjectInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => IncentiveInjectInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => IncentiveInjectInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => IncentiveInjectInfo.fetch(client, id),
      new: (fields: IncentiveInjectInfoFields) => {
        return new IncentiveInjectInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return IncentiveInjectInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<IncentiveInjectInfo>> {
    return phantom(IncentiveInjectInfo.reified())
  }
  static get p() {
    return IncentiveInjectInfo.phantom()
  }

  static get bcs() {
    return bcs.struct('IncentiveInjectInfo', {
      strategy_id: ID.bcs,
      amount: bcs.u64(),
    })
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

  toJSONField() {
    return {
      strategyId: this.strategyId,
      amount: this.amount.toString(),
    }
  }

  toJSON() {
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
      throw new Error('not a WithTwoGenerics json object')
    }

    return IncentiveInjectInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): IncentiveInjectInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isIncentiveInjectInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a IncentiveInjectInfo object`)
    }
    return IncentiveInjectInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): IncentiveInjectInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isIncentiveInjectInfo(data.bcs.type)) {
        throw new Error(`object at is not a IncentiveInjectInfo object`)
      }

      return IncentiveInjectInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return IncentiveInjectInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<IncentiveInjectInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching IncentiveInjectInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isIncentiveInjectInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a IncentiveInjectInfo object`)
    }

    return IncentiveInjectInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V10}::kai_leverage_supply_pool::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V10}::kai_leverage_supply_pool::AdminCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AdminCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V10}::kai_leverage_supply_pool::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V10}::kai_leverage_supply_pool::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[]
      ) as `${typeof PKG_V10}::kai_leverage_supply_pool::AdminCap`,
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromBcs(data),
      bcs: AdminCap.bcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => AdminCap.fetch(client, id),
      new: (fields: AdminCapFields) => {
        return new AdminCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return AdminCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AdminCap>> {
    return phantom(AdminCap.reified())
  }
  static get p() {
    return AdminCap.phantom()
  }

  static get bcs() {
    return bcs.struct('AdminCap', {
      id: UID.bcs,
    })
  }

  static fromFields(fields: Record<string, any>): AdminCap {
    return AdminCap.reified().new({ id: decodeFromFields(UID.reified(), fields.id) })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AdminCap {
    if (!isAdminCap(item.type)) {
      throw new Error('not a AdminCap type')
    }

    return AdminCap.reified().new({ id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) })
  }

  static fromBcs(data: Uint8Array): AdminCap {
    return AdminCap.fromFields(AdminCap.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AdminCap {
    return AdminCap.reified().new({ id: decodeFromJSONField(UID.reified(), field.id) })
  }

  static fromJSON(json: Record<string, any>): AdminCap {
    if (json.$typeName !== AdminCap.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return AdminCap.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): AdminCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAdminCap(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`)
    }
    return AdminCap.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): AdminCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAdminCap(data.bcs.type)) {
        throw new Error(`object at is not a AdminCap object`)
      }

      return AdminCap.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<AdminCap> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching AdminCap object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isAdminCap(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }

    return AdminCap.fromSuiObjectData(res.data)
  }
}

/* ============================== Strategy =============================== */

export function isStrategy(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V10}::kai_leverage_supply_pool::Strategy` + '<')
}

export interface StrategyFields<T extends PhantomTypeArgument, ST extends PhantomTypeArgument> {
  id: ToField<UID>
  adminCapId: ToField<ID>
  vaultAccess: ToField<Option<VaultAccess>>
  entity: ToField<Entity>
  shares: ToField<Balance<ST>>
  underlyingNominalValueT: ToField<'u64'>
  collectedProfitT: ToField<Balance<T>>
  version: ToField<'u64'>
}

export type StrategyReified<
  T extends PhantomTypeArgument,
  ST extends PhantomTypeArgument,
> = Reified<Strategy<T, ST>, StrategyFields<T, ST>>

export class Strategy<T extends PhantomTypeArgument, ST extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V10}::kai_leverage_supply_pool::Strategy`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = Strategy.$typeName
  readonly $fullTypeName: `${typeof PKG_V10}::kai_leverage_supply_pool::Strategy<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<ST>}>`
  readonly $typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>]
  readonly $isPhantom = Strategy.$isPhantom

  readonly id: ToField<UID>
  readonly adminCapId: ToField<ID>
  readonly vaultAccess: ToField<Option<VaultAccess>>
  readonly entity: ToField<Entity>
  readonly shares: ToField<Balance<ST>>
  readonly underlyingNominalValueT: ToField<'u64'>
  readonly collectedProfitT: ToField<Balance<T>>
  readonly version: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<T>, PhantomToTypeStr<ST>],
    fields: StrategyFields<T, ST>
  ) {
    this.$fullTypeName = composeSuiType(
      Strategy.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V10}::kai_leverage_supply_pool::Strategy<${PhantomToTypeStr<T>}, ${PhantomToTypeStr<ST>}>`
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
  >(T: T, ST: ST): StrategyReified<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return {
      typeName: Strategy.$typeName,
      fullTypeName: composeSuiType(
        Strategy.$typeName,
        ...[extractType(T), extractType(ST)]
      ) as `${typeof PKG_V10}::kai_leverage_supply_pool::Strategy<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<ST>>}>`,
      typeArgs: [extractType(T), extractType(ST)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T>>,
        PhantomToTypeStr<ToPhantomTypeArgument<ST>>,
      ],
      isPhantom: Strategy.$isPhantom,
      reifiedTypeArgs: [T, ST],
      fromFields: (fields: Record<string, any>) => Strategy.fromFields([T, ST], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Strategy.fromFieldsWithTypes([T, ST], item),
      fromBcs: (data: Uint8Array) => Strategy.fromBcs([T, ST], data),
      bcs: Strategy.bcs,
      fromJSONField: (field: any) => Strategy.fromJSONField([T, ST], field),
      fromJSON: (json: Record<string, any>) => Strategy.fromJSON([T, ST], json),
      fromSuiParsedData: (content: SuiParsedData) => Strategy.fromSuiParsedData([T, ST], content),
      fromSuiObjectData: (content: SuiObjectData) => Strategy.fromSuiObjectData([T, ST], content),
      fetch: async (client: SuiClient, id: string) => Strategy.fetch(client, [T, ST], id),
      new: (fields: StrategyFields<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>) => {
        return new Strategy([extractType(T), extractType(ST)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Strategy.reified
  }

  static phantom<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    T: T,
    ST: ST
  ): PhantomReified<ToTypeStr<Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>>> {
    return phantom(Strategy.reified(T, ST))
  }
  static get p() {
    return Strategy.phantom
  }

  static get bcs() {
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

  static fromFields<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    fields: Record<string, any>
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
    item: FieldsWithTypes
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
        item.fields.vault_access
      ),
      entity: decodeFromFieldsWithTypes(Entity.reified(), item.fields.entity),
      shares: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.shares),
      underlyingNominalValueT: decodeFromFieldsWithTypes(
        'u64',
        item.fields.underlying_nominal_value_t
      ),
      collectedProfitT: decodeFromFieldsWithTypes(
        Balance.reified(typeArgs[0]),
        item.fields.collected_profit_t
      ),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
    })
  }

  static fromBcs<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    data: Uint8Array
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    return Strategy.fromFields(typeArgs, Strategy.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      adminCapId: this.adminCapId,
      vaultAccess: fieldToJSON<Option<VaultAccess>>(
        `${Option.$typeName}<${VaultAccess.$typeName}>`,
        this.vaultAccess
      ),
      entity: this.entity.toJSONField(),
      shares: this.shares.toJSONField(),
      underlyingNominalValueT: this.underlyingNominalValueT.toString(),
      collectedProfitT: this.collectedProfitT.toJSONField(),
      version: this.version.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(typeArgs: [T, ST], field: any): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
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
    json: Record<string, any>
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (json.$typeName !== Strategy.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Strategy.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return Strategy.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    content: SuiParsedData
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStrategy(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Strategy object`)
    }
    return Strategy.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [T, ST],
    data: SuiObjectData
  ): Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStrategy(data.bcs.type)) {
        throw new Error(`object at is not a Strategy object`)
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs
      if (gotTypeArgs.length !== 2) {
        throw new Error(
          `type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`
        )
      }
      for (let i = 0; i < 2; i++) {
        const gotTypeArg = compressSuiType(gotTypeArgs[i])
        const expectedTypeArg = compressSuiType(extractType(typeArgs[i]))
        if (gotTypeArg !== expectedTypeArg) {
          throw new Error(
            `type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
          )
        }
      }

      return Strategy.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Strategy.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    T extends PhantomReified<PhantomTypeArgument>,
    ST extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [T, ST],
    id: string
  ): Promise<Strategy<ToPhantomTypeArgument<T>, ToPhantomTypeArgument<ST>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Strategy object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isStrategy(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Strategy object`)
    }

    return Strategy.fromSuiObjectData(typeArgs, res.data)
  }
}
