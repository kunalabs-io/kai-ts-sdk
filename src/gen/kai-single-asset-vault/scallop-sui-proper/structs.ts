import * as reified from '../../_framework/reified'
import { SpoolAccount } from '../../_dependencies/source/0xe87f1b2d498106a2c61421cec75b7b5c5e348512b0dc263949a0e7a3c256571a/spool-account/structs'
import { MarketCoin } from '../../_dependencies/source/0xefe8b36d5b2e43728cc323298626b83177803521d195cfb11e15b910e892fddf/reserve/structs'
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
} from '../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../_framework/util'
import { Option } from '../../move-stdlib/option/structs'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { SUI } from '../../sui/sui/structs'
import { PKG_V5 } from '../index'
import { VaultAccess } from '../vault/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V5}::scallop_sui_proper::AdminCap`
}

export interface AdminCapFields {
  id: ToField<UID>
}

export type AdminCapReified = Reified<AdminCap, AdminCapFields>

export class AdminCap implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V5}::scallop_sui_proper::AdminCap`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = AdminCap.$typeName
  readonly $fullTypeName: `${typeof PKG_V5}::scallop_sui_proper::AdminCap`
  readonly $typeArgs: []
  readonly $isPhantom = AdminCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: AdminCapFields) {
    this.$fullTypeName = composeSuiType(
      AdminCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V5}::scallop_sui_proper::AdminCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): AdminCapReified {
    const reifiedBcs = AdminCap.bcs
    return {
      typeName: AdminCap.$typeName,
      fullTypeName: composeSuiType(
        AdminCap.$typeName,
        ...[]
      ) as `${typeof PKG_V5}::scallop_sui_proper::AdminCap`,
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
  return type === `${PKG_V5}::scallop_sui_proper::Strategy`
}

export interface StrategyFields {
  id: ToField<UID>
  adminCapId: ToField<ID>
  vaultAccess: ToField<Option<VaultAccess>>
  scallopPoolAcc: ToField<SpoolAccount<ToPhantom<MarketCoin<ToPhantom<SUI>>>>>
  underlyingNominalValueSui: ToField<'u64'>
  collectedProfitSui: ToField<Balance<ToPhantom<SUI>>>
  version: ToField<'u64'>
}

export type StrategyReified = Reified<Strategy, StrategyFields>

export class Strategy implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V5}::scallop_sui_proper::Strategy`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Strategy.$typeName
  readonly $fullTypeName: `${typeof PKG_V5}::scallop_sui_proper::Strategy`
  readonly $typeArgs: []
  readonly $isPhantom = Strategy.$isPhantom

  readonly id: ToField<UID>
  readonly adminCapId: ToField<ID>
  readonly vaultAccess: ToField<Option<VaultAccess>>
  readonly scallopPoolAcc: ToField<SpoolAccount<ToPhantom<MarketCoin<ToPhantom<SUI>>>>>
  readonly underlyingNominalValueSui: ToField<'u64'>
  readonly collectedProfitSui: ToField<Balance<ToPhantom<SUI>>>
  readonly version: ToField<'u64'>

  private constructor(typeArgs: [], fields: StrategyFields) {
    this.$fullTypeName = composeSuiType(
      Strategy.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V5}::scallop_sui_proper::Strategy`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.adminCapId = fields.adminCapId
    this.vaultAccess = fields.vaultAccess
    this.scallopPoolAcc = fields.scallopPoolAcc
    this.underlyingNominalValueSui = fields.underlyingNominalValueSui
    this.collectedProfitSui = fields.collectedProfitSui
    this.version = fields.version
  }

  static reified(): StrategyReified {
    const reifiedBcs = Strategy.bcs
    return {
      typeName: Strategy.$typeName,
      fullTypeName: composeSuiType(
        Strategy.$typeName,
        ...[]
      ) as `${typeof PKG_V5}::scallop_sui_proper::Strategy`,
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
      fetch: async (client: SuiClient, id: string) => Strategy.fetch(client, id),
      new: (fields: StrategyFields) => {
        return new Strategy([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Strategy.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Strategy>> {
    return phantom(Strategy.reified())
  }
  static get p() {
    return Strategy.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Strategy', {
      id: UID.bcs,
      admin_cap_id: ID.bcs,
      vault_access: Option.bcs(VaultAccess.bcs),
      scallop_pool_acc: SpoolAccount.bcs,
      underlying_nominal_value_sui: bcs.u64(),
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
        SpoolAccount.reified(reified.phantom(MarketCoin.reified(reified.phantom(SUI.reified())))),
        fields.scallop_pool_acc
      ),
      underlyingNominalValueSui: decodeFromFields('u64', fields.underlying_nominal_value_sui),
      collectedProfitSui: decodeFromFields(
        Balance.reified(reified.phantom(SUI.reified())),
        fields.collected_profit_sui
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
        item.fields.vault_access
      ),
      scallopPoolAcc: decodeFromFieldsWithTypes(
        SpoolAccount.reified(reified.phantom(MarketCoin.reified(reified.phantom(SUI.reified())))),
        item.fields.scallop_pool_acc
      ),
      underlyingNominalValueSui: decodeFromFieldsWithTypes(
        'u64',
        item.fields.underlying_nominal_value_sui
      ),
      collectedProfitSui: decodeFromFieldsWithTypes(
        Balance.reified(reified.phantom(SUI.reified())),
        item.fields.collected_profit_sui
      ),
      version: decodeFromFieldsWithTypes('u64', item.fields.version),
    })
  }

  static fromBcs(data: Uint8Array): Strategy {
    return Strategy.fromFields(Strategy.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      adminCapId: this.adminCapId,
      vaultAccess: fieldToJSON<Option<VaultAccess>>(
        `${Option.$typeName}<${VaultAccess.$typeName}>`,
        this.vaultAccess
      ),
      scallopPoolAcc: this.scallopPoolAcc.toJSONField(),
      underlyingNominalValueSui: this.underlyingNominalValueSui.toString(),
      collectedProfitSui: this.collectedProfitSui.toJSONField(),
      version: this.version.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Strategy {
    return Strategy.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      adminCapId: decodeFromJSONField(ID.reified(), field.adminCapId),
      vaultAccess: decodeFromJSONField(Option.reified(VaultAccess.reified()), field.vaultAccess),
      scallopPoolAcc: decodeFromJSONField(
        SpoolAccount.reified(reified.phantom(MarketCoin.reified(reified.phantom(SUI.reified())))),
        field.scallopPoolAcc
      ),
      underlyingNominalValueSui: decodeFromJSONField('u64', field.underlyingNominalValueSui),
      collectedProfitSui: decodeFromJSONField(
        Balance.reified(reified.phantom(SUI.reified())),
        field.collectedProfitSui
      ),
      version: decodeFromJSONField('u64', field.version),
    })
  }

  static fromJSON(json: Record<string, any>): Strategy {
    if (json.$typeName !== Strategy.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
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

      return Strategy.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Strategy.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Strategy> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Strategy object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isStrategy(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Strategy object`)
    }

    return Strategy.fromSuiObjectData(res.data)
  }
}
