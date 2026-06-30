/**
 * Concentrated Liquidity Market Maker (CLMM) is a new generation of automated market maker (AMM) aiming to improve
 * decentralized exchanges' capital efficiency and provide attractive yield opportunities for liquidity providers.
 * Different from the constant product market maker that only allows liquidity to be distributed uniformly across the
 * full price curve (0, `positive infinity`), CLMM allows liquidity providers to add their liquidity into specified price ranges.
 * The price in a CLMM pool is discrete, rather than continuous. The liquidity allocated into a specific price range
 * by a user is called a liquidity position.
 *
 * "Pool" is the core module of Clmm protocol, which defines the trading pairs of "clmmpool".
 * All operations related to trading and liquidity are completed by this module.
 */

import { bcs } from '@mysten/sui/bcs'
import type { ClientWithCoreApi, SuiClientTypes } from '@mysten/sui/client'
import type { SuiObjectData, SuiParsedData } from '@mysten/sui/jsonRpc'
import { fromBase64 } from '@mysten/sui/utils'
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
  vector,
} from '../../_framework/reified'
import {
  composeSuiType,
  compressSuiType,
  FieldsWithTypes,
  parseTypeName,
} from '../../_framework/util'
import { Vector } from '../../_framework/vector'
import { I32 } from '../../integer-mate/i32/structs'
import { Option } from '../../std/option/structs'
import { String } from '../../std/string/structs'
import { TypeName } from '../../std/type-name/structs'
import { Balance } from '../../sui/balance/structs'
import { ID, UID } from '../../sui/object/structs'
import { PositionManager } from '../position/structs'
import { RewarderManager } from '../rewarder/structs'
import { TickManager } from '../tick/structs'

/* ============================== POOL =============================== */

export function isPOOL(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::POOL')}::pool::POOL`
}

export interface POOLFields {
  dummyField: ToField<'bool'>
}

export type POOLReified = Reified<POOL, POOLFields>

export type POOLJSONField = {
  dummyField: boolean
}

export type POOLJSON = {
  $typeName: typeof POOL.$typeName
  $typeArgs: []
} & POOLJSONField

/** One-Time-Witness for the module. */
export class POOL implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::POOL` {
    return `${getTypeOrigin('cetus-clmm', 'pool::POOL')}::pool::POOL` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof POOL.$typeName = POOL.$typeName
  readonly $fullTypeName: `${string}::pool::POOL`
  readonly $typeArgs: []
  readonly $isPhantom: typeof POOL.$isPhantom = POOL.$isPhantom

  readonly dummyField: ToField<'bool'>

  private constructor(typeArgs: [], fields: POOLFields) {
    this.$fullTypeName = composeSuiType(
      POOL.$typeName,
      ...typeArgs,
    ) as `${string}::pool::POOL`
    this.$typeArgs = typeArgs

    this.dummyField = fields.dummyField
  }

  static reified(): POOLReified {
    const reifiedBcs = POOL.bcs
    return {
      get typeName() {
        return POOL.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          POOL.$typeName,
          ...[],
        ) as `${string}::pool::POOL`
      },
      typeArgs: [] as [],
      isPhantom: POOL.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => POOL.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => POOL.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => POOL.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => POOL.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => POOL.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => POOL.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => POOL.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => POOL.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => POOL.fetch(client, id),
      new: (fields: POOLFields) => {
        return new POOL([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): POOLReified {
    return POOL.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<POOL>> {
    return phantom(POOL.reified())
  }

  static get p(): PhantomReified<ToTypeStr<POOL>> {
    return POOL.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('POOL', {
      dummy_field: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof POOL.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof POOL.instantiateBcs> {
    if (!POOL.cachedBcs) {
      POOL.cachedBcs = POOL.instantiateBcs()
    }
    return POOL.cachedBcs
  }

  static fromFields(fields: Record<string, any>): POOL {
    return POOL.reified().new({
      dummyField: decodeFromFields('bool', fields.dummy_field),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): POOL {
    if (!isPOOL(item.type)) {
      throw new Error('not a POOL type')
    }

    return POOL.reified().new({
      dummyField: decodeFromFieldsWithTypes('bool', item.fields.dummy_field),
    })
  }

  static fromBcs(data: Uint8Array): POOL {
    return POOL.fromFields(POOL.bcs.parse(data))
  }

  toJSONField(): POOLJSONField {
    return {
      dummyField: this.dummyField,
    }
  }

  toJSON(): POOLJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): POOL {
    return POOL.reified().new({
      dummyField: decodeFromJSONField('bool', field.dummyField),
    })
  }

  static fromJSON(json: Record<string, any>): POOL {
    if (json.$typeName !== POOL.$typeName) {
      throw new Error(
        `not a POOL json object: expected '${POOL.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return POOL.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): POOL {
    if (!isPOOL(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a POOL object`)
    }
    return POOL.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link POOL.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): POOL {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPOOL(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a POOL object`)
    }
    return POOL.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link POOL.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): POOL {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPOOL(data.bcs.type)) {
        throw new Error(`object at is not a POOL object`)
      }

      return POOL.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return POOL.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<POOL> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPOOL(object.type)) {
      throw new Error(`object at id ${id} is not a POOL object`)
    }
    return POOL.fromBcs(object.content)
  }
}

/* ============================== ProtocolFeeCollectCap =============================== */

export function isProtocolFeeCollectCap(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::ProtocolFeeCollectCap')}::pool::ProtocolFeeCollectCap`
}

export interface ProtocolFeeCollectCapFields {
  id: ToField<UID>
}

export type ProtocolFeeCollectCapReified = Reified<
  ProtocolFeeCollectCap,
  ProtocolFeeCollectCapFields
>

export type ProtocolFeeCollectCapJSONField = {
  id: string
}

export type ProtocolFeeCollectCapJSON = {
  $typeName: typeof ProtocolFeeCollectCap.$typeName
  $typeArgs: []
} & ProtocolFeeCollectCapJSONField

/**
 * The capability to collect protocol fees from pools
 * Only the holder of this capability can collect protocol fees
 * * `id` - The UID of the capability
 */
export class ProtocolFeeCollectCap implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::ProtocolFeeCollectCap` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::ProtocolFeeCollectCap')
    }::pool::ProtocolFeeCollectCap` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ProtocolFeeCollectCap.$typeName = ProtocolFeeCollectCap.$typeName
  readonly $fullTypeName: `${string}::pool::ProtocolFeeCollectCap`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ProtocolFeeCollectCap.$isPhantom = ProtocolFeeCollectCap.$isPhantom

  readonly id: ToField<UID>

  private constructor(typeArgs: [], fields: ProtocolFeeCollectCapFields) {
    this.$fullTypeName = composeSuiType(
      ProtocolFeeCollectCap.$typeName,
      ...typeArgs,
    ) as `${string}::pool::ProtocolFeeCollectCap`
    this.$typeArgs = typeArgs

    this.id = fields.id
  }

  static reified(): ProtocolFeeCollectCapReified {
    const reifiedBcs = ProtocolFeeCollectCap.bcs
    return {
      get typeName() {
        return ProtocolFeeCollectCap.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ProtocolFeeCollectCap.$typeName,
          ...[],
        ) as `${string}::pool::ProtocolFeeCollectCap`
      },
      typeArgs: [] as [],
      isPhantom: ProtocolFeeCollectCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ProtocolFeeCollectCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ProtocolFeeCollectCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtocolFeeCollectCap.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ProtocolFeeCollectCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtocolFeeCollectCap.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ProtocolFeeCollectCap.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        ProtocolFeeCollectCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ProtocolFeeCollectCap.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        ProtocolFeeCollectCap.fetch(client, id),
      new: (fields: ProtocolFeeCollectCapFields) => {
        return new ProtocolFeeCollectCap([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ProtocolFeeCollectCapReified {
    return ProtocolFeeCollectCap.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ProtocolFeeCollectCap>> {
    return phantom(ProtocolFeeCollectCap.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ProtocolFeeCollectCap>> {
    return ProtocolFeeCollectCap.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ProtocolFeeCollectCap', {
      id: UID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ProtocolFeeCollectCap.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ProtocolFeeCollectCap.instantiateBcs> {
    if (!ProtocolFeeCollectCap.cachedBcs) {
      ProtocolFeeCollectCap.cachedBcs = ProtocolFeeCollectCap.instantiateBcs()
    }
    return ProtocolFeeCollectCap.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ProtocolFeeCollectCap {
    return ProtocolFeeCollectCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ProtocolFeeCollectCap {
    if (!isProtocolFeeCollectCap(item.type)) {
      throw new Error('not a ProtocolFeeCollectCap type')
    }

    return ProtocolFeeCollectCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    })
  }

  static fromBcs(data: Uint8Array): ProtocolFeeCollectCap {
    return ProtocolFeeCollectCap.fromFields(ProtocolFeeCollectCap.bcs.parse(data))
  }

  toJSONField(): ProtocolFeeCollectCapJSONField {
    return {
      id: this.id,
    }
  }

  toJSON(): ProtocolFeeCollectCapJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ProtocolFeeCollectCap {
    return ProtocolFeeCollectCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    })
  }

  static fromJSON(json: Record<string, any>): ProtocolFeeCollectCap {
    if (json.$typeName !== ProtocolFeeCollectCap.$typeName) {
      throw new Error(
        `not a ProtocolFeeCollectCap json object: expected '${ProtocolFeeCollectCap.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ProtocolFeeCollectCap.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ProtocolFeeCollectCap {
    if (!isProtocolFeeCollectCap(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ProtocolFeeCollectCap object`)
    }
    return ProtocolFeeCollectCap.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ProtocolFeeCollectCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ProtocolFeeCollectCap {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isProtocolFeeCollectCap(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ProtocolFeeCollectCap object`,
      )
    }
    return ProtocolFeeCollectCap.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ProtocolFeeCollectCap.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ProtocolFeeCollectCap {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isProtocolFeeCollectCap(data.bcs.type)) {
        throw new Error(`object at is not a ProtocolFeeCollectCap object`)
      }

      return ProtocolFeeCollectCap.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ProtocolFeeCollectCap.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ProtocolFeeCollectCap> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isProtocolFeeCollectCap(object.type)) {
      throw new Error(`object at id ${id} is not a ProtocolFeeCollectCap object`)
    }
    return ProtocolFeeCollectCap.fromBcs(object.content)
  }
}

/* ============================== Pool =============================== */

export function isPool(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(`${getTypeOrigin('cetus-clmm', 'pool::Pool')}::pool::Pool` + '<')
}

export interface PoolFields<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> {
  id: ToField<UID>
  coinA: ToField<Balance<CoinTypeA>>
  coinB: ToField<Balance<CoinTypeB>>
  tickSpacing: ToField<'u32'>
  feeRate: ToField<'u64'>
  liquidity: ToField<'u128'>
  currentSqrtPrice: ToField<'u128'>
  currentTickIndex: ToField<I32>
  feeGrowthGlobalA: ToField<'u128'>
  feeGrowthGlobalB: ToField<'u128'>
  feeProtocolCoinA: ToField<'u64'>
  feeProtocolCoinB: ToField<'u64'>
  tickManager: ToField<TickManager>
  rewarderManager: ToField<RewarderManager>
  positionManager: ToField<PositionManager>
  isPause: ToField<'bool'>
  index: ToField<'u64'>
  url: ToField<String>
}

export type PoolReified<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = Reified<Pool<CoinTypeA, CoinTypeB>, PoolFields<CoinTypeA, CoinTypeB>>

export type PoolJSONField<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = {
  id: string
  coinA: ToJSON<Balance<CoinTypeA>>
  coinB: ToJSON<Balance<CoinTypeB>>
  tickSpacing: number
  feeRate: string
  liquidity: string
  currentSqrtPrice: string
  currentTickIndex: ToJSON<I32>
  feeGrowthGlobalA: string
  feeGrowthGlobalB: string
  feeProtocolCoinA: string
  feeProtocolCoinB: string
  tickManager: ToJSON<TickManager>
  rewarderManager: ToJSON<RewarderManager>
  positionManager: ToJSON<PositionManager>
  isPause: boolean
  index: string
  url: string
}

export type PoolJSON<CoinTypeA extends PhantomTypeArgument, CoinTypeB extends PhantomTypeArgument> =
  & {
    $typeName: typeof Pool.$typeName
    $typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>]
  }
  & PoolJSONField<CoinTypeA, CoinTypeB>

/**
 * The clmmpool
 * * `id` - The UID of the pool
 * * `coin_a` - The balance of coin A
 * * `coin_b` - The balance of coin B
 * * `tick_spacing` - The spacing between initialized ticks
 * * `fee_rate` - The fee rate of the pool
 * * `liquidity` - The liquidity of the pool
 * * `current_sqrt_price` - The current sqrt price
 * * `current_tick_index` - The current tick index
 * * `fee_growth_global_a` - The global fee growth of coin A
 * * `fee_growth_global_b` - The global fee growth of coin B
 * * `fee_protocol_coin_a` - The amount of coin A owned to protocol
 * * `fee_protocol_coin_b` - The amount of coin B owned to protocol
 * * `tick_manager` - The tick manager
 * * `rewarder_manager` - The rewarder manager
 * * `position_manager` - The position manager
 * * `is_pause` - Whether the pool is paused
 * * `index` - The index of the pool
 * * `url` - The URL of the pool
 */
export class Pool<CoinTypeA extends PhantomTypeArgument, CoinTypeB extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const

  static get $typeName(): `${string}::pool::Pool` {
    return `${getTypeOrigin('cetus-clmm', 'pool::Pool')}::pool::Pool` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName: typeof Pool.$typeName = Pool.$typeName
  readonly $fullTypeName: `${string}::pool::Pool<${PhantomToTypeStr<CoinTypeA>}, ${PhantomToTypeStr<
    CoinTypeB
  >}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>]
  readonly $isPhantom: typeof Pool.$isPhantom = Pool.$isPhantom

  readonly id: ToField<UID>
  readonly coinA: ToField<Balance<CoinTypeA>>
  readonly coinB: ToField<Balance<CoinTypeB>>
  readonly tickSpacing: ToField<'u32'>
  readonly feeRate: ToField<'u64'>
  readonly liquidity: ToField<'u128'>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly currentTickIndex: ToField<I32>
  readonly feeGrowthGlobalA: ToField<'u128'>
  readonly feeGrowthGlobalB: ToField<'u128'>
  readonly feeProtocolCoinA: ToField<'u64'>
  readonly feeProtocolCoinB: ToField<'u64'>
  readonly tickManager: ToField<TickManager>
  readonly rewarderManager: ToField<RewarderManager>
  readonly positionManager: ToField<PositionManager>
  readonly isPause: ToField<'bool'>
  readonly index: ToField<'u64'>
  readonly url: ToField<String>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>],
    fields: PoolFields<CoinTypeA, CoinTypeB>,
  ) {
    this.$fullTypeName = composeSuiType(
      Pool.$typeName,
      ...typeArgs,
    ) as `${string}::pool::Pool<${PhantomToTypeStr<CoinTypeA>}, ${PhantomToTypeStr<CoinTypeB>}>`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.coinA = fields.coinA
    this.coinB = fields.coinB
    this.tickSpacing = fields.tickSpacing
    this.feeRate = fields.feeRate
    this.liquidity = fields.liquidity
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.currentTickIndex = fields.currentTickIndex
    this.feeGrowthGlobalA = fields.feeGrowthGlobalA
    this.feeGrowthGlobalB = fields.feeGrowthGlobalB
    this.feeProtocolCoinA = fields.feeProtocolCoinA
    this.feeProtocolCoinB = fields.feeProtocolCoinB
    this.tickManager = fields.tickManager
    this.rewarderManager = fields.rewarderManager
    this.positionManager = fields.positionManager
    this.isPause = fields.isPause
    this.index = fields.index
    this.url = fields.url
  }

  static reified<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB,
  ): PoolReified<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    const reifiedBcs = Pool.bcs
    return {
      get typeName() {
        return Pool.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Pool.$typeName,
          ...[extractType(CoinTypeA), extractType(CoinTypeB)],
        ) as `${string}::pool::Pool<${PhantomToTypeStr<
          ToPhantomTypeArgument<CoinTypeA>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>}>`
      },
      get typeArgs() {
        return [extractType(CoinTypeA), extractType(CoinTypeB)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeA>>,
          PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>,
        ]
      },
      isPhantom: Pool.$isPhantom,
      reifiedTypeArgs: [CoinTypeA, CoinTypeB],
      fromFields: (fields: Record<string, any>) => Pool.fromFields([CoinTypeA, CoinTypeB], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Pool.fromFieldsWithTypes([CoinTypeA, CoinTypeB], item),
      fromBcs: (data: Uint8Array) =>
        Pool.fromFields([CoinTypeA, CoinTypeB], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Pool.fromJSONField([CoinTypeA, CoinTypeB], field),
      fromJSON: (json: Record<string, any>) => Pool.fromJSON([CoinTypeA, CoinTypeB], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        Pool.fromCoreObject([CoinTypeA, CoinTypeB], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        Pool.fromSuiParsedData([CoinTypeA, CoinTypeB], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        Pool.fromSuiObjectData([CoinTypeA, CoinTypeB], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        Pool.fetch(client, [CoinTypeA, CoinTypeB], id),
      new: (
        fields: PoolFields<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>,
      ) => {
        return new Pool([extractType(CoinTypeA), extractType(CoinTypeB)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof Pool.reified {
    return Pool.reified
  }

  static phantom<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB,
  ): PhantomReified<
    ToTypeStr<Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>>
  > {
    return phantom(Pool.reified(CoinTypeA, CoinTypeB))
  }

  static get p(): typeof Pool.phantom {
    return Pool.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('Pool', {
      id: UID.bcs,
      coin_a: Balance.bcs,
      coin_b: Balance.bcs,
      tick_spacing: bcs.u32(),
      fee_rate: bcs.u64(),
      liquidity: bcs.u128(),
      current_sqrt_price: bcs.u128(),
      current_tick_index: I32.bcs,
      fee_growth_global_a: bcs.u128(),
      fee_growth_global_b: bcs.u128(),
      fee_protocol_coin_a: bcs.u64(),
      fee_protocol_coin_b: bcs.u64(),
      tick_manager: TickManager.bcs,
      rewarder_manager: RewarderManager.bcs,
      position_manager: PositionManager.bcs,
      is_pause: bcs.bool(),
      index: bcs.u64(),
      url: String.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof Pool.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Pool.instantiateBcs> {
    if (!Pool.cachedBcs) {
      Pool.cachedBcs = Pool.instantiateBcs()
    }
    return Pool.cachedBcs
  }

  static fromFields<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    fields: Record<string, any>,
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFields(UID.reified(), fields.id),
      coinA: decodeFromFields(Balance.reified(typeArgs[0]), fields.coin_a),
      coinB: decodeFromFields(Balance.reified(typeArgs[1]), fields.coin_b),
      tickSpacing: decodeFromFields('u32', fields.tick_spacing),
      feeRate: decodeFromFields('u64', fields.fee_rate),
      liquidity: decodeFromFields('u128', fields.liquidity),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      currentTickIndex: decodeFromFields(I32.reified(), fields.current_tick_index),
      feeGrowthGlobalA: decodeFromFields('u128', fields.fee_growth_global_a),
      feeGrowthGlobalB: decodeFromFields('u128', fields.fee_growth_global_b),
      feeProtocolCoinA: decodeFromFields('u64', fields.fee_protocol_coin_a),
      feeProtocolCoinB: decodeFromFields('u64', fields.fee_protocol_coin_b),
      tickManager: decodeFromFields(TickManager.reified(), fields.tick_manager),
      rewarderManager: decodeFromFields(RewarderManager.reified(), fields.rewarder_manager),
      positionManager: decodeFromFields(PositionManager.reified(), fields.position_manager),
      isPause: decodeFromFields('bool', fields.is_pause),
      index: decodeFromFields('u64', fields.index),
      url: decodeFromFields(String.reified(), fields.url),
    })
  }

  static fromFieldsWithTypes<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    item: FieldsWithTypes,
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (!isPool(item.type)) {
      throw new Error('not a Pool type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      coinA: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.coin_a),
      coinB: decodeFromFieldsWithTypes(Balance.reified(typeArgs[1]), item.fields.coin_b),
      tickSpacing: decodeFromFieldsWithTypes('u32', item.fields.tick_spacing),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      currentTickIndex: decodeFromFieldsWithTypes(I32.reified(), item.fields.current_tick_index),
      feeGrowthGlobalA: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_global_a),
      feeGrowthGlobalB: decodeFromFieldsWithTypes('u128', item.fields.fee_growth_global_b),
      feeProtocolCoinA: decodeFromFieldsWithTypes('u64', item.fields.fee_protocol_coin_a),
      feeProtocolCoinB: decodeFromFieldsWithTypes('u64', item.fields.fee_protocol_coin_b),
      tickManager: decodeFromFieldsWithTypes(TickManager.reified(), item.fields.tick_manager),
      rewarderManager: decodeFromFieldsWithTypes(
        RewarderManager.reified(),
        item.fields.rewarder_manager,
      ),
      positionManager: decodeFromFieldsWithTypes(
        PositionManager.reified(),
        item.fields.position_manager,
      ),
      isPause: decodeFromFieldsWithTypes('bool', item.fields.is_pause),
      index: decodeFromFieldsWithTypes('u64', item.fields.index),
      url: decodeFromFieldsWithTypes(String.reified(), item.fields.url),
    })
  }

  static fromBcs<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: Uint8Array,
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return Pool.fromFields(typeArgs, Pool.bcs.parse(data))
  }

  toJSONField(): PoolJSONField<CoinTypeA, CoinTypeB> {
    return {
      id: this.id,
      coinA: this.coinA.toJSONField(),
      coinB: this.coinB.toJSONField(),
      tickSpacing: this.tickSpacing,
      feeRate: this.feeRate.toString(),
      liquidity: this.liquidity.toString(),
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      currentTickIndex: this.currentTickIndex.toJSONField(),
      feeGrowthGlobalA: this.feeGrowthGlobalA.toString(),
      feeGrowthGlobalB: this.feeGrowthGlobalB.toString(),
      feeProtocolCoinA: this.feeProtocolCoinA.toString(),
      feeProtocolCoinB: this.feeProtocolCoinB.toString(),
      tickManager: this.tickManager.toJSONField(),
      rewarderManager: this.rewarderManager.toJSONField(),
      positionManager: this.positionManager.toJSONField(),
      isPause: this.isPause,
      index: this.index.toString(),
      url: this.url,
    }
  }

  toJSON(): PoolJSON<CoinTypeA, CoinTypeB> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    field: any,
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return Pool.reified(typeArgs[0], typeArgs[1]).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      coinA: decodeFromJSONField(Balance.reified(typeArgs[0]), field.coinA),
      coinB: decodeFromJSONField(Balance.reified(typeArgs[1]), field.coinB),
      tickSpacing: decodeFromJSONField('u32', field.tickSpacing),
      feeRate: decodeFromJSONField('u64', field.feeRate),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      currentTickIndex: decodeFromJSONField(I32.reified(), field.currentTickIndex),
      feeGrowthGlobalA: decodeFromJSONField('u128', field.feeGrowthGlobalA),
      feeGrowthGlobalB: decodeFromJSONField('u128', field.feeGrowthGlobalB),
      feeProtocolCoinA: decodeFromJSONField('u64', field.feeProtocolCoinA),
      feeProtocolCoinB: decodeFromJSONField('u64', field.feeProtocolCoinB),
      tickManager: decodeFromJSONField(TickManager.reified(), field.tickManager),
      rewarderManager: decodeFromJSONField(RewarderManager.reified(), field.rewarderManager),
      positionManager: decodeFromJSONField(PositionManager.reified(), field.positionManager),
      isPause: decodeFromJSONField('bool', field.isPause),
      index: decodeFromJSONField('u64', field.index),
      url: decodeFromJSONField(String.reified(), field.url),
    })
  }

  static fromJSON<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    json: Record<string, any>,
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (json.$typeName !== Pool.$typeName) {
      throw new Error(
        `not a Pool json object: expected '${Pool.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Pool.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return Pool.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (!isPool(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Pool object`)
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

    return Pool.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Pool.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    content: SuiParsedData,
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPool(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Pool object`)
    }
    return Pool.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Pool.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: SuiObjectData,
  ): Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPool(data.bcs.type)) {
        throw new Error(`object at is not a Pool object`)
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

      return Pool.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Pool.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [CoinTypeA, CoinTypeB],
    id: string,
  ): Promise<Pool<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPool(object.type)) {
      throw new Error(`object at id ${id} is not a Pool object`)
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

    return Pool.fromBcs(typeArgs, object.content)
  }
}

/* ============================== Status =============================== */

export function isStatus(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::Status')}::pool::Status`
}

export interface StatusFields {
  disableAddLiquidity: ToField<'bool'>
  disableRemoveLiquidity: ToField<'bool'>
  disableSwap: ToField<'bool'>
  disableFlashLoan: ToField<'bool'>
  disableCollectFee: ToField<'bool'>
  disableCollectReward: ToField<'bool'>
}

export type StatusReified = Reified<Status, StatusFields>

export type StatusJSONField = {
  disableAddLiquidity: boolean
  disableRemoveLiquidity: boolean
  disableSwap: boolean
  disableFlashLoan: boolean
  disableCollectFee: boolean
  disableCollectReward: boolean
}

export type StatusJSON = {
  $typeName: typeof Status.$typeName
  $typeArgs: []
} & StatusJSONField

/**
 * The pool status struct that controls which operations are enabled/disabled
 * * `disable_add_liquidity` - Whether adding liquidity is disabled
 * * `disable_remove_liquidity` - Whether removing liquidity is disabled
 * * `disable_swap` - Whether swapping is disabled
 * * `disable_flash_loan` - Whether flash loans are disabled
 * * `disable_collect_fee` - Whether collecting fees is disabled
 * * `disable_collect_reward` - Whether collecting rewards is disabled
 */
export class Status implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::Status` {
    return `${getTypeOrigin('cetus-clmm', 'pool::Status')}::pool::Status` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof Status.$typeName = Status.$typeName
  readonly $fullTypeName: `${string}::pool::Status`
  readonly $typeArgs: []
  readonly $isPhantom: typeof Status.$isPhantom = Status.$isPhantom

  readonly disableAddLiquidity: ToField<'bool'>
  readonly disableRemoveLiquidity: ToField<'bool'>
  readonly disableSwap: ToField<'bool'>
  readonly disableFlashLoan: ToField<'bool'>
  readonly disableCollectFee: ToField<'bool'>
  readonly disableCollectReward: ToField<'bool'>

  private constructor(typeArgs: [], fields: StatusFields) {
    this.$fullTypeName = composeSuiType(
      Status.$typeName,
      ...typeArgs,
    ) as `${string}::pool::Status`
    this.$typeArgs = typeArgs

    this.disableAddLiquidity = fields.disableAddLiquidity
    this.disableRemoveLiquidity = fields.disableRemoveLiquidity
    this.disableSwap = fields.disableSwap
    this.disableFlashLoan = fields.disableFlashLoan
    this.disableCollectFee = fields.disableCollectFee
    this.disableCollectReward = fields.disableCollectReward
  }

  static reified(): StatusReified {
    const reifiedBcs = Status.bcs
    return {
      get typeName() {
        return Status.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          Status.$typeName,
          ...[],
        ) as `${string}::pool::Status`
      },
      typeArgs: [] as [],
      isPhantom: Status.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Status.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => Status.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Status.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => Status.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Status.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) => Status.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => Status.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => Status.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => Status.fetch(client, id),
      new: (fields: StatusFields) => {
        return new Status([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): StatusReified {
    return Status.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<Status>> {
    return phantom(Status.reified())
  }

  static get p(): PhantomReified<ToTypeStr<Status>> {
    return Status.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('Status', {
      disable_add_liquidity: bcs.bool(),
      disable_remove_liquidity: bcs.bool(),
      disable_swap: bcs.bool(),
      disable_flash_loan: bcs.bool(),
      disable_collect_fee: bcs.bool(),
      disable_collect_reward: bcs.bool(),
    })
  }

  private static cachedBcs: ReturnType<typeof Status.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof Status.instantiateBcs> {
    if (!Status.cachedBcs) {
      Status.cachedBcs = Status.instantiateBcs()
    }
    return Status.cachedBcs
  }

  static fromFields(fields: Record<string, any>): Status {
    return Status.reified().new({
      disableAddLiquidity: decodeFromFields('bool', fields.disable_add_liquidity),
      disableRemoveLiquidity: decodeFromFields('bool', fields.disable_remove_liquidity),
      disableSwap: decodeFromFields('bool', fields.disable_swap),
      disableFlashLoan: decodeFromFields('bool', fields.disable_flash_loan),
      disableCollectFee: decodeFromFields('bool', fields.disable_collect_fee),
      disableCollectReward: decodeFromFields('bool', fields.disable_collect_reward),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Status {
    if (!isStatus(item.type)) {
      throw new Error('not a Status type')
    }

    return Status.reified().new({
      disableAddLiquidity: decodeFromFieldsWithTypes('bool', item.fields.disable_add_liquidity),
      disableRemoveLiquidity: decodeFromFieldsWithTypes(
        'bool',
        item.fields.disable_remove_liquidity,
      ),
      disableSwap: decodeFromFieldsWithTypes('bool', item.fields.disable_swap),
      disableFlashLoan: decodeFromFieldsWithTypes('bool', item.fields.disable_flash_loan),
      disableCollectFee: decodeFromFieldsWithTypes('bool', item.fields.disable_collect_fee),
      disableCollectReward: decodeFromFieldsWithTypes('bool', item.fields.disable_collect_reward),
    })
  }

  static fromBcs(data: Uint8Array): Status {
    return Status.fromFields(Status.bcs.parse(data))
  }

  toJSONField(): StatusJSONField {
    return {
      disableAddLiquidity: this.disableAddLiquidity,
      disableRemoveLiquidity: this.disableRemoveLiquidity,
      disableSwap: this.disableSwap,
      disableFlashLoan: this.disableFlashLoan,
      disableCollectFee: this.disableCollectFee,
      disableCollectReward: this.disableCollectReward,
    }
  }

  toJSON(): StatusJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): Status {
    return Status.reified().new({
      disableAddLiquidity: decodeFromJSONField('bool', field.disableAddLiquidity),
      disableRemoveLiquidity: decodeFromJSONField('bool', field.disableRemoveLiquidity),
      disableSwap: decodeFromJSONField('bool', field.disableSwap),
      disableFlashLoan: decodeFromJSONField('bool', field.disableFlashLoan),
      disableCollectFee: decodeFromJSONField('bool', field.disableCollectFee),
      disableCollectReward: decodeFromJSONField('bool', field.disableCollectReward),
    })
  }

  static fromJSON(json: Record<string, any>): Status {
    if (json.$typeName !== Status.$typeName) {
      throw new Error(
        `not a Status json object: expected '${Status.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return Status.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): Status {
    if (!isStatus(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a Status object`)
    }
    return Status.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Status.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): Status {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isStatus(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a Status object`)
    }
    return Status.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link Status.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): Status {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isStatus(data.bcs.type)) {
        throw new Error(`object at is not a Status object`)
      }

      return Status.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return Status.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<Status> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isStatus(object.type)) {
      throw new Error(`object at id ${id} is not a Status object`)
    }
    return Status.fromBcs(object.content)
  }
}

/* ============================== PoolStatus =============================== */

export function isPoolStatus(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::PoolStatus')}::pool::PoolStatus`
}

export interface PoolStatusFields {
  id: ToField<UID>
  status: ToField<Status>
}

export type PoolStatusReified = Reified<PoolStatus, PoolStatusFields>

export type PoolStatusJSONField = {
  id: string
  status: ToJSON<Status>
}

export type PoolStatusJSON = {
  $typeName: typeof PoolStatus.$typeName
  $typeArgs: []
} & PoolStatusJSONField

/**
 * The pool status object that controls which operations are enabled/disabled
 * * `id` - The UID of the pool status
 * * `status` - The status of the pool
 */
export class PoolStatus implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::PoolStatus` {
    return `${getTypeOrigin('cetus-clmm', 'pool::PoolStatus')}::pool::PoolStatus` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof PoolStatus.$typeName = PoolStatus.$typeName
  readonly $fullTypeName: `${string}::pool::PoolStatus`
  readonly $typeArgs: []
  readonly $isPhantom: typeof PoolStatus.$isPhantom = PoolStatus.$isPhantom

  readonly id: ToField<UID>
  readonly status: ToField<Status>

  private constructor(typeArgs: [], fields: PoolStatusFields) {
    this.$fullTypeName = composeSuiType(
      PoolStatus.$typeName,
      ...typeArgs,
    ) as `${string}::pool::PoolStatus`
    this.$typeArgs = typeArgs

    this.id = fields.id
    this.status = fields.status
  }

  static reified(): PoolStatusReified {
    const reifiedBcs = PoolStatus.bcs
    return {
      get typeName() {
        return PoolStatus.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          PoolStatus.$typeName,
          ...[],
        ) as `${string}::pool::PoolStatus`
      },
      typeArgs: [] as [],
      isPhantom: PoolStatus.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => PoolStatus.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => PoolStatus.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => PoolStatus.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => PoolStatus.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => PoolStatus.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        PoolStatus.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => PoolStatus.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => PoolStatus.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => PoolStatus.fetch(client, id),
      new: (fields: PoolStatusFields) => {
        return new PoolStatus([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): PoolStatusReified {
    return PoolStatus.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<PoolStatus>> {
    return phantom(PoolStatus.reified())
  }

  static get p(): PhantomReified<ToTypeStr<PoolStatus>> {
    return PoolStatus.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('PoolStatus', {
      id: UID.bcs,
      status: Status.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof PoolStatus.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof PoolStatus.instantiateBcs> {
    if (!PoolStatus.cachedBcs) {
      PoolStatus.cachedBcs = PoolStatus.instantiateBcs()
    }
    return PoolStatus.cachedBcs
  }

  static fromFields(fields: Record<string, any>): PoolStatus {
    return PoolStatus.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      status: decodeFromFields(Status.reified(), fields.status),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): PoolStatus {
    if (!isPoolStatus(item.type)) {
      throw new Error('not a PoolStatus type')
    }

    return PoolStatus.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      status: decodeFromFieldsWithTypes(Status.reified(), item.fields.status),
    })
  }

  static fromBcs(data: Uint8Array): PoolStatus {
    return PoolStatus.fromFields(PoolStatus.bcs.parse(data))
  }

  toJSONField(): PoolStatusJSONField {
    return {
      id: this.id,
      status: this.status.toJSONField(),
    }
  }

  toJSON(): PoolStatusJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): PoolStatus {
    return PoolStatus.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      status: decodeFromJSONField(Status.reified(), field.status),
    })
  }

  static fromJSON(json: Record<string, any>): PoolStatus {
    if (json.$typeName !== PoolStatus.$typeName) {
      throw new Error(
        `not a PoolStatus json object: expected '${PoolStatus.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return PoolStatus.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): PoolStatus {
    if (!isPoolStatus(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a PoolStatus object`)
    }
    return PoolStatus.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PoolStatus.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): PoolStatus {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isPoolStatus(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a PoolStatus object`)
    }
    return PoolStatus.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link PoolStatus.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): PoolStatus {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isPoolStatus(data.bcs.type)) {
        throw new Error(`object at is not a PoolStatus object`)
      }

      return PoolStatus.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return PoolStatus.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<PoolStatus> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isPoolStatus(object.type)) {
      throw new Error(`object at id ${id} is not a PoolStatus object`)
    }
    return PoolStatus.fromBcs(object.content)
  }
}

/* ============================== SwapResult =============================== */

export function isSwapResult(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::SwapResult')}::pool::SwapResult`
}

export interface SwapResultFields {
  amountIn: ToField<'u64'>
  amountOut: ToField<'u64'>
  feeAmount: ToField<'u64'>
  refFeeAmount: ToField<'u64'>
  steps: ToField<'u64'>
}

export type SwapResultReified = Reified<SwapResult, SwapResultFields>

export type SwapResultJSONField = {
  amountIn: string
  amountOut: string
  feeAmount: string
  refFeeAmount: string
  steps: string
}

export type SwapResultJSON = {
  $typeName: typeof SwapResult.$typeName
  $typeArgs: []
} & SwapResultJSONField

/**
 * The swap result struct that contains the swap result
 * * `amount_in` - The amount of coin A swapped in
 * * `amount_out` - The amount of coin B swapped out
 * * `fee_amount` - The fee amount
 * * `ref_fee_amount` - The reference fee amount
 * * `steps` - The number of steps in the swap
 */
export class SwapResult implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::SwapResult` {
    return `${getTypeOrigin('cetus-clmm', 'pool::SwapResult')}::pool::SwapResult` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SwapResult.$typeName = SwapResult.$typeName
  readonly $fullTypeName: `${string}::pool::SwapResult`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SwapResult.$isPhantom = SwapResult.$isPhantom

  readonly amountIn: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly feeAmount: ToField<'u64'>
  readonly refFeeAmount: ToField<'u64'>
  readonly steps: ToField<'u64'>

  private constructor(typeArgs: [], fields: SwapResultFields) {
    this.$fullTypeName = composeSuiType(
      SwapResult.$typeName,
      ...typeArgs,
    ) as `${string}::pool::SwapResult`
    this.$typeArgs = typeArgs

    this.amountIn = fields.amountIn
    this.amountOut = fields.amountOut
    this.feeAmount = fields.feeAmount
    this.refFeeAmount = fields.refFeeAmount
    this.steps = fields.steps
  }

  static reified(): SwapResultReified {
    const reifiedBcs = SwapResult.bcs
    return {
      get typeName() {
        return SwapResult.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SwapResult.$typeName,
          ...[],
        ) as `${string}::pool::SwapResult`
      },
      typeArgs: [] as [],
      isPhantom: SwapResult.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwapResult.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwapResult.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwapResult.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SwapResult.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwapResult.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SwapResult.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SwapResult.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwapResult.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SwapResult.fetch(client, id),
      new: (fields: SwapResultFields) => {
        return new SwapResult([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SwapResultReified {
    return SwapResult.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwapResult>> {
    return phantom(SwapResult.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SwapResult>> {
    return SwapResult.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SwapResult', {
      amount_in: bcs.u64(),
      amount_out: bcs.u64(),
      fee_amount: bcs.u64(),
      ref_fee_amount: bcs.u64(),
      steps: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SwapResult.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SwapResult.instantiateBcs> {
    if (!SwapResult.cachedBcs) {
      SwapResult.cachedBcs = SwapResult.instantiateBcs()
    }
    return SwapResult.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SwapResult {
    return SwapResult.reified().new({
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountOut: decodeFromFields('u64', fields.amount_out),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      refFeeAmount: decodeFromFields('u64', fields.ref_fee_amount),
      steps: decodeFromFields('u64', fields.steps),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwapResult {
    if (!isSwapResult(item.type)) {
      throw new Error('not a SwapResult type')
    }

    return SwapResult.reified().new({
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      refFeeAmount: decodeFromFieldsWithTypes('u64', item.fields.ref_fee_amount),
      steps: decodeFromFieldsWithTypes('u64', item.fields.steps),
    })
  }

  static fromBcs(data: Uint8Array): SwapResult {
    return SwapResult.fromFields(SwapResult.bcs.parse(data))
  }

  toJSONField(): SwapResultJSONField {
    return {
      amountIn: this.amountIn.toString(),
      amountOut: this.amountOut.toString(),
      feeAmount: this.feeAmount.toString(),
      refFeeAmount: this.refFeeAmount.toString(),
      steps: this.steps.toString(),
    }
  }

  toJSON(): SwapResultJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwapResult {
    return SwapResult.reified().new({
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      refFeeAmount: decodeFromJSONField('u64', field.refFeeAmount),
      steps: decodeFromJSONField('u64', field.steps),
    })
  }

  static fromJSON(json: Record<string, any>): SwapResult {
    if (json.$typeName !== SwapResult.$typeName) {
      throw new Error(
        `not a SwapResult json object: expected '${SwapResult.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SwapResult.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SwapResult {
    if (!isSwapResult(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SwapResult object`)
    }
    return SwapResult.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwapResult.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SwapResult {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwapResult(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwapResult object`)
    }
    return SwapResult.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwapResult.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SwapResult {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwapResult(data.bcs.type)) {
        throw new Error(`object at is not a SwapResult object`)
      }

      return SwapResult.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwapResult.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SwapResult> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSwapResult(object.type)) {
      throw new Error(`object at id ${id} is not a SwapResult object`)
    }
    return SwapResult.fromBcs(object.content)
  }
}

/* ============================== FlashSwapReceipt =============================== */

export function isFlashSwapReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('cetus-clmm', 'pool::FlashSwapReceipt')}::pool::FlashSwapReceipt` + '<',
  )
}

export interface FlashSwapReceiptFields<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> {
  poolId: ToField<ID>
  a2B: ToField<'bool'>
  partnerId: ToField<ID>
  payAmount: ToField<'u64'>
  refFeeAmount: ToField<'u64'>
}

export type FlashSwapReceiptReified<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = Reified<FlashSwapReceipt<CoinTypeA, CoinTypeB>, FlashSwapReceiptFields<CoinTypeA, CoinTypeB>>

export type FlashSwapReceiptJSONField<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = {
  poolId: string
  a2B: boolean
  partnerId: string
  payAmount: string
  refFeeAmount: string
}

export type FlashSwapReceiptJSON<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = {
  $typeName: typeof FlashSwapReceipt.$typeName
  $typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>]
} & FlashSwapReceiptJSONField<CoinTypeA, CoinTypeB>

/**
 * Flash loan resource for swap.
 * * `pool_id` - The ID of the pool
 * * `a2b` - Whether the swap is from A to B
 * * `partner_id` - The ID of the partner
 * * `pay_amount` - The amount of coin A paid
 * * `ref_fee_amount` - The reference fee amount
 */
export class FlashSwapReceipt<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::FlashSwapReceipt` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::FlashSwapReceipt')
    }::pool::FlashSwapReceipt` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName: typeof FlashSwapReceipt.$typeName = FlashSwapReceipt.$typeName
  readonly $fullTypeName: `${string}::pool::FlashSwapReceipt<${PhantomToTypeStr<
    CoinTypeA
  >}, ${PhantomToTypeStr<CoinTypeB>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>]
  readonly $isPhantom: typeof FlashSwapReceipt.$isPhantom = FlashSwapReceipt.$isPhantom

  readonly poolId: ToField<ID>
  readonly a2B: ToField<'bool'>
  readonly partnerId: ToField<ID>
  readonly payAmount: ToField<'u64'>
  readonly refFeeAmount: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>],
    fields: FlashSwapReceiptFields<CoinTypeA, CoinTypeB>,
  ) {
    this.$fullTypeName = composeSuiType(
      FlashSwapReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::pool::FlashSwapReceipt<${PhantomToTypeStr<CoinTypeA>}, ${PhantomToTypeStr<
      CoinTypeB
    >}>`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.a2B = fields.a2B
    this.partnerId = fields.partnerId
    this.payAmount = fields.payAmount
    this.refFeeAmount = fields.refFeeAmount
  }

  static reified<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB,
  ): FlashSwapReceiptReified<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    const reifiedBcs = FlashSwapReceipt.bcs
    return {
      get typeName() {
        return FlashSwapReceipt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FlashSwapReceipt.$typeName,
          ...[extractType(CoinTypeA), extractType(CoinTypeB)],
        ) as `${string}::pool::FlashSwapReceipt<${PhantomToTypeStr<
          ToPhantomTypeArgument<CoinTypeA>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>}>`
      },
      get typeArgs() {
        return [extractType(CoinTypeA), extractType(CoinTypeB)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeA>>,
          PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>,
        ]
      },
      isPhantom: FlashSwapReceipt.$isPhantom,
      reifiedTypeArgs: [CoinTypeA, CoinTypeB],
      fromFields: (fields: Record<string, any>) =>
        FlashSwapReceipt.fromFields([CoinTypeA, CoinTypeB], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        FlashSwapReceipt.fromFieldsWithTypes([CoinTypeA, CoinTypeB], item),
      fromBcs: (data: Uint8Array) =>
        FlashSwapReceipt.fromFields([CoinTypeA, CoinTypeB], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FlashSwapReceipt.fromJSONField([CoinTypeA, CoinTypeB], field),
      fromJSON: (json: Record<string, any>) =>
        FlashSwapReceipt.fromJSON([CoinTypeA, CoinTypeB], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FlashSwapReceipt.fromCoreObject([CoinTypeA, CoinTypeB], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        FlashSwapReceipt.fromSuiParsedData([CoinTypeA, CoinTypeB], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        FlashSwapReceipt.fromSuiObjectData([CoinTypeA, CoinTypeB], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        FlashSwapReceipt.fetch(client, [CoinTypeA, CoinTypeB], id),
      new: (
        fields: FlashSwapReceiptFields<
          ToPhantomTypeArgument<CoinTypeA>,
          ToPhantomTypeArgument<CoinTypeB>
        >,
      ) => {
        return new FlashSwapReceipt([extractType(CoinTypeA), extractType(CoinTypeB)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof FlashSwapReceipt.reified {
    return FlashSwapReceipt.reified
  }

  static phantom<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB,
  ): PhantomReified<
    ToTypeStr<FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>>
  > {
    return phantom(FlashSwapReceipt.reified(CoinTypeA, CoinTypeB))
  }

  static get p(): typeof FlashSwapReceipt.phantom {
    return FlashSwapReceipt.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('FlashSwapReceipt', {
      pool_id: ID.bcs,
      a2b: bcs.bool(),
      partner_id: ID.bcs,
      pay_amount: bcs.u64(),
      ref_fee_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof FlashSwapReceipt.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FlashSwapReceipt.instantiateBcs> {
    if (!FlashSwapReceipt.cachedBcs) {
      FlashSwapReceipt.cachedBcs = FlashSwapReceipt.instantiateBcs()
    }
    return FlashSwapReceipt.cachedBcs
  }

  static fromFields<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    fields: Record<string, any>,
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return FlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      a2B: decodeFromFields('bool', fields.a2b),
      partnerId: decodeFromFields(ID.reified(), fields.partner_id),
      payAmount: decodeFromFields('u64', fields.pay_amount),
      refFeeAmount: decodeFromFields('u64', fields.ref_fee_amount),
    })
  }

  static fromFieldsWithTypes<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    item: FieldsWithTypes,
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (!isFlashSwapReceipt(item.type)) {
      throw new Error('not a FlashSwapReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return FlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      a2B: decodeFromFieldsWithTypes('bool', item.fields.a2b),
      partnerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_id),
      payAmount: decodeFromFieldsWithTypes('u64', item.fields.pay_amount),
      refFeeAmount: decodeFromFieldsWithTypes('u64', item.fields.ref_fee_amount),
    })
  }

  static fromBcs<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: Uint8Array,
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return FlashSwapReceipt.fromFields(typeArgs, FlashSwapReceipt.bcs.parse(data))
  }

  toJSONField(): FlashSwapReceiptJSONField<CoinTypeA, CoinTypeB> {
    return {
      poolId: this.poolId,
      a2B: this.a2B,
      partnerId: this.partnerId,
      payAmount: this.payAmount.toString(),
      refFeeAmount: this.refFeeAmount.toString(),
    }
  }

  toJSON(): FlashSwapReceiptJSON<CoinTypeA, CoinTypeB> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    field: any,
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return FlashSwapReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      a2B: decodeFromJSONField('bool', field.a2B),
      partnerId: decodeFromJSONField(ID.reified(), field.partnerId),
      payAmount: decodeFromJSONField('u64', field.payAmount),
      refFeeAmount: decodeFromJSONField('u64', field.refFeeAmount),
    })
  }

  static fromJSON<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    json: Record<string, any>,
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (json.$typeName !== FlashSwapReceipt.$typeName) {
      throw new Error(
        `not a FlashSwapReceipt json object: expected '${FlashSwapReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(FlashSwapReceipt.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return FlashSwapReceipt.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (!isFlashSwapReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FlashSwapReceipt object`)
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

    return FlashSwapReceipt.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FlashSwapReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    content: SuiParsedData,
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashSwapReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashSwapReceipt object`)
    }
    return FlashSwapReceipt.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FlashSwapReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: SuiObjectData,
  ): FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashSwapReceipt(data.bcs.type)) {
        throw new Error(`object at is not a FlashSwapReceipt object`)
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

      return FlashSwapReceipt.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashSwapReceipt.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [CoinTypeA, CoinTypeB],
    id: string,
  ): Promise<FlashSwapReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFlashSwapReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a FlashSwapReceipt object`)
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

    return FlashSwapReceipt.fromBcs(typeArgs, object.content)
  }
}

/* ============================== AddLiquidityReceipt =============================== */

export function isAddLiquidityReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type.startsWith(
    `${getTypeOrigin('cetus-clmm', 'pool::AddLiquidityReceipt')}::pool::AddLiquidityReceipt` + '<',
  )
}

export interface AddLiquidityReceiptFields<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> {
  poolId: ToField<ID>
  amountA: ToField<'u64'>
  amountB: ToField<'u64'>
}

export type AddLiquidityReceiptReified<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = Reified<
  AddLiquidityReceipt<CoinTypeA, CoinTypeB>,
  AddLiquidityReceiptFields<CoinTypeA, CoinTypeB>
>

export type AddLiquidityReceiptJSONField<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = {
  poolId: string
  amountA: string
  amountB: string
}

export type AddLiquidityReceiptJSON<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> = {
  $typeName: typeof AddLiquidityReceipt.$typeName
  $typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>]
} & AddLiquidityReceiptJSONField<CoinTypeA, CoinTypeB>

/**
 * The receipt for add liquidity
 * * `pool_id` - The ID of the pool
 * * `amount_a` - The amount of coin A added
 * * `amount_b` - The amount of coin B added
 */
export class AddLiquidityReceipt<
  CoinTypeA extends PhantomTypeArgument,
  CoinTypeB extends PhantomTypeArgument,
> implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::AddLiquidityReceipt` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::AddLiquidityReceipt')
    }::pool::AddLiquidityReceipt` as const
  }
  static readonly $numTypeParams = 2
  static readonly $isPhantom = [true, true] as const

  readonly $typeName: typeof AddLiquidityReceipt.$typeName = AddLiquidityReceipt.$typeName
  readonly $fullTypeName: `${string}::pool::AddLiquidityReceipt<${PhantomToTypeStr<
    CoinTypeA
  >}, ${PhantomToTypeStr<CoinTypeB>}>`
  readonly $typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>]
  readonly $isPhantom: typeof AddLiquidityReceipt.$isPhantom = AddLiquidityReceipt.$isPhantom

  readonly poolId: ToField<ID>
  readonly amountA: ToField<'u64'>
  readonly amountB: ToField<'u64'>

  private constructor(
    typeArgs: [PhantomToTypeStr<CoinTypeA>, PhantomToTypeStr<CoinTypeB>],
    fields: AddLiquidityReceiptFields<CoinTypeA, CoinTypeB>,
  ) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::pool::AddLiquidityReceipt<${PhantomToTypeStr<CoinTypeA>}, ${PhantomToTypeStr<
      CoinTypeB
    >}>`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.amountA = fields.amountA
    this.amountB = fields.amountB
  }

  static reified<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB,
  ): AddLiquidityReceiptReified<
    ToPhantomTypeArgument<CoinTypeA>,
    ToPhantomTypeArgument<CoinTypeB>
  > {
    const reifiedBcs = AddLiquidityReceipt.bcs
    return {
      get typeName() {
        return AddLiquidityReceipt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddLiquidityReceipt.$typeName,
          ...[extractType(CoinTypeA), extractType(CoinTypeB)],
        ) as `${string}::pool::AddLiquidityReceipt<${PhantomToTypeStr<
          ToPhantomTypeArgument<CoinTypeA>
        >}, ${PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>}>`
      },
      get typeArgs() {
        return [extractType(CoinTypeA), extractType(CoinTypeB)] as [
          PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeA>>,
          PhantomToTypeStr<ToPhantomTypeArgument<CoinTypeB>>,
        ]
      },
      isPhantom: AddLiquidityReceipt.$isPhantom,
      reifiedTypeArgs: [CoinTypeA, CoinTypeB],
      fromFields: (fields: Record<string, any>) =>
        AddLiquidityReceipt.fromFields([CoinTypeA, CoinTypeB], fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AddLiquidityReceipt.fromFieldsWithTypes([CoinTypeA, CoinTypeB], item),
      fromBcs: (data: Uint8Array) =>
        AddLiquidityReceipt.fromFields([CoinTypeA, CoinTypeB], reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) =>
        AddLiquidityReceipt.fromJSONField([CoinTypeA, CoinTypeB], field),
      fromJSON: (json: Record<string, any>) =>
        AddLiquidityReceipt.fromJSON([CoinTypeA, CoinTypeB], json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddLiquidityReceipt.fromCoreObject([CoinTypeA, CoinTypeB], obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        AddLiquidityReceipt.fromSuiParsedData([CoinTypeA, CoinTypeB], content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AddLiquidityReceipt.fromSuiObjectData([CoinTypeA, CoinTypeB], content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        AddLiquidityReceipt.fetch(client, [CoinTypeA, CoinTypeB], id),
      new: (
        fields: AddLiquidityReceiptFields<
          ToPhantomTypeArgument<CoinTypeA>,
          ToPhantomTypeArgument<CoinTypeB>
        >,
      ) => {
        return new AddLiquidityReceipt([extractType(CoinTypeA), extractType(CoinTypeB)], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): typeof AddLiquidityReceipt.reified {
    return AddLiquidityReceipt.reified
  }

  static phantom<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    CoinTypeA: CoinTypeA,
    CoinTypeB: CoinTypeB,
  ): PhantomReified<
    ToTypeStr<
      AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>
    >
  > {
    return phantom(AddLiquidityReceipt.reified(CoinTypeA, CoinTypeB))
  }

  static get p(): typeof AddLiquidityReceipt.phantom {
    return AddLiquidityReceipt.phantom
  }

  private static instantiateBcs() {
    return bcs.struct('AddLiquidityReceipt', {
      pool_id: ID.bcs,
      amount_a: bcs.u64(),
      amount_b: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddLiquidityReceipt.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddLiquidityReceipt.instantiateBcs> {
    if (!AddLiquidityReceipt.cachedBcs) {
      AddLiquidityReceipt.cachedBcs = AddLiquidityReceipt.instantiateBcs()
    }
    return AddLiquidityReceipt.cachedBcs
  }

  static fromFields<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    fields: Record<string, any>,
  ): AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return AddLiquidityReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      amountA: decodeFromFields('u64', fields.amount_a),
      amountB: decodeFromFields('u64', fields.amount_b),
    })
  }

  static fromFieldsWithTypes<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    item: FieldsWithTypes,
  ): AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (!isAddLiquidityReceipt(item.type)) {
      throw new Error('not a AddLiquidityReceipt type')
    }
    assertFieldsWithTypesArgsMatch(item, typeArgs)

    return AddLiquidityReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      amountA: decodeFromFieldsWithTypes('u64', item.fields.amount_a),
      amountB: decodeFromFieldsWithTypes('u64', item.fields.amount_b),
    })
  }

  static fromBcs<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: Uint8Array,
  ): AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return AddLiquidityReceipt.fromFields(typeArgs, AddLiquidityReceipt.bcs.parse(data))
  }

  toJSONField(): AddLiquidityReceiptJSONField<CoinTypeA, CoinTypeB> {
    return {
      poolId: this.poolId,
      amountA: this.amountA.toString(),
      amountB: this.amountB.toString(),
    }
  }

  toJSON(): AddLiquidityReceiptJSON<CoinTypeA, CoinTypeB> {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    field: any,
  ): AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    return AddLiquidityReceipt.reified(typeArgs[0], typeArgs[1]).new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      amountA: decodeFromJSONField('u64', field.amountA),
      amountB: decodeFromJSONField('u64', field.amountB),
    })
  }

  static fromJSON<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    json: Record<string, any>,
  ): AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (json.$typeName !== AddLiquidityReceipt.$typeName) {
      throw new Error(
        `not a AddLiquidityReceipt json object: expected '${AddLiquidityReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(AddLiquidityReceipt.$typeName, ...typeArgs.map(extractType)),
      json.$typeArgs,
      typeArgs,
    )

    return AddLiquidityReceipt.fromJSONField(typeArgs, json)
  }

  static fromCoreObject<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    obj: SuiClientTypes.Object<{ content: true }>,
  ): AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (!isAddLiquidityReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddLiquidityReceipt object`)
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

    return AddLiquidityReceipt.fromBcs(typeArgs, obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    content: SuiParsedData,
  ): AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddLiquidityReceipt object`)
    }
    return AddLiquidityReceipt.fromFieldsWithTypes(typeArgs, content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    typeArgs: [CoinTypeA, CoinTypeB],
    data: SuiObjectData,
  ): AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>> {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityReceipt(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityReceipt object`)
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

      return AddLiquidityReceipt.fromBcs(typeArgs, fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityReceipt.fromSuiParsedData(typeArgs, data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch<
    CoinTypeA extends PhantomReified<PhantomTypeArgument>,
    CoinTypeB extends PhantomReified<PhantomTypeArgument>,
  >(
    client: ClientWithCoreApi,
    typeArgs: [CoinTypeA, CoinTypeB],
    id: string,
  ): Promise<
    AddLiquidityReceipt<ToPhantomTypeArgument<CoinTypeA>, ToPhantomTypeArgument<CoinTypeB>>
  > {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddLiquidityReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityReceipt object`)
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

    return AddLiquidityReceipt.fromBcs(typeArgs, object.content)
  }
}

/* ============================== FlashLoanReceipt =============================== */

export function isFlashLoanReceipt(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::FlashLoanReceipt')}::pool::FlashLoanReceipt`
}

export interface FlashLoanReceiptFields {
  poolId: ToField<ID>
  loanA: ToField<'bool'>
  partnerId: ToField<ID>
  amount: ToField<'u64'>
  feeAmount: ToField<'u64'>
  refFeeAmount: ToField<'u64'>
}

export type FlashLoanReceiptReified = Reified<FlashLoanReceipt, FlashLoanReceiptFields>

export type FlashLoanReceiptJSONField = {
  poolId: string
  loanA: boolean
  partnerId: string
  amount: string
  feeAmount: string
  refFeeAmount: string
}

export type FlashLoanReceiptJSON = {
  $typeName: typeof FlashLoanReceipt.$typeName
  $typeArgs: []
} & FlashLoanReceiptJSONField

/**
 * The receipt for flash loan
 * * `pool_id` - The ID of the pool
 * * `loan_a` - Whether the loan is for coin A
 * * `partner_id` - The ID of the partner
 * * `amount` - The amount of coin A or B borrowed
 * * `fee_amount` - The fee amount
 * * `ref_fee_amount` - The reference fee amount
 */
export class FlashLoanReceipt implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::FlashLoanReceipt` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::FlashLoanReceipt')
    }::pool::FlashLoanReceipt` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FlashLoanReceipt.$typeName = FlashLoanReceipt.$typeName
  readonly $fullTypeName: `${string}::pool::FlashLoanReceipt`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FlashLoanReceipt.$isPhantom = FlashLoanReceipt.$isPhantom

  readonly poolId: ToField<ID>
  readonly loanA: ToField<'bool'>
  readonly partnerId: ToField<ID>
  readonly amount: ToField<'u64'>
  readonly feeAmount: ToField<'u64'>
  readonly refFeeAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: FlashLoanReceiptFields) {
    this.$fullTypeName = composeSuiType(
      FlashLoanReceipt.$typeName,
      ...typeArgs,
    ) as `${string}::pool::FlashLoanReceipt`
    this.$typeArgs = typeArgs

    this.poolId = fields.poolId
    this.loanA = fields.loanA
    this.partnerId = fields.partnerId
    this.amount = fields.amount
    this.feeAmount = fields.feeAmount
    this.refFeeAmount = fields.refFeeAmount
  }

  static reified(): FlashLoanReceiptReified {
    const reifiedBcs = FlashLoanReceipt.bcs
    return {
      get typeName() {
        return FlashLoanReceipt.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FlashLoanReceipt.$typeName,
          ...[],
        ) as `${string}::pool::FlashLoanReceipt`
      },
      typeArgs: [] as [],
      isPhantom: FlashLoanReceipt.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FlashLoanReceipt.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FlashLoanReceipt.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FlashLoanReceipt.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FlashLoanReceipt.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FlashLoanReceipt.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FlashLoanReceipt.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => FlashLoanReceipt.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FlashLoanReceipt.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => FlashLoanReceipt.fetch(client, id),
      new: (fields: FlashLoanReceiptFields) => {
        return new FlashLoanReceipt([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FlashLoanReceiptReified {
    return FlashLoanReceipt.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FlashLoanReceipt>> {
    return phantom(FlashLoanReceipt.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FlashLoanReceipt>> {
    return FlashLoanReceipt.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FlashLoanReceipt', {
      pool_id: ID.bcs,
      loan_a: bcs.bool(),
      partner_id: ID.bcs,
      amount: bcs.u64(),
      fee_amount: bcs.u64(),
      ref_fee_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof FlashLoanReceipt.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FlashLoanReceipt.instantiateBcs> {
    if (!FlashLoanReceipt.cachedBcs) {
      FlashLoanReceipt.cachedBcs = FlashLoanReceipt.instantiateBcs()
    }
    return FlashLoanReceipt.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FlashLoanReceipt {
    return FlashLoanReceipt.reified().new({
      poolId: decodeFromFields(ID.reified(), fields.pool_id),
      loanA: decodeFromFields('bool', fields.loan_a),
      partnerId: decodeFromFields(ID.reified(), fields.partner_id),
      amount: decodeFromFields('u64', fields.amount),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      refFeeAmount: decodeFromFields('u64', fields.ref_fee_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FlashLoanReceipt {
    if (!isFlashLoanReceipt(item.type)) {
      throw new Error('not a FlashLoanReceipt type')
    }

    return FlashLoanReceipt.reified().new({
      poolId: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool_id),
      loanA: decodeFromFieldsWithTypes('bool', item.fields.loan_a),
      partnerId: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner_id),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      refFeeAmount: decodeFromFieldsWithTypes('u64', item.fields.ref_fee_amount),
    })
  }

  static fromBcs(data: Uint8Array): FlashLoanReceipt {
    return FlashLoanReceipt.fromFields(FlashLoanReceipt.bcs.parse(data))
  }

  toJSONField(): FlashLoanReceiptJSONField {
    return {
      poolId: this.poolId,
      loanA: this.loanA,
      partnerId: this.partnerId,
      amount: this.amount.toString(),
      feeAmount: this.feeAmount.toString(),
      refFeeAmount: this.refFeeAmount.toString(),
    }
  }

  toJSON(): FlashLoanReceiptJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FlashLoanReceipt {
    return FlashLoanReceipt.reified().new({
      poolId: decodeFromJSONField(ID.reified(), field.poolId),
      loanA: decodeFromJSONField('bool', field.loanA),
      partnerId: decodeFromJSONField(ID.reified(), field.partnerId),
      amount: decodeFromJSONField('u64', field.amount),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      refFeeAmount: decodeFromJSONField('u64', field.refFeeAmount),
    })
  }

  static fromJSON(json: Record<string, any>): FlashLoanReceipt {
    if (json.$typeName !== FlashLoanReceipt.$typeName) {
      throw new Error(
        `not a FlashLoanReceipt json object: expected '${FlashLoanReceipt.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FlashLoanReceipt.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FlashLoanReceipt {
    if (!isFlashLoanReceipt(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FlashLoanReceipt object`)
    }
    return FlashLoanReceipt.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FlashLoanReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FlashLoanReceipt {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashLoanReceipt(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashLoanReceipt object`)
    }
    return FlashLoanReceipt.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FlashLoanReceipt.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FlashLoanReceipt {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashLoanReceipt(data.bcs.type)) {
        throw new Error(`object at is not a FlashLoanReceipt object`)
      }

      return FlashLoanReceipt.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashLoanReceipt.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FlashLoanReceipt> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFlashLoanReceipt(object.type)) {
      throw new Error(`object at id ${id} is not a FlashLoanReceipt object`)
    }
    return FlashLoanReceipt.fromBcs(object.content)
  }
}

/* ============================== CalculatedSwapResult =============================== */

export function isCalculatedSwapResult(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::CalculatedSwapResult')}::pool::CalculatedSwapResult`
}

export interface CalculatedSwapResultFields {
  amountIn: ToField<'u64'>
  amountOut: ToField<'u64'>
  feeAmount: ToField<'u64'>
  feeRate: ToField<'u64'>
  afterSqrtPrice: ToField<'u128'>
  isExceed: ToField<'bool'>
  stepResults: ToField<Vector<SwapStepResult>>
}

export type CalculatedSwapResultReified = Reified<CalculatedSwapResult, CalculatedSwapResultFields>

export type CalculatedSwapResultJSONField = {
  amountIn: string
  amountOut: string
  feeAmount: string
  feeRate: string
  afterSqrtPrice: string
  isExceed: boolean
  stepResults: ToJSON<SwapStepResult>[]
}

export type CalculatedSwapResultJSON = {
  $typeName: typeof CalculatedSwapResult.$typeName
  $typeArgs: []
} & CalculatedSwapResultJSONField

/**
 * The calculated swap result
 * * `amount_in` - The amount of coin swapped in
 * * `amount_out` - The amount of coin swapped out
 * * `fee_amount` - The fee amount
 * * `fee_rate` - The fee rate
 * * `after_sqrt_price` - The sqrt price after the swap
 * * `is_exceed` - Whether the swap exceeds the limit
 * * `step_results` - The results of each step in the swap
 */
export class CalculatedSwapResult implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::CalculatedSwapResult` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::CalculatedSwapResult')
    }::pool::CalculatedSwapResult` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CalculatedSwapResult.$typeName = CalculatedSwapResult.$typeName
  readonly $fullTypeName: `${string}::pool::CalculatedSwapResult`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CalculatedSwapResult.$isPhantom = CalculatedSwapResult.$isPhantom

  readonly amountIn: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly feeAmount: ToField<'u64'>
  readonly feeRate: ToField<'u64'>
  readonly afterSqrtPrice: ToField<'u128'>
  readonly isExceed: ToField<'bool'>
  readonly stepResults: ToField<Vector<SwapStepResult>>

  private constructor(typeArgs: [], fields: CalculatedSwapResultFields) {
    this.$fullTypeName = composeSuiType(
      CalculatedSwapResult.$typeName,
      ...typeArgs,
    ) as `${string}::pool::CalculatedSwapResult`
    this.$typeArgs = typeArgs

    this.amountIn = fields.amountIn
    this.amountOut = fields.amountOut
    this.feeAmount = fields.feeAmount
    this.feeRate = fields.feeRate
    this.afterSqrtPrice = fields.afterSqrtPrice
    this.isExceed = fields.isExceed
    this.stepResults = fields.stepResults
  }

  static reified(): CalculatedSwapResultReified {
    const reifiedBcs = CalculatedSwapResult.bcs
    return {
      get typeName() {
        return CalculatedSwapResult.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CalculatedSwapResult.$typeName,
          ...[],
        ) as `${string}::pool::CalculatedSwapResult`
      },
      typeArgs: [] as [],
      isPhantom: CalculatedSwapResult.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CalculatedSwapResult.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CalculatedSwapResult.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CalculatedSwapResult.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CalculatedSwapResult.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CalculatedSwapResult.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CalculatedSwapResult.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CalculatedSwapResult.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CalculatedSwapResult.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CalculatedSwapResult.fetch(client, id),
      new: (fields: CalculatedSwapResultFields) => {
        return new CalculatedSwapResult([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CalculatedSwapResultReified {
    return CalculatedSwapResult.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CalculatedSwapResult>> {
    return phantom(CalculatedSwapResult.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CalculatedSwapResult>> {
    return CalculatedSwapResult.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CalculatedSwapResult', {
      amount_in: bcs.u64(),
      amount_out: bcs.u64(),
      fee_amount: bcs.u64(),
      fee_rate: bcs.u64(),
      after_sqrt_price: bcs.u128(),
      is_exceed: bcs.bool(),
      step_results: bcs.vector(SwapStepResult.bcs),
    })
  }

  private static cachedBcs: ReturnType<typeof CalculatedSwapResult.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CalculatedSwapResult.instantiateBcs> {
    if (!CalculatedSwapResult.cachedBcs) {
      CalculatedSwapResult.cachedBcs = CalculatedSwapResult.instantiateBcs()
    }
    return CalculatedSwapResult.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CalculatedSwapResult {
    return CalculatedSwapResult.reified().new({
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountOut: decodeFromFields('u64', fields.amount_out),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      feeRate: decodeFromFields('u64', fields.fee_rate),
      afterSqrtPrice: decodeFromFields('u128', fields.after_sqrt_price),
      isExceed: decodeFromFields('bool', fields.is_exceed),
      stepResults: decodeFromFields(vector(SwapStepResult.reified()), fields.step_results),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CalculatedSwapResult {
    if (!isCalculatedSwapResult(item.type)) {
      throw new Error('not a CalculatedSwapResult type')
    }

    return CalculatedSwapResult.reified().new({
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      feeRate: decodeFromFieldsWithTypes('u64', item.fields.fee_rate),
      afterSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.after_sqrt_price),
      isExceed: decodeFromFieldsWithTypes('bool', item.fields.is_exceed),
      stepResults: decodeFromFieldsWithTypes(
        vector(SwapStepResult.reified()),
        item.fields.step_results,
      ),
    })
  }

  static fromBcs(data: Uint8Array): CalculatedSwapResult {
    return CalculatedSwapResult.fromFields(CalculatedSwapResult.bcs.parse(data))
  }

  toJSONField(): CalculatedSwapResultJSONField {
    return {
      amountIn: this.amountIn.toString(),
      amountOut: this.amountOut.toString(),
      feeAmount: this.feeAmount.toString(),
      feeRate: this.feeRate.toString(),
      afterSqrtPrice: this.afterSqrtPrice.toString(),
      isExceed: this.isExceed,
      stepResults: fieldToJSON<Vector<SwapStepResult>>(
        `vector<${SwapStepResult.$typeName}>`,
        this.stepResults,
      ),
    }
  }

  toJSON(): CalculatedSwapResultJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CalculatedSwapResult {
    return CalculatedSwapResult.reified().new({
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      feeRate: decodeFromJSONField('u64', field.feeRate),
      afterSqrtPrice: decodeFromJSONField('u128', field.afterSqrtPrice),
      isExceed: decodeFromJSONField('bool', field.isExceed),
      stepResults: decodeFromJSONField(vector(SwapStepResult.reified()), field.stepResults),
    })
  }

  static fromJSON(json: Record<string, any>): CalculatedSwapResult {
    if (json.$typeName !== CalculatedSwapResult.$typeName) {
      throw new Error(
        `not a CalculatedSwapResult json object: expected '${CalculatedSwapResult.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CalculatedSwapResult.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CalculatedSwapResult {
    if (!isCalculatedSwapResult(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CalculatedSwapResult object`)
    }
    return CalculatedSwapResult.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CalculatedSwapResult.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CalculatedSwapResult {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCalculatedSwapResult(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CalculatedSwapResult object`,
      )
    }
    return CalculatedSwapResult.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CalculatedSwapResult.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CalculatedSwapResult {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCalculatedSwapResult(data.bcs.type)) {
        throw new Error(`object at is not a CalculatedSwapResult object`)
      }

      return CalculatedSwapResult.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CalculatedSwapResult.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CalculatedSwapResult> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCalculatedSwapResult(object.type)) {
      throw new Error(`object at id ${id} is not a CalculatedSwapResult object`)
    }
    return CalculatedSwapResult.fromBcs(object.content)
  }
}

/* ============================== SwapStepResult =============================== */

export function isSwapStepResult(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::SwapStepResult')}::pool::SwapStepResult`
}

export interface SwapStepResultFields {
  currentSqrtPrice: ToField<'u128'>
  targetSqrtPrice: ToField<'u128'>
  currentLiquidity: ToField<'u128'>
  amountIn: ToField<'u64'>
  amountOut: ToField<'u64'>
  feeAmount: ToField<'u64'>
  remainderAmount: ToField<'u64'>
}

export type SwapStepResultReified = Reified<SwapStepResult, SwapStepResultFields>

export type SwapStepResultJSONField = {
  currentSqrtPrice: string
  targetSqrtPrice: string
  currentLiquidity: string
  amountIn: string
  amountOut: string
  feeAmount: string
  remainderAmount: string
}

export type SwapStepResultJSON = {
  $typeName: typeof SwapStepResult.$typeName
  $typeArgs: []
} & SwapStepResultJSONField

/**
 * The step swap result
 * * `current_sqrt_price` - The current sqrt price
 * * `target_sqrt_price` - The target sqrt price
 * * `current_liquidity` - The current liquidity
 * * `amount_in` - The amount of coin swapped in
 * * `amount_out` - The amount of coin swapped out
 * * `fee_amount` - The fee amount
 * * `remainder_amount` - The remainder amount
 */
export class SwapStepResult implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::SwapStepResult` {
    return `${getTypeOrigin('cetus-clmm', 'pool::SwapStepResult')}::pool::SwapStepResult` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SwapStepResult.$typeName = SwapStepResult.$typeName
  readonly $fullTypeName: `${string}::pool::SwapStepResult`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SwapStepResult.$isPhantom = SwapStepResult.$isPhantom

  readonly currentSqrtPrice: ToField<'u128'>
  readonly targetSqrtPrice: ToField<'u128'>
  readonly currentLiquidity: ToField<'u128'>
  readonly amountIn: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly feeAmount: ToField<'u64'>
  readonly remainderAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: SwapStepResultFields) {
    this.$fullTypeName = composeSuiType(
      SwapStepResult.$typeName,
      ...typeArgs,
    ) as `${string}::pool::SwapStepResult`
    this.$typeArgs = typeArgs

    this.currentSqrtPrice = fields.currentSqrtPrice
    this.targetSqrtPrice = fields.targetSqrtPrice
    this.currentLiquidity = fields.currentLiquidity
    this.amountIn = fields.amountIn
    this.amountOut = fields.amountOut
    this.feeAmount = fields.feeAmount
    this.remainderAmount = fields.remainderAmount
  }

  static reified(): SwapStepResultReified {
    const reifiedBcs = SwapStepResult.bcs
    return {
      get typeName() {
        return SwapStepResult.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SwapStepResult.$typeName,
          ...[],
        ) as `${string}::pool::SwapStepResult`
      },
      typeArgs: [] as [],
      isPhantom: SwapStepResult.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwapStepResult.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwapStepResult.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwapStepResult.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SwapStepResult.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwapStepResult.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SwapStepResult.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SwapStepResult.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwapStepResult.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SwapStepResult.fetch(client, id),
      new: (fields: SwapStepResultFields) => {
        return new SwapStepResult([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SwapStepResultReified {
    return SwapStepResult.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwapStepResult>> {
    return phantom(SwapStepResult.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SwapStepResult>> {
    return SwapStepResult.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SwapStepResult', {
      current_sqrt_price: bcs.u128(),
      target_sqrt_price: bcs.u128(),
      current_liquidity: bcs.u128(),
      amount_in: bcs.u64(),
      amount_out: bcs.u64(),
      fee_amount: bcs.u64(),
      remainder_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SwapStepResult.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SwapStepResult.instantiateBcs> {
    if (!SwapStepResult.cachedBcs) {
      SwapStepResult.cachedBcs = SwapStepResult.instantiateBcs()
    }
    return SwapStepResult.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SwapStepResult {
    return SwapStepResult.reified().new({
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      targetSqrtPrice: decodeFromFields('u128', fields.target_sqrt_price),
      currentLiquidity: decodeFromFields('u128', fields.current_liquidity),
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountOut: decodeFromFields('u64', fields.amount_out),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      remainderAmount: decodeFromFields('u64', fields.remainder_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwapStepResult {
    if (!isSwapStepResult(item.type)) {
      throw new Error('not a SwapStepResult type')
    }

    return SwapStepResult.reified().new({
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      targetSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.target_sqrt_price),
      currentLiquidity: decodeFromFieldsWithTypes('u128', item.fields.current_liquidity),
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      remainderAmount: decodeFromFieldsWithTypes('u64', item.fields.remainder_amount),
    })
  }

  static fromBcs(data: Uint8Array): SwapStepResult {
    return SwapStepResult.fromFields(SwapStepResult.bcs.parse(data))
  }

  toJSONField(): SwapStepResultJSONField {
    return {
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      targetSqrtPrice: this.targetSqrtPrice.toString(),
      currentLiquidity: this.currentLiquidity.toString(),
      amountIn: this.amountIn.toString(),
      amountOut: this.amountOut.toString(),
      feeAmount: this.feeAmount.toString(),
      remainderAmount: this.remainderAmount.toString(),
    }
  }

  toJSON(): SwapStepResultJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwapStepResult {
    return SwapStepResult.reified().new({
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      targetSqrtPrice: decodeFromJSONField('u128', field.targetSqrtPrice),
      currentLiquidity: decodeFromJSONField('u128', field.currentLiquidity),
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      remainderAmount: decodeFromJSONField('u64', field.remainderAmount),
    })
  }

  static fromJSON(json: Record<string, any>): SwapStepResult {
    if (json.$typeName !== SwapStepResult.$typeName) {
      throw new Error(
        `not a SwapStepResult json object: expected '${SwapStepResult.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SwapStepResult.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SwapStepResult {
    if (!isSwapStepResult(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SwapStepResult object`)
    }
    return SwapStepResult.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwapStepResult.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SwapStepResult {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwapStepResult(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwapStepResult object`)
    }
    return SwapStepResult.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwapStepResult.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SwapStepResult {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwapStepResult(data.bcs.type)) {
        throw new Error(`object at is not a SwapStepResult object`)
      }

      return SwapStepResult.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwapStepResult.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SwapStepResult> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSwapStepResult(object.type)) {
      throw new Error(`object at id ${id} is not a SwapStepResult object`)
    }
    return SwapStepResult.fromBcs(object.content)
  }
}

/* ============================== OpenPositionEvent =============================== */

export function isOpenPositionEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::OpenPositionEvent')}::pool::OpenPositionEvent`
}

export interface OpenPositionEventFields {
  pool: ToField<ID>
  tickLower: ToField<I32>
  tickUpper: ToField<I32>
  position: ToField<ID>
}

export type OpenPositionEventReified = Reified<OpenPositionEvent, OpenPositionEventFields>

export type OpenPositionEventJSONField = {
  pool: string
  tickLower: ToJSON<I32>
  tickUpper: ToJSON<I32>
  position: string
}

export type OpenPositionEventJSON = {
  $typeName: typeof OpenPositionEvent.$typeName
  $typeArgs: []
} & OpenPositionEventJSONField

/**
 * Emited when a position was opened.
 * * `pool` - The ID of the pool
 * * `tick_lower` - The lower tick index
 * * `tick_upper` - The upper tick index
 * * `position` - The ID of the position
 */
export class OpenPositionEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::OpenPositionEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::OpenPositionEvent')
    }::pool::OpenPositionEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof OpenPositionEvent.$typeName = OpenPositionEvent.$typeName
  readonly $fullTypeName: `${string}::pool::OpenPositionEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof OpenPositionEvent.$isPhantom = OpenPositionEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly tickLower: ToField<I32>
  readonly tickUpper: ToField<I32>
  readonly position: ToField<ID>

  private constructor(typeArgs: [], fields: OpenPositionEventFields) {
    this.$fullTypeName = composeSuiType(
      OpenPositionEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::OpenPositionEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.tickLower = fields.tickLower
    this.tickUpper = fields.tickUpper
    this.position = fields.position
  }

  static reified(): OpenPositionEventReified {
    const reifiedBcs = OpenPositionEvent.bcs
    return {
      get typeName() {
        return OpenPositionEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          OpenPositionEvent.$typeName,
          ...[],
        ) as `${string}::pool::OpenPositionEvent`
      },
      typeArgs: [] as [],
      isPhantom: OpenPositionEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OpenPositionEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => OpenPositionEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OpenPositionEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => OpenPositionEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OpenPositionEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        OpenPositionEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => OpenPositionEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => OpenPositionEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => OpenPositionEvent.fetch(client, id),
      new: (fields: OpenPositionEventFields) => {
        return new OpenPositionEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): OpenPositionEventReified {
    return OpenPositionEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<OpenPositionEvent>> {
    return phantom(OpenPositionEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<OpenPositionEvent>> {
    return OpenPositionEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('OpenPositionEvent', {
      pool: ID.bcs,
      tick_lower: I32.bcs,
      tick_upper: I32.bcs,
      position: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof OpenPositionEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof OpenPositionEvent.instantiateBcs> {
    if (!OpenPositionEvent.cachedBcs) {
      OpenPositionEvent.cachedBcs = OpenPositionEvent.instantiateBcs()
    }
    return OpenPositionEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): OpenPositionEvent {
    return OpenPositionEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      tickLower: decodeFromFields(I32.reified(), fields.tick_lower),
      tickUpper: decodeFromFields(I32.reified(), fields.tick_upper),
      position: decodeFromFields(ID.reified(), fields.position),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OpenPositionEvent {
    if (!isOpenPositionEvent(item.type)) {
      throw new Error('not a OpenPositionEvent type')
    }

    return OpenPositionEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      tickLower: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower),
      tickUpper: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper),
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
    })
  }

  static fromBcs(data: Uint8Array): OpenPositionEvent {
    return OpenPositionEvent.fromFields(OpenPositionEvent.bcs.parse(data))
  }

  toJSONField(): OpenPositionEventJSONField {
    return {
      pool: this.pool,
      tickLower: this.tickLower.toJSONField(),
      tickUpper: this.tickUpper.toJSONField(),
      position: this.position,
    }
  }

  toJSON(): OpenPositionEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): OpenPositionEvent {
    return OpenPositionEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      tickLower: decodeFromJSONField(I32.reified(), field.tickLower),
      tickUpper: decodeFromJSONField(I32.reified(), field.tickUpper),
      position: decodeFromJSONField(ID.reified(), field.position),
    })
  }

  static fromJSON(json: Record<string, any>): OpenPositionEvent {
    if (json.$typeName !== OpenPositionEvent.$typeName) {
      throw new Error(
        `not a OpenPositionEvent json object: expected '${OpenPositionEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return OpenPositionEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): OpenPositionEvent {
    if (!isOpenPositionEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a OpenPositionEvent object`)
    }
    return OpenPositionEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OpenPositionEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): OpenPositionEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isOpenPositionEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a OpenPositionEvent object`)
    }
    return OpenPositionEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link OpenPositionEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): OpenPositionEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isOpenPositionEvent(data.bcs.type)) {
        throw new Error(`object at is not a OpenPositionEvent object`)
      }

      return OpenPositionEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return OpenPositionEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<OpenPositionEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isOpenPositionEvent(object.type)) {
      throw new Error(`object at id ${id} is not a OpenPositionEvent object`)
    }
    return OpenPositionEvent.fromBcs(object.content)
  }
}

/* ============================== ClosePositionEvent =============================== */

export function isClosePositionEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::ClosePositionEvent')}::pool::ClosePositionEvent`
}

export interface ClosePositionEventFields {
  pool: ToField<ID>
  position: ToField<ID>
}

export type ClosePositionEventReified = Reified<ClosePositionEvent, ClosePositionEventFields>

export type ClosePositionEventJSONField = {
  pool: string
  position: string
}

export type ClosePositionEventJSON = {
  $typeName: typeof ClosePositionEvent.$typeName
  $typeArgs: []
} & ClosePositionEventJSONField

/**
 * Emited when a position was closed.
 * * `pool` - The ID of the pool
 * * `position` - The ID of the position
 */
export class ClosePositionEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::ClosePositionEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::ClosePositionEvent')
    }::pool::ClosePositionEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof ClosePositionEvent.$typeName = ClosePositionEvent.$typeName
  readonly $fullTypeName: `${string}::pool::ClosePositionEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof ClosePositionEvent.$isPhantom = ClosePositionEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly position: ToField<ID>

  private constructor(typeArgs: [], fields: ClosePositionEventFields) {
    this.$fullTypeName = composeSuiType(
      ClosePositionEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::ClosePositionEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.position = fields.position
  }

  static reified(): ClosePositionEventReified {
    const reifiedBcs = ClosePositionEvent.bcs
    return {
      get typeName() {
        return ClosePositionEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          ClosePositionEvent.$typeName,
          ...[],
        ) as `${string}::pool::ClosePositionEvent`
      },
      typeArgs: [] as [],
      isPhantom: ClosePositionEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => ClosePositionEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ClosePositionEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ClosePositionEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => ClosePositionEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ClosePositionEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        ClosePositionEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => ClosePositionEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => ClosePositionEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => ClosePositionEvent.fetch(client, id),
      new: (fields: ClosePositionEventFields) => {
        return new ClosePositionEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): ClosePositionEventReified {
    return ClosePositionEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<ClosePositionEvent>> {
    return phantom(ClosePositionEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<ClosePositionEvent>> {
    return ClosePositionEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('ClosePositionEvent', {
      pool: ID.bcs,
      position: ID.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof ClosePositionEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof ClosePositionEvent.instantiateBcs> {
    if (!ClosePositionEvent.cachedBcs) {
      ClosePositionEvent.cachedBcs = ClosePositionEvent.instantiateBcs()
    }
    return ClosePositionEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): ClosePositionEvent {
    return ClosePositionEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      position: decodeFromFields(ID.reified(), fields.position),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ClosePositionEvent {
    if (!isClosePositionEvent(item.type)) {
      throw new Error('not a ClosePositionEvent type')
    }

    return ClosePositionEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
    })
  }

  static fromBcs(data: Uint8Array): ClosePositionEvent {
    return ClosePositionEvent.fromFields(ClosePositionEvent.bcs.parse(data))
  }

  toJSONField(): ClosePositionEventJSONField {
    return {
      pool: this.pool,
      position: this.position,
    }
  }

  toJSON(): ClosePositionEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): ClosePositionEvent {
    return ClosePositionEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      position: decodeFromJSONField(ID.reified(), field.position),
    })
  }

  static fromJSON(json: Record<string, any>): ClosePositionEvent {
    if (json.$typeName !== ClosePositionEvent.$typeName) {
      throw new Error(
        `not a ClosePositionEvent json object: expected '${ClosePositionEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return ClosePositionEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): ClosePositionEvent {
    if (!isClosePositionEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a ClosePositionEvent object`)
    }
    return ClosePositionEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ClosePositionEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): ClosePositionEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isClosePositionEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a ClosePositionEvent object`)
    }
    return ClosePositionEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link ClosePositionEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): ClosePositionEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isClosePositionEvent(data.bcs.type)) {
        throw new Error(`object at is not a ClosePositionEvent object`)
      }

      return ClosePositionEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return ClosePositionEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<ClosePositionEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isClosePositionEvent(object.type)) {
      throw new Error(`object at id ${id} is not a ClosePositionEvent object`)
    }
    return ClosePositionEvent.fromBcs(object.content)
  }
}

/* ============================== AddLiquidityEvent =============================== */

export function isAddLiquidityEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::AddLiquidityEvent')}::pool::AddLiquidityEvent`
}

export interface AddLiquidityEventFields {
  pool: ToField<ID>
  position: ToField<ID>
  tickLower: ToField<I32>
  tickUpper: ToField<I32>
  liquidity: ToField<'u128'>
  afterLiquidity: ToField<'u128'>
  amountA: ToField<'u64'>
  amountB: ToField<'u64'>
}

export type AddLiquidityEventReified = Reified<AddLiquidityEvent, AddLiquidityEventFields>

export type AddLiquidityEventJSONField = {
  pool: string
  position: string
  tickLower: ToJSON<I32>
  tickUpper: ToJSON<I32>
  liquidity: string
  afterLiquidity: string
  amountA: string
  amountB: string
}

export type AddLiquidityEventJSON = {
  $typeName: typeof AddLiquidityEvent.$typeName
  $typeArgs: []
} & AddLiquidityEventJSONField

/**
 * Emited when add liquidity for a position.
 * @deprecated
 * * `pool` - The ID of the pool
 * * `position` - The ID of the position
 * * `tick_lower` - The lower tick index
 * * `tick_upper` - The upper tick index
 * * `liquidity` - The liquidity added
 * * `after_liquidity` - The liquidity after the addition
 * * `amount_a` - The amount of coin A added
 * * `amount_b` - The amount of coin B added
 */
export class AddLiquidityEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::AddLiquidityEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::AddLiquidityEvent')
    }::pool::AddLiquidityEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddLiquidityEvent.$typeName = AddLiquidityEvent.$typeName
  readonly $fullTypeName: `${string}::pool::AddLiquidityEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddLiquidityEvent.$isPhantom = AddLiquidityEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly position: ToField<ID>
  readonly tickLower: ToField<I32>
  readonly tickUpper: ToField<I32>
  readonly liquidity: ToField<'u128'>
  readonly afterLiquidity: ToField<'u128'>
  readonly amountA: ToField<'u64'>
  readonly amountB: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddLiquidityEventFields) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::AddLiquidityEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.position = fields.position
    this.tickLower = fields.tickLower
    this.tickUpper = fields.tickUpper
    this.liquidity = fields.liquidity
    this.afterLiquidity = fields.afterLiquidity
    this.amountA = fields.amountA
    this.amountB = fields.amountB
  }

  static reified(): AddLiquidityEventReified {
    const reifiedBcs = AddLiquidityEvent.bcs
    return {
      get typeName() {
        return AddLiquidityEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddLiquidityEvent.$typeName,
          ...[],
        ) as `${string}::pool::AddLiquidityEvent`
      },
      typeArgs: [] as [],
      isPhantom: AddLiquidityEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddLiquidityEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddLiquidityEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddLiquidityEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddLiquidityEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddLiquidityEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddLiquidityEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddLiquidityEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddLiquidityEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddLiquidityEvent.fetch(client, id),
      new: (fields: AddLiquidityEventFields) => {
        return new AddLiquidityEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddLiquidityEventReified {
    return AddLiquidityEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityEvent>> {
    return phantom(AddLiquidityEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddLiquidityEvent>> {
    return AddLiquidityEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddLiquidityEvent', {
      pool: ID.bcs,
      position: ID.bcs,
      tick_lower: I32.bcs,
      tick_upper: I32.bcs,
      liquidity: bcs.u128(),
      after_liquidity: bcs.u128(),
      amount_a: bcs.u64(),
      amount_b: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddLiquidityEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddLiquidityEvent.instantiateBcs> {
    if (!AddLiquidityEvent.cachedBcs) {
      AddLiquidityEvent.cachedBcs = AddLiquidityEvent.instantiateBcs()
    }
    return AddLiquidityEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddLiquidityEvent {
    return AddLiquidityEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      position: decodeFromFields(ID.reified(), fields.position),
      tickLower: decodeFromFields(I32.reified(), fields.tick_lower),
      tickUpper: decodeFromFields(I32.reified(), fields.tick_upper),
      liquidity: decodeFromFields('u128', fields.liquidity),
      afterLiquidity: decodeFromFields('u128', fields.after_liquidity),
      amountA: decodeFromFields('u64', fields.amount_a),
      amountB: decodeFromFields('u64', fields.amount_b),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddLiquidityEvent {
    if (!isAddLiquidityEvent(item.type)) {
      throw new Error('not a AddLiquidityEvent type')
    }

    return AddLiquidityEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
      tickLower: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower),
      tickUpper: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      afterLiquidity: decodeFromFieldsWithTypes('u128', item.fields.after_liquidity),
      amountA: decodeFromFieldsWithTypes('u64', item.fields.amount_a),
      amountB: decodeFromFieldsWithTypes('u64', item.fields.amount_b),
    })
  }

  static fromBcs(data: Uint8Array): AddLiquidityEvent {
    return AddLiquidityEvent.fromFields(AddLiquidityEvent.bcs.parse(data))
  }

  toJSONField(): AddLiquidityEventJSONField {
    return {
      pool: this.pool,
      position: this.position,
      tickLower: this.tickLower.toJSONField(),
      tickUpper: this.tickUpper.toJSONField(),
      liquidity: this.liquidity.toString(),
      afterLiquidity: this.afterLiquidity.toString(),
      amountA: this.amountA.toString(),
      amountB: this.amountB.toString(),
    }
  }

  toJSON(): AddLiquidityEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddLiquidityEvent {
    return AddLiquidityEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      position: decodeFromJSONField(ID.reified(), field.position),
      tickLower: decodeFromJSONField(I32.reified(), field.tickLower),
      tickUpper: decodeFromJSONField(I32.reified(), field.tickUpper),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      afterLiquidity: decodeFromJSONField('u128', field.afterLiquidity),
      amountA: decodeFromJSONField('u64', field.amountA),
      amountB: decodeFromJSONField('u64', field.amountB),
    })
  }

  static fromJSON(json: Record<string, any>): AddLiquidityEvent {
    if (json.$typeName !== AddLiquidityEvent.$typeName) {
      throw new Error(
        `not a AddLiquidityEvent json object: expected '${AddLiquidityEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddLiquidityEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddLiquidityEvent {
    if (!isAddLiquidityEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddLiquidityEvent object`)
    }
    return AddLiquidityEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddLiquidityEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddLiquidityEvent object`)
    }
    return AddLiquidityEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddLiquidityEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityEvent object`)
      }

      return AddLiquidityEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddLiquidityEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddLiquidityEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityEvent object`)
    }
    return AddLiquidityEvent.fromBcs(object.content)
  }
}

/* ============================== AddLiquidityV2Event =============================== */

export function isAddLiquidityV2Event(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::AddLiquidityV2Event')}::pool::AddLiquidityV2Event`
}

export interface AddLiquidityV2EventFields {
  pool: ToField<ID>
  position: ToField<ID>
  tickLower: ToField<I32>
  tickUpper: ToField<I32>
  liquidity: ToField<'u128'>
  afterLiquidity: ToField<'u128'>
  currentSqrtPrice: ToField<'u128'>
  amountA: ToField<'u64'>
  amountB: ToField<'u64'>
}

export type AddLiquidityV2EventReified = Reified<AddLiquidityV2Event, AddLiquidityV2EventFields>

export type AddLiquidityV2EventJSONField = {
  pool: string
  position: string
  tickLower: ToJSON<I32>
  tickUpper: ToJSON<I32>
  liquidity: string
  afterLiquidity: string
  currentSqrtPrice: string
  amountA: string
  amountB: string
}

export type AddLiquidityV2EventJSON = {
  $typeName: typeof AddLiquidityV2Event.$typeName
  $typeArgs: []
} & AddLiquidityV2EventJSONField

export class AddLiquidityV2Event implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::AddLiquidityV2Event` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::AddLiquidityV2Event')
    }::pool::AddLiquidityV2Event` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddLiquidityV2Event.$typeName = AddLiquidityV2Event.$typeName
  readonly $fullTypeName: `${string}::pool::AddLiquidityV2Event`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddLiquidityV2Event.$isPhantom = AddLiquidityV2Event.$isPhantom

  readonly pool: ToField<ID>
  readonly position: ToField<ID>
  readonly tickLower: ToField<I32>
  readonly tickUpper: ToField<I32>
  readonly liquidity: ToField<'u128'>
  readonly afterLiquidity: ToField<'u128'>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly amountA: ToField<'u64'>
  readonly amountB: ToField<'u64'>

  private constructor(typeArgs: [], fields: AddLiquidityV2EventFields) {
    this.$fullTypeName = composeSuiType(
      AddLiquidityV2Event.$typeName,
      ...typeArgs,
    ) as `${string}::pool::AddLiquidityV2Event`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.position = fields.position
    this.tickLower = fields.tickLower
    this.tickUpper = fields.tickUpper
    this.liquidity = fields.liquidity
    this.afterLiquidity = fields.afterLiquidity
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.amountA = fields.amountA
    this.amountB = fields.amountB
  }

  static reified(): AddLiquidityV2EventReified {
    const reifiedBcs = AddLiquidityV2Event.bcs
    return {
      get typeName() {
        return AddLiquidityV2Event.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddLiquidityV2Event.$typeName,
          ...[],
        ) as `${string}::pool::AddLiquidityV2Event`
      },
      typeArgs: [] as [],
      isPhantom: AddLiquidityV2Event.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddLiquidityV2Event.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddLiquidityV2Event.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddLiquidityV2Event.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddLiquidityV2Event.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddLiquidityV2Event.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddLiquidityV2Event.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddLiquidityV2Event.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddLiquidityV2Event.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddLiquidityV2Event.fetch(client, id),
      new: (fields: AddLiquidityV2EventFields) => {
        return new AddLiquidityV2Event([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddLiquidityV2EventReified {
    return AddLiquidityV2Event.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddLiquidityV2Event>> {
    return phantom(AddLiquidityV2Event.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddLiquidityV2Event>> {
    return AddLiquidityV2Event.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddLiquidityV2Event', {
      pool: ID.bcs,
      position: ID.bcs,
      tick_lower: I32.bcs,
      tick_upper: I32.bcs,
      liquidity: bcs.u128(),
      after_liquidity: bcs.u128(),
      current_sqrt_price: bcs.u128(),
      amount_a: bcs.u64(),
      amount_b: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof AddLiquidityV2Event.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddLiquidityV2Event.instantiateBcs> {
    if (!AddLiquidityV2Event.cachedBcs) {
      AddLiquidityV2Event.cachedBcs = AddLiquidityV2Event.instantiateBcs()
    }
    return AddLiquidityV2Event.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddLiquidityV2Event {
    return AddLiquidityV2Event.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      position: decodeFromFields(ID.reified(), fields.position),
      tickLower: decodeFromFields(I32.reified(), fields.tick_lower),
      tickUpper: decodeFromFields(I32.reified(), fields.tick_upper),
      liquidity: decodeFromFields('u128', fields.liquidity),
      afterLiquidity: decodeFromFields('u128', fields.after_liquidity),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      amountA: decodeFromFields('u64', fields.amount_a),
      amountB: decodeFromFields('u64', fields.amount_b),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddLiquidityV2Event {
    if (!isAddLiquidityV2Event(item.type)) {
      throw new Error('not a AddLiquidityV2Event type')
    }

    return AddLiquidityV2Event.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
      tickLower: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower),
      tickUpper: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      afterLiquidity: decodeFromFieldsWithTypes('u128', item.fields.after_liquidity),
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      amountA: decodeFromFieldsWithTypes('u64', item.fields.amount_a),
      amountB: decodeFromFieldsWithTypes('u64', item.fields.amount_b),
    })
  }

  static fromBcs(data: Uint8Array): AddLiquidityV2Event {
    return AddLiquidityV2Event.fromFields(AddLiquidityV2Event.bcs.parse(data))
  }

  toJSONField(): AddLiquidityV2EventJSONField {
    return {
      pool: this.pool,
      position: this.position,
      tickLower: this.tickLower.toJSONField(),
      tickUpper: this.tickUpper.toJSONField(),
      liquidity: this.liquidity.toString(),
      afterLiquidity: this.afterLiquidity.toString(),
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      amountA: this.amountA.toString(),
      amountB: this.amountB.toString(),
    }
  }

  toJSON(): AddLiquidityV2EventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddLiquidityV2Event {
    return AddLiquidityV2Event.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      position: decodeFromJSONField(ID.reified(), field.position),
      tickLower: decodeFromJSONField(I32.reified(), field.tickLower),
      tickUpper: decodeFromJSONField(I32.reified(), field.tickUpper),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      afterLiquidity: decodeFromJSONField('u128', field.afterLiquidity),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      amountA: decodeFromJSONField('u64', field.amountA),
      amountB: decodeFromJSONField('u64', field.amountB),
    })
  }

  static fromJSON(json: Record<string, any>): AddLiquidityV2Event {
    if (json.$typeName !== AddLiquidityV2Event.$typeName) {
      throw new Error(
        `not a AddLiquidityV2Event json object: expected '${AddLiquidityV2Event.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddLiquidityV2Event.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddLiquidityV2Event {
    if (!isAddLiquidityV2Event(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddLiquidityV2Event object`)
    }
    return AddLiquidityV2Event.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityV2Event.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddLiquidityV2Event {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddLiquidityV2Event(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddLiquidityV2Event object`)
    }
    return AddLiquidityV2Event.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddLiquidityV2Event.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddLiquidityV2Event {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddLiquidityV2Event(data.bcs.type)) {
        throw new Error(`object at is not a AddLiquidityV2Event object`)
      }

      return AddLiquidityV2Event.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddLiquidityV2Event.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddLiquidityV2Event> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddLiquidityV2Event(object.type)) {
      throw new Error(`object at id ${id} is not a AddLiquidityV2Event object`)
    }
    return AddLiquidityV2Event.fromBcs(object.content)
  }
}

/* ============================== RemoveLiquidityV2Event =============================== */

export function isRemoveLiquidityV2Event(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'pool::RemoveLiquidityV2Event')
    }::pool::RemoveLiquidityV2Event`
}

export interface RemoveLiquidityV2EventFields {
  pool: ToField<ID>
  position: ToField<ID>
  tickLower: ToField<I32>
  tickUpper: ToField<I32>
  liquidity: ToField<'u128'>
  afterLiquidity: ToField<'u128'>
  currentSqrtPrice: ToField<'u128'>
  amountA: ToField<'u64'>
  amountB: ToField<'u64'>
}

export type RemoveLiquidityV2EventReified = Reified<
  RemoveLiquidityV2Event,
  RemoveLiquidityV2EventFields
>

export type RemoveLiquidityV2EventJSONField = {
  pool: string
  position: string
  tickLower: ToJSON<I32>
  tickUpper: ToJSON<I32>
  liquidity: string
  afterLiquidity: string
  currentSqrtPrice: string
  amountA: string
  amountB: string
}

export type RemoveLiquidityV2EventJSON = {
  $typeName: typeof RemoveLiquidityV2Event.$typeName
  $typeArgs: []
} & RemoveLiquidityV2EventJSONField

export class RemoveLiquidityV2Event implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::RemoveLiquidityV2Event` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::RemoveLiquidityV2Event')
    }::pool::RemoveLiquidityV2Event` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveLiquidityV2Event.$typeName = RemoveLiquidityV2Event.$typeName
  readonly $fullTypeName: `${string}::pool::RemoveLiquidityV2Event`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveLiquidityV2Event.$isPhantom = RemoveLiquidityV2Event.$isPhantom

  readonly pool: ToField<ID>
  readonly position: ToField<ID>
  readonly tickLower: ToField<I32>
  readonly tickUpper: ToField<I32>
  readonly liquidity: ToField<'u128'>
  readonly afterLiquidity: ToField<'u128'>
  readonly currentSqrtPrice: ToField<'u128'>
  readonly amountA: ToField<'u64'>
  readonly amountB: ToField<'u64'>

  private constructor(typeArgs: [], fields: RemoveLiquidityV2EventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveLiquidityV2Event.$typeName,
      ...typeArgs,
    ) as `${string}::pool::RemoveLiquidityV2Event`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.position = fields.position
    this.tickLower = fields.tickLower
    this.tickUpper = fields.tickUpper
    this.liquidity = fields.liquidity
    this.afterLiquidity = fields.afterLiquidity
    this.currentSqrtPrice = fields.currentSqrtPrice
    this.amountA = fields.amountA
    this.amountB = fields.amountB
  }

  static reified(): RemoveLiquidityV2EventReified {
    const reifiedBcs = RemoveLiquidityV2Event.bcs
    return {
      get typeName() {
        return RemoveLiquidityV2Event.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RemoveLiquidityV2Event.$typeName,
          ...[],
        ) as `${string}::pool::RemoveLiquidityV2Event`
      },
      typeArgs: [] as [],
      isPhantom: RemoveLiquidityV2Event.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveLiquidityV2Event.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveLiquidityV2Event.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveLiquidityV2Event.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveLiquidityV2Event.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveLiquidityV2Event.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RemoveLiquidityV2Event.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveLiquidityV2Event.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveLiquidityV2Event.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        RemoveLiquidityV2Event.fetch(client, id),
      new: (fields: RemoveLiquidityV2EventFields) => {
        return new RemoveLiquidityV2Event([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveLiquidityV2EventReified {
    return RemoveLiquidityV2Event.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveLiquidityV2Event>> {
    return phantom(RemoveLiquidityV2Event.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveLiquidityV2Event>> {
    return RemoveLiquidityV2Event.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveLiquidityV2Event', {
      pool: ID.bcs,
      position: ID.bcs,
      tick_lower: I32.bcs,
      tick_upper: I32.bcs,
      liquidity: bcs.u128(),
      after_liquidity: bcs.u128(),
      current_sqrt_price: bcs.u128(),
      amount_a: bcs.u64(),
      amount_b: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveLiquidityV2Event.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RemoveLiquidityV2Event.instantiateBcs> {
    if (!RemoveLiquidityV2Event.cachedBcs) {
      RemoveLiquidityV2Event.cachedBcs = RemoveLiquidityV2Event.instantiateBcs()
    }
    return RemoveLiquidityV2Event.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveLiquidityV2Event {
    return RemoveLiquidityV2Event.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      position: decodeFromFields(ID.reified(), fields.position),
      tickLower: decodeFromFields(I32.reified(), fields.tick_lower),
      tickUpper: decodeFromFields(I32.reified(), fields.tick_upper),
      liquidity: decodeFromFields('u128', fields.liquidity),
      afterLiquidity: decodeFromFields('u128', fields.after_liquidity),
      currentSqrtPrice: decodeFromFields('u128', fields.current_sqrt_price),
      amountA: decodeFromFields('u64', fields.amount_a),
      amountB: decodeFromFields('u64', fields.amount_b),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveLiquidityV2Event {
    if (!isRemoveLiquidityV2Event(item.type)) {
      throw new Error('not a RemoveLiquidityV2Event type')
    }

    return RemoveLiquidityV2Event.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
      tickLower: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower),
      tickUpper: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      afterLiquidity: decodeFromFieldsWithTypes('u128', item.fields.after_liquidity),
      currentSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.current_sqrt_price),
      amountA: decodeFromFieldsWithTypes('u64', item.fields.amount_a),
      amountB: decodeFromFieldsWithTypes('u64', item.fields.amount_b),
    })
  }

  static fromBcs(data: Uint8Array): RemoveLiquidityV2Event {
    return RemoveLiquidityV2Event.fromFields(RemoveLiquidityV2Event.bcs.parse(data))
  }

  toJSONField(): RemoveLiquidityV2EventJSONField {
    return {
      pool: this.pool,
      position: this.position,
      tickLower: this.tickLower.toJSONField(),
      tickUpper: this.tickUpper.toJSONField(),
      liquidity: this.liquidity.toString(),
      afterLiquidity: this.afterLiquidity.toString(),
      currentSqrtPrice: this.currentSqrtPrice.toString(),
      amountA: this.amountA.toString(),
      amountB: this.amountB.toString(),
    }
  }

  toJSON(): RemoveLiquidityV2EventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveLiquidityV2Event {
    return RemoveLiquidityV2Event.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      position: decodeFromJSONField(ID.reified(), field.position),
      tickLower: decodeFromJSONField(I32.reified(), field.tickLower),
      tickUpper: decodeFromJSONField(I32.reified(), field.tickUpper),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      afterLiquidity: decodeFromJSONField('u128', field.afterLiquidity),
      currentSqrtPrice: decodeFromJSONField('u128', field.currentSqrtPrice),
      amountA: decodeFromJSONField('u64', field.amountA),
      amountB: decodeFromJSONField('u64', field.amountB),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveLiquidityV2Event {
    if (json.$typeName !== RemoveLiquidityV2Event.$typeName) {
      throw new Error(
        `not a RemoveLiquidityV2Event json object: expected '${RemoveLiquidityV2Event.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveLiquidityV2Event.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RemoveLiquidityV2Event {
    if (!isRemoveLiquidityV2Event(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RemoveLiquidityV2Event object`)
    }
    return RemoveLiquidityV2Event.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveLiquidityV2Event.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RemoveLiquidityV2Event {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveLiquidityV2Event(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveLiquidityV2Event object`,
      )
    }
    return RemoveLiquidityV2Event.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveLiquidityV2Event.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RemoveLiquidityV2Event {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveLiquidityV2Event(data.bcs.type)) {
        throw new Error(`object at is not a RemoveLiquidityV2Event object`)
      }

      return RemoveLiquidityV2Event.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveLiquidityV2Event.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RemoveLiquidityV2Event> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRemoveLiquidityV2Event(object.type)) {
      throw new Error(`object at id ${id} is not a RemoveLiquidityV2Event object`)
    }
    return RemoveLiquidityV2Event.fromBcs(object.content)
  }
}

/* ============================== RemoveLiquidityEvent =============================== */

export function isRemoveLiquidityEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::RemoveLiquidityEvent')}::pool::RemoveLiquidityEvent`
}

export interface RemoveLiquidityEventFields {
  pool: ToField<ID>
  position: ToField<ID>
  tickLower: ToField<I32>
  tickUpper: ToField<I32>
  liquidity: ToField<'u128'>
  afterLiquidity: ToField<'u128'>
  amountA: ToField<'u64'>
  amountB: ToField<'u64'>
}

export type RemoveLiquidityEventReified = Reified<RemoveLiquidityEvent, RemoveLiquidityEventFields>

export type RemoveLiquidityEventJSONField = {
  pool: string
  position: string
  tickLower: ToJSON<I32>
  tickUpper: ToJSON<I32>
  liquidity: string
  afterLiquidity: string
  amountA: string
  amountB: string
}

export type RemoveLiquidityEventJSON = {
  $typeName: typeof RemoveLiquidityEvent.$typeName
  $typeArgs: []
} & RemoveLiquidityEventJSONField

/**
 * Emited when remove liquidity from a position.
 * @deprecated
 * * `pool` - The ID of the pool
 * * `position` - The ID of the position
 * * `tick_lower` - The lower tick index
 * * `tick_upper` - The upper tick index
 * * `liquidity` - The liquidity removed
 * * `after_liquidity` - The liquidity after the removal
 */
export class RemoveLiquidityEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::RemoveLiquidityEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::RemoveLiquidityEvent')
    }::pool::RemoveLiquidityEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof RemoveLiquidityEvent.$typeName = RemoveLiquidityEvent.$typeName
  readonly $fullTypeName: `${string}::pool::RemoveLiquidityEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof RemoveLiquidityEvent.$isPhantom = RemoveLiquidityEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly position: ToField<ID>
  readonly tickLower: ToField<I32>
  readonly tickUpper: ToField<I32>
  readonly liquidity: ToField<'u128'>
  readonly afterLiquidity: ToField<'u128'>
  readonly amountA: ToField<'u64'>
  readonly amountB: ToField<'u64'>

  private constructor(typeArgs: [], fields: RemoveLiquidityEventFields) {
    this.$fullTypeName = composeSuiType(
      RemoveLiquidityEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::RemoveLiquidityEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.position = fields.position
    this.tickLower = fields.tickLower
    this.tickUpper = fields.tickUpper
    this.liquidity = fields.liquidity
    this.afterLiquidity = fields.afterLiquidity
    this.amountA = fields.amountA
    this.amountB = fields.amountB
  }

  static reified(): RemoveLiquidityEventReified {
    const reifiedBcs = RemoveLiquidityEvent.bcs
    return {
      get typeName() {
        return RemoveLiquidityEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          RemoveLiquidityEvent.$typeName,
          ...[],
        ) as `${string}::pool::RemoveLiquidityEvent`
      },
      typeArgs: [] as [],
      isPhantom: RemoveLiquidityEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => RemoveLiquidityEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        RemoveLiquidityEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => RemoveLiquidityEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => RemoveLiquidityEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => RemoveLiquidityEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        RemoveLiquidityEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        RemoveLiquidityEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        RemoveLiquidityEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        RemoveLiquidityEvent.fetch(client, id),
      new: (fields: RemoveLiquidityEventFields) => {
        return new RemoveLiquidityEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): RemoveLiquidityEventReified {
    return RemoveLiquidityEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<RemoveLiquidityEvent>> {
    return phantom(RemoveLiquidityEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<RemoveLiquidityEvent>> {
    return RemoveLiquidityEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('RemoveLiquidityEvent', {
      pool: ID.bcs,
      position: ID.bcs,
      tick_lower: I32.bcs,
      tick_upper: I32.bcs,
      liquidity: bcs.u128(),
      after_liquidity: bcs.u128(),
      amount_a: bcs.u64(),
      amount_b: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof RemoveLiquidityEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof RemoveLiquidityEvent.instantiateBcs> {
    if (!RemoveLiquidityEvent.cachedBcs) {
      RemoveLiquidityEvent.cachedBcs = RemoveLiquidityEvent.instantiateBcs()
    }
    return RemoveLiquidityEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): RemoveLiquidityEvent {
    return RemoveLiquidityEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      position: decodeFromFields(ID.reified(), fields.position),
      tickLower: decodeFromFields(I32.reified(), fields.tick_lower),
      tickUpper: decodeFromFields(I32.reified(), fields.tick_upper),
      liquidity: decodeFromFields('u128', fields.liquidity),
      afterLiquidity: decodeFromFields('u128', fields.after_liquidity),
      amountA: decodeFromFields('u64', fields.amount_a),
      amountB: decodeFromFields('u64', fields.amount_b),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): RemoveLiquidityEvent {
    if (!isRemoveLiquidityEvent(item.type)) {
      throw new Error('not a RemoveLiquidityEvent type')
    }

    return RemoveLiquidityEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
      tickLower: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_lower),
      tickUpper: decodeFromFieldsWithTypes(I32.reified(), item.fields.tick_upper),
      liquidity: decodeFromFieldsWithTypes('u128', item.fields.liquidity),
      afterLiquidity: decodeFromFieldsWithTypes('u128', item.fields.after_liquidity),
      amountA: decodeFromFieldsWithTypes('u64', item.fields.amount_a),
      amountB: decodeFromFieldsWithTypes('u64', item.fields.amount_b),
    })
  }

  static fromBcs(data: Uint8Array): RemoveLiquidityEvent {
    return RemoveLiquidityEvent.fromFields(RemoveLiquidityEvent.bcs.parse(data))
  }

  toJSONField(): RemoveLiquidityEventJSONField {
    return {
      pool: this.pool,
      position: this.position,
      tickLower: this.tickLower.toJSONField(),
      tickUpper: this.tickUpper.toJSONField(),
      liquidity: this.liquidity.toString(),
      afterLiquidity: this.afterLiquidity.toString(),
      amountA: this.amountA.toString(),
      amountB: this.amountB.toString(),
    }
  }

  toJSON(): RemoveLiquidityEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): RemoveLiquidityEvent {
    return RemoveLiquidityEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      position: decodeFromJSONField(ID.reified(), field.position),
      tickLower: decodeFromJSONField(I32.reified(), field.tickLower),
      tickUpper: decodeFromJSONField(I32.reified(), field.tickUpper),
      liquidity: decodeFromJSONField('u128', field.liquidity),
      afterLiquidity: decodeFromJSONField('u128', field.afterLiquidity),
      amountA: decodeFromJSONField('u64', field.amountA),
      amountB: decodeFromJSONField('u64', field.amountB),
    })
  }

  static fromJSON(json: Record<string, any>): RemoveLiquidityEvent {
    if (json.$typeName !== RemoveLiquidityEvent.$typeName) {
      throw new Error(
        `not a RemoveLiquidityEvent json object: expected '${RemoveLiquidityEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return RemoveLiquidityEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): RemoveLiquidityEvent {
    if (!isRemoveLiquidityEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a RemoveLiquidityEvent object`)
    }
    return RemoveLiquidityEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveLiquidityEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): RemoveLiquidityEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isRemoveLiquidityEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a RemoveLiquidityEvent object`,
      )
    }
    return RemoveLiquidityEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link RemoveLiquidityEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): RemoveLiquidityEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isRemoveLiquidityEvent(data.bcs.type)) {
        throw new Error(`object at is not a RemoveLiquidityEvent object`)
      }

      return RemoveLiquidityEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return RemoveLiquidityEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<RemoveLiquidityEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isRemoveLiquidityEvent(object.type)) {
      throw new Error(`object at id ${id} is not a RemoveLiquidityEvent object`)
    }
    return RemoveLiquidityEvent.fromBcs(object.content)
  }
}

/* ============================== SwapEvent =============================== */

export function isSwapEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::SwapEvent')}::pool::SwapEvent`
}

export interface SwapEventFields {
  atob: ToField<'bool'>
  pool: ToField<ID>
  partner: ToField<ID>
  amountIn: ToField<'u64'>
  amountOut: ToField<'u64'>
  refAmount: ToField<'u64'>
  feeAmount: ToField<'u64'>
  vaultAAmount: ToField<'u64'>
  vaultBAmount: ToField<'u64'>
  beforeSqrtPrice: ToField<'u128'>
  afterSqrtPrice: ToField<'u128'>
  steps: ToField<'u64'>
}

export type SwapEventReified = Reified<SwapEvent, SwapEventFields>

export type SwapEventJSONField = {
  atob: boolean
  pool: string
  partner: string
  amountIn: string
  amountOut: string
  refAmount: string
  feeAmount: string
  vaultAAmount: string
  vaultBAmount: string
  beforeSqrtPrice: string
  afterSqrtPrice: string
  steps: string
}

export type SwapEventJSON = {
  $typeName: typeof SwapEvent.$typeName
  $typeArgs: []
} & SwapEventJSONField

/**
 * Emited when swap in a clmmpool.
 * * `atob` - Whether the swap is from A to B
 * * `pool` - The ID of the pool
 * * `partner` - The ID of the partner
 * * `amount_in` - The amount of coin swapped in
 * * `amount_out` - The amount of coin swapped out
 * * `ref_amount` - The reference fee amount
 * * `fee_amount` - The fee amount
 * * `vault_a_amount` - The amount of coin A in the vault
 * * `vault_b_amount` - The amount of coin B in the vault
 * * `before_sqrt_price` - The sqrt price before the swap
 * * `after_sqrt_price` - The sqrt price after the swap
 * * `steps` - The number of steps in the swap
 */
export class SwapEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::SwapEvent` {
    return `${getTypeOrigin('cetus-clmm', 'pool::SwapEvent')}::pool::SwapEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof SwapEvent.$typeName = SwapEvent.$typeName
  readonly $fullTypeName: `${string}::pool::SwapEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof SwapEvent.$isPhantom = SwapEvent.$isPhantom

  readonly atob: ToField<'bool'>
  readonly pool: ToField<ID>
  readonly partner: ToField<ID>
  readonly amountIn: ToField<'u64'>
  readonly amountOut: ToField<'u64'>
  readonly refAmount: ToField<'u64'>
  readonly feeAmount: ToField<'u64'>
  readonly vaultAAmount: ToField<'u64'>
  readonly vaultBAmount: ToField<'u64'>
  readonly beforeSqrtPrice: ToField<'u128'>
  readonly afterSqrtPrice: ToField<'u128'>
  readonly steps: ToField<'u64'>

  private constructor(typeArgs: [], fields: SwapEventFields) {
    this.$fullTypeName = composeSuiType(
      SwapEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::SwapEvent`
    this.$typeArgs = typeArgs

    this.atob = fields.atob
    this.pool = fields.pool
    this.partner = fields.partner
    this.amountIn = fields.amountIn
    this.amountOut = fields.amountOut
    this.refAmount = fields.refAmount
    this.feeAmount = fields.feeAmount
    this.vaultAAmount = fields.vaultAAmount
    this.vaultBAmount = fields.vaultBAmount
    this.beforeSqrtPrice = fields.beforeSqrtPrice
    this.afterSqrtPrice = fields.afterSqrtPrice
    this.steps = fields.steps
  }

  static reified(): SwapEventReified {
    const reifiedBcs = SwapEvent.bcs
    return {
      get typeName() {
        return SwapEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          SwapEvent.$typeName,
          ...[],
        ) as `${string}::pool::SwapEvent`
      },
      typeArgs: [] as [],
      isPhantom: SwapEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => SwapEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => SwapEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => SwapEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => SwapEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => SwapEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        SwapEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => SwapEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => SwapEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => SwapEvent.fetch(client, id),
      new: (fields: SwapEventFields) => {
        return new SwapEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): SwapEventReified {
    return SwapEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<SwapEvent>> {
    return phantom(SwapEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<SwapEvent>> {
    return SwapEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('SwapEvent', {
      atob: bcs.bool(),
      pool: ID.bcs,
      partner: ID.bcs,
      amount_in: bcs.u64(),
      amount_out: bcs.u64(),
      ref_amount: bcs.u64(),
      fee_amount: bcs.u64(),
      vault_a_amount: bcs.u64(),
      vault_b_amount: bcs.u64(),
      before_sqrt_price: bcs.u128(),
      after_sqrt_price: bcs.u128(),
      steps: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof SwapEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof SwapEvent.instantiateBcs> {
    if (!SwapEvent.cachedBcs) {
      SwapEvent.cachedBcs = SwapEvent.instantiateBcs()
    }
    return SwapEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): SwapEvent {
    return SwapEvent.reified().new({
      atob: decodeFromFields('bool', fields.atob),
      pool: decodeFromFields(ID.reified(), fields.pool),
      partner: decodeFromFields(ID.reified(), fields.partner),
      amountIn: decodeFromFields('u64', fields.amount_in),
      amountOut: decodeFromFields('u64', fields.amount_out),
      refAmount: decodeFromFields('u64', fields.ref_amount),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      vaultAAmount: decodeFromFields('u64', fields.vault_a_amount),
      vaultBAmount: decodeFromFields('u64', fields.vault_b_amount),
      beforeSqrtPrice: decodeFromFields('u128', fields.before_sqrt_price),
      afterSqrtPrice: decodeFromFields('u128', fields.after_sqrt_price),
      steps: decodeFromFields('u64', fields.steps),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): SwapEvent {
    if (!isSwapEvent(item.type)) {
      throw new Error('not a SwapEvent type')
    }

    return SwapEvent.reified().new({
      atob: decodeFromFieldsWithTypes('bool', item.fields.atob),
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      partner: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner),
      amountIn: decodeFromFieldsWithTypes('u64', item.fields.amount_in),
      amountOut: decodeFromFieldsWithTypes('u64', item.fields.amount_out),
      refAmount: decodeFromFieldsWithTypes('u64', item.fields.ref_amount),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      vaultAAmount: decodeFromFieldsWithTypes('u64', item.fields.vault_a_amount),
      vaultBAmount: decodeFromFieldsWithTypes('u64', item.fields.vault_b_amount),
      beforeSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.before_sqrt_price),
      afterSqrtPrice: decodeFromFieldsWithTypes('u128', item.fields.after_sqrt_price),
      steps: decodeFromFieldsWithTypes('u64', item.fields.steps),
    })
  }

  static fromBcs(data: Uint8Array): SwapEvent {
    return SwapEvent.fromFields(SwapEvent.bcs.parse(data))
  }

  toJSONField(): SwapEventJSONField {
    return {
      atob: this.atob,
      pool: this.pool,
      partner: this.partner,
      amountIn: this.amountIn.toString(),
      amountOut: this.amountOut.toString(),
      refAmount: this.refAmount.toString(),
      feeAmount: this.feeAmount.toString(),
      vaultAAmount: this.vaultAAmount.toString(),
      vaultBAmount: this.vaultBAmount.toString(),
      beforeSqrtPrice: this.beforeSqrtPrice.toString(),
      afterSqrtPrice: this.afterSqrtPrice.toString(),
      steps: this.steps.toString(),
    }
  }

  toJSON(): SwapEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): SwapEvent {
    return SwapEvent.reified().new({
      atob: decodeFromJSONField('bool', field.atob),
      pool: decodeFromJSONField(ID.reified(), field.pool),
      partner: decodeFromJSONField(ID.reified(), field.partner),
      amountIn: decodeFromJSONField('u64', field.amountIn),
      amountOut: decodeFromJSONField('u64', field.amountOut),
      refAmount: decodeFromJSONField('u64', field.refAmount),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      vaultAAmount: decodeFromJSONField('u64', field.vaultAAmount),
      vaultBAmount: decodeFromJSONField('u64', field.vaultBAmount),
      beforeSqrtPrice: decodeFromJSONField('u128', field.beforeSqrtPrice),
      afterSqrtPrice: decodeFromJSONField('u128', field.afterSqrtPrice),
      steps: decodeFromJSONField('u64', field.steps),
    })
  }

  static fromJSON(json: Record<string, any>): SwapEvent {
    if (json.$typeName !== SwapEvent.$typeName) {
      throw new Error(
        `not a SwapEvent json object: expected '${SwapEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return SwapEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): SwapEvent {
    if (!isSwapEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a SwapEvent object`)
    }
    return SwapEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwapEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): SwapEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isSwapEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a SwapEvent object`)
    }
    return SwapEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link SwapEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): SwapEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isSwapEvent(data.bcs.type)) {
        throw new Error(`object at is not a SwapEvent object`)
      }

      return SwapEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return SwapEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<SwapEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isSwapEvent(object.type)) {
      throw new Error(`object at id ${id} is not a SwapEvent object`)
    }
    return SwapEvent.fromBcs(object.content)
  }
}

/* ============================== CollectProtocolFeeEvent =============================== */

export function isCollectProtocolFeeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${
      getTypeOrigin('cetus-clmm', 'pool::CollectProtocolFeeEvent')
    }::pool::CollectProtocolFeeEvent`
}

export interface CollectProtocolFeeEventFields {
  pool: ToField<ID>
  amountA: ToField<'u64'>
  amountB: ToField<'u64'>
}

export type CollectProtocolFeeEventReified = Reified<
  CollectProtocolFeeEvent,
  CollectProtocolFeeEventFields
>

export type CollectProtocolFeeEventJSONField = {
  pool: string
  amountA: string
  amountB: string
}

export type CollectProtocolFeeEventJSON = {
  $typeName: typeof CollectProtocolFeeEvent.$typeName
  $typeArgs: []
} & CollectProtocolFeeEventJSONField

/**
 * Emited when the porotocol manager collect protocol fee from clmmpool.
 * * `pool` - The ID of the pool
 * * `amount_a` - The amount of coin A collected
 * * `amount_b` - The amount of coin B collected
 */
export class CollectProtocolFeeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::CollectProtocolFeeEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::CollectProtocolFeeEvent')
    }::pool::CollectProtocolFeeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollectProtocolFeeEvent.$typeName = CollectProtocolFeeEvent.$typeName
  readonly $fullTypeName: `${string}::pool::CollectProtocolFeeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollectProtocolFeeEvent.$isPhantom =
    CollectProtocolFeeEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly amountA: ToField<'u64'>
  readonly amountB: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollectProtocolFeeEventFields) {
    this.$fullTypeName = composeSuiType(
      CollectProtocolFeeEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::CollectProtocolFeeEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.amountA = fields.amountA
    this.amountB = fields.amountB
  }

  static reified(): CollectProtocolFeeEventReified {
    const reifiedBcs = CollectProtocolFeeEvent.bcs
    return {
      get typeName() {
        return CollectProtocolFeeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CollectProtocolFeeEvent.$typeName,
          ...[],
        ) as `${string}::pool::CollectProtocolFeeEvent`
      },
      typeArgs: [] as [],
      isPhantom: CollectProtocolFeeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollectProtocolFeeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CollectProtocolFeeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollectProtocolFeeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollectProtocolFeeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollectProtocolFeeEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CollectProtocolFeeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CollectProtocolFeeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CollectProtocolFeeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CollectProtocolFeeEvent.fetch(client, id),
      new: (fields: CollectProtocolFeeEventFields) => {
        return new CollectProtocolFeeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollectProtocolFeeEventReified {
    return CollectProtocolFeeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollectProtocolFeeEvent>> {
    return phantom(CollectProtocolFeeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollectProtocolFeeEvent>> {
    return CollectProtocolFeeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollectProtocolFeeEvent', {
      pool: ID.bcs,
      amount_a: bcs.u64(),
      amount_b: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollectProtocolFeeEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollectProtocolFeeEvent.instantiateBcs> {
    if (!CollectProtocolFeeEvent.cachedBcs) {
      CollectProtocolFeeEvent.cachedBcs = CollectProtocolFeeEvent.instantiateBcs()
    }
    return CollectProtocolFeeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CollectProtocolFeeEvent {
    return CollectProtocolFeeEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      amountA: decodeFromFields('u64', fields.amount_a),
      amountB: decodeFromFields('u64', fields.amount_b),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollectProtocolFeeEvent {
    if (!isCollectProtocolFeeEvent(item.type)) {
      throw new Error('not a CollectProtocolFeeEvent type')
    }

    return CollectProtocolFeeEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      amountA: decodeFromFieldsWithTypes('u64', item.fields.amount_a),
      amountB: decodeFromFieldsWithTypes('u64', item.fields.amount_b),
    })
  }

  static fromBcs(data: Uint8Array): CollectProtocolFeeEvent {
    return CollectProtocolFeeEvent.fromFields(CollectProtocolFeeEvent.bcs.parse(data))
  }

  toJSONField(): CollectProtocolFeeEventJSONField {
    return {
      pool: this.pool,
      amountA: this.amountA.toString(),
      amountB: this.amountB.toString(),
    }
  }

  toJSON(): CollectProtocolFeeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollectProtocolFeeEvent {
    return CollectProtocolFeeEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      amountA: decodeFromJSONField('u64', field.amountA),
      amountB: decodeFromJSONField('u64', field.amountB),
    })
  }

  static fromJSON(json: Record<string, any>): CollectProtocolFeeEvent {
    if (json.$typeName !== CollectProtocolFeeEvent.$typeName) {
      throw new Error(
        `not a CollectProtocolFeeEvent json object: expected '${CollectProtocolFeeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollectProtocolFeeEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CollectProtocolFeeEvent {
    if (!isCollectProtocolFeeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CollectProtocolFeeEvent object`)
    }
    return CollectProtocolFeeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectProtocolFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CollectProtocolFeeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollectProtocolFeeEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CollectProtocolFeeEvent object`,
      )
    }
    return CollectProtocolFeeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectProtocolFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CollectProtocolFeeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollectProtocolFeeEvent(data.bcs.type)) {
        throw new Error(`object at is not a CollectProtocolFeeEvent object`)
      }

      return CollectProtocolFeeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollectProtocolFeeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CollectProtocolFeeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCollectProtocolFeeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a CollectProtocolFeeEvent object`)
    }
    return CollectProtocolFeeEvent.fromBcs(object.content)
  }
}

/* ============================== CollectFeeEvent =============================== */

export function isCollectFeeEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::CollectFeeEvent')}::pool::CollectFeeEvent`
}

export interface CollectFeeEventFields {
  position: ToField<ID>
  pool: ToField<ID>
  amountA: ToField<'u64'>
  amountB: ToField<'u64'>
}

export type CollectFeeEventReified = Reified<CollectFeeEvent, CollectFeeEventFields>

export type CollectFeeEventJSONField = {
  position: string
  pool: string
  amountA: string
  amountB: string
}

export type CollectFeeEventJSON = {
  $typeName: typeof CollectFeeEvent.$typeName
  $typeArgs: []
} & CollectFeeEventJSONField

/**
 * Emited when user collect liquidity fee from a position.
 * * `position` - The ID of the position
 * * `pool` - The ID of the pool
 * * `amount_a` - The amount of coin A collected
 * * `amount_b` - The amount of coin B collected
 */
export class CollectFeeEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::CollectFeeEvent` {
    return `${getTypeOrigin('cetus-clmm', 'pool::CollectFeeEvent')}::pool::CollectFeeEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollectFeeEvent.$typeName = CollectFeeEvent.$typeName
  readonly $fullTypeName: `${string}::pool::CollectFeeEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollectFeeEvent.$isPhantom = CollectFeeEvent.$isPhantom

  readonly position: ToField<ID>
  readonly pool: ToField<ID>
  readonly amountA: ToField<'u64'>
  readonly amountB: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollectFeeEventFields) {
    this.$fullTypeName = composeSuiType(
      CollectFeeEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::CollectFeeEvent`
    this.$typeArgs = typeArgs

    this.position = fields.position
    this.pool = fields.pool
    this.amountA = fields.amountA
    this.amountB = fields.amountB
  }

  static reified(): CollectFeeEventReified {
    const reifiedBcs = CollectFeeEvent.bcs
    return {
      get typeName() {
        return CollectFeeEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CollectFeeEvent.$typeName,
          ...[],
        ) as `${string}::pool::CollectFeeEvent`
      },
      typeArgs: [] as [],
      isPhantom: CollectFeeEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollectFeeEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CollectFeeEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollectFeeEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollectFeeEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollectFeeEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CollectFeeEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => CollectFeeEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CollectFeeEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => CollectFeeEvent.fetch(client, id),
      new: (fields: CollectFeeEventFields) => {
        return new CollectFeeEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollectFeeEventReified {
    return CollectFeeEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollectFeeEvent>> {
    return phantom(CollectFeeEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollectFeeEvent>> {
    return CollectFeeEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollectFeeEvent', {
      position: ID.bcs,
      pool: ID.bcs,
      amount_a: bcs.u64(),
      amount_b: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollectFeeEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollectFeeEvent.instantiateBcs> {
    if (!CollectFeeEvent.cachedBcs) {
      CollectFeeEvent.cachedBcs = CollectFeeEvent.instantiateBcs()
    }
    return CollectFeeEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CollectFeeEvent {
    return CollectFeeEvent.reified().new({
      position: decodeFromFields(ID.reified(), fields.position),
      pool: decodeFromFields(ID.reified(), fields.pool),
      amountA: decodeFromFields('u64', fields.amount_a),
      amountB: decodeFromFields('u64', fields.amount_b),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollectFeeEvent {
    if (!isCollectFeeEvent(item.type)) {
      throw new Error('not a CollectFeeEvent type')
    }

    return CollectFeeEvent.reified().new({
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      amountA: decodeFromFieldsWithTypes('u64', item.fields.amount_a),
      amountB: decodeFromFieldsWithTypes('u64', item.fields.amount_b),
    })
  }

  static fromBcs(data: Uint8Array): CollectFeeEvent {
    return CollectFeeEvent.fromFields(CollectFeeEvent.bcs.parse(data))
  }

  toJSONField(): CollectFeeEventJSONField {
    return {
      position: this.position,
      pool: this.pool,
      amountA: this.amountA.toString(),
      amountB: this.amountB.toString(),
    }
  }

  toJSON(): CollectFeeEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollectFeeEvent {
    return CollectFeeEvent.reified().new({
      position: decodeFromJSONField(ID.reified(), field.position),
      pool: decodeFromJSONField(ID.reified(), field.pool),
      amountA: decodeFromJSONField('u64', field.amountA),
      amountB: decodeFromJSONField('u64', field.amountB),
    })
  }

  static fromJSON(json: Record<string, any>): CollectFeeEvent {
    if (json.$typeName !== CollectFeeEvent.$typeName) {
      throw new Error(
        `not a CollectFeeEvent json object: expected '${CollectFeeEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollectFeeEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CollectFeeEvent {
    if (!isCollectFeeEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CollectFeeEvent object`)
    }
    return CollectFeeEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CollectFeeEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollectFeeEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CollectFeeEvent object`)
    }
    return CollectFeeEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectFeeEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CollectFeeEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollectFeeEvent(data.bcs.type)) {
        throw new Error(`object at is not a CollectFeeEvent object`)
      }

      return CollectFeeEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollectFeeEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CollectFeeEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCollectFeeEvent(object.type)) {
      throw new Error(`object at id ${id} is not a CollectFeeEvent object`)
    }
    return CollectFeeEvent.fromBcs(object.content)
  }
}

/* ============================== UpdateFeeRateEvent =============================== */

export function isUpdateFeeRateEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::UpdateFeeRateEvent')}::pool::UpdateFeeRateEvent`
}

export interface UpdateFeeRateEventFields {
  pool: ToField<ID>
  oldFeeRate: ToField<'u64'>
  newFeeRate: ToField<'u64'>
}

export type UpdateFeeRateEventReified = Reified<UpdateFeeRateEvent, UpdateFeeRateEventFields>

export type UpdateFeeRateEventJSONField = {
  pool: string
  oldFeeRate: string
  newFeeRate: string
}

export type UpdateFeeRateEventJSON = {
  $typeName: typeof UpdateFeeRateEvent.$typeName
  $typeArgs: []
} & UpdateFeeRateEventJSONField

/**
 * Emited when the clmmpool's liqudity fee rate had updated.
 * * `pool` - The ID of the pool
 * * `old_fee_rate` - The old fee rate
 * * `new_fee_rate` - The new fee rate
 */
export class UpdateFeeRateEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::UpdateFeeRateEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::UpdateFeeRateEvent')
    }::pool::UpdateFeeRateEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateFeeRateEvent.$typeName = UpdateFeeRateEvent.$typeName
  readonly $fullTypeName: `${string}::pool::UpdateFeeRateEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateFeeRateEvent.$isPhantom = UpdateFeeRateEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly oldFeeRate: ToField<'u64'>
  readonly newFeeRate: ToField<'u64'>

  private constructor(typeArgs: [], fields: UpdateFeeRateEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateFeeRateEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::UpdateFeeRateEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.oldFeeRate = fields.oldFeeRate
    this.newFeeRate = fields.newFeeRate
  }

  static reified(): UpdateFeeRateEventReified {
    const reifiedBcs = UpdateFeeRateEvent.bcs
    return {
      get typeName() {
        return UpdateFeeRateEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdateFeeRateEvent.$typeName,
          ...[],
        ) as `${string}::pool::UpdateFeeRateEvent`
      },
      typeArgs: [] as [],
      isPhantom: UpdateFeeRateEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateFeeRateEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateFeeRateEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateFeeRateEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateFeeRateEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateFeeRateEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdateFeeRateEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => UpdateFeeRateEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpdateFeeRateEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => UpdateFeeRateEvent.fetch(client, id),
      new: (fields: UpdateFeeRateEventFields) => {
        return new UpdateFeeRateEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateFeeRateEventReified {
    return UpdateFeeRateEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateFeeRateEvent>> {
    return phantom(UpdateFeeRateEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateFeeRateEvent>> {
    return UpdateFeeRateEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateFeeRateEvent', {
      pool: ID.bcs,
      old_fee_rate: bcs.u64(),
      new_fee_rate: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateFeeRateEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateFeeRateEvent.instantiateBcs> {
    if (!UpdateFeeRateEvent.cachedBcs) {
      UpdateFeeRateEvent.cachedBcs = UpdateFeeRateEvent.instantiateBcs()
    }
    return UpdateFeeRateEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateFeeRateEvent {
    return UpdateFeeRateEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      oldFeeRate: decodeFromFields('u64', fields.old_fee_rate),
      newFeeRate: decodeFromFields('u64', fields.new_fee_rate),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateFeeRateEvent {
    if (!isUpdateFeeRateEvent(item.type)) {
      throw new Error('not a UpdateFeeRateEvent type')
    }

    return UpdateFeeRateEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      oldFeeRate: decodeFromFieldsWithTypes('u64', item.fields.old_fee_rate),
      newFeeRate: decodeFromFieldsWithTypes('u64', item.fields.new_fee_rate),
    })
  }

  static fromBcs(data: Uint8Array): UpdateFeeRateEvent {
    return UpdateFeeRateEvent.fromFields(UpdateFeeRateEvent.bcs.parse(data))
  }

  toJSONField(): UpdateFeeRateEventJSONField {
    return {
      pool: this.pool,
      oldFeeRate: this.oldFeeRate.toString(),
      newFeeRate: this.newFeeRate.toString(),
    }
  }

  toJSON(): UpdateFeeRateEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateFeeRateEvent {
    return UpdateFeeRateEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      oldFeeRate: decodeFromJSONField('u64', field.oldFeeRate),
      newFeeRate: decodeFromJSONField('u64', field.newFeeRate),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateFeeRateEvent {
    if (json.$typeName !== UpdateFeeRateEvent.$typeName) {
      throw new Error(
        `not a UpdateFeeRateEvent json object: expected '${UpdateFeeRateEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateFeeRateEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpdateFeeRateEvent {
    if (!isUpdateFeeRateEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdateFeeRateEvent object`)
    }
    return UpdateFeeRateEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateFeeRateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdateFeeRateEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateFeeRateEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpdateFeeRateEvent object`)
    }
    return UpdateFeeRateEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateFeeRateEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdateFeeRateEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateFeeRateEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateFeeRateEvent object`)
      }

      return UpdateFeeRateEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateFeeRateEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdateFeeRateEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdateFeeRateEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdateFeeRateEvent object`)
    }
    return UpdateFeeRateEvent.fromBcs(object.content)
  }
}

/* ============================== UpdateEmissionEvent =============================== */

export function isUpdateEmissionEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::UpdateEmissionEvent')}::pool::UpdateEmissionEvent`
}

export interface UpdateEmissionEventFields {
  pool: ToField<ID>
  rewarderType: ToField<TypeName>
  emissionsPerSecond: ToField<'u128'>
}

export type UpdateEmissionEventReified = Reified<UpdateEmissionEvent, UpdateEmissionEventFields>

export type UpdateEmissionEventJSONField = {
  pool: string
  rewarderType: string
  emissionsPerSecond: string
}

export type UpdateEmissionEventJSON = {
  $typeName: typeof UpdateEmissionEvent.$typeName
  $typeArgs: []
} & UpdateEmissionEventJSONField

/**
 * Emited when the rewarder's emission per second had updated.
 * * `pool` - The ID of the pool
 * * `rewarder_type` - The type of the rewarder
 * * `emissions_per_second` - The emissions per second
 */
export class UpdateEmissionEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::UpdateEmissionEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::UpdateEmissionEvent')
    }::pool::UpdateEmissionEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdateEmissionEvent.$typeName = UpdateEmissionEvent.$typeName
  readonly $fullTypeName: `${string}::pool::UpdateEmissionEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdateEmissionEvent.$isPhantom = UpdateEmissionEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly rewarderType: ToField<TypeName>
  readonly emissionsPerSecond: ToField<'u128'>

  private constructor(typeArgs: [], fields: UpdateEmissionEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdateEmissionEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::UpdateEmissionEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.rewarderType = fields.rewarderType
    this.emissionsPerSecond = fields.emissionsPerSecond
  }

  static reified(): UpdateEmissionEventReified {
    const reifiedBcs = UpdateEmissionEvent.bcs
    return {
      get typeName() {
        return UpdateEmissionEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdateEmissionEvent.$typeName,
          ...[],
        ) as `${string}::pool::UpdateEmissionEvent`
      },
      typeArgs: [] as [],
      isPhantom: UpdateEmissionEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdateEmissionEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UpdateEmissionEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdateEmissionEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdateEmissionEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdateEmissionEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdateEmissionEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => UpdateEmissionEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => UpdateEmissionEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => UpdateEmissionEvent.fetch(client, id),
      new: (fields: UpdateEmissionEventFields) => {
        return new UpdateEmissionEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdateEmissionEventReified {
    return UpdateEmissionEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdateEmissionEvent>> {
    return phantom(UpdateEmissionEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdateEmissionEvent>> {
    return UpdateEmissionEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdateEmissionEvent', {
      pool: ID.bcs,
      rewarder_type: TypeName.bcs,
      emissions_per_second: bcs.u128(),
    })
  }

  private static cachedBcs: ReturnType<typeof UpdateEmissionEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdateEmissionEvent.instantiateBcs> {
    if (!UpdateEmissionEvent.cachedBcs) {
      UpdateEmissionEvent.cachedBcs = UpdateEmissionEvent.instantiateBcs()
    }
    return UpdateEmissionEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdateEmissionEvent {
    return UpdateEmissionEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      rewarderType: decodeFromFields(TypeName.reified(), fields.rewarder_type),
      emissionsPerSecond: decodeFromFields('u128', fields.emissions_per_second),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdateEmissionEvent {
    if (!isUpdateEmissionEvent(item.type)) {
      throw new Error('not a UpdateEmissionEvent type')
    }

    return UpdateEmissionEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      rewarderType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.rewarder_type),
      emissionsPerSecond: decodeFromFieldsWithTypes('u128', item.fields.emissions_per_second),
    })
  }

  static fromBcs(data: Uint8Array): UpdateEmissionEvent {
    return UpdateEmissionEvent.fromFields(UpdateEmissionEvent.bcs.parse(data))
  }

  toJSONField(): UpdateEmissionEventJSONField {
    return {
      pool: this.pool,
      rewarderType: this.rewarderType,
      emissionsPerSecond: this.emissionsPerSecond.toString(),
    }
  }

  toJSON(): UpdateEmissionEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdateEmissionEvent {
    return UpdateEmissionEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      rewarderType: decodeFromJSONField(TypeName.reified(), field.rewarderType),
      emissionsPerSecond: decodeFromJSONField('u128', field.emissionsPerSecond),
    })
  }

  static fromJSON(json: Record<string, any>): UpdateEmissionEvent {
    if (json.$typeName !== UpdateEmissionEvent.$typeName) {
      throw new Error(
        `not a UpdateEmissionEvent json object: expected '${UpdateEmissionEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdateEmissionEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpdateEmissionEvent {
    if (!isUpdateEmissionEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdateEmissionEvent object`)
    }
    return UpdateEmissionEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateEmissionEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdateEmissionEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdateEmissionEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a UpdateEmissionEvent object`)
    }
    return UpdateEmissionEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdateEmissionEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdateEmissionEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdateEmissionEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdateEmissionEvent object`)
      }

      return UpdateEmissionEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdateEmissionEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdateEmissionEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdateEmissionEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdateEmissionEvent object`)
    }
    return UpdateEmissionEvent.fromBcs(object.content)
  }
}

/* ============================== AddRewarderEvent =============================== */

export function isAddRewarderEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::AddRewarderEvent')}::pool::AddRewarderEvent`
}

export interface AddRewarderEventFields {
  pool: ToField<ID>
  rewarderType: ToField<TypeName>
}

export type AddRewarderEventReified = Reified<AddRewarderEvent, AddRewarderEventFields>

export type AddRewarderEventJSONField = {
  pool: string
  rewarderType: string
}

export type AddRewarderEventJSON = {
  $typeName: typeof AddRewarderEvent.$typeName
  $typeArgs: []
} & AddRewarderEventJSONField

/**
 * Emited when a rewarder append to clmmpool.
 * * `pool` - The ID of the pool
 * * `rewarder_type` - The type of the rewarder
 */
export class AddRewarderEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::AddRewarderEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::AddRewarderEvent')
    }::pool::AddRewarderEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof AddRewarderEvent.$typeName = AddRewarderEvent.$typeName
  readonly $fullTypeName: `${string}::pool::AddRewarderEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof AddRewarderEvent.$isPhantom = AddRewarderEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly rewarderType: ToField<TypeName>

  private constructor(typeArgs: [], fields: AddRewarderEventFields) {
    this.$fullTypeName = composeSuiType(
      AddRewarderEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::AddRewarderEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.rewarderType = fields.rewarderType
  }

  static reified(): AddRewarderEventReified {
    const reifiedBcs = AddRewarderEvent.bcs
    return {
      get typeName() {
        return AddRewarderEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          AddRewarderEvent.$typeName,
          ...[],
        ) as `${string}::pool::AddRewarderEvent`
      },
      typeArgs: [] as [],
      isPhantom: AddRewarderEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => AddRewarderEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => AddRewarderEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AddRewarderEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => AddRewarderEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AddRewarderEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        AddRewarderEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => AddRewarderEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => AddRewarderEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => AddRewarderEvent.fetch(client, id),
      new: (fields: AddRewarderEventFields) => {
        return new AddRewarderEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): AddRewarderEventReified {
    return AddRewarderEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<AddRewarderEvent>> {
    return phantom(AddRewarderEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<AddRewarderEvent>> {
    return AddRewarderEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('AddRewarderEvent', {
      pool: ID.bcs,
      rewarder_type: TypeName.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof AddRewarderEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof AddRewarderEvent.instantiateBcs> {
    if (!AddRewarderEvent.cachedBcs) {
      AddRewarderEvent.cachedBcs = AddRewarderEvent.instantiateBcs()
    }
    return AddRewarderEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): AddRewarderEvent {
    return AddRewarderEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      rewarderType: decodeFromFields(TypeName.reified(), fields.rewarder_type),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AddRewarderEvent {
    if (!isAddRewarderEvent(item.type)) {
      throw new Error('not a AddRewarderEvent type')
    }

    return AddRewarderEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      rewarderType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.rewarder_type),
    })
  }

  static fromBcs(data: Uint8Array): AddRewarderEvent {
    return AddRewarderEvent.fromFields(AddRewarderEvent.bcs.parse(data))
  }

  toJSONField(): AddRewarderEventJSONField {
    return {
      pool: this.pool,
      rewarderType: this.rewarderType,
    }
  }

  toJSON(): AddRewarderEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): AddRewarderEvent {
    return AddRewarderEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      rewarderType: decodeFromJSONField(TypeName.reified(), field.rewarderType),
    })
  }

  static fromJSON(json: Record<string, any>): AddRewarderEvent {
    if (json.$typeName !== AddRewarderEvent.$typeName) {
      throw new Error(
        `not a AddRewarderEvent json object: expected '${AddRewarderEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return AddRewarderEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): AddRewarderEvent {
    if (!isAddRewarderEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a AddRewarderEvent object`)
    }
    return AddRewarderEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddRewarderEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): AddRewarderEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isAddRewarderEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a AddRewarderEvent object`)
    }
    return AddRewarderEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link AddRewarderEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): AddRewarderEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isAddRewarderEvent(data.bcs.type)) {
        throw new Error(`object at is not a AddRewarderEvent object`)
      }

      return AddRewarderEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return AddRewarderEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<AddRewarderEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isAddRewarderEvent(object.type)) {
      throw new Error(`object at id ${id} is not a AddRewarderEvent object`)
    }
    return AddRewarderEvent.fromBcs(object.content)
  }
}

/* ============================== CollectRewardEvent =============================== */

export function isCollectRewardEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::CollectRewardEvent')}::pool::CollectRewardEvent`
}

export interface CollectRewardEventFields {
  position: ToField<ID>
  pool: ToField<ID>
  amount: ToField<'u64'>
}

export type CollectRewardEventReified = Reified<CollectRewardEvent, CollectRewardEventFields>

export type CollectRewardEventJSONField = {
  position: string
  pool: string
  amount: string
}

export type CollectRewardEventJSON = {
  $typeName: typeof CollectRewardEvent.$typeName
  $typeArgs: []
} & CollectRewardEventJSONField

/**
 * Emited when collect reward from clmmpool's rewarder.
 * * `position` - The ID of the position
 * * `pool` - The ID of the pool
 * * `amount` - The amount of coin collected
 */
export class CollectRewardEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::CollectRewardEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::CollectRewardEvent')
    }::pool::CollectRewardEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollectRewardEvent.$typeName = CollectRewardEvent.$typeName
  readonly $fullTypeName: `${string}::pool::CollectRewardEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollectRewardEvent.$isPhantom = CollectRewardEvent.$isPhantom

  readonly position: ToField<ID>
  readonly pool: ToField<ID>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollectRewardEventFields) {
    this.$fullTypeName = composeSuiType(
      CollectRewardEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::CollectRewardEvent`
    this.$typeArgs = typeArgs

    this.position = fields.position
    this.pool = fields.pool
    this.amount = fields.amount
  }

  static reified(): CollectRewardEventReified {
    const reifiedBcs = CollectRewardEvent.bcs
    return {
      get typeName() {
        return CollectRewardEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CollectRewardEvent.$typeName,
          ...[],
        ) as `${string}::pool::CollectRewardEvent`
      },
      typeArgs: [] as [],
      isPhantom: CollectRewardEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollectRewardEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => CollectRewardEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollectRewardEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollectRewardEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollectRewardEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CollectRewardEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => CollectRewardEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => CollectRewardEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => CollectRewardEvent.fetch(client, id),
      new: (fields: CollectRewardEventFields) => {
        return new CollectRewardEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollectRewardEventReified {
    return CollectRewardEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollectRewardEvent>> {
    return phantom(CollectRewardEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollectRewardEvent>> {
    return CollectRewardEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollectRewardEvent', {
      position: ID.bcs,
      pool: ID.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollectRewardEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollectRewardEvent.instantiateBcs> {
    if (!CollectRewardEvent.cachedBcs) {
      CollectRewardEvent.cachedBcs = CollectRewardEvent.instantiateBcs()
    }
    return CollectRewardEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CollectRewardEvent {
    return CollectRewardEvent.reified().new({
      position: decodeFromFields(ID.reified(), fields.position),
      pool: decodeFromFields(ID.reified(), fields.pool),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollectRewardEvent {
    if (!isCollectRewardEvent(item.type)) {
      throw new Error('not a CollectRewardEvent type')
    }

    return CollectRewardEvent.reified().new({
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): CollectRewardEvent {
    return CollectRewardEvent.fromFields(CollectRewardEvent.bcs.parse(data))
  }

  toJSONField(): CollectRewardEventJSONField {
    return {
      position: this.position,
      pool: this.pool,
      amount: this.amount.toString(),
    }
  }

  toJSON(): CollectRewardEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollectRewardEvent {
    return CollectRewardEvent.reified().new({
      position: decodeFromJSONField(ID.reified(), field.position),
      pool: decodeFromJSONField(ID.reified(), field.pool),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): CollectRewardEvent {
    if (json.$typeName !== CollectRewardEvent.$typeName) {
      throw new Error(
        `not a CollectRewardEvent json object: expected '${CollectRewardEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollectRewardEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CollectRewardEvent {
    if (!isCollectRewardEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CollectRewardEvent object`)
    }
    return CollectRewardEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectRewardEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CollectRewardEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollectRewardEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a CollectRewardEvent object`)
    }
    return CollectRewardEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectRewardEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CollectRewardEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollectRewardEvent(data.bcs.type)) {
        throw new Error(`object at is not a CollectRewardEvent object`)
      }

      return CollectRewardEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollectRewardEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CollectRewardEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCollectRewardEvent(object.type)) {
      throw new Error(`object at id ${id} is not a CollectRewardEvent object`)
    }
    return CollectRewardEvent.fromBcs(object.content)
  }
}

/* ============================== CollectRewardV2Event =============================== */

export function isCollectRewardV2Event(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::CollectRewardV2Event')}::pool::CollectRewardV2Event`
}

export interface CollectRewardV2EventFields {
  position: ToField<ID>
  pool: ToField<ID>
  rewarderType: ToField<TypeName>
  amount: ToField<'u64'>
}

export type CollectRewardV2EventReified = Reified<CollectRewardV2Event, CollectRewardV2EventFields>

export type CollectRewardV2EventJSONField = {
  position: string
  pool: string
  rewarderType: string
  amount: string
}

export type CollectRewardV2EventJSON = {
  $typeName: typeof CollectRewardV2Event.$typeName
  $typeArgs: []
} & CollectRewardV2EventJSONField

/**
 * Emited when collect reward from clmmpool's rewarder.
 * * `position` - The ID of the position
 * * `pool` - The ID of the pool
 * * `rewarder_type` - The type of the rewarder
 * * `amount` - The amount of coin collected
 */
export class CollectRewardV2Event implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::CollectRewardV2Event` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::CollectRewardV2Event')
    }::pool::CollectRewardV2Event` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof CollectRewardV2Event.$typeName = CollectRewardV2Event.$typeName
  readonly $fullTypeName: `${string}::pool::CollectRewardV2Event`
  readonly $typeArgs: []
  readonly $isPhantom: typeof CollectRewardV2Event.$isPhantom = CollectRewardV2Event.$isPhantom

  readonly position: ToField<ID>
  readonly pool: ToField<ID>
  readonly rewarderType: ToField<TypeName>
  readonly amount: ToField<'u64'>

  private constructor(typeArgs: [], fields: CollectRewardV2EventFields) {
    this.$fullTypeName = composeSuiType(
      CollectRewardV2Event.$typeName,
      ...typeArgs,
    ) as `${string}::pool::CollectRewardV2Event`
    this.$typeArgs = typeArgs

    this.position = fields.position
    this.pool = fields.pool
    this.rewarderType = fields.rewarderType
    this.amount = fields.amount
  }

  static reified(): CollectRewardV2EventReified {
    const reifiedBcs = CollectRewardV2Event.bcs
    return {
      get typeName() {
        return CollectRewardV2Event.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          CollectRewardV2Event.$typeName,
          ...[],
        ) as `${string}::pool::CollectRewardV2Event`
      },
      typeArgs: [] as [],
      isPhantom: CollectRewardV2Event.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => CollectRewardV2Event.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        CollectRewardV2Event.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => CollectRewardV2Event.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => CollectRewardV2Event.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => CollectRewardV2Event.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        CollectRewardV2Event.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        CollectRewardV2Event.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        CollectRewardV2Event.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        CollectRewardV2Event.fetch(client, id),
      new: (fields: CollectRewardV2EventFields) => {
        return new CollectRewardV2Event([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): CollectRewardV2EventReified {
    return CollectRewardV2Event.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<CollectRewardV2Event>> {
    return phantom(CollectRewardV2Event.reified())
  }

  static get p(): PhantomReified<ToTypeStr<CollectRewardV2Event>> {
    return CollectRewardV2Event.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('CollectRewardV2Event', {
      position: ID.bcs,
      pool: ID.bcs,
      rewarder_type: TypeName.bcs,
      amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof CollectRewardV2Event.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof CollectRewardV2Event.instantiateBcs> {
    if (!CollectRewardV2Event.cachedBcs) {
      CollectRewardV2Event.cachedBcs = CollectRewardV2Event.instantiateBcs()
    }
    return CollectRewardV2Event.cachedBcs
  }

  static fromFields(fields: Record<string, any>): CollectRewardV2Event {
    return CollectRewardV2Event.reified().new({
      position: decodeFromFields(ID.reified(), fields.position),
      pool: decodeFromFields(ID.reified(), fields.pool),
      rewarderType: decodeFromFields(TypeName.reified(), fields.rewarder_type),
      amount: decodeFromFields('u64', fields.amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): CollectRewardV2Event {
    if (!isCollectRewardV2Event(item.type)) {
      throw new Error('not a CollectRewardV2Event type')
    }

    return CollectRewardV2Event.reified().new({
      position: decodeFromFieldsWithTypes(ID.reified(), item.fields.position),
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      rewarderType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.rewarder_type),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
    })
  }

  static fromBcs(data: Uint8Array): CollectRewardV2Event {
    return CollectRewardV2Event.fromFields(CollectRewardV2Event.bcs.parse(data))
  }

  toJSONField(): CollectRewardV2EventJSONField {
    return {
      position: this.position,
      pool: this.pool,
      rewarderType: this.rewarderType,
      amount: this.amount.toString(),
    }
  }

  toJSON(): CollectRewardV2EventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): CollectRewardV2Event {
    return CollectRewardV2Event.reified().new({
      position: decodeFromJSONField(ID.reified(), field.position),
      pool: decodeFromJSONField(ID.reified(), field.pool),
      rewarderType: decodeFromJSONField(TypeName.reified(), field.rewarderType),
      amount: decodeFromJSONField('u64', field.amount),
    })
  }

  static fromJSON(json: Record<string, any>): CollectRewardV2Event {
    if (json.$typeName !== CollectRewardV2Event.$typeName) {
      throw new Error(
        `not a CollectRewardV2Event json object: expected '${CollectRewardV2Event.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return CollectRewardV2Event.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): CollectRewardV2Event {
    if (!isCollectRewardV2Event(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a CollectRewardV2Event object`)
    }
    return CollectRewardV2Event.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectRewardV2Event.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): CollectRewardV2Event {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isCollectRewardV2Event(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a CollectRewardV2Event object`,
      )
    }
    return CollectRewardV2Event.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link CollectRewardV2Event.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): CollectRewardV2Event {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isCollectRewardV2Event(data.bcs.type)) {
        throw new Error(`object at is not a CollectRewardV2Event object`)
      }

      return CollectRewardV2Event.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return CollectRewardV2Event.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<CollectRewardV2Event> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isCollectRewardV2Event(object.type)) {
      throw new Error(`object at id ${id} is not a CollectRewardV2Event object`)
    }
    return CollectRewardV2Event.fromBcs(object.content)
  }
}

/* ============================== FlashLoanEvent =============================== */

export function isFlashLoanEvent(type: string): boolean {
  type = compressSuiType(type)
  return type === `${getTypeOrigin('cetus-clmm', 'pool::FlashLoanEvent')}::pool::FlashLoanEvent`
}

export interface FlashLoanEventFields {
  pool: ToField<ID>
  loanA: ToField<'bool'>
  partner: ToField<ID>
  amount: ToField<'u64'>
  feeAmount: ToField<'u64'>
  refAmount: ToField<'u64'>
  vaultAAmount: ToField<'u64'>
  vaultBAmount: ToField<'u64'>
}

export type FlashLoanEventReified = Reified<FlashLoanEvent, FlashLoanEventFields>

export type FlashLoanEventJSONField = {
  pool: string
  loanA: boolean
  partner: string
  amount: string
  feeAmount: string
  refAmount: string
  vaultAAmount: string
  vaultBAmount: string
}

export type FlashLoanEventJSON = {
  $typeName: typeof FlashLoanEvent.$typeName
  $typeArgs: []
} & FlashLoanEventJSONField

/**
 * Emited when flash loan in a clmmpool.
 * * `pool` - The ID of the pool
 * * `loan_a` - Whether the loan is for coin A
 * * `partner` - The ID of the partner
 * * `amount` - The amount of coin A or B borrowed
 * * `fee_amount` - The fee amount
 * * `ref_amount` - The reference fee amount
 * * `vault_a_amount` - The amount of coin A in the vault
 * * `vault_b_amount` - The amount of coin B in the vault
 */
export class FlashLoanEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::FlashLoanEvent` {
    return `${getTypeOrigin('cetus-clmm', 'pool::FlashLoanEvent')}::pool::FlashLoanEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof FlashLoanEvent.$typeName = FlashLoanEvent.$typeName
  readonly $fullTypeName: `${string}::pool::FlashLoanEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof FlashLoanEvent.$isPhantom = FlashLoanEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly loanA: ToField<'bool'>
  readonly partner: ToField<ID>
  readonly amount: ToField<'u64'>
  readonly feeAmount: ToField<'u64'>
  readonly refAmount: ToField<'u64'>
  readonly vaultAAmount: ToField<'u64'>
  readonly vaultBAmount: ToField<'u64'>

  private constructor(typeArgs: [], fields: FlashLoanEventFields) {
    this.$fullTypeName = composeSuiType(
      FlashLoanEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::FlashLoanEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.loanA = fields.loanA
    this.partner = fields.partner
    this.amount = fields.amount
    this.feeAmount = fields.feeAmount
    this.refAmount = fields.refAmount
    this.vaultAAmount = fields.vaultAAmount
    this.vaultBAmount = fields.vaultBAmount
  }

  static reified(): FlashLoanEventReified {
    const reifiedBcs = FlashLoanEvent.bcs
    return {
      get typeName() {
        return FlashLoanEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          FlashLoanEvent.$typeName,
          ...[],
        ) as `${string}::pool::FlashLoanEvent`
      },
      typeArgs: [] as [],
      isPhantom: FlashLoanEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => FlashLoanEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => FlashLoanEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => FlashLoanEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => FlashLoanEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => FlashLoanEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        FlashLoanEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) => FlashLoanEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) => FlashLoanEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) => FlashLoanEvent.fetch(client, id),
      new: (fields: FlashLoanEventFields) => {
        return new FlashLoanEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): FlashLoanEventReified {
    return FlashLoanEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<FlashLoanEvent>> {
    return phantom(FlashLoanEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<FlashLoanEvent>> {
    return FlashLoanEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('FlashLoanEvent', {
      pool: ID.bcs,
      loan_a: bcs.bool(),
      partner: ID.bcs,
      amount: bcs.u64(),
      fee_amount: bcs.u64(),
      ref_amount: bcs.u64(),
      vault_a_amount: bcs.u64(),
      vault_b_amount: bcs.u64(),
    })
  }

  private static cachedBcs: ReturnType<typeof FlashLoanEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof FlashLoanEvent.instantiateBcs> {
    if (!FlashLoanEvent.cachedBcs) {
      FlashLoanEvent.cachedBcs = FlashLoanEvent.instantiateBcs()
    }
    return FlashLoanEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): FlashLoanEvent {
    return FlashLoanEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      loanA: decodeFromFields('bool', fields.loan_a),
      partner: decodeFromFields(ID.reified(), fields.partner),
      amount: decodeFromFields('u64', fields.amount),
      feeAmount: decodeFromFields('u64', fields.fee_amount),
      refAmount: decodeFromFields('u64', fields.ref_amount),
      vaultAAmount: decodeFromFields('u64', fields.vault_a_amount),
      vaultBAmount: decodeFromFields('u64', fields.vault_b_amount),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): FlashLoanEvent {
    if (!isFlashLoanEvent(item.type)) {
      throw new Error('not a FlashLoanEvent type')
    }

    return FlashLoanEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      loanA: decodeFromFieldsWithTypes('bool', item.fields.loan_a),
      partner: decodeFromFieldsWithTypes(ID.reified(), item.fields.partner),
      amount: decodeFromFieldsWithTypes('u64', item.fields.amount),
      feeAmount: decodeFromFieldsWithTypes('u64', item.fields.fee_amount),
      refAmount: decodeFromFieldsWithTypes('u64', item.fields.ref_amount),
      vaultAAmount: decodeFromFieldsWithTypes('u64', item.fields.vault_a_amount),
      vaultBAmount: decodeFromFieldsWithTypes('u64', item.fields.vault_b_amount),
    })
  }

  static fromBcs(data: Uint8Array): FlashLoanEvent {
    return FlashLoanEvent.fromFields(FlashLoanEvent.bcs.parse(data))
  }

  toJSONField(): FlashLoanEventJSONField {
    return {
      pool: this.pool,
      loanA: this.loanA,
      partner: this.partner,
      amount: this.amount.toString(),
      feeAmount: this.feeAmount.toString(),
      refAmount: this.refAmount.toString(),
      vaultAAmount: this.vaultAAmount.toString(),
      vaultBAmount: this.vaultBAmount.toString(),
    }
  }

  toJSON(): FlashLoanEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): FlashLoanEvent {
    return FlashLoanEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      loanA: decodeFromJSONField('bool', field.loanA),
      partner: decodeFromJSONField(ID.reified(), field.partner),
      amount: decodeFromJSONField('u64', field.amount),
      feeAmount: decodeFromJSONField('u64', field.feeAmount),
      refAmount: decodeFromJSONField('u64', field.refAmount),
      vaultAAmount: decodeFromJSONField('u64', field.vaultAAmount),
      vaultBAmount: decodeFromJSONField('u64', field.vaultBAmount),
    })
  }

  static fromJSON(json: Record<string, any>): FlashLoanEvent {
    if (json.$typeName !== FlashLoanEvent.$typeName) {
      throw new Error(
        `not a FlashLoanEvent json object: expected '${FlashLoanEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return FlashLoanEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): FlashLoanEvent {
    if (!isFlashLoanEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a FlashLoanEvent object`)
    }
    return FlashLoanEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FlashLoanEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): FlashLoanEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isFlashLoanEvent(content.type)) {
      throw new Error(`object at ${(content.fields as any).id} is not a FlashLoanEvent object`)
    }
    return FlashLoanEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link FlashLoanEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): FlashLoanEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isFlashLoanEvent(data.bcs.type)) {
        throw new Error(`object at is not a FlashLoanEvent object`)
      }

      return FlashLoanEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return FlashLoanEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<FlashLoanEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isFlashLoanEvent(object.type)) {
      throw new Error(`object at id ${id} is not a FlashLoanEvent object`)
    }
    return FlashLoanEvent.fromBcs(object.content)
  }
}

/* ============================== UpdatePoolStatusEvent =============================== */

export function isUpdatePoolStatusEvent(type: string): boolean {
  type = compressSuiType(type)
  return type
    === `${getTypeOrigin('cetus-clmm', 'pool::UpdatePoolStatusEvent')}::pool::UpdatePoolStatusEvent`
}

export interface UpdatePoolStatusEventFields {
  pool: ToField<ID>
  isPauseBefore: ToField<'bool'>
  isPauseAfter: ToField<'bool'>
  beforeStatus: ToField<Option<Status>>
  afterStatus: ToField<Status>
}

export type UpdatePoolStatusEventReified = Reified<
  UpdatePoolStatusEvent,
  UpdatePoolStatusEventFields
>

export type UpdatePoolStatusEventJSONField = {
  pool: string
  isPauseBefore: boolean
  isPauseAfter: boolean
  beforeStatus: ToJSON<Status> | null
  afterStatus: ToJSON<Status>
}

export type UpdatePoolStatusEventJSON = {
  $typeName: typeof UpdatePoolStatusEvent.$typeName
  $typeArgs: []
} & UpdatePoolStatusEventJSONField

/**
 * Emited when update pool_status
 * * `pool` - The ID of the pool
 * * `is_pause_before` - Whether the pool is paused before the update
 * * `is_pause_after` - Whether the pool is paused after the update
 * * `before_status` - The status before the update
 * * `after_status` - The status after the update
 */
export class UpdatePoolStatusEvent implements StructClass {
  __StructClass = true as const

  static get $typeName(): `${string}::pool::UpdatePoolStatusEvent` {
    return `${
      getTypeOrigin('cetus-clmm', 'pool::UpdatePoolStatusEvent')
    }::pool::UpdatePoolStatusEvent` as const
  }
  static readonly $numTypeParams = 0
  static readonly $isPhantom = [] as const

  readonly $typeName: typeof UpdatePoolStatusEvent.$typeName = UpdatePoolStatusEvent.$typeName
  readonly $fullTypeName: `${string}::pool::UpdatePoolStatusEvent`
  readonly $typeArgs: []
  readonly $isPhantom: typeof UpdatePoolStatusEvent.$isPhantom = UpdatePoolStatusEvent.$isPhantom

  readonly pool: ToField<ID>
  readonly isPauseBefore: ToField<'bool'>
  readonly isPauseAfter: ToField<'bool'>
  readonly beforeStatus: ToField<Option<Status>>
  readonly afterStatus: ToField<Status>

  private constructor(typeArgs: [], fields: UpdatePoolStatusEventFields) {
    this.$fullTypeName = composeSuiType(
      UpdatePoolStatusEvent.$typeName,
      ...typeArgs,
    ) as `${string}::pool::UpdatePoolStatusEvent`
    this.$typeArgs = typeArgs

    this.pool = fields.pool
    this.isPauseBefore = fields.isPauseBefore
    this.isPauseAfter = fields.isPauseAfter
    this.beforeStatus = fields.beforeStatus
    this.afterStatus = fields.afterStatus
  }

  static reified(): UpdatePoolStatusEventReified {
    const reifiedBcs = UpdatePoolStatusEvent.bcs
    return {
      get typeName() {
        return UpdatePoolStatusEvent.$typeName
      },
      get fullTypeName() {
        return composeSuiType(
          UpdatePoolStatusEvent.$typeName,
          ...[],
        ) as `${string}::pool::UpdatePoolStatusEvent`
      },
      typeArgs: [] as [],
      isPhantom: UpdatePoolStatusEvent.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => UpdatePoolStatusEvent.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        UpdatePoolStatusEvent.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UpdatePoolStatusEvent.fromFields(reifiedBcs.parse(data)),
      bcs: reifiedBcs,
      fromJSONField: (field: any) => UpdatePoolStatusEvent.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => UpdatePoolStatusEvent.fromJSON(json),
      fromCoreObject: (obj: SuiClientTypes.Object<{ content: true }>) =>
        UpdatePoolStatusEvent.fromCoreObject(obj),
      fromSuiParsedData: (content: SuiParsedData) =>
        UpdatePoolStatusEvent.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        UpdatePoolStatusEvent.fromSuiObjectData(content),
      fetch: async (client: ClientWithCoreApi, id: string) =>
        UpdatePoolStatusEvent.fetch(client, id),
      new: (fields: UpdatePoolStatusEventFields) => {
        return new UpdatePoolStatusEvent([], fields)
      },
      kind: 'StructClassReified',
    }
  }

  static get r(): UpdatePoolStatusEventReified {
    return UpdatePoolStatusEvent.reified()
  }

  static phantom(): PhantomReified<ToTypeStr<UpdatePoolStatusEvent>> {
    return phantom(UpdatePoolStatusEvent.reified())
  }

  static get p(): PhantomReified<ToTypeStr<UpdatePoolStatusEvent>> {
    return UpdatePoolStatusEvent.phantom()
  }

  private static instantiateBcs() {
    return bcs.struct('UpdatePoolStatusEvent', {
      pool: ID.bcs,
      is_pause_before: bcs.bool(),
      is_pause_after: bcs.bool(),
      before_status: Option.bcs(Status.bcs),
      after_status: Status.bcs,
    })
  }

  private static cachedBcs: ReturnType<typeof UpdatePoolStatusEvent.instantiateBcs> | null = null

  static get bcs(): ReturnType<typeof UpdatePoolStatusEvent.instantiateBcs> {
    if (!UpdatePoolStatusEvent.cachedBcs) {
      UpdatePoolStatusEvent.cachedBcs = UpdatePoolStatusEvent.instantiateBcs()
    }
    return UpdatePoolStatusEvent.cachedBcs
  }

  static fromFields(fields: Record<string, any>): UpdatePoolStatusEvent {
    return UpdatePoolStatusEvent.reified().new({
      pool: decodeFromFields(ID.reified(), fields.pool),
      isPauseBefore: decodeFromFields('bool', fields.is_pause_before),
      isPauseAfter: decodeFromFields('bool', fields.is_pause_after),
      beforeStatus: decodeFromFields(Option.reified(Status.reified()), fields.before_status),
      afterStatus: decodeFromFields(Status.reified(), fields.after_status),
    })
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UpdatePoolStatusEvent {
    if (!isUpdatePoolStatusEvent(item.type)) {
      throw new Error('not a UpdatePoolStatusEvent type')
    }

    return UpdatePoolStatusEvent.reified().new({
      pool: decodeFromFieldsWithTypes(ID.reified(), item.fields.pool),
      isPauseBefore: decodeFromFieldsWithTypes('bool', item.fields.is_pause_before),
      isPauseAfter: decodeFromFieldsWithTypes('bool', item.fields.is_pause_after),
      beforeStatus: decodeFromFieldsWithTypes(
        Option.reified(Status.reified()),
        item.fields.before_status,
      ),
      afterStatus: decodeFromFieldsWithTypes(Status.reified(), item.fields.after_status),
    })
  }

  static fromBcs(data: Uint8Array): UpdatePoolStatusEvent {
    return UpdatePoolStatusEvent.fromFields(UpdatePoolStatusEvent.bcs.parse(data))
  }

  toJSONField(): UpdatePoolStatusEventJSONField {
    return {
      pool: this.pool,
      isPauseBefore: this.isPauseBefore,
      isPauseAfter: this.isPauseAfter,
      beforeStatus: fieldToJSON<Option<Status>>(
        `${Option.$typeName}<${Status.$typeName}>`,
        this.beforeStatus,
      ),
      afterStatus: this.afterStatus.toJSONField(),
    }
  }

  toJSON(): UpdatePoolStatusEventJSON {
    return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() }
  }

  static fromJSONField(field: any): UpdatePoolStatusEvent {
    return UpdatePoolStatusEvent.reified().new({
      pool: decodeFromJSONField(ID.reified(), field.pool),
      isPauseBefore: decodeFromJSONField('bool', field.isPauseBefore),
      isPauseAfter: decodeFromJSONField('bool', field.isPauseAfter),
      beforeStatus: decodeFromJSONField(Option.reified(Status.reified()), field.beforeStatus),
      afterStatus: decodeFromJSONField(Status.reified(), field.afterStatus),
    })
  }

  static fromJSON(json: Record<string, any>): UpdatePoolStatusEvent {
    if (json.$typeName !== UpdatePoolStatusEvent.$typeName) {
      throw new Error(
        `not a UpdatePoolStatusEvent json object: expected '${UpdatePoolStatusEvent.$typeName}' but got '${json.$typeName}'`,
      )
    }

    return UpdatePoolStatusEvent.fromJSONField(json)
  }

  static fromCoreObject(obj: SuiClientTypes.Object<{ content: true }>): UpdatePoolStatusEvent {
    if (!isUpdatePoolStatusEvent(obj.type)) {
      throw new Error(`object at ${obj.objectId} is not a UpdatePoolStatusEvent object`)
    }
    return UpdatePoolStatusEvent.fromBcs(obj.content)
  }

  /** @deprecated `SuiParsedData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdatePoolStatusEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiParsedData(content: SuiParsedData): UpdatePoolStatusEvent {
    if (content.dataType !== 'moveObject') {
      throw new Error('not an object')
    }
    if (!isUpdatePoolStatusEvent(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a UpdatePoolStatusEvent object`,
      )
    }
    return UpdatePoolStatusEvent.fromFieldsWithTypes(content)
  }

  /** @deprecated `SuiObjectData` is a JSON-RPC-only type that is being phased out upstream. Use {@link UpdatePoolStatusEvent.fromCoreObject} together with `client.core.getObject({ include: { content: true } })` for transport-agnostic parsing. */
  static fromSuiObjectData(data: SuiObjectData): UpdatePoolStatusEvent {
    if (data.bcs) {
      if (data.bcs.dataType !== 'moveObject' || !isUpdatePoolStatusEvent(data.bcs.type)) {
        throw new Error(`object at is not a UpdatePoolStatusEvent object`)
      }

      return UpdatePoolStatusEvent.fromBcs(fromBase64(data.bcs.bcsBytes))
    }
    if (data.content) {
      return UpdatePoolStatusEvent.fromSuiParsedData(data.content)
    }
    throw new Error(
      'Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request.',
    )
  }

  static async fetch(client: ClientWithCoreApi, id: string): Promise<UpdatePoolStatusEvent> {
    const { object } = await client.core.getObject({
      objectId: id,
      include: { content: true },
    })
    if (!isUpdatePoolStatusEvent(object.type)) {
      throw new Error(`object at id ${id} is not a UpdatePoolStatusEvent object`)
    }
    return UpdatePoolStatusEvent.fromBcs(object.content)
  }
}
