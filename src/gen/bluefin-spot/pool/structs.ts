import * as reified from '../../_framework/reified'
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
import { Vector } from '../../_framework/vector'
import { I32 } from '../../integer-mate/i32/structs'
import { String } from '../../move-stdlib/string/structs'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { PKG_V1 } from '../index'
import { ObservationManager } from '../oracle/structs'
import { TickManager } from '../tick/structs'
import { bcs } from '@mysten/sui/bcs'
import { SuiClient, SuiObjectData, SuiParsedData } from '@mysten/sui/client'
import { fromB64 } from '@mysten/sui/utils'

/* ============================== FlashSwapReceipt =============================== */

export function isFlashSwapReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::pool::FlashSwapReceipt` + '<')
}

export interface FlashSwapReceiptFields<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> {
  poolId: ToField<ID>
  a2B: ToField<'bool'>
  payAmount: ToField<'u64'>
}

export type FlashSwapReceiptReified<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = Reified<FlashSwapReceipt<CoinTypeA, CoinTypeB>, FlashSwapReceiptFields<CoinTypeA, CoinTypeB>>

export class FlashSwapReceipt<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::FlashSwapReceipt`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = FlashSwapReceipt.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::FlashSwapReceipt<${PhantomToTypeStr<CoinTypeA>}, ${PhantomToTypeStr<CoinTypeB>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>]
  readonly $isPhantom = FlashSwapReceipt.$isPhantom

  readonly poolId: ToField<ID>
  readonly a2B: ToField<'bool'>
  readonly payAmount: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>],
    fields: FlashSwapReceiptFields<CoinTypeA, CoinTypeB>
  ) {
    this.$fullTypeName = composeSuiType(
      FlashSwapReceipt.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::FlashSwapReceipt<${PhantomToTypeStr<CoinTypeA>}, ${PhantomToTypeStr<CoinTypeB>}>`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.a2B = fields.a2B
    this.payAmount = fields.payAmount
  }

  static reified<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB
  ): FlashSwapReceiptReified<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return {
      typeName: FlashSwapReceipt.$typeName,
      fullTypeName: composeSuiType(
        FlashSwapReceipt.$typeName,
        ...[extractType(CoinTypeA), extractType(CoinTypeB)]
      ) as `${typeof PKG_V1}::pool::FlashSwapReceipt<${PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeA>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>}>`,
      typeArgs: [extractType(CoinTypeA), extractType(CoinTypeB)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeA>>,
        PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>,
      ],
      isPhantom: FlashSwapReceipt.$isPhantom,
      reifiedTypeArgs: [CoinTypeA, CoinTypeB],
      fromFields: (fields: Record<string, any>) =>
        FlashSwapReceipt.fromFields([CoinTypeA, CoinTypeB], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        FlashSwapReceipt.fromFieldsWithTypes([CoinTypeA, CoinTypeB], item),
      fromBcs: (data: Uint8Array) => FlashSwapReceipt.fromBcs([CoinTypeA, CoinTypeB], data),
      bcs: FlashSwapReceipt.bcs,
      fromJSONField: (field: any) => FlashSwapReceipt.fromJSONField([CoinTypeA, CoinTypeB], field),
      fromJSON: (json: Record<string, any>) =>
        FlashSwapReceipt.fromJSON([CoinTypeA, CoinTypeB], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        FlashSwapReceipt.fromSuiParsedData([CoinTypeA, CoinTypeB], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        FlashSwapReceipt.fromSuiObjectData([CoinTypeA, CoinTypeB], content),
      fetch: async (client: SuiClient, id: string) =>
        FlashSwapReceipt.fetch(client, [CoinTypeA, CoinTypeB], id),
      new: (
        fields: FlashSwapReceiptFields<
          ToPhantomTypeArgument<CoinTypeA>,
          ToPhantomTypeArgument<CoinTypeB>
        >
      ) => {
        return new FlashSwapReceipt([extractType(CoinTypeA), extractType(CoinTypeB)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return FlashSwapReceipt.reified
  }

  static phantom<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB
  ): PhantomReified<
    ToTypeStr<FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>>
  > {
    return phantom(FlashSwapReceipt.reified(CoinTypeA, CoinTypeB))
  }
  static get p() {
    return FlashSwapReceipt.phantom
  }

  static get bcs() {
    return bcs.struct('FlashSwapReceipt', {
      pool_id: ID.bcs,
      a2b: bcs.bool(),
      pay_amount: bcs.u64(),
    })
  }

  static fromFields<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    fields: Record<string, any>
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return FlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      a2B: decodeFromFields('bool', fields.a2b),
      payAmount: decodeFromFields('u64', fields.pay_amount),
    })
  }

  static fromFieldsWithTypes<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    item: FieldsWithTypes
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (!isFlashSwapReceipt(item.type)) {
      throw new Error('not a FlashSwapReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return FlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      a2B: decodeFromFieldsWithTypes('bool', item.fields.a2b),
      payAmount: decodeFromFieldsWithTypes('u64', item.fields.pay_amount),
    })
  }

  static fromBcs<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: Uint8Array
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return FlashSwapReceipt.fromFields(typeArgs, FlashSwapReceipt.bcs.parse(data))
  }

  toJSONField() {
    return {
      poolId: this.poolId,
      a2B: this.a2B,
      payAmount: this.payAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    field: any
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return FlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      a2B: decodeFromJSONField('bool', field.a2B),
      payAmount: decodeFromJSONField('u64', field.payAmount),
    })
  }

  static fromJSON<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    json: Record<string, any>
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (json.$typeName !== FlashSwapReceipt.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(FlashSwapReceipt.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return FlashSwapReceipt.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    content: SuiParsedData
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashSwapReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashSwapReceipt object`)
    }
    return FlashSwapReceipt.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: SuiObjectData
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashSwapReceipt(data.bcs.type)) {
        throw new Error(`object at is not a FlashSwapReceipt object`)
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

      return FlashSwapReceipt.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashSwapReceipt.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [CoinTypeA, CoinTypeB],
    id: string
  ): Promise<FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching FlashSwapReceipt object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isFlashSwapReceipt(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a FlashSwapReceipt object`)
    }

    return FlashSwapReceipt.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== Pool =============================== */

export function isPool(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${PKG_V1}::pool::Pool` + '<')
}

export interface PoolFields<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> {
  id: ToField<UID>
  name: ToField<String>
  coinA: ToField<Balance<CoinTypeA>>
  coinB: ToField<Balance<CoinTypeB>>
  feeRate: ToField<'u64'>
  protocolFeeShare: ToField<'u64'>
  feeGrowthGlobalCoinA: ToField<'u128'>
  feeGrowthGlobalCoinB: ToField<'u128'>
  protocolFeeCoinA: ToField<'u64'>
  protocolFeeCoinB: ToField<'u64'>
  ticksManager: ToField<TickManager>
  observationsManager: ToField<ObservationManager>
  currentSqrtPrice: ToField<'u128'>
  currentTickIndex: ToField<I32>
  liquidity: ToField<'u128'>
  rewardInfos: ToField<Vector<PoolRewardInfo>>
  isPaused: ToField<'bool'>
  iconUrl: ToField<String>
  positionIndex: ToField<'u128'>
  sequenceNumber: ToField<'u128'>
}

export type PoolReified<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = Reified<Pool<CoinTypeA, CoinTypeB>, PoolFields<CoinTypeA, CoinTypeB>>

export class Pool<CoinTypeA extends PhantomTypeArgument, CoinTypeB extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::Pool`
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName = Pool.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::Pool<${PhantomToTypeStr<CoinTypeA>}, ${PhantomToTypeStr<CoinTypeB>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>]
  readonly $isPhantom = Pool.$isPhantom

  readonly id: ToField<UID>
  readonly name: ToField<String>
  readonly coinA: ToField<Balance<CoinTypeA>>
  readonly coinB: ToField<Balance<CoinTypeB>>
  readonly feeRate: ToField<'u64'>
  readonly protocolFeeShare: ToField<'u64'>
  readonly feeGrowthGlobalCoinA: ToField<'u128'>
  readonly feeGrowthGlobalCoinB: ToField<'u128'>
  readonly protocolFeeCoinA: ToField<'u64'>
  readonly protocolFeeCoinB: ToField<'u64'>
  readonly ticksManager: ToField<TickManager>
  readonly observationsManager: ToField<ObservationManager>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly currentTickIndex: ToField<I32>
  readonly liquidity: ToField<'u128'>
  readonly rewardInfos: ToField<Vector<PoolRewardInfo>>
  readonly isPaused: ToField<'bool'>
  readonly iconUrl: ToField<String>
  readonly positionIndex: ToField<'u128'>
  readonly sequenceNumber: ToField<'u128'>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>],
    fields: PoolFields<CoinTypeA, CoinTypeB>
  ) {
    this.$fullTypeName = composeSuiType(
      Pool.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::Pool<${PhantomToTypeStr<CoinTypeA>}, ${PhantomToTypeStr<CoinTypeB>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.name = fields.name
    this.coinA = fields.coinA
    this.coinB = fields.coinB
    this.feeRate = fields.feeRate
    this.protocolFeeShare = fields.protocolFeeShare
    this.feeGrowthGlobalCoinA = fields.feeGrowthGlobalCoinA
    this.feeGrowthGlobalCoinB = fields.feeGrowthGlobalCoinB
    this.protocolFeeCoinA = fields.protocolFeeCoinA
    this.protocolFeeCoinB = fields.protocolFeeCoinB
    this.ticksManager = fields.ticksManager
    this.observationsManager = fields.observationsManager
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.currentTickIndex = fields.currentTickIndex
    this.liquidity = fields.liquidity
    this.rewardInfos = fields.rewardInfos
    this.isPaused = fields.isPaused
    this.iconUrl = fields.iconUrl
    this.positionIndex = fields.positionIndex
    this.sequenceNumber = fields.sequenceNumber
  }

  static reified<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB
  ): PoolReified<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return {
      typeName: Pool.$typeName,
      fullTypeName: composeSuiType(
        Pool.$typeName,
        ...[extractType(CoinTypeA), extractType(CoinTypeB)]
      ) as `${typeof PKG_V1}::pool::Pool<${PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeA>>}, ${PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>}>`,
      typeArgs: [extractType(CoinTypeA), extractType(CoinTypeB)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeA>>,
        PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>,
      ],
      isPhantom: Pool.$isPhantom,
      reifiedTypeArgs: [CoinTypeA, CoinTypeB],
      fromFields: (fields: Record<string, any>) => Pool.fromFields([CoinTypeA, CoinTypeB], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Pool.fromFieldsWithTypes([CoinTypeA, CoinTypeB], item),
      fromBcs: (data: Uint8Array) => Pool.fromBcs([CoinTypeA, CoinTypeB], data),
      bcs: Pool.bcs,
      fromJSONField: (field: any) => Pool.fromJSONField([CoinTypeA, CoinTypeB], field),
      fromJSON: (json: Record<string, any>) => Pool.fromJSON([CoinTypeA, CoinTypeB], json),
      fromSuiParsedData: (content: SuiParsedData) =>
        Pool.fromSuiParsedData([CoinTypeA, CoinTypeB], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        Pool.fromSuiObjectData([CoinTypeA, CoinTypeB], content),
      fetch: async (client: SuiClient, id: string) =>
        Pool.fetch(client, [CoinTypeA, CoinTypeB], id),
      new: (
        fields: PoolFields<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>
      ) => {
        return new Pool([extractType(CoinTypeA), extractType(CoinTypeB)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return Pool.reified
  }

  static phantom<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB
  ): PhantomReified<
    ToTypeStr<Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>>
  > {
    return phantom(Pool.reified(CoinTypeA, CoinTypeB))
  }
  static get p() {
    return Pool.phantom
  }

  static get bcs() {
    return bcs.struct('Pool', {
      id: UID.bcs,
      name: String.bcs,
      coin_a: Balance.bcs,
      coin_b: Balance.bcs,
      fee_rate: bcs.u64(),
      protocol_fee_share: bcs.u64(),
      fee_growth_global_coin_a: bcs.u128(),
      fee_growth_global_coin_b: bcs.u128(),
      protocol_fee_coin_a: bcs.u64(),
      protocol_fee_coin_b: bcs.u64(),
      ticks_manager: TickManager.bcs,
      observations_manager: ObservationManager.bcs,
      current_sqrt_price: bcs.u128(),
      current_tick_index: I32.bcs,
      liquidity: bcs.u128(),
      reward_infos: bcs.vector(PoolRewardInfo.bcs),
      is_paused: bcs.bool(),
      icon_url: String.bcs,
      position_index: bcs.u128(),
      sequence_number: bcs.u128(),
    })
  }

  static fromFields<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    fields: Record<string, any>
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      name: decodeFromFields(String.reified(), fields.name),
      coinA: decodeFromFields(Balance.reified(typeArgs[0]), fields.coin_a),
      coinB: decodeFromFields(Balance.reified(typeArgs[1]), fields.coin_b),
      feeRate: decodeFromFields('u64', fields.fee_rate),
      protocolFeeShare: decodeFromFields('u64', fields.protocol_fee_share),
      feeGrowthGlobalCoinA: decodeFromFields('u128', fields.fee_growth_global_coin_a),
      feeGrowthGlobalCoinB: decodeFromFields('u128', fields.fee_growth_global_coin_b),
      protocolFeeCoinA: decodeFromFields('u64', fields.protocol_fee_coin_a),
      protocolFeeCoinB: decodeFromFields('u64', fields.protocol_fee_coin_b),
      ticksManager: decodeFromFields(TickManager.reified(), fields.ticks_manager),
      observationsManager: decodeFromFields(
        ObservationManager.reified(),
        fields.observations_manager
      ),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      currentTickIndex: decodeFromFields(I32.reified(), fields.current_tick_index),
      liquidity: decodeFromFields('u128', fields.liquidity),
      rewardInfos: decodeFromFields(reified.vector(PoolRewardInfo.reified()), fields.reward_infos),
      isPaused: decodeFromFields('bool', fields.is_paused),
      iconUrl: decodeFromFields(String.reified(), fields.icon_url),
      positionIndex: decodeFromFields('u128', fields.position_index),
      sequenceNumber: decodeFromFields('u128', fields.sequence_number),
    })
  }

  static fromFieldsWithTypes<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    item: FieldsWithTypes
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (!isPool(item.type)) {
      throw new Error('not a Pool type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      name: decodeFromFieldsWithTypes(String.reified(), item.fields.name),
      coinA: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.coin_a),
      coinB: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.coin_b),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
      protocolFeeShare: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_share),
      feeGrowthGlobalCoinA: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_global_coin_a),
      feeGrowthGlobalCoinB: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_global_coin_b),
      protocolFeeCoinA: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_coin_a),
      protocolFeeCoinB: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee_coin_b),
      ticksManager: decodeFromFieldsWithTypes(TickManager.reified(), item.fields.ticks_manager),
      observationsManager: decodeFromFieldsWithTypes(
        ObservationManager.reified(),
        item.fields.observations_manager
      ),
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      currentTickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.current_tick_index),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      rewardInfos: decodeFromFieldsWithTypes(
        reified.vector(PoolRewardInfo.reified()),
        item.fields.reward_infos
      ),
      isPaused: decodeFromFieldsWithTypes('bool', item.fields.is_paused),
      iconUrl: decodeFromFieldsWithTypes(String.reified(), item.fields.icon_url),
      positionIndex: decodeFromFieldsWithTypes('u128', item.fields.position_index),
      sequenceNumber: decodeFromFieldsWithTypes('u128', item.fields.sequence_number),
    })
  }

  static fromBcs<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: Uint8Array
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return Pool.fromFields(typeArgs, Pool.bcs.parse(data))
  }

  toJSONField() {
    return {
      id: this.id,
      name: this.name,
      coinA: this.coinA.toJSONField(),
      coinB: this.coinB.toJSONField(),
      feeRate: this.feeRate.toString(),
      protocolFeeShare: this.protocolFeeShare.toString(),
      feeGrowthGlobalCoinA: this.feeGrowthGlobalCoinA.toString(),
      feeGrowthGlobalCoinB: this.feeGrowthGlobalCoinB.toString(),
      protocolFeeCoinA: this.protocolFeeCoinA.toString(),
      protocolFeeCoinB: this.protocolFeeCoinB.toString(),
      ticksManager: this.ticksManager.toJSONField(),
      observationsManager: this.observationsManager.toJSONField(),
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      currentTickIndex: this.currentTickIndex.toJSONField(),
      liquidity: this.liquidity.toString(),
      rewardInfos: fieldToJSON<Vector<PoolRewardInfo>>(
        `vector<${PoolRewardInfo.$typeName}>`,
        this.rewardInfos
      ),
      isPaused: this.isPaused,
      iconUrl: this.iconUrl,
      positionIndex: this.positionIndex.toString(),
      sequenceNumber: this.sequenceNumber.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    field: any
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      name: decodeFromJSONField(String.reified(), field.name),
      coinA: decodeFromJSONField(Balance.reified(typeArgs[0]), field.coinA),
      coinB: decodeFromJSONField(Balance.reified(typeArgs[1]), field.coinB),
      feeRate: decodeFromJSONField('u64', field.feeRate),
      protocolFeeShare: decodeFromJSONField('u64', field.protocolFeeShare),
      feeGrowthGlobalCoinA: decodeFromJSONField('u128', field.feeGrowthGlobalCoinA),
      feeGrowthGlobalCoinB: decodeFromJSONField('u128', field.feeGrowthGlobalCoinB),
      protocolFeeCoinA: decodeFromJSONField('u64', field.protocolFeeCoinA),
      protocolFeeCoinB: decodeFromJSONField('u64', field.protocolFeeCoinB),
      ticksManager: decodeFromJSONField(TickManager.reified(), field.ticksManager),
      observationsManager: decodeFromJSONField(
        ObservationManager.reified(),
        field.observationsManager
      ),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      currentTickIndex: decodeFromJSONField(I32.reified(), field.currentTickIndex),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      rewardInfos: decodeFromJSONField(reified.vector(PoolRewardInfo.reified()), field.rewardInfos),
      isPaused: decodeFromJSONField('bool', field.isPaused),
      iconUrl: decodeFromJSONField(String.reified(), field.iconUrl),
      positionIndex: decodeFromJSONField('u128', field.positionIndex),
      sequenceNumber: decodeFromJSONField('u128', field.sequenceNumber),
    })
  }

  static fromJSON<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    json: Record<string, any>
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (json.$typeName !== Pool.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Pool.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs
    )

    return Pool.fromJSONField(typeArgs, json)
  }

  static fromSuiParsedData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    content: SuiParsedData
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Pool object`)
    }
    return Pool.fromFieldsWithTypes(typeArgs, content)
  }

  static fromSuiObjectData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: SuiObjectData
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPool(data.bcs.type)) {
        throw new Error(`object at is not a Pool object`)
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

      return Pool.fromBcs(typeArgs, fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Pool.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    client: SuiClient,
    typeArgs: [CoinTypeA, CoinTypeB],
    id: string
  ): Promise<Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching Pool object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPool(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a Pool object`)
    }

    return Pool.fromSuiObjectData(typeArgs, res.data)
  }
}

/* ============================== PoolRewardInfo =============================== */

export function isPoolRewardInfo(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::PoolRewardInfo`
}

export interface PoolRewardInfoFields {
  rewardCoinSymbol: ToField<String>
  rewardCoinDecimals: ToField<'u8'>
  rewardCoinType: ToField<String>
  lastUpdateTime: ToField<'u64'>
  endedAtSeconds: ToField<'u64'>
  totalReward: ToField<'u64'>
  totalRewardAllocated: ToField<'u64'>
  rewardPerSeconds: ToField<'u128'>
  rewardGrowthGlobal: ToField<'u128'>
}

export type PoolRewardInfoReified = Reified<PoolRewardInfo, PoolRewardInfoFields>

export class PoolRewardInfo implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::PoolRewardInfo`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = PoolRewardInfo.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::PoolRewardInfo`
  readonly $typeArgs: []
  readonly $isPhantom = PoolRewardInfo.$isPhantom

  readonly rewardCoinSymbol: ToField<String>
  readonly rewardCoinDecimals: ToField<'u8'>
  readonly rewardCoinType: ToField<String>
  readonly lastUpdateTime: ToField<'u64'>
  readonly endedAtSeconds: ToField<'u64'>
  readonly totalReward: ToField<'u64'>
  readonly totalRewardAllocated: ToField<'u64'>
  readonly rewardPerSeconds: ToField<'u128'>
  readonly rewardGrowthGlobal: ToField<'u128'>

  private constructor(typeArgs: [], fields: PoolRewardInfoFields) {
    this.$fullTypeName = composeSuiType(
      PoolRewardInfo.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::PoolRewardInfo`
    this.$typeArgs = typeArgs

    this.rewardCoinSymbol = fields.rewardCoinSymbol
    this.rewardCoinDecimals = fields.rewardCoinDecimals
    this.rewardCoinType = fields.rewardCoinType
    this.lastUpdateTime = fields.lastUpdateTime
    this.endedAtSeconds = fields.endedAtSeconds
    this.totalReward = fields.totalReward
    this.totalRewardAllocated = fields.totalRewardAllocated
    this.rewardPerSeconds = fields.rewardPerSeconds
    this.rewardGrowthGlobal = fields.rewardGrowthGlobal
  }

  static reified(): PoolRewardInfoReified {
    return {
      typeName: PoolRewardInfo.$typeName,
      fullTypeName: composeSuiType(
        PoolRewardInfo.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::PoolRewardInfo`,
      typeArgs: [] as [],
      isPhantom: PoolRewardInfo.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolRewardInfo.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolRewardInfo.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolRewardInfo.fromBcs(data),
      bcs: PoolRewardInfo.bcs,
      fromJSONField: (field: any) => PoolRewardInfo.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolRewardInfo.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => PoolRewardInfo.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolRewardInfo.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => PoolRewardInfo.fetch(client, id),
      new: (fields: PoolRewardInfoFields) => {
        return new PoolRewardInfo([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return PoolRewardInfo.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolRewardInfo>> {
    return phantom(PoolRewardInfo.reified())
  }
  static get p() {
    return PoolRewardInfo.phantom()
  }

  static get bcs() {
    return bcs.struct('PoolRewardInfo', {
      reward_coin_symbol: String.bcs,
      reward_coin_decimals: bcs.u8(),
      reward_coin_type: String.bcs,
      last_update_time: bcs.u64(),
      ended_at_seconds: bcs.u64(),
      total_reward: bcs.u64(),
      total_reward_allocated: bcs.u64(),
      reward_per_seconds: bcs.u128(),
      reward_growth_global: bcs.u128(),
    })
  }

  static fromFields(fields: Record<string, any>): PoolRewardInfo {
    return PoolRewardInfo.reified().new({
      rewardCoinSymbol: decodeFromFields(String.reified(), fields.reward_coin_symbol),
      rewardCoinDecimals: decodeFromFields('u8', fields.reward_coin_decimals),
      rewardCoinType: decodeFromFields(String.reified(), fields.reward_coin_type),
      lastUpdateTime: decodeFromFields('u64', fields.last_update_time),
      endedAtSeconds: decodeFromFields('u64', fields.ended_at_seconds),
      totalReward: decodeFromFields('u64', fields.total_reward),
      totalRewardAllocated: decodeFromFields('u64', fields.total_reward_allocated),
      rewardPerSeconds: decodeFromFields('u128', fields.reward_per_seconds),
      rewardGrowthGlobal: decodeFromFields('u128', fields.reward_growth_global),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolRewardInfo {
    if (!isPoolRewardInfo(item.type)) {
      throw new Error('not a PoolRewardInfo type')
    }

    return PoolRewardInfo.reified().new({
      rewardCoinSymbol: decodeFromFieldsWithTypes(String.reified(), item.fields.reward_coin_symbol),
      rewardCoinDecimals: decodeFromFieldsWithTypes('u8', item.fields.reward_coin_decimals),
      rewardCoinType: decodeFromFieldsWithTypes(String.reified(), item.fields.reward_coin_type),
      lastUpdateTime: decodeFromFieldsWithTypes('u64', item.fields.last_update_time),
      endedAtSeconds: decodeFromFieldsWithTypes('u64', item.fields.ended_at_seconds),
      totalReward: decodeFromFieldsWithTypes('u64', item.fields.total_reward),
      totalRewardAllocated: decodeFromFieldsWithTypes('u64', item.fields.total_reward_allocated),
      rewardPerSeconds: decodeFromFieldsWithTypes('u128', item.fields.reward_per_seconds),
      rewardGrowthGlobal: decodeFromFieldsWithTypes('u128', item.fields.reward_growth_global),
    })
  }

  static fromBcs(data: Uint8Array): PoolRewardInfo {
    return PoolRewardInfo.fromFields(PoolRewardInfo.bcs.parse(data))
  }

  toJSONField() {
    return {
      rewardCoinSymbol: this.rewardCoinSymbol,
      rewardCoinDecimals: this.rewardCoinDecimals,
      rewardCoinType: this.rewardCoinType,
      lastUpdateTime: this.lastUpdateTime.toString(),
      endedAtSeconds: this.endedAtSeconds.toString(),
      totalReward: this.totalReward.toString(),
      totalRewardAllocated: this.totalRewardAllocated.toString(),
      rewardPerSeconds: this.rewardPerSeconds.toString(),
      rewardGrowthGlobal: this.rewardGrowthGlobal.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolRewardInfo {
    return PoolRewardInfo.reified().new({
      rewardCoinSymbol: decodeFromJSONField(String.reified(), field.rewardCoinSymbol),
      rewardCoinDecimals: decodeFromJSONField('u8', field.rewardCoinDecimals),
      rewardCoinType: decodeFromJSONField(String.reified(), field.rewardCoinType),
      lastUpdateTime: decodeFromJSONField('u64', field.lastUpdateTime),
      endedAtSeconds: decodeFromJSONField('u64', field.endedAtSeconds),
      totalReward: decodeFromJSONField('u64', field.totalReward),
      totalRewardAllocated: decodeFromJSONField('u64', field.totalRewardAllocated),
      rewardPerSeconds: decodeFromJSONField('u128', field.rewardPerSeconds),
      rewardGrowthGlobal: decodeFromJSONField('u128', field.rewardGrowthGlobal),
    })
  }

  static fromJSON(json: Record<string, any>): PoolRewardInfo {
    if (json.$typeName !== PoolRewardInfo.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return PoolRewardInfo.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): PoolRewardInfo {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolRewardInfo(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolRewardInfo object`)
    }
    return PoolRewardInfo.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): PoolRewardInfo {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolRewardInfo(data.bcs.type)) {
        throw new Error(`object at is not a PoolRewardInfo object`)
      }

      return PoolRewardInfo.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolRewardInfo.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<PoolRewardInfo> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching PoolRewardInfo object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isPoolRewardInfo(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a PoolRewardInfo object`)
    }

    return PoolRewardInfo.fromSuiObjectData(res.data)
  }
}

/* ============================== SwapResult =============================== */

export function isSwapResult(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::SwapResult`
}

export interface SwapResultFields {
  a2B: ToField<'bool'>
  byAmountIn: ToField<'bool'>
  amountSpecified: ToField<'u64'>
  amountSpecifiedRemaining: ToField<'u64'>
  amountCalculated: ToField<'u64'>
  feeGrowthGlobal: ToField<'u128'>
  feeAmount: ToField<'u64'>
  protocolFee: ToField<'u64'>
  startSqrtPrice: ToField<'u128'>
  endSqrtPrice: ToField<'u128'>
  currentTickIndex: ToField<I32>
  isExceed: ToField<'bool'>
  startingLiquidity: ToField<'u128'>
  liquidity: ToField<'u128'>
  steps: ToField<'u64'>
  stepResults: ToField<Vector<SwapStepResult>>
}

export type SwapResultReified = Reified<SwapResult, SwapResultFields>

export class SwapResult implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::SwapResult`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SwapResult.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::SwapResult`
  readonly $typeArgs: []
  readonly $isPhantom = SwapResult.$isPhantom

  readonly a2B: ToField<'bool'>
  readonly byAmountIn: ToField<'bool'>
  readonly amountSpecified: ToField<'u64'>
  readonly amountSpecifiedRemaining: ToField<'u64'>
  readonly amountCalculated: ToField<'u64'>
  readonly feeGrowthGlobal: ToField<'u128'>
  readonly feeAmount: ToField<'u64'>
  readonly protocolFee: ToField<'u64'>
  readonly startSqrtPrice: ToField<'u128'>
  readonly endSqrtPrice: ToField<'u128'>
  readonly currentTickIndex: ToField<I32>
  readonly isExceed: ToField<'bool'>
  readonly startingLiquidity: ToField<'u128'>
  readonly liquidity: ToField<'u128'>
  readonly steps: ToField<'u64'>
  readonly stepResults: ToField<Vector<SwapStepResult>>

  private constructor(typeArgs: [], fields: SwapResultFields) {
    this.$fullTypeName = composeSuiType(
      SwapResult.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::SwapResult`
    this.$typeArgs = typeArgs

    this.a2B = fields.a2B
    this.byAmountIn = fields.byAmountIn
    this.amountSpecified = fields.amountSpecified
    this.amountSpecifiedRemaining = fields.amountSpecifiedRemaining
    this.amountCalculated = fields.amountCalculated
    this.feeGrowthGlobal = fields.feeGrowthGlobal
    this.feeAmount = fields.feeAmount
    this.protocolFee = fields.protocolFee
    this.startSqrtPrice = fields.startSqrtPrice
    this.endSqrtPrice = fields.endSqrtPrice
    this.currentTickIndex = fields.currentTickIndex
    this.isExceed = fields.isExceed
    this.startingLiquidity = fields.startingLiquidity
    this.liquidity = fields.liquidity
    this.steps = fields.steps
    this.stepResults = fields.stepResults
  }

  static reified(): SwapResultReified {
    return {
      typeName: SwapResult.$typeName,
      fullTypeName: composeSuiType(
        SwapResult.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::SwapResult`,
      typeArgs: [] as [],
      isPhantom: SwapResult.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwapResult.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwapResult.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwapResult.fromBcs(data),
      bcs: SwapResult.bcs,
      fromJSONField: (field: any) => SwapResult.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwapResult.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SwapResult.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwapResult.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SwapResult.fetch(client, id),
      new: (fields: SwapResultFields) => {
        return new SwapResult([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SwapResult.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwapResult>> {
    return phantom(SwapResult.reified())
  }
  static get p() {
    return SwapResult.phantom()
  }

  static get bcs() {
    return bcs.struct('SwapResult', {
      a2b: bcs.bool(),
      by_amount_in: bcs.bool(),
      amount_specified: bcs.u64(),
      amount_specified_remaining: bcs.u64(),
      amount_calculated: bcs.u64(),
      fee_growth_global: bcs.u128(),
      fee_amount: bcs.u64(),
      protocol_fee: bcs.u64(),
      start_sqrt_price: bcs.u128(),
      end_sqrt_price: bcs.u128(),
      current_tick_index: I32.bcs,
      is_exceed: bcs.bool(),
      starting_liquidity: bcs.u128(),
      liquidity: bcs.u128(),
      steps: bcs.u64(),
      step_results: bcs.vector(SwapStepResult.bcs),
    })
  }

  static fromFields(fields: Record<string, any>): SwapResult {
    return SwapResult.reified().new({
      a2B: decodeFromFields('bool', fields.a2b),
      byAmountIn: decodeFromFields('bool', fields.by_amount_in),
      amountSpecified: decodeFromFields('u64', fields.amount_specified),
      amountSpecifiedRemaining: decodeFromFields('u64', fields.amount_specified_remaining),
      amountCalculated: decodeFromFields('u64', fields.amount_calculated),
      feeGrowthGlobal: decodeFromFields('u128', fields.fee_growth_global),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      protocolFee: decodeFromFields('u64', fields.protocol_fee),
      startSqrtPrice: decodeFromFields('u128', fields.start_sqrt_price),
      endSqrtPrice: decodeFromFields('u128', fields.end_sqrt_price),
      currentTickIndex: decodeFromFields(I32.reified(), fields.current_tick_index),
      isExceed: decodeFromFields('bool', fields.is_exceed),
      startingLiquidity: decodeFromFields('u128', fields.starting_liquidity),
      liquidity: decodeFromFields('u128', fields.liquidity),
      steps: decodeFromFields('u64', fields.steps),
      stepResults: decodeFromFields(reified.vector(SwapStepResult.reified()), fields.step_results),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwapResult {
    if (!isSwapResult(item.type)) {
      throw new Error('not a SwapResult type')
    }

    return SwapResult.reified().new({
      a2B: decodeFromFieldsWithTypes('bool', item.fields.a2b),
      byAmountIn: decodeFromFieldsWithTypes('bool', item.fields.by_amount_in),
      amountSpecified: decodeFromFieldsWithTypes('u64', item.fields.amount_specified),
      amountSpecifiedRemaining: decodeFromFieldsWithTypes(
        'u64',
        item.fields.amount_specified_remaining
      ),
      amountCalculated: decodeFromFieldsWithTypes('u64', item.fields.amount_calculated),
      feeGrowthGlobal: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_global),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      protocolFee: decodeFromFieldsWithTypes('u64', item.fields.protocol_fee),
      startSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.start_sqrt_price),
      endSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.end_sqrt_price),
      currentTickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.current_tick_index),
      isExceed: decodeFromFieldsWithTypes('bool', item.fields.is_exceed),
      startingLiquidity: decodeFromFieldsWithTypes('u128', item.fields.starting_liquidity),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      steps: decodeFromFieldsWithTypes('u64', item.fields.steps),
      stepResults: decodeFromFieldsWithTypes(
        reified.vector(SwapStepResult.reified()),
        item.fields.step_results
      ),
    })
  }

  static fromBcs(data: Uint8Array): SwapResult {
    return SwapResult.fromFields(SwapResult.bcs.parse(data))
  }

  toJSONField() {
    return {
      a2B: this.a2B,
      byAmountIn: this.byAmountIn,
      amountSpecified: this.amountSpecified.toString(),
      amountSpecifiedRemaining: this.amountSpecifiedRemaining.toString(),
      amountCalculated: this.amountCalculated.toString(),
      feeGrowthGlobal: this.feeGrowthGlobal.toString(),
      feeAmount: this.feeAmount.toString(),
      protocolFee: this.protocolFee.toString(),
      startSqrtPrice: this.startSqrtPrice.toString(),
      endSqrtPrice: this.endSqrtPrice.toString(),
      currentTickIndex: this.currentTickIndex.toJSONField(),
      isExceed: this.isExceed,
      startingLiquidity: this.startingLiquidity.toString(),
      liquidity: this.liquidity.toString(),
      steps: this.steps.toString(),
      stepResults: fieldToJSON<Vector<SwapStepResult>>(
        `vector<${SwapStepResult.$typeName}>`,
        this.stepResults
      ),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwapResult {
    return SwapResult.reified().new({
      a2B: decodeFromJSONField('bool', field.a2B),
      byAmountIn: decodeFromJSONField('bool', field.byAmountIn),
      amountSpecified: decodeFromJSONField('u64', field.amountSpecified),
      amountSpecifiedRemaining: decodeFromJSONField('u64', field.amountSpecifiedRemaining),
      amountCalculated: decodeFromJSONField('u64', field.amountCalculated),
      feeGrowthGlobal: decodeFromJSONField('u128', field.feeGrowthGlobal),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      protocolFee: decodeFromJSONField('u64', field.protocolFee),
      startSqrtPrice: decodeFromJSONField('u128', field.startSqrtPrice),
      endSqrtPrice: decodeFromJSONField('u128', field.endSqrtPrice),
      currentTickIndex: decodeFromJSONField(I32.reified(), field.currentTickIndex),
      isExceed: decodeFromJSONField('bool', field.isExceed),
      startingLiquidity: decodeFromJSONField('u128', field.startingLiquidity),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      steps: decodeFromJSONField('u64', field.steps),
      stepResults: decodeFromJSONField(reified.vector(SwapStepResult.reified()), field.stepResults),
    })
  }

  static fromJSON(json: Record<string, any>): SwapResult {
    if (json.$typeName !== SwapResult.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SwapResult.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SwapResult {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwapResult(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwapResult object`)
    }
    return SwapResult.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SwapResult {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwapResult(data.bcs.type)) {
        throw new Error(`object at is not a SwapResult object`)
      }

      return SwapResult.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwapResult.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SwapResult> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SwapResult object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSwapResult(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SwapResult object`)
    }

    return SwapResult.fromSuiObjectData(res.data)
  }
}

/* ============================== SwapStepResult =============================== */

export function isSwapStepResult(type: string): boolean {
  type = compressSuiType(type)
  return type === `${PKG_V1}::pool::SwapStepResult`
}

export interface SwapStepResultFields {
  tickIndexNext: ToField<I32>
  initialized: ToField<'bool'>
  sqrtPriceStart: ToField<'u128'>
  sqrtPriceNext: ToField<'u128'>
  amountIn: ToField<'u64'>
  amountOut: ToField<'u64'>
  feeAmount: ToField<'u64'>
  remainingAmount: ToField<'u64'>
}

export type SwapStepResultReified = Reified<SwapStepResult, SwapStepResultFields>

export class SwapStepResult implements StructClass {
  __StructClass = true as const

  static readonly $typeName = `${PKG_V1}::pool::SwapStepResult`
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName = SwapStepResult.$typeName
  readonly $fullTypeName: `${typeof PKG_V1}::pool::SwapStepResult`
  readonly $typeArgs: []
  readonly $isPhantom = SwapStepResult.$isPhantom

  readonly tickIndexNext: ToField<I32>
  readonly initialized: ToField<'bool'>
  readonly sqrtPriceStart: ToField<'u128'>
  readonly sqrtPriceNext: ToField<'u128'>
  readonly amountIn: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly feeAmount: ToField<'u64'>
  readonly remainingAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: SwapStepResultFields) {
    this.$fullTypeName = composeSuiType(
      SwapStepResult.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::pool::SwapStepResult`
    this.$typeArgs = typeArgs

    this.tickIndexNext = fields.tickIndexNext
    this.initialized = fields.initialized
    this.sqrtPriceStart = fields.sqrtPriceStart
    this.sqrtPriceNext = fields.sqrtPriceNext
    this.amountIn = fields.amountIn
    this.amountOut = fields.amountOut
    this.feeAmount = fields.feeAmount
    this.remainingAmount = fields.remainingAmount
  }

  static reified(): SwapStepResultReified {
    return {
      typeName: SwapStepResult.$typeName,
      fullTypeName: composeSuiType(
        SwapStepResult.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::pool::SwapStepResult`,
      typeArgs: [] as [],
      isPhantom: SwapStepResult.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwapStepResult.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwapStepResult.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwapStepResult.fromBcs(data),
      bcs: SwapStepResult.bcs,
      fromJSONField: (field: any) => SwapStepResult.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwapStepResult.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) => SwapStepResult.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwapStepResult.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) => SwapStepResult.fetch(client, id),
      new: (fields: SwapStepResultFields) => {
        return new SwapStepResult([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r() {
    return SwapStepResult.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwapStepResult>> {
    return phantom(SwapStepResult.reified())
  }
  static get p() {
    return SwapStepResult.phantom()
  }

  static get bcs() {
    return bcs.struct('SwapStepResult', {
      tick_index_next: I32.bcs,
      initialized: bcs.bool(),
      sqrt_price_start: bcs.u128(),
      sqrt_price_next: bcs.u128(),
      amount_in: bcs.u64(),
      amount_out: bcs.u64(),
      fee_amount: bcs.u64(),
      remaining_amount: bcs.u64(),
    })
  }

  static fromFields(fields: Record<string, any>): SwapStepResult {
    return SwapStepResult.reified().new({
      tickIndexNext: decodeFromFields(I32.reified(), fields.tick_index_next),
      initialized: decodeFromFields('bool', fields.initialized),
      sqrtPriceStart: decodeFromFields('u128', fields.sqrt_price_start),
      sqrtPriceNext: decodeFromFields('u128', fields.sqrt_price_next),
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountOut: decodeFromFields('u64', fields.amount_out),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      remainingAmount: decodeFromFields('u64', fields.remaining_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwapStepResult {
    if (!isSwapStepResult(item.type)) {
      throw new Error('not a SwapStepResult type')
    }

    return SwapStepResult.reified().new({
      tickIndexNext: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_index_next),
      initialized: decodeFromFieldsWithTypes('bool', item.fields.initialized),
      sqrtPriceStart: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price_start),
      sqrtPriceNext: decodeFromFieldsWithTypes('u128', item.fields.sqrt_price_next),
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      remainingAmount: decodeFromFieldsWithTypes('u64', item.fields.remaining_amount),
    })
  }

  static fromBcs(data: Uint8Array): SwapStepResult {
    return SwapStepResult.fromFields(SwapStepResult.bcs.parse(data))
  }

  toJSONField() {
    return {
      tickIndexNext: this.tickIndexNext.toJSONField(),
      initialized: this.initialized,
      sqrtPriceStart: this.sqrtPriceStart.toString(),
      sqrtPriceNext: this.sqrtPriceNext.toString(),
      amountIn: this.amountIn.toString(),
      amountOut: this.amountOut.toString(),
      feeAmount: this.feeAmount.toString(),
      remainingAmount: this.remainingAmount.toString(),
    }
  }

  toJSON() {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwapStepResult {
    return SwapStepResult.reified().new({
      tickIndexNext: decodeFromJSONField(I32.reified(), field.tickIndexNext),
      initialized: decodeFromJSONField('bool', field.initialized),
      sqrtPriceStart: decodeFromJSONField('u128', field.sqrtPriceStart),
      sqrtPriceNext: decodeFromJSONField('u128', field.sqrtPriceNext),
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      remainingAmount: decodeFromJSONField('u64', field.remainingAmount),
    })
  }

  static fromJSON(json: Record<string, any>): SwapStepResult {
    if (json.$typeName !== SwapStepResult.$typeName) {
      throw new Error('not a WithTwoGenerics json object')
    }

    return SwapStepResult.fromJSONField(json)
  }

  static fromSuiParsedData(content: SuiParsedData): SwapStepResult {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwapStepResult(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwapStepResult object`)
    }
    return SwapStepResult.fromFieldsWithTypes(content)
  }

  static fromSuiObjectData(data: SuiObjectData): SwapStepResult {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwapStepResult(data.bcs.type)) {
        throw new Error(`object at is not a SwapStepResult object`)
      }

      return SwapStepResult.fromBcs(fromB64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwapStepResult.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.'
    )
  }

  static async fetch(client: SuiClient, id: string): Promise<SwapStepResult> {
    const res = await client.getObject({ id, options: { showBcs: true } })
    if (res.error) {
      throw new Error(`error fetching SwapStepResult object at id ${id}: ${res.error.code}`)
    }
    if (res.data?.bcs?.dataType !== 'moveObject' || !isSwapStepResult(res.data.bcs.type)) {
      throw new Error(`object at id ${id} is not a SwapStepResult object`)
    }

    return SwapStepResult.fromSuiObjectData(res.data)
  }
}
