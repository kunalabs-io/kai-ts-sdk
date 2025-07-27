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
  phantom,
  ToTypeStr as ToPhantom,
} from '../../../../_framework/reified'
import { FieldsWithTypes, composeSuiType, compressSuiType } from '../../../../_framework/util'
import { TypeName } from '../../../../move-stdlib/type-name/structs'
import { UID } from '../../../../sui/object/structs'
import { AcTable } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/ac-table/structs'
import { WitTable } from '../../0x779b5c547976899f5474f3a5bc0db36ddf4697ad7e5a901db0415c2281d28162/wit-table/structs'
import { AssetActiveStates } from '../asset-active-state/structs'
import { BorrowDynamic, BorrowDynamics } from '../borrow-dynamics/structs'
import { CollateralStat, CollateralStats } from '../collateral-stats/structs'
import { RewardFactor, RewardFactors } from '../incentive-rewards/structs'
import { PKG_V1 } from '../index'
import { InterestModel, InterestModels } from '../interest-model/structs'
import { Limiter, Limiters } from '../limiter/structs'
import { Reserve } from '../reserve/structs'
import { RiskModel, RiskModels } from '../risk-model/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== Market =============================== */

export function isMarket(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::market::Market`
}

export interface MarketFields {
  id: ToField<UID>
  borrowDynamics: ToField<WitTable<ToPhantom<BorrowDynamics>, TypeName, ToPhantom<BorrowDynamic>>>
  collateralStats: ToField<
    WitTable<ToPhantom<CollateralStats>, TypeName, ToPhantom<CollateralStat>>
  >
  interestModels: ToField<AcTable<ToPhantom<InterestModels>, TypeName, ToPhantom<InterestModel>>>
  riskModels: ToField<AcTable<ToPhantom<RiskModels>, TypeName, ToPhantom<RiskModel>>>
  limiters: ToField<WitTable<ToPhantom<Limiters>, TypeName, ToPhantom<Limiter>>>
  rewardFactors: ToField<WitTable<ToPhantom<RewardFactors>, TypeName, ToPhantom<RewardFactor>>>
  assetActiveStates: ToField<AssetActiveStates>
  vault: ToField<Reserve>
}

export type MarketReified = Reified<Market, MarketFields>

export class Market implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::market::Market`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = Market.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::market::Market`
  readonly $typeArgs: []
  readonly $isPhantom = Market.$isPhantom

  readonly id: ToField<UID>
  readonly borrowDynamics: ToField<
    WitTable<ToPhantom<BorrowDynamics>, TypeName, ToPhantom<BorrowDynamic>>
  >
  readonly collateralStats: ToField<
    WitTable<ToPhantom<CollateralStats>, TypeName, ToPhantom<CollateralStat>>
  >
  readonly interestModels: ToField<
    AcTable<ToPhantom<InterestModels>, TypeName, ToPhantom<InterestModel>>
  >
  readonly riskModels: ToField<AcTable<ToPhantom<RiskModels>, TypeName, ToPhantom<RiskModel>>>
  readonly limiters: ToField<WitTable<ToPhantom<Limiters>, TypeName, ToPhantom<Limiter>>>
  readonly rewardFactors: ToField<
    WitTable<ToPhantom<RewardFactors>, TypeName, ToPhantom<RewardFactor>>
  >
  readonly assetActiveStates: ToField<AssetActiveStates>
  readonly vault: ToField<Reserve>

  private constructor(typeArgs: [], fields: MarketFields) {
    this.$fullTypeName = composeSuiType(
      Market.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::market::Market`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.borrowDynamics = fields.borrowDynamics
    this.collateralStats = fields.collateralStats
    this.interestModels = fields.interestModels
    this.riskModels = fields.riskModels
    this.limiters = fields.limiters
    this.rewardFactors = fields.rewardFactors
    this.assetActiveStates = fields.assetActiveStates
    this.vault = fields.vault
  }

  static reified(): MarketReified {
    const reifiedBcs = Market.bcs
    return {
      typeName: Market.$typeName,
      fullTypeName: composeSuiType(Market.$typeName, ...[]) as `${typeof PKG_V1}::market::Market`,
      typeArgs: [] as [],
      isPhantom: Market.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Market.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Market.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Market.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Market.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Market.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => Market.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Market.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => Market.fetch(client, id),
      new: (fields: MarketFields) => {
        return new Market([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Market.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Market>> {
    return phantom(Market.reified())
  }
  static get p() {
    return Market.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Market', {
      id: UID.bcs,
      borrow_dynamics: WitTable.bcs(TypeName.bcs),
      collateral_stats: WitTable.bcs(TypeName.bcs),
      interest_models: AcTable.bcs(TypeName.bcs),
      risk_models: AcTable.bcs(TypeName.bcs),
      limiters: WitTable.bcs(TypeName.bcs),
      reward_factors: WitTable.bcs(TypeName.bcs),
      asset_active_states: AssetActiveStates.bcs,
      vault: Reserve.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Market.instantiateBcs> | null = null

  static get bcs() {
    if (!Market.cachedBcs) {
      Market.cachedBcs = Market.instantiateBcs()
    }
    return Market.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Market {
    return Market.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      borrowDynamics: decodeFromFields(
        WitTable.reified(
          reified.phantom(BorrowDynamics.reified()),
          TypeName.reified(),
          reified.phantom(BorrowDynamic.reified())
        ),
        fields.borrow_dynamics
      ),
      collateralStats: decodeFromFields(
        WitTable.reified(
          reified.phantom(CollateralStats.reified()),
          TypeName.reified(),
          reified.phantom(CollateralStat.reified())
        ),
        fields.collateral_stats
      ),
      interestModels: decodeFromFields(
        AcTable.reified(
          reified.phantom(InterestModels.reified()),
          TypeName.reified(),
          reified.phantom(InterestModel.reified())
        ),
        fields.interest_models
      ),
      riskModels: decodeFromFields(
        AcTable.reified(
          reified.phantom(RiskModels.reified()),
          TypeName.reified(),
          reified.phantom(RiskModel.reified())
        ),
        fields.risk_models
      ),
      limiters: decodeFromFields(
        WitTable.reified(
          reified.phantom(Limiters.reified()),
          TypeName.reified(),
          reified.phantom(Limiter.reified())
        ),
        fields.limiters
      ),
      rewardFactors: decodeFromFields(
        WitTable.reified(
          reified.phantom(RewardFactors.reified()),
          TypeName.reified(),
          reified.phantom(RewardFactor.reified())
        ),
        fields.reward_factors
      ),
      assetActiveStates: decodeFromFields(AssetActiveStates.reified(), fields.asset_active_states),
      vault: decodeFromFields(Reserve.reified(), fields.vault),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Market {
    if (!isMarket(item.type)) {
      throw new Error('not a Market type')
    }

    return Market.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      borrowDynamics: decodeFromFieldsWithTypes(
        WitTable.reified(
          reified.phantom(BorrowDynamics.reified()),
          TypeName.reified(),
          reified.phantom(BorrowDynamic.reified())
        ),
        item.fields.borrow_dynamics
      ),
      collateralStats: decodeFromFieldsWithTypes(
        WitTable.reified(
          reified.phantom(CollateralStats.reified()),
          TypeName.reified(),
          reified.phantom(CollateralStat.reified())
        ),
        item.fields.collateral_stats
      ),
      interestModels: decodeFromFieldsWithTypes(
        AcTable.reified(
          reified.phantom(InterestModels.reified()),
          TypeName.reified(),
          reified.phantom(InterestModel.reified())
        ),
        item.fields.interest_models
      ),
      riskModels: decodeFromFieldsWithTypes(
        AcTable.reified(
          reified.phantom(RiskModels.reified()),
          TypeName.reified(),
          reified.phantom(RiskModel.reified())
        ),
        item.fields.risk_models
      ),
      limiters: decodeFromFieldsWithTypes(
        WitTable.reified(
          reified.phantom(Limiters.reified()),
          TypeName.reified(),
          reified.phantom(Limiter.reified())
        ),
        item.fields.limiters
      ),
      rewardFactors: decodeFromFieldsWithTypes(
        WitTable.reified(
          reified.phantom(RewardFactors.reified()),
          TypeName.reified(),
          reified.phantom(RewardFactor.reified())
        ),
        item.fields.reward_factors
      ),
      assetActiveStates: decodeFromFieldsWithTypes(
        AssetActiveStates.reified(),
        item.fields.asset_active_states
      ),
      vault: decodeFromFieldsWithTypes(Reserve.reified(), item.fields.vault),
    })
  }

  static fromBcs(data: Uint8Array): Market {
    return Market.fromFields(Market.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      borrowDynamics: this.borrowDynamics.toJSONField(),
      collateralStats: this.collateralStats.toJSONField(),
      interestModels: this.interestModels.toJSONField(),
      riskModels: this.riskModels.toJSONField(),
      limiters: this.limiters.toJSONField(),
      rewardFactors: this.rewardFactors.toJSONField(),
      assetActiveStates: this.assetActiveStates.toJSONField(),
      vault: this.vault.toJSONField(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Market {
    return Market.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      borrowDynamics: decodeFromJSONField(
        WitTable.reified(
          reified.phantom(BorrowDynamics.reified()),
          TypeName.reified(),
          reified.phantom(BorrowDynamic.reified())
        ),
        field.borrowDynamics
      ),
      collateralStats: decodeFromJSONField(
        WitTable.reified(
          reified.phantom(CollateralStats.reified()),
          TypeName.reified(),
          reified.phantom(CollateralStat.reified())
        ),
        field.collateralStats
      ),
      interestModels: decodeFromJSONField(
        AcTable.reified(
          reified.phantom(InterestModels.reified()),
          TypeName.reified(),
          reified.phantom(InterestModel.reified())
        ),
        field.interestModels
      ),
      riskModels: decodeFromJSONField(
        AcTable.reified(
          reified.phantom(RiskModels.reified()),
          TypeName.reified(),
          reified.phantom(RiskModel.reified())
        ),
        field.riskModels
      ),
      limiters: decodeFromJSONField(
        WitTable.reified(
          reified.phantom(Limiters.reified()),
          TypeName.reified(),
          reified.phantom(Limiter.reified())
        ),
        field.limiters
      ),
      rewardFactors: decodeFromJSONField(
        WitTable.reified(
          reified.phantom(RewardFactors.reified()),
          TypeName.reified(),
          reified.phantom(RewardFactor.reified())
        ),
        field.rewardFactors
      ),
      assetActiveStates: decodeFromJSONField(AssetActiveStates.reified(), field.assetActiveStates),
      vault: decodeFromJSONField(Reserve.reified(), field.vault),
    })
  }

  static fromJSON(json: Record<string, any>): Market {
    if (json.$typeName !== Market.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return Market.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): Market {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isMarket(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Market object`)
    }
    return Market.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): Market {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isMarket(data.bcs.type)) {
        throw new Error(`object at is not a Market object`)
      }

      return Market.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Market.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<Market> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Market object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isMarket(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Market object`)
    }

    return Market.fromSuiObjectData(res.data)
  }
}
