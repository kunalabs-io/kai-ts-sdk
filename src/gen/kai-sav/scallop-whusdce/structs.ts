/** SAV strategy integrating Scallop whUSDC.e with Kai vaults. */

import { bcs } from '@mysten/sui/bcs'
import { SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromBase64 } from '@mysten/sui/utils'
import { MarketCoin } from '../../_dependencies/protocol/reserve/structs'
import { SpoolAccount } from '../../_dependencies/spool/spool-account/structs'
import { COIN } from '../../_dependencies/whusdce/coin/structs'
import { getTypeOrigin } from '../../_envs'
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
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  fetchObjectBcs,
  FieldsWithTypes,
  SupportedSuiClient,
} from '../../_framework/util'
import { Option } from '../../std/option/structs'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { SUI } from '../../sui/sui/structs'
import { VaultAccess } from '../vault/structs'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('kai-sav', 'scallop_whusdce::AdminCap')}::scallop_whusdce::AdminCap`
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

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::scallop_whusdce::AdminCap` = `${
    getTypeOrigin('kai-sav', 'scallop_whusdce::AdminCap')
  }::scallop_whusdce::AdminCap` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AdminCap.$typeName = AdminCap.$typeName
  readonly $fullTypeName: `${string}::scallop_whusdce::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AdminCap.$isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs,
    ) as `${string}::scallop_whusdce::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[],
      ) as `${string}::scallop_whusdce::AdminCap`,
      typeArgs: [] as [],
      isPhantom: AdminCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AdminCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AdminCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AdminCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AdminCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => AdminCap.fetch(client, id),
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

      return AdminCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AdminCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<AdminCap> {
    const res = await fetchObjectBcs(client, id)
    if (!isAdminCap(res.type)) {
      throw new Error(`object at id ${id} is not a AdminCap object`)
    }

    return AdminCap.fromBcs(res.bcsBytes)
  }
}

/* ============================== Strategy =============================== */

export function isStrategy(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('kai-sav', 'scallop_whusdce::Strategy')}::scallop_whusdce::Strategy`
}

export interface StrategyFields {
  id: ToField<UID>
  adminCapId: ToField<ID>
  vaultAccess: ToField<Option<VaultAccess>>
  scallopPoolAcc: ToField<SpoolAccount<ToPhantom<MarketCoin<ToPhantom<COIN>>>>>
  underlyingNominalValueUsdc: ToField<'u64'>
  collectedProfitUsdc: ToField<Balance<ToPhantom<COIN>>>
  collectedProfitSui: ToField<Balance<ToPhantom<SUI>>>
  version: ToField<'u64'>
}

export type StrategyReified = Reified<Strategy, StrategyFields>

export type StrategyJSONField = {
  id: string
  adminCapId: string
  vaultAccess: ToJSON<VaultAccess> | null
  scallopPoolAcc: ToJSON<SpoolAccount<ToPhantom<MarketCoin<ToPhantom<COIN>>>>>
  underlyingNominalValueUsdc: string
  collectedProfitUsdc: ToJSON<Balance<ToPhantom<COIN>>>
  collectedProfitSui: ToJSON<Balance<ToPhantom<SUI>>>
  version: string
}

export type StrategyJSON = {
  $typeName: typeof Strategy.$typeName
  $typeArgs: []
} & StrategyJSONField

export class Strategy implements StructClass {
  __StructClass = true as const

  static readonly $typeName: `${string}::scallop_whusdce::Strategy` = `${
    getTypeOrigin('kai-sav', 'scallop_whusdce::Strategy')
  }::scallop_whusdce::Strategy` as const
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Strategy.$typeName = Strategy.$typeName
  readonly $fullTypeName: `${string}::scallop_whusdce::Strategy`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Strategy.$isPhantom = Strategy.$isPhantom

  readonly id: ToField<UID>
  readonly adminCapId: ToField<ID>
  readonly vaultAccess: ToField<Option<VaultAccess>>
  readonly scallopPoolAcc: ToField<SpoolAccount<ToPhantom<MarketCoin<ToPhantom<COIN>>>>>
  readonly underlyingNominalValueUsdc: ToField<'u64'>
  readonly collectedProfitUsdc: ToField<Balance<ToPhantom<COIN>>>
  readonly collectedProfitSui: ToField<Balance<ToPhantom<SUI>>>
  readonly version: ToField<'u64'>

  private constructor(typeArgs: [], fields: StrategyFields) {
    this.$fullTypeName = composeSuiType(
      Strategy.$typeName,
      ...typeArgs,
    ) as `${string}::scallop_whusdce::Strategy`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.adminCapId = fields.adminCapId
    this.vaultAccess = fields.vaultAccess
    this.scallopPoolAcc = fields.scallopPoolAcc
    this.underlyingNominalValueUsdc = fields.underlyingNominalValueUsdc
    this.collectedProfitUsdc = fields.collectedProfitUsdc
    this.collectedProfitSui = fields.collectedProfitSui
    this.version = fields.version
  }

  static reified(): StrategyReified {
    const reifiedBcs = Strategy.bcs
    return {
      typeName: Strategy.$typeName,
      fullTypeName: composeSuiType(
        Strategy.$typeName,
        ...[],
      ) as `${string}::scallop_whusdce::Strategy`,
      typeArgs: [] as [],
      isPhantom: Strategy.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Strategy.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Strategy.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Strategy.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Strategy.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Strategy.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Strategy.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Strategy.fromSuiObjectData(content),
      fetch: async (client: SupportedSuiClient, id: string) => Strategy.fetch(client, id),
      new: (fields: StrategyFields) => {
        return new Strategy([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): StrategyReified {
    return Strategy.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Strategy>> {
    return phantom(Strategy.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Strategy>> {
    return Strategy.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Strategy', {
      id: UID.bcs,
      admin_cap_id: ID.bcs,
      vault_access: Option.bcs(VaultAccess.bcs),
      scallop_pool_acc: SpoolAccount.bcs,
      underlying_nominal_value_usdc: bcs.u64(),
      collected_profit_usdc: Balance.bcs,
      collected_profit_sui: Balance.bcs,
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

  static fromFields(fields: Record<string, any>): Strategy {
    return Strategy.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      adminCapId: decodeFromFields(ID.reified(), fields.admin_cap_id),
      vaultAccess: decodeFromFields(Option.reified(VaultAccess.reified()), fields.vault_access),
      scallopPoolAcc: decodeFromFields(
        SpoolAccount.reified(phantom(MarketCoin.reified(phantom(COIN.reified())))),
        fields.scallop_pool_acc,
      ),
      underlyingNominalValueUsdc: decodeFromFields('u64', fields.underlying_nominal_value_usdc),
      collectedProfitUsdc: decodeFromFields(
        Balance.reified(phantom(COIN.reified())),
        fields.collected_profit_usdc,
      ),
      collectedProfitSui: decodeFromFields(
        Balance.reified(phantom(SUI.reified())),
        fields.collected_profit_sui,
      ),
      version: decodeFromFields('u64', fields.version),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Strategy {
    if (!isStrategy(item.type)) {
      throw new Error('not a Strategy type')
    }

    return Strategy.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      adminCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.admin_cap_id),
      vaultAccess: decodeFromFieldsWithTypes(
        Option.reified(VaultAccess.reified()),
        item.fields.vault_access,
      ),
      scallopPoolAcc: decodeFromFieldsWithTypes(
        SpoolAccount.reified(phantom(MarketCoin.reified(phantom(COIN.reified())))),
        item.fields.scallop_pool_acc,
      ),
      underlyingNominalValueUsdc: decodeFromFieldsWithTypes(
        'u64',
        item.fields.underlying_nominal_value_usdc,
      ),
      collectedProfitUsdc: decodeFromFieldsWithTypes(
        Balance.reified(phantom(COIN.reified())),
        item.fields.collected_profit_usdc,
      ),
      collectedProfitSui: decodeFromFieldsWithTypes(
        Balance.reified(phantom(SUI.reified())),
        item.fields.collected_profit_sui,
      ),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
    })
  }

  static fromBcs(data: Uint8Array): Strategy {
    return Strategy.fromFields(Strategy.bcs.parse(data))
  }

  toJSONField(): StrategyJSONField {
    return {
      id: this.id,
      adminCapId: this.adminCapId,
      vaultAccess: fieldToJSON<Option<VaultAccess>>(
        `${Option.$typeName}<${VaultAccess.$typeName}>`,
        this.vaultAccess,
      ),
      scallopPoolAcc: this.scallopPoolAcc.toJSONField(),
      underlyingNominalValueUsdc: this.underlyingNominalValueUsdc.toString(),
      collectedProfitUsdc: this.collectedProfitUsdc.toJSONField(),
      collectedProfitSui: this.collectedProfitSui.toJSONField(),
      version: this.version.toString(),
    }
  }

  toJSON(): StrategyJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Strategy {
    return Strategy.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      adminCapId: decodeFromJSONField(ID.reified(), field.adminCapId),
      vaultAccess: decodeFromJSONField(Option.reified(VaultAccess.reified()), field.vaultAccess),
      scallopPoolAcc: decodeFromJSONField(
        SpoolAccount.reified(phantom(MarketCoin.reified(phantom(COIN.reified())))),
        field.scallopPoolAcc,
      ),
      underlyingNominalValueUsdc: decodeFromJSONField('u64', field.underlyingNominalValueUsdc),
      collectedProfitUsdc: decodeFromJSONField(
        Balance.reified(phantom(COIN.reified())),
        field.collectedProfitUsdc,
      ),
      collectedProfitSui: decodeFromJSONField(
        Balance.reified(phantom(SUI.reified())),
        field.collectedProfitSui,
      ),
      version: decodeFromJSONField('u64', field.version),
    })
  }

  static fromJSON(json: Record<string, any>): Strategy {
    if (json.$typeName !== Strategy.$typeName) {
      throw new Error(
        `not a Strategy json object: expected '${Strategy.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Strategy.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Strategy {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStrategy(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Strategy object`)
    }
    return Strategy.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Strategy {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStrategy(data.bcs.type)) {
        throw new Error(`object at is not a Strategy object`)
      }

      return Strategy.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Strategy.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: SupportedSuiClient, id: string): Promise<Strategy> {
    const res = await fetchObjectBcs(client, id)
    if (!isStrategy(res.type)) {
      throw new Error(`object at id ${id} is not a Strategy object`)
    }

    return Strategy.fromBcs(res.bcsBytes)
  }
}
